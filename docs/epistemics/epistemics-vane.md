# EPISTEMICS — **Vane and the Crown**

> ## ⚠ TOTAL SPOILERS
> Working document for the author. Contains every reveal, all five endings, and the answer to what the
> Crown's Envoy is actually doing at Thornhallow. Do not show a player or a host.

**Scope.** One mystery, in three questions the game asks in this order and answers in the reverse order:

1. **What did he see under the paint?** — asked T3, answered T6, ratified on the shared screen.
2. **Who else benefits?** — asked T3 (two bought seats), widened T5 (a bought porter, bought patrols,
   and on one branch a bought *party*), never closed.
3. **What does he want?** — asked T3, answered *institutionally* at T6 on one phone
   (`companion/ch4.js:213`), answered *personally* at T9 on one branch (`ch7.js:341-342`), and
   **never answered at all** as to why the Crown wants **Wren** rather than the Cold (§12.32).

Ground truth lives in `CANON.md` §3.5, §9.3, §9.7, §11, App. A. This document is **belief only**:
who knows it, who half-knows it, who is wrong, what each thinks the others know, and what each is
not saying. Truth appears here only as the yardstick a belief is measured against.

Companions: `CANON.md` (what is true), `PLAYER-MODEL.md` (what the reader is led to think),
`epistemics-year212.md` (the cover-up Vane is a casualty of).

---

## 0. THE MYSTERY, DECOMPOSED

Every cell below refers to these by number. They are separable — most characters hold two or three
and none holds all of them, **including Vane**.

| # | proposition | ground truth | where it is knowable in-game |
|---|---|---|---|
| **V1** | There is older paint under the school's tapestry, and **Vane is right about what it shows**: four walk in, the fourth carries COLD, the second reaches back, no child | `ch4.js:557` ("So he had."); art `js/art/scenes-ch4.js:47-62` | Hearth T6, branch `TAPESTRY` only; Seer's plate `companion/ch4.js:104-113` |
| **V2** | He saw it **twenty-two years ago**, told the Convocation in the Great Hall, and was **sent away** for it | `ch7.js:341` | Hearth T9, branch `FINALE_WALL='wall'` **only**. One utterance in the whole game |
| **V3** | His stated ask is custody: "the child, tonight, for **safekeeping**", on a writ with a saucer-sized seal | `ch1.js:135-136` | Hearth T3, unconditional |
| **V4** | The Crown's actual aim: "**The Crown will have the Cold open, one way or another.**" | `companion/ch4.js:213` | **Listener's phone only**, T6, opt-in corner, 3 tries, can be shut for the night |
| **V5** | **Why the Crown wants Wren specifically** rather than the Cold | **never stated anywhere** (§12.32) | nowhere |
| **V6** | His price to the four: Wren lives, and the Crown makes **all four of them Masters** | `ch1.js:282` | Hearth T3, unconditional |
| **V7** | He delivers **exactly** what he promised, on E4 — "as promised", "Masters, as promised", Sightings registered, posted to the Cold-works | `ch8.js:355-356`; `companion/ch8.js:207-208` | T10, `ENDING 4` only |
| **V8** | He has **bought seats 5 and 8** with Crown-struck coin and **blocked seat 6** with a soldier | `companion/ch1.js:125-127` | Seer's phone, T3 |
| **V9** | He has **bought the porter** ("new Crown gold, straight to the Envoy… paid to shout") and **both patrols** ("coin, and nothing more than that") | `companion/ch3.js:239-240` | Binder's phone, T5 |
| **V10** | His writ is the **Crown's**; a Convocation writ is weaker but his captain will not fight it | `ch3.js:404` | Hearth T5, branch `SORREL` only |
| **V11** | His stopping condition is **personal, not political**: "My offer is withdrawn. **I will not be the thing you have to be brave about.**" | `ch7.js:342` | Hearth T9, `FINALE_WALL='wall'` only |
| **V12** | He knows **which seat can confirm him** and names the gift unprompted: "Ask your **Seer** what is under the paint." | `ch1.js:283` | Hearth T3, unconditional |
| **V13** | He knows each of the four **by their real first name** | `companion/ch7.js:182` (`ctx.name`) | each player's own phone, T9, `!VANE_ALLY` |
| **V14** | He is drawn at T9 with a **red** mark inward (toward Marrow and Wren) and a **gold** mark outward (toward his guards). Red = an oath; gold = the Crown's coin or favour | art `js/art/scenes-ch7.js:83`; `lore.js:9`; `companion/book.js:131` | **nowhere** — no phone reads Vane in ch7. See §13.G |
| **V15** | His wax seal is `#8a2f2f` — **exactly Redmoor's House colour**, and Redmoor (seat 6) is the one seat his own soldier blocks | art `scenes-ch1.js:117` vs `:14` | **nowhere** — art only |
| **V16** | **His gold thread runs to Wren**, all night, and can be used to locate Wren through stone | `companion/ch2.js:169` | Binder's phone, T4 |
| **V17** | **His is the only fast heart in the Great Hall** | `companion/ch1.js:116-117` | Listener's phone, T3 |
| **V18** | He prices refusal rather than punishing it ("Then I will ask again later, **when it costs more**"), and a lie is as usable to him as a yes ("Wise. Or a lie. **I can use either**") | `ch1.js:289`, `:291` | Hearth T3, per-option |
| **V19** | On `VANE_ACCEPT`, **the four are themselves bought**: "Three people are awake between the Gallery and the Tower. Two of them are paid. **So, since the Hall, are you.**" | `companion/ch3.js:236` | Binder's phone, T5, branch |
| **V20** | He promised each of them secrecy — "**The others need never know who opened the door**" — and then asks each accepter **in front of everyone** | `companion/ch7.js:182` vs `ch7.js:493`, `:496` | both, T9, `!VANE_ALLY` |
| **V21** | On the **win** branch he bows to the vote and **then puts soldiers through the school, room by room, writ in one hand** | `ch1.js:231` vs `ch3.js:439` | Hearth T3 → T5 |
| **V22** | **What he does after standing down** — never shown. `VANE_ALLY` deletes him from the fiction while his soldiers are still on the stair | §12.32; `ch7.js:332` | nowhere |

### The three asymmetries that matter

- **V1/V2 are a monopoly he does not have.** Vane believes his knowledge of the paint is unique and
  therefore leverage. It is shared by **Marrow**, who scraped the same paint as a girl (`ch7.js:394`);
  by **Oriel**, who took a bread-knife to it as a girl and watched them repaint it inside the week
  (`ch4.js:588`); and it stands **uncovered** on the bell-chamber's own wall, four hundred years old
  (`ch7.js:303`; art `scenes-ch7.js:55-60`). He is right about the picture and wrong about the market.
- **V4 vs V3.** What he asks for (a child, for safekeeping) and what his principal wants (the Cold,
  open) are different objects, and **only the Listener ever hears the second**, on an opt-in corner
  that can be spent to nothing.
- **V17 vs everything he says.** The only person in the Great Hall who knows the Envoy is frightened
  is a fourteen-year-old with a phone, and no scene in the game ever asks them to say so.

### Cast with a stake, and notation

W = Wren · M = Provost Marrow · V = Lord Vane · R/L/S/B = Reader/Listener/Seer/Binder ·
O = Master Oriel (seat 7) · Sr = Master Sorrel (seat 1) · Cpt = Vane's captain · Prt = the porter ·
Bess = the laundress · C = the Convocation as a body · Cr = the Crown (offstage, never speaks).

`V→M` = what Vane believes about Marrow. `V→M→V` = what Vane believes Marrow believes about Vane.
Cells marked **[PROPOSED]** are inference; everything else carries a citation.

---

## T0 — before play

*The state of the world when the game opens. Vane is on the road with a writ; the coin is already
placed.*

| | **Knows** | **Believes (confidence)** | **Wrong about** | **Believes about others** | **Withholding** | **Would say if asked** | **Changed** |
|---|---|---|---|---|---|---|---|
| **Vane** | **V1** — and has for twenty-two years (`ch7.js:341`). **V2**, as autobiography. **V3** — he carries the writ (`ch1.js:135`). **V4** — his instructions, which he will state to Marrow's face in her own study (`companion/ch4.js:213`). **V8**, **V9** — he placed the coin himself: two cushions, a sleeve, a lodge, two patrols. **V12** — he knows Thornhallow's seat-and-gift structure well enough to name Under-Sight unprompted. **V13** — he holds four children's **real first names** (`companion/ch7.js:182`) | That the paint is a **lever on Marrow personally**, not on the Hall — which is why he will lower his voice and use her given name (`ch1.js:137-138`). High. That the school will fold to a purchased vote; high, and he has bought or blocked three seats to make it so. That **asking** will work where taking would not — evidenced by never once trying to take (§14.10). High | **That his knowledge of the paint is rare.** Marrow scraped it (`ch7.js:394`), Oriel scraped it (`ch4.js:588`), the Order repaints it as maintenance (`ch4.js:588`), and the same image is **uncovered** on the bell-chamber wall (`ch7.js:303`). **[PROPOSED]** That the Hall's ignorance at T3 is real rather than institutional — he told this Hall himself, twenty-two years ago | V→M: *she knows what is under the paint, and it costs her more to have it said than it costs me to say it.* V→M→V: *she knows I know, and she knows I will spend it in front of the nine.* V→C: *they buried it once; they will buy their way out of it again* — and he is right, he has the receipts. **V→O is null**: he has no model whatever of seat 7, the one Master alive who saw what he saw. **V→W: an object.** He never uses Wren's name, on any branch | **V2** — the grievance. Reason: **protecting himself**; a grievance is a weakness in an envoy, and a man with a motive is not a man with a writ. **V4** — the Crown's actual aim; reason: **protecting the offer**, since "safekeeping" is negotiable and "we will open the Cold" is not. **V5** — whether he even knows why the Crown wants Wren is never established | "His Majesty asks one small thing." | — |
| **Marrow** | **V1** — she scraped the same paint as a girl (`ch7.js:394`). **V4** — he said it to her face and she answered it: "Then the Crown will go through me. **And through it.**" (`companion/ch4.js:213`) — the memory-bell keeps "the last thing said near it" (`ch4.js:507`), so this conversation happened **in her study**, undated | That Vane will spend the paint in public and does not care what it costs her. High. That the nine would rather have a mistranslation than a bill — the reason she has never named the thing below to them (`ch4.js:592`) | **Nothing in this mystery that the game establishes.** [PROPOSED] She is wrong that the lever is only hers to lose: the Hall's other scraper is sitting in seat 7 | M→V: *he knows, he will say it, and he wants something that is not the child.* M→V→M: *he thinks I will fold in front of my own Convocation.* M→C: they must not hear it tonight. M→the four: children, who do not know there is a paint question at all | From the four: **everything** about Vane's lever. She never, on any branch, tells them what he meant. Reason: **protecting the plan** — she needs a vote more than she needs the truth in that hour | "The Crown will go through me." | — |
| **Wren** | Nothing of V1–V22. Does not know there is a paint question | — | — | — | — | "Who?" | — |
| **Reader** | Nothing | — | — | — | The chalked name (a different mystery) | "I read carvings. Nobody's ever asked me to read a wall." | — |
| **Listener** | Nothing | — | — | — | The missing heartbeat | "I hear hearts. I've never met an envoy." | — |
| **Seer** | Nothing | — | — | — | Wren's shadow | "I see under things. Nobody asks." | — |
| **Binder** | Nothing. Holds no Book yet (`lore.js` Law 0 is `learned:'ch0'`) | — | — | — | The blind spot | "Who's bound to whom? Nobody I've been asked about." | — |
| **Oriel** (7) | **V1, first-hand**, and that it is **actively maintained**: "They painted it back inside the week" (`ch4.js:588`) | [PROPOSED] That the maintainer is the school's own authority; she writes "**they**" and never names them | [PROPOSED] Does not know **V2** — that a man was exiled for saying aloud what she scraped. Nothing connects them | O→C: they repainted it, or protect whoever did. **O→V: null at T0** — she has not met him | The whole of it, for decades, until she writes four lines under a cushion. Reason: **protecting herself** | "I know what that picture is. I have known since I was a girl and it changed nothing." | — |
| **Sorrel** (1) | Nothing of V1–V22. Wants the Ember for the nine, not the Chair (`ch1.js:255`) | — | — | Sr→M: the Chair will send couriers below and the Ember must not come to her | — | "I care what comes up out of that vault. I do not care who is at the door." | — |
| **Vey (5), Tarn (8)** | That they have been **paid**, and by whom | That a coin under a cushion is deniable | — | → each other: nothing modelled | Their purchase, from the Convocation. Reason: **protecting themselves** | *(neither is given a line in the game)* | — |
| **Orrin (6)** | **Nothing asserted.** He never speaks. A soldier stands behind his chair (`companion/ch1.js:127`) | — | — | — | — | *(never speaks)* | — |
| **Cpt** | The offer **word for word** — "The captain heard his master make it, and **cannot know how you answered**" (`ch3.js:393`). His standing order: let them go about it however they choose (`ch3.js:399`) | That he is not a cruel man but a punctual one (`ch3.js:544`) — and the narration ratifies it: "He will be punctual later" (`ch3.js:621`) | — | Cpt→V: *my master makes offers and expects them honoured; I enforce a schedule, not an appetite* | — | "I am not a cruel man. I am a punctual one." | — |
| **Prt** | That new Crown gold buys four rooms and that he is **paid to shout** (`companion/ch3.js:239`) | — | — | — | Everything, from everyone. Reason: **protecting himself** | *(one line all night: "Here! The boy!" — `ch3.js:204`)* | — |
| **C / Cr** | C: the 212 cover-up as institutional habit, unremarked. Cr: **offstage all game; never speaks; every statement of its aims is Vane quoting it** | — | — | — | — | — | — |

**[WITHHOLDING] at T0.** The player has nothing on Vane at all. That is correct — he has not arrived.
But note what the world already contains and never surfaces: a wax seal in one House's exact colour
(`scenes-ch1.js:117` vs `:14`), a bought porter (`companion/ch3.js:239`), and an envoy who knows four
children's given names. Every one of these is placed before T1 and none is ever read by a character.

---

## T1 — ch0 cold open + prophecy stone

*The Hearth, four hundred years, the night it guttered, the baby, the prophecy in the Order's translation.*

Vane is not present and is not named. **Nothing in the Vane mystery moves.** What moves is the thing
his one line at T3 will contradict.

| | **Knows** | **Believes** | **Wrong about** | **Believes about others** | **Withholding** | **Would say if asked** | **Changed at this point** |
|---|---|---|---|---|---|---|---|
| **R / L / S / B** | The Order's reading of the stone, as *the school's translation*, and that every adult argues about it (`ch0.js:62`) | That the argument is scholarly | That the translation is a scholarly error rather than an institutional one | → each other: nobody has noticed anything | — | "One born of four. That's the sentence over the fire." | **Acquired the sentence Vane's paint refutes** — and no link is drawn for six chapters |
| **Binder** | Additionally: **Law 0, struck, with its note "struck by the Convocation, 212"** (`lore.js:57`; rendered `companion/book.js:123-128`) | That a struck Law is dead administration | Treats `struck` as housekeeping | — | The Book, by default — nothing asks for it aloud | "Law 0's struck. Two-twelve. Nobody's asked." | Holds, from the Prologue, the **legislative residue of the body that exiled Vane** — the game never joins the two |
| **W / M / V / O / Sr / Cpt / Prt** | Unchanged | — | — | — | — | — | Not present |

**[WITHHOLDING] at T1.** The Order's reading is delivered as "the school's translation"; the word
*Order* is never spoken, only captioned in art (`js/art/scenes-ch0.js:78`). The player is therefore
given **no institution to suspect** before Vane arrives, which means his T3 accusation lands as
personal spite rather than as a second witness. Cheapest fix: one line in ch0 establishing that the
translation has a name and a date.

---

## T2 — ch0 lamp lit → the four speak

*The lamp lights the old way; the four each name aloud the anomaly they have privately carried.*

Vane is absent. One thing moves that his T3 dare will depend on.

| | **Knows** | **Believes** | **Wrong about** | **Believes about others** | **Withholding** | **Would say if asked** | **Changed at this point** |
|---|---|---|---|---|---|---|---|
| **the four** (as a body) | That the other three have each concealed something for years, and that saying the private thing aloud is what makes four hands work (`ch0.js:217-218`, `:88`) | That their gifts are complementary and not competitive | — | Each now knows the other three also held a private observation | Nothing further, among themselves | "Four hands. Say what you see." | **The precedent is set.** When Vane says "Ask your Seer" at T3, the table already has a protocol for the Seer answering. This is the only T2 content the Vane mystery uses |
| **Seer** | Additionally: that saying the shadow out loud did not cost anything | — | Still "a trick of the light" (`companion/ch0.js:124`) | S→the other three: they will believe me now | — | "I look under things. It usually turns out to be dust." | Becomes, at T3, the seat an Envoy will name in front of nine Masters |
| **Wren** | That all four concealed an anomaly — "**I've known for years**" (`ch0.js:226`) | — | — | W→the four: openly now | — | "You all noticed. It isn't your fault." | No Vane content. §12.21 stands: nobody asks how Wren knows one-seat facts |
| **all others** | Unchanged | — | — | — | — | — | Not present |

---

## T3 — ch1

*Vane's writ; "I have seen what is under the paint"; the vote; Marrow watches Wren, not the fire;
the two prices; the Envoy's offer in the passage.*

**This is where the mystery is created, and it is created three times in one chapter: a public threat
to Marrow (`:138`), a public dare to the Seer (`:283`), and a private purchase offered to all four
(`:282`).**

| | **Knows** | **Believes (confidence)** | **Wrong about** | **Believes about others** | **Withholding** | **Would say if asked** | **Changed at this point** |
|---|---|---|---|---|---|---|---|
| **Vane** | Unchanged from T0, plus: how the vote went, and **which of the four took his offer** — or claimed to. On `VANE_PRETEND` he explicitly does not care: "Wise. Or a lie. **I can use either.**" (`ch1.js:291`) | That the Seer will look, and that whatever the Seer finds helps him — he does not need the four on his side, he needs the wall to be true. High. That refusal is a price, not a defeat: "Then I will ask again later, **when it costs more**" (`ch1.js:289`). On `VOTE_LOST`: **that Marrow will have Wren back by morning anyway** (`ch1.js:280`) — he wins the vote and immediately tells the four the win will not hold (§13.D) | **That the lever is proprietary** (see §0). **[PROPOSED]** That the four are purchasable in the way seats 5 and 8 were — the one moment he flinches is when one of them says yes: "For a moment he looks like **a man handed something heavier than he asked for**" (`ch1.js:293`) | V→M: *the lever landed; her face did what the room did not* — and the narration agrees, "Nobody knows what that means. **Her face does.**" (`ch1.js:139`). V→S: *that seat can settle it, and it will not be able to resist looking.* V→the four: *children with prices.* V→C: *five of them are already mine or unreachable.* **V→W: still an object** — "the boy", "one child", never a name. **V→O: still null**, in a hall where seat 7 is watching him | **V2** and **V4**, from everyone. Reason for V2: **protecting himself.** Reason for V4: **protecting the offer.** Also **whom he has bought** — he never says it, and it is the Seer who finds the coin | "You think I am the villain of tonight. **Ask your Seer what is under the paint.**" | Converted a private twenty-two-year-old fact into a **public unknown**, twice, in two registers, and paid nothing for it |
| **Marrow** | Unchanged. Now also: that the lever has been used **in front of the nine**, with her given name attached | That the Hall must not be handed the argument tonight [PROPOSED] — she answers a royal writ with a procedure and never once addresses the paint | — | M→V: *he will spend everything and does not care what it costs.* M→V→M: *he thinks I will fold here.* M→C: *they would take a mistranslation over a bill.* M→the four: *children who now have a question they did not have an hour ago, and I am not going to answer it* | **What Vane meant.** From the four, from Wren, from the nine, on every branch, for the rest of the game. Reason: **protecting the plan** — and this is the single largest withhold in the mystery | "This school does not hand its children to a writ. It hands them to a vote." | She becomes the only person in the hall who could translate Vane's threat and does not. Her heart **skips twice** while she looks at Wren, not the fire (`companion/ch1.js:118`) — one phone sees it |
| **Wren** | That a Crown Envoy thinks something on a wall is worth a writ. **That is the whole of it** | That the Seer can answer it | **That the four know what Vane meant.** They do not | W→S: *you see under things, so look.* W→M: *her face did something.* W→the four: *you will find out and tell me* | Nothing here | "**Seer, what is *on* that wall?**" (`ch1.js:306`) | **Wren asks, out loud, and is not answered — in the game or afterwards.** Wren's ignorance of V1 is established in Wren's own mouth and is still true at T6 (`ch4.js:557`: "Where is the one born of four? **Where am I?**") |
| **Reader** | That the Envoy said *under the paint* out loud, and that the tapestry might have **words** beneath it: "You have never thought of the tapestry as something with words underneath" (`companion/ch1.js:101`). That two Houses filed KEEP before the doors shut | That the paint question is a reading problem — i.e. **hers** | That it is a reading problem. It is a *seeing* problem, and the Seer's; the Reader never gets the tapestry corner | R→S: *that is yours.* R→M: *she was watching Wren while everyone watched the fire* (`companion/ch1.js:102`) | — | "He said *under the paint*. There might be words under it. That is not my wall." | First contact with V1, as a **noun phrase with no referent** |
| **Listener** | **V17** — "Nine Masters, steady. **The Envoy, fast.**" (`companion/ch1.js:116-117`). And Marrow's heart skipped twice, looking at Wren | [PROPOSED] That a fast heart in a man with soldiers behind him means something, and no page says what | — | L→V: *he is frightened, and I am the only one who knows.* L→the other three: *they cannot hear this* | **The fast heart.** Reason: **assuming it is already known / trivial** — the page states it flatly and never asks the Listener to say it aloud. This is the mystery's most wasted card | "His heart is going like a bird's. Nobody else's is." | **Acquires the one piece of evidence in the game that Vane is afraid,** and is never given a scene in which to spend it |
| **Seer** | **V8** — "Seat 5: a Crown-struck coin under the cushion. Seat 8: the same coin, in the sleeve. Seat 6: a soldier in the Envoy's grey" (`companion/ch1.js:125-127`). And that under the tapestry there **is** older paint: "You can see *that* there is a shape under it. **Not what.** The Envoy was looking at that wall when he said it" (`companion/ch1.js:132`) | That Vane wants the Seer to look, which is both a reason to look and a reason not to | — | S→V: *he named my gift in front of nine Masters; he knows what this school's seats do.* S→the four: *this is mine to answer and I cannot answer it yet* | Nothing deliberately — **the Seer physically cannot answer.** The gift returns "there is a shape" and stops. This is *the* clean case of a withhold that is not a withhold | "There's something under it. I can't tell you what. He knew I'd be able to tell you that much." | **Recruited into the mystery by its antagonist,** handed a question the gift cannot close for three more chapters |
| **Binder** | That there are exactly **two red threads among the nine**, and that Vane is **not one of the nine** (`companion/ch1.js:139-142`) | — | — | B→the nine: *nobody else in the nine is tied to anybody* — a claim scoped to the nine, which quietly excludes the man who just walked in | **Vane himself.** The Binder's ch1 page never looks at him. Reason: **the page does not offer it** — [WITHHOLDING], see §14.6 | "Two threads in the whole hall, and neither of them is his. Nobody asked me to look at him." | Acquires the vote's thread map; **acquires nothing about Vane**, in the one chapter where Vane is on stage and stationary |
| **Oriel** (7) | Unchanged (V1, first-hand, + maintenance) | [PROPOSED] That Vane is telling the truth, and has been ignored exactly as she was | — | O→V: *he knows what I know.* **O→the Hall: they are all pretending.** O→the four: *these are the couriers who will go below, so they are the ones to price* | Everything. Her price is shaped exactly like a scraper's: "Tell me what you find down there. **All of it.** … **Even the parts you don't like.**" (`ch1.js:256`, `:266`) | "Tonight — keep. And tell me everything you find down there." | Her price is set by V1 and **nobody in the fiction, including Vane, notices** |
| **Sorrel** (1) | That there is a Crown Envoy in the room and a vote to be leveraged | — | — | Sr→M: *she will send couriers below tonight* (`ch1.js:255`) — see §13.26 in `CANON.md` | — | "I care what comes up out of that vault." | No Vane movement |
| **Cpt** | Additionally: **which faces to know** — "Before dawn. **My captain will know your faces**" (`ch1.js:293`, `VANE_ACCEPT` only) | — | — | Cpt→the four: *these four gave my master their word* | — | "I know your faces now." | Acquires the four as a target set, on one branch |
| **Vey / Tarn / Orrin** | Vey and Tarn: that they voted as paid. Orrin: nothing asserted | — | — | — | Their purchase | *(no lines)* | Voted. None of the three is ever named to the player |
| **Prt / Bess / C / Cr** | Unchanged | — | — | — | — | — | Not present |

**Flags set here that the mystery runs on:** `VOTE_LOST`, `VANE_ACCEPT` / `VANE_PRETEND` / neither,
`SORREL` / `ORIEL` / `NEITHER`, `CH1_APPROACHED`.

**[UNEARNED] risk opened here.** Vane's whole later collapse rests on V2, and at T3 the game plants
**nothing** that points at a personal history: not in the Reader's roll, not in the Binder's threads,
not in the Gallery (which the game will fill with ~200 painted Masters two chapters later). The one
plant that *does* exist — V17, the fast heart — is on a phone with no prompt to say it. Cheapest
repair: make the Listener's line specific. *"His heart went fast on one word, and the word was
paint."*

---

## T4 — ch2

*The Founders' Door; the Vault; the Cold Ember; the bricked road and 212; (optional) Mere's niche.*

Vane is offstage for the whole chapter and present in exactly two sentences — one of them the single
most mechanically interesting thing any phone says about him.

| | **Knows** | **Believes** | **Wrong about** | **Believes about others** | **Withholding** | **Would say if asked** | **Changed at this point** |
|---|---|---|---|---|---|---|---|
| **Binder** | **V16** — "**Vane's gold still runs to Wren, so he has not left the school.**" On `VOTE_LOST`: "…and **it no longer runs towards the dais**" (`companion/ch2.js:169`) | That a gold thread is coin or favour and this one is aimed (`companion/book.js:131`) | — | B→V: *he is still here and still aimed at the same person.* B→the other three: *none of them can check this* | **The whole of V16.** No scene asks for it; the page is the Wren tab, not the Sight tab, so it is not part of any puzzle. Reason: **assuming it is already known** — the page treats it as background | "His gold still runs to Wren. He hasn't gone anywhere." | **Acquires a live tracker on the antagonist** — direction and persistence, through stone — and is never once asked to use it. See §16 |
| **Seer** | Unchanged on V8; now also that the vault "was rebuilt once, and **the rebuilding was not honest**" (Marrow, `ch2.js:189`) and can see the derangement herself | That the school lies about its own stonework | — | S→M: *she told us the rebuild was dishonest and did not say who did it* | — | "Somebody moved four statues off their own holes and did not say why." | Learns that **institutional overpainting is a habit** — the closest the game comes to corroborating Vane before T6, and nobody connects them |
| **Reader / Listener** | Nothing of Vane | — | — | — | — | "He isn't down here." | — |
| **Wren** | Unchanged. On `WREN_HURT`, has taken a fall and an arm for the box (`ch2.js:372`) | — | Still believes the four know what Vane meant | — | — | "Nobody has told me what is on that wall." | — |
| **Marrow** | Unchanged. On `VOTE_LOST` she has retrieved, or is about to retrieve, Wren personally | — | — | M→Cpt: he will come for what the vote gave him — and he does (`ch2.js:398`) | Still withholding V1's meaning from everyone | "The Ember." | On `VOTE_LOST` she physically puts herself between the captain and the child (`ch2.js:398`) |
| **Vane** | Unchanged | On `VOTE_LOST`, that the child will be back with the Provost by morning — **and he is right** (`ch3.js:438`) | — | V→M: *she will not let the vote stand, and I do not need her to* | — | *(offstage)* | **Nothing.** He wins or loses a vote and his position does not change either way — which is itself the clue that custody was never the object |
| **Cpt** | On `VOTE_LOST`: that the vote gave him the child, and that the Provost is in the way | — | — | — | — | "I have come for what the vote gave me." | Appears, is blocked, withdraws. No line |
| **O / Sr** | On `SORREL`: her guards take the Ember at the top of the stair (`ch2.js:383`). On `ORIEL`: she "has come to be told" (`ch2.js:390`) | — | — | — | — | "Tell me what you found." | Neither price touches Vane; both are about the school |
| **all others** | Unchanged | — | — | — | — | — | — |

---

## T5 — ch3

*The corridors; the laundry; Wren's four whispered questions and the four private answers; the Tower door.*

**This is the chapter in which "who else benefits" is answered in full, and it is answered entirely on
one phone.**

| | **Knows** | **Believes** | **Wrong about** | **Believes about others** | **Withholding** | **Would say if asked** | **Changed at this point** |
|---|---|---|---|---|---|---|---|
| **Binder** | **V9, complete**: "**The porter…** New Crown gold, **straight to the Envoy. He is paid to shout.**" / "**Both patrols.** The captain's men, and nothing more than that." And **whose gold buys which rooms**: B5, C5, D5, C4 (`companion/ch3.js:239-241`). Contrast: Bess is an **oath**, thirty years, to the Provost (`:238`). On `VANE_ACCEPT`, **V19**: "**So, since the Hall, are you.**" (`:236`) | That the Crown's money is a map, and the map is the puzzle | — | B→Prt: *he is bought, not sworn — he will shout and stop.* B→Cpt's men: *coin, and nothing more than that.* B→the other three (on `VANE_ACCEPT`): **the Binder alone is told the party is bought, and the page does not say whether the other three were told the same** — in fact each accepter's own phone is silent about it; only the Binder's page prices it | **V19** by construction: it is one clause on one seat's Sight tab, in a puzzle briefing. Reason: **not having words for it** / the page moves straight on to room numbers | "Two of the three people awake down here are the Envoy's. And — yes. So are we." | **The Crown's purchase becomes geography.** The four now navigate a building Vane has bought. Nothing in the chapter says so out loud |
| **Seer** | The rooms and the rounds; where the lodge is **not** drawn (deliberately removed from the Seer's map, `companion/ch3.js:56-58`) | — | — | S→B: *you have the money, I have the floor* | — | "I can show you where they walk. Not who pays them." | The one gift that could have found the coin is deliberately denied the lodge |
| **Listener** | Patrol boots by landmark; the portraits muttering "**four went down**" (`ch3.js:440`) | That the portraits are afraid | That "four went down" is about the Founders *or* about tonight — never disambiguated (§12.56) | — | — | "The paintings are talking. They keep saying *four went down*." | Acquires the fourth independent corroboration of V1 and does not know it is one |
| **Reader** | Words over hidden doors | — | — | — | — | "The doors have words on them. That is all I have." | — |
| **Wren** | That the school is being searched room by room on a writ (`ch3.js:439`). Asks **four private questions and none of them is about Vane** (`companion/ch3.js:284-297`) | That the four will tell the truth or will not, and either way Wren will know | Still believes the four know V1 | W→each of the four: *I will find out which of you lies, and I will thank you anyway* | Wren's own wish to be saved (a different mystery) | "He bowed to the vote and then sent men through the school. That is a *kind* of promise." **[PROPOSED — Wren is never given this line]** | Nothing of Vane moves for Wren. **The four questions are the chapter's private channel and not one of them touches the man hunting Wren** |
| **Marrow** | That Vane's men cannot pass the Tower ward (`ch3.js:444`); rings the bells, douses every lamp herself | That twelve turns is all she can buy | **That the ward is "older than the school"** — the Binder's page says it is a **Vigil** ward, i.e. the school's own (§13.6 in `CANON.md`) | M→V: *he will search until he is stopped by something he cannot buy* | Still V1's meaning | "Vane's men cannot pass it. Get Wren there before the third bell." | She names Vane as an active hunter, out loud, to the four — the first time she acknowledges him to them at all |
| **Cpt** | **The offer word for word**, and that he "**cannot know how you answered**" (`ch3.js:393`). His orders on `VANE_ACCEPT`: "The Envoy said you had given your word, and that I was **to let you go about it however you chose**" (`ch3.js:399`). That a Convocation writ outranks his remit: "**I was not sent to start a war on a stair**" (`ch3.js:404`) | That he is punctual, not cruel (`ch3.js:544`) | **[CONTRADICTION-adjacent]** Either he believes the rope is real, or he is lying on instruction. On every branch "**the rope came off the beam an hour ago**" (`ch3.js:635`, `:644-645`). §14.8 | Cpt→V: *my master's word binds me; his offers are real.* Cpt→the four: *I cannot tell which of you took it, so I must treat the claim as good* | Whether the hanging was ever ordered. Reason: **protecting his master** or **protecting himself** — the game does not say which, and this is the mystery's sharpest unresolved cell | "Hand over the boy, or the Provost hangs." | Makes, on his master's authority, **the one threat in the game that the game then quietly retracts** |
| **Prt** | That he is paid to shout, and shouts | — | — | — | — | "Here! The boy!" | Spends his entire purchase in one line |
| **Bess** | That nobody searches her room (`companion/ch3.js:238`) | — | — | — | Everything, by not looking up (`ch3.js:500`) | *(never speaks)* | The one un-bought loyalty in the chapter, and it is an oath, not coin |
| **Vane** | Unchanged, plus: that his captain has been turned back (on `FIGHT`/`WRIT`/`WORD`/`BLUFF`) or has the child (on `SURRENDERED`, briefly) | That a punctual man will get another chance | — | V→M: *she is buying hours with bells* | **V2, V4** still | *(offstage all chapter)* | On `VANE_ACCEPT` his word is **spent as a key** (`ch3.js:551`) — his credit works on his own men, which is the strongest evidence in the game that his promises are real |
| **O / Sr / C / Cr** | Unchanged | — | — | — | — | — | — |

**Branch note.** `SORREL` produces the chapter's one direct collision of authorities — a Convocation
writ against a Crown writ — and the Crown's man backs down (`ch3.js:404`). **Nobody ever reflects on
the fact that the Crown's writ lost to a school's.** It is the only test of V3's legal force in the
game (§12.60).

---

## T6 — ch4

*The study's four secrets — journal, memory-bell, tapestry under the paint, the grey thread;
(optional) Oriel's note; the Warden's Oath and its lock.*

**This is the chapter in which the four can finally answer Vane's T3 dare, three chapters late, in a
room he is not in.**

| | **Knows** | **Believes** | **Wrong about** | **Believes about others** | **Withholding** | **Would say if asked** | **Changed at this point** |
|---|---|---|---|---|---|---|---|
| **Seer** | On `TAPESTRY`: **V1, confirmed and scraped.** "which of them carries" = the fourth; "which reaches back" = the second (`ch4.js:534`, `:546`; plate `companion/ch4.js:104-113`). The Hearth then prints, on the shared screen: **'"I have seen what is under the paint," the Envoy said. **So he had.**'** (`ch4.js:557`) | That Vane told the truth, and that the truth is worse than he said — there is **no child in it** | [PROPOSED] That confirming Vane makes Vane an ally. It does not, on any branch, until the four choose to tell him at T9 | S→V: *he was right, and he wanted us to know it.* S→M: *she left us alone in a room with this.* S→W: *this is about you and there is no you in it* | Nothing — the Seer's answer is public by construction (the corner requires it aloud) | "Four of them walk in. The fourth is carrying the cold word. There is no child anywhere in it. He was right." | **The mystery's first hard answer, and it is question 1 of 3.** The narration ratifies an antagonist on the shared screen — the single strongest beat in the whole Vane arc |
| **Listener** | On the bell corner: **V4** — the Envoy, verbatim: "**The Crown will have the Cold open, one way or another.**" And Marrow's reply, verbatim: "**Then the Crown will go through me. And through it.**" (`companion/ch4.js:213`; `ch4.js:524`). Also: the bell keeps the Provost, the Envoy, and the Listener's own voice — **and will not keep Wren** (`companion/ch4.js:227`) | That the Envoy and the Provost have had this conversation **in this room**, alone, recently | [PROPOSED] Nothing — but the Listener has no way to date the conversation, and the game never dates it | L→M: *she said "through it" and meant something she has not told us.* L→V: *he is not here for a child, he is here for the Cold.* L→the other three: *none of you heard this; I have to say it* | **Nothing** — the corner is answered aloud or not at all. But the corner is **opt-in and spendable**: 3 tries, and "struck again, the bell gives nothing but bell" (`ch4.js:233`). **A table can finish the game never learning V4** | "He said the Crown will have the Cold open one way or another. She said the Crown would have to go through her. And through *it*." | **Question 3 of 3 is answered — on one phone, optionally.** The Crown's real aim is the most spendable fact in the game |
| **Wren** | That the four now know what is under the paint, and **that there is no child in it**: "Four of them. **Where is the one born of four? Where am I?**" (`ch4.js:557`). On the bell: fixates on the referent — "**Through *it*. She said through it.**" (`ch4.js:524`) | That Marrow says things to Envoys she does not say to Wren: "**She never says things like that to my face. Only to Envoys.**" (`ch4.js:524`) | Still assumes the four had this earlier than they did | W→M: *you told him and not me.* W→the four: *you found it; nobody found me in it* | — | "There is no child in it. So what am I?" | **Wren learns V1 here, not at T3** — and learns it as an erasure of Wren, not as an indictment of the Crown |
| **Binder** | The grey thread; the two rules. On `ORIEL`: **Oriel's note** — "I scraped that paint myself, as a girl, with a bread-knife. **They painted it back inside the week.**" (`ch4.js:588`) | On `ORIEL`: that a **Master** independently corroborates the Envoy | [PROPOSED] Does not connect Oriel's "they" to the same body that exiled Vane — nothing in the note or the page invites it | B→O: *she knew, and said nothing for decades.* B→V: unmodelled, still | Vane, still: the Binder's ch4 page never reads him | "A Master of this school took a knife to that paint and they repainted it inside a week." | On `ORIEL`, the **second witness** arrives — and the game never lets the Binder and the Seer put Oriel and Vane in one sentence |
| **Reader** | The journal; on `LETTER_READ`, Mere's sheet (a different mystery) | — | — | — | — | "She writes *it*." | No Vane movement |
| **Marrow** | Unchanged, plus: that the Seer has scraped her tapestry. She **sees it and stops in the doorway**: "**So. The Seer.**" (`ch4.js:609`) — and says nothing else about it, ever | That the four now hold the thing Vane threatened her with | — | M→S: *you did it; I did it too, as a girl, and I am not going to say so* (she says so only at T9, only inside `ch7_argue1`) | **Still V1's meaning, and now also her own scraping.** Reason: (a) **protecting the plan**; (b) [PROPOSED] **protecting herself** — admitting she scraped it is admitting she has known for decades and raised Wren anyway | "So. The Seer. The scroll, then." | The one person who could tell the four what Vane's threat meant sees the answer on her own wall and moves the scene on to the oath in the same breath |
| **Vane** | Unchanged. **Absent.** He is never told that the four confirmed him | — | — | — | — | *(offstage)* | Nothing. **The ratification of his life's one claim happens in a room he is not in, and he never learns it** — unless the four choose to tell him at T9 |
| **Oriel** | Unchanged | On `ORIEL`: that the four have been told, and will tell her everything (`ch1.js:266`) | — | O→the four: *they will bring me the parts I do not like* | — | "They painted it back inside the week." | Her corroboration enters the fiction as a **note under a cushion**, on one branch, in a room she is not in |
| **all others** | Unchanged | — | — | — | — | — | — |

**Branch gate on the mystery's spine.** `TAPESTRY` requires the Seer to answer **two ordinals**
correctly inside a **two-try** budget (`ch4.js:228`, `:546`); `MEMORY` requires the Listener to
transcribe a name and a two-word phrase inside **three** (`ch4.js:228`, `:516`). Both corners can be
shut for the night (`ch4.js:231-236`). **A table can therefore reach the Finale with: Vane's claim unconfirmed,
the Crown's aim unheard, and no evidence that the Envoy is anything but a man with a writ** — and
still be offered the button "Show him what is under the paint" (§14.1).

---

## T7 — ch5

*Mere's gates; the Under-Marches, the drowned First Hall, four thrones; the Founders' Count; the stair choice.*

| | **Knows** | **Believes** | **Wrong about** | **Believes about others** | **Withholding** | **Would say if asked** | **Changed at this point** |
|---|---|---|---|---|---|---|---|
| **Binder** | That the soldiers on the stair are **"gold, every one of them, and none of it theirs"** (`companion/ch5.js:342`) | That nobody on that stair is there by conviction | — | B→the soldiers: *bought men, and the purchase is not theirs* | — | "Every man up there is on someone else's money." | The Crown's purchase is legible to the bottom of the school. **Still no reading of Vane himself** |
| **Marrow** | That the Envoy's soldiers are on the stair; refuses them at the level of grammar: "**Then the Envoy can ask the stair.**" (`ch5.js:490`) | That Mere's gates will hold what a vote could not | — | M→V: *he can spend his writ on four hundred years of Founders' work and see how it goes* | Still V1's meaning | "Then the Envoy can ask the stair." | Her **only** direct statement about Vane to the four all night, and it is a joke about masonry |
| **Seer / Reader / Listener** | Nothing new of Vane | — | — | — | — | "They're behind us." | — |
| **Wren** | That the soldiers are coming; opens Mere's hidden door for "**people who were not asked**" (`ch5.js:287`) | — | — | — | — | "They're three flights up. Mum will pretend she did not see." | No Vane movement |
| **Vane** | Unchanged | — | — | — | — | *(offstage; only his soldiers appear)* | On `DOOR='FIGHT'` the woken ward **told his men where to look** (`ch5.js:492`) — the four's one victory over him at T5 is also how he finds them at T7 |
| **Cpt** | Pursuing | — | — | — | — | — | On `STAIR='RUN'`/`SOLDIERS`, his men hold the stair at T9's arrival (`ch7.js:61`) |
| **all others** | Unchanged | — | — | — | — | — | — |

**Note on cast bits.** `VANE_ACCEPT` is a **ch5 cast bit** (`lore.js:22`, bit 4) and
`companion/ch5.js` never reads it. One bit of the chapter's six is spent carrying a fact the chapter
does not use — see §13.H.

---

## T8 — ch6

*The Bells; the Second Asking; Marrow's confession; the prophecy stone read from its foot; Law 0 restored.*

**Vane does not appear and is not named anywhere in Chapter VI.** Verified by grep. This matters more
than its absence suggests:

| | **Knows** | **Believes** | **Wrong about** | **Believes about others** | **Withholding** | **Would say if asked** | **Changed at this point** |
|---|---|---|---|---|---|---|---|
| **the four** (as a body) | The stone's true reading — "**Four, as one, go down with fire… The fire is the hollow they left**" (`ch6.js:827-828`) — and that "**the fire is only what they left behind**" (`ch6.js:839`), and 212's price and refusal (`companion/ch6.js:286-287`) | That the school's whole account of itself is a cost-avoidance story | — | → V: **unmodelled.** No line in ch6 connects the Convocation that struck Law 0 to the Convocation that sent Vane away | — | "Four went down. Nobody did anything wrong. And somebody painted over it." | **The four now know strictly more than Vane does.** He has the picture; they have the picture, the stone, the Law, the price and the refusal. **Nothing in the game marks the moment they overtake him** — and it is the moment that makes T9's `wall` choice mean something |
| **Binder** | Law 0 restored; 212's refusal in the Book's own words (`companion/ch6.js:286-287`) | — | — | B→C: *this body refused to pay, and then legislated the refusal* | — | "They could not afford four Masters. So they made it grammar." | Holds the exact motive-shape of the institution that exiled Vane, and never applies it to him |
| **Marrow** | Everything; confesses Wren's origin **kneeling**, with Wren's permission (`ch6.js:690-692`); reads the stone from the foot herself (`ch6.js:824`) | — | — | M→the four: *they have it now, and I did not give it to them* | Still V1's meaning, still her own scraping | "They could not afford four Masters, so they made it grammar." *(she says this at T9, not here)* | Confesses everything **except** the one thing Vane threatened her with |
| **Wren** | That Marrow is what Wren thought; that the stone is about four, not one | — | — | — | — | "Tell them. You are allowed." | No Vane movement |
| **Vane** | Unchanged — **and this is now a deficit.** He holds V1 and V2 and nothing else. He does not know about 212's price, the struck Law, the stone's foot, or that the school's own Chair agrees with him | Still that the paint is his best card | **Newly wrong: that the paint is his best card.** By T8 it is the four's weakest one | V→the four: *children who took or refused my money.* He has no idea they have spent the night assembling the case he could not make in twenty-two years | — | *(absent)* | **Nothing — which is the point.** He spends the chapter one floor away, ignorant, while the thing he was exiled for is proved |
| **all others** | Unchanged | — | — | — | — | — | — |

**[WITHHOLDING] at T8.** This is the mystery's largest structural omission. The chapter that proves
Vane right in full ends without one line, from any character or the narration, noting that the Envoy
said so first. One sentence in `ch6_stone`'s solved text — *"Somewhere above you, a man in a grey coat
has been saying this for twenty-two years and nobody wrote it down"* — would make T9 land as
vindication rather than as a button.

---

## T9 — ch7

*Vane at the chamber's edge; (optional) the wall shown to Vane; the Decision; the Great Sigil; the
Binding; COLD written by four hands.*

**Everything in this mystery is spent here, and it is spent in the first ninety seconds of the
chapter, before the attunement.** `ch7_vane`'s choice is settled **before** `ch7_attune` freezes
`CAST_FLAGS_CROWN` (`ch7.js:309-310`, `:349-352`) — i.e. **before any phone has read a single word of
Chapter VII.**

### T9a — `ch7_start` / `ch7_vane`: the offer, restated

| | **Knows** | **Believes** | **Wrong about** | **Believes about others** | **Withholding** | **Would say if asked** | **Changed at this point** |
|---|---|---|---|---|---|---|---|
| **Vane** | Unchanged, plus: **that the fire has under an hour** (`ch7.js:316`), and **V13** — he addresses each of the four by real first name on their own phone (`companion/ch7.js:182`) | That the arithmetic now argues for him: "One child, and a fire that will be out within the hour." On `VANE_ACCEPT`: that a word given in a Hall still binds — "**You gave me your word in the Hall**" (`ch7.js:314`) | **That the four still need him to tell them what is on a wall.** They have read it, the stone, and the Law | V→the four: *they are out of time and I am the only exit.* V→M: *she is going to send a child in.* V→W: still "**the boy**", still never a name | **V2 and V11 — still.** He is standing eight metres from the carving that proves him and does not mention it. Reason: **protecting himself.** He will only say it if they make him | "One child, and a fire that will be out within the hour. Bring him up the road." | Restates V3 and V6 with a deadline. **His last chance to say V2 voluntarily, and he does not take it** |
| **Wren** | Everything about the fire, the stone, Marrow, and Wren's own nature | — | — | W→V: *not a person to look at.* W→the four: *look at me instead* | — | "**Don't look at him. Look at me.**" (`ch7.js:317`) | Wren's only line about Vane in the Finale is an instruction not to engage with him |
| **the four** | On `TAPESTRY`: V1 first-hand. On `MEMORY`: V4. On `ORIEL`: Oriel's corroboration. **And, on every branch, the stone** | That they can end the negotiation with evidence | — | → V: *he told the truth once and has spent the night buying a school* | — | "We know what's under the paint. Do you want to see it?" | The choice is offered **unconditionally** — see §14.1 |
| **Marrow** | Everything | That the Decision is not hers | — | M→V: *he is here to be given something, not to take it* [PROPOSED — but see §14.10] | Her own scraping, still — for one more scene | "The ring has been ready for fourteen years. **Decide.**" | Present for the entire Vane exchange and **silent throughout it** |

### T9b — branch `FINALE_WALL='wall'` (`VANE_ALLY`)

| | **Knows** | **Believes** | **Wrong about** | **Believes about others** | **Withholding** | **Would say if asked** | **Changed at this point** |
|---|---|---|---|---|---|---|---|
| **Vane** | **That he was right, publicly, in front of witnesses, for the first time in twenty-two years.** And that the people who proved it are four children he has been trying to buy | **V11, stated aloud**: that the correct response to being vindicated is to remove himself — "**I will not be the thing you have to be brave about**" (`ch7.js:342`) | — | V→the four: *these four did in one night what I could not do in twenty-two years.* V→M: **"your Hall"** — he still addresses the institution through her. V→C: *they sent me away to learn manners* | **Nothing further.** This is the only beat in the game where Vane empties his hands. And the game immediately deletes him: `VANE_ALLY` removes the bargain, the letter, one figure from the art, and every subsequent mention of him (§12.32) | "Twenty-two years. I stood in your Hall with that paint under my nails and told them. **They sent me away to learn manners.**" | **V2 and V11 enter the fiction, simultaneously, in two lines.** Every `BARGAIN_<r>` is forced to `refused` (`ch7.js:333`); the private letter vanishes from all four phones (`companion/ch7.js:182`, gated `!ally`); E4 becomes unreachable (`ch7.js:378`) |
| **Marrow** | That the man who threatened her with this picture in her own Hall was exiled for showing the Hall the same picture | — | — | M→V: — **the game gives her nothing here.** She does not react, on any branch | **That she scraped it too.** She will say it four scenes later, to the four, only if `OATH_KNOT && TAPESTRY` (`ch7.js:394`), and never to Vane. §14.5 | "I scraped it myself, as a girl." *(said to the four, never to him)* | **Nothing.** §12.23 — the free reaction line, still missing |
| **the four** | That the antagonist's entire position was grief | That they have made an ally | **[PROPOSED] That an ally is worth anything.** `VANE_ALLY` buys exactly one thing: the deletion of E4. It does not buy soldiers off the stair, does not buy a witness, does not buy the Crown | → V: *he is on our side now* — untested, forever | — | "He's not going to take anyone. He's just going to stand there." | The Envoy stands down **and stays on the ledge with four armed men** for the rest of the game |
| **Wren** | Unchanged | — | — | — | — | *(no line — Wren says nothing in `ch7_wall`)* | **Wren, the subject of the offer just withdrawn, is given no reaction** |
| **Oriel** (on `ORIEL`) | Unchanged | — | — | O→V: — **unmodelled** | — | *(she "says nothing, loudly", `ch7.js:60`)* | **The one Master who can corroborate V2 is standing behind him while he says it, and the scene does not use her.** §16 |

### T9c — branch `FINALE_WALL='nothing'` (`!VANE_ALLY`)

| | **Knows** | **Believes** | **Wrong about** | **Believes about others** | **Withholding** | **Would say if asked** | **Changed at this point** |
|---|---|---|---|---|---|---|---|
| **Vane** | Unchanged. **He never learns he was right** | That the private channel still works: "**The others need never know who opened the door**" (`companion/ch7.js:182`) | **That the private channel is private.** The Hearth names every accepter aloud: "**The fire says one name out loud**" (`ch7.js:493`), and his own prompt is "**in front of everyone**" (`ch7.js:496`). §14.7 | V→each of the four, individually and by first name: *you can be the one who opened the door and nobody will know.* V→the four collectively: *at least two of you will* — and two is exactly the threshold (`ch7.js:509`) | **V2, V11, V4 — permanently.** On this branch they are never said, and the player who never chooses `wall` finishes the game believing Vane is a courteous buyer with no history | "I keep my promises. **Do you keep yours?**" | The bargain goes to a sealed token; two kept keys force E4 regardless of the Decision (`ch7.js:509`) |
| **each of the four** | That the letter is addressed to them **by name**, and that nobody else at the table can see it | That nobody will know. **False** | **That the choice is private.** It is sealed, then read out | → each other: *I do not know what the other three did, and I will find out in front of everybody* | Their own answer — genuinely, until the Hearth breaks it | "Nothing." *(and `ch7.js:491`: "Nothing. Well. **Nothing is an answer**")* | The only three-way private channel in the Finale, and its privacy is a lie the game tells and then breaks |
| **Wren** | That somebody may have taken it | That it would be reasonable if they had: "**It's alright. I'd have taken it too.**" (`ch7.js:499`) | — | W→the four: *no judgement, from me, ever* | Wren's own hurt | "It's alright. I'd have taken it too." | Wren absolves in advance, which is Wren's method for everything |
| **Marrow** | Present; says nothing about the bargain on any branch | — | — | — | — | — | **Marrow watches four children be bought in front of her and does not speak.** §16 |

### T9d — `ch7_argue1` (gated `OATH_KNOT && DECISION='FOURFOLD'`)

| | **Knows** | **Believes** | **Wrong about** | **Believes about others** | **Withholding** | **Would say if asked** | **Changed at this point** |
|---|---|---|---|---|---|---|---|
| **Marrow** | On the `tapestry` option, she says it at last: "**I scraped it myself, as a girl.**" (`ch7.js:394`). On the `letter` option: "**They could not afford four Masters, so they made it grammar.**" (`ch7.js:396`) — "they" has no antecedent in the scene (§12.18) | That an argument is owed before she steps aside | — | M→the four: *name one thing you saw* | Nothing further — this is where she empties her hands | "I scraped it myself, as a girl." | **The only line in the game in which Marrow admits she has held V1 for decades — triple-gated (`OATH_KNOT` + `TAPESTRY` + the player choosing that option), in a scene Vane can be standing in** |
| **the four** | That the Chair has known all along | [PROPOSED] Do not connect it to Vane's twenty-two years, because nothing prompts them to | — | → M: *you knew and you said nothing, for the same twenty-two years he did* — **unstated** | — | "You knew. You've always known." | The mystery's answer to *who else benefits* quietly becomes *the Chair benefited from the silence too* — and nobody says it |

---

## T10 — ch8

*The ending that was reached, and the epilogue.*

| | **Knows** | **Believes** | **Wrong about** | **Believes about others** | **Withholding** | **Would say if asked** | **Changed at this point** |
|---|---|---|---|---|---|---|---|
| **Vane** | **E4 only:** that he has delivered every term. "What leaks from under Thornhallow is harnessed, **as promised**." / "You are Masters, **as promised**." (`ch8.js:355-356`). "**The Envoy is courteous about it. He has always been courteous.**" (`ch8.js:353`) | That courtesy and delivery are the same as honour | **Not wrong about anything he said.** He is wrong only in the sense the ending is built on: every promise kept, and the result is a cage, a garrison and a furnace with a schedule | V→the four: *Masters, as agreed.* V→W: an asset in a cage it takes four soldiers to carry (`ch8.js:274`) | — | "As promised." | **E0–E3: he is never mentioned again.** Not his fate, not his soldiers, not his writ, not the Crown. §12.30 |
| **the four** | **E4:** their Sightings are **registered**, and they are posted to "the Cold-works" (`companion/ch8.js:207-208`, `:291`). The Binder: "**Every thread in that hall went gold on the way out. Crown gold, all of it, including yours.**" (`companion/ch8.js:299`). Law 0 reads **STRUCK, AGAIN — The Crown struck it. The Crown does not need Laws** (`companion/ch8.js:309`) | That they got what they were offered | — | → V: *he kept his word, and that was the worst outcome available* | **E4, Reader:** "You are the only one in that hall who could have told the room what it said. **Nobody asked you.**" (`companion/ch8.js:290`) — a withhold by omission, not by choice | "We are Masters. Masters of ash." | The mystery's answer to *who else benefits* is delivered in full **only on the ending in which the four are among the beneficiaries** |
| **Wren** | Everything | **E4:** says nothing to any of them — "**It is the worst thing Wren has ever done**" (`ch8.js:354`) | — | W→the four: *there is nothing to say that would not be a kindness I am refusing you* | **Everything, deliberately, by silence.** Reason: **protecting them** — and it is the one time in the game Wren's silence is the weapon rather than the tell | *(says nothing)* | On E0/E1/E2/E3 Wren never mentions Vane again either |
| **Marrow** | — | — | — | — | — | — | **Absent from E0, E1 and E4** (§12.30), i.e. absent from the ending in which her school becomes a garrison |
| **O / Sr / C / Cpt / Prt** | — | — | — | — | — | — | **None of them appears in any epilogue on any ending.** The Convocation, the nine, the captain and the porter simply stop existing at dawn |

---

## §12 — THE GAP THAT DRIVES THE DRAMA

**The pair: VANE ↔ THE SEER.** Not Vane ↔ Marrow — that one is loud, symmetrical and settled in one
line at T3 (they both know, they both know the other knows, and neither will say it). The productive
asymmetry is the one the game actually built a *mechanic* around:

> **Vane knows exactly what is under the paint, cannot show it, and names the one person in the
> building who can — a fourteen-year-old who, at that moment, can see only that *something* is
> there.** (`ch1.js:283` against `companion/ch1.js:132`: "You can see *that* there is a shape under
> it. **Not what.**")

Why this is the best gap in the mystery:

1. **It is a gap in *capacity*, not in candour.** Every other pair in this document withholds. The
   Seer does not withhold — the Seer cannot answer. That is rarer and better: the player experiences
   the gap as frustration with their own gift rather than as a character being coy.
2. **It closes on a puzzle, not on a cutscene.** `TAPESTRY` requires the Seer to say two ordinals
   aloud, inside two tries, with the whole table listening (`ch4.js:546`). The moment the gap closes,
   the Hearth ratifies the antagonist on the shared screen — "**So he had**" (`ch4.js:557`). The
   mystery's answer *is* the puzzle's answer.
3. **It is the only asymmetry in the game that the player can choose to close in the antagonist's
   favour.** At T9 the four can hand Vane the confirmation he has wanted for twenty-two years
   (`ch7.js:337`), and doing so **removes the worst ending from the game** (`ch7.js:378`). Knowledge,
   given away, is the weapon.
4. **It runs the whole length of the game.** Opened T3, unanswerable T3–T5, answered T6, withheld
   from Vane T6–T9, spent T9. Six chapters of tension on one unresolved sentence.

**Scenes that currently exploit it**

| scene | how | cite |
|---|---|---|
| T3, `ch1_offer` | Vane names the gift unprompted, in public, to four children, in front of the Convocation | `ch1.js:283` |
| T3, Seer's Wren tab | The gift returns *a shape, not what* — the gap is stated in the Seer's own voice | `companion/ch1.js:132` |
| T3, Wren's question | "**Seer, what is *on* that wall?**" — the gap is voiced by the person it is about, and goes unanswered | `ch1.js:306` |
| T6, the tapestry corner | The Seer closes it, aloud, on a two-try budget, and the shared screen ratifies Vane | `ch4.js:546`, `:554`, `:557` |
| T9, `ch7_vane` → `ch7_wall` | The Seer shows him, and the Envoy's entire position collapses into autobiography | `ch7.js:321`, `:339`, `:341-342` |

**Scenes that could and do not** — see §16.

**The runner-up, and why it loses.** *Vane ↔ the Listener* (V17/V4) is nearly as good and is
squandered: the Listener alone knows the Envoy is frightened (`companion/ch1.js:117`) and alone can
hear what the Crown actually wants (`companion/ch4.js:213`), and **no scene ever asks the Listener to
say either thing to anyone.** Both are printed on a Wren tab or an optional corner and neither is a
puzzle input. If the author wants a second spine for this mystery, this is it, already half-built.

---

## §13 — WHERE THE GAME CONTRADICTS ITSELF ON WHO KNEW WHAT WHEN

### §13.A — **[CONTRADICTION]** Vane bows to the vote, and then breaks it inside the hour

> `js/content/ch1.js:230-231` — Marrow: "The child stays. **Lord Vane, we thank the Crown for its
> concern.**" / "Vane bows. It is a very good bow."
> `js/content/ch1.js:241` (`VOTE_LOST` branch) — Vane: "**The school has voted.** His Majesty is
> grateful, and will not forget it."

against

> `js/content/ch3.js:439` — "The nine voted to keep Wren. **Lord Vane bowed to the vote, and then put
> soldiers through the school.** / Room by room, writ in one hand and lantern in the other."

and against

> `js/content/ch7.js:494` — Vane: "**I keep my promises.** Do you keep yours?"
> `js/content/ch8.js:355-356` — "harnessed, **as promised**" / "You are Masters, **as promised**."
> `CANON.md` §9.3 — "**He does not lie, and that is the horror of ENDING 4.**"

**This is the mystery's load-bearing contradiction.** The game's entire construction of Vane — and
the moral force of E4 — depends on him being a man who delivers exactly what he says. On the
**majority branch** (the vote is winnable and designed to be won, `ch1.js:43-49`) he publicly accepts
a result and violates it within the chapter. The four then spend all of Chapter III running from the
violation, and **no character ever mentions it to him**, including at T9 when he says "I keep my
promises" to their faces.

**Which side the rest of the game depends on:** the promise-keeper. E4's horror, `ch7.js:494`, and
the `WORD` door key (`ch3.js:551`, where his word works on his own men) all require it.
**Fix options:** (a) have him say so — one line at `ch3.js:439`: *"He bowed to the vote. He did not
promise not to look."* That converts a contradiction into characterisation, and is free. (b) Give one
of the four the line at T9: *"You bowed to that vote."* / *"I did. I bowed to it. I never said I
accepted it."*

### §13.B — **[CONTRADICTION]** Where the paint is: three surfaces, one claim

> `js/content/ch1.js:138` — Vane: "I have seen what is under the paint **in this hall**, Ilsabet."
> — spoken in the **Great Hall**.

against

> `js/content/ch4.js:533` — "The picture this school hangs **in every hall**: a fire, and one small
> figure walking into it. Painted over older paint." — the object actually scraped is in the
> **Provost's study** (`ch4.js:1`, `:557`).
> `js/content/ch7.js:341` — Vane: "I stood in **your Hall** with that paint under my nails."
> `js/content/ch7.js:303`, `:337` — a **third** surface: "On the wall, four carved figures walk into a
> flame" / "The Seer takes four hundred years of soot off the wall" — **a carving, not paint,** in the
> bell-chamber, never overpainted at all.

"in every hall" partially rescues ch1 — but then the Seer's ch1 page (`companion/ch1.js:132`) is
looking at a Great Hall copy, the ch4 corner scrapes a study copy, and `ch7_wall` shows a bell-chamber
**carving** while the option is still labelled "Show him what is under the paint" (`ch7.js:321`).
Three objects of two different media satisfy one sentence. `CANON.md` §13.39 flags this; the
epistemic consequence is sharper than the geographic one: **the four can "show Vane what is under the
paint" without ever having been under any paint.**

### §13.C — **[CONTRADICTION]** Vane promises secrecy and then demands a public answer

> `js/content/companion/ch7.js:182` — "To you alone, and I will not say it twice… **The others need
> never know who opened the door.**"

against, in the same chapter, from his own mouth

> `js/content/ch7.js:493` — "**The fire says one name out loud:** {Reader/Listener/Seer/Binder}."
> `js/content/ch7.js:496` — prompt: "{name} — **in front of everyone.**"
> `js/content/ch7.js:494` — Vane: "**I keep my promises.** Do you keep yours?"

`CANON.md` §9.3 attributes the breach to the Hearth ("a concealment the Hearth then breaks for him").
The source does not support that reading: the **prompt is his scene's**, the question is his, and he
asks it publicly having promised in writing not to. On the game's own terms this is Vane breaking a
written promise while asking a child whether children keep theirs. Either it is the best line in his
part and needs one clause to mark it as deliberate, or it is an accident and the letter's last
sentence should go.

### §13.D — **[CONTRADICTION-adjacent]** He wins the vote and immediately says the win will not hold

> `js/content/ch1.js:280` (`VOTE_LOST`) — Vane: "**The Provost will have the boy back by morning.**
> When she does — bring him to me before dawn."

against

> `js/content/ch1.js:146` — the rule he has just beaten: "This school does not hand its children to a
> writ. It hands them to a vote."
> `js/content/ch3.js:438` — and he is right: "The nine voted Wren away. **The Provost went and took
> the child back before midnight.**"

Flagged at §12.61 as a knowledge question. As an *epistemic* matter it is worse than that: it means
**Vane never believed the vote was the instrument**, which makes his entire Chapter I performance —
the writ, the lever, the two bought seats, the blocked third — a piece of theatre whose purpose is
never stated. Rule it and the character sharpens enormously. Leave it and his T3 behaviour has no
motive.

### §13.E — **[CONTRADICTION]** The captain's rope

> `js/content/ch3.js:543` — the captain: "Hand over the boy, **or the Provost hangs. The Envoy has her
> in the Great Hall with a rope over the beam.**"

against, on **every** branch including surrender

> `js/content/ch3.js:635`, `:644-645` — "**The rope came off the beam an hour ago.** The Provost will
> not hang tonight."
> and against `ch3.js:445` — Marrow was at the bell-rope minutes earlier, and is in her study minutes
> later (`ch4.js:341`).

Either (a) Vane ordered a threat he never intended, which makes him a liar and destroys §13.A's
resolution; (b) the captain improvised it, which nothing says and which contradicts "I am not a cruel
man. **I am a punctual one**" (`ch3.js:544`); or (c) the rope was real and was withdrawn, which
nobody mentions. `CANON.md` §12.39 calls this "the clearest undercut beat in the game." For this
mystery it is more than an undercut: **it is the only piece of evidence in the game that the Envoy's
word is worthless, and the game neither confirms nor retracts it.**

### §13.F — **[CONTRADICTION]** Two different "under the paint" reveals satisfy one choice

> `js/content/ch7.js:338-339` — `TAPESTRY` true: "The Seer says what is under the paint **in the
> study**, and the Hearth turns it round."
> — `TAPESTRY` false: "The Seer **takes four hundred years of soot off the wall**."

The second branch has the Seer perform, as a free action in a timed finale, a physical excavation the
game spent a whole chapter gating behind a two-try puzzle. It also means the `!TAPESTRY` table
"shows" Vane something **they** are seeing for the first time. See §14.1.

### §13.G — **[CONTRADICTION]** `CANON.md` §9.3 reads Vane's art marks as threads; the art idiom says edge-light

> `CANON.md` §9.3 — "**He is drawn with two threads on one body**: red `#b23a3a` at .8 on his left,
> gold `#d4a94e` at .6 on his right."

against the same three lines of the same file

> `js/art/scenes-ch7.js:83` — Vane: `stroke="#b23a3a"` inward, `stroke="#d4a94e"` outward.
> `js/art/scenes-ch7.js:86` — **Marrow**: the identical path idiom, `stroke="#ff9a3c"` — the Hearth's
> fire orange, which is **not a thread colour** (`lore.js:9` gives grey/gold/red only).
> `js/art/scenes-ch7.js:87` — **Wren**: the identical idiom, `stroke="#4fb3bf"` — the Cold's colour,
> Wren's edge-light signature everywhere else in the game.

So the marks are the scene's **rim-light** helper, and CANON's reading is an inference. **But it is
worth keeping**: `#d4a94e` is *byte-identical* to the companion's gold-thread stroke
(`companion/ch5.js:135`), and red is an oath (`companion/book.js:131`). If the author rules them
threads, then **Vane is sworn to somebody and the game never says to whom** — which is the single
richest unopened door in this mystery and pairs directly with §13.H below. If the author rules them
light, `CANON.md` §9.3 needs correcting and the Binder's silence in ch7 (§14.6) stops being a
withhold and becomes a simple absence.

### §13.H — **[CONTRADICTION]** Vane's seal is another House's colour

> `js/art/scenes-ch1.js:117` — Vane's writ seal: `<circle cx="0" cy="-80" r="7" fill="#8a2f2f"/>`
> `js/art/scenes-ch1.js:14` — `{ n: 6, house: 'Redmoor', color: '#8a2f2f', sym: 'wave' }`

Redmoor is **seat 6** — the one seat Vane's own soldier stands behind so that "**nobody gets near**"
(`companion/ch1.js:127`). Either the Crown's Envoy is Redmoor-born and is blocking his own House from
being asked, or it is a palette collision. §12.35 calls it "worth a ruling; if deliberate it is very
good." For this mystery it is more than good: it would answer V5's neighbours — how he knows the
seats (V12), how he knows four children's given names (V13), and what "**your** Hall" is doing in
`ch7.js:341` (a man who was of this place and is careful to say he is not).

### §13.I — **[CONTRADICTION]** A cast bit is spent on a fact its chapter never uses

> `js/content/lore.js:22` — ch5 cast: `{ bit: 4, key: 'VANE_ACCEPT' }`

against `js/content/companion/ch5.js` — grep for `VANE`: **no match.** Chapter V pays a bit of its
six-bit budget to tell four phones whether the party sold Wren, and then never mentions it. (ch3's
and ch4's copies of the same bit *are* used — `companion/ch3.js:236`; `ch4.js:81`.)

---

## §14 — WHERE BEHAVIOUR DOES NOT MATCH THE KNOWLEDGE STATE

Ruthlessly, in descending order of how much it costs the story.

### §14.1 — The four can show Vane a wall they have never looked at

`js/content/ch7.js:321` offers `{ id: 'wall', text: 'Show him what is under the paint.' }` with **no
`if` clause**. A table that:

- never scraped the tapestry (`TAPESTRY` false — a two-try corner that shuts, `ch4.js:228`, `:233`),
- never read Mere's sheet, never found Oriel's note,
- whose Seer's only statement about paint all game is "you can see *that* there is a shape under it.
  **Not what**" (`companion/ch1.js:132`),

can still click it, whereupon the Seer instantly "takes four hundred years of soot off the wall"
(`ch7.js:339`). **The single most consequential choice in the Vane mystery has no knowledge
prerequisite.** Compare the same chapter's discipline elsewhere: `ch7_argue1`'s `tapestry` option is
gated `if: (s) => !!s.flags.TAPESTRY` and its `letter` option on `LETTER_READ || LETTER`
(`ch7.js:391-397`). The Decision scene knows how to gate; `ch7_vane` does not.

**Fix:** gate `wall` on `TAPESTRY || ORIEL_NOTE || LETTER_READ || STONE_TOLD`, and give the ungated
table a third option — *"Ask him what he saw."* — that yields V2 without yielding `VANE_ALLY`.

### §14.2 — Vane's twenty-two years are unforeshadowed, and they are the hinge

`ch7.js:341` is the **only** utterance of V2 anywhere in the shipped game. No phone, no document, no
Master, no portrait, no line of narration plants it. `CANON.md` records it as CLAIMED BY Vane and the
game never corroborates it. The player is asked to accept the antagonist's total collapse on the
strength of one paragraph of unverified autobiography delivered after the point of no return.
**[UNEARNED].**

Proposed breadcrumbs, cheapest first:

| # | where | the plant |
|---|---|---|
| 1 | `companion/ch1.js:117` (Listener, T3) | Make the fast heart **specific**: *"His heart went fast on one word. The word was* paint.*"* One clause; turns V17 into a plant for V2 |
| 2 | `ch4.js:588` (Oriel's note, T6, branch `ORIEL`) | Add nine words: *"I was not the first. A young man did it before me, and they sent him away."* Oriel is already the corroborating witness; this makes her corroborate the man too |
| 3 | `ch3.js:440` (the Gallery, T5) | Among ~200 portraits, one with its face scraped and repainted. The Seer can see it; the Reader can read the plaque. Costs one sentence and pays at T9 |
| 4 | `companion/ch2.js:169` (Binder, T4) | Add to the gold-thread line: *"and there is a second thread on him, red, and old, and it does not go anywhere in this school."* Plants §13.G as deliberate |

### §14.3 — Vane knows the seat structure and four children's first names, and nobody ever remarks on it

`ch1.js:283` — he names **Under-Sight's function** unprompted, in public, correctly. `companion/ch7.js:182`
— his private letter opens with each player's **real first name** (`ctx.name`), a fact
`CANON.md` §12.34 records as never established. Present in the room at T3: the Reader, who reads the
filed roll; the Binder, who keeps the Laws; and the Provost, who runs the school. None of the three
pages, and no line of prose, ever says *how does a Crown envoy know which of us is the Seer.* This is
a character acting on knowledge the fiction has not licensed, in front of the two seats whose entire
function is noticing exactly that.

### §14.4 — Marrow leaves the Seer alone with the thing she was blackmailed with

At T3 Vane threatens her, by name, in front of nine Masters, with a painted wall (`ch1.js:138`). At T6
she brings the four to her **own study**, where a copy of that wall hangs, tells them "The scroll is
behind the third shelf. Read it. **Argue.** I will be ten minutes" (`ch4.js:355`), and walks out. She
scraped the same paint herself as a girl (`ch7.js:394`). She then returns "**early, and does not say
why**" (`ch4.js:607`), sees the scraped tapestry, and says four words: "**So. The Seer.**"
(`ch4.js:609`).

This is *either* the most elegant piece of indirection in the game — she wanted them to find it and
could not be the one to show them — *or* an oversight. **Nothing distinguishes the two.** §12.44's
unexplained early return is exactly the place to say which: *"She came back early because she could
not stand in the corridor any longer."*

### §14.5 — Marrow and Vane both scraped the same paint, in the same building, and neither ever knows

`ch7.js:341` (Vane, at the chamber's edge, on `wall`) and `ch7.js:394` (Marrow, four scenes later, on
`OATH_KNOT && TAPESTRY`) **can fire in the same playthrough**, in the same room, twenty lines apart.
Neither acknowledges the other. §12.23 calls the reaction line "free and missing." The epistemic
reading is stronger: Marrow hears a man say *they sent me away for showing them* and does not say
*they kept me, and I stopped showing them* — which is the whole difference between the two characters
and the reason she is the Chair and he is an envoy.

### §14.6 — The Binder tracks Vane through stone at T4 and cannot see him at T9

At T4 the Binder reads Vane's gold thread **through a floor**, well enough to infer his position and
his aim: "Vane's gold still runs to Wren, **so he has not left the school**" — and on `VOTE_LOST`,
"**it no longer runs towards the dais**" (`companion/ch2.js:169`). At T9 Vane is standing eight metres
away in a chamber lit by a spark, and the Binder's Wren tab lists exactly three threads — the four to
each other, the Provost to Wren, and Wren to nobody (`companion/ch7.js:256-258`). **The Envoy is not
on the list.** Neither is the man holding four bought soldiers. A gift that reported coin from two
floors up reports nothing from across a room.

**[WITHHOLDING].** And note what it costs: the Binder is the only seat that could answer *who else
benefits* in the Finale, and the Finale does not ask.

### §14.7 — Vane asks in public a question he promised to ask in private

See §13.C. As a behaviour flag rather than a text flag: **a character built on "he does not lie"
(`CANON.md` §9.3) performs, on screen, the breach of a written undertaking, and neither he, nor the
narration, nor any of the four, nor Wren, nor Marrow remarks on it.** The four have the receipt open
on their phones while he does it.

### §14.8 — The four ally with a man who threatened to hang the Provost, and nobody mentions the rope

At T5 Vane's captain, acting on Vane's authority, states that "**The Envoy has her in the Great Hall
with a rope over the beam**" (`ch3.js:543`). At T9, on `wall`, the four hand that man the vindication
of his life and he becomes `VANE_ALLY` (`ch7.js:332`). **The rope is never raised** — not by the four,
not by Marrow (who was allegedly the one under it), not by Wren. Marrow's only T9 line about Vane is
"the Envoy gets what he came for" (`ch7.js:412`), on a different branch. A character does not forget
being threatened with hanging four hours earlier.

### §14.9 — Wren quotes a promise Wren was not present for

`ch7.js:433` — Wren, on the `VANE` decision: "Oh. No, it is fine. **He promised.** People keep saying
he keeps promises." The promise (`ch1.js:282`, "He lives. I promise you that") was made in
`ch1_offer`, which is **"the hall emptying, and a grey coat in a passage"** (`ch1.js:278`) — the four
alone. On the win branch Wren rejoins them afterwards at `ch1_after` and talks about seat 7, not about
Vane (`ch1.js:306`). No scene in the game shows any of the four telling Wren about the offer, and on
`VANE_ACCEPT`/`VANE_PRETEND` they have a strong reason not to.

Either somebody told Wren off-screen (fine — but "people keep saying" implies **plural** and repeated,
which is a conversation the game never stages), or this is another instance of §12.21, Wren knowing
what Wren was not told. As written it reads as the second, and **the second is free and excellent** if
one line marks it.

### §14.10 — Vane never once tries to take Wren, and nothing explains why

Count the opportunities he declines:

| moment | force available | what he does | cite |
|---|---|---|---|
| T3, the Great Hall | six soldiers, a royal writ, a hall of unarmed academics | asks, then submits to a school vote | `ch1.js:135-136`, `:146`, `:231` |
| T3, the passage | four children alone, no witnesses | offers a bargain and **waits** | `ch1.js:284`, `:289` |
| T5, the Tower stair | six soldiers, the children cornered | his captain is instructed to "**let you go about it however you chose**" | `ch3.js:399` |
| T5, the same stair | a Convocation writ is produced | withdraws: "**I was not sent to start a war on a stair**" | `ch3.js:404` |
| T7, the Long Stair | nine soldiers | pursues; does not seize | `companion/ch5.js:342` |
| T9, the chamber's edge | four shielded soldiers, a dying fire, a Provost and four children | **asks again** | `ch7.js:314-316` |
| T9, on E4 | the cage is ready | "**He holds his hand out as if helping someone over a stream**"; Wren "goes into the cage **without being pushed**" | `ch7.js:432`; `ch8.js:354` |

**A man with a royal writ and soldiers spends a whole night asking.** That is a large, consistent,
deliberate-looking behaviour and the game never gives it a reason. It is the strongest available
answer to V5, and it is sitting unclaimed.

**[PROPOSED] rulings, best first.** (a) *Wren cannot be taken, only given* — Wren has no thread
(`companion/ch7.js:258`), and you cannot bind what is not bound; the Crown needs a transfer, not a
capture. This costs one line, pays V5, pays E4's "without being pushed", pays the whole bargain
mechanic, and is consistent with everything above. (b) The Crown's claim must be **lawful** for the
Cold-works to be lawful, so the school must be seen to hand the child over; cheaper, colder, and
makes the ch1 vote matter retroactively. (c) He is personally unwilling, which contradicts E4.

### §14.11 — `VANE_ACCEPT` corrupts the party in one clause and the game never charges for it

`companion/ch3.js:236` — "Three people are awake between the Gallery and the Tower. Two of them are
paid. **So, since the Hall, are you.**" One sentence, **one seat's** Sight tab, mid-puzzle-briefing.
The other three accepters are never told they are bought; ch5's copy of the flag is never read
(§13.I); ch7 warms one line of Vane's dialogue (`ch7.js:314`); the Epilogue counts only the *finale*
bargain, not the Hall one (`ch8.js:113`). The four's own purchase is the mystery's answer to "who else
benefits," and it is priced at one clause.

### §14.12 — Oriel is placed at the exact spot where she would matter, and given nothing

On `ORIEL` she "came down behind you and **says nothing, loudly**" (`ch7.js:60`) — i.e. she is
standing at the chamber's edge when Vane says "Twenty-two years. I stood in your Hall…"
(`ch7.js:341`). She is the **only other living person in the game who took a knife to that paint**
(`ch4.js:588`). The game puts the corroborating witness in the room for the confession and gives her
no line, and gives him no awareness of her.

---

## §15 — BRANCH SENSITIVITY

### The flags that change this table, and how

| flag | set | what changes in the Vane epistemics |
|---|---|---|
| **`VOTE_LOST`** | `ch1.js:212` | Vane **wins** T3 and immediately predicts the win will not hold (`ch1.js:280`, §13.D). His offer is reworded from imperative to conditional. `NEITHER` is forced, so Oriel's note and Sorrel's writ both vanish — **the two independent corroborations of V1 are both unreachable on this branch**. At T4 his captain physically comes for the child and Marrow blocks him (`ch2.js:398`). The Binder's tracker changes reading: "it no longer runs towards the dais" (`companion/ch2.js:169`) |
| **`VANE_ACCEPT`** | `ch1.js:292` | The four are **bought** (V19, `companion/ch3.js:236`). A `word` key at the Tower door (`ch3.js:551`), and the captain "looks at you a beat longer than he looks at Wren" (`ch3.js:545`). Suppresses Marrow's unsent letter (`ch4.js:81`). Warms Vane's T9 opener: "**You gave me your word in the Hall**" (`ch7.js:314`). At T9 `ch7_tokens` maps a private `ACCEPT` to a **public asking** |
| **`VANE_PRETEND`** | `ch1.js:290` | Vane's reply is the character's thesis statement: "Wise. Or a lie. **I can use either**" (`ch1.js:291`) — i.e. he explicitly does not model the four's sincerity. A `bluff` key at the door (`ch3.js:550`). **Nothing downstream distinguishes a pretender from an accepter in Vane's own beliefs**, which is the correct outcome and is never remarked on |
| **refuse** (neither flag) | `ch1.js:289` timeout default | "Then I will ask again later, **when it costs more**" — and he does, at T9, with the fire nearly out. The **only** branch on which Vane's T3 and T9 offers form a designed escalation, and nothing points at it |
| **`SORREL`** | `ch1.js:261` | The Crown's writ is beaten by the Convocation's on the stair (`ch3.js:404`) — the game's one test of V3's legal force. Her guards force `EMBER_LOST` |
| **`ORIEL`** | `ch1.js:264` | **The second witness exists.** Her note at T6 (`ch4.js:588`) corroborates V1 independently of Vane; by itself it restores Law 0 (§13.17). She follows the four down and is present for Vane's confession (`ch7.js:60`) |
| **`TAPESTRY`** | `ch4.js:554` | **V1 confirmed, on the shared screen, with Vane named** (`ch4.js:557`). Changes `ch7_wall`'s first line from an excavation to a translation (`ch7.js:338`). Unlocks the `tapestry` argument at `ch7_argue1`, which is the **only** route to Marrow's "I scraped it myself, as a girl" (`ch7.js:394`) |
| **`MEMORY`** | `ch4.js:522` | **V4 exists.** Without it, the Crown's actual aim is never stated by anybody, on any branch, and Vane's motive at T9 is unanchored |
| **`DOOR`** | `ch3.js:550-553` | `FIGHT`: the four beat his men and thereby tell them where to look (`ch5.js:492`). `WORD`/`BLUFF`: his credit or a lie about it opens the door — **the only demonstration that his word has value to his own men**. `WRIT`: the Convocation outranks him. `SURRENDERED`: he has Wren for an hour and gives the child back off-screen |
| **`SURRENDERED`** | `ch3.js:553` | Marrow's cold open, her fast heart (`companion/ch4.js:225`), and "After tonight I will decide what you are" (`ch4.js:355`). **Vane is never told the four surrendered**, and never uses it |
| **`STAIR='RUN'` / `SOLDIERS`** | `ch5.js:571`, `:600` | At T9 the arrival line becomes "**His soldiers hold the stair you came down**" (`ch7.js:61`) — the four are negotiating with an exit blocked. Nothing in `ch7_vane` acknowledges it |
| **`WALK_UNLOCKED`** | `ch6.js:814` | Determines the **shape of the private token**, and therefore what Vane's offer even *is* mechanically: `walk && !ally` → two questions in one word; `!walk && !ally` → ACCEPT/REFUSE only; `walk && ally` → WALK/STAY only; `!walk && ally` → **no token at all** and the Envoy question never happens (`lore.js:47-53`) |
| **`VANE_ALLY`** | `ch7.js:332`, ch7-local | **Deletes the mystery.** E4 unreachable (`ch7.js:378`); every `BARGAIN_<r>` forced to `refused` (`ch7.js:333`); the private letter removed from all four phones (`companion/ch7.js:182`, `:190`); one figure removed from the art (`scenes-ch7.js:85`). **Vane himself remains drawn, with four soldiers, and is never mentioned again** (§12.32) |
| **`BARGAIN_<r>` = kept ×2** | `ch7.js:509` | Forces `ENDING 4` **regardless of `DECISION`** — i.e. two children's private words outrank the table's public one. Vane never comments on this and does not have to: "He does not have to take anybody. **The rest follow.**" |
| **`ENDING`** | `ch7.js:239-247` | **E4**: every proposition V1–V22 that is knowable is confirmed, plus V7; Law 0 struck again. **E0–E3**: Vane is **never mentioned again in any epilogue on any branch** (§12.30) — what happens to the Crown's claim on the Cold after the seal changes is unwritten on four of five endings |

### The four tables that finish the game with materially different pictures of Vane

| table | holds | believes Vane is |
|---|---|---|
| `TAPESTRY` + `MEMORY` + `ORIEL` + `wall` | V1 confirmed, V4, a second witness, V2 and V11 from his mouth | a man who told the truth once, was destroyed for it, and was bought by the people who destroyed him |
| `TAPESTRY` + `wall`, no `MEMORY` | V1 confirmed, V2, V11; **no Crown aim** | a man with a private grievance and no stated policy — the most sympathetic reading, and the least accurate |
| `MEMORY`, no `TAPESTRY`, `nothing` | V4 only | a Crown agent with an unverified boast about a wall; the offer stands and E4 is live |
| no `TAPESTRY`, no `MEMORY`, `nothing` | V3, V6, V8, V9 | a courteous buyer. **The mystery was never opened.** And this table can still be offered "Show him what is under the paint" (§14.1) |

---

## §16 — WHERE THE ASYMMETRY IS AVAILABLE AND UNUSED

Ranked by payoff per line of new text.

1. **T8, `ch6_stone` solved text — nobody says Vane said it first.** The chapter that proves his
   life's claim in full does not name him. One line converts T9 from a button into a vindication.
   (`ch6.js:827-828`, `:839`.)
2. **T9, `ch7_wall` — Oriel is standing right there.** On `ORIEL` she is at the edge for the
   confession (`ch7.js:60`) and is the only other scraper alive (`ch4.js:588`). Give her five words.
3. **T9, `ch7_wall` — Marrow says nothing.** §14.5. The free reaction line the game has wanted since
   `ch1.js:138`.
4. **T3→T9, the Listener's fast heart.** `companion/ch1.js:117` gives one seat the knowledge that the
   Envoy is afraid, and no scene ever asks for it. The obvious home is `ch7_vane`: a whisper line
   *"Listener — is he frightened?"* would make the `wall` choice an **informed** one and repair §14.1
   at the same time.
5. **T4→T9, the Binder's thread tracker.** `companion/ch2.js:169` is a working position-and-intent
   sensor on the antagonist, used once, passively, in a Wren tab. In ch3's corridor puzzle it is a
   mechanic; in ch7 it is absent (§14.6).
6. **T5, Wren's four whispers.** Four private questions, in a chapter spent fleeing Vane's men, and
   **none of them is about Vane** (`companion/ch3.js:284-297`). Wren has exactly one question that
   only the four can answer — *did he offer you something?* — and the game does not ask it.
   This is the single best unbuilt scene in the mystery: it would price `VANE_ACCEPT` (§14.11), stage
   the conversation §14.9 assumes, and give Wren a reason to be the one who absolves at T9.
7. **T3, seat 6.** A soldier blocks Redmoor so nobody can reach it, and Vane's seal is Redmoor's
   colour (§13.H). The Seer already reports the soldier (`companion/ch1.js:127`) and the Reader
   already reads the roll. One of them noticing the colour is two words and answers three open
   questions.
8. **T5, the rope.** Nobody ever asks the captain, Vane, or Marrow whether it was real (§13.E).
   Marrow is in her study an hour later and is given no line about having been threatened with
   hanging.
9. **T9, the public asking.** Vane breaks his own written promise on screen (§13.C, §14.7) and not one
   of the nine people present says so. Wren, who absolves everybody, is the right mouth for it:
   *"You said nobody would know."*
10. **T10, E0–E3.** Four endings in which the Crown's Envoy, his soldiers, his writ and his principal
    simply cease to exist (§12.30). The Cold's disposition changes radically on each, and the party
    that wanted it opened is not mentioned once.
