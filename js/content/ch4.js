/* Chapter IV — The Oath (the Provost's study). Pass-around Warden; Owl is the Voice. */
(function () {
  'use strict';
  const G = window.VigilGlyphs, L = window.VigilLore, UI = window.VigilUI, Store = window.VigilStore, Audio = window.VigilAudio, FX = window.VigilFX;
  const nick = L.nick;
  const glyphPalette = () => G.names.map(n => ({ id: n, svg: G.inner(n), label: n }));
  const F = () => Store.state.flags;

  /* ---------- chapter-local CSS ---------- */
  try { (document.head || document.body).appendChild(Object.assign(document.createElement('style'), { textContent: `
    .ch4-room svg { width: 100%; max-height: 44vh; display: block; }
    .ch4-hot { cursor: pointer; }
    .ch4-hot .hs { fill: rgba(255,255,255,0.02); stroke: rgba(255,255,255,0.18); stroke-width: 1.5; stroke-dasharray: 5 4; transition: all .15s; }
    .ch4-hot:hover .hs { stroke: var(--gold); fill: rgba(212,169,78,0.10); }
    .ch4-hot.found .hs { stroke: var(--moss); stroke-dasharray: none; fill: rgba(120,180,120,0.06); }
    .ch4-hot text { font-family: var(--display); font-size: 12px; letter-spacing: .08em; }
    .ch4-hot .who { font-size: 11px; }
    .ch4-panel { display: flex; flex-direction: column; gap: 12px; animation: fadeUp .3s ease both; }
    .ch4-panel .para { margin: 0; font-size: 18px; }
    .ch4-panel .speech { padding-left: 14px; border-left: 2px solid var(--line); }
    .ch4-panel .speaker { display: block; font-family: var(--display); font-size: 12px; letter-spacing: 0.15em; text-transform: uppercase; color: var(--gold); margin-bottom: 2px; }
    .ch4-panel .whisper { color: var(--sea); font-style: italic; }
    .ch4-panel .omen { color: var(--violet); font-family: var(--hand); font-size: 20px; }
    .ch4-panel .letter { font-family: var(--hand); color: #d9cba8; background: rgba(255,240,200,0.05); padding: 10px 14px; border-radius: 4px; font-size: 20px; }
    .ch4-runes { background: rgba(255,240,200,0.05); border: 1px solid rgba(212,169,78,0.25); border-radius: 8px; padding: 10px 14px; }
    .ch4-runes svg { width: 100%; max-width: 720px; display: block; margin: 0 auto; color: #e9dcb8; }
    .ch4-opts { display: flex; flex-direction: column; gap: 8px; }
    .ch4-opts .btn { text-transform: none; font-family: var(--serif); font-size: 18px; letter-spacing: 0; text-align: left; }
    .ch4-scrape { touch-action: none; user-select: none; cursor: crosshair; border-radius: 8px; overflow: hidden; }
    .ch4-scrape svg { width: 100%; max-height: 40vh; display: block; }
    .ch4-scrape .over { transition: opacity 1.6s ease; }
    .ch4-count { font-family: var(--display); font-size: 15px; letter-spacing: .1em; color: var(--gold); }
    .ch4-letter { font-family: var(--hand); color: #d9cba8; background: rgba(255,240,200,0.05); padding: 10px 14px; border-radius: 4px; font-size: 20px; }
  ` })); } catch (e) { /* headless shim without a document head */ }

  /* ---------- the older alphabet (24 letters; no Q, no X). The same table lives in the Companion's ch4 file. ---------- */
  const OLD_RUNES = {
    A: 'M10,2 L10,26 M10,8 L18,14', B: 'M10,2 L10,26 M10,2 L18,10 L10,18', C: 'M16,4 L4,14 L16,24', D: 'M10,2 L10,26 M2,14 L18,14',
    E: 'M10,2 L10,26 M2,20 L10,14 L18,20', F: 'M10,2 L10,26 M10,6 L18,12 M10,14 L18,20', G: 'M6,2 L14,2 L14,26 L6,26', H: 'M6,2 L6,26 M14,2 L14,26 M6,10 L14,18',
    I: 'M10,2 L10,26', J: 'M10,2 L10,20 L4,26', K: 'M10,2 L10,26 M18,6 L10,14 L18,22', L: 'M10,2 L10,26 M10,26 L18,20',
    M: 'M4,2 L4,26 M16,2 L16,26 M4,2 L16,26', N: 'M4,2 L4,26 M16,2 L16,26 M4,26 L16,2', O: 'M10,4 L18,14 L10,24 L2,14 Z', P: 'M10,2 L10,26 M2,10 L10,2 L18,10',
    R: 'M10,2 L10,26 M2,20 L10,26 L18,20', S: 'M16,4 L6,10 L14,18 L4,24', T: 'M2,6 L18,6 M10,6 L10,26', U: 'M4,2 L10,26 L16,2',
    V: 'M4,4 L16,24 M16,4 L4,24', W: 'M2,4 L10,14 L18,4 M10,14 L10,26', Y: 'M10,2 L10,26 M2,20 L18,8', Z: 'M4,6 L16,6 M4,22 L16,22 M10,6 L10,22',
  };
  const OLD_ALPHA = 'ABCDEFGHIJKLMNOPRSTUVWYZ';
  /* Render a line of text in the older alphabet. Letters not in the alphabet (Q, X) are drawn as a blank. */
  function runeLine(text, opts) {
    opts = opts || {};
    const cell = 24, h = 34, gap = 12; let x = 8; let s = '';
    for (const ch of String(text).toUpperCase()) {
      if (ch === ' ') { x += gap; continue; }
      if (ch === '.') { s += `<circle cx="${x + 5}" cy="26" r="2" fill="currentColor"/>`; x += 12; continue; }
      const d = OLD_RUNES[ch];
      if (d) s += `<path d="${d}" transform="translate(${x},3)" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"/>`;
      x += cell;
    }
    const w = x + 8;
    return `<svg viewBox="0 0 ${w} ${h + 6}" class="rune-line" style="height:${opts.height || 44}px;width:auto;max-width:100%;color:${opts.color || 'currentColor'}">${s}</svg>`;
  }
  const runeBlock = (lines, opts) => `<div class="ch4-runes">${lines.map(l => `<div style="text-align:center;margin:4px 0">${runeLine(l, opts)}</div>`).join('')}</div>`;

  /* ---------- helpers ---------- */
  const wren = (normal, scared) => (F().WREN_SCARED ? scared : normal);
  const secretsFound = (f) => ['JOURNAL', 'MEMORY', 'TAPESTRY', 'GREY'].filter(k => f[k]).length;
  const hasMarrowLetter = (f) => !f.ORIEL && !f.SORREL && !f.VANE_ACCEPT;
  const computeLaw0 = () => { const f = F(); Store.set('LAW0', !!(f.LETTER_READ || f.TAPESTRY || f.ORIEL)); };

  /* The study, as a clickable room (four corners, four Sightings). */
  function roomSvg(f) {
    const hot = (id, x, y, w, h, label, who, color, found) => `<g class="ch4-hot${found ? ' found' : ''}" data-id="${id}"><rect class="hs" x="${x}" y="${y}" width="${w}" height="${h}" rx="8"/><text x="${x + 10}" y="${y + h - 22}" fill="${found ? '#8fbf8f' : '#e9e2d2'}">${label}${found ? ' ✓' : ''}</text><text class="who" x="${x + 10}" y="${y + h - 8}" fill="${color}">${who}</text></g>`;
    let s = `<svg viewBox="0 0 900 400">`;
    s += `<rect width="900" height="400" rx="10" fill="rgba(0,0,0,0.35)" stroke="rgba(212,169,78,0.25)"/>`;
    // wall line and floor
    s += `<path d="M0,300 L900,300" stroke="rgba(255,255,255,0.08)"/>`;
    // desk (left)
    s += `<rect x="60" y="240" width="220" height="14" rx="3" fill="#3a2a1c"/><rect x="72" y="254" width="14" height="60" fill="#2a1e14"/><rect x="254" y="254" width="14" height="60" fill="#2a1e14"/>`;
    s += `<path d="M120,238 L168,232 L172,238 L176,232 L224,238 Z" fill="#d9cba8"/><rect x="200" y="226" width="60" height="10" rx="2" fill="#3a2a30"/>`;
    s += `<circle cx="172" cy="236" r="60" fill="#ffd27a" opacity=".08"/>`;
    // tapestry (centre)
    s += `<rect x="340" y="40" width="260" height="180" fill="#3a2a1a"/>`;
    s += f.TAPESTRY ? window.VigilArt.ch4.foundersWalking(348, 48, 244, 164, { caption: false }) : window.VigilArt.ch4.orderPaint(348, 48, 244, 164);
    s += `<rect x="340" y="40" width="260" height="180" fill="none" stroke="#5a4020" stroke-width="4"/>`;
    // mantel and the bell (right, top)
    s += `<rect x="660" y="150" width="200" height="10" fill="#3a2a1a"/><rect x="690" y="160" width="140" height="130" rx="50" fill="#0a0708"/>`;
    s += `<g transform="translate(760,272)"><ellipse rx="26" ry="30" fill="#ff9a3c" opacity=".8"><animate attributeName="ry" values="30;36;28;34;30" dur="0.8s" repeatCount="indefinite"/></ellipse><ellipse rx="12" ry="18" fill="#fff0a0" opacity=".9"/></g>`;
    s += `<g transform="translate(820,148)"><path d="M-12,0 L-12,-8 Q-12,-26 0,-28 Q12,-26 12,-8 L12,0 Z" fill="#8a7040"/><circle cx="0" cy="3" r="3" fill="#c9a85a"/></g>`;
    // chair (right, bottom)
    s += `<g transform="translate(790,330)"><rect x="-44" y="-96" width="88" height="96" rx="12" fill="#1c1418"/><rect x="-54" y="-60" width="16" height="60" rx="6" fill="#241a1e"/><rect x="38" y="-60" width="16" height="60" rx="6" fill="#241a1e"/><rect x="-36" y="-34" width="72" height="34" rx="6" fill="#2a1e24"/></g>`;
    // hotspots
    s += hot('desk', 40, 190, 260, 150, 'the desk', 'Bookmoth', '#e0b04a', f.JOURNAL);
    s += hot('tapestry', 320, 20, 300, 250, 'the tapestry', 'Owl', '#a482e6', f.TAPESTRY);
    s += hot('bell', 650, 90, 230, 80, 'the bell on the mantel', 'Hush', '#4fb3bf', f.MEMORY);
    s += hot('chair', 680, 220, 200, 130, 'the Provost\'s chair', 'Knot', '#d96b4a', f.GREY);
    return s + `</svg>`;
  }

  /* A three-way question inside a discovery panel. Resolves when the right option is picked; wrong picks only say so. */
  function ask(into, prompt, options, correctId, wrongText) {
    return new Promise((resolve) => {
      const wrap = UI.el('div', {});
      wrap.appendChild(UI.el('p', { class: 'para', html: UI.rich(prompt) }));
      const opts = UI.el('div', { class: 'ch4-opts' });
      const st = UI.el('div', { class: 'pz-status' });
      let tries = 0;
      options.forEach((o, i) => opts.appendChild(UI.el('button', { class: 'btn choice', html: `<span class="choice-num">${i + 1}</span><span>${UI.rich(o.text)}</span>`, onclick: () => {
        if (o.id === correctId) { Audio.sfx('success'); Array.from(opts.children).forEach(b => b.disabled = true); st.className = 'pz-status good'; st.textContent = 'Found.'; setTimeout(resolve, 500); return; }
        tries++; Audio.sfx('wrong'); st.className = 'pz-status bad'; st.textContent = wrongText; if (tries >= 2) document.getElementById('hint').classList.add('attention');
      } })));
      wrap.appendChild(opts); wrap.appendChild(st); into.appendChild(wrap);
      try { wrap.scrollIntoView({ behavior: 'smooth', block: 'nearest' }); } catch (e) { /* headless */ }
    });
  }
  const para = (into, paragraphs) => paragraphs.forEach(p => { const isObj = typeof p === 'object'; const el = UI.el('p', { class: 'para' + (isObj && p.cls ? ' ' + p.cls : '') + (isObj && p.speaker ? ' speech' : '') }); if (isObj && p.speaker) el.appendChild(UI.el('span', { class: 'speaker', text: p.speaker })); el.appendChild(UI.el('span', { html: UI.rich(isObj ? p.text : p) })); into.appendChild(el); });

  /* The tapestry scrape: an overpaint layer masked away by dragging (or by the Scrape button). Resolves when the paint has given. */
  function scrape(into) {
    return new Promise((resolve) => {
      const Art = window.VigilArt.ch4;
      const box = UI.el('div', { class: 'ch4-scrape' });
      const id = 'ch4m' + Date.now();
      box.innerHTML = `<svg viewBox="0 0 600 300"><defs><mask id="${id}"><rect width="600" height="300" fill="#fff"/><g class="holes"></g></mask></defs>${Art.foundersWalking(0, 0, 600, 300, { caption: false })}<g class="over" mask="url(#${id})">${Art.orderPaint(0, 0, 600, 300)}</g></svg>`;
      into.appendChild(box);
      const row = UI.el('div', { class: 'pz-row' });
      const st = UI.el('div', { class: 'pz-status', text: 'Drag across the cloth to scrape, or press Scrape.' });
      const btn = UI.el('button', { class: 'btn', text: 'Scrape' });
      row.appendChild(btn); into.appendChild(row); into.appendChild(st);
      const svg = box.querySelector('svg'), holes = box.querySelector('.holes'), over = box.querySelector('.over');
      let n = 0, done = false, presses = 0, drawing = false;
      const hole = (x, y, r) => { holes.insertAdjacentHTML('beforeend', `<circle cx="${x.toFixed(0)}" cy="${y.toFixed(0)}" r="${r || 26}" fill="#000"/>`); n++; check(); };
      const finish = () => { if (done) return; done = true; over.style.opacity = '0'; Audio.sfx('reveal'); st.className = 'pz-status good'; st.textContent = 'The paint gives.'; btn.disabled = true; setTimeout(resolve, 1500); };
      const check = () => { if (n >= 60) finish(); else if (n > 0) st.textContent = n < 25 ? 'Something under it. Keep scraping.' : 'Figures. More than one. Keep going.'; };
      const pt = (e) => { const r = svg.getBoundingClientRect(); return [(e.clientX - r.left) / r.width * 600, (e.clientY - r.top) / r.height * 300]; };
      svg.addEventListener('pointerdown', (e) => { drawing = true; const [x, y] = pt(e); hole(x, y); Audio.sfx('tick'); });
      svg.addEventListener('pointermove', (e) => { if (!drawing || done) return; const [x, y] = pt(e); hole(x, y); });
      const stop = () => { drawing = false; };
      svg.addEventListener('pointerup', stop); svg.addEventListener('pointerleave', stop); svg.addEventListener('pointercancel', stop);
      btn.addEventListener('click', () => { if (done) return; presses++; Audio.sfx('tick'); const y = 40 + ((presses - 1) % 4) * 70; for (let x = 20; x < 600; x += 40) hole(x + (presses % 2) * 20, y + Math.sin(x / 50) * 12, 34); if (presses >= 4) finish(); });
    });
  }

  Game.addChapter({
    id: 'ch4', label: 'Chapter IV', title: 'The Oath', start: 'ch4_start', code: 'EMBER',
    mood: 'tower', fx: 'dust', art: 'ch4_study', flame: 0.5,
    flow: {
      nodes: [
        { id: 'ch4_start', label: 'The Provost\'s study', col: 0, row: 2 },
        { id: 'ch4_attune', label: 'EMBER', col: 1, row: 2 },
        { id: 'ch4_shelf', label: 'The False Shelf', col: 2, row: 2 },
        { id: 'ch4_s_journal', label: 'the journal — Bookmoth', col: 3, row: 0, secret: true, when: (s) => !!s.flags.JOURNAL },
        { id: 'ch4_s_memory', label: 'the memory-bell — Hush', col: 3, row: 1, secret: true, when: (s) => !!s.flags.MEMORY },
        { id: 'ch4_s_tapestry', label: 'under the paint — Owl', col: 3, row: 3, secret: true, when: (s) => !!s.flags.TAPESTRY },
        { id: 'ch4_s_grey', label: 'the grey thread — Knot', col: 3, row: 4, secret: true, when: (s) => !!s.flags.GREY },
        { id: 'ch4_s_rubbing', label: 'Mere\'s rubbing, read', col: 4, row: 0, secret: true, kind: 'end', when: (s) => !!s.flags.LETTER_READ },
        { id: 'ch4_s_note', label: 'a note under the cushion', col: 4, row: 4, secret: true, kind: 'end', when: (s) => !!(s.flags.ORIEL_NOTE || s.flags.MARROW_LETTER) },
        { id: 'ch4_swear', label: 'The Warden\'s Oath', col: 4, row: 2, kind: 'choice' },
        { id: 'ch4_oath_knot', label: 'sworn under KNOT', col: 5, row: 1, secret: true, when: (s) => s.flags.OATH === 1 },
        { id: 'ch4_oath_ember', label: 'sworn under EMBER', col: 5, row: 2, secret: true, when: (s) => s.flags.OATH === 2 },
        { id: 'ch4_refused', label: 'Refused to swear', col: 5, row: 3, secret: true },
        { id: 'ch5_start', label: 'The Long Stair', col: 6, row: 2, secret: true },
      ],
      edges: [['ch4_start', 'ch4_attune'], ['ch4_attune', 'ch4_shelf'], ['ch4_shelf', 'ch4_s_journal'], ['ch4_shelf', 'ch4_s_memory'], ['ch4_shelf', 'ch4_s_tapestry'], ['ch4_shelf', 'ch4_s_grey'],
        ['ch4_s_journal', 'ch4_s_rubbing'], ['ch4_s_grey', 'ch4_s_note'], ['ch4_s_journal', 'ch4_swear'], ['ch4_s_memory', 'ch4_swear'], ['ch4_s_tapestry', 'ch4_swear'], ['ch4_s_grey', 'ch4_swear'],
        ['ch4_swear', 'ch4_oath_knot'], ['ch4_swear', 'ch4_oath_ember'], ['ch4_swear', 'ch4_refused'], ['ch4_oath_knot', 'ch5_start'], ['ch4_oath_ember', 'ch5_start'], ['ch4_refused', 'ch5_start']],
    },
    scenes: {
      /* ---------- the study ---------- */
      ch4_start: {
        art: 'ch4_study', mood: 'court', fx: 'dust', sfx: 'open',
        title: 'The Provost\'s study',
        text: (s) => {
          const f = s.flags, out = [];
          if (f.SURRENDERED) {
            out.push('The Provost\'s study, at the top of the Bell Tower\'s third turning. Marrow is already there. So is Wren — got back from the Envoy\'s captain by means nobody asks about — and the Provost\'s knuckles are white on the edge of the desk.');
            out.push({ speaker: 'Marrow', text: 'You gave the child to a man with a writ. I have spent fourteen years — no. Not now. Sit down.' });
            out.push('Nobody sits.');
          } else {
            out.push('The Provost\'s study, at the top of the Bell Tower\'s third turning: four walls of books, a fire, a tapestry the width of the wall, and a desk with a primer lying open on it, as if someone had been interrupted.');
            if (f.DOOR === 'FIGHT') out.push('Behind you the ward on the Tower door is still smoking. Marrow looks at it, and at the four of you, and does not ask.');
            else if (f.DOOR === 'BLUFF') out.push({ speaker: 'Marrow', text: 'The Envoy\'s captain will not be fooled twice. Good, then, that you only needed once.' });
            else if (f.DOOR === 'WORD') out.push({ speaker: 'Marrow', text: 'On Vane\'s word.' }, 'She lets the sentence sit in the room a while.', { speaker: 'Marrow', text: 'We will speak of that.' });
            else if (f.DOOR === 'WRIT') out.push({ speaker: 'Marrow', text: 'Sorrel\'s writ.' }, 'Her mouth does something that is nearly a smile.', { speaker: 'Marrow', text: 'She will want paying for that. She always does.' });
            else out.push('Marrow stands at the fire with her back to it, which is how she stands when she has decided something.');
          }
          if (f.WREN_SCARED) out.push('Wren sits on the window seat, knees up. The fourth bell rang tonight. Wren came up the tower stair white and silent and has not made a single joke since — which is how you know.');
          else out.push({ speaker: 'Wren', text: 'She has a *fire*. In her *study*. Do you understand how unfair that is. We had a lamp.' }, 'Wren, on the window seat, drying out, says it without looking at the fire.');
          return out;
        },
        next: 'ch4_marrow', button: 'Marrow speaks',
      },
      ch4_marrow: {
        art: 'ch4_study', mood: 'court', fx: 'dust',
        text: (s) => {
          const f = s.flags, out = [];
          out.push({ speaker: 'Marrow', text: 'Midnight is an hour and a half away. By then the Hearth will be a blue tongue. There is a Sealing to prepare, and it is not a thing I can do with four fourth-years at my elbow.' });
          out.push({ speaker: 'Marrow', text: 'So I am going to ask you to swear the Warden\'s Oath. To see Wren into the Cold at midnight, *whatever the cost.* And to hold the bells while I work. You will not be asked twice.' });
          out.push('She looks at Wren when she says *whatever the cost*. Wren looks at the fire.');
          out.push(f.SURRENDERED ? { speaker: 'Marrow', text: 'After tonight I will decide what you are. Until then I need four hands, and you are the four I have.' } : { speaker: 'Marrow', text: 'Read the scroll. Argue. I would rather an oath argued over than an oath sworn quickly.' });
          out.push('A bell rings twice, far below. Marrow closes her eyes for exactly one breath.');
          out.push({ speaker: 'Marrow', text: 'The Convocation. Ten minutes. Stay with them, Wren. Stay *put*, for once in your life.' });
          out.push('The door shuts behind her. The primer of the older alphabet lies open on the desk — which she did not close.');
          out.push(f.WREN_SCARED ? { speaker: 'Wren', text: 'She left the primer.' } : { speaker: 'Wren', text: 'She left the primer *open*. She never leaves anything open. Bookmoth. *Bookmoth.*' });
          return out;
        },
        next: 'ch4_attune', button: 'The word',
      },
      ch4_attune: {
        type: 'code', art: 'ch4_study', mood: 'tower', fx: 'dust',
        text: [
          'Cut into the mantel above the fire, where four hundred years of smoke have not quite hidden it: a word, and a mark beside it. Each of you — your Companion, the word, the mark.',
          { text: 'This chapter the keyboard passes from hand to hand; the Hearth will call you by name. Owl reads aloud.', cls: 'whisper' },
        ],
        roles: 'Warden of the Hearth (keyboard): **pass it round — the Hearth calls names**. Voice (reads aloud): **Owl**.', sightSeconds: 90,
        next: 'ch4_shelf',
      },
      /* ---------- the False Shelf ---------- */
      ch4_shelf: {
        type: 'puzzle', puzzle: 'wheel', art: 'ch4_shelf', mood: 'tower', fx: 'dust', puzzleId: 'ch4_shelf', par: [3, 5],
        text: [
          'Four shelves. The third is wrong — Owl said so before anyone touched it, and Wren says the Provost hides things there "the way she hides everything: badly, and in plain sight."',
          'Eight great books, spines out, each stamped with one shape. Pull four, in an order, and the shelf opens — or it does not.',
          { text: 'Say what you see. Which way does this shelf hang, and what did the Founders leave behind them?', cls: 'whisper' },
        ],
        config: () => ({
          title: 'THE FALSE SHELF — the third shelf, eight books', note: 'Click the books in the order you would pull them. Four, then pull.',
          layout: 'row', maxLen: 4, submitText: 'Pull the books', emptyText: 'No books pulled yet.',
          slots: [['Spike', true], ['Flame', false], ['Hook', true], ['Crown', false], ['Spike', false], ['Hook', false], ['Flame', true], ['Crown', true]].map(([sh, inv], i) => ({ id: String(i + 1), svg: G.shapeInner(sh, inv), label: String(i + 1) })),
          answer: ['1', '3', '6', '4'],
          onWrong: (ids) => { const m = ids.join(',') === '5,6,3,8' ? 'The shelf sighs, and stays.' : 'The books slide back into their places. The shelf stays.'; UI.toast(m, 3200, 'bad'); return m; },
        }),
        hints: [
          'The shelf is one turned line — Owl knows which way it hangs, and Knot\'s Book says what a turned line does to every glyph on it.',
          'Which four glyphs did the Founders leave on their plinths in the Vault — Bookmoth\'s glossary keeps them — and in what order does the Hymn sing them? Hush has the phrase.',
          'Pull the books in positions 1, 3, 6 and 4, in that order. Read the way the shelf truly hangs, those are THORN, KNOT, VEIL, EMBER.',
        ],
        onSolve: () => { Store.note('You opened the false shelf in the Provost\'s study.'); },
        solvedText: () => [
          'Four books, four small clicks, and the third shelf swings out on a hinge nobody has oiled: a cabinet. In it, the Vigil roll, a journal with a green ribbon, and a scroll sealed in red wax.',
          wren({ speaker: 'Wren', text: 'Badly, and in plain sight. I *told* you.' }, 'Wren does not come to look.'),
        ],
        next: 'ch4_cabinet',
      },
      ch4_cabinet: {
        art: 'ch4_shelf', artParams: { open: true }, mood: 'tower', fx: 'dust', sfx: 'open',
        text: [
          'The scroll is the Oath. The seal is the Chair\'s — the glyph CROWN, pressed into the wax — and the first line reads *sworn to the Chair*. Nobody unrolls it further. Not yet.',
          'The study has other things in it. The primer on the desk. A bell on the mantel that is older than the mantel. A tapestry the width of the wall. The Provost\'s chair, still warm.',
          { text: 'Four Sightings; four corners of one room. The study keeps four secrets, and each is one of yours to find. Nobody can find another\'s.', cls: 'whisper' },
        ],
        next: 'ch4_secrets', button: 'Search the study',
      },
      /* ---------- four discoveries ---------- */
      ch4_secrets: {
        type: 'custom', art: 'ch4_study', artParams: (s) => ({ scraped: !!s.flags.TAPESTRY }), mood: 'tower', fx: 'dust',
        text: ['Ten minutes, less now. The keyboard goes to whoever\'s corner it is; everyone else says what they see.'],
        hints: [
          'Each corner of the study belongs to one Sighting: the desk is Bookmoth\'s, the bell is Hush\'s, the tapestry is Owl\'s, the chair is Knot\'s. Nobody can find another\'s.',
          'Bookmoth: the primer on your page reads the journal letter by letter. Hush: cup your ear to the bell. Owl: scrape until the paint gives, then say what the last hand holds. Knot: the thread\'s colour is the whole answer.',
          'The journal says FOURTEEN YEARS. IT LAUGHS AT MY JOKES. The bell keeps the Envoy\'s voice and the Provost\'s. The fourth hand on the tapestry holds a flame turned over. The Provost\'s thread to Wren is grey.',
        ],
        run: (box, api) => new Promise((resolve) => {
          const f = F();
          const wrap = UI.el('div', { class: 'pz ch4-study' });
          const count = UI.el('div', { class: 'ch4-count' });
          const room = UI.el('div', { class: 'ch4-room' });
          const panel = UI.el('div', { class: 'ch4-panel hidden' });
          const row = UI.el('div', { class: 'pz-row right' });
          const leave = UI.el('button', { class: 'btn ghost' });
          row.appendChild(leave);
          wrap.appendChild(count); wrap.appendChild(room); wrap.appendChild(panel); wrap.appendChild(row); box.appendChild(wrap);
          let finished = false;
          /* Design pacing table: the study's hint bell pulses at 6 minutes (tier 1) and again at 8 (tier 3). */
          const parTimers = [setTimeout(() => { if (!api.alive() || finished) return; document.getElementById('hint').classList.add('attention'); UI.toast('The fire stirs. It has something to whisper, if you ask.', 3200); Audio.sfx('chime'); }, 6 * 60000),
            setTimeout(() => { if (!api.alive() || finished) return; document.getElementById('hint').classList.add('attention'); UI.toast('The fire dims a little. Ask it.', 3200); }, 8 * 60000)];
          const renderRoom = () => {
            const n = secretsFound(f);
            count.textContent = `The study keeps four secrets: ${n} found`;
            room.innerHTML = roomSvg(f);
            room.querySelectorAll('.ch4-hot').forEach(el => el.addEventListener('click', () => open(el.dataset.id)));
            leave.textContent = n >= 4 ? 'Marrow returns' : `Stop searching — ${n} of four found`;
            leave.className = 'btn ' + (n >= 4 ? 'primary' : 'ghost');
            room.classList.remove('hidden'); panel.classList.add('hidden'); UI.clear(panel);
            api.flashArt('ch4_study', { scraped: !!f.TAPESTRY });
          };
          leave.addEventListener('click', () => { finished = true; parTimers.forEach(clearTimeout); computeLaw0(); Store.note(`The study kept four secrets; you found ${secretsFound(f)}.`); Audio.sfx('step'); resolve('ch4_return'); });
          const back = () => { const b = UI.el('div', { class: 'pz-row right' }); b.appendChild(UI.el('button', { class: 'btn small', text: 'Back to the room', onclick: () => { Audio.sfx('click'); renderRoom(); } })); panel.appendChild(b); try { b.scrollIntoView({ behavior: 'smooth', block: 'nearest' }); } catch (e) { /* headless */ } };
          const head = (t) => panel.appendChild(UI.el('div', { class: 'pz-title', text: t }));
          async function open(id) {
            room.classList.add('hidden'); panel.classList.remove('hidden'); UI.clear(panel); Audio.sfx('click');
            if (id === 'desk') {
              head('THE DESK — BOOKMOTH\'S CORNER');
              if (f.JOURNAL) { para(panel, ['The journal lies where it lay. The line is read.', { text: 'Fourteen years. It laughs at my jokes.', cls: 'letter' }]); back(); return; }
              para(panel, ['The primer of the older alphabet lies open. Under it, the Provost\'s journal, its ribbon marking a page written fourteen years ago. One line shows:']);
              panel.appendChild(UI.el('div', { html: runeBlock(['FOURTEEN YEARS.', 'IT LAUGHS AT MY JOKES.'], { height: 48 }) }));
              para(panel, [{ text: 'The Hearth cannot read it. Bookmoth can. Say it aloud, letter by letter if you must; the Warden types what it says.', cls: 'whisper' }]);
              const r = await window.VigilAnswer.build(panel, { fields: [{ label: 'the line', placeholder: 'what the journal says', len: 60, plain: true }], accept: (v) => /LAUGHS|JOKES/.test(v[0]), wrongText: 'That is not what it says. Bookmoth — letter by letter, and all of it: the second line too.', submitText: 'Read it', successText: 'Read.' }, api);
              if (!api.alive()) return; void r;
              Store.set('JOURNAL', true); Store.note('Bookmoth read the Provost\'s journal.');
              const out = [{ text: 'Fourteen years. It laughs at my jokes.', cls: 'letter' }];
              out.push(wren({ speaker: 'Wren', text: '"It." Huh. She writes *it*.' }, { speaker: 'Wren', text: 'It laughs.' }));
              out.push(wren('A pause, in which Wren decides to be flattered.', 'A pause.'), wren({ speaker: 'Wren', text: 'Well. I *am* funny.' }, { speaker: 'Wren', text: 'She wrote *it*.' }));
              if (f.LETTER && !f.LETTER_READ) { Store.set('LETTER_READ', true); Store.note('Mere\'s rubbing was read at last.'); out.push({ text: 'And in the primer\'s light the rubbing from Mere\'s niche comes clear on Bookmoth\'s page. It has waited four hundred years for a reader. Bookmoth — all of it, aloud.', cls: 'whisper' }); }
              para(panel, out); Audio.sfx('reveal'); back(); return;
            }
            if (id === 'bell') {
              head('THE MANTEL — HUSH\'S CORNER');
              if (f.MEMORY) { para(panel, ['The bell is quiet now. It has said what it remembers.']); back(); return; }
              para(panel, ['A small bell, older than the mantel it sits on. A memory-bell: struck, it says back the last thing said near it — but only to an Ear. To the Hearth it hums, and that is all.', { text: 'Hush — cup your ear to your page. Then say what the bell remembers, word for word, before anyone touches the keys.', cls: 'whisper' }]);
              await ask(panel, 'The bell keeps two voices. Whose?', [{ id: 'sorrel', text: 'Master Sorrel\'s, and Master Tarn\'s.' }, { id: 'vane', text: 'The Envoy\'s, and the Provost\'s.' }, { id: 'wren', text: 'Wren\'s, and the Provost\'s.' }], 'vane', 'The bell hums. Hush — listen again.');
              if (!api.alive()) return;
              Store.set('MEMORY', true); Store.note('Hush heard what the memory-bell kept.');
              para(panel, ['The bell goes quiet. Far below, the Hearth gutters and steadies, as if it had heard too.', wren({ speaker: 'Wren', text: 'She said that? *Through* her?' }, 'Wren has gone very still on the window seat.'), wren({ speaker: 'Wren', text: 'She never says things like that to my face. Only to Envoys.' }, { speaker: 'Wren', text: 'Through *it*. She said through it.' })]);
              Audio.sfx('chime'); back(); return;
            }
            if (id === 'tapestry') {
              head('THE TAPESTRY — OWL\'S CORNER');
              api.flashArt('ch4_tapestry', { scraped: !!f.TAPESTRY });
              if (f.TAPESTRY) { para(panel, ['The paint is gone. Four figures walk into the flame; the fourth hand holds a flame turned over. It will not go back under.']); back(); return; }
              para(panel, ['A hall, a fire, and one small figure walking into it alone: the Order\'s picture, woven — no. Painted. Painted *over* something. Owl has been saying so since the door.', { text: 'Scrape. Drag across the cloth, or press the button, until the paint gives. Then Owl says what the last hand holds.', cls: 'whisper' }]);
              await scrape(panel); if (!api.alive()) return;
              api.flashArt('ch4_tapestry', { scraped: true });
              await ask(panel, 'Four figures, walking into the flame. What does the fourth hand hold?', [{ id: 'child', text: 'A child, by the hand.' }, { id: 'crown', text: 'A crown.' }, { id: 'cold', text: 'A flame, turned over.' }], 'cold', 'Look again. Owl — say what you see, not what the Order painted.');
              if (!api.alive()) return;
              Store.set('TAPESTRY', true); Store.note('Owl scraped the tapestry and found four.');
              para(panel, ['Four figures walking into the flame. No child. The fourth hand holds a flame turned over — the glyph that is never written, written.', { text: '"I have seen what is under the paint in this hall," the Envoy said. So he had.', cls: 'omen' }, wren({ speaker: 'Wren', text: 'Four. That\'s — there are four of them. Where\'s the one born of four? Where am I?' }, { speaker: 'Wren', text: 'There\'s no child in it.' })]);
              back(); return;
            }
            if (id === 'chair') {
              head('THE CHAIR — KNOT\'S CORNER');
              if (f.GREY) { para(panel, ['The chair, still warm. The thread is grey. It was grey before you looked.']); back(); return; }
              para(panel, ['The Provost\'s chair, by the fire, still warm. Nothing in it; nothing on it. Knot — the threads: hers to the four of you, hers to the Convocation, hers to Wren.', { text: 'Knot says the colours. Then the Warden answers for the chair.', cls: 'whisper' }]);
              await ask(panel, 'The thread from the Provost to Wren is —', [{ id: 'red', text: 'Red. An oath.' }, { id: 'gold', text: 'Gold. The Crown\'s.' }, { id: 'grey', text: 'Grey.' }], 'grey', 'Look again, Knot. The colour is the whole of it.');
              if (!api.alive()) return;
              Store.set('GREY', true); Store.note('Knot saw the grey thread.');
              const out = [{ text: 'Grey. The colour of someone who has already said goodbye.', cls: 'omen' }];
              if (f.ORIEL) { Store.set('ORIEL_NOTE', true); Store.note('Oriel\'s note was found in the Provost\'s chair.'); out.push('Under the cushion, folded small: a note in Master Oriel\'s hand, left for whoever searched this chair. Knot has it. Knot — read it to them.'); }
              else if (hasMarrowLetter(f)) { Store.set('MARROW_LETTER', true); Store.note('Marrow\'s unsent letter was found in her chair.'); out.push('Under the cushion, an unsent letter in the Provost\'s hand, addressed to the Convocation and never sent. Knot has it. Knot — read it to them.'); }
              else out.push('Under the cushion, nothing but the shape of her.');
              out.push(wren({ speaker: 'Wren', text: 'Grey\'s a colour. I\'ve seen grey. Grey\'s fine.' }, 'Wren does not ask what colour.'));
              if (!f.WREN_SCARED) out.push('Nobody answers.');
              para(panel, out); Audio.sfx('chime'); back(); return;
            }
          }
          renderRoom();
        }),
      },
      ch4_return: {
        art: 'ch4_study', artParams: (s) => ({ scraped: !!s.flags.TAPESTRY }), mood: 'court', fx: 'dust', sfx: 'step',
        enter: () => computeLaw0(),
        text: (s) => {
          const f = s.flags, n = secretsFound(f), out = [];
          out.push(`The study kept four secrets. You found ${['none', 'one', 'two', 'three', 'all four'][n]}.`);
          out.push('The stair creaks. Marrow is back before her ten minutes, which means the Convocation went badly, or quickly, or both.');
          if (f.TAPESTRY) out.push('She sees the tapestry. She stops in the doorway for a long moment.', { speaker: 'Marrow', text: 'So. Owl.' }, 'And nothing else.');
          if (f.JOURNAL) out.push('The journal is exactly where it was. She notices anyway; she notices everything. She does not mention it.');
          out.push({ speaker: 'Marrow', text: 'The scroll. Bookmoth reads the glyphs, Owl the mark, Hush the order, Knot the Law. Then you swear, or you do not.' });
          out.push(wren({ speaker: 'Wren', text: 'For the record, I don\'t get a vote on the whatever-the-cost part. I checked.' }, 'Wren says nothing at all.'));
          return out;
        },
        next: 'ch4_swear', button: 'Unroll the scroll',
      },
      /* ---------- the Oath ---------- */
      ch4_swear: {
        type: 'choice', art: 'ch4_scroll', mood: 'court', fx: 'embers', choice: 'OATH_SWEAR',
        text: [
          'The scroll, unrolled: the Warden\'s Oath. To see Wren into the Cold at midnight, whatever the cost. To hold the bells while the Provost seals. Sworn to the Chair, under her seal — CROWN.',
          'Below the words, a ring of four slots and three glyphs worn nearly smooth, with a fourth space left empty for the lock.',
          { text: 'No bell counts this one. Argue as long as you need.', cls: 'whisper' },
        ],
        prompt: 'Swear the Warden\'s Oath?',
        options: [
          { id: 'swear', text: 'Swear it. Place the glyphs.', sub: 'Knot chooses the lock.', next: 'ch4_oath', set: { REFUSED_OATH: false } },
          { id: 'refuse', text: 'Refuse to swear.', sub: 'No oath at all. Marrow will not ask twice.', cls: 'dark', next: 'ch4_refused', set: { OATH: 0, OATH_KNOT: false, REFUSED_OATH: true }, note: 'You refused the Warden\'s Oath.' },
        ],
      },
      ch4_oath: {
        type: 'puzzle', puzzle: 'ring', art: 'ch4_scroll', mood: 'court', fx: 'embers', puzzleId: 'ch4_oath', /* untimed and no auto-hint: the design's pacing table gives the oath no hint bell; the table argues as long as it needs */
        text: [
          'The scroll\'s ring: four slots. Above them, three glyphs worn nearly smooth, and a fourth space the scroll calls the lock.',
          { text: 'Bookmoth places the first glyph. Hush the second. Owl the third. Knot places the lock — and Law 4 says what a lock is.', cls: 'whisper' },
        ],
        config: () => {
          const mine = {};   // slots filled so far (re-placing a slot does not move the keyboard on)
          return {
            title: 'THE WARDEN\'S OATH — sworn to the Chair', note: 'Pass the keyboard by name. Four glyphs; the last placed is the lock.',
            html: G.inscription([{ shape: 'Spike', inv: false, worn: true }, { shape: 'Flame', inv: false, worn: true }, { shape: 'Spike', inv: true, worn: true }, { shape: 'Crown', inv: false, worn: true, hidden: true }], { showMark: false }).replace('SHIELD', 'LOCK'),
            slots: 4, glyphs: glyphPalette(), fourHands: true, fourHandsText: 'FOUR HANDS — all four keys within a heartbeat, to swear it',
            onPlace: (g, slot) => { const before = Object.keys(mine).length; mine[slot] = g; const n = Object.keys(mine).length; if (n === before) return; const who = ['Hush', 'Owl', 'Knot'][n - 1]; if (who) UI.toast(`${who} — the keyboard.`, 1600); },
            check: (m) => {
              const three = m[4] === 'THORN' && m[1] === 'ASH' && m[2] === 'WELL';
              if (three && (m[3] === 'KNOT' || m[3] === 'EMBER')) return true;
              if (three && m[3] === 'COLD') return 'The scroll will not take that lock. Knot — Law 4: which glyphs can lock an oath?';
              if (three && !m[3]) return 'Three glyphs and no lock. An oath without a lock is a wish. Knot — Law 4.';
              if (three) return 'The three are right. The lock is not: Knot — Law 4.';
              return false;
            },
            wrongText: 'Frost creeps over the ring. It resets. The scroll waits.',
          };
        },
        hints: [
          'Owl — where is the mark on this ring? Bookmoth — three glyphs and a lock; which three?',
          'Down one, up four, then the lock: Hush\'s order, placed sunwise from the mark at slot 4. Knot\'s Law 4 says which glyphs can be a lock — and what each of them costs.',
          'THORN in slot 4, ASH in slot 1, WELL in slot 2. Slot 3 is the lock: KNOT or EMBER — both close the oath. Knot chooses which.',
        ],
        onSolve: (s, r) => {
          const lock = r && r.map ? r.map[3] : 'KNOT';
          Store.set('OATH', lock === 'KNOT' ? 1 : 2); Store.set('OATH_KNOT', lock === 'KNOT'); Store.set('REFUSED_OATH', false);
          Store.note(lock === 'KNOT' ? 'You swore the Warden\'s Oath under KNOT — it cannot be unbound.' : 'You swore the Warden\'s Oath under EMBER — it can be reconsidered.');
        },
        next: 'ch4_sworn', autoNext: true,
      },
      ch4_sworn: {
        art: 'ch4_scroll', mood: 'court', fx: 'embers', sfx: 'seal',
        text: (s) => {
          const f = s.flags, out = [];
          if (f.OATH === 1) {
            out.push('The ring closes under KNOT, and the wax of the seal softens for a moment, as if warmed. Marrow lets out a breath she has been holding since the door.');
            out.push({ speaker: 'Marrow', text: 'Bound. Good. Then I need not carry it alone.' });
            out.push('She puts her hand, briefly, on the nearest shoulder. It is the first time any of you has seen her touch anyone.');
            out.push(wren({ speaker: 'Wren', text: 'That\'s a KNOT, isn\'t it. I know that one. It\'s the one that doesn\'t come undone.' }, 'Wren looks at the ring for a long time and says nothing.'));
          } else {
            out.push('The ring closes under EMBER. The wax of the seal does not change. Marrow looks at the ring, and at the four of you, and sees an oath sworn.');
            out.push({ speaker: 'Marrow', text: 'Bound. Good. Then I need not carry it alone.' });
            out.push('She notices nothing, which is its own kind of grief.');
            out.push(wren({ speaker: 'Wren', text: 'That one\'s EMBER. *What remains.* Knot, you\'re shaking. Is that a Binder thing?' }, 'Wren is watching Knot, not the ring.'));
          }
          out.push({ speaker: 'Marrow', text: 'When the bells ring, hold them. Hold them whatever it costs. I will do the rest.' });
          out.push(f.WREN_SCARED ? 'Wren gets up off the window seat without being told, and goes to stand beside her.' : { speaker: 'Wren', text: 'She means me. "The rest." I\'m the rest.' });
          return out;
        },
        next: 'ch4_flow', button: 'The night moves on',
      },
      ch4_refused: {
        art: 'ch4_scroll', mood: 'sorrow', fx: 'ash', sfx: 'whoosh',
        text: (s) => [
          'The scroll stays unrolled, and unsworn. Marrow does not raise her voice. She never has.',
          { speaker: 'Marrow', text: 'Then you are no part of the Sealing. Go to your beds. I will do it as it was always going to be done: alone, with the child.' },
          wren({ speaker: 'Wren', text: 'They said *no*, Mum. Nobody says no to you. Did you hear it? I want to remember what it sounded like.' }, { speaker: 'Wren', text: '…they said no.' }),
          'She takes Wren by the hand — Wren lets her — and the door shuts behind them. It does not lock. Nothing in Thornhallow has locked against you yet.',
          { text: 'You will be at the stair before she is. Whatever else you are, you are not people who go to bed.', cls: 'whisper' },
        ],
        next: 'ch4_flow', button: 'The night moves on',
      },
      ch4_flow: {
        type: 'flow', art: 'ch4_study', artParams: (s) => ({ scraped: !!s.flags.TAPESTRY }), mood: 'hearth', fx: 'dust',
        enter: () => computeLaw0(),
        text: ['The bell. Midnight comes up the stair a step at a time.', { text: 'Four Sightings, four proofs. What was pooled here walks down with you.', cls: 'small' }],
        flowTitle: 'Chapter IV — the paths you walked',
        stats: (s) => { const f = s.flags; const oath = f.OATH === 1 ? 'sworn under **KNOT**' : f.OATH === 2 ? 'sworn under **EMBER**' : '**refused**'; return `The study kept four secrets: **${secretsFound(f)} found**. The Warden's Oath: ${oath}.${f.LETTER_READ ? ' Mere\'s rubbing was read.' : ''}${f.ORIEL_NOTE ? ' Oriel\'s note was found.' : ''}${f.MARROW_LETTER ? ' The Provost\'s unsent letter was found.' : ''}`; },
        next: 'ch5_start', button: 'The Long Stair',
      },
    },
  });
})();
