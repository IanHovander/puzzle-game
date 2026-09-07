/* Companion — Chapter II: The Ember Vault (KNOT · cast: VOTE_LOST).
   One fact each, and no page holds another's: the Reader has the word cut into each plinth, the Listener
   the order the door hums, the Seer which hole each plinth was cut to stand in, the Binder which of the
   two rules is the older. */
(function () {
  'use strict';
  const G = window.VigilGlyphs, L = window.VigilLore, CA = window.CompanionAudio, D = window.CompanionDraw;
  const C = window.CompanionContent;
  const V = '#a482e6', AMBER = '#f2d27a', SEA = '#4fb3bf', RED = '#d96b4a';
  const F = 'font-family="Cinzel,serif"';

  /* One source of truth for the phone: the carving on each plinth, and the hole it was cut to stand in.
     Numbered the way the Hearth numbers plinths and dials. Keep in step with js/content/ch2.js. */
  const PLINTHS = [
    { n: 1, shape: 'Crown', inv: true },    // EMBER
    { n: 2, shape: 'Spike', inv: false },   // THORN
    { n: 3, shape: 'Hook', inv: true },     // VEIL
    { n: 4, shape: 'Hook', inv: false },    // KNOT
  ];
  const CUTFOR = [2, 3, 4, 1];              // plinth 1..4 -> the hole under that dial
  const laws = (ns) => `<div class="laws">${L.laws.filter(l => ns.includes(l.n)).sort((a, b) => ns.indexOf(a.n) - ns.indexOf(b.n)).map(l => `<div class="law ${l.era === 'O' ? 'order' : 'founders'}"><div class="era">Law ${l.n} · ${l.era === 'F' ? "Founders' · Year 0" : "Order's · Year " + l.year}</div><div class="txt">${l.text}</div></div>`).join('')}</div>`;

  /* Under the antechamber: four plinths as they stand, and under the grey floor the four holes they were
     cut for, numbered the way the Hearth numbers the dials. One violet line each and nothing else — no
     arrow to a rule and no word about which floor the door obeys. The Seer reports holes, not rules. */
  const underFloor = (() => {
    const xs = [58, 148, 238, 328];
    let s = `<svg viewBox="0 0 386 252"><rect width="386" height="252" fill="#000"/>`;
    s += `<line x1="12" y1="126" x2="374" y2="126" stroke="#fff" stroke-width="1" opacity=".45"/>`;
    s += `<rect x="20" y="96" width="26" height="24" rx="3" fill="none" stroke="${V}" stroke-width="1.5" stroke-dasharray="3 2"/>`;
    s += `<text x="33" y="90" text-anchor="middle" fill="${V}" font-size="8" ${F}>a hollow</text>`;
    xs.forEach((x, i) => {
      s += `<path d="M${x - 8},118 L${x - 6},72 C${x - 6},62 ${x + 6},62 ${x + 6},72 L${x + 8},118 Z" fill="none" stroke="#fff" stroke-width="1.2"/>`;
      s += `<rect x="${x - 20}" y="118" width="40" height="8" fill="none" stroke="#fff" stroke-width="1.2"/>`;
      s += `<text x="${x}" y="58" text-anchor="middle" fill="#fff" font-size="12" ${F}>${i + 1}</text>`;
      s += `<rect x="${x - 22}" y="176" width="44" height="12" rx="2" fill="none" stroke="#fff" stroke-width="1" stroke-dasharray="3 2" opacity=".7"/>`;
      s += `<circle cx="${x}" cy="212" r="14" fill="none" stroke="#fff" stroke-width="1.3"/><text x="${x}" y="216" text-anchor="middle" fill="#fff" font-size="11" ${F}>${i + 1}</text>`;
    });
    xs.forEach((x, i) => {
      const tx = xs[CUTFOR[i] - 1];
      s += `<path d="M${x},130 C${x},154 ${tx},150 ${tx},172" fill="none" stroke="${V}" stroke-width="2" opacity=".95"/>`;
      s += `<path d="M${tx - 4},165 L${tx},174 L${tx + 4},165" fill="none" stroke="${V}" stroke-width="2"/>`;
    });
    s += `<text x="193" y="242" text-anchor="middle" fill="${V}" font-size="9" ${F}>the hole each plinth was cut to stand in</text>`;
    return s + `</svg>`;
  })();

  /* The Listener's gap, drawn: four dials that carry no coordinate at all. A picture that could name a
     dial would be the Seer's, so this one names none. */
  const dialsUnheard = () => `<svg viewBox="0 0 236 86" style="width:200px;height:73px">
    ${[0, 1, 2, 3].map(i => `<circle cx="${30 + i * 59}" cy="32" r="19" fill="none" stroke="${SEA}" stroke-width="2"/>`).join('')}
    <text x="118" y="76" text-anchor="middle" fill="${SEA}" font-size="11" ${F}>you hear when, never which</text>
  </svg>`;

  /* The Binder's rule, drawn: the same plinth over two floors, one arrow straight down and one bending
     across. No numbers — which plinth and which dial is the Seer's to say. Only which band binds is his. */
  const twoBands = () => `<svg viewBox="0 0 252 172" style="width:222px;height:151px">
    <rect x="6" y="6" width="240" height="62" fill="none" stroke="rgba(255,255,255,.22)"/>
    <text x="16" y="20" fill="rgba(255,255,255,.45)" font-size="9" ${F}>YEAR 212</text>
    <rect x="70" y="26" width="26" height="11" fill="none" stroke="rgba(255,255,255,.5)" stroke-width="1.5"/>
    <path d="M83,39 L83,52" stroke="rgba(255,255,255,.5)" stroke-width="1.5"/><path d="M79,47 L83,54 L87,47" fill="none" stroke="rgba(255,255,255,.5)" stroke-width="1.5"/>
    <circle cx="83" cy="60" r="5" fill="none" stroke="rgba(255,255,255,.5)" stroke-width="1.5"/>
    <path d="M12,64 L240,12" stroke="rgba(255,255,255,.3)" stroke-width="1.5"/>
    <rect x="6" y="80" width="240" height="62" fill="none" stroke="${RED}"/>
    <text x="16" y="94" fill="${RED}" font-size="9" ${F}>YEAR 0</text>
    <rect x="70" y="100" width="26" height="11" fill="none" stroke="${RED}" stroke-width="1.5"/>
    <path d="M83,113 C83,126 176,122 176,128" fill="none" stroke="${RED}" stroke-width="2"/><path d="M172,122 L177,131 L181,122" fill="none" stroke="${RED}" stroke-width="2"/>
    <circle cx="83" cy="134" r="5" fill="none" stroke="rgba(255,255,255,.22)" stroke-width="1.2" stroke-dasharray="2 2"/>
    <circle cx="178" cy="136" r="5" fill="none" stroke="${RED}" stroke-width="1.5"/>
    <text x="126" y="164" text-anchor="middle" fill="${RED}" font-size="10" ${F}>the older band is the one that binds</text>
  </svg>`;

  /* A thread, drawn two ways: whole, and absent. */
  const threadLine = (kind) => `<svg viewBox="0 0 90 16" style="width:74px;height:14px;vertical-align:middle">${
    kind === 'whole' ? `<path d="M4,8 C24,2 34,14 52,8 S74,4 86,8" fill="none" stroke="${RED}" stroke-width="2.5" stroke-linecap="round"/>`
      : '<path d="M6,2 L2,2 L2,14 L6,14 M84,2 L88,2 L88,14 L84,14" fill="none" stroke="rgba(255,255,255,.35)" stroke-width="2"/>'
  }</svg>`;

  /* Under the stair: four shadows fall away from the cold light, and Wren's reaches for it. */
  const underStair = `<svg viewBox="0 0 360 224">
    <rect width="360" height="224" fill="#000"/>
    <g stroke="#fff" fill="none" stroke-width="1.2">
      <path d="M10,196 L120,196 L120,176 L150,176"/><path d="M210,176 L240,176 L240,156 L350,156"/>
      <path d="M150,176 L150,220 M210,176 L210,220" stroke-dasharray="3 3" opacity=".6"/>
      <rect x="268" y="108" width="26" height="30" rx="3"/>
      <path d="M281,116 C285,120 287,124 287,127 C287,131 284,134 281,134 C278,134 275,131 275,127 C275,124 277,120 281,116 Z" fill="${SEA}" stroke="none" opacity=".9"/>
    </g>
    <g fill="#fff" opacity=".9"><circle cx="40" cy="182" r="6"/><circle cx="70" cy="176" r="6"/><circle cx="100" cy="182" r="6"/><circle cx="130" cy="166" r="6"/></g>
    <g stroke="#fff" stroke-width="3" opacity=".55" stroke-linecap="round"><path d="M40,182 L14,196"/><path d="M70,176 L44,192"/><path d="M100,182 L76,196"/><path d="M130,166 L108,182"/></g>
    <circle cx="300" cy="146" r="6" fill="${V}"/>
    <path d="M300,146 L340,144" stroke="${V}" stroke-width="3" opacity=".9" stroke-linecap="round"/>
    <path d="M300,146 C295,136 285,130 281,124" stroke="${V}" stroke-width="1.2" fill="none" stroke-dasharray="2 2"/>
    <g fill="#fff" font-size="9" ${F}><text x="28" y="208">Reader</text><text x="60" y="162">Listener</text><text x="88" y="208">Seer</text><text x="118" y="154">Binder</text><text x="292" y="172" fill="${V}">Wren</text></g>
    <text x="180" y="220" text-anchor="middle" fill="#fff" font-size="9" ${F} opacity=".7">four shadows fall away. One reaches.</text>
  </svg>`;

  C.chapters.push({
    id: 'ch2',
    pages: (roleId, ctx) => {
      const P = { sight: [], wren: [], speak: [] };
      const lost = !!ctx.flags.VOTE_LOST;
      P.speak.push({ t: 'fine', text: 'Nothing to speak yet. The Hearth will tell you when.' });
      P.speak.push({ t: 'fine', text: '*' + L.houseRule + '*' });

      /* ================= READER — what is cut into each plinth ================= */
      if (roleId === 'reader') {
        P.sight.push({ t: 'h', text: 'What is cut into the plinths' });
        P.sight.push({ t: 'p', text: 'One shape to a plinth, numbered the way the Hearth numbers them. The Hearth shows them worn away. On your page they are clean.' });
        P.sight.push({ t: 'table', head: ['cut into the plinth', 'and it says'], rows: PLINTHS.map(p => [
          `<b>Plinth ${p.n}</b><br>${G.shapeSvg(p.shape, p.inv, { size: 34, color: AMBER })}`,
          `<b>${G.read(p.shape, p.inv)}</b>`,
        ]) });
        P.sight.push({ t: 'fine', text: 'Two of them carry the same shape, one of the two upside down. That is the whole of the difference.' });
        P.sight.push({ t: 'p', text: '**Four words: EMBER, THORN, VEIL, KNOT.** Say them out loud, with their numbers.' });
        P.sight.push({ t: 'fine', text: 'A word that is not one of these four is not a count. The door counts once.' });
        P.sight.push({ t: 'fine', text: 'And if a strip of three shapes turns up tonight, it reads two ways. From the left: *one went down alone and kept it.* From the other end: *four, as one, went through.*' });
        P.sight.push({ t: 'fine', text: 'Which dial each word belongs on is not on this page and never was. Ask.' });
        P.wren.push({ t: 'h', text: 'Four words, and one name' });
        P.wren.push({ t: 'p', text: lost
          ? 'Wren was under guard when you went down. You have read every name in this school tonight, and the one you cannot read is chalked on a dormitory door in letters nobody has taught you. You decided a year ago that somebody was being funny. You have never asked who.'
          : 'Four words cut in stone tonight, and you read them without thinking. Wren\'s name is chalked on the dormitory door in letters nobody has taught you, in handwriting you know. You decided a year ago that somebody was being funny. Four floors down, you have started to wonder who wrote it.' });
      }

      /* ================= LISTENER — the order the door hums ================= */
      if (roleId === 'listener') {
        P.sight.push({ t: 'h', text: 'The door hums' });
        P.sight.push({ t: 'p', text: 'Touch a dial and the door hums four notes under it. You are the only one who hears how far the tune steps.' });
        P.sight.push({ t: 'audio', label: 'The door — four notes', strip: CA.strip([1, 3, -2]), play: (A) => CA.playSteps(A, [1, 3, -2]),
          text: '**Up one, up three, down two.** Four words, three steps. Of every order four words could be turned in, only one climbs like that.' });
        P.sight.push({ t: 'html', html: dialsUnheard() });
        P.sight.push({ t: 'fine', text: 'An order guessed is a whole count spent, and the door counts once.' });
        P.sight.push({ t: 'fine', text: 'You never hear a word\'s name, and you never hear which dial moved. The words belong to the Reader. The dials belong to the Seer.' });
        P.wren.push({ t: 'h', text: 'The steps behind you' });
        P.wren.push({ t: 'html', html: `<div class="heartbeats">${['Reader', 'Listener', 'Seer', 'Binder'].map(n => `<div class="hb"><span>${n}</span>${D.trace('normal')}</div>`).join('')}<div class="hb"><span>the Ember</span>${D.trace('flat')}</div><div class="hb"><span>Wren</span>${D.trace('flat')}</div></div>` });
        P.wren.push({ t: 'p', text: 'The Ember is a stone in a box and you did not expect a heart. ' + (lost ? 'Wren is two floors up, under guard.' : 'Wren promised to stay put.') + ' Then footsteps on the stair behind you, light and quick and familiar, and no heart walking with them. You have heard those feet every day for a year. Until this stair it never occurred to you that you have only ever heard the feet.' });
      }

      /* ================= SEER — which hole each plinth was cut to stand in ================= */
      if (roleId === 'seer') {
        P.sight.push({ t: 'h', text: 'Under the antechamber' });
        P.sight.push({ t: 'p', text: 'This floor is newer than the room. Under it, four holes are still cut in the old stone, one at each dial.' });
        P.sight.push({ t: 'p', text: 'Each hole was cut to fit one plinth and no other. Not one plinth is standing in the hole cut for it.' });
        P.sight.push({ t: 'svg', cls: 'underlayer', svg: underFloor });
        P.sight.push({ t: 'p', text: '**Plinth 1 was cut for the hole at dial 2. Plinth 2 for dial 3. Plinth 3 for dial 4. Plinth 4 for dial 1.** Say all four out loud.' });
        P.sight.push({ t: 'fine', text: 'A word set on the wrong dial is the whole count wrong, and the door counts once.' });
        P.sight.push({ t: 'fine', text: 'Behind the first plinth, at knee height, a hollow the rebuilders missed. The stone strip in it begins at its right-hand end, where the mark is cut.' });
        P.sight.push({ t: 'fine', text: 'Whether the door goes by the holes or by the floor above them is not yours to say. Somebody here keeps the rules.' });
        P.wren.push({ t: 'h', text: 'Reaching' });
        P.wren.push({ t: 'svg', cls: 'underlayer', svg: underStair });
        P.wren.push({ t: 'p', text: 'In the dormitory it leaned toward the lamp and you called it the lamp. Down here there is no lamp, only a cold stone in a box that gives no light a shadow should want. ' + (lost ? 'Wren is meant to be on the dais, under guard.' : 'Wren is meant to be with the Provost.') + ' You are going to watch that shadow reach anyway. You already knew you would.' });
      }

      /* ================= BINDER — which of the two rules is the older ================= */
      if (roleId === 'binder') {
        P.sight.push({ t: 'h', text: 'Two rules, and which one binds' });
        P.sight.push({ t: 'html', html: laws([13, 9, 3]) });
        P.sight.push({ t: 'p', text: 'Two of those say opposite things, and the third settles it. The newer one was written in 212 — the year this room was rebuilt and the statues were put back.' });
        P.sight.push({ t: 'html', html: twoBands() });
        P.sight.push({ t: 'p', text: '**The older binds.** A plinth faces the hole it was cut to stand in, not the dial it happens to stand over.' });
        P.sight.push({ t: 'fine', text: 'Go by the floor and every word lands on the wrong dial. The door counts once.' });
        P.sight.push({ t: 'fine', text: 'You cannot read a shape, hear a note, or see under a floor. Ask for all three.' });
        P.wren.push({ t: 'h', text: 'The same nothing' });
        P.wren.push({ t: 'html', html: '<ul class="blk-list">'
          + '<li>' + threadLine('none') + ' <strong>The Ember:</strong> nothing. It is a stone, and stones are not bound.</li>'
          + '<li>' + threadLine('none') + ' <strong>Wren:</strong> the same nothing, for the fourteenth year running.</li>'
          + '<li>' + threadLine('whole') + ' <strong>The Provost and the four of you:</strong> a thin red thread, new tonight.</li>'
          + '</ul>' });
        P.wren.push({ t: 'p', text: 'The stone did not trouble you. ' + (lost ? 'Vane\'s gold still runs to Wren, and it no longer runs towards the dais.' : 'Vane\'s gold still runs to Wren, so he has not left the school.') + ' You have never asked yourself why the two nothings feel different — or whether they are.' });
      }

      return P;
    },
  });
})();
