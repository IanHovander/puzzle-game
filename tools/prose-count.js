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
     branch   prose built inside a function body that is not the scene's own text: a custom scene's
              run(), a flow scene's ledger, a wrong-answer receipt. Mutually exclusive alternatives,
              of which a table sees one, and never all at once.
     hints    only ever seen by a table that asks
   A scene whose SUM is over 150 is not necessarily over budget; a scene whose TEXT is, always is.

   WHY `branch` EXISTS. The scanner used to decide a string's bucket from the nearest `key:` above it,
   which is right for `text: [ ... ]` and wrong for `solvedText: (s, r) => { ... return [{ text: ... }] }`
   -- the inner `text:` put the whole function body, every branch of it, into the scene's text bucket.
   That is the number the 150-word cap is checked against, so the figures for branchy scenes were
   inflated by 50-600%, and the one cap alarm in the whole game (ch4_secrets, reported at 292 words
   against an actual on-screen brief of 40) was a false positive that had already been recorded as an
   open question against the chapter. A key whose value is a FUNCTION now owns everything inside its
   body, and only the keys that really are the scene's own paragraphs land in `text`.

   The budget the house style sets: 1,100-1,600 words a chapter, no scene's text over 150 words,
   no puzzle brief over 65. */
const fs = require('fs'), path = require('path');
const root = path.join(__dirname, '..');

const PROSE_KEYS = new Set(['text', 'sub', 'note', 'wrongtext', 'successtext', 'timertext', 'stucktext',
  'title', 'button', 'prompt', 'roles', 'lockedtext', 'label', 'caption', 'strip']);
const PROSE_ARRAYS = new Set(['text', 'solvedtext', 'after', 'hints', 'items']);

/* Walk the source once. Track the most recent `key:` and whether we are inside a prose array, so a bare
   string paragraph inside `text: [ ... ]` is counted and a bare string inside `edges: [...]` is not. */
/* Which bucket a key's prose belongs in. Used both for a plain `key: '...'` and for the key that owns
   a function body, so a string is filed by what it is FOR rather than by the nearest colon above it. */
const FN_BUCKET = { solvedtext: 'solved', text: 'text', options: 'choices', after: 'choices', button: 'button',
  config: 'rules', check: 'rules', onwrong: 'rules', wrongtext: 'rules', hints: 'hints' };
/* `button` is its own bucket. It is prose and it is still counted in the chapter total, but it is a
   control label, not a paragraph of the brief -- and it used to be added to `text`, which is the
   number R1.3's 150-word scene cap and R1.4's 65-word puzzle-brief cap are checked against, so every
   puzzle in the game was measured three or four words heavier than it is. */
const bucketOf = (k) => k === 'hints' ? 'hints' : k === 'solvedtext' ? 'solved'
  : k === 'button' ? 'button'
  : k === 'after' || k === 'sub' || k === 'options' ? 'choices'
  : k === 'note' || k === 'wrongtext' || k === 'successtext' || k === 'timertext' || k === 'stucktext' || k === 'lockedtext' || k === 'config' ? 'rules'
  : 'text';

function scan(src) {
  const out = [];            // {scene, words, bucket, text}
  const branchy = new Set(); // scenes whose text is a function: the count is every branch, not one screen
  let scene = '(chapter)';
  let i = 0, key = null, arrayKey = null, depth = 0, arrayDepth = -1, pdepth = 0, bdepth = 0;
  /* Frames: one per `key:` whose value is a FUNCTION. A frame covers the whole value expression --
     body braces, object literals, both arms of a ternary -- and the innermost frame decides which
     bucket the prose inside it belongs to. It closes at the comma that ends its own value, or as soon
     as a brace or bracket carries us out of it. Without frames the bucket came from the nearest `key:`
     above the string, so the paragraphs of `solvedText: (s, r) => cond ? [ … ] : [ … ]` inherited the
     `text:` of the last `{ speaker, text }` object above them and were counted as the scene's own
     brief. That is the number the 150-word cap is checked against. */
  const frames = [];
  const owner = () => frames.length ? frames[frames.length - 1].key : null;
  const closeFrames = () => { while (frames.length) { const f = frames[frames.length - 1]; if (depth < f.depth || pdepth < f.pdepth || bdepth < f.bdepth) frames.pop(); else break; } };
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
    if (c === '}') { depth--; closeFrames(); i++; continue; }
    if (c === '(') { pdepth++; i++; continue; }
    if (c === ')') { pdepth--; closeFrames(); i++; continue; }
    if (c === ',' || c === ';') {
      /* Only the comma that ends the VALUE closes the frame. Array-element commas sit at the same
         brace and paren depth, so the bracket depth has to be part of the test too, or
         `solvedText: (s, r) => cond ? [ 'a', 'b' ] : [ … ]` loses its frame at its first comma. */
      const f = frames[frames.length - 1];
      if (f && f.depth === depth && f.pdepth === pdepth && f.bdepth === bdepth) frames.pop();
      i++; continue;
    }
    if (c === '[') { bdepth++; const o = owner(); if (o && PROSE_ARRAYS.has(o)) { arrayKey = o; arrayDepth = depth; } i++; continue; }
    if (c === ']') { bdepth--; if (arrayDepth >= 0) { arrayKey = null; arrayDepth = -1; } closeFrames(); i++; continue; }
    // key:
    const km = /^([A-Za-z_][A-Za-z0-9_]*)\s*:/.exec(src.slice(i, i + 40));
    if (km && (i === 0 || /[\s,{[(]/.test(src[i - 1]))) {
      key = km[1].toLowerCase();
      const rest = src.slice(i + km[0].length, i + km[0].length + 30);
      // does an array open after it?
      if (/^\s*(\([^)]*\)\s*=>\s*)?\[/.test(rest)) { arrayKey = key; arrayDepth = depth; }
      // or a function, whose whole value this key owns
      else if (/^\s*(\([^)]*\)|[A-Za-z_$][\w$]*)\s*=>/.test(rest) || /^\s*function\s*\(?/.test(rest)) frames.push({ key, depth, pdepth, bdepth });
      /* or a CALL, whose arguments this key owns just as much. `solvedText: roundText('…', [ … ])`
         got no frame, so the { speaker, text } objects in its argument array were filed by the
         nearest `key:` above them -- their own `text:` -- and landed in the scene's brief. That is
         how ch6_round1 measured 82 words against R1.4's 65-word cap when its brief is 47: 32 of the
         other 35 were its solvedText and 3 were its button. A helper's arguments are still the value
         of the key that called it. */
      else if (/^\s*[A-Za-z_$][\w$.]*\s*\(/.test(rest)) frames.push({ key, depth, pdepth, bdepth });
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
      /* Inside a function the owning key decides the bucket, and an owner nobody has classified is
         `branch` -- never `text`, because whatever it is, it is not the paragraphs on this screen. */
      const own = owner();
      const bucket = own ? (FN_BUCKET[own] || 'branch') : bucketOf(arrayKey || key);
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
      const parts = ['text', 'solved', 'choices', 'rules', 'branch', 'hints'].filter(k => b[k]).map(k => `${k} ${b[k]}`).join(' · ');
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
