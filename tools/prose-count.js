/* Player-visible prose, counted the same way every time.
   node tools/prose-count.js            every chapter, one line each
   node tools/prose-count.js ch4        per-scene breakdown, worst first
   node tools/prose-count.js ch4 --all  per-scene, in story order

   Counts the strings a player actually reads on the Hearth: the paragraphs in a scene's `text`,
   `solvedText`, a choice option's `text`/`sub`/`after`, a puzzle's `note`/`wrongText`/`successText`/
   `timerText`/`stuckText`, `hints`, `title`, `button`, `prompt` and `roles`. It does not count code,
   ids, class names, chapter-local CSS, or the flowchart's node labels.

   The budget the house style sets: 1,100-1,600 words a chapter, no single scene branch over 150 words,
   no puzzle brief over 90. */
const fs = require('fs'), path = require('path');
const root = path.join(__dirname, '..');

const PROSE_KEYS = new Set(['text', 'sub', 'note', 'wrongtext', 'successtext', 'timertext', 'stucktext',
  'title', 'button', 'prompt', 'roles', 'lockedtext', 'label', 'caption', 'strip']);
const PROSE_ARRAYS = new Set(['text', 'solvedtext', 'after', 'hints', 'items']);

/* Walk the source once. Track the most recent `key:` and whether we are inside a prose array, so a bare
   string paragraph inside `text: [ ... ]` is counted and a bare string inside `edges: [...]` is not. */
function scan(src) {
  const out = [];            // {scene, words, text}
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
      if (/^\s*(\(s(?:tate)?[^)]*\)\s*=>\s*)?\[/.test(rest) || /^\s*\(/.test(rest)) { arrayKey = key; arrayDepth = depth; }
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
      if (words) out.push({ scene, words, text: str });
      continue;
    }
    i++;
  }
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
  const per = {};
  rows.forEach(r => { per[r.scene] = (per[r.scene] || 0) + r.words; });
  const total = rows.reduce((a, r) => a + r.words, 0);
  grand += total;
  const over = total > 1600 ? '  OVER BUDGET' : total < 1100 ? '  (under 1100)' : '';
  console.log(`${id}\t${total} words\t${Object.keys(per).length} scenes${over}`);
  if (detail) {
    const list = Object.entries(per);
    if (process.argv[3] !== '--all') list.sort((a, b) => b[1] - a[1]);
    for (const [s, w] of list) console.log(`   ${String(w).padStart(4)}  ${s}${w > 150 ? '   over the 150-word scene cap' : ''}`);
  }
}
if (!detail) console.log(`\n${grand} words of Hearth prose in the whole game.`);
