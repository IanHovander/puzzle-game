/* Player-visible prose, counted the same way every time.
   node tools/prose-count.js              every chapter, one line each, against both limits
   node tools/prose-count.js ch4          per-scene breakdown, worst first
   node tools/prose-count.js ch4 --all    per-scene, in story order
   node tools/prose-count.js ch4 --dump   every counted string: scene, bucket, words, text
   node tools/prose-count.js ch4 --missed every string with two or more words that was NOT counted, and where
                                          it sits -- the list to read when you think the tool is wrong
   --root DIR                             count another checkout (a worktree, an extracted branch)

   WHAT IS COUNTED. Every string literal in js/content/chN.js that the Hearth can put on screen, once,
   however many branches or scenes reach it. Mutually exclusive branches are summed: a table only ever
   sees one of them, but every one of them is prose somebody wrote and the next writer has to keep.

   HOW. The file is parsed with acorn (tools/vendor/acorn.js) and walked from `Game.addChapter({...})`
   along the same keys the engine reads: a scene's `text`, `title`, `solvedText`, `button`, `prompt`,
   `options` (text, sub, after, ask), `timerText`, `roles`, `codeLabel`, `codeSub`, `flowTitle`, `stats`,
   `slots`, `badText`, `stuckText`, `hints`, and a puzzle `config` read the way its widget in
   js/puzzles/ reads it (note, html, wrongText, successText, submitText, timeoutText, emptyText, failText,
   fourHandsText, center, hub, field labels and placeholders, seat labels, grid labels and doors, lane
   names, and what check() and onWrong() return where the widget prints it). A value is followed to
   wherever it really comes from: a constant (REASONS, DOOR, STAND), a helper's return value (wardReason,
   roundText, askOpt), a helper's arguments, an array built up with push(), a `.map()` over a table, a
   getter. Inside every function the engine or a widget runs -- a custom scene's run(), an onSolve, an
   event handler -- the DOM writes are followed too: UI.el text/html/placeholder, textContent and
   innerHTML, api.say and api.button, UI.toast/notice/confirm/ask/modal, and widget builders called by
   hand. Anything left over anywhere in the file that writes to the screen is swept up at the end and
   charged to (chapter).

   WHAT IS NOT. Choice `note:` and Store.note() (they go to state.log, which nothing renders); ids, flag
   names and values, class names, CSS and SVG attributes; tooltips (`title` attributes); a speaker label
   the engine suppresses because the line before had the same speaker; and data that is not this file's
   prose -- a player's typed name, a role nickname from lore.js, a glyph name, a number. A `${...}` is
   never a word in itself: what it evaluates to is counted where that is written. Text shown by the
   engine itself (a widget's default 'Speak', the hint modal) is the engine's, not the chapter's.

   Per scene it splits the count by where the words live, because only some of them are on screen together:
     text     the scene's title and paragraphs -- this is the one the 150-word scene cap applies to
     solved   what prints after a puzzle is solved, a separate moment
     choices  a choice's prompt and timer line, option labels and the replies to them, of which a table sees one
     rules    the puzzle's rule card, its wrong- and right-answer lines, a token scene's wrong-word toasts
     panel    the rest of the screen: an attunement's labels and roles line, a flow scene's title, ledger
              and chart labels
     branch   prose built inside a function body that is none of the above: a custom scene's run(), an
              onSolve, a helper reached from them. Mutually exclusive alternatives, never all at once.
     hints    only ever seen by a table that asks
     button   control labels
   A scene whose SUM is over 150 is not necessarily over budget; a scene whose TEXT is, always is.
   A literal two scenes share is counted in both scenes' lines and once in the chapter total.

   The budget the house style sets (docs/STYLE.md R1.5): a drafting limit and a final-acceptance
   ceiling, both below, and no scene's text over 150 words, no puzzle brief over 65. */
const fs = require('fs'), path = require('path');
const acorn = require('./vendor/acorn.js');

/* docs/STYLE.md R1.5. Two numbers, and only the first is room to write in.
   DRAFT_LIMIT is the old 1,600 carried over to this count. Across the whole game this count reads 1.20-1.21x
   what the old line scanner read (13,667 -> 16,547 words on main, 14,144 -> 17,017 on the Pratchett-voice
   branch the audit measured), so 1,600 old words are 1,925-1,937 of these; the limit takes the lower, so the
   fix gives no writer more room than they had before it.
   ACCEPT_CEILING is the bar at final grading and acceptance only: the smallest round number every chapter
   passes as it stands, set by ch6 at 2,108. It is not drafting room. */
const DRAFT_LIMIT = 1925;
const ACCEPT_CEILING = 2125;

/* ------------------------------------------------------------------------------------------------
   Words. A token is a word if it has a Latin letter in it, as before: '—', '3' and '·' are not words,
   "Wren's" and "5th" are. Rich markup (**, *, ~~, {{ }}) and tags are not words. */
const RICH = /\*\*|\*|~~|\{\{|\}\}/g;
const isWord = (t) => /[A-Za-z]/.test(t) && !/^\W*\{\w+\}\W*$/.test(t);   // '{n}' is a slot a .replace() fills, not a word
const strip = (s, html) => (html ? s.replace(/<[^>]*>/g, ' ').replace(/<[^>]*$/, ' ').replace(/&[a-z#0-9]+;/gi, ' ') : s.replace(/<[^>]+>/g, ' ')).replace(RICH, ' ')
  .replace(/\b[A-Z](?: [A-Z]\b)+/g, (m) => m.replace(/ /g, ''));   // 'S I T   W I T H   I T' is three words, letter-spaced
const tokens = (s, html) => strip(s, html).split(/\s+/).filter(Boolean);

/* ------------------------------------------------------------------------------------------------
   Contexts: what the code that consumes a value does with it. */
const K = (k, extra) => Object.assign({ k }, extra);
const CODE = K('code'), PROSE = K('prose'), HTML = K('html'), SPEAKER = K('speaker');
const LIST = (of) => K('list', { of }), MAP = (of) => K('map', { of }), OBJ = (fields) => K('obj', { fields });
const PARA = K('para');                          // a string, or { speaker, text, cls }
const PARAS = LIST(PARA);
const PARA_OBJ = OBJ({ text: PROSE, speaker: SPEAKER });
const VERDICT_STR = K('verdictStr');             // check() result printed only when it is a string (ring, dialseq)
const VERDICT_OBJ = OBJ({ text: PROSE });        // check() result printed as .text (seats)
const LABELLED = LIST(OBJ({ label: PROSE }));
const OPTION = OBJ({ text: PROSE, sub: PROSE, after: PARAS, ask: OBJ({ prompt: PROSE, ok: PROSE, value: PROSE }) });
const FLOW = OBJ({ nodes: LABELLED });
/* One schema per widget, from the widget's own source. `check` is absent where the widget only tests the
   result for truth: what it returns is never shown. */
const COMMON = { title: PROSE, note: PROSE, html: HTML, submitText: PROSE, successText: PROSE, wrongText: PROSE, onWrong: PROSE };
const CONFIG = {
  answer: OBJ(Object.assign({ fields: LIST(OBJ({ label: PROSE, placeholder: PROSE })) }, COMMON)),
  dials: OBJ(Object.assign({ dials: LIST(OBJ({ label: PROSE, options: LIST(OBJ({ text: PROSE })) })) }, COMMON)),
  tiles: OBJ(Object.assign({ tiles: LIST(OBJ({ text: PROSE })), emptyText: PROSE }, COMMON)),
  seats: OBJ(Object.assign({ center: PROSE, seats: LIST(OBJ({ label: PROSE, sub: PROSE, banner: HTML, lockedText: PROSE })), check: VERDICT_OBJ, timeoutText: PROSE }, COMMON)),
  dialseq: OBJ(Object.assign({ dials: LABELLED, glyphs: LABELLED, check: VERDICT_STR }, COMMON)),
  wheel: OBJ(Object.assign({ slots: LABELLED, hub: PROSE, emptyText: PROSE }, COMMON)),
  ring: OBJ(Object.assign({ glyphs: LABELLED, marks: LABELLED, hub: PROSE, check: VERDICT_STR, fourHandsText: PROSE }, COMMON)),
  grid: OBJ({ title: PROSE, note: PROSE, labels: MAP(PROSE), patrols: LIST(OBJ({ name: PROSE })), doors: MAP(OBJ({ prompt: PROSE, wrongText: PROSE })),
    alarm: OBJ({ text: PROSE }), successText: PROSE, timeoutText: PROSE }),
  binding: OBJ({ title: PROSE, note: PROSE, failText: PROSE }),
  reaction: OBJ({ title: PROSE, laneNames: LIST(PROSE) }),
};
CONFIG.any = OBJ(Object.assign({}, ...Object.values(CONFIG).map(c => c.fields)));
const BUILDERS = { VigilAnswer: 'answer', VigilDials: 'dials', VigilTiles: 'tiles', VigilSeats: 'seats', VigilDialSeq: 'dialseq',
  VigilWheel: 'wheel', VigilRing: 'ring', VigilGrid: 'grid', VigilBinding: 'binding', VigilReaction: 'reaction' };
/* A scene's keys, the engine's way (js/core/engine.js): [bucket, context]. Any other key is code. */
const SCENE = {
  title: ['text', PROSE], text: ['text', PARAS], solvedText: ['solved', PARAS], button: ['button', PROSE],
  options: ['choices', LIST(OPTION)], timerText: ['choices', PROSE], timeout: ['choices', OPTION], prompt: ['choices', PROSE],
  config: ['rules', null], badText: ['rules', PROSE], stuckText: ['rules', PROSE], hints: ['hints', LIST(PROSE)],
  roles: ['panel', PROSE], codeLabel: ['panel', PROSE], codeSub: ['panel', PROSE], flowTitle: ['panel', PROSE],
  stats: ['panel', PROSE], flow: ['panel', FLOW], slots: ['panel', LABELLED],
};
const SCENE_CTX = K('scene'), SCENES = K('scenes');
const CHAPTER = OBJ({ label: PROSE, title: PROSE, flow: FLOW, scenes: SCENES });
/* Engine and UI calls whose arguments reach the screen: argument index -> context. */
const UI_SINKS = {
  say: [PARAS], typewrite: [null, PARAS], button: [PROSE], toast: [PROSE],
  notice: [PROSE, OBJ({ ok: PROSE, title: PROSE })], confirm: [PROSE, OBJ({ ok: PROSE, cancel: PROSE, title: PROSE })],
  ask: [PROSE, PROSE, OBJ({ ok: PROSE, cancel: PROSE, placeholder: PROSE, title: PROSE })],
  modal: [null, OBJ({ title: PROSE, closeText: PROSE })], audioButton: [PROSE, null, OBJ({ playing: PROSE })], flowchart: [FLOW],
  el: [null, OBJ({ text: PROSE, html: HTML, placeholder: PROSE, value: PROSE }), LIST(PROSE)],
};
const UI_OWNERS = new Set(['UI', 'api', 'ui', 'VigilUI']);
const DOM_PROPS = { textContent: PROSE, innerText: PROSE, placeholder: PROSE, innerHTML: HTML, outerHTML: HTML };
/* A value used as a string. Arrays of strings stay strings here, because .join() and the engine's own
   paragraph loop treat them element by element. */
const stringCtx = (c) => !c ? null : c.k === 'prose' || c.k === 'html' || c.k === 'speaker' ? c
  : c.k === 'para' || c.k === 'verdictStr' ? PROSE : c.k === 'list' ? stringCtx(c.of) : null;
const elemCtx = (c) => c.k === 'list' ? c.of : c;

/* ------------------------------------------------------------------------------------------------
   AST plumbing. */
const isNode = (v) => v && typeof v.type === 'string';
function children(n) {
  const out = [];
  for (const k in n) {
    if (k === 'loc' || k === 'start' || k === 'end' || k === 'range') continue;
    const v = n[k];
    if (Array.isArray(v)) { for (const c of v) if (isNode(c)) out.push(c); } else if (isNode(v)) out.push(v);
  }
  return out;
}
const isFn = (n) => n && (n.type === 'ArrowFunctionExpression' || n.type === 'FunctionExpression' || n.type === 'FunctionDeclaration');
const isStr = (n) => n && n.type === 'Literal' && typeof n.value === 'string';
const keyName = (p) => !p.computed ? (p.key.type === 'Identifier' ? p.key.name : String(p.key.value)) : (p.key.type === 'Literal' ? String(p.key.value) : null);
const memberName = (m) => !m.computed ? m.property.name : (m.property.type === 'Literal' ? String(m.property.value) : null);
/* `a.b.c` as text, for matching engine calls; null for anything not a plain chain. */
const chain = (n) => n.type === 'Identifier' ? n.name : n.type === 'ThisExpression' ? 'this'
  : n.type === 'MemberExpression' && !n.computed ? (chain(n.object) == null ? null : chain(n.object) + '.' + n.property.name) : null;

function patternIds(pat, p, out) {
  if (!pat) return out;
  switch (pat.type) {
    case 'Identifier': out.push({ id: pat, path: p }); break;
    case 'ArrayPattern': pat.elements.forEach((e, i) => { if (e) patternIds(e.type === 'RestElement' ? e.argument : e, p.concat(e.type === 'RestElement' ? { all: true } : { key: String(i) }), out); }); break;
    case 'ObjectPattern': pat.properties.forEach(q => q.type === 'RestElement' ? patternIds(q.argument, p.concat({ all: true }), out)
      : patternIds(q.value, p.concat(keyName(q) == null ? { all: true } : { key: keyName(q) }), out)); break;
    case 'AssignmentPattern': patternIds(pat.left, p, out); out.defaults = (out.defaults || []).concat({ id: pat.left, expr: pat.right }); break;
    case 'RestElement': patternIds(pat.argument, p.concat({ all: true }), out); break;
  }
  return out;
}

/* ------------------------------------------------------------------------------------------------
   Scopes: every identifier resolved to its binding, and every binding's other sources of value --
   later assignments, push() into an array, a property set or defined after the object was made. */
function buildScopes(ast) {
  const parent = new Map(), scopes = new Map(), bindings = [], bindingOf = new Map(), declIds = new Set();
  (function link(n, p) { parent.set(n, p); for (const c of children(n)) link(c, n); })(ast, null);
  const scopeOf = (n) => { if (!scopes.has(n)) scopes.set(n, new Map()); return scopes.get(n); };
  const isScope = (n) => n.type === 'Program' || isFn(n) || n.type === 'BlockStatement' || n.type === 'ForStatement'
    || n.type === 'ForInStatement' || n.type === 'ForOfStatement' || n.type === 'CatchClause' || n.type === 'SwitchStatement';
  const up = (n, test) => { let q = parent.get(n); while (q && !test(q)) q = parent.get(q); return q; };
  const declare = (scope, ids, mk) => ids.forEach(({ id, path: p }) => {
    const b = Object.assign({ name: id.name, id, path: p, refs: [], sources: [], elems: [], props: {} }, mk(id));
    scopeOf(scope).set(id.name, b); bindings.push(b); bindingOf.set(id, b); declIds.add(id);
  });
  (function walk(n) {
    if (n.type === 'VariableDeclaration') {
      const scope = n.kind === 'var' ? up(n, q => isFn(q) || q.type === 'Program') : up(n, isScope);
      for (const d of n.declarations) {
        const ids = patternIds(d.id, [], []);
        const forOf = parent.get(n) && parent.get(n).type === 'ForOfStatement' && parent.get(n).left === n ? parent.get(n) : null;
        declare(scope, ids, () => forOf ? { kind: 'forof', of: forOf.right } : { kind: 'decl', init: d.init, declarator: d });
      }
    } else if (n.type === 'FunctionDeclaration' && n.id) {
      declare(up(n, isScope), [{ id: n.id, path: [] }], () => ({ kind: 'function', fn: n }));
    } else if (n.type === 'ClassDeclaration' && n.id) {
      declare(up(n, isScope), [{ id: n.id, path: [] }], () => ({ kind: 'other' }));
    }
    if (isFn(n)) {
      n.params.forEach((pat, index) => { const ids = patternIds(pat, [], []); declare(n, ids, () => ({ kind: 'param', fn: n, index })); (ids.defaults || []).forEach(d => bindingOf.get(d.id).sources.push({ expr: d.expr })); });
      if (n.type === 'FunctionExpression' && n.id && !scopeOf(n).has(n.id.name)) declare(n, [{ id: n.id, path: [] }], () => ({ kind: 'function', fn: n }));
    }
    if (n.type === 'CatchClause' && n.param) declare(n, patternIds(n.param, [], []), () => ({ kind: 'other' }));
    for (const c of children(n)) walk(c);
  })(ast);
  const isRef = (id) => {
    const p = parent.get(id);
    if (declIds.has(id)) return false;
    if (p.type === 'MemberExpression' && p.property === id && !p.computed) return false;
    if ((p.type === 'Property' || p.type === 'MethodDefinition' || p.type === 'PropertyDefinition') && p.key === id && !p.computed && p.value !== id) return false;
    if (p.type === 'LabeledStatement' || p.type === 'BreakStatement' || p.type === 'ContinueStatement') return false;
    return true;
  };
  const resolve = (id) => {
    for (let q = parent.get(id); q; q = parent.get(q)) { const s = scopes.get(q); if (s && s.has(id.name)) return s.get(id.name); }
    return null;
  };
  const refOf = new Map();
  (function walk(n) {
    if (n.type === 'Identifier' && isRef(n)) { const b = resolve(n); if (b) { refOf.set(n, b); b.refs.push(n); } }
    for (const c of children(n)) walk(c);
  })(ast);
  /* What else gives a binding its value. */
  for (const b of bindings) for (const r of b.refs) {
    const p = parent.get(r), g = p && parent.get(p);
    if (p.type === 'AssignmentExpression' && p.left === r) b.sources.push({ expr: p.right });
    else if (p.type === 'MemberExpression' && p.object === r) {
      const name = memberName(p);
      if (g.type === 'CallExpression' && g.callee === p && (name === 'push' || name === 'unshift')) g.arguments.forEach(a => b.elems.push(a.type === 'SpreadElement' ? { expr: a.argument, spread: true } : { expr: a }));
      else if (g.type === 'CallExpression' && g.callee === p && name === 'splice') g.arguments.slice(2).forEach(a => b.elems.push({ expr: a }));
      else if (g.type === 'MemberExpression' && name === 'push' && memberName(g) === 'apply') { const call = parent.get(g); if (call.type === 'CallExpression' && call.arguments[1]) b.elems.push({ expr: call.arguments[1], spread: true }); }
      else if (g.type === 'AssignmentExpression' && g.left === p) { if (p.computed && name == null) b.elems.push({ expr: g.right }); else (b.props[name] = b.props[name] || []).push({ expr: g.right }); }
    } else if (p.type === 'CallExpression' && p.arguments[0] === r && chain(p.callee) === 'Object.defineProperty' && isStr(p.arguments[1]) && p.arguments[2] && p.arguments[2].type === 'ObjectExpression') {
      const desc = p.arguments[2], k = p.arguments[1].value;
      for (const q of desc.properties) if (q.type === 'Property' && (keyName(q) === 'get' || keyName(q) === 'value')) (b.props[k] = b.props[k] || []).push({ expr: q.value, getter: keyName(q) === 'get' });
    }
  }
  /* The call sites of every named local function, for a parameter nobody bound on the way in. */
  const callsOf = new Map();
  for (const b of bindings) {
    const fn = b.kind === 'function' ? b.fn : b.kind === 'decl' && isFn(b.init) && !b.path.length ? b.init : null;
    if (!fn) continue;
    for (const r of b.refs) { const p = parent.get(r); if (p.type === 'CallExpression' && p.callee === r) (callsOf.get(fn) || callsOf.set(fn, []).get(fn)).push(p); }
  }
  return { parent, refOf, bindingOf, bindings, callsOf };
}

/* ------------------------------------------------------------------------------------------------
   The analysis. */
function analyze(src) {
  const ast = acorn.parse(src, { ecmaVersion: 'latest', sourceType: 'script', allowHashBang: true });
  const S = buildScopes(ast);
  const units = new Map();          // literal node -> { words, text, seen: Map(scene -> bucket) }
  let sweeping = false;             // the last pass only adds what nothing else reached
  const suppressed = new Set();     // speaker literals the engine will not print
  const fuseFirst = new Set(), fuseLast = new Set();
  const branchy = new Set();
  const initOf = new Map();         // array/object literal -> the binding it initialises (for push() and late props)
  for (const b of S.bindings) if (b.kind === 'decl' && b.init && !b.path.length && (b.init.type === 'ArrayExpression' || b.init.type === 'ObjectExpression')) initOf.set(b.init, b);

  /* Edges of a string-valued expression, for words split across a `+` or a `${}`: "Seat" + "s" is one
     word on screen, so the second literal's first token is not a word of its own. */
  const edgeLits = (e, side, seen) => {
    seen = seen || new Set(); if (!e || seen.has(e)) return []; seen.add(e);
    if (isStr(e)) return [e];
    if (e.type === 'TemplateLiteral') { const q = side === 'start' ? e.quasis[0] : e.quasis[e.quasis.length - 1]; return q.value.cooked ? [e] : []; }
    if (e.type === 'ConditionalExpression') return edgeLits(e.consequent, side, seen).concat(edgeLits(e.alternate, side, seen));
    if (e.type === 'LogicalExpression') return (e.operator === '&&' ? [] : edgeLits(e.left, side, seen)).concat(edgeLits(e.right, side, seen));
    if (e.type === 'BinaryExpression' && e.operator === '+') return edgeLits(side === 'start' ? e.left : e.right, side, seen);
    if (e.type === 'Identifier') { const b = S.refOf.get(e); if (b && b.kind === 'decl' && b.init && !b.path.length && !b.sources.length) return edgeLits(b.init, side, seen); }
    return [];
  };
  const edgeText = (lit, side) => { const t = isStr(lit) ? lit.value : side === 'start' ? lit.quasis[0].value.cooked : lit.quasis[lit.quasis.length - 1].value.cooked; return strip(t || '', false); };
  const glued = (left, right) => { // left's last token runs straight into right's first, and both are words
    if (!left || !right || /\s$/.test(left) || /^\s/.test(right)) return false;
    const a = left.split(/\s+/).pop(), b = right.split(/\s+/)[0];
    return isWord(a) && isWord(b);
  };
  (function prepass(n) {
    if (n.type === 'BinaryExpression' && n.operator === '+' && !(S.parent.get(n).type === 'BinaryExpression' && S.parent.get(n).operator === '+' && S.parent.get(n).left === n)) {
      const parts = []; (function flat(e) { if (e.type === 'BinaryExpression' && e.operator === '+') { flat(e.left); flat(e.right); } else parts.push(e); })(n);
      for (let i = 1; i < parts.length; i++)
        for (const a of edgeLits(parts[i - 1], 'end')) for (const b of edgeLits(parts[i], 'start')) if (glued(edgeText(a, 'end'), edgeText(b, 'start'))) fuseFirst.add(b);
    }
    if (n.type === 'TemplateLiteral') n.expressions.forEach((e, i) => {
      const before = strip(n.quasis[i].value.cooked || '', false), after = strip(n.quasis[i + 1].value.cooked || '', false);
      for (const l of edgeLits(e, 'start')) if (glued(before, edgeText(l, 'start'))) fuseFirst.add(l);
      for (const l of edgeLits(e, 'end')) if (glued(edgeText(l, 'end'), after)) fuseLast.add(l);
    });
    /* Speaker runs: the engine names a speaker once and lets the rule down the side carry the rest. */
    const speakerOf = (el, depth) => {
      if (el && el.type === 'CallExpression' && el.callee.type === 'Identifier' && !(depth > 2)) {   // wrenSays(s, 'seer') -> { speaker: 'Wren', ... }
        const b = S.refOf.get(el.callee), fn = b && (b.kind === 'function' ? b.fn : b.kind === 'decl' && isFn(b.init) ? b.init : null);
        const sp = fn ? returnsOf(fn).map(r => speakerOf(r, (depth || 0) + 1)) : [];
        return sp.length && sp.every(x => x && x !== 'dynamic' && x.value === sp[0].value) ? { value: sp[0].value } : null;
      }
      if (!el || el.type !== 'ObjectExpression') return null;
      const p = el.properties.find(q => q.type === 'Property' && keyName(q) === 'speaker');
      return p ? (isStr(p.value) ? p.value : 'dynamic') : null;
    };
    const run = (els) => { let prev = null; for (const el of els) { const sp = speakerOf(el); if (sp && sp !== 'dynamic' && prev && prev !== 'dynamic' && prev.value === sp.value) suppressed.add(sp); prev = sp; } };
    if (n.type === 'ArrayExpression') run(n.elements);
    if (n.type === 'BlockStatement' || n.type === 'Program') {   // out.push(a); out.push(b); ...
      let seq = [], who = null;
      const flush = () => { run(seq); seq = []; who = null; };
      for (const st of n.body) {
        const c = st.type === 'ExpressionStatement' && st.expression.type === 'CallExpression' && st.expression.callee.type === 'MemberExpression' && memberName(st.expression.callee) === 'push' && st.expression.callee.object.type === 'Identifier' ? st.expression : null;
        if (!c) { flush(); continue; }
        if (who !== null && who !== c.callee.object.name) flush();
        who = c.callee.object.name; seq = seq.concat(c.arguments);
      }
      flush();
    }
    if (n.type === 'ObjectExpression') {   // a scene: the reply or the solved text carries on from the scene's last speaker
      const prop = (o, k) => o.properties.find(q => q.type === 'Property' && keyName(q) === k);
      /* the array literal a key holds, directly or as the body of an arrow `(s) => [ ... ]` */
      const arr = (q) => !q ? null : q.value.type === 'ArrayExpression' ? q.value
        : q.value.type === 'ArrowFunctionExpression' && q.value.body.type === 'ArrayExpression' ? q.value.body : null;
      const text = arr(prop(n, 'text'));
      if (text && text.elements.length) {
        const last = speakerOf(text.elements[text.elements.length - 1]);
        const follow = [];
        const solved = arr(prop(n, 'solvedText')); if (solved) follow.push(solved);
        const options = prop(n, 'options');
        if (options && options.value.type === 'ArrayExpression') for (const o of options.value.elements) if (o && o.type === 'ObjectExpression') { const a = arr(prop(o, 'after')); if (a) follow.push(a); }
        for (const list of follow) { const first = speakerOf(list.elements[0]); if (last && last !== 'dynamic' && first && first !== 'dynamic' && first.value === last.value) suppressed.add(first); }
      }
    }
    for (const c of children(n)) prepass(c);
  })(ast);

  /* Count one literal, once. Every scene that reaches it is remembered, with the first bucket it came in by. */
  function take(lit, at, words, text) {
    let u = units.get(lit);
    if (!u) units.set(lit, u = { words, text, seen: new Map([[at.scene, at.bucket]]), line: lineOf(lit.start) });
    else if (!sweeping && !u.seen.has(at.scene)) u.seen.set(at.scene, at.bucket);
  }
  const lineStarts = [0]; for (let i = 0; i < src.length; i++) if (src[i] === '\n') lineStarts.push(i + 1);
  const lineOf = (pos) => { let lo = 0, hi = lineStarts.length - 1; while (lo < hi) { const mid = (lo + hi + 1) >> 1; if (lineStarts[mid] <= pos) lo = mid; else hi = mid - 1; } return lo + 1; };
  function countTokens(lit, toks) {
    let n = toks.filter(isWord).length;
    if (fuseFirst.has(lit) && toks.length && isWord(toks[0])) n--;
    if (fuseLast.has(lit) && toks.length > (fuseFirst.has(lit) ? 1 : 0) && isWord(toks[toks.length - 1])) n--;
    return Math.max(0, n);
  }

  /* ---- containers: what an expression can evaluate to, as object/array/function literals ---- */
  const ENV0 = new Map();
  const bind = (fn, args, env) => {
    const e = new Map(env);
    fn.params.forEach((pat, i) => {
      const a = args[i];
      for (const { id, path: p } of patternIds(pat, [], [])) {
        const b = S.bindingOf.get(id);
        if (a && a.type !== 'SpreadElement') e.set(b, [{ expr: a.expr || a, env: a.env || env, path: (a.path || []).concat(p) }]);
        else e.delete(b);
      }
    });
    return e;
  };
  /* Bind a callback's first parameter to the elements of the array it is called on. */
  const bindEach = (fn, receiver, env) => bind(fn, [{ expr: receiver, env, path: [{ all: true }] }], env);
  const stack = new Set();
  const guard = (key, f) => { if (stack.has(key) || stack.size > 400) return []; stack.add(key); try { return f(); } finally { stack.delete(key); } };

  function containers(e, env) {
    if (!e) return [];
    switch (e.type) {
      case 'ObjectExpression': case 'ArrayExpression': case 'Literal': case 'TemplateLiteral':
      case 'ArrowFunctionExpression': case 'FunctionExpression': case 'FunctionDeclaration':
        return [{ node: e, env }];
      case 'ConditionalExpression': return containers(e.consequent, env).concat(containers(e.alternate, env));
      case 'LogicalExpression': return (e.operator === '&&' ? [] : containers(e.left, env)).concat(containers(e.right, env));
      case 'SequenceExpression': return containers(e.expressions[e.expressions.length - 1], env);
      case 'AssignmentExpression': return containers(e.right, env);
      case 'AwaitExpression': return containers(e.argument, env);
      case 'Identifier': return guard('c' + e.type + e.start + '-' + e.end, () => {
        const out = valuesOf(e, env).flatMap(r => containersRef(r)), b = S.refOf.get(e);
        if (b && b.elems.length && !initOf.has(b.init)) out.push({ node: { type: 'Virtual', elems: b.elems.flatMap(s => s.spread ? containers(s.expr, env).flatMap(c => select(c, { all: true })) : [{ expr: s.expr, env }]) }, env });
        return out;
      });
      case 'MemberExpression': { const st = stepOf(e, env); if (!st) return []; return guard('c' + e.type + e.start + '-' + e.end, () => containers(e.object, env).flatMap(c => select(c, st)).flatMap(r => containersRef(r))); }
      case 'CallExpression': return guard('c' + e.type + e.start + '-' + e.end, () => {
        const m = e.callee.type === 'MemberExpression' ? memberName(e.callee) : null, recv = m ? e.callee.object : null;
        if (chain(e.callee) === 'Object.assign') return e.arguments.flatMap(a => containers(a, env));
        if (m === 'concat') return containers(recv, env).concat(e.arguments.flatMap(a => containers(a, env)));
        if (m === 'filter' || m === 'slice' || m === 'reverse' || m === 'sort' || m === 'flat') return containers(recv, env);
        if (m === 'map' && e.arguments[0]) {
          const fns = callable(e.arguments[0], env);
          if (!fns.length) return containers(recv, env);
          return [{ node: { type: 'Virtual', elems: fns.flatMap(f => returnsOf(f.node).map(r => ({ expr: r, env: bindEach(f.node, recv, f.env) }))) }, env }];
        }
        return callable(e.callee, env).flatMap(f => { const ne = bind(f.node, e.arguments, env); return returnsOf(f.node).flatMap(r => containers(r, ne)); });
      });
      default: return [];
    }
  }
  const containersRef = (r) => !r.path || !r.path.length ? containers(r.expr, r.env)
    : containers(r.expr, r.env).flatMap(c => select(c, r.path[0])).flatMap(x => containersRef({ expr: x.expr, env: x.env, path: (x.path || []).concat(r.path.slice(1)) }));
  const callable = (e, env) => containers(e, env).filter(c => isFn(c.node));
  function returnsOf(fn) {
    if (fn.type === 'ArrowFunctionExpression' && fn.body.type !== 'BlockStatement') return [fn.body];
    const out = [];
    (function walk(n) { if (n !== fn && isFn(n)) return; if (n.type === 'ReturnStatement' && n.argument) out.push(n.argument); for (const c of children(n)) walk(c); })(fn.body);
    return out;
  }
  /* The step a member expression takes: a property name, a constant index, or "any of them". */
  function stepOf(m, env) {
    if (!m.computed) return m.property.name === 'length' ? null : { key: m.property.name };
    const k = constKey(m.property, env, 0);
    return k != null ? { key: k } : { all: true };
  }
  /* A key that is the same on every path: a literal, a const holding one, or a parameter this call bound
     to one -- `REPLY[role]` inside wrenSays(s, 'seer') is REPLY.seer, not every reply. */
  function constKey(e, env, depth) {
    if (e.type === 'Literal') return String(e.value);
    if (e.type !== 'Identifier' || depth > 6) return null;
    const b = S.refOf.get(e);
    if (!b || b.sources.length || b.path.length) return null;
    if (b.kind === 'decl' && b.init && S.parent.get(b.declarator).kind === 'const') return constKey(b.init, env, depth + 1);
    if (b.kind === 'param' && env.has(b)) { const r = env.get(b); if (r.length === 1 && !(r[0].path || []).length) return constKey(r[0].expr, r[0].env, depth + 1); }
    return null;
  }
  /* The values one step into a container, as references {expr, env, path}. */
  function select(c, st) {
    const n = c.node, out = [];
    if (n.type === 'ObjectExpression') {
      for (const p of n.properties) {
        if (p.type === 'SpreadElement') { containers(p.argument, c.env).forEach(x => out.push(...select(x, st))); continue; }
        if (st.key != null && keyName(p) !== st.key && !(p.computed && keyName(p) == null)) continue;
        if (p.kind === 'get') returnsOf(p.value).forEach(r => out.push({ expr: r, env: c.env })); else out.push({ expr: p.value, env: c.env });
      }
      const b = initOf.get(n);
      if (b) for (const k in b.props) if (st.key == null || k === st.key) for (const s of b.props[k]) {
        if (s.getter) returnsOf(s.expr).forEach(r => out.push({ expr: r, env: c.env })); else out.push({ expr: s.expr, env: c.env });
      }
    } else if (n.type === 'ArrayExpression') {
      const idx = st.key != null && /^\d+$/.test(st.key) ? +st.key : null;
      if (st.key != null && idx == null) return out;          // .push, .map and the like are not elements
      const spreadBefore = n.elements.slice(0, idx == null ? 0 : idx + 1).some(x => x && x.type === 'SpreadElement');
      n.elements.forEach((x, i) => {
        if (!x) return;
        if (x.type === 'SpreadElement') { containers(x.argument, c.env).forEach(y => out.push(...select(y, { all: true }))); return; }
        if (idx == null || spreadBefore || i === idx) out.push({ expr: x, env: c.env });
      });
      const b = initOf.get(n);
      if (b) for (const s of b.elems) { if (s.spread) containers(s.expr, c.env).forEach(y => out.push(...select(y, { all: true }))); else out.push({ expr: s.expr, env: c.env }); }
    } else if (n.type === 'Virtual') out.push(...n.elems);
    return out;
  }
  /* Everything an identifier can hold. */
  function valuesOf(id, env) {
    const b = S.refOf.get(id);
    if (!b) return [];
    const out = [];
    if (b.kind === 'decl' && b.init) out.push({ expr: b.init, env, path: b.path });
    if (b.kind === 'function') out.push({ expr: b.fn, env, path: [] });
    if (b.kind === 'forof') out.push({ expr: b.of, env, path: [{ all: true }].concat(b.path) });
    if (b.kind === 'param') {
      if (env.has(b)) out.push(...env.get(b));
      else for (const call of S.callsOf.get(b.fn) || []) if (call.arguments[b.index]) out.push({ expr: call.arguments[b.index], env: ENV0, path: b.path });
    }
    for (const s of b.sources) out.push({ expr: s.expr, env, path: [] });
    return out;
  }

  /* ---- visit: count what an expression can put on screen, read as `ctx` ---- */
  function visit(e, ctx, env, at) {
    if (!e || !ctx) return;
    if (ctx.k === 'code') return scan(e, env, at);
    switch (e.type) {
      case 'Literal': if (typeof e.value === 'string') { const sc = stringCtx(ctx); if (sc) takeString(e, sc, at); } return;
      case 'TemplateLiteral': { const sc = stringCtx(ctx); if (sc) takeTemplate(e, sc, env, at); return; }
      case 'BinaryExpression': if (e.operator === '+' && stringCtx(ctx)) { visit(e.left, stringCtx(ctx), env, at); visit(e.right, stringCtx(ctx), env, at); } return;
      case 'ConditionalExpression': visit(e.consequent, ctx, env, at); visit(e.alternate, ctx, env, at); return;
      case 'LogicalExpression': if (e.operator !== '&&') visit(e.left, ctx, env, at); visit(e.right, ctx, env, at); return;
      case 'SequenceExpression': visit(e.expressions[e.expressions.length - 1], ctx, env, at); return;
      case 'AssignmentExpression': visit(e.right, ctx, env, at); return;
      case 'AwaitExpression': visit(e.argument, ctx, env, at); return;
      case 'ArrayExpression': return visitArray(e, ctx, env, at);
      case 'ObjectExpression': return visitObject(e, ctx, env, at);
      case 'ArrowFunctionExpression': case 'FunctionExpression': case 'FunctionDeclaration':
        /* The engine or a widget calls it: what it returns is the value, and whatever it writes on the way is prose too. */
        return guard('f' + e.start + ctxId(ctx) + at.scene, () => { returnsOf(e).forEach(r => visit(r, ctx, env, at)); scan(e.body, env, at); });
      case 'Identifier': return guard('i' + e.start + ctxId(ctx), () => {
        valuesOf(e, env).forEach(r => visitRef(r, ctx, at));
        /* an array built up after it was made: `const out = rows.map(...); out.push(...)` */
        const b = S.refOf.get(e);
        if (b && !initOf.has(b.init)) for (const s of b.elems) visit(s.expr, s.spread ? ctx : elemCtx(ctx), env, at);
      });
      case 'MemberExpression': { const st = stepOf(e, env); if (!st) return; return guard('m' + e.start + ctxId(ctx), () => containers(e.object, env).flatMap(c => select(c, st)).forEach(r => visitRef(r, ctx, at))); }
      case 'CallExpression': return visitCall(e, ctx, env, at);
      default: return;
    }
  }
  const ctxIds = new Map(); const ctxId = (c) => { if (!ctxIds.has(c)) ctxIds.set(c, ':' + ctxIds.size); return ctxIds.get(c); };
  function visitRef(r, ctx, at) {
    if (!r.path || !r.path.length) return visit(r.expr, ctx, r.env, at);
    containers(r.expr, r.env).flatMap(c => select(c, r.path[0])).forEach(x => visitRef({ expr: x.expr, env: x.env, path: (x.path || []).concat(r.path.slice(1)) }, ctx, at));
  }
  function takeString(lit, sc, at) {
    if (sc.k === 'speaker' && suppressed.has(lit)) return;
    take(lit, at, countTokens(lit, tokens(lit.value, sc.k === 'html')), lit.value);
  }
  /* A template is one literal. Its `${}`s are placeholders that are never words themselves; each one that
     is not inside a tag is followed to what it evaluates to. */
  function takeTemplate(t, sc, env, at) {
    const html = sc.k === 'html';
    let s = '';
    t.quasis.forEach((q, i) => { s += q.value.cooked || ''; if (i < t.expressions.length) s += String.fromCharCode(0xE000 + i); });
    const live = [];
    if (html) { let inTag = false; for (let i = 0; i < s.length; i++) { const ch = s[i]; if (ch === '<' && /[A-Za-z\/!]/.test(s[i + 1] || '')) inTag = true; else if (ch === '>') inTag = false; else if (!inTag && ch >= '\uE000' && ch < '\uF000') live.push(ch.charCodeAt(0) - 0xE000); } }
    else t.expressions.forEach((_, i) => live.push(i));
    take(t, at, countTokens(t, tokens(s, html)), s.replace(/[\uE000-\uEFFF]/g, '${}'));
    live.forEach(i => visit(t.expressions[i], sc, env, at));
  }
  function visitArray(a, ctx, env, at) {
    const el = ctx.k === 'list' ? ctx.of : ctx.k === 'para' || stringCtx(ctx) ? ctx : null;
    if (!el) return scan(a, env, at);
    for (const x of a.elements) if (x) { if (x.type === 'SpreadElement') visit(x.argument, ctx, env, at); else visit(x, el, env, at); }
    const b = initOf.get(a);
    if (b) for (const s of b.elems) visit(s.expr, s.spread ? ctx : el, env, at);
  }
  function visitObject(o, ctx, env, at) {
    if (ctx.k === 'para') return visitObject(o, PARA_OBJ, env, at);
    if (ctx.k === 'list') return visit(o, ctx.of, env, at);
    if (ctx.k === 'scene') return visitScene(o, env, at);
    if (ctx.k === 'scenes' || ctx.k === 'map') {
      for (const p of o.properties) {
        if (p.type === 'SpreadElement') { visitEntries(p.argument, ctx, env, at); continue; }
        if (ctx.k === 'scenes') visit(p.value, SCENE_CTX, env, { scene: keyName(p) || '(chapter)', bucket: 'text' });
        else visit(p.value, ctx.of, env, at);
      }
      return;
    }
    if (ctx.k !== 'obj') return scan(o, env, at);
    for (const p of o.properties) {
      if (p.type === 'SpreadElement') { visit(p.argument, ctx, env, at); continue; }
      const k = keyName(p), sub = k != null && Object.prototype.hasOwnProperty.call(ctx.fields, k) ? ctx.fields[k] : CODE;
      visit(p.value, sub, env, at);
    }
    const b = initOf.get(o);
    if (b) for (const k in b.props) { const sub = Object.prototype.hasOwnProperty.call(ctx.fields, k) ? ctx.fields[k] : CODE; for (const s of b.props[k]) visit(s.expr, sub, env, at); }
  }
  /* `...Object.fromEntries(ROLES.map(r => ['ch7_bargain_' + r, { ... }]))`: scenes made in a loop. Each
     [key, value] pair is a scene, named by its key with the variable parts as '*'. */
  function visitEntries(e, ctx, env, at) {
    if (e.type !== 'CallExpression' || chain(e.callee) !== 'Object.fromEntries') return visit(e, ctx, env, at);
    const nameOf = (k) => isStr(k) ? k.value : k.type === 'TemplateLiteral' ? k.quasis.map(q => q.value.cooked).join('*')
      : k.type === 'BinaryExpression' && k.operator === '+' ? nameOf(k.left) + nameOf(k.right) : '*';
    for (const c of containers(e.arguments[0], env)) for (const pair of select(c, { all: true })) for (const pc of containersRef(pair)) {
      if (pc.node.type !== 'ArrayExpression' || pc.node.elements.length < 2) continue;
      const [k, v] = pc.node.elements;
      if (ctx.k === 'scenes') visit(v, SCENE_CTX, pc.env, { scene: nameOf(k), bucket: 'text' }); else visit(v, ctx.of, pc.env, at);
    }
  }
  function visitScene(o, env, at) {
    const prop = (k) => o.properties.find(q => q.type === 'Property' && keyName(q) === k);
    const pz = prop('puzzle'), kind = pz && isStr(pz.value) ? pz.value.value : null;
    const t = prop('text'); if (t && t.value.type !== 'ArrayExpression') branchy.add(at.scene);
    for (const p of o.properties) {
      if (p.type === 'SpreadElement') { visit(p.argument, SCENE_CTX, env, at); continue; }
      const k = keyName(p), spec = SCENE[k];
      if (!spec) { visit(p.value, CODE, env, { scene: at.scene, bucket: 'branch' }); continue; }
      const ctx = k === 'config' ? (CONFIG[kind] || CONFIG.any) : spec[1];
      visit(p.value, ctx, env, { scene: at.scene, bucket: k === 'prompt' && !prop('options') ? 'panel' : spec[0] });
    }
  }
  function visitCall(c, ctx, env, at) {
    const callee = c.callee, m = callee.type === 'MemberExpression' ? memberName(callee) : null, recv = m ? callee.object : null;
    const name = chain(callee) || '', owner = name.slice(0, name.lastIndexOf('.')).split('.').pop();
    const sc = stringCtx(ctx);
    if (name === 'Object.assign') { c.arguments.forEach(a => visit(a, ctx, env, at)); return; }
    if (name === 'String' || name === 'Array.from') { visit(c.arguments[0], ctx, env, at); return; }
    if (m && UI_OWNERS.has(owner) && (m === 'rich' || m === 'esc' || m === 'list')) { visit(c.arguments[0], ctx, env, at); return; }
    if (m === 'join') { visit(recv, ctx, env, at); if (sc) visit(c.arguments[0], sc, env, at); return; }
    if (m === 'concat') { visit(recv, ctx, env, at); c.arguments.forEach(a => visit(a, ctx, env, at)); return; }
    if (m === 'map' || m === 'flatMap') {
      const fns = c.arguments[0] ? callable(c.arguments[0], env) : [];
      if (!fns.length) return visit(recv, ctx, env, at);
      fns.forEach(f => { const ne = bindEach(f.node, recv, f.env); guard('map' + f.node.start + ctxId(ctx), () => { returnsOf(f.node).forEach(r => visit(r, m === 'flatMap' ? ctx : elemCtx(ctx), ne, at)); scan(f.node.body, ne, at); }); });
      return;
    }
    if (m === 'find') return visit(recv, LIST(ctx), env, at);
    if (m === 'split') return visit(recv, elemCtx(ctx), env, at);
    if (m === 'replace' || m === 'replaceAll') {
      visit(recv, ctx, env, at);
      /* What goes in is prose too ('{n}' -> '5:00 to spare'), unless it only re-cases the words it replaces. */
      const [pat, rep] = c.arguments, letters = (n) => n && n.type === 'Literal' ? String(n.regex ? n.regex.pattern : n.value).replace(/[^A-Za-z]/g, '').toLowerCase() : null;
      const markup = pat && pat.type === 'Literal' && /[<>="]/.test(String(pat.regex ? pat.regex.pattern : pat.value));
      if (rep && !markup && !(isStr(rep) && letters(pat) === letters(rep))) visit(rep, ctx, env, at);
      return;
    }
    if (m && ['filter', 'slice', 'reverse', 'sort', 'flat', 'trim', 'toUpperCase', 'toLowerCase', 'charAt', 'substring', 'substr', 'padStart', 'padEnd', 'repeat', 'toString', 'normalize', 'trimStart', 'trimEnd'].includes(m)) { visit(recv, ctx, env, at); return; }
    /* A local helper: its return value is this value, and what it writes on the way is prose too. */
    for (const f of callable(callee, env)) {
      const ne = bind(f.node, c.arguments, env);
      guard('call' + f.node.start + ctxId(ctx) + at.scene, () => { returnsOf(f.node).forEach(r => visit(r, ctx, ne, at)); scan(f.node.body, ne, at); });
    }
  }

  /* ---- scan: walk code for the places it writes to the screen ---- */
  const scanning = new Set();
  function scan(n, env, at) {
    if (!n) return;
    if (n.type === 'CallExpression') {
      const callee = n.callee, m = callee.type === 'MemberExpression' ? memberName(callee) : null, name = chain(callee) || '';
      const owner = name.slice(0, name.lastIndexOf('.')).split('.').pop();   // UI.el, api.say, api.ui.el, window.VigilUI.toast
      /* engine and UI calls */
      if (m && UI_SINKS[m] && UI_OWNERS.has(owner)) UI_SINKS[m].forEach((ctx, i) => { if (ctx && n.arguments[i]) visit(n.arguments[i], ctx, env, at); });
      if (name === 'document.createTextNode') visit(n.arguments[0], PROSE, env, at);
      if (m === 'insertAdjacentHTML') visit(n.arguments[1], HTML, env, at);
      /* widgets built by hand inside a custom scene */
      if (BUILDERS[owner] && m === 'build') visit(n.arguments[BUILDERS[owner] === 'reaction' ? 0 : 1], CONFIG[BUILDERS[owner]], env, at);
      if (owner === 'VigilRing' && m === 'fourHands') visit(n.arguments[1], PROSE, env, at);
      /* a callback over an array: its parameter is each element */
      if (m && ['forEach', 'map', 'filter', 'some', 'every', 'find', 'findIndex', 'flatMap'].includes(m) && n.arguments[0] && isFn(n.arguments[0])) {
        scan(callee, env, at);
        const cb = n.arguments[0], ne = bindEach(cb, callee.object, env);
        cb.params.forEach(pp => scan(pp, ne, at));
        scan(cb.body, ne, at);
        n.arguments.slice(1).forEach(a => scan(a, env, at));
        return;
      }
      /* a local helper: walk its body with these arguments */
      for (const f of callable(callee, env)) {
        if (scanning.has(f.node)) continue;
        scanning.add(f.node);
        try { scan(f.node.body, bind(f.node, n.arguments, env), at); } finally { scanning.delete(f.node); }
      }
    }
    if (n.type === 'AssignmentExpression' && n.left.type === 'MemberExpression') {
      const k = memberName(n.left);
      if (DOM_PROPS[k]) visit(n.right, DOM_PROPS[k], env, at);
      /* Game.scenes.X.key = value, or a local holding Game.scenes.X */
      const sceneId = sceneRef(n.left.object);
      if (sceneId && SCENE[k]) visit(n.right, k === 'config' ? CONFIG.any : SCENE[k][1], env, { scene: sceneId, bucket: SCENE[k][0] });
    }
    for (const ch of children(n)) scan(ch, env, at);
  }
  function sceneRef(e) {
    if (e.type === 'MemberExpression' && !e.computed && chain(e.object) === 'Game.scenes') return e.property.name;
    if (e.type === 'Identifier') { const b = S.refOf.get(e); if (b && b.kind === 'decl' && b.init && !b.path.length) return sceneRef(b.init); }
    return null;
  }

  /* Walk from the chapter, then sweep the whole file for screen writes nothing reached. */
  (function roots(n) {
    if (n.type === 'CallExpression' && /(^|\.)Game\.addChapter$/.test(chain(n.callee) || '')) visit(n.arguments[0], CHAPTER, ENV0, { scene: '(chapter)', bucket: 'panel' });
    for (const c of children(n)) roots(c);
  })(ast);
  sweeping = true;
  scan(ast, ENV0, { scene: '(chapter)', bucket: 'branch' });

  const rows = [...units.entries()].map(([node, u]) => ({ node, words: u.words, text: u.text, line: u.line, seen: u.seen }));
  rows.branchy = branchy;
  /* For --missed: string literals with two or more words that nothing counted. */
  rows.missed = () => {
    const out = [];
    (function walk(n) {
      if ((isStr(n) || n.type === 'TemplateLiteral') && !units.has(n)) {
        const text = isStr(n) ? n.value : n.quasis.map(q => q.value.cooked).join('${}');
        if (tokens(text, false).filter(isWord).length >= 2) out.push({ line: lineOf(n.start), text, where: suppressed.has(n) ? 'speaker (a repeat)' : whereOf(n) });
      }
      for (const c of children(n)) walk(c);
    })(ast);
    return out;
  };
  const whereOf = (n) => {
    for (let q = S.parent.get(n), prev = n; q; prev = q, q = S.parent.get(q)) {
      if (q.type === 'Property' && q.value === prev) return keyName(q) + ':';
      if (q.type === 'CallExpression') return (chain(q.callee) || '(call)') + '()';
      if (q.type === 'AssignmentExpression') return (q.left.type === 'MemberExpression' ? '.' + memberName(q.left) : chain(q.left)) + ' =';
      if (q.type === 'VariableDeclarator') return 'const ' + (q.id.name || '{}');
      if (q.type === 'BinaryExpression' && q.operator !== '+') return 'compared';
    }
    return '';
  };
  return rows;
}

/* Totals: the chapter counts each literal once; a scene counts each literal it reaches once, in the
   bucket it first reached it by. */
function summarize(rows) {
  const per = {}, split = {};
  let total = 0;
  for (const r of rows) {
    total += r.words;
    for (const [scene, bucket] of r.seen) {
      per[scene] = (per[scene] || 0) + r.words;
      (split[scene] = split[scene] || {})[bucket] = (split[scene][bucket] || 0) + r.words;
    }
  }
  return { total, per, split };
}
function countChapter(file) { const rows = analyze(fs.readFileSync(file, 'utf8')); return Object.assign(summarize(rows), { rows }); }

module.exports = { analyze, summarize, countChapter, tokens, DRAFT_LIMIT, ACCEPT_CEILING };

if (require.main === module) {
  const argv = process.argv.slice(2);
  const ri = argv.indexOf('--root');
  const root = ri >= 0 ? path.resolve(argv[ri + 1]) : path.join(__dirname, '..');
  const arg = argv.find(a => /^ch\d$/.test(a));
  const chapters = arg ? [arg] : [0, 1, 2, 3, 4, 5, 6, 7, 8].map(n => 'ch' + n);
  const detail = chapters.length === 1;
  let grand = 0;
  const BUCKETS = ['text', 'solved', 'choices', 'rules', 'panel', 'branch', 'hints', 'button'];
  for (const id of chapters) {
    const f = path.join(root, 'js/content', id + '.js');
    if (!fs.existsSync(f)) continue;
    const { rows, total, per, split } = countChapter(f);
    grand += total;
    const status = total > ACCEPT_CEILING ? `  OVER THE ${ACCEPT_CEILING.toLocaleString('en-US')} ACCEPTANCE CEILING`
      : total > DRAFT_LIMIT ? `  over the ${DRAFT_LIMIT.toLocaleString('en-US')} drafting limit` : '';
    console.log(`${id}\t${total} words\t${Object.keys(per).filter(s => s !== '(chapter)').length} scenes${status}`);
    if (argv.includes('--dump')) rows.slice().sort((a, b) => a.line - b.line).forEach(r => console.log(`   ${String(r.line).padStart(4)} [${[...r.seen].map(([s, b]) => s + '/' + b).join(', ')}] ${r.words}w  ${r.text.replace(/\s+/g, ' ').slice(0, 100)}`));
    if (argv.includes('--missed')) rows.missed().forEach(m => console.log(`   ${String(m.line).padStart(4)} ${m.where.padEnd(24)} ${m.text.replace(/\s+/g, ' ').slice(0, 100)}`));
    if (detail && !argv.includes('--dump') && !argv.includes('--missed')) {
      const list = Object.entries(per);
      if (!argv.includes('--all')) list.sort((a, b) => b[1] - a[1]);
      for (const [s, w] of list) {
        const b = split[s] || {};
        const parts = BUCKETS.filter(k => b[k]).map(k => `${k} ${b[k]}`).join(' · ');
        // The cap is on what a player sees at once. Only `text` is that; the rest is other branches and other moments.
        const over = (b.text || 0) > 150
          ? (rows.branchy.has(s) ? '   text is every branch summed — check the worst one by hand' : '   TEXT OVER THE 150-WORD CAP')
          : w > 150 ? '   (sum only — see the split)' : '';
        console.log(`   ${String(w).padStart(4)}  ${s.padEnd(18)} ${parts}${over}`);
      }
      const shared = Object.values(per).reduce((a, n) => a + n, 0) - total;
      if (shared > 0) console.log(`   (${shared} words are reached from more than one scene: in each scene's line, once in the total)`);
    }
  }
  if (!detail) console.log(`\n${grand} words of Hearth prose in the whole game. Drafting limit ${DRAFT_LIMIT.toLocaleString('en-US')} a chapter; acceptance ceiling ${ACCEPT_CEILING.toLocaleString('en-US')} (docs/STYLE.md R1.5).`);
}
