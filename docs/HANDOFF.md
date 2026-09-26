# HANDOFF — *What the Fire Keeps*

> ## ⚠ TOTAL SPOILERS
> This file names every reveal. Do not show it to a player or a host.

**Read this first, then `docs/CANON.md`.** Everything else is reachable from those two.

---

## 1. The project in one screen

A cooperative story-puzzle game for **exactly four players** in **one sitting of about four hours**.
Static vanilla JS, no build step, no dependencies. Two surfaces:

- **the Hearth** — `index.html`, one shared screen (laptop or TV)
- **the Companion** — `companion.html`, one phone per player

Nine chapters (`ch0` Prologue … `ch8` Epilogue), five endings. Four roles, each holding one kind of
perception that nobody else has: **Reader** (Glyph-Sight, *WHAT*), **Listener** (Ear-Sight, *WHEN*),
**Seer** (Under-Sight, *WHERE*), **Binder** (Thread-Sight, *WHETHER*).

**The property the whole game is built on: four-handedness by construction.** No puzzle may be
solvable by any three-role subset. This is not a style preference — it is proved per puzzle in
`docs/PARTITION.md` and enforced by `tools/`. If you change a puzzle or move a fact between phones,
you must re-prove it.

The story's answer and its mechanic are the same sentence: **COLD is written by four hands.**

---

## 2. The document set — the matrix, and what each is for

Four documents were built by **reading the shipped source**, not by reading the old design doc. Every
claim carries a `file:line` citation. Together they are the matrix.

| document | the question it answers | size |
|---|---|---|
| **`docs/CANON.md`** | What is **actually true**, whether or not anyone in the story knows it | 28k words |
| **`docs/EPISTEMICS.md`** | **Who knows what, when** — and what they think everyone else knows | 49k words |
| **`docs/PLAYER-MODEL.md`** | What is in the **reader's head** at each beat, and what we want there | 38k words |
| **`docs/DEFECTS.md`** | 46 verified findings from three adversarial passes over the whole game | 13k words |

**The three layers are kept rigorously apart, and you must keep them apart:**
*truth* (CANON) ≠ *what a character believes* (EPISTEMICS) ≠ *what the player is led to believe*
(PLAYER-MODEL). A claim that drifts between columns is a bug in the document.

### How to use each

**`CANON.md`** — the world, the Cold, the Hearth, the Sightings, the Founders' grammar, a dated
timeline, every character's *actual* personality and motives, every relationship, and what each of the
five endings actually leaves behind. Two registers at the end do most of the work:
- **§12 `[UNDECIDED]`** — 27 questions the game never settles, ranked by how much hangs on them, each
  with options and what each would cost or buy. **These are the author's to decide.**
- **§13 `[CONTRADICTION]`** — 26 places the game disagrees with itself, quoted on both sides, with
  which side is load-bearing.

**`EPISTEMICS.md`** — keyed to a fixed revelation spine, **T0** (before play) → **T10** (the epilogue).
Use the same labels; do not invent your own. Per mystery, per character, per point:
*knows / believes / wrong about / believes about others (nested two deep where it is dramatic) /
withholding and why / **what they would say if asked directly***.

That last cell is the sharpest test of whether a knowledge state is real or hand-waved, and it is the
one you will write from. Start at **§3, the master asymmetry map** — one page naming the five knowledge
gaps that generate the most story. It also carries the **persona matrices**: actual personality,
self-image, believed reputation, and feelings, for the whole cast.

**`PLAYER-MODEL.md`** — 112 beats. Live hypotheses with the evidence licensing each; which we want
**live** (and why holding it is a pleasure), which we want **killed** (and by exactly what line, and
whether that line currently exists), which are **confirmed** (and when). Then an **aha ledger**, a
**`[WITHHOLDING]` register** (mystery with no basis to speculate — the author's named enemy), and a
**breadcrumb bank** of candidate plants sorted by value per word, each concrete enough to paste.

**`docs/epistemics/`** — the 14 working files the three documents were assembled from: nine
per-mystery tables, two persona sets, three per-act player models. Go here when the assembled document
compresses something you need in full.

### Precedence, when documents disagree

**The shipped source in `js/` wins. Always.** Then `CANON.md`. `docs/DESIGN.md` is the pre-
implementation plan and is stale in roughly thirty documented places (see `CANON.md` §13.51); its
header now says so. `docs/STYLE.md` is **binding** for prose and was derived from `ch0`/`ch1`.

### The other docs

`STYLE.md` (house style, binding) · `PARTITION.md` (four-handedness proofs) · `ADVERSARIAL.md`
(seventeen recurring defect patterns found in earlier passes) · `AUDIT.md` · `CONVENTIONS.md` ·
`HOST.md` (spoiler-free, for the table).

---

## 3. The one-paragraph version of the story

Four hundred years ago four people wrote the cold glyph with four hands — a thing only four hands can
do — went down into the wound together, closed it, and came back grey, their Sight spent. What they
left on top is the Hearth, and **the Hearth is them**. Four people's worth of fire, four hundred years
to spend it in: that is the whole answer to why it is dying, and nobody did anything wrong. In Year 212
the seal failed. Paying again meant four Masters giving up their Sight; the Convocation would not pay
it, struck Law 0 *"and called it grammar"*, sent one Warden down alone, rebuilt the vault, bricked the
road, painted one figure over four, and taught the school to read *one born of four* on a stone that
says *four, as one*. Fourteen years ago the fire guttered for one night and left a child on the stones.
**Wren is the hollow** — the eighth glyph, the word that is never written. The four can write it.

---

## 4. Where the work stands

**Done and pushed** (branch `claude/fantasy-game-design-8fe1zq`):
- All nine chapters reworked; two earlier improvement passes complete.
- The four bible documents above.
- `docs/proposals/ch0-ch1-rewrite.md` and `.patch` — see §5.

**Not done:**
- The Prologue/Chapter I rewrite is **not applied**. Awaiting the author.
- The 27 `[UNDECIDED]` questions are open.
- The 46 findings in `DEFECTS.md` are unactioned.
- **The exercise the author named next** — see §8.

---

## 5. The unapplied rewrite

Two files, both in the repo so they survive this session:

- **`docs/proposals/ch0-ch1-rewrite.md`** — the full proposal. Ready-to-paste JS per scene, the
  reasoning under each change, all 45 verification findings with dispositions, honest measurements.
- **`docs/proposals/ch0-ch1-rewrite.patch`** — the same thing as a patch. `git apply` it to try it.

```
git apply docs/proposals/ch0-ch1-rewrite.patch     # four files, +82/-77 lines
git checkout -- js/content/                        # to undo
```

**What it changes.** 20 scenes revised, none cut or added, across `js/content/ch0.js`, `ch1.js`,
`companion/ch0.js`, `companion/ch1.js`. Every flag, scene id, `choice:` key, `puzzleId`, puzzle answer
and role partition is unchanged. Net **+62 words** across the four files.

**Why.** The author played the opening and said parts were "just ok, whatever", that they had to hold
too many possibilities at once, and that they felt "pretty disconnected from Wren". The diagnosis that
stuck: in Chapter I, Wren speaks 61 words and is **absent from the five consecutive scenes that decide
his fate**. A man with soldiers reads out a writ demanding him and the child the chapter is named after
has no reaction on screen. In the Prologue, 38% of what he says is a puzzle briefing, 60 words of it
verbatim duplicates of phone pages read thirty seconds later.

**The governing rule of the pass:** *a crack the narrator explains is not subtle, however small it was.*

**The spine that emerged, which was not in the brief** — naming, and filing. A boy described by every
record in the building and named by none of his own choosing: *"Four letters, and I picked none of
them"* → *"I can only read one"* → *"I named the child"* → *"They asked if I had anything to bring. I
said no. They wrote it down."*

**Verified.** `check-content` OK across 135 scenes · `check-hints` 0 failing · `scan-fit` shrinks
nothing at 1280×720 (the shipped build shrinks `ch0_stone`) · all 7 `ch0`/`ch1` play scripts pass ·
`full-true.json` passes end to end.

**Three edits the patch does NOT contain, and that the author must approve** (listed in the proposal
under *Reported, not changed*): `tools/scripts/ch0.json` and `full-true.json` each need one pinned
string and one button label updated, and `docs/DESIGN.md` §5's "the night before the Vigil" goes stale.

**What is still weak after it** — all in the proposal's *Still weakest*, and honest:
- The vote is **inhabited, not solved**: the boy is on the board but the two asks still cost nothing,
  so the chapter's own question (*what are you willing to owe?*) does not operate in its centrepiece.
- Wren is in the vote mostly on **failure surfaces** — two of five strings fire only if the table
  under-commits. The better they play, the less boy they get. And `center: 'Wren'` renders at ~11px;
  that was never measured and probably needs a CSS line.
- **Nobody ever pushes back on a joke.** In two chapters no Master's face moves, nobody laughs, nobody
  hushes him. The brake is always his own, so the levity is shaped but not compulsive.
- The Chapter I phone pages are never pointed at, though four private paragraphs about Wren sit one tap
  away during six minutes of arithmetic. Largest cheap win left in the chapter.

---

## 6. Decisions the author has made — treat as binding

1. **Four players, four hours.** Settled. The title card, `README.md` and `docs/HOST.md` all say so.
2. **Wren's pronoun.** The narration stays **pronoun-free** for Wren. Vane keeps *"the boy"*. Marrow's
   documents keep *"it"*. **The four now say *"he"*** — warmly, unremarkably, in their own dialogue.
   *Why it matters:* Chapter IV's gut-punch is Wren reading Marrow's journal aloud — *"She writes
   **it**. And then she writes that."* (`ch4.js:497`). That only detonates if the room has been hearing
   an ordinary *"he"* from the people who love him. The narrator's abstention is then the narrator's
   alone. In the rewrite this fires in exactly one place: the four spoken lines on the Companion Wren
   tabs, first speaker naming him, the other three using *he* without remark. Nine words total.
3. **Merging to `main` was authorised once**, for the four-hours change. It is **not standing**. Ask.
4. Publishing is fine; **the live artifacts are share-pinned**, so republishing does not change what a
   shared link shows until the author moves the pin themselves.

---

## 7. The bar the author is asking for, in their words

> "I'm really looking for **transformationally good** … a story that is very clear, has you wondering
> questions that are **clearly intended by the writer and are there for a strong reason** … make the
> readers think of certain things because they're interesting and because they're **profound** …
> **rock solid in its logical consistency** … I don't want clutter … The thoughts of what might be the
> truth should all be **interesting possibilities that unfold from info given**."

> "Wren needs a stronger more likeable friendly rapport with the four … **compulsively adding levity in
> a loveable interesting friendly way, but also under the surface feeling the weight of what's
> happening** … his personality should shine through with **cracks that show the impact of this time on
> him very very subtly**."

> On the player model: "**this is the most important part of the game besides having engaging puzzles.**
> Ideally the engaging puzzles add to players understanding of the world and mysteries."

**A beat that is merely competent is a defect.** Two earlier improvement passes were adversarial on
*mechanics* — four-handedness, flag contracts, hint drift, style rules — and neither ever asked "is
this beat interesting?". That is exactly how you get something clean and unmoving. Do not repeat it.

---

## 8. The exercise the author named next — start here

Verbatim, from the request that produced the bible:

> "After this we'll work on **refining what mysteries are exposed to the reader and what personalities
> they see, so they feel a certain way about different characters, possibly different than their
> actual personality if it helps the story.**"

That is the next job, and the three documents were structured to make it possible: `CANON.md` holds the
actual personalities, `EPISTEMICS.md` holds self-image and believed reputation, and `PLAYER-MODEL.md`
holds what the reader currently infers. The gap between column three and column one is the design
surface.

**The finding that should shape it** — from `DEFECTS.md`, the reveal-schedule critique:

> The game has **two spines and only one of them is built.** The *procedural* spine (four hands, taught
> in minute eight; Law 0, struck; the four keys, enacted at the climax) is causally tight and fully
> earned. The *cosmological* spine (the fire is the Founders; 212 refused to pay the same bill) is **a
> destination rather than a road**: no upstream premise, the motive behind an opt-in tap on one phone,
> and the central correction spent four chapters early in an optional room nothing downstream reads.

And the strongest available fix, already in the material — **run it as a debt, not an identity**:
the Founders paid four Sights → the seal failed and the Convocation was asked for the same four and
refused → *every physical lie under this school is that refusal in stone* → the fire ran out anyway
because it was only ever four people → tonight four fourteen-year-olds pay the bill nine adults would
not.

**Three specifics worth acting on early:**
- *"The seal failed"* occurs **exactly once in the entire game** — Binder's phone, inside a collapsed
  opt-in control, zero Hearth lines. The thing the whole cover-up is *for* never reaches the shared
  screen on any ordinary path.
- `ch5_collapse` writes COLD **with one hand**, two chapters before the climax asserts it takes four.
- The Cold Ember — the entire motive of Chapter II — is never mentioned again after Chapter II.

---

## 9. Open for the author

Beyond the 27 in `CANON.md` §12, these came up directly and are unanswered:

- Apply the Prologue/Chapter I rewrite? And the three out-of-file edits it needs?
- The Prologue sits at **exactly 1,100 words**, the floor in `STYLE.md` R1.5 — a floor measured from
  this very chapter. Every later pass has a one-word window. Should the floor move?
- `center: 'Wren'` legibility (~11px) — worth a CSS line?
- **WRENN vs WREN** (`CANON.md` §13.5): the name means *the hollow of a bell* only as **WRENN**, and the
  word the climax makes the table type is **WREN**. The spelling that carries the meaning is the one the
  game will not accept.

---

## 10. Operational

**Branch.** Work on `claude/fantasy-game-design-8fe1zq`. `main` is behind at `ed12386`. Never push
elsewhere without explicit permission.

**Artifacts.**

| | URL |
|---|---|
| Hearth, **live** (shared) | `https://claude.ai/code/artifact/1171ca16-69cc-4822-b806-dc835821af9c` |
| Companion, **live** (shared) | `https://claude.ai/code/artifact/8f607ee5-620a-40fc-9d95-77d95baaac51` |
| Hearth, **draft** with the rewrite | `https://claude.ai/artifact/ArZScNNGYfhQmRwRBB3AuW` |
| Companion, **draft** | `https://claude.ai/artifact/Wnj4ZCoEvZDFNepxnLQnTj` |
| The rewrite proposal, as a page | `https://claude.ai/code/artifact/e35f6a99-4ec8-48bf-af29-1fa4a76a5c23` |

Rebuild with `node tools/bundle.js --companion-url <URL>`. **Always pass `--companion-url`** — without
it the Hearth ships a dead QR code to a table of four. Patch the `<title>` in a draft build or it
collides with the live artifact's name in the gallery.

**Verification, in the order worth running:**

```
node tools/check-content.js      # scene graph, flow nodes, when() probes — 135 scenes
node tools/check-hints.js        # every hint rung against the shipped predicate
node tools/flag-map.js           # 93 flags, 38 of them cross a chapter boundary
node tools/flag-contract.js      # the cross-chapter flag contract
node tools/prose-count.js chN    # word counts per scene
node tools/scan-fit.js           # does it fit 1280x720 and 1152x648 without shrinking
node tools/play.js tools/scripts/<name>.json      # headless playthrough, exit 0 = pass
node tools/play.js tools/scripts/full-true.json   # the only end-to-end ch0->ch8 run, 798 steps
```

Playwright is preinstalled; chromium is at `/opt/pw-browsers/`. Do **not** run `playwright install`.

**Gotchas that have bitten this work:**
- The session scratchpad under `/tmp/claude-0/...` is **ephemeral**. Anything that matters goes in the
  repo. That is why the rewrite is a committed patch and not a working copy.
- Durable **wake subscriptions do not register** in this environment (`relay_unavailable`, HTTP 404).
  Nothing will wake you on an artifact republish or comment. Do not claim to be watching one.
- Long agent fan-outs hit **session and weekly limits**. Workflows resume from cache
  (`resumeFromRunId`), so completed agents replay instantly — record run ids.
- `pgrep -f "<script>"` self-matches its own parent bash command line. It has hung a wait loop here.

---

## 11. The process that worked, and why

Every substantive pass used the same shape: **diagnose (several independent lenses) → draft (rival
versions from different angles) → judge → synthesize → adversarially verify.**

The verification is not ceremony. On the Prologue/Chapter I rewrite, three independent verifiers
rejected the first draft with **five blockers**, including one that matters as a lesson: the draft
correctly diagnosed *"the table is asked to fight for a boy who is not in the room"* and then marked the
six-minute vote scene **byte-identical**. A pass can name its own central defect and still not fix it in
the one place that counts. It also overclaimed a measurement — "shorter than what it replaces" was true
for two files and false by +103 words across four.

Findings are worth arguing with. Five were rejected on the merits; the best of them: a reviewer wanted
*"Wren told her the wind did it"* instead of *a bird*, because a bird makes Chapter VI's wrong answer
more tempting. Rejected — **the lie has to be transparently bad, because the payload is that Marrow
chose not to know, and someone who believes a plausible excuse has not chosen anything.**

One thing that came back clean and is worth not breaking: **the puzzle layer is sound.** Every answer
was recomputed by hand against its hint ladder, rule card and companion pages — including Chapter VI's
32-beat lane partition, exact to the digit. Nearly all remaining damage is in the prose around it.
