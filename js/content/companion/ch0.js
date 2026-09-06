/* Companion — Prologue (KINDLE) */
(function () {
  'use strict';
  const G = window.VigilGlyphs, L = window.VigilLore, CA = window.CompanionAudio, D = window.CompanionDraw;
  const C = window.CompanionContent;

  /* Two frames of the same carving: upright, then turned, with the mark moving. One picture for "read two ways". */
  const flipStrip = () => {
    const frame = (x, label, mark) => `<g transform="translate(${x},6)">
      <rect x="0" y="0" width="150" height="86" rx="8" fill="rgba(0,0,0,.3)" stroke="rgba(255,255,255,.15)"/>
      <g transform="translate(${mark === 'left' ? 46 : 40},44) scale(0.85)" style="color:#f2d27a">${G.shapeInner('Flame', false)}</g>
      <g transform="translate(${mark === 'left' ? 104 : 110},44) scale(0.85)" style="color:#f2d27a">${G.shapeInner('Crown', true)}</g>
      <circle cx="${mark === 'left' ? 16 : 134}" cy="44" r="6" fill="#a482e6"/>
      <path d="M${mark === 'left' ? '30,44 L22,40 L22,48' : '120,44 L128,40 L128,48'} Z" fill="#a482e6"/>
      <text x="75" y="80" text-anchor="middle" fill="#a482e6" font-size="10" font-family="Cinzel,serif">${label}</text>
    </g>`;
    return `<svg viewBox="0 0 320 100">${frame(4, 'mark left · upright', 'left')}${frame(166, 'mark right · turned', 'right')}</svg>`;
  };
  /* The Listener's interval, drawn: two rungs of the ladder and the climb between them. */
  const ladder3 = () => `<svg viewBox="0 0 200 96" style="width:170px;height:82px">
    ${[0, 1, 2, 3, 4].map(i => `<line x1="30" y1="${84 - i * 16}" x2="86" y2="${84 - i * 16}" stroke="rgba(255,255,255,.25)" stroke-width="2"/>`).join('')}
    <circle cx="58" cy="84" r="7" fill="#4fb3bf"/><circle cx="58" cy="36" r="7" fill="#4fb3bf"/>
    <path d="M110,84 L110,36" stroke="#4fb3bf" stroke-width="2"/><path d="M110,30 l-5,10 l10,0 Z" fill="#4fb3bf"/>
    <text x="132" y="46" fill="#4fb3bf" font-size="18" font-family="Cinzel,serif">+3</text>
    <text x="58" y="16" text-anchor="middle" fill="rgba(255,255,255,.55)" font-size="9" font-family="Cinzel,serif">second note</text>
  </svg>`;
  /* The Binder's Law, drawn: a ring, a scratch, and the count running clockwise from it. */
  const lawRing = () => `<svg viewBox="0 0 150 150" style="width:130px;height:130px">
    <circle cx="75" cy="75" r="46" fill="none" stroke="rgba(255,255,255,.35)" stroke-width="1.5"/>
    ${[0, 1, 2, 3].map(i => { const a = (i / 4 * 360 - 135) * Math.PI / 180, x = 75 + Math.cos(a) * 46, y = 75 + Math.sin(a) * 46;
      return `<circle cx="${x.toFixed(1)}" cy="${y.toFixed(1)}" r="11" fill="${i === 0 ? 'rgba(164,130,230,.25)' : 'none'}" stroke="${i === 0 ? '#a482e6' : 'rgba(255,255,255,.4)'}" stroke-width="1.5"/><text x="${x.toFixed(1)}" y="${(y + 4).toFixed(1)}" text-anchor="middle" fill="#fff" font-size="11" font-family="Cinzel,serif">${i + 1}</text>`; }).join('')}
    <path d="M96,18 a60,60 0 0 1 34,40" fill="none" stroke="#a482e6" stroke-width="2"/><path d="M130,58 l-8,-3 l1,9 Z" fill="#a482e6"/>
    <text x="40" y="24" text-anchor="middle" fill="#a482e6" font-size="9" font-family="Cinzel,serif">the mark</text>
    <text x="75" y="142" text-anchor="middle" fill="rgba(255,255,255,.6)" font-size="9" font-family="Cinzel,serif">sunwise = clockwise</text>
  </svg>`;
  /* A thread, drawn three ways: whole, broken, absent. */
  const threadLine = (kind) => `<svg viewBox="0 0 90 16" style="width:74px;height:14px;vertical-align:middle">${
    kind === 'whole' ? '<path d="M4,8 C24,2 34,14 52,8 S74,4 86,8" fill="none" stroke="#d96b4a" stroke-width="2.5" stroke-linecap="round"/>'
    : kind === 'broken' ? '<path d="M4,8 C16,3 24,12 36,9" fill="none" stroke="#d96b4a" stroke-width="2.5" stroke-linecap="round"/><path d="M56,9 C68,6 76,11 86,8" fill="none" stroke="#d96b4a" stroke-width="2.5" stroke-linecap="round"/>'
    : '<path d="M6,2 L2,2 L2,14 L6,14 M84,2 L88,2 L88,14 L84,14" fill="none" stroke="rgba(255,255,255,.35)" stroke-width="2"/>'
  }</svg>`;

  const carving = (showMark) => G.inscription([{ shape: 'Flame', inv: false }, { shape: 'Crown', inv: true }], { showMark, mark: 'left', color: '#fff', markColor: '#a482e6' });

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

  const underLamp = `<svg viewBox="0 0 360 200">
    <rect width="360" height="200" fill="#000"/>
    <g transform="translate(0,10)">${carving(true).replace('<svg', '<svg x="60" y="0" width="240" height="70"')}</g>
    <g stroke="#fff" fill="none" stroke-width="1.5" transform="translate(180,140)">
      <circle r="42"/>
      ${[0, 1, 2, 3].map(i => { const a = (i / 4 * 360 - 90) * Math.PI / 180; return `<circle cx="${(Math.cos(a) * 42).toFixed(1)}" cy="${(Math.sin(a) * 42).toFixed(1)}" r="9"/><text x="${(Math.cos(a) * 60).toFixed(1)}" y="${(Math.sin(a) * 60 + 4).toFixed(1)}" text-anchor="middle" fill="#fff" font-size="10" font-family="Cinzel,serif" stroke="none">${i + 1}</text>`; }).join('')}
      <path d="M-6,52 L0,42 L6,52 Z" fill="#a482e6" stroke="none"/>
      <path d="M-14,-56 a58,58 0 0 1 28,0" stroke-width="1.5"/><path d="M14,-56 l-6,-4 l0,8 z" fill="#fff" stroke="none"/>
    </g>
    <text x="180" y="196" text-anchor="middle" fill="#a482e6" font-size="10" font-family="Cinzel,serif">the scratch — where the ring begins</text>
    <text x="180" y="95" text-anchor="middle" fill="#a482e6" font-size="10" font-family="Cinzel,serif">the carving's mark: on the left</text>
  </svg>`;

  C.chapters.push({
    id: 'ch0',
    pages: (roleId, ctx) => {
      const P = { sight: [], wren: [], speak: [] };
      P.speak.push({ t: 'fine', text: 'Nothing to speak yet. The Hearth will tell you when.' });
      if (roleId === 'reader') {
        P.sight.push({ t: 'h', text: 'The carving above the lamp' });
        P.sight.push({ t: 'p', text: 'Two shapes. Clean on your page, worn on the Hearth.' });
        P.sight.push({ t: 'html', html: carving(false) });
        P.sight.push({ t: 'p', text: 'A line reads one of two ways. The shapes will not tell you which.' });
        P.sight.push({ t: 'html', html: flipStrip() });
        P.sight.push({ t: 'table', head: ['If the line is…', 'it reads'], rows: [['upright (mark on the left)', `${G.svg('ASH', { size: 40, color: '#f2d27a' })} ASH, ${G.svg('EMBER', { size: 40, color: '#f2d27a' })} EMBER — <em>fire, keep</em>`], ['turned (mark on the right)', `${G.svg('CROWN', { size: 40, color: '#f2d27a' })} CROWN, ${G.svg('COLD', { size: 40, color: '#f2d27a' })} COLD — <em>one, cold</em>`]] });
        P.sight.push({ t: 'p', text: 'Read both rows aloud. Someone else knows which one is true.' });
        P.sight.push({ t: 'fine', text: 'The full lexicon is in your **Book**.' });
        P.wren.push({ t: 'h', text: 'The name on the door' });
        P.wren.push({ t: 'p', text: 'Every fourth-year\'s name is chalked on the dormitory door. Wren\'s is chalked twice. The second time in an older alphabet. You cannot read it. You have walked past it for a year.' });
      }
      if (roleId === 'listener') {
        P.sight.push({ t: 'h', text: 'The lamp\'s two notes' });
        P.sight.push({ t: 'html', html: ladder3() });
        P.sight.push({ t: 'audio', label: 'The lamp, two notes', strip: CA.strip([3]), play: (A) => CA.playSteps(A, [3]), text: 'The second note steps **up three** from the first. Of the Reader\'s two glyphs, only one order climbs three.' });
        P.sight.push({ t: 'fine', text: 'Your Ladder is in the **Book**.' });
        P.sight.push({ t: 'h', text: 'Heartbeats in the room' });
        P.sight.push({ t: 'html', html: `<div class="heartbeats">${['Reader', 'Listener', 'Seer', 'Binder'].map(n => `<div class="hb"><span>${n}</span>${D.trace('normal')}</div>`).join('')}<div class="hb"><span>Wren</span>${D.trace('flat')}</div></div>` });
        P.sight.push({ t: 'fine', text: 'Wren\'s is too quiet to catch. It always has been.' });
        P.wren.push({ t: 'h', text: 'How quiet' });
        P.wren.push({ t: 'p', text: 'You can hear the Provost\'s heart two floors down. You have never once heard Wren\'s. You decided the fault was yours. You have never said it aloud.' });
      }
      if (roleId === 'seer') {
        P.sight.push({ t: 'h', text: 'Under the lamp' });
        P.sight.push({ t: 'p', text: 'The mark is on the **left**. The line is upright. Nothing is turned.' });
        P.sight.push({ t: 'p', text: 'The ring begins at **slot 3**. Slots run sunwise — clockwise — from the top.' });
        P.sight.push({ t: 'svg', cls: 'underlayer', svg: underLamp });
        P.sight.push({ t: 'h', text: 'Under the dormitory' });
        P.sight.push({ t: 'svg', cls: 'underlayer', svg: underDorm });
        P.sight.push({ t: 'fine', text: 'Every shadow falls away from the lamp. Wren\'s falls toward it.' });
        P.sight.push({ t: 'fine', text: 'Your Ring Page is in the **Book**.' });
        P.wren.push({ t: 'h', text: 'The shadow' });
        P.wren.push({ t: 'p', text: 'You decided months ago it was a trick of the light. You are looking at it now. It is not the light. It never was.' });
      }
      if (roleId === 'binder') {
        P.sight.push({ t: 'h', text: 'Law 1' });
        P.sight.push({ t: 'html', html: `<div class="laws"><div class="law founders"><div class="era">Law 1 · Founders' · Year 0</div><div class="txt">A sigil is read sunwise from the mark.</div></div></div>` });
        P.sight.push({ t: 'html', html: lawRing() });
        P.sight.push({ t: 'p', text: 'Sunwise is clockwise. The mark is a scratch the Seer can see.' });
        P.sight.push({ t: 'p', text: 'First glyph on the mark. The rest follow it clockwise.' });
        P.sight.push({ t: 'h', text: 'Threads in the room' });
        P.sight.push({ t: 'html', html: '<ul class="blk-list">'
          + '<li>' + threadLine('whole') + ' <strong>Reader and Listener:</strong> an old red thread, well knotted.</li>'
          + '<li>' + threadLine('broken') + ' <strong>Seer and you:</strong> last week\'s practice thread would not hold.</li>'
          + '<li>' + threadLine('none') + ' <strong>Wren:</strong> no thread at all. Not unbound — you know unbound. Something else.</li>'
          + '</ul>' });
        P.sight.push({ t: 'fine', text: 'Your **Book** holds the Laws, including one struck through.' });
        P.wren.push({ t: 'h', text: 'The struck Law' });
        P.wren.push({ t: 'p', text: 'You have read the 212 page a dozen times. One Founders\' Law is struck through: *COLD is written by four hands.* Nobody has told you why a Law gets struck.' });
      }
      return P;
    },
  });
})();
