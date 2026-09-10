/* Which chapter sets which story flag, and which chapters read it.
   node tools/flag-map.js            report every flag
   node tools/flag-map.js ch4        only flags ch4 sets or reads
   node tools/flag-map.js --danger   only flags read by a chapter other than the one that sets them
   node tools/flag-map.js --assert   compare the cross-chapter set against tools/flag-contract.js and
                                     exit non-zero on any difference

   Reworking a chapter must not rename or drop a flag another chapter reads: this is that contract.

   The scan itself lives in tools/lib-flags.js, because until it did this tool could only see the
   literal text `flags.X`. Every chapter that keeps a local accessor (`const F = (s) => s.flags`,
   `F(s).DOOR`) or a plain alias (`const f = ctx.flags || {}`, `f.SURRENDERED`) or builds its key
   (`s.flags['WALK_' + role]`) was invisible to it, and a DOOR rename passed the gate green while
   ch4's five-way payoff fell through to its silent default. */
const fs = require('fs'), path = require('path');
const { scan, FLAG } = require('./lib-flags.js');
const root = path.join(__dirname, '..');
const CH = [0, 1, 2, 3, 4, 5, 6, 7, 8];

const files = (n) => [`js/content/ch${n}.js`, `js/content/companion/ch${n}.js`]
  .map(f => path.join(root, f)).filter(fs.existsSync);
/* The engine and the widgets touch the save too -- MIDNIGHT_LEFT, FLAME, the `<choice>_timedout`
   writes -- and a chapter that reads one of them has a contract with code no chapter owns. They are
   scanned as one pseudo-chapter, 'core', so those rows are visible instead of absent. */
const CORE = ['js/core', 'js/puzzles'].flatMap(d => fs.readdirSync(path.join(root, d)).filter(f => f.endsWith('.js')).map(f => path.join(root, d, f)))
  .concat(['js/content/shared.js', 'js/content/chapters.js'].map(f => path.join(root, f)).filter(fs.existsSync));

const sets = {}, reads = {}, casts = {}, dynPrefix = new Set();
const add = (m, flag, n) => { (m[flag] = m[flag] || new Set()).add(n); };

for (const [key, list] of [...CH.map(n => [n, files(n)]), ['core', CORE]]) {
  for (const f of list) {
    const r = scan(fs.readFileSync(f, 'utf8'));
    r.writes.forEach(x => add(sets, x, key));
    r.reads.forEach(x => add(reads, x, key));
    r.dyn.forEach(x => dynPrefix.add(x));
  }
}
/* Casts: the Hearth packs these into the attunement code (js/core/engine.js reads them out of the save
   generically) and the phone unpacks them. That is a READ on both sides and a write on neither -- the
   old tool recorded it as a write, which made every cast-carrying chapter a false writer and silenced
   the CROSS-CHAPTER note on SURRENDERED, WREN_SCARED, OATH_KNOT, PRECRACKED, EMBER_LOST and ENDING. */
const lore = fs.readFileSync(path.join(root, 'js/content/lore.js'), 'utf8');
let c; const castRe = /id:\s*'ch(\d)'[^}]*?cast:\s*\[([^\]]*)\]/g;
while ((c = castRe.exec(lore))) {
  const n = +c[1];
  (c[2].match(new RegExp("'(" + FLAG + ")'", 'g')) || []).forEach(q => { const f = q.slice(1, -1); add(casts, f, n); add(reads, f, n); });
}
/* a read of PREFIX_something is satisfied by a dynamic writer of PREFIX_ */
for (const f of Object.keys(reads)) {
  if (sets[f]) continue;
  for (const p of dynPrefix) if (f !== p && f.startsWith(p) && sets[p]) { (sets[f] = sets[f] || new Set()); for (const n of sets[p]) sets[f].add(n); }
}

const chName = (n) => n === 'core' ? 'core' : 'ch' + n;
const list = (S) => S && S.size ? [...S].sort((a, b) => (a === 'core' ? 99 : a) - (b === 'core' ? 99 : b)).map(chName).join(',') : '';

const arg = process.argv.slice(2);
const only = arg.find(a => /^ch\d$/.test(a));
const onlyN = only ? +only.slice(2) : null;
const danger = arg.includes('--danger');
const assertMode = arg.includes('--assert');
const all = [...new Set([...Object.keys(sets), ...Object.keys(reads)])].sort();
const rows = [];
for (const f of all) {
  const s = sets[f] || new Set(), r = reads[f] || new Set(), k = casts[f] || new Set();
  /* A flag crosses a boundary when SOME chapter reads it and SOME OTHER chapter writes it. The old
     test -- a reader that is not itself a writer -- missed WALK_UNLOCKED, LAW0, PRECRACKED and
     WREN_SHOWN, each of which is written by one chapter, read by a second, and normalised or
     re-written by that second chapter on its way into a cast. A rename in the first chapter still
     breaks the second. */
  const crosses = [...r].some(n => [...s].some(m => m !== n));
  if (onlyN != null && !s.has(onlyN) && !r.has(onlyN)) continue;
  /* a flag read by a chapter and written by nobody is the shape a rename leaves behind, so it belongs
     in --danger and --assert even though `crosses` cannot see it (there is no writer to cross from) */
  if ((danger || assertMode) && !crosses && !(!s.size && r.size)) continue;
  rows.push({ f, s, r, k, crosses, orphan: !r.size, unset: !s.size });
}
if (!assertMode) {
  const w = Math.max(4, ...rows.map(x => x.f.length));
  console.log('flag'.padEnd(w) + '  set by           read by              cast by   note');
  for (const x of rows) {
    const note = x.unset ? 'READ BUT NEVER SET' : x.orphan ? 'set but never read' : x.crosses ? 'CROSS-CHAPTER — do not rename' : '';
    console.log(x.f.padEnd(w) + '  ' + (list(x.s) || '—').padEnd(16) + ' ' + (list(x.r) || '—').padEnd(20) + ' ' + (list(x.k) || '—').padEnd(9) + ' ' + note);
  }
  console.log(`\n${rows.length} flags. ${rows.filter(x => x.crosses).length} cross a chapter boundary; ${rows.filter(x => x.unset).length} read but never set; ${rows.filter(x => x.orphan).length} set but never read.`);
}
if (assertMode) {
  const CONTRACT = require('./flag-contract.js');
  const live = rows.map(x => x.f).sort();
  const gone = CONTRACT.filter(f => !live.includes(f));
  const extra = live.filter(f => !CONTRACT.includes(f));
  const unset = rows.filter(x => x.unset).map(x => x.f);
  for (const f of gone) console.log(`GONE: ${f} is in the contract and no chapter sets or reads it any more — renamed or dropped?`);
  for (const f of extra) console.log(`NEW: ${f} now crosses a chapter boundary and is not in tools/flag-contract.js — add it deliberately.`);
  for (const f of unset) console.log(`READ BUT NEVER SET: ${f} is read by ${list(rows.find(x => x.f === f).r)} and written nowhere.`);
  const bad = gone.length + extra.length + unset.length;
  console.log(bad ? `\n${bad} break${bad === 1 ? '' : 's'} in the flag contract.` : `\nflag contract holds: ${live.length} cross-chapter flags, all declared.`);
  process.exit(bad ? 1 : 0);
}
