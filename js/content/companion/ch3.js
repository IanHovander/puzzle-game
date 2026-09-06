/* Companion — Chapter III: The Whispering Gallery (VEIL · cast: VOTE_LOST, WREN_HURT, VANE_ACCEPT · mini-word LINEN) */
(function () {
  'use strict';
  const G = window.VigilGlyphs, L = window.VigilLore, CA = window.CompanionAudio, D = window.CompanionDraw, UI = window.VigilUI;
  const C = window.CompanionContent;
  const F = 'Cinzel,serif';

  /* ---------- the corridors, as data (mirrors the Hearth's published grid) ---------- */
  const CELLS = ['A1', 'A2', 'A3', 'A4', 'A5', 'B1', 'C1', 'B3', 'C2', 'C3', 'C4', 'D3', 'B5', 'C5', 'D5', 'E1', 'E2', 'E3', 'E4', 'E5'];
  const EDGES = [['A1', 'B1'], ['B1', 'C1'], ['A1', 'A2'], ['A2', 'A3'], ['A3', 'A4'], ['A4', 'A5'], ['A5', 'B5'], ['B5', 'C5'], ['C5', 'D5'], ['D5', 'E5'], ['E1', 'E2'], ['E2', 'E3'], ['E3', 'E4'], ['E4', 'E5'], ['C5', 'C4'], ['C4', 'C3'], ['C3', 'C2'], ['C3', 'D3'], ['D3', 'E3']];
  const DOORS = [['A3', 'B3'], ['B3', 'C3']];
  const LANDMARK = { A5: ['west', 'stair-foot'], B5: ['boot-room'], C5: ['porter\'s', 'lodge'], C4: ['drying-rack'], C3: ['damp wall'], A4: ['west corr.', 'south'], A3: ['linen chute'], E4: ['tower', 'stair-foot'], E3: ['east cross'], E2: ['east', 'corridor'], E1: ['cook\'s door'], A1: ['Gallery'], B3: ['LAUNDRY'], E5: ['Tower door'], D1: ['cook', '(locked)'] };
  const LOOP_A = ['west stair-foot', 'boot-room', 'porter\'s lodge', 'drying-rack', 'damp wall', 'drying-rack', 'porter\'s lodge', 'boot-room', 'west stair-foot', 'west corridor south', 'linen chute', 'west corridor south'];
  const LOOP_B = ['tower stair-foot', 'tower stair-foot', 'tower stair-foot', 'tower stair-foot', 'tower stair-foot', 'tower stair-foot', 'east cross', 'east corridor', 'cook\'s door', 'cook\'s door', 'east corridor', 'east cross'];

  /* ---------- Seer: the under-layer of the corridors ---------- */
  function underCorridors(hurt) {
    const S = 60, pad = 24, W = 5 * S + pad * 2, H = 5 * S + pad * 2 + 26;
    const col = (c) => c.charCodeAt(0) - 65, row = (c) => parseInt(c.slice(1), 10) - 1;
    const xy = (c) => ({ x: pad + col(c) * S, y: pad + row(c) * S });
    const open = new Set(); EDGES.forEach(([a, b]) => { open.add(a + '|' + b); open.add(b + '|' + a); });
    const door = new Set(); DOORS.forEach(([a, b]) => { door.add(a + '|' + b); door.add(b + '|' + a); });
    let s = `<svg viewBox="0 0 ${W} ${H}"><rect width="${W}" height="${H}" fill="#000"/>`;
    // wall cells: faint hatch
    s += `<defs><pattern id="ch3hatch" width="6" height="6" patternUnits="userSpaceOnUse"><path d="M0,6 L6,0" stroke="#fff" stroke-width=".5" opacity=".18"/></pattern></defs>`;
    for (let r = 0; r < 5; r++) for (let c = 0; c < 5; c++) {
      const id = String.fromCharCode(65 + c) + (r + 1); const p = { x: pad + c * S, y: pad + r * S };
      const isOpen = CELLS.includes(id);
      s += `<rect x="${p.x}" y="${p.y}" width="${S}" height="${S}" fill="${isOpen ? '#000' : 'url(#ch3hatch)'}" stroke="#fff" stroke-width="${isOpen ? 1.2 : 0.4}" opacity="${isOpen ? 1 : 0.7}"/>`;
      if (isOpen || LANDMARK[id]) s += `<text x="${p.x + 4}" y="${p.y + 10}" fill="#fff" font-size="8" font-family="${F}" opacity=".7">${id}</text>`;
      const lm = LANDMARK[id];
      if (lm) lm.forEach((ln, i) => { s += `<text x="${p.x + S / 2}" y="${p.y + 30 + i * 10 - (lm.length - 1) * 5}" text-anchor="middle" fill="${id === 'B3' ? '#a482e6' : '#fff'}" font-size="${id === 'B3' ? 9 : 7.5}" font-family="${F}">${UI.esc(ln)}</text>`; });
    }
    // open passages: erase the shared border; doors: dashed violet
    for (const a of CELLS) for (const b of CELLS) {
      if (a >= b) continue; const dc = col(b) - col(a), dr = row(b) - row(a); if (Math.abs(dc) + Math.abs(dr) !== 1) continue;
      const A = xy(a); const isOpen = open.has(a + '|' + b), isDoor = door.has(a + '|' + b);
      if (!isOpen && !isDoor) continue;
      if (dc) { const x = A.x + S; s += `<line x1="${x}" y1="${A.y + 8}" x2="${x}" y2="${A.y + S - 8}" stroke="${isDoor ? '#a482e6' : '#000'}" stroke-width="${isDoor ? 3 : 4}" ${isDoor ? 'stroke-dasharray="4 3"' : ''}/>`; }
      else { const y = A.y + S; s += `<line x1="${A.x + 8}" y1="${y}" x2="${A.x + S - 8}" y2="${y}" stroke="${isDoor ? '#a482e6' : '#000'}" stroke-width="${isDoor ? 3 : 4}" ${isDoor ? 'stroke-dasharray="4 3"' : ''}/>`; }
    }
    // Hob's spyhole at the porter's lodge: an eye on B5, C4, D5
    const hob = xy('C5');
    s += `<circle cx="${hob.x + S / 2}" cy="${hob.y + S - 10}" r="4" fill="none" stroke="#a482e6" stroke-width="1.5"/><circle cx="${hob.x + S / 2}" cy="${hob.y + S - 10}" r="1.5" fill="#a482e6"/>`;
    [['B5', -1, 0], ['D5', 1, 0], ['C4', 0, -1]].forEach(([c, dx, dy]) => { const t = xy(c); s += `<line x1="${hob.x + S / 2}" y1="${hob.y + S - 10}" x2="${t.x + S / 2}" y2="${t.y + S / 2}" stroke="#a482e6" stroke-width="1" stroke-dasharray="2 3" opacity=".8"/>`; });
    // the Tower door
    const g = xy('E5'); s += `<circle cx="${g.x + S / 2}" cy="${g.y + S / 2}" r="14" fill="none" stroke="#fff" stroke-dasharray="3 2"/>`;
    // legend
    s += `<g font-family="${F}" font-size="8" fill="#fff"><line x1="${pad}" y1="${H - 12}" x2="${pad + 22}" y2="${H - 12}" stroke="#a482e6" stroke-width="3" stroke-dasharray="4 3"/><text x="${pad + 28}" y="${H - 9}" fill="#a482e6">hidden door · needs its word</text><circle cx="${pad + 172}" cy="${H - 12}" r="4" fill="none" stroke="#a482e6"/><text x="${pad + 180}" y="${H - 9}" fill="#a482e6">Hob's spyhole</text></g>`;
    if (hurt) s += `<text x="${W - pad}" y="${pad - 8}" text-anchor="end" fill="#fff" font-size="8" font-family="${F}" opacity=".8">Wren cannot run tonight</text>`;
    return s + `</svg>`;
  }

  /* ---------- Seer: the Gallery, shadows as they fall ---------- */
  const underGallery = `<svg viewBox="0 0 360 220">
    <rect width="360" height="220" fill="#000"/>
    <g stroke="#fff" fill="none" stroke-width="1.2">
      <rect x="10" y="10" width="340" height="200"/>
      ${[0, 1, 2, 3, 4].map(i => `<rect x="${24 + i * 58}" y="22" width="40" height="52"/><rect x="${24 + i * 58}" y="150" width="40" height="52"/>`).join('')}
      <circle cx="330" cy="110" r="10"/><path d="M330,100 L330,88 M324,92 L336,92"/>
      <text x="330" y="136" text-anchor="middle" fill="#fff" font-size="9" font-family="Cinzel,serif" stroke="none">the lamp</text>
    </g>
    <g fill="#fff" opacity=".9"><circle cx="90" cy="110" r="6"/><circle cx="130" cy="96" r="6"/><circle cx="150" cy="128" r="6"/><circle cx="190" cy="106" r="6"/><circle cx="250" cy="112" r="5"/></g>
    <g stroke="#fff" stroke-width="3" opacity=".55" stroke-linecap="round"><path d="M90,110 L52,110"/><path d="M130,96 L96,92"/><path d="M150,128 L116,132"/><path d="M190,106 L154,104"/></g>
    <g stroke="#a482e6" stroke-width="3" opacity=".9" stroke-linecap="round"><path d="M250,112 L300,112"/></g>
    <g fill="#fff" font-size="9" font-family="Cinzel,serif"><text x="78" y="128">Bookmoth</text><text x="120" y="86">Hush</text><text x="140" y="146">Owl</text><text x="180" y="124">Knot</text><text x="238" y="130" fill="#a482e6">Wren</text></g>
    <text x="180" y="214" text-anchor="middle" fill="#fff" font-size="9" font-family="Cinzel,serif" opacity=".7">shadows, as they fall — the portraits have none</text>
  </svg>`;

  /* ---------- Seer: the Tower door's threshold ---------- */
  const towerCarving = (showMark) => G.inscription([{ shape: 'Flame', inv: false }, { shape: 'Spike', inv: false }], { showMark, mark: 'left', color: '#fff', markColor: '#a482e6' });
  const underTower = `<svg viewBox="0 0 360 210">
    <rect width="360" height="210" fill="#000"/>
    <g transform="translate(0,8)">${towerCarving(true).replace('<svg', '<svg x="90" y="0" width="180" height="60"')}</g>
    <text x="180" y="86" text-anchor="middle" fill="#a482e6" font-size="10" font-family="Cinzel,serif">the lintel's mark: on the left</text>
    <g stroke="#fff" fill="none" stroke-width="1.5" transform="translate(180,150)">
      <circle r="38"/>
      <circle cx="0" cy="-38" r="9"/><text x="0" y="-52" text-anchor="middle" fill="#fff" font-size="10" font-family="Cinzel,serif" stroke="none">1</text>
      <circle cx="0" cy="38" r="9"/><text x="0" y="60" text-anchor="middle" fill="#fff" font-size="10" font-family="Cinzel,serif" stroke="none">2</text>
      <path d="M24,-30 a38,38 0 0 1 14,30" stroke-width="1.5"/><path d="M38,0 l-5,-6 l-3,7 z" fill="#fff" stroke="none"/>
      <path d="M-14,-48 L-6,-38 L-14,-30 Z" fill="#a482e6" stroke="none"/>
    </g>
    <text x="70" y="150" text-anchor="end" fill="#a482e6" font-size="10" font-family="Cinzel,serif">the scratch — slot 1</text>
    <text x="180" y="204" text-anchor="middle" fill="#fff" font-size="9" font-family="Cinzel,serif" opacity=".7">two slots · sunwise = clockwise</text>
  </svg>`;

  /* ---------- Listener: the tally tool ---------- */
  function tallyTool(el) {
    let beat = 0, alarmUntil = -1;
    const big = UI.el('div', { class: 'big-digit', style: { fontFamily: 'Cinzel,serif', fontSize: '40px', textAlign: 'center', color: '#4fb3bf' } });
    const where = UI.el('div', { class: 'fine', style: { textAlign: 'center', minHeight: '3.2em' } });
    const at = (loop, b) => loop[((b - 1) % 12 + 12) % 12];
    const render = () => {
      big.textContent = beat === 0 ? '—' : 'beat ' + beat;
      if (beat === 0) { where.innerHTML = 'Before the first turn. Light steps at <b>west corridor south</b>; heavy boots at the <b>east cross</b>.'; return; }
      const b = alarmUntil >= beat ? 'tower stair-foot <em>(holding — the alarm)</em>' : at(LOOP_B, beat);
      where.innerHTML = `Light steps: <b>${at(LOOP_A, beat)}</b><br>Heavy boots: <b>${b}</b>` + (beat > 12 ? `<br><span class="fine">the loop has begun again (beat ${((beat - 1) % 12) + 1} of 12)</span>` : '');
    };
    el.appendChild(UI.el('p', { class: 'fine', text: 'Tap once for every turn the Hearth commits — a move or a wait. The rounds never change; only your count can slip.' }));
    el.appendChild(big); el.appendChild(where);
    el.appendChild(UI.el('div', { class: 'row', style: { display: 'flex', gap: '8px', flexWrap: 'wrap', justifyContent: 'center', marginTop: '8px' } }, [
      UI.el('button', { class: 'btn small', text: '▶ next beat', onclick: () => { beat++; render(); try { window.VigilAudio.sfx('tick'); } catch (e) {} } }),
      UI.el('button', { class: 'btn small ghost', text: '◀ one back', onclick: () => { beat = Math.max(0, beat - 1); render(); } }),
      UI.el('button', { class: 'btn small ghost', text: 'Hob cried out', onclick: () => { alarmUntil = beat + 3; render(); } }),
      UI.el('button', { class: 'btn small ghost', text: 'reset', onclick: () => { beat = 0; alarmUntil = -1; render(); } }),
    ]));
    render();
  }
  const loopTable = (loop) => ({ t: 'table', head: ['beat', 'you hear them at'], rows: loop.map((l, i) => [String(i + 1), l]) });

  const playSteps = (A, light) => { A.init(); if (A.isMuted()) A.setMuted(false); const n = light ? 8 : 5, gap = light ? 260 : 620; for (let i = 0; i < n; i++) CA.later(() => A.sfx(light ? 'step' : 'miss'), i * gap); return n * gap + 400; };
  const playPortraits = (A) => { A.init(); if (A.isMuted()) A.setMuted(false); [0, 1400, 2800].forEach((t, k) => CA.later(() => { A.sfx('whoosh'); [55, 52, 48, 43].forEach((m, i) => CA.later(() => A.note(m, 0.9, 0.06), 250 + i * 220)); }, t)); return 2800 + 250 + 4 * 220 + 900; };

  C.chapters.push({
    id: 'ch3',
    miniWords: { LINEN: 'speak' },
    pages: (roleId, ctx) => {
      const P = { sight: [], wren: [], speak: [] };
      const f = ctx.flags || {}; const hurt = !!f.WREN_HURT, lost = !!f.VOTE_LOST, accepted = !!f.VANE_ACCEPT;

      /* ================= READER ================= */
      if (roleId === 'reader') {
        P.sight.push({ t: 'h', text: 'Two lintels in the dark' });
        P.sight.push({ t: 'p', text: 'Somewhere between the Gallery and the Tower there are two doors the Hearth does not draw. You cannot see the doors. You can read what is carved over them — one shape each, clean on your page.' });
        P.sight.push({ t: 'p', text: '**The first lintel** — the west corridor, by the linen chute. A **Hook**.' });
        P.sight.push({ t: 'html', html: G.inscription([{ shape: 'Hook', inv: false }], { showMark: false }) });
        P.sight.push({ t: 'table', head: ['If the mark is…', 'the word is'], rows: [['on the left (upright)', `${G.svg('KNOT', { size: 30, color: '#f2d27a' })} KNOT — <em>bound; together</em>`], ['on the right (turned)', `${G.svg('VEIL', { size: 30, color: '#f2d27a' })} VEIL — <em>hidden; behind</em>`]] });
        P.sight.push({ t: 'p', text: '**The second lintel** — the Laundry\'s back door. A **Spike**.' });
        P.sight.push({ t: 'html', html: G.inscription([{ shape: 'Spike', inv: false }], { showMark: false }) });
        P.sight.push({ t: 'table', head: ['If the mark is…', 'the word is'], rows: [['on the left (upright)', `${G.svg('THORN', { size: 30, color: '#f2d27a' })} THORN — <em>a gate; to go through</em>`], ['on the right (turned)', `${G.svg('WELL', { size: 30, color: '#f2d27a' })} WELL — <em>down; from</em>`]] });
        P.sight.push({ t: 'fine', text: 'A lone glyph with its mark on the right simply inverts; there is nothing to read backwards. **Owl knows which end the mark is on.** Speak the wrong word and the wall stays a wall — nothing worse.' });
        P.sight.push({ t: 'divider' });
        P.sight.push({ t: 'h', text: 'Over the Tower door' });
        P.sight.push({ t: 'p', text: 'Two shapes, deep-cut, a Founder\'s hand: a **Flame**, then a **Spike**. A threshold, not a lock.' });
        P.sight.push({ t: 'html', html: towerCarving(false).replace(/#fff/g, '#e9e2d2') });
        P.sight.push({ t: 'table', head: ['If the line is…', 'it reads'], rows: [['upright (mark left)', `${G.svg('ASH', { size: 30, color: '#f2d27a' })} ASH, ${G.svg('THORN', { size: 30, color: '#f2d27a' })} THORN — <em>fire, go through</em>`], ['turned (mark right)', `${G.svg('WELL', { size: 30, color: '#f2d27a' })} WELL, ${G.svg('COLD', { size: 30, color: '#f2d27a' })} COLD — <em>down, cold</em>`]] });
        P.sight.push({ t: 'fine', text: 'You will only need this if the night comes to fighting.' });
        P.wren.push({ t: 'h', text: 'The plaques' });
        P.wren.push({ t: 'p', text: 'Every portrait in the Gallery has a brass plaque in the Vigil\'s script: a name, a House, a year. The four oldest frames — the ones nearest the lamp, the ones that mutter loudest — have plaques in the **older alphabet**. The same alphabet as the name on the dormitory door.' });
        P.wren.push({ t: 'p', text: lost ? 'Wren, brought back from the dais by the Provost\'s own hand, stood under those four frames and did not look up at them. Wren always looks up at them.' : 'Wren stood under those four frames tonight and did not look up at them. Wren always looks up at them.' });
        P.wren.push({ t: 'fine', text: 'You still cannot read them. You are beginning to mind.' });
      }

      /* ================= LISTENER ================= */
      if (roleId === 'listener') {
        P.sight.push({ t: 'h', text: 'Two patrols, by landmark' });
        P.sight.push({ t: 'p', text: 'The lamps are out, and the Hearth draws no guards. You hear them. Two rounds, each **twelve beats** long, each repeating exactly; one beat is one turn on the Hearth. You hear *where* they are by what their boots pass — not by room letters. Owl knows where the landmarks are.' });
        P.sight.push({ t: 'audio', label: 'Light steps — Patrol A', strip: `<div class="fine">quick, soft, a lantern swinging; ${LOOP_A.length} beats then round again</div>`, play: (A) => playSteps(A, true), text: 'On the beat before the first turn they are at **west corridor south**.' });
        P.sight.push(loopTable(LOOP_A));
        P.sight.push({ t: 'audio', label: 'Heavy boots — Patrol B', strip: `<div class="fine">slow, iron-shod, two of them; they stand a long time at the tower stair-foot</div>`, play: (A) => playSteps(A, false), text: 'On the beat before the first turn they are at the **east cross**.' });
        P.sight.push(loopTable(LOOP_B));
        P.sight.push({ t: 'fine', text: 'If Hob the porter cries out, the heavy boots leave their round and **hold the tower stair-foot for three beats**, then pick the round up where the count says it should be.' });
        P.sight.push({ t: 'h', text: 'The tally' });
        P.sight.push({ t: 'custom', render: (el) => tallyTool(el) });
        P.sight.push({ t: 'divider' });
        P.sight.push({ t: 'h', text: 'The portraits' });
        P.sight.push({ t: 'audio', label: 'Two hundred years of Masters, muttering', strip: `<div class="fine">…four went down… four went down… four went down…</div>`, play: playPortraits, text: 'They all say the same thing, over and over, in different voices. Nobody else can make out the words. **"…four went down…"** You have not decided what it means and you are not going to decide tonight.' });
        P.sight.push({ t: 'h', text: 'Heartbeats in the Gallery' });
        P.sight.push({ t: 'html', html: `<div class="heartbeats">${[['The Provost', 'normal'], ['Bess, in the Laundry', 'normal'], ['Hob, at the lodge', 'fast'], ['Vane\'s captain', 'normal'], ['Bookmoth', 'normal'], ['Owl', 'normal'], ['Knot', 'normal']].map(([n, k]) => `<div class="hb"><span>${n}</span>${D.trace(k)}</div>`).join('')}<div class="hb"><span>Wren</span>${D.trace('flat')}</div></div>` });
        P.sight.push({ t: 'fine', text: 'Hob\'s is quick and greedy. The Provost\'s is slower than it was in the Hall. Wren: too quiet to catch. Still.' });
        P.wren.push({ t: 'h', text: 'What the frames say' });
        P.wren.push({ t: 'whisper', text: '…four went down… four went down… four went down…' });
        P.wren.push({ t: 'p', text: hurt ? 'Wren, one arm strapped up in a sling of Knot\'s cloak, walked past the frames whispering *shut up, shut up, shut up* at them, cheerfully, the way you would at a dog. They did not.' : 'Wren walked past the frames tonight whispering *shut up, shut up, shut up* at them, cheerfully, the way you would at a dog. They did not.' });
        P.wren.push({ t: 'p', text: 'In the dark, with the lamps out, you will be able to hear every heart in these corridors. Every guard\'s. Bess\'s. Hob\'s. Not the one walking next to you.' });
      }

      /* ================= SEER ================= */
      if (roleId === 'seer') {
        P.sight.push({ t: 'h', text: 'Under the corridors' });
        P.sight.push({ t: 'p', text: 'The Hearth draws rooms by letter and number. Hush hears the patrols by **landmark**. Only you can put the two together. Beneath the plaster: two hidden doors the Hearth does not draw, and a spyhole.' });
        P.sight.push({ t: 'svg', cls: 'underlayer', svg: underCorridors(hurt) });
        P.sight.push({ t: 'list', items: [
          '**The Laundry (B3)** has two hidden doors: one from the west corridor by the **linen chute (A3)**, one out through its back wall to the **damp wall (C3)**. Neither is drawn on the Hearth; each needs its word spoken.',
          '**The west door\'s lintel** (A3→B3): its mark is on the **right**. **The Laundry\'s back door** (B3→C3): its mark is on the **left**. Bookmoth reads the shapes.',
          '**Hob\'s spyhole** in the porter\'s lodge (C5) looks into the boot-room (B5), the drying-rack corridor (C4) and the corridor past the lodge (D5). Step into any of those and Hob sees.',
          'Sight passes only along open passages. A hidden door blocks it; so does a wall.',
        ] });
        P.sight.push({ t: 'h', text: 'Landmarks by room' });
        P.sight.push({ t: 'table', head: ['Hush hears…', 'which is'], rows: [['west stair-foot', 'A5'], ['boot-room', 'B5'], ['porter\'s lodge', 'C5'], ['drying-rack', 'C4'], ['damp wall — the Laundry\'s back', 'C3'], ['west corridor south', 'A4'], ['linen chute', 'A3'], ['tower stair-foot', 'E4'], ['east cross', 'E3'], ['east corridor', 'E2'], ['cook\'s door', 'E1 (the door itself is D1, locked)']] });
        P.sight.push({ t: 'divider' });
        P.sight.push({ t: 'h', text: 'Under the Tower door' });
        P.sight.push({ t: 'p', text: 'A threshold sigil of **two slots**. The lintel\'s mark is on the **left** — upright, left to right. The ring\'s scratch is at **slot 1**.' });
        P.sight.push({ t: 'svg', cls: 'underlayer', svg: underTower });
        P.sight.push({ t: 'fine', text: 'Only needed if the night comes to fighting. Your Ring Page is in the **Book**.' });
        P.sight.push({ t: 'h', text: 'Under the Gallery' });
        P.sight.push({ t: 'svg', cls: 'underlayer', svg: underGallery });
        P.wren.push({ t: 'h', text: 'The portraits' });
        P.wren.push({ t: 'p', text: 'Two hundred painted Masters, and not one of them casts a shadow in the lamplight — paint does not. Five living people, and five shadows. Four fall away from the lamp.' });
        P.wren.push({ t: 'p', text: hurt ? 'Wren\'s falls toward it, and one arm of it hangs wrong, the way Wren\'s does now. It always has fallen that way. You have run out of lamps to blame.' : 'Wren\'s falls toward it. It always has. You have run out of lamps to blame.' });
        P.wren.push({ t: 'fine', text: lost ? 'On the dais, under guard, with every candle in the Hall lit — the same. You looked. You did not say.' : 'You have not said so. Not yet. Wren has started noticing you looking.' });
      }

      /* ================= BINDER ================= */
      if (roleId === 'binder') {
        P.sight.push({ t: 'h', text: 'Threads in the corridors' });
        P.sight.push({ t: 'p', text: 'Three people live between the Gallery and the Tower tonight, and each of them is tied to something. The Hearth cannot see the thread. You can.' });
        P.sight.push({ t: 'list', items: [
          '**Bess, in the Laundry.** A **red** thread, old and thick, to the Provost — an oath, thirty years kept. The Laundry is Bess\'s and nobody else\'s; it has *never* been searched, by soldiers or Masters or anyone. Wren could sit on a tub in there until morning and be safe. Owl can find its doors.',
          '**Hob, the porter, in his lodge.** A **gold** thread, new and bright, to the Envoy. Crown coin. Hob has a spyhole and a loud voice, and he is being paid to use both.',
          '**The cook, behind the locked door.** No thread at all. Asleep, or pretending. The door stays locked either way; row 1 goes nowhere.',
          '**The two patrols.** Gold threads, thin ones, to Vane\'s captain. They walk their rounds and would not know Wren from a laundry basket in the dark — unless they stand in the same room, or see straight down an open passage.',
        ] });
        if (accepted) P.sight.push({ t: 'omen', text: 'And one more. From each of your own wrists — a gold thread, very thin, very new, running down the stair to the Envoy. You tied it yourselves in the Hall. It does not pull. Yet.' });
        P.sight.push({ t: 'fine', text: '**Wren:** *No thread found.* Not unbound; the knot itself. Every chapter, the same.' });
        P.sight.push({ t: 'divider' });
        P.sight.push({ t: 'h', text: 'The Laws that bind tonight' });
        P.sight.push({ t: 'html', html: `<div class="laws"><div class="law founders"><div class="era">Law 1 · Founders' · Year 0</div><div class="txt">A sigil is read sunwise from the mark.</div></div><div class="law founders"><div class="era">Law 3 · Founders' · Year 0</div><div class="txt">Where two Laws disagree, the older binds.</div></div></div>` });
        P.sight.push({ t: 'p', text: 'The Tower door\'s threshold is a sigil like any other: Owl calls the mark, Bookmoth the glyphs, Hush the order, and it is placed **sunwise from the mark**. No newer Law touches it. There is no Law about the Laundry; there is only Bess.' });
        P.sight.push({ t: 'fine', text: 'The full Book of Laws is in your **Book**, in the order learned and by year.' });
        P.wren.push({ t: 'h', text: 'A thread you have not looked at' });
        P.wren.push({ t: 'p', text: 'Every thread in the Gallery tonight, you read at a glance: Bess, Hob, the captain, the two hundred dead in oil (none — paint has no threads). There is one you have not let yourself look at: the one from the Provost to Wren. You know what colour a mother\'s thread is. You have decided not to find out what colour this one is. Not tonight.' });
        P.wren.push({ t: 'p', text: hurt ? 'Wren, the bad arm strapped in what is left of your cloak, took your arm on the stair with the good hand, without asking. There was no thread in it. There was a hand.' : (lost ? 'The Provost brought Wren back from the dais herself, and when she let go of Wren\'s shoulder, you looked at her hand instead of at the thread.' : 'When Wren laughed at the frames tonight, you looked for the thread that laughter makes. Nothing. Not unbound. The knot itself.') });
      }

      /* ================= SPEAK (gated by LINEN) ================= */
      if (!ctx.mini('LINEN')) {
        P.speak.push({ t: 'h', text: 'Sealed' });
        P.speak.push({ t: 'p', text: 'Wren has not whispered to you yet. When Wren does, the Hearth will give you one small word with no mark. Go back to **Pages** and enter it there; this tab opens.' });
        P.speak.push({ t: 'fine', text: L.houseRule });
      } else {
        const Q = {
          reader: { prompt: hurt ? 'Wren, the arm re-strapped in a clean laundry sheet, does not look at you while asking it. *"Bookmoth. You read everything. What does my name mean in the old tongue? Properly. Not the Provost\'s version."*' : 'Wren, over the kettle, so the others cannot hear. *"Bookmoth. You read everything. What does my name mean in the old tongue? Properly. Not the Provost\'s version."*',
            opts: [['TELL', 'Tell Wren: **"A small brave bird."** ~~(a bluff — it is not in any alphabet you know)~~'], ['DONTKNOW', '**"I don\'t know yet."** ~~(the truth)~~']],
            after: { TELL: 'Wren grins, delighted, and says it twice under the breath. *A small brave bird.* You made that up. It sounded true, which is not the same thing.', DONTKNOW: 'Wren nods, not disappointed. *"Yet. Good. Tell me when."* You will, you think. You are not sure when.' } },
          listener: { prompt: hurt ? 'Wren, sitting on a tub with the bad arm held close, asks it to the arm rather than to you. *"Hush. You say you hear everyone\'s heart. Can you hear mine?"*' : 'Wren, pretending to fold a sheet, so it looks like nothing. *"Hush. You say you hear everyone\'s heart. Can you hear mine?"*',
            opts: [['LOUD', '**"Yes. Loud."** ~~(a lie)~~'], ['NO', '**"No."** ~~(the truth)~~']],
            after: { LOUD: 'Wren looks pleased, and then looks at you a moment too long, and then goes back to the sheet. You have never heard it. You said loud.', NO: 'Wren does not flinch. *"Right. Okay. Thank you for not — right."* The kettle covers whatever comes next.' } },
          seer: { prompt: hurt ? 'Wren, hurt and trying not to show it, asks without warning. *"Owl. You look at me strangely sometimes. More, since the stair. What do you see?"*' : 'Wren, close, in the steam. *"Owl. You look at me strangely sometimes. You\'re doing it now. What do you see?"*',
            opts: [['TELL', 'Tell Wren about **the shadow**: it falls toward the fire. Every fire. ~~(the truth)~~'], ['NOTHING', '**Say nothing.** Look at the wall.']],
            after: { TELL: 'Wren listens to the whole thing and does not laugh. *"Toward. Huh."* Then, after a while: *"That\'s very poetic, Owl."* You did not mean it poetically.', NOTHING: 'You look at the wall. Wren looks at you looking at it, and lets you.' } },
          binder: { prompt: hurt ? 'Wren, white around the mouth, keeping the voice light. *"Knot. Honestly. Do you think I\'m really the one? Because the one should be able to walk down a stair."*' : 'Wren, quietly, with a laundry basket between you as if it were a table. *"Knot. Honestly. Do you think I\'m really the one?"*',
            opts: [['YES', '**"Yes."**'], ['DONTKNOW', '**"I don\'t know."** ~~(the truth)~~']],
            after: { YES: 'Wren nods like someone receiving a verdict they expected. *"Right. Yes. Good to have it from a Binder."* You said yes because it was kind. You are not sure it was kind.', DONTKNOW: 'Wren is quiet for a moment. *"Nobody\'s ever said that to me. Everyone always knows."* And then, almost too low to hear: *"Thanks."*' } },
        }[roleId];
        P.speak.push({ t: 'h', text: 'In the Laundry, in a whisper' });
        P.speak.push({ t: 'fine', text: L.houseRule + ' Choose alone. Your phone will give you one sealed word; the Hearth will ask for it after the Tower, from all four of you at once.' });
        P.speak.push({ t: 'choice', id: 'whisper', prompt: Q.prompt, options: Q.opts.map(([id, text]) => ({ id, text })), after: (optId) => Q.after[optId] });
        P.speak.push({ t: 'fine', text: 'Nobody at the table will know what you answered. Wren will.' });
      }
      return P;
    },
  });
})();
