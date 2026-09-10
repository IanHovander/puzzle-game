/* Chapter III assertions: loads the Hearth content in a shim, pulls the real grid config from ch3_grid, and
   simulates the widget's rules (grid.js): spotted = same cell or open edge at the end of a turn, safe rooms exempt,
   Hob's cells hold Patrol B at E4 for three turns, WREN_HURT makes each door cost a turn before Wren steps through.
   The last two blocks leave the corridors: the threshold ring's four drop-a-role fields, enumerated against
   the shipped wardCheck, and a vocabulary guard on both hint ladders (a free rung that names a coordinate is
   a seat sold for nothing -- ADVERSARIAL 1).
   Run: node tools/scripts/ch3-grid-check.js */
const fs = require('fs'), path = require('path'), vm = require('vm');
const root = path.join(__dirname, '..', '..');
const noop = () => {};
const el = () => ({ appendChild: noop, addEventListener: noop, classList: { add: noop, remove: noop, toggle: noop, contains: () => false }, style: {}, querySelector: () => null, querySelectorAll: () => [], setAttribute: noop, remove: noop, innerHTML: '', textContent: '' });
const win = { addEventListener: noop, location: { href: 'http://x/', protocol: 'http:', search: '' }, localStorage: { getItem: () => null, setItem: noop, removeItem: noop }, document: { getElementById: el, createElement: el, createTextNode: () => ({}), body: el(), head: el(), addEventListener: noop, querySelector: () => null, querySelectorAll: () => [], hidden: false }, navigator: {}, performance: { now: () => 0 }, requestAnimationFrame: noop, setInterval: () => 0, setTimeout: () => 0, clearInterval: noop, clearTimeout: noop, console, prompt: () => null, confirm: () => true, alert: noop, URLSearchParams, Math, JSON, Object, Array, String, Number, Promise, Set, Map, Date };
win.window = win; const ctx = vm.createContext(win);
for (const f of ['js/core/audio.js', 'js/core/fx.js', 'js/core/store.js', 'js/core/input.js', 'js/core/ui.js', 'js/core/engine.js', 'js/art/art.js', 'js/content/glyphs.js', 'js/content/shared.js', 'js/content/lore.js', 'js/content/ch3.js']) vm.runInContext(fs.readFileSync(path.join(root, f), 'utf8'), ctx, { filename: f });
const cfg = win.Game.scenes.ch3_grid.config({ flags: {} });
const open = new Set(); cfg.edges.forEach(([a, b]) => { open.add(a + '|' + b); open.add(b + '|' + a); });
const doors = new Set(); Object.keys(cfg.doors).forEach(k => { const [a, b] = k.split('|'); doors.add(a + '|' + b); doors.add(b + '|' + a); });
function simulate(route, hurt) {
  let wren = cfg.start, turn = 0, alarmUntil = -1; const steps = [];
  const at = (p, t) => (alarmUntil >= t && p.alarmCell) ? p.alarmCell : p.path[(t - 1) % p.path.length];
  const seen = (t, w) => !cfg.safe.includes(w) && cfg.patrols.some(p => { const pc = at(p, t); return pc === w || open.has(pc + '|' + w); });
  for (const mv of route) {
    if (mv !== 'wait' && hurt && doors.has(wren + '|' + mv)) { turn++; steps.push([turn, wren]); if (seen(turn, wren)) return { ok: false, spottedAt: [turn, wren] }; }
    turn++; if (mv !== 'wait') wren = mv; steps.push([turn, wren]);
    if (cfg.alarm.cells.includes(wren)) alarmUntil = turn + cfg.alarm.turns;
    if (seen(turn, wren)) return { ok: false, spottedAt: [turn, wren] };
    if (wren === cfg.goal) return { ok: true, turns: turn, steps };
    if (turn >= cfg.maxTurns) return { ok: false, timeout: true };
  }
  return { ok: false };
}
const assert = (c, m) => { if (!c) { console.error('FAIL', m); process.exitCode = 1; } else console.log('ok  ', m); };
let r = simulate(['A2', 'A3', 'B3', 'wait', 'wait', 'wait', 'C3', 'D3', 'E3', 'E4', 'E5'], false);
assert(r.ok && r.turns === 11, 'intended route reaches the Tower on turn 11');
r = simulate(['A2', 'A3', 'B3', 'wait', 'wait', 'wait', 'wait', 'C3', 'D3', 'E3', 'E4', 'E5'], false);
assert(r.ok && r.turns === 12, 'leaving the Laundry on turn 8 arrives on turn 12');
r = simulate(['A2', 'A3', 'B3', 'C3', 'D3', 'E3', 'E4', 'E5'], false);
assert(!r.ok && r.spottedAt && r.spottedAt[1] === 'C3' && r.spottedAt[0] === 4, 'no-wait route is spotted (at C3 on turn 4 by the light steps at C4; had it survived, the heavy boots at E4 would see it at E3 on turn 6)');
r = simulate(['A2', 'A3', 'B3', 'wait', 'C3', 'D3', 'E3', 'E4', 'E5'], true);
assert(r.ok && r.turns === 11, 'WREN_HURT: open on 3, B3 on 4, wait 5, open on 6, C3 on 7 … E5 on 11');
// exhaustive: every safe schedule passes through the Laundry and exits to C3 on beat 7 or 8
const nb = (c) => cfg.cells.filter(x => open.has(c + '|' + x) || doors.has(c + '|' + x));
for (const hurt of [false, true]) {
  const found = [];
  (function rec(route, wren) {
    for (const mv of ['wait', ...nb(wren)]) { const rr = simulate(route.concat([mv]), hurt); if (rr.ok) { found.push(rr); continue; } if (rr.spottedAt || rr.timeout || route.length > 12) continue; rec(route.concat([mv]), mv === 'wait' ? wren : mv); }
  })([], cfg.start);
  const bad = found.filter(f => { const c3 = f.steps.find(s => s[1] === 'C3'); const b3 = f.steps.some(s => s[1] === 'B3'); return !b3 || !c3 || (c3[0] !== 7 && c3[0] !== 8); });
  assert(found.length > 0 && bad.length === 0, `hurt=${hurt}: ${found.length} safe schedules, all through the Laundry, all reaching C3 on beat 7 or 8`);
}

/* The simulator above ends a run at the first sighting, which is not what the widget does: grid.js throws Wren
   back to the last safe room ENTERED (js/puzzles/grid.js: `lastSafe` starts at cfg.start and is reassigned on
   line 96 whenever a turn ends in a cfg.safe cell, and a sighting on line 103 sets `wren = lastSafe`) and the
   count runs on. That blind spot hid a real break -- with the bounce modelled and a sighting costing nothing
   but a counter, "push east, and when you are thrown back walk the same road again" reached the Tower on turn
   12 with no Companion pages at all. ch3.js now spends turns in onSpotted; this is the guard that says so.

   The model below carries lastSafe through the walk instead of bouncing to cfg.safe[0]. The two agree today
   only because ['A1'] has one member and it is also the start, so the old model would have stayed green
   through a second safe room -- exactly the change (safe:['A1','B3']) that the budget note in js/content/ch3.js
   says is the difference between 412 clean wins and 132 sighted ones. selfTestBounce() below fails if the
   model ever stops reading `safe`.
   States are (room, turn, alarm, sightings, lastSafe), which is small enough to enumerate exhaustively. */
function bounceModel(opts) {
  const hurt = !!opts.hurt, maxTurns = opts.maxTurns || cfg.maxTurns;
  const sightingCost = opts.sightingCost == null ? 1 : opts.sightingCost;   // turns spent in ch3.js's onSpotted
  const safe = opts.safe || cfg.safe;
  const wins = {};                                  // sightings -> number of distinct winning routes
  const seenState = new Set();
  const at = (p, t, alarmUntil) => (alarmUntil >= t && p.alarmCell) ? p.alarmCell : p.path[(t - 1) % p.path.length];
  const spotted = (t, w, alarmUntil) => !safe.includes(w)
    && cfg.patrols.some(p => { const pc = at(p, t, alarmUntil); return pc === w || open.has(pc + '|' + w); });
  (function walk(wren, turn, alarmUntil, sightings, lastSafe) {
    if (turn > maxTurns) return;
    const key = [wren, turn, alarmUntil, sightings, lastSafe].join('|');
    if (seenState.has(key)) return; seenState.add(key);
    for (const mv of nb(wren).concat(['wait'])) {
      let t = turn, w = wren, a = alarmUntil, ls = lastSafe, seen = false;
      // WREN_HURT: shouldering a hidden door costs a turn on the NEAR side, before Wren steps through
      if (mv !== 'wait' && hurt && doors.has(w + '|' + mv)) {
        t++; if (t > maxTurns) continue;
        if (spotted(t, w, a)) seen = true;          // caught on the near side: the crossing is aborted
      }
      if (!seen) {
        t++; if (t > maxTurns) continue;
        if (mv !== 'wait') w = mv;
        if (cfg.alarm.cells.includes(w)) a = t + cfg.alarm.turns;
        if (safe.includes(w)) ls = w;               // grid.js:96 -- the last safe cell ENTERED
        seen = spotted(t, w, a);
      }
      if (seen) {
        const t2 = t + sightingCost;                // the deferred Waits in ch3.js's onSpotted
        if (t2 > maxTurns) continue;                // the bell rings before Wren is back on her feet
        walk(ls, t2, a, sightings + 1, ls);
        continue;
      }
      if (w === cfg.goal) { wins[sightings] = (wins[sightings] || 0) + 1; continue; }
      walk(w, t, a, sightings, ls);
    }
  })(cfg.start, 0, -1, 0, cfg.start);
  return wins;
}
const sighted = (w) => Object.keys(w).filter(k => +k > 0).reduce((a, k) => a + w[k], 0);

/* The model reads `safe`: with the laundry safe, a sighting past it puts Wren in the laundry, not the gallery. */
function selfTestBounce() {
  const where = (safe) => {
    let wren = cfg.start, turn = 0, lastSafe = cfg.start;
    const at = (p, t) => p.path[(t - 1) % p.path.length];
    for (const mv of ['A2', 'A3', 'B3', 'C3']) {
      turn++; wren = mv;
      if (safe.includes(wren)) lastSafe = wren;
      if (!safe.includes(wren) && cfg.patrols.some(p => { const pc = at(p, turn); return pc === wren || open.has(pc + '|' + wren); })) return lastSafe;
    }
    return null;
  };
  return { shipped: where(cfg.safe), withLaundry: where(cfg.safe.concat(['B3'])) };
}
const bt = selfTestBounce();
assert(bt.shipped === 'A1' && bt.withLaundry === 'B3',
  `the bounce is to the last safe cell entered, not to safe[0] (shipped: ${bt.shipped}; with the laundry safe: ${bt.withLaundry})`);

for (const hurt of [false, true]) {
  const withCost = bounceModel({ hurt, sightingCost: 1 });
  const withoutCost = bounceModel({ hurt, sightingCost: 0 });
  const label = hurt ? 'hurt  ' : 'unhurt';
  assert(sighted(withCost) === 0, `${label}: no run wins after being seen (a sighting costs a turn; without that cost ${sighted(withoutCost)} would)`);
  assert((withCost[0] || 0) > 0, `${label}: clean runs still win (${withCost[0]} of them)`);
}

/* ---- the bell's price (js/content/ch3.js: turnBudget/sightCost) ----
   One bell takes the budget to eleven turns and a sighting to two, and every bell after that raises the
   price of a sighting again. Eleven is the floor because nothing wins sooner: the assertion below reads
   the floor out of the live config (with the bells run up) and compares it to the earliest arrival in the
   exhaustive search, so lowering the floor in ch3.js turns this red instead of quietly shipping a chapter
   that cannot be finished. */
const earliest = {};
for (const hurt of [false, true]) {
  const found = [];
  (function rec(route, wren) {
    for (const mv of ['wait', ...nb(wren)]) { const rr = simulate(route.concat([mv]), hurt); if (rr.ok) { found.push(rr); continue; } if (rr.spottedAt || rr.timeout || route.length > 12) continue; rec(route.concat([mv]), mv === 'wait' ? wren : mv); }
  })([], cfg.start);
  earliest[hurt] = Math.min(...found.map(f => f.turns));
}
win.VigilStore.state.flags.CH3_BELLS = 9;
const floor = win.Game.scenes.ch3_grid.config(win.VigilStore.state).maxTurns;
win.VigilStore.state.flags.CH3_BELLS = 0;
assert(win.Game.scenes.ch3_grid.config(win.VigilStore.state).maxTurns === 12, 'the first run is twelve turns');
assert(floor === earliest[false] && floor === earliest[true],
  `the budget floors at ${floor} turns, and the earliest any safe schedule arrives is ${earliest[false]} unhurt / ${earliest[true]} hurt`);
for (const hurt of [false, true]) {
  const after = bounceModel({ hurt, maxTurns: floor, sightingCost: 2 });   // one bell spent
  assert((after[0] || 0) > 0, `${hurt ? 'hurt  ' : 'unhurt'}: after a bell (${floor} turns, a sighting costs two) the corridors are still winnable`);
  assert(sighted(after) === 0, `${hurt ? 'hurt  ' : 'unhurt'}: after a bell, still no run wins after being seen`);
}


/* ---- the threshold ring: the drop-a-role fields, against the shipped wardCheck ----
   The numbers recorded above the data in js/content/ch3.js (5 / 6 / 4 / 4, one winner each) are what
   `maxTries: 3` is priced against. They are re-derived here on every run, so a changed word list, a moved
   cut or a loosened check has to change this line rather than quietly widen the puzzle. */
const ring = win.Game.scenes.ch3_fight.config({ flags: {} });
const ringOK = (m) => ring.check(m) === true;
const LADDER = ['ASH', 'THORN', 'KNOT', 'EMBER', 'WELL', 'VEIL', 'CROWN'];   // COLD is the rest, not a rung
const board = (seq, start, dir) => { const m = { 1: null, 2: null, 3: null, 4: null }; let s = start; for (const w of seq) { m[s] = w; s = dir > 0 ? (s % 4) + 1 : ((s + 2) % 4) + 1; } return m; };
const perms = (a) => a.length < 2 ? [a] : a.flatMap((x, i) => perms(a.filter((_, j) => j !== i)).map(p => [x, ...p]));
/* The cuts and the direction are DERIVED, not typed. They were typed until this pass -- SCRATCH = 4,
   NOTCH = 2 -- which was ch3's pair two reworks ago, and every field below assumed clockwise. That is
   ADVERSARIAL 10 inside the very check written to catch it: the literals were right by coincidence,
   then the ward moved twice and the model went on enumerating a puzzle the game no longer ships.
   The direction is read from the BINDER'S PAGE rather than from ch3.js, on purpose. The invariant
   that matters is not "the ring runs the way ch3.js says" -- that is a file agreeing with itself. It
   is "the ring accepts exactly what the Binder is TOLD", so the page is the source and the ring is
   what gets checked against it. Change the page and this model follows; change the ring alone and
   the assertions below go red, which is the direction the coupling has to run. */
const SEQ = ['ASH', 'THORN', 'KNOT'];
const C3PAGE = fs.readFileSync(path.join(root, 'js/content/companion/ch3.js'), 'utf8');
const WARD_DIR = /widdershins/.test(C3PAGE) ? -1 : +1;
const C3SRC = fs.readFileSync(path.join(root, 'js/content/ch3.js'), 'utf8');
const C3CUTS = eval('(' + C3SRC.match(/const CUTS = (\{[^}]*\})/)[1] + ')');
const SCRATCH = C3CUTS.scratch, NOTCH = C3CUTS.notch;
const triples = LADDER.slice(0, LADDER.length - 2).map((_, i) => LADDER.slice(i, i + 3));   // every +1,+1 contour
const fields = {
  /* Each field is what the REMAINING pages can still build. The Reader holds the words, the Listener
     the order, the Seer where the cuts are, the Binder which cut binds AND which way it runs -- so
     only the Binder-less field varies the direction, and the other three inherit it. */
  'no Reader': triples.map(t => board(t, NOTCH, WARD_DIR)),
  'no Listener': perms(SEQ).map(p => board(p, NOTCH, WARD_DIR)),
  'no Seer': [1, 2, 3, 4].map(st => board(SEQ, st, WARD_DIR)),
  'no Binder': [[SCRATCH, 1], [SCRATCH, -1], [NOTCH, 1], [NOTCH, -1]].map(([st, d]) => board(SEQ, st, d)),
};
const expect = { 'no Reader': 5, 'no Listener': 6, 'no Seer': 4, 'no Binder': 4 };
for (const [k, f] of Object.entries(fields)) {
  const uniq = [...new Map(f.map(m => [JSON.stringify(m), m])).values()];
  const winners = uniq.filter(ringOK).length;
  assert(uniq.length === expect[k] && winners === 1,
    `${k}: ${uniq.length} boards still consistent, ${winners} of them accepted (recorded: ${expect[k]}, 1)`);
}
// and exactly one board in the whole submittable space
let states = 0, accepts = 0;
(function pick(i, used, m) {
  if (i > 4) { states++; if (ringOK(m)) accepts++; return; }
  pick(i + 1, used, Object.assign({}, m, { [i]: null }));
  for (const g of ring.glyphs.map(g => g.id)) if (!used.has(g)) { used.add(g); pick(i + 1, used, Object.assign({}, m, { [i]: g })); used.delete(g); }
})(1, new Set(), {});
assert(states === 3393 && accepts === 1, `${states} submittable states, ${accepts} accepted (recorded: 3393, 1)`);

/* ---- the free rungs may not name a coordinate ----
   Rung 2 costs nothing, so anything it names is a seat the table did not buy. The ring's old rung 2 named
   the empty slot and the wrap and cut the Seer-less and Binder-less fields from 4 boards to 2; the grid's
   named the round length and the room nobody searches, which between them are the whole winning plan. */
const forbidden = {
  ch3_fight: [/slot\s*[1-4]/i, /\bscratch/i, /\bnotch/i, /clockwise/i, /widdershins/i, /sunwise/i, /comes back to/i, /runs off the end/i],
  ch3_grid: [/\b[A-E][1-5]\b/, /\btwelve\b/i, /laundry/i, /\bturns? \d/i, /nobody searches/i, /\bbeats? \d/i],
};
for (const [scene, pats] of Object.entries(forbidden)) {
  const ladder = win.Game.scenes[scene].hints;
  const rung = typeof ladder[1] === 'function' ? ladder[1](win.VigilStore.state) : ladder[1];
  const hit = pats.filter(p => p.test(rung)).map(String);
  assert(ladder.length === 3 && hit.length === 0,
    `${scene}: three rungs, and rung 2 names no coordinate${hit.length ? ' — but it matches ' + hit.join(', ') : ''}`);
}

/* ---- the ward's two cuts, across the two files that carry them, and the Prologue's rule ----
   Nothing on the Hearth draws this ring's cuts (it ships `marks: []`), so the cuts live in exactly two
   places: the CUTS constant in js/content/ch3.js, which feeds no code, and the Seer's page in
   js/content/companion/ch3.js, which is what a player actually reads. Two copies of one fact and no
   check between them is how this chapter shipped a Binder whose whole seat had already been spent.

   THE DEFECT THIS BLOCK EXISTS FOR. The Binder's ward page used to be, word for word, the Binder's
   PROLOGUE page -- begin at the scratch, a notch is only a maker's signature, run clockwise. The
   dormitory lamp (ch0_lamp, answer {3:ASH, 4:EMBER}, scratch at 3) is worked on the shared screen and
   cannot be solved without the Binder saying that rule out loud, so by Chapter III it is table
   knowledge: ADVERSARIAL 11. Measured against the shipped wardCheck, a Binder-less table applying it
   faced a field of ONE and took the door every time. The ward begins at the NOTCH now. */
{
  const compSrc = fs.readFileSync(path.join(root, 'js/content/companion/ch3.js'), 'utf8');
  const ch3Src = fs.readFileSync(path.join(root, 'js/content/ch3.js'), 'utf8');
  const cuts = eval('(' + ch3Src.match(/const CUTS = (\{[^}]*\})/)[1] + ')');
  const seer = compSrc.match(/\*\*A ([a-z]+) notch under slot (\d)\. A ([a-z, ]+) scratch under slot (\d)\.\*\*/);
  assert(seer && +seer[2] === cuts.notch && +seer[4] === cuts.scratch,
    `the Seer's page and ch3.js agree on the cuts (notch ${cuts.notch}, scratch ${cuts.scratch})` + (seer ? ` — page says notch ${seer[2]}, scratch ${seer[4]}` : ' — the page sentence did not parse'));

  const ring = win.Game.scenes.ch3_fight.config({ flags: {} });
  const ARCH_ORDER = ['ASH', 'THORN', 'KNOT'];          // the Listener's order, from the ladder's last rung
  const lay = (start, dir) => { const m = {}; let s = start; for (const w of ARCH_ORDER) { m[s] = w; s = dir > 0 ? (s % 4) + 1 : (s - 2 + 4) % 4 + 1; } return m; };
  const takes = (m) => { const snap = JSON.parse(JSON.stringify(win.VigilStore.state.flags)); const r = ring.check(m); win.VigilStore.state.flags = snap; return r === true; };

  /* WIDDERSHINS, and this check went red for a pass because it predated that. Moving the ward's mark
     to the notch closed only half the Prologue's gift: companion/ch0.js teaches the DIRECTION in the
     same four-line list, aloud, in the Binder's own mouth, so with the start moved the Binder-less
     field was 2 boards and three tries walked it. A Vigil ward is sealed behind its keeper and runs
     back against the count. Both bits are the Binder's now, and BOTH assertions below have to hold:
     the one that says the ward opens, and the two that say the Prologue's rule does not open it. */
  assert(takes(lay(cuts.notch, -1)),
    `the ward takes the run begun at the NOTCH (slot ${cuts.notch}), widdershins — which is the Binder's page and nothing else`);
  assert(!takes(lay(cuts.scratch, +1)),
    `the ward REFUSES the run begun at the scratch, clockwise — the rule the Prologue's lamp taught the whole room, which must not open this door`);
  assert(!takes(lay(cuts.notch, +1)),
    `the ward REFUSES the run begun at the notch, CLOCKWISE — half the Prologue's rule is not enough, and this is the board that made the Binder-less field 2 rather than 4`);

  /* and the field is four again, with one winner: the seat costs something */
  let f = 0, w = 0;
  for (const start of [cuts.scratch, cuts.notch]) for (const dir of [+1, -1]) { f++; if (takes(lay(start, dir))) w++; }
  assert(f === 4 && w === 1, `Binder-less field: ${f} boards, ${w} winner (recorded: 4 and 1 — see the field table in ch3.js)`);

  /* the Binder's page must not simply restate the Prologue's, which is what it did */
  const binderRule = compSrc.slice(compSrc.indexOf('Where a sigil begins'), compSrc.indexOf('A spare shape is not decoration'));
  assert(/begins at the \*\*notch\*\*/i.test(binderRule) && /\*\*This is not one\.\*\*/.test(binderRule),
    "the Binder's ward page states the exception rather than repeating the Prologue's rule");
}
