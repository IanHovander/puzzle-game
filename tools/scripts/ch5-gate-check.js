/* Chapter V assertions: the two gates, and the Founders' Count.
   Loads the real chapter under a stub window, pulls the shipped configs, and enumerates every legal
   board against the shipped check() -- so the uniqueness claim in the chapter comment is measured,
   not asserted. Then it does the three things no other tool does:
     - compares the gate data the Listener's and Reader's pages draw (js/content/companion/ch5.js)
       against the data the Hearth solves from (js/content/ch5.js). They are two copies of one table
       and nothing else in the project compares them: let them drift and the gate cannot be solved
       by four hands at all, and it fails as two frosts and a forced gate, which is a written branch,
       so every playthrough script stays green.
     - greps the other eight chapters for the winning board read out in slot order. Chapter II prints
       WELL, EMBER, VEIL on the Hearth in Mere's niche, which was this gate's answer until this pass.
     - recomputes the Founders' Count's eight digits from the material the four phones actually draw.
   Run: node tools/scripts/ch5-gate-check.js */
const fs = require('fs'), path = require('path'), vm = require('vm');
const root = path.join(__dirname, '..', '..');
const read = (f) => fs.readFileSync(path.join(root, f), 'utf8');
const noop = () => {};
const el = () => ({ appendChild: noop, addEventListener: noop, classList: { add: noop, remove: noop, toggle: noop, contains: () => false }, style: {}, querySelector: () => null, querySelectorAll: () => [], setAttribute: noop, remove: noop, innerHTML: '', textContent: '' });
const win = { addEventListener: noop, location: { href: 'http://x/', protocol: 'http:', search: '' }, localStorage: { getItem: () => null, setItem: noop, removeItem: noop }, document: { getElementById: el, createElement: el, createTextNode: () => ({}), body: el(), head: el(), addEventListener: noop, querySelector: () => null, querySelectorAll: () => [], hidden: false }, navigator: {}, performance: { now: () => 0 }, requestAnimationFrame: noop, setInterval: () => 0, setTimeout: () => 0, clearInterval: noop, clearTimeout: noop, console, prompt: () => null, confirm: () => true, alert: noop, URLSearchParams, Math, JSON, Object, Array, String, Number, Promise, Set, Map, Date, RegExp };
win.window = win; const ctx = vm.createContext(win);
for (const f of ['js/core/audio.js', 'js/core/fx.js', 'js/core/store.js', 'js/core/input.js', 'js/core/ui.js', 'js/core/engine.js', 'js/art/art.js', 'js/content/glyphs.js', 'js/content/shared.js', 'js/content/lore.js', 'js/content/ch5.js']) vm.runInContext(read(f), ctx, { filename: f });

const G = win.VigilGlyphs, NAMES = G.names.slice(), N = 5;
let fails = 0;
const assert = (c, m) => { if (!c) { console.error('FAIL', m); fails++; process.exitCode = 1; } else console.log('ok  ', m); };

/* ---------- 1. every legal board, against the shipped check() ---------- */
const boards = [];
(function build(slot, used, m) {
  if (slot > N) { boards.push(Object.assign({}, m)); return; }
  build(slot + 1, used, m);
  for (const w of NAMES) { if (used.has(w)) continue; used.add(w); m[slot] = w; build(slot + 1, used, m); delete m[slot]; used.delete(w); }
})(1, new Set(), {});
assert(boards.length === 19081, `19,081 legal boards (got ${boards.length})`);

const show = (m) => [1, 2, 3, 4, 5].map(i => m[i] || '_').join('/');
const winners = {};
for (const [id, flags, label] of [['ch5_gate1', {}, 'gate 1'], ['ch5_gate2', {}, 'gate 2, Law 0 out of the Book'], ['ch5_gate2', { LAW0: true }, 'gate 2, Law 0 back in the Book']]) {
  const cfg = win.Game.scenes[id].config({ flags: Object.assign({}, flags) });
  const ok = boards.filter(m => cfg.check(m) === true);
  assert(ok.length === 1, `${label}: exactly one board of 19,081 opens it (got ${ok.length})${ok.length === 1 ? ' — ' + show(ok[0]) : ''}`);
  winners[label] = ok[0];
}

/* ---------- 2. the two gates do not begin at the same slot ----------
   Two rings, the same five slots, back to back in one chapter: if the count begins at the same slot
   on both, gate 1's free last hint rung hands a Seer-less table gate 2's start. The start is not
   exported, so it is read back out of the last rung, which check-hints.js has already proved is a
   board the gate accepts. */
const rungOf = (id, s) => { const h = win.Game.scenes[id].hints; const r = h[h.length - 1]; return typeof r === 'function' ? r(s) : r; };
const slotOf = (rung, word) => { const m = new RegExp(word + ' at (\\d)').exec(rung); return m ? +m[1] : 0; };
const r1 = rungOf('ch5_gate1', { flags: {} }), r2 = rungOf('ch5_gate2', { flags: {} });
console.log('     gate 1 rung:', r1);
console.log('     gate 2 rung:', r2);

/* ---------- 3. the winning readings, against every other chapter's player-visible text ---------- */
const reading = (m) => [1, 2, 3, 4, 5].map(i => m[i]).filter(Boolean);
const others = fs.readdirSync(path.join(root, 'js/content')).filter(f => /^ch\d\.js$/.test(f) && f !== 'ch5.js').map(f => 'js/content/' + f)
  .concat(fs.readdirSync(path.join(root, 'js/content/companion')).filter(f => /\.js$/.test(f) && f !== 'ch5.js').map(f => 'js/content/companion/' + f));
const printed = new Map();      // "WELL, EMBER, VEIL" -> file
for (const f of others) {
  const src = read(f);
  const re = new RegExp('\\b(?:' + NAMES.join('|') + ')(?:,\\s+(?:' + NAMES.join('|') + ')){2,}', 'g');
  let m; while ((m = re.exec(src))) if (!printed.has(m[0])) printed.set(m[0], f);
}
for (const [label, board] of Object.entries(winners)) {
  const words = reading(board), joined = words.join(', '), back = words.slice().reverse().join(', ');
  const hit = printed.get(joined) || printed.get(back);
  assert(!hit, `${label}: the winning board reads "${joined}" — printed nowhere else${hit ? ', but ' + hit + ' prints it' : ''}`);
}

/* ---------- 4. the phone's copy of the gate data ---------- */
const hearth = read('js/content/ch5.js'), phone = read('js/content/companion/ch5.js');
const lit = (src, name) => { const m = new RegExp('const ' + name + ' = (\\[[\\s\\S]*?\\]|\\{[\\s\\S]*?\\n  \\});').exec(src); if (!m) throw new Error('cannot find ' + name); return (new Function('return (' + m[1] + ')'))(); };
const W1 = lit(hearth, 'W1'), W2 = lit(hearth, 'W2');
const eq = (a, b) => JSON.stringify(a) === JSON.stringify(b);
assert(eq(W1.items, lit(phone, 'GATE1')), 'the Reader\'s first lintel is W1.items');
assert(eq(W2.items, lit(phone, 'GATE2')), 'the Reader\'s second lintel is W2.items');
assert(eq(W1.counts, lit(phone, 'COUNTS1')), 'the Listener\'s first bells are W1.counts');
assert(eq(W2.counts, lit(phone, 'COUNTS2')), 'the Listener\'s second bells are W2.counts');
/* the Seer's rings, drawn as ringCuts(cx, cy, R, n, { slot: kind }) */
const rings = [...phone.matchAll(/ringCuts\(\d+, \d+, \d+, \d+, (\{[^}]*\})\)/g)].map(m => (new Function('return (' + m[1] + ')'))());
const cutsOf = (W) => ({ [W.scratch]: 'scratch', [W.notch]: 'notch', [W.chip]: 'chip' });
assert(rings.length === 2, 'the Seer\'s page draws two rings');
assert(eq(cutsOf(W1), rings[0]), 'the Seer\'s first ring carries W1\'s three cuts');
assert(eq(cutsOf(W2), rings[1]), 'the Seer\'s second ring carries W2\'s three cuts');
/* and the same slots said in words, three lines above the figure */
for (const [W, label] of [[W1, 'first'], [W2, 'second']]) {
  const line = `a long scratch at **slot ${W.scratch}**, a notch at **slot ${W.notch}**, a chip in the glaze at **slot ${W.chip}**`;
  const alt = `a scratch at **slot ${W.scratch}**, a notch at **slot ${W.notch}**, a chip at **slot ${W.chip}**`;
  assert(phone.includes(line) || phone.includes(alt), `the Seer's ${label} gate says scratch ${W.scratch}, notch ${W.notch}, chip ${W.chip} in words as well as in the figure`);
}
/* No ring anywhere else in the game has five slots, so the two starts above are the only pair that
   could have collided on (slot count, start slot). If another chapter ever ships a five-slot ring,
   this line says so and somebody has to compare the starts by hand. */
const fiveSlotRings = [];
for (const f of others.filter(x => /content\/ch\d\.js$/.test(x))) if (/slots:\s*5\b/.test(read(f))) fiveSlotRings.push(f);
assert(!fiveSlotRings.length, `no other chapter ships a five-slot ring${fiveSlotRings.length ? ' — ' + fiveSlotRings.join(', ') + ' does' : ''}`);
assert(W1[W1.startKind] !== W2[W2.startKind], `the two gates begin their count at different slots (${W1[W1.startKind]} and ${W2[W2.startKind]})`);
assert(W1[W1.startKind] !== 1 && W2[W2.startKind] !== 1, 'neither gate begins at slot 1, which is where a table begins when it is guessing');
/* the cracked-bell recovery line on the Listener's page -- "the missing one is whichever the other
   four do not say" -- is only true while the second gate's bells are a permutation of 1..5 */
assert(eq(W2.counts.slice().sort(), [1, 2, 3, 4, 5]), 'W2.counts is a permutation of 1..5, which is what the cracked-bell line promises');
/* ch3's threshold, ch4's oath: no ring in this chapter repeats another chapter's cut pair */
const ch3 = read('js/content/ch3.js'), ch4 = read('js/content/ch4.js');
const pair = (src, re) => { const m = re.exec(src); return m ? [+m[1], +m[2]] : null; };
const ch3cuts = pair(ch3, /CUTS = \{ scratch: (\d), notch: (\d) \}/);
const ch4cuts = [+/OATH_SCRATCH = (\d)/.exec(ch4)[1], +/OATH_NOTCH = (\d)/.exec(ch4)[1]];
for (const [W, label] of [[W1, 'gate 1'], [W2, 'gate 2']]) {
  assert(!eq([W.scratch, W.notch], ch3cuts), `${label} is not ch3's cut pair (${ch3cuts.join(', ')})`);
  assert(!eq([W.scratch, W.notch], ch4cuts), `${label} is not ch4's cut pair (${ch4cuts.join(', ')})`);
}

/* ---------- 5. the Founders' Count, recomputed from what the four phones draw ---------- */
const PAIRS = lit(hearth, 'PAIRS');
const NINE = lit(phone, 'NINE'), OATHS = lit(phone, 'OATHS');
const HOLLOW = (new Function('return (' + /const HOLLOW = (\[[^\]]*\])/.exec(phone)[1] + ')'))();
const CRACK = (new Function('return (' + /CRACK = (\[[^\]]*\])/.exec(phone)[1] + ')'))();
const PEAL = /const PEAL = '([HL]+)'/.exec(phone)[1];
const reader = String(NINE.filter(([sh, inv]) => G.read(sh, inv) === 'EMBER').length) + NINE.filter(([sh, inv]) => G.read(sh, inv) === 'CROWN').length;
const listener = String(PEAL.split('').filter(c => c === 'L').length) + PEAL.split('').filter(c => c === 'H').length;
const seer = String(HOLLOW.length) + CRACK.length;
const binder = String(OATHS.filter(o => o.lock === 'KNOT' || o.lock === 'EMBER').length) + OATHS.filter(o => o.year < 212).length;
const derived = [reader, listener, seer, binder];
assert(eq(derived, PAIRS), `the eight digits the phones draw are the eight the ward takes: ${derived.join(' ')} vs ${PAIRS.join(' ')}`);
assert(!HOLLOW.some(i => CRACK.indexOf(i) >= 0), 'no stone is both hollow and cracked, so neither of the Seer\'s counts gives the other');
assert(OATHS.filter(o => o.lock === 'KNOT' || o.lock === 'EMBER').length + OATHS.filter(o => o.year < 212).length !== OATHS.length,
  'the Binder\'s two counts are not each other\'s complement');
const cnt = win.Game.scenes.ch5_count.config({ flags: {} });
assert(cnt.fields[0].len === PAIRS.join('').length, `the ward's field takes ${PAIRS.join('').length} digits`);
assert(cnt.accept([PAIRS.join('')]) === true, 'the ward accepts the eight digits');
assert(cnt.accept([PAIRS.join('').split('').reverse().join('')]) !== true, 'and refuses them backwards');
assert(cnt.maxTries === 3, `the ward hears ${cnt.maxTries} answers`);
console.log(fails ? `\n${fails} broken.` : '\nall of Chapter V\'s gate and count invariants hold.');
