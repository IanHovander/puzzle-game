/* Companion — Chapter II: The Ember Vault (KNOT · cast: VOTE_LOST).
   One fact each, and no page holds another's: the Reader has the word cut into each plinth, the Listener
   the order the door hums, the Seer which hole each plinth was cut to stand in, the Binder which of the
   three ways to count binds. */
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

  /* A thread, drawn four ways: whole (red), gold, gray, and absent. */
  const threadLine = (kind) => `<svg viewBox="0 0 90 16" style="width:74px;height:14px;vertical-align:middle">${
    kind === 'whole' ? `<path d="M4,8 C24,2 34,14 52,8 S74,4 86,8" fill="none" stroke="${RED}" stroke-width="2.5" stroke-linecap="round"/>`
      : kind === 'gold' ? '<path d="M4,8 C24,2 34,14 52,8 S74,4 86,8" fill="none" stroke="#d4a94e" stroke-width="2.5" stroke-linecap="round"/>'
      : kind === 'gray' ? '<path d="M4,8 C24,2 34,14 52,8 S74,4 86,8" fill="none" stroke="#9a9aa6" stroke-width="2" stroke-linecap="round" stroke-dasharray="10 4"/>'
      : '<path d="M4,8 L86,8" fill="none" stroke="rgba(255,255,255,.45)" stroke-width="2" stroke-dasharray="3 7" stroke-linecap="round"/>'
  }</svg>`;

  /* Under the stair: the four on the upper side, Wren across the gap on the lower, and the case beyond
     Wren. Four shadows fall away from its cold light. Wren's falls the wrong way, toward it: the solid
     violet stroke reaches for the case, and the faint dashed one is where a shadow ought to fall. */
  const underStair = `<svg viewBox="0 94 360 160">
    <rect y="94" width="360" height="160" fill="#000"/>
    <g stroke="#fff" fill="none" stroke-width="1.2">
      <path d="M10,156 L120,156 L120,176 L150,176"/><path d="M210,176 L240,176 L240,196 L350,196"/>
      <path d="M150,176 L150,222 M210,176 L210,222" stroke-dasharray="3 3" opacity=".6"/>
      <rect x="318" y="164" width="24" height="28" rx="3"/>
      <path d="M330,170 C334,174 336,178 336,181 C336,185 333,188 330,188 C327,188 324,185 324,181 C324,178 326,174 330,170 Z" fill="${SEA}" stroke="none" opacity=".9"/>
    </g>
    <g fill="#fff" opacity=".9"><circle cx="40" cy="142" r="6"/><circle cx="70" cy="136" r="6"/><circle cx="100" cy="142" r="6"/><circle cx="132" cy="162" r="6"/></g>
    <g stroke="#fff" stroke-width="3" opacity=".55" stroke-linecap="round"><path d="M40,142 L14,156"/><path d="M70,136 L44,152"/><path d="M100,142 L76,156"/><path d="M132,162 L117,172"/></g>
    <circle cx="290" cy="182" r="6" fill="${V}"/>
    <path d="M290,184 C298,184 306,182 316,178" stroke="${V}" stroke-width="3" opacity=".9" fill="none" stroke-linecap="round"/>
    <path d="M290,184 L258,194" stroke="${V}" stroke-width="1.2" fill="none" stroke-dasharray="2 3" opacity=".6"/>
    <g fill="#fff" font-size="13.5" ${F} text-anchor="middle"><text x="36" y="176">Reader</text><text x="68" y="122">Listener</text><text x="92" y="176">Seer</text><text x="140" y="146">Binder</text><text x="290" y="216" fill="${V}">Wren</text></g>
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
        P.sight.push({ t: 'p', text: 'Everyone else sees them worn smooth. You see them clean.' });
        P.sight.push({ t: 'table', head: ['cut into the plinth', 'and it says'], rows: PLINTHS.map(p => [
          `<b>Plinth ${p.n}</b><br>${G.shapeSvg(p.shape, p.inv, { size: 34, color: AMBER })}`,
          `<b>${G.read(p.shape, p.inv)}</b>`,
        ]) });
        P.sight.push({ t: 'p', text: '**THORN, VEIL, EMBER, KNOT.** Say them out loud, with their numbers. Any other word wastes the count, and the door counts once.' });
        /* The strip's two readings are the niche's to say, on the Hearth, when the table finds it. */
        P.sight.push({ t: 'fine', text: 'If a strip of three shapes turns up tonight, find its mark before you read it. From the wrong end, these shapes lie.' });
        P.wren.push({ t: 'h', text: 'Every word but one' });
        P.wren.push({ t: 'fine', text: 'Say it to Wren, out loud:' });
        /* "Stone all night": true on every path, the niche's strip or not. */
        P.wren.push({ t: 'letter', text: '“I read stone all night, and I still can’t read your name. It’s the only one I want. The chalk on our door is in a hand I’ve seen before. I’m working out whose.”' });
      }

      /* ================= LISTENER — the order the door hums ================= */
      if (roleId === 'listener') {
        P.sight.push({ t: 'h', text: 'The door hums' });
        P.sight.push({ t: 'p', text: 'The door hums four notes, over and over. Only you hear how far the tune steps.' });
        P.sight.push({ t: 'audio', label: 'The door — four notes', strip: CA.strip([1, 3, -2]), play: (A) => CA.playSteps(A, [1, 3, -2]),
          text: '**Up one, up three, down two.** Your **Book** gives each word its own rung.' });
        P.sight.push({ t: 'html', html: dialsUnheard() });
        P.sight.push({ t: 'fine', text: 'Ask the Reader for the four words. Only one order of them moves like that. Say it before anyone guesses: the door counts once.' });
        P.wren.push({ t: 'h', text: 'The steps behind you' });
        P.wren.push({ t: 'html', html: `<div class="heartbeats">${['Reader', 'Listener', 'Seer', 'Binder'].map(n => `<div class="hb"><span>${n}</span>${D.trace('normal')}</div>`).join('')}<div class="hb"><span>the Ember <small>(slow, like the Hearth)</small></span>${D.trace('slow')}</div><div class="hb"><span>Wren</span>${D.trace('flat')}</div></div>` });
        P.wren.push({ t: 'fine', text: 'Say it to Wren, out loud:' });
        /* ch0: "I've never once heard yours." The trace above is flat. */
        P.wren.push({ t: 'letter', text: '“I heard you on the stair behind us. Just your feet… never your heart. I turned around nine times. Next time, walk with us? So I don’t have to wonder.”' });
      }

      /* ================= SEER — which hole each plinth was cut to stand in ================= */
      if (roleId === 'seer') {
        P.sight.push({ t: 'h', text: 'Under the antechamber' });
        P.sight.push({ t: 'p', text: 'Under the floor are four old holes, each cut to fit one plinth. Not one plinth is standing in the hole cut for it.' });
        P.sight.push({ t: 'svg', cls: 'underlayer', svg: underFloor });
        P.sight.push({ t: 'p', text: '**Plinth 1 was cut for the hole at dial 3. Plinth 2 for dial 4. Plinth 3 for dial 2. Plinth 4 for dial 1.** Say all four out loud.' });
        P.sight.push({ t: 'fine', text: 'Behind the first plinth, at knee height, is a hollow the rebuilders missed. The stone strip in it begins at its right-hand end, where the mark is cut.' });
        P.sight.push({ t: 'fine', text: 'Which count the door obeys is not yours to say.' });
        P.wren.push({ t: 'h', text: 'Reaching' });
        P.wren.push({ t: 'svg', cls: 'underlayer', svg: underStair });
        P.wren.push({ t: 'fine', text: 'Say it to Wren, out loud:' });
        /* ch1: "Nobody saw but me and Seat 7, and she wrote it down." Canon: anyone near a light can see it,
           and the Seer stands in the way (FIXLATER r9). */
        P.wren.push({ t: 'letter', text: '“Your shadow went for that box before your hands did. Last time, Seat 7 saw. This time, I stood in the way. Honestly, Wren. A cold glass box. Your shadow has terrible taste.”' });
      }

      /* ================= BINDER — which of the three ways to count binds ================= */
      if (roleId === 'binder') {
        P.sight.push({ t: 'h', text: 'Three ways to count, and which one binds' });
        /* The Book's Laws say "faces". Said plainly here: which dial the plinth's word goes on. */
        P.sight.push({ t: 'p', text: 'Two Laws in your **Book** disagree. Law 9 is from 212, the year this room was rebuilt. It puts a plinth’s word on the dial it stands over.' });
        P.sight.push({ t: 'html', html: twoBands() });
        P.sight.push({ t: 'p', text: 'Law 13 is from Year 0. It puts the word on the dial over the hole the plinth was cut for. Law 3 says **the older Law binds.**' });
        P.sight.push({ t: 'p', text: 'The school drills a third way: the words in the order the door hums, on dials one, two, three, four. **That is a drill, not a Law**, and younger than both.' });
        P.sight.push({ t: 'fine', text: 'In 212 the Convocation also struck Law 0, the one about four hands.' });
        P.sight.push({ t: 'fine', text: 'You cannot read a shape, hear a note, or see under a floor. Ask for all three.' });
        P.wren.push({ t: 'h', text: 'The same nothing' });
        P.wren.push({ t: 'html', html: '<ul class="blk-list">'
          + '<li>' + threadLine('whole') + ' <strong>The four plinths:</strong> old red threads, into the Ember’s case. They stop there.</li>'
          + '<li>' + threadLine('none') + ' <strong>The Ember:</strong> no thread of its own. Fire makes no promises.</li>'
          + '<li>' + threadLine('none') + ' <strong>Wren:</strong> the same nothing. You check every day.</li>'
          + '<li>' + threadLine('gray') + ' <strong>The Provost to Wren:</strong> gray again. This time it stays.</li>'
          + '<li>' + threadLine('gold') + ' <strong>Vane to Wren:</strong> gold, still. ' + (lost ? 'It no longer runs toward the dais.' : 'Vane has not left the school.') + '</li>'
          + '<li>' + threadLine('whole') + ' <strong>The Provost and the four of you:</strong> red, new tonight. She asked, and you went.</li>'
          + '</ul>' });
        P.wren.push({ t: 'fine', text: 'Say it to Wren, out loud:' });
        P.wren.push({ t: 'letter', text: '“The Ember has no thread. Neither do you. I have checked every rule, and none says that makes you the same. So you are not. I am still tying one.”' });
      }

      return P;
    },
  });
})();
