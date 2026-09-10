/* Chapter IV oath-ring assertions. Loads the real chapter under a stub window, pulls the shipped
   config for ch4_oath, and enumerates every legal board against the shipped check() — so the
   drop-a-role table in the chapter comment is measured, not asserted.
   Run: node tools/scripts/ch4-oath-check.js */
const fs = require('fs'), path = require('path'), vm = require('vm');
const root = path.join(__dirname, '..', '..');
const noop = () => {};
const el = () => ({ appendChild: noop, addEventListener: noop, classList: { add: noop, remove: noop, toggle: noop, contains: () => false }, style: {}, querySelector: () => null, querySelectorAll: () => [], setAttribute: noop, remove: noop, innerHTML: '', textContent: '' });
const win = { addEventListener: noop, location: { href: 'http://x/', protocol: 'http:', search: '' }, localStorage: { getItem: () => null, setItem: noop, removeItem: noop }, document: { getElementById: el, createElement: el, createTextNode: () => ({}), body: el(), head: el(), addEventListener: noop, querySelector: () => null, querySelectorAll: () => [], hidden: false }, navigator: {}, performance: { now: () => 0 }, requestAnimationFrame: noop, setInterval: () => 0, setTimeout: () => 0, clearInterval: noop, clearTimeout: noop, console, prompt: () => null, confirm: () => true, alert: noop, URLSearchParams, Math, JSON, Object, Array, String, Number, Promise, Set, Map, Date };
win.window = win; const ctx = vm.createContext(win);
for (const f of ['js/core/audio.js', 'js/core/fx.js', 'js/core/store.js', 'js/core/input.js', 'js/core/ui.js', 'js/core/engine.js', 'js/art/art.js', 'js/content/glyphs.js', 'js/content/shared.js', 'js/content/lore.js', 'js/content/ch3.js', 'js/content/ch4.js']) vm.runInContext(fs.readFileSync(path.join(root, f), 'utf8'), ctx, { filename: f });

const G = win.VigilGlyphs;
const NAMES = G.names.slice();                       // the eight words the palette offers
const cfg = win.Game.scenes.ch4_oath.config({ flags: {} });
const assert = (c, m) => { if (!c) { console.error('FAIL', m); process.exitCode = 1; } else console.log('ok  ', m); };

/* every legal board: four slots, each empty or one of the eight, no repeats */
const boards = [];
(function build(slot, used, m) {
  if (slot > 4) { boards.push(Object.assign({}, m)); return; }
  build(slot + 1, used, m);                                        // leave it empty
  for (const w of NAMES) { if (used.has(w)) continue; used.add(w); m[slot] = w; build(slot + 1, used, m); delete m[slot]; used.delete(w); }
})(1, new Set(), {});

const verdict = (m) => { const r = cfg.check(m); return r === true ? 'ACCEPT' : typeof r === 'string' ? r : 'false'; };
const accepted = boards.filter(m => verdict(m) === 'ACCEPT');
console.log(`${boards.length} legal boards, ${accepted.length} accepted`);
accepted.forEach(m => console.log('    ', [1, 2, 3, 4].map(i => m[i] || '_').join('/')));
assert(boards.length === 3393, `3393 legal boards (got ${boards.length})`);
assert(accepted.length >= 1 && accepted.length <= 2, `the ring accepts ${accepted.length} board(s)`);

/* The last hint rung -- the one the engine labels "Reveal the answer (last resort)" and files under
   the heading "Answer" (js/core/engine.js:349) -- put through the SAME cfg.check the ring uses. The
   ring is maxTries: 1 and refunds only COLD and an unfilled board, so a rung that names a full,
   lawful, wrong board spends the one closing and writes OATH 0 / OATH_KNOT false / REFUSED_OATH true
   into ch5, ch7 and ch8. It did: after OATH_SCRATCH moved from 4 to 2 the rung kept the old board,
   which is byte-for-byte the notch board this ring keys as its named wrong answer, and nothing in the
   repo ever compared the rung to the check. Every lock the rung offers must be accepted. */
const hints = win.Game.scenes.ch4_oath.hints;
const rung = (() => { const h = hints[hints.length - 1]; return typeof h === 'function' ? h({ flags: {} }) : h; })();
console.log('last rung:', rung);
const words = [...rung.matchAll(/([A-Z]{3,})\s+in\s+slot\s+(\d)/g)].map(m => [+m[2], m[1]]);
const lockM = /lock goes in slot (\d):\s*([A-Z]+(?:\s+or\s+[A-Z]+)*)/.exec(rung);
assert(words.length === 3, `the rung names three words and their slots (got ${words.length})`);
assert(!!lockM, 'the rung names the lock slot and what may go in it');
if (words.length === 3 && lockM) {
  const locks = lockM[2].split(/\s+or\s+/);
  for (const L of locks) {
    /* a fresh cfg per probe: check() refunds by mutating cfg.maxTries, and the enumeration above has
       already spent 2553 refunds on this one */
    const fresh = win.Game.scenes.ch4_oath.config({ flags: {} });
    const m = {}; words.forEach(([slot, w]) => { m[slot] = w; }); m[+lockM[1]] = L;
    const board = [1, 2, 3, 4].map(i => m[i] || '_').join('/');
    assert(fresh.maxTries === 1, `the ring takes exactly one closing (maxTries ${fresh.maxTries})`);
    assert(fresh.check(Object.assign({}, m)) === true, `the rung's board is one the ring accepts: ${board}`);
    assert(fresh.maxTries === 1, `and the rung's board is not refunded: ${board} still costs the closing`);
  }
}

/* The scratch and notch must not be Chapter III's pair, or a table that solved the Tower threshold
   already knows where this sigil begins and the Seer's seat is free. */
const src = fs.readFileSync(path.join(root, 'js/content/ch4.js'), 'utf8');
const ch3src = fs.readFileSync(path.join(root, 'js/content/ch3.js'), 'utf8');
const g = (re, t) => { const m = re.exec(t); return m ? +m[1] : null; };
const s4 = g(/OATH_SCRATCH = (\d)/, src), n4 = g(/OATH_NOTCH = (\d)/, src);
const c3 = /CUTS = \{ scratch: (\d), notch: (\d) \}/.exec(ch3src);
assert(c3 && !(s4 === +c3[1] && n4 === +c3[2]),
  `the oath's cuts (scratch ${s4}, notch ${n4}) are not Chapter III's (scratch ${c3 && c3[1]}, notch ${c3 && c3[2]})`);

/* No drop-a-role table here, deliberately. The four facts interact -- the Binder's rule ("a sigil
   begins at the scratch and runs the way a clock counts") only locates the words once the Seer has
   said where the scratch is, and the Listener's step only orders them once they are located -- so a
   generic per-role filter gives numbers that look authoritative and are wrong. The measured table
   lives in the comment above the oath data in js/content/ch4.js, derived against this same shipped
   check(); what this file guards is the part a change can break silently: the size of the legal
   space, the number of winning boards, and the collision with Chapter III's cuts. */

/* ---- the Binder's seat here depends on ch3 disagreeing with the Prologue ----
   The Binder's page says "a sigil begins at the scratch ... the same rule as the lamp". That sentence
   is worth a whole bit ONLY because the room has, one chapter earlier, met a ring that does not use
   the lamp's rule: ch3's Tower ward is a Vigil ward and begins at the notch. Take that away and this
   page is a restatement of what the Prologue worked on the shared screen, and the Binder-less field
   here halves from 8 boards to 4 -- a coin, on a maxTries: 1 puzzle whose loss is read by ch5, ch7
   and ch8. The dependency runs across three chapters and no chapter can see it, so it is asserted
   here. (Measured both ways in scratchpad/prologue/oath.js.) */
{
  const c4page = fs.readFileSync(path.join(root, 'js/content/companion/ch4.js'), 'utf8');
  const c3page = fs.readFileSync(path.join(root, 'js/content/companion/ch3.js'), 'utf8');
  assert(/a sigil begins at the scratch, and runs the way a clock counts\*\*/.test(c4page),
    "the Binder's oath page still says this ring begins at the scratch");
  assert(/begins at the \*\*notch\*\*/.test(c3page),
    "ch3's ward page still says THAT ring begins at the notch — which is the only reason the sentence above is worth anything");
  /* THE ASSERTION THAT WAS MISSING, and its absence cost a real defect. The two sentences above are
     contradictory unconditional rules about what a notch means, and this ring is the only commit-once
     puzzle in the game -- so once ch3 introduced a second CLASS of ring, a Binder holding both pages
     had no way to tell which rule governed the scroll in front of them, and the fix that closed a
     three-role leak in ch3 handed the FOUR-role Binder a coin flip here. Asserting that the two pages
     differ is not enough: each has to name the class it applies to. */
  const APOS = "(?:\\\\'|\\\\u2019|\u2019|')";   // the pages are JS source: ' is escaped, \u2019 is written out
  assert(new RegExp('Founders' + APOS + ' work').test(c4page) && /not a Vigil ward/.test(c4page),
    "the oath page names the CLASS of ring, so the Binder can tell which of the two rules applies");
  assert(new RegExp('Founders' + APOS + '\\s*(brass|sigil)').test(c3page),
    "and ch3's ward page names its class too, rather than simply contradicting the other page");
  /* Direction is the Binder's SECOND bit at the Tower, and it only became one this pass: the Prologue
     teaches 'sunwise -- clockwise' aloud, in the Binder's own mouth, so until ch3's ward ran
     widdershins the Binder-less field there was 2 boards and three tries walked it. If this sentence
     goes, that seat is half free again and no other check would notice. */
  assert(/widdershins/.test(c3page),
    "ch3's ward page still teaches the direction the Prologue did not spend");
  const ch3cuts = /CUTS = \{ scratch: (\d), notch: (\d) \}/.exec(fs.readFileSync(path.join(root, 'js/content/ch3.js'), 'utf8'));
  assert(ch3cuts && !(+ch3cuts[1] === s4 && +ch3cuts[2] === n4),
    `and ch3's cut pair (scratch ${ch3cuts && ch3cuts[1]}, notch ${ch3cuts && ch3cuts[2]}) is still not this ring's (scratch ${s4}, notch ${n4})`);
}
