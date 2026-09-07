/* Art — Chapter III: The Whispering Gallery (the Gallery of portraits, the dark corridors, the Laundry, the Tower door). */
(function () {
  'use strict';
  const A = window.VigilArt, P = A.P, W = A.W, H = A.H;

  /* A row of portrait frames receding along one wall. side: -1 left wall, +1 right wall. */
  function frames(side, n, seed) {
    const r = A.rng(seed || 3);
    let s = '';
    for (let i = 0; i < n; i++) {
      const t = i / (n - 1);                       // 0 near, 1 far
      const x = side < 0 ? 40 + t * 640 : W - 40 - t * 640;
      const sc = 1 - t * 0.72;
      const fw = 150 * sc, fh = 210 * sc, y = 250 - t * 60;
      const skew = side < 0 ? -12 * (1 - t) : 12 * (1 - t);
      const lit = 0.35 + r() * 0.3;
      s += `<g transform="translate(${x.toFixed(0)},${y.toFixed(0)}) skewY(${skew.toFixed(1)})">`;
      s += `<rect x="${(-fw / 2).toFixed(0)}" y="0" width="${fw.toFixed(0)}" height="${fh.toFixed(0)}" fill="#0f0c14" stroke="#4a3a22" stroke-width="${(5 * sc).toFixed(1)}"/>`;
      s += `<rect x="${(-fw / 2 + 12 * sc).toFixed(0)}" y="${(12 * sc).toFixed(0)}" width="${(fw - 24 * sc).toFixed(0)}" height="${(fh - 24 * sc).toFixed(0)}" fill="#171220"/>`;
      // a dim figure in the frame: shoulders and a head, no face
      s += `<path d="M${(-fw * 0.3).toFixed(0)},${fh.toFixed(0)} C${(-fw * 0.3).toFixed(0)},${(fh * 0.55).toFixed(0)} ${(fw * 0.3).toFixed(0)},${(fh * 0.55).toFixed(0)} ${(fw * 0.3).toFixed(0)},${fh.toFixed(0)} Z" fill="#221a2c"/>`;
      s += `<circle cx="0" cy="${(fh * 0.4).toFixed(0)}" r="${(fw * 0.16).toFixed(0)}" fill="#261d31"/>`;
      // a lit edge that breathes — the portraits mutter
      s += `<rect x="${(-fw / 2).toFixed(0)}" y="0" width="${fw.toFixed(0)}" height="${fh.toFixed(0)}" fill="none" stroke="#d4a94e" stroke-width="${(1.5 * sc).toFixed(1)}" opacity="${lit.toFixed(2)}"><animate attributeName="opacity" values="${lit.toFixed(2)};${(lit * 0.4).toFixed(2)};${lit.toFixed(2)}" dur="${(2.5 + r() * 4).toFixed(1)}s" repeatCount="indefinite"/></rect>`;
      s += `</g>`;
    }
    return s;
  }

  /* The Gallery: a long hall of muttering portraits, a single lamp far off, five small figures. */
  A.define('ch3_gallery', () => P.wrap(
    P.sky('#0a0810', '#15101a') +
    // far wall with a lamp
    `<rect x="700" y="230" width="200" height="330" fill="#100c15"/>` +
    `<circle cx="800" cy="330" r="150" fill="#ff9a3c" opacity=".08"><animate attributeName="opacity" values=".08;.13;.07;.1;.08" dur="3s" repeatCount="indefinite"/></circle>` +
    `<g transform="translate(800,330)"><rect x="-8" y="0" width="16" height="70" fill="#2a2010"/><ellipse cx="0" cy="-6" rx="9" ry="16" fill="#ffb060"><animate attributeName="ry" values="16;20;14;18;16" dur="0.8s" repeatCount="indefinite"/></ellipse></g>` +
    // ceiling ribs
    `${[0, 1, 2, 3, 4, 5].map(i => { const t = i / 6; const y = 60 + t * 100; const x1 = 80 + t * 560, x2 = W - 80 - t * 560; return `<path d="M${x1},${y + 80} Q800,${y - 40} ${x2},${y + 80}" fill="none" stroke="#1b1522" stroke-width="${(14 - i * 2)}"/>`; }).join('')}` +
    frames(-1, 7, 31) + frames(1, 7, 47) +
    P.floorTiles(560, '#0d0a12', 'rgba(212,169,78,0.06)') +
    `<path d="M600,560 L1000,560 L1400,${H} L200,${H} Z" fill="#a03a10" opacity=".08"/>` +
    P.figures([{ x: 640, s: 1.0 }, { x: 720, s: 1.05 }, { x: 900, s: 1.05 }, { x: 980, s: 1.0 }], 760, '#0a0810') +
    P.figures([{ x: 810, s: 0.8 }], 745, '#120d16') +
    `<ellipse cx="810" cy="748" rx="14" ry="5" fill="#000" opacity=".4"/>` +
    P.fog(420, 380, '#1a1220', 0.35)
  ));

  /* The corridors: dark stone, a turning, a patrol's lantern-light sliding along the far wall. */
  A.define('ch3_corridors', (p) => P.wrap(
    P.sky('#07060b', '#100d15') +
    `<rect x="0" y="0" width="${W}" height="${H}" fill="#08070c"/>` +
    // right wall in perspective
    `<path d="M${W},0 L1100,180 L1100,620 L${W},${H} Z" fill="#12101a"/>` +
    `<path d="M0,0 L500,180 L500,620 L0,${H} Z" fill="#100e17"/>` +
    // far wall with a doorway
    `<rect x="500" y="180" width="600" height="440" fill="#0c0a11"/>` +
    `<path d="M760,620 L760,330 A40,40 0 0 1 840,330 L840,620 Z" fill="#050409"/>` +
    // stone courses
    `${[0, 1, 2, 3, 4, 5, 6].map(i => `<line x1="500" y1="${200 + i * 60}" x2="1100" y2="${200 + i * 60}" stroke="rgba(255,255,255,0.03)" stroke-width="1"/>`).join('')}` +
    `${[0, 1, 2, 3, 4].map(i => `<line x1="${0}" y1="${i * 225}" x2="500" y2="${180 + i * 110}" stroke="rgba(255,255,255,0.03)"/>`).join('')}` +
    // the sliding lantern light of a patrol, far off
    `<g><ellipse cx="640" cy="420" rx="120" ry="160" fill="${p && p.cold ? '#4fb3bf' : '#ffb060'}" opacity=".10"><animate attributeName="cx" values="560;1040;560" dur="14s" repeatCount="indefinite"/><animate attributeName="opacity" values=".10;.16;.06;.14;.10" dur="3.1s" repeatCount="indefinite"/></ellipse></g>` +
    // a niche lamp near the viewer, mostly out
    P.torch(120, 300, 0.9).replace(/opacity="\.12"/, 'opacity=".06"') +
    P.floorTiles(620, '#09080d', 'rgba(255,255,255,0.03)') +
    `<path d="M700,620 L900,620 L1300,${H} L300,${H} Z" fill="#ffb060" opacity=".035"/>` +
    P.fog(500, 300, '#151020', 0.4)
  ));

  /* The Laundry: drying racks, hanging sheets, a stove's glow, Bess's silhouette. */
  A.define('ch3_laundry', () => P.wrap(
    P.sky('#0d0a10', '#1c1410') +
    // rafters and racks
    `${[0, 1, 2, 3].map(i => `<rect x="120" y="${110 + i * 40}" width="1360" height="10" fill="#1d1712"/>`).join('')}` +
    // hanging sheets
    `${[0, 1, 2, 3, 4, 5, 6].map(i => { const x = 180 + i * 200, h = 300 + (i % 3) * 60; return `<path d="M${x},120 L${x + 140},120 L${x + 150},${120 + h} Q${x + 70},${140 + h} ${x - 10},${120 + h} Z" fill="#2a2430" opacity=".9"><animateTransform attributeName="transform" type="skewX" values="0;1.5;0;-1.2;0" dur="${(6 + i).toFixed(0)}s" repeatCount="indefinite"/></path>`; }).join('')}` +
    // the stove
    `<rect x="1180" y="480" width="220" height="260" rx="8" fill="#1a1410"/>` +
    `<rect x="1230" y="560" width="120" height="90" rx="4" fill="#ff8a3c" opacity=".55"><animate attributeName="opacity" values=".55;.35;.6;.4;.55" dur="1.7s" repeatCount="indefinite"/></rect>` +
    `<circle cx="1290" cy="600" r="260" fill="#ff9a3c" opacity=".09"><animate attributeName="opacity" values=".09;.13;.08;.11;.09" dur="2.3s" repeatCount="indefinite"/></circle>` +
    // copper and tubs
    `<ellipse cx="420" cy="700" rx="110" ry="30" fill="#221a14"/><rect x="310" y="620" width="220" height="80" fill="#2a2018"/>` +
    P.floorTiles(720, '#100c10', 'rgba(255,200,150,0.04)') +
    // Bess, broad, at the stove; four; Wren small on a tub
    P.figures([{ x: 1120, s: 1.15, color: '#0e0b0e' }], 770, '#0e0b0e') +
    P.figures([{ x: 560, s: 1.0 }, { x: 640, s: 1.0 }, { x: 760, s: 1.0 }, { x: 840, s: 1.0 }], 790, '#0b0910') +
    P.figures([{ x: 420, s: 0.75, color: '#150f14' }], 700, '#150f14') +
    P.fog(380, 400, '#2a1e18', 0.35)
  ));

  /* The Tower door: a great iron-bound door with three worn carvings on the arch over it; soldiers' silhouettes; the ward's glow (p.ward: 'ash' | 'cold' | none). */
  A.define('ch3_towerdoor', (p) => {
    const glow = p && p.ward === 'cold' ? '#4fb3bf' : (p && p.ward ? '#ff9a3c' : null);
    return P.wrap(
      P.sky('#07060b', '#120e16') +
      `<rect x="0" y="0" width="${W}" height="${H}" fill="#0a080e"/>` +
      // tower wall
      `<rect x="480" y="0" width="640" height="${H}" fill="#14101a"/>` +
      `${[0, 1, 2, 3, 4, 5, 6, 7, 8].map(i => `<line x1="480" y1="${i * 100 + 40}" x2="1120" y2="${i * 100 + 40}" stroke="rgba(255,255,255,0.035)"/>`).join('')}` +
      // the door
      P.door(800, 300, 240, 460, '#2a2030', glow) +
      `${[0, 1, 2, 3].map(i => `<rect x="700" y="${400 + i * 80}" width="200" height="10" fill="#3a3040"/>`).join('')}` +
      // The arch over the door: three carvings, worn past reading. The Hearth shows the recesses and the
      // wear; WHICH three shapes they are is on the Reader's page, and their order is nobody's but the ward's.
      `<g transform="translate(800,238)">` +
        `<path d="M-160,40 A160,160 0 0 1 160,40" fill="none" stroke="#3a3040" stroke-width="9"/>` +
        `<path d="M-160,40 A160,160 0 0 1 160,40" fill="none" stroke="#4a3f52" stroke-width="2" opacity=".5"/>` +
        [[-108, 22], [0, -18], [108, 22]].map(([dx, dy]) =>
          `<g transform="translate(${dx},${dy})">` +
            `<ellipse rx="24" ry="27" fill="#0d0a12" opacity=".9"/>` +
            [0, 1, 2].map(k => `<path d="M${-14 + k * 6},${-16 + k * 7} L${12 - k * 5},${11 - k * 6}" stroke="#6a5a4a" stroke-width="2.5" stroke-linecap="round" opacity="${(0.45 - k * 0.1).toFixed(2)}"/>`).join('') +
          `</g>`).join('') +
      `</g>` +
      // torches either side
      P.torch(560, 380, 1.1) + P.torch(1040, 380, 1.1) +
      P.floorTiles(760, '#0b090f', 'rgba(255,255,255,0.03)') +
      // soldiers: a line of silhouettes with spears, and a captain forward
      `${[0, 1, 2, 3, 4].map(i => `<g transform="translate(${1180 + i * 80},${820 - i * 10})"><line x1="22" y1="-150" x2="22" y2="0" stroke="#0e0b12" stroke-width="5"/></g>`).join('')}` +
      P.figures([{ x: 1180, s: 1.05, color: '#0e0b12' }, { x: 1260, s: 1.0, color: '#0e0b12' }, { x: 1340, s: 0.95, color: '#0e0b12' }, { x: 1420, s: 0.9, color: '#0e0b12' }], 820, '#0e0b12') +
      P.figures([{ x: 1040, s: 1.15, color: '#0c0a10' }], 830, '#0c0a10') +
      // the four and Wren on the near side
      P.figures([{ x: 300, s: 1.0 }, { x: 380, s: 1.0 }, { x: 460, s: 1.0 }, { x: 540, s: 1.0 }], 840, '#0a0810') +
      P.figures([{ x: 640, s: 0.8, color: '#130f16' }], 830, '#130f16') +
      P.fog(520, 380, '#1a1420', 0.4)
    );
  });
})();
