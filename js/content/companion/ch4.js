/* Companion — Chapter IV: The Oath (EMBER · cast: LETTER, ORIEL, SORREL, VANE_ACCEPT, SURRENDERED, WREN_SCARED).
   One fact each, and no page holds another's: the Reader has the words on the spines and on the scroll,
   the Listener one step of each tune, the Seer where every cut is and what is under the paint,
   the Binder what a turned board does to a book, which kind of cut a sigil starts at, and what a lock costs. */
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
     the study is searched, and it says 'We were four' and 'came up grey' — the first field of the
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
  const mereText = '"We were four. I offered to go alone and was refused. One was never asked. We wrote the cold glyph with four hands, and came up grey. — Mere, who kept the fire, after."';
  C.bookExtras.push((roleId, ctx) => {
    if (roleId !== 'reader' || ctx.maxChapter < 4) return [];
    const u = (ctx.state && ctx.state.unlocked && ctx.state.unlocked.ch4) || {};
    const out = [
      { t: 'h', text: 'The primer (from the Provost\'s study)' },
      { t: 'p', text: 'Twenty-four letters, each with its modern letter written beside it in the Provost\'s hand. No **Q** and no **X**. A plain substitution: slow, and yours.' },
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
  const oathRing = () => {
    const at = (deg, r) => [150 + Math.cos(deg * Math.PI / 180) * r, 84 + Math.sin(deg * Math.PI / 180) * r];
    const put = (name, deg) => { const [x, y] = at(deg, 58); return `<g transform="translate(${x.toFixed(1)},${y.toFixed(1)}) scale(1.05)" style="color:#f2d27a">${G.inner(name)}</g>`; };
    const [ex, ey] = at(265, 58);
    return `<svg viewBox="0 0 300 168" style="width:100%;max-width:300px;height:auto">
      <circle cx="150" cy="84" r="58" fill="none" stroke="rgba(212,169,78,.3)" stroke-width="10"/>
      ${put('ASH', -60)}${put('THORN', 55)}${put('WELL', 175)}
      <circle cx="${ex.toFixed(1)}" cy="${ey.toFixed(1)}" r="17" fill="#0b0a10" stroke="rgba(212,169,78,.45)" stroke-dasharray="4 4"/>
      <text x="150" y="162" text-anchor="middle" fill="rgba(233,226,210,.55)" font-size="11" font-family="Cinzel,serif">three worn words and one empty place · no first, no last</text>
    </svg>`;
  };

  /* ---------- the Seer's figure ----------
     One plate, three things: the shelf board and where it is marked, the paint and what is under it,
     the scroll's ring and where it is cut. No arrow, no direction, no rule — the Seer reports cuts. */
  const underMarks = (() => {
    let s = `<svg viewBox="0 0 360 336"><rect width="360" height="336" fill="#000"/>`;
    // A — the shelf board, six blank spines, one mark
    s += `<rect x="14" y="22" width="300" height="46" fill="none" stroke="#fff" stroke-width="1.2"/>`;
    for (let i = 0; i < 6; i++) s += `<rect x="${24 + i * 48}" y="28" width="36" height="34" fill="none" stroke="#fff" stroke-width="1"/><text x="${42 + i * 48}" y="82" text-anchor="middle" fill="#fff" font-size="10" font-family="Cinzel,serif">${i + 1}</text>`;
    s += `<path d="M332,37 L320,45 L332,53 Z" fill="#a482e6"/>`;
    s += `<text x="180" y="16" text-anchor="middle" fill="#a482e6" font-size="10" font-family="Cinzel,serif">the board is marked at the right-hand end</text>`;
    // B — under the paint: four walking in, no child
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
    s += `<text x="180" y="214" text-anchor="middle" fill="#a482e6" font-size="10" font-family="Cinzel,serif">four walk in, no child — the fourth carries, the second reaches back</text>`;
    // C — the scroll's ring, and the two cuts in it
    s += `<g transform="translate(110,278)" stroke="#fff" fill="none" stroke-width="1.4"><circle r="40"/>`;
    s += [0, 1, 2, 3].map(i => { const a = (i / 4 * 360 - 90) * Math.PI / 180, x = (Math.cos(a) * 40).toFixed(1), y = (Math.sin(a) * 40).toFixed(1); return `<circle cx="${x}" cy="${y}" r="11"/><text x="${x}" y="${(+y + 4).toFixed(1)}" text-anchor="middle" fill="#fff" font-size="10" font-family="Cinzel,serif" stroke="none">${i + 1}</text>`; }).join('');
    s += `</g>`;
    /* Two cuts, drawn the same white and lettered the same size: slot 2 (right of the ring) carries a
       long scratch, slot 4 (left of it) a small notch. Not ch3's pair, on purpose -- see ch4.js. Which kind of cut a sigil starts at is the
       Binder's Law, so neither cut takes the violet — an accent here would say which one matters, and
       that is the whole of the Binder's seat at this puzzle. Same shape as the Prologue's lamp foot. */
    s += `<path d="M174,258 L174,298" stroke="#fff" stroke-width="3" stroke-linecap="round"/>`;
    s += `<path d="M46,274 L46,282" stroke="#fff" stroke-width="3" stroke-linecap="round"/>`;
    s += `<text x="262" y="264" text-anchor="middle" fill="#fff" font-size="10" font-family="Cinzel,serif">beside slot 2 — a long scratch</text>`;
    s += `<text x="262" y="290" text-anchor="middle" fill="#fff" font-size="10" font-family="Cinzel,serif">beside slot 4 — a small notch</text>`;
    s += `<text x="180" y="330" text-anchor="middle" fill="#fff" opacity=".7" font-size="9" font-family="Cinzel,serif">three cuts in this room, and nothing else</text>`;
    return s + `</svg>`;
  })();

  // Seer, Wren tab: shadows in the study — the fire at the right; four away, the Provost's away, Wren's toward.
  const underShadows = `<svg viewBox="0 0 360 200">
    <rect width="360" height="200" fill="#000"/>
    <g stroke="#fff" fill="none" stroke-width="1.2"><rect x="10" y="10" width="340" height="180"/><rect x="20" y="120" width="90" height="16"/><rect x="120" y="24" width="120" height="60"/><path d="M300,140 L300,110 M292,116 L308,116"/></g>
    <g fill="#fff" opacity=".9"><circle cx="70" cy="90" r="6"/><circle cx="110" cy="150" r="6"/><circle cx="160" cy="120" r="6"/><circle cx="200" cy="160" r="6"/><circle cx="260" cy="90" r="6"/><circle cx="240" cy="150" r="6"/></g>
    <g stroke="#fff" stroke-width="3" opacity=".55" stroke-linecap="round"><path d="M70,90 L36,84"/><path d="M110,150 L76,152"/><path d="M160,120 L126,116"/><path d="M200,160 L166,164"/><path d="M260,90 L228,82"/></g>
    <g stroke="#a482e6" stroke-width="3" opacity=".9" stroke-linecap="round"><path d="M240,150 L278,146"/></g>
    <g fill="#fff" font-size="9" font-family="Cinzel,serif"><text x="60" y="108">Reader</text><text x="100" y="168">Listener</text><text x="150" y="138">Seer</text><text x="190" y="178">Binder</text><text x="248" y="80">the Provost</text><text x="230" y="168" fill="#a482e6">Wren</text><text x="300" y="158" text-anchor="middle">the fire</text></g>
    <text x="180" y="194" text-anchor="middle" fill="#fff" font-size="9" font-family="Cinzel,serif" opacity=".7">shadows, as they fall</text>
  </svg>`;

  /* ---------- the Binder's figure ----------
     What a board hung the other way up does, drawn: every tile turns over, and the place numbers do
     not. That last clause is the Binder's alone — the Reader's Book gives the turning and not the
     places — so it is the one thing the shelf cannot be solved without.
     Both rows are drawn the same white, and the one accent is on the place numbers, which are the
     thing that does not move. Painting the turned row in the Binder's colour said "this is tonight's
     board", which is the Seer's fact and not on this page. The rule has two arms and the drawing
     shows both. */
  const turnedBoard = () => {
    const row = (y, flipped, numColor) => {
      let s = '';
      for (let i = 0; i < 6; i++) {
        const x = 22 + i * 42;
        s += `<rect x="${x}" y="${y}" width="34" height="30" rx="3" fill="none" stroke="rgba(255,255,255,.35)"/>`;
        s += `<g transform="translate(${x + 17},${y + 15}) rotate(${flipped ? 180 : 0})"><path d="M-7,4 L0,-5 L7,4" fill="none" stroke="rgba(255,255,255,.8)" stroke-width="2" stroke-linecap="round"/></g>`;
        s += `<text x="${x + 17}" y="${y + 46}" text-anchor="middle" fill="${numColor}" font-size="11" font-family="Cinzel,serif">${i + 1}</text>`;
      }
      return s;
    };
    return `<svg viewBox="0 0 300 176" style="width:100%;max-width:300px;height:auto">
      ${row(14, false, '#d96b4a')}
      <path d="M8,22 L18,29 L8,36 Z" fill="rgba(255,255,255,.7)"/>
      ${row(94, true, '#d96b4a')}
      <path d="M290,102 L280,109 L290,116 Z" fill="rgba(255,255,255,.7)"/>
      <text x="150" y="172" text-anchor="middle" fill="#d96b4a" font-size="11" font-family="Cinzel,serif">either way up, the numbers do not move</text>
    </svg>`;
  };

  /* A thread, drawn two ways: whole, and the empty bracket where one should be. The Binder's Wren tab
     is the one place in this chapter a thread is a picture rather than a colour. */
  const threadLine = (kind) => `<svg viewBox="0 0 90 16" style="width:74px;height:14px;vertical-align:middle">${
    kind === 'whole' ? '<path d="M4,8 C24,2 34,14 52,8 S74,4 86,8" fill="none" stroke="#d96b4a" stroke-width="2.5" stroke-linecap="round"/>'
      : '<path d="M6,2 L2,2 L2,14 L6,14 M84,2 L88,2 L88,14 L84,14" fill="none" stroke="rgba(255,255,255,.35)" stroke-width="2"/>'
  }</svg>`;

  const SPINES = ['EMBER', 'WELL', 'ASH', 'KNOT', 'CROWN', 'VEIL'];  // as the stamps stand, place 1..6

  C.chapters.push({
    id: 'ch4',
    pages: (roleId, ctx) => {
      const f = ctx.flags || {};
      const P = { sight: [], wren: [], speak: [] };
      const scared = !!f.WREN_SCARED;
      P.speak.push({ t: 'fine', text: 'Nothing to speak this chapter. The Hearth will call you by name.' });
      P.speak.push({ t: 'fine', text: '*' + L.houseRule + '*' });

      /* ================= READER ================= */
      if (roleId === 'reader') {
        P.sight.push({ t: 'h', text: 'What is written in this room' });
        P.sight.push({ t: 'p', text: 'The primer she left open is in your **Book** now. Read the journal on the desk out loud, both lines.' });
        P.sight.push({ t: 'p', text: '**The third shelf.** Six books, each stamped with a shape. The Hearth shows them rubbed to nothing. Here they are clean:' });
        P.sight.push({ t: 'table', head: ['spine', 'it says'], rows: SPINES.map((w, i) => [`<b>${i + 1}</b>`, `<b>${w}</b>`]) });
        P.sight.push({ t: 'fine', text: 'That is what they say **as they stand.** Which end of the board is marked is not yours to see. Somebody here can.' });
        P.sight.push({ t: 'p', text: '**The oath scroll.** Three words are cut round the ring, worn nearly smooth. Clean, here:' });
        P.sight.push({ t: 'html', html: oathRing() });
        P.sight.push({ t: 'p', text: '**ASH, THORN, WELL** — *fire; a gate; down.* Nobody cut the fourth. The swearer chooses that one.' });
        P.sight.push({ t: 'fine', text: 'A ring has no first and no last. Somebody here can hear how the first two step.' });

        P.wren.push({ t: 'h', text: 'The name' });
        P.wren.push({ t: 'html', html: runeLine('WRENN', { height: 60 }) });
        P.wren.push({ t: 'p', text: 'On the Vigil roll the Provost wrote it herself, in the old letters. You ciphered it tonight with her own primer.' });
        P.wren.push({ t: 'p', text: 'Not a bird. *Wrenn* is the hollow of a bell — the space inside it that makes the sound.' });
        P.wren.push({ t: 'p', text: 'You decided, a year ago, that it was a spelling mistake. You have never asked her.' });
      }

      /* ================= LISTENER ================= */
      if (roleId === 'listener') {
        P.sight.push({ t: 'h', text: 'What you can hear' });
        P.sight.push({ t: 'audio', label: 'The bell on the mantel, struck', strip: CA.strip([-1, -2, 'rest', 2, 1, -3]),
          play: (A) => { CA.playSteps(A, [-1, -2], 58); CA.later(() => CA.announce(2, { rest: true }), 2000); CA.later(() => CA.playSteps(A, [2, 1, -3], 66, { offset: 3 }), 2400); return 2400 + 4 * 650 + 500; },
          text: 'A low voice, courteous and certain — **the Envoy:** *"The Crown will have the Cold open, one way or another."*\n\nThen hers — **the Provost:** *"Then the Crown will go through me. And through it."*' });
        P.sight.push({ t: 'fine', text: 'Say whose voice it was, and say her last two words. Nobody here will like them. Say them anyway.' });
        P.sight.push({ t: 'audio', label: 'The third shelf, humming', strip: CA.strip([2, 2, 1]), play: (A) => CA.playSteps(A, [2, 2, 1]),
          text: '**Up two, up two, up one.** Four books, three climbs, and only one order climbs like that.' });
        /* One step, not the contour. Two steps pin the three words on their own, and then the Reader's
           set is confirming what this page has already said. One step plus three known words is still
           exactly one order; one step without them is thirty-two boards. */
        P.sight.push({ t: 'audio', label: 'The scroll, when the ring is touched', strip: CA.strip([-1]) + '<div class="arrow-strip"><span class="step rest"><b>◆</b>then it dies away</span></div>', play: (A) => CA.playSteps(A, [-1]),
          text: '**Down one, and then the tune goes out of it.** Three words are cut there. The ring will only give you the step from the first to the second.' });
        P.sight.push({ t: 'fine', text: 'You never hear a word\'s name, only how far the tune steps. Three words, one step — the Reader has to tell you which three.' });

        P.wren.push({ t: 'h', text: 'What the bell would not keep' });
        P.wren.push({ t: 'html', html: `<div class="heartbeats">${['Reader', 'Listener', 'Seer', 'Binder'].map(n => `<div class="hb"><span>${n}</span>${D.trace('normal')}</div>`).join('')}<div class="hb"><span>the Provost</span>${D.trace(f.SURRENDERED ? 'fast' : 'normal')}</div><div class="hb"><span>Wren</span>${D.trace('flat')}</div></div>` });
        P.wren.push({ t: 'p', text: 'You struck it twice more while nobody was looking. It gave you the Provost, and the Envoy, and your own voice asking for the primer.' });
        P.wren.push({ t: 'p', text: 'It did not give you Wren. It keeps every voice in this room but one.' });
        P.wren.push({ t: 'p', text: 'You decided years ago that the fault was in your ear. You have never said so out loud.' });
      }

      /* ================= SEER ================= */
      if (roleId === 'seer') {
        P.sight.push({ t: 'h', text: 'Under three things in this study' });
        P.sight.push({ t: 'p', text: 'The shelf board, the tapestry, and the scroll on the desk. All three have something under them.' });
        P.sight.push({ t: 'svg', cls: 'underlayer', svg: underMarks });
        P.sight.push({ t: 'fine', text: 'Three cuts, and nothing else cut anywhere in the room. **The two in the scroll\'s ring are not the same kind.**' });
        P.sight.push({ t: 'p', text: 'The tapestry is painted, and painted over. Say which of them has something in his hand, and which of them reaches back.' });
        P.sight.push({ t: 'fine', text: 'What a cut obliges is not yours — one kind starts a sigil and one does not, and that is the Binder\'s. Say where they are, and stop.' });

        P.wren.push({ t: 'h', text: 'The shadow, again' });
        P.wren.push({ t: 'svg', cls: 'underlayer', svg: underShadows });
        P.wren.push({ t: 'p', text: 'Every shadow in this room falls away from the fire. Wren\'s still falls towards it.' });
        P.wren.push({ t: 'p', text: scared ? 'You blamed the lamp in the dormitory. There is no lamp here, and it still falls the wrong way.' : 'You blamed the lamp in the dormitory. There is no lamp here.' });
      }

      /* ================= BINDER ================= */
      if (roleId === 'binder') {
        P.sight.push({ t: 'h', text: 'Two rules, and two threads' });
        P.sight.push({ t: 'html', html: turnedBoard() });
        P.sight.push({ t: 'p', text: '**Whichever way up a board hangs, every book keeps its place.** Hung the other way up, it says the opposite word. Which way this one hangs is not yours to see.' });
        /* The qualifier is load-bearing and was added after ch3's ward gave the Binder a second class of
           ring. Until then this page could say 'a sigil begins at the scratch' flat, because every ring in
           the game obeyed it. ch3 now teaches that a VIGIL WARD begins at the notch instead -- so a Binder
           holding both pages had two unconditional rules that contradict each other, and the wrong one
           governs this ring, which is the only commit-once puzzle in the game. Naming the class here is what
           lets the Binder tell which rule applies. tools/scripts/ch4-oath-check.js asserts it stays. */
        P.sight.push({ t: 'p', text: 'The Provost\'s scroll is Founders\' work. It is not a Vigil ward like the Tower door — so **a sigil begins at the scratch, and runs the way a clock counts**, the same rule as the lamp.' });
        P.sight.push({ t: 'p', text: 'On Founders\' work a notch is only a maker\'s mark. It says somebody made this, and nothing about where to start. What the three words leave over is where the lock goes.' });
        P.sight.push({ t: 'table', head: ['a lock', 'and what it costs'], rows: [
          ['<b>KNOT</b>', 'It cannot be untied. Not by you, not by her, not ever.'],
          ['<b>EMBER</b>', 'It can be reconsidered later, if there turns out to be a later.'],
        ] });
        P.sight.push({ t: 'p', text: 'Those two, and nothing else the wax takes. The one you swear to cannot tell the difference. You can.' });
        P.sight.push({ t: 'p', text: '**The Provost\'s thread to Wren is grey.** Hers to the four of you is red, and not tied yet.' });
        P.sight.push({ t: 'fine', text: 'You cannot read a word or find a cut. Ask for both.' });

        P.wren.push({ t: 'h', text: 'No thread found' });
        P.wren.push({ t: 'html', html: '<ul class="blk-list">'
          + '<li>' + threadLine('whole') + ' <strong>the four of you:</strong> one thread each, all night.</li>'
          + '<li>' + threadLine('none') + ' <strong>Wren:</strong> nothing going out, to anyone.</li></ul>' });
        P.wren.push({ t: 'p', text: 'A thread reaches her from the woman who named her. Nothing comes back — not to the Provost, not to you.' });
        P.wren.push({ t: 'p', text: scared ? 'You have looked every hour since the laundry, and twice since the stair. Still nothing.' : 'You have looked every hour since the laundry. There is still nothing to find.' });
        P.wren.push({ t: 'p', text: 'You decided years ago it was a blind spot in your own gift. You have never told anyone your gift has one.' });
      }
      return P;
    },
  });
})();
