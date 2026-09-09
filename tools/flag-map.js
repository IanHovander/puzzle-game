/* Which chapter sets which story flag, and which chapters read it.
   node tools/flag-map.js            report every flag
   node tools/flag-map.js ch4        only flags ch4 sets or reads
   node tools/flag-map.js --danger   only flags read by a chapter other than the one that sets them

   Reworking a chapter must not rename or drop a flag another chapter reads: this is that contract. */
const fs = require('fs'), path = require('path');
const root = path.join(__dirname, '..');
const CH = [0, 1, 2, 3, 4, 5, 6, 7, 8];

const files = (n) => [`js/content/ch${n}.js`, `js/content/companion/ch${n}.js`]
  .map(f => path.join(root, f)).filter(fs.existsSync);

/* A flag is written by Store.set('X') / Store.inc('X'), by `set: { X: ... }` on a choice option, and by a
   plain assignment `s.flags.X = ...` or `s.flags['X'] = ...`. It is read by s.flags.X / Store.get('X').
   Two indirect writers matter too: the engine sets `<CHOICE>_timedout` when a timed choice runs out, and
   content builds dynamic keys like `flags['WHISPER_' + role]` — both are recorded as their prefix.
   Casts in lore.js pack flags into the attunement code, so a cast flag is written by the Hearth and read
   by the phone; both sides are recorded. */
const W = [
  /Store\.set\(\s*['"]([A-Z][A-Z0-9_]*)['"]/g,
  /Store\.inc\(\s*['"]([A-Z][A-Z0-9_]*)['"]/g,
  /flags\.([A-Z][A-Z0-9_]*)\s*=(?![=>])/g,
  /flags\[\s*['"]([A-Z][A-Z0-9_]*)['"]\s*\]\s*=(?![=>])/g,
];
const R = [/flags\.([A-Z][A-Z0-9_]*(?:[a-z]+)?)/g, /Store\.get\(\s*['"]([A-Z][A-Z0-9_]*)['"]/g, /flags\[\s*['"]([A-Z][A-Z0-9_]*)['"]\s*\]/g];
/* dynamic keys: flags['PREFIX_' + x] and the engine's `${choice}_timedout` */
const DYN = [/flags\[\s*['"]([A-Z][A-Z0-9_]*_)['"]\s*\+/g];

const sets = {}, reads = {}, dynPrefix = new Set();
const add = (m, flag, n) => { (m[flag] = m[flag] || new Set()).add(n); };

for (const n of CH) {
  for (const f of files(n)) {
    const src = fs.readFileSync(f, 'utf8');
    for (const re of W) { let m; re.lastIndex = 0; while ((m = re.exec(src))) add(sets, m[1], n); }
    for (const re of R) { let m; re.lastIndex = 0; while ((m = re.exec(src))) add(reads, m[1], n); }
    for (const re of DYN) { let m; re.lastIndex = 0; while ((m = re.exec(src))) { dynPrefix.add(m[1]); add(sets, m[1], n); } }
    // `set: { FLAG: value }` on a choice option
    let m; const objRe = /\bset:\s*\{([^}]*)\}/g;
    while ((m = objRe.exec(src))) {
      let k; const keyRe = /([A-Z][A-Z0-9_]*)\s*:/g;
      while ((k = keyRe.exec(m[1]))) add(sets, k[1], n);
    }
    // the engine writes `<choice>_timedout` for any timed choice; credit the chapter that declares the choice
    let t; const chRe = /choice:\s*['"]([A-Z][A-Z0-9_]*)['"]/g;
    while ((t = chRe.exec(src))) add(sets, t[1] + '_timedout', n);
  }
}
// casts: the Hearth packs these into the attunement code, the phone unpacks them
const lore = fs.readFileSync(path.join(root, 'js/content/lore.js'), 'utf8');
let c; const castRe = /id:\s*'ch(\d)'[^}]*?cast:\s*\[([^\]]*)\]/g;
while ((c = castRe.exec(lore))) {
  const n = +c[1];
  (c[2].match(/'([A-Z][A-Z0-9_]*)'/g) || []).forEach(q => { const f = q.slice(1, -1); add(sets, f, n); add(reads, f, n); });
}
/* a read of PREFIX_something is satisfied by a dynamic writer of PREFIX_ */
for (const f of Object.keys(reads)) {
  if (sets[f]) continue;
  for (const p of dynPrefix) if (f.startsWith(p)) { (sets[f] = sets[f] || new Set()); for (const n of sets[p] || []) sets[f].add(n); }
}

const arg = process.argv[2];
const only = /^ch(\d)$/.test(arg || '') ? +arg.slice(2) : null;
const danger = arg === '--danger';
const all = [...new Set([...Object.keys(sets), ...Object.keys(reads)])].sort();
const rows = [];
for (const f of all) {
  const s = [...(sets[f] || [])].sort((a, b) => a - b), r = [...(reads[f] || [])].sort((a, b) => a - b);
  const crosses = r.some(n => !s.includes(n));
  if (only != null && !s.includes(only) && !r.includes(only)) continue;
  if (danger && !crosses) continue;
  rows.push({ f, s, r, crosses, orphan: !r.length, unset: !s.length });
}
const w = Math.max(4, ...rows.map(x => x.f.length));
console.log('flag'.padEnd(w) + '  set by      read by     note');
for (const x of rows) {
  const note = x.unset ? 'READ BUT NEVER SET' : x.orphan ? 'set but never read' : x.crosses ? 'CROSS-CHAPTER — do not rename' : '';
  console.log(x.f.padEnd(w) + '  ' + ('ch' + x.s.join(',ch')).padEnd(11) + ' ' + (x.r.length ? 'ch' + x.r.join(',ch') : '—').padEnd(11) + ' ' + note);
}
console.log(`\n${rows.length} flags. ${rows.filter(x => x.crosses).length} cross a chapter boundary; ${rows.filter(x => x.unset).length} read but never set; ${rows.filter(x => x.orphan).length} set but never read.`);
