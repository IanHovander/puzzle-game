# EPISTEMICS — **What the Hearth is, and what it costs to keep**

> ## ⚠ TOTAL SPOILERS
> Every reveal in the game, including the Finale's and all five endings. Author-facing working
> document. Companion to `CANON.md` (ground truth) — this file is *belief*, and never restates truth
> except to say who is wrong about it.

**Scope.** One mystery, thirteen propositions, eleven spine points, every stakeholder. Truth lives in
`CANON.md` §5, §7.3, §8. This file answers only: *who holds which of these thirteen, when, how
confidently, what they think the others hold, and what they will not say.*

**Method note.** `REFUSED_OATH` is treated as **unsworn**, never as *refused* (`CANON.md` §13.16).
Branch-dependent rows carry their flag. Inference not in the source is marked **[PROPOSED]**.

---

## 0. THE PROPOSITION LEDGER

Every cell below refers to these by number. "Knows" = has it as fact from a reliable channel;
"believes" = holds it without a channel that could confirm it.

| # | proposition | where it becomes knowable | tier |
|---|---|---|---|
| **P1** | The Hearth is a fire left on top of a wound to hold it shut. | T1, public, first line of the game | NARRATION `ch0.js:49-50` |
| **P2** | It has burned four hundred years; it went out once, fourteen years ago, and left a child. | T1, public | NARRATION `ch0.js:51-53` |
| **P3** | It is failing **now**. | T1 (flicker), T7 (stated flat) | NARRATION `ch0.js:68`; CLAIMED BY Marrow `ch5.js:250` |
| **P4** | If it goes out, **the Cold Ember lights it again**. | T3/T4 | CLAIMED BY Marrow, uncorroborated, `ch1.js:309`; `ch2.js:188` |
| **P5** | **Four** people closed the wound, not one. | T4 (opt. `CH2_STRIP='right'`), T6 (opt. TAPESTRY/LETTER_READ), T8 (certain) | `ch2.js:319`; `ch6.js:827` |
| **P6** | Closing it **spent their Sight** — they came up grey. | T6 only via Mere's sheet (`LETTER_READ`); otherwise T10 | DOCUMENT `companion/ch4.js:62`; NARRATION `ch8.js:287` |
| **P7** | **The Hearth *is* those four people.** "The fire is only what they left behind." | T8 | NARRATION `ch6.js:828`, `:839` |
| **P8** | **It is dying because four people is a finite quantity of fire.** Nobody did anything wrong. | T8 | CLAIMED BY Marrow `ch6.js:850` |
| **P9** | In 212 the seal failed; renewal cost **four Masters their Sight**; the Convocation refused, struck Law 0, sent **one Warden down alone**. | T8, Binder's Book only | DOCUMENT `companion/ch6.js:286-287`; `lore.js:57` |
| **P10** | The 212 body **forged the physical record**: vault rebuild, bricked road, overpaint, translation. | T4 (fragments), T6 (picture), T8 (motive) | `ch2.js:209`, `:346`; `ch4.js:533`; `lore.js:75` |
| **P11** | Marrow's Sealing **holds but does not close**; the last step is not hers. | T8 | CLAIMED BY Marrow `ch6.js:629` |
| **P12** | The price payable **tonight** is four Sightings, paid by four hands writing COLD. | T9 (and only on four private phones) | `lore.js:57`; `companion/ch7.js:185-188`; `ch7.js:740` |
| **P13** | Wren is the hollow — the school's **alternative** price, one child instead of four Masters. | T9 | `ch7.js:697`; `ch8.js:499` |

**The shape of the mystery in one line.** P1–P4 are the school's story and are public. P5–P8 are the
truth and are withheld by one person. P9–P10 are the crime and live on one phone. P12–P13 are the
bill, and the game hands it to four players privately, thirty seconds before it is due.

---

## T0 — before play

*State of the world as ch0 opens. Nothing revealed to anyone.*

| who | Knows | Believes (confidence) | Wrong about | Believes about others (nested) | Withholding — from whom / why | Would say if asked directly | Changed since |
|---|---|---|---|---|---|---|---|
| **Wren** | P1, P2, P3 (public). **The stone's true reading, and that it is about Wren** — "I have had years to get used to it" (`ch7.js:404`). All four of the four's private anomalies, "for years" (`ch0.js:226`). Facts only one seat can perceive — the lamp's hum, the cuts under the brass, the Binder's ring rule (`ch0.js:172-174`; unexplained, §12.21). | That the night ends with Wren walking in — high, settled, grieved-through. **[PROPOSED]** That the fire is *somebody*, not something: Wren addresses it as a person who can take offence (`ch6.js:473`). | Nothing established. Wren is the only character in the game who is never shown holding a false belief about the Hearth. | Thinks **Marrow** knows what Wren is and what the stone says, and is not going to say so. Thinks **the four** each carry one anomaly and have each invented a private excuse for it — correct in all four cases (`ch0.js:226-227`). Thinks **the four believe those excuses**; they do (`companion/ch0.js:99`, `:112`, `:124`, `:145`). | From the four: everything, for seven years — *protecting them* from having to carry it. From Marrow: nothing; Wren has simply never made her say it. | "It's the fire. It's four hundred years old and it's got my name in the small print." |  — |
| **Provost Marrow** | P1, P2, P3. P10's political content — "They could not afford four Masters, so they made it grammar" (`ch7.js:396`). What is under the paint; she scraped it herself as a girl (`ch7.js:394`). The Founders' operational practice: blind ringing, one caller and three ringers (`ch6.js:594`). **How to read the stone from its foot** (`ch6.js:824`). That "the ring has been ready for fourteen years" (`ch7.js:367`). That the vault rebuild "was not honest" (`ch2.js:189`). | P4 — she asserts it and nothing corroborates her. Whether she *knows* it or is telling the school's story to herself is undecided (§12.13). That Wren walking is the only available price — high, held fourteen years. | **[CONTRADICTION-adjacent, the biggest in this mystery]** Either she is wrong that one child suffices, or she knows the stone says *four* and has spent fourteen years preparing *one*. The game never adjudicates. See §A2 below. | Thinks **the nine** hold the Order's reading and would not pay the real price — the same refusal as 212. Thinks **Vane** knows what is under the paint and will use it (correct, `ch1.js:138-139`). Thinks **Wren** does not yet know its own origin — **wrong**; Wren has known "since the laundry" *by T5*, and by T0 already knows the stone (`ch6.js:689`; `ch7.js:404`). | From everyone: P7, P8, and that she can read the stone. *Protecting herself* — naming it makes fourteen years a decision rather than a duty. From the nine: "the thing I have never named to you" (`ch4.js:592`). | "It is a fire. It has burned four hundred years and it will not burn four hundred more. Ask me something I can act on." | — |
| **Lord Vane** | P1, P2, P3. **P5 and P10's picture** — four figures, no child, the fourth carrying COLD — for twenty-two years (`ch7.js:341`). That the Convocation exiled him for saying so. | That the Cold is a resource and the school's secrecy is politics, not price — high. That Marrow is hiding something he can name in one sentence — certain, and he is right. | **P6 and P12 — the cost.** Nothing in the game gives Vane the price. He negotiates for a thing he believes is *negotiable*, which is only true if it is free. This is his whole tragedy and the game never says it aloud. **[PROPOSED]** | Thinks **Marrow** knows what is under the paint (correct) and is protecting the institution rather than a child (**wrong** — she is protecting the child *as* the institution). Thinks **the Convocation** would rather not know (correct). | From the Hall: *nothing* — he is the one character who tried to tell and was punished. From the four, later: only whom his letter went to (`companion/ch7.js:182`). | "It is a fire your school lies about. I have seen what is under the paint." | — |
| **the Reader** | P1, P2, P3. Wren's name is chalked twice on the dormitory door, the second in an alphabet nobody teaches, **in the same hand** (`companion/ch0.js:99`). | That somebody was being funny, a year ago. "**You have never asked who.**" | That the second chalking is a joke. | Assumes the other three noticed nothing about Wren — wrong in three ways. Assumes **Marrow** knows what the stone says because she is the Provost and that is a Provost's job — an unexamined institutional trust. | From the other three: the chalking, for a year — *not having words for it*, and mild embarrassment. | "It's the Hearth. It's four hundred years old. Everyone knows that." | — |
| **the Listener** | P1, P2, P3. Has **never once** heard Wren's heart, through anything, anywhere (`companion/ch0.js:112`). | That the fault is in their own ear. | That their gift has failed exactly once. It has not. | Assumes nobody else has noticed anything, and that admitting it would expose a defect in the one thing they are for. | From everyone, for years — *protecting themselves*; the rationalisation is shame-shaped. | "The fire? It hums, like everything else. Don't ask me about Wren." | — |
| **the Seer** | P1, P2, P3. Wren's shadow falls **toward** every fire (`companion/ch0.js:124`). | A trick of the light — months old, and weakening. | That it is the light. "**It is not the light. It never was.**" | Assumes the other three would say so if they saw it; concludes they do not see it; concludes it is not there. | From everyone — *protecting themselves* from being the one who is wrong about shadows. | "It's a fire in a hall. What I want to know is why it throws Wren the wrong way." | — |
| **the Binder** | P1, P2, P3. Wren has **no thread at all**, in either direction — and it is "not unbound. You know unbound" (`companion/ch0.js:145`). Keeps the Book of Laws, which **contains struck Law 0 from the Prologue onward** (`lore.js:57`; `companion/book.js:123`). | A blind spot in their own gift. | That their gift has a blind spot. "**Your gift had a blind spot. It does not.**" (`companion/ch7.js:260`) | Assumes the other three's gifts are whole and theirs alone is holed. | From everyone: "**You have never told anyone your gift has a blind spot.**" — *protecting themselves.* | "There's a Law in my Book about the cold word that's been struck. Nobody's ever explained it." | — |
| **Master Sorrel** | P1–P3. That the Cold Ember exists and is under the school, and that it is institutionally valuable. | That the Ember is a Convocation asset the Chair is hoarding. | P4's ownership question, and everything from P5 down. | Thinks **Marrow** will send for the Ember (she will — but she has not decided it yet; §13.26). | Her price, until the vote is counted. | "The Ember is the school's, and the school is nine people, not one." | — |
| **Master Oriel** | P1–P3. **P10 by autopsy**: she scraped the overpaint as a girl with a bread-knife, and watched them repaint it inside the week (`ch4.js:588`). | That the school is lying about something under it, and that the liars are still employed. | P6, P7, P8, P9. She has the forgery and not the motive. | Thinks **Marrow** knows more than she says (correct). Thinks the other Masters do not want to know (correct). | From the Convocation: that she ever scraped it — undated, and she puts it in a note under a cushion rather than in the Hall. | "It is a fire with a lie painted over it. I took a bread-knife to the lie once. It grew back." | — |
| **the other six Masters** | P1–P3. | The Order's reading. | P5–P13 entire. | Each thinks the Chair has a plan and that not asking is the safe seat. | — | "One born of four. It is on the stone." | — |
| **Mere** (dead; in the fire) | Everything: P5, P6, P7. Her own sheet: "**We were four. I offered to go alone and was refused. One was never asked. We wrote the cold glyph with four hands, and came up grey.**" (`companion/ch4.js:62`) | — | **Unknown whether the Founders knew P8** — that four people is a finite quantity and would run out in four centuries. Nothing in the game says. If they did not, the Founders are wrong about the only thing that matters. **[PROPOSED, and the richest open question in this mystery]** | Wrote Laws to survive being overruled (Law 3) — i.e. **believed a later body would try**, and was right by 212 years. Left a hidden door "for people who were not asked" (`ch5.js:287`) — i.e. anticipated exclusion as a recurring institutional habit. | Signed "who kept the fire, **after**", and nobody in four hundred years has remarked that a walker came back (§12.15). | "We were four. I offered to go alone and was refused." | — |
| **the 212 Convocation** (dead) | **P6, P9, P12 exactly and completely.** They are the only body in the game's history that knew the full price and priced it. | That one Warden alone would do — and it did, for 188 years. | That striking a Law removes it. The Book still carries Law 0, struck and dated (`lore.js:57`). | Believed the school could be taught a translation and would keep it. Correct for four hundred years. | From posterity: everything — vault, road, paint, translation, Law. *Protecting themselves.* | "Four Masters, four Sightings. We would not pay it." (`companion/ch6.js:286`) | — |
| **the school / the Order today** | P1–P3, and the Order's translation, taught to every child (`ch0.js:62`). | "One born of four shall walk into the Cold." Held as scripture and argued about as scholarship. | P5 through P13. The institution is **wrong about its own foundation** and maintains the error actively: a scraped overpaint is repainted "inside the week" (`ch4.js:588`). | Believes the Provost knows what the stone means and will say when it matters. | — | "Every child here learns the school's translation, and every grown-up here argues about it." | — |

---

## T1 — ch0 cold open + prophecy stone

*Revealed to the table: P1, P2, P3, and the Order's translation.*

| who | Knows | Believes | Wrong about | Believes about others | Withholding | Would say if asked | **Changed at this point** |
|---|---|---|---|---|---|---|---|
| **Wren** | unchanged | unchanged | — | unchanged | unchanged | "It's flickering. That's me, probably. Everything is." | Nothing in Wren's state. **The flicker is new to the world, not to Wren's model of it** — Wren has expected this since before the game. |
| **Marrow** | unchanged. She is not present. | — | — | — | — | — | Nothing. |
| **the four** (all seats) | **P1, P2, P3 as a set, for the first time as an assertion rather than a background fact** (`ch0.js:49-53`, `:68`). That the Hearth is flickering "for the first time in fourteen years." | That the prophecy is about Wren — "Nobody agrees what the rest of it means. **Everybody agrees who it is about.**" (`ch0.js:63`) | **The Order's reading — "one born of four"** — which is the load-bearing false belief of the entire cast. It is installed in the player and the characters simultaneously and in the same sentence. | Each still assumes the other three noticed nothing about Wren. | still each holding one anomaly | "It's flickering. It's never flickered. That's in the first sentence they teach us." | The stone becomes an **object** rather than a decoration, and it is delivered pre-mistranslated. **The narration itself declines to flag the translation as the Order's** — the attribution exists only in a variable name and an art caption (`lore.js:75`; `scenes-ch0.js:78`). |
| *player-facing note* | — | — | — | — | — | — | **[CONTRADICTION]** `ch0.js:51-52` asserts and retracts an absolute in consecutive sentences ("It has never once gone out. / Except one night, fourteen years ago") — §13.24. And `ch0.js:62` says "**Nobody alive has read the cuts**" fifteen lines before establishing a character who reads any worn carving (§13.2). Both land on *this* mystery. |

---

## T2 — ch0 lamp lit → the four speak

*Revealed: the lamp lights the old way (ASH, EMBER, four hands); the four each name their anomaly aloud.*

| who | Knows | Believes | Wrong about | Believes about others | Withholding | Would say if asked | **Changed at this point** |
|---|---|---|---|---|---|---|---|
| **Wren** | unchanged — and now **knows the four have said it out loud**. | That the four will now stop pretending: "You can stop pretending you didn't notice." | — | Now knows each of the four knows the other three have an anomaly too. Wren engineered exactly that. | Still: that Wren wants to be saved. Still: the stone. *Protecting them from a request.* | "Yes. All four of you. I've known for years." (`ch0.js:226`) | **Wren's concealment converts from private to acknowledged.** Cause: Wren says the line. Note that **Wren knew all four seats' private perceptions before any of them spoke** (`ch0.js:172-174`) and nobody in the fiction asks how — §12.21, the largest unremarked anomaly in the game. |
| **the four**, as a body | **Four hands are structurally required**: "Four hundred years, and it needed all four of you: one to read it, one to put it in order, one to find the cuts, one to know the rule." (`ch0.js:214`). The lamp's word is **ASH, EMBER — "*Fire, keep.*"** (`ch0.js:216`). That each of the other three carries an anomaly about Wren. | That the four-hands rule is a **school ritual**, not a physical law. | That it is ritual. It is Law 0's shape, four hundred years early, and no one names the connection until T8. | Each now knows the other three were also silently rationalising. **None of them yet connects "four hands" to "four Founders."** | The Listener still withholds *whose* heartbeat is missing (still true at T9: "You have still never said aloud which one is missing", `companion/ch7.js:246`). | Reader: "It took four of us to light a lamp. That is apparently normal here." | The **four-hands motif is planted and not explained.** This is the single best breadcrumb the game has for P5/P12, and it is laid at T2 — excellent. It is never called back in prose at T8. |
| **the Reader** | The lamp's two shapes. | rationalisation weakening | — | — | — | — | Names the chalked door aloud for the first time in a year. |
| **the Listener** | The lamp has hummed "since before we were born" (`ch0.js:172`). | — | — | — | — | — | Says the missing heartbeat aloud. Does not say it is Wren's. |
| **the Seer** | There is something cut under the brass "nobody has ever seen." | — | — | — | — | — | Says the shadow aloud. |
| **the Binder** | The ring rule "nobody else was taught." | — | — | — | — | — | Says "no thread" aloud. The Book on this phone **already contains struck Law 0** and the Binder has not been asked to read it. |
| **Marrow, Vane, the Masters** | absent | — | — | — | — | — | Nothing. |

---

## T3 — ch1: Vane's writ, "what is under the paint", the vote, the Ember named

*Revealed: P4 (Marrow's claim); that Vane holds a secret about the paint; that the Hearth bows
mid-Vigil and Marrow does not look at it.*

| who | Knows | Believes | Wrong about | Believes about others (nested) | Withholding — from / why | Would say if asked | **Changed at this point** |
|---|---|---|---|---|---|---|---|
| **Marrow** | unchanged. Adds: the vote's outcome; whether the four promised Sorrel, Oriel or neither. | That she has until the fire dies, and that it is closer than she has told anyone. | — | Thinks **Vane** will spend the paint in public and is right within ninety seconds. Thinks **the nine** would refuse the real price — the 212 refusal, restaged. Thinks **the four** believe the Ember errand is an errand. Correct. | **P7, P8, P11 and her own literacy** — from everyone. Newly: *she quotes the reading she knows to be false, to the Convocation's face*: "The stone over your heads says **one born of four**. Tonight I stop arguing and **show you**." (`ch1.js:124`) Nothing is shown (§12.42). | "Under this school the Founders left the Cold Ember. If the fire goes out, the Ember lights it again." (`ch1.js:309`) | **She introduces P4 and changes her mind about timing mid-sentence**: "In the morning I would have sent — no. Tonight." (`ch1.js:310`). Cause: the second flicker, "a cough." She now has a clock she will not name. |
| **Vane** | unchanged | That the Crown's leverage is the Cold, not the child, and that the child is the lever for the Cold. | still the price (P6/P12) | Thinks **Marrow** will not say the word in front of nine Masters — correct, and it is why he says it at half-volume. Thinks the **Seer** is the seat that can confirm the paint, and says so unprompted (`ch1.js:283`) — **he knows the school's own gift partition better than the school uses it.** | Whom he offers masterships to, and (on `VANE_ACCEPT`) that the four are bought (`companion/ch3.js:236`). | "I have seen what is under the paint in this hall, Ilsabet." (`ch1.js:138`) | He **converts a twenty-two-year grievance into a public lever** and gets exactly the reaction he wanted: "Nobody knows what that means. **Her face does.**" |
| **Wren** | unchanged | That the vote is not really about the vote | — | Knows **Marrow** is watching Wren and not the fire, and that this means she has already decided. Knows **Oriel** was "doing a sum" about Wren (`ch1.js:306`) and does not know what sum (§12.62 — never resolved). | Fear, entirely — "does not fidget once" (`ch1.js:243`) against the established baseline (`ch1.js:127`). *Protecting the four.* On `VOTE_LOST`: "It's fine. They have a warm room. I've never had a warm room." — "**Wren is lying, and is fourteen, and is doing it for you.**" (`ch1.js:302-303`) | "I'm the thing they're all coming to look at. I don't get a say. That is the entire job." (`ch0.js:156-157`) | Nothing epistemic. Wren's **duress meter** starts running. |
| **the four** | **P4 as an assertion from the highest authority in the building.** That a Master's vote can be bought, followed, blocked or pledged (phones). That the Hearth bows and the Provost alone does not look at it (`ch1.js:147-148`). | That the Ember is a working insurance policy, because the Provost said so and there is no way to check. | **P4.** They will carry it for six chapters and never test it. Nobody ever tells them it is unverified. | Believe **Marrow** knows what the fire is and will say if it matters — **the belief the whole night rests on, and it is wrong in the second clause.** Believe **Vane's** paint remark is a political insult, not a fact. | (branch `VANE_ACCEPT`) one seat is withholding that they took the Crown's offer — from the other three. | Binder: "The Provost says the Ember relights it. I'd like to see the Law that says so." | **The Ember becomes the object of the night.** Its function enters the table's model on one person's word and is never corroborated (§4.3). This is the mystery's **decoy**, and a good one. |
| **Sorrel** | unchanged + the vote | That the Ember belongs to the nine | P5–P13 | **[CONTRADICTION §13.26]** She predicts the errand and the couriers *before Marrow decides*: "When the Provost sends you down for it…" (`ch1.js:255`) against `ch1.js:310`. **Her belief state at T3 contains a fact that does not yet exist.** | — | "Under this school is a thing called the Cold Ember… it comes to the nine of us — the Convocation. Not to her." | New: she has a claim on the object the four are about to fetch. |
| **Oriel** | unchanged | That whatever is below will corroborate her bread-knife | P6–P9 | Thinks the four will be *sent* somewhere she has never been allowed. Correct. | That she scraped the paint — she will only put it in writing, under a cushion, on the branch where they promised her (`ch4.js:588`, `ORIEL`). | "Tell me what you find down there. **All of it.** Even the parts you don't like." | Buys the truth in advance, for a price she does not name. The **only Master who tries to enter the epistemic chain at all.** |

---

## T4 — ch2: the Founders' Door, the Vault, the Cold Ember, the bricked road and **212**; (opt.) Mere's niche and the rubbing

*Revealed: the antechamber is a forgery; the vault predates the school; the Ember is real and inert;
a road continues past an arch stamped 212. Optionally: a Founder has a name, and the stone says four.*

| who | Knows | Believes | Wrong about | Believes about others | Withholding | Would say if asked | **Changed at this point** |
|---|---|---|---|---|---|---|---|
| **the four**, as a body | The vault is "older than the school on top of it" (`ch2.js:284`). The floor is **newer than the room** and four plinths stand in a derangement — not one Founder faces its own hole (`companion/ch2.js:141-142`, `:157`). A Founders' road **continues**, bricked shut with newer stone, stamped **212** in plain view (`ch2.js:346`; `scenes-ch2.js:100`). The Ember is real, cold, unwarded, and **leans toward whoever holds it** (`ch2.js:337-338`). | That the rebuild hid something, because the Provost told them so before they went down. | still **P4**, and still the Order's reading. | Believe **Marrow** knows what the rebuild hid. **She does** (`ch7.js:396`) — and she sent them into it with the word "not honest" and no noun. | — | Seer: "The floor is two hundred years younger than the room and every statue is standing in the wrong place." | **They now hold P10's physical evidence and none of its meaning.** The year 212 is on a wall, in numerals, and the Binder's Book contains **three Laws dated 212** — and nothing in the chapter asks anyone to put those two facts side by side. See §B1: the largest untapped scene in the mystery. |
| **the Reader** (branch `CH2_NICHE`) | **A Founder has a name: Mere** (`ch2.js:301`). (branch `CH2_STRIP='right'`) **P5**, stated by a Founder's own stone: "KNOT, CROWN, THORN — **four, as one, went through. Not one.** And the stone above the Hearth has said one born of four for four hundred years." (`ch2.js:319`) | — | If they read it left-to-right instead: they are told they have just reproduced "the reading the school teaches" and that the mark is at the other end. The game **prices the wrong answer as an education**, which is excellent. | — | (branch `LETTER`) The Reader takes a rubbing of a sheet they cannot read and **keeps it anyway** — a deliberately held unknown. | "There is a name on the back of a plinth, and a stone here that disagrees with the stone upstairs." | **On the optional path, P5 enters the game four chapters before it is confirmed — and carries no mechanical weight whatever** (Appendix A: `CH2_NICHE`, `CH2_STRIP` are written and never read). The game's richest discovery has no footprint. **[WITHHOLDING → the author]** |
| **Marrow** (offstage) | unchanged | — | — | Believes the four will bring back the Ember and a description of a dishonest room. Does not expect them to find Mere. **[PROPOSED]** | That she knows precisely what 212 did and why. *Protecting herself and the plan* — naming 212 to four children invites the question "then why are we not paying it?", which she cannot answer without P12. | "That vault was rebuilt once, and the rebuilding was not honest." (`ch2.js:189`) | Nothing in her state. Her **withholding becomes active rather than passive**: she supplies the pointer and removes the referent. |
| **Wren** (present from `ch2.js:358` onward) | unchanged | — | — | — | Still everything. Takes a fall and an arm for the Ember's box (`ch2.js:372`, `WREN_HURT`). | "You *left* without me. Also you dropped this." (`ch2.js:360`) | If `WREN_HURT`: Marrow's one unfinished sentence in fourteen years fires — "**Who did —**" (`ch2.js:396`), the only leak in her composure all night. |
| branch `EMBER_LOST` | The four know the Ember is **gone** — dropped (`ch2.js:370`) or taken by Sorrel's guards (`ch2.js:383`). | — | — | — | — | — | **The party has lost the only stated defence against the exact event of T9, and no character ever says so.** The game's own prose declines to price it: "the blue light is brighter. Then it is not." (§12.13). See §B2. |
| **Sorrel** (branch `SORREL`) | That she now holds the Ember. | That it is a Convocation asset. | Everything about what it is for. | — | — | — | She takes the object and the story goes on without her. **No Master ever learns anything about this mystery on any path.** |

---

## T5 — ch3: the corridors, the laundry, Wren's four whispered questions

*Revealed: nothing new about the Hearth. Revealed about Wren: four private questions, four private
answers. This is the mystery's one quiet row — and it is where Wren's own knowledge is confirmed.*

| who | Knows | Believes | Wrong about | Believes about others (nested) | Withholding | Would say if asked | **Changed at this point** |
|---|---|---|---|---|---|---|---|
| **Wren** | **Now confirmed in-fiction: Wren knows what Marrow is and where Wren came from "since the laundry"** (`ch6.js:689`; `ch8.js:330`). Knows exactly which of the four lied: "Thank you. All of you. **Even the ones who lied.**" (`ch3.js:530`) | — | — | Now knows, per seat, whether that seat will tell Wren the truth under pressure. **Two levels: Wren thinks the Reader thinks Wren does not know the true meaning of Wren's own name** — and asks for it anyway, phrased to expose the gap: "properly. **Not the Provost's version.**" (`companion/ch3.js:284`) | **That Wren already knows all four answers.** The Second Asking at T8 will confirm: "Four answers, and all four were the ones I already knew" (`ch6.js:688`). *Protecting them* — the questions are a gift, not a test. | "Do you think I'm really the one?" (`companion/ch3.js:294`) | **Wren's knowledge of P13 is fixed and dated here.** The laundry is the hinge: everything Wren says afterwards is said by someone who knows. |
| **the four** | Nothing about the Hearth. The **Gallery portraits mutter, and the Listener catches three words: "*four went down.*"** (`ch3.js:440`) | Each seat now privately believes something about whether Wren is "the one." | Still the Order's reading; still P4. | Each seat believes the other three answered Wren honestly, or does not know. The channel is sealed (`lore.js:32-36`). | Per seat, whatever they chose not to say to Wren. *Protecting Wren, or themselves — the game does not distinguish and neither does Wren.* | Listener: "The paintings said *four went down*. Four of what? Down where?" | **The single best free breadcrumb for P5/P7 fires here and is never picked up.** The portraits are ~200 painted Masters muttering the truth, on the Listener's phone, and no character reacts. §B3. |
| **Marrow** | Adds: whether the four surrendered Wren to the captain (`SURRENDERED`). | — | — | On `SURRENDERED`: "After tonight I will decide what you are" — she now has a doubt about the couriers she is about to ask for an oath. | Still all of it. She is ringing the bells herself and putting out every lamp between the Gallery and the Tower personally (`ch3.js:445`) — **physically doing the work of a Sealing's overture without telling anyone that is what it is.** | "There is a ward on the door of the Bell Tower, older than the school." (`ch3.js:444`) | Her plan becomes visible as *a plan* — twelve turns bought, lamps doused, a route. The four still read it as a chase. |
| **Vane** | Adds (via the captain): whether the four fought, talked or surrendered. | — | — | Instructs the captain to let them "go about it however you chose" (`ch3.js:399`) — he is **testing whether a promise holds**, not trying to win the corridor. | — | "I keep my promises. Do you keep yours?" (`ch7.js:494`) | Nothing about the Hearth. |
| **Bess** | That the Provost is moving children through her laundry at night, and has for thirty years been sworn to her (`companion/ch3.js:238`). | — | Everything. | — | Everything, by not looking up (`ch3.js:500`). | *nothing — she never speaks* | **The one adult in the building who chooses not to know.** Structurally the school's whole relationship to this mystery, in one silent woman. |

---

## T6 — ch4: the study's four secrets; the Warden's Oath and its lock

*Revealed (all optional, one per seat): the journal; the memory-bell; the tapestry under the paint;
the grey thread. Then an oath sworn to a Chair, by people who have not been told the price.*

| who | Knows | Believes | Wrong about | Believes about others (nested) | Withholding — from / why | Would say if asked | **Changed at this point** |
|---|---|---|---|---|---|---|---|
| **the Seer** (branch `TAPESTRY`) | **P5, pictorially and certainly**: "Four walk into the fire. **No child anywhere in it.**" — four figures, the fourth carrying COLD, the second turned back, four shadows, replaced by one child casting none (`ch4.js:216`, `:536-537`; `scenes-ch4.js:47-75`). And that Vane was telling the truth: "'I have seen what is under the paint,' the Envoy said. **So he had.**" (`ch4.js:557`) | That the school has been lying for a long time and in every hall. | Still P6, P7, P8 — the picture shows *four*, not *what it cost them* and not *what became of them*. | **Two levels: the Seer now knows Vane knew, and knows Vane knew that the school knew.** The Seer's model of Vane inverts in one line. | — | "There are four people in that picture and somebody painted a child over them." | **P5 becomes certain for one seat, and `LAW0` is set** (`ch4.js:85`). The Binder's Book silently gains a restored Founders' Law — **and the Binder is not told why, because the knowledge is in the Seer's eyes and the Law is on the Binder's phone.** The partition works against the fiction here. |
| **the Reader** (branch `LETTER` + journal solved) | Sets `LETTER_READ` (`ch4.js:498`) and is told the sheet "will be in your **Book** from here on." **It will not be — it renders only from ch5** (`companion/ch4.js:71`; §13.18). Also reads the journal: "IT SLEEPS WITH THE WINDOW OPEN. IT LAUGHS AT MY JOKES." (`ch4.js:211`) — and the pronoun. And, on the Vigil roll, **WRENN: "the hollow of a bell — the space inside it that makes the sound."** (`companion/ch4.js:202-204`) | That "it" is a way of not saying something, not a way of not caring. | **That they misread the name a year ago.** They did not. | Thinks **Marrow** wrote *it* and meant *it*. Wren corrects the reading by having a different one: "She writes *it*. And then she writes **that**." (`ch4.js:497`) | The name's meaning — **the Reader has it a chapter before Wren asks for it at T8 and says nothing in between.** | "The Provost's own primer says the child's name means *hollow*." | **The name's meaning enters one head.** P6 is promised and not delivered — the price is one chapter away, on one phone, on an optional branch. |
| **the Listener** (branch `MEMORY`) | **The Crown's aim, verbatim**: "The Crown will have the Cold open, one way or another." And Marrow's answer: "Then the Crown will go through me. **And through it.**" (`companion/ch4.js:213`; `ch4.js:215`) | That "it" is the Cold. | Probably. The referent is never supplied (§12.45) and **Wren fixates on it**: "Through *it*. She said through it." (`ch4.js:524`) | Thinks **Marrow** says things to Envoys she will not say to Wren — Wren says exactly that: "She never says things like that to my face. **Only to Envoys.**" | The bell "keeps every voice in this room **but one**" (`companion/ch4.js:227`) — still never said aloud. | "She told the Crown it would have to go through her. And through something else." | **Marrow's resolve is confirmed by an independent channel**, and one word of it is left unexplained on purpose. The chapter's strongest hook, unpaid (§12.45). |
| **the Binder** (branch `GREY`) | **Marrow's thread to Wren is grey** — "the colour of someone who has already said goodbye" (`ch4.js:217`) — and hers to the four is **red, and not tied yet** (`companion/ch4.js:264`). That a thread reaches Wren and **nothing comes back** (`:271`). | That the Provost has already lost Wren and is proceeding anyway. | That Wren's absent thread is the Binder's own defect. | Has "decided long ago not to look" at the Provost-to-Wren thread (`companion/ch3.js:276`) — a **deliberate epistemic abstention**, and the only one in the party. | That their gift has a blind spot — from everyone, all night. | "She said goodbye to Wren fourteen years ago and has been carrying the thread ever since." | **The cost of keeping the Hearth acquires a human colour before it acquires a number.** This is the mystery's best emotional breadcrumb and it is entirely non-verbal. |
| branch `ORIEL_NOTE` | **P10 from an independent living witness**: "I scraped that paint myself, as a girl, with a bread-knife. **They painted it back inside the week.**" (`ch4.js:588`) | — | — | The four now know at least one of the nine knows. | — | — | The cover-up becomes **ongoing** rather than historical. |
| branch `MARROW_LETTER` (`NEITHER && !VANE_ACCEPT`) | **That Marrow has never named the thing below to her own Convocation**: "To the nine. Tonight I go down to the thing I have never named to you." (`ch4.js:592`) | — | — | **Two levels, and the game's sharpest: the four now know that Marrow believes the nine do not know, and that she intends to keep it that way.** They are holding her withholding in their hands. | They never mention finding it. | "She wrote to the nine and never sent it. She has never told them what is down there." | **The only surface on which Marrow's withholding is visible as withholding before T8** — and it is on the branch that requires refusing both Masters. |
| **the four**, as a body | They swear (or do not) **"to see the child into the Cold"** (`ch5.js:251`), choosing a lock: KNOT (cannot be unbound) or EMBER (reconsiderable). | That they understand what they are swearing to. | **They do not.** They have P1–P4 and the Order's reading. They are swearing to deliver a child to a price nobody has named. | Believe **Marrow** would tell them if it mattered — she invites argument ("Read it. **Argue.**", `ch4.js:355`) **from a party she has given nothing to argue with.** | Per seat, the lock choice: "The one you swear to cannot tell the difference. **You can.**" (`companion/ch4.js:262`) | Binder: "We swore to a Chair, and we still don't know what the fire is." | **The oath is the epistemic crime of the chapter.** See §A4. |
| **Marrow** | Adds: that she was away and came back "early, and does not say why" (`ch4.js:607`, §12.44). Which lock the four chose — **though Law 4 says she cannot know** (§13.14). | — | — | Thinks the four have found some of her study and cannot tell which. Puts a hand on the nearest shoulder when they swear KNOT — "**Nobody has seen her do that before.**" (`ch4.js:749`) | Everything, still. Newly: she has now taken an oath from four children about a transaction she has not described. *Protecting them* — and *protecting the plan* from an argument she would lose. | "Read it. Argue." | The **first physical tenderness of the night**, attached to the moment she binds them. |
| **Vane** | unchanged | — | — | — | — | — | Nothing. He is offstage for the chapter and his one sentence from T3 is vindicated behind his back. |
| **Wren** | unchanged — Wren is in the room for all four corners and reacts to each. | — | — | **Two levels: Wren knows the four now hold pieces of the answer and knows they do not know they hold pieces of the answer.** Wren's reaction to the tapestry is the question the party should be asking: "Four of them. **Where is the one born of four? Where am I?**" (`ch4.js:558`) | Still everything. | "There is no child in it." | **Wren asks the mystery's central question out loud at T6 and nobody answers it.** Deliberate, and it works. |

---

## T7 — ch5: Mere's gates, the Under-Marches, the four thrones, the Founders' Count, the stair

*Revealed: P1 and P3 restated flat by Marrow; Mere named as one of the four who built the Hearth;
a drowned hall and four empty thrones; a Law older than the school that writes the cold word.*

| who | Knows | Believes | Wrong about | Believes about others (nested) | Withholding — from / why | Would say if asked | **Changed at this point** |
|---|---|---|---|---|---|---|---|
| **Marrow** | unchanged | — | — | Thinks the four now have enough to follow and not enough to argue. Correct. | **She states P1 and P3 flat and stops exactly one sentence short of P7**: "Under this school there is a wound. The Founders shut it and left the fire on top. / **The fire is going out. Tonight I take the child down and shut it again.**" (`ch5.js:249-250`) — *why* it is going out is the next sentence and she does not say it for another chapter. | "Under this school there is a wound. The fire is going out. Tonight I take the child down and shut it again." | **The single most efficient withholding in the game.** She gives the premise, the crisis and the plan, and omits the cause and the price. Cause: she is moving, the soldiers are above, and she has structured the night so nobody has time to ask. |
| **the four** | **P1 and P3 as fact, from the Provost, unhedged.** That **Mere** was "one of the four who **built the Hearth**" (`ch5.js:265`) — the first time the Hearth's makers are counted aloud on the Hearth screen. That there are **four empty thrones** above a drowned hall, and under everything the Cold "glowing like a sky from beneath" (`ch5.js:345-348`). | That the Provost can do this and that they are escorts. | **P4 is still in their model and is now irrelevant and nobody notices.** They are carrying (or have lost) an insurance policy against the fire going out, and the Provost has just told them the fire is going out, and **no character connects the two.** | Believe Marrow knows what she is doing. **Two levels: they believe she believes she can close it** — she says "shut it again" here and "I can close this wound" at T8 (`ch6.js:487`), and then "**Not closed — held**" (`:629`). | (branch `HOLD`) one seat is about to spend a Sighting and none of them is told that is what the night costs. | Reader: "She says the fire is going out and we are carrying the thing that relights it. Is nobody going to say it?" | **The fire's mortality becomes explicit.** And §B2: the Ember question is now unavoidable and is never voiced by anyone. |
| **the Reader** (branch `LETTER`) | **P6, from a Founder's own hand, at last**: "We were four. I offered to go alone and was refused. One was never asked. **We wrote the cold glyph with four hands, and came up grey.** — Mere, who kept the fire, after." (`companion/ch4.js:62`, rendering from `maxChapter >= 5`) | That "came up grey" means what it says. | — | **The Reader alone can now answer the mystery's second half — what it costs — and the Reader is never asked.** No scene in ch5, ch6 or ch7 solicits this text. The party's only Founder-voice document sits unread-aloud on one phone. | Nothing deliberate; **there is no prompt.** *Assuming it is already known* is the closest category. | "A Founder wrote that four of them went down and all four came back grey." | **The price enters the game.** One seat, one phone, one optional branch, a chapter late (§13.18). **[UNEARNED avoided by a hair, and only on `LETTER`.]** |
| **the Binder** | (branch `LAW0`, any route) **The struck Law is live in the Book**: "COLD is written by four hands… **Older than Law 6. The older binds.**" (`companion/book.js:127`; `companion/ch5.js:333`) | That the school's grammar is a younger body's overwrite. | — | **[CONTRADICTION §13.17] On branch `ORIEL` alone, the Binder holds this with no causal history whatever** — the party promised a Master information in Chapter I and a struck Founders' Law appeared in the Book. No information moved. See §A5. | — | "There is a Law older than the one they teach, and it says the cold word takes four hands." | **P12's legal half arrives.** The Binder now holds the *procedure*; the Reader (on `LETTER`) holds the *price*; **neither is asked to say it, and the two halves never meet before T8.** |
| **the Listener** | The portraits' corroboration, privately: "In the Gallery the portraits showed **four going down the stair and four coming back.** You have not stopped hearing it." (`companion/ch5.js:310`) | — | — | — | Has still never named whose heartbeat is missing. | "Four went down and four came back. That is what the paintings say." | **P5 *and* Mere's survival corroborated on one phone** (§12.15) — and no character ever remarks that a walker came back. |
| **Wren** | Adds: who volunteered to hold, and who did not. Knows **Mere's hidden door, its maker and its purpose**, and the way down three flights in the dark (`ch5.js:287-288`; unexplained, §12.29). | — | — | "Mere left this one for people who were not asked. **Mum will pretend she did not see.**" — Wren models Marrow's willingness to be disobeyed, and is right. | Still everything. Names the whole situation instead: "And I am the — what am I again? **The occasion.**" (`ch5.js:254`) | "Four thrones. Four Founders. It is a *theme*." (`ch5.js:349`) | **Wren jokes the answer into the room at T7** — four thrones, four Founders — and it is the closest the game comes to stating P7 before ch6. |
| branch `HOLD` (one named seat) | That a Sighting can be **spent and returned** (`ch5.js:551-552`; `ch6.js:590-591`). | — | — | — | — | "It came back like blood into a numb hand." | **A rehearsal of the exact price of T9, with the exact vocabulary, and nobody — not Marrow, who ties it off, not Wren — names it as one.** §B4. |
| **Vane** | That his soldiers are on the stair. | That he is winning slowly. | The price, still. | — | — | — | Nothing. |

---

## T8 — ch6: the Bells, the Second Asking, Marrow's confession, **the stone read from its foot**, Law 0 restored

*THE REVEAL POINT. P5, P7, P8 and P11 land here; P9 lands on one phone; P6 is confirmed by implication.*

| who | Knows | Believes | Wrong about | Believes about others (nested) | Withholding — from / why | Would say if asked | **Changed at this point** |
|---|---|---|---|---|---|---|---|
| **the four**, as a body | **P5** — the stone, read the way it was cut: KNOT · CROWN · ASH · WELL · VEIL · EMBER · ASH · COLD, "**Four, as one, go down with fire. What is kept stays behind. The fire is the hollow they left.**" (`ch6.js:827-828`). **P7** — "Four went down. Not one born of four — four, as one. **The fire is only what they left behind.**" (`ch6.js:839`). **P8** — "**Four people's worth of fire, and four hundred years to spend it in. That is the whole answer to why it is going out. Nobody did anything wrong. It was only ever four people.**" (`ch6.js:850`). **P11** — "It is held. Not closed — held. **The last of it is not mine to do.**" (`:629`) | That the Order's reading is a forgery, not a mistake. | **Still P12's application to themselves.** They know COLD takes four hands. Nobody has yet told them that writing it spends the writer. That arrives at T9, on four phones, privately. | **Two levels, and this is the chapter's payload: the four now know Marrow could read the stone all along** — on the `STONE_TOLD` branch she demonstrates it ("She kneels at the foot, puts one thumb in the first burn, and reads it the way the Founders cut it", `ch6.js:824`) — **and none of them asks how long she has been able to.** | — | Binder: "It is a bill. Year 0 paid it. Somebody later refused to pay it. My Book still has the invoice." | The mystery's whole spine lands inside sixty lines. **The table solves the smaller half (the count) and is handed the larger half (the identity and the economy) in prose.** See §C. |
| **the Binder**, alone | **P9, complete**: "Two hundred and twelve years after the Founders the seal failed. **Four hands meant four Masters giving up their Sight. The Convocation sent one Warden down instead.**" / "Four Masters, four Sightings. **The Convocation would not pay it. They struck the Law and called it grammar.**" (`companion/ch6.js:286-287`) | That the Order is a consistent character across two centuries. | — | Now knows the four Laws in the Book dated 212 and 340 are one body's self-portrait. **Nothing in the chapter asks the Binder to say P9 aloud.** | It is an opt-in `reveal` block: "Read when the Hearth says the Book has turned a page." **The crime of 212 is behind a tap-to-open on one phone.** | "In two hundred and twelve the bill came due and nine people decided a child was cheaper." | **P9 — the motive for the entire cover-up — enters the game here and only here, on one device, optionally.** §A6. |
| **Marrow** | unchanged. She has held P5–P11 throughout. | — | — | Thinks the four now have enough to follow her to the bottom. Thinks **Wren** has known "since the laundry" — **because Wren tells her so, here, and gives her leave** (`ch6.js:689`). | **Her withholding ends, in stages, and each stage is forced.** (a) P8: she says it only after the stone has said P7 for her. (b) Wren's origin: she tells it **kneeling**, "because the child gave her leave", and does not look up (`ch6.js:690-692`). (c) That she can read the stone: only when the four's reading budget is spent. **All three confessions are extracted, not offered.** | "Four people's worth of fire. Nobody did anything wrong. It was only ever four people." | **The single largest change in any character's disclosure state in the game**, and its cause is not evidence — it is *permission*: "Tell them. **You are allowed.**" (`ch6.js:689`) |
| **Wren** | Adds: which of the four will say the true thing to Wren's face. "Four answers, and all four were the ones I already knew." (`ch6.js:688`) | — | — | **Two levels: Wren knows Marrow believes Wren does not know, and relieves her of it before she has to find out.** The whole confession is stage-managed by the person it is about. | **Still that Wren wants to be saved.** *Protecting the four from a request.* Instead Wren asks for one more asking: "Then ask me a third time. **In there.**" (`ch6.js:863`) | "It's four people. I have been keeping warm on four people my whole life." | Wren converts from subject to **producer** of the reveal. Nothing Wren knows changes; everything Wren permits does. |
| **the Reader** | Confirms the name's meaning aloud for Wren — or lies. "A hollow. The space inside a bell, the part that rings." (`ch6.js:667`) | — | — | Wren asked this in the laundry and asks it again "out loud. **Look at me when you answer.**" | — | "It means a hollow." | The Reader's T6 private knowledge is made public by Wren's design. |
| **the Listener** | Answers whether Wren's heart can be heard: "No. I have never heard it." (`ch6.js:658`) | — | — | — | The fault-in-my-ear rationalisation dies here (`companion/ch6.js:255`). | "There is nothing there. There never was." | **A five-year private shame is discharged by the person it was about.** |
| **the Seer** | Answers the shadow. | — | — | — | — | "It falls toward the fire. It always has." | — |
| **Vane** | absent | — | — | — | — | — | **Nothing. The Crown's Envoy is not in the room for the reveal**, and will never be told P7, P8 or P9 by anyone. |
| **the nine Masters** | absent, and on branch `MARROW_LETTER` the four know they were never told. | — | — | — | — | — | **The Convocation is not present at the moment its own institutional crime is named.** §12.30. |
| **the school** | — | — | — | — | — | — | Learns nothing, on any branch, ever. |

---

## T9 — ch7: Vane at the chamber's edge; (opt.) the wall shown to Vane; the Decision; the Great Sigil; the Binding; COLD written by four hands

*Revealed: **P12 — the bill, itemised, on four private phones.** P13. And on `VANE_ALLY`, Vane learns
that they know.*

| who | Knows | Believes | Wrong about | Believes about others (nested) | Withholding — from / why | Would say if asked | **Changed at this point** |
|---|---|---|---|---|---|---|---|
| **each of the four, privately** | **P12, itemised for their own seat and nobody else's.** Reader: "you will not read tomorrow. Not the door, not the lexicon, **not whatever Wren leaves you**." Listener: "the house goes quiet. **You have never heard a quiet house.**" Seer: "every shadow will fall the ordinary way, and **only you will remember that once they did not**." Binder: "you will never see another thread. **You will have to ask people what they feel.**" (`companion/ch7.js:185-188`) | That this is the price and it is theirs to pay. | — | **Each believes the other three are reading a comparable line and does not know it.** The house rule forbids showing the phone (`lore.js:74`). The four seal their answers separately (`ch7.js`, the finale word). | **Their answer, from each other, by design.** *Protecting each other from a vote.* | Seer: "If I walk, I'll be the only one who remembers that shadows ever did anything else." | **The mystery's answer becomes an invoice with the reader's name on it.** Note what this means structurally: **the price is never spoken by a character.** Marrow does not say it. Wren does not say it. The *game* says it, four times, in private. |
| **the four**, as a body | **P13**: "The ring is full but for one socket. Wren walks to it and stands in it. / *It is never written.* / '**It's cold in here. Obviously. It's me.**'" (`ch7.js:695-697`). That Wren's name is cut into that socket in letters four hundred years older than the alphabet (`ch7.js:699`). | That the choice is real. | — | **Two levels: they now know Wren has known this the whole time, and know Wren let them find it.** "Four sealed words said WALK. **Nothing here looks surprised.**" (`ch7.js:698`) | — | Reader: "Wren's name is in a floor older than the language it is written in." | The last unknown closes. **Wren's identity and the Hearth's price are revealed to be the same fact**: one hollow, either filled by a child or written by four hands. |
| **Wren** | unchanged, entirely. | — | — | Knows the four now know everything Wren has known for years. | **The one thing still withheld: that Wren wanted to be saved.** It surfaces only after the fact — E0: "You *idiots*. **I had a *speech*.**" (`ch7.js:758`); E2: "It is alright. **I knew. I wanted to hear what you would say.**" (`:768`). *Protecting them from carrying a request.* | "I'll stand in the bit that isn't written." (`ch7.js:405`) | Nothing. **Wren is the only character whose knowledge state is identical at T0 and T9.** That constancy is the mystery's best structural joke and the game never points at it. |
| **Marrow** | unchanged. | That the four will not choose the Fourfold Walk, or she would not have had to be argued past. **[PROPOSED]** | — | On `OATH_KNOT` she **bars the Walk** and demands evidence — "You swore under KNOT, and it cannot be unbound. You swore to see Wren into the Cold." (`ch7.js:387`) — **and every one of the three evidentiary answers is something she already knows.** "The foot of the stone. One Seer low enough to look." / "**I scraped it myself, as a girl.**" / "**They could not afford four Masters, so they made it grammar.**" (`ch7.js:393-396`) | Newly nothing — and that is the point. She is **testing whether they can say it**, not learning. She yields to the non-argument too: "That is not a reading." … "**She steps aside anyway.**" (`:397-398`) | "The ring has been ready for fourteen years. **Decide.**" (`ch7.js:367`) | **Her last withholding falls: `ch7.js:396` is the only time she states P9's motive out loud, and it has no antecedent in the scene** (§12.18). She also reveals she has had the ring ready for fourteen years and nobody asks how she knew to (§12.22). |
| **Vane** | unchanged, unless shown the wall. | That the fire has under an hour — "One child, and **a fire that will be out within the hour**" (`ch7.js:316`). **How he knows this is never established** — no character gives the Hearth a timetable and the Provost never names one. **[WITHHOLDING]** | **Still the price.** He offers four masterships for one child, which is only a good trade if walking is free. **Nobody ever tells him what it costs, on any branch.** | Thinks the four can be bought individually and that each will believe the others were not asked: "**The others need never know who opened the door.**" (`companion/ch7.js:182`) — the Hearth then breaks that for him by naming the accepter aloud (`ch7.js:493`). | Whom he wrote to. | "It is a resource your Provost calls a memorial." | (branch `VANE_ALLY`) **He learns that they know** — not a new fact about the Hearth, a new fact about the room: "Twenty-two years. I stood in your Hall with that paint under my nails and told them. They sent me away to learn manners." / "**My offer is withdrawn. I will not be the thing you have to be brave about.**" (`ch7.js:341-342`). **The lever is not information; it is company.** |
| **Marrow ↔ Vane** | both present, both scraped the same paint decades apart | — | — | — | — | — | **§12.23: `ch7_wall` and `ch7_argue1` can co-occur in one playthrough, and neither acknowledges the other.** The two people in the building who independently found the truth stand in one room and say nothing about it. §B5. |
| **the two unnamed Masters** (branch `!SORREL && !VOTE_LOST`) | — | — | — | — | — | — | "Two Masters whose price you would not pay watch from the edge." (`ch7.js:62`) No line, no reaction to the reveal, no consequence (§12.41). |

---

## T10 — ch8: the ending reached, and the epilogue

*What each party ends the night knowing. Five branches; the differences are stated per ending.*

| who | Knows at dawn | Believes | Wrong about | Believes about others | Withholding | Would say if asked | **Changed at this point** |
|---|---|---|---|---|---|---|---|
| **the four — E0 (Fourfold Walk)** | **Everything, and P6 by experience**: "You come out of it the way the Founders came out: **grey-eyed and ordinary.**" (`ch8.js:287`) And that the Hearth is now "for the first time in four hundred years… **not holding anything shut. It is simply a fire.**" (`ch8.js:286`) | That they would do it again — "They say so, every winter, at the point in the evening when it becomes true." (`ch8.js:309`) | **Whether an unheld wound is safe.** The game asserts it is and offers no reason (§11). | Binder: "four friends and nothing between them but air" — and has to **ask** what the Provost feels (`ch8.js:287`). | The Reader keeps Wren's letter untranslated forever, on purpose (`ch8.js:308`). | "It was four people. Now it is four more, and it is nobody's lid." | **They become the only people who have ever paid the price twice over and know it.** Law 0's card reads **WRITTEN — "Tonight it was."** (`companion/ch8.js:309`) |
| **the four — E1 (Half-Walk)** | Split: walkers know P6 by experience; **stayers keep their Sight, the fire, and the knowledge, and become the school's Masters** — "There is a school above you that needs Masters who can read the wall. **Those are the Masters.**" (`ch8.js:321`) | — | — | — | — | Stayer: "I know what it is. That is now my job." | **The only ending in which the knowledge deliberately enters the institution.** Law 0: RESTORED — "Tonight it nearly was." |
| **the four — E2 (the Sealing)** | P1–P13, and that they did not pay. | That Wren knew and let them choose. | — | The Reader **is the only person who can spell Wren's name for the mason and withholds it** (`ch8.js:332`) — a final, private, chosen withholding, from the school, forever. | That withholding. | Reader: "There is a fifth name over the Hearth and I am the only one who can read it." | The Order's reading **comes true because nobody disproved it in time.** Law 0: RESTORED — "It was not, tonight. It is still the Law." |
| **the four — E3 (the Keeper's Walk)** | P1–P13, and that the Provost paid. | — | — | Marrow's four letters convert her withholding into instruction: "Do not let that stop you listening — **I did, and it cost fourteen years.**" / "**I should have asked you sooner. I should have asked anyone. Ask, when you are me.**" / "The oath you swore tonight was to a Chair. **Swear the next one to a person.**" (`companion/ch8.js:196-198`) | She writes them on the back of the writ and **does not wait to see them read** (`:283`). | "She went down alone. That is the two-hundred-and-twelfth answer with better motives." | **Marrow's entire epistemic posture is confessed in four sentences — and only on the ending where she dies.** |
| **the four — E4 (the Envoy's Bargain)** | P1–P13, and that it did not matter. | — | — | Binder: "Every thread in that hall went gold on the way out. Crown gold, all of it, **including yours.**" (`companion/ch8.js:299`) | Everything, from everyone, forever. | "We knew exactly what it was. We are Masters of ash." | **Law 0: STRUCK, AGAIN — "The Crown struck it. The Crown does not need Laws."** (`companion/ch8.js:309`) The knowledge survives and buys nothing. |
| **Wren** | E0: gains a pulse and a thread — "**It wasn't that there wasn't one. It's that there wasn't a *me* on the other end to tie it to. There is now.**" (`companion/ch8.js:126`). E3: becomes Provost and inherits the lie — "**The fourth-years are told it is nothing.**" (`ch8.js:344`) | — | — | — | **E3 is the ending in which Wren becomes the withholder.** The habit passes down intact. | E0: "You took your *time*." · E3: nothing, to the fourth-years. | The mystery's moral is in the E3/E0 contrast: **the knowledge either gets paid for or gets inherited as a lie.** |
| **Marrow** | E2: alive, bereaved, holding a grey thread (`ch8.js:333`). E3: gone. **E0, E1 and E4: not mentioned at all** (§12.30). | — | — | — | — | — | **On the ending that finally pays the bill she refused to name, the woman who spent fourteen years on it does not appear.** The largest hole in the Epilogue, and it is this mystery's hole. |
| **Vane** | E4: everything he wanted, and still not the price. E0–E3: **never mentioned again on any path** (§12.30). | — | — | — | — | — | He never learns what it cost. |
| **the nine / the Order / the school** | **Nothing, on any ending.** No scene tells the Convocation what is under the school; Law 0's restoration is never shown accepted on the record (§12.30); on E3 the school is actively lied to. | — | — | — | — | — | **The institution that built the cover-up ends the game exactly as ignorant as it started, on five endings out of five.** |

---

## 1. THE GAP THAT DRIVES THE DRAMA

### The pair: **Provost Marrow ↔ the four, on the price.**

Marrow holds P5, P6, P7, P8, P10 and P11 from before T0 and discloses none of them until T8, while
recruiting, arming, binding by oath and finally leading the four people who may have to pay P12. The
four hold P1–P4 and a forged translation, and are asked to act on her authority six times.

**Why this pair and not another.** It is the only asymmetry in the mystery that is
(a) **total** — she has the whole answer and they have none of it; (b) **operational** — every scene
is her giving them an instruction whose reason she is withholding; (c) **mechanised** — the four's
ignorance is enforced by the gift partition and the house rule, so it cannot be dissolved by a
sensible player asking a sensible question; and (d) **morally live in both directions** — she is
wrong to withhold, and she is right that telling them would cost her the night.

Against the alternatives: **Marrow ↔ Wren** is not a gap, it is a shared silence (both know; neither
says; the drama is tenderness, not tension). **Vane ↔ Marrow** is the best *scene*-level gap
(he has the picture, she has the price, neither will trade) but it fires exactly twice — `ch1.js:138`
and `ch7.js:341` — and Vane is offstage for four chapters. **Wren ↔ the four** is the emotional
engine of the *game*, but on this mystery Wren is almost passive: Wren knows and waits.

### Scenes that currently exploit it — and how well

| beat | how it exploits the gap | grade |
|---|---|---|
| `ch1.js:309` the Ember named | She gives them a mission and a false comfort in one sentence, and nobody can check it | **A** — this is the mystery's decoy and it is perfectly placed |
| `ch2.js:189` "the rebuilding was not honest" | She supplies the pointer and removes the noun. They descend into 212 with her warning and no referent | **A** |
| `ch4.js:355` "Read it. **Argue.**" | She invites argument from a party she has given nothing to argue with | **A−**, and it is the chapter's quiet cruelty. Never named as such until `companion/ch8.js:197`, on one ending |
| `ch5.js:249-250` "there is a wound… the fire is going out" | Premise, crisis and plan, with cause and price cut out. Stops one sentence short of P8 | **A** — the most efficient withholding in the game |
| `ch6.js:629` "The last of it is not mine to do" | The gap turns from information to *capability*: she has told them everything and still cannot finish | **A** |
| `ch6.js:824` (branch `STONE_TOLD`) she reads the stone herself | **The gap is exposed as a gap on screen** — she could do this all along | **B+**, undercut by nobody reacting to it |
| `ch7.js:387-396` she bars the Walk and demands evidence | She makes them say back to her the three things she already knows | **A** |
| `companion/ch8.js:196-198` her four letters | The gap is confessed in the imperative — *ask*, *listen*, *swear to a person* | **A**, and only reachable on ENDING 3 |

### Scenes that could exploit it and do not

1. **`ch2.js:346`, the arch stamped 212** — she sent them; she knows what it is; they are standing in
   front of the date with her warning in their ears. No line. (See §B1.)
2. **`ch4.js:607`, she comes back early "and does not say why"** — the four are holding her journal,
   her voice, her thread and her forgery. The one moment in the night where they have leverage over
   the withholder, and there is no option to use it. (See §B6.)
3. **`ch5.js:250` → the Cold Ember** — she tells them the fire is going out to four people who carried
   the thing she said relights it. Nobody asks. (See §B2.)
4. **`ch6.js:590`, she ties off the held thread** — she personally hands a Sighting back to a child
   two chapters before the game invoices four of them. She of all people knows what she is
   demonstrating. No line. (See §B4.)
5. **`ch6.js:824` on `STONE_TOLD`** — nobody asks "how long have you been able to do that?"

---

## 2. [CONTRADICTION] — where the game disagrees with itself about who knew what, when

**§2.1 — Sorrel knows the errand before Marrow decides it.**
> `js/content/ch1.js:255` — Master Sorrel, seconds after the vote: "Under this school is a thing called
> the Cold Ember. **When the Provost sends you down for it**, it comes to the nine of us."

against

> `js/content/ch1.js:310` — Marrow, after the hall has emptied: "In the morning I would have sent — no.
> **Tonight.** I am sending you tonight."

Sorrel's belief state at T3 contains both the errand and its couriers before the Chair has settled
either. Clean only on `VOTE_LOST`, where Marrow names the Ember first (`ch1.js:245`). Same as
`CANON.md` §13.26; restated here because it is a *knowledge*-order defect, not a plot defect.

**§2.2 — Law 0 is restored to the Binder's Book by a Chapter I promise.**
> `js/content/ch4.js:85` — `Store.set('LAW0', !!(f.LETTER_READ || f.TAPESTRY || f.ORIEL));` — mirrored
> at `js/content/ch5.js:8`. The file flags itself: "`ORIEL` is the ch1 promise rather than
> `ORIEL_NOTE`, **which looks wrong**" (`ch4.js:82-84`).

Effect on this mystery: on branch `ORIEL`, the Binder's phone gains **"COLD is written by four hands
· RESTORED · Older than Law 6. The older binds."** (`companion/book.js:127`) without the party reading
Mere's sheet, scraping the tapestry, or finding Oriel's note. **The single most load-bearing
proposition in the mystery is acquired with no channel.**

**§2.3 — Law 0 is "restored" twice, and the second announcement may be false.**
> `js/content/ch6.js:814` sets `LAW0` unconditionally and `:853` announces "**Binder — the struck Law
> is back in your Book.**" — but it may have been true since `ch4.js:85`, and the Binder's card may
> already have read RESTORED for two chapters (`companion/ch5.js:333`; `companion/ch6.js:175`).

No branch guards the line. A Binder who has been reading a restored Law since T6 is told at T8 that
it has just come back. (`CANON.md` §13.46.)

**§2.4 — Law 0 and Law 6 have two different texts on two tabs of one phone.**
> `js/content/lore.js:57` — "COLD is written by four hands."
> against `js/content/companion/ch6.js:232` — "**Read a line as the cuts count down. Every cut says its
> other word.** COLD is written by four hands."

The Binder who has studied the Book all game has been reading a **shorter Law than the one the ch6
stone puzzle turns on** — and the two omitted clauses are precisely the ones that decode the Hearth's
own prophecy. A player's knowledge state and their character's diverge silently. (`CANON.md` §13.8.)

**§2.5 — the Order's Law restated as the world's, one scene after it is overturned.**
> `js/content/ch8.js:493` — "The eighth is the rest. **The rest is never carved.**" and `:499` — the
> eighth card captioned "**never written**"

against

> `js/content/companion/ch8.js:309` (ENDING 0) — "Law 0 · Founders' · Year 0 · **WRITTEN** … Tonight it
> was."
> and `js/content/ch6.js:827` — the Founders' own stone, whose eighth cut **is** COLD.

The Epilogue's summary voice reverts to the 212 Convocation's position after the game has defeated it.
(`CANON.md` §13.12.) This is a *narratorial* knowledge regression and it lands on this mystery.

**§2.6 — the Hearth's constancy asserted and retracted in consecutive sentences.**
> `js/content/ch0.js:51-52` — "The fire is called the Hearth. **It has never once gone out.** / Except
> one night, fourteen years ago."

Read as rhetoric it works; as a statement of what is true about the Hearth it is a contradiction in
two lines, in the first four lines of the game. (`CANON.md` §13.24.)

**§2.7 — Marrow says she can close it, then says she cannot.**
> `js/content/ch6.js:487` — "**I can close this wound.** While I work the Cold pushes…"

against, 142 lines later in the same chapter, same room, same speaker

> `js/content/ch6.js:629` — "**It is held. Not closed — held. The last of it is not mine to do.**"

The plot depends on `:629`. `:487` is either a lie told to get four pairs of hands onto keys, or a
mid-scene discovery. Nothing marks it either way, and **Wren — who notices everything and corrects
Marrow's phrasing twice in the same chapter — does not notice this.**

**§2.8 — the fire's mortality is unpriced.**
> `js/content/ch1.js:309` — "**If the fire goes out, the Ember lights it again.**"
> `js/content/ch7.js:681` — "Midnight. **The spark goes out — not guttering, simply gone.**"
> `js/content/ch7.js:684` — "**Nothing you have done is undone.**"
> `js/content/ch8.js:311` — "**four hundred years of fire, again, from a spark.**"

The premise of the whole night is that the fire can die. It dies, nothing happens, and it comes back.
**The Cold Ember — the object of an entire chapter and the only stated remedy — is never invoked at
the one moment it was established for.** (`CANON.md` §13.10, §13.11, §12.54.)

---

## 3. §A — BEHAVIOUR NOT CONSISTENT WITH THE KNOWLEDGE STATE THE GAME GIVES

*Ruthless pass. Each entry names the character, the beat, and what they would have to know — or not
know — for the behaviour to hold.*

**§A1 — Marrow argues the Order's reading to the Convocation, knowing it is forged.**
`ch1.js:124`: "The stone over your heads says **one born of four**. Tonight I stop arguing and show
you." She can read that stone the Founders' way (`ch6.js:824`) and knows why the school's version
exists (`ch7.js:396`). So she is quoting a forgery she has personally detected, as her own argument,
to the body that maintains it. **Defensible** — she is buying a vote, not teaching a class — but the
narration does not mark it and §12.42 records that nothing is ever shown. *One narration clause at
`ch1.js:124` ("She says it the way the school says it, which is not the way she reads it") converts a
lapse into the sharpest character beat in Chapter I.* **[PROPOSED]**

**§A2 — The fourteen-year plan contradicts her own literacy. THE BIG ONE.**
She can read *"Four, as one, go down with fire"* and has spent fourteen years preparing **one** child
to walk in alone (`ch6.js:691-692`; `ch7.js:367`). Only three readings hold:
- **(a) She knew it said four and judged four Masters unobtainable** — i.e. she made the 212 decision
  herself, knowingly, with better motives. Devastating, free, and it retro-charges `ch7.js:396`
  ("They could not afford four Masters") with an unbearable second meaning.
- **(b) She reads the four-hands clause as governing the *writing* (Law 0) and the *walking* as one.**
  Coherent with `ch6.js:629` and with the ring's eighth socket — but then she is wrong, and her
  wrongness is the plot, and nothing marks it.
- **(c) She only learns to read it in ch6.** Contradicted by "I have had **four hundred years of this
  stone** and you have had five minutes" (`ch6.js:823`).

**The game commits to none of these, and Marrow's entire culpability hangs on the choice.** This is
the mystery's largest [UNDECIDED]. *Recommendation:* **(a)**, plus one sentence from her at T8.

**§A3 — Nobody in the building ever mentions the Cold Ember again.**
Established as the remedy (`ch1.js:309`, `ch2.js:188`), carried or lost at T4, and then: Marrow says
the fire is going out (`ch5.js:250`) — no mention; the fire goes out (`ch7.js:681`) — no mention; the
fire comes back from a spark (`ch8.js:311`) — no mention. **Every character in those scenes holds the
fact and behaves as though they do not.** On `EMBER_LOST` it is worse: they have lost the school's
only insurance against the exact event, and the loss is narrated as a lighting change ("the blue light
is brighter. Then it is not.", `ch2.js:370`). *The cheapest fix is one Marrow non-answer at T7.*

**§A4 — The four swear an oath to a transaction nobody has described, and Marrow invites them to
argue about it.**
`ch4.js:355`: "Read it. **Argue.**" At that moment they hold P1–P4 and a forged translation; the oath's
own words are never printed (§12.69); the price (P12) arrives three chapters later on four private
phones. Her invitation is therefore hollow, and **she is the only person in the room who knows it is.**
The game agrees with this reading — but says so only on ENDING 3 and only in a letter
(`companion/ch8.js:197`: "I should have asked you sooner. **I should have asked anyone.**"). *Move the
recognition earlier, or make `ch4.js:355` visibly a bluff.*

**§A5 — The Binder knows the Law because the party was polite to a Master.** See §2.2. A knowledge
state with no causal history, on the mystery's keystone proposition. *Gate on `ORIEL_NOTE` and let
Oriel's note carry the Law.*

**§A6 — The crime of 212 is optional; its consequences are not.**
P9 lives behind `{t:'reveal', label:'Read when the Hearth says the Book has turned a page'}` on the
Binder's Book (`companion/ch6.js:285-289`). The Hearth prints P7 and P8 unconditionally
(`ch6.js:839`, `:850`). **A table whose Binder does not tap finishes the game knowing the Order lied
and never learning why** — and the *why* is the only thing that makes 212 a tragedy rather than
vandalism. *Print one clause of it in `ch6_open`, or move `ch7.js:396` into ch6 where it has an
antecedent.*

**§A7 — Wren watches the four burn a four-reading budget on a stone Wren has read for years.**
`ch7.js:404`: "That is what the stone says, and **I have had years to get used to it.**" In the same
chapter Wren coaches their protocol ("Has everybody actually said their bit?", `ch6.js:793`) and has
done so in six chapters. The silence is *correct* — the Walk only opens if they read it — but it is
never marked as a choice. *One clause from Wren after a failed reading ("I could tell you. Then it
would be mine and not yours.") converts the game's largest passive stretch into its best restraint.*
**[PROPOSED]**

**§A8 — Marrow knows the lock she cannot know.**
`ch7.js:387`: "**You swore under KNOT**, and it cannot be unbound." against Law 4's "**The one you
swear to cannot tell the difference.**" (`lore.js:64`). In-mystery relevance: Law 4 is the Order's,
Year 340, and the Order's defining act is legislated permission to appear more bound than you are.
Either she was told, or **Law 4 is a lie the Order tells its Wardens** — which is the best answer and
is free. (`CANON.md` §13.14, §12.8.)

**§A9 — Vane has a timetable for a fire he has never stood under.**
`ch7.js:316`: "One child, and **a fire that will be out within the hour**." No character gives the
Hearth a duration; the Provost never names one; his soldiers have been above ground all night. He is
right, and the game does not say how. **[WITHHOLDING]**

**§A10 — The party never asks the one question their own model demands.**
By T7 they hold: *the fire is dying* (Marrow, flat), *there is an object that relights it* (Marrow,
Chapter I), and *they fetched it themselves*. The question "then why are we taking a child down?" is
available to any player at the table and to no character in the fiction. **When the player can ask a
question the characters cannot, the characters look less intelligent than the people playing them.**

**§A11 — The institution never reacts to being exposed.**
Marrow restores a struck Founders' Law, names the Convocation's refusal, and walks a party through a
forged antechamber — and the nine Masters, the Order and the school do not appear again after ch7 on
any branch (§12.30). Nobody's knowledge state changes upstairs. *The cover-up survives the game on all
five endings, and if that is intentional it wants one sentence saying so.*

---

## 4. §B — UNTAPPED ASYMMETRIES

*Places where the mismatch already exists in the shipped game and is not spent. Each is cheap.*

| § | beat | the asymmetry sitting there unused | what it would cost |
|---|---|---|---|
| **B1** | `ch2.js:346` — the bricked arch stamped **212** | The Seer reads rebuilt stone; the Binder keeps a Book with **three Laws dated 212** (`lore.js:62`, `:66`, `:67`). Neither is asked to look at the other. The party could date the cover-up themselves, four chapters early, from partitioned evidence — which is this game's own puzzle grammar. As shipped, **212 is scenery.** | two whisper lines |
| **B2** | `ch5.js:250` — "the fire is going out" | Said to four people carrying (or having lost) the object she told them relights it. One question and one non-answer characterises her completely. On `EMBER_LOST` the line becomes a wound. | one exchange |
| **B3** | `ch3.js:440` — the portraits mutter "*four went down*" | Free, unprompted, on the Hearth screen, doubled on the Listener's phone at T7 with "four going down the stair and **four coming back**" (`companion/ch5.js:310`) — which is P5 **and** Mere's survival (§12.15). Nobody puts it to Marrow, who is standing beside them and could answer. | one Listener prompt |
| **B4** | `ch5.js:551` / `ch6.js:590` — the held thread | One seat's Sighting goes dark and is handed back "like blood into a numb hand." Two chapters later that same seat reads "you will never see another thread." **A rehearsal of the exact price, in the exact vocabulary, unacknowledged by the woman who performs it.** | one Marrow clause |
| **B5** | `ch7.js:341` + `ch7.js:394` | Vane and Marrow both scraped the same paint, decades apart, in the same building, and **can be on screen together** (`ch7_wall` → `ch7_argue1`; §12.23). Neither acknowledges the other. Twenty-two years of grievance closable in one line. | one line |
| **B6** | `ch4.js:607` — Marrow returns early "and does not say why" | The four are holding her journal, her recorded voice, her grey thread and her forgery. **The only moment all night the party has leverage over the withholder**, and there is no option to use it. | one choice node |
| **B7** | `ch5.js:347` — four empty thrones | Four thrones, four Founders, and a fire made of four people, all in one chapter. Wren jokes it ("It is a *theme*"); the art already draws the throne-backs as crowns (`scenes-ch5.js:66-67`). An optional read here plants P7 a chapter before it lands. | one optional node |
| **B8** | T10, all five endings | **Nobody tells the school.** The fourth-years are told nothing on E0/E1/E2/E4 and lied to on E3 (`ch8.js:344`). The 212 cover-up therefore **outlives the game on every path.** | one line on E0 and E1, or one deliberate sentence saying it is intentional |
| **B9** | `ch6.js:824`, branch `STONE_TOLD` | She demonstrates, on screen, that she could read the stone all along. Nobody asks how long. **The gap becomes visible and is not spent.** | one Wren line |
| **B10** | `ch0.js:214` — "it needed all four of you" | The four-hands rule is established at T2, four hundred years early, and is never called back at T8 when Law 0 restores the identical rule. The Prologue already wrote the climax's thesis. | one callback clause in `ch6_open` |

---

## 5. §C — IS THE REVEAL EARNED?

**Where the player learns the truth.** T8, in three beats inside sixty lines:

1. **the count** — solved by the table: `ch6.js:827-828`, "KNOT · CROWN · ASH · WELL · VEIL · EMBER ·
   ASH · COLD / *Four, as one, go down with fire. What is kept stays behind. The fire is the hollow
   they left.*"
2. **the identity** — narration, unattributed: `ch6.js:839`, "Four went down. Not one born of four —
   four, as one. **The fire is only what they left behind.**"
3. **the economy** — Marrow: `ch6.js:850`, "**Four people's worth of fire, and four hundred years to
   spend it in… Nobody did anything wrong. It was only ever four people.**"

| proposition | earned? | the plants that exist | verdict |
|---|---|---|---|
| **P5** four, not one | **Yes, richly.** | `ch0.js:214` the lamp needs four hands · `ch2.js:319` Mere's strip (opt.) · `ch3.js:440` the portraits · `ch4.js:536-537` the tapestry (opt.) · `ch5.js:347` four thrones · `companion/ch5.js:310` four coming back · `lore.js:57` struck Law 0, visible from the Prologue | **Seven independent plants, three of them free. The best-bred reveal in the game.** |
| **P7** the fire *is* them | **Thinly, but legitimately.** | Deducible from `ch0.js:49-50` plus the stone's own words. The tapestry shows four walking *in* and never coming out. | **One clause anywhere in ch0–ch5 treating the Hearth as a *who* fixes it — and the perfect line already exists, unused: Wren addressing the fire as a person who can take offence (`ch6.js:473`).** Move a version of that earlier. **[PROPOSED]** |
| **P8** why it is dying | **[UNEARNED].** | **None.** The source comment says so outright: "the Prologue opens with it… and until this pass no chapter answered it" (`ch6.js:840-849`). | A good answer sprung at the last moment. **Fix, cheapest → best:** (i) `ch0.js:78` the lamp "older than any record"; (ii) `ch2.js:284` the vault older than the school; **(iii) best — `ch5.js:250`: let Marrow give a *wrong* reason for the fire dying here, and let T8 correct it.** A correction lands harder than a revelation and costs one clause. |
| **P9** 212's refusal | **Evidence earned; motive not.** | The physical record is everywhere — the derangement (`companion/ch2.js:157`), the brick and the date (`ch2.js:346`), the overpaint (`ch4.js:533`), the translation (`lore.js:75`). | But the *reason* exists only behind an opt-in tap on one phone (§A6). **The crime is well-planted; the tragedy is optional.** |
| **P11** held, not closed | **Yes.** | `ch5.js:250` "shut it again" → `ch6.js:487` "I can close this wound" → `ch6.js:629` "Not closed — held." A three-step walk-down. Weakened only by §2.7 going unremarked. | fine |
| **P12** the price is yours | **Not a reveal — an invoice.** | Delivered by the UI, privately, per seat, with no character present (`companion/ch7.js:185-188`). | Defensible and even beautiful. But it means **no character in the fiction ever tells the four what walking costs**, which is exactly why §A4 stings and why `companion/ch8.js:197` reads as the game apologising. |

**The structural finding.** Of the mystery's three halves — *the count*, *the identity*, *the
economy* — **the table earns one and is handed two.** The puzzle proves four hands went down; the
narration then tells them what the fire is, and Marrow tells them why it is failing. That is a
reasonable division (a puzzle cannot prove an identity), but the author should rule on it
deliberately, because it is the difference between *"we worked it out"* and *"we were told, movingly."*

---

## 6. BRANCH SENSITIVITY

*How the table above changes under each flag. Only flags that move a knowledge state on **this**
mystery are listed.*

| flag | set at | whose knowledge moves | what changes on this mystery | severity |
|---|---|---|---|---|
| `CH2_NICHE` = mere | T4, `ch2.js:297` | the four | **A Founder acquires a name.** Without it, "Mere" first reaches the Hearth screen at T7 (`ch5.js:265`) as a stranger the Provost admires. | medium — and **it has no mechanical footprint whatever** (Appendix A) |
| `CH2_STRIP` = right | T4, `ch2.js:319` | the four | **P5 four chapters early**, from a Founder's own stone, with the school's reading explicitly named as wrong. Reading it `left` instead teaches the same lesson from the other side. | **high narratively, zero mechanically** — the game's richest discovery changes nothing |
| `LETTER` → `LETTER_READ` | T4 `ch2.js:324` → T6 `ch4.js:498` | **the Reader alone** | **P6 — the price, in a Founder's own words** — renders on the Reader's Book from T7 (`companion/ch4.js:62`, `maxChapter>=5`). Without it, **no character in the game ever states the Founders' cost**, and the four learn it only by paying it at T10. | **critical.** The mystery's second half is a branch. |
| `TAPESTRY` | T6, `ch4.js:554` | the Seer, then all | **P5 pictorially and certainly**, plus Vane's vindication (`ch4.js:557`). Sets `LAW0`. | high |
| `ORIEL` (the ch1 *promise*) | T3, `ch1.js:261` | the Binder | **Sets `LAW0` with no information transfer** (§2.2 / §A5). Also unlocks `ORIEL_NOTE` at T6 — P10 from a living witness. | **critical, and a defect** |
| `ORIEL_NOTE` | T6, `ch4.js:588` | the four | The cover-up becomes **ongoing** — "They painted it back inside the week." | medium |
| `NEITHER && !VANE_ACCEPT` → `MARROW_LETTER` | T6, `ch4.js:591` | the four | **The only surface before T8 on which Marrow's withholding is visible as withholding**: "the thing I have never named to you." Two levels deep — they learn that she believes the nine do not know. | **high** — and it is on the branch that requires refusing both Masters, i.e. the least-taken path |
| `VANE_ACCEPT` | T3, `ch1.js:288` | one seat | That seat learns the four are themselves bought (`companion/ch3.js:236`) — and **suppresses Marrow's letter**, deleting the `MARROW_LETTER` route above. Taking the Crown's coin costs the party its only early sight of Marrow's concealment. | high, and elegant |
| `VOTE_LOST` | T3, `ch1.js:212` | all | Marrow names the Ember **first** (`ch1.js:245`), and `NEITHER` is forced (§13.45), so `ORIEL`/`SORREL` and the `MARROW_LETTER` route all die. **`LAW0` must then come from `LETTER_READ` or `TAPESTRY` or not at all until T8.** | high |
| `SORREL` | T3 | the four | Forces `EMBER_LOST`; gives a Convocation writ. Sorrel ends the game holding an object whose function nobody has verified. | medium |
| `EMBER_LOST` | T4, `ch2.js:366`/`:383` | nobody | **The party loses the stated remedy for the exact event of T9 and no character's state changes.** Silently cracks a bell on Mere's gate with no causal line anywhere (§12.14). | **the largest wasted branch in the mystery** |
| `WREN_HURT` | T4, `ch2.js:372` | Marrow | Fires her one unfinished sentence in fourteen years — "Who did —" (`ch2.js:396`). The only leak in her composure. | low on knowledge, high on character |
| `MEMORY` | T6, `ch4.js:520` | the Listener | The Crown's aim verbatim, and "**And through it**" — the chapter's strongest hook, never paid (§12.45). | medium |
| `GREY` | T6, `ch4.js:588` | the Binder | The cost of keeping the Hearth acquires a **colour** before it acquires a number. | high emotionally |
| `JOURNAL` | T6, `ch4.js:495` | the Reader | "IT SLEEPS WITH THE WINDOW OPEN." — the instrument and the love as one act. | high emotionally |
| `OATH_KNOT` | T6, `ch4.js:735` | Marrow | At T9 she **bars the Walk** and demands they say back to her the three things she already knows (`ch7.js:387-396`) — **the scene that converts the whole asymmetry into dialogue.** Without KNOT this scene never fires and `ch7.js:396` (the only spoken statement of P9's motive) is never heard. | **critical — the mystery's best scene is behind one lock choice** |
| `REFUSED_OATH` / `OATH 0` | T6 | the four | She goes down without them; Wren fetches them through Mere's door "for people who were not asked" (`ch5.js:287`). Treat as **unsworn**, not refused (§13.16). | medium |
| `STAIR` = HOLD | T7, `ch5.js:570` | one named seat | **A Sighting is spent and returned** — the T9 invoice, rehearsed. Unnamed as such by anyone (§B4). | high, wasted |
| `STAIR` = COLLAPSE | T7 | the four | They write COLD **with one hand**, before Law 0 is restored, on a newel post, and Wren says so: "**You wrote the cold one. With one hand.**" (`ch5.js:543`). An early, unremarked violation of the rule the climax restores. | medium — worth an author ruling |
| `LAW0` (any route) | T6/T7/T8 | the Binder | At Mere's Silent Gate the Binder either **writes COLD into its slot** or leaves it empty — and on the written branch Marrow says "**That is not in the Book I was given.**" (`ch5.js:399`), Wren: "It is in Mere's, apparently." **The only moment before T8 where Marrow is shown to be missing a piece.** | high |
| `STONE_TOLD` | T8, `ch6.js:815` | the four | **Marrow demonstrates on screen that she could read the stone all along** (`ch6.js:824`). The withholding becomes visible. Nobody reacts (§B9). Costs the Finale two minutes. | **high, and half-wasted** |
| `WALK_UNLOCKED` | T8, `ch6.js:814` | the four | Gates whether P12 is ever applied to *them*: without it, `ch7_decision` reads "One walks in, and the Cold closes behind. **That is the reading you have.**" (`ch7.js:370`) — the party finishes the game inside the Order's translation. | **critical** |
| `VANE_ALLY` | T9, `ch7.js:332` | Vane | He learns **that they know** — not a new fact about the Hearth. The lever is company, not information. Deletes his ending, the bargain and the private letter. **What he does afterwards is never shown** (§12.32). | high |
| `DECISION` / `ENDING` | T9/T10 | all | See T10. E0 pays 212's bill; E2 vindicates the Order's reading by default; E3 re-runs 212 with better motives; E4 strikes Law 0 again, by a body that does not need Laws. | — |
| `BELLS_CRACKED` | T7/T8 | nobody | No knowledge consequence. Included because a player will assume one: a cracked bell is never explained physically (§12.64). | none |
| `WREN_TRUST` | T3/T5 | nobody | Buys two words on one ending (`ch8.js:310`). No epistemic effect on this mystery. | none |

### The branch-sensitivity headline

**On a minimal path — `VOTE_LOST`, no niche, no rubbing, no tapestry, no Oriel note, oath EMBER or
refused, stone told — the four arrive at T9 knowing P1, P2, P3, P4, P5, P7, P8 and P11, and having
learned P6 and P9 from nobody at all.** They will have been handed the identity and the economy in
two lines of ch6 prose and never seen a single Founder-voice document, never read the Order's motive,
and never been told by any character what walking costs — only by their phones, thirty seconds before
they answer. **That path is playable, and it is the one this mystery is weakest on.** Everything that
makes the answer *land* — Mere's sheet, the tapestry, Oriel's note, Marrow's letter, the Binder's
212 reveal, the KNOT argument — is optional.

*Recommendation, one line:* make **one** of Mere's sheet, the tapestry, or the Binder's 212 block
unconditional. **[PROPOSED]**
