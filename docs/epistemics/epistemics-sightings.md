# EPISTEMICS — **The Sightings: what they are, why four, and what walking costs**

> ## ⚠ TOTAL SPOILERS
> Working document for the author. Contains the Prologue's, the Finale's and all five endings' reveals.
> Companion to `CANON.md` (ground truth: §6, §6.1, §12.7, §12.33) and `PLAYER-MODEL.md` (the reader's
> head). This file is **belief only**. Where a row says a character is *wrong*, the truth is in
> `CANON.md` and is restated here only where the error needs it. All citations are to the shipped
> source under `/home/user/puzzle-game/js/`, not to `docs/DESIGN.md`, which loses every disagreement.

---

## 0. SCOPE

### 0.1 The mystery, stated exactly — three questions, and what the game answers

| # | the question | what the game actually commits to | where it is said | who ever says it aloud |
|---|---|---|---|---|
| **Q1 — what** | What is a Sighting? | "A **Sighting**. One way of seeing, one to a person, **and nobody chooses which one they get**." That is the whole definition, and it is the narration's, said once. | `ch0.js:241` | **Nobody.** No character in the game defines a Sighting, at any point, on any branch. |
| **Q2 — why four** | Why are there exactly four kinds? | Never stated (`CANON.md` §12.7). The game *builds* the answer physically — four Founders, four plinths, four dials, four bells, four thrones, four seats, one glyph that needs four hands — and never says it. | `lore.js:5-10`; `ch2.js:205`; `ch5.js:347`; `ch6.js:470`; `lore.js:57` | **Nobody.** The nearest thing is a joke: "Four thrones. Four Founders. It is a *theme*." — Wren, `ch5.js:349` |
| **Q3 — the cost** | What does walking into the Cold do to a Sighting? | It **spends it, permanently**: "You come out of it the way the Founders came out: **grey-eyed and ordinary**." That is what the Founders paid, and it is what the Convocation refused to pay in 212. | `ch8.js:287`, `:320-321`; `ch7.js:756`, `:763`; `companion/ch4.js:62`; `companion/ch6.js:286-287`; `companion/ch7.js:185-188` | **Nobody, before the fact.** The Hearth first names it at `ch7.js:713`, as a stage direction, at the moment it becomes irreversible. |

**The short answer this document is built on.** The four Sightings are the Founders' four, still being
dealt out; the price of writing COLD is four people's Sight; the Founders paid it, the Convocation of
212 refused it and forged a grammar to hide the invoice; and the *only* place in the shipped game
where the invoice is itemised in advance is **four `fine` lines on four separate phones, sixty seconds
before the sealed word** (`companion/ch7.js:185-188`). `CANON.md` §12.7's recommendation (a) — one
Sighting per Founder, forever — is **[PROPOSED]** and unstated; every row below that depends on it is
marked.

### 0.2 The structural fact that governs every table below

**The proof that walking spends Sight is partitioned exactly the way the puzzles are, and the game
never joins it on the shared screen.**

| half of the proof | who holds it | when | gate | what it does *not* say |
|---|---|---|---|---|
| the **effect**: "We wrote the cold glyph with four hands, and **came up grey**." | **the Reader alone**, in the Book | T7 | `LETTER` (ch2 rubbing) **and** `maxChapter >= 5` — `companion/ch4.js:64`, `:71` | never says *grey* means *spent*; never says who paid or why |
| the **price**: "**Four hands meant four Masters giving up their Sight.** The Convocation sent one Warden down instead." | **the Binder alone**, in the Book, behind an opt-in `reveal` | T8 | `ctx.unlocked('ch6')` — `companion/ch6.js:283-288` | is about **212**, not about tonight; names no consequence for the four |
| the **application to you, tonight**, per seat | **each of the four, alone**, on SPEAK | T9 | `WALK_UNLOCKED` — `companion/ch7.js:184-188` | arrives **after** the group Decision (`ch7.js:364`) and under a two-minute clock (`ch7.js:452`) |
| the **statement after the fact** | the Hearth, to everybody | T9-end / T10 | none | `ch7.js:713` "Your Sighting is spent. Look up."; `ch8.js:287` "grey-eyed and ordinary" |

Consequence, and it is the single most important epistemic fact in this mystery: **on a table that
never took the ch2 rubbing and never opened the Binder's ch6 reveal, not one person in the room —
player or character — knows what the Fourfold Walk costs at the moment the table decides to do it.**

### 0.3 Stakeholders tracked

Wren · Provost Ilsabet Marrow · Lord Cassian Vane · the **Reader** · the **Listener** · the **Seer** ·
the **Binder** (tracked individually: their gifts differ, their evidence differs, and the cost is
priced to each of them in different words) · **the real people at the table** · and, in the
**peripheral knowers** block under each spine point where they move: Master Oriel, Master Sorrel, the
nine as a body, Mere (dead; her sheet is a knower-proxy), the Convocation of 212 (a corporate knower),
the Crown and Vane's captain.

**Not tracked, and that is itself a finding:** Quill, Brack, Hallan, Vey, Orrin and Tarn have
Sightings by assertion (`ch0.js:242`) and are never given a perception, a belief or a stake. See §14(g).

### 0.4 Confidence vocabulary

**certain** (would stake the night on it) · **firm** (would act on it, would not argue for it) ·
**held** (believed, actively not examined) · **suspected** (entertained, unacted-on) ·
**unformed** (the character has never had the thought, and has no words for it).

---

## 1. T0 — before play

Nobody has asked any of the three questions. The word "Sighting" exists; the thing it names does not
have a history in anybody's mouth.

| character | Knows | Believes (confidence) | Wrong about | Withholding — from whom, why | Would say if asked directly | Changed at this point |
|---|---|---|---|---|---|---|
| **Wren** | **[WHAT]** What each of the four's gifts does, in operational detail, including facts only one seat can perceive — that the lamp hums, that there are cuts under the brass "nobody has ever seen", that the Binder alone was taught the ring rule (`ch0.js:172-174`). **[WHY FOUR]** That the stone says *four, as one*, and has known for years (`ch7.js:404`). **[COST]** **[PROPOSED]** That the alternative to Wren walking is four people walking — which follows directly from the reading Wren holds | That the night ends with Wren in the Cold (**certain**). That nothing the four learn can change that (**firm**) | **[PROPOSED]** That the four would rather not be asked. E0 disproves it in five words: "You *idiots*. I had a *speech*." (`ch7.js:759`) | **(a)** That the true reading names four walkers — from **the four**, protective: Wren has decided they must not have to carry a request (`CANON.md` §9.1). **(b)** *How* Wren knows one-seat facts — from **everyone**; no reason is ever given (§12.21). Not-having-words is the charitable reading; the game gives none | "One way of seeing, one to a person. I don't have one. Obviously." **[PROPOSED]** — Wren never discusses own lack of a Sighting anywhere in the game | — |
| **Marrow** | **[WHAT]** Has a Sighting of her own by assertion (`ch0.js:242`) — **never named, never used, never mentioned by her** in nine chapters. **[WHY FOUR]** The Founders' operational practice in detail: four bells, four hands, one caller and three ringers (`ch6.js:487`, `:579`, `:594`); that Mere's gates "need four readers" (`ch5.js:266`). Can read the stone from its foot (`ch6.js:824`), so holds *four, as one*. **[COST]** **[PROPOSED, load-bearing]** That the 212 bill was four Masters' Sight — she says so once, on one branch: "**They could not afford four Masters, so they made it grammar.**" (`ch7.js:396`) | That the road is **one walker**, and that the walker is the child she raised (**certain**, fourteen years, `ch6.js:691-692`) | That one walker is the road. She holds the four-walker reading and has never acted on it. **[PROPOSED]** — the error is in §14(b), not here | **(a)** The price of a Sealing — from **the four**, from **the nine**, from **Wren**; she names a cost to nobody, all night. **(b)** Her own Sighting — from **everyone**; unexplained. **(c)** That she can read the stone — from **the four** until `ch6.js:824` | "The Founders paid for it once. I have spent fourteen years making sure nobody has to pay it again." **[PROPOSED]** — the sentiment is `ch6.js:691-692` + `ch7.js:396`; the sentence is not in the game | — |
| **Vane** | **[WHAT]** What a named gift *does*: he names Under-Sight's function unprompted — "Ask your **Seer** what is under the paint" (`ch1.js:283`). That the four have them and that the Crown values them enough to register them (`companion/ch8.js:207-208`, `:291`) | That a Sighting is an asset the Crown can purchase, rank up, and post (**firm**) — he offers four masterships (`ch1.js:282`) | **[PROPOSED]** Nothing demonstrable. But see §14(f): if he knows walking spends a Sighting, his failure to say so at T9 is out of character; if he does not, nothing establishes it | **Why** the Crown wants Wren rather than the Cold (§12.32) — from everyone, including the reader | "Every one of you sees something the rest of the room cannot. His Majesty pays for that." **[PROPOSED]**, from `ch1.js:282` + `companion/ch8.js:291` | — |
| **Reader** | **[WHAT]** Own gift, and that the Hearth shows faded what the page shows clean (`lore.js:6`; `companion/ch0.js:86`) | That this is simply how the world works (**unformed**) | Believes the chalked name on the dorm door is a joke (`companion/ch0.js:99`) — a Sightings-adjacent error: only a Sighting-grade hand could write the older alphabet | Nothing yet | "I read carvings. I've always read carvings. Nobody ever said where it came from." **[PROPOSED]** | — |
| **Listener** | **[WHAT]** Own gift; that it fails on exactly one person (`lore.js:7`; `companion/ch0.js:112`) | "**The fault was mine**" (**held**, years) | That a Sighting can have a defect. It cannot: "It wasn't a fault in you. **There wasn't one to hear.**" (`companion/ch8.js:94`) | The failure itself — from **everyone**, self-protective: "you have never said it out loud to anyone" (`companion/ch0.js:112`). **A Sighting that fails once is a Sighting nobody trusts** | "I hear every heart in a room. One of them I've never heard. That'll be me." | — |
| **Seer** | **[WHAT]** Own gift (`lore.js:8`) | "A trick of the light" (**held**, months, `companion/ch0.js:124`) | The light | The shadow — from **Wren** specifically (`companion/ch8.js:112`) | "I see under things. I don't know why. Nobody does." **[PROPOSED]** | — |
| **Binder** | **[WHAT]** Own gift; **and the Book of Laws**, which contains Law 0 — "COLD is written by four hands" — **struck, dated, and visible from the Prologue onward** (`lore.js:57`; `companion/book.js:123-127`) | That the gift has a blind spot (**held**, years, `companion/ch0.js:145`) | That the gift has a blind spot. It does not (`companion/ch7.js:260`) | That the blind spot exists — from **everyone**; professional shame | "Four shapes, four Laws, four of us. I keep the Book. I don't write it." **[PROPOSED]** | — |
| **the real players** | Their own role blurb from the seat-select screen (`lore.js:5-10`) and nothing else | That the gift is a puzzle mechanic (**certain**, and correct) | Nothing — they have no beliefs about the fiction yet | — | "I picked the Binder because I like rules." | — |

### 1.1 Peripheral knowers at T0

| knower | state | cite |
|---|---|---|
| **Mere** (the sheet) | The only Founder voice on the cost, and it states the **effect** without the word: "We wrote the cold glyph with four hands, and **came up grey**." She also records that a one-walker offer was **made and refused** — the Founders considered the cheap road and rejected it | `companion/ch4.js:62` |
| **the Convocation of 212** (corporate) | Knew the price exactly — four Masters' Sight — and refused it; struck Law 0, wrote Law 6, sent one Warden down. This is the **only body in the game's history that ever priced a Sighting in public** | `companion/ch6.js:286-287`; `lore.js:57`, `:67` |
| **the nine Masters, present** | Each has a Sighting by assertion; not one of them ever perceives anything on screen | `ch0.js:242`; §14(g) |
| **Oriel** | Knows the cover-up from her own bread-knife; **no evidence she connects the paint to a price in Sight** | `ch4.js:588` (branch `ORIEL`) |
| **the Crown** | Operates a registry of Sightings and a posting system for their holders — machinery that must predate tonight | `companion/ch8.js:207-208`, `:291` |

### 1.2 Nested belief at T0

| holder | about | holds that… | depth | status |
|---|---|---|---|---|
| Wren | each of the four | knows what their own gift does and nothing about where it came from | 1 | **[PROPOSED]** — consistent with `ch0.js:146-149` |
| Wren | Marrow | knows what the night costs and will not say it | 1 | **[PROPOSED]** — required by `ch4.js:611` ("I do not get a vote on the whatever-it-costs part") |
| Marrow | the four | are four gifts she can deploy, and four children who must not be priced | 1 | **[PROPOSED]** — `ch1.js:310` + her total silence on cost |
| Marrow | the Binder | keeps a Book she has not read: "**That is not in the Book I was given.**" | 1 | `ch5.js:399` — she *knows* the Binder's Book differs from hers, and never asks what is in it |
| each of the four | the other three | have never wondered where a Sighting comes from either | 2 | **[PROPOSED]** — no character ever raises it, which is only plausible if all four assume it settled |
| Vane | the four | will act on a perception if he points at one | 1 | `ch1.js:283` |
| the 212 Convocation | the future | will read *one born of four* and never ask what four hands cost | 2 | derived — `lore.js:75` vs `glyphs.js:21`; the translation **is** the price tag, hidden |

---

## 2. T1 — ch0 cold open + the prophecy stone

**Nothing about the Sightings moves. One thing about their *price* moves, invisibly.** The Order's
translation — "one born of four shall walk into the Cold" (`lore.js:75`; caption `THE ORDER'S READING`,
`scenes-ch0.js:78`) — is not only a mistranslation of a sentence. **It is a quotation for the job.**
It prices the closing of the Cold at one walker, and one walker with no Sighting costs the school
nothing. Every character in the game has been taught that quote since they were seven
(`ch0.js:62`), and not one of them has ever asked what the other reading would cost.

| character | Knows | Believes | Wrong about | Withholding | Would say if asked | Changed |
|---|---|---|---|---|---|---|
| **Wren** | as T0, plus: the fire is flickering for the first time in fourteen years (`ch0.js:68`) | That the clock has started (**certain**) | as T0 | as T0 | "Nobody agrees what the rest of it means. Everybody agrees who it is about." (`ch0.js:63`, narration's phrasing) | The flicker starts Wren's clock; Wren's response is to assemble the exact four people whose gifts could read the stone. **Wren conscripts the bill.** |
| **Marrow** | as T0, plus the flicker (inferred; she is not in the Prologue — her state is read back from `ch1.js:309`) | That the fourteen years are over (**firm**) | as T0 | as T0 | "It has not done that in fourteen years." (`ch1.js:309`) | — |
| **the four** (all seats) | as T0 | as T0 | That the school's translation is the text | Nothing | "One born of four. Everybody knows that bit." | **Nothing.** The Prologue's stone scene hands them a sentence they have had for seven years |
| **Vane / Oriel / the nine** | as T0 | as T0 | — | as T0 | as T0 | Nothing |
| **the real players** | The stone says *one born of four*; the caption says **THE ORDER'S READING** | That Wren walks into the fire at the end (the game *wants* this live) | That the translation is the text | — | "So the kid walks in at the end." | Everything — and the frame they are handed is the frame that hides the price |

### 2.1 Nested belief at T1

| holder | about | holds that… | depth | status |
|---|---|---|---|---|
| the four | the school | has settled what a Sighting is, because nobody discusses it | 2 | **[PROPOSED]** |
| everybody | the prophecy | costs one life and no Sight | 1 | derived from `lore.js:75` — **the cover story's economic function, which no character ever notices** |

**[WITHHOLDING]** The player is given a stone that prices the night, a caption saying whose reading it
is, and no hint that a reading has a price at all. The breadcrumb that would fix it is free and is
proposed in §13(c).

---

## 3. T2 — the lamp lights the old way; the four speak

**The only definitional beat in the game.** Immediately after the four use their gifts together for
the first time, the narration says the word:

> "The school has a word for what each of you just did. **A Sighting. One way of seeing, one to a
> person, and nobody chooses which one they get.**" — `ch0.js:241`
> "Tomorrow you will stand at the back of a hall while grown-ups decide about Wren. **Every one of
> them has a Sighting of their own.**" — `ch0.js:242`

Two sentences. The second is never used again in nine chapters.

| character | Knows | Believes | Wrong about | Withholding | Would say if asked | Changed |
|---|---|---|---|---|---|---|
| **Wren** | as T1, plus: has now **publicly demonstrated** knowledge of three seats' private perceptions and been unchallenged — "Yes. All four of you. **I've known for years.**" (`ch0.js:226`) | That the four will now work as one instrument (**certain**) | as T1 | as T1, plus: **the source of Wren's cross-seat knowledge**, which nobody asks about and Wren does not volunteer (§12.21) | "I need four idiots and a lamp." (`ch0.js:145`) | Wren's cross-partition access is now on the table and **the narration does not mark it as strange** (§12.21) — the largest unearned moment in the game, and it is a Sightings fact |
| **Marrow** | as T1 (absent) | — | — | — | — | Nothing |
| **Reader** | as T0, plus: the other three see things too, and the four gifts interlock — a circle with no beginning needs an ear, a cut needs an eye, a rule needs a Binder (`companion/ch0.js:86-92`) | That the four gifts are **designed to be used together** (**suspected**, never stated) | as T0 | as T0 | "My page shows the shapes clean. I can't hear which comes first. That's not mine." | First evidence for Q2 that the four gifts are complementary rather than coincidental — offered as a puzzle rule, never as a fact about the world |
| **Listener** | as T0, plus the interlock | as Reader | as T0 | The failure on Wren, now spoken aloud **for the first time in years** (`ch0.js:217-218`) | "I hear intervals. I never hear a word's name. Every room is tuned differently." (`companion/ch0.js:109`) | The rationalisation is broken publicly. **What is not broken: the belief that the fault is theirs** — it survives to T8 (`companion/ch6.js:255`) |
| **Seer** | as T0, plus the interlock | as Reader | as T0 | as T0 (has now said the shadow aloud) | "I see the cuts. What they oblige isn't mine." | as Listener |
| **Binder** | as T0, plus the interlock; **and** that they are "the only person at this table who was ever taught this" (`companion/ch0.js:129`) | That the Laws and the gifts are one system (**held**) | as T0 | as T0 | "A sigil begins at the scratch. Four lines long. I'm the only one who was taught it." | The Binder's distinguishing fact is now that their gift is **taught**, where the other three are perceived — the only crack in Q1 the game ever opens, and it is never picked at |
| **Vane / the nine** | unchanged | — | — | — | — | Nothing |
| **the real players** | Q1's only answer, verbatim. That the nine Masters have Sightings too | That the Masters' Sightings will matter (a live and **reasonable** hypothesis) | That the Masters' Sightings will matter — **they never do** | — | "So the grown-ups can all do this too. That's going to come up." | The player is handed a Chekhov's gun at `ch0.js:242` and it is never fired (§13(a)) |

### 3.1 Nested belief at T2

| holder | about | holds that… | depth | status |
|---|---|---|---|---|
| each of the four | the other three | now know I see one thing they cannot, and that it is not a fault | 1 | `ch0.js:217-218` |
| each of the four | Wren | knew all four of our secrets before we said them | 1 | `ch0.js:226` |
| each of the four | Wren | must have been told by one of us — *no*, all four were private | 2 | **[PROPOSED]** — the inference the game invites and never has anyone complete |
| Wren | the four | still think their gift is ordinary equipment, not an inheritance | 2 | **[PROPOSED]** |
| the real players | the nine Masters | will use their Sightings in Chapter I | 1 | `ch0.js:242` — a belief the game creates and never resolves |

---

## 4. T3 — ch1: Vane's writ, the vote, the paint

The Sightings are used as instruments against a room of nine people who allegedly have Sightings of
their own, and **no Master perceives anything back, ever**.

| character | Knows | Believes | Wrong about | Withholding | Would say if asked | Changed |
|---|---|---|---|---|---|---|
| **Wren** | as T2 | as T2 | as T2 | as T2, plus: that this hall is where the bill will be argued (**[PROPOSED]**) | "I'll try not to fidget." (`ch1.js:127`) | Nothing about Sightings |
| **Marrow** | as T2. **[COST]** unchanged and unspoken | That a vote is the school's instrument and a writ is not (**certain**, `ch1.js:146`) | as T2 | as T2 | "Nine seats. Five keeps." (`ch1.js:146`) | She sends the four down **tonight**, having changed her mind mid-sentence (`ch1.js:310`) — the first deployment of four Sightings as a tool, and she never says what she is deploying them at |
| **Vane** | as T2, plus: that these four specifically are worth four masterships to the Crown (`ch1.js:282`) | That a Sighting plus a rank is a purchase (**firm**) | **[PROPOSED]** That offering a mastership to someone who already has a Sighting is offering something. If `ch0.js:242` is true — every Master has one — then **Vane is offering rank only**, and the game never notices the difference | Why the Crown wants Wren (§12.32) | "He lives. I promise you that. **And the Crown makes the four of you Masters.**" (`ch1.js:282`) | He names a gift by its function in public — the first outside confirmation that Sightings are legible to outsiders |
| **Reader** | The filed roll: seats 9 and 3 have filed in writing (`companion/ch1.js:91`, `:94-95`) | as T2 | as T2 | as T2 | "Two Houses filed. Nine and three." | Gift used as intelligence |
| **Listener** | Sorrel wants to be asked to her face; Hallan has shut his ears **by choice**; Vane's is the only fast heart in the Hall; **Marrow's skipped twice while she looked at Wren, not the fire** (`companion/ch1.js:108`, `:113`, `:116-117`, `:118`) | as T2 | as T2 | Marrow's skipped heartbeat — from **everyone**; no prompt to report it exists | "Seat four has shut his ears. He means it." | The Listener acquires the first evidence that **Marrow is afraid**, and has nowhere to put it |
| **Seer** | Crown coin under seat 5's cushion and in seat 8's sleeve (`companion/ch1.js:125-126`) | as T2 | as T2 | as T2 | "There's a coin under the fifth cushion. New." | Gift used as counter-corruption. **Nine Masters with Sightings sit in this room and not one of them reports the coins** (§14(g)) |
| **Binder** | Quill sworn to Sorrel; Hallan sworn to Orrin, cousins; **Law 0 in the Book, struck, dated 212** (`companion/ch1.js:141-142`; `companion/book.js:123-127`) | That the struck Law is history (**held**) | That a struck Law is dead. Law 3 makes it the opposite (`lore.js:60`) | as T2 | "Two threads in this room, and both of them are oaths." | **The Binder has carried "COLD is written by four hands" since the Prologue and has no reason yet to price it** |
| **the real players** | Four gifts are a toolkit; the vote is winnable with two asks | That Sightings are the game's mechanic, full stop | That the Masters' Sightings will matter | — | "Use the Seer on the cushions." | — |

### 4.1 Peripheral knowers at T3

| knower | state | cite |
|---|---|---|
| **Sorrel** | Names the Convocation as the body that should receive what is found below — "it comes to **the nine of us**. Not to her." She is the one Master who thinks institutionally about what is under the school, and she never thinks about what it costs | `ch1.js:255` |
| **Oriel** | Buys, as her price, everything found below, "**even the parts you don't like**" — the only Master who purchases *information about the cost* without knowing there is one | `ch1.js:256`, `:266` |
| **the nine** | Nine Sightings in one room, zero perceptions on screen | `ch0.js:242` vs the whole of ch1 |

### 4.2 Nested belief at T3

| holder | about | holds that… | depth | status |
|---|---|---|---|---|
| Vane | the Seer | can confirm the paint, and will | 1 | `ch1.js:283` |
| Vane | the four | will value a mastership above a child | 1 | `ch1.js:282`, priced again at `:289` |
| Marrow | the four | can be sent under the school on an errand without being told what it is for | 1 | `ch1.js:186`, `:310` |
| Marrow | the four | do not know there is a wound down there | 2 | **[PROPOSED]** — true until T7 (`ch5.js:249`) |
| the Binder | the Book | is a historical record, not an instruction | 1 | **[PROPOSED]** — falsified at T8 (`companion/book.js:127`) |
| the real players | the nine | are obstacles, not perceivers | 1 | correct, and it contradicts `ch0.js:242` |

---

## 5. T4 — ch2: the Founders' Door, the Vault, the Cold Ember, 212

The chapter is a **four-hundred-year-old machine that only opens for four Sightings**, and nobody in
the room says so.

| character | Knows | Believes | Wrong about | Withholding | Would say if asked | Changed |
|---|---|---|---|---|---|---|
| **Wren** | as T3 | as T3 | as T3 | as T3 | "You *left* without me. Also you dropped this." (`ch2.js:360`) | Nothing about Sightings; Wren takes an arm for the box |
| **Marrow** | as T3, plus (already held): that the vault "was rebuilt once, and **the rebuilding was not honest**" (`ch2.js:189`) | That the Ember is the school's insurance (**firm**, her word only, `ch2.js:188`) | — | That she knows the rebuild was 212's, and why — from **the four** | "If the Hearth goes out, the Ember lights it again." (`ch2.js:188`) | She sends four gifts at a Founders' lock and says nothing about who built it for four |
| **Reader** | **[WHY FOUR]** The Door takes one word per dial, in the order the line climbs — a lock that cannot be opened without a Reader, a Listener, a Seer and a Binder (`ch2.js:119`; `lore.js:59`). Optional (`CH2_STRIP='right'`): Mere's strip says "**four, as one, went through. Not one.**" (`ch2.js:319`). Optional (`LETTER`): carries a grey smear off Mere's sheet, **unreadable** (`ch2.js:324`) | That the Founders built for four (**suspected** → **firm** if the strip was read) | as T3 | If the strip was read: nothing — the Hearth prints it. If only the rubbing was taken: nothing knowable is being withheld, because **nothing is legible yet** | "This door wants four words and four people. It was built that way." **[PROPOSED]** | The first physical argument for Q2, and it is architecture, not testimony |
| **Listener** | The Cold Ember has **no heartbeat** — the same absence as Wren (`companion/ch2.js:134-135`) | That the fault-in-me theory is under strain (**held**, weakening) | as T3 | as T3 | "That stone has no heart in it. Neither does Wren. I've stopped saying that's me." **[PROPOSED]** | Their gift now reports the same absence twice, from two objects |
| **Seer** | Four plinths, **not one standing in its own hole** (`companion/ch2.js:141-142`, `:157`); the Ember casts no shadow it should (`:150`); Wren's shadow leans toward it | That the floor was rebuilt to hide something (**firm**) | The light (still, nominally) | as T3 | "Four holes, four statues, and none of them is in its own." | The 212 rebuild is now legible **only to the Seer** |
| **Binder** | The Ember has **no thread** — "a stone, and stones are not bound" (`companion/ch2.js:165-166`); Law 3, "the older binds" (`lore.js:60`, taught this chapter); Law 13 vs Law 9 — an Order Law losing to a Founders' Law | **That a struck Law can still bind**, because Law 3 says so (**firm**, new) | as T3 | as T3 | "Law nine is the Order's and law thirteen is the Founders'. The older binds. So thirteen." | **The Binder learns the legal machinery that will make Law 0 live again**, four chapters before learning what Law 0 costs |
| **Vane** | unchanged | — | — | — | — | Absent |
| **the real players** | The Founders built four-gift locks. 212 rebuilt the room and bricked a road | That the four are being tested against Founders' work (**correct**) | — | — | "This door was made for exactly us." | The strongest Q2 breadcrumb in the first half, delivered as level design |

### 5.1 Peripheral knowers at T4

| knower | state | cite |
|---|---|---|
| **the 212 Convocation** (through its work) | Everything it did in this room is consistent with a body that knew exactly what four Sightings were worth and would not spend them: it turned the statues off their own holes, effaced the names, bricked the road, stamped the year in plain sight | `ch2.js:209`, `:301`, `:346`; `scenes-ch2.js:100` |
| **Mere** (the strip, optional) | States the Founders' count in three glyphs, from the mark: KNOT CROWN THORN — "four, as one, went through. **Not one.**" | `ch2.js:315`, `:319` |
| **Sorrel** (branch `SORREL`) | Her guards take the Ember at the top of the stair — an institutional claim on Founders' property, made by a body that once refused to spend its own Sight | `ch2.js:383`, `:387-388` |

### 5.2 Nested belief at T4

| holder | about | holds that… | depth | status |
|---|---|---|---|---|
| the Seer | the school | does not know its own floor was rebuilt | 1 | **[PROPOSED]** — false; Marrow says so at `ch2.js:189`, on the same errand |
| the Seer | Marrow | does not know about the derangement | 2 | **[PROPOSED]** and **wrong** — a free, missing reaction beat |
| the four | the Founders | built this for four people like us | 1 | **[PROPOSED]** — the inference the architecture forces and nobody states |
| the Binder | Law 0 | is a curiosity | 1 | **[PROPOSED]** — falsified at T8 |

---

## 6. T5 — ch3: the corridors, the laundry, the four whispered questions

Four gifts used as an infiltration kit; four private questions, **each one addressed to exactly one
gift**. Nothing about origin or price moves. One thing about *trust in the gift* moves, in the wrong
direction, on one phone.

| character | Knows | Believes | Wrong about | Withholding | Would say if asked | Changed |
|---|---|---|---|---|---|---|
| **Wren** | as T4, plus: **which of the four lied to Wren's face**, immediately (`lore.js:44`; `ch3.js:530`) | That the four's gifts are sound and their nerve is the variable (**firm**) | as T4 | as T4, plus: that Wren already knows all four answers — Wren asks anyway (`ch6.js:688`) | "Thank you. All of you. **Even the ones who lied.**" (`ch3.js:530`) | Wren's four questions are a **gift-by-gift audit**: name (Reader), heartbeat (Listener), shadow (Seer), thread (Binder). Wren is checking whether the instruments still report honestly |
| **Marrow** | as T4 | as T4 | — | as T4 | "Hands on your keys." | Doses the lamps and rings the bells herself (`ch3.js:445`) — she spends her own labour freely and her own Sighting never once |
| **Vane / captain** | The captain knows the offer word for word and cannot know how it was answered (`ch3.js:393`, `:399`) | — | — | — | "I am not a cruel man. I am a punctual one." (`ch3.js:544`) | — |
| **Reader** | The four oldest Gallery plaques are cut in **the letters from the dormitory door** (`companion/ch3.js:181-183`) | Still "somebody was being funny" (**held**, straining) | That a prankster can write a 400-year-old alphabet | Has still never asked who chalked it | "Those plaques use the letters from our door. I don't have a theory." | The Reader's own gift is now producing evidence against the Reader's own rationalisation |
| **Listener** | The portraits mutter "***four went down***" when the school is afraid (`ch3.js:440`; `companion/ch3.js:228`) | as T4 | as T4 | **The muttering's referent** — the Listener cannot tell whether it means the Founders or tonight, and the game never resolves it (§12.56) | "The paintings are saying *four went down*. I don't know about what." | The clearest Q2 breadcrumb available to an ear, and it is deliberately ambiguous |
| **Seer** | Painted Masters cast no shadow "because paint has none"; **"You have run out of lamps to blame."** (`companion/ch3.js:229`) | The trick-of-the-light theory is dead (**certain**) | Nothing, now | The shadow — still, from Wren, unless the whisper is answered TELL | "There is no lamp here and the shadow still goes the wrong way." | The Seer's rationalisation dies **five chapters before** the Listener's and the Binder's |
| **Binder** | Bess is sworn to Marrow, thirty years; the porter is bought with Crown gold; **on `VANE_ACCEPT`, "So, since the Hall, are you."** (`companion/ch3.js:236`, `:238-239`); "There is one you have never let yourself follow: the one from the Provost to Wren." (`:275`) | as T4 | as T4 | **That the gift has a blind spot** — still, from everyone | "Three people are awake between the Gallery and the Tower. Two of them are paid." | The Binder has now declined, deliberately, to look at the one thread that would tell them what Marrow is | 
| **the real players** | The gifts are a heist kit | That the four gifts are the whole of the mechanic | — | — | "Send the Seer; the Seer sees the hidden door." | — |

### 6.1 Nested belief at T5

| holder | about | holds that… | depth | status |
|---|---|---|---|---|
| Wren | the Reader | still thinks the chalk is a joke and will be given an out | 2 | `companion/ch3.js:284-285` — the whisper offers "a small brave bird" as a bluff |
| Wren | the Listener | still blames the silence on themselves | 2 | `companion/ch8.js:94` requires it |
| the Binder | Marrow | has a thread to Wren whose colour the Binder has chosen not to read | 1 | `companion/ch3.js:276` — "**decided long ago not to look**" |
| the Binder | Marrow | does not know the Binder can see it | 2 | **[PROPOSED]** — and false: Marrow's Epilogue letter to the Binder proves she knows exactly what the Binder can see (`companion/ch8.js:198`) |
| the Seer | the other three | have not noticed the shadow | 1 | **[PROPOSED]** — false since T2 |

---

## 7. T6 — ch4: the study's four secrets, the oath

**The study is built as a four-Sighting room and the game says so twice, in the narration, in the
plainest language it ever uses about Q2:**

> "Ten minutes, less now. **Four Sightings, four corners of one room, and nobody can find another's.**"
> — `ch4.js:430`
> "Four corners, four Sightings. Words at the desk. A voice at the bell. Old paint on the tapestry.
> A thread on the chair." — `ch4.js:435`

And one gift **grows**: the Reader acquires the older alphabet from Marrow's own primer, left open on
her desk (`ch4.js:51`; `companion/ch4.js:64-69`). It is the only time in the game a Sighting's reach
changes, and no character remarks on it.

| character | Knows | Believes | Wrong about | Withholding | Would say if asked | Changed |
|---|---|---|---|---|---|---|
| **Wren** | as T5, plus: that the four have sworn (or not) to see Wren into the Cold | **That there is a cost, that it is not Wren's to price, and that Wren is not permitted to argue it**: "For the record, **I do not get a vote on the whatever-it-costs part**." (`ch4.js:611`) | as T5 | **[PROPOSED]** The strongest withholding in this mystery: Wren holds the four-walker reading (`ch7.js:404`) and therefore knows that "whatever it costs" has a second, cheaper-for-Wren answer — and will not name it. Protecting **the four** | "For the record, I do not get a vote on the whatever-it-costs part." (`ch4.js:611`) | Wren says the word **cost** out loud for the first time, and refuses the topic in the same sentence |
| **Marrow** | as T5. She asks four children to swear to an operation whose price she can price, and **prices nothing** | That the oath is what lets her stop carrying it alone: "Bound. Good. **Then I need not carry it alone.**" (`ch4.js:747`) | as T5 | **The price** — from **the four**, at the exact moment consent is being taken. Protecting them, and protecting the plan | "The scroll, then. Read it, all four of you. Then swear, or do not." (`ch4.js:608`) | She takes an informed-consent ritual and runs it without the material fact. §14(b) |
| **Vane** (absent, via the memory-bell) | "**The Crown will have the Cold open, one way or another.**" (`companion/ch4.js:213`) | — | — | The referent of Marrow's "And through it" (§12.45) | — | The Listener recovers Vane's aim — the Crown wants the Cold **open**, which is the only position in the game that never requires anyone to spend a Sighting |
| **Reader** | **[COST, half]** The Vigil roll spells the name **WRENN** in the older alphabet (`companion/ch4.js:202-204`). **On `LETTER_READ`**: the grey smear comes clear and is **promised to the Book "from here on"** (`ch4.js:498`) — a promise the phone does not keep until T7 (§13.18) | That the name is a coincidence of spelling (**held**, collapsing) | That it is a coincidence | The name — from the table; it is on a WREN page, not a SIGHT page | "The roll spells it in the old letters. It means the hollow of a bell." | The Reader's gift **expands**, and the expansion is what makes Mere's sheet readable two chapters later. **Nobody says a Sighting can grow** |
| **Listener** | The memory-bell keeps every voice in the room **but one** (`companion/ch4.js:227`) | as T5 | as T5 | as T5 | "It keeps every voice in this room except Wren's." | A **third** instrument now fails on Wren. The Listener's fault-theory is now three counter-examples deep and still held |
| **Seer** | On `TAPESTRY`: four figures walking in, the fourth carrying COLD, four shadows, **no child** (`ch4.js:536-537`; `scenes-ch4.js:47-62`) | That the school's picture is a forgery (**certain**) | — | Nothing — the Hearth prints it | "Under the paint there are four of them, and none of them is a child." | **The tapestry is the picture of the bill**: four people, four shadows, one cold glyph. It shows the number and not the price |
| **Binder** | The Provost's thread to Wren is **grey** and hers to the four is **red and not tied yet** (`companion/ch4.js:264`, `:271`); "A thread reaches Wren from the woman who named her. **Nothing comes back.**" | as T5 | That the gift has a blind spot | as T5, plus: the grey thread's meaning — from **Marrow**, from **Wren**, from the table | "Grey is grief. Hers to Wren has been grey a long time." | The Binder chooses the oath's lock (`ch4.js:735`) — **the only time in the game a Sighting is asked to make a moral decision for the whole table** |
| **the real players** | The room is a four-gift room, stated | That the partition is the game's spine (**correct**) | — | — | "Four corners, one each. Obviously." | Q2's clearest statement arrives as a puzzle instruction |

### 7.1 Peripheral knowers at T6

| knower | state | cite |
|---|---|---|
| **Oriel** (branch `ORIEL`) | Her note: "I scraped that paint myself, as a girl, with a bread-knife. **They painted it back inside the week.**" She knows the number is four and has never priced it | `ch4.js:588` |
| **Marrow's unsent letter** (branch `!ORIEL && !SORREL && !VANE_ACCEPT`) | "the thing I have never named to you" — proof she has kept the whole matter, cost included, off the Convocation's record | `ch4.js:592` |

### 7.2 Nested belief at T6

| holder | about | holds that… | depth | status |
|---|---|---|---|---|
| Marrow | the four | are swearing to *escort*, not to *pay* | 1 | `ch4.js:748` — "When the bells ring tonight, hold them. I will do the rest." |
| Marrow | the four | believe the price is Wren's and will not ask further | 2 | **[PROPOSED]** — and correct, on every branch |
| Wren | Marrow | has priced the night and will not say the number | 1 | `ch4.js:611` |
| Wren | the four | would pay if asked, which is exactly why they must not be asked | 2 | **[PROPOSED]** — required by E0's "I had a *speech*" (`ch7.js:759`) |
| the Binder | Marrow | cannot tell which lock was chosen, because Law 4 says so | 1 | `lore.js:64` — **false**; she names it at `ch7.js:387` (§13.14) |

---

## 8. T7 — ch5: Mere's gates, the Founders' Count, the Under-Marches, the hold

**The richest chapter in the game for this mystery, and the one that never says the word.** Three
separate things happen to Sightings here and none of them is connected to any other on screen.

1. **Mere built wards addressed to exactly these four gifts, four hundred years ago.** "Her gates do
   not lie. They do not play fair. **Read them together.**" (`ch5.js:266`); "**Eight questions, four
   eyes, one answer. That was Mere.**" (`ch5.js:480`).
2. **Wren claims partial access to a four-gift ward**: "I would have got two of them. **I do not have
   a phone.**" (`ch5.js:479`) — a joke that is also a claim about what Wren can perceive (§12.21).
3. **A Sighting is spent for the first time in the game — temporarily.** "A held thread needs a
   living anchor. One of you stays. **That Sight is spent until the Provost ties it off.**"
   (`ch5.js:551-552`; the choice is priced at `ch5.js:516`, "their Sight pays for it").

And the Reader's Book quietly opens Mere's sheet: "**came up grey**" (`companion/ch4.js:62`, gated
`:71`).

| character | Knows | Believes | Wrong about | Withholding | Would say if asked | Changed |
|---|---|---|---|---|---|---|
| **Wren** | as T6, plus: everyone is now below, and the Cold is in sight | as T6 | as T6 | as T6 | "Four thrones. Four Founders. It is a *theme*." (`ch5.js:349`) — **the only line in the game that gestures at Q2 and it is played for a laugh** | Wren names the four-count as a pattern and immediately declines to mean it |
| **Marrow** | **[COST]** She now demonstrably knows the **mechanics of spending and restoring Sight**: she offers the hold, states the price, and states the remedy — "I will tie it off down in the bell-chamber" (`ch5.js:582`) | That a temporary spend is an acceptable cost and that she can reverse it (**certain**) | — | **That the night's actual plan is priced in the same currency, permanently.** From **the four**, at the exact moment she is teaching them the currency exists. This is §14(a), and it is the sharpest inconsistency in the mystery | "One of you stays, and their Sight pays for it." (`ch5.js:516`) | **Marrow prices a Sighting out loud for the first time in the game — and prices only the small one** |
| **Vane / soldiers** | Nothing new | — | — | — | — | Off-page |
| **Reader** | **[COST, effect half]** Mere's sheet, translated, in the Book: "We were four. I offered to go alone and was refused. One was never asked. We wrote the cold glyph with four hands, and **came up grey**." (`companion/ch4.js:62`) — **branch `LETTER`** | That "came up grey" is a description of exhaustion or age (**held**) — **[PROPOSED]**; the game gives the Reader no gloss | **That "grey" is a colour word.** It is a state word, and the Reader will not learn so until `ch8.js:287` | The sheet is in the **Book**, not on a SPEAK page: **the game never once cues the Reader to read it aloud.** Withholding by interface | "Mere's sheet says they came up grey. I don't know what that means." **[PROPOSED]** | The Reader acquires half the price of the Finale and is given no reason to mention it |
| **Listener** | "beside you, where Wren is standing, **the thing you have called a fault in your gift for four years: nothing. Not quiet. *Nothing.***" (`companion/ch5.js:309`) | Fault-theory: **held**, four years old, now explicitly dated | as T6 | as T6 | "Four years I've called it a fault." | The game dates the Listener's error for the first time |
| **Seer** | The gates' marks and cuts; the Under-Marches' geometry | — | — | — | "This chip is the mark. The notch is somebody's signature." | — |
| **Binder** | **[WHY FOUR, legal half]** On `LAW0` (set by `LETTER_READ` **or** `TAPESTRY` **or** the ch1 `ORIEL` promise — §13.17): the struck Law is back in the Book and **COLD becomes writable at the Silent Gate** (`ch5.js:244`; `companion/ch5.js:333`) | That a four-hundred-year-old Law outranks the Order's (**certain**, Law 3) | as T6 | as T6 | "COLD is written by four hands. It's older than Law six. The older binds." | **The Binder can now lawfully write the cold word — and still has no idea what four hands cost** |
| **the volunteer** (branch `STAIR='HOLD'`, one named seat) | **[COST, experiential]** What a spent Sighting is like, from the inside, for a whole chapter. Their page says so: "**your Sight is spent**, and this is your page" (`companion/ch5.js:257`) | That it will come back because Marrow said so (**firm**) | — | The experience — from the other three; **the game gives them no line, no prompt and no page to report it on** | "Mine's gone. She says she'll tie it off." **[PROPOSED]** — no such line exists | **The only character in the game who has felt the Finale's price** acquires that knowledge here, and the game never uses it |
| **the real players** | That a Sighting can be spent and returned; that Mere built for four | That "spent" is reversible (**firm, and about to be catastrophically wrong**) | **That "spent" is reversible.** `ch5.js:552` and `companion/ch8.js:148` use the same word for two different mechanics (§13(d)) | — | "It's fine, she gives it back." | The game teaches the reversible version of its own central price four scenes before the irreversible one |

### 8.1 Peripheral knowers at T7

| knower | state | cite |
|---|---|---|
| **Mere** (the wards) | Built a stair whose three gates require, in order: two readings at once, five bells nobody upstairs can hear, and **eight questions answered two-per-seat by four different kinds of perception**. She is the only person in the game's history who **designed for four Sightings as a unit** — and the only Founder who left a door "for people who were not asked" | `ch5.js:266`, `:412`, `:480`; `ch5.js:287` |
| **Marrow ↔ Mere** | Marrow breaks two of Mere's gates in one night and apologises by name. She models herself on Mere **including the refusal to choose** — "I will not choose. **Mere would not have either.**" (`ch5.js:553`) — which is precisely the reason the hold is offered to four people instead of assigned to one | `ch5.js:395`, `:553` |

### 8.2 Nested belief at T7

| holder | about | holds that… | depth | status |
|---|---|---|---|---|
| Marrow | the volunteer | will accept a temporary loss on her word | 1 | `ch5.js:582` |
| Marrow | the four | will not ask what a permanent loss would look like | 2 | **[PROPOSED]** — and correct; nobody asks, on any branch |
| the volunteer | the other three | know what this feels like | 2 | **[PROPOSED]** — and **false**; they do not, and there is no channel to tell them |
| the Reader | the table | already knows what "came up grey" means | 1 | **[PROPOSED]** — assumed-already-known, the classic reason a clue dies in a Book |
| the four | Mere | built these gates for four people like us | 1 | **[PROPOSED]** — the strongest Q2 inference available, and the game never has anyone say it |
| Wren | the four | do not know that the Founders came up grey | 2 | **[PROPOSED]** — Wren does not know which branch the table took |

---

## 9. T8 — ch6: the bells, the tie-off, the Second Asking, the stone read from its foot

The chapter that answers Q2 and Q3 — **in two different places, to two different people, in two
different registers, and never in the same room.**

- **The tie-off returns the held Sight**: "*[seat]*, **your Sight comes back like blood into a numb
  hand.**" (`ch6.js:591`). The reversible lesson is completed.
- **The Second Asking** is Wren auditing the four gifts one at a time, by name, and confirming each
  answer (`ch6.js:638-678`) — including "**Reader. You read the old tongue *now*.**" (`ch6.js:663`),
  Wren tracking the expansion of a Sighting across the night.
- **The stone, read by four Sightings at once**, opens the Fourfold Walk (`ch6.js:814`) — and the
  announcement prices nothing: "THE FOURFOLD WALK IS OPEN. / The road four people walk together, not
  one." (`ch6.js:851-852`).
- **The Binder's Book turns a page**, opt-in, cued by the Hearth (`ch6.js:853`): "**Four Masters, four
  Sightings. The Convocation would not pay it. They struck the Law and called it grammar.**" /
  "Four hands meant four Masters **giving up their Sight**." (`companion/ch6.js:286-287`).

| character | Knows | Believes | Wrong about | Withholding | Would say if asked | Changed |
|---|---|---|---|---|---|---|
| **Wren** | as T7, plus: all four gifts still report true (four answers, `ch6.js:688`); that Marrow has confessed with Wren's leave | That the Walk is now open **and will not be taken** (**firm**) — Wren's "The *deal* was that I go in" at T9 (`ch7.js:423`) requires it | **[PROPOSED]** That the four will not pay. On E0 they do, and Wren's reaction is astonishment, not gratitude: "You *idiots*. **I had a *speech*.**" (`ch7.js:759`) | **[PROPOSED]** Still the same thing: that the Walk has always been available and costs four Sightings. Wren has now *helped the four unlock it* and still has not said what it costs. Protecting them, and — this is the uncomfortable reading the game supports — **preserving Wren's own plan** | "Then ask me a third time. In there." (`ch6.js:863`) | Wren steers the table to the reading that prices them, without pricing them |
| **Marrow** | as T7, plus: everything the stone says, publicly, at last (`ch6.js:824-828`); **and she gives the answer to why the fire dies**: "Four people's worth of fire, and four hundred years to spend it in… **It was only ever four people.**" (`ch6.js:848`) | That the Walk is a reading, not a plan (**held**) — she announces it and does not offer it | **That she has time to keep not-offering it.** She is overruled inside one chapter | **The price**, still, and now inexcusably: she opens a road whose toll she can quote (`ch7.js:396`) and quotes nothing. From **the four**. Reason: naming the price *is* making the offer, and she has spent fourteen years not making it | "It is held. Not closed — **held. The last of it is not mine to do.**" (`ch6.js:629`) | The Walk becomes real and remains unpriced by the only adult in the room who can price it |
| **Reader** | as T7. If `LETTER`: holds "came up grey" and has just watched the stone say **four, as one** | That the two go together (**suspected**) — **[PROPOSED]**; nothing prompts the connection | as T7 | as T7 | "Mere's sheet says four hands and grey. The stone says four, as one. That's the same sentence twice." **[PROPOSED]** — **this line does not exist and should** | — |
| **Listener** | "Six chapters, every room, and **never once anything to catch**." (`companion/ch6.js:255`); Marrow's heartbeat drawn **fast** (`companion/ch6.js:251`) | Fault-theory: **held**, and now visibly absurd | as T7 | as T7 | "The Provost's heart is running. Wren's isn't there at all." | The Listener holds the single best evidence that the adult in charge is frightened, on the night the price is about to be set |
| **Seer** | "The fire is straight overhead tonight. Every shadow in the room runs away from it. **One walks in.**" (`companion/ch6.js:263`) | — | Nothing | as T7 | "One shadow in this room walks into the fire." | — |
| **Binder** | **[COST — the whole of it, in one card]** 212's bill, in the Order's own accounting: four Masters, four Sightings, refused. **And** that Law 0 is back in the Book and "**Older than Law 6. The older binds.**" (`companion/book.js:127`) | That the four hands the Law demands are **theirs, tonight** (**firm** — the Finale is one scene away) | **[PROPOSED]** That somebody else in the room already knows this. Nobody does | **The card itself.** From **the whole table**. Reason: *assuming it is already known* — the Hearth has just said the Law is back, so the Binder has no reason to think the rest is private. **Nothing in the game asks the Binder to read it out** | "Two hundred and twelve years ago they worked out what four hands cost, and they wouldn't pay it." | **The decisive knowledge state of the entire mystery is created here, in one seat, behind a `reveal` toggle** |
| **Vane** | Arriving; unchanged | — | — | — | — | — |
| **the real players** | That the fire is four people; that the Walk is open; that 212 refused a four-Sighting bill (Binder only) | That the Walk is the good ending (**correct**) and that it is free (**wrong, and the game has not corrected them**) | The cost | — | "Obviously we all walk." | The player is invited to choose the Fourfold Walk before being told it blinds them |

### 9.1 Peripheral knowers at T8

| knower | state | cite |
|---|---|---|
| **the Convocation of 212** (through the Book) | Its accounting survives, verbatim, in the custody of a fourteen-year-old. The body that refused the bill is the reason the bill is legible at all | `companion/ch6.js:286-287` |
| **the nine, present** | Not present. **Nobody tells them the Walk exists**, and Marrow has "never named the thing below" to them (`ch4.js:592`) | §14(g) |

### 9.2 Nested belief at T8 — the two-deep cells the author asked for

| holder | about | holds that… | depth | status |
|---|---|---|---|---|
| **the Binder** | **Marrow** | knows what 212 cost, because she is the Chair of the body that decided it | 1 | **[PROPOSED]** — and **true** (`ch7.js:396`), but the Binder has no evidence for it at T8 |
| **the Binder** | **Marrow** | is uncertain whether the Binder's Book contains the struck Law — she said so herself: "**That is not in the Book I was given.**" | 2 | `ch5.js:399` — the Binder has heard Marrow admit her Book is shorter |
| **the Binder** | **Marrow** | is withholding the price **because she intends Wren to pay it** | 2 | **[PROPOSED]** — the inference the Binder is one sentence from making, all through ch6 and ch7, and the game never gives them the sentence |
| **Marrow** | **the Binder** | keeps a Book that contains things hers does not | 1 | `ch5.js:399` |
| **Marrow** | **the Binder** | has not read the 212 entry, or would have said so | 2 | **[PROPOSED]** — she never asks, on any branch; §14(b) |
| **Wren** | **the four** | have just read the stone and therefore know the count, but not the invoice | 2 | **[PROPOSED]** |
| **Wren** | **Marrow** | will not offer the Walk, and will not have to | 2 | **[PROPOSED]** — falsified within one chapter |
| the Reader | the Binder | already has whatever the Book says about four hands | 1 | **[PROPOSED]** — assumed-already-known, and in this one case **true** |

---

## 10. T9 — ch7: the Finale — the Decision, the sealed word, COLD written by four hands

**The order of events is the finding.** The group decides, *then* each player is privately priced,
*then* each seals, *then* the Hearth announces the price aloud for the first time.

| # | beat | cite | who knows the cost at this instant |
|---|---|---|---|
| 1 | `ch7_attune` — "Read your page. **Say nothing.**" | `ch7.js:357` | Reader (half, if `LETTER`); Binder (whole, if the reveal was opened) |
| 2 | `ch7_decision` — "The ring has been ready for fourteen years. **Decide.**" / "No clock on this. **Talk.**" | `ch7.js:364-380` | **unchanged — the table chooses the Fourfold Walk here** |
| 3 | `ch7_argue1` (branch `OATH_KNOT`) — Marrow bars the Walk | `ch7.js:383-399` | + Marrow, who names 212's price **only on the `letter` option** |
| 4 | `ch7_tokens_intro` — "Every phone, now. Open SPEAK." + **two-minute clock** | `ch7.js:440-451` | **all four, per seat, privately, for the first time** (`companion/ch7.js:185-188`) |
| 5 | `ch7_tokens` — the sealed word | `ch7.js:462` | as 4 |
| 6 | `ch7_wren_code` — "**Your Sighting is spent. Look up.**" | `ch7.js:713` | **everybody, publicly, after it is irreversible** |

| character | Knows | Believes | Wrong about | Withholding | Would say if asked | Changed |
|---|---|---|---|---|---|---|
| **Wren** | as T8, plus: that the socket is Wren's and says so — "It's cold in here. Obviously. **It's me.**" (`ch7.js:697`) | That the four will not pay (**firm**, until the sealed words are read: "Four sealed words said WALK. **Nothing here looks surprised.**" `ch7.js:698`) | That they would not pay | Still: that Wren wanted to be saved. Admitted only when it is too late to act on — E2 "I knew. **I wanted to hear what you would say.**" (`ch7.js:768`); E0 "I had a *speech*." | "Four idiots and a hollow." (`ch7.js:423`) | Wren's central error about the four is falsified by four sealed words |
| **Marrow** | as T8. **On `OATH_KNOT` + the `letter` argument only**, she states the 212 price aloud: "**They could not afford four Masters, so they made it grammar.**" (`ch7.js:396`) | That the oath binds them to escort, not to walk (**firm**) — the argument she actually makes (`ch7.js:387`) | **That contract law is the strongest objection she has.** It is not; the price is. §14(b) | **The price, to the end.** She yields to four arguments and never makes the one true one. From **the four**, because making it would be conceding that the Walk is a real option | "You swore under KNOT, and it cannot be unbound. You swore to see Wren into the Cold." (`ch7.js:387`) | On every branch except one she leaves the Finale never having priced a Sighting out loud |
| **Vane** | as T3, plus the wall, on `VANE_ALLY` | That the child is the asset (**firm**) | — | **[PROPOSED]** If he knows walking spends a Sighting, his silence is mercy or oversight; §14(f) | "One child, and a fire that will be out within the hour." (`ch7.js:315`) | He never once mentions the four's Sightings in the Finale — while **registering all four of them is exactly what his ending does** (`companion/ch8.js:291`) |
| **Reader** | **[COST, own seat]** "If you walk, **you will not read tomorrow. Not the door, not the lexicon, not whatever Wren leaves you.**" (`companion/ch7.js:185`). And: the word in the socket is Wren's name, in letters older than ours, and "**You have never misread anything in your life.**" (`companion/ch7.js:241`) | That the letter Wren will leave is unreadable after (**certain**) | Nothing, now | The cost line is on **SPEAK**, under the house rule "Never show your phone" (`lore.js:74`). Whether it is said aloud is a **table decision the game never prompts** | "If I walk I don't read any more. Not even whatever Wren leaves me." | The most cruel and most specific of the four price tags, and it is the one that pays off in the Epilogue's last image (`ch8.js:308`) |
| **Listener** | "If you walk, **the house goes quiet. You have never heard a quiet house.**" (`companion/ch7.js:186`); "Nine people in this chamber, and **eight hearts**." (`:246`); "You decided years ago that your gift had a blind spot. **It does not.**" (`:260` — Binder's, mirrored per seat) | as above | Nothing, now | as Reader | "If I walk, the house goes quiet. I've never heard a quiet house." | — |
| **Seer** | "If you walk, every shadow will fall the ordinary way, and **only you will remember that once they did not**." (`companion/ch7.js:187`) | as above | Nothing | as Reader | "I'll lose the only proof I ever had that I was right." | — |
| **Binder** | "If you walk, **you will never see another thread. You will have to ask people what they feel.**" (`companion/ch7.js:188`). Plus, since T8, that this is exactly the bill 212 refused | **That the table is about to do the thing nine grown Masters would not** (**certain**, if the reveal was opened) | Nothing | **The 212 card, still.** The Binder is the Voice at `ch7_attune` (`ch7.js:359`) and the Warden for the last ritual (`ch7.js:715`) and is never asked to read it | "Two hundred and twelve years ago four Masters were asked for this and said no." | §12: this is the line the whole mystery is waiting for and **no scene exists to hold it** |
| **the real players** | The price, per seat, privately, sixty seconds before sealing | That the Fourfold Walk is the true ending (**correct**) and that they have just been asked to buy it (**correct, and new**) | — | Whether to say the cost aloud at the table — **the single best unprompted table moment in the game** | "…it says I won't be able to read after." | The design's best beat and its riskiest omission live in the same forty seconds |

### 10.1 Peripheral knowers at T9

| knower | state | cite |
|---|---|---|
| **Oriel** | "came down behind you and **says nothing, loudly**" — present at the paying of the bill she once took a bread-knife to, with no line | `ch7.js:60`; §12.41 |
| **two unnamed Masters** (branch `!SORREL && !VOTE_LOST`) | "Two Masters whose price you would not pay watch from the edge." Two Sightings, watching four Sightings be spent, silent | `ch7.js:62` |
| **the Crown** | Will register four spent-or-kept Sightings by dawn on E4 | `companion/ch8.js:207-208`, `:291` |

### 10.2 Nested belief at T9 — the decisive cells

| holder | about | holds that… | depth | status |
|---|---|---|---|---|
| **each of the four** | **the other three** | have also just been told what it costs them personally | 1 | **[PROPOSED]** — true, and **never confirmed out loud**; the phones are private and the house rule forbids showing them |
| **each of the four** | **the other three** | are deciding on the same information | 2 | **[PROPOSED]** — **false** on any table where only one seat took the rubbing or opened the card |
| **each of the four** | **Marrow** | knows what this costs us and did not say | 2 | **[PROPOSED]** — the accusation the game never lets anyone make |
| **Marrow** | **the four** | do not know the price | 1 | **[PROPOSED]** — she is wrong on any `LETTER`/reveal branch, and never finds out |
| **Marrow** | **the four** | are walking out of love rather than out of arithmetic | 2 | **[PROPOSED]** — supported by her yielding to "Because it is Wren, and we are not doing it" (`ch7.js:398`) |
| **Wren** | **the four** | will seal STAY | 1 | `ch7.js:698`, `:758` |
| **Wren** | **the four** | do not know the Walk costs them their Sight | 2 | **[PROPOSED]** — and it is the assumption that makes Wren's silence survivable to Wren |
| **Vane** | **the four** | are choosing between a child and a rank | 1 | `ch7.js:494` |
| **the Binder** | **Marrow** | has known the price since before any of us were born | 2 | **[PROPOSED]**, and correct |

---

## 11. T10 — ch8: the Epilogue

The price is finally stated on the shared screen — **as a past-tense description**.

| ending | what is said about Sightings | cite |
|---|---|---|
| **0 — Fourfold** | "You come out of it the way the Founders came out: **grey-eyed and ordinary.**" Then, one clause per seat, the loss itemised: shapes, a room, a floor, and a Binder who "**has to ask what she feels**". Each phone burns: "**Your Sighting is spent. Look up.**" | `ch8.js:287`; `ch7.js:757`; `companion/ch8.js:148` |
| **1 — Half-Walk** | Walkers "come out of the fire **grey-eyed and free**"; stayers "**keep their Sightings, and the fire, for life**" and become the school's Masters | `ch8.js:320-321`; `companion/ch8.js:256`, `:259-263` |
| **2 — Sealing** | **Nothing.** Nobody's Sighting is spent; the word does not occur. Wren walks; the four keep everything | `ch8.js:331-333` |
| **3 — Keeper's Walk** | **Nothing — and Marrow walks.** The rule that walking spends a Sighting is never applied to the only adult who ever walks: "She puts her hand on the fire, and it opens like a door." No grey, no cost, no mention | `ch8.js:341` — §13(e) |
| **4 — Bargain** | "**Sighting registered. Report to the Envoy at dawn.**" / "Master *[name]*. Sighting: *[gift]*. **Assigned: the Cold-works.**" Nothing is spent and everything is owned | `companion/ch8.js:207-208`, `:291` |

| character | Knows | Believes | Wrong about | Withholding | Would say if asked | Changed |
|---|---|---|---|---|---|---|
| **Wren** (E0) | That the four paid; that Wren has a pulse and a thread — "**there wasn't a *me* on the other end to tie it to. There is now.**" (`companion/ch8.js:126`) | That it should not have happened and did (**certain**) | Was wrong about the four | Nothing left — the letters are the un-withholding | "You *idiots*. I had a *speech*." (`ch7.js:759`) | Wren's four goodbye letters are **written to be read by an instrument that is about to stop working** — the Reader's is glyphs that will become "three shapes on a page"; the Listener's is a heartbeat to be heard once; the Seer's is a drawing of five shadows falling the right way; the Binder's is a thread drawn red. **Each is a Sighting's last act, authored by the person the Sighting was spent on.** `companion/ch8.js:82-128` |
| **Marrow** (E2) | That Wren is dead and she is holding a grey thread nobody can see but the Binder | — | — | Her own Sighting, still unnamed, in the last scene she appears in | — | On **E0, E1 and E4 she is not mentioned at all** (§12.30) — including the ending that pays the bill she spent fourteen years avoiding |
| **Marrow** (E3) | That she is walking | — | **[PROPOSED, unstated]** Whether she knows she is spending her own Sighting. **The game never says, and she never says.** See §13(e) | Her Epilogue letters are the confession: "I should have asked you sooner. **I should have asked anyone. Ask, when you are me.**" (`companion/ch8.js:197`) | "Then I go. **I should have gone fourteen years ago.**" (`ch7.js:777`) | She dies without ever having named what a Sealing costs |
| **the four** (E0) | The whole of Q3, by experience | That it was worth it — "They would do it again. They say so, every winter, **at the point in the evening when it becomes true**." (`ch8.js:308`) | Nothing | The Reader keeps a letter they cannot read and "**will not have it translated**" — the last withholding in the game, and it is a Sighting-shaped one | "The Reader looks at the stone and sees shapes." (`ch8.js:287`) | Q1 and Q3 are answered by loss. **Q2 is never answered at all** |
| **the four** (E1, stayers) | That they kept theirs and the others did not | That they are now the Masters the school needs (**correct**, `ch8.js:321`) | — | Per seat: "you will teach the next Reader what the shapes say, and **never tell them which of the shapes you cannot look at**" (`companion/ch8.js:265`) — a new withholding, inherited | "Every shadow in the room, still. Four fall away from the fire. One falls toward it. It always will." | The stayers become the institution that keeps the secret. **The game's quietest cruelty** |
| **the four** (E4) | That a Sighting is a registrable asset of the Crown | — | — | — | "Master *[name]*. Sighting: Thread-Sight. Assigned: the Cold-works." | Q1's answer, restated as property law |
| **the real players** | Everything the ending they reached will tell them | — | — | — | — | On E2, E3 and E4 the player finishes the game **never having been told what walking costs**, because nobody walked who had a Sighting to lose |

### 11.1 Nested belief at T10

| holder | about | holds that… | depth | status |
|---|---|---|---|---|
| Wren | each of the four | will not be able to read/hear/see/tie this letter in a minute, and must be given something that survives the loss | 2 | `companion/ch8.js:86-128` — the letters are **written against** the recipient's imminent blindness. The single most precise piece of nested-belief writing in the game |
| the Binder (E0) | the other three | are as unbound and as held as ever: "four friends and **nothing between them but air**… **it has never not held**" | 1 | `ch8.js:287`; `companion/ch8.js:237` |
| Marrow (E3) | the Binder | can see her grey thread and always could | 2 | `companion/ch8.js:198` — "Swear the next one to a person" |
| the stayers (E1) | the next generation | must not be told which shape they cannot look at | 2 | `companion/ch8.js:265` — the cover-up restarting, in miniature, in the good-ish ending |

---

## 12. THE GAP THAT DRIVES THE DRAMA

### 12.1 The pair: **Provost Marrow ↔ the Binder**

**The asymmetry, exactly.** From T8 onward the Binder holds, alone, the Order's own accounting of what
four hands cost — "**Four Masters, four Sightings. The Convocation would not pay it. They struck the
Law and called it grammar.**" (`companion/ch6.js:286`) — and holds it in a Book that Marrow has
publicly admitted is not the Book she was given ("**That is not in the Book I was given.**",
`ch5.js:399`). Marrow, from T0, holds the same fact from the other side: she is the Chair of the body
that refused to pay, she can quote its reasoning verbatim ("They could not afford four Masters, so
they made it grammar.", `ch7.js:396`), and she has spent fourteen years building an alternative that
costs the school nothing and costs one child everything.

**Neither of them knows the other knows.** Marrow does not ask what is in the Binder's Book. The
Binder does not ask what is in Marrow's. The Book that contains the invoice sits in the hands of a
fourteen-year-old standing next to the woman who refused to pay it, for two entire chapters.

**Why this pair and not another.** Three rivals were considered and are weaker:

| rival pair | why it is weaker |
|---|---|
| Wren ↔ the four | Enormously productive, but it is the *Wren* mystery's gap (`epistemics-wren.md`); on Sightings specifically, Wren's withholding is passive |
| Marrow ↔ the four (as a body) | The four have no shared knowledge state — the whole point of the partition. A body cannot hold an asymmetry |
| the volunteer ↔ the other three | Sharp and lovely (§12.3) but branch-gated on `STAIR='HOLD'` and confined to two chapters |

Marrow ↔ the Binder is the only pair where **both halves are documentary, both are dated, both are
load-bearing on the Finale's central choice, and the two documents are in the same room.**

### 12.2 Scenes that currently exploit it

| scene | how | cite | verdict |
|---|---|---|---|
| `ch5_gate2`, the Silent Gate | The Binder writes COLD on a Founders' gate under the restored Law; Marrow's reaction is the admission that her Book is shorter: "That is not in the Book I was given." / Wren: "**It is in Mere's, apparently.**" | `ch5.js:399-400` | **Excellent, and the only place the two Books are put side by side.** It happens *before* the Binder has the 212 card, so the gap is visible and not yet loaded |
| `ch6_open` | The Hearth tells the Binder the struck Law is back; the card unlocks; Marrow, in the same scene, explains why the fire is dying and does not explain what a re-sealing would cost | `ch6.js:851-853`; `ch6.js:848` | **Half-exploited.** The two facts are printed four lines apart and never meet |
| `ch7_argue1`, option `letter` | The four answer Marrow's bar with the Binder's Law, and Marrow answers with 212's arithmetic. **This is the only moment in the shipped game where the gap closes.** | `ch7.js:395-396` | **The payoff exists and is branch-gated on `OATH_KNOT` and on the table picking one of four options.** Most playthroughs never see it |

### 12.3 Scenes that could exploit it and do not — **[untapped]**

| # | where | what is missing | cost | why it is the right place |
|---|---|---|---|---|
| **U1** | `ch6.js:851-853`, immediately after "THE FOURFOLD WALK IS OPEN" | **One line for the Binder to read aloud from the card, and one line for Marrow to answer it.** As shipped the Walk opens with no price attached and Marrow's next scene is the Finale | 2 lines | The Hearth has just cued the Binder's Book to turn a page. The table is looking at the Binder. This is the beat |
| **U2** | `ch7_decision` (`ch7.js:364-380`) | A `whisper` line addressed to the Binder: *"Binder — your Book has a page about the last time somebody was asked this."* The Decision currently runs with the price in a closed drawer | 1 line | The Decision is explicitly "No clock on this. Talk." — the one unhurried beat in the Finale |
| **U3** | `ch5_hold_named` / `ch6_tieoff` (`ch5.js:582`; `ch6.js:590-591`) | **Marrow does not connect the temporary spend to the permanent one, and the volunteer never mentions it again.** One line from the volunteer at T9 — "I've had mine off for an hour. It isn't nothing." — converts a mechanic into testimony | 1 line, per-seat | The only character with experiential knowledge of the Finale's price is silent about it in the Finale |
| **U4** | `ch1` Vigil, anywhere | **Nine Masters with nine Sightings decide the fate of a child, and 212's bill was four Masters' Sight.** Nobody — not Marrow, not Sorrel, not Vane — observes that the room contains more than twice the currency required. One line from Sorrel ("it comes to the nine of us") is already halfway there | 1–2 lines | It retro-fits a motive onto the entire Convocation and makes `ch0.js:242` pay off |
| **U5** | `ch7_wall` / `ch7_vane` | **Vane never prices the four's Sightings**, though the Crown registers them by dawn on his own ending. One line — "They are asking you to pay with your eyes. I am asking you for a child." — would make him the only honest broker in the room and make `VANE_ALLY` cost the table something | 1 line | Vane argues by pointing at evidence (`ch1.js:283`); this is the strongest evidence he has and he never points at it |
| **U6** | `ch8_e3` (`ch8.js:341`) | **Marrow walks and the game does not say she is spending her Sighting.** One clause — "and her eyes go grey" — applies the game's own rule to its own Provost | 1 clause | Without it, the rule stated at `ch8.js:287` has an unexplained exception in a neighbouring ending |
| **U7** | `ch2`, at the Founders' Door | Nobody says the Door was built for four gifts. A single Marrow line — "Four dials. They did not build it for cleverness." — plants Q2 twenty scenes before the thrones joke | 1 line | The architecture already argues it; the game never lets a character notice |

---

## 13. WHERE THE GAME CONTRADICTS ITSELF ON WHO KNEW WHAT WHEN

### (a) **[WITHHOLDING]** — "Every one of them has a Sighting of their own", and not one of them ever uses it

> `js/content/ch0.js:242` — "Tomorrow you will stand at the back of a hall while grown-ups decide about
> Wren. **Every one of them has a Sighting of their own.**"

against the whole of Chapter I, whose puzzle is that the four perceive what the room cannot: a coin
under seat 5's cushion (`companion/ch1.js:125`), a coin in seat 8's sleeve (`:126`), two oath threads
(`:141-142`), a heartbeat that skips (`:118`). **Nine perceivers sit in that room and none of them
reports a purchased vote.** Either the nine see it and say nothing — a scandal the game never names —
or `ch0.js:242` is false. It is also forbidden to be developed: "**No page lists all nine as people.**"
(`companion/ch1.js:10`). The rest of the game depends on the four's perception being exceptional;
`ch0.js:242` says it is not. **The line as shipped creates a false player expectation at T2 and pays
nothing.** Fix: cut it, or spend it (§12.3 U4).

### (b) **[CONTRADICTION]** — "spent" means two different things, and the reversible one is taught first

> `js/content/ch5.js:551-552` — "A held thread needs a living anchor. One of you stays. / **That Sight
> is spent until the Provost ties it off.**"
> `js/content/ch6.js:591` — "*[seat]*, **your Sight comes back like blood into a numb hand.**"

against

> `js/content/companion/ch8.js:148` — "**Your Sighting is spent.** Look up."
> `js/content/ch8.js:287` — "grey-eyed and ordinary"

One word, two mechanics, no distinguishing vocabulary anywhere. A table that held the stair has been
explicitly taught that a spent Sighting comes back, **four scenes before** being asked to spend one
forever, and the game never marks the difference. **The rest of the game depends on the permanent
sense** (it is the Founders' price, 212's refused bill, and E0's whole cost). Cheapest fix: ch5 says
*lent*, or ch5 adds Marrow's four words — "Lent. Not spent. There is a difference and you will meet
it later."

### (c) **[UNEARNED]** — the Fourfold Walk opens unpriced

> `js/content/ch6.js:855-856` — "**THE FOURFOLD WALK IS OPEN.** / The road four people walk together,
> not one."

Nothing on the Hearth, in this scene or any later one before the sealed word, says what that road
takes. The first statement of the price reaches each player **alone**, on SPEAK, after the group
Decision (`companion/ch7.js:185-188`), under a two-minute clock (`ch7.js:452`). And the earliest
forewarnings are both branch-gated and both incomplete (§0.2).

**Consequence, stated plainly:** on a table with `!LETTER` and an unopened Binder card, `ch7_decision`
— the most important choice in the game — is made by four people and one Provost **none of whom has
been told what the option costs.** Whether that is the design (you choose out of love, then learn the
price, then seal anyway) or an accident, it must be an author's decision, and the document that
records it should say which. **Proposed breadcrumbs**, cheapest first: §12.3 U1, U2, U3.

### (d) **[CONTRADICTION]** — a Sighting can be taught, and a Sighting cannot be chosen

> `js/content/ch0.js:241` — "One way of seeing, one to a person, and **nobody chooses which one they
> get**."
> `js/content/companion/ch0.js:139` — the Binder: "**You are the only person at this table who was ever
> taught this**, and it is four lines long."
> `js/content/ch4.js:51`; `companion/ch4.js:64-69` — the Reader's gift **expands** at T6, from a primer
> left on a desk, and after that reads an alphabet it could not read before (`companion/ch7.js:241`).

So one of the four gifts is partly a curriculum and another one grows when someone leaves a book open.
Neither is reconcilable with "nobody chooses which one they get" without a distinction — perception
versus training — that the game never draws. **The rest of the game depends on the expansion** (the
whole of the Reader's T8 and T9 rests on it: "Reader. You read the old tongue **now**.", `ch6.js:663`).
Fix: one clause at `ch0.js:241` separating the Sighting from what a person does with it.

### (e) **[CONTRADICTION]** — the rule exempts the only adult who walks

> `js/content/ch8.js:287` — "**Walking into it spends the Sighting.** You come out of it the way the
> Founders came out: grey-eyed and ordinary." (and `ch7.js:763`, `ch8.js:320`)
> `js/content/ch0.js:242` — every Master, Marrow included, has a Sighting.

against

> `js/content/ch8.js:341` (ENDING 3) — "She puts her hand on the fire, and it opens like a door." —
> and **not one word about what it costs her**, in the ending she walks in.

Either Marrow's Sighting is spent and the Epilogue omits it, or the rule has an exception nobody
states. Compounded by the fact that **Marrow's Sighting is never named anywhere in the game** — the
only named character with an asserted Sighting and no gift.

### (f) **[CONTRADICTION, structural]** — Vane's offer is worthless if `ch0.js:242` is true

> `js/content/ch1.js:282` — Vane: "He lives. I promise you that. **And the Crown makes the four of you
> Masters.**"
> `js/content/ch0.js:242` — every Master already has a Sighting.

Then a mastership is rank, not gift, and the four already have the only part of it that is scarce. On
ENDING 4 the Crown delivers exactly that — rank plus registration, "Masters of ash" (`ch8.js:356`) —
which means **the game's own worst ending is the one that reads the offer correctly**, and no
character ever notices. Not fatal; worth one line from the Binder at T3.

### (g) **[CONTRADICTION, minor]** — the Binder's Book pre-announces its own T8 revelation

> `js/content/companion/book.js:131` — "No thread — unbound; or, once, '**not unbound: the knot
> itself.**'" — **ungated**, visible from the Prologue.

against `ch6.js:678`, where "Not unbound. The knot itself." is the correct answer the Binder is
supposed to arrive at. Every comparable Book entry is gated by `maxChapter` (`book.js:75`, `:84`,
`:87`); this one is not. It is a Sightings fact (the fourth state of Thread-Sight, missing from
`lore.js:9`) handed over six chapters early. Already logged as `CANON.md` §13.44; restated here
because it directly sets the Binder's T0 knowledge cell.

### (h) **[CONTRADICTION]** — how long the Binder has been looking

> `js/content/companion/ch7.js:257` — "The Provost, to Wren: grey **since before you were born**."
> `js/content/ch8.js:333` — "It is grey. It has been grey for **fourteen years**."

Wren is fourteen. Both are true only if the four are younger than Wren, against `ch0.js:54` and
`ch8.js:345` (fourth-years at fourteen) and against their swearing oaths and being offered
masterships. `CANON.md` §13.38. It matters here because it dates **how long a Sighting has been
reporting an anomaly** — the Binder's evidence base for "my gift has a blind spot."

---

## 14. WHERE BEHAVIOUR DOES NOT MATCH THE KNOWLEDGE STATE

Ruthless, as asked. Ordered by how much of the story the inconsistency damages.

### (a) **Marrow prices a Sighting out loud at T7 and never mentions the big one — and the game does not mark it**

At `ch5.js:516` she offers the hold and prices it herself: "One of you stays, and **their Sight pays
for it**." At `ch5.js:551-552` she states the mechanism. At `ch6.js:590-591` she reverses it with her
own hands. **She is the game's expert on spending and restoring Sight, and she demonstrates it two
chapters before the Finale.** She then watches the Fourfold Walk open (`ch6.js:851`) and says nothing
about what it takes.

This is *defensible* as withholding — but the narration never flags it, and no character reacts.
Compare the treatment she gets everywhere else: the game is scrupulous about marking her
inconsistencies ("**She is stalling for you.**", `ch1.js:178`; "**Nobody has seen her do that
before.**", `ch4.js:749`; "**She steps aside anyway.**", `ch7.js:398`). Here, the one time her silence
is load-bearing on the ending, there is no marker at all. **[PROPOSED]** One narration line after
`ch6.js:852`: *"She does not say what the road takes. She knows to the last coin."*

### (b) **Marrow argues against the Fourfold Walk with contract law when she is holding the invoice**

`ch7_argue1` (`ch7.js:383-399`) is her one attempt to stop them, and her argument is: "**You swore
under KNOT, and it cannot be unbound. You swore to see Wren into the Cold.**"

She has a better argument, it is true, it is hers, and she uses it **only as a concession, on one of
four options, in reply**: "They could not afford four Masters, so they made it grammar." (`ch7.js:396`).

A character whose established mode is "gives orders and costs in one tone" (`ch1.js:186`; `ch6.js:488`;
`ch7.js:367`) and who "de-escalates before a puzzle" by naming the exact consequence ("Miss it and the
Cold pushes further. **That is all that happens.**", `ch6.js:488`) **would say the price.** The scene
as written has her reach for procedure instead of cost, which is the one thing she never does
anywhere else in nine chapters. **This is the clearest behaviour/knowledge mismatch in the mystery.**
It is also nearly free to fix: give `ch7_argue1` a fifth option, or put the price in her opening line
and let the four answer it.

### (c) **The Binder is handed the decisive fact and given no scene, no prompt and no line to use it**

T8 → T9. The Binder reads "Four Masters, four Sightings. The Convocation would not pay it."
(`companion/ch6.js:286`) and then, in the next chapter, serves as **Voice** at `ch7_attune`
(`ch7.js:359`) and **Warden** for the final ritual (`ch7.js:715`) — the two jobs that consist of
speaking and of typing for everyone — and is never once asked to say it.

This is not a character error; it is an **absence of content where the character's established
behaviour requires content.** The Binder's whole function, stated on their own page in the Prologue,
is to hold the rule the others cannot see and say it out loud ("Ask for both. **That is what the other
three are for.**", `companion/ch0.js:138`). Six chapters of that habit, then silence on the one page
that prices the ending. §12.3 U1/U2.

### (d) **The stair-holder never mentions having had a Sighting switched off**

Branch `STAIR='HOLD'`. One named seat sits in the dark for a chapter with their gift gone
(`companion/ch5.js:257`), gets it back at `ch6.js:591`, and at T9 reads "If you walk, you will never
see another thread" — **with direct, recent, physical experience of exactly that** — and has no line,
no prompt and no page on which to say so. Their Epilogue does remember it ("You held the stair, and
you never let go. **Nobody will ever know that but you.**", `companion/ch8.js:227-228`), which
proves the game considers it memorable. It is memorable one chapter too late.

### (e) **Wren steers the four into unlocking a road Wren knows is priced in their eyes, and nothing in the game registers it**

Wren has held the true reading for years (`ch7.js:404`), knows the four's gifts in operational detail
(`ch0.js:172-174`; `ch6.js:663`), says "I do not get a vote on the whatever-it-costs part"
(`ch4.js:611`), and at T8 says "**Then ask me a third time. In there.**" (`ch6.js:863`) — pushing them
onward after the stone has opened the Walk.

Wren's silence is consistent with Wren's established character (protective withholding, `CANON.md`
§9.1) — **but it is also the most morally loaded thing Wren does all night, and no one, including the
narration, ever names it.** Contrast the care taken elsewhere: "**Wren is lying, and is fourteen, and
is doing it for you.**" (`ch1.js:303`). There is no equivalent line for the largest omission Wren
makes. **[PROPOSED]** one narration line at `ch6.js:863`: *"Wren has known what the other road costs
for years, and has not once said the number."*

### (f) **Vane never prices the four's Sightings, and his own ending is built on their value**

He names a gift by function in public (`ch1.js:283`), offers four masterships (`ch1.js:282`), prices
refusal ("Then I will ask again later, **when it costs more**", `ch1.js:289`), and on ENDING 4 the
Crown registers all four Sightings and posts their holders (`companion/ch8.js:291`). A man with that
model of the asset, standing at the edge of a chamber where four children are about to destroy four
such assets, **says nothing about it** — while his established mode is to argue by pointing at
evidence he declines to explain.

Either he does not know walking spends a Sighting (nothing establishes his ignorance, and the Crown's
registry implies deep institutional knowledge), or he knows and stays silent (which would be his one
act of mercy and the game never claims it). **Undetermined, and the undetermination is visible.**
§12.3 U5.

### (g) **The nine Masters behave as if they have no Sightings, because functionally they do not**

`ch0.js:242` gives nine people nine perceptions. In `ch1` they sit through a vote in which two of
their own seats are visibly bought — coin under a cushion, coin in a sleeve (`companion/ch1.js:125-126`)
— an Envoy's soldier stands behind a third (`:127`), and **not one of the nine remarks on any of it.**
Sorrel, who is characterised as institutionally alert and transactional (`ch1.js:254-255`), notices a
Convocation's claim on the Ember and not a Crown's claim on two of its seats.

If the nine have Sightings, their behaviour at the Vigil is inexplicable. If they do not, `ch0.js:242`
is false. This is the single largest behaviour/knowledge mismatch by headcount in the game, and it is
caused by one sentence in the Prologue. §13(a), §12.3 U4.

### (h) **The Reader carries the Founders' own testimony and is never cued to speak it**

From T7 the Reader's Book holds "We wrote the cold glyph with four hands, and **came up grey**"
(`companion/ch4.js:62`) — the only Founder-voice statement of the price in existence. The Reader is
the seat whose entire job is to read out what a carving says, does so in every other chapter, and at
T8 sits through the reading of the prophecy stone — a scene *about* what the Founders did — with
Mere's own account of it in their Book and no prompt to mention it. The `ch4.js:498` promise ("It will
be in your **Book** from here on") is the game's own acknowledgement that it matters. **Nothing ever
asks for it again.**

### (i) **The four never compare price tags, and the design makes it nearly impossible for them to**

At T9 each of the four is told, privately, what walking costs *them*. The four costs are different
(`companion/ch7.js:185-188`), they are beautiful, and they are the most character-revealing lines any
of the four ever receive. The house rule ("**Say what you see. Never show your phone.**", `lore.js:74`)
permits saying them aloud; the preceding Hearth instruction ("Read your page. **Say nothing.**",
`ch7.js:357`) discourages it; and the two-minute clock (`ch7.js:452`) makes it unlikely. As shipped,
**four people pay four different prices and most tables never hear three of them.** That is a design
decision with a large emotional cost and it should be a deliberate one. **[PROPOSED]** one `whisper`
line at `ch7_tokens_intro`: *"You may say what it costs you. You may not show it."*

---

## 15. BRANCH SENSITIVITY

### 15.1 Flags that change *who knows the price, and when*

| flag | set at | effect on this mystery |
|---|---|---|
| **`LETTER`** (the ch2 rubbing) → **`LETTER_READ`** (ch4 desk) | `ch2.js:324`; `ch4.js:498` | **Gates the entire effect-half of the proof.** Without it, Mere's sheet never renders (`companion/ch4.js:71`) and the words "came up grey" never exist for anybody. On `!LETTER`, no character in the game ever learns that the Founders were changed by what they did |
| **`maxChapter >= 5`** | automatic at T7 | Delays Mere's sheet by a chapter, breaking `ch4.js:498`'s explicit promise (`CANON.md` §13.18). Net effect: the Reader gets the price-half **after** the study and **before** the bells |
| **the Binder's ch6 `reveal` toggle** | player action at T8 | **Not a flag — a UI opt-in.** `companion/ch6.js:283` gates on `ctx.unlocked('ch6')` only, so the card is available on **every** branch; whether the Binder taps it is not recorded anywhere. **The most consequential un-instrumented choice in the game** |
| **`WALK_UNLOCKED`** | `ch6.js:814` | Gates the four per-seat cost lines (`companion/ch7.js:184`). **If false, nobody is ever told what walking costs**, because nobody can walk. The mystery's third question is then never posed |
| **`STAIR`** = `HOLD` / `COLLAPSE` / `RUN` | `ch5.js:538`, `:570` | `HOLD` creates exactly one character (`VOLUNTEER`, one of four seats) with **experiential** knowledge of a spent Sighting, and restores it at `ch6.js:591`. `COLLAPSE` and `RUN` create nobody. On `HOLD_NOBODY`, four people each privately declined to spend a Sighting temporarily — **and then, at T9, may each choose to spend one permanently**. The game never puts those two facts next to each other |
| **`OATH_KNOT`** | `ch4.js:735` | Gates `ch7_argue1`, which contains **Marrow's only on-screen statement that she knows the 212 bill** (`ch7.js:396`) — and only on the `letter` option. On EMBER or unsworn paths, **Marrow never prices a Sighting aloud in the entire game** |
| **`REFUSED_OATH`** (refusal **or** a failed closing — `CANON.md` §13.16) | `ch4.js:617-618`, `:730` | The four come down by Mere's door "for people who were not asked" (`ch5.js:287`) — a Founder's own provision for the excluded. Thematically the strongest link to Mere's "**One was never asked**" and the game never joins them |
| **`TAPESTRY`** / **`ORIEL`** / **`LETTER_READ`** → **`LAW0`** | `ch4.js:85`; `ch5.js:8` | Restores the Law that *requires* four hands. Note carefully: **`LAW0` does not gate the 212 price card** — that is gated on ch6 alone. So a table can hold the legal requirement without the invoice, or the invoice without the requirement, or (commonly) neither |
| **`VANE_ACCEPT`** | `ch1.js:288` | The Binder learns the four are themselves bought ("**So, since the Hall, are you.**", `companion/ch3.js:236`) — a Sighting reporting that its own holder has been purchased. Compounds §13(f) |
| **`VANE_ALLY`** | `ch7.js:332` | Collapses the sealed word to WALK/STAY (`lore.js:48-50`) and removes the Envoy's letter. **The cost lines still render.** Removes the only outside party who could have priced the Sightings (§14(f)) |
| **`BARGAIN_<role>` = `kept`** | `ch7.js:500` | Converts a sealed WALK into a stayer — **a player can intend to pay and not pay**, and only the Epilogue tells them ("That key was dead, and three hands wrote what four should have", `ch7.js:50`; `companion/ch8.js:255`). A knowledge state the player holds about themselves that the world overrules |
| **`ENDING`** | `ch7.js:239-247` | 0: four Sightings spent, itemised per seat. 1: walkers spend, stayers "**keep their Sightings, and the fire, for life**" (`ch8.js:321`). 2 and 3: **no Sighting is spent and the price is never stated** — the player can finish the game never learning Q3. 4: all four registered by the Crown (`companion/ch8.js:291`) |

### 15.2 The four knowledge-configurations at `ch7_decision`, in order of frequency

| # | configuration | who at the table knows the price | how common |
|---|---|---|---|
| **A** | `!LETTER`, card unopened | **nobody** | commonest |
| **B** | `LETTER`, card unopened | Reader holds "came up grey", ungloss​ed and uncued | common |
| **C** | `!LETTER`, card opened | Binder holds 212's bill; nobody holds the Founders' side | common |
| **D** | `LETTER` + card opened | Reader and Binder hold complementary halves **and have no scene in which to join them** | uncommon, and the one the game should be written for |

**Author's decision required:** configuration A is currently the default, and in it the Fourfold Walk
is chosen blind. Either that is the intent — in which case `ch7.js:713`'s "Your Sighting is spent" is
the reveal and should be staged as one — or configuration D is the intent, in which case U1 and U2
(§12.3) are not enhancements but repairs.

---

## 16. APPENDIX — the cost, as the partition holds it

| what is known | Reader | Listener | Seer | Binder | Marrow | Wren | Vane | the Hearth |
|---|---|---|---|---|---|---|---|---|
| a Sighting exists, one per person | T2 | T2 | T2 | T2 | T0 | T0 | T0 | T2 (`ch0.js:241`) |
| the Founders were four | T4 (opt.) / T8 | T5 (portraits) | T6 (`TAPESTRY`) | T8 | T0 | T0 | T0 | T8 (`ch6.js:839`) |
| the Founders **came up grey** | **T7, branch `LETTER`** | never | never | never | **[PROPOSED]** T0 | **[PROPOSED]** T0 | never | **T10 only** (`ch8.js:287`) |
| 212's bill was four Masters' Sight | never | never | never | **T8, opt-in** | **T0** (`ch7.js:396`) | **[PROPOSED]** T0 | never | **never** |
| walking spends *your* Sighting | T9 | T9 | T9 | T9 | **[PROPOSED]** T0 | **[PROPOSED]** T0 | undetermined | **T9-end** (`ch7.js:713`) |
| a Sighting can be spent **temporarily** | T7 (if named) | T7 (if named) | T7 (if named) | T7 (if named) | T0 | T7 | never | T7 (`ch5.js:552`) |
| why there are exactly four | **never** | **never** | **never** | **never** | **never** | **never** | **never** | **never** |

The last row is the finding this document was written to produce. `CANON.md` §12.7's recommendation —
**one Sighting per Founder, still being dealt out** — costs one sentence, is contradicted by nothing,
and would retroactively earn the four dials, the four plinths, the four bells, the four thrones, the
four corners of the study, Mere's eight questions and four eyes, and the price the Convocation of 212
would not pay. It is currently the largest unclaimed piece of meaning in the game.
