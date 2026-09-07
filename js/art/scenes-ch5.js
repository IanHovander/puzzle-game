/* Art — Chapter V: The Long Stair, the foundations, the Under-Marches */
(function () {
  'use strict';
  const A = window.VigilArt, P = A.P, W = A.W, H = A.H;
  const COLD = '#4fb3bf', COLD2 = '#a8e6ee';

  /* A cold glow rising from below: the Cold, like an inverted sky. */
  function coldGlow(y, strength, id) {
    const s = strength == null ? 0.5 : strength; const gid = id || 'coldglow';
    return `<defs><linearGradient id="${gid}" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="${COLD}" stop-opacity="0"/><stop offset="1" stop-color="${COLD}" stop-opacity="${s}"/></linearGradient></defs><rect x="0" y="${y}" width="${W}" height="${H - y}" fill="url(#${gid})"><animate attributeName="opacity" values="1;.8;1;.9;1" dur="5s" repeatCount="indefinite"/></rect>`;
  }
  /* A flight of steps descending from (x,y) to the right/left. */
  function flight(x, y, n, dir, w, h, color) {
    let s = `<g>`;
    for (let i = 0; i < n; i++) { const sx = x + dir * i * w, sy = y + i * h; s += `<rect x="${dir > 0 ? sx : sx - w}" y="${sy}" width="${w}" height="${h + 6}" fill="${color}"/><line x1="${dir > 0 ? sx : sx - w}" y1="${sy}" x2="${dir > 0 ? sx + w : sx}" y2="${sy}" stroke="rgba(255,255,255,0.08)" stroke-width="1.5"/>`; }
    return s + `</g>`;
  }
  /* A zigzag stair down a shaft: alternating flights with landings. */
  function longStair(x0, y0, flights, color) {
    let s = ''; let x = x0, y = y0, dir = 1;
    for (let f = 0; f < flights; f++) {
      const n = 9, w = 44, h = 22;
      s += flight(x, y, n, dir, w, h, color);
      x += dir * n * w; y += n * h; s += `<rect x="${dir > 0 ? x : x - 120}" y="${y}" width="120" height="30" fill="${color}"/>`; dir = -dir; y += 10;
    }
    return s;
  }
  function torchRow(list, sc) { return list.map(([x, y]) => P.torch(x, y, sc || 0.8)).join(''); }
  function figuresOnStair(base, color) {
    return P.figures([{ x: 640, s: 0.62 }, { x: 700, s: 0.6 }, { x: 760, s: 0.62 }, { x: 820, s: 0.6 }, { x: 900, s: 0.5, color: '#2a2438' }], base, color);
  }

  /* 1. The Long Stair — a shaft of steps going down into blue dark. */
  A.define('ch5_stair', (p) => P.wrap(
    P.sky('#07070d', '#0b1018') +
    `<rect x="300" y="0" width="1000" height="${H}" fill="#0c0b12"/>` +
    `<rect x="300" y="0" width="30" height="${H}" fill="#151320"/><rect x="1270" y="0" width="30" height="${H}" fill="#151320"/>` +
    longStair(340, 120, 3, '#181622') +
    (p && p.broken ? `<rect x="560" y="500" width="480" height="420" fill="#07070d"/><path d="M560,500 L620,540 L600,600 L680,640 L640,720 L720,760 L700,900 L560,900 Z" fill="#0c0b12"/><path d="M1040,500 L980,560 L1010,620 L940,680 L980,740 L920,800 L940,900 L1040,900 Z" fill="#0c0b12"/>${[0, 1, 2, 3, 4, 5].map(i => `<rect x="${620 + i * 60}" y="${700 + (i % 3) * 40}" width="${30 + (i % 2) * 20}" height="18" fill="#1d1a28" transform="rotate(${(i * 23) % 40 - 20} ${640 + i * 60} ${710})"/>`).join('')}` : '') +
    torchRow([[420, 250], [1180, 470], [420, 700]], 0.85) +
    figuresOnStair(560, '#0a0910') +
    coldGlow(560, p && p.broken ? 0.25 : 0.42) +
    P.fog(200, 400, '#1a1a2a', 0.35)
  ));

  /* 2. The foundations — the stair passes the roots of the school: huge blocks and pillar-roots. */
  A.define('ch5_foundations', () => P.wrap(
    P.sky('#06060b', '#0a0f16') +
    `${[0, 1, 2, 3, 4, 5].map(i => { const x = 90 + i * 280, w = 150 + (i % 2) * 60; return `<path d="M${x},0 L${x + w},0 L${x + w + 40},${H} L${x - 40},${H} Z" fill="${i % 2 ? '#100e17' : '#13111c'}"/>${[1, 2, 3, 4, 5, 6].map(j => `<line x1="${x - 40 * (j / 6)}" y1="${j * 150}" x2="${x + w + 40 * (j / 6)}" y2="${j * 150}" stroke="rgba(255,255,255,0.06)" stroke-width="2"/>`).join('')}`; }).join('')}` +
    `<path d="M0,${H} L0,760 C200,700 300,780 500,720 C700,660 900,760 1100,700 C1300,640 1450,740 ${W},700 L${W},${H} Z" fill="#0b0a11"/>` +
    flight(560, 520, 12, 1, 40, 18, '#191724') +
    torchRow([[520, 500], [1080, 720]], 0.8) +
    P.figures([{ x: 700, s: 0.55 }, { x: 760, s: 0.55 }, { x: 820, s: 0.55 }, { x: 880, s: 0.55 }, { x: 960, s: 0.45, color: '#2a2438' }], 700, '#0a0910') +
    coldGlow(640, 0.35, 'coldglow2') + P.fog(300, 400, '#141426', 0.3)
  ));

  /* 3. The Under-Marches — the drowned First Hall, four thrones, the Cold glowing below like an inverted sky. */
  A.define('ch5_marches', () => P.wrap(
    P.sky('#050509', '#081018') +
    // cavern roof
    `<path d="M0,0 L${W},0 L${W},160 C1400,220 1300,120 1100,200 C900,280 700,160 500,220 C300,280 150,180 0,240 Z" fill="#0c0b12"/>` +
    `${[0, 1, 2, 3, 4, 5, 6].map(i => `<path d="M${120 + i * 230},${170 + (i % 3) * 30} l-14,90 l28,0 Z" fill="#0c0b12"/>`).join('')}` +
    // the drowned First Hall: submerged arches on the far shore
    `<g opacity=".9">${[0, 1, 2, 3, 4].map(i => { const x = 420 + i * 190; return `<path d="M${x - 60},640 L${x - 60},480 A60,60 0 0 1 ${x + 60},480 L${x + 60},640 Z" fill="#101322" stroke="${COLD}" stroke-opacity=".25" stroke-width="2"/>`; }).join('')}<rect x="340" y="420" width="920" height="30" fill="#101322"/></g>` +
    // four thrones on a ledge
    `<g>${[0, 1, 2, 3].map(i => { const x = 560 + i * 160; return `<rect x="${x - 34}" y="560" width="68" height="90" rx="4" fill="#0a0a12" stroke="${COLD}" stroke-opacity=".35" stroke-width="2"/><path d="M${x - 34},560 L${x - 34},520 L${x - 10},540 L${x},500 L${x + 10},540 L${x + 34},520 L${x + 34},560 Z" fill="#0a0a12" stroke="${COLD}" stroke-opacity=".35" stroke-width="2"/>`; }).join('')}<rect x="480" y="650" width="640" height="18" fill="#0d0d16"/></g>` +
    P.water(668, '#0a1a24', 31) +
    `<g opacity=".55">${[0, 1, 2, 3, 4].map(i => { const x = 420 + i * 190; return `<path d="M${x - 60},700 L${x - 60},800 A60,60 0 0 0 ${x + 60},800 L${x + 60},700 Z" fill="#0f1a26"/>`; }).join('')}</g>` +
    `<defs><radialGradient id="coldsun" cx=".5" cy="1" r=".7"><stop offset="0" stop-color="${COLD2}" stop-opacity=".9"/><stop offset=".4" stop-color="${COLD}" stop-opacity=".45"/><stop offset="1" stop-color="${COLD}" stop-opacity="0"/></radialGradient></defs><rect x="0" y="600" width="${W}" height="300" fill="url(#coldsun)"><animate attributeName="opacity" values="1;.75;1;.85;1" dur="6s" repeatCount="indefinite"/></rect>` +
    P.stars(40, 17, 160).replace(/#e8ecff/g, COLD2) +
    P.figures([{ x: 180, s: 0.7 }, { x: 240, s: 0.7 }, { x: 300, s: 0.7 }, { x: 360, s: 0.7 }, { x: 440, s: 0.6, color: '#2a2438' }], 760, '#07070c') +
    P.fog(360, 300, '#0e1a28', 0.35)
  ));

  /* A carved panel on the lintel, worn past reading: a sunken recess and a few broken chisel strokes.
     The Hearth never draws the shape itself — what each recess says is the Reader's page and nowhere
     else, and a placed glyph on the board would otherwise read the lintel back to the room. */
  function wornPanel(x, y, seed) {
    const strokes = [0, 1, 2].map(k => {
      const a = ((seed * 37 + k * 61) % 90) - 45, len = 22 + ((seed * 13 + k * 7) % 18);
      return `<path d="M${x - len / 2},${y} l${len},0" stroke="#3a3346" stroke-width="${3 + (k % 2) * 2}" stroke-linecap="round" transform="rotate(${a} ${x} ${y + k * 12 - 12})"/>`;
    }).join('');
    return `<rect x="${x - 38}" y="${y - 44}" width="76" height="88" rx="6" fill="#12101a" stroke="#241f2e" stroke-width="3"/>${strokes}`;
  }
  const bell = (x, y) => `<g transform="translate(${x},${y})"><path d="M-22,10 L-22,0 Q-22,-26 0,-28 Q22,-26 22,0 L22,10 Z" fill="#241f2e" stroke="#3a3346" stroke-width="2"/><circle cy="16" r="4" fill="#3a3346"/></g>`;

  /* 4. A gate on the stair. params: { n: 1|2|3, cold: 0..1 } */
  A.define('ch5_gate', (p) => {
    const n = (p && p.n) || 1; const cold = p && p.cold != null ? p.cold : 0.4;
    const count = n === 2 ? 5 : 3; const cell = 110; const x0 = 800 - (count - 1) * cell / 2;
    return P.wrap(
      P.sky('#07070d', '#0a1016') +
      `<rect x="200" y="0" width="1200" height="${H}" fill="#0d0c13"/>` +
      P.door(800, 300, 300, 520, '#1c1926', n === 2 ? null : COLD) +
      `<rect x="470" y="200" width="660" height="110" rx="6" fill="#171420" stroke="#2c2738" stroke-width="4"/>` +
      `<g opacity=".85">${Array.from({ length: count }, (_, i) => wornPanel(x0 + i * cell, 255, i + n * 5)).join('')}</g>` +
      `<g>${Array.from({ length: count }, (_, i) => bell(x0 + i * cell, 130)).join('')}</g>` +
      `<circle cx="800" cy="720" r="120" fill="${COLD}" opacity=".08"><animate attributeName="opacity" values=".08;.16;.08" dur="1.1s" repeatCount="indefinite"/></circle>` +
      torchRow([[360, 420], [1240, 420]], 0.9) +
      P.floorTiles(760, '#0b0a11', 'rgba(255,255,255,0.04)') +
      coldGlow(700, cold, 'coldglow3') + P.fog(560, 300, '#141426', 0.35)
    );
  });

  /* 5. Soldiers on the stair above — torches coming down. */
  A.define('ch5_soldiers', () => P.wrap(
    P.sky('#07070d', '#0b1018') +
    `<rect x="300" y="0" width="1000" height="${H}" fill="#0c0b12"/>` +
    longStair(340, -80, 3, '#181622') +
    `<g>${[[420, 40], [600, 80], [760, 130], [900, 170], [1060, 220], [1180, 260], [1000, 330], [820, 380], [660, 430]].map(([x, y], i) => `<g transform="translate(${x},${y})"><path d="M-10,0 L-8,-44 L8,-44 L10,0 Z" fill="#050508"/><circle cy="-52" r="8" fill="#050508"/><ellipse cx="14" cy="-70" rx="7" ry="12" fill="#ff9a3c" opacity=".9"><animate attributeName="ry" values="12;15;11;13;12" dur="${(0.6 + i * 0.07).toFixed(2)}s" repeatCount="indefinite"/></ellipse><circle cx="14" cy="-70" r="46" fill="#ff9a3c" opacity=".1"/></g>`).join('')}</g>` +
    figuresOnStair(700, '#0a0910') +
    coldGlow(600, 0.3, 'coldglow4') + P.fog(300, 400, '#1a1a2a', 0.3) +
    `<rect x="0" y="0" width="${W}" height="${H}" fill="#ff9a3c" opacity=".05"><animate attributeName="opacity" values=".05;.1;.04;.08;.05" dur="1.4s" repeatCount="indefinite"/></rect>`
  ));
})();
