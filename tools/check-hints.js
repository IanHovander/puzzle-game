/* THE LAST RUNG MUST BE AN ANSWER THE PUZZLE ACCEPTS.
   node tools/check-hints.js            every ladder, with the board it parsed
   node tools/check-hints.js ch4        one chapter
   node tools/check-hints.js --quiet    only the failures

   The engine labels the last rung of every ladder "Reveal the answer (last resort)" and prints it under
   the heading "Answer" (js/core/engine.js:326). Until this tool existed nothing in the project compared
   that string to the answer the puzzle's own check()/accept() takes. It was hand-written in fourteen of
   seventeen ladders, and two of the fourteen had already drifted -- one of them on a maxTries:1 ring,
   where a table that spends its last resort and types exactly what the fire tells it loses the oath for
   the rest of the night.

   WHY A SEPARATE TOOL, AND WHY check-content.js STILL RUNS IT. check-content.js is a structural pass:
   it never calls a puzzle's predicate, and it must stay cheap and total. This check does the opposite --
   it builds boards, calls the shipped check() with the Store swapped out from under it, and enumerates
   branch states per scene. That is a different body of code with a different failure mode, so it lives
   in its own file. But a gate nobody runs is not a gate (ADVERSARIAL #17), and the process tells authors
   to run check-content.js -- so check-content.js requires this module and folds its failures in. Both
   entry points give the same verdict; only the detail differs.

   WHAT IT DOES. For each scene with a `hints` array: work out which flags the scene's config and its
   last rung actually read, enumerate the states those flags can take, and at each state evaluate BOTH
   the config and the rung (either may be a function of state). Parse the rung into the shape the widget
   resolves -- a slot->word map, an ordered sequence, a list of turns, a set of seats, a tuple of typed
   values -- and put it through the shipped predicate. A rung passes only when the predicate returns
   true at every state. Where a rung offers alternatives ("KNOT or EMBER") every alternative must be
   accepted: the fire is promising both.

   Store.state is swapped for the probe state around every predicate call and restored afterwards, so a
   check() that writes a frost flag or spends a try leaves nothing behind. */
const path = require('path'), fs = require('fs');
const { root, loadHearth, blankState } = require('./lib-content.js');

/* ---------- probe states -------------------------------------------------------------------------
   A rung and its config may both branch on the save (ch3's grid on WREN_HURT, ch5's second gate on the
   older Law, ch7's sigil on the oath and the walk). Guessing a fixed probe list would be the same
   accident that let the drift in, so the flags are read out of the code that will be run: the source of
   the scene's config and of the rung, plus -- one and two levels down -- the source of any same-file
   helper they name. */
const LF = require('./lib-flags.js');
const chapterSrc = {};
function srcOf(chId) {
  if (!(chId in chapterSrc)) {
    const f = path.join(root, 'js/content/' + chId + '.js');
    chapterSrc[chId] = fs.existsSync(f) ? fs.readFileSync(f, 'utf8') : '';
  }
  return chapterSrc[chId];
}
/* the text of `const NAME = <expr>;` in a chapter file, up to the line that closes it */
function helperSrc(src, name) {
  const re = new RegExp('\\bconst\\s+' + name + '\\s*=', 'g');
  const m = re.exec(src);
  if (!m) return '';
  let i = m.index, depth = 0, out = '';
  for (; i < src.length && i < m.index + 4000; i++) {
    const c = src[i]; out += c;
    if ('([{'.includes(c)) depth++;
    else if (')]}'.includes(c)) depth--;
    else if ((c === ';' || c === '\n') && depth <= 0 && out.length > name.length + 8) break;
  }
  return out;
}
/* The read shapes come from tools/lib-flags.js, resolved against the chapter's own aliases. Reading
   only the literal `flags.X` here would have missed ch5's `law0(s)` -- which is `F(s).LAW0 ||
   F(s).LETTER_READ || ...` -- and the second gate's two branches would never have been probed apart.
   That is the same blindness this pass is fixing in flag-map, arriving from the other direction. */
function flagsIn(text, fileSrc) {
  const out = new Set();
  const P = LF.patterns(fileSrc || text);
  for (const re of [...P.reads, ...P.writes]) { let m; re.lastIndex = 0; while ((m = re.exec(text))) out.add(m[1]); }
  return out;
}
function probeFlags(scene, chId) {
  const src = srcOf(chId);
  let text = [scene.config, scene.run, ...(scene.hints || [])].map(x => typeof x === 'function' ? String(x) : String(x || '')).join('\n');
  for (let depth = 0; depth < 2; depth++) {
    const names = new Set((text.match(/\b[A-Za-z_$][A-Za-z0-9_$]*\b/g) || []));
    let add = '';
    for (const n of names) if (n.length > 2 && !/^(const|return|function|true|false|null|this|typeof|filter|every|some|map|join|slice|length|flags|Store|window|document)$/.test(n)) add += helperSrc(src, n) + '\n';
    if (!add.trim()) break;
    text += '\n' + add;
  }
  return [...flagsIn(text, src)].filter(f => !f.endsWith('_')).sort();
}
/* values worth trying for a flag: falsy, truthy, and any literal the code compares it against */
function valuesFor(flag, text) {
  const vals = [false, true];
  const re = new RegExp('\\b' + flag + '\\b\\s*[=!]==?\\s*(-?\\d+|\'[^\']*\')', 'g');
  let m; while ((m = re.exec(text))) { const v = m[1][0] === "'" ? m[1].slice(1, -1) : +m[1]; if (!vals.includes(v)) vals.push(v); }
  return vals;
}
const MAX_PROBES = 512;
function probeStates(scene, chId) {
  const flags = probeFlags(scene, chId);
  const src = srcOf(chId);
  const domains = flags.map(f => valuesFor(f, src));
  let total = domains.reduce((a, d) => a * d.length, 1);
  const states = [];
  if (!flags.length) { const s = blankState(); s.__label = 'blank'; return [s]; }
  if (total <= MAX_PROBES) {
    const rec = (i, acc) => {
      if (i === flags.length) { const s = blankState(); Object.assign(s.flags, acc); s.__label = label(acc); states.push(s); return; }
      for (const v of domains[i]) rec(i + 1, Object.assign({}, acc, { [flags[i]]: v }));
    };
    rec(0, {});
  } else {
    /* too wide to enumerate: blank, each flag alone at each of its values, and everything on at once */
    const s0 = blankState(); s0.__label = 'blank'; states.push(s0);
    flags.forEach((f, i) => domains[i].forEach(v => { if (v === false) return; const s = blankState(); s.flags[f] = v; s.__label = label({ [f]: v }); states.push(s); }));
    const all = blankState(); flags.forEach((f, i) => { all.flags[f] = domains[i][domains[i].length - 1]; }); all.__label = 'all set'; states.push(all);
  }
  return states;
}
const label = (acc) => { const on = Object.keys(acc).filter(k => acc[k] !== false && acc[k] !== 0); return on.length ? on.map(k => k + '=' + acc[k]).join(' ') : 'blank'; };

/* ---------- the rung, tokenised -------------------------------------------------------------------
   Boundaries matter: "Slot 1 KNOT, 2 CROWN" only reads correctly if the comma stops the search, and
   "The lock goes in slot 3: KNOT or EMBER" only reads correctly if the colon does not. */
const BOUND = new Set([',', '.', ';', '!', '?']);
function tokenise(rung, glyphIds) {
  const ids = new Set(glyphIds);
  const raw = String(rung).replace(/\*\*/g, '').replace(/[*_`]/g, '').match(/[A-Za-z][A-Za-z']*|\d+|[,.;:!?]/g) || [];
  return raw.map(t => {
    if (BOUND.has(t)) return { k: 'B', v: t };
    if (/^\d+$/.test(t)) return { k: 'N', v: +t };
    const up = t.toUpperCase();
    if (ids.has(up)) return { k: 'G', v: up };
    if (up === 'EMPTY' || up === 'BLANK') return { k: 'E', v: null };
    if (up === 'OR') return { k: 'OR', v: 'or' };
    return { k: 'F', v: up };
  });
}
/* nearest number to a word token, searching outwards but never across another word or a full stop */
function bindNumber(tok, i, lo, hi) {
  let right = null, left = null;
  for (let j = i + 1; j < tok.length; j++) { const t = tok[j]; if (t.k === 'B' || t.k === 'G' || t.k === 'E') break; if (t.k === 'N' && t.v >= lo && t.v <= hi) { right = { n: t.v, d: j - i }; break; } }
  for (let j = i - 1; j >= 0; j--) { const t = tok[j]; if (t.k === 'B' || t.k === 'G' || t.k === 'E') break; if (t.k === 'N' && t.v >= lo && t.v <= hi) { left = { n: t.v, d: i - j }; break; } }
  if (right && left) return { n: right.d <= left.d ? right.n : left.n, ambiguous: right.d === left.d && right.n !== left.n };
  if (right) return { n: right.n, ambiguous: false };
  if (left) return { n: left.n, ambiguous: false };
  return null;
}
/* slot -> [word, ...alternatives]; explicit "empty" claims every unclaimed number in its sentence */
function parseSlots(rung, glyphIds, nSlots) {
  const tok = tokenise(rung, glyphIds);
  const slots = {}, notes = [], order = [];
  for (let i = 0; i < tok.length; i++) {
    const t = tok[i];
    if (t.k !== 'G' && t.k !== 'E') continue;
    /* "X or Y" -- Y is another word for the slot X just took */
    if (t.k === 'G' && i > 0 && tok[i - 1].k === 'OR' && order.length) { slots[order[order.length - 1]].push(t.v); continue; }
    const b = bindNumber(tok, i, 1, nSlots);
    if (!b) {
      if (t.k === 'E') {   // "Slots 2 and 4 stay empty"
        let s = i; while (s > 0 && tok[s - 1].k !== 'B') s--;
        let e = i; while (e < tok.length && tok[e].k !== 'B') e++;
        for (let j = s; j < e; j++) if (tok[j].k === 'N' && tok[j].v >= 1 && tok[j].v <= nSlots && !slots[tok[j].v]) slots[tok[j].v] = [null];
        continue;
      }
      notes.push(`the word ${t.v} names no slot`); continue;
    }
    if (b.ambiguous) notes.push(`${t.k === 'E' ? 'empty' : t.v} sits between two slot numbers -- reword it`);
    if (slots[b.n] && slots[b.n][0] !== (t.k === 'E' ? null : t.v)) notes.push(`slot ${b.n} is given twice`);
    slots[b.n] = [t.k === 'E' ? null : t.v]; order.push(b.n);
  }
  return { slots, notes, order, tok };
}
/* every combination the rung's alternatives allow: the fire promised all of them */
function boards(slots, nSlots) {
  const keys = Object.keys(slots).map(Number);
  let out = [{}];
  for (const k of keys) {
    const next = [];
    for (const b of out) for (const w of slots[k]) next.push(Object.assign({}, b, { [k]: w }));
    out = next;
    if (out.length > 64) break;
  }
  return out.map(b => { const m = {}; for (let i = 1; i <= nSlots; i++) m[i] = b[i] === undefined ? null : b[i]; return m; });
}

/* ---------- calling the shipped predicate ---------------------------------------------------------
   A check() may write a flag (ch5's frost), spend a try, or charge the Finale clock. Swap the whole
   save under it and put the old one back, so probing costs the game nothing. */
function withState(Store, state, fn) {
  const keep = Store.state;
  Store.state = state;
  try { return fn(); } finally { Store.state = keep; }
}
const glyphIdsOf = (cfg) => (cfg.glyphs || cfg.slots || []).map(g => g && g.id).filter(Boolean);

/* ring.js:96-97 -- with no check(), a ring is right when every slot equals cfg.answer (absent = empty) */
const ringDefault = (cfg, m) => { for (let i = 1; i <= cfg.slots; i++) { const want = cfg.answer[i] === undefined ? null : cfg.answer[i]; if ((m[i] || null) !== want) return false; } return true; };
/* wheel.js:66 -- with no check(), the sequence of ids must equal cfg.answer exactly */
const wheelDefault = (cfg, ids) => JSON.stringify(ids) === JSON.stringify(cfg.answer);
/* dialseq.js:50 -- with no check(), the turns must equal cfg.answer, dial and glyph, in order */
const dialseqDefault = (cfg, turns) => turns.length === cfg.answer.length && turns.every((t, k) => t.dial === cfg.answer[k].dial && t.glyph === cfg.answer[k].glyph);
/* dials.js:34 -- with no check(), the chosen option ids must equal cfg.answer */
const dialsDefault = (cfg, ids) => JSON.stringify(ids) === JSON.stringify(cfg.answer);

/* ---------- near misses: does the predicate have the power to fail? ------------------------------
   A rung that the predicate accepts proves nothing if the predicate accepts everything near it. The
   drift class this whole tool exists for is a rung whose PIECES are right and whose PLACES are wrong,
   so the neighbourhood is exactly that: the same answer rotated, the same answer with two positions
   swapped, and the same answer with one word replaced. If every one of those is accepted too, the
   ladder is reported UNPROVEN -- ch2's door is the live example, because its check() opens for any
   whole count and the "did it count YOU" test lives in judge(), which the widget never calls. */
function ringNeighbours(cfg, m) {
  const n = cfg.slots, base = []; for (let i = 1; i <= n; i++) base.push(m[i] || null);
  const out = [], seen = new Set([base.join('|')]);
  const push = (arr) => { const k = arr.join('|'); if (seen.has(k)) return; seen.add(k); const b = {}; arr.forEach((w, i) => { b[i + 1] = w; }); out.push(b); };
  for (let k = 1; k < n; k++) push(base.map((_, i) => base[((i - k) % n + n) % n]));            // rotated
  for (let i = 0; i < n; i++) for (let j = i + 1; j < n; j++) { const a = base.slice(); const t = a[i]; a[i] = a[j]; a[j] = t; push(a); }   // two places swapped
  const pal = glyphIdsOf(cfg);
  for (let i = 0; i < n; i++) for (const g of pal) { const a = base.slice(); a[i] = g; push(a); }  // one word replaced
  return out;
}
const seqNeighbours = (seq) => {
  const out = [], seen = new Set([seq.join('|')]);
  const push = (a) => { const k = a.join('|'); if (seen.has(k)) return; seen.add(k); out.push(a); };
  for (let k = 1; k < seq.length; k++) push(seq.map((_, i) => seq[(i + k) % seq.length]));
  for (let i = 0; i < seq.length; i++) for (let j = i + 1; j < seq.length; j++) { const a = seq.slice(); const t = a[i]; a[i] = a[j]; a[j] = t; push(a); }
  return out;
};
/* When check() cannot fail, the real verdict is usually somewhere else: ch2's door opens for any whole
   count and then onSolve asks judge() whether it counted YOU, which decides CH2_DOOR and the whole
   solved scene. So for an unproven ladder, run the scene's own onSolve on the rung's answer and print
   the story state it writes. The tool cannot know which branch is the good one; it can put the branch
   the fire's answer lands on in front of a reader, which is all that was missing. */
function storyOutcome(Store, scene, st, result) {
  if (typeof scene.onSolve !== 'function') return null;
  const before = JSON.stringify({ c: st.choices, f: st.flags, l: st.log });
  let out = null;
  withState(Store, st, () => { try { scene.onSolve(st, result); } catch (e) { out = 'onSolve threw: ' + e.message; } });
  if (out) return out;
  const bits = [];
  for (const k in st.choices) bits.push(k + '=' + st.choices[k]);
  for (const n of (st.log || [])) bits.push('note: ' + (typeof n === 'string' ? n : JSON.stringify(n)));
  return before === JSON.stringify({ c: st.choices, f: st.flags, l: st.log }) ? 'onSolve writes nothing' : bits.join(' | ');
}
function discriminate(res, list, accept, outcomeOf) {
  if (!list.length) return;
  let taken = 0;
  for (const x of list) { let ok = false; try { ok = accept(x) === true; } catch (e) { ok = false; } if (ok) taken++; }
  res.near = { taken, of: list.length };
  if (taken !== list.length) return;
  /* check() opens for everything nearby. Before calling the ladder unguarded, ask whether the SCENE
     can tell -- onSolve is where ch2's door decides whether it counted you. */
  if (outcomeOf) {
    const mine = outcomeOf(null);
    const differ = list.map(outcomeOf).filter(o => o !== mine).length;
    res.outcome = mine;
    if (differ) { res.story = { differ, of: list.length }; return; }
  }
  res.unproven = true;
  res.why = `the predicate accepts all ${list.length} near misses of this rung (every rotation, every swapped pair, every single-word substitution)`
    + (outcomeOf ? ', and onSolve writes the same story state for all of them -- passing here proves nothing about the rung' : ' -- passing here proves nothing about the rung');
}

const describe = (m, n) => { const p = []; for (let i = 1; i <= n; i++) p.push(i + ':' + (m[i] || '-')); return p.join(' '); };

/* ---------- one ladder ---------------------------------------------------------------------------- */
function checkScene(G, Store, id, scene, chId) {
  const rungIdx = scene.hints.length - 1;
  const res = { id, chId, kind: scene.puzzle || scene.type, covered: true, fails: [], notes: [], boardsSeen: new Set(), states: 0, why: '' };
  const states = probeStates(scene, chId);
  for (const st of states) {
    let cfg, rung;
    try { cfg = typeof scene.config === 'function' ? scene.config(st) : (scene.config || {}); }
    catch (e) { res.notes.push(`config throws at [${st.__label}]: ${e.message}`); continue; }
    try { rung = typeof scene.hints[rungIdx] === 'function' ? scene.hints[rungIdx](st) : scene.hints[rungIdx]; }
    catch (e) { res.notes.push(`last rung throws at [${st.__label}]: ${e.message}`); continue; }
    if (typeof rung !== 'string') { res.fails.push(`[${st.__label}] the last rung is not a string`); continue; }
    res.states++;
    const verdicts = verify(G, Store, scene, cfg, rung, st, res);
    for (const v of verdicts) {
      res.boardsSeen.add(v.board);
      /* one line per distinct refusal, not one per probe state: a rung that is wrong at every state is
         one defect, and printing it sixteen times buries the next one */
      if (!v.ok) { const key = `${v.board}  ->  ${v.msg}`; if (!res.seen) res.seen = new Map(); if (res.seen.has(key)) { res.seen.get(key).push(st.__label); continue; } res.seen.set(key, [st.__label]); res.fails.push(key); }
    }
  }
  return res;
}

function verify(G, Store, scene, cfg, rung, st, res) {
  const kind = scene.puzzle || scene.type;
  const out = [];
  const run = (fn) => withState(Store, st, fn);

  if (kind === 'ring') {
    const n = cfg.slots;
    const { slots, notes } = parseSlots(rung, glyphIdsOf(cfg), n);
    notes.forEach(x => res.notes.push(x));
    const list = boards(slots, n);
    if (!Object.keys(slots).length) { res.covered = false; res.why = 'the last rung names no slot/word pair this tool can read'; return out; }
    if (cfg.allowEmpty === false) for (let i = 1; i <= n; i++) if (!slots[i]) res.notes.push(`slot ${i} is unnamed and the ring does not allow empties`);
    if (!cfg.allowRepeat) { for (const m of list) { const w = Object.values(m).filter(Boolean); if (new Set(w).size !== w.length) res.notes.push('the rung repeats a word and the palette forbids repeats'); } }
    for (const m of list) {
      const r = run(() => (cfg.check ? cfg.check(m) : ringDefault(cfg, m)));
      out.push({ ok: r === true, board: describe(m, n), msg: r === true ? 'accepted' : (typeof r === 'string' ? 'refused: ' + r : 'refused') });
    }
    if (out.some(v => v.ok)) discriminate(res, ringNeighbours(cfg, list[0]), (b) => run(() => { const c2 = typeof scene.config === 'function' ? scene.config(st) : cfg; return c2.check ? c2.check(b) : ringDefault(c2, b); }),
      (b) => storyOutcome(Store, scene, blankState(), { map: b || list[0], tries: 1 }));
    return out;
  }

  if (kind === 'wheel') {
    const ids = (cfg.slots || []).map(s => s.id);
    const tok = tokenise(rung, []);
    const seq = tok.filter(t => t.k === 'N' && ids.includes(String(t.v))).map(t => String(t.v));
    if (!seq.length) { res.covered = false; res.why = 'the last rung names no slot ids'; return out; }
    if (cfg.maxLen && seq.length > cfg.maxLen) res.notes.push(`the rung names ${seq.length} picks and the ward holds ${cfg.maxLen}`);
    const r = run(() => (cfg.check ? cfg.check(seq) : wheelDefault(cfg, seq)));
    out.push({ ok: r === true, board: seq.join(','), msg: r === true ? 'accepted' : 'refused (wanted ' + JSON.stringify(cfg.answer) + ')' });
    if (r === true) discriminate(res, seqNeighbours(seq), (a) => run(() => (cfg.check ? cfg.check(a) : wheelDefault(cfg, a))),
      (a) => storyOutcome(Store, scene, blankState(), { seq: a || seq, tries: 1 }));
    return out;
  }

  if (kind === 'dialseq') {
    const dialIds = (cfg.dials || []).map(d => d.id);
    const glyphIds = glyphIdsOf(cfg);
    const tok = tokenise(rung, glyphIds);
    const turns = [];
    for (let i = 0; i < tok.length; i++) {
      if (tok[i].k !== 'G') continue;
      const b = bindNumber(tok, i, 1, dialIds.length);
      if (b == null) { res.notes.push(`the word ${tok[i].v} names no dial`); continue; }
      turns.push({ dial: String(b.n), glyph: tok[i].v });
    }
    if (!turns.length) { res.covered = false; res.why = 'the last rung names no dial/word turns'; return out; }
    if (cfg.maxTurns && turns.length > cfg.maxTurns) res.notes.push(`the rung asks for ${turns.length} turns and the door counts ${cfg.maxTurns}`);
    const r = run(() => (cfg.check ? cfg.check(turns.slice()) : dialseqDefault(cfg, turns)));
    out.push({ ok: r === true, board: turns.map(t => t.dial + '->' + t.glyph).join(' '), msg: r === true ? 'accepted' : (typeof r === 'string' ? 'refused: ' + r : 'refused') });
    if (r === true) {
      /* the same four turns in another order, and the same four glyphs on other dials */
      const near = seqNeighbours(turns.map((t, i) => i)).map(ix => ix.map(i => turns[i]))
        .concat(seqNeighbours(turns.map(t => t.glyph)).map(gs => turns.map((t, i) => ({ dial: t.dial, glyph: gs[i] }))));
      discriminate(res, near, (ts) => run(() => (cfg.check ? cfg.check(ts.slice()) : dialseqDefault(cfg, ts))),
        (ts) => storyOutcome(Store, scene, blankState(), { turns: (ts || turns).slice(), tries: 1 }));
    }
    return out;
  }

  if (kind === 'dials') {
    const tok = tokenise(rung, (cfg.dials || []).flatMap(d => d.options.map(o => o.id)));
    const ids = tok.filter(t => t.k === 'G').map(t => t.v);
    if (ids.length !== (cfg.dials || []).length) { res.covered = false; res.why = 'the last rung names ' + ids.length + ' of ' + (cfg.dials || []).length + ' dial settings'; return out; }
    const r = run(() => (cfg.check ? cfg.check(ids) : dialsDefault(cfg, ids)));
    out.push({ ok: !!r, board: ids.join(','), msg: r ? 'accepted' : 'refused' });
    return out;
  }

  if (kind === 'seats') {
    /* the answer is stated in the rung's first sentence; the rest is the argument for it */
    const first = String(rung).split(/[.!?]/)[0];
    const nums = [...new Set((first.match(/\d+/g) || []).map(Number))];
    const pick = nums.length && nums.length <= (cfg.max || 2) ? nums : [...new Set((String(rung).match(/\d+/g) || []).map(Number))].slice(0, cfg.max || 2);
    const sel = pick.map(n => { const s = (cfg.seats || []).find(x => (x.n != null ? x.n : null) === n || x.id === String(n)); return s && s.id; }).filter(Boolean);
    if (sel.length !== pick.length) { res.covered = false; res.why = 'the last rung names a seat that is not on the table'; return out; }
    if (!sel.length) { res.covered = false; res.why = 'the last rung names no seats'; return out; }
    for (const n of pick) { const s = (cfg.seats || []).find(x => x.n === n); if (s && s.locked) res.notes.push(`seat ${n} is locked and cannot be approached`); }
    const r = run(() => cfg.check(sel.slice()));
    out.push({ ok: !!(r && r.ok), board: 'seats ' + pick.join('+'), msg: (r && r.ok) ? 'accepted' : 'refused: ' + ((r && r.text) || 'no reason given') });
    if (r && r.ok) {
      const open = (cfg.seats || []).filter(x => !x.locked).map(x => x.id), near = [];
      for (let i = 0; i < open.length; i++) for (let j = i + 1; j < open.length; j++) { const c = [open[i], open[j]]; if (c.join('|') !== sel.join('|')) near.push(c); }
      discriminate(res, near, (c) => { const v = run(() => cfg.check(c.slice())); return !!(v && v.ok); });
    }
    return out;
  }

  if (kind === 'answer') {
    const fields = cfg.fields || [{}];
    const bold = [...String(scene.hints[scene.hints.length - 1]).matchAll(/\*\*([^*]+)\*\*/g)].map(m => m[1]);
    let vals = null;
    if (bold.length >= fields.length) vals = bold.slice(0, fields.length);
    if (!vals) { const cand = candidates(rung); vals = firstAccepted(G, cfg, fields.length, cand, run); }
    if (!vals) { res.covered = false; res.why = 'the last rung offers no candidate the accept() takes'; out.push({ ok: false, board: '(no candidate)', msg: 'nothing in the rung is accepted' }); return out; }
    const norm = G.__norm;
    const values = vals.map(v => cfg.normalize ? cfg.normalize(v) : norm(v));
    const r = run(() => acceptOf(cfg, norm)(values, vals));
    out.push({ ok: !!r, board: values.join(' | '), msg: r ? 'accepted' : 'refused' });
    if (r) discriminate(res, seqNeighbours(values.join('').split('')).map(ch => [ch.join('')]).filter(x => x[0] !== values.join('')),
      (vv) => { const v = run(() => acceptOf(cfg, norm)(vv, vv)); return v === true || v === true; });
    return out;
  }

  if (kind === 'grid') {
    /* Not fully covered on purpose. A route is only right against the patrol timetables, the doors and
       the rest rule, and modelling those here would be a second copy of grid.js -- which is exactly the
       defect tools/scripts/ch3-grid-check.js already shipped (it bounces a spotted Wren to cfg.safe[0],
       grid.js bounces her to the last safe cell entered). What is checkable without a second model is
       that every cell and turn the rung names still exists on the board the chapter ships. */
    res.covered = false;
    res.why = 'route puzzle: cells and turn numbers are checked, the route itself is not (see the note in check-hints.js)';
    const cells = [...new Set((String(rung).match(/\b[A-E]\d\b/g) || []))];
    for (const c of cells) if (!(cfg.cells || []).includes(c)) out.push({ ok: false, board: c, msg: 'the rung names cell ' + c + ', which is not an open cell' });
    const turns = (String(rung).match(/turns? (\d+)/g) || []).map(x => +x.replace(/\D/g, ''));
    for (const t of turns) if (cfg.maxTurns && t > cfg.maxTurns) out.push({ ok: false, board: 'turn ' + t, msg: 'the rung names turn ' + t + ' and the bell rings at ' + cfg.maxTurns });
    if (cfg.goal && !cells.includes(cfg.goal) && !/door/i.test(rung)) out.push({ ok: false, board: 'goal', msg: 'the rung never reaches the goal cell ' + cfg.goal });
    return out;
  }

  if (kind === 'reaction') {
    res.covered = false;
    res.why = 'a timing performance: there is no board and no predicate, so the last rung is coaching, not an answer';
    return out;
  }

  if (kind === 'custom') {
    /* A custom scene has no cfg, but ch4's study builds four typed answers inside run(). Pull every
       accept: out of the function's source and require that something in the last rung satisfies each
       one -- the rung promises the room every corner. */
    const accepts = extractAccepts(String(scene.run || ''));
    if (!accepts.length) { res.covered = false; res.why = 'a custom widget with no accept() to test against'; return out; }
    const cand = candidates(rung);
    for (const a of accepts) {
      if (a.unevaluable) { res.covered = false; res.why = a.label + ' ' + a.why; res.notes.push(a.label + ' ' + a.why); continue; }
      let hit; try { hit = firstAccepted(G, a.cfg, a.arity, cand, run); }
      catch (e) {
        if (!e.unevaluable) throw e;
        res.covered = false;
        res.why = a.label + ' could not be evaluated outside its file (' + e.message + ') -- it closes over something in the chapter, so this corner is NOT covered';
        res.notes.push(res.why); continue;
      }
      out.push({ ok: !!hit, board: a.label, msg: hit ? 'accepted: ' + hit.join(' | ') : 'nothing in the last rung is accepted by this corner' });
    }
    return out;
  }

  res.covered = false;
  res.why = 'puzzle type "' + kind + '" has no answer shape this tool knows';
  return out;
}

/* every phrase the rung offers as a typed answer */
function candidates(rung) {
  const clean = String(rung).replace(/\*\*/g, '');
  /* Sentence and clause boundaries only. Splitting on "the" as well looked tidier and quietly broke
     a transcription answer in half -- "IT SLEEPS WITH THE WINDOW OPEN" became two candidates, neither
     of which the accept() takes. */
  const parts = clean.split(/[.;:,]|\band\b/i).map(s => s.trim()).filter(s => s.length && s.length < 80);
  const bold = [...String(rung).matchAll(/\*\*([^*]+)\*\*/g)].map(m => m[1]);
  const words = clean.match(/[A-Za-z0-9]+/g) || [];
  return [...new Set([...bold, ...parts, ...words])];
}
function acceptOf(cfg, norm) {
  if (typeof cfg.accept === 'function') return cfg.accept;
  return (values) => cfg.accept.every((acc, i) => acc.map(norm).includes(values[i]));
}
/* the first ordered k-tuple of candidates the accept() takes */
function firstAccepted(G, cfg, arity, cand, run) {
  const norm = G.__norm, fn = acceptOf(cfg, norm);
  const k = Math.max(1, Math.min(3, arity));
  const idx = new Array(k).fill(0);
  const total = Math.pow(cand.length, k);
  if (!cand.length || total > 200000) return null;
  for (let c = 0; c < total; c++) {
    let x = c; const pick = [];
    for (let j = 0; j < k; j++) { pick.push(cand[x % cand.length]); x = Math.floor(x / cand.length); }
    const values = pick.map(v => cfg.normalize ? cfg.normalize(v) : norm(v));
    let ok = false; try { ok = run(() => fn(values, pick)); }
    catch (e) {
      /* An accept: lifted out of a chapter and run in a fresh context throws a ReferenceError the
         moment it touches a module constant of its own -- NOT when it is defined, because an arrow
         body is not resolved until it is called. Swallowing that as `false` reported the ladder as
         FAILING for a reason that was the tool's, not the chapter's; it is now hoisted so the caller
         can say the corner is not covered. It is matched by NAME, not instanceof: the accept was
         compiled in a vm context, so its ReferenceError belongs to that realm and instanceof is
         false -- which is how the first version of this fix silently failed its own mutation test. */
      if (e && (e.name === 'ReferenceError' || / is not defined/.test(String(e.message)))) { const err = new Error(e.message); err.unevaluable = true; throw err; }
      ok = false;
    }
    if (ok) return pick;
  }
  return null;
}
/* pull `accept: <expr>` out of a function's source text, balanced */
function extractAccepts(src) {
  const vm = require('vm');
  const out = [];
  const re = /accept:\s*/g; let m;
  while ((m = re.exec(src))) {
    let i = m.index + m[0].length, depth = 0, expr = '';
    for (; i < src.length; i++) {
      const c = src[i];
      if ('([{'.includes(c)) depth++;
      else if (')]}'.includes(c)) { if (depth === 0) break; depth--; }
      else if (c === ',' && depth === 0) break;
      expr += c;
    }
    /* The expression is evaluated in a FRESH context, so an accept: that closes over a module
       constant throws here. Until this pass that was a bare `continue` -- the corner silently
       dropped out of coverage with no message, which is exactly the shape of ADVERSARIAL 17: a
       try/catch turning a broken invariant into a cosmetic absence. It is reported now, and it
       counts as a failure to cover rather than a pass. (ch4's study hit this and worked around it
       by inlining its word lists; nothing told it so.) */
    let fn = null, err = null; try { fn = vm.runInNewContext('(' + expr.trim() + ')'); } catch (e) { err = e; }
    const arity = Math.max(1, ...( [...expr.matchAll(/\[\s*(\d+)\s*\]/g)].map(x => +x[1] + 1) ), Array.isArray(fn) ? fn.length : 1);
    const label = 'accept #' + (out.length + 1) + ' (' + arity + ' field' + (arity > 1 ? 's' : '') + ')';
    if (err) { out.push({ unevaluable: true, label, why: 'could not be evaluated outside its file (' + err.message + ') -- it closes over something in the chapter, so this corner is NOT covered' }); continue; }
    out.push({ cfg: { accept: fn }, arity, label });
  }
  return out;
}

/* ---------- the chapter-word oracle ------------------------------------------------------------------
   ch7's Great Sigil shipped with the phrase THORN KNOT VEIL EMBER ASH WELL CROWN, which is the
   attunement word of ch1..ch7 IN CHAPTER ORDER (js/content/lore.js). Every player types all seven
   into the Hearth over the evening, one per chapter, and ch8 ended the game by pointing at the
   coincidence -- so the Finale's whole phrase, in its whole order, had been public since Chapter I.
   Nothing in tools/ had ever compared a puzzle's answer to the one ordered sequence the game itself
   publishes across all nine chapters.

   TWO CONDITIONS, and both are load-bearing.

   (1) The table must already have typed every word in the run by the chapter the puzzle is in.
       ch2's vault door reads THORN KNOT VEIL EMBER, which is ch1..ch4 -- but at Chapter II a table
       has typed KINDLE, THORN and KNOT and no more, so VEIL and EMBER are not yet anything and the
       door is clean. The same four words in Chapter V would not be.

   (2) The run must be FOUR words or longer. This is the calibration, and it is measured rather than
       chosen. Enumerating all 8! = 40,320 arrangements of the eight glyphs on an eight-slot ring,
       and reading each from all eight slots in both directions, the longest run of consecutive
       chapter words that turns up BY CHANCE is:
             none  32,656  81.0%       run of 5    176   0.4%
             3      6,416  15.9%       run of 6     32   0.1%
             4      1,024   2.5%       run of 7     16   0.04%
       A run of three is noise -- one ring in six has one. A run of four is 2.5%, and ch7's old
       phrase was a run of SEVEN, which is four rings in ten thousand: not a coincidence, and in fact
       not one, since it was written as a payoff. So four is the gate and three is a printed note.
       ch6_strip's accepted board contains VEIL EMBER ASH at slots 5-7 and is left alone on that
       basis: three words of eight, no published reason for a table to look for them, and inside the
       band where one ring in six does this by accident.
       (Enumerated in scratchpad/oracle-rate.js; re-derive it if the glyph count ever changes.)

   A ring is a loop with no first slot, so every rotation and both directions of its accepted board
   are readings a table could make; a sequence puzzle gets the sequence and its reverse. The boards
   are the ones verify() has just put through the SHIPPED predicate, so this is checked against the
   answers the puzzles actually take, not against a second model of them. */
const ORACLE_FAIL_LEN = 4, ORACLE_NOTE_LEN = 3;
function consecutiveRuns(words, minLen) {
  const runs = new Set();
  for (const w of [words, words.slice().reverse()])
    for (let L = minLen; L <= w.length; L++) for (let i = 0; i + L <= w.length; i++) runs.add(w.slice(i, i + L).join(' '));
  return runs;
}
function readingsOf(seq, isLoop) {
  const out = [];
  const push = (a) => { out.push(a); out.push(a.slice().reverse()); };
  if (!isLoop) { push(seq); return out; }
  for (let r = 0; r < seq.length; r++) push(seq.slice(r).concat(seq.slice(0, r)));
  return out;
}
function chapterWordOracle(G, results) {
  const Lore = G.Lore || (G.win && G.win.VigilLore);
  const problems = [];
  if (!Lore || !Lore.chapters) return problems;
  const RUNS = consecutiveRuns(Lore.chapters.map(c => c.word), ORACLE_NOTE_LEN);
  for (const r of results) {
    const lc = Lore.chapter(r.chId);
    if (!lc) continue;
    const typed = new Set(Lore.chapters.filter(c => c.n <= lc.n).map(c => c.word));
    const isLoop = r.kind === 'ring';
    let longest = null;
    for (const board of r.boardsSeen) {
      if (!/^\d+:/.test(board)) continue;               // only slot-keyed boards read as a sequence
      const seq = board.split(/\s+/).map(x => x.split(':')[1]).filter(w => w && w !== '-');
      if (seq.length < ORACLE_NOTE_LEN) continue;
      for (const reading of readingsOf(seq, isLoop))
        for (let L = reading.length; L >= ORACLE_NOTE_LEN; L--) for (let i = 0; i + L <= reading.length; i++) {
          const run = reading.slice(i, i + L);
          if (!RUNS.has(run.join(' ')) || !run.every(w => typed.has(w))) continue;
          if (!longest || run.length > longest.length) longest = run;
        }
    }
    if (!longest) continue;
    const where = `${r.id}: the answer reads ${longest.join(' ')} -- ${longest.length} consecutive chapter attunement words, and the table has typed every one of them by ${r.chId}`;
    if (longest.length >= ORACLE_FAIL_LEN) problems.push(where + '. The whole room is holding this sequence; see docs/ADVERSARIAL.md 18.');
    else r.notes.push(where + ' (under the four-word gate: one ring in six does this by chance -- see the calibration in check-hints.js)');
  }
  return [...new Set(problems)];
}

/* ---------- run ------------------------------------------------------------------------------------ */
function check(loaded) {
  const G = loaded || loadHearth();
  const Game = G.Game, Store = G.Store;
  G.__norm = (G.win.VigilAnswer && G.win.VigilAnswer.norm) || ((s) => String(s || '').toUpperCase().replace(/[^A-Z0-9]/g, ''));
  const results = [];
  for (const id in Game.scenes) {
    const sc = Game.scenes[id];
    if (!sc.hints || !sc.hints.length) continue;
    const chId = Game.sceneChapter[id];
    let r;
    try { r = checkScene(G, Store, id, sc, chId); }
    catch (e) { r = { id, chId, kind: sc.puzzle || sc.type, covered: false, why: 'the checker threw: ' + e.message, fails: ['checker error: ' + e.message], notes: [], boardsSeen: new Set(), states: 0 }; }
    results.push(r);
  }
  const problems = [];
  for (const r of results) for (const f of r.fails) problems.push(`${r.id}: last hint rung is not an answer the puzzle accepts -- ${f}`);
  problems.push(...chapterWordOracle(G, results));
  return { results, problems };
}

module.exports = { check };

if (require.main === module) {
  const args = process.argv.slice(2);
  const quiet = args.includes('--quiet');
  const only = args.filter(a => /^ch\d$/.test(a));
  const G = loadHearth();
  const { results } = check(G);
  const rows = results.filter(r => !only.length || only.includes(r.chId));
  let fails = 0, covered = 0, uncovered = [];
  for (const r of rows) {
    if (r.covered) covered++; else uncovered.push(r);
    if (r.fails.length) fails++;
    if (quiet && !r.fails.length && !r.unproven) continue;
    const tag = r.fails.length ? 'FAIL' : r.unproven ? 'WEAK' : (r.covered ? 'ok  ' : 'n/a ');
    console.log(`${tag} ${r.id.padEnd(14)} ${String(r.kind).padEnd(9)} ${r.states} state${r.states === 1 ? '' : 's'}`);
    if (!r.covered && r.why) console.log('       not covered: ' + r.why);
    if (r.unproven) { console.log('       UNPROVEN: ' + r.why); if (r.outcome) console.log('       the rung\'s answer makes onSolve write: ' + r.outcome); }
    else if (r.story) { console.log(`       discriminates: check() takes every near miss, but onSolve sends ${r.story.differ} of ${r.story.of} somewhere else`); console.log('       the rung\'s answer makes onSolve write: ' + r.outcome); }
    else if (r.near) console.log(`       discriminates: the predicate refuses ${r.near.of - r.near.taken} of ${r.near.of} near misses`);
    for (const b of r.boardsSeen) if (!quiet) console.log('       reads as: ' + b);
    for (const n of [...new Set(r.notes)]) console.log('       note: ' + n);
    for (const f of r.fails) { const at = r.seen && r.seen.get(f) || []; console.log('       ' + f + (at.length > 1 ? `   [at all ${at.length} probe states]` : at.length ? `   [at ${at[0]}]` : '')); }
  }
  const weak = rows.filter(r => r.unproven);
  console.log(`\n${rows.length} ladders. ${covered} checked against the shipped predicate, ${uncovered.length} not coverable, ${fails} FAILING, ${weak.length} accepted by a predicate that cannot fail.`);
  if (weak.length) console.log('unproven: ' + weak.map(r => r.id).join(', '));
  if (uncovered.length) console.log('not coverable: ' + uncovered.map(r => r.id + ' (' + r.kind + ')').join(', '));
  process.exit(fails ? 1 : 0);
}
