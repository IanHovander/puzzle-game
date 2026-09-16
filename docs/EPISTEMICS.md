# EPISTEMICS — *What the Fire Keeps*

> ## ⚠ TOTAL SPOILERS
> Every reveal in the game, including the Prologue's, the Finale's and all five endings. This is a
> working document for the author and collaborators. Do not show it to a player, a host, or anyone who
> has not finished.

**What this document is.** Who knows what, when, and what they think everyone else knows — per
mystery, across the revelation spine, with nested belief. It is the **belief** layer. Ground truth is
`CANON.md`; the reader's head is `PLAYER-MODEL.md`. Where a character is *wrong*, this document says
so and sends the truth to `CANON.md` rather than re-arguing it.

**How to use it.**

| if you are… | go to |
|---|---|
| writing a scene and want to know what the gap in the room is | **§3, the master asymmetry map** — one page, one row per pair |
| writing a specific chapter | §3's "exploited at" column, then the matching mystery in §4 |
| checking whether a character may say a thing yet | the mystery's **movement table** in §4 (T0–T10, channel, gate) |
| writing dialogue and want the voice | **§5, personae** |
| fixing defects | **§6**, the consolidated register, sorted by severity |
| making a ruling before more writing happens | **§7**, the undecided register |

**Layer discipline, and it is absolute.** Truth ≠ belief ≠ what the player is led to believe. A cell
here records only *who holds a proposition and how*. Inference not in the source is **[PROPOSED]**.
Flags follow `CANON.md`: **[CONTRADICTION]**, **[WITHHOLDING]**, **[UNEARNED]**, **[GAP]**,
**[WRONG]**, **[THIN]**.

**Two standing rulings this document applies throughout.**

1. `REFUSED_OATH` is treated as **unsworn**, never as *refused* — a failed wax closing writes the same
   flags as an outright refusal and nothing downstream can tell them apart (`CANON.md` §13.16;
   `ch4.js:728-729`).
2. `lore.js:44` is the canonical whisper-truth table; `ch6.js:327`'s `ECHO` disagrees for the Binder
   and loses (`CANON.md` §13.21).

---

## CONTENTS

- **§1** — [The short truth, and the shape of the ignorance](#1--the-short-truth-and-the-shape-of-the-ignorance)
- **§2** — [How to read the tables](#2--how-to-read-the-tables)
- **§3** — [**The master asymmetry map**](#3--the-master-asymmetry-map)
- **§4** — [Per mystery](#4--per-mystery)
  - [M1 · The Cold](#m1--the-cold--what-it-is) · [M2 · The Hearth](#m2--the-hearth--what-it-is-and-what-it-costs-to-keep) · [M3 · Wren](#m3--wren--the-four-anomalies) · [M4 · Marrow](#m4--marrow--what-she-knows-and-when-she-decided) · [M5 · Vane and the Crown](#m5--vane-and-the-crown) · [M6 · The prophecy](#m6--the-prophecy--what-the-stone-says) · [M7 · The Founders](#m7--the-founders--what-they-did-and-what-it-cost) · [M8 · Year 212](#m8--year-212) · [M9 · The Sightings](#m9--the-sightings--what-they-are-why-four-and-what-walking-costs)
- **§5** — [Personae](#5--personae)
- **§6** — [**[INCONSISTENCY] register**](#6-inconsistency-register)
- **§7** — [**[UNDECIDED] register**](#7-undecided-register)
- **Appendix A** — [Branch → knowledge index](#appendix-a--branch--knowledge-index)
- **Appendix B** — [The partition, as one table](#appendix-b--the-partition-as-one-table)

---

# 1 · The short truth, and the shape of the ignorance

Four hundred years ago four people wrote the cold glyph with four hands — a thing only four hands can
do (`lore.js:57`) — went down into the wound together, closed it, and came back **grey**: their Sight
spent (`companion/ch4.js:62`). What they left on top is the Hearth, and the Hearth **is them** —
"the fire is only what they left behind" (`ch6.js:839`). Four people's worth of fire, four hundred
years to spend it in; that is the whole answer, and nobody did anything wrong (`ch6.js:850`).

In Year 212 the seal failed. Paying again meant four Masters giving up their Sight. The Convocation
would not pay it, struck Law 0 **"and called it grammar"**, sent one Warden down alone, rebuilt the
vault, bricked the road, painted one figure over four, and taught the school to read *one born of
four* on a stone that says *four, as one* (`companion/ch6.js:286-287`; `ch6.js:827`).

Fourteen years ago the fire guttered for one night and left a child on the stones. Wren is the hollow
— the eighth glyph, the word that is never written. **The four can write it.**

### The shape of the ignorance, in five sentences

1. **The truth is present from line one and immediately buried.** `ch0.js:49` says four people closed
   a wound; `ch0.js:62-63` teaches the forgery. Everything after T1 is the four walking back to a
   sentence they were given before they had any reason to keep it.
2. **One adult holds the complete account and releases it in five instalments**, each exactly as much
   as the next puzzle needs (§4/M4).
3. **The answer is partitioned the way the puzzles are.** The *act* is on eleven surfaces; the
   *price* is on one phone, on an optional branch; the *motive* is behind an opt-in tap on a different
   phone (§4/M9.0).
4. **The subject of the mystery knows the answer and says nothing** — Wren's knowledge state is
   identical at T0 and T9, which is the game's best structural joke and is never pointed at.
5. **Nobody upstairs ever learns anything.** On five endings out of five the Convocation, the Order
   and the school end the night exactly as ignorant as they began (§6/E38).

---

# 2 · How to read the tables

### 2.1 The six layers

Every state cell in §4 carries these, in this order. A claim sourced from the wrong column is a leak.

| layer | the question it answers | may be sourced from | may **never** be sourced from |
|---|---|---|---|
| **Knows** | holds it as fact, from a channel that could confirm it | NARRATION, a Sighting's factual block, a DOCUMENT they have read, their own first-hand act | their own claim about themselves |
| **Believes (confidence)** | holds it without a confirming channel | their speech, their unprompted acts, what they act on | narration's verdict |
| **Wrong about, and why** | the specific false belief, and its cause | the divergence between the two above and `CANON.md` | — |
| **Believes about others (nested)** | what A thinks B knows; and where marked **two-level**, what A thinks B thinks about A | how A addresses B, what A pre-empts, what A declines to say to B | what B actually thinks |
| **Withholding — from whom, why, kind** | the concealment, its target, its motive | refusals, deflections, the pages that say "you have never said this" | inference from motive alone |
| **Would say if asked directly** | the sentence they would actually produce | their own register (§5) | — |

**Withholding kinds**, used throughout: `[protecting them]` · `[protecting self]` · `[institutional]`
· `[no words for it]` · `[assumes known]` · `[no channel]` — the last meaning the game gives the
character no surface on which to say it, which is a design fact, not a character fact.

**Confidence vocabulary**: **certain** (would stake the night on it) · **firm** (would act on it,
would not argue for it) · **held** (believed, actively not examined) · **suspected** (entertained,
unacted-on) · **unformed** (never had the thought, has no words for it).

### 2.2 The spine — T0 to T10

All tables key to these. Nobody invents their own.

| id | when | what is revealed | who is even present |
|---|---|---|---|
| **T0** | before play | nothing; the state the world is in when the game opens | — |
| **T1** | ch0 cold open + prophecy stone | the Hearth, four hundred years, the night it guttered, the baby, the prophecy in the Order's translation | the table only; **no character's state moves** |
| **T2** | ch0 lamp lit → the four speak | the lamp lights the old way (ASH, EMBER, **four hands**); the four each name aloud the anomaly they have privately carried; Wren confirms all four | the four + Wren. **Marrow and Vane never learn what happened in this room** |
| **T3** | ch1 | Vane's writ; "I have seen what is under the paint"; the vote; Marrow watches Wren, not the fire; the Cold Ember named | everyone except the Founders |
| **T4** | ch2 | the Founders' Door; the Vault; the Cold Ember; the bricked road and **212**; *(opt.)* Mere's niche and the rubbing | the four, Wren, Marrow at both ends |
| **T5** | ch3 | the corridors; the laundry; Wren's four whispered questions and the four private answers | the four, Wren, Bess, the captain |
| **T6** | ch4 | the study's four secrets — journal, memory-bell, tapestry under the paint, the grey thread; *(opt.)* Mere's rubbing read; the Warden's Oath and its lock | the four, Wren, Marrow |
| **T7** | ch5 | Mere's gates; the Under-Marches, the drowned First Hall, four thrones; the Founders' Count; the stair choice | the four, Wren, Marrow |
| **T8** | ch6 | the Bells; the Second Asking; Marrow's confession; **the prophecy stone read from its foot**; Law 0 restored | the four, Wren, Marrow. **Vane and the nine are absent for the reveal** |
| **T9** | ch7 | Vane at the chamber's edge; *(opt.)* the wall shown to Vane; the Decision; the Great Sigil; the Binding; COLD written by four hands | everyone who is left |
| **T10** | ch8 | the ending reached, and the epilogue | branch-dependent; §6/E38, E40 |

### 2.3 Branch notation

Branch-sensitive rows carry their flag in `SMALL CAPS`, per `CANON.md` Appendix A:
`VOTE_LOST` · `SORREL`/`ORIEL`/`NEITHER` · `VANE_ACCEPT`/`VANE_PRETEND` · `WREN_HURT` ·
`WREN_SCARED` · `SURRENDERED` · `DOOR` · `LETTER`/`LETTER_READ` · `TAPESTRY` · `MEMORY` ·
`JOURNAL` · `GREY` · `ORIEL_NOTE` · `MARROW_LETTER` · `OATH` 0/1/2 + `OATH_KNOT` · `REFUSED_OATH` ·
`STAIR` HOLD/COLLAPSE/RUN · `EMBER_LOST` · `LAW0` · `WALK_UNLOCKED` · `STONE_TOLD` · `VANE_ALLY` ·
`DECISION` · `ENDING` 0–4.

**A fact true on only some paths is not canon — it is a branch fact.** Appendix A indexes every flag
by what it moves in someone's head.

---

# 3 · THE MASTER ASYMMETRY MAP

*The page to write from.* One row per pair that matters. **"The gap"** is the single most productive
knowledge difference between them — not the largest, the most *writable*. **"Best exploited"** names
the beat that already spends it; **"unspent"** names the cheapest beat that does not.

## 3.1 The five engines

These five carry the game. Everything in §3.2 is secondary to them.

| # | pair | **the gap** | why it is productive | best exploited | unspent |
|---|---|---|---|---|---|
| **A1** | **Marrow ↔ the four** | She holds the complete true account from before T0 — the wound, the count, the price, the cover-up, and the ability to read the stone in thirty seconds — and releases it in **five instalments**, each sized to the next puzzle | **Total** (she has all of it, they have none), **operational** (every scene is an instruction whose reason she withholds), **mechanised** (the gift partition and the house rule mean a sensible player *cannot* dissolve it by asking), and **morally live in both directions** — she is wrong to withhold and right that telling would cost her the night | **ch2** `ch2.js:189` "that vault was rebuilt once, and **the rebuilding was not honest**" — the pointer with the noun removed; **ch5** `ch5.js:249-250` premise, crisis and plan with the cause and price cut out; **ch6** `ch6.js:823-824` she lets four readings burn and then does it herself | **ch7's Decision.** She has the sentence — "They could not afford four Masters" (`ch7.js:396`) — and never finishes it into a price. One line converts the Decision from a count into a bill. §6/E3, E27 |
| **A2** | **Marrow ↔ the Binder** | She has the **motive** and not the **Law**; the Binder has the **Law** and not the motive — and has had it, in writing, dated, attributed, since the Prologue (`lore.js:57`, `learned:'ch0'`) | The only pair where **each holds exactly what the other needs**, each is wrong about what the other has, both are on stage together in five chapters, and closing it would change the ending. It also pays both arcs at once: her confession is "**I should have asked anyone**"; the Binder's private line is "**you decided long ago not to look**" — the same failure from two seats | **ch5** `ch5.js:399` "That is not in the Book I was given." — the only place the two Books are side by side, and the Binder does not answer | **The answer.** "It's in mine, Provost. It's been in mine since the dormitory." One line; the Chair learning a fourteen-year-old's book outranks hers is the political thesis of the game. §6/E4, E21 |
| **A3** | **Wren ↔ the Listener** | Wren has held the exonerating sentence — "It wasn't a fault in you. **There wasn't one to hear**" — since before the game, while the Listener has been privately, continuously certain they are defective | The only gap whose silence **costs the other party something in every room, for six chapters**, and where the cost is visible to the player on a phone the withholder cannot see. It also carries the mechanism: the Listener's gift is the one that reports *absence as absence*, which is what a hollow is | **ch6** `ch6.js:320` — the reply to a kind lie: "That was kind. It was not true, and **I would rather have had the true one**"; **ch7** `companion/ch7.js:246` "Nine people in this chamber, and **eight hearts**" | **ch4's memory-bell** — a *device* reproducing the Listener's result ("keeps every voice in this room but one", `companion/ch4.js:227`) and nobody, including the Listener, says "then it is not my ear" |
| **A4** | **Vane ↔ the Seer** | Vane knows exactly what is under the paint, **cannot show it**, and names the one person in the building who can — a fourteen-year-old who at that moment can see only *that* something is there, **not what** | A gap in **capacity**, not candour — rarer and better, because the player experiences it as frustration with their own gift rather than a character being coy. It closes on a **puzzle**, not a cutscene; and it is the only asymmetry the player can choose to close **in the antagonist's favour**, which deletes the worst ending | **ch1** `ch1.js:283` "Ask your **Seer** what is under the paint" → **ch4** `ch4.js:554-557` the Seer closes it aloud on a two-try budget and the Hearth ratifies him: "**So he had**" → **ch7** `ch7.js:337-342` | **ch6's solved stone.** The chapter that proves his life's claim in full **never names him**. One line converts T9 from a button into a vindication |
| **A5** | **Wren ↔ the four (as a body)** | Wren has known all four anomalies "for years", knows which seat carries which, knows who lied in the laundry, and has a running model of what each of them has learned and when — and has never once told them what the four absences *add up to* | Not an information gap in the usual sense: it is a **withholding of a conclusion**, performed protectively, by a fourteen-year-old who has decided the four should not have to carry a request. It is also where every one of the game's four private channels lives | **ch0** `ch0.js:226` "Yes. All four of you. I've known for years"; **ch3** the laundry; **ch6** the Second Asking; **ch8** four letters that can be read once | **The conclusion itself.** All four legs are on the table at T8 and nobody joins them; Wren says "It's me" at T9 and "**Nothing here looks surprised**". §6/E6 |

## 3.2 The rest of the map

| pair | **the gap** | exploited at | note |
|---|---|---|---|
| **Wren ↔ Marrow** | **Not a gap — a shared silence.** Both know; neither says; the drama is tenderness, not tension. Wren has known "since the laundry" (T5) and gives her *permission* rather than extracting a confession | `ch6.js:689-692` — "Tell them. **You are allowed.**" and the reply told **kneeling**, without looking up | The one thing genuinely withheld both ways: **Wren's grievance** (never billed, on any ending — §5/P7) and **her fear** (legible only to the Listener) |
| **Vane ↔ Marrow** | Symmetrical: he has the picture, she has the sentence; each knows the other knows; **neither will say it** | `ch1.js:137-139` — the lever at half-volume, her given name, and "Nobody knows what that means. **Her face does.**" | The best *scene*-level gap and a poor engine: it fires exactly twice and he is offstage for four chapters. §6/E22 — both scraped the same paint and neither ever acknowledges it |
| **Vane ↔ the Listener** | She alone knows the Envoy is **frightened** (`companion/ch1.js:116-117`) and alone hears what the Crown actually wants (`companion/ch4.js:213`) | nowhere | **Half-built and squandered.** Neither is a puzzle input; no scene ever asks the Listener for either. If the author wants a second spine for Vane, this is it |
| **Vane ↔ the Binder** | The Binder can read Vane's position and intent **through a floor** at T4 — and cannot see him at all from across a room at T9 | `companion/ch2.js:169` | §6/E47. The Binder is the only seat that could answer *who else benefits* in the Finale, and the Finale does not ask |
| **Marrow ↔ the Convocation** | She has **never named the thing below to the nine** and is going down without telling them | `ch4.js:592`, branch `NEITHER && !VANE_ACCEPT` only | The only surface before T8 on which her withholding is visible **as** withholding, and it is on the least-taken branch |
| **Marrow ↔ Mere** | Marrow models herself on a woman whose defining recorded act is **offering to go alone and being refused** — and has arranged fourteen years so that nobody can refuse her | `ch5.js:395` "**Mere. Forgive me. There is a child on this stair.**"; `:553` "I will not choose. Mere would not have either" | Never joined. Marrow breaks two of Mere's gates while quoting her, and the parallel is free and missing |
| **Wren ↔ the Reader** | The Reader holds the one thing Wren has ever asked anybody for — the name, "**properly. Not the Provost's version**" — and cannot read it until ch4 | `companion/ch3.js:284` → `companion/ch4.js:202-204` → `ch6.js:667` → `ch7.js:699` | On E2 the Reader is the only person alive who can spell it for the mason **and does not offer** (`ch8.js:332`) — narrated, not chosen |
| **Wren ↔ the Seer** | The only seat asked directly, twice, that can refuse twice — and the only one Wren thanks "**for both**" | `ch1.js:306` → `companion/ch3.js:292` → `companion/ch8.js:112` | The cleanest *choice* in the game. §6/E42: the thanks fires on every branch, including the one where the Seer never told |
| **Wren ↔ the Binder** | The seat that reads bindings cannot say whether Wren is the one; the seat that reads threads finds none | `ch6.js:673-678` "None. **Not unbound. The knot itself.**" | The Binder's Book **pre-announces this answer from the Prologue**, ungated (`book.js:131`) — §6/X18 |
| **Oriel ↔ the four** | She buys, in advance, everything they will find below — "**All of it. Even the parts you don't like**" — and is never paid | `ch1.js:256` → `ch2.js:390` "She has come to be told" → *scene ends* | §6/E28. The only Master who tries to enter the epistemic chain at all |
| **Oriel ↔ Vane** | Both took a knife to the same paint, decades apart; **neither has any model of the other**; on `ORIEL` she is standing at the edge when he confesses | `ch4.js:588` vs `ch7.js:341`, `ch7.js:60` | Free three-way irony, never taken |
| **Sorrel ↔ Marrow** | Sorrel has predicted the Chair's errand and its couriers before the Chair has decided them | `ch1.js:255` vs `ch1.js:310` | Logged as a contradiction (§6/X20) and **better read as characterisation**: Sorrel has predicted this Chair correctly for years |
| **the four ↔ each other** | Each believes the other three regard its gift as complete, and protects that belief by silence — which the lamp falsifies in the Prologue and nobody notices | `ch0.js:217-218`, in seat order | Three of the four seats are told **nothing** about what the others think of them, in nine chapters. §5.4b **[GAP]** |
| **the Listener ↔ Marrow** | The Listener is the only person in the school who knows the Chair is afraid, and has no surface on which to say it | `companion/ch1.js:118`; `companion/ch6.js:251` | Every heartbeat prompt in the game is about Wren. Not one is about her |
| **Bess ↔ everyone** | The one adult in the building who **chooses not to know** — sworn to Marrow for thirty years, and she does not look up | `companion/ch3.js:238`; `ch3.js:500` | Structurally the school's whole relationship to the mystery, in one silent woman |
| **the captain ↔ the four** | He knows the offer **word for word** and "**cannot know how you answered**" | `ch3.js:393`, `:399` | The only character in the game whose ignorance is stated as a rule and honoured |
| **the Crown ↔ everyone** | Offstage all game; never speaks; **every statement of its aims is Vane quoting it** | `companion/ch4.js:213` | And why it wants **Wren** rather than the Cold is never given, anywhere. §7/U12 |

## 3.3 The two-deep cells worth writing to

The author asked for nested belief. These are the cells where the *second* level does work.

| cell | content | where it pays |
|---|---|---|
| **Wren → the four → Wren** | Wren believes each of the four thinks **the other three noticed nothing** — which is true, and is exactly what the lamp breaks | `ch0.js:220-227` |
| **Wren → Marrow → Wren** | Wren believes Marrow believes Wren does not know the origin — and **lets her believe it** until giving her leave | `ch6.js:689` |
| **Marrow → Wren → Marrow** | She believes Wren thinks of her as a mother first. She writes "**it**" in a private journal | `ch4.js:211` |
| **Marrow → the nine → Marrow** | She believes the nine would refuse the true price, as their predecessors did — **and has never tested it**; the letter is unsent | `ch4.js:592` |
| **Vane → Marrow → Vane** | He believes she believes the lever will work; it is why he lowers his voice "**not far enough**" | `ch1.js:137` |
| **the four → Marrow → the four** | They believe she believes the prophecy. **She does not.** This is the gap in its purest form, at its widest | `ch1.js:124` vs `ch6.js:824` |
| **the Listener → the Binder** *(and mirrored)* | Each assumes the other's gift is working and would have said if it were not. **Both are wrong, in the same direction, for the same reason, on the same page** | `companion/ch2.js:134`, `:165-166` |
| **Wren → the Reader → Wren** | Wren believes the Reader thinks Wren does not know the true meaning of Wren's own name — and asks for it anyway, phrased to exclude the Provost's answer | `companion/ch3.js:284` |
| **Mere → posterity** | She believed a later body would try to overrule the Founders, and legislated against it **in Year 0** — and was right by Year 212 | `lore.js:60` |
| **the 212 Convocation → posterity** | It believed striking a Law removes it. **The Book still carries Law 0, struck and dated, four hundred years later** | `lore.js:57` |

---

# 4 · PER MYSTERY

Nine mysteries. Each carries: a **proposition ledger** (the codes every cell refers to), a **movement
table** (T0–T10: what enters whose head, on which surface, behind which gate), the **nested cells**
that matter, the **driving gap**, what is **untapped**, and the **branch headline**.

**Deduplication rule.** Where two mysteries cover the same ground, the fact has exactly one home and
the others cross-reference it. The homes are:

| fact | home | cross-referenced from |
|---|---|---|
| four, not one — the count | **M6** (the prophecy) | M1, M2, M7 |
| the price — a Sighting, permanently | **M9** (the Sightings) | M2, M7 |
| the motive — 212's refused bill | **M8** (Year 212) | M1, M2, M6, M7 |
| Marrow's five-instalment disclosure ladder | **M4** (Marrow) | M1, M2, M6, M7, M9 |
| the four anomalies and what they add up to | **M3** (Wren) | M1 |
| Law 0's four restoration routes | **M8**, and §6/E15 | M1, M6, M7 |
| the Cold Ember's unverified function | **M1** | M2, M4 |

---

## M1 · THE COLD — what it is

**Scope.** Its nature, location, history, price, its relation to the Hearth and its relation to Wren.
Wren's *identity as a character* is M3; it enters here only as **K11**, because "what is the Cold" is
unfinished without it.

### M1.0 Proposition ledger

| # | proposition | tier / cite |
|---|---|---|
| **K1** | The Cold is **a place**, under the school, not weather | NARRATION `ch0.js:64`; `ch6.js:471` |
| **K2** | It is a **wound** — opened, not natural | NARRATION `ch0.js:49`; CLAIMED BY Marrow `ch5.js:249`; gloss `glyphs.js:18` |
| **K3** | **Four people closed it in Year 0**, writing the cold glyph with four hands, going down together | DOCUMENT `companion/ch4.js:62`; NARRATION `ch6.js:827-828` → **M6/M7** |
| **K4** | Walking into it **spends the walker's Sight permanently** | DOCUMENT `companion/ch4.js:62`; NARRATION `ch8.js:287` → **M9** |
| **K5** | The Hearth is the lid, and the Hearth **is the four Founders** | NARRATION `ch6.js:839` → **M2** |
| **K6** | It is dying because **four people is a finite quantity of fire** | CLAIMED BY Marrow `ch6.js:850` → **M2** |
| **K7** | Cold and Hearth are **one substance, opposite sign** — one shape inverted, one draw function | ART `scenes-ch0.js:7-8`; `glyphs.js:17-18` |
| **K8** | **212**: the seal failed; the price was four Masters' Sight; the Convocation refused | DOCUMENT `companion/ch6.js:286-287` → **M8** |
| **K9** | The stone says **"four, as one"**, not "one born of four" | NARRATION `ch6.js:827-828` → **M6** |
| **K10** | **COLD is a writable glyph and takes four hands** — Law 0, struck | DOCUMENT `lore.js:57` |
| **K11** | **Wren is the Cold, or of it** — the hollow, the eighth glyph, never written | CLAIMED BY Wren `ch7.js:697`; ART `scenes-ch7.js:87`; caption `ch8.js:499` → **M3** |
| **K12** | Things of the Cold share a signature: **no heartbeat, no thread, a shadow that falls toward fire** — the Ember and Wren both | PHONE `companion/ch2.js:134`, `:150`, `:165-166` |
| **K13** | It **pushes**, and it **"knows"** when somebody kneels on the lid | CLAIMED BY Marrow `ch6.js:486-488` |
| **K14** | It can be **harnessed instead of closed** — the Crown's aim | CLAIMED BY Vane `companion/ch4.js:213` → **M5** |
| **K15** | The **Cold Ember** is a piece of it, and "if the Hearth goes out, the Ember lights it again" | CLAIMED BY Marrow **only, uncorroborated anywhere** `ch1.js:309`; `ch2.js:188` |
| **K16** | **What a "wound in the world" mechanically is** | **NOBODY IN THE GAME EVER KNOWS THIS.** §7/U1 |

### M1.1 Movement table

| T | what moves | for whom | surface | gate |
|---|---|---|---|---|
| **T0** | K1–K2, K5, K8, K9, K12-about-Wren, K13 | **Marrow** (complete, private) | — | — |
| | K11, in the only form Wren has words for | **Wren** | — | — |
| | the negative half (the school's story is a forgery) + K14 | **Vane** | — | — |
| | K8 in the **present tense** — "they painted it back inside the week" | **Oriel** | — | `ORIEL_NOTE` later |
| **T1** | K1 and K3 stated in the **first two lines of the game**; then the Order's sentence taught fifteen lines later | the table | Hearth | none |
| **T2** | COLD's shape and gloss — "the cold; the wound; **a hollow**" | **Reader** | Book | none |
| | COLD has **no ladder step and no pitch** — it is the rest | **Listener** | Ladder | none |
| | **K10 entire, as a dated struck Law**, plus one clause of K8 | **Binder** | Book, `lore.js:57` | none — **and no channel to say it until T7** |
| **T3** | K15 as an assertion from the highest authority in the building | the four | Hearth `ch1.js:309` | none (`VOTE_LOST`: `:245`) |
| | *that* there is a shape under the hall's paint, not what | **Seer** | phone `companion/ch1.js:132` | none |
| | the Chair's heart **skipped twice, looking at Wren, not the fire** | **Listener** | phone `:118` | none |
| | Wren has **no thread in front of nine Houses** — "Not unbound. **Something else.**" | **Binder** | phone `:145` | none |
| **T4** | the Ember: no heat, blue, breathing, **leans toward whoever holds it**; the bricked arch stamped **212** | the four | Hearth + art | none |
| | **K12, drawn twice on one page**: the Ember's flat trace beside Wren's | **Listener** | `companion/ch2.js:134-135` | none |
| | **K12 again**: "It is a stone, and stones are not bound. / Wren: **the same nothing**" — and the page forbids the inference | **Binder** | `:165-166`, `:169` | none. **ch2 has no SPEAK tab** (`:104`) |
| | the shadow transfers from **warmth to cold** — Wren's reaches for the Ember, with no lamp | **Seer** | `:150` | none |
| | **K9 + K3, four chapters early, on the Hearth** | the table | `ch2.js:319` | `CH2_NICHE` → `CH2_STRIP='right'` |
| **T5** | nothing new about the Cold; the portraits mutter "***four went down***" | **Listener** | `ch3.js:440` | none |
| **T6** | **K3, K9, K10 in one image** — four figures, no child, the fourth writing an inverted fire in cold blue | **Seer** → the table | `ch4.js:536-537`; art | `TAPESTRY` |
| | **K14 in Vane's own voice**, + "Then the Crown will go through me. **And through it.**" | **Listener** | `companion/ch4.js:213` | `MEMORY` |
| | **WRENN = the hollow of a bell**, in Marrow's hand, on the Vigil roll | **Reader** | `companion/ch4.js:202-204` | `JOURNAL` |
| **T7** | **K1, K2, K5 stated by an adult for the first time** — four sentences, every one true | the four | `ch5.js:249-250` | none |
| | they **see** it: "under all of it, glowing like a sky from beneath" | the four | `ch5.js:348` | none |
| | **K3 + K4 + K10 in a Founder's own voice** — "we wrote the cold glyph with four hands, and **came up grey**" | **Reader alone** | `companion/ch4.js:62` | `LETTER_READ` **and** `maxChapter>=5` |
| | K10 live: "Older than Law 6. **The older binds.**" | **Binder** | `companion/book.js:127` | `LAW0` |
| **T8** | K1 and K7 **physically** — the lid; the shaft; "a coin of orange light. That is the Hearth, seen from underneath" | the four | `ch6.js:471-472` | none |
| | K13 — it pushes; frost from the rivets; "**It knows.**" | the four | `:485-488` | none |
| | **K9, K5, K10 — the stone read from its foot** | the four | `ch6.js:827-828` | none (or `STONE_TOLD`) |
| | **K6** — "Four people's worth of fire… **Nobody did anything wrong.**" | the four | `ch6.js:850` | none |
| | **K8 entire** — the motive | **Binder alone** | `companion/ch6.js:286-287` | **opt-in `reveal` tap** |
| | all four legs of **K12** confirmed aloud, to Wren's face — **and K11 is not stated** | the four | `ch6.js:667-678` | `ASK_*` |
| **T9** | **K11, stated**: "It is never written." / "It's cold in here. Obviously. **It's me.**" | everyone | `ch7.js:696-697` | `ENDING===0` path (`ch7.js:673`) |
| | the same four figures **carved openly, never painted over**, on the chamber's own wall | the four | `ch7.js:303` | none |
| **T10** | per ending — see below | | | |

**T10, by ending:**

| ending | what the four end up knowing about the Cold | what Wren ends up knowing | never known by anyone |
|---|---|---|---|
| **E0** | They have **been inside it**, and come out unable to perceive any of the evidence they used to get there. It "is not holding anything shut. **It is simply a fire.**" Law 0 · **WRITTEN** | K11 resolved by being ended: a pulse, and a thread with somebody on the far end | K16; and **why the Walk gives Wren a heartbeat** (§7/U26) |
| **E1** | Walkers lose the evidence; stayers keep it **for life** and become the school's Masters | lives, no pulse, shadow still wrong | K16 |
| **E2** | They keep every gift and spend their lives holding uncommunicable knowledge | dies into the fire having known all along | K16; **what the mason carves** (§7/U27) |
| **E3** | "Thin — the kind of hold that needs watching" | becomes Provost and **restarts the cover-up**: "the fourth-years are told it is nothing" | K16 — and the next generation loses K1–K10 too |
| **E4** | K14 delivered. Law 0 · **STRUCK, AGAIN** | says nothing to any of them | K16; what the Cold-works do with a Sighting (§7/U24) |

### M1.2 Nested cells

| A | about B | content | note |
|---|---|---|---|
| **the Listener** | the Binder | assumes the Binder's gift is working and would have said otherwise | both wrong, same direction, same page, **T4** |
| **the Binder** | the Listener | mirrored | the two seats holding identical evidence each assume the other has nothing |
| **Marrow** | the four | thinks they are couriers; does not consider the Seer will look behind a plinth | **the game's richest discovery is one she did not authorise and never learns about** |
| **Wren** | the four | knows they took the Seer's eyes down there and knows what the Seer will see — and neither warns nor asks | |
| **the four** | Vane | after the memory-bell they know his aim is the Cold, not the child — and **no scene lets them re-read his ch1 offer in that light** | |

### M1.3 The driving gap — **Marrow ↔ the four** (§3/A1)

Her five instalments, with what each one keeps back:

| T | what she gives | what she keeps | cite |
|---|---|---|---|
| T3 | "the Founders left the Cold Ember… if the fire goes out, it lights it again" | that there is a wound; that she can read the stone; that K15 is her word alone | `ch1.js:309` |
| T4 | "that vault was rebuilt once, and **the rebuilding was not honest**" | 212 by name; what was rebuilt over; where the bricked road went | `ch2.js:189` |
| T6 | "Take Wren down into **the Cold** at midnight, whatever it costs" | what the Cold is | `ch4.js:354` |
| T7 | "Under this school there is a wound… **The fire is going out.**" | that four shut it; that the fire *is* them; the stone | `ch5.js:249-250` |
| T8 | the lid, the push, "It knows", "I can close this wound", and finally **K6** | **that she can read the stone** — until their four readings are spent | `ch6.js:486-488`, `:824`, `:850` |

### M1.4 Untapped, cheapest first

| # | where | the unspent move |
|---|---|---|
| U1 | `companion/ch2.js:169` | The Binder's page asks "**why the two nothings feel different — or whether they are**" and the chapter has **no SPEAK tab**. One optional speak block would let the table solve K11 at T4 themselves. §6/E13 |
| U2 | `ch6.js:824` on `STONE_TOLD` | Nobody asks how long she has been able to do that. One exchange converts the chapter's harshest mechanic into its best character beat. §6/E8 |
| U3 | `ch1.js:124` → anywhere later | She asserts the Order's reading **to nine Houses** knowing it false and **nobody ever catches her**. §6/E1 |
| U4 | `ch2.js:389-398` | She sent the Seer to look under an honest-looking floor and **never asks what the Seer saw**. §6/E37 |
| U5 | `ch6.js:486` | "**It knows. It always knows when somebody kneels here**" — said three feet from the child who came out of the fire, and nobody, including Wren, reacts. §6/E54 |
| U6 | `ch2.js:390`, `ch7.js:60` | Oriel bought a full account and is never given it. §6/E28 |

### M1.5 Inconsistency cross-refs

§6/**E1**, **E2**, **E8**, **E13**, **E16**, **E28**, **E50**, **E54**, **E55**; §6/**X1**, **X3**, **X4**, **X5**, **X6**, **X7**, **X8**, **X9**, **X10**, **X11**.

### M1.6 Branch headline

**K9 always arrives at T8, earned or told — the answer is never branch-locked, only its authorship.**
What *is* branch-locked: K4 in a Founder's voice (`LETTER_READ`), K8's motive (`ORIEL`, or an opt-in
tap), K10's image (`TAPESTRY`), and Marrow's only confession of prior knowledge (`OATH_KNOT` **and**
`DECISION='FOURFOLD'`). On `EMBER_LOST` **nobody's knowledge of the Cold changes** — a piece of it is
simply gone, and it silently cracks a Founder's bell with no causal line on any surface.

---

## M2 · THE HEARTH — what it is, and what it costs to keep

**Scope.** The fire's nature, its mortality, why it is dying, and who is allowed to know. The count is
**M6**; the price is **M9**; the crime is **M8**.

### M2.0 Proposition ledger

| # | proposition | first knowable | tier |
|---|---|---|---|
| **P1** | A fire left on top of a wound to hold it shut | T1, public, line one | NARRATION `ch0.js:49-50` |
| **P2** | Four hundred years; out once, fourteen years ago; left a child | T1, public | NARRATION `ch0.js:51-53` |
| **P3** | It is failing **now** | T1 (flicker), T7 (flat) | NARRATION `ch0.js:68`; Marrow `ch5.js:250` |
| **P4** | If it goes out, **the Cold Ember lights it again** | T3/T4 | CLAIMED BY Marrow, **uncorroborated** — M1/K15 |
| **P5** | **Four** closed the wound, not one | T4 opt. / T6 opt. / **T8 certain** | → **M6** |
| **P6** | Closing it **spent their Sight** | T7 on one phone, else T10 | → **M9** |
| **P7** | **The Hearth *is* those four people** | T8 | NARRATION `ch6.js:828`, `:839` |
| **P8** | **It is dying because four people is a finite quantity of fire** | T8 | CLAIMED BY Marrow `ch6.js:850` |
| **P9** | 212: the bill, the refusal, one Warden | T8, Binder's Book, opt-in | → **M8** |
| **P10** | The 212 body **forged the physical record** | T4 fragments, T6 picture, T8 motive | → **M8** |
| **P11** | Her Sealing **holds but does not close**; the last step is not hers | T8 | CLAIMED BY Marrow `ch6.js:629` |
| **P12** | Tonight's price is four Sightings, paid by four hands writing COLD | T9, **four private phones only** | → **M9** |
| **P13** | Wren is the school's **alternative** price — one child instead of four Masters | T9 | `ch7.js:697` → **M3** |

**The shape in one line.** P1–P4 are the school's story and are public. P5–P8 are the truth and are
withheld by one person. P9–P10 are the crime and live on one phone. **P12–P13 are the bill, and the
game hands it to four players privately, thirty seconds before it is due.**

### M2.1 Movement table

| T | what moves | for whom | note |
|---|---|---|---|
| **T0** | P1–P3, P10's political content, the stone's foot, "the ring has been ready fourteen years" | **Marrow** | She does not decide anything during the game. She only yields, once, at T9 |
| | P1, P2, P3 + the stone's meaning + all four anomalies | **Wren** | **Wren's knowledge state is identical at T0 and T9** |
| | P5 and P10's picture, for twenty-two years | **Vane** | **Wrong about P6/P12 — the cost.** He negotiates for a thing he believes is negotiable, which is only true if walking is free. **[PROPOSED]** and never said aloud |
| | Everything: P5, P6, P7 | **Mere** (dead, via her sheet) | **Unknown whether the Founders knew P8** — that four people would run out in four centuries. If they did not, the Founders are wrong about the only thing that matters. §7/U18 |
| | **P6, P9, P12 exactly** | **the 212 Convocation** (dead) | the only body in the game's history that knew the full price and priced it |
| **T1** | P1–P3 as an assertion rather than background; the flicker | the four | **The Order's reading is installed in the player and the characters in the same sentence** |
| **T2** | **four hands are structurally required** — "it needed all four of you" | the four | The best breadcrumb the game has for P5/P12, laid at T2, **never called back in prose at T8**. §6/E53 |
| **T3** | **P4** as an assertion from the Chair | the four | The mystery's **decoy**, and a good one. Never corroborated; never invoked when the fire actually goes out |
| **T4** | P10's physical evidence with none of its meaning: a newer floor, four plinths in a **derangement**, a road bricked with newer stone stamped **212** | the four | The Binder's Book contains **three Laws dated 212**. Nothing asks anyone to put those two facts side by side. §6/E29 |
| **T5** | the portraits mutter "**four went down**" | **Listener** | Free, unprompted, on the shared screen, and no character reacts |
| **T6** | P5 pictorially and certainly; `LAW0` set | **Seer** → the table | `TAPESTRY`. The Binder's Book silently gains a restored Law **and the Binder is not told why** |
| | the cost acquires a **colour** before it acquires a number — the grey thread | **Binder** | `GREY`. The mystery's best emotional breadcrumb, entirely non-verbal |
| | they swear to see a child into the Cold | the four | **They hold P1–P4 and a forged translation.** §6/E3 |
| **T7** | P1 and P3, flat, from the Chair — and she stops exactly one sentence short of P7 | the four | **The single most efficient withholding in the game** |
| | **P6** at last, in a Founder's own hand | **Reader alone** | `LETTER_READ`; **a chapter late** (§6/X-late) |
| **T8** | **P5, P7, P8, P11 land inside sixty lines**; P9 on one phone, opt-in | the four / the Binder | **The table earns one third (the count) and is handed two (the identity and the economy)** |
| **T9** | **P12, itemised per seat, on four private phones**; **P13** | each of the four, alone | **The price is never spoken by a character.** Not by Marrow, not by Wren. The *game* says it, four times, in private |
| **T10** | per ending | | Marrow **absent from E0, E1 and E4** — including the ending that supersedes her fourteen-year plan. §6/E40 |

### M2.2 The driving gap — **Marrow ↔ the four, on the price** (§3/A1)

| beat | how it exploits the gap | grade |
|---|---|---|
| `ch1.js:309` the Ember named | a mission and a false comfort in one sentence, and nobody can check it | **A** |
| `ch2.js:189` "the rebuilding was not honest" | the pointer with the noun removed | **A** |
| `ch4.js:355` "Read it. **Argue.**" | she invites argument from a party she has given nothing to argue with | **A−**, and it is the chapter's quiet cruelty |
| `ch5.js:249-250` | premise, crisis and plan, with cause and price cut out | **A** |
| `ch6.js:629` "The last of it is not mine to do" | the gap turns from information to **capability** | **A** |
| `ch6.js:824` (`STONE_TOLD`) | **the gap is exposed as a gap, on screen** | **B+**, undercut by nobody reacting |
| `ch7.js:387-396` | she makes them say back to her the three things she already knows | **A** |
| `companion/ch8.js:196-198` | the gap confessed in the imperative — *ask*, *listen*, *swear to a person* | **A**, and reachable only on E3 |

### M2.3 Is the reveal earned?

| proposition | verdict | note |
|---|---|---|
| **P5** four, not one | **Yes, richly** — seven independent plants, three of them free | → M6/M7 |
| **P7** the fire *is* them | **Thinly, but legitimately.** Deducible from `ch0.js:49-50` + the stone's own words | One clause anywhere in ch0–ch5 treating the Hearth as a *who* fixes it — and the perfect line already exists, unused: Wren addressing the fire as a person who can take offence (`ch6.js:473`) |
| **P8** why it is dying | **[UNEARNED].** No plants. The source comment says so outright (`ch6.js:840-849`) | **Best fix:** let Marrow give a *wrong* reason at `ch5.js:250` and let T8 correct it. A correction lands harder than a revelation and costs one clause |
| **P9** 212's refusal | **Evidence earned; motive not.** The physical record is everywhere; the reason is behind an opt-in tap on one phone | §6/E29 |
| **P11** held, not closed | **Yes** — a three-step walk-down (`ch5.js:250` → `ch6.js:487` → `:629`), weakened only by §6/X24 going unremarked | |
| **P12** the price is yours | **Not a reveal — an invoice.** Delivered by the UI, privately, per seat, with no character present | Defensible and even beautiful; but it means **no character in the fiction ever tells the four what walking costs** |

### M2.4 Untapped

`ch2.js:346` the arch stamped 212 (two whisper lines) · `ch5.js:250` said to four people carrying the
thing she told them relights it (one exchange) · `ch3.js:440` the portraits (one Listener prompt) ·
`ch5.js:551`/`ch6.js:590` the held thread — **a rehearsal of the exact price, in the exact vocabulary,
performed by the woman who will not name it** (one Marrow clause) · `ch4.js:607` she returns early and
does not say why, and the four are holding her journal, her voice, her thread and her forgery — **the
only moment all night the party has leverage over the withholder, and there is no option to use it** ·
`ch5.js:347` four thrones (one optional node) · `ch0.js:214` the four-hands callback.

### M2.5 Inconsistency cross-refs

§6/**E1**, **E3**, **E7**, **E8**, **E16**, **E21**, **E23**, **E26**, **E27**, **E38**, **E40**,
**E53**; §6/**X6**, **X7**, **X23**, **X24**, **X25**.

### M2.6 Branch headline

**On a minimal path — `VOTE_LOST`, no niche, no rubbing, no tapestry, no Oriel note, oath EMBER or
refused, `STONE_TOLD` — the four reach T9 holding P1–P5, P7, P8 and P11, and having learned P6 and P9
from nobody at all.** That path is playable and is where this mystery is weakest. *Recommendation:*
make **one** of Mere's sheet, the tapestry, or the Binder's 212 block unconditional. **[PROPOSED]**

---

## M3 · WREN — the four anomalies

**Scope.** Four impossibilities, one per seat, each privately observed for years and privately
explained away by the observer **as their own fault**; and the thing those four absences are symptoms
of.

### M3.0 The anomalies, and the rationalisations

| # | anomaly | seat | the rationalisation, verbatim | cite |
|---|---|---|---|---|
| **A1** | Wren's name chalked twice on the dormitory door — once in our letters, once in an alphabet nobody teaches — **and the handwriting is the same** | Reader | "You decided, a year ago, that somebody was being funny. **You have never asked who.**" | `companion/ch0.js:99` |
| **A2** | Has **never once** heard Wren's heart, through anything, anywhere | Listener | "You decided years ago that **the fault was yours**, and you have never said it out loud to anyone." | `:112` |
| **A3** | Wren's shadow falls **toward** every fire, including cold ones | Seer | "You decided months ago it was a trick of the light… **It is not the light. It never was.**" | `:124` |
| **A4** | **No thread at all**, in either direction — "not unbound. You know unbound." | Binder | "You decided it was a blind spot in your own gift. **You have never told anyone your gift has a blind spot.**" | `:145` |

Two further absences accrue and **are never counted as anomalies by anyone**: the memory-bell will not
keep Wren's voice (`companion/ch4.js:227`), and the Cold Ember shares A2 and A4 exactly
(`companion/ch2.js:134-135`, `:165-166`).

**The answer, asserted and never mechanised:** Wren is the hollow — COLD, the one glyph with no ladder
step and no pitch — in a fourteen-year-old's shape, left on the stones the one night the fire was out.
The four absences are one absence seen four ways. **It is said out loud exactly once, by Wren, on one
ending path**: "It's cold in here. Obviously. **It's me.**" (`ch7.js:697`; gated `ENDING===0`,
`ch7.js:673`).

### M3.1 Movement table

| T | what moves | for whom | note |
|---|---|---|---|
| **T0** | all four anomalies about self, "for years"; that each of the four carries one and has told nobody; **facts only one seat can perceive** | **Wren** | the last clause is §6/**E2**, the game's largest unearned moment |
| | A1 / A2 / A3 / A4, one each, plus a self-blaming explanation | the four, separately | told **nobody** |
| | Wren's origin, and that she named the child *hollow* in a dead alphabet in her own hand | **Marrow** | **She never refers to any of the four anomalies, to anyone, on any branch.** §6/**E7** |
| **T1** | nothing in any character's head | — | the flicker starts Wren's clock, not Wren's knowledge |
| **T2** | **the hinge.** Four private observations become one public pattern in a single beat, in seat order — and Wren answers the pattern before anyone can assemble it | all four + Wren | "Yes. All four of you. **I've known for years.**" `ch0.js:226` |
| | A3's rationalisation is killed **on the page, in the Prologue, by the light the Seer helped make** | **Seer** | earliest of the four to die; the Seer keeps holding it anyway |
| **T3** | first datum about Marrow rather than about Wren, per seat: the skipped heartbeat; the shape under the paint; the uncertain Provost→Wren thread | each seat | the Binder acquires the Provost→Wren thread **as an object of deliberate avoidance** |
| **T4** | **the control sample.** Ember: no heartbeat, no thread, refuses its own shadow. Wren: the same three, on the same pages | Listener, Binder, Seer | **The pages draw the conclusion and forbid it**: "you did not expect a heart [from the box]"; "**you have never asked yourself why the two nothings feel different — or whether they are**". §6/**E13** |
| **T5** | **the laundry.** Four private questions, four private answers; Wren learns exactly who lied | Wren | `lore.js:44`: Reader **DONTKNOW** · Listener **NO** · Seer **TELL** · Binder **DONTKNOW** |
| | "Properly. **Not the Provost's version.**" | Reader | Wren knows Marrow's gloss is false and does not say what the true one is. §7/U13 |
| | **"I have known since the laundry"** — Wren learns what Marrow is and where Wren came from | Wren | **and no beat in the laundry conveys it.** §6/**E5** |
| **T6** | **WRENN = the hollow of a bell** | **Reader alone** | The Reader has been asked for exactly this at T5 and says nothing until T8 |
| | the bell "keeps every voice in this room **but one**" | **Listener** | A *device* reproducing the Listener's result, and nobody says "then it is not my ear" |
| | four figures under the paint, **no child anywhere in it** | **Seer** → the table | Wren's reaction is the mystery's central question: "Four of them. **Where is the one born of four? Where am I?**" — §6/**E31** |
| **T7** | Wren knows **Mere's hidden door, its maker and its purpose**, and descends three flights in the dark to use it | Wren | unexplained; same class as E2. §6/**E51** |
| **T8** | **all four legs confirmed aloud, to Wren's face** — and Wren confirms every one: "Four answers, and **all four were the ones I already knew**" | the four | **The conclusion is withheld by the script, not by a character.** §6/**E6** |
| | the word *hollow* is spoken twice in one chapter — as the meaning of Wren's name, and as what the fire is — **and nobody joins them** | the table | `ch6.js:667` vs `:828` |
| **T9** | "The ring is full but for one socket." / "**It is never written.**" / "It's cold in here. Obviously. **It's me.**" / "**Nothing here looks surprised.**" | everyone | §6/**E6** in its terminal form |
| | Wren's name cut into the eighth socket in letters **four hundred years older than the present alphabet** | the table | §7/U15 — either the Founders planned for Wren, or somebody cut it later |
| **T10** | E0: a pulse, and "there wasn't a *me* on the other end to tie it to. **There is now.**" · E1: no pulse · E2: dies knowing · E3: becomes the withholder · E4: silence, named as the worst thing Wren has ever done | | On **four of five endings no character ever says what Wren is** |

### M3.2 Nested cells

| A | about B | content |
|---|---|---|
| **Wren → each of the four** | "You have each seen one impossible thing about me, you have each decided it is your own fault, and none of you has told the others" — **correct in all four cases** (`ch0.js:226-227`) |
| **each of the four → Wren** | believes Wren does not know the answer to the question Wren just asked. **The cleanest false nested belief in the game**, and the Second Asking exists to break it |
| **each of the four → the other three** | now knows they were also silently rationalising — and **none of them ever refers to another's anomaly again, for six chapters.** §6/E43 |
| **Wren → the four** *(two-level)* | believes they will not put the four together, and is **right for six chapters** — Wren has to say "It's me" at T9 |
| **Marrow → the four** | does not know any of them has privately observed an impossibility about her child. **Never tested, on any branch** |

### M3.3 The driving gap — **Wren ↔ the Listener** (§3/A3)

Three of the four asymmetries here are asymmetries of *fact*; one is an asymmetry of **blame**. The
Reader thinks a joke was played; the Seer thinks a lamp was involved; the Binder thinks a gift
misfired. **Only the Listener has concluded that they are personally defective** — and Wren has held
the exonerating sentence since before the game.

**Runner-up: Wren ↔ the Seer** — the only seat asked directly, twice, that can refuse twice, and the
only one Wren thanks "**for both**". The cleanest *choice*; the Listener's is the deepest *wound*.

### M3.4 Untapped

`ch2` the vault — **Wren is on screen** while the Listener looks between the box and Wren's chest; one
line ("It's the same nothing, isn't it. Don't answer that.") shows Wren *declining* to relieve the
Listener · `ch4` the memory-bell — the anomaly independently instrumented, spent silently ·
`companion/ch5.js:289-290` — Wren grants the Reader permission and never grants the Listener the same;
a **withheld** parallel makes the asymmetry a choice rather than an omission · `ch6.js:320` — Wren's
reply to the Listener's kind lie is four syllables and **no absolution**, and the absolution waits two
chapters for a burning page · `ch7.js:695-699` — the Listener is the only seat with no line at the
socket, and is the person who has spent four years hearing one.

### M3.5 Inconsistency cross-refs

§6/**E2**, **E5**, **E6**, **E7**, **E13**, **E30**, **E31**, **E41**, **E42**, **E43**, **E51**;
§6/**X2**, **X3**, **X11**, **X12**, **X13**, **X14**, **X15**, **X16**, **X17**, **X19**, **X43**.

### M3.6 Branch headline

**`ENDING` is the single largest branch fact for this mystery.** `ch7_cold_slot` runs only when
`ENDING === 0` (`ch7.js:673`), so "It's me", Wren standing in the empty socket, and Wren's name in the
eighth socket are reachable on **one of five endings**. On E1–E4 the identification is delivered only
as the Epilogue's eighth card — a picture and a two-word caption. **Four tables in five never hear a
character say what Wren is.** Compounding: at `CLUES = 0` the table reaches the Finale with **no
anomaly confirmed aloud by anyone**, and nothing guards it.

---

## M4 · MARROW — what she knows, and when she decided

**Scope.** Three questions the game raises and answers at three different depths: **what does she
know**, **when did she decide**, and **what is she protecting**.

**The short answer the tables are built on.** She knows the school's reading is a forgery and has
known since she was a girl with a bread-knife. She knows what 212 did and why. She knows what is under
the school. She knows the fire is four spent people and is therefore unrepairable. **She can read the
true stone herself** — and with all of that she built, fourteen years ago, a plan around **one
walker**, because the true reading's price is four Sightings and she does not have four volunteers,
and the one body she does have is a child she found on the stones and named *hollow*. **Her secret is
not a fact. Her secret is that she ran the 212 calculation again and got the same answer, with better
motives** — and that she knows it, which is what "I should have gone fourteen years ago" means.

### M4.0 The inventory — what she holds, and when the player can have it

| # | fact | held since | first surfaced | tier |
|---|---|---|---|---|
| K1 | there is a wound; the Founders shut it and left the fire on it | ≥14 y | **T7** `ch5.js:249` | CLAIMED BY |
| K2 | the fire is going out | ≥14 y | **T3**, obliquely `ch1.js:309` | CLAIMED BY |
| K3 | **why** it is going out | unstated **[PROPOSED]** since she learned K7 | **T8** `ch6.js:850` | CLAIMED BY |
| K4 | Wren came out of the fire; she picked it up and named it | 14 y, first-hand | **T8** `ch6.js:691` | CLAIMED BY |
| K5 | the name is **WRENN** — *the hollow of a bell* — in her hand, in the old letters | 14 y | **T6, one phone** `companion/ch4.js:202-204` | PHONE (Reader) |
| K6 | what is under the paint — she scraped it herself, as a girl | decades | **T9, one branch** `ch7.js:394` | CLAIMED BY |
| K7 | 212: "They could not afford four Masters, so they made it grammar" | decades | **T9, one branch** `ch7.js:396` | CLAIMED BY |
| K8 | the vault was rebuilt and "**the rebuilding was not honest**" | ≥14 y | **T4** `ch2.js:189` | CLAIMED BY |
| K9 | **how to read the stone from its foot** | unstated | **T8, after their budget is spent** `ch6.js:824` | NARRATION |
| K10 | Mere's gates; that they cheat; that they need four readers; a word that forces the last ward | unstated | **T7** `ch5.js:265-266`, `:412`, `:475` | CLAIMED BY / NARRATION |
| K11 | **Law 0 is not in her Book** | always | **T7** `ch5.js:399` | CLAIMED BY |
| K12 | the Founders' practice: blind ringing, one caller and three ringers | unstated | **T8** `ch6.js:594` | CLAIMED BY |
| K13 | she **cannot** finish the Sealing | ≥14 y | **T8** `ch6.js:629` | CLAIMED BY |
| K14 | a held thread can be tied off to the iron ring | unstated | **T7/T8** `ch5.js:582`; `ch6.js:590` | NARRATION |
| K15 | **which lock the four swore under** — though Law 4 says the sworn-to cannot tell | T6 | **T9** `ch7.js:387` | §6/**X21** |
| K16 | the old alphabet, well enough to teach it | decades | **T6** `ch4.js:327` | PHONE (Reader) |
| K17 | she has **never named the thing below to the nine** | always | **T6, one branch** `ch4.js:592` | DOCUMENT |
| K18 | Bess is sworn to her, thirty years; nobody searches that room | 30 y | **T5, one phone** `companion/ch3.js:238` | PHONE (Binder) |

**What she does not know, anywhere in the game:** that the Binder has carried the text of struck Law 0
since the Prologue; that Wren has known the origin since the laundry (until Wren tells her at T8);
what each of the four privately observed about Wren years ago; that Vane scraped the same paint she
did; and — never resolved — whether the Cold Ember she sent four children for would have done anything
at all.

### M4.1 When she decided — four statements, assembled

| statement | cite | what it fixes |
|---|---|---|
| "I picked it up. **I named it.** I raised it to be— / '*Loved*,' says Wren. '**Loved enough to walk back in**'" | `ch6.js:691-692` | the purpose was **contemporaneous with the naming** |
| "**The ring has been ready for fourteen years.**" | `ch7.js:367` | physical preparation began the same year; "ready" implies work |
| her thread to Wren is grey — "a goodbye **already said**" — "for **fourteen years**" | `companion/ch6.js:268`; `ch8.js:333` | the grief is not anticipatory. She said goodbye at the start |
| "Then I go. **I should have gone fourteen years ago.**" | `ch7.js:777` | the alternative she weighed and rejected fourteen years ago was **walking in herself** |

**Ruling for the tables:** T−14 years is a single night on which she found a child, identified it,
named it for what it was, considered going in herself, declined, and began preparing the ring. **She
does not decide anything during the game. She only yields, once, at T9.** **[PROPOSED]** the naming
*is* the decision — to name a baby *the hollow*, in a dead alphabet, in her own hand, on an official
roll, is to have already classified it as the thing that goes back. Nobody in the game remarks on it.

### M4.2 What she is protecting — six layers, and they conflict

| # | protecting | from | evidence | does it hold? |
|---|---|---|---|---|
| **P1** | **Wren** | knowing what Wren is for | confesses only **when given leave**, kneeling; "the child" in speech, "**it**" in writing | **Fails before the game starts** — Wren has had "years to get used to it" |
| **P2** | **the four** | the bill 212 refused | an **escort** oath; "hold [the bells]. **I will do the rest**"; she physically bars the Walk | Holds to T9, then she yields to a non-argument. **[PROPOSED]** she wanted to be argued past |
| **P3** | **the Convocation, and her Chair** | a vote she would lose, as 212 lost it | "Tonight I go down to **the thing I have never named to you**" | Holds all night. **Never tested on any branch** |
| **P4** | **herself** | the alternative she declined | "I should have gone fourteen years ago"; "**Ask, when you are me**" | Fails, in her own words, **only on ENDING 3** |
| **P5** | **the school's children** | a fire that eats a person every four centuries | inherited whole by Wren on E3 | Holds — and the Epilogue calls that a tragedy |
| **P6** | **her own grief** | being seen | never names it; the one seat that could read it "**decided long ago not to look**" | Holds until E0, where the Binder "**has to ask what she feels**" |

**The conflict that generates the plot:** P2 and P1 are incompatible. Protecting the four from the
bill means somebody else pays it, and the only body available is the one she is protecting under P1.
**She resolved that conflict fourteen years ago by deciding that P1 means *loved*, not *spared*.**

### M4.3 Movement table — hers, and the room's model of her

| T | her state | the room's model of her |
|---|---|---|
| **T0** | K1–K18, all of it, in private | the four have none; Wren has a complete and accurate one |
| **T1** | unchanged; **offstage for the whole Prologue** | the four form a model of the prophecy **with no Marrow in it** — good construction |
| **T2** | **unchanged, and she never learns any of it, on any branch** | the obvious next move — *ask the Provost* — is **never taken by anyone at any point in nine chapters** |
| **T3** | adds: Vane has the paint and will use it, by her given name. Her timing collapses **mid-sentence** from *the morning* to *tonight* | four leaks in one chapter, each on a different surface: a public commitment to the forgery; the fire bowing while she alone does not look; **her heart skipping twice, looking at Wren**; and Sorrel predicting her errand |
| **T4** | unchanged; her withholding turns from passive to **active** — she supplies the pointer and removes the referent | the four believe she knows what the rebuild hid. **She does** |
| **T5** | adds `SURRENDERED`; she is doing the overture of a Sealing personally, without telling anyone that is what it is | the four read a chase; it is a route |
| **T6** | adds the lock she "cannot" know; she is back early **and does not say why** | the four now hold her journal, her recorded voice, her thread and her forgery — and have no option to use them. §6/**E23** |
| **T7** | learns her Book is short of a Law — "**That is not in the Book I was given**" — and asks nothing | the one beat where the four's knowledge exceeds the Chair's, and it lasts two lines |
| **T8** | **her withholding ends in three stages, and every one is extracted, not offered**: P8 only after the stone has said P7 for her; Wren's origin only on Wren's leave; her literacy only when the four's budget is spent | the four learn she could read it all along — and **no scene lets them ask why** |
| **T9** | her prior knowledge becomes **speech**, three lines of it, gated on `OATH_KNOT` **and** `DECISION='FOURFOLD'` | "The ring has been ready for fourteen years. **Decide.**" — an imperative to choose, from the only person who knows what each choice costs, **containing no cost** |
| **T10** | E2 grey thread, no line · E3 four letters on the back of the writ, and she does not wait to see them read · **E0, E1, E4: not mentioned at all** | §6/**E40** |

### M4.4 Her four Epilogue letters (E3 only) — the whole posture, confessed

> Reader: "Read him the name properly, one day. **I never once heard it said right, and I am the one who chose it.**"
> Listener: "Do not let that stop you listening — **I did, and it cost fourteen years.**"
> Seer: "You saw. **I should have asked you sooner. I should have asked anyone. Ask, when you are me.**"
> Binder: "The oath you swore tonight was **to a Chair. Swear the next one to a person.**"
> — `companion/ch8.js:195-198`, written on the back of the writ, `:282-283`

### M4.5 The driving gap — **Marrow ↔ the Binder** (§3/A2)

| | Marrow | the Binder |
|---|---|---|
| holds | the plan, the history, the stone, the ring — **and a Book without Law 0** | **the Book with Law 0**, text intact, from the Prologue |
| holds about the other | **[PROPOSED]** a child who keeps a rule-book; she never asks the Binder anything about the Laws all night | an authority — and privately, a woman whose thread they have "**decided long ago not to look**" at |
| the sentence never said | "Binder. What does your Book say about Law 0?" | "Provost — it's in mine. It's been in mine since the dormitory." |
| what breaks it | **nothing, ever** | |

**Why this pair.** It is the only pairing where both parties are *right about their own facts and
wrong about each other's*, where the mismatch is **mechanically enforced by the partition rule**, and
where closing it would change the ending. It pays both arcs at once: her confession is "I should have
asked anyone"; the Binder's private refusal is "you decided long ago not to look." **They are the same
failure, seen from two seats, and the game never lets them meet.**

### M4.6 Untapped

`ch5.js:399` — nobody asks **what Book the Binder was given**; one Wren line puts the whole mystery on
the shared screen in six words · `companion/ch6.js:287` — a SPEAK prompt asking the Binder to say the
number aloud · the ch4 chair corner makes the Binder say *grey* but not **what grey means about the
plan** · `ch7_argue1` has four options and **none of them is the Binder's**, although the Binder has
had that Law since ch0 on every branch · six chapters of her heartbeat on the Listener's phone and
**not one scene asks the Listener about her** · one Binder line in the E0 Epilogue closes the arc the
game opened at `companion/ch3.js:276`.

### M4.7 Inconsistency cross-refs

§6/**E1**, **E7**, **E8**, **E16**, **E21**, **E23**, **E27**, **E37**, **E39**, **E40**, **E49**,
**E56**; §6/**X4**, **X6**, **X12**, **X20**, **X21**, **X22**, **X23**, **X24**.

### M4.8 Branch headline

**Her complicity — `ch7.js:394` "I scraped it myself, as a girl" and `ch7.js:396` "They could not
afford four Masters" — is gated behind `TAPESTRY` **and** `OATH_KNOT` **and** `DECISION='FOURFOLD'`
**and** the table picking the right one of four options.** On an EMBER lock, a refused oath, or any
non-Fourfold decision, **the Provost never once, in nine chapters, says what she knows about the
prophecy or about 212.** *Minimal fix:* move "I scraped it myself, as a girl" to the T6 tapestry
reveal, where she already says "So. The Seer." It is the same fact, ungated, in the chapter that is
about her.

---

## M5 · VANE AND THE CROWN

**Scope.** Three questions, asked in this order and answered in reverse: *what did he see under the
paint* (asked T3, answered T6, ratified on the shared screen); *who else benefits* (asked T3, widened
T5, **never closed**); *what does he want* (answered institutionally at T6 on one phone, personally at
T9 on one branch, and **never at all** as to why the Crown wants **Wren** rather than the Cold).

### M5.0 Proposition ledger

| # | proposition | where it is knowable |
|---|---|---|
| **V1** | there is older paint under the tapestry, and **Vane is right about what it shows** | Hearth T6, `TAPESTRY` only; `ch4.js:557` "**So he had.**" |
| **V2** | he saw it **twenty-two years ago**, told the Convocation, and was **sent away** | Hearth T9, `FINALE_WALL='wall'` **only**. **One utterance in the whole game** |
| **V3** | his stated ask is custody — "the child, tonight, for **safekeeping**" | Hearth T3, unconditional |
| **V4** | the Crown's actual aim: "**The Crown will have the Cold open, one way or another.**" | **Listener's phone only**, T6, opt-in corner, 3 tries, can be spent to nothing |
| **V5** | **why the Crown wants Wren specifically** | **nowhere.** §7/U12 |
| **V6** | his price: Wren lives, and the Crown makes all four of them Masters | Hearth T3, unconditional |
| **V7** | he delivers **exactly** what he promised, on E4 | T10, `ENDING 4` only |
| **V8** | he has bought seats 5 and 8 and **blocked** seat 6 | Seer's phone, T3 |
| **V9** | he has bought the porter and both patrols | Binder's phone, T5 |
| **V10** | his writ is the Crown's; a Convocation writ is weaker but his captain will not fight it | Hearth T5, `SORREL` only |
| **V11** | his stopping condition is **personal**: "I will not be the thing you have to be brave about" | Hearth T9, `wall` only |
| **V12** | he knows **which seat can confirm him**, and names the gift unprompted | Hearth T3, unconditional |
| **V13** | he knows each of the four **by their real first name** | each player's own phone, T9 |
| **V14** | he is drawn with a **red** mark inward and a **gold** mark outward | **nowhere** — art only; §6/**X33** |
| **V15** | his wax seal is **exactly Redmoor's House colour**, and Redmoor is the seat his own soldier blocks | **nowhere** — art only; §7/U10 |
| **V16** | his gold thread runs to Wren, all night, and can locate Wren through stone | Binder's phone, T4 |
| **V17** | **his is the only fast heart in the Great Hall** | Listener's phone, T3 |
| **V18** | he prices refusal rather than punishing it; a lie is as usable to him as a yes | Hearth T3 |
| **V19** | on `VANE_ACCEPT`, **the four are themselves bought** | Binder's phone, T5 |
| **V20** | he promised secrecy — "The others need never know who opened the door" — and then asks **in front of everyone** | both, T9 |
| **V21** | on the **win** branch he bows to the vote and then puts soldiers through the school | Hearth T3 → T5 |
| **V22** | **what he does after standing down** | **nowhere** |

### M5.1 The three asymmetries that matter

- **V1/V2 are a monopoly he does not have.** Marrow scraped the same paint as a girl; Oriel took a
  bread-knife to it and watched them repaint it inside the week; and the same image stands
  **uncovered** on the bell-chamber wall, four hundred years old. **He is right about the picture and
  wrong about the market.**
- **V4 vs V3.** What he asks for (a child, for safekeeping) and what his principal wants (the Cold,
  open) are different objects — and **only the Listener ever hears the second.**
- **V17 vs everything he says.** The only person in the Great Hall who knows the Envoy is frightened
  is a fourteen-year-old with a phone, and **no scene in the game ever asks them to say so.**

### M5.2 Movement table

| T | what moves | for whom |
|---|---|---|
| **T0** | V1, V2, V3, V4, V8, V9, V12, V13 — all of it, private | **Vane**. **V→O is null**: he has no model whatever of seat 7, the one Master alive who saw what he saw |
| | V1 and V4, first-hand — he said it to her face in her own study | **Marrow** |
| | V1 first-hand, **and that it is actively maintained** | **Oriel** — and she does not know V2 |
| | the offer **word for word**, and that he "**cannot know how you answered**" | **the captain** |
| **T3** | V3, V6, V12, V18 on the Hearth; V8 on the Seer's phone; V17 on the Listener's | the table / two seats |
| | he converts a twenty-two-year grievance into a public lever and gets exactly the reaction he wanted: "Nobody knows what that means. **Her face does.**" | — |
| **T4** | V16 — a working position-and-intent sensor on the antagonist, used once, passively | **Binder** |
| **T5** | V9, V19 | **Binder** |
| **T6** | **V1 confirmed on the shared screen with Vane named**: "So he had." | the table, `TAPESTRY` |
| | **V4, verbatim** | **Listener**, `MEMORY` |
| **T9** | V13, V20 (the private letter) → the public audit | each player, then the table |
| | **V2 and V11** — the only utterance of either, anywhere | the table, `FINALE_WALL='wall'` |
| **T10** | **E4**: every knowable proposition confirmed, plus V7. **E0–E3**: Vane is **never mentioned again on any path** | — |

### M5.3 The driving gap — **Vane ↔ the Seer** (§3/A4)

Runner-up and squandered: **Vane ↔ the Listener** — she alone knows he is frightened and alone hears
what the Crown wants, and **no scene ever asks her for either**. Both are printed on a Wren tab or an
optional corner; neither is a puzzle input. **If the author wants a second spine for this mystery,
this is it, already half-built.**

### M5.4 The four tables that finish the game with materially different pictures of him

| table | holds | believes Vane is |
|---|---|---|
| `TAPESTRY` + `MEMORY` + `ORIEL` + `wall` | V1 confirmed, V4, a second witness, V2 and V11 from his mouth | a man who told the truth once, was destroyed for it, and was bought by the people who destroyed him |
| `TAPESTRY` + `wall`, no `MEMORY` | V1, V2, V11; **no Crown aim** | a man with a private grievance and no stated policy — **the most sympathetic reading, and the least accurate** |
| `MEMORY`, no `TAPESTRY`, `nothing` | V4 only | a Crown agent with an unverified boast about a wall; the offer stands and E4 is live |
| no `TAPESTRY`, no `MEMORY`, `nothing` | V3, V6, V8, V9 | a courteous buyer. **The mystery was never opened** — and this table can still be offered "Show him what is under the paint." §6/**E17** |

### M5.5 Untapped, ranked by payoff per line

1. **T8's solved stone does not name him.** The chapter that proves his life's claim in full never
   mentions the man who said it first. One line converts T9 from a button into a vindication.
2. **Oriel is standing right there** at the edge for his confession, and is the only other scraper
   alive. Five words.
3. **Marrow says nothing.** §6/E22.
4. **The Listener's fast heart.** A whisper line at `ch7_vane` — *"Listener — is he frightened?"* —
   makes the `wall` choice an **informed** one and repairs §6/E17 at the same time.
5. **The Binder's thread tracker**, a mechanic in ch3 and absent in ch7. §6/E47.
6. **Wren's four whispers, in a chapter spent fleeing Vane's men, and none of them is about Vane.**
   Wren has exactly one question only the four can answer — *did he offer you something?* — and the
   game does not ask it. **The single best unbuilt scene in the mystery**: it would price
   `VANE_ACCEPT`, stage the conversation §6/E48 assumes, and give Wren a reason to be the one who
   absolves at T9.
7. **Seat 6.** A soldier blocks Redmoor so nobody can reach it, and Vane's seal is Redmoor's colour.
   Two words from the Seer or the Reader answer three open questions.
8. **The rope.** Nobody ever asks the captain, Vane or Marrow whether it was real. §6/E20.
9. **The public asking.** He breaks his own written promise on screen and not one of nine people says
   so. Wren, who absolves everybody, is the right mouth: *"You said nobody would know."*
10. **E0–E3.** Four endings in which the Crown's Envoy, his soldiers, his writ and his principal
    simply cease to exist, while the Cold's disposition changes radically on each.

### M5.6 Inconsistency cross-refs

§6/**E9**, **E10**, **E17**, **E18**, **E19**, **E20**, **E28**, **E44**, **E46**, **E47**, **E48**;
§6/**X26**, **X27**, **X28**, **X29**, **X30**, **X31**, **X32**, **X33**, **X34**, **X35**, **X39**.

### M5.7 Branch headline

**`VANE_ALLY` deletes the mystery.** Set exclusively by `ch7_wall`'s enter, it makes E4 unreachable,
forces every `BARGAIN_<r>` to `refused`, removes the private letter from all four phones, and takes
one figure out of the art — and **Vane himself remains drawn, with four soldiers, and is never
mentioned again.** *The moment Vane becomes likeable, the game removes him.* The author gets a
redemption and never has to price it.

---

## M6 · THE PROPHECY — what the stone says

**Scope.** One physical object, two readings, and the difference between them is a political crime.
**This is the home of the count.**

### M6.0 The two readings

| | **the Order's reading** (what everyone believes) | **the carved reading** (what is true) |
|---|---|---|
| where it starts | the **school's mark**, beside cut 1 | **cut 8** |
| direction | **up** the count | **down** the count |
| each cut says | the word it stands for | **its other word** |
| COLD | left empty — Law 6, Order's, 212 | **written** — Law 0, Founders', Year 0 |
| the eight words | ASH · COLD · CROWN · KNOT · THORN · COLD · EMBER · VEIL | **KNOT · CROWN · ASH · WELL · VEIL · EMBER · ASH · COLD** |
| in English | "When the Hearth goes cold, **one born of four** shall walk into the Cold, and it shall close behind them." | "**Four, as one, go down with fire. What is kept stays behind. The fire is the hollow they left.**" |
| cite | `lore.js:75`; `ch0.js:63`; `ch6.js:393`, `:774` | `ch6.js:394`, `:827-828` |

**Three physical facts nobody in the fiction ever puts together, though all three are on screen.**

1. **The ring has no first cut**, so the *mark* at cut 1 is an **addition** to the Founders' stone.
   Who cut it, and when, is never asked by anybody. **[PROPOSED]** it is 212's — the cheapest line in
   the game, and it converts the misreading from an error into a signature.
2. **The stone shows the Flame inverted, twice** — cuts 2 and 6. The Founders cut COLD into stone, in
   public, above the fire. Law 6 says COLD is never written. **The Order's own Law is refuted by the
   object the Order's reading is read off.** No character, page or line ever notices.
3. **Cuts 2, 4, 6 and 8 are unburnt and public** — "the room can see both their shape and which way up
   they stand" — and the Reader can read any worn carving. **So the Reader could have read half the
   stone from Chapter 0.** §6/**E32**.

### M6.1 The ceiling on each stakeholder

| who | can they ever reach the carved reading? | limit |
|---|---|---|
| **Wren** | **[CONTESTED]** — `CANON.md` §9.1 says yes, since "years"; `epistemics-year212.md` says `ch7.js:404` will not bear it. **§7/U9 blocks this row** | `ch7.js:404` |
| **Marrow** | yes, and can execute the reading in about thirty seconds | `ch6.js:824` |
| **Vane** | **No.** He has the *conclusion* from the paint; he never sees the foot of the stone, and the word "stone" appears in no Vane line in the game | grep |
| **Reader** | only at T8, and only the four **burnt** shapes | `companion/ch6.js:199-205` |
| **Listener** | only at T8, and only **where the lap ends** | `:207-215` |
| **Seer** | only at T8, and only **which way each burnt chisel went in** | `:217-223` |
| **Binder** | holds **Law 0, struck**, from the Prologue; the three-clause version at T8 | `lore.js:57`; `companion/ch6.js:232` |
| **Oriel** | the conclusion from the paint, as a girl; never the text | `ch4.js:588` |
| **Sorrel + six unnamed Masters** | **nothing — the game gives them no state on this at all** | §6/E24 |
| **the 212 Convocation** | had it, and buried it | `companion/ch6.js:286-287` |
| **Mere** | had it, and left **two portable proofs** under the school | `ch2.js:315-319`; `companion/ch4.js:62` |

### M6.2 Movement table

| T | what moves | for whom | gate |
|---|---|---|---|
| **T0** | the Binder holds **Law 0, struck, dated, attributed**, and believes **a struck Law is a dead Law** — *that single belief is what holds the whole mystery shut for six chapters* | Binder | none. **Law 3 does not reach the Book until ch2**, so at T0 the Binder has the key and not the lock |
| **T1** | **nothing in any character's head moves.** The Order's translation, captioned **THE ORDER'S READING** in the art and nowhere in the prose | the table | none |
| **T2** | COLD's shape and gloss; COLD is the rest | Reader, Listener | none |
| **T4** | Law 13 (F) **beats** Law 9 (O, 212) under Law 3 — the table performs the syllogism with its own hands and nobody names it | the table | `ch2_door` |
| | **"KNOT, CROWN, THORN — four, as one, went through. Not one. And the stone above the Hearth has said *one born of four* for four hundred years."** | the table, **on the Hearth** | `CH2_NICHE` → `CH2_STRIP='right'` |
| **T5** | "Properly. **Not the Provost's version.**" — the Reader learns there *is* a Provost's version and that Wren distrusts it | Reader | sealed |
| **T6** | the count refuted **in a picture**, on the Hearth, with Vane vindicated; Wren asks "**Where is the one born of four? Where am I?**" | the table | `TAPESTRY` |
| | **WRENN**, and the Order's era-framing in the Book | Reader, Binder | |
| **T7** | Law 5 (F) beats Law 11 (O, 212) at Mere's gates; **Law 6 finally arrives** | Binder | |
| | **COLD written on a Founders' door, and it opens** — and Marrow: "That is not in the Book I was given" | the table | `LAW0` |
| **T8** | **four partitioned private facts** → the reading, from the foot | the four | none (or `STONE_TOLD`) |
| | "Four went down. **Not one born of four** — four, as one." | the table | none |
| | **the motive**, on one phone, opt-in | Binder | tap |
| **T9** | Marrow's three admissions | the table | `OATH_KNOT` + `FOURFOLD` |
| | "'**COLD is written by four hands.**' — Law 0. **Restored.**" | the table | |
| **T10** | the eighth card: COLD, captioned **WREN / never written** — and one scene earlier, "The rest is never carved", **which is Law 6** | the table | §6/**X10** |

### M6.3 The driving gap — **Marrow ↔ the four, T3 → T9**

Five properties, all present and all mechanised:

1. **She has what they want and can supply it instantly** — thirty seconds at the foot of the stone.
2. **She must not supply it, and the game agrees**: `WALK_UNLOCKED` and `LAW0` are written by *their*
   `onSolve`; her reading it instead is recorded as a lesser state (`STONE_TOLD`), costs the Finale two
   minutes, and is printed in the ledger.
3. **Their failures cost her something she also needs** — each wrong reading cracks a bell, and the
   bells are the only thing holding the Cold off the lid while she works.
4. **She has an error they will correct**: *four hands ≠ four Masters*. Law 0 says **hands**; 212's
   minute says **Masters**; she inherited the substitution. It is the only reading under which
   fourteen years of raising one child makes sense, **and it is the error E0 corrects**. **[PROPOSED]**
5. **It resolves as a yielding, not a defeat** — "That is not a reading." / "**She steps aside
   anyway.**"

### M6.4 Untapped, ranked

1. **`ch1_dais`** — she quotes a forgery she can disprove, in the Chair, then shows nothing. One
   narration clause makes it the mystery's first plant instead of its worst lapse. §6/**E1**
2. **`ch5_gate2`** — four children write COLD on a Founders' door and nobody, not Marrow, not Wren,
   not the Binder whose Law it is, says **"then the stone can have it too."** This is the last beat
   before the reveal and the only one where the four could reach it themselves.
3. **`ch2_vault`** — she sends them to a room she knows the Order rebuilt, in the year stamped on the
   wall they walk past, and does not say the year.
4. **`ch7_argue1` on non-KNOT branches** — her confession is unreachable on EMBER and on
   `REFUSED_OATH`. **The highest-value branch fix in the mystery.**
5. **The Listener, T8** — COLD is the one glyph with no note, the lap ends on a silence, and Wren
   cannot be heard. *The word the stone ends on and the person you cannot hear make the same sound.*
   **The best free payoff in the game.**
6. **`ch0_carve`** — carving **WREN** into brass makes a four-hundred-year-old lamp **flare blue**, in
   the Cold's own palette, and the lamp then needs **four hands** to light. The prophecy's number and
   its subject are both demonstrated in the Prologue and neither is remarked on.

### M6.5 Breadcrumb ledger — the distribution that is the risk

38 pieces of evidence reach the table across nine chapters. **17 reach only one seat.** Of the four
that carry the **motive** rather than the **fact**, three are on one phone and the fourth is gated on
an unrelated Chapter IV choice. **A table can finish this game knowing exactly what the stone says and
never learning why anybody changed it.**

### M6.6 Inconsistency cross-refs

§6/**E1**, **E11**, **E24**, **E30**, **E32**, **E33**, **E34**, **E38**; §6/**X1**, **X3**, **X6**,
**X8**, **X10**, **X16**, **X42**, **X43**, **X46**.

### M6.7 Branch-invariant, and worth stating plainly

On **every** branch of **every** playthrough: (a) the four reach the carved reading at T8; (b) the
motive reaches at most one player, on a phone, opt-in; (c) no Master, no Convocation and no part of
the school outside the party is ever told; (d) **the Order's translation is still what the school
teaches at dawn.**

---

## M7 · THE FOUNDERS — what they did, and what it cost

**Scope.** The act, the cost, the survivors, the exclusion, and who the four were. The count is
**M6**; the price is **M9**; the crime is **M8**.

### M7.0 Proposition ledger

| # | proposition | first knowable | by whom |
|---|---|---|---|
| **F1** | four people closed a wound and left a fire on it | **T1, line one of the game** | everyone |
| **F2** | there were **four Founders** | T0, uncontested anywhere | everyone |
| **F3** | **all four went down, together, as one act — not one alone** | T4 opt. / T6 opt. / **T8 certain** | the table → **M6** |
| **F4** | the act was **writing the cold glyph with four hands** | T1 (struck, unglossed); T7 (Mere); T8 (restored) | **Binder first, alone** |
| **F5** | **it spent their Sight. They came up grey.** | **T7 at the earliest, one phone, two-flag path**; otherwise **T10** | the Reader, then nobody → **M9** |
| **F6** | at least **Mere came back out** and kept the fire afterwards | T7 (Reader); corroborated T5/T7 on the Listener's page | Reader; Listener partial |
| **F7** | **the Hearth is those four people** | T8 | the table → **M2** |
| **F8** | it is dying because **four people is a finite quantity of fire** | T8 | the table → **M2** |
| **F9** | **one offered to go alone and was refused. One was never asked.** | T7, **Reader's Book only** | the Reader |
| **F10** | they wrote ten Laws in Year 0, including Law 3 — **they legislated against being overruled before anyone tried** | T1 onward, cumulative | the Binder |
| **F11** | they built the underworks: the Door, Mere's three gates, **a hidden door for people who were not asked**, the eight-socket ring, the bells, a pattern rung **blind** | T4, T7 | the table, piecemeal |
| **F12** | in **212** the same bill came due and was refused | T8, Binder's Book, **opt-in** | the Binder → **M8** |
| **F13** | **the bill is still payable tonight, at the same price** | T7 in miniature; **T9, four private phones**; T10 named | each of the four, alone → **M9** |
| **F14** | Wren is the school's substitute for that bill — **one child instead of four Sightings** | T8 / T9 | the table → **M3** |
| **F15** | **who the other three were** | **never** | nobody, including the narration |

**The shape in one line.** F1 and F2 are in the game's opening sentence. F3 is buried under the
Order's translation fifteen lines later and stays buried for six chapters. F4 sits **struck and
unexplained on one phone from the Prologue onward.** F7 and F8 are delivered loudly at T8. **F5 — the
price — is delivered on one phone, on an optional path, one chapter late, and is never joined to F13
on any shared surface until after the Decision is irreversible.**

### M7.1 Is the reveal earned?

**F3 — four went down, not one: earned, and well. Grade A.** Eleven crumbs across every channel:

| T | breadcrumb | channel | optional? |
|---|---|---|---|
| T1 | "**four people** closed a wound" — the game's first sentence | Hearth | no |
| T1 | Law 0, struck: "COLD is written by **four hands**" | Binder's Book | no |
| T2 | the lamp lights on **four hands**; "Four hands is how this school does anything that matters" | Hearth | no |
| T4 | four statues, four dials, four holes, **none matching** | Seer's phone | no |
| T4 | both readings of Mere's strip, in advance | Reader's phone | no |
| T4 | "**four, as one, went through. Not one.**" | Hearth | `CH2_STRIP='right'` |
| T5 | the portraits mutter "**four went down**" | Hearth | no |
| T5/T7 | "four going down the stair and **four coming back**" | Listener's phone | no |
| T6 | four figures under the paint; no child; four shadows | Hearth + art | `TAPESTRY` |
| T7 | four thrones; a Founder's gates that need four readers | Hearth | no |
| T8 | the stone, read from its foot | Hearth | no |

**F5 — it cost them their Sight: [UNEARNED].** Every pre-decision crumb is optional, private, or both:

| T | breadcrumb | channel | gate |
|---|---|---|---|
| T7 | "**came up grey**" | Reader's Book | `LETTER` + `JOURNAL`, **and delayed one chapter** |
| T7 | a Sighting is spendable and returnable | Hearth | **`STAIR='HOLD'` only** |
| T8 | "Four Masters, four **Sightings**. The Convocation would not pay it." | Binder's Book | **opt-in reveal** |
| T9 | what *you* lose if you walk | four private phones | `WALK_UNLOCKED` |
| T10 | "**the way the Founders came out: grey-eyed and ordinary**" | Hearth | none |

**There is no path on which the shared screen says, before the Decision, that the Founders paid with
their Sight.** The reveal lands in the epilogue, in a subordinate clause, after the only decision it
could have informed. **Three of these five breadcrumbs and it is earned:**
(1) T1, one clause — the cuts are *burnt*, not worn, and burnt is not the Reader's problem — which
repairs §6/**X1** and plants that the fire eats its own record; (2) T5, one clause on the Listener's
portraits — *and all four are painted grey-eyed*; (3) T6, one clause on the Seer's tapestry plate —
*the paint at their eyes is grey and the overpainter did not bother to copy it*; (4) T7, one whisper
at `ch5_descent` — *"Reader — you are carrying her handwriting"*; **(5) the keystone: Marrow's line at
the Decision.**

**F7/F8: earned. Grade A−**, docked only because F8 is CLAIMED BY Marrow and no other surface
corroborates the arithmetic.

**F9 — one refused, one never asked: [WITHHOLDING].** One sentence, one phone, a two-flag path, never
referenced again — **and the game builds a door on it** (`ch5.js:287`) that the table can walk through
without ever learning what it means. The arithmetic is already built: four thrones, **five arches**,
one door for the unasked. **Nobody has said the number out loud.**

**F15 — who the other three were: a deliberate blank, and it works — with one exception.** Hooding the
statues, effacing the plinth fronts and drawing four identical silhouettes is the mystery's *method*:
the Order erased them and the player feels the erasure. The exception is **Idony**, whose Law is the
mechanism of the Finale and whose name is in a world table nobody reads. §5.6b.

### M7.2 The driving gap — **Marrow ↔ the four, on what the Founders paid**

Not on what they *did* — that closes at T8, loudly and well. **On what it cost.**

| | Marrow | the four |
|---|---|---|
| holds F3, F7, F8 | from T0 | from T8 |
| holds **F5** | **[PROPOSED]** from T0, and never says the word | T7 at the earliest, on one phone; otherwise T10 |
| holds F12 | from T0 in substance | T8, one phone, opt-in |
| holds F13 | from T0 — it is her plan's alternative | **T9, privately, after the Decision is offered** |
| what she does with it | **substitutes a child**, and raises the child for it for fourteen years | **pay it themselves**, thirty seconds after being told what it is |

**The line that proves the gap exists:** `ch7.js:367` — "**The ring has been ready for fourteen years.
Decide.**" An imperative to choose, from the only person in the room who knows what each choice costs,
**containing no cost.**

### M7.3 Untapped

| # | the asymmetry | where |
|---|---|---|
| B1 | **Three people in the Great Hall have seen under the paint and none knows about the other two** — Vane, Marrow, Oriel. Oriel already "asks two questions" during the vote; one could be about the paint, to Vane, in front of Marrow | ch1 |
| B2 | **The Reader holds both readings of Mere's strip from T4 whether or not the table finds the strip** | any later scene |
| B3 | **The Listener alone is told the portraits showed four coming back** — the only evidence that the Founders *survived their own walk*, which is the difference between E0 as a sacrifice and E0 as a payment. It is on one phone and dies there | ch6 or ch7 |
| B5 | **Wren speaks F9's second clause before the document exists** (`ch5.js:287`) — one Reader line ("you have heard that phrase before, in handwriting") makes T7's delivery a recognition instead of an infodump | ch5 |
| B7 | **Marrow is breaking the work of a woman she reveres in front of the people she is asking to imitate that woman** — three beats already written, none answered, and Wren is standing there | `ch5.js:395`, `:480`, `:553` |
| B9 | **Idony's Law governs the exact ring the Finale turns and her name is never said in that chapter.** The notch at socket 1 is "a signature, and a decoy" | ch7, Binder's page |
| B10 | **Four thrones above a drowned hall with five arches.** Pairs with F9. The arithmetic is already in the art | ch5's ledge |

### M7.4 Inconsistency cross-refs

§6/**E2**, **E25**, **E33**, **E34**, **E36**, **E38**, **E51**, **E52**, **E53**; §6/**X5**, **X6**,
**X8**, **X44**, **X45**, **X46**.

### M7.5 Branch headline

**The cost half of this mystery is gated behind `CH2_NICHE` → `LETTER` → `JOURNAL` → `maxChapter>=5`
— four gates, three of them player choices, one of them a bug — and sits on one phone at the end of
it.** The act half is on eleven surfaces and unmissable. *A table that plays well and chooses "Take it
and go" in Chapter II finishes the game never having been told, before the last scene, what the four
Founders gave up.* Two further branch facts worth keeping:

- **`STAIR='COLLAPSE'`** has COLD written **by one hand** and it works. Wren says so out loud and the
  game moves on. §6/**X5** — this **actively damages the mystery**.
- **`REFUSED_OATH` / `OATH 0`**: the unsworn party comes down **Mere's door for the unasked** —
  *they are the ones who were not asked* — and nothing anywhere says so. **The richest free payoff in
  the document.**

---

## M8 · YEAR 212

**Scope.** The crime: what the Convocation did, why, and who can ever know it. **This is the home of
the motive.**

### M8.0 Proposition ledger

| # | proposition | where it is knowable |
|---|---|---|
| **P1** | in Year 212 the Founders' seal failed | Binder's Book, **opt-in, T8 only** |
| **P2** | renewing it cost **four Masters their Sight** | same |
| **P3** | **the Convocation would not pay it** | same |
| **P4** | it **struck Law 0** and "called it grammar"; wrote **Law 6** in its place | Binder's Book, **from T1**; Sight tab T8 |
| **P5** | it **sent one Warden down alone** | Binder's Book, opt-in, T8 only |
| **P6** | it **rebuilt the antechamber** — new floor, four plinths in a derangement, names effaced | Seer + Binder phones, T4; the Hearth says "newer", not why |
| **P7** | it **bricked the Founders' road** and stamped **212** beside it | Hearth **art only**, T4 |
| **P8** | it **overpainted the tapestry**, hangs the copy **in every hall**, and **repaints it** | Hearth T6, `TAPESTRY`; maintenance only on `ORIEL` |
| **P9** | it **taught the school its translation** | Hearth T1; disproved T8 |
| **P10** | **motive: cost-avoidance dressed as grammar** | Marrow's mouth, T9, **double-gated** |
| **P11** | Laws 9 and 11 are the same move in the same year — two Founders' cases collapsed to one universal case | derivable on the Binder's phone T4 + T7; **nothing prompts it** |

**The one number nobody says.** `212` is **never spoken by any character on any branch.** On the
Hearth it exists only as a carved numeral in the art; everywhere else it is phone-side. Verified by
grep. **Consequence for every table: no character can be shown to know the date. Every belief about
*when* is a phone perception, private to one seat.** **[WITHHOLDING]**

### M8.1 Movement table — what the shared screen has said vs what is on phones only

| T | **shared screen** | **phones only** |
|---|---|---|
| T0–T1 | — (the art caption **THE ORDER'S READING**, read by nobody) | Binder: Law 0, struck, "by the Convocation, 212" |
| T2 | — | Binder: unchanged |
| T3 | "what is under the paint", twice; "**Nobody knows what that means**" | — |
| T4 | the floor is newer; an arch bricked with newer stone; the numeral **212**; *(opt.)* Mere's name and the strip | **Seer: the derangement. Binder: "the newer one was written in 212 — the year this room was rebuilt."** |
| T5 | "four went down" (portraits) | Binder: the ward's stratum contradiction |
| T6 | *(TAPESTRY)* four figures, no child; "So he had"; *(ORIEL)* "they painted it back inside the week" | Binder: Law 0 flips to **RESTORED, silently** |
| T7 | "That is not in the Book I was given" | Binder: Year 0 vs Year 212 plate; **two oaths sworn in 212**. Reader: *(LETTER)* Mere's sheet |
| T8 | the stone read; "Four went down. Not one born of four"; "the fire is only what they left behind" | **Binder: P1–P5, opt-in.** "Same ink, same hand, two hundred and twelve years apart" |
| T9 | *(KNOT)* "They could not afford four Masters, so they made it grammar"; *(wall)* "Twenty-two years"; the uncovered wall carving | — |
| T10 | "The rest is never carved" — **which is Law 6** | Binder: the Law's final state |

### M8.2 The driving gap — **Marrow ↔ the Binder** (§3/A2, and the same pair as M4/M9)

She has the **motive** and not the **Law**. The Binder has the **Law** and not the motive. Each has had
their half since before the other walked into the room, **and they are never once made to trade.**

**The three scenes that exploit it — all three of them:**

1. **T7, `ch5_silent`** — the gate takes COLD; "That is not in the Book I was given." *This is the
   exploit.* One line, unanswered; **Wren gets the punchline instead.**
2. **T8, `ch6_open`** — "**Binder — the struck Law is back in your Book.**" The Hearth tells the room
   the Binder has it, **in Marrow's presence**, and she does not react. (Worse: on most branches the
   card has read RESTORED since T6.)
3. **T9, `ch7_argue1`**, the `letter` option — the four say "A struck Law says the cold word is written
   by four hands"; she answers with the motive. **The only moment in the game where the two halves
   touch, and it is gated on `OATH_KNOT` and on the table choosing one of four options.**

### M8.3 Untapped

`ch2_top` — one line ("What did the floor say?") and the Binder must either report 212 to the Chair or
withhold it from her; **her reaction to the year is the whole character** · `ch4_swear` — **move
`ch7.js:394`'s confession here, ungated**; it costs nothing, it is already written, and it makes the
oath a scene between two people who did the same thing thirty years apart · `ch5_silent` — give the
Binder a beat after her line · `ch6_open` — gate the announcement on `!LAW0_ALREADY` so it is true when
it fires, then let Marrow ask **what else** the Book says · `ch7_argue1` — give the non-KNOT branches a
shorter version of the same exchange: she has no standing to bar the Walk, but she can still be asked.

### M8.4 The two paths

**Worst case** — `VOTE_LOST` (no Oriel, no Sorrel) · "Take it and go" at `ch2_opened` (no niche, no
Mere, no strip, no rubbing) · tapestry unopened · oath EMBER or refused · `FINALE_WALL='nothing'` ·
`STONE_TOLD`. The table reaches the Epilogue having learned: a floor was rebuilt and the statues put
back wrong; a Law dated 212 loses to a Founders' Law; a numeral is carved beside a bricked arch; the
stone says four, because the Provost read it to them; and — **only if the Binder taps an opt-in block
on their own phone** — the whole of P1–P5. **P8 is never seen. P10 is never said. Oriel's maintenance
is never found. Mere is never named. Vane's history is never told.** The mystery is technically
solvable and dramatically absent. **[UNEARNED] in reverse:** the T8 reveal lands on a table that has
had almost nothing to be curious *with*.

**Best case** — `!VOTE_LOST` · `ORIEL` promised · niche → `CH2_STRIP='right'` → `LETTER` →
`LETTER_READ` · `TAPESTRY` · `chair` corner (⇒ `ORIEL_NOTE`) · oath **KNOT** · `FINALE_WALL='wall'` ·
stone solved. Every P except P1/P5 reaches the shared screen; Marrow speaks P10 and her own scraping;
Vane speaks his twenty-two years; Mere's sheet and Oriel's note corroborate from two directions four
hundred years apart. **This is the version the mystery is designed for, and it requires eight
independent choices to go right.**

### M8.5 Inconsistency cross-refs

§6/**E12**, **E15**, **E21**, **E29**, **E34**, **E35**, **E36**, **E37**, **E38**; §6/**X4**, **X6**,
**X7**, **X8**, **X9**, **X26**, **X40**, **X41**, **X42**, **X45**, **X46**.

### M8.6 Branch headline

**`OATH_KNOT` gates `ch7_argue1` entirely.** On any non-KNOT path — EMBER, `OATH 0`, or
`REFUSED_OATH` — **P10 is never spoken by anyone on any surface in the whole game**, and neither is
Marrow's scraping. **The mystery's motive is a KNOT-branch fact.**

---

## M9 · THE SIGHTINGS — what they are, why four, and what walking costs

**Scope.** Three questions. **This is the home of the price.**

| # | question | what the game commits to | who ever says it aloud |
|---|---|---|---|
| **Q1 — what** | What is a Sighting? | "A **Sighting**. One way of seeing, one to a person, **and nobody chooses which one they get**." That is the whole definition, said once, by the narration | **Nobody.** No character defines a Sighting at any point, on any branch |
| **Q2 — why four** | Why exactly four kinds? | **Never stated.** The game *builds* the answer physically — four Founders, four plinths, four dials, four bells, four thrones, four seats, one glyph that needs four hands — and never says it | **Nobody.** The nearest thing is a joke: "Four thrones. Four Founders. It is a *theme*." |
| **Q3 — the cost** | What does walking into the Cold do to a Sighting? | **Spends it, permanently**: "You come out of it the way the Founders came out: **grey-eyed and ordinary.**" | **Nobody, before the fact.** The Hearth first names it at `ch7.js:713`, as a stage direction, at the moment it becomes irreversible |

### M9.0 The structural fact that governs every row

**The proof that walking spends Sight is partitioned exactly the way the puzzles are, and the game
never joins it on the shared screen.**

| half of the proof | who holds it | when | gate | what it does **not** say |
|---|---|---|---|---|
| **the effect** — "we wrote the cold glyph with four hands, and **came up grey**" | **the Reader alone** | T7 | `LETTER` **and** `maxChapter >= 5` | never says *grey* means *spent*; never says who paid or why |
| **the price** — "**Four hands meant four Masters giving up their Sight.** The Convocation sent one Warden down instead." | **the Binder alone**, behind an opt-in `reveal` | T8 | `ctx.unlocked('ch6')` | is about **212**, not tonight; names no consequence for the four |
| **the application to you, tonight** | **each of the four, alone**, on SPEAK | T9 | `WALK_UNLOCKED` | arrives **after** the group Decision, under a two-minute clock |
| **the statement after the fact** | the Hearth, to everybody | T9-end / T10 | none | "Your Sighting is spent. Look up." |

**Consequence, and it is the single most important epistemic fact in this mystery: on a table that
never took the ch2 rubbing and never opened the Binder's ch6 reveal, not one person in the room —
player or character — knows what the Fourfold Walk costs at the moment the table decides to do it.**

### M9.1 The four price-tags, per seat (T9, `companion/ch7.js:185-188`)

| seat | what walking costs **you** | and ENDING 0 pays it back, word for word |
|---|---|---|
| **Reader** | "you will not read tomorrow. Not the door, not the lexicon, **not whatever Wren leaves you**." | "The Reader looks at the stone and sees shapes." |
| **Listener** | "the house goes quiet. **You have never heard a quiet house.**" | "The Listener hears a room." |
| **Seer** | "every shadow will fall the ordinary way, and **only you will remember that once they did not**." | "The Seer sees a floor." |
| **Binder** | "you will never see another thread. **You will have to ask people what they feel.**" | "The Binder looks at the Provost and **has to ask what she feels**." |

### M9.2 The cost, as the partition holds it

| what is known | Reader | Listener | Seer | Binder | Marrow | Wren | Vane | the Hearth |
|---|---|---|---|---|---|---|---|---|
| a Sighting exists, one per person | T2 | T2 | T2 | T2 | T0 | T0 | T0 | T2 |
| the Founders were four | T4 opt./T8 | T5 | T6 `TAPESTRY` | T8 | T0 | T0 | T0 | **T8** |
| the Founders **came up grey** | **T7, `LETTER`** | never | never | never | **[PROPOSED]** T0 | **[PROPOSED]** T0 | never | **T10 only** |
| 212's bill was four Masters' Sight | never | never | never | **T8, opt-in** | **T0** | **[PROPOSED]** T0 | never | **never** |
| walking spends *your* Sighting | T9 | T9 | T9 | T9 | **[PROPOSED]** T0 | **[PROPOSED]** T0 | **undetermined** | T9-end |
| a Sighting can be spent **temporarily** | T7 if named | T7 if named | T7 if named | T7 if named | T0 | T7 | never | T7 |
| **why there are exactly four** | **never** | **never** | **never** | **never** | **never** | **never** | **never** | **never** |

**The last row is the finding this mystery exists to produce.** `CANON.md` §12.7's recommendation —
one Sighting per Founder, still being dealt out — costs one sentence, is contradicted by nothing, and
would retroactively earn the four dials, the four plinths, the four bells, the four thrones, the four
corners of the study, Mere's eight questions and four eyes, and the price the Convocation of 212 would
not pay. **It is currently the largest unclaimed piece of meaning in the game.**

### M9.3 The driving gap — **Marrow ↔ the Binder, on the invoice** (§3/A2)

From T8 the Binder holds, alone, the Order's own accounting of what four hands cost — in a Book that
Marrow has **publicly admitted is not the Book she was given**. Marrow, from T0, holds the same fact
from the other side: she is the Chair of the body that refused to pay, she can quote its reasoning
verbatim, and she has spent fourteen years building an alternative that costs the school nothing and
costs one child everything. **Neither of them knows the other knows.** The Book that contains the
invoice sits in the hands of a fourteen-year-old standing next to the woman who refused to pay it, for
two entire chapters.

**Rejected rivals:** Wren ↔ the four (Wren's withholding here is passive — that is M3's gap); Marrow ↔
the four *as a body* (a body cannot hold an asymmetry — the whole point of the partition); the
volunteer ↔ the other three (sharp and lovely, but branch-gated on `STAIR='HOLD'`).

### M9.4 Untapped

| # | where | what is missing | cost |
|---|---|---|---|
| U1 | `ch6.js:851-853`, right after "THE FOURFOLD WALK IS OPEN" | one line for the Binder to read from the card, one for Marrow to answer. **As shipped the Walk opens with no price attached** and her next scene is the Finale | 2 lines |
| U2 | `ch7_decision` | a whisper to the Binder: *"your Book has a page about the last time somebody was asked this."* The Decision runs with the price in a closed drawer, and is explicitly the one unhurried beat | 1 line |
| U3 | `ch5_hold_named` / `ch6_tieoff` | **the only character with experiential knowledge of the Finale's price is silent about it in the Finale.** One line from the volunteer: "I've had mine off for an hour. It isn't nothing." | 1 line |
| U4 | ch1, anywhere | **nine Masters with nine Sightings decide the fate of a child, and 212's bill was four Masters' Sight.** Nobody observes that the room contains more than twice the currency required | 1–2 lines |
| U5 | `ch7_wall` / `ch7_vane` | Vane never prices the four's Sightings, though the Crown registers them by dawn on his own ending. "They are asking you to pay with your eyes. I am asking you for a child" would make him the only honest broker in the room | 1 line |
| U6 | `ch8_e3` | **Marrow walks and the game does not say she is spending her Sighting.** One clause — "and her eyes go grey" — applies the game's own rule to its own Provost | 1 clause |
| U7 | ch2, the Founders' Door | "Four dials. They did not build it for cleverness." — plants Q2 twenty scenes before the thrones joke | 1 line |

### M9.5 The four knowledge-configurations at `ch7_decision`

| # | configuration | who at the table knows the price | how common |
|---|---|---|---|
| **A** | `!LETTER`, card unopened | **nobody** | **commonest** |
| **B** | `LETTER`, card unopened | Reader holds "came up grey", unglossed and uncued | common |
| **C** | `!LETTER`, card opened | Binder holds 212's bill; nobody holds the Founders' side | common |
| **D** | `LETTER` + card opened | Reader and Binder hold complementary halves **and have no scene in which to join them** | uncommon, and the one the game should be written for |

**Author's decision required (§7/U20).** Configuration **A** is currently the default, and in it the
Fourfold Walk is chosen blind. Either that is the intent — in which case `ch7.js:713`'s "Your Sighting
is spent" is the reveal and should be **staged** as one — or **D** is the intent, in which case U1 and
U2 are not enhancements but repairs.

### M9.6 Inconsistency cross-refs

§6/**E3**, **E24**, **E25**, **E26**, **E27**, **E41**, **E44**, **E45**; §6/**X36**, **X37**,
**X38**, **X39**, **X18**.

### M9.7 Branch headline

**The Binder's ch6 `reveal` toggle is not a flag — it is an un-instrumented UI opt-in.** It gates on
`ctx.unlocked('ch6')` only, so the card is available on **every** branch; **whether the Binder taps it
is recorded nowhere.** It is the most consequential uninstrumented choice in the game. Alongside it:
`WALK_UNLOCKED` false means nobody is ever told what walking costs, because nobody can walk, and Q3 is
never posed at all.

---

# 5 · PERSONAE

**The four layers, and the rule that keeps them apart.** A layer may only be sourced from the kind of
evidence in its right-hand column. A claim sourced from the wrong column is a leak, and a leak is how
these documents rot.

| layer | the question | may be sourced from | may **never** be sourced from |
|---|---|---|---|
| **1 · ACTUAL** | what they are really like | narration; art; mechanics; what they *do* under branch; other characters' observations; a Sighting's factual block | their own claim about themselves |
| **2 · SELF-IMAGE** | what they believe they are like | their own speech and writing; what they do unprompted and unwatched | narration's verdict on them |
| **3 · BELIEVED REPUTATION** | what they think *each named other* thinks of them | how they address that person; what they pre-empt, apologise for, or refuse to say to them | what that person actually thinks |
| **4 · FEELING** | what they feel / what they show / the gap | both halves cited **separately**, never one cite for both | inference from layer 2 |

**The pronoun.** Every Hearth line in the shipped game is scrupulously pronoun-free about Wren; only
Vane and his soldiers say "the boy"/"he". Two companion lines break it in opposite directions
(§6/X14). **This document keeps the house convention.** The convention is almost certainly diegetic:
*the narration declines a pronoun because Wren is not, until the last twenty minutes, a person of whom
one is true.* §7/U6.

---

## 5.1 WREN

### 5.1a Layer 1 — ACTUAL

| # | trait | evidence |
|---|---|---|
| **W1** | **Opens with an imperative. Never asks.** Across nine chapters and five endings Wren does not once ask anybody for anything on Wren's own behalf | "I need four idiots and a lamp." `ch0.js:145` · "Finish the ring." `ch7.js:683` · "Write it." `:722` |
| **W2** | **Diagnoses people accurately, affectionately, without permission** — four people in four clauses, every one correct, every one quoted back in the goodbye letters | `ch0.js:146-149` → `companion/ch8.js:86`, `:94`, `:110`, `:126` |
| **W3** | **Names own situation with flat accuracy and no self-pity** | "I'm the thing they're all coming to look at." · "I don't get a say. **That is the entire job.**" · "the occasion" · "**Four idiots and a hollow.**" · "I'll stand in the bit that isn't written." |
| **W4** | **Jokes as armour: always at own expense, one italicised word per line** | "I looked *terrible*." · "You took your *time*." · "It is a *theme*." |
| **W5** | **Wants truth over kindness, and says so to the person's face** | "That was kind. **It was not true, and I would rather have had the true one.**" `ch6.js:320` |
| **W6** | **Manages other people's guilt — including the guilt of people who have just wronged Wren** — and does it fast, before they can start | "It's alright. **I'd have taken it too.**" `ch7.js:499` · "**Wren is lying, and is fourteen, and is doing it for you.**" `ch1.js:303` |
| **W7** | **Finishes other people's sentences generously** — and supplies the *kindest available* word, and is corrected | Marrow: "I raised it to be—" / "'**Loved**,' says Wren." `ch6.js:692` |
| **W8** | **Runs the table's protocol, in six chapters**, in the register of a nagging friend — which is why nobody notices it is a job | "Has everyone actually said their bit?" `ch0.js:204`, `ch3.js:369`, `ch4.js:395`, `ch5.js:198`, `ch6.js:793`, `ch7.js:594` |
| **W9** | **Silence is the tell. Not the jokes** — and the game states it twice, in its own voice | `ch8.js:262`, `:354` |
| **W10** | **Fidgeting is the physical signature, used as a duress meter** | `ch1.js:127` → `:243` → `:305` |
| **W11** | **Disobedient in exactly one direction: toward the four.** No exceptions anywhere | `ch1.js:115`; `ch2.js:358`; `ch5.js:287-288`; `ch6.js:630-633` |
| **W12** | **Keeps a running model of four other people's knowledge states and uses it to time questions** | "Reader. **You read the old tongue *now*.**" `ch6.js:663` |
| **W13** | **Knows things only one seat can perceive, and nobody ever asks how** | `ch0.js:172-174` → §6/**E2** |
| **W14** | **Treats the fire as a person who could take offence** — in a game whose reveal is that the fire *is* four people | `ch6.js:473` |
| **W15** | **Accurate about his own market value, and says the price out loud** | `ch7.js:499`, `:433`; `ch0.js:156` |
| **W16** | **Physically careless with a body he does not quite believe is his** | `ch2.js:369-376`; `ch8.js:311` |

**The defining contradiction.** *Wren runs the entire night by instruction and has never once made a
request — and the thing Wren wants most is to be asked for.* The evidence for the second half exists
in exactly two places, **both after it is too late to act on**: E2's "It is alright. **I knew. I
wanted to hear what you would say**"; E0's "You *idiots*. **I had a *speech*.**" Wren spent nine
chapters arranging a night in which no one would ever have to *choose* to save him — and the only
ending in which Wren is happy is the one where they chose anyway, unprompted, and Wren is furious
about it. **Wren is generous in a way that is, structurally, a refusal to be loved on terms Wren did
not write.**

**What Wren would not admit:** (a) that he wanted to be saved; (b) **that fourteen years of being
raised as an instrument were done to him, and that he has a grievance about it** — Wren has **no
reproach line to Marrow anywhere in the game, on any branch**; (c) that he has known for years that
each of the four was privately miserable about him and said nothing until it was useful — *the least
likeable fact about Wren, and the game never marks it*; (d) that he is frightened; (e) that he does not
know what he is, only what the stone says he is; (f) that the fire is the only relationship in his
life that has never asked him for anything.

**What the game never permits Wren to be:** cruel (once, by silence, on E4, and it is named); **wrong**
(every Wren diagnosis in the game is correct — **[PROPOSED]** a cost: it makes Wren an instrument of
the narration); angry at an adult; pronouned.

### 5.1b Layer 2 — SELF-IMAGE

| # | Wren believes… | verdict |
|---|---|---|
| **S1** | "I am the occasion, not a person in the room." | **Accurate, and out of date by the last twenty minutes.** On E0 Wren acquires a pulse and a thread and the self-image has no room for it — hence the fury |
| **S2** | "My job is to be still and be decided about." | **True on T1–T3; false from T5 and Wren does not update.** Wren is the most active agent in the game |
| **S3** | "I am the one who keeps the four working." | **Accurate, under-claimed.** Wren frames it as fussing; it is command |
| **S4** | "I am not owed anything, and asking would be rude." | **Flattering to the four, corrosive to Wren, and the engine of the contradiction.** Wren believes the refusal to ask is *manners*. It is fear |
| **S5** | "I am funny, and that is a service I provide." | **Accurate about function, wrong about audience.** The jokes are for Wren |
| **S6** | "They think I am brave. I should keep that up." | **Out of date at the moment it matters.** On E3 the pose becomes the job |
| **S7** | "I know what I am." | **Half-true.** Wren knows the *reading*, not the mechanism |
| **S8** | "Marrow loves me and cannot say it, and it is my job to say it for her." | **True, and the kindest self-deception in the game**: Wren has cast himself as her translator so as not to have to be her grievance |

### 5.1c Layer 3 — BELIEVED REPUTATION

| the other | Wren believes they think… | is Wren right? |
|---|---|---|
| **Marrow** | "she loves me and cannot afford to say so; she thinks of me as a thing she named and is keeping ready; she will not say 'loved' without a clause after it" | **Right on every count, including the clause.** Wren has modelled her exactly and has decided to be gentle about it |
| **the four, as a body** | "they notice everything and are being polite; they lie out of kindness; they think I am brave" | **Right about the politeness, wrong about the cost.** The four were not being polite — they were privately *ashamed*. **Wren read manners where there was self-blame** |
| **the Reader** | "thinks I am a text he has not finished" | **Right** |
| **the Listener** | "thinks there is something wrong with her ears, and has for years, because of me" | **Right** — and this is Wren's single most culpable piece of knowledge |
| **the Seer** | "thinks I am poetic, and is embarrassed to have said it" | **Right, and generous** — Wren credits the Seer for both the silence and the telling |
| **the Binder** | "thinks I am a case her rules cannot cover, and is frightened of what that says about her" | **Right** |
| **Vane** | "thinks I am valuable and not a person; his word will hold because his regard is contractual" | **Right, and it is the most frightened thing Wren says all night.** Vane never addresses Wren once in the entire game |
| **the Convocation** | "I am a sum being done, and an argument older than I am" | **Right**, and the game corroborates from the other side |
| **Sorrel** | "she despises me, personally and specifically" | **Unknown.** Sorrel never speaks of Wren as a person anywhere. **[GAP]** |
| **Oriel** | "she is working something out about me and has not told me the answer" | **Right, and never resolved** |
| **the school** | "nobody's job. Which is freedom." | **Wrong, and it is the saddest wrong belief in the game.** Wren reads institutional neglect as licence |
| **the Hearth** | "it has an opinion of me, and I would rather not offend it" | **[PROPOSED]** true in the strongest possible sense |

### 5.1d Layer 4 — FEELING (felt / shown / the gap)

| toward | felt | shown | the gap, and what closes it |
|---|---|---|---|
| **Marrow** | love, with an **unpaid grievance** underneath it that has never been billed | mockery in the third person; "Mum" in the second; a public grant of absolution | **The whole grievance. Nothing closes it on any branch.** §5/P7 |
| **the four** | the only belonging Wren has | orders, diagnoses, nagging, and four letters that can be read exactly once | **Wren will not say he wants them to choose him.** Closed only by the endings |
| **the Reader** | trust: the only person who can give Wren his own name | a question asked over a kettle so the others cannot hear | Wren asks for the name and never says *why he needs it*. E2 pays it in the negative |
| **the Listener** | guilt, unnamed | two askings, and a refusal to accept the kind lie | **Enormous, and closed only on E0, in writing, after Wren cannot be thanked for it** |
| **the Seer** | gratitude, expressed twice, both times for two opposite things at once | a laundry joke that deflects a true answer | closed in a letter |
| **the Binder** | something close to pity: the seat whose gift Wren *breaks* by existing | "Hold out your arm and look." | closed on E0 only |
| **Vane** | fear, and a technical respect for a man who keeps his word | brittle courtesy | **never closed on any branch**; on `VANE_ALLY` Wren never reacts to him standing down at all |
| **the Hearth / the Founders** | fellow-feeling, or something without a word for it | politeness, and a joke about its size | **the most valuable unexploited relationship in the game** |
| **himself** | not much, and it is not an affectation — the only character who never expresses a preference about his own future | jokes about being a hollow, a gap, an occasion | closed only by a pulse |

### 5.1e What Wren wants

| | |
|---|---|
| **could say aloud** | "One thing that's mine." — said in the Prologue, about a lamp, and immediately converted into a job for four other people |
| **could not say aloud** | "**Choose me. Out loud. In front of everyone. And then tell me why.**" Wren's plan is a machine designed to produce that outcome without anybody having to decide to produce it — and E0's fury is the machine being bypassed |
| **does not know he has** | to be a **person of whom a pronoun is true.** The game grants a pulse and a thread and Wren has never once asked for either |

### 5.1f Wren's worst moment — and the game does not have it

> **The Prologue, `ch0.js:226-227`:** "Yes. All four of you. I've known for years." / "It's fine. You
> can stop pretending you didn't notice."

Read against the four private pages just shown to four players, Wren has watched four friends each
quietly conclude that something is wrong *with them*, for years, and has said nothing — then announces
it as a punch line, with "It's fine", and moves on to choosing a group name. **It is the one moment in
the game where Wren's management of other people's feelings is indistinguishable from using them, and
the narration says nothing.**

| candidate | marked? |
|---|---|
| the Prologue announcement | **No**, on every branch |
| knowing seat-private facts and using them to recruit | **No** — §6/E2 |
| the E4 silence | **Yes, explicitly** — but branch-gated to the ending the player is already being punished by, and framed as Wren's *withdrawal of forgiveness*, which most readers will read as justified |
| absolving the bargain-taker | **No.** It reads as grace. It is also a pre-emptive refusal to let a friend own a betrayal |

**The design problem, plainly:** a character the reader is never allowed to dislike is not trusted by
the author. Every unkind thing Wren does is invisible, unremarked, or re-labelled as generosity, and
the only sanctioned dislike is quarantined inside the bad ending. **Two fixes, both one clause**
(§5/P2, P7).

### 5.1g THE COMIC ENGINE

**The trigger.** Wren makes a joke when **somebody in the room is about to feel something about
Wren**. Not when Wren feels something — when *they* do. **The joke is not a response to danger; it is
a response to attention.** Checked against every instance, twelve for twelve:

| beat | who was about to feel something | the joke |
|---|---|---|
| the dais, nine Houses staring | the hall, and the four at the back | "I'll try not to fidget." `ch1.js:127` |
| soldiers on the step (`VOTE_LOST`) | the four, who have just lost the vote | "They have a warm room. I've never had a warm room." `ch1.js:302` |
| a broken arm, hauled up on a cloak | the four, who chose the box | "It's only my arm. **Don't look like that.**" `ch2.js:375` |
| handed to the captain | the four, who surrendered him | "Tell the Provost I said the corridors were *easy*." `ch3.js:633` |
| the journal that calls him *it* | the four, reading it | "She writes *it*. And then she writes that." `ch4.js:497` |
| the grey thread | the Binder, who has just named a colour | "Grey is a colour. I have seen grey. Grey is fine." `ch4.js:594` |
| four empty thrones | everyone | "Four thrones. Four Founders. It is a *theme*." `ch5.js:349` |
| the Founders' Count, which Wren cannot play | the four, mid-triumph | "I would have got two of them. I do not have a phone." `ch5.js:479` |
| the Hearth seen from beneath | everyone, at the reveal | "It is smaller from down here." `ch6.js:473` |
| the Decision taken out of his hands | the four, who have just chosen to walk | "Fine. Fine! Four idiots and a hollow." `ch7.js:423` |
| midnight, the fire out, total dark | the four, frightened | "Well. Nothing is on fire." `ch7.js:683` |
| two friends left grey-eyed for him | the four | "I looked *terrible*." `ch8.js:323` |

**What it defends against.** Not death, not the Cold, not the Convocation. **Being the object of
somebody's pity — because pity is the form attention takes when the attention is about what Wren *is*,
and what Wren is, is a hollow.** Secondarily: being **owed**. Pity is a gift already given, and a
person who has received cannot decline the next request. The mechanism is visible in the syntax: the
joke almost always contains an instruction not to feel — *"Don't look like that", "Don't do faces",
"Do not tell it I said that"*. **The joke is a stage direction to the audience, issued by the person
on stage.**

**Audience selection.** Wren jokes at **whoever is least able to bear the moment, not whoever caused
it.** After the Envoy wins, the joke goes to the four, not to Vane. After the stair, to the people who
chose the box, not to the arm. **The engine is a triage system.**

**The four gears.**

| gear | pressure | what the comedy does | cite |
|---|---|---|---|
| **1 · ambient** | none | diagnosis-as-endearment; observational; punchline last | `ch0.js:146-149` |
| **2 · loaded** | somebody is about to be kind | the instruction appears **inside** the joke | `ch2.js:375`; `ch7.js:405` |
| **3 · overloaded** | something is happening to Wren's body or future | **stacking** — "Also… Also… Also —", the sentence abandoned | `ch2.js:360` |
| **4 · off** | the thing has happened | **silence, and the game names it**; or the mechanical kill-switch, `WREN_SCARED` | `ch8.js:262`, `:354`; `ch3.js:234` → `ch4.js:79` |

**The key inversion:** most comic characters get funnier under pressure. **Wren gets shorter, then
stops.** The reader learns, by ch4, that a quiet Wren is an emergency — which is why `WREN_SCARED` is
worth more than any line it deletes, and why it is the **largest under-used instrument in the game's
characterisation**: eight authored swaps, used in exactly one chapter, read by nothing in ch5–ch8.

**What the jokes are about**, by frequency: Wren's own non-personhood (the largest class) · Wren's
exclusion from the four's apparatus ("I do not have a phone") · adults being absurd on their own terms
· the four being formidable (affection) · the fire (once). **What is missing:** Wren never jokes about
the Cold, about dying, about the Crown, or about Marrow's love.

**The swerve.** Every Wren joke about being a hollow **swerves away from the fact that being a hollow
is a thing that happened to a baby.** Wren will say *the occasion, the hollow, the gap, the bit that
isn't written* — all nouns, all present tense, all descriptions of a **shape**. Wren never once refers
to **the night the fire went out**, the only event in the world that is about Wren, and the one every
other character discusses freely. **Second swerve:** Wren never jokes about being *wanted*. Every
status joke is about being **looked at** or **used** — never about being chosen, kept or belonging.
The word *mine* is in Wren's mouth exactly once in the game, about a lamp, in the first four minutes.

**The economy.** ch0 heavy (7) · ch1 two · ch2 three · ch3 five · ch4 four **or zero**
(`WREN_SCARED`) · ch5 six · **ch6 one** · ch7 three · ch8 one per ending. **The comedy thins toward
the centre of the night and stops almost entirely in ch6** — which is correct, and means the ch6 crack
must be the smallest in the set.

### 5.1h THE CRACK POINTS — where the levity breaks for exactly one clause

**The rule.** A crack is **one clause, never a sentence**. It arrives **inside** a joke, not after it.
It is about **wanting**, not fear. **Nothing in the scene stops to acknowledge it** — the next clause
re-arms, or the next speaker carries on. If a crack needs a reaction line, it is too big.

**The shipped precedent** (already in the game, on the phones, and it works): "*Right. Okay. Thank you
for not — right.*" — **the kettle covers whatever comes next** (`companion/ch3.js:289`); and "*Nobody's
ever said that to me. Everyone always knows.*" then, almost too low to hear, "*Thanks.*" (`:295`).

| ch | site | **the crack** | what the clause admits | the re-arm already in the script |
|---|---|---|---|---|
| **0** | `ch0.js:227` | "…stop pretending you didn't notice. **You were kind about it, which was worse.**" | Concedes in seven words that four years of tact cost Wren something, and blames nobody. Answers §5.1f | `:228` "And you need a name. As a set." |
| **1** | `ch1.js:127` | "I'll try not to fidget. **I've been practising.**" | Turns a gag into a fortnight of a fourteen-year-old alone in a room learning to be looked at. Pays off mechanically at `:243` and `:305` | the doors open |
| **1 (alt)** | `ch1.js:306` | "Like a sum she was doing. **She got the wrong answer and looked pleased.**" | Wren watched Oriel watch him all evening, and graded her | the pivot to the Seer. **Collides with the above — take one** |
| **2** | `ch2.js:375` (`WREN_HURT`) | "Don't look like that — **no, do** — you got the box." | A two-word self-interruption: Wren countermands his own instruction not to be pitied, then buries it | `:376` "Wren does not mention it again, **which is the worst part**" — already written, and now it means something |
| **2 (alt)** | `ch2.js:369` | "Ow. Thank you. Ow. **You picked —** that was important, wasn't it. The box." | Wren begins "you picked me", hears it, converts it into the box | "Nobody answers." |
| **3** | `ch3.js:530` | "Even the ones who lied. **Especially.**" | One word, its own sentence: Wren is grateful **for** the lies — and it pre-loads ch6's refusal of the kind lie, making that refusal a *change* rather than a rule | `:531` "Nobody asks which ones that means." |
| **3 (alt)** | `ch3.js:405` (`WRIT`) | "I called her a goat once. To her face. **She still knew which child I was.** Goats are underrated." | Wren expects not to be individually known by adults | the goat joke |
| **4** | `ch4.js:594` | "Grey is a colour. I have seen grey. Grey is fine. **It is.**" | The fourth assertion is not a joke and not an argument — a person insisting to himself | the corner closes |
| **5** | `ch5.js:479` | "I do not have a phone. **Or a seat.**" — *or* "I would have got two of them. **Nobody made me a page.** I do not have a phone." | Wren names the real exclusion — no Sighting, no seat, not one of the four — in the register of a joke about equipment | Marrow's next line ignores it completely. **The re-arm is somebody else's indifference, which is crueller and better** |
| **5 (alt)** | `ch5.js:349` | "Four thrones. Four Founders. **Somebody sat in those.** It is a *theme*." | Wren has never had a seat anywhere; the only furniture in the world made for him is a hole | the joke. **ch5 now has three candidate sites — take at most two, never adjacent** |
| **6** | `ch6.js:473` | "Do not tell it I said that. **It has enough on.**" | Wren extends sympathy to the fire an hour before being asked to do what the fire did — and plants the chapter's own thesis in the mouth of the person it is about, as a joke about workload | the pivot to the stair-flag whispers. **Smallest crack in the set, and it must stay that way** |
| **7** | `ch7.js:683` | "Well. Nothing is on fire. **Say something, one of you.** Finish the ring." | **The single most important crack.** Midnight, the spark out, the room black, and Wren — who cannot see them — asks for a voice. Phrased as protocol-coaching so it reads as W8, but it is a **request**, and Wren does not make requests | `:684` "Nothing you have done is undone." — **the narration answers it instead of a person**, which is exactly right |
| **7 (alt)** | `ch7.js:697` | "It's cold in here. Obviously. It's me. **Somebody measured.**" | The hole is exactly Wren's size and was cut four hundred years before Wren. Plants §7/U15 at zero cost | "Four sealed words said WALK." |
| **8** | `ch8.js:323` (E1) | "Half of you can't see me properly any more. **Half.** Good. I looked *terrible*." | One word, repeated flat, before the joke can start. Wren has to say the number once without a tone on it | the joke lands one clause later |
| **8 (alt)** | `ch8.js:312` (E0) | "You're all *awake*. Excellent. **I did knock.**" | Wren stood outside a door full of his four favourite people and waited to be let in — on the ending where Wren has a pulse and a thread. The last Wren line in the best version of the game | the scene ends |

**Where a crack must NOT go** — four beats already carry their own break:

| beat | why it is already cracked |
|---|---|
| `ch6.js:689` "And — Mum. I know. I have known since the laundry." | **the em dash before "Mum" is the crack**, and the finest one in the shipped game |
| `ch7.js:697` "It's cold in here. Obviously. It's me." | the joke *is* the confession |
| `ch7.js:759` (E0) "You *idiots*. I had a *speech*." | two italics in one line — the only violation of Wren's one-italic rule in the game, and it is deliberate: the armour has broken in half |
| `ch8.js:262` (E2) / `:354` (E4) | silence, named by the narration both times |

**Cost of the primary set:** 34 words across nine chapters; no new scenes, flags or branches. Eight of
nine sit on universal paths.

**One consequence worth naming.** The house convention of never pronouning Wren is the **narration's
version of the same joke**: the narration too is declining to say what Wren is, using a formal device,
for nine chapters. When Wren gets a pulse the game *still* does not use a pronoun — which means the one
thing the game never grants is the thing the comic engine is built to avoid needing. **[PROPOSED]** if
the author ever wants a single devastating beat, it is one pronoun, once, in the last line of E0.

---

## 5.2 PROVOST ILSABET MARROW

### 5.2a Layer 1 — ACTUAL

| # | trait | evidence |
|---|---|---|
| **M1** | **Answers force with procedure, never with defiance.** She does not refuse the Crown; she routes it through a committee it cannot buy fast enough | "This school does not hand its children to a writ. **It hands them to a vote.**" `ch1.js:146` |
| **M2** | **Cheats her own procedure — for children, and only for children** | "The Chair has not finished hearing the Masters." → "**She is stalling for you.**" `ch1.js:178` |
| **M3** | **Does not raise her voice**, and the narration says so at the worst moment she has | `ch4.js:766` |
| **M4** | **Physical grammar: back to the fire when she has already decided** | `ch1.js:308`; `ch4.js:341` |
| **M5** | **Gives orders and costs in one tone; never comforts** — 4 to 12 words, imperative first | `ch2.js:186`; `ch6.js:488`; `ch7.js:367` |
| **M6** | **De-escalates *before* a puzzle — the one wholly honest framing she gives all night** | "Miss it and the Cold pushes further. **That is all that happens.**" `ch6.js:488` |
| **M7** | **Praises and withdraws it in the same breath** | "Good. **Do not get proud.**" `ch6.js:579` |
| **M8** | **Refuses to let failure become an event** | "Again. The next one." · "Walk anyway." ×2 |
| **M9** | **Does the physical work herself. She is the only adult in the game who kneels** | `ch6.js:484`, `:690`, `:824`; `ch3.js:445` |
| **M10** | **Yields to any argument. Including a non-argument** | "That is not a reading." … "**She steps aside anyway.**" `ch7.js:397-398` |
| **M11** | **Physical affection is unprecedented, and the narration flags it** — one touch in nine chapters, only on `OATH_KNOT` | `ch4.js:749` |
| **M12** | **One endearment in the entire game, attached to an order to die** | "**Now, love. Walk.**" `ch6.js:630` |
| **M13** | **Frightened, and it is legible to exactly one seat** | `companion/ch1.js:118`; `companion/ch6.js:251` |
| **M14** | **The one sentence she has not finished in fourteen years** | "**Who did —**" `ch2.js:396-397` |
| **M15** | **Self-indicting, and only ever afterwards, in the imperative** — her apologies are instructions to other people about how not to be her | `ch7.js:777`; `companion/ch8.js:196-198` |
| **M16** | **Talks to a four-hundred-year-dead woman as to a superior officer** | `ch5.js:395`, `:480`, `:553` |
| **M17** | **Loves in the third person and in the past tense** | "IT SLEEPS WITH THE WINDOW OPEN. IT LAUGHS AT MY JOKES." `ch4.js:211`; the grey thread |
| **M18** | **Withholds capability, not just information** | `ch6.js:824` |
| **M19** | **Expects to be argued with, and asks for it** — in the one place resistance would cost her the night | "Read it. **Argue.**" `ch4.js:355` |
| **M20** | **Never says a sentence about herself that is not an accusation.** In nine chapters, no statement of feeling, preference, hope or fear | §5.2e |

**The defining contradiction.** *She is the only adult in the game who will change her mind for a
reason, and the only adult who never offered the child an alternative she could have argued for
herself.* She yields to **every** argument at T9, including one she names as not-a-reading — and she
has been able to read the stone from its foot the whole time. **She did not lie to Wren. She simply
never opened the conversation, and then built a person who would not ask her to.** The thread went
grey the night she picked the child up: she decided the ending before the child could talk.

**What she would not admit:** that she is frightened · that the grey thread is her own grief and she
chose it early · that she could have read the stone to the nine, or to Wren, at any point in fourteen
years · that she has never named the thing below to her own Convocation · **that "Wren" is a name she
chose for what the child *is*, not for the child** · that she is asking four fourteen-year-olds
because she has nobody else, not because they are the right people — "Bound. Good. **Then I need not
carry it alone**" is the one time she admits a motive, and it is loneliness · **[PROPOSED]** that she
is not sure the school deserves saving.

### 5.2b Layer 2 — SELF-IMAGE

| # | she believes… | verdict |
|---|---|---|
| **SM1** | "I am the person who does the thing nobody else will do." | **Accurate and self-serving at once.** It is also how she avoids having to ask |
| **SM2** | "I am not a comfort, and pretending to be one would be a lie." | **True, and she has confused it with a virtue.** Her own retraction: "I should have asked anyone" |
| **SM3** | "I have been honest about the cost." | **True about costs, false about facts.** Scrupulous about *price*, systematically silent about *the reading* |
| **SM4** | "I am Mere's inheritor." | **Half-true and she knows it.** She breaks two of Mere's gates in one night and apologises by name while doing it |
| **SM5** | "I named the child and raised it to be loved. That was the kindest available plan." | **The sentence the whole character is built on** — said kneeling, without looking up. She believes it was kindness; it was preparation |
| **SM6** | "The Chair is a seat, not a person, and that is what protects it." | **Believed at T3, retracted at T10** — "Swear the next one to a person" |
| **SM7** | "I should have gone fourteen years ago." | **The only self-assessment she offers, available only on the branch where she acts on it** |

### 5.2c Layer 3 — BELIEVED REPUTATION

| the other | she believes they think… | is she right? |
|---|---|---|
| **Wren** | "he knows exactly what I am and forgives me, which is worse" | **Right.** And she is right that it is worse |
| **the four** | "I am cold, and they are correct; they will do it anyway; they should be arguing with me more" | **Right about cold, wrong about compliance.** They do argue, and she is visibly relieved |
| **the Binder specifically** | "she can see what I am and has chosen not to look at it" | **[PROPOSED]** — the game never gives Marrow a line acknowledging the Binder's gift. **The most obvious missing beat in her matrix** |
| **Vane** | "a hypocrite who knows what is under the paint and teaches the translation anyway" | **Exactly right, and he is exactly correct.** Neither ever says so to the other |
| **the nine** | "they would not follow me down, would not pay, and must not be asked" | **Probably right — and she has never tested it**, which is the same failure as everything else |
| **Sorrel** | "she would take the Ember from me if she could, and is right that the Chair is not the Convocation" | **Right, and it goes unanswered. [GAP]**: Marrow has no line about Sorrel anywhere |
| **Mere** | "she would forgive me for the gates, and would not have chosen either" | **Unknowable, and the point.** Mere's own party would not let one person do what Marrow is about to do alone |
| **Bess** | "she is mine and does not need to be asked" | **Right, and it is the quietest indictment in the game.** Her whole Epilogue advice is *ask* — and the person she has never had to ask for anything in thirty years does not look up |

### 5.2d Layer 4 — FEELING

| toward | felt | shown | the gap |
|---|---|---|---|
| **Wren** | love, entire, and grief she started paying fourteen years early. **The love and the instrument have never been two things for her** | orders; "the child"; "**it**" in writing; one endearment; one unfinished sentence; a confession told kneeling, with leave | **Named by a thread colour rather than by her.** Closed once, obliquely, on E3 only |
| **the four** | use, then something she has no register for; by T10 close to apology | errands, an oath, twelve turns of bells, one hand on a shoulder | grateful **only in writing, only on E3, and she does not wait to see it read** |
| **Vane** | a debt she will not admit: he told the truth and was exiled; she scraped the same paint and stayed and became the Chair | formal thanks when she wins; her body as the answer to his aim | **never closed.** §6/E22 |
| **the Convocation** | contempt, managed | procedure, exactly and always | she has never named the thing below to them and never will |
| **Mere** | reverence, and the specific guilt of an inheritor who has to break the inheritance | three admiring citations and one apology out loud, mid-vandalism | she never says the thing that would cost her: **Mere's party refused to let one person go alone, and she is about to** |
| **the school** | duty without affection; she is never shown liking Thornhallow | lamps and bells, personally | her successor on E3 inherits the habit of looking at the fire instead of the people — **the game's judgement on her, delivered after she is gone** |
| **herself** | nothing sayable | §5.2e | closed only by the letters, and only on E3 |

### 5.2e Voice

**4 to 12 words.** Imperative first, or fact first, then the cost. No hedging ("perhaps", "I think",
"maybe" appear nowhere in her dialogue). No comfort. **Under stress: shorter, and physical** — "Hands
on your keys." / "The Ember." / "Decide." / "Walk anyway." **At maximum pressure she stops speaking and
kneels.** Tell for a decision taken: back to the fire. Tell for fear: nothing in speech; a fast trace
on one phone. Tell for love: third person and past tense, or a comma.

**Three lines that are perfectly her:** "This school does not hand its children to a writ. It hands
them to a vote. Nine seats. Five keeps." · "Miss it and the Cold pushes further. That is all that
happens. Hands on your keys." · "**Now, love. Walk.**"
**The line that is not her:** "Four readings. Stop. Hands off it — **I have had four hundred years of
this stone and you have had five minutes.**" `ch6.js:823` — a 24-word boast from a woman who never
makes a claim about her own standing. **[WRONG]** §5/P4.

### 5.2f Her worst moment — and the game takes it back

> `ch6.js:691-692` — "It came out of the fire the night the Hearth guttered. I picked it up. I named
> it. I raised it to be—" / "'Loved,' says Wren. '**Loved enough to walk back in**,' says Marrow, and
> does not look up."

Four sentences of increasing tenderness, each beginning with "I", each a verb done *to* an object
called "it", ending in a purpose clause. **The child supplies the kind word and she corrects him with
the true one.** It is the moment the reader learns the love was never in tension with the plan because
it *was* the plan.

**And then, 158 lines later, in her own mouth, the game absolves her:** "Four people's worth of fire…
**Nobody did anything wrong.**" The line is correct about the Hearth and it is the thesis of the
chapter — and it is spoken by the character the chapter has just indicted, about a different subject,
in a way that plainly reads as absolution of everyone in the room including herself. **The reader's
permission to dislike her lasts a page and a half.** §5/P6.

---

## 5.3 LORD CASSIAN VANE, the Crown's Envoy

**Naming note.** The personal name **Cassian** appears **nowhere in the shipped game**. On screen he is
"Lord Vane", "Vane", "the Envoy". He is the only principal whose given name is never spoken — in a game
where he uses *Marrow's* given name as a weapon and the four players' given names as bait.
**[PROPOSED]** keep it that way: it is the best free characterisation in the file.

### 5.3a Layer 1 — ACTUAL

| # | trait | evidence |
|---|---|---|
| **V1** | **Frames force as courtesy, and the courtesy is real.** The writ is in his hand; the sentence is a request; both are true and he is not pretending | `ch1.js:136` |
| **V2** | **Uses a private lever in public, deliberately, at the exact volume required** | "Vane lowers his voice — **not far enough.**" → "…**Ilsabet**." `ch1.js:137-138` |
| **V3** | **Loses gracefully, and the narration refuses to let you enjoy it** | "Vane bows. It is a very good bow. **He has done it to people he later ruined.**" `ch1.js:231` |
| **V4** | **Wins gracefully, and it is worse.** No gloating anywhere, on any branch, including the ending where he gets everything | `ch1.js:241`; `ch7.js:432`; `ch8.js:353` |
| **V5** | **Patient by policy, not temperament** | "He waits." · "*He is very good at waiting.*" · "Then I will ask again later, **when it costs more**." |
| **V6** | **Prices refusal; never punishes it.** He does not retaliate once in the game | `ch1.js:289`; `ch7.js:491` |
| **V7** | **Content to be lied to, and says so** | "**Wise. Or a lie. I can use either.**" `ch1.js:291` |
| **V8** | **Keeps his promises, exactly — and this is the horror of ENDING 4 rather than its mitigation** | "as promised" ×2, `ch8.js:355-356` |
| **V9** | **Argues by pointing at evidence he declines to explain.** He never makes a case; he tells you where to look | `ch1.js:283` |
| **V10** | **He is right** — the antagonist has been telling the truth about the central mystery since his first scene | `ch4.js:557` "**So he had.**" |
| **V11** | **His grievance is twenty-two years old and he discloses it exactly once — to children** | `ch7.js:341` |
| **V12** | **Withdraws rather than be a test of somebody else's courage** | "My offer is withdrawn. **I will not be the thing you have to be brave about.**" `ch7.js:342` |
| **V13** | **Buys individuals privately and audits them publicly** | `companion/ch7.js:182` → `ch7.js:493` |
| **V14** | **The one crack: winning by purchase makes him flinch** | "a man handed something heavier than he asked for" `ch1.js:293` |
| **V15** | **His is the only fast heart in the Hall** — on one phone, in ch1, never referred to again | `companion/ch1.js:116-117` |
| **V16** | **He delegates every act of physical force and performs none.** Vane touches no one and raises nothing | `ch3.js:602`; `ch8.js:353` |
| **V17** | **His thread is gold and it runs to Wren, all night** — Thread-Sight for *an unconcluded purchase* | `companion/ch2.js:169` |

**The defining contradiction.** *He is the only adult in the game who ever told the Convocation the
truth, and the only adult in the game buying its seats — and he cannot see that the second is why they
were right to distrust the first.* He came back with a writ, two bought Masters, a soldier behind a
third, a bought porter, and four private letters to fourteen-year-olds. **He is right about the paint
and wrong about everything he has done since, and the game never lets him notice the connection.**

**The second contradiction, which is his best feature:** he will not lie, and he **legislates for
being lied to**. "Wise. Or a lie. I can use either" is a man who has made honesty structurally
irrelevant and has not noticed that this is the thing he was exiled for objecting to.

**What he would not admit:** that he wanted Marrow to back him twenty-two years ago and she did not
(he calls Thornhallow "**your** Hall" to her) · that "safekeeping" is not a motive and he has not been
given one · that the flinch is shame · **that he has never once addressed the child he is buying** ·
that being right has become his entire personality.

### 5.3b Layers 2–4, compressed

| layer | content |
|---|---|
| **SELF-IMAGE** | "I am a man who keeps his word in a building full of people who keep a translation" (**true in the letter and monstrous in the spirit**; E4 exists to demonstrate it) · "I am the only honest man who has ever stood in that Hall" (**was true once**; not updated in twenty-two years) · "courtesy is the form power takes when it does not need to shout" (**accurate, and the game agrees with him — which is why he is frightening**) · "everyone has a price; refusing is simply a higher one" (**disproved on screen, by him**, at `ch7.js:342`) · "I am not the villain of tonight" (he says it aloud, which is the tell) · "I do not enjoy this" (**[PROPOSED]** true, and the only sympathetic thing he believes that the game corroborates) |
| **BELIEVED REPUTATION** | **Marrow**: "a villain, and right, and she cannot say the second in front of the nine" — **exactly right** · **the Convocation**: "I am still the young man they sent away to learn manners" — **unknowable; not one Master ever mentions his exile. [GAP]** · **the four**: "they take me for the villain; evidence will fix it" — half right and badly out of date by ch7, where his own evidence disarms him · **each player individually**: "they can be bought if the offer is private, named and secret" — **correct often enough to build an ending on** · **his captain**: "he will do it by the rule and will not need me to watch" — **right** · **Wren**: **nothing. [GAP], and it is the character's defining blindness** |
| **FEELING** | **Marrow**: twenty-two years of grievance aimed at an institution and discharged at the one person in it who has to answer him; possibly something older — he is the only person who calls her *Ilsabet*. **He never says he wanted her with him. She never says she was.** · **the four**: the cheapest route to the child, and then the first people in twenty-two years to show him he was right — and when they do, he does the one generous thing in the game and **vanishes from the fiction entirely** · **Wren**: **unwritten.** A gold thread and a gentle proxy hand · **the truth**: the one thing he has ever cared about; he points at it three times in nine chapters and explains it never |

### 5.3c What he wants

**Aloud:** "The Cold open, one way or another, and the child delivered by dawn." **Could not say:**
*"Say, out loud, in that Hall, that I was right."* — twenty-two years of it, disclosed once, to
children who cannot give it to him, and immediately converted into a withdrawal, **because being proved
right by four fourteen-year-olds with a wall is the nearest he is ever going to get, and he knows it.**
**Does not know he has:** not to be the reason a child has to be brave. He discovers it in the act of
saying it, and the game never asks him what he does with it.

### 5.3d His worst moment

> `ch7.js:493-494` — "The fire says one name out loud: {nick}." / **"I keep my promises. Do you keep
> yours?"**

A grown man, in front of everyone, holds a named fourteen-year-old to a promise made privately, under
duress, in writing, with an explicit assurance of secrecy — in the register of a man asking after
somebody's honour. **He does not threaten. He audits.** His code — the thing that makes him likeable —
is revealed as an instrument for extracting compliance from children, and it is worse than anything
his captain does.

**Does the game have it?** *Yes on one path, and none at all on the other.* On `VANE_ALLY` the
bargain question is deleted, the letter is removed from every SPEAK page, one figure leaves the art,
and **he never appears again on any of the five endings.** *The moment Vane becomes likeable, the game
removes him.* The author gets a redemption and never has to price it — his soldiers are still on the
stair, and nothing says what he tells the Crown, or what happens to a man who withdraws a royal writ
on his own authority.

**The bigger hole: he never speaks to Wren.** In nine chapters, five endings and every branch, **Lord
Vane never addresses Wren once.** He speaks *about* Wren fourteen times. Wren speaks about him once,
and it is frightened. On E4 he puts Wren in a cage and is courteous about it *to the four*. **[PROPOSED]**
make it deliberate in one clause of narration: *"He says it to the four of you. He has not addressed
the child once tonight, and will not."*

---

## 5.4 THE FOUR

**The constraint.** The four are played by real people. The shipped game gives them **no name, no
pronoun, no family, no appearance and no history** — only an id, a seat index, a gift, a colour, a
question word and a blurb, and four identical faceless silhouettes in every chapter. **There is
therefore no Layer 1 personality for a seat.** There is a *role*, and the role is exactly four things:
a gift with a named, load-bearing blind spot; a private decision about Wren written in the second
person; a set of performance obligations; and **a grammar** — the shape of the sentence the puzzles
force that player to say out loud, every chapter, for four hours.

### 5.4a The role, four layers, at a glance

| | **Reader** (0, Glyph-Sight, WHAT) | **Listener** (1, Ear-Sight, WHEN) | **Seer** (2, Under-Sight, WHERE) | **Binder** (3, Thread-Sight, WHETHER) |
|---|---|---|---|---|
| **colour** | `#e0b04a` gold | `#4fb3bf` teal — **the Cold's own colour** | `#a482e6` violet | `#d96b4a` red-orange |
| **perceives** | the Founders' Tongue; faded inscriptions clean; the lexicon; from ch4 an older alphabet | intervals, steps, patrol boots by landmark, **every heartbeat in a room — except one** | where an inscription begins and whether it is turned; what paint covers; sockets under rebuilt stone; **which way every shadow falls** | threads — grey grief, gold Crown, red oath — and keeps the Book of Laws |
| **cannot** | read a line without the Seer's start; read the older alphabet before ch4 | hear a word's *name*; **hear Wren** | say what a cut *obliges* | read a shape, hear a note, or see under a floor |
| **ANOMALY** | the name chalked twice, one alphabet nobody teaches, **same hand** | **never once** heard Wren's heart | the shadow falls **toward** every fire | **no thread at all**, and "not unbound" |
| **SELF-IMAGE the phone builds** | *"I do not make mistakes about text."* | *"There is something wrong with my ears, and I have hidden it."* | *"I see things that are not there"* → *"I was right and said nothing"* | *"My gift has a hole in it and I have told nobody."* |
| **where it is unflattering** | it makes a year of not asking into a point of pride | wholly; held privately for years, and false the entire time | the only seat with a real **moral** arc: saw it, hid it, told it | the only seat that **chooses** ignorance ("decided long ago not to look") |
| **how the game kills it** | the primer; the Vigil roll; the socket | "Six chapters, every room, and never once anything to catch" → "**eight hearts**" | "There is **no lamp here**" → "**You have run out of lamps to blame**" | "**Your gift had a blind spot. It does not.**" |
| **the laundry whisper, and its truth** | "…**not the Provost's version**?" → **DONTKNOW** | "Can you hear mine?" → **NO** | "What do you see?" → **TELL** | "Do you think I'm really the one?" → **DONTKNOW** |
| **what walking costs it** | "you will not read tomorrow… **not whatever Wren leaves you**" | "the house goes quiet. **You have never heard a quiet house.**" | "only you will remember that once they did not" | "you will have to **ask people what they feel**" |
| **defining contradiction** | **a completist who has kept exactly one gap, and the gap is a person** | **the seat that hears everything has never asked a question** | **the seat that sees under everything is the one the game teaches to say nothing** — its discipline and its cowardice are the same sentence | **the authority on binding is tied to nobody, and knows it** |
| **would not admit** | that the door was not unreadable, it was **unopened** — a decision re-made every day for a year | that the silence stopped being frightening and became **theirs**: "You have still never said aloud which one is missing" — *that is not shame any more, that is possession* | that the reason for silence is not caution but **taste** — the Seer is afraid of sounding poetic, and Wren confirmed the fear | that not looking at Marrow's thread was not tact but avoidance — **the Binder's kindness is consistently a way of not finishing a thought** |
| **worst moment** | the laundry bluff ("A small brave bird" — "**You made that up. It sounded true, which is not the same thing**") **and** E2's mason ("You did not offer, and you will not") — **the strongest-authored worst moment of any character in the game, and it is a player's** | the laundry LOUD — the kindest available lie, **billed three times**: on the phone, to their face in ch6, and again on the phone. **This is the model** | the laundry NOTHING — the one seat that could settle it, declining, to the face of the person it is about, **and being forgiven in the same beat, which is worse** | the laundry YES — "You said yes because it was kind. **You are not sure it was kind.**" |
| **voice** | short declarative **pairs**; the failure mode is *completeness*, not panic; says both readings when one was asked for | **signed integers and orderings**, four words or fewer; shortens to pure imperative under stress | **prepositions and ordinals**; location first, object second, **meaning never**; panic looks like competence | **rule, citation, consequence**; dates everything; cites harder and earlier under stress |
| **the line that is NOT them** | "You have never misread anything in your life" `companion/ch7.js:241` — the only place a phone flatters its player, unearned, at the beat where the character should be humbled. **[WRONG]** | "Faint. Far off." `ch6.js:657` — **Ear-Sight cannot produce an imprecision.** **[WRONG]** → *"Not in here. Every room is tuned differently."* | "You have no shadow at all." `ch6.js:648` — a factual error the seat is **incapable** of making. **[WRONG]** → *"Toward the lamp. It was always the lamp."* | "When the count runs off the end it comes back to slot 1" `companion/ch3.js:267` — **mechanically false**, and this is the one seat never casually wrong about a rule. **[WRONG]** |

### 5.4b Layer 3 — what each seat thinks the others think of it

**Every cell below is [PROPOSED].** The mechanism is uniform and elegant and it is falsified in the
Prologue's last scene without anybody noticing: **each seat believes the other three regard its gift
as complete, and protects that belief by silence** — then the lamp lights, all four speak in seat
order, and **Wren tells them it never worked.**

| | thinks the **Reader** is | thinks the **Listener** is | thinks the **Seer** is | thinks the **Binder** is |
|---|---|---|---|---|
| **Reader** | — | reliable to the note; the table's clock | literal, useful, slightly strange | the one who is never wrong about a rule |
| **Listener** | the one who does not miss things | — | exact, and silent for a reason | the authority, and the reason we commit |
| **Seer** | the one who can name what I can only locate | the only other seat with a private grief | — | the one who decides what my cuts oblige |
| **Binder** | authoritative, occasionally over-thorough | precise; the seat I never double-check | my witness, and the person I am supposed to have practised with | — |

**[GAP], and it is the largest one in the four's design.** **No seat has a stated opinion of any other
seat anywhere in the game.** The one relationship fact that exists lives on **one** phone (Reader ↔
Listener sworn, red, well knotted; Seer ↔ Binder a broken practice thread), so **three of four players
cannot roleplay their own friendships.** The party's thread arc — sworn/broken → "red, **each to each,
and holding**" → "red, knotted" → E0's "four friends and nothing between them but air… and **it has
never not held**" — is the game's quietest arc **and only the Binder ever sees it.** One Binder SPEAK
line in ch6 ("Say this one out loud: it holds now") converts a private arc into a table moment for
four words.

### 5.4c The real person at the table

| beat | what the human is actually doing | the risk |
|---|---|---|
| **T2** four anomalies aloud, in seat order | performing an intimacy with three friends eleven minutes in, cold, with no established group voice | **if the table laughs here the whole night's register is set wrong**, and there is no line telling the Voice to slow down. **[GAP]** |
| **T3** the vote | the first time a player's silence can cost the party | a quiet player who does not volunteer their number loses Wren the vote and will know it — and the game never says afterwards *which* fact went unsaid. **[GAP]** |
| **T4** catch Wren or catch the case | thirty seconds, no phone, pure table argument | the one choice with no expertise attached — **the best-designed panic in the night** |
| **T5** the laundry | four people lie or tell the truth alone, about a friend, and may never discuss it | **this is where the person stops playing a gift and starts playing a self** |
| **T6** KNOT or EMBER | choosing, in public, whether the party's word can be taken back — while Law 4 says the sworn-to cannot tell | the only player choice whose whole point is that the other character will never know — **and then Marrow knows** (§6/X21) |
| **T7** the hold | a sealed yes/no about volunteering to be hurt, with a first-yes-wins race | a player who says yes and is beaten by seat order gets **no acknowledgement at all**. **[GAP]** |
| **T9** the bargain | the game stops addressing the role and addresses **the human**, by their real first name, in front of their friends, in fifteen seconds | the single strongest design moment for the real player |
| **T9** the walk cost | reading a sentence about their own gift's death, alone, then voting | four different sentences, each written to that seat's self-image — **the best-targeted writing in the game** |
| **T10** the letter | reading a goodbye addressed to them personally while the phone dims under their hands | **the one place the house rule "never show your phone" is lifted** — the design's last and best gesture |

---

## 5.5 THE NINE MASTERS — character as predicate

Six of the nine are **never named to the player**; Sorrel and Oriel only on the win path; a
`VOTE_LOST` table finishes Chapter I knowing no Master's name but Marrow's. What the game gives
instead is a **mechanical** personality: each Master is one clause in `tally()`, and the clause is the
characterisation.

| seat | House | the predicate | **what the predicate means as a person** | words |
|---|---|---|---|---|
| 1 **Sorrel** | Harrowden | askable; carries Quill | will move, for a price, **if addressed personally** | ~60 |
| 2 **Quill** | Ossery | `FOLLOWS.quill='sorrel'` | has given his vote away and can take it back **only if someone asks him directly** | 19 |
| 3 **Brack** | Dunmere | `PLEDGED`, filed "with the Chair" | **already decided, still soliciting** | 26 |
| 4 **Hallan** | Fellwood | `DEAF` + `FOLLOWS.hallan='orrin'` | has removed himself from persuasion **by choice** | 31 |
| 5 **Vey** | Goldmarch | `BOUGHT` (coin under the cushion) | sold, **and hiding it under himself** | 14 |
| 6 **Orrin** | Redmoor | `BLOCKED` (a soldier behind the chair) | **prevented, not bought** | **0** |
| 7 **Oriel** | Sable | askable; undeclared and says so | will decide on evidence, **and wants the evidence brought to her** | ~70 |
| 8 **Tarn** | Wyeburn | `BOUGHT` (coin in the sleeve) | sold, **and not ashamed** | 13 |
| 9 **Marrow** | the Chair | `PLEDGED`, `locked`; "the Chair does not hear cases" | has taken herself out of the argument in order to run it | — |

**The structural fact nobody says out loud, and the most valuable single line available here:** the
Convocation's **default state is SEND**. Absent any intervention, seven seats file nothing, "nothing
filed means SEND", and the child goes to the Crown. Two hundred and twelve years earlier the same body
"would not pay" and sent one Warden down alone. **Chapter I is Year 212 re-run in miniature — same
body, same default, same price structure — and the four buy the child's night with two promises to
two Masters.** If §7/U3 is ruled (the Order *is* the Convocation), one clause in ch6 or ch7 converts
the game's opening puzzle retroactively into its thesis. **[PROPOSED]**

### 5.5a The two who are drawn

**SORREL.** *Actual:* requires to be addressed personally and says so where only one person can hear ·
commands a vote she has not asked for · transactional within seconds · institutionally ambitious, not
personally loyal ("it comes to **the nine of us. Not to her.**") · **predicts Marrow's plan before
Marrow has made it** · collects, with armed men, the same night · and **her writ is the thing that
saves the four at the Tower door**. *Would not admit:* that "ask me to my face" is not pride but
**evidence-gathering** — she is checking whether the Chair's side will spend a courtesy on her, and
has decided in advance what refusal means. *Defining contradiction:* **she demands to be addressed as
a person and treats everybody else as a position** — and the only individual fact about her in the
entire game is that a child once called her a goat *to her face*, which is exactly the thing she says
she requires of the world. **Nobody, including her, ever connects those two facts.** *Worst moment:*
she sends guards to take the Cold Ember from four fourteen-year-olds, one with a broken arm — and it
happens in **one clause of stage direction**, with Sorrel not present and no line. **[GAP]**: a
character you are allowed to hate in ch2 and must thank in ch3 is worth far more than a flag.

**ORIEL.** *Actual:* undeclared and announces it · decides on evidence, in public, without warmth ·
**hedges her own mercy** ("Very well. **Tonight** — keep") · studies the child all evening,
arithmetically · her price is total disclosure including the parts that discomfit · comes to collect
in person, with a lamp she does not need · **scraped the paint herself as a girl and watched them
repaint it inside the week** · a promise to her alone restores Law 0 to the Binder's Book · follows the
four into the bell-chamber and **says nothing, loudly**. *Would not admit:* that she has known since
she was a girl and has done nothing with it for thirty years except accumulate. **Her price is
information because information is what she does *instead* of acting.** *Defining contradiction:*
**the only Master who knows, and the only one who sends somebody else to find out.** *Worst moment:*
`ch7.js:60` — she followed four fourteen-year-olds to the edge of the Cold, watched them decide whether
to die, and did not speak. **The game has the position and not the moment.** One indefensible line —
*"I was fifteen. Nobody came down with me."* — pays off her note, her price and §6/E15 at once.

### 5.5b The seven thin ones, and what each is for

| Master | the one thing worth writing | flag |
|---|---|---|
| **Quill** | **A man whose entire self-account is "I do not matter", delivered in the one sentence of his life that is factually false.** Asking him *does* flip him — `{quill, oriel}` scores four keeps. He is worth a vote; he has told the only people who could have used him that he is not; and he believes it | §6/**X25**, **[WRONG]-by-omission**: nothing marks the line as a boast, a habit, or a man's mistaken humility |
| **Brack** | **He has already given his vote away and still wants the courtship.** He filed early — the act of a man who wanted the Chair to know he was sound — then spent the hour before the bell trying to be asked for the thing he had already surrendered. **The only Master whose need is entirely social and entirely public** | **[GAP]**: he will let four children spend their one irreplaceable resource on him for the pleasure of being addressed, **and he knows it is already spent**, and no line ever bills him |
| **Hallan** | **A man announces, out loud, to a room, that he is not listening to it.** Deafness performed is address. And Orrin is not voting at all — a soldier stands behind that chair — so **Hallan has shut his ears in order to follow a man the Crown has already silenced. His loyalty is delivering the Crown's result for free** | **[GAP]**: the result of his integrity is identical to the result of Vey's corruption, and the game never stages the comparison |
| **Vey** | **He hid the coin under himself and then wore some of it** — "something at Seat 5's cuff catches the light". The concealment is sincere and the cuff is the truth. **The only bought Master the reader could pity, and the game does not let them** | **[THIN]**, 14 words. One clause: *"Seat 5 shifts, the way a man shifts who has put something under him."* |
| **Orrin** | **The Crown spends coin where coin works and a body where it does not. That is a statement about Orrin's character, made entirely by the enemy's tactics, and nobody in the game says it.** He is the only member of the Convocation who is **not responsible for the Convocation's result**, and it should stay that way | **[THIN]**, 0 words — and **his voice should stay none**: an unpurchasable Master who is never allowed to speak is the Crown's method rendered as stagecraft. Compounded by §7/U10 (Vane's seal is Redmoor red) |
| **Tarn** | **The only person in the Hall who is enjoying himself.** Corruption that is cheerful, visible and socially frictionless — he keeps the coin where a hand goes when a hand is shaken. In a chapter where everyone else performs gravity, **the man selling a child is the warm one in the room** | **[THIN]**, 13 words, and the game never uses him again |
| **the body** | **It legislated against being overruled and then overruled the Founders.** A body that cannot be amended and will not pay is a body that **deletes**. *Worst moment:* **Year 212, entire — and it is the best worst moment in the game and it happens off-screen, in the past, on one phone, in a `reveal` block the Binder must opt into. Nobody is named. Nobody speaks. There is no scene in which a person refuses to pay.** | **[PROPOSED]**, and the highest-value addition available to this cast: **one remembered voice from 212** — twelve words in a human mouth ("Four Masters. I could not. I wrote the other thing instead.") gives the game's antagonist a face for the first time, and it costs one string |

---

## 5.6 THE FOUR FOUNDERS

| Founder | shipped presence |
|---|---|
| **Mere** | named **once**, on an optional path, on the back of plinth 1 — plus her sheet (the only Founder-voice document in the game), her strip, two gates, a counting ward, a hidden door, and four of Marrow's lines |
| **Idony** | named **once, in a world table**, as the author of Law 7 — the only Law named for a person. **Her name appears in no chapter, including the chapter that teaches her Law** |
| **Halvard** | **does not exist in the shipped game** |
| **Rook** | **does not exist in the shipped game** |

### 5.6a MERE

*Actual:* one of the four who wrote COLD with four hands · **offered to go alone and was refused** ·
records that **one was never asked**, and records it *before* the act itself · **survived, and kept the
fire afterwards** · built the school's whole defensive grammar below ground · **her gates are designed
to defeat the reader's habits, not their ignorance** ("Her gates do not lie. **They do not play
fair.**") · **every one of her wards requires four people** · her wards answer wrongness **without
locating it** ("three seats true, and does not say which") · she left a rebuttal of the school's
reading in her own niche, readable two ways · her sheet is signed **ᛗᛖᚱᛖ** and nothing in the game
points it out.

**The observation the game has built and never states.** *Mere's stair cannot be passed by one
person.* Every ward on it requires a quorum of four. In Year 212 the Convocation "sent one Warden down
instead" — down **this stair**, through **these gates**. So either the Order's lone Warden forced
Mere's wards the way Marrow forces them, **or they came down Mere's door, the one left for people who
were not asked.** Either answer is devastating and free, and **the game asks neither.** §7/U19.

*Would not admit:* **that the door for the unasked is an apology.** She names the exclusion in the
second sentence of the only text she left, four hundred years before anyone could read it, and then
builds a way in for the person it happened to. That is not a security feature; **it is a woman still
arguing a case she lost.**

*Defining contradiction:* **she built a stair that demands four people, for a school she did not trust
to send four.** Her wards are a prophecy and an insult — they assume the institution will degrade, cut
corners, read the easy way round, and try to come down alone — **and every one of those assumptions is
correct by Year 212.**

*Self-image:* read her signature. "**Mere, who kept the fire, after.**" Not *who closed the wound*.
Not *one of the four*. She defines herself by the part that came afterwards, and she puts the refusal
before the achievement in her own four-sentence account.

*Worst moment:* **her security architecture nearly kills the person it was built for** — and it
belongs, in the shipped game, to Marrow's mouth. Mere is never present to be disliked. **[GAP]**: one
clause on the Binder's or Reader's page at the broken gate — *"She did not build these for a child in
a hurry. She built them for an institution in a hurry, and she could not tell the difference from
here."*

### 5.6b IDONY — derived entirely from one row of a table

**Law 7 · Founders' · Year 0 — "Idony's Law: a sigil sworn under KNOT begins at the sworn-to."**

She is the Founder who thought about **people** rather than objects — every other Founders' Law
governs stone, orientation or procedure; hers governs *whom you swore to*. She made a relationship
**physically load-bearing**: the ring literally turns to face the person. She is **the Binder's
ancestor**. And she legislated for a case the Founders did not need — swearing under KNOT to a person,
in a world where the four had sworn nothing to anyone. **Her Law is written for successors.**
**[PROPOSED]** the notch at socket 1 of the Finale ring is her signature.

**Defining contradiction [PROPOSED].** *The Founder who wrote relationship into the geometry is the
reason the four, having sworn to an office, must dismantle and re-turn their whole ring at the
climax.* Idony's Law punishes swearing to a **Chair** instead of to a **person** — and Marrow's last
advice, on E3, is "The oath you swore tonight was to a Chair. **Swear the next one to a person.**"
**The game already contains Idony's moral, in Marrow's mouth, four hundred years later, and has never
spoken her name aloud. That is the cheapest unclaimed resonance in the whole script.**

**[PROPOSED], and the single most economical assignment available: Idony is the one who refused
Mere.** A Founder who believes obligations run *to people* would refuse, on principle, to let a person
discharge a four-person debt alone. It gives the refusal a reason, gives Idony a relationship, and
makes Law 7 a memorial.

*Worst moment:* her Law is used, in the Finale, by an adult, **to bar four children from saving a
child**. **The game stages this and does not know whose it is.**

### 5.6c Halvard and Rook — and the cheapest route to naming them

The Binder's ch5 page carries **five oaths carved on Mere's newel**, with locks and dates:

| oath | line | lock | sworn | binds? |
|---|---|---|---|---|
| **the Gate** | THORN ASH | **KNOT** | Year 0 | yes — **cannot be unbound** |
| **the Veil** | ASH THORN | **VEIL** | Year 0 | **no** — Law 12: an oath binds only if its lock is KNOT or EMBER |
| **the Well** | WELL ASH | **KNOT** | Year 0 | yes |
| **the Keeper** | WELL EMBER | **EMBER** | **212** | yes — **reconsiderable** |
| **the Chair** | CROWN THORN | **EMBER** | **212** | yes — **reconsiderable** |

Three of these are Year-0 oaths bearing **office-names**, and `DESIGN.md` names the Founders *Halvard
the Gate, Idony the Binder, Rook the Veil, Mere the Keeper*. **Two of the three Year-0 newel oaths are,
by epithet, already Halvard's and Rook's — and they are printed on a player's phone in the shipped
game.** Two missing Founders can be named for the cost of one clause, without inventing anything. And
the table pays three further dividends, all free and all dark:

1. **The Veil's oath does not bind.** A Founder swore, in Year 0, under a lock their own Law 12 says
   has no force. **A Founder who made an unbinding promise is a candidate for the one who refused Mere
   — or the one who was never asked.** **[PROPOSED]**
2. **"The Keeper" is re-sworn in Year 212**, under EMBER, the reconsiderable lock. That is the oath of
   the lone Warden the Convocation sent down. **The Order sent one person into the Cold under an oath
   they were permitted to take back.** **[PROPOSED]**
3. **"The Chair" is also sworn in 212, also under EMBER.** The office Marrow holds was constituted in
   the cover-up year under a revocable lock — **and in ch4 four children swear to that Chair.** Her E3
   advice becomes a confession about her own office.

### 5.6d The Founders as a body

| layer | |
|---|---|
| **Actual** | Four people who wrote COLD with four hands, went down together, closed the wound, **came up grey**, and left themselves burning on top of it. They **legislated against being overruled before anyone tried** (Law 3). They legislated **plurality into the physics**: COLD takes four hands; KNOT glosses "four-as-one"; a Great Sigil names every glyph once, so no one hand can finish one. They cut the prophecy as a **ring**, so it has no first cut and no owner |
| **Self-image** (from the tapestry, the only self-portrait) | **four ordinary people, not hooded, not robed, walking in together, all four casting shadows, and no child anywhere in the picture.** That is how they chose to be remembered. The school hoods them in stone; the Order paints them down to one |
| **Believed reputation** | **they expected to be misread and built against it** — and were right by Year 212 |
| **Feeling, toward each other** | four abreast, evenly spaced, walking the same way — **except the second, whose head and arm go back for something that is not there** |
| **Defining contradiction** | **They made consent a law of physics and completed the work by excluding somebody.** "COLD is written by four hands" is a rule about plurality; "one was never asked" is what plurality cost. **The most beautiful object in the world of this game stands on a consent failure**, and Mere's hidden door is the apology, built by one of the four, into the stair |
| **The second contradiction, and it is worse** | **They left a socket with a name in it.** Either they knew a hollow would come, named it, and built the ring around the place it would stand — in which case they planned for Wren four hundred years before Wren — or somebody cut that name later in an alphabet nobody has spoken for four hundred years. **The first reading makes them far more loving *and* far more culpable at once, and nobody in the game asks.** §7/U15 |
| **Worst moment** | **"One was never asked" — eighteen words, on one phone, on an optional path, gated behind ch5, reachable only if a Reader took a rubbing in ch2.** The Founders' single act of wrongdoing is the least reachable text in the game. **[GAP]**: one clause at the four thrones — *"Four thrones. There is a fifth shelf, cut and never finished."* The art already has five arches below |

---

## 5.7 THE CROSS-MATRICES

### 5.7a Believed reputation, as a grid

**Read:** *row* believes *column* thinks this of *row*.

| ↓ believes ↑ thinks of them | **Wren** | **Marrow** | **Vane** | **the four** |
|---|---|---|---|---|
| **Wren** | — | "she loves me and cannot say it plain; she will forgive herself last" | "an asset, not a person; his word will hold because his regard is contractual" | "they notice everything and are being polite about it; they think I am brave" |
| **Marrow** | "he knows exactly what I am and forgives me, which is worse" | — | "a hypocrite who teaches the translation she knows is false" | "cold, and they are right; they should be arguing with me more" |
| **Vane** | **[GAP]** — he has never registered that Wren has a view | "a villain, and right, and she cannot say the second aloud" | — | "they take me for the villain; evidence will fix it" |
| **the four** | "the thing we must not mention" → after T2, "the person we have each been quietly wrong about" | **[PROPOSED]** "we are errand-runners she does not quite see" — the phones never say what the four think Marrow thinks of them | "a mark he has priced by name" | **[GAP]** — three of four seats are told **nothing** |

**The three most productive cells to fill:** Vane → Wren (one clause) · the four → each other (one
line per phone per chapter) · **the four → Marrow** — currently the players have no model of her
opinion of them at all, which is why "After tonight I will decide what you are" lands and evaporates.

### 5.7b Feeling, as a grid (**F** = felt, **S** = shown)

| | **Wren** | **Marrow** | **Vane** | **the four** |
|---|---|---|---|---|
| **Wren** | F: nothing sayable · S: jokes about being a hollow | F: love + an unbilled grievance · S: mockery, "Mum", absolution | F: fear + technical respect · S: brittle courtesy | F: his only belonging · S: orders, diagnoses, letters |
| **Marrow** | F: love and pre-paid grief · S: "it", one endearment, one unfinished sentence | — | F: an unadmitted debt · S: formal thanks and refusal | F: use → apology · S: errands, one touch, four letters she does not wait to see read |
| **Vane** | F: **unwritten** · S: a gold thread and a gentle proxy hand | F: 22 years of grievance discharged at the wrong person · S: courtesy, a private lever at public volume | — | F: the cheapest route, then the first witnesses in 22 years · S: private letters, a public audit, "Thank you." |
| **the four** | F: years of private self-blame → recognition · S: three sealed channels and four answers in ch6 | F: obedience, then argument · S: an oath, or a refusal | F: temptation, priced by name · S: a fifteen-second silence, or a click | F: red, knotted, holding · S: **only the Binder can see it** |

### 5.7c The register ladder — how each one breaks

**The single most useful table here for a writer adding lines.**

| pressure | **Wren** | **Marrow** | **Vane** | **the four** |
|---|---|---|---|---|
| **ambient** | diagnosis as endearment; punchline last | imperative, 4–12 words, no preamble | an offer, then its terms | speaking their own gift aloud |
| **loaded** | the joke contains an instruction not to feel | shorter; the cost is stated exactly | **he waits** | they ask each other for the missing quarter |
| **overloaded** | **stacking** — "Also… Also… Also —", sentence abandoned | she stops speaking and **kneels** | he raises the **price**, never the volume | a sealed word typed alone |
| **broken** | **silence**, and the narration names it; or `WREN_SCARED` | one endearment attached to an order; or a written self-indictment after leaving | **he withdraws** — the only time he says a sentence about himself | "Nobody stays. Not cowardice — **four people who each thought somebody else would.**" |

### 5.7d The one thing each will not say

| | the untouchable subject | the one place it leaks | how big the leak is |
|---|---|---|---|
| **Wren** | **wanting to be kept** | `ch7.js:768`, `:759` | two lines, both after the decision is sealed, both on one ending each |
| **Marrow** | **the fourteen years** — she names the number six times and never what was in it | `ch4.js:211` — a two-line journal in a dead alphabet, left on a desk under the primer that decodes it | two sentences, optional, and the player has to transcribe them letter by letter |
| **Vane** | **the twenty-two years** | `ch7.js:341`, once, to children, immediately followed by his surrender | one line, branch-gated |
| **the Reader** | that a year of not asking was cowardice, not certainty | `companion/ch7.js:241` | one clause, on a phone |
| **the Listener** | that she has believed herself defective since she was seven | `companion/ch0.js:112` → `companion/ch8.js:94` | **stated to nobody, ever, out loud, on any branch** |
| **the Seer** | **why she hid it** | never | **[GAP]** |
| **the Binder** | that she chose not to look at the Provost's grief | `companion/ch3.js:276` | one line, never revisited |

**The pattern, and it is the game's actual thesis.** Every principal and every seat is carrying one
sentence they will not say, and in every case the sentence is about **wanting**, or having wanted,
something from another person. The Hearth reveal — that a fire is four people who went down together —
is the same statement at the scale of the world. **The game is about the cost of not asking, and its
last three lines of dialogue are Marrow's:** *ask*, *listen*, *swear the next one to a person*.

---

## 5.8 The persona asks — what §5 wants the author to rule

Ordered by value per word. Every item is one clause to one line unless marked otherwise.

### Tier 1 — the fixes that change how the reader feels

| # | ask | where | cost |
|---|---|---|---|
| **P1** | **The crack set.** Adopt or reject §5.1h **as a set** — the ch7 crack ("Say something, one of you") only pays because ch0's and ch1's have taught the reader to hear them | nine sites | **34 words total** |
| **P2** | **Mark Wren's worst moment.** One narration line after `ch0.js:227`, in the voice the game already uses for Wren: *"Four people have each been quietly wrong about themselves for years, and Wren has known, and has let them. Nobody says so. Nobody will."* | `ch0.js:227` | one line; converts §6/**E2** into the game's first plant |
| **P3** | **Rewrite `ch7.js:764`** — "Half a walk. Story of my life." is a stock idiom, self-pitying, and placed on the beat where two friends have just gone grey for him. **[WRONG]** | `ch7.js:764` | one line |
| **P4** | **Rewrite `ch6.js:823`** — Marrow does not boast, and this is her only boast. Replace it with the in-fiction reason that would work: *a reading she hands them is a reading she has authored — which is exactly what the Order did* | `ch6.js:823` | one line, probably a deletion |
| **P5** | **Rewrite the first sentence of `ch1.js:283`** — Vane does not say "villain"; naming his own standing resolves an ambiguity the scene needs to keep | `ch1.js:283` | half a line |
| **P6** | **Move or re-attribute "Nobody did anything wrong."** It absolves Marrow 158 lines after the game indicts her, in her own mouth. Give it to the narration (which already speaks at `ch6.js:839`) and leave her the clause the chapter earned: *"It was only ever four people."* | `ch6.js:850` | reassign one sentence |
| **P7** | **Give Wren one reproach to Marrow.** Currently **zero on all five endings**. One clause, immediately withdrawn: *"Loved enough. Right. — No, say the rest of it."* | after `ch6.js:692` | one clause |
| **P8** | **Make Vane's silence toward Wren deliberate** | `ch7.js:432` | one clause |

### Tier 2 — the relationship holes

| # | ask | note |
|---|---|---|
| **P9** | **Marrow and Vane acknowledge each other's scraping, once.** Both scenes can occur in one playthrough and neither reacts. **The cheapest high-value line in the game** | §6/**E22** |
| **P10** | **Price `VANE_ALLY`.** He tears up a royal writ in front of his own captain and it costs him nothing; he then leaves the fiction while his soldiers are still on the stair | six words, or one Epilogue line |
| **P11** | **Tell the Reader, Listener and Seer what the others think of them.** Only the Binder is ever told, and only in colours | one line per phone per chapter |
| **P12** | **Give the Listener one spoken line about the silence.** Her whole interior is on a phone; the ch6 answer is a click | one Hearth line |
| **P13** | **Ask the Binder about the Provost's thread.** "You decided long ago not to look" is stated once and never returns — **the best unwritten scene in the game** | one scene, or one ch6 line |
| **P14** | **Give the Seer a reason for hiding it.** The only seat with a moral arc has no motive on the record | one clause |
| **P15** | **Make the Reader's withholding on E2 a choice, not narration.** "the Reader does not offer" is the best silent act in the game and the player never gets to make it | one binary choice |
| **P16** | **Let one of the four criticise Marrow to her face, once.** A fifth `ch7_argue1` option that routes identically: *"You have had fourteen years to tell him what the stone says."* **There is currently no line anywhere in the game in which any character criticises Marrow to her face** | one option |
| **P17** | **Pay or cut "After tonight I will decide what you are."** She never decides; nothing refers to it again | one clause in ch8 |
| **P18** | **The Convocation's remembered voice from 212** — twelve words in a human mouth, in the Binder's ch6 reveal | one string |
| **P19** | **Oriel's one line in ch7**, and make it indefensible | one line |
| **P20** | **Bill the ch5 hold's collective failure.** The game bills the kind lie four times and the collective failure of nerve zero times; the three who refused get nothing, on any ending | one `fine` line ×3 |
| **P21** | **Frame Quill's line** — "He is wrong about that, and has been for years." | one clause |
| **P22** | **Name Idony once**, at `ch7.js:387` or on the Binder's ch7 page | one clause; closes §7/U11 |

---

# 6 · [INCONSISTENCY] REGISTER

**What this is.** Every case found, across all nine mysteries, where **a character behaves in a way
their knowledge state does not support** — consolidated, deduplicated, sorted by severity, with
citations. This is a defect list to work through.

**Severity.**

| | meaning |
|---|---|
| **CRITICAL** | the story does not do what it is trying to do until this is ruled or fixed. Usually one line |
| **HIGH** | a scene is materially weaker, or a character looks less intelligent than the player |
| **MEDIUM** | a missed beat, a free payoff, or an unbilled choice |
| **LOW** | tidy-up; listed so nothing is lost |

**§6.1** is behaviour-vs-knowledge (**E**). **§6.2** is knowledge-order contradiction — the game
disagreeing with itself about who knew what, when (**X**), marked **NEW** where the mystery files
found it and `CANON.md` §13 does not already carry it. **§6.3** is the cross-document conflict list.

## 6.1 Behaviour that the knowledge state does not support

### CRITICAL

| # | who / where | the defect | cite | fix |
|---|---|---|---|---|
| **E1** | **Marrow, T3** | **She asserts the Order's reading from the Chair, to the body that manufactured it, holding three independent refutations** — she scraped the paint as a girl, she knows 212 was a cost dodge, and she can read the stone from its foot. Three readings are available (she is lying to win a custody vote; she is quoting rather than endorsing; she does not yet hold the refutations) and **the game supports none of them explicitly.** Compounded: she says "**Tonight I stop arguing and show you**" and **nothing is ever shown** | `ch1.js:124` vs `ch6.js:824`, `ch7.js:394`, `:396`; §7/U23 | one narration clause — *"She says it the way the school says it, which is not the way she reads it"* — converts the game's largest unacknowledged lie into the mystery's first plant. Or pay the promise: *"— and the stone is wrong. I will show you why, when the vote is done."* |
| **E2** | **Wren, T2** | **Wren names three seat-private facts before any of the four has spoken** — the lamp's hum ("nobody else in this room has ever heard" it), the cuts under the brass "nobody has ever seen", the ring rule "nobody else was taught" — then says "I've known for years." **The narration never marks it and nobody in the fiction asks how.** The strongest available evidence that Wren is not bounded like a person, spent as small talk | `ch0.js:172-174`, `:226`; `companion/ch0.js:104` | **[UNEARNED].** One clause of narration after `:226` noting that nobody asked, and nobody will. §5/**P2**; §7/U5 |
| **E3** | **everybody, T8–T9** | **The Fourfold Walk opens unpriced.** "THE FOURFOLD WALK IS OPEN" is followed by nothing, anywhere on the shared screen, about what that road takes. The first statement of the price reaches each player **alone**, on SPEAK, **after** the group Decision, under a two-minute clock. On the commonest configuration **nobody in the room — player or character — knows what it costs at the moment they choose it** | `ch6.js:855-856`; `companion/ch7.js:185-188`; `ch7.js:364`, `:452`, `:713` | **Author decision** (§7/U20), then M9.4 U1–U3. Marrow has the sentence and never finishes it: "They could not afford **four Masters**" |
| **E4** | **the Binder, T2 → T7** | **Holds struck Law 0 — text, date and actor — from the Prologue, and is given no scene in ch0–ch4 in which to say it.** The seat that can answer the game's central question at T2 first gets to use it at T7. Compounded twice: the Binder learns "212" as a rebuild date at T4 and reads "212" cut beside a bricked arch in the same chapter, and **still does not join them. Three coincidences of the same year, held by one person, unjoined for four chapters** | `lore.js:57` (`learned:'ch0'`); `companion/book.js:123-127`; `companion/ch2.js:156-157`; `ch2.js:346` | one fine line on the Binder's ch2 page — *"That year is in your Book too, and you have never wondered why."* A design consequence, not a writing slip — **and the biggest unspent asset in the epistemic economy** |
| **E5** | **Wren, T5→T8** | **"I have known since the laundry" refers to a scene the game does not contain.** The laundry is four whispered questions and four answers; **nothing in it conveys to Wren what Marrow is or where Wren came from.** The largest thing Wren learns all night happens off-screen and is reported three chapters later | `ch6.js:689` vs `ch3.js:493-530` | **[UNEARNED].** Put it in the laundry: **Bess** is sworn to Marrow for thirty years and is the one person in the school who was there fourteen years ago. **One line from the woman at the copper costs four words and pays for everything** |
| **E6** | **the whole room, T8 → T9** | **Nobody states the conclusion.** All four anomalies are confirmed aloud, in one room, in five minutes; the word *hollow* is spoken twice in the same chapter — as the meaning of Wren's name, and as what the fire is — **and nobody joins them.** The identification waits for `ch7.js:697`, reachable on **one ending**, where Wren says it and "**Nothing here looks surprised**" | `ch6.js:667`, `:678`, `:828`; `ch7.js:697-698` | **[WITHHOLDING].** If deliberate — and it reads deliberate — one line saying so. If not, one line at `ch6_open` lets the table **arrive** at the answer instead of being handed it in the last ten minutes |
| **E7** | **Marrow, the whole game** | **She never once responds to, or asks about, the four anomalies.** She named the child *the hollow of a bell*; she has raised it fourteen years; it has no heartbeat, no thread and a shadow that leans into every fire. **She refers to none of it, to anyone, on any branch — including in the confession**, where she says only "It came out of the fire." The four say all four aloud in her hearing at T8 and she does not react to one. She also **assigns work by gift on sight** all night and **never asks any of them a question about Wren** | `ch6.js:642-678` → `:691`; `ch2.js:189`; `ch4.js:686`; `ch6.js:595`; `ch7.js:392` | **[WITHHOLDING]** or a hole, and the game does not distinguish. One line at `ch6.js:692`: *"I know what it has instead of a heartbeat. I named it for it."* — **that single sentence closes this, §7/U26 and E6 together** |
| **E8** | **Marrow, T8** | **She stands at the foot of a stone she can read in thirty seconds and lets four children spend four readings and up to four cracked bells** — the bells being, by her own statement forty lines earlier, the only thing holding the Cold off the lid while she works. **She charges the seal for a teaching exercise, and her only comment is a boast.** Mechanically her withholding purchases nothing: `WALK_UNLOCKED` and `LAW0` are set either way | `ch6.js:487`, `:774`, `:823-824` | one exchange — any seat asking why, and one answer ("Because the Walk does not open for a stone I read to you") — **retroactively justifies the budget and converts the chapter's harshest mechanic into its best character beat.** §5/**P4** |
| **E9** | **Vane, T3 → T5** | **He bows to the vote and breaks it within the hour**, and the game's whole construction of him — and the moral force of E4 — depends on his being a man who delivers exactly what he says. The four spend all of Chapter III running from the violation and **no character ever mentions it to him**, including at T9 when he says "**I keep my promises**" to their faces | `ch1.js:231`, `:241` vs `ch3.js:439` vs `ch7.js:494`; `ch8.js:355-356` | **NEW.** One line at `ch3.js:439`: *"He bowed to the vote. He did not promise not to look."* Or give one of the four the line at T9: *"You bowed to that vote."* / *"I did. I never said I accepted it."* |
| **E10** | **Vane, T3 → T9** | **His demand is incoherent with his own twenty-two-year belief.** He has known since ≈Year 378 that the picture is four and no child, and that the school's reading is a forgery — and he then spends the night trying to buy **the one child the disproved reading singles out**, framed as "safekeeping". He never once says what he thinks Wren *is* or what the Crown wants Wren *for*. On E4 the Crown harnesses the Cold and keeps Wren in a cage — consistent with Wren-as-key, and **nobody, including Vane, ever says so** | `ch7.js:341` vs `ch1.js:136`; `companion/ch4.js:213`; `ch8.js:354-356` | **The character with the longest-held correct belief in the game never applies it to the child.** One line: *"I do not want your prophecy. I want the thing it is standing in front of."* §7/U12 |
| **E11** | **Wren, T9** | **Wren says "That is what the stone says" of a stone read the opposite way one chapter earlier, in Wren's hearing** — after which Wren said "Then ask me a third time. **In there.**" `ch7_dec_walk` carries no `if` and is reachable on every branch, including `WALK_UNLOCKED` | `ch7.js:404` vs `ch6.js:827-828`, `:693` | **NEW.** Gate on `!WALK_UNLOCKED`, or rewrite so Wren is quoting the *school's* stone deliberately — "That is what **your** stone says" — which is better, in voice, and **decides §7/U9** |
| **E12** | **Marrow, T7 → T9** | **She performs surprise at a Law whose history she recites two chapters later.** Knowing the Convocation refused to pay four Masters and converted the procedure into a rule about writing **is knowing the Law existed**. Her line is written as astonishment and Wren's reply plays it as news | `ch5.js:399` vs `ch7.js:396`; `ch5.js:400` | **NEW.** One word: "That **was** not in the Book I was given" — past tense turns surprise into an accusation against whoever gave it to her, **which is the truth** |

### HIGH

| # | who / where | the defect | cite | fix |
|---|---|---|---|---|
| **E13** | **the Listener and the Binder, T4** | **Both are handed the Cold Ember's signature and Wren's signature on one page, adjacent — and one page explicitly forbids the inference**: "The Ember is a stone in a box and **you did not expect a heart**"; "You have never asked yourself **why the two nothings feel different — or whether they are.**" **And the chapter has no SPEAK channel.** The withholding is architectural | `companion/ch2.js:134-135`, `:165-166`, `:169`, `:104` | **the cheapest fix in this document**: one optional `speak` block in `companion/ch2.js` — *"if anything on your Wren tab has a twin on somebody else's, say it now"* — lets the table solve the identification at T4, four chapters before the game does it for them |
| **E14** | **everybody, T7** | **COLD is written with one hand, successfully, two chapters before the climax that exists to restore the four-hands rule — and Wren points at it and the game moves on.** "One hand, because there is no time for four." / `fourHands: false` / "**You wrote the cold one. With one hand.**" | `ch5.js:524-530`, `:543` vs `lore.js:57`, `ch7.js:726` | **NEW.** Best fix, free: make the crack a **consequence** of an unlawful COLD — the game already half-does it (`PRECRACKED`, a bell answers "one note, and a wrong one") and never connects it. Or Wren's line becomes the answer rather than the observation |
| **E15** | **the Binder, T6** | **Law 0 is restored to the Book by a Chapter I promise.** `ORIEL` is the ch1 *promise*, not `ORIEL_NOTE` — so a table that promised a Master something before the Vault has the struck Founders' Law back **without reading Mere's sheet, scraping the tapestry, or finding the note. The knowledge state is reached by promising** | `ch4.js:85` (mirrored `ch5.js:8`); the file flags itself at `:82-84` | the in-fiction repair is nearly free — Oriel *knows*, she scraped the paint as a girl, so a promise plausibly earns a note back — **but nothing says so.** Gate on `ORIEL_NOTE` and let the note carry the Law. Also `CANON.md` §13.17 |
| **E16** | **everybody, T3 → T10** | **Nobody in the building ever mentions the Cold Ember again.** Established as the remedy twice; carried or lost at T4; then: she says the fire is going out — no mention; **the fire goes out** — no mention; it comes back from a spark — no mention. On `EMBER_LOST` they have lost the school's only insurance against the exact event, and the loss is narrated as a lighting change | `ch1.js:309`; `ch2.js:188`; `ch5.js:250`; `ch7.js:681`; `ch8.js:311`; `ch2.js:370` | **Every character in those scenes holds the fact and behaves as though they do not.** Cheapest: one Marrow non-answer at T7. Best: make the Ember line **doctrine she repeats, not physics she believes**, in one clause |
| **E17** | **the four, T9** | **The `wall` option has no knowledge prerequisite.** A table that never scraped the tapestry, never read Mere's sheet, never found Oriel's note, and whose Seer's only statement about paint all game is "you can see *that* there is a shape under it. **Not what**" can still click "Show him what is under the paint", whereupon the Seer instantly takes four hundred years of soot off a wall. **The single most consequential choice in the Vane mystery is ungated** — in a chapter that gates `ch7_argue1`'s options carefully | `ch7.js:321`, `:339` vs `:391-397` | gate on `TAPESTRY \|\| ORIEL_NOTE \|\| LETTER_READ \|\| STONE_TOLD`, and give the ungated table a third option — *"Ask him what he saw"* — that yields V2 without yielding `VANE_ALLY` |
| **E18** | **Vane, T9** | **His twenty-two years are unforeshadowed and land after the point of no return.** `ch7.js:341` is the **only** utterance of it anywhere in the shipped game: no phone, no document, no Master, no portrait, no line of narration plants it. The player is asked to accept the antagonist's total collapse on one paragraph of unverified autobiography | `ch7.js:341` | **[UNEARNED].** Four proposed plants, cheapest first: make the Listener's fast heart **specific** ("His heart went fast on one word. The word was *paint*"); add nine words to Oriel's note ("I was not the first. A young man did it before me, and they sent him away"); one scraped-and-repainted portrait face in the Gallery; a second, old, red thread on him at T4 |
| **E19** | **Vane, T9** | **He promises secrecy in writing and then audits publicly.** "The others need never know who opened the door" → "The fire says one name out loud" → "**I keep my promises. Do you keep yours?**" — asked in front of everyone, of a named child, **with the receipt open on their phones.** Neither he, nor the narration, nor any of the four, nor Wren, nor Marrow remarks on it | `companion/ch7.js:182` vs `ch7.js:493-496` | **NEW.** Either the best line in his part, needing one clause to mark it deliberate, or an accident, in which case the letter's last sentence should go. Wren, who absolves everybody, is the right mouth: *"You said nobody would know."* |
| **E20** | **everybody, T5 → T9** | **The rope is never raised again by anybody.** The captain, on Vane's authority, states that "The Envoy has her in the Great Hall **with a rope over the beam**"; on **every** branch "the rope came off the beam an hour ago". The four then, on `wall`, hand that man the vindication of his life. **Not the four, not Marrow (allegedly the one under it), not Wren ever mentions it.** A character does not forget being threatened with hanging four hours earlier | `ch3.js:543`; `:635`, `:644-645`; `ch7.js:332` | it is also **the only piece of evidence in the game that the Envoy's word is worthless, and the game neither confirms nor retracts it.** §7/U16 |
| **E21** | **Marrow, T7 → T9** | **She learns the Binder's Book outranks hers and does not ask one question.** She is four hundred feet above a ring she has kept ready for fourteen years, beside a fourteen-year-old who has just produced a Law that licenses writing COLD — and **she does not ask what it says. She never asks again.** Two chapters later she bars the Walk on legal grounds **while the legal ground that defeats her is in the pocket of the child she is arguing with** | `ch5.js:399`; `ch7.js:387` | **the central behavioural finding of the Marrow file.** Not fixable by a flag; it needs a line. She asks, the Binder tells her, and she says something that is not an answer — *"Then it is a Law nobody has kept."* That preserves the plot, converts the gap from oversight into **refusal**, and makes T9's yielding a completion rather than a reversal |
| **E22** | **Marrow and Vane, T9** | **Both scraped the same paint, decades apart, in the same building — and both say so in the same room, twenty lines apart, and neither acknowledges the other.** `ch7_wall` → `ch7_attune` → `ch7_decision` → `ch7_argue1` can all fire in one playthrough | `ch7.js:341` vs `:394` | **the cheapest high-value line in the game.** One clause from him — *"So did I. Nobody repainted it for you, though."* — or from her — *"I scraped it myself, as a girl. I did not tell them."* The epistemic reading is sharper than the geographic one: she hears a man say *they sent me away for showing them* and does not say *they kept me, and I stopped showing them* — **which is the whole difference between the two characters and the reason she is the Chair and he is an envoy** |
| **E23** | **Marrow, T6** | **The most procedural person in the game leaves four investigators alone in her private study for ten minutes** — a room containing, one per seat, her own primer left open on the desk above a journal in the alphabet that primer teaches, a memory-bell that replays her private conversation with the Crown's Envoy, the Order's overpaint, and her own chair with her grief in it. She returns "**early, and does not say why**", sees the scraped wall, and says four words: "So. The Seer." — **recognition, not anger** | `ch4.js:327`, `:355`, `:607`, `:609` | **Either the most elegant indirection in the game or an oversight, and nothing distinguishes the two.** **[PROPOSED]** the study is an examination she set — she cannot say *four* (her oath is written for one, her Chair forbids it, and saying it makes her responsible for the four children who would pay), so she leaves the evidence out and goes away for ten minutes. If accepted, **every withholding in this document becomes a single consistent policy** |
| **E24** | **the nine Masters, T3** | **Nine perceivers sit through a vote in which two of their own seats are visibly bought — a coin under a cushion, a coin in a sleeve — an Envoy's soldier stands behind a third, and not one of the nine remarks on any of it.** Either the nine see it and say nothing (a scandal the game never names) or `ch0.js:242` is false. **The largest behaviour/knowledge mismatch by headcount in the game, caused by one sentence in the Prologue** | `ch0.js:242` vs `companion/ch1.js:125-127`; and `companion/ch1.js:10` forbids developing it | cut the line, or spend it: **nine Masters with nine Sightings decide the fate of a child, and 212's bill was four Masters' Sight** — nobody observes that the room contains more than twice the currency required |
| **E25** | **the Reader, T7 → T10** | **The Reader acquires the only Founder-voice document in the game and no scene, prompt, puzzle, hint or character ever asks for it.** The Reader sits through the reading of the prophecy stone — a scene *about* what the Founders did — with Mere's own account of it in their Book. The game itself acknowledges it matters: "It will be in your **Book** from here on" | `companion/ch4.js:62`; `ch4.js:498` | one whisper at `ch5_descent`, where Marrow names Mere: *"Reader — you are carrying her handwriting."* **That is all it takes** |
| **E26** | **the stair-holder, T7 → T9** | **One named seat sits in the dark for a chapter with their gift gone, gets it back "like blood into a numb hand", and at T9 reads "if you walk, you will never see another thread" — with direct, recent, physical experience of exactly that — and has no line, no prompt and no page on which to say so.** Their Epilogue *does* remember it, which proves the game considers it memorable. It is memorable one chapter too late | `ch5.js:551-552`; `ch6.js:591`; `companion/ch7.js:188`; `companion/ch8.js:227-228` | one line, per seat: *"I've had mine off for an hour. It isn't nothing."* And Marrow **ties the thread off herself** one chapter before the game invoices four of them, with no line drawing the parallel |
| **E27** | **Marrow, T9** | **She argues against the Fourfold Walk with contract law while holding the invoice.** Her one attempt to stop them is "You swore under KNOT, and it cannot be unbound." She has a better argument, it is true, it is hers, and she uses it **only as a concession, on one of four options, in reply.** A character whose established mode is *gives orders and costs in one tone*, and who de-escalates before a puzzle by naming the exact consequence, **would say the price** | `ch7.js:383-399`; `:396`; `ch6.js:488` | **the clearest behaviour/knowledge mismatch in the Sightings mystery**, and nearly free: a fifth `ch7_argue1` option, or the price in her opening line with the four answering it |
| **E28** | **Oriel, T3 → T10** | **She buys, in public, everything the four will find below — "All of it. Even the parts you don't like" — is standing at the top of the vault stair "come to be told", and the scene ends.** She then appears at the chamber's edge and **says nothing, loudly**, six feet from a wall being scraped, and appears in no epilogue. **The only Master with independent knowledge of the cover-up is never allowed to corroborate or be corroborated** | `ch1.js:256`, `:266`; `ch2.js:390`; `ch7.js:60`; `ch4.js:588` | §5/**P19**. And note the four are asked in public whether they keep their word (`ch7.js:494`) **while an earlier promise of theirs goes undischarged, unremarked** |
| **E29** | **the Binder, and everyone, T4 → T10** | **The number 212 is never spoken by any character on any branch.** On the Hearth it exists only as a carved numeral in the art. The Binder is handed the sentence that unlocks the mystery, in English, in Chapter II — "the newer one was written in 212, the year this room was rebuilt" — and **the house rule is "Say what you see", and no seat, character or scene ever asks for the date.** The one person holding it has no occasion to speak it for six chapters | grep over `js/`; `companion/ch2.js:157`; `lore.js:74` | **[WITHHOLDING]** by scene design, not by character. Two whisper lines at `ch2.js:346` let the party date the cover-up themselves from partitioned evidence — **which is this game's own puzzle grammar.** As shipped, **212 is scenery** |
| **E30** | **Wren, T8** | **Wren stands in the room while the four spend up to four readings, each wrong one cracking a bell, thirty seconds after saying "I would rather have had the true one" and giving Marrow leave to confess.** Wren is the game's protocol coach — the "has everybody said their bit?" line appears **inside this puzzle's own failure text** — and intervenes with process every single time and with content never. **Against the established character, the silence is not motivated by anything the game has established** | `ch6.js:768`, `:781`, `:320`, `:689`; `ch6.js:663` | three repairs: one line before the puzzle (*"I know what it says. You need to be the ones who read it, or she wins"*), which makes the silence complicity with Marrow's method; **or establish that Wren has the *sense* and not the *text*** (§7/U9), which is cheapest and strongest; or have Wren visibly stop themself once and have the narration note it |
| **E31** | **Wren, T6** | **Wren performs discovery about a fact held for years**: "Four of them. **Where is the one born of four? Where am I?**" — against "I have had years to get used to it" and "It's me." Either a deflection performed for the room, in which case **nothing marks it** and the player is misdirected by a character the game has otherwise made scrupulously honest; or a genuine question, in which case T9 is a retcon | `ch4.js:558` vs `ch7.js:404`, `:697` | the performance reading is right and needs one clause — **or promote the `WREN_SCARED` variant ("There is no child in it.") to the default**, which is flat and does not pretend to ask. *On `WREN_SCARED` the inconsistency does not occur at all* |
| **E32** | **the Reader, T0 → T7** | **A professional reader of worn carvings has lived under the stone for seven years and is given no page for it until ch6** — and **four of the eight cuts are unburnt and public**, visible to the room the whole time. Those four unburnt cuts contain **the Flame inverted, twice**: the Founders cut COLD, in public, above the fire, and the Order's Law says COLD is never written. **The Reader is the one person who could have noticed this at any point in fourteen years** | `ch0.js:146`; `lore.js:6`; `ch6.js:343-345`, `:399`; `companion/ch6.js:199` | **[WITHHOLDING]**, and the silence is mechanical rather than diegetic. Fixed by the same clause as §6/**X1**: the stone is **burnt**, not worn, and burnt is not the Reader's problem to solve |
| **E33** | **the Seer, T0 → T6** | **The seat whose gift is "what paint covers" has lived seven years in a school that hangs the overpainted tapestry in every hall and has never once looked** — and walks five corridors of the forgery in Chapter III without a page or a line mentioning paint. **At T3 it takes an enemy to suggest it** | `ch4.js:533`; `lore.js:8`; `ch3.js:116-500`; `ch1.js:283` | one line: the Seer looked once, as a child, and was told not to — **or nobody ever told the Seer that looking was a thing you could choose to do.** Either turns an oversight into characterisation and gives Oriel's bread-knife a peer. Plus one ch3 corridor line: *"Two of the hangings you pass have something under them. You do not have a hand free."* |
| **E34** | **the Binder, T4 → T8** | **The Binder assembles the mystery's whole syllogism four times and is never asked to apply it.** By T7 they hold, dated, on one tab sorted by year: Law 0 (struck 212), Law 3 ("the older binds"), Law 9 (beaten by Law 13 **with their own hands** at T4), Law 11 (beaten by Law 5 at T7), and Law 6. **Nothing ever asks them to look.** `LAW0` flips on flags rather than on an act of reasoning, and the sentence that names the whole crime — "A Law that is merely wrong is forgotten. A Law that is **inconvenient** is **struck**" — does not appear until **after** the answer | `lore.js:56-71`; `book.js:129-130`; `ch4.js:85`; `companion/ch6.js:236` | **highest value in this row:** move that sentence to the Binder's **ch5** page, where Law 6 arrives and Law 11 has just lost to Law 5. The Binder then walks into the bell-chamber holding the **motive** and needing only the **text** — exactly the knowledge shape the ch6 puzzle is built to reward |
| **E35** | **everybody, T4 → T9** | **The road 212 bricked is the road the Crown walks down.** An archway bricked shut with newer stone and stamped 212 in Chapter II; "the road down is wider than the stair, and older" in Chapter V; "**Boots on the old road.** Lord Vane stops at the edge" in Chapter VII. Nobody — not Marrow, who knows the rebuild was dishonest; not the Seer, whose gift is exactly this — remarks on it, asks where its other end is, or asks how the Crown found it | `ch2.js:346`; `scenes-ch2.js:100`; `ch5.js:602`; `ch7.js:304` | **NEW**, and **the mystery's single largest unclosed physical loop.** Nearly free: one Seer line at T9 — *"this is the other side of the bricks"* — converts the bricked road from set-dressing into the chapter's arrival |
| **E36** | **the four, T9** | **Nobody reacts to the bell-chamber wall.** The tapestry's true image, carved openly, four hundred years old, never painted over, in the room where the Finale happens. At T6 the same image had to be **scraped out from under an overpaint**. Four characters who spent Chapter IV proving the picture was forged walk past the unforged original and say nothing | `ch7.js:303`; `scenes-ch7.js:55-60` | the in-world answer exists in one line — *nobody the Order could send goes down there* — and no character delivers it. §7/U28 |
| **E37** | **Marrow, T4** | **She asks for evidence and does not collect it.** "Take the **Seer's eyes** with you. That vault was rebuilt once, and the rebuilding was not honest" — i.e. she names the gift, which means she already knows the falsification is **sub-floor**, operational knowledge she claims nowhere else. At the top of the stair she says one word: "**The Ember.**" On the niche path the four have just found a named Founder and the corrected prophecy | `ch2.js:189` vs `:392`; `ch2.js:301`, `:319` | **A person who asks for evidence and does not collect it is behaving as though she already has it — in which case sending them was theatre, and the game never says so.** Two lines. **[PROPOSED]:** make the errand openly an examination and E37 evaporates |
| **E38** | **the institutions, T10** | **Nobody tells anybody.** Four children and a Provost prove, under the school, that the institution's founding text has been mistranslated for four hundred years as the cover for a refused bill — and on **every** ending the record is never corrected, the Convocation never hears, the overpaint is never named to anyone with standing, Oriel is never paid, and the school goes on teaching the Order's translation. **On E3 the fourth-years are actively lied to. On E0 the four cannot even read the stone any more** | `ch7.js:726`; `ch8.js:283-349`; `:344`; `:287`; `CANON.md` §12.30 | **Coherent as tragedy and the game does not appear to intend it as one.** One line on E0/E1, or one deliberate sentence saying the silence is intentional. **The cover-up outlives the game on five endings out of five** |
| **E39** | **Marrow, T9** | **She bars a door on law and opens it for a non-reason, and the yielding is unmotivated as written.** Against "Because it is Wren, and we are not doing it": "**That is not a reading.**" … "**She steps aside anyway.**" Her best moment, and nothing in the scene supplies its cause | `ch7.js:387` vs `:397-398` | it *is* motivated, and her Epilogue says so — "I should have asked anyone." One clause before she steps aside — *"No. It is not."* — lets the player **hear** her accept a reason she cannot justify, which is the whole character |
| **E40** | **Marrow, T10** | **She is absent from three of five endings, including the one that supersedes her.** On ENDING 0 the four pay exactly the price she spent fourteen years arranging for somebody else to pay, **and the woman who arranged it has no reaction, no line and no presence.** The Epilogue's closing image is five shapes at a window; she is not one of them, and nothing says why | `ch8.js:283-349`; `CANON.md` §12.30 | **the largest structural hole in the Marrow mystery.** One paragraph. One Binder line in the E0 Epilogue — *you looked for her thread and your gift was gone, so you asked* — closes the arc the game opened at `companion/ch3.js:276` |

### MEDIUM

| # | who / where | the defect | cite |
|---|---|---|---|
| **E41** | **Wren, T8** | **Wren steers the four into unlocking a road Wren knows is priced in their eyes, and nothing in the game registers it.** "Then ask me a third time. **In there.**" — pushing them onward after the stone has opened the Walk. Consistent with Wren's protective withholding, **but it is the most morally loaded thing Wren does all night and no one, including the narration, names it** — against a game that elsewhere writes "Wren is lying, and is fourteen, and is doing it for you" | `ch6.js:863`; `ch1.js:303` |
| **E42** | **Wren → the Seer, T10** | **The Seer is thanked for telling on every branch, including the one where the Seer never told.** `GOODBYE.seer` is a fixed string; a Seer who answered NOTHING in the laundry and *away* at the Second Asking receives a letter thanking them "for both". **The Epilogue asserts a knowledge transfer the flags say did not happen**, and both flags are in scope on that page | `companion/ch8.js:112`; `ctx.flags` |
| **E43** | **the four, T2 → T8** | **There is no scene in the game in which the four discuss the four anomalies with each other.** T2 speaks them; T8 speaks them again *to Wren*. In between, each page restates its own seat's item in isolation, and the house rule means **the pattern exists only at the table, in the real players' heads.** A design strength and an in-fiction hole: four people who have shared a room since they were seven, having just discovered they each hid the same kind of secret, never mention it again for six chapters | `ch0.js:217-218`; `ch6.js:642-678`; `lore.js:74` |
| **E44** | **Vane, T9** | **He never prices the four's Sightings, and his own ending is built on their value.** He names a gift by function in public, offers four masterships, prices refusal — and on E4 the Crown **registers all four Sightings and posts their holders to the Cold-works.** A man with that model of the asset, standing where four children are about to destroy four such assets, **says nothing about it** — while his established mode is to argue by pointing at evidence | `ch1.js:282-283`, `:289`; `companion/ch8.js:291` |
| **E45** | **the four, T9** | **They never compare price tags, and the design makes it nearly impossible.** Four costs, different, beautiful, the most character-revealing lines any of the four receive. The house rule permits saying them aloud; the preceding Hearth instruction ("Read your page. **Say nothing.**") discourages it; the two-minute clock makes it unlikely. **Four people pay four different prices and most tables never hear three of them** | `companion/ch7.js:185-188`; `ch7.js:357`, `:452` |
| **E46** | **the four, T3 → T10** | **`VANE_ACCEPT` corrupts the party in one clause and the game never charges for it.** "Two of them are paid. **So, since the Hall, are you.**" — one sentence, **one seat's** Sight tab, mid-briefing. The other three accepters are never told they are bought; ch5's copy of the flag is never read; ch7 warms one line; the Epilogue counts only the *finale* bargain. **The four's own purchase is the mystery's answer to "who else benefits", and it is priced at one clause** | `companion/ch3.js:236`; `ch7.js:314`; `ch8.js:113` |
| **E47** | **the Binder, T4 → T9** | **A gift that reported coin from two floors up reports nothing from across a room.** At T4 the Binder reads Vane's gold **through a floor** well enough to infer his position and aim. At T9 Vane is eight metres away and the Binder's Wren tab lists exactly three threads — **the Envoy is not on the list.** Neither is the man holding four bought soldiers | `companion/ch2.js:169` vs `companion/ch7.js:256-258` |
| **E48** | **Wren, T9** | **Wren quotes a promise Wren was not present for.** "He promised. **People keep saying he keeps promises.**" — of an offer made in a passage with the four alone. No scene shows any of them telling Wren, and on `VANE_ACCEPT`/`VANE_PRETEND` they have a strong reason not to. "People keep saying" implies **plural and repeated**, a conversation the game never stages | `ch7.js:433` vs `ch1.js:278-282` |
| **E49** | **Marrow, T5 → T6** | **She condemns the four for saving a life that was never in danger, and does not tell them.** "Hand over the boy, or **the Provost hangs**" → on every branch "the rope came off the beam an hour ago" → her first words on `SURRENDERED`: "**You gave the child to a man with a writ.** Not now. Sit down." Whether she knows the threat was made is **never stated on any branch** | `ch3.js:543`, `:635`; `ch4.js:340` |
| **E50** | **Sorrel / the Convocation, T4 → T10** | **The nine acquire a piece of the Cold, by writ, and nothing follows.** Nothing in the remaining six chapters shows them holding it, using it, or knowing what they have. Sorrel is never named again after ch1 — and the only branch where an institution other than the Chair holds physical evidence spends it on nothing | `ch2.js:383`, `:387-389` |
| **E51** | **Wren, T7** | **Wren knows Mere's hidden door, its maker and its purpose, and speaks the second clause of her sheet word-for-word one chapter before the document becomes readable** — while the Reader had to take a rubbing and find a primer to get one sentence of it — and descends three flights in total darkness to use it | `ch5.js:287-288`, `:400`; `companion/ch4.js:62` |
| **E52** | **the Binder, T4 → T8** | **The Founders legislated against being overruled before anyone tried, and nobody at the table notices they were right.** The Binder uses Law 3 to beat Law 9 at T4, Law 5 to beat Law 11 at T7, and Law 0 to beat Law 6 at T8 — **three uses of the Founders' anti-override clause** — and never remarks that it was written in Year 0. **The single most characterising fact available about the Founders, derivable from two rows of a table, and no one says it** | `lore.js:60`, `:57`, `:62`, `:66` |
| **E53** | **everybody, T2 → T9** | **The table performs the Founders' act in the Prologue and again at the climax, and the game never links them.** The lamp: ASH, EMBER, four hands, "*Fire, keep.*" The climax: COLD, four hands. **Nothing at the climax refers back to the lamp** — and the Epilogue's word-card scene even reaches for the shape ("You wrote it twice") **about WREN, not about the four hands.** The better callback is sitting right next to the one that shipped | `ch0.js:213-216`; `ch7.js:740`; `ch8.js:493` |
| **E54** | **Marrow, T8** | "**It knows. It always knows when somebody kneels here.**" — said three feet from the child she has known for fourteen years came out of the fire. If §7/U2(c) is ruled (the Cold knows because **Wren** is it and Wren is standing there) this is the best line in the chapter, **and nobody, including Wren, reacts** | `ch6.js:486` |
| **E55** | **the four, T9** | **The option label is written as revelation and the payload as vindication.** "Show him what is under the paint" — **to the man who said "Ask your Seer what is under the paint" in Chapter I** and who has known for twenty-two years. A player choosing it believes they are telling a man a thing he told them | `ch7.js:332` vs `ch1.js:283` |
| **E56** | **Marrow, T9** | **She names a lock Law 4 says the sworn-to cannot tell, and is right, and the game never says how** — in the same exchange as her three confessions of prior knowledge, so the scene contains **two unexplained knowings**. The Binder's own page states it flatly rather than as a secret | `ch7.js:387` vs `lore.js:64`; `companion/ch7.js:232`; §6/**X21** |

### LOW

| # | the defect | cite |
|---|---|---|
| **E57** | **The Reader does not go back and tell Wren the name** between T6 and T8, having been asked for exactly that at T5 and answered DONTKNOW or bluffed. Defensible and in character — but nothing in the fiction acknowledges an outstanding promise, and the game is 90% of the way to paying it already | `companion/ch4.js:202-205`; `companion/ch5.js:289` |
| **E58** | **Wren registers a one-handed COLD out loud at T7 and does not follow it**, then at T9 says "It is never written" of a word the table may have written twice already | `ch5.js:543`; `ch7.js:615`, `:696` |
| **E59** | **Marrow says "I can close this wound" and 142 lines later "Not closed — held"**, in the same chapter, same room — and **Wren, who corrects her phrasing twice in the same chapter, does not notice** | `ch6.js:487` vs `:629` |
| **E60** | **A ch5 cast bit is spent on `VANE_ACCEPT` and the chapter never mentions it** — one of six bits, paid to tell four phones whether the party sold Wren, and then unread | `lore.js:22` vs grep over `companion/ch5.js` |

## 6.2 Knowledge-order contradictions

*The game disagreeing with itself about who knew what, when.* **NEW** = found by the mystery files and
not carried by `CANON.md` §13.

| # | contradiction | both sides | which the game depends on | status |
|---|---|---|---|---|
| **X1** | **"Nobody alive has read the cuts" — and at least two people have** | `ch0.js:62` vs `ch0.js:146`, `lore.js:6` (the Reader) and `ch6.js:824` (Marrow) | **the burn** — four cuts are *burnt*, not worn, a good answer arriving six chapters late, and it only covers four of eight | `CANON.md` §13.2. **The single largest logical hole in the game, and it sits on its central mystery** |
| **X2** | **Wren has known "for years" about observations that are a year, months and four years old.** Wren answers *"All four of you"* — i.e. *I have known that all four of you noticed* — and the Reader's noticing is a year old, the Seer's months. Compounded: `ch6.js:329` puts the Seer's at "**six years**" | `ch0.js:226` vs `companion/ch0.js:99`, `:124`; `ch6.js:329` | **Wren having known a long time** | **NEW.** Fix on the four Prologue pages: make the **observation** old and the **rationalisation** recent |
| **X3** | **"That is what the stone says"** — of which stone? Reachable after the table has read the opposite | `ch7.js:404` | see §7/**U9** — **this line is the only thing that dates Wren's knowledge of the carved reading** | **NEW**; and see §6.3 |
| **X4** | **Marrow cannot be surprised by Law 0, and is** | `ch5.js:399` vs `ch7.js:396` | `ch7.js:396` — her only explanation of 212 anywhere | **NEW** |
| **X5** | **COLD is written by one hand, successfully, in Chapter V** | `ch5.js:524-530`, `:543` vs `lore.js:57`, `ch7.js:726` | the four-hands rule, absolutely | **NEW**, and distinct from `CANON.md` §13.15 — **worse**, because it is a designed puzzle with a designed answer and a designed acknowledgement line |
| **X6** | **Law 0 is restored by a Chapter I promise** | `ch4.js:85`; the file flags itself | the ch6 restoration | `CANON.md` §13.17 — see **E15** |
| **X7** | **Law 0 is "restored" twice, and the second announcement may be false** | `ch6.js:814`, `:853` vs `ch4.js:85`, `companion/ch5.js:333` | ch6's announcement | `CANON.md` §13.46 |
| **X8** | **Law 0 and Law 6 have two texts, on two tabs of one phone — and the ch6 puzzle turns on exactly the clauses the Book omits** | `lore.js:57`, `:67` vs `companion/ch6.js:232-233` | the three-clause version for the puzzle; the one-clause version everywhere else | `CANON.md` §13.8. **A player's knowledge state and their character's diverge silently for eight chapters** |
| **X9** | **"the Convocation's" vs "the Order's" — same Law, same phone, two institutions** | `companion/ch6.js:233` vs `companion/book.js:122`, `lore.js:55-57` | §7/**U3** | `CANON.md` §13.9. **Epistemic consequence: the Binder cannot form a stable belief about who the defendant is** |
| **X10** | **The Epilogue restates the Order's Law as the world's, one scene before the phone celebrates its overturning** | `ch8.js:493`, `:499` vs `lore.js:57`, `ch6.js:827`, `companion/ch8.js:309` | Law 0 | `CANON.md` §13.12. **A narratorial knowledge regression** |
| **X11** | **Wren's thread: the `none` glyph vs three lines asserting threads that reach Wren** | `companion/ch2.js:166` vs `:169`, `companion/ch3.js:275`, `companion/ch4.js:271` | the ch4/ch8 version (*nothing originates in Wren*) | `CANON.md` §13.7. **Caution: fixing it the obvious way deletes the best clue in the game.** Leave the glyphs, change the ch2 *sentence* to name the difference it already gestures at |
| **X12** | **The grey thread's age — "since before you were born" vs "fourteen years"** | `companion/ch7.js:257` vs `ch8.js:333` | `ch8.js:333` — **the number all decision-dating rests on** | `CANON.md` §13.38 |
| **X13** | **"once called someone Mum by accident"** against four uses, at least two deliberate, one of them the emotional centre of ch6 | `ch8.js:346` vs `ch0.js:233`, `ch4.js:770`, `ch5.js:287`, `ch6.js:689` | the four uses | `CANON.md` §13.13. On E3 it is the **last** characterisation of the relationship the player receives |
| **X14** | **Wren's pronoun, on the two pages that carry the name mystery** | `companion/ch5.js:290` ("her") vs `companion/ch8.js:195` ("him") vs the house convention | the pronoun-free convention | `CANON.md` §13.4; §7/**U6** |
| **X15** | **`ECHO` vs `whisperTruth` for the Binder** — so a Binder who told the truth is scored untruthful | `ch6.js:327` vs `lore.js:44` | **`lore.js`** (the Epilogue counts it; a tool guards it) | `CANON.md` §13.21 |
| **X16** | **When the Reader decided they had misread the name** — a year ago, a spelling mistake / in the study, their own eyes | `companion/ch4.js:205` vs `companion/ch7.js:241` | **ch7's**, which makes the Reader's self-image the point | `CANON.md` §13.37 |
| **X17** | **The Reader's rationalisation moves *backwards* after being falsified.** At T5 the Reader learns the alphabet is on four-hundred-year-old brass — which kills "a prank" outright — and **the page restates the prank hypothesis on the same screen**; at T6 it downgrades to "a spelling mistake", a *weaker* hypothesis than the one T5's evidence destroyed | `companion/ch3.js:181-183` vs `companion/ch4.js:205` | ch7's | **NEW.** One clause at `ch3.js:183` — *"whoever was being funny had four hundred years to set it up"* — converts the restatement into the moment the joke stops being funny |
| **X18** | **The Binder's Book pre-announces its own T8 revelation**, ungated from the Prologue: "not unbound: **the knot itself**" | `book.js:131` vs `ch6.js:678` | the ch6 puzzle | `CANON.md` §13.44. **The Binder's belief state and the Binder's Book disagree for eight chapters** |
| **X19** | **"the fourteenth year running" vs "since you were seven"** — a fourteen-year-old who met Wren at seven has seven years of observation | `companion/ch2.js:166` vs `ch0.js:77` | — | **NEW.** Pairs with X2: the four shipped durations are one year, four years, months and fourteen years, against Wren's composite "years" |
| **X20** | **Sorrel knows the errand before Marrow decides it** | `ch1.js:255` vs `ch1.js:310` | the mid-sentence change — it is the beat that tells the player the flicker moved her timetable | `CANON.md` §13.26. Clean on `VOTE_LOST`. **Better read as characterisation: Sorrel has predicted this Chair correctly for years** |
| **X21** | **Marrow names the lock Law 4 says she cannot tell** | `ch7.js:387` vs `lore.js:64` | Law 4's last clause — it is the whole weight of the ch4 choice | `CANON.md` §13.14. **Best resolution, free: Law 4 is a lie the Order tells its Wardens, and she knows it** — she is the one character who has said aloud that the Order writes law to cover costs |
| **X22** | **Two "unsworn" states collapse**: a failed wax closing writes the same flags as a refusal, and from ch5 the game cannot tell them apart — **so her line "You would not swear, so I do not take you" is spoken to tables that tried and failed** | `ch4.js:728-729`; `ch5.js:252` | treat `REFUSED_OATH` as **unsworn** everywhere | `CANON.md` §13.16 |
| **X23** | **The Ember relights the Hearth vs the Hearth is four spent people.** If the Hearth is four spent people, no stone relights it | `ch2.js:188` vs `ch6.js:850` | `ch6.js:850` | **NEW-ish.** The Ember line should read as **doctrine she repeats, not physics she believes** |
| **X24** | **"I can close this wound" vs "It is held. Not closed — held"** — same chapter, same room, same speaker, 142 lines apart | `ch6.js:487` vs `:629` | `:629` | **NEW.** `:487` is either a lie told to get four pairs of hands onto keys, or a mid-scene discovery, **and nothing marks it either way** |
| **X25** | **Quill's only line is mechanically false and unframed** — asking him *does* flip him | `ch1.js:62` vs `ch1.js:55` | `tally()` | `CANON.md` §13.25. **[WRONG]-by-omission**: the game tells a truthful-sounding lie in a teaching scene |
| **X26** | **"Nobody knows what that means", with two people in the room who do** — Oriel is seat 7, present and voting; and Vane says he told this Hall the same thing twenty-two years ago | `ch1.js:139` vs `ch4.js:588`, `ch7.js:341` | **Oriel knowing** — her note is the only evidence the cover-up is maintained | **NEW.** Fix: *"Nobody in that hall will admit to knowing what that means. Two of them do."* |
| **X27** | **Vane bows to the vote and breaks it** | `ch1.js:231` vs `ch3.js:439` | **the promise-keeper** — E4's horror and the `WORD` door key both require it | **NEW**; see **E9** |
| **X28** | **Where the paint is: three surfaces, two media, one claim** — "in this hall" (Great Hall), the study tapestry, and a **carving** in the bell-chamber, while the option is still labelled "under the paint" | `ch1.js:138`; `ch4.js:533`; `ch7.js:303`, `:321`, `:341` | "in every hall" partially rescues ch1 | `CANON.md` §13.39 + **NEW** epistemic edge: **the four can "show Vane what is under the paint" without ever having been under any paint** |
| **X29** | **Vane promises secrecy and demands a public answer** | `companion/ch7.js:182` vs `ch7.js:493-496` | — | **NEW**; see **E19**. `CANON.md` §9.3 attributes the breach to the Hearth; **the source does not support that** — the prompt is his scene's and the question is his |
| **X30** | **He wins the vote and immediately says the win will not hold** — "The Provost will have the boy back by morning" — **and he is right** | `ch1.js:280` vs `ch1.js:146`, `ch3.js:438` | — | `CANON.md` §12.61, sharpened: it means **Vane never believed the vote was the instrument**, which makes his entire Chapter I performance theatre whose purpose is never stated |
| **X31** | **The captain's rope** — threatened, and off the beam on every branch including surrender | `ch3.js:543` vs `:635`, `:644-645` | — | `CANON.md` §12.39; see **E20** |
| **X32** | **Two different "under the paint" reveals satisfy one choice** — on `!TAPESTRY` the Seer performs, as a free action in a timed finale, a physical excavation the game spent a whole chapter gating behind a two-try puzzle | `ch7.js:338-339` | — | **NEW**; compounds **E17** |
| **X33** | **`CANON.md` §9.3 reads Vane's art marks as threads; the art idiom says edge-light.** The same three lines give Marrow the Hearth's orange and Wren the Cold's teal by the identical path idiom | `scenes-ch7.js:83`, `:86`, `:87` vs `CANON.md` §9.3 | **author's ruling.** If threads: **Vane is sworn to somebody and the game never says to whom** — the richest unopened door in his mystery. If light: `CANON.md` §9.3 needs correcting and the Binder's ch7 silence (**E47**) becomes a simple absence | **NEW**, and a **correction to `CANON.md`** |
| **X34** | **Vane's seal is exactly Redmoor's House colour, and Redmoor is the seat his own soldier blocks** | `scenes-ch1.js:117` vs `:14` | author's ruling | `CANON.md` §12.35; §7/**U10** |
| **X35** | **A ch5 cast bit is spent on a fact its chapter never uses** | `lore.js:22` vs `companion/ch5.js` (grep) | — | **NEW**; see **E60** |
| **X36** | **"Spent" means two different things, and the reversible one is taught first.** A table that held the stair has been explicitly taught that a spent Sighting comes back, **four scenes before** being asked to spend one forever | `ch5.js:551-552`, `ch6.js:591` vs `ch8.js:287`, `companion/ch8.js:148` | **the permanent sense** | **NEW.** Cheapest fix: ch5 says *lent*, or Marrow's four words — "Lent. Not spent. There is a difference and you will meet it later." |
| **X37** | **A Sighting can be taught, and a Sighting cannot be chosen.** One of the four gifts is partly a curriculum ("**you are the only person at this table who was ever taught this**") and another one **grows when someone leaves a book open** | `ch0.js:241` vs `companion/ch0.js:139`, `ch4.js:51`, `ch6.js:663` | **the expansion** — the whole of the Reader's T8 and T9 rests on it | **NEW.** One clause at `ch0.js:241` separating the Sighting from what a person does with it |
| **X38** | **The rule exempts the only adult who walks.** On E3 "she puts her hand on the fire, and it opens like a door" — **and not one word about what it costs her**, in the ending she walks in. Compounded: **Marrow's Sighting is never named anywhere in the game** | `ch8.js:341` vs `ch8.js:287`, `ch0.js:242` | — | **NEW.** One clause: "and her eyes go grey" |
| **X39** | **Vane's offer is worthless if `ch0.js:242` is true.** If every Master already has a Sighting, a mastership is rank, not gift — and the four already have the only part of it that is scarce. **On E4 the Crown delivers exactly that, which means the game's worst ending is the one that reads the offer correctly**, and no character notices | `ch1.js:282` vs `ch0.js:242`; `ch8.js:356` | — | **NEW.** One line from the Binder at T3 |
| **X40** | **212's Laws are drawn as struck** on the Binder's ch5 plate, though only Law 0 carries `struck: true` | `companion/ch5.js:128-130` vs `lore.js:57`, `:66` | "struck" and "outranked" are different states everywhere else | `CANON.md` §13.33. **Epistemic cost: the Binder is shown 212 as a repudiated error rather than a standing policy** — which flatly contradicts Oriel's "they painted it back inside the week" |
| **X41** | **The bricked 212 road is an open thoroughfare in ch7** | `ch2.js:346` vs `ch5.js:602`, `ch7.js:304` | — | **NEW**; see **E35** |
| **X42** | **Two source comments assert a Hearth line that is optional** — ch4's tapestry puzzle is tuned as though the table had been told "four, as one, went through" in Chapter II | `ch4.js:537-539`; `companion/ch4.js:109` vs `ch2.js:319` | — | `CANON.md` §13.32. **On the commonest path the first shared-screen statement that four went down is `ch6.js:839` — T8 — and everything before it is inference** |
| **X43** | **The prophecy question asked at T5 is not the question re-asked at T8** — and `ch6_held` frames the Asking as *the same four questions* | `companion/ch3.js:294` vs `ch6.js:673`; `ch6.js:632-633` | — | `CANON.md` §13.22. **The one that does not repeat is the only one that is about the prophecy**, and the chapter papers it over with a pun |
| **X44** | **Mere came back, and the prophecy says nobody does** — "who kept the fire, **after**"; "four going down the stair and **four coming back**" | `companion/ch4.js:62`, `companion/ch5.js:310` vs `lore.js:75`, `ch8.js:331` | — | `CANON.md` §12.15. **Nobody in the game ever remarks that a walker came back** — and ENDING 0's four *do* come back out, which makes the Founders' survival load-bearing on the true ending and unremarked everywhere |
| **X45** | **Marrow's "they" has no antecedent**, and the two readings mean opposite things | `ch7.js:396` | `companion/ch6.js:286` supports the Order reading | `CANON.md` §12.18. **The only place the cover-up's motive reaches the Hearth screen, and its subject is a pronoun** |
| **X46** | **The Founders' Door is drilled wrongly "since the floor was laid" — and the floor was laid in 212.** So the school's drill is **an artefact of the cover-up taught as pedagogy for 188 years** — the mystery's thesis in miniature, stated only inside a wrong-answer hint and a phone's fine print | `ch2.js:119`; `companion/ch2.js:156-158` | — | **NEW. [WITHHOLDING]** by placement rather than intent. **No character says it** |

## 6.3 Cross-document conflicts to resolve

| # | conflict | resolution needed |
|---|---|---|
| **C1** | **`CANON.md` §9.1 says Wren knows the stone's true reading "since: years"**, citing `ch7.js:404`. `epistemics-year212.md` argues that line will not bear it and that **Wren does not know the carved reading before T6**. `epistemics-prophecy.md` §5.9 proposes the reconciliation: **Wren has always known the stone was about Wren and has never been able to read a cut** (Wren is not a Sighting-holder) | **Blocks Wren's entire T0–T8 withholding column and decides E11, E30 and X3.** §7/**U9** |
| **C2** | **`CANON.md` §9.3 reads Vane's ch7 art marks as two threads on one body.** The art file gives Marrow and Wren the identical idiom in the Hearth's orange and the Cold's teal — i.e. it is the scene's rim-light helper | §6/**X33**. **If the author rules them threads, Vane is sworn to somebody and the game never says to whom** |
| **C3** | **`CANON.md` §11 treats ENDING 0's unheld wound as safe** ("It is simply a fire") and offers no reason. Every mystery file inherits that silence | Ruling wanted: is an unheld wound safe, and if so why — or is the last line of E0 a comfort the game is choosing to offer? |

---

# 7 · [UNDECIDED] REGISTER

**What this is.** Every **knowledge question the game does not settle** — i.e. every place where a cell
in §4 or §5 cannot be filled without an author's ruling. Ordered by how much of the epistemics depends
on it. `CANON.md` §12 numbers are given where the question is already logged there; the rest are new
to this document.

**Tier 1 blocks tables** — a ruling changes rows in §4 or §5.
**Tier 2 blocks scenes** — a ruling decides whether a beat is characterisation or an error.
**Tier 3 is smaller, and still worth a ruling.**

## Tier 1 — these block the tables

| # | question | why it blocks | options, and the cheapest good answer |
|---|---|---|---|
| **U1** | **What is a "wound in the world"?** The phrase is used four times and never unpacked | **K16: nobody in the game ever knows this, and that is correct** — but the silences about it must be *consistent*, and the art already commits to an answer the prose does not (an inverted sky, a cold sun, stars on the roof) | (a) a literal breach; (b) an **absence**, exactly as the glyph glosses it ("the space left when warmth goes"); (c) a made wound. **[PROPOSED] (b) with an (a) skin** — an absence that behaves like a place, which is what *a hollow* means and what Wren is. `CANON.md` §12.1 |
| **U2** | **Is the Cold sentient?** One line: "**It knows. It always knows when somebody kneels here.**" | It decides whether **E54** is the best line in ch6 or a figure of speech, and whether a player who asks "is the Cold a person too?" one scene after being told the fire is four people is being invited or misled | (a) yes — costs a second character; (b) no, and Marrow speaks of it as sailors speak of weather — costs the line its weight; **(c) it knows because Wren is it and Wren is standing there** — costs nothing, buys the line enormously, available for free. **[PROPOSED] (c)**. `CANON.md` §12.2 |
| **U3** | **Is the Convocation the Order?** `lore.js:55` glosses era O as "Order"; `lore.js:57` says the **Convocation** struck Law 0; `companion/ch6.js:233` calls Law 6 "the Convocation's"; `book.js:122` calls every 212/340 Law "Order's" | **The Binder cannot form a stable belief about who the defendant is** — every "believes about others" cell for the Binder in M8 is hedged because of this. And if the bodies are the same, **the nine Masters voting on Wren in Chapter I are the direct institutional heirs of the people who buried the Cold**, which makes Sorrel's "it comes to the nine of us" chilling rather than merely greedy | **[PROPOSED] (a) same body, two names** — cheapest, and it converts the ch1 vote into Year 212 re-run in miniature (§5.5). §6/**X9**; `CANON.md` §12.3 |
| **U4** | **Who was "never asked"?** "We were four. I offered to go alone and was refused. **One was never asked.**" The arithmetic does not close unless there was a **fifth** person | It is the Founders' single act of wrongdoing, it is what Mere's hidden door is an apology for, and **Wren walks through that door** | **[PROPOSED] (a) a fifth person existed and was excluded** — it gives the door an occupant, gives the First Hall's **five arches** a reason, and pays off the four thrones. `CANON.md` §12.4 |
| **U5** | **How does Wren know things only one seat can perceive?** | **The persona reading is unstable until this is ruled** — it is the difference between Wren being an anomaly and Wren being a stalker. It also decides whether **E51** (Mere's door, Mere's Book) is a hole or a property | (a) **a Wren anomaly** — consistent with the hollow being in every room; (b) Wren has watched them for seven years; (c) an oversight. **[PROPOSED] (a)**, plus §5/**P2**: one clause of narration noting that nobody asked, and nobody will. §6/**E2**; `CANON.md` §12.21 |
| **U6** | **Is Wren's pronoun-lessness diegetic?** | It determines whether **the narration is a character with a belief, or a convention** — and therefore whether §6/**X14** is a bug or two bugs | (a) diegetic — the narration declines a pronoun because Wren is not, until the end, a person of whom one is true; (b) a table-facing courtesy; (c) an accident. **(a) and (b) are compatible and cost nothing; (a) makes E0's pulse land harder.** `CANON.md` §12.27 |
| **U7** | **Did Marrow know the stone says *four* and judge four Masters unobtainable — or does she read the four-hands clause as governing the *writing* and the *walking* as one?** | **The mystery's largest undecided, and her entire culpability hangs on it.** Three readings hold and the game commits to none: **(a)** she made the 212 decision herself, knowingly, with better motives — devastating, free, and it retro-charges "They could not afford four Masters" with an unbearable second meaning; **(b)** she reads the four-hands clause as about writing only — coherent, but then she is wrong, her wrongness is the plot, and **nothing marks it**; **(c)** she only learns to read it in ch6 — contradicted by "I have had **four hundred years of this stone**" | **[PROPOSED] (a)**, plus one sentence from her at T8. Related and probably the same ruling: **[PROPOSED]** the load-bearing error is that *"four hands" was converted into "four Masters"* by 212, and she inherited the substitution — **which is the only reading under which fourteen years of raising one child makes sense, and it is the error E0 corrects** |
| **U8** | **Does Marrow know about the four anomalies?** She named the child *the hollow of a bell*, raised it fourteen years, and **has no stated position on its four data points** | **Not mystery — a blank.** The most interested adult in the building has no belief cell to fill | two options, both cheap: **(i) she knows** — one line at T8 ("I have known since the first night. I could not have you know it") which makes her fourteen years harder and better; **(ii) she does not** — one line at T8 where she looks at Wren differently after the Seer answers, which makes the Second Asking cost her something too. §6/**E7** |
| **U9** | **Does Wren know the *carved reading*, or only that the stone is about Wren?** `CANON.md` §9.1 takes the first; `epistemics-year212.md` argues `ch7.js:404` will not bear it; `epistemics-prophecy.md` proposes the reconciliation: **Wren has always known the stone was about Wren and has never been able to read a cut** (Wren is not a Sighting-holder) | **Blocks Wren's entire T0–T8 withholding column**, and decides §6/**E11**, **E30** and **X3** at once | **[PROPOSED]** the reconciliation — it is the cheapest, it makes `ch7.js:404` mean the *Order's* reading, and it makes Wren's silence at the stone puzzle **incapacity rather than complicity**. §6/**C1** |
| **U10** | **Is Vane Redmoor-born, and is he sworn to somebody?** His wax seal is exactly Redmoor's House colour, and Redmoor is the one seat his own soldier blocks; and he is drawn with a **red** mark inward and a **gold** mark outward, red being an oath | It would answer three open questions at once: **how he knows the seats; how he knows four children's given names; and what "*your* Hall" is doing in his mouth** — the speech of a man who was of this place and is careful to say he is not | **[PROPOSED]** rule it deliberate. If accidental it is a palette collision and one hex value fixes it. §6/**X33**, **X34**; `CANON.md` §12.35 |
| **U11** | **Whose signature is the notch at socket 1?** "Two cuts, by two different hands"; "a notch is only a signature"; **Law 7 is Idony's and it governs this exact ring** | It is **the only chance in the game to name a second Founder on screen**, and it converts F15 from a blank into a *recovered* name | **[PROPOSED] Idony.** Nearly free. §5/**P22**; `CANON.md` §12.37 |
| **U12** | **Why does the Crown want Wren specifically rather than the Cold — and does Vane know Wren is the Cold?** "Safekeeping" is not a motive; the Crown's aim is the Cold, open; nothing connects them | **Decides whether Vane is buying a hostage or a key**, and therefore whether his stated want is honest. It is also the answer to the largest behavioural oddity in his part: **a man with a royal writ and soldiers spends a whole night asking** and never once tries to take | **[PROPOSED] (a): Wren cannot be taken, only given.** Wren has no thread, and you cannot bind what is not bound; the Crown needs a **transfer**, not a capture. One line pays U12, E4's "goes into the cage **without being pushed**", the whole bargain mechanic, and seven declined opportunities. (b) the Crown's claim must be **lawful** for the Cold-works to be lawful — cheaper, colder, and it makes the ch1 vote matter retroactively. §6/**E10**; `CANON.md` §12.32 |
| **U13** | **What is "the Provost's version" of Wren's name?** Wren asks for the meaning "properly. **Not the Provost's version**", and the Provost's version is **never given anywhere** | The obvious candidate is "**a small brave bird**" — which is the Reader's *bluff* option. **If that is what Marrow has told Wren for fourteen years, the Reader's invention is a quotation, the Reader unknowingly repeats her lie to Wren's face, and the scene doubles in weight** | **[PROPOSED]** rule it so. It changes three rows of §5.2c. `CANON.md` §12.28 |
| **U14** | **Who chalked Wren's name on the dormitory door — twice, one in an alphabet nobody teaches, in the same hand?** And the Reader dates it to **a year ago**, while Wren has been at the school fourteen | The strongest single clue in the Prologue, never answered — and it sets the Reader's whole T0 cell | **Marrow** is nearly free: she wrote WRENN on the roll in the same letters, in her own hand. Alternatives: Wren; **the Reader themself, and does not know it** — which is the only answer dangerous to the Reader's self-image, and therefore the one that explains why the door stayed unasked. `CANON.md` §12.16 |
| **U15** | **Who prepared the ring, and who cut Wren's name into the eighth socket in letters four hundred years older than the present alphabet?** "The ring has been ready for **fourteen years**" — of a four-hundred-year-old Founders' floor | **Either the Founders knew a hollow would come, named it, and built the ring around the place it would stand — in which case they planned for Wren four hundred years before Wren — or somebody cut that name later.** The first reading makes them far more loving *and* far more culpable at once, **and nobody in the game asks** | Ruling wanted. `CANON.md` §12.22, §12.5 |
| **U16** | **Was the Provost's hanging ever real, and does Marrow know the threat was made?** On every branch "the rope came off the beam an hour ago", and whether she knows is **never stated** | If she knows, she is condemning four children for a choice made to save her, **while knowing the choice was based on a lie — and saying nothing about the lie.** That is either her worst moment or an oversight, and the game does not distinguish | **[PROPOSED]** one clause: *"There was never a rope. He knew that. **You did not.** Sit down."* — converts the beat into the chapter's best line about her. §6/**E20**, **E49**; `CANON.md` §12.39 |
| **U17** | **Where do Sightings come from, and why are there exactly four?** | **The last row of M9 §9.2: nobody in the game ever knows this, and no character ever asks.** It is the largest unclaimed piece of meaning in the game | **[PROPOSED] (a) they are the Founders' four, still being dealt out** — one per Founder, forever. Costs one sentence, is contradicted by nothing, and retroactively earns the four dials, plinths, bells, thrones, the four corners of the study, Mere's eight questions and four eyes, and the price 212 would not pay. It also answers "which throne/bell/plinth is whose". `CANON.md` §12.7, §12.38 |
| **U18** | **Did the Founders know that four people is a finite quantity of fire — that it would run out in four centuries?** | **The richest open question in the Hearth mystery.** If they did not, **the Founders are wrong about the only thing that matters**, and every later institution inherits their error rather than merely their bill | Nothing in the game says. Ruling wanted |
| **U19** | **Did 212's lone Warden force Mere's wards, or come down her door for the unasked?** Every ward on that stair requires a quorum of four; the Convocation sent one person down **this stair, through these gates** | **Either answer is devastating and free, and the game asks neither.** It also decides what the Sealing actually *is* (`CANON.md` §12.65) | Ruling wanted |
| **U20** | **Is the Fourfold Walk meant to be chosen blind?** Configuration **A** — nobody at the table knows the price — is currently the **default** | **The most important choice in the game is currently made by four people and one Provost none of whom has been told what the option costs** | Either that is the intent — in which case "Your Sighting is spent" is **the reveal** and should be staged as one — or configuration **D** is the intent, in which case M9's U1 and U2 are **repairs, not enhancements**. §6/**E3** |

## Tier 2 — these block scenes

| # | question | note |
|---|---|---|
| **U21** | **What happened in Year 340?** The newest Law in the game, and the only one from 340, is the oath-lock Law ending "**The one you swear to cannot tell the difference**". Nothing says what happened, who was in the Chair, or why the Order suddenly legislated about deceiving the sworn-to | **The richest unexploited date in the game**, given that KNOT-vs-EMBER is the central private choice of ch4. **[PROPOSED] (b)**: the 340 Convocation wanted its Wardens to be able to *appear* bound while retaining an exit — **the 212 decision applied to people** — which makes the Order a consistent character across 128 years **and settles §6/X21 for free**. `CANON.md` §12.8 |
| **U22** | **What did Marrow mean by "And through it"?** Recovered by the memory-bell; **Wren fixates on it**; the referent is never supplied anywhere | The chapter's strongest hook, unpaid. **It is also the only evidence of Marrow's private theory of what Wren is.** `CANON.md` §12.45 |
| **U23** | **What was Marrow going to show the Convocation?** "The stone over your heads says one born of four. **Tonight I stop arguing and show you.**" Nothing is shown, in that chapter or any other | Either pay it (she shows them the **foot** of the stone and is interrupted) or cut it. Paying it converts §6/**E1** from the game's largest unacknowledged lie into a promise kept at T8. `CANON.md` §12.42 |
| **U24** | **Can the Crown take a Sighting, and what do the Cold-works do with one?** E4 registers all four and posts their holders, and never says what for | Decides whether E4's horror is *confiscation* or *conscription*. `CANON.md` §12.33 |
| **U25** | **Does Marrow answer to "Mum"?** Wren uses it four times, at least twice deliberately; **she never reacts, once, on any branch**; and E3 then calls it an accident | **Her entire belief-state about what Wren is to her hangs on it**, and §6/**X13** is a symptom |
| **U26** | **Why does the Fourfold Walk give Wren a heartbeat?** Asserted twice; explained never, by narration or by any character | The best candidate answer is U1(b)+U5(a) plus "there wasn't a *me* on the other end to tie it to" — **and nobody says it.** One line at `ch6.js:692` (§6/E7) closes this, E6 and E7 together. `CANON.md` §12.53 |
| **U27** | **What does the mason carve, and in which alphabet?** He has to ask how to spell it; nobody in the room can spell it the old way; **the Reader can and does not offer** | And the Reader's Book says the old-alphabet form is **WRENN**, a different string. `CANON.md` §12.40, §13.5 |
| **U28** | **Why was the tapestry painted over but not the bell-chamber's wall carving?** The same image is forged upstairs and stands open, uncovered, four hundred years old, in the Finale's own room | Answerable in one line — *nobody the Order could send goes down there* — **and no character delivers it.** §6/**E36**; `CANON.md` §12.50 |
| **U29** | **What word does Marrow use to force Mere's last ward** — "a word that costs her something"? | Never named. `CANON.md` §12.31 |
| **U30** | **Who is the Tower ward's sworn keeper?** The Binder's rule turns on "the keeper sworn to it", and the keeper is never identified | Compounded by the Vigil-vs-Founders contradiction (`CANON.md` §13.6). §12.52 |
| **U31** | **Why is Marrow back early, "and does not say why"?** Explicitly flagged by the game and never answered | **[PROPOSED]** the study is an examination she set, and she came back early because she could not stand in the corridor any longer. **If accepted, every withholding in this document becomes a single consistent policy.** §6/**E23**; `CANON.md` §12.44 |
| **U32** | **What is the Seer ↔ Binder "practice thread that still will not hold" for?** | One of only **two** facts about the four's shared past in the entire game, and both are **[WITHHOLDING] rather than mystery**: the player is given no evidence on which to speculate. `CANON.md` §12.62 |
| **U33** | **Is the Second Asking's silence deliberate?** Four anomalies are confirmed to Wren's face and **nothing tells the four what they add up to**; the inference is left entirely to the player | **If deliberate — and it should be — one narration line saying nobody said the obvious thing makes it deliberate on screen**, the way U5's fix works for the Prologue. §6/**E6**; `CANON.md` §12.67 |
| **U34** | **Is the cover-up's survival intentional?** On five endings out of five the Convocation, the Order and the school learn nothing; on E3 the school is actively lied to; on E0 the four cannot read the stone any more | **Coherent as tragedy and the game does not appear to intend it as one.** One deliberate sentence either way. §6/**E38**; `CANON.md` §12.30 |

## Tier 3 — smaller, still worth a ruling

| # | question | cite |
|---|---|---|
| **U35** | **What year is it?** Year 0, 212 and 340 are given; "four hundred years" is prose; **nothing dates the present.** Deciding it costs one line and puts 340, Vane's twenty-two years and Wren's fourteen on a shared ruler | `CANON.md` §12.6 |
| **U36** | **Does Marrow know she is legible to the Listener?** She knows every Master has a Sighting and assigns work by gift on sight, so she *should* know she is being read — and her heart skips twice in a room with an Ear-Sight in it | **[PROPOSED]** she knows and lets herself be read. It is the only warmth she is permitted |
| **U37** | **What does the oath actually say?** The scroll is "the words she said before she went out" and **the game never prints them.** What the four literally swore is reconstructible only as a glyph-gloss | `ch4.js:610`, `:624`; `CANON.md` §12.69 |
| **U38** | **Whose addition is the mark beside cut 1?** The ring has no first cut, so the school's mark is an **addition** to the Founders' stone, and nobody asks who made it | **[PROPOSED]** 212's, in the same hand as everything else that year. **The single cheapest line that would convert the misreading from an error into a signature** |
| **U39** | **Should the Binder's ch6 `reveal` tap be instrumented?** It is not a flag; whether the Binder taps it is recorded nowhere, and it gates the motive for the entire cover-up | **The most consequential un-instrumented choice in the game** |
| **U40** | **Is "same ink, same hand, two hundred and twelve years apart" a forgery?** The Binder's ch6 figure asserts one hand wrote a Year-0 Law and a Year-212 Law, and nothing follows it up | **[PROPOSED]** a deliberate forgery by the 212 Convocation, writing its new Law in the Founders' hand. **Free, and it makes 212 worse.** `CANON.md` §12.17 |
| **U41** | **Does the Cold Ember still work after it falls — and did it ever?** Never answered, and **never invoked at the Finale, where the fire actually goes out** | `CANON.md` §12.13, §12.54; §6/**E16**, **X23** |
| **U42** | **Why does losing the Cold Ember crack a bell on Mere's four-hundred-year-old gate?** No causal line on any surface — **the table experiences a Founder's work failing because of something they did, and nobody, including Marrow, connects the two** | `CANON.md` §12.14 |
| **U43** | **What did the party promise Oriel, exactly, and what happens when she is told?** "You promised her everything you found below. **She has come to be told.**" — the scene ends there | §6/**E28**; `CANON.md` §12.58 |
| **U44** | **Why does carving WREN make a four-hundred-year-old lamp flare *blue*** — the Cold's own palette — and the moment is never remarked on? | An excellent free plant if kept. `CANON.md` §12.47 |
| **U45** | **What does the Chair's seal mean when a fourteen-year-old non-Warden receives it?** (E3) | `CANON.md` §12.55 |
| **U46** | **Are the portraits' "four went down" the Founders or the four tonight?** Almost certainly deliberate; **worth confirming as deliberate**, because the Listener holds it and nobody ever asks | `CANON.md` §12.56 |
| **U47** | **Why do Vane's men say "the boy" while the narration says only "the child"?** Likely deliberate; nothing confirms or remarks on it | pairs with **U6**; `CANON.md` §12.57 |
| **U48** | **What legal force does the writ have**, such that a school vote overrides a royal one — and what was the Vigil convened to decide before Vane arrived? | Three questions, one missing paragraph. `CANON.md` §12.60 |
| **U49** | **Whom would Marrow have sent**, and why four fourteen-year-olds rather than adults? | `ch1.js:310`; `CANON.md` §12.43 |
| **U50** | **Why do a heartbeat pulse under every one of Mere's gates**, at 1.1 s, in a game whose central tell is a missing heartbeat? | Never referenced. `CANON.md` §12.49 |

---

# APPENDIX A — branch → knowledge index

*Which flag moves which head. Only epistemic consequences are listed; see `CANON.md` Appendix A for
world consequences.*

| flag | whose knowledge moves, and how | severity |
|---|---|---|
| **`VOTE_LOST`** | **Sorrel and Oriel are never named**, so `ORIEL`/`SORREL` and the `MARROW_LETTER` route all die; `LAW0` must then come from `LETTER_READ` or `TAPESTRY` or not at all until T8. Wren's "Seer, what is *on* that wall?" does not fire, so **Wren's ignorance of the paint is never established in Wren's own mouth**. Marrow's willingness to act outside the Convocation is *proved* in ch1 rather than inferred in ch4 | **high** |
| **`SORREL`** | The nine acquire a piece of the Cold and **nothing follows** (§6/E50). Forfeits Oriel's note. Her writ is the thing that saves the four at the Tower door | medium |
| **`ORIEL`** (the **ch1 promise**) | **Sets `LAW0` by itself, with no information transfer** (§6/E15). Unlocks `ORIEL_NOTE` — **the only evidence that the suppression is current** | **critical, and a defect** |
| **`ORIEL_NOTE`** | The cover-up becomes **ongoing** rather than historical, from an independent living witness | medium |
| **`NEITHER && !VANE_ACCEPT`** | **The only surface before T8 on which Marrow's withholding is visible as withholding** — "the thing I have never named to you". Two levels deep: the four learn *she believes the nine do not know, and intends to keep it that way* | **high**, and it is on the least-taken branch |
| **`VANE_ACCEPT`** | One seat learns the four are themselves bought. **Suppresses Marrow's letter** — taking the Crown's coin costs the party its only early sight of her concealment. Warms Vane at T9 | high, and elegant |
| **`VANE_PRETEND`** | "Wise. Or a lie. **I can use either.**" — he explicitly does not model the four's sincerity, and **nothing downstream distinguishes a pretender from an accepter in his beliefs**, which is correct and unremarked | low |
| **`CH2_NICHE`** | **A Founder acquires a name.** Without it, "Mere" first reaches the Hearth at T7 as a stranger the Provost admires — and `LETTER` cannot exist, so **F5, F6 and F9 are unreachable for the whole game** | **the most consequential branch in the document, decided by a two-option prompt with no signposting** |
| **`CH2_STRIP='right'`** | **The corrected prophecy on the Hearth, four chapters early** — and it is **written and read nowhere**, so every downstream row is identical to a table that never opened the niche. Two source comments assume it fired | **high narratively, zero mechanically** |
| **`LETTER` → `LETTER_READ`** | **Gates the entire effect-half of the price proof.** Without it, "came up grey" never exists for anybody, and **no character in the game ever learns that the Founders were changed by what they did**. With it: one seat, one phone, **one chapter late** | **critical** |
| **`TAPESTRY`** | **The count refuted in a picture, on the shared screen, with Vane vindicated.** Sets `LAW0`. **The only route to Marrow's "I scraped it myself, as a girl"** (with `OATH_KNOT` + `FOURFOLD`). Changes `ch7_wall`'s first line from an excavation to a translation | high |
| **`MEMORY`** | **V4 exists.** Without it the Crown's actual aim is never stated by anybody, on any branch, and Vane's motive at T9 is unanchored | medium |
| **`JOURNAL`** / **`GREY`** | The instrument and the love as one act; and **the cost of keeping the Hearth acquires a colour before it acquires a number** | high emotionally |
| **`SURRENDERED`** | Her cold open, "After tonight I will decide what you are", and **her heartbeat runs fast on the Listener's page in the study** — the only chapter besides ch6 where it does. **Vane is never told the four surrendered, and never uses it** | medium |
| **`DOOR`** | `FIGHT` wakes the ward **and tells the soldiers where to look**. `WORD`/`BLUFF`: **the only demonstration that Vane's word has value to his own men**. `WRIT`: the Convocation outranks the Crown on a stair | medium |
| **`OATH_KNOT`** | **Gates `ch7_argue1` entirely.** ⇒ on EMBER, `OATH 0` or `REFUSED_OATH`, **P10 is never spoken by anyone on any surface in the whole game**, and neither is Marrow's scraping. Also: the unprecedented hand on a shoulder; the Sigil rotates around her by Idony's Law | **critical** |
| **`REFUSED_OATH` / `OATH 0`** | She goes down without them; **Wren fetches them through Mere's door "for people who were not asked" — the unsworn party enacts F9 literally, and nothing anywhere says so.** Treat as **unsworn**, never *refused* | medium, and the richest free payoff in the document |
| **`STAIR='HOLD'`** | **The only branch on which the Finale's price is demonstrated before it is charged** — one seat's Sighting goes out and is handed back. Unnamed as such by anyone | **high, wasted** |
| **`STAIR='COLLAPSE'`** | **COLD is written by one hand and it works.** Pre-cracks a bell. **Actively damages the mystery** (§6/E14) | medium |
| **`HOLD_NOBODY`** | Four people each privately declined to spend a Sighting temporarily — **and then, at T9, may each choose to spend one permanently. The game never puts those two facts next to each other** | medium |
| **`EMBER_LOST`** | **Nobody's knowledge changes. A piece of the Cold is simply gone** — and it silently cracks a Founder's bell with no causal line on any surface | **the largest wasted branch in the Hearth mystery** |
| **`GATE2_COLD`** | The table learns **Marrow's Book is not Mere's Book** — the clearest statement that the present institution runs on an edited text. **The one moment before T8 where the four's knowledge exceeds the Chair's, and it lasts two lines** | high |
| **`LAW0`** | Whether COLD is placeable at the Silent Gate and in the eighth socket. **Reachable by reading Mere, by scraping paint, by finding a note, or by making a promise** | **critical** |
| **`WALK_UNLOCKED`** | Always true after ch6 in linear play. If false: **the party finishes the game inside the Order's translation**, and the price is never posed at all. `ch7.js:369`'s "**That is the reading you have**" is the best sentence about the prophecy in the Finale and is **unreachable** | **critical** |
| **`STONE_TOLD`** | **Content identical; authorship not.** The table learns *four, as one* as something they were **told**. Marrow's withholding becomes visible on screen and nobody reacts. Costs the Finale two minutes | high, half-wasted |
| **`CLUES` / `ASK_*`** | How many anomalies are **publicly confirmed by their own seat** at T8. At `CLUES = 0` the table reaches the Finale with **no anomaly stated aloud as true by anyone** — and the T9 identification lands with zero in-fiction support. **Nothing guards it** | **high** |
| **`WHISPER_*`** | Which seats lied to Wren in private. Does not change what anyone *knows*; changes what Wren knows about **who they are**. Disagrees with itself for the Binder (§6/X15) | medium |
| **`WREN_HURT`** | Rewrites every whisper prompt colder and franker, and **swaps out the Reader's T7 name beat** — on this branch the Reader loses the game's clearest statement that the chalked name is unresolved | medium |
| **`WREN_SCARED`** | Wren stops joking for all of ch4; **the absence of comedy is the only fear-report in the game.** On this branch §6/**E31** does not occur | low on knowledge, high on character |
| **`FINALE_WALL='wall'` → `VANE_ALLY`** | **Vane's twenty-two years are spoken — and he leaves the fiction.** Everything he knows exits with him and is never redistributed. Collapses the sealed word to WALK/STAY; the cost lines still render | **high** |
| **`BARGAIN_<r>`='kept' ×2** | **Two children's private words outrank the table's public one** and force ENDING 4 regardless of `DECISION`. A player can **intend to pay and not pay**, and only the Epilogue tells them | high |
| **`ENDING`** | **The single largest branch fact for the Wren mystery**: "It's me" and Wren's name in the socket are reachable on **one of five endings**. And the Law 0 card: **WRITTEN** (0) / RESTORED (1–3) / **STRUCK, AGAIN** (4) | **critical** |
| **`WREN_TRUST`** | **No epistemic effect anywhere.** Buys two words on one ending. *The single cheapest addition this document could ask for is a `MARROW_TRUST` counter* | none |

---

# APPENDIX B — the partition, as one table

*The rule that makes every asymmetry in this document enforceable.* "Four things, four people, and
**nobody has two**" (`ch2.js:251` and four other sites). The only workaround is forbidden by the house
rule — "**Say what you see. Never show your phone.**" (`lore.js:74`) — reprinted above every SPEAK page
and **deliberately absent exactly once, in ch8** (`ch8.js:60`).

| | Reader | Listener | Seer | Binder |
|---|---|---|---|---|
| **can perceive** | the Founders' Tongue; faded inscriptions clean; the lexicon; from ch4 an older alphabet | intervals, steps, patrol boots by landmark, murmurs, **every heartbeat except one** | where an inscription begins and whether it is turned; hidden doors; what paint covers; sockets under rebuilt stone; **which way every shadow falls** | threads — **grey grief, gold Crown, red oath** — and keeps the Book of Laws |
| **cannot** | read a word's meaning without the Seer saying where the line starts | hear a word's **name** — only intervals | say what a cut **obliges** | read a shape, hear a note, or see under a floor |
| **carries, alone, all night** | the chalked door; then **WRENN**; then *(branch)* **Mere's sheet — the only Founder-voice document in the game** | the missing heartbeat; **the Envoy's fast heart**; **the Provost's skipped heart**; the portraits' "four went down" | the shadow; the shape under the paint; the derangement; the uncovered wall | **struck Law 0, from the Prologue**; Wren's absent thread; the grey thread; Vane's gold; Bess's oath; the porter's coin; *(T8)* **the crime of 212** |
| **the fourth state nobody tabled** | — | COLD has **no step and no pitch** — the Cold and Wren are the same silence, and **no surface joins them** | — | **"No thread — unbound; or, once, '*not unbound: the knot itself*'"** — the one Thread-Sight case the plot turns on, **missing from the world table** and ungated in the Book |

**The governing rule of the art enforces the partition physically: the Hearth screen may never draw a
fact that lives on one player's phone.** Every "worn past reading" carving in the game exists to obey
it. Its exemptions are four heraldic CROWNs, Marrow's own chalk mark on her own working, ch6's four
**unburnt** cuts, ch7's architectural COLD — and **one reveal: the tapestry's fourth hand, in cold
blue.** *The picture is the answer, and it is the only time the shared screen is allowed to carry one.*

**Consequence, and it is canon: CROWN is the only legible mark in the upper world.** The one device the
school lets you read is the Chair's — which is a statement about who owns the Order's reading.

---

*End of `EPISTEMICS.md`. Ground truth: `CANON.md`. The reader's head: `PLAYER-MODEL.md`.
Source files stitched: `epistemics-cold.md`, `epistemics-hearth.md`, `epistemics-wren.md`,
`epistemics-marrow.md`, `epistemics-vane.md`, `epistemics-prophecy.md`, `epistemics-founders.md`,
`epistemics-year212.md`, `epistemics-sightings.md`, `personae-principals.md`, `personae-table.md`.*
