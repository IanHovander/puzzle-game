/* Chapter III grid assertions: loads the Hearth content in a shim, pulls the real grid config from ch3_grid, and
   simulates the widget's rules (grid.js): spotted = same cell or open edge at the end of a turn, safe rooms exempt,
   Hob's cells hold Patrol B at E4 for three turns, WREN_HURT makes each door cost a turn before Wren steps through.
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
