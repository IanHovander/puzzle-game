/* Art — Finale: the bell-chamber's edge, the floor-ring, the cold hearth, the walk, the white. */
(function () {
  'use strict';
  const A = window.VigilArt, P = A.P, W = A.W, H = A.H;
  const G = () => window.VigilGlyphs;

  /* the Cold under the lid: a cold-blue glow rising through the seams of the floor */
  function coldFloor(y, strength) {
    const s = strength == null ? 0.35 : strength;
    let out = `<defs><linearGradient id="ch7cold" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#4fb3bf" stop-opacity="0"/><stop offset="1" stop-color="#4fb3bf" stop-opacity="${s}"/></linearGradient></defs>`;
    out += `<rect x="0" y="${y}" width="${W}" height="${H - y}" fill="url(#ch7cold)"/>`;
    for (let i = -5; i <= 5; i++) out += `<line x1="${W / 2 + i * 90}" y1="${y}" x2="${W / 2 + i * 300}" y2="${H}" stroke="#4fb3bf" stroke-width="2" opacity="${(s * 0.5).toFixed(2)}"><animate attributeName="opacity" values="${(s * 0.3).toFixed(2)};${(s * 0.7).toFixed(2)};${(s * 0.3).toFixed(2)}" dur="${(3 + Math.abs(i) * 0.4).toFixed(1)}s" repeatCount="indefinite"/></line>`;
    return out;
  }
  /* the four Founders' bells hanging above */
  function bells(y) {
    return [0, 1, 2, 3].map(i => { const x = 560 + i * 160; return `<g transform="translate(${x},${y})"><line x1="0" y1="-160" x2="0" y2="-70" stroke="#1b1720" stroke-width="6"/><path d="M-46,0 L-46,-40 Q-46,-74 0,-76 Q46,-74 46,-40 L46,0 Z" fill="#1b1720" stroke="#3a3040" stroke-width="2"/><circle cx="0" cy="8" r="7" fill="#2a2430"/></g>`; }).join('');
  }
  /* a spark of fire in a stone basin */
  function spark(x, y, scale, blue) {
    const sc = scale || 1; const c = blue ? '#4fb3bf' : '#ff9a3c';
    return `<g transform="translate(${x},${y}) scale(${sc})"><ellipse cx="0" cy="8" rx="70" ry="14" fill="#15111a"/><circle cx="0" cy="-6" r="140" fill="${c}" opacity=".10"><animate attributeName="opacity" values=".10;.16;.08;.13;.10" dur="1.7s" repeatCount="indefinite"/></circle><path d="M-8,0 C-10,-10 -4,-14 0,-26 C4,-14 10,-10 8,0 Z" fill="${c}" opacity=".95"><animate attributeName="d" values="M-8,0 C-10,-10 -4,-14 0,-26 C4,-14 10,-10 8,0 Z;M-7,0 C-11,-8 -2,-16 2,-30 C5,-13 11,-9 7,0 Z;M-8,0 C-10,-10 -4,-14 0,-26 C4,-14 10,-10 8,0 Z" dur="1.1s" repeatCount="indefinite"/></path><path d="M-4,0 C-5,-6 -2,-9 0,-15 C2,-9 5,-6 4,0 Z" fill="#fff0a0" opacity=".9"/></g>`;
  }
  /* the floor-ring: an ellipse of eight sockets seen from the chamber's edge */
  function floorRing(cx, cy, rx, ry, lit) {
    let s = `<ellipse cx="${cx}" cy="${cy}" rx="${rx + 34}" ry="${ry + 16}" fill="none" stroke="rgba(212,169,78,${lit ? 0.5 : 0.25})" stroke-width="3"/>`;
    s += `<ellipse cx="${cx}" cy="${cy}" rx="${rx - 34}" ry="${ry - 16}" fill="none" stroke="rgba(212,169,78,${lit ? 0.35 : 0.18})" stroke-width="2"/>`;
    for (let i = 0; i < 8; i++) { const a = (i / 8 * 360 - 90) * Math.PI / 180; const x = cx + Math.cos(a) * rx, y = cy + Math.sin(a) * ry; s += `<ellipse cx="${x.toFixed(0)}" cy="${y.toFixed(0)}" rx="26" ry="12" fill="#0b0910" stroke="rgba(212,169,78,${lit ? 0.7 : 0.4})" stroke-width="2"/>`; if (lit) s += `<ellipse cx="${x.toFixed(0)}" cy="${y.toFixed(0)}" rx="12" ry="5" fill="#ffd27a" opacity=".6"><animate attributeName="opacity" values=".6;.3;.65;.4;.6" dur="${(1.4 + i * 0.2).toFixed(1)}s" repeatCount="indefinite"/></ellipse>`; }
    return s;
  }
  /* A wall inscription as the room sees it: rubbed almost out. The Hearth must never draw a fact that
     lives on one player's phone, and what these walls say is the Reader's whole job. An earlier version
     drew the true G.shapeInner(shape, inv) geometry here at low opacity -- exact shapes in the exact
     carved order, on screen for the whole puzzle, while book.js prints the shape-to-word lexicon on the
     Listener's phone all night. Turn a TV's brightness up and the Reader is redundant. So the fire draws
     the WEAR ONLY: a cartouche, an arbitrary broken scribble that is not any glyph, and the chips
     scratched across it. Nothing here is derived from WEST or EAST, and neither array exists any more. */
  function wallCarving(x, y, count, scale, color) {
    const sc = scale || 1.1, n = count || 4;
    /* an arbitrary rubbed-out mark: a fixed scribble, varied per cartouche by index alone */
    const scribble = (i) => `<path d="M${-9 - i},${-15 + i * 2} C${4 + i},${-9} ${-8},${-1 - i} ${7 - i},${5}
      C${-3},${9 + i} ${6 + i},${13} ${-5},${15 - i}" fill="none" stroke="currentColor" stroke-width="3"
      stroke-linecap="round" stroke-dasharray="5 7" opacity=".55"/>`;
    let out = `<g transform="translate(${x},${y}) scale(${sc})" style="color:${color || '#4a4250'}" opacity=".3">`;
    for (let i = 0; i < n; i++) {
      out += `<g transform="translate(${i * 54},0)">`;
      out += `<rect x="-22" y="-24" width="44" height="48" rx="4" fill="rgba(255,255,255,0.022)"/>`;
      out += scribble(i);
      out += `<g stroke="#0d0b12" stroke-width="3" stroke-linecap="round" opacity=".9"><path d="M-20,${-10 + i * 3} L18,${-4 + i * 2}"/><path d="M-14,${12 - i * 2} L16,${16 - i * 3}"/></g>`;
      out += `</g>`;
    }
    return out + `</g>`;
  }
  /* the four carved figures walking into a flame */
  function carvedFigures(x, y, color) {
    let s = `<g transform="translate(${x},${y})" opacity=".55">`;
    for (let i = 0; i < 4; i++) s += `<g transform="translate(${i * 40},0)"><path d="M-9,0 L-6,-46 L6,-46 L9,0 Z" fill="${color}"/><circle cx="0" cy="-54" r="8" fill="${color}"/></g>`;
    s += `<path d="M170,0 C160,-30 175,-50 180,-80 C185,-50 200,-30 190,0 Z" fill="${color}"/></g>`;
    return s;
  }
  /* guards with spears */
  function guards(x0, base, n, color, dir) {
    let s = '';
    for (let i = 0; i < n; i++) { const x = x0 + i * 62 * (dir || 1); s += `<g transform="translate(${x},${base})"><path d="M-14,0 L-10,-72 L10,-72 L14,0 Z" fill="${color}"/><circle cx="0" cy="-84" r="12" fill="${color}"/><line x1="18" y1="0" x2="22" y2="-150" stroke="${color}" stroke-width="4"/><path d="M19,-150 L26,-172 L30,-148 Z" fill="${color}"/><path d="M-26,-40 a18,26 0 0 1 0,52 Z" fill="#23202a" stroke="${color}" stroke-width="2"/></g>`; }
    return s;
  }

  A.define('ch7_edge', (p) => P.wrap(
    P.sky('#06050b', '#0f0c16') +
    // the shaft above with the far spark of the Hearth
    P.lightBeam(800, 0, 120, 560, '#ff9a3c') +
    `<circle cx="800" cy="26" r="6" fill="#ffd27a"><animate attributeName="opacity" values="1;.4;1;.6;1" dur="1.6s" repeatCount="indefinite"/></circle>` +
    bells(330) +
    // chamber walls with the two inscriptions and the carved figures
    `<rect x="0" y="380" width="260" height="380" fill="#0d0b12"/><rect x="1340" y="380" width="260" height="380" fill="#0d0b12"/>` +
    wallCarving(60, 470, 4, 1.15) + wallCarving(1380, 470, 4, 1.15) +
    carvedFigures(1340, 560, '#8a6a3a') +
    P.floorTiles(720, '#0a0810', 'rgba(255,255,255,0.035)') +
    coldFloor(720, 0.32) +
    floorRing(800, 800, 300, 60, false) +
    spark(800, 780, 1.3, false) +
    // Vane at the right edge, the Crown's soldiers behind him; Marrow and Wren at the fire; the four between
    `<g transform="translate(1180,790)"><path d="M-18,0 L-12,-116 L12,-116 L18,0 Z" fill="#141018"/><circle cx="0" cy="-130" r="14" fill="#141018"/><path d="M-12,-116 L-14,-40" stroke="#b23a3a" stroke-width="2" opacity=".8"/><path d="M12,-116 L14,-40" stroke="#d4a94e" stroke-width="2" opacity=".6"/></g>` +
    guards(1280, 800, 4, '#101018', 1) +
    (p && p.ally ? '' : `<g transform="translate(1250,730)"><path d="M-14,0 L-10,-80 L10,-80 L14,0 Z" fill="#141018"/><circle cx="0" cy="-92" r="12" fill="#141018"/></g>`) +
    `<g transform="translate(900,800)"><path d="M-16,0 L-12,-104 L12,-104 L16,0 Z" fill="#171320"/><circle cx="0" cy="-118" r="13" fill="#171320"/><path d="M-12,-104 L-10,-30" stroke="#ff9a3c" stroke-width="1.5" opacity=".5"/></g>` +
    `<g transform="translate(850,812)"><path d="M-10,0 L-8,-64 L8,-64 L10,0 Z" fill="#171320"/><circle cx="0" cy="-74" r="10" fill="#171320"/><path d="M8,-64 L10,-30" stroke="#4fb3bf" stroke-width="1.5" opacity=".6"/></g>` +
    P.figures([{ x: 640, s: 0.9 }, { x: 700, s: 0.95 }, { x: 990, s: 0.95 }, { x: 1050, s: 0.9 }], 840, '#12101a') +
    P.fog(600, 300, '#1b1626', 0.35)
  ));

  A.define('ch7_ring', (p) => P.wrap(
    P.sky('#06050b', '#0e0b14') +
    P.lightBeam(800, 0, 80, 480, '#ff9a3c') +
    bells(300) +
    `<rect x="0" y="360" width="300" height="400" fill="#0d0b12"/><rect x="1300" y="360" width="300" height="400" fill="#0d0b12"/>` +
    wallCarving(60, 440, 4, 1.2, '#57506a') + wallCarving(1340, 440, 4, 1.2, '#57506a') +
    P.floorTiles(700, '#0a0810', 'rgba(255,255,255,0.035)') +
    coldFloor(700, 0.4) +
    floorRing(800, 790, 420, 96, !!(p && p.lit)) +
    spark(800, 770, 1.1, false) +
    `<g transform="translate(800,762)" opacity=".9"><path d="M-9,0 L-7,-60 L7,-60 L9,0 Z" fill="#171320"/><circle cx="0" cy="-70" r="9" fill="#171320"/><path d="M0,-2 L0,-8" stroke="#4fb3bf" stroke-width="2"/></g>` +
    P.fog(560, 300, '#1b1626', 0.3)
  ));

  A.define('ch7_cold', () => P.wrap(
    P.sky('#04050a', '#0a1018') +
    bells(300) +
    `<rect x="0" y="360" width="300" height="400" fill="#0a0d14"/><rect x="1300" y="360" width="300" height="400" fill="#0a0d14"/>` +
    wallCarving(60, 440, 4, 1.2, '#2f3a48') + wallCarving(1340, 440, 4, 1.2, '#2f3a48') +
    P.floorTiles(700, '#070910', 'rgba(79,179,191,0.06)') +
    coldFloor(640, 0.85) +
    floorRing(800, 790, 420, 96, false) +
    `<ellipse cx="800" cy="778" rx="70" ry="14" fill="#0b0f16"/>` +
    `<circle cx="800" cy="760" r="240" fill="#4fb3bf" opacity=".08"><animate attributeName="r" values="240;300;240" dur="6s" repeatCount="indefinite"/></circle>` +
    P.fog(500, 400, '#0f1a24', 0.5)
  ));

  A.define('ch7_walk', (p) => P.wrap(
    P.sky('#0a0810', '#1a1420') +
    bells(300) +
    `<rect x="0" y="360" width="300" height="400" fill="#100d14"/><rect x="1300" y="360" width="300" height="400" fill="#100d14"/>` +
    P.floorTiles(700, '#0c0a12', 'rgba(255,255,255,0.04)') +
    floorRing(800, 790, 420, 96, true) +
    // the inverted flame, written: a tall fire the wrong way up
    `<g transform="translate(800,470)"><circle r="360" fill="#fff0c0" opacity=".14"><animate attributeName="opacity" values=".14;.22;.14" dur="2.4s" repeatCount="indefinite"/></circle><path d="M-90,-160 C-100,-60 -40,-20 0,150 C40,-20 100,-60 90,-160 Z" fill="#ffd27a" opacity=".85"><animate attributeName="d" values="M-90,-160 C-100,-60 -40,-20 0,150 C40,-20 100,-60 90,-160 Z;M-96,-160 C-92,-50 -30,-30 6,166 C36,-30 104,-52 96,-160 Z;M-90,-160 C-100,-60 -40,-20 0,150 C40,-20 100,-60 90,-160 Z" dur="1.9s" repeatCount="indefinite"/></path><path d="M-40,-150 C-44,-80 -16,-40 0,60 C16,-40 44,-80 40,-150 Z" fill="#fffbe6" opacity=".95"/></g>` +
    // four figures stepping in, lit edges; Wren aside
    P.figures((p && p.ending === 1) ? [{ x: 700, s: 1 }, { x: 900, s: 1 }] : [{ x: 640, s: 1 }, { x: 740, s: 1.05 }, { x: 860, s: 1.05 }, { x: 960, s: 1 }], 820, '#2a2230') +
    `<g transform="translate(1120,800)"><path d="M-9,0 L-7,-60 L7,-60 L9,0 Z" fill="#171320"/><circle cx="0" cy="-70" r="9" fill="#171320"/></g>` +
    P.fog(520, 320, '#ffd27a', 0.12)
  ));

  A.define('ch7_white', () => P.wrap(
    P.sky('#fbf7ee', '#efe6d2') +
    `<circle cx="800" cy="460" r="420" fill="#fff" opacity=".9"/>` +
    `<g transform="translate(800,420)" opacity=".16" style="color:#8a6a3a">` + `<g transform="scale(9) rotate(180)">${G().SHAPES.Flame}</g>` + `</g>` +
    `<g opacity=".18">${P.figures([{ x: 640, s: 1 }, { x: 740, s: 1.05 }, { x: 860, s: 1.05 }, { x: 960, s: 1 }], 820, '#8a7a6a')}</g>` +
    `<rect width="${W}" height="${H}" fill="#fff" opacity=".35"><animate attributeName="opacity" values=".35;.5;.35" dur="4s" repeatCount="indefinite"/></rect>`
  ));

  /* the ending's art, chosen by ENDING (0 Fourfold, 1 Half, 2 Sealing, 3 Keeper, 4 Bargain) */
  A.define('ch7_end', (p) => {
    const e = (p && p.ending) | 0;
    if (e === 0 || e === 1) return A.scenes.ch7_walk({ ending: e });
    if (e === 4) return A.scenes.ch7_cold({});
    return A.scenes.ch7_ring({ lit: true });
  });
})();
