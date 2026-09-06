# HEARTHFALL — Implementer conventions

Read `docs/DESIGN.md` (spoilers) for the story and puzzle specs. This file is the *contract* for writing content: file layout, the scene API, widget configs, flags, tokens, casts, Companion blocks, art, audio, and how to test. Everything is vanilla JS, classic `<script>` tags, no build step, no modules. Everything must work from GitHub Pages or `python3 -m http.server`.

## 1. Files and ownership

| Chapter | Hearth content | Companion content | Art |
|---|---|---|---|
| Prologue (ch0) | `js/content/ch0.js` | `js/content/companion/ch0.js` | `js/art/scenes-ch0.js` |
| Chapter 1 (ch1) … Epilogue (ch8) | `js/content/chN.js` | `js/content/companion/chN.js` | `js/art/scenes-chN.js` |

All nine chapter files are already referenced by `index.html` / `companion.html` in order. A chapter file **only** touches its own three files. Shared code (engine, widgets, glyphs, lore, book) is owned by the integrator; if you need a change there, write it down in your report rather than editing.

Every chapter id, word, cast spec, role, Law, and token channel lives in `js/content/lore.js` (`window.VigilLore`). Use it; do not redefine.

## 2. Hearth content: chapters and scenes

```js
Game.addChapter({
  id: 'ch2', label: 'Chapter II', title: 'The Ember Vault', start: 'ch2_start',
  code: 'KNOT',               // attunement word (from VigilLore.chapter('ch2').word)
  mood: 'tower', fx: 'dust', art: 'vault', flame: 0.8,   // chapter defaults (scene can override)
  flow: { nodes: [...], edges: [...] },                   // chapter flowchart (see §2.6)
  scenes: { ch2_start: {...}, ch2_door: {...}, ... },
});
```

Scene ids are globally unique and prefixed `chN_`. The chapter's first scene is `chN_start`; the chapter's last scene sets `next: 'ch(N+1)_start'`. Scenes run in order of `next`. Fields common to all scenes:

- `text`: array of paragraphs, or `(state) => [...]`. A paragraph is a string or `{ text, speaker, cls }`. Inline markup: `*em*`, `**strong**`, `{{RUNE}}` (small caps, sea colour), `~~small~~`. `cls` can be `whisper`, `omen`, `letter`, `center`, `big`.
- `title`: optional scene heading. `art`, `artParams`, `mood`, `fx`, `flame` (0–1), `sfx` (one-shot on enter), `enter(state)` (side effects), `speed` (typewriter ms/char).
- `next`: scene id or `(state) => id`. `button`: label of the continue button.
- `hints`: array of 3 strings/functions — tier 1, tier 2, tier 3 (the last is treated as "the answer"). `par`: minutes (or array of minutes) after which the hint bell pulses.

Scene types (`type`):

### 2.1 `story` (default)
Text then a Continue button. `auto: ms` advances automatically.

### 2.2 `choice`
```js
{ type: 'choice', choice: 'VANE_OFFER', prompt: 'Vane waits.', timer: 60, timerText: '*Sixty heartbeats.*',
  timeout: 'refuse',                      // option id chosen on timeout (default: last option)
  options: [
    { id: 'refuse', text: 'Refuse him.', next: 'ch1_after', set: { VANE_PRETEND: false } },
    { id: 'pretend', text: 'Pretend to accept.', sub: 'Buys a bluff later.', next: 'ch1_after', set: { VANE_PRETEND: true }, note: 'You lied to the Envoy.', after: ['Vane smiles. "Wise."'] },
    { id: 'accept', text: 'Accept.', cls: 'dark', next: 'ch1_after', set: { VANE_ACCEPT: true }, if: (s) => !s.flags.SORREL },
  ] }
```
`Store.choose(choice, id)` is recorded automatically; `set` writes flags; `after` shows follow-up text before continuing; `if` hides options. Timed choices always say so in `timerText`.

### 2.3 `puzzle`
```js
{ type: 'puzzle', puzzle: 'ring', puzzleId: 'ch2_door',   // puzzleId defaults to scene id; solved puzzles are skipped on resume
  config: (state) => ({ ... }),                            // widget config (see §3)
  hints: ['Owl knows where a ring begins.', 'Sunwise from slot 3.', (s) => 'ASH at 3, EMBER at 4.'], par: [3, 6],
  onSolve: (state, result) => { ... },                     // side effects
  solvedText: ['The lamp catches.'], next: 'ch0_x', autoNext: false }
```
The widget resolves with a result object; `result.set` (if present) is written to flags.

### 2.4 `code` — attunement word (chapter boundary)
```js
{ type: 'code', text: ['The word is carved above the door.'], roles: 'Warden of the Hearth: **Owl**. Voice: **Bookmoth**.', sightSeconds: 90, next: 'ch2_1' }
```
The word comes from the chapter's `code`; the cast is computed automatically from `VigilLore.chapter(id).cast` and current flags. Use `code: 'LINEN'` on a scene to show a mini-word (no cast). After the code scene, the Companion has the chapter's pages.

### 2.5 `token` — phones speak back
```js
{ type: 'token', prompt: 'Each of you: open SPEAK and type your sealed word.',
  slots: [0,1,2,3].map(i => ({ label: VigilLore.nick(i), player: i, length: 4 })),
  decode: (tok, i, state) => VigilShared.decode(VigilLore.channel('whisper', VigilLore.roles[i].id), tok, VigilLore.tokens.whisper[VigilLore.roles[i].id]),
  onTokens: (values, state) => { values.forEach((v, i) => state.flags['WHISPER_' + VigilLore.roles[i].id] = v); },
  next: 'ch3_after' }
```
`decode` returns the decoded value or `null` (then the field is marked wrong, nothing else is revealed). Channels are `VigilLore.channel(beat, roleId)`; value lists are in `VigilLore.tokens`. The Companion computes the same token with `Shared.token(channel, value, values)`.

### 2.6 `flow` — the chapter's flowchart
```js
flow: { nodes: [ { id: 'ch1_vote', label: 'The Convocation votes', col: 0, row: 1 },
                 { id: 'ch1_vote_lost', label: 'Wren is taken', col: 1, row: 2, kind: 'choice', when: (s) => s.flags.VOTE_LOST, secret: true },
                 { id: 'ch1_private', label: 'only Hush knows', col: 2, row: 0, kind: 'end', secret: true } ],
        edges: [ ['ch1_vote', 'ch1_vote_lost'] ] }
{ type: 'flow', text: ['The bell. The night moves on.'], stats: (s) => 'Hints so far: ' + (s.flags.hintsTotal || 0), next: 'ch2_start' }
```
A node is lit if its id is a visited scene id, or if `when(state)` is true. `secret: true` shows "? ? ?" until lit.

### 2.7 `custom`
```js
{ type: 'custom', text: [...], run: async (box, api) => { /* build DOM in box; return next scene id or undefined to use scene.next */ } }
```
`api` has: `state, store, ui, audio, fx, input, text, actions, widget, go(id), button(label, fn, cls), say(paragraphs), setHints(ladder), alive()`.

### 2.8 `end`
Final scene of an ending: `{ type: 'end', text: [...], render: (actions, api) => {...} }`.

### 2.9 State
`VigilStore.state.flags` holds every flag in `docs/DESIGN.md` Appendix B, by exactly those names: `VOTE_LOST, SORREL, ORIEL, NEITHER, VANE_PRETEND, VANE_ACCEPT, LETTER, LETTER_READ, EMBER_LOST, WREN_HURT, WREN_SCARED, WHISPER_reader/listener/seer/binder, DOOR (FIGHT|BLUFF|WORD|WRIT|SURRENDERED), SURRENDERED, JOURNAL, MEMORY, TAPESTRY, GREY, OATH (0 none,1 KNOT,2 EMBER), OATH_KNOT, LAW0, STAIR (COLLAPSE|HOLD|RUN), VOLUNTEER (0 none, 1..4 by seat), PRECRACKED, BELLS_CRACKED, CLUES, TRUTHS, WALK_UNLOCKED, VANE_ALLY, DECISION, BARGAIN_reader.. (accepted|broken|kept|refused), WALK_reader.. (WALK|STAY), WREN_TRUST, ENDING (0..4), SOLDIERS`.
Helpers: `Store.get(k, default)`, `Store.set(k, v)`, `Store.inc(k)`, `Store.chose(choiceId, optionId)`, `Store.note(text)` (epilogue log). Names by seat: `VigilLore.nick(i)`; seat order is Reader 0, Listener 1, Seer 2, Binder 3.

## 3. Widgets (`puzzle:` types)

All glyph SVG fragments come from `VigilGlyphs.inner('ASH')` (oriented glyph) or `VigilGlyphs.shapeInner('Flame', physicallyInverted)`. A glyph palette for a ring: `VigilGlyphs.names.map(n => ({ id: n, svg: VigilGlyphs.inner(n), label: n }))`. Inscriptions on the Hearth: `VigilGlyphs.inscription([{shape:'Spike', inv:false}, {shape:'Hook', inv:true}], { showMark: false })` (never draw the mark on the Hearth — the Seer's page has it).

- **`ring`** — sigil ring (slot placement). `{ title, note, slots: 4, glyphs: [...], answer: { 3: 'ASH', 4: 'EMBER' } | check(map)=>true|false|'message', allowEmpty, fourHands: true, marks: [{ slot: 1, label: 'mark', color }] (only when the story says the Hearth shows a mark), layout: 'strip', orient, onPlace(glyph, slot), wrongText, maxTries }` → `{ map, tries }`.
- **`wheel`** — click slots in order. `{ slots: [{ id, svg, label }], answer: [ids], layout: 'row', maxLen, submitText }` → `{ seq, tries }`. Use for the shelf (`layout: 'row'`).
- **`dialseq`** — the Founders' Door. `{ dials: [{ id: 'A', label: 'A' }...], glyphs, answer: [{ dial: 'C', glyph: 'THORN' }, ...], maxTurns: 6 }` → `{ turns, tries }`.
- **`seats`** — the vote. `{ seats: [{ id, label, sub, n, locked, lockedText }], max: 2, timer: 360, check(selected) => ({ ok, text, final }), center: 'the basin' }` → `{ selected, ok, tries }`.
- **`grid`** — stealth. `{ cols: 5, rows: 5, cells: ['A1',...], edges: [['A1','A2'],...], doors: { 'A3|B3': { password: 'VEIL', prompt, wrongText } }, start, goal, safe: ['A1','B3'], patrols: [{ name, short, path: [cells for turns 1..12], alarmCell }], alarm: { cells: [...], turns: 3, text }, maxTurns: 12, restEvery, labels: { B3: 'Laundry' }, onSpotted(n), onTimeout(), onCell(cell, turn) (fires when Wren enters a cell; use it for the Laundry whisper prompt) }` → `{ turns, spotted, route }`.
- **`reaction`** — the Bells (lanes). `{ events: [{ t: ms, lanes: [i...], kind: 'single'|'brace'|'all' }], fallMs, windowMs, braceWindowMs, practice, title, target: 0.7, damage, noFail, laneNames, deadLanes }` → `{ hits, misses, total, ratio, passed }`. Build scripted rounds from the design's strings; alternate beats at the round's bpm; `VigilReaction.generateEvents` exists for practice only.
- **`binding`** — the toggle chord. `{ joinMs: 1000, holdMs: 6000, releaseMs: 500, attempts: 3, deadLanes: [], mutedCues: [] }` → `{ success, attempts, releaseSpread }`.
- **`answer`** — typed answers. `{ fields: [{ label, placeholder, len, plain }], accept: [[...accepted per field]] | (values, raw) => bool, wrongText }` → `{ values, raw, tries }`.
- **`dials`** — N cycling dials. `{ dials: [{ label, options: [{ id, text|svg }] }], answer: [ids] }`.
- **`tiles`** — sentence builder. `{ tiles: [{ id, text, cls }], answer: [ids] }`.
- **Four Hands** anywhere: `await VigilRing.fourHands(container, 'text')`.

Every puzzle must be solvable exactly as `docs/DESIGN.md` states, with the hint ladder from the design (tier 3 may simply *state* the placement; where the design says "places it", set `onSolve`-free `check` so the stated answer is accepted). Wrong answers never end the game.

## 4. Companion content

```js
CompanionContent.chapters.push({
  id: 'ch3',                                     // must match VigilLore chapter id; word & cast come from lore
  miniWords: { LINEN: 'speak' },                 // optional extra words -> ctx.mini('LINEN') true; tab to open
  pages: (roleId, ctx) => ({
    sight: [ ...blocks ],                        // the gift pages for this chapter
    wren:  [ ...blocks ],                        // private story beats (no tokens)
    speak: [ ...blocks ],                        // tokens and timed tasks
  }),
});
```
`ctx`: `{ role, roleId, name (first name), flags (decoded cast flags for this chapter, by lore key), cast, mini(word), unlocked(chId), maxChapter, answer(chId, choiceId), state, save, ui, audio, shared, glyphs, lore }`. Blocks may be functions `(ctx) => block` and may carry `if: (ctx) => bool`.

Blocks: `{t:'h', text}`, `{t:'p', text}`, `{t:'fine', text}`, `{t:'letter', text}`, `{t:'whisper', text}`, `{t:'omen', text}`, `{t:'html', html}`, `{t:'svg', svg, cls:'underlayer'}`, `{t:'table', head, rows}`, `{t:'list', items}`, `{t:'glyphs', items:[{svg,label}]}`, `{t:'key', items:[{svg,label}]}`, `{t:'code', label, text}`, `{t:'divider'}`, `{t:'audio', label, strip (html), play(Audio, ctx), text}`, `{t:'reveal', label, blocks}`, `{t:'secret', label, blocks}` (hold to read), `{t:'choice', id, prompt, options:[{id,text}], channel?, after}` (→ token; channel defaults to `lore.channel(id, roleId)`), `{t:'task', id, title, run(box, api), onDone(result, ctx) => blocks, replayable}`, `{t:'note', id}`, `{t:'custom', render(el, ctx)}`.

Token choices: the block `id` must equal the beat name used on the Hearth (`'whisper'`, `'hold'`, `'finale'`), and `options` ids must equal `VigilLore.tokens.*` values for that role. The token shown is `Shared.token(lore.channel(id, roleId), optionId, values)`.

Listener audio: `Audio.init()` is called by the block; play steps with `CompanionAudio.playSteps(Audio, [1, 3, -2, 'rest'])` or a row of glyphs with `CompanionAudio.playGlyphs(Audio, names)` from `js/content/companion/book.js`; arrow strips with `CompanionAudio.strip(steps)`. Heartbeats: `CompanionAudio.heartbeat(Audio, bpm, beats)`; chimes: `CompanionAudio.pulses(Audio, n, gapMs)`. Every player returns the phrase length in ms — a block's `play` should return it too, so the button's *Listening…* state lasts as long as the sound. Schedule chained sounds with `CompanionAudio.later(fn, ms)` so a new press cancels them. Buttons that play something are built with `UI.audioButton(label, onPlay, { cls })`.

The Seer's under-layer: `{ t: 'svg', cls: 'underlayer', svg: VigilArt.underlayer(...) }` or hand-written white-on-black SVG. In every under-layer with Wren and a flame, draw four shadows away from the fire and Wren's toward it.

Persistent pages (lexicon, ladder, ring page, Book of Laws, heartbeats) are in the **Book** tab and are provided by `js/content/companion/book.js`; chapters may add to them via `CompanionContent.bookExtras.push((roleId, ctx) => blocks)`.

## 5. Art

`VigilArt.define('vault', (params) => VigilArt.P.wrap(inner))` using primitives in `VigilArt.P` (`sky, stars, moon, mountains, fog, ground, tower, door, pillars, floorTiles, torch, trees, circleRunes, figures, water, lightBeam`). Canvas is 1600×900, `preserveAspectRatio: slice`. Keep every scene under ~40 KB of SVG; silhouettes with lit edges, no faces; one cold blue for the Cold. Name scenes `chN_<name>`. Set `fx` per scene (`embers, dust, stars, ash, snow, motes, void, rain, none`).

## 6. Audio

Moods: `hearth, tower, wonder, dread, tense, court, sorrow, triumph, void, silence`. SFX: `click, tick, open, success, solved, fail, wrong, chime, boom, whoosh, heart, key, miss, alarm, reveal, unlock, step, magic, seal`. Notes: `VigilAudio.note(midi, dur, vol)`; the ladder's midi values are `VigilGlyphs.MIDI`.

## 7. Writing

Tone: warm and funny at the table, cold underneath. Wren is fourteen, kind, quick, never mawkish; calls players by nickname; slipped and called the Provost "Mum" once. Marrow is precise, tired, never cruel. Vane is courteous and certain. Never state the twist before its chapter (see the clue ladder in the design). Keep Hearth paragraphs short (one to three sentences); the Voice reads them aloud. Each chapter's `code` scene names the chapter's Warden of the Hearth and Voice.

## 8. Testing

- `node tools/check-content.js` — static checks: every `next` exists, every lore chapter registered on both sides, cast round-trips.
- `node tools/run.js ch2_start --shots /tmp/shots` — loads a scene headlessly, reports console errors, screenshots. Add `--flags VOTE_LOST,SORREL` or `--set OATH=1`.
- `node tools/play.js <script.json>` — scripted click-through (see the file header) for full puzzle walkthroughs.
Every chapter must load every one of its scenes with zero console errors before it is handed back.

## 9. Additional engine helpers

- **Midnight clock** (Finale): `Game.clock.start(900, onZero)`, `Game.clock.penalty(30)`, `Game.clock.bonus(60)`, `Game.clock.stop()`, `Game.clock.left()`, `Game.clock.resume(onZero)` (after a reload; the remaining seconds are saved in `flags.MIDNIGHT_LEFT`). It renders in the top bar and persists across scenes.
- **Reaction lanes extras**: `deadLanes: [idx]` (that lane is silent; its events are re-routed to a neighbour), `dark: true` (orbs invisible — the Listener calls the script), `bpm: 60` (shows a large beat counter with a tick pulse; `pulse: false` silences it), `laneNames`.
- **Finale token values**: `VigilLore.finaleValues(flags)` returns the value list for the finale token given cast flags (`WALK_UNLOCKED`, `VANE_ALLY`), or `null` when no token is needed. Both sides must use it.
- **Mini-words**: a `code` scene with its own `code: 'LINEN'` shows that word with no cast; the Companion unlocks it via `miniWords` on the chapter.
- **Hint attention**: widgets pulse the hint bell after two wrong tries; `par` on a puzzle scene also pulses it after N minutes.

## 10. Chapter-local styling and helpers

A chapter may inject its own CSS from its Hearth file (`document.head.appendChild(Object.assign(document.createElement('style'), { textContent: '.chN-foo {…}' }))`), namespaced with `.chN-`. Never edit the shared CSS or JS files. Chapter-specific helper functions live inside the chapter file's IIFE.

## 11. Asymmetry rules for widgets (integrator notes)

- Ring and dial palettes show glyph **names only**; placed glyphs render as shapes. The shape→word lexicon lives on the Reader's phone, so the Warden needs Bookmoth to name what is carved. Do not add shapes to palette tiles.
- A solved widget stays on screen while `solvedText` plays (set `clearWidget: true` on the scene to hide it instead).
- `seats` accepts `keepSelection: true` to keep the current approaches after a non-final wrong check.

## 12. Known seams (documented, by design)

- The CROWN attunement (and so the finale question set on the phones, via `VigilLore.finaleValues`) is fixed **before** Stage 1's decision. If the table then makes Vane stand down, the phones still ask the bargain question; the Hearth voids an ACCEPT in that case and says so. If the table does not choose the Walk, the walk/stay answer is simply not used.
- `BARGAIN_<role>` takes `refused` when a phone answers REFUSE or when a voided ACCEPT is treated as refused.
