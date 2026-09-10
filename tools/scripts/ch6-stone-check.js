/* Chapter VI prophecy-stone assertions. The stone is written down FIVE times in three files that
   nobody checks against each other, and three of the five are pure functions of the first:

     js/content/ch6.js            STONE + BURNT              the truth
     js/art/scenes-ch6.js         its own copy of both       what the Hearth draws
     js/content/companion/ch6.js  BURNT_CUTS, BURN_SHAPES,   the Reader's and the Seer's pages,
                                  BURN_UP + two sentences    computed with a pencil
     js/content/ch6.js hints[2]   the last rung              the answer, written out again

   ch4 is the proof that a hand-copied answer does not stay correct. This script loads all three
   files under a VM stub and proves them equal, and puts the last hint rung through the ring's own
   shipped check(). It also re-derives the reading budget and the drop-a-role fields.
   Run: node tools/scripts/ch6-stone-check.js */
const fs = require('fs'), path = require('path'), vm = require('vm');
const root = path.join(__dirname, '..', '..');
const noop = () => {};
const el = () => ({ appendChild: noop, insertBefore: noop, addEventListener: noop, classList: { add: noop, remove: noop, toggle: noop, contains: () => false }, style: {}, querySelector: () => null, querySelectorAll: () => [], setAttribute: noop, remove: noop, innerHTML: '', textContent: '', firstChild: null, parentNode: null });
const win = { addEventListener: noop, location: { href: 'http://x/', protocol: 'http:', search: '' }, localStorage: { getItem: () => null, setItem: noop, removeItem: noop }, document: { getElementById: el, createElement: el, createTextNode: () => ({}), body: el(), head: el(), addEventListener: noop, querySelector: () => null, querySelectorAll: () => [], hidden: false }, navigator: {}, performance: { now: () => 0 }, requestAnimationFrame: noop, setInterval: () => 0, setTimeout: () => 0, clearInterval: noop, clearTimeout: noop, MutationObserver: function () { this.observe = noop; this.disconnect = noop; }, console, URLSearchParams, Math, JSON, Object, Array, String, Number, Promise, Set, Map, Date };
win.window = win;
const ctx = vm.createContext(win);
for (const f of ['js/core/audio.js', 'js/core/fx.js', 'js/core/store.js', 'js/core/input.js', 'js/core/ui.js', 'js/core/engine.js', 'js/art/art.js', 'js/content/glyphs.js', 'js/content/shared.js', 'js/content/lore.js', 'js/art/scenes-ch6.js', 'js/content/ch6.js']) vm.runInContext(fs.readFileSync(path.join(root, f), 'utf8'), ctx, { filename: f });

const G = win.VigilGlyphs;
let bad = 0;
const assert = (c, m) => { if (!c) { console.error('FAIL', m); bad++; process.exitCode = 1; } else console.log('ok  ', m); };
const eq = (a, b) => JSON.stringify(a) === JSON.stringify(b);

/* ---- 1. the constants, read out of the shipped sources ---- */
function constOf(file, name) {
  const src = fs.readFileSync(path.join(root, file), 'utf8');
  const m = new RegExp('const\\s+' + name + '\\s*=\\s*(\\[[\\s\\S]*?\\]);').exec(src);
  if (!m) throw new Error('no ' + name + ' in ' + file);
  return vm.runInNewContext('(' + m[1] + ')');
}
const STONE = constOf('js/content/ch6.js', 'STONE');          // [{shape, inv}] x 8
const BURNT = constOf('js/content/ch6.js', 'BURNT');          // 0-based
const ART_STONE = constOf('js/art/scenes-ch6.js', 'STONE');   // [[shape, inv]] x 8
const ART_BURNT = constOf('js/art/scenes-ch6.js', 'BURNT');
assert(STONE.length === 8 && BURNT.length === 4, 'eight cuts, four of them burnt');
assert(eq(ART_STONE.map(([s, i]) => ({ shape: s, inv: i })), STONE), 'js/art/scenes-ch6.js draws the same stone ch6.js reads');
assert(eq(ART_BURNT, BURNT), 'and scorches the same four cuts');

const TURNED = G.readTurned(STONE);
console.log('     the board the ring accepts:', TURNED.join(' '));

/* ---- 2. the Companion's three hand-computed arrays and two sentences ---- */
win.CompanionContent = { chapters: [], bookExtras: [], mini: [] };
win.CompanionAudio = { strip: () => '', playSteps: noop, note: noop };
win.CompanionDraw = { trace: () => '' };
vm.runInContext(fs.readFileSync(path.join(root, 'js/content/companion/ch6.js'), 'utf8'), ctx, { filename: 'companion/ch6.js' });
const page = win.CompanionContent.chapters.find(c => c.id === 'ch6');
assert(!!page, 'the Companion has a ch6 chapter');
const pctx = { flags: {}, state: { unlocked: {}, thread: {} }, answer: () => null, unlocked: () => false, save: noop };
const blocks = (role, tab) => page.pages(role, pctx)[tab].map(b => b.text || b.html || b.svg || '').join(' ');

const CUTS = BURNT.map(i => i + 1);
const readerSight = blocks('reader', 'sight');
const seerSight = blocks('seer', 'sight');
const listenerSight = blocks('listener', 'sight');

/* the Reader's sentence: "Cut 1 a flame. Cut 3 a crown. Cut 5 a spike. Cut 7 a crown." */
const said = [...readerSight.matchAll(/Cut (\d) an? (\w+)/g)].map(m => [+m[1], m[2].toLowerCase()]);
assert(eq(said.map(x => x[0]), CUTS), `the Reader's page names cuts ${CUTS.join(', ')} (said ${said.map(x => x[0]).join(', ')})`);
assert(eq(said.map(x => x[1]), BURNT.map(i => STONE[i].shape.toLowerCase())), `the Reader's page names the shapes the fire took: ${BURNT.map(i => STONE[i].shape).join(', ')}`);
/* and the drawing beside it uses the same four shapes */
const drawn = BURNT.map(i => STONE[i].shape).filter(sh => readerSight.indexOf(G.SHAPES[sh]) >= 0);
assert(drawn.length === BURNT.length, 'and draws those four shapes, not others');
assert(readerSight.indexOf('point-up') < 0 && readerSight.indexOf('points down') < 0, "the Reader's page still says nothing about which way up");

/* the Seer's sentence: "Cuts 1, 3 and 5 were struck point-up. Cut 7 points down." */
const upSaid = (/Cuts? ([\d, and]+) were struck point-up/.exec(seerSight) || [, ''])[1].match(/\d/g) || [];
const downSaid = [...seerSight.matchAll(/Cuts? ([\d, and]+) points? down/g)].map(m => m[1].match(/\d/g) || []).flat();
const upTrue = BURNT.filter(i => !STONE[i].inv).map(i => i + 1).map(String);
const downTrue = BURNT.filter(i => STONE[i].inv).map(i => i + 1).map(String);
assert(eq(upSaid, upTrue), `the Seer's page says cuts ${upTrue.join(', ')} are point-up (said ${upSaid.join(', ') || 'none'})`);
assert(eq(downSaid, downTrue), `the Seer's page says cuts ${downTrue.join(', ')} point down (said ${downSaid.join(', ') || 'none'})`);
/* the chevrons drawn under the soot: "M-9,6 L0,-7 L9,6" is point-up, "M-9,-6 L0,7 L9,-6" is down */
const chevrons = [...seerSight.matchAll(/M-9,(-?)6 L0,(-?)7 L9,(-?)6/g)].map(m => m[1] === '');
assert(eq(chevrons, BURNT.map(i => !STONE[i].inv)), 'and the chevrons it draws agree with the sentence');
assert(!/flame|crown|spike|hook/i.test(seerSight), "the Seer's page still names no shape");

/* the Listener: the lap ends on a silence, and COLD is the word with no note */
assert(/ends on a silence/.test(listenerSight), "the Listener's page says the lap ends on a silence");
assert(G.MIDI[TURNED[7]] == null, `the last word read is the one with no note (slot 8 is ${TURNED[7]})`);
assert(!/\bcut \d/i.test(listenerSight), "and it carries no cut number");

/* the dark pattern: one string, copied into the Companion */
const r3 = (f) => /const ROUND3 = '([^']+)'/.exec(fs.readFileSync(path.join(root, f), 'utf8'))[1];
assert(r3('js/content/ch6.js') === r3('js/content/companion/ch6.js'), 'the Companion holds the same ROUND3 the Hearth rings');
const speak = (r) => (/are yours: \*\*([\d ·]+)\*\*/.exec(blocks(r, 'speak')) || [, ''])[1].split(' · ').filter(Boolean).map(Number);
const lists = { reader: speak('reader'), seer: speak('seer'), binder: speak('binder') };
const pooled = [].concat(lists.reader, lists.seer, lists.binder);
assert(Object.values(lists).every(l => l.length === 6), 'six bells each: ' + Object.entries(lists).map(([k, v]) => k + ' ' + v.join(',')).join(' · '));
assert(new Set(pooled).size === pooled.length, 'and no number is on two lists, so two pages cannot cover the third');

/* ---- 3. the last hint rung, through the ring's own shipped check() ---- */
const scene = win.Game.scenes.ch6_strip;
const fresh = () => { win.VigilStore.state.flags.STONE_MISREAD = 0; return scene.config(win.VigilStore.state); };
const hints = scene.hints;
const rung = (() => { const h = hints[hints.length - 1]; return typeof h === 'function' ? h(win.VigilStore.state) : h; })();
console.log('     last rung:', rung);
const rungBoard = {};
[...rung.matchAll(/(?:Slot )?(\d)\s+([A-Z]{3,})/g)].forEach(m => { rungBoard[+m[1]] = m[2]; });
assert(Object.keys(rungBoard).length === 8, `the rung names all eight slots (named ${Object.keys(rungBoard).length})`);
{
  const cfg = fresh();
  assert(cfg.check(Object.assign({}, rungBoard)) === true, 'the last rung is a board the ring accepts');
  assert(cfg.maxTries === Math.max(1, 4 - 0), 'and reading it does not spend a try');
}
assert(/four hands/i.test(rung), 'and it still names the closing ritual (R10.23)');

/* ---- 4. the reading budget, and that it still bites with every bell gone ---- */
{
  const st = win.VigilStore.state;
  st.flags.STONE_MISREAD = 0; st.flags.BELLS_CRACKED = 0; st.flags.PRECRACKED = false;
  const cfg = scene.config(st);
  assert(cfg.maxTries === 4, `four readings from a standing start (got ${cfg.maxTries})`);
  cfg.check({ 1: 'ASH', 2: 'COLD' });
  assert(cfg.maxTries === 5 && !(st.flags.STONE_MISREAD | 0), 'an unfinished board is coached, costs no bell and spends no reading');
  const wrong = { 1: 'ASH', 2: 'COLD', 3: 'CROWN', 4: 'KNOT', 5: 'THORN', 6: 'COLD', 7: 'EMBER', 8: 'VEIL' };
  for (let k = 1; k <= 4; k++) { cfg.check(Object.assign({}, wrong, { 1: G.names[k % 8] })); }
  assert((st.flags.STONE_MISREAD | 0) === 4, `four wrong readings are all counted (STONE_MISREAD ${st.flags.STONE_MISREAD})`);
  assert((st.flags.BELLS_CRACKED | 0) === 3, `and three of them cracked a bell, the fourth had none left (BELLS_CRACKED ${st.flags.BELLS_CRACKED})`);
  st.flags.STONE_MISREAD = 3;
  assert(scene.config(st).maxTries === 1, 'a reload part-way through does not refill the budget');
}

/* ---- 5. the drop-a-role fields, enumerated, against the budget ---- */
const SHAPES = ['Flame', 'Spike', 'Hook', 'Crown'];
const cart = (v, n) => { let o = [[]]; for (let i = 0; i < n; i++) { const x = []; for (const p of o) for (const t of v) x.push(p.concat([t])); o = x; } return o; };
const wordAt = (cuts, s, d, j, w) => { const it = cuts[((s + d * j) % 8 + 8) % 8]; const base = G.read(it.shape, it.inv); return w === 'other' ? G.invert(base) : base; };
function fieldOf(has) {
  const set = new Set();
  for (const sh of has.reader ? [BURNT.map(i => STONE[i].shape)] : cart(SHAPES, 4))
    for (const iv of has.seer ? [BURNT.map(i => STONE[i].inv)] : cart([false, true], 4)) {
      const cuts = STONE.slice(); BURNT.forEach((ci, k) => { cuts[ci] = { shape: sh[k], inv: iv[k] }; });
      for (const d of has.binder ? [-1] : [-1, 1]) for (const w of has.binder ? ['other'] : ['other', 'stands']) for (const c of has.binder ? ['written'] : ['written', 'empty']) for (let s0 = 0; s0 < 8; s0++) {
        if (has.listener && wordAt(cuts, s0, d, 7, w) !== 'COLD') continue;   // the lap ends on a silence
        const b = []; for (let j = 0; j < 8; j++) { const x = wordAt(cuts, s0, d, j, w); b.push(c === 'empty' && x === 'COLD' ? null : x); }
        set.add(b.join('|'));
      }
    }
  return set;
}
const ALL = { reader: 1, listener: 1, seer: 1, binder: 1 };
const WANT = { 'all four': 1, 'no Reader': 192, 'no Listener': 8, 'no Seer': 8, 'no Binder': 12 };
for (const [label, role] of [['all four', null], ['no Reader', 'reader'], ['no Listener', 'listener'], ['no Seer', 'seer'], ['no Binder', 'binder']]) {
  const f = fieldOf(role ? Object.assign({}, ALL, { [role]: 0 }) : ALL);
  assert(f.size === WANT[label], `${label}: ${f.size} distinct boards (the chapter comment says ${WANT[label]})`);
  assert(f.has(TURNED.join('|')), `${label}: the field contains the answer, so nobody is dead-ended`);
  if (label !== 'all four') assert(f.size > 4, `${label}: the field (${f.size}) is wider than the four-reading budget`);
}
console.log(bad ? `\n${bad} break(s) in the stone's contract.` : '\nthe stone holds: three files, one board, and a budget narrower than every drop-a-role field.');
