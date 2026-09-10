/* Static content checker: loads the Hearth content in a jsdom-free shim and verifies every scene's `next` targets exist,
   every chapter has a start, the companion's tokens decode on the Hearth side, and casts round-trip.
   It also folds in tools/check-hints.js, which puts every ladder's last rung -- the one the fire labels
   "Reveal the answer" -- through the puzzle's own check()/accept(). That check lives in its own file
   because it is a different kind of pass, but it runs from here because this is the gate the process
   tells a chapter author to run, and a gate nobody runs is not a gate.
   Run: node tools/check-content.js */
const fs = require('fs'), path = require('path');
const { root, loadHearth, loadCompanion } = require('./lib-content.js');
let loaded; try { loaded = loadHearth(); } catch (e) { console.error(e.message); process.exit(2); }
const win = loaded.win;
const Game = loaded.Game, Lore = loaded.Lore, Shared = loaded.Shared;
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
let CC; try { CC = loadCompanion(win).CompanionContent; } catch (e) { console.error(e.message); process.exit(2); }
if (!CC) problems.push('CompanionContent missing');
else for (const lc of Lore.chapters) if (!CC.chapters.find(c => c.id === lc.id)) problems.push(`companion: no pages for ${lc.id}`);
// cast round trip for every chapter and random flag sets
for (const lc of Lore.chapters) { if (!lc.cast.length) continue; for (let d = 0; d < 64; d += 5) { const c = Shared.cast(lc.word, d); if (Shared.uncast(lc.word, c) !== d) problems.push(`cast roundtrip fails for ${lc.word}/${d}`); } }
/* A cast is three base-32 symbols = 15 bits = SIX data bits and nine of checksum, and shared.js packs
   with `data &= 63`. A seventh bit does not fail loudly: it is dropped, and the truncated value
   round-trips with a valid checksum, so the phone would read a wrong flag and believe it. ch4 and ch5
   are both at six of six today, and ch4's owner asked for a seventh in this pass without knowing that.
   Nothing checked the width before. */
for (const lc of Lore.chapters) {
  for (const b of lc.cast || []) {
    const top = b.bit + (b.n || 1);
    if (top > 6) problems.push(`lore chapter ${lc.id}: cast bit "${b.key}" occupies bits ${b.bit}..${top - 1}, and a cast carries only bits 0..5 -- the overflow is silently truncated by Shared.cast`);
  }
}
/* the laundry's truth map is one map, and every value is a token the phone can actually send ------
   L.whisperTruth says which of each whisper pair is the true answer. ch3 counts TRUTHS with it and
   ch8 falls back to it when TRUTHS is unset; a value that is not in L.tokens.whisper for that role
   would make that role's answer uncountable-as-true on every path, silently. */
{
  const T = Lore.whisperTruth, W = Lore.tokens && Lore.tokens.whisper;
  if (!T || !W) problems.push("check-content: VigilLore.whisperTruth or tokens.whisper missing -- ch3's TRUTHS count and ch8's fallback both read them");
  else for (const role of Object.keys(W)) {
    if (!(role in T)) problems.push(`lore: no whisperTruth for ${role}, so that seat can never answer truly`);
    else if (!W[role].includes(T[role])) problems.push(`lore: whisperTruth.${role} is "${T[role]}", which is not one of that role's whisper tokens [${W[role].join(', ')}]`);
  }
}
/* no ring may print the hub arrow -----------------------------------------------------------------
   js/puzzles/ring.js draws a SUNWISE arrow at the hub unless the config says showArrow: false. Which
   way a sigil runs is the BINDER's Law on every ring in this game -- ch0's lamp, ch3's ward, ch4's
   oath, ch5's two gates and its collapse, ch6's stone, ch7's Sigil -- so the Hearth printing it is
   the Hearth handing the room a seat (ADVERSARIAL 2). Every ring ships showArrow: false today; four
   chapters guard it with an `expectNot: SUNWISE` in a playthrough script and four do not, and a ring
   nobody wrote a script for would be guarded by nothing at all. This is the guard for all of them,
   and it reads ring.js's own default rather than assuming it. */
{
  const ringSrc = fs.readFileSync(path.join(root, 'js/puzzles/ring.js'), 'utf8');
  /* ring.js draws the arrow only on the WHEEL layout -- `if (!strip) { ... if (cfg.showArrow !== false)`
     -- so a layout:'strip' ring (ch6's prophecy stone) never shows it and is not asked to say so. Both
     halves of that condition are read out of ring.js here; the first draft of this check asked every
     ring and reported ch6_strip, which was wrong, and the browser said so. */
  if (!/cfg\.showArrow !== false/.test(ringSrc) || !/const strip = cfg\.layout === 'strip'/.test(ringSrc))
    problems.push('check-content: js/puzzles/ring.js no longer gates its hub arrow the way this check assumes -- it has gone blind');
  else for (const id of ids) {
    const sc = Game.scenes[id];
    if (sc.puzzle !== 'ring') continue;
    for (const st of PROBES) {
      let cfg; try { cfg = typeof sc.config === 'function' ? sc.config(st) : sc.config; } catch (e) { continue; }
      if (!cfg || cfg.layout === 'strip') continue;
      if (cfg.showArrow !== false) { problems.push(`${id}: ring ships showArrow ${JSON.stringify(cfg.showArrow)} -- the hub prints SUNWISE, which is the Binder's Law and not the Hearth's`); break; }
    }
  }
}
/* the Epilogue's closing claim, which is about lore.js and glyphs.js and lives in neither ---------
   ch8_words tells the room that the seven words that woke their phones are every glyph that can be
   written, each exactly once. That is a sentence about js/content/lore.js's chapter words and
   js/content/glyphs.js's palette, asserted in a third file, and nothing checked it. It replaced a
   sentence that was TRUE and was therefore an oracle (see the note at ch8_words). Change a chapter
   word and the Epilogue starts lying; this is the check that says so. */
{
  const G = win.VigilGlyphs;
  if (!G || !G.ORDER) problems.push('check-content: VigilGlyphs.ORDER missing -- cannot check the Epilogue\'s closing claim');
  else {
    const writeable = G.ORDER.filter(g => g !== 'COLD').slice().sort();
    const chapterWords = Lore.chapters.slice(1, 8).map(c => c.word);
    const sorted = chapterWords.slice().sort();
    if (JSON.stringify(sorted) !== JSON.stringify(writeable))
      problems.push(`ch8_words claims the seven chapter words are every writeable glyph, once each; they are [${sorted.join(', ')}] against [${writeable.join(', ')}]`);
    for (const edge of [Lore.chapters[0], Lore.chapters[8]])
      if (edge && G.ORDER.includes(edge.word)) problems.push(`ch8_words claims ${edge.word} (${edge.id}) is not a glyph, and it is one`);
  }
}
/* the hint bell, against the ladders that exist -------------------------------------------------
   engine.js used to light the bell for every type:'puzzle' scene, and six of them carry no hints
   array, so the Prologue lit it twice before the scene that teaches what it is and clicking it did
   nothing (Game.showHint returns silently with no ladder). The condition is READ OUT OF engine.js
   here rather than restated, so this check cannot be right by coincidence: restate it and the two
   drift, which is the whole disease this sweep was about. */
{
  const engSrc = fs.readFileSync(path.join(root, 'js/core/engine.js'), 'utf8');
  const m = engSrc.match(/dom\.hint\.classList\.toggle\('hidden',\s*([^;]*?)\);/);
  if (!m) problems.push('check-content: cannot find the hint-bell condition in js/core/engine.js -- this check has gone blind');
  else {
    let lit;
    try { lit = new Function('scene', 'return !(' + m[1] + ');'); }
    catch (e) { problems.push('check-content: the hint-bell condition in engine.js is not evaluable here (' + e.message + ')'); }
    if (lit) for (const id of ids) {
      const sc = Game.scenes[id];
      let on = false; try { on = lit(sc); } catch (e) { on = false; }
      if (on && !(sc.hints && sc.hints.length)) problems.push(`${id}: the Hearth lights the hint bell and the scene has no ladder -- a live control that does nothing`);
    }
  }
}
/* the last rung of every hint ladder, against the answer the puzzle actually takes */
try { problems.push(...require('./check-hints.js').check(loaded).problems); }
catch (e) { problems.push('check-hints could not run: ' + e.message); }
console.log(problems.length ? problems.join('\n') : 'OK: ' + ids.size + ' scenes, ' + Game.chapters.length + ' chapters');
process.exit(problems.length ? 1 : 0);
