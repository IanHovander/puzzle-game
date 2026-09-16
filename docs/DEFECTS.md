# DEFECTS — *What the Fire Keeps*

> ## ⚠ TOTAL SPOILERS
> Every reveal in the game. Written for the author. Companion to `CANON.md`, `EPISTEMICS.md` and `PLAYER-MODEL.md`.

Three adversarial passes over the whole game, each verifying against the shipped source rather than
against the other documents. Findings are real and cited; nothing here is a style note.

**Severity.** `blocker` — a player will notice, and it damages the story. `major` — real, and worth
fixing before the next table plays. `minor` — true, cheap, do it when you are in the file anyway.

---

## The reveal schedule, and whether this story has a spine

*Does information arrive in the right order and at the right rate?*

**The procedural spine (four hands → Law 0 → four keys) is genuinely excellent and fully earned; the cosmological spine (the fire is the Founders; 212 refused to pay) is not a spine at all — it is a destination delivered in the last 250 lines of ch6, with no upstream premise, its motive locked on one phone behind an opt-in tap, and its central correction already spent four chapters earlier in an optional side-room that nothing downstream ever reads.**

### The verdict

It has a strong spine — but not the one these documents treat as the spine, and the mismatch is the whole problem.

**The spine that works is procedural, and it is finished.** \"COLD is written by four hands\" is taught as a motor skill in minute eight (ch0.js:88, \"Four hands is how this school does anything that matters\"), handed to one player as a struck Law in minute ten (lore.js:57, learned:'ch0'), given its override rule in the same breath (book.js:122, Law 3), tested against the school's own teaching in ch2_door, transgressed for the first time at ch5_gate2 (\"That is not in the Book I was given\"), forced into the ring by Law 8 at ch7_sigil, and then — not quoted, *enacted* — at ch7.js:726: '\"COLD is written by four hands.\" — Law 0. Restored,' four keys, no phones, nothing to read. That is a premise stated in hour one, escalated through eight different modalities (PLAYER-MODEL §7.3 has the table), and discharged as an action. It is causally tight, player-traversable, and the best structural decision in the build.

**The spine that does not work is cosmological, and it is a destination rather than a road.** \"Four people became the fire; it is dying because four people is a finite quantity of fire; 212 was asked for the same bill and refused.\" Every link is either absent before ch6 or locked on one device. The premise has no upstream evidence at all and two shipped facts contradicting it. The motive appears on the shared screen only behind three gates. The currency (grey) is named after it is spent. The correction (four, not one) is spent at T4 in an optional room whose flags nothing reads. So the player does not *build* toward ch6.js:839 — they are told it, once, in narration, in the same 250 lines that also tell them what Marrow is, what Wren is, what the stone says and why the fire is dying.

So the honest grade is not \"good world, sequence of events\" — it is better than that. It is **a great procedural spine with a beautiful cosmology bolted onto it at Chapter VI**. The events are not arbitrary; they are just not load-bearing on each other until the chapter that explains them.

**The strongest available spine is already in the material, and it is a debt, not an identity.** CANON §7.3's own ruling says it: \"212 is a cost-avoidance decision dressed as a grammatical reform.\" Run that as the through-line and every scene already earns its place — the Founders paid four Sights (Mere's sheet, T6) → the seal failed and the Convocation was asked for the same four and refused (T8) → *every physical lie under this school is that refusal in stone* (T4's derangement, effaced names and road stamped 212; T6's overpaint; T8's translation) → the fire ran out anyway because it was only ever four people (T8) → tonight four fourteen-year-olds pay the bill nine adults would not (T9). That is causally tight, it is thematically the same story as the oath-lock the players themselves exploit at ch4_oath (Law 4, 340: \"the one you swear to cannot tell the difference\" — the Order legislating a permission to look more bound than you are, and handing it to the players, which no character ever names), and — decisively — **the player already walks through the crime scene with their own hands in Chapter II, three chapters before anyone tells them what it means.**

The change that would make it a spine is not new material. It is joining the two ends on the shared screen: put the price on the Hearth in Act II (Marrow already owns the sentence at ch7.js:396 — move it to ch5_start), name *grey* as a spent Sighting once at ch5_hold_ask or ch6_tieoff, and acknowledge the tables that got there early (three conditional lines, PLAYER-MODEL §4.2). Then ch6_open stops being the chapter where the story explains itself and becomes the beat where a ledger the table has been keeping since T4 finally balances.

**And the single biggest missed aha the existing material already supports is the word *hollow*.** It is the game's master key and it is used four times without any two ever being put side by side: COLD glosses \"a hollow\" in the Reader's lexicon from the Prologue (glyphs.js:18), and the Reader's own ch2 page draws the glyph with \"a hollow\" captioned under it (companion/ch2.js:31); \"Wrenn is *the hollow of a bell* — the space inside it that makes the sound\" (companion/ch4.js:204); the Reader then says it **out loud, in public**, at the Second Asking — \"A hollow. The space inside a bell, the part that rings\" (ch6.js:667) — and roughly ninety seconds later the shared screen prints \"**The fire is the hollow they left**\" (ch6.js:828); then Wren, at T9: \"Four idiots and a hollow\" (ch7.js:423). Three of the four live on the *same player's phone*. Two are spoken aloud in the same room within two minutes of each other. Nothing joins them.

Joining them delivers the one thing CANON.md §12.5 says the game never states — what Wren *is*, mechanically. COLD is a hollow; the fire is the hollow the four left; Wren came out of that fire the one night it went out; therefore when the hollow the Founders left stopped burning, the hollow itself took a shape and walked out on the stones. That is §12.5(a), the recommended ruling, and it is already written in four verbatim lines the player is holding. The cost is one sentence at ch6_strip — a whisper (\"The Reader knows that word. It is in two other places on the Reader's page\") or Wren, drier (\"Hollow. Yes. I have heard that one\"). It would convert three currently flat deliveries — the stone's third clause, \"Four idiots and a hollow\", and the empty socket at ch7.js:695-699 — into one compounding deduction owned by the player who has been carrying it since minute ten.

I want to be precise about why this beats the obvious candidate. \"The fire is the Founders\" is not a missed aha; it is a missing premise — you cannot have an aha about something the game never seeded, which is why it needs new plants (finding 1) rather than a join. The hollow is a missed aha in the strict sense: every piece exists, the player already holds them, they are spoken aloud in the same room, and one sentence fires it.

### Findings — 9

#### 1. [BLOCKER] js/content/ch6.js:839 ("The fire is only what they left behind"), vs js/content/ch0.js:46-57, and the whole of ch1–ch5 on both surfaces

**Problem.** The game's title, thesis and central reveal has zero upstream evidence, and two shipped facts argue against it. Grepping ch0–ch5 Hearth prose AND companion/ch0–ch5 for any statement that the Founders became the fire returns nothing; the cold open's "They left a fire on top of it, to hold it shut" (ch0.js:50) reads as *made and abandoned*, not *became*. Meanwhile companion/ch4.js:62 has Mere sign herself "Mere, who kept the fire, **after**" and companion/ch5.js:310 has the Listener's portraits show "four going down the stair and **four coming back**" — both of which tell the player the Founders walked out alive. The source comment at ch6.js:840-849 admits the retrofit in the author's own words: "until this pass no chapter answered it: two chapter owners flagged it in this sweep and neither could take it." A reveal with no premise is not a reveal; it is an announcement.

**Fix.** Plant the premise three times in Act II using material already drawn. (1) ch6_start, the Seer, one clause: "There is cold inside that fire, and there has been all night" — the art already draws the Hearth with a pale-blue core (scenes-ch6.js:91-104) and nothing in prose ever names it. (2) Escalate the portrait mutter across the night: ch3 "four went down" (ch3.js:440) → ch5 "four went down and four came back" → ch6 "four went down and four stayed". One word per chapter turns the line that currently argues against the reveal into the line that argues for it. (3) ch6_tieoff, Marrow, five words after "One of them called it. Three of them rang" (ch6.js:594): "One of them heard, the way you do." That makes the Founders four people with four gifts rather than four founders, and "the fire is only what they left behind" becomes a conclusion instead of a sentence.

**Will a player notice?** High as a felt flatness, low as a diagnosed fault. The table will not say "that was unearned"; they will say "oh" instead of "OH", and PLAYER-MODEL's own beat note records that the most-often-missed idea in ch6_open is the game's title.

#### 2. [BLOCKER] js/content/ch2.js:319 (ch2_niche, the 'Read it from its mark' button) vs js/content/ch6.js:828 — plus a codebase-wide grep for CH2_STRIP / CH2_NICHE

**Problem.** The game's central correction is delivered in full, verbatim, on the *shared screen*, at T4: "KNOT, CROWN, THORN — four, as one, went through. Not one. And the stone above the Hearth has said one born of four for four hundred years." That is T8's entire first clause, four chapters early, as the result of pressing one of two buttons in an optional side-room. The flags it writes, CH2_STRIP and CH2_NICHE, are **never read anywhere in js/** (verified: zero hits outside ch2.js itself). So the schedule breaks in both directions at once: a table that finds the niche is handed the thesis before it has the question, gets no acknowledgement, and correctly calibrates that big reveals in this game are flavour; and then at ch6_strip the same table is told its own answer back as news. A table that skips the niche gets ch6 cold. The single most important fact in the story has variance of four chapters and no mechanical footprint on any path.

**Fix.** Two lines. (a) At ch6_strip's solvedText or ch6_open, conditional on CH2_STRIP==='right' || TAPESTRY, one Marrow clause: "Some of you have known this since the vault." (b) At ch5_descent, where the game already models the right pattern in reverse by handing Mere's name free to tables that missed the niche (ch5.js:265-266), add the mirror: one clause acknowledging the rubbing. Cost is under thirty words and it converts the richest optional discovery in the game from decoration into a memory the ending pays.

**Will a player notice?** Very high at the table. PLAYER-MODEL B4.7's own note: "They press both buttons, get the game's central correction, and the game moves on as if nothing happened."

#### 3. [BLOCKER] companion/ch6.js:286-287 (opt-in `t:'reveal'` block, Binder only, ch6-gated); ch7.js:396 (triple-gated); grep for \bOrder\b and "seal failed" across js/content/ and js/art/

**Problem.** The political motive — the thing the whole cover-up is *for* — never reaches the shared screen on any ordinary path. Verified: the phrase "the seal failed" occurs exactly once in the entire game, on the Binder's phone, inside a collapsed reveal control labelled "Read when the Hearth says the Book has turned a page." The word "the Order" occurs **zero times** in Hearth prose across all nine chapters — it exists only in the Binder's role blurb (lore.js:9), as a Law-dating label (book.js:122), in one Seer line (companion/ch7.js:233), and as an art caption, THE ORDER'S READING (scenes-ch0.js:78), which the prose at ch0.js:62 contradicts by calling it "the school's translation." The one Hearth-screen statement of the motive, "They could not afford four Masters, so they made it grammar" (ch7.js:396), sits behind three gates: DECISION==='FOURFOLD' ∧ oathKnot(s) ∧ the player choosing the 'letter' option from four. Four people can complete a four-hour game about a two-hundred-year-old institutional crime without the shared screen ever naming who committed it or why.

**Fix.** Move the motive to the shared screen in Act II, where Marrow is already explaining the premise out loud. At ch5_start (ch5.js:231), after "The fire is going out. Tonight I take the child down and shut it again," give her the sentence she already has at ch7.js:396: "Two hundred years ago the seal failed and the bill was four Masters' Sight. They would not pay it, so they made it grammar." One line, existing voice, existing words. Separately, name the Order once in ch0 or ch2 prose so the art caption stops being decoration.

**Will a player notice?** Low as an absence, catastrophic as a loss. The table never knows it was owed a motive, which is exactly why the cover-up lands as atmosphere rather than as an accusation.

#### 4. [MAJOR] ch5.js:549 (ch5_hold_ask) vs ch8.js:287; grep: "grey" appears 0 times in ch5.js

**Problem.** The currency of the entire endgame is defined *after* it is spent. Walking into the Cold costs a Sighting; the Founders paid it ("came up grey", companion/ch4.js:62); the Provost's thread is grey (ch4.js:583); Mere's word and the ending's word are the same word. But the one place a Sighting is actually spent on screen — "That Sight is spent until the Provost ties it off" (ch5.js:549) — never says grey, and grey appears zero times in ch5. Meanwhile ch4 uses "grey" for a grief-thread, a rubbing smear (ch4.js:498) and cold wax (ch4.js:765). The two senses are joined for the first time at ch8.js:287, "grey-eyed and ordinary", in the ending paragraph. Worse, the tutorial is itself branch-gated: ch5_stair is a 25–45-second timed 1-in-3 choice, so most tables never see the spend at all.

**Fix.** One clause at ch5_hold_ask or at ch6_tieoff, where Marrow ties the thread off and the Sight returns "like blood into a numb hand" (ch6.js:590-591): Marrow — "Grey, and then not grey. That is what a spent Sight looks like coming back." That single clause joins Mere's price, Marrow's thread, the volunteer's numb Sight and E0's grey eyes into one idea assembled at T7, and it makes the Decision at ch7_decision a priced choice instead of a blind one.

**Will a player notice?** Medium. A Binder will notice the two greys and get no ruling; everyone else feels the ending explain a cost they were never quoted.

#### 5. [MAJOR] js/content/ch6.js:616-868 (ch6_held → ch6_open), immediately after ch6.js:503-616 (ch6_ready → ch6_round3)

**Problem.** Everything the story owes the player arrives in one 250-line stretch, and it arrives immediately after the longest content-free stretch in Act III. Between ch6_attune (492) and ch6_held (616) there are five consecutive beats of bell plumbing — ch6_ready, ch6_practice, ch6_round1, ch6_tieoff, ch6_round3 — of which ch6_ready teaches nothing at all. Then ch6_held→ch6_open delivers, in order: the pivot ("It is held. Not closed — held"), four public confirmations of Wren's nature, Marrow's entire fourteen-year confession, "Loved enough to walk back in", the stone lit from below for the first time in four hundred years, the true eight-cut reading, "the fire is only what they left behind", "four people's worth of fire… nobody did anything wrong", and Law 0's restoration. Nine reveals. PLAYER-MODEL marks three separate overload points inside it and notes that the idea most often missed at ch6_open is the game's own title.

**Fix.** Migrate, don't cut. Two of the nine belong earlier and both already have hosts: (a) "It is held. Not closed — held" becomes a confirmation rather than a surprise if ch6_marrow (ch6.js:487) adds five words to "rung on these bells by four hands" — "…and I have one pair." (b) The why-it-is-dying arithmetic (ch6.js:850) is a payoff instead of a revelation if ch0.js:50 or ch1.js:309 adds "Nobody feeds it. Nobody ever has." That drops the stretch from nine to seven and gives the two biggest ones a run-up. Separately give ch6_ready a line of world ("Four bells, and the names worn off the rims. Only the numbers are left" — rhymes exactly with ch2's four numbered plinths).

**Will a player notice?** High. This is the chapter tables remember, and also the one where the room goes quiet through the two most important sentences because it has just absorbed six.

#### 6. [MAJOR] js/content/ch1.js (329 lines) and js/content/ch3.js (661 lines)

**Problem.** Two of the four chapters between the Prologue and the Bells advance the central mystery by one sentence each. Chapter I: "Founders" occurs once in prose (ch1.js:309) and it is about the Cold Ember; 212 occurs zero times; "the Order" zero. Chapter III: "212" zero, "the Order" zero, "grey" zero, and its sole contribution is the three-word portrait mutter "four went down" (ch3.js:440) — a weaker restatement of what ch2.js:319 already printed in full. Both chapters are excellent at politics, character and table-dynamics (the Vigil vote and the laundry are two of the best beats in the build), but the spine flatlines for roughly the middle third of the evening, and ch3_grid is twenty minutes of bookkeeping sitting in the emotional centre of the game.

**Fix.** Both are one clause. Chapter I: ch1_vote is a puzzle about a body that records its commitments and can be read back against itself — that is the Book of Laws in miniature. One Binder or Sorrel line connecting the nine in the room to the nine who struck Law 0 costs nothing and makes the Vigil the first scene of the cover-up rather than an unrelated political set-piece. Chapter III: one clause on the Seer's corridor map that the laundry's back seam is older than the wall it sits in — or a third seam, bricked, stamped 212. That puts the Founders' skeleton under the school above ground, which is the geography the whole game depends on and which the player is never shown outside the vault.

**Will a player notice?** Low per-chapter, high cumulatively: the table stays engaged but stops accumulating, and arrives at ch6 with the same model of the world it had at the end of ch2.

#### 7. [MAJOR] js/content/ch7.js:341 (ch7_wall, VANE_ALLY branch)

**Problem.** "Twenty-two years. I stood in your Hall with that paint under my nails and told them. They sent me away to learn manners." This retro-fits every scene Vane has been in — "your Hall", "Ilsabet", the bow — and it is the best surprise in the Finale. But nothing in ch0–ch6 says Vane was ever at this school, was ever punished, or ever scraped anything. It cannot be predicted by anyone; it is a character's biography arriving in the last chapter, on a branch most tables never take. The picture that would earn it is already shipped and never read: scenes-ch7.js:83 draws his threads.

**Fix.** One Binder line, at ch1_attune or ch7_vane: "He has two threads. The gold runs to his soldiers. The red runs at this school, and it is older than the gold." That turns the Finale's highest-leverage choice — show him the wall or don't — from a hunch into a deduction, using art that already exists.

**Will a player notice?** Medium-high. Tables that take the risk love the scene; nobody can claim to have seen it coming, which is what the beat is worth.

#### 8. [MINOR] lore.js:57 (Law 0, learned:'ch0'), book.js:122 and book.js:131

**Problem.** The opposite failure to the ones above, and worth recording as deliberate rather than accidental: three of the ending's load-bearing facts are on the Binder's phone from the Prologue. Law 0 — "COLD is written by four hands", struck by the Convocation, 212, see Law 6 — is `learned:'ch0'`. The header fine-print carries Law 3, "the older binds", from ch0 regardless of what is in the learned list (book.js:122). And book.js:131's thread legend carries "not unbound: the knot itself" — which is verbatim the correct answer the Binder must say aloud at ch6.js:676, T8's emotional peak — from minute ten. This is not unearned so much as unmarked: one seat holds the mechanism of the climax for four hours with nothing telling them it is strange.

**Fix.** Gate book.js:131's second clause to ch6 (it is currently ch6's right answer printed in the Prologue), and give the Binder's ch0 page the say-it-aloud instruction every other seat's page ends with: "There is one Law in your Book with a line through it. Nobody has ever told you why. Tonight is not the night to ask." That puts the words "a struck Law" into the room in hour one and makes ch7_fourhands something the table built.

**Will a player notice?** Low. Most Binders open the Book once in ch0 and never reread it, which is the actual defect.

#### 9. [MINOR] ch0.js:185, ch1.js:160, ch2.js:221, ch3.js:458, ch4.js:368, ch5.js:277, ch6.js:499, ch7.js:359, ch7.js:715 vs companion/ch6.js:287

**Problem.** "Warden" is the game's UI label for the keyboard-holder, printed at every one of the nine attunements. It is also the in-fiction word for the person 212 sent down alone to die instead of paying four Sights — used exactly once, on one phone, behind an opt-in tap. The two are never connected and never distinguished. The collision blocks the one word that could make 212's crime legible when the player finally meets it: the table has been calling each other Warden all night.

**Fix.** Either rename the role label (Keeper is taken by the newel oath at companion/ch5.js:180-186; "Hands" or "Keys" is free), or lean in deliberately — one Wren or Binder line at ch6_open noticing that the school kept the word and lost what it cost. Do not leave it as an unremarked homonym.

**Will a player notice?** Low, but it is a free resonance the game currently spends on a UI string.

---

## Unmotivated mystery

*Where is the game coy without having given the player anything to work with?*

**The game is excellent at raising questions and poor at retiring them — but three defects are worse than that: the climax's central claim ("COLD takes four hands") is contradicted by a puzzle the game ships two chapters earlier, the object the whole of Chapter II was spent fetching is never mentioned again, and the entire Year-212 reveal lives in one opt-in collapsible on one phone, carried by a word the game has spent six chapters teaching the table to hear as "whoever has the keyboard."**

### The verdict

The withholding register in PLAYER-MODEL.md is accurate — I verified every entry I checked against source and found no false positives — but it understates three things and misfiles a fourth. (1) The ch5_collapse one-hand COLD is not a breadcrumb opportunity, it is a contradiction that actively arms the table against the climax, and it belongs in CANON §13, not in the breadcrumb bank. (2) The Year-212 reveal's delivery surface is worse than "one phone": it is one phone, one role, one opt-in collapsible, zero Hearth lines — and the word carrying it collides head-on with the game's own name for the keyboard role and for the four player characters (README.md:3). (3) §13.14's "Marrow cannot know the lock, and does" has a mechanism nobody spotted: ch4.js:745-746 prints the wax tell on the shared screen with her in the room, which makes the contradiction a visible error rather than an open question, and also makes the fix two lines instead of a lore ruling. (4) The un-anchored "she" at ch4.js:610 is a distinct defect from §12.69 and is arguably the cheapest high-value fix in the document — one proper noun buys the game's most loaded object its meaning.

The docs are also slightly unfair in one place worth recording: §12.47 ("why does carving WREN make the lamp flare blue, and the moment is never remarked on") is paid off. ch8.js:493 says "You wrote it twice: once in the dormitory, when it was a dare, and once just now," and ch0.js:169's "It flares blue, once, and dies" is precisely Law 0 failing under one hand. That plant-and-payoff is the best long-range structure in the game and is the template for fixing the ch5 collapse.

Deliberate open endings, verified and to be left alone: "what is under the paint" (ch1.js:138 — a promise with a named addressee, the best form a withheld fact can take); "who was never asked" (companion/ch4.js:62 + ch5.js:287 + five arches — three plants, one implication, no answer, and the theory is reachable); "and through it" (companion/ch4.js:213 + ch4.js:524 — partitioned across two seats, horrifying, and confirming it would be worse); whether the Cold is aware (ch6.js:486 plus the mimic lights at ch6.js:512 and the Ember leaning toward the hand at ch2.js:338 — a real basis and a reachable best answer); the mason who cannot spell the name (ch8.js:332); the Reader's untranslated letter in the drawer (ch8_years); and the E1 phone lines at companion/ch8.js:286, where the Provost asks each of the four the same question once a year and never says why — which is the single most elegant unanswered question in the game and should be the model for every fix above.

Total cost of the sixteen defects: roughly thirty lines of text, two of them structural (the ch6 Hearth statement of 212, and the Warden rename). None requires a new scene.

### Findings — 17

#### 1. [BLOCKER] js/content/ch5.js:528-543 and js/content/companion/ch5.js:352, against js/content/lore.js:57 and js/content/ch7.js:726,:740

**Problem.** ch5_collapse is titled 'THE COLLAPSE — ONE HAND', its answer is {1:'ASH', 2:'COLD'} with fourHands:false, and Wren says on solve: "You wrote the cold one. With one hand." The Binder's phone announces the violation in advance — "The newer Law says never. The older says four hands. You are about to write it with one. Say so before the Warden writes it." — and then the game never returns to it. This is not a gap; it is counter-evidence the game plants itself against its own climax. A table that collapsed the stair arrives at ch7.js:740 ("A fire the wrong way up appears in the empty socket, written by four hands") under the banner '"COLD is written by four hands." — Law 0. Restored.' having been shown, mechanically and successfully, that one hand is enough. The player has no way to reconcile it and the game never notices it needs reconciling.

**Fix.** Add one Marrow line to ch5_collapse's solvedText (js/content/ch5.js:540, immediately after 'The stair goes.'): "One hand breaks stone. Four hands write. They are not the same act — one of them lasts." The model for this already exists in the game: ch0.js:169 has the four carve WREN with one hand and the lamp 'flares blue, once, and dies', and ch8.js:493 collects it ("You wrote it twice: once in the dormitory, when it was a dare, and once just now"). Make ch5 the third instance of that same rule instead of its exception. Also file this in CANON §13 as a contradiction — it is currently only a breadcrumb proposal (PLAYER-MODEL.md:720, 'ONEHAND') and is missing from the contradiction register entirely.

**Will a player notice?** High and adversarial. The Binder is instructed to say it out loud before the puzzle is solved, so at least one person at every collapsing table hears 'this breaks the Law' and gets no answer. Two chapters later the same table is asked to find the four-hands rule revelatory.

#### 2. [BLOCKER] js/content/ch1.js:309 and js/content/ch2.js:188 → nothing in ch5, ch6, ch7 or ch8

**Problem.** Marrow establishes the Cold Ember twice with a single stated function: "If the Hearth goes out, the Ember lights it again." The table spends all of Chapter II fetching it, is made to choose between it and Wren's life at ch2.js:366-383, and can lose it two ways. Grep for 'Ember' as an object across ch5–ch8 and companion/ch5–ch8 returns nothing — the only survivor is a flowchart label at ch8.js:149. It is not mentioned at ch7.js:681 ('Midnight. The spark goes out — not guttering, simply gone'), which is the exact and only circumstance its stated function covers, nor at ch8.js:311 ('four hundred years of fire, again, from a spark'). The one acknowledgement in the game is Marrow's "Then we do without it" at ch2.js:396, and it fires only on the branch where the Ember is dropped.

**Fix.** Eleven words in Marrow's mouth at ch6_marrow (js/content/ch6.js:485, after "It knows. It always knows when somebody kneels here."): "And the Ember lights a fire. It does not close a wound." That kills the hypothesis on purpose, at the beat the table is most likely to raise it, in the voice of the person who sold it to them in Chapter I. If the author instead wants the Ember to matter, the line belongs at ch7_cold (js/content/ch7.js:681) and must be branched on EMBER_LOST — but then the whole Chapter II choice re-prices and that is a bigger decision.

**Will a player notice?** Certain. Four people who chose the Ember over their friend's arm at ch2.js:379 will raise it at the Decision. The game cannot hear them.

#### 3. [BLOCKER] js/content/companion/ch6.js:283-288 (opt-in bookExtras, Binder only); the word 'Warden' at js/content/ch0.js:185, ch1.js:160, ch2.js:221, ch3.js:458, ch4.js:368, ch5.js:277, ch6.js:499, ch7.js:359,:715, ch8.js:512, companion/ch5.js:352, README.md:3, docs/HOST.md:44

**Problem.** Two problems in one line. (a) The whole political spine — "Four Masters, four Sightings. The Convocation would not pay it. They struck the Law and called it grammar" / "Two hundred and twelve years after the Founders the seal failed… The Convocation sent one Warden down instead" — is delivered once, on the Binder's phone only, inside a t:'reveal' collapsible the player must tap, gated on ctx.unlocked('ch6'). No Hearth line states any of it. The Hearth's only surface trace of 212 in the entire game is an uncaptioned three-digit number painted on an arch (js/art/scenes-ch2.js:100). A table whose Binder does not open that block, or opens it and does not read it aloud, finishes the game without the answer to why any of this happened. (b) The word carrying it, 'Warden', appears in the fiction exactly once — here — while appearing ten times as the label for whoever holds the keyboard, and again in the game's own logline (README.md:3, 'Four fourth-year Wardens of Thornhallow') and host guide. The table has been trained for six chapters to hear 'Warden' as a chair at the table. The most devastating sentence in the game lands as noise.

**Fix.** Two changes. (a) Put the refusal on the Hearth. At js/content/ch6.js:850, after Marrow's "Nobody did anything wrong. It was only ever four people," add: "Two hundred years later it failed once before. Four Masters were asked for their Sight. They said no, and struck the Law, and called it grammar." That is the one beat where the table is already holding the fire-is-four-people reveal and can price the refusal against it. (b) Rename the mechanic, not the fiction: change every roles: line from 'Warden (keyboard)' to 'Hands (keyboard)' or 'Keys', and leave 'Warden' to mean only the person the Convocation sent down alone. Then fix README.md:3 to call the four something else. Done, the ch6 line becomes: they sent one of us.

**Will a player notice?** Low in the moment — which is the defect. Nobody notices being under-told. The symptom is a table that finishes the game unable to say what the Order did or why, having enjoyed every puzzle.

#### 4. [MAJOR] js/content/ch7.js:362-399 (ch7_decision and its four branches) vs js/content/companion/ch7.js:184-190 and js/content/ch8.js:287

**Problem.** The most important choice in the game is made before anyone has been told in public what it costs. The scene order is ch7_attune → ch7_decision → ch7_dec_* → ch7_tokens_intro (ch7.js:359, :362, :440). The price exists only as four private per-seat lines on the SPEAK page ("If you walk, you will not read tomorrow…"), behind the house rule 'Never show your phone', and the general rule is not stated by any character or any Hearth line until ch8.js:287 — after the fact. So four people vote to walk into the Cold, each privately knowing what they personally lose, none of them knowing that the other three lose theirs too, and Marrow — who knows exactly what it costs, because she has read Mere's sheet — says nothing.

**Fix.** Either (a) one Marrow line at ch7_decision (js/content/ch7.js:366, before 'The ring has been ready for fourteen years'): "Understand what you are voting on. Whoever goes in comes out the way the Founders came out. You will not get it back." — or (b) rule the private version deliberate and record it, because the beauty of choosing out of love and learning the price afterwards is real. What is not defensible is the current state, where the ambiguity is accidental and the four cannot tell whether the other three understood.

**Will a player notice?** High on any table where one player has read their SPEAK line and is deciding whether the house rule lets them say it. That hesitation is happening at the climax.

#### 5. [MAJOR] js/content/ch0.js:51-52 — the Prologue's first fact and the chapter's own title, *The Night the Hearth Guttered*

**Problem.** "The fire is called the Hearth. It has never once gone out. Except one night, fourteen years ago. When it came back, there was a baby asleep on the stones." The game never offers a single piece of evidence, anywhere, on any surface, about why it went out that night. The nearest thing is Marrow's ch6.js:689 "It came out of the fire the night the Hearth guttered. I picked it up" — which describes the effect and not the cause. The table asks this in minute three, carries it for eight hours, and can form no hypothesis but 'magic'. ch6.js:850 answers why the fire is *dying* (four people's worth of fire, four hundred years to spend it in) and that answer explicitly does not cover a one-night outage fourteen years ago, so the strongest late reveal in the game makes this question sharper rather than closing it.

**Fix.** Cheapest: one clause at js/content/ch0.js:52, cls 'small': "Nobody has ever said why." — which converts a hole into an acknowledged hole. Better: give it an owner at js/content/ch1.js:309, in Marrow's mouth after "It has not done that in fourteen years": "I have a guess about that night. I have never said it in this hall." That makes the silence a character's choice, which is what the rest of the game does with withheld facts (ch0.js:64, 'nobody will tell you where', is the model).

#### 6. [MAJOR] js/content/ch4.js:745-746 against js/content/lore.js:64 (Law 4) and js/content/ch7.js:387

**Problem.** Law 4, in the Binder's Book from Chapter IV, ends: "The one you swear to cannot tell the difference." The entire weight of the KNOT/EMBER choice rests on that clause. But the Hearth screen — with Marrow standing in the room — prints the tell: "The ring closes under KNOT, and the wax of the seal softens, as if warmed" vs "The ring closes under EMBER. The wax does not change." Then at ch7.js:387 Marrow names the lock and is right. CANON §13.14 flags that she cannot know and does, but misses the mechanism: the game hands her the evidence on the shared screen, in public, three chapters earlier. So the contradiction is not a mystery, it is a visible mistake a Binder will catch.

**Fix.** Two options, both cheap. (a) Move the tell to the Binder's phone: cut ':745-746' to a single neutral Hearth line — "The ring closes. The wax takes it." — and put the wax behavior in companion/ch4.js's Binder SIGHT block, where the partition says it belongs. Then Law 4 is true and Marrow's ch7 line needs the second fix. (b) Keep the wax and make ch7_argue1 pay it: after "You swore under KNOT, and it cannot be unbound" (ch7.js:387), add Binder-facing exchange — "You cannot know that." / "No. I cannot. I watched the wax." Option (b) is better: it converts a contradiction into a character beat and opens Year 340 (§12.8), the richest unexploited date in the game.

**Will a player notice?** Binder-specific and high. The Binder chose the lock believing it was unreadable, and is the one person holding the Law that says so.

#### 7. [MAJOR] js/content/ch4.js:610, against js/content/companion/ch4.js:257 and :196

**Problem.** "Unrolled: the words she said before she went out, and under them a ring of four slots." The nearest antecedent for 'she' is Provost Marrow, named three lines earlier at ch4.js:607, and 'went out' then means 'left the study a minute ago' — a trivial, almost meaningless reading. But the Binder's page says "The Provost's scroll is Founders' work. It is not a Vigil ward like the Tower door," and the Reader's page says the three words are "cut round the ring, worn nearly smooth." The scroll is four hundred years old. So 'she' must be a Founder — probably Mere — and 'went out' means 'walked into the Cold'. The four are swearing the words a Founder said before she went down. That is enormous, and the sentence makes it unreachable by supplying a nearer, wrong antecedent. This is separate from CANON §12.69 (the oath's text is never printed): here it is not the words that are withheld, it is whose they are.

**Fix.** One word, at js/content/ch4.js:610: "Unrolled: the words Mere said before she went down, and under them a ring of four slots." If the author wants the identification to stay open, the fix is still to break the false antecedent — "the words somebody said, four hundred years ago, before she went down" — so the table is arguing about *which* Founder instead of silently reading it as Marrow leaving the room.

**Will a player notice?** Medium at the table, total for the Binder and Reader, who are each holding a page that says the object is Founders' work while the Hearth attributes its text to the woman in the doorway.

#### 8. [MAJOR] js/content/ch5.js:344-349 (ch5_marches) and js/art/scenes-ch5.js:64-67

**Problem.** The game's most beautiful image is also its purest withholding. "Below, a cavern with no far side, and drowned arches in black water. On a shelf above them, four thrones. Empty." The art adds that the drowned First Hall has five arches — the one un-four number anywhere underground — and that the thrones sit above the waterline, so either something raised them or something drowned the hall afterwards. Three loaded questions (whose thrones, what drowned it, why five) with zero evidence on any surface, phone or Hearth, for any of them. The only comment is Wren's joke, ch5.js:349: "Four thrones. Four Founders. It is a theme." — which is the game telling the table not to think about it. That joke is the tell: the scene is presented in the grammar of a clue and contains none.

**Fix.** Three clauses, all paid for by material already drawn. (a) At ch5.js:347, after 'four thrones. Empty.': "Their backs are cut as crowns. Somebody sat in them before anyone here was born." (b) On the Seer's ch5 SIGHT page, one line: "Five arches under the water, and four thrones above it. Somebody counted differently down here." — which links this scene to Mere's "One was never asked" (companion/ch4.js:62) and to Mere's door for the unasked (ch5.js:287), turning the game's best unlicensed theory into a supported one. (c) At ch5.js:346, one clause on the water: "The water is not rising. It has not risen in four hundred years." — because a drowned hall that is stable is a fact, and a drowned hall with no comment is scenery.

#### 9. [MAJOR] js/content/ch8.js:283-322 (ch8_e0, ch8_years, ch8_e1) and ch8.js:350-360 (ch8_e4)

**Problem.** Provost Marrow is absent from three of the five endings, including ENDING 0 — the ending in which four children she sent down herself supersede her fourteen-year plan, in front of her, and walk into the Cold. ch8_e0 and ch8_years contain no Marrow. ch8_e1 contains no Marrow. ch8_e4 contains no Marrow. She appears only in E2 (ch8.js:333, holding a grey thread) and E3, where she walks in herself. This is not ambiguity; it is a missing person, and the character whose fourteen-year grief the Binder has been reading all night simply stops existing at dawn on the best ending. Vane's fate is likewise never mentioned on E0–E3 (js/content/ch7.js:341-343 removes him from the fiction on VANE_ALLY with four soldiers still on the stair).

**Fix.** One sentence in ch8_e0, at js/content/ch8.js:290, after 'There is a pulse in Wren's throat': "Provost Marrow is sitting on the stones with her back against the wall, doing nothing at all, which nobody here has ever seen." And one clause in ch8_years (ch8.js:311) so she survives the timeskip: "The Provost writes, every year, on the wrong date, on purpose." For Vane, one line at ch7_wall (ch7.js:343) after 'I will not be the thing you have to be brave about': "He goes up the stair. His captain is still on it, and his captain does not know yet." — which at least tells the table what is still true when they turn around.

**Will a player notice?** Certain and immediate. A table that just won will ask where she is before the card finishes.

#### 10. [MAJOR] js/content/ch3.js:543 (the captain's threat) vs js/content/ch3.js:644-645

**Problem.** The chapter's harshest choice — SURRENDERED, −2 WREN_TRUST, handing a fourteen-year-old to soldiers — is bought with "Hand over the boy, or the Provost hangs. The Envoy has her in the Great Hall with a rope over the beam." One scene later, on *every* branch including the one where the table surrendered, the flowchart prints "The rope came off the beam an hour ago." The stake is not mysterious; it is retracted, and retracted identically whether you paid it or not. Worse, the table already had a way to know: the Listener has heartbeat-sight and the captain is standing in front of them, and the game never offers the read.

**Fix.** Give the Listener the read at the moment of the choice. At ch3_door (js/content/ch3.js:548), add a whisper line: "Listener — his heart has not changed since he started talking." Then the surrender becomes a read the table could have made and got wrong, which is a real cost. Keep 'the rope came off the beam an hour ago' — it is a good line — but let it land as a confirmation of a deduction rather than a refund.

#### 11. [MAJOR] js/content/ch2.js:314-320 (CH2_STRIP) → read nowhere outside ch2.js

**Problem.** On the optional niche path in Chapter II the table reads Mere's strip from its mark and is told, in plain English: "KNOT, CROWN, THORN — four, as one, went through. Not one. And the stone above the Hearth has said one born of four for four hundred years." That is the game's central reveal, four chapters early, correctly earned by a puzzle. CH2_STRIP is then read by exactly one thing: its own chapter's flowchart label (ch2.js:156) and stats line (ch2.js:414). ch6_stone (ch6.js:824-828) delivers the same discovery as though it were new, with no branch, no line, no Marrow reaction for a table that already knew. So the reward for the game's best optional discovery is that the game behaves as if it never happened.

**Fix.** One swapped clause in ch6_open's text (js/content/ch6.js:836), gated on Store.chose('CH2_STRIP','right'): after 'Four went down. Not one born of four — four, as one', add "You read that off a hand's-width of stone behind a plinth, six hours ago, and nobody believed you." And one Marrow line at ch6_stone (ch6.js:824) on the same flag: "You had it in the vault. I saw your faces when you came up." ch5_descent already models the right pattern in reverse — the game knows how to do this.

#### 12. [MAJOR] js/content/ch0.js:171-175 and ch0.js:226

**Problem.** Before any of the four has spoken, Wren names all four private facts: the two shapes only the Reader can read, the hum "nobody else in this room has ever heard" (companion/ch0.js:104), the cuts under the brass "that nobody has ever seen", and the ring rule "nobody else was taught". Then at ch0.js:226: "Yes. All four of you. I've known for years." Wren has just demonstrated knowledge of four gifts that the game's own governing rule says are strictly partitioned and private (ch0.js:175, "Nobody has all four"). The narration does not mark it, no character asks, and nothing in eight chapters returns to it. This is the game's single largest unearned moment and it is in the first twenty minutes — and it is also, unnoticed, the strongest possible plant for what Wren turns out to be.

**Fix.** One narration line after ch0.js:226: "Nobody asks how Wren knows. Nobody ever has." That costs nine words and converts the game's largest unearned moment into its first plant — the hollow is in every room, which is exactly the §12.5(a) answer the Epilogue depends on. It also gives the table the licence to notice, which is the whole difference between withholding and intrigue.

#### 13. [MINOR] js/content/ch4.js:607

**Problem.** "The stair creaks. Provost Marrow is back early, and does not say why." The narration explicitly flags a gap and then refuses to fill it. There is no candidate explanation anywhere in the game, on any surface, on any branch. Pointed withholding is worse than silence, because it tells the table there is an answer.

**Fix.** Make it mean something, in the same sentence: "Provost Marrow is back early. There is bell-chamber chalk on her cuff." (She went down to start the Sealing — which is what ch6.js:487 says she has been doing.) Or delete 'and does not say why' and let her simply be back.

#### 14. [MINOR] js/content/ch6.js:470 and js/art/scenes-ch6.js:31-38, :94-95

**Problem.** The bell-chamber floor is a manufactured object: twenty-eight rivets, a cross-brace, a central hub, worked iron, drawn in detail. Above it an engineered masonry shaft puts the Hearth directly over the seal's centre. Somebody built a lid for a hole in the world and cut a sightline from the fire to it, and no character, page, caption or Book entry ever offers a candidate — not the Founders, not 212, not the school. The prose says only "You are standing on a lid."

**Fix.** One clause in Marrow's ch6_marrow speech (js/content/ch6.js:487), after 'I can close this wound': "The Founders left the fire. Somebody else, later, left the iron. Nobody signed it." That gives the table a two-candidate question instead of a blank, and it costs nothing — it is already true on both readings of 212.

#### 15. [MINOR] js/content/ch6.js:593

**Problem.** "Then the chamber goes dark. Not the lamps. There are no lamps. The light simply stops." The chamber has been lit for the whole chapter by an unnamed source, and the narration draws attention to that only at the moment it stops. Nothing before or after names what was lighting it. The dark is the most atmospheric beat in Chapter VI and it is a non-sequitur, because the player never knew there was anything to lose.

**Fix.** Name the source one scene earlier so the dark is a consequence. At ch6.js:472 (the shaft line, 'at the top of it a coin of orange light'), extend: "Everything down here is lit by it. There is nothing else." Then ch6.js:593 reads as the Hearth being covered or looking away, which is a fact about the fire and not a mood cue.

#### 16. [MINOR] js/content/ch0.js:241-242

**Problem.** "A Sighting. One way of seeing, one to a person, and nobody chooses which one they get. … Every one of them has a Sighting of their own." Two dangling promises in one paragraph, both in the Prologue's last beat. (a) Wren is standing in the room when the rule is stated and the question of Wren's Sighting is never raised by anybody, ever. (b) The nine Masters' Sightings are asserted once and never used, named or defeated — and Chapter I then puts nine perceivers in a room containing two Crown-bought votes (companion/ch1.js:125-126) and a soldier standing behind seat 6, and not one of them reports it.

**Fix.** (a) One Wren line at ch0.js:242: "Don't. I know what you're about to ask. I don't have one, and nobody will tell me why not." — which arms the whole game's central question in the Prologue and costs one line. (b) Either cut 'Every one of them has a Sighting of their own', or spend it on Oriel, who is already written as watching Wren 'like a sum she was doing' (ch1.js:305): one line at ch1_prices making clear she is *seeing* something and will not say what.

#### 17. [MINOR] js/content/ch2.js:390 (ORIEL branch) → js/content/ch7.js:60-62

**Problem.** On the ORIEL branch the table promises a Master everything they find below; she meets them at the top of the stair — "She has come to be told" — and the scene ends there, with no line for what was told or what she did with it. She reappears once, in the Finale's arrival line (ch7.js:60): "Master Oriel came down behind you and says nothing, loudly," and never speaks again on any branch. The only content she ever gets is a note found under a cushion (ch4.js:588). A price was paid, a promise was kept, and the game records neither. On the adjacent branch, ch7.js:62 does the same to two Masters it does not even name: "Two Masters whose price you would not pay watch from the edge."

**Fix.** One Oriel line at ch7_start, gated on ORIEL, after the arrival line: "You told me all of it in a corridor at midnight and I believed you, which is why I am standing here instead of in my bed." That retires the promise, pays the ch2 choice, and gives the Finale's only witness a reason to be in the room.

---

## Contradictions

*Where does the game disagree with itself?*

**The story is in far better logical shape than its size suggests, but the Epilogue's closing reveal is false on four of the five endings, one Chapter II branch narrates the opposite of its own flags, and the Cold Ember — the entire motive of Chapter II — is a loaded gun that is never fired and never unloaded.**

### The verdict

The spine holds. I could not break the core revelation chain: the four/one substitution is planted in ch0 (the blue flare, the name in old letters, four anomalies), corroborated in ch2 (the strip's two readings, the bricked 212 arch), dated in ch4 (Mere's sheet, the tapestry's fourth and second figures), paid for in ch5 (Law 5 vs Law 11, Law 0 vs Law 6), and discharged in ch6 (readTurned over STONE reproduces exactly, the glosses gloss). I recomputed every puzzle answer by hand and every one matches its hint ladder, its rule card and its companion pages — including ch6's 32-beat lane partition, which is exact to the digit. That is rare and it is worth saying plainly: the *puzzle* layer is rock solid, and most of the remaining defects are in the prose that surrounds it. The real damage is concentrated in three places. (1) The Epilogue does not branch enough: ch8_words asserts an ENDING-0 fact on all five endings, ch8.js:176 miscounts the bells, ch8.js:346 contradicts ch6's loudest line, and ch8_night dates the Prologue to the wrong night — four blunt errors in the twenty minutes the game reserves for meaning. (2) Chapter II's SORREL branch narrates the opposite of its own flags, and its central object, the Cold Ember, is never picked up again by anybody, including the woman who sent them for it, in the scene where the fire goes out. (3) The Binder's rule set is the one system that genuinely does not close: five rings, four start rules, and both criteria the game supplies are falsified by rings it also ships. Everything else on this list is a clause or a ternary. Two notes on process: docs/CANON.md §13 is unusually accurate — I verified about twenty of its entries against source and found three I would push back on (§13.21, §13.36, §13.43) and none that were simply wrong about what the code does, which is a better hit rate than I expected. And the highest-leverage fix in the whole list is the cheapest: gate companion/book.js:131 on `maxChapter >= 6` and Chapter VI's best beat stops being a lookup.

### Findings — 20

#### 1. [BLOCKER] js/content/ch8.js:493 (ch8_words), against js/content/ch7.js:722-745 (ch7_cold_slot → ch7_fourhands) and ch7.js:753 (ch7_binding's next)

**Problem.** The game's closing reveal is printed unconditionally on every ending: "The eighth is the rest. The rest is never carved. You wrote it twice: once in the dormitory, when it was a dare, and once just now." But COLD is only ever written at the eighth socket on ENDING 0 — ch7_binding routes `s.flags.ENDING === 0 ? 'ch7_cold_slot' : 'ch7_ending'` (ch7.js:753), and ch7_fourhands (the only place the glyph is written by four hands) sits behind it. On the Half-Walk, the Sealing and the Keeper's Walk nobody writes it; on the Envoy's Bargain (ch7_dec_vane → ch7_ending) the Great Sigil is never even built. ch8_map → ch8_words is unconditional, so four tables in five are told, as the game's last big line, that they did a thing they did not do. The same paragraph's "twice" is also wrong upward on two reachable paths: ch5_collapse writes COLD into the newel post ({1:'ASH', 2:'COLD'}, ch5.js:531) and ch7_sigil's hint 3 invites COLD into the empty socket when WALK_UNLOCKED (ch7.js:615).

**Fix.** Make the last clause conditional on the ending, e.g. `ENDING===0 ? 'and once just now.' : 'and the fire has been waiting for the second time ever since.'` Cheapest safe version: split the omen into two variants keyed on `ending(s) === 0` the way ch8_start already keys its five branches. If the collapse/hint-3 writings are to stay, drop the word "twice" entirely and say "you have written it before, and it was a dare."

**Will a player notice?** Very high. It is read aloud on the shared screen as the final reveal, and on ENDING 4 the table has just watched Wren carried off in a cage without touching the ring. Four of five tables hit it.

#### 2. [BLOCKER] js/content/ch2.js:383 (ch2_top enter) vs :395, :408, :419

**Problem.** On SORREL + `CH2_STAIR = 'ember'` (you promised Sorrel the Ember and then caught it instead of Wren), `enter` sets `EMBER_LOST = true` and notes "the Convocation's guards took the Ember" — but the prose four lines down still runs the non-Wren branch: "She takes the case in both hands. Then she sees how Wren is holding one arm." (ch2.js:395). Marrow visibly takes the case. Then ch2_flow prints "The Cold Ember is not coming up tonight." (ch2.js:408) about a case the table just watched come up and change hands, and the stats line says "the Ember went to the Convocation." (ch2.js:419) — a transfer that is never narrated. The flow node `ch2_sorrel` labelled "The Convocation took the Ember" (ch2.js:162) has no scene behind it.

**Fix.** One conditional clause in ch2_top's text: when `s.flags.SORREL && Store.chose('CH2_STAIR','ember')`, replace :395 with something like "She reaches for the case. The writ reaches it first." and let Marrow's "The Ember." be answered by the guards. And swap ch2_flow:408 for a third state — "The Cold Ember is in the Convocation's hands, and not the Provost's."

**Will a player notice?** High on that branch. The screen says she is holding it and then says it never came up, two clicks apart, and the ledger the table reads aloud disagrees with the scene they just played.

#### 3. [MAJOR] js/content/ch1.js:309 (and ch1.js:245), against js/content/ch7.js:681 and every ending in ch8.js

**Problem.** Marrow states the Ember's function twice, unambiguously: "Under this school the Founders left the Cold Ember. If the fire goes out, the Ember lights it again." (ch1.js:309) and "Then bring me the Cold Ember from under the school. I will get the child back myself." (ch1.js:245). That is the entire motive for Chapter II. After Chapter II the object disappears: grepping the shipped content, "the Ember"/"Cold Ember" appears again only in ch3.js:403 (a writ reference) and ch8.js:149 (a place name). `EMBER_LOST` is read by exactly one consumer in the whole game — companion/ch5.js:275, where it cracks the second bell of the Silent Gate for no stated reason. At ch7.js:681 the fire actually goes out ("Midnight. The spark goes out — not guttering, simply gone") with Marrow standing there, and on the branch where the Ember came up it is on her desk (ch2.js:408) and nobody mentions it. No line anywhere says the Ember relights the fire but cannot close the wound, which is the one sentence that would make the Finale necessary.

**Fix.** One clause from Marrow, ideally at ch5_start where she states the plan: after "The fire is going out. Tonight I take the child down and shut it again," add "The Ember can light it again. It cannot shut what the fire is sitting on." And one clause at ch7_cold or ch7_dec_refuse naming the Ember and refusing it.

**Will a player notice?** High, and it is the kind a table argues about afterwards rather than during: "wait — why didn't she just use the thing she sent us to get?" Chapter II is named after it.

#### 4. [MAJOR] js/content/companion/ch0.js:132-134, companion/ch3.js:265-266, companion/ch4.js:257, companion/ch5.js:329-330, companion/ch7.js:230

**Problem.** Extends docs/CANON.md §13.3, which is correct but stops one chapter short. The Binder is given five rings and four different rules for where a ring starts, and both criteria the game offers to sort them are falsified by rings it also ships. (a) ch0 lamp — "A sigil begins at the scratch — that is the mark. A notch is only a maker's signature" (companion/ch0.js:132), sunwise. (b) ch3 Tower ward — "The dormitory lamp was Founders' brass… This is not one… It begins at the notch", widdershins (companion/ch3.js:265-266). Criterion offered: Founders' work vs Vigil ward. (c) ch4 oath scroll — "The Provost's scroll is Founders' work. It is not a Vigil ward like the Tower door — so a sigil begins at the scratch" (companion/ch4.js:257). Consistent with (a) under that criterion. (d) ch5 Mere's gates — Mere is a Founder and the gates are "four hundred years old" (ch5.js:333), yet "A scratch on a Founders' door is only where the mason rested the tool" and the sigils begin at the chip and the notch (companion/ch5.js:330). That kills criterion 1. ch5 then offers criterion 2 — "Above ground a sigil begins at a scratch" (companion/ch5.js:329). (e) ch7 Great Sigil — the deepest, oldest Founders' work in the game, at the bottom of the world, quotes Law 1 and says "The mark is the scratch. A notch is only a signature" (companion/ch7.js:230), SCRATCH = 6. That kills criterion 2. The scratch rule also has no dated Law behind it anywhere in lore.js.

**Fix.** Pick one axis and date it. Cheapest: make it the ring's *purpose*, not its age or its altitude — a sigil that OPENS begins at the scratch (lamp, oath, Great Sigil), a sigil that SEALS begins at the keeper's own mark (Tower ward = notch; Mere's gates = chip/notch). That is one clause on each of the five Binder pages and changes no accepted board. Then delete ch5's "above ground" framing and ch4's "Founders'/Vigil" framing, both of which are now wrong.

**Will a player notice?** High for one player and invisible to the other three. The Binder reads all five pages on the same phone in the same card style, and ch5:329 explicitly invites the comparison ("Everyone at this table has heard you say so twice tonight").

#### 5. [MAJOR] js/content/companion/book.js:131, against js/content/ch6.js:678

**Problem.** The Binder's permanent Book page prints, ungated from the Prologue on: "No thread — unbound; or, once, 'not unbound: the knot itself.'" That is word for word the correct option at ch6's Second Asking — "None. Not unbound. The knot itself." (ch6.js:678) — the emotional centre of Chapter VI and one of the four answers ch8 counts (CLUES). Every comparable Book entry is gated on `ctx.maxChapter` (book.js:75 WREN's gloss, :84 the plinth order, :87 the older alphabet); this one is not. Confirms docs/CANON.md §13.44; verified against source.

**Fix.** Gate it: `n >= 6 ? '…or, once, "not unbound: the knot itself."' : ''`, exactly as book.js:75 does for the WREN gloss. Nothing else on the page needs to move.

**Will a player notice?** Medium at the table, total in effect. The Binder has had the phrase in their pocket for two hours; when Wren asks they will answer instantly and correctly, and the beat lands as trivia rather than as recognition.

#### 6. [MAJOR] js/content/ch3.js:552 and ch3.js:403, against js/content/ch1.js:255-263

**Problem.** At the Tower door the four can produce a physical document: option `writ` — "The Convocation's seal. Read it, captain." with sub "Sorrel gave you her writ." (ch3.js:552), and ch3_stand narrates "Master Sorrel's writ, the one she gave you for the Ember. He reads it twice by lantern-light." (ch3.js:403). Sorrel never gave them anything. Her whole scene is a verbal price — "Under this school is a thing called the Cold Ember… it comes to the nine of us" / "Good. See that you keep yours." (ch1.js:255, :263). The only Convocation writ in the game belongs to the guards who come to *take* the Ember from them (ch2.js:388). This is the only non-Vane route past the captain and it feeds `DOOR='WRIT'` into ch4 and ch5.

**Fix.** Six words in ch1_prices' sorrel `after`: "…and presses a folded writ into your hand. 'Show that to anyone who stops you.'" Or, if the writ should stay untaken, re-point the option at ch2's writ — "The writ your guards left on the stair" — and adjust ch3.js:403 to match.

**Will a player notice?** Medium-high. The sub-line names an object the table never received, on a choice they are weighing under a 75-second clock; someone at the table will say "do we have a writ?"

#### 7. [MAJOR] js/content/ch4.js:85 (`computeLaw0`), mirrored at ch5.js:8, consumed at companion/ch5.js:333 and ch5.js:355

**Problem.** `Store.set('LAW0', !!(f.LETTER_READ || f.TAPESTRY || f.ORIEL))`. `ORIEL` is the Chapter I *promise* flag (ch1.js:265), not `ORIEL_NOTE` (set only when the chair corner is solved, ch4.js:585). So a table that merely told Master Oriel "tell me what you find below" hours earlier arrives at the Silent Gate with a struck Founders' Law restored to the Binder's Book, with no scene, note or line of prose in between: the Binder's page simply flips from "the newer Law leaves that slot empty" to "the older Law writes it in" (companion/ch5.js:333-335), and it changes which board the gate accepts (ch5.js:369). ch4.js:82-84 flags itself: "ORIEL is the ch1 promise rather than ORIEL_NOTE, which looks wrong." Related, and unflagged: the Reader's Book delivers Mere's translated sheet on `LETTER && maxChapter >= 5` (companion/ch4.js:71), so a table that took the rubbing but failed the desk corner has "We wrote the cold glyph with four hands" in hand at ch5 while `LAW0` is false and the Binder is being told COLD is never written.

**Fix.** Two edits that must land together (ch4.js:85 and ch5.js:8 compute the identical expression and must agree): change `f.ORIEL` to `f.ORIEL_NOTE`; and change companion/ch4.js:71's gate from `u.flags.LETTER` to a ch5 cast bit carrying `LETTER_READ` (ch5's cast has bit 3 spent on LAW0, so the cheapest version is to let `LAW0` itself gate the sheet). If the promise route is wanted, buy it a line: Oriel scraped the paint as a girl (ch4.js:588), so a note back from her is nearly free in fiction.

**Will a player notice?** Low at the table, high in the author's model — it is the single largest unexplained causal jump, and it silently changes a puzzle's answer.

#### 8. [MAJOR] js/content/ch8.js:346 (ch8_e3), against ch6.js:689

**Problem.** The Keeper's Walk epilogue: "Wren, who once called someone Mum by accident, looks at the fire when it flickers." Wren calls Marrow Mum at least once on every playthrough and deliberately: ch6.js:689, "And — Mum. I know. I have known since the laundry. Tell them. You are allowed." — unconditional, on the shared screen, in front of everyone, and the emotional hinge of the chapter. Three more conditional uses: ch0.js:233, ch4.js:770, ch5.js:287. "Once" and "by accident" are both false. Confirms docs/CANON.md §13.13.

**Fix.** "Wren, who called her Mum in front of four strangers and never took it back, looks at the fire when it flickers. Not at them."

**Will a player notice?** High on that ending. The ch6 line is forty minutes earlier and is the loudest thing Wren says all night.

#### 9. [MAJOR] js/content/ch8.js:176 (COUNTS), against ch6.js:470, :299, :875

**Problem.** The Epilogue's read-aloud ledger says "Three bells to keep whole. You cracked {n}." The bell-chamber has four: "Four bells hang from a beam of black iron, each the height of a person" (ch6.js:470); ch6's own failure line counts out of four — "A bell is cracked. {c} of four." (ch6.js:299); ch6_flow says "The four bells came through whole" (ch6.js:875); the art draws four; ch7 mutes up to three lanes out of four. The only justification is `Math.min(3, …)` in crackBell (ch6.js:165), i.e. the fourth bell can never crack — which no line of prose states. Confirms docs/CANON.md §13.10.

**Fix.** Change ch8.js:176 to "Four bells over the lid, and three that could break. You cracked {n}." — or say in ch6 why one bell cannot be lost (it is the one Marrow's rope is tied to, say), and keep ch8's line.

**Will a player notice?** Medium-high. The table spent a chapter looking at four bells; the Epilogue is where they are counted out loud.

#### 10. [MAJOR] js/content/companion/ch6.js:232-233, against js/content/lore.js:57, :67 and companion/book.js:125

**Problem.** Two cards headed "Law 0 · Founders' · Year 0" carry different texts on the same phone. The Book tab renders `l.text` straight out of lore.js (book.js:125): Law 0 = "COLD is written by four hands."; Law 6 = "COLD is never written; where an inscription shows it, leave the slot empty." The Sight tab in ch6 shows Law 0 = "Read a line as the cuts count down. Every cut says its other word. COLD is written by four hands." and Law 6 = "Begin at the mark and read as the cuts count up. A cut says the word it stands for. COLD is never written." The prophecy-stone puzzle turns on exactly the two clauses the Book omits, and those clauses silently duplicate Law 10 (lore.js:63) and Law 11 (lore.js:66). Same card also attributes Law 6 to "the Convocation's" where every other law card in the game, including companion/ch7.js:32's helper and book.js:122, says "Order's". Confirms docs/CANON.md §13.8 and §13.9.

**Fix.** Have ch6's Binder page cite Laws 10, 11 and 0 by number and render them through the same `laws()` helper companion/ch2.js:21 uses, so there is one text per Law in the game. Separately, pick one institution name: lore.js:57's own note already says the Convocation struck Law 0 in 212, so either rename era 'O' to "the Convocation's" everywhere or change this one card.

**Will a player notice?** Medium. Only the Binder sees it, but the Binder is the one player who tab-switches between Book and Sight constantly, and ch6's puzzle rewards doing exactly that.

#### 11. [MAJOR] js/content/companion/ch4.js:271, companion/ch5.js:290, companion/ch8.js:195

**Problem.** Wren is pronoun-free in every Hearth line in the game ("There is a pulse in Wren's throat", "Wren visits", "Wren's shadow"). The Crown's people are the only in-fiction voices that gender Wren, always male: ch1.js:280-281, ch3.js:204, :394, :543, :550, ch7.js:315, companion/ch7.js:138, :182 — all "the boy"/"him". Three companion lines break the convention, and two of them break it the other way: companion/ch4.js:271 "A thread reaches her from the woman who named her"; companion/ch5.js:290 "still spells her name Wrenn… You have never asked her"; companion/ch8.js:195 (Marrow, Keeper's Walk) "Read him the name properly, one day." So the three exceptions do not even agree with each other. Confirms docs/CANON.md §13.4.

**Fix.** Rewrite all three to the house rule. companion/ch4.js:271 → "A thread reaches Wren from the woman who named her. Nothing comes back." companion/ch5.js:290 → "still spells the name Wrenn… You have never asked her about it." companion/ch8.js:195 → "Read the name properly to Wren, one day." Leave the Crown's "boy" — it is the one thing that makes the convention legible as a convention.

**Will a player notice?** Medium. Two phones say "her", one says "him", and the shared screen says "the boy" in the same hour; a table that talks about Wren after the game will notice they cannot agree.

#### 12. [MAJOR] js/content/ch8.js:145 (HOURS[0]) and the ch8_night brief, against js/content/ch0.js:67, :242, ch0.js:40

**Problem.** ch8_night opens "The night, from the dormitory to the Cold. Eight hours." and draws the Prologue as hour one on one thread. But the Prologue is explicitly the night *before*: "The masters come in the morning to argue about it. Tonight is only the night before." (ch0.js:67); "Tomorrow you will stand at the back of a hall while grown-ups decide about Wren." (ch0.js:242); the flow node into ch1 is literally labelled "Tomorrow" (ch0.js:40). Chapters I–VIII all run on the Vigil night (ch1.js:310 "Tonight. I am sending you tonight"). docs/CANON.md §13.1 catches the ch0.js:133 half of this but not the Epilogue's, which is the one the table reads. (ch8_words:493 is clean — it lists ch1–ch7's words only and never claims the dormitory was the same night.)

**Fix.** "The night, and the night before it. Eight hours that counted." — or drop "Eight hours" and let the KINDLE row carry "the night before" in its `where` field, which is already how the row is styled.

**Will a player notice?** Medium. The Prologue says "tomorrow" three times inside twenty minutes, and ch8_night is a slow, one-line-at-a-time recap designed to be read out.

#### 13. [MINOR] js/content/ch6.js:632, against ch3.js:443 (TRUTHS) and ch8.js:175

**Problem.** Wren opens the Second Asking with "In the laundry I asked each of you one question about me. You all got out of it." But the laundry has a true answer for each role (lore.js:44 `whisperTruth`), ch3 counts them into `TRUTHS`, and ch8 prints "Four questions in the laundry. Wren got {n} true answers." (ch8.js:175). A table where the Seer told Wren about the shadow and the Listener said "No" is told, to its face, that all four dodged.

**Fix.** Key the clause on `TRUTHS`: 0 → "You all got out of it."; 1-3 → "Some of you got out of it."; 4 → "You all answered, and I have been carrying it since." One ternary, no new scene.

**Will a player notice?** Medium-low, but the players who told the truth are exactly the ones primed to notice, and ch6_iknow counts the same axis two scenes later.

#### 14. [MINOR] js/content/ch8.js:502, against ch8.js:493 and the card drawn at :499

**Problem.** Directly under a card that shows the COLD glyph captioned "WREN / never written", and one paragraph after "You wrote it twice: once in the dormitory" (i.e. after the game has just identified WREN with COLD), the page says: "KINDLE, in the dormitory, was only a lamp. It is not a glyph, and neither is the last one." The intended reading is "neither KINDLE nor WREN is a glyph *name*", but in position it reads as a denial of the reveal it is standing on.

**Fix.** "KINDLE, in the dormitory, was only a lamp. It is not a glyph. The last one is — it is just the one nobody writes."

**Will a player notice?** Low-medium. It is small print under the biggest image in the Epilogue.

#### 15. [MINOR] js/content/companion/ch3.js:266, against ch3.js:444, :488, ch3.js:645

**Problem.** The Binder's Tower-ward rule ends "Above ground you have only ever seen a sigil run the other way. This is not above ground." The Tower door is above ground: it is the goal of a ground-floor corridor grid (A1 gallery → E5 tower door), the captain's men come *up* the stair to it (ch3.js:542 "fills the stair behind you"), and ch3_flow says "The Tower stair… Above you is the Provost's study" (ch3.js:645). It is a door at the foot of a tower. The sentence is also the only thing carrying the widdershins rule's justification, and companion/ch5.js:329 then reuses "above ground" as the criterion for the scratch rule.

**Fix.** Replace with the class, not the altitude: "Above ground you have only ever seen Founders' work. This is not Founders' work." That also survives the fix proposed for the scratch-rule finding.

**Will a player notice?** Low — the Binder alone, and only if they are picturing the map.

#### 16. [MINOR] js/content/ch7.js:303 vs ch7.js:339

**Problem.** ch7_start tells the whole room the answer before the optional reveal can deliver it: "On the wall, four carved figures walk into a flame. Nobody is looking at them." Then the ch7_wall branch, taken to show Vane what he is denying, narrates "The Seer takes four hundred years of soot off the wall" (ch7.js:339) — a wall the Hearth has already described as legible, to a man who then says he saw it himself twenty-two years ago (ch7.js:341). The beat spends nothing and reveals nothing.

**Fix.** Change ch7.js:303 to describe the wall as sooted and unread — "On the wall, something under four hundred years of soot. Nobody is looking at it." — and let ch7_wall be the first time anyone, including the player, sees the four figures.

**Will a player notice?** Low-medium. It flattens a choice the flow map marks as secret, which is exactly the kind of thing a second playthrough notices.

#### 17. [MINOR] js/content/ch3.js:445, against ch3.js:186-190 (gridConfig's note) and ch3.js:143

**Problem.** Marrow's brief hard-codes "Twelve turns is all I can buy you." The rule card one scene later prints `turnBudget()` live, which drops to eleven after a bell. On a re-entry (Menu → Replay scene, or a resumed save after the third bell) the Provost promises twelve while the card in front of the table says eleven.

**Fix.** `'I ring the bells. ' + cap(num(turnBudget())) + ' turns is all I can buy you.'` — `num`/`cap` already exist in the file (ch3.js:140-142).

**Will a player notice?** Low; only tables that re-enter after a bell.

#### 18. [MINOR] js/content/lore.js:75, against js/content/ch0.js:63

**Problem.** `L.prophecyOrder` holds the Order's translation of the prophecy and is read by nothing (grep: no consumer outside lore.js). ch0.js:63 prints the same sentence as a string literal. Two copies of the game's most-quoted sentence, one of them dead — the same defect the codebase already fixed for `whisperTruth` (lore.js:37-44) and for ch6's deleted third copy of the truth map.

**Fix.** Either have ch0_stone render `L.prophecyOrder`, or delete the constant. A tools/check-content.js assertion that the two agree would be cheaper than either.

**Will a player notice?** None, until someone edits one and not the other.

#### 19. [MINOR] docs/CANON.md §13.21, against js/content/ch6.js:325-333

**Problem.** LIKELY FALSE POSITIVE in the existing canon doc. §13.21 reports `ECHO.binder = 'YES'` as disagreeing with `lore.js:44`'s `whisperTruth.binder = 'DONTKNOW'`. They are different tables doing different jobs, and ch6 says so at :325-326: "One clause of callback on a right answer, and only two ways for it to run: the laundry answer Wren remembers, or the one she does not." ECHO selects which callback clause fires; whisperTruth selects what ch8 scores. For the Binder the memorable laundry answer is YES because ch6.js:332 turns it into the chapter's pun — "You said yes, to the one person with none" — which is precisely the join §13.22 credits with papering over the Binder's mismatched question. Changing ECHO.binder to DONTKNOW would delete that line's only reason to exist.

**Fix.** Downgrade §13.21 from [CONTRADICTION] to a note explaining the two tables, or drop it. If anything is worth changing it is the *Binder's laundry question* (§13.22), not ECHO.

#### 20. [MINOR] docs/CANON.md §13.36 and §13.43, against js/content/ch7.js:566-590 and ch7.js:52, :244

**Problem.** TWO MORE LIKELY FALSE POSITIVES. §13.36 says the ch7_sigil comment "promises that 'under the oath only, a lawful ring left unturned' is free" and that `chargeRing()` is called first. Reading the comment in context (ch7.js:566-581), the "two exceptions" are exceptions to the preceding sentence — "Every cold ring gets the same sentence" — i.e. exceptions to which *line* is keyed, not to the price; the only free-of-charge claim in it ("costs nothing") is scoped inside the parenthesis for the cold word, which does return before `chargeRing()`. §13.43 says ENDING 1 with four walkers prints "Stayed on the stones: nobody" plus "Not every hand went in." That state is unreachable in play: `walkers()` (ch7.js:52) excludes anyone with a kept bargain, so four walkers implies `kept === 0`, and `computeEnding` is only ever called after `BINDING_LANDED` is set in the same `onSolve` (ch7.js:744-747) — the two other routes to ch7_ending both set ENDING = 4 first.

**Fix.** §13.36: rewrite as an observation that the unturned-ring line is charged, and decide whether it should be; do not report it as comment-vs-code. §13.43: keep the entry but mark it reachable only via chapter select / an edited save, so it is not ranked above things a table will actually hit.

---
