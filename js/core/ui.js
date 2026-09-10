/* DOM + presentation helpers: element builder, typewriter, countdown bar, flowchart SVG, toasts, modals. */
(function () {
  'use strict';
  const UI = {};

  UI.esc = (s) => String(s).replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
  UI.el = function (tag, attrs, children) {
    const e = document.createElement(tag);
    if (attrs) for (const k in attrs) {
      if (k === 'class') e.className = attrs[k];
      else if (k === 'html') e.innerHTML = attrs[k];
      else if (k === 'text') e.textContent = attrs[k];
      else if (k.startsWith('on')) e.addEventListener(k.slice(2), attrs[k]);
      else if (k === 'style' && typeof attrs[k] === 'object') Object.assign(e.style, attrs[k]);
      else e.setAttribute(k, attrs[k]);
    }
    if (children) (Array.isArray(children) ? children : [children]).forEach(c => { if (c == null) return; e.appendChild(typeof c === 'string' ? document.createTextNode(c) : c); });
    return e;
  };
  UI.clear = (e) => { while (e.firstChild) e.removeChild(e.firstChild); return e; };
  UI.sleep = (ms) => new Promise(r => setTimeout(r, ms));

  /* Inline markup: *emphasis*, **strong**, [[glyph:name]] handled by caller, ~~small~~ */
  UI.rich = function (s) {
    return UI.esc(s)
      .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
      .replace(/\*(.+?)\*/g, '<em>$1</em>')
      .replace(/~~(.+?)~~/g, '<span class="small">$1</span>')
      .replace(/\{\{(.+?)\}\}/g, '<span class="rune">$1</span>')
      .replace(/\n/g, '<br>');
  };

  /* Typewriter: reveals paragraphs one after another; click/space to fast-forward. Returns promise. */
  let skipRequested = false;
  UI.requestSkip = () => { skipRequested = true; };
  /* Build one paragraph. `st` carries speaker continuity: a run of lines from the same
     person is named once, and the rule down the left side carries the rest. */
  function buildPara(para, st) {
    const isObj = typeof para === 'object';
    const text = isObj ? para.text : para;
    const speaker = isObj ? para.speaker : null;
    const same = !!(speaker && speaker === st.speaker);
    const cls = 'para' + (isObj && para.cls ? ' ' + para.cls : '') + (speaker ? ' speech' : '') + (same ? ' cont' : '');
    const p = UI.el('p', { class: cls });
    if (same && st.el) st.el.classList.add('joined');
    if (speaker && !same) p.appendChild(UI.el('span', { class: 'speaker', text: speaker }));
    const span = UI.el('span', { class: 'tw' });
    p.appendChild(span);
    st.speaker = speaker || null; st.el = p;
    return { p, span, html: UI.rich(text) };
  }

  /* Shrink a box's type until the finished text fits inside it, so nothing has to be
     scrolled to be read. `ghost` holds the text that is about to be typed. */
  UI.fitBox = function (container, ghost) {
    const cs = getComputedStyle(container);
    const maxH = parseFloat(cs.maxHeight);
    if (!isFinite(maxH) || maxH <= 0) return;
    container.style.fontSize = '';
    container.classList.remove('tight');
    const base = parseFloat(getComputedStyle(container).fontSize);
    if (!base) return;
    const chrome = parseFloat(cs.borderTopWidth || 0) + parseFloat(cs.borderBottomWidth || 0);
    const avail = maxH - chrome - 2;
    container.appendChild(ghost);
    let size = base;
    // The floor is a readability floor, not a fitting one. This is read aloud from a laptop or a TV
    // several feet away, so type below about 17px is not small, it is gone. A scene that will not fit
    // above the floor is too long, and scan-fit reports it as an overflow so it gets cut instead.
    const floor = Math.max(17, Math.round(base * 0.8));
    while (container.scrollHeight > avail && size > floor) {
      size -= 1;
      container.style.fontSize = size + 'px';
      container.classList.toggle('tight', size <= base * 0.88);
    }
    // What the box had to do to fit, for the layout check in tools/scan-fit.js.
    UI.lastFit = { base, size, over: Math.max(0, container.scrollHeight - avail) };
    ghost.remove();
  };

  UI.typewrite = async function (container, paragraphs, opts) {
    opts = opts || {};
    const speed = opts.speed || 9; // ms per char
    skipRequested = false;
    // Continuity survives across calls into the same box: a choice's reply keeps Wren's rule going.
    const prev = container.__tw;
    const st = (prev && prev.el && prev.el.parentNode === container)
      ? { speaker: prev.speaker, el: prev.el } : { speaker: null, el: null };

    // Size the box for the finished text before a single character of it appears.
    if (opts.fit !== false) {
      const gst = { speaker: st.speaker, el: null };
      const ghost = UI.el('div', { class: 'tw-ghost' });
      for (const para of paragraphs) { const b = buildPara(para, gst); b.span.innerHTML = b.html; ghost.appendChild(b.p); }
      UI.fitBox(container, ghost);
    }

    for (const para of paragraphs) {
      const b = buildPara(para, st);
      const p = b.p, span = b.span, html = b.html;
      container.appendChild(p);
      container.__tw = { speaker: st.speaker, el: st.el };
      // reveal by characters of the plain text while keeping markup: simple approach, progressively slice HTML at tag-safe points
      if (skipRequested || opts.instant) { span.innerHTML = html; continue; }
      let i = 0; const parts = html.split(/(<[^>]+>)/g); let out = '';
      for (const part of parts) {
        if (part.startsWith('<')) { out += part; span.innerHTML = out; continue; }
        for (const ch of part) {
          out += ch; i++;
          if (skipRequested) break;
          if (i % 2 === 0) { span.innerHTML = out; if (window.VigilAudio && i % 6 === 0) window.VigilAudio.sfx('type'); await UI.sleep(speed * (ch === '.' || ch === '—' ? 6 : ch === ',' ? 2.5 : 1)); }
        }
        if (skipRequested) break;
      }
      span.innerHTML = html;
      if (!skipRequested) await UI.sleep(opts.paraPause || 180);
      container.scrollTop = container.scrollHeight;
    }
    skipRequested = false;
  };

  /* Countdown bar: returns {promise, cancel}. onTick(secondsLeft). */
  UI.countdown = function (container, seconds, onTick) {
    const wrap = UI.el('div', { class: 'countdown' }, [UI.el('div', { class: 'countdown-fill' }), UI.el('span', { class: 'countdown-num', text: seconds })]);
    container.appendChild(wrap);
    const fill = wrap.firstChild, num = wrap.lastChild;
    let done = false, resolve; const promise = new Promise(r => resolve = r);
    const start = performance.now();
    function step(t) {
      if (done) return;
      if (!wrap.isConnected) { done = true; resolve('cancel'); return; } // the box was cleared or the tab changed
      const left = Math.max(0, seconds - (t - start) / 1000);
      fill.style.width = (left / seconds * 100) + '%';
      const s = Math.ceil(left); if (num.textContent != s) { num.textContent = s; if (onTick) onTick(s); if (s <= 5 && window.VigilAudio) window.VigilAudio.sfx('tick'); }
      wrap.classList.toggle('urgent', left < seconds * 0.3);
      if (left <= 0) { done = true; resolve('timeout'); return; }
      requestAnimationFrame(step);
    }
    requestAnimationFrame(step);
    return { promise, cancel: () => { done = true; wrap.remove(); resolve('cancel'); }, el: wrap };
  };

  UI.toast = function (msg, ms, cls) {
    const t = UI.el('div', { class: 'toast ' + (cls || ''), html: UI.rich(msg) });
    document.body.appendChild(t);
    requestAnimationFrame(() => t.classList.add('show'));
    setTimeout(() => { t.classList.remove('show'); setTimeout(() => t.remove(), 500); }, ms || 2600);
  };

  UI.modal = function (contentEl, opts) {
    opts = opts || {};
    const back = UI.el('div', { class: 'modal-back' });
    const box = UI.el('div', { class: 'modal ' + (opts.cls || '') });
    if (opts.title) box.appendChild(UI.el('h3', { class: 'modal-title', text: opts.title }));
    box.appendChild(contentEl);
    let closeBtn = null;
    if (!opts.noClose) { closeBtn = UI.el('button', { class: 'btn ghost modal-close', text: opts.closeText || 'Close', onclick: () => close() }); box.appendChild(closeBtn); }
    back.appendChild(box); document.body.appendChild(back);
    requestAnimationFrame(() => back.classList.add('show'));
    function close() { back.classList.remove('show'); setTimeout(() => back.remove(), 300); if (opts.onClose) opts.onClose(); }
    return { close, el: box };
  };

  /* In-page dialogs (never native prompt/confirm: sandboxed hosts block them). Test hook: window.__autoDialog = { prompt: 'X', confirm: true } */
  UI.ask = function (text, def, opts) {
    opts = opts || {};
    if (window.__autoDialog && window.__autoDialog.prompt !== undefined) return Promise.resolve(window.__autoDialog.prompt);
    return new Promise((resolve) => {
      const box = UI.el('div', { class: 'ask' });
      box.appendChild(UI.el('p', { html: UI.rich(text) }));
      const inp = UI.el('input', { class: 'field' + (opts.plain ? ' plain' : ''), value: def || '', maxlength: opts.maxlength || 40, autocomplete: 'off', spellcheck: 'false', placeholder: opts.placeholder || '' });
      box.appendChild(inp);
      const row = UI.el('div', { class: 'row' });
      let m;
      const done = (v) => { m.close(); resolve(v); };
      row.appendChild(UI.el('button', { class: 'btn primary', text: opts.ok || 'Speak', onclick: () => done(inp.value) }));
      row.appendChild(UI.el('button', { class: 'btn ghost', text: opts.cancel || 'Never mind', onclick: () => done(null) }));
      box.appendChild(row);
      inp.addEventListener('keydown', (e) => { if (e.key === 'Enter') done(inp.value); if (e.key === 'Escape') done(null); });
      m = UI.modal(box, { title: opts.title || '', noClose: true, cls: 'ask-modal' });
      setTimeout(() => inp.focus(), 60);
    });
  };
  UI.confirm = function (text, opts) {
    opts = opts || {};
    if (window.__autoDialog && window.__autoDialog.confirm !== undefined) return Promise.resolve(!!window.__autoDialog.confirm);
    return new Promise((resolve) => {
      const box = UI.el('div', { class: 'ask' });
      box.appendChild(UI.el('p', { html: UI.rich(text) }));
      const row = UI.el('div', { class: 'row' });
      let m;
      row.appendChild(UI.el('button', { class: 'btn primary' + (opts.danger ? ' danger' : ''), text: opts.ok || 'Yes', onclick: () => { m.close(); resolve(true); } }));
      row.appendChild(UI.el('button', { class: 'btn ghost', text: opts.cancel || 'No', onclick: () => { m.close(); resolve(false); } }));
      box.appendChild(row);
      m = UI.modal(box, { title: opts.title || '', noClose: true, cls: 'ask-modal' });
    });
  };
  UI.notice = function (text, opts) { opts = opts || {}; if (window.__autoDialog) return Promise.resolve(); return new Promise((resolve) => { const box = UI.el('div', { class: 'ask' }); box.appendChild(UI.el('p', { html: UI.rich(text) })); let m; box.appendChild(UI.el('div', { class: 'row' }, [UI.el('button', { class: 'btn primary', text: opts.ok || 'All right', onclick: () => { m.close(); resolve(); } })])); m = UI.modal(box, { title: opts.title || '', noClose: true, cls: 'ask-modal' }); }); };

  /* Flowchart renderer.  spec = { nodes:[{id,label,col,row,kind}], edges:[[a,b]] } ; done = Set of visited node ids
     opts = { avail:{w,h}, fontPx, plain, zoomTitle, colWidth, rowHeight }

     THE TYPE FLOOR IS THE LAYOUT. This used to lay every chart out at a fixed 190px column and let
     `.flowchart { max-width: 100% }` scale the result into whatever panel it landed in. The scale is
     the label size: a 1730px chart in a 786px panel writes its 15px labels at 6.8px, and at 1152x648
     at 5.7px, against a floor of 17px -- so every chapter ended on a picture the room could not read,
     in all nine chapters, at every viewport measured. Scaling cannot be fixed by making the numbers
     bigger, because effective size is fontSize x panelWidth / (cols x colWidth): only the ratio of
     type to column matters, and the ratio was wrong.
     So the chart is now laid out in REAL CSS PIXELS -- one viewBox unit is one pixel and the SVG is
     never scaled down -- and the geometry is chosen to fit the panel it is actually going into, at a
     type size that is the floor rather than the remainder. The node box is sized from the label, the
     widest wrap that still fits wins, and a chart that cannot fit even at the tightest wrap scrolls
     sideways in a panel that says so, instead of shrinking into a smear.
     No chapter's flow data changes: nodes keep their col, row and label. */
  UI.flowchart = function (spec, doneSet, opts) {
    opts = opts || {};
    const F = opts.fontPx || 17;                       // the readability floor, in real screen pixels
    const cols = Math.max(...spec.nodes.map(n => n.col)) + 1, rows = Math.max(...spec.nodes.map(n => n.row)) + 1;
    const availW = (opts.avail && opts.avail.w) || 0, availH = (opts.avail && opts.avail.h) || 0;
    const gapX = Math.round(F * 0.85), gapY = Math.round(F * 0.8);   // the chart is tight on both axes; see the note above
    /* A choice node is drawn as a chamfered hexagon rather than a true diamond. A diamond is only full
       width across its middle, so its label had to be wrapped a third narrower than everything else,
       and at the wraps this chart now needs that cost a word: ch1's "The hour before the bell" came out
       as "The hour before the…". The hexagon reads as a decision just as clearly and gives the label
       nearly the whole box. */
    const charsFor = (n, chars) => n.kind === 'choice' ? Math.max(6, Math.round(chars * 0.9)) : chars;
    /* Widest wrap first: a long label in few long lines reads better than the same label in a stack of
       stubs, and only when that does not fit do we trade width for height. Height is weighted higher
       because the panel scrolls down past the Continue button, and sideways it does not. */
    let g = null;
    for (const chars of [22, 20, 18, 16, 15, 14, 13, 12, 11, 10, 9, 8]) {
      const cut = spec.nodes.filter(n => wrap(n.label, charsFor(n, chars)).cut).length;
      const lines = Math.max(...spec.nodes.map(n => wrap(n.label, charsFor(n, chars)).length));
      const nw = Math.round(chars * F * 0.56) + 10, nh = lines * Math.round(F * 1.15) + 12;
      const cw = Math.max(opts.colWidth || 0, nw + gapX), rh = Math.max(opts.rowHeight || 0, nh + gapY);
      const W = cols * cw + 20, H = rows * rh + 20;
      /* A label that had to be cut is worth a lot of overflow: the chart is words, and a word lost is a
         path the room cannot read at any size. */
      const over = (availW ? Math.max(0, W - availW) : 0) + (availH ? Math.max(0, H - availH) * 1.5 : 0) + cut * 400;
      if (!g || over < g.over) g = { chars, lines, nw, nh, cw, rh, W, H, over, cut };   // ties keep the widest wrap
      if (!over) break;
    }
    const { nw, nh, cw, rh, W, H } = g;
    const pos = {}; spec.nodes.forEach(n => { pos[n.id] = { x: 10 + n.col * cw + (cw - nw) / 2, y: 10 + n.row * rh + (rh - nh) / 2 }; });
    let s = `<svg class="flowchart" viewBox="0 0 ${W} ${H}" width="${W}" height="${H}" style="--fc-font:${F}px">`;
    s += `<defs><marker id="fc-arrow" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="6" markerHeight="6" orient="auto"><path d="M0,0 L10,5 L0,10 z" fill="currentColor"/></marker></defs>`;
    for (const [a, b] of spec.edges) {
      const pa = pos[a], pb = pos[b]; if (!pa || !pb) continue;
      const on = doneSet.has(a) && doneSet.has(b);
      const x1 = pa.x + nw, y1 = pa.y + nh / 2, x2 = pb.x, y2 = pb.y + nh / 2, mx = (x1 + x2) / 2;
      s += `<path class="fc-edge ${on ? 'on' : ''}" d="M${x1},${y1} C${mx},${y1} ${mx},${y2} ${x2},${y2}" marker-end="url(#fc-arrow)"/>`;
    }
    for (const n of spec.nodes) {
      const p = pos[n.id]; const on = doneSet.has(n.id);
      const kind = n.kind || 'beat';
      s += `<g class="fc-node ${kind} ${on ? 'on' : 'off'}" transform="translate(${p.x},${p.y})">`;
      if (kind === 'choice') { const c = Math.round(nh * 0.34); s += `<path d="M${c},0 L${nw - c},0 L${nw},${nh / 2} L${nw - c},${nh} L${c},${nh} L0,${nh / 2} z"/>`; }
      else if (kind === 'end') s += `<rect width="${nw}" height="${nh}" rx="${nh / 2}"/>`;
      else s += `<rect width="${nw}" height="${nh}" rx="6"/>`;
      const label = on || !n.secret ? n.label : '? ? ?';
      s += `<title>${UI.esc(label)}</title>`;   // the full label, for a chart that had to shorten one
      /* One <text> per node with a <tspan> per line, not one <text> per line: a wrapped label then still
         reads as one continuous string to anything walking the document (the playthrough scripts assert
         on these labels), and it is one accessible run rather than three fragments. */
      const lines = wrap(label, charsFor(n, g.chars));
      const step = Math.round(F * 1.15), top = nh / 2 - (lines.length - 1) / 2 * step + Math.round(F * 0.35);
      s += `<text x="${nw / 2}" y="${top}" text-anchor="middle">`;
      /* the trailing space is collapsed away by SVG's default xml:space, so it costs nothing on screen
         and keeps the wrapped label one readable string to a document walker */
      lines.forEach((ln, i) => { s += `<tspan x="${nw / 2}"${i ? ` dy="${step}"` : ''}>${UI.esc(ln) + (i < lines.length - 1 ? ' ' : '')}</tspan>`; });
      s += `</text>`;
      s += `</g>`;
    }
    s += `</svg>`;
    const wrapEl = UI.el('div', { class: 'flowchart-wrap', html: s });
    wrapEl.dataset.fit = JSON.stringify({ W, H, chars: g.chars, lines: g.lines, cut: g.cut, font: F, availW, availH,
      cutLabels: spec.nodes.filter(n => wrap(n.label, charsFor(n, g.chars)).cut).map(n => n.label) });
    if (!opts.plain) {
      wrapEl.classList.add('zoomable');
      wrapEl.title = 'Tap to enlarge';
      /* The enlarged copy is LAID OUT AGAIN, not the same SVG shown bigger: the modal is wider than the
         panel, so it can afford a wider wrap and fewer lines. Reusing the panel's markup is what left
         the old zoom scrolling sideways by 812px -- the chart it enlarged had been built for a box it
         was no longer in. Measure the modal first, then draw into it. */
      wrapEl.addEventListener('click', () => {
        const big = UI.el('div', { class: 'flowchart-wrap big' });
        UI.modal(big, { title: opts.zoomTitle || 'The paths you walked', cls: 'wide', closeText: 'Close' });
        const inner = UI.flowchart(spec, doneSet, { plain: true, fontPx: F, avail: { w: Math.max(320, big.clientWidth - 4), h: Math.max(240, big.clientHeight - 8) } });
        big.appendChild(inner.firstChild);
      });
      wrapEl.appendChild(UI.el('div', { class: 'flow-zoom-hint', text: W > availW && availW ? 'Drag the chart sideways · tap to enlarge' : 'Tap the chart to enlarge' }));
    }
    return wrapEl;
  };
  /* Up to five lines -- one more than the old three, because a narrow wrap at a readable size needs the
     room and a tall node is cheaper than a lost word. A label that still will not fit keeps its first
     words and says so with an ellipsis rather than dropping them silently, and marks itself `cut` so
     the layout chooser can pay almost anything to avoid it. The whole label is in the node's <title>. */
  const WRAP_LINES = 5;
  function wrap(text, n) {
    const words = String(text).split(' '); const lines = []; let cur = '';
    for (const w of words) { if ((cur + ' ' + w).trim().length > n && cur) { lines.push(cur); cur = w; } else cur = (cur + ' ' + w).trim(); }
    if (cur) lines.push(cur);
    if (lines.length <= WRAP_LINES) return lines;
    const out = lines.slice(0, WRAP_LINES); out[WRAP_LINES - 1] = out[WRAP_LINES - 1].slice(0, Math.max(1, n - 1)) + '…'; out.cut = true; return out;
  }

  /* Simple pluralize / list join */
  /* A button that plays something. onPlay() returns the phrase length in ms (or nothing); while it plays the button
     shows it is listening, so a phone with its sound off still shows that the press did something. The icon is an
     inline drawing rather than a ♪ character, which some phone fonts do not have. */
  UI.AUDIO_ICON = '<svg class="audio-icon" viewBox="0 0 24 24" width="18" height="18" aria-hidden="true" focusable="false"><g fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round"><path d="M4 10v4"/><path d="M8 7v10"/><path d="M12 4v16"/><path d="M16 7v10"/><path d="M20 10v4"/></g></svg>';
  UI.audioButton = function (label, onPlay, opts) {
    opts = opts || {};
    const text = String(label || 'Cup your ear').replace(/^[♪♫🔊]\s*/u, '');
    const btn = UI.el('button', { class: 'btn audio-btn ' + (opts.cls || ''), type: 'button', 'aria-label': text });
    const setLabel = (t) => { btn.innerHTML = UI.AUDIO_ICON + '<span class="audio-label">' + UI.esc(t) + '</span>'; };
    setLabel(text);
    let timer = null;
    const reset = () => { if (timer) clearTimeout(timer); timer = null; btn.classList.remove('playing'); setLabel(text); };
    btn.addEventListener('click', () => {
      UI.stopAudio(); // one phrase at a time: silence whatever else is playing and reset its button and strip
      try { if (window.VigilAudio && window.VigilAudio.unlockMedia) window.VigilAudio.unlockMedia(); } catch (e) {}
      let ms = 0;
      try { const r = onPlay(); ms = typeof r === 'number' && isFinite(r) ? r : 1800; } catch (e) { console.error(e); ms = 0; }
      if (ms <= 0) { reset(); return; }
      btn.classList.add('playing'); setLabel(opts.playing || 'Listening…');
      playingButton = reset;
      timer = setTimeout(() => { reset(); if (playingButton === reset) playingButton = null; }, ms);
    });
    return btn;
  };
  /* Only one phrase plays at a time. UI.stopAudio() resets the playing button and lit strip and tells the audio
     helpers (which listen for 'vigil:stop') to drop their pending notes. */
  let playingButton = null, litStrip = null;
  UI.stopAudio = function () {
    if (playingButton) { const r = playingButton; playingButton = null; r(); }
    if (litStrip) { const t = litStrip; litStrip = null; t(); }
    try { document.dispatchEvent(new CustomEvent('vigil:stop')); } catch (e) {}
  };
  /* Light each .step of the arrow strip inside el as its note sounds (the audio helpers announce 'vigil:step'). */
  UI.lightStrip = function (el, ms) {
    if (!el) return;
    if (litStrip) { const t = litStrip; litStrip = null; t(); }
    const steps = () => Array.from(el.querySelectorAll('.arrow-strip .step'));
    steps().forEach(s => s.classList.remove('on', 'done'));
    const on = (ev) => { const d = ev.detail || {}; const list = steps(); list.forEach((s, i) => { if (i < d.step) { s.classList.remove('on'); s.classList.add('done'); } }); const s = list[d.step]; if (s) { s.classList.add('on'); setTimeout(() => { s.classList.remove('on'); s.classList.add('done'); }, 600); } };
    document.addEventListener('vigil:step', on);
    let timer = null;
    const teardown = () => { if (timer) clearTimeout(timer); timer = null; document.removeEventListener('vigil:step', on); steps().forEach(s => s.classList.remove('on', 'done')); };
    litStrip = teardown;
    timer = setTimeout(() => { teardown(); if (litStrip === teardown) litStrip = null; }, ms || 20000);
  };
  UI.list = (arr) => arr.length <= 1 ? (arr[0] || '') : arr.slice(0, -1).join(', ') + ' and ' + arr[arr.length - 1];

  window.VigilUI = UI;
})();
