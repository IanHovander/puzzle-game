/* Companion — Chapter IV: The Oath (EMBER·cast: LETTER, ORIEL, SORREL, VANE_ACCEPT, SURRENDERED, WREN_SCARED) */
(function () {
  'use strict';
  const G = window.VigilGlyphs, L = window.VigilLore, CA = window.CompanionAudio, D = window.CompanionDraw, UI = window.VigilUI;
  const C = window.CompanionContent;

  /* ---------- the older alphabet (24 letters; no Q, no X). Identical to the table in js/content/ch4.js. ---------- */
  const OLD_RUNES = {
    A: 'M10,2 L10,26 M10,8 L18,14', B: 'M10,2 L10,26 M10,2 L18,10 L10,18', C: 'M16,4 L4,14 L16,24', D: 'M10,2 L10,26 M2,14 L18,14',
    E: 'M10,2 L10,26 M2,20 L10,14 L18,20', F: 'M10,2 L10,26 M10,6 L18,12 M10,14 L18,20', G: 'M6,2 L14,2 L14,26 L6,26', H: 'M6,2 L6,26 M14,2 L14,26 M6,10 L14,18',
    I: 'M10,2 L10,26', J: 'M10,2 L10,20 L4,26', K: 'M10,2 L10,26 M18,6 L10,14 L18,22', L: 'M10,2 L10,26 M10,26 L18,20',
    M: 'M4,2 L4,26 M16,2 L16,26 M4,2 L16,26', N: 'M4,2 L4,26 M16,2 L16,26 M4,26 L16,2', O: 'M10,4 L18,14 L10,24 L2,14 Z', P: 'M10,2 L10,26 M2,10 L10,2 L18,10',
    R: 'M10,2 L10,26 M2,20 L10,26 L18,20', S: 'M16,4 L6,10 L14,18 L4,24', T: 'M2,6 L18,6 M10,6 L10,26', U: 'M4,2 L10,26 L16,2',
    V: 'M4,4 L16,24 M16,4 L4,24', W: 'M2,4 L10,14 L18,4 M10,14 L10,26', Y: 'M10,2 L10,26 M2,20 L18,8', Z: 'M4,6 L16,6 M4,22 L16,22 M10,6 L10,22',
  };
  const OLD_ALPHA = 'ABCDEFGHIJKLMNOPRSTUVWYZ';
  const runeGlyph = (ch, size, color) => `<svg viewBox="0 0 20 30" width="${size || 40}" height="${(size || 40) * 1.5}" style="color:${color || '#e0b04a'};display:block;margin:0 auto"><path d="${OLD_RUNES[ch]}" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"/></svg>`;
  function runeLine(text, opts) {
    opts = opts || {};
    const cell = 24, h = 34, gap = 12; let x = 8; let s = '';
    for (const ch of String(text).toUpperCase()) {
      if (ch === ' ') { x += gap; continue; }
      if (ch === '.') { s += `<circle cx="${x + 5}" cy="26" r="2" fill="currentColor"/>`; x += 12; continue; }
      const d = OLD_RUNES[ch];
      if (d) s += `<path d="${d}" transform="translate(${x},3)" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"/>`;
      x += cell;
    }
    return `<svg viewBox="0 0 ${x + 8} ${h + 6}" style="height:${opts.height || 48}px;width:auto;max-width:100%;color:${opts.color || '#e0b04a'};display:block;margin:6px auto">${s}</svg>`;
  }
  const primerBlocks = () => [
    { t: 'p', text: 'Twenty-four letters, each with its modern letter written beside it in the Provost\'s hand. No **Q** and no **X** — the Founders had no use for them. A plain substitution: slow, and yours.' },
    { t: 'key', items: OLD_ALPHA.split('').map(ch => ({ svg: runeGlyph(ch, 34), label: ch })) },
  ];
  // The primer joins the Reader's Book once Chapter IV is open.
  C.bookExtras.push((roleId, ctx) => (roleId === 'reader' && ctx.maxChapter >= 4) ? [{ t: 'h', text: 'The primer (from the Provost\'s study)' }].concat(primerBlocks()) : []);

  /* ---------- shared drawings ---------- */
  const lawHtml = (laws) => `<div class="laws">${laws.map(l => `<div class="law ${l.era === 'O' ? 'order' : 'founders'}"><div class="era">Law ${l.n} · ${l.era === 'F' ? 'Founders\' · Year 0' : 'Order\'s · Year ' + l.year}</div><div class="txt">${UI.esc(l.text)}</div></div>`).join('')}</div>`;
  const law = (n) => L.laws.find(l => l.n === n);
  const founders4 = [['Halvard', 'THORN'], ['Idony', 'KNOT'], ['Rook', 'VEIL'], ['Mere', 'EMBER']];
  const shelfShapes = [['Spike', true], ['Flame', false], ['Hook', true], ['Crown', false], ['Spike', false], ['Hook', false], ['Flame', true], ['Crown', true]];
  const oathInscription = (color) => G.inscription([{ shape: 'Spike', inv: false }, { shape: 'Flame', inv: false }, { shape: 'Spike', inv: true }, { shape: 'Crown', inv: false, hidden: true }], { showMark: false, color: color || '#fff' }).replace('SHIELD', 'LOCK');
  const mereText = '"We were four. I offered to go alone and was refused: one is never enough, and one was never asked. We went down together, wrote the cold glyph with four hands, and came up grey. The fire is only what we left behind. If you read this, the Hearth is failing and someone has told you one must go. — Mere, who keeps the fire, after."';

  // Seer: the shelf as one turned line, mark on the right.
  const underShelf = `<svg viewBox="0 0 360 150">
    <rect width="360" height="150" fill="#000"/>
    <rect x="12" y="30" width="336" height="80" rx="4" fill="none" stroke="#fff" stroke-width="1.2"/>
    ${shelfShapes.map(([sh, inv], i) => `<g transform="translate(${34 + i * 41},70) scale(0.9)" style="color:#fff">${G.shapeInner(sh, inv)}</g><text x="${34 + i * 41}" y="124" text-anchor="middle" fill="#fff" font-size="9" font-family="Cinzel,serif">${i + 1}</text>`).join('')}
    <path d="M352,62 L344,70 L352,78 Z" fill="#a482e6"/>
    <text x="180" y="20" text-anchor="middle" fill="#a482e6" font-size="10" font-family="Cinzel,serif">the shelf's mark: on the right — one turned line</text>
    <text x="180" y="144" text-anchor="middle" fill="#fff" font-size="9" font-family="Cinzel,serif" opacity=".7">physical positions 1–8, as the books stand</text>
  </svg>`;
  // Seer: the tapestry's under-paint — four walking into a flame, the fourth hand holding an inverted flame; shadows away.
  const underTapestry = `<svg viewBox="0 0 360 200">
    <rect width="360" height="200" fill="#000"/>
    <rect x="10" y="10" width="340" height="180" fill="none" stroke="#fff" stroke-width="1.2"/>
    <g stroke="#fff" fill="none" stroke-width="1.5">
      ${[0, 1, 2].map(i => `<path d="M${290 + i * 14 - 10},170 C${280 + i * 14},130 ${290 + i * 14},110 ${296 + i * 14},80 C${302 + i * 14},110 ${312 + i * 14},130 ${300 + i * 14},170"/>`).join('')}
    </g>
    ${[0, 1, 2, 3].map(i => { const x = 60 + i * 52; return `<g transform="translate(${x},170)"><path d="M-9,0 L-6,-46 L6,-46 L9,0 Z" fill="#fff"/><circle cx="0" cy="-54" r="7" fill="#fff"/><path d="M6,-40 L22,-28" stroke="#fff" stroke-width="4" stroke-linecap="round"/>${i === 3 ? `<g transform="translate(30,-30) scale(0.8)" style="color:#a482e6">${G.shapeInner('Flame', true)}</g>` : ''}<path d="M-4,0 L-30,10 L6,0 Z" fill="#fff" opacity=".45"/></g>`; }).join('')}
    <text x="180" y="30" text-anchor="middle" fill="#a482e6" font-size="10" font-family="Cinzel,serif">under the paint: four, walking in</text>
    <text x="255" y="60" text-anchor="middle" fill="#a482e6" font-size="9" font-family="Cinzel,serif">the fourth hand: a flame, turned over</text>
    <text x="180" y="192" text-anchor="middle" fill="#fff" font-size="9" font-family="Cinzel,serif" opacity=".7">no child anywhere in it</text>
  </svg>`;
  // Seer: the oath ring, mark at slot 4.
  const underRing = `<svg viewBox="0 0 320 200">
    <rect width="320" height="200" fill="#000"/>
    <g stroke="#fff" fill="none" stroke-width="1.5" transform="translate(110,100)">
      <circle r="60"/>
      ${[0, 1, 2, 3].map(i => { const a = (i / 4 * 360 - 90) * Math.PI / 180; return `<circle cx="${(Math.cos(a) * 60).toFixed(1)}" cy="${(Math.sin(a) * 60).toFixed(1)}" r="12"/><text x="${(Math.cos(a) * 82).toFixed(1)}" y="${(Math.sin(a) * 82 + 4).toFixed(1)}" text-anchor="middle" fill="#fff" font-size="11" font-family="Cinzel,serif" stroke="none">${i + 1}</text>`; }).join('')}
      <path d="M-84,-8 L-72,0 L-84,8 Z" fill="#a482e6" stroke="none"/>
      <path d="M-14,-74 a76,76 0 0 1 28,0" stroke-width="1.5"/><path d="M14,-74 l-6,-4 l0,8 z" fill="#fff" stroke="none"/>
    </g>
    <text x="240" y="70" text-anchor="middle" fill="#a482e6" font-size="11" font-family="Cinzel,serif">the mark: slot 4</text>
    <text x="240" y="92" text-anchor="middle" fill="#fff" font-size="10" font-family="Cinzel,serif">sunwise from it:</text>
    <text x="240" y="112" text-anchor="middle" fill="#fff" font-size="13" font-family="Cinzel,serif">4 · 1 · 2 · 3</text>
    <text x="240" y="140" text-anchor="middle" fill="#fff" font-size="9" font-family="Cinzel,serif" opacity=".7">the last placed is the lock</text>
  </svg>`;
  // Seer: shadows in the study — the fire at the right; four away, Marrow's away, Wren's toward.
  const underStudy = `<svg viewBox="0 0 360 200">
    <rect width="360" height="200" fill="#000"/>
    <g stroke="#fff" fill="none" stroke-width="1.2"><rect x="10" y="10" width="340" height="180"/><rect x="20" y="120" width="90" height="16"/><rect x="120" y="24" width="120" height="60"/><path d="M300,140 L300,110 M292,116 L308,116"/></g>
    <g fill="#fff" opacity=".9"><circle cx="70" cy="90" r="6"/><circle cx="110" cy="150" r="6"/><circle cx="160" cy="120" r="6"/><circle cx="200" cy="160" r="6"/><circle cx="260" cy="90" r="6"/><circle cx="240" cy="150" r="6"/></g>
    <g stroke="#fff" stroke-width="3" opacity=".55" stroke-linecap="round"><path d="M70,90 L36,84"/><path d="M110,150 L76,152"/><path d="M160,120 L126,116"/><path d="M200,160 L166,164"/><path d="M260,90 L228,82"/></g>
    <g stroke="#a482e6" stroke-width="3" opacity=".9" stroke-linecap="round"><path d="M240,150 L278,146"/></g>
    <g fill="#fff" font-size="9" font-family="Cinzel,serif"><text x="60" y="108">Bookmoth</text><text x="100" y="168">Hush</text><text x="150" y="138">Owl</text><text x="190" y="178">Knot</text><text x="248" y="80">the Provost</text><text x="230" y="168" fill="#a482e6">Wren</text><text x="300" y="158" text-anchor="middle">the fire</text><text x="65" y="118" opacity=".7">the desk</text><text x="180" y="20" text-anchor="middle" opacity=".7">the tapestry</text></g>
    <text x="180" y="194" text-anchor="middle" fill="#fff" font-size="9" font-family="Cinzel,serif" opacity=".7">shadows, as they fall — the Provost's away, like yours</text>
  </svg>`;

  C.chapters.push({
    id: 'ch4',
    pages: (roleId, ctx) => {
      const f = ctx.flags || {};
      const P = { sight: [], wren: [], speak: [] };
      const scared = !!f.WREN_SCARED;
      const marrowLetter = !f.ORIEL && !f.SORREL && !f.VANE_ACCEPT;

      /* ================= READER ================= */
      if (roleId === 'reader') {
        P.sight.push({ t: 'h', text: 'The primer — the Older Alphabet (page 1 of 5)' });
        P.sight.push(...primerBlocks());
        P.sight.push({ t: 'fine', text: 'Unlocked. Your Book\'s locked page opens with it, from now on.' });
        P.sight.push({ t: 'h', text: 'The Vigil roll (page 2 of 5)' });
        P.sight.push({ t: 'p', text: 'Fourteen years of names in the Vigil\'s script — and one, the last, added in the Provost\'s own hand, in the older alphabet:' });
        P.sight.push({ t: 'html', html: runeLine('WRENN', { height: 64 }) });
        P.sight.push({ t: 'p', text: 'Cipher it. Five letters, not four. Then look in your Book at the lexicon\'s gloss for **COLD**, and at the last word of it.' });
        P.sight.push({ t: 'reveal', label: 'When you have ciphered it', blocks: [{ t: 'p', text: '**WRENN** — *the hollow of a bell; the space that rings.* Your glossary has it now.' }, { t: 'fine', text: 'And COLD, from the lexicon: *the cold; the wound; the space left when warmth goes; a hollow.*' }] });
        P.sight.push({ t: 'h', text: 'The journal on the desk (page 3 of 5)' });
        P.sight.push({ t: 'p', text: 'The Hearth shows one line of the Provost\'s journal in the old letters. Read it with the primer — aloud, letter by letter if you must — and the Warden types what you say. Scribble here if it helps:' });
        P.sight.push({ t: 'note', id: 'cipher', placeholder: 'letters, as you cipher them…' });
        if (f.LETTER) {
          P.sight.push({ t: 'h', text: 'The rubbing from Mere\'s niche (page 4 of 5)' });
          P.sight.push({ t: 'p', text: 'It has been a smear of grey on your page since the Vault. With the primer beside it, it reads. **Mere, Year 3:**' });
          P.sight.push({ t: 'letter', text: mereText });
          P.sight.push({ t: 'fine', text: 'Read it to them. All of it. It is the oldest thing anyone at your table will ever hear. Once you have read the journal on the Hearth, the Hearth will count the rubbing as read too.' });
        } else {
          P.sight.push({ t: 'h', text: 'A sheet you do not have (page 4 of 5)' });
          P.sight.push({ t: 'fine', text: 'There was a sheet in the older alphabet in Mere\'s niche, below the Vault. Nobody took a rubbing. The primer would have read it.' });
        }
        P.sight.push({ t: 'h', text: 'The shelf, and the scroll (page 5 of 5)' });
        P.sight.push({ t: 'p', text: '**The Founders\' four glyphs**, from the plinths in the Vault — a set, not an order. The order is Hush\'s:' });
        P.sight.push({ t: 'glyphs', items: founders4.map(([who, g]) => ({ svg: G.svg(g, { size: 44, color: '#f2d27a' }), label: `${who} — **${g}**` })) });
        P.sight.push({ t: 'p', text: '**The third shelf**, eight spines, as the shapes stand. Read *upright*, left to right, they say:' });
        P.sight.push({ t: 'table', head: ['book', 'shape', 'reads upright'], rows: shelfShapes.map(([sh, inv], i) => [String(i + 1), G.shapeSvg(sh, inv, { size: 34, color: '#f2d27a' }), `<b>${G.read(sh, inv)}</b>`]) });
        P.sight.push({ t: 'fine', text: 'Whether the line is upright is Owl\'s to say. If it is turned, your Book says what that does: read right to left, every glyph inverted — and every book keeps its place.' });
        P.sight.push({ t: 'p', text: '**The Oath scroll.** Three glyphs and a lock, clean on your page where the Hearth shows them worn:' });
        P.sight.push({ t: 'html', html: oathInscription('#f2d27a') });
        P.sight.push({ t: 'p', text: `${G.svg('THORN', { size: 30, color: '#f2d27a' })} THORN, ${G.svg('ASH', { size: 30, color: '#f2d27a' })} ASH, ${G.svg('WELL', { size: 30, color: '#f2d27a' })} WELL — *a gate; fire; down* — and a lock, which is not written because the swearer writes it. Where the ring begins is Owl\'s; the order is Hush\'s; what may lock an oath is Knot\'s.` });

        P.wren.push({ t: 'h', text: 'The name' });
        P.wren.push({ t: 'p', text: 'You ciphered it yourself, in the Provost\'s study, with her primer. **WRENN.** Not a bird. The hollow of a bell — the space inside it that makes the sound.' });
        const a = ctx.answer('ch3', 'whisper');
        P.wren.push({ t: 'p', text: a === 'TELL' ? 'In the laundry you told Wren it meant *a small brave bird*. It was kind. It is not in any alphabet.' : a === 'DONTKNOW' ? 'In the laundry you said you did not know yet. You know now.' : 'Whatever you said in the laundry, you know now.' });
        P.wren.push({ t: 'p', text: scared ? 'Wren has not asked you again tonight. Wren has not asked anyone anything since the fourth bell.' : 'It is a good name for a bell. You do not yet know why it makes you want to sit down.' });
        P.speak.push({ t: 'fine', text: 'Nothing to speak this chapter. When the Hearth calls **Bookmoth**, the keyboard is yours: the journal on the desk, and the first glyph of the oath.' });
      }

      /* ================= LISTENER ================= */
      if (roleId === 'listener') {
        P.sight.push({ t: 'h', text: 'The memory-bell (page 1 of 4)' });
        P.sight.push({ t: 'p', text: 'On the mantel, older than the mantel. Struck, it says back the last thing said near it — to an Ear. The Hearth hears a hum. Cup yours.' });
        P.sight.push({ t: 'audio', label: 'The bell remembers: two voices', strip: CA.strip([-1, -2, 'rest', 2, 1, -3]), play: (A) => { CA.playSteps(A, [-1, -2], 58); setTimeout(() => CA.playSteps(A, [2, 1, -3], 66), 2400); },
          text: 'A low voice, courteous and certain — **the Envoy, Vane:** *"The Crown will have the Cold open, Ilsabet, one way or another."*\n\nThen a voice you know from two floors down — **the Provost:** *"Then the Crown will go through me. And through it."*' });
        P.sight.push({ t: 'fine', text: 'Say it word for word. Then say whose. *Through it.* Nobody at the table will like that sentence; say it anyway.' });
        P.sight.push({ t: 'h', text: 'The Founders\' phrase, again (page 2 of 4)' });
        P.sight.push({ t: 'audio', label: 'The Hymn\'s opening, as the Founders left it', strip: CA.strip([1, 3, -2]), play: (A) => CA.playSteps(A, [1, 3, -2]), text: '**Up one, up three, down two.** Over the four glyphs the Founders left on their plinths there is only one order that climbs like this. Your row-player is in the Book if you want to test it.' });
        P.sight.push({ t: 'p', text: 'The shelf itself plays nothing. Eight books; what you have is the phrase, and Bookmoth has the four.' });
        P.sight.push({ t: 'h', text: 'The Oath\'s phrase (page 3 of 4)' });
        P.sight.push({ t: 'audio', label: 'The scroll, when the ring is touched', strip: CA.strip([-1, 4]) + '<div class="arrow-strip"><span class="step rest"><b>◆</b>then the lock</span></div>', play: (A) => CA.playSteps(A, [-1, 4]), text: '**Down one, up four — then the lock.** The lock is not a note; it is a glyph someone chooses. Three notes, three of Bookmoth\'s glyphs; the order is yours, from wherever Owl says the ring begins.' });
        P.sight.push({ t: 'h', text: 'Heartbeats in the study (page 4 of 4)' });
        P.sight.push({ t: 'html', html: `<div class="heartbeats">${['Bookmoth', 'Hush', 'Owl', 'Knot'].map(n => `<div class="hb"><span>${n}</span>${D.trace('normal')}</div>`).join('')}<div class="hb"><span>the Provost</span>${D.trace(f.SURRENDERED ? 'fast' : 'normal')}</div><div class="hb"><span>Wren</span>${D.trace('flat')}</div></div>` });
        P.sight.push({ t: 'fine', text: f.SURRENDERED ? 'The Provost\'s: fast, and staying fast, even after the door closed. Wren\'s: too quiet to catch. Still.' : 'The Provost\'s: slow. Slower than a heart should be on a night like this — the slowness of a thing decided. Wren\'s: too quiet to catch. Still.' });

        P.wren.push({ t: 'h', text: 'What the bell would not keep' });
        P.wren.push({ t: 'p', text: scared ? 'You struck the bell twice more while nobody was looking. It gave you the Provost again, and the Envoy again, and your own voice asking Owl for the primer. Wren has not spoken since the fourth bell — but you remember the laundry, and the bell there, and you have started to wonder whether any bell has ever kept Wren\'s voice.' : 'You struck the bell twice more while nobody was looking. It gave you the Provost again, and the Envoy again, and — from a minute ago — your own voice asking Owl for the primer. It did not give you Wren\'s joke about the lamp. It keeps every voice in the room but one.' });
        P.speak.push({ t: 'fine', text: 'Nothing to speak this chapter. When the Hearth calls **Hush**, the keyboard is yours: the bell on the mantel, and the second glyph of the oath.' });
      }

      /* ================= SEER ================= */
      if (roleId === 'seer') {
        P.sight.push({ t: 'h', text: 'Under the shelf (page 1 of 4)' });
        P.sight.push({ t: 'p', text: 'The third shelf was re-hung upside down — the whole board, all eight books, in one go. One turned line: the **mark is on the right**.' });
        P.sight.push({ t: 'svg', cls: 'underlayer', svg: underShelf });
        P.sight.push({ t: 'fine', text: 'A turned line: Bookmoth reads it right to left with every glyph inverted, and Knot\'s Book has the Law that says so. Every book keeps its *place* on the shelf — the book you pull is the book in that position, whatever it now reads.' });
        P.sight.push({ t: 'h', text: 'Under the paint (page 2 of 4)' });
        P.sight.push({ t: 'p', text: 'The tapestry. Under the Order\'s picture — the hall, the fire, the one small figure — this:' });
        P.sight.push({ t: 'svg', cls: 'underlayer', svg: underTapestry });
        P.sight.push({ t: 'fine', text: 'Four. No child. The fourth hand holds a **flame turned over**. The Hearth can scrape it, and the table should; you already know what they will find.' });
        P.sight.push({ t: 'h', text: 'The Oath ring (page 3 of 4)' });
        P.sight.push({ t: 'p', text: 'The scroll\'s ring has its mark at **slot 4**. Sunwise from there: 4, then 1, then 2, then 3. The last placed is the lock.' });
        P.sight.push({ t: 'svg', cls: 'underlayer', svg: underRing });
        P.sight.push({ t: 'h', text: 'Shadows in the study (page 4 of 4)' });
        P.sight.push({ t: 'svg', cls: 'underlayer', svg: underStudy });
        P.sight.push({ t: 'fine', text: 'The Provost\'s falls away from her own fire, like yours. One does not.' });

        P.wren.push({ t: 'h', text: 'The boy who scraped the paint' });
        P.wren.push({ t: 'p', text: 'Twenty-two years ago a Warden with your Sight scraped this same paint, in the Hall, saw four, and was sent away for it. He is the Envoy now. You have been told all night not to trust him. You have his eyes.' });
        P.wren.push({ t: 'p', text: scared ? 'Wren has not looked at the tapestry once. Wren has not looked at anything since the fourth bell.' : 'Wren keeps glancing at the tapestry and then at you, as if you might have moved it.' });
        P.speak.push({ t: 'fine', text: 'Nothing to speak this chapter. When the Hearth calls **Owl**, the keyboard is yours: the tapestry, and the third glyph of the oath. You are also the Voice: read the Hearth aloud.' });
      }

      /* ================= BINDER ================= */
      if (roleId === 'binder') {
        P.sight.push({ t: 'h', text: 'Laws for the study (page 1 of 3)' });
        P.sight.push({ t: 'html', html: lawHtml([law(10), law(4), law(3)]) });
        P.sight.push({ t: 'p', text: '**Law 10, for the shelf.** If Owl says the line is turned: reverse it and invert every glyph — but every glyph *keeps its place*. Pull the book by where it stands, not by what it says.' });
        P.sight.push({ t: 'p', text: '**Law 4, for the oath.** The last glyph is the lock, and only two glyphs can be one. **KNOT** cannot be unbound. **EMBER** can be remembered and reconsidered. *The one you swear to cannot tell the difference.* This one is yours to argue, and the table should hear you argue it.' });
        P.sight.push({ t: 'h', text: 'Threads in the study (page 2 of 3)' });
        P.sight.push({ t: 'list', items: [
          '**The Provost → Wren:** *grey.* Not thin, not fraying — grey all through. The colour of someone who has already said goodbye.',
          '**The Provost → the four of you:** red, unfinished — an oath lying on the desk waiting to be tied.' + (f.SURRENDERED ? ' There is a knot in it that was not there this morning.' : ''),
          '**The Provost → the Convocation:** gold, thin, pulled very tight.',
          '**The bell on the mantel:** it holds a thread\'s worth of the Envoy. Gold, and under the gold, red. He is pulled two ways.',
          '**Wren:** *No thread found.* Not unbound; the knot itself.',
        ] });
        if (f.ORIEL) {
          P.sight.push({ t: 'h', text: 'Under the cushion — Oriel\'s note (page 3 of 3)' });
          P.sight.push({ t: 'letter', text: '"I scraped the paint myself, as a girl, in the Hall, with a bread-knife, and put it back before Matins. Four. Vane saw it too, twenty years after me; that is why he was sent away and I was not — I never said. You asked me to tell you what you find below. Here is what I found first. — Oriel."' });
          P.sight.push({ t: 'p', text: 'Law 0 was struck in 212 for being wrong. A Law struck for being wrong is un-struck by being right. Owl\'s tapestry, Bookmoth\'s rubbing, or this note — any one of them restores it. From the next chapter your Book will show it **restored**.' });
        } else if (marrowLetter) {
          P.sight.push({ t: 'h', text: 'Under the cushion — an unsent letter (page 3 of 3)' });
          P.sight.push({ t: 'letter', text: '"To the Convocation. I have chaired you for nineteen years and lied to you for fourteen — not in what I said; in what I did not. There is another way. I have never said the other way aloud, because saying it costs four of us what sending one costs none of us. I will send this when I am braver. — I. Marrow."' });
          P.sight.push({ t: 'fine', text: 'Never sent. You are the first to read it. Read it to them.' });
        } else {
          P.sight.push({ t: 'h', text: 'Under the cushion (page 3 of 3)' });
          P.sight.push({ t: 'fine', text: 'Nothing but the shape of her. Whatever the Provost writes and does not send, she does not keep it in her chair tonight.' });
        }

        P.wren.push({ t: 'h', text: 'The lock' });
        P.wren.push({ t: 'p', text: 'You will tie this oath. Tie it under **KNOT** and it cannot be untied — not by you, not by the Provost, not by whatever happens at midnight. Tie it under **EMBER** and it can be reconsidered later, if there turns out to be a later.' });
        P.wren.push({ t: 'p', text: 'The one you swear to cannot tell the difference. Neither can Wren. You can.' });
        P.wren.push({ t: 'p', text: scared ? 'Wren has not looked at you since the fourth bell. You have looked for a thread anyway. There is still nothing to find.' : 'Wren asked you in the laundry whether you thought Wren was really the one. You have looked for a thread every hour since. There is still nothing to find.' });
        P.speak.push({ t: 'fine', text: 'Nothing to speak this chapter. When the Hearth calls **Knot**, the keyboard is yours: the Provost\'s chair, and the lock of the oath.' });
      }
      return P;
    },
  });
})();
