/* Chapter IV — The Oath (the Provost's study). Pass-around Warden; the Seer is the Voice. */
(function () {
  'use strict';
  const G = window.VigilGlyphs, UI = window.VigilUI, Store = window.VigilStore, Audio = window.VigilAudio;
  const glyphPalette = () => G.names.map(n => ({ id: n, svg: G.inner(n), label: n }));
  const F = () => Store.state.flags;

  /* ---------- chapter-local CSS (all selectors .ch4-) ---------- */
  try { (document.head || document.body).appendChild(Object.assign(document.createElement('style'), { textContent: `
    .ch4-room svg { width: 100%; max-height: 34vh; display: block; }
    .ch4-hot { cursor: pointer; }
    .ch4-hot .hs { fill: rgba(255,255,255,0.02); stroke: rgba(255,255,255,0.18); stroke-width: 1.5; stroke-dasharray: 5 4; transition: all .15s; }
    .ch4-hot:hover .hs { stroke: var(--gold); fill: rgba(212,169,78,0.10); }
    .ch4-hot.found .hs { stroke: var(--moss); stroke-dasharray: none; fill: rgba(120,180,120,0.06); }
    .ch4-hot text { font-family: var(--display); font-size: 12px; letter-spacing: .08em; }
    .ch4-hot .who { font-size: 11px; }
    .ch4-panel { display: flex; flex-direction: column; gap: 9px; animation: fadeUp .3s ease both; }
    .ch4-panel .para { margin: 0; font-size: 17px; }
    .ch4-panel .speech { padding-left: 14px; border-left: 2px solid var(--line); }
    .ch4-panel .speaker { display: block; font-family: var(--display); font-size: 12px; letter-spacing: 0.15em; text-transform: uppercase; color: var(--gold); margin-bottom: 2px; }
    .ch4-panel .whisper { color: var(--sea); font-style: italic; }
    .ch4-panel .omen { color: var(--violet); font-family: var(--hand); font-size: 19px; }
    .ch4-panel .letter { font-family: var(--hand); color: #d9cba8; background: rgba(255,240,200,0.05); padding: 8px 12px; border-radius: 4px; font-size: 19px; }
    .ch4-runes { background: rgba(255,240,200,0.05); border: 1px solid rgba(212,169,78,0.25); border-radius: 8px; padding: 8px 12px; }
    .ch4-runes svg { width: 100%; max-width: 640px; max-height: 11vh; display: block; margin: 0 auto; color: #e9dcb8; }
    .ch4-scrape { touch-action: none; user-select: none; cursor: crosshair; border-radius: 8px; overflow: hidden; }
    .ch4-scrape svg { width: 100%; max-height: 26vh; display: block; }
    .ch4-scrape .over { transition: opacity 1.6s ease; }
    .ch4-count { font-family: var(--display); font-size: 15px; letter-spacing: .1em; color: var(--gold); }
    @media (max-height: 760px) {
      .ch4-panel .para { font-size: 16px; }
      .ch4-panel { gap: 7px; }
      .ch4-runes { padding: 6px 10px; }
      .ch4-runes svg { max-height: 9vh; }
      .ch4-room svg { max-height: 30vh; }
      .ch4-scrape svg { max-height: 22vh; }
    }
    body[data-chapter="ch4"] .ring-pz .pz-note { line-height: 1.35; }
    body[data-chapter="ch4"] .ring-pz .wheel { width: min(40vh, 380px); height: min(40vh, 380px); }
    body[data-chapter="ch4"] .ring-pz .palette-grid { max-width: 380px; gap: 6px; }
    body[data-chapter="ch4"] .ring-pz .glyph.name-only { width: 84px; height: 44px; }
    @media (max-height: 760px) {
      body[data-chapter="ch4"] .ring-pz .wheel { width: min(27vh, 300px); height: min(27vh, 300px); }
      body[data-chapter="ch4"] .ring-pz .glyph.name-only { width: 76px; height: 38px; }
      body[data-chapter="ch4"] .ring-pz .glyph.name-only .gname { font-size: 12px; }
      body[data-chapter="ch4"] .ring-pz .pz-note { font-size: 15px; }
      body[data-chapter="ch4"] .ring-pz .wheel-wrap { gap: 12px; }
    }
  ` })); } catch (e) { /* headless shim without a document head */ }

  /* ---------- the older alphabet (24 letters; no Q, no X).
     KEEP BYTE-IDENTICAL with the copy in js/content/companion/ch4.js — the Hearth draws the journal
     from this table and only the Companion's primer decodes it. Edit one, edit both. ---------- */
  const OLD_RUNES = {
    A: 'M10,2 L10,26 M10,8 L18,14', B: 'M10,2 L10,26 M10,2 L18,10 L10,18', C: 'M16,4 L4,14 L16,24', D: 'M10,2 L10,26 M2,14 L18,14',
    E: 'M10,2 L10,26 M2,20 L10,14 L18,20', F: 'M10,2 L10,26 M10,6 L18,12 M10,14 L18,20', G: 'M6,2 L14,2 L14,26 L6,26', H: 'M6,2 L6,26 M14,2 L14,26 M6,10 L14,18',
    I: 'M10,2 L10,26', J: 'M10,2 L10,20 L4,26', K: 'M10,2 L10,26 M18,6 L10,14 L18,22', L: 'M10,2 L10,26 M10,26 L18,20',
    M: 'M4,2 L4,26 M16,2 L16,26 M4,2 L16,26', N: 'M4,2 L4,26 M16,2 L16,26 M4,26 L16,2', O: 'M10,4 L18,14 L10,24 L2,14 Z', P: 'M10,2 L10,26 M2,10 L10,2 L18,10',
    R: 'M10,2 L10,26 M2,20 L10,26 L18,20', S: 'M16,4 L6,10 L14,18 L4,24', T: 'M2,6 L18,6 M10,6 L10,26', U: 'M4,2 L10,26 L16,2',
    V: 'M4,4 L16,24 M16,4 L4,24', W: 'M2,4 L10,14 L18,4 M10,14 L10,26', Y: 'M10,2 L10,26 M2,20 L18,8', Z: 'M4,6 L16,6 M4,22 L16,22 M10,6 L10,22',
  };
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
  /* Left exactly as it was, ORIEL and all: ch5.js:8 computes the identical expression and ch5 is not
     editable here. ORIEL is the ch1 promise rather than ORIEL_NOTE, which looks wrong — but the two
     files must agree, so it is a report item, not an edit. */
  const computeLaw0 = () => { const f = F(); Store.set('LAW0', !!(f.LETTER_READ || f.TAPESTRY || f.ORIEL)); };

  /* ---------- the false shelf ----------
     Six great books. The Hearth prints a place number and a stamp rubbed past reading, and never a shape:
     the shapes are the Reader's, and the shared Book renders every glyph beside its name on the
     Listener's Ladder page, so a shape on a Hearth surface hands the Reader's monopoly away (R10.10).

       as they stand   1 EMBER  2 WELL   3 ASH   4 KNOT  5 CROWN  6 VEIL
       hung the other way up (every book says the opposite, and keeps its place)
                       1 CROWN  2 THORN  3 COLD  4 VEIL  5 EMBER  6 KNOT

     Enumerated over all 6*5*4*3 = 360 ordered four-picks, filtered by the shelf's phrase (up two, down
     one, up three) under each reading a table can hold — exactly one match each:
       upside down, places kept   2,5,6,4  THORN EMBER KNOT VEIL   <- the answer
       as they stand              4,2,1,5  KNOT WELL EMBER CROWN   <- decoy, disarmed by the Seer
       upside down, places mirrored 5,2,1,3                        <- decoy, disarmed by the Binder
     Drop the Reader: no word for any place, 360 candidates, no path. Drop the Listener: no phrase,
     360, no path. Drop the Seer: which end is marked is unknown, 2 candidates. Drop the Binder: the
     Reader's own Book gives reverse-and-invert but not "every book keeps its place", so the places may
     be mirrored, 2 candidates. Four pulls, then Wren kicks the board in. */
  const SPINES = ['EMBER', 'WELL', 'ASH', 'KNOT', 'CROWN', 'VEIL'];  // Reader — place 1..6, as the stamps stand
  const SHELF_ANSWER = ['2', '5', '6', '4'];
  const SHELF_STAND = '4,2,1,5';     // read as they stand
  const SHELF_MIRROR = '5,2,1,3';    // upside down, but pulled by the reading instead of by the place
  /* One worn spine, drawn six times: a book, two gilt bands, and a stamp rubbed past reading. */
  const spineSvg = '<g fill="none" stroke="currentColor" stroke-width="2" opacity=".65">'
    + '<rect x="-11" y="-17" width="22" height="34" rx="2"/><path d="M-8,-12 h16 M-8,12 h16"/>'
    + '<ellipse cx="0" cy="0" rx="6.5" ry="6.5" stroke-dasharray="2 3"/><path d="M-3.5,3 L-1,-3 M1,-2.5 L3.5,2.5" opacity=".7"/></g>';

  const CORNER = { desk: 'The desk — the Reader', bell: 'The mantel — the Listener', tapestry: 'The tapestry — the Seer', chair: 'The chair — the Binder' };
  /* The one line each corner leaves behind, printed once when found and again if the corner is reopened. */
  const FOUND = {
    desk: { text: 'Fourteen years. It laughs at my jokes.', cls: 'letter' },
    bell: { text: '"Then the Crown will go through me. And through it."', cls: 'letter' },
    tapestry: { text: 'Four walk into the fire. No child anywhere in it.', cls: 'letter' },
    chair: { text: 'Grey. The colour of someone who has already said goodbye.', cls: 'letter' },
  };

  /* The study, as a clickable room (four corners, four Sightings). The drawing carries the partition
     that a rule card would otherwise have to say in words. */
  function roomSvg(f) {
    const hot = (id, x, y, w, h, label, who, color, found) => `<g class="ch4-hot${found ? ' found' : ''}" data-id="${id}"><rect class="hs" x="${x}" y="${y}" width="${w}" height="${h}" rx="8"/><text x="${x + 10}" y="${y + h - 22}" fill="${found ? '#8fbf8f' : '#e9e2d2'}">${label}${found ? ' ✓' : ''}</text><text class="who" x="${x + 10}" y="${y + h - 8}" fill="${color}">${who}</text></g>`;
    let s = `<svg viewBox="0 0 900 400">`;
    s += `<rect width="900" height="400" rx="10" fill="rgba(0,0,0,0.35)" stroke="rgba(212,169,78,0.25)"/>`;
    s += `<path d="M0,300 L900,300" stroke="rgba(255,255,255,0.08)"/>`;
    // desk (left)
    s += `<rect x="60" y="240" width="220" height="14" rx="3" fill="#3a2a1c"/><rect x="72" y="254" width="14" height="60" fill="#2a1e14"/><rect x="254" y="254" width="14" height="60" fill="#2a1e14"/>`;
    s += `<path d="M120,238 L168,232 L172,238 L176,232 L224,238 Z" fill="#d9cba8"/><rect x="200" y="226" width="60" height="10" rx="2" fill="#3a2a30"/>`;
    s += `<circle cx="172" cy="236" r="60" fill="#ffd27a" opacity=".08"/>`;
    // tapestry (centre) — the Order's overpaint until the Seer has said what is under it
    s += `<rect x="340" y="40" width="260" height="180" fill="#3a2a1a"/>`;
    s += f.TAPESTRY ? window.VigilArt.ch4.foundersWalking(348, 48, 244, 164) : window.VigilArt.ch4.orderPaint(348, 48, 244, 164);
    s += `<rect x="340" y="40" width="260" height="180" fill="none" stroke="#5a4020" stroke-width="4"/>`;
    // mantel and the bell (right, top)
    s += `<rect x="660" y="150" width="200" height="10" fill="#3a2a1a"/><rect x="690" y="160" width="140" height="130" rx="50" fill="#0a0708"/>`;
    s += `<g transform="translate(760,272)"><ellipse rx="26" ry="30" fill="#ff9a3c" opacity=".8"><animate attributeName="ry" values="30;36;28;34;30" dur="0.8s" repeatCount="indefinite"/></ellipse><ellipse rx="12" ry="18" fill="#fff0a0" opacity=".9"/></g>`;
    s += `<g transform="translate(820,148)"><path d="M-12,0 L-12,-8 Q-12,-26 0,-28 Q12,-26 12,-8 L12,0 Z" fill="#8a7040"/><circle cx="0" cy="3" r="3" fill="#c9a85a"/></g>`;
    // chair (right, bottom)
    s += `<g transform="translate(790,330)"><rect x="-44" y="-96" width="88" height="96" rx="12" fill="#1c1418"/><rect x="-54" y="-60" width="16" height="60" rx="6" fill="#241a1e"/><rect x="38" y="-60" width="16" height="60" rx="6" fill="#241a1e"/><rect x="-36" y="-34" width="72" height="34" rx="6" fill="#2a1e24"/></g>`;
    // hotspots — the label carries whose corner it is, in that role's colour
    s += hot('desk', 40, 190, 260, 150, 'the desk', 'Reader', '#e0b04a', f.JOURNAL);
    s += hot('tapestry', 320, 20, 300, 250, 'the tapestry', 'Seer', '#a482e6', f.TAPESTRY);
    s += hot('bell', 650, 90, 230, 80, 'the bell on the mantel', 'Listener', '#4fb3bf', f.MEMORY);
    s += hot('chair', 680, 220, 200, 130, 'the chair by the fire', 'Binder', '#d96b4a', f.GREY);
    return s + `</svg>`;
  }

  const para = (into, paragraphs) => paragraphs.forEach(p => { const isObj = typeof p === 'object'; const el = UI.el('p', { class: 'para' + (isObj && p.cls ? ' ' + p.cls : '') + (isObj && p.speaker ? ' speech' : '') }); if (isObj && p.speaker) el.appendChild(UI.el('span', { class: 'speaker', text: p.speaker })); el.appendChild(UI.el('span', { html: UI.rich(isObj ? p.text : p) })); into.appendChild(el); });

  /* The tapestry scrape: an overpaint layer masked away by dragging (or by the Scrape button).
     It runs AFTER the Seer has answered, so nothing here can be read off the screen. */
  function scrape(into) {
    return new Promise((resolve) => {
      const Art = window.VigilArt.ch4;
      const box = UI.el('div', { class: 'ch4-scrape' });
      const id = 'ch4m' + Date.now();
      box.innerHTML = `<svg viewBox="0 0 600 300"><defs><mask id="${id}"><rect width="600" height="300" fill="#fff"/><g class="holes"></g></mask></defs>${Art.foundersWalking(0, 0, 600, 300)}<g class="over" mask="url(#${id})">${Art.orderPaint(0, 0, 600, 300)}</g></svg>`;
      into.appendChild(box);
      const row = UI.el('div', { class: 'pz-row' });
      const st = UI.el('div', { class: 'pz-status', text: 'Drag across the cloth, or press Scrape.' });
      const btn = UI.el('button', { class: 'btn', text: 'Scrape' });
      row.appendChild(btn); into.appendChild(row); into.appendChild(st);
      const svg = box.querySelector('svg'), holes = box.querySelector('.holes'), over = box.querySelector('.over');
      let n = 0, done = false, presses = 0, drawing = false;
      const hole = (x, y, r) => { holes.insertAdjacentHTML('beforeend', `<circle cx="${x.toFixed(0)}" cy="${y.toFixed(0)}" r="${r || 26}" fill="#000"/>`); n++; check(); };
      const finish = () => { if (done) return; done = true; over.style.opacity = '0'; Audio.sfx('reveal'); st.className = 'pz-status good'; st.textContent = 'The paint gives.'; btn.disabled = true; setTimeout(resolve, 1100); };
      const check = () => { if (n >= 50) finish(); else if (n > 0) st.textContent = 'The paint is lifting. Keep going.'; };
      const pt = (e) => { const r = svg.getBoundingClientRect(); return [(e.clientX - r.left) / r.width * 600, (e.clientY - r.top) / r.height * 300]; };
      svg.addEventListener('pointerdown', (e) => { drawing = true; const [x, y] = pt(e); hole(x, y); Audio.sfx('tick'); });
      svg.addEventListener('pointermove', (e) => { if (!drawing || done) return; const [x, y] = pt(e); hole(x, y); });
      const stop = () => { drawing = false; };
      svg.addEventListener('pointerup', stop); svg.addEventListener('pointerleave', stop); svg.addEventListener('pointercancel', stop);
      btn.addEventListener('click', () => { if (done) return; presses++; Audio.sfx('tick'); const y = 50 + ((presses - 1) % 3) * 90; for (let x = 20; x < 600; x += 40) hole(x + (presses % 2) * 20, y + Math.sin(x / 50) * 12, 40); if (presses >= 3) finish(); });
    });
  }

  Game.addChapter({
    id: 'ch4', label: 'Chapter IV', title: 'The Oath', start: 'ch4_start', code: 'EMBER',
    mood: 'tower', fx: 'dust', art: 'ch4_study', flame: 0.5,
    flow: {
      nodes: [
        { id: 'ch4_start', label: 'The Provost\'s study', col: 0, row: 2 },
        { id: 'ch4_attune', label: 'EMBER', col: 1, row: 2 },
        { id: 'ch4_shelf', label: 'The false shelf', col: 2, row: 2 },
        { id: 'ch4_s_journal', label: 'the journal — the Reader', col: 3, row: 0, secret: true, when: (s) => !!s.flags.JOURNAL },
        { id: 'ch4_s_memory', label: 'the bell — the Listener', col: 3, row: 1, secret: true, when: (s) => !!s.flags.MEMORY },
        { id: 'ch4_s_tapestry', label: 'under the paint — the Seer', col: 3, row: 3, secret: true, when: (s) => !!s.flags.TAPESTRY },
        { id: 'ch4_s_grey', label: 'the grey thread — the Binder', col: 3, row: 4, secret: true, when: (s) => !!s.flags.GREY },
        { id: 'ch4_s_rubbing', label: 'Mere\'s sheet, read', col: 4, row: 0, secret: true, kind: 'end', when: (s) => !!s.flags.LETTER_READ },
        { id: 'ch4_s_note', label: 'a note under the cushion', col: 4, row: 4, secret: true, kind: 'end', when: (s) => !!(s.flags.ORIEL_NOTE || s.flags.MARROW_LETTER) },
        { id: 'ch4_swear', label: 'The oath', col: 4, row: 2, kind: 'choice' },
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
          out.push('A fire, a wall of books, and a primer left open on the desk.');
          /* ch3 sets DOOR and this is that choice's only payoff, so it stays — one clause per value,
             each restating the fact it depends on (R3.4). */
          if (f.DOOR === 'FIGHT') out.push('The ward you broke on the Tower door is still smoking.');
          else if (f.DOOR === 'BLUFF') out.push('You are still holding the lie you told the captain.');
          else if (f.DOOR === 'WORD') out.push('You used the Envoy\'s name at the door. It opened.');
          else if (f.DOOR === 'WRIT') out.push('You came up on a writ, and nobody read it closely.');
          else out.push('Nobody stopped you on the stair.');
          out.push(f.SURRENDERED
            ? { speaker: 'Provost Marrow', text: 'You gave the child to a man with a writ. Not now. Sit down.' }
            : 'Provost Marrow stands with her back to the fire, which is how she stands when she has decided something.');
          out.push(f.WREN_SCARED
            ? 'Wren sits on the window seat, knees up, and has not made a joke since the stair.'
            : { speaker: 'Wren', text: 'She has a *fire*. In her study. We had a lamp.' });
          return out;
        },
        next: 'ch4_marrow', button: 'What she wants',
      },
      ch4_marrow: {
        art: 'ch4_study', mood: 'court', fx: 'dust',
        text: (s) => {
          const f = s.flags, out = [];
          out.push({ speaker: 'Provost Marrow', text: 'Midnight is ninety minutes off. By then this fire will be a blue tongue, and I will be under the school.' });
          out.push({ speaker: 'Provost Marrow', text: 'So I am asking you to swear an oath. Take Wren down into the Cold at midnight, whatever it costs.' });
          out.push('She says *whatever it costs* looking at Wren. Wren looks at the fire.');
          out.push({ speaker: 'Provost Marrow', text: 'The scroll is behind the third shelf. Read it. Argue. ' + (f.SURRENDERED ? 'After tonight I will decide what you are.' : 'I will be ten minutes.') });
          out.push('The door shuts. She has left the primer open, and she never leaves anything open.');
          return out;
        },
        next: 'ch4_attune', button: 'The word on the mantel',
      },
      ch4_attune: {
        type: 'code', art: 'ch4_study', mood: 'tower', fx: 'dust',
        text: [
          { text: 'Cut into the mantel above the fire: a word, and a mark beside it.', cls: 'whisper' },
          { text: 'Open the Companion. Take your seat. Type them both.', cls: 'whisper' },
          { text: 'Read your page. Say nothing yet.', cls: 'whisper' },
        ],
        roles: 'Warden (keyboard): **passed by name**. Voice (reads aloud): **the Seer**.', sightSeconds: 90,
        next: 'ch4_shelf',
      },
      /* ---------- the false shelf ---------- */
      ch4_shelf: {
        type: 'puzzle', puzzle: 'wheel', art: 'ch4_shelf', mood: 'tower', fx: 'dust', puzzleId: 'ch4_shelf', par: [3, 5, 7], clearWidget: true,
        text: [
          'Six great books, each stamped with a shape rubbed past reading.',
          { text: 'Reader — what the six books say.', cls: 'whisper' },
          { text: 'Listener — the phrase the shelf hums.', cls: 'whisper' },
          { text: 'Seer — which end of the board is marked.', cls: 'whisper' },
          { text: 'Binder — what that does to a book.', cls: 'whisper' },
          { text: 'Say all four out loud, then pull.', cls: 'whisper' },
        ],
        config: () => ({
          title: 'THE FALSE SHELF',
          note: 'Wren reads the plate screwed under the shelf: *Six books, six places. Pull **four** of them, in the order the phrase names them. The catch takes four pulls and no more. The stamps are rubbed to nothing, and the Reader\'s page has them clean.*',
          layout: 'row', maxLen: 4, maxTries: 4, submitText: 'Pull the books', emptyText: 'No books pulled yet.',
          slots: SPINES.map((_, i) => ({ id: String(i + 1), svg: spineSvg, label: String(i + 1) })),
          answer: SHELF_ANSWER,
          onWrong: (ids, tries) => {
            const k = ids.join(',');
            let m;
            if (ids.length < 4) m = 'Books out, and not four of them. The shelf wants one from each of you.';
            else if (k === SHELF_STAND) m = 'They slide back. You pulled them as they stand. Somebody here can see which end of this board is marked.';
            else if (k === SHELF_MIRROR) m = 'They slide back. Right words, wrong books. A board hung the other way up moves nothing. It only changes what a book says.';
            else if (ids.slice().sort().join(',') === '2,4,5,6') m = 'The four are right and the order is not. The order is the Listener\'s.';
            else m = 'The books slide back into their places.';
            if (tries >= 2 && ids.length === 4) m += ' Wren, from the window seat: "Has everybody actually said their bit?"';
            UI.toast(m, 3200, 'bad'); return m;
          },
        }),
        hints: [
          'Four answers, four people, nobody has two. What the books say, the Reader. What order, the Listener. Which end is marked, the Seer. What that does to a book, the Binder.',
          'The board was taken down, turned over and hung back up. Every book still stands where it stood. Only what it says has changed.',
          'Pull books 2, 5, 6 and 4, in that order. Then press Pull.',
        ],
        onSolve: (s, r) => { Store.note(r && r.failed ? 'The false shelf beat you. Wren kicked it in.' : 'You opened the false shelf in the Provost\'s study.'); },
        solvedText: (s, r) => (r && r.failed)
          ? ['Four pulls, and the catch will not give. Wren puts a boot through the board, and there is the cupboard.',
            { speaker: 'Wren', text: 'She will know it was me. Worth it.' }]
          : ['Four books out, and the third shelf swings open on a hinge nobody has oiled.',
            'Behind it, a cupboard, and a scroll sealed in red wax.',
            { text: 'THORN, EMBER, KNOT, VEIL. *A gate, kept, bound, hidden.*', cls: 'small' },
            wren({ speaker: 'Wren', text: 'Badly, and in plain sight. I told you.' }, 'Wren does not come to look.')],
        next: 'ch4_secrets', button: 'Search the study',
      },
      /* ---------- four discoveries, one to a Sighting ---------- */
      ch4_secrets: {
        type: 'custom', art: 'ch4_study', artParams: (s) => ({ scraped: !!s.flags.TAPESTRY }), mood: 'tower', fx: 'dust',
        text: [
          'Ten minutes, less now. Four Sightings, four corners of one room, and nobody can find another\'s.',
          { text: 'The keyboard goes to whoever\'s corner it is. Everyone else says what they see.', cls: 'whisper' },
        ],
        hints: [
          'Four corners, four Sightings. Words at the desk. A voice at the bell. Old paint on the tapestry. A thread on the chair.',
          'Nothing here is guessed. If a corner will not open, the page that opens it has not spoken.',
          'The journal: FOURTEEN YEARS. IT LAUGHS AT MY JOKES. The bell: the Envoy, and THROUGH IT. The tapestry: four, and none. The chair: grey, and red. Then stop searching.',
        ],
        run: (box, api) => new Promise((resolve) => {
          const f = F();   // a live reference: Store.set mutates this object in place
          const wrap = UI.el('div', { class: 'pz ch4-study' });
          const count = UI.el('div', { class: 'ch4-count' });
          const room = UI.el('div', { class: 'ch4-room' });
          const panel = UI.el('div', { class: 'ch4-panel hidden' });
          const row = UI.el('div', { class: 'pz-row right' });
          const leave = UI.el('button', { class: 'btn ghost' });
          row.appendChild(leave);
          wrap.appendChild(count); wrap.appendChild(room); wrap.appendChild(panel); wrap.appendChild(row); box.appendChild(wrap);
          let finished = false;
          /* runCustom does not honour par, so the two hint marks are hand-rolled: 6 minutes and 8. */
          const parTimers = [setTimeout(() => { if (!api.alive() || finished) return; document.getElementById('hint').classList.add('attention'); UI.toast('The fire stirs. It has something to whisper, if you ask.', 3200); Audio.sfx('chime'); }, 6 * 60000),
            setTimeout(() => { if (!api.alive() || finished) return; document.getElementById('hint').classList.add('attention'); UI.toast('The fire dims a little. Ask it.', 3200); }, 8 * 60000)];
          const renderRoom = () => {
            const n = secretsFound(f);
            count.textContent = `The study keeps four secrets: ${n} found`;
            room.innerHTML = roomSvg(f);
            room.querySelectorAll('.ch4-hot').forEach(el => el.addEventListener('click', () => open(el.dataset.id)));
            leave.textContent = n >= 4 ? 'Marrow returns' : `Stop searching — ${n} of four found`;
            leave.className = 'btn ' + (n >= 4 ? 'primary' : 'ghost');
            room.classList.remove('hidden'); panel.classList.add('hidden'); row.classList.remove('hidden'); UI.clear(panel);
            api.flashArt('ch4_study', { scraped: !!f.TAPESTRY });
          };
          leave.addEventListener('click', () => { finished = true; parTimers.forEach(clearTimeout); computeLaw0(); Store.note(`The study kept four secrets; you found ${secretsFound(f)}.`); Audio.sfx('step'); resolve('ch4_swear'); });
          const back = () => { const b = UI.el('div', { class: 'pz-row right' }); b.appendChild(UI.el('button', { class: 'btn small', text: 'Back to the room', onclick: () => { Audio.sfx('click'); renderRoom(); } })); panel.appendChild(b); try { b.scrollIntoView({ behavior: 'smooth', block: 'nearest' }); } catch (e) { /* headless */ } };
          const head = (t) => panel.appendChild(UI.el('div', { class: 'pz-title', text: t }));
          /* A found corner replaces its own question: the prompt, the runes and the answer box all go,
             so the discovery is the only thing in the box and the room can read it without scrolling. */
          const reveal = (t, paragraphs) => { UI.clear(panel); head(t); para(panel, paragraphs); back(); };
          async function open(id) {
            room.classList.add('hidden'); panel.classList.remove('hidden'); row.classList.add('hidden'); UI.clear(panel); Audio.sfx('click');

            /* --- the desk: the older alphabet. Only the Reader's primer decodes it. --- */
            if (id === 'desk') {
              head(CORNER.desk);
              if (f.JOURNAL) { para(panel, [FOUND.desk]); back(); return; }
              para(panel, ['Her journal, under the primer, open at a page written fourteen years ago.']);
              panel.appendChild(UI.el('div', { html: runeBlock(['FOURTEEN YEARS.', 'IT LAUGHS AT MY JOKES.'], { height: (typeof window !== 'undefined' && window.innerHeight < 760) ? 32 : 40 }) }));
              para(panel, [{ text: 'Reader — read it out, letter by letter. Both lines.', cls: 'whisper' }]);
              const r = await window.VigilAnswer.build(panel, {
                fields: [{ label: 'the first line', placeholder: 'two words', len: 30, plain: true }, { label: 'the second line', placeholder: 'five words', len: 40, plain: true }],
                accept: (v) => /FOURTEENYEARS/.test(v[0]) && /LAUGHS/.test(v[1]) && /JOKES/.test(v[1]),
                wrongText: 'That is not what it says. Reader — letter by letter, and both lines.', submitText: 'Read it', successText: 'Read.',
              }, api);
              if (!api.alive()) return; void r;
              Store.set('JOURNAL', true); Store.note('The Reader read the Provost\'s journal.');
              const out = [FOUND.desk];
              out.push(wren({ speaker: 'Wren', text: 'She writes *it*. And then she writes that.' }, { speaker: 'Wren', text: 'She wrote *it*.' }));
              if (f.LETTER && !f.LETTER_READ) { Store.set('LETTER_READ', true); Store.note('Mere\'s sheet was read at last.'); out.push({ text: 'The grey smear you took below comes clear. It is in your **Book** now.', cls: 'whisper' }); }
              reveal(CORNER.desk, out); Audio.sfx('reveal'); return;
            }

            /* --- the mantel: what the bell kept. The words exist on the Listener's page and nowhere else. --- */
            if (id === 'bell') {
              head(CORNER.bell);
              if (f.MEMORY) { para(panel, [FOUND.bell]); back(); return; }
              para(panel, ['A small bell, older than the mantel. Struck, it says back the last thing said near it — to an Ear only.',
                { text: 'Listener — who else was in this room, and how she answered.', cls: 'whisper' }]);
              const r = await window.VigilAnswer.build(panel, {
                fields: [{ label: 'the other voice', placeholder: 'a name', len: 16 }, { label: 'her last two words', placeholder: 'two words', len: 20 }],
                accept: [['VANE', 'LORDVANE', 'ENVOY', 'THEENVOY'], ['THROUGHIT']],
                wrongText: 'The bell hums and says it again. Listener — word for word.', submitText: 'Say it back', successText: 'Said.',
              }, api);
              if (!api.alive()) return; void r;
              Store.set('MEMORY', true); Store.note('The Listener heard what the memory-bell kept.');
              reveal(CORNER.bell, [FOUND.bell, 'Far below, the Hearth gutters, and steadies.',
                wren({ speaker: 'Wren', text: 'She never says things like that to my face. Only to Envoys.' }, { speaker: 'Wren', text: 'Through *it*. She said through it.' })]);
              Audio.sfx('chime'); return;
            }

            /* --- the tapestry: the Seer answers first, and only then does the paint come off. --- */
            if (id === 'tapestry') {
              head(CORNER.tapestry);
              if (f.TAPESTRY) { para(panel, [FOUND.tapestry]); back(); return; }
              para(panel, ['The Order\'s picture: a hall, a fire, one small figure walking in. Painted over older paint.',
                { text: 'Seer — say what is under it before anybody scrapes.', cls: 'whisper' }]);
              const r = await window.VigilAnswer.build(panel, {
                fields: [{ label: 'how many walk in', placeholder: 'a number', len: 8 }, { label: 'and how many children', placeholder: 'a number', len: 8 }],
                accept: [['FOUR', '4'], ['NONE', 'ZERO', '0', 'NO', 'NOBODY', 'NOTONE']],
                wrongText: 'That is what the Order painted. Seer — count what is under it.', submitText: 'Say what is under it', successText: 'Said.',
              }, api);
              if (!api.alive()) return; void r;
              UI.clear(panel); head(CORNER.tapestry);
              await scrape(panel); if (!api.alive()) return;
              Store.set('TAPESTRY', true); Store.note('The Seer scraped the tapestry and found four.');
              api.flashArt('ch4_study', { scraped: true });
              reveal(CORNER.tapestry, [FOUND.tapestry,
                { text: '"I have seen what is under the paint," the Envoy said. So he had.', cls: 'omen' },
                wren({ speaker: 'Wren', text: 'Four of them. Where is the one born of four? Where am I?' }, { speaker: 'Wren', text: 'There is no child in it.' })]);
              return;
            }

            /* --- the chair: thread colour, which lives on the Binder's page and in the Binder's Book. --- */
            if (id === 'chair') {
              head(CORNER.chair);
              if (f.GREY) { para(panel, [FOUND.chair]); back(); return; }
              para(panel, ['Her chair by the fire, still warm. Nothing in it.',
                { text: 'Binder — both her threads, by colour.', cls: 'whisper' }]);
              const r = await window.VigilAnswer.build(panel, {
                fields: [{ label: 'to Wren', placeholder: 'a colour', len: 12 }, { label: 'to the four of you', placeholder: 'a colour', len: 12 }],
                accept: [['GREY', 'GRAY'], ['RED']],
                wrongText: 'Look again, Binder. The colour is the whole of it.', submitText: 'Say the colours', successText: 'Seen.',
              }, api);
              if (!api.alive()) return; void r;
              Store.set('GREY', true); Store.note('The Binder saw the grey thread.');
              const out = [FOUND.chair];
              if (f.ORIEL) {
                Store.set('ORIEL_NOTE', true); Store.note('Oriel\'s note was found in the Provost\'s chair.');
                out.push('Under the cushion, a note from Master Oriel, who asked you to tell her everything.');
                out.push({ text: '"I scraped that paint myself, as a girl, with a bread-knife. Four. The Envoy saw it after me, and was sent away for it. — Oriel"', cls: 'letter' });
              } else if (hasMarrowLetter(f)) {
                Store.set('MARROW_LETTER', true); Store.note('Marrow\'s unsent letter was found in her chair.');
                out.push('Under the cushion, a letter she never sent.');
                out.push({ text: '"To the Convocation. I have chaired you nineteen years and lied to you for fourteen. Not in what I said. In what I did not. — I. Marrow"', cls: 'letter' });
              } else out.push('Under the cushion, nothing but the shape of her.');
              out.push(wren({ speaker: 'Wren', text: 'Grey is a colour. I have seen grey. Grey is fine.' }, 'Wren does not ask what colour.'));
              reveal(CORNER.chair, out); Audio.sfx('chime'); return;
            }
          }
          renderRoom();
        }),
      },
      /* ---------- the oath ---------- */
      ch4_swear: {
        type: 'choice', art: 'ch4_scroll', mood: 'court', fx: 'embers', choice: 'OATH_SWEAR',
        enter: () => computeLaw0(),
        text: (s) => {
          const f = s.flags, out = [];
          out.push('The stair creaks. Provost Marrow is back early, and does not say why.');
          if (f.TAPESTRY) out.push('She sees the tapestry, and stops in the doorway.');
          out.push({ speaker: 'Provost Marrow', text: (f.TAPESTRY ? 'So. The Seer. ' : '') + 'The scroll, then. Read it, all four of you. Then swear, or do not.' });
          out.push('Unrolled: take Wren into the Cold at midnight, whatever it costs. Below, a ring of four slots.');
          out.push(f.WREN_SCARED ? 'Wren says nothing at all.' : { speaker: 'Wren', text: 'For the record, I do not get a vote on the whatever-it-costs part.' });
          out.push({ text: 'No bell counts this one. Argue as long as you need.', cls: 'whisper' });
          return out;
        },
        prompt: 'Swear the oath?',
        options: [
          { id: 'swear', text: 'Swear it. Place the words.', sub: 'The Binder chooses the lock.', next: 'ch4_oath', set: { REFUSED_OATH: false } },
          { id: 'refuse', text: 'Refuse to swear.', sub: 'She will not ask twice.', cls: 'dark', next: 'ch4_refused', set: { OATH: 0, OATH_KNOT: false, REFUSED_OATH: true }, note: 'You refused the oath.' },
        ],
      },
      ch4_oath: {
        type: 'puzzle', puzzle: 'ring', art: 'ch4_scroll', mood: 'court', fx: 'embers', puzzleId: 'ch4_oath', par: [4, 6, 8],
        text: [
          'Four slots in the ring, and three words cut above it, worn nearly smooth.',
          { text: 'Reader — which three words.', cls: 'whisper' },
          { text: 'Listener — the order they come in.', cls: 'whisper' },
          { text: 'Seer — where the ring begins.', cls: 'whisper' },
          { text: 'Binder — which way round, and what may lock it.', cls: 'whisper' },
          { text: 'Say all four out loud. Then pass the keyboard.', cls: 'whisper' },
        ],
        config: () => {
          const mine = {};   // slots filled so far (re-placing a slot does not move the keyboard on)
          return {
            title: 'THE OATH',
            note: 'Provost Marrow, on her way out: *Three words go in the ring, then a lock. The lock is the **last** thing placed, and it is not written on the scroll. You choose it. The wax takes only **two** locks, and your Binder knows which.*',
            slots: 4, glyphs: glyphPalette(), showArrow: false,
            fourHands: true, fourHandsText: 'FOUR HANDS — all four keys within a heartbeat, to swear it',
            onPlace: (g, slot) => { const before = Object.keys(mine).length; mine[slot] = g; const n = Object.keys(mine).length; if (n === before) return; const who = ['Listener', 'Seer', 'Binder'][n - 1]; if (who) UI.toast(`${who} — the keyboard.`, 1600); },
            /* Enumerated over all 3393 legal boards (four slots, each empty or one of eight words, no
               repeats). Accepted: exactly 2 — ASH/WELL/KNOT/THORN and ASH/WELL/EMBER/THORN by slot
               1/2/3/4. Both are right; the lock is the story fork, not a right answer. Of the rest,
               1432 get the COLD line, 210 the no-lock line, 1749 the generic wrongText — and no branch
               ever confirms that the three are right, which is what used to collapse a 4x5 space.
               Drop the Reader: 3 boards derivable, 2 of them winners (the contour down-one-up-four fits
               three ladder triples and the third has no lock left). That is the weak seat, and every
               other ordering of these three words gives the same 3 — reported, not fixed.
               Drop the Listener: 12 boards. Drop the Seer: 8. Drop the Binder: 24. Each has 2 winners. */
            check: (m) => {
              if ([1, 2, 3, 4].some(i => m[i] === 'COLD')) return 'The wax will not take COLD. Binder — what has to hold, for a lock to hold?';
              const three = m[4] === 'THORN' && m[1] === 'ASH' && m[2] === 'WELL';
              if (three && (m[3] === 'KNOT' || m[3] === 'EMBER')) return true;
              if (m[1] && m[2] && m[4] && !m[3]) return 'Three words and no lock. An oath without a lock is a wish.';
              return false;
            },
            wrongText: 'Frost creeps over the ring. It forgets what you put in it.',
          };
        },
        hints: [
          'Four answers, four people, nobody has two. The three words, the Reader. Their order, the Listener. Where the ring begins, the Seer. Which way round, and what may close it, the Binder.',
          'The first word goes in the marked slot, not after it. Then round the way a clock goes. The last thing you place is the lock.',
          'THORN in slot 4, ASH in slot 1, WELL in slot 2. The lock goes in slot 3: KNOT or EMBER. Then four hands.',
        ],
        onSolve: (s, r) => {
          const lock = r && r.map ? r.map[3] : 'KNOT';
          Store.set('OATH', lock === 'KNOT' ? 1 : 2); Store.set('OATH_KNOT', lock === 'KNOT'); Store.set('REFUSED_OATH', false);
          Store.note(lock === 'KNOT' ? 'You swore the oath under KNOT — it cannot be unbound.' : 'You swore the oath under EMBER — it can be reconsidered.');
        },
        next: 'ch4_sworn', autoNext: true,
      },
      ch4_sworn: {
        art: 'ch4_scroll', mood: 'court', fx: 'embers', sfx: 'seal',
        text: (s) => {
          const f = s.flags, knot = f.OATH === 1, out = [];
          out.push(knot
            ? 'The ring closes under KNOT, and the wax of the seal softens, as if warmed.'
            : 'The ring closes under EMBER. The wax does not change.');
          out.push({ speaker: 'Provost Marrow', text: 'Bound. Good. Then I need not carry it alone.' });
          out.push({ speaker: 'Provost Marrow', text: 'When the bells ring tonight, hold them. I will do the rest.' });
          out.push(knot
            ? 'She puts a hand on the nearest shoulder. Nobody has seen her do that before.'
            : 'She notices nothing else, which is its own kind of grief.');
          out.push(wren(knot
            ? { speaker: 'Wren', text: 'That is a KNOT. It is the one that does not come undone.' }
            : { speaker: 'Wren', text: 'That one is EMBER. *What remains.* Binder, you are shaking.' },
          'Wren gets up and goes to stand beside her.'));
          return out;
        },
        next: 'ch4_flow', button: 'The night moves on',
      },
      ch4_refused: {
        art: 'ch4_scroll', mood: 'sorrow', fx: 'ash', sfx: 'whoosh',
        text: () => [
          'The scroll stays unrolled, and unsworn. Provost Marrow does not raise her voice. She never has.',
          { speaker: 'Provost Marrow', text: 'Then you are no part of this. Go to your beds. I will do it alone, with the child.' },
          wren({ speaker: 'Wren', text: 'They said *no*, Mum. Nobody says no to you. I want to remember it.' }, { speaker: 'Wren', text: '…they said no.' }),
          'She takes Wren by the hand, and the door shuts. It does not lock.',
          { text: 'You will be at the stair before she is.', cls: 'whisper' },
        ],
        next: 'ch4_flow', button: 'The night moves on',
      },
      ch4_flow: {
        type: 'flow', art: 'ch4_study', artParams: (s) => ({ scraped: !!s.flags.TAPESTRY }), mood: 'hearth', fx: 'dust',
        enter: () => computeLaw0(),
        text: ['The bell. Midnight comes up the stair a step at a time.', { text: 'The paths you walked, and the ones you did not.', cls: 'small' }],
        flowTitle: 'Chapter IV — the paths you walked',
        stats: (s) => {
          const f = s.flags;
          const n = ['none', 'one', 'two', 'three', 'all four'][secretsFound(f)];
          const oath = f.OATH === 1 ? 'You swore under KNOT, which does not come undone.' : f.OATH === 2 ? 'You swore under EMBER, which can be reconsidered.' : 'You refused to swear.';
          return `The study kept four secrets and you found ${n}. ${oath}`;
        },
        next: 'ch5_start', button: 'The Long Stair',
      },
    },
  });
})();
