/* Chapter VII Great-Sigil assertions. Loads the real chapter under a stub window, pulls the shipped
   config for ch7_sigil, and puts every ring a table can lay through the shipped check() -- so the
   drop-a-role table in the chapter comment is measured, not asserted. Then three things nothing else
   in tools/ does:
     * the two walls are compared against every ordered glyph sequence this game prints where more
       than one seat can see it (ADVERSARIAL 3 -- the defect that put Chapter II's vault-door answer,
       and the Listener's permanent Book example, into the first four sockets of the Finale);
     * the cut pair is compared against every other ring's cut pair (ADVERSARIAL 9 -- three chapters
       had scratch 4);
     * js/content/companion/ch7.js's copy of the walls and cuts is compared with this chapter's.
   Run: node tools/scripts/ch7-sigil-check.js */
const fs = require('fs'), path = require('path'), vm = require('vm');
const root = path.join(__dirname, '..', '..');
const noop = () => {};
const el = () => ({ appendChild: noop, addEventListener: noop, classList: { add: noop, remove: noop, toggle: noop, contains: () => false }, style: {}, querySelector: () => null, querySelectorAll: () => [], setAttribute: noop, remove: noop, innerHTML: '', textContent: '' });
const win = { addEventListener: noop, location: { href: 'http://x/', protocol: 'http:', search: '' }, localStorage: { getItem: () => null, setItem: noop, removeItem: noop }, document: { getElementById: el, createElement: el, createTextNode: () => ({}), body: el(), head: el(), addEventListener: noop, querySelector: () => null, querySelectorAll: () => [], hidden: false }, navigator: {}, performance: { now: () => 0 }, requestAnimationFrame: noop, setInterval: () => 0, setTimeout: () => 0, clearInterval: noop, clearTimeout: noop, console, prompt: () => null, confirm: () => true, alert: noop, URLSearchParams, Math, JSON, Object, Array, String, Number, Promise, Set, Map, Date };
win.window = win; const ctx = vm.createContext(win);
for (const f of ['js/core/audio.js', 'js/core/fx.js', 'js/core/store.js', 'js/core/input.js', 'js/core/ui.js', 'js/core/engine.js', 'js/art/art.js', 'js/content/glyphs.js', 'js/content/shared.js', 'js/content/lore.js', 'js/content/ch7.js']) vm.runInContext(fs.readFileSync(path.join(root, f), 'utf8'), ctx, { filename: f });

const G = win.VigilGlyphs, Store = win.VigilStore;
const assert = (c, m) => { if (!c) { console.error('FAIL', m); process.exitCode = 1; } else console.log('ok  ', m); };
const src = (f) => fs.readFileSync(path.join(root, f), 'utf8');

/* ---- the four private facts, scraped from the chapter so this file holds no second copy ---- */
const ch7 = src('js/content/ch7.js');
const wallOf = (name, text) => { const m = new RegExp('const ' + name + ' = (\\[[^\\]]*\\}\\]);').exec(text); return m ? JSON.parse(m[1].replace(/(\w+):/g, '"$1":').replace(/'/g, '"')) : null; };
const WEST = wallOf('WEST', ch7), EAST = wallOf('EAST', ch7);
const cuts = /const SCRATCH = (\d+), NOTCH = (\d+);/.exec(ch7);
const SCRATCH = +cuts[1], NOTCH = +cuts[2];
const OPENING_CLIMB = +/const OPENING_CLIMB = (-?\d+);/.exec(ch7)[1];
const readEnd = (w, e) => G.readLine(w, e);
const climb = (a, b) => { const x = G.GLYPHS[a].step, y = G.GLYPHS[b].step; return (x == null || y == null) ? null : y - x; };

const PHRASES = [];
['left', 'right'].forEach(we => ['left', 'right'].forEach(ee => {
  const w = readEnd(WEST, we), e = readEnd(EAST, ee);
  PHRASES.push(w.concat(e)); PHRASES.push(e.concat(w));
}));
const LEGAL = PHRASES.filter(p => new Set(p).size === 8);
const WINNERS = LEGAL.filter(p => climb(p[0], p[1]) === OPENING_CLIMB);
const lay = (phrase, start, dir) => { const m = new Array(8).fill(null); for (let i = 0; i < 8; i++) { const g = phrase[i]; m[((start - 1 + dir * i) % 8 + 8) % 8] = g === 'COLD' ? null : g; } return m; };
const turnTo = (ring, word, socket) => { for (let k = 0; k < 8; k++) { const r = ring.map((_, i) => ring[((i - k) % 8 + 8) % 8]); if (r[socket - 1] === word) return r; } return ring; };
const toMap = (arr) => { const m = {}; arr.forEach((g, i) => { m[i + 1] = g; }); return m; };
const board = (arr) => arr.map((g, i) => (i + 1) + ':' + (g || '_')).join(' ');

console.log('phrases', PHRASES.length, '| legal under Law 8', LEGAL.length, '| on the opening climb', WINNERS.length);
assert(PHRASES.length === 8, '8 phrases: two wall orders x two readings x two readings');
assert(LEGAL.length === 4, `Law 8 leaves 4 phrases standing (got ${LEGAL.length})`);
assert(WINNERS.length === 1, `the Listener's opening climb leaves exactly 1 (got ${WINNERS.length})`);
const PHRASE = WINNERS[0];
console.log('the phrase:', PHRASE.join(' '));

/* ---- every ring, through the shipped check() ---- */
/* Store.state is swapped under each probe: check() charges the Finale clock and writes SIGIL_COLD. */
const probe = (cfg, arr) => {
  const saved = Store.state;
  Store.state = { flags: {}, hintsUsed: {}, solved: {}, choices: {}, log: [], visited: [] };
  let r; try { r = cfg.check(toMap(arr)); } finally { Store.state = saved; }
  return r === true;
};
const fieldFor = (knot, keep) => {
  const cfg = win.Game.scenes.ch7_sigil.config({ flags: knot ? { OATH_KNOT: true } : {} });
  const rings = [], seen = new Set();
  PHRASES.forEach(p => {
    if (!keep(p)) return;
    [SCRATCH, NOTCH].forEach(cut => [1, -1].forEach(dir => {
      let r = lay(p, cut, dir);
      if (knot) r = turnTo(r, 'CROWN', cut);
      const k = r.join('|'); if (seen.has(k)) return; seen.add(k); rings.push(r);
    }));
  });
  return { rings, wins: rings.filter(r => probe(cfg, r)) };
};
/* what each three-page table can still say about the phrase, the cut and the direction */
const cases = [
  ['all four        ', (p) => sameArr(p, PHRASE), [SCRATCH], [1]],
  ['no Listener     ', (p) => new Set(p).size === 8, [SCRATCH], [1]],
  ['no Seer         ', (p) => sameArr(p, PHRASE), [1, 2, 3, 4, 5, 6, 7, 8], [1]],
  ['no Binder       ', (p) => climb(p[0], p[1]) === OPENING_CLIMB, [SCRATCH, NOTCH], [1, -1]],
];
function sameArr(a, b) { return a.length === b.length && a.every((x, i) => x === b[i]); }
const EXPECT = { 'all four        ': [1, 1], 'no Listener     ': [4, 2], 'no Seer         ': [8, 8], 'no Binder       ': [8, 8] };
[false, true].forEach(knot => {
  const cfg = win.Game.scenes.ch7_sigil.config({ flags: knot ? { OATH_KNOT: true } : {} });
  console.log(knot ? '\n--- sworn under KNOT ---' : '\n--- unsworn ---');
  cases.forEach(([label, keep, cutsIn, dirs], ci) => {
    const rings = [], seen = new Set();
    PHRASES.filter(keep).forEach(p => cutsIn.forEach(cut => dirs.forEach(dir => {
      let r = lay(p, cut, dir);
      if (knot) r = turnTo(r, 'CROWN', cut);
      const k = r.join('|'); if (seen.has(k)) return; seen.add(k); rings.push(r);
    })));
    const wins = rings.filter(r => probe(cfg, r));
    console.log(`  ${label} field ${String(rings.length).padStart(2)}  accepted ${wins.length}`);
    assert(wins.length === 1, `${label.trim()}: exactly one of its ${rings.length} rings closes${knot ? ', sworn' : ''}`);
    assert(rings.length === EXPECT[label][knot ? 1 : 0], `${label.trim()}: the chapter's recorded field of ${EXPECT[label][knot ? 1 : 0]}${knot ? ' sworn' : ''} is what the code gives (${rings.length})`);
  });
});

/* the answer boards, for the playthrough scripts */
const BASE = lay(PHRASE, SCRATCH, 1), ROT = turnTo(BASE, 'CROWN', SCRATCH);
console.log('\nthe board, unsworn :', board(BASE));
console.log('the board, sworn   :', board(ROT));

/* ---- every cold ring gets the same sentence (ADVERSARIAL 2: no keyed line names an axis) ---- */
[false, true].forEach(knot => {
  const cfg = win.Game.scenes.ch7_sigil.config({ flags: knot ? { OATH_KNOT: true } : {} });
  const lines = new Set();
  const all = [];
  PHRASES.forEach(p => [1, 2, 3, 4, 5, 6, 7, 8].forEach(cut => [1, -1].forEach(dir => {
    all.push(lay(p, cut, dir)); all.push(turnTo(lay(p, cut, dir), 'CROWN', cut));
  })));
  const ans = knot ? ROT : BASE;
  all.forEach(r => {
    if (sameArr(r.map(x => x || null), ans)) return;
    const saved = Store.state;
    Store.state = { flags: {}, hintsUsed: {}, solved: {}, choices: {}, log: [], visited: [] };
    let out; try { out = cfg.check(toMap(r)); } finally { Store.state = saved; }
    if (out !== true) lines.add(String(out));
  });
  const keyed = [...lines].filter(l => !/Frost takes the ring/.test(l));
  console.log(`\n${knot ? 'sworn' : 'unsworn'}: ${all.length} laid rings, ${lines.size} distinct refusals`);
  keyed.forEach(l => console.log('   keyed:', l.slice(0, 90) + '...'));
  assert(keyed.length === (knot ? 1 : 0), `${knot ? 'sworn' : 'unsworn'}: ${keyed.length} keyed line(s) besides the one that answers everything${knot ? ' (the unturned lawful ring, which quotes the rule card)' : ''}`);
});

/* ---- the collision scan: no reading, and no run of three, on a shared surface ---- */
const SHARED = [];
const add = (where, seq) => SHARED.push({ where, seq });
add('ch2 vault door / book.js:87 worked chain', ['THORN', 'KNOT', 'VEIL', 'EMBER']);
add('book.js:78 plinth glossary', ['EMBER', 'THORN', 'VEIL', 'KNOT']);
add("book.js:87's contour, its other two chains", ['ASH', 'THORN', 'WELL', 'KNOT']);
add("book.js:87's contour, its other two chains", ['KNOT', 'EMBER', 'CROWN', 'WELL']);
add('ch2_niche, printed on the Hearth', ['WELL', 'EMBER', 'VEIL']);
add('ch2_niche, printed on the Hearth', ['KNOT', 'CROWN', 'THORN']);
add('ch5 gate 1/2 readings', ['CROWN', 'KNOT', 'WELL']);
add('ch5 gate 1/2 readings', ['EMBER', 'VEIL', 'THORN']);
add('ch4 shelf answer', ['THORN', 'EMBER', 'VEIL', 'CROWN']);
add('ch4 oath order', ['THORN', 'ASH', 'WELL']);
add('ch3 threshold', ['ASH', 'THORN', 'KNOT']);
add('ch6 stone, as carved', ['ASH', 'COLD', 'CROWN', 'KNOT', 'THORN', 'COLD', 'EMBER', 'VEIL']);
for (let i = 0; i + 3 <= G.LADDER.length; i++) add('the Ladder, printed on the Listener Book page', G.LADDER.slice(i, i + 3));
/* THE MOST PUBLIC SEQUENCE IN THE GAME, and the one nothing had ever compared the Sigil against: the
   chapter attunement words, in chapter order. Every player types all seven of them into the Hearth
   over the evening, one a chapter, and js/content/ch8.js used to end by saying out loud that they
   "were the Great Sigil in wall order" -- because they were. That made the Finale's whole phrase, in
   its whole order, public five chapters early, and the chapter's own claim that a Reader-less table
   cannot name a word false. Read from lore.js so it cannot drift. */
const CODEWORDS = win.VigilLore.chapters.filter(c => G.GLYPHS[c.word]).sort((a, b) => a.n - b.n).map(c => c.word);
add('the chapter attunement words, in chapter order (js/content/lore.js)', CODEWORDS);
SHARED.slice().forEach(x => add(x.where + ' (turned)', x.seq.slice().reverse().map(n => G.PAIR[n])));
const TRI = new Map();
SHARED.forEach(({ where, seq }) => { for (let i = 0; i + 3 <= seq.length; i++) { const k = seq.slice(i, i + 3).join(' '); if (!TRI.has(k)) TRI.set(k, where); } });
const scan = (label, seq) => {
  for (let i = 0; i + 3 <= seq.length; i++) { const k = seq.slice(i, i + 3).join(' '); if (TRI.has(k)) { assert(false, `${label} shares "${k}" with ${TRI.get(k)}`); return; } }
  assert(true, `${label} shares no run of three with anything on a shared surface`);
};
console.log('');
scan('the west wall, from its left end ', readEnd(WEST, 'left'));
scan('the west wall, from its right end', readEnd(WEST, 'right'));
scan('the east wall, from its left end ', readEnd(EAST, 'left'));
scan('the east wall, from its right end', readEnd(EAST, 'right'));
scan('the phrase                       ', PHRASE);

/* ---- the cuts are nobody else's ---- */
/* PARSED, not retyped. This list used to carry ['ch3 threshold', 4, 2] as literals, and ch3's cuts
   moved in the Integrate pass -- so the guard would have gone on comparing against a pair no chapter
   ships. A cross-file check that hard-copies the other file's value is the same defect it exists to
   find (docs/ADVERSARIAL.md 18, the corollary). ch4's and ch5's own guards already parse. */
const readSrc = (f) => fs.readFileSync(path.join(root, f), 'utf8');
const ch3Cuts = /CUTS = \{ scratch: (\d), notch: (\d) \}/.exec(readSrc('js/content/ch3.js'));
const ch4Src = readSrc('js/content/ch4.js');
const PAIRS = [
  ['ch3 threshold', +ch3Cuts[1], +ch3Cuts[2]],
  ['ch4 oath', +/OATH_SCRATCH = (\d)/.exec(ch4Src)[1], +/OATH_NOTCH = (\d)/.exec(ch4Src)[1]],
  ['ch5 gate 1', 3, 1], ['ch5 gate 2', 5, 2],
];
console.log('');
PAIRS.forEach(([who, sc, no]) => assert(!(SCRATCH === sc && NOTCH === no), `the cuts (scratch ${SCRATCH}, notch ${NOTCH}) are not ${who}'s (${sc}, ${no})`));
assert(!PAIRS.some(([, sc]) => sc === SCRATCH) || SCRATCH === 6, `the scratch (socket ${SCRATCH}) is not another ring's scratch`);
assert(NOTCH === 1, 'the decoy notch is on socket 1, where a guessing table starts');
assert(SCRATCH !== NOTCH, 'the two cuts are in different sockets');

/* ---- the phone's copy has not drifted ---- */
const comp = src('js/content/companion/ch7.js');
const cW = wallOf('WEST', comp), cE = wallOf('EAST', comp), cCuts = /const SCRATCH = (\d+), NOTCH = (\d+);/.exec(comp);
console.log('');
assert(JSON.stringify(cW) === JSON.stringify(WEST) && JSON.stringify(cE) === JSON.stringify(EAST), 'companion/ch7.js carries the same two walls');
assert(+cCuts[1] === SCRATCH && +cCuts[2] === NOTCH, 'companion/ch7.js carries the same two cuts');

/* ---- and the last rung is a board the ring takes (tools/check-hints.js proves this too; here it
        is proved against the sworn ring as well, which the hint ladder branches on) ---- */
const hints = win.Game.scenes.ch7_sigil.hints;
[false, true].forEach(knot => {
  const s = { flags: knot ? { OATH_KNOT: true } : {} };
  const rung = hints[hints.length - 1](s);
  const m = {}; [...rung.matchAll(/([A-Z]{3,}|empty) (\d)/g)].forEach(x => { m[+x[2]] = x[1] === 'empty' ? null : x[1]; });
  const cfg = win.Game.scenes.ch7_sigil.config(s);
  const saved = Store.state;
  Store.state = { flags: Object.assign({}, s.flags), hintsUsed: {}, solved: {}, choices: {}, log: [], visited: [] };
  let ok; try { ok = cfg.check(m); } finally { Store.state = saved; }
  assert(ok === true, `the last hint rung is a ring the Sigil accepts${knot ? ', sworn' : ', unsworn'}`);
});
