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
    <text x="40" y="24" text-anchor="middle" fill="#a482e6" font-size="9" font-family="Cinzel,serif">the scratch</text>
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

      /* First night only: which tab is for what. Later chapters assume the table has learned it. */
      P.sight.push({ t: 'table', head: ['tab', 'use it'], rows: [
        ['<b>Sight</b>', 'Your clue. Read it now.'],
        ['<b>Wren</b>', 'Only when the Hearth says.'],
        ['<b>Speak</b>', 'Only when the Hearth asks.'],
        ['<b>Book</b>', 'Your notes. Any time.'],
      ] });

      if (roleId === 'reader') {
        P.sight.push({ t: 'h', text: 'The lamp’s collar' });
        P.sight.push({ t: 'p', text: 'Two shapes are cut round the collar. The Hearth shows them worn away. You see them clean.' });
        P.sight.push({ t: 'html', html: collar() });
        P.sight.push({ t: 'table', head: ['cut into the band', 'it says'], rows: [
          [`${G.shapeSvg('Crown', true, { size: 44, color: '#f2d27a' })} upside down`, '<b>EMBER</b>'],
          [`${G.shapeSvg('Flame', false, { size: 44, color: '#f2d27a' })} standing up`, '<b>ASH</b>'],
        ] });
        P.sight.push({ t: 'p', text: '**EMBER and ASH.** Say both words out loud, now.' });
        P.sight.push({ t: 'fine', text: 'A ring has no first word. Somebody here can *hear* which one comes first.' });
        P.wren.push({ t: 'h', text: 'The name on the door' });
        P.wren.push({ t: 'p', text: 'Wren’s name is chalked on the dormitory door twice. Once in our letters. Once in letters you cannot read, in the same hand.' });
        P.wren.push({ t: 'fine', text: 'Say it to Wren, out loud:' });
        P.wren.push({ t: 'letter', text: '“Your name is on our door twice. Once in letters I can’t read. I can read *everything*, Wren. I told myself it was a joke. I never asked whose.”' });
      }

      if (roleId === 'listener') {
        P.sight.push({ t: 'h', text: 'The lamp is humming' });
        P.sight.push({ t: 'p', text: 'Nobody else can hear it. Two notes, over and over.' });
        P.sight.push({ t: 'audio', label: 'The lamp, two notes', strip: CA.strip([3]), play: (A) => CA.playSteps(A, [3]), text: 'The second note is **three steps above** the first.' });
        P.sight.push({ t: 'html', html: ladder3() });
        P.sight.push({ t: 'p', text: 'Two notes, two words. When the Reader says them, find both on the ladder in your **Book**. The order that climbs three is right.' });
        P.sight.push({ t: 'fine', text: 'You never hear a word’s name, only how far the tune steps.' });
        P.wren.push({ t: 'h', text: 'How quiet' });
        P.wren.push({ t: 'html', html: `<div class="heartbeats">${['Reader', 'Listener', 'Seer', 'Binder'].map(n => `<div class="hb"><span>${n}</span>${D.trace('normal')}</div>`).join('')}<div class="hb"><span>Wren</span>${D.trace('flat')}</div></div>` });
        P.wren.push({ t: 'p', text: 'You can hear every heart in this tower. Never Wren’s.' });
        P.wren.push({ t: 'fine', text: 'Say it to Wren, out loud:' });
        P.wren.push({ t: 'letter', text: '“I can hear the cook’s heart through two floors. I’ve never heard yours. Not once. I thought my ears were broken. I’m sorry I never said.”' });
      }

      if (roleId === 'seer') {
        P.sight.push({ t: 'h', text: 'Under the lamp’s foot' });
        P.sight.push({ t: 'p', text: 'Under the polish are **two** old cuts. A long **scratch** under socket **3**. A small **notch** under socket **1**.' });
        P.sight.push({ t: 'svg', cls: 'underlayer', svg: underFoot });
        P.sight.push({ t: 'fine', text: 'Which one matters is the Binder’s call. Say what is cut, and where.' });
        P.wren.push({ t: 'h', text: 'The shadow' });
        P.wren.push({ t: 'svg', cls: 'underlayer', svg: underDorm });
        P.wren.push({ t: 'p', text: 'Every shadow falls away from the lamp. Wren’s falls toward it.' });
        P.wren.push({ t: 'fine', text: 'Say it to Wren, out loud:' });
        P.wren.push({ t: 'letter', text: '“Your shadow’s wrong. Everyone’s points away from the lamp. Yours points at it. I called it a trick of the light. Well. We’re standing in the light.”' });
      }

      if (roleId === 'binder') {
        P.sight.push({ t: 'h', text: 'How a sigil is written' });
        P.sight.push({ t: 'list', items: [
          'A sigil starts at the **scratch**. A notch is only a maker’s signature.',
          'The **first** word goes **in** the scratched slot.',
          'Each next word goes in the next slot **clockwise**.',
          'One word per slot. **Every other slot stays empty.**',
        ] });
        P.sight.push({ t: 'html', html: lawRing() });
        P.sight.push({ t: 'fine', text: 'You cannot see the cuts or read the words. Ask for both.' });
        P.wren.push({ t: 'h', text: 'No thread' });
        P.wren.push({ t: 'html', html: '<ul class="blk-list">'
          + '<li>' + threadLine('whole') + ' <strong>Reader and Listener:</strong> an old red thread, well knotted.</li>'
          + '<li>' + threadLine('broken') + ' <strong>Seer and you:</strong> last week’s practice thread still will not hold.</li>'
          + '<li>' + threadLine('none') + ' <strong>Wren:</strong> nothing. No thread at all, to anyone.</li>'
          + '</ul>' });
        P.wren.push({ t: 'fine', text: 'Say it to Wren, out loud:' });
        P.wren.push({ t: 'letter', text: '“You don’t have a single thread, Wren. Not to anyone. Not even to us. I decided my gift was faulty. I should have told you. Friends tell each other. That’s a rule.”' });
      }

      // First night only, like the tab guide: point each page at the Book once its fact has been said.
      P.sight.push({ t: 'fine', text: 'Said your part? Then read through your **Book**. You will lean on it all night.' });

      return P;
    },
  });
})();
