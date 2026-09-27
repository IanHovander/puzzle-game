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
    { n: 1, shape: 'Spike', inv: false },   // THORN
    { n: 2, shape: 'Hook', inv: true },     // VEIL
    { n: 3, shape: 'Crown', inv: true },    // EMBER
    { n: 4, shape: 'Hook', inv: false },    // KNOT
  ];
  const CUTFOR = [3, 4, 2, 1];              // plinth 1..4 -> the hole under that dial

  /* Under the antechamber: four plinths as they stand, and under the gray floor the four holes they were
     cut for, numbered the way the Hearth numbers the dials. One violet line each and nothing else — no
     arrow to a rule and no word about which floor the door obeys. The Seer reports holes, not rules. */
  const underFloor = (() => {
    /* Sized for a phone: the figure shows ~318px wide, so a viewBox 340 wide keeps 13.5-unit type at ~12.5px. */
    const xs = [90, 164, 238, 312];
    let s = `<svg viewBox="0 30 340 230"><rect y="30" width="340" height="230" fill="#000"/>`;
    s += `<line x1="4" y1="126" x2="336" y2="126" stroke="#fff" stroke-width="1" opacity=".45"/>`;
    s += `<rect x="18" y="96" width="26" height="24" rx="3" fill="none" stroke="${V}" stroke-width="1.5" stroke-dasharray="3 2"/>`;
    s += `<text x="4" y="88" fill="${V}" font-size="13.5" ${F}>a hollow</text>`;
    xs.forEach((x, i) => {
      s += `<path d="M${x - 8},118 L${x - 6},72 C${x - 6},62 ${x + 6},62 ${x + 6},72 L${x + 8},118 Z" fill="none" stroke="#fff" stroke-width="1.2"/>`;
      s += `<rect x="${x - 20}" y="118" width="40" height="8" fill="none" stroke="#fff" stroke-width="1.2"/>`;
      s += `<text x="${x}" y="54" text-anchor="middle" fill="#fff" font-size="15" ${F}>${i + 1}</text>`;
      s += `<rect x="${x - 22}" y="176" width="44" height="12" rx="2" fill="none" stroke="#fff" stroke-width="1" stroke-dasharray="3 2" opacity=".7"/>`;
      s += `<circle cx="${x}" cy="213" r="15" fill="none" stroke="#fff" stroke-width="1.3"/><text x="${x}" y="218" text-anchor="middle" fill="#fff" font-size="14" ${F}>${i + 1}</text>`;
    });
    xs.forEach((x, i) => {
      const tx = xs[CUTFOR[i] - 1];
      s += `<path d="M${x},130 C${x},154 ${tx},150 ${tx},172" fill="none" stroke="${V}" stroke-width="2" opacity=".95"/>`;
      s += `<path d="M${tx - 4},165 L${tx},174 L${tx + 4},165" fill="none" stroke="${V}" stroke-width="2"/>`;
    });
    s += `<text x="170" y="250" text-anchor="middle" fill="${V}" font-size="13" ${F}>the hole each plinth was cut to stand in</text>`;
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
    <text x="14" y="22" fill="rgba(255,255,255,.55)" font-size="11.5" ${F}>YEAR 212</text>
    <rect x="70" y="26" width="26" height="11" fill="none" stroke="rgba(255,255,255,.5)" stroke-width="1.5"/>
    <path d="M83,39 L83,52" stroke="rgba(255,255,255,.5)" stroke-width="1.5"/><path d="M79,47 L83,54 L87,47" fill="none" stroke="rgba(255,255,255,.5)" stroke-width="1.5"/>
    <circle cx="83" cy="60" r="5" fill="none" stroke="rgba(255,255,255,.5)" stroke-width="1.5"/>
    <path d="M12,64 L240,12" stroke="rgba(255,255,255,.3)" stroke-width="1.5"/>
    <rect x="6" y="80" width="240" height="62" fill="none" stroke="${RED}"/>
    <text x="14" y="96" fill="${RED}" font-size="11.5" ${F}>YEAR 0</text>
    <rect x="70" y="100" width="26" height="11" fill="none" stroke="${RED}" stroke-width="1.5"/>
    <path d="M83,113 C83,126 176,122 176,128" fill="none" stroke="${RED}" stroke-width="2"/><path d="M172,122 L177,131 L181,122" fill="none" stroke="${RED}" stroke-width="2"/>
    <circle cx="83" cy="134" r="5" fill="none" stroke="rgba(255,255,255,.22)" stroke-width="1.2" stroke-dasharray="2 2"/>
    <circle cx="178" cy="136" r="5" fill="none" stroke="${RED}" stroke-width="1.5"/>
    <text x="126" y="165" text-anchor="middle" fill="${RED}" font-size="11" ${F}>the older band is the one that binds</text>
  </svg>`;

  /* A thread, drawn two ways: whole, and absent. */
  const threadLine = (kind) => `<svg viewBox="0 0 90 16" style="width:74px;height:14px;vertical-align:middle">${
    kind === 'whole' ? `<path d="M4,8 C24,2 34,14 52,8 S74,4 86,8" fill="none" stroke="${RED}" stroke-width="2.5" stroke-linecap="round"/>`
      : '<path d="M4,8 L86,8" fill="none" stroke="rgba(255,255,255,.45)" stroke-width="2" stroke-dasharray="3 7" stroke-linecap="round"/>'
  }</svg>`;

  /* Under the stair: four shadows fall away from the cold light, and Wren's reaches for it. */
  const underStair = `<svg viewBox="0 94 360 160">
    <rect y="94" width="360" height="160" fill="#000"/>
    <g stroke="#fff" fill="none" stroke-width="1.2">
      <path d="M10,196 L120,196 L120,176 L150,176"/><path d="M210,176 L240,176 L240,156 L350,156"/>
      <path d="M150,176 L150,222 M210,176 L210,222" stroke-dasharray="3 3" opacity=".6"/>
      <rect x="268" y="108" width="26" height="30" rx="3"/>
      <path d="M281,116 C285,120 287,124 287,127 C287,131 284,134 281,134 C278,134 275,131 275,127 C275,124 277,120 281,116 Z" fill="${SEA}" stroke="none" opacity=".9"/>
    </g>
    <g fill="#fff" opacity=".9"><circle cx="40" cy="182" r="6"/><circle cx="70" cy="176" r="6"/><circle cx="100" cy="182" r="6"/><circle cx="130" cy="166" r="6"/></g>
    <g stroke="#fff" stroke-width="3" opacity=".55" stroke-linecap="round"><path d="M40,182 L14,196"/><path d="M70,176 L44,192"/><path d="M100,182 L76,196"/><path d="M130,166 L108,182"/></g>
    <circle cx="300" cy="146" r="6" fill="${V}"/>
    <path d="M300,146 L340,144" stroke="${V}" stroke-width="3" opacity=".9" stroke-linecap="round"/>
    <path d="M300,146 C295,136 285,130 281,124" stroke="${V}" stroke-width="1.2" fill="none" stroke-dasharray="2 2"/>
    <g fill="#fff" font-size="13.5" ${F} text-anchor="middle"><text x="36" y="214">Reader</text><text x="62" y="160">Listener</text><text x="104" y="214">Seer</text><text x="136" y="148">Binder</text><text x="300" y="176" fill="${V}">Wren</text></g>
    <text x="180" y="244" text-anchor="middle" fill="#fff" font-size="13" ${F} opacity=".75">four shadows fall away. One reaches.</text>
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
        P.sight.push({ t: 'p', text: 'The Hearth shows them worn smooth. You see them clean.' });
        P.sight.push({ t: 'table', head: ['cut into the plinth', 'and it says'], rows: PLINTHS.map(p => [
          `<b>Plinth ${p.n}</b><br>${G.shapeSvg(p.shape, p.inv, { size: 34, color: AMBER })}`,
          `<b>${G.read(p.shape, p.inv)}</b>`,
        ]) });
        P.sight.push({ t: 'p', text: '**THORN, VEIL, EMBER, KNOT.** Say them out loud, with their numbers. Any other word wastes the count, and the door counts once.' });
        P.sight.push({ t: 'fine', text: 'If a strip of three shapes turns up tonight, it reads two ways. From the left: *one went down alone and kept it.* From the other end: *four, as one, went through.*' });
        P.wren.push({ t: 'h', text: 'Four words, and one name' });
        P.wren.push({ t: 'p', text: (lost ? 'Wren was under guard when you went down. ' : '')
          + 'You read four words in stone tonight without trying. Wren’s name on the dormitory door, you still cannot. The chalk is in a hand you have seen before. You have started to wonder who wrote it.' });
        P.wren.push({ t: 'fine', text: 'Say it to Wren, out loud:' });
        P.wren.push({ t: 'letter', text: '“I read four words in stone tonight, first try. Your name, I still can’t. It’s the only one I want. I’ve copied it into the back of every book I own.”' });
      }

      /* ================= LISTENER — the order the door hums ================= */
      if (roleId === 'listener') {
        P.sight.push({ t: 'h', text: 'The door hums' });
        P.sight.push({ t: 'p', text: 'Touch a dial and the door hums four notes. Only you hear how far the tune steps.' });
        P.sight.push({ t: 'audio', label: 'The door — four notes', strip: CA.strip([1, 3, -2]), play: (A) => CA.playSteps(A, [1, 3, -2]),
          text: '**Up one, up three, down two.** Only one order of the four words climbs like that.' });
        P.sight.push({ t: 'html', html: dialsUnheard() });
        P.sight.push({ t: 'fine', text: 'Guess the order and you spend the count, and the door counts once. You never hear a word’s name, or which dial moved.' });
        P.wren.push({ t: 'h', text: 'The steps behind you' });
        P.wren.push({ t: 'html', html: `<div class="heartbeats">${['Reader', 'Listener', 'Seer', 'Binder'].map(n => `<div class="hb"><span>${n}</span>${D.trace('normal')}</div>`).join('')}<div class="hb"><span>the Ember</span>${D.trace('slow')}</div><div class="hb"><span>Wren</span>${D.trace('flat')}</div></div>` });
        P.wren.push({ t: 'p', text: 'The Ember has a pulse, slow as the Hearth breathing upstairs. You did not expect that. ' + (lost ? 'Wren was two floors up, under guard.' : 'Wren promised to stay put.') + ' Then light, quick feet on the stair behind you, and no heart with them. You have only ever heard the feet.' });
        P.wren.push({ t: 'fine', text: 'Say it to Wren, out loud:' });
        P.wren.push({ t: 'letter', text: '“I heard you on the stair behind us. Just your feet… nothing else. I kept turning round to check. Next time, just… walk with us? So I don’t have to wonder.”' });
      }

      /* ================= SEER — which hole each plinth was cut to stand in ================= */
      if (roleId === 'seer') {
        P.sight.push({ t: 'h', text: 'Under the antechamber' });
        P.sight.push({ t: 'p', text: 'Under the floor are four old holes, each cut to fit one plinth. Not one plinth is standing in the hole cut for it.' });
        P.sight.push({ t: 'svg', cls: 'underlayer', svg: underFloor });
        P.sight.push({ t: 'p', text: '**Plinth 1 was cut for the hole at dial 3. Plinth 2 for dial 4. Plinth 3 for dial 2. Plinth 4 for dial 1.** Say all four out loud.' });
        P.sight.push({ t: 'fine', text: 'Behind the first plinth, at knee height, is a hollow the rebuilders missed. The stone strip in it begins at its right-hand end, where the mark is cut.' });
        P.sight.push({ t: 'fine', text: 'Which way of counting the door obeys is not yours to say.' });
        P.wren.push({ t: 'h', text: 'Reaching' });
        P.wren.push({ t: 'svg', cls: 'underlayer', svg: underStair });
        P.wren.push({ t: 'p', text: 'In the dormitory you blamed the lamp. The Ember gives no light at all. ' + (lost ? 'Wren was meant to be on the dais, under guard.' : 'Wren was meant to be with the Provost.') + ' On the stair, that shadow reached for the case anyway. So it was never the light.' });
        P.wren.push({ t: 'fine', text: 'Say it to Wren, out loud:' });
        P.wren.push({ t: 'letter', text: '“Your shadow went for that box before your hands did. Nobody else saw, and nobody will hear it from me. Honestly, Wren. A cold box. Your shadow has no taste.”' });
      }

      /* ================= BINDER — which of the two rules is the older ================= */
      if (roleId === 'binder') {
        P.sight.push({ t: 'h', text: 'Three ways to count, and which one binds' });
        P.sight.push({ t: 'p', text: 'Law 13 and Law 9 in your **Book** say opposite things. Law 9 is from 212, the year this room was rebuilt.' });
        P.sight.push({ t: 'html', html: twoBands() });
        P.sight.push({ t: 'p', text: 'Law 3 settles it. **The older Law binds**: a plinth faces the hole it was cut for, not the dial it stands over.' });
        P.sight.push({ t: 'p', text: 'One to four in the order it hums is what the school taught you. **That is a drill, not a Law**, and it is younger than both.' });
        P.sight.push({ t: 'fine', text: 'You cannot read a shape, hear a note, or see under a floor. Ask for all three.' });
        P.wren.push({ t: 'h', text: 'The same nothing' });
        P.wren.push({ t: 'html', html: '<ul class="blk-list">'
          + '<li>' + threadLine('none') + ' <strong>The Ember:</strong> nothing. It is a stone, and stones are not bound.</li>'
          + '<li>' + threadLine('none') + ' <strong>Wren:</strong> the same nothing, for the fourteenth year running.</li>'
          + '<li>' + threadLine('whole') + ' <strong>The Provost and the four of you:</strong> a thin red thread, new tonight.</li>'
          + '</ul>' });
        P.wren.push({ t: 'p', text: 'Four old red threads run from the plinths into the Ember’s case, and stop there. ' + (lost ? 'Vane’s gold still runs to Wren, and it no longer runs toward the dais.' : 'Vane’s gold still runs to Wren, so Vane has not left the school.') + ' You have never asked why the two nothings feel different.' });
        P.wren.push({ t: 'fine', text: 'Say it to Wren, out loud:' });
        P.wren.push({ t: 'letter', text: '“The stone has no thread. Neither do you. I checked every rule, and none says that makes you the same. So you are not. And I am still tying one.”' });
      }

      return P;
    },
  });
})();
