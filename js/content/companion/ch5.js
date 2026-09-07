/* Companion — Chapter V: The Long Stair (ASH). One rule, two gates, one fact each, and no page holds
   another's: the Reader has what each shape says, both ways; the Listener has the bell over each shape
   and its count; the Seer has which end each carving is marked at and every cut on each ring; the Binder
   has which cut starts a sigil, which way round the count runs, and the word that is not written. */
(function () {
  'use strict';
  const G = window.VigilGlyphs, L = window.VigilLore, CA = window.CompanionAudio, D = window.CompanionDraw, UI = window.VigilUI;
  const C = window.CompanionContent;
  const VIOLET = '#a482e6', GOLD = '#f2d27a', SEA = '#4fb3bf', RED = '#d96b4a';
  const F = 'font-family="Cinzel,serif"';

  /* The two carvings, exactly as js/content/ch5.js holds them (W1.items / W2.items), and the bells
     above them (W1.counts / W2.counts). The Hearth derives the accepted board from these; this page
     only reports them. Marked ends and ring cuts are the Seer's and live on that page alone. */
  const GATE1 = [{ shape: 'Crown', inv: false }, { shape: 'Hook', inv: false }, { shape: 'Spike', inv: false }];
  const GATE2 = [{ shape: 'Crown', inv: false }, { shape: 'Flame', inv: false }, { shape: 'Flame', inv: true }, { shape: 'Hook', inv: false }, { shape: 'Spike', inv: true }];
  const COUNTS1 = [3, 1, 5];
  const COUNTS2 = [2, 5, 1, 3, 4];
  const CRACKED = 1;                 // EMBER_LOST: the second bell of the silent gate

  /* ---------- Reader: both carvings, each shape with both of its words ----------
     Drawn as the stone stands, in the order it was cut, because the bells are keyed to that order.
     Nothing here says which reading is live and nothing here says where the ring begins: the page
     carries the lookup and the gap, and the gap is in the caption. */
  const readerLintels = () => {
    const rows = [
      { items: GATE1, name: 'the first gate', y: 62, cell: 78, s: 1.15 },
      { items: GATE2, name: 'the silent gate', y: 178, cell: 56, s: 0.85 },
    ];
    let s = '<svg viewBox="0 0 320 254" width="100%" style="max-width:320px;display:block;margin:0 auto">';
    rows.forEach(r => {
      const x0 = 160 - (r.items.length - 1) * r.cell / 2;
      s += `<text x="8" y="${r.y - 32}" fill="rgba(233,226,210,.55)" font-size="9" ${F}>${r.name}</text>`;
      r.items.forEach((it, i) => {
        const x = x0 + i * r.cell, up = G.read(it.shape, it.inv), other = G.invert(up);
        s += `<g transform="translate(${x},${r.y}) scale(${r.s})" style="color:${GOLD}">${G.shapeInner(it.shape, it.inv)}</g>`;
        s += `<text x="${x}" y="${r.y + 30}" text-anchor="middle" fill="${GOLD}" font-size="10" ${F}>${up}</text>`;
        s += `<text x="${x}" y="${r.y + 43}" text-anchor="middle" fill="rgba(242,210,122,.45)" font-size="9" ${F}>${other}</text>`;
      });
    });
    s += `<text x="160" y="248" text-anchor="middle" fill="rgba(233,226,210,.55)" font-size="9" ${F}>as it stands, above · the other way up, below</text>`;
    return s + '</svg>';
  };

  /* ---------- Listener: the bells, drawn as counts ----------
     A bell and its count in tally dots. No ring, no mark, no arrow: where the counting starts is the
     Seer's and which way it runs is the Binder's. */
  const tallyRow = (counts, cracked) => {
    const cell = 58, w = counts.length * cell + 20, h = 76;
    let s = `<svg viewBox="0 0 ${w} ${h}" width="100%" style="max-width:${w}px;display:block;margin:0 auto">`;
    counts.forEach((n, i) => {
      const x = 10 + cell / 2 + i * cell, out = cracked === i, col = out ? 'rgba(79,179,191,.3)' : SEA;
      s += `<g transform="translate(${x},24)"><path d="M-13,6 L-13,0 Q-13,-15 0,-16 Q13,-15 13,0 L13,6 Z" fill="none" stroke="${col}" stroke-width="1.6"/><circle cy="10" r="2.5" fill="${col}"/></g>`;
      if (out) { s += `<path d="M${x - 5},10 l7,16" stroke="${RED}" stroke-width="1.4"/><text x="${x}" y="60" text-anchor="middle" fill="${RED}" font-size="12" ${F}>?</text>`; }
      else {
        for (let k = 0; k < n; k++) s += `<circle cx="${(x - (n - 1) * 4 + k * 8).toFixed(1)}" cy="46" r="2.6" fill="${SEA}"/>`;
        s += `<text x="${x}" y="68" text-anchor="middle" fill="${SEA}" font-size="11" ${F}>${n}</text>`;
      }
    });
    return s + '</svg>';
  };
  const playCounts = (A, counts, cracked) => {
    let t = 0;
    counts.forEach((n, i) => { if (cracked === i) { CA.later(() => A.sfx('miss'), t); t += 900; return; } CA.later(() => CA.pulses(A, n, 400), t); t += n * 400 + 900; });
    return t + 300;
  };

  /* ---------- Seer: the two rings, and what is cut into them ----------
     No arc-arrow, no legend, no carving read out: the Seer reports cuts and marked ends, not meanings. */
  function ringCuts(cx, cy, R, n, cuts) {
    let s = `<g stroke="#fff" fill="none" stroke-width="1.4"><circle cx="${cx}" cy="${cy}" r="${R}"/>`;
    for (let i = 0; i < n; i++) {
      const a = (i / n * 360 - 90) * Math.PI / 180, x = cx + Math.cos(a) * R, y = cy + Math.sin(a) * R;
      const cut = cuts[i + 1];
      s += `<circle cx="${x.toFixed(1)}" cy="${y.toFixed(1)}" r="10" stroke="${cut ? VIOLET : '#fff'}" stroke-width="${cut ? 2.2 : 1.4}"/>`;
      s += `<text x="${(cx + Math.cos(a) * (R + 24)).toFixed(1)}" y="${(cy + Math.sin(a) * (R + 24) + 4).toFixed(1)}" text-anchor="middle" fill="${cut ? VIOLET : '#fff'}" font-size="10" ${F} stroke="none">${i + 1}</text>`;
      if (cut === 'scratch') s += `<path d="M${(x - 8).toFixed(1)},${(y + 1).toFixed(1)} l16,-4" stroke="${VIOLET}" stroke-width="2.4" stroke-linecap="round"/>`;
      if (cut === 'notch') s += `<path d="M${(x - 3).toFixed(1)},${(y + 3).toFixed(1)} l3,-5 l3,5" stroke="${VIOLET}" stroke-width="2" stroke-linecap="round"/>`;
    }
    return s + '</g>';
  }
  function markedStrip(cx, y, cells, end) {
    const w = cells * 18 + 26;
    let s = `<g stroke="#fff" fill="none" stroke-width="1.2"><rect x="${cx - w / 2}" y="${y}" width="${w}" height="26" rx="3"/></g>`;
    for (let i = 0; i < cells; i++) s += `<rect x="${cx - w / 2 + 13 + i * 18 - 6}" y="${y + 7}" width="12" height="12" fill="none" stroke="rgba(255,255,255,.35)" stroke-width="1"/>`;
    const mx = end === 'left' ? cx - w / 2 - 4 : cx + w / 2 + 4;
    s += `<path d="M${mx},${y + 6} l${end === 'left' ? -7 : 7},7 l${end === 'left' ? 7 : -7},7 z" fill="${VIOLET}"/>`;
    return s;
  }
  const gateMarks = `<svg viewBox="0 0 360 300"><rect width="360" height="300" fill="#000"/>
    <text x="95" y="26" text-anchor="middle" fill="#fff" font-size="10" ${F}>the first gate</text>
    <text x="265" y="26" text-anchor="middle" fill="#fff" font-size="10" ${F}>the silent gate</text>
    ${markedStrip(95, 40, 3, 'right')}
    ${markedStrip(265, 40, 5, 'left')}
    ${ringCuts(95, 165, 52, 5, { 4: 'scratch', 2: 'notch' })}
    ${ringCuts(265, 165, 52, 5, { 3: 'scratch', 5: 'notch' })}
    <text x="95" y="248" text-anchor="middle" fill="${VIOLET}" font-size="9" ${F}>a scratch at 4, a notch at 2</text>
    <text x="265" y="248" text-anchor="middle" fill="${VIOLET}" font-size="9" ${F}>a scratch at 3, a notch at 5</text>
    <text x="180" y="286" text-anchor="middle" fill="#fff" font-size="9" ${F} opacity=".7">where each ring is cut, and which end is marked</text>
  </svg>`;

  /* ---------- Binder: the two Laws, drawn ---------- */
  const lawClash = () => {
    const plate = (y, era, txt, struck) => `<rect x="6" y="${y}" width="288" height="34" rx="4" fill="none" stroke="${struck ? 'rgba(217,107,74,.4)' : RED}" stroke-width="1.4"/>`
      + `<text x="16" y="${y + 14}" fill="${struck ? 'rgba(217,107,74,.55)' : RED}" font-size="9" ${F}>${era}</text>`
      + `<text x="16" y="${y + 27}" fill="${struck ? 'rgba(233,226,210,.4)' : 'rgba(233,226,210,.85)'}" font-size="9" ${F}>${txt}</text>`
      + (struck ? `<path d="M10,${y + 17} L290,${y + 17}" stroke="${RED}" stroke-width="1.6"/>` : '');
    const ring = (cx, dir, label) => {
      let s = `<circle cx="${cx}" cy="150" r="30" fill="none" stroke="rgba(255,255,255,.35)" stroke-width="1.2"/>`;
      s += `<circle cx="${cx}" cy="120" r="7" fill="rgba(217,107,74,.3)" stroke="${RED}" stroke-width="1.4"/>`;
      s += dir > 0
        ? `<path d="M${cx + 12},127 a30,30 0 0 1 14,26" fill="none" stroke="${RED}" stroke-width="2"/><path d="M${cx + 26},153 l-6,-5 l-2,8 z" fill="${RED}"/>`
        : `<path d="M${cx - 12},127 a30,30 0 0 0 -14,26" fill="none" stroke="${RED}" stroke-width="2"/><path d="M${cx - 26},153 l6,-5 l2,8 z" fill="${RED}"/>`;
      s += `<text x="${cx}" y="196" text-anchor="middle" fill="rgba(233,226,210,.75)" font-size="9" ${F}>${label}</text>`;
      return s;
    };
    return `<svg viewBox="0 0 300 214" width="100%" style="max-width:300px;display:block;margin:0 auto">`
      + plate(6, 'Year 0', 'carving marked at its right: the other way round', false)
      + plate(46, 'Year 212', 'every line runs the way the numbers count up', true)
      + ring(90, -1, 'carving marked at its right') + ring(215, 1, 'carving marked at its left')
      + `<text x="150" y="210" text-anchor="middle" fill="rgba(233,226,210,.55)" font-size="9" ${F}>where two Laws disagree, the older binds</text></svg>`;
  };
  const threadLine = (kind) => `<svg viewBox="0 0 90 16" style="width:70px;height:14px;vertical-align:middle">${
    kind === 'grey' ? '<path d="M4,8 C24,2 34,14 52,8 S74,4 86,8" fill="none" stroke="rgba(200,200,210,.7)" stroke-width="2.5" stroke-linecap="round"/>'
      : kind === 'red' ? '<path d="M4,8 C24,2 34,14 52,8 S74,4 86,8" fill="none" stroke="' + RED + '" stroke-width="2.5" stroke-linecap="round"/><circle cx="45" cy="9" r="3.5" fill="' + RED + '"/>'
        : kind === 'gold' ? '<path d="M4,8 C24,2 34,14 52,8 S74,4 86,8" fill="none" stroke="#d4a94e" stroke-width="2.5" stroke-linecap="round"/>'
          : '<path d="M6,2 L2,2 L2,14 L6,14 M84,2 L88,2 L88,14 L84,14" fill="none" stroke="rgba(255,255,255,.35)" stroke-width="2"/>'
  }</svg>`;

  // The ledge over the cavern: a torch, four shadows away from it, Wren's toward it.
  const underLedge = `<svg viewBox="0 0 360 230">
    <rect width="360" height="230" fill="#000"/>
    <g stroke="#fff" fill="none" stroke-width="1.2">
      <path d="M10,150 L120,150 L140,170 L350,170"/><path d="M10,150 L10,220 M350,170 L350,220"/>
      ${[0, 1, 2, 3].map(i => `<path d="M${200 + i * 36},130 l0,-24 l6,-8 l6,8 l0,24 z"/>`).join('')}
      <text x="254" y="92" text-anchor="middle" fill="#fff" font-size="9" ${F}>four thrones</text>
      <path d="M30,120 L30,80 M22,84 L38,84"/><ellipse cx="30" cy="74" rx="6" ry="9"/>
      <text x="30" y="135" text-anchor="middle" fill="#fff" font-size="9" ${F}>torch</text>
      <path d="M0,200 C60,190 120,210 180,200 C240,190 300,210 360,200" stroke="rgba(255,255,255,.35)" stroke-dasharray="3 3"/>
      <text x="180" y="222" text-anchor="middle" fill="rgba(255,255,255,.6)" font-size="9" ${F}>the cold below throws no shadow you can see</text>
    </g>
    <g fill="#fff" opacity=".9"><circle cx="90" cy="120" r="6"/><circle cx="120" cy="105" r="6"/><circle cx="150" cy="125" r="6"/><circle cx="175" cy="108" r="6"/><circle cx="110" cy="140" r="6"/></g>
    <g stroke="#fff" stroke-width="3" opacity=".55" stroke-linecap="round"><path d="M90,120 L124,132"/><path d="M120,105 L154,113"/><path d="M150,125 L184,133"/><path d="M175,108 L208,114"/></g>
    <g stroke="${VIOLET}" stroke-width="3" opacity=".9" stroke-linecap="round"><path d="M110,140 L72,130"/></g>
    <g fill="#fff" font-size="9" ${F}><text x="82" y="112">Reader</text><text x="112" y="97">Listener</text><text x="142" y="118">Seer</text><text x="167" y="100">Binder</text><text x="100" y="158" fill="${VIOLET}">Wren</text></g>
    <text x="180" y="30" text-anchor="middle" fill="#fff" font-size="9" ${F} opacity=".7">shadows on the ledge, as they fall</text>
  </svg>`;

  // Nine stones, two hollow.
  const stonesSvg = `<svg viewBox="0 0 360 250">
    <rect width="360" height="250" fill="#000"/>
    ${[0, 1, 2, 3, 4, 5, 6, 7, 8].map(i => { const x = 60 + (i % 3) * 120, y = 50 + Math.floor(i / 3) * 75; const hollow = i === 2 || i === 7; const rx = 44 + (i % 2) * 6, ry = 26 + (i % 3) * 3;
      return `<g transform="translate(${x},${y})"><path d="M${-rx},0 C${-rx},-${ry} ${-rx * 0.4},-${ry + 6} 0,-${ry} C${rx * 0.5},-${ry + 4} ${rx},-${ry * 0.6} ${rx},0 C${rx},${ry} ${rx * 0.3},${ry + 4} 0,${ry} C${-rx * 0.6},${ry + 2} ${-rx},${ry * 0.5} ${-rx},0 Z" fill="none" stroke="#fff" stroke-width="1.4"/>${hollow ? `<path d="M${-rx * 0.55},2 C${-rx * 0.5},-${ry * 0.5} ${-rx * 0.1},-${ry * 0.6} ${rx * 0.2},-${ry * 0.35} C${rx * 0.55},-${ry * 0.1} ${rx * 0.5},${ry * 0.5} ${rx * 0.1},${ry * 0.55} C${-rx * 0.3},${ry * 0.6} ${-rx * 0.55},${ry * 0.3} ${-rx * 0.55},2 Z" fill="none" stroke="#fff" stroke-width="1" stroke-dasharray="3 2" opacity=".8"/>` : `${[0, 1, 2].map(k => `<path d="M${-rx * 0.6 + k * 12},${-ry * 0.5 + k * 8} l${rx * 0.9},${ry * 0.15}" stroke="#fff" stroke-width=".8" opacity=".35"/>`).join('')}`}<text y="${ry + 14}" text-anchor="middle" fill="#fff" font-size="9" ${F} opacity=".6">${i + 1}</text></g>`; }).join('')}
    <text x="180" y="244" text-anchor="middle" fill="${VIOLET}" font-size="10" ${F}>solid stone hatches; a hollow shows its cavity</text>
  </svg>`;

  /* ---------- Reader: nine worn glyphs, three read EMBER ---------- */
  const NINE = [['Crown', true], ['Crown', false], ['Flame', false], ['Crown', true], ['Hook', false], ['Spike', true], ['Crown', false], ['Flame', true], ['Crown', true]];
  const nineSvg = `<svg viewBox="0 0 330 260" width="100%" style="max-width:330px;display:block;margin:0 auto">
    <rect x="2" y="2" width="326" height="256" rx="6" fill="rgba(0,0,0,0.35)" stroke="rgba(212,169,78,0.25)"/>
    ${NINE.map(([sh, inv], i) => { const x = 55 + (i % 3) * 110, y = 48 + Math.floor(i / 3) * 84; return `<g transform="translate(${x},${y}) scale(1.3)" style="color:#e9e2d2" opacity="${0.55 + (i % 4) * 0.08}">${G.shapeInner(sh, inv)}</g><path d="M${x - 22 + (i * 7) % 15},${y - 16 + (i * 11) % 30} l${18 + (i * 5) % 20},${(i % 3) * 6 - 4}" stroke="rgba(11,10,16,0.9)" stroke-width="${2 + i % 3}"/><text x="${x}" y="${y + 36}" text-anchor="middle" font-size="9" fill="rgba(233,226,210,0.45)" ${F}>${i + 1}</text>`; }).join('')}
  </svg>`;

  /* ---------- Binder: five oaths, their locks named ---------- */
  const OATHS = [
    { name: 'Oath of the Gate', line: ['THORN', 'ASH'], lock: 'KNOT' },
    { name: 'Oath of the Keeper', line: ['WELL', 'EMBER'], lock: 'EMBER' },
    { name: 'Oath of the Veil', line: ['ASH', 'THORN'], lock: 'VEIL' },
    { name: 'Oath of the Well', line: ['WELL', 'ASH'], lock: 'KNOT' },
    { name: 'Oath of the Chair', line: ['CROWN', 'THORN'], lock: 'EMBER' },
  ];
  const gl = (n, c) => G.svg(n, { size: 26, color: c || GOLD });
  const oathsHtml = `<table class="blk-table"><tr><th>oath</th><th>line</th><th>lock</th></tr>${OATHS.map(o => `<tr><td>${o.name}</td><td>${o.line.map(n => gl(n, RED)).join(' ')}</td><td>${gl(o.lock, RED)} <b>${o.lock}</b></td></tr>`).join('')}</table>`;

  /* ---------- the Founders' Count task ---------- */
  const MATERIAL = {
    reader: { q: 'Nine worn shapes on the newel, all standing as they were cut. **How many read EMBER?**', html: nineSvg },
    listener: { q: 'A peal of two bells, one higher, one lower. **How many times does the *lower* bell strike?** Play it as often as you need.', html: null },
    seer: { q: 'Nine stones in the under-layer of the landing. **How many are hollow?**', html: `<div class="blk-svg underlayer">${stonesSvg}</div>` },
    binder: { q: 'Five oaths carved on the newel. An oath binds only if its lock — the last glyph — is KNOT or EMBER. **How many bind?**', html: oathsHtml },
  };
  const PEAL = 'HLHLHHLHLHHL'; // lower bell strikes 5 times, the higher 7
  function playPeal(Audio) { Audio.init(); if (Audio.isMuted()) Audio.setMuted(false); PEAL.split('').forEach((c, i) => CA.later(() => Audio.note(c === 'H' ? 79 : 64, 0.9, c === 'H' ? 0.14 : 0.2), i * 480)); return PEAL.length * 480 + 600; }

  function countTask(roleId) {
    return { t: 'task', id: 'count', title: 'The Founders\' Count — 45 seconds', replayable: true, run: (box, api) => {
      const key = 'ch5:count'; const prev = api.state.done[key];
      let ctl = null;
      const mat = MATERIAL[roleId];
      const idle = () => {
        UI.clear(box);
        if (prev != null) { box.appendChild(UI.el('div', { class: 'big-digit', text: String(prev) })); box.appendChild(UI.el('p', { class: 'fine', text: 'Your digit. Say it aloud when the Hearth asks — in seat order, the Reader first. Never show the phone.' })); }
        else box.appendChild(UI.el('p', { class: 'fine', text: 'The Hearth will count 3, 2, 1, START. On START, press Start. You have forty-five seconds to find one digit.' }));
        box.appendChild(UI.el('button', { class: 'btn primary big-btn', text: prev != null ? 'Count again' : 'Start', onclick: start }));
      };
      const start = () => {
        UI.stopAudio(); // Start is a press like any other: drop a peal still sounding from the last attempt
        if (ctl) { ctl.cancel(); ctl = null; }
        UI.clear(box); api.audio.init(); if (api.audio.unlockMedia) api.audio.unlockMedia();
        box.appendChild(UI.el('p', { html: UI.rich(mat.q) }));
        if (mat.html) box.appendChild(UI.el('div', { html: mat.html }));
        if (roleId === 'listener') { box.appendChild(UI.audioButton('Cup your ear — the peal', () => playPeal(api.audio))); const rv = UI.el('div', {}); box.appendChild(rv); rv.appendChild(UI.el('button', { class: 'btn small ghost', text: 'I cannot hear it — show the peal', onclick: () => { rv.innerHTML = `<div class="arrow-strip">${PEAL.split('').map(c => `<span class="step"><b>${c === 'H' ? '▲' : '▼'}</b>${c === 'H' ? 'high' : 'low'}</span>`).join('')}</div>`; } })); playPeal(api.audio); }
        const cd = UI.el('div', { class: 'cd', text: '45' }); box.appendChild(cd);
        ctl = UI.countdown(box, 45, (s) => { cd.textContent = s; });
        ctl.promise.then(() => { cd.textContent = 'TIME — pick your digit'; });
        box.appendChild(UI.el('p', { class: 'fine', text: 'Your digit:' }));
        const grid = UI.el('div', { class: 'pick-grid', style: { gridTemplateColumns: 'repeat(5, 1fr)' } });
        for (let d = 0; d <= 9; d++) grid.appendChild(UI.el('div', { class: 'pk', text: String(d), onclick: () => { ctl.cancel(); api.state.done[key] = d; api.save(); api.audio.sfx('seal'); render(d); } }));
        box.appendChild(grid);
      };
      const render = (d) => { UI.clear(box); box.appendChild(UI.el('div', { class: 'big-digit', text: String(d) })); box.appendChild(UI.el('p', { class: 'fine', text: 'Sealed. Say it aloud when the Hearth asks — in seat order, the Reader first. Never show the phone.' })); box.appendChild(UI.el('button', { class: 'btn small ghost', text: 'Count again', onclick: start })); };
      idle();
    } };
  }

  /* ---------- The Thread (after YES): a hold-button; fraying is counted on this phone only ---------- */
  const threadBlock = { t: 'custom', render: (el, ctx) => {
    // Appears once this phone has answered YES (the page is not re-rendered by the choice, so poll briefly).
    if (ctx.answer('ch5', 'hold') !== 'YES') { const iv = setInterval(() => { if (!el.isConnected) { clearInterval(iv); return; } if (ctx.answer('ch5', 'hold') === 'YES') { clearInterval(iv); threadBlock.render(el, ctx); } }, 500); return; }
    const key = 'ch5:thread'; const st = ctx.state.done[key] || { fray: 0, held: 0 }; ctx.state.done[key] = st;
    el.appendChild(UI.el('div', { class: 'blk-divider' }));
    el.appendChild(UI.el('h3', { text: 'The Thread' }));
    el.appendChild(UI.el('p', { html: UI.rich('If the Hearth named **you**: your Sight is spent, and this is your page. Keep a finger on the thread until the Hearth says it is tied off. If it named someone else, put this down.') }));
    const line = UI.el('div', { class: 'thread-line' }); line.style.opacity = '.35';
    const btn = UI.el('button', { class: 'btn thread-hold', text: 'HOLD THE THREAD' });
    const stat = UI.el('p', { class: 'fine', text: 'Not held.' });
    let holding = false, since = 0, everHeld = !!st.held;
    const down = (e) => { e.preventDefault(); if (holding) return; holding = true; since = Date.now(); everHeld = true; line.style.opacity = '1'; btn.textContent = 'HOLDING'; stat.textContent = 'Held. Do not let go.'; try { ctx.audio.init(); ctx.audio.sfx('seal'); } catch (x) {} };
    const up = () => { if (!holding) return; holding = false; st.held += Math.round((Date.now() - since) / 1000); st.fray += 1; ctx.save(); line.style.opacity = '.35'; btn.textContent = 'HOLD THE THREAD'; stat.textContent = 'The thread frays a little. Take it up again.'; try { ctx.audio.sfx('miss'); } catch (x) {} };
    btn.addEventListener('pointerdown', down); btn.addEventListener('pointerup', up); btn.addEventListener('pointerleave', up); btn.addEventListener('pointercancel', up);
    el.appendChild(line); el.appendChild(btn); el.appendChild(stat);
    el.appendChild(UI.el('p', { class: 'fine', text: 'The Hearth cannot see this page. Only you will know how well it was held.' }));
    void everHeld;
  } };

  /* ---------- pages ---------- */
  C.chapters.push({
    id: 'ch5',
    pages: (roleId, ctx) => {
      const P = { sight: [], wren: [], speak: [] };
      const f = ctx.flags || {}; const law0 = !!f.LAW0; const cracked = f.EMBER_LOST ? CRACKED : -1;

      /* ===== READER ===== */
      if (roleId === 'reader') {
        P.sight.push({ t: 'h', text: 'What is cut on Mere’s two gates' });
        P.sight.push({ t: 'p', text: 'The Hearth shows both carvings worn to nothing. On your page they are clean.' });
        P.sight.push({ t: 'p', text: '**A shape says one word standing as it was cut, and the opposite word the other way up.** A carving marked at its left-hand end says the words as they stand. Marked at its right, every shape says its other word.' });
        P.sight.push({ t: 'html', html: readerLintels() });
        P.sight.push({ t: 'fine', text: 'A spare shape in the ring is not decoration. It is a different sigil, and the gate can tell.' });
        P.sight.push({ t: 'fine', text: 'Which end each carving is marked at is not on this page, and neither is where the words go. Say both words for every shape, in the order they are cut.' });
        P.wren.push({ t: 'h', text: 'On the ledge' });
        P.wren.push({ t: 'p', text: 'Wren stands beside you looking at the four thrones. "You went quiet in the study. You read something with my name in it." A pause. "You don’t have to say."' });
        P.wren.push({ t: 'p', text: f.WREN_HURT
          ? 'Wren has not mentioned the strapped arm since the Vault, and has laughed twice on the stair, both times wrongly.'
          : 'The glossary in your Book still says what it said in the study. You decided a year ago that it was a copying error. You never looked up who copied it.' });
      }

      /* ===== LISTENER ===== */
      if (roleId === 'listener') {
        P.sight.push({ t: 'h', text: 'Eight bells, and what they count' });
        P.sight.push({ t: 'p', text: 'A bell hangs over every shape on both lintels. The Hearth cannot hear them. You can.' });
        P.sight.push({ t: 'p', text: '**A bell’s count is how far its shape sits from the mark**, counting the mark slot as one.' });
        P.sight.push({ t: 'audio', label: 'The first gate — three bells', strip: tallyRow(COUNTS1, -1), button: '♪ Cup your ear',
          play: (A) => playCounts(A, COUNTS1, -1), text: '**Three, one, five**, over the shapes in the order they are cut.' });
        P.sight.push({ t: 'audio', label: 'The silent gate — five bells', strip: tallyRow(COUNTS2, cracked), button: '♪ Cup your ear',
          play: (A) => playCounts(A, COUNTS2, cracked), text: cracked >= 0
            ? 'The second bell is **cracked** and gives nothing. The five counts are one each of 1 to 5. The missing one is whichever the other four do not say.'
            : '**Two, five, one, three, four**, over the shapes in the order they are cut.' });
        P.sight.push({ t: 'fine', text: 'A count heard short puts every shape one place out, and the ring frosts.' });
        P.sight.push({ t: 'fine', text: 'You never hear a word, only how far. The words are the Reader’s, the mark the Seer’s.' });
        P.wren.push({ t: 'h', text: 'What the stair sounds like' });
        P.wren.push({ t: 'html', html: `<div class="heartbeats">${[['Provost Marrow', 'normal'], ['the soldiers, above', 'fast'], ['Wren', 'flat']].map(([n, k]) => `<div class="hb"><span>${n}</span>${D.trace(k)}</div>`).join('')}</div>` });
        P.wren.push({ t: 'p', text: 'Boots above, in step. Water below, moving slowly. And beside you, where Wren is standing, the thing you have called a fault in your gift for four years: nothing. Not quiet. *Nothing.*' });
        P.wren.push({ t: 'p', text: 'In the Gallery the portraits showed four going down the stair and four coming back. You have not stopped hearing it.' });
      }

      /* ===== SEER ===== */
      if (roleId === 'seer') {
        P.sight.push({ t: 'h', text: 'Under the two gates' });
        P.sight.push({ t: 'p', text: '**The first gate’s carving is marked at its right-hand end.** Its ring carries two cuts: a long scratch at **slot 4**, and a small notch at **slot 2**.' });
        P.sight.push({ t: 'p', text: '**The second gate’s carving is marked at its left-hand end.** Its ring carries two cuts as well: a scratch at **slot 3**, and a notch at **slot 5**.' });
        P.sight.push({ t: 'svg', cls: 'underlayer', svg: gateMarks });
        P.sight.push({ t: 'fine', text: 'Counted from anywhere else on the ring, the right words in the right order still fail.' });
        P.sight.push({ t: 'fine', text: 'Somebody meant both of those cuts. Which one matters, and what a marked end obliges, are not yours. Say what is cut, and where.' });
        P.wren.push({ t: 'h', text: 'The shadow, again' });
        P.wren.push({ t: 'svg', cls: 'underlayer', svg: underLedge });
        P.wren.push({ t: 'p', text: 'One torch on the ledge. Four shadows falling away from it, the way shadows do, and Wren’s falling toward it. In the dormitory you blamed the lamp. There is no lamp here.' });
      }

      /* ===== BINDER ===== */
      if (roleId === 'binder') {
        P.sight.push({ t: 'h', text: 'Which cut, and which way round' });
        P.sight.push({ t: 'p', text: '**A sigil begins at a scratch.** A notch is a maker’s signature. It starts nothing.' });
        P.sight.push({ t: 'p', text: 'Two Laws disagree about which way a carving runs round the ring. The newer says every one runs the way the numbers count up. The older says a carving marked at its right-hand end runs the other way. **The older binds.**' });
        P.sight.push({ t: 'html', html: lawClash() });
        P.sight.push({ t: 'p', text: law0
          ? '**Where a carving shows COLD, the newer Law leaves that slot empty. The older Law, back in your Book, writes it — by four hands.**'
          : '**Where a carving shows COLD, the newer Law leaves that slot empty.**' });
        P.sight.push({ t: 'fine', text: 'Every frost costs the stair five heartbeats. Say your rule before the Warden closes the ring.' });
        P.sight.push({ t: 'fine', text: 'Both Laws are dated in your **Book**. You cannot read a shape and you cannot find a cut. Ask for both.' });
        P.wren.push({ t: 'h', text: 'Still no thread' });
        P.wren.push({ t: 'list', items: [
          threadLine('grey') + ' <strong>Provost Marrow to Wren:</strong> grey, and it has not changed since the study.',
          threadLine((f.OATH | 0) === 0 ? 'none' : 'red') + ' <strong>The four of you to the Chair:</strong> ' + ((f.OATH | 0) === 0 ? 'nothing. You did not swear.' : 'red, and knotted.'),
          threadLine('gold') + ' <strong>The soldiers above:</strong> gold, every one of them, and none of it theirs.',
          threadLine('none') + ' <strong>Wren:</strong> nothing at all.',
        ] });
        P.wren.push({ t: 'p', text: 'Not unbound — you know unbound. You decided years ago it was a blind spot in your own gift. You have never told anyone your gift has one.' });
      }

      /* ===== SPEAK (all roles) ===== */
      P.speak.push({ t: 'fine', text: '*' + L.houseRule + '*' });
      P.speak.push(countTask(roleId));
      P.speak.push({ t: 'divider' });
      if (roleId === 'binder') P.speak.push({ t: 'reveal', label: 'If the table chooses to collapse the stair', blocks: [{ t: 'fine', text: 'The newer Law says never. The older says four hands. You are about to write it with one. Say so before the Warden writes it.' }] });
      P.speak.push({ t: 'choice', id: 'hold', prompt: '**One of you stays on the stair and holds the thread while the others go on.** That Sight is spent until the Provost ties it off. The first yes the Hearth reads, in seat order, stays. *Stay and hold?*', options: [{ id: 'YES', text: 'Yes — I stay and hold.' }, { id: 'NO', text: 'No — I go on.' }],
        after: (opt) => opt === 'YES' ? 'Type it into the Hearth when it asks. If the Hearth names you, come back to this page.' : 'Type it into the Hearth when it asks. Nobody will know what it said.' });
      P.speak.push(threadBlock);
      return P;
    },
  });
})();
