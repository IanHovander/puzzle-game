# PLAYER MODEL — Act I: the Prologue and Chapter I (T0 → T3)

> ## ⚠ TOTAL SPOILERS
> Contains every reveal in the game, including the Finale's and all five endings. Written for the
> author. Do not show it to a player or a host. It reads the shipped source; where it disagrees with
> `docs/DESIGN.md`, the source wins.

**What this document is.** The reader's head, beat by beat, across the Prologue and Chapter I — the
part the author calls "the most important part of the game besides having engaging puzzles." Four real
people are in a room with one laptop and four phones. This models both layers: what the *fiction's
audience* believes, and what the *people at the table* are doing with their hands and mouths.

**What it is not.** Not ground truth (`CANON.md`) and not character belief (`EPISTEMICS.md`). Where a
row says "reality," it is quoting CANON, not arguing with it.

**Span.** T0 (before play) · T1 (ch0 cold open + prophecy stone) · T2 (ch0 lamp lit → the four speak) ·
T3 (all of ch1). 23 beats, by real scene id.

**Row schema.** Every beat carries eight fields:

| field | what it is |
|---|---|
| **KNOWS** | cumulative, plainly stated, player-facing only |
| **LIVE** | every theory a thoughtful table could be holding, with the evidence that licenses it |
| **WANT LIVE** | which of those we keep, and what makes it a pleasure to hold |
| **WANT KILLED** | which we rule out, and the exact evidence that rules it out — or the line that would, marked **[PROPOSED]** |
| **REALITY** | one line: where the truth sits relative to what they believe |
| **CRUMBS** | *planted* (already in the shipped game) and *cheap* (could be added for almost nothing) |
| **TABLE** | what four people are feeling and saying out loud |
| **RISK** | confusion, boredom, overload — named |

**Two standing facts about this table.** (1) The partition is absolute — "Say what you see. Never show
your phone." (`lore.js:74`), reprinted above every SPEAK page (`companion/ch1.js:87`). Every hypothesis
below is really *four* hypotheses until somebody talks. (2) Nobody is taking notes; the Book tab is
promised as the memory (`ch0.js:183`). So "what the player knows" means "what four people can
reconstruct by asking each other," which is strictly less than the union of four phones.

---

## 0. THE ROOM, BEFORE THE FICTION

Four adults (or teenagers) sit facing one screen, left to right: Reader, Listener, Seer, Binder. One
keyboard on the table, four assigned keys. Four phones, four different pages. The evening will run
about four hours (`js/main.js:21`). Somebody is hosting; somebody is the one who read the README;
somebody is already mildly worried about whether their phone battery will last.

The single most important structural fact about Act I: **it must convert four people who are managing
a QR code into four people who will spend three more hours protecting a fourteen-year-old.** Everything
below is measured against that.

---

# T0 — BEFORE PLAY

## Beat 0 — the title screen (`index.html:18-24`; `js/main.js:20-58`; `companion-content.js:3`)

**KNOWS.**
- The game is called *What the Fire Keeps*; the tagline is **"A night in four hands."** (`index.html:19-20`)
- It is cooperative, for exactly four, in one sitting of about four hours. One screen is the **Hearth**;
  each phone is a **Companion** that "shows what only you can see." "Nothing tonight can be solved
  alone." (`js/main.js:21`)
- At one announced moment, **"the bells of Thornhallow will ring"** and all four will need quick hands
  on the keyboard. (`js/main.js:22`)
- The four seats, each with a gift and a question word: Reader / **Glyph-Sight** / *WHAT the glyphs
  say*; Listener / **Ear-Sight** / *WHEN — the order of things*; Seer / **Under-Sight** / *WHERE —
  marks, doors, what is turned*; Binder / **Thread-Sight** / *WHETHER — the Laws, and who is bound to
  whom*. (`js/main.js:26-36`; `lore.js:5-10`)
- The button says **"Light the Hearth."** (`js/main.js:50`)
- On the phone, before any chapter: "Sit left to right facing the Hearth… What appears here is for
  your eyes only — share it by talking. *Say what you see. Never show your phone.*" (`companion-content.js:3`)

**LIVE.**
1. *This is a four-person escape room with a story attached.* — Evidence: four keys, four gifts, a QR
   code, a hint button in the top bar.
2. *The fire is the thing at stake; "keeps" is a pun on custody and on preservation.* — Evidence: the
   title, "Light the Hearth," a flame meter already visible in the bar (`index.html:31`).
3. *The four gifts are a pure mechanical partition — WHAT/WHEN/WHERE/WHETHER — and will not mean
   anything in the fiction.* — Evidence: they are presented as UI on a setup screen.
4. *"Thornhallow" is the place; the bells matter.* — Evidence: it is the only proper noun on the first
   screen, and it is attached to a warning.

**WANT LIVE.** (2) and (4). (2) is the whole game in a title and the player should be allowed to feel
clever about it later. (4) is free advance dread: the game has promised, in a safety notice, that
something will one day require all four pairs of hands at once — and the thing it is really promising
is Law 0. A safety warning doubling as a prophecy is the cheapest foreshadowing in the build.

**WANT KILLED.** (3). It is killed nine beats later, at `ch0_carve`'s solvedText, when Wren addresses
each gift as a fact about a *person* rather than a role ("you read everything and eat nothing,"
`ch0.js:146`), and killed properly at T2 when each gift turns out to have been privately hurting its
owner for years (`companion/ch0.js:99`, `:112`, `:124`, `:145`). No fix needed; the sequencing is right.

**REALITY.** Every word on this screen is literally true and none of it is understood: the fire *is*
four people, four hands *is* the law that closes the wound, and the bells of Thornhallow *are* the
Founders' own pattern rung blind.

**CRUMBS — planted.** "A night in four hands" (`index.html:20`) is Law 0 in five words, printed before
the game starts. The flame bar is a health bar from the first frame (`index.html:31`) and is never
explained. "Nothing tonight can be solved alone" is the thesis.

**CRUMBS — cheap. [PROPOSED]**
- The role card already prints WHAT / WHEN / WHERE / WHETHER. Add nothing; but note for the author that
  these four words are the cleanest statement of the project and appear nowhere else the table can see
  (the source says so itself, `js/main.js:29-32`). A single Hearth line in ch0 that names them —
  "Four questions: what, when, where, whether" — would make the partition feel designed rather than
  arbitrary from minute one, and it rhymes with `ch0.js:207`'s hint, which already says it.

**TABLE.** Admin energy. Somebody is reading the fair warning aloud in a joke-ominous voice. Somebody
is asking whether they can swap seats. Somebody's phone will not scan the QR. Nobody is invested yet.
The only line that lands is "the bells of Thornhallow will ring."

**RISK.** This is the coldest five to ten minutes of the evening and it is at the front. Nothing here
is fiction. The seat-order instruction is given here *and again* at `ch0.js:80` — the duplication reads
as the game not trusting the room. **Flagged as the span's first sag.**

> **Correction to CANON §3.1.** CANON states Thornhallow is "never named to the player before ch6's
> title card," citing a grep over ch0–ch5 *prose*. The name is on the **first screen of the game**
> (`js/main.js:22`). The grep is right about prose and wrong about the player. Amend the row to: *never
> named in chapter prose before ch6; named once, on the title screen, in the bells warning.*

---

# T1 — THE COLD OPEN AND THE PROPHECY STONE

## Beat 1 — `ch0_start` · "Four hundred years of fire" (`ch0.js:46-57`)

Six centred lines, typed slowly (`speed: 13`), over a great orange fire in a stone hall.

**KNOWS (new).**
- Four hundred years ago, **four people closed a wound in the world**. (`:49`)
- **They left a fire on top of it, to hold it shut.** (`:50`)
- The fire is the Hearth. **It has never once gone out** — except one night, fourteen years ago. (`:51-52`)
- **When it came back, there was a baby asleep on the stones.** (`:53`)
- **That child is Wren. Wren is fourteen. So are you.** (`:54`)

**LIVE.**
1. **The mundane foundling.** *Somebody abandoned a baby in a hall during a blackout; the school
   mythologised it.* — Evidence: the narration says "there was a baby asleep on the stones," not "in the
   fire." A blackout and a doorstep baby is the ordinary explanation of both facts.
2. **The fire made the child.** *The Hearth went out and what came back was a fire plus a person.* —
   Evidence: the sequence is stated as cause and effect in two consecutive sentences; the chapter is
   titled *The Night the Hearth Guttered*; the baby is exactly as old as the outage.
3. **The prophecy child.** *The four founders' fire produced "one born of four."* — Evidence: four
   people, one child, one fire. (The phrase arrives next beat and will retro-fit onto this.)
4. **A trade.** *The wound took something and gave something back; the child is what the Cold paid.* —
   Evidence: "a wound," "closed," "it came back" — the grammar of an exchange.
5. **The fire is fuelled by something and is running out.** — Evidence: "it has never once gone out" is
   a statement about a thing that *can*; the flame bar in the top bar reads 1.0 and is visibly a meter.

**WANT LIVE.** (2), (3), (4) — and hold all three at once. This is the strongest hypothesis triangle in
the game, because each one is *partly* right and the true answer is a specific fusion: the fire is four
people, it had nearly spent itself, and what it left on the stones is the thing it was holding down,
wearing a person. A table holding (2)+(4) simultaneously is one sentence from Wren's identity and does
not know it. (3) is delicious in a different way: it is the *institution's* answer, and the game will
spend eight chapters proving that inheriting an institution's answer is what went wrong in Year 212.

**WANT KILLED.** (1), the mundane foundling — because it is the only hypothesis on the list that leads
*away* from every other mystery, and a table that settles on it in beat 1 will spend the Prologue
bored. It is killed decisively at T2 by four independent impossibilities (no heartbeat, no thread,
shadow toward the fire, a name in an alphabet nobody teaches — `companion/ch0.js:99`, `:112`, `:124`,
`:143`). **Nine beats is a long time to hold a dead read**, but the payoff structure is correct: the
game wants the mundane read *alive* so that T2 can execute it in public, four ways at once. No change.

(5) needs no killing — it is true and is the game's answer — but it needs *sharpening*; see crumbs.

**REALITY.** The first two sentences of the game are the ch6 reveal, stated plainly and unrecognisably:
four people went down, and what came back up is the fire. "They left a fire on top of it" is not a
description of an act; it is a description of a corpse. (`ch6.js:839`: "The fire is only what they left
behind.")

**CRUMBS — planted.**
- `ch0.js:49-50` is the single best breadcrumb in the game. Every word of the T8 reveal is here and
  nothing marks it.
- "It has never once gone out" — establishes mortality by denying it, then retracts in the next line.
  (The retraction is `CANON §13.24`'s contradiction; read as rhetoric it works and the table hears it
  as rhetoric.)
- The art: the Hearth and the Cold are **the same function in two palettes** (`scenes-ch0.js:7-8`). The
  player is looking at the Cold right now, orange.

**CRUMBS — cheap. [PROPOSED]**
- **B1 — the fire is not fuelled.** One clause: *"Nobody feeds it. Nobody ever has."* This converts the
  Hearth's mortality from mood into mechanism and makes T8's "four people's worth of fire, and four
  hundred years to spend it in" (`ch6.js:850`) a payoff rather than a revelation. Highest value/cost
  ratio in the span.
- **B2 — the four are gone.** Extend `:50`: *"They left a fire on top of it, to hold it shut. Four
  hundred years later the fire is still there. They are not."* Says nothing untrue; plants "where did
  the four go" as a question the player can hold from line two.
- **B3 — name the guttering as unexplained, with an owner.** Add, as `cls: 'small'`: *"Nobody has ever
  said why it went out."* Converts the span's largest silent withholding (see §1, W1) into an
  acknowledged open question, which is the difference between a gap and a hook.

**TABLE.** The room goes quiet. Six slow centred lines is exactly the right dosage. Someone reads them
aloud without being asked. "So are you" gets a small reaction — the table has just been told its own
age, which is the first time the game treats them as characters. Expect one immediate out-loud
hypothesis, almost always "wait — the baby *came out of the fire*?"

**RISK.** Low. If anything the risk is the opposite: the beat is so efficient that a table may not
realise it has been handed the ending, and will not revisit it. This is intended.

---

## Beat 2 — `ch0_stone` · the prophecy (`ch0.js:58-71`; art `scenes-ch0.js:74-81`)

**KNOWS (new).**
- Above the fire, cut into stone, **one sentence in a language nobody has spoken for four hundred
  years**. (`:61`)
- **"Nobody alive has read the cuts."** Every child learns **the school's translation**; every grown-up
  argues about it. (`:62`)
- The translation: *"When the Hearth goes cold, one born of four shall walk into the Cold, and it shall
  close behind them."* (`:63`; `lore.js:75`)
- **"You cannot walk into weather. The Cold is a place, and nobody will tell you where."** (`:64`)
- A promise, in fine print: *"You will be shown this sentence again, when it matters, and closer than
  this. Nothing tonight needs writing down."* (`:65`)
- **"Nobody agrees what the rest of it means. Everybody agrees who it is about."** (`:66`)
- The Masters come in the morning. Tonight is only the night before. (`:67`)
- **Tonight, for the first time in fourteen years, the Hearth is flickering.** (`:68`)
- On screen: eight worn grooves on a slab, and the caption **"THE ORDER'S READING."** (`scenes-ch0.js:77-78`)

**LIVE.**
1. **"One born of four" is Wren, born of the four Founders' fire** — the school's reading, taken
   straight. Evidence: the fire is four people's work; the child came out of it; "everybody agrees who
   it is about."
2. **"One born of four" is one of *us*.** Evidence: there are four players, they were introduced as a
   set on the title screen, and the game has just said "Wren is fourteen. So are you."
3. **The translation is wrong.** Evidence: "nobody alive has read the cuts"; it is called *the school's*
   translation; adults argue about it; and the art captions it **THE ORDER'S READING** — a byline. A
   sentence with an attributed reading is a sentence with a contested one.
4. **The prophecy is a sentence of execution and everyone knows it.** Evidence: "shall walk into the
   Cold, and it shall close behind them"; "everybody agrees who it is about"; Wren is fourteen and the
   Masters arrive in the morning.
5. **The Cold is a location under the school.** Evidence: "a place, and nobody will tell you where" is
   the grammar of a secret, not of an unknown.

**WANT LIVE.** (1), (3) and (4), held together — that trio is the designed pleasure of Act I. (1) is
what the fiction believes; (3) is what the fiction is wrong about; (4) is what makes it *matter tonight*.
A table holding all three is exactly where the author wants it: sure that this child is about to be
sacrificed, and suspicious that the reason given is a mistranslation, and unable to prove either.

(2) is a gift: it is wrong, it is available, it costs nothing, and it makes the players feel implicated
before the plot implicates them. It dies quietly and painlessly at T2 when the anomalies attach the
prophecy firmly to Wren.

**WANT KILLED.** Nothing here yet — but flag what the beat *fails* to kill: it never rules out **"the
Reader can just read the stone."** The game establishes a character who reads "any carving, however
worn" (`ch0.js:146`) fifteen lines after saying nobody alive has read these cuts. That is `CANON §13.2`,
the game's largest logical hole, and it opens **in this span**, not in ch6.
**The killing line does not exist and must be written. [PROPOSED]**, one clause at `:62`:

> *"Nobody alive has read the cuts — the fire has stood on the foot of this stone for four hundred
> years, and four of the eight are not worn. They are burnt away."*

This does three jobs for one sentence: it closes §13.2; it plants ch6's entire physical premise in the
Prologue; and it tells the table the number **eight** while the art is showing them eight grooves.

**REALITY.** The stone is a ring of eight cuts read *down* from cut 8, and it says *"Four, as one, go
down with fire. What is kept stays behind. The fire is the hollow they left."* (`ch6.js:827-828`). The
Order substituted *one* for *four* here exactly as its three Year-212 Laws substitute one case for two
everywhere else (`CANON §7.3`). The caption on screen is not decoration; it is the confession.

**CRUMBS — planted.**
- **"THE ORDER'S READING"** (`scenes-ch0.js:78`) — the best plant in the Prologue and the one nobody
  will notice, because "the Order" means nothing at T1. It acquires meaning nine beats later on exactly
  one phone (the Binder's Book dates Laws to "Founders' (Year 0) or **Order's** (Year 212 or 340)",
  `book.js:122`). **The join is available at T2 and the game never prompts it.**
- **Eight worn cuts, drawn as wear and not as glyphs** (`scenes-ch0.js:77`, and the long comment at
  `:30-51` explaining why: printing the real shapes would collapse ch6's puzzle field from 4,096 to 1).
  The Hearth promises the sentence and refuses to print it — correct, and it also means the table is
  staring at the answer-shaped object for two hours.
- **"You will be shown this sentence again, when it matters, and closer than this."** (`:65`) — an
  explicit, honest promise to the table. Rare and excellent: it tells four people not to transcribe
  something, which is a real courtesy at a real table.
- The word **"hollow"** is not here — but COLD's gloss is, one tab away on the Reader's phone by beat 9
  (`glyphs.js:18`: "the cold; the wound; the space left when warmth goes; **a hollow**").

**CRUMBS — cheap. [PROPOSED]**
- **B4 — date the translation.** One clause at `:62`: *"The translation every child learns is two
  hundred years younger than the stone."* The entire political spine of the game, in a subordinate
  clause, at T1, with no names and no spoilers.
- **B5 — the ring has no first cut.** One `small` line: *"The sentence runs all the way round the foot
  of the stone. Where it begins is a matter of opinion."* This is true (`ch6.js:391-395`), it is the
  actual key to ch6, and stated at T1 it reads as flavour.
- **B6 — the school's mark.** The Seer's Prologue page already teaches marks-and-cuts three beats later.
  Adding, in ch1's art or prose, that the stone has *a mark the school cut into it* would make the
  school's error physical rather than scholarly.

**TABLE.** The first real argument of the evening happens here or not at all. Expect: *"One born of
four — that's Wren, right? Four founders?"* answered by *"Or it's one of us. There's four of us."* Both
are wrong and both are productive. If the room notices "THE ORDER'S READING" at all, someone says "who's
the Order?" and nobody can answer — which is fine, because it becomes a name they are primed to hear.
Tone shifts from curiosity to unease at `:66`: *everybody agrees who it is about*.

**RISK.** Eight lines is the longest single prose block so far and three of them are meta (the promise,
the "night before," the flicker). The centre of the beat — that the translation has an author and a
politics — is carried entirely by an art caption and a genitive ("the school's"). **A table that reads
the prophecy as simply true loses the game's best ongoing tension and has been given no push.** This is
the single highest-value cheap fix in the span (B4).

---

## Beat 3 — `ch0_dorm` · past curfew (`ch0.js:73-83`; art `scenes-ch0.js:83-94`)

**KNOWS (new).**
- Four of them, awake past curfew, four beds, one round window. (`:77`)
- On the sill, **a brass lamp older than any record the school keeps. Nobody has ever got it to light.
  Everybody has tried.** (`:78`)
- They have known each other since they were seven. **Each sees one thing the other three cannot.** (`:79`)
- Seating: Reader, Listener, Seer, Binder, left to right, all night. (`:80`)

**LIVE.**
1. *The lamp is a tutorial object and will light in five minutes.* — Evidence: it is the only prop in
   the room and the chapter is a Prologue.
2. *The lamp is Founders' work — the same age as the fire, and therefore of the same kind.* — Evidence:
   "older than any record the school keeps"; the school is four hundred years old (it will be said at
   `:214`).
3. *The four gifts are a natural fact about people, like left-handedness.* — Evidence: "each of you
   sees one thing the other three cannot," stated flatly.
4. *The four gifts are four *of something* — a set that was designed.* — Evidence: exactly four, exactly
   complementary, in a world where four is already the significant number.

**WANT LIVE.** (2) and (4). (4) is the long fuse: `CANON §12.7` never answers where Sightings come from,
and the *recommended* answer — one per Founder, still being dealt out — is available to a table purely
by counting, at T1, with no text at all. That is a hypothesis with genuine evidence (the four-motif)
and no confirmation, which is the good kind of open question.

**WANT KILLED.** (3), softly — not because it is wrong but because it is inert. It dies on its own at
T2 when each gift turns out to have cost its owner something private.

**REALITY.** The lamp is exactly as old as the Hearth, the school and the Founders, because everything
four hundred years old in this building was made by the same four people. Nobody will ever say so.

**CRUMBS — planted.** "Nobody has ever got it to light. Everybody has tried." — establishes that the
school has *lost the knowledge it is sitting on*, which is the 212 thesis rendered as a domestic object.
Excellent.

**CRUMBS — cheap. [PROPOSED]**
- **B7 — collapse the lamp's age into the school's.** `CANON §12.70` flags the contradiction between
  "older than any record the school keeps" (`:78`), "Four hundred years. Still works." (`:214`) and
  "four hundred years of polish" (`companion/ch0.js:117`). Fix it *and* plant with one clause:
  *"older than any record the school keeps, which is to say as old as the school."* Now the table has
  been told, in the Prologue, that the school and the Founders' work are the same age — which is the
  premise of every "who built this?" question from ch2 onward (`CANON §12.19-20`).

**TABLE.** Orientation. Physical: people actually move chairs. Mild groan at a second set of seating
instructions. The lamp is correctly read as "the thing we are about to do."

**RISK.** Duplicated admin (see Beat 0). Minor.

---

## Beat 4 — `ch0_keys` · the four keys (`ch0.js:84-129`)

Custom widget: each player presses their key when it glows, then all four inside one second.

**KNOWS (new).**
- One keyboard, one key each. (`:87`)
- **"Four hands is how this school does anything that matters."** (`:88`)
- Failure text: *"Too far apart (1.4 s). Count in — one, two, three, press."* (`:123`)
- Success text: **"Four hands. The room holds still."** (`:122`)

**LIVE.**
1. *"Four hands" is a school custom — a nice bit of institutional colour.* — Evidence: it is phrased as
   a custom.
2. *"Four hands" is a rule of the world's magic and will be load-bearing.* — Evidence: the game made it
   a physical requirement before it made it a sentence.

**WANT LIVE.** Both — but (2) is the one the design is buying, and it buys it by *making the table do
it* before explaining it. This is the best single piece of teaching in the game: the physical act the
four people learn in minute eight is the physical act that wins the game in hour four
(`ch7.js:726`, `:740` — "COLD is written by four hands." — Law 0. Restored.).

**WANT KILLED.** Nothing.

**REALITY.** Law 0, the Founders' first law, struck by the Convocation in Year 212 and visible on the
Binder's phone from five beats hence, reads: **"COLD is written by four hands."** (`lore.js:57`). The
school's idiom is a fossil of a law the school has forgotten it broke.

**CRUMBS — planted.** The whole beat. Also: `:88` is the school's "constitutional habit" and is quoted
verbatim by CANON as such (`CANON §3.1`).

**CRUMBS — cheap. [PROPOSED]**
- **B8 — mark the idiom as older than the school.** Append to `:88`: *"Nobody remembers who said it
  first."* One clause; converts a custom into an inheritance.

**TABLE.** The evening starts here. Physical comedy: someone presses early, someone's key does not
register, the remap button gets found. Laughter. **This is the beat where four individuals become a
table.** Protect it — it is doing more work than any prose in the span.

**RISK.** Hardware. The "A key is not working — change keys" affordance is right there (`:96`), which is
good, but a table on a laptop keyboard with n-key rollover problems can fail four-simultaneous presses
for hardware reasons and read it as their own failure. The failure text is forgiving. Acceptable.

---

## Beat 5 — `ch0_practice` · the reaction drill (`ch0.js:130-139`)

**KNOWS (new).**
- **"Later tonight you will do this for real, against a clock, and it will cost something. This costs
  nothing."** (`:133`)
- Press as your light crosses the line; purple means everyone. (`:134-135`)

**LIVE.**
1. *There will be a timed action sequence later tonight.* — Evidence: the game said so.
2. *It will be tonight, i.e. within the Prologue or soon after.* — Evidence: "later tonight."

**WANT LIVE.** (1).

**WANT KILLED.** (2) — **and the game creates it and never kills it.** `CANON §13.1`: the Prologue says
"later tonight" at `:133` and "tomorrow" at `:67` and `:242`; the real reaction puzzle is ch6's Bells,
which runs on the *next* night, more than twenty-four hours later. The killing evidence is trivially
available and the game instead contradicts itself in the same chapter.
**[PROPOSED] fix, one word:** *"One night soon you will do this for real, against a clock, and it will
cost something."* — or, better, keep the urgency and move it: *"You will do this again, against a clock,
and it will cost something."*

**REALITY.** The pattern being drilled is the Founders' holding pattern, rung on four bells by four
hands, the last of which the Founders rang **blind** (`ch6.js:487`, `:594`). The table is practising a
four-hundred-year-old ritual and is told it is a warm-up.

**CRUMBS — planted.** Almost none. The beat is mechanically necessary and fictionally inert.

**CRUMBS — cheap. [PROPOSED]** — *this is the largest free win among the puzzles in the span.*
- **B9 — make the drill diegetic.** Wren, or the narration, names it: *"Every fourth-year learns this.
  Nobody is ever told what it is for."* Now the drill is (a) worldbuilding, (b) a plant for ch6, (c)
  another instance of "the school keeps the form and lost the content," which is the game's thesis.
- **B10 — four lanes, four hands, again.** One `small` line tying it to Beat 4: *"Four lanes. You will
  notice that everything here comes in fours."* The game is otherwise relying on the player to count.

**TABLE.** Fun, short, low-stakes. Someone will miss one and be indignant. Fifteen seconds.

**RISK.** **Dissonance, not boredom.** A table that takes "later tonight" literally spends the whole
Prologue and Chapter I braced for a clock that does not arrive for six chapters, then stops trusting
the game's promises. Small but real, and free to fix.

---

## Beat 6 — `ch0_wren` · the door bangs open (`ch0.js:141-152`)

**KNOWS (new).**
- Wren enters: **"You're awake. Good. I need four idiots and a lamp."** (`:145`)
- Wren names each gift as a fact about the person: *"Reader — you read everything and eat nothing. Any
  carving, however worn." / "Listener — you can hear a spider think, two floors down." / "Seer — you see
  under things. Under paint. Under four hundred years of polish." / "Binder — you know every rule in the
  book, and who is tied to who."* (`:146-149`)

**LIVE.**
1. *Wren is the group's ringleader and the game's guide character.* — Evidence: conscripts four people
   in one line; knows all four gifts; drives the scene.
2. *Wren knows the four unusually well — better than a classmate would.* — Evidence: four accurate
   one-line diagnoses, delivered without hesitation.
3. *Wren is unbothered by being the prophecy's subject.* — Evidence: tone.
4. *"Under paint" is a deliberate choice of example.* — Evidence: it will be repeated as a plot point in
   four beats' time by a different character (`ch1.js:138`).

**WANT LIVE.** (2) and (4). (4) is the best micro-plant in the Prologue: Wren names *paint* as the
example of what the Seer can see under, and eleven beats later Vane weaponises exactly that
("I have seen what is under the paint in this hall, Ilsabet," `ch1.js:138`; "Ask your Seer what is under
the paint," `ch1.js:283`). A table that remembers `:148` gets a small private thrill at `ch1.js:283`.
That is precisely the "logically consistent breadcrumb" structure the author asked for, and it is
already shipped.

**WANT KILLED.** (3) — killed in the very next beat, deliberately, which is the correct interval.

**REALITY.** These four lines are the truest description of the four players in the game and Wren
repeats them **verbatim** in the Epilogue letters on the true ending (`companion/ch8.js:86`, `:94`,
`:110`, `:126`). The Prologue's throwaway character sketch is the game's last word.

**CRUMBS — planted.** The four diagnoses (paid at T10). "Under paint" (paid at T3 and T6). "Any carving,
however worn" (which is also `§13.2`'s open wound — see Beat 2).

**CRUMBS — cheap.** None needed. This beat is finished.

**TABLE.** Delight. Each of the four grins at their own line. **This is the beat where the players
acquire a character they like**, and it costs six lines. Expect someone to say "I love this kid"
out loud.

**RISK.** None. The best-tuned beat in the span.

---

## Beat 7 — `ch0_dare` · what Wren is (`ch0.js:153-163`)

**KNOWS (new).**
- **"Me? I'm the thing they're all coming to look at."** (`:156`)
- **"Tomorrow I stand at the front of a hall and stay still while grown-ups decide about me. I don't get
  a say. That is the entire job."** (`:157`)
- "So tonight I want one thing that's mine. That lamp." (`:158`)
- "A hundred people have tried to light it with a match. Nobody has tried it with a sigil." (`:159`)
- "Carve my name in it first, so it knows whose lamp it is." (`:160`)

**LIVE.**
1. *Wren is in danger and knows it.* — Evidence: `:156-157`.
2. *Wren has no agency and has made peace with it by joking.* — Evidence: "That is the entire job."
3. *The lamp is a proxy: Wren wants one thing in the world that consents to be owned.* — Evidence: "one
   thing that's mine"; "so it knows whose lamp it is."
4. *Wren has a plan and this is step one.* — Evidence: Wren knows a sigil is the method, which is
   knowledge the four have and the school apparently does not.

**WANT LIVE.** (3) and (4). (3) is the emotional engine of the whole game: everything the table later
risks, it risks because of eleven words in beat 7. (4) is a quiet, nagging wrongness that pays at T2 and
never resolves (`CANON §12.21`).

**WANT KILLED.** Nothing.

**REALITY.** Wren is not a child who is *about* to be decided about; Wren is a fourteen-year-old who has
known for years exactly what the stone says and what it is for ("I have had years to get used to it,"
`ch7.js:404`). The flat comedy of `:157` is armour over the most complete resignation in the game.

**CRUMBS — planted.** "so it knows whose lamp it is" — Wren treats objects as things that can recognise
ownership, in a game whose reveal is that the fire is four people (compare `ch6.js:473`: "It is smaller
from down here. **Do not tell it I said that.**"). That is a consistent characterisation of someone who
knows the furniture is alive.

**CRUMBS — cheap. [PROPOSED]**
- **B11 — the name is the point.** Wren asks for a name carved into brass, and the game's climax is a
  name cut into a socket four hundred years older than the alphabet (`ch7.js:699`). One clause here —
  *"Names are the only thing I've got that nobody gave me."* — is untrue in the most useful way (Marrow
  gave it) and sets a trap that springs at `companion/ch3.js:284` ("Properly. **Not the Provost's
  version.**").

**TABLE.** The room stops joking. This is the empathy hinge. Somebody says "oh, no." If the table is
going to protect Wren for three hours, the decision is made here.

**RISK.** None.

---

## Beat 8 — `ch0_carve` · a name in the brass (`ch0.js:164-178`)

Answer puzzle: type `WREN`. Wrong answer: *"Wren, arms folded: 'My name. Mine. W-R-E-N.'"*

**KNOWS (new).**
- **"It flares blue, once, and dies."** (`:169`)
- **"Names don't burn. Words do — the old ones."** (`:170`)
- Wren then names, one per seat, a fact that seat alone can perceive: *two shapes cut round the collar*
  (Reader); *it hums, and has hummed since before we were born* (Listener); *something cut under the
  brass that nobody has ever seen* (Seer); *the rule about rings, the one nobody else was taught*
  (Binder). (`:171-174`)
- **"Nobody has all four. That's the whole trick of it."** (`:175`)

**LIVE.**
1. *The lamp is an old machine and the old language is its interface.* — Evidence: `:170`.
2. *Wren is unusually well-informed about the four's gifts — to the point of knowing things only one of
   them can perceive.* — Evidence: `:172-174` name a hum only the Listener hears
   (`companion/ch0.js:104`: "nobody else in this room has ever heard it"), cuts "nobody has ever seen,"
   and a rule "nobody else was taught."
3. *The blue flare means something.* — Evidence: the game has been orange for eight beats; blue is new;
   it happened when the name went in.
4. *Wren has been researching this lamp.* — the mundane version of (2).
5. *Wren is the reason the lamp will light — Wren's name is the key and the sigil is theatre.* —
   Evidence: the flare happened at the name, before any sigil.

**WANT LIVE.** (3) and (5). (3) is free and enormous: **blue is the Cold's colour in the palette**
(`scenes-ch0.js:8`) and the game will not say so for six chapters. A table that says "why was it blue?"
at beat 8 has, without knowing it, asked the game's central question. (5) is wrong in an interesting
direction — it makes the player suspect Wren is *operative*, not merely *subject*, which is the correct
suspicion arriving early by the wrong route.

**WANT KILLED.** (4), the mundane version of (2) — and **the game does not kill it, because the game does
not even mark (2) as strange.** `CANON §12.21` calls this "the largest unexplained thing in the game."
The narration never flags it, no character asks, and the structural consequence is worse than a plot
hole: **most tables will file Wren's impossible knowledge as *UI*** — the tutorial voice telling each
player to check their phone — and discard it as evidence.

**[PROPOSED] killing/converting line**, one sentence of narration after `:174`:

> *"Nobody asks how Wren knows what is cut under four hundred years of brass. Nobody ever has."*

Fourteen words. It converts the span's largest piece of authorial convenience into its first plant,
kills the mundane read, and is consistent with `ch0.js:226` ("I've known for years") two beats later.
**This is the second-highest-value cheap fix in the span, after B4.**

**REALITY.** Wren is the hollow — the eighth glyph — and the hollow is in every room. Whether that is
the mechanism is `CANON §12.5`, unruled; but option (a) makes `:172-174` free and makes this beat the
place the game first shows it.

**CRUMBS — planted.** The blue flare (`:169`, `scenes-ch0.js:7`). "Names don't burn. Words do — the old
ones," which is the operating principle of every puzzle in the game and of Law 0.

**CRUMBS — cheap. [PROPOSED]**
- **B12 — mark the blue.** `:169` → *"It flares blue — which is not a colour brass does — once, and
  dies."* Seven words. `CANON §12.47` calls this "an excellent free plant if kept," and notes
  (`§13.50i`) that the art has no blue state for `ch0_lamp` at all, so the prose is currently describing
  something the screen does not show. Either draw it or say it; saying it is cheaper and better.
- **B13 — the Seer sees it.** Alternative/additional: put the observation on one phone, where it costs
  nothing and rewards the right seat.

**TABLE.** Typing WREN is satisfying — the first time the table *does* something with the fiction's own
content. The blue flare passes without comment at most tables. Then four people are told, one at a time,
that they personally have a piece of the next puzzle. Anticipation. Phones come out early.

**RISK.** The wrong-answer text ("My name. Mine. W-R-E-N.") is charming but the puzzle is trivially
easy, which is correct for beat 8; no risk. The real risk is the one named above: a plant read as UI.

---

## Beat 9 — `ch0_attune` · KINDLE, and the first private pages (`ch0.js:179-187`; `companion/ch0.js`)

Code gate: the table types `KINDLE` on four phones. `sightSeconds: 90`. Warden: anyone. Voice: the Reader.

**KNOWS (new) — on the Hearth.**
- The phone keeps everything it shows, in the **Book** tab, all night. Nothing needs memorising. (`:183`)

**KNOWS (new) — per seat, privately. This is the first asymmetry in the game.**

| seat | Sight page (`companion/ch0.js`) | Book tab (`book.js`) |
|---|---|---|
| **Reader** | Two shapes on the collar; the Hearth shows them worn, "on your page they are clean" (`:86`); a circle has no first shape (`:88`); **a shape upright says one word, upside down says the opposite** (`:89`); the two are **EMBER** (crown, inverted) and **ASH** (flame, upright) (`:90-93`); and the fine print: *"the crown standing up would read **CROWN**; the flame upside down would read **COLD**"* (`:94`) | The Lexicon — four shapes, eight words, with glosses; **COLD = "the cold; the wound; the space left when warmth goes; a hollow"** (`book.js:70-73`; `glyphs.js:18`); glossary entry **WREN — "the child's name. Written on the dormitory door in the older alphabet, which you have not learned."** (`book.js:75`); *The Older Alphabet — locked* (`:87`) |
| **Listener** | The lamp has been humming since before you were born and **nobody else in this room has ever heard it** (`:104`); two notes, the second **three steps above** (`:105`); "Two notes. Two words… There is no third word and no fourth" (`:107`); you never hear a word's *name*, only intervals, because every room is tuned differently (`:109`) | The Ladder: seven steps and a rest; **COLD is the rest** (`book.js:91-93`) |
| **Seer** | Four sockets under four hundred years of polish; **two cuts, both older than the polish** — a long deliberate **scratch under socket 3**, a small **notch under socket 1** (`:117-118`); "Which one matters is not yours to know — that is the Binder's half" (`:120`) | The Ring Page: cuts, sunwise numbering, mark-left/mark-right (`book.js:114-116`) |
| **Binder** | **Law 1 · Founders' · Year 0 — "A sigil is read sunwise from the mark."** (`:130`); **a sigil begins at the scratch; a notch is only a maker's signature** (`:132`); first word *in* the marked slot; then sunwise; **"Any slot the words do not reach stays empty"** (`:133-135`) | **The Book of Laws** — and at maxChapter 0 it contains exactly two: Law 1, and **Law 0 · Founders' · Year 0 · STRUCK — "COLD is written by four hands." — note: "struck by the Convocation, 212. See Law 6."** (`lore.js:57`; `book.js:121-127`). Also the thread legend: *"No thread — unbound; or, once, 'not unbound: the knot itself.'"* (`book.js:131`) |

**LIVE.**
1. *The four phones are a puzzle-input mechanism.* — the correct, shallow read.
2. *(Reader, privately)* **COLD is a word in this language and it is the flame turned upside down.** —
   Evidence: `companion/ch0.js:94` says it in so many words. The Reader has met the game's title
   character's true name in beat 9 and will not know it for six chapters.
3. *(Binder, privately)* **Somebody struck a Founders' Law two hundred and twelve years after it was
   written, and the law they struck is about writing COLD with four hands.** — Evidence: `lore.js:57` as
   rendered by `book.js:125`, complete with a strikethrough and a note pointing at a Law the Binder
   cannot yet see.
4. *(Binder, privately)* *There is a fourth thread-state and it has a strange gloss.* — Evidence:
   `book.js:131`'s "not unbound: the knot itself" — **ungated, visible from the Prologue**, and it is the
   verbatim correct answer to a ch6 question (`CANON §13.44`).
5. *The Order and the Convocation are the same people, or successors.* — Evidence: the Book's fine print
   dates Laws to "Founders' (Year 0) or **Order's** (Year 212 or 340)" (`book.js:122`) while Law 0's note
   says the **Convocation** struck it in 212 (`lore.js:57`) — two names, one year, one phone.

**WANT LIVE.** (2), (3) and (5). This is the single richest epistemic moment in Act I and almost nobody
will use it, because it is **the first time four people have ever seen these screens** and they are
looking for the lamp's answer. (3) is the political spine of the game handed to one player in a
strikethrough, in the Prologue, for free.

**WANT KILLED.** Nothing — but (4) should arguably be *gated*: `CANON §13.44` notes that every comparable
Book entry is gated by `maxChapter` and this one is not, so the Binder can read ch6's right answer in
the Prologue. That is not a hypothesis problem; it is a reveal-economy problem. **[PROPOSED]** gate
`book.js:131`'s second clause behind `n >= 6`, or split it: show "No thread — unbound" from ch0 and add
"or, once, 'not unbound: the knot itself'" at ch6.

**REALITY.** Everything on these four pages is true, and three of the four seats are holding a piece of
the game's ending without any way to recognise it: the Reader holds COLD's shape, the Listener holds the
fact that COLD is a silence, and the Binder holds Law 0 with a line through it.

**CRUMBS — planted.** Law 0, struck, from the Prologue (`lore.js:57`). COLD's gloss, including **"a
hollow"** (`glyphs.js:18`). COLD as the rest, the only glyph with no note (`book.js:91-92`). The WREN
glossary entry pointing at an alphabet the Reader has not learned (`book.js:75`). The Binder's own note
that a notch is "only a maker's signature" — which returns, inverted, at the Great Sigil's decoy notch
(`companion/ch7.js:221`).

**CRUMBS — cheap. [PROPOSED]**
- **B14 — surface Law 0 on the Binder's Sight page, once, unexplained.** Every other seat's Prologue
  Sight page ends with an instruction to *say something out loud*; the Binder's does not. Add one
  `fine` line: *"There is one Law in your Book with a line through it. Nobody has ever told you why.
  Tonight is not the night to ask."* Cost: one line. Payoff: the table hears the words "struck Law"
  in hour one, and `CANON §7.2`'s six-step chain becomes something they built rather than something they
  are told at T8.
- **B15 — let the Reader say COLD out loud.** `companion/ch0.js:94` currently buries COLD in a `fine`
  block that explicitly tells the Reader neither turned form is present tonight. That is correct
  puzzle-hygiene and a wasted plant. Add: *"Say all four shapes and both their words aloud. You will
  want the table to have heard them."* The whole lexicon gets spoken in the Prologue, COLD included,
  and the word enters the room as vocabulary rather than as a reveal.
- **B16 — the lamp hums because it is doing something.** `CANON §12.46` asks why a four-hundred-year-old
  unlit lamp hums. One Listener line: *"Nothing is burning in it. Things that hum are doing something."*
  Plants "Founders' objects are still running" for ch2's Ember and ch5's gates.

**TABLE.** Everyone goes quiet and reads. This is the first silence of the evening and it is a *good*
silence — but it is long. Ninety seconds is not enough: the Reader's page is eight blocks, the Binder's
is a Law plus four rules plus a diagram. Expect two to three minutes of real reading, plus tab-hunting
("wait, where's the Book?"), plus at least one person who has not finished when the Hearth advances.

**RISK. The span's first overload point.** New UI, three tabs, a house rule, and four dense pages, all
at once, all new. The 90-second `sightSeconds` is advisory rather than binding, which is right, but the
Hearth gives no signal that it is fine to take four minutes. **[PROPOSED]** one `small` line on the
Hearth: *"There is no rush. Nobody moves until all four of you have read."*

---

# T2 — THE LAMP LIT, AND THE FOUR SPEAK

## Beat 10 — `ch0_lamp` · the dormitory lamp (`ch0.js:189-221`)

Ring puzzle, four slots, nine-tile palette. Answer: **ASH in 3, EMBER in 4, two slots empty**, then four
hands. Par [3, 6]. Three hint tiers (`:207-209`).

**KNOWS (new).**
- "A sigil is words in slots. This ring has four slots." (`:192`)
- **"The Reader has the words. The Listener has the order. The Seer has the cuts. The Binder has the
  rule. Nobody has two."** (`:193`)
- **"Say what you see. Never show your phone."** (`:194`; `lore.js:74`)
- The note: *"Four brass sockets around the foot. Two shapes cut around the collar, worn past reading —
  the Reader's page has them clean."* (`:199`)
- On failure: *"The brass stays cold. The ring forgets what you put in it."* (`:203`), and after two
  tries Wren: *"Has everyone actually said their bit?"* (`:204`)
- On solve: the lamp catches, "warm, steady, and against about a dozen school rules." (`:213`)
- **Wren: "Four hundred years. Still works."** (`:214`)
- **"Four hundred years, and it needed all four of you: one to read it, one to put it in order, one to
  find the cuts, one to know the rule."** (`:215`)
- **"ASH, EMBER. *Fire, keep.* That is all it ever said."** (`:216`)

**LIVE.**
1. *Founders' objects require exactly four people by design.* — Evidence: `:215`, stated flatly by the
   narration, immediately after `:88`'s "four hands is how this school does anything that matters."
2. *The Founders built a four-person lock into a bedside lamp, which implies they built four-person
   locks into everything.* — Evidence: (1) generalised.
3. *"Fire, keep" is an instruction to a fire, in a world with a fire that must be kept.* — Evidence:
   `:216`, and the entire premise.
4. *The old language does things rather than describing them.* — Evidence: `:170`, now demonstrated.
5. *The school could relight the Hearth if it remembered how.* — Evidence: "Nobody has ever got it to
   light. Everybody has tried" + it took four gifts + the Hearth is flickering.

**WANT LIVE.** All five, and (3) and (5) especially. (3) is the game's thesis served as a puzzle
solution: the table has just *written the Hearth's job description in two words* and been told it is a
lamp instruction. (5) is a false but gorgeous hope — it will be dashed at T8 ("Nobody did anything
wrong. It was only ever four people," `ch6.js:850`), and dashing a hope the player built themselves is
worth ten reveals they were handed.

**WANT KILLED.** Nothing here. Note what is *not* live and should be: the number **four** as a
*requirement* rather than a *coincidence* is now four-times evidenced (four keys, four gifts, four
slots, four founders) and no one in the fiction has remarked on it. That is fine — the table is doing
the remarking, which is better.

**REALITY.** ASH + EMBER = *fire, keep* is the Founders' own two-word statement of what they did to
themselves. The lamp is a working miniature of the Hearth: a Founders' object, four-handed, that holds a
fire. The table has just performed, at toy scale, the act the Founders performed at the cost of their
Sight.

**CRUMBS — planted.**
- `:215` — "it needed all four of you" — the design principle, stated once, in the Prologue.
- `:216` — *Fire, keep*, in a `small` class. The most under-sold true sentence in the game.
- The Reader's page has already named COLD as ASH's inversion (`companion/ch0.js:94`), so the table has
  now written ASH and knows, if anyone said it aloud, that turning it over gives the thing from the
  prophecy.

**CRUMBS — cheap. [PROPOSED]**
- **B17 — say who built the lock.** After `:215`: *"Somebody wrote a spell for keeping a fire, and then
  made sure it could not be done alone."* Twelve words; converts a mechanic into an intention, and the
  intention is Law 0's.
- **B18 — the empty slots.** The counter-intuitive rule ("any slot the words do not reach stays empty,"
  `companion/ch0.js:135`) is the ancestor of ch5's Law 6 ("where an inscription shows COLD, leave the
  slot empty") and of the Finale's empty eighth socket. One Binder `fine` line — *"An empty slot is a
  fact, not an absence."* — is free and pays three times.

**TABLE.** The best cooperative beat in the span. It runs, in practice, like this: the Reader says "I
have two words, EMBER and ASH, and I can't tell which is first"; the Listener says "it climbs three, so
whichever is three below comes first" and then has to be asked for the ladder; the Seer says "there's a
scratch under 3 and a notch under 1"; the Binder says "the scratch is the mark, so the first word goes
*in* slot 3, then clockwise." Four sentences, four people, one answer. **When it lands, the table
cheers.** Expect 4–10 minutes including at least one failed attempt caused by putting words in slots 1
and 2 (the notch trap) or by filling all four slots.

**RISK. The span's second overload point, and the one the source itself worried about** (`ch0.js:8-15`
documents a chapter-local CSS fix because the board runs 193px below the fold on a 1152×648 screen —
i.e. the Clear button and the commit button were invisible on a laptop). Beyond layout: four grammar
rules are taught at once (mark → scratch not notch; first word *in* the mark; sunwise; empties are
meaningful), on the widest board in the game, as puzzle #2. The three hint tiers are well-graded
(`:207` restores the partition, `:208` names the two real difficulties, `:209` gives the answer), which
is the right mitigation. Net: hard but correct — this is the puzzle the whole game's method rests on and
it deserves the weight.

---

## Beat 11 — `ch0_lamp` solvedText → the four Wren tabs (`ch0.js:217-218`; `companion/ch0.js:98-99`, `:110-112`, `:122-124`, `:139-145`)

The Hearth says: *"And in that light, each of you sees the thing about Wren that you have never said out
loud."* → *"Open the tab marked **Wren**. One line each, out loud, in seat order."*

**KNOWS (new) — and this is the beat where the private becomes public.**

| seat | the anomaly | the rationalisation, verbatim |
|---|---|---|
| Reader | Wren's name is chalked on the dormitory door **twice** — once in our letters, once in letters the Reader has never seen — **"and the handwriting is the same."** | *"You decided, a year ago, that somebody was being funny. **You have never asked who.**"* (`:99`) |
| Listener | Can hear a teacher's heart through a stone floor; **has never once heard Wren's**. Drawn: four normal traces, one flat. | *"You decided years ago that **the fault was yours**, and you have never said it out loud to anyone."* (`:112`) |
| Seer | Every shadow in the room falls away from the lamp. **Wren's falls toward it.** Drawn, with Wren's stroke in violet. | *"You decided months ago it was a trick of the light. You are looking straight at it now, in the light you just made. **It is not the light. It never was.**"* (`:124`) |
| Binder | Reader↔Listener: an old red thread, well knotted. Seer↔Binder: last week's practice thread, broken. **Wren: nothing. No thread at all, to anyone.** | *"You have seen unbound people. Wren is not unbound. There is nothing there at all. You decided it was a blind spot in your own gift. **You have never told anyone your gift has a blind spot.**"* (`:145`) |

**LIVE.**
1. **Wren is not human / not alive in the ordinary way.** — Evidence: no heartbeat, no thread. Two
   independent seats, two independent gifts.
2. **Wren belongs to the fire.** — Evidence: the shadow falls *toward* the fire, in defiance of light;
   plus beat 1's baby-in-the-Hearth.
3. **Wren is a ghost / the fire's echo / already dead.** — Evidence: (1) + (2); no pulse and no
   attachment is the classic profile.
4. **Wren is the Cold, or of the Cold.** — Evidence: available only if the Reader said "the flame
   upside down reads COLD" at beat 9 and somebody remembers the blue flare at beat 8. Very few tables.
5. **Wren is a construct — something made, four hundred years ago, and stored.** — Evidence: the name in
   an alphabet nobody teaches, on a door, **in the same handwriting** as the modern one.
6. **Someone at the school knows exactly what Wren is and wrote the name twice to see if anyone would
   notice.** — Evidence: the same handwriting; a year ago; a dormitory door.
7. **The four of them were each given the piece of the truth their gift could hold, on purpose.** —
   Evidence: four gifts, four anomalies, one per seat, exactly partitioned.

**WANT LIVE.** (1), (2), (3), (5), (6) — five at once, and this is the high-water mark of the game's
hypothesis space. Each is licensed by a *different* gift, which means each is owned by a different
person at the table, which means the argument is genuinely four-sided. (7) is the most interesting of
all and it is never confirmed or denied anywhere in the game (`CANON §12.7`, `§12.21`); as a *table*
theory it is free, correct-feeling, and paid for by the geometry alone.

(6) is the specific gift of this beat. By T3 the table will know Marrow *named* the child (`ch1.js:123`)
and the Reader knows the second spelling is in an alphabet "you have not learned" (`book.js:75`). **A
table that joins those two has identified the chalker as the Provost, at T3, five chapters before the
Vigil roll shows Marrow's own hand writing WRENN in the old letters (`companion/ch4.js:202-204`).** That
is the best available early-aha in the span and the game neither prompts it nor blocks it. Exactly right.

**WANT KILLED.** (3), the ghost — not immediately, but it should not survive Chapter I. It is killed
partly at `companion/ch1.js:147` ("Not unbound — you know unbound. Something else") and cleanly only at
T8. Left alone it is a *pleasant* wrong answer; it costs nothing and it keeps the table wrong in a
direction that still feels the loss correctly.

Killed here, correctly and permanently: **the mundane foundling** (Beat 1, hypothesis 1). Four gifts, four
impossibilities, one child. Nobody at the table defends it after this.

**REALITY.** All four are true readings of one fact. Wren is the hollow: no heartbeat because there is no
one inside to have one; no thread because "there wasn't a *me* on the other end to tie it to"
(`companion/ch8.js:126`); a shadow toward the fire because Wren is what the fire is holding down; a name
in the older alphabet because the name was cut into a floor four hundred years ago (`ch7.js:699`).

**CRUMBS — planted.** All four anomalies; each has an explicit kill-line waiting in a later chapter
(`CANON §9.4`). The chalk's dating — **a year ago**, when Wren has been at the school fourteen
(`companion/ch2.js:121`) — which no one will notice until ch2 and which `CANON §12.16` flags as the
Prologue's strongest single clue.

**CRUMBS — cheap. [PROPOSED]**
- **B19 — the Seer's shadow count.** The under-drawing (`companion/ch0.js:44-61`) already labels five
  figures with Wren's stroke in violet. One caption line — *"Four away. One toward. Count them again
  in every room tonight."* — turns a picture into an instruction and makes ch1's payoff ("There is no
  lamp here," `companion/ch1.js:133`) land as a confirmation rather than a repetition.
- **B20 — the Listener's absolute.** `:112` is already the strongest line on any Prologue page. Consider
  adding the count: *"Four hearts in this room. There should be five."* Numbers travel better across a
  table than adjectives.

**TABLE. The best beat in the span, and the reason the game works.** Four people, in seat order, each
confess a thing they have hidden for months or years, about someone they all like, and discover the
other three did the same. Expect: an audible reaction on the second confession, an "oh my *god*" on the
third, and total silence on the fourth. Nobody is looking at the screen.

The instruction "one line each, out loud, in seat order" is doing enormous work: it *forces* the
simultaneity, and without it half of tables would compare phones and lose the effect.

**RISK.** Only one, and it is a facilitation risk: if the table has drifted into showing each other
phones during the lamp puzzle, this beat is already spent. The house rule is printed above every SPEAK
page (`companion/ch1.js:87`) but not on the Wren tabs. **[PROPOSED]** print it on the Wren tab too, for
this beat specifically.

---

## Beat 12 — `ch0_name` · "I've known for years" (`ch0.js:222-236`)

**KNOWS (new).**
- *"Nobody says anything for a moment."* (`:225`)
- **Wren: "Yes. All four of you. I've known for years."** (`:226`)
- **"It's fine. You can stop pretending you didn't notice."** (`:227`)
- "And you need a name. As a set." → `GROUP_NAME` is chosen and used by Wren in every crisis line
  thereafter. On the "Vigil-in-waiting" option, Wren says **"Mum — the Provost — will hate that."**
  (`:233`)

**LIVE.**
1. **Wren has known, for years, that Wren has no heartbeat, no thread, no ordinary shadow and a name in
   a dead alphabet — and has been living with it alone.** — Evidence: `:226`.
2. **Wren knew the four were hiding it and let them.** — Evidence: `:227`.
3. *Wren's relationship to the Provost is close and complicated* — Wren calls her **Mum** and corrects
   it in the same breath. — Evidence: `:233` (branch-dependent).
4. *Wren has an agenda tonight and the lamp was step one of it.* — Evidence: the four things only Wren
   could have known at beat 8, plus this.
5. *Wren cannot be surprised by anything the four discover.* — a table-level heuristic that will hold
   all game and matters at T5 and T8.

**WANT LIVE.** (1), (2), (4), (5). (2) is the beat's real content and its most quietly devastating: a
fourteen-year-old has been managing four friends' guilt about a thing that is happening *to Wren*.
That is the character's spine, established in nine words, and every later instance —
"It's alright. I'd have taken it too" (`ch7.js:499`), "Thank you. All of you. Even the ones who lied"
(`ch3.js:530`) — is a repetition the table will recognise.

**WANT KILLED.** Nothing. But note: (3) is *branch-dependent* — only tables that pick "The
Vigil-in-waiting" hear "Mum." That is a 1-in-4 chance of missing the first and cheapest establishment of
the Marrow–Wren relationship, in a game that then leans on it in ch4, ch5 and ch6 (and mis-states it in
ch8, `CANON §13.13`). **[PROPOSED]** move the "Mum — the Provost —" beat out of the branch, or give a
version of it to each of the four options.

**REALITY.** Wren has known all four anomalies since before the four did, knows Marrow's plan is coming,
and has had years to get used to what the stone says (`ch7.js:404`). Everything from here to the Finale
is Wren managing other people through a thing Wren settled privately a long time ago.

**CRUMBS — planted.** `GROUP_NAME` — the game will call the four by their own invented name at every
emotional peak (`ch7.js:317`, `:405`, `:423`). Cheap, and the payoff is entirely the table's.
"Mum" (branch). "I've known for years" as the licence for every later moment Wren is ahead of the table.

**CRUMBS — cheap. [PROPOSED]**
- **B21 — Wren's own Sighting.** `CANON §12.6`/W6: the game is about to say every person gets one Sighting
  (`ch0.js:241`) and will never say what Wren's is, though the table will absolutely ask. One line here
  or at `ch0_flow`: **"Mine never turned up. Mum says it might not."** It kills the "Wren is a fifth kind
  of Sighting" theory, it is a joke that is not a joke, and it is the word *hollow* without the word.
  Very high value, one line.
- **B22 — the ask that is never made.** After `:227`, one narration line: *"Nobody asks Wren how Wren
  knew."* Pairs with B12/`§12.21`'s fix and closes the loop opened at beat 8.

**TABLE.** Release, then comedy. The group-name choice is pure table-bonding and the custom option gets
used more often than not. Whatever they type, the game will say it back to them at the worst moment in
four hours' time — the best ROI in the build.

**RISK.** Tonal whiplash: the confession beat is the most serious in the span and the very next
interaction is a joke menu. In practice this works (release after tension), but note the "Mum" branch
problem above.

---

## Beat 13 — `ch0_flow` · what a Sighting is, and the map (`ch0.js:237-248`)

**KNOWS (new).**
- Below, in the great hall, **the Hearth flickers again.** (`:240`)
- **"A Sighting. One way of seeing, one to a person, and nobody chooses which one they get."** (`:241`)
- **"Tomorrow you will stand at the back of a hall while grown-ups decide about Wren. Every one of them
  has a Sighting of their own."** (`:242`)
- The Map: after each chapter the Hearth shows every path — "the ones you walked, and the ones you did
  not." (`:243`)
- Stats: the group name, and the hint count. (`:246`)

**LIVE.**
1. *Sightings are common; the school is full of people with them.* — Evidence: `:241-242`.
2. *There are exactly four kinds and the four players have one each — which is either luck or design.* —
   Evidence: four roles, four gifts; the game has not said there are only four.
3. *The nine Masters' Sightings will matter tomorrow.* — Evidence: `:242` says so, explicitly, as the
   last piece of information before the Vigil.
4. *Wren's Sighting is the missing one.* — Evidence: the sentence "one to a person" with Wren standing
   right there.
5. *This is going to be a hostile room and the four are outgunned.* — Evidence: `:242`.

**WANT LIVE.** (2) and (4).

**WANT KILLED.** (3) — **and the game creates the expectation and never honours it.** `CANON §6/S2`:
"Every one of the nine Masters has one too — asserted once and never used again." Nine Masters' Sightings
are promised in the Prologue's last line before Chapter I and no Master ever uses one, is identified by
one, or is defeated by one. A table that arrives at `ch1_vote` expecting the Masters to *see* things is
mis-braced for a puzzle that is entirely about coins, oaths and deafness.

**[PROPOSED]** two options, both cheap: (a) delete the clause; or (b) **pay it in ch1** — one line in the
Seer's or Listener's page noting that one of the nine is reading the four right back
(Oriel is the obvious candidate: she already "watched me the whole time. Like I was a sum she was
doing," `ch1.js:306`). Option (b) turns a broken promise into Oriel's characterisation for free.

**REALITY.** There are exactly four Sightings, one per seat, fixed in order (`lore.js:5-10`); where they
come from and why there are four is never stated anywhere in the game (`CANON §12.7`), and the
recommended answer — one per Founder, still being dealt — is available to the player by counting and
never confirmed.

**CRUMBS — planted.** The Map itself, which will trace the night's route and, at T10, turn out to be the
glyph **KNOT** (`ch8.js:429-444`; `map.js:29-37`). The table is being handed a drawing of the answer once
per chapter for eight chapters. Superb.

**CRUMBS — cheap. [PROPOSED]**
- **B23 — count the kinds.** *"Four ways of seeing that anyone has ever named. There are four of you.
  Nobody has ever explained that either."* One line; makes §12.7 a *question the game asked* instead of
  a question the game forgot.

**TABLE.** Wind-down. The Map is a nice toy and someone will hover it. Someone asks "so what's Wren's
Sighting?" and the table shrugs. Hint count is checked and mildly argued about. Break point: many tables
will take a drink break here, which is correct — the Prologue is ~35–50 minutes.

**RISK.** `:243` promises the Map shows "the ones you did not [walk]" and the Prologue's graph is a
single unbranched chain of eight nodes (`CANON §13.47`; `ch0.js:32-42`). The first Map the table ever
sees disproves the sentence attached to it. **[PROPOSED]** change the Prologue's line to *"After each
chapter the Hearth shows you the night so far"* and reintroduce the full claim at `ch1_flow`, where the
graph genuinely branches (`ch1.js:83-104`).

---

# T3 — CHAPTER I: THE VIGIL

Duty rotation: **Warden (keyboard) — the Binder; Voice (reads aloud) — the Listener** (`ch1.js:116`, `:160`).

## Beat 14 — `ch1_start` · the Great Hall (`ch1.js:108-119`; art `scenes-ch1.js:62-81`)

**KNOWS (new).**
- **Nine banners, nine Houses, one Master each.** (`:112`)
- **"Tonight is the Vigil: the night the Houses come to look at the child the fire left."** (`:113`)
- At the far end **the Hearth is breathing — up, down, up. Every grown-up here is pretending not to
  watch it.** (`:114`)
- "You are at the back. **Wren waves at you. Wren is not supposed to wave.**" (`:115`)
- Art: the Chair's banner carries **CROWN, a true glyph** — the only legible Founders' mark in the upper
  world (`scenes-ch1.js:30`, `:53`; `CANON §7.6`). And the lintel over the Hearth's arch carries **the
  same eight worn cuts as the Prologue's slab** (`scenes-ch1.js:69-72`).

**LIVE.**
1. *The adults are frightened of the fire and will not say so.* — Evidence: `:114`.
2. *The Houses are a political body with nine votes and the child is the agenda item.* — Evidence:
   `:112-113`.
3. *Wren is not scared.* — Evidence: `:115`.
4. *The eight marks over the fire are the prophecy stone, and they are on screen behind everything.* —
   Evidence: the art (a table may or may not register it as the same object).

**WANT LIVE.** (1) and (4). (1) is the chapter's atmosphere and its true content: everyone in the room
knows the fire is dying and the meeting is nominally about a child. (4) is a two-hour visual plant — the
table stares at eight cuts for the length of the hardest puzzle in the act.

**WANT KILLED.** Nothing yet.

**REALITY.** The eight cuts on that lintel are the sentence that says the fire is four people, and the
one legible glyph in the room is the Chair's — which is, as CANON puts it, "a statement about who owns
the Order's reading" (`§7.6`).

**CRUMBS — planted.** The eight cuts (`scenes-ch1.js:72`). CROWN as heraldry (`:30`). "The child the fire
left" — the narration's own phrasing, which is neither the school's reading nor a denial of it.

**CRUMBS — cheap. [PROPOSED]**
- **B24 — name the lintel as the stone.** One `whisper` line: *"The same eight cuts are over the arch
  here. Every hall in this school has them."* Free; makes the prophecy an environment rather than a
  prop, and sets up ch4's "hung in every hall" overpaint (`ch4.js:533`) as a *pattern of institutional
  repetition* rather than a one-off.

**TABLE.** Re-engagement after the break. The banners get looked at. "Wren waves at you" gets a smile.

**RISK.** None here, but see Beat 17: this is the first of **four consecutive non-interactive scenes.**

---

## Beat 15 — `ch1_dais` · the presenting (`ch1.js:120-130`; art `scenes-ch1.js:83-100`)

**KNOWS (new).**
- **Marrow: "Fourteen years ago this fire went out for one night. When it came back there was a child on
  the stones. I named the child."** (`:123`)
- **"The stone over your heads says one born of four. Tonight I stop arguing and show you."** (`:124`)
- "That is the Provost. She runs this school, and **she is the nearest thing Wren has to a mother.**"
  (`:125`)
- "Wren goes up alone and stands still, which for Wren is enormous." (`:126`)
- **Wren: "Hello. It's me. I'll try not to fidget."** (`:127`)
- Art: Marrow drawn tall and still; **Wren drawn small with a warm orange edge-light**
  (`scenes-ch1.js:94`); and **a gold ring cut into the dais where the child stands** (`:95-96`).

**LIVE.**
1. **Marrow believes the prophecy and intends to act on it.** — Evidence: `:124` — "Tonight I stop
   arguing and show you."
2. **Marrow found Wren; she did not bear Wren.** — Evidence: `:123`, said in public, to nine political
   rivals, under oath-adjacent conditions.
3. *Marrow is going to sacrifice Wren and is about to announce it.* — Evidence: `:124` reads as a
   prelude to a demonstration, and the prophecy is a death sentence.
4. *Marrow loves Wren and this is costing her.* — Evidence: `:125`, plus Wren's ease on the dais.
5. *Marrow is using Wren politically — the child is a claim to authority.* — Evidence: "I named the
   child," said first; the framing is proprietary.
6. *The circle cut into the dais is a mark for exactly one person, and it predates tonight.* — Evidence:
   the art, unremarked (`CANON §12.48`).

**WANT LIVE.** (1), (3), (4) and (5) simultaneously. This is the correct shape for Marrow at T3: the
table should be unable to decide whether she is the child's mother or the child's handler, and the
answer — **she has never allowed them to be two things** (`CANON §9.2`) — is not available yet and will
be the best character reveal in the game.

(6) is the span's best un-activated visual plant: a gold ring, cut into the floor, where the child
stands, in a game that ends with a ring of eight sockets and a name cut into the eighth (`ch7.js:695-699`;
`scenes-ch7.js:25-30`). Nothing in ch1's prose mentions it.

**WANT KILLED.** **"Marrow gave birth to Wren and the fire story is a cover."** — a natural, attractive,
attention-consuming read licensed by `:125` ("nearest thing to a mother") and later by Wren's "Mum." It
leads entirely away from the real story and it makes the grey thread mean the wrong thing.
Killing evidence in the span: `:123` (she says she found it, publicly) and, on one phone,
`companion/ch1.js:147` — *"Wren, on the dais, in front of nine Houses: no thread found. **Not to the
Provost.** Not to you."* A birth-mother bond would be the loudest thread in the room.
**That is a real kill, but it lives on one seat and is framed as a fact about Wren rather than about
Marrow.** **[PROPOSED]** one clause on the Binder's page: *"No thread to the Provost — and whatever
Wren is, that is not what a mother and a child look like."*

**REALITY.** She picked the child up off the stones, named it **WRENN** — *the hollow of a bell* — in the
older alphabet in her own hand, and raised it "to be loved enough to walk back in" (`ch6.js:691-692`;
`companion/ch4.js:202-204`). Her thread to Wren has been **grey — a goodbye already said** — for fourteen
years (`ch4.js:217`). She is not lying in this scene and she is not telling them anything either.

**CRUMBS — planted.** "I named the child" (`:123`) — the single fact that, joined to the Reader's chalked
door, identifies the chalker. The warm edge-light on Wren (`scenes-ch1.js:94`) — worth noting that **the
art does NOT mark Wren as cold in Act I**; the cold `#4fb3bf` edge begins only in ch7 (`scenes-ch7.js:87`).
In Chapter I, Wren is a child lit by a fire, which is both the truth and the misdirection.

**CRUMBS — cheap. [PROPOSED]**
- **B25 — deliver `:124`.** `CANON §12.42`: "Tonight I stop arguing and show you" — and nothing is shown
  in Chapter I. Cheapest fix: make Wren the demonstration and say so — *"and she does not point at the
  stone. She puts a hand on the child's shoulder. That is the whole of the argument."* It pays the
  sentence, it is in character (she is "procedural under pressure," `CANON §9.2`), and it is the first
  physical contact between them, which ch4 will call unprecedented (`ch4.js:749`).
- **B26 — mention the ring in the dais.** One Seer `fine` line: *"There is a circle cut into the dais
  where Wren is standing. It is older than the paint on the steps."* Free. Then `ch7.js:695`'s "The ring
  is full but for one socket" lands as a return.

**TABLE.** Attention high. The Provost is immediately legible as *the one to watch*. Someone says "she's
going to kill that kid." Someone else says "no, she loves them." Both are right and the argument is the
design working.

**RISK.** Low. `:124` writes a cheque the chapter does not cash, and sharp tables notice.

---

## Beat 16 — `ch1_vane` · the doors open (`ch1.js:131-142`; art `scenes-ch1.js:102-120`)

**KNOWS (new).**
- **"Cold first, then soldiers, then a grey coat."** (`:134`)
- **Lord Vane, the Crown's Envoy**, with a writ and a saucer-sized seal. (`:135`)
- **"His Majesty asks one small thing: the child, tonight, for safekeeping."** (`:136`)
- "The Provost does not move. **Vane lowers his voice — not far enough.**" (`:137`)
- **"I have seen what is under the paint in this hall, Ilsabet."** (`:138`)
- **"Nobody knows what that means. Her face does."** (`:139`)
- Art: the Envoy's wax seal is `#8a2f2f` — **exactly Redmoor's House colour** (`scenes-ch1.js:117` vs
  `:14`).

**LIVE.**
1. **Vane has leverage on Marrow personally, not on the school.** — Evidence: `:137-139`; he uses her
   given name in front of her own Convocation.
2. **There is something painted over, in this building, that constitutes evidence.** — Evidence: `:138`.
3. *The Crown wants Wren for a reason it is not stating.* — Evidence: "safekeeping" is a euphemism and
   the game makes it one by pairing it with soldiers.
4. *Vane is the villain.* — Evidence: doors, soldiers, cold, a writ.
5. *Vane and Marrow have a history.* — Evidence: "Ilsabet."
6. *The Crown wants the Cold, and the child is the key to it.* — Evidence: the prophecy says a child
   walks into the Cold and closes it; a Crown that wanted it *closed* would not need to take the child
   away. Available, and rare.

**WANT LIVE.** (1), (2), (5) and especially (6). (2) is the chapter's engine — a named, physical,
*findable* secret, with a witness who will not explain it. (6) is the good hard inference and the game
rewards it at T6 ("The Crown will have the Cold open, one way or another," `companion/ch4.js:213`).

**WANT KILLED.** (4), "Vane is simply the villain" — and **the game kills it deliberately and
immediately**, in the same chapter, with `ch1.js:283`: *"You think I am the villain of tonight. **Ask
your Seer what is under the paint.**"* That is one of the best-constructed kills in the game: the
antagonist's defence is a *homework assignment*, it is verifiable, and it turns out to be true
(`ch4.js:557`: "'I have seen what is under the paint,' the Envoy said. **So he had.**").

**REALITY.** Vane is right about the paint, has been right for twenty-two years, and was exiled into
diplomacy for saying so (`ch7.js:341`). Marrow scraped the same paint herself as a girl and neither ever
acknowledges the other did (`ch7.js:394`; `CANON §12.23`). His seal is the House colour of the one seat
his own soldier is standing behind (`CANON §12.35`) — either a superb unremarked fact or a palette
collision, and the author must rule.

**CRUMBS — planted.** "Under the paint" ×2 in one chapter (`:138`, `:283`), pre-echoed by Wren at
`ch0.js:148`. "Ilsabet" — Marrow's given name, used once, by him, and never again by anyone.

**CRUMBS — cheap. [PROPOSED]**
- **B27 — the seal and the banner.** If the colour match is deliberate, one Seer `fine` line at
  `ch1_vane`: *"The Envoy's wax is the same red as the banner over Seat 6."* Costs nothing, explains why
  Redmoor is the seat he blocks, and gives a sharp table a real piece of politics to chew.
- **B28 — the Crown's motive, hinted.** `CANON §12.32`/W5: the Crown's reason for wanting Wren is never
  given, ever. One Vane clause at `:136` or `:282`: *"His Majesty has an interest in what this school is
  standing on. The child is the cheap part of it."* This kills "kidnapper" and opens "resource," which
  is true, which makes ENDING 4 an argument instead of a mugging, and which pays off the **four pipes**
  of `scenes-ch8.js:76-90`.

**TABLE.** Energy spike. Doors, soldiers, a good villain entrance. "Ilsabet" gets noticed by at least
one person. "Nobody knows what that means. Her face does." is the line the table repeats.

**RISK.** The Seer's ch1 page will shortly say *"You can see **that** there is a shape under it. Not
what."* (`companion/ch1.js:132`) — a withholding that works only because it is explicitly a *promise to a
named seat*. Get the ordering right at the table and it is the chapter's best tension; if the Seer says
"I can't see anything" it reads as the game stonewalling.

---

## Beat 17 — `ch1_flicker` · the vote is called for (`ch1.js:143-153`)

**KNOWS (new).**
- **"This school does not hand its children to a writ. It hands them to a vote. Does the child stay
  tonight? Nine seats. Five keeps."** (`:146`)
- **"Then the Hearth flickers: a long, low bow of the flame. Every face turns to the fire."** (`:147`)
- **"Every face but one. The Provost is looking at Wren."** (`:148`)
- "The bell is in an hour. Until then, **a Master may be spoken to.** Go." (`:149`)
- Above the Masters' door, **a word is cut into the lintel** (`:150`) — it is **THORN**
  (`lore.js:18`), glossed *"a gate; to go through"* (`glyphs.js:19`).
- The flame meter drops to **0.7** (`:144`).

**LIVE.**
1. **Marrow knows something about the fire that the rest of the room does not, and it involves Wren.** —
   Evidence: `:147-148`. This is the chapter's sharpest single observation and it is in the narration,
   not on a phone.
2. *The fire's flicker and Wren are causally linked.* — Evidence: (1), plus the Prologue's fourteen-year
   coincidence.
3. *The school's constitution is genuinely stronger than a royal writ, for reasons nobody explains.* —
   Evidence: `:146` works; Vane accepts it (`CANON §12.60`).
4. *The Provost intends to lose nothing tonight and is buying time.* — Evidence: she converts a seizure
   into a procedure.

**WANT LIVE.** (1) and (2) — this is the moment the table should start suspecting that *the fire and the
child are the same problem*, and it is delivered by a single reversal of attention. (4) is good
character-reading and is confirmed at `:178` ("She is stalling for you").

**WANT KILLED.** Nothing here. Note an unaddressed gap: `CANON §12.60` — what legal force the writ has,
why nine and five, and what the Vigil was convened to decide before Vane arrived, are three questions
with one missing paragraph. At the table this passes unnoticed because the rule card is crisp; flagging
it as a **low-priority withholding** (§1, W9).

**REALITY.** She is looking at Wren because she has been looking at Wren since the night she picked the
child up, with a grey thread already tied — a goodbye said fourteen years in advance (`ch4.js:217`).
The Listener's page has the receipt this very chapter: **her heart skipped twice, while she was looking
at Wren, not the fire** (`companion/ch1.js:118`).

**CRUMBS — planted.** `:148` (paid at T8). The flame meter at 0.7 (paid nowhere explicitly — see B29).
THORN over the Masters' door: the school carves Founders' words over its architecture and uses them as
decoration.

**CRUMBS — cheap. [PROPOSED]**
- **B29 — say the flame bar is the fire.** Once, `small`, here: *"The bar at the top of this screen is
  the Hearth. It was full an hour ago."* The health bar is a two-hour silent plant and a single sentence
  converts it into shared anxiety for the rest of the night. (If the author prefers not to break frame,
  put it in the pause menu.)
- **B30 — read the lintel.** One Reader `fine` line on the ch1 page: *"The word over the Masters' door is
  THORN — a gate; to go through. Nobody in this hall could tell you that."* Free, uses an asset the game
  already built (the attunement word *is* a Founders' glyph), and plants the thesis: the school keeps the
  forms and has lost the content.

**TABLE.** This is where the chapter turns operational — "a Master may be spoken to. Go." The table sits
forward. The Provost-watching-Wren line is usually noticed and usually misread as tenderness only.

**RISK. The span's first genuine sag ends here.** Beats 14–17 are four consecutive prose scenes, ~17
lines, with no input other than "next." It is good prose and it is the longest passive stretch in the
act, arriving immediately before the hardest puzzle. **[PROPOSED]** give the Seer a one-tap observation
during `ch1_vane` (the tapestry) rather than holding everything to `ch1_attune` — it breaks the passivity
at exactly the right point and it is the seat whose payoff is already promised.

---

## Beat 18 — `ch1_attune` · THORN, and the four ch1 pages (`ch1.js:154-162`; `companion/ch1.js`)

**KNOWS (new) — per seat.**

| seat | Sight | Wren tab |
|---|---|---|
| **Reader** | A House that already knows how it will vote **files in writing before the doors shut**; the Reader can read the roll from the back (`:91`). **Two Houses filed: Seat 9 KEEP in the Chair's own hand; Seat 3 KEEP — "with the Chair."** (`:94-95`) The other seven filed nothing, **and nothing filed means SEND** (`:97`). "So you begin with two… You need five." (`:98`) And a warning: **"Whatever you hear about Seat 3 tonight, an ask spent there buys a vote you have."** (`:99`) | *"The Envoy said it out loud: **under the paint.** You know every word in this hall. You have never thought of the tapestry as something with words underneath."* (`:101`) · *"When the fire bowed, every Master watched the fire. **You watched the Provost. She was watching Wren.**"* (`:102`) |
| **Listener** | Four murmurs, playable as audio: **Seat 1** — "unless somebody comes and asks me **to my face**"; **Seat 3** — "Ask me where I stand. Go on. **Ask me.**"; **Seat 4** — "I vote as my cousin votes. I hear nobody else"; **Seat 7** — "Nobody has asked me anything. I have not decided anything." (`:108-111`) ⇒ **1, 3 and 7 are open; Seat 4 has shut his ears** (`:112-113`). "He never says who his cousin is. Somebody here can see that." (`:114`) | Heartbeats: **nine Masters steady; the Envoy fast; Wren — nothing to catch, as always** (`:116-117`). And: **"the Provost's heart skipped twice — while she was looking at Wren, not the fire."** (`:118`) |
| **Seer** | Three things under this hall: **Seat 5 — a Crown coin under the cushion; Seat 8 — the same coin in the sleeve; Seat 6 — a soldier of the Envoy's behind the chair** (`:125-127`). "Bought, bought, out of reach. **An ask spent on 5, 6 or 8 is spent.**" (`:130`) | *"Under the tapestry there is older paint. **You can see that there is a shape under it. Not what.** The Envoy was looking at that wall when he said it."* (`:132`) · **"In the dormitory you blamed the lamp. There is no lamp here, and Wren's shadow still falls towards the fire."** (`:133`) |
| **Binder** | **Two red threads in the whole hall: Seat 2 sworn to Seat 1; Seat 4 sworn to Seat 6 (cousins)** (`:141-142`). "**One ask can be worth two votes**" (`:144`). "You cannot see who is pledged, who will listen, or who has been paid. **Ask.**" (`:145`) | **"Wren, on the dais, in front of nine Houses: *no thread found.* Not to the Provost. Not to you. Not unbound — you know unbound. Something else."** (`:147`) · *"And when the fire bowed you thought you saw a thread from the Provost to Wren. Then the light came back, and you are not sure what colour it was."* (`:148`) |

**LIVE (new, beyond beat 17).**
1. **The Crown has bought at least two of the nine and is physically blocking a third.** — Evidence: the
   Seer's page. The institution is already compromised before the vote.
2. **Vane's heart is the only fast one in the room** — he is not calm, he is performing calm. — Evidence:
   `:116-117`.
3. **Marrow is frightened, and only one person in the world can tell.** — Evidence: `:118`.
4. **There is a thread from Marrow to Wren and none coming back.** — Evidence: `:147-148` read together.
   *This is the correct and complete shape of the Marrow–Wren relationship, available at T3*, six
   chapters before `companion/ch4.js:271` states it ("A thread reaches Wren from the woman who named her.
   **Nothing comes back**").
5. **The colour of that thread matters and the Binder let it go.** — Evidence: `:148`'s "you are not sure
   what colour it was" — which is a *refusal*, not an inability, as ch3 makes explicit
   (`companion/ch3.js:276`: "decided long ago not to look").
6. **Wren's anomaly is not an artefact of the dormitory.** — Evidence: `:133` — "There is no lamp here."
   This is the game killing the Seer's rationalisation on schedule, one chapter after planting it.

**WANT LIVE.** (1), (3), (4), (5). (5) is the most elegant thing on any Act I phone page: the Binder is
given a piece of evidence *and a confession of having flinched from it*, which makes the later reveal
the Binder's own fault to fix. (4) is the span's other great early-aha: a table that joins "thread from
the Provost, nothing back" with "no heartbeat" can conclude at T3 that **whatever Wren is, it is not
something that can be tied to** — and that is the literal answer (`companion/ch8.js:126`).

**WANT KILLED.** The Seer's "it was the lamp" (killed at `:133`, explicitly and on schedule). And
"Marrow is cold about this" — killed by `:118`, on one phone, where only the Listener can see it, which
is exactly right.

**REALITY.** Every one of these eight facts is true and correctly partitioned. `CANON §13.7` flags that
ch2 will later draw Wren with an *absent-thread* glyph while ch4 says threads reach toward Wren but none
originate in Wren — the ch1 page already states the right version (`:147-148`) and it is ch2 that drifts.
**The fix belongs in ch2; ch1 is clean.**

**CRUMBS — planted.** Everything above. Note especially the **decoy structure**: the Listener hears Seat 3
begging to be asked, and the Reader knows Seat 3 is already pledged. Two seats, opposite valences, one
trap. That is the chapter's whole thesis about information in one object.

**CRUMBS — cheap. [PROPOSED]**
- **B31 — the Order, named to the Binder.** `CANON §12.3`: whether the Order and the Convocation are the
  same body is never settled, and this is the chapter where the word *Convocation* first appears
  (`ch1.js:255`, win path only). One Binder `fine` line: *"They call themselves the Convocation. Your
  Book calls the ones who struck Law 0 the Order. Nobody has ever told you whether that is two names or
  two bodies."* Conditional on the author's §12.3 ruling; if the ruling is "same body," this line plus
  the Prologue's strikethrough (B14) makes the ch1 vote a scene about **the direct heirs of the
  cover-up**, which sharpens it enormously at zero cost.

**TABLE.** Second silence of the evening, and a busier one — people are reading numbers. Then a
scramble: four people trying to say "seat 5 and 8 are bought," "seat 4 is deaf," "2 follows 1," "9 and 3
already filed" across each other. **This is the moment the table discovers it needs a protocol.** Some
tables invent one (go round in seat order); the ones that do not, lose.

**RISK.** Information density peaks here and at beat 19. The Reader alone must convey four facts (two
filings, the default, the Seat-3 warning). It is a *lot* to hold verbally, and the game deliberately
forbids the obvious workaround.

---

## Beat 19 — `ch1_vote` · the hour before the bell (`ch1.js:164-225`)

Seats puzzle. Nine seats, **two asks**, one commit ("The vote is called once"), 6-minute timer. The
only winning pair of the 28 is **{Seat 1, Seat 7}** (`ch1.js:43-49`). At 6:00 the bell rings, the
Provost stalls, and all three hint tiers are granted at once (`:183-192`).

**KNOWS (new).**
- The Chair's rule card: *five of nine keeps; you may ask two; a Master you ask votes KEEP unless they
  will not hear you, you cannot reach them, or the Crown has paid them; a Master sworn to another votes
  as that Master does, unless you ask them yourself; everyone else votes SEND.* (`:181`)
- Per-seat feedback on the ask (`:60-70`), each of which teaches the rule that stopped it.
- **"The Chair does not hear cases. The Chair counts them."** (`:69`, `:74`)
- On the stall: **"The Chair has not finished hearing the Masters." She is stalling for you.** (`:178`)

**LIVE.**
1. **The institution is bought, deaf, absent or already committed in six of nine seats.** — Evidence:
   merge the four pages: 9 and 3 pledged; 5 and 8 bought; 6 blocked; 4 deaf. Only 1, 2 and 7 are
   actually reachable.
2. **The Chair is not neutral and everyone knows it.** — Evidence: she filed KEEP in her own hand
   (`companion/ch1.js:94`) and then reads out the rule about not hearing cases.
3. *The vote is winnable but only just, and the margin is exactly one right decision.* — Evidence: the
   arithmetic.
4. *The Crown did not need to buy a majority — only enough to make the school's own procedure fail.* —
   Evidence: two coins and one soldier are sufficient to make 5 of 9 hard.
5. *These nine people are the descendants of whoever wrote the school's translation.* — Evidence:
   available only with B4/B14/B31, or to a Binder who reads their own Book carefully.

**WANT LIVE.** (1) and (4). (4) is the best political observation available in Act I and it is entirely
derivable from the board: a table that says "he didn't buy the vote, he bought the *difficulty*" has
understood the Crown before meeting it again.

**WANT KILLED.** **"Ask the Master who is begging to be asked."** — Seat 3's murmur (`companion/ch1.js:109`)
is a trap and the Reader holds the antidote (`:99`). The game kills it *if and only if the table
shares before acting*, which is the point.

Also to be killed and **not killed cleanly**: *"Asking Seat 2 is a waste."* Quill's on-ask text
(`ch1.js:62`) says *"I vote as Seat 1 votes. **You spent that on nothing.**"* — and `CANON §13.25` shows
this is **mechanically false**: asking Quill does flip him, and `{quill, oriel}` scores four keeps,
strictly better than not asking. The line is true only when Sorrel is the other ask. **A table that asks
Quill is told by the game that they wasted an ask when they did not**, which is worse than a trap; it is
misinformation from the narrator. **[PROPOSED] fix:** *"Seat 2 says yes, then says the rest: 'I vote as
Seat 1 votes. You could have had me for free — if you had gone to her.'"*

**REALITY.** Base KEEP is {Marrow 9, Brack 3} = 2; of 28 askable pairs exactly one reaches five
(`CANON §3.4`). The chapter is a fair, brute-forced deduction and the four-seat partition is genuinely
necessary: a table missing any one seat either stalls or calls a wrong pair.

**CRUMBS — planted.** The rule "a House that knows its vote files in writing before the doors shut" —
i.e. **institutions record their commitments and the record is readable**, which is the Binder's whole
job and the Book of Laws' whole existence. Also: "nothing filed means SEND" — the default of this
institution is to give the child away, which is the 212 decision in miniature, rendered as a voting rule.
Nobody says so.

**CRUMBS — cheap. [PROPOSED]**
- **B32 — name the default.** One `whisper` line under the rule card: *"Seven Houses filed nothing.
  In this school, saying nothing is a vote."* It is already true, it costs one line, and it is the exact
  moral of Year 212 (`companion/ch6.js:286`: "They struck the Law and called it grammar").

**TABLE. The act's peak of both engagement and stress.** Four people, nine numbered seats, two asks, a
visible clock. Real argument. Somebody will want to ask Seat 3 because they "heard him ask." Somebody
will insist on going round in order first. The winning table has a Binder who says "one ask can be worth
two" and a Reader who says "we already have two." Expect 8–15 minutes, at least one near-miss, and
genuine tension at the commit button (the widget says **Call the vote** and there is no undo).

**RISK. The single highest overload point in the span, by a distance.**
- Nine entities identified only by number, four private fact-sets, a two-ask cap, a commit-once rule, a
  timer, and a losable outcome — as **puzzle #3 of the evening**.
- The decoy (Seat 3) punishes exactly the behaviour the previous puzzle rewarded: acting on a single
  seat's clean, confident, audible information.
- The permanent-loss branch (`VOTE_LOST`) is reachable in under a minute by a table that presses
  "Call the vote" early; `:200` catches the <2 case with a nudge, but two *wrong* asks commit.
- Mitigations already in place and good: the bell-stall grants all three hint rungs and *counts* them
  honestly (`:186-189`); the hint ladder is well-graded; and the loss branch is written to be survivable
  and even poignant.
- **[PROPOSED]** one extra confirmation on the commit when fewer than two Masters are pledged-plus-asked
  — not a hint, just "The Chair will not count twice. Call it?" The chapter's design intends the vote to
  be *decided*, not *fumbled*.

---

## Beat 20a — `ch1_won` · five to four (`ch1.js:226-236`)

**KNOWS (new).**
- **"The Provost lets out a breath so small that only the Listener catches it."** (`:229`)
- "The child stays. Lord Vane, we thank the Crown for its concern." (`:230`)
- **"Vane bows. It is a very good bow. He has done it to people he later ruined."** (`:231`)
- **Wren: "That was you. I watched the Binder walk up to Seat One. The Binder doesn't walk up to
  anyone."** (`:232`)
- "Then the two Masters who said yes are at your elbows, and neither is smiling now." (`:233`)

**LIVE.** (1) *Winning cost something and the bill is arriving immediately.* (2) *Vane has not lost; he
has deferred.* (3) *Wren watches the four as closely as they watch Wren.*

**WANT LIVE.** All three. (3) is the payoff of `ch0.js:226` and is the game noticing the *players'
characters* rather than the players — the Binder is a person who doesn't walk up to anyone, and that is
established retroactively and for free, by a fourteen-year-old.

**WANT KILLED.** "We won, so this is over." — killed in the same breath by `:233`.

**REALITY.** Sorrel and Oriel are the only two Masters ever named to the player, and only here
(`CANON §3.4`): **a `VOTE_LOST` table finishes Chapter I knowing no Master's name but Marrow's.**

**CRUMBS — planted.** `:231` is Vane's entire future in one sentence.

**TABLE.** Elation, then the immediate "oh, there's a catch." Perfect rhythm.

**RISK.** None.

---

## Beat 20b — `ch1_lost` · four (`ch1.js:237-248`) · branch `VOTE_LOST`

**KNOWS (new).**
- **"A vote is called once, and the hall does not count twice."** (`:240`)
- Vane: "The school has voted. **His Majesty is grateful, and will not forget it.**" (`:241`)
- **"Wren looks at you — not frightened. Surprised. Wren had assumed you would manage it."** (`:242`)
- "Then Wren goes with them, and **does not fidget once**." (`:243`)
- Marrow, low, at the back of the hall: **"Then bring me the Cold Ember from under the school. I will get
  the child back myself."** (`:245`)
- `WREN_TRUST` −1 (`:213`).

**LIVE.** (1) *We did this.* (2) *Marrow has a plan B and it was ready.* (3) *The Cold Ember is a thing
that exists, under the school, and matters.* (4) *Wren's stillness is not calm.* — `ch0.js:127`'s "I'll
try not to fidget" is now a duress meter and the table may or may not catch it.

**WANT LIVE.** (2) and (4). (2) is important: on the losing branch, Marrow names the Ember *first and
personally*, which is a compensating information gift to a table that just lost one.

**WANT KILLED.** "The game is unwinnable now / we should restart." — the branch is written to be
survivable and is, but nothing on screen says so. **[PROPOSED]** one `small` line: *"The night is not
over. It has only got harder."*

**REALITY.** Wren is retrieved by Marrow personally before midnight (`ch3.js:438`) — Vane predicts this
correctly and inexplicably (`CANON §12.61`). The losing table will be told, in ch1's own `ch1_offer`, that
"the Provost will have the boy back by morning," which is a genuine mystery with real evidence: **how
does he know?**

**CRUMBS — planted.** The fidget meter (`ch0.js:127` → `:243` → `ch1.js:305`). Vane's foreknowledge.

**TABLE.** Guilt, and it is real guilt because it is theirs. "Wren had assumed you would manage it" is
the cruellest line in the act and it is doing correct work. Expect a quiet minute and a determination to
fix it.

**RISK.** A losing table enters ch2 with **less information** (no Master named, no prices scene, `NEITHER`
forced, `CANON §13.45`) *and* less standing. That double penalty is intended but steep. Note for the
author: `NEITHER` is overloaded here — downstream code cannot distinguish "refused both prices" from
"never offered any."

---

## Beat 21 — `ch1_prices` · two prices, forty-five seconds (`ch1.js:249-271`) · win path only

**KNOWS (new).**
- **"Seat 1 is Master Sorrel. Seat 7 is Master Oriel."** — the only two Masters ever named. (`:254`)
- **Sorrel: "Under this school is a thing called the Cold Ember. When the Provost sends you down for it,
  it comes to the nine of us — the Convocation. Not to her."** (`:255`)
- **Oriel: "Tell me what you find down there. All of it."** → "Even the parts you don't like." (`:256`, `:266`)
- Forty-five seconds; the Provost is crossing the hall. (`:252`, `:257`)

**LIVE.**
1. **There is a body called the Convocation and it does not consider the Provost to be it.** — Evidence:
   `:255`.
2. **Sorrel already knows about the Cold Ember and about an errand the Provost has not announced.** —
   Evidence: `:255` — "When the Provost sends you down for it."
3. **Oriel expects what is down there to be unpleasant and is not surprised by it.** — Evidence: `:256`,
   `:266`, plus "she watched me like a sum she was doing" (`:306`).
4. *The nine are not a united body; there is a faction that wants leverage over the Chair.* — Evidence:
   (1) + the price itself.
5. *Oriel knows something specific.* — Evidence: her price is information, not property; people ask for
   information when they want confirmation.

**WANT LIVE.** (2), (3), (5). (5) is paid handsomely on the `ORIEL` branch at T6, where her note reveals
she scraped the paint herself as a girl and watched *them* repaint it inside the week
(`ch4.js:588`) — making her the only Master with independent knowledge of the cover-up. A table that
reads her forty-five-second price as "she already knows and wants a witness" has read her exactly right,
at T3, three chapters early. **Excellent, and unprompted.**

**WANT KILLED.** Nothing. But flag: `CANON §13.26` — **Sorrel predicts both the errand and the couriers
before Marrow has decided on them** (`:255` vs `:310`, where Marrow visibly changes her mind mid-sentence:
"In the morning I would have sent — no. Tonight."). A sharp table *will* notice; and the available
readings are interesting (Sorrel has a source in the Provost's study; the Convocation has been waiting
for this for years; the errand is obvious to anyone who knows the fire is dying). **[PROPOSED]** rather
than fixing the order, make it deliberate: Sorrel adds *"She will. She has no one else to send."*

**REALITY.** Sorrel's price is institutionally ambitious and will, if honoured, cost the table the Cold
Ember at the top of the vault stair (`ch2.js:383`) and crack a bell on Mere's gate five chapters later
(`companion/ch5.js:27`). Oriel's price costs nothing and **by itself restores Law 0 to the Binder's Book**
(`ch4.js:85`; `CANON §13.17` — "the largest unexplained causal jump in the game"). Neither consequence is
signposted.

**CRUMBS — planted.** "the nine of us — the Convocation" — the body's name, first use. "Even the parts you
don't like." "Sorrel does not forget." (`:266`)

**CRUMBS — cheap. [PROPOSED]**
- **B33 — motivate the Oriel → Law 0 jump.** `§13.17` needs one line of fiction for a mechanic that
  already ships. Add to Oriel's `after`: *"And if you find something that has been painted over — I will
  know what it is. I have seen it."* Now a promise to Oriel plausibly earns a note back, and the Book's
  flip in ch5 has a cause.

**TABLE.** Panic in the good way. Forty-five seconds is short enough that the choice is made on instinct
and argued about afterwards, which is exactly right for a game about promises. Expect one player to want
Oriel ("information is free") and one to want Sorrel ("don't annoy the powerful one") and the timer to
decide it.

**RISK.** The two prices are presented as symmetric and are wildly asymmetric in consequence (Sorrel
costs a plot object and a bell; Oriel costs nothing and grants a Law). That is defensible as hidden
information, but it means the table's most-discussed Chapter I decision is, mechanically, "free vs
expensive" with no tell. **[PROPOSED]** give Sorrel's option a visible tell in the `sub:` line —
*"She will send someone to collect."*

---

## Beat 22 — `ch1_offer` · the Envoy in the passage (`ch1.js:272-295`)

Sixty seconds; timeout defaults to **refuse**.

**KNOWS (new).**
- **"Bring the boy to me before dawn."** (`:281`) — or, on `VOTE_LOST`, *"The Provost will have the boy
  back by morning. When she does — bring him to me before dawn."* (`:280`)
- **"He lives. I promise you that. And the Crown makes the four of you Masters."** (`:282`)
- **"You think I am the villain of tonight. Ask your Seer what is under the paint."** (`:283`)
- "He waits." (`:284`) / *"Sixty heartbeats. He is very good at waiting."* (`:276`)
- Refuse → **"Then I will ask again later, when it costs more."** (`:289`)
- Pretend → **"Wise. Or a lie. I can use either."** (`:291`)
- Accept → "Before dawn. My captain will know your faces." + **"For a moment he looks like a man handed
  something heavier than he asked for."** (`:293`)

**LIVE.**
1. **Vane believes he is the one telling the truth in this building.** — Evidence: `:283`.
2. **There is a real, checkable thing under the paint and the Seer is the instrument for it.** —
   Evidence: `:283` names the gift unprompted; the Seer's page already confirms a shape exists
   (`companion/ch1.js:132`).
3. **Vane keeps promises and expects others to.** — Evidence: `:282`, `:289`, `:291`, and the
   `VANE_ACCEPT` flinch at `:293`.
4. *The Crown's real interest is not the child.* — Evidence: he offers four masterships for one child,
   which is an absurd price unless the child is a means.
5. *(VOTE_LOST only)* **Vane knows Marrow will get Wren back — better than the Convocation does.** —
   Evidence: `:280` (`CANON §12.61`).

**WANT LIVE.** (1), (3), (4), (5). (5) is the losing branch's compensation prize and is a genuinely good
mystery: a table that asks "how does he know that?" is one inference from "these two have known each
other a long time," which is true and lands at T9 ("Twenty-two years. I stood in your Hall…", `ch7.js:341`).

**WANT KILLED.** "Accepting is a free experiment." — **and the game does not kill it, at all.** The
choice is presented with a `cls: 'dark'` and a `sub:` line that reads as an *upside* ("Wren lives, he
says. Masters, all four."), and the consequences are entirely offstage: `VANE_ACCEPT` makes the four
themselves bought (`companion/ch3.js:236`), buys a `word` option at the Tower door, suppresses Marrow's
unsent letter, warms Vane in ch7, and feeds directly into ENDING 4's `kept >= 2` test. A table that
accepts "to see what happens" in minute 70 has materially changed the ending and has been told nothing.
**[PROPOSED]** not a warning — a *character* line. Wren, in `ch1_after`, on accept: *"You were a long
time in that passage."* Nothing more. It costs one line and converts an invisible mechanic into a
visible unease.

**REALITY.** Vane does not lie, ever, and that is the horror of ENDING 4 (`ch8.js:355-356`: "as promised"
×2). His private aim — told the Convocation the truth and was exiled for it — is why showing him the
wall in the Finale deletes his ending entirely (`ch7.js:332`, `:342`). The mastership offer is real.

**CRUMBS — planted.** "Ask your Seer what is under the paint" — an antagonist issuing a *verifiable*
homework assignment. `:289` — "when it costs more" — he prices refusal rather than punishing it, and he
does exactly that at T9 (`ch7.js:493-501`).

**CRUMBS — cheap. [PROPOSED]** B28 (the Crown's motive) belongs here as much as at beat 16.

**TABLE.** The best-argued sixty seconds of the act. Somebody always wants to pretend-accept. The
`VANE_PRETEND` response ("Wise. Or a lie. I can use either") is the line the table quotes for the rest of
the night, and it is a superb piece of design: the clever option is met with a shrug, which teaches that
this man is not beatable by cleverness.

**RISK.** See "want killed" above — the invisible-consequence problem. Also: a table that times out gets
`refuse` silently, which is the right default but is not announced.

---

## Beat 23 — `ch1_after` and `ch1_flow` · the night moves on (`ch1.js:296-326`)

**KNOWS (new).**
- *(win)* **Wren: "Seat Seven watched me the whole time. Like I was a sum she was doing. Seer, what is
  *on* that wall?"** (`:306`)
- *(loss)* **"It's fine. They have a warm room. I've never had a warm room." — Wren is lying, and is
  fourteen, and is doing it for you.** (`:302-303`)
- The Provost, back to the fire, as it coughs: **"It has not done that in fourteen years. Under this
  school the Founders left the Cold Ember. If the fire goes out, the Ember lights it again."** (`:309`)
- **"In the morning I would have sent — no. Tonight. I am sending you tonight."** (`:310`)
- Flow stats: the vote, the price, the Envoy's offer, hints. (`:320-322`)

**LIVE.**
1. **The Hearth's behaviour tonight is unprecedented in fourteen years and the Provost is treating it as
   an emergency.** — Evidence: `:309`, plus the flame meter's fall across the chapter.
2. **The fire is mortal, and the school has one spare.** — Evidence: `:309`. *This is the premise the
   whole night runs on.*
3. **Marrow changed her mind about the timing in the middle of a sentence, and will not say why.** —
   Evidence: `:310`.
4. **Wren knows the fire's flicker and Wren's own situation are the same event.** — Evidence: Wren has
   watched Marrow watch the fire; and on the win path Wren's immediate question is about the *wall*, not
   the vote.
5. *The Cold Ember is a Founders' object and therefore probably needs four people.* — Evidence: every
   Founders' object so far has.
6. *Marrow is sending four fourteen-year-olds rather than adults, and there is a reason she is not
   giving.* — Evidence: `:310` (`CANON §12.43`).

**WANT LIVE.** (1), (2), (3), (6). (3) and (6) are the chapter's closing hooks and both are genuine:
the table *should* leave Chapter I knowing that the Provost has just done something out of character and
declined to explain it.

**WANT KILLED.** "The Cold Ember will solve the problem." — **the game wants this alive and should**, and
it is false: the Ember's only stated function is Marrow's single uncorroborated sentence
(`CANON §4.3`), it is never invoked at the Finale where the fire actually goes out (`ch7.js:681`;
`CANON §13.11`), and whether it still works after being dropped is never answered (`§12.13`). This is the
game's best sanctioned false hope and the table should carry it for six chapters.

**REALITY.** The fire is dying because four people is a finite quantity of fire and four hundred years is
how long it takes to spend it (`ch6.js:850`). The Ember is the school's insurance policy against a
failure it has never had to survive. Marrow is sending them tonight because the Envoy knows what is under
the paint and by morning so will the nine — but the game never says so (`§12.43`).

**CRUMBS — planted.** `:309` — the Ember, the mortality, and the school's answer to it, in three
sentences. `:306` — Oriel's scrutiny, paid at T6. `:310` — the visible change of mind.

**CRUMBS — cheap. [PROPOSED]**
- **B34 — give `:310` its reason.** *"In the morning I would have sent — no. Tonight. The Envoy has seen
  what is under the paint, and by morning so will the nine. I am sending you tonight."* One clause, and
  it closes half of §12.43, ties Vane's lever to Marrow's decision, and makes the chapter's two plot
  threads one.
- **B35 — the fire is not fed.** If B1 was not taken at beat 1, take it here, in Marrow's mouth: *"It has
  not done that in fourteen years. Nobody feeds it. Nobody ever has."* Same payoff, later, still free.

**TABLE.** Launch energy. The chapter ends with a mission and a clock. The flow map gets read and the
"paths you did not walk" get argued about. Chapter I runs 45–70 minutes; a table is now about 90–120
minutes in and fully invested, or it never will be.

**RISK.** `CANON §13.28`: on `VOTE_LOST`, the Cold Ember is introduced twice — once at `:245` and again at
`:309` as though new, because `ch1_after` is shared by both branches. A losing table hears the same
revelation twice in ten minutes. **One-line conditional fix.**

---

# 1. THE HYPOTHESIS SPACE AUDIT

*Is the set of live possibilities interesting, or merely ambiguous? A mystery where the honest answer is
"I have no basis to guess" is withholding, not intrigue.*

## 1.1 The verdict

**Act I's hypothesis space is unusually healthy.** The reason is structural rather than literary: the
four-way partition means most open questions arrive as *evidence held by a named person*, not as
narration declining to say. A question one player can answer and three cannot is intrigue by
construction. The span's failures are concentrated in the places where the game speaks in its own voice
and withholds — the Prologue's cold open, and the two things Marrow and Vane both decline to explain.

Counted across the span: **19 substantive live hypotheses**, of which 14 are licensed by concrete
evidence a table can point at, 3 are licensed by counting (the four-motif), and **4 are withholding** —
listed below. That ratio is good. A span that ends with the table holding five mutually exclusive
theories about what Wren is, each owned by a different seat, is doing the job.

## 1.2 The withholding points — flagged

| # | the question | why it is withholding | cost of fixing | proposed line |
|---|---|---|---|---|
| **W1** | **Why did the Hearth go out fourteen years ago?** | Zero evidence, anywhere in the game, ever (`CANON` timeline, ≈Year 386: "**Why is never stated**"). It is named in the **Prologue's own title** (`ch0.js:29`, *The Night the Hearth Guttered*) and posed as the first fact of the fiction (`:51-52`). The table will ask it in minute three and can form no hypothesis but "magic." **The largest withholding in the span, and it is on the game's own marquee.** | one line | `ch0.js:52`, `small`: *"Nobody has ever said why."* — converts a gap into an acknowledged open question. Better still, give it an owner at `ch1.js:309`: Marrow — *"I have a guess. I have never said it in this hall."* |
| **W2** | **What is a "wound in the world"?** | The phrase is used at `ch0.js:49` and three more times in the game and never unpacked (`CANON §12.1`). At T1 the player can hypothesise about what it *does* and nothing about what it *is*. | one clause, or a ruling | The art already leans "a breach onto somewhere else" (`scenes-ch5.js:69-70`). CANON recommends *(b) an absence that behaves like a place*. Either way: one image at `ch0.js:49` — *"a place where the world had gone thin"* or *"a place where something had been taken out"* — gives the table a shape to argue about. Currently they have a metaphor with no referent. |
| **W3** | **Why does the Crown want Wren?** | "Safekeeping" (`ch1.js:136`) is a euphemism, not a motive, and the game never supplies one — not in Act I, not anywhere (`CANON §12.32`). The player is offered four masterships for one child and given no model of the buyer. | one clause | **B28**: *"His Majesty has an interest in what this school is standing on. The child is the cheap part of it."* Kills "kidnapper," opens "resource," and pre-earns ENDING 4. |
| **W4** | **What is Wren's own Sighting?** | Created in the same breath as the rule — "one to a person, and nobody chooses which one they get" (`ch0.js:241`) with Wren standing in the room — and never addressed anywhere. A table *will* ask it at `ch0_flow`. | one line | **B21**: Wren — *"Mine never turned up. Mum says it might not."* |

**Borderline, and ruled NOT withholding:**

- **What is under the paint?** (`ch1.js:138`) — the Seer is explicitly told *that* a shape exists and
  that reading it is not yet possible (`companion/ch1.js:132`). That is a **promise with a named
  addressee**, which is the best form a withheld fact can take. Praise, do not fix.
- **What is the Cold?** — `ch0.js:64` says outright "nobody will tell you where," which converts a
  refusal into a plot point. The table knows it is being kept from something *by people*, which is
  intrigue.
- **Why are there exactly four Sightings and four Founders?** (`CANON §12.7`) — never confirmed, but the
  player has real evidence (four keys, four gifts, four slots, four founders, four hands) and can build
  a genuine argument. This is **interesting-but-never-paid**, a different and lesser flaw: the game asks
  the player to notice a pattern and then never acknowledges that they were right. **B23** costs one
  line and converts it to an asked question.
- **Why nine seats and five keeps; what force the writ has** (`CANON §12.60`) — a genuine gap, but the
  rule card is crisp enough that no table stumbles. **Low priority (W9).**

## 1.3 Places where the space is *too* narrow

One, and it is the Prologue's cold open. Between `ch0_start` (beat 1) and the Wren tabs (beat 11) — nine
beats, perhaps twenty-five minutes — the only live question about Wren is "foundling or something else,"
and the game has given almost no basis for the second horn. The blue flare (`ch0.js:169`) is the sole
piece of evidence in that window and it is unremarked (`CANON §12.47`). **B12** (seven words) roughly
doubles the hypothesis space of the Prologue's middle third for free.

## 1.4 Places where the space is *correctly* wide

Beat 11 (the four Wren tabs) holds **five** simultaneous live readings, each licensed by a different
gift and therefore owned by a different person. That is the design's high-water mark and the model for
everything else. Beat 15 (Marrow) holds four, in two opposed pairs (mother/handler, believer/user), and
the true answer is that she is all four at once — the best character construction in the game.

---

# 2. THE AHA LEDGER

*Every intended aha in the span: is it earned by evidence the player actually had, and could a sharp
player have got there one beat early? Getting there one beat early is the ideal.*

| # | the aha | intended at | earliest available | earned? | verdict |
|---|---|---|---|---|---|
| **A1** | **Wren is not an ordinary child.** | Beat 11 (the four Wren tabs) | **Beat 1** — "when it came back, there was a baby asleep on the stones" + the chapter title | **Yes, four times over.** | **Ideal.** The game lets a sharp table get there in minute three and then *rewards* them at beat 11 with four independent confirmations rather than a correction. This is the pattern to copy. |
| **A2** | **All four of us have been hiding the same kind of thing, and we each blamed ourselves.** | Beat 11 | Beat 11 — by construction | **Yes.** Each player earned their own half years before the game started; the aha is the *union*, and the union is impossible before somebody speaks. | **Correctly manufactured simultaneity.** The only aha in the game that *must* be sprung, and it is sprung by the players on each other, which makes it theirs. |
| **A3** | **The school's translation of the prophecy is not the stone's meaning — and it has an author.** | T8 (`ch6.js:827`) | **Beat 2 + Beat 9** — the art caption **THE ORDER'S READING** (`scenes-ch0.js:78`) joined to the Binder's Book, which dates Laws to "Founders' (Year 0) or **Order's** (Year 212 or 340)" (`book.js:122`) and shows **Law 0 struck by the Convocation in 212** (`lore.js:57`) | **Technically yes; practically no.** Both halves are shipped and neither is prompted; one is a caption, one is a Book tab most Binders open once. | **The span's biggest missed opportunity.** Six chapters early is available and the game does nothing to help. **B4** (date the translation) and **B14** (surface Law 0 on the Binder's Sight page) together make it *findable* without making it easy. |
| **A4** | **Marrow is not looking at the fire because she already knows about the fire — she is looking at the thing the fire is about.** | T8 | **Beat 17**, on the Hearth, in narration: "Every face but one. The Provost is looking at Wren." (`ch1.js:148`) — corroborated privately at `companion/ch1.js:102` (Reader) and `:118` (Listener: her heart skipped twice) | **Yes.** Three surfaces, one chapter, no hint needed. | **Ideal.** Available one beat early (a table that catches `:148` beats the phone confirmation by a scene). |
| **A5** | **The antagonist is right about something, and it is checkable.** | Beat 22 (`ch1.js:283`) | **Beat 16** (`ch1.js:138-139` — "Nobody knows what that means. Her face does.") | **Yes.** | **Ideal**, and the best-constructed kill in the span: the villain's defence is a homework assignment addressed to a specific player. |
| **A6** | **The Hearth is dying, not flickering. The night has a clock.** | Beat 23 (`ch1.js:309`) | **Beat 17** — the flame meter drops to 0.7 (`ch1.js:144`) while the prose says "a long, low bow of the flame" | **Yes for a table that watches the bar; no for one that does not.** The bar is never identified. | **One beat early is available and invisible.** **B29** (one sentence naming the bar as the Hearth) converts a silent plant into shared dread for six chapters. |
| **A7** | **Four is not a coincidence; four is a requirement.** | T9 (Law 0 enacted) | **Beat 10** — "Four hundred years, and it needed all four of you" (`ch0.js:215`), on top of four keys (`:88`), four gifts, four slots | **Yes, emphatically.** | **Ideal.** The game teaches its ending as a motor skill in minute eight. |
| **A8** | **Wren knows things only one of us can perceive.** | never — it is not framed as a reveal at all | Beat 8 (`ch0.js:171-174`) | **No.** The narration does not mark it; no character asks; `CANON §12.21` calls it "the largest unexplained thing in the game." | **[UNEARNED] in reverse — a plant the player will file as UI.** The fix is fourteen words (**B12/B22**): *"Nobody asks how Wren knows what is cut under four hundred years of brass. Nobody ever has."* |
| **A9** | **The Provost is the one who chalked Wren's name on the door, twice, in two alphabets.** | T6 (`companion/ch4.js:202-204`: the Vigil roll, WRENN, in her own hand) | **Beat 15** — "I named the child" (`ch1.js:123`) joined to the Reader's chalk (`companion/ch0.js:99`) and the Book's "the older alphabet, which you have not learned" (`book.js:75`) | **Yes** — every piece is on the table at T3. | **The best available early-aha in the span, and entirely unprompted.** No fix needed; it is the reward for a table that talks. (`CANON §12.16` leaves the answer unruled; if the author rules "Marrow," this inference becomes canon-correct and the beat costs nothing.) |
| **A10** | **Whatever Wren is, it is not something a thread can be tied to.** | T6 (`companion/ch4.js:271`) | **Beat 18** — the Binder's "no thread found. Not to the Provost. Not to you. **Not unbound** — you know unbound" (`companion/ch1.js:147`) plus "you thought you saw a thread from the Provost to Wren" (`:148`) | **Yes.** | **Ideal**, and the phrasing at `:147` is precise enough to support the true answer without giving it. |
| **A11** | **The Crown did not buy the vote; it bought the difficulty.** | never framed | **Beat 19**, purely from the board | **Yes** — two coins and one soldier are exactly enough to make five-of-nine hard. | **A free aha the game never claims credit for.** Worth one Seer or Binder line if the author wants it noticed. |

## 2.1 Unearned reveals in the span

Only one, **A8**, and it is unearned in the unusual direction: not a reveal without breadcrumbs, but a
*breadcrumb the game refuses to acknowledge as one*, which means most tables discard it. Fix: **B22**.

Two near-misses worth naming:

- **`ch0.js:242`, "Every one of them has a Sighting of their own."** Not a reveal — a **promise the game
  never keeps** (`CANON §6/S2`). No Master ever uses, is identified by, or is beaten by a Sighting.
  Either delete the clause or pay it in ch1 by giving Oriel's scrutiny a name (she is already watching
  Wren "like a sum she was doing," `ch1.js:306`).
- **`ch0.js:133`, "Later tonight…"** — a promise contradicted by `:67` and `:242` in the same chapter
  (`CANON §13.1`) and not redeemed for six chapters. One word.

## 2.2 Where the game springs rather than earns — and is right to

Beat 11's simultaneity, and only that. Everything else in the span is plant, not payoff, which is
correct for an opening act.

---

# 3. WHERE THE PUZZLE TEACHES THE WORLD

*The author: "Ideally the engaging puzzles add to players' understanding of the world and mysteries."*

There are **five** puzzles in the span. Three teach the world well, one teaches it superbly, and one
teaches nothing.

## 3.1 `ch0_keys` — the four keys (`ch0.js:84-129`)

**Teaches:** that legitimate action in this world requires exactly four people acting at once, and that
the school knows this as an idiom without knowing why (`ch0.js:88`). It is **Law 0 rendered as a motor
skill, four hours before Law 0 is enacted** (`ch7.js:726`).
**Also teaches:** the failure mode ("Count in — one, two, three, press") which is the exact protocol the
table will need at ch6's Bells and ch7's Binding.
**Verdict: the best-placed teaching object in the game.** No change.
**Free addition:** **B8** — *"Nobody remembers who said it first."*

## 3.2 `ch0_practice` — the reaction drill (`ch0.js:130-139`)

**Teaches: nothing about the world.** It is a pure mechanic tutorial with a framing line that is
factually wrong about the fiction's own timeline (`CANON §13.1`).
**What it could teach for free:**
- **B9 — make the drill an inherited ritual.** One line from Wren or the narration: *"Every fourth-year
  learns this. Nobody is ever told what it is for."* This gives the beat three jobs it currently does
  not do: it is worldbuilding (the school preserves forms it cannot explain — the game's thesis), it is
  a plant for ch6's Bells (which turn out to be **the Founders' own pattern**, `ch6.js:487`), and it
  retro-justifies an otherwise inert fifteen seconds.
- **B10 — four lanes, again.** *"Four lanes. Everything here comes in fours."*
- The two together cost two sentences and convert the span's only empty puzzle into a plant for its
  biggest set-piece.

## 3.3 `ch0_carve` — type the name (`ch0.js:164-178`)

**Teaches:** that **"Names don't burn. Words do — the old ones"** (`:170`) — i.e. the Founders' Tongue has
*force*, not merely meaning. That single line is the operating premise of every puzzle in the remaining
eight chapters, and of Law 0.
**Also teaches, silently:** that the lamp responds to *WREN* with **blue** — the Cold's colour in the
palette (`scenes-ch0.js:7-8`) — which is the single most efficient unremarked plant in the span.
**What it could teach for free:** **B12** (*"which is not a colour brass does"*). Note that `CANON
§13.50i` records that `ch0_lamp` has **no blue state in the art at all**, so the prose currently
describes something the screen does not do: either draw it or lean on the prose.

## 3.4 `ch0_lamp` — the dormitory lamp (`ch0.js:189-221`)

**The best puzzle-as-worldbuilding in the game.** In one four-slot ring it teaches:
1. **The partition as physics** — "Four things, four people, and nobody has two" (`:193`), restated by
   the narration as a *property of the object*: "Four hundred years, and it needed all four of you"
   (`:215`).
2. **The entire sigil grammar** — mark, scratch-vs-notch, first word *in* the mark, sunwise, and the
   counter-intuitive rule that **empty slots are meaningful** (`companion/ch0.js:132-135`). Every ring
   puzzle for the next eight chapters is this grammar with more slots.
3. **Inversion as meaning** — the Reader's page teaches that a shape upright says one word and upside
   down says its opposite (`companion/ch0.js:89`), and names **COLD** as ASH's inversion (`:94`). The
   player meets the title character's true name, as a glyph, in the Prologue.
4. **The content:** **ASH, EMBER — *Fire, keep.*** (`ch0.js:216`) The thesis of the entire game, in two
   words, presented as a lamp instruction in a `small` class.
5. **That the school is sitting on working machinery it cannot operate** — "Nobody has ever got it to
   light. Everybody has tried" (`:78`).

**Free additions:** **B17** (*"and then made sure it could not be done alone"*) and **B18** (*"An empty
slot is a fact, not an absence"*).

## 3.5 `ch1_vote` — the hour before the bell (`ch1.js:164-225`)

**Teaches, and teaches a great deal:**
1. **The Convocation's anatomy** — nine seats, nine Houses, one Master each; the Chair counts and does
   not hear (`:69`); a vote is called once (`:240`).
2. **That oaths are physical and visible** — the Binder sees two red knotted threads and can say which
   direction they run (`companion/ch1.js:141-142`). Every later oath in the game (Bess, the porter, the
   Warden's Oath, Mere's newel) is this object at a different scale.
3. **That the Crown buys people, and how** — a coin under a cushion, a coin in a sleeve, a soldier
   behind a chair (`companion/ch1.js:125-127`). Corruption as something the Seer can *see under*.
4. **That institutions record their commitments** — "a House that knows its vote files in writing before
   the doors shut" (`companion/ch1.js:91`). This is the Book of Laws' premise in miniature: bodies write
   things down, and written things can be read back against them.
5. **The method of the whole game** — four partial views, one merged picture, a capped budget, one
   commit.
6. **A trap that teaches epistemics:** Seat 3 audibly begs to be asked (`companion/ch1.js:109`) while
   already being pledged (`:95`). The chapter's real lesson is that *no single seat's information is
   actionable alone* — which is the lesson of the whole game, delivered as a punishable mistake.

**What it does not teach, and could for free:**
- **Nothing about Year 212, the Founders, or the Order.** The chapter is entirely present-tense politics
  in a game whose subject is a two-hundred-year-old cover-up perpetrated by *this body's predecessors*.
- **B32 — name the default.** *"Seven Houses filed nothing. In this school, saying nothing is a vote."*
  One line, already true, and it is the exact moral of 212 ("They struck the Law and called it grammar,"
  `companion/ch6.js:286`).
- **B30 — read the lintel.** The attunement word is **THORN**, a Founders' glyph glossed *"a gate; to go
  through"* (`glyphs.js:19`), cut over the Masters' own door. The asset is built and unremarked. One
  Reader line makes the school's architecture legible as Founders' work the school no longer reads.
- **B31 — join "Convocation" to "Order."** Conditional on `CANON §12.3`'s ruling; if they are the same
  body, this chapter becomes a scene about the direct heirs of the cover-up, at the cost of one `fine`
  line.

## 3.6 Summary table

| puzzle | teaches world? | what it teaches | free upgrade |
|---|---|---|---|
| `ch0_keys` | **superb** | four hands is the world's unit of legitimate action | B8 |
| `ch0_practice` | **nothing** | — | **B9, B10** (highest-value puzzle fix in the span) |
| `ch0_carve` | **strong** | old words have force; blue means something | B12 |
| `ch0_lamp` | **superb** | the partition, the grammar, inversion, *fire, keep* | B17, B18 |
| `ch1_vote` | **strong** | the Convocation, bought seats, visible oaths, institutional default | **B32**, B30, B31 |

---

# 4. BOREDOM AND OVERLOAD MAP

Four real people, one laptop, four phones, roughly 90–120 minutes for this span.

## 4.1 The shape of the act

```
attention
   ^                                   ██ ch1_vote (peak, and peak stress)
   |            ██ ch0_lamp     ██ ch1_prices/offer
   |      ██ ch0_wren/dare   ██ ch1_vane
   |  ██ ch0_start/stone           ▓ ch1_after
   | ▓ ch0_keys            ░░░░ ch1_start→flicker (4 prose scenes)
   | ░ title/QR   ░ ch0_practice        ░ ch0_flow
   +-------------------------------------------------------> time
     T0        T1                 T2            T3
```

## 4.2 Where attention sags — four places

| # | where | why | severity | fix |
|---|---|---|---|---|
| **S1** | **Beat 0 — title screen, QR, seats, keys** | 5–10 minutes of pure administration before any fiction. The only hook is the bells warning. | **moderate** — it is at the front, where a table is most willing to tolerate it | Unavoidable in a four-phone game. The *duplication* is avoidable: `ch0.js:80` repeats the seating instruction the title screen already gave. Cut one. |
| **S2** | **Beat 5 — `ch0_practice`** | Fictionally inert (§3.2) and its framing line is wrong. | **low** (it is 15 seconds) but it costs *credibility*, not attention | **B9 / B10**, plus the one-word `§13.1` fix |
| **S3** | **Beats 14–17 — `ch1_start` → `ch1_dais` → `ch1_vane` → `ch1_flicker`** | **Four consecutive non-interactive scenes, ~17 lines, with no input but "next"** — the longest passive stretch in the span, arriving immediately before the hardest puzzle in the act. | **the span's real sag** | Give the Seer one tap-to-look during `ch1_vane` (the tapestry) instead of holding every private page to `ch1_attune`. It breaks the passivity at the exact midpoint and it is the seat whose payoff the scene has just promised (`ch1.js:283`). |
| **S4** | **Beat 13 — `ch0_flow`** | Wind-down after the Prologue's emotional peak; stats and a map. | **low, and correct** | None — this is the natural break point. Many tables take a drink here; that is a feature. |

## 4.3 Where the table is swamped — three places

| # | where | what swamps | severity | mitigation present | proposed |
|---|---|---|---|---|---|
| **O1** | **Beat 9 — `ch0_attune`** | First phone contact: new app, three tabs (Sight / Wren / Speak), a Book tab, a house rule, and four dense private pages — the Reader's is eight blocks, the Binder's is a Law plus four rules plus a diagram. `sightSeconds: 90` is nowhere near enough; real tables need 3–4 minutes. | **high** | The Book tab explicitly promises permanence (`ch0.js:183`), which is the right pressure valve | One `small` Hearth line: *"There is no rush. Nobody moves until all four of you have read."* |
| **O2** | **Beat 10 — `ch0_lamp`** | Four grammar rules at once (mark → scratch not notch; first word **in** the mark; sunwise; empties are meaningful), on **the widest board in the game** — the source documents a chapter-local CSS override because the panel ran 193px below the fold at 1152×648, hiding the Clear button, half the palette and the commit control (`ch0.js:8-15`). | **moderate-high, and correct** | Three well-graded hint tiers (`:207-209`), a forgiving wrong-text, and Wren's protocol nudge after two failures (`:204`) | None. This is the puzzle the game's whole method rests on; it deserves the weight. |
| **O3** | **Beat 19 — `ch1_vote`** | **The span's peak.** Nine entities identified only by number; four private fact-sets (Reader 4 facts, Listener 4 murmurs + 2 conclusions, Seer 3 numbers, Binder 2 threads); a two-ask cap; a commit-once rule; a 6-minute timer; a **losable** outcome; and a decoy (Seat 3) that punishes exactly the behaviour the previous puzzle rewarded. As **puzzle #3 of the evening.** | **high** | The bell-stall at 6:00 grants all three hint rungs and honestly counts them (`:186-189`); `:200` catches the fewer-than-two case; the hint ladder is excellent; the loss branch is written to be survivable and poignant | (a) One confirmation on commit when the board is not winnable — *"The Chair will not count twice. Call it?"* (b) Fix `ch1.js:62`, which **tells a table they wasted an ask when they did not** (`CANON §13.25`) — misinformation from the narrator is the worst kind of overload. |

## 4.4 Two smaller hazards

- **Tonal whiplash at beat 12.** The most serious beat in the span (four confessions) is followed
  immediately by a comedy menu (the group name). In practice this works as release; noted only so the
  author knows it is deliberate.
- **The "Mum" branch.** The first and cheapest establishment of the Marrow–Wren relationship is behind a
  1-in-4 choice (`ch0.js:233`). Three-quarters of tables never hear it and the game leans on it hard
  from ch4 onward. **Move it out of the branch.**

## 4.5 Net pacing judgement

The act's rhythm is **admin → hush → play → hush → confession → comedy → politics → pressure → launch**,
and that is a good shape. Its two defects are both at the joints: the front is too administrative before
any fiction arrives, and the Chapter I opening is four prose scenes deep before the table gets to touch
anything. Both are cheap to fix and neither is a writing problem.


---

# 5. THE BREADCRUMB BANK

Every candidate enumerated above, consolidated, **cheapest and highest-value first**. All are
**[PROPOSED]**; none contradicts `CANON.md`. "Cost" is measured in sentences of shipped text.

## 5.1 The top ten, in order of value per word

| # | beat | cost | the line (or the change) | what it buys |
|---|---|---|---|---|
| **B4** | 2 — `ch0_stone:62` | 1 clause | *"The translation every child learns is two hundred years younger than the stone."* | The entire political spine of the game, at T1, with no names and no spoilers. Makes A3 (the game's biggest reveal) findable six chapters early. **The single highest-value addition in the span.** |
| **B1** | 1 — `ch0_start:50` | 1 clause | *"Nobody feeds it. Nobody ever has."* | Converts the Hearth's mortality from mood to mechanism; makes T8's "four people's worth of fire, and four hundred years to spend it in" (`ch6.js:850`) a payoff instead of a revelation. |
| **B22** | 8/12 — after `ch0.js:174` or `:227` | 14 words | *"Nobody asks how Wren knows what is cut under four hundred years of brass. Nobody ever has."* | Converts the game's largest piece of authorial convenience (`CANON §12.21`) into its first plant; kills the "Wren has been researching" mundane read. |
| **B3** | 2 — `ch0_stone:62` | 1 clause | *"…four of the eight are not worn. They are **burnt**."* | **Closes `CANON §13.2`, the game's largest logical hole**, which opens in this span; plants ch6's whole physical premise in the Prologue; and says "eight" while the art shows eight. |
| **B12** | 8 — `ch0.js:169` | 7 words | *"It flares blue — which is not a colour brass does — once, and dies."* | The Prologue's best free plant, currently wasted (`CANON §12.47`). Roughly doubles the middle Prologue's hypothesis space. |
| **B21** | 12/13 | 1 line | Wren: **"Mine never turned up. Mum says it might not."** | Closes withholding **W4**; kills "Wren is a fifth Sighting"; says *hollow* without the word. |
| **B14** | 9 — Binder's ch0 Sight page | 1 `fine` line | *"There is one Law in your Book with a line through it. Nobody has ever told you why."* | Puts "a struck Law" into the room in hour one. Every other seat's Prologue page ends with a say-it-aloud instruction; the Binder's does not. |
| **B9** | 5 — `ch0_practice` | 1 line | *"Every fourth-year learns this. Nobody is ever told what it is for."* | Turns the span's only empty puzzle into worldbuilding + a plant for ch6's Bells + a restatement of the game's thesis. |
| **B28** | 16/22 | 1 clause | Vane: *"His Majesty has an interest in what this school is standing on. The child is the cheap part of it."* | Closes withholding **W3**; kills "kidnapper"; makes ENDING 4 an argument rather than a mugging. |
| **B34** | 23 — `ch1.js:310` | 1 clause | *"The Envoy has seen what is under the paint, and by morning so will the nine. I am sending you tonight."* | Closes half of `CANON §12.43`; ties Chapter I's two plot threads into one. |

## 5.2 The full bank

**T0**
- **(none required)** — but note the seat-order instruction is given twice (title screen and `ch0.js:80`).
  Cut one.

**T1 — the cold open**
- **B1** — the fire is not fed. *(above)*
- **B2** — `ch0.js:50`: *"Four hundred years later the fire is still there. They are not."* Plants "where
  did the four go" at line two, without giving it away.
- **B3** — burnt, not worn. *(above)*
- **B4** — date the translation. *(above)*
- **B5** — `ch0_stone`, `small`: *"The sentence runs all the way round the foot of the stone. Where it
  begins is a matter of opinion."* True (`ch6.js:391-395`), reads as flavour, is the key to ch6.
- **B6** — the stone carries *the school's* mark, cut later. Makes the error physical, not scholarly.
- **B7** — `ch0.js:78`: *"older than any record the school keeps, which is to say as old as the school."*
  Fixes `CANON §12.70` and plants "everything four hundred years old here was made by the same four
  people."
- **B8** — `ch0.js:88`: *"Nobody remembers who said it first."* Custom → inheritance.
- **B9 / B10** — make the reaction drill diegetic, and count the lanes. *(above)*
- **B11** — `ch0_dare`: Wren, *"Names are the only thing I've got that nobody gave me."* Untrue in the
  most useful way; springs at `companion/ch3.js:284` ("Not the Provost's version").
- **B12** — mark the blue. *(above)*
- **B13** — alternative: put the blue observation on the Seer's page instead of the Hearth's.

**T1/T2 — the phones**
- **B14** — surface Law 0 to the Binder. *(above)*
- **B15** — Reader's ch0 page: *"Say all four shapes and both their words aloud."* The whole lexicon —
  **COLD included** — enters the room as vocabulary in the Prologue rather than as a reveal at T8.
- **B16** — Listener's ch0 page: *"Nothing is burning in it. Things that hum are doing something."*
  Closes part of `CANON §12.46`; plants "Founders' objects are still running" for ch2 and ch5.
- **B19** — Seer's ch0 page, caption: *"Four away. One toward. Count them again in every room tonight."*
  Makes `companion/ch1.js:133`'s "There is no lamp here" land as a confirmation.
- **B20** — Listener's ch0 page: *"Four hearts in this room. There should be five."* Numbers travel
  across a table better than adjectives.
- **Gate `book.js:131`.** `CANON §13.44`: the Binder's thread legend shows ch6's exact correct answer
  ("not unbound: the knot itself") ungated from the Prologue, while every comparable Book entry is
  gated. Split it: "unbound" from ch0, the second clause at ch6.
- **Print the house rule on the Wren tab**, not only above SPEAK pages — beat 11 depends on nobody having
  compared phones.

**T2 — the lamp and the speaking**
- **B17** — `ch0.js:215`: *"Somebody wrote a spell for keeping a fire, and then made sure it could not be
  done alone."* Mechanic → intention, and the intention is Law 0's.
- **B18** — Binder's page: *"An empty slot is a fact, not an absence."* Ancestor of Law 6 and of the
  Finale's empty eighth socket; pays three times.
- **B23** — `ch0_flow`: *"Four ways of seeing that anyone has ever named. There are four of you. Nobody
  has ever explained that either."* Makes `CANON §12.7` a question the game asked.
- **Move "Mum" out of the `ch0_name` branch** (`ch0.js:233`).
- **Fix `ch0.js:243`** — the Prologue's Map promises branches the Prologue's graph does not have
  (`CANON §13.47`). Change to *"the night so far"*; restore the full claim at `ch1_flow`.
- **Fix `ch0.js:133`** — "Later tonight" → "You will do this again, against a clock" (`CANON §13.1`).
- **Pay or cut `ch0.js:242`** — "Every one of them has a Sighting of their own," a promise no Master ever
  keeps (`CANON §6/S2`). Cheapest payment: give Oriel's scrutiny (`ch1.js:306`) a named gift.

**T3 — the Vigil**
- **B24** — `ch1_start`, `whisper`: *"The same eight cuts are over the arch here. Every hall in this
  school has them."* Free; the art already draws them (`scenes-ch1.js:72`).
- **B25** — deliver `ch1.js:124`. She does not point at the stone; she puts a hand on the child's
  shoulder. Closes `CANON §12.42`; and it is their first physical contact, which ch4 calls unprecedented.
- **B26** — Seer, `fine`: *"There is a circle cut into the dais where Wren is standing."* The span's best
  un-activated visual plant (`scenes-ch1.js:95-96`; `CANON §12.48`), and it rhymes with the eighth socket.
- **Kill the birth-mother read on the Binder's page:** *"No thread to the Provost — and whatever Wren is,
  that is not what a mother and a child look like."*
- **B27** — Seer, `fine`: *"The Envoy's wax is the same red as the banner over Seat 6."* Conditional on
  `CANON §12.35`'s ruling; explains why Redmoor is the seat his soldier blocks.
- **B28** — the Crown's motive. *(above)*
- **B29** — name the flame bar, once. Converts a two-hour silent plant into shared dread.
- **B30** — Reader, `fine`: *"The word over the Masters' door is THORN — a gate; to go through. Nobody in
  this hall could tell you that."* The asset is already built (the attunement word **is** a Founders'
  glyph).
- **B31** — Binder, `fine`: Convocation vs Order. Conditional on `CANON §12.3`.
- **B32** — `ch1_vote`, under the rule card: *"Seven Houses filed nothing. In this school, saying nothing
  is a vote."* Already true; it is the moral of 212 rendered as procedure.
- **B33** — Oriel's `after`: *"And if you find something that has been painted over — I will know what it
  is. I have seen it."* Gives `CANON §13.17` (promise-to-Oriel restores Law 0) a cause.
- **B34** — give `ch1.js:310` its reason. *(above)*
- **B35** — or put B1 in Marrow's mouth at `ch1.js:309`.
- **Sorrel's tell** — add to the option's `sub:`: *"She will send someone to collect."* The two prices
  are presented symmetrically and are wildly asymmetric in consequence.
- **One Wren line on `VANE_ACCEPT`** in `ch1_after`: *"You were a long time in that passage."* Converts
  an invisible, ending-altering mechanic into a visible unease.
- **`VOTE_LOST` reassurance**, `small`: *"The night is not over. It has only got harder."*
- **Fix `ch1.js:62`** — Quill's line is mechanically false (`CANON §13.25`) and tells a table they wasted
  an ask when they did not: *"You could have had me for free — if you had gone to her."*
- **Condition the second Cold Ember introduction** on `!VOTE_LOST` (`CANON §13.28`).
- **Confirmation on an unwinnable commit** at `ch1_vote`.

---

# 6. NOTES BACK TO `CANON.md`

Three items found while reading the span's source against the canon document.

**6.1 [CORRECTION] Thornhallow is named to the player at T0, not T8.**
`CANON §3.1` asserts the school "is **never named to the player before ch6's title card**," citing a grep
for "Thornhallow" over ch0–ch5 prose. The name appears on **the first screen of the game**, in the
safety warning: *"the bells of Thornhallow will ring"* (`js/main.js:22`). The grep is correct about
chapter prose and wrong about the player. Amend to: *never named in chapter prose before ch6; named once
on the title screen, in the bells warning.* Player-model consequence: the table has held the school's
name since minute one and will not have noticed it was withheld — which is arguably better than either
alternative, but the canon row should say so.

**6.2 [ADD] The art does not mark Wren as cold in Act I.**
`CANON §9.1` notes Wren is "the only figure in the game edge-lit in `#4fb3bf`," citing ch7 and ch8. In
`ch1_dais` Wren is drawn with a **warm** `#ff9a3c` edge (`scenes-ch1.js:94`) while Marrow gets a dull
`#3a2a22`. This is not a contradiction — the cold signature begins later — and it is worth recording as
canon: **in Chapter I, Wren is drawn as a child lit by a fire.** That is simultaneously the truth and the
misdirection, and it means the art's palette is telling a chronological story about when Wren becomes
legible as the Cold.

**6.3 [ADD] The prophecy stone's eight cuts are on screen behind six Chapter I scenes.**
`scenes-ch1.js:69-72` draws the same eight worn cuts on the lintel over the Hearth's arch, explicitly
"the same eight cuts as the Prologue's slab," in `ch1_hall` — which is the art behind six ch1 scenes
including `ch1_vote`. `CANON §7.4` documents the stone; it does not record that the table stares at an
eight-cut ring for the duration of Chapter I's hardest puzzle. Worth a row: the number **eight** is on
screen for an hour before it means anything, and no prose in the span names it.

**6.4 [CONFIRM] `CANON §13.2` opens in this span, not in ch6.**
The Reader is established as able to read "any carving, however worn" (`ch0.js:146`) **fifteen lines
after** the narration says "Nobody alive has read the cuts" (`ch0.js:62`). From the player's side this is
not a latent inconsistency — it is an immediate, actionable objection that a sharp Reader will raise out
loud in the Prologue: *"Why can't I just read the stone?"* The game has no answer until ch6 and never
gives one in prose. **B3** is the fix and it belongs at `ch0.js:62`, not later.
