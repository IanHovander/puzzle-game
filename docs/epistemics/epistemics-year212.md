# EPISTEMICS — **What happened in 212**

> ## ⚠ TOTAL SPOILERS
> Working document for the author. Contains every reveal, all five endings, and the answer to the
> game's central political mystery. Do not show a player or a host.

**Scope.** One mystery: *the struck Law, the bricked road, the painted wall* — what the Convocation
did in Year 212 and why. Ground truth for it lives in `CANON.md` §7.3. This document is **belief
only**: who knows it, who half-knows it, who is wrong about it, what each thinks the others know, and
what each is not saying. Truth appears here only as the yardstick a belief is measured against.

Companion documents: `CANON.md` (what is true), `PLAYER-MODEL.md` (what the reader is led to think).

---

## 0. THE MYSTERY, DECOMPOSED

Every cell below refers to these by number. They are separable: a character can hold P8 and none of
the others, and most do.

| # | proposition | ground truth | where it is knowable in-game |
|---|---|---|---|
| **P1** | In Year 212 the Founders' seal failed | `companion/ch6.js:287` | Binder's Book, opt-in, T8 only |
| **P2** | Renewing it cost **four Masters their Sight** | `companion/ch6.js:287` | same |
| **P3** | **The Convocation would not pay it** | `companion/ch6.js:286` | same |
| **P4** | It **struck Law 0** and "called it grammar"; wrote **Law 6** in its place | `lore.js:57`, `:67` | Binder's Book, **from T1**; Sight tab T8 |
| **P5** | It **sent one Warden down alone** | `companion/ch6.js:287` | Binder's Book, opt-in, T8 only |
| **P6** | It **rebuilt the antechamber** — new floor, four plinths in a derangement, names effaced | `ch2.js:209`, `:301`; `companion/ch2.js:141-142`, `:157` | Seer + Binder phones, T4; Hearth says "newer", not why |
| **P7** | It **bricked the Founders' road** and stamped **212** beside it | `ch2.js:346`; `js/art/scenes-ch2.js:100` | Hearth **art only**, T4 |
| **P8** | It **overpainted the tapestry** — four figures with shadows become one child with none — and hangs the copy **in every hall**, and **repaints it** | `js/art/scenes-ch4.js:44-76`; `ch4.js:533`, `:588` | Hearth, T6, branch `TAPESTRY`; maintenance only on `ORIEL` |
| **P9** | It **taught the school its translation**: *one born of four* on a stone that says *four, as one* | `lore.js:75`; art caption `scenes-ch0.js:78`; `ch6.js:827` | Hearth T1 (as "the school's translation"); disproved T8 |
| **P10** | **Motive: cost-avoidance dressed as grammar** | `ch7.js:396`; `companion/ch6.js:286` | Marrow's mouth, T9, **double-gated** (see §4) |
| **P11** | Laws 9 and 11 are the same move in the same year — two Founders' cases collapsed to one universal case | `lore.js:62`, `:66` vs `:61`, `:65` | derivable on the Binder's phone T4 + T7; **nothing prompts it** |

**The one number nobody says.** `212` is never spoken by any character on any branch. It exists on
the Hearth as a *carved numeral in the art* (`scenes-ch2.js:100`) and nowhere else; everywhere else it
is phone-side — `lore.js:57`, `:62`, `:66`, `:67`; `companion/ch2.js:59`, `:157`;
`companion/ch5.js:128`, `:182`, `:185`, `:206`; `companion/ch6.js:115`, `:232-233`. Verified by grep
over `js/`. **Consequence for every table below: no character can be shown to know the date. Every
belief about *when* is a phone perception, private to one seat.** [WITHHOLDING]

### Cast with a stake, and notation

W = Wren · M = Provost Marrow · V = Lord Vane · R/L/S/B = Reader / Listener / Seer / Binder ·
O = Master Oriel (seat 7) · Sr = Master Sorrel (seat 1) · C = the Convocation as a body (the seven
Masters who are not Marrow or Oriel) · *Mere* = the Founder, acting through two documents.

`M→B` = what Marrow believes about the Binder. `M→B→M` = what Marrow believes the Binder believes
about Marrow. Cells marked **[PROPOSED]** are my inference; everything else carries a citation.

---

## T0 — before play

| | **Knows** | **Believes (confidence)** | **Wrong about** | **Believes about others** | **Withholding** | **Would say if asked** | **Changed** |
|---|---|---|---|---|---|---|---|
| **Wren** | Nothing of P1–P8, P10–P11. Knows P9 *as the school teaches it*, and that adults argue about it (`ch0.js:62`). Knows Mere left a door on the stair "for people who were not asked" (`ch5.js:287` — held now, spoken T7; §12.29 does not say how) | That the stone is about Wren and is probably true of Wren — "That is what the stone says, and **I have had years to get used to it**" (`ch7.js:404`). High confidence, long-standing | **That the stone says *one born of four*.** It says *four, as one* (`ch6.js:827`). Wren believes it because the school taught it and because it is the only story that accounts for Wren | W→M: she knows more about me than she says. W→M→W: *she thinks I do not know what I am* — and at T0 that is true of Wren too. W→the four: each has noticed one impossible thing about me and told nobody (`ch0.js:226`) | From the four: that Wren has known all four of their secrets for years (`ch0.js:226`). Reason: **not having words for it**, and not wanting to be the one who makes them say it | "The stone's about me. That bit everyone agrees on. Nobody agrees on the rest, which is a comfort if you squint." | — |
| **Marrow** | **P8** — scraped it herself as a girl (`ch7.js:394`). **P6** — "that vault was rebuilt once, and **the rebuilding was not honest**" (`ch2.js:189`). **P10** — "They could not afford four Masters, so they made it grammar" (`ch7.js:396`). **P9 as falsehood** — she can read the stone from its foot (`ch6.js:824`) | [PROPOSED] That today's nine would decide in her lifetime exactly as the nine decided in 212 — which is why she has **never named the thing below to them** (`ch4.js:592`) | **That no surviving book contains Law 0** — "That is not in the Book I was given" (`ch5.js:399`). It is in the Binder's, struck and dated, and has been since the Prologue (`lore.js:57`) | M→C: the nine do not know what is below and must not (`ch4.js:592`). M→V: he knows the paint and will spend it (`ch1.js:138`). M→V→M: *he thinks I will fold if the Hall hears it*. M→W: the child does not know what it is | From the nine: the wound, and all of P1–P10 (`ch4.js:592`) — reason: **protecting the plan**, on the assumption they would refuse again. From Wren: Wren's origin — **protecting Wren**, and having no alternative to offer | "The vault was rebuilt once, and the rebuilding was not honest. That is all you need from me tonight." | — |
| **Vane** | **P8**, for twenty-two years (`ch7.js:341`). That he told the Convocation and was exiled for it (same line). That **the Seer** is the seat that can confirm it (`ch1.js:283`) | That Marrow knows P8 too, and that the knowledge is a personal lever on her (`ch1.js:138`). High | [PROPOSED] Nothing in this mystery — the narration explicitly ratifies him: "**So he had**" (`ch4.js:557`). Arguably wrong that the Hall has forgotten; he told them himself | V→M: she knows. V→M→V: *she knows I know, and knows I will say it in front of the nine*. V→C: they buried it once and will bury it again. **V→O: not modelled anywhere** — he has no idea seat 7 took a bread-knife to the same paint | The Crown's actual aim (`companion/ch4.js:213`) and that his grievance is **personal, not political** — withheld until T9 and only on `FINALE_WALL='wall'`. Reason: **protecting himself**; a grievance is a weakness in an envoy | "I have seen what is under the paint. I said so once, in that Hall. The Hall preferred the paint." | — |
| **Reader** | Nothing of 212 | Believes the school's translation is the translation, because every child is taught it (`ch0.js:62`) | Believes their own gift cannot touch the stone — the game will tell them "nobody alive has read the cuts" at T1 and contradict it fifteen lines later (§13.2) | R→the other three: they have not noticed anything strange. R→W: somebody is being funny about the name (`companion/ch0.js:99`) | The chalked name. Reason: **assuming it is already known / trivial** — "you decided somebody was being funny. You have never asked who" | "The school's translation. Everyone's is the school's." | — |
| **Listener** | Nothing of 212 | — | — | L→the other three: their gifts work properly and mine does not | The missing heartbeat. Reason: **protecting themselves** — "you decided years ago that the fault was yours, and you have never said it out loud to anyone" (`companion/ch0.js:112`) | "I hear when. I've never had a reason to ask when *this school* was built." | — |
| **Seer** | Nothing of 212 | — | — | S→the other three: nobody else sees the shadow | The shadow. Reason: **protecting themselves** — "a trick of the light" (`companion/ch0.js:124`) | "I see under things. Nobody's ever asked me to look under a wall." | — |
| **Binder** | Nothing of 212. **Does not yet hold the Book** (`lore.js` Law 0 is `learned:'ch0'` — it arrives at T1) | — | — | B→the other three: nobody else has a blind spot | That their gift has a blind spot. Reason: **protecting themselves** — "you have never told anyone your gift has a blind spot" (`companion/ch0.js:145`) | "I keep the Laws. I have not read them lately." | — |
| **Oriel** | **P8**, first-hand — "I scraped that paint myself, as a girl, with a bread-knife" — **and that it is actively maintained**: "They painted it back inside the week" (`ch4.js:588`) | [PROPOSED] That the maintainer is the school's own authority. She writes "**they**" and never names them | [PROPOSED] Does not know P1–P5 or P10 — nothing gives her the seal, the price or the refusal. She has an outrage with no history behind it | O→C: they are the ones who repainted it, or protect whoever did. O→M: unknown — she leaves her note in Marrow's own chair at T6, which implies she thinks the Chair is either an ally or the person who most needs telling | The whole of it, from everyone, for decades — until she writes four lines under a cushion. Reason: **protecting herself**; one girl with a bread-knife against a week's worth of painters | "I know what that picture is. I have known since I was a girl and it changed nothing." | — |
| **Sorrel / C** | **Nothing asserted anywhere.** Not one of the seven unnamed Masters is given a single line, thought or reaction about 212 | — | — | — | — | — | — |
| ***Mere*** (documents) | The sheet in the niche states the Founders' own count and price: "We were four… we wrote the cold glyph with four hands, and came up grey" (`companion/ch4.js:62`). The strip states the reading: "four, as one, went through. **Not one**" (`ch2.js:319`) | — | — | — | Both sit **behind plinth 1, in "a hollow the rebuilders missed"** (`ch2.js:302`) — i.e. the Founders' rebuttal survives 212 by accident, not by design | — | — |

**Note on Wren and the stone.** `CANON.md` §9.1 lists "the stone's true reading, and that it is about
Wren" among what Wren knows, citing `ch7.js:404`. **That citation says the opposite.** At `ch7:404`
Wren is quoting the *Order's* reading in order to accept walking alone; at T6 Wren reacts to the
tapestry with genuine surprise — "Four of them. **Where is the one born of four? Where am I?**"
(`ch4.js:557`) — and at T3 Wren has to ask the Seer what is on the wall (`ch1.js:306`). **Ruling for
this document: Wren does not know the Founders' reading before T6.** Wren knows Wren is the unwritten
eighth ("I'll stand in the bit that isn't written", `ch7.js:405`), which is a different fact.

---

## T1 — ch0 cold open + prophecy stone

*The Hearth, four hundred years, the night it guttered, the baby, the prophecy in the Order's translation.*

| | **Knows** | **Believes** | **Wrong about** | **Believes about others** | **Withholding** | **Would say if asked** | **Changed at this point** |
|---|---|---|---|---|---|---|---|
| **Binder** | **Now holds Law 0, struck, with its note: "struck by the Convocation, 212. See Law 6."** (`lore.js:57`; rendered `companion/book.js:123-128` from `lawsUpTo('ch0')`) — i.e. **P4's residue, in writing, from the Prologue** | That a struck Law is a tidied Law — dead administration. **Low salience, high confidence.** Nothing on the page invites suspicion | **Treats `struck` as housekeeping.** It was an act of cost-avoidance, and Law 3 in the same Book makes striking the *only* way to do it (`lore.js:60`) — a deduction the Binder could make at T1 and is never prompted to | B→the other three: none of them keeps the Laws, so none of them has seen this | The Book itself, by default — nothing asks the Binder to read it aloud, and the house rule only obliges saying what you *see* in a scene (`lore.js:74`) | "Law 0's struck. Says so right there. Two-twelve. There's a note pointing at a Law I haven't got yet." | **Gained the Book.** Its cross-reference points at Law 6, which does not arrive until T7 — a dangling footnote carried for six chapters |
| **Reader** | — | The school's translation is the translation | Believes nobody can read the cuts, including themselves — `ch0.js:62` vs `ch0.js:146` (§13.2) | R→all: everyone here learns the same wrong sentence | — | "Nobody alive has read the cuts. That's what we're told." | Heard P9 delivered as *the school's* translation, not the Order's. **The word "Order" is never said; only the art captions it `THE ORDER'S READING`** (`scenes-ch0.js:78`) |
| **L / S** | — | — | — | — | — | "It's the sentence over the fire. Everybody knows it." | Heard P9 |
| **Wren** | — | Unchanged | Unchanged | — | Unchanged | Unchanged | Not present as a knower — Wren is the *subject* of the scene |
| **M / V / O / C** | Unchanged | — | — | — | — | — | Not present |

**[WITHHOLDING] at T1.** The player is handed the Order's reading, told adults argue about it, and
given no grounds on which to suspect the *institution* rather than the scholarship. The one grain of
institutional evidence — "struck by the Convocation, 212" — is on one phone, in small type, with no
scene attached. The caption `THE ORDER'S READING` is the only shared-screen accusation in the first
four chapters and it is a piece of art nobody in the fiction reads.

---

## T2 — ch0 lamp lit → the four speak

*The lamp lights the old way; the four each name aloud the anomaly they have privately carried.*

| | **Knows** | **Believes** | **Wrong about** | **Believes about others** | **Withholding** | **Would say if asked** | **Changed at this point** |
|---|---|---|---|---|---|---|---|
| **the four** (as a body) | That a Founders' device answers to **four hands** and that the school does not teach how (`ch0.js:88`, `:213-216`) | That the lamp is a curiosity, not evidence | **That the lamp's four sockets are satisfied by two words.** "There is no third word and no fourth" (`companion/ch0.js:117-118`, §12.46) — a four-hands object with two words is precisely the shape of P4's substitution, and **nothing prompts the connection** | Each now knows the other three also concealed something for years. **The precedent for saying the private thing aloud is set here and is the mechanism by which the whole 212 case is later assembled** | Nothing further, among themselves | "Four hands. Four sockets. Two words. Fine." | **The partition became speakable.** No 212 content moved |
| **Wren** | That all four concealed their anomaly — "Yes. All four of you. **I've known for years**" (`ch0.js:226`) | — | Unchanged on P9 | W→the four: now openly, they each hid one thing. W→the four→W: *they think I don't know* — corrected, aloud, at this beat | Stops withholding the Wren-anomalies. **Still holds nothing of 212 to withhold** | "You all noticed. You all decided it was your fault. It isn't." | Wren's largest single concealment ends. §12.21 — **how Wren knows one-seat facts is never asked by anyone, ever** |

---

## T3 — ch1

*Vane's writ; "I have seen what is under the paint"; the vote; Marrow watches Wren, not the fire.*

| | **Knows** | **Believes** | **Wrong about** | **Believes about others** | **Withholding** | **Would say if asked** | **Changed at this point** |
|---|---|---|---|---|---|---|---|
| **Vane** | Unchanged (P8, 22 years) | That saying it half-quietly in front of nine Masters is worth more than saying it loudly (`ch1.js:137` "lowers his voice — **not far enough**") | That the Hall does not already know — **he told this Hall twenty-two years ago** (`ch7.js:341`). Either he has forgotten his own act or the room is performing ignorance | V→M: the lever will land and she cannot answer it here. V→M→C: *she will not explain it to them, because explaining it costs her more than it costs me*. V→S: that seat can confirm me — he names the gift unprompted (`ch1.js:283`) | Why he wants it, and that his grievance is old. Reason: **protecting himself** | "Ask your Seer what is under the paint. I am not the villain of tonight." | **Made P8 a public unknown.** Two separate lines, one to Marrow (`:138`), one to the four (`:283`) |
| **Marrow** | Unchanged | That the Hall must not be given the argument tonight, because she needs the vote more than she needs the truth [PROPOSED] | — | M→V: he will spend it and does not care what it costs. M→C: they would take a mistranslation over a bill. M→the four: children, who now have a question they did not have an hour ago | **P9-as-falsehood, from her own Convocation** — and she does worse than withhold it: see the behaviour flag below. Reason: **protecting the plan** | "The stone over your heads says one born of four. Tonight I stop arguing and show you." | **She states the Order's reading to the Convocation as though it were the stone's** (`ch1.js:124`) — and then shows nothing (§12.42) |
| **Oriel** | Unchanged (P8 + maintenance) | [PROPOSED] That Vane is telling the truth and has been ignored, exactly as she was | — | O→V: he knows what I know. **O→the Hall: they are all pretending.** O→the four: these are the couriers who will be sent below, so they are the ones to price | Everything. Reason: **protecting herself** — but she prices her vote at exactly the information a scraper would want: "Tell me what you find down there. **All of it.** … **Even the parts you don't like**" (`ch1.js:256`, `:266`) | "Tonight — keep. And tell me everything you find down there." | Her price is set, and it is shaped by P8 |
| **Wren** | That there is something on a wall that a Crown Envoy thinks is worth a writ | That the Seer can answer it | Unchanged on P9 | W→S: you can see under things, so look. W→M: her face did something when he said it (`ch1.js:139`) | — | "**Seer, what is *on* that wall?**" (`ch1.js:306`) | **Wren asks and is not answered.** Wren's ignorance of P8 is established here, in Wren's own mouth |
| **Seer** | That the Envoy of the Crown has named *their* gift as the one that settles it | That there is something under a painted surface in this school | — | S→V: he wants me to look, which is a reason to look and a reason not to. S→M: her face knew | — | "He said to ask me. I haven't looked yet." | **The Seer is recruited into the mystery by its antagonist.** The chapter ends and nothing is looked at |
| **Binder** | Unchanged; Law 0 still in the Book, still unremarked | — | Unchanged | B→M: her thread to us is red and **not yet tied** (`companion/ch4.js:264`) | — | "Struck Law's still struck. Nobody's asked." | No 212 movement |
| **Reader / Listener** | — | — | — | — | — | — | No 212 movement |

**[INCONSISTENCY — hard].** `ch1.js:139` — "**Nobody knows what that means.** Her face does." Master
Oriel is in that room, in seat 7, and she took a bread-knife to that exact paint as a girl and watched
it repainted inside the week (`ch4.js:588`). At minimum two people in the Hall know precisely what
Vane means. The narration asserts a collective ignorance that its own cast contradicts.

---

## T4 — ch2

*The Founders' Door; the Vault; the Cold Ember; the bricked road and **212**; (optional) Mere's niche and the rubbing.*

This is where the mystery's evidence base is actually laid, and it is laid **almost entirely on two
phones**.

| | **Knows** | **Believes** | **Wrong about** | **Believes about others** | **Withholding** | **Would say if asked** | **Changed at this point** |
|---|---|---|---|---|---|---|---|
| **Seer** | **P6, physically.** The floor is newer than the room; four original holes under it, one per dial; "**Not one plinth is standing in the hole cut for it**" (`companion/ch2.js:141-142`) — a derangement, which is deliberate, not sloppy | That the rebuild moved everything on purpose. High — nothing is left right | Does not know **why**, or **when**. The year is on the Binder's page, not theirs | S→B: the Laws are theirs; they will know which rule wins. S→M: she told us the rebuilding was not honest, so she knows more than she said | Nothing — the scene obliges them to say all four hole-assignments aloud | "Four holes under this floor and not one statue is in its own. Somebody moved every single one." | **Gained P6's physical evidence.** Also: "a hollow the rebuilders missed" behind plinth 1 (`:142`) — the Founders' rebuttal survived by oversight |
| **Binder** | **P4's mechanism and P6's date.** Law 13 (F, 0) vs Law 9 (O, 212) vs Law 3; and, in plain words, "**The newer one was written in 212 — the year this room was rebuilt and the statues were put back**" (`companion/ch2.js:157`). And: the school's drill matches the 212 Law and "**That is a drill, not a Law**, and it is younger than both" (`:158`) | That 212 is a live political fact, not administration. **This is the moment the Binder's belief should turn** — and the page does not say so, it says it flat | Still does not have P1/P2/P3/P5/P10 — the *why*. Has motive-shaped evidence with no motive attached | B→S: they can see the holes; I cannot. B→the table: nobody else has a dated Law. **B→M: [PROPOSED] she knows all this — she sent us for it** | The date. **Nothing in the scene asks the Binder to report the year**, and no other character ever reacts to it | "The newer Law is 212 — same year they rebuilt this room. And what they taught us in class isn't a Law at all, it's a drill, and it's younger than both." | **The thesis of the mystery is delivered, in one sentence, to one phone, in Chapter II.** The strongest single 212 moment in the game |
| **Reader** | Four plinth-words. Optional (`CH2_NICHE`): **Mere's name** — "**Mere.** One of the four who closed the wound" (`ch2.js:301`) — and the strip's two readings | Optional (`CH2_STRIP='right'`): that the Founders' own stone says "**four, as one, went through. Not one**" (`ch2.js:319`) — which is P9 disproved *in miniature*, four chapters early | If they read left: told plainly it is "the reading the school teaches, and **the mark on this stone is at the other end**" | R→S: the mark's end is theirs to say | The rubbing, by default — the Reader "cannot read a word of it, and is keeping it anyway" | "There's a name on the back of this one. Mere. And this strip reads two ways and the school teaches the wrong one." | Optional. **`CH2_NICHE` and `CH2_STRIP` are written and never read again** (Appendix A) — finding a named Founder and a corrected prophecy has **no mechanical footprint** |
| **Listener** | The door's interval pattern; no 212 content | — | — | L→R/S: the words and dials are theirs | — | "I hear when, not which. Nothing here is mine." | Nothing on this mystery |
| **the table (shared screen)** | "This floor is **newer than the room**" (`ch2.js:209`); "an archway **bricked shut with newer stone**, grey where everything down here is black" (`ch2.js:346`) + the numeral **212** carved beside it in the art (`scenes-ch2.js:100`) | — | — | — | — | — | **P7 enters the game as a picture with a number on it and no line of prose to read it.** The Hearth never says "two hundred and twelve" |
| **Marrow** | Unchanged. She pre-seeded the search: "That vault was rebuilt once, and **the rebuilding was not honest**. And take the Seer's eyes with you" (`ch2.js:189`) | That the four will find the rebuild. She knows which gift finds it | **Still wrong that Law 0 survives nowhere** | M→S: this is the seat that sees under a floor — she names the gift, so she knows the falsification is *sub-floor*, which is operational knowledge of the derangement she never claims anywhere else. **[PROPOSED] flag** | The year, the actor, the motive. Reason: **protecting the plan** — and, at the top of the stair, she asks for nothing but the Ember and **never debriefs them** (`ch2.js:388-395`) | "The Ember." | She sent them for evidence of P6 and collects none of it |
| **Wren** | Nothing new — **Wren arrives at `ch2_stairfall`, after `ch2_road`, and never sees the bricked arch** | — | Unchanged | — | — | "You *left* without me." | Structurally excluded from the chapter's 212 content |
| **Oriel** (branch `ORIEL`) | — | — | — | O→the four: they promised me everything | — | "She has come to be told." (`ch2.js:390`) — **and the scene ends there** (§12.58) | Her price comes due and is never paid on screen |

---

## T5 — ch3

*The corridors; the laundry; Wren's four whispered questions and the four private answers.*

The mystery is **dormant**. Its only movement is atmospheric, and one contradiction deepens.

| | **Knows** | **Believes** | **Wrong about** | **Believes about others** | **Withholding** | **Would say if asked** | **Changed at this point** |
|---|---|---|---|---|---|---|---|
| **Listener** | The Gallery portraits mutter, and the three words are "***four went down***" (`ch3.js:440`) | That it refers to *tonight* or to the Founders — **the referent is never stated** (§12.56) | — | L→the table: I am the only one who heard it | Nothing; the line is on the Hearth, so the whole table hears it | "The portraits are saying *four went down*. I don't know which four." | **The only shared-screen "four" in the whole middle of the game**, and it is deniable |
| **Binder** | That the Tower ward is a **Vigil** ward, "cut by the keeper sworn to it" (`companion/ch3.js:264-265`) | — | Marrow has just called the same door "a ward **older than the school**" (`ch3.js:444`) and the captain calls it "**Founders' work**" (`ch3.js:605`). §13.6. **For this mystery: it is the second time the school's own account of its strata is wrong on the Binder's phone, and again nobody notices the pattern** | B→M: she is wrong about her own door, or lying about it | — | "That's not Founders' work. It's a Vigil ward, whatever she says." | A second stratum-error accrues, unconnected to the first |
| **Wren** | — | — | Unchanged on P9 | W→each of the four: I know what the true answer to my question is, and I will find out who lies | The four questions are about Wren, **not about 212** | — | Nothing on this mystery |
| **Marrow** | — | — | — | — | Unchanged | "Get Wren there before the third bell." | Operational only |

**Chapter-end button: "Under the paint"** (`ch3.js:448`). The game points at the mystery's next beat
on the shared screen without a character having to.

---

## T6 — ch4

*The study's four secrets — journal, memory-bell, tapestry under the paint, the grey thread; (optional) Mere's rubbing read; the Warden's Oath and its lock.*

| | **Knows** | **Believes** | **Wrong about** | **Believes about others** | **Withholding** | **Would say if asked** | **Changed at this point** |
|---|---|---|---|---|---|---|---|
| **Seer** | branch `TAPESTRY`: **P8, directly.** Under the school's picture: four figures, **no child**, the fourth carrying COLD, the second reaching back, and — on the art — **four shadows where the overpaint has none** (`scenes-ch4.js:44-62` vs `:66-76`) | That the school's picture is a forgery, and a specific one | Does not know who forged it or when. **The year is not on this surface anywhere** | S→V: he was right, and the Hearth says so — "**So he had**" (`ch4.js:557`). S→M: she walks in, sees it, and says four words | Nothing — the scrape is public | "Four people walk into that fire. Not one. And the one in the hall has no shadow." | **P8 enters the shared screen.** Vane retro-confirmed by the narration |
| **the table** | branch `ORIEL` + `chair` corner: **P8's maintenance.** "I scraped that paint myself, as a girl, with a bread-knife. **They painted it back inside the week.** — Oriel" (`ch4.js:588`) | That there is a **living** institution defending the picture | The note names no institution. "They" is as far as the game goes | table→O: she is an ally, and she knew before we did | — | "Somebody repaints it. Within a week. That's not history, that's a staff." | **The only evidence in the game that 212 is a live policy and not a dead act** — and it is double-gated (§4) |
| **Reader** | branch `LETTER`: took the rubbing at T4; the primer arrives now (`companion/ch4.js:66-70`); **Mere's sheet is promised "in your Book from here on" (`ch4.js:498`) and does not arrive until T7** (§13.18) | That the name on the roll, WRENN, is the older alphabet's | — | R→the table: I will be able to read it soon | — | "I can read the old letters now. The sheet's not in my Book yet." | Capability gained; content delayed one chapter |
| **Binder** | `computeLaw0()` fires at `ch4_swear` (`ch4.js:85`): `LAW0 = LETTER_READ ‖ TAPESTRY ‖ ORIEL`. **Law 0's card flips STRUCK → RESTORED, silently, with no line of prose anywhere covering it** | That the Law is back — the card now reads "Older than Law 6. **The older binds**" (`book.js:127`) | On the `ORIEL`-only route this has **no in-fiction cause at all**: a promise made in Chapter I restores a struck Founders' Law (§13.17). The Binder is given a true belief by an invalid inference | B→the table: nobody else watches this card | The flip. **No scene prompts the Binder to announce it**; ch6 will announce it again at T8 as though it were new (§13.46) | "Law 0's not struck any more. I don't know when that happened." | **Belief changes with no experience attached** — the sharpest epistemic defect in the mystery |
| **Wren** | branch `TAPESTRY`: **that the picture is a forgery and there is no child in it** | Begins to doubt P9 — "Four of them. **Where is the one born of four? Where am I?**" (`ch4.js:557`) | Still believes the stone says *one born of four*; the tapestry has only put the two in conflict | W→S: you found it. W→M: **[PROPOSED] she has a forged picture on her own study wall and has never mentioned it** | — | "Four of them. So where am I?" | **Wren's belief on P9 cracks here — two chapters before the stone is read.** Wren's most important 212 beat |
| **Marrow** | Unchanged | — | Unchanged on Law 0 | M→S: that seat did it, and she says so — "**So. The Seer.**" (`ch4.js:609`) | **That she scraped that same paint herself, as a girl.** She stops in the doorway, says four words, and moves to the scroll. Reason: **protecting the plan** — a confession here costs her the oath scene; and [PROPOSED] protecting herself, because it is the only childhood fact she ever gives away | "So. The Seer. The scroll, then." | Her single largest withholding beat. She is looking at her own girlhood act and says nothing. **Also: "back early, and does not say why" (`ch4.js:607`) is flagged by the game and never answered (§12.44)** |
| **Vane** | Unchanged; absent | — | — | — | — | — | Absent — and is vindicated in his absence |
| **Oriel** | Unchanged | That she is writing to whoever searches the Provost's chair | — | O→M: [PROPOSED] she left it **in Marrow's own chair**, so either she trusts the Chair or she wants the Chair to find it. **The game never rules** | — | — | Her testimony enters play without her |

---

## T7 — ch5

*Mere's gates; the Under-Marches, the drowned First Hall, four thrones; the Founders' Count; the stair choice.*

| | **Knows** | **Believes** | **Wrong about** | **Believes about others** | **Withholding** | **Would say if asked** | **Changed at this point** |
|---|---|---|---|---|---|---|---|
| **Binder** | **P11, fully available.** The `lawClash` plate names **Year 0** against **Year 212** twice (`companion/ch5.js:128`) — Law 5 vs Law 11, the same collapse as Law 13 vs Law 9 at T4. **And the five carved oaths: two of them are dated Year 212 — "the Keeper" and "the Chair" — and both are EMBER-locked, i.e. reconsiderable** (`companion/ch5.js:182`, `:185`) | That 212 is a *pattern*: every disagreement is the same disagreement, and the newer side always loses under Law 3 | **The plate draws Law 11 as STRUCK** (`companion/ch5.js:128-130`) — only Law 0 carries `struck` (`lore.js:57`). The Binder is shown 212's Laws as repudiated, which would make 212 a corrected error rather than a live policy. §13.33 | B→the table: my rule will sound wrong and I have to say it anyway (`companion/ch5.js:336`) | The 212 oath-dates. **The oaths appear as a counting task — "how many were sworn before Year 212" — and the Binder is asked for a *number*, never for the observation that two offices of this school were sworn in the cover-up's own year under the revocable lock** | "Two of these five oaths were sworn in 212. The Keeper and the Chair. Both under EMBER — which means both can be reconsidered." | **The richest unexploited breadcrumb in the mystery**, delivered as arithmetic |
| **Marrow** | **Learns that Law 0 exists** — when the Silent Gate accepts COLD: "**That is not in the Book I was given**" (`ch5.js:399`) | That Mere's Book and hers are not the same Book | — | M→the four: they have a Law I do not. M→B: **[PROPOSED] and she never asks the Binder for it** | — | "That is not in the Book I was given." | **The Chair of the Convocation discovers, at T7, that the Founders' Law her own Book omits is in a fourteen-year-old's.** She does not follow it up |
| **Wren** | That the Law is Mere's — "**It is in Mere's, apparently**" (`ch5.js:400`) | That Mere kept things the school did not | Still on P9, weakening | W→M: you did not know that, and I enjoyed watching you not know it | — | "It's in Mere's, apparently." | Wren's one line about the documentary record, and it is a joke |
| **Reader** | branch `LETTER`: **Mere's sheet, translated, in the Book** (`companion/ch4.js:71`, gated `maxChapter >= 5`) — "We were four… we wrote the cold glyph with four hands, and came up grey" | **P2's price, in the Founders' own voice, one chapter before the Convocation's refusal of it is named** | Does not know anyone ever refused to pay it | R→B: this is the four-hands Law's evidence | The sheet is a Book page, not a scene — **nothing prompts the Reader to read it aloud** | "Mere says they were four, and they came up grey. That's the price, in her own hand." | **The Founders' voice arrives, on the Reader's phone, with no scene attached** |
| **Seer** | Mere's gates' cuts; four thrones on the ledge | — | — | — | — | — | No 212 movement |
| **Listener** | The Gallery portraits "showed **four going down the stair and four coming back**" (`companion/ch5.js:310`) | — | **This corroborates Mere's survival (§12.15) and nobody anywhere connects it** | — | — | "Four went down. Four came back. I have not stopped hearing it." | A second unconnected "four" lands on a second phone |

---

## T8 — ch6

*The Bells; the Second Asking; Marrow's confession; **the prophecy stone read from its foot**; Law 0 restored.*

**The answer arrives. It arrives on one phone, behind an opt-in tap.**

| | **Knows** | **Believes** | **Wrong about** | **Believes about others** | **Withholding** | **Would say if asked** | **Changed at this point** |
|---|---|---|---|---|---|---|---|
| **Binder** | **P1, P2, P3, P4, P5 — all of it**, if the reveal block is opened: "Two hundred and twelve years after the Founders **the seal failed**. Four hands meant four Masters giving up their Sight. **The Convocation sent one Warden down instead.**" / "Four Masters, four Sightings. **The Convocation would not pay it. They struck the Law and called it grammar.**" (`companion/ch6.js:286-287`) | That 212 was a purchase decision, and that the school's grammar is its receipt | **Which body did it.** The same phone says "Law 6 · **the Convocation's** · Year 212" (`companion/ch6.js:233`) while the Book says every 212 Law is "**Order's**" (`book.js:122`). §12.3, §13.9. The Binder cannot form a stable belief about the actor | B→M: she knows this. B→M→B: *does she know I have it?* — **and the Hearth has just told the whole room the Binder's Book has the Law** (`ch6.js:853`), so she does | **Everything, by default.** The reveal is a `{t:'reveal'}` block labelled "Read when the Hearth says the Book has turned a page" — it is opened privately, mid-chapter, and **no scene ever asks the Binder to report its contents** | "Two hundred and twelve years ago the seal failed and the bill was four Masters' Sight. They wouldn't pay it. So they struck the Law and sent one man down alone." | **The mystery is solved, privately, by one player, with no obligation to tell anyone** |
| **Binder (Sight tab)** | The three-clause Law 0 against the three-clause Law 6 (`companion/ch6.js:232-233`) — and the `olderBinds` figure: "**same ink, same hand · the older one binds**" (`companion/ch6.js:112-121`) | [PROPOSED] That one hand wrote a Year-0 Law and a Year-212 Law — i.e. a forgery | **The Book they studied all night carries a one-clause Law 0** (`lore.js:57`) and the puzzle turns on the two clauses the Book omits. §13.8. The Binder's belief about *what Law 0 says* differs between two tabs of one phone | — | The forgery observation — **the figure asserts it and nothing in the game follows it up** (§12.17) | "Same ink, same hand, two hundred years apart. Somebody wrote the new Law in the old hand." | **An accusation of forgery is drawn, captioned, and abandoned** |
| **the table** | **P9 disproved on the shared screen.** The stone read from cut 8, down the count, every cut its other word: "KNOT · CROWN · ASH · WELL · VEIL · EMBER · ASH · COLD" → "**Four, as one, go down with fire. What is kept stays behind. The fire is the hollow they left.**" (`ch6.js:827-828`) and "**Four went down. Not one born of four — four, as one.**" (`ch6.js:839`) | That the school has been teaching a wrong sentence for four hundred years | **Not told *who* taught it wrongly or why.** The Hearth never says Order, Convocation, 212, or cover-up. P1–P5 and P10 stay on the phone | table→M: she knew; she read it in five seconds when our budget ran out | — | "The stone says four. It has always said four." | **The shared screen delivers the consequence of 212 and never names 212** |
| **Marrow** | Unchanged — she could always read it | That the four reading it is what opens the Walk [PROPOSED] | — | M→the four: they have it now, and it had to be theirs. M→the four→M: *they know I could have told them* | **That she can read it — until the reading budget is spent.** Then "Hands off it — I have had four hundred years of this stone and you have had five minutes," and she kneels and reads it (`ch6.js:823-824`). Reason: **protecting the plan**, at the direct cost of their trust | "Four people's worth of fire, and four hundred years to spend it in. **Nobody did anything wrong.**" (`ch6.js:850`) | Her withholding of P9's disproof ends — **on the losing branch, as a rebuke** |
| **Wren** | **P9 disproved.** Wren is not *one born of four* | That Wren is still the one who goes in, because Wren is the hollow — a different argument from the prophecy's | — | W→M: you knew and you let me grow up inside the other sentence. **Wren never says this** | **That Wren wanted to be saved** — revealed only at T9/T10 and only obliquely (`ch7.js:768`; `:758`) | "Then ask me a third time. In there." (`ch6.js:863`) | Wren's belief on P9 resolves. **Wren's reaction to having been raised inside a mistranslation is never written** |
| **Vane / Oriel / C** | Unchanged; absent | — | — | — | — | — | The Convocation is never told any of this |

---

## T9 — ch7

*Vane at the chamber's edge; (optional) the wall shown to Vane; the Decision; the Great Sigil; the Binding; COLD written by four hands.*

| | **Knows** | **Believes** | **Wrong about** | **Believes about others** | **Withholding** | **Would say if asked** | **Changed at this point** |
|---|---|---|---|---|---|---|---|
| **Marrow** | Unchanged | That the four have earned the argument | — | M→the four: whichever reason they give me, I was going to step aside | **P10, until the exact moment she is argued with.** Gate: `OATH_KNOT` **and** the `letter` option. Reason: **assuming it is already known** to anyone who has the Law — she answers as though the history were common ground | "**They could not afford four Masters, so they made it grammar.**" (`ch7.js:396`) | **The motive is spoken aloud on the Hearth, once, on a narrow branch.** "They" has no antecedent in the scene (§12.18) |
| **Marrow (2)** | Unchanged | — | — | M→S: you scraped it; so did I | **That she scraped the paint as a girl** — gate: `OATH_KNOT` **and** `TAPESTRY` **and** the `tapestry` option | "**I scraped it myself, as a girl.**" (`ch7.js:394`) | Her only childhood fact, on the narrowest gate in the chapter |
| **Vane** | Unchanged | branch `wall`: that these four will pay what he could not make anyone pay | — | V→the four: they have done in a night what I could not do in twenty-two years. **V→M: still no acknowledgement that she scraped it too** (§12.23) — and the two speeches **can occur in one playthrough**, minutes apart | branch `nothing`: everything. His whole history stays sealed and he simply wins or loses | "**Twenty-two years. I stood in your Hall with that paint under my nails and told them. They sent me away to learn manners.**" (`ch7.js:341`) | branch `wall`: his private grievance becomes the lever that disarms him. **`VANE_ALLY` then deletes him from the fiction and what he does next is never shown** (§12.32) |
| **the four** | The bell-chamber wall: **the same image as the tapestry, four hundred years old, carved openly, never painted over** (`ch7.js:303`; `scenes-ch7.js:55-60`) | That the forgery was only ever necessary upstairs | — | table→V: he was telling the truth all night | — | "It's on the wall down here too. Nobody bothered to paint this one." | **The strongest single piece of evidence that 212's vandalism was surface-only, and no character remarks on it** (§12.50) |
| **the four (2)** | branch `LAW0` + `WALK_UNLOCKED`: they write COLD with four hands and the screen prints "**'COLD is written by four hands.' — Law 0. Restored.**" (`ch7.js:726`, `:740`) | That the 212 decision has been reversed by act, not by argument | — | — | — | "Four hands. That's the whole of it." | **212 is undone physically. Nobody is told. The Convocation is not in the room** |
| **Wren** | Unchanged | branch `DECISION='WALK'` after T8: Wren quotes the Order's reading — "**That is what the stone says**" (`ch7.js:404`) | **[INCONSISTENCY] — reachable after the stone has been read the Founders' way.** See §3 | — | That Wren wanted to be asked | "I'll stand in the bit that isn't written." | — |
| **everyone** | — | — | — | — | — | — | **Vane and the Crown's soldiers arrive "on the old road" (`ch7.js:304`) — the road 212 bricked shut (`ch2.js:346`). Nobody asks how it is open, or where its other end is.** See §2 |

---

## T10 — ch8

*The ending that was reached, and the epilogue.*

| | **Knows** | **Believes** | **Wrong about** | **Believes about others** | **Withholding** | **Would say if asked** | **Changed at this point** |
|---|---|---|---|---|---|---|---|
| **Binder** | The Law's final state, on one card: **WRITTEN** (E0) / **RESTORED** (E1–E3) / **STRUCK, AGAIN — "The Crown struck it. The Crown does not need Laws."** (E4) (`companion/ch8.js:309`) | That the record is the only thing that survives the night | — | B→the school: nobody up there knows any of this | **Everything.** No ending has any of the four report to the Convocation, the Order, or the school | "Law 0. Founders'. Year 0. Tonight it was." | The Binder ends the game as the sole custodian of the 212 case |
| **the table** | The Epilogue's summary: "The eighth is the rest. **The rest is never carved.**" (`ch8.js:493`) | — | **That is Law 6 — the Order's, 212 — restated as though it were the world's rule**, one scene before the Binder's card celebrates overturning it. §13.12 | — | — | — | **The game's last word on the mystery restates the cover-up's own Law** |
| **Marrow** | — | — | — | — | — | E3: "Do not let that stop you listening — **I did, and it cost fourteen years.**" / "**I should have asked you sooner. I should have asked anyone.**" (`companion/ch8.js:196-197`) — the nearest thing to an apology for her withholding, and it is about Wren, not about 212 | Absent from E0, E1 and E4 entirely (§12.30) |
| **Oriel** | Never told. Her price is never paid on any ending | — | — | — | — | — | **She asked to be told "all of it, even the parts you don't like" and the game never delivers it** (§12.58) |
| **the Convocation** | Never told. Never reappears after ch7 (§12.30) | — | — | — | — | — | **Whether Law 0's restoration is accepted on the record is never said.** The body that struck it is not present when it is unstruck |
| **Vane** | E0–E3: fate unmentioned. E4: he keeps every promise, exactly | — | — | — | — | E4: "as promised" ×2 (`ch8.js:355-356`) | — |
| **the school** | Never told on any ending. E3: "the fire dips every winter and **the fourth-years are told it is nothing**" (`ch8.js:345`) | — | — | — | — | — | **On E3 the lie is renewed by the person the lie was told about.** The cleanest ending for this mystery, and it is the sad one |

---

## 1. THE GAP THAT DRIVES THE DRAMA

### **Provost Marrow ↔ the Binder.**

She has the **motive** and not the **Law**. The Binder has the **Law** and not the **motive**. Each has
had their half since before the other walked into the room, and **they are never once made to trade**.

| | Marrow | the Binder |
|---|---|---|
| holds | P6, P8, **P10**, and the ability to read the stone — since girlhood (`ch2.js:189`; `ch7.js:394`, `:396`; `ch6.js:824`) | **P4 in writing, with the actor and the year**, from the Prologue (`lore.js:57`, rendered `book.js:123`) |
| lacks | **the text of Law 0** — "That is not in the Book I was given" (`ch5.js:399`) | *why* — until T8, opt-in |
| believes about the other | M→B: [PROPOSED] a child who keeps a book. She never asks the Binder anything about the Laws all night | B→M: she knows everything and is choosing what to give us |
| the sentence never said | "Binder. What does your Book say about Law 0?" | "Provost — it's in mine. It's been in mine since the dormitory." |

**Why this is the productive one.** The other candidate asymmetries are either symmetrical or empty:
Marrow↔Vane both hold P8 and neither mentions it (a *missed scene*, not a gap); Wren↔everyone is
mostly Wren's ignorance, which is dramatic but one-directional; the Convocation holds nothing at all.
Marrow↔Binder is the only pair where **each holds the thing the other needs, each is wrong about what
the other has, and both are on stage together in five chapters.**

**Scenes that currently exploit it — all three of them.**

1. **T7, `ch5_silent`** (`ch5.js:398-400`). The gate takes COLD; Marrow says "That is not in the Book
   I was given." *This is the exploit.* It is one line, the Binder does not answer it, and the scene
   moves on. Wren gets the punchline instead.
2. **T8, `ch6_open`** (`ch6.js:853`). "**Binder — the struck Law is back in your Book.**" The Hearth
   tells the room the Binder has it — **in Marrow's presence** — and she does not react. (Worse: on
   most branches the card has read RESTORED since T6, §13.46.)
3. **T9, `ch7_argue1`**, the `letter` option (`ch7.js:395-396`). The four say "A struck Law says the
   cold word is written by four hands"; she answers with the motive. **This is the only moment in the
   game where the two halves touch**, and it is gated on `OATH_KNOT` — see §4.

**Scenes that could exploit it and do not.**

| where | the move | cost |
|---|---|---|
| **T4, `ch2_top`** (`ch2.js:388-395`) | She sends them for the rebuild and takes only the Ember. One line — *"What did the floor say?"* — and the Binder must either report 212 or withhold it from the Chair. Her reaction to the year is the whole character | one exchange |
| **T6, `ch4_swear`** (`ch4.js:604-612`) | She walks in, sees the scraped tapestry, says "So. The Seer." She scraped it as a girl. **Move `ch7.js:394`'s confession here, ungated** — it costs nothing, it is already written, and it makes the oath scene a scene between two people who have done the same thing thirty years apart | one line, relocated |
| **T7, `ch5_silent`** | Give the Binder a beat after her line. *"It's in mine, Provost. It's been in mine since the dormitory."* The Chair of the Convocation learning that a fourteen-year-old's book outranks hers is the mystery's whole political thesis in one exchange | one line |
| **T8, `ch6_open`** | Gate `ch6.js:853` on `!LAW0_ALREADY` so the announcement is true when it fires; then let Marrow ask **what else** the Book says. The reveal block (`companion/ch6.js:283-289`) is sitting there with P1–P5 in it and no reason ever to be spoken aloud | one guard, one line |
| **T9, `ch7_argue1`** | Ungate the `letter` option from `OATH_KNOT` by giving the same exchange a home on the non-KNOT path. As shipped, **an entire playthrough can reach the Finale with the motive never spoken** | see §4 |

**Runner-up gaps, ranked.** (2) **Marrow ↔ Vane** — identical knowledge, zero acknowledgement, and
the two speeches can occur four scenes apart in one session (§12.23); free to fix, and it converts
Vane from antagonist to precedent. (3) **Wren ↔ Marrow** — Wren was raised inside a sentence Marrow
has always been able to disprove; Wren's reaction to that is never written, on any branch. (4)
**Oriel ↔ the Hall** — she is in the room when Vane says the paint line and the narration says nobody
understands it.

---

## 2. WHERE THE GAME CONTRADICTS ITSELF ON WHO KNEW WHAT WHEN

**[CONTRADICTION] §A — Marrow is surprised at T7 by the existence of a Law whose history she
recites at T9.**

> `ch5.js:399` — Provost Marrow: "**That is not in the Book I was given.**"

against

> `ch7.js:396` — Provost Marrow: "**They could not afford four Masters, so they made it grammar.**"

The second line is a *complete account of why the first Law was struck*. Someone who can say it
cannot be surprised that the Law it replaced permitted writing COLD. The fix is cheap and improves
both: make T7 a recognition rather than a discovery — *"So it was in somebody's."* — and let T9 stay
as it is. **The rest of the game depends on T9**; it is the only statement of P10 on the shared screen.

**[CONTRADICTION] §B — "Nobody knows what that means," with two people in the room who do.**

> `ch1.js:138-139` — Vane: "I have seen what is under the paint in this hall, Ilsabet." / "**Nobody
> knows what that means.** Her face does."

against

> `ch4.js:588` — Oriel: "I scraped that paint myself, **as a girl**, with a bread-knife."
> `ch7.js:341` — Vane: "Twenty-two years. **I stood in your Hall** with that paint under my nails and
> **told them**."

Oriel is seat 7, present and voting. And Vane says he told this Hall the same thing twenty-two years
ago. The narration asserts a collective ignorance the cast contradicts twice. **The rest of the game
depends on Oriel knowing** (her note is the only evidence of P8's maintenance). Fix: "Nobody in that
hall will admit to knowing what that means. Two of them do."

**[CONTRADICTION] §C — who struck it: the Convocation, or the Order?**

> `lore.js:57` — "struck by the **Convocation**, 212."
> `companion/ch6.js:233` — "Law 6 · **the Convocation's** · Year 212"

against

> `companion/book.js:122` — "Every Law is dated: Founders' (Year 0) or **Order's** (Year 212 or 340)."
> `lore.js:55-56` — era `'O'` = **Order**.

One phone, two institutions, on Laws the Binder reads side by side. §12.3, §13.9. **Epistemic
consequence, and it is the one that matters: the Binder cannot form a stable belief about who the
defendant is.** Every "believes about others" cell for the Binder above is hedged because of this.

**[CONTRADICTION] §D — Law 0 is restored twice, and the first time has no cause.**

> `ch4.js:85` — `Store.set('LAW0', !!(f.LETTER_READ || f.TAPESTRY || f.ORIEL));`
> `ch4.js:82-84`, the file's own comment — "`ORIEL` is the ch1 promise rather than `ORIEL_NOTE`,
> **which looks wrong**."

against

> `ch6.js:814` — `Store.set('LAW0', true)` unconditionally, and `ch6.js:853` — "**Binder — the struck
> Law is back in your Book.**"

A table that promised Master Oriel a favour in Chapter I, and never opened her note, has a struck
Founders' Law restored in Chapter IV **with no in-fiction event of any kind**, and is then told in
Chapter VI that it has just happened. §13.17, §13.46. The Binder's knowledge state changes twice and
is narrated once, at the wrong time.

**[CONTRADICTION] §E — the Binder does not have the Law the Binder is using.**

> `lore.js:57` (the **Book** tab) — Law 0: "COLD is written by four hands."
> `companion/ch6.js:232` (the **Sight** tab) — Law 0: "**Read a line as the cuts count down. Every cut
> says its other word.** COLD is written by four hands."

§13.8. The T8 stone puzzle turns on exactly the two clauses the Book omits. A Binder who has studied
the Book for six chapters holds a *different Law* from the one that solves the mystery.

**[CONTRADICTION] §F — 212's Laws are drawn as struck.**

> `companion/ch5.js:128-130` — the `lawClash` plate renders the Year-212 plate in the struck style.

against `lore.js:57` (only Law 0 carries `struck: true`) and `lore.js:66` (Law 11 is live, merely
outranked). §13.33. **Epistemic consequence: the Binder is shown 212 as a repudiated error rather
than a standing policy** — which flatly contradicts Oriel's "they painted it back inside the week."

**[CONTRADICTION] §G — the road 212 bricked is the road the Crown walks down.**

> `ch2.js:346` — "Behind the empty plinth, an archway **bricked shut** with newer stone" (+ `212` cut
> beside it, `scenes-ch2.js:100`)

against

> `ch5.js:602` — "The road down is wider than the stair, and older."
> `ch7.js:304` — "**Boots on the old road.** Lord Vane stops at the edge, with the Crown's soldiers
> behind him."

The Founders' road is sealed at the vault in Chapter II and is an open thoroughfare for an Envoy and
nine soldiers in Chapter VII. Nobody in the fiction — not Marrow, who knows the rebuild was dishonest;
not the Seer, whose gift is exactly this — remarks on it, asks where its other end is, or asks how the
Crown found it. **This is the mystery's single largest unclosed physical loop.** It is also nearly
free to close: one line from the Seer at T9 ("this is the other side of the bricks") converts P7 from
set-dressing into the chapter's arrival.

**[WITHHOLDING] §H — the number 212 is never spoken by anyone.** Established by grep: it exists on
the Hearth only as a carved numeral in `scenes-ch2.js:100`. Every character's knowledge of *when* is
therefore unevidenced, and the mystery's title date is a thing only the phones and the paint know.

**[CONTRADICTION] §I — two source comments assert a Hearth line that is optional.**

> `ch4.js:537-539` and `scenes-ch4.js:53-55` — "the count is not asked for, because **the Hearth
> printed it in Chapter II**" / "the Hearth said 'four, as one, went through' in Chapter II."

against `ch2.js:319`, which fires only on `CH2_NICHE` → `CH2_STRIP='right'`. §13.32. **A table that
took the Ember and left has never been told four-as-one on the shared screen**, and the ch4 tapestry
puzzle's difficulty is tuned as though they had.

---

## 3. WHERE BEHAVIOUR DOES NOT MATCH THE KNOWLEDGE STATE

Ruthless list. Each names the character, the beat, and the knowledge that makes it wrong.

**3.1 — Marrow recites the Order's translation to the Convocation, knowing it is false. T3.**

> `ch1.js:124` — "**The stone over your heads says one born of four.** Tonight I stop arguing and show
> you."

She can read that stone from its foot (`ch6.js:824`) and has been able to for decades. She is
standing under it, in the one room whose vote could overturn it, and she quotes the forgery as fact.
This is either the sharpest characterisation beat in the game or an error, and **the game never
signals which**. It is also the setup for a promise that is never kept — she shows nothing (§12.42).
**Recommendation:** keep it, and mark it — one clause of narration ("She says it the way the school
says it, which is not the way she reads it") converts a defect into the mystery's best plant.

**3.2 — Marrow does not debrief the Seer. T4.**

She sends four children under the school with the explicit instruction "take the Seer's eyes with
you; that vault was rebuilt once, and the rebuilding was not honest" (`ch2.js:189`) — i.e. she names
the gift, which means she already knows the falsification is **sub-floor**, which is operational
knowledge of the derangement she never claims anywhere else **[PROPOSED]**. At the top of the stair
she says one word: "The Ember." (`ch2.js:392`). A person who asked for evidence and does not collect
it is behaving as though she already has it — in which case sending them was theatre, and the game
never says so.

**3.3 — Marrow is present when the Hearth announces the Binder has the Law she lacks, and does not
react. T8.** `ch6.js:853`, two chapters after `ch5.js:399`. See §1.

**3.4 — Vane deploys as a private lever a thing he announced publicly in the same Hall. T3 vs T9.**
`ch1.js:138` vs `ch7.js:341`. If he told them, the paint is not leverage; it is a matter of record the
room is declining to remember. The scene as written needs the room's ignorance to be *feigned*, and
nothing says it is.

**3.5 — Oriel sits silent through the one public reference to the thing she took a knife to. T3.**
`ch1.js:137-139` vs `ch4.js:588`. She then prices her vote at "everything you find below, **even the
parts you don't like**" (`ch1.js:266`) — which is exactly the behaviour of someone who knows, and
which the chapter never lets anyone notice. Her silence is *characterful* and her price is
*diagnostic*; the narration's "Nobody knows what that means" is what breaks it. See §2 §B.

**3.6 — Wren quotes the Order's reading after the table has disproved it. T9.**

> `ch7.js:404` — "Right. Good. **That is what the stone says**, and I have had years to get used to
> it."

Reachable when `DECISION='WALK'` is chosen with `WALK_UNLOCKED` true — i.e. after `ch6_open` has
printed "Four went down. **Not one born of four**" (`ch6.js:839`) on the shared screen minutes
earlier. Wren's line is written for the pre-T8 state and plays in the post-T8 one. **Fix:** branch it
on `WALK_UNLOCKED` — *"That is what the stone used to say, and I had years to get used to that one."*

**3.7 — The Binder is never once asked to say the year out loud.** `companion/ch2.js:157` gives the
Binder the sentence that unlocks the mystery, in English, in Chapter II. The house rule is "**Say what
you see**" (`lore.js:74`). The `ch2_door` puzzle asks the Binder only for *which rule binds* — the
date is decoration on the way to an answer, and no other seat, character or scene ever asks for it.
The one person in the fiction holding the date has no occasion to speak it for six chapters. **This is
the mystery's biggest structural withholding, and it is a scene-design problem, not a character one.**

**3.8 — Nobody reacts to the bell-chamber wall. T9.** `ch7.js:303` — the tapestry's true image, carved
openly, four hundred years old, in the room where the Finale happens. At T6 the same image had to be
*scraped out from under an overpaint*. Four characters who spent Chapter IV proving the picture was
forged walk past the unforged original and say nothing. §12.50 gives the in-world answer in one line
("nobody the Order could send goes down there") and no character delivers it.

**3.9 — Marrow watches the Seer scrape the tapestry and does not say she did it too. T6.**
`ch4.js:608-609` — "She sees the tapestry, and stops in the doorway. / 'So. The Seer.'" Her own line
about scraping it (`ch7.js:394`) exists and is gated three chapters later behind `OATH_KNOT` **and**
`TAPESTRY` **and** a specific option. This is defensible withholding — but the game never pays it
off on most branches, so on most branches it reads as the author not having written the reaction.

**3.10 — The four never tell Oriel.** `ch1.js:266` — she pays her vote for "all of it." `ch2.js:390` —
"She has come to be told," and the scene ends. No ending, on any branch, discharges it (§12.58).
Behaviour of four characters who were asked in public whether they keep their word (`ch7.js:494`) and then do not
keep an earlier one, unremarked.

**3.11 — The Convocation is never told that Law 0 was restored and enacted.** `ch7.js:726` prints
"Law 0. Restored." to the players. The body that struck it does not reappear after ch7 (§12.30). On
E0 the Law is *written* and the institution that forbade it never learns. For a mystery whose subject
is an institution, **the institution has no final knowledge state at all.**

---

## 4. BRANCH SENSITIVITY

### 4.1 The flags that move this mystery

| flag | set at | what it changes in the table above |
|---|---|---|
| **`TAPESTRY`** | `ch4.js:554` | **The largest single lever.** With it: P8 enters the shared screen at T6; Vane is retro-confirmed (`ch4.js:557`); Wren's P9 belief cracks at T6; the `tapestry` argue option exists at T9; `ch7_wall` reads "the Hearth turns it round" instead of "the Seer takes four hundred years of soot off the wall." **Without it, P8 is never on the Hearth before T9, and Wren's belief about the stone survives untouched until T8** |
| **`ORIEL`** (the ch1 *promise*) | `ch1.js:261-268` | Gates Oriel's note (with the `chair` corner) — the **only** evidence that 212 is maintained rather than historical. Also **by itself restores Law 0** at T6 (§13.17). Also suppresses Marrow's unsent letter |
| **`ORIEL_NOTE`** | `ch4.js:586` | The note actually found. **Not** what `computeLaw0` reads — see §2 §D |
| **`CH2_NICHE` → `LETTER` → `LETTER_READ`** | `ch2.js:296`, `:324`; `ch4.js` desk | Mere's sheet, translated at **T7** (`companion/ch4.js:71`). Gives the Reader P2's price in the Founders' own voice. Restores Law 0. **`CH2_NICHE` is written and never read** — finding Mere changes nothing mechanically (Appendix A) |
| **`CH2_STRIP='right'`** | `ch2.js:319` | The only Hearth statement of "four, as one, went through. **Not one**" before T8. Two source comments assume it fired (§2 §I). On `'left'` or on skipping the niche, the table's first shared-screen four-as-one is **Chapter VI** |
| **`OATH_KNOT`** | `ch4.js:735` | **Gates `ch7_argue1` entirely** (`ch7.js:375`). ⇒ On any non-KNOT path — EMBER, `OATH 0`, or `REFUSED_OATH` — **P10 is never spoken by anyone on any surface in the whole game**, and neither is Marrow's scraping. The mystery's motive is a KNOT-branch fact |
| **`FINALE_WALL='wall'`** → `VANE_ALLY` | `ch7.js:332` | Vane's twenty-two years are spoken; his P8 knowledge gets a history. On `'nothing'`, Vane's knowledge of the cover-up is **never explained**, and he simply wins (E4) or is refused |
| **`VANE_ACCEPT`** | `ch1.js:288-292` | Suppresses Marrow's unsent letter (`hasMarrowLetter`, `ch4.js:81`) and therefore the "thing I have never named to you" line — her withholding-from-the-nine goes unevidenced |
| **`VOTE_LOST`** | `ch1.js:212` | Wren is taken; **`ch1.js:306` ("Seer, what is *on* that wall?") does not fire** — Wren's ignorance of P8 is never established in Wren's own mouth. Sorrel/Oriel prices never happen ⇒ no `ORIEL` route to Law 0 ⇒ Law 0 reaches T6 only via `TAPESTRY` or `LETTER_READ` |
| **`STONE_TOLD`** | `ch6.js:815` | The four *receive* P9's disproof instead of deriving it. Content identical; **authority is not.** Marrow says "And I read it, not you" (`ch6.js:861`) — the mystery's answer arrives as a rebuke, and the Finale starts two minutes short |
| **`LAW0`** | `ch4.js:85`, `ch5.js:8`, `ch6.js:814` | Whether COLD is placeable at the Silent Gate (T7) and in the eighth socket (T9). Always true by T8 |
| **`ENDING`** | `ch7.js:239-247` | The Binder's final Law 0 card: **WRITTEN** (0) / RESTORED (1–3) / **STRUCK, AGAIN** (4) (`companion/ch8.js:309`) |

### 4.2 The worst-case path for this mystery

`VOTE_LOST` (no Oriel, no Sorrel) · `ember` at `ch2_opened` (no niche, no Mere, no strip, no rubbing) ·
tapestry corner unopened or failed · oath EMBER or refused · `FINALE_WALL='nothing'` · `STONE_TOLD`.

On that path the table reaches the Epilogue having learned, about 212:

- that a floor was rebuilt and the statues put back wrong (Seer's phone, T4);
- that a Law dated 212 loses to a Founders' Law (Binder's phone, T4 and T7);
- that a numeral `212` is carved beside a bricked arch (a picture, T4);
- that the stone says four, because the Provost read it to them (T8);
- and, **only if the Binder taps an opt-in block on their own phone**, the whole of P1–P5.

**P8 is never seen. P10 is never said. Oriel's maintenance is never found. Mere is never named. Vane's
history is never told.** The mystery is technically solvable and dramatically absent. **[UNEARNED] in
reverse**: the T8 reveal lands on a table that has had almost nothing to be curious *with*.

### 4.3 The best-case path

`!VOTE_LOST` · `ORIEL` promised · `niche` → `CH2_STRIP='right'` → `LETTER` → `LETTER_READ` ·
`TAPESTRY` scraped · `chair` corner opened (⇒ `ORIEL_NOTE`) · oath **KNOT** · `FINALE_WALL='wall'` ·
stone solved.

Every P except P1/P5 reaches the shared screen; P1–P5 reach the Binder's Book; Marrow speaks P10 and
her own scraping; Vane speaks his twenty-two years; Mere's sheet and Oriel's note corroborate from
two directions four hundred years apart. **This is the version the mystery is designed for, and it
requires eight independent choices to go right.**

### 4.4 The table's own knowledge, by spine point (cross-reference for `PLAYER-MODEL.md`)

| | what the **shared screen** has said about 212 | what is on **phones only** |
|---|---|---|
| T0–T1 | — (the art caption `THE ORDER'S READING`, unread by anyone) | Binder: Law 0, struck, "by the Convocation, 212" |
| T2 | — | Binder: unchanged |
| T3 | "what is under the paint", twice; "Nobody knows what that means" | — |
| T4 | the floor is newer; an arch bricked with newer stone; the numeral **212**; *(opt.)* Mere's name and the strip | **Seer: the derangement. Binder: "the newer one was written in 212 — the year this room was rebuilt."** |
| T5 | "four went down" (portraits) | Binder: the ward's stratum contradiction |
| T6 | *(TAPESTRY)* four figures, no child; "So he had"; *(ORIEL)* "they painted it back inside the week" | Binder: Law 0 flips to RESTORED, silently |
| T7 | "That is not in the Book I was given" | Binder: Year 0 vs Year 212 plate; **two oaths sworn in 212**. Reader: *(LETTER)* Mere's sheet |
| T8 | the stone read; "Four went down. Not one born of four"; "the fire is only what they left behind" | **Binder: P1–P5, opt-in.** "Same ink, same hand." |
| T9 | *(KNOT)* "They could not afford four Masters, so they made it grammar"; *(wall)* "Twenty-two years"; the uncovered wall carving | — |
| T10 | "The rest is never carved" (which is Law 6) | Binder: the Law's final state |

---

## 5. SUMMARY OF FLAGS RAISED

| tag | count | the two that matter most |
|---|---|---|
| **[CONTRADICTION]** | 9 (§2 A–I) | **§A** Marrow is surprised by a Law whose history she recites; **§G** the bricked road is the road Vane walks down |
| **[INCONSISTENCY]** | 11 (§3.1–3.11) | **§3.1** Marrow quotes the forgery to the Convocation; **§3.7** the Binder is never asked to say the year |
| **[WITHHOLDING]** | 3 (T1; §2 §H; §3.7) | the number 212 is never spoken by any character on any branch |
| **[PROPOSED]** | 14, marked inline | Marrow's operational knowledge of the derangement (§3.2); Oriel's choice of Marrow's chair |
| **correction to `CANON.md`** | 1 | §9.1's "Wren knows the stone's true reading… since: years" misreads `ch7.js:404`. **Wren does not know it before T6.** |
