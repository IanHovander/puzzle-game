/* Companion — Chapter IV: The Oath (EMBER · cast: LETTER, ORIEL, SORREL, VANE_ACCEPT, SURRENDERED, WREN_SCARED).
   One fact each, and no page holds another's: the Reader has the words on the spines and on the scroll,
   the Listener the order they come in, the Seer where each mark is cut and what is under the paint,
   the Binder what a board hung the other way up does and what a lock costs. */
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

  /* The Reader's permanent pages: the primer from Chapter IV on, and Mere's sheet once it has been
     rubbed. Both live in the Book, not on the Sight page — a permanent reference is never re-printed.
     The ch4 flags are read off the ch4 unlock itself, so the Book keeps them once the table has moved on. */
  const mereText = '"We were four. I offered to go alone and was refused. One was never asked. We wrote the cold glyph with four hands, and came up grey. — Mere, who kept the fire, after."';
  C.bookExtras.push((roleId, ctx) => {
    if (roleId !== 'reader' || ctx.maxChapter < 4) return [];
    const u = (ctx.state && ctx.state.unlocked && ctx.state.unlocked.ch4) || {};
    const out = [
      { t: 'h', text: 'The primer (from the Provost\'s study)' },
      { t: 'p', text: 'Twenty-four letters, each with its modern letter written beside it in the Provost\'s hand. No **Q** and no **X**. A plain substitution: slow, and yours.' },
      { t: 'key', items: OLD_ALPHA.split('').map(ch => ({ svg: runeGlyph(ch, 34), label: ch })) },
    ];
    if (u.flags && u.flags.LETTER) {
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
    for (let i = 0; i < 4; i++) {
      const x = 62 + i * 44;
      s += `<g transform="translate(${x},190)"><path d="M-7,0 L-5,-34 L5,-34 L7,0 Z" fill="#fff"/><circle cx="0" cy="-40" r="5" fill="#fff"/><path d="M5,-30 L16,-22" stroke="#fff" stroke-width="3" stroke-linecap="round"/><path d="M-3,0 L-24,5 L4,0 Z" fill="#fff" opacity=".4"/>`
        + (i === 3 ? `<g transform="translate(24,-26) scale(0.62)" style="color:#a482e6">${G.shapeInner('Flame', true)}</g>` : '') + `</g>`;
    }
    s += `<text x="180" y="214" text-anchor="middle" fill="#a482e6" font-size="10" font-family="Cinzel,serif">under the paint: four walking in, and no child</text>`;
    // C — the scroll's ring, one cut
    s += `<g transform="translate(110,278)" stroke="#fff" fill="none" stroke-width="1.4"><circle r="40"/>`;
    s += [0, 1, 2, 3].map(i => { const a = (i / 4 * 360 - 90) * Math.PI / 180, x = (Math.cos(a) * 40).toFixed(1), y = (Math.sin(a) * 40).toFixed(1); return `<circle cx="${x}" cy="${y}" r="11"/><text x="${x}" y="${(+y + 4).toFixed(1)}" text-anchor="middle" fill="#fff" font-size="10" font-family="Cinzel,serif" stroke="none">${i + 1}</text>`; }).join('');
    s += `</g>`;
    s += `<path d="M46,272 L58,278 L46,284 Z" fill="#a482e6"/>`;
    s += `<text x="250" y="282" text-anchor="middle" fill="#a482e6" font-size="10" font-family="Cinzel,serif">the ring is cut at slot 4</text>`;
    s += `<text x="180" y="330" text-anchor="middle" fill="#fff" opacity=".7" font-size="9" font-family="Cinzel,serif">two marks, and nothing else cut</text>`;
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
     places — so it is the one thing the shelf cannot be solved without. */
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
      ${row(14, false, 'rgba(255,255,255,.7)')}
      <path d="M8,22 L18,29 L8,36 Z" fill="rgba(255,255,255,.7)"/>
      ${row(94, true, '#d96b4a')}
      <path d="M290,102 L280,109 L290,116 Z" fill="#d96b4a"/>
      <text x="150" y="172" text-anchor="middle" fill="#d96b4a" font-size="11" font-family="Cinzel,serif">the numbers do not move</text>
    </svg>`;
  };

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
        P.sight.push({ t: 'p', text: 'The Provost left her primer open, and it is in your **Book** now. Read the journal on the desk out loud — both lines.' });
        P.sight.push({ t: 'p', text: '**The third shelf.** Six books, each stamped with a shape. The Hearth shows them rubbed to nothing. Here they are clean:' });
        P.sight.push({ t: 'table', head: ['spine', 'it says'], rows: SPINES.map((w, i) => [`<b>${i + 1}</b>`, `<b>${w}</b>`]) });
        P.sight.push({ t: 'fine', text: 'That is what they say **as they stand.** Whether the board is the right way up is not on your page. Somebody here can see which end is marked.' });
        P.sight.push({ t: 'p', text: '**The oath scroll.** Three words are cut round the ring, worn nearly smooth. Clean, here:' });
        P.sight.push({ t: 'html', html: oathRing() });
        P.sight.push({ t: 'p', text: '**ASH, THORN, WELL** — *fire; a gate; down.* Nobody cut the fourth. The swearer chooses that one.' });
        P.sight.push({ t: 'fine', text: 'A ring has no first and no last, so your page cannot say which word comes first. Somebody here can hear it.' });

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
        P.sight.push({ t: 'audio', label: 'The third shelf, humming', strip: CA.strip([2, -1, 3]), play: (A) => CA.playSteps(A, [2, -1, 3]),
          text: '**Up two, down one, up three.** Four books, three climbs, and only one order climbs like that.' });
        P.sight.push({ t: 'audio', label: 'The scroll, when the ring is touched', strip: CA.strip([-1, 4]) + '<div class="arrow-strip"><span class="step rest"><b>◆</b>then the lock</span></div>', play: (A) => CA.playSteps(A, [-1, 4]),
          text: '**Down one, up four.** Three words, and then a silence where the lock goes. The lock makes no sound at all.' });
        P.sight.push({ t: 'fine', text: 'You never hear a word\'s name, only how far the tune steps. The Reader has the words.' });

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
        P.sight.push({ t: 'fine', text: 'Two marks, and nothing else cut anywhere in the room.' });
        P.sight.push({ t: 'p', text: 'The tapestry is painted, and painted over. Say how many walk into the fire, and how many children are in it.' });
        P.sight.push({ t: 'fine', text: 'What a mark obliges is not yours. Say where it is cut, and stop.' });

        P.wren.push({ t: 'h', text: 'The shadow, again' });
        P.wren.push({ t: 'svg', cls: 'underlayer', svg: underShadows });
        P.wren.push({ t: 'p', text: 'Every shadow in this room falls away from the fire. The Provost\'s does. Wren\'s still falls towards it.' });
        P.wren.push({ t: 'p', text: scared ? 'You blamed the lamp in the dormitory. Wren has not looked at anything since the stair, and it still falls the wrong way.' : 'You blamed the lamp in the dormitory. There is no lamp here.' });
        P.wren.push({ t: 'p', text: 'A Warden with your Sight scraped this same paint as a boy, saw four, and was sent away. He is the Envoy now. You have his eyes.' });
      }

      /* ================= BINDER ================= */
      if (roleId === 'binder') {
        P.sight.push({ t: 'h', text: 'Two rules, and two threads' });
        P.sight.push({ t: 'html', html: turnedBoard() });
        P.sight.push({ t: 'p', text: '**A board hung the other way up says the opposite of what it said.** Every book keeps the place it stands in. Pull by the place, not by the reading.' });
        P.sight.push({ t: 'p', text: 'On a ring, the first word goes **in** the mark, and then clockwise. That has not changed since the lamp.' });
        P.sight.push({ t: 'table', head: ['a lock', 'and what it costs'], rows: [
          ['<b>KNOT</b>', 'It cannot be untied. Not by you, not by her, not after tonight.'],
          ['<b>EMBER</b>', 'It can be reconsidered later, if there turns out to be a later.'],
        ] });
        P.sight.push({ t: 'p', text: 'Those two, and nothing else the wax will take. The one you swear to cannot tell the difference. You can.' });
        P.sight.push({ t: 'p', text: '**The Provost\'s thread to Wren is grey.** Hers to the four of you is red, and not tied yet.' });
        P.sight.push({ t: 'fine', text: 'You cannot read a word or find a mark. Ask for both.' });

        P.wren.push({ t: 'h', text: 'No thread found' });
        P.wren.push({ t: 'p', text: 'Wren, in a room with four of you and the woman who did the naming. No thread to any of it.' });
        P.wren.push({ t: 'p', text: 'Not unbound. You know unbound. There is nothing there to cut.' });
        P.wren.push({ t: 'p', text: scared ? 'You have looked every hour since the laundry, and twice since the stair. There is still nothing to find.' : 'You have looked every hour since the laundry. There is still nothing to find.' });
        P.wren.push({ t: 'p', text: 'You decided years ago it was a blind spot in your own gift. You have never told anyone your gift has one.' });
      }
      return P;
    },
  });
})();
