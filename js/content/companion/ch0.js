/* Companion — Prologue (KINDLE). Four pages, one puzzle fact each: the Reader has the words,
   the Listener the order, the Seer the cuts, the Binder the rule. No page holds another's answer. */
(function () {
  'use strict';
  const G = window.VigilGlyphs, L = window.VigilLore, CA = window.CompanionAudio, D = window.CompanionDraw;
  const C = window.CompanionContent;

  /* The lamp's collar, drawn as a ring so the page cannot imply an order.
     Crown sits left, Flame right — the reverse of the answer, so reading left to right fails. */
  const collar = () => `<svg viewBox="0 0 300 176">
    <circle cx="150" cy="88" r="62" fill="none" stroke="rgba(212,169,78,.35)" stroke-width="11"/>
    <g transform="translate(88,88) scale(1.15)" style="color:#f2d27a">${G.shapeInner('Crown', true)}</g>
    <g transform="translate(212,88) scale(1.15)" style="color:#f2d27a">${G.shapeInner('Flame', false)}</g>
    <text x="150" y="170" text-anchor="middle" fill="rgba(233,226,210,.55)" font-size="11" font-family="Cinzel,serif">the band runs all the way round \u00b7 no first, no last</text>
  </svg>`;

  /* The Listener's interval, drawn: two rungs of the ladder and the climb between them. */
  const ladder3 = () => `<svg viewBox="0 0 200 96" style="width:170px;height:82px">
    ${[0, 1, 2, 3, 4].map(i => `<line x1="30" y1="${84 - i * 16}" x2="86" y2="${84 - i * 16}" stroke="rgba(255,255,255,.25)" stroke-width="2"/>`).join('')}
    <circle cx="58" cy="84" r="7" fill="#4fb3bf"/><circle cx="58" cy="36" r="7" fill="#4fb3bf"/>
    <path d="M110,84 L110,36" stroke="#4fb3bf" stroke-width="2"/><path d="M110,30 l-5,10 l10,0 Z" fill="#4fb3bf"/>
    <text x="132" y="46" fill="#4fb3bf" font-size="18" font-family="Cinzel,serif">+3</text>
    <text x="58" y="16" text-anchor="middle" fill="rgba(255,255,255,.55)" font-size="9" font-family="Cinzel,serif">second note</text>
  </svg>`;

  /* The Binder's rule, drawn: a ring, a mark, and the count running clockwise from it. */
  const lawRing = () => `<svg viewBox="0 0 150 150" style="width:130px;height:130px">
    <circle cx="75" cy="75" r="46" fill="none" stroke="rgba(255,255,255,.35)" stroke-width="1.5"/>
    ${[0, 1, 2, 3].map(i => { const a = (i / 4 * 360 - 135) * Math.PI / 180, x = 75 + Math.cos(a) * 46, y = 75 + Math.sin(a) * 46;
      return `<circle cx="${x.toFixed(1)}" cy="${y.toFixed(1)}" r="11" fill="${i === 0 ? 'rgba(164,130,230,.25)' : 'none'}" stroke="${i === 0 ? '#a482e6' : 'rgba(255,255,255,.4)'}" stroke-width="1.5"/><text x="${x.toFixed(1)}" y="${(y + 4).toFixed(1)}" text-anchor="middle" fill="#fff" font-size="11" font-family="Cinzel,serif">${i + 1}</text>`; }).join('')}
    <path d="M96,18 a60,60 0 0 1 34,40" fill="none" stroke="#a482e6" stroke-width="2"/><path d="M130,58 l-8,-3 l1,9 Z" fill="#a482e6"/>
    <text x="40" y="24" text-anchor="middle" fill="#a482e6" font-size="9" font-family="Cinzel,serif">the mark</text>
    <text x="75" y="142" text-anchor="middle" fill="rgba(255,255,255,.6)" font-size="9" font-family="Cinzel,serif">first word in it, then clockwise</text>
  </svg>`;

  /* A thread, drawn three ways: whole, broken, absent. */
  const threadLine = (kind) => `<svg viewBox="0 0 90 16" style="width:74px;height:14px;vertical-align:middle">${
    kind === 'whole' ? '<path d="M4,8 C24,2 34,14 52,8 S74,4 86,8" fill="none" stroke="#d96b4a" stroke-width="2.5" stroke-linecap="round"/>'
    : kind === 'broken' ? '<path d="M4,8 C16,3 24,12 36,9" fill="none" stroke="#d96b4a" stroke-width="2.5" stroke-linecap="round"/><path d="M56,9 C68,6 76,11 86,8" fill="none" stroke="#d96b4a" stroke-width="2.5" stroke-linecap="round"/>'
    : '<path d="M6,2 L2,2 L2,14 L6,14 M84,2 L88,2 L88,14 L84,14" fill="none" stroke="rgba(255,255,255,.35)" stroke-width="2"/>'
  }</svg>`;

  // Seer under-layer of the dormitory: four shadows away from the lamp, Wren's toward it.
  const underDorm = `<svg viewBox="0 0 360 220">
    <rect width="360" height="220" fill="#000"/>
    <g stroke="#fff" fill="none" stroke-width="1.2">
      <rect x="10" y="10" width="340" height="200"/>
      <rect x="20" y="30" width="60" height="30"/><rect x="20" y="90" width="60" height="30"/><rect x="20" y="150" width="60" height="30"/><rect x="280" y="30" width="60" height="30"/>
      <circle cx="300" cy="150" r="14"/><path d="M300,136 L300,120 M292,124 L308,124"/>
      <text x="300" y="185" text-anchor="middle" fill="#fff" font-size="10" font-family="Cinzel,serif">the lamp</text>
    </g>
    <g fill="#fff" opacity=".9">
      <circle cx="120" cy="100" r="6"/><circle cx="160" cy="70" r="6"/><circle cx="170" cy="140" r="6"/><circle cx="210" cy="110" r="6"/><circle cx="240" cy="150" r="6"/>
    </g>
    <g stroke="#fff" stroke-width="3" opacity=".55" stroke-linecap="round">
      <path d="M120,100 L80,88"/><path d="M160,70 L124,52"/><path d="M170,140 L134,138"/><path d="M210,110 L178,96"/>
    </g>
    <g stroke="#a482e6" stroke-width="3" opacity=".9" stroke-linecap="round"><path d="M240,150 L276,150"/></g>
    <g fill="#fff" font-size="9" font-family="Cinzel,serif"><text x="112" y="118">Reader</text><text x="150" y="60">Listener</text><text x="158" y="158">Seer</text><text x="202" y="128">Binder</text><text x="230" y="168" fill="#a482e6">Wren</text></g>
    <text x="180" y="210" text-anchor="middle" fill="#fff" font-size="9" font-family="Cinzel,serif" opacity=".7">shadows, as they fall</text>
  </svg>`;

  /* Under the lamp's foot: four sockets, numbered as the Hearth numbers them, and TWO cuts.
     No carving, no arrow, no rule — the Seer reports cuts, not meanings. */
  const underFoot = `<svg viewBox="0 0 360 240">
    <rect width="360" height="240" fill="#000"/>
    <g transform="translate(180,120)">
      <circle r="68" fill="none" stroke="#fff" stroke-width="1.5"/>
      ${[0, 1, 2, 3].map(i => { const a = (i / 4 * 360 - 90) * Math.PI / 180, x = (Math.cos(a) * 68).toFixed(1), y = (Math.sin(a) * 68).toFixed(1), hot = i === 2;
        return `<circle cx="${x}" cy="${y}" r="16" fill="none" stroke="${hot ? '#a482e6' : '#fff'}" stroke-width="${hot ? 2.5 : 1.5}"/><text x="${x}" y="${(+y + 4).toFixed(1)}" text-anchor="middle" fill="${hot ? '#a482e6' : '#fff'}" font-size="12" font-family="Cinzel,serif">${i + 1}</text>`; }).join('')}
    </g>
    <g stroke="#fff" stroke-width="2" stroke-linecap="round" opacity=".85"><path d="M174,34 L180,24 L186,34"/></g>
    <text x="180" y="16" text-anchor="middle" fill="rgba(255,255,255,.8)" font-size="10" font-family="Cinzel,serif">a small notch</text>
    <g stroke="#a482e6" stroke-width="2.5" stroke-linecap="round"><path d="M166,214 L196,206"/><path d="M170,221 L191,215"/></g>
    <text x="180" y="236" text-anchor="middle" fill="#a482e6" font-size="10" font-family="Cinzel,serif">a scratch \u2014 long, deliberate</text>
  </svg>`;

  C.chapters.push({
    id: 'ch0',
    pages: (roleId, ctx) => {
      const P = { sight: [], wren: [], speak: [] };
      P.speak.push({ t: 'fine', text: 'Nothing to speak yet. The Hearth will tell you when.' });

      if (roleId === 'reader') {
        P.sight.push({ t: 'h', text: 'The lamp\u2019s collar' });
        P.sight.push({ t: 'p', text: 'Two shapes are cut into the brass band around the lamp\u2019s neck. The Hearth shows them worn to nothing. On your page they are clean.' });
        P.sight.push({ t: 'html', html: collar() });
        P.sight.push({ t: 'p', text: 'The band is a circle. It has no left end and no right end, so nothing about it says which shape was cut first.' });
        P.sight.push({ t: 'p', text: 'You can still read them, and that is your whole gift. It is one rule: **a shape standing up says one word; the same shape upside down says the opposite word.**' });
        P.sight.push({ t: 'table', head: ['cut into the band', 'it says'], rows: [
          [`${G.shapeSvg('Crown', true, { size: 44, color: '#f2d27a' })} upside down`, '<b>EMBER</b> \u2014 <em>what remains; to keep; to close</em>'],
          [`${G.shapeSvg('Flame', false, { size: 44, color: '#f2d27a' })} standing up`, '<b>ASH</b> \u2014 <em>fire; the Hearth; warmth</em>'],
        ] });
        P.sight.push({ t: 'fine', text: 'Turn either one over and it says its opposite: the crown standing up would read **CROWN**; the flame upside down would read **COLD**. They are not the other way up. Not tonight.' });
        P.sight.push({ t: 'p', text: 'So the lamp has two words: **EMBER** and **ASH**. Say them both, out loud, now.' });
        P.sight.push({ t: 'p', text: 'Which one the sigil starts with, the brass cannot tell you \u2014 a circle has no beginning. Somebody at this table can *hear* which.' });
        P.sight.push({ t: 'fine', text: 'Every shape and both of its words live in your **Book**, all night. There is nothing to write down.' });
        P.wren.push({ t: 'h', text: 'The name on the door' });
        P.wren.push({ t: 'p', text: 'Every fourth-year\u2019s name is chalked on the dormitory door. Wren\u2019s is there twice: once in our letters, and once in letters you have never seen before, in the same hand. You decided, a year ago, that somebody was being funny. You have never asked who.' });
      }

      if (roleId === 'listener') {
        P.sight.push({ t: 'h', text: 'The lamp is humming' });
        P.sight.push({ t: 'p', text: 'It has been humming since before you were born, and nobody else in this room has ever heard it. Two notes. Over and over.' });
        P.sight.push({ t: 'audio', label: 'The lamp, two notes', strip: CA.strip([3]), play: (A) => CA.playSteps(A, [3]), text: 'The second note is **three steps above** the first. It climbs.' });
        P.sight.push({ t: 'html', html: ladder3() });
        P.sight.push({ t: 'p', text: '**Two notes. Two words.** That is everything this lamp has to say. There is no third word and no fourth.' });
        P.sight.push({ t: 'p', text: 'Words in the old tongue sit on a ladder, each on its own rung \u2014 your **Book** has the whole of it. When the Reader says the two words, look up their rungs. One order climbs three; the other falls three. The lamp climbs.' });
        P.sight.push({ t: 'fine', text: 'You never hear a word\u2019s name. Every room is tuned differently, so a single note means nothing on its own \u2014 you only ever hear how far the tune steps. You will need the Reader.' });
        P.wren.push({ t: 'h', text: 'How quiet' });
        P.wren.push({ t: 'html', html: `<div class="heartbeats">${['Reader', 'Listener', 'Seer', 'Binder'].map(n => `<div class="hb"><span>${n}</span>${D.trace('normal')}</div>`).join('')}<div class="hb"><span>Wren</span>${D.trace('flat')}</div></div>` });
        P.wren.push({ t: 'p', text: 'You can hear a teacher\u2019s heart through a stone floor. You have never once heard Wren\u2019s. You decided years ago that the fault was yours, and you have never said it out loud to anyone.' });
      }

      if (roleId === 'seer') {
        P.sight.push({ t: 'h', text: 'Under the lamp\u2019s foot' });
        P.sight.push({ t: 'p', text: 'Four sockets are set around the foot, with four hundred years of polish on top of them. Under the polish there are **two** cuts, and both were made before this brass was ever cleaned once.' });
        P.sight.push({ t: 'p', text: 'A long, deliberate **scratch** under the socket the Hearth numbers **3** \u2014 the one at the bottom. A small **notch** under socket **1**, at the top.' });
        P.sight.push({ t: 'svg', cls: 'underlayer', svg: underFoot });
        P.sight.push({ t: 'fine', text: 'Somebody meant both of those. Which one matters is not yours to know \u2014 that is the Binder\u2019s half of the job. Just say what is cut, and where.' });
        P.sight.push({ t: 'fine', text: 'Your Ring Page is in the **Book**.' });
        P.wren.push({ t: 'h', text: 'The shadow' });
        P.wren.push({ t: 'svg', cls: 'underlayer', svg: underDorm });
        P.wren.push({ t: 'p', text: 'Every shadow in this room falls away from the lamp. Wren\u2019s falls toward it. You decided months ago it was a trick of the light. You are looking straight at it now, in the light you just made. It is not the light. It never was.' });
      }

      if (roleId === 'binder') {
        P.sight.push({ t: 'h', text: 'How a sigil is written' });
        P.sight.push({ t: 'p', text: 'You are the only person at this table who was ever taught this, and it is four lines long.' });
        P.sight.push({ t: 'html', html: `<div class="laws"><div class="law founders"><div class="era">Law 1 \u00b7 Founders\u2019 \u00b7 Year 0</div><div class="txt">A sigil is read sunwise from the mark.</div></div></div>` });
        P.sight.push({ t: 'list', items: [
          'A ring carries **cuts** \u2014 a scratch, a notch, a chip in the glaze. You cannot see them; somebody here can. **A sigil begins at the scratch. A notch is only the maker\u2019s mark: it says somebody made this, and nothing else.**',
          'The **first** word goes **in** the marked slot. Not after it, not before it. In it.',
          'Every word after that goes into the next slot **sunwise** \u2014 clockwise, the way the numbers count up.',
          'A sigil is its words and nothing else. **One slot per word, and every slot the words do not reach stays empty.** A spare glyph is not decoration; it is a different sigil, and the brass can tell.',
        ] });
        P.sight.push({ t: 'html', html: lawRing() });
        P.sight.push({ t: 'fine', text: 'You do not know this lamp\u2019s words and you cannot see what is cut into it. Ask for both. That is what the other three are for.' });
        P.wren.push({ t: 'h', text: 'No thread' });
        P.wren.push({ t: 'html', html: '<ul class="blk-list">'
          + '<li>' + threadLine('whole') + ' <strong>Reader and Listener:</strong> an old red thread, well knotted.</li>'
          + '<li>' + threadLine('broken') + ' <strong>Seer and you:</strong> last week\u2019s practice thread still will not hold.</li>'
          + '<li>' + threadLine('none') + ' <strong>Wren:</strong> nothing. No thread at all, to anyone.</li>'
          + '</ul>' });
        P.wren.push({ t: 'p', text: 'You have seen unbound people. This is not that \u2014 there is nothing there to see. You decided it was a blind spot in your own gift. You have never told anyone your gift has a blind spot.' });
      }

      return P;
    },
  });
})();
