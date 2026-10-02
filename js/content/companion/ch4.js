/* Companion — Chapter IV: The Oath (EMBER · cast: LETTER, ORIEL, SORREL, VANE_ACCEPT, SURRENDERED, WREN_SCARED).
   One fact each, and no page holds another's: the Reader has the words on the spines and on the scroll,
   the Listener one step of each tune, the Seer where every cut is and what is under the paint,
   the Binder what a turned board does to a book, which kind of cut a sigil starts at, and which two locks
   the wax takes (what each costs is Law 4, in the Binder's Book). Each Wren tab is one private line of
   setup, then a line the player says to Wren out loud; the Hearth cues it in ch4_swear. */
(function () {
  'use strict';
  const G = window.VigilGlyphs, L = window.VigilLore, CA = window.CompanionAudio, D = window.CompanionDraw;
  const C = window.CompanionContent;

  /* ---------- the older alphabet (24 letters; no Q, no X).
     KEEP BYTE-IDENTICAL with the copy in js/content/ch4.js — the Hearth draws the journal from that
     table and this primer is the only thing that decodes it. Edit one, edit both. ---------- */
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

  /* The Reader's permanent pages: the primer from Chapter IV on, and Mere's sheet, translated, once
     the Reader has actually read it. Both live in the Book, not on the Sight page — a permanent
     reference is never re-printed. The ch4 flags are read off the ch4 unlock itself, so the Book
     keeps them once the table has moved on.
     The sheet waits for Chapter V. It used to appear the instant EMBER was typed, three scenes before
     the study is searched, and it says 'We were four' and 'came up gray' — the first field of the
     Seer's corner and the first field of the Binder's, in English, on the Reader's phone. The gate
     that belongs here is LETTER_READ (js/content/ch4.js sets it at the desk, and its own line
     promises the Book), but no Companion page can see a flag that is not cast, so the nearest honest
     gate is the next chapter's unlock: the study is over by then and the sheet costs the table
     nothing.
     THE ASK FOR 'ONE MORE CAST BIT ON ch4' CANNOT BE GRANTED, and it is written down here so that
     nobody spends an afternoon on it. Two independent reasons, both measured:
       1. A cast is issued at the CHAPTER CODE SCENE. ch4's is ch4_attune, and it runs before
          ch4_shelf and long before the desk — so at the moment the cast is computed LETTER_READ has
          not been written by anything and is false on every path. No ch4 cast bit could ever carry
          it. The flag it could carry is LETTER (the rubbing was taken, in ch2), which is bit 0, and
          which is what this page already reads.
       2. The format is six data bits, hard. js/content/shared.js packs `data &= 63` and
          `v = data | (check << 6)` into three base-32 symbols = 15 bits, so six data bits and nine
          of checksum. ch4 uses bits 0..5 and ch5 uses bits 0..5: both are FULL. A seventh bit is not
          merely unavailable, it is silently dropped — Shared.cast('EMBER', 64) round-trips to 0 with
          a valid checksum. tools/check-content.js now fails on any cast spec that reaches past bit 5,
          so that trap cannot be walked into.
     If this page must one day read LETTER_READ exactly, the bit belongs to ch5's cast, not ch4's,
     and something in ch5's six would have to give it up. */
  const mereText = '"We were four. I offered to go alone and was refused. One was never asked. We wrote the cold glyph with four hands, and came up gray. — Mere, who kept the fire, after."';
  C.bookExtras.push((roleId, ctx) => {
    if (roleId !== 'reader' || ctx.maxChapter < 4) return [];
    const u = (ctx.state && ctx.state.unlocked && ctx.state.unlocked.ch4) || {};
    const out = [
      { t: 'h', text: 'The Older Alphabet' },
      { t: 'fine', text: 'From the Provost\'s primer, in her hand. Twenty-four letters, each with its modern letter beside it. No **Q** and no **X**. A plain substitution: slow, and yours.' },
      { t: 'key', items: OLD_ALPHA.split('').map(ch => ({ svg: runeGlyph(ch, 34), label: ch })) },
    ];
    if (u.flags && u.flags.LETTER && ctx.maxChapter >= 5) {
      out.push({ t: 'h', text: 'Mere\'s sheet, from the niche below' });
      out.push({ t: 'letter', text: mereText });
    }
    return out;
  });

  /* ---------- the Reader's figure ----------
     The oath's three worn words, drawn as a ring so the page cannot imply an order, and set at odd
     angles with no mark and no numbers. Read round from the top they come out ASH, THORN, WELL —
     neither the answer nor its reverse, so reading the picture fails and the Listener is needed. */
  /* The empty place is a gap in the ring with a dashed outline in it, not a filled disc: on a phone a
     dark disc read as a fifth thing on the ring. The caption is two lines so it can be read at size. */
  const oathRing = () => {
    const R = 62, cx = 150, cy = 90;
    const at = (deg, r) => [cx + Math.cos(deg * Math.PI / 180) * r, cy + Math.sin(deg * Math.PI / 180) * r];
    const put = (name, deg) => { const [x, y] = at(deg, R); return `<g transform="translate(${x.toFixed(1)},${y.toFixed(1)}) scale(1.2)" style="color:#f2d27a">${G.inner(name)}</g>`; };
    const [ex, ey] = at(265, R), [ax, ay] = at(285, R), [bx, by] = at(245, R);
    return `<svg viewBox="0 0 300 206" width="100%" style="display:block;height:auto">
      <path d="M${ax.toFixed(1)},${ay.toFixed(1)} A${R},${R} 0 1 1 ${bx.toFixed(1)},${by.toFixed(1)}" fill="none" stroke="rgba(212,169,78,.3)" stroke-width="10"/>
      ${put('ASH', -60)}${put('THORN', 55)}${put('WELL', 175)}
      <circle cx="${ex.toFixed(1)}" cy="${ey.toFixed(1)}" r="15" fill="none" stroke="rgba(212,169,78,.6)" stroke-width="1.6" stroke-dasharray="4 4"/>
      <text x="150" y="182" text-anchor="middle" fill="rgba(233,226,210,.7)" font-size="13" font-family="Cinzel,serif">three worn words and one empty place</text>
      <text x="150" y="200" text-anchor="middle" fill="rgba(233,226,210,.7)" font-size="13" font-family="Cinzel,serif">no first, no last</text>
    </svg>`;
  };

  /* ---------- the Seer's figures ----------
     Three things, one plate each so the labels can be read on a phone: the shelf board and where it is
     marked, the paint and what is under it, the scroll's ring and where it is cut. No arrow, no
     direction, no rule — the Seer reports cuts. */
  const FONT = 'font-family="Cinzel,serif"';
  // A — the shelf board, six blank spines, one mark at the right-hand end
  const underBoard = (() => {
    let s = `<svg viewBox="0 0 360 114"><rect width="360" height="114" fill="#000"/>`;
    s += `<text x="180" y="20" text-anchor="middle" fill="#a482e6" font-size="13" ${FONT}>the board is marked at the right-hand end</text>`;
    s += `<rect x="14" y="32" width="300" height="46" fill="none" stroke="#fff" stroke-width="1.2"/>`;
    for (let i = 0; i < 6; i++) s += `<rect x="${24 + i * 48}" y="38" width="36" height="34" fill="none" stroke="#fff" stroke-width="1"/><text x="${42 + i * 48}" y="100" text-anchor="middle" fill="#fff" font-size="14" ${FONT}>${i + 1}</text>`;
    s += `<path d="M334,45 L320,55 L334,65 Z" fill="#a482e6"/>`;
    return s + `</svg>`;
  })();
  // B — under the paint: four walking in, no child
  const underTapestry = (() => {
    let s = `<svg viewBox="0 0 360 152"><rect width="360" height="152" fill="#000"/><g transform="translate(0,-92)">`;
    s += `<rect x="14" y="102" width="332" height="96" fill="none" stroke="#fff" stroke-width="1.2"/>`;
    s += `<g stroke="#fff" fill="none" stroke-width="1.4">${[0, 1, 2].map(i => `<path d="M${292 + i * 12},190 C${286 + i * 12},166 ${294 + i * 12},152 ${300 + i * 12},134 C${306 + i * 12},152 ${314 + i * 12},166 ${304 + i * 12},190"/>`).join('')}</g>`;
    /* Two figures do something the others do not: the fourth carries, the second reaches back the way
       they came. Both are the Seer's corner of the study, and they are on no other surface — the
       count is not, and never was: the Hearth said 'four, as one, went through' in Chapter II. */
    for (let i = 0; i < 4; i++) {
      const x = 62 + i * 44, back = i === 1;
      s += `<g transform="translate(${x},190)"><path d="M-7,0 L-5,-34 L5,-34 L7,0 Z" fill="#fff"/><circle cx="${back ? -2 : 0}" cy="-40" r="5" fill="#fff"/><path d="${back ? 'M-5,-30 L-16,-22' : 'M5,-30 L16,-22'}" stroke="#fff" stroke-width="3" stroke-linecap="round"/><path d="M-3,0 L-24,5 L4,0 Z" fill="#fff" opacity=".4"/>`
        + (i === 3 ? `<g transform="translate(24,-26) scale(0.62)" style="color:#a482e6">${G.shapeInner('Flame', true)}</g>` : '') + `</g>`;
    }
    s += `</g>`;
    s += `<text x="180" y="126" text-anchor="middle" fill="#a482e6" font-size="13" ${FONT}>four walk in, no child —</text>`;
    s += `<text x="180" y="144" text-anchor="middle" fill="#a482e6" font-size="13" ${FONT}>the fourth carries, the second reaches back</text>`;
    return s + `</svg>`;
  })();
  // C — the scroll's ring, and the two cuts in it
  const underRing = (() => {
    const cx = 96, cy = 98, R = 54;
    let s = `<svg viewBox="0 0 360 210"><rect width="360" height="210" fill="#000"/>`;
    s += `<g stroke="#fff" fill="none" stroke-width="1.4"><circle cx="${cx}" cy="${cy}" r="${R}"/>`;
    s += [0, 1, 2, 3].map(i => { const a = (i / 4 * 360 - 90) * Math.PI / 180, x = (cx + Math.cos(a) * R).toFixed(1), y = (cy + Math.sin(a) * R).toFixed(1); return `<circle cx="${x}" cy="${y}" r="15" fill="#000"/><text x="${x}" y="${(+y + 5).toFixed(1)}" text-anchor="middle" fill="#fff" font-size="14" ${FONT} stroke="none">${i + 1}</text>`; }).join('');
    s += `</g>`;
    /* Two cuts, drawn the same white and lettered the same size: slot 2 (right of the ring) carries a
       long scratch, slot 4 (left of it) a small notch. Not ch3's pair, on purpose -- see ch4.js. Which kind of cut a sigil starts at is the
       Binder's Law, so neither cut takes the violet — an accent here would say which one matters, and
       that is the whole of the Binder's seat at this puzzle. Same shape as the Prologue's lamp foot. */
    s += `<path d="M${cx + R + 28},${cy - 22} L${cx + R + 28},${cy + 22}" stroke="#fff" stroke-width="3" stroke-linecap="round"/>`;
    s += `<path d="M${cx - R - 28},${cy - 4} L${cx - R - 28},${cy + 4}" stroke="#fff" stroke-width="3" stroke-linecap="round"/>`;
    s += `<g fill="#fff" font-size="14" ${FONT}><text x="204" y="68">beside slot 2 —</text><text x="204" y="88">a long scratch</text>`;
    s += `<text x="204" y="120">beside slot 4 —</text><text x="204" y="140">a small notch</text></g>`;
    s += `<text x="180" y="198" text-anchor="middle" fill="#fff" opacity=".7" font-size="13" ${FONT}>three cuts in this room, and nothing else</text>`;
    return s + `</svg>`;
  })();

  // Seer, Wren tab: shadows in the study — the fire at the right; four away, the Provost's away, Wren's toward.
  const underShadows = `<svg viewBox="0 0 360 258">
    <rect width="360" height="258" fill="#000"/>
    <g stroke="#fff" fill="none" stroke-width="1.2"><rect x="10" y="10" width="340" height="214"/><rect x="20" y="136" width="90" height="16"/><rect x="120" y="24" width="100" height="56"/><path d="M310,160 L310,130 M302,136 L318,136"/></g>
    <g fill="#fff" opacity=".9"><circle cx="70" cy="96" r="6"/><circle cx="110" cy="180" r="6"/><circle cx="160" cy="132" r="6"/><circle cx="210" cy="184" r="6"/><circle cx="268" cy="100" r="6"/><circle cx="250" cy="150" r="6"/></g>
    <g stroke="#fff" stroke-width="3" opacity=".55" stroke-linecap="round"><path d="M70,96 L36,90"/><path d="M110,180 L76,182"/><path d="M160,132 L126,128"/><path d="M210,184 L176,188"/><path d="M268,100 L257,97"/></g>
    <g stroke="#a482e6" stroke-width="3" opacity=".9" stroke-linecap="round" fill="none"><path d="M250,144 L250,30"/><path d="M243,38 L250,29 L257,38"/></g><text x="300" y="32" text-anchor="middle" fill="#a482e6" font-size="13" font-family="Cinzel,serif">to the Hearth</text>
    <g fill="#fff" font-size="14" font-family="Cinzel,serif" text-anchor="middle"><text x="70" y="118">Reader</text><text x="110" y="202">Listener</text><text x="160" y="154">Seer</text><text x="210" y="206">Binder</text><text x="300" y="120">the Provost</text><text x="250" y="172" fill="#a482e6">Wren</text><text x="310" y="182">the fire</text></g>
    <text x="180" y="246" text-anchor="middle" fill="#fff" font-size="13" font-family="Cinzel,serif" opacity=".7">shadows, as they fall — one passes the fire by</text>
  </svg>`;

  /* ---------- the Binder's figure ----------
     What a board hung the other way up does, drawn: every tile turns over, and the place numbers do
     not. That last clause is the Binder's alone — the Reader's Book gives the turning and not the
     places — so it is the one thing the shelf cannot be solved without.
     Both rows are drawn the same white, and the one accent is on the place numbers, which are the
     thing that does not move. Painting the turned row in the Binder's color said "this is tonight's
     board", which is the Seer's fact and not on this page. The rule has two arms and the drawing
     shows both. */
  const turnedBoard = () => {
    const row = (y, flipped, numColor) => {
      let s = '';
      for (let i = 0; i < 6; i++) {
        const x = 22 + i * 42;
        s += `<rect x="${x}" y="${y}" width="34" height="30" rx="3" fill="none" stroke="rgba(255,255,255,.35)"/>`;
        s += `<g transform="translate(${x + 17},${y + 15}) rotate(${flipped ? 180 : 0})"><path d="M-7,4 L0,-5 L7,4" fill="none" stroke="rgba(255,255,255,.8)" stroke-width="2" stroke-linecap="round"/></g>`;
        s += `<text x="${x + 17}" y="${y + 52}" text-anchor="middle" fill="${numColor}" font-size="15" font-family="Cinzel,serif">${i + 1}</text>`;
      }
      return s;
    };
    return `<svg viewBox="0 0 300 192" width="100%" style="display:block;height:auto">
      ${row(10, false, '#d96b4a')}
      <path d="M8,18 L18,25 L8,32 Z" fill="rgba(255,255,255,.7)"/>
      ${row(98, true, '#d96b4a')}
      <path d="M290,106 L280,113 L290,120 Z" fill="rgba(255,255,255,.7)"/>
      <text x="150" y="184" text-anchor="middle" fill="#d96b4a" font-size="12.5" font-family="Cinzel,serif">either way up, the numbers do not move</text>
    </svg>`;
  };

  /* A thread, drawn two ways: whole, and the empty bracket where one should be. The Binder's Wren tab
     is the one place in this chapter a thread is a picture rather than a color. */
  const threadLine = (kind) => `<svg viewBox="0 0 90 16" style="width:74px;height:14px;vertical-align:middle">${
    kind === 'whole' ? '<path d="M4,8 C24,2 34,14 52,8 S74,4 86,8" fill="none" stroke="#d96b4a" stroke-width="2.5" stroke-linecap="round"/>'
      : kind === 'grey' ? '<path d="M4,8 C24,2 34,14 52,8 S74,4 86,8" fill="none" stroke="rgba(200,200,210,.7)" stroke-width="2.5" stroke-linecap="round"/>'
      : '<path d="M4,8 L86,8" fill="none" stroke="rgba(255,255,255,.45)" stroke-width="2" stroke-dasharray="3 7" stroke-linecap="round"/>'
  }</svg>`;

  const SPINES = ['EMBER', 'WELL', 'ASH', 'KNOT', 'CROWN', 'VEIL'];  // as the stamps stand, place 1..6

  C.chapters.push({
    id: 'ch4',
    pages: (roleId, ctx) => {
      const f = ctx.flags || {};
      const P = { sight: [], wren: [], speak: [] };
      P.speak.push({ t: 'fine', text: 'Nothing to speak this chapter. The Hearth will call you by name.' });
      P.speak.push({ t: 'fine', text: '*' + L.houseRule + '*' });

      /* ================= READER ================= */
      if (roleId === 'reader') {
        P.sight.push({ t: 'h', text: 'What is written in this room' });
        P.sight.push({ t: 'p', text: 'Her primer is in your **Book** now. Read the journal on the desk aloud, both lines.' });
        P.sight.push({ t: 'p', text: '**The third shelf.** The Hearth shows the stamps rubbed away. You see them clean:' });
        P.sight.push({ t: 'table', head: ['spine', 'it says'], rows: SPINES.map((w, i) => [`<b>${i + 1}</b>`, `<b>${w}</b>`]) });
        P.sight.push({ t: 'fine', text: 'That is how they read **as they stand.** Which end of the board is marked is not yours to see.' });
        P.sight.push({ t: 'p', text: '**The oath scroll.** Three words round the ring, worn nearly smooth:' });
        P.sight.push({ t: 'html', html: oathRing() });
        P.sight.push({ t: 'p', text: '**ASH, THORN, WELL.** Nobody cut the fourth. The swearer chooses it.' });
        P.sight.push({ t: 'fine', text: 'The ring cannot tell you which word comes first.' });

        P.wren.push({ t: 'h', text: 'The name' });
        P.wren.push({ t: 'html', html: runeLine('WRENN', { height: 60 }) });
        P.wren.push({ t: 'fine', text: 'Say it to Wren, out loud:' });
        P.wren.push({ t: 'letter', text: '“I read your name tonight, letter by letter. Two Ns. She wrote it, and she chalked our door too. You’re not a bird, Wren. You’re the hollow of a bell. The part that rings.”' });
      }

      /* ================= LISTENER ================= */
      if (roleId === 'listener') {
        P.sight.push({ t: 'h', text: 'What you can hear' });
        P.sight.push({ t: 'audio', label: 'The bell on the mantel, struck', strip: CA.strip([-1, -2, 'rest', 2, 1, -3]),
          play: (A) => { CA.playSteps(A, [-1, -2], 58); CA.later(() => CA.announce(2, { rest: true }), 2000); CA.later(() => CA.playSteps(A, [2, 1, -3], 66, { offset: 3 }), 2400); return 2400 + 4 * 650 + 500; },
          text: 'A low, courteous voice. **The Envoy:** *"The Crown wants the Cold open. I want the child alive. Tonight, Ilsabet, those are the same thing."*\n\nThen hers. **The Provost:** *"Then the Crown will go through me. And through it."*' });
        P.sight.push({ t: 'fine', text: 'Say whose voice it was, and her last two words.' });
        P.sight.push({ t: 'audio', label: 'The third shelf, humming', strip: CA.strip([2, 2, 1]), play: (A) => CA.playSteps(A, [2, 2, 1]),
          text: '**Up two, up two, up one.** Four books, and only one order climbs like that.' });
        /* One step, not the contour. Two steps pin the three words on their own, and then the Reader's
           set is confirming what this page has already said. One step plus three known words is still
           exactly one order; one step without them is thirty-two boards. */
        P.sight.push({ t: 'audio', label: 'The scroll, when the ring is touched', strip: CA.strip([-1]).replace(/<\/div>$/, '<span class="step rest"><b>◆</b>then it dies away</span></div>'), play: (A) => CA.playSteps(A, [-1]),
          text: '**Down one, and then the tune goes out of it.** That is the first word to the second, and nothing more.' });
        P.sight.push({ t: 'fine', text: 'You never hear a word\'s name, only how far the tune steps.' });

        P.wren.push({ t: 'h', text: 'What the bell would not keep' });
        P.wren.push({ t: 'html', html: `<div class="heartbeats">${['Reader', 'Listener', 'Seer', 'Binder'].map(n => `<div class="hb"><span>${n}</span>${D.trace('normal')}</div>`).join('')}<div class="hb"><span>the Provost</span>${D.trace(f.SURRENDERED ? 'fast' : 'normal')}</div><div class="hb"><span>Wren</span>${D.trace('flat')}</div></div>` });
        P.wren.push({ t: 'fine', text: 'Say it to Wren, out loud:' });
        P.wren.push({ t: 'letter', text: '“That bell keeps everyone’s voice. Not yours, not once. Under us all it keeps the fire’s slow hum. Your tune. So I’ve been… keeping your words myself. All of them. Just in case.”' });
      }

      /* ================= SEER ================= */
      if (roleId === 'seer') {
        P.sight.push({ t: 'h', text: 'Under three things in this study' });
        P.sight.push({ t: 'svg', cls: 'underlayer', svg: underBoard });
        P.sight.push({ t: 'svg', cls: 'underlayer', svg: underTapestry });
        P.sight.push({ t: 'svg', cls: 'underlayer', svg: underRing });
        P.sight.push({ t: 'fine', text: 'Three cuts in the whole room. **The two in the scroll\'s ring are not the same kind.**' });
        P.sight.push({ t: 'p', text: 'The tapestry is painted over an older picture. Say which of them carries, and which of them reaches back.' });
        P.sight.push({ t: 'fine', text: 'Say where the cuts are, and stop.' });

        P.wren.push({ t: 'h', text: 'The shadow, again' });
        P.wren.push({ t: 'svg', cls: 'underlayer', svg: underShadows });
        P.wren.push({ t: 'fine', text: 'Say it to Wren, out loud:' });
        P.wren.push({ t: 'letter', text: '“Your shadow walked straight past her fire tonight. It only wants the Hearth. It always has. So I stood by the wall. You thought I was just cold. I’m not. I’m busy.”' });
      }

      /* ================= BINDER ================= */
      if (roleId === 'binder') {
        P.sight.push({ t: 'h', text: 'Two rules, and two threads' });
        P.sight.push({ t: 'html', html: turnedBoard() });
        P.sight.push({ t: 'p', text: '**Whichever way up a board hangs, every book keeps its place.** Hung the other way up, it says the opposite word.' });
        /* The qualifier is load-bearing and was added after ch3's ward gave the Binder a second class of
           ring. Until then this page could say 'a sigil begins at the scratch' flat, because every ring in
           the game obeyed it. ch3 now teaches that a VIGIL WARD begins at the notch instead -- so a Binder
           holding both pages had two unconditional rules that contradict each other, and the wrong one
           governs this ring, which is the only commit-once puzzle in the game. Naming the class here is what
           lets the Binder tell which rule applies. tools/scripts/ch4-oath-check.js asserts it stays. */
        P.sight.push({ t: 'p', text: 'The Provost\'s scroll is Founders\' work, not a Vigil ward like the Tower door. So **a sigil begins at the scratch, and runs the way a clock counts**. A notch is only a maker\'s mark.' });
        /* The costs of the two locks are Law 4, which the Binder's Book prints from this chapter on (P5). */
        P.sight.push({ t: 'p', text: 'The lock goes where the three words leave room. **Only KNOT or EMBER** will take the wax. Your **Book** says what each one costs.' });
        P.sight.push({ t: 'p', text: '**Her thread to Wren is gray.** Hers to the four of you is red, and not tied yet.' });
        P.sight.push({ t: 'fine', text: 'You cannot read a word or find a cut. Ask for both.' });

        P.wren.push({ t: 'h', text: 'No thread found' });
        P.wren.push({ t: 'html', html: '<ul class="blk-list">'
          + '<li>' + threadLine('whole') + ' <strong>the four of you:</strong> one thread each, all night.</li>'
          + '<li>' + threadLine('grey') + ' <strong>the Provost to Wren:</strong> gray. A goodbye already started.</li>'
          + '<li>' + threadLine('none') + ' <strong>Wren:</strong> nothing going out, to anyone. Nothing comes back.</li></ul>' });
        P.wren.push({ t: 'fine', text: 'Say it to Wren, out loud:' });
        P.wren.push({ t: 'letter', text: '“Nothing goes out from you, Wren. Not one thread. So I will keep holding my end out until one takes. There is no rule against it. I checked.”' });
      }
      return P;
    },
  });
})();
