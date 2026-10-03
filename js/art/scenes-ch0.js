/* Art — Prologue */
(function () {
  'use strict';
  const A = window.VigilArt, P = A.P, W = A.W, H = A.H;

  // A great fire in a stone hall, the prophecy stone above it.
  function fire(x, base, scale, blue) {
    const sc = scale || 1; const c1 = blue ? '#4fb3bf' : '#ff9a3c', c2 = blue ? '#a8e6ee' : '#ffe08a';
    let s = `<g transform="translate(${x},${base}) scale(${sc})">`;
    s += `<ellipse cx="0" cy="0" rx="260" ry="40" fill="${c1}" opacity=".18"/>`;
    for (let i = 0; i < 7; i++) { const dx = (i - 3) * 38, h = 180 + (i % 2) * 60 - Math.abs(i - 3) * 30; s += `<path d="M${dx - 30},0 C${dx - 40},-${h * 0.4} ${dx - 10},-${h * 0.6} ${dx},-${h} C${dx + 10},-${h * 0.6} ${dx + 40},-${h * 0.4} ${dx + 30},0 Z" fill="${c1}" opacity=".85"><animate attributeName="d" values="M${dx - 30},0 C${dx - 40},-${h * 0.4} ${dx - 10},-${h * 0.6} ${dx},-${h} C${dx + 10},-${h * 0.6} ${dx + 40},-${h * 0.4} ${dx + 30},0 Z;M${dx - 30},0 C${dx - 46},-${h * 0.35} ${dx - 4},-${h * 0.7} ${dx + 8},-${h * 1.08} C${dx + 14},-${h * 0.6} ${dx + 36},-${h * 0.45} ${dx + 30},0 Z;M${dx - 30},0 C${dx - 40},-${h * 0.4} ${dx - 10},-${h * 0.6} ${dx},-${h} C${dx + 10},-${h * 0.6} ${dx + 40},-${h * 0.4} ${dx + 30},0 Z" dur="${(1.6 + i * 0.23).toFixed(2)}s" repeatCount="indefinite"/></path>`; }
    for (let i = 0; i < 5; i++) { const dx = (i - 2) * 40, h = 110 + (i % 2) * 40; s += `<path d="M${dx - 18},0 C${dx - 22},-${h * 0.4} ${dx - 6},-${h * 0.6} ${dx},-${h} C${dx + 6},-${h * 0.6} ${dx + 22},-${h * 0.4} ${dx + 18},0 Z" fill="${c2}" opacity=".9"><animate attributeName="opacity" values=".9;.6;.95;.7;.9" dur="${(0.9 + i * 0.17).toFixed(2)}s" repeatCount="indefinite"/></path>`; }
    s += `<circle cx="0" cy="-60" r="300" fill="${c1}" opacity=".12"><animate attributeName="opacity" values=".12;.18;.1;.15;.12" dur="1.3s" repeatCount="indefinite"/></circle>`;
    return s + '</g>';
  }
  A.fire = fire;

  A.define('ch0_hearthfire', () => P.wrap(
    P.sky('#0a0810', '#1a0f0a') +
    P.pillars(6, 760, 620, '#0d0a10') +
    `<rect x="560" y="330" width="480" height="430" fill="#120d12"/>` +
    `<path d="M560,330 A240,240 0 0 1 1040,330" fill="#120d12"/>` +
    `<rect x="600" y="200" width="400" height="110" rx="4" fill="#221a20" stroke="#3a2c2c" stroke-width="3"/>` +
    // the line cut into the stone, as the next scene shows it: a row of worn cuts, not a ring
    `<g transform="translate(632,255)" opacity=".9">${wornCuts(8, '#7a6a5a', 48, 0.9)}</g>` +
    fire(800, 760, 1, false) +
    P.floorTiles(760, '#0b0910', 'rgba(255,255,255,0.04)') +
    P.fog(600, 300, '#2a1a12', 0.35)
  ));

  /* ---------- the sentence on the prophecy stone ----------
     This row used to be Chapter VI's stone, drawn out: G.shapeInner over
     ['Flame','Flame','Crown','Hook','Spike','Flame','Crown','Hook'] with
     [false,true,false,false,false,true,true,true] — element for element the STONE array at
     js/content/ch6.js, ninety minutes before Chapter VI burns four of those cuts off the board and
     sells the missing four shapes to the Reader and their four orientations to the Seer.
     Enumerated (scratchpad/ch012/stone-field.js, against the shipped STONE and BURNT):
         the row the art drew is identical to ch6's STONE ............ true
         cuts the fire takes ........................................ 1, 3, 5, 7
         assignments of shape and orientation to those four cuts .... 4,096
           knowing only the Reader's page (the four shapes) .......... 16
           knowing only the Seer's page (the four orientations) ...... 256
           knowing this picture ...................................... 1
     In ch6's own board terms (ch6.js records them): drop the Reader 192, drop the Seer 8 — both
     answered here, for free, by a photograph of the Prologue. The chapter's only currency is a bell
     cracked per misreading, so a field of 1 is a chapter that costs nothing.
     So the Hearth promises the sentence and does not print it, the way the lamp's collar does forty
     lines below: what four hundred years of smoke left, not what was cut. Nothing here is a glyph —
     no closed teardrop, no arrow over a bar, no hook, no crown — only grooves, chips and soot, seeded
     so the stone is the same stone every night. tools/scripts/ch0.json and ch1.json assert that no
     path from js/content/glyphs.js is drawn in this chapter's art (ch1 allows the one on the Chair's
     banner, which is heraldry). */
  function wornCuts(n, color, gap, sc, seed) {
    const r = A.rng(seed || 1707);
    let out = '';
    for (let i = 0; i < n; i++) {
      const lean = (r() * 30 - 15).toFixed(1), h = (11 + r() * 7), bow = (r() * 9 - 4.5);
      let g = `<g transform="translate(${(i * gap).toFixed(0)},0) scale(${sc})">`;
      g += `<g transform="rotate(${lean})" fill="none" stroke="${color}" stroke-linecap="round">`;
      // the groove, in two strokes that do not meet: the middle of it is gone
      g += `<path d="M${(-bow / 2).toFixed(1)},${(-h).toFixed(1)} q${bow.toFixed(1)},${(h * 0.45).toFixed(1)} ${(bow / 3).toFixed(1)},${(h * 0.62).toFixed(1)}" stroke-width="3.4" opacity="${(0.55 + r() * 0.3).toFixed(2)}"/>`;
      g += `<path d="M${(bow / 3).toFixed(1)},${(h * 0.82).toFixed(1)} l${(r() * 4 - 2).toFixed(1)},${(h * 0.5).toFixed(1)}" stroke-width="2.8" opacity="${(0.35 + r() * 0.3).toFixed(2)}"/>`;
      // a chip across it, and sometimes one that stops short
      g += `<path d="M${(-6 - r() * 4).toFixed(1)},${(r() * 8 - 4).toFixed(1)} l${(9 + r() * 5).toFixed(1)},${(r() * 6 - 3).toFixed(1)}" stroke-width="2.4" opacity="${(0.25 + r() * 0.3).toFixed(2)}"/>`;
      if (r() > 0.35) g += `<path d="M${(2 + r() * 3).toFixed(1)},${(-h * 0.6).toFixed(1)} l${(r() * 5 - 1).toFixed(1)},${(4 + r() * 4).toFixed(1)}" stroke-width="2" opacity=".3"/>`;
      g += '</g>';
      // soot: what the fire has been doing to the foot of it for four hundred years
      for (let k = 0; k < 3; k++) g += `<ellipse cx="${(r() * 24 - 12).toFixed(1)}" cy="${(r() * 28 - 9).toFixed(1)}" rx="${(4 + r() * 7).toFixed(1)}" ry="${(3 + r() * 5).toFixed(1)}" fill="#0d0a0c" opacity="${(0.1 + r() * 0.18).toFixed(2)}"/>`;
      out += g + '</g>';
    }
    return out;
  }
  A.wornCuts = wornCuts;

  A.define('ch0_stone', () => P.wrap(
    P.sky('#0a0810', '#1a0f0a') +
    `<rect x="380" y="120" width="840" height="300" rx="6" fill="#1d1619" stroke="#3a2c2c" stroke-width="4"/>` +
    `<g transform="translate(470,250)" opacity=".9">${wornCuts(8, '#7a6a5a', 94, 1.9)}</g>` +
    fire(800, 900, 1.6, false) +
    `<rect x="0" y="520" width="${W}" height="${H - 520}" fill="url(#stonefog)"/><defs><linearGradient id="stonefog" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#ff9a3c" stop-opacity="0"/><stop offset="1" stop-color="#ff9a3c" stop-opacity=".55"/></linearGradient></defs>`
  ));

  /* ---------- the tower room ----------
     "Four beds, one round window and, on the sill, a brass lamp nobody has ever lit. On the floor, a
     fifth blanket: Wren's. On the door, a fifth name, in pencil." The window is round, the door has
     its pencil, the blanket is folded on the floor; once the lamp is lit (the naming scene,
     artParams {lit:true}) the room is warm and the blanket has been dragged up under the sill.
     The pencil name is a scrawl of plain strokes: no letters, no glyphs. */
  // a lit lamp's halo: gold at the heart, orange at the edge, fading to nothing (never blue)
  const halo = (id) => `<defs><radialGradient id="${id}"><stop offset="0" stop-color="#fff0c0" stop-opacity=".6"/><stop offset=".16" stop-color="#ffe08a" stop-opacity=".38"/><stop offset=".4" stop-color="#ffd27a" stop-opacity=".2"/><stop offset=".7" stop-color="#ffa850" stop-opacity=".08"/><stop offset="1" stop-color="#ff9a3c" stop-opacity="0"/></radialGradient></defs>`;
  const WIN = { x: 1340, y: 290, r: 140 }, SILL = 462;
  function dormStars() {
    const r = A.rng(12); let s = '';
    for (let i = 0; i < 46; i++) {
      const a = r() * Math.PI * 2, d = Math.sqrt(r()) * (WIN.r - 10), o = 0.3 + r() * 0.7;
      s += `<circle cx="${(WIN.x + Math.cos(a) * d).toFixed(0)}" cy="${(WIN.y + Math.sin(a) * d).toFixed(0)}" r="${(0.6 + r() * 1.5).toFixed(1)}" fill="#e8ecff" opacity="${o.toFixed(2)}"><animate attributeName="opacity" values="${o.toFixed(2)};${(o * 0.3).toFixed(2)};${o.toFixed(2)}" dur="${(2 + r() * 5).toFixed(1)}s" repeatCount="indefinite"/></circle>`;
    }
    return s;
  }
  function dormDoor(inked) {
    let s = `<g transform="translate(990,400)">`;
    s += `<rect x="-10" y="-10" width="160" height="350" fill="#1a1524"/>`; // frame
    s += `<rect x="0" y="0" width="140" height="340" fill="#241d30" stroke="#2f2740" stroke-width="3"/>`;
    s += `<rect x="16" y="18" width="108" height="130" rx="3" fill="none" stroke="#2f2740" stroke-width="3"/><rect x="16" y="176" width="108" height="146" rx="3" fill="none" stroke="#2f2740" stroke-width="3"/>`;
    s += `<circle cx="120" cy="170" r="6" fill="#5a4a2a" stroke="#8a7040" stroke-width="1.5"/>`;
    // the fifth name, in pencil, rubbing off: a wobbly scrawl and an underline (at dawn, gone over in ink: bolder)
    s += inked ? `<g fill="none" stroke="#d6d0e4" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round" opacity=".85">` : `<g fill="none" stroke="#b9b4c8" stroke-linecap="round" stroke-linejoin="round" opacity=".38">`;
    s += `<path d="M30,84 c3,-16 7,-16 9,-1 c1,-9 6,-11 8,-2 c2,8 6,7 8,-1 c3,-9 8,-7 7,1 c-1,7 5,6 8,-2 c2,-6 6,-8 9,0 c2,6 6,5 9,-3 c2,-5 5,-4 6,1" stroke-width="2"/>`;
    s += `<path d="M30,94 q40,4 82,-2" stroke-width="1.6" opacity=".7"/>`;
    // and at dawn, beside it in the same ink, who claimed it
    if (inked) s += `<path d="M30,116 c3,-7 6,-7 9,0 s6,7 9,0 s6,-7 9,0 s6,7 9,0 s6,-7 9,0 s6,7 9,0" stroke-width="1.4" opacity=".75"/>`;
    s += `</g>`;
    return s + '</g>';
  }
  const bed = (x) => `<g transform="translate(${x},640)"><rect x="0" y="0" width="200" height="90" rx="8" fill="#1b1626"/><rect x="0" y="-40" width="26" height="130" rx="4" fill="#241d33"/><rect x="174" y="-40" width="26" height="130" rx="4" fill="#241d33"/><rect x="30" y="10" width="140" height="40" rx="6" fill="#2b2340"/></g>`;
  // Wren's blanket: folded on the floor by the last bed; or, once the lamp is lit, dragged up under the sill
  const blanketFolded = `<g transform="translate(1035,752)"><rect x="0" y="16" width="150" height="22" rx="6" fill="#3a2c46"/><rect x="6" y="0" width="140" height="22" rx="6" fill="#463554"/><path d="M14,11 L138,11" stroke="#5a4668" stroke-width="2" stroke-dasharray="6 8"/><path d="M6,19 q70,6 140,0" fill="none" stroke="#2a2034" stroke-width="2"/></g>`;
  const blanketPulled = `<g transform="translate(${WIN.x},${SILL})">` +
    // bunched on the sill beside the lamp, as close as a blanket can go, and hanging over the edge
    `<path d="M-96,2 C-100,-26 -62,-40 -34,-30 C-22,-26 -18,-16 -17,-2 L-16,8 C-12,56 -8,110 -4,152 Q-22,140 -38,148 C-50,132 -62,128 -76,126 Q-92,114 -110,112 C-110,74 -104,36 -96,2 Z" fill="#463554"/>` +
    `<path d="M-88,14 C-92,50 -96,80 -100,108 M-64,12 C-64,56 -66,96 -70,124 M-40,12 C-36,64 -34,110 -36,144" fill="none" stroke="#3a2c46" stroke-width="5" stroke-linecap="round"/>` +
    `<path d="M-88,-12 C-70,-28 -46,-30 -30,-22" fill="none" stroke="#5a4668" stroke-width="4" stroke-linecap="round"/>` +
    `<path d="M-34,-30 C-22,-26 -18,-16 -17,-2 L-16,8 C-12,56 -8,110 -4,152" fill="none" stroke="#ffd27a" stroke-width="2.5" opacity=".35"/></g>`;

  A.define('ch0_dorm', (p) => {
    const lit = !!(p && p.lit), dawn = !!(p && p.dawn); // dawn (ch0_flow): the lamp has burned out, the blanket is still by the sill, the door is in ink
    return P.wrap(
      P.sky('#0b0a12', '#15121d') +
      // warm cast over the room while the lamp burns
      (lit ? `<defs><radialGradient id="dormwarm" cx="${(WIN.x / W).toFixed(3)}" cy="${((SILL - 90) / H).toFixed(3)}" r=".75"><stop offset="0" stop-color="#ffb860" stop-opacity=".22"/><stop offset=".45" stop-color="#ff9a3c" stop-opacity=".07"/><stop offset="1" stop-color="#ff9a3c" stop-opacity="0"/></radialGradient></defs><rect width="${W}" height="${H}" fill="url(#dormwarm)"/>` : '') +
      // one round window, stars inside it
      // dawn: the window greys and warms from the bottom, and the stars go
      (dawn ? `<defs><linearGradient id="dawnsky" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#1c1a2c"/><stop offset=".7" stop-color="#3a2f3c"/><stop offset="1" stop-color="#8a5a40"/></linearGradient></defs><circle cx="${WIN.x}" cy="${WIN.y}" r="${WIN.r}" fill="url(#dawnsky)"/><g opacity=".15">${dormStars()}</g>`
        : `<circle cx="${WIN.x}" cy="${WIN.y}" r="${WIN.r}" fill="#070812"/>` + dormStars()) +
      `<circle cx="${WIN.x}" cy="${WIN.y}" r="${WIN.r}" fill="none" stroke="#2a2438" stroke-width="12"/>` +
      `<path d="M${WIN.x},${WIN.y - WIN.r} L${WIN.x},${WIN.y + WIN.r} M${WIN.x - WIN.r},${WIN.y} L${WIN.x + WIN.r},${WIN.y}" stroke="#2a2438" stroke-width="5"/>` +
      dormDoor(dawn) +
      P.floorTiles(740, '#0d0b14', 'rgba(255,255,255,0.03)') +
      // four beds in one row
      [110, 325, 540, 755].map(bed).join('') +
      (lit || dawn ? '' : blanketFolded) +
      // the sill, and the lamp on it
      `<g transform="translate(${WIN.x},${SILL})"><rect x="-80" y="0" width="160" height="16" fill="#2a2438"/>` +
      (lit ? `${halo('dormhalo')}<circle cx="0" cy="-90" r="190" fill="url(#dormhalo)"/>` : '') +
      `<rect x="-14" y="-70" width="28" height="70" rx="4" fill="#3a2f1a"${lit ? ' stroke="#c9a85a" stroke-width="1.5"' : ''}/><circle cx="0" cy="-90" r="24" fill="#5a4a2a" stroke="${lit ? '#e8c070' : '#8a7040'}" stroke-width="3"/>` +
      (lit ? '<circle cx="0" cy="-90" r="11" fill="#ffe08a" opacity=".95"><animate attributeName="opacity" values=".95;.7;1;.8;.95" dur="2.4s" repeatCount="indefinite"/></circle><circle cx="0" cy="-90" r="4" fill="#fff4d6"/>' : '<circle cx="0" cy="-90" r="10" fill="#2a2010" stroke="#6a5a3c" stroke-width="2"/>') +
      `</g>` +
      (lit || dawn ? blanketPulled : '') +
      P.fog(560, 260, '#241d33', lit ? 0.22 : 0.35)
    );
  });

  /* ---------- the lamp ----------
     The collar is a band round the neck, where the head meets the column; the two marks sit on its
     left and right ends, as the Reader's page draws them (companion/ch0.js collar()). Four hundred
     years have taken them: the Hearth shows the wear, not the shapes — only the Reader's page has
     them clean. They are deliberately nowhere near the head's four slots.
     The column carries four hundred years of dares — tallies, initials, plain scratches — with a
     bare patch left for one more name. Plain strokes only: nothing here is a glyph path. */
  function dares(carved) {
    const r = A.rng(4041);
    const LET = { H: 'M0,0 l0,12 M8,0 l0,12 M0,6 l8,0', L: 'M0,0 l0,12 l7,0', N: 'M0,12 l0,-12 l8,12 l0,-12', E: 'M8,0 l-8,0 l0,12 l8,0 M0,6 l6,0', K: 'M0,0 l0,12 M8,0 l-8,6 l8,6', F: 'M8,0 l-8,0 l0,12 M0,6 l6,0', Z: 'M0,0 l8,0 l-8,12 l8,0', P: 'M0,12 l0,-12 l7,0 l0,6 l-7,0', D: 'M0,0 l0,12 l5,0 l3,-4 l0,-4 l-3,-4 Z' };
    const keys = Object.keys(LET);
    const cut = (d, w) => `<path d="${d}" stroke="#241a0c" stroke-width="${w}" opacity=".55"/><path d="${d}" transform="translate(.8,.8)" stroke="#d8b870" stroke-width="${(w * 0.55).toFixed(2)}" opacity=".28"/>`;
    const item = (kind) => {
      if (kind === 0) { // initials
        const a = keys[Math.floor(r() * keys.length)], b = keys[Math.floor(r() * keys.length)];
        return { w: 22, d: LET[a], d2: LET[b] };
      }
      if (kind === 1) { // a tally
        const n = 3 + Math.floor(r() * 3); let d = '';
        for (let k = 0; k < n; k++) d += `M${k * 4},0 l${(r() - 0.5).toFixed(1)},12 `;
        if (n === 5) d = d.replace(/M16,0 l[-\d.]+,12 $/, 'M-2,10 l18,-8 ');
        return { w: n * 4, d };
      }
      // a plain scratch, sometimes crossed out
      const len = 10 + r() * 12; let d = `M0,${(r() * 8).toFixed(1)} l${len.toFixed(1)},${(r() * 6 - 3).toFixed(1)}`;
      if (r() > 0.5) d += ` M${(len * 0.3).toFixed(1)},-2 l${(len * 0.4).toFixed(1)},12`;
      return { w: len, d };
    };
    let s = '<g fill="none" stroke-linecap="round" stroke-linejoin="round">';
    const rows = [-64, -42, -20, 2, 24, 46, 66];
    rows.forEach((y, ri) => {
      let x = -42 + r() * 6;
      while (x < 30) {
        // room for one more name: a bare patch in the middle of the column
        const bare = (ri === 3 || ri === 4) && x > -16 && x < 36;
        const it = item(Math.floor(r() * 3));
        if (x + it.w > 44) break;
        if (!bare) s += `<g transform="translate(${x.toFixed(1)},${(y + r() * 4 - 2).toFixed(1)}) rotate(${(r() * 16 - 8).toFixed(1)})" opacity="${(0.55 + r() * 0.45).toFixed(2)}">${cut(it.d, 1.5)}${it.d2 ? `<g transform="translate(12,0)">${cut(it.d2, 1.5)}</g>` : ''}</g>`;
        x += it.w + 7 + r() * 6;
      }
    });
    // once the four have cut it (ch0_carve): WREN in the bare patch, fresh, so bright where the old dares are dark
    if (carved) {
      const W4 = ['M0,0 l2,12 l2,-8 l2,8 l2,-12', 'M0,12 l0,-12 l5,0 q3,0 3,3 q0,3 -3,3 l-5,0 M3,6 l5,6', LET.E, LET.N];
      s += `<g transform="translate(-21,12) rotate(-3)">` + W4.map((d, i) => `<g transform="translate(${i * 11},0)"><path d="${d}" stroke="#241a0c" stroke-width="1.8" opacity=".5"/><path d="${d}" transform="translate(.6,.6)" stroke="#f2d48a" stroke-width="1.1" opacity=".85"/></g>`).join('') + '</g>';
    }
    return s + '</g>';
  }
  function collarBand() {
    let s = `<path d="M-78,-106 Q0,-92 78,-106 L78,-78 Q0,-64 -78,-78 Z" fill="#5a4a2a" stroke="#8a7040" stroke-width="3"/>`;
    s += `<path d="M-74,-100 Q0,-86 74,-100" fill="none" stroke="#c9a85a" stroke-width="1.5" opacity=".45"/>`;
    s += [-58, 58].map((x, i) => `<g transform="translate(${x},-90) scale(.55)" opacity=".6">` +
      `<circle cx="0" cy="0" r="21" fill="none" stroke="#2a2010" stroke-width="3" stroke-dasharray="${i ? '5 7' : '8 6'}"/>` +
      `<path d="${i ? 'M-10 7 L-1 -8 M3 9 L8 -5 M-9 -6 L7 -2' : 'M-8 9 L6 -7 M-2 10 L-6 -8 M-10 0 L9 4'}" fill="none" stroke="#2a2010" stroke-width="4" stroke-linecap="round" opacity=".7"/>` +
      `</g>`).join('');
    return s;
  }

  A.define('ch0_lamp', (p) => {
    const lit = !!(p && p.lit), carved = !!(p && p.carved);
    return P.wrap(
      P.sky('#0b0a12', '#1a1520') +
      `<rect x="0" y="600" width="${W}" height="300" fill="#100d16"/>` +
      `<g transform="translate(1010,420)">` +
      // lit: a warm halo behind the lamp, orange at the edge and gold at the heart
      (lit ? `${halo('lamphalo')}<circle cx="0" cy="-170" r="280" fill="url(#lamphalo)"><animate attributeName="opacity" values="1;.85;1;.9;1" dur="2.6s" repeatCount="indefinite"/></circle>` : '') +
      `<rect x="-200" y="80" width="400" height="30" fill="#2a2438"/>` +
      `<rect x="-48" y="-120" width="96" height="200" rx="8" fill="#4a3c22" stroke="${lit ? '#c9a85a' : '#8a7040'}" stroke-width="3"/>` +
      dares(carved) +
      `<circle cx="0" cy="-170" r="70" fill="#5a4a2a" stroke="${lit ? '#e8c070' : '#8a7040'}" stroke-width="5"/>` +
      `<circle cx="0" cy="-170" r="46" fill="none" stroke="#c9a85a" stroke-width="3" opacity=".8"/>` +
      `${[0, 1, 2, 3].map(i => { const a = (i / 4 * 360 - 90) * Math.PI / 180; return `<circle cx="${Math.cos(a) * 46}" cy="${-170 + Math.sin(a) * 46}" r="12" fill="#2a2010" stroke="#c9a85a" stroke-width="2"/>`; }).join('')}` +
      collarBand() +
      (lit ? `<circle cx="0" cy="-170" r="32" fill="#ffd27a" opacity=".35"/><circle cx="0" cy="-170" r="15" fill="#ffe08a" opacity=".95"><animate attributeName="opacity" values=".95;.75;1;.82;.95" dur="2s" repeatCount="indefinite"/></circle><circle cx="0" cy="-170" r="6" fill="#fff4d6"/>` : `<circle cx="0" cy="-170" r="14" fill="#2a2010" stroke="#6a5a3c" stroke-width="2"/>`) + // unlit until the ring is read
      `</g>` +
      P.fog(600, 300, '#241d33', 0.3)
    );
  });
})();
