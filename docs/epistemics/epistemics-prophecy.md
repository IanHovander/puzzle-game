# EPISTEMICS — MYSTERY: WHAT THE PROPHECY SAYS

*The Order's reading versus the carved reading. State tables across the revelation spine T0–T10.*

> ## ⚠ TOTAL SPOILERS
> Every reveal in the game, including the Finale's and all five endings. Working document for the
> author. Companion to `CANON.md` (ground truth) and `PLAYER-MODEL.md` (the reader's head). This file
> is **belief only** — where a character is wrong, this file says what they think and points at
> `CANON.md` for what is true.

**Citation rule.** `js/content/ch6.js:827` style, abbreviated to `ch6.js:827` and
`companion/ch6.js:287`. Anything not in the source is marked **[PROPOSED]**. Contradictions are
**[CONTRADICTION]**, mystery with no evidence offered is **[WITHHOLDING]**, a reveal with no
breadcrumbs is **[UNEARNED]**.

---

## 0. THE MYSTERY, STATED EXACTLY

One physical object, two readings, and the difference between them is a political crime.

| | **the Order's reading** (what everyone in the world believes) | **the carved reading** (what is true) |
|---|---|---|
| where it starts | the **school's mark**, cut beside cut 1 | cut 8 |
| direction | **up** the count | **down** the count |
| each cut says | the word it stands for | **its other word** (180° inversion) |
| COLD | left empty — Law 6, Order's, 212 | **written** — Law 0, Founders', Year 0 |
| the eight words | ASH · COLD · CROWN · KNOT · THORN · COLD · EMBER · VEIL | **KNOT · CROWN · ASH · WELL · VEIL · EMBER · ASH · COLD** |
| in English | "When the Hearth goes cold, **one born of four** shall walk into the Cold, and it shall close behind them." | "**Four, as one, go down with fire. What is kept stays behind. The fire is the hollow they left.**" |
| cite | `lore.js:75` (`L.prophecyOrder`); `ch0.js:63`; `ch6.js:393`, `:774` | `ch6.js:394`, `:827-828`; `NAIVE`/`TURNED` at `ch6.js:399-400` |

**Why the difference exists.** Not scholarship. In Year 212 the Founders' seal failed; renewing it
cost four Masters their Sight; the Convocation refused, **struck Law 0 "and called it grammar"**,
wrote Law 6 in its place, sent one Warden down alone, and rebuilt the evidence to match — the
antechamber, the bricked road, the overpainted tapestry, and the translation taught to every child
(`companion/ch6.js:286-287`; `lore.js:57`, `:67`; `ch2.js:346`; `scenes-ch4.js:66-74`).

**Three physical facts nobody in the fiction ever puts together, though all three are on screen.**

1. The ring has no first cut (`ch6.js:341`, `:400`), so the *mark* at cut 1 is an **addition** to the
   Founders' stone. Who cut it, and when, is never asked by anybody. **[PROPOSED]** it is 212's, in
   the same hand as everything else that year — this is free and it is the single cheapest line that
   would convert the misreading from an error into a signature.
2. The stone shows the Flame **inverted, twice** — cuts 2 and 6 (`ch6.js:399` `STONE`). The Founders
   cut COLD into the stone, in public, above the fire. Law 6 says COLD is never written. **The
   Order's own Law is refuted by the object the Order's reading is read off.** No character, page or
   line ever notices.
3. Cuts 2, 4, 6 and 8 are **unburnt and public** — "the room can see both their shape and which way
   up they stand" (`ch6.js:343-345`). The Reader can read any worn carving (`ch0.js:146`;
   `lore.js:6`). So the Reader could read half the stone from Chapter 0 and is never given a page for
   it until ch6. See §5.1.

---

## 1. THE STAKEHOLDERS, AND THE CEILING ON EACH

| who | can they ever reach the carved reading? | cite / limit |
|---|---|---|
| **Wren** | Has it before the game opens | `ch7.js:404` "I have had years to get used to it" |
| **Marrow** | Has it, and can execute the reading in about thirty seconds | `ch6.js:824` |
| **Vane** | **No.** He has the *conclusion* (four, not one) from the paint; he never sees the foot of the stone, never mentions the stone, and the word "stone" does not appear in any Vane line in the game | `ch7.js:341`; `ch4.js:557`; grep |
| **Reader** | Only at T8, and only the four burnt shapes | `companion/ch6.js:199-205` |
| **Listener** | Only at T8, and only where the lap ends | `companion/ch6.js:207-215` |
| **Seer** | Only at T8, and only which way each burnt chisel went in | `companion/ch6.js:217-223` |
| **Binder** | Holds **Law 0, struck**, from the Prologue; gets the three-clause version at T8 | `lore.js:57` (`learned:'ch0'`); `companion/ch6.js:232` |
| **Oriel** | Has the conclusion from the paint, as a girl; never the text | `ch4.js:588` (branch `ORIEL`) |
| **Sorrel + six unnamed Masters** | Nothing. The game gives them no state on this at all | **[WITHHOLDING]** — §4.7 |
| **the Convocation of 212** | Had it, and buried it | `companion/ch6.js:286-287` |
| **Mere (documentary voice)** | Had it, and left two portable proofs of it under the school | `ch2.js:315-319`; `companion/ch4.js:62` |
| **the four real players at the table** | T1 hear the Order's reading captioned **"THE ORDER'S READING"** on the shared screen | art `scenes-ch0.js:78` |

---

## 2. THE STATE TABLES

Columns throughout: **Knows** · **Believes (confidence)** · **Wrong about, and why** · **Believes about
others** · **Withholding (from whom / why)** · **Would say if asked directly** · **Changed since the
previous row**.

---

### T0 — before play

| | Knows | Believes | Wrong about | Believes about others | Withholding | Would say if asked | Changed |
|---|---|---|---|---|---|---|---|
| **Wren** | Both readings. That the stone is about Wren, and has been for years (`ch7.js:404`). That the Provost's gloss of the name is not the true one (`companion/ch3.js:284`). All four of the four's private anomalies, "for years" (`ch0.js:226`) | That the night ends with Wren walking in under **either** reading — high, settled | **[PROPOSED]** nothing on this mystery. The game gives Wren no false belief about the stone; Wren's only error is thinking the four can be spared the choice | **Marrow:** does *not* yet know that Marrow knows what Wren is — Wren dates that "since the laundry," T5 (`ch6.js:689`). **The four:** hold the school's translation and have each privately noticed one impossibility and told nobody (`ch0.js:226-227`) | The carved reading, **from the four** — no reason yet, and a request they cannot refuse is a request Wren will not make (`ch7.js:768`) | "It says what it says. Everybody agrees who it's about. There isn't much left to argue." | — |
| **Marrow** | Both readings; can read the foot (`ch6.js:824`). What is under the paint, having scraped it as a girl (`ch7.js:394`). The political history: "They could not afford four Masters, so they made it grammar" (`ch7.js:396`). That Law 0 is not in her Book (`ch5.js:399`). That the ring has been ready fourteen years (`ch7.js:367`) | That the carved reading changes **nothing operationally**, because four Masters cannot be had — so the Order's road is the one she has prepared for fourteen years. Settled, not happy | **[PROPOSED] — the load-bearing error of the whole game: that "four hands" means "four Masters."** Law 0 says *hands* (`lore.js:57`); 212's minute says *Masters* (`companion/ch6.js:287`). She inherited the substitution. It is the only reading under which fourteen years of raising one child makes sense, and it is the error E0 corrects | **Wren:** does not know what Wren is or where Wren came from — **correct at T0, false from T5**. **Vane:** knows what is under the paint, and will use it — **[PROPOSED]**, from her reaction at `ch1.js:139`. **The nine:** hold the school's reading; she has never named the thing below to them (`ch4.js:592`). **The four:** children with four gifts, not yet instruments | The carved reading, **from the four** — she has not met them yet. That she can read it, **from Wren** — because for fourteen years she has had no alternative to offer | "The stone over your heads says one born of four." *(Her own ch1 line, `ch1.js:124` — she will quote the reading she knows is a forgery, in the Chair, to the Convocation.)* | — |
| **Vane** | What is under the paint: four figures, no child, the fourth carrying COLD (`ch4.js:557`; `ch7.js:341`; art `scenes-ch4.js:47-62`). That the Convocation exiled him for saying so, 22 years ago | That the school's reading is a lie and the institution knows it — total. That the Crown should have the Cold open (`companion/ch4.js:213`) | **The text of the stone he has never had.** He owns a picture and no sentence, and behaves all night as if the Order's reading were operative — see §5.4 | **Marrow:** knows what is under the paint (right — he levers it in public, `ch1.js:138`). **The Convocation:** knows and suppressed it. **The Seer:** is the seat that can confirm it — he names the gift unprompted (`ch1.js:283`) | The *content* of what is under the paint, **from everyone** — deliberately. A lever you explain is a lever spent | "One born of four. There are four figures on that wall and no child anywhere in it. Ask your Seer." | — |
| **Reader** | The school's translation, learned as a child (`ch0.js:62`). The lexicon: four shapes, two words each; mark on the left reads upright, on the right turned and inverted (`book.js:71`). That they can read any worn carving (`ch0.js:146`; `lore.js:6`) | That "nobody alive has read the cuts" **includes them** — unexamined, because the school says so | That, and **[CONTRADICTION] §4.1**. Also: that Wren's name chalked twice on the dorm door, a year ago, in the same hand, is "somebody being funny" (`companion/ch0.js:99`) | That the other three also hold only the school's translation. That the Provost's gloss of Wren's name is authoritative | The chalk, **from everyone**, including Wren — "You have never asked who" | "It's the only translation there is. Nobody alive has read the cuts — that's the first thing they teach you." | — |
| **Listener** | The Ladder: seven steps and a rest, and **COLD is the rest, no step** (`book.js:89-92`; `glyphs.js:18`). Has never once heard Wren's heart | That the fault is theirs (`companion/ch0.js:112`) | That. And has no reason on earth to connect "the cold word makes no sound" to a carving | That the other three hear nothing unusual about Wren | The missing heartbeat, from everyone, "and you have never said it out loud to anyone" | "You can't hear a carving. I've never heard the stone." | — |
| **Seer** | Sees what paint covers, where an inscription begins and whether it is turned (`lore.js:8`). Wren's shadow falls **toward** every fire | A trick of the light (`companion/ch0.js:124`) | That. And, structurally: **has lived seven years in a school that hangs the overpainted tapestry in every hall (`ch4.js:533`) and has never looked under one** — see §5.2 | That the others see the same picture they do | The shadow, from everyone | "Where an inscription starts is my business. Nobody has ever asked me where that one starts." | — |
| **Binder** | **Law 0, struck, from the Prologue**: "COLD is written by four hands. — struck by the Convocation, 212. See Law 6." (`lore.js:57`, `learned:'ch0'`; rendered `book.js:123-128`). Law 1. The framing "Founders' (Year 0) or Order's (Year 212 or 340)" (`book.js:122`). That Wren has **no thread at all** | **That a struck Law is a dead Law.** Total, unexamined. *This single belief is what holds the whole mystery shut for six chapters* | Exactly that. Law 3 — "where two Laws disagree, the older binds" — does not reach the Book until ch2 (`lore.js:60`, `learned:'ch2'`), so at T0 the Binder has the key and not the lock | That the Reader's translation and the Book of Laws are unrelated documents. That nobody else has Laws | That their gift has a blind spot, from everyone (`companion/ch0.js:145`) | "Law 0 is struck. It says COLD is written by four hands, and it was struck in 212, and a struck Law is not a Law." | — |
| **Oriel** | What is under the paint — she took a bread-knife to it as a girl — **and that they repainted it inside the week** (`ch4.js:588`). She is the only living person who has watched the suppression operate | That the school is lying about something below, and that the proof is below — high | Nothing established. She is careful and never over-claims: "**Tonight** — keep" (`ch1.js:67`) | That the Chair knows more than she says. **[PROPOSED]** | Her scraping, from everyone until her note is found — and the note only exists on branch `ORIEL` | "I have seen what they will do to keep that picture one person. I want to know what is under the school, and I want all of it." | — |
| **Sorrel, and the six unnamed Masters** | Nothing established | Nothing established | — | — | — | — | **[WITHHOLDING]** — §4.7 |
| **the Convocation of 212** (dead) | Both readings, and that it was substituting one for the other | That the bill was not worth paying — "Four Masters, four Sightings. The Convocation would not pay it" (`companion/ch6.js:286`) | **[PROPOSED]** that striking a Law removes it. Law 3 is theirs to obey and the Book still carries Law 0, struck and dated, four hundred years later (`lore.js:57`) | — | Everything, from every generation after it | "It was grammar. We corrected the grammar." | — |
| **Mere** (documentary) | Both readings; that the misreading was *available* — she cut a three-shape strip that demonstrates both, and hid it behind her own plinth (`ch2.js:315-319`) | **[PROPOSED]** that the school would one day read it one-ended. Nothing else explains a portable two-reading proof hidden in a niche | — | — | — | "Four, as one, went through. Not one." (`ch2.js:319`) | — |
| **the players** | Nothing | — | — | — | — | — | — |

---

### T1 — ch0 cold open + prophecy stone

**Nothing in any character's head moves at T1.** `ch0_start` and `ch0_stone` are an establishing
sequence, not a scene anyone attends — the four are in the dormitory and only reach it at `ch0_dorm`.
T1's whole traffic is between the game and the table. Recording what the fiction commits to here,
because two of the claims are load-bearing and one of them is false.

| what T1 asserts | cite | status |
|---|---|---|
| The Order's translation, verbatim, in omen type | `ch0.js:63`; identical string `lore.js:75` | true as *a* reading |
| "**Nobody alive has read the cuts.** Every child here learns the school's translation, and every grown-up here argues about it." | `ch0.js:62` | **false in-world** — Marrow reads it at `ch6.js:824`. **[CONTRADICTION] §4.1** |
| The art captions the slab **"THE ORDER'S READING"** on the shared screen | `scenes-ch0.js:78` | true, and the strongest free breadcrumb in the game. No character ever notices the caption is a *faction's* name, though the Binder's own Book has told them since T0 that "the Order" is the body that legislated in 212 and 340 (`book.js:122`) |
| "You will be shown this sentence again, when it matters, and closer than this." | `ch0.js:64` | a promise the game keeps, at T8 |
| "Nobody agrees what the rest of it means. **Everybody agrees who it is about.**" | `ch0.js:66` | the mystery's thesis, stated once and never revisited |
| The slab is drawn as grooves and soot — `wornCuts(8, …)` — not as glyphs | `scenes-ch0.js:74` | the art obeys §7.6 of `CANON.md`; it is also what hides §0.3 |

| | Changed at T1 | Would say if asked |
|---|---|---|
| **every character** | Nothing | as T0 |
| **the players** | Now hold one sentence and one caption that disagree with each other. Live hypotheses this creates: *Wren is the one born of four* (wanted, and to be killed at T8); *the Order is a party with an interest* (wanted, to be confirmed at T8); *the translation is wrong* (wanted, and the game must not confirm it until T4 at the earliest) | "The prophecy is about Wren. Something called the Order made that translation." |

---

### T2 — ch0 lamp lit → the four speak

| | Knows (new) | Believes | Wrong about | Believes about others | Withholding | Would say if asked | Changed |
|---|---|---|---|---|---|---|---|
| **Wren** | That the four now know about each other | As T0 | — | That the four still read the stone the school's way, and that this is fine because "everybody agrees who it is about" | The carved reading, still — **now with a motive**: Wren has just watched four people confess four impossibilities and has decided not to add a fifth. **[PROPOSED]** the motive; the withholding is certain | "Nobody has all four. That's the whole trick of it." *(`ch0.js:175` — the closest Wren comes all game to saying the prophecy's number out loud, and it is said about a lamp)* | Learns that the four's four secrets are simultaneous |
| **Reader** | That the other three each carry an impossibility about Wren | That Wren is not merely unusual — **somewhere between "unlikely" and "not a person"**; unformed, but live | Still that the chalk is a joke | That the Listener's and Seer's facts are as unexplained as their own | The chalk, still. "You have never asked who" | "Four of us noticed four different impossible things. That's not four coincidences." | The rationalisation cracks. The *stone* does not move |
| **Listener** | Same | Same, plus: the fault may not be theirs | That it is theirs | Same | Same | "I've never heard it. Apparently that's the least of it." | Same |
| **Seer** | Same | Same | That it is the lamp — "It is not the light. It never was" (`companion/ch0.js:124`) | Same | Same | "It falls the wrong way. It has always fallen the wrong way." | Same |
| **Binder** | Same | Same | **Still that a struck Law is dead.** T2 offers them nothing that touches Law 0 | Same | Same | "None. No thread at all. Not unbound — I know unbound." | Same |
| **Marrow, Vane, Oriel, the nine** | — | — | — | — | — | — | Not present |
| **the players** | The lamp needs **four hands** (`ch0.js:88`, `:203`); carving **WREN** into brass makes it flare **blue** (`ch0.js:169`) — the Cold's palette colour (`scenes-ch0.js:7`) | Live: *Wren is not human*; *four hands matters* | — | — | — | — | Two of the best plants in the game land here and **neither is remarked on by anybody, in the fiction or the narration** (§12.46, §12.47). See §6.1 |

**Unmarked at T2 — the game's largest unearned moment, and it sits on this mystery.** Before any of
the four has spoken, Wren names the lamp's hum ("nobody else in this room has ever heard it",
`companion/ch0.js:104`), the cuts under the brass "nobody has ever seen", and the ring rule "nobody
else was taught" (`ch0.js:172-174`), then: "Yes. All four of you. **I've known for years**"
(`ch0.js:226`). Nobody asks how. §12.21. For *this* mystery the consequence is precise: **Wren
demonstrably has access to facts that live on one seat's page, which is exactly the access needed to
read a stone with four private facts in it — and the game never charges Wren for it.**

---

### T3 — ch1: the writ, "under the paint", the vote

| | Knows (new) | Believes | Wrong about | Believes about others (nested) | Withholding | Would say if asked | Changed |
|---|---|---|---|---|---|---|---|
| **Marrow** | Confirms that Vane will use the paint publicly | That the Order's reading, *used as the school's own law*, is the strongest instrument she has for keeping Wren tonight — high | As T0 (four hands = four Masters) | **Vane:** he knows what is under the paint, and knows she knows, and has chosen to say it where the Hall can hear ("not far enough", `ch1.js:138`). **The nine:** believe the stone plainly; **Oriel** she does not suspect. **The four:** know nothing and are about to be useful | (a) The carved reading, **from the nine** — naming it would open the bill 212 refused, in a Hall with two bought seats and one blocked. (b) That she can read the foot, **from everybody** | "The stone over your heads says one born of four. Tonight I stop arguing and show you." *(`ch1.js:124` — and she shows nothing; §12.42, §5.3)* | She quotes, as Chair, the reading she privately knows is a forgery. **The game never marks this as a choice** |
| **Vane** | That the Hall will not follow him on the paint alone; that the four are the lever | That naming the Seat that can check it is worth more than explaining — high | The text of the stone, still | **Marrow:** her face moved, so the lever landed. **The four:** have a Seer and do not yet know what it is for | The content, deliberately: "**Ask your Seer** what is under the paint" (`ch1.js:283`) — an instruction, not an argument | "You think I am the villain of tonight. I am the only person in that Hall who said what was on the wall." | Converts private knowledge into a public dare |
| **Wren** | Oriel has been studying Wren all evening "like a sum she was doing" (`ch1.js:306`) | That the Seer should go and look at the wall — Wren says so | — | **Marrow:** is arguing the school's reading in public *for* Wren; Wren does not yet know she can read the other one. **Oriel:** is computing something about Wren and Wren does not know what | The carved reading, still | "Seat Seven watched me the whole time. Like I was a sum she was doing. **Seer, what is *on* that wall?**" *(`ch1.js:306` — Wren is steering the four at the mystery without ever naming it)* | **Wren begins seeding.** This is Wren's first directed push and it is aimed at the seat Vane just named |
| **Seer** | That two adults, one hostile and one Wren, have now pointed at a painted surface within minutes of each other | That there is something under the paint — moderate, and now actionable | Still "a trick of the light" about the shadow | That the Envoy would not name their gift in public unless he were right | Nothing new | "He said ask me. Nobody has ever asked me." | **Named, publicly, as the instrument of this mystery.** The largest single-seat movement before T8 |
| **Reader** | The lintel word; the filed roll (seats 9 and 3) | — | — | — | The chalk | "Nobody's shown me the stone." | Nothing on this mystery |
| **Listener** | **Marrow's heart skipped twice — while she was looking at Wren, not the fire** (`companion/ch1.js:118`); Vane's heart is the only fast one in the Hall (`companion/ch1.js:116`) | That the Provost is frightened of something about Wren specifically — moderate | — | That the others saw her face and not her pulse | The skip, from everyone. **Reason: not having words for it** — a skipped heart is not evidence of anything nameable | "Her heart went twice while she was looking at Wren. I don't know what that means." | The Listener acquires the first hard evidence that Marrow's public position and private state differ |
| **Binder** | The vote's threads; who is sworn, bought, blocked | That the Hall runs on obligations, not arguments — high | Still that a struck Law is dead | — | — | "Law 0 is still struck. Nobody has asked me about a Law tonight." | Nothing on this mystery — **the seat holding the key spends Chapter I on a vote count** |
| **Oriel** | That the four are going below | That whatever she scraped as a girl is connected to whatever is down there — high, unprovable | — | **The four:** will find it and can be bought with nothing but a promise. **Marrow:** knows and will not say | Her scraping, until `ORIEL_NOTE` | "Tell me what you find down there. All of it. **Even the parts you don't like.**" (`ch1.js:256`, `:266`) | Buys the thing she lacks with the only currency she has |
| **Sorrel** | — | That the Ember is the asset worth having | **That the object matters more than the reading** — the only Master who bets on the wrong thing, and the game never pays it off | — | — | "Under this school is a thing called the Cold Ember. When the Provost sends you down for it, it comes to the nine of us." (`ch1.js:255`) | Characterising contrast with Oriel; no consequence |
| **the players** | "Under the paint" is now a phrase with two independent sources (Vane, Wren). "One born of four" has been said aloud by the Provost as institutional fact | Live and wanted: *the picture and the prophecy disagree* | — | — | — | — | — |

---

### T4 — ch2: the Founders' Door, the Vault, the bricked road, **212** — and (optional) Mere's niche

The chapter where the *mechanism* of the mystery is taught as a puzzle, one chapter before anyone
suspects there is a mystery.

| | Knows (new) | Believes | Wrong about | Believes about others | Withholding | Would say if asked | Changed |
|---|---|---|---|---|---|---|---|
| **Binder** | **Law 3: "where two Laws disagree, the older binds"** (`lore.js:60`, `learned:'ch2'`). Law 13 (F, Year 0) vs **Law 9 (O, 212)** — and that the Founders' one wins. Law 2 | That the Order legislated over the Founders in 212 and lost — **now demonstrated, on a door, with their own hands** | **That this pattern is about doors.** The Binder now holds Law 0 + Law 3 + a worked example of a 212 override losing to a Year-0 rule, and does not generalise. The game will not let them: `LAW0` is not settable until ch4 (`ch4.js:85`) | That the Reader's translation is a separate kind of object from a Law | Nothing new | "Law 9 is the Order's, Law 13 is the Founders', and the older binds. That's the door." | **The mystery's whole grammar is handed to the Binder as a lockpick and never as an argument.** See §5.5 |
| **Seer** | Four plinths re-set so **not one stands in its own hole** (`companion/ch2.js:141-142`); a newer floor over four original sockets; the Founders' names **worn off the plinth fronts** | That the room was altered, deliberately, by someone hiding something — high | — | That Marrow knows, since she sent them ("that vault was rebuilt once, and **the rebuilding was not honest**", `ch2.js:189`) | Nothing | "Somebody moved four statues off their own holes and rubbed four names off the front of them." | The Seer acquires physical proof of institutional forgery, with a date on the wall |
| **Reader** | The four plinth glyphs; **Mere's name, cut fresh on the back of plinth 1** (`ch2.js:301`) if the niche is opened. Takes the rubbing (`LETTER`) and **cannot read a word of it** | — | Still that the chalk is a joke — but `companion/ch2.js:121` now says "Four floors down, you have started to wonder who wrote it" | — | The chalk | "I have read every name in this school tonight. The one I can't read is on our own door." | First crack in the Reader's rationalisation, and it is about an alphabet |
| **all four (branch `CH2_STRIP='right'`)** | **The answer.** The Hearth says it, unprompted, on the shared screen: "KNOT, CROWN, THORN — four, as one, went through. **Not one.** And the stone above the Hearth has said one born of four for four hundred years." (`ch2.js:319`) | That the school's prophecy is wrong — **certainty, from the Hearth's own mouth, in Chapter II** | — | — | — | "The stone is wrong. The Hearth just said so." | **The mystery is solved at T4 on this branch and the game never acknowledges it again.** `CH2_STRIP` is written and read nowhere (`CANON.md` Appendix A). See §4.4 |
| **all four (branch `CH2_STRIP='left'`)** | The mirror: "WELL, EMBER, VEIL — one went down alone and kept it. **It is the reading the school teaches, and the mark on this stone is at the other end**" (`ch2.js:317`) | That the school's reading is start-dependent — strong | — | — | — | "The school reads it from the wrong end. It says so on a rock." | Arguably the *better* clue: it names the defect (the mark) rather than the answer |
| **Marrow** (offstage) | — | That sending four children to a room she knows was dishonestly rebuilt will teach them something she cannot say | As T0 | **The four:** will find what the Seer's eyes can find, and she has aimed them at it deliberately ("take the Seer's eyes with you", `ch2.js:189`) | **That the rebuild was 212's, and why** — from the four. Reason: *protecting herself and the vote.* She names the dishonesty and withholds its date, its author and its motive, all of which she has | "That vault was rebuilt once, and the rebuilding was not honest." *(`ch2.js:189` — a complete sentence with three deliberate omissions)* | Her first act of directed, partial teaching. The pattern repeats at T6 (the primer) and T8 (the stone) |
| **Wren** | Follows them down; takes a fall and an arm for the box (`ch2.js:358-376`) | — | — | — | The carved reading, still — **and Wren is standing in the antechamber while the four read Mere's strip.** Wren says nothing about the stone | "You *left* without me. Also you dropped this. Also the stairs are going." | **[BEHAVIOUR]** §5.6 |
| **the players** | **212** is now a number cut into a wall in plain view (`ch2.js:346`; `scenes-ch2.js:100`). The Founders' road continues past it, bricked | Live and wanted: *something happened in 212 and the school covered it*; *the Founders' number is four* | — | — | — | — | The date and the motive-shape are both on screen four chapters before the motive |

---

### T5 — ch3: the corridors, the laundry, the four whispered questions

| | Knows (new) | Believes | Wrong about | Believes about others (nested) | Withholding | Would say if asked | Changed |
|---|---|---|---|---|---|---|---|
| **Wren** | **What Marrow is and where Wren came from — "since the laundry"** (`ch6.js:689`; `ch8.js:330`) | That the four's four answers, taken together, name what Wren is — and that Marrow has known all along | — | **Marrow:** *(two levels)* Wren now believes the Provost knows exactly what came out of the fire, is **not** uncertain about it, and is withholding it **because she has decided Wren must not be asked to volunteer** — and Wren will not force it, but will later hand her permission instead of an accusation: "Tell them. **You are allowed.**" (`ch6.js:689`). **The Reader:** does not yet know the name's meaning and is being lied to about it by Marrow | The carved reading, still. **New this row:** that Wren has worked out the origin — Wren sits on it for three chapters | "What does my name mean in the old tongue? **Properly. Not the Provost's version.**" (`companion/ch3.js:284`) | **Wren accuses Marrow of a substitution — to the one seat that can eventually check it, in a sealed private channel.** The game's tightest single piece of epistemic engineering on this mystery |
| **Reader** | That there **is** a Provost's version of the name, and that Wren does not trust it | That the name is evidence — low, no tools yet | Still the chalk | **Wren:** knows more about the Reader's own subject than the Reader does. **Marrow:** has given Wren a gloss Wren disbelieves | Truth is `DONTKNOW` (`lore.js:44`). A player who says **TELL** invents "a small brave bird" — *a bluff which is, per §12.28, probably a quotation of the Provost's version* | truthful: "I don't know yet." / bluffing: "A small brave bird." | The Reader is handed the thread that ends at WRENN, T6, and at the eighth socket, T9 |
| **Binder** | — | — | Still that a struck Law is dead | **Wren:** is asking the Binder, of all seats, whether the prophecy is true of Wren | Truth is `DONTKNOW`. The honest answer to the prophecy question is *I don't know* | "I don't know." / "Yes." | **The prophecy is asked as a direct question, by its subject, to the keeper of the Laws, and the true answer is that nobody knows.** The chapter's best beat, and it never returns — ch6 re-asks a *different* question (`ch6.js:673`); **[CONTRADICTION] §4.5** |
| **Listener** | The Gallery portraits mutter, and the three words are "***four went down***" (`ch3.js:440`) | Nothing yet — the referent is unstated (§12.56) | — | That the others heard nothing | Truth is `NO` | "No." / "Loud." | The Listener now holds a *spoken* corroboration of the carved reading and no frame to put it in |
| **Seer** | — | — | — | — | Truth is `TELL` | "Your shadow falls toward the fire. Every fire." | Wren's reaction, `TELL`: "*Toward. Huh.*" then "*That's very poetic, the Seer.*" — Wren deflects the one true answer given (`companion/ch3.js:291`) |
| **Marrow** | — | — | As T0 | **Wren:** still believes Wren does not know — **now false.** She goes on calling Wren "the child" in front of Wren for three more chapters | Everything, unchanged | "There is a ward on the door of the Bell Tower, older than the school." (`ch3.js:444`) | **Her model of Wren goes stale here and she does not find out until T8** — the single cleanest dramatic asymmetry in the game |
| **Vane** | Where Wren is; that the Provost has lamps out and bells ringing | That she is moving Wren toward the Tower — right | The text, still | **The four:** may have taken his offer; his captain "cannot know how you answered" (`ch3.js:393`) | — | "The Envoy holds the Crown's writ." | Nothing on this mystery |
| **the players** | "four went down" in a muttering gallery; "not the Provost's version" | Live and wanted: *Marrow has lied to Wren about the name*; *the portraits are counting something* | — | — | — | — | Both are one-seat facts. The shared screen carries neither |

**[UNEARNED] — what happens in the laundry.** Wren's "I have known **since the laundry**"
(`ch6.js:689`) refers to learning the origin, and **no scene in ch3 contains that.** Two readings:
(a) Wren *deduced* it from the four whispered answers — which is elegant and free, but the whispers
are individually refusable, so Wren's certainty would be conditioned on flags nothing checks; (b)
something happened off screen. Recommend (a) and one line of Wren's in `ch3_whispers` that says so
**[PROPOSED]**, since this is the beat where the Order's reading stops being scholarship and becomes
personal.

---

### T6 — ch4: the study's four secrets, the primer, the tapestry, the Oath

| | Knows (new) | Believes | Wrong about | Believes about others | Withholding | Would say if asked | Changed |
|---|---|---|---|---|---|---|---|
| **Reader** | **The older alphabet**, from Marrow's own primer, left open on her desk (`ch4.js:328`; `companion/ch4.js:68`). **The Vigil roll spells it WRENN** — "the hollow of a bell — the space inside it that makes the sound" — written by the Provost **in her own hand** (`companion/ch4.js:202-204`). Marrow's journal: "IT SLEEPS WITH THE WINDOW OPEN" (`ch4.js:211`) | That Marrow **knew on night one** what she was naming — high, and unspoken | That it is a spelling mistake (`companion/ch4.js:205`) — the rationalisation moves rather than dies. **[CONTRADICTION] §4.6** with `companion/ch7.js:241` | **Marrow:** *(two levels)* the Reader now believes the Provost knows what the name means, is **not** uncertain, and is withholding it from **Wren** — and infers nothing about whether she is withholding it from the Reader, because the Reader has not asked. "**You have never asked her**" | The meaning of WRENN, **from Wren** — assuming, wrongly, that Wren does not want it yet ("Tell me when", `companion/ch3.js:284` on `DONTKNOW`) | "Her handwriting. Her primer. She wrote *hollow* on the roll and calls it a bird." | **The Reader acquires proof of Marrow's knowledge state.** Marrow does not know they have it, and never learns |
| **Seer** *(branch `TAPESTRY`)* | Under the paint: **four walk in, the fourth carries COLD, the second reaches back, no child** (`companion/ch4.js:128` plate; art `scenes-ch4.js:47-62`) | That the Order's reading is a lie about the **count** — certainty | — | **Vane:** was telling the truth. The Hearth says so: "'I have seen what is under the paint,' the Envoy said. **So he had.**" (`ch4.js:557`) | Nothing | "Four of them walk in. There is no child in it anywhere." | **The count is refuted on the shared screen, in front of everybody, for the first time** |
| **all four** *(branch `TAPESTRY`)* | The above, plus Wren's reaction: "**Four of them. Where is the one born of four? Where am I?**" (`ch4.js:558`) | That the prophecy's subject may not exist — live, unresolved | — | — | — | — | The mystery's question is finally asked out loud, **by Wren**, on the Hearth |
| **Reader** *(branch `LETTER_READ`)* | **Mere's sheet**: "We were four. I offered to go alone and was refused. One was never asked. **We wrote the cold glyph with four hands, and came up grey.** — Mere, who kept the fire, after." (`companion/ch4.js:62`) | That Law 0 is not a dead rule but a **description of something four people did** — high | — | — | The sheet is promised "in your Book from here on" (`ch4.js:498`) and does not render until ch5 (`companion/ch4.js:71`) — **[CONTRADICTION] §13.18** | "Four hands. She *says* it. She was there." | The strongest documentary evidence in the game, and it lives on one phone and is never printed on the Hearth |
| **Binder** | `LAW0` flips to **RESTORED** in the Book on any of `LETTER_READ \|\| TAPESTRY \|\| ORIEL` (`ch4.js:85`) → "Older than Law 6. The older binds." (`book.js:127`). Law 10; Law 4 (O, 340) | That COLD **may lawfully be written** — total, once the card flips | — | — | — | "Law 0 is back. It is older than Law 6, and the older binds." | **[CONTRADICTION] §4.3** — on the `ORIEL` route this happens because of a promise made in Chapter I, with no prose anywhere covering it |
| **Listener** | The memory-bell: Marrow to Vane, "Then the Crown will go through me. **And through it.**" (`companion/ch4.js:213`) | — | — | — | — | "She said 'and through it'. I don't know what 'it' is." | Wren fixates: "Through *it*. She said through it." (`ch4.js:524`). §12.45 — the chapter's strongest hook, unpaid |
| **Marrow** | — (she is away; back early "and does not say why", `ch4.js:607`, §12.44) | That an oath sworn to the Chair is what she needs; that the primer left open is what she can afford to give | As T0 | **The four:** are in her study finding her journal, her thread, her tapestry and her alphabet — **and she left the primer open.** Whether this is deliberate is never stated; **[PROPOSED]** it is, and it is her second directed, partial teaching after `ch2.js:189` | Everything on the stone. Also: she asks them to swear to see the child into the Cold *before* they have the carved reading — i.e. **she takes their oath on the Order's reading** | "Read it. **Argue.**" (`ch4.js:355`) | The oath is sworn under a reading that will be refuted two chapters later. **See §5.7** |
| **Vane** | — | — | — | — | — | "Ask your Seer." | Retroactively vindicated on screen, in absentia |
| **Oriel** *(branch `ORIEL`)* | — | — | — | — | Her note reaches them: "I scraped that paint myself, as a girl, with a bread-knife. **They painted it back inside the week.**" (`ch4.js:588`) | as above | The four learn the suppression is **current**, not historical — something Vane's 22-year-old grievance cannot tell them |
| **the players** | Four figures, no child; a name meaning *hollow* in the Provost's hand; a struck Law back in the Book | **Hypotheses to kill by now:** *Wren is the prophesied one* (weakening). **To keep alive:** *Wren is not a person*; *Marrow knows and is not saying*. **To kill at T8:** *Marrow is the villain* | — | — | — | — | — |

---

### T7 — ch5: Marrow says the plan aloud; Mere's gates; COLD written on a Founders' door

| | Knows (new) | Believes | Wrong about | Believes about others | Withholding | Would say if asked | Changed |
|---|---|---|---|---|---|---|---|
| **all four** | **Marrow's operating plan, stated flat:** "Under this school there is a wound. The Founders shut it and left the fire on top. / The fire is going out. **Tonight I take the child down and shut it again.**" (`ch5.js:249-250`) | That the Provost is executing the Order's reading — **certainty**, because she just said so | — | **Marrow:** *(two levels)* the four now believe the Provost believes the Order's reading; none of them suspects she holds the other one; and the Binder, holding a **restored Law 0** in the Book at the same moment, does not raise it | Whatever they found in ch2/ch4, from Marrow — nobody tells her anything all chapter | "She's going to send Wren in alone. That's the school's reading and she's the school." | The stakes of the mystery become operational: **the misreading is now a plan with a child in it** |
| **all four** *(branch `LAW0`)* | **That COLD can be written, physically, on a Founders' object.** The Silent Gate takes it: "You wrote the word nobody writes, and the gate took it." (`ch5.js:397`) | — | — | — | — | "The gate took the cold word. A Founders' gate took it." | **The four prove Law 0 works, on a four-hundred-year-old door, one chapter before the stone — and nobody, on any surface, connects it to the prophecy.** The single largest untapped beat in this mystery. §6.2 |
| **Marrow** | — | — | As T0 | — | Everything, still | "**That is not in the Book I was given.**" (`ch5.js:399`) | **[BEHAVIOUR] §5.8** — she performs surprise at a Law whose history she can recite two chapters later |
| **Wren** | — | — | — | **Marrow:** Wren now knows she is withholding *and* that she knows Wren knows nothing of the kind | Still the carved reading | "**It is in Mere's, apparently.**" (`ch5.js:400`) | Wren's one line on this mystery that is a *correction* rather than a deflection, and it is a joke |
| **Binder** | Law 5 (F) vs **Law 11 (O, 212)** — the second 212 override, same shape as Law 9. **Law 6 finally enters the Book** — the Law that Law 0's note has pointed at since the Prologue ("See Law 6", `lore.js:57`). Law 12 | That the Order's 212 legislation is a *pattern*: three Laws, each collapsing a Founders' two-case rule into one universal case | — | — | — | "Three Laws in one year and every one of them turns two cases into one. That is not tidying." | **The Binder can now derive the whole crime from the Book alone** — Laws 0/3/5/6/9/11 with dates. Nothing in ch5 asks them to |
| **Listener** | "In the Gallery the portraits showed **four going down the stair and four coming back**" (`companion/ch5.js:310`) | — | — | — | — | "Four went down and four came back. That's what the paintings show." | **The only evidence in the game that the walkers returned** — corroborating Mere's "who kept the fire, *after*" — and it is one line on one phone, never spoken (§12.15) |
| **all four** *(the stair `HOLD`)* | What losing a Sighting feels like — one named seat's gift goes out while the held thread has no anchor (`ch5.js:551-552`) | — | — | — | — | "It came back like blood into a numb hand." | **The Founders' price, rehearsed on one player, in advance, with no narration connecting it to the prophecy.** A free and missing line |
| **Vane** | — | — | — | — | — | — | "Then the Envoy can ask the stair." (`ch5.js:490`) — offstage |
| **the players** | Four thrones; a drowned First Hall; a Founders' count needing four; a gate that accepts the unwriteable word | **Kill by now:** *the Cold is weather*; *Marrow is lying about her aim*. **Keep alive:** *what does "four" keep meaning?* | — | — | — | — | Everything underground is four, and the prophecy says one. The player has all the arithmetic and no statement |

---

### T8 — ch6: the Bells, the Second Asking, **the stone read from its foot**, Law 0 restored

The reveal. This is the row that has to be right.

| | Knows (new) | Believes | Wrong about | Believes about others (nested) | Withholding | Would say if asked | Changed |
|---|---|---|---|---|---|---|---|
| **Reader** | **What the four burnt cuts were** — cut 1 a flame, 3 a crown, 5 a spike, 7 a crown — drawn on their side so the page cannot say which way up (`companion/ch6.js:199-205`) | That the burnt four are recoverable and the school's version cannot be checked without them | — | **The Seer:** holds the orientations and must be asked; the geometry of the page enforces it | Nothing — the whole seat is now a public utterance | "Cut one, a flame. Cut three, a crown. Cut five, a spike. Cut seven, a crown. Which way up isn't mine." | The Reader finally gets a page for the stone — **six chapters after being told they can read any worn carving** |
| **Seer** | **Which way each burnt chisel went in** — 1, 3, 5 point-up, 7 point-down (`companion/ch6.js:217-222`). That the fire has covered the foot "since the night it was lit" | That the stone was cut to be read one specific way and the school reads it the other — high | — | **The Binder:** holds what an inverted cut *means*; "What a cut struck that way says is not yours to know" | — | "One, three and five went in point-up. Seven points down. What that means isn't mine." | — |
| **Listener** | **The lap ends on a silence** (`companion/ch6.js:207-215`). And, from the Book since T0: **COLD is the one word with no note** (`book.js:91`; `glyphs.js:18`) | That the last word read is the silent one — certainty | — | — | — | "The lap stops on a silence. The Book says only one word has no note." | **The Listener's gift and Wren's silence are the same fact** (`glyphs.js:18`, `:29`), and the Listener is the person who proves the stone's last word is the unsayable one. **Nobody says this out loud, ever.** §6.3 |
| **Binder** | **Law 0 in three clauses** — "Read a line as the cuts count down. Every cut says its other word. COLD is written by four hands" — set against Law 6's three (`companion/ch6.js:232-233`). **The motive, in the Book:** "Four Masters, four Sightings. **The Convocation would not pay it. They struck the Law and called it grammar.**" (`companion/ch6.js:286`). And: "**same ink, same hand** · the older one binds" — a Year-0 Law and a Year-212 Law drawn as written by one hand (`companion/ch6.js:112-121`) | That 212 was a refusal to pay, dressed as grammar — certainty | — | **The other three:** have shapes, orientations and a lap end, and none of them knows *why* any of it was hidden | **Nothing deliberately — but structurally everything:** the motive is a `reveal` block on one phone behind "Read when the Hearth says the Book has turned a page." **The Hearth never states it.** §6.4 | "They could have paid it with four Masters' Sight. They wouldn't. So they struck the Law and called it grammar." | **The single most important sentence in the game reaches exactly one player, opt-in, and never reaches the shared screen** |
| **all four** | The reading: **KNOT · CROWN · ASH · WELL · VEIL · EMBER · ASH · COLD** → "Four, as one, go down with fire. What is kept stays behind. The fire is the hollow they left." Then the Hearth: "**Four went down. Not one born of four — four, as one. The fire is only what they left behind.**" (`ch6.js:827-828`, `:839`) | Everything. The mystery is closed | The count of what it cost: they have the *what*, and only the Binder has the *why* | **Marrow:** knew. She has just read it from the foot in front of them (on `STONE_TOLD`) or watched them do it | — | "Four, as one. Not one born of four. It was never one." | **T8 is the reveal, and it is earned** — four private facts, strictly partitioned, each necessary (`ch6.js:355-372`) |
| **Marrow** | Nothing new. **She has had all of it since before the game opened** | That a reading the four are *told* is worth less than one they make — and the mechanics agree with her: her own reading still opens the Walk but costs the night two minutes and is recorded forever (`ch6.js:814`, `:819`; `ch7.js:531`) | Her T0 error (four hands = four Masters) **survives T8 intact.** She reads the stone, confirms it says four, and still does not conclude that four *children* can write it — she needs to be argued into that at T9 | **The four:** *(two levels)* she believes they now know what she knows about the text, and does **not** know that the Binder alone has the motive, or that the Reader has had her handwriting on the roll since T6 | **Until the budget is spent: that she can read it at all.** Reason: *not protecting anyone — instrumental.* The Walk opens on their hands, not hers | "Four readings. Stop. Hands off it — **I have had four hundred years of this stone and you have had five minutes.**" (`ch6.js:822`) | **Her one admission all game that she can read the foot, and it arrives as a boast under duress.** §3 |
| **Marrow** *(the confession beat)* | That **Wren has known since the laundry** | — | — | **Wren:** her fourteen-year model of what Wren does and does not know is **corrected, by Wren, in one line** | She stops withholding the origin the moment Wren gives her leave — "She tells it kneeling, because the child gave her leave" (`ch6.js:690`) | "It came out of the fire the night the Hearth guttered. I picked it up. I named it. I raised it to be — loved enough to walk back in." (`ch6.js:691-692`) | The longest-running asymmetry in the game (T5→T8) closes, and **it closes because the person with less power grants permission to the person with more** |
| **Wren** | That the four now have the reading | — | — | **The four:** can now see what Wren has carried for years, and Wren is watching them arrive at it | **Still withholding the reading itself — through the whole puzzle.** §5.9 | "Then ask me a third time. **In there.**" (`ch6.js:855`) | Wren's withholding is now *costed in bells* and the game never charges it |
| **Vane, Oriel, the nine** | Nothing. None of them is present, and **none of them is ever told** | — | — | — | — | — | **The institutional half of the mystery is never corrected on any branch.** §5.11 |
| **the players** | Everything except the motive (unless the Binder reads it out) | — | — | — | — | — | The reveal lands. Whether it lands *politically* depends on one player opening one tab |

---

### T9 — ch7: Vane at the edge, the wall, the Decision, the Great Sigil, COLD by four hands

| | Knows (new) | Believes | Wrong about | Believes about others | Withholding | Would say if asked | Changed |
|---|---|---|---|---|---|---|---|
| **all four** | The **same four-figure image carved openly on the bell-chamber's own wall**, four hundred years old, never painted over (`ch7.js:303`; art `scenes-ch7.js:55-60`). **Wren's name is cut into the eighth socket**, in letters older than the alphabet (`ch7.js:699`; `companion/ch7.js:241`) | That Wren is the eighth glyph — and it is confirmed by Wren: "It's cold in here. Obviously. **It's me.**" (`ch7.js:697`) | — | **Marrow:** *(on `OATH_KNOT`)* is between them and the ring, demanding a reading rather than a feeling | — | "It is never written. That's the socket. That's Wren." | The reading stops being a text and becomes a floor plan |
| **Vane** *(branch `ch7_wall`)* | Nothing new — he has had it 22 years. **The four learn that he has** | That he will not be the reason they have to be brave | The text, still. He stands down on the *picture*, having never seen the sentence | **The four:** have just done, in one night, the thing that cost him his career | Nothing, any more | "Twenty-two years. I stood in your Hall with that paint under my nails and told them. **They sent me away to learn manners.**" (`ch7.js:341`) | **The one scene where Vane's knowledge state pays off — and it pays off by deleting him from the fiction** (`VANE_ALLY`, §12.32) |
| **Vane** *(no wall)* | — | That the Order's reading is operative and Wren is the asset | As above | — | — | "One child, and a fire that will be out within the hour." (`ch7.js:314`) | **He is never corrected on any non-wall branch, and the game lets him win on one** |
| **Marrow** *(branch `OATH_KNOT` only)* | Which of the four things they found they will *name* | That an oath sworn to the Chair on the Order's reading still binds — and she says so: "You swore under KNOT, and it cannot be unbound. **You swore to see Wren into the Cold.**" (`ch7.js:387`) | Her T0 error, finally, out loud — and she is argued out of it by four children in one exchange | **The four:** *(two levels)* she believes they believe she is obstructing them; she is in fact **examining** them, and never says so — **[PROPOSED]**, but it is the only reading under which "She steps aside anyway" is a character beat rather than a shrug | Everything she has already said to Wren, from the four — she never tells them she has known for decades | "The foot of the stone. **One Seer low enough to look.**" / "I scraped it myself, as a girl." / "**They could not afford four Masters, so they made it grammar.**" / "That is not a reading." — then: **"She steps aside anyway."** (`ch7.js:392-398`) | **The only place in the game where Marrow's knowledge of this mystery goes on the record — and it is gated on the ch4 oath lock.** §6.5 |
| **Marrow** *(EMBER, or unsworn)* | — | — | — | — | — | — | **`ch7_argue1` never fires.** She never says she scraped the paint, never says "they made it grammar", never acknowledges the foot of the stone. **The Provost's confession about the prophecy is gated behind a Chapter IV choice that has nothing to do with the prophecy.** §6.5 |
| **Wren** | — | That the four will choose the Order's road, because everyone always has | — | **The four:** do not need to be asked, and must not be | **That Wren wanted to be saved** — revealed only when it is too late to act on: "It is alright. **I knew. I wanted to hear what you would say.**" (`ch7.js:768`); "You *idiots*. **I had a *speech*.**" (`ch7.js:758`) | "Right. Good. That is what the stone says, and **I have had years to get used to it.**" (`ch7.js:404`) — *and note the ambiguity: with `WALK_UNLOCKED` always true by T9, "the stone" now has two readings and Wren does not say which.* §4.8 | The last withholding in the mystery, and it is the only one that is pure kindness |
| **Binder** | Law 8 ("a Great Sigil names every glyph once") + Law 7 (Idony's) | That eight glyphs and Law 8 **force** COLD into the Sigil — a derivation available from the tables alone (`lore.js:69`; `glyphs.js:16-29`) | — | — | — | "Every glyph once. There are eight. One of them is COLD." | The Laws finish the argument the prophecy started |
| **all four** *(climax)* | "**'COLD is written by four hands.' — Law 0. Restored.**" (`ch7.js:726`), then written, at architectural scale, warm-coloured, in the empty socket (`ch7.js:740`; art `scenes-ch7.js:125-126`) | — | — | — | — | — | **The reading is not merely understood; it is executed.** The 212 bill is paid |
| **the players** | The Great Sigil's eight-word sentence — **whose meaning is never printed.** It glosses "four-as-one, to close; a gate, a going-down; the Hearth, behind; the one, and the hollow" in a source comment only (`ch7.js:130`) | — | — | — | — | — | **[UNEARNED] in reverse** (§12.24): the table solves an eight-word sentence about themselves and Wren and is never told what it says, in the chapter after ch6 printed the Founders' reading from the glosses |

---

### T10 — ch8: the ending reached, and the epilogue

| | Final state on this mystery | Cite |
|---|---|---|
| **all four, every ending** | Hold the carved reading. Hold Law 0. Hold, if the Binder read it aloud, the motive | `ch6.js:827`; `companion/ch6.js:286` |
| **Wren, E0** | Acquires a pulse and a thread — "there wasn't a *me* on the other end to tie it to. **There is now**" — and the eighth glyph becomes a person | `ch8.js:290`; `companion/ch8.js:126` |
| **Wren, E2** | The Order's reading **comes true, because nobody disproved it in time**. One walks in; the Cold closes; a mason carves a fifth name beneath four names that mean the same thing — and **has to ask how to spell it, and the Reader does not offer** | `ch8.js:331-332`; §12.40 |
| **Wren, E3** | Inherits the Chair, and the habit: "Provost Wren of Thornhallow keeps a fire that flickers… and the fourth-years are told it is nothing." **The misreading acquires a new custodian** | `ch8.js:343-346` |
| **Wren, E4** | Caged. The Binder's card reads "**STRUCK, AGAIN — The Crown struck it. The Crown does not need Laws.**" | `companion/ch8.js:309` |
| **Marrow, E3** | Her last written advice is a confession about withholding: "Do not let that stop you listening — **I did, and it cost fourteen years.**" / "I should have asked you sooner. **I should have asked anyone. Ask, when you are me.**" | `companion/ch8.js:196-197` |
| **Marrow, E0 / E1 / E4** | **Not mentioned at all** — including on the ending that vindicates the reading she has held for decades and supersedes the fourteen-year plan built on the other one | §12.30 |
| **Vane, E0–E3** | **Not mentioned.** His twenty-two-year grievance is never resolved on four of five endings | §12.30 |
| **The Convocation, the Order, the nine, Oriel** | **Never told, on any ending.** Nobody corrects the record; the overpaint is not named as a forgery to anyone with standing; Oriel is never paid the price she bought at T3 (§12.58); the school goes on teaching the Order's translation on every branch including E0 | §12.30, §12.58 |
| **the school** | On every ending, the four-hundred-year-old lie survives the night that disproved it | — |
| **the narration** | "The eighth is the rest. **The rest is never carved.**" — the Epilogue restates **Law 6, the Order's, Year 212** as though it were the world's rule, one scene before the Binder's card celebrates its overturning | `ch8.js:493`, `:499`; **[CONTRADICTION] §4.2** |
| **the ledger** | "The stone and the Sigil. You read them back wrong **{n}** times" (+ "and Marrow read the stone for you" on `STONE_TOLD`) | `ch8.js:187-191` |
| **the players** | Know the truth. Know the motive only if one player opened one tab. Know that nothing in the world was fixed | — |

---

## 3. THE GAP THAT DRIVES THE DRAMA

### **Marrow ↔ the four, T3 → T9.**

Not Marrow ↔ Wren (both know by T5–T8, and the withholding there is affection, not conflict). Not
Wren ↔ the four (Wren's withholding is passive and the game never charges it). **Marrow ↔ the four**
is the productive pair because every element of a drivable asymmetry is present *and mechanised*:

1. **She has what they want and can supply it instantly.** Thirty seconds at the foot of the stone
   (`ch6.js:824`).
2. **She must not supply it**, and the game agrees: `WALK_UNLOCKED` and `LAW0` are written by
   *their* `onSolve` (`ch6.js:814`), and her reading it instead is recorded as a lesser state
   (`STONE_TOLD`), costs the Finale two minutes (`ch7.js:531`) and is printed in the ledger
   (`ch8.js:189`).
3. **Their failures cost her something she also needs.** Each wrong reading cracks a bell
   (`ch6.js:768`) — and a cracked bell mutes a Binding lane in the Finale (`ch7.js:641`). She is
   standing next to four children spending the equipment of her own Sealing on a text she could
   recite.
4. **She has an error they will correct.** Four hands ≠ four Masters. She is not merely withholding;
   she is *wrong*, in the specific way the Order made her wrong, and the correction comes from below.
5. **It resolves as a yielding, not a defeat.** "That is not a reading." / "**She steps aside
   anyway.**" (`ch7.js:397-398`).

**Scenes that currently exploit it**

| scene | how | cite |
|---|---|---|
| `ch2_vault` brief | "That vault was rebuilt once, and **the rebuilding was not honest**" — a complete sentence with three deliberate omissions (date, author, motive), all of which she has | `ch2.js:189` |
| `ch4_study` | She leaves her own primer open on the desk — the tool that lets the Reader read WRENN on her own roll | `ch4.js:328` |
| `ch5_gate2` | "That is not in the Book I was given." Her only reaction to COLD being written, and it is a deflection | `ch5.js:399` |
| `ch6_strip` | The reading budget; her four-hundred-years boast; `STONE_TOLD` | `ch6.js:709-825` |
| `ch6_open` | "And I read it, not you. That is two minutes you will want at the bottom. **Walk anyway.**" | `ch6.js:861` |
| `ch7_argue1` | The whole scene — she demands a reading and yields to all four answers including the non-answer | `ch7.js:380-399` |

**Scenes that could and do not** — ranked by value per line:

1. **`ch1_dais`.** "The stone over your heads says one born of four. **Tonight I stop arguing and show
   you.**" (`ch1.js:124`) — she quotes a reading she privately knows is a forgery, in the Chair, and
   then shows nothing (§12.42). One narration line — *she says it the way you say a thing you have
   stopped believing and not stopped using* — converts the game's opening institutional beat into
   the mystery's first plant, and makes §5.3 deliberate.
2. **`ch5_gate2`.** She watches four children write COLD on a Founders' door and says a line about
   bibliography. This is the one moment before T8 where she could say "and I know why it is not in my
   Book" and the scene would gain everything. The Silent Gate is also the last place the four could
   connect a written COLD to the stone, and nobody does. §6.2.
3. **`ch2_vault`.** She sends four children to a room she knows the Order rebuilt, in the year stamped
   on the wall they will walk past, and does not say the year. One clause.
4. **`ch7_argue1` on non-KNOT branches.** Her confession is unreachable on `OATH` EMBER and on
   `REFUSED_OATH`. See §6.5 — this is the highest-value branch fix in the mystery.
5. **`ch8`, endings 0, 1 and 4.** She is absent from the ending that vindicates her and destroys her
   plan simultaneously. One paragraph. §12.30.
6. **`ch4_study`, the primer.** Nothing says the open primer is a decision. **[PROPOSED]** one line
   from Wren — *"She never leaves that out"* — costs nine words and makes every later withholding
   read as pedagogy rather than secrecy.

**Runner-up gap: Vane ↔ Marrow, T3.** He has the picture, she has the sentence, each knows the other
has something, and neither ever says what. `ch1.js:138-139` is three lines long and is the best
scene in Chapter I. It is never revisited: they do not speak again until `ch7_wall`, where he stands
down to the Seer and not to her, and §12.23 notes that both scraped the same paint and neither ever
acknowledges the other.

---

## 4. WHERE THE GAME CONTRADICTS ITSELF ON WHO KNEW WHAT WHEN

### §4.1 "Nobody alive has read the cuts" — and two people have **[CONTRADICTION]**

> `ch0.js:62` — "**Nobody alive has read the cuts.** Every child here learns the school's translation,
> and every grown-up here argues about it."

against

> `ch6.js:824` — "She kneels at the foot, puts one thumb in the first burn, and **reads it the way the
> Founders cut it.**"
> `ch0.js:146` — Wren, of the Reader: "**Any carving, however worn.**"
> `lore.js:6` — "Inscriptions the Hearth shows faded are **clean on your page**."

Marrow is alive and reads the cuts. The Reader is alive and reads worn carvings professionally. The
game supplies a *physical* answer at T8 — four cuts are **burnt**, not worn (`scenes-ch6.js:7-10`) —
six chapters late, and it only covers four of the eight; the other four are explicitly public
(`ch6.js:343-345`). **The rest of the game depends on the burn.** Fix: one clause in `ch0_stone`
saying the stone is burnt rather than worn, and that burnt is not the Reader's problem to solve. This
is `CANON.md` §13.2, restated here because it lands squarely on *this* mystery's T0/T1 knowledge
states: as shipped, the Reader's T0 row cannot be written without contradicting one line or the
other.

### §4.2 The Epilogue restates the Order's Law as the world's **[CONTRADICTION]**

> `ch8.js:493` — "The eighth is the rest. **The rest is never carved.**" / `:499` — the eighth card,
> captioned "**never written**"

against

> `lore.js:57` — Law 0, Founders', Year 0: "**COLD is written by four hands.**"
> `ch6.js:827` — the Founders' own stone, whose eighth cut **is** COLD.
> `companion/ch8.js:309` — E0's Binder card: "**· WRITTEN — Tonight it was.**"

"COLD is never written" is **Law 6, the Order's, 212** — the sentence the Finale exists to overturn.
The Epilogue's summary restates it as cosmology one scene before the phone celebrates its overturning.
**The rest of the game depends on Law 0.** One word: *the Order said the rest is never carved.*

### §4.3 Law 0 is restored by a Chapter I promise **[CONTRADICTION]**

`ch4.js:85` — `Store.set('LAW0', !!(f.LETTER_READ || f.TAPESTRY || f.ORIEL))`, mirrored at `ch5.js:8`.
The file flags itself (`ch4.js:82-84`). `ORIEL` is the **ch1 promise**, not `ORIEL_NOTE`. So on that
route the Binder's Book flips a struck Founders' Law to RESTORED at T6 **because the four made a
promise to a Master in Chapter I**, without reading Mere's sheet, scraping the tapestry, or finding
Oriel's note. No prose covers it. For this mystery it is the worst possible causality: the Law whose
restoration *is* the answer arrives by a route with no epistemic content. The in-fiction repair is
nearly free — Oriel scraped the paint as a girl, so a promise to her can plausibly earn a note back —
but nothing says so.

### §4.4 The answer is given on the Hearth at T4 and the game forgets it **[CONTRADICTION]**

> `ch2.js:319` — "KNOT, CROWN, THORN — **four, as one, went through. Not one.** And the stone above
> the Hearth has said one born of four for four hundred years."

against `ch6.js:704` — "**Nobody has read it from under here**" — and `ch6.js:839` playing "Four went
down. Not one born of four" as a reveal.

`CH2_STRIP` is ch2-local and read nowhere (`CANON.md` Appendix A). A table that reads Mere's strip
from its mark is told the answer, on the shared screen, in Chapter II, and then walked through the
ch6 reveal as though it were new — while `companion/ch4.js:109` **assumes they saw it** ("the Hearth
said 'four, as one, went through' in Chapter II"), which a table that took the Ember and left never
did (§13.32). The strip is either the best breadcrumb in the game or a spoiler, and the game treats
it as both. **Recommended ruling [PROPOSED]:** keep `CH2_STRIP='right'` and have ch6 acknowledge it
in one swapped clause — *"You said this in the vault. Now say it with all eight."* — which converts
a repeat into a payoff and costs nothing.

### §4.5 The prophecy question is asked at T5 and a different question is re-asked at T8 **[CONTRADICTION]**

> ch3 laundry, Binder: "Do you think **I'm really the one**?" — `companion/ch3.js:294`
> ch6 Second Asking, Binder: "You see the threads. **Do I have one?**" — `ch6.js:673`

while `ch6_held` frames the Asking as *the same four questions*: "In the laundry I asked each of you
one question about me… **I am asking again.**" (`ch6.js:632-633`). The other three do repeat. The one
that does not is **the only one that is about the prophecy**, and the chapter papers it over with a
pun ("You said yes, to the one person with none.", `ch6.js:332`). The T5→T8 arc of the mystery's
central question is therefore broken at exactly the beat that was built to close it.

### §4.6 When the Reader decided they had misread the name **[CONTRADICTION]**

> `companion/ch4.js:205` — "You decided, **a year ago**, that it was **a spelling mistake**. You have
> never asked her."
> `companion/ch7.js:241` — "You decided, **in the study**, that **you had misread it**. You have never
> misread anything in your life."

Different time, different object, different accusation — and for this mystery it matters, because the
Reader's belief state about *the Provost's version of the name* is the Reader's only stake in the
prophecy before T8. ch7's is the one that makes the Reader's self-image the point; ch4's is the one
that dates the chalk. They cannot both stand.

### §4.7 Six of the nine have no state at all **[WITHHOLDING]**

`ch0.js:242` asserts every Master has a Sighting; `ch1.js:255` defines the Convocation as "the nine of
us"; the nine sit in a Hall under the stone every day of their lives. **The game never establishes
whether any Master besides Marrow and Oriel believes the school's translation, doubts it, or has ever
thought about it.** Six are never named. On `VOTE_LOST`, Sorrel and Oriel are never named either
(`ch1.js:254`, `:256` are win-path only), so **a losing table finishes Chapter I knowing no Master's
name but Marrow's** and Oriel's independent knowledge of the cover-up becomes unreachable. The body
that committed the crime in 212 is present, on stage, for a whole chapter, and has no opinion.

### §4.8 "That is what the stone says" — which stone?

`ch7.js:404`, on the `DECISION='WALK'` branch. `WALK_UNLOCKED` is **always true by T9** in a linear
playthrough (`ch6_strip.onSolve` sets it unconditionally, `ch6.js:814`, and `ch6_strip` is the only
edge from ch6 to ch7, `ch6.js:450-451`). So at the moment Wren says this, both readings are on the
table and Wren does not say which one is meant. Under the Order's reading it is resignation; under the
carved one it is "and I have known for years that it says four, and you are still choosing one."
`CANON.md` §9.1 takes the second. **Needs an author ruling** — it is the only line that dates Wren's
knowledge of the carved reading, and the whole of Wren's T0–T8 withholding column rests on it.

**Dead branch, worth knowing:** `ch7.js:369` ships an else-clause for `!WALK_UNLOCKED` — "One walks
in, and the Cold closes behind. **That is the reading you have.**" — which is the best single line
about the mystery in Chapter VII and **is unreachable in normal play.**

---

## 5. WHERE BEHAVIOUR DOES NOT MATCH THE KNOWLEDGE STATE

### §5.1 The Reader, T0–T7: a professional reader of worn carvings who has never looked at the stone

The Reader can read any worn carving (`ch0.js:146`; `lore.js:6`), has lived under the stone for seven
years, and is given **no page for it until ch6** (`companion/ch6.js:199`). Four of the eight cuts are
unburnt and visible to the room the whole time (`ch6.js:343-345`). The in-fiction consequence is not
small: those four unburnt cuts contain **the Flame inverted, twice** (`ch6.js:399`) — i.e. the
Founders cut COLD, in public, above the fire, and the Order's Law says COLD is never written. **The
Reader is the one person who could have noticed this at any point in fourteen years.** As shipped the
silence is mechanical (§7.6's partition), not diegetic. **[WITHHOLDING]** — and the fix is the same
clause that fixes §4.1.

### §5.2 The Seer, T0–T6: a seat that sees under paint, in a school that hangs one painting in every hall

"The picture this school hangs in **every hall**" (`ch4.js:533`; `scenes-ch4.js:65-75`). The Seer's
gift is explicitly "what paint covers" (`lore.js:8`). Seven years, every hall, never once looked. The
game never remarks on it, and at T3 it takes **an enemy** to suggest it (`ch1.js:283`). One line
**[PROPOSED]** — the Seer has looked, once, as a child, and was told not to; or nobody ever told the
Seer that looking was a thing you could choose to do — turns an oversight into characterisation and
gives Oriel's bread-knife a peer.

### §5.3 Marrow, T3: quotes the forgery in the Chair and the game does not mark it

"**The stone over your heads says one born of four.** Tonight I stop arguing and show you."
(`ch1.js:124`) — spoken by the one person in the room who can read the foot (`ch6.js:824`) and who
knows the translation is 212's cover story (`ch7.js:396`). Defensible as tactics — she is using the
reading the room accepts to legitimise keeping Wren — but **nothing in the text, the narration, the
art or any phone flags it as a choice**, and she then shows nothing (§12.42). As shipped, the
protagonist's largest act of institutional deception is indistinguishable from sincerity.

### §5.4 Vane, T3–T9: acts on the reading he has spent twenty-two years calling a lie

He has known since ≈Year 378 that the picture is four and no child (`ch7.js:341`). He then spends
the night trying to buy **the one child** the disproved reading singles out, and frames it as
"safekeeping" (`ch1.js:136`). The reconciliation the fiction wants is that his target is the Cold and
not the prophecy — "The Crown will have the Cold open, one way or another" (`companion/ch4.js:213`) —
but **no line ever says Wren is the key to the Cold independently of the prophecy**, and §12.32 flags
that the Crown's interest in Wren specifically is never motivated. **One line in `ch1_offer`
[PROPOSED]:** *"I do not want your prophecy. I want the thing it is standing in front of."* — which
costs nothing, motivates the Crown, and makes him the only character in the game who is right about
the reading and indifferent to it.

### §5.5 The Binder, T4–T7: solves the mystery's grammar four times and never applies it

By T7 the Binder has, in the Book, with dates: **Law 0** (F, 0, struck 212), **Law 3** ("the older
binds", F, 0), **Law 9** (O, 212, beaten by Law 13 at T4 *with their own hands*), **Law 11** (O, 212,
beaten by Law 5 at T7), and **Law 6** (O, 212 — the Law that Law 0's own note has pointed at since the
Prologue, `lore.js:57`). That is the complete syllogism, twice demonstrated, sorted by year on their
own Book tab (`book.js:129-130`). **Nothing ever asks them to look.** `LAW0` flips at T6 on flags
(`ch4.js:85`) rather than on an act of reasoning, and the Binder's own "A Law that is merely wrong is
forgotten. A Law that is *inconvenient* is **struck**" — the sentence that names the whole crime —
does not appear until `companion/ch6.js:236`, at T8, **after** the answer.

**[PROPOSED], highest value in this section:** move that sentence, or a version of it, to the
Binder's ch5 page, where Law 6 arrives and Law 11 has just lost to Law 5. The Binder would then walk
into the bell-chamber holding the *motive* and needing only the *text* — which is exactly the
knowledge shape the ch6 puzzle is built to reward.

### §5.6 Wren, T4: stands in the antechamber while the four read Mere's strip and says nothing

`ch2_niche` (`ch2.js:296-330`) with Wren present from `ch2.js:358` onward — Wren follows them down and
is in the vault for the Ember. A character established as knowing the carved reading for years
(`ch7.js:404`) watches four people read a three-shape corroboration of it and offers neither
confirmation nor deflection. The niche is optional and Wren's arrival is scripted after it, which
partly covers it; the ordering should be checked and, if they co-occur, one Wren line is owed.

### §5.7 Marrow, T6: takes an oath on a reading she knows is false

The four swear, to her Chair, "to see Wren into the Cold" (`ch7.js:387`; scroll `ch4.js:610`, `:624`)
— the Order's reading, in oath form, sworn by children to the one adult present who knows it is 212's
substitution. She then uses that oath at T9 to **bar the Walk** (`ch7.js:387`). The scene plays as a
test she wants them to pass, but **she never acknowledges that she obtained the oath under the wrong
reading**, and her Epilogue advice — "**Swear the next one to a person**" (`companion/ch8.js:198`) —
addresses the *recipient* of the oath and not its *premise*, which is the larger of the two faults.

### §5.8 Marrow, T7: performs surprise at a Law whose history she can recite

> `ch5.js:399` — "**That is not in the Book I was given.**"

against `ch7.js:396` — "**They could not afford four Masters, so they made it grammar**" — and
`ch6.js:824`, where she reads a stone whose eighth cut is COLD and therefore requires Law 0's third
clause. She cannot be surprised at T7 by a rule she demonstrably holds at T8 and T9. The line is
salvageable as *bitter* rather than *startled* — "not in the Book **I was given**" is already an
accusation about who gave it to her — but nothing in the staging says so, and Wren's reply ("It is in
Mere's, apparently", `ch5.js:400`) plays it as news. **One stage direction fixes it.**

### §5.9 Wren, T8: withholds the reading while the four crack bells getting it

This is the sharpest one. At `ch6_strip` the four spend up to **four readings**, each wrong one
cracking a bell (`ch6.js:768`), in a room where Wren is standing, thirty seconds after Wren has said
"**I would rather have had the true one**" (`ch6.js:320`) and given Marrow leave to confess
(`ch6.js:689`). Wren is the game's protocol coach — "Has everybody actually said their bit?" appears
in six chapters, including inside this puzzle's own failure text (`ch6.js:781`) — and intervenes with
process every single time and with content never. Against the established character (truth over
kindness; tracks precisely what the four have learned, `ch6.js:663`) **Wren's silence here is not
motivated by anything the game has established.**

Three repairs, cheapest first **[PROPOSED]**:
1. One line before the puzzle — *"I know what it says. You need to be the ones who read it, or she wins."* — which converts silence into complicity with Marrow's method and costs nothing mechanically.
2. Establish that Wren has the *sense* and not the *text* — Wren has always known the stone was about Wren and has never been able to read a cut (Wren is not a Sighting-holder). This is nearly free and it makes `ch7.js:404` ("what the stone says") mean the Order's reading, which cleanly resolves §4.8 in the other direction.
3. Have Wren visibly stop themself once, and have the narration note it.

Option 2 is the cheapest and the strongest, and the author should rule between it and `CANON.md`
§9.1, which currently asserts the opposite.

### §5.10 Marrow, T8: charges the four a bell per wrong reading and does not name the price until after

The brief card says it (`ch6.js:788-790`) but **Marrow does not**, and she is the person who
elsewhere de-escalates before a puzzle in exactly this way — "Miss it and the Cold pushes further.
**That is all that happens.**" (`ch6.js:488`), which `CANON.md` calls her one wholly honest framing of
the night. She gives the honest framing to the bells, which are reflexes, and withholds it from the
stone, which is the mystery. Inconsistent with `ch6.js:488` and fixable by moving one clause into her
mouth.

### §5.11 Everybody, T10: nobody tells anybody

Four children and a Provost prove, under the school, that the institution's founding text has been
mistranslated for four hundred years as the cover for a refused bill — and on **every** ending
the record is never corrected, the Convocation never hears, the overpaint is never named to anyone
with standing, Oriel is never paid the price she bought at T3 (§12.58), and the school goes on
teaching the Order's translation. On E0 the four cannot even read the stone any more
(`ch8.js:287`: "The Reader looks at the stone and sees shapes"). This is coherent as tragedy and the
game does not appear to intend it as one. §12.30.

---

## 6. FIVE PLACES THE ASYMMETRY IS SITTING UNUSED

| # | where | what is already there | what one line would buy |
|---|---|---|---|
| **6.1** | T2, `ch0_carve` | Carving **WREN** into brass makes a four-hundred-year-old lamp **flare blue** (`ch0.js:169`) — blue is the Cold's palette (`scenes-ch0.js:7`) — and the lamp then needs **four hands** to light (`ch0.js:88`) | The prophecy's number and the prophecy's subject are both demonstrated in the Prologue, on a lamp, and neither is remarked on. One Wren deflection — *"Huh. It doesn't do that for other names."* — makes T2 the mystery's first plant instead of its first accident (§12.47) |
| **6.2** | T7, `ch5_gate2` | The four write **COLD** on a Founders' door and it opens (`ch5.js:397`) | Nobody — not Marrow, not Wren, not the Binder whose Law it is — says *"then the stone can have it too."* This is the last beat before the reveal and the only one where the four could reach it themselves |
| **6.3** | T8, the Listener | **COLD is the one glyph with no note** (`glyphs.js:18`, `:29`; `book.js:91`) and the lap ends on a silence (`companion/ch6.js:213`). Wren cannot be heard (`companion/ch0.js:112`) | The Listener proves the stone's last word is the unsayable one **in the same chapter** that they confirm they have never heard Wren's heart, and **nobody joins the two**. One line of the Listener's Wren tab — *the word the stone ends on and the person you cannot hear make the same sound* — is the best free payoff in the game |
| **6.4** | T8, the Binder's Book | "**The Convocation would not pay it. They struck the Law and called it grammar**" (`companion/ch6.js:286`) | **The motive for the entire mystery exists on one phone, behind an opt-in `reveal` block, and is never said on the shared screen.** The Hearth says *what* the stone says (`ch6.js:839`) and why the fire is dying (`ch6.js:850`) and never why the reading was changed. A table whose Binder does not open the tab finishes the game without the answer to the question the game is about |
| **6.5** | T9, `ch7_argue1` | Marrow's only on-record statements about the cover-up — the foot of the stone, "I scraped it myself, as a girl", "they could not afford four Masters, so they made it grammar" (`ch7.js:392-396`) | **Gated on `OATH_KNOT`** (`ch7.js:375`). On an EMBER lock or an unsworn table the scene never fires and the Provost never once, in nine chapters, says what she knows about the prophecy. The fix is to give the non-KNOT branches a shorter version of the same exchange — she has no standing to bar the Walk, but she can still be asked |

---

## 7. BRANCH SENSITIVITY

**How much of this mystery is branch-dependent:** the *answer* is not (it is delivered unconditionally
at T8), but **who reaches it early, who states the motive, and whether any adult ever admits to it**
are all flag-dependent, and the swings are large.

| flag | set at | what it changes in this table |
|---|---|---|
| **`CH2_STRIP`** `'right'` | `ch2.js:319` | **T4:** all four learn the answer on the Hearth, four chapters early. Written and **read nowhere** — every downstream row is identical to a table that never opened the niche. `'left'` gives the *defect* ("the mark on this stone is at the other end") which is arguably the better clue. §4.4 |
| **`CH2_NICHE` / `LETTER`** | `ch2.js:324` | **T6:** `LETTER_READ` → Mere's sheet translated → the Reader holds a Founder's own first-person "four hands" → `LAW0`. The niche is also the only place **Mere is named** (`ch2.js:301`) |
| **`TAPESTRY`** | `ch4.js:554` | **T6:** the count is refuted **on the Hearth, in front of everybody** (`ch4.js:557-558`), Vane is vindicated on screen, and Wren asks "Where is the one born of four? **Where am I?**". → `LAW0`. **T9:** unlocks the `tapestry` option in `ch7_argue1` (→ Marrow's "I scraped it myself, as a girl") and changes `ch7_wall`'s first line. **Without it the count is never publicly refuted before T8** |
| **`ORIEL`** (the ch1 promise) | `ch1.js:266` | **T6:** Oriel's note — the only evidence that the suppression is **current** — and, by itself, **restores Law 0** with no prose (§4.3). On `VOTE_LOST` Oriel is never named and this is unreachable |
| **`SORREL`** | `ch1.js:261` | Buys the Ember for the nine; **contributes nothing to this mystery** and forfeits Oriel's note. The only branch where the four back the Master who wants the object over the Master who wants the truth |
| **`VOTE_LOST`** | `ch1.js:212` | **Sorrel and Oriel are never named** (`ch1.js:254-256` are win-path only) → `ORIEL`/`SORREL` unreachable, `NEITHER` forced (`ch1.js:275`) → Marrow's unsent letter ("the thing I have never named to you") becomes the only Chapter IV chair find. §4.7 |
| **`VANE_ACCEPT`** | `ch1.js:292` | Suppresses Marrow's letter; the Binder is told the four are themselves bought (`companion/ch3.js:236`). Does not change what anyone knows about the stone |
| **`LAW0`** | `ch4.js:85`, `ch5.js:8`, `ch6.js:814` | **T7:** the Silent Gate's cold slot may be written (§6.2). **T9:** COLD becomes placeable in the Great Sigil. Reached by three unrelated routes, one of which is a Chapter I promise |
| **`WHISPER_reader`** | `ch3.js` | `TELL` = the Reader bluffs "a small brave bird" — **probably a quotation of the Provost's version** (§12.28). If the author rules that it is, the bluff becomes the Reader unknowingly repeating Marrow's lie to Wren's face, which is the best unclaimed beat in Chapter III |
| **`WHISPER_binder`** | `ch3.js` | `DONTKNOW` (the truth) vs `YES`. The prophecy question, answered. Note `lore.js:44` is canonical and `ch6.js:327`'s `ECHO` disagrees for this one role — §13.21 — so a Binder who told the truth is scored untruthful by ch8 |
| **`STONE_MISREAD` 0–n** | `ch6.js:766` | Bells cracked; printed in the ledger (`ch8.js:187`). The mystery is the only puzzle in the game whose **wrong answers are permanently on the record** |
| **`STONE_TOLD`** | `ch6.js:815` | **Marrow reads the stone instead of the four.** Changes her line at `ch6.js:861`, relabels the flow node ("The stone, **read to you**", `ch6.js:444`), costs the Finale two minutes (`ch7.js:531`), and changes the ch8 ledger line. **It does not change what anybody knows** — only whose the knowing is, which is precisely §3's gap, mechanised |
| **`WALK_UNLOCKED`** | `ch6.js:814` | **Always true after ch6 in linear play.** `ch7.js:369`'s `!WALK_UNLOCKED` line — "That is the reading you have" — is the best sentence about the mystery in the Finale and is unreachable. §4.8 |
| **`OATH_KNOT`** | `ch4.js:735` | **Gates Marrow's only confession about the cover-up** (`ch7_argue1`, `ch7.js:375`). On EMBER, `REFUSED_OATH`, or `OATH 0`, she never says it. §6.5. Note §13.16: a *failed* closing is flag-identical to a refusal, so "the wax went cold" and "we said no to the Provost" produce the same epistemic state from T7 onward |
| **`VANE_ALLY`** | `ch7.js:332` | The Seer shows him the wall; he stands down; **his twenty-two years finally land** — and he is then deleted from the fiction (§12.32). The only branch where any adult outside the party is told anything, and it removes him |
| **`ENDING`** | `ch7.js:239-247` | **E0:** Law 0 **WRITTEN** — the carved reading enacted, the 212 bill paid (`companion/ch8.js:309`). **E2:** the Order's reading **comes true** because nobody disproved it in time. **E3:** the 212 answer run again — one Warden down, alone — with better motives, and Wren inherits the habit of telling the fourth-years it is nothing. **E4:** Law 0 **STRUCK, AGAIN**, by a body that does not need Laws. **E1:** the glyph written "thinner than it was meant to be" |

**Branch-invariant, and worth stating plainly:** on every branch of every playthrough, (a) the four
reach the carved reading at T8; (b) the motive reaches at most one player, on a phone, opt-in; (c) no
Master, no Convocation and no part of the school outside the party is ever told; (d) the Order's
translation is still what the school teaches at dawn.

---

## 8. BREADCRUMB LEDGER — every piece of evidence on this mystery, in order

| T | surface | evidence | reaches |
|---|---|---|---|
| T0 | Binder's Book | Law 0, struck, dated 212, "See Law 6" (`lore.js:57`) | one seat |
| T0 | Binder's Book | "Founders' (Year 0) or Order's (212 or 340)" (`book.js:122`) | one seat |
| T0 | Listener's Book | COLD is the rest, no step (`book.js:91`) | one seat |
| T1 | **Hearth art** | caption **"THE ORDER'S READING"** (`scenes-ch0.js:78`) | the table |
| T1 | Hearth prose | "Nobody agrees what the rest of it means. Everybody agrees who it is about." (`ch0.js:66`) | the table |
| T2 | Hearth | four hands light the lamp (`ch0.js:88`, `:203`); **WREN flares blue** (`ch0.js:169`) | the table |
| T3 | Hearth | Vane: "I have seen what is under the paint" + "Her face does" (`ch1.js:138-139`) | the table |
| T3 | Hearth | Vane: "**Ask your Seer** what is under the paint" (`ch1.js:283`) | the table |
| T3 | Hearth | Marrow looks at Wren, not the fire (`ch1.js:147-148`); Wren points the Seer at the wall (`ch1.js:306`) | the table |
| T3 | Listener's phone | Marrow's heart **skipped twice**, looking at Wren (`companion/ch1.js:118`) | one seat |
| T4 | Hearth / art | the bricked road, stamped **212** (`ch2.js:346`; `scenes-ch2.js:100`) | the table |
| T4 | Hearth | "that vault was rebuilt once, and **the rebuilding was not honest**" (`ch2.js:189`) | the table |
| T4 | puzzle | Law 13 (F) **beats** Law 9 (O, 212) under Law 3 — with their own hands | the table |
| T4 | Seer / Binder | four plinths in a derangement; four names effaced (`companion/ch2.js:141-142`, `:157`) | two seats |
| T4 | Hearth, **optional** | **"four, as one, went through. Not one"** (`ch2.js:319`) | the table |
| T4 | Hearth, optional | **Mere**, named, on the back of plinth 1 (`ch2.js:301`) | the table |
| T5 | Listener | portraits mutter "***four went down***" (`ch3.js:440`) | one seat |
| T5 | Reader, sealed | "Properly. **Not the Provost's version**" (`companion/ch3.js:284`) | one seat |
| T5 | Binder, sealed | "**Do you think I'm really the one?**" — truth: *I don't know* (`companion/ch3.js:294`) | one seat |
| T6 | Hearth, branch | **four walk in, no child**; "So he had." (`ch4.js:557`); "Where am I?" (`:558`) | the table |
| T6 | Reader | **WRENN = the hollow of a bell**, in Marrow's own hand (`companion/ch4.js:202-204`) | one seat |
| T6 | Reader, branch | **Mere's sheet** — "we wrote the cold glyph with four hands" (`companion/ch4.js:62`) | one seat |
| T6 | Binder | Law 0 → **RESTORED**, "Older than Law 6. The older binds." (`book.js:127`) | one seat |
| T6 | Hearth, branch | Oriel: "They painted it back **inside the week**" (`ch4.js:588`) | the table |
| T7 | Hearth | "Tonight I take the child down and shut it again" (`ch5.js:250`) | the table |
| T7 | Hearth, branch `LAW0` | **COLD written on a Founders' door, and it opens** (`ch5.js:397`) | the table |
| T7 | Binder | Law 5 (F) beats Law 11 (O, 212); **Law 6 finally arrives** | one seat |
| T7 | Listener | portraits: "four going down the stair and **four coming back**" (`companion/ch5.js:310`) | one seat |
| T7 | Hearth / art | four thrones; five arches; the Founders' Count needs four (`ch5.js:347`, `:480`) | the table |
| **T8** | four phones | the four partitioned facts (`companion/ch6.js:199-238`) | one seat each |
| **T8** | Hearth | **the reading, and "Four went down. Not one born of four."** (`ch6.js:827`, `:839`) | the table |
| **T8** | Binder's Book | **the motive** (`companion/ch6.js:286-287`) | one seat, opt-in |
| T9 | Hearth / art | the same four figures **carved openly** on the chamber wall (`ch7.js:303`) | the table |
| T9 | Hearth | **Wren's name in the eighth socket** (`ch7.js:699`); "It's me." (`:697`) | the table |
| T9 | Hearth, branch `OATH_KNOT` | Marrow's three admissions (`ch7.js:392-396`) | the table |
| T9 | Hearth | "'**COLD is written by four hands.**' — Law 0. **Restored.**" (`ch7.js:726`) | the table |
| T10 | Hearth | the eighth card: COLD, captioned **WREN / never written** (`ch8.js:499`) | the table |

**Count:** 38 pieces of evidence. **17 reach only one seat.** Of the four that carry the *motive*
rather than the *fact*, **three are on one phone** (`companion/ch6.js:286-287`, `:112-121`,
`book.js:127`) and the fourth is gated on an unrelated Chapter IV choice (`ch7.js:396`). That
distribution is the mystery's single biggest structural risk: **a table can finish this game knowing
exactly what the stone says and never learning why anybody changed it.**
