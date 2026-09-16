# PLAYER MODEL — **Act III · T8–T10 · Chapter VI to the Epilogue**

> ## ⚠ TOTAL SPOILERS
> Working document for the author. Contains every reveal in the game, including all five endings.
> Companion to `CANON.md` (ground truth), the `epistemics-*` files (who believes what) and
> `player-act2.md` (T4–T7). **This file is the reader's head, not the world's.** Where a row says the
> player believes a thing, the truth is in `CANON.md` and is restated only where the error needs it.

---

## 0. SCOPE, METHOD, AND THE STATE AT ENTRY

### 0.1 What this span is

T8–T10 is **the turn and the endings**. Fifty-three beats across three chapters, five puzzles, one
choice that decides the game and twenty-two that decorate it. It is the only span in which the game
*answers* things, and the author is right that it is the most important part besides the puzzles:
everything here is only as good as what Act I and Act II planted. My job is to say, for each beat,
whether the aha was bought or borrowed.

The shape of the span, because every finding below is a consequence of it:

| | ch6 · The Bells of Thornhallow | ch7 · One Born of Four | ch8 · What the Fire Left Behind |
|---|---|---|---|
| **what the chapter is about** | the stone is re-read and the woman confesses | the table decides who pays | what it cost, and who was right |
| **what the player gains** | where the Cold is; the Founders' pattern; the four anomalies said aloud; the true reading; **why the fire is dying** | Vane's twenty-two years; the Great Sigil; **Wren is the eighth socket**; the price | the ending; the route is KNOT; the goodbye letters |
| **flame** | 0.22 → 0.12 | 0.06 → 0 → 1.0 | 1.0 / 0.65 / 1.0 / 0.3 / 0.15 |
| **register** | dread → sorrow → wonder | dread → tense → wonder or dread | whichever of five |
| **the question the chapter changes** | "what is Wren, and what is the fire?" | "who walks?" | "was it worth it?" |

**The pivot of the span is `ch6_held`** — "It is held. Not closed — held. **The last of it is not mine
to do.**" Before it the player is a spectator at an adult's working. After it the player is the only
instrument left. Everything in T9 and T10 is that sentence being cashed.

**The spine of the span is one word, said four times and never joined up:**

| where | the word | who holds it |
|---|---|---|
| `glyphs.js:18` | COLD glosses "the cold; the wound; the space left when warmth goes; **a hollow**" | the Reader's Book, since the Prologue |
| `companion/ch4.js:202-204` | WRENN is "**the hollow** of a bell — the space inside it that makes the sound" | the Reader's phone, since ch4 |
| `ch6.js:828` | "The fire is **the hollow** they left." | the shared screen, T8 |
| `ch7.js:423` | "Four idiots and **a hollow**." | Wren, out loud, T9 |

Four uses of one word, three of them on the same player's phone, and **no line in the game puts two
of them side by side.** The Reader can do it in one sentence at the table. Nothing asks them to. This
is the span's cheapest, largest available improvement and it recurs in §5, §6 and §8.

### 0.2 The state the player is in at the start of T8

Cumulative from T0–T7, stated as the player holds it, not as it is true.

**Certain, on the shared screen:**
- Four hundred years ago four people closed a wound in the world and left a fire on it. The fire is
  the Hearth. It went out once, fourteen years ago, and left a baby. That is Wren. (`ch0.js:49-54`)
- The Cold is a **place** and nobody will tell you where. (`ch0.js:64`)
- The vault was rebuilt in **212** and the rebuilding was not honest: statues turned off their own
  holes, the road bricked, names effaced. (`ch2.js:189`, `:209`, `:346`)
- Under the paint in the study: **four** figures walking into a fire, no child, four shadows; the
  fourth carries a cold flame. Vane was right. (`ch4.js:533-557`)
- Marrow's motive, from her own mouth: "Under this school there is a wound… **Tonight I take the
  child down and shut it again.**" (`ch5.js:249-250`)
- The Under-Marches; four empty thrones; the Founders' Count; Mere's gates and "her gates do not lie,
  they do not play fair." (`ch5.js:265-266`, `:345-349`)
- A Sighting can be **spent**, temporarily, and comes back. (`ch5.js:551-552`)

**Probable, and branch-carried:** the prophecy has a second reading, *four, as one* (`ch2.js:319` on
`CH2_STRIP='right'`; every Reader's `companion/ch2.js:116`; Wren's question at the tapestry,
`ch4.js:558`). Mere's sheet: "**We were four… we wrote the cold glyph with four hands, and came up
grey. — Mere, who kept the fire, after.**" (`companion/ch4.js:62`, on `LETTER_READ`). Law 0 back in
the Binder's Book (`LAW0`, by three routes).

**Private, one per phone, now hardened almost past denial:** no heartbeat; no thread; the shadow
toward every fire; a name in an alphabet nobody teaches that means *hollow*.

**What the player does NOT have, and must be given in this span:**

| gap | where it is filled |
|---|---|
| **Why the fire is dying** | `ch6.js:850` — one Marrow speech, and nowhere else in the game |
| **That the fire IS the Founders** | `ch6.js:839` — narration, once |
| **What 212 refused to pay** | `companion/ch6.js:286-287` — the Binder's Book, one phone |
| **The stone's true reading, entire** | `ch6.js:827-828` |
| **That Wren is the eighth glyph / the empty socket** | `ch7.js:695-699` |
| **What walking costs** | four private phone lines (`companion/ch7.js:185-188`) and then `ch8.js:287`, after it is paid |

**Branch flags live at entry:** `VOTE_LOST` · `SORREL`/`ORIEL`/`NEITHER` · `VANE_ACCEPT`/`VANE_PRETEND`
· `WREN_HURT` · `WREN_SCARED` · `SURRENDERED` · `DOOR` · `LETTER` · `TAPESTRY` · `OATH` 0/1/2 ·
`LAW0` · `EMBER_LOST` · `STAIR`/`VOLUNTEER` · `PRECRACKED` · `WREN_TRUST` · `GROUP_NAME`.

### 0.3 The hypotheses that run this span

Act II's seven, carried forward, plus six that only become live here. Every beat table refers to
these by tag.

| tag | the theory | status in reality |
|---|---|---|
| **H-WALKER** | somebody walks into the Cold and it closes behind them | half true — a walk closes it; the stone says *four* (`ch6.js:827`) |
| **H-HOLLOW** | Wren is not a person in the ordinary way — Wren is of the Cold | **true** (`ch7.js:697`) |
| **H-BLAME** | the fire is dying *because of* something — Wren, neglect, the Order, the Crown | **false**, and killed by name at `ch6.js:850` |
| **H-COVERUP** | somebody rewrote the record; the school's reading is a lie | **true**, and dated (`companion/ch6.js:286-287`) |
| **H-MARROW** | she is protecting Wren / preparing Wren to be spent / both at once | **both at once**, confessed kneeling at `ch6.js:690-692` |
| **H-VANE** | villain / right about one thing / right and still dangerous | the third, and then he withdraws (`ch7.js:342`) |
| **H-FOUR** | "one born of four" is about the four players | false of the stone, made true by E0 (`ch7.js:740`) |
| **H-FOUNDERS** | *the fire is the four Founders themselves* | **true** (`ch6.js:839`) — and **[UNEARNED]** at entry; see §6 aha **P** |
| **H-SOCKET** | Wren is the eighth glyph — the word that is never written | **true** (`ch7.js:695-699`; `ch8.js:499`) |
| **H-PRICE** | walking in kills you / costs your Sight / costs nothing | costs the Sight, permanently, and you come back (`ch8.js:287`) |
| **H-EMBER** | the Cold Ember is the way out — relight the fire and nobody has to walk | **never answered anywhere in this span.** The game's largest withholding (§5 W-1) |
| **H-SENTIENT** | the Cold knows, wants, waits | unsettled (`ch6.js:486`; `CANON.md` §12.2) |
| **H-MADE** | somebody *made* Wren, or put Wren there on purpose | never raised and never ruled out (`CANON.md` §12.5c) |
| **H-AFTER** | the Founders came back out — Mere signed "after" | unsettled (`companion/ch4.js:62`; `CANON.md` §12.15) |

---

# 1 · T8 — CHAPTER VI — THE BELLS OF THORNHALLOW

Eighteen beats. Attunement word **WELL** (*down; a going-down; from*). Flame 0.22 → 0.12. Warden: the
Binder. Voice: the Listener. The chapter that answers the game.

---

### B8.1 · `ch6_start` — the bell-chamber

**Knows (new in bold).** The Long Stair ends in a room that is mostly floor. **Four bells on one beam
of black iron, each the height of a person.** **The floor is one round riveted plate, faintly warm.**
**"You are standing on a lid. Under it, the Cold."** (`ch6.js:469-471`) **A shaft goes straight up
and at the top of it is a coin of orange light — the Hearth seen from underneath.** (`ch6.js:472`)
Wren: "Huh. It is smaller from down here. **Do not tell it I said that.**" (`ch6.js:473`)
Branch: on `STAIR='COLLAPSE'`, one bell went *tang* instead of *tong*. On `VOLUNTEER`, that seat's
thread still runs up the stair, taut as wire.

| # | hypothesis a table could hold | licensed by | want live? | note / kill |
|---|---|---|---|---|
| 1 | The Hearth sits directly over the Cold because the fire *is* the lid on the lid | the shaft, the riveted plate, ch0's "left a fire on top to hold it shut" | **YES — true, and this is the beat where the game's premise stops being a phrase and becomes architecture** | — |
| 2 | The blue in the coin of light means the Cold is already coming up the shaft | art: the shaft mouth draws an orange core **with a pale-blue heart inside it** (`scenes-ch6.js:53-54`); ch5's Hearth was "a blue tongue the height of a hand" | **YES, strongly.** It is true, it is dread, and it is the only publicly visible evidence in the game for H-FOUNDERS' near neighbour: there is cold *inside* the fire | Never stated in prose anywhere. See breadcrumbs |
| 3 | The bells are an alarm or a weapon against the Cold | four bells directly over a lid | **YES briefly** — resolved two beats later as a *holding pattern*, which is better and stranger |
| 4 | Somebody manufactured this lid — twenty-eight rivets, a cross-brace, a hub. Who? | the word "riveted"; the art (`scenes-ch6.js:31-38`) | **NO — and nothing kills it, because nothing feeds it.** `CANON.md` §12.19. A table *will* ask "who built a lid for a hole in the world" and the game has no answer, not even a shrug | **[WITHHOLDING]**. Cheapest repair: Marrow, one clause — *"The Founders made the lid. The bells came after."* |
| 5 | Wren talking to the fire as a person who can take offence is a joke | it is played as a joke | **YES — and it is the best plant in the chapter.** In forty minutes the fire will be four people, and the player will remember this line | — |
| 6 | The warmth in the plate is the Hearth's, coming down | "faintly warm" | **YES** — productively wrong; the warmth is the Cold's side of the seal |

**Reality vs belief.** Correct on 1, 2, 3, 5. On 6 the game never adjudicates. On 4 there is nothing
to be correct about. Wren is making a joke about the feelings of four dead people and does not know
it either.

**Breadcrumbs planted.** The shaft as an engineered sightline from fire to seal (art only, never
remarked — `CANON.md` §12.20). The blue core. Wren's personification of the Hearth.

**Cheap breadcrumbs available here. [PROPOSED]**
- **The Seer, on their page or aloud:** *"There is cold inside that fire. There has been all night."*
  Already true of every fire the art has drawn since ch5. One clause; it is the only shared-screen
  route to H-FOUNDERS before ch6_open.
- **Name the bells' maker.** Marrow, one clause: *"The Founders hung them before they went down."*
  Answers §12.20, half of §12.38, and plants that the Founders were four people who made things and
  then stopped existing.
- **The Listener:** *"The bells hum, and it is not a note on the Ladder."* Free cosmology — the Cold
  has no step (`glyphs.js:18`) and the room is humming with it.
- **Wren's joke, one beat longer:** *"Do not tell it I said that. It is sensitive."* The table will
  laugh; forty minutes later somebody at that table will say "oh."

**The feeling.** Awe and floor-dread. Somebody says *"we are standing on it"* out loud. Phones go
face-down for a moment, which is the only time all night that happens. This is the best arrival beat
in the game.

**Risk.** Three arrival beats in a row (`ch6_start`, `ch6_marrow`, `ch6_attune`) with no agency,
immediately after ch5's long descent, which was also arrivals. And the room is a lot of nouns at
once: beam, bells, plate, rivets, shaft, coin, lid. A table that half-listens does not know where
anything is when the reflex round starts.

---

### B8.2 · `ch6_marrow` — the Provost kneels in chalk

**Knows.** Marrow kneels at the middle of the lid where the bell-ropes meet an iron ring. **Chalk.
Salt. Her seal pressed into the iron.** **The lid shivers; frost blooms out of the rivets and is
gone; all four bells hum with it.** (`ch6.js:484-485`) **"It knows. It always knows when somebody
kneels here."** (`:486`) **"I can close this wound. While I work the Cold pushes, and nothing holds it
but the old pattern, rung on these bells by four hands."** (`:487`) **"Miss it and the Cold pushes
further. That is all that happens. Hands on your keys."** (`:488`)

| # | hypothesis | licensed by | want live? | note / kill |
|---|---|---|---|---|
| 1 | **She can do this herself, and nobody has to walk.** (H-PRICE, hopeful form) | her own flat claim, "I can close this wound" | **YES — this is the chapter's entire suspense engine.** Forty minutes of hope, deliberately built | **KILLED at B8.9**, by her: "It is held. Not closed — **held**." The gap between the two lines is the best-shaped piece of suspense in the game |
| 2 | **The Cold is aware.** (H-SENTIENT) | "It knows. It always knows when somebody kneels here"; the Ember leaned toward whoever held it (`ch2.js:338`); it *pushes* | **YES.** There is a real evidential basis — this is not withholding — and the best available answer is free: it knows because Wren is standing on the lid. §12.2(c) | Deliberately unresolved. Correct. One free sharpener below |
| 3 | She is understating the cost of a miss to keep four children calm | every adult in the game so far has rationed the truth | **KILL — and the game kills it by being honest.** A miss cracks a bell, which is exactly what she said. This is her one wholly candid framing all night, and the table feels the difference | — |
| 4 | The bells are why four fourteen-year-olds were sent under a school | "rung on these bells by **four hands**" | **YES** — true, and it retroactively answers §12.43 better than ch1 ever did |
| 5 | The chalk, salt and seal are a real system with rules | she is visibly *working* | **YES, and nothing ever explains it.** §12.65: the game never says what a Sealing is. Here that is fine — a professional at work, seen by children — but it becomes a problem at B8.9 |

**Reality vs belief.** She can hold it and not close it, and she has known that for fourteen years.
She is terrified — her heartbeat is drawn **fast**, and only the Listener's page says so
(`companion/ch6.js:251`). Everything else the player believes here is right.

**Breadcrumbs planted.** "Four hands" as a *physical* requirement, forty minutes before Law 0 makes
it a legal one. The Cold as an agent. Her seal — CROWN — chalked on the lid, the only glyph the
Hearth is allowed to draw in the upper world (`scenes-ch6.js:123`; `CANON.md` §7.6).

**Cheap breadcrumbs available here. [PROPOSED]**
- **The Listener, aloud, on "It knows":** *"Wren went still."* One word of stage direction and
  §12.2(c) becomes a table theory instead of an authorial note.
- **Kill H-EMBER here, or feed it.** Marrow, one clause: *"The Ember lights a fire. It does not close
  a wound."* This is the single highest-value line proposed in this document; see §5 W-1.
- **Make her hands visible:** *"Four hands, and I have one pair."* Said here, it converts B8.9's
  reveal from a surprise into a confirmation a sharp table reached forty minutes early — which is the
  author's stated ideal.

**The feeling.** Relief at having a job. The table sits up. Somebody reads Marrow's lines well
because they are short and good. Somebody else says "*that is all that happens* — sure it is."

**Risk.** "I can close this wound" is a promise the table takes at face value, and the chapter
withholds its falsification across two reflex rounds — so the emotional turn lands on players whose
adrenaline has already been spent on a rhythm game. If both rounds go badly, B8.9 lands on a
demoralised table. This is the chapter's structural risk and it has no cheap fix.

---

### B8.3 · `ch6_attune` — WELL, and four phones

**Knows.** A word and a mark cut into the rim of the lid, worn nearly smooth. The word is **WELL** —
*down; a going-down; from* (`glyphs.js:24`). **The Founders labelled the hatch "DOWN."** No line of
prose says so.

**What each phone now carries** (`companion/ch6.js`):

| seat | SPEAK (the bells) | SIGHT (the stone) | WREN |
|---|---|---|---|
| Reader | six numbers that are bells of theirs alone | what the four burnt cuts *were* — flame, crown, spike, crown — drawn on their side so the page cannot say which way up | **"Four bells hang over the lid tonight, and you keep looking at the dark inside them."** (`:247`) |
| Listener | the whole comb: thirty-two beats and the number to call on each | the lap ends on a **silence** — and the Book says which word has no note | every heart in the chamber, Marrow's **fast**, Wren's **flat** (`:251`) |
| Seer | six numbers | which way each burnt chisel went in (1, 3, 5 up; 7 down) | five shadows away from the shaft, one toward it (`:259`) |
| Binder | six numbers | the older Law in three clauses, against the Convocation's; **"same ink, same hand, two hundred and twelve years apart"** (`:120`) | the three threads: grey to Wren, red among the four, **nothing at all from Wren** |

| # | hypothesis | licensed by | want live? | note / kill |
|---|---|---|---|---|
| 1 | The Founders wrote *down* on the lid because there was nothing else to say about it | the word itself, if the Reader reads it aloud | **YES** — a dry, excellent joke that nobody in the game makes | Cheap: the Reader, one line — *"The word on the rim is WELL. Down. Somebody labelled the hatch."* |
| 2 | **Wren is the hollow of a bell, and there are four bells hanging over the lid** (H-SOCKET, embryonic) | the Reader's own page says it in one sentence | **YES — and this is the single best private breadcrumb in the game.** It is the Reader's job to say it out loud. The house rule says they should | Nothing prompts it; the SIGHT tab's puzzle facts outrank it for attention. See risk |
| 3 | Law 6 was forged in the Founders' own hand | the Binder's figure: same ink, same hand, 212 years apart | **YES — and it goes nowhere.** §12.17. It is a beautiful accusation with no second half | **[WITHHOLDING]**, mild. Free fix: the Binder's caption — *"Whoever wrote the second one had the first one open in front of them."* |
| 4 | Marrow is more frightened than anyone else in the room | her trace runs fast, on one phone | **YES** — true, private, and the Listener choosing to say it or not is a real table moment |

**Reality vs belief.** On track. The Reader is holding the answer to the game's last reveal and does
not know it counts.

**Cheap breadcrumbs available here. [PROPOSED]**
- **Promote the Reader's Wren line to the top of their SIGHT tab**, or give Wren a prod at B8.9:
  *"Reader. You have gone quiet."* Currently the strongest clue in the chapter is the last paragraph
  of the least-read tab.
- **The Binder's Law card already prints COLD's gloss nowhere.** Add *a hollow* to the Founders' Law
  0 card and the Binder can join the word to the name unaided.

**The feeling.** Ninety seconds of four people reading. Then the loudest information exchange of the
night, because the bells round needs everybody's numbers before it starts.

**Risk.** This attunement carries **more private content than any other in the game**: a puzzle fact,
a six-number reflex list, and an emotional page, three tabs, ninety seconds. The Wren tab loses.
That is exactly the tab the chapter's reveal depends on.

---

### B8.4 · `ch6_ready` — before anything counts

**Knows.** Four lanes, one each, left to right. Blue lights are the Cold; hands off. Two patterns;
each says how many lights it needs. Fall short and a bell cracks and **the night goes on either
way.** A slow-bells opt-in, scored nothing. On `VOLUNTEER`, that seat's bell is silent for pattern
one and a named neighbour covers it.

| # | hypothesis | licensed by | want live? | note / kill |
|---|---|---|---|---|
| 1 | Cracked bells will cost us later | "a bell you need later" is not said yet, but "a bell cracks" is | **YES** — true; they mute Binding lanes in ch7 (`ch7.js:641`) and are counted in the Epilogue |
| 2 | This is a skill test and the story is on hold | it is a rule card and a keyboard diagram | **NO, and it is the beat's whole risk** | See below |

**Reality.** The round is scored, never lost. The forgiveness is real and measured — one lane mashing
and three careful still passes round one (`ch6.js:60-70`) — and **the player is never told that**,
which is correct.

**What this beat teaches about the world: nothing.** It is pure UI.

**Cheap breadcrumbs available here. [PROPOSED]**
- **Name the bells.** The lane labels are the four nicknames. Make the Hearth say once: *"Four bells,
  and the names worn off the rims. Only the numbers are left."* It costs one line, it rhymes exactly
  with the four numbered plinths in ch2, and it converts a UI screen into evidence for §12.7(a) and
  §12.38 — four Founders, four gifts, four bells, four of everything, and the Order took the names
  off all of it.
- **One Marrow line on the Cold's mimicry** (see B8.5) belongs on the rule card, where the room reads
  it for the whole round.

**The feeling.** Logistics. Chairs move. Somebody finds their key. **This is the first attention sag
of the span.**

**Risk.** Sag. It is unavoidable — the round genuinely needs a ready screen — but it is two screens
of instructions (`ch6_ready` then `ch6_practice`) in a chapter that has just gone very quiet and very
large. One line of world on this screen would cost nothing and buy the whole beat.

---

### B8.5 · `ch6_practice` — the practice peal

**Knows.** Eight lights, nothing counted. **Two of them are the pale blue of the Cold.** Hands off for
those.

**What it teaches about the world — and this is the chapter's quiet triumph.** The Cold shows up
*as a light that looks exactly like a bell and must not be answered*. The phones say it outright —
"a number that is not on your list is somebody else's bell, **or the Cold wearing a bell's face**"
(`companion/ch6.js:189`) — and the mechanic makes the player feel it: the Cold imitates. That is a
genuine cosmological fact delivered as a reflex rule, and it is one of the two or three best
"puzzle teaches world" instances in the whole game.

**It is also never said on the shared screen.** Only three of the four phones carry the sentence, and
the Hearth's rule card says only "blue is the Cold — hands off".

| # | hypothesis | licensed by | want live? | note / kill |
|---|---|---|---|---|
| 1 | The Cold imitates, deliberately, to make you open the lid for it | the mimic mechanic; "it knows when somebody kneels here" | **YES — strongly.** This is H-SENTIENT's best evidence and it arrives as gameplay, which is the ideal form | — |
| 2 | The Cold is weather and blue is just a colour | Marrow's earlier flatness | **KILL, and the mechanic kills it**: weather does not pretend to be a bell |

**Cheap breadcrumb. [PROPOSED]** Marrow, on the rule card or once aloud: *"It will ring for you. It
is very good at sounding like a bell."* Eleven words; puts the game's most interesting unsettled
question (§12.2) into the room in the voice of the person who works down here.

**The feeling.** Relief — it's a game again. Laughing at whoever mashes the blue one.

**Risk.** Low. This is well placed and correctly costed.

---

### B8.6 · `ch6_round1` — THE PATTERN (puzzle · 24 lights, 8 Cold, pass at 17)

**Knows.** Marrow presses her seal into the iron; the lid answers with a low note that is none of the
bells. **"Chords now. Together means *together* — every hand inside a breath, or the bell does not
sound."** (`ch6.js:503`) On a pass: **"The pattern holds. The frost at the rivets stops a hand's
breadth from her knees and goes no further."** Then: **"Good. Do not get proud. The last one is the
Founders' own, and they did not ring it by sight."** (`:579`) On a fail: "The Cold comes up through
the gaps, and a bell answers it with a flat note that goes on too long." + a cracked bell.

| # | hypothesis | licensed by | want live? | note / kill |
|---|---|---|---|---|
| 1 | The Founders did exactly this, four hundred years ago, in this room | "the last one is the **Founders' own**" | **YES — and it is the road to H-FOUNDERS.** The table is currently *impersonating* four dead people and half of them will notice | — |
| 2 | "Together means together" is the game's thesis rendered as a keypress | it is | **YES.** The mechanic is the theme; say nothing and let them find it |
| 3 | The frost is the Cold's hand at the edge of the chalk | "stops a hand's breadth from her knees" | **YES** — excellent, and it is the only physical picture the game gives of the Cold *reaching* |
| 4 | A cracked bell is a permanent wound to the school's ability to hold the seal | "a bell you need later"; the flat note that goes on too long | **YES** — true, and it makes the reflex round carry real weight |

**Reality.** Nothing here is untrue. The chapter is at its most honest.

**What it teaches about the world.** That the seal is not a state but a *performance* that has to be
kept up while anyone works on it; that the performance is four-handed and four hundred years old;
that failing it is survivable and expensive. Grade **A**.

**Cheap breadcrumb. [PROPOSED]** Marrow's praise line is one clause from being the span's best plant:
*"The last one is the Founders' own. Four of them, and they did not ring it by sight."* The word
**four** in that sentence puts four named people in the room.

**The feeling.** The loudest fun of the chapter. Counting in for chords. Somebody shouting "TOGETHER."

**Risk.** A table with one player who cannot do rhythm games has a bad three minutes and a cracked
bell, and carries both into the emotional centre. The forgiveness math protects the *outcome*, not
the *feeling*.

---

### B8.7 · `ch6_tieoff` — the light simply stops

**Knows.** On `VOLUNTEER`: **Marrow reaches up, takes hold of something none of you can see, and ties
it off to the iron ring** — and that seat's Sight comes back "like blood into a numb hand."
(`ch6.js:590-591`) Then, on every branch: **"Then the chamber goes dark. Not the lamps. There are no
lamps. The light simply stops."** (`:593`) **"The Founders rang the last pattern blind. One of them
called it. Three of them rang."** (`:594`) "Listener — your bell goes quiet. **You are the voice.**"

| # | hypothesis | licensed by | want live? | note / kill |
|---|---|---|---|---|
| 1 | **The four Founders had four Sights, one each, exactly like us — and one of them was a Listener** | "one of them **called** it; three of them rang"; four bells, four thrones, four plinths, four dials, four gifts | **YES — this is the single most valuable live hypothesis in the span, and it is one clause from being certain.** It answers §12.7, half of §12.38, and it is the only honest road to H-FOUNDERS | Nothing confirms or denies it. **[PROPOSED]** Marrow, five words: *"One of them heard, the way you do."* |
| 2 | Tonight is a re-enactment; we are standing in for them | everything | **YES.** The Map at `ch8_map` proves it (the route is KNOT) and the game should not tip it earlier |
| 3 | Marrow knows the Founders' operational practice in detail — who taught her? | she has now named their blind pattern, their caller-and-ringers split, and (at B8.16) how they cut the stone | **YES, and it is a genuinely interesting unanswered question about her** | Never addressed. Correctly unresolved — she is the Chair and the Chair keeps things — but one deflection would be better than silence |
| 4 | The light stopping is the Cold putting it out | it stops without a source being named | **NO — there is no basis whatever.** §12.68: the chamber's light source is never identified before or after | **[WITHHOLDING]**. One clause anywhere — *"the bells have been giving off a light of their own since she knelt"* — makes the dark a consequence instead of a stage direction |

**Reality.** A tied-off thread has a living anchor again, which is why the Sight comes back — the
mechanism is stated once, at `ch5.js:551-552`, and never joined to the word *grey*. See §5 W-2.

**Breadcrumbs planted.** "One called, three rang" — the shape of the table, in the Founders' mouths.
The temporary spend of a Sighting, returned, four scenes before the permanent one is offered.

**Cheap breadcrumbs available here. [PROPOSED]**
- **Name grey.** On the `VOLUNTEER` branch, Marrow: *"Grey, and then not grey. That is what a spent
  Sight looks like coming back."* This is Act II's W-7 arriving one chapter late and it is still the
  cheapest fix in the document: it joins *grey grief* to *grey spent*, makes Mere's "came up grey"
  mean something, and makes `ch8.js:287` ("grey-eyed and ordinary") land as a payoff instead of a
  colour.
- **Say who a Founder was.** Five words, as above.

**The feeling.** The best transition in the game. The lights go out, a woman says the Founders did
this blind, and the Listener's whole night changes: the seat that has been carrying a private fault
about not hearing one heartbeat is told it is the voice.

**Risk.** The chapter's largest unexplained stage direction (the light) sits in its most atmospheric
beat, where nobody will interrogate it — which is exactly why it should be fixed: it costs nothing
now and it is free dread.

---

### B8.8 · `ch6_round3` — THE DARK PATTERN (puzzle · 32 beats, 24 sounding, pass at 20)

**Knows.** Thirty-two beats at sixty to the minute. Nothing falls that you can see. The Hearth counts;
the Listener calls every number one beat early; the other three ring only their own six. On a pass:
**"The last bell goes on ringing after your hands have left the keys, and the lid under your feet
stops beating."** (`ch6.js:598`) "Marrow kneeling in chalk gone from white to gold."

**What it teaches about the world — the best instance in the game.** It does not describe the
Founders' practice, it *makes the table perform it*: one voice, three hands, no light, a pattern
older than the school. Four people in a room discover by doing that "four hands" is not a figure of
speech. Grade **A+**, and it is the strongest argument in the game for H-FOUNDERS — a table that
has just been the Founders for three minutes is ready to be told what the Founders became.

| # | hypothesis | licensed by | want live? | note / kill |
|---|---|---|---|---|
| 1 | The Cold can be held off by four people who trust each other, and by nothing else | the round | **YES** |
| 2 | We are doing the exact thing the four did, in the exact room | Marrow said so one beat ago | **YES — peak** |
| 3 | The lid "beating" means the Cold has a pulse | "the lid under your feet stops beating" — in a game whose central tell is a missing heartbeat | **YES, and nobody has ever noticed this line.** It is a free, perfect plant: the thing under the floor has a heartbeat and the child on the floor does not | Never followed up. See breadcrumbs |

**Cheap breadcrumb. [PROPOSED]** The Listener, one line, after the round: *"It has a heartbeat. The
floor does. Wren does not."* Free, devastating, uses only what the shipped prose already says
(`ch6.js:598`), and it makes §12.49's unexplained 1.1 s pulse under Mere's gates (`scenes-ch5.js:98`)
retroactively mean something.

**The feeling.** The loudest three minutes of the night: four people shouting numbers in the dark.
Either the table's best memory or its worst.

**Risk. Overload point #1 of three.** This is the hardest information-partitioned reflex round in the
game and it sits **immediately before the emotional centre**. A table that fails it arrives at
`ch6_held` with cracked bells, adrenaline, and no patience for a quiet scene. There is no cheap fix;
the only lever is that the game should not put another instruction screen between the round and the
turn, and it does not. Good.

---

### B8.9 · `ch6_held` — "It is held. Not closed — held." · **THE PIVOT**

**Knows.** The bells' state is described honestly ("three bells humming, and one hanging silent with
its wound"). **Marrow lays both hands flat on the iron and, for the first time tonight, lets her
shoulders down.** **"It is held. Not closed — held. The last of it is not mine to do."**
(`ch6.js:629`) **"Now, love. Walk."** (`:630`) **Wren does not walk.** "In the laundry I asked each of
you one question about me. **You all got out of it.** I am asking again, out loud. **Look at me when
you answer.**" (`:632-633`)

Two things land in ten seconds: she cannot finish it, and she has just told a child to die using the
only endearment she uses in the entire game.

| # | hypothesis | licensed by | want live? | note / kill |
|---|---|---|---|---|
| 1 | **She has always intended Wren to walk, and "love" is fourteen years of grief in one word** (H-MARROW) | the grey thread since ch4; the journal's "IT SLEEPS WITH THE WINDOW OPEN"; "raised it to be—"; the one endearment attached to an order to die | **YES — and by now it is not a hypothesis, it is a conclusion the table reached two chapters ago.** The pleasure here is confirmation, which is the right pleasure for a pivot | — |
| 2 | She cannot finish it because **only Wren fits** — Wren is the key, the piece that goes in the hole | the school's whole reading; "the last of it is not mine to do" | **YES — and it is the productive error.** It is half right: something does go in a hole. It is not a key, it is a word, and the hole is a socket | **KILLED at B8.16-17** by the stone, which says *four* |
| 3 | She cannot finish it because **she is one person and it takes four** | she said "four hands" at B8.2; she has one pair; the pattern she just ran needed four | **YES — this is the correct inference and it is available RIGHT HERE.** Almost no table will make it, because "four hands" was framed as a bell-ringing fact, not a writing fact | **The ideal one-beat-early aha of the chapter.** One clause at B8.2 — *"and I have one pair of hands"* — makes a sharp table arrive at `ch6_open`'s answer before `ch6_open` |
| 4 | "The last of it" is an act, an object, or a person — deliberately unspecified | the phrasing | **YES.** Productive ambiguity; do not resolve it early |
| 5 | Wren is refusing out of fear | a fourteen-year-old has just been told to walk into a hole | **KILLED instantly and beautifully**: Wren is refusing in order to ask four friends a question. Wren is never once shown afraid, on any branch |
| 6 | The Sealing she just performed did something the game will explain | she worked visibly for twenty minutes | **NO.** §12.65: the game never says what a Sealing is, what she did, what remains, or why only the last step is not hers | **[WITHHOLDING]** — but a mild and forgivable one, because the *answer* ("it takes four and I am one") arrives two beats later and retro-fits it |

**Reality vs belief.** The player has Marrow exactly right and the mechanism exactly wrong. Reality:
the last of it is COLD, written by four hands, and she is one pair.

**Breadcrumbs planted.** "The last of it is not mine to do" is the hinge the Finale hangs on. Wren's
"you all got out of it" retroactively re-scores the laundry.

**Cheap breadcrumbs available here. [PROPOSED]**
- **"I have one pair of hands."** (see #3.) Five words, converts a reveal into a confirmation.
- **Let the bells matter to the beat.** The number of cracked bells is printed as scenery
  ("three bells humming, and one hanging silent") and then never connects to what she just said.
  One clause — *"and one bell short, which is one more thing I cannot do alone"* — spends the reflex
  rounds' outcome on the pivot instead of on the Finale only.

**The feeling.** The room goes quiet. **This is the best beat in the game for four people at a
table.** Somebody puts their phone down. The player who is Voice reads "Now, love. Walk." and then
stops, because of what it is.

**Risk.** It arrives twenty-five minutes into a chapter that has been two rhythm games. If the rounds
went badly the voltage is spent. Also: the two lines are adjacent and both are enormous — a fast
reader can burn through "the last of it is not mine to do" on the way to "Now, love. Walk." and only
one of them lands. A `cls:'whisper'` beat between them would cost nothing.

---

### B8.10–B8.13 · `ch6_ask_owl` / `ch6_ask_hush` / `ch6_ask_bookmoth` / `ch6_ask_knot` — **THE SECOND ASKING**

Four choice screens, one per seat, in public, art `ch6_shaft` (which draws the underside of the
prophecy stone with four cuts scorched — the answer is on screen behind the question, and nobody
points at it).

| seat | Wren's question | the true answer | Wren on the truth | Wren on a lie |
|---|---|---|---|---|
| Seer | "Which way does my shadow fall?" | *Toward the fire* | "Toward it." | "**Look down, some time when I am not standing here.**" |
| Listener | "Can you hear mine?" | *No. I have never heard it.* | "Nothing." | "**That was kind. It was not true, and I would rather have had the true one.**" |
| Reader | "What does my name mean?" | *A hollow. The space inside a bell, the part that rings.* | "A hollow. The part of a bell that rings." | "**That is what they call me. It is not what it says.**" |
| Binder | "Do I have one?" | *None. Not unbound. The knot itself.* | "None. Not unbound. The knot itself." | "**You are being kind again. Hold out your arm and look.**" |

Plus one clause of laundry callback per seat, keyed to whether the laundry answer was the one Wren
remembers (`ch6.js:331-336`).

**Knows.** For the first time in the game, **all four anomalies are said aloud, in public, by the
people who carried them privately for years.** The table hears its own year of secrets become one
list, spoken in seat order, to the person they were secrets about.

| # | hypothesis | licensed by | want live? | note / kill |
|---|---|---|---|---|
| 1 | **Wren is of the Cold** (H-HOLLOW) | four absences plus a name meaning *hollow*, now consolidated in one minute | **YES — and THIS is where a table that talks gets there.** It is one beat before the stone half-says it and two chapters before Wren says "It's me." Near-perfect placement | — |
| 2 | **Wren is the eighth glyph** (H-SOCKET) | the Reader's Book glosses COLD as "**a hollow**" (`glyphs.js:18`) and the Reader has just said Wren's name means **a hollow** | **YES — the span's best available one-beat-early aha, and the game does nothing to help or acknowledge it.** A Reader with the Book open can match the two glosses at this exact moment | **Free fix:** Wren, after the Reader's true answer — *"Yes. There is one other thing in this school with that for a meaning. You have it in your Book."* Or, cheaper and better, silence plus one raised eyebrow of narration: *"The Reader has gone very still."* |
| 3 | Wren is a ghost, or dead, or was never alive | no heartbeat, no thread, a shadow that reaches for fire | **YES — productively wrong in the right direction.** It gets the table to "not a person in the ordinary way", which is true |
| 4 | Wren is the "one born of four" and the prophecy is literally about Wren | the school's reading, believed all game | **YES, and it must be live here** — because the stone kills it four beats later and the kill is the chapter's pleasure |
| 5 | **Somebody made Wren, or put Wren there** (H-MADE) | a name cut in a 400-year-old floor is not yet known; but the name chalked on the dorm door in an alphabet nobody teaches, in one hand, *a year ago*, is (`companion/ch0.js:99`) | **Uncertain — and this is the one place I would push back on the shipped design.** It is licensed, it is reasonable, it is the third of the three options in §12.5, and **nothing in the entire game rules it in or out** | Mild **[WITHHOLDING]**. Either let Marrow say she chalked it (nearly free — she wrote WRENN on the roll in the same letters, in her own hand) or let somebody say the question aloud and refuse it |
| 6 | Wren is Marrow's child by blood | fourteen years, "Mum", the grey thread | **KILL — and B8.14 kills it, in her own voice, kneeling** |
| 7 | The four are somehow the cause of Wren's condition | four people who each hid one impossibility | **KILL — and Wren kills it in advance**: "I've known for years" (`ch0.js:226`); "all four were the ones I already knew" |

**Reality vs belief.** The table is now correct about Wren in every particular except the mechanism,
and the mechanism is never given (§12.5). What the four are *supposed to do* with knowing is also
never stated (§12.67) — Wren confirms each fact and the scene moves on. **I believe that is right**,
and the document should record it as deliberate: the point of the Asking is not information, it is
that four people looked at someone and said the true thing out loud. But the author should confirm
it, because one line of framing either way changes how the next chapter reads.

**Breadcrumbs planted.** "The knot itself" (the Binder's true answer) is the phrase that returns in
E3's epilogue and in the Book's legend. "The part that rings" is the phrase that returns at
`ch7_cold_slot`.

**Cheap breadcrumbs available here. [PROPOSED]**
- **The glosses, joined.** (see #2.) The best single line available in T8.
- **A Wren reaction to being worked out.** Act II flagged that no beat exists in which Wren notices
  the table has figured it out. This is where it belongs, conditional on `CLUES === 4`: *"You all
  knew. You have all known for a while. Good. That saves a speech."* One line, and it pays every
  table that talked.

**The feeling.** The table's best five minutes. Each player gets a public moment with their own name
on it. Genuine hesitation — the kind ones still want to lie. The player who lied in the laundry and
tells the truth here feels it physically.

**Risk, and there are three.**
1. **It reads as a quiz.** Three of the four questions have a visibly correct option, and the wrong
   options read as unkindness rather than as a choice. A table that plays it as a quiz loses the beat
   entirely. The mitigation is already in the writing — Wren *knows* the answers — but it is not
   stated until B8.14, which is one beat too late. **[PROPOSED]** Move the reassurance up: at
   `ch6_held`, Wren — *"I know all four answers. I want to hear them."*
2. **Four choice screens in a row, same art, same shape.** Structurally identical to a dialogue tree.
   The art does not change across the four; there is no reaction from anyone except Wren.
3. **[CONTRADICTION §13.21] fires here, and it fires on the game's most emotional beat.** `ch6.js:327`
   gives the Binder `ECHO: 'YES'`, while `lore.js:44` makes the Binder's true laundry answer
   `DONTKNOW`. So a Binder who told the truth in the laundry gets the *cold* callback ("You have seen
   unbound people. I am not one.") and a Binder who was kind gets the warm one ("You said yes, to the
   one person with none.") — and ch8 scores them the other way round. **A player is punished, at the
   table, in public, for having told the truth.** This is the highest-priority bug in the span.

---

### B8.14 · `ch6_iknow` — "And — Mum. I know."

**Knows.** Wren counts the answers ("Four answers, and all four were the ones I already knew", or its
partial forms). Then: **"And — Mum. I know. I have known since the laundry. Tell them. You are
allowed."** (`ch6.js:689`) **"Marrow does not stand up. She tells it kneeling, because the child gave
her leave."** (`:690`) **"It came out of the fire the night the Hearth guttered. I picked it up. I
named it. I raised it to be—"** / **"'Loved,' says Wren. 'Loved enough to walk back in,' says Marrow,
and does not look up."** (`:691-692`)

Everything the player inferred about Marrow across two chapters is confirmed in four sentences, by
her, kneeling, with the child's permission, in front of four children.

| # | hypothesis | licensed by | want live? | note / kill |
|---|---|---|---|---|
| 1 | She is a monster who raised a child as a tool | "raised it to be… loved enough to walk back in"; "**it**" in her journal | **KILL — and the scene kills it with staging, not argument**: she tells it kneeling, and the child gives her leave, and the child finishes her sentence for her. This is the best-executed moral complication in the game |
| 2 | She is a victim of the school and of 212 | she inherited a bill she did not run up | **YES** — true, and she also chose. Both stay live and should |
| 3 | She has known what Wren is since the first night | fourteen years of grey thread | **CONFIRMED** |
| 4 | **She knows more about the stone than she has said** | she named the child in the *old letters*, on the roll, in her own hand (`companion/ch4.js:203`) — so she reads the old letters | **YES, and it pays off two beats later** when she kneels and reads the stone from its foot (`ch6.js:824`). A sharp table can predict that here | **Model breadcrumb.** Do not touch |
| 5 | **"Walk *back* in"** — *back* means Wren came out of it, and can be returned | her own word | **YES — and it is the most loaded word in the chapter.** It is the plainest statement anywhere in the game of §12.5(a): the hollow came out of the fire the night the fire failed | Nobody remarks on it. **[PROPOSED]** Wren, three words: *"'Back.' You keep saying back."* One line, and the game's central unstated mechanism is in the room |
| 6 | Wren has known all night and let them work anyway | "I have known since the laundry" | **YES** — and it re-scores ch3, ch4 and ch5 in one clause. Excellent retroactive design |

**Reality vs belief.** The player is now correct about Marrow to within a clause. That is unusual and
it is good — the game spends its remaining mystery on the world, not on her.

**The feeling.** Somebody's voice cracks reading it. The "Loved," / "Loved enough to walk back in"
exchange is the best two lines in the game and everybody at the table knows it immediately.

**Risk.** Low. The only risk is pace: it arrives straight off four choice screens with no breath, and
it is four heavy lines in twenty seconds.

---

### B8.15 · `ch6_stone` — the foot, lit from below

**Knows.** **"Far above, the Hearth gutters. For a moment the light in the shaft comes from below,
and it is blue."** **"The underside of the prophecy stone, lit from beneath for the first time in
four hundred years."** **"Eight cuts run all the way round its foot. Four are clean. Four are burned
to a smear."** **"From above, the school reads it 'one born of four shall walk into the Cold'. Nobody
has read it from under here."** (`ch6.js:702-705`)

This is the physical answer to the game's largest logical hole (`CANON.md` §13.2, "Nobody alive has
read the cuts" vs a Reader who reads any worn carving): **the stone was never unreadable, it was
under a fire.** The answer is excellent and it arrives six chapters late.

| # | hypothesis | licensed by | want live? | note / kill |
|---|---|---|---|---|
| 1 | The school's reading is wrong because the school has only ever seen half the stone | the geometry, stated plainly | **YES — and the pleasure is architectural**: the evidence was under the evidence, held down by the thing it was about | — |
| 2 | **The Order burned the cuts on purpose** | four burnt, four clean, **alternating** — cuts 1, 3, 5, 7. A table will say "that is not an accident" within five seconds | **Interesting but unsupported either way** | **[WITHHOLDING], and cheap to fix.** The Seer already sees under the soot; give them one clause — *"the fire sat in the middle of the ring, so it took every other one"* — and the alternation becomes geometry instead of conspiracy. Or, if the author prefers the conspiracy, make it deliberate and say so |
| 3 | The fire dying is what finally makes the truth readable | "for the first time in four hundred years" | **YES — and it is the chapter's best irony**, entirely earned and never over-stated |
| 4 | The blue light from below is the Cold, and it is getting closer | the light in the shaft reverses direction | **YES** — and it is literally true: C6, every cold gradient in the game is bottom-anchored |

**Breadcrumbs planted.** Everything needed for B8.16 is now on the shared screen and four phones.

**The feeling.** Wonder. The fx changes to `motes`, the mood to `wonder`, and the table notices the
game just changed key.

**Risk.** Low, and this is the correct amount of set-up for the hardest partition puzzle in ch6.

---

### B8.16 · `ch6_strip` — **THE FOOT OF THE STONE** (puzzle · ring, 8 slots, 4 readings)

**The four private facts.** Reader: what the burnt cuts *were*. Seer: which way each burnt chisel went
in. Listener: the lap ends on a **silence**. Binder: the older Law, in three clauses — read **down**
the count, every cut says its **other** word, and the cold word **is** written.

**The answer.** KNOT · CROWN · ASH · WELL · VEIL · EMBER · ASH · COLD —
**"Four, as one, go down with fire. What is kept stays behind. The fire is the hollow they left."**
(`ch6.js:827-828`)

**What it teaches about the world. Grade A+, and it is the best puzzle in the game.**
1. **A ring has no first cut.** The board says so on its face ("the line runs round the foot — cut 8
   touches cut 1"). Where a sentence begins is a *decision*, and the school's mark is one — which is
   the political thesis of the entire game rendered as a geometry problem.
2. **The school's mark is drawn on the board, in violet, labelled "the school's mark"**, and it is
   wrong. The player physically declines to start there.
3. **COLD is written.** The Binder overturns a Law by date, in public, and the board accepts it.
4. **The Listener's fact is the one that fixes the start** — because COLD is the one word with no
   note, so silence *locates* the cold word. The game's most elegant mechanic: the Cold is found by
   listening for where the sound stops. That is Wren's whole condition, expressed as a puzzle rule,
   and nobody says so.

| # | hypothesis while solving | licensed by | want live? | note / kill |
|---|---|---|---|---|
| 1 | Four Founders went down together; the prophecy is not about Wren (H-FOUR / H-WALKER) | the answer itself | **YES — and it is the kill shot for the school's reading** |
| 2 | "**What is kept stays behind**" — what is kept? the Ember? the fire? the child? | the line is deliberately unglossed | **YES.** Productive ambiguity; the answer is *the fire*, and the next clause says so |
| 3 | "**The fire is the hollow they left**" — the fire is an absence shaped like four people (H-FOUNDERS) | one clause of one omen line | **YES, and it is the reveal — but see §6 aha P: the player was given nothing in ch2–ch5 to prepare for it.** It arrives as a sentence, not as a conclusion |
| 4 | *Hollow* is the third use of one word, and the other two are Wren's name and the cold word | the Reader's own two pages | **YES — the span's best available early aha, and it is available RIGHT HERE, at the moment the table reads the sentence aloud** | Nothing prompts it. **[PROPOSED]** one line, below |
| 5 | Marrow could have read this at any time in fourteen years | she reads it herself on the losing branch; she named the child in the old letters | **YES — and it is a real, quiet indictment** that the game lets the player find and never argues |

**Reality vs belief.** After the solve the player's cosmology is essentially correct for the first
time. What remains wrong: the price of walking, and what Wren *is* mechanically.

**Cheap breadcrumbs available here. [PROPOSED]**
- **Join the word.** After the omen line, one whisper: *"The Reader knows that word. It is in two
  other places on the Reader's page."* Or Wren, drier: *"Hollow. Yes. I have heard that one."* This
  is the cheapest high-value line in the document and it converts `ch7_cold_slot` from a reveal into
  a confirmation the table earned forty minutes early.
- **Say what the Listener's fact means.** One clause: *"The word with no note is the word this stone
  ends on, and it is the word the school leaves out."* The elegance is currently invisible.
- **Acknowledge the early arrivers.** Act II's fix for aha **B** applies doubly here: a conditional
  Marrow line for tables that found Mere's strip in ch2 — *"Some of you have known this since the
  vault."* Costs nothing and pays the best-prepared tables, who currently get *less* than tables who
  arrive ignorant.

**The feeling.** The longest silence of the night while four people say four facts and one of them
writes. Then the ring warms, the Hearth flares white for a breath, and the strip reads itself aloud.
If the table got it first time, they cheer. If Marrow reads it for them (four spent readings), the
room deflates in exactly the right way — "I have had four hundred years of this stone and you have
had five minutes" is a kind failure state and it is well judged.

**Risk. Overload point #2 of three.** Four private facts, an eight-slot ring, a hard-capped budget of
four readings and a cost per miss. It is the most demanding partition in the game and it lands after
a rhythm round and the chapter's emotional centre. It is also the one puzzle where a table missing a
page (three players, or one silent one) genuinely cannot brute-force it — 192 boards for a table with
no Reader, against four readings. The design note is explicit that this is intended. It is correct;
it should be flagged for the host guide, not changed.

---

### B8.17 · `ch6_open` — **why the fire is dying**

**Knows.** **"Four went down. Not one born of four — four, as one. The fire is only what they left
behind."** (`ch6.js:839`) Marrow: **"Four people's worth of fire, and four hundred years to spend it
in. That is the whole answer to why it is going out. Nobody did anything wrong. It was only ever four
people."** (`:850`) **"THE FOURFOLD WALK IS OPEN."** / "The road four people walk together, not one."
/ "Binder — the struck Law is back in your Book." / Wren: **"Then ask me a third time. In there."**

| # | what is killed here | the exact evidence that kills it |
|---|---|---|
| **H-BLAME**, every form | "**Nobody did anything wrong. It was only ever four people.**" — the flattest sentence in the game, and it is the game's thesis |
| "The Order's cover-up is why the fire is dying" | the decay is arithmetic; the Order's crime was refusing to pay in 212, which is a separate, worse crime |
| "The fire is fuelled and somebody stopped feeding it" | it is not fuelled; it is *spent* |
| "Wren's arrival damaged it" | the guttering fourteen years ago produced Wren; the decay is four centuries old |
| "The Crown or Vane sabotaged it" | Vane has been wanting it open, not causing it |

| # | what stays live, and why it is a pleasure | licensed by |
|---|---|---|
| 1 | **Are the Founders *in* the fire, or merely spent into it?** (H-AFTER) | "the fire is only what they left behind" vs Mere's "who kept the fire, **after**" (`companion/ch4.js:62`) vs the Listener's portraits, "four going down the stair and **four coming back**" (`companion/ch5.js:310`). **Three sources, two of them private, and they do not agree.** This is genuinely interesting and genuinely unresolved (§12.15) |
| 2 | **What does walking in actually cost?** (H-PRICE) | four private phone lines, not yet opened; Mere's "came up grey"; nothing on the shared screen |
| 3 | **Is the Cold still there afterwards?** | "held, not closed"; the stone's "what is kept stays behind" |
| 4 | **What happens to the school if the fire is not holding anything?** | never raised until E0, where it is not raised either (§12.30) |

**Reality vs belief.** For the first and only time, the player's model of the world matches
`CANON.md` §2 almost exactly. The remaining errors are all about *price*.

**Breadcrumbs planted.** "The road four people walk together" is the Decision, pre-named. "Then ask me
a third time. **In there.**" is Wren telling the table there will be a third Asking, and there never
is one on screen — on E0 it is the four goodbye letters; on E2 it is "I wanted to hear what you would
say." That is a promise the game *almost* keeps and should keep explicitly.

**Cheap breadcrumbs available here. [PROPOSED]**
- **Kill H-EMBER.** If it is not killed at B8.2 it must be killed here, at the latest — the very next
  beat is a Decision the table will try to solve with the Ember. One clause in Marrow's mouth.
- **Price the Walk on the shared screen.** One line: *"It costs what it cost them. You saw what they
  came back as."* Then the four private phone lines become personal detail rather than the only
  statement of the rule. See §5 W-3.
- **Pay off "ask me a third time."** One line at `ch7_cold_slot` or in the letters: *"That was the
  third asking."*

**The feeling.** Catharsis and then cold. Somebody says "so *we're* the four." Somebody else says
"nobody did anything wrong" back to the screen, because it is the line that makes the game not a
whodunnit.

**Risk. Overload point #3 of three, and the most consequential.** Three enormous ideas arrive in
eight lines with no pause: (a) four, not one; (b) the fire IS them; (c) why it is dying. Any one of
them would carry a scene. A table that is tired takes one of the three and misses the other two —
and the one most often missed is (b), which is the game's title. **[PROPOSED]** split the beat: put
"the fire is only what they left behind" on its own screen, with the flame at its lowest, and let the
table click through to Marrow's explanation.

---

### B8.18 · `ch6_flow` — the paths you walked

**Knows.** The flow chart, with each seat's answer quoted back in their own words
("*Seer: "toward the fire"*"). Stats: the bells, the readings, and — **"You gave Wren N of the four
answers Wren already had."** (`ch6.js:878`)

That sentence is the chapter's moral accounting and it is perfect: not *you found four clues*, but
*you gave a person four answers they already had, and the giving was the point*.

**[CONTRADICTION §13.40]** The Epilogue re-frames the same number as **"Four clues in the
bell-chamber. You caught {n}."** (`ch8.js:174`) — which is false on its face (nothing was caught,
nothing was hidden) and contradicts this line two hours later. ch6's framing is correct; ch8's should
be changed to match. Flagged again at B10.8.

**The feeling.** Breath. Somebody reads the quoted answers and the table remembers who lied.

**Risk.** None. This is a good chapter close.

---

# 2 · T9 — THE FINALE — ONE BORN OF FOUR

Twenty-one beats (four of them one-per-seat). Attunement word **CROWN** (*one; the first; the chosen;
the Chair*) — the word for **one**, cut into the rim of the floor in the chapter about four. Nobody
remarks. Warden: the Seer, then the Binder. Voice: the Binder, then the Reader. A 900-second night
(780 if the stone was read for them). Flame 0.06.

---

### B9.1 · `ch7_start` — the chamber's edge

**Knows.** **"Far above, the Hearth is a spark."** **"The floor is a lid, and under it the Cold
glows."** **"On the wall, four carved figures walk into a flame. Nobody is looking at them."**
(`ch7.js:301-303`) Boots on the old road; Vane stops at the edge with the Crown's soldiers.
Branch `arrival()`: Oriel came down behind you and says nothing, loudly / his soldiers hold the stair
/ two Masters whose price you would not pay watch from the edge / the stair is empty.

**The big free gift.** **The tapestry's true image is carved on this room's own wall, four hundred
years old, never painted over** — and the Hearth says so in unconditional narration, to every table,
including one that never scraped the paint in ch4. "Nobody is looking at them" is the game telling
the player to look.

| # | hypothesis | licensed by | want live? | note / kill |
|---|---|---|---|---|
| 1 | The Order never painted over this one because nobody it could send comes down here | the carving is open, uncovered, unrestored, in the room under the school | **YES — and it is answerable in one line and never answered.** §12.50 | **[PROPOSED]** Wren, four words: *"Nobody repaints down here."* |
| 2 | The proof of the cover-up is standing three feet from the Crown's Envoy | the geometry of the scene | **YES — and it is the lever.** The next beat is built on it |
| 3 | The Hearth is nearly out and the clock is real | "a spark"; flame 0.06 | **YES** |
| 4 | Oriel came down to be told everything, as promised in ch1 | `arrival()` on `ORIEL` | **YES — and the game drops it.** §12.58: she says nothing, loudly, and never speaks again on any branch | **[WITHHOLDING]**, inherited from Act II W-6. One line of hers here would close a promise made six chapters earlier |

**The feeling.** The boss walked into the last room. Adrenaline. Also genuine fear about the clock,
because the flame on screen is a spark.

**Risk.** The `arrival()` line does five chapters' worth of branch payoff in one sentence and then
nothing follows it. A table on the `ORIEL` branch will wait for her to do something for twenty
minutes.

---

### B9.2 · `ch7_vane` — the offer, and the one lever

**Knows.** Vane: **"One child, and a fire that will be out within the hour. Bring him up the road."**
— or, on `VANE_ACCEPT`, **"You gave me your word in the Hall. Bring the boy up the road and he
lives."** Wren: **"Don't look at him. Look at me. [GROUP] — this is the *in there* I meant."**
Options: **Show him what is under the paint** / **Say nothing. Read the floor.** No timer.

**This is the highest-leverage two-line menu in the game.** It deletes an ending, a bargain, a private
letter on four phones, and one figure from the art (`ch7.js:332`).

| # | hypothesis | licensed by | want live? | note / kill |
|---|---|---|---|---|
| 1 | Showing him wins him over — he told the Hall the truth once and got punished | **nothing in ch0–ch6 says he was punished.** Only "I have seen what is under the paint" (`ch1.js:138`) and "So he had" (`ch4.js:557`) | **YES, we want it live — but it is currently a hunch, not a deduction** | See breadcrumbs: the plant that would earn it already exists in the art and is never read |
| 2 | Showing him arms him — proof the Cold is real is exactly what the Crown wants | "The Crown will have the Cold open, one way or another" (`companion/ch4.js:213`) | **YES, strongly.** The choice must feel genuinely two-sided, and this is what makes it so | Correctly never killed in advance |
| 3 | He already knows, so showing him costs nothing and gains nothing | he said so in ch1 | **YES — and it is the read a sharp table holds**, which makes "Twenty-two years" land as a *why did you never say* rather than a surprise |
| 4 | Ignoring him and reading the floor is the safe play — do not engage | the clock; Wren's "look at me" | **YES** — and it is the choice that keeps the game's darkest ending reachable |
| 5 | Wren's "this is the *in there* I meant" is a callback to ch6's "ask me a third time. In there." | it is, exactly (`ch6.js:863` → `ch7.js:317`) | **YES** — a very good two-chapter thread that nobody will consciously catch and everybody will feel |

**Reality.** He has known for twenty-two years and has been waiting, professionally, for somebody to
say it in front of him. Showing him is the only thing that reaches him and it is not political.

**Cheap breadcrumbs available here. [PROPOSED] — and this is the Finale's best repair.**
- **The art already draws Vane with two threads on one body**: red `#b23a3a` at .8 on his left,
  facing inward toward Marrow and Wren, and gold `#d4a94e` at .6 on his right, facing his guards
  (`scenes-ch7.js:83`). **The Binder never reads it on any page.** One Binder line — *"He has two.
  The gold runs to his soldiers. The red runs at this school, and it is older than the gold."* —
  makes "Twenty-two years" an earned deduction instead of a reveal, and it costs nothing because the
  picture is already shipped.
- **One line in ch1 or ch4** that Vane was *sent away*: Oriel's note is the natural mouth for it
  ("They painted it back inside the week" is already hers; *"and they sent the boy who scraped it to
  the Crown"* is one clause more).

**The feeling.** The most argued-about choice of the night, and the table has no clock, which is the
right call. Somebody says "he's the villain, why would we help him." Somebody else says "he told us
to ask the Seer in Chapter One."

**Risk.** For some tables "Show him what is under the paint" reads as an obviously virtuous option
and the choice collapses. The counter-evidence exists (his stated aim, recovered by the memory-bell)
but it is on one phone, three chapters back. Worth a one-clause reminder in the option's `sub`.

---

### B9.3 · `ch7_wall` (branch `VANE_ALLY`) — "My offer is withdrawn."

**Knows.** "The Seer takes four hundred years of soot off the wall" (or, on `TAPESTRY`, "says what is
under the paint in the study, and the Hearth turns it round"). **"Four figures walking in. No child.
The fourth writes a fire upside down."** (`ch7.js:340`) Vane: **"Twenty-two years. I stood in your
Hall with that paint under my nails and told them. They sent me away to learn manners."** (`:341`)
**"My offer is withdrawn. I will not be the thing you have to be brave about."** (`:342`)

| # | hypothesis | licensed by | want live? | note / kill |
|---|---|---|---|---|
| 1 | Vane was a Thornhallow man, exiled into the Crown's service for telling the truth | his own account | **YES — and it retro-fits every scene he has been in.** "Your Hall", "Ilsabet", the bow he has done to people he later ruined | **[UNEARNED]** as a deduction; see B9.2. Superb as a scene |
| 2 | He will go back to the Crown and report | the Crown does not release people | **YES — and the game answers nothing.** §12.32: `VANE_ALLY` removes him from the fiction entirely while his soldiers are still standing on the stair | **[WITHHOLDING], and it is the Finale's worst.** One line: *"He says something to his captain. The soldiers sit down on the stair."* Anything |
| 3 | The withdrawal is a tactic; he will be back | "he is very good at waiting" (`ch1.js:276`) | **YES — and it should stay live**, which it does, entirely by accident, because he is never seen again |
| 4 | Marrow and Vane both scraped the same paint and neither will say so | on this path the player can hear *both* lines in one playthrough — `ch7.js:341` and `ch7.js:394` | **YES, and the silence is deafening and free to break.** §12.23 | **[PROPOSED]** one reaction: *"Provost Marrow looks at him for the first time all night."* |

**Reality.** He stands down for a personal reason and the game shows him no further respect than
deleting him.

**The feeling.** The best surprise in the Finale. A table that took the risk feels clever; a table
that did not will never know what it missed, which is correct.

**Risk.** Two big emotional beats (this, and the Decision) with only a code scene between them.

---

### B9.4 · `ch7_attune` — CROWN, and the last four phones

**Knows.** A word cut into the rim of the floor, worn almost away: **CROWN**. The four SIGHT pages:

| seat | SIGHT | WREN — the last time each anomaly is named |
|---|---|---|
| Reader | both walls, both ways, four rows to read aloud; and on KNOT, "the seal at the foot of the Chair's scroll is one word: **CROWN**" | **"There is a word cut into the floor of the empty socket, in letters four hundred years older than ours. It is Wren's name. You decided, in the study, that you had misread it. You have never misread anything in your life."** (`companion/ch7.js:241`) |
| Listener | the phrase opens by climbing one rung — the smallest climb there is | **"Nine people in this chamber, and eight hearts."** (`:246`) |
| Seer | a long deliberate **scratch** at socket 6; a small **notch** at socket 1 | "There is barely any light left to blame." (`:251`) |
| Binder | Law 1 (the mark is the scratch; a notch is only a signature), Law 8 (every glyph once), and on KNOT Law 7 (Idony's) | **"You decided years ago that your gift had a blind spot. It does not."** (`:260`) |

**This is the largest private reveal in the game and it is on one phone, before the Decision.** The
Reader is told, at `ch7_attune`, that Wren's name is cut into a four-hundred-year-old floor. If the
Reader says it out loud — and the house rule printed on the page says they should — **the whole table
reaches H-SOCKET before the Decision is taken.** That is the author's stated ideal, exactly: the aha
one beat early, by a player, out loud.

| # | hypothesis | licensed by | want live? | note / kill |
|---|---|---|---|---|
| 1 | **Wren is older than tonight — the name was cut four hundred years ago** (H-SOCKET) | the Reader's page | **YES — and the game makes it reachable one beat early, which is the right design.** It does nothing to *prompt* it, which is the wrong one | **[PROPOSED]** move it to the head of the Reader's SIGHT tab, or one Hearth whisper: *"The Reader has not said anything for a while."* |
| 2 | **Somebody put the name there on purpose, in Year 0** (H-MADE) | same page | **YES — and now it is a serious theory with real evidence, and the game still never addresses it** | The strongest instance of the §12.5(c) gap. See §4 |
| 3 | The word on the rim, CROWN, means *one* — and the chapter is called One Born of Four | the Reader's lexicon | **YES.** Free irony, never said | **[PROPOSED]** one Reader line |
| 4 | Each of us privately knows what walking will cost *us* | the SPEAK tab's four `walkOn` lines | **YES — and it is the game's grammar working perfectly**: four people each holding their own price, nobody saying it. But see §5 W-3: the Hearth never states the general rule, so the room can enter the Decision without anyone having said "this takes your Sight" |

**The feeling.** Ninety seconds of absolute quiet, and then one of the four looks up.

**Risk.** Same as B8.3, worse: three tabs, ninety seconds, a hard puzzle's worth of facts on SIGHT and
the game's last reveal on WREN. The reveal loses.

---

### B9.5 · `ch7_decision` — **THE DECISION**

**Knows.** Marrow: **"The ring has been ready for fourteen years. Decide."** (`ch7.js:367`) Then, on
`WALK_UNLOCKED`: "Four figures on the wall. Four hands on the stone." Otherwise: "One walks in, and
the Cold closes behind. **That is the reading you have.**" Prompt: **"No clock on this. Talk."**
Options: *Four of us go in together* (if unlocked) / *Let Wren walk* / *Nobody walks* / *Give Wren to
the Envoy* (if Vane still has an offer).

**The best-designed choice in the game.** No timer, four options, four coherent moral cases, and the
option set itself is the ledger of everything the table did in six chapters.

| # | hypothesis about consequence | licensed by | want live? | note / kill |
|---|---|---|---|---|
| 1 | **Fourfold means we die.** | "walk into the Cold"; a fire that takes people; nothing on the Hearth has ever said anyone came out | **YES — emphatically.** The pleasure of E0 is that four fourteen-year-olds volunteered for what they believed was death. Do not kill it on the shared screen | — |
| 2 | **Fourfold means we lose our Sight and live.** | four private phone lines — "you will not read tomorrow", "the house goes quiet", "only you will remember", "you will have to ask people what they feel" — all of which imply a *tomorrow* | **YES — and the tension between 1 and 2 across four phones is genuinely excellent.** Each player privately suspects they survive and none of them can say so without showing their page | Correct as shipped. Flag it as deliberate so nobody "fixes" it |
| 3 | **Refusing means the fire goes out and everyone loses.** | Marrow says so (`ch7.js:380`) | **YES — and it is wrong**: refusing produces E3, in which she walks and the seal holds thin | **The option says "Nobody walks" and somebody walks.** See risk |
| 4 | **Letting Wren walk is the intended, ancient, sanctioned answer and it works.** | six chapters of school doctrine | **YES — and the game refuses to punish it.** E2 buys four hundred years. That refusal to moralise is one of the best decisions in the design |
| 5 | **We still have the Cold Ember — relight the fire and nobody has to walk.** (H-EMBER) | `ch1.js:309` and `ch2.js:188`, both Marrow: "If the Hearth goes out, the Ember lights it again" | **This is the most dangerous live hypothesis in the game, and the game never answers it, at this beat or at any other.** A table *will* say "we have the Ember" at this exact moment | **[WITHHOLDING] — the span's worst.** See §5 W-1. One clause from Marrow fixes it for ever |
| 6 | The ring "being ready for fourteen years" means she prepared it — how, and what did she find? | her own claim, about a four-hundred-year-old floor | **Interesting and unsupported.** §12.22 | **[WITHHOLDING], mild.** One clause: *"I had it swept, and I have not let anybody stand in it since."* |

**Reality vs belief.** The table is choosing between five futures with an accurate cosmology, an
accurate read of every adult in the room, a private and correct guess about the price, and **one
completely unresolved piece of equipment in their pocket.**

**Breadcrumbs planted.** "Four hands on the stone" pre-names the ritual. "That is the reading you
have" is the game telling a table that failed the stone that it is playing with less.

**The feeling.** The longest conversation of the night, and it should be. Ten to twenty minutes of
four people arguing about whether to die. The absence of a clock is the single kindest design
decision in the game.

**Risk.**
1. **"Nobody walks" is not what happens.** A table that chooses refusal watches Marrow walk into the
   fire ninety seconds later. That is defensible — she is not theirs to command — but it is not
   foreshadowed anywhere, and a table will feel the choice was overridden. **[PROPOSED]** one clause
   at `ch7_dec_refuse`: Marrow, *"Then it will have to be somebody."*
2. **A table that failed the stone has a three-option menu and does not know a fourth existed.**
   Correct and painful. Good.
3. **The argument can run long enough to lose the room.** There is no clock, which is right, but the
   game offers no beat to break a stalemate. A single Wren line on a timer — not a decision, just a
   nudge — would be a safe valve.

---

### B9.6 · `ch7_argue1` (branch `OATH_KNOT`) — the Provost bars it

**Knows.** "Provost Marrow steps between you, **doing what you asked.**" **"You swore under KNOT, and
it cannot be unbound. You swore to see Wren into the Cold."** (`ch7.js:387`) Four options, each of
which works: *the stone's foot* → "One Seer low enough to look." · *the tapestry* → **"I scraped it
myself, as a girl."** · *the struck Law* → **"They could not afford four Masters, so they made it
grammar."** · *"Because it is Wren, and we are not doing it"* → **"That is not a reading."** … **"She
steps aside anyway."**

**What it teaches about the world — and it teaches a lot for a two-screen beat.** That the private
lock chosen in ch4 has a public consequence. That Marrow scraped the same paint as Vane. That she has
the one-sentence political history of 212 and has been carrying it. And — in the fourth option —
that the woman who will not be moved by evidence is moved by four children refusing.

| # | hypothesis | licensed by | want live? | note / kill |
|---|---|---|---|---|
| 1 | **She should not be able to know which lock we swore under** | Law 4's last clause: "**The one you swear to cannot tell the difference**" (`lore.js:64`) — which the Binder has had in the Book since ch4 | **YES — and it is a genuinely delicious catch that the game never acknowledges.** §13.14. Three good answers are available: the Binder told her; she is bluffing and happens to be right; **Law 4 is a lie the Order tells its Wardens**, which is perfectly in character for a body that legislated permission to appear more bound than you are | **[WITHHOLDING] with a very cheap fix.** One clause after her line: *"You cannot know that." / "No. I cannot."* — and §12.8's richest unexploited date becomes live |
| 2 | She wants to be argued out of it | "doing what you asked"; "She steps aside anyway"; she yields to a non-argument | **YES — true, and one of the best characterisations in the game** |
| 3 | She and Vane have a history neither will name | both scraped the same paint, decades apart, in the same building, and can both say so in one playthrough | **YES, and it is free and missing.** §12.23 |
| 4 | The oath was a trap she set in ch4 to keep this option closed | she asked for it, she wrote it, she is using it now | **YES — productively wrong.** She asked them to *argue* about it (`ch4.js:355`), which is the counter-evidence, and it is on the shared screen |

**The feeling.** A table that swore KNOT has the best scene of the Finale here: they must justify
themselves to an adult with evidence they gathered. A table that swore EMBER or nothing never sees
it, and does not know it existed.

**Risk.** It is the single best-earned scene in ch7 and it is on a branch. Nothing to be done, but it
should be recorded: **`OATH_KNOT` is the richest Finale branch and the fewest tables will see it**,
since EMBER is the "safe" reading of ch4's choice.

---

### B9.7 · `ch7_dec_fourfold` / `_walk` / `_refuse` / `_dec_vane` — what Wren says

| branch | the line | what it plants |
|---|---|---|
| **fourfold** | "You say it the way the Founders wrote it. Four, as one, go through." / Wren: "The *deal* was that I go in. Fine. Fine! [GROUP]. **Four idiots and a hollow.**" (`ch7.js:423`) | the fourth use of *hollow*, said by Wren, about Wren, eight beats before the socket |
| **walk** | Wren: "That is what the stone says, and **I have had years to get used to it.**" / "Don't do faces. [GROUP] don't do faces. **I'll stand in the bit that isn't written.**" (`ch7.js:404-405`) | **"the bit that isn't written" IS the empty socket, named before it is shown.** The best plant in the Finale, and it only fires on the branch where the socket is never reached |
| **refuse** | Marrow: "Nobody. Then the fire goes out and the Envoy gets what he came for." / "Build the sigil anyway. **Hold the Cold while I think.**" | "while I think" is the only warning that she is about to decide something |
| **vane** | "The Envoy does not gloat. He holds his hand out as if helping someone over a stream." / Wren: "Oh. No, it is fine. **He promised. People keep saying he keeps promises.**" / "Wren goes without looking back. The spark goes out." | nothing; it is an ending |

**The withholding at the heart of this.** On `WALK` — the ending where Wren dies — Wren says "I'll
stand in the bit that isn't written", and the table never learns what that means, because the socket
scene is E0-only. **A table that sealed Wren gets the game's best line and none of its meaning.**
**[PROPOSED]** one line at `ch8_e2`: *"The socket at the ring's edge has a word cut in it, in letters
older than the school. Nobody reads it."* Devastating and free.

**Risk.** The fourfold branch's "Four idiots and a hollow" is a joke on the surface and the answer
underneath. Half of all tables will laugh and move on. That is fine — but with the B8.16 word-joining
line proposed above, *the other half hear it land*, which is the difference between a good game and a
transformational one.

---

### B9.8 · `ch7_tokens_intro` + `ch7_tokens` — four sealed words

**Knows.** Two minutes on a countdown. Every phone, SPEAK. **"Nobody here sees the question or the
answer."** Two questions on the four-value branch: *When the ring closes, do you walk into the fire,
or stay?* and *The Envoy's word, to you alone: bring the boy to my door and you live a Master.* One
word answers both. Then four slots on the Hearth, in seat order, and the fire answers only
"received".

**What it teaches about the world: nothing. What it does to the table: everything.** Four people look
at four phones and not at each other for two minutes, having each been offered a mastership by name.

| # | hypothesis | licensed by | want live? | note / kill |
|---|---|---|---|---|
| 1 | Somebody at this table is going to take it | Vane's letter is on three or four phones and nobody can see whose | **YES — and the not-knowing is the design**. This is the game's best social mechanic |
| 2 | **How does Vane know my first name?** | the letter is personalised with `ctx.name` (`companion/ch7.js:182`) | **A real, unsettling question that the fiction never accounts for.** §12.34 | **[WITHHOLDING]**, small but sharp — the one place the game breaks its own fourth wall by accident. One clause: *"He has had a list of you since the Hall."* Free, and it makes him worse |
| 3 | My own walk decision is already made and this is just paperwork | the Decision happened out loud, four beats ago | **NO, and the design correctly kills it**: the Decision is the table's, the token is the person's, and they can disagree. A table that voted Fourfold and then had two people seal STAY produces E1 or E3, and the Epilogue names them |

**The feeling.** The quietest two minutes of the night. Nobody talks. Somebody laughs nervously.
Somebody's thumb hovers.

**Risk.** Two minutes of enforced silence at the climax of a two-hour game can sag, and the timer is
generous — the button is there for a reason and most tables will use it inside forty seconds.

---

### B9.9 · `ch7_bargain_<role>` ×4 (branch) — "I keep my promises. Do you keep yours?"

**Knows.** **"The fire says one name out loud: [Nickname]."** Vane: **"I keep my promises. Do you keep
yours?"** Fifteen heartbeats. *Break it* → Wren: "**It's alright. I'd have taken it too.**" *Keep it*
→ Vane: "**Thank you.**" *Silence* → "**Nothing. Well. Nothing is an answer.**"

**What it teaches about the world.** That Vane's code is real: he does not punish, he prices; he
accepts a kept bargain with two words and a refusal with none. And that Wren manages the guilt of the
person who sold them — which is the single most characterising line Wren has.

| # | hypothesis | licensed by | want live? | note / kill |
|---|---|---|---|---|
| 1 | Keeping it costs the ritual a hand | "That key was dead, and three hands wrote what four should have" (`ch8.js:254`) — but only afterwards | **YES, and the player should NOT be told the mechanical cost before choosing.** The choice is moral, not tactical | — |
| 2 | Wren will hate whoever kept it | six chapters of loyalty | **KILLED, and the kill is the best thing about the beat**: "I'd have taken it too" |
| 3 | The Hearth kept my secret | it did not — it says the name out loud | **KILLED by the beat itself**, and it is the right betrayal: Vane's letter promised "the others need never know who opened the door" and the fire tells them |

**The feeling.** The most exposed anyone is all night. A named player, in front of three friends, on
a fifteen-second clock.

**Risk.** **The branch is invisible.** A table where nobody accepted never sees this scene at all, and
loses the Finale's social peak with no substitute. Worth considering: on `!accepted`, one line —
Vane, to the room: *"Nobody. Well. That is also an answer."* — which costs nothing and gives every
table the beat's shape.

---

### B9.10 · `ch7_bargains_done`

**Knows.** "Nobody was bound. The room lets out a breath." / "[X]'s key goes dark. **Three hands must
bind what four should.**" / "[Y] broke the Envoy's word to his face." / On two kept: "**A majority of
hands.** He does not have to take anybody. The rest follow, and the spark goes out." → E4.

**What it teaches.** That the ritual is a physical count of hands, and betrayal is subtraction. The
best conversion of a moral choice into a mechanic in the game.

**Risk.** A table that lands on E4 through two kept bargains reaches the worst ending *without ever
choosing it at the Decision*. That is powerful and it is also a trap-door. It is correctly signposted
by "a majority of hands", but only after the fact.

---

### B9.11 · `ch7_sigil` — **THE GREAT SIGIL** (puzzle · ring, 8 sockets, clocked)

**The four facts.** Reader: what each wall says, from either end. Listener: the phrase opens by
climbing one rung. Seer: a scratch at socket 6, a notch at socket 1. Binder: a sigil begins at the
scratch and runs sunwise; **a Great Sigil names every glyph once**; and on KNOT, Idony's Law.

**The phrase.** KNOT EMBER THORN WELL ASH VEIL CROWN COLD —
*four-as-one, to close; a gate, a going-down; the Hearth, behind; the one, and the hollow.*

**And that gloss exists only in a source comment (`ch7.js:130`). It is never printed.**

| # | hypothesis | licensed by | want live? | note / kill |
|---|---|---|---|---|
| 1 | **Law 8 forces COLD into the ring, Law 6 forbids it, Law 0 permits it by four hands, and Law 3 says the older binds — so the ending is already determined** | the Binder has all four Laws on one page, right now | **YES — and it is the single best available one-beat-early aha in the Finale.** A Binder who reasons it out predicts the climax before the ring closes | The game does nothing to acknowledge a table that gets there. **[PROPOSED]** one conditional line at `ch7_cold_slot`: *"The Binder said this ten minutes ago and nobody argued."* |
| 2 | The empty socket is for COLD, and COLD is Wren | the rule card says "not every socket takes a word"; the Reader's phone says the empty socket has Wren's name in it | **YES — available now, one beat early, on one phone** |
| 3 | Getting it wrong costs the night | the rule card prices it: "a cold ring costs a minute, the next more" | **YES** — true and escalating (60, 90, 120…) |
| 4 | The Hymn we have been hearing all night is this phrase | the Listener has heard pieces in every room; `solvedText` says "the Hymn plays itself through the floor" | **YES** — true, and the last beat is a silence, which is COLD, which is Wren. **Nobody says that either** |

**What it teaches about the world. Grade A for structure, C for delivery.** Structurally it is the
whole game: two half-sentences that only mean something together, a Law that forces the forbidden
word, and a ring that must be turned if you swore to a person. **But the table solves an eight-word
sentence about itself and Wren and is told only "The ring warms. Every word, once."** Compare ch6,
which printed its sentence in English and let the room hear what it had read. **[UNEARNED] in
reverse: the payoff is written and withheld.** §12.24.

**Cheap breadcrumbs / fixes available here. [PROPOSED]**
- **Print the gloss.** One `solvedText` line: *"Four-as-one, to close; a gate, a going-down; the
  Hearth, behind; the one, and the hollow."* It already exists in the file. This is the single
  highest-value one-line change in T9.
- **Name the silence.** One clause: *"and the last beat of it is a rest."*
- **Light the ring while it is being solved.** `ch7_ring` only receives `lit` from `ch7_end`
  (§13.50b), so for the whole eight-glyph puzzle placing a glyph produces **no change in the room**.
  At the climax of the game. This is an art-parameter fix and it is the highest-value visual change
  in the span.

**The feeling.** Grim concentration with a clock running. The Seer reading numbers off a floor. The
Binder saying "no word twice" for the fifth time.

**Risk. The Finale's overload point.** Hardest partition in the game, under a timer, at the end of a
two-hour session, immediately after the most emotionally exposed scene in it. And if the table failed
the stone in ch6 they have two minutes less, which they are told about in a parenthesis on the rule
card.

---

### B9.12 · `ch7_binding` — THE BINDING

**Knows.** "Hands on your keys. **No phones now.**" Press once to sound your note; all four together;
hold while the fire climbs; let go together inside half a second. Cracked bells mute lanes ("cracked —
on the count"); a kept bargain kills a lane ("Three notes, a longer climb"). A slip costs thirty
seconds and **cannot cost the night**.

**What it teaches about the world.** Four-as-one, one last time, as a physical act with no
information in it at all — and **every earlier failure arrives as a dark lane.** A table that cracked
three bells in ch6 watches three of its four lanes go dark at the climax. That is the best
consequence-visualisation in the game.

**The feeling.** Hands on keys. Somebody counting out loud. "The fire climbs — not much, but it
climbs."

**Risk.** Low, and deliberately so: the design note says the round is priced at zero on purpose
because a reflex wall at the last beat of a two-hour game is not a puzzle. Correct.

**Art flaw, flagged:** the Finale never draws a cracked bell (§13.50a) — `artP` passes only `{ally}`,
so a table that cracked three sees four whole bells for the whole chapter while the prose and the
lanes both say otherwise.

---

### B9.13 · `ch7_cold` (branch) — midnight

**Knows.** **"Midnight. The spark goes out — not guttering, simply gone."** Then Wren, in the dark,
still talking: **"Well. Nothing is on fire. Finish the ring."** **"Nothing you have done is undone.
The clock has stopped for good."**

| # | hypothesis | licensed by | want live? | note / kill |
|---|---|---|---|---|
| 1 | **THE EMBER. We have the Ember. Light it.** (H-EMBER) | `ch1.js:309` / `ch2.js:188`, verbatim: "If the Hearth goes out, **the Ember lights it again**" | **This will be said out loud, at this table, at this beat, by somebody.** And the game does not hear them | **[WITHHOLDING] — the worst single moment of it in the game.** The object of an entire chapter, carried down six, is not mentioned at the one instant its stated function applies. §13.11, §12.13, §12.54 |
| 2 | Everything is lost | a fire that is out | **KILLED, well, in one line**: "Nothing you have done is undone" |
| 3 | The fire is mortal and we have just seen it die | it went out | **YES — and then it roars white twenty minutes later (`ch7.js:756`), unexplained.** §13.11: if the fire can be entirely out and back, its mortality — the premise of the night — is unpriced |

**[PROPOSED], and it is the top recommendation of this document.** One clause, anywhere between
`ch6_marrow` and `ch7_cold`:
> **Marrow: "The Ember lights a fire. It does not close a wound."**
Eleven words. It kills a false hope that four people are holding, it makes the ch2 stair-fall choice
finally *mean* something either way, and it removes the one moment where the game visibly fails to
notice what its players are saying. If the author prefers the Ember to matter, the alternative is the
inverse and just as cheap: `ch7_cold`, one line — *"Somebody says the Ember. Marrow: 'Then we will
have four hundred more years of exactly this. Finish the ring.'"*

**The feeling.** Genuine dread, then Wren being funny in the dark, which is the character's whole
thesis. Very good.

---

### B9.14 · `ch7_cold_slot` — **the empty socket**

**Knows.** **"The ring is full but for one socket. Wren walks to it and stands in it."** **"It is
never written."** Wren: **"It's cold in here. Obviously. It's me."** **"Four sealed words said WALK.
Nothing here looks surprised."** **"Something is cut into that socket, in letters the Reader knows."**
(`ch7.js:695-699`)

**Is it earned? Yes — richly, and it is the best-earned reveal in the game.** The evidence the player
actually had:

| evidence | since | where |
|---|---|---|
| The eighth glyph is COLD, has no note and no step, and is never written | Prologue | the Listener's Ladder, `book.js:89-92` |
| COLD glosses **"a hollow"** | Prologue | the Reader's lexicon, `glyphs.js:18` |
| WRENN means **"the hollow of a bell — the space that rings"** | ch4 | the Reader, `companion/ch4.js:202-204` |
| No heartbeat, no thread, a shadow that reaches for fire | Prologue → ch7 | three phones, six chapters |
| "The fire is **the hollow** they left" | ch6 | the shared screen |
| The empty socket bears Wren's name in letters four hundred years older than ours | **ch7_attune — one beat ago** | the Reader, `companion/ch7.js:241` |
| Wren: "I'll stand in the bit that isn't written" / "Four idiots and a hollow" | ch7, minutes ago | the shared screen |

**And "Nothing here looks surprised" is the game acknowledging that the table got there first.** That
single clause is the model for every aha in the game and Act II's audit found nothing like it.

| # | hypothesis still live | want live? | note |
|---|---|---|---|
| 1 | Wren *is* the Cold entire, not a piece of it | **YES** — never mechanised (§12.5), and the ambiguity is load-bearing |
| 2 | Wren was the missing Founder / the one who was never asked | **YES — and it is the best unlicensed theory in the game.** Mere's sheet says "one was never asked" (`companion/ch4.js:62`); Mere left a door "for people who were not asked" (`ch5.js:287`); the First Hall has **five** arches (`scenes-ch5.js:64`). Three plants, no answer. §12.4, §12.26 |
| 3 | Somebody cut that name in Year 0, knowing (H-MADE) | **YES, and it is now unavoidable** — a name in a four-hundred-year-old floor is a fact, not a hunch. The game never once lets a character ask about it |

**The feeling.** The table stops. Somebody says "oh my god" — at a game — which is what the whole two
hours were for.

**Risk.** Low. Do not touch this beat except to add the acknowledgement line for tables that reasoned
it out at `ch7_sigil` (see B9.11 #1).

---

### B9.15 · `ch7_wren_code` — WREN

**Knows.** A code scene: type **WREN**. "It is never written. **Write it.**" And on every phone:
**"Your Sighting is spent. Look up."**

**[CONTRADICTION §13.5], and it fires in front of the Reader.** The Reader's own Book says the roll
spells it **WRENN** (`book.js:75`) and the socket bears "Wren's name" — and the Hearth asks for
**WREN**. A Reader will notice. The cleanest resolution is the one `CANON.md` proposes: make it
diegetic. The socket bears WRENN; the Reader says so; the table types what the Hearth asks for; and
one line acknowledges the difference — *"Four letters, not five. The fire has always spelled it
wrong."* That is free, and it makes the Reader's whole arc land on one syllable.

**The feeling.** Four phones go dark in sequence. Nobody has a page any more. This is the game
removing its own core mechanic one beat before the end, and it is superb.

---

### B9.16 · `ch7_fourhands` — **"COLD is written by four hands." — Law 0. Restored.**

**Knows.** One line on screen, and then the mechanic: all four keys within a heartbeat, with no phones
and nothing to read.

**This is the best marriage of mechanic and fiction in the game.** A Law that has been struck since
Year 212, visible on one phone since the Prologue, outranked by date since ch2's Law 3, is **enacted**
by four people pressing four keys together. There is nothing to add. Do not touch it.

**Risk.** A stuck key here is the one dead end in the game, and the file handles it (the escape hatch
is hidden for forty-five seconds). Note that taking the hatch writes "COLD was written, but not by
four hands" into the Epilogue's notes, which is exactly right.

---

### B9.17 · `ch7_white`

**Knows.** **"A fire the wrong way up appears in the empty socket, written by four hands."** / "Wren
steps aside. The four step through." / **"White."**

The art draws the COLD glyph at architectural scale, **warm-coloured**, and then the white frame is
itself the COLD glyph with four people standing inside it (`scenes-ch7.js:125-138`). A cold glyph
drawn warm, at the moment it stops being a wound. Nobody says it; nobody needs to.

---

### B9.18 · `ch7_ending` — the Walk, five ways

| E | what the table is told | what it does to their model |
|---|---|---|
| **0** | "The Hearth roars white. **Four people come out, grey-eyed and ordinary.**" + each gift's loss named in one clause + "Wren is on the warm stones, crying, and will deny it. **And there is a heartbeat.**" / "You *idiots*. I had a *speech*." | **H-PRICE resolves after it is paid.** Two readings: a gift (you volunteered for death and got life) or a cheat (the stake was softer than advertised). The private phone lines make it the first — each player privately knew — but **the shared screen never said it**, so a table where nobody read their SPEAK tab experiences it as a reprieve they did not earn |
| **1** | walkers named, stayers named; "The Cold closes. Not all the way. Enough." / "Half a walk. Story of my life." | the arithmetic of partial commitment, made public. Brutal and fair |
| **2** | "It is alright. **I knew. I wanted to hear what you would say.**" / "The fire takes the shape of a door, and Wren goes through. Provost Marrow is left holding a grey thread." | **Wren wanted to be asked, and said so only when it was too late to act on.** The game's saddest line and it is one clause |
| **3** | "Then I go. **I should have gone fourteen years ago.**" / "She gives Wren the Chair's seal. The flame takes her." | Marrow's self-indictment, finally spoken. And the 212 answer run again, with better motives: one Warden down, alone |
| **4** | "Wren goes without looking back. The spark goes out." | — |

**The largest hole in the span.** **On E0, E1 and E4 Marrow is not mentioned at all** (§12.30). On
E0 — the ending that supersedes her fourteen-year plan, executed in front of her, by four children
she sent down herself — the woman does not appear. **A table will ask, out loud, "what did Marrow
say?"** and the game has nothing. One sentence would close it:
> **[PROPOSED]** *"Provost Marrow is on her knees in the chalk with both hands over her mouth."*
Or, better, one line of hers in the Epilogue's letters on E0, which currently go only from Wren.

**The other hole, on E0.** "For the first time in four hundred years **it is not holding anything
shut. It is simply a fire.**" (`ch8.js:286`) — a table that has spent two hours learning that the fire
holds a wound down is told the wound needs no holding, and given no mechanism. It *is* earned by the
stone ("what is kept stays behind") but the game never says *you closed it*. **[PROPOSED]** three
words: *"There is nothing under it any more."*

---

### B9.19 · `ch7_flow` — the Finale, as you walked it

Stats: the ending's name; the cold rings; the Binding's slips and midnight margin; who kept the
Envoy's word. **[CONTRADICTION §13.49]:** `MIDNIGHT_LEFT` prints as "to spare" even when midnight
passed — a table that finished in the dark is told it had 0:00 to spare.

---

# 3 · T10 — CHAPTER VIII — THE EPILOGUE

Fifteen beats. Attunement word **WREN** — not a glyph. No house rule on screen, deliberately: the
phones are done and the game hands the reading back to the room. No puzzle, no hints, no `par`.

---

### B10.1 · `ch8_start` — who walked

**Knows.** Two ledger lines in `cls:'center'` — *Walked into the fire: **X**. Stayed on the stones:
**Y**.* — then one branch paragraph, then the one table instruction of the chapter: **"Whoever is
nearest has the keyboard. Read the rest aloud, a paragraph each, round the table from the Reader."**

The handing-back of the reading is the correct last mechanic. Say so in the host guide.

| # | hypothesis a table holds here | want live? | note |
|---|---|---|---|
| 1 | "Did we get the good one?" | **YES** — and the game refuses to say for another eleven beats, which is right |
| 2 | On E4: "the fire is still lit, so it was not so bad" | **KILLED in the same sentence**: "**That is the horror of it: nothing about the fire has changed at all.**" The best single line in the Epilogue |

**[CONTRADICTION §13.42]:** E4's prose says nothing about the fire has changed; the art draws it
**cold blue, fed by pipework** (`scenes-ch8.js:82`), and four scenes later the prose calls it "a
furnace with a schedule". The two prose lines reconcile; the art does not.

**[CONTRADICTION §13.43]:** E1 with four walkers prints "Stayed on the stones: **nobody**" immediately
followed by "**Not every hand went in.**"

---

### B10.2 · `ch8_e0` — White

**Knows.** "the white of a forge, of a thing too hot to have a colour." / **"for the first time in
four hundred years it is not holding anything shut. It is simply a fire."** / **"You come out of it
the way the Founders came out: grey-eyed and ordinary."** + the four losses, one clause each, word for
word matched to the four private phone lines from `ch7_attune` (`companion/ch7.js:185-188`). / "Wren
is waiting on the stones." / "You took your *time*." / **"There is a pulse in Wren's throat. You can
see it from here. The Listener, who will never hear anything like it again, does not need to."**

**The best-paid promise in the game.** Four private costs, sealed on four phones before the Decision,
paid out in four public clauses in one paragraph. Nothing needs changing.

| # | hypothesis still live | want live? | note |
|---|---|---|---|
| 1 | **Why does Wren have a heartbeat now?** | **YES, and the answer is on one phone**: "It wasn't that there wasn't one. It's that there wasn't a *me* on the other end to tie it to. **There is now.**" (`companion/ch8.js:126`) | §12.53. A table with a silent Binder never gets it. **[PROPOSED]** surface one clause on the Hearth |
| 2 | Is the Cold gone, or just unheld? | **YES — and it should be**, but it needs the three words above |
| 3 | Where is Marrow? | **NO — this is not intrigue, it is absence.** §12.30 |
| 4 | Did the Founders get this too — did they come back to somebody? | **YES.** H-AFTER's last appearance, and the Epilogue has the perfect place to touch it and does not |

---

### B10.3 · `ch8_years` (E0 only) — years later

**Knows.** "Four unremarkable people, in a house that is too small for all of them, every winter. They
argue about what the ring looked like, and never settle it." / **"The Reader keeps a letter in the
drawer by the bed. It is one line of glyphs. The Reader cannot read it, and will not have it
translated."** / "They would do it again." / "**Wren visits.**" (or "Wren visits, **in the end**", the
only consumer of `WREN_TRUST` in the game) / "You're all *awake*. Excellent."

**The letter in the drawer is the game's best last image** and it is a direct payoff of the Reader's
gift, the Reader's loss, and the three glyphs in the E0 goodbye letter (KNOT ASH EMBER — *four-as-one,
the fire, to keep*: "Fire, keep", which is what the dormitory lamp said in the Prologue).
**That circle — ch0's lamp reading *Fire, keep* and ch8's untranslatable letter saying the same three
words — is closed and never pointed at.** It does not need to be. Record it as intentional.

**Risk.** `WREN_TRUST` buys two words after being written four times across two chapters. A table will
never know a difference existed. That is fine for a flag; it should be recorded so nobody expands it.

---

### B10.4 · `ch8_e1` / `ch8_e2` / `ch8_e3` / `ch8_e4`

| E | the line that does the work | what it settles / unsettles |
|---|---|---|
| **1** | "**[stayers] keep their Sightings, and the fire, for life. There is a school above you that needs Masters who can read the wall.** Those are the Masters." / "There is no pulse in Wren's throat. **Only the Listener would ever have known.**" | the only ending where the school's future is addressed at all. Note that E0 — the one the game is built for — says nothing about who staffs Thornhallow (§12.30) |
| **2** | "In the morning a mason carves a fifth name over the Hearth, **beneath the four Founders**. He has to ask how to spell it. **Nobody in the room can spell it the old way, and the Reader does not offer.**" | the only place the four Founders' names are asserted to exist. And the Reader's whole arc lands as a refusal. §12.40: what he carves is never said |
| **3** | "She does not say goodbye to Wren. **She has been saying it for fourteen years, and the Binder has seen the colour of it.**" / "Provost Wren of Thornhallow keeps a fire that flickers… **The fourth-years are told it is nothing.**" | Wren inherits the Chair and the lie. The 212 answer, run again, kindly |
| **4** | "**You are Masters, as promised. Masters of ash.**" / "On the chart of the night, beside your four names, it says nothing at all." | Vane kept every promise exactly |

**[CONTRADICTION §13.13], and it lands on an emotional beat.** E3: "Wren, **who once called someone
Mum by accident**" (`ch8.js:346`) — against at least four uses, two unmistakably deliberate, including
`ch6.js:689` ("And — **Mum.** I know."), which is the emotional centre of Chapter VI and which every
table will have heard **ninety minutes earlier**. "Once" and "by accident" are both false and the
table will know it. Fix.

**The E2 gap, restated from B9.7.** On the Sealing, the empty socket with Wren's name in it is never
seen by anyone. The best available addition in T10 is one sentence putting it in the mason's scene or
in the E2 prose.

---

### B10.5 · `ch8_night` — the whole night, eight hours

**Knows.** Eight rows, one per chapter, dormitory to the Cold, each ringing its chapter's glyph note
as it lands — so by the eighth the room has heard THORN KNOT VEIL EMBER ASH WELL CROWN, which
`ch8_words` names three beats later.

**What it teaches, retroactively.** That the night was a sentence, and the player has been typing it
one word per chapter for two hours. It is a genuinely well-built long game.

**The feeling.** Recognition, warmth, and arguing about ch3. A dimmed row for a chapter reached by
chapter-select is a kind touch.

**Risk.** Eight rows at 0.48 s apart is nearly four seconds of animation before the last line
appears; a table that is talking misses the ch7 row.

---

### B10.6 · `ch8_unseal` + `ch8_unsealed` — four boxes

**Knows.** "**Twice tonight, each of you chose alone and told nobody.** The fire kept all four boxes."
Then: unseal them, one at a time, by nickname — or *"Leave them sealed. Some things a night keeps."*
→ "The fire keeps them. It is good at that."

Each card, when opened: *In the laundry:* the whisper, scored as truth/bluff/lie/kindness. *At the
fire:* would walk / would stay / took the Envoy's word and kept it / and then broke it / in the dark /
refused.

**This is where the table finds out who lied to a fourteen-year-old in a laundry and who took a
mastership in the dark.** It is the only place a player learns that another player accepted Vane's
offer and was never asked about it in public.

| # | hypothesis a table holds | want live? | note |
|---|---|---|---|
| 1 | "I know what everyone said" | **KILLED, and the killing is the beat**: at least one card will surprise somebody |
| 2 | Leaving them sealed is the mature choice | **YES — and the game agrees with the table either way**, which is unusually graceful |

**[CONTRADICTION §13.41]:** "Twice tonight" — there were **three** sealed per-player channels: the
whisper (ch3), the hold (ch5) and the finale (ch7) (`lore.js:32-36`). The ch5 hold is genuinely
private and ch8 honours it on the phone (`companion/ch8.js:227-228`), so the correct word is *three*,
or the line should say *twice the fire kept*, which is true.

**Risk.** For a group with real friction, this beat can turn an ending into an argument. That is a
feature, and the host guide should say so out loud.

---

### B10.7 · `ch8_map` — **the route is KNOT**

**Knows.** The Map of the Night, and the gold line of the route: dormitory, hall, vault, gallery,
study, stair, chamber, the Cold, dawn. Then the route redrawn as a shape with nine waypoints:
**"— it is the glyph KNOT. Bound together, four as one."**

**Is it earned?** The player walked it; the map has been available all night on the MAP button; KNOT
is on the Reader's lexicon from the Prologue and glosses "bound; together; **four-as-one**". A player
*could* have got there. Essentially none will, and **that is legitimate for a closing flourish**: it
is a retroactive aha, not a withheld one, and the difference matters. The game earns it by having
drawn the route honestly for two hours.

**Do not plant for this one.** Any prompt earlier would spoil it.

**One note.** The map's heading changes at ch5 to "**THE UNDER-MARCHES — the world is a lid**"
(`map.js:78`) — the best line in the game that is not in a chapter file. A table that opens the map
in ch6 reads it. Worth surfacing once in prose.

---

### B10.8 · `ch8_stats` — the numbers

Seven sentences. **"Four clues in the bell-chamber. You caught {n}"** (§13.40) is wrong twice: nothing
was hidden and nothing was caught, and ch6 said it better ninety minutes ago — "**You gave Wren N of
the four answers Wren already had.**" Change ch8 to match ch6. It is one string and it is the
difference between a scoreboard and an epitaph.

The other six are good. **"The stone and the Sigil. You read them back wrong {n} times"** is the one
place in the game where the two reading puzzles are priced in one currency, and it is the right call.

---

### B10.9 · `ch8_words` — **the eighth glyph**

**Knows.** "The words that woke your phones tonight — THORN, KNOT, VEIL, EMBER, ASH, WELL, CROWN —
are **every glyph that can be written, each of them once.** The eighth is the rest. **The rest is
never carved.** **You wrote it twice: once in the dormitory, when it was a dare, and once just now.**"
Then eight cards; the eighth is the COLD glyph, captioned **WREN / never written**.

**The Prologue callback is the longest-range plant in the game and both ends of it are unmarked.** In
`ch0_carve` the four carve **WREN** into a four-hundred-year-old lamp and **"It flares blue, once, and
dies"** (`ch0.js:169`) — blue being the Cold's colour in the palette and nothing else's — and Wren
says, straight-faced, **"Names don't burn. Words do — the old ones."** (`:170`) Which is a lie, or a
deflection, or the truth told sideways: WREN *is* a word, it is the old one, and the lamp answered it.
§12.47. **Two hours later the Epilogue collects it in one clause and nobody at the table will connect
them without help.**

**[PROPOSED], and it is the best long-range repair in the document:**
- **At ch0:** one whisper after the blue flare — *"Blue. Nothing else in this room burns blue."*
  Nine words in the Prologue, and the Epilogue's callback becomes the last click of a two-hour lock.
- **At ch8_words:** one clause — *"…once in the dormitory, when it was a dare and the brass went
  blue, and once just now."*

**[CONTRADICTION §13.12]:** "**The rest is never carved**" is Law 6 — the Order's, Year 212 — restated
as though it were the world's, one scene before the Binder's own card celebrates its overturning
("· **WRITTEN** — Tonight it was."). The fix is one attribution: *"The Order said the rest is never
carved."*

---

### B10.10 · `ch8_code` — the last word, and the goodbye letters

**Knows.** On four endings, the table types WREN and every phone shows its last page. On E0 this scene
is skipped because `ch7_wren_code` already was it.

**What each phone shows, by ending:**

| ending | the phone | the mechanic |
|---|---|---|
| **0** | Wren's letter to *that player, by their real first name* — three glyphs for the Reader (KNOT ASH EMBER); a drawn heartbeat and an audio button for the Listener ("Cup your ear — once"); a drawing of five shadows all falling away from the fire for the Seer; a red thread from the player's name to Wren's for the Binder | then a **"Look up"** button, then the page **burns**: "**Your Sighting is spent. Look up.**" → a warm-white page: "There is nothing left on this page. **Look at the people at the table.**" |
| **1** | the same letter to whoever walked; `STAY_LINE` to whoever stayed | — |
| **2** | one line from Wren, by name, then the page fades | 10.5 s, with a "Read it again" button |
| **3** | one letter from **Marrow**, "— I. M.", written on the back of the writ, and she did not wait to see it read | — |
| **4** | a Crown seal: "Sighting registered. Report to the Envoy at dawn. **The Cold is open for business.**" | "There is no page after this one" |

**"Your Sighting is spent. Look up." followed by a page that says "Look at the people at the table" is
the best single design move in the game.** The companion app spends two hours making four people look
at phones and then removes itself and tells them why. Nothing to change.

**Two observations for the author:**
1. **E3's Marrow letters are the only place in the game where she says the thing she has learned**:
   "Do not let that stop you listening — **I did, and it cost fourteen years**"; "I should have asked
   you sooner. **I should have asked anyone. Ask, when you are me**"; "**Swear the next one to a
   person.**" Four sentences, on four phones, on one ending. On E0 — the ending the game is built for
   — she says nothing to anyone. That asymmetry is §12.30 at its most costly.
2. **The Binder's E0 letter carries the answer to §12.53** ("there wasn't a *me* on the other end to
   tie it to. **There is now**") and it is the only statement of Wren's mechanism anywhere. One
   player, one screen, once.

---

### B10.11 · `ch8_flow` + `ch8_end` — "Sit with it."

**Knows.** "The night ended in [ending]. **Greyed beside it are the four nights it could have been.**"
Then: "Sit with it." On E0: "**Four friends, a small house, a fire that is only a fire.**" On E2:
"**There was a night where nobody had to. The fire will show you the way back to CROWN, if you want
it.**" Otherwise: "The fire will show you the way back to any hour of the night."

**E2's closing line is the sharpest thing in the Epilogue**: a table that sealed Wren is told,
gently, that a night existed in which nobody had to, and offered the road back to it. That is the
game grading the ending without saying a word about morality.

**The feeling.** Quiet. Somebody hits "The whole night again." Somebody else does not move.

---

# 4 · THE HYPOTHESIS SPACE AUDIT

> *Is the set of live possibilities interesting, or merely ambiguous? A mystery where the honest
> answer is "I have no basis to guess" is withholding, not intrigue.*

## 4.1 The verdict

**T8 is the strongest hypothesis space in the game and T9–T10 is the weakest.** The reason is
structural and worth naming:

- **In T8 the player is still deducing**, and every live theory is anchored to something they handled
  — a lid, a bell, a burnt cut, four sentences said out loud. The chapter's forks (is she telling the
  truth? can she finish it? is the Cold aware? is Wren the one?) each have three to five candidates,
  at least two partly true, and the wrongest one (H-BLAME) generates the most dread. That is exactly
  the design the author described.
- **In T9 the player stops deducing and starts deciding**, which is correct — but the game does not
  notice that two of its biggest questions (H-EMBER, H-PRICE) are still open at the moment of the
  Decision, and it answers neither before or after.
- **In T10 the game answers everything it is going to answer, and then leaves five institutions,
  three characters and one child's mechanism unaddressed.**

**Eleven points fail the test.** In order of cost.

## 4.2 [WITHHOLDING] — mystery with no basis to speculate

| # | where | the problem | the cheapest fix |
|---|---|---|---|
| **W-1** | `ch6_marrow` → `ch7_decision` → `ch7_cold` → for ever · **the Cold Ember** | Two Marrow lines in ch1 and ch2 establish that the Ember relights the Hearth. The table carries it (or loses it) through six chapters. **It is not mentioned once in ch6, ch7 or ch8** — including at `ch7_cold`, where the fire actually goes out, which is the one circumstance its stated function covers. §12.13, §12.14, §12.54, §13.10, §13.11. A table *will* raise it at the Decision and the game will not hear them | **One clause. Marrow, at `ch6_marrow`: "The Ember lights a fire. It does not close a wound."** Or the inverse at `ch7_cold`. This is the top recommendation of the document |
| **W-2** | across ch6–ch8 · **two greys, never joined** | A grief-thread is grey. A spent Sighting is grey. Mere "came up grey." The Founders came out grey. `ch8.js:287` pays off a word the game has never defined. A player who concluded Marrow's Sight is spent was licensed to and is never corrected. Inherited from Act II W-7 and still unfixed in my span | One clause at `ch6_tieoff`, on the `VOLUNTEER` branch, where a Sight is visibly coming back: *"Grey, and then not grey. That is what a spent Sight looks like."* |
| **W-3** | `ch7_decision` · **the price of walking is never on the shared screen** | Four private phone lines imply survival; no Hearth line states the rule. A table that did not read SPEAK makes the biggest choice in the game without the room ever having said what it costs — and then E0 hands them a reprieve they did not know they were owed | Either accept it as deliberate (each player privately holds their own price — which is the game's grammar and arguably perfect) **and say so in the design docs**, or add one Marrow line: *"It costs what it cost them. You saw what they came back as."* |
| **W-4** | `ch7_wall` → for ever · **Vane's fate** | `VANE_ALLY` deletes him from the fiction with four soldiers still on the stair and the Crown still wanting the Cold open. §12.32. The player has no basis to guess whether he protected them, reported them, or went home | One line at `ch7_wall`: *"He says something to his captain. The soldiers sit down on the stair."* |
| **W-5** | `ch8_e0` / `ch8_e1` / `ch8_e4` · **Marrow is absent from three endings, including the true one** | §12.30. The woman whose fourteen-year plan the table has just superseded, in front of her, is not in the scene. This is not intrigue; it is a missing person | One sentence at `ch7_ending` E0, and/or one Marrow letter on the E0 phones |
| **W-6** | `ch6_start` · **who built the lid, the shaft and the bells** | A manufactured object with twenty-eight rivets sits under the whole chapter, and an engineered sightline runs from the fire to the seal. §12.19, §12.20. No character, no page and no art caption offers a candidate | One Marrow clause: *"The Founders made the lid. They hung the bells before they went down."* Also answers half of §12.38 |
| **W-7** | `ch6_tieoff` · **the chamber's light** | "Not the lamps. There are no lamps. **The light simply stops.**" §12.68. The source is never named before or after | One clause anywhere earlier: name the source, so the dark is a consequence |
| **W-8** | `ch7_argue1` · **Marrow knows the lock and Law 4 says she cannot** | §13.14. A Binder who read Law 4 will catch it. Three good answers exist and the game offers none | One exchange: *"You cannot know that." / "No. I cannot."* Two lines, and §12.8 becomes live |
| **W-9** | `ch6_stone` · **why exactly every other cut burned** | Cuts 1, 3, 5, 7 — alternating. A table says "that is not an accident" in five seconds and has no way to settle it | One Seer clause: the fire sat in the middle of a ring of eight, so it took every other one |
| **W-10** | `ch7_tokens` · **how Vane knows each player's first name** | §12.34. The letter is personalised and the fiction never accounts for it — the only accidental fourth-wall break in the game | One clause: *"He has had a list of you since the Hall."* It also makes him worse, which is free |
| **W-11** | `ch7_decision` · **"the ring has been ready for fourteen years"** | §12.22. "Ready" implies work on a four-hundred-year-old floor and nobody asks | One clause: *"I had it swept, and I have not let anybody stand in it since."* |

## 4.3 The theories that are *correctly* unresolved

These are unanswered and should stay unanswered, because the player has a basis and the not-knowing
is the pleasure:

- **Is the Cold aware?** (§12.2) One line — "It knows. It always knows when somebody kneels here" —
  against a chapter of behaviour, plus a mimic mechanic that pretends to be a bell, plus an Ember that
  leans toward the hand holding it. Correctly poised, and the best available answer (it knows because
  Wren is standing there) is reachable by the table.
- **Did the Founders come back out?** (H-AFTER, §12.15) Mere signs "after"; the portraits mutter "four
  going down and four coming back"; the stone says "the fire is the hollow they left." Three sources,
  two private, in tension. This is a model unresolved question.
- **Who was never asked?** (§12.4) Mere's sheet, Mere's hidden door "for people who were not asked",
  and five arches in a drowned hall where everything else is four. Three plants, one implication,
  no answer. **This is the best unlicensed theory in the game** and should stay that way.
- **What Wren *is*, mechanically.** (§12.5) The identification is total and the mechanism is absent.
  Correct — a mechanism would shrink it.
- **Whether "four went down" means the Founders or the players.** (§12.56) Both. Never say so.
- **What "the last of it" is**, between `ch6_held` and `ch6_open`. Forty minutes of productive
  ambiguity, correctly resolved.

## 4.4 The theory the span raises and never touches

**H-MADE — somebody put Wren there on purpose.** By `ch7_attune` the player knows that Wren's name is
cut into a floor four hundred years old, and has known since the Prologue that the same name was
chalked on a dormitory door a year ago, twice, in two alphabets, **in the same handwriting**
(§12.16). That is not a hunch; it is two pieces of physical evidence for design. **No character in
the game ever asks who wrote either one.** The cheapest resolution is nearly free — Marrow wrote
WRENN on the roll in the old letters in her own hand (`companion/ch4.js:203`), so she is the obvious
chalker — and it would also close §12.16. Whether the *socket* has an author is a bigger decision and
belongs to §12.5, but the game should at least let somebody say the question out loud once.

---

# 5 · THE AHA LEDGER

> *Is it earned by evidence the player actually had, and could a sharp player have got there one beat
> early? Getting there one beat early is the ideal.*

| | the aha | where the game delivers it | earned? | one beat early? | verdict |
|---|---|---|---|---|---|
| **K** | **The Cold is directly under this floor** | `ch6.js:471` — "You are standing on a lid. Under it, the Cold." | **Yes, six chapters of set-up**: ch0's "it is a place and nobody will tell you where"; the blue light in the vault; the bricked road; the Under-Marches ledge | **Yes, at `ch5_marches`**, where the Cold is visible "glowing like a sky from beneath" | **Model beat.** The one payoff in the game that is over-prepared and lands anyway |
| **L** | **Marrow can hold it but cannot close it; the last step is not hers** | `ch6.js:629` | **Yes** — she has been visibly working alone for twenty minutes having said "I can close this wound" | **Yes, with one clause at `ch6_marrow`** — "and I have one pair of hands." As shipped, no: "four hands" was framed as a bell fact | **Fixable for five words.** The best value-per-word change in T8 |
| **M** | **Wren has known all night, and about Marrow since the laundry** | `ch6.js:689` | **Yes, richly** — Wren has been steering the table's protocol since ch0 and named all four anomalies before anyone spoke | **Yes, two chapters early**, for a table that noticed Wren *asking* the four questions in ch3 rather than answering them | **Model beat** |
| **N** | **Marrow loves Wren and raised Wren to be spent — both, and she has never let them be two things** | `ch6.js:691-692` | **Yes, over-earned**: the journal, the grey thread, "Who did —", the one face not watching the fire in ch1 | **Yes, two chapters early** (Act II's aha D) — and the game *acknowledges* the early arrivers by having Wren give her permission rather than exposing her | **Best-staged aha in the game** |
| **O** | **The prophecy reads the other way: four, as one** | `ch6.js:827` | **Yes, three times over** (Act II aha B): the Reader's ch2 fine print, Mere's strip, Wren's question at the tapestry | **Yes, four chapters early** for some tables — **and they are not acknowledged**, which is the same defect Act II flagged | **Variance problem.** One conditional Marrow line — *"Some of you have known this since the vault"* — pays the best-prepared tables, who currently get less than ignorant ones |
| **P** | **THE FIRE IS THE FOUNDERS** | `ch6.js:839` — narration, one clause, once | **NO — [UNEARNED] as of entry to my span.** Act II's audit is right: nothing in ch2–ch5 licenses it, and two pieces of evidence argue *against* it (the portraits' "four coming back"; Mere's "after"). In my span the only prior plant is the art's blue core in the shaft, which nobody reads | **Not at present, at any price short of new material.** With Act II's five proposed plants it becomes gettable at `ch6_tieoff` — "one of them called it; three of them rang", four bells, four thrones, four names over a fire | **The game's central reveal is its least earned.** Every fix is upstream of my span; see §5.1 |
| **Q** | **Why the fire is dying: four people's worth of fire, four hundred years to spend it in** | `ch6.js:850` | **Yes, once P lands** — it is arithmetic on top of P, and it is stated in the plainest sentence in the game | **Only in the same breath as P.** It cannot arrive early because P does not | **Correct placement, hostage to P** |
| **R** | **212 refused to pay four Masters' Sight and called it grammar** | `companion/ch6.js:286-287` — **the Binder's Book, one phone, behind an opt-in "reveal" control** | **Yes as inference** (the derangement, the bricked road, the strike-rather-than-amend, Law 3), **no as statement** — the *price* has never been named anywhere before this card | **Yes, at `ch2_door`**, for a Binder who reasoned from Law 3 (Act II aha G). But the *motive* — "they would not pay it" — is new here and lands on one screen | **The game's political centre is on one player's phone behind a tap.** The Binder may not read it aloud. **[PROPOSED]** one Marrow line at `ch6_open`: she already says the same thing at `ch7.js:396` on a branch |
| **S** | **Vane was exiled for telling this truth twenty-two years ago** | `ch7.js:341` | **NO — [UNEARNED].** Nothing in ch0–ch6 says he was punished. The player has "I have seen what is under the paint" and "So he had" | **Not as shipped. Yes, for free**, if the Binder ever reads the two threads the art already draws on him (`scenes-ch7.js:83`): red inward at the school, gold outward at his soldiers | **Best-value repair in T9.** The picture is shipped; only the reading is missing |
| **T** | **Wren is the eighth glyph — the empty socket, the word that is never written** | `ch7.js:695-699` | **YES — the best-earned reveal in the game.** Seven independent pieces, four of them on the Reader's own pages, one of them handed over one beat earlier | **Yes, one beat early** (the Reader's `ch7_attune` page) **and two beats early** (joining COLD's gloss to WRENN's at `ch6_strip`) **and even four beats early** (the same join at the Second Asking) | **Model aha, and the game says so**: "Nothing here looks surprised." That clause should be the template for every other reveal in the game |
| **U** | **Law 8 + Law 0 + Law 3 determine the ending before the ring closes** | never stated; derivable at `ch7_sigil` | **Yes — the Binder holds all four Laws on one page** | **Yes, one beat early, by reasoning** | **Available and unacknowledged.** One conditional line at `ch7_cold_slot` would pay it |
| **V** | **Walking spends the Sighting permanently, and you come back** | `ch8.js:287`, after it is paid; four private phone lines before | **Yes privately, no publicly.** See W-3 | **Yes, privately, at `ch7_attune`** — each player alone | **Deliberate or not, decide and record it** |
| **W** | **The route of the night is the glyph KNOT** | `ch8.js:436` | **Yes retroactively** — they walked it; the map has been open all night; KNOT glosses "four-as-one" | **No, and correctly not.** A closing flourish, not a withheld clue | **Model closing beat.** Do not plant for it |
| **X** | **The seven chapter words are every writeable glyph, and the eighth is Wren** | `ch8.js:493-499` | **Yes** — the words were typed one per chapter by the players themselves | **Theoretically yes** for a Listener who counted the Ladder; practically no | **Good.** And its Prologue half (the lamp flaring blue on WREN) is unmarked at both ends — see §7 |

## 5.1 What P needs, restated for the author

Aha **P** is the game's title, its thesis, and its least earned reveal. Act II proposed five upstream
plants and I endorse all five. **Two of them can also be taken inside my span, cheaply:**

1. **`ch6_start` / `ch6_shaft` — the blue core.** The art already draws a pale-blue heart inside the
   Hearth's coin of light, every time the shaft is on screen (`scenes-ch6.js:53-54`). One Seer line
   makes it public: *"There is cold inside that fire, and there has been all night."* A fire with cold
   in it is one inference from a fire that is four people who went into the cold.
2. **`ch6_tieoff` — "one of them called it."** Five words make the Founders four individuals with
   four gifts: *"One of them heard, the way you do."* Once the Founders are four *people* rather than
   four *founders*, "the fire is only what they left behind" is a conclusion rather than a sentence.

Both are one clause, both use material already on screen, and neither spoils anything.

---

# 6 · WHERE THE PUZZLE TEACHES THE WORLD

> *The author wants puzzles that "add to players understanding of the world and mysteries."*

Five puzzles and one token beat in T8–T10. **Three teach the world outstandingly, one teaches it
outstandingly and withholds the lesson, one teaches nothing, and one teaches only the table.**

| puzzle | what it teaches about the world | grade | if the answer is thin, what it could teach for free |
|---|---|---|---|
| **`ch6_practice` + `ch6_round1`** · the pattern | That the seal is a *performance*, not a state — something has to hold the Cold off the lid while anyone works on it, and the holding is four-handed and four hundred years old. That **the Cold imitates a bell** and must be answered by keeping still. That "together means together" is physics, not sentiment | **A** | The mimicry is the best fact here and it is only on three phones. One Marrow line on the rule card: *"It will ring for you. It is very good at sounding like a bell."* |
| **`ch6_round3`** · the dark pattern | Does not describe the Founders' practice — **makes the table perform it.** One voice, three hands, no light. Four people learn by doing that "four hands" is not a figure of speech, and the Listener — the seat carrying a private fault about one heartbeat — becomes indispensable | **A+** | Nothing needed. One free clause available: "the lid under your feet stops beating" already says the Cold has a heartbeat. Let the Listener say it |
| **`ch6_strip`** · the foot of the stone | **The best puzzle in the game.** A ring has no first cut, so where a sentence begins is a *decision*; the school's mark is drawn on the board, labelled, and wrong; the Binder overturns a Law by date in public; and the start is fixed by *where the sound stops*, because the cold word has no note — which is Wren's entire condition rendered as a rule | **A+** | Two free clauses: name why the silence locates the cold word, and join *hollow* to *hollow* |
| **`ch7_tokens`** + the bargains | Teaches nothing about the world and everything about the table: Vane's code is real, silence is an answer, and a bought hand is a dead key | **B, and correctly so** | — |
| **`ch7_sigil`** · the Great Sigil | Structurally it is the whole game — two half-sentences that only mean anything together, a Founders' Law that *forces* the forbidden word, and a ring that must be turned whole if you swore to a person. **But the phrase it spells is about the table and Wren, and the table is never told what it says** | **A for structure, C for delivery** | **Print the gloss.** It exists at `ch7.js:130`. Also: name the Hymn's last beat as a rest, and **light the ring while it is being solved** (§13.50b) |
| **`ch7_binding`** | Four-as-one as a physical act with no information in it; and every earlier failure arrives as a muted lane. The best consequence-visualisation in the game | **A** | The art never draws the cracked bells it is dimming lanes for (§13.50a) |
| **`ch7_fourhands`** · writing COLD | Not a puzzle — a keypress — and the single best marriage of mechanic and fiction the game has. A struck Law is *enacted* by four hands on four keys with no phones | **A+** | Nothing. Do not touch |

**The pattern worth naming.** Every puzzle in this span that teaches well teaches the *same* thing —
that four is a requirement and not a theme — and teaches it in a different modality: rhythm, then
partition, then geometry, then a single simultaneous press. That escalation is the best structural
decision in the game and no document currently records it. It should be in `DESIGN.md`.

---

# 7 · BOREDOM AND OVERLOAD MAP

## 7.1 The curve

```
attention   ch6                                   ch7                          ch8
  high      ┌─B8.1──┐         ┌─B8.8─┐┌B8.9─B8.13┐ ┌B9.2┐  ┌B9.5┐   ┌B9.14─B9.17┐  ┌B10.6┐┌B10.7┐
            │       │         │      ││          │ │    │  │    │   │           │  │     ││     │
  mid    ───┘       └─B8.4────┘      ││          └─┘    └──┘    └─B9.11──B9.12──┘  └B10.5┘└B10.8┘
                      B8.5                B8.14   B9.4   B9.8                        B10.9
  low                 ▲sag                        ▲sag  ▲sag                    ▲sag B10.11
                                        ▲LOAD          ▲LOAD       ▲LOAD
```

## 7.2 Where attention sags

| # | where | why | what would fix it |
|---|---|---|---|
| 1 | **`ch6_ready` + `ch6_practice`** | Two consecutive instruction screens after the chapter's biggest arrival. Pure UI in a chapter that has just gone very large | One line of world on the ready screen — name the bells, or say the names are worn off them |
| 2 | **`ch7_attune`** | Ninety seconds of silent reading immediately after the Finale's best surprise (`ch7_wall`) or its biggest choice | Unavoidable. But the *content* can carry it: promote the Reader's socket line |
| 3 | **`ch7_tokens_intro`** | Two minutes on a countdown that most tables finish in forty seconds | Shorten the default, or let the Hearth fill the silence with one Wren line at 0:60 |
| 4 | **`ch8_night` → `ch8_stats`** | Three consecutive read-the-numbers screens (the eight hours, the four boxes, the seven counts) after the emotional peak has passed | `ch8_map` is correctly placed between two of them. Consider moving `ch8_stats` after `ch8_words` so the last number the table reads is not "hints" |
| 5 | **The four Second Asking screens** | Structurally identical: same art, same shape, four clicks | One art change, or one line of reaction from Marrow after the second one |

## 7.3 Where attention is swamped

| # | where | why | what would fix it |
|---|---|---|---|
| **1** | **`ch6_round3`, the dark pattern** | The hardest reflex-plus-information round in the game, immediately before the emotional centre. A failing table arrives at `ch6_held` with adrenaline and cracked bells | Nothing cheap. Do not put another instruction screen between the round and `ch6_held` — the file currently does not, which is right |
| **2** | **`ch6_strip`** | Four private facts, eight slots, a four-reading budget, a cost per miss — after a rhythm round and the chapter's confession | Correct as designed. Flag for the host guide: this is the one puzzle a three-player table cannot brute-force |
| **3** | **`ch6_open`** | **Three enormous ideas in eight lines**: four-not-one; the fire IS them; why it is dying. Any one would carry a scene | **Split it.** Put "the fire is only what they left behind" on its own screen at the chapter's lowest flame, then click through to Marrow's explanation |
| **4** | **`ch7_sigil`** | Hardest partition in the game, under a clock, at the end of a two-hour session, straight after the most exposed scene in it | Accept — but light the ring while it is being solved, so the room has feedback |
| **5** | **`ch6_attune` and `ch7_attune`** | Three tabs, ninety seconds, and in both cases the chapter's most important private line is on the *third* tab | Reorder within the tab, or have Wren prompt the seat that is holding it |

## 7.4 What the table is actually doing, chapter by chapter

| | what four people with one laptop and four phones are doing |
|---|---|
| **ch6, first half** | Phones up, then phones down, then hands on keys. Loud. Somebody has the volume too low. Somebody is counting out loud for everybody. The Warden (Binder) is not the one shouting numbers, which is good design |
| **ch6, the turn** | Phones down. Nobody touches anything for two minutes. The Voice (Listener) reads "Now, love. Walk." and stops |
| **ch6, the Asking** | Four people being looked at in turn. Real hesitation. Somebody says "I'm sorry" out loud to a fictional fourteen-year-old |
| **ch6, the stone** | Four facts, one keyboard, a lot of pointing at a screen. The best cooperative five minutes in the game |
| **ch7, the Decision** | Ten to twenty minutes of argument with no clock. Phones face-down by agreement. This is the beat people will describe afterwards |
| **ch7, the tokens** | Absolute silence, four phones, nobody looking up |
| **ch7, the Sigil** | Grim, fast, clocked, one person typing and three reading numbers |
| **ch7, four hands** | Four hands on one keyboard. Somebody counts three, two, one |
| **ch8** | Reading aloud, a paragraph each, round the table. Then four phones one last time, then four phones going white, then nobody has a phone. Then arguing about ch3 |

---

# 8 · BREADCRUMB INDEX — the cheap plants, ranked

Everything below is one clause to three sentences, uses only material already in the shipped game,
and spoils nothing.

| # | plant | where | buys |
|---|---|---|---|
| **1** | **"The Ember lights a fire. It does not close a wound."** | `ch6_marrow` | kills H-EMBER; makes the ch2 stair-fall choice mean something; removes the game's worst withholding (W-1) |
| **2** | **Join *hollow* to *hollow*** — one whisper after the stone's omen line, or one Wren aside | `ch6_strip` | turns aha **T** into a table deduction forty minutes early; pays the Reader's entire six-chapter arc |
| **3** | **Print the Great Sigil's gloss** — it exists at `ch7.js:130` | `ch7_sigil` `solvedText` | the span's largest withheld payoff (§12.24); one line already written |
| **4** | **"One of them heard, the way you do."** | `ch6_tieoff` | makes the Founders four people with four gifts; answers §12.7 and half of §12.38; the only in-span road to aha **P** |
| **5** | **"and I have one pair of hands"** | `ch6_marrow` | makes `ch6_held` a confirmation instead of a surprise — aha **L**, one beat early |
| **6** | **The Binder reads Vane's two threads** (the art already draws them, `scenes-ch7.js:83`) | `ch1` or `ch7_vane` | earns aha **S**; makes the biggest choice in the Finale a deduction |
| **7** | **"There is cold inside that fire, and there has been all night."** | `ch6_start`, the Seer | the only public evidence for aha **P** available in my span |
| **8** | **"Blue. Nothing else in this room burns blue."** | `ch0_carve` (upstream) | closes the two-hour lock that `ch8_words` already tries to close; §12.47 |
| **9** | **"'Back.' You keep saying back."** | `ch6_iknow`, Wren | puts §12.5(a) — the hollow came out of the fire — into the room in three words |
| **10** | **"It will ring for you. It is very good at sounding like a bell."** | `ch6_practice` rule card | free cosmology; makes H-SENTIENT a table theory instead of an author's note |
| **11** | **"The Founders made the lid. They hung the bells before they went down."** | `ch6_start` or `ch6_marrow` | W-6; §12.19, §12.20, half of §12.38 |
| **12** | **"Grey, and then not grey. That is what a spent Sight looks like."** | `ch6_tieoff`, `VOLUNTEER` branch | W-2; makes `ch8.js:287` a payoff |
| **13** | **"Some of you have known this since the vault."** | `ch6_strip`, conditional | pays tables that found Mere's strip; fixes Act II's aha **B** variance |
| **14** | **"The Binder said this ten minutes ago and nobody argued."** | `ch7_cold_slot`, conditional on the Sigil closing first time | acknowledges aha **U** |
| **15** | **"Nobody repaints down here."** | `ch7_start`, Wren | §12.50, in four words |
| **16** | **"Then it will have to be somebody."** | `ch7_dec_refuse`, Marrow | stops "Nobody walks" feeling overridden |
| **17** | **"You cannot know that." / "No. I cannot."** | `ch7_argue1` | W-8; opens §12.8, the game's richest unexploited date |
| **18** | **"Provost Marrow looks at him for the first time all night."** | `ch7_wall`, after "I scraped it myself, as a girl" is also available | §12.23; two people who scraped the same paint, in one room |
| **19** | **"He says something to his captain. The soldiers sit down on the stair."** | `ch7_wall` | W-4 |
| **20** | **"There is nothing under it any more."** | `ch8_e0` | closes the one place the player's model and the game's diverge at the ending |
| **21** | **"Provost Marrow is on her knees in the chalk with both hands over her mouth."** | `ch7_ending` E0 | W-5, in one sentence |
| **22** | **One socket line on E2** — "a word cut in it, in letters older than the school. Nobody reads it." | `ch8_e2` | gives the Sealing the meaning of "I'll stand in the bit that isn't written" |
| **23** | **"He has had a list of you since the Hall."** | `ch7_tokens_intro` | W-10; makes Vane worse for free |
| **24** | **"I had it swept, and I have not let anybody stand in it since."** | `ch7_decision` | W-11 |
| **25** | **"It has a heartbeat. The floor does. Wren does not."** | `ch6_round3` solvedText, the Listener | free, devastating, uses only shipped prose; retro-justifies §12.49 |
| **26** | **"The word on the rim is WELL. Down. Somebody labelled the hatch."** | `ch6_attune`, the Reader | one dry joke, and it makes the Founders people who labelled things |
| **27** | **"Four letters, not five. The fire has always spelled it wrong."** | `ch7_wren_code` | makes §13.5 diegetic instead of a bug |
| **28** | **"Four bells, and the names worn off the rims. Only the numbers are left."** | `ch6_ready` | converts a UI screen into evidence; rhymes exactly with ch2's numbered plinths |
| **29** | **"I know all four answers. I want to hear them."** | `ch6_held`, Wren | stops the Second Asking reading as a quiz |
| **30** | **"That was the third asking."** | `ch7_cold_slot` or the E0 letters | keeps the promise Wren makes at `ch6.js:863` |

---

# 9 · THE TEN CHANGES THAT WOULD MOST IMPROVE T8–T10

Ordered by (value to the reader's experience) ÷ (cost to write).

1. **Kill H-EMBER with one Marrow clause at `ch6_marrow`.** The game's largest withholding, and the
   one moment where it visibly fails to hear its own players. (§4.2 W-1; breadcrumb 1)
2. **Fix `ECHO.binder` (`ch6.js:327`) to `'DONTKNOW'`.** As shipped, a Binder who told the truth in
   the laundry is given the cold callback and scored untruthful by the Epilogue, **in public, on the
   game's most emotional beat.** `lore.js:44` is canonical. (§13.21)
3. **Print the Great Sigil's gloss.** One `solvedText` line, already written at `ch7.js:130`. The
   table solves an eight-word sentence about itself and is never told what it says. (§12.24)
4. **Join *hollow* to *hollow* at `ch6_strip`.** One clause turns the game's best-earned reveal into a
   table deduction forty minutes early — the author's stated ideal. (breadcrumb 2)
5. **Put Marrow in ENDING 0.** One sentence at `ch7_ending`, or one letter on the E0 phones. The
   woman whose fourteen-year plan was just superseded in front of her is absent from the ending the
   game is built for. (§12.30, W-5)
6. **Split `ch6_open` into two screens.** Three enormous ideas in eight lines; the one most often
   missed is the game's title. (§7.3 #3)
7. **Earn Vane's twenty-two years.** Let the Binder read the two threads the art already draws on him.
   The Finale's highest-leverage choice currently rests on a hunch. (aha **S**; breadcrumb 6)
8. **Light the ring while the Great Sigil is being solved.** `ch7_ring` only receives `lit` from
   `ch7_end` (§13.50b): for the whole eight-glyph climax, placing a glyph changes nothing in the room.
9. **Fix ch8's two miscounts**: "Four clues in the bell-chamber… **You caught** {n}" → ch6's framing
   ("you gave Wren N of the four answers Wren already had"), and "**Twice** tonight, each of you chose
   alone" → three. (§13.40, §13.41)
10. **Fix "Wren, who once called someone Mum by accident."** Two hours after `ch6.js:689` — "And —
    **Mum.** I know." — the table will catch it, on an emotional beat, on ENDING 3. (§13.13)

**Honourable mentions, all one line:** the E2 socket line (breadcrumb 22); "Nobody walks" being
foreshadowed at `ch7_dec_refuse` (16); the Prologue's blue flare marked at both ends (8); naming
*grey* once (12); "the lid stops beating" said by the Listener (25).

---

## APPENDIX — beat index for this span

| beat | scene id | kind | branch |
|---|---|---|---|
| B8.1 | `ch6_start` | scene | `STAIR` · `VOLUNTEER` |
| B8.2 | `ch6_marrow` | scene | — |
| B8.3 | `ch6_attune` | code (WELL) | `VOLUNTEER` · `PRECRACKED` · `LAW0` (display) |
| B8.4 | `ch6_ready` | custom | `VOLUNTEER` |
| B8.5 | `ch6_practice` | puzzle · reaction | — |
| B8.6 | `ch6_round1` | puzzle · reaction | `VOLUNTEER` · `SLOW_BELLS` |
| B8.7 | `ch6_tieoff` | scene | `VOLUNTEER` |
| B8.8 | `ch6_round3` | puzzle · reaction | `SLOW_BELLS` |
| B8.9 | `ch6_held` | scene · **the pivot** | `BELLS_CRACKED` |
| B8.10–13 | `ch6_ask_owl` · `ch6_ask_hush` · `ch6_ask_bookmoth` · `ch6_ask_knot` | choice ×4 | `WHISPER_*` |
| B8.14 | `ch6_iknow` | scene | `CLUES` |
| B8.15 | `ch6_stone` | scene | — |
| B8.16 | `ch6_strip` | puzzle · ring | `STONE_MISREAD` → `STONE_TOLD` · sets `WALK_UNLOCKED`, `LAW0` |
| B8.17 | `ch6_open` | scene | `STONE_TOLD` |
| B8.18 | `ch6_flow` | flow | — |
| B9.1 | `ch7_start` | scene | `ORIEL` · `SOLDIERS` · `STAIR` · `SORREL` · `VOTE_LOST` |
| B9.2 | `ch7_vane` | choice | `VANE_ACCEPT` |
| B9.3 | `ch7_wall` | scene | sets `VANE_ALLY` · reads `TAPESTRY` |
| B9.4 | `ch7_attune` | code (CROWN) | freezes `CAST_FLAGS_CROWN` |
| B9.5 | `ch7_decision` | choice | `WALK_UNLOCKED` · `VANE_ALLY` |
| B9.6 | `ch7_argue1` | choice | `OATH_KNOT` only · `TAPESTRY` · `LETTER_READ` |
| B9.7 | `ch7_dec_fourfold` · `_walk` · `_refuse` · `_vane` | scene ×4 | `DECISION` |
| B9.8 | `ch7_tokens_intro` · `ch7_tokens` | custom · token | `finaleValues()` |
| B9.9 | `ch7_bargain_<role>` ×4 | choice ×4, 15 s | `BARGAIN_*` = accepted |
| B9.10 | `ch7_bargains_done` | scene | `kept ≥ 2` → E4 |
| B9.11 | `ch7_sigil` | puzzle · ring, clocked | `OATH_KNOT` · `WALK_UNLOCKED` · `STONE_TOLD` |
| B9.12 | `ch7_binding` | puzzle · binding | `BELLS_CRACKED` · `kept` |
| B9.13 | `ch7_cold` | custom | midnight only |
| B9.14 | `ch7_cold_slot` | scene | E0 path only |
| B9.15 | `ch7_wren_code` | code (WREN) | E0 path only |
| B9.16 | `ch7_fourhands` | custom | E0 path only |
| B9.17 | `ch7_white` | scene | E0 path only |
| B9.18 | `ch7_ending` | scene | `ENDING` 0–4 |
| B9.19 | `ch7_flow` | flow | — |
| B10.1 | `ch8_start` | scene | `ENDING` |
| B10.2 | `ch8_e0` | scene | E0 |
| B10.3 | `ch8_years` | scene | E0 · `WREN_TRUST` |
| B10.4 | `ch8_e1` · `ch8_e2` · `ch8_e3` · `ch8_e4` | scene ×4 | E1–E4 |
| B10.5 | `ch8_night` | custom | visited-set |
| B10.6 | `ch8_unseal` · `ch8_unsealed` | choice · custom | `WHISPER_*` · `WALK_*` · `BARGAIN_*` |
| B10.7 | `ch8_map` | custom | visited-set |
| B10.8 | `ch8_stats` | custom | `CLUES` · `TRUTHS` · `BELLS_CRACKED` · `STONE_MISREAD`+`SIGIL_COLD` · `hintsTotal` · `MIDNIGHT_LEFT` |
| B10.9 | `ch8_words` | custom | — |
| B10.10 | `ch8_code` | code (WREN) | skipped on E0 when `WREN_SHOWN` |
| B10.11 | `ch8_flow` · `ch8_end` | flow · end | `ENDING` |
