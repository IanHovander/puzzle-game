# The Prologue and Chapter I — the proposal, v2

*What the Fire Keeps*. A prose and focus rewrite of `js/content/ch0.js`, `js/content/ch1.js`,
`js/content/companion/ch0.js` and `js/content/companion/ch1.js`. Beat skeleton, every flag, every
scene id, every puzzle answer and every partition unchanged.

**The measurement, honestly, before anything else.** Every line below was pasted into a working copy
of the repo and measured with the repository's own tools. Across the **four files the brief puts in
scope this pass is 62 words longer than what it replaces.**

| file | before | after | Δ |
|---|---|---|---|
| `js/content/ch0.js` (Hearth, Prologue) | 1,101 | **1,100** | −1 |
| `js/content/ch1.js` (Hearth, Chapter I) | 1,349 | **1,335** | −14 |
| `js/content/companion/ch0.js` — four Wren tabs | 203 | **279** | **+76** |
| `js/content/companion/ch1.js` — Seat 7 murmur | 5 | 6 | +1 |
| **four files** | | | **+62** |

`node tools/prose-count.js ch1` reports **1,332**, not 1,335. The difference is three strings this
pass touches that live on keys the tool does not scan — `center`, the `const STALL`, and the `REASONS`
map — and a room really reads all three, so the table above charges for them. **1,335 is the honest
number and it is the one to quote.**

Both shared-screen chapters are shorter, and shared-screen time — the thing the brief's ten and
thirteen minutes are actually made of — falls. **All 62 added words are on the phones, read in private,
in parallel, during a 90-second window the game already spends — 76 on the four Prologue Wren tabs,
one on a Chapter I murmur, against 15 taken off the shared screen.** The four pages gain 106
words and give back 30, and the 106 are two things: **39** are four short sentences that answer an
instruction the shipped Hearth already gives and that **no page in the game currently answers**
(`ch0.js:218` tells four players to say "one line each, out loud, in seat order" and hands them
nothing to say); **67** are one warm, ordinary thing Wren *did*, at the top of each page, so that four
forensic readings of a boy's body become four readings of a friend.

v1 of this proposal claimed −8 across two files and did not count the Companion at all. That claim
was false at the brief's scope and is withdrawn. **If the author wants the four-file total negative,
§"The two switches" at the end prices both levers exactly, and the honest answer is that **neither
gets to zero without leaving `ch0.js:218` unanswered again.**

---

# Changes from v1 — what three verifiers found, and what was done

v1 was read independently for continuity, for house style, and for whether any of it is interesting.
Forty-three findings. Five were blockers. Every one is dispositioned below; the full item-by-item
ledger with arguments is at **§Findings**, and nothing has been quietly dropped.

| # | finding | severity | disposition |
|---|---|---|---|
| 1 | `ch1_vote` left byte-identical — six of thirteen minutes with no Wren | BLOCKER | **APPLIED.** Five strings inside the widget, +10 words, funded by a 19-word cut in `ch1_dais` |
| 2 | `ch1_prices` deletes the game's only introduction of **the Convocation**; ch2/ch3 then use it cold four times | BLOCKER | **APPLIED.** The name is back, in Sorrel's mouth, without the em-dash appositive |
| 3 | Sorrel states tonight's errand as settled fact two scenes before Marrow decides on it | BLOCKER | **APPLIED.** "will send", not "sends … tonight" |
| 4 | The Reader's Companion page contradicts itself inside 71 words | BLOCKER | **APPLIED DIFFERENTLY.** The shipped refrain is restored — `companion/ch2.js:120` quotes it verbatim |
| 5 | "Shorter than what it replaces" is false at the brief's scope | BLOCKER | **APPLIED.** Real four-file number in the headline (**+62**), and both available levers measured rather than estimated — neither reaches zero without leaving `ch0.js:218` unanswered |
| 6 | `ch0_stone` promises inscription *continuing*; ch6 delivers the same sentence read from below | MAJOR | **APPLIED.** "run all the way round … Nobody alive has read them there" |
| 7 | `ch0_stone`'s inference has a `cls:'small'` meta line between its two halves | MAJOR | **APPLIED.** Meta line moved to the exit; flame and flicker now adjacent |
| 8 | `ch0_stone` loses the only line attaching the prophecy to Wren | MAJOR | **APPLIED.** "Everybody agrees who it is about" restored (6 words) |
| 9 | "Four. I thought it was two." has two readings, one of them a ch6 spoiler | MAJOR | **APPLIED.** "Four **of you**. I thought it was two." |
| 10 | `ch0_carve`'s hundred-names line asserts what nobody in the room can know | MAJOR | **APPLIED DIFFERENTLY.** Recast as a property of the object, not eyewitness testimony |
| 11 | `ch0_lamp`'s "with the rest of you" destroys the floor plant from `ch0_dorm` | MAJOR | **APPLIED.** "Wren does not touch it. Wren sits down on the floor." (−11 words) |
| 12 | `ch1_dais`'s 19-word Provost gloss is now redundant twice over | MAJOR | **APPLIED.** Cut; four of its words move to `ch0_dorm`, where the name first appears |
| 13 | The hands: seed and payoffs are different behaviours | MAJOR | **APPLIED.** Seed and payoff now share the word *hands*, and *still* runs ch0_dare → ch1_dais → ch1_attune |
| 14 | The premise "each of you sees one thing the other three cannot" was cut and never replaced | MAJOR | **APPLIED.** Restored on Wren, in `ch0_wren`, as a reason rather than a rule |
| 15 | The curfew seam: fourth-years shut in early, then at the back of the Great Hall an hour later | MAJOR | **APPLIED.** The line that created the seam is cut (and with it an R2.5 breach and an open question) |
| 16 | The Seer's warmth line collides with the ring puzzle's **scratch** and with the Reader's name axis | MAJOR | **APPLIED DIFFERENTLY.** New warmth on light and position: zero shared vocabulary with either |
| 17 | Compulsive levity not delivered — two jokes in thirteen minutes | MAJOR | **APPLIED.** Chapter I goes from 2 comic moments to 6, four of them where joking is a bad idea |
| 18 | `ch1_dais` moved the calling of the vote ahead of the writ, breaking the beat order | MAJOR | **APPLIED.** "Tonight you look at the child I kept" — `ch1_flicker` is the turn again |
| 19 | `ch1_attune`'s one fictional line is typeset as a table instruction | MAJOR | **APPLIED.** `cls:'whisper'` dropped; the clock's third statement dropped with it |
| 20 | R5.1's question budget is still broken by the proposal's own ledger | MAJOR | **APPLIED DIFFERENTLY.** Real count published, two questions closed, and the one rule the opening chapter cannot satisfy named as such |
| 21 | ch1 measures 1,344, not 1,342; `ch1_lost` 90, not 88 | MAJOR | **APPLIED.** Every number re-run |
| 22 | `ch1_after` merges two shipped sentences into a 17-word one | MAJOR | **APPLIED.** Two sentences again |
| 23 | `ch1_after`'s Cold Ember speech is duplicated by `ch2.js:182` sixty seconds later | MAJOR | **REPORTED.** One-line fix named, in ch2, out of these four files |
| 24 | The Binder's spoken line has no referent, and it is the Prologue's last spoken line | MINOR | **APPLIED.** "He has no thread. Not to anyone. Not now." |
| 25 | "Lucky for me" is a crack pretending to be a joke | MINOR | **APPLIED.** Cut; the beat now ends on the hands |
| 26 | The Mum slip has no surface at all | MINOR | **APPLIED.** It derails the roll-call; *"Where was I."* is the surface, supplied by him |
| 27 | R2.5: the Mum slip's em-dash pair teaches two facts | MINOR | **APPLIED.** No dash: "Mum has everybody downstairs. The Provost." |
| 28 | The proper-noun budget: the Provost promoted to ch0's main path twice, uncovered | MINOR | **APPLIED.** Introduced once, in her own sentence, in `ch0_dorm`, and the seventh name disclosed |
| 29 | `ch1_vane` silently alters "that"→"it" in a line STYLE §3 cites as canonical | MINOR | **APPLIED.** Restored, as its own paragraph |
| 30 | Three "an hour" readings bracket twenty minutes of play | MINOR | **APPLIED.** `ch0_flow` lands as imminence |
| 31 | `ch0_dorm`'s seat whisper: 4 bold spans, 4 commas, 15 words | MINOR | **APPLIED.** One bold span, one comma, 13 words |
| 32 | Four semicolons on `companion/ch0.js` Sight pages, against R2.1 | MINOR | **APPLIED.** Four full stops, at no word cost |
| 33 | The Listener's page runs anomaly-before-warmth | MINOR | **APPLIED.** Figure moved below the warmth line |
| 34 | The STYLE amendment covers "ends with" but not the structure row or the real numbers | MINOR | **APPLIED.** Amendment rewritten; the word-budget change is **withdrawn** — all four pages fit R11.3 as it stands |
| 35 | `ch0_stone`'s button is the title of the scene it leads to | MINOR | **APPLIED.** "Up the tower" |
| 36 | `ch1_start`'s rationale says "two scenes later"; it is four | MINOR | **APPLIED.** Claim corrected; the cut still stands |
| 37 | `ch0_dare` deletes the "stand still" plant the `ch1_dais` aside depends on | MINOR | **APPLIED.** One word back |
| 38 | `ch1_prices`' "neither" is still free at the moment of choosing | MINOR | **APPLIED.** Its `after:` is now a price, at no word cost |
| 39 | The window anecdote is told twice in ninety seconds | MINOR | **APPLIED DIFFERENTLY.** Compressed and re-ordered; the second telling is the debt, which is the part that matters |
| 40 | The bird makes ch6's *wrong* Reader answer more tempting | MINOR | **REJECTED.** Argument at §Findings — and the disarm is already on the Reader's own phone |
| 41 | `ch1_won`: three players in four are still never seen by Wren by name | MINOR | **REJECTED.** `CH1_APPROACHED` holds seats, not people; the scene already sees the Listener |
| 42 | `docs/DESIGN.md` §5 is made stale by the night compression | MINOR | **REPORTED.** Third required out-of-file edit, now listed |
| 43 | The two ledger tables disagree about `ch0_stone` | MINOR | **APPLIED.** One ledger, one counting rule, stated |

---

## The diagnosis, in five sentences

The friendship the whole game rests on is asserted on the shared screen and shown only on four
private phones, and in Chapter I Wren speaks sixty-one words and is absent from the five consecutive
scenes that decide his fate — including the six-minute vote, so the table is asked to fight for a boy
who is not in the room. His two biggest Prologue scenes are task allocation in costume: thirty-eight
per cent of everything he says there is a puzzle briefing, and sixty of those words are verbatim
duplicates of four Companion pages the players read thirty seconds later. The mysteries are asserted
rather than evidenced — `ch0_stone` opens five unrelated questions in eight paragraphs and states that
the translation is disputed without showing one disputed thing, while `ch0_carve` produces the best
clue in the chapter (a lamp dead for four hundred years answers to the name WREN) and then uses the
most trusted character in the room to certify that it means nothing. The levity and the weight are
segregated by scene instead of fighting inside single lines, and where the game does get it right —
*"They have a warm room. I've never had a warm room."* — the next line explains it. Underneath all of
it is one hard logical break: the Prologue says the Vigil is tomorrow, and the Epilogue counts the
dormitory and the Great Hall as consecutive hours of the same eight-hour night.

**The two rules this pass is built on.** *A crack the narrator explains is not subtle, however small
it was.* And: *an absence is only legible against a rate* — the boy has to be funny often enough that
his silence at the fire registers as a silence.

---

## The two questions

**Prologue — *why does nothing in this room answer to Wren?*** The four carve his name into four
hundred years of brass and the brass refuses it. They write two words that are not his name and the
lamp lights. Then four phones tell four people, privately, that nothing else answers to him either —
no heartbeat, no thread, a shadow that goes the wrong way, a name in letters nobody alive can read.
The room is delighted. Only the player is uneasy.

**Chapter I — *what are you willing to owe, to keep Wren tonight?*** Nine adults are deciding where
to keep a boy. Everything is a transaction in one currency — two asks, a price, a bribe — and
underneath it the only adult who loves him spends the whole hall looking at him instead of the fire.

Every beat either sharpens its chapter's question or is cut. The rival mysteries the shipped chapters
open and never touch — the morning argument, the Masters' Sightings, Seat 7's arithmetic — are
demoted into consequences or deleted.

---

## The question ledger

**The counting rule, stated once so the two tables agree: a question is *open* when the prose invites
the player to hold it and the chapter does not answer it.** A term defined at first use (*the Cold is
a place*) is a definition, not a question. A condition arriving that a question has already named
(the Hearth flickering, after *"When the Hearth goes cold…"*) is that question firing, not a second
one.

| question | shipped | after |
|---|---|---|
| What is Wren — what came out of the fire? | open | **open — and now the chapter is about it** |
| What does the unread half of the prophecy say? | *asserted* as a dispute, no evidence | **shown**: the cuts run round the foot, where the flame sits, and nobody has read them there |
| Why is the Hearth flickering after four hundred years? | open, 8th of 8 paragraphs | **not a second question** — it is the prophecy's own condition, now adjacent to the flame |
| What and where is the Cold? | open | carried, one line, unchanged |
| Wren's four private oddities | open, announced as four at once | open, announced as one line of shape |
| Why did the brass refuse his name? | never asked — the clue is dismissed on the page | **opened**, and it is the Prologue's best |
| What happens when the masters argue in the morning? | open — **the argument never happens** | **cut** |
| What does each of the nine Masters see? | open — **Ch1 is forbidden to answer it** | **cut** |
| What was Marrow about to *show* the Masters? | open — dropped inside its own scene | **cut** (she promises only the looking, and the chapter delivers it) |
| Who let four fourth-years into the Great Hall? | — (created by v1) | **cut before it was ever shipped** |
| Why does Seat 7 watch Wren "like a sum"? | opened in the closing scene, never touched | **moved** into `ch1_vote` and onto the Listener's phone, where the player can act on it |
| Why is Marrow sending four children under the school? | never raised, and the player asks it anyway | **closed** in eleven words |
| Will the school keep Wren? | open | **closed inside the chapter**, either way |
| What is under the paint? / What does Marrow know? / What is the Cold Ember? | open | unchanged — these are three the writer intends |

**The true count, and the one rule the Prologue cannot satisfy.** The Prologue **opens four** (what
is Wren · what the unread cuts say · why the brass refused his name · where he will be kept) and
**closes none**, because it is the opening chapter and has nothing to close. R5.1's clause "closes at
least as many as it opens" **cannot bind chapter zero**, and no version of this chapter will ever
satisfy it. v1 reported "about six" and presented it as a pass; it was not one. This is the number,
and it wants the author's signature rather than a claim.

Chapter I opens one (*what is the Cold Ember*), closes two (*will the school keep Wren*, *why four
children alone*), and hands seven to Chapter II. **Seven is the cap. The pass lands on it.** Shipped,
the player reaches the game's first real puzzle holding eleven.

---

## Wren

**The comic engine.** A boy with no possessions and no privacy, raised by a committee, who does the
paperwork of his own life out loud. It fires on **attention plus a pause** — the moment somebody in
the room is about to say a sentence *about him*, he says it first, in the institution's own words,
one size too small, so that the only sentence about him that is his is the one nobody had to approve.
The bureaucratic register is already the funniest thing in the game and it is four chapters too late
(`ch4.js:611`: *"For the record, I do not get a vote on the whatever-it-costs part."*). It is planted
in the Prologue here and fired through all of Chapter I.

**Two rules make it work, and they are why the levity carries the weight instead of relieving it.**
The punchline is always the smallest concrete noun available — a comb, a warm room, a seal, whether
he had anything to bring. And **the true fact always rides in the object position, never the verb**:
*The comb is the school's.* He never notices handing it over. Every joke pays out one fact he did not
mean to file.

**The pressure ladder.** Outward at low pressure (*"I need four idiots and a lamp"*); the paperwork
voice when the attention lands on him (*"I don't get a vote. That is the entire job."*); **the
accelerator** when a decision about him is being made in front of him, clauses arriving faster than
they earn their place because the alternative is the pause (*"…Also that seal is enormous. Also —"*);
and **the seize**, where the sentence stops mid-build and he corrects himself down to nothing, in his
own mouth, with nobody remarking (*"Also — no. All right."* · *"So. Thanks. Don't do it again."*).
Direction is the tell: outward at low pressure, inward at high.

**The rate, which is the change v1 was missing.** He is funny in every scene he is in. His last line
before any decision about him is a joke. At least once a chapter the joke happens where it is a bad
idea. At most one seize a chapter. Chapter I goes from **two comic moments to six**, and four of them
land where joking is a bad idea: presented alone to nine Houses, the table frozen mid-vote, the bell
rung and the Chair breaking procedure to buy time, and under guard being taken away.

**His forbidden subject is the fire.** He has a joke about every person and every rule in this school
and has never once had one about the Hearth. This is never stated. It is installed twice, by omission:

> `ch0_flow` — *"the Hearth flickers again. Wren watches it and does not say anything clever."*
> `ch1_flicker` — *"Every face but one. The Provost is looking at Wren. Wren has nothing to say about the fire."*

That is the floor under the levity, and it only reads as a floor because the rate above it is high.
If the boy is funny six times in thirteen minutes and silent at the fire, the table feels it. If he is
funny twice, the silence is just quiet.

**The tell: the hands.** Seeded in the same sentence as the door banging open, so the reader meets the
hands before the voice, and made audible one line later in his own mouth. Then it is paid by
**stopping**, and seed and payoff share the word:

| where | line |
|---|---|
| `ch0_wren` (seed) | *"Wren comes in talking, and Wren's hands do not stop the whole time."* |
| `ch0_wren` (audible) | *"Is that yours? It is now."* — mid-sentence, to somebody else's property |
| `ch0_carve` (payoff) | *"Wren's hands have stopped."* |
| `ch0_dare` → `ch1_dais` → `ch1_attune` | *"I stand still"* → *"I practised"* → *"holding still"* |
| `ch1_vote` (the bell) | *"Wren has not moved in an hour."* |
| `ch1_lost` | *"and does not fidget once."* |

**The five cracks — one clause each, none glossed, none sharing a paragraph with a live joke.**

| # | scene | the clause | what it is |
|---|---|---|---|
| 1 | `ch0_dare` | *"I own three shirts and a comb. The comb is the school's."* | The wound is an inventory. No adjective does any work. |
| 2 | `ch0_carve` | *"Wren's hands have stopped."* | Four words, alone, ending the beat — after the mouth has already talked over it. |
| 3 | `ch0_name` | *"It doesn't mean anything. I have asked."* | Two words that say he has spent years asking and nobody ever answered. |
| 4 | `ch1_vane` | *"Also — no. All right."* | The joke dies inside his own sentence, in a hall of nine Houses. No narrator says nobody laughed. |
| 5 | `ch1_after` | *"So I stay. Provisionally."* / *"I've never had a warm room."* | A childhood filed as an administrative note. On the losing branch the shipped line is already perfect — the fix there is a **deletion**. |

**Rapport, four moves.**

- **He knows them as habits, not job titles.** `ch0_wren`'s four role briefings become the four lines
  `companion/ch8.js:86 · :94 · :110 · :126` already gives each player back in Wren's goodbye letter at
  the end of the night. Only one of the four exists in the shipped Prologue, so two players in four
  currently end the game with a callback to a line nobody ever said.
- **A shared history that is an incident, not a duration.** *"You have known each other since you were
  seven"* is replaced by the floor between the beds and the Provost's window.
- **A favour owed, running the right way.** Across both shipped chapters Wren never once does anything
  *for* these four. A boy who is only ever the object of rescue is a quest item. Now: *"And you lot
  still owe me for the window."*
- **The Mum slip, unbranched — and with a surface.** `ch6.js:691` and `ch8.js:346` both pay off a beat
  currently locked behind one of four `GROUP_NAME` options that three tables in four never see. It
  moves into the dormitory, unbranched, and it **derails him**: he loses his place in his own
  roll-call and has to find it again. *"Where was I."* is the whole surface, supplied by him, with no
  narrator anywhere near it.

---

# The change, at a glance

| scene | status | what moves |
|---|---|---|
| `ch0_start` | **UNCHANGED** | — |
| `ch0_stone` | **REVISED** | the cuts round the foot, unread; the inference's halves made adjacent; 8 paragraphs → 6 |
| `ch0_dorm` | **REVISED** | the floor between the beds, the Provost introduced, the window |
| `ch0_keys` | **UNCHANGED** | — |
| `ch0_practice` | **REVISED** | a named promise instead of an unnamed one |
| `ch0_wren` | **REVISED** | the hands; four habits instead of four job titles; the premise, on Wren; the Mum slip derails the list |
| `ch0_dare` | **REVISED** | three shirts and a comb; the 27-word speech trimmed; "stand still" kept |
| `ch0_carve` | **REVISED** (`wrongText` + `solvedText`) | the wrong answer does emotional work; the beat ends on the hands |
| `ch0_attune` | **UNCHANGED** | — |
| `ch0_lamp` | **REVISED** (`solvedText`) | "I checked"; he sits down on the floor, alone; the 30-word explainer cut |
| `ch0_name` | **REVISED** | "Four of you. I thought it was two." / "I have asked." / "Don't do it again." |
| `ch0_flow` | **REVISED** | the forbidden subject, installed; the Masters' Sightings cut; the clock lands |
| `ch1_start` | **REVISED** | the role whisper cut (the engine prints it on `ch1_attune`) |
| `ch1_dais` | **REVISED** | the recap cut; the gloss cut; "I practised" |
| `ch1_vane` | **REVISED** | Wren is in the scene at last, and the joke dies in his own mouth |
| `ch1_flicker` | **REVISED** | the second silence, beside Marrow's |
| `ch1_attune` | **REVISED** | one line of fiction, in fiction's typeface, before the six-minute puzzle |
| `ch1_vote` | **REVISED** (5 strings, +10 words) | **the boy is inside the widget for all six minutes.** Board, partition, rule card, hints, timer untouched |
| `ch1_won` | **REVISED** (3 words) | tightening |
| `ch1_lost` | **REVISED** (1 line) | the duplicated Ember demand cut; everything else untouched |
| `ch1_prices` | **REVISED** | Sorrel names the coup and the Convocation, not the Ember; Oriel and "neither" get costs |
| `ch1_offer` | **REVISED** | "You have seen tonight what a Master costs" |
| `ch1_after` | **REVISED** | the gloss cut; both branches get a crack; why *these four* |
| `ch1_flow` | **UNCHANGED** | — |
| Companion ch0 — four Wren tabs | **REVISED** | one warm behaviour each, and the spoken line the Hearth has always asked for |
| Companion ch0 — four Sight pages | **REVISED** (4 semicolons) | R2.1, at zero word cost. No fact moved between phones |
| Companion ch1 — Seat 7 murmur | **REVISED** (1 line) | "I have been watching the child" |
| Companion ch1 — everything else | **UNCHANGED** | — |

**No scene is cut and no scene is added.** Every change is inside something that already existed.

---

# Scene by scene — the Prologue (`js/content/ch0.js`)

### Chapter header — **REVISED** (one flow-node label)

```js
{ id: 'ch1_start', label: 'The Great Hall', col: 7, row: 0 },
```

The node was labelled `'Tomorrow'`. The Vigil is now later the same night, which repairs
`ch8.js:365` (*"The night, from the dormitory to the Cold. Eight hours."*) and `js/core/map.js:29`,
and harmonises the label with the map panel for the first time.

---

### `ch0_start` — **UNCHANGED**

64 words, the best beat in the game, and the only place the player gets to deduce something unaided
(the baby came out of the hole). Leaving it alone is the point.

---

### `ch0_stone` — **REVISED**. 137 → 117 words, 8 paragraphs → 6

```js
      ch0_stone: {
        art: 'ch0_stone', mood: 'hearth', fx: 'embers',
        text: [
          'Above the fire, cut into the stone, one sentence in a language nobody has spoken for four hundred years.',
          { text: '"When the Hearth goes cold, one born of four shall walk into the Cold, and it shall close behind them."', cls: 'omen' },
          'That is what the school reads. Everybody agrees who it is about. You cannot walk into weather. The Cold is a place, and nobody will tell you where.',
          'The cuts run all the way round the foot of the stone, where the flame sits. Nobody alive has read them there.',
          'And tonight, for the first time in fourteen years, the Hearth is flickering.',
          { text: 'You will be shown this sentence again, when it matters. Nothing tonight needs writing down.', cls: 'small' },
        ],
        next: 'ch0_dorm', button: 'Up the tower',
      },
```

**Rationale.** The shipped scene opens five unrelated questions in eight paragraphs — it is the only
scene in either chapter the engine has to shrink — and asserts a translation dispute with no evidence,
in a room containing the one person whose gift is *any carving, however worn*.

One sentence replaces the assertion and does four jobs: it converts the dispute into evidence, it
ships the seed BRIEF §4 requires and the shipped prose does not contain (`grep foot js/content/ch0.js`
returns only the lamp's foot, so `ch6.js:341`'s "eight cuts running all the way round the foot of the
stone" currently pays off nothing), it closes the logic hole about how a school "reads" an inscription
the fire has covered, and it is shorter than what it replaces.

**Three corrections v1 needed here and did not have.**

1. **Unread, not unfinished.** v1 said *"The cuts carry on, down and round the foot"*, which promises
   inscription continuing below the visible sentence. `ch6.js:701–704` delivers something else: *"Eight
   cuts run all the way round its foot. Four are clean. Four are burned to a smear. From above, the
   school reads it 'one born of four shall walk into the Cold'. Nobody has read it from under here."*
   The foot cuts **are** the prophecy, read the other way. The line now uses ch6's own words — *run all
   the way round* — and its last four words say the true thing: nobody has read them **there**.
2. **The inference's two halves are adjacent.** The chapter's one real deduction is *the fire hides
   the foot, the fire is dying, therefore the stone is becoming readable.* v1 put the `cls:'small'`
   meta line between them, which is the most attention-killing sentence in the scene sitting exactly
   on the hinge. It is procedural reassurance and it now sits at the exit, where R5.4 wants it.
   The flame and the flicker are now consecutive paragraphs and the inference fires for free.
3. **The prophecy is attached to Wren again.** *"Everybody agrees who it is about"* is six words, is
   verbatim shipped, opens nothing, and is the sentence `ch1_dais` and ch6's Asking both spend. Without
   it a table can finish the Prologue having met a four-hundred-year-old sentence and a strange boy and
   never once been told the school puts them together.

The prophecy now comes **before** the doubt: the shipped order tells the player to distrust a sentence
they have not read yet. The button is no longer the title of the scene it leads to.

> **Three script edits, reported not hidden.** `tools/scripts/ch0.json` asserts `"Nobody alive has read
> the cuts"` and clicks `"The night before"`; `full-true.json` clicks the same button. The replacements
> are `{"expect": "the foot of the stone"}` and `{"clickText": "Up the tower"}` — and the new pin is
> the better one, because it is a phrase `ch6.js:341` actually withdraws from. Verified passing with
> exactly those substitutions and no others. `docs/DESIGN.md` §5 line 97 also goes stale; see
> *Reported*.

---

### `ch0_dorm` — **REVISED**. 84 → 97 words, 5 paragraphs

```js
      ch0_dorm: {
        art: 'ch0_dorm', mood: 'tower', fx: 'dust', sfx: 'step',
        title: 'Past curfew',
        text: [
          'Four of you, awake past curfew, in a room with four beds and one round window.',
          'On the sill stands a brass lamp older than any record the school keeps. Nobody has ever got it to light. Everybody has tried.',
          'There is no fifth bed. Wren has slept on the floor between yours since you were seven.',
          'The Provost runs this school. One of you broke her window that year. Wren told her a bird did it, and she believed the bird.',
          { text: 'Left to right: **Reader, Listener, Seer, Binder**. Those are your seats all night.', cls: 'whisper' },
        ],
        next: 'ch0_keys', button: 'Claim the keys',
      },
```

**Rationale.** *"You have known each other since you were seven"* asserts a friendship among the
**four** and supplies no instance of one — and never asserts the relationship the player most needs
to believe, the one with Wren. It is replaced by two things a table can hold: the floor between the
beds (which turns Chapter I's *"I've never had a warm room"* from a new fact into a payoff they have
been sitting on for twenty minutes, and which `ch0_lamp` then pays literally when he sits back down on
it), and one incident that is also the only favour Wren has ever done these four — a joke, and four
words of Marrow (*"she believed the bird"* — she knew, and chose not to know) that quietly earn *"the
nearest thing Wren has to a mother"* without the narrator ever saying it, and set up her Chapter VI
confession. `seven` survives for `ch6.js:330`.

**Four corrections v1 needed here.**

1. **The curfew seam is gone.** v1 added *"Fourth-years are shut in early tonight — the school has
   visitors."* An hour later those same fourth-years are at the back of the Great Hall being sent
   across the floor to lobby Masters, and nothing says who lifted the rule. Under the shipped
   timeline there was no seam; the night compression created one and that line was the only thing
   creating it. Cutting it also removes an R2.5 em-dash carrying a fact, a second establishing detail
   in an opening paragraph that already had one (R12.1), and an open question (*what visitors?*).
   *"Past curfew"* is in the first line and in the scene title; the curfew needs no explaining.
2. **The Provost is introduced, in her own sentence, at first use.** v1 used her name cold twice in the
   Prologue while rejecting *Thornhallow* in the very next scene on the grounds that it would be a
   seventh proper noun. That test is now applied to her too, and the answer is **yes, she is the
   seventh name, and she is worth it** — the Mum slip is unbranched two scenes later and is canon
   (`DESIGN.md:79`), `ch6.js:691` and `ch8.js:346` both pay it off, and R3.2 wants name-plus-what-they-
   are in its own sentence. It costs four words, and they are not new words: they are four of the
   nineteen cut out of `ch1_dais`, where the same sentence had become a gloss.
3. **The window is told once and paid once.** The framing clause goes; the anecdote is 25 words here,
   and the debt — *"you lot still owe me for the window"* — is the second and last mention.
4. **The seat whisper obeys R7.4 and R8.2.** It was the only four-bold-span line in either proposed
   chapter, the only Prologue narration sentence with more than two commas, and 15 words against a
   10-word instruction cap. It is now one bold span, one comma, and two short lines' worth of work in
   one.

Cut: *"Each of you sees one thing the other three cannot."* — but **not dropped**; see `ch0_wren`.

---

### `ch0_keys` — **UNCHANGED**

27 words, the healthiest scene in the chapter: it teaches four-handedness, opens nothing, and carries
the sentence `lore.js` Law 0 and seven later puzzles spend.

---

### `ch0_practice` — **REVISED**. 29 → 27 words

```js
        text: [
          'Later tonight the bells of this school will ring. You will need these keys, and each other.',
          { text: 'Press as your light crosses the line.', cls: 'whisper' },
          { text: 'Purple means everyone.', cls: 'whisper' },
        ],
```

**Rationale.** A promise with no noun in it is not repeatable, and *"later tonight you will do this for
real"* was wrong by a full day under the shipped Prologue. `DESIGN.md` §5 specified the named version.
No new proper noun — *Thornhallow* would be an eighth name, and it can arrive in Chapter VI, which is
titled after it.

---

### `ch0_wren` — **REVISED**. 62 → 114 words, 6 paragraphs, one speaker label

```js
      ch0_wren: {
        art: 'ch0_dorm', mood: 'tower', fx: 'dust', sfx: 'open',
        text: [
          'The door bangs open. Wren comes in talking, and Wren\'s hands do not stop the whole time.',
          { speaker: 'Wren', text: 'You\'re awake. Good. I need four idiots and a lamp. Four, because each of you sees one thing the other three can\'t.' },
          { speaker: 'Wren', text: 'Reader — you read everything and eat nothing. Listener — you hear a spider change its mind.' },
          { speaker: 'Wren', text: 'Seer — you look at walls like they owe you money. Under the paint. Under four hundred years of polish. Is that yours? It is now.' },
          { speaker: 'Wren', text: 'Mum has everybody downstairs. The Provost. Nobody is counting us for an hour.' },
          { speaker: 'Wren', text: 'Where was I. Binder — you tie everyone to everyone and call it kindness. And you lot still owe me for the window.' },
        ],
        next: 'ch0_dare', button: 'And you?',
      },
```

**Rationale.** Read the shipped scene with the speaker label removed: nothing identifies the speaker as
a person rather than the Hearth. Two of its four lines are near-verbatim the `blurb` strings in
`lore.js:8-9`, and the one line that passes the test — *"I need four idiots and a lamp"* — is the line
the author says was good. The four replacements are not invented: they are `companion/ch8.js:86`,
`:94`, `:110` and `:126`, the four sentences Wren writes back to each player in his last letter of the
night. *"Under the paint. Under four hundred years of polish."* survives verbatim — it is the best
long-range plant in the game, twenty-two minutes ahead of Vane's *"Ask your Seer what is under the
paint."*

**Four corrections v1 needed here.**

1. **The roll-call is no longer a roll-call.** v1 kept four sentences of identical construction,
   identical length, identical rhythm, in seat order, read aloud in one breath — having cut five other
   four-part role litanies from the chapter on exactly that argument. It is broken twice now. Early,
   inside the Seer's line, by the hands (*"Is that yours? It is now."* — he interrupts himself with
   somebody else's property, which is the only joke in the chapter about ownership, two scenes before
   he asks for one thing that is his). And late, by the Mum slip, which **derails him**: he says the
   word, does not know why, and has to find his place. The list becomes a boy talking.
2. **The Mum slip has a surface, and it is his.** v1 applied *never gloss a crack* so hard the crack had
   no surface at all — a two-word appositive in a sentence whose job was logistics, fifth in a run of
   six, at the point in the scene where the table is still laughing at the previous line. *"Where was
   I."* is the surface. Nobody in the scene remarks on it, and no narration goes near it. (I considered
   putting the slip last so the scene's silence falls after it, and rejected that: it asks the
   *narrator's* silence to carry the beat, which is a gap. This makes **Wren** carry it, by losing his
   place.)
3. **R2.5.** The em-dash pair is gone. *"Mum has everybody downstairs. The Provost."* is 13 words
   against 15, and the bare correction is the flinch. `ch8.js:346` — *"who once called someone Mum by
   accident"* — reads better off this shape than off a teaching appositive.
4. **The premise is back, on him.** *"Four, because each of you sees one thing the other three can't."*
   Twelve words. After v1 the Hearth never once stated, as fiction, that these four perceive what
   nobody else can — the premise survived only as a puzzle rule in `ch0_lamp`'s brief and as a name
   given after the fact in `ch0_flow`. A table could play the whole Prologue believing these were four
   clever children. It rides on Wren, where it is characterisation rather than exposition: he is the
   only person in the school who talks about the four gifts as ordinary facts about his friends, and it
   turns the roll-call that follows into a bit he is doing on purpose.

The hands are seeded in the same sentence as the door, and the Mum slip now fires for every table.

---

### `ch0_dare` — **REVISED**. 78 → 74 words

```js
        text: [
          { speaker: 'Wren', text: 'Me? I\'m the thing they\'re all coming to look at.' },
          { speaker: 'Wren', text: 'In an hour I stand still at the front of a hall while grown-ups decide about me. I don\'t get a vote. That is the entire job.' },
          { speaker: 'Wren', text: 'I own three shirts and a comb. The comb is the school\'s.' },
          { speaker: 'Wren', text: 'So before that I want one thing that is mine. That lamp.' },
          { speaker: 'Wren', text: 'Carve my name in it first, so it knows whose lamp it is.' },
        ],
```

**Rationale.** The shipped 27-word speech is the chapter's longest, at the boy's first vulnerable
moment, before the table has any reason to care — a monologue of self-awareness, which is the opposite
of subtle. The bureaucratic punchline stays, the self-diagnosis goes, and the weight moves to
`ch0_name`, where four friends have earned it. *"I don't get a vote"* replaces *"a say"*: it plants
Chapter I's mechanic and makes `ch4.js:611` a callback. The crack is an inventory — twelve words that
make *"one thing that is mine"* load-bearing instead of abstract. Also cut: *"A hundred people have
tried to light it with a match"*, the third of three tellings, and the weakest.

**One word back from v1.** *"I stand **still** at the front of a hall"*. v1 deleted the plant and then
claimed the chain of *holding still* as one of its own effects. It is a real chain now, and it runs
across both chapters: he says he will stand still, he says in Chapter I that he **practised**, the
screen says *holding still* before the vote, the bell says *has not moved in an hour*, and on the
losing branch he uses the skill he practised in order to be kept, walking out under guard.

---

### `ch0_carve` — **REVISED** (`wrongText` and `solvedText`). 108 → 66 words

`text`, `config.fields`, `accept: (v) => v[0] === 'WREN'`, `title` and `submitText` are unchanged —
WREN is the Epilogue's attunement word and `ch8.js:493`/`:502`/`:510` say so three times.

```js
        config: () => ({ title: 'CARVE A NAME', fields: [{ label: 'the name', placeholder: 'four letters', len: 8 }], accept: (v) => v[0] === 'WREN', wrongText: 'Wren, cheerful about it: "Wrong boy. Try W-R-E-N. Four letters, and I picked none of them."', submitText: 'Carve' }),
        solvedText: [
          'It flares blue, once, and dies.',
          'A hundred names in that brass. Not one of them has ever answered.',
          { speaker: 'Wren', text: 'Names don\'t burn. Words do — the old ones.' },
          'Wren\'s hands have stopped.',
        ],
```

**Rationale.** The shipped scene produces the most astonishing fact in the Prologue — a lamp nobody has
lit in four hundred years answers to the name WREN — and then uses its most trusted character to
certify that it is not one (*"Told you."*, and he is **pleased**). That is worse than telling instead
of showing: the player is told the strongest piece of evidence in the chapter is not evidence.

The forty-seven cut words were four verbatim duplicates of the four Companion Sight pages read thirty
seconds later, the second of six role litanies in one chapter, and a quiet plot hole — three of the
four are perceptible only through a Sighting Wren does not have. (Cutting them also removes a
contradiction: the Hearth told the room *"it hums"* while the Listener's page says nobody else has
ever heard it.)

**Three corrections v1 needed here.**

1. **The comparison is observational, not testimony.** v1 wrote *"A hundred names in that brass, and
   not one of them ever did that"* — the narrator asserting what nobody in the room can hold, which is
   the exact move this pass indicts `ch0_name`'s *"I've known for years"* and `ch0_stone`'s translation
   dispute for. *"Not one of them has ever answered"* is a standing property of the object, in the same
   register the chapter has already established two scenes earlier (*"Nobody has ever got it to light.
   Everybody has tried."*) — a recall, not a new claim from an authority the game has not built.
   (I did not take the reviewer's *"None of them are burnt"*: a blue flare that dies leaves no scorch,
   so it asks the player to infer from evidence the fiction does not supply.)
2. **The order flips, and "Lucky for me" goes.** He talks over the moment **immediately** — a lecture
   about sigil grammar, delivered at the instant four hundred years of brass refuses his name, which is
   the compulsion at its purest and needs no adverb — and the narration lands the crack **last**,
   alone, ending the beat. The mouth says it does not matter. The hands disagree. Nobody says so.
   *"Lucky for me"* was occupying the space where a joke goes without being one: read aloud, its
   referent is unrecoverable and it lands as a mumble.
3. **The wrong answer does emotional work.** `wrongText` was *'Wren, arms folded: "My name. Mine.
   W-R-E-N."'* — petulant, in the one beat where the **right** answer is the thing that wounds him.
   Now he is *cheerful about it*, because being addressed at all is a novelty; *"Wrong boy"* is the
   chapter's own question said by him first as a gag, three minutes before Vane starts saying *the boy*
   in earnest; *"Try W-R-E-N"* does what a `wrongText` exists to do and tells them what to type; and
   *"I picked none of them"* is the fact riding in the object position — he was named by somebody else
   (`ch1_dais`: *"I named the child"*), which ch4 and ch6 both spend. Then the table types the name he
   did not choose, and the brass refuses it anyway. Not pinned in any of the sixty scripts.

---

### `ch0_attune` — **UNCHANGED**

---

### `ch0_lamp` — **REVISED** (`solvedText` only). 98 → 81 words

The brief, the rule card, `answer: { 3: 'ASH', 4: 'EMBER' }`, `allowEmpty`, `showArrow: false`,
`fourHands` and all three hint rungs are **untouched**. `node tools/check-hints.js` re-verified:
`ok ch0_lamp ring 1 state`.

```js
        solvedText: [
          'The brass takes the words. The lamp catches — warm, steady, and against about a dozen school rules.',
          { speaker: 'Wren', text: 'Four hundred years, and it wanted four people. Not one. I checked.' },
          'Wren does not touch it. Wren sits down on the floor.',
          { text: 'ASH, EMBER. *Fire, keep.* That is all it ever said.', cls: 'small' },
          'And in that light, each of you sees the thing about Wren you have never said out loud.',
          { text: 'Open the tab marked **Wren**. One line each, out loud, in seat order.', cls: 'whisper' },
        ],
```

**Rationale.** *"Four hundred years. Still works."* is five words at the moment four friends light the
one thing that is his — his biggest beat, his smallest line. *"Not one. I checked"* is the same joke
slot doing four jobs: he has tried to light it alone, more than once, and is filing it as a procedural
note; it retro-justifies the hundred names in the brass; and it plants *one born of four* in the mouth
of a boy being flip about a lamp.

Then the payoff of the whole chapter, unexplained: **he asked for the lamp so that it would know whose
lamp it is, it refused his name, it took two words that are not his — and he will not put a hand on
it.** He sits down on the floor, which is where he sleeps. The room is happy.

**One correction, and it is fourteen words.** v1 wrote *"Wren sits on the floor **with the rest of you**
and looks at it from there."* That destroys the plant it is paying: `ch0_dorm` establishes that the
floor is **his**, the place with no fifth bed. If everybody is on the floor, the floor is not his and
the gesture is just people sitting down — and *"looks at it from there"* is the camera explaining the
shot. He goes there alone.

Cut: the thirty-word sentence explaining to four players what they personally just did — which is also
R2.2's single licensed longest-sentence exception in the entire style guide, now banked for a chapter
that earns it. The closing whisper loses *"Reader, Listener, Seer, Binder"*, the sixth four-part role
litany in a 1,100-word chapter.

---

### `ch0_name` — **REVISED**. 48 → 70 words of `text`, one speaker label

```js
      ch0_name: {
        type: 'choice', art: 'ch0_dorm', mood: 'tower', fx: 'dust', choice: 'WREN_NAME_FOR_GROUP',
        text: [
          'Nobody says anything for a moment.',
          { speaker: 'Wren', text: 'Four of you. I thought it was two.' },
          { speaker: 'Wren', text: 'It\'s fine. It doesn\'t mean anything. I have asked.' },
          { speaker: 'Wren', text: 'Nobody has ever said any of it to my face. So. Thanks. Don\'t do it again.' },
          { speaker: 'Wren', text: 'And you need a name. As a set. Something I can say in a hall.' },
        ],
        options: [
          { id: 'four', text: '"The Four."', next: 'ch0_flow', set: { GROUP_NAME: 'the Four' }, after: [{ speaker: 'Wren', text: 'Grand.' }] },
          { id: 'idiots', text: '"The Idiots."', next: 'ch0_flow', set: { GROUP_NAME: 'the Idiots' }, after: [{ speaker: 'Wren', text: 'Finally, honesty.' }] },
          { id: 'vigil', text: '"The Vigil-in-waiting."', next: 'ch0_flow', set: { GROUP_NAME: 'the Vigil-in-waiting' }, after: [{ speaker: 'Wren', text: 'The Provost will hate that. I\'m using it anyway.' }] },
          { id: 'own', text: 'Something of our own.', next: 'ch0_flow', ask: { prompt: 'What does Wren call the four of you?', set: 'GROUP_NAME', ok: 'That one' }, after: (s) => [{ speaker: 'Wren', text: '"' + (s.flags.GROUP_NAME || 'the Four') + '." Right. That\'s what I\'m saying downstairs, then.' }] },
        ],
      },
```

**Rationale.** *"Yes. All four of you. I've known for years."* is the most delight-destroying pair of
sentences in the two chapters: four differently-shaped mysteries, each needing a different
explanation, confirmed and dismissed by authority in eleven words — which deflates the four
confessions retroactively **and** forecloses `ch6.js:633`'s Second Asking, a beat that needs him not
to be sure.

**The one-word correction, and it matters more than its size.** v1's *"Four. I thought it was two."*
has two live readings that mean completely different things: *four people noticed* (small, warm, he
was wrong about his friends) and *four things wrong with me* (enormous — it means he already knows
about his own shadow and his own silent chest, which pre-empts ch6's Second Asking exactly as the
shipped line did). At the emotional peak of the chapter, that is the author's *"too many possibilities
at once"* happening inside a single sentence. **"Four of you."** settles it to the smaller, better
reading: they noticed, he was counting alone for years, and he was wrong by half — and nothing about
what any of it **means** is conceded, which is the whole point of the replacement.

*"I have asked"* is two words saying he has spent years asking and nobody ever answered, and it opens
a question Chapter VI answers. Then the thanks he cannot hold for a whole sentence. Nothing in the
narration explains any of it.

`"Grand."` is preserved verbatim (`ch0-fit.json` pins it and asserts exactly one `.speaker` label in
`#text` before and after the choice — the scene is one unbroken Wren run, so it still holds). Option
ids, order and `set:` values are untouched; the `vigil` branch loses the Mum slip because the Mum slip
is now unbranched two scenes earlier. *"Something I can say in a hall"* is what makes the choice
matter twenty minutes later.

---

### `ch0_flow` — **REVISED**. 82 → 73 words

```js
        text: [
          'Below, in the great hall, the Hearth flickers again. Wren watches it and does not say anything clever.',
          'The school has a word for what you just did. A Sighting. One way of seeing, one to a person, and nobody chooses which.',
          'Downstairs, nine grown-ups are sitting down to decide where Wren is kept.',
          { text: 'After each chapter the Hearth shows you every path — the ones you walked, and the ones you did not.', cls: 'small' },
        ],
```

**Rationale.** *"Every one of them has a Sighting of their own"* opens an eighth question Chapter I is
**structurally forbidden** to answer — R10.5 keeps gifts and proper nouns off the vote board, so the
shipped nine Masters have pledges, coin, threads and deafness and not one Sighting. It goes, and the
replacement is the chapter hand-off as the next chapter's question: **where he is kept**, not whether
he stays. *A Sighting* survives (ch4, ch7, ch8 and two companion files spend it). And the forbidden
subject is installed for the first time, as an absence, after ten minutes of watching him be clever
about everything else.

**One correction: the clock now moves.** v1 left three separate *"an hour"* statements bracketing the
entire lamp sequence — *"Nobody is counting us for an hour"*, then *"In an hour I stand still…"*, then,
after the carve, a 90-second attunement, a three-to-six-minute ring puzzle and a naming choice,
*"In an hour, nine grown-ups sit down…"*. Either the clock did not move or Wren is late for his own
Vigil. The last one lands as imminence instead of a second countdown, in one word fewer, and the hour
he promised has visibly been spent.

---

# Scene by scene — Chapter I (`js/content/ch1.js`)

### Flow node — **REVISED** (one label)

```js
{ id: 'ch1_p_sorrel', label: 'Sorrel: it goes to the nine', col: 4, row: 0, secret: true, when: (s) => !!s.flags.SORREL },
```

Sorrel no longer names the Ember (see `ch1_prices`), so the node cannot either. Kept shorter than the
shipped label so the flow chart does not widen. Not asserted by any script.

---

### `ch1_start` — **REVISED**. 92 → 80 words

```js
        text: [
          'Nine banners in the rafters, one for each House. Under each banner a chair, and in each chair a Master.',
          'Tonight is the Vigil: the night the Houses come to look at the child the fire left.',
          'At the far end the Hearth is breathing — up, down, up. Every grown-up here is pretending not to watch it.',
          'You are at the back. Wren waves at you. Wren is not supposed to wave.',
        ],
```

**Rationale.** One cut: the role-assignment whisper, which the engine reprints as the `roles:` line on
`ch1_attune` (`js/core/engine.js:255`), where R10.7 puts it. **Correcting v1's own claim: that is four
scenes later, not two** — `ch1_start → ch1_dais → ch1_vane → ch1_flicker → ch1_attune`, roughly four
minutes. The cut still stands, because nothing between here and there asks a player to act on their
role, and `ch1.json`'s `{"expect": "Binder"}` on `ch1_attune` passes on the `roles:` line alone. The
rest is the strongest opening in the game and is untouched — *"the child the fire left"* is an
institution's euphemism and the coldest sentence in either chapter, and *"Wren is not supposed to
wave"* is the only flash of *we know what he is and is not allowed to do*. (It is also the line
`ch1_vote`'s one-ask coach now calls back, three minutes later, with him on a dais under nine Houses.)

---

### `ch1_dais` — **REVISED**. 86 → 57 words

```js
      ch1_dais: {
        art: 'ch1_dais', mood: 'court', fx: 'embers',
        text: [
          { speaker: 'Provost Marrow', text: 'Masters. I found this child on these stones fourteen years ago. I named the child.' },
          { speaker: 'Provost Marrow', text: 'The stone over your heads says one born of four. Tonight you look at the child I kept.' },
          'Wren goes up alone.',
          { speaker: 'Wren', text: 'Hello. It\'s me. I\'ll try not to fidget. I practised. You can\'t tell, but I practised.' },
        ],
        next: 'ch1_vane', button: 'The doors',
      },
```

**Rationale.** Thirty words of the shipped speech are a recap of `ch0_start`, ten minutes earlier, in
worse words — and the one new fact, *"I named the child"*, is enormous (ch4 builds a whole beat on what
WRENN means) and is buried inside the recap where it reads as biography. The rewrite is a claim of
ownership — *I found it, I named it, and tonight you look at it* — which is the chapter's currency in
fourteen words. And *"Tonight I stop arguing and show you"* promises a demonstration inside its own
speech and never delivers one: the Vigil is a custody vote, and nothing in it demonstrates *one born
of four*.

**Three corrections v1 needed here, and this scene now funds `ch1_vote`.**

1. **The vote stays where the writ forces it.** v1 replaced the false promise with *"Tonight you tell
   me whether the child stays"* — which moves the calling of the vote to before Vane arrives, breaks the
   beat order the brief fixes, contradicts `ch1_start` (*"the night the Houses come to look at the
   child"*, untouched), and makes the chapter's best turn redundant: `ch1_flicker`'s *"This school does
   not hand its children to a writ. It hands them to a vote."* would be answering a question Marrow had
   already asked, so the writ would change nothing. *"Tonight you look at the child I kept"* keeps the
   ownership claim, matches `ch1_start`, and leaves the turn intact.
2. **The nineteen-word Provost gloss is cut.** *"That is the Provost. She runs this school, and she is
   the nearest thing Wren has to a mother."* The pass has just made it redundant twice over: the Mum
   slip is unbranched twelve minutes earlier and the window anecdote shows the relationship rather than
   asserting it. This is the narrator explaining a relationship the game has already dramatised — the
   definition of the gloss the whole pass exists to delete. The speaker label `Provost Marrow` carries
   R3.5's introduction, she introduces herself in her own first sentence, and *"She runs this school"*
   has moved to `ch0_dorm`, where the name first appears and R3.2 needs covering. Not pinned by any
   script (`grep "nearest thing\|runs this school" tools/scripts/` → no hits). **These nineteen words
   pay for the whole of `ch1_vote`.**
3. **The narrator's aside goes, and the boy says it funnier.** *"which for Wren is enormous"* is STYLE
   §12.5's one licensed judgement in this chapter, and v1 kept it. It is now spent, deliberately: Wren
   says the same thing better, in his own mouth, and the aside arriving first spoils the joke. The
   repetition **is** the joke — he cannot leave it alone — and the fact it pays out is that a boy
   rehearsed holding still so that nine adults would keep him. It sets the accelerator shape three
   minutes before `ch1_vane` needs it, so the "Also—" collapse reads as a pattern breaking rather than
   a one-off. And on the losing branch it turns *"does not fidget once"* from a good line into a
   devastating one: **the skill he practised in order to be kept is the skill he uses walking out.**
   The licence is banked for a chapter with no boy in it to say it.

---

### `ch1_vane` — **REVISED**. 76 → 78 words, 6 paragraphs, 2 speaker labels

```js
        text: [
          'The doors open before anyone asks them to. Cold first, then soldiers, then a grey coat.',
          'Lord Vane, the Crown\'s Envoy, with a writ. The name in it is Wren\'s.',
          { speaker: 'Vane', text: 'His Majesty asks one small thing: the child, tonight, for safekeeping.' },
          { speaker: 'Vane', text: 'I have seen what is under the paint in this hall, Ilsabet.' },
          'Nobody knows what that means. Her face does.',
          { speaker: 'Wren', text: 'Nobody has ever wanted me in writing before. Also that seal is enormous. Also — no. All right.' },
        ],
```

**Rationale — the highest-yield eighteen words in the pass.** Between `ch1_dais` and the vote there are
five consecutive scenes in which Wren does not speak and is not described, while standing on the dais
the whole time. A man with soldiers reads out a writ demanding him and calls him *the boy* three times,
and the child the chapter is named after has no reaction on screen. **The author feels disconnected
from Wren because Wren is not there.**

The joke accelerates — three clauses, the shape `ch2.js:360` uses once and never seeds — and then
**dies inside his own mouth**: *"Also — no. All right."* He hears himself and stops. There is no
narrator line saying nobody laughed, because a crack the narrator explains is not subtle. It is the
bureaucratic register doing the emotional work (a boy who has never been on a document, reading his
own name on one, filing it as a novelty), and `ch8.js:342` — *"Then Wren makes a joke that nobody
laughs at, and then one that everybody does"* — has been waiting for this since the Epilogue was
written.

**Two corrections v1 needed.** *"Nobody knows what **that** means. Her face does."* is restored
verbatim and as its own paragraph: v1 silently changed *that* to *it* and buried it as the third of
four clauses, while its rationale claimed the line survived untouched — and `docs/STYLE.md:128` quotes
it, with *that*, as the model for covering a cold proper noun. And *"He says the second one low. Not
low enough."* is cut (nine words): a man with soldiers saying a threatening thing across a full hall to
a woman by her given name does not need the narrator to explain that it carried, and the paragraph
after it already says the room heard. Those nine words go to `ch1_vote`.

Every contract survives: the writ (ch3), *"I have seen what is under the paint in this hall,
Ilsabet"* verbatim (four chapters and `TAPESTRY` hang off it; `ch4.js:557` quotes it back). The
saucer-sized seal leaves the narration and returns in the child's voice, where a child's-eye detail
belongs.

---

### `ch1_flicker` — **REVISED**. 96 → 96 words, 6 paragraphs

```js
        text: [
          { speaker: 'Provost Marrow', text: 'This school does not hand its children to a writ. It hands them to a vote. Nine seats. Five keeps.' },
          'Then the Hearth flickers: a long, low bow of the flame. Every face turns to the fire.',
          'Every face but one. The Provost is looking at Wren. Wren has nothing to say about the fire.',
          'Then she speaks to the back of the hall, to you.',
          { speaker: 'Provost Marrow', text: 'The bell is in an hour. Until then, a Master may be spoken to. Go.' },
          { text: 'Above the Masters\' door, a word is cut into the lintel.', cls: 'whisper' },
        ],
```

**Rationale.** The chapter's best-shown clue — every face turns to the fire, and the woman who raised
him turns to him — now has a second silence standing beside it, and the two are about the same thing.
It is the second and last installation of the forbidden subject, and like the first it is an absence.
*"Does the child stay tonight?"* is cut because the rule card asks it thirty seconds later, in the
Chair's own voice, and stays on screen for six minutes. `ch1.json`'s pin *"The Provost is looking at
Wren"* survives verbatim.

---

### `ch1_attune` — **REVISED**. 27 → 34 words

```js
        text: [
          'Wren is on the dais, holding still.',
          { text: 'Open the Companion. Take your seat. Type the word on the lintel.', cls: 'whisper' },
          { text: 'Read your page. Say nothing yet.', cls: 'whisper' },
        ],
```

**Rationale.** This is the last thing on the shared screen before the vote board appears, and it sits
there for the ninety seconds the phones take to attune. *Holding still* is the third call of the chain
(`ch0_dare`, `ch1_dais`, here).

**Two corrections v1 needed.** The line was `cls: 'whisper'` — which STYLE §7 defines as *a table
instruction*, used ten times a chapter for exactly that, and which the table has been trained for
twenty minutes to read as procedure. The one piece of fiction moved here to do emotional work was
typeset as housekeeping, between two actual instructions. The class is gone; it renders as narration
above them, and R8.3 (instruction and fiction never share a sentence) is satisfied by the paragraph
break. And *"You have an hour"* is cut: it was the clock's third statement in three consecutive scenes
(`ch1_start`'s title, Marrow's *"The bell is in an hour"*, here).

---

### `ch1_vote` — **REVISED**: five strings, +10 words, and it is the most important change in the pass

`js/puzzles/seats.js` is **not touched**. Nine seats, two asks, `{sorrel, oriel}` as the unique winning
pair, the same 58-word rule card, the same partition, the same three hint rungs, the same `timer: 360`,
the same stall grant. Nothing below is a private fact and nothing below changes what a table can
deduce. `node tools/check-hints.js` re-verified: `ok ch1_vote seats 4 states`.

**Why this had to change.** v1 diagnosed that Wren is absent from the scenes that decide his fate,
identified five of them, then fixed eighteen words in `ch1_vane` and one line in `ch1_attune` — and
declared the longest of those scenes, six of the chapter's thirteen minutes and the one that *is* the
chapter, byte-identical, and defended that as a virtue. Every other clause of the author's complaint
runs through the same hole: it is where the levity is absent, where the rapport is absent, and where
the chapter's declared question does not operate. The widget already owns four unused authoring
surfaces that live outside `#text`, outside the 65-word brief cap, and outside the fit scan.

**(a) `center` — the picture, for six minutes.**

```js
title: 'THE HOUR BEFORE THE BELL', center: 'Wren', startAngle: 20, max: ASKS, timer: 360, submitText: 'Call the vote',
```

`seats.js:14` prints `cfg.center` as an SVG `<text>` at the dead centre of the ring, on top of a
pulsing orange disc, for the whole six minutes. It said `'the Hearth'`. Nine Houses in a ring, and in
the middle of them a small warm disc with a boy's name on it, pulsing once every three seconds. That
is the chapter's thesis as a picture and it costs **one word less** than what it replaces.

It also fixes a small lie — the Hearth is *at the far end of the hall* (`ch1_start`), and the Seer's
own map of this room (`companion/ch1.js`, `underHall`) draws it at the top with the nine seats in a
ring below — and it sets up the two-word contrast that now runs the length of the puzzle: **the rule
card says *the child*, every Master says *the child*, and the middle of the board says *Wren*.** The
distance between those two words is what the table is playing for. The win line closes it —
`Five of nine. Wren stays.` — and it is the first time the hall's own surface uses his name.

**(b) and (c) the two under-commitment coaches — the moments the table is stuck.**

```js
              if (selected.length < 2) return { ok: false, text: selected.length ? 'One Master spoken to. Wren, from the dais: "One more. I didn\'t write the rules."' : 'You have spoken to nobody. Wren is counting the rafters. Go to two Masters.' };
```

*Zero asks* — the table has pressed **Call the vote** without moving. Nine adults are counting him and
he is counting the ceiling, and `ch1_start` has already said what is up there: *"Nine banners in the
rafters, one for each House."* Nobody says that. The joke and the weight are the same four words, and
*counting* is the chapter's own verb (*"The Chair does not hear cases. The Chair counts them."*).

*One ask* — a boy with no vote disclaiming authorship of the procedure that owns him, out loud, in the
middle of it, while helping. He is heckling his own custody hearing and telling them what to press.
This is compulsive levity at cost to himself, in the one place a table cannot look away. The
instruction survives (*one more*), and `seats.js:46` writes this to `status.textContent`, so it is
plain text with no markup and no speaker label — the same constraint that produced the best procedural
line in the Prologue, `ch0_lamp`'s *'Wren, unhelpfully: "Has everyone actually said their bit?"'*.

Both keep the substrings `ch1-lost.json` pins (`spoken to nobody`, `One Master spoken to`), both are
one line of `.pz-status` at 1280×720, and both are one instruction per sentence (R8.2/R8.3).

**(d) `REASONS.oriel` — the Master who keeps him.**

```js
    oriel: 'Seat 7 asks two questions, does not smile, and never looks away from the child. "Very well. Tonight — keep."',
```

`check()` prints it at the commit and `solvedText()` replays it (R10.14), so **every winning table
reads this twice.** It is the only place in the six minutes where the board says something about him
that the table does not already believe: **the Master who votes to keep him is studying him.** A vote
*for* Wren turns out not to be a vote *for* Wren. That is the chapter's one genuinely unsettling idea
and it now arrives inside the mechanic instead of after it — and it makes solving the vote and
noticing that somebody in this hall is *studying* Wren the same act, which is what v1 claimed for the
Seat 7 murmur and had not earned. It rhymes forward to the murmur on the Listener's phone, to the cut
*"Like I was a sum she was doing"*, and to Oriel's price two scenes later. Seat 7 collects.

Mechanically nothing moves: the clause the rule card is teaching (*a Master you ask votes KEEP*) is
still taught by the ask, the two questions and the verdict. *"Tonight — keep"* is intact for
`ch1.json`. *"listens a long time"* is dropped because it was saying the same thing as *"asks two
questions"*.

**(e) `timeoutText` — the bell.**

```js
          const STALL = 'The bell. Wren has not moved in an hour. The Provost rises: "The Chair has not finished hearing the Masters." She is stalling for you.';
```

The bell is the chapter's biggest mechanical beat — it hands over all three hint rungs, flashes the
bell and plays `boom` — and it is the moment an hour of custody arithmetic runs out. Nine words say
what the hour cost, in a fact with no adjective in it, and they make the Provost's stall cost somebody
something: she is buying the table time, and he is paying for it standing up. It plants
`ch1_after`'s beat an hour early. It trades out *"and does not call the vote"* to stay inside two
lines of status at both viewports; the reassurance survives twice over (Marrow says the count has not
happened, *"She is stalling for you"* says it in plain English and is the string `ch1-stall.json`
waits on) and the mechanic itself is the reassurance — `check()` consumes the stall flag and returns
non-final, so the first commit after the bell cannot lose. R10.25 holds.

**What I deliberately did not use.** `seats[].sub` renders *inside* the seat disc: one sub singles that
seat out on the shared screen, which either leaks a private fact or lies, and nine subs grow the board.
`note` is at R10.2's 60-word cap with no pixels spare, and `title` is the clock, which is the pressure.
`lockedText` is R10.16's refusal and is deliberately the same sentence as `REASONS.marrow`; the obvious
Wren line there (*she has not looked away from him*) would be the fourth telling of a clue
`ch1_flicker`, the Reader's phone and `ch2_start` already tell. And `REASONS.sorrel` already contains
the chapter's best Wren rhyme by implication — *"Since you asked me to my face"*, in a hall where
nobody has asked the child anything to his face all night. Saying that out loud destroys it.

**What the table actually sees.**

| moment | the shared screen |
|---|---|
| 0:00, always | Nine banners in a ring. In the middle, on a slow orange pulse: **Wren** |
| the rule card, always | *Five of nine keeps **the child**…* — the institution's word, six inches from his name |
| stalled, no asks | *You have spoken to nobody. Wren is counting the rafters. Go to two Masters.* |
| one ask spent | *One Master spoken to. Wren, from the dais: "One more. I didn't write the rules."* |
| somebody tries the Chair | *The Chair does not hear cases. The Chair counts them.* (unchanged) |
| 6:00, the bell | *The bell. Wren has not moved in an hour. The Provost rises: "…" She is stalling for you.* |
| the winning commit | *…Seat 7 asks two questions, does not smile, and never looks away from the child. "Very well. Tonight — keep." … Five of nine. **Wren stays.*** |
| the losing commit | *…Four is not five. The vote has been called.* (unchanged, and it must stay cold) |

Five sightings across six minutes, one of them permanent, at the four moments a table's eyes are
actually on the widget. He never speaks in `#text`, and no line of narration says what any of it means.

**Word accounting inside the widget:** `center` −1 · zero-ask coach +1 · one-ask coach +6 ·
`REASONS.oriel` +3 · `STALL` +1 = **+10**, against **−28** taken out of `ch1_dais` (19) and `ch1_vane`
(9). Three of the five strings live on keys `prose-count.js` does not scan, so the tool reports ch1 at
1,332 and the honest figure is **1,335**. Both are below the shipped 1,349, and the measurements
section charges for all ten words.

---

### `ch1_won` — **REVISED** (three words)

```js
          'Then the two Masters who said yes are at your elbows, not smiling.',
```

**Rationale.** Tightening only. *"I watched the Binder walk up to Seat One. The Binder doesn't walk up
to anyone."* is the best rapport line in either chapter and is untouched.

---

### `ch1_lost` — **REVISED** (one line)

```js
          { speaker: 'Provost Marrow', text: 'I will get the child back myself. You have an errand.' },
```

**Rationale.** As shipped, a losing table hears Marrow demand the Cold Ember here, hears her explain
what it is two scenes later, and hears `ch2.js:182` say almost the same sentence at the top of the
next chapter. The Ember is now named once, in `ch1_after`, on both branches. `ch1-lost.json`'s pin
*"I will get the child back myself"* survives verbatim. **Nothing else in this scene is touched** — it
is the best-written scene in either chapter, and *"does not fidget once"* is now three times stronger,
because the hands have an antecedent and because the boy has told the room he practised.

---

### `ch1_prices` — **REVISED**. 90 → 91 words of `text`, and the biggest structural fix in the chapter

```js
        text: [
          'Seat 1 is Master Sorrel. Seat 7 is Master Oriel. They voted for you and would like that noticed.',
          { speaker: 'Master Sorrel', text: 'The Provost will send somebody under this school. What they bring up comes to the nine of us. We are the Convocation, not her.' },
          { speaker: 'Master Oriel', text: 'I want none of that. I want to be told what is down there, before she is.' },
          'And the Provost already crossing the hall. One price, or neither.',
        ],
        prompt: 'Whose price do you honour?',
        options: [
          { id: 'sorrel', text: 'Sorrel: whatever you bring up goes to the nine.', if: (s) => (s.flags.CH1_APPROACHED || []).includes('sorrel'), next: 'ch1_offer',
            set: { SORREL: true, ORIEL: false, NEITHER: false }, note: 'You promised Sorrel whatever you bring up.',
            after: [{ speaker: 'Master Sorrel', text: 'Good. See that you keep yours.' }, 'Oriel says nothing at all.'] },
          { id: 'oriel', text: 'Oriel: tell her everything you find below.', if: (s) => (s.flags.CH1_APPROACHED || []).includes('oriel'), next: 'ch1_offer',
            set: { ORIEL: true, SORREL: false, NEITHER: false }, note: 'You promised Oriel everything below.',
            after: [{ speaker: 'Master Oriel', text: 'All of it. Even the parts you don\'t like.' }, 'Sorrel does not forget.'] },
          { id: 'neither', text: 'Neither. You answer to the Provost.', next: 'ch1_offer',
            set: { NEITHER: true, SORREL: false, ORIEL: false }, note: 'You refused both prices.',
            after: ['Two thin mouths. Neither of them will spend anything on you again.'] },
        ],
```

**Rationale.** This is the author's second complaint, verbatim: *"I had to think of too many
possibilities at once and didn't know what the writer wanted me to focus on."* In 136 words under a
45-second clock the shipped beat introduces two personal names, two proper nouns nobody has heard (the
Cold Ember, the Convocation), a political structure, and a three-way choice setting cross-chapter
flags — and Sorrel says *"when the Provost sends you down for it"* **before the Provost has mentioned
sending anyone anywhere**, with Marrow explaining the MacGuffin two scenes later.

**Sorrel no longer names the Ember. She names the coup** — which is what she actually wants, is the
only thing the player can weigh at that moment, and takes the MacGuffin out of a timed beat. **Oriel
is priced in the same currency and stated plainly** — *before she is* — so the choice is between *the
nine get the object* and *I keep a secret from the Provost*, both reasoned from what the table just
watched. And the beat gains a shape it never had: **the table sells something away before it learns
what it is, and Marrow tells them what it was two scenes later.**

**Three corrections v1 needed here, two of them blockers.**

1. **The Convocation is back.** `ch1.js:255` is the **only** player-facing introduction of that name in
   the entire game, and v1 deleted it — the ledger even booked the deletion as a win. Downstream, on
   the branch this very choice sets, it then appears cold on the shared screen: `ch2.js:162` as a flow
   node (*"The Convocation took the Ember"*), `ch2.js:388` as narration (*"Behind her, two of the
   Convocation's guards and a writ"*), `ch2.js:419`, `ch3.js:404`, and `ch3.js:552` as a **choice
   button the table has to understand in order to press it** (*'"The Convocation's seal. Read it,
   captain."'*). The only other occurrence before ch2 is a struck-Law footnote in the Binder's Book
   (`lore.js:57`) — one phone, a dated parenthesis, and three of four players never see it. No test
   catches this: `ch2-sorrel.json` and `ch3-writ.json` both start mid-game with `"flags": "SORREL"`
   preset, and `full-true.json` honours Oriel. `docs/DESIGN.md` §5 names the beat "The Convocation
   Vote" and specifies this line. The real clutter was the **second** proper noun in a 45-second beat,
   not the first.
2. **The form of the introduction is R3.2, not an appositive.** *"We are the Convocation, not her."* —
   name plus what they are, in its own sentence, in the mouth of one of them, with no em-dash pair
   teaching a fact (which is what the shipped *"— the Convocation."* was, and what v1's replacement
   would have re-created if the noun had simply been pasted back). Twenty-four words, inside R6.3.
3. **Sorrel stops knowing the future.** v1 wrote *"The Provost sends somebody under this school
   tonight"* — and two scenes later Marrow changes her mind on screen: *"In the morning I would have
   sent — no. I am sending you tonight."* So the plan of record was the morning, and a Master has
   already stated the opposite as settled fact. That is precisely the defect this pass indicts the
   shipped line for, re-committed with the word *tonight* made explicit. **"will send"** is a Master
   predicting his colleague rather than reading her mind, Oriel's *before she is* still reads, and
   Marrow's change of mind keeps its whole charge.

**And "neither" now costs something in the room.** v1 admitted the problem and left it: under a
45-second clock, Sorrel costs you the object, Oriel costs you a secret from the Provost, and refusing
both was free, which makes a timed dilemma a coin flip wearing a dilemma's clothes. Its real price was
a Finale shield five chapters away. The `after:` string already gestured at it (*"Two thin mouths"*);
it is now a price, in the same eleven words: **two Masters who just kept Wren, and neither of them will
spend anything on you again.**

`SORREL`, `ORIEL`, `NEITHER`, the timer, `timeout: 'neither'`, the `if:` guards and the test-pinned
`after:` string *"Even the parts you don't like"* are all unchanged.

---

### `ch1_offer` — **REVISED**. 82 → 88 words of `text`; options untouched in full

```js
        text: (s) => [
          'Later. The hall emptying, and a grey coat in a passage where no grey coat should be.',
          { speaker: 'Vane', text: s.flags.VOTE_LOST
            ? 'The Provost will have the boy back by morning. When she does — bring him to me before dawn.'
            : 'Bring the boy to me before dawn.' },
          { speaker: 'Vane', text: 'He lives. I promise you that. And the Crown makes the four of you Masters.' },
          { speaker: 'Vane', text: 'You have seen tonight what a Master costs. You think I am the villain of it. Ask your Seer what is under the paint.' },
        ],
        prompt: 'The Envoy waits.',
```

**Rationale.** Eight words put the chapter's thesis in the antagonist's mouth: he is offering to make
them one of the nine people they have just spent six minutes discovering are bought, deaf, blocked or
already spoken for — and he knows it, and expects them to. It also makes *"You think I am the villain
of it"* land as an argument rather than a protest. The irony was sitting inside the shipped offer,
unused. *"He waits."* goes; the `prompt:` says it nine words later. Every option id, `set:`, `sub:`,
`cls:'dark'`, `note:` and `after:` is unchanged, including both test-pinned replies.

Vane keeps *the boy*, three times, per the standing pronoun decision.

---

### `ch1_after` — **REVISED**. `text` summed across branches 149 → 154; worst single branch 122 words, 6 paragraphs

```js
        text: (s) => {
          const out = [];
          if (s.flags.VOTE_LOST) {
            out.push('Wren sits on the step between two soldiers, in a way that makes the soldiers look like furniture.');
            out.push({ speaker: 'Wren', text: 'They asked if I had anything to bring. I said no. They wrote it down.' });
            out.push({ speaker: 'Wren', text: 'It\'s fine. They have a warm room. I\'ve never had a warm room.' });
          } else {
            out.push('Wren finds you last, and sits down all at once.');
            out.push({ speaker: 'Wren', text: 'So I stay. Provisionally. Nobody has said for how long. Somebody asked who you four were. I said ' + (s.flags.GROUP_NAME || 'the Four') + '. They wrote it down.' });
          }
          out.push('The Provost comes when the last Master has gone. She stands with her back to the fire. It flickers again — a cough.');
          out.push({ speaker: 'Provost Marrow', text: 'It has not done that in fourteen years. Under this school the Founders left the Cold Ember. If the fire goes out, the Ember lights it again.' });
          out.push({ speaker: 'Provost Marrow', text: 'A Founders\' door wants four hands, and I have four I trust. In the morning I would have sent — no. I am sending you tonight.' });
          return out;
        },
```

**Rationale — five changes.**

**The gloss goes.** *"Wren is lying, and is fourteen, and is doing it for you"* is three clauses telling
the reader what they have just felt, directly after the best crack in the game. The line above it is
the deflection and the wound in the same sentence and needs nothing. This single deletion is the rule
the whole pass runs on.

**The losing branch gets the paperwork voice at maximum pressure.** *"They asked if I had anything to
bring. I said no. They wrote it down."* The state has asked a child what he owns, he has answered
truthfully, and the answer has been **minuted**. It detonates *"I own three shirts and a comb"* from
thirteen minutes earlier without restating it, and it rhymes exactly with the winning branch's *"They
wrote it down"* — the same institution filing him whichever way the vote went. It is its own
paragraph; the warm-room crack is the next one, untouched and unglossed. The joke and the crack never
share a breath. *(In `ch1_lost` the same line would be funnier still — asked **to** the soldiers,
answered by nobody — but `ch1_lost` already runs Vane and Marrow, and a third speaking character
breaks R6.1 in the best-written scene in either chapter. Reported, not taken.)*

**The winning branch gets a crack of its own.** As shipped, the game writes failure better than
success and hands the modal path a signpost (*"Seer, what is* on *that wall?"*). Now the wound is
filed as an administrative note — *Provisionally. Nobody has said for how long.* — and then he claims
them, in public, to a Master, on the night the Crown came for him, and **it is on a record**. Warm and
cold in one paragraph, nothing explained, and `GROUP_NAME` finally does something in the chapter after
the one that chose it, instead of going silent for five. The em-dash is gone (R2.5) and the narrator's
*"the exhaustion of somebody who has stood still for an hour"* is gone with it — once the boy has said
he practised, the narrator saying he stood still is the gloss this pass is built on deleting, and the
bell has already said it inside the widget.

**The unintended question closes.** Hours after an Envoy walked in with soldiers, the Provost of a
school with nine Masters sends four fourteen-year-olds under the school alone, and the shipped chapter
never acknowledges that this is strange — so the player spends attention on a question the writer did
not intend. Eleven words close it, characterise her, and pay off *"Four hands is how this school does
anything that matters"* from the dormitory.

**The Ember lands clean and first**, because Sorrel no longer spends it inside a timer. And the
17-word sentence v1 created by merging two shipped ones — the only place in the pass that lengthened
the tail STYLE §2 says is the whole problem — is two sentences again.

Cut with it: *"Seat Seven watched me the whole time. Like I was a sum she was doing."* — a question
opened in the chapter's closing scene that the chapter could not touch, plus the fourth raising of
*under the paint* in one chapter. Its content is now inside `ch1_vote`, in `REASONS.oriel` and the
Listener's Seat 7 murmur, where the player can act on it. `full-true.json`'s *"sending you tonight"*
and `ch1-lost.json`'s *"warm room"* survive verbatim.

---

### `ch1_flow` — **UNCHANGED**

*"The bell has rung once tonight. It will ring again."* sets up ch3's clock, and `stats` carries five
test-pinned substrings.

---

# The Companion — the four Prologue Wren tabs

Every **fact is identical** to the shipped version: the name in two alphabets (Reader), the flat
heartbeat (Listener), the shadow toward the fire (Seer), no thread at all (Binder). All four are
consumed one-for-one by `ch6.js:642–673`'s Second Asking and re-read across twenty-four blocks in
ch2–ch8. Every figure (`underDorm`, `threadLine`, `heartbeats`, `D.trace('flat')`) is untouched, and so
is R11.18's four-shadows-away/one-toward geometry. The **"You decided…" refrain and its vintages are
verbatim**, because six later companion files quote fragments of them — including
`companion/ch2.js:120`, which quotes the Reader's *"You have never asked who"* word for word.

Three things change.

1. **One ordinary, loved behaviour before the anomaly** — 11 to 20 words, about something Wren *did*,
   that only this gift would catch. Four pages about a friend currently contain not one word of
   affection, and all four are forensic readings of his body: a name, a pulse, a shadow, a thread.
   With the warmth in front, the anomaly lands as a betrayal of something loved rather than as data.
2. **The line to say out loud.** `ch0.js:218` instructs four players to say *"one line each, out loud,
   in seat order"* and **no page supplies a line** — in play, four people improvise a paraphrase of a
   fifty-word paragraph, cold, in seat order, at the most important beat in the chapter. Each page now
   ends on a short quoted sentence in italics. There is no *"Say, out loud:"* prefix: the Hearth has
   already given the instruction, and a Wren page carries no instruction.
3. **They escalate across the fixed seat order** — a mark on a door → a silence → a thing happening in
   this room, in this light → nothing at all, now. The Prologue's last spoken line is present tense.

**All four pages are inside R11.3's 40–75 as it stands.** v1 asked the author to raise the budget to
85. **That request is withdrawn**: it was asking to loosen a rule the pass does not need, which is
itself a small piece of the clutter this pass is about. Measured the way STYLE §11.2 defines it — all
rendered text, headings and list items included — the four pages are **74 · 59 · 73 · 73**, against a
shipped 51 · 37 · 48 · 67.

### Reader — 74 words

```js
        P.wren.push({ t: 'h', text: 'The name on the door' });
        P.wren.push({ t: 'p', text: 'Every fourth-year’s name is chalked on the dormitory door. Wren writes the smudged ones back in neater.' });
        P.wren.push({ t: 'p', text: 'Wren’s is there twice. Once in our letters. Once in letters you have never seen before — and the handwriting is the same.' });
        P.wren.push({ t: 'p', text: 'You decided, a year ago, that somebody was being funny. You have never asked who, and you know why.' });
        P.wren.push({ t: 'p', text: '*“Wren’s name is up there twice. I can only read one.”*' });
```

The warmth: a boy with no family and no possessions quietly maintaining the roll of who belongs — and
only a Reader would ever notice that a chalked name has been rewritten neater.

**Correcting v1, which contradicted itself inside this page.** v1 replaced the shipped excuse with
*"You have not looked at that door since"* — while blocks 1 and 2 report, in the present tense, what is
on the door now and what he keeps doing to it. You cannot have not looked at a door since last year
and also be describing it. **And the shipped line it replaced is quoted verbatim by
`companion/ch2.js:120`**, so changing it also made a Chapter II callback rhyme with a line that no
longer existed. The shipped words come back, with four added that supply the shame v1 was reaching for
without contradicting anything: *"and you know why."* Nothing explains what the why is.

### Listener — 59 words

```js
        P.wren.push({ t: 'h', text: 'How quiet' });
        P.wren.push({ t: 'p', text: 'You always know when Wren is coming. Three floors of stairs, and a voice the whole way up.' });
        P.wren.push({ t: 'html', html: /* heartbeats figure — unchanged */ });
        P.wren.push({ t: 'p', text: 'You can hear a teacher’s heart through a stone floor. You have never once heard Wren’s. You decided years ago that the fault was yours, and never said it out loud.' });
        P.wren.push({ t: 'p', text: '*“I have never heard his heart. Not once.”*' });
```

The warmth is the character note the whole pass is built on, confirmed from outside by the one person
who can measure it: **he never stops talking.** All that noise coming up three floors, and nothing
underneath it. The two sentences are never joined. The player joins them.

**Correcting v1:** the figure has moved **below** the warmth line. v1 stated its own rule as "one
ordinary, loved behaviour *before* the anomaly" and then left the flat heartbeat trace — the anomaly
itself — as block two, ahead of it. All four pages now run warmth → anomaly.

### Seer — 73 words

```js
        P.wren.push({ t: 'h', text: 'The shadow' });
        P.wren.push({ t: 'p', text: 'Wren always takes the dark end of the room, and gives you the fire. You have never said you noticed.' });
        P.wren.push({ t: 'svg', cls: 'underlayer', svg: underDorm });
        P.wren.push({ t: 'p', text: 'Every shadow in this room falls away from the lamp. Wren’s falls toward it. You decided months ago it was a trick of the light. You are looking straight at it now. It is not the light. It never was.' });
        P.wren.push({ t: 'p', text: '*“His shadow is going the wrong way. It is going now.”*' });
```

**This is the one v1 line I replaced outright rather than repaired, and the reason is a four-handedness
risk, not a taste.** v1's warmth was *"Wren scratches a name under things. A bed rail, a sill, the
third stair."* Three problems, two of them structural:

- **It collides with the ring puzzle, on the same phone.** This player's own Sight page says *"A long,
  deliberate **scratch** under socket **3**"*, and the Binder's rule that consumes it says *"A sigil
  begins at the scratch — that is the mark. A notch is only a maker's signature."* The lamp stands on
  **the sill** (`ch0_dorm`), and the rewritten `ch0_wren` has Wren's hands all over the sill. The same
  phone would then carry, in two tabs, *Wren scratches names under things, including a sill* and
  *there is a long deliberate scratch under this lamp's socket 3*. A table that joins them discards the
  mark as Wren's graffiti and reads the notch as the start, which puts ASH in slot 1. The answer does
  not change and the Wren tab opens after the puzzle — but the Book keeps both pages all night, and
  R10.21 is explicit that a decoy made tempting by a role's own page is not a decoy, it is a trick.
- **It broke R11.19's four-independent-observations design.** The Reader's private anomaly is Wren's
  **name**; a Seer warmth line about Wren writing his **name** makes name-writing shared vocabulary
  across two of the four pages, on the one axis the Reader is supposed to own alone.
- **It opened a question the Prologue does not answer** (*why does he carve his own name under
  everything?*), against R11.21's one-per-role cap.

The replacement is pure Seer register — position and light, which is what Under-Sight is for — shares
no word with the ring puzzle or with any other page, opens nothing, and rhymes forward instead of
sideways: the boy who **gives away the fire** is the boy whose shadow goes **toward** it, and the
figure directly below says so. It is a kindness and it is unbearable, and she has never told him she
can see.

### Binder — 73 words

```js
        P.wren.push({ t: 'h', text: 'No thread' });
        P.wren.push({ t: 'p', text: 'Wren is why half this room speaks to the other half.' });
        P.wren.push({ t: 'html', html: /* threadLine list — unchanged */ });
        P.wren.push({ t: 'p', text: 'You have seen unbound people. Wren is not unbound. You decided it was a blind spot in your own gift, and never told anyone.' });
        P.wren.push({ t: 'p', text: '*“He has no thread. Not to anyone. Not now.”*' });
```

A boy who ties everybody in the room to everybody else and is tied to nobody — the Binder's gift
applied to the only person it fails on, and the same observation `companion/ch8.js:126` makes in
Wren's own hand at the end of the night. *"Not unbound"* survives for `companion/book.js:131`,
`ch6.js:322` and `:673`.

**Two corrections v1 needed.** The page was **96 words** measured the way R11.2 says to measure —
v1 reported 73 by not counting the three list items inside its own figure — so it missed the hard cap
by twenty-one. It is now 73, and the only sentence lost is *"There is nothing there at all"*, which the
figure directly above it already says in its own words (*"Wren: nothing. No thread at all, to
anyone."*) — R11.12's rule that a figure replaces a paragraph rather than illustrating one.

And **the spoken line has a referent.** v1's *"There is nothing to find. There is nothing there now."*
is the Prologue's last spoken line, said cold, fourth in seat order, by somebody improvising out loud
for the first time — and it names nobody, so it lands as a riddle. *"He has no thread. Not to anyone.
Not now."* keeps the present tense the design wants, and the Prologue's last spoken words are about a
person rather than about nothing.

### The four Sight pages — **REVISED**: four semicolons, at zero word cost

R2.1 is *zero semicolons in player-visible prose*, unqualified, and v1 reported it as met. The two
Hearth files are genuinely clean. `companion/ch0.js` — a file this pass edits — had four the players
read (`:89`, `:94`, `:108`, `:135`). They are now full stops. No word count changes, no fact moves, and
the four Sight pages are otherwise **byte-identical**, so both partitions and both drop-a-role tables
are untouched.

*(Two semicolons remain on the Reader's page, inside the lexicon table cells — `what remains; to keep;
to close`. Those are gloss separators inside a two-column lookup, not prose, and they are shipped.
Reported, not changed.)*

> **The one STYLE amendment this pass needs, and it is smaller than v1's.** §11.5 sets a Wren page's
> "ends with" to *"nothing to do; no instruction"* and its structure to *`h` + (0–1 figure) + 1–2 short
> `p`* — rules derived **from these very pages**, which is why they now prevent the one thing
> `ch0.js:218` requires. Proposed, as one sentence: *"A Wren page carries no instruction. Where the
> Hearth asks for a line to be spoken from the Wren tab — the Prologue only — the page's closing block
> is that line: a quoted sentence in italics, ≤ 12 words, no instruction attached, and it does not
> count against the page's paragraph structure."* **R11.3's 40–75 word budget is unchanged** and all
> four pages fit it. No bold is added, no number the table needs is added, no contract-bearing content
> is touched.

# The Companion — Chapter I

### The Listener's Seat 7 murmur — **REVISED** (one line)

```js
        P.sight.push(murmur(7, 'Nobody has asked me anything. I have been watching the child.', [-2, 2, 1], 54));
```

**Rationale.** Operationally identical — *still talking* still means *still open to an ask*, no other
role's fact moves, the page's own derived claim *"So **Seats 1, 3 and 7 are still open to being talked
to.**"* is unchanged, and `{sorrel, oriel}` remains the unique winning pair. Dramatically it closes the
chapter's worst structural gap — **the puzzle is about nine Masters and the chapter is about three
people, and they never touched** — and it now has a partner on the shared screen: `REASONS.oriel` says
the same thing about Seat 7 out loud, at the commit, where every winning table reads it twice.

All four Chapter I Sight pages, both figures, and all four Chapter I Wren tabs are otherwise
**UNCHANGED**.

---

# The pronoun, as decided

The author's standing decision, made after v1 was written, is applied throughout: **the narration stays
pronoun-free for Wren, and the four use "he/him" warmly and unremarkably in their own dialogue. Vane
keeps "the boy". Marrow's documents keep "it".**

The reasoning that decision protects is `ch4.js:497` and `:524` — Wren reading Marrow's journal out
loud, *"She writes **it**. And then she writes that."*, and her letter to the Envoy, *"Through **it**.
She said through it."* That only detonates if the room has been hearing an ordinary, unremarkable
*"he"* from the people who love him. The narrator's abstention is then the narrator's alone, and
Marrow's *"it"* lands against four friends' *"he"* rather than against a house style that never
committed either way.

**Where it fires, in these two chapters.** The four speak in exactly one place — the Companion Wren
tabs, where `ch0.js:218` has always asked them to say a line out loud in seat order. The **first**
speaker names him; the other three use "he" and do not remark on it.

| seat | the spoken line |
|---|---|
| Reader, 1st | *“Wren’s name is up there twice. I can only read one.”* |
| Listener, 2nd | *“I have never heard **his** heart. Not once.”* |
| Seer, 3rd | *“**His** shadow is going the wrong way. It is going now.”* |
| Binder, 4th | *“**He** has no thread. Not to anyone. Not now.”* |

Four friends in a lit dormitory, in seat order, saying *he* about a boy the school's own documents call
*it*. That is the whole of the change, and it is nine words.

**Everywhere else the abstention holds, and it is now doing work rather than dodging.** The
`ch0_wren` seed — *"Wren comes in talking, and Wren's hands do not stop"* — repeats the name on
purpose, because the hands are about to become the tell and *Wren's hands have stopped* has to be the
same phrase. `ch1_lost`'s *"Wren looks at you — not frightened. Surprised. Wren had assumed you would
manage it."* is unchanged and stays pronoun-free. Vane says *the boy* twice in `ch1_offer`. Nothing in
either Hearth file gender-marks Wren, and nothing in either needs to.

---

# Findings — every item from the three verification reports

**APPLIED** · **APPLIED DIFFERENTLY** (with the reason the suggested fix was not the best one) ·
**REJECTED** (with the argument). Three items are answered as **REPORTED** because the fix is outside
the four files this brief covers; each is in *Reported, not changed* below.

## Blockers

| finding | disposition |
|---|---|
| **`ch1_vote` unchanged — six minutes with no Wren, and four unused authoring surfaces** | **APPLIED.** Five strings: `center: 'Wren'`, both under-commitment coaches, `REASONS.oriel`, `timeoutText`. +10 words, funded by 28 cut from `ch1_dais` and `ch1_vane`. `seats.js` untouched; partition, answer, hints, timer, rule card untouched; `check-hints` re-run. I did **not** use `seats[].sub` (it renders inside the seat disc: one sub singles a seat out on the shared screen, which either leaks or lies), `note` (at its 60-word cap, zero pixels spare), or `lockedText` (it would be the fourth telling of a clue three surfaces already carry). |
| **`ch1_prices` deletes the game's only introduction of "the Convocation"** | **APPLIED.** Back in Sorrel's mouth, as a plain sentence rather than the shipped em-dash appositive: *"We are the Convocation, not her."* The real clutter in that 45-second beat was the second proper noun (the Cold Ember), not the first. |
| **Sorrel states tonight's errand two scenes before Marrow decides on it** | **APPLIED.** *"The Provost **will** send somebody under this school."* A Master predicting his colleague, not reading her mind — and Marrow's *"In the morning I would have sent — no."* keeps its whole charge. |
| **The Reader's Companion page contradicts itself** | **APPLIED DIFFERENTLY.** The reviewer's fix invents a new excuse clause. Restoring the **shipped** one is better and cheaper, because `companion/ch2.js:120` quotes it verbatim — v1's rewrite had silently made a Chapter II callback rhyme with a line that no longer existed. Shipped words back, plus four that carry the shame without contradicting the present tense: *"You have never asked who, and you know why."* |
| **"Shorter than what it replaces" is false at the brief's scope** | **APPLIED.** All four files re-counted with the repo's own tools plus a rendered-text counter for the Companion, calibrated against the shipped pages (it reproduces the shipped four-page total of 203 exactly). The headline says **+62**, names where every added word is, and prices both levers. The honest finding underneath is that **the pass cannot reach zero and keep the four spoken lines** — and those four lines are the game answering an instruction it already gives. |

## Majors

| finding | disposition |
|---|---|
| `ch0_stone` promises inscription *continuing*; ch6 delivers the same sentence read from below | **APPLIED.** *"The cuts run all the way round the foot of the stone, where the flame sits. Nobody alive has read them there."* — ch6's own words, and *unread* rather than *unfinished*. |
| `ch0_stone`'s `cls:'small'` meta line sits on the hinge of the chapter's one inference | **APPLIED.** Moved to the exit; *where the flame sits* and *the Hearth is flickering* are now consecutive paragraphs. |
| `ch0_stone` loses the only line attaching the prophecy to Wren | **APPLIED.** *"Everybody agrees who it is about"* restored, verbatim, 6 words, opens nothing. |
| `ch0_name`'s "Four. I thought it was two." has two readings | **APPLIED.** *"Four **of you**."* Settles it to the smaller, warmer one and concedes nothing about what the oddities mean. |
| `ch0_carve`'s hundred-names line is the narrator asserting what nobody can know | **APPLIED DIFFERENTLY.** I did not take *"None of them are burnt"*: a blue flare that flares once and dies leaves no scorch, so it asks the player to infer from evidence the fiction does not supply. *"Not one of them has ever answered"* is a standing property of the object in the register `ch0_dorm` already established two scenes earlier (*"Nobody has ever got it to light. Everybody has tried."*) — a recall, not new testimony. |
| `ch0_lamp`'s "with the rest of you" destroys the floor plant | **APPLIED.** *"Wren does not touch it. Wren sits down on the floor."* −11 words. |
| `ch1_dais`'s 19-word Provost gloss is redundant twice over | **APPLIED.** Cut. Four of its words move to `ch0_dorm` to cover R3.2 at the name's first use; the other fifteen pay for `ch1_vote`. |
| The hands: seed and payoffs are different behaviours | **APPLIED.** Seed and payoff share the word (*hands do not stop* → *hands have stopped*), the hands become audible in his own mouth one line later, and a second chain (*stand still* → *I practised* → *holding still* → *has not moved in an hour* → *does not fidget once*) runs across both chapters. |
| The premise "each of you sees one thing the other three cannot" was cut and never replaced | **APPLIED.** Restored on Wren, in `ch0_wren`, as his reason for needing them — which also turns the four-line roll-call into a bit he is doing on purpose. |
| The curfew seam | **APPLIED.** The line that created it is cut, which also removes an em-dash carrying a fact, a second establishing detail, and an open question. Nothing has to lift, because nothing was imposed. |
| The Seer's warmth collides with the ring puzzle's **scratch** and with the Reader's name axis | **APPLIED DIFFERENTLY.** Both reviewers proposed keeping the name-scratching and removing the collision word. That still leaves two of four Wren pages on the Reader's own axis (R11.19). The line is replaced outright with position-and-light, which is the Seer's exact register, shares no vocabulary with any other page or with the puzzle, opens nothing, and rhymes forward to the shadow directly below it. |
| Compulsive levity not delivered | **APPLIED.** See *Wren* above: Chapter I goes from 2 comic moments to 6 — `ch1_dais`'s *"I practised"*, `ch1_vane`'s accelerator, both `ch1_vote` coaches, and `ch1_after` on each branch. Four of them are where joking is a bad idea: presented alone to nine Houses, and twice with the table frozen mid-vote, and under guard being taken away. No crack is added and none is moved; the schedule is still five, one clause each, never in the same paragraph as a live joke. |
| `ch1_dais` moved the vote ahead of the writ | **APPLIED.** *"Tonight you look at the child I kept."* `ch1_flicker` is the turn again, and `ch1_start`'s "come to look at the child" is no longer contradicted. |
| `ch1_attune`'s fiction is typeset as a table instruction, and states the clock a third time | **APPLIED.** `cls:'whisper'` dropped, *"You have an hour"* dropped. |
| R5.1's question budget | **APPLIED DIFFERENTLY.** The reviewer's cheapest cut was the Cold gloss. I rejected that half: *"You cannot walk into weather. The Cold is a place"* is the **only** definition of the game's destination anywhere before `ch5.js:348`, so cutting it trades an R5 problem for an R4.1 one. Instead: one counting rule stated, the real number published (**opens 4, closes 0, carries 4**), two questions genuinely closed in Chapter I, two more removed before shipping (the visitors; the Seer's scratched names), and R5.1's closure clause named as a rule the opening chapter structurally cannot satisfy — for the author's signature, not a claimed pass. |
| ch1 measures 1,344 not 1,342; `ch1_lost` 90 not 88 | **APPLIED.** Everything re-run; nothing is quoted that a tool did not print. |
| `ch1_after`'s merged 17-word sentence | **APPLIED.** Two sentences again. |
| `ch1_after`'s Ember speech is duplicated by `ch2.js:182` | **REPORTED.** Out of these four files. The one-line fix is named below. |

## Minors

| finding | disposition |
|---|---|
| The Binder's spoken line has no referent | **APPLIED.** *"He has no thread. Not to anyone. Not now."* |
| "Lucky for me" is a crack pretending to be a joke | **APPLIED.** Cut, and the beat re-ordered so the deflection comes first and the hands end it. |
| The Mum slip has no surface | **APPLIED DIFFERENTLY.** The reviewer suggested moving it last so the scene's silence falls after it. That asks the **narrator's** silence to carry the beat, which is a gap. It now derails the roll-call and *Wren* carries it, by losing his place: *"Where was I."* |
| R2.5: the Mum slip's em-dash pair teaches two facts | **APPLIED.** *"Mum has everybody downstairs. The Provost."* 13 words against 15, no dash. |
| The proper-noun budget for "the Provost" | **APPLIED.** She is the seventh name in a chapter STYLE §3 budgets at six, she is introduced once in her own sentence at first use, and **the pass says so out loud** rather than applying its Thornhallow test to one name and not the other. She is worth the seventh slot: the Mum slip is canon (`DESIGN.md:79`), unbranching it is what makes `ch6.js:691` and `ch8.js:346` fire for every table, and the four words cost nothing new — they are four of the nineteen cut from `ch1_dais`. |
| "that" → "it" in a line STYLE §3 cites as canonical | **APPLIED.** *"Nobody knows what **that** means. Her face does."* — restored verbatim and as its own paragraph, as `docs/STYLE.md:128` quotes it. |
| Three "an hour" readings | **APPLIED.** `ch0_flow` lands as imminence, one word shorter. |
| `ch0_dorm`'s seat whisper: 4 bold spans, 4 commas, 15 words | **APPLIED.** One bold span, one comma, 13 words. |
| Four semicolons on `companion/ch0.js` Sight pages | **APPLIED.** Four full stops, zero word cost. |
| The Listener's page runs anomaly-before-warmth | **APPLIED.** Figure moved below the warmth line. |
| The STYLE amendment is two rule changes presented as one, and the budget change is not needed | **APPLIED.** Rewritten as one sentence covering "ends with" and the paragraph structure. The **word-budget change is withdrawn**: all four pages measure inside R11.3's 40–75 as it stands. |
| `ch0_stone`'s button is the caption of the scene it leads to | **APPLIED.** `button: 'Up the tower'`. The declared `clickText` substitution just changes target. |
| `ch1_start`'s rationale says two scenes; it is four | **APPLIED.** Claim corrected in the text above. The cut stands: nothing in between asks a player to act on their role, and `ch1.json`'s pin rides on the engine's `roles:` line. |
| `ch0_dare` deleted the "stand still" plant | **APPLIED.** One word back, and it is now the head of a five-call chain. |
| `ch1_prices`' "neither" is free at the moment of choosing | **APPLIED.** Same eleven words, now a price: *"Two thin mouths. Neither of them will spend anything on you again."* |
| The window anecdote is told twice in ninety seconds | **APPLIED DIFFERENTLY.** The reviewer proposed dropping the framing sentence. I dropped it **and** re-ordered, because the sentence also had to carry the Provost's R3.2 introduction: *"The Provost runs this school. One of you broke her window that year."* The second telling is the debt, which is the part that matters, and it is nine words in his own mouth. |
| The bird makes ch6's wrong Reader answer more tempting | **REJECTED**, and here is the argument. The lie has to be transparently bad or the beat does not work: the payload is **Marrow chose not to know**, and a person who believes a plausible excuse has not chosen anything. *The wind* is plausible, so believing it is not a decision; *a bird* is not, so it is. Against that: a wren is a small bird whether or not the Prologue mentions one, so the Prologue adds a broken window, not an etymology — and the disarm is already on the Reader's own phone, which is the role that answers in ch6: *"Once in letters you have never seen before"* says in the Prologue that the name's meaning is **not** the English word. The lure the Asking has to survive is the name, and it is the same lure with or without this scene. Flagged in *Reported* so ch6 can decide for itself. |
| `ch1_won`: three players in four are never seen by Wren by name | **REJECTED**, and here is the argument. The suggested fix is a conditional clause naming "whichever role actually crossed the floor" — but `CH1_APPROACHED` stores **seat ids, not people**, and the engine has no record of which player did anything. The one thing the game does know is who drove the widget, and `ch1_attune`'s own `roles:` line says that is the Binder, which is exactly what the shipped line says. The scene also already sees a second player in its first sentence: *"a breath so small that only the Listener catches it."* Making it four would put four role names in a five-paragraph scene, which is the litany this pass cut five of. Left as the Chapter III job (the First Asking) that v1 named, and re-flagged in *Still weakest*. |
| `docs/DESIGN.md` §5 is made stale by the night compression | **REPORTED.** Third required out-of-file edit, now listed. |
| The two ledger tables disagree about `ch0_stone` | **APPLIED.** One ledger, and the counting rule is stated at the top of it. |

---

# Where the readings disagreed, and what I decided

| point | decision | why, in one line |
|---|---|---|
| `ch1_vote` — one line in the previous scene, or strings inside the widget | **inside the widget** | The chapter's own diagnosis is that the boy is not in the room for six minutes; a line in the scene before is not six minutes. |
| the `ch1_vote` coaches — narrated or spoken | **one of each** | The zero-ask state is a picture (*counting the rafters*); the one-ask state is the compulsion, and it has to be in his voice to be compulsive. |
| the bell line — take it or leave `timeoutText` alone | **take it** | Nine words that say what the hour cost, inside the same two lines of status the shipped string already occupied at both viewports. |
| `ch1_dais` — cut the gloss, or shrink it to *"That is the Provost."* | **cut it** | Four of its words are needed in `ch0_dorm`, where the name actually first appears; the label and her own first sentence do the rest. |
| `ch1_dais` — keep *"which for Wren is enormous"* | **spend it** | STYLE §12.5 licenses one aside a chapter, and the boy now says the same thing funnier in his own mouth. The licence is banked. |
| `ch0_carve` — Wren's mouth, or observational narration | **observational** | Sourcing it to Wren needs him to have checked, and *"I checked"* is two scenes later; a standing property of the object needs no witness. |
| `ch0_wren` — where to break the roll-call | **twice: early by the hands, late by the slip** | An early break stops the ear locking; the late one is the Mum slip, which fixes a second finding in the same move. |
| the Seer's warmth — repair v1's line or replace it | **replace** | Repairing it leaves two of four Wren pages on the Reader's name axis, which is the R11.19 design, not a word choice. |
| the Prologue's question count | **publish it, do not cut the Cold** | The Cold's only definition before Chapter V is in that line; trading R5 for R4.1 is not a fix. |
| the four-file word count | **publish the real number** | A measurement the author cannot check is worth less than a number they can argue with. |

---

# Reported, not changed — outside the four files

1. **Three test-script edits are required by this pass** and no others: in `tools/scripts/ch0.json`,
   `{"expect": "Nobody alive has read the cuts"}` → `{"expect": "the foot of the stone"}` and
   `{"clickText": "The night before"}` → `{"clickText": "Up the tower"}`; in `full-true.json`, the same
   `clickText`. Verified with exactly those substitutions and no others. I swept every deleted phrase
   against all sixty-plus scripts in `tools/scripts/`; no other pin exists.
2. **`docs/DESIGN.md` §5 line 97** says *"Cut to the dormitory, the night before the Vigil."* The night
   compression contradicts it. The fix is one phrase, and it belongs in the same commit. v1 reported
   two out-of-file consequences of the compression and missed this one.
3. **`ch2.js:182` duplicates `ch1_after`'s Ember definition** sixty seconds later, across a chapter
   boundary, on every branch: *"Under this school the Founders left the Cold Ember. If the Hearth goes
   out, the Ember lights it again. Bring it up."* `ch1_after` is now the definition and lands first and
   clean. `ch2_start` should reduce to **"Bring it up."**
4. **`node tools/flag-map.js --assert` is RED before this work starts and after it** — *"NEW: DECISION
   now crosses a chapter boundary and is not in tools/flag-contract.js."* `DECISION` is written by ch7
   and read by ch7 and ch8. Nothing to do with ch0/ch1; the one-line fix belongs in
   `tools/flag-contract.js`, in whichever commit created `DECISION`. Flagged so nobody attributes it to
   this pass. All ch0/ch1 flags are correctly declared, and `GROUP_NAME` — which `ch1_after` now reads —
   is already listed as cross-chapter.
5. **`ch6.js` and the bird.** `ch6_ask_bookmoth`'s wrong Reader option is *"A small bird. A brave one."*
   The Prologue's window anecdote is a deliberate rhyme, not an accident, and the argument for keeping
   it is in *Findings*. If ch6 disagrees, the cheapest disarm is in ch6, not here.
6. **`ch6.js:329` contradicts the Seer's vintage.** Her page says *"You decided months ago it was a
   trick of the light"*; Wren says *"Six years, and nobody said it"* about the same shadow.
   Pre-existing. The vintage is quoted near-verbatim by four later companion files, so the fix belongs
   in `ch6.js`.
7. **`label: h.house` on the vote board.** `ch1.js:73` prints Harrowden, Ossery, Dunmere, Fellwood,
   Goldmarch, Redmoor, Sable and Wyeburn on the shared screen at 11px, while every phone, every hint
   rung, all nine `REASONS` lines and the brief's own first instruction say *"Numbers, not names."*
   R10.5 states the opposite as settled fact. The fix is `label: ''` (keeping `'the Chair'` for seat 9)
   — but **four test scripts click seats by House name**, so it is a coordinated change across files
   this brief does not cover. It is the single largest clutter reduction still available in Chapter I,
   it would also shrink the seat discs and stop the commit receipt scrolling (below), and it is the
   author's call.
8. **Two pre-existing `.pz-status` overflows inside `ch1_vote`, which `scan-fit` cannot see** because it
   measures the board on build and not after a commit: the bell state is 17px over at 1280×720 and 2px
   at 1152×648, and the winning commit receipt is 28px / 36px over, so *"Five of nine. Wren stays."* is
   partly below the fold for about 1.2 s before `solvedText` reprints it. **This pass does not make
   either worse** — the new `timeoutText` is the same two lines as the shipped one and the new
   `REASONS.oriel` measured pixel-identical. It is an argument for item 7, and for a `scan-fit`
   feature.
9. **`speaker: 'Vane'` vs `'Lord Vane'`.** R3.5 requires the full introduced form, and ch7 uses
   `'Lord Vane'`. Fixing it costs 8 words in a chapter I am trying to shorten. Reported, not changed.
10. **The `if:` guards on the two prices.** Dead code. `ch1_prices` is reachable only from `ch1_won`,
    and `{sorrel, oriel}` is the unique winning pair over all 28, so both predicates are always true.
    Harmless, and removing them would change nothing a player sees.
11. **Two semicolons survive on the Reader's Prologue Sight page**, inside the lexicon table cells
    (*what remains; to keep; to close*). Gloss separators inside a two-column lookup, shipped, and
    arguably not prose. Reported rather than changed, because changing a lexicon row changes the
    Reader's puzzle surface.
12. **`ch1_after`'s winning Wren line interpolates `GROUP_NAME`**, so a table that types a very long
    custom name can push that speech line past R6.3's 30 words. It is 24 with the default. This is the
    same exposure the shipped `ch0_name` `after:` already has, and capping the `ask:` prompt is an
    engine change. Reported, not changed.
13. **`Store.note(...)`** writes to `Store.state.log`, which nothing in the repository renders. ch0's
    and ch1's three notes are kept for the R10.20 commit-once discipline, and go nowhere.

---

# Measurements

Every number below was produced by running the tools against a full working copy of the repo with
every change above applied (`scratchpad/rewrite/v2/`), and against the shipped build for every
"unchanged" claim.

```
node tools/prose-count.js ch0        1100 words   (shipped 1101)
node tools/prose-count.js ch1        1332 words   (shipped 1349)   — honest 1335, see below
node tools/check-content.js          OK: 135 scenes, 9 chapters
node tools/check-hints.js            ok ch0_lamp  ring   1 state
                                     ok ch1_vote  seats  4 states
                                     14 ladders, 13 checked, 0 FAILING,
                                     0 accepted by a predicate that cannot fail
node tools/flag-map.js --assert      1 break: DECISION (ch7/ch8) — RED before this work, unchanged

node tools/scan-fit.js ch0 ch1 --w 1280 --h 720     (ship gate)
    shrunk to fit: NONE          (shipped: ch0_stone 21px -> 20px)
    overflowing:   none

node tools/scan-fit.js ch0 ch1 --w 1152 --h 648     (stretch check)
    shrunk to fit: ch1_after 21px -> 20px   (shipped: ch0_stone 21px -> 18px)
    overflowing:   none

node tools/play.js — every script that touches ch0 or ch1:
    ch0 · ch0-fit · own-name · ch0-companion · listener-book · reveal ·
    ch1 · ch1-lost · ch1-stall · ch1-companion · map-check · menu-words
    ALL PASS, with the three declared script substitutions and no others

node tools/play.js tools/scripts/full-true.json
    PASS — finishes at ch8_end with ENDING 0 · CLUES 4 · TRUTHS 4 ·
    BELLS_CRACKED 0 · WREN_SHOWN true · BINDING_FAILS 0 · hints 0
```

`full-true` passing matters more than the rest: it is the nine-chapter playthrough, so a two-chapter
rewrite is verified not to have broken anything downstream — every flag it carries, every cast bit,
the four widget-overflow assertions it makes along the way, and the Epilogue's closing claim.

**The ship gate is clean for the first time.** The shipped build shrinks `ch0_stone` on a 720p TV; this
is the first version of these two chapters that renders at full size there.

### The four-file word count, which is the number the brief asks for

| | before | after | Δ |
|---|---|---|---|
| Prologue, Hearth (`ch0.js`) | 1,101 | **1,100** | −1 |
| Chapter I, Hearth (`ch1.js`) | 1,349 | **1,335** | −14 |
| **the two shared-screen chapters** | **2,450** | **2,435** | **−15** |
| Companion Prologue — four Wren tabs | 203 | **279** | **+76** |
| Companion Chapter I — Seat 7 murmur | 5 | 6 | **+1** |
| **all four files** | | | **+62** |

**Why ch1 is 1,335 and the tool says 1,332.** `prose-count.js`'s `PROSE_KEYS` does not include
`center`, does not scan a `const` assignment (`STALL`), and does not walk the `REASONS` map. A room
reads all three. The uncounted deltas are `center` −1, `STALL` +1, `REASONS.oriel` +3 = **+3**, so the
honest figure is 1,335 and that is the one quoted. v1 quoted 1,342 for a build that measured 1,344 and
did not mention the three uncounted strings at all.

**Where the Prologue's one-word margin comes from, and why it is exactly one.** R1.5's floor of 1,100
was measured *from ch0 itself*, which shipped at 1,101 — so "inside the band" and "shorter than what it
replaces" leave the Prologue a **one-word window**, and this lands in it. The chapter is not
over-full; it is under-populated, and what it is under-populated with is the title character, who does
not appear until line 144. The work was funded by roughly 190 words of verified duplication — four
Companion pages restated in Wren's mouth thirty seconds early, three tellings of the lamp's
un-lightability, a thirty-word sentence explaining to the players what they just did, a thirty-word
recap of the cold open, and a gloss on the best line in the game — and spent on the boy.

### Per scene, in the tool's own totals

**Prologue.** Grew: `ch0_wren` 64→116, `ch0_dorm` 87→100, `ch0_name` 68→93. Shrank:
`ch0_carve` 108→66, `ch0_lamp` 264→247, `ch0_stone` 140→120, `ch0_flow` 84→75, `ch0_dare` 80→76,
`ch0_practice` 29→27. Unchanged: `ch0_start` 66, `ch0_attune` 40, `ch0_keys` 37.

**Chapter I.** Grew: `ch1_offer` 166→172, `ch1_prices` 161→167, `ch1_after` 153→158 (branch sum),
`ch1_attune` 27→34, `ch1_vote` 208→215 (the tool's view; +10 honest), `ch1_vane` 79→81. Shrank:
`ch1_dais` 88→59, `ch1_start` 94→82, `ch1_lost` 96→90, `ch1_won` 86→83. Unchanged: `ch1_flicker` 100,
`ch1_flow` 23.

`ch1_after`'s worst single branch (losing) is **6 paragraphs and 122 words**, against R1.3's cap of 6 and 150; the winning branch is 5 paragraphs and 110.
`ch0_wren` is 6 paragraphs and 114 words. Nothing is over.

### Sentences, measured over every player-visible string in both Hearth files

| | ch0 | ch1 |
|---|---|---|
| semicolons | **0** | **0** |
| longest sentence | **20** (the prophecy, unchanged) | **26** (hint rung 1 inside the byte-identical `ch1_vote`) |
| longest sentence *this pass writes* | 18 | 17 |
| 90th percentile (cap 15) | **12** | **11** |
| median | 5 | 5 |
| bold spans | **5** (shipped 8) | 13 (unchanged) |
| italic spans (cap 10) | 1 (unchanged) | 3 (shipped 4) |

**ch0 no longer needs R2.2's single licensed 30-word exception at all**, so the style guide gets it back
for a chapter that earns it — the 30-word sentence was the one `ch0_lamp` cuts. The `ch0_dorm` seat
whisper was the only R7.4 breach in either proposed chapter and the only Prologue narration sentence
with more than two commas; both are fixed.

### Companion, measured the way STYLE §11.2 defines it

All rendered text, headings and list items included; raw `svg` figure internals and bare figure labels
excluded, which is the convention that reproduces the shipped pages exactly.

| Wren page | shipped | after | R11.3 (40–75) |
|---|---|---|---|
| Reader | 51 | **74** | ✓ |
| Listener | 37 | **59** | ✓ |
| Seer | 48 | **73** | ✓ |
| Binder | 67 | **73** | ✓ |
| total | 203 | **279** | |

v1's Binder page measured **96** against the same cap while reporting 73, because it did not count the
three list items inside its own figure. All four now fit the rule as it stands, which is why the
word-budget half of the STYLE amendment is withdrawn.

### Constraints

No scene branch exceeds R1.3's 150 words or 6 paragraphs. No puzzle brief exceeds R1.4's 65 words or 6
lines (`ch0_lamp` 48, `ch1_vote` 40, both unchanged). Zero semicolons in player-visible Hearth prose,
and four removed from the Companion. No speech line over 30 words. No scene has more than two speaking
characters or two speaker labels; `ch0_name` and `ch0-fit.json`'s one-speaker-label assertion hold
before and after the choice. Every flag, scene id, `choice:` key, `set:` key, `puzzleId` and `next:`
target keeps its name and meaning; `{3:'ASH', 4:'EMBER'}`, `accept: (v) => v[0] === 'WREN'`, `ASKS = 2`,
`tally()`, `seatCfg()`, `PLEDGED/DEAF/BLOCKED/BOUGHT/FOLLOWS` and all six hint rungs are
byte-identical. No fact moved between phones, so both partitions and both drop-a-role tables are
unchanged, and `{1,7}` is still the unique winning pair.

---

# The two switches, priced

The brief says a rewrite longer than what it replaces has failed. This one is +62. There are exactly
two levers, and both were measured rather than estimated.

**Switch A — cut the four warmth openers.** *"Wren writes the smudged ones back in neater"* (Reader),
*"You always know when Wren is coming…"* (Listener), *"Wren always takes the dark end of the room…"*
(Seer), *"Wren is why half this room speaks to the other half"* (Binder). Measured: the four Wren tabs
go 279 → **225**, so **the four files land at +8** — parity, not negative. The pages become 66 · 41 ·
53 · 65, all still inside R11.3.

What it costs: the four pages go back to being four forensic readings of a boy's body, and the
anomalies land as data rather than as a betrayal of something loved. That is the single change in this
pass that makes the Prologue's climax about a friend.

**Switch B — cut the four spoken lines as well.** The four tabs go to **186**, and the four files land
at **−31**. It is the only arithmetic that reaches negative, and I do not recommend it: `ch0.js:218`
instructs four players to say *"one line each, out loud, in seat order"* at the most important beat in
the chapter, and after Switch B nothing in the game answers that instruction — four people improvise a
paraphrase of a fifty-word paragraph, cold, in seat order, exactly as they do today. It also puts the
Listener's page at **33 words, under R11.3's floor of 40**.

**So the honest statement is this.** The two shared-screen chapters — the ones the ten and thirteen
minutes are actually made of — are **15 words shorter**, and the ship gate is clean for the first
time. The four phone pages are 76 words longer, and 39 of those 76 are the game answering an
instruction it has been giving and not answering since it shipped. **My recommendation is to keep both
and publish +62.** If the author wants the number down, Switch A is the one to take, it lands at +8,
and it is one deletion per page.

---

# What I did not do

**The four nicknames (Bookmoth, Hush, Owl, Knot).** The archaeology is real and worth knowing:
`ch6`'s Second Asking numbers its scenes `ch6_ask_bookmoth / _hush / _owl / _knot`, so those are the
nicknames `DESIGN.md` §3 promised (*"Wren gives everyone a nickname in the dormitory; the Hearth uses
them all night"*) and `lore.js:12-13` collapsed into the role names. Rejected. Four new names for four
people at minute four, for a payoff five chapters away, in a game whose own R7.5/R10.5/R8.1 forbid
those names from every surface the table coordinates on, is the definition of the clutter the author
complained about — and *Knot* collides head-on with Ch6's climactic correct answer about Wren's own
thread (*"None. Not unbound. The knot itself."*). Worse, two of the four nickname lines would displace
`companion/ch8.js`'s goodbye-letter openers, so two players' last page of the night would stop being a
callback. **Recommendation: leave them out of the Prologue, and if they are ever wanted, give them to
Wren in Chapter III's laundry, where `ch6` actually spends them.**

**`label: ''` on the vote board.** See *Reported* item 7. It is the largest clutter reduction still
available in Chapter I and it is a coordinated change across four test scripts.

**The pronoun, beyond the standing decision.** The decision is applied exactly as given. The narration
is pronoun-free in both Hearth files, and the only lines that change are the four spoken ones on the
phones. Nothing here presumes a further pass over ch2–ch8.

**The Reader's Chapter I Wren page.** *"And when the fire bowed, every Master watched the fire. You
watched the Provost. She was watching Wren."* is a verbatim duplicate of the Hearth's *"Every face but
one"* — a third telling of the game's best-shown clue, on the weakest of the eight Wren pages. Cutting
it would leave that page at 33 words, under R11.3's floor of 40, so the fix is a replacement rather
than a deletion, and that is a page this brief does not otherwise touch. **Flagged, again, as the next
thing to fix.**

---

# Still weakest — the beats that are still merely functional after v2

The author's standard is that a beat which is merely competent is a defect. These are the ones that
still are, ranked by how much they cost.

1. **`ch1_vote` is now inhabited, not fixed.** The boy is on the board for six minutes, the coaches are
   his, and the Master who keeps him turns out to be studying him. None of that makes the **arithmetic
   cost anything.** The chapter's declared question is *what are you willing to owe to keep Wren
   tonight*, and inside its centrepiece the asks are free: you may spend two, you lose nothing by
   spending them wrong except the vote, and the only thing the table actually owes arrives after the
   vote is over. A child's custody resolved by arithmetic is the chapter's one profound idea, and the
   mechanic still performs it rather than interrogating it. Fixing that is a puzzle-design change —
   an ask that costs something the table can feel — and it is outside a prose pass. **It is the largest
   unclaimed improvement in either chapter.**

2. **The winning branch still has no cost visible in the room at the moment of winning.** Five to four
   means four adults have just voted to give a child away and are still sitting under their banners.
   `ch1_won` gives the table two Masters at their elbows and a debt collection thirty seconds later.
   The losing branch has Marrow's low sentence and *"does not fidget once"*; the winning branch is
   still the weaker piece of writing, which is the wrong way round for the modal path.

3. **No beat in either chapter makes the table *conclude* anything about Wren from evidence it holds.**
   The Prologue's climax is four people reading four facts aloud and Wren declining to explain them.
   The one real inference in the pass is the stone and the flame, and it is three sentences long. The
   two-question frame is right and the beats still mostly *deliver* the mystery rather than letting the
   table derive it.

4. **Chapter I's rapport is still one-directional.** They act, he reacts. `ch0_wren`'s debt is the only
   thing he ever does for them, and it is in the Prologue. And **three players in four are still never
   addressed by Wren by name after minute four** — `ch1_won` sees the Binder, its first sentence sees
   the Listener, and the Reader and the Seer are seen only on their own phones. Properly fixing it is a
   Chapter III job (the First Asking), not a Chapter I one.

5. **`ch0_practice` is still a widget tutorial with a promise attached.** The reaction widget is used
   in exactly two chapters and Ch6 re-teaches itself, so the scene's only story job is the four-hands
   chord at the end of its event list. The honest alternative is to cut the promise entirely — twelve
   words and out — and accept that ch3's bells announce themselves. I kept it because `DESIGN.md` §5
   specifies the named version and because it is the sentence that repairs *"later tonight"* for free,
   but it is a loose thread the player is asked to hold for twenty-five minutes for no return.

6. **`ch0_attune` and `ch1_attune` are procedure.** `ch1_attune` now carries one fictional line in
   fiction's typeface, and that is as much as a password prompt can hold.

7. **The lintel.** A word is cut into stone over the Masters' door, with both the Reader and the Seer
   standing under it, and the chapter still says nothing about it. Cutting `ch1_dais`'s gloss made room
   — and I spent that room on `ch1_vote`, which needed it more.

8. **`ch0_flow` still spends a full paragraph defining "a Sighting"** in a chapter's closing beat,
   which is a glossary entry where a hand-off should be. Four chapters spend the word, so it has to be
   defined somewhere, and there is nowhere better.

9. **`ch0_carve`'s puzzle `text` is unexamined.** *"A hundred names already in the brass. A hundred
   people who tried a match."* is fine and does its job. The `wrongText` is now the best thing in the
   beat, which means the brief above it is the weakest.

10. **`ch1_prices`' "neither" is weighable but not yet expensive.** Its visible price is now two
    Masters who will not spend anything on you again. Its real price is a Finale shield five chapters
    away, and the player cannot know that at the moment of choosing. That is probably correct design
    and it is still a thin third option under a 45-second clock.

11. **The Binder's Chapter I thread colour.** *"you are not sure what colour it was"* is unbounded on
    the page, so it reads as *saw something, don't know what* rather than as the three-way question the
    shared Book's palette makes it (red = an oath, gold = Crown coin, grey = grief for somebody already
    gone — and each answer is a different Provost). Three words would convert it — *"red, gold or grey,
    and you are not sure which"* — but the shipped page is the origin of a typed answer three chapters
    later (`ch4.js:577` requires GREY) and I would not touch that seed in a pass whose brief is the
    Prologue's friendship. **Cheapest remaining upgrade in either chapter, and it is not mine.**

12. **The Prologue has no margin.** It lands on R1.5's floor of 1,100 exactly. Every later pass on this
    chapter has a one-word window, and that is a structural fact about the rule rather than about the
    prose: R1.5's floor was measured from this chapter, at 1,101. Worth the author deciding whether the
    floor should be 1,050.

---

# Where the working copy is

Everything above is pasted and measured in `scratchpad/rewrite/v2/` — a full working copy of the repo
with all four files changed and the three declared script substitutions applied. Nothing under
`/home/user/puzzle-game` has been edited. A unified diff of exactly the six files that change is at
`scratchpad/rewrite/v2.diff`.
