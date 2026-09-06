/* Art — Epilogue: What the Fire Left Behind */
(function () {
  'use strict';
  const A = window.VigilArt, P = A.P, W = A.W, H = A.H;

  // A fire in any two colours (the Prologue's fire() only knows orange and blue).
  function fire2(x, base, scale, c1, c2, glow) {
    const sc = scale || 1;
    let s = `<g transform="translate(${x},${base}) scale(${sc})">`;
    s += `<ellipse cx="0" cy="0" rx="260" ry="40" fill="${c1}" opacity=".18"/>`;
    for (let i = 0; i < 7; i++) { const dx = (i - 3) * 38, h = 180 + (i % 2) * 60 - Math.abs(i - 3) * 30; s += `<path d="M${dx - 30},0 C${dx - 40},-${h * 0.4} ${dx - 10},-${h * 0.6} ${dx},-${h} C${dx + 10},-${h * 0.6} ${dx + 40},-${h * 0.4} ${dx + 30},0 Z" fill="${c1}" opacity=".85"><animate attributeName="d" values="M${dx - 30},0 C${dx - 40},-${h * 0.4} ${dx - 10},-${h * 0.6} ${dx},-${h} C${dx + 10},-${h * 0.6} ${dx + 40},-${h * 0.4} ${dx + 30},0 Z;M${dx - 30},0 C${dx - 46},-${h * 0.35} ${dx - 4},-${h * 0.7} ${dx + 8},-${h * 1.08} C${dx + 14},-${h * 0.6} ${dx + 36},-${h * 0.45} ${dx + 30},0 Z;M${dx - 30},0 C${dx - 40},-${h * 0.4} ${dx - 10},-${h * 0.6} ${dx},-${h} C${dx + 10},-${h * 0.6} ${dx + 40},-${h * 0.4} ${dx + 30},0 Z" dur="${(1.6 + i * 0.23).toFixed(2)}s" repeatCount="indefinite"/></path>`; }
    for (let i = 0; i < 5; i++) { const dx = (i - 2) * 40, h = 110 + (i % 2) * 40; s += `<path d="M${dx - 18},0 C${dx - 22},-${h * 0.4} ${dx - 6},-${h * 0.6} ${dx},-${h} C${dx + 6},-${h * 0.6} ${dx + 22},-${h * 0.4} ${dx + 18},0 Z" fill="${c2}" opacity=".9"><animate attributeName="opacity" values=".9;.6;.95;.7;.9" dur="${(0.9 + i * 0.17).toFixed(2)}s" repeatCount="indefinite"/></path>`; }
    s += `<circle cx="0" cy="-60" r="300" fill="${c1}" opacity="${glow || 0.12}"><animate attributeName="opacity" values="${glow || 0.12};${(glow || 0.12) * 1.5};${(glow || 0.12) * 0.8};${(glow || 0.12) * 1.25};${glow || 0.12}" dur="1.3s" repeatCount="indefinite"/></circle>`;
    return s + '</g>';
  }
  // The Hearth hall: pillars, the arch, the prophecy stone.
  function hall(dark, stoneColor) {
    return P.pillars(6, 760, 620, dark || '#0d0a10') +
      `<rect x="560" y="330" width="480" height="430" fill="#120d12"/>` +
      `<path d="M560,330 A240,240 0 0 1 1040,330" fill="#120d12"/>` +
      `<rect x="600" y="200" width="400" height="110" rx="4" fill="${stoneColor || '#221a20'}" stroke="#3a2c2c" stroke-width="3"/>` +
      P.circleRunes(800, 255, 46, 10, 'rgba(212,169,78,0.35)', 3);
  }
  // A person standing: silhouette with a lit edge. eye: colour of a faint eye-glint (grey for the spent).
  function person(x, base, sc, color, edge) {
    return `<g transform="translate(${x},${base}) scale(${sc || 1})"><ellipse cx="0" cy="-4" rx="18" ry="6" fill="#000" opacity=".35"/><path d="M-15,0 L-11,-72 L11,-72 L15,0 Z" fill="${color}"/><circle cx="0" cy="-84" r="12" fill="${color}"/><path d="M-11,-72 L11,-72 L15,0" fill="none" stroke="${edge}" stroke-width="2" opacity=".55"/><path d="M4,-95 A12,12 0 0 1 11,-80" fill="none" stroke="${edge}" stroke-width="2" opacity=".55"/></g>`;
  }
  A.ch8 = { fire2, hall, person };

  /* The Hearth roaring white: too hot to have a colour. */
  A.define('ch8_white', () => P.wrap(
    P.sky('#1a1410', '#3a2a18') +
    hall('#171210', '#2a2220') +
    `<rect x="0" y="0" width="${W}" height="${H}" fill="#fff3d8" opacity=".12"><animate attributeName="opacity" values=".12;.2;.1;.18;.12" dur="1.1s" repeatCount="indefinite"/></rect>` +
    fire2(800, 770, 1.7, '#fff1d0', '#ffffff', 0.32) +
    P.floorTiles(760, '#1a1512', 'rgba(255,240,210,0.08)') +
    `<defs><radialGradient id="ch8wg" cx=".5" cy=".7" r=".6"><stop offset="0" stop-color="#fff8e6" stop-opacity=".55"/><stop offset="1" stop-color="#fff8e6" stop-opacity="0"/></radialGradient></defs><rect width="${W}" height="${H}" fill="url(#ch8wg)"/>`
  ));

  /* The four on the stones, grey-eyed, and Wren waiting. */
  A.define('ch8_stones', (p) => P.wrap(
    P.sky('#0a0810', '#1a0f0a') +
    hall() +
    fire2(800, 740, 1.05, '#ff9a3c', '#ffe08a', 0.14) +
    P.floorTiles(760, '#0b0910', 'rgba(255,255,255,0.04)') +
    // four figures, backs lit by the fire; Wren small, nearer the fire
    [520, 640, 960, 1080].map((x, i) => person(x, 820, 1.05, '#100c14', '#f2d27a')).join('') +
    (p && p.noWren ? '' : person(800, 800, 0.8, '#151020', '#ffd27a')) +
    P.fog(600, 300, '#2a1a12', 0.35)
  ));

  /* Years later: a small house in winter, a window full of lamp-light, the Marches beyond. */
  A.define('ch8_years', () => P.wrap(
    P.sky('#070812', '#1b1a2c') + P.stars(160, 31) + P.moon(1290, 150, 34, '#eef2ff') +
    P.mountains('#0f0e1c', 4, 600, 240, 9) + P.mountains('#0b0a14', 6, 690, 180, 12) +
    P.trees(26, 780, '#0a0912', 12, 90, 220) +
    `<g transform="translate(800,780)">` +
    `<path d="M-260,0 L-260,-170 L0,-300 L260,-170 L260,0 Z" fill="#141019"/>` +
    `<path d="M-280,-165 L0,-315 L280,-165" fill="none" stroke="#e8ecff" stroke-width="10" opacity=".55"/>` +
    `<rect x="60" y="-290" width="40" height="70" fill="#1a1520"/>` +
    `<rect x="-120" y="-130" width="110" height="90" rx="4" fill="#ffd27a" opacity=".85"><animate attributeName="opacity" values=".85;.7;.9;.75;.85" dur="2.6s" repeatCount="indefinite"/></rect>` +
    `<rect x="30" y="-130" width="110" height="90" rx="4" fill="#ffc86a" opacity=".8"><animate attributeName="opacity" values=".8;.9;.7;.85;.8" dur="3.1s" repeatCount="indefinite"/></rect>` +
    `<path d="M-65,-130 L-65,-40 M-120,-85 L-10,-85 M85,-130 L85,-40 M30,-85 L140,-85" stroke="#141019" stroke-width="6"/>` +
    // five shapes at the window
    `<g fill="#2a2010" opacity=".9"><rect x="-108" y="-100" width="18" height="60" rx="6"/><rect x="-82" y="-96" width="18" height="56" rx="6"/><rect x="-40" y="-104" width="18" height="64" rx="6"/><rect x="48" y="-98" width="18" height="58" rx="6"/><rect x="98" y="-108" width="18" height="68" rx="6"/></g>` +
    `<path d="M-40,0 L-40,-70 L40,-70 L40,0 Z" fill="#0d0b12"/>` +
    `<ellipse cx="0" cy="0" rx="360" ry="60" fill="#e8ecff" opacity=".12"/>` +
    `</g>` +
    P.ground(780, '#0e0d18') +
    `<circle cx="770" cy="640" r="260" fill="#ffd27a" opacity=".07"><animate attributeName="opacity" values=".07;.1;.06;.09;.07" dur="2.4s" repeatCount="indefinite"/></circle>` +
    P.fog(520, 320, '#1b1a2c', 0.4)
  ));

  /* The cage: Wren behind bars, the Crown's engines drinking the Cold. */
  A.define('ch8_cage', () => P.wrap(
    P.sky('#06070c', '#0d1220') +
    P.pillars(6, 760, 620, '#07080e') +
    // pipes and engines, one cold blue
    `<g stroke="#1c2436" stroke-width="26" fill="none" stroke-linecap="round"><path d="M0,300 L400,300 L400,520 L640,520"/><path d="M1600,340 L1200,340 L1200,560 L960,560"/><path d="M200,120 L200,300"/><path d="M1400,140 L1400,340"/></g>` +
    `<g stroke="#4fb3bf" stroke-width="3" fill="none" opacity=".5"><path d="M0,300 L400,300 L400,520 L640,520"/><path d="M1600,340 L1200,340 L1200,560 L960,560"/></g>` +
    `<rect x="560" y="330" width="480" height="430" fill="#0a0d16"/>` + `<path d="M560,330 A240,240 0 0 1 1040,330" fill="#0a0d16"/>` +
    fire2(800, 770, 0.9, '#4fb3bf', '#a8e6ee', 0.16) +
    P.floorTiles(760, '#07080e', 'rgba(79,179,191,0.06)') +
    // the cage
    `<g transform="translate(800,700)">` +
    `<rect x="-110" y="-230" width="220" height="230" rx="18" fill="#05060a" opacity=".85"/>` +
    person(0, -12, 0.85, '#0b0c14', '#4fb3bf') +
    `${[-100, -75, -50, -25, 0, 25, 50, 75, 100].map(x => `<line x1="${x}" y1="-236" x2="${x}" y2="6" stroke="#3a3f4c" stroke-width="7"/>`).join('')}` +
    `<rect x="-118" y="-244" width="236" height="14" rx="4" fill="#3a3f4c"/><rect x="-118" y="0" width="236" height="14" rx="4" fill="#3a3f4c"/>` +
    `</g>` +
    // soldiers
    [400, 470, 1130, 1200].map(x => person(x, 830, 1.1, '#0a0b12', '#4a4f5c')).join('') +
    P.fog(560, 340, '#0d1220', 0.45)
  ));

  /* The Provost's fire, flickering: a small blue-edged flame, one figure keeping it. */
  A.define('ch8_flicker', () => P.wrap(
    P.sky('#0a0810', '#12101a') +
    hall('#0b0910') +
    fire2(800, 750, 0.55, '#ff9a3c', '#ffe08a', 0.1) +
    `<g opacity=".7">${fire2(800, 750, 0.42, '#4fb3bf', '#a8e6ee', 0.06)}</g>` +
    `<rect x="0" y="0" width="${W}" height="${H}" fill="#000" opacity="0"><animate attributeName="opacity" values="0;0;.35;0;0;0;.2;0" dur="6.5s" repeatCount="indefinite"/></rect>` +
    P.floorTiles(760, '#0b0910', 'rgba(255,255,255,0.03)') +
    person(900, 830, 1.15, '#0e0b12', '#c9a85a') +
    P.fog(560, 340, '#12101a', 0.5)
  ));

  /* Dawn over Thornhallow: the school still there, and warm. For the chart, the map and the numbers. */
  A.define('ch8_dawn', () => P.wrap(
    P.sky('#1b1a32', '#5a3a2a') +
    `<defs><linearGradient id="ch8dawn" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#ffb070" stop-opacity="0"/><stop offset="1" stop-color="#ffb070" stop-opacity=".45"/></linearGradient></defs><rect x="0" y="380" width="${W}" height="400" fill="url(#ch8dawn)"/>` +
    P.stars(70, 44, 300) +
    P.mountains('#1a1628', 4, 640, 260, 9) + P.mountains('#120f1e', 5, 720, 200, 12) +
    P.tower(800, 760, 150, 420, '#0d0b16', 5) + P.tower(640, 760, 90, 260, '#0f0d18', 2) + P.tower(960, 760, 90, 300, '#0f0d18', 3) +
    P.fog(600, 260, '#3a2a30', 0.5) + P.ground(760, '#0a0810')
  ));
})();
