/* Companion — Prologue (KINDLE) */
(function () {
  'use strict';
  const G = window.VigilGlyphs, L = window.VigilLore, CA = window.CompanionAudio, D = window.CompanionDraw;
  const C = window.CompanionContent;

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
        P.sight.push({ t: 'p', text: 'Two shapes, clean on your page where the Hearth shows them worn: a **Flame**, upright; a **Crown**, inverted.' });
        P.sight.push({ t: 'html', html: carving(false) });
        P.sight.push({ t: 'p', text: 'A line is read one of two ways, and you cannot tell which from the shapes alone — that is Under-Sight, not yours.' });
        P.sight.push({ t: 'table', head: ['If the line is…', 'it reads'], rows: [['upright (mark on the left)', `${G.svg('ASH', { size: 30, color: '#f2d27a' })} ASH, ${G.svg('EMBER', { size: 30, color: '#f2d27a' })} EMBER — <em>fire, keep</em>`], ['turned (mark on the right)', `${G.svg('CROWN', { size: 30, color: '#f2d27a' })} CROWN, ${G.svg('COLD', { size: 30, color: '#f2d27a' })} COLD — <em>one, cold</em>`]] });
        P.sight.push({ t: 'fine', text: 'The full lexicon is in your **Book**.' });
        P.wren.push({ t: 'h', text: 'The name on the door' });
        P.wren.push({ t: 'p', text: 'Every fourth-year\'s name is chalked on the dormitory door in the Vigil\'s script. Wren\'s, underneath, is in the **older alphabet** — the one you have not learned yet. You have walked past it every day for a year and never wondered why.' });
      }
      if (roleId === 'listener') {
        P.sight.push({ t: 'h', text: 'The lamp\'s phrase' });
        P.sight.push({ t: 'p', text: 'Two notes, when the ring is touched. You do not hear the glyphs\' names — the lamp is tuned to its own room — only the **step** between them.' });
        P.sight.push({ t: 'audio', label: 'The lamp, two notes', strip: CA.strip([3]), play: (A) => CA.playSteps(A, [3]), text: 'The second note steps **up three** from the first. Your Ladder is in the **Book**: of the two glyphs the Reader reads, only one order climbs three.' });
        P.sight.push({ t: 'h', text: 'Heartbeats in the room' });
        P.sight.push({ t: 'html', html: `<div class="heartbeats">${['Reader', 'Listener', 'Seer', 'Binder'].map(n => `<div class="hb"><span>${n}</span>${D.trace('normal')}</div>`).join('')}<div class="hb"><span>Wren</span>${D.trace('flat')}</div></div>` });
        P.sight.push({ t: 'fine', text: 'Wren: too quiet to catch. It has always been too quiet to catch. You have decided this is a fault in your gift.' });
        P.wren.push({ t: 'h', text: 'How quiet' });
        P.wren.push({ t: 'p', text: 'You can hear the Provost\'s heart from two floors down when she is angry. You can hear the Binder\'s when the Binder is lying, which is never. You have never once heard Wren\'s, and you have never once said so.' });
      }
      if (roleId === 'seer') {
        P.sight.push({ t: 'h', text: 'Under the lamp' });
        P.sight.push({ t: 'p', text: 'The carving\'s **mark** is on the **left**: the line is upright, read left to right, nothing inverted. The ring\'s scratch — where a sigil begins — is at **slot 3**. Slots run sunwise (clockwise) from the top.' });
        P.sight.push({ t: 'svg', cls: 'underlayer', svg: underLamp });
        P.sight.push({ t: 'h', text: 'Under the dormitory' });
        P.sight.push({ t: 'svg', cls: 'underlayer', svg: underDorm });
        P.sight.push({ t: 'fine', text: 'Your Ring Page is in the **Book**.' });
        P.wren.push({ t: 'h', text: 'The shadow' });
        P.wren.push({ t: 'p', text: 'You decided, months ago, that it was a trick of the lamp. You are looking at it now. It is not the lamp.' });
      }
      if (roleId === 'binder') {
        P.sight.push({ t: 'h', text: 'Law 1' });
        P.sight.push({ t: 'html', html: `<div class="laws"><div class="law founders"><div class="era">Law 1 · Founders' · Year 0</div><div class="txt">A sigil is read sunwise from the mark.</div></div></div>` });
        P.sight.push({ t: 'p', text: 'Sunwise is clockwise. The mark is a scratch on the ring; the Seer can see it. Place the first glyph *on* the mark and the rest after it, clockwise.' });
        P.sight.push({ t: 'h', text: 'Threads in the room' });
        P.sight.push({ t: 'list', items: ['**The Reader — The Listener:** a red thread, old, well-knotted. Friends since the sorting.', '**The Seer — The Binder:** the practice thread you tied last week, for the exam. It would not hold. It has never not held before.', '**Wren:** *No thread found.* Not unbound — you know unbound; unbound is a loose end. This is the other thing. The knot itself.'] });
        P.sight.push({ t: 'fine', text: 'The Book of Laws is in your **Book** — including the one on the 212 page that has been struck through.' });
        P.wren.push({ t: 'h', text: 'The struck Law' });
        P.wren.push({ t: 'p', text: 'You have read the 212 page a dozen times. Three Order\'s Laws written that year, and one Founders\' Law struck through in the same hand: *COLD is written by four hands.* Nobody has ever explained to you why a Law is struck instead of simply forgotten.' });
      }
      return P;
    },
  });
})();
