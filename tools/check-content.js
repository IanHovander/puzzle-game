/* Static content checker: loads the Hearth content in a jsdom-free shim and verifies every scene's `next` targets exist,
   every chapter has a start, the companion's tokens decode on the Hearth side, and casts round-trip.
   Run: node tools/check-content.js */
const fs = require('fs'), path = require('path'), vm = require('vm');
const root = path.join(__dirname, '..');
function load(file, ctx) { vm.runInContext(fs.readFileSync(path.join(root, file), 'utf8'), ctx, { filename: file }); }
const noop = () => {};
const el = () => ({ appendChild: noop, addEventListener: noop, classList: { add: noop, remove: noop, toggle: noop, contains: () => false }, style: {}, querySelector: () => null, querySelectorAll: () => [], setAttribute: noop, remove: noop, innerHTML: '', textContent: '' });
const win = { addEventListener: noop, location: { href: 'http://x/', protocol: 'http:', search: '' }, localStorage: { getItem: () => null, setItem: noop, removeItem: noop }, document: { getElementById: el, createElement: el, createTextNode: () => ({}), body: el(), addEventListener: noop, querySelector: () => null, querySelectorAll: () => [], hidden: false }, navigator: {}, performance: { now: () => 0 }, requestAnimationFrame: noop, setInterval: () => 0, setTimeout: () => 0, clearInterval: noop, clearTimeout: noop, console, prompt: () => null, confirm: () => true, alert: noop, URLSearchParams: URLSearchParams, Math, JSON, Object, Array, String, Number, Promise, Set, Map, Date };
win.window = win; win.self = win;
const ctx = vm.createContext(win);
const html = fs.readFileSync(path.join(root, 'index.html'), 'utf8');
const scripts = [...html.matchAll(/<script src="([^"]+)"><\/script>/g)].map(m => m[1]).filter(s => !/vendor|main\.js/.test(s));
for (const s of scripts) { try { load(s, ctx); } catch (e) { console.error('LOAD ERROR', s, e.message); process.exit(2); } }
const Game = win.Game, Lore = win.VigilLore, Shared = win.VigilShared;
let problems = [];
const ids = new Set(Object.keys(Game.scenes));
const checkNext = (from, n) => { if (n == null) return; if (typeof n === 'function') return; if (typeof n === 'string' && !ids.has(n)) problems.push(`${from}: next -> missing scene "${n}"`); };
for (const ch of Game.chapters) {
  if (!ch.start || !ids.has(ch.start)) problems.push(`chapter ${ch.id}: start scene missing (${ch.start})`);
  for (const id in ch.scenes) {
    const sc = ch.scenes[id];
    checkNext(id, sc.next);
    if (sc.options && Array.isArray(sc.options)) sc.options.forEach(o => checkNext(id + ' option ' + o.id, o.next));
    if (sc.type === 'choice' && !sc.options) problems.push(`${id}: choice without options`);
    if (sc.type === 'puzzle' && !Game.puzzles[sc.puzzle]) problems.push(`${id}: unknown puzzle type ${sc.puzzle}`);
    if (sc.type === 'token' && !sc.decode) problems.push(`${id}: token scene without decode()`);
    if (sc.type === 'flow' && !(sc.flow || ch.flow)) problems.push(`${id}: flow scene without flow spec`);
  }
}
// flow specs: every chart in every chapter.
// This used to be checked by accident -- ch8's epilogue walked every chapter's flow.nodes to draw
// the whole night, so a broken spec anywhere surfaced there as a silently missing node. That was
// never a real check and it coupled the epilogue to eight files it cannot edit, so ch8 dropped it.
// The check belongs here, where a broken spec is an error rather than a hole in a picture.
const probe = () => {
  const st = { version: 1, scene: null, chapter: null, flags: {}, choices: {}, tokens: {},
    visited: [], hintsUsed: {}, solved: {}, names: ['Reader', 'Listener', 'Seer', 'Binder'], keys: ['A', 'C', 'M', '/'] };
  return st;
};
// A when() must survive a blank state, a fully-visited state, and every ending. Blank is the one
// that catches `s.flags.X.y` on a flag no path has set yet -- the shape of most real breakages.
const PROBES = [probe()];
{ const all = probe(); all.visited = [...ids]; PROBES.push(all); }
for (let e = 0; e <= 4; e++) { const st = probe(); st.flags.ENDING = e; st.visited = [...ids]; PROBES.push(st); }
for (const ch of Game.chapters) {
  const specs = [];
  if (ch.flow) specs.push([ch.id + ' (chapter flow)', ch.flow]);
  for (const id in ch.scenes) if (ch.scenes[id].flow) specs.push([id, ch.scenes[id].flow]);
  for (const [where, flow] of specs) {
    if (!Array.isArray(flow.nodes) || !flow.nodes.length) { problems.push(`${where}: flow spec has no nodes`); continue; }
    const seen = new Set();
    for (const n of flow.nodes) {
      if (!n.id) { problems.push(`${where}: flow node with no id`); continue; }
      if (seen.has(n.id)) problems.push(`${where}: duplicate flow node "${n.id}"`);
      seen.add(n.id);
      if (!n.label) problems.push(`${where}: flow node "${n.id}" has no label`);
      if (typeof n.col !== 'number' || typeof n.row !== 'number') problems.push(`${where}: flow node "${n.id}" needs numeric col and row`);
      // A node lights when its id is a visited SCENE, or when its when() says so. A node that is
      // neither can never light, which is how a phantom node hides in a chart for months.
      if (!ids.has(n.id) && !n.when) problems.push(`${where}: flow node "${n.id}" is not a scene and has no when() -- it can never light`);
      if (n.when) {
        if (typeof n.when !== 'function') problems.push(`${where}: flow node "${n.id}" when is not a function`);
        else for (const st of PROBES) {
          try { n.when(st); } catch (e) { problems.push(`${where}: flow node "${n.id}" when() throws (${e.message}) on ENDING=${st.flags.ENDING}, ${st.visited.length} visited`); break; }
        }
      }
    }
    const linked = new Set();
    for (const ed of (flow.edges || [])) {
      if (!Array.isArray(ed) || ed.length !== 2) { problems.push(`${where}: malformed flow edge ${JSON.stringify(ed)}`); continue; }
      for (const end of ed) if (!seen.has(end)) problems.push(`${where}: flow edge -> undeclared node "${end}"`);
      linked.add(ed[0]); linked.add(ed[1]);
    }
    if (flow.nodes.length > 1) for (const n of flow.nodes) if (n.id && !linked.has(n.id)) problems.push(`${where}: flow node "${n.id}" has no edge -- it floats`);
  }
}
// chapters present in lore vs registered
for (const lc of Lore.chapters) if (!Game.chapter(lc.id)) problems.push(`lore chapter ${lc.id} has no Hearth chapter registered`);
// companion
const chtml = fs.readFileSync(path.join(root, 'companion.html'), 'utf8');
const cscripts = [...chtml.matchAll(/<script src="([^"]+)"><\/script>/g)].map(m => m[1]).filter(s => !/companion\.js$/.test(s));
const cwin = Object.assign({}, win); cwin.window = cwin; const cctx = vm.createContext(cwin);
for (const s of cscripts) { try { load(s, cctx); } catch (e) { console.error('COMPANION LOAD ERROR', s, e.message); process.exit(2); } }
const CC = cwin.CompanionContent;
if (!CC) problems.push('CompanionContent missing');
else for (const lc of Lore.chapters) if (!CC.chapters.find(c => c.id === lc.id)) problems.push(`companion: no pages for ${lc.id}`);
// cast round trip for every chapter and random flag sets
for (const lc of Lore.chapters) { if (!lc.cast.length) continue; for (let d = 0; d < 64; d += 5) { const c = Shared.cast(lc.word, d); if (Shared.uncast(lc.word, c) !== d) problems.push(`cast roundtrip fails for ${lc.word}/${d}`); } }
console.log(problems.length ? problems.join('\n') : 'OK: ' + ids.size + ' scenes, ' + Game.chapters.length + ' chapters');
process.exit(problems.length ? 1 : 0);
