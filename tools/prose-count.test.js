/* Known cases for tools/prose-count.js. Run: node tools/prose-count.test.js
   Each case is a small chapter file in the shape the real ones have, and names the defect it guards:
   the first group are things the old line scanner never saw, the second are things it counted that no
   player ever reads. If one fails, the counter has gone back to counting the wrong thing. */
const test = require('node:test');
const assert = require('node:assert');
const fs = require('fs'), path = require('path');
const { analyze, summarize } = require('./prose-count.js');

const chapter = (helpers, scenes, extra) => `(function () {
  const UI = window.VigilUI, Store = window.VigilStore, L = window.VigilLore;
  ${helpers}
  Game.addChapter({ id: 'chX', label: 'Chapter X', title: 'Test', start: 's1', ${extra || ''} scenes: { ${scenes} } });
})();`;
const total = (src) => summarize(analyze(src)).total;
const counted = (src) => analyze(src).map(r => r.text);
const has = (src, text) => assert.ok(counted(src).includes(text), `expected "${text}" to be counted; counted: ${JSON.stringify(counted(src))}`);
const hasNot = (src, text) => assert.ok(!counted(src).some(t => t.includes(text)), `expected "${text}" NOT to be counted`);

/* ---------------- shown on screen, and the old counter missed it ---------------- */

test('a constant table printed by a text function is counted, every entry once', () => {
  const src = chapter(`const STAND = { BLUFF: { said: 'You lied to the captain.' }, WRIT: { said: 'The writ was read twice.' } };`,
    `s1: { text: (s) => { const k = STAND[s.flags.DOOR] || STAND.BLUFF; return [k.said]; } }`);
  has(src, 'You lied to the captain.'); has(src, 'The writ was read twice.');
});

test('a receipt table reached through a helper inside check() is counted', () => {
  const src = chapter(`const DOOR = { short: 'A count is four words.', twice: 'Two turns on one dial.' };
    function receipt(spent, why) { const el = document.getElementById('x'); if (el) el.innerHTML = UI.rich((spent ? '**Called.** ' : '**Nothing spent.** ') + why); return why; }`,
    `s1: { type: 'puzzle', puzzle: 'dialseq', config: () => ({ check: (t) => t.length < 4 ? receipt(false, DOOR.short) : t.twice ? receipt(false, DOOR.twice) : true }) }`);
  has(src, 'A count is four words.'); has(src, 'Two turns on one dial.'); has(src, '**Nothing spent.** ');
});

test("a helper's return value and a helper's arguments are counted", () => {
  const src = chapter(`function wardReason(m) { return m[1] ? 'Those are not the words over this door.' : 'Nothing in the ring.'; }
    const askOpt = (id, text, next) => ({ id, text, next });
    function roundText(mark, lines) { return (s, r) => { const out = [{ text: \`\${r.hits} lights. \${mark} holds the lid.\`, cls: 'whisper' }]; out.push.apply(out, lines); return out; }; }`,
    `s1: { type: 'puzzle', puzzle: 'ring', config: { onWrong: (m) => wardReason(m) }, solvedText: roundText('The first pattern', ['The lid holds.']) },
     s2: { type: 'choice', options: [askOpt('away', 'Away from the fire.', 's1')] }`);
  has(src, 'Those are not the words over this door.'); has(src, 'Nothing in the ring.');
  has(src, 'Away from the fire.'); has(src, 'The first pattern'); has(src, 'The lid holds.');
});

test('a reply table read through a parameter the call bound is counted, and only that entry in that scene', () => {
  const src = chapter(`const REPLY = { seer: 'Toward. Thanks for moving.', reader: 'A hollow. The bit that rings.' };
    const wrenSays = (s, role) => ({ speaker: 'Wren', text: REPLY[role] });`,
    `s1: { text: (s) => [wrenSays(s, 'seer')] }, s2: { text: (s) => [wrenSays(s, 'reader')] }`);
  const rows = analyze(src), seer = rows.find(r => r.text.startsWith('Toward'));
  assert.deepStrictEqual([...seer.seen.keys()], ['s1']);
  has(src, 'A hollow. The bit that rings.');
});

test('every key the engine and the widgets print is counted', () => {
  const src = chapter('', `
    s1: { type: 'code', codeLabel: 'Word of attunement', codeSub: 'Type it on every phone', roles: 'Warden: anyone' },
    s2: { type: 'flow', flowTitle: 'The paths you walked', stats: (s) => 'You found the door.' },
    s3: { type: 'puzzle', puzzle: 'seats', config: { submitText: 'Call the vote', timeoutText: 'The bell rings now.', center: 'the Hearth' } },
    s4: { type: 'puzzle', puzzle: 'ring', config: { fourHandsText: 'FOUR HANDS together', html: '<div class="x">One count left.</div>' } },
    s5: { type: 'token', badText: 'Not attuned yet.', slots: [{ label: 'the Reader word' }] },
    s6: { type: 'puzzle', puzzle: 'binding', config: { failText: 'The fire will not take it.' } },
    s7: { type: 'puzzle', puzzle: 'tiles', config: { emptyText: 'Build it from the tiles.' } },
    s8: { type: 'puzzle', puzzle: 'answer', config: { fields: [{ label: 'the name', placeholder: 'four letters' }] } },
    s9: { type: 'choice', options: [{ id: 'own', text: 'Our own', ask: { prompt: 'What does Wren call you?', ok: 'That one' } }] },
    s10: { type: 'puzzle', puzzle: 'grid', config: { labels: { A1: 'the gallery' }, patrols: [{ name: 'The lantern' }] } },
    s11: { type: 'puzzle', puzzle: 'reaction', config: { laneNames: ['Voice'] } },`);
  for (const t of ['Word of attunement', 'Type it on every phone', 'The paths you walked', 'You found the door.', 'Call the vote', 'The bell rings now.',
    'the Hearth', 'FOUR HANDS together', '<div class="x">One count left.</div>', 'Not attuned yet.', 'the Reader word', 'The fire will not take it.',
    'Build it from the tiles.', 'the name', 'four letters', 'What does Wren call you?', 'That one', 'the gallery', 'The lantern', 'Voice']) has(src, t);
  assert.strictEqual(summarize(analyze(src)).per.s4, 3 + 3);   // html: tags are not words, the sentence is
});

test('one-word strings are words: a flow label, a button, a speaker', () => {
  const src = chapter('', `s1: { text: [{ speaker: 'Wren', text: 'Hi.' }], button: 'Later' }`, `flow: { nodes: [{ id: 'a', label: 'Refused' }] },`);
  has(src, 'Refused'); has(src, 'Later'); has(src, 'Wren');
});

test('prose built in a custom run() body is counted', () => {
  const src = chapter('', `s1: { type: 'custom', run: (box, api) => new Promise((resolve) => {
      const st = UI.el('div', { class: 'pz-status' }); box.appendChild(UI.el('div', { class: 'pz-title', text: 'THE FOUR KEYS' }));
      const say = (cls, t) => { st.className = 'pz-status ' + cls; st.textContent = t; };
      api.button('Read it from its mark', () => say('good', 'Four, as one, went through.'));
      UI.toast('A breath goes with it.');
    }) }`);
  for (const t of ['THE FOUR KEYS', 'Read it from its mark', 'Four, as one, went through.', 'A breath goes with it.']) has(src, t);
  hasNot(src, 'pz-status');
});

test('scenes made in a loop with Object.fromEntries are walked', () => {
  const src = chapter(`const ROLES = ['reader', 'seer'];`,
    `...Object.fromEntries(ROLES.map((r, i) => ['bargain_' + r, { type: 'choice', prompt: 'In front of everyone.', options: [{ id: 'keep', text: 'Keep it.' }] }]))`);
  has(src, 'In front of everyone.'); has(src, 'Keep it.');
});

test('scanner traps from the old counter: a ternary on an identifier, a nested ], a regex literal', () => {
  const src = chapter(`const LINE = 'The fire answers.';`,
    `s1: { text: (s) => [s.flags.A ? LINE : 'The fire does not answer.', (s.flags.B || []).includes('x') ? 'Somebody was asked.' : 'Nobody was asked.'] },
     s2: { text: (s) => { const n = String(s.flags.N).replace(/[^a-z']/g, ''); return ['Wren says the name twice.']; } }`);
  for (const t of ['The fire answers.', 'The fire does not answer.', 'Somebody was asked.', 'Nobody was asked.', 'Wren says the name twice.']) has(src, t);
});

test('a template literal that ends in ${} is prose, not CSS', () => {
  const src = chapter('', 's1: { type: \'flow\', stats: (s) => `Wren calls you ${s.flags.GROUP_NAME}` }');
  assert.strictEqual(total(src), 3 + 2 + 1);   // the stats line, plus 'Chapter X' and 'Test'
});

/* ---------------- counted before, and never on screen ---------------- */

test('a choice note and Store.note() go to the log, which nothing renders', () => {
  const src = chapter('', `s1: { type: 'choice', options: [{ id: 'a', text: 'Go.', note: 'You promised Sorrel the Ember.' }],
    onSolve: () => { Store.note('The nine voted to keep Wren.'); } }`);
  hasNot(src, 'You promised Sorrel'); hasNot(src, 'The nine voted');
});

test('class names, CSS and selectors are not words', () => {
  const src = chapter(`if (document.head) document.head.appendChild(Object.assign(document.createElement('style'), { textContent: \`.ch1-rule { font-size: 15px; } body .seat b { color: red; }\` }));`,
    `s1: { text: [{ text: 'Sit left to right.', cls: 'whisper center' }], run: (box) => { box.appendChild(UI.el('div', { class: 'pz ch2-niche' })); box.querySelector('.grid-pz .pz-status'); } }`);
  assert.strictEqual(total(src), 4 + 2 + 1);
});

test('a speaker the engine suppresses is not counted; a new run names it again', () => {
  const src = chapter('', `s1: { text: [{ speaker: 'Provost Marrow', text: 'One.' }, { speaker: 'Provost Marrow', text: 'Two.' }, 'Narration.', { speaker: 'Provost Marrow', text: 'Three.' }],
    options: [{ id: 'a', text: 'Go.', after: [{ speaker: 'Provost Marrow', text: 'Four.' }] }] }`);
  // two labels of two words, four one-word lines, 'Narration.', 'Go.' -- the second label and the reply's carry on from the line before
  assert.strictEqual(summarize(analyze(src)).per.s1, 2 * 2 + 4 + 1 + 1);
});

test('${...} is never a word; words glued across a + are one word; {n} is a slot', () => {
  const src = chapter(`const listSeats = (arr) => arr.length ? 'Seat' + (arr.length > 1 ? 's ' : ' ') + arr.join(', ') : 'nobody';`,
    `s1: { type: 'flow', stats: (s) => \`\${s.flags.vote} \${s.flags.price} Hints so far: \${s.flags.hintsTotal || 0}.\` },
     s2: { text: (s) => [listSeats(s.flags.KEEP) + ' for keeping.', 'You caught {n}.'] }`);
  assert.strictEqual(summarize(analyze(src)).per.s1, 3);
  assert.strictEqual(summarize(analyze(src)).per.s2, 1 + 1 + 2 + 2);   // Seat(s) · nobody · for keeping · You caught
});

test('each literal is counted once in the total, however many scenes reach it', () => {
  const src = chapter(`const HINT = 'Each of you holds one piece.';`, `s1: { hints: [HINT] }, s2: { hints: [HINT] }`);
  const { total: t, per } = summarize(analyze(src));
  assert.strictEqual(per.s1, 6); assert.strictEqual(per.s2, 6);
  assert.strictEqual(t, 6 + 3);
});

/* ---------------- the real chapters ---------------- */

test('every chapter parses, and nothing in it that reads like a sentence goes uncounted unexplained', () => {
  const dir = path.join(__dirname, '..', 'js', 'content');
  for (const f of fs.readdirSync(dir).filter(f => /^ch\d\.js$/.test(f))) {
    const rows = analyze(fs.readFileSync(path.join(dir, f), 'utf8'));
    assert.ok(summarize(rows).total > 0, f);
    /* A sentence-shaped string nobody counted must be one of the things that is not prose: a log note, a
       flag value, a repeated speaker, CSS, markup or SVG data, a selector, a dev message. */
    const unexplained = rows.missed().filter(m => /^[A-Z"*'].*[a-z].*[.!?]["*']?$/.test(m.text.trim()) && !/note|speaker \(a repeat\)|GROUP_NAME|console|const err|Error/.test(m.where));
    assert.deepStrictEqual(unexplained, [], f);
  }
});
