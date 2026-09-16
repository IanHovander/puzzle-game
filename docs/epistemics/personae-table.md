# PERSONAE — the four, the nine Masters, the four Founders

> ## ⚠ TOTAL SPOILERS
> Every reveal in *What the Fire Keeps*, including the Prologue's, the Finale's and all five endings.
> Written for the author. Do not show a player or a host. Companion to `CANON.md` (ground truth),
> sibling to `personae-principals.md` (Wren, Marrow, Vane), destined for `EPISTEMICS.md` §persona.

**Scope.** The four player roles (Reader, Listener, Seer, Binder); the nine Masters of the Convocation
(Sorrel, Quill, Brack, Hallan, Vey, Orrin, Oriel, Tarn, and Marrow in the Chair); the four Founders
(Mere, Idony, and the two the shipped game does not contain). Wren, Marrow and Vane are treated in
`personae-principals.md`; §D of this document is a second, cast-facing pass on **Wren's comic engine**
that is written to sit beside that document's §1.8, not to replace it — every collision is named.

**Four layers, kept apart.**

| layer | question | may be sourced from |
|---|---|---|
| **1 ACTUAL** | what they are really like | narration, art, mechanics, behaviour under branch, other characters' observations — **never their own claim about themselves** |
| **2 SELF-IMAGE** | what they believe they are like | their own speech and writing, and what they do unprompted |
| **3 BELIEVED REPUTATION** | what they think each *other* character thinks of them | inference from how they address that person; **[PROPOSED]** where inferred |
| **4 FEELING** | what they feel / what they show / the gap | both halves cited separately |

**Notation.** `file:line` into the shipped source (paths relative to `js/`). `[PROPOSED]` = my
inference, author to rule. `[GAP]` = the game does not supply it and should. `[THIN]` = the character
exists but the game spends fewer than forty words on them. `[WRONG]` = a shipped line that contradicts
the character the rest of the game builds. `[COLLIDES]` = the same scene is already claimed by a crack
or a fix in `personae-principals.md`.

**A note on method for this cast.** None of these eighteen characters has an interior monologue in the
shipped game. Three of them have no line at all. So Layer 1 is derived, in order of priority, from
(1) what the *mechanics* make true of them — a Master is a predicate in `tally()` before they are a
person, and that predicate is characterisation; (2) what the art individuates; (3) what other
characters do about them. Where that yields fewer than three usable facts, the row says **[THIN]** and
the persona is marked as a proposal for the author to accept or reject, not as canon.

---
---

# PART A — THE FOUR

## A.0 What canon may say about a seat, and why

The four are played by real people at a table. They have **no name, no pronoun, no age beyond
fourteen, no family, no appearance and no history anywhere in the game** (`CANON.md` §9.4;
`content/lore.js:5-10`); the art draws four identical faceless silhouettes in every chapter
(`art/scenes-ch1.js:59`; `scenes-ch3.js:42`, `:86`; `scenes-ch5.js:30`; `scenes-ch7.js:88`).

So there is **no Layer 1 personality for a seat**. There is a *role*, and the role is exactly four
things:

1. **A gift with a named, load-bearing blind spot** (`lore.js:6-9`).
2. **A private decision about Wren**, written in the second person, that the player is told they made
   before the game began (`companion/ch0.js:99`, `:112`, `:124`, `:145`).
3. **A set of performance obligations** — things the person at the table must physically do.
4. **A grammar** — the shape of the sentence the puzzles force that player to say out loud, every
   chapter, for four hours. This is the layer the design does best and nobody has written down.

What follows treats Layer 1 as *the character the mechanics require the player to become*. That is
legitimate: by ch6 the game is quoting a seat's own rationalisation back at them and billing it
(`companion/ch6.js:255`; `companion/ch7.js:260`).

## A.1 What the game gives a player to perform

| obligation | the physical act | cite |
|---|---|---|
| **"Say what you see. Never show your phone."** | Describe, never display, for the whole night. Printed above every SPEAK page; **absent exactly once, in ch8** | `lore.js:74`; `ch8.js:60` |
| **Speak your anomaly aloud, in seat order, eleven minutes in** | Four people each admit a thing they have privately hidden for years, out loud, in a fixed order | `ch0.js:217-218` |
| **Duty rotation** — Warden (keyboard) / Voice (reads aloud), reassigned every chapter; passed **by name** once | Each player is the hands and the mouth at least twice | `ch0.js:185`; `ch1.js:116`, `:160`; `ch2.js:221`; `ch3.js:458`; `ch4.js:368`; `ch5.js:277`; `ch6.js:499`; `ch7.js:359`, `:715` |
| **Three sealed private channels** — the whisper (ch3), the hold (ch5), the finale word (ch7) | A decision made alone, on a phone, that the other three may never learn | `lore.js:32-36`; `ch3.js:496-530`; `ch5.js:549-583`; `ch7.js:470` |
| **The bargain, addressed to the real person** | A private letter personalised with the player's actual first name, then a public fifteen-second question by name in front of their friends | `companion/ch7.js:182`; `ch7.js:488-501` |
| **The walk cost, read privately before voting** | One sentence naming exactly what that player loses | `companion/ch7.js:185-188` |
| **The goodbye, by name** | On E0, a letter from Wren to the real first name, quoting that seat's own ch0 diagnosis back, then the page whites out | `companion/ch8.js:86-128` |
| **Four hands, within a heartbeat** | Four keys pressed simultaneously — the only mechanic that cannot be performed by one competent player | `ch0.js:202`; `ch6.js:777`; `ch7.js:730` |

## A.2 THE READER (seat 0, Glyph-Sight, WHAT)

### A.2.1 Layer 1 — actual

| trait | evidence |
|---|---|
| **Reads everything, always, unprompted.** The gift has no off switch: the Hearth shows carvings worn; the Reader's page shows them clean, in every room, all night | `lore.js:6`; `companion/ch0.js:86`; `companion/ch2.js:108` |
| **Holds two readings of everything at once.** Every Reader line in the game is a *pair* — a shape standing up and the same shape inverted. The native sentence is "X; and turned over, Y" | `companion/ch0.js:89-94`; `companion/ch5.js:281` |
| **Is the seat with a permanent archive.** The Book keeps the lexicon, then the primer, then Mere's sheet. The Reader is the only player who accumulates | `companion/ch0.js:97`; `companion/ch4.js:65-74` |
| **Has maintained one deliberate blank for a year** — the name on the dormitory door, chalked twice, once in an alphabet nobody teaches, **in the same handwriting** | `companion/ch0.js:99` |
| **Bluffs under intimacy, not under pressure.** The Reader's one available lie in the game is invented on the spot, in a laundry, in answer to the asker's own name | `companion/ch3.js:286` |
| **Withholds at the moment of maximum cost.** On E2 the mason cannot spell the name, nobody in the room can, the Reader can — and does not offer | `ch8.js:332`; `companion/ch8.js:273` |
| **Is the seat the game flatters.** No other phone tells its player they are excellent at their gift. The Reader's does, twice | `companion/ch7.js:241`; `companion/ch8.js:86` |

**Would not admit:** that the door was not unreadable, it was *unopened* — the decision not to ask who
chalked it was made once and re-made every day for a year (`companion/ch0.js:99`: "You have never
asked who"). And that the bluff in the laundry was not kindness but craft: it *sounded* true, which is
a Reader's professional pride misapplied (`companion/ch3.js:286`).

**Defining contradiction.** **A completist who has kept exactly one gap, and the gap is a person.**
The seat whose gift is that nothing is illegible has, for a year, been living beside a four-letter
word it could not read and never mentioned. And the game's final judgement on the Reader is not about
reading at all — it is about *spelling*, withheld, at a graveside (`ch8.js:332`).

### A.2.2 Layer 2 — self-image (written verbatim by the phone)

- *I do not misread.* — "You have never misread anything in your life." `companion/ch7.js:241`
- *A gap in my reading is somebody else's joke.* — "You decided, a year ago, that somebody was being
  funny." `companion/ch0.js:99`
- *When I do not know, I say so.* — the true whisper answer is DONTKNOW and the phone rewards it:
  "Yet. Good. Tell me when." `companion/ch3.js:286`
- **Out of date by ch4.** The primer makes the door readable; the self-image "I could not read it" was
  retired three chapters before the Reader stops using it. `companion/ch4.js:202-205`
- **[CONTRADICTION, `CANON.md` §13.37]** ch4 says the Reader decided *a year ago* it was a spelling
  mistake; ch7 says the Reader decided *in the study* they had misread it. Different time, different
  object, different accusation. ch7's is the one that makes the self-image the point.

### A.2.3 Layer 3 — believed reputation

| the Reader believes… | that they think… | actually | cite |
|---|---|---|---|
| **Wren** | that the name is a small thing, asked lightly, twice; that the Reader will get to it | Wren has known for years that the Reader cannot read it, and asked anyway "properly. Not the Provost's version" — a request phrased to exclude the answer Wren has been given all his life | `companion/ch3.js:284`; `ch0.js:226` |
| **the other three** | that the Reader is the one who does not miss things — so a Reader who cannot read a name on a door is not a Reader | they have each concealed a comparable hole and said so aloud in ch0, in seat order, and none of the four ever refers to another's again | `ch0.js:217-218` |
| **Marrow** | nothing. **[GAP]** The Reader has no belief about the Provost before ch4 | Marrow wrote the name the Reader cannot read, in her own hand, in the old letters, and left the primer that decodes it open on her desk | `companion/ch4.js:203`; `ch4.js:51` |
| **the Convocation** | nothing. **[GAP]** — and the Reader is the seat that reads *the filed roll*, i.e. the seat with a documentary relationship to the nine | `companion/ch1.js:91-96` |

### A.2.4 Layer 4 — feelings

| toward | actual | shown | the gap |
|---|---|---|---|
| **Wren** | custodial, and faintly guilty. The Reader is holding the one thing Wren has asked anybody for | a bluff, or a "not yet", in a laundry, once | Wren's E0 letter is three glyphs and an instruction to keep something the Reader will not be able to read tomorrow — the relationship inverted, perfectly, in eleven words | `companion/ch8.js:86-90` |
| **the Listener** | an old red thread, well knotted — an oath from before the game, never explained | nothing; **only the Binder can see it** | the Reader does not know they are sworn to anybody | `companion/ch0.js:141`; §12.62 |
| **Marrow** | unstated until E3, where her letter is a confession *about the Reader's job*: "I never once heard it said right, and I am the one who chose it" | — | the game's only adult apology to this seat arrives on one ending | `companion/ch8.js:195` |

### A.2.5 Voice

| | |
|---|---|
| **Sentence shape** | Short declarative pairs. Noun, then gloss, then the inverse. "That shape is EMBER — *what remains*. Turned over it is CROWN." |
| **Under stress** | Lengthens rather than shortens: reads the whole table aloud rather than the needed row. The Reader's failure mode is *completeness*, not panic. |
| **Tells** | Says both readings when only one was asked for; italicises the gloss; supplies the etymology nobody requested. |
| **Subjects it circles** | Names, spellings, what a word used to mean, what is written under a thing. |
| **The one subject it will not touch** | **Who wrote on the door.** Stated flat: "You have never asked who." `companion/ch0.js:99` |
| **Three lines that are perfectly the Reader** | (1) "The Hearth shows them worn to nothing. **On your page they are clean.**" `companion/ch0.js:86` — the gift as a statement of privilege. (2) "**Not a bird.** *Wrenn* is the hollow of a bell — the space inside it that makes the sound." `companion/ch4.js:204` — correction before consolation. (3) "A hollow. The space inside a bell, the part that rings." `ch6.js:667` — the same sentence, said out loud to the person it is about, with the etymology kept and the comfort declined. |
| **The line that is NOT the Reader** | **"You have never misread anything in your life."** `companion/ch7.js:241`. It is the only place in the game where a phone pays its player a compliment, it is unearned (the Reader *has* misread — the roll, for a year), and it arrives at the beat where the character should be humbled, not decorated. **[WRONG]** Proposed replacement: *"You decided, in the study, that you had misread it. You have never once let a reading stand that you did not believe."* — same self-image, stated as a discipline rather than a boast, and it survives the reveal. |

### A.2.6 Wants

- **Aloud:** to read the thing that has not been read. Wren's first words to this seat put hunger and
  carvings in one breath (`ch0.js:146`).
- **Unsayable:** to be the one who does not miss anything — which is why the door stayed unasked. The
  question "who chalked it?" has exactly one dangerous answer for this seat: *I did, and I do not
  remember* (`CANON.md` §12.16). The Reader has been protecting a self-image by not investigating.

### A.2.7 Worst moment — and the game has it twice

1. **ch3 laundry, TELL:** "A small brave bird." Invented, about the asker's own name, to the one
   person who asked for the true version. The phone bills it in one clause: "**You made that up. It
   sounded true, which is not the same thing.**" `companion/ch3.js:286`
2. **E2, the mason:** "You could. **You did not offer, and you will not**, and every winter you will
   read it anyway and say nothing about it to anybody." `companion/ch8.js:273`

**Verdict:** the strongest-authored worst moment of any character in the game, and it is a player's.
Note for the author: the bluff is *also the likely answer to §12.28* — if "a small brave bird" is what
Marrow has told Wren for fourteen years, the Reader's invention is a quotation, and the scene doubles.
**[PROPOSED]**

---

## A.3 THE LISTENER (seat 1, Ear-Sight, WHEN)

### A.3.1 Layer 1 — actual

| trait | evidence |
|---|---|
| **Cannot hear a noun.** The gift returns *intervals*, never names: "every room is tuned differently, so a single note means nothing on its own — you only ever hear how far the tune steps" | `companion/ch0.js:109` |
| **Therefore thinks in relations, not objects** — the only seat whose entire vocabulary is comparative | `lore.js:7`; `companion/ch2.js:130` |
| **Hears people as bodies**: every heartbeat in a room, ranked; the Envoy fast, the Provost skipping twice, the soldiers above in step | `companion/ch1.js:116-118`; `companion/ch5.js:307` |
| **Has converted a physical absence into a moral fault and kept it for years** | "You decided years ago that the fault was yours, and you have never said it out loud to anyone." `companion/ch0.js:112` |
| **Under-reports.** The Listener is the seat that knows Marrow is frightened (`companion/ch6.js:251`) and the seat that never says so | `companion/ch6.js:251` |
| **Is the seat the plot exonerates last.** ch6: "Six chapters, every room, and never once anything to catch." ch7: "Nine people in this chamber, and **eight hearts**" | `companion/ch6.js:255`; `companion/ch7.js:246` |
| **Is the operational spine of ch3** — the corridors are run on the Listener's boots-by-landmark, and Wren says so out loud | `ch3.js:491` |

**Would not admit:** that the silence stopped being frightening some time ago and became *theirs* —
the one fact about Wren that only this seat holds. The phone notices the shift and dates it: "You
stopped calling it a fault of yours somewhere around the laundry. **You have still never said aloud
which one is missing.**" (`companion/ch7.js:246`). That is not shame any more. That is possession.

**Defining contradiction.** **The seat that hears everything has never asked a question.** Seven years
beside a person with no heartbeat, one conversation would have settled it, and the Listener chose to
be at fault instead. The gift measures the distance between two notes; the Listener has never measured
the distance between themselves and the person they were afraid of hurting.

### A.3.2 Layer 2 — self-image

- *I hear everything.* — "You can hear a spider think, two floors down." `ch0.js:147`
- *So a silence is a defect in me.* — `companion/ch0.js:112`
- *Precision is the whole of my value.* — the gift is useless if approximate; every Listener page
  gives an exact integer (`companion/ch2.js:130`: "up one, up three, down two").
- **Out of date from ch6 onward**, and the phone says so to their face; the player keeps performing
  the old self-image anyway, because the Hearth never lets them announce the correction aloud. **[GAP]**

### A.3.3 Layer 3 — believed reputation

| the Listener believes… | that they think… | actually | cite |
|---|---|---|---|
| **Wren** | that Wren has a heart like everyone, and that failing to hear it is the Listener's shame | Wren has known for years that there is nothing to hear, and let the Listener carry it — then says so gently in ch6 and warmly on E0 | `ch0.js:226`; `companion/ch8.js:94` |
| **the other three** | that admitting one silence would put the whole gift in doubt | no other seat ever refers to the Listener's gift except as reliable; the doubt is entirely internal | `ch3.js:491` |
| **Marrow** | nothing before E3 **[GAP]** — despite the Listener being the only person in the school who knows the Provost is afraid | Marrow's E3 letter is addressed exactly to this: "Do not let that stop you listening — **I did, and it cost fourteen years**" | `companion/ch8.js:196` |
| **the Convocation** | that the murmuring Masters do not know they are overheard (true) | the Masters murmur *to be* overheard — Sorrel's and Brack's murmurs are solicitations, not leaks | `companion/ch1.js:108-109` |

### A.3.4 Layer 4 — feelings

| toward | actual | shown | the gap |
|---|---|---|---|
| **Wren** | seven years of private guilt, hardening into custody | one lie ("Loud"), or one flat truth ("No"), in a laundry | Wren's reply to the lie is the cruellest kind thing in the game: "**That was kind. It was not true, and I would rather have had the true one.**" `ch6.js:320` |
| **the Reader** | sworn, red, well knotted, from before the game | nothing — invisible to both of them | **[GAP]**, §12.62 |
| **Marrow** | reads her body and says nothing about it all night | — | the Listener is holding the single most humanising fact about the Chair (`companion/ch6.js:251`) and has no surface on which to say it |

### A.3.5 Voice

| | |
|---|---|
| **Sentence shape** | Signed integers and orderings. "Up three." "Boots, left, wait, now." Four words or fewer. The only seat that speaks in numbers. |
| **Under stress** | Shortens to pure imperative and drops the subject entirely. Wren's compliment is precisely a description of this: "Like a very small general." `ch3.js:491` |
| **Tells** | Counts aloud before answering. Qualifies with "in this room". Refuses to name a word even when the name is obvious from context, because the gift forbids it — a scruple that reads as modesty and is actually doctrine. |
| **Subjects it circles** | Order, sequence, how long ago, who is still in the room. |
| **The one subject it will not touch** | **Which heart is missing.** Stated: "You have still never said aloud which one is missing." `companion/ch7.js:246` |
| **Three lines that are perfectly the Listener** | (1) "**Up one, up three, down two.**" `companion/ch2.js:130` — the whole gift in six words. (2) "**No. I have never heard it.**" `ch6.js:658` — the true answer, which costs the seat its seven-year story about itself. (3) "It has been humming since before you were born, and **nobody else in this room has ever heard it**." `companion/ch0.js:104` — the loneliness of the gift, stated as fact. |
| **The line that is NOT the Listener** | **"Faint. Far off."** — the middle option in ch6's Second Asking, `ch6.js:657`. Ear-Sight cannot produce an imprecision: this is the seat that hears *exact intervals* through stone floors, and "faint, far off" is a judgement no instrument of that kind can return. The other three seats' wrong answers are *kind lies* or *rationalisations*; this one makes the Listener vague, which is the one thing the Listener is never allowed to be. **[WRONG]** Proposed replacement: *"Not in here. Every room is tuned differently."* — the seat's own doctrine, used as an evasion. That is how this character lies. |

### A.3.6 Wants

- **Aloud:** to be useful in the dark. ch3 is the Listener's chapter and Wren says so.
- **Unsayable:** to be told the fault was not theirs *by the one person who could have* — and Wren
  could have, for seven years, and did not. On E0 that is exactly what the letter does, once, and then
  the gift is spent: "**It wasn't a fault in you. There wasn't one to hear.**" `companion/ch8.js:94`

### A.3.7 Worst moment

**ch3 laundry, LOUD.** The kindest available lie, told to the one person in the school who has never
been lied to about this, by the only person who could have confirmed it. Bill: "Wren looks pleased,
then looks at you a moment too long… **You have never heard it. You said loud.**"
(`companion/ch3.js:289`), collected in ch6 to the Listener's face (`ch6.js:320`) and again on the
phone ("you would worry a sore tooth", `companion/ch6.js:252`). **Authored, main path, billed three
times. This is the model.**

---

## A.4 THE SEER (seat 2, Under-Sight, WHERE)

### A.4.1 Layer 1 — actual

| trait | evidence |
|---|---|
| **Sees the true state of every object and is forbidden to say what it means.** "What a cut obliges is not yours — one kind starts a sigil and one does not, and that is the Binder's. **Say where they are, and stop.**" | `companion/ch4.js:238` |
| **Is therefore trained, every chapter, to report and not interpret** — and the training is what destroys them in the laundry | `companion/ch0.js:120`; `companion/ch2.js:148`; `companion/ch5.js:317` |
| **Is the seat Marrow names for a task** — the only one, in the only errand she gives the four: "take the Seer's eyes with you" | `ch2.js:189` |
| **Is the seat Vane names, unprompted, in front of the Convocation** | `ch1.js:283` |
| **Carries the one physically undeniable anomaly**: the shadow, in every room, including rooms with no lamp | `companion/ch1.js:133`; `companion/ch3.js:229`; `companion/ch7.js:251` |
| **Has rationalised it as "the light" and had the excuse removed four times, room by room** | `companion/ch0.js:124` → `companion/ch1.js:133` → `companion/ch3.js:229` → `companion/ch7.js:251` |
| **Does the physical work of the reveals**: scrapes the tapestry, takes four hundred years of soot off the bell-chamber wall | `ch4.js:554`; `ch7.js:337` |

**Would not admit:** that the reason for silence is not caution but *taste*. The Seer is afraid of
sounding poetic, and Wren — kindly, carelessly — confirmed the fear: "*That's very poetic, the Seer.*
**You did not mean it poetically.**" (`companion/ch3.js:292`). The Epilogue heals exactly that wound
and no other: "You were right about the wall, and the floor, and me. **Stop looking at things like
they owe you money.**" (`companion/ch8.js:191`).

**Defining contradiction.** **The seat that sees under everything is the one the game teaches to say
nothing.** Its discipline and its cowardice are the same sentence, and the game never distinguishes
them — which is why the Seer's laundry silence is the only one of the four that can be defended as
*professionalism*, and is the worst of them.

### A.4.2 Layer 2 — self-image

- *I am literal.* Not fanciful, not poetic — a reader of floors and paint.
- *A claim is not my job.* "Say what is cut, and where." `companion/ch0.js:120`
- *It was the light.* — "You decided months ago it was a trick of the light."
  `companion/ch0.js:124`. Falsified in the Prologue itself ("It is not the light. It never was") and
  *still performed* by the player for six more chapters, because the phone keeps re-offering it.
- **Flattering and out of date:** the self-image says "I do not over-read." The record says the Seer
  was right first, every time, about everything.

### A.4.3 Layer 3 — believed reputation

| the Seer believes… | that they think… | actually | cite |
|---|---|---|---|
| **Wren** | that the Seer is charmingly odd, and that saying the shadow aloud would be a performance | Wren was waiting to be told, noticed the withholding, and forgave both halves on the same page: "**You were the only one who saw it and didn't tell me, and then you did. Thank you for both.**" | `companion/ch3.js:292`; `companion/ch8.js:112` |
| **the other three** | that the Seer reports, and that a Seer who starts *concluding* is out of their lane | the Binder is the only seat whose job depends on the Seer being right, and has never once queried a Seer report | `companion/ch0.js:138` |
| **Marrow** | that Marrow sent them specifically, and therefore rates them | true, and Marrow's E3 letter concedes it late: "You saw. **I should have asked you sooner. I should have asked anyone.**" | `ch2.js:189`; `companion/ch8.js:197` |
| **Vane** | **[GAP]** — despite Vane naming the Seer's gift out loud in ch1 as the seat that can prove him right | Vane is factually correct about the paint and is using the Seer as a witness, in public, without consent | `ch1.js:283`; `ch4.js:557` |

### A.4.4 Layer 4 — feelings

| toward | actual | shown | the gap |
|---|---|---|---|
| **Wren** | the longest-standing private alarm at the table — months of watching a shadow reach for a fire | a look at a wall | "You look at the wall. **Wren looks at you looking at it, and lets you.**" `companion/ch3.js:292` — the kindest sentence in the game, and it is about being let off |
| **the Binder** | "last week's practice thread [that] still will not hold", drawn broken | nothing — invisible to the Seer | **[GAP]** §12.62: practice for *what* is never said, and this is the one pair the game marks as strained |
| **Marrow** | operational trust, unexamined | — | the Seer is the seat that scrapes her tapestry in her own study while she is out, and never has a line about it |

### A.4.5 Voice

| | |
|---|---|
| **Sentence shape** | Prepositions and ordinals. "A scratch at socket 3. A notch at socket 1." Location first, object second, meaning never. |
| **Under stress** | Becomes *more* exact and less interpretive — retreats into coordinates. The Seer's panic looks like competence, which is why nobody at the table ever checks on them. |
| **Tells** | Says "under" constantly. Ends reports with a full stop where another seat would add a clause. Volunteers the *second* cut nobody asked about. |
| **Subjects it circles** | What is beneath, what has been re-laid, which way things fall, what has been painted over. |
| **The one subject it will not touch** | **The shadow, as a claim.** The Seer will describe it and never conclude from it. |
| **Three lines that are perfectly the Seer** | (1) "**Not one plinth is standing in the hole cut for it.**" `companion/ch2.js:142` — a devastating political fact delivered as a measurement. (2) "There is **no lamp here**, and Wren's shadow still falls towards the fire." `companion/ch1.js:133` — the excuse dying in a subordinate clause. (3) "Every shadow in the chamber falls away from the spark. Wren's falls toward it. **There is barely any light left to blame.**" `companion/ch7.js:251` |
| **The line that is NOT the Seer** | **"You have no shadow at all."** — the third option in ch6's Second Asking, `ch6.js:648`. The Seer has *seen* the shadow in five rooms across six chapters; this is not a lie, a kindness or a rationalisation, it is a factual error the seat is incapable of making, and it makes the Seer stupid at the beat where the other three seats are allowed to be cowardly. **[WRONG]** Proposed replacement: *"Toward the lamp. It was always the lamp."* — the seat's own rationalisation, offered to Wren as truth. That is how this character fails: not by mis-seeing, but by re-offering the excuse it already knows is dead. |

### A.4.6 Wants

- **Aloud:** to look under things, and to be first.
- **Unsayable:** to be believed without being called poetic — and, under that, to be *asked*, because
  the Seer will never volunteer. Marrow's E3 letter is the only text in the game that grants it, and
  it is an apology: "I should have asked anyone. **Ask, when you are me.**" `companion/ch8.js:197`

### A.4.7 Worst moment

**ch3 laundry, NOTHING.** The one seat that could settle it, declining, to the face of the person it
is about — and being forgiven in the same beat, which is worse. `companion/ch3.js:292`. Authored,
main path, billed on the phone and again in ch6 ("Look down, some time when I am not standing here."
`ch6.js:319`). **The game has it.**

---

## A.5 THE BINDER (seat 3, Thread-Sight, WHETHER)

### A.5.1 Layer 1 — actual

| trait | evidence |
|---|---|
| **Custodian of the Book of Laws** — keeps it, does not author it; fourteen Laws, each dated to the Founders or to the Order | `lore.js:9`, `:56-71` |
| **The only seat that speaks in dates**, in a plot whose central crime is a forgery about dates | `companion/ch2.js:161-166`; `companion/ch5.js:331` |
| **The only seat that speaks in the imperative to the other three** — its job is to overrule the table's instincts before the Warden commits | `companion/ch3.js:270`; `companion/ch5.js:333` |
| **Sees the interpersonal state of every room and is the only one who does** — the party's own threads, Marrow's grey, Vane's gold, Bess's thirty-year oath, the porter's coin | `companion/ch0.js:141-143`; `companion/ch3.js:236-242` |
| **Carries the single most load-bearing negative observation in the game**: Wren has no thread, in either direction, and "not unbound. You know unbound." | `companion/ch0.js:145` |
| **Has chosen, once, deliberately, not to look at something**: the Provost's thread to Wren. "You know what colour a mother's thread is. **You decided long ago not to look.**" | `companion/ch3.js:276` |
| **Is unbound.** Practice thread to the Seer, broken. No oath of their own before ch4 | `companion/ch0.js:142` |
| **Is mechanically the party's single point of failure** — three of the four commit-once puzzles turn on the Binder naming the right rule *before* anybody places a word | `ch2.js:243`; `ch4.js:168`; `ch7.js:578-590` |

**Would not admit:** that the decision not to look at Marrow's thread was not tact. It was avoidance of
the one datum that would force the Binder to conclude something about a living adult's grief — the
same avoidance, exactly, as saying "Yes" in the laundry. The Binder's kindness is consistently a way
of not finishing a thought.

**Defining contradiction.** **The authority on binding is tied to nobody, and knows it.** The seat that
can see every attachment in a building has a broken practice thread and no oath, and the last thing
Wren ever says to this player is an instruction to fix it: "Tie the others to each other. Tight. Then
go and **be tied to someone yourself, for once.**" (`companion/ch8.js:191`). Which means Wren has been
watching the Binder be alone for years, and the Binder never noticed being watched.

### A.5.2 Layer 2 — self-image

- *My gift is complete.* A rule-keeper whose rules have a hole is not a rule-keeper.
- *The blind spot is mine, and private.* "You have never told anyone your gift has a blind spot."
  `companion/ch0.js:145`
- *Saying yes was kind.* Immediately undercut by the phone: "**You are not sure it was kind.**"
  `companion/ch3.js:295`
- **Demolished in one clause in ch7:** "**Your gift had a blind spot. It does not.**"
  `companion/ch7.js:260`

### A.5.3 Layer 3 — believed reputation

| the Binder believes… | that they think… | actually | cite |
|---|---|---|---|
| **Wren** | that Wren wants to be told yes | Wren wanted the true answer and said so in advance of asking it twice; the honest answer is DONTKNOW, and the one time a Binder gives it, Wren says "**Nobody's ever said that to me. Everyone always knows.**" and then, almost too low to hear, "*Thanks.*" | `companion/ch3.js:295`; `lore.js:44` |
| **the other three** | that the Binder is the authority, and an authority with a hole is not one | the other three depend on the Binder absolutely and never audit; the audit is entirely internal | `ch2.js:243` |
| **Marrow** | that the Provost's thread is not the Binder's business | Marrow is carrying a grief no one in the school has ever named, and the Binder is the only person alive who can see it | `companion/ch3.js:276`; `ch4.js:217` |
| **the Convocation** | that the two sworn threads in the Hall are the whole of the nine's politics | correct, and it is the single most useful fact anybody holds in ch1 — one ask worth two votes | `companion/ch1.js:141-144` |
| **Vane** | **[GAP]** — though the Binder is the one seat that can see Vane's gold running to Wren all night, and on `VANE_ACCEPT` can see it running to *themselves* | "Three people are awake between the Gallery and the Tower. Two of them are paid. **So, since the Hall, are you.**" | `companion/ch2.js:169`; `companion/ch3.js:236` |

### A.5.4 Layer 4 — feelings

| toward | actual | shown | the gap |
|---|---|---|---|
| **Wren** | a four-year-old professional anomaly that became a friend and has never been resolved in either direction | one kind "Yes" | the Binder is the seat asked to adjudicate whether Wren is real, twice, and honestly cannot — and on E0 receives a thread with a name on each end, drawn, once, before the page goes white `companion/ch8.js:126-130` |
| **the Seer** | a practice thread that will not hold | nothing | the only strained relationship at the table, visible to one of its two members |
| **Marrow** | a deliberate refusal to look | nothing | on E3 Marrow addresses precisely the thing the Binder would not look at: "The oath you swore tonight was **to a Chair. Swear the next one to a person.**" `companion/ch8.js:198` |

### A.5.5 Voice

| | |
|---|---|
| **Sentence shape** | Rule, citation, consequence. "A sigil begins at the scratch. On Founders' work a notch is only a maker's mark." Two clauses, flat, no hedging. |
| **Under stress** | Cites harder and earlier — moves the rule to the front of the sentence and drops the reasoning, which is exactly when the table stops believing it. The phone pre-empts this: "Say your rule before the Warden closes the ring — **and say it even when it sounds wrong.**" `companion/ch5.js:336` |
| **Tells** | Dates everything. Says "the older binds" as though it settled a moral question. Uses "only" as a scalpel ("a notch is *only* a signature"). |
| **Subjects it circles** | Who is sworn to whom; which rule is older; what a lock costs. |
| **The one subject it will not touch** | **The Provost's thread**, and behind it its own absence of one. |
| **Three lines that are perfectly the Binder** | (1) "**The older Law binds.** A plinth faces the hole it was cut to stand in, not the dial it happens to stand over." `companion/ch2.js:160` (2) "It cannot be untied. Not by you, not by her, **not ever**." `companion/ch4.js:260` — a lock explained as a bereavement. (3) "**None. Not unbound. The knot itself.**" `ch6.js:678` — the seat's whole gift resolving into a sentence it does not understand and says anyway. |
| **The line that is NOT the Binder** | **"When the count runs off the end it comes back to slot 1."** `companion/ch3.js:267`. It is *mechanically false* — with `WIDDERSHINS = true` from slot 4 the run is 4→3→2 and never wraps, and running off slot 1 widdershins arrives at slot 4, not slot 1 (`ch3.js:340-346`; `CANON.md` §13.20). The Binder is the one seat that is never casually wrong about a rule; a stale sentence from a sunwise draft, in this seat's voice, is worse than a bug — it is a characterisation error, and it is player-facing. **[WRONG]** Fix: delete the clause, or rewrite as *"This count runs the other way, and there is nothing past slot 1 to wrap into."* |

### A.5.6 Wants

- **Aloud:** to get the rule right, first time, on a door that counts once.
- **Unsayable:** **to be tied to somebody.** Never stated by the Binder, stated once by Wren, in a
  letter, after it is too late to act on (`companion/ch8.js:191`).

### A.5.7 Worst moment

**ch3 laundry, YES.** "You said yes because it was kind. **You are not sure it was kind.**" — said to
the only person in the school with no thread on them, by the only person who can see that, and billed
again in ch6: "In the laundry you said yes, **to the one person in this school with no thread on
them.**" (`companion/ch6.js:272`). **Authored, main path.**

**A second, unbilled one — [GAP].** ch5's sealed hold: the Binder (like every seat) may answer NO, and
if all four do, the Hearth prints "Nobody stays. **Not cowardice — four people who each thought
somebody else would.**" (`ch5.js:593`). That is a worst moment for all four players simultaneously, it
is authored on the Hearth — and **no phone ever mentions it again.** The volunteer gets a private
epilogue line (`companion/ch8.js:112-118`); the three who refused get nothing, on any ending. The
game bills the kind lie four times and the collective failure of nerve zero times. **Recommendation
[PROPOSED]:** one `fine` line on each non-volunteer's ch8 Wren page: *"Nobody asked you afterwards.
You have decided that means nobody knows."*

---

## A.6 The four to each other — the believed-reputation grid

The mechanism is uniform and elegant, and it is falsified in the Prologue's last scene without anybody
noticing: **each seat believes the other three regard its gift as complete, and protects that belief
by silence** (`companion/ch0.js:99`, `:112`, `:124`, `:145` — three of the four state the silence
outright). Then the lamp lights, all four say their anomaly aloud in seat order (`ch0.js:217-218`),
and **Wren tells them it never worked**: "Yes. All four of you. **I've known for years.**"
(`ch0.js:226`).

| | thinks the **Reader** is | thinks the **Listener** is | thinks the **Seer** is | thinks the **Binder** is |
|---|---|---|---|---|
| **Reader** | — | reliable to the note; the table's clock | literal, useful, slightly strange | the one who is never wrong about a rule |
| **Listener** | the one who does not miss things | — | exact, and silent for a reason | the authority, and the reason we commit |
| **Seer** | the one who can name what I can only locate | the one who tells us *when*; the only other seat with a private grief **[PROPOSED]** | — | the one who decides what my cuts oblige |
| **Binder** | authoritative, and occasionally over-thorough | precise; the seat I never have to double-check | my witness, and the person I am supposed to have practised with | — |

Two structural notes for the author:

1. **No seat has a stated opinion of any other seat anywhere in the game.** Every cell above is
   **[PROPOSED]**. The one relationship fact that exists lives on **one** phone
   (`companion/ch0.js:141-142`), so three of four players cannot roleplay their own friendships.
   **[GAP]**
2. **The party's thread state is the game's quietest arc and only the Binder sees it:** Reader↔Listener
   sworn and Seer↔Binder broken (ch0) → "red, **each to each, and holding**" (ch6,
   `companion/ch6.js:269`) → "red, knotted, to each other" (ch7, `companion/ch7.js:256`) → on E0
   "**four friends and nothing between them but air**", "and it has never not held" (`ch8.js:287`;
   `companion/ch8.js:237`). Nobody at the table is ever told the practice thread healed.
   **Recommendation [PROPOSED]:** one Binder SPEAK line in ch6 — *"Say this one out loud: it holds
   now"* — converts a private arc into a table moment for four words.

## A.7 The real person at the table — what the design asks a human to feel, beat by beat

The author asked for the real players to be modelled. This is the seat-facing half; `PLAYER-MODEL.md`
holds the hypothesis-tracking half.

| beat | what the person at the table is actually doing | the risk |
|---|---|---|
| **T2, ch0:** four anomalies aloud, in seat order | Performing an intimacy with three friends eleven minutes in, cold, with no established group voice | If the table laughs here, the whole night's register is set wrong. There is no line instructing the Voice to slow down. **[GAP]** |
| **T3, ch1 vote:** four private facts, two asks, one irreversible call | The first time a player's silence can cost the party. The Reader's "you begin with two" and the Binder's "one ask is worth two" are the load-bearing ones | A quiet player who does not volunteer their number loses Wren the vote and will know it. The game never says afterwards *which* fact went unsaid. **[GAP]** |
| **T4, ch2 stair:** catch Wren or catch the case | Thirty seconds, no phone, pure table argument | The one choice in the game with no expertise attached — deliberately, and it is the best-designed panic in the night |
| **T5, ch3 laundry:** the whisper | Four people lie or tell the truth alone, on a phone, about a friend, and may never discuss it | This is where the person stops playing a gift and starts playing a self. Everything in §A.2–A.5's "worst moment" rows lands here |
| **T6, ch4 oath:** KNOT or EMBER | The Binder chooses, in public, whether the party's word can be taken back — and Law 4 says the sworn-to cannot tell | The only player choice in the game whose whole point is that the other character will never know. Marrow then *does* know (`ch7.js:387`) — §13.14 |
| **T7, ch5 hold:** stay and lose your Sight for a chapter | A sealed yes/no about volunteering to be hurt, with a first-yes-wins race condition | A player who says yes and is beaten to it by seat order gets no acknowledgement at all. **[GAP]** |
| **T9, ch7 bargain:** by their real first name, in front of their friends, fifteen seconds | The game stops addressing the role and addresses the human | The single strongest design moment for the real player, and the reason `ctx.name` exists |
| **T9, ch7 walk cost:** one private sentence naming what they lose | Reading a sentence about their own gift's death, alone, then voting | Four different sentences, each written to that seat's self-image — the best-targeted writing in the game (`companion/ch7.js:185-188`) |
| **T10, ch8, E0:** a letter with their name on it that burns | Reading a goodbye addressed to them personally, while the phone dims under their hands | The one place the house rule "never show your phone" is lifted (`ch8.js:60`) — the design's last and best gesture |

---
---

# PART B — THE NINE MASTERS

## B.0 The frame: character as predicate

Six of the nine are **never named to the player**; Sorrel and Oriel are named only on the win path
(`ch1.js:254-256`); a `VOTE_LOST` table finishes Chapter I knowing no Master's name but Marrow's
(`CANON.md` §3.4). What the game gives instead is a *mechanical* personality: each Master is one clause
in `tally()` (`ch1.js:51-58`), and the clause is the characterisation.

| seat | House | the predicate | what the predicate means as a person |
|---|---|---|---|
| 1 Sorrel | Harrowden | askable; carries Quill | will move, for a price, if addressed personally |
| 2 Quill | Ossery | `FOLLOWS.quill='sorrel'` | has given his vote away and can take it back only if someone asks him directly |
| 3 Brack | Dunmere | `PLEDGED`, filed "with the Chair" | already decided, still soliciting |
| 4 Hallan | Fellwood | `DEAF` + `FOLLOWS.hallan='orrin'` | has removed himself from persuasion by choice |
| 5 Vey | Goldmarch | `BOUGHT` (coin under the cushion) | sold, and hiding it under himself |
| 6 Orrin | Redmoor | `BLOCKED` (a soldier behind the chair) | prevented, not bought |
| 7 Oriel | Sable | askable; undeclared and says so | will decide on evidence, and wants the evidence brought to her |
| 8 Tarn | Wyeburn | `BOUGHT` (coin in the sleeve) | sold, and not ashamed |
| 9 Marrow | the Chair | `PLEDGED`, `locked`; "the Chair does not hear cases" | has taken herself out of the argument in order to run it |

**The structural fact nobody in the game says out loud, and the most valuable single line available
here:** the Convocation's *default state is SEND*. Absent any intervention, seven seats file nothing,
"nothing filed means **SEND**" (`companion/ch1.js:97`), and the child goes to the Crown. Two hundred
and twelve years earlier the same body "would not pay" and sent one Warden down alone
(`companion/ch6.js:286-287`). **Chapter I is Year 212 re-run in miniature, with the same body, the
same default, and the same price structure — and the four buy the child's night with two promises to
two Masters.** If §12.3(a) is ruled (the Order *is* the Convocation), one clause in ch6 or ch7 —
Marrow's or the Binder's — converts the game's opening puzzle retroactively into its thesis.
**[PROPOSED]**

---

## B.1 MASTER SORREL — Seat 1, Harrowden (green, chevron)

**Named to the player:** win path only (`ch1.js:254`). **Words in the shipped game:** ~60.

### Layer 1 — actual

| trait | evidence |
|---|---|
| **Requires to be addressed personally, and says so where only one person can hear** | "The child goes to the capital — **unless somebody comes and asks me to my face.**" `companion/ch1.js:108` |
| **Commands a vote she has not asked for.** Quill is sworn to her; when her hand goes up, his follows unbidden | `ch1.js:61`: "Seat 2, unasked, sees that hand go up and puts one up too." |
| **Transactional within seconds.** Names her price before the Provost can cross the hall | `ch1.js:254-255`; the scene's 45-second timer, `ch1.js:251` |
| **Institutionally ambitious, not personally loyal.** Her price routes the Ember *past* the Chair | "it comes to **the nine of us — the Convocation. Not to her.**" `ch1.js:255` |
| **Predicts Marrow's plan before Marrow has made it** | "**When the Provost sends you down for it**" — `ch1.js:255`, against Marrow's `ch1.js:310` "In the morning I would have sent — no. Tonight." **[CONTRADICTION §13.26]**, and it is more interesting read as characterisation: Sorrel has predicted the Chair correctly for years |
| **Collects.** Her guards are at the top of the vault stair with a writ, the same night | `ch2.js:387-389` |
| **And her writ is the thing that saves the four at the Tower door** — a Crown captain will not fight the Convocation's seal | `ch3.js:403-404` |
| **Does not forget** — the narration's own two-word verdict when her price is refused | `ch1.js:266` |

**Would not admit:** that "ask me to my face" is not pride, it is *evidence-gathering* — she is
checking whether the Chair's side will spend a courtesy on her, and she has decided in advance what
their refusal means. And that she voted to keep a child she then robbed in the same night, which she
would call consistency (the Ember belongs to the nine) and a fourteen-year-old would call theft.

**Defining contradiction.** **She demands to be addressed as a person and treats everybody else as a
position.** The only individual fact about Sorrel in the entire game is that a child once called her a
goat *to her face* (`ch3.js:405`) — that is, a fourteen-year-old did the exact thing she says she
requires of the world, and she kept him anyway. Nobody, including her, ever connects those two facts.

### Layer 2 — self-image

The last plain dealer in a bought hall. She is the only seat that states its terms *in advance* and
keeps them; two of her colleagues are paid, one is deaf, one is silenced, and one has already filed.
She believes she is the only Master doing politics in the open — and, against a Convocation like this
one, she is nearly right.

### Layer 3 — believed reputation

| Sorrel believes… | that they think… | actually |
|---|---|---|
| **Marrow** | thinks Sorrel is a nuisance to be routed around, and would never ask her for anything | correct, and Marrow never does — Marrow sends children instead (`ch1.js:310`) |
| **the four** | think she is the price of their victory, and will pay it | **[PROPOSED]** — and one of the three ch1 outcomes is that they refuse her, which she registers permanently (`ch1.js:266`) |
| **Oriel** | thinks Sorrel is crude | **[PROPOSED]**; the game gives Oriel one reaction to losing the promise and it is silence ("Oriel says nothing at all", `ch1.js:263`) |
| **Quill** | thinks she is worth following | true, and she has never checked — she has never asked him anything in the shipped game |
| **Wren** | thinks nothing about her at all | false, and the funniest fact in Chapter III: Wren has a settled, specific, insulting opinion of her (`ch3.js:405`) |

### Layer 4 — feelings

| toward | actual | shown | gap |
|---|---|---|---|
| **Marrow** | rivalry dressed as constitutionalism | perfect procedural courtesy | she never once says the Chair's name in the shipped game — only "the Provost" and "her" |
| **the four** | instruments, correctly valued | "Good. See that you keep yours." `ch1.js:263` | she is the only adult all night who treats them as parties to a contract rather than as children, which is both insulting and the most respect they get |
| **Wren** | **[GAP]** — she votes to keep a child and has no line about the child | — | she is a character whose one act of mercy is unexplained. **[PROPOSED]:** it is not mercy; keeping Wren keeps the Ember question open, and the Ember is what she wants |
| **Quill** | assumes him | never addresses him | the game's cleanest unspoken relationship: two Masters, one thread, no dialogue |

### Voice

- **Shape:** conditional then flat. A clause that names the condition, a clause that names the price.
  Never more than two sentences.
- **Under stress:** shortens to imperatives about *keeping* ("See that you keep yours").
- **Tells:** says "the nine of us" where others would say "the Convocation"; uses "when", not "if".
- **Circles:** who owes whom, what comes to the body rather than the Chair.
- **Will not touch:** the child, as a child. She never refers to Wren as anything.
- **Three lines that are perfectly Sorrel:** (1) "The child goes to the capital — unless somebody comes
  and asks me **to my face**." `companion/ch1.js:108` (2) "**Not to her.**" `ch1.js:255` (3) "Good.
  **See that you keep yours.**" `ch1.js:263`
- **The line that is NOT Sorrel:** "Since you asked me to my face." — `ch1.js:61`. The murmur already
  set the condition; repeating the phrase verbatim on being asked turns a politician into a vending
  machine, and it is the only moment where Sorrel is written as a lock rather than a person.
  **[WRONG]** Proposed: *"Seat 1 hears you out and nods once. 'Somebody came. Good.'"* — same
  mechanic, and it lets a table feel it did something rather than triggered something.

### Wants

- **Aloud:** the Cold Ember, for the Convocation, not for the Chair.
- **Unsayable:** to be the Chair — or, more precisely, to make the Chair ask her for something once.
  Everything she does in ch1–ch2 routes authority around Marrow and toward the body she sits in.
  **[PROPOSED]**

### Worst moment

**ch2, the top of the stair.** She sends armed men to take the Cold Ember from four fourteen-year-olds
who have just watched a stair collapse — one of them with a broken arm — and the seizure is
mechanically forced: `SORREL` sets `EMBER_LOST` whatever the players did (`ch2.js:383`). The school's
only insurance against the fire dying leaves the building because a Master was owed a favour by
children.

**Does the game have it?** *Almost.* It happens in one clause of stage direction — "Behind her, two of
the Convocation's guards and a writ" (`ch2.js:388`) — and Sorrel is **not present**, has no line, and
is never mentioned again except as a writ in ch3. **[GAP]** **Recommendation [PROPOSED]:** give her
four words at the top of that stair, in her own voice, that make the reader dislike her — and then let
`ch3.js:403-405` do its work, where her extortion is the thing that saves them. A character you are
allowed to hate in ch2 and must thank in ch3 is worth far more than a flag.

---

## B.2 MASTER QUILL — Seat 2, Ossery (grey, crescent)

**Named:** never, to any player. **Words:** 19.

### Layer 1 — actual

| trait | evidence |
|---|---|
| **Sworn to Sorrel** — red, knotted, 2→1, one of only two threads in the whole Hall | `companion/ch1.js:141` |
| **Acts on another person's gesture, unprompted:** when Sorrel's hand goes up, his follows | `ch1.js:61` |
| **States his own irrelevance out loud, accurately-sounding, and is wrong** | "I vote as Seat 1 votes. **You spent that on nothing.**" `ch1.js:62` — against `tally()`, where asking him *does* flip him: `{quill, oriel}` scores four keeps, one better than not asking. **[CONTRADICTION §13.25]** |

**Defining contradiction.** **A man whose entire self-account is "I do not matter", delivered in the
one sentence of his life that is factually false.** He is worth a vote; he has told the only people who
could have used him that he is not; and he believes it.

**Layer 2 — self-image.** A loyal second. Loyalty as a complete moral position, requiring no further
thought. He is the only Master who volunteers information that reduces his own value.

**Layer 3 — believed reputation.** He believes **Sorrel** does not think about him at all (true: she
never addresses him); he believes **the hall** reads him as her instrument (true); he believes **the
four** wasted an ask on him (false, and the game's own code says so).

**Layer 4 — feelings.** Toward Sorrel: an uninspected attachment he would call duty. Toward the child:
nothing recorded. The one honest thing in the portrait is that he raises his hand for a child before
anyone asks him to — a small mercy performed as an act of obedience.

**Voice.** Two clauses; the second cancels the first. "Seat 2 says yes, **then says the rest**"
(`ch1.js:62`) — the stage direction is his entire personality.
- **Three perfect lines:** only one exists. The other two are proposals: *"I do not need to hear it.
  Seat 1 will have heard it."* **[PROPOSED]**; *"Ask her. She will tell me what I think by supper."*
  **[PROPOSED]** — which is the line that would make his contradiction visible in seven words.
- **The line that is NOT Quill:** "**You spent that on nothing.**" `ch1.js:62`. Not because it is out
  of character — it is exactly in character — but because it is **mechanically false and unframed**:
  nothing marks it as a boast, a habit, or a man's mistaken humility. As shipped, the game tells a
  truthful-sounding lie in a teaching scene. **[WRONG]** Fix: one word of stage direction — *"He is
  wrong about that, and has been for years."*

**Wants.** Aloud: to be loyal. Unsayable: to be asked — by Sorrel, once, about anything.

**Worst moment.** He talks the four out of the one thing he could have given them. It is on the main
path, it is in his only line, and the game does not know it is a worst moment. **[GAP]** — fixing
§13.25 fixes the character at the same time.

---

## B.3 MASTER BRACK — Seat 3, Dunmere (blue, tower)

**Named:** never. **Words:** 26.

### Layer 1 — actual

| trait | evidence |
|---|---|
| **Pledged in writing, "with the Chair", before the doors shut** | `companion/ch1.js:95` |
| **And audibly soliciting anyway** | "Ask me where I stand. **Go on. Ask me.**" `companion/ch1.js:109` |
| **Functions as a trap**: an ask spent on him buys a vote already held, and the Reader's page exists partly to defuse him | `companion/ch1.js:99`; `ch1.js:63` |

**Defining contradiction.** **He has already given his vote away and still wants the courtship.** Brack
filed early — the act of a man who wanted the Chair to know he was sound — and then spent the hour
before the bell trying to be asked for the thing he had already surrendered. He is the only Master
whose need is entirely social and entirely public.

**Layer 2 — self-image.** Reliable. Early. The Chair's man. He has confused being *counted on* with
being *consulted*, and he is starving.

**Layer 3 — believed reputation.** He believes the hall thinks him decisive (he filed first); he
believes Marrow values him (she filed him and never speaks to him in the shipped game); he believes
the four do not know where he stands — which is the only belief he holds that is *checkable*, and the
Reader's page checks it in one line.

**Layer 4 — feelings.** Toward Marrow: loyalty with a hole in it. Toward the four: an opportunity —
they are the only people in the building who might still ask him something.

**Voice.** Imperative repetition. He is the only voice in the game that repeats itself inside one
murmur ("Go on. Ask me."), and that repetition is the whole characterisation.
- **Three perfect lines:** one exists (`companion/ch1.js:109`). Proposed: *"Filed before the doors.
  You can look it up."* **[PROPOSED]**; *"Nobody has asked me a question since the spring."*
  **[PROPOSED]**
- **Off-voice:** none. His 26 words are internally consistent — one of only three Masters of whom that
  can be said.

**Wants.** Aloud: to be asked where he stands. Unsayable: to matter to the count.

**Worst moment.** He will let four children spend their one irreplaceable resource on him for the
pleasure of being addressed, and he knows it is already spent. It is **on the main path, in the
mechanics, and completely unbilled** — no line ever tells the table that Seat 3 knew.
**[GAP]** **Recommendation [PROPOSED]:** if the four ask him, `ch1.js:63` should cost him something:
*"Seat 3 stands with the Chair, in writing, since before the doors shut. He looks pleased with
himself for a moment, and then less so."*

---

## B.4 MASTER HALLAN — Seat 4, Fellwood (green, tree)

**Named:** never. **Words:** 31.

### Layer 1 — actual

| trait | evidence |
|---|---|
| **Deaf by choice, and it is a performance staged for the room** | "Seat 4 has shut his ears. **He means it.** An ask spent on him is spent." `companion/ch1.js:113` |
| **Sworn to Orrin, and they are cousins** | `companion/ch1.js:110`, `:142` |
| **Will not name his cousin** — and the game hangs a lampshade on it | "**He never says who his cousin is. Somebody here can see that.**" `companion/ch1.js:114` |
| **Does not turn his head** | `ch1.js:64` |

**Would not admit:** that he is voting the way a bought man votes, without having been bought. Orrin
is not voting at all — a soldier stands behind that chair (`companion/ch1.js:127`) — so Hallan has
shut his ears in order to follow a man the Crown has already silenced. His loyalty is delivering the
Crown's result for free.

**Defining contradiction.** **A man announces, out loud, to a room, that he is not listening to it.**
Deafness performed is address. And he protects a cousin's name in a hall where one seat can see the
thread anyway — a secrecy that is both sincere and useless.

**Layer 2 — self-image.** A man of one loyalty in a hall of none. He believes his refusal is the
cleanest position available, and against Vey and Tarn he has a case.

**Layer 3 — believed reputation.** He believes the hall reads him as immovable (true); he believes
nobody knows to whom he is sworn (false — `companion/ch1.js:142`); he believes Orrin would do the
same for him (untestable, and the game should leave it untestable).

**Layer 4 — feelings.** Toward Orrin: the only uncomplicated love in the Convocation. Toward the child:
declines to have one, which is the point.

**Voice.** Flat declarative in the first person plural of family. "I vote as my cousin votes. I hear
nobody else." Two sentences, no conjunction.
- **Three perfect lines:** two exist (`ch1.js:64`; `companion/ch1.js:110`). Proposed third: *"He is
  my cousin. That is the whole of it."* **[PROPOSED]**
- **Off-voice:** none.

**Wants.** Aloud: nothing — that is the position. Unsayable: to be asked *by Orrin*, who cannot ask
anybody anything with a soldier at his back.

**Worst moment.** The result of his integrity is identical to the result of Vey's corruption. The game
never stages the comparison. **[GAP]** **Recommendation [PROPOSED]:** one Binder or Listener clause
noting that the deaf seat and the bought seats voted the same way — a free line, and it is the
chapter's thesis.

---

## B.5 MASTER VEY — Seat 5, Goldmarch (gold, sun)

**Named:** never. **Words:** 14. **[THIN]**

**Layer 1 — actual.** Bought: a Crown-struck coin **under the cushion** (`companion/ch1.js:125`).
Votes SEND (`ch1.js:65`). The only physical detail in his portrait is that "something at Seat 5's cuff
catches the light" — he is wearing part of it (`ch1.js:65`).

**Defining contradiction [PROPOSED].** **He hid the coin under himself and then wore some of it.** Vey
wants deniability and cannot resist the purchase; the concealment is sincere and the cuff is the
truth. Where Tarn is shameless, Vey is *caught* — which makes him the only bought Master the reader
could pity, and the game does not let them.

**Layer 2 — self-image [PROPOSED].** A pragmatist. The child was always going to the capital; taking
something for a vote that was lost anyway is prudence, not treason.

**Layer 3 — believed reputation [PROPOSED].** He believes nobody can see it — and the one seat that
can, can. He believes the Chair suspects and cannot prove.

**Layer 4 — feelings.** Toward Vane: a supplier, to be kept at a distance. Toward the coin: he is
sitting on it, which is the single most characterising stage direction available and it is four words
long.

**Voice [THIN].** No line exists. Proposed register: courteous, procedural, slightly too quick to
agree that the matter is settled. Proposed lines: *"The capital is not a dungeon, Master."*
**[PROPOSED]**; *"I have heard the Chair's case. I have heard it twice."* **[PROPOSED]**

**Worst moment.** He has one and it is invisible: he sat on the price of a child for an hour. **The
game gives him no scene, so the reader cannot dislike him — only the Seer's phone can, in a
bullet.** **[GAP]** **Recommendation [PROPOSED]:** one clause in `ch1.js:65` — *"Seat 5 shifts, the
way a man shifts who has put something under him."*

---

## B.6 MASTER ORRIN — Seat 6, Redmoor (red, wave)

**Named:** never. **Words:** 0 — **he never speaks.** **[THIN]**

**Layer 1 — actual.**
- A soldier in the Envoy's grey stands behind his chair; "**Nobody gets near enough to speak.**"
  (`companion/ch1.js:127`); "A soldier in the Envoy's grey steps between you and Seat 6. **You never
  get near.**" (`ch1.js:66`).
- Hallan is sworn to him, and they are cousins (`companion/ch1.js:110`, `:142`).
- He is the only Master the Crown *prevented* rather than *purchased*.

**The single most valuable unclaimed fact about any Master in the game.** Vey and Tarn were bought;
Orrin was blocked. The Crown spends coin where coin works and a body where it does not. **That is a
statement about Orrin's character, made entirely by the enemy's tactics, and nobody in the game says
it.** **[GAP]** **Recommendation [PROPOSED]:** one Seer or Binder `fine` line in ch1 — *"They bought
two and posted a man behind the third. Somebody decided he was not for sale."* Free, and it hands the
player the one Master worth admiring.

**And the colour.** Vane's wax seal is `#8a2f2f` — **exactly Redmoor's House colour**
(`art/scenes-ch1.js:117` vs `:14`; `CANON.md` §12.35). If deliberate, Vane is Redmoor-born and the
seat he has stationed a soldier behind is **his own House's**. That single ruling gives Orrin a
biography, Vane a wound, and Chapter I a second floor. If accidental, it is a palette collision and one
hex value fixes it. **This is the highest-value one-word ruling in the Convocation.**

**Layers 2–4 [PROPOSED], conditional on the above.** Self-image: the one seat that cannot be bought.
Believed reputation: he believes the hall pities him and he would rather they did not. Feelings:
toward Hallan, gratitude he cannot express; toward Vane, a family matter conducted in silence.

**Voice.** None. And it should stay none: **an unpurchasable Master who is never allowed to speak is
the Crown's method rendered as stagecraft.** If the author gives him one line, it should come in ch7,
where the Convocation is absent and the soldiers are on the stair.

**Worst moment.** He does not have one and cannot: he is the only member of the Convocation who is not
responsible for the Convocation's result. That is worth protecting.

---

## B.7 MASTER ORIEL — Seat 7, Sable (violet, stars)

**Named:** win path only (`ch1.js:256`). **Words:** ~70 — the richest of the eight.

### Layer 1 — actual

| trait | evidence |
|---|---|
| **Undeclared, and announces the fact** | "Nobody has asked me anything. **I have not decided anything.**" `companion/ch1.js:111` |
| **Decides on evidence, in public, without warmth** | "Seat 7 listens a long time, **asks two questions**, does not smile." `ch1.js:67` |
| **Hedges her own mercy** | "Very well. **Tonight** — keep." `ch1.js:67` |
| **Studies the child all evening, arithmetically** | Wren: "Like I was **a sum she was doing**." `ch1.js:306` |
| **Her price is total disclosure, including the parts that discomfit** | "Tell me what you find down there. **All of it.** … **Even the parts you don't like.**" `ch1.js:256`, `:266` |
| **Comes to collect in person, with a lamp she does not need** | `ch2.js:390` |
| **Scraped the paint herself as a girl, with a bread-knife, and watched them repaint it inside the week** | `ch4.js:588` (branch `ORIEL`) |
| **A promise to her alone restores Law 0 to the Binder's Book** | `ch4.js:85`; `CANON.md` §13.17 — currently unexplained, and she is the explanation |
| **Follows the four into the bell-chamber and says nothing, loudly** | `ch7.js:60` |

**Would not admit:** that she has known what is under the paint since she was a girl and has done
nothing with it for thirty years except accumulate. Her price is information because information is
what she does *instead* of acting. Four children go under the school tonight and she asks them to
report back; she came down the stair behind them and did not go through the door.

**Defining contradiction.** **The only Master who knows, and the only one who sends somebody else to
find out.** She took a bread-knife to the Order's lie as a child and has spent her adult life
requesting summaries.

### Layer 2 — self-image

A scholar in a hall of traders. She does not smile, does not declare early, does not take coin, and
asks two questions instead of one — and she reads that as rigour. She believes she is the school's
conscience in cold storage: *someone has to be able to prove it, later.*

### Layer 3 — believed reputation

| Oriel believes… | that they think… | actually |
|---|---|---|
| **the four** | think her price is cheap; she expects them to under-honour it | her price is the only one that compounds — everything they find below becomes hers, including Mere |
| **Marrow** | thinks Oriel is unreadable, and dislikes that | Marrow never speaks of her; Oriel's note is found **under the Provost's own cushion**, so she has been in that chair (`ch4.js:587`) |
| **Sorrel** | thinks Oriel is a coward for not declaring | **[PROPOSED]**, and it is the good version of their rivalry |
| **the Order** | does not remember a girl with a bread-knife | they repainted it inside the week, which is remembering | `ch4.js:588` |
| **Wren** | is a sum, not a boy — and that Wren does not notice being calculated | Wren noticed, minded, and said so within the hour | `ch1.js:306` |

### Layer 4 — feelings

| toward | actual | shown | gap |
|---|---|---|---|
| **Wren** | not warmth — *correctness*. She wants to know whether the child is the proof she has been waiting thirty years for | an evening of unbroken attention, and "Tonight — keep" | Wren experienced her attention as the worst kind of adult regard: being solved |
| **the four** | respect, of a documentary kind; they are the first people in thirty years to go down and come back | "All of it. **Even the parts you don't like.**" | this is the only price in the game that is also a piece of moral instruction, and she never explains why she needs it |
| **the Order** | a thirty-year grudge, kept in a note under a cushion | one sentence, unsigned except by name | the Order is the only thing she is *angry* about, and the anger exists on one branch, in one letter, in eighteen words |

### Voice

- **Shape:** short, declarative, unwarmed. Adverbs absent. Her sentences end on the operative word
  ("keep", "all of it", "don't like").
- **Under stress:** asks another question instead of answering one.
- **Tells:** the hedge ("Tonight"); the doubling ("All of it… even the parts"); silence used as
  pressure rather than absence (`ch7.js:60`).
- **Circles:** what is under things; what is on the record; what she was told versus what she saw.
- **Will not touch:** what she did about it — thirty years of not acting. She talks about the paint
  and never about the interval.
- **Three lines that are perfectly Oriel:** (1) "Nobody has asked me anything. **I have not decided
  anything.**" `companion/ch1.js:111` (2) "Very well. **Tonight** — keep." `ch1.js:67` (3) "I scraped
  that paint myself, as a girl, with a bread-knife. **They painted it back inside the week.**"
  `ch4.js:588`
- **The line that is NOT Oriel:** "**Tell me what you find down there. All of it.**" `ch1.js:256`.
  Not the sentiment — the *ignorance*. As written, it plays as curiosity; but Oriel already knows what
  is under the school's central lie, has known since she was a girl, and the line gives no sign of it.
  A woman with a bread-knife in her history does not ask children to go and look for her out of
  interest. **[WRONG]-by-omission.** Proposed: *"Tell me what you find down there. All of it. I have
  been told what is down there twice, by people who had not been."* — same price, same length,
  and it plants `ch4.js:588` three chapters early.

### Wants

- **Aloud:** to be told everything found below.
- **Unsayable:** to be shown that she was right as a girl — and, under that, to be forgiven for the
  thirty years in which being right was all she did.

### Worst moment

**ch7.js:60 — "Master Oriel came down behind you and says nothing, loudly."** She followed four
fourteen-year-olds to the edge of the Cold, watched them decide whether to die, and did not speak.
That is her whole character delivered in one stage direction.

**Does the game have it?** It has the *position* and not the *moment*: she has no line in the Finale,
no reaction to the wall being scraped six feet from her, and she does not appear in any epilogue
(`CANON.md` §12.30). **[GAP]** **Recommendation [PROPOSED]:** give her exactly one line in ch7, after
the wall or after the Decision, and make it indefensible — *"I was fifteen. Nobody came down with
me."* — which converts the silence from a cameo into a confession, and pays off `ch4.js:588`,
`ch1.js:256` and §13.17 at once.

---

## B.8 MASTER TARN — Seat 8, Wyeburn (brown, key)

**Named:** never. **Words:** 13. **[THIN]**

**Layer 1 — actual.** Bought: the same Crown coin, **in the sleeve** (`companion/ch1.js:126`).
"Seat 8 smiles with every tooth. **Crown coin in it.**" (`ch1.js:68`). Votes SEND.

**Defining contradiction [PROPOSED].** **He is the only person in the Hall who is enjoying himself.**
Tarn's corruption is cheerful, visible, and socially frictionless — he keeps the coin where a hand goes
when a hand is shaken. In a chapter where everyone else is performing gravity, the man selling a child
is the warm one in the room. That is the most frightening portrait available for thirteen words, and
the game already has it; it simply never uses him again.

**Layer 2 — self-image [PROPOSED].** A realist with good manners. He would say he is the honest one:
he has not pretended to agonise.

**Layer 3 — believed reputation [PROPOSED].** He believes everyone knows and nobody minds; he believes
the Chair has no power over him; he believes Vey is a hypocrite.

**Voice [THIN].** No line exists. Register: hospitable, present-tense, uses second person ("you"),
compliments people he is voting against. Proposed: *"Your Chair argues beautifully. She always has."*
**[PROPOSED]**; *"He will be warm in the capital, and fed."* **[PROPOSED]**

**Worst moment.** Same as Vey's and invisible in the same way. Note for the author: **`DESIGN.md:209`
gives Tarn a role in the Finale (leading the Convocation's guards) that the shipped game does not
contain** (`CANON.md` §13.51 row 6). If the author wants one bought Master to reappear, the ch7 edge
is where he should — the man who smiled while selling Wren, standing where Wren is about to be sold
again.

---

## B.9 PROVOST ILSABET MARROW — Seat 9, the Chair

Full four-layer treatment: `personae-principals.md` §2. Recorded here only as a **member of this
body**, because that is the relationship the other document does not cover.

| layer | as a Master among Masters | cite |
|---|---|---|
| **Actual** | She files her KEEP in her own hand before the doors shut, then removes herself from persuasion — "The Chair does not hear cases. The Chair counts them." She has **never named the thing below to the nine**, and is going down tonight without telling them. She cheats her own procedure for the children (stalls the bell) while keeping its letter | `companion/ch1.js:94`; `ch1.js:69`; `ch4.js:592`; `ch1.js:178` |
| **Self-image** | Custodian of a constitution: "This school does not hand its children to a writ. **It hands them to a vote.**" She believes the procedure is the protection | `ch1.js:146` |
| **Believed reputation** | She believes the nine think her secretive and will tolerate it; she believes Sorrel is manageable and Oriel unreadable; she believes none of them suspects what is under the school | Sorrel has already predicted her errand and her couriers (`ch1.js:255`), and Oriel has been in her chair (`ch4.js:587`). **Both beliefs are wrong, and the game never lets her find out.** **[GAP]** |
| **Feelings** | Contempt is too strong; *impatience*. She runs an assembly she does not brief. Her unsent letter is addressed "To the nine" and was never sent | `ch4.js:592` |

**Her worst moment as a Master** (distinct from the personal one in §2.7): she asks four fourteen-
year-olds to do, tonight, the thing she will not ask eight adults to do at all — and the letter that
would have asked them is found under a cushion, unsent, on one branch. `ch4.js:592`

---

## B.10 THE CONVOCATION AS A BODY

| layer | |
|---|---|
| **Actual** | Nine seats; default SEND; two bought, one blocked, one deaf by choice, one pledged, one following, two askable, one counting. Five of nine keeps a child. It struck Law 0 in 212 rather than pay four Sightings, "and called it grammar", and it still carries the struck Law in its own Book, dated (`lore.js:57`; `companion/ch6.js:286-287`). **It never reappears after ch7, and whether Law 0's restoration is accepted on the record is never said** (§12.30) |
| **Self-image** | A body that protects children from writs by procedure. Marrow states it for them and no Master contradicts her (`ch1.js:146`) |
| **Believed reputation** | It believes the Crown must negotiate with it (the Crown buys it instead); it believes the school's translation of the stone is scholarship (it is the body's own cover story, §7.3) |
| **Feelings** | Toward the Chair: owed. Toward the child: an occasion. Toward the thing under the school: **it has not been told there is one** |
| **Defining contradiction** | **It legislated against being overruled and then overruled the Founders.** Law 3 — "where two Laws disagree, the older binds" — is a Founders' Law; the Convocation of 212 could not amend Law 0 because of it, so it *struck* the law instead and wrote a prohibition in its place (`lore.js:57`, `:60`, `:67`). A body that cannot be overruled and will not pay is a body that deletes. |
| **Worst moment** | Year 212, entire. **It is the best worst moment in the game and it happens off-screen, in the past, on one phone, in a `reveal` block the Binder must opt into** (`companion/ch6.js:286-287`). Nobody is named. Nobody speaks. There is no scene in which a person refuses to pay. |
| **Recommendation [PROPOSED]** | The single highest-value addition available to this cast: **one remembered voice from 212** — a line in the Binder's ch6 reveal attributed to a Chair of that year. Twelve words in a human mouth ("Four Masters. I could not. I wrote the other thing instead.") would give the game's antagonist a face for the first time, and it costs one string. |

---
---

# PART C — THE FOUR FOUNDERS

## C.0 What the shipped game actually contains

| Founder | shipped presence | cite |
|---|---|---|
| **Mere** | Named **once**, on an optional path, on the back of plinth 1. Plus: her sheet (the only Founder-voice document in the game), her strip, her two gates, her counting ward, her hidden door, and four of Marrow's lines about her | `ch2.js:301`, `:315`, `:319`; `companion/ch4.js:62`; `ch5.js:265-266`, `:287`, `:395`, `:412`, `:480`, `:553` |
| **Idony** | Named **once, in a world table**, as the author of Law 7 — the only Law named for a person. **Her name appears in no chapter, including the chapter that teaches her Law** | `lore.js:70`; §12.37 |
| **Halvard** | **Does not exist in the shipped game.** The name is in `docs/DESIGN.md:132` and nowhere in `js/` | grep |
| **Rook** | **Does not exist in the shipped game.** Same | grep |

**And one thing the brief's cast list does not know:** the shipped game may already contain Halvard
and Rook **by epithet**. See §C.4 — the newel post.

---

## C.1 MERE — "who kept the fire, after"

### Layer 1 — actual

| trait | evidence |
|---|---|
| **One of the four who wrote the cold glyph with four hands and went down into the wound** | `companion/ch4.js:62`; `ch2.js:301` |
| **Offered to go alone and was refused** — by at least one of the other three | `companion/ch4.js:62` |
| **Records that one was never asked**, and records it second, before the act itself | `companion/ch4.js:62` |
| **Survived, and kept the fire afterwards** — she signs herself by the aftermath, not the deed | `companion/ch4.js:62`; §12.15 |
| **Built the school's whole defensive grammar below ground**: two sigil gates, a counting ward, and a hidden door | `ch5.js:265-266`, `:287`, `:412` |
| **Her gates are designed to defeat the reader's habits, not their ignorance.** "Her gates do not lie. **They do not play fair.** Read them together." | `ch5.js:266` |
| **Every one of her wards requires four people.** The gates need four separate perceptions; the Count asks **two questions of each of four seats** and hears only three answers | `ch5.js:266`, `:412`; `companion/ch5.js:191-195` |
| **Her wards answer wrongness without locating it** | "The ward counts **three seats true, and does not say which**." `ch5.js:455-456` |
| **She left a rebuttal of the school's reading in her own niche**, in miniature, readable two ways | `ch2.js:315`, `:319` |
| **Her sheet is signed in runes ᛗᛖᚱᛖ, and nothing in the game points it out** | `ch2.js:143` |
| **[PROPOSED]** She is the second figure in the tapestry: the one who has turned, head offset, arm going back "for something that is not there" — and the art's own comment genders that figure *her* | `art/scenes-ch4.js:47-52` |

**The observation the game has built and never states.** *Mere's stair cannot be passed by one
person.* Every ward on it requires a quorum of four. In Year 212 the Convocation "sent one Warden
down instead" (`companion/ch6.js:287`) — down **this stair**, through **these gates**. So either the
Order's lone Warden forced Mere's wards the way Marrow forces them (`ch5.js:333`, `:395`, `:475`), or
they came down **Mere's door, the one left for people who were not asked** (`ch5.js:287`). Either
answer is devastating and free, and the game asks neither. **[GAP] / candidate ruling for §12.65.**

**Would not admit:** that the door for the unasked is an apology. She names the exclusion in the second
sentence of the only text she left, four hundred years before anyone could read it, and then builds a
way in for the person it happened to. That is not a security feature; it is a woman still arguing a
case she lost.

**Defining contradiction.** **She built a stair that demands four people, for a school she did not
trust to send four.** Mere's wards are a prophecy and an insult: they assume the institution will
degrade, cut corners, read the easy way round, and try to come down alone — and every one of those
assumptions is correct by Year 212. She protected the wound from the school that inherited it.

### Layer 2 — self-image

Read her signature: "**Mere, who kept the fire, after.**" Not *who closed the wound*. Not *one of the
four*. She defines herself by the part that came afterwards — the keeping — and she puts the refusal
("I offered to go alone and was refused") *before* the achievement in her own four-sentence account.
This is the self-image of someone who believes her real contribution was custodial, and who is still,
in writing, litigating a decision the others made about her.

### Layer 3 — believed reputation

| Mere believes… | that they think… | actually |
|---|---|---|
| **the other three** | that they refused her offer to protect her, and she has not accepted the reason | unknowable; the sheet is the only witness and it is hers |
| **the one never asked** | that they were wronged, and that she was party to it | the door says so `ch5.js:287` |
| **whoever comes after** | will read the stone the easy way, alone, and get it wrong — and must be stopped by the architecture from doing so | exactly right: the school drills "one, two, three, four" and has since the floor was laid (`ch2.js:119`) and the 212 Convocation reads every inscription sunwise (`lore.js:66`) |
| **the school** | will not be told the truth, so the truth must be built into doors | the Order painted one figure over four and taught a translation (`ch4.js:533`; `lore.js:75`) |

### Layer 4 — feelings

| toward | actual | shown | gap |
|---|---|---|---|
| **the other three** | unresolved. She was overruled, and went with them anyway | one clause in a sheet | the tapestry's second figure reaches back "for something that is not there" — grief drawn, never written **[PROPOSED]** |
| **the excluded one** | responsibility, kept for four hundred years | a door in a wall on a landing | Wren uses it, and Wren is the un-asked — the payoff exists and nobody remarks on it |
| **the fire** | ownership. She *kept* it | the whole architecture below the school | she is the Hearth's first Keeper and the only Founder who had to live beside what she made |
| **Marrow, four hundred years later** | — | Marrow apologises to her by name while breaking her gate: "**Mere. Forgive me. There is a child on this stair.**" `ch5.js:395` | Marrow models herself on a woman whose defining recorded act is *offering to go alone and being refused* — and Marrow has arranged her life so that nobody can refuse her. The game never joins them (`personae-principals.md` finding 9) |

### Voice

| | |
|---|---|
| **Shape** | Four flat sentences, no subordination, each one a fact with a consequence withheld. Clause order is the meaning: refusal, exclusion, act, colour. |
| **Under stress** | The sheet *is* the stressed version. There is no other sample of her prose. |
| **Tells** | Counts. Every sentence she leaves has a number in it: four, one, one, four. Says "we" for the deed and "I" for the offer and the keeping. |
| **Circles** | Consent — who offered, who refused, who was not asked. Three of her four sentences are about who agreed to what. |
| **Will not touch** | What it was like down there. The only description she gives of the inside of the Cold is a colour, applied to herself: "came up grey." |
| **Three lines that are perfectly Mere** | (1) "We were four. **I offered to go alone and was refused. One was never asked.** We wrote the cold glyph with four hands, and came up grey. — Mere, who kept the fire, after." `companion/ch4.js:62` (2) "The ward counts **three seats true, and does not say which**." `ch5.js:455-456` — her voice as a machine: exact about the quantity of your error and silent about its location. (3) "**KNOT, CROWN, THORN** — four, as one, went through. Not one." `ch2.js:319` — a rebuttal cut in stone and hidden behind the plinth that bears her name. |
| **The line that is NOT Mere** | **"A scratch on a Founders' door is only where the mason rested the tool."** `companion/ch5.js:330`. It characterises Mere's gates as carrying *incidental* marks — casual workmanship — on the same page that calls them wards that "do not play fair". Everything else about her says the opposite: her cuts are deliberate, her decoys are deliberate, and a scratch on her door is a **trap laid for exactly the rule the school teaches**. **[WRONG]** Proposed: *"On these doors the scratch is bait. She knew what the school would be taught to do with one."* — same mechanic, and it turns a rules footnote into characterisation. |

### Wants

- **Aloud (and she did say it, once, in writing):** to have gone alone.
- **Unsayable:** to be argued with again. Every ward she built is a machine that requires four people
  to disagree productively in front of it before it opens. Mere's afterlife is a four-hundred-year
  attempt to force the conversation she lost.

### Worst moment

**ch5, the stair, `ch5.js:395`.** Her wards are between a frightened child and the only thing that can
save him, and they are working exactly as designed. The Provost has to break two of them, apologising
by name, while soldiers come down. **Mere's security architecture nearly kills the person it was built
for.**

**Does the game have it?** Yes — and it belongs to Marrow, in Marrow's mouth. Mere is never present to
be disliked. **[GAP]** **Recommendation [PROPOSED]:** one clause on the Binder's or Reader's page at
the broken gate — *"She did not build these for a child in a hurry. She built them for an institution
in a hurry, and she could not tell the difference from here."* Twenty-six words, and Mere becomes a
person who was wrong about something.

---

## C.2 IDONY — the only Law named for a person

### Layer 1 — actual, entirely derived from one row of a table

**Law 7 · Founders' · Year 0 — "Idony's Law: a sigil sworn under KNOT begins at the sworn-to. Build the
ring by the Laws, then turn it sunwise until the sworn-to's glyph sits at the first mark."**
(`lore.js:70`)

| what the Law tells us about her | reasoning |
|---|---|
| **She is the Founder who thought about people rather than objects.** Every other Founders' Law governs stone, orientation, or procedure. Hers governs *whom you swore to* | `lore.js:57-70` — compare Laws 1, 2, 5, 8, 10, 12, 13 |
| **She made a relationship physically load-bearing.** Under her Law a sigil's geometry is re-oriented by the identity of the person it is sworn to — the ring literally turns to face them | `ch7.js:162` |
| **She is the Binder's ancestor.** Thread-Sight's whole domain — who is bound to whom — is the domain of the one Law with a name on it | `lore.js:9`, `:70` |
| **She legislated for a case the Founders did not need**: swearing under KNOT to a person, in a world where the four had already sworn nothing to anyone. Her Law is written for successors | **[PROPOSED]** |
| **[PROPOSED] The notch at socket 1 of the Finale ring is her signature.** Two cuts by two different hands; "a notch is only a signature"; Law 7 governs this exact ring; her name appears nowhere in the chapter that teaches her Law | `companion/ch7.js:219`, `:221`, `:230`; §12.37 |

**Defining contradiction [PROPOSED].** **The Founder who wrote relationship into the geometry is the
reason the four, having sworn to an office, must dismantle and re-turn their whole ring at the
climax.** Idony's Law is the mechanism that punishes swearing to a Chair instead of to a person — and
Marrow's last advice to the Binder, on E3, is "The oath you swore tonight was to a Chair. **Swear the
next one to a person.**" (`companion/ch8.js:198`). **The game already contains Idony's moral, in
Marrow's mouth, four hundred years later, and has never spoken her name aloud.** That is the cheapest
unclaimed resonance in the whole script.

**Layer 2 — self-image [PROPOSED].** A jurist of obligation. She would say the other three built the
machine and she wrote down what it costs to promise something.

**Layer 3 — believed reputation [PROPOSED].** She believes the others regard her Law as a refinement,
a small thing beside the seal — and it is the only one of the ten with a name attached, which means
somebody insisted.

**Layer 4 — feelings [PROPOSED].** Toward Mere: the one who would not let Mere go alone is a candidate
(`companion/ch4.js:62`) — a Founder who believes obligations run *to people* would refuse, on
principle, to let a person discharge a four-person debt alone. **This is the single most economical
assignment available: Idony is the one who refused Mere.** It gives the refusal a reason, gives Idony
a relationship, and makes Law 7 a memorial.

**Voice [THIN].** One sentence exists, and it is legislative: a rule, a procedure, a termination
condition. Register: exact, unhurried, second-person imperative, ends on where a thing must *sit*.
Proposed lines, in that register: *"A promise points at somebody. Build the ring so it does too."*
**[PROPOSED]**; *"Mere. If you go alone, the Law you leave behind says one person can."* **[PROPOSED]**
— the second is the line that would pay off `companion/ch4.js:62`, Law 0, and 212 simultaneously.

**Wants.** Aloud: that the grammar record who is bound to whom. Unsayable: that she would rather have
gone in Mere's place, and had no standing to offer.

**Worst moment.** Her Law is used, in the Finale, by an adult, to **bar four children from saving a
child** — "You swore under KNOT, and it cannot be unbound" (`ch7.js:387`). Idony's contribution to the
world is the sentence that stands between Wren and the Fourfold Walk. **The game stages this and does
not know whose it is.** **[GAP]** **Recommendation [PROPOSED]:** name her once at `ch7.js:387` or in
the Binder's ch7 page — "Idony's Law. She wrote it so a promise would point at a person; the Provost is
using it to point at herself." One clause, and §12.37 closes at the same time.

---

## C.3 HALVARD and ROOK — the two empty chairs

**They do not exist in the shipped game.** No line, no name, no art, no table row. `DESIGN.md:132`
asserts four statues left to right Mere, Halvard, Rook, Idony; the shipped antechamber gives them
**numbers only** — "No name, no shape, no mark" (`art/scenes-ch2.js:66-68`; `ch2.js:205`). Any document
that names them from `DESIGN.md` is publishing a fact the player cannot reach (`CANON.md` §13.51).

**What the game has nevertheless allocated to them.** The tapestry individuates exactly two of four
figures: **the second has turned and reached back**, and **the fourth carries COLD**
(`art/scenes-ch4.js:47-56`; the Seer's corner answers "fourth" and "second", `ch4.js:534-545`). If Mere is
the second **[PROPOSED]** and Idony is the refuser, then the two unnamed Founders are **the carrier
(figure 4)** and **the undifferentiated figure 1 or 3**. The story-shaped roles still unfilled are:

| role the story needs | evidence it exists | candidate |
|---|---|---|
| **The one who wrote the glyph** — the fourth figure, carrying COLD into the fire | `art/scenes-ch4.js:57`; `ch4.js:536-537` | Halvard or Rook |
| **The one who refused Mere's offer** | `companion/ch4.js:62` | Idony **[PROPOSED]**, §C.2 |
| **The one who was never asked** — possibly a fifth person, not one of the four (§12.4); the Under-Marches' First Hall has **five** arches (§12.26), and Mere built a door for "people who were not asked" | `companion/ch4.js:62`; `art/scenes-ch5.js:64`; `ch5.js:287` | the persona-shaped hole, §C.5 |

## C.4 The cheapest route to naming them: **the newel post**

The Binder's ch5 page carries **five oaths carved on Mere's newel**, with their locks and their dates
(`companion/ch5.js:180-186`):

| oath | line | lock | sworn | binds? |
|---|---|---|---|---|
| **the Gate** | THORN ASH | **KNOT** | Year 0 | yes — and **cannot be unbound** |
| **the Veil** | ASH THORN | **VEIL** | Year 0 | **no** — Law 12: an oath binds only if its lock is KNOT or EMBER (`lore.js:68`) |
| **the Well** | WELL ASH | **KNOT** | Year 0 | yes |
| **the Keeper** | WELL EMBER | **EMBER** | **212** | yes — and **reconsiderable** |
| **the Chair** | CROWN THORN | **EMBER** | **212** | yes — and **reconsiderable** |

Three of these are Year-0 oaths bearing **office-names**; and `DESIGN.md:77` names the Founders
*Halvard the Gate, Idony the Binder, Rook the Veil, Mere the Keeper*. **Two of the three Year-0 newel
oaths are, by epithet, already Halvard's and Rook's — and they are printed on a player's phone in the
shipped game.** The author can name two missing Founders for the cost of one clause on that page,
without inventing anything.

And the table then pays three further dividends, all of them free and all of them dark:

1. **The Veil's oath does not bind.** A Founder swore, in Year 0, under a lock that their own Law 12
   says has no force (`companion/ch5.js:183` + `lore.js:68`; the source comment says so outright at
   `companion/ch5.js:178-179`: "the Veil is early and does not bind"). **A Founder who made an
   unbinding promise is a candidate for the one who refused Mere, or the one who was never asked —
   and either way it is the single most characterising fact available about an unnamed Founder.**
   **[PROPOSED]**
2. **"The Keeper" is re-sworn in Year 212** — the office Mere held, taken up again in the year the
   seal failed, under **EMBER**, the reconsiderable lock. That is the oath of the lone Warden the
   Convocation sent down (`companion/ch6.js:287`). **The Order sent one person into the Cold under an
   oath they were permitted to take back.** **[PROPOSED]**
3. **"The Chair" is also sworn in 212, also under EMBER.** The office Marrow holds was constituted in
   the cover-up year under a revocable lock — and in ch4 four children swear to that Chair
   (`ch7.js:421`). If the Binder ever noticed, it would be the best rule-lawyer beat in the game.
   **[PROPOSED]** — and Marrow's E3 advice ("swear the next one to a person") becomes a confession
   about her own office.

## C.5 THE FOUNDERS AS A BODY

| layer | |
|---|---|
| **Actual** | Four people who wrote COLD with four hands, went down together, closed the wound, came up grey, and left themselves burning on top of it. They wrote ten Laws, including Law 3 ("the older binds") — i.e. **they legislated against being overruled before anyone tried**. They legislated plurality into the physics: COLD takes four hands, KNOT glosses "four-as-one", a Great Sigil names every glyph once so no one hand can finish one. They cut the prophecy as a **ring**, so it has no first cut and no owner. At least one of them survived and kept the fire | `companion/ch4.js:62`; `ch6.js:839`; `lore.js:57`, `:60`, `:69`; `glyphs.js:21`; `ch6.js:702-703` |
| **Self-image (from the tapestry, which is the only self-portrait)** | **Four ordinary people, not hooded, not robed, walking in together, all four casting shadows, and no child anywhere in the picture.** That is how they chose to be remembered. The school hoods them in stone (`ch2.js:205`) and the Order paints them down to one | `art/scenes-ch4.js:47-62`; `ch4.js:536-537` |
| **Believed reputation** | They expected to be misread and built against it: Law 3 pre-empts amendment, the stone is a ring, Mere's gates punish the school's own drill, the glyph-set makes the key word unwriteable by one person. **They believed posterity would try to make this a story about one person, and they were right by Year 212** | `lore.js:60`; `ch6.js:391-395`; `ch5.js:266` |
| **Feelings, toward each other** | Four abreast, evenly spaced, walking the same way — **except the second, whose head and arm go back for something that is not there.** One offered to go alone and was refused; one was never asked | `art/scenes-ch4.js:47-56`; `companion/ch4.js:62` |
| **Feelings, toward whoever comes after** | Ambiguous and unresolved, and it is the richest thing about them: they cut an **eight**-socket ring for an eight-glyph sigil that *requires* COLD, and the eighth socket has a name cut in it in letters four hundred years older than the present alphabet — **Wren's** | `ch7.js:699`; `companion/ch7.js:241` |
| **Defining contradiction** | **They made consent a law of physics and completed the work by excluding somebody.** "COLD is written by four hands" is a rule about plurality; "one was never asked" is what plurality cost. The Hearth — the most beautiful object in the world of this game — stands on a consent failure, and Mere's hidden door is the apology, built by one of the four, into the stair |
| **The second contradiction, and it is worse** | **They left a socket with a name in it.** Either they knew a hollow would come, and named it, and built the ring around the place it would stand — in which case the Founders planned for Wren four hundred years before Wren — or somebody cut that name later in an alphabet nobody has spoken for four hundred years. The first reading makes the Founders far more loving *and* far more culpable at once, and **nobody in the game asks** (§12.22, §12.5) |
| **Worst moment** | "One was never asked" — eighteen words, on one phone, on an optional path, gated behind ch5, reachable only if a Reader took a rubbing in ch2 (`companion/ch4.js:62`, `:71`). **The Founders' single act of wrongdoing is the least reachable text in the game.** A reader who plays well and misses one optional niche never learns the Founders did anything but save everyone. **[GAP]** |
| **Recommendation [PROPOSED]** | Put the exclusion on a surface the main path touches — the simplest is one clause at the four thrones (`ch5.js:347`): *"Four thrones. There is a fifth shelf, cut and never finished."* The art already has five arches in the drowned hall below (`art/scenes-ch5.js:64`) and the room is on every playthrough. |

---
---

# PART D — WREN'S COMIC ENGINE, CAST-FACING

**Primary treatment: `personae-principals.md` §1.8** (mechanism, four gears, nine crack points). I have
re-derived the engine independently against the same source and **agree with the trigger, the defence
and the swerve**. What follows is what a second pass adds, plus the cracks at the sites this document's
cast owns. **Where a scene is already claimed by §1.8, it is marked [COLLIDES] and my version is an
alternative, never an addition** — two cracks in one scene is one crack too many, and the instruction
was "very very subtly".

## D.1 The mechanism, restated and extended

| | |
|---|---|
| **Trigger** | Another person's face, at the moment they are about to feel something *about Wren*. Three of the four clearest instances are literally instructions to stop looking: "Don't look like that" (`ch2.js:375`), "Don't do faces" (`ch7.js:405`), "Half of you can't see me properly any more. **Good.**" (`ch8.js:323`) |
| **What it defends against** | Being *owed*. Pity is a gift already given, and a person who has received cannot decline the next request. Wren's whole architecture exists so that no request ever has to be made |
| **Audience selection — the addition** | **Wren jokes at whoever is least able to bear the moment, not at whoever caused it.** After the Envoy wins, the joke goes to the four, not to Vane (`ch7.js:433`). After the stair, the joke goes to the people who chose the box, not to the arm (`ch2.js:369`, `:375`). After a Master extorts them, the joke is aimed at the Master's dignity, which costs nobody at the table anything (`ch3.js:405`). The engine is a triage system |
| **What the jokes are about, by cast** | **The Masters: status-levelling.** "*Sorrel* saved me? I called her a goat once. **To her face.**" (`ch3.js:405`) — and note the joke *is* that Wren already did the one thing Sorrel demands of the world. **The Founders: scale-levelling.** "Four thrones. Four Founders. It is a *theme*." (`ch5.js:349`); "One, bound, down. **Cheerful woman, Mere.**" (`ch5.js:337`); "Huh. It is smaller from down here. Do not tell it I said that." (`ch6.js:473`). **The four: diagnostic affection** — always a competence, overstated, never a failing (`ch0.js:146-149`) |
| **What the jokes are never about** | Anyone's weakness, anyone's appearance, and Wren's own future |
| **The swerve (agreed)** | **The future tense.** No joke anywhere in nine chapters is about tomorrow, about the inside of the Cold, or about dying |
| **The second swerve (new)** | **Wren never jokes about being wanted.** Every status joke is about being *looked at* ("the thing they're all coming to look at", `ch0.js:156`) or *used* ("the occasion", `ch5.js:254`; "Four idiots and a hollow", `ch7.js:423`) — **never about being chosen, kept or belonging to anybody.** The word *mine* is in Wren's mouth exactly once in the game, about a lamp: "tonight I want one thing that's **mine**." (`ch0.js:158`). The engine passes that subject once, in the first four minutes, and never returns to it |
| **Under pressure** | Four gears, and `WREN_SCARED` (`ch3.js:234` → `ch4.js:79`) is a shipped, working implementation of gear 4 with eight authored swaps **used in exactly one chapter**. Nothing in ch5–ch8 reads it. Agreed with §1.8: this is the largest under-used instrument in the game's characterisation |

## D.2 The cracks — cast-facing set

**Rule (inherited and endorsed):** one clause, flat, no italic, a want or a hurt stated as a fact,
placed mid-sentence, buried by the clause after it, reacted to by nobody, and **never the last line of
a scene**.

| ch | site | shipped line | with the crack (bold) | what it admits | status |
|---|---|---|---|---|---|
| **1** | `ch1.js:306` | "Seat Seven watched me the whole time. Like I was a sum she was doing. Seer, what is *on* that wall?" | "Seat Seven watched me the whole time. Like I was a sum she was doing. **She got the wrong answer and looked pleased.** Seer, what is *on* that wall?" | That Wren watched Oriel watch him, all evening, and graded her — the object doing the observing. Buried by the pivot to the Seer | **[COLLIDES]** with §1.8's ch1 crack. Use one |
| **2** | `ch2.js:369` / `:375` | the stair | — | — | **[COLLIDES]**; §1.8's two are better placed than anything cast-facing here |
| **3** | `ch3.js:405` (`WRIT`) | "*Sorrel* saved me? I called her a goat once. To her face." | "*Sorrel* saved me? I called her a goat once. To her face. **She still knew which child I was.** Goats are underrated." | That Wren expects not to be individually known by adults, and that being remembered by a woman he insulted is the warmest thing that has happened to him tonight. Buried by the goat joke | **new, no collision** |
| **5** | `ch5.js:349` (the ledge) | "Four thrones. Four Founders. It is a *theme*." | "Four thrones. Four Founders. **Somebody sat in those.** It is a *theme*." | That Wren has never had a seat anywhere — the dais has a gold ring cut for standing in (`art/scenes-ch1.js:95-96`), the socket is a place to stand, and the only furniture in the world made for him is a hole. Buried by the joke | **new** |
| **5** | `ch5.js:479` (the Count) | "I would have got two of them. I do not have a phone." | "I would have got two of them. **Nobody made me a page.** I do not have a phone." | That Mere's ward — the Founders' own last question — has no question in it for the thing the Founders left behind. Stated as a complaint about stationery | **new, and the best of this set** |
| **5** | `ch5.js:287` (Mere's door) | "Mere left this one for people who were not asked. Mum will pretend she did not see." | "Mere left this one for people who were not asked. **She knew there'd be one.** Mum will pretend she did not see." | That Wren has identified himself, silently, with the excluded person in a four-hundred-year-old document he has never read — and credits a dead woman with a foresight nobody living has shown him | **[COLLIDES]** with §1.8's ch5 crack ("Somebody thought of it."). Mine names Mere; §1.8's is more universal. **Author picks one** |
| **6** | `ch6.js:689` | "And — Mum. I know…" | **leave exactly as is** | — | agreed with §1.8 |
| **7** | `ch7.js:697` (the socket) | "It's cold in here. Obviously. It's me." | "It's cold in here. Obviously. It's me. **Somebody measured.**" | That the hole is exactly Wren's size and was cut four hundred years before Wren — the dread of having been *fitted for*, said in two words and immediately buried by "Four sealed words said WALK." Plants §12.22 and §12.5 at zero cost | **new, no collision** (§1.8 takes `ch7.js:423`, a different scene) |
| **8** | `ch8.js:312` | E0 | — | — | **[COLLIDES]**; §1.8's ("I checked twice.") is right and should stand |

**Total new words across the four non-colliding cracks: 16.** No new scene, flag or branch.

**One caution for whoever implements.** `ch5` now has three candidate sites (the door, the ledge, the
Count) across one chapter. **Take at most two, and never two in adjacent scenes.** The descent is where
Wren is quietest in the shipped script and the quiet is doing work.

---
---

# PART E — FINDINGS, in the order I would fix them

| # | finding | site | cost |
|---|---|---|---|
| 1 | **The Convocation's worst moment has no human voice.** 212 exists as two sentences in an opt-in reveal on one phone. One remembered line from a Chair of 212 gives the game's antagonist a face | `companion/ch6.js:286-287` | 1 string |
| 2 | **Oriel has a worst moment and no line in it.** She follows four children to the edge of the Cold and says nothing, loudly | `ch7.js:60` | 1 line |
| 3 | **Sorrel's worst moment happens off-stage in a stage direction**, and her extortion later saves the party — a hate-then-thank structure the game has built and not lit | `ch2.js:388` vs `ch3.js:403-404` | 1 line |
| 4 | **The newel post already names two missing Founders by epithet**, and its 212 oaths say the lone Warden and the Chair itself were sworn under a revocable lock | `companion/ch5.js:180-186` + `lore.js:68` | 1 clause + author ruling |
| 5 | **Idony's Law is used on screen to bar the Walk, and her name is never said in the chapter that teaches it.** Her moral is already in Marrow's E3 letter | `ch7.js:387`; `lore.js:70`; `companion/ch8.js:198` | 1 clause; closes §12.37 |
| 6 | **"One was never asked" is the Founders' only wrongdoing and the least reachable text in the game** | `companion/ch4.js:62`, `:71` | 1 clause on the main path |
| 7 | **Orrin was blocked, not bought** — the Crown's own tactics say he could not be bought, and nobody says it. Compounded by Vane's seal being Redmoor red | `companion/ch1.js:127`; `art/scenes-ch1.js:117` vs `:14` | 1 line + 1 ruling |
| 8 | **Quill's only line is mechanically false and unframed** | `ch1.js:62` vs `ch1.js:55` | 1 clause |
| 9 | **Brack's trap costs the table an ask and he is never billed for knowing** | `companion/ch1.js:109`; `ch1.js:63` | 1 clause |
| 10 | **Hallan's chosen deafness delivers the Crown's result for free**, and the game never compares him to the bought seats | `companion/ch1.js:113` | 1 clause |
| 11 | **Four off-voice lines in the player seats**: Reader flattered (`companion/ch7.js:241`), Listener made vague (`ch6.js:657`), Seer made stupid (`ch6.js:648`), Binder made mechanically wrong (`companion/ch3.js:267`) | as cited | 4 rewrites, all supplied above |
| 12 | **The ch5 hold's collective failure is billed to nobody.** Three players who refused get no line on any ending | `ch5.js:593`; `companion/ch8.js:112-118` | 1 `fine` line ×3 |
| 13 | **Three of four players never learn their own friendships.** The party's thread arc resolves privately on one phone | `companion/ch0.js:141-142`; `companion/ch6.js:269` | 1 SPEAK line |
| 14 | **Chapter I is Year 212 in miniature — same body, same default, same refusal — and nobody says so** | `companion/ch1.js:97` vs `companion/ch6.js:286` | 1 clause, ch6 or ch7 |
| 15 | **Wren's cast-facing cracks**: four new, 16 words, three collisions named | §D.2 | 16 words |
