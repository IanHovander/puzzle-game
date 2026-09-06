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
  UI.typewrite = async function (container, paragraphs, opts) {
    opts = opts || {};
    const speed = opts.speed || 14; // ms per char
    skipRequested = false;
    for (const para of paragraphs) {
      const isObj = typeof para === 'object';
      const text = isObj ? para.text : para;
      const cls = 'para' + (isObj && para.cls ? ' ' + para.cls : '') + (isObj && para.speaker ? ' speech' : '');
      const p = UI.el('p', { class: cls });
      if (isObj && para.speaker) p.appendChild(UI.el('span', { class: 'speaker', text: para.speaker }));
      const span = UI.el('span', { class: 'tw' }); p.appendChild(span);
      container.appendChild(p);
      const html = UI.rich(text);
      // reveal by characters of the plain text while keeping markup: simple approach, progressively slice HTML at tag-safe points
      if (skipRequested || opts.instant) { span.innerHTML = html; continue; }
      let i = 0; const parts = html.split(/(<[^>]+>)/g); let out = '';
      for (const part of parts) {
        if (part.startsWith('<')) { out += part; span.innerHTML = out; continue; }
        for (const ch of part) {
          out += ch; i++;
          if (skipRequested) break;
          if (i % 2 === 0) { span.innerHTML = out; if (window.VigilAudio && i % 6 === 0) window.VigilAudio.sfx('type'); await UI.sleep(speed * (ch === '.' || ch === '—' ? 8 : ch === ',' ? 3 : 1)); }
        }
        if (skipRequested) break;
      }
      span.innerHTML = html;
      if (!skipRequested) await UI.sleep(opts.paraPause || 260);
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

  /* Flowchart renderer.  spec = { nodes:[{id,label,col,row,kind}], edges:[[a,b]] , width?} ; done = Set of visited node ids */
  UI.flowchart = function (spec, doneSet, opts) {
    opts = opts || {};
    const cw = opts.colWidth || 190, rh = opts.rowHeight || 72, nw = 160, nh = 44;
    const cols = Math.max(...spec.nodes.map(n => n.col)) + 1, rows = Math.max(...spec.nodes.map(n => n.row)) + 1;
    const W = cols * cw + 20, H = rows * rh + 20;
    const pos = {}; spec.nodes.forEach(n => { pos[n.id] = { x: 10 + n.col * cw + (cw - nw) / 2, y: 10 + n.row * rh + (rh - nh) / 2 }; });
    let s = `<svg class="flowchart" viewBox="0 0 ${W} ${H}" width="${W}" height="${H}">`;
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
      if (kind === 'choice') s += `<path d="M${nw / 2},0 L${nw},${nh / 2} L${nw / 2},${nh} L0,${nh / 2} z"/>`;
      else if (kind === 'end') s += `<rect width="${nw}" height="${nh}" rx="${nh / 2}"/>`;
      else s += `<rect width="${nw}" height="${nh}" rx="6"/>`;
      const label = on || !n.secret ? n.label : '? ? ?';
      const lines = wrap(label, kind === 'choice' ? 16 : 22);
      lines.forEach((ln, i) => { s += `<text x="${nw / 2}" y="${nh / 2 + (i - (lines.length - 1) / 2) * 14 + 5}" text-anchor="middle">${UI.esc(ln)}</text>`; });
      s += `</g>`;
    }
    s += `</svg>`;
    const wrapEl = UI.el('div', { class: 'flowchart-wrap', html: s });
    return wrapEl;
  };
  function wrap(text, n) { const words = text.split(' '); const lines = []; let cur = ''; for (const w of words) { if ((cur + ' ' + w).trim().length > n && cur) { lines.push(cur); cur = w; } else cur = (cur + ' ' + w).trim(); } if (cur) lines.push(cur); return lines.slice(0, 3); }

  /* Simple pluralize / list join */
  UI.list = (arr) => arr.length <= 1 ? (arr[0] || '') : arr.slice(0, -1).join(', ') + ' and ' + arr[arr.length - 1];

  window.VigilUI = UI;
})();
