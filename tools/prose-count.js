/* Player-visible prose, counted the same way every time.
   node tools/prose-count.js            every chapter, one line each
   node tools/prose-count.js ch4        per-scene breakdown, worst first
   node tools/prose-count.js ch4 --all  per-scene, in story order

   Counts the strings a player actually reads on the Hearth: the paragraphs in a scene's `text`,
   `solvedText`, a choice option's `text`/`sub`/`after`, a puzzle's `note`/`wrongText`/`successText`/
   `timerText`/`stuckText`, `hints`, `title`, `button`, `prompt` and `roles`. It does not count code,
   ids, class names, chapter-local CSS, or the flowchart's node labels.

   Per scene it splits the count by where the words live, because only some of them are on screen together:
     text     the scene's own paragraphs -- this is the one the 150-word scene cap applies to
     solved   what prints after a puzzle is solved, a separate moment
     choices  option labels and the replies to them, of which a player sees one
     rules    the puzzle's rule card and its wrong-answer lines
     hints    only ever seen by a table that asks
   A scene whose SUM is over 150 is not necessarily over budget; a scene whose TEXT is, always is.

   The budget the house style sets: 1,100-1,600 words a chapter, no scene's text over 150 words,
   no puzzle brief over 65. */
const fs = require('fs'), path = require('path');
const root = path.join(__dirname, '..');

const PROSE_KEYS = new Set(['text', 'sub', 'note', 'wrongtext', 'successtext', 'timertext', 'stucktext',
  'title', 'button', 'prompt', 'roles', 'lockedtext', 'label', 'caption', 'strip']);
const PROSE_ARRAYS = new Set(['text', 'solvedtext', 'after', 'hints', 'items']);

/* Walk the source once. Track the most recent `key:` and whether we are inside a prose array, so a bare
   string paragraph inside `text: [ ... ]` is counted and a bare string inside `edges: [...]` is not. */
function scan(src) {
  const out = [];            // {scene, words, bucket, text}
  const branchy = new Set(); // scenes whose text is a function: the count is every branch, not one screen
  let scene = '(chapter)';
  let i = 0, key = null, arrayKey = null, depth = 0, arrayDepth = -1;
  const isProseCtx = () => (key && PROSE_KEYS.has(key)) || (arrayKey && PROSE_ARRAYS.has(arrayKey));
  while (i < src.length) {
    const c = src[i];
    // comments
    if (c === '/' && src[i + 1] === '/') { const n = src.indexOf('\n', i); i = n < 0 ? src.length : n; continue; }
    if (c === '/' && src[i + 1] === '*') { const n = src.indexOf('*/', i); i = n < 0 ? src.length : n + 2; continue; }
    // scene id: six spaces, an identifier, a colon and a brace, at the top of a scene block
    if (c === '\n') {
      const m = /^\n {6}([a-z][a-z0-9_]*): \{/.exec(src.slice(i, i + 80));
      if (m) scene = m[1];
      i++; continue;
    }
    if (c === '{') { depth++; i++; continue; }
    if (c === '}') { depth--; i++; continue; }
    if (c === '[') { i++; continue; }
    if (c === ']') { if (arrayDepth >= 0) { arrayKey = null; arrayDepth = -1; } i++; continue; }
    // key:
    const km = /^([A-Za-z_][A-Za-z0-9_]*)\s*:/.exec(src.slice(i, i + 40));
    if (km && (i === 0 || /[\s,{[(]/.test(src[i - 1]))) {
      key = km[1].toLowerCase();
      // does an array open after it?
      const rest = src.slice(i + km[0].length, i + km[0].length + 30);
      if (/^\s*(\([^)]*\)\s*=>\s*)?\[/.test(rest)) { arrayKey = key; arrayDepth = depth; }
      if (key === 'text' && /^\s*\(/.test(rest)) branchy.add(scene);
      i += km[0].length; continue;
    }
    if (c === "'" || c === '"' || c === '`') {
      let j = i + 1, s = '';
      while (j < src.length && src[j] !== c) { if (src[j] === '\\') { s += src[j + 1] === 'n' ? ' ' : src[j + 1]; j += 2; continue; } s += src[j]; j++; }
      const str = s;
      i = j + 1;
      if (!isProseCtx()) continue;
      if (c === '`' && /[{};]\s*$|:\s*[\w-]+;/.test(str)) continue;   // chapter-local CSS
      if (/^[a-z0-9_]+$/i.test(str)) continue;                        // an id, not a sentence
      if (/^</.test(str.trim())) continue;                            // raw markup
      const words = str.replace(/\*\*|\*|<[^>]+>/g, ' ').split(/\s+/).filter(w => /[A-Za-z]/.test(w)).length;
      const k = arrayKey || key;
      const bucket = k === 'hints' ? 'hints' : k === 'solvedtext' ? 'solved' : k === 'after' || k === 'sub' ? 'choices'
        : k === 'note' || k === 'wrongtext' || k === 'successtext' || k === 'timertext' || k === 'stucktext' || k === 'lockedtext' ? 'rules' : 'text';
      if (words) out.push({ scene, words, bucket, text: str });
      continue;
    }
    i++;
  }
  out.branchy = branchy;
  return out;
}

const arg = process.argv[2];
const chapters = arg && /^ch\d$/.test(arg) ? [arg] : [0,1,2,3,4,5,6,7,8].map(n => 'ch' + n);
const detail = chapters.length === 1;
let grand = 0;
for (const id of chapters) {
  const f = path.join(root, 'js/content', id + '.js');
  if (!fs.existsSync(f)) continue;
  const rows = scan(fs.readFileSync(f, 'utf8'));
  const per = {}, split = {};
  rows.forEach(r => {
    per[r.scene] = (per[r.scene] || 0) + r.words;
    (split[r.scene] = split[r.scene] || {})[r.bucket] = (split[r.scene][r.bucket] || 0) + r.words;
  });
  const total = rows.reduce((a, r) => a + r.words, 0);
  grand += total;
  const over = total > 1600 ? '  OVER BUDGET' : total < 1100 ? '  (under 1100)' : '';
  console.log(`${id}\t${total} words\t${Object.keys(per).length} scenes${over}`);
  if (process.argv.includes('--dump')) rows.filter(r => r.bucket === 'text').forEach(r => console.log(`   [${r.scene}] ${r.words}w  ${r.text.slice(0,80)}`));
  if (detail) {
    const list = Object.entries(per);
    if (process.argv[3] !== '--all') list.sort((a, b) => b[1] - a[1]);
    for (const [s, w] of list) {
      const b = split[s] || {};
      const parts = ['text', 'solved', 'choices', 'rules', 'hints'].filter(k => b[k]).map(k => `${k} ${b[k]}`).join(' · ');
      // The cap is on what a player sees at once. Only `text` is that; the rest is other branches and other moments.
      const isBranchy = rows.branchy.has(s);
      const over = (b.text || 0) > 150
        ? (isBranchy ? '   text is every branch summed — check the worst one by hand' : '   TEXT OVER THE 150-WORD CAP')
        : w > 150 ? '   (sum only — see the split)' : '';
      console.log(`   ${String(w).padStart(4)}  ${s.padEnd(18)} ${parts}${over}`);
    }
  }
}
if (!detail) console.log(`\n${grand} words of Hearth prose in the whole game.`);
