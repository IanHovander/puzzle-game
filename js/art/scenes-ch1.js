/* Art — Chapter I: The Vigil (the Great Hall, the dais, the Envoy's entrance, the passage) */
(function () {
  'use strict';
  const A = window.VigilArt, P = A.P, W = A.W, H = A.H;

  /* The nine Houses of the Marches, sunwise from the Chair (seat 9). Shared with the Hearth chapter via A.ch1;
     the Companion carries its own copy of this table (js/content/companion/ch1.js) — keep the two identical. */
  const HOUSES = [
    { n: 1, house: 'Harrowden', color: '#3f7a4a', sym: 'chevron' },
    { n: 2, house: 'Ossery',    color: '#8c93a6', sym: 'crescent' },
    { n: 3, house: 'Dunmere',   color: '#4a5f8a', sym: 'tower' },
    { n: 4, house: 'Fellwood',  color: '#2f5a3a', sym: 'tree' },
    { n: 5, house: 'Goldmarch', color: '#b8892e', sym: 'sun' },
    { n: 6, house: 'Redmoor',   color: '#8a2f2f', sym: 'wave' },
    { n: 7, house: 'Sable',     color: '#5a3f8a', sym: 'stars' },
    { n: 8, house: 'Wyeburn',   color: '#8a6a3a', sym: 'key' },
    { n: 9, house: 'the Chair', color: '#2a2434', sym: 'crown' },
  ];
  const st = 'fill="none" stroke="#f4ecd8" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"';
  function emblem(sym) {
    switch (sym) {
      case 'chevron': return `<path d="M9,27 L20,12 L31,27" ${st}/><path d="M13,31 L20,22 L27,31" ${st}/>`;
      case 'crescent': return `<path d="M25,9 A11,11 0 1 0 25,31 A8.5,8.5 0 1 1 25,9 Z" fill="#f4ecd8"/>`;
      case 'tower': return `<path d="M13,31 V14 H27 V31 Z M11,14 V9 H15 V14 M18,14 V9 H22 V14 M25,14 V9 H29 V14" ${st}/><path d="M18,31 V24 H22 V31" ${st}/>`;
      case 'tree': return `<path d="M20,7 L28,17 L24,17 L30,25 L25,25 L31,32 L9,32 L15,25 L10,25 L16,17 L12,17 Z" fill="#f4ecd8"/>`;
      case 'sun': return `<circle cx="20" cy="20" r="6" fill="#f4ecd8"/>${[0, 45, 90, 135, 180, 225, 270, 315].map(a => `<path d="M20,20 m${(Math.cos(a * Math.PI / 180) * 9).toFixed(1)},${(Math.sin(a * Math.PI / 180) * 9).toFixed(1)} l${(Math.cos(a * Math.PI / 180) * 5).toFixed(1)},${(Math.sin(a * Math.PI / 180) * 5).toFixed(1)}" ${st}/>`).join('')}`;
      case 'wave': return `<path d="M8,17 C12,12 16,12 20,17 C24,22 28,22 32,17" ${st}/><path d="M8,26 C12,21 16,21 20,26 C24,31 28,31 32,26" ${st}/>`;
      case 'stars': { const s = (x, y, r) => { let d = ''; for (let i = 0; i < 10; i++) { const a = -Math.PI / 2 + i * Math.PI / 5, rr = i % 2 ? r * 0.45 : r; d += (i ? 'L' : 'M') + (x + Math.cos(a) * rr).toFixed(1) + ',' + (y + Math.sin(a) * rr).toFixed(1); } return `<path d="${d}Z" fill="#f4ecd8"/>`; }; return s(20, 12, 5) + s(12, 26, 5) + s(28, 26, 5); }
      case 'key': return `<circle cx="14" cy="16" r="5.5" ${st}/><path d="M18,20 L30,32 M26,28 L29,25 M23,25 L26,22" ${st}/>`;
      case 'crown': return `<g transform="translate(20,21) scale(0.9)" style="color:#f4ecd8">${window.VigilGlyphs.shapeInner('Crown', false)}</g>`;
    }
    return '';
  }
  /* Small banner (shield) for the seats widget and phone lists. */
  function banner(h, size) {
    return `<svg viewBox="0 0 40 40" width="${size || 26}" height="${size || 26}" style="display:block"><path d="M5,3 H35 V28 L20,38 L5,28 Z" fill="${h.color}" stroke="rgba(244,236,216,0.5)" stroke-width="1.5"/>${emblem(h.sym)}</svg>`;
  }
  /* Tall hanging banner for scenes. */
  function hanging(h, x, y, w, l, dim) {
    const op = dim ? 0.55 : 0.9;
    return `<g transform="translate(${x},${y})" opacity="${op}"><rect x="${-w / 2 - 8}" y="-6" width="${w + 16}" height="10" rx="3" fill="#3a2f28"/><path d="M${-w / 2},0 H${w / 2} V${l - w * 0.4} L0,${l} L${-w / 2},${l - w * 0.4} Z" fill="${h.color}"/><path d="M${-w / 2},0 H${w / 2} V${l - w * 0.4} L0,${l} L${-w / 2},${l - w * 0.4} Z" fill="url(#bannerShade)"/><g transform="translate(${-w * 0.35},${l * 0.28}) scale(${w * 0.7 / 40})">${emblem(h.sym)}</g></g>`;
  }
  const bannerDefs = `<defs><linearGradient id="bannerShade" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stop-color="#000" stop-opacity=".35"/><stop offset=".5" stop-color="#000" stop-opacity="0"/><stop offset="1" stop-color="#000" stop-opacity=".45"/></linearGradient></defs>`;
  A.ch1 = { HOUSES, emblem, banner, hanging };

  /* Nine banners in perspective along both walls, the Chair's at the far end. */
  function bannerRow(dim) {
    let s = bannerDefs;
    // left wall: seats 1-4 nearest first; right wall: 8-5; the Chair's over the Hearth
    const left = [0, 1, 2, 3], right = [7, 6, 5, 4];
    left.forEach((k, i) => { const t = i / 3; s += hanging(HOUSES[k], 140 + t * 330, 90 + t * 60, 120 - t * 55, 300 - t * 150, dim); });
    right.forEach((k, i) => { const t = i / 3; s += hanging(HOUSES[k], 1460 - t * 330, 90 + t * 60, 120 - t * 55, 300 - t * 150, dim); });
    s += hanging(HOUSES[8], 800, 60, 70, 150, dim);
    return s;
  }
  function masters() {
    const list = [];
    for (let i = 0; i < 4; i++) { const t = i / 3; list.push({ x: 300 + t * 200, s: 0.9 - t * 0.35 }); list.push({ x: 1300 - t * 200, s: 0.9 - t * 0.35 }); }
    return P.figures(list.map(f => ({ x: f.x, s: f.s })), 700, '#0c0a12');
  }

  A.define('ch1_hall', () => P.wrap(
    P.sky('#07060c', '#1a120e') +
    `<rect x="0" y="0" width="${W}" height="560" fill="#0b0912"/>` +
    P.pillars(8, 720, 640, '#0a0810') +
    // far wall and the Hearth's arch
    `<rect x="560" y="300" width="480" height="420" fill="#120d12"/><path d="M560,300 A240,240 0 0 1 1040,300" fill="#120d12"/>` +
    `<rect x="640" y="240" width="320" height="70" rx="4" fill="#211a20" stroke="#3a2c2c" stroke-width="3"/>` +
    `<g opacity=".55">${[0, 1, 2, 3, 4, 5, 6, 7].map(i => `<g transform="translate(${670 + i * 37},275) scale(0.8)" style="color:#7a6a5a">${window.VigilGlyphs.shapeInner(['Flame', 'Flame', 'Crown', 'Hook', 'Spike', 'Flame', 'Crown', 'Hook'][i], [false, true, false, false, false, true, true, true][i])}</g>`).join('')}</g>` +
    A.fire(800, 700, 0.62, false) +
    bannerRow(false) +
    P.floorTiles(720, '#0b0910', 'rgba(255,255,255,0.04)') +
    // long tables
    `<rect x="120" y="740" width="520" height="14" fill="#1c1510"/><rect x="960" y="740" width="520" height="14" fill="#1c1510"/>` +
    masters() +
    P.torch(90, 420, 1.1) + P.torch(1510, 420, 1.1) +
    P.fog(560, 340, '#2a1a12', 0.35)
  ));

  A.define('ch1_dais', () => P.wrap(
    P.sky('#07060c', '#17100d') +
    `<rect x="0" y="0" width="${W}" height="560" fill="#0b0912"/>` +
    P.pillars(6, 720, 640, '#0a0810') +
    bannerRow(true) +
    // the glow of the Hearth from behind the dais
    `<circle cx="800" cy="560" r="420" fill="#ff9a3c" opacity=".08"><animate attributeName="opacity" values=".08;.12;.07;.1;.08" dur="2.6s" repeatCount="indefinite"/></circle>` +
    // dais: three steps
    `<rect x="380" y="640" width="840" height="30" rx="4" fill="#1e1712"/><rect x="440" y="610" width="720" height="34" rx="4" fill="#251c15"/><rect x="500" y="580" width="600" height="34" rx="4" fill="#2c221a"/>` +
    // Marrow (tall, still) and Wren (small, on the mark)
    `<g transform="translate(700,580)"><ellipse cx="0" cy="-6" rx="24" ry="8" fill="#000" opacity=".35"/><path d="M-22,0 L-16,-150 L16,-150 L22,0 Z" fill="#0c0a12"/><circle cx="0" cy="-166" r="15" fill="#0c0a12"/><path d="M-16,-150 L-22,0" stroke="#3a2a22" stroke-width="1.5"/></g>` +
    `<g transform="translate(860,580)"><ellipse cx="0" cy="-4" rx="18" ry="6" fill="#000" opacity=".35"/><path d="M-12,0 L-9,-92 L9,-92 L12,0 Z" fill="#0c0a12"/><circle cx="0" cy="-104" r="12" fill="#0c0a12"/><path d="M9,-92 L12,0" stroke="#ff9a3c" stroke-width="1.5" opacity=".6"/></g>` +
    // a circle cut into the dais where the child stands
    `<ellipse cx="860" cy="596" rx="60" ry="10" fill="none" stroke="rgba(212,169,78,0.35)" stroke-width="2"/>` +
    P.floorTiles(720, '#0b0910', 'rgba(255,255,255,0.04)') +
    P.torch(300, 480, 1) + P.torch(1300, 480, 1) +
    P.fog(600, 300, '#2a1a12', 0.3)
  ));

  A.define('ch1_vane', () => P.wrap(
    P.sky('#07060c', '#100c12') +
    `<rect x="0" y="0" width="${W}" height="560" fill="#0b0912"/>` +
    P.pillars(6, 720, 640, '#0a0810') +
    bannerRow(true) +
    // the great doors, open; night and moonlight beyond
    `<path d="M600,720 L600,300 A200,200 0 0 1 1000,300 L1000,720 Z" fill="#dcd6c8" opacity=".12"/>` +
    `<path d="M610,720 L610,305 A190,190 0 0 1 990,305 L990,720 Z" fill="#0d1018"/>` +
    P.stars(40, 31, 420).replace('<g class="stars">', '<g class="stars" clip-path="inset(0 610px 0 610px)">') +
    P.lightBeam(800, 320, 700, 620, '#dcd6c8') +
    // door leaves swung inward
    `<path d="M600,300 L520,330 L520,760 L600,720 Z" fill="#241a12"/><path d="M1000,300 L1080,330 L1080,760 L1000,720 Z" fill="#241a12"/>` +
    // soldiers in rows, then the Envoy
    P.figures([{ x: 660, s: 0.7 }, { x: 720, s: 0.72 }, { x: 880, s: 0.72 }, { x: 940, s: 0.7 }, { x: 690, s: 0.8 }, { x: 910, s: 0.8 }], 700, '#0a0910') +
    `${[660, 720, 880, 940].map(x => `<line x1="${x + 14}" y1="700" x2="${x + 14}" y2="590" stroke="#3a3540" stroke-width="3"/>`).join('')}` +
    `<g transform="translate(800,730)"><ellipse cx="0" cy="-6" rx="26" ry="8" fill="#000" opacity=".4"/><path d="M-20,0 L-14,-140 L14,-140 L20,0 Z" fill="#2a2a30"/><circle cx="0" cy="-156" r="14" fill="#1a1a20"/><path d="M-20,0 L-28,-30 L-14,-140" fill="#2a2a30"/><path d="M14,-140 L28,-30 L20,0" fill="#2a2a30"/><rect x="-6" y="-100" width="12" height="40" rx="2" fill="#c9a85a" opacity=".8"/><circle cx="0" cy="-80" r="7" fill="#8a2f2f"/></g>` +
    P.floorTiles(720, '#0b0910', 'rgba(255,255,255,0.04)') +
    P.fog(560, 340, '#1a1a24', 0.35)
  ));

  A.define('ch1_passage', () => P.wrap(
    P.sky('#06050a', '#120d10') +
    // a narrow vaulted passage
    `<path d="M300,900 L300,420 A500,500 0 0 1 1300,420 L1300,900 Z" fill="#100c12"/>` +
    `<path d="M480,900 L480,520 A320,320 0 0 1 1120,520 L1120,900 Z" fill="#0a0810"/>` +
    `<path d="M620,900 L620,600 A180,180 0 0 1 980,600 L980,900 Z" fill="#06050a"/>` +
    P.torch(700, 250, 1.4) +
    // soldiers' shadows down the passage, and the Envoy in the light
    P.figures([{ x: 1180, s: 0.6, color: '#08070c' }, { x: 1300, s: 0.6, color: '#08070c' }], 470, '#08070c') +
    `<g transform="translate(980,480)"><ellipse cx="0" cy="-6" rx="30" ry="9" fill="#000" opacity=".4"/><path d="M-22,0 L-16,-160 L16,-160 L22,0 Z" fill="#26262c"/><circle cx="0" cy="-178" r="16" fill="#18181e"/><path d="M-16,-160 L-22,0" stroke="#ffb86a" stroke-width="2" opacity=".5"/><rect x="-6" y="-110" width="12" height="44" rx="2" fill="#c9a85a" opacity=".7"/></g>` +
    P.floorTiles(800, '#0a0810', 'rgba(255,255,255,0.03)') +
    P.fog(500, 400, '#1a1410', 0.4)
  ));
})();
