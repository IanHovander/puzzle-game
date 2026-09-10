/* Art — Chapter IV: The Oath (the Provost's study, the false shelf, the tapestry, the oath scroll) */
(function () {
  'use strict';
  const A = window.VigilArt, P = A.P, W = A.W, H = A.H;
  const G = () => window.VigilGlyphs;

  /* ---------- shared pieces ---------- */
  // A bookcase: x,y,w,h with n shelves of little books. seed for colours.
  function bookcase(x, y, w, h, shelves, seed, opts) {
    opts = opts || {};
    const r = A.rng(seed || 17);
    const cols = ['#3a2a22', '#2e2a3a', '#4a2f22', '#2a3a30', '#3d2e2e', '#33302a', '#4a3a24', '#2b2b3b'];
    let s = `<rect x="${x}" y="${y}" width="${w}" height="${h}" fill="#120e0c"/><rect x="${x}" y="${y}" width="${w}" height="${h}" fill="none" stroke="#2c211a" stroke-width="10"/>`;
    const sh = h / shelves;
    for (let i = 0; i < shelves; i++) {
      const sy = y + (i + 1) * sh;
      s += `<rect x="${x}" y="${sy - 8}" width="${w}" height="8" fill="#2c211a"/>`;
      if (opts.skip === i) continue;
      let bx = x + 10;
      while (bx < x + w - 24) {
        const bw = 14 + Math.floor(r() * 22), bh = sh * (0.55 + r() * 0.35);
        s += `<rect x="${bx.toFixed(0)}" y="${(sy - 8 - bh).toFixed(0)}" width="${bw}" height="${bh.toFixed(0)}" fill="${cols[Math.floor(r() * cols.length)]}" opacity=".9"/>`;
        if (r() > 0.6) s += `<rect x="${(bx + 3).toFixed(0)}" y="${(sy - 8 - bh + 10).toFixed(0)}" width="${bw - 6}" height="3" fill="rgba(212,169,78,0.35)"/>`;
        bx += bw + 2 + Math.floor(r() * 4);
      }
    }
    return s;
  }

  // Small hearth fire in a grate (uses A.fire from ch0 if present).
  function grateFire(x, base, sc, blue) {
    if (A.fire) return A.fire(x, base, sc, blue);
    return `<ellipse cx="${x}" cy="${base - 30 * sc}" rx="${60 * sc}" ry="${70 * sc}" fill="#ff9a3c" opacity=".8"/>`;
  }

  // Four figures walking into a flame; the fourth hand holds an inverted flame (the Founders, as the tapestry truly shows them).
  function foundersWalking(x, y, w, h, opts) {
    opts = opts || {};
    const ink = opts.ink || '#0d0a0a', warm = opts.warm || '#c9863a', cold = opts.cold || '#4fb3bf';
    let s = `<g transform="translate(${x},${y})">`;
    s += `<rect width="${w}" height="${h}" fill="${opts.bg || '#6a4a2c'}"/>`;
    // the flame at the right
    const fx = w * 0.82, fb = h * 0.86;
    for (let i = 0; i < 5; i++) { const dx = (i - 2) * w * 0.035, fh = h * (0.45 + (i % 2) * 0.18 - Math.abs(i - 2) * 0.08); s += `<path d="M${fx + dx - w * 0.04},${fb} C${fx + dx - w * 0.05},${fb - fh * 0.4} ${fx + dx - w * 0.015},${fb - fh * 0.6} ${fx + dx},${fb - fh} C${fx + dx + w * 0.015},${fb - fh * 0.6} ${fx + dx + w * 0.05},${fb - fh * 0.4} ${fx + dx + w * 0.04},${fb} Z" fill="${warm}" opacity=".85"/>`; }
    s += `<circle cx="${fx}" cy="${fb - h * 0.3}" r="${w * 0.2}" fill="${warm}" opacity=".15"/>`;
    // four figures, walking right
    for (let i = 0; i < 4; i++) {
      const px = w * (0.14 + i * 0.16), pb = fb, sc = h / 300;
      s += `<g transform="translate(${px},${pb}) scale(${sc})">`;
      s += `<path d="M-16,0 L-11,-80 L11,-80 L16,0 Z" fill="${ink}"/><circle cx="${i === 1 ? -4 : 0}" cy="-94" r="13" fill="${ink}"/>`;
      /* The second has turned: her arm goes back the way they came, for something that is not there.
         The fourth carries the cold glyph. Those two figures are the whole of the Seer's corner in
         ch4_secrets -- the count is not asked for, because the Hearth printed it in Chapter II. */
      s += i === 1
        ? `<path d="M-10,-72 L-34,-52" stroke="${ink}" stroke-width="8" stroke-linecap="round"/>`
        : `<path d="M10,-72 L34,-52" stroke="${ink}" stroke-width="8" stroke-linecap="round"/>`;
      if (i === 3) s += `<g transform="translate(46,-56) scale(1.4)" style="color:${cold}">${G().shapeInner('Flame', true)}</g>`;
      s += `</g>`;
    }
    // shadows away from the fire
    for (let i = 0; i < 4; i++) { const px = w * (0.14 + i * 0.16); s += `<path d="M${px - 6},${fb} L${px - w * 0.11},${fb + h * 0.06} L${px + 8},${fb} Z" fill="${ink}" opacity=".35"/>`; }
    // No caption: how many walk into the fire is the Seer's count, and the Hearth may not stamp it.
    return s + '</g>';
  }
  // The Order's overpaint: a great hall, a fire, one small figure walking in alone.
  function orderPaint(x, y, w, h) {
    let s = `<g transform="translate(${x},${y})"><rect width="${w}" height="${h}" fill="#2a1c14"/>`;
    s += `<path d="M${w * 0.1},${h} L${w * 0.1},${h * 0.35} A${w * 0.4},${h * 0.35} 0 0 1 ${w * 0.9},${h * 0.35} L${w * 0.9},${h} Z" fill="#1c130e"/>`;
    for (let i = 0; i < 6; i++) s += `<rect x="${w * (0.14 + i * 0.13)}" y="${h * 0.3}" width="${w * 0.02}" height="${h * 0.6}" fill="#0f0a08"/>`;
    const fx = w * 0.7, fb = h * 0.86;
    for (let i = 0; i < 3; i++) { const dx = (i - 1) * w * 0.03, fh = h * (0.28 + (i % 2) * 0.1); s += `<path d="M${fx + dx - w * 0.03},${fb} C${fx + dx - w * 0.04},${fb - fh * 0.4} ${fx + dx - w * 0.01},${fb - fh * 0.6} ${fx + dx},${fb - fh} C${fx + dx + w * 0.01},${fb - fh * 0.6} ${fx + dx + w * 0.04},${fb - fh * 0.4} ${fx + dx + w * 0.03},${fb} Z" fill="#b8702e" opacity=".85"/>`; }
    const sc = h / 380;
    s += `<g transform="translate(${w * 0.42},${fb}) scale(${sc})"><path d="M-10,0 L-7,-52 L7,-52 L10,0 Z" fill="#0d0a0a"/><circle cx="0" cy="-62" r="9" fill="#0d0a0a"/></g>`;
    return s + '</g>';
  }
  A.ch4 = { foundersWalking, orderPaint, bookcase };

  /* ---------- the Provost's study ---------- */
  A.define('ch4_study', (p) => {
    p = p || {};
    let s = P.sky('#0c0a10', '#1b1410');
    s += `<rect x="0" y="100" width="${W}" height="620" fill="#1a1410"/>`;
    s += `<rect x="0" y="100" width="${W}" height="620" fill="url(#ch4wall)"/><defs><linearGradient id="ch4wall" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stop-color="#000" stop-opacity=".5"/><stop offset=".5" stop-color="#000" stop-opacity="0"/><stop offset="1" stop-color="#000" stop-opacity=".45"/></linearGradient></defs>`;
    // bookcases
    s += bookcase(40, 120, 380, 580, 4, 17);
    // tapestry
    s += `<rect x="470" y="140" width="560" height="400" fill="#3a2a1a"/>`;
    s += p.scraped ? foundersWalking(486, 156, 528, 368, { caption: false }) : orderPaint(486, 156, 528, 368);
    s += `<rect x="470" y="140" width="560" height="400" fill="none" stroke="#5a4020" stroke-width="6"/>`;
    s += `<rect x="440" y="120" width="620" height="16" rx="6" fill="#4a3620"/>`;
    // fireplace and mantel with the memory-bell
    s += `<rect x="1090" y="360" width="240" height="340" fill="#241a14"/><rect x="1120" y="420" width="180" height="280" rx="70" fill="#0a0708"/>`;
    s += grateFire(1210, 700, 0.42, false);
    s += `<rect x="1070" y="350" width="280" height="16" fill="#3a2a1a"/>`;
    s += `<g transform="translate(1290,344)"><path d="M-14,0 L-14,-10 Q-14,-30 0,-32 Q14,-30 14,-10 L14,0 Z" fill="#8a7040"/><circle cx="0" cy="4" r="3" fill="#c9a85a"/></g>`;
    // Marrow's chair
    s += `<g transform="translate(1440,700)"><rect x="-70" y="-170" width="140" height="170" rx="18" fill="#1c1418"/><rect x="-82" y="-110" width="24" height="110" rx="8" fill="#241a1e"/><rect x="58" y="-110" width="24" height="110" rx="8" fill="#241a1e"/><rect x="-60" y="-60" width="120" height="60" rx="8" fill="#2a1e24"/></g>`;
    // desk with the primer
    s += `<rect x="540" y="600" width="520" height="22" rx="4" fill="#2c1e14"/><rect x="560" y="622" width="26" height="90" fill="#221810"/><rect x="1014" y="622" width="26" height="90" fill="#221810"/>`;
    s += `<g transform="translate(700,598)"><path d="M-70,0 L-4,-8 L0,0 L4,-8 L70,0 Z" fill="#d9cba8"/><path d="M-70,0 L-4,-8 L0,0 Z" fill="#c9b890"/></g>`;
    s += `<rect x="820" y="586" width="110" height="14" rx="2" fill="#3a2a30"/><rect x="826" y="578" width="98" height="8" rx="2" fill="#4a3838"/>`;
    s += P.torch(980, 560, 0.7);
    s += `<circle cx="700" cy="590" r="120" fill="#ffd27a" opacity=".07"><animate attributeName="opacity" values=".07;.11;.06;.09;.07" dur="3s" repeatCount="indefinite"/></circle>`;
    s += P.floorTiles(700, '#0d0b0c', 'rgba(255,255,255,0.03)');
    s += P.fog(520, 300, '#2a1a12', 0.28);
    return P.wrap(s);
  });

  /* ---------- the false shelf (close-up of the bookcase; shelf 3 holds eight great books) ---------- */
  A.define('ch4_shelf', (p) => {
    p = p || {};
    let s = P.sky('#0c0a10', '#150f0c');
    s += `<rect x="120" y="60" width="1360" height="720" fill="#120e0c"/><rect x="120" y="60" width="1360" height="720" fill="none" stroke="#2c211a" stroke-width="14"/>`;
    // shelves 1,2,4 with small books; shelf 3 is the false one
    const r = A.rng(23); const cols = ['#3a2a22', '#2e2a3a', '#4a2f22', '#2a3a30', '#3d2e2e', '#33302a'];
    [1, 2, 4].forEach(i => { const sy = 60 + i * 180; s += `<rect x="120" y="${sy - 10}" width="1360" height="10" fill="#2c211a"/>`; let bx = 140; while (bx < 1450) { const bw = 16 + Math.floor(r() * 26), bh = 90 + r() * 60; s += `<rect x="${bx}" y="${(sy - 10 - bh).toFixed(0)}" width="${bw}" height="${bh.toFixed(0)}" fill="${cols[Math.floor(r() * cols.length)]}"/>`; bx += bw + 2 + Math.floor(r() * 5); } });
    const sy = 60 + 3 * 180; s += `<rect x="120" y="${sy - 10}" width="1360" height="10" fill="#2c211a"/>`;
    if (p.open) s += `<rect x="150" y="${sy - 170}" width="1300" height="160" fill="#06050a"/><rect x="150" y="${sy - 170}" width="1300" height="160" fill="url(#ch4cab)"/><defs><radialGradient id="ch4cab" cx=".5" cy=".5" r=".6"><stop offset="0" stop-color="#ffd27a" stop-opacity=".25"/><stop offset="1" stop-color="#000" stop-opacity="0"/></radialGradient></defs>`;
    /* Six great books. Every stamp is rubbed past reading here and clean only on the Reader's page:
       the Hearth may show the wear, never the word. The four lifted when the shelf is open are the
       answer's places, 2, 5, 4 and 1 (indices 1, 4, 3, 0). */
    const bcol = ['#4a2f22', '#2e2a3a', '#3a3222', '#2a3a30', '#3d2e2e', '#33302a'];
    const pulled = [1, 4, 3, 0];
    for (let i = 0; i < 6; i++) {
      const bx = 210 + i * 190, bw = 140, bh = 150;
      const y0 = sy - 10 - bh + (p.open && pulled.indexOf(i) >= 0 ? -14 : 0);
      s += `<rect x="${bx}" y="${y0}" width="${bw}" height="${bh}" rx="4" fill="${bcol[i]}" stroke="rgba(212,169,78,0.25)" stroke-width="2"/>`;
      s += `<rect x="${bx + 10}" y="${y0 + 14}" width="${bw - 20}" height="4" fill="rgba(212,169,78,0.35)"/><rect x="${bx + 10}" y="${y0 + bh - 18}" width="${bw - 20}" height="4" fill="rgba(212,169,78,0.35)"/>`;
      s += `<g transform="translate(${bx + bw / 2},${y0 + bh / 2})" fill="none" stroke="#8a7040" opacity=".55">`
         + `<ellipse rx="30" ry="30" stroke-width="2.5" stroke-dasharray="4 7"/>`
         + `<path d="M-13,8 L-4,-9 M3,-8 L11,6" stroke-width="3" stroke-linecap="round"/></g>`;
      s += `<text x="${bx + bw / 2}" y="${y0 + bh + 26}" text-anchor="middle" fill="rgba(233,226,210,0.4)" font-size="16" font-family="Cinzel,serif">${i + 1}</text>`;
    }
    s += `<rect x="0" y="780" width="${W}" height="120" fill="#0d0b0c"/>`;
    s += P.fog(560, 340, '#1a120c', 0.35);
    return P.wrap(s);
  });

  /* ---------- the tapestry, close ---------- */
  A.define('ch4_tapestry', (p) => {
    p = p || {};
    let s = P.sky('#0c0a10', '#1a1410');
    s += `<rect x="0" y="100" width="${W}" height="620" fill="#1a1410"/>`;
    s += `<rect x="160" y="90" width="1280" height="640" fill="#3a2a1a"/>`;
    s += p.scraped ? foundersWalking(180, 110, 1240, 600, {}) : orderPaint(180, 110, 1240, 600);
    s += `<rect x="160" y="90" width="1280" height="640" fill="none" stroke="#5a4020" stroke-width="8"/>`;
    s += `<rect x="130" y="70" width="1340" height="18" rx="8" fill="#4a3620"/>`;
    s += P.floorTiles(730, '#0d0b0c', 'rgba(255,255,255,0.03)');
    s += P.fog(560, 300, '#1a120c', 0.3);
    return P.wrap(s);
  });

  /* ---------- the oath scroll on the desk ---------- */
  A.define('ch4_scroll', (p) => {
    p = p || {};
    let s = P.sky('#0c0a10', '#1b1410');
    s += `<rect x="0" y="0" width="${W}" height="${H}" fill="#1a1410"/>`;
    s += `<rect x="0" y="380" width="${W}" height="520" fill="#2c1e14"/>`;
    s += `<rect x="0" y="380" width="${W}" height="520" fill="url(#ch4desk)"/><defs><radialGradient id="ch4desk" cx=".5" cy=".3" r=".7"><stop offset="0" stop-color="#ffd27a" stop-opacity=".18"/><stop offset="1" stop-color="#000" stop-opacity=".6"/></radialGradient></defs>`;
    // the scroll
    s += `<g transform="translate(800,560)">`;
    s += `<rect x="-420" y="-200" width="840" height="400" rx="10" fill="#d9cba8"/><rect x="-440" y="-214" width="40" height="428" rx="18" fill="#b8a880"/><rect x="400" y="-214" width="40" height="428" rx="18" fill="#b8a880"/>`;
    /* The heading is a rubbed cartouche, not a title: the scroll is allowed to show that something was
       named at the top of it, and not to name it. Painting a title here put two proper nouns on a
       puzzle surface and stamped a word the chapter no longer says. */
    s += `<g transform="translate(0,-118)" fill="none" stroke="#8a7a5a" opacity=".75">`
      + `<rect x="-210" y="-30" width="420" height="60" rx="14" stroke-width="2.5"/>`
      + [0, 1, 2, 3, 4].map(i => `<path d="M${-168 + i * 76},6 h44" stroke-width="9" stroke-linecap="round" opacity="${(0.30 + (i % 2) * 0.12).toFixed(2)}"/>`).join('')
      + [0, 1, 2, 3].map(i => `<path d="M${-140 + i * 80},-14 h56" stroke-width="7" stroke-linecap="round" opacity="${(0.22 + (i % 2) * 0.10).toFixed(2)}"/>`).join('')
      + `</g>`;
    // four faint slots in a ring, the inscription above
    s += `<circle cx="0" cy="50" r="90" fill="none" stroke="#8a7a5a" stroke-width="2" opacity=".7"/>`;
    for (let i = 0; i < 4; i++) { const a = (i / 4 * 360 - 90) * Math.PI / 180; s += `<circle cx="${(Math.cos(a) * 90).toFixed(1)}" cy="${(50 + Math.sin(a) * 90).toFixed(1)}" r="20" fill="none" stroke="#8a7a5a" stroke-width="2" opacity=".7"/>`; }
    /* Three worn places and one empty. What was cut there is on the Reader's page; the scroll shows
       only that something was cut, which is what "worn nearly smooth" has to look like. */
    s += `<g transform="translate(-300,40)" fill="none" stroke="#8a7a5a" opacity=".6">`
      + [0, 1, 2].map(i => `<g transform="translate(${i * 60},0)"><ellipse rx="24" ry="24" stroke-width="2" stroke-dasharray="3 6"/><path d="M-9,7 L-2,-8 M4,-6 L9,4" stroke-width="2.5" stroke-linecap="round"/></g>`).join('')
      + `<rect x="150" y="-26" width="52" height="52" rx="6" stroke-dasharray="6 5"/></g>`;
    // the Chair's seal — CROWN in red wax
    s += `<g transform="translate(300,80)"><circle r="54" fill="#8a2a2a"/><circle r="54" fill="none" stroke="#5a1a1a" stroke-width="4"/><g transform="scale(1.8)" style="color:#f0c8a0" opacity=".9">${G().shapeInner('Crown', false)}</g></g>`;
    s += `</g>`;
    s += P.torch(300, 380, 0.9) + P.torch(1300, 380, 0.9);
    s += `<circle cx="800" cy="560" r="420" fill="#ffd27a" opacity=".05"><animate attributeName="opacity" values=".05;.08;.04;.07;.05" dur="2.6s" repeatCount="indefinite"/></circle>`;
    return P.wrap(s);
  });
})();
