/* Shared loader: runs the Hearth's (and the Companion's) scripts in a bare VM with a DOM shim, so a
   tool can hold the live Game object -- the real scenes, the real configs, the real check()s -- without
   a browser. Extracted from check-content.js so that check-content, check-hints and prose-count all
   read the same game rather than three slightly different ones. */
const fs = require('fs'), path = require('path'), vm = require('vm');
const root = path.join(__dirname, '..');

const noop = () => {};
const el = () => ({ appendChild: noop, addEventListener: noop, classList: { add: noop, remove: noop, toggle: noop, contains: () => false }, style: {}, querySelector: () => null, querySelectorAll: () => [], setAttribute: noop, remove: noop, innerHTML: '', textContent: '' });

function makeWindow() {
  const win = { addEventListener: noop, location: { href: 'http://x/', protocol: 'http:', search: '' }, localStorage: { getItem: () => null, setItem: noop, removeItem: noop }, document: { getElementById: el, createElement: el, createTextNode: () => ({}), body: el(), addEventListener: noop, querySelector: () => null, querySelectorAll: () => [], hidden: false }, navigator: {}, performance: { now: () => 0 }, requestAnimationFrame: noop, setInterval: () => 0, setTimeout: () => 0, clearInterval: noop, clearTimeout: noop, console, prompt: () => null, confirm: () => true, alert: noop, URLSearchParams: URLSearchParams, Math, JSON, Object, Array, String, Number, Promise, Set, Map, Date };
  win.window = win; win.self = win;
  return win;
}

function scriptsOf(htmlFile, skip) {
  const html = fs.readFileSync(path.join(root, htmlFile), 'utf8');
  return [...html.matchAll(/<script src="([^"]+)"><\/script>/g)].map(m => m[1]).filter(s => !skip.test(s));
}

/* Loads index.html's script list. Throws { file, err } shaped Error on a load failure. */
function loadHearth() {
  const win = makeWindow();
  const ctx = vm.createContext(win);
  for (const s of scriptsOf('index.html', /vendor|main\.js/)) {
    try { vm.runInContext(fs.readFileSync(path.join(root, s), 'utf8'), ctx, { filename: s }); }
    catch (e) { const err = new Error('LOAD ERROR ' + s + ': ' + e.message); err.file = s; throw err; }
  }
  return { win, ctx, Game: win.Game, Lore: win.VigilLore, Shared: win.VigilShared, Store: win.VigilStore, UI: win.VigilUI, Glyphs: win.VigilGlyphs };
}

/* companion.html's scripts, in their own context (the phone is a separate app). */
function loadCompanion(baseWin) {
  const cwin = Object.assign({}, baseWin || makeWindow()); cwin.window = cwin; cwin.self = cwin;
  const cctx = vm.createContext(cwin);
  for (const s of scriptsOf('companion.html', /companion\.js$/)) {
    try { vm.runInContext(fs.readFileSync(path.join(root, s), 'utf8'), cctx, { filename: s }); }
    catch (e) { const err = new Error('COMPANION LOAD ERROR ' + s + ': ' + e.message); err.file = s; throw err; }
  }
  return { win: cwin, CompanionContent: cwin.CompanionContent };
}

/* A blank save, the shape Store.fresh() makes. Tools probe with this and with mutations of it. */
function blankState() {
  return { version: 1, scene: null, chapter: null, flags: {}, choices: {}, tokens: {},
    visited: [], hintsUsed: {}, solved: {}, names: ['Reader', 'Listener', 'Seer', 'Binder'], keys: ['A', 'C', 'M', '/'],
    elapsedMs: 0, startedAt: null, lastTick: null, log: [] };
}

module.exports = { root, loadHearth, loadCompanion, blankState, makeWindow };
