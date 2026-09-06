/* Companion — Chapter II: The Ember Vault (KNOT · cast: VOTE_LOST) */
(function () {
  'use strict';
  const G = window.VigilGlyphs, L = window.VigilLore, CA = window.CompanionAudio, D = window.CompanionDraw;
  const C = window.CompanionContent;
  const V = '#a482e6', AMBER = '#f2d27a', SEA = '#4fb3bf';
  const F = 'font-family="Cinzel,serif"';

  const EPITAPHS = [
    { name: 'Mere', shape: 'Crown', mark: 'right' },
    { name: 'Halvard', shape: 'Spike', mark: 'left' },
    { name: 'Rook', shape: 'Hook', mark: 'right' },
    { name: 'Idony', shape: 'Hook', mark: 'left' },
  ];
  const STRIP = [{ shape: 'Spike', inv: true }, { shape: 'Crown', inv: true }, { shape: 'Hook', inv: true }];
  const gl = (n) => `${G.svg(n, { size: 30, color: AMBER })} ${n}`;
  const laws = (ns) => `<div class="laws">${L.laws.filter(l => ns.includes(l.n)).sort((a, b) => ns.indexOf(a.n) - ns.indexOf(b.n)).map(l => `<div class="law ${l.era === 'O' ? 'order' : 'founders'}"><div class="era">Law ${l.n} · ${l.era === 'F' ? "Founders' · Year 0" : "Order's · Year " + l.year}</div><div class="txt">${l.text}</div></div>`).join('')}</div>`;

  /* ---------- Seer: under the antechamber ---------- */
  const underAntechamber = (() => {
    const xs = [60, 160, 260, 360]; // Mere, Halvard, Rook, Idony as they stand; dials A B C D beneath the same x
    const names = ['Mere', 'Halvard', 'Rook', 'Idony'];
    const marks = ['right', 'left', 'right', 'left'];
    const sockets = ['Idony', 'Mere', 'Halvard', 'Rook']; // original occupant of the socket above each dial
    const faces = { 0: 1, 1: 2, 2: 3, 3: 0 }; // true sightlines: Mere->B, Halvard->C, Rook->D, Idony->A
    let s = `<svg viewBox="0 0 420 330"><rect width="420" height="330" fill="#000"/>`;
    s += `<text x="210" y="16" text-anchor="middle" fill="#fff" font-size="10" ${F} opacity=".8">UNDER THE ANTECHAMBER — as the statues stand, and as they stood</text>`;
    // wall + niche behind Mere
    s += `<line x1="10" y1="120" x2="410" y2="120" stroke="#fff" stroke-width="1" opacity=".5"/>`;
    s += `<rect x="18" y="92" width="34" height="26" rx="3" fill="none" stroke="${V}" stroke-width="1.5" stroke-dasharray="3 2"/><text x="35" y="88" text-anchor="middle" fill="${V}" font-size="8" ${F}>a niche</text>`;
    xs.forEach((x, i) => {
      const turned = marks[i] === 'right';
      // statue: hood + plinth
      s += `<path d="M${x - 9},112 L${x - 7},60 C${x - 7},48 ${x + 7},48 ${x + 7},60 L${x + 9},112 Z" fill="none" stroke="#fff" stroke-width="1.2"/>`;
      s += `<rect x="${x - 22}" y="112" width="44" height="14" fill="none" stroke="#fff" stroke-width="1.2"${turned ? ` transform="rotate(180 ${x} 119)" stroke-dasharray="4 2"` : ''}/>`;
      // epitaph with mark
      const mx = turned ? x + 18 : x - 18;
      s += `<path d="M${mx},116 L${mx + (turned ? -5 : 5)},119 L${mx},122 Z" fill="${V}"/>`;
      s += `<text x="${x}" y="44" text-anchor="middle" fill="#fff" font-size="10" ${F}>${names[i]}</text>`;
      if (turned) s += `<text x="${x}" y="138" text-anchor="middle" fill="${V}" font-size="9.5" ${F}>upside down · mark right</text>`;
      else s += `<text x="${x}" y="138" text-anchor="middle" fill="#fff" font-size="9.5" ${F} opacity=".7">mark left</text>`;
      // original socket under the floor
      s += `<rect x="${x - 26}" y="150" width="52" height="12" fill="none" stroke="#fff" stroke-width="1" stroke-dasharray="3 2" opacity=".8"/>`;
      s += `<text x="${x}" y="175" text-anchor="middle" fill="#fff" font-size="9.5" ${F} opacity=".8">${sockets[i]}'s socket</text>`;
      // apparent sightline (faint, straight down) and true sightline (solid, to the original socket's dial)
      s += `<line x1="${x}" y1="128" x2="${x}" y2="250" stroke="#fff" stroke-width="1" stroke-dasharray="2 4" opacity=".25"/>`;
      const tx = xs[faces[i]];
      s += `<line x1="${x}" y1="128" x2="${tx}" y2="248" stroke="${V}" stroke-width="2" opacity=".95"/>`;
      s += `<path d="M${tx - 5},241 L${tx},250 L${tx + 5},241" fill="none" stroke="${V}" stroke-width="2"/>`;
      // dial
      s += `<circle cx="${x}" cy="270" r="17" fill="none" stroke="#fff" stroke-width="1.5"/><text x="${x}" y="274" text-anchor="middle" fill="#fff" font-size="12" ${F}>${'ABCD'[i]}</text>`;
    });
    s += `<text x="210" y="304" text-anchor="middle" fill="${V}" font-size="9" ${F}>violet: where each Founder truly faces — the socket their plinth was cut for</text>`;
    s += `<text x="210" y="318" text-anchor="middle" fill="#fff" font-size="9" ${F} opacity=".6">grey dashes: where the rebuilders left them looking</text>`;
    return s + `</svg>`;
  })();

  /* ---------- Seer: under the vault, and the gap ---------- */
  const underVault = `<svg viewBox="0 0 360 230">
    <rect width="360" height="230" fill="#000"/>
    <text x="180" y="16" text-anchor="middle" fill="#fff" font-size="10" ${F} opacity=".8">UNDER THE STAIR — the Ember, and whoever holds it</text>
    <g stroke="#fff" fill="none" stroke-width="1.2">
      <path d="M10,200 L120,200 L120,180 L150,180"/><path d="M210,180 L240,180 L240,160 L350,160"/>
      <path d="M150,180 L150,225 M210,180 L210,225" stroke-dasharray="3 3" opacity=".6"/>
      <rect x="268" y="112" width="26" height="30" rx="3"/>
      <path d="M281,120 C285,124 287,128 287,131 C287,135 284,138 281,138 C278,138 275,135 275,131 C275,128 277,124 281,120 Z" fill="${SEA}" stroke="none" opacity=".9"/>
    </g>
    <g fill="#fff" opacity=".9"><circle cx="40" cy="186" r="6"/><circle cx="70" cy="180" r="6"/><circle cx="100" cy="186" r="6"/><circle cx="130" cy="170" r="6"/></g>
    <g stroke="#fff" stroke-width="3" opacity=".55" stroke-linecap="round"><path d="M40,186 L14,200"/><path d="M70,180 L44,196"/><path d="M100,186 L76,200"/><path d="M130,170 L108,186"/></g>
    <circle cx="300" cy="150" r="6" fill="${V}"/>
    <path d="M300,150 L340,148" stroke="${V}" stroke-width="3" opacity=".9" stroke-linecap="round"/>
    <path d="M300,150 C295,140 285,134 281,128" stroke="${V}" stroke-width="1.2" fill="none" stroke-dasharray="2 2"/>
    <g fill="#fff" font-size="9" ${F}><text x="28" y="212">Bookmoth</text><text x="60" y="166">Hush</text><text x="88" y="212">Owl</text><text x="118" y="158">Knot</text><text x="292" y="176" fill="${V}">Wren</text><text x="281" y="106" text-anchor="middle" fill="${SEA}">the Ember</text></g>
    <text x="180" y="222" text-anchor="middle" fill="#fff" font-size="9" ${F} opacity=".7">four shadows fall away from the cold light. One reaches for it.</text>
  </svg>`;

  C.chapters.push({
    id: 'ch2',
    pages: (roleId, ctx) => {
      const P = { sight: [], wren: [], speak: [] };
      const lost = !!ctx.flags.VOTE_LOST;
      P.speak.push({ t: 'fine', text: 'Nothing to speak yet. The Hearth will tell you when.' });

      /* ================= READER ================= */
      if (roleId === 'reader') {
        P.sight.push({ t: 'h', text: 'The four epitaphs' });
        P.sight.push({ t: 'p', text: 'One shape on each plinth, clean on your page where the Hearth shows them worn. Left to right as the statues stand: **Mere, Halvard, Rook, Idony.** A single carved glyph has only two readings — upright, or *turned* (inverted). Which of these plinths are turned is Under-Sight, not yours: **Owl knows which plinths are upside down.**' });
        P.sight.push({ t: 'html', html: G.inscription(EPITAPHS.map(e => ({ shape: e.shape, inv: false, label: e.name.toUpperCase() })), { showMark: false, color: '#fff' }) });
        P.sight.push({ t: 'table', head: ['Statue', 'Shape', 'Upright reads', 'Turned reads'], rows: EPITAPHS.map(e => { const up = G.read(e.shape, false), tr = G.invert(up); return [`<b>${e.name}</b>`, `${G.shapeSvg(e.shape, false, { size: 34, color: '#fff' })} ${e.shape}`, `${gl(up)}<br><em>${G.GLYPHS[up].gloss}</em>`, `${gl(tr)}<br><em>${G.GLYPHS[tr].gloss}</em>`]; }) });
        P.sight.push({ t: 'fine', text: 'Read them all upright and you get CROWN, THORN, KNOT, KNOT — two Founders with the same glyph, which the Founders would not have done. Say both readings aloud; let Owl say which is carved turned.' });
        P.sight.push({ t: 'divider' });
        P.sight.push({ t: 'h', text: 'The strip in the niche' });
        P.sight.push({ t: 'p', text: 'Somewhere in the antechamber, where the rebuilders did not look, there is a hollow with a stone strip of three shapes in it — if the table finds it. Owl knows where; you know what it says. Left to right: a **Spike, inverted**; a **Crown, inverted**; a **Hook, inverted**. A line of three has a beginning; only Owl can see which end it is.' });
        P.sight.push({ t: 'html', html: G.inscription(STRIP, { showMark: false, color: '#fff' }) });
        P.sight.push({ t: 'table', head: ['If the strip is…', 'it reads'], rows: [
          ['upright (mark on the left) — left to right, as carved', `${gl('WELL')}, ${gl('EMBER')}, ${gl('VEIL')}<br><em>went down · kept · alone</em> — the Order\'s version: <em>one went down alone and kept it.</em>`],
          ['turned (mark on the right) — right to left, every glyph inverted', `${gl('KNOT')}, ${gl('CROWN')}, ${gl('THORN')}<br><em>four · as one · went through.</em>`],
        ] });
        P.sight.push({ t: 'fine', text: 'Four what? Through what? The strip does not say. Neither does the sheet beside it.' });
        P.sight.push({ t: 'reveal', label: 'The sheet in the niche', blocks: [
          { t: 'p', text: 'Close writing in the **older alphabet** — the one on the dormitory door, the one you have not learned. If you take a rubbing on the Hearth, it sits here, in your sleeve, unread.' },
          { t: 'letter', text: 'ᛃᚲᛟᚦ ᚱᛜᚹ ᛇᛒᛚᚲᛁ ᚦᚨᛞᚷ ᛈᚾ ᛚᛟᚹᛏᚲ ᚠᛊᚱᛞᚹ ᛗᛁᛇᛏ ᚢᛜᚱ ᛞᛖᚷᚦᛏᚲ ᛈᚨᚹ ᚲᛁᛜᛚ ᚹᚦᛊᚨᛚᚢ ᛒᛖᚷ ᛊᛟᚱᛏᚲ ᛁᛚᚹᛞ ᚹᚨᚲᛜᛖ ᛚᚲ ᛃᚨᛗᚾ ᚦᛟᚱᛞᚹᛁ ᛉᛖᚹ … — ᛗᛖᚱᛖ' },
          { t: 'fine', text: 'You can make out one thing: it is signed — four letters set apart at the foot, the way a name is set. Whose, you cannot read. Not yet.' },
        ] });
        P.sight.push({ t: 'fine', text: 'The lexicon, with glosses, is in your **Book**.' });
        P.wren.push({ t: 'h', text: 'Four names' });
        P.wren.push({ t: 'p', text: lost ? 'Wren was on the dais under guard when you went down. Wren is not on the dais now; you would bet your lexicon on it. You have been reading names all night — nine Masters, four Founders — and the only name in this school you cannot read is on a child who is never where they were put.' : 'Four names on four plinths, in the Vigil\'s script, and you read them without thinking. Wren\'s name on the dormitory door is in the older alphabet — the same alphabet as the sheet in the niche. You have started to wonder who wrote the door.' });
      }

      /* ================= LISTENER ================= */
      if (roleId === 'listener') {
        P.sight.push({ t: 'h', text: "The Founders' phrase" });
        P.sight.push({ t: 'p', text: 'When the dials are touched the door hums the Founders\' phrase — four notes, tuned to this room, so the Hearth\'s speakers give away nothing but the **steps** between them. You hear those. Nobody else does.' });
        P.sight.push({ t: 'audio', label: 'The door\'s phrase — four notes', strip: CA.strip([1, 3, -2]), play: (A) => CA.playSteps(A, [1, 3, -2]), text: '**Up one, up three, down two.** Four glyphs, three steps. Bookmoth can name the four glyphs on the plinths; of every order they could be turned in, only one climbs like this. That order is the order the dials must be turned in — Knot\'s Law says so.' });
        P.sight.push({ t: 'fine', text: 'Your **Ladder** is in the Book: ASH 0 · THORN 1 · KNOT 2 · EMBER 3 · WELL 4 · VEIL 5 · CROWN 6 · COLD is a rest. Use the **row-player** there: tap four glyphs in an order and it shows the steps; compare them with the arrows above until they match.' });
        P.sight.push({ t: 'p', text: 'One thing you *cannot* hear: which dial was turned. A dial touched on the Hearth sounds through the Hearth, and everyone at the table hears the same thing. Your gift is the order. Owl\'s is the place.' });
        P.sight.push({ t: 'h', text: 'Heartbeats in the vault' });
        P.sight.push({ t: 'html', html: `<div class="heartbeats">${['Bookmoth', 'Hush', 'Owl', 'Knot'].map(n => `<div class="hb"><span>${n}</span>${D.trace('normal')}</div>`).join('')}<div class="hb"><span>the Ember</span>${D.trace('flat')}</div><div class="hb"><span>Wren</span>${D.trace('flat')}</div></div>` });
        P.sight.push({ t: 'fine', text: 'The Ember: nothing. It is a stone in a box; you did not expect a heart. Wren: ' + (lost ? 'should be on the dais under guard, two floors up and out of any range you have. And yet there are footsteps on the stair behind you — light, quick, familiar — and no heart walking with them. Too quiet to catch.' : 'promised to stay put. And yet there are footsteps on the stair behind you — light, quick, familiar — and no heart walking with them. Too quiet to catch.') });
        P.wren.push({ t: 'h', text: 'The steps behind you' });
        P.wren.push({ t: 'p', text: 'You have heard those footsteps every day for a year. You could pick them out of a crowded Hall. It has never once occurred to you, until this stair, that you have only ever heard the feet.' });
      }

      /* ================= SEER ================= */
      if (roleId === 'seer') {
        P.sight.push({ t: 'h', text: 'Under the antechamber' });
        P.sight.push({ t: 'p', text: 'The floor is Order\'s stone laid over Founders\' stone, and under it the **original sockets** are still cut — four, one before each dial, each shaped for one plinth. The statues do not stand in them. When the vault was rebuilt in 212 the plinths were lifted, shuffled, and set down again in a row — and two of them, **Mere\'s and Rook\'s**, were set down **upside down**: their epitaphs\' marks are on the **right**.' });
        P.sight.push({ t: 'svg', cls: 'underlayer', svg: underAntechamber });
        P.sight.push({ t: 'list', items: [
          '**Where each Founder truly faces** (the socket their plinth was cut for): **Halvard → C · Idony → A · Rook → D · Mere → B.**',
          '**Turned plinths** (mark on the right — the Reader must invert the glyph): **Mere, Rook.** Halvard\'s and Idony\'s marks are on the left: upright.',
          '**A niche** behind Mere\'s plinth, knee height, where the rebuilders did not look. The Hearth will not point at it. You can.',
        ] });
        P.sight.push({ t: 'fine', text: 'Bookmoth reads the shapes; Hush has the order; Knot has the Law that says which of two disagreeing rules is the one that binds. Say what you see.' });
        P.sight.push({ t: 'h', text: 'The strip in the niche' });
        P.sight.push({ t: 'p', text: 'Three shapes on a stone strip. Its **mark is on the right**: the strip is turned — read right to left, every glyph inverted. Bookmoth has both readings; only you can say which is the one Mere cut.' });
        P.sight.push({ t: 'html', html: G.inscription(STRIP, { showMark: true, mark: 'right', color: '#fff', markColor: V }) });
        P.sight.push({ t: 'h', text: 'Under the stair' });
        P.sight.push({ t: 'svg', cls: 'underlayer', svg: underVault });
        P.sight.push({ t: 'fine', text: 'The Ember gives no heat, and still four shadows fall away from it. ' + (lost ? 'Wren is meant to be on the dais under guard. Wren has never once been where Wren was put; when Wren turns up, look at the shadow.' : 'Wren is meant to be with the Provost. Wren has never once been where Wren was put; when Wren turns up, look at the shadow.') });
        P.sight.push({ t: 'fine', text: 'Your Ring Page and the rule of marks are in the **Book**.' });
        P.wren.push({ t: 'h', text: 'Reaching' });
        P.wren.push({ t: 'p', text: 'In the dormitory it leaned toward the lamp and you called it the lamp. Down here there is no lamp — only a cold blue stone in a box that gives no light a shadow should want. You are going to watch it reach anyway. You already know it will.' });
      }

      /* ================= BINDER ================= */
      if (roleId === 'binder') {
        P.sight.push({ t: 'h', text: 'The Laws of the door' });
        P.sight.push({ t: 'html', html: laws([2, 9, 3]) });
        P.sight.push({ t: 'p', text: 'Law 9 was written in **212** — the year the vault was rebuilt and the statues re-set. It says a Founder faces *the dial before them*. Law 2, four hundred years older, says each Founder\'s glyph sits on the dial *they face* — and the Founders faced the sockets their plinths were cut for, which Owl can see. The two Laws agree only if the statues never moved. They moved.' });
        P.sight.push({ t: 'p', text: '**Law 3: the older binds.** The sockets, not the rebuild. Then Law 2\'s second half: turn the dials **in the Hymn\'s order** — Hush has the phrase — and know that the door *counts every turn*. A wrong turn is not undone by a right one after it; the door forgets the whole count and you begin again.' });
        P.sight.push({ t: 'fine', text: 'The 212 page of your Book now holds an Order\'s Law written that year beside a Founders\' Law struck through in the same hand. The vault was rebuilt in 212, and a road behind it was bricked up in 212. You have not been told what else happened in 212.' });
        P.sight.push({ t: 'h', text: 'Threads in the vault' });
        P.sight.push({ t: 'list', items: [
          '**Marrow → the four of you:** a thin red thread, new tonight. An errand is a small oath. It pulls downward as you go; she is holding her end.',
          lost ? '**Vane → Wren:** gold, and tight — the writ made real. Under the gold, still, the red one you saw in the Hall, older than the writ. **Vane\'s guard → Wren:** four gold threads to a dais that, if your Sight is right, is now empty.' : '**Vane → Wren:** gold, as in the Hall — and under the gold, still, the red one, older than the writ. He has not left the school.',
          '**Marrow → Wren:** the same thread as in the Hall. You are trying not to look at its colour. It is not red.',
          '**The Ember:** no thread. It is a stone; stones are not bound. You expected nothing and found nothing.',
          '**Wren:** *No thread found.* Not unbound; the knot itself. You expected something and found nothing, which is not the same.',
        ] });
        P.sight.push({ t: 'fine', text: 'The Book of Laws, in the order learned and by year, is in your **Book**.' });
        P.wren.push({ t: 'h', text: 'The same nothing' });
        P.wren.push({ t: 'p', text: 'You looked at the Ember and saw no thread, and it did not trouble you: it is a stone. You looked at Wren and saw the same nothing, and it troubled you for the fourteenth year running. You have not yet asked yourself why the two nothings feel different — or whether they are.' });
      }
      return P;
    },
  });
})();
