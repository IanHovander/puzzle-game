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
      case 'crescent': return `<path d="M25,9 A11,11 0 1 0 25,31 A13,13 0 0 1 25,9 Z" fill="#f4ecd8"/>`;
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

  /* ---------- Seer: three things nobody else has seen ---------- */
  const underHall = (() => {
    const seats = ring(180, 185, 88);
    let s = `<svg viewBox="0 0 360 360"><rect width="360" height="360" fill="#000"/>`;
    s += `<g stroke="#fff" fill="none" stroke-width="1.2"><rect x="10" y="10" width="340" height="340"/>`;
    s += `<path d="M150,10 L150,42 A30,30 0 0 0 210,42 L210,10"/>`;
    s += `<rect x="326" y="95" width="16" height="110" stroke-dasharray="3,3"/></g>`;
    s += `<text x="218" y="36" fill="#fff" font-size="14" ${F}>the Hearth</text>`;
    s += `<text x="342" y="68" text-anchor="end" fill="#a482e6" font-size="14" ${F}>the tapestry</text>`;
    s += `<text x="342" y="86" text-anchor="end" fill="#a482e6" font-size="13" ${F}>over older paint</text>`;
    seats.forEach(p => { s += `<circle cx="${p.x.toFixed(1)}" cy="${p.y.toFixed(1)}" r="14" fill="none" stroke="#fff" stroke-width="1.2"/><text x="${p.x.toFixed(1)}" y="${(p.y + 5).toFixed(1)}" text-anchor="middle" fill="#fff" font-size="14" ${F}>${p.n}</text>`; });
    [5, 8].forEach(n => { const p = seats[n - 1]; s += `<g transform="translate(${p.x.toFixed(1)},${(p.y + 22).toFixed(1)})"><circle r="5" fill="none" stroke="#a482e6" stroke-width="1.5"/></g>`; });
    const p5 = seats[4], p8 = seats[7], p6 = seats[5];
    s += `<text x="${p5.x.toFixed(1)}" y="${(p5.y + 45).toFixed(1)}" text-anchor="middle" fill="#a482e6" font-size="14" ${F}>coin</text>`;
    s += `<text x="${(p8.x - 9).toFixed(1)}" y="${(p8.y + 27).toFixed(1)}" text-anchor="end" fill="#a482e6" font-size="14" ${F}>coin</text>`;
    /* The soldier stands behind Seat 6, so outside the ring (Seat 6 sits on its left side), with the words under him. */
    s += `<g transform="translate(${(p6.x - 26).toFixed(1)},${(p6.y + 2).toFixed(1)})"><path d="M-4,10 L-3,-4 L3,-4 L4,10 Z M0,-4 m-3,0 a3,3 0 1 1 6,0" fill="#a482e6"/><path d="M6,-11 L6,10" stroke="#a482e6" stroke-width="1.2"/></g>`;
    s += `<text x="${(p6.x - 26).toFixed(1)}" y="${(p6.y + 30).toFixed(1)}" text-anchor="middle" fill="#a482e6" font-size="14" ${F}>a soldier</text>`;
    s += `<text x="180" y="338" text-anchor="middle" fill="#fff" font-size="14" ${F} opacity=".75">the nine seats, from above</text>`;
    return s + '</svg>';
  })();

  /* ---------- Binder: the two sworn threads ---------- */
  const threadMap = (() => {
    const seats = ring(180, 140, 96);
    const P = (n) => seats[n - 1];
    let s = `<svg viewBox="0 0 360 300"><rect width="360" height="300" fill="#000"/>`;
    /* Each thread bows toward the middle of the ring (bow = how far, 0 to 1), so 4 to 6 does not run past
       Seat 5 and read as 4-5-6. The knot sits on the curve, at its midpoint. */
    const draw = (a, b, bow) => {
      const mx = (a.x + b.x) / 2, my = (a.y + b.y) / 2, k = bow || 0;
      const cx = mx + (180 - mx) * k, cy = my + (140 - my) * k;
      const kx = 0.5 * mx + 0.5 * cx, ky = 0.5 * my + 0.5 * cy;
      return `<path d="M${a.x.toFixed(1)},${a.y.toFixed(1)} Q${cx.toFixed(1)},${cy.toFixed(1)} ${b.x.toFixed(1)},${b.y.toFixed(1)}" fill="none" stroke="#d96b4a" stroke-width="2.5"/><circle cx="${kx.toFixed(1)}" cy="${ky.toFixed(1)}" r="3.5" fill="#d96b4a"/>`;
    };
    s += draw(P(2), P(1)) + draw(P(4), P(6), 0.75);
    seats.forEach(p => { s += `<circle cx="${p.x.toFixed(1)}" cy="${p.y.toFixed(1)}" r="15" fill="#000" stroke="#fff" stroke-width="1.2"/><text x="${p.x.toFixed(1)}" y="${(p.y + 5).toFixed(1)}" text-anchor="middle" fill="#fff" font-size="14" ${F}>${p.n}</text>`; });
    s += `<g text-anchor="middle" fill="#d96b4a" font-size="14" ${F}><text x="180" y="270">red, knotted — sworn.</text><text x="180" y="290">Two threads among the nine.</text></g>`;
    return s + '</svg>';
  })();

  /* A thread, as the Binder sees it: red (a promise), gray, gold, or none. Colors as in the Book. */
  const THREAD = { red: '#d96b4a', gold: '#d4a94e', gray: 'rgba(200,200,210,.75)' };
  const threadLine = (kind) => `<svg viewBox="0 0 90 16" style="width:74px;height:14px;vertical-align:middle">${THREAD[kind]
    ? `<path d="M4,8 C24,2 34,14 52,8 S74,4 86,8" fill="none" stroke="${THREAD[kind]}" stroke-width="2.5" stroke-linecap="round"/>`
    : '<path d="M4,8 L86,8" fill="none" stroke="rgba(255,255,255,.45)" stroke-width="2" stroke-dasharray="3 7" stroke-linecap="round"/>'}</svg>`;

  /* The Provost's heart: steady, then one beat twice the height of the rest. It jumped once; it did not race.
     D.trace has no such shape (normal, fast, slow, flat), so it is drawn here, in the same stroke. */
  const jumpTrace = `<svg viewBox="0 0 120 22" class="trace"><path d="M0,11 L14,11 L17,7 L20,15 L23,11 L50,11 L53,1 L57,21 L61,11 L88,11 L91,7 L94,15 L97,11 L120,11" stroke="#4fb3bf" stroke-width="1.5" fill="none"/></svg>`;

  const murmur = (n, text, steps, base) => ({
    /* The words go in `text` (printed under the button), not the strip: the murmur is the fact, and the page must read without sound. */
    t: 'audio', text: `**Seat ${n}:** *\u201c${text}\u201d*`, button: '♪ Cup your ear',
    play: (A) => CA.playSteps(A, steps, base),
  });

  C.chapters.push({
    id: 'ch1',
    pages: (roleId, ctx) => {
      const P = { sight: [], wren: [], speak: [] };
      P.speak.push({ t: 'fine', text: 'Nothing to speak yet. When the Hearth asks, say what your Sight page shows.' });
      P.speak.push({ t: 'fine', text: '*' + L.houseRule + '*' });

      if (roleId === 'reader') {
        P.sight.push({ t: 'h', text: 'The roll, before the Vigil opened' });
        P.sight.push({ t: 'p', text: 'Two Houses filed tonight, in writing, before the Vigil opened. You can read the roll from here.' });
        P.sight.push({ t: 'table', head: ['filed', 'and it says'], rows: [
          [seatLabel(9), '<b>KEEP</b> \u2014 the Chair\u2019s own hand.'],
          [seatLabel(3), '<b>KEEP</b> \u2014 three words: <em>with the Chair.</em>'],
        ] });
        P.sight.push({ t: 'p', text: 'The other seven filed nothing. **So you begin with two.** When the Hearth asks, say that out loud. You need five.' });
        P.sight.push({ t: 'fine', text: 'Seat 3 is already yours, whatever anyone hears. An ask spent there buys a vote you have.' });
        P.sight.push({ t: 'fine', text: 'Lower down, in the Chair\u2019s hand again: *Item two: the foundling.* After it, a name, in the older alphabet, the letters of the chalk on your door. You can\u2019t read it. Yet.' });
        P.wren.push({ t: 'h', text: 'Item two' });
        P.wren.push({ t: 'fine', text: 'Say it to Wren, out loud:' });
        P.wren.push({ t: 'letter', text: '\u201cYou heard it too. *Not coming back.* He said it like a line he\u2019d read off a wall. It isn\u2019t written anywhere I\u2019ve read. If it\u2019s written somewhere I haven\u2019t, I\u2019ll read every wall in this school before he takes you. Their roll has you down as item two. We claimed you first.\u201d' });
      }

      if (roleId === 'listener') {
        P.sight.push({ t: 'h', text: 'Four murmurs' });
        P.sight.push({ t: 'p', text: 'Four Masters are muttering. Only you can hear them.' });
        P.sight.push(murmur(1, 'Thirty years in this chair, and nobody asks me to my face. They send letters. The child goes to the capital, unless somebody walks over here.', [-1, 1, -2], 52));
        P.sight.push(murmur(3, 'Ask me where I stand. Go on. Somebody ask me.', [2, -1], 50));
        P.sight.push(murmur(4, 'I vote as my cousin votes. I hear nobody else. I have stopped listening, to be safe.', [1, 1, -3], 48));
        P.sight.push(murmur(7, 'Forty years of staring at that stone, and nobody has asked me what it says. I have not decided anything.', [-2, 2, 1], 54));
        P.sight.push({ t: 'p', text: '**Seats 1, 3 and 7 are still open** to being talked to. **Seat 4 has shut his ears.** An ask spent on him is spent. The other seats aren\u2019t muttering anything you can catch.' });
        P.sight.push({ t: 'fine', text: 'Seat 4 never says which seat his cousin sits in. Another phone at this table shows that.' });
        P.wren.push({ t: 'h', text: 'What I heard tonight' });
        P.wren.push({ t: 'html', html: `<div class="heartbeats">${[['The Provost <small>(jumped)</small>', jumpTrace], ['The Hearth <small>(once)</small>', D.trace('slow')], ['Wren <small>(nothing to catch)</small>', D.trace('flat')]].map(([n, svg]) => `<div class="hb"><span>${n}</span>${svg}</div>`).join('')}</div>` });
        P.wren.push({ t: 'fine', text: 'Say it to Wren, out loud:' });
        P.wren.push({ t: 'letter', text: '\u201cWhen the Envoy finished his sentence, the Provost\u2019s heart jumped. She was looking at you. So it isn\u2019t only us\u2026 And the fire beat once, like a heart. You flinched. I noticed. I still can\u2019t hear yours. I\u2019m going to keep checking.\u201d' });
      }

      if (roleId === 'seer') {
        P.sight.push({ t: 'h', text: 'Three things nobody else has seen' });
        P.sight.push({ t: 'p', text: 'Nothing anyone says tonight will change them.' });
        P.sight.push({ t: 'svg', cls: 'underlayer', svg: underHall });
        P.sight.push({ t: 'list', items: [
          '**Seat 5**: Crown coin under the cushion.',
          '**Seat 8**: the same coin, in the sleeve.',
          '**Seat 6**: a Crown soldier in the chair\u2019s own shadow, so still that only you have seen him. Anyone who walks toward Seat 6 tonight will find him already in the way.',
        ] });
        P.sight.push({ t: 'p', text: 'Bought, bought, out of reach. **An ask spent on 5, 6 or 8 is spent.** When the Hearth asks, say those three numbers out loud.' });
        P.sight.push({ t: 'fine', text: 'The tapestry behind the chairs has been painted over, and there\u2019s older paint underneath, a whole other picture. Where the new paint is thinnest, you can make out a hand, then a sleeve. The Envoy keeps looking at exactly the place you are looking.' });
        P.wren.push({ t: 'h', text: 'The shadow' });
        P.wren.push({ t: 'fine', text: 'Say it to Wren, out loud:' });
        P.wren.push({ t: 'letter', text: '\u201cYour shadow ran the wrong way all night, across the dais to the fire. Everyone was watching your hand on the Provost\u2019s sleeve, so almost nobody saw it. Seat 7 did, and wrote something down. I still can\u2019t picture next spring. I\u2019ve started on tomorrow. You\u2019re in it.\u201d' });
      }

      if (roleId === 'binder') {
        P.sight.push({ t: 'h', text: 'Who is sworn to whom' });
        P.sight.push({ t: 'p', text: 'Two red threads among the nine. No other oaths.' });
        P.sight.push({ t: 'svg', cls: 'underlayer', svg: threadMap });
        P.sight.push({ t: 'list', items: [
          '**Seat 2 is sworn to Seat 1.** Seat 2 votes as Seat 1 votes, unless somebody asks Seat 2 directly.',
          '**Seat 4 is sworn to Seat 6.** They are cousins.',
        ] });
        P.sight.push({ t: 'p', text: 'So **one ask can be worth two votes.** Ask the Master someone is sworn to, and the sworn one votes the same way.' });
        P.sight.push({ t: 'fine', text: 'The rest is on other phones. Ask.' });
        P.wren.push({ t: 'h', text: 'No thread found' });
        P.wren.push({ t: 'html', html: '<ul class="blk-list">'
          + '<li>' + threadLine('none') + ' <strong>Wren:</strong> nothing of Wren\u2019s own, to anyone. Still.</li>'
          + '<li>' + threadLine('gray') + ' <strong>The Provost to Wren:</strong> gray, for one second, while the Envoy spoke.</li>'
          + '<li>' + threadLine('gold') + ' <strong>The Envoy to Wren:</strong> gold, all night, to the dais.</li>'
          + '</ul>' });
        P.wren.push({ t: 'fine', text: 'Say it to Wren, out loud:' });
        P.wren.push({ t: 'letter', text: '\u201cFor one second tonight, a thread ran from the Provost to you. Gray, which is grief. Nothing ran back. The Envoy has a gold one on you. Gold is the Crown\u2019s claim. It took the first time he looked at you. Mine still won\u2019t take, seven years on. When it does, it will be red, and it will hold. That is not a rule. It is a promise.\u201d' });
      }

      return P;
    },
  });
})();
