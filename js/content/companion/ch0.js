/* Companion — Prologue (KINDLE). Four pages, one puzzle fact each: the Reader has the words,
   the Listener the order, the Seer the cuts, the Binder the rule. No page holds another's answer. */
(function () {
  'use strict';
  const G = window.VigilGlyphs, L = window.VigilLore, CA = window.CompanionAudio, D = window.CompanionDraw;
  const C = window.CompanionContent;

  /* The lamp's collar, drawn as a ring so the page cannot imply an order.
     Crown sits left, Flame right — the reverse of the answer, so reading left to right fails. */
  const collar = () => `<svg viewBox="0 0 300 200">
    <circle cx="150" cy="88" r="62" fill="none" stroke="rgba(212,169,78,.35)" stroke-width="11"/>
    <g transform="translate(88,88) scale(1.15)" style="color:#f2d27a">${G.shapeInner('Crown', true)}</g>
    <g transform="translate(212,88) scale(1.15)" style="color:#f2d27a">${G.shapeInner('Flame', false)}</g>
    <g text-anchor="middle" fill="rgba(233,226,210,.7)" font-size="13" font-family="Cinzel,serif"><text x="150" y="174">the band runs all the way round</text><text x="150" y="193">no first, no last</text></g>
  </svg>`;

  /* The Listener's interval, drawn: two rungs of the ladder and the climb between them. */
  const ladder3 = () => `<svg viewBox="0 0 200 96" style="width:170px;height:82px">
    ${[0, 1, 2, 3, 4].map(i => `<line x1="30" y1="${84 - i * 16}" x2="86" y2="${84 - i * 16}" stroke="rgba(255,255,255,.25)" stroke-width="2"/>`).join('')}
    <circle cx="58" cy="84" r="7" fill="#4fb3bf"/><circle cx="58" cy="36" r="7" fill="#4fb3bf"/>
    <path d="M164,84 L164,36" stroke="#4fb3bf" stroke-width="2"/><path d="M164,30 l-5,10 l10,0 Z" fill="#4fb3bf"/>
    <text x="172" y="72" fill="#4fb3bf" font-size="18" font-family="Cinzel,serif">+3</text>
    <text x="92" y="39" fill="rgba(255,255,255,.55)" font-size="9" font-family="Cinzel,serif">second note</text>
  </svg>`;

  /* The Binder's rule, drawn: a ring, a mark, and the count running clockwise from it. */
  const lawRing = () => `<svg viewBox="0 0 180 162" style="width:130px;height:117px">
    <circle cx="90" cy="78" r="46" fill="none" stroke="rgba(255,255,255,.35)" stroke-width="1.5"/>
    ${[0, 1, 2, 3].map(i => { const a = (i / 4 * 360 - 135) * Math.PI / 180, x = 90 + Math.cos(a) * 46, y = 78 + Math.sin(a) * 46;
      return `<circle cx="${x.toFixed(1)}" cy="${y.toFixed(1)}" r="11" fill="#16131f"/><circle cx="${x.toFixed(1)}" cy="${y.toFixed(1)}" r="11" fill="${i === 0 ? 'rgba(164,130,230,.25)' : 'none'}" stroke="${i === 0 ? '#a482e6' : 'rgba(255,255,255,.4)'}" stroke-width="1.5"/><text x="${x.toFixed(1)}" y="${(y + 4).toFixed(1)}" text-anchor="middle" fill="#fff" font-size="9" font-family="Cinzel,serif">${['1st', '2nd', '3rd', '4th'][i]}</text>`; }).join('')}
    <path d="M111,21 a60,60 0 0 1 34,40" fill="none" stroke="#a482e6" stroke-width="2"/><path d="M145,61 l-8,-3 l1,9 Z" fill="#a482e6"/>
    <text x="55" y="27" text-anchor="middle" fill="#a482e6" font-size="9" font-family="Cinzel,serif">the scratch</text>
    <text x="90" y="152" text-anchor="middle" fill="rgba(255,255,255,.7)" font-size="9" font-family="Cinzel,serif">first word in it, then clockwise</text>
  </svg>`;

  /* A thread, drawn three ways: whole, broken, absent. */
  const threadLine = (kind) => `<svg viewBox="0 0 90 16" style="width:74px;height:14px;vertical-align:middle">${
    kind === 'whole' ? '<path d="M4,8 C24,2 34,14 52,8 S74,4 86,8" fill="none" stroke="#d96b4a" stroke-width="2.5" stroke-linecap="round"/>'
    : kind === 'broken' ? '<path d="M4,8 C16,3 24,12 36,9" fill="none" stroke="#d96b4a" stroke-width="2.5" stroke-linecap="round"/><path d="M56,9 C68,6 76,11 86,8" fill="none" stroke="#d96b4a" stroke-width="2.5" stroke-linecap="round"/>'
    : '<path d="M4,8 L86,8" fill="none" stroke="rgba(255,255,255,.45)" stroke-width="2" stroke-dasharray="3 7" stroke-linecap="round"/>'
  }</svg>`;

  // Seer under-layer of the dormitory, as the Hearth draws the room: four beds in one row, one round
  // window in the right wall and the lamp on its sill. Four shadows fall away from the lamp; Wren's
  // points toward it.
  const underDorm = (() => {
    const L = [312, 128];
    const shadow = (x, y, len, toward) => { const dx = L[0] - x, dy = L[1] - y, d = Math.hypot(dx, dy), k = (toward ? 1 : -1) * len / d; return `M${x},${y} L${(x + dx * k).toFixed(1)},${(y + dy * k).toFixed(1)}`; };
    const four = [[96, 112], [150, 168], [178, 98], [232, 150]];
    return `<svg viewBox="0 0 360 252">
    <rect width="360" height="252" fill="#000"/>
    <g stroke="#fff" fill="none" stroke-width="1.2">
      <rect x="10" y="10" width="330" height="210"/>
      ${[0, 1, 2, 3].map(i => `<rect x="${22 + i * 62}" y="20" width="50" height="30"/>`).join('')}
      <circle cx="340" cy="128" r="14" fill="#000"/><path d="M326,128 L354,128 M340,114 L340,142" stroke-width=".8"/>
      <circle cx="${L[0]}" cy="${L[1]}" r="8"/>
    </g>
    <g stroke="#fff" stroke-width="1.2" stroke-linecap="round">${[0, 1, 2, 3, 4, 5, 6, 7].map(i => { const a = i / 8 * Math.PI * 2; return `<path d="M${(L[0] + Math.cos(a) * 11).toFixed(1)},${(L[1] + Math.sin(a) * 11).toFixed(1)} L${(L[0] + Math.cos(a) * 15).toFixed(1)},${(L[1] + Math.sin(a) * 15).toFixed(1)}"/>`; }).join('')}</g>
    <text x="304" y="164" text-anchor="middle" fill="#fff" font-size="14" font-family="Cinzel,serif">the lamp</text>
    <g fill="#fff" opacity=".9">
      ${four.map(([x, y]) => `<circle cx="${x}" cy="${y}" r="6"/>`).join('')}<circle cx="262" cy="104" r="6"/>
    </g>
    <g stroke="#fff" stroke-width="3" opacity=".55" stroke-linecap="round">
      ${four.map(([x, y]) => `<path d="${shadow(x, y, 36)}"/>`).join('')}
    </g>
    <g stroke="#a482e6" stroke-width="3" opacity=".9" stroke-linecap="round"><path d="${shadow(262, 104, 30, true)}"/></g>
    <g fill="#fff" font-size="14" font-family="Cinzel,serif"><text x="96" y="136" text-anchor="middle">Reader</text><text x="150" y="192" text-anchor="middle">Listener</text><text x="178" y="86" text-anchor="middle">Seer</text><text x="232" y="174" text-anchor="middle">Binder</text><text x="262" y="92" text-anchor="middle" fill="#a482e6">Wren</text></g>
    <text x="180" y="242" text-anchor="middle" fill="#fff" font-size="14" font-family="Cinzel,serif" opacity=".75">shadows, as they fall</text>
  </svg>`;
  })();

  /* Under the lamp's foot: four slots, numbered as the Hearth numbers them, and TWO cuts.
     No carving, no arrow, no rule — the Seer reports cuts, not meanings. */
  const underFoot = `<svg viewBox="0 0 300 266">
    <rect width="300" height="266" fill="#000"/>
    <g transform="translate(150,135)">
      <circle r="68" fill="none" stroke="#fff" stroke-width="1.5"/>
      ${[0, 1, 2, 3].map(i => { const a = (i / 4 * 360 - 90) * Math.PI / 180, x = (Math.cos(a) * 68).toFixed(1), y = (Math.sin(a) * 68).toFixed(1), hot = i === 2;
        return `<circle cx="${x}" cy="${y}" r="16" fill="#000" stroke="${hot ? '#a482e6' : '#fff'}" stroke-width="${hot ? 2.5 : 1.5}"/><text x="${x}" y="${(+y + 5).toFixed(1)}" text-anchor="middle" fill="${hot ? '#a482e6' : '#fff'}" font-size="15" font-family="Cinzel,serif">${i + 1}</text>`; }).join('')}
    </g>
    <g stroke="#fff" stroke-width="2" stroke-linecap="round" opacity=".85"><path d="M144,48 L150,38 L156,48"/></g>
    <text x="150" y="27" text-anchor="middle" fill="rgba(255,255,255,.85)" font-size="13" font-family="Cinzel,serif">a small notch</text>
    <g stroke="#a482e6" stroke-width="2.5" stroke-linecap="round"><path d="M136,229 L166,221"/><path d="M140,236 L161,230"/></g>
    <text x="150" y="257" text-anchor="middle" fill="#a482e6" font-size="13" font-family="Cinzel,serif">a scratch \u2014 long, deliberate</text>
  </svg>`;

  C.chapters.push({
    id: 'ch0',
    pages: (roleId, ctx) => {
      const P = { sight: [], wren: [], speak: [] };
      P.speak.push({ t: 'fine', text: 'Nothing to speak yet. The Hearth will tell you when.' });

      /* First night only: which tab is for what. Later chapters assume the table has learned it. */
      P.sight.push({ t: 'table', head: ['tab', 'use it'], rows: [
        ['<b>Sight</b>', 'Your Sighting. Read it now.'],
        ['<b>Wren</b>', 'Only when the Hearth says.'],
        ['<b>Speak</b>', 'Only when the Hearth asks.'],
        ['<b>Book</b>', 'Your notes. Any time.'],
      ] });

      if (roleId === 'reader') {
        P.sight.push({ t: 'h', text: 'The lamp’s collar' });
        P.sight.push({ t: 'p', text: 'Two shapes are cut round the collar. The Hearth shows them worn away. You see them clean.' });
        P.sight.push({ t: 'html', html: collar() });
        P.sight.push({ t: 'table', head: ['cut into the band', 'its name'], rows: [
          [`${G.shapeSvg('Crown', true, { size: 44, color: '#f2d27a' })}`, '<b>EMBER</b>'],
          [`${G.shapeSvg('Flame', false, { size: 44, color: '#f2d27a' })}`, '<b>ASH</b>'],
        ] });
        P.sight.push({ t: 'p', text: '**EMBER and ASH.** Say both words out loud, now.' });
        P.sight.push({ t: 'fine', text: 'A circle has no beginning. The brass cannot tell you which word comes first.' });
        P.wren.push({ t: 'h', text: 'The name on the door' });
        P.wren.push({ t: 'fine', text: 'Say it to Wren, out loud:' });
        P.wren.push({ t: 'letter', text: '“Your name might be on our door twice. The pencil one is ours. Below it there’s chalk, rubbed nearly away, and I see it clean: a name about the length of yours, in letters older than the lamp’s. Nobody here is taught them. Somebody put it there long before we did, Wren, and never owned up. I’ve been copying it into my margins for a year. I can’t read it. *Yet.*”' });
      }

      if (roleId === 'listener') {
        P.sight.push({ t: 'h', text: 'The lamp is humming' });
        P.sight.push({ t: 'p', text: 'Only you can hear it. Two notes, over and over.' });
        P.sight.push({ t: 'audio', label: 'The lamp, two notes', strip: CA.strip([3]), play: (A) => CA.playSteps(A, [3]), text: 'The second note is **three steps above** the first.' });
        P.sight.push({ t: 'html', html: ladder3() });
        P.sight.push({ t: 'p', text: 'Two notes, two words. When someone says the two words, find both on the ladder in your **Book**. Whichever order climbs three steps is right.' });
        P.sight.push({ t: 'fine', text: 'You hear the climb, never the words. Someone else has those.' });
        P.wren.push({ t: 'h', text: 'How quiet' });
        P.wren.push({ t: 'html', html: `<div class="heartbeats">${['Reader', 'Listener', 'Seer', 'Binder'].map(n => `<div class="hb"><span>${n}</span>${D.trace('normal')}</div>`).join('')}<div class="hb"><span>Wren</span>${D.trace('flat')}</div></div>` });
        P.wren.push({ t: 'fine', text: 'Say it to Wren, out loud:' });
        P.wren.push({ t: 'letter', text: '“I can hear hearts. It’s how I fall asleep in here: four of them, all going. I’ve never once heard yours. So I check your hands instead. You may have noticed.”' });
      }

      if (roleId === 'seer') {
        P.sight.push({ t: 'h', text: 'Under the polish' });
        P.sight.push({ t: 'p', text: 'Polish hides most things. Not from you. Under the shine are **two** old cuts: a long **scratch** by slot **3**, and a small **notch** by slot **1**.' });
        P.sight.push({ t: 'svg', cls: 'underlayer', svg: underFoot });
        P.sight.push({ t: 'fine', text: 'Say what is cut, and where.' });
        P.wren.push({ t: 'h', text: 'The shadow' });
        P.wren.push({ t: 'svg', cls: 'underlayer', svg: underDorm });
        P.wren.push({ t: 'fine', text: 'Say it to Wren, out loud:' });
        P.wren.push({ t: 'letter', text: '“Your shadow falls the wrong way, Wren. Toward the lamp, like it’s trying to get home. I’ve stood between you and every lamp in this school for years, so nobody else sees. Tonight I didn’t move. You thought I just liked lamps.”' });
      }

      if (roleId === 'binder') {
        P.sight.push({ t: 'h', text: 'How a sigil is written' });
        P.sight.push({ t: 'list', items: [
          'A **Founders’** sigil starts at the **scratch**. Your Book calls it the *mark*. On Founders’ brass, a notch is only the maker’s signature. Ignore it.',
          'The **first** word goes **in** the scratched slot.',
          'Each next word goes in the next slot **clockwise**. Your Book says *sunwise*.',
          'One word per slot. **Any slot left over stays empty.**',
        ] });
        P.sight.push({ t: 'html', html: lawRing() });
        P.sight.push({ t: 'fine', text: 'You cannot see the cuts, read the words or hear which comes first. Ask for all three.' });
        P.wren.push({ t: 'h', text: 'No thread' });
        P.wren.push({ t: 'html', html: '<ul class="blk-list">'
          + '<li>' + threadLine('whole') + ' <strong>The four of you:</strong> red, every which way. Years of promises, all kept.</li>'
          + '<li>' + threadLine('none') + ' <strong>Wren:</strong> nothing. No thread at all, to anyone.</li>'
          + '</ul>' });
        P.wren.push({ t: 'fine', text: 'Say it to Wren, out loud:' });
        P.wren.push({ t: 'letter', text: '“You don’t have a single thread, Wren. Not to anyone. I’ve tried tying one to you every week since we were seven. It never takes. I’m not stopping.”' });
      }

      // First night only, like the tab guide: point each page at the Book once its fact has been said.
      P.sight.push({ t: 'fine', text: 'Said your part? Then read through your **Book**. You will lean on it every night.' });

      return P;
    },
  });
})();
