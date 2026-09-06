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
    P.circleRunes(800, 255, 46, 10, 'rgba(212,169,78,0.35)', 3) +
    fire(800, 760, 1, false) +
    P.floorTiles(760, '#0b0910', 'rgba(255,255,255,0.04)') +
    P.fog(600, 300, '#2a1a12', 0.35)
  ));

  A.define('ch0_stone', () => P.wrap(
    P.sky('#0a0810', '#1a0f0a') +
    `<rect x="380" y="120" width="840" height="300" rx="6" fill="#1d1619" stroke="#3a2c2c" stroke-width="4"/>` +
    `<g opacity=".9">${[0, 1, 2, 3, 4, 5, 6, 7].map(i => `<g transform="translate(${470 + i * 94},250) scale(1.9)" style="color:#7a6a5a">${window.VigilGlyphs.shapeInner(['Flame', 'Flame', 'Crown', 'Hook', 'Spike', 'Flame', 'Crown', 'Hook'][i], [false, true, false, false, false, true, true, true][i])}</g>`).join('')}</g>` +
    `<text x="800" y="380" text-anchor="middle" fill="rgba(233,226,210,0.45)" font-size="22" font-family="Cinzel,serif" letter-spacing="6">THE ORDER'S READING</text>` +
    fire(800, 900, 1.6, false) +
    `<rect x="0" y="520" width="${W}" height="${H - 520}" fill="url(#stonefog)"/><defs><linearGradient id="stonefog" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#ff9a3c" stop-opacity="0"/><stop offset="1" stop-color="#ff9a3c" stop-opacity=".55"/></linearGradient></defs>`
  ));

  A.define('ch0_dorm', () => P.wrap(
    P.sky('#0b0a12', '#15121d') +
    // window with stars
    `<rect x="1180" y="120" width="260" height="360" rx="130" fill="#070812"/>` + `<g clip-path="inset(0)">${P.stars(60, 12, 480).replace(/<circle /g, '<circle transform="translate(1180,120) scale(0.16,0.4)" ')}</g>` +
    `<rect x="1180" y="120" width="260" height="360" rx="130" fill="none" stroke="#2a2438" stroke-width="10"/>` +
    // beds
    `${[0, 1, 2, 3].map(i => `<g transform="translate(${140 + i * 250},640)"><rect x="0" y="0" width="200" height="90" rx="8" fill="#1b1626"/><rect x="0" y="-40" width="26" height="130" rx="4" fill="#241d33"/><rect x="174" y="-40" width="26" height="130" rx="4" fill="#241d33"/><rect x="30" y="10" width="140" height="40" rx="6" fill="#2b2340"/></g>`).join('')}` +
    // sill lamp
    `<g transform="translate(1310,500)"><rect x="-60" y="0" width="120" height="14" fill="#2a2438"/><rect x="-14" y="-70" width="28" height="70" rx="4" fill="#3a2f1a"/><circle cx="0" cy="-90" r="24" fill="#5a4a2a" stroke="#8a7040" stroke-width="3"/><circle cx="0" cy="-90" r="10" fill="#ffd27a" opacity=".55"><animate attributeName="opacity" values=".55;.2;.6;.3;.55" dur="2.4s" repeatCount="indefinite"/></circle></g>` +
    P.floorTiles(740, '#0d0b14', 'rgba(255,255,255,0.03)') +
    P.fog(560, 260, '#241d33', 0.35)
  ));

  A.define('ch0_lamp', () => P.wrap(
    P.sky('#0b0a12', '#1a1520') +
    `<rect x="0" y="600" width="${W}" height="300" fill="#100d16"/>` +
    `<g transform="translate(800,520)">` +
    `<rect x="-200" y="80" width="400" height="30" fill="#2a2438"/>` +
    `<rect x="-40" y="-120" width="80" height="200" rx="8" fill="#4a3c22" stroke="#8a7040" stroke-width="3"/>` +
    `<circle cx="0" cy="-170" r="70" fill="#5a4a2a" stroke="#8a7040" stroke-width="5"/>` +
    `<circle cx="0" cy="-170" r="46" fill="none" stroke="#c9a85a" stroke-width="3" opacity=".8"/>` +
    `${[0, 1, 2, 3].map(i => { const a = (i / 4 * 360 - 90) * Math.PI / 180; return `<circle cx="${Math.cos(a) * 46}" cy="${-170 + Math.sin(a) * 46}" r="12" fill="#2a2010" stroke="#c9a85a" stroke-width="2"/>`; }).join('')}` +
    `<circle cx="0" cy="-170" r="14" fill="#ffd27a" opacity=".5"><animate attributeName="opacity" values=".5;.2;.55;.25;.5" dur="2s" repeatCount="indefinite"/></circle>` +
    `<g transform="translate(-60,-290) scale(1.6)" style="color:#7a6a4a" opacity=".7">${window.VigilGlyphs.shapeInner('Flame', false)}</g>` +
    `<g transform="translate(60,-290) scale(1.6)" style="color:#7a6a4a" opacity=".7">${window.VigilGlyphs.shapeInner('Crown', true)}</g>` +
    `</g>` +
    P.fog(600, 300, '#241d33', 0.3)
  ));
})();
