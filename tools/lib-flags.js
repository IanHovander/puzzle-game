/* Reading the flag traffic out of a source file.
   Chapters do not all touch the save the same way. Some write `s.flags.DOOR`, some keep a local
   accessor (`const F = (s) => s.flags`, `const F = () => Store.state.flags`) and then say `F(s).DOOR`,
   some take a plain alias (`const f = s.flags`, `const f = ctx.flags || {}`) and say `f.DOOR`, and some
   build the key (`s.flags['WALK_' + role]`). A scanner that only knows the literal text `flags.X` sees
   the first shape and none of the others, which is how tools/flag-map.js came to report a clean
   19-flag contract while eleven more contracts crossed a chapter boundary unrecorded.
   This module is the one place that knows all the shapes, so flag-map and check-hints agree. */

const FLAG = '[A-Z][A-Z0-9_]*';

/* Local names that stand for the flags object.
     accessors: const F = (s) => s.flags        -> F(s).X, F().X
     aliases:   const f = s.flags               -> f.X
   The body must END at `.flags` (with an optional `|| {}`), or `const W = (s, r) => s.flags['W_' + r]`
   would be mistaken for an accessor -- it returns one flag's value, not the object. */
function aliasesOf(src) {
  const accessors = new Set(), aliases = new Set();
  let m;
  const arrow = /\b(?:const|let|var)\s+([A-Za-z_$][\w$]*)\s*=\s*(?:\([^)]*\)|[A-Za-z_$][\w$]*)\s*=>\s*([^;\n]+)/g;
  while ((m = arrow.exec(src))) if (/\.flags\s*(\|\|\s*\{\s*\}\s*)?$/.test(m[2].trim())) accessors.add(m[1]);
  const plain = /\b(?:const|let|var)\s+([A-Za-z_$][\w$]*)\s*=\s*[A-Za-z_$][\w$.]*\.flags\s*(?:\|\|\s*\{\s*\})?\s*(?=[;,\n])/g;
  while ((m = plain.exec(src))) if (!accessors.has(m[1])) aliases.add(m[1]);
  return { accessors: [...accessors], aliases: [...aliases] };
}

const esc = (s) => s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');

/* Every way a flag is read, and every way one is written, as regexes over this file's own aliases. */
function patterns(src) {
  const { accessors, aliases } = aliasesOf(src);
  const readSrcs = [
    `flags\\.(${FLAG})\\b`,
    `flags\\[\\s*['"](${FLAG})['"]\\s*\\]`,
    `Store\\.get\\(\\s*['"](${FLAG})['"]`,
  ];
  const writeSrcs = [
    `Store\\.set\\(\\s*['"](${FLAG})['"]`,
    `Store\\.inc\\(\\s*['"](${FLAG})['"]`,
    `flags\\.(${FLAG})\\s*=(?![=>])`,
    `flags\\[\\s*['"](${FLAG})['"]\\s*\\]\\s*=(?![=>])`,
  ];
  for (const a of accessors) {
    readSrcs.push(`\\b${esc(a)}\\s*\\([^)]*\\)\\s*\\.(${FLAG})\\b`);
    writeSrcs.push(`\\b${esc(a)}\\s*\\([^)]*\\)\\s*\\.(${FLAG})\\s*=(?![=>])`);
  }
  for (const a of aliases) {
    readSrcs.push(`\\b${esc(a)}\\.(${FLAG})\\b`);
    writeSrcs.push(`\\b${esc(a)}\\.(${FLAG})\\s*=(?![=>])`);
  }
  /* `const { DOOR, LAW0 } = s.flags` / `= F(s)` -- none in the game today, but a rename would
     silently pass the day somebody writes one, which is the whole failure this module exists for. */
  const destructure = new RegExp(`\\{([^}]*)\\}\\s*=\\s*(?:[A-Za-z_$][\\w$.]*\\.flags|(?:${[...accessors, ...aliases].map(esc).join('|') || '\\0'})\\s*(?:\\([^)]*\\))?)\\b`, 'g');
  /* built keys: flags['WALK_' + role] on either side of an assignment */
  const dynRead = new RegExp(`(?:flags|${[...accessors, ...aliases].map(esc).join('|') || '\\0'})\\s*(?:\\([^)]*\\))?\\[\\s*['"](${FLAG}_)['"]\\s*\\+[^\\]]*\\]\\s*(=(?!=))?`, 'g');
  return {
    accessors, aliases,
    reads: readSrcs.map(s => new RegExp(s, 'g')),
    writes: writeSrcs.map(s => new RegExp(s, 'g')),
    destructure, dynRead,
  };
}

/* Scan a file. Reads and writes are collected line by line so that a flag reading ITSELF inside its
   own update -- `s.flags.WREN_TRUST = (s.flags.WREN_TRUST || 0) + 1` -- is counted as a write and not
   also as a read. That miscount is why a dead flag looked live. */
function scan(src) {
  const P = patterns(src);
  const reads = new Set(), writes = new Set(), dyn = new Set();
  /* `set: { FLAG: value }` on a choice option is a write the engine performs, and it is collected
     FIRST, by line, so that a value written from its own old value --
     `set: { WREN_TRUST: (s) => (s.flags.WREN_TRUST || 0) - 2 }` -- suppresses its own read like any
     other self-update. The expression is grabbed balanced rather than by `{...}`, because ch6 writes
     its asks as `set: Object.assign({ ['ASK_' + role]: id }, right ? { CLUES: ... } : {})`, a shape
     the old `set:\s*\{([^}]*)\}` could not see at all. */
  const setWrites = {};   // line index -> [flag]
  {
    let m; const setRe = /\bset:\s*/g;
    while ((m = setRe.exec(src))) {
      const body = balanced(src, m.index + m[0].length);
      const line0 = src.slice(0, m.index).split('\n').length - 1;
      const at = (off, f) => { const ln = line0 + body.slice(0, off).split('\n').length - 1; (setWrites[ln] = setWrites[ln] || []).push(f); };
      let k; const keyRe = new RegExp(`(?:\\b|['"])(${FLAG})['"]?\\s*:`, 'g');
      while ((k = keyRe.exec(body))) at(k.index, k[1]);
      const dynKey = new RegExp(`\\[\\s*['"](${FLAG}_)['"]\\s*\\+[^\\]]*\\]\\s*:`, 'g');
      while ((k = dynKey.exec(body))) { at(k.index, k[1]); dyn.add(k[1]); }
    }
  }
  src.split('\n').forEach((line, ln) => {
    const w = new Set(setWrites[ln] || []), r = new Set();
    for (const re of P.writes) { let m; re.lastIndex = 0; while ((m = re.exec(line))) w.add(m[1]); }
    for (const re of P.reads) { let m; re.lastIndex = 0; while ((m = re.exec(line))) r.add(m[1]); }
    { let m; P.destructure.lastIndex = 0; while ((m = P.destructure.exec(line))) (m[1].match(new RegExp(FLAG, 'g')) || []).forEach(f => r.add(f)); }
    { let m; P.dynRead.lastIndex = 0; while ((m = P.dynRead.exec(line))) { dyn.add(m[1]); if (m[2]) w.add(m[1]); else r.add(m[1]); } }
    w.forEach(f => writes.add(f));
    r.forEach(f => { if (!w.has(f)) reads.add(f); });
  });
  /* the engine writes `<choice>_timedout` for any timed choice; credit the chapter that declares it */
  let t; const chRe = new RegExp(`choice:\\s*['"](${FLAG})['"]`, 'g');
  while ((t = chRe.exec(src))) writes.add(t[1] + '_timedout');
  return { reads: [...reads], writes: [...writes], dyn: [...dyn], accessors: P.accessors, aliases: P.aliases };
}

/* the expression that starts at i, to the comma or bracket that closes it at depth zero */
function balanced(src, i) {
  let depth = 0, out = '';
  for (; i < src.length && out.length < 4000; i++) {
    const c = src[i];
    if ('([{'.includes(c)) depth++;
    else if (')]}'.includes(c)) { if (depth === 0) break; depth--; }
    else if ((c === ',' || c === '\n') && depth === 0) break;
    out += c;
  }
  return out;
}

module.exports = { scan, aliasesOf, patterns, balanced, FLAG };
