# PLAYER MODEL — **Act II · T4–T7 · Chapters II–V**

> ## ⚠ TOTAL SPOILERS
> Working document for the author. Contains every reveal in the game, including the Finale's and all
> five endings'. Companion to `CANON.md` (ground truth) and the `epistemics-*` files (who believes
> what). **This file is the reader's head, not the world's.** Where a row says the player believes a
> thing, the truth is in `CANON.md` and is not restated except where the error needs it.

---

## 0. SCOPE, METHOD, AND THE STATE AT ENTRY

### 0.1 What this span is

T4–T7 is **the middle**: the Ember Vault, the Whispering Gallery, the Oath, the Long Stair. Four
chapters, thirty-nine beats, nine puzzles. The Prologue and Chapter I set the question; Chapters VI
and VII answer it. This span is the only place the player does the *work* of believing things, and it
is therefore the only place the game can earn its answers or fail to.

The span has a shape, and it is worth naming before the beat tables, because every finding below is a
consequence of it:

| | ch2 | ch3 | ch4 | ch5 |
|---|---|---|---|---|
| **what the chapter is about** | the evidence was tampered with | the school is bought, and Wren is owed something | the woman who raised Wren is going to spend Wren | the price, and who pays it |
| **what the player gains** | 212, four-not-one, the Ember, Mere | the shadow dies, the four anomalies harden, the whispers | the paint, the journal, the grey thread, Mere's sheet, the oath | the wound named aloud, Law 0 written, a Sight spent |
| **flame** | 0.8 | 0.7 | 0.5 | 0.3 |
| **register** | wonder → dread | tense → sorrow | court → tower | dread throughout |
| **the question the chapter changes** | "what is Wren?" | "what do we owe Wren?" | "what is Marrow?" | "what does this cost, and who pays?" |

The pivot of the span is `ch3_whispers`. Before it the game is a mystery about a child. After it, it
is a story about four people who have been lying to that child by omission for years and have just
been asked, one at a time, in a laundry, whether they will go on doing it. **Everything in T6 and T7
lands harder or softer depending on whether that beat lands.**

### 0.2 The state the player is in at the start of T4

Cumulative from T0–T3, stated as the player holds it, not as it is true.

**Public, on the shared screen:**
- Four hundred years ago four people closed a wound in the world and left a fire on top to hold it
  shut. The fire is the Hearth. It has gone out exactly once, fourteen years ago, and left a baby.
  That child is Wren, fourteen. (`ch0.js:49-54`)
- Above the fire, one sentence in a dead language. **Nobody alive has read the cuts.** The school
  teaches a translation: *"When the Hearth goes cold, one born of four shall walk into the Cold, and
  it shall close behind them."* Every adult argues about it. (`ch0.js:61-62`)
- The Cold is a **place**, and nobody will tell you where. (`ch0.js:64`)
- Tonight the Hearth is flickering for the first time in fourteen years. (`ch0.js:68`)
- "Four hands is how this school does anything that matters." (`ch0.js:88`)
- The dormitory lamp lit on ASH + EMBER — *Fire, keep* — and needed all four Sightings. (`ch0.js:216`)
- Wren named a private fact belonging to each seat **before any of them spoke**, then: "Yes. All four
  of you. I've known for years." (`ch0.js:172-174`, `:226`)
- Vane's writ; "I have seen what is under the paint in this hall, **Ilsabet**"; the vote; the Hearth
  bows and **every face turns to the fire except Marrow's, who watches Wren** (`ch1.js:137-148`).
- Vane: "You think I am the villain of tonight. **Ask your Seer what is under the paint.**"
  (`ch1.js:283`)
- Marrow: "The stone over your heads says *one born of four*. **Tonight I stop arguing and show
  you.**" — and nothing is shown in Chapter I (`ch1.js:124`; `CANON.md` §12.42).
- Marrow: "Under this school the Founders left the Cold Ember. If the fire goes out, the Ember lights
  it again." / "In the morning I would have sent — no. **Tonight.**" (`ch1.js:309-310`)

**Private, one per phone:** each seat carries one impossibility about Wren and one rationalisation
they have never spoken (`companion/ch0.js:99`, `:112`, `:124`, `:145`). As of T2 all four have been
said aloud once. **They have not yet been said aloud twice, and no one at the table has yet added
them up in front of the others.** That addition is the work of T4–T7.

**Branch-carried into T4:** `VOTE_LOST` · `SORREL`/`ORIEL`/`NEITHER` · `VANE_ACCEPT`/`VANE_PRETEND` ·
`WREN_TRUST`.

### 0.3 The seven hypotheses that run the whole span

Every beat table below refers to these by tag. They are the load-bearing theories a real table will
hold, argue about and revise across four chapters.

| tag | the theory | status in reality |
|---|---|---|
| **H-WALKER** | Wren is the prophesied one; somebody walks into the Cold tonight and it closes | half true — a walk closes it, but the stone says *four*, not one (`ch6.js:827`) |
| **H-HOLLOW** | Wren is not a person in the ordinary way — Wren is of the Cold | **true** (`ch7.js:697`; `CANON.md` §4.2) |
| **H-BLAME** | the Hearth is dying *because of something* — Wren, neglect, sabotage, the Crown | **false**; "Four people's worth of fire… **Nobody did anything wrong.**" (`ch6.js:850`) |
| **H-COVERUP** | somebody rewrote the record; the school's reading is a lie | **true**, and dated 212 (`companion/ch6.js:286-287`) |
| **H-MARROW** | Marrow is (a) protecting Wren / (b) preparing Wren to be spent / (c) both, and has never let them be two things | **(c)** (`CANON.md` §9.2) |
| **H-VANE** | Vane is the villain / Vane is right about one thing / Vane is right and still dangerous | the third (`ch4.js:557`; `companion/ch4.js:213`) |
| **H-FOUR** | "one born of four" is about **the four players**, not Wren | interestingly false-then-true: the stone means the Founders' four, and E0 makes it the players' four (`ch7.js:740`) |

**The one theory the span never licenses and should:** *the fire is the Founders themselves.* Nothing
in ch2–ch5 puts it in reach. See §6, aha **H**.

---

# 1 · T4 — CHAPTER II — THE EMBER VAULT

Twelve beats. Attunement word KNOT. Flame 0.8 → 0.75. The chapter where the physical evidence of the
cover-up is put in the players' hands and nobody in the fiction calls it that.

---

### B4.1 · `ch2_start` — the Great Hall, after the bell

**Knows (new in bold).** The vote's outcome. **Marrow's stated function for the Cold Ember: "If the
Hearth goes out, the Ember lights it again."** (`ch2.js:188`) — repeated verbatim from `ch1.js:309`,
which makes it feel corroborated and is in fact the same claim twice from the same mouth.
**"That vault was rebuilt once, and the rebuilding was not honest."** (`ch2.js:189`) On `VOTE_LOST`,
"Then bring me the Ember. **I will get the child back myself.**" (`ch2.js:182`)

| # | hypothesis a table could hold | licensed by | want live? | note / kill |
|---|---|---|---|---|
| 1 | The Ember is the backup fire — real insurance, and therefore the way out of the prophecy | Marrow ×2 | **YES — this is the chapter's engine.** It makes the stairfall a real dilemma and it is the only hope the table has | It is **never corroborated and never tested** (`CANON.md` §4.3, §13.10). The game should not kill it here — but it must eventually resolve it. It does not. See §5 W-1 |
| 2 | Somebody rebuilt the vault to hide something, and Marrow knows it | `ch2.js:189` | **YES — true, and the chapter is built to prove it** | — |
| 3 | Marrow knows far more than she has said, and is rationing it | she names a dishonest rebuild in the same breath as an errand, with no explanation | **YES.** This is the correct read of Marrow all night and the earlier a table holds it the better ch4 plays | — |
| 4 | She is sending children because adults would be seen / because she needs the four Sightings | "take the Seer's eyes with you" | **YES** | Also the answer to §12.43, which the game never gives |
| 5 | She is sending them because she suspects something about *them* | nothing | **NO** — and nothing kills it, because nothing raises it. Harmless |
| 6 | The Ember is itself dangerous, or a piece of the Cold | it is called *Cold* Ember; the cold blue light on the stair (`ch2.js:197`) | **YES, strongly.** It is the seed of H-HOLLOW's best evidence, two beats away | — |

**Reality vs belief.** The Ember's only function is one woman's sentence. The rebuild was dishonest
in exactly the way she implies and for a reason she will not name for three more chapters.

**Breadcrumbs planted.** "The rebuilding was not honest" is the whole of §7.3 in seven words.

**Cheap breadcrumbs available here. [PROPOSED]**
- One clause on how she knows: *"I have been down there. Once."* Buys §12.43 and makes B4.11's "Who
  did —" land as a woman who has been afraid of that stair before.
- Wren, on the Ember, on the `!VOTE_LOST` branch: *"Has anybody ever lit anything with it?"* — one
  line that puts the Ember's untestedness into the table's mouth rather than leaving it a hole.

**The table.** Relief or fury about the vote, then a brisk re-focus: *an errand, fine, what do we
do.* The Seer sits up — she has been named. Somebody says "wait, *not honest*?" and somebody else
says "she means it's old". Both are at the table and neither knows which is right. This is a good
argument to start with.

**Risk.** The Ember's function arriving twice in two chapters from the same mouth reads as
established fact rather than as testimony. That is fine for suspense and bad for the ending, where
the Ember is never invoked (§13.10). Flag, do not fix here.

---

### B4.2 · `ch2_descent` — the stair behind the tapestry

**Knows.** **The stair goes down further than a school has any right to.** **A cold blue light,
breathing, below.** (`ch2.js:196-197`) And — unremarked — **the stair is behind a tapestry**
(`ch2.js:196`), which is the same word the game will use for the overpainted picture in ch4.

| # | hypothesis | licensed by | want live? | note / kill |
|---|---|---|---|---|
| 1 | The school is built on something older | "further than a school has any right to" | **YES** — true and the whole geography of the game |
| 2 | The blue light is the Cold itself | blue, breathing, below; ch0's "the Cold is a place" | **YES** — a productive near-miss. It is the Ember, but the player is right that they are the same colour | Resolved next beat by seeing the Ember; but nobody says the two blues are the same blue |
| 3 | The tapestry over the stair is *the* tapestry | the word repeats in ch4 | **YES if the author wants it** — currently accidental | §13.39 already has three painted surfaces; a fourth is free and would tie the vault to the study |

**Reality.** The cold blue below is the Ember, and the Ember is of the same substance and opposite
sign as the Hearth (`scenes-ch0.js:7-8`: one function, two palettes). Nobody will tell the player
that for five chapters.

**Cheap breadcrumb. [PROPOSED]** The Seer, on their ch2 page: *"the blue down there throws light the
way the Hearth does, and nothing else in this school does."* One clause, enormous payload, and it is
already true of the art.

**The table.** Atmosphere beat. Low talk. Somebody reads it well.

**Risk.** Two consecutive arrival beats (B4.2, B4.3) before any agency. See §8.

---

### B4.3 · `ch2_antechamber` — the bottom of the stair

**Knows.** **Four Founders, hooded, one per plinth, numbered one to four — no names.** **One worn
shape cut into each plinth.** **A bronze dial before each statue; every statue looks straight down at
the dial in front of it.** **A door with no handle and no lock.** And the Hearth's own whisper: *"This
floor is newer than the room. Only one of you can see how much newer."* (`ch2.js:205-209`)

| # | hypothesis | licensed by | want live? | note / kill |
|---|---|---|---|---|
| 1 | The Founders' names were removed | four statues, numbers only, a floor that is newer | **YES — true and provable this chapter** | The Seer's page confirms a new floor over old holes (`companion/ch2.js:141-142`); the plinth back gives a name (`ch2.js:301`) |
| 2 | The Founders were never named — an order of anonymous ascetics | the hoods; the numbers | **KILL, and the game does**: `ch2.js:301` "The name worn off the front of that plinth is **cut fresh on its back**." Worn off the front, fresh on the back = removed, not absent. *But this kill is optional* — it sits behind the niche. See §5 W-4 |
| 3 | The statues are pointing at their dials on purpose, and the door is read off where they look | the prose says so flatly | **YES — and it is the trap.** Law 9 (Order's, 212) says exactly that, and loses to Law 13 | Killed by the Binder's page and by the door's own refusal line (`ch2.js:118`) |
| 4 | Four statues, four dials, four of you, four hands — the number is the world's grammar | everything | **YES.** The counting motif is the spine of the game and this is where it becomes physical | — |
| 5 | The wound/the Cold is directly below this room | the blue light | **YES** — true, and never confirmed to the player until ch6's lid |

**Reality.** *Not one plinth stands in the hole it was cut for.* `CUTFOR = [3,4,2,1]`, a derangement
(`ch2.js:89`). The statues were physically turned away from their own dials in 212, which is the
cover-up rendered as furniture. **No line of Hearth prose ever says this out loud.** It exists on the
Seer's phone and in the door's failure receipts.

**Breadcrumbs planted.** The whole physical case for H-COVERUP, in one room.

**Cheap breadcrumbs available here. [PROPOSED]**
- The Seer's page already knows; give the **Hearth** one line once the Seer has spoken:
  *"Four statues, and not one of them is looking where it was cut to look."* Currently the strongest
  image in the chapter is never on the shared screen, which is the one screen all four remember.
- **A fifth plinth-hole, empty and unfilled.** Free, and it pays §12.4 (*one was never asked*),
  §12.26 (five arches), and Mere's door at `ch5.js:287` in one object.

**The table.** The Seer reads the under-floor and says the derangement out loud; this is the moment
the Seer stops being flavour and becomes load-bearing. Expect "wait, say that again" and someone
writing 1→3, 2→4, 3→2, 4→1 on their hand despite the game telling them nothing needs writing down.

**Risk.** The room has six discrete facts in five lines and the player has to hold four of them for a
one-shot puzzle. This is where table notes start, which the game has twice promised are unnecessary.

---

### B4.4 · `ch2_attune` — KNOT, and four phones

**Knows (privately, per seat).**
- **Reader** — the four plinth words; that two plinths carry the same shape, one inverted; and, in
  fine print, **both readings of a three-shape strip that has not yet been found**: *"From the left:
  one went down alone and kept it. From the other end: four, as one, went through."*
  (`companion/ch2.js:109-116`)
- **Listener** — the door's contour, up one / up three / down two; and, on the Wren tab, a heartbeat
  list in which **the Cold Ember and Wren are drawn with the identical flat trace, adjacent**, under
  the line: *"you have only ever heard the feet."* (`companion/ch2.js:128`, `:134-135`)
- **Seer** — the four holes under the floor; the niche behind plinth 1 and which end its strip is
  marked; and a picture of the stair in which **four shadows fall away from the cold light and one
  reaches for it**, captioned *"four shadows fall away. One reaches."* (`companion/ch2.js:141-150`)
- **Binder** — Laws 13, 9, 3; that the newer was written **in 212, the year this room was rebuilt and
  the statues were put back**; that the school's drill is a drill, not a Law; and a thread list in
  which the Ember and Wren are the same nothing, closing on *"You have never asked yourself why the
  two nothings feel different — or whether they are."* (`companion/ch2.js:156-169`)

| # | hypothesis | licensed by | want live? | note / kill |
|---|---|---|---|---|
| 1 | **Wren and the Cold Ember are the same kind of thing** | three of four phones say it in the same chapter | **YES — this is the best-laid trail in the game and it is laid here, at T4.** It is H-HOLLOW and it is correct | Needs saying aloud to combine; the house rule guarantees a real conversation |
| 2 | Wren's shadow is a lamp artefact | the Seer's own rationalisation | **KILL — and the game does, in stages**: "There is **no lamp here**" (`companion/ch1.js:133`) → "You have run out of lamps to blame" (`companion/ch3.js:229`). Here the kill is the cold stone that "gives no light a shadow should want" (`companion/ch2.js:150`) |
| 3 | The Listener's deafness to Wren is a fault in the Listener | the rationalisation | **KILL slowly.** Here: the Ember has no heart *and nobody expected it to*, which reframes "no heart" as a property of the heard thing, not the hearer |
| 4 | 212 is when the lie was made | the Binder's page dates the Law to the rebuild | **YES — true, and this is the earliest the player can have it** | — |
| 5 | The rebuilders were the Order and they had no Sightings | nothing yet; the door's crawl branch will imply it | **YES**, and it is nearly free to sharpen |

**Reality vs belief.** The player is four sentences from the answer to the game's central question and
those four sentences are on four different devices. That is the design working. **The Reader's line
at `companion/ch2.js:116` — "four, as one, went through" — is on every Reader's phone in Chapter II
whether or not the niche is ever found.** It is phrased as a contingency ("if a strip of three shapes
turns up tonight") and set in `fine` type, so most Readers will not read it aloud. See §6, aha **B**.

**Cheap breadcrumbs available here. [PROPOSED]**
- Promote the Reader's strip line out of `fine` and out of the conditional. It is the game's central
  correction and it is currently a footnote about a hypothetical object.
- Give the Listener's Ember/Wren adjacency a **caption**, not just a layout: *"two flat lines on one
  page, and you did not put them there."*

**The table.** Ninety seconds of four people silently reading. Then the Voice (the Reader) begins and
the first five minutes of Chapter II is the best conversation the table has had so far, because for
the first time each seat has something the others need *and* something about Wren they did not
expect. Expect one player to go quiet — usually the Listener or the Binder — because their Wren tab
just told them their lifelong private explanation is wrong.

**Risk.** Four phones, four dense pages, a 90-second timer, immediately before a commit-once puzzle.
The Wren tabs are the emotionally important half and the Sight tabs are the urgent half; tables will
read the urgent half and skip the other. **The chapter's best material is on the tab nobody has to
open.** See §8.

---

### B4.5 · `ch2_door` — THE FOUNDERS' DOOR (puzzle, commit-once)

**What it teaches about the world.** The most of any puzzle in the span.
1. There are **three** live rules for one door: the dial a plinth stands over (Law 9, Order's, 212),
   the dial it was **cut for** (Law 13, Founders', Year 0), and the drill the school has taught since
   the floor was laid. (`ch2.js:237`)
2. **Law 3: where two Laws disagree, the older binds.** The Order's rule is structurally impotent —
   which is exactly why 212 later *struck* Law 0 rather than amending it (`CANON.md` §7.2).
3. **The school's own teaching is neither of the two Laws.** "A drill is not a Law." (`ch2.js:119`)
   The institution is not merely wrong, it is wrong in a third, home-made direction.
4. On failure: *"Every word went to the dial its own plinth stands over. That is the newer rule. The
   lintel was cut before this floor was laid."* (`ch2.js:118`) — the world-teaching is on the failure
   branch too, which is right.
5. On the crawl branch: *"the Seer finds the way the rebuilders came and went… **They did not trust
   their own door either.**"* (`ch2.js:276`) — the rebuilders could not count the door. They lacked
   four Sights or the Founders' rule. Nobody says so, and it is the first evidence for what 212's
   Convocation could not do.
6. Solved: **THORN, KNOT, VEIL, EMBER — *A gate. Together. Hidden. Kept.*** (`ch2.js:266`) A sentence
   about the entire night, printed on the shared screen, unremarked.

| # | hypothesis | licensed by | want live? | note / kill |
|---|---|---|---|---|
| 1 | The Order rewrote the rules and the rewrite loses | the three-rule fork + Law 3 | **YES — H-COVERUP's mechanical proof** | — |
| 2 | The school teaches things that are simply made up | the drill | **YES.** This is the seed that lets the player distrust the prophecy translation later, and it costs nothing | — |
| 3 | The Founders wrote Law 3 *anticipating* being overruled | Law 3 exists in Year 0 | **YES — a lovely inference and entirely available.** The Founders legislated against a future they expected | Never stated; free to sharpen with one Binder line |
| 4 | The four glyph-words on the plinths are a message, not a password | "A gate. Together. Hidden. Kept." | **YES** | Nobody at the table will notice unless a character does; see below |

**Reality.** The door's own sentence is the plot. *A gate; four-as-one; hidden; kept.*

**Cheap breadcrumbs available here. [PROPOSED]**
- **The single highest-value free plant in Chapter II:** let Wren notice the gloss. One line —
  *"'A gate. Together. Hidden. Kept.' Somebody was writing a diary."* — converts every future
  `solvedText` gloss (ch3's *Fire, go through, four as one*; ch4's *A gate, kept hidden, by the
  first*; ch5's *One, bound, down*) into a running commentary the table starts listening for. Four
  chapters of free thematic payload for one sentence.
- The Binder, on Law 3: *"They wrote that in Year Nought. Before anybody had tried."*

**The table.** The loudest, most structured argument of the chapter. Four facts must be spoken and
reconciled and the door counts once. Expect the Binder to be disbelieved: the drill is what everybody
at the table (and every character) was taught, and the Binder is asking them to bet the puzzle on a
Law nobody else can see. **This is the beat that establishes that the Binder's seat is authority, not
trivia** — and the game knows it: `ch2.js:55`, "Dating them is the Binder's whole seat."

**Risk.** Highest overload point in Chapter II. Four private facts, a three-way rule fork, and one
commit. Par [3, 4.5, 6] minutes is optimistic for a first four-way partition with a real cost.

---

### B4.6 · `ch2_opened` — the vault, and the choice to look behind the plinths

**Knows.** **The vault is round, low, and older than the school on top of it.** **The Cold Ember: a
flame that is not burning, blue, breathing, no heat at all.** And the framing: *"Nothing down here is
going anywhere. Nothing up there will wait."* (`ch2.js:284-286`)

The choice is presented with the Hearth's own thumb on the scale: *"Look behind the plinths first —
**The Seer saw something the Hearth did not.**"* (`ch2.js:291`)

| # | hypothesis | licensed by | want live? | note / kill |
|---|---|---|---|---|
| 1 | The Ember is a piece of the same thing the Hearth is | "a flame that is not burning" | **YES** | Art makes it literal: one `fire()` function, two palettes (`scenes-ch0.js:7-8`) — never said |
| 2 | Time pressure is real and looking around costs something | the prose says so | **KILL, gently.** It costs nothing; the niche is free. The prose manufactures a tension it does not charge for, which teaches the table that the game bluffs | Either charge it or drop the clause |

**Risk.** A table that takes the urgency at face value skips the chapter's richest content. The
Hearth's prompt is good; the urgency line works against it.

---

### B4.7 · `ch2_niche` — Mere's niche (optional)

**Knows.** **A hollow the rebuilders missed.** **A strip of stone with three shapes; a sheet in
letters none of them can read.** **"The name worn off the front of that plinth is cut fresh on its
back. *Mere.* One of the four who closed the wound."** (`ch2.js:299-301`) Then, by free repeatable
button:
- *"WELL, EMBER, VEIL — one went down alone and kept it. **It is the reading the school teaches, and
  the mark on this stone is at the other end.**"* (`ch2.js:315`)
- *"KNOT, CROWN, THORN — **four, as one, went through. Not one. And the stone above the Hearth has
  said one born of four for four hundred years.**"* (`ch2.js:319`)

And the rubbing: *"The Reader cannot read a word of it, and is keeping it anyway."* (`ch2.js:326`)

| # | hypothesis | licensed by | want live? | note / kill |
|---|---|---|---|---|
| 1 | **The prophecy is mistranslated. It says four, not one.** | the Hearth, verbatim, on the shared screen | **YES — and this is the single most important thing the player can leave Chapter II holding** | It is *true*, it is *four chapters early*, and it has **no mechanical footprint whatsoever** (`CANON.md` Appendix A: `CH2_STRIP` and `CH2_NICHE` are written and never read). See §6 aha **B** and §5 W-4 |
| 2 | Mere survived — "one of the four who closed the wound" is spoken of as a person with a back to her plinth | the phrasing; later, "who kept the fire, **after**" | **YES** — and §12.15 says nobody in the game ever notices | — |
| 3 | The rebuilders were thorough but not perfect; there is more they missed | "a hollow the rebuilders missed" | **YES** — it licenses searching, which is the behaviour ch4 needs | — |
| 4 | The school's translation is a deliberate lie rather than an error | the mark is at the other end and the school reads from the wrong one | **YES — the strongest form of H-COVERUP, and it is available at T4** | The word "deliberate" is never used until `companion/ch6.js:286` |
| 5 | The unreadable sheet is Mere's own testimony | signed `ᛗᛖᚱᛖ` (`ch2.js:143`); the plinth back names Mere | **YES** — and nothing in the game points out that the signature transliterates. §12 note |

**Reality.** The strip is the prophecy stone in miniature, and it works by the same mechanism the ch4
shelf will teach and the ch6 stone will turn on. Three objects, one trick, four chapters apart, never
joined by a line of dialogue.

**Cheap breadcrumbs available here. [PROPOSED]**
- **Make the rune signature legible as a signature.** The Reader cannot read the sheet, but a
  four-letter name with two repeated glyphs in a language of shapes is exactly what Glyph-Sight is
  for: *"I can't read a word of it. The last word is four letters and the first and last are the
  same. It's a name."* → then ch4's primer pays it: it is Mere's. Free, and it makes the rubbing a
  promise rather than a chore.
- **Give the niche a flag that something later reads.** One line in ch6 — Marrow: *"You have seen
  this stone before, in little"* — would convert the richest optional discovery in the game from
  decoration into a memory the ending rewards.
- Wren, hearing "four, as one, went through": *"Then which one am I?"* — plants the tapestry's
  question two chapters early and costs eight words.

**The table.** If they press both buttons — and they will, both are free and adjacent — they get the
game's central correction on the shared screen, in Chapter II, and then the game moves on as if
nothing happened. **The table notices that it was not treated as important, and calibrates
accordingly.** That is the risk: the game teaches them that big reveals are flavour.

**Risk.** Two failure modes and they are opposite. A table that skips the niche arrives at ch6 with
nothing. A table that takes it arrives at ch6 with the answer and no acknowledgement. Neither table
is served.

---

### B4.8 · `ch2_ember` — taking it

**Knows.** **No ward and no click.** **Lighter than it looks, colder than anything has a right to
be.** **The hands that carry it go numb to the wrist.** **The blue flame leans, very slightly, toward
whoever is holding it.** (`ch2.js:337-338`)

| # | hypothesis | licensed by | want live? | note / kill |
|---|---|---|---|---|
| 1 | The Cold wants people | it leans toward the holder | **YES.** It is the inverse of Wren's shadow leaning toward fire, and the two are the same fact: a hollow reaches for what fills it | Never joined. See breadcrumb below |
| 2 | It is aware | leaning is a behaviour | **YES, hold loosely** — §12.2 is undecided, and the best answer there ((c): it knows because Wren is it) is served by leaving this live |
| 3 | The lack of a ward means the school does not know what it has / does not fear it | "no ward and no click" behind a handleless door | **YES** — §12.59, and it is a genuinely interesting tension the game raises and drops |

**Cheap breadcrumb. [PROPOSED]** The Seer, two lines: *"It leans at whoever holds it. Wren's shadow
leans at fires. I keep thinking those are the same sentence."* This is the Seer's whisper-answer in
ch3 arriving one chapter early, from the Seer's own mouth, and it makes `ch3_whispers` a decision
about repeating something rather than about breaking a silence. Weigh carefully — it may cost more
than it buys.

---

### B4.9 · `ch2_road` — the bricked arch

**Knows.** **Behind the empty plinth, an archway bricked shut with newer stone, grey where everything
down here is black.** (`ch2.js:346`) And, **in the art only**, the number **212** cut beside it
(`scenes-ch2.js:100`).

| # | hypothesis | licensed by | want live? | note / kill |
|---|---|---|---|---|
| 1 | Somebody closed a road | newer stone, grey against black | **YES** | — |
| 2 | **The bricking and the rebuild are the same act, in the same year** | only if the player reads 212 off the art *and* the Binder said "212" at the door | **YES — and this is the chapter's payoff, and it is currently an art-only inference** | See risk |
| 3 | The road goes to the Cold | it is the only other way out of the room | **YES** — true (`ch5.js:602`, "the road down is wider than the stair, and older") |
| 4 | There is something down the road that is still there | nothing | **[WITHHOLDING]** — the player has no basis. The dead `ch2_map` names "THE FOUNDERS' ROAD · CONTINUES" and is deliberately never rendered (`scenes-ch2.js:112-114`; §13.50k) |

**Reality.** 212 bricked it, and the road is the Founders' own, and the party will walk it in ch5.

**Risk — flagged loudly.** **The most load-bearing number in the game appears on the shared screen
exactly once in Chapter II, as 16px letterspaced text in a background plate, and the prose never says
it.** A table that does not squint never connects the bricked arch to the Binder's "212" and loses
H-COVERUP's date. **Fix cost: four words of prose.** *"…and a number cut beside it: 212."*

**Cheap breadcrumbs. [PROPOSED]**
- Say 212 in prose. (See above. Do this one.)
- The Listener: *"There is air moving through those bricks. Whatever is on the other side is open."*
  Buys the road a destination and costs nothing.

---

### B4.10 · `ch2_stairfall` — one reach (timed, 30 s)

**Knows.** Wren escaped custody/its promise in twenty minutes to follow them down (`ch2.js:358-359`).
The stair gives. **One reach: Wren, or the case.**

| # | hypothesis | licensed by | want live? | note / kill |
|---|---|---|---|---|
| 1 | The Ember is the only insurance, so dropping it dooms everyone | Marrow ×2 | **YES — the whole point of the beat** | Never resolved. §5 W-1 |
| 2 | Wren cannot be hurt / is not exactly alive | H-HOLLOW; the anomalies | **KILL, hard, here.** `WREN_HURT`: "there is a sound from the dark that nobody here will forget" and "The arm is not fine. **Wren does not mention it again, which is the worst part.**" (`ch2.js:374-376`). This is the beat that stops Wren being a puzzle-object and it is the right place for it |
| 3 | Wren followed them because Wren wants to be near them | "You *left* without me" | **YES** — and it is the first evidence for the thing Wren conceals all game (`CANON.md` §9.1) |
| 4 | Wren knew the stair would go | Wren's unexplained knowledge (ch0) | **NO — nothing licenses it and it makes Wren sinister.** Nothing kills it either. Low risk; note it |

**Reality.** The Ember's loss cracks the second bell of Mere's Silent Gate three chapters later
(`companion/ch5.js:27`) **with no causal line on any surface** (§12.14). The Ember is never invoked
at the Finale.

**Cheap breadcrumb. [PROPOSED]** One sentence of causation for `EMBER_LOST` — even superstition:
Marrow, at `ch2_top`, *"Mere's work down there was lit from that stone. Some of it will be dark
now."* It makes the ch5 cracked bell a consequence rather than a difficulty modifier.

**The table.** Thirty seconds, four people, one keyboard. The loudest beat in the span. Whoever says
"the box" owns it for the rest of the night; whoever says "Wren" has to defend it later when the
Silent Gate's second bell is cracked and they do not know why. **The absence of a stated causal chain
means the table blames each other on vibes.** That is either the best thing in the chapter or the
worst, and the author should decide which.

**Risk.** The default on timeout is `wren` (`ch2.js:364`), which is the merciful branch. Correct
call — every timed choice in the game defaults to the passive option.

---

### B4.11 · `ch2_top` — the Provost at the top of the stair

**Knows.** Marrow "stands in it, as if she had not moved since she sent you." Branch: Sorrel's guards
with a writ / Oriel with a lamp she does not need / nobody. Then, on `WREN_HURT`:
**"Who did —" / "She has never finished that sentence in fourteen years, and she does not finish it
now."** (`ch2.js:396-397`) And: **"Far above, the Hearth flickers, and this time everyone sees it."**

| # | hypothesis | licensed by | want live? | note / kill |
|---|---|---|---|---|
| 1 | Marrow loves Wren | an unfinished sentence, fourteen years old | **YES — and this is the earliest the table can get it.** A sharp table has H-MARROW(c) *here*, two chapters before ch4's journal | The best-earned early aha in the span. See §6 aha **D** |
| 2 | "Fourteen years" is the measure of everything | the sentence is dated to Wren's arrival | **YES.** The player is being taught that fourteen years is the unit of Marrow's grief before they are shown the grey thread | — |
| 3 | She does not care about the Ember, only the child | on `EMBER_LOST`: "She does not look down the stair once. **She looks at Wren.**" (`ch2.js:394`) | **YES — and it quietly undercuts H #1 of B4.1.** If the Ember were the insurance, she would look down the stair | Superb, and nobody will consciously notice; that is correct |
| 4 | Oriel's price is going to matter | "She has come to be told" | **YES** — and §12.58 says the scene ends there and nothing is ever told. See §5 W-6 |

**Reality.** The Ember never mattered. Marrow has known since before the errand that the night ends
with Wren in the Cold, and the errand was a way to have the four out of the Hall and down a stair.

**The table.** On `WREN_HURT` this is the quietest the table has been. The unfinished sentence is the
best line in Chapter II and it does its work without a single player being able to say why.

---

### B4.12 · `ch2_flow` — the paths you walked

**Knows.** The flow card names, on the shared screen: *"Read from its mark: four went through"*,
*"Mere's niche, behind the first plinth"*, *"The Reader took a rubbing"*, or *"Something in the
antechamber went unlooked-at."* (`ch2.js:156-157`, `:415-416`)

**This is a breadcrumb surface and the span underuses it.** The flow cards are the only place the
game speaks to the table *about* the table, and their node labels are already doing reveal-adjacent
work. Note for §9.

**Risk.** "Something in the antechamber went unlooked-at" is a taunt with no remedy — the chapter
cannot be replayed in-fiction. For a table that missed the niche this is a small permanent sour note
with no compensating information.

---

# 2 · T5 — CHAPTER III — THE WHISPERING GALLERY

Eight beats. VEIL. Flame 0.7. The chapter where the anomalies stop being explicable and the question
changes from *what is Wren* to *what do we owe Wren*.

---

### B5.1 · `ch3_start` — the long gallery

**Knows.** Soldiers are going through the school room by room. **The portraits mutter when the school
is afraid, and the Listener catches three words: *four went down.*** (`ch3.js:440`) **There is a ward
on the Bell Tower door "older than the school"; Vane's men cannot pass it.** **Marrow rings the
bells, buys twelve turns, and has put out every lamp between here and the Tower herself.**
(`ch3.js:444-445`) Wren: *"Fourteen years I have been sneaking round this school. **Nobody has ever
asked me to.**"*

| # | hypothesis | licensed by | want live? | note / kill |
|---|---|---|---|---|
| 1 | "four went down" = the four Founders | four statues, four plinths, four hands | **YES** — true |
| 2 | **"four went down" = the four players, tonight — the portraits are muttering a prophecy** | it is spoken in the present tense, about tonight's fear | **YES, emphatically.** §12.56 calls the ambiguity almost certainly deliberate. It is the best two-way line in the span, and on ENDING 0 **both readings come true** | Confirm as deliberate and never resolve it |
| 3 | The portraits know things | they mutter, and paint has no shadow (`companion/ch3.js:228`) | **YES, loosely** — atmosphere with just enough ground |
| 4 | Marrow can command Founders' work (she knows the Tower ward, she knows what it will stop) | `ch3.js:444` | **YES** — she is an operator of four-hundred-year-old machinery, which is the correct read of her all game |
| 5 | The Tower ward is Founders' work | Marrow says "older than the school"; the captain says "**Founders' work**" (`ch3.js:605`) | **This is a [CONTRADICTION] the player can see.** The Binder's page says flatly "**This is not one**" — it is a *Vigil* ward (`companion/ch3.js:264`). A Vigil ward cannot be older than the school. §13.6 | See §5 W-3 |

**Cheap breadcrumbs. [PROPOSED]**
- Let somebody **ask** what the portraits mean. Wren: *"Four went down where?"* — Marrow does not
  answer. Free, converts an overheard line into an unanswered question, which is what a mystery is.
- The Listener catches *three* words. A fourth, later in the chapter, would make the portraits a
  running voice: *"…and four came back."* (already true on the Listener's ch5 page,
  `companion/ch5.js:310`; moving one instance earlier costs nothing and makes §12.15 reachable).

**The table.** Transitional. They are being briefed. The one line that lands is "four went down", and
half the table will hear it as being about them.

---

### B5.2 · `ch3_attune` — VEIL, and four phones

**Knows (privately).**
- **Reader** — the two seams' shapes and both readings of each (CROWN/EMBER, THORN/WELL); and, on the
  Wren tab, **"On the four oldest plaques, the letters are the ones from the dormitory door"** and
  "The second version of Wren's name, chalked there in the same hand." (`companion/ch3.js:181-183`)
- **Listener** — two twelve-beat rounds; and a heartbeat list: the Provost normal, the captain normal,
  **the porter fast**, **Wren flat** — "Not the one walking beside you." (`companion/ch3.js:205-207`)
- **Seer** — the corridor under-layer, the two seams; and the gallery: **five living people, five
  shadows, four fall away from the lamp.** "Wren's falls toward it. It always has. **You have run out
  of lamps to blame.**" (`companion/ch3.js:228-229`)
- **Binder** — who is bought: **Bess, sworn to the Provost thirty years — "Nobody searches that
  room"**; the porter, new Crown gold, "paid to shout"; both patrols. And: *"There is one you have
  never let yourself follow: the one from the Provost to Wren… **You know what colour a mother's
  thread is. You decided long ago not to look.**"* (`companion/ch3.js:238-239`, `:275-276`)

| # | hypothesis | licensed by | want live? | note / kill |
|---|---|---|---|---|
| 1 | **Wren's name is written in an alphabet four hundred years old** | the four oldest plaques use the chalk's letters | **YES — the plant that pays at `ch7.js:699`**, where the name is cut in a socket in letters older than the present alphabet | Excellent, and it is the quietest good plant in the span |
| 2 | **Marrow chalked the name on the door** | she wrote WRENN on the roll in those letters, in her own hand (arrives at T6, `companion/ch4.js:203`) | **YES — and it becomes fully available one chapter later.** §12.16's cheapest answer | The game never lets anyone ask. One Reader line closes or sharpens it |
| 3 | The Seer's shadow is not a trick of light | "run out of lamps to blame" | **KILLED here.** Correct |
| 4 | The Provost's thread to Wren is something the Binder is afraid to look at | the Binder's own page says so | **YES — and it is the setup for ch4's chair corner, one chapter out.** The best cross-chapter setup in the span |
| 5 | The school runs on oaths and coin, and an oath is stronger | Bess's thirty-year red thread makes a room unsearchable; gold makes a porter shout | **YES.** This is the Binder's gift turned into political physics and it is the intellectual content of the corridors |

**Cheap breadcrumb. [PROPOSED]** The Reader compares the chalk to *something*. Right now the Reader
learns the chalk's alphabet is the school's oldest and is given no one to suspect. One clause — *"the
only other place you have seen those letters is over the Hearth"* — makes the Reader's anomaly point
at the Founders rather than at a prankster, three chapters before ch7 does it.

---

### B5.3 · `ch3_grid` — THE CORRIDORS (puzzle)

**What it teaches about the world.** Politics, not cosmology, and that is legitimate — but it is the
only puzzle in the span that teaches the player nothing about the Cold, the Founders or Wren.
1. **Three people are awake between the Gallery and the Tower and two of them are paid.**
   (`companion/ch3.js:236`) The school is purchasable.
2. **An oath is a wall.** Bess is sworn, so nobody searches the laundry — the safe room in the entire
   board is made safe by a thread, not a lock.
3. On `VANE_ACCEPT`: *"Two of them are paid. **So, since the Hall, are you.**"* — the Binder is told
   the four are inside the corruption they are mapping. Brutal and excellent.
4. Marrow buys twelve turns by ringing bells she is not supposed to ring.

**What it does not teach, and could for free. [PROPOSED]**
- The corridors have two hidden seams with Founders' shapes over them and the game treats them purely
  as passwords. One clause on the Seer's map — *"the laundry's back seam is older than the wall it is
  in"* — makes the school a building with a Founders' skeleton under it, which is the geography the
  whole game depends on and which the player is never shown above ground.
- A third seam, bricked, with 212 on it. Free. Ties the corridors to the vault.

| # | hypothesis | licensed by | want live? | note / kill |
|---|---|---|---|---|
| 1 | Vane owns most of this building already | bought porter, bought Masters, six soldiers | **YES** — raises the stakes on H-VANE |
| 2 | Marrow has her own network and it is older and quieter | Bess, thirty years | **YES** — and it is the only counter-power in the game |
| 3 | The Bell Tower is a refuge the Crown cannot enter | the ward stops them | **YES** — and it makes ch5's descent feel like a door closing behind them |

**Risk — the biggest sag in the span.** Par [3, 5, 7] minutes; twelve turns; two hidden twelve-beat
timetables; a bought-rooms list; two seams with escalating wrong-word costs; a cumulative bell economy
that shortens the budget. It is a logistics exercise of real quality and it is **twenty minutes of
bookkeeping in the middle of the most emotional chapter in the span**. See §8.

---

### B5.4 · `ch3_whispers` — the laundry (the pivot of Act II)

**Knows.** They came through the laundry in the dark and the woman at the copper **did not look up**
(`ch3.js:500`). Wren tugged each sleeve in turn. Four questions, four phones, four sealed answers, and
**nobody at the table will know what anybody answered.**

| seat | Wren's question | the options | the truth |
|---|---|---|---|
| Reader | *"What does my name mean in the old tongue? Properly. **Not the Provost's version.**"* | TELL ("a small brave bird" — a bluff) / DONTKNOW | DONTKNOW (`lore.js:44`) |
| Listener | *"You hear everyone's heart. Can you hear mine?"* | LOUD (a lie) / NO | NO |
| Seer | *"You look at me strangely. What do you see?"* | TELL (the shadow) / NOTHING | TELL |
| Binder | *"Do you think I'm really the one?"* | YES / DONTKNOW | DONTKNOW |

| # | hypothesis | licensed by | want live? | note / kill |
|---|---|---|---|---|
| 1 | **Wren already knows all four answers and is testing who will say them** | ch0's "I've known for years" (`ch0.js:226`) | **YES — correct, confirmed at `ch6.js:688`, and available to any table that remembers the Prologue** | This is the beat's whole second layer and it is properly earned |
| 2 | **There is a "Provost's version" of Wren's name, and it is a lie Marrow has been telling for fourteen years** | Wren's own phrasing | **YES — and it is [WITHHOLDING] as shipped.** The Provost's version is *never given anywhere* (§12.28). The obvious candidate is the Reader's own bluff option, "a small brave bird" | See breadcrumb below — this is nearly free and doubles the scene |
| 3 | Wren is asking because Wren is frightened | the hurt-arm variants: "does not look at you while asking", "asks it to the arm rather than to you" | **YES** | — |
| 4 | Wren is asking because Wren is *saying goodbye* | nothing yet | **YES, and the game should want it** — it is true and it pays at `ch7.js:768` ("I knew. I wanted to hear what you would say") | No evidence licenses it at T5; it becomes available at T6 with the grey thread |
| 5 | Telling the truth is the kind thing | the Binder's YES text: "You said yes because it was kind. **You are not sure it was kind.**" | **KILL, and the game does, on the phone, privately, per player** | The best-written kill in the span |

**Reality.** All four truths are already known to Wren. Lying costs nothing mechanically and
everything morally; the game scores it at `ch8.js:96` and calls it back at ch6. **`lore.js:44` is
canonical and `ch6.js:327`'s ECHO disagrees for the Binder** (§13.21) — a Binder who told the truth is
scored untruthful at ch6. Player-facing.

**Cheap breadcrumbs. [PROPOSED]**
- **Give the Provost's version one line, once, from Marrow, in Chapter I or II.** "A small brave
  bird" is already written as the Reader's bluff. If Marrow says it first, the Reader's bluff becomes
  a *quotation of Wren's mother*, and the Reader is choosing between the comfortable lie the adult
  tells and the honest "I don't know yet". That is free and it is the best twenty-word improvement
  available anywhere in my span.
- Bess. She does not look up and she never speaks. One sentence — a bowl of something put down beside
  Wren without a word — makes "nobody searches that room" into a person rather than a thread colour.

**The table.** Silence. Four people on four phones, not looking at each other. Then four four-letter
tokens typed into a laptop by somebody who does not know what they mean. Then `ch3_thanks`.

**This is the beat people will talk about on the drive home.** It is also the beat most at risk from
its own machinery — see Risk.

**Risk.** The emotional peak is delivered through the game's slowest input ritual: open SPEAK, type
LINEN, read, choose, read the aftermath, type a sealed word back into the Hearth, four times, one at
a time. Four minutes of typing in the middle of a gut-punch. **Consider: let the Hearth accept the
four tokens in any order and in parallel**, or cover the ritual with Wren's own patter (there is
already a `stuckText`; there is no ambient line). The mechanism is right — sealed, private,
unknowable — and its pacing works against it.

---

### B5.5 · `ch3_thanks` — "even the ones who lied"

**Knows.** *"Received. Received. Received. Received."* / *"Wren looks at the four of you, one after
another, longer than is comfortable."* / **"Thank you. All of you. Even the ones who lied."** /
*"Nobody asks which ones that means."* (`ch3.js:527-531`)

| # | hypothesis | licensed by | want live? | note / kill |
|---|---|---|---|---|
| 1 | Wren knows who lied | the line | **YES — and it is true** |
| 2 | Wren is forgiving them in advance for something larger | the phrasing, and the timing (a soldier clears its throat one line later) | **YES.** This is the first time the player suspects Wren has already decided how tonight ends |
| 3 | The four are worse people than they thought | the private, per-player knowledge of what they answered | **YES — and this is the real content of the beat** |

**Reality.** Wren has known all four anomalies for years and is managing the four's guilt, which is
the thing Wren does instead of asking for help (`CANON.md` §9.1).

**Risk.** None. This is the best six lines in my span. Do not touch them.

---

### B5.6 · `ch3_door` — the Tower door (timed choice, 75 s)

**Knows.** **"Hand over the boy, or the Provost hangs. The Envoy has her in the Great Hall with a rope
over the beam."** / **"I am not a cruel man. I am a punctual one."** (`ch3.js:543-544`)

| # | hypothesis | licensed by | want live? | note / kill |
|---|---|---|---|---|
| 1 | Vane will really hang the Provost | the captain says so and has six soldiers | **YES, for 75 seconds — and then the game undercuts it.** §12.39: on **every** branch, "The rope came off the beam an hour ago" (`ch3.js:635`, `:644-645`). The harshest choice in the chapter, costing −2 `WREN_TRUST`, is retroactively made pointless in the very next scene |
| 2 | The captain is a rule-follower, not a sadist | his own description; his three branch behaviours | **YES — true, and one of the cleanest minor characterisations in the game** |
| 3 | Vane's men say "the boy"; the narration says "the child" | verbatim, all night | **YES if deliberate** — §12.57; the only in-fiction voices that assign Wren a gender are the Crown's |

**[FINDING] The undercut is the sharpest structural flaw in my span.** A table that surrenders Wren to
save Marrow is told one scene later that Marrow was never in danger. That is not tragic irony
delivered — it is the game telling four people their hardest decision was a prop. **Fix: either the
rope is real (Marrow arrives with a mark on her neck and says nothing about it), or the captain's
threat is visibly a bluff the table could have called** (the Listener: *"his heart did not change
when he said that"* — free, in-gift, and it converts the choice from a coin to a read).

**The table.** Real argument, 75 seconds, with the surrender option sitting there in `dark` class.
Most tables fight. A `VANE_ACCEPT` table has a private, horrible extra option and the Hearth notes the
captain "looks at you a beat longer than he looks at Wren."

---

### B5.7 · `ch3_fight` / `ch3_stand` / `ch3_surrender`

**Knows (FIGHT).** **A Vigil ward is cut by the keeper sworn to it; the keeper's mark binds; it begins
at the notch and runs widdershins, "back against the count"** (`companion/ch3.js:264-266`). And:
*"The ward wakes. Not light. **Heat**, a wall of it, and every lantern on the stair goes out
together."* / The captain: *"**Founders' work.** So. Not tonight, then."* / **ASH, THORN, KNOT —
*Fire, go through, four as one.*** (`ch3.js:604-608`)

**What it teaches.**
1. **There are classes of ring, and the rule you were taught is local.** The Prologue's lamp taught
   "begin at the scratch"; this ward begins at the notch. The player learns that institutional
   knowledge must be re-dated per object — which is the game's thesis in mechanical form, and which
   ch5's gates will use again with a third answer.
2. **Founders' work is warm.** The ward's response to a threat is heat. The Hearth is warm; the Cold
   is cold; the Founders' machinery takes the Hearth's side. Nobody says it, and it is a free
   cosmology.
3. The chapter's second three-word sentence about the plot: *Fire, go through, four as one.*

| # | hypothesis | licensed by | want live? | note / kill |
|---|---|---|---|---|
| 1 | The school's own old keepers made this, not the Founders | the Binder's page | **YES — and unresolvable.** §13.6. The captain and Marrow say Founders'; the Binder's page says Vigil, and the *puzzle* is derived from the Binder's version | [WITHHOLDING by accident]. A player who notices gets a contradiction with no path. See §5 W-3 |
| 2 | Fire protects; cold takes | the ward's heat; the Ember's numbness | **YES**, and it is nearly free to strengthen |
| 3 | Somebody sworn to this door is still alive, or was | "the keeper sworn to it" | **YES** — §12.52, never identified. Interesting *because* the Binder's own rule names a person who does not exist in the fiction |

**Cheap breadcrumb. [PROPOSED]** Name the Tower ward's keeper, once, as a dead Provost with a date.
It costs one line, it fixes §12.52, and it makes the Bell Tower a thing the school has been keeping
rather than a thing the school inherited.

---

### B5.8 · `ch3_flow`

**Knows.** **"The rope came off the beam an hour ago."** Above them is the Provost's study.

See B5.6 for the finding. One further note: the flow graph declares a node `ch3_bell4` ("A fourth
bell") that has **no scene** (`ch3.js:416`; §13.48). On `WREN_SCARED` a player sees a labelled node
for a beat that never happened and will ask what it was.

---

# 3 · T6 — CHAPTER IV — THE OATH

Nine beats. EMBER. Flame 0.5. **The densest chapter in the game and the one where the hypothesis space
should crack open.** Four of the game's biggest facts are delivered here, one per Sighting, in ten
minutes, and the chapter provides no beat in which the four are spoken to each other.

---

### B6.1 · `ch4_start` — the Provost's study

**Knows.** **A fire, a wall of books, and a primer left open on the desk.** (`ch4.js:328`) Branch line
on `DOOR`. **"Provost Marrow stands with her back to the fire, which is how she stands when she has
decided something."** (`ch4.js:341`) Wren: *"She has a **fire**. In her study. We had a lamp."*

| # | hypothesis | licensed by | want live? | note / kill |
|---|---|---|---|---|
| 1 | The primer is left open on purpose, for them | it is the one object named before any person | **YES.** It is: she taught herself to write Wren's name in it (`companion/ch4.js:203`), and she left it where a Reader would find it. Never stated |
| 2 | She has already decided, and the oath is a formality | the back-to-the-fire tell, immediately | **YES — the correct read of the whole chapter** |
| 3 | Wren notices the inequality of fires and says nothing about it | the joke | **YES**; it is the chapter's first quiet cruelty |

**Cheap breadcrumb. [PROPOSED]** The primer's open page. If it is open at the letters that spell
WRENN, the Reader's ch4 Wren-tab reveal ("the Provost wrote it herself, in the old letters") becomes
something the table saw before it was explained. Free.

---

### B6.2 · `ch4_marrow` — what she wants

**Knows.** **"Midnight is ninety minutes off. By then I will be under the school."** **"So I am asking
you to swear an oath. Take Wren down into the Cold at midnight, whatever it costs."** **"The scroll is
behind the third shelf. Read it. *Argue.* I will be ten minutes."** (`ch4.js:353-355`) Then: *"The
door shuts."*

| # | hypothesis | licensed by | want live? | note / kill |
|---|---|---|---|---|
| 1 | **Marrow is enacting the prophecy tonight, deliberately, with the child she raised** | her own words | **YES — H-MARROW(b), now unavoidable** |
| 2 | She wants them to argue because she wants to be talked out of it | "Argue." + ten minutes alone | **YES — and it is nearly true.** She yields to every argument all night, including a non-argument (`ch7.js:397-398`) |
| 3 | She leaves them alone with her study **on purpose** | ten minutes, a primer left open, a scroll behind a shelf she tells them how to open | **YES — and it is the best unstated thing in Chapter IV.** She is letting them find what she cannot say |
| 4 | The oath is a trap to bind the four to something | Law 4 has not been taught yet | **KILL at B6.3**, where the Binder's page prints both locks and what each costs |
| 5 | Wren is not going to survive this | "whatever it costs" | **YES.** The player should now be frightened *for* Wren rather than *of* Wren. The chapter turns H-HOLLOW from a puzzle into a grief |
| 6 | Marrow does not care about Wren | her tone, the word "it" in ch4's journal | **KILL — and the game does, at the desk corner.** But see the risk: the killing evidence is behind a puzzle that can fail |

**[FINDING — evidence that kills a wrong reading is losable.]** The journal ("IT SLEEPS WITH THE
WINDOW OPEN. IT LAUGHS AT MY JOKES.") is the only thing in the game that kills "Marrow is cold". It is
gated behind a three-try transcription puzzle in a dead alphabet. A table that burns three tries
(`ch4.js:491`) gets `SHUT.desk` — "The letters will not come. Wren shuts the journal." — and carries a
false Marrow into ch5, ch6 and the endings. **Propose: on the third failure, Wren reads one line of
it aloud.** Wren cannot read the old letters either, but Wren can say *"She keeps that open at the
same page."* Costs nothing, keeps the puzzle's teeth, and does not let the wrong Marrow survive.

**The table.** The argument the game invited. Real people will now spend five minutes on "do we
actually think this is right?", which is exactly what the author wants and which the game supports
with the one word "Argue."

---

### B6.3 · `ch4_attune` — EMBER, and four phones

**Knows (privately).**
- **Reader** — the primer is now permanently in the Book (`companion/ch4.js:67-69`); the six spines;
  the oath's three worn words **ASH, THORN, WELL — *fire; a gate; down***, and **"Nobody cut the
  fourth. The swearer chooses that one."** (`companion/ch4.js:198`) On the Wren tab: **WRENN, drawn in
  the old letters; "On the Vigil roll the Provost wrote it herself"; "Not a bird. *Wrenn* is the
  hollow of a bell — the space inside it that makes the sound."** (`companion/ch4.js:202-204`)
- **Listener** — the memory-bell's two voices; and, on the Wren tab, **"It did not give you Wren. It
  keeps every voice in this room but one."** (`companion/ch4.js:227`)
- **Seer** — three cuts in the room; the shelf's marked end; **"four walk in, no child — the fourth
  carries, the second reaches back"** (`companion/ch4.js:115`); and shadows again.
- **Binder** — a turned board keeps its places; **the scratch rule, now explicitly qualified as
  Founders'-work-only**; the two locks and what each costs; **"The one you swear to cannot tell the
  difference. You can."**; and **"The Provost's thread to Wren is grey. Hers to the four of you is
  red, and not tied yet."** (`companion/ch4.js:257-264`)

| # | hypothesis | licensed by | want live? | note / kill |
|---|---|---|---|---|
| 1 | **Wren's name means *hollow*, and Wren is fourteen years old and was left by a fire** | the Reader's page, unconditionally | **YES — this is H-HOLLOW's strongest single piece and it arrives here** | Correct, and it pays at `ch7.js:699` and `ch8.js:499` |
| 2 | **Marrow named the child *hollow* on purpose, knowing what it was** | she wrote it herself, in the old letters, on the roll | **YES — the most chilling inference available in my span, and it is fully licensed at T6** | True (`ch6.js:691-692`). The game never lets a character voice it |
| 3 | The bell keeps every voice but Wren's because Wren has no voice to keep | the Listener's page | **YES** — a fifth anomaly, never counted as one (`CANON.md` §0.1 note) |
| 4 | You may lie about the lock and the Provost cannot tell | Law 4's last clause, printed | **YES — and it is the moral centre of the chapter** | See B6.7 |
| 5 | Marrow's Sight is spent (her thread is grey) | "grey" is used for two unrelated things | **KILL — and nothing does.** The game uses *grey* for a grief-thread and for a spent Sighting and never distinguishes or joins them. See §5 W-7 |

**Reality.** WRENN is *the hollow of a bell — the space inside it that makes the sound*, and the
eighth glyph COLD is the one glyph with no note (`glyphs.js:18`, `:29`). The Reader holds the
etymology; the Listener holds the silence. **Neither page says the other exists.**

**Cheap breadcrumb — the best one in the chapter. [PROPOSED]** One clause on the Listener's Ladder or
ch4 page: *"COLD is the only one with no note. It is a rest."* is already in the Book
(`book.js:91-92`). Add its mirror on the **Reader's** Wren tab: *"Wrenn — the hollow of a bell. The
space that makes the sound, and makes none of its own."* Two seats, one word, and a table that talks
arrives at the eighth glyph at T6 instead of T9. **That is the ideal one-beat-early aha the author
asked for, and it costs a sentence.**

---

### B6.4 · `ch4_shelf` — THE FALSE SHELF (puzzle, one pull)

**What it teaches about the world.** *A thing hung the other way up says the opposite word and keeps
its place.* That is **Law 10** made physical, and it is the exact mechanism by which the prophecy
stone is misread and by which Mere's strip has two readings. **The false shelf is a rehearsal for the
climax of Chapter VI, performed by the players' own hands, and nothing in the game says so.**

- Success gloss: **THORN, EMBER, VEIL, CROWN — *A gate, kept hidden, by the first.*** (`ch4.js:422`)
  CROWN glosses "the one; the first; **the Chair**" (`glyphs.js:27`). The shelf's own sentence is
  *a gate, kept hidden, by the Chair* — about the Chair's own hidden cupboard. This is a joke and a
  thesis and nobody in the fiction notices.
- **Failure** gloss: *"The board had been hung the other way up. Every book still stood in its own
  place. **Only what it said had changed.**"* (`ch4.js:419`)

**[FINDING] The world-teaching sentence is on the losing branch only.** The line that explains the
Order's entire method — *only what it said had changed* — is printed when the table fails the puzzle
and withheld when they succeed. **Fix: print it on both.** It is the one sentence in my span that
would make ch6's reveal land as recognition rather than information.

| # | hypothesis | licensed by | want live? | note / kill |
|---|---|---|---|---|
| 1 | Things in this school say the opposite when turned, and that is how the lie works | the shelf, the strip, Law 10 | **YES — and it is the single most important transferable idea in the span** | Currently half-delivered |
| 2 | Marrow hides things badly and in plain sight | Wren: "Badly, and in plain sight. I told you." (`ch4.js:423`) | **YES** — and it supports #3 of B6.2 |
| 3 | The Chair keeps a gate | the gloss | **YES if anyone notices** |

**The table.** One pull. High tension for a puzzle whose loss costs only a joke about Wren's boot.
Good ratio. The Binder's "a turned board keeps its places" is the axis nobody else can supply and it
is a genuinely satisfying seat moment.

---

### B6.5 · `ch4_secrets` — THE STUDY'S FOUR CORNERS

The richest beat in the span. Four Sightings, four corners, four classes of evidence.

| corner | seat | what it delivers | cite |
|---|---|---|---|
| **the desk** | Reader | **"IT SLEEPS WITH THE WINDOW OPEN. IT LAUGHS AT MY JOKES."** — the love, in the same two sentences as the word *it* | `ch4.js:211`, `:214` |
| | | and, on `LETTER`: **Mere's sheet comes clear** — *"We were four. I offered to go alone and was refused. **One was never asked.** We wrote the cold glyph with four hands, and **came up grey.** — Mere, who kept the fire, **after**."* | `companion/ch4.js:62`; `ch4.js:498` |
| **the mantel** | Listener | Vane: **"The Crown will have the Cold open, one way or another."** / Marrow: **"Then the Crown will go through me. **And through it.**"** | `companion/ch4.js:213`; `ch4.js:215` |
| **the tapestry** | Seer | four walk into the fire; **the fourth carries COLD**; **the second reaches back**; **no child anywhere in it** — and then: *"'I have seen what is under the paint,' the Envoy said. **So he had.**"* | `ch4.js:216`, `:536-537`, `:557` |
| **the chair** | Binder | **"Grey. The colour of someone who has already said goodbye."** plus, by branch, **Oriel's note** (*"I scraped that paint myself, as a girl, with a bread-knife. **They painted it back inside the week.**"*) or **Marrow's unsent letter** (*"To the nine. Tonight I go down to the thing I have never named to you."*) | `ch4.js:217`, `:588`, `:592` |

**What the four corners together say, and nobody states:** the paint is a lie; the lie is actively
maintained by somebody, *this decade*; the Founders were four and paid with something called *grey*;
one of them offered to go alone and was refused and one was never asked; the woman raising Wren said
goodbye fourteen years ago; and the Crown wants the wound open rather than shut. **That is the entire
plot except "the fire is them" and "Wren is the hollow."**

| # | hypothesis | licensed by | want live? | note / kill |
|---|---|---|---|---|
| 1 | **Vane is not simply the villain** | "So he had." — the narration vouching for him | **KILL H-VANE(a), and the game does, cleanly, here.** Best-timed kill in the span: it lands the chapter after Vane invited it (`ch1.js:283`) |
| 2 | **Vane is still dangerous and is right** | the memory-bell: the Crown wants the Cold *open* | **YES — H-VANE(c), which is correct and is the interesting shape** |
| 3 | **"And through it" means Wren** | Marrow writes Wren as *it* in the journal found in the same ten minutes; Wren fixates: *"Through **it**. She said through it."* | **YES — and this is the best two-phone inference in the game.** The Reader has the pronoun, the Listener has the sentence, and only speech joins them | Never confirmed (§12.45). Correct to leave unconfirmed; see risk |
| 4 | **The Founders paid with something, and the word for it is *grey*** | Mere's sheet | **YES — and this is the price, named at T6** | But *grey* is never connected to *Sight* until ch8. See §5 W-7 and §6 aha **E** |
| 5 | **There were more than four people, and one was excluded** | "We were four… one was never asked" — arithmetic that does not close | **YES, strongly.** §12.4. It pays at `ch5.js:287` (Mere's door "for people who were not asked") on one branch only |
| 6 | **Mere survived** | "who kept the fire, **after**" | **YES** — §12.15; no character ever remarks, and the Gallery portraits corroborate on one phone (`companion/ch5.js:310`) |
| 7 | The overpaint is being maintained *now*, by someone at this school | Oriel's note, branch `ORIEL` | **YES — the only living-conspiracy evidence in the game**, and it is on one branch |
| 8 | Marrow has the Convocation behind her | nothing on `SORREL`/`ORIEL`/`VANE_ACCEPT` | **KILL — and it is only killed on the NEITHER-ish branch**, by the unsent letter. See risk |
| 9 | Wren is "the one born of four" | the school, everyone | **KILL — and Wren does it, out loud, in this room**: *"Four of them. **Where is the one born of four? Where am I?**"* (`ch4.js:558`) |

**[FINDING — the missing synthesis beat.]** The four corners are found separately, each behind its own
answer-box, each printing one line, and then the leave button says "Marrow returns" and `ch4_swear`
begins with "The stair creaks." **There is no beat in which the four discoveries are spoken to each
other.** The game's own house rule guarantees each was *said aloud once* to open its corner — but
said as a puzzle answer ("fourth", "second"), not as a finding. The player leaves the richest room in
the game holding four unconnected facts.

**Fix, and it is cheap:** before `leave` resolves, one prompt — *"Before she comes back: each of you,
one sentence. What did you find?"* — with four one-line recaps printed together on the shared screen.
It costs one screen, it uses text that already exists (`FOUND`, `ch4.js:213-218`), and it is the
single highest-value change available anywhere in T4–T7.

**Second finding — branch asymmetry.** The chair corner delivers *Oriel's note* (the conspiracy is
alive) on `ORIEL`, *Marrow's unsent letter* (she is acting alone, against the nine) on
`!ORIEL && !SORREL && !VANE_ACCEPT`, and **"nothing but the shape of her"** on `SORREL` and
`VANE_ACCEPT` (`ch4.js:585-593`). So the two branches where the four sold something get the least
information. That is thematically defensible and epistemically expensive: on `SORREL`, the player
never learns that Marrow is defying her own Convocation, which is the fact that makes her sympathetic
in ch6.

**The table.** Four people, four phones, one keyboard passing by name. The Seer is the Voice
(`ch4.js:368`) and has to keep the room talking while each player goes into their own corner. Expect
the room to fragment: this is the one beat where the shared-screen discipline breaks down and people
read their own pages in silence. Expect one player to be *visibly upset* by their corner — the
Binder at the grey thread, or the Listener at the bell that will not keep Wren's voice.

**Risk — the chapter's overload point.** Four typed-answer sub-puzzles with per-corner budgets
(3/3/2/2 tries), a clickable room, and two hand-rolled hint timers at 6 and 8 minutes
(`ch4.js:458-459`). A thorough table spends fifteen minutes here. A table that guesses loses corners
permanently. **And a lost corner is a lost fact, not a lost puzzle.** See §8.

---

### B6.6 · `ch4_swear` — she is back early

**Knows.** **"The stair creaks. Provost Marrow is back early, and does not say why."** (`ch4.js:607`)
On `TAPESTRY`: "She sees the tapestry, and stops in the doorway." / "So. The Seer." Then: **"The
scroll, then. Read it, all four of you. Then swear, or do not."** And: *"Unrolled: the words she said
before she went out, and under them a ring of four slots."* (`ch4.js:610`) And the Hearth's own
permission: **"No bell counts this one. Argue as long as you need."**

| # | hypothesis | licensed by | want live? | note / kill |
|---|---|---|---|---|
| 1 | She went to check something and it was worse than she thought | "back early, and does not say why" | **This is [WITHHOLDING].** §12.44: the narration explicitly flags a gap and never fills it. The player is told to wonder and given nothing. **Either make it mean something or cut the clause** |
| 2 | The scroll is *her own* oath, previously sworn | **"the words she said before she went out"** | **YES — and it is a genuinely superb, almost invisible fact.** The four are being asked to swear the oath the Provost swore. Nobody remarks. Free to sharpen with four words |
| 3 | The oath has teeth the four cannot see | Law 4 | **YES** |

**Cheap breadcrumb. [PROPOSED]** Sharpen #2: *"the words she said before she went out — **the first
time**."* Or the Binder: *"Somebody has closed this ring before. The wax has been warm."* Either makes
the oath a repetition and Marrow a person who has already done this once, which is exactly what
`ch7.js:777` ("I should have gone fourteen years ago") wants to land on.

**[FINDING] What the four actually swear is never printed** (§12.69). The Reader's page gives the
three words — ASH, THORN, WELL = *fire; a gate; down* — and the lock is theirs. Every other ring in
the span prints its gloss on solving (`ch2.js:266`, `ch3.js:608`, `ch4.js:422`). **The one ring whose
sentence is about the players themselves is the one that is not glossed.** Propose a `solvedText`
line: *"ASH, THORN, WELL, and a lock. **Fire; a gate; down; and bound** (or *what remains*). That is
what you said."*

---

### B6.7 · `ch4_oath` — THE OATH (puzzle, one closing)

**What it teaches about the world.**
1. **Law 4 (Order's, 340): an oath's last glyph is its lock. KNOT cannot be unbound. EMBER can be
   remembered and reconsidered. *The one you swear to cannot tell the difference.*** (`lore.js:64`)
2. **And therefore: the player is handed a legislated permission to appear more bound than they are,
   by the same institution that struck Law 0 and called it grammar.** The four are invited, by the
   Order's own rule, to do to Marrow a small version of what 212 did to everybody. **Nobody in the
   game says this.** It is the largest free thematic payoff in my span.
3. The Binder's page is explicit that the qualifier is load-bearing: this is *Founders' work*, not a
   Vigil ward, so the scratch rule applies again (`companion/ch4.js:257`). The player is now
   three-for-three on "the rule depends on what the object is and when it was made".

| # | hypothesis | licensed by | want live? | note / kill |
|---|---|---|---|---|
| 1 | EMBER is the coward's lock | it can be taken back | **NO — and the game deliberately refuses to moralise it.** The Binder's own page is neutral: "if there turns out to be a later" (`companion/ch4.js:261`). Good |
| 2 | KNOT will be used against them | it cannot be unbound | **YES — and it is true**: at `ch7.js:387` Marrow bars the Fourfold Walk with it and must be argued past |
| 3 | Marrow can tell which lock they used | Law 4 says she cannot | **KILL — and the game contradicts itself.** §13.14: `ch7.js:387` has her say "You swore under KNOT" and be right. The game never says how. **This is player-visible and a Binder will catch it** |
| 4 | An oath is a physical fact in this world, not a social one | wax that softens under KNOT (`ch4.js:745`); a thread that goes red and knotted | **YES — and it retro-explains Bess's laundry** |

**The table.** **The biggest argument in the span**, and the game explicitly licenses it: "Argue as
long as you need." The Binder holds the choice and the other three will want a vote. Real people spend
five to ten minutes here and the conversation is about whether it is acceptable to lie to a woman who
is about to die. That is the game working at full power.

**Risk.** `maxTries: 1`. A full, lawful, wrong board writes `OATH 0`, `OATH_KNOT false`,
`REFUSED_OATH true` — **identical to an outright refusal** (§13.16) — and the world cannot tell
"they refused her" from "the wax went cold" from ch5 onward. On-screen, Marrow's and Wren's reactions
differ (`ch4.js:765-770`), which is right; downstream, they do not. **Every table that fails the oath
is treated by ch5's stair, ch7's block and ch8's epilogue as a table that refused.** Player-facing and
unfair.

---

### B6.8 · `ch4_sworn` / `ch4_refused`

**Knows (sworn).** *"Bound. Good. **Then I need not carry it alone.**"* / *"When the bells ring
tonight, hold them. I will do the rest."* (`ch4.js:747-748`) On KNOT: **"She puts a hand on the
nearest shoulder. Nobody has seen her do that before."**

**Knows (unsworn).** *"Then you are no part of this. Go to your beds. **I will do it alone, with the
child.**"* / on refusal, Wren: *"They said **no**, Mum. Nobody says no to you. I want to remember
it."* / *"She takes Wren by the hand, and the door shuts. **It does not lock.**"* / *"You will be at
the stair before she is."* (`ch4.js:768-772`)

| # | hypothesis | licensed by | want live? | note / kill |
|---|---|---|---|---|
| 1 | Marrow has been carrying this alone for fourteen years | "Then I need not carry it alone" | **YES — the line that turns H-MARROW from villain to tragedy** |
| 2 | Wren calls her Mum | `ch4.js:770`, and three more times all game | **YES.** §13.13 flatly contradicts it at `ch8.js:346` ("who **once** called someone Mum **by accident**") — both words false |
| 3 | The door not locking is a gift | the prose gives it one clause of weight | **YES.** "It does not lock" is Marrow letting them follow. Elegant |
| 4 | She will not actually do it alone | she says she will; ch5 shows her going | **YES**, and ch6's "The last of it is not mine to do" resolves it |

---

### B6.9 · `ch4_flow`

**Knows.** *"The study kept four secrets and you found {none/one/two/three/all four}."* The game tells
the table its own score on a beat whose currency was information. Good.

---

# 4 · T7 — CHAPTER V — THE LONG STAIR

Twelve beats. ASH. Flame 0.3 → 0.25. **The chapter where the wound is named on the shared screen,
where Law 0 is written for the first time, and where a Sighting is spent in front of the table.**

---

### B7.1 · `ch5_start` — the Long Stair, an hour before midnight

**Knows.** *"Midnight is an hour away. **The Hearth is a blue tongue the height of a hand.**"* And,
from Marrow, flat, on the shared screen:
**"Under this school there is a wound. The Founders shut it and left the fire on top."**
**"The fire is going out. Tonight I take the child down and shut it again."** (`ch5.js:248-250`)
Wren: *"And I am the — what am I again? **The occasion.**"*

| # | hypothesis | licensed by | want live? | note / kill |
|---|---|---|---|---|
| 1 | The fire is going out because it has been **spent** — it was always going to | Mere's sheet + the tapestry, if both were found | **YES — and it is correct, and at T7 only the best-equipped table can hold it** | Never stated until `ch6.js:850` |
| 2 | **H-BLAME: the fire is going out because of Wren** | fourteen years ago it went out and left a child; it has flickered only since Wren's Vigil | **YES, emphatically — this is the most productive wrong theory in the game** | Killed only at `ch6.js:850`: "Nobody did anything wrong." Two chapters of dread, correctly placed |
| 3 | H-BLAME': something is draining it — the Cold, the Crown | Vane wants it open; the Cold "pushes" (later) | **YES** — plausible, wrong, and it makes Vane scarier |
| 4 | **Marrow intends to walk in herself** | "**I** take the child down and shut it again" is grammatically ambiguous about who walks | **YES — a genuinely fine ambiguity.** Resolved at `ch6.js:629`: "It is held. Not closed — held. **The last of it is not mine to do.**" |
| 5 | Shutting it requires four, not one | Mere's sheet ("four hands"), the tapestry (four figures), the strip ("four, as one") | **YES — and by T7 a well-equipped table has three independent sources** | This is the span's central accumulation and it works |
| 6 | The Hearth going out entirely is the end | it is a health bar at 0.3 | **YES**, and `ch7.js:681` will spend it |

**Reality.** The fire is four people and it has been burning for four hundred years. Nothing in my
span licenses that. See §6 aha **H**.

**The table.** The premise has now been said out loud by an adult. Some tables will only *now* realise
the ch0 cold open was literal. Expect somebody to say "wait — an actual wound? in the ground?"

---

### B7.2 · `ch5_descent` — the foundations

**Knows.** *"The stair is older than the school."* *"Above you, boots. The Envoy's soldiers are on the
stair."* **"Mere warded this stair. She was one of the four who built the Hearth."** **"Her gates do
not lie. **They do not play fair.** Read them together."** (`ch5.js:263-266`)

Note the retro-reward: a table that found the niche in ch2 has known Mere's name for three chapters;
a table that did not is given it here, free, by Marrow. That is a good design — the optional
discovery is rewarded with *earliness*, not with exclusivity. **It is also the game's only example of
that pattern, and it should be the template for fixing the niche's weightlessness** (§5 W-4).

| # | hypothesis | licensed by | want live? | note / kill |
|---|---|---|---|---|
| 1 | Mere built things to be read by four people | "Read them together" | **YES — true, and it is the design philosophy of the Founders made explicit** |
| 2 | Mere expected somebody to come down here who should not | "They do not play fair" | **YES** — pays at B7.4 |
| 3 | Marrow knew Mere's work in detail before tonight | she names the ward, its maker, its character | **YES — she has been studying this for fourteen years**; never stated |

---

### B7.3 · `ch5_attune` — ASH

**Knows (privately).** Both lintels clean, every shape with both its words (Reader); eight bells and
their counts, plus the cracked-bell branch on `EMBER_LOST` (Listener); both rings' cuts and marked
ends (Seer); **and, for the Binder, three clauses that are all political**:

> *"Above ground a sigil begins at a scratch. Everyone at this table has heard you say so twice
> tonight."* / **"These two doors are older than that Law, and they do not keep it."** /
> *"Two Laws disagree about which way a carving runs… **The older binds.**"* /
> on `LAW0`: **"Where a carving shows COLD, the older Law writes it into its slot — and the older Law
> is back in your Book."** (`companion/ch5.js:329-335`)

| # | hypothesis | licensed by | want live? | note / kill |
|---|---|---|---|---|
| 1 | Everything the Binder was taught is younger than what is down here | three chapters of it | **YES — the chapter's thesis, delivered to the one seat that can act on it** |
| 2 | **The struck Law came back, and nobody knows how** | the Binder's card flips to RESTORED | **[FINDING]** — see below |

**[FINDING — the span's worst epistemic hole.]** `LAW0` is set by
`!!(LETTER_READ || TAPESTRY || ORIEL)` (`ch4.js:85`, mirrored `ch5.js:8`). On the `ORIEL` branch, that
is **the Chapter I promise**, not `ORIEL_NOTE` — so a table that merely *said the word "Oriel"* in
Chapter I arrives at the Silent Gate with a struck Founders' Law restored in the Binder's Book, with
**no prose covering it on any surface** (§13.17). The player's most important Law arrives unearned,
and the Binder's page simply flips.

**Fix, and it is nearly free in fiction:** Oriel scraped the paint as a girl; she *knows*. A promise to
her plausibly earns a note back. One line — Oriel's note at `ch4.js:588` adding *"and the Law they
struck that year is in the margin of my copy"* — converts the game's largest unexplained causal jump
into a paid-for favour. As shipped, the note is only reached via the **chair** corner, which is the
Binder's, which is exactly the right seat.

---

### B7.4 · `ch5_door` — Mere's door (branch: unsworn)

**Knows.** *"The lantern goes on down without you, and the dark closes over where it was."* Then:
**"Mere left this one for people who were not asked. Mum will pretend she did not see."** / *"Wren
came back up three flights in the dark, for you."* (`ch5.js:285-288`)

| # | hypothesis | licensed by | want live? | note / kill |
|---|---|---|---|---|
| 1 | **Mere's "one was never asked" has a door with their name on it** | Mere's sheet + this line | **YES — and it is the most elegant rhyme in the game** | §12.4. **It requires: refusing/failing the oath, AND the ch2 rubbing, AND the ch4 desk.** A conjunction almost no table meets |
| 2 | **Wren knows things Wren cannot know** — Mere's door, its maker, its purpose, and the way down three flights in the dark | this beat + `ch0.js:172-174` | **YES — the strongest evidence for H-HOLLOW that is not an absence** | §12.29; nobody in the fiction ever asks |
| 3 | Wren came back for them | "for you" | **YES — and it is the emotional counterweight to the refusal branch** |

**[FINDING]** The game's best answer to its own oldest open question is gated behind its rarest branch
*and* two optional discoveries. **Propose: move the door's line, or a version of it, onto a surface
every table sees.** Cheapest: the Seer, at `ch5_gate1`, notes a fifth cut in the wall that is a door
and is not on the stair's plan. Second cheapest: Wren says it whether or not the party used the door
— *"There's another way down, for people who weren't asked. Mere left it."*

---

### B7.5 · `ch5_gate1` — MERE'S FIRST GATE (puzzle)

**What it teaches.** That the Binder's rule must be re-dated *per object*, for the third time, and
this time the answer is neither of the two previous answers: the count begins at the **chip**
(`ch5.js:113`). Institutional knowledge is not merely stale; it is *locally* stale.

Solve gloss: Wren, **"One, bound, down. Cheerful woman, Mere."** (`ch5.js:337`) CROWN · KNOT · WELL =
*the one; four-as-one; a going-down.* **The gate says the school's reading and the true reading in the
same breath, and Wren jokes past it.** This is a deliberate plant and it is good.

| # | hypothesis | licensed by | want live? | note / kill |
|---|---|---|---|---|
| 1 | Mere built her gates to defeat exactly the people who would come later with the wrong rule | three gates, none obeying the taught rule | **YES — and it implies Mere anticipated 212.** Enormous, free, unstated |
| 2 | "One, bound, down" is a sentence about tonight | the gloss | **YES**, and the Wren line carries it |
| 3 | The Provost can break a Founders' gate | the failure branch: "It breaks." + "Mere. Forgive me." (at gate 2) | **YES — and it is the chapter's best measure of how far she will go** |

**Cheap breadcrumb. [PROPOSED]** The Binder, once, on the pattern: *"Three doors tonight, three
different rules, and the one they teach us is not any of them."* It makes the player's accumulated
frustration into an argument.

---

### B7.6 · `ch5_marches` — the world ends at a ledge

**Knows.** *"The stair ends at a ledge, and the world ends with it."* **A cavern with no far side, and
drowned arches in black water.** **On a shelf above them, four thrones. Empty.** **"And under all of
it, glowing like a sky from beneath, the Cold. Nobody would say where it was."** (`ch5.js:345-348`)
Wren: *"Four thrones. Four Founders. It is a **theme**."*

**In the art, not the prose:** the drowned First Hall has **five** arches (`scenes-ch5.js:64`); the
thrones' backs are drawn as **crowns** (`:66-67`); forty cold-blue stars are painted on the cavern
**roof** and the cold "sun" is anchored at the **bottom** (`:69-70`) — the world is a lid.

| # | hypothesis | licensed by | want live? | note / kill |
|---|---|---|---|---|
| 1 | The Founders were rulers of something, or sat in judgement over this place | four thrones | **YES**, loosely |
| 2 | Four empty thrones are waiting for four people | the number, and a party of four | **YES — a promise ENDING 0 keeps** |
| 3 | The First Hall drowned; something happened | it is drowned | **[WITHHOLDING].** §12.25: nobody says who sat there, why they are empty, or what drowned it. The player has no basis whatever to speculate |
| 4 | Five arches means a fifth party | only if the player counts art | **[WITHHOLDING].** §12.26. It is a real clue with no surface that names it |
| 5 | The Cold is below everything and is the world's floor | "glowing like a sky from beneath" | **YES — and the art has already made it an inverted sky.** This is the best cosmological image in the game |
| 6 | "Nobody would say where it was" — even in sight of it, the adults will not name it | the line | **YES.** Marrow's refusal to name the thing she is standing over is characterisation and cover-up in one clause |

**[FINDING] This is the clearest "mystery with no basis to guess" point in my span.** Three of six
hypotheses at the game's most beautiful image are pure atmosphere. That is withholding, not intrigue.

**Cheap breadcrumbs — all free, all already half-drawn. [PROPOSED]**
- **The thrones' backs are the glyph CROWN.** Let the Reader say so: *"The backs are a shape. CROWN.
  Four of them, and CROWN means **one**."* This costs one line, uses art that exists, plants ch7's
  eight-socket ring, and turns the thrones from set dressing into a text.
- **A name on a throne-back.** *Mere.* One word; it pays §12.25, §12.38, and — critically — it puts
  the four Founders *down here, individually*, which is the nearest thing my span can get to aha
  **H** ("the fire is them").
- **The Listener and the water.** *"Something under that water is still ringing."* Free; makes the
  drowned hall a place with a fact in it.
- **Count the arches out loud.** The Seer: *"Five arches. Everything else down here is four."* Turns
  §12.26 from an art accident into the chapter's best unanswered question.

**Risk.** The chapter's one wonder beat sits **between two structurally identical ring puzzles** and
gets no time. See §8.

---

### B7.7 · `ch5_gate2` — THE SILENT GATE (puzzle)

**The best-designed branch in my span.** Both outcomes teach, and they are the two halves of the
political story.

**With `LAW0`:** the table writes **COLD** — the first time in the game the forbidden word is written.
Marrow: **"That is not in the Book I was given."** Wren: **"It is in Mere's, apparently."**
(`ch5.js:398-400`)

**Without `LAW0`:** *"The gate counts five, finds four, and opens anyway."* Wren: *"A gap in the
middle. **I would have written something.**"* (`ch5.js:402-403`)

| # | hypothesis | licensed by | want live? | note / kill |
|---|---|---|---|---|
| 1 | **The Provost's own Book has been edited** | she does not have a Founders' Law that a child's phone has | **YES — this is H-COVERUP's proof that the cover-up reached the top of the institution** | It is the single most important line in Chapter V and it exists on one branch |
| 2 | Mere had a different Book — an unedited one | "It is in Mere's, apparently" | **YES** — §10, Marrow ↔ Mere |
| 3 | The forbidden word can be written and nothing terrible happens | they write it; the gate takes it | **YES — and it is essential preparation for `ch7_fourhands`** |
| 4 | The gap is where a word was removed | the no-`LAW0` branch says exactly that, in a joke | **YES — the absence is made visible either way.** Good design |

**[FINDING — dilution, and it happens twelve minutes later.]** At `ch5_collapse` the table writes COLD
again, **with one hand** (`ch5.js:530`), and the Binder's own SPEAK reveal names the transgression in
advance: *"The newer Law says never. The older says **four hands**. You are about to write it with
one. Say so before the Warden writes it."* (`companion/ch5.js:352`) **Nobody reacts.** Marrow says "One
bell gone." Wren says "You wrote the cold one. With one hand." — and that is the end of it. By ch7,
COLD has been written twice before the climax announces it as the first writing (§13.15 flags a third
occurrence). **Fix: one line of consequence.** Marrow, or the Binder's own page: *"One hand breaks
stone. Four hands write. They are not the same act."*

---

### B7.8 · `ch5_count_start` / `ch5_count` — THE FOUNDERS' COUNT (puzzle)

**What it teaches, as shipped: almost nothing.** It is an arithmetic race — four pairs of digits, 45
seconds, eight digits typed as one number.

**What its materials are: documents.** And this is the largest wasted breadcrumb in my span.

| seat | what they are asked to count | what the material actually is |
|---|---|---|
| Reader | nine worn shapes on the newel: how many read EMBER, how many CROWN | **one Crown cut both ways up** — the game's own inversion joke, rendered as a trap |
| Listener | a peal of two bells, 5 and 7 | nothing |
| Seer | nine stones: three hollow, four cracked | *hollow* — the game's most loaded word — used as an adjective for masonry |
| **Binder** | five oaths: **how many bind, and how many were sworn before Year 212** | **a 212 document.** Two of the five — **"the Keeper" (WELL EMBER, lock EMBER)** and **"the Chair" (CROWN THORN, lock EMBER)** — are dated **Year 212** and are both **EMBER-locked, i.e. reconsiderable** (`companion/ch5.js:180-186`) |

**Read as history rather than as arithmetic, the Binder's table says this:** in the year the
Convocation refused to pay, it invented two offices — *the Keeper* (*down; what remains / to keep* —
the lone Warden) and *the Chair* — and swore both of them under **the lock that can be taken back**.
The 212 Convocation created the office of the one who goes down alone, and did not bind itself to it.

**That is on one phone, as a table row, and the game asks the Binder to count it.**

**Cheap breadcrumbs — the highest-value free change in Chapter V. [PROPOSED]**
- One Binder line, printed on the shared screen when the count closes: *"Two of those oaths are from
  212. One of them is called *the Keeper*. Both of them can be taken back."*
- Or let Wren ask the question: *"Who's 'the Keeper'?"* — and let nobody answer.
- Either converts a timed arithmetic exercise into the chapter's second-best piece of evidence for
  H-COVERUP.

**Also note:** Marrow's own line on the success branch is already doing thematic work — **"Eight
questions, four eyes, one answer. That was Mere."** (`ch5.js:480`) — and on the failure branch she
forces the ward with **"a word that costs her something"** (`ch5.js:475`), which is never named
(§12.31). That is a good, small, deliberate withholding: the player has a basis (she pays for things)
and no answer, which is intrigue rather than a hole.

| # | hypothesis | licensed by | want live? | note / kill |
|---|---|---|---|---|
| 1 | Mere designed her wards to require four people who cannot see each other's pages | three gates, all four-partitioned | **YES** |
| 2 | Marrow has words that cost her | `ch5.js:475` | **YES — good, cheap intrigue** |
| 3 | The 212 Convocation exempted itself | the Binder's oath table | **YES — and currently unreachable in practice.** See above |

---

### B7.9 · `ch5_soldiers` — boots, above

**Knows.** *"A voice follows it, and asks the Provost to stop."* Marrow: **"Then the Envoy can ask the
stair."** (`ch5.js:490`) Plus a consequence line naming which of their own choices brought the
soldiers here: the flared Tower ward told them where to look / Mere's gates cost them time / they are
three flights up.

**Excellent design note:** this is the only place in the span where the game tells the table *which of
their own earlier decisions is currently costing them*. It should be the model for `EMBER_LOST`
(B4.10) and for the missing synthesis beat (B6.5).

---

### B7.10 · `ch5_stair` — three things can be done with a stair (timed, 25–45 s)

The timer is computed from accumulated costs (`ch5.js:507`) and the timer text says so: *"{n}
heartbeats. **Getting this far has cost you {spent} of them.**"* Also excellent, and also unique in the
span.

| # | hypothesis | licensed by | want live? | note / kill |
|---|---|---|---|---|
| 1 | A Sighting can be **spent** | "One of you stays, and **their Sight pays for it**" (`ch5.js:516`) | **YES — and this is the tutorial for the entire endgame price** | See §6 aha **E** |
| 2 | Spending a Sight is reversible | "That Sight is spent **until the Provost ties it off**" | **YES — and it is the right half-truth.** ch6 pays it back "like blood into a numb hand" (`ch6.js:591`); ch7 takes it forever |
| 3 | The four are now making decisions that cost them personally, not Wren | the option text | **YES.** The night has turned around |

**[FINDING — the span's single best available breadcrumb.]** Mere's sheet says the Founders **"came up
grey."** `ch5_hold_ask` says a **Sight is spent.** **Nothing in the game connects *grey* to *spent
Sight* before `ch8.js:287`.** One clause, on the Binder's or the Reader's page here — *"Grey is the
old word for a Sighting that has been spent"* — makes the Founders' price, Marrow's grey thread, the
holder's numb Sight and ENDING 0's grey eyes into **one idea the player assembles at T7**, four beats
before the game charges for it. That is exactly the "one beat early" the author is asking for, and it
costs a sentence.

**Compounding risk:** the game currently uses **grey** for two unrelated things — a grief-thread
(`ch4.js:217`) and a spent Sighting (`ch8.js:287`) — and a player *will* infer that Marrow's grey
thread means her Sight is spent. That is a wrong hypothesis the game licenses and never kills. Either
distinguish them or — better — make the collision deliberate and let a character notice it.

---

### B7.11 · `ch5_collapse` / `ch5_hold` / `ch5_run`

**COLLAPSE.** Two slots, one hand, no ritual: **ASH in 1, COLD in 2.** Hints: *"Nobody's page has this
one. Two words, and you have both already."* / **"The second word is the first word upside down."**
(`ch5.js:535-536`) Solved: a bell answers the fall — "One note, and a wrong one." Marrow: *"One bell
gone. We will manage with three."* Wren: **"You wrote the cold one. With one hand."**

**What it teaches:** **COLD is ASH inverted — the wound is the fire upside down.** That is the
cosmology of the whole game in one hint rung, and it is the only place the game states it in words
rather than in a rotation matrix. Good.

**HOLD.** The volunteer is chosen privately, by sealed token, first-yes-in-seat-order
(`ch5.js:567-571`). Then the Hearth names them on the shared screen: *"The {seat} was faster."* and
*"{n} of you said yes. The {seat} said it first."* — **so the table learns how many were willing
without learning who.** That is a beautiful piece of social design.

**RUN.** *"The road down is wider than the stair, and older."* Wren: *"For the record, I said we should
collapse it."* / **"Nobody remembers Wren saying that."** (`ch5.js:602-605`)

**[FINDING — a plant that may already exist and is not confirmed.]** §12.63 says "Nobody remembers
Wren saying that" reads as a plant and pays nowhere. **It rhymes exactly with `companion/ch4.js:227` —
"It keeps every voice in this room but one."** Two beats, one chapter apart, both saying *Wren does
not persist in recording or memory.* If that is deliberate it is one of the best chains in the game
and it needs a third instance to be legible. If it is not deliberate, it should be: a third instance
costs one line, and it would make ENDING 0's "there wasn't a *me* on the other end"
(`companion/ch8.js:126`) land as the answer to a question the player has been carrying since T6.

| # | hypothesis | licensed by | want live? | note / kill |
|---|---|---|---|---|
| 1 | Wren does not leave traces — not in a bell, not in memory | `companion/ch4.js:227` + `ch5.js:605` | **YES, if the author confirms it.** Currently under-planted by exactly one instance |
| 2 | The four are now personally paying | the holder's spent Sight | **YES** |
| 3 | Writing COLD is a transgression with consequences | a bell cracks in the same breath | **YES — and it is an accidental, excellent consequence.** The table will read the cracked bell as the world's answer to the forbidden word. It is not, mechanically; but nothing contradicts it, and it is free to make canonical |

---

### B7.12 · `ch5_endcard` / `ch5_flow`

**Knows.** *"Next: the Bells."* / *"Hands on your keys."* / **"Nothing else tonight is faster than
this."** And on the flow card: **"At the Silent Gate you wrote COLD."**

Good: the flow card puts the chapter's transgression on the permanent record, which is exactly what a
flow card should do. It is the only one in my span that does.

---

# 5 · THE HYPOTHESIS SPACE AUDIT

> *Is the set of live possibilities interesting, or merely ambiguous? A mystery where the honest
> answer is "I have no basis to guess" is withholding, not intrigue.*

## 5.1 The verdict

**Across T4–T7 the hypothesis space is genuinely interesting, and it is interesting for a specific
structural reason: almost every live theory is supported by *physical* evidence the players handled
with their own hands.** A derangement under a floor, a strip read from the wrong end, a picture under
paint, a thread that is grey, a bell that will not keep a voice. This is the right way to build a
mystery for four people at a table, and the span does it consistently.

The space is also **correctly shaped**: at every beat there are three to five live theories, at least
two of them are partly true, at least one is productively wrong, and the wrongest one (H-BLAME) is the
one that generates the most dread. That is the design the author described and the span delivers it.

**Eight points fail the test.** They are listed below in order of how much they cost.

## 5.2 [WITHHOLDING] — points with mystery and no basis to speculate

| # | where | the problem | the cheapest fix |
|---|---|---|---|
| **W-1** | `ch2_start` → `ch2_stairfall` → forever · **the Cold Ember's function** | The Ember's purpose is one woman's sentence, said twice. The player is asked to make a 30-second choice about it, and the game **never resolves whether it mattered** (§12.13), never invokes it when the fire actually goes out (§13.10), and attaches its loss to a cracked bell three chapters later with no causal line (§12.14). A table that dropped it spends four chapters unable to judge their own decision | Marrow, at `ch2_top` on `EMBER_LOST`: one clause of consequence. And at `ch7_cold`, one clause of acknowledgement — even *"There is no Ember"* |
| **W-2** | `ch5_marches` · **the thrones, the drowned hall, the five arches** | The game's most beautiful image contains three unanswerable questions and zero evidence. §12.25, §12.26. Pure atmosphere presented in the grammar of a clue | Four free lines, all listed at B7.6. The throne-back **CROWN** is the best of them |
| **W-3** | `ch3_start` / `ch3_fight` · **the Tower ward's age** | Marrow and the captain say Founders'; the Binder's page says a Vigil ward, which by its name cannot be older than the school; the puzzle is derived from the Binder's version. §13.6. A careful Binder raises it at the table and the game has no answer | One line: either "Vigil" names an order of keepers older than this school, or a character notices the two adults are wrong |
| **W-4** | `ch2_niche` · **the niche has no weight** | The chapter's richest discovery — a named Founder, the corrected prophecy — writes `CH2_NICHE` and `CH2_STRIP` and **nothing ever reads them** (`CANON.md` Appendix A). The player cannot tell whether they found something important, because the game does not behave as though they did | Any downstream acknowledgement. `ch5_descent` already models the right pattern in reverse (Marrow names Mere free); one line in ch6 — *"You have seen this stone before, in little"* — closes it |
| **W-5** | `ch4_swear` · **"back early, and does not say why"** | §12.44. The narration points at a gap and refuses to fill it. This is not intrigue: there is no candidate explanation anywhere in the game | Make it mean something (she went to the bell-chamber; she looked at the Hearth) or delete the clause |
| **W-6** | `ch2_top` on `ORIEL` · **"She has come to be told"** | §12.58. The scene ends there. What the four told Oriel, and what she did with it, is never shown — on a branch where they *promised* | One line at `ch4.js:588`, which is already Oriel's voice, acknowledging that they kept the promise |
| **W-7** | across ch4–ch5 · **two greys** | A grief-thread is grey; a spent Sighting is grey; the game never joins or distinguishes them. A player who infers Marrow's Sight is spent has been licensed to by the game and will never be corrected | One clause at `ch5_hold_ask` naming grey as the word for a spent Sighting. It fixes the ambiguity *and* delivers the span's best breadcrumb (§6 aha **E**) |
| **W-8** | `ch3_door` → `ch3_flow` · **the rope** | §12.39. The chapter's harshest choice, costing −2 `WREN_TRUST`, is undercut one scene later on **every** branch. This is not a mystery at all; it is a retracted stake, which is worse | Make the rope real, or let the Listener read the captain's heartbeat and call the bluff |

## 5.3 The theories that are *correctly* unresolved

For balance — these are unanswered and should stay unanswered, because the player has a basis:

- **"And through it"** (`ch4.js:524`) — the Reader has the pronoun, the Listener has the sentence, and
  the reading is available and horrifying. Confirming it would be worse.
- **Who chalked the name** (§12.16) — by T6 the player has a named suspect with means, motive and
  handwriting. Perfect.
- **The word that costs Marrow something** (`ch5.js:475`) — the player knows she pays for things. A
  named word would be smaller than an unnamed one.
- **Whether "four went down" means the Founders or the four players** (§12.56) — both, and never say
  so.
- **Whether the Cold is aware** (§12.2) — one line ("It always knows when somebody kneels here",
  `ch6.js:486`) against a chapter of behaviour. Correctly poised.

## 5.4 The theory the span never licenses and should

**"The fire is the Founders."** Nothing in T4–T7 puts it in reach. See §6 aha **H**.

---

# 6 · THE AHA LEDGER

> *Is it earned by evidence the player actually had, and could a sharp player have got there one beat
> early? Getting there one beat early is the ideal.*

| | the aha | where the game delivers it | earned? | can a sharp table get it **one beat early**? | verdict |
|---|---|---|---|---|---|
| **A** | **The vault was rebuilt to hide something, in 212** | `ch2_door` (the three-rule fork + the Binder's date) | **Yes — fully.** Physical evidence plus dated Law | **Yes, and easily**: a Seer who reads the under-floor at `ch2_attune` has the derangement before the puzzle begins | **Model beat.** This is how the whole game should work |
| **B** | **The prophecy is mistranslated: *four, as one*, not *one born of four*** | canonically `ch6_strip`/`ch6_open` (`ch6.js:827`) | **Yes — over-earned, three times.** `companion/ch2.js:116` (every Reader's phone, T4) · `ch2.js:319` (the shared screen, optional, T4) · `ch4.js:558` (Wren's own question at the tapestry, T6) | **Yes — four chapters early**, at T4, on any table whose Reader reads their fine print aloud | **Variance problem, not an earning problem.** One table arrives at ch6 with the answer and is not acknowledged; another is told it for the first time. **Fix: acknowledge the early arrivers.** One conditional line at `ch6_strip` — Marrow: *"Some of you have known this since the vault."* — costs nothing and pays the best-prepared tables |
| **C** | **Vane is right about the paint** | `ch4_secrets`, tapestry corner: *"'I have seen what is under the paint,' the Envoy said. **So he had.**"* (`ch4.js:557`) | **Yes — perfectly.** Set up at `ch1.js:283`, paid three chapters later, by the exact seat he named | **Yes, one beat**: the Seer's ch4 plate (`companion/ch4.js:115`) states it before the corner is opened | **Best-timed aha in the span.** Do not touch |
| **D** | **Marrow loves Wren *and* is going to spend Wren** | `ch4_secrets`: the journal and the grey thread, found in the same ten minutes | **Yes** | **Yes, two chapters early**: `ch2_top`'s unfinished "Who did —" plus `ch1.js:147-148` (the only face not watching the fire) | **Best-earned aha in the span.** The two corners that deliver it are the two whose seats are least likely to be the Voice, which is a small pacing accident worth noting |
| **E** | **The Founders paid with their Sight — *grey* is what a spent Sighting is called** | **never in my span**; the two halves arrive and never meet. Delivered at `ch8.js:287` | **NO — [UNEARNED] as a joined idea.** Mere's sheet gives "came up grey" (T6); `ch5_hold_ask` gives "that Sight is spent" (T7); nothing says grey = spent until the epilogue | **It could be gettable at T7 for one sentence.** See W-7 | **The span's biggest missed aha, and its cheapest fix.** Name grey once at `ch5_hold_ask` |
| **F** | **Wren is of the Cold — the same kind of thing as the Cold Ember** | canonically `ch7.js:697` ("It's me") | **Yes — richly.** Three of four phones in ch2 (`companion/ch2.js:134-135`, `:150`, `:165-166`); the shadow's death at `companion/ch3.js:229`; the bell that keeps every voice but one (`companion/ch4.js:227`); WRENN = *the hollow* (`companion/ch4.js:204`); the thread list at `companion/ch5.js:343` | **Yes — three chapters early, at T4**, for any table that talks | **Trail is excellent; the payoff ignores the early arrivers.** There is no beat anywhere in which Wren reacts to being *worked out*. Propose one: a single Wren line, conditional on `CLUES` or on the Seer having told the truth in the laundry, in which Wren notices that they know |
| **G** | **The Order's rewrite is younger and therefore loses** | across the span: Law 3 (ch2) → Law 4 (ch4) → Laws 5/11 and 0/6 (ch5) | **Yes — cumulatively, and it is well paced.** Four objects, four rules, one principle | **Yes**: the Binder can state the principle at `ch2_door` and be proved right three more times | **Model arc.** The one improvement: let the Binder *say the pattern aloud* once at `ch5_gate1` |
| **H** | **The fire IS the Founders** | `ch6.js:839` — narration, not a character | **NO — [UNEARNED] from my span.** Nothing in ch2–ch5 licenses it. Worse: the Listener's ch5 page actively argues *against* it — "four going down the stair and **four coming back**" (`companion/ch5.js:310`) — and Mere signs herself "who kept the fire, **after**" | **Not at present, at any price short of new material** | **The single largest unearned reveal downstream of my span.** Breadcrumbs proposed below |
| **I** | **You may lie to the person you swear to, and the Order legislated that permission** | `ch4_oath`, Law 4's last clause | **Yes, mechanically.** The player is handed the lie | **The thematic aha — *we just did what 212 did* — is never available at all.** No character connects the oath-lock to the strike | **Free payoff, unclaimed.** One Binder or Wren line after `ch4_sworn` on EMBER: *"That is the Order's own rule. They wrote it so a Warden could look bound."* |
| **J** | **A Sighting can be spent, and that is the currency of the ending** | `ch5_hold_ask` (temporary) → `ch7.js:757` (permanent) | **Yes for the mechanic, no for the price.** The temporary spend is an excellent tutorial and the game never says it is one | **Yes, with E's fix** | Pair with **E** — one sentence fixes both |

## 6.1 Breadcrumbs for aha **H** — "the fire is the Founders"

The reveal is the game's centre and my span gives it nothing. Every option below is cheap, sits on
surfaces that already exist, and none of them spoils it.

1. **A name on a throne-back at `ch5_marches`.** *Mere.* Four thrones, four Founders, four names —
   and the player has already met a name "cut fresh on the back" of a plinth in ch2, so the idiom is
   established. It puts four individuals under the school and answers §12.25 and §12.38 at once.
2. **The four names carved over the Hearth.** ENDING 2 asserts they exist ("a fifth name over the
   Hearth, **beneath the four Founders**", `ch8.js:332`) and no chapter ever shows them. **Show them
   once, in my span** — the study's window looks down into the hall; the Reader reads four names over
   the fire. *A fire with four names over it* is one inference away from the answer and is not the
   answer.
3. **Mere's "after".** Nobody in the fiction remarks that a woman who walked into the Cold signed a
   sheet afterwards. Wren, on reading it: *"'After.' She came back out."* One line, and it opens the
   whole question of what the Founders became.
4. **The Hearth's blue core.** By ch6 the fire is drawn with a pale blue core (`scenes-ch6.js:103-104`)
   and the ch5 art already has the Hearth at 0.3 as "a blue tongue the height of a hand"
   (`ch5.js:248`). Let the Seer say it: *"There is cold inside the fire. There has been all night."*
5. **The Listener's portraits.** "Four going down the stair and **four coming back**"
   (`companion/ch5.js:310`) is currently an argument *against* H. Turn it: let the mutter change across
   the night — ch3 "four went down", ch5 "four went down and four came back", ch6 "four went down and
   four stayed". One word per chapter, and the portraits become the game's chorus.

---

# 7 · WHERE THE PUZZLE TEACHES THE WORLD

> *The author wants puzzles that "add to players understanding of the world and mysteries."*

Nine puzzles in T4–T7. **Seven teach the world substantively; one teaches politics but not
cosmology; one teaches nothing and its materials are the best unexploited documents in the span.**

| puzzle | what it teaches about the world | grade | if the answer is "nothing", what it could teach for free |
|---|---|---|---|
| **`ch2_door`** · the Founders' Door | Three rules for one object; Law 3 (the older binds); the school's own drill is neither; the plinths were physically turned in 212; the rebuilders could not count their own door and had to crawl in. Plus the gloss *A gate. Together. Hidden. Kept.* | **A+ — the best in the game** | — |
| **`ch2_niche`** · the strip (free buttons) | The prophecy has two readings and the school teaches the one that reads from the wrong end. Names Mere. Establishes "cut fresh on the back" as the idiom for an erased name | **A for content, D for weight** | Needs a downstream reader (W-4), not more content |
| **`ch3_grid`** · the corridors | The school is purchasable; an oath is a wall (Bess's room is safe because of a thread, not a lock); on `VANE_ACCEPT`, the four are inside the corruption they are mapping | **B — teaches politics, not cosmology.** The only puzzle in the span that teaches nothing about the Cold, the Founders or Wren | **Free:** one clause on the Seer's map that the laundry's back seam is older than the wall it sits in; or a third seam, bricked, stamped 212. Cost: two lines of SVG and one caption |
| **`ch3_fight`** · the threshold ward | Rings come in classes; the Founders' rule is not universal; a keeper seals a ward *behind* them; **Founders' work answers a threat with heat**. Gloss: *Fire, go through, four as one* | **A** | Free upgrade: name the ward's sworn keeper (§12.52) |
| **`ch4_shelf`** · the false shelf | **A turned thing says the opposite word and keeps its place** — Law 10, and the exact mechanism of the prophecy stone. Gloss: *A gate, kept hidden, by the first* (= the Chair) | **A for what it teaches, C for delivery**: the explanatory sentence is printed **only on the failure branch** (`ch4.js:419`) | **Free:** print "Only what it said had changed" on both branches. One line |
| **`ch4_secrets`** · the four corners | The most information of any beat in the game: the paint, the maintained lie, the journal, the grey thread, Mere's sheet, the Crown's aim | **A+ for content, C for structure** — the four findings are never spoken to each other | **Free:** a four-line synthesis screen before `leave` resolves, using the `FOUND` strings that already exist |
| **`ch4_oath`** · the oath ring | Law 4; that an oath is a physical fact (wax softens under KNOT); that the Order legislated a permission to appear more bound than you are, **and hands it to the players** | **A for the mechanic, B for the theme** — nobody names what the players just did | **Free:** gloss the oath on solving (it is the only unglossed ring in the span); and one line connecting Law 4 to the Order's character |
| **`ch5_gate1` / `ch5_gate2`** · Mere's gates | That a rule must be re-dated per object, for the third and fourth time; that Mere built against people who would come later with the wrong rule; **that the Provost's own Book is missing a Founders' Law a child's phone has** | **A+ for gate 2's `LAW0` branch** — the best branch in the span; **B for gate 1**, which is gate 2's rehearsal | Gate 1 is free to sharpen with one Binder line naming the pattern |
| **`ch5_count`** · the Founders' Count | **Nothing.** It is arithmetic against a clock | **F for teaching, B for tension** | **The highest-value free change in Chapter V.** Its materials are documents: the Binder's five oaths are a 212 record naming *the Keeper* and *the Chair*, both dated 212, both **EMBER-locked**. One printed line — *"Two of those are from 212. One is called the Keeper. Both can be taken back."* — turns the count into the chapter's second-best evidence for the cover-up. See B7.8 |
| **`ch5_collapse`** · the newel | **COLD is ASH inverted — the wound is the fire upside down.** The only place the game says this in words | **A for the idea, C for consequence** — the table writes COLD with one hand and nothing in the world responds | **Free:** one line on what one hand can and cannot do. See B7.7 |

## 7.1 The pattern nobody points at

Four puzzles in this span print a three-or-four word **gloss** of their own solution, and every one of
them is a sentence about the night:

| | gloss | what it is about |
|---|---|---|
| `ch2.js:266` | *A gate. Together. Hidden. Kept.* | the Founders' act |
| `ch3.js:608` | *Fire, go through, four as one.* | the Founders' act |
| `ch4.js:422` | *A gate, kept hidden, by the first.* | the Chair's cupboard — and the cover-up |
| `ch5.js:337` (Wren) | *One, bound, down.* | both readings of the prophecy, at once |

**Nobody in the fiction ever notices that the doors of this school are all saying the same sentence.**
One Wren line at `ch2_door` starts the table listening for it and buys four chapters of free payload.
This is the cheapest high-value change in the whole span.

---

# 8 · BOREDOM AND OVERLOAD MAP

Four real people, one laptop, four phones, one table, one night. The span runs roughly two to two and
a half hours.

## 8.1 The curve

```
attention
  ^
  |                      ####                    ####
  |        ####        ##    ##                ##    ##
  |      ##    ##    ##        ##            ##        ##
  |    ##        ####            ####      ##            ##
  |  ##                              ######                ##
  +--+----+----+----+----+----+----+----+----+----+----+----+---->
    ch2   ch2  ch2  ch3  ch3  ch3  ch4  ch4  ch4  ch5  ch5  ch5
   start door fall start GRID whisp shelf CORN oath gates COUNT stair
                        ^^^^  ^^^^^        ^^^^       ^^^^^
                        SAG   SPIKE        SWAMP      FATIGUE
```

## 8.2 Where attention sags

| # | where | why | fix |
|---|---|---|---|
| **S-1** | `ch2_descent` → `ch2_antechamber` → `ch2_attune` | **Three consecutive arrival beats before any agency**, then 90 seconds of silent phone reading. The chapter's first decision is six screens in | Merge `ch2_descent` into `ch2_antechamber`, or give the descent one interaction (the Listener hears something) |
| **S-2** | `ch3_grid` · **the longest sag in the span** | Par [3, 5, 7] minutes is optimistic. Twelve turns, two hidden twelve-beat timetables, a bought-rooms list, two seams with escalating costs, a cumulative bell economy. It is a quality logistics puzzle and it is **twenty minutes of bookkeeping in the emotional centre of the span**. A table that rings three bells and gets thrown back twice is doing spreadsheet work while the fiction says Wren is being hunted | Do not cut it — it is the chapter's only source of pressure. But **cover it**: Wren currently speaks twice in twenty minutes. Three or four ambient Wren lines keyed to turn number would keep the person in the fiction while the table does arithmetic |
| **S-3** | `ch5_gate1` → `ch5_marches` → `ch5_gate2` | **The same puzzle twice, with the wonder beat sandwiched between.** Gate 1 and gate 2 differ only in cut kinds, direction, slot count of the carving and the COLD clause. By gate 2 the table is executing a known procedure | Reorder: put `ch5_marches` **before** gate 1, so the ledge is the arrival and the gates are the descent past it. Or differentiate gate 2 mechanically (it is already differentiated *narratively* by COLD — lean on that harder: let the ring visibly refuse the empty slot on `LAW0`) |
| **S-4** | the holder, through `ch6_round1` | One player physically holds a button on their phone while the other three play. **The game has already solved this** — a neighbour rings their bell (`companion/ch6.js:193`) — but the holder has no page of their own for that stretch | Confirm the holder gets something to *say*, not just a button to hold |

## 8.3 Where attention is swamped

| # | where | why | fix |
|---|---|---|---|
| **O-1** | `ch2_door` | **The game's first four-way partition with a real cost.** Four private facts + a three-way rule fork + one commit + a rule card of three sentences of law. The table has never done this before | Nothing structural — this is the chapter's job. But note that `ch2_attune`'s 90 seconds is the only reading time and the pages are long |
| **O-2** | `ch4_secrets` · **the worst swamp in the span** | Four typed-answer sub-puzzles, each with its own budget (3/3/2/2), a clickable room, two hand-rolled hint timers, four discoveries in four different evidentiary registers, **and no synthesis**. A thorough table spends fifteen minutes and leaves holding four unconnected facts. A hasty table loses corners permanently, and **a lost corner is a lost fact, not a lost puzzle** | The synthesis screen (B6.5). Also: consider making the two two-try corners three-try, since their failure costs information rather than difficulty |
| **O-3** | `ch4_secrets` → `ch4_swear` → `ch4_oath`, back to back | The chapter's information peak is immediately followed by its hardest moral decision and then by a commit-once ring. **No breath.** The Hearth says "Argue as long as you need" and the table is still digesting the tapestry | The synthesis screen doubles as the breath |
| **O-4** | `ch5` as a whole | **Three puzzles of the same family plus a timed arithmetic race plus a timed choice, in one chapter**, at flame 0.3, at the moment the fiction is most beautiful and most frightening | See S-3. Also consider whether `ch5_count`'s 45-second phone task and the immediately following typed answer is one beat too many after two ring puzzles |
| **O-5** | `ch3_whispers` · **swamped by its own ritual** | The emotional peak of the span is delivered through the slowest input in the game: open SPEAK, type LINEN, read a prompt, choose, read the aftermath, then type a four-letter sealed word into the laptop — four times, sequentially | Accept the four tokens in parallel/any order; and give Wren two ambient lines over the typing so the silence is *Wren's* silence and not a UI wait |

## 8.4 What the table is doing, chapter by chapter

- **ch2** — social identities form. The Seer becomes load-bearing at the under-floor; the Binder
  becomes *authority* at the door and has to be believed against what everyone was taught. Somebody
  starts taking notes despite two explicit promises that nothing needs writing down. At the stairfall,
  thirty seconds of four people shouting, and whoever said "the box" owns it all night.
- **ch3** — twenty minutes of quiet coordination, then the best five minutes in the game. In the
  laundry the room goes silent and four people look at their own phones and decide, alone, whether to
  lie to a fourteen-year-old. Then "even the ones who lied", and somebody laughs the wrong way.
  Somebody will try to find out who lied and the house rule will stop them, and the *not knowing* is
  the thing they will still be talking about at the door.
- **ch4** — the room fragments. Four people in four corners, the keyboard passing by name, the Seer
  as Voice trying to hold it together. Expect one player to be visibly upset by their own corner —
  usually the Binder at the grey thread or the Listener at the bell. Then the biggest argument of the
  night over KNOT versus EMBER, with the game's explicit permission to take as long as they like.
- **ch5** — fatigue and awe alternating. The ledge stops the room. The Silent Gate's COLD is the
  proudest moment the table has had; on the no-`LAW0` branch the gap in the middle is the saddest. At
  the stair, one person volunteers alone, in silence, and the Hearth tells the room **how many** said
  yes without saying **who** — which is the single best piece of social design in the span. Then a
  button, held, in the dark, into Chapter VI.

---

# 9 · BREADCRUMB INDEX — the cheap plants, ranked

Every item is available on a surface that already exists, costs roughly one sentence, and spoils
nothing.

| # | plant | where | pays at | cost |
|---|---|---|---|---|
| **1** | **Name *grey* as the word for a spent Sighting** | `ch5_hold_ask` (`ch5.js:551-552`) or the Binder's ch5 page | Mere's "came up grey" (T6) · Marrow's grey thread · `ch7.js:757` · `ch8.js:287`. Joins four things into one idea at T7 | 1 clause |
| **2** | **A synthesis screen before leaving the study** | `ch4_secrets`'s `leave` handler | the entire back half of the game; converts four facts into a theory | 1 screen, reusing existing strings |
| **3** | **Say "212" in prose at the bricked arch** | `ch2_road` (`ch2.js:346`) | H-COVERUP's date stops being an art-only inference | 4 words |
| **4** | **Let Wren notice the puzzle glosses are sentences** | `ch2_door` `solvedText` | ch3, ch4, ch5 glosses become a running commentary | 1 line |
| **5** | **Print "Only what it said had changed" on the shelf's *success* branch too** | `ch4.js:420-422` | ch6's prophecy stone; Law 10; Mere's strip | 1 line |
| **6** | **Make the Binder's 212 oaths legible as history** | `ch5_count`'s solved text, or a Wren question | the Keeper = the lone Warden of 212, sworn under the revocable lock | 1 line |
| **7** | **A name on a throne-back at the ledge** | `ch5_marches` (`ch5.js:347`) | §12.25, §12.38, and the nearest my span can get to "the fire is them" | 1 word + 1 line |
| **8** | **The thrones' backs are the glyph CROWN** | `ch5_marches`, Reader | plants ch7's eight-socket ring; turns dressing into text | 1 line |
| **9** | **Marrow's version of Wren's name, said once, early** | ch1 or ch2, Marrow | doubles `ch3_whispers`'s Reader question; closes §12.28 | 1 line |
| **10** | **Promote the Reader's "four, as one, went through" out of fine print and out of the conditional** | `companion/ch2.js:116` | the span's central correction stops being a footnote | reformat |
| **11** | **Acknowledge early arrivers at the stone** | `ch6_strip`, conditional on `CH2_STRIP='right'` or `TAPESTRY` | pays the best-prepared tables; fixes aha **B**'s variance | 1 conditional line |
| **12** | **Wren reads one line of the journal when the desk shuts** | `ch4.js:494` | stops a failed puzzle from installing a false Marrow | 1 line |
| **13** | **One line of consequence for one-handed COLD** | `ch5_collapse` `solvedText` | protects Law 0's restoration from dilution (§13.15) | 1 line |
| **14** | **Gloss the oath on solving** | `ch4_sworn` | the only unglossed ring in the span, and the one about the players | 1 line |
| **15** | **One clause of causation for `EMBER_LOST`** | `ch2_top` | makes ch5's cracked bell a consequence (§12.14) | 1 clause |
| **16** | **The Listener's portraits change their mutter across the night** | `ch3.js:440`, `companion/ch5.js:310` | a chorus; and §12.15 (Mere survived) becomes reachable | 1 word per chapter |
| **17** | **A fifth plinth-hole, empty, in the antechamber** | `ch2_antechamber` / the Seer's under-floor | §12.4, §12.26, and Mere's door — one object, three answers | 1 shape + 1 caption |
| **18** | **A third "Wren leaves no trace" instance** | anywhere in ch5 | makes `companion/ch4.js:227` + `ch5.js:605` a legible chain | 1 line |
| **19** | **Name Law 4 as the Order's self-portrait** | after `ch4_sworn` on EMBER | the free thematic payoff of the oath | 1 line |
| **20** | **Wren asks "Four went down where?"** and nobody answers | `ch3_start` | converts an overheard line into an unanswered question | 1 line |

---

# 10 · THE TEN CHANGES THAT WOULD MOST IMPROVE T4–T7

Ordered by value per word.

1. **The study synthesis screen** (`ch4_secrets`). The span's richest beat currently ends in four
   unconnected facts. One screen.
2. **Name *grey*** (`ch5_hold_ask`). Fixes the span's biggest missed aha (**E**) and its worst
   ambiguity (**W-7**) in one clause.
3. **Fix the rope** (`ch3_door` → `ch3_flow`). The harshest choice in the chapter is retracted one
   scene later on every branch. Either make it real or make it readable.
4. **Say 212 in prose** (`ch2_road`). Four words for the game's most load-bearing number.
5. **Give the ledge something to think about** (`ch5_marches`). A name on a throne-back and a Reader
   line about CROWN. The span's only pure-withholding point becomes its best clue-site.
6. **Give the niche a downstream reader** (`ch2_niche` → ch6). The richest optional discovery in the
   game currently changes nothing.
7. **Make the Founders' Count a document** (`ch5_count`). The Keeper's 212 oath is sitting on a phone
   as arithmetic.
8. **Print the shelf's world-teaching line on both branches** (`ch4_shelf`).
9. **Cover `ch3_grid` with Wren** (three or four ambient lines). Twenty minutes of the span's worst
   sag has two lines of character in it.
10. **Fix or delete "back early, and does not say why"** (`ch4_swear`). Pointed withholding is worse
    than silence.

---

## APPENDIX — beat index for this span

| beat | scene id | T | kind |
|---|---|---|---|
| B4.1 | `ch2_start` | T4 | scene |
| B4.2 | `ch2_descent` | T4 | scene |
| B4.3 | `ch2_antechamber` | T4 | scene |
| B4.4 | `ch2_attune` | T4 | attunement / phones |
| B4.5 | `ch2_door` | T4 | **puzzle** (dialseq, commit-once) |
| B4.6 | `ch2_opened` | T4 | choice |
| B4.7 | `ch2_niche` | T4 | optional discovery |
| B4.8 | `ch2_ember` | T4 | scene |
| B4.9 | `ch2_road` | T4 | scene |
| B4.10 | `ch2_stairfall` | T4 | choice (timed, 30 s) |
| B4.11 | `ch2_top` | T4 | scene |
| B4.12 | `ch2_flow` | T4 | flow card |
| B5.1 | `ch3_start` | T5 | scene |
| B5.2 | `ch3_attune` | T5 | attunement / phones |
| B5.3 | `ch3_grid` | T5 | **puzzle** (grid) |
| B5.4 | `ch3_whispers` | T5 | **sealed private channel** |
| B5.5 | `ch3_thanks` | T5 | scene |
| B5.6 | `ch3_door` | T5 | choice (timed, 75 s) |
| B5.7 | `ch3_fight` / `ch3_stand` / `ch3_surrender` | T5 | **puzzle** (ring) / branch |
| B5.8 | `ch3_flow` | T5 | flow card |
| B6.1 | `ch4_start` | T6 | scene |
| B6.2 | `ch4_marrow` | T6 | scene |
| B6.3 | `ch4_attune` | T6 | attunement / phones |
| B6.4 | `ch4_shelf` | T6 | **puzzle** (wheel, one pull) |
| B6.5 | `ch4_secrets` | T6 | **four discoveries** |
| B6.6 | `ch4_swear` | T6 | choice |
| B6.7 | `ch4_oath` | T6 | **puzzle** (ring, one closing) |
| B6.8 | `ch4_sworn` / `ch4_refused` | T6 | scene / branch |
| B6.9 | `ch4_flow` | T6 | flow card |
| B7.1 | `ch5_start` | T7 | scene |
| B7.2 | `ch5_descent` | T7 | scene |
| B7.3 | `ch5_attune` | T7 | attunement / phones |
| B7.4 | `ch5_door` | T7 | scene (branch: unsworn) |
| B7.5 | `ch5_gate1` | T7 | **puzzle** (ring) |
| B7.6 | `ch5_marches` | T7 | scene |
| B7.7 | `ch5_gate2` | T7 | **puzzle** (ring, `LAW0` branch) |
| B7.8 | `ch5_count_start` / `ch5_count` | T7 | **puzzle** (timed task + answer) |
| B7.9 | `ch5_soldiers` | T7 | scene |
| B7.10 | `ch5_stair` | T7 | choice (timed, 25–45 s) |
| B7.11 | `ch5_collapse` / `ch5_hold` / `ch5_run` | T7 | **puzzle** (ring) / **sealed channel** / scene |
| B7.12 | `ch5_endcard` / `ch5_flow` | T7 | flow card |
