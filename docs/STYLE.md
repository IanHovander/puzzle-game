# House style

*What the Fire Keeps* — the writing and puzzle contract for Chapters II–VIII, derived from the two chapters the user has approved (`js/content/ch0.js`, `js/content/ch1.js`, `js/content/companion/ch0.js`, `js/content/companion/ch1.js`).

You are reworking **one chapter**. Chapters 0 and I are the reference; do not change them. Every number below was measured from those four files, and where the three source readings disagreed, the code decided — those places are flagged **(settled)**.

The user's direction, in their own words:

> "Much easier to digest, leads the players through at the level of complexity they can handle at this point. We can leave mysteries open that the reader can handle… Only 5–7 looming questions at a time."
> "This amount of text is often an undue burden on the reader."
> "In the companion app as well, we should lean more on graphics and less on words."
> "The amount of jargon is too much."
> "Ideally text always fits on a reasonable sized laptop screen and you don't have to scroll."

---

## 0. Hard constraints

These are cross-chapter contracts. Breaking one breaks another agent's chapter or the phones. They are not style; they are not negotiable.

**Files you may touch — only these three:**

| | path |
|---|---|
| Hearth | `js/content/chN.js` |
| Companion | `js/content/companion/chN.js` |
| Art | `js/art/scenes-chN.js` |

**Never edit:** `js/core/*`, `js/puzzles/*`, `css/*`, `index.html`, `companion.html`, `js/content/lore.js`, `js/content/glyphs.js`, `js/content/companion/book.js`, `js/content/companion-content.js`, or any other chapter's files. If you need a change there, write it in your report instead. Chapter-local CSS is injected *from your own chapter file*, namespaced `body[data-chapter="chN"]` or `.chN-`, exactly as `ch1.js` lines 8–14 do.

**Flag names are a contract.** `docs/CONVENTIONS.md` §2.9 lists every legal flag. Later chapters read earlier chapters' flags: ch3 reads 18 distinct flags, ch6 reads 11, ch8 reads 11, and **ch7 reads 28 story flags** (`BELLS_CRACKED, BINDING_FAILS, BINDING_LANDED, CAST_FLAGS_CROWN, COLD_HEARTH_ATTEMPTS, DECISION, ENDING, GROUP_NAME, LETTER, LETTER_READ, MIDNIGHT_*, OATH, OATH_KNOT, ORIEL, SOLDIERS, SORREL, STAIR, TAPESTRY, VANE_ACCEPT, VANE_ALLY, VANE_STOOD_DOWN, VOLUNTEER, VOTE_LOST, WALK_UNLOCKED, WITH_HELP, WREN_SHOWN`, …). You may **cut prose about a flag; you may not stop setting a flag, rename one, or change its value domain.** If a rework makes a flag unreachable, say so in your report and leave the write in place.

**Attunement words and casts live in `js/content/lore.js`.** Your chapter's `code:` is `VigilLore.chapter('chN').word`; the cast bit-spec is `VigilLore.chapter('chN').cast`. The Hearth encodes it and the phone decodes it from the same table. Do not change the word, do not add or reorder cast bits, do not redefine a chapter id.

**Token grammar is global.** `js/content/glyphs.js` owns the eight glyph names, their shape/inversion pairs, ladder steps and MIDI. `VigilLore.tokens` owns the SPEAK channels and their legal values. A `{t:'choice'}` block's `id` must equal the Hearth's beat name and its option ids must equal the values in `VigilLore.tokens.*`. `VigilLore.finaleValues(flags)` is computed identically on both sides.

**The Book is shared.** The lexicon, the Ladder, the Ring Page and the Book of Laws are rendered by `js/content/companion/book.js` in the **Book** tab. A chapter page never re-prints them; it says "your **Book**".

**A Law may not be named by number before its `learned:` chapter** in `lore.js`. `L.lawsUpTo(chId)` is the truth.

---

## 1. The box is the budget

`#text` is `font-size: 21px`, `line-height` normal, `padding 22px 28px`, `max-height: calc(100vh - 96px)`. Puzzle, custom and reaction scenes get `.narrow` — `font-size: 18px`, `max-height: 44vh`. The column is `minmax(340px, 560px)`, so ≈ **8–9 words per line and ~18 lines** before the box runs out at 720p.

`UI.fitBox` then silently shrinks the type one pixel at a time toward a floor of `max(14, 0.64 × base)`, and at ≤88 % adds `.tight`, which cuts padding 22/28 → 16/22 and paragraph margins 14 → 9px. **You never see this while writing. The room sees it as smaller type on a TV.** Shrinking is the warning; overflow is the failure.

Measured, `node tools/scan-fit.js ch0 ch1`:

| viewport | ch0 + ch1 (24 scenes) |
|---|---|
| 1280 × 720 | 2 shrunk (`ch0_stone` 21→20, `ch1_vote` 18→15), **overflowing: none** |
| 1152 × 648 | 1 shrunk (`ch0_stone` 21→18), `ch1_vote` overflows by 2.9 px at the 14 px floor |

**(settled)** One reading proposed "no shrink, no overflow at 1152 × 648" as the green build. The reference chapters do not pass that. The real gate is:

- **R1.1 — Ship gate.** `node tools/scan-fit.js chN --w 1280 --h 720` reports **`overflowing: none`**, with **at most 2 scenes shrunk**. `UI.fitBox` will not shrink below **17px** — the game is read aloud from across a room, and smaller than that is not small, it is gone — so a scene that cannot fit above the floor now reports as an overflow rather than quietly becoming unreadable. An overflow is a cut, never a CSS tweak. The same scan reports the puzzle panel, which never shrinks at all: anything it lists as "puzzle panel scrolls" is a palette or a commit button the room cannot see.
- **R1.2 — Stretch check.** `node tools/scan-fit.js chN --w 1152 --h 648` may overflow **at most one** scene, by **under 5 px**. Anything worse is a rewrite, not a CSS tweak.
- **R1.3** A prose scene displays **≤ 6 paragraphs and ≤ 150 words on any one branch**. ch0/ch1 prose scenes run 62–151 words. Count the *worst* branch of a `text: (s) => [...]`, not the average.
- **R1.4** A puzzle brief (`text` on a `type:'puzzle'` scene, which renders in a 44vh box and cannot shrink below 17px) is **≤ 65 words and ≤ 6 paragraphs, each ≤ 18 words**. Calibrated against the 17px floor, not the old 14px one: `ch1_vote` at 8 paragraphs / 86 words overflowed by 84px once the floor was raised, and `ch2_door` at 7 paragraphs by 14px. Both now fit at full size. Four of those paragraphs are the four role prompts, so the brief has room for two lines of its own — one to say what the puzzle is, one to say what a wrong answer costs. Everything else belongs in the rule card.
- **R1.5 — Chapter prose budget: 1,100–1,600 words.** Count it with `node tools/prose-count.js chN` — that tool is the authority, and `node tools/prose-count.js` with no argument prints every chapter. As it stands: ch0 1,092 · ch1 1,396 · ch2 2,061 · ch3 2,284 · ch4 2,280 · ch5 2,270 · ch6 2,328 · ch7 3,533 · ch8 1,569. Most chapters must lose 30–45% of their words; ch7 must lose more than half. `node tools/prose-count.js chN` also breaks the chapter down by scene, worst first, and marks any scene over the 150-word cap.

Chapter-local CSS is a legitimate part of the fit budget. `ch1.js` shrinks `.table-area` to `min(380px, 50vh)` with a `@media (max-height: 820px)` step to `min(300px, 42vh)`, and un-monospaces `.pz-status` / `.pz-note` so the rule card reads as prose. Copy that pattern; namespace it to your chapter.

---

## 2. Sentences: one idea each, no stacking

The medians are identical across good and bad chapters — **the difference is entirely in the tail.**

| | ch0 | ch1 | ch2 | ch4 | ch6 | ch7 |
|---|---|---|---|---|---|---|
| median sentence (words) | 6 | 6 | 8 | 5 | 7 | 6 |
| 90th percentile | 15 | 14 | 22 | 16 | 22 | 19 |
| longest | 30 | 21 | 39 | 44 | 118 | 40 |
| semicolons in prose | **0** | **0** | 14 | 8 | 21 | 14 |
| commas / 1000 words | 54 | 38 | 67 | 51 | 64 | 56 |

- **R2.1 — Zero semicolons in player-visible prose.** ch0 and ch1 have none. Split the sentence.
- **R2.2 — Longest sentence ≤ 25 words.** **(settled.)** ch1's longest is 21. ch0's longest is 30 and is the one documented exception: *"Four hundred years, and it needed all four of you: one to read it, one to put it in order, one to find the cuts, one to know the rule."* — a four-part **parallel list of things the table already knows**, at the moment of triumph. You get **at most one** such sentence per chapter, and it may not introduce a fact.
- **R2.3 — 90th-percentile sentence ≤ 15 words.** This is the rule that actually does the work; the median will take care of itself.
- **R2.4 — At most two commas in a narration sentence.**
- **R2.5 — At most one em-dash pair per paragraph, and it may only carry emphasis or a beat, never a new fact.** The commonest failure in ch2–ch8 is the teaching appositive: *"Master Tarn — Ear-Sighted, Crown-coined since the Vigil — leads the guards"* smuggles two coinages and a callback through a dash.
- **R2.6 — No sentence introduces more than one thing the reader must retain.**

**Before** (ch4_start, 41 words, six new nouns, one simile):

> 'The Provost's study, at the top of the Bell Tower's third turning: four walls of books, a fire, a tapestry the width of the wall, and a desk with a primer lying open on it, as if someone had been interrupted.'

**After** (ch1_start does the same job in 20 words, two sentences, one new noun):

> 'Nine banners in the rafters, one for each House. Under each banner a chair, and in each chair a Master.'

**After** (ch0_dorm, 17 words):

> 'Four of you, awake past curfew, in a room with four beds and one round window.'

---

## 3. Proper nouns

ch0 introduces 6 names that matter. ch1 adds 8. ch7 currently uses 79 distinct capitalised nouns.

- **R3.1** A scene introduces **at most 2 new proper nouns**; a chapter **at most 6**.
- **R3.2** Introduction form: **name + what they are, ≤ 12 words, in its own sentence.** Never as an apposition inside a longer sentence.
- **R3.3** A name unused for more than one chapter is **re-introduced in ≤ 8 words on first reuse** ("Master Tarn, the Ear who took Crown coin").
- **R3.4** A callback to an earlier chapter **restates the fact it depends on, in the same sentence.** Two hours have passed. "You told me in the laundry" and "in the same words as in the study" are not recallable.
- **R3.5** Speaker labels use the **full introduced form** — ch1 says `speaker: 'Provost Marrow'` in 8 of 8 lines; ch4 and ch7 say `'Marrow'` in all 17 and all 24. Let the prose shorten a name; never the label. Bare surnames in prose only after the full form has appeared in the same chapter.

How ch0/ch1 actually do it:

> 'Lord Vane, the Crown's Envoy.'
> 'That is the Provost. She runs this school, and she is the nearest thing Wren has to a mother.'
> 'Tonight is the Vigil: the night the Houses come to look at the child the fire left.'
> 'Under this school the Founders left the Cold Ember. If the fire goes out, the Ember lights it again.'

And when a new person must be remembered, attach them to a **number the table is already holding**:

> 'Seat 1 is Master Sorrel. Seat 7 is Master Oriel. They voted for you and would like that noticed.'

Where a name is used cold, cover it in the next line rather than explaining it: `'I have come down the road you bricked up.'` needs `'Nobody knows what that means. Her face does.'` — which is exactly what ch1_vane does after Vane uses the Provost's given name.

---

## 4. Jargon: defined on use, or deferred

ch0/ch1 define every term at the moment of first use, in plain words, and never use a second unknown term to define the first.

> 'A sigil is words in slots. This ring has four slots.'
> 'The school has a word for what each of you just did. A Sighting. One way of seeing, one to a person, and nobody chooses which one they get.'
> 'You cannot walk into weather. The Cold is a place, and nobody will tell you where.'
> '…goes into the next slot **sunwise** — clockwise, the way the numbers count up.'

They also **substitute plain English for system vocabulary and pay the real word off later**. ch0's lamp puzzle needs Law 1, Law 10 and two glyph names. It says instead:

> 'The Reader has the words. The Listener has the order. The Seer has the **cuts**. The Binder has the **rule**. Nobody has two.'

and only after the puzzle, once, in `cls:'small'`, as a reward:

> 'ASH, EMBER. *Fire, keep.* That is all it ever said.'

- **R4.1** A term is **defined in the sentence that first uses it, in ordinary words**, or it does not appear. No Law named by number before its `learned:` chapter, and even then the prose says what it *means*, not its number.
- **R4.2** **No definition may use another undefined term.** ("turned" → "widdershins" → "from its mark" is three unknowns deep.)
- **R4.3** **Chapter working vocabulary ≤ 3 system terms.** Everything past that gets a plain-English stand-in — *the cuts*, *the rule*, *the order*, *filed*, *asks*, *sworn*, *bought*, *out of reach* — and the real word arrives later, once.
- **R4.4** Hint tier 1 says **who holds what**, in no jargon at all (see §10.6).

Inventory to attack across ch2–ch8: *sunwise, widdershins, the mark / the first mark, turned line, the lock, the sworn-to, Idony's Law, "the 212 page", Law 0/4/6, the Hymn and its rest, the older alphabet, memory-bell, the Sealing, the Fourfold Walk, Ear-Sighted, Crown-coined, the Founders' road, the rim*, and the eight glyph names used as if they were common nouns.

---

## 5. Open questions, and the ledger

The standing direction is **5–7 looming questions at a time**. ch0 ends with five. ch1 closes one, opens three, and resolves its own vote inside its own chapter.

- **R5.1** A chapter carries **≤ 7 open questions**, opens **at most 3**, and closes **at least as many as it opens**.
- **R5.2** A scene raises **one** new question. If it raises a second, cut one.
- **R5.3** `flow.stats` is the ledger and reads as **plain sentences — at most three, no ` · ` separators.** ch0 is one sentence; ch1 is three. ch7 currently joins six `**bold**` fragments with dots, which reads as a scoreboard.
- **R5.4 — Retire the meta-questions.** A player worrying about note-taking is not following the story. Answer each procedural worry **once**, in `cls:'small'`, and never again:

> 'You will be shown this sentence again, when it matters. Nothing tonight needs writing down.'
> 'Your phone keeps everything it shows you — in the **Book** tab, all night. You will never have to remember it.'
> 'After each chapter the Hearth shows you every path — the ones you walked, and the ones you did not.'

Never do the reverse: a 40-word procedural correction dropped into `stuckText` on a table that is already lost is the worst line in the game.

---

## 6. Dialogue: one speaker per box, written in runs

`UI.buildPara` tracks `st.speaker`. Consecutive paragraphs from the same person get `.cont`, the previous gets `.joined`, and **only the first prints the gold uppercase `.speaker` label** — the rest are carried by the 2 px left rule. Continuity survives across calls into the same box (`container.__tw`), so a choice's `after:` reply continues the run.

ch0 uses this completely: `ch0_wren`, `ch0_dare`, `ch0_carve`, `ch0_name` are 5–7 Wren lines each = **one label per scene**. ch1 keeps 8 speech scenes at 1–2 labels each. ch4_sworn is 6 lines / 2 people / **6 labels**; ch7_vane puts 3 speakers and 4 labels in one box.

- **R6.1 — One speaking character per scene wherever possible; two is the maximum.** Three needs a scene break.
- **R6.2 — Write dialogue in runs.** All of one person's lines consecutive. **≤ 2 speaker labels per box.** Never narration / speech / narration / speech.
- **R6.3 — A speech line is ≤ 30 words.** ch0's longest is 27.
- **R6.4** A choice's `after:` continues the speaker already running, so the reply lands inside the same rule ("Wren: Grand." / "Master Sorrel: Good. See that you keep yours.").
- **R6.5** Speaker labels are stable within a chapter and use the introduced form (R3.5).

---

## 7. Capitalisation and markup carry meaning

In ch0/ch1 these conventions are consistent enough to be load-bearing. Breaking them destroys a signal the table is relying on.

- **ALL CAPS = a token the table types, presses, or places.** KINDLE, WREN, ASH, EMBER, KEEP/SEND, glyph ids. **Nothing else.**
- **Initial capital = a named thing in the world.** the Hearth, the Cold, the Vigil, a Sighting, the Houses, the Chair, the Convocation, the Companion, the Book.
- **`**bold**` = an instruction the table must act on.** Nothing else.
- **`*italics*` = spoken stress only.**
- **`cls` vocabulary, as actually used:**

| cls | means | ch0 | ch1 | ch7 |
|---|---|---|---|---|
| `whisper` | a table instruction (sea, italic) | 10 | 10 | 18 |
| `small` | meta-reassurance (0.8em, dim) | 6 | 1 | 0 |
| `center` | the cold open only | 6 | 0 | 3 |
| `omen` | the one line of prophecy | 1 | 0 | 2 |
| `big` | — | **0** | **0** | **8** |

- **R7.1** ALL CAPS only for something the players will type, press, or place. ch7 currently uses it for choice labels ("LET WREN WALK.") in boxes that also hold KNOT and EMBER as placeable tokens; that must go.
- **R7.2** Choice-button labels use **sentence case**; `.btn.choice` already carries the emphasis.
- **R7.3** `cls:'big'` **at most once per chapter**, for a single moment. `cls:'center'` for a cold open only. `cls:'omen'` for prophecy only.
- **R7.4** `**bold**` **≤ 2 spans per scene** (ch0 = 9 spans across 14 scenes; ch1 = 13). `*italics*` **≤ 10 per chapter**.
- **R7.5 — `the Reader` / `the Listener` / `the Seer` / `the Binder`, always lower-case article.** Grep gate: `grep -c "[a-z,;—] The \(Reader\|Listener\|Seer\|Binder\)" js/content/chN.js` → **0**. Today: ch0 0, ch1 0, ch2 1, ch3 1, ch4 7, ch5 2, ch7 5.
- **R7.6 — The `roles:` line reads `Warden (keyboard): **the Role**. Voice (reads aloud): **the Role**.`** ch0/ch1 use exactly that; every other chapter says `Warden of the Hearth (keyboard): **The Seer**.` Shorten it and lower-case the article.

---

## 8. Instruction lines: one job, one line, one name

**After** — `ch1_vote`, one job per line, each addressed to a role, each ≤ 8 words:

> 'Reader — who is already pledged.'
> 'Listener — who is still talking about it.'
> 'Seer — who cannot be moved by anybody.'
> 'Binder — who is sworn to whom.'

**After** — `ch1_attune`, 18 words total:

> 'Open the Companion. Take your seat. Type the word on the lintel.'
> 'Read your page. Say nothing yet.'

**Before** — `ch4_attune`, same beat, 33 words, the instruction buried behind a subordinate clause and a colon:

> 'Cut into the mantel above the fire, where four hundred years of smoke have not quite hidden it: a word, and a mark beside it. Each of you — your Companion, the word, the mark.'

- **R8.1** One instruction per line, prefixed with the role name and an em-dash: `'Reader — …'`.
- **R8.2** ≤ 10 words per instruction line, imperative mood, no subordinate clauses.
- **R8.3** Instruction and fiction never share a sentence.
- **R8.4 — The house rule appears exactly once per chapter, verbatim from `VigilLore.houseRule`** ("Say what you see. Never show your phone."). **(settled — one reading made it a per-puzzle constant; it is not.)** ch0 puts it on the table-talk puzzle brief as `cls:'whisper'`; ch1 puts it on the Companion **Speak** page as `{t:'fine', text:'*'+L.houseRule+'*'}`. Pick one. Do not paraphrase it and do not repeat it.
- **R8.5** "Stuck? The fire keeps a Hint." is a **Prologue-only** line — it teaches the hint bell once. Do not add it to your chapter. The bell announces itself: `par` pulses it on a timer and every widget pulses it after two wrong tries.

---

## 9. Pacing — the typewriter is real time

`UI.typewrite` sleeps `speed` ms every second character (9 ms default), ×6 on `.` and `—`, ×2.5 on `,`, plus `paraPause` 180 ms per paragraph.

- `ch0_start` — 64 words, 6 short paragraphs → **≈ 4 s** to the button.
- `ch7_ending` at E=0 — ~330 words, 9 paragraphs, several 43–47-word sentences → **12–15 s** of characters crawling out before anyone can act, in a silent room.

**R9.1 — No scene exceeds ~8 s of typewriter time: ≤ 150 words at `speed: 9`.** Short sentences cost more punctuation pause but give the room landing points; long sentences cost the same and give none. Raise `speed` only for a deliberate effect (ch0's cold open uses 13).

---

## 10. Puzzles

### 10.1 The rule is a rule card, not narration

Both `ring.js` and `seats.js` render `cfg.note` as `.pz-note` **inside the puzzle box**, under the title, above the board — it stays on screen for the whole puzzle. Scene `text` is typed once into `#text` and is narrative and who-does-what.

- **R10.1** If a player asks "wait, how does this work?" mid-puzzle, the answer must be readable **without scrolling and without leaving the widget**. That means it is in `note` — not in `text`, not in the previous scene, not in a hint. ch3's actual movement/detection/turn rules are 136 words in `ch3_corridors`, gone from the screen the moment the board appears; ch6's calling protocol does the same. Both must move into `note`.
- **R10.2** `note` is **one paragraph, ≤ 60 words**. Measured: `ch1_vote` 58, `ch0_lamp` 21.
- **R10.3** The rule is **attributed to somebody in the room and quoted.** Italic = spoken aloud; `**bold**` marks the operative tokens:

> `'The Chair reads out the rule: *Five of nine keeps the child. You may ask **two** Masters. A Master you ask votes **KEEP** — unless they will not hear you, you cannot reach them, or the Crown has paid them. A Master sworn to another votes as that Master does, unless you ask them yourself. Everyone else votes **SEND**.*'`

- **R10.4** State the conditions **in the order they fire**: win condition, budget, default effect, exceptions, propagation, fallback. A reader holding only the card must be able to compute any position.
- **R10.5** Closed, tiny vocabulary: **≤ 2 verbs, ≤ 2 states, one number set.** No proper nouns anywhere on the puzzle surface — **identities are integers or role names.** ch1 says "Seat 1", "Seat 7", "the Chair" and never a Master's name; house names ride along as banner *images* only. ch3 currently exposes Hob, Bess, Marrow, VEIL/THORN and A1–E5; ch6 exposes B/H/O/K lane letters and Halvard's bell.
- **R10.6** The scene text tells the table **what shape the answer is** before they start: *"You do not need nine names. You need two numbers."* / *"A sigil is words in slots. This ring has four slots."*

### 10.2 One fact per role, and the partition is a data structure

- **R10.7** Each role's fact is a **separate named constant** in the chapter file with the owning role in an end-of-line comment:

```js
const PLEDGED = ['marrow','brack'];                 // Reader
const DEAF    = ['hallan'];                         // Listener
const BLOCKED = ['orrin'];                          // Seer
const BOUGHT  = ['vey','tarn'];                     // Seer
const FOLLOWS = { quill:'sorrel', hallan:'orrin' };  // Binder
```

- **R10.8** **No page holds another's fact**, and each page **names the gap it leaves** in its closing `fine` block (see §11.3).
- **R10.9** Each page states its fact as a **countable claim plus the sentence to say out loud**: *"**So you begin with two.** Say the number out loud. You need five."*
- **R10.10** The Hearth board shows **only what all four can see**. `seatCfg()` emits banner + number + label and nothing about pledges, threads, coins or the soldier. Ring and dial palettes show glyph **names only** (`class:'glyph name-only'`) — the shape→word lexicon is the Reader's.
- **R10.11** The scene text enumerates the four contributions **in seat order, one line each, ≤ 8 words**, and says **when** to speak: *"Each of you says your one thing out loud, before anybody crosses the floor."*

### 10.3 Four-handed by construction, and proved

Two meanings, both required.

**(a) Informational.** The answer is not derivable from any three pages. This is *proved*, not asserted, because the solve rule is a **pure function of the committed input** living in the chapter file (`tally(selected)`, `ch1.js:31–39`). Drop a role's constant and re-run it.

**(b) Physical.** `ring.js` exposes `fourHands: true` / `fourHandsText`, which after a correct answer demands all four keys inside 1000 ms. `ch0_lamp`: `fourHandsText: 'FOUR HANDS — all four keys, within a second'`. Where the widget has no such hook, make it social: `max: 2` asks against four private facts cannot be spent by one player holding the mouse.

**R10.12 — Record the search.** Above the data, a comment stating the uniqueness result *and* the drop-a-role result, as `ch1.js:19–24` does; and the enumerated search space in the commit message. **If the answer space is too big to enumerate, the puzzle is too big.**

Re-verified against the live `tally()`: of all 8 askable seats, **`{1,7}` is the only 2-seat winner** (keeps 1,2,3,7,9 = five), and all six 3-seat winners contain it. Drop the Reader → 3 looks worth asking → wrong pair. Drop the Listener → 1+2 or 1+4 look identical to 1+7 → wrong pair. Drop the Seer → 5, 6, 8 look neutral → wrong pair. Drop the Binder → they may stumble onto {1,7} but count only 4 keeps and do not believe they have won → stall.

### 10.4 A wrong answer names the rule that stopped it

- **R10.13** Every wrong option has a **prepared, keyed** response that restates the clause of the rule card that killed it. `REASONS` in `ch1.js` is a 9-entry map, one line per seat:
  - Seat 4 → *"I vote as my cousin votes. I hear nobody else."* (won't hear + sworn)
  - Seat 5 → *"Something at Seat 5's cuff catches the light. Seat 5 votes SEND."* (bought)
  - Seat 6 → *"A soldier in the Envoy's grey steps between you and Seat 6."* (can't reach)
  - Seat 3 → *"…in writing, since before the doors shut. You had him already."* (pledged)
- **R10.14** The same lines are **replayed on the winning path** (`check()` and `solvedText()` both walk `REASONS`), so a right answer also teaches why it was right.
- **R10.15** A failed commit prints an **arithmetic receipt**, not a verdict: `` `${reasons} ${count} Four is not five. The vote has been called.` ``
- **R10.16** An **impossible** action refuses itself with its reason *before it costs anything*: `locked: true` + `lockedText: 'The Chair does not hear cases. The Chair counts them.'`; `ring.js` rejecting a glyph with "Choose a slot first."
- **R10.17** The generic `wrongText` says what the **world** did, not that you were wrong: *"The brass stays cold. The ring forgets what you put in it."*
- **R10.18** `onWrong(map, tries)` escalates at try 2 with a **procedural** nudge, not a content hint: *'Wren, unhelpfully: "Has everyone actually said their bit?"'* — the second failure suspects a player who has not spoken, which is the real failure mode.
- **R10.19** **Under-commitment is coached, not punished**: `if (selected.length < 2) return { ok:false, text:'One Master spoken to. You may have one more.' }`.
- **R10.20 — Two legal failure semantics, and never a dead end.**
  - *Retryable* (sigil rings): clear the board, shake, escalate text, light the hint bell at `tries >= 2`.
  - *Commit-once* (a call the fiction says happens once): `check()` returns `{ok:false, final:true}`, the widget finishes, and the scene forks — `next: (s,r) => r && r.ok ? 'ch1_won' : 'ch1_lost'`. A commit-once puzzle **must** have a written losing branch, a flag, and a `Store.note(...)`. It must never re-prompt.

### 10.5 Decoys are made safe by being *already won*

`ch1_vote`'s Seat 3 is the model:

1. The **Listener** hears Seat 3 begging: *"Ask me where I stand. Go on. Ask me."* — the loudest ask on the board.
2. The **Reader** sees Seat 3 already filed KEEP in writing, plus the flat warning: *"an ask spent there buys a vote you have."*
3. The trap is defused by **two players talking to each other** — exactly the behaviour the puzzle exists to cause, and the reason the Reader is load-bearing.
4. Falling for it costs **one budgeted resource**, and `REASONS.brack` teaches the rule.

ch0 is the same shape: the Seer reports **two** cuts and is told which one matters is not hers to know; only the Binder's rule picks the scratch. The Reader's collar art puts the two shapes in the **reverse** of answer order, so left-to-right reading fails and the Listener's interval is needed. And `allowEmpty: true` invites four glyphs when the answer uses two.

**R10.21 — Decoy test.** For each decoy name (a) which role's page makes it tempting; (b) which **different** role's page disarms it in one sentence; (c) that the wrong action costs at most one budgeted resource; (d) that the failure text states the rule. **If (b) is the same role as (a), it is not a decoy, it is a trick.**

### 10.6 Hints: exactly three rungs, fixed meanings

`Game.showHint()` labels rungs `Hint N of (n−1)` and labels the **last** rung "Reveal the answer (last resort)" with `class danger`.

| rung | job | ch0_lamp | ch1_vote |
|---|---|---|---|
| 1 | **Re-partition.** Who owns what. Gives away nothing. No jargon at all. | "Four answers, four people, and nobody has two. Which words — the Reader. What order — the Listener. What is cut under the brass — the Seer. What a cut means — the Binder." | "Four questions, four people: who is pledged (Reader), who is still talking (Listener), who cannot be moved at all (Seer), who is sworn to whom (Binder)." |
| 2 | **The insight, in the abstract.** Names the trick with no coordinates. | "Two words, and the hum climbs three steps between them… there is more than one cut under the brass — the Binder knows which kind starts a sigil." | "You start at two, you need five, you get two asks. So one ask has to carry two votes — the Binder knows which one." |
| 3 | **The answer, literally, plus the commit step.** | "ASH in slot 3, EMBER in slot 4. The other two stay empty. **Then four hands.**" | "Seat 1 and Seat 7. Seat 1 brings Seat 2 with her. With the Chair and Seat 3, that is five." |

- **R10.22 — Exactly three rungs.** ch3_grid has four, of which the last two are both answers. Fix that.
- **R10.23 — Rung 3 always includes the ritual/commit action**, so a table that reveals the answer still performs the puzzle.
- **R10.24 — Hints are pushed, not begged for.** Set `par` to roughly one mark per rung: ch0 `par: [3, 6]`, ch1 `par: [3, 4.5, 6]`. The engine pulses the bell and toasts.
- **R10.25 — A clock never hard-fails before the ladder is spent.** `ch1_vote` has `timer: 360` (= the last par mark). `onTimeout` does **not** lose the puzzle: it sets `hintsUsed.ch1_vote = 3` (the whole ladder), flashes the bell, plays `boom`, and prints the stall line; `check()` consumes the stall flag once and returns non-final. The clock is a scene beat plus a hint unlock, never a guillotine.
- **R10.26 — No motor-skill tips or options-menu adverts in the ladder.** ch6's rung 1 is a "press faster" tip and rung 2 advertises the slow-bells toggle; neither re-partitions the roles, because that puzzle is not partitioned. Partition it, or accept that it is a reflex round and give it a `note` and a `practice` pass instead of a hint ladder.

### 10.7 An attunement scene immediately before the puzzle

A `type:'code'` scene that (a) assigns the two live jobs by role — `roles: 'Warden (keyboard): **the Binder**. Voice (reads aloud): **the Listener**.'` — and (b) tells players their phone keeps everything. **Nothing in a reworked puzzle may require memorisation across scenes.**

---

## 11. The Companion

`body.companion` is 18 px with 18 px panel padding. On a 390 px phone that is **~7 words per line, ~130 words per screenful**, or ~85 once a figure is on screen.

### 11.1 The header comment is the spec

Both approved files open with one sentence naming all four facts:

```js
/* Companion — Prologue (KINDLE). Four pages, one puzzle fact each: the Reader has the words,
   the Listener the order, the Seer the cuts, the Binder the rule. No page holds another's answer. */
```

**R11.1 — Write that comment before writing the pages.** If the chapter's four facts cannot be written as one clause each, the split is wrong and no amount of prose will fix it. ch5's header is a flag list, not a fact split, and the pages read accordingly.

### 11.2 Length budgets

Measured (all rendered text, including table cells, list items, captions):

| | ch0 | ch1 | ch5 | ch7 |
|---|---|---|---|---|
| Sight, words per role | 108–225 | 75–108 | 220–319 | 165–404 |
| Wren, words per role | 48–73 | 50–63 | 74–109 | (in `letter` blocks) |
| `{t:'h'}` per Sight page | **1** | **1** | 3–5 | 2–3 |
| blocks per Sight page | 6–10 | 5–9 | 15–18 | 6–13 |

- **R11.2 — Sight page: target ≤ 120 words, hard cap 160.** **(settled — ch0's Reader page at ~225 is the single outlier in either reference chapter and is not a licence.)**
- **R11.3 — Wren page: 40–75 words.**
- **R11.4 — Speak page with no token: 10–20 words.** (`'Nothing to speak yet. The Hearth will tell you when.'`)
- **R11.5 — Exactly one `{t:'h'}` per tab.** Both reference chapters have exactly one heading on every Sight page and one on every Wren page. **Multiple headings mean multiple facts** — that is the diagnostic, not a style preference.
- **R11.6 — 5–10 blocks per Sight page. No text block over 45 words. At most one sentence over 22 words in the whole file.**
- **R11.7 — No pagination.** ch5 stamps `~~page i of n~~` markers onto its Sight pages. A page counter is proof the page is too long: delete the counter *and* the surplus.
- **R11.8 — Sight-page block whitelist:** `h · p · fine · table · list · html · svg · audio`. Nothing else. `reveal`, `secret`, `divider`, `note`, `key`, `glyphs`, `code`, `task`, `custom` belong to **Speak**. A `reveal` on a Sight page is usually a paragraph the author could not bear to cut.
- **R11.9 — Jargon budget ≤ 15 tokens per chapter file across all four role pages**, each glossed in ordinary words in the same sentence on first use. Counting *sunwise, widdershins, inscription, glyph, inverted, upright, turned, sigil, slot, Law N, \*-Sight*: ch0 = 14 (with `sunwise` glossed inline), ch1 = 3 (all in code comments). ch2 = 46 · ch3 = 25 · ch4 = 45 · ch5 = 90 · ch6 = 58 · ch7 = 83. Prefer the ordinary word outright — ch1 says *filed*, *asks*, *sworn*, *bought*, *out of reach* and never says *sigil*.
- **R11.10 — Branch on at most one cast flag per page**, and a branch **swaps a sentence** — it does not add a section. ch5 branches on five and grows a whole extra page-set.

### 11.3 Each page states its fact, its cost, and its gap

**The fact** — bolded, within the first three blocks, one sentence:

> '**So you begin with two.** Say the number out loud. You need five.'
> 'So **Seats 1, 3 and 7 are still open to being talked to.**'
> 'Bought, bought, out of reach. **An ask spent on 5, 6 or 8 is spent.**'
> '**Two notes. Two words.** That is everything this lamp has to say.'

**The cost** — a flat present-tense sentence, ≤ 20 words, in the currency the table actually spends, immediately after the fact. Never "be careful", never a consequence in the fiction:

| currency | statement |
|---|---|
| a wasted ask | 'And **Seat 4 has shut his ears.** He means it. An ask spent on him is spent.' |
| an ask that buys nothing | 'And Seat 3 is already yours… an ask spent there buys a vote you have.' |
| a wrong sigil | '**One slot per word. Any slot the words do not reach stays empty.** A spare shape is not decoration; it is a different sigil, and the brass can tell.' |

State the **payoff** side too where there is one: *'So **one ask can be worth two votes**: ask the Master at the top of a thread and the one below comes too.'*

**The gap** — the last `fine` block on every page names what it cannot see, and the *gift* needed, never the answer:

> 'The brass cannot tell you which of them comes first — a circle has no beginning. Somebody at this table can *hear* which one does.'
> 'Which one matters is not yours to know — that is the Binder's half of the job. Just say what is cut, and where.'
> 'You cannot see who is pledged, who will listen, or who has been paid. Ask.'
> 'He never says who his cousin is. Somebody here can see that.'

**R11.11 — Cross-check the bold tokens on all four Sight pages.** Shared *coordinates* are allowed (ch1 uses "Seat 3" on both the Reader's and the Listener's page). Shared *predicates* are not: each page says a different thing about the same coordinate, and neither is sufficient alone. **The union of the four pages must be exactly sufficient — remove any one page and the table cannot solve it.**

### 11.4 When a fact becomes a drawing

A fact becomes a picture when it is one of these four shapes. Otherwise it stays prose.

1. **Spatial** — a ring, a floor plan, who-sits-where. Always drawn; prose about position costs 3× the words and stays ambiguous.
2. **A counted relation** — an interval, a count, a direction of travel. (`ladder3` draws "+3" as two rungs and an arrow.)
3. **Parallel states across people** — threads whole/broken/absent, heartbeats normal/fast/flat. A row of tiny inline SVGs, one per person, inside `<ul class="blk-list">` or `.heartbeats`. `threadLine('whole'|'broken'|'none')` is 74 × 14 px and sits inside an `<li>` next to bold text.
4. **A lookup (shape → word)** — a `table` whose **head row is the question**: `head: ['cut into the band', 'it says']`, `head: ['filed', 'and it says']`.

Audible facts get an `audio` block whose `text` field **restates the same fact in writing** — `companion.js` already appends "Everything you would hear is also written on this page," so the written line is mandatory, not optional.

**Two registers:**

- **Under-layer (Seer only)** — `{ t:'svg', cls:'underlayer', svg: … }`, white line-work on a filled black rect, `viewBox` 360 × 220–300, **one violet accent (`#a482e6`)** for the single thing that matters, captions at `font-size 8–10`, `font-family="Cinzel,serif"`.
- **Inline figure (every other role)** — `{ t:'html', html: fn() }`, small, in the role's own colour (Reader `#f2d27a`, Listener `#4fb3bf`, Binder `#d96b4a`), with an explicit `style="width:…px;height:…px"` so it never eats a screen.

**Drawing rules:**

- **R11.12 — A figure replaces a paragraph; it never illustrates one.** If you can delete the figure and lose nothing, it is decoration. If you can delete the paragraph and lose nothing, delete the paragraph.
- **R11.13 — Every figure has a caption, ≤ 10 words, in plain words, stating the fact or its scope.** From the reference: *the band runs all the way round · no first, no last* · *first word in it, then clockwise* · *shadows, as they fall* · *the nine seats, from above* · *a scratch — long, deliberate* · *red, knotted — sworn. Two threads in the whole hall.*
- **R11.14 — One accent colour per figure**, marking the one thing that matters. Everything else white or dim.
- **R11.15 — Labels reuse the Hearth's coordinates** (seat numbers, socket numbers, role names). A figure that introduces a new proper noun has become a second fact.
- **R11.16 — The geometry enforces the separation.** `collar` is drawn as a *ring* so the page cannot imply an order, with Crown left and Flame right — the reverse of the answer, so reading left-to-right fails. `underFoot` shows two cuts, **no arrow and no rule**, because the meaning is the Binder's. Put that reasoning in a code comment above the helper, as both files do.
- **R11.17 — At most one figure per Sight page.**
- **R11.18** In every under-layer with Wren and a flame, four shadows fall **away** from the fire and Wren's falls **toward** it (`docs/CONVENTIONS.md` §4).

### 11.5 Wren tab vs Sight tab

| | **Sight** | **Wren** |
|---|---|---|
| purpose | tonight's puzzle fact | one private anomaly this gift alone can notice |
| length | ≤ 160 words | 40–75 words |
| structure | `h` + 1–3 `p` + 1 figure/table/list + closing `fine` | `h` + (0–1 figure) + 1–2 short `p` |
| bold | yes — the fact, the cost | none |
| numbers the table needs | yes | **never** |
| a cost line | required | forbidden |
| tokens / choices / tasks | no (Speak) | never |
| ends with | an instruction to speak — *'Say them both, out loud, now.'* | nothing to do; no instruction |
| engine footer | `'— end of your Sight for this chapter —'` (automatic) | none |

- **R11.19 — The same anomaly, seen four ways.** ch0: the name on the door (Reader), the missing heartbeat (Listener), the shadow (Seer), the absent thread (Binder). Four independent observations, no shared vocabulary, no page confirming another. The table cross-confirms by talking; no single page spoils it.
- **R11.20 — Every Wren beat is a fact plus the excuse the player already made for it.** The refrain is explicit and shared:
  > 'You decided, a year ago, that somebody was being funny. You have never asked who.'
  > 'You decided years ago that the fault was yours, and you have never said it out loud to anyone.'
  > 'You decided months ago it was a trick of the light… It is not the light. It never was.'
  > 'You decided it was a blind spot in your own gift. You have never told anyone your gift has a blind spot.'
- **R11.21 — One new question per role per chapter, maximum**, and it must be answerable later. If a chapter's Wren page adds nothing new, restate the same anomaly in one sentence and stop — as ch1's Seer page does in 25 words: *'In the dormitory you blamed the lamp. There is no lamp here, and Wren's shadow still falls towards the fire.'*

### 11.6 Role voice — what each role may perceive

From `lore.js` (`what:`) and enforced page-by-page in ch0/ch1. **A page written in the wrong voice is the commonest failure.**

**Reader — Glyph-Sight — *WHAT*.** May state: what is written, in words; that a carving the Hearth shows worn is clean on this page; the shape→word lookup. May **not** state: order, position, which end anything begins at, whether a line is turned, what anything means for the ring. ch0 denies direction outright: *'The band is a circle. It has no left end and no right end.'* Gold `#f2d27a`; two-column `table` lookups.

**Listener — Ear-Sight — *WHEN / the order*.** May state: intervals, counts, contours, overheard speech, heartbeats. May **not** state any word's name or any absolute pitch — this is written into the page, not merely implied: *'You never hear a word's name. Every room is tuned differently… you only ever hear how far the tune steps. You will need the Reader.'* So a Listener fact is always a **relation**: `+3`, *up one then down two*, *three taps*, *still talking / has shut his ears*. Sea `#4fb3bf`; `audio` + `CA.strip(steps)` + the same fact in `text`. Heartbeats (`D.trace(...)`) live here and nowhere else.

**Seer — Under-Sight — *WHERE*.** May state: cuts (scratch, notch, chip), marks, sockets, doors under plaster, older paint, what is behind or beneath, which way every shadow falls, who is physically unreachable. May **not** state what a cut obliges, what a word says, or what any of it means. *'No carving, no arrow, no rule — the Seer reports cuts, not meanings.'* Violet `#a482e6` on black.

**Binder — Thread-Sight — *WHETHER*.** May state: the Laws (dated, as `.laws > .law.founders|.order` cards) and the threads between people (red oath, gold Crown, grey grief, none). May **not** state any word, any cut, any order. The Binder holds **rules, not data**, which is why the Binder page most often needs cutting: ch0's is 187 words for four numbered rules, and that is the ceiling. Red `#d96b4a`.

Negative example to avoid: ch5's Seer page says *'Where a turned line is placed around a ring — sunwise or the other way — is not yours to see. The Binder has two Laws about it.'* Correct instinct, but the page has already used *turned, sunwise, upright, mark, slot*, so the Seer is teaching the Binder's Law in order to disclaim it. **State the physical fact, give the coordinate, stop.**

---

## 12. What gets cut, in order of yield

1. **The second establishing detail.** Keep the one image that does work; delete the list. ("four walls of books, a fire, a tapestry the width of the wall, and a desk with a primer" → keep the primer.)
2. **The appositive that teaches.** Anything between em-dashes carrying a fact.
3. **Simultaneous conditional variants.** `ch4_start` branches on `SURRENDERED`, `DOOR` (4 values) and `WREN_SCARED`; ch4 calls a `wren(normal, scared)` helper 10 times. Every variant is more prose to write, check and fit. **Find one line that works under both states.** (You may not stop *setting* the flag — see §0.)
4. **Restated stakes.** `ch4_marrow` states the oath, `ch4_swear` restates it, `ch4_oath`'s brief restates it again.
5. **The narrator's approving aside.** "which for Wren is enormous" earns its place in ch1 because it is the only one in the scene. ch7 has one per paragraph.
6. **World-building with no puzzle or choice attached** — the 212 Convocation, the Founders' road, the bricked wall, Vane's twenty-two years. Move it to the Companion **Book** tab, where it is opt-in, and let the Hearth say the one sentence the table needs.
7. **Numbers used as decoration.** ch0/ch1 numbers are all operational — "Nine seats. Five keeps.", "four slots", "It is called once." "Seven Laws and one that was struck" and "212" are trivia the reader tries to hold.
8. **Generic buttons.** ch7 uses `'Continue'` three times. Every ch0/ch1 button is a 2–4-word promise of the next beat: *Look up · The night before · And you? · Carve it · What they want · The Vigil · The doors · The presenting*.

---

## 13. Testing

Run all of these before handing back. Every scene must load with zero console errors.

```
node tools/check-content.js                          # every next exists; lore registered both sides; cast round-trips
node tools/play.js tools/scripts/chN.json            # scripted playthrough
node tools/play.js tools/scripts/chN-<variant>.json  # plus each written losing/stall branch
node tools/scan-fit.js chN --w 1280 --h 720          # ship gate: overflowing: none
node tools/scan-fit.js chN --w 1152 --h 648          # stretch check
node tools/run.js chN_start --shots /tmp/shots       # add --flags / --set to reach branches
```

`ch1` ships with `ch1.json`, `ch1-lost.json` and `ch1-stall.json` — a commit-once puzzle needs a script per branch.

---

## Before the checklist: read docs/ADVERSARIAL.md

The checklist below is what a chapter must pass. `docs/ADVERSARIAL.md` is how a chapter that passes it
still turns out to be broken -- seventeen patterns, each taken from a real defect in this game, each one
invisible from inside the chapter it lives in. Four of them (5, 13, 16, 17) are about how the checking itself goes
wrong. A chapter is not done because it passes the checklist; it is done when somebody has tried the
seventeen and failed to get in.

## Checklist

A chapter ships when every line is true.

**Fit and length**
- [ ] `node tools/scan-fit.js chN --w 1280 --h 720` → `overflowing: none`, ≤ 2 scenes shrunk, none below 15 px
- [ ] `node tools/scan-fit.js chN --w 1152 --h 648` → ≤ 1 scene overflowing, by < 5 px
- [ ] chapter prose 1,100–1,600 words
- [ ] no scene branch over 150 words or 6 paragraphs; no puzzle brief over 90 words / 8 lines
- [ ] every scene ≤ ~8 s of typewriter time

**Sentences**
- [ ] longest sentence ≤ 25 words (one parallel-list exception per chapter, carrying no new fact)
- [ ] 90th-percentile sentence ≤ 15 words
- [ ] **zero** semicolons in player-visible prose
- [ ] ≤ 2 commas per narration sentence; ≤ 1 em-dash pair per paragraph, carrying no fact

**Names and jargon**
- [ ] ≤ 6 new proper nouns in the chapter, ≤ 2 per scene, each introduced as name + role in ≤ 12 words
- [ ] cross-chapter callbacks restate the fact they depend on
- [ ] speaker labels use the full introduced form throughout
- [ ] ≤ 3 system terms, each defined in ordinary words at first use; no undefined term inside a definition
- [ ] no Law named by number before its `learned:` chapter in `lore.js`

**Questions and ledger**
- [ ] ≤ 3 new open questions; at least as many closed; ≤ 7 carried
- [ ] `flow.stats` is ≤ 3 plain sentences, no ` · ` separators
- [ ] every procedural worry answered once in `cls:'small'`

**Dialogue and markup**
- [ ] ≤ 2 speaking characters per scene; dialogue in runs; ≤ 2 speaker labels per box; speech lines ≤ 30 words
- [ ] `grep -c "[a-z,;—] The \(Reader\|Listener\|Seer\|Binder\)" js/content/chN.js` → **0**
- [ ] `roles:` line begins `Warden (keyboard):` with lower-case role articles
- [ ] ALL CAPS only on typed/pressed/placed tokens; choice labels in sentence case
- [ ] `cls:'big'` ≤ 1; `cls:'center'` cold-open only; `**bold**` ≤ 2 spans per scene; `*italics*` ≤ 10 per chapter
- [ ] every continue button is a 2–4-word promise; no `'Continue'`
- [ ] `VigilLore.houseRule` appears exactly once, verbatim; no "Stuck? The fire keeps a Hint."

**Puzzles**
- [ ] the whole rule fits in `config().note` in ≤ 60 words, quoted from a character, ≤ 2 verbs and ≤ 2 states
- [ ] every identity on the puzzle surface is an integer or a role name — zero proper nouns
- [ ] four role facts as four droppable named constants, each commented with its owner
- [ ] each companion page: one bold fact, one cost line ≤ 20 words, one closing "what you cannot see / ask" line
- [ ] four one-line role prompts in the scene text, seat order, ≤ 8 words each, plus the say-it-before-you-act line
- [ ] solve rule is a pure function of committed input; search space enumerated; uniqueness + drop-a-role result in a comment above the data and in the commit message
- [ ] every wrong option has a keyed line naming the clause that stopped it; impossible actions are `locked` with a `lockedText`; a failed commit prints an arithmetic receipt
- [ ] one decoy, tempting on one role's page, disarmed in one sentence on a **different** role's page, costing one budgeted resource
- [ ] exactly 3 hints: re-partition (no jargon) / abstract insight / literal answer + commit step; `par` ≈ one mark per rung
- [ ] any timer unlocks the full ladder on expiry and never loses the puzzle
- [ ] failure semantics chosen: retry-with-escalation, or commit-once with a flag, a `Store.note`, and a written losing branch. Never a dead end, never a silent re-prompt

**Companion**
- [ ] header comment names all four facts in one clause each
- [ ] exactly one `{t:'h'}` per Sight page and per Wren page
- [ ] Sight ≤ 160 words per role (target 120); Wren 40–75; no `~~page i of n~~`
- [ ] 5–10 blocks per Sight page; no text block over 45 words; ≤ 1 sentence over 22 words in the whole file
- [ ] Sight pages use only `h · p · fine · table · list · html · svg · audio`
- [ ] ≤ 1 figure per Sight page, each with a ≤ 10-word plain caption and one accent colour, replacing prose rather than repeating it
- [ ] ≤ 15 jargon tokens across the file, each glossed inline on first use
- [ ] permanent reference is called "your **Book**", never re-printed
- [ ] each `audio` block's fact is also written in its `text`
- [ ] Wren pages: four views of one anomaly, fact + the excuse already made, no numbers the table needs, no bold, no instruction
- [ ] ≤ 1 cast flag branched per page, and a branch swaps a sentence rather than adding a section
- [ ] union of the four Sight pages is exactly sufficient: remove any one and the table cannot solve it

**Contracts**
- [ ] only `js/content/chN.js`, `js/content/companion/chN.js`, `js/art/scenes-chN.js` changed
- [ ] every flag this chapter used to set is still set, under the same name and value domain
- [ ] attunement word and cast spec unchanged in `lore.js`; token channels and values unchanged
- [ ] chapter-local CSS namespaced to `chN`; shared CSS and JS untouched

**Green build**
- [ ] `node tools/check-content.js` clean
- [ ] `node tools/play.js` passes for the main path and every written branch
- [ ] every scene loads with zero console errors