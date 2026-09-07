/* Companion — Chapter I: The Vigil (THORN, no cast).
   One fact each, and no page holds another's: the Reader has who is pledged, the Listener who is still
   talking, the Seer who cannot be moved by anybody, the Binder who is sworn to whom. */
(function () {
  'use strict';
  const G = window.VigilGlyphs, L = window.VigilLore, CA = window.CompanionAudio, D = window.CompanionDraw;
  const C = window.CompanionContent;

  /* The nine Houses, sunwise from the Chair — a copy of the table in js/art/scenes-ch1.js (the phone does not load the art).
     The phone uses it for banners only. No page lists all nine as people. */
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
      case 'crown': return `<g transform="translate(20,21) scale(0.9)" style="color:#f4ecd8">${G.shapeInner('Crown', false)}</g>`;
    }
    return '';
  }
  const banner = (h, size) => `<svg viewBox="0 0 40 40" width="${size || 30}" height="${size || 30}" style="display:inline-block;vertical-align:middle"><path d="M5,3 H35 V28 L20,38 L5,28 Z" fill="${h.color}" stroke="rgba(244,236,216,0.5)" stroke-width="1.5"/>${emblem(h.sym)}</svg>`;
  const seatLabel = (n) => `${banner(HOUSES[n - 1], 22)} <b>Seat ${n}</b>`;

  /* Seat positions for the two pictures: a ring, the Chair (9) at the top, sunwise. */
  const ring = (cx, cy, r) => HOUSES.map((h, i) => { const a = ((i + 0.5) / 9 * 360 - 90 + 20) * Math.PI / 180; return { n: h.n, x: cx + Math.cos(a) * r, y: cy + Math.sin(a) * r }; });
  const F = 'font-family="Cinzel,serif"';

  /* ---------- Seer: three things under the Great Hall ---------- */
  const underHall = (() => {
    const seats = ring(180, 150, 82);
    let s = `<svg viewBox="0 0 360 300"><rect width="360" height="300" fill="#000"/>`;
    s += `<g stroke="#fff" fill="none" stroke-width="1.2"><rect x="10" y="10" width="340" height="280"/>`;
    s += `<path d="M150,10 L150,42 A30,30 0 0 0 210,42 L210,10"/>`;
    s += `<rect x="18" y="60" width="16" height="110" stroke-dasharray="3,3"/></g>`;
    s += `<text x="180" y="58" text-anchor="middle" fill="#fff" font-size="9" ${F}>the Hearth</text>`;
    s += `<text x="26" y="184" text-anchor="middle" fill="#a482e6" font-size="8" ${F}>the tapestry</text>`;
    s += `<text x="26" y="194" text-anchor="middle" fill="#a482e6" font-size="7" ${F}>older paint under it</text>`;
    seats.forEach(p => { s += `<circle cx="${p.x.toFixed(1)}" cy="${p.y.toFixed(1)}" r="12" fill="none" stroke="#fff" stroke-width="1.2"/><text x="${p.x.toFixed(1)}" y="${(p.y + 4).toFixed(1)}" text-anchor="middle" fill="#fff" font-size="11" ${F}>${p.n}</text>`; });
    [5, 8].forEach(n => { const p = seats[n - 1]; s += `<g transform="translate(${p.x.toFixed(1)},${(p.y + 19).toFixed(1)})"><circle r="4.5" fill="none" stroke="#a482e6" stroke-width="1.5"/></g>`; });
    const p5 = seats[4], p8 = seats[7], p6 = seats[5];
    s += `<text x="${(p5.x + 10).toFixed(1)}" y="${(p5.y + 34).toFixed(1)}" fill="#a482e6" font-size="8" ${F}>coin</text>`;
    s += `<text x="${(p8.x - 10).toFixed(1)}" y="${(p8.y + 34).toFixed(1)}" text-anchor="end" fill="#a482e6" font-size="8" ${F}>coin</text>`;
    s += `<g transform="translate(${(p6.x + 24).toFixed(1)},${(p6.y + 2).toFixed(1)})"><path d="M-4,10 L-3,-4 L3,-4 L4,10 Z M0,-4 m-3,0 a3,3 0 1 1 6,0" fill="#a482e6"/><path d="M6,-11 L6,10" stroke="#a482e6" stroke-width="1.2"/></g>`;
    s += `<text x="${(p6.x + 34).toFixed(1)}" y="${(p6.y + 6).toFixed(1)}" fill="#a482e6" font-size="8" ${F}>a soldier</text>`;
    s += `<text x="180" y="284" text-anchor="middle" fill="#fff" font-size="8" ${F} opacity=".7">the nine seats, from above</text>`;
    return s + '</svg>';
  })();

  /* ---------- Binder: the two sworn threads ---------- */
  const threadMap = (() => {
    const seats = ring(180, 150, 96);
    const P = (n) => seats[n - 1];
    let s = `<svg viewBox="0 0 360 300"><rect width="360" height="300" fill="#000"/>`;
    const draw = (a, b) => `<path d="M${a.x.toFixed(1)},${a.y.toFixed(1)} L${b.x.toFixed(1)},${b.y.toFixed(1)}" stroke="#d96b4a" stroke-width="2.5"/><circle cx="${((a.x + b.x) / 2).toFixed(1)}" cy="${((a.y + b.y) / 2).toFixed(1)}" r="3.5" fill="#d96b4a"/>`;
    s += draw(P(2), P(1)) + draw(P(4), P(6));
    seats.forEach(p => { s += `<circle cx="${p.x.toFixed(1)}" cy="${p.y.toFixed(1)}" r="13" fill="#000" stroke="#fff" stroke-width="1.2"/><text x="${p.x.toFixed(1)}" y="${(p.y + 4).toFixed(1)}" text-anchor="middle" fill="#fff" font-size="11" ${F}>${p.n}</text>`; });
    s += `<text x="180" y="284" text-anchor="middle" fill="#d96b4a" font-size="9" ${F}>red, knotted — sworn. Two threads in the whole hall.</text>`;
    return s + '</svg>';
  })();

  const murmur = (n, text, steps, base) => ({
    t: 'audio', label: `Seat ${n}`, strip: `<div class="fine">overheard: <em>"${text}"</em></div>`, button: '♪ Cup your ear',
    play: (A) => CA.playSteps(A, steps, base),
  });

  C.chapters.push({
    id: 'ch1',
    pages: (roleId, ctx) => {
      const P = { sight: [], wren: [], speak: [] };
      P.speak.push({ t: 'fine', text: 'Nothing to speak yet. The Hearth will tell you when.' });
      P.speak.push({ t: 'fine', text: '*' + L.houseRule + '*' });

      if (roleId === 'reader') {
        P.sight.push({ t: 'h', text: 'The roll, before the doors shut' });
        P.sight.push({ t: 'p', text: 'A House that already knows how it will vote files that in writing before the doors shut. You can read the roll from the back of the hall.' });
        P.sight.push({ t: 'p', text: 'Two Houses filed tonight.' });
        P.sight.push({ t: 'table', head: ['filed', 'and it says'], rows: [
          [seatLabel(9), '<b>KEEP</b> \u2014 the Chair\u2019s own hand.'],
          [seatLabel(3), '<b>KEEP</b> \u2014 two words: <em>with the Chair.</em>'],
        ] });
        P.sight.push({ t: 'p', text: 'The other seven filed nothing. Nothing filed means **SEND**, unless somebody asks them.' });
        P.sight.push({ t: 'p', text: '**So you begin with two.** Say the number out loud. You need five.' });
        P.sight.push({ t: 'fine', text: 'And Seat 3 is already yours. Whatever you hear about Seat 3 tonight, an ask spent there buys a vote you have.' });
        P.wren.push({ t: 'h', text: 'Under the paint' });
        P.wren.push({ t: 'p', text: 'The Envoy said it out loud: *under the paint.* You know every word in this hall. You have never thought of the tapestry as something with words underneath.' });
        P.wren.push({ t: 'p', text: 'And when the fire bowed, every Master watched the fire. You watched the Provost. She was watching Wren.' });
      }

      if (roleId === 'listener') {
        P.sight.push({ t: 'h', text: 'Four murmurs' });
        P.sight.push({ t: 'p', text: 'Four Masters are talking under their breath. Nobody else can hear them.' });
        P.sight.push(murmur(1, 'The child goes to the capital \u2014 unless somebody comes and asks me to my face.', [-1, 1, -2], 52));
        P.sight.push(murmur(3, 'Ask me where I stand. Go on. Ask me.', [2, -1], 50));
        P.sight.push(murmur(4, 'I vote as my cousin votes. I hear nobody else.', [1, 1, -3], 48));
        P.sight.push(murmur(7, 'Nobody has asked me anything. I have not decided anything.', [-2, 2, 1], 54));
        P.sight.push({ t: 'p', text: 'So **Seats 1, 3 and 7 are still open to being talked to.**' });
        P.sight.push({ t: 'p', text: 'And **Seat 4 has shut his ears.** He means it. An ask spent on him is spent.' });
        P.sight.push({ t: 'fine', text: 'He never says who his cousin is. Somebody here can see that.' });
        P.wren.push({ t: 'h', text: 'When the fire bowed' });
        P.wren.push({ t: 'html', html: `<div class="heartbeats">${[['The Provost', 'normal'], ['The Envoy <small>(fast)</small>', 'fast'], ['Wren <small>(nothing to catch)</small>', 'flat']].map(([n, k]) => `<div class="hb"><span>${n}</span>${D.trace(k)}</div>`).join('')}</div>` });
        P.wren.push({ t: 'p', text: 'Nine Masters, steady. The Envoy, fast. Wren: nothing to catch, as always.' });
        P.wren.push({ t: 'p', text: 'And the Provost\u2019s heart skipped twice \u2014 while she was looking at Wren, not the fire.' });
      }

      if (roleId === 'seer') {
        P.sight.push({ t: 'h', text: 'Three things under this hall' });
        P.sight.push({ t: 'p', text: 'Nobody else can see them, and nothing anybody says tonight will change them.' });
        P.sight.push({ t: 'list', items: [
          '**Seat 5** \u2014 a Crown-struck coin under the cushion.',
          '**Seat 8** \u2014 the same coin, in the sleeve.',
          '**Seat 6** \u2014 a soldier in the Envoy\u2019s grey behind the chair. Nobody gets near enough to speak.',
        ] });
        P.sight.push({ t: 'svg', cls: 'underlayer', svg: underHall });
        P.sight.push({ t: 'p', text: 'Bought, bought, out of reach. **An ask spent on 5, 6 or 8 is spent.** Say those three numbers out loud.' });
        P.wren.push({ t: 'h', text: 'The tapestry, and the shadow' });
        P.wren.push({ t: 'p', text: 'Under the tapestry there is older paint. You can see *that* there is a shape under it. Not what. The Envoy was looking at that wall when he said it.' });
        P.wren.push({ t: 'p', text: 'In the dormitory you blamed the lamp. There is no lamp here, and Wren\u2019s shadow still falls towards the fire.' });
      }

      if (roleId === 'binder') {
        P.sight.push({ t: 'h', text: 'Who is sworn to whom' });
        P.sight.push({ t: 'p', text: 'Two red threads in the whole hall. Nobody else in the nine is tied to anybody.' });
        P.sight.push({ t: 'svg', cls: 'underlayer', svg: threadMap });
        P.sight.push({ t: 'list', items: [
          '**Seat 2 is sworn to Seat 1.** Seat 2 votes as Seat 1 votes \u2014 unless somebody asks Seat 2 directly.',
          '**Seat 4 is sworn to Seat 6.** They are cousins.',
        ] });
        P.sight.push({ t: 'p', text: 'So **one ask can be worth two votes**: ask the Master at the top of a thread and the one below comes too.' });
        P.sight.push({ t: 'fine', text: 'You cannot see who is pledged, who will listen, or who has been paid. Ask.' });
        P.wren.push({ t: 'h', text: 'No thread found' });
        P.wren.push({ t: 'p', text: 'Wren, on the dais, in front of nine Houses: *no thread found.* Not to the Provost. Not to you. Not unbound \u2014 you know unbound. Something else.' });
        P.wren.push({ t: 'p', text: 'And when the fire bowed you thought you saw a thread from the Provost to Wren. Then the light came back, and you are not sure what colour it was.' });
      }

      return P;
    },
  });
})();
