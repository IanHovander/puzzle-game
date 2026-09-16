# CANON — *What the Fire Keeps*

> ## ⚠ TOTAL SPOILERS
> This document contains every reveal in the game, including the Prologue's, the Finale's and all five
> endings. It is written for the author and collaborators. Do not show it to a player, a host, or
> anyone who has not finished. It supersedes `docs/DESIGN.md` wherever the two disagree, because it was
> built by reading the shipped source; `DESIGN.md` is stale in at least thirty documented places (§13.6).

**What this document is.** The ground truth of the world: what is *actually* true, whether or not any
character, any player, or the narration knows it. Every claim carries a file-and-line citation.
Where the shipped game only has a character *say* a thing, the row says **CLAIMED BY** and names them.
Where a fact exists only on one branch, the row carries its flag. Where I have inferred rather than
read, the row is marked **[PROPOSED]** and the author may accept or reject it.

**What this document is not.** It is not who-believes-what — that is `EPISTEMICS.md`. It is not what
the player is led to think — that is `PLAYER-MODEL.md`. Self-image, misperception and the characters'
models of each other are *deliberately excluded here*; where a character is wrong, this document says
what is true and sends the error to `EPISTEMICS.md`. It is also not a design doc: puzzle economies,
hint ladders and timers appear only where they are load-bearing on fiction.

**Epistemic tiers used throughout.**

| tier | meaning | reliability |
|---|---|---|
| **NARRATION** | the Hearth's unattributed prose, a mechanic, or the art | ground truth |
| **PHONE (role)** | a Companion page's factual block — a Sighting perceiving | true *as perception*, private to one seat |
| **BELIEF (role)** | a Companion line of the form "You decided…" | evidence of belief only → `EPISTEMICS.md` |
| **CLAIMED BY X** | a character speaks or writes it | evidence of intent/belief; may be true |
| **DOCUMENT** | an in-world text (the Book of Laws, Mere's sheet, a writ, a journal) | what a body or person wrote, not automatically true |
| **[PROPOSED]** | my inference, not in the source | author to rule |

---

## 2. THE SHORT TRUTH — 185 words

Four hundred years ago four people stood at a wound in the world and wrote the cold glyph with four
hands — a thing only four hands can do. They went down into it together, closed it, and came back
**grey**: their Sight spent. What they left on top of the wound is the Hearth, and the Hearth is
*them*. Four people's worth of fire, four hundred years to spend it in. That is why it is dying;
nobody did anything wrong.

Two hundred and twelve years later the seal failed. Paying it again meant four Masters giving up
their Sight. The Convocation would not pay it. It struck Law 0, called it grammar, sent one Warden
down alone, rebuilt the vault, turned the statues, bricked the road, painted one figure over four, and
taught the school to read *one born of four* on a stone that says *four, as one*.

Fourteen years ago the fire guttered for one night and left a child on the stones. Wren is the
hollow — the eighth glyph, the word that is never written.

The four can write it.

---

## 3. THE WORLD

### 3.1 Thornhallow, the school

| fact | tier | cite |
|---|---|---|
| The school is called **Thornhallow** | NARRATION | `js/content/lore.js:23` (ch6 title *The Bells of Thornhallow*); `js/content/ch8.js:274`, `:321`, `:345` |
| It is **never named to the player before ch6's title card** | NARRATION (absence) | grep: no "Thornhallow" in ch0–ch5 prose |
| Its silhouette is **three towers** — one great, two lesser | ART | `js/art/scenes-ch8.js:114` |
| Only one tower is ever entered (the Bell Tower); the title screen draws only the central one | ART | `js/art/art.js:62` |
| It sits on mountains, with fog and a dawn horizon | ART | `js/art/scenes-ch8.js:108-116` |
| It is **four hundred years old** — the same age as the Hearth and the Founders | NARRATION | `js/content/ch0.js:49`, `:61` |
| It teaches children with Sightings; they are "fourth-years" at fourteen | NARRATION | `js/content/ch0.js:54`; `companion/ch0.js:99`; `ch8.js:345` |
| It keeps records; the dormitory lamp is "older than any record the school keeps" | NARRATION | `js/content/ch0.js:78` — see §13.9 |
| Its constitutional habit: **"Four hands is how this school does anything that matters."** | NARRATION | `js/content/ch0.js:88` |
| It does not hand children to a writ; it hands them to a vote | CLAIMED BY Marrow | `js/content/ch1.js:146` |
| It teaches the Order's translation of the prophecy to every child, and every adult argues about it | NARRATION | `js/content/ch0.js:62` |
| It drills the Founders' Door count wrongly ("one, two, three, four") and has since the floor was laid | NARRATION | `js/content/ch2.js:119`; PHONE (Binder) `companion/ch2.js:158` |
| It maintains the overpaint: Oriel scraped it as a girl and "they painted it back inside the week" | DOCUMENT (Oriel's note) | `js/content/ch4.js:588` |
| Rooms established: dormitory, Great Hall + dais, Masters' door, gallery of ~200 portraits, laundry, porter's lodge, corridors A1–E5, Provost's study, Bell Tower, bell-chamber, and below all of it the antechamber, the Ember Vault, the Long Stair, the Under-Marches | NARRATION | `ch0.js:77`; `ch1.js:112`; `ch3.js:121`, `:440`, `:500`; `companion/ch3.js:239`; `ch4.js:328`; `ch6.js:469`; `ch2.js:201-208`, `:284`; `ch5.js:263`, `:345` |
| The route of the night, in order: dormitory → Great Hall → Vault → Gallery → study → Long Stair → bell-chamber → the Cold → dawn. Traced on the Map, **it is the glyph KNOT** | NARRATION | `js/content/ch8.js:142-163`, `:429-444`; `js/core/map.js:29-37` |

### 3.2 The Order

| fact | tier | cite |
|---|---|---|
| The post-Founders authority. Era code `'O'` in the Book of Laws; "the Order that came after" | DOCUMENT / NARRATION | `js/content/lore.js:9`, `:55` |
| It legislated in exactly **two** years: **212** (Laws 6, 9, 11) and **340** (Law 4) | DOCUMENT | `lore.js:62`, `:64`, `:66`, `:67` |
| **The prophecy translation on the stone is the Order's**, and the game says so in a variable name and an on-screen caption | NARRATION | `lore.js:75` (`L.prophecyOrder`); art caption `THE ORDER'S READING` at `js/art/scenes-ch0.js:78` |
| Its overpaint — one figure walking into a fire alone — hangs **in every hall** of the school | NARRATION | `js/content/ch4.js:533`; art `js/art/scenes-ch4.js:65-75` |
| It polices the overpaint: a scrape was repainted "inside the week" | DOCUMENT | `ch4.js:588` |
| It sent Vane away "to learn manners" when he told the Hall what was under the paint, 22 years ago | CLAIMED BY Vane | `js/content/ch7.js:341` |
| Its legislative character: all three 212 Laws collapse a two-case Founders' rule into one universal case | DOCUMENT (derived from its own texts) | `lore.js:62` vs `:61`; `:66` vs `:65`; `:67` vs `:57` |
| Its 340 Law ends "**The one you swear to cannot tell the difference**" — a legislated permission to appear more bound than you are | DOCUMENT | `lore.js:64` |
| **Whether the Order *is* the Convocation is never settled.** `lore.js:55` calls era O "Order"; `lore.js:57` says the *Convocation* struck Law 0 in 212; `companion/ch6.js:233` labels Law 6 "the Convocation's" | — | §12.3 |
| The word "Order" never appears in ch2's or ch3's prose at all | NARRATION (absence) | grep over `ch2.js`, `ch3.js` |

### 3.3 The Convocation — the nine Masters

| fact | tier | cite |
|---|---|---|
| "the nine of us — the Convocation" | CLAIMED BY Sorrel | `js/content/ch1.js:255` |
| Nine seats, nine banners, nine Houses, one Master each; seat 9 is the Chair | NARRATION | `ch1.js:112`; `ch1.js:34-36` |
| **The Chair counts; it does not hear cases** | NARRATION (rule card) | `ch1.js:69`, `:74` |
| A vote is called once and the hall does not count twice | NARRATION | `ch1.js:240` |
| Five of nine keeps the child | NARRATION (rule card, read out by the Chair) | `ch1.js:181` |
| A House that knows its vote files in writing before the doors shut; filing nothing means SEND unless asked | PHONE (Reader) | `companion/ch1.js:91`, `:97` |
| It **struck Law 0 in Year 212** | DOCUMENT | `lore.js:57` note |
| It "would not pay" four Masters' Sight, "struck the Law and called it grammar", and "sent one Warden down instead" | DOCUMENT (the Binder's Book, ch6 reveal) | `companion/ch6.js:286-287` |
| It holds its own writ, distinct from and weaker than the Crown's — but strong enough that a Crown captain will not fight it | CLAIMED BY the captain | `ch3.js:404` |
| Marrow has **never named the thing below to the nine** | DOCUMENT (her unsent letter) — branch `!ORIEL && !SORREL && !VANE_ACCEPT` | `ch4.js:592` |
| It never reappears after ch7. Whether Law 0's restoration is accepted on the record is never said | NARRATION (absence) | §12.30 |

### 3.4 The nine Houses

The canonical table lives in **the art file**, `js/art/scenes-ch1.js:8-18`, and is duplicated
byte-for-byte for the phones at `js/content/companion/ch1.js:11-21`. `js/content/ch1.js:5` reads it
from `window.VigilArt.ch1`.

| seat | House | colour | emblem | Master | mechanical state in the ch1 vote | named to the player? |
|---|---|---|---|---|---|---|
| 1 | Harrowden | `#3f7a4a` green | chevron | **Sorrel** (she) | persuadable; head of a sworn thread | yes, win path only (`ch1.js:254`) |
| 2 | Ossery | `#8c93a6` grey | crescent | Quill (he) | `FOLLOWS.quill='sorrel'` | no |
| 3 | Dunmere | `#4a5f8a` blue | tower | Brack (him) | `PLEDGED` — filed "with the Chair" | no |
| 4 | Fellwood | `#2f5a3a` green | tree | Hallan (his) | `DEAF` + `FOLLOWS.hallan='orrin'`; cousins | no |
| 5 | Goldmarch | `#b8892e` gold | sun | Vey | `BOUGHT` — Crown coin under the cushion | no |
| 6 | Redmoor | `#8a2f2f` red | wave | Orrin | `BLOCKED` — an Envoy soldier behind the chair | no |
| 7 | Sable | `#5a3f8a` violet | stars | **Oriel** (she) | persuadable; no thread | yes, win path only |
| 8 | Wyeburn | `#8a6a3a` brown | key | Tarn | `BOUGHT` — coin in the sleeve | no |
| 9 | — | `#2a2434` | **CROWN (a true glyph)** | **Ilsabet Marrow**, the Chair | `PLEDGED`, `locked` | yes |

- Seats run **sunwise from the Chair**; physically 1–4 hang on the left wall, 5–8 on the right, the
  Chair's banner centrally over the Hearth — `js/art/scenes-ch1.js:6`, `:50-53`.
- The Hearth's seat tiles print **number + banner + House name**, never a Master's name; the phone is
  explicitly forbidden to list them as people — `ch1.js:73`; `companion/ch1.js:10`.
- **Six of the nine Masters are never named to the player at all**, and Sorrel and Oriel only on the
  win path. A `VOTE_LOST` table leaves Chapter I knowing no Master's name but Marrow's.
- Ground truth of the vote (`tally()`, `ch1.js:51-58`): base KEEP = {Marrow 9, Brack 3} = 2; cap is
  two asks; of 28 askable pairs **exactly one** reaches five — `{Sorrel, Oriel}` (Sorrel carries Quill).
  Brute-forced in-file at `ch1.js:43-49`.
- Every Master has a Sighting of their own — asserted once, never used. `ch0.js:242`.

### 3.5 The Crown

| fact | tier | cite |
|---|---|---|
| A male monarch, "His Majesty", offstage all game | CLAIMED BY Vane | `ch1.js:136`, `:241` |
| Its Envoy is **Lord Cassian Vane**, carrying a writ with a saucer-sized seal | NARRATION | `ch1.js:135` |
| It buys Masters with Crown-struck coin: seat 5's cushion, seat 8's sleeve | PHONE (Seer) | `companion/ch1.js:125-126` |
| It buys the porter with "new Crown gold, straight to the Envoy" | PHONE (Binder) | `companion/ch3.js:239` |
| **Gold is the Crown's thread colour** — coin or favour | NARRATION (world table) | `lore.js:9`; `companion/book.js:131` |
| It can create Masters by fiat | CLAIMED BY Vane | `ch1.js:282`; delivered on ENDING 4, `ch8.js:356` |
| Its stated aim: **"The Crown will have the Cold open, one way or another."** | CLAIMED BY Vane, recovered by the memory-bell | `companion/ch4.js:213` |
| On ENDING 4 it achieves exactly that: the Cold feeds the Crown's engines; "The Cold is open for business"; the school is a garrison by spring; each of the four's Sightings is *registered* and posted to "the Cold-works" | NARRATION / DOCUMENT | `ch8.js:355-356`; `companion/ch8.js:207-208`, `:291` |
| On ENDING 4 the Binder's Book reads "**STRUCK, AGAIN — The Crown struck it. The Crown does not need Laws.**" | DOCUMENT | `companion/ch8.js:309` |
| Vane's wax seal is `#8a2f2f`, **exactly Redmoor's House colour** | ART | `js/art/scenes-ch1.js:117` vs `:14` — see §12.35 |

### 3.6 The Marches, and the Under-Marches

| fact | tier | cite |
|---|---|---|
| "the Marches beyond" — the country past the school, drawn as mountains | ART (comment) | `js/art/scenes-ch8.js:52` |
| **The Under-Marches** — the world under the school: a cavern with no far side, drowned arches in black water (the First Hall), four empty thrones on a shelf above them, and under everything the Cold | NARRATION | `js/content/ch5.js:345-348` |
| It is an **inverted sky**: a cold "sun" is a radial gradient anchored at the *bottom* centre; forty cold-blue stars are painted on the cavern *roof* | ART | `js/art/scenes-ch5.js:69-70` |
| The shipped Map names the principle: "**THE UNDER-MARCHES — the world is a lid**" | NARRATION | `js/core/map.js:78` |
| The drowned First Hall has **five** arches — the one un-four number underground | ART | `js/art/scenes-ch5.js:64` — see §12.26 |
| The four thrones sit **above** the waterline; their backs are drawn as crowns | ART | `js/art/scenes-ch5.js:66-67` |
| Below the school and above the Under-Marches are its foundations: six giant tapering blocks, visibly older than the stair | ART | `js/art/scenes-ch5.js:49` |
| **The Founders' road** continues past a bricked arch stamped **212**; the road down to the bell-chamber is "wider than the stair, and older" | NARRATION / ART | `ch2.js:346`; `js/art/scenes-ch2.js:100`; `ch5.js:602`; `ch7.js:304` ("the old road") |
| Whether "the Marches" and "the Under-Marches" are one toponym is never established in prose | — | §12.36 |

---

## 4. THE COLD

### 4.1 What the game commits to

| # | fact | tier | cite |
|---|---|---|---|
| C1 | It is **a wound in the world**. The phrase is the narration's, in the first four lines of the game. | NARRATION | `ch0.js:49` |
| C2 | Its glyph's gloss is "the cold; **the wound**; the space left when warmth goes; **a hollow**" | NARRATION (world table) | `js/content/glyphs.js:18` |
| C3 | **It is a place**, not weather. "You cannot walk into weather. The Cold is a place, and nobody will tell you where." | NARRATION | `ch0.js:64` |
| C4 | It is **under the school**, directly beneath a riveted iron lid in the bell-chamber. "You are standing on a lid. Under it, the Cold." | NARRATION | `ch6.js:470-471` |
| C5 | Seen from the Under-Marches ledge it lies under everything, "**glowing like a sky from beneath**" — and *even in sight of it* "nobody would say where it was" | NARRATION | `ch5.js:348` |
| C6 | **Its light always comes from below.** Every cold gradient in the game is bottom-anchored. | ART | `js/art/scenes-ch2.js:59`; `scenes-ch5.js:8-11`, `:69`; `scenes-ch6.js:155`; `scenes-ch7.js:8-14` |
| C7 | **The Hearth and the Cold are the same object in two palettes** — one function, `fire(x, base, scale, blue)`; orange `#ff9a3c`/`#ffe08a` vs cold `#4fb3bf`/`#a8e6ee` | ART | `js/art/scenes-ch0.js:7-8` |
| C8 | It **pushes**. While Marrow works it pushes at the lid; frost blooms out of the rivets; the bells hum with it; missing the holding pattern lets it push further | NARRATION + CLAIMED BY Marrow | `ch6.js:485`, `:487-488` |
| C9 | It can be **closed by degrees**. Five endings are five seal strengths (§11). | NARRATION | `ch8.js:255`, `:286`, `:331`, `:342`, `:355` |
| C10 | **Walking into it permanently spends the walker's Sighting** — and that is what the Founders did. "You come out of it the way the Founders came out: grey-eyed and ordinary." | NARRATION | `ch8.js:287`; `ch7.js:757`, `:763`; PHONE `companion/ch8.js:148` |
| C11 | It is **enterable through the Hearth**: "She puts her hand on the fire, and it opens like a door" (E3); "The fire takes the shape of a door, and Wren goes through" (E2) | NARRATION | `ch8.js:341`; `ch7.js:769` |
| C12 | It can be **industrially harnessed**: pipes, engines, a schedule, "open for business" | NARRATION (E4) | `ch8.js:355`; `companion/ch8.js:208`; art `js/art/scenes-ch8.js:76-90` |
| C13 | Things of the Cold have **no heartbeat and no thread**. The Cold Ember: trace drawn flat; "a stone, and stones are not bound". So does Wren. | PHONE (Listener, Binder) | `companion/ch2.js:134-135`, `:165-166` |
| C14 | The Cold Ember **leans, very slightly, toward whoever is holding it**, and numbs hands to the wrist | NARRATION | `ch2.js:338` |
| C15 | **Wren is the Cold, or of it.** "It's cold in here. Obviously. **It's me.**" Wren is the only figure in the game edge-lit in `#4fb3bf`. | CLAIMED BY Wren + ART | `ch7.js:697`; `js/art/scenes-ch7.js:87`, `:102`; `scenes-ch8.js:87` |
| C16 | Writing COLD, physically, is **an inverted flame** — and when the four write it at the climax it appears at architectural scale, *warm-coloured*, in the empty socket | NARRATION + ART | `ch7.js:740`; `js/art/scenes-ch7.js:125-126` |
| C17 | The white at the end of ENDING 0 **is the COLD glyph**, filling the frame, with four people standing inside it | ART | `js/art/scenes-ch7.js:133-138` |

### 4.2 The ruling

**The Cold is the hollow the Founders' fire is keeping shut: an open place in the world, under
Thornhallow, of the same substance as the Hearth and of opposite sign.** It is warmth's negative —
the same fire drawn cold. It is not a creature and it is not weather; it is a *wound*, and a wound is
a shape, which is why the glyph for it is a shape and why the glyph glosses as "a hollow." Closing it
is writing over it; the writing takes four hands; the ink is Sight. What comes back out of it comes
back grey.

**Wren is the hollow with a person's shape.** The Cold's own glyph, COLD, is the one glyph that has
no ladder step and no pitch (`glyphs.js:18`, `:29`) — it makes no sound; and WRENN, the name Marrow
wrote on the Vigil roll in the old letters, means "the hollow of a bell — the space inside it that
makes the sound" (`companion/ch4.js:202-204`; `companion/book.js:75`). The eighth card of the
Epilogue is the COLD glyph captioned **WREN / never written** (`ch8.js:499`). Wren has no heartbeat,
no thread, a shadow that falls *toward* fire, a voice the memory-bell will not keep, and a name cut
into a four-hundred-year-old floor. On the Fourfold Walk, once the four write COLD themselves, Wren
acquires a pulse (`ch8.js:290`) and a thread — "there wasn't a *me* on the other end to tie it to.
**There is now.**" (`companion/ch8.js:126`).

**How far the game commits, exactly.** It commits to every row in §4.1 and to the identification
COLD = Wren by juxtaposition and by Wren's own "It's me." It **never** states a mechanism: what a
wound in the world *is*, what caused it, whether the Cold is sentient, whether Wren is the Cold, a
piece of it, its personification, or the shape the Hearth's absence took for one night fourteen years
ago. Those are §12.1–§12.5.

### 4.3 The Cold Ember

| fact | tier | cite |
|---|---|---|
| The Founders left it under the school | CLAIMED BY Marrow | `ch1.js:309`; `ch2.js:188` |
| **"If the Hearth goes out, the Ember lights it again."** — the sole statement of its function anywhere | CLAIMED BY Marrow, uncorroborated | `ch2.js:188`; `ch1.js:309` |
| A blue flame that is not burning; breathing; **no heat at all** | NARRATION | `ch2.js:285` |
| In a glass case with **no ward and no click**; lighter than it looks; colder than anything has a right to be | NARRATION | `ch2.js:337` |
| Numbs carrying hands to the wrist | NARRATION | `ch2.js:338` |
| **Leans toward whoever holds it** | NARRATION | `ch2.js:338` |
| No heartbeat (Listener), no thread — "a stone, and stones are not bound" (Binder), casts no shadow it should (Seer) | PHONE | `companion/ch2.js:134`, `:165`, `:150` |
| Its light is visible from the top of the vault stair | NARRATION | `ch2.js:197` |
| Dropped: "the blue light is brighter. Then it is not." Whether it still works is never said | NARRATION | `ch2.js:370` — §12.13 |
| `EMBER_LOST` — it is possible to end the night without it, two ways: dropped (`CH2_STAIR='ember'`) or taken by Sorrel's Convocation guards (`SORREL` forces it) | MECHANIC | `ch2.js:366`, `:383` |
| **Losing it cracks the second bell of Mere's four-hundred-year-old Silent Gate.** No causal line is given on any surface | MECHANIC | `companion/ch5.js:27`, `:275`, `:301-302` — §12.14 |
| It is **never invoked at the Finale**, where the spark actually goes out at midnight | NARRATION (absence) | `ch7.js:681`; §13.10 |

---

## 5. THE HEARTH

| # | fact | tier | cite |
|---|---|---|---|
| H1 | Four hundred years ago four people closed a wound in the world and **left a fire on top of it, to hold it shut**. That fire is the Hearth. | NARRATION | `ch0.js:49-51` |
| H2 | **The fire IS the Founders.** "Four went down. Not one born of four — four, as one. **The fire is only what they left behind.**" | NARRATION — the game's central reveal, spoken by the narrator, not a character | `ch6.js:839` |
| H3 | The stone, read the way the Founders cut it, says: "Four, as one, go down with fire. What is kept stays behind. **The fire is the hollow they left.**" | NARRATION | `ch6.js:827-828` |
| H4 | **Why it is dying:** "Four people's worth of fire, and four hundred years to spend it in. That is the whole answer to why it is going out. **Nobody did anything wrong.** It was only ever four people." | CLAIMED BY Marrow — and the authorial comment above it states this as the game's answer | `ch6.js:850`; comment `ch6.js:840-849` |
| H5 | **It has gone out exactly once**: one night, fourteen years ago. When it came back there was a baby asleep on the stones. | NARRATION | `ch0.js:51-53` |
| H6 | On the night of ch0 it flickers "for the first time in fourteen years" | NARRATION | `ch0.js:68` |
| H7 | Mid-Vigil it bows; **every face turns to the fire except Marrow's** | NARRATION | `ch1.js:147-148` |
| H8 | It is directly above the bell-chamber, up an engineered masonry shaft; from below it is "a coin of orange light" **with a pale blue core already in it** | NARRATION + ART | `ch6.js:472`; `js/art/scenes-ch6.js:48-55`, `:91-104` |
| H9 | It physically **covers the foot of the prophecy stone** until ch6, when it drops far enough for the foot to be bare and lit blue from below | ART + design statement | `js/art/scenes-ch0.js:79-80`; `scenes-ch6.js:153-155`; `docs/DESIGN.md:17` |
| H10 | It is a **health bar** that ends higher than it began: 1.0 (ch0) → 0.62 (ch1) → 0.42 (ch4) → blue-cored 0.42/0.28 (ch6) → a 26-unit spark (ch7) → an **empty basin** (ch7_cold) → **1.7 and white** (ch8, E0) | ART | `scenes-ch0.js:25`; `scenes-ch1.js:73`; `scenes-ch4.js:93`; `scenes-ch6.js:103-104`; `scenes-ch7.js:20-23`, `:114`; `scenes-ch8.js:35` |
| H11 | **At midnight in the Finale the spark goes out** — "not guttering, simply gone" — and "nothing you have done is undone". Midnight is a beat, never a loss. | NARRATION + MECHANIC | `ch7.js:681`, `:684`, `:199-214` |
| H12 | **It relights from a spark, for four hundred years, if someone walks in** (E2) | NARRATION | `ch8.js:331` |
| H13 | On ENDING 0 it **stops holding anything shut**: "for the first time in four hundred years it is not holding anything shut. **It is simply a fire.**" | NARRATION | `ch8.js:286` |
| H14 | On ENDING 4 it burns, unchanged in prose — "That is the horror of it: nothing about the fire has changed at all" — while the art draws it **cold blue, fed by pipework**, and four scenes later the prose calls it "a furnace with a schedule" | NARRATION vs ART | `ch8.js:275`, `:355`; `js/art/scenes-ch8.js:82` — see §13.12 |
| H15 | On ENDING 3 it is half the Prologue's size with a blue heart, and **visibly gutters twice every six and a half seconds** | ART | `js/art/scenes-ch8.js:96-106` |
| H16 | What is carved over it: **the four Founders' names** (established only obliquely, by E2's "a fifth name over the Hearth, **beneath the four Founders**") | NARRATION | `ch8.js:332` |
| H17 | Above it, cut into the stone, the prophecy — **eight cuts**, four of them burned away by the fire itself over four hundred years | NARRATION + ART | `ch0.js:61`; `js/art/scenes-ch6.js:6-10`; `scenes-ch0.js:38` |
| H18 | Sealing it again is **not the same as closing it**: "It is held. Not closed — held. **The last of it is not mine to do.**" | CLAIMED BY Marrow | `ch6.js:629` |
| H19 | The holding pattern that keeps the Cold off the lid while a Sealing is worked is **the Founders' own**, rung on four bells **by four hands**; the Founders rang the last of it **blind** — "One of them called it. Three of them rang." | CLAIMED BY Marrow | `ch6.js:487`, `:579`, `:594` |
| H20 | The four bells hang on one beam of black iron, each the height of a person, directly over the lid. **Who cast them is never said.** | NARRATION | `ch6.js:470`; §12.20 |

**Ruling.** The Hearth is a memorial that is also a lid. It is not fuelled; it is *spent*. The four
Founders put themselves into it, and four people is a finite quantity of fire. It went out for one
night fourteen years ago — the game never says why — and what it left on the stones was a child made
of the thing it was holding shut. The Cold Ember is the school's insurance policy against a failure
the school has never had to survive, and its only stated function is Marrow's word.

---

## 6. THE SIGHTINGS

| # | fact | tier | cite |
|---|---|---|---|
| S1 | "A **Sighting**. One way of seeing, one to a person, **and nobody chooses which one they get**." | NARRATION | `ch0.js:241` |
| S2 | **Every one of the nine Masters has one too** — asserted once and never used again | NARRATION | `ch0.js:242` |
| S3 | There are exactly four, one per seat, fixed in order | NARRATION (world table) | `lore.js:5-10`; `companion-content.js:3` |
| S4 | **Walking into the Cold spends the Sighting, permanently** | NARRATION | `ch8.js:287`, `:320`; `companion/ch8.js:148` |
| S5 | **That is what the Founders paid**: "You come out of it the way the Founders came out: grey-eyed and ordinary" | NARRATION | `ch8.js:287` |
| S6 | Mere's own account: "We wrote the cold glyph with four hands, and **came up grey**." | DOCUMENT (Mere's sheet) | `companion/ch4.js:62` |
| S7 | 212's price, and why it was refused: "**Four hands meant four Masters giving up their Sight.** The Convocation sent one Warden down instead." | DOCUMENT (the Binder's Book) | `companion/ch6.js:287` |
| S8 | A Sighting can be **spent temporarily**: the ch5 stair-holder's is gone while the held thread has no living anchor, and comes back "like blood into a numb hand" when Marrow ties it off to the iron ring | NARRATION | `ch5.js:551-552`, `:582`; `ch6.js:590-591` |
| S9 | Staying keeps it **for life**, along with the fire — the stayers become the Masters the school needs | NARRATION (E1) | `ch8.js:321`; `companion/ch8.js:263` |
| S10 | The Crown can **register** a Sighting and assign its holder to the Cold-works — whether it can take one is never said | DOCUMENT (E4) | `companion/ch8.js:207-208`, `:291`; §12.33 |
| S11 | **Where Sightings come from, why there are exactly four, and whether they are heritable, taught or born is never stated anywhere in the game** | — | §12.7 |

### 6.1 The four gifts, exactly

| | Reader | Listener | Seer | Binder |
|---|---|---|---|---|
| gift | **Glyph-Sight** | **Ear-Sight** | **Under-Sight** | **Thread-Sight** |
| question word | WHAT | WHEN | WHERE | WHETHER |
| colour | `#e0b04a` gold | `#4fb3bf` teal | `#a482e6` violet | `#d96b4a` red-orange |
| seat (left→right, facing the Hearth) | 0 | 1 | 2 | 3 |
| sees | the Founders' Tongue — four shapes, two readings each; faded inscriptions clean; **the lexicon**, and from ch4 **an older alphabet** | the steps of a hymn, patrol boots by landmark, murmurs, and **every heartbeat in a room — except one** | where an inscription begins and whether it is turned; hidden doors; what paint covers; sockets under rebuilt stone; **which way every shadow falls** | threads between people — **grey grief, gold Crown, red oath** — and keeps the Book of Laws |
| cannot | read a word's meaning aloud without the Seer saying where the line starts; read the older alphabet before ch4 | hear a word's *name* — only intervals, because "every room is tuned differently"; hear Wren | say what a cut *means* — "what a cut obliges is not yours" | read a shape, hear a note, or see under a floor |
| cite | `lore.js:6`; `companion/book.js:69-88` | `lore.js:7`; `companion/ch0.js:109`; `book.js:89-112` | `lore.js:8`; `companion/ch4.js:238`; `book.js:113-119` | `lore.js:9`; `companion/ch2.js:162`; `book.js:120-132` |

- The partition is absolute and restated every scene: "Four things, four people, and **nobody has two**."
  `ch2.js:251`, `ch2.js:267`, `ch3.js:476`, `:583`, `ch4.js:430`.
- The only workaround is forbidden by the house rule: **"Say what you see. Never show your phone."**
  `lore.js:74`, reprinted above every SPEAK page and deliberately absent exactly once, in ch8
  (`ch8.js:60`).
- The fourth thread colour — **no thread** — is the one Thread-Sight case the plot turns on, and it is
  missing from the world table; it exists only in the Book's legend: "No thread — unbound; or, once,
  '**not unbound: the knot itself.**'" `companion/book.js:131` vs `lore.js:9`. See §12.9.
- The governing rule of the art enforces the partition physically: **the Hearth screen may never draw
  a fact that lives on one player's phone.** Every "worn past reading" carving exists to obey it.
  `js/art/scenes-ch0.js:46-51` and eight other sites. Its only exemptions are four heraldic CROWNs and
  one reveal — the tapestry's fourth hand. §7.6.

---

## 7. THE FOUNDERS' GRAMMAR — the political spine

### 7.1 The eight glyphs

Source of truth: `js/content/glyphs.js:16-29`. Four shapes, each read two ways by orientation;
inversion is literally a 180° rotation, and the shapes are drawn deliberately asymmetric so it shows
(`glyphs.js:1-3`, `:39-44`).

| glyph | shape | orientation | ladder step | MIDI | gloss (verbatim) |
|---|---|---|---|---|---|
| **ASH** | Flame | upright | 0 | 72 | fire; the Hearth; warmth |
| **COLD** | Flame | **inverted** | **null** | **null** | the cold; the wound; the space left when warmth goes; **a hollow** |
| **THORN** | Spike | upright | 1 | 74 | a gate; to go through |
| **WELL** | Spike | inverted | 4 | 79 | down; a going-down; from |
| **KNOT** | Hook | upright | 2 | 76 | bound; together; **four-as-one** |
| **VEIL** | Hook | inverted | 5 | 81 | hidden; apart; behind |
| **CROWN** | Crown | upright | 6 | 83 | one; the first; the chosen; **the Chair** |
| **EMBER** | Crown | inverted | 3 | 77 | what remains; to keep; to close |

- **COLD alone has no step and no pitch.** In sound it is a rest; a rest is a pause, not a reset — the
  next glyph is measured from the last glyph that *sounded* (`glyphs.js:82-96`). The Listener's whole
  gift and Wren's silence are the same fact.
- The ladder is a C-major scale from C5 (72 74 76 77 79 81 83). **Who set it, and why, is never said**
  (§12.10), yet Founders' Law 2 depends on it ("in the order the line climbs").
- The seven attunement words of ch1–ch7 — THORN KNOT VEIL EMBER ASH WELL CROWN — are exactly
  `ORDER` minus COLD, each once. ch0's KINDLE and ch8's WREN are not glyphs. The game says so:
  "The eighth is the rest. The rest is never carved." `lore.js:18-25`; `ch8.js:493`, `:502`.
- **The Founders' Tongue is also a spoken language** — "a language nobody has spoken for four hundred
  years" (`ch0.js:61`) — but the tables treat it purely as carved shapes with glosses (§12.11).
- It is **distinct from the older alphabet**: 24 letters, no Q, no X, a plain substitution, taught by
  Marrow's own primer, which she left open on her desk (`ch4.js:51`; `companion/ch4.js:68`).

### 7.2 The Book of Laws, complete

Fourteen Laws, numbered 0–13, no gaps. Ten Founders' (Year 0), four Order's (212 ×3, 340 ×1).
`lore.js:56-71`. The Binder is the custodian, not the author — **who compiled it and assigned the
numbers is never said** (§12.12). Order below is the order the game teaches them.

| # | era | year | text | learned | what it does |
|---|---|---|---|---|---|
| **0** | F | 0 | **COLD is written by four hands.** — `struck: true`, note "struck by the Convocation, 212. See Law 6." | ch0 | the whole plot, present in the Book from the Prologue and never mentioned in ch0/ch1 prose |
| **1** | F | 0 | A sigil is read sunwise from the mark. | ch0 | the lamp, the scroll, the Great Sigil |
| **2** | F | 0 | The door hears one count. One word to each dial, in the order the line climbs, and then it is called. | ch2 | the Founders' Door |
| **3** | F | 0 | **Where two Laws disagree, the older binds.** | ch2 | makes every Order override structurally impotent — which is why 212 **struck** rather than amended |
| **13** | F | 0 | A Founder faces the hole their plinth was cut for. | ch2 | the derangement under the rebuilt floor |
| **9** | O | **212** | A Founder faces the dial before them. | ch2 | overrules 13 — and loses to it under Law 3 |
| **10** | F | 0 | A turned line reverses and inverts; a lone turned glyph only inverts; every glyph keeps its place on the stone. | ch4 | the false shelf, both gate carvings, both Finale walls |
| **4** | O | **340** | An oath's last glyph is its lock. KNOT cannot be unbound. EMBER can be remembered and reconsidered. **The one you swear to cannot tell the difference.** | ch4 | the oath's lock — and the Order's moral self-portrait |
| **5** | F | 0 | A turned inscription is placed widdershins from its mark. | ch5 | Mere's gates |
| **11** | O | **212** | **Every** inscription is placed sunwise from the mark. | ch5 | erases the turned case; loses to 5 |
| **6** | O | **212** | COLD is never written; where an inscription shows it, leave the slot empty. | ch5 | the replacement for the struck Law 0; loses to 0 |
| **12** | F | 0 | An oath binds only if its lock is KNOT or EMBER. | ch5 | the newel's five oaths; the wax |
| **8** | F | 0 | **A Great Sigil names every glyph once.** | ch7 | with eight glyphs, forces COLD into the Finale |
| **7** | F | 0 | **Idony's Law**: a sigil sworn under KNOT begins at the sworn-to. Build the ring by the Laws, then turn it sunwise until the sworn-to's glyph sits at the first mark. | ch7 | the KNOT-oath rotation — the **only** Law named for a person, and the only place a Founder besides Mere is named |

**The chain the tables alone prove**, with no chapter prose (`lore.js` + `glyphs.js`):

1. Law 8: a Great Sigil names **every** glyph once.
2. There are eight glyphs; one of them is COLD.
3. ⇒ A Great Sigil must contain COLD.
4. Law 6 (O, 212) forbids writing COLD. Law 0 (F, 0) says COLD is written by four hands.
5. Law 3 (F, 0): the older binds.
6. ⇒ **COLD can lawfully be written, and it takes four.**

The Book states step 5 to the Binder the moment Law 0 is restored: "Older than Law 6. The older
binds." `companion/book.js:127`.

### 7.3 What 212 actually was

This is the political centre of the game. Assembled from five sources, none of which is on the Hearth
screen at the same time as any other.

| # | what happened in 212 | tier | cite |
|---|---|---|---|
| 1 | **The Founders' seal failed.** "Two hundred and twelve years after the Founders the seal failed." | DOCUMENT (the Binder's Book, ch6 reveal) | `companion/ch6.js:287` |
| 2 | Renewing it meant paying what the Founders paid: **four Masters giving up their Sight**. | DOCUMENT | `companion/ch6.js:287` |
| 3 | **The Convocation would not pay it.** "Four Masters, four Sightings. The Convocation would not pay it. **They struck the Law and called it grammar.**" | DOCUMENT | `companion/ch6.js:286` |
| 4 | It **struck Law 0** rather than amending it — because Law 3 makes amendment useless — and wrote **Law 6** in its place, converting a *procedure* ("four hands") into a *prohibition* ("never"). | DOCUMENT | `lore.js:57`, `:67` |
| 5 | It **sent one Warden down instead**. | DOCUMENT | `companion/ch6.js:287` |
| 6 | It wrote **two further Laws the same year**, each collapsing a two-case Founders' rule to one universal case: Law 9 (a Founder faces the dial before them) and Law 11 (*every* inscription is placed sunwise). | DOCUMENT | `lore.js:62`, `:66` |
| 7 | It **rebuilt the antechamber**: a newer floor over four original plinth-holes, the four plinths re-set so that **not one stands in its own hole** (`CUTFOR = [3,4,2,1]`, a derangement), and **the Founders' names worn off the plinth fronts** — surviving only cut fresh on the backs. | NARRATION + PHONE (Seer/Binder) + MECHANIC | `ch2.js:209`, `:301`; `companion/ch2.js:141-142`, `:157`; `ch2.js:89` |
| 8 | It **bricked the Founders' road** — "an archway bricked shut with newer stone, grey where everything down here is black" — and the number **212** is cut beside it, in plain view. | NARRATION + ART | `ch2.js:346`; `js/art/scenes-ch2.js:100` |
| 9 | It (or its successor) **painted over the tapestry**: four figures walking into the fire, the second turned back, the fourth carrying COLD, four shadows — replaced by **one child-sized figure walking in alone, casting no shadow at all**. Hung in every hall. | ART + NARRATION | `js/art/scenes-ch4.js:36-75`; `ch4.js:533`, `:536-537` |
| 10 | It (or its successor) **maintains** the overpaint against anyone who scrapes it: "I scraped that paint myself, as a girl, with a bread-knife. **They painted it back inside the week.**" | DOCUMENT (Oriel's note, branch `ORIEL`) | `ch4.js:588` |
| 11 | Its translation of the stone substitutes **one** for **four** — exactly as its three 212 Laws substitute one case for two everywhere else. | DOCUMENT + derivation | `lore.js:75` vs `glyphs.js:21`, `lore.js:57` |
| 12 | Marrow's one-line history of it: "**They could not afford four Masters, so they made it grammar.**" | CLAIMED BY Marrow | `ch7.js:396` — "they" has no antecedent in the scene; §12.18 |
| 13 | Note: **the Convocation struck Law 0, but the Book still carries it**, struck and dated, visible on the Binder's phone from the Prologue onward. The Order did not manage to delete it. | DOCUMENT | `lore.js:57`; `companion/book.js:123-127` |
| 14 | **Same ink, same hand, two hundred and twelve years apart** — the Binder's ch6 figure draws a Year-0 Law and a Year-212 Law as written by one hand, and nothing follows it up | NARRATION (a drawn figure) | `companion/ch6.js:112-121` — §12.17 |

**Ruling.** 212 is a cost-avoidance decision dressed as a grammatical reform, and every physical
alteration under the school that night is the same act: *the Order rewrote the evidence so that the
bill it refused to pay would look like a mistranslation.* The rebuild turned the statues away from
their own holes; the strike turned a procedure into a taboo; the overpaint turned four people into one
child; and the translation turned "four, as one" into "one born of four." The prophecy's misreading is
not an accident of scholarship. It is the cover story.

### 7.4 The two readings of the prophecy stone

The stone is **one sentence in eight cuts, running all the way round the foot** — cut 8 touches cut 1,
so a ring has no first cut. The fire has stood on the foot for four hundred years and **burned cuts 1,
3, 5 and 7 away**. `ch6.js:391-395`, `:408`, `:703`, `:774`; art `js/art/scenes-ch6.js:6-10`,
`:143`, `:151-152`.

| cut | shape | as struck | naive word |
|---|---|---|---|
| 1 | Flame | point-up | ASH — **burnt** |
| 2 | Flame | inverted | COLD |
| 3 | Crown | point-up | CROWN — **burnt** |
| 4 | Hook | point-up | KNOT |
| 5 | Spike | point-up | THORN — **burnt** |
| 6 | Flame | inverted | COLD |
| 7 | Crown | inverted | EMBER — **burnt** |
| 8 | Hook | inverted | VEIL |

| | **the school's reading** (wrong) | **the Founders' reading** (right) |
|---|---|---|
| where it starts | the school's mark, cut 1 | cut 8 |
| direction | **up** the count | **down** the count |
| each cut says | the word it stands for | **its other word** |
| COLD | left empty (Law 6) | **written** (Law 0) |
| result | ASH COLD CROWN KNOT THORN COLD EMBER VEIL | **KNOT CROWN ASH WELL VEIL EMBER ASH COLD** |
| in English | "When the Hearth goes cold, **one born of four** shall walk into the Cold, and it shall close behind them." | "**Four, as one, go down with fire. What is kept stays behind. The fire is the hollow they left.**" |
| cite | `ch6.js:393`, `:395`, `:774`; identical string `lore.js:75` | `ch6.js:394`, `:827-828` |

- **Why the lap ends where it does:** COLD is the one glyph with no note, so the Listener hears the lap
  end on a silence; in `TURNED` that silence lands on cut 1, which fixes the start at cut 8 — one of
  eight, not one of two. `ch6.js:348-349`; `companion/ch6.js:210-216`.
- **The four private facts that make it solvable** are strictly partitioned: Reader = what the four
  burnt cuts *were*; Seer = which way each burnt chisel *went in*; Listener = where the lap ends;
  Binder = the older Law in three clauses. `ch6.js:345-352`; `companion/ch6.js:199-238`.
- The stone is corroborated in miniature by **Mere's strip** (ch2, optional): WELL EMBER VEIL from the
  left — "one went down alone and kept it", the reading the school teaches — versus KNOT CROWN THORN
  from its mark — "**four, as one, went through. Not one.**" `ch2.js:315`, `:319`.
- And by the tapestry, the bell-chamber's wall carving, the Gallery portraits ("four going down the
  stair and four coming back", `companion/ch5.js:310`), and the muttering portraits' "four went down"
  (`ch3.js:440`).
- **Marrow can read the stone from the foot herself, and never says so** until the four's reading
  budget is spent: "She kneels at the foot, puts one thumb in the first burn, and reads it the way the
  Founders cut it." `ch6.js:824`.

### 7.5 The Great Sigil (T9)

| fact | cite |
|---|---|
| Two walls of four carvings each; together one phrase of eight | `companion/ch7.js:195`; `ch7.js:140-141` |
| The phrase: **KNOT EMBER THORN WELL ASH VEIL CROWN COLD** | `ch7.js:129`, verified by re-running `ch7.js:149-157` |
| Its gloss — **"four-as-one, to close; a gate, a going-down; the Hearth, behind; the one, and the hollow"** — exists **only in a source comment and is never printed on screen** | `ch7.js:130`; §12.24 |
| Ring of eight sockets in the chamber floor, slot 1 at the top, sunwise | art `js/art/scenes-ch7.js:25-30` |
| Two cuts on the rim, by two different hands: a long deliberate **scratch at socket 6** (the mark) and a small **notch at socket 1** (a signature, and a decoy) | `companion/ch7.js:219`, `:221`; `ch7.js:143` |
| Unsworn answer: WELL 1 · ASH 2 · VEIL 3 · CROWN 4 · empty 5 · KNOT 6 · EMBER 7 · THORN 8 | `ch7.js:161` |
| Under a KNOT oath (Law 7, turn until CROWN sits at the scratch): EMBER 1 · THORN 2 · WELL 3 · ASH 4 · VEIL 5 · CROWN 6 · empty 7 · KNOT 8 | `ch7.js:162` |
| The Hymn *is* the phrase, played from it; **COLD is null, so the last beat of the Hymn is a silence** | `ch7.js:248-256`, `:619-620` |
| **Wren's name is cut into the eighth socket**, in letters four hundred years older than the present alphabet | `ch7.js:699`; `companion/ch7.js:241` |
| The empty socket is Wren's: "The ring is full but for one socket. Wren walks to it and stands in it." / "It is never written." / "It's cold in here. Obviously. It's me." | `ch7.js:695-697` |
| At the climax the four write COLD into it with four hands, and the screen prints **'"COLD is written by four hands." — Law 0. Restored.'** | `ch7.js:726`, `:740` |
| "The ring has been ready for fourteen years." | CLAIMED BY Marrow, `ch7.js:367` — §12.22 |

### 7.6 The one rule of the Hearth screen

**The Hearth may never draw a fact that lives on one player's phone.** Stated in nine art files
(`js/art/scenes-ch0.js:46-51`; `scenes-ch2.js:66-67`; `scenes-ch3.js:103-104`;
`scenes-ch4.js:119-121`, `:163-165`, `:174-175`; `scenes-ch5.js:75-77`; `scenes-ch6.js:7-9`;
`scenes-ch7.js:31-37`). Every "worn past reading" carving in the game exists to obey it.

Its exemptions, and why each matters:

| site | glyph drawn | justification |
|---|---|---|
| the Chair's banner and seat-banners (`scenes-ch1.js:30`) | **CROWN**, upright | "which is heraldry" |
| the oath scroll's wax seal (`scenes-ch4.js:180`) | **CROWN** | the Chair's seal |
| chalked on the bell-chamber lid (`scenes-ch6.js:123`) | **CROWN**, scale 2.2 | Marrow's own mark on her own working |
| the tapestry's fourth hand (`scenes-ch4.js:57`) | **COLD**, cold blue | the reveal itself — the picture *is* the answer |
| ch6's shaft and stonefoot (`scenes-ch6.js:100`, `:144-150`) | the four **unburnt** cuts | by ch6 the Reader's job is the burnt four |
| `ch7_walk`, `ch7_white` (`scenes-ch7.js:126`, `:136`) | **COLD** at architectural scale | no puzzle left to protect |

**Consequence, and it is canon:** CROWN is the only legible mark in the upper world. The one device
the school lets you read is the Chair's — which is a statement about who owns the Order's reading.

---

## 8. HISTORY, AS A DATED TIMELINE

The game gives exactly three dates — Year 0, Year 212, Year 340 — and one prose interval, "four
hundred years." **Nothing dates the present** (§12.6), so the present year below is an inference.

| year | event | tier | cite |
|---|---|---|---|
| **before 0** | There is a wound in the world under what will be Thornhallow. Its origin, age and cause are **never stated**. | NARRATION (its existence) | `ch0.js:49`; `ch5.js:249` |
| **before 0** | The First Hall stands in the Under-Marches, with five arches, and four crown-backed thrones on a ledge. By the present it is drowned; the thrones are above the waterline. **Nobody says who sat in them, or what drowned the hall.** | ART | `js/art/scenes-ch5.js:64-67`; §12.25 |
| **Year 0** | **Four people — Mere, Idony, and two never named — write the cold glyph with four hands and go down into the wound together.** One offered to go alone and was refused. **One was never asked.** They close it and **come up grey.** | DOCUMENT (Mere's sheet) | `companion/ch4.js:62` |
| **Year 0** | They leave a fire on top of the wound to hold it shut. It is the Hearth, and it is them. | NARRATION | `ch0.js:49-51`; `ch6.js:839` |
| **Year 0** | **Mere survives and keeps the fire afterwards** — she signs herself "Mere, who kept the fire, **after**." | DOCUMENT | `companion/ch4.js:62` — §12.15 |
| **Year 0** | The Founders write **ten Laws** (0, 1, 2, 3, 5, 7, 8, 10, 12, 13), including Law 3 ("the older binds") — i.e. **they legislate against being overruled before anyone tries.** One Law is named for a person: Idony's. | DOCUMENT | `lore.js:56-71` |
| **Year 0** | They cut the prophecy stone above the fire, as a ring of eight round its foot; the fire then covers the foot for four hundred years and burns four of the eight. | NARRATION + ART | `ch6.js:702-703`; `js/art/scenes-ch6.js:7-8` |
| **Year 0** | **Mere wards the Long Stair** and builds its three gates — two sigil gates and a counting ward — plus **a hidden door "for people who were not asked."** | CLAIMED BY Marrow / CLAIMED BY Wren | `ch5.js:265-266`, `:412`; `ch5.js:287` |
| **Year 0** | The Founders' Door, the antechamber, the Ember Vault, the road, the bell-chamber's lid, the four bells and the eight-socket floor-ring are all in place. **Who manufactured the riveted lid, who cut the shaft from the lid to the Hearth, and who cast the bells is never said.** | NARRATION + ART | `ch2.js:205-208`; `ch6.js:469-472`; art `scenes-ch6.js:31-38`, `:91-99`; §12.19–20 |
| **Year 0** | The four Founders' names are carved over the Hearth. | NARRATION (inferred from E2's "a fifth name… beneath the four Founders") | `ch8.js:332` |
| **Year 0 → 212** | The seal holds for 212 years. | DOCUMENT | `companion/ch6.js:287` |
| **Year 212** | **The seal fails.** Renewing it costs four Masters their Sight. The Convocation refuses; **strikes Law 0 and "calls it grammar"**; writes Laws 6, 9 and 11; **sends one Warden down alone**. | DOCUMENT | `companion/ch6.js:286-287`; `lore.js:57`, `:62`, `:66`, `:67` |
| **Year 212** | The antechamber is rebuilt: a new floor over four original holes, four plinths re-set in a derangement, the Founders' names effaced from the plinth fronts. The road is bricked and stamped **212**. | NARRATION + PHONE + ART | `companion/ch2.js:157`, `:141-142`; `ch2.js:209`, `:301`, `:346`; `js/art/scenes-ch2.js:100` |
| **Year 212** | The tapestry is overpainted: four figures become one child, alone, casting no shadow. Copies hang in every hall. | ART + NARRATION | `js/art/scenes-ch4.js:65-75`; `ch4.js:533` |
| **Year 212 (?)** | Two of the five oaths carved on Mere's newel are sworn **in Year 212** — "the Keeper" (WELL EMBER, lock EMBER) and "the Chair" (CROWN THORN, lock EMBER). Both are EMBER-locked, i.e. reconsiderable. | PHONE (Binder) | `companion/ch5.js:180-186` — **[PROPOSED]** reading: the 212 Convocation swore its new offices under the revocable lock |
| **Year 340** | The Order writes **Law 4** — the oath-lock Law, ending "The one you swear to cannot tell the difference." **Nothing anywhere says what happened in 340.** | DOCUMENT | `lore.js:64`; §12.8 |
| **≈ Year 378** | Vane, then a student or young Master, scrapes the paint and tells the Hall what is under it. "**Twenty-two years. I stood in your Hall with that paint under my nails and told them. They sent me away to learn manners.**" | CLAIMED BY Vane | `ch7.js:341` |
| **undated, "as a girl"** | **Marrow scrapes the same paint herself.** "I scraped it myself, as a girl." Neither she nor Vane ever acknowledges the other did it. | CLAIMED BY Marrow | `ch7.js:394`; §12.23 |
| **undated, "as a girl"** | **Oriel scrapes it too, with a bread-knife.** "They painted it back inside the week." | DOCUMENT, branch `ORIEL` | `ch4.js:588` |
| **≈ Year 386, fourteen years ago** | **The Hearth goes out for one night** — the only time in four hundred years. **Why is never stated.** | NARRATION | `ch0.js:51-52` |
| **the same night** | **When it comes back there is a baby asleep on the stones.** "It came out of the fire the night the Hearth guttered. I picked it up. I named it." | NARRATION + CLAIMED BY Marrow | `ch0.js:53`; `ch6.js:691` |
| **the same night** | Marrow names the child **WRENN** on the Vigil roll, in the old letters, in her own hand — "the hollow of a bell; the space inside it that makes the sound" — and raises it "**to be loved enough to walk back in**." | PHONE (Reader) + CLAIMED BY Marrow | `companion/ch4.js:202-204`; `ch6.js:691-692` |
| **the same night** | Marrow's thread to Wren turns **grey** — "the colour of someone who has already said goodbye" — and stays grey for fourteen years. | PHONE (Binder) | `ch4.js:217`; `ch8.js:333`; `companion/ch7.js:257` |
| **fourteen years ago → tonight** | "The ring has been ready for fourteen years." | CLAIMED BY Marrow | `ch7.js:367` |
| **a year ago** | Wren's name appears chalked twice on the dormitory door — once in our letters, once in an alphabet nobody teaches, **in the same handwriting**. The Reader recognises the hand and decides somebody is being funny. **Who chalked it is never said.** | PHONE (Reader) | `companion/ch0.js:99`; `companion/ch2.js:121`; `companion/ch3.js:181-183`; §12.16 |
| **tonight, T1** | The Hearth flickers for the first time in fourteen years. The four light the dormitory lamp the old way — ASH, EMBER, four hands: "*Fire, keep.* That is all it ever said." | NARRATION | `ch0.js:68`, `:213-216` |
| **tonight, T2** | The four each name aloud the anomaly they have privately carried about Wren. Wren: "**Yes. All four of you. I've known for years.**" | NARRATION / CLAIMED BY Wren | `ch0.js:226` |
| **tomorrow — T3 onward** | The Vigil: the Houses come to look at the child the fire left. Vane's writ; Marrow's vote; the errand under the school; the corridors; the study; the oath; the stair; the bells; the stone; the Finale. **All of ch1–ch8 happen on one night**, the night after the Prologue. | NARRATION | `ch0.js:67`, `:242`; `ch1.js:310` — but see §13.1 |

---

## 9. CHARACTERS

Everything in §9 is **actual**. What a character believes about themselves or about anyone else is
excluded by design and belongs in `EPISTEMICS.md`.

### 9.1 WREN

**What Wren is.** The hollow — the eighth glyph — in a fourteen-year-old's shape. Came out of the
fire the night the Hearth guttered (`ch6.js:691`). Has no heartbeat (`companion/ch7.js:246`), no
thread in either direction (`companion/ch4.js:270-271`), a shadow that falls *toward* every fire
including the Cold Ember (`companion/ch2.js:150`; `companion/ch3.js:229`), and a voice the
memory-bell will not keep — "It keeps every voice in this room but one" (`companion/ch4.js:227`).
Wren's name, written in the older alphabet, is **WRENN**: "the hollow of a bell — the space inside it
that makes the sound" (`companion/ch4.js:202-204`). The same name is cut into the eighth socket of a
four-hundred-year-old floor (`ch7.js:699`) and chalked on the dormitory door in a hand the Reader
knows (`companion/ch0.js:99`). The art edge-lights Wren in `#4fb3bf` — **the only figure in the game
lit in the Cold's colour** (`js/art/scenes-ch7.js:87`, `:102`; `scenes-ch8.js:87`) — and draws Wren as
a cold-violet **fifth** figure on every descent scene (`scenes-ch5.js:30`, `:53`, `:71`).

**Actual personality, with evidence.**

| trait | evidence |
|---|---|
| **Commands, does not ask.** Opens the game by conscripting four people. | "You're awake. Good. **I need four idiots and a lamp.**" `ch0.js:145` |
| **Diagnoses people affectionately and rudely**, one line each, and is always right. | "you read everything and eat nothing" / "you can hear a spider think, two floors down" / "you see under things" / "you know every rule in the book, and who is tied to who" `ch0.js:146-149`; repeated verbatim in the Epilogue letters, `companion/ch8.js:86`, `:94`, `:110`, `:126` |
| **Names own situation with flat accuracy and no self-pity.** | "I'm the thing they're all coming to look at." `ch0.js:156` · "I don't get a say. That is the entire job." `:157` · "And I am the — what am I again? **The occasion.**" `ch5.js:254` · "**Four idiots and a hollow.**" `ch7.js:423` · "I'll stand in the bit that isn't written." `ch7.js:405` |
| **Jokes as armour, always at own expense, italics on one word.** | "I looked *terrible*." `ch8.js:323` · "You took your *time*." `:289` · "She has a *fire*. In her study. We had a lamp." `ch4.js:344` · "Four thrones. Four Founders. It is a *theme*." `ch5.js:349` |
| **Wants truth over kindness, and says so.** | "**That was kind. It was not true, and I would rather have had the true one.**" `ch6.js:320` · "Thank you. All of you. **Even the ones who lied.**" `ch3.js:530` |
| **Manages other people's guilt, including the guilt of people who wrong Wren.** | "It's alright. **I'd have taken it too.**" (to a player who sold Wren to Vane) `ch7.js:499` · "It's fine. They have a warm room. I've never had a warm room." — narration: "**Wren is lying, and is fourteen, and is doing it for you.**" `ch1.js:302-303` · gives Marrow *permission* to confess: "Tell them. **You are allowed.**" `ch6.js:689` |
| **Finishes other people's sentences generously.** | Marrow: "I raised it to be—" / "'**Loved**,' says Wren." `ch6.js:692` |
| **Keeps the table working when the world ends.** | "Well. Nothing is on fire. **Finish the ring.**" `ch7.js:683` · "Nothing left but the keyboard and each other. **Write it.**" `:722` · "Has everybody actually said their bit?" `ch0.js:204`, `ch3.js:369`, `ch4.js:395`, `ch5.js:198`, `ch6.js:793`, `ch7.js:594` — Wren is the game's protocol coach |
| **Silence is the tell, not the jokes.** | E2: "That is all Wren says. **It is the only time all night Wren has been short of words.**" `ch8.js:262` · E4: "Wren does not say anything to any of you. **It is the worst thing Wren has ever done.**" `ch8.js:354` |
| **Physical signature: fidgeting** — established as default, used as a duress meter. | "I'll try not to fidget." `ch1.js:127` → "does not fidget once" `:243` → the stillness of an hour standing `:305` |
| **Disobedient in exactly one direction: toward the four.** | Waves in a hall where waving is forbidden `ch1.js:115` · escapes guard in twenty minutes to follow them down `ch2.js:358` · disobeys Marrow's one direct order ("Walk") in order to ask the four four questions `ch6.js:630-631` · comes back **up three flights in the dark** to fetch the unsworn through Mere's door `ch5.js:288` |
| **Tracks what the four have learned, precisely.** | "Reader. You read the old tongue **now**." `ch6.js:663` · "I watched the Binder walk up to Seat One. **The Binder doesn't walk up to anyone.**" `ch1.js:232` |

**What Wren actually knows.**

| knows | since | cite |
|---|---|---|
| All four anomalies — no heartbeat, no thread, the shadow, the name | "for years" | `ch0.js:226`; "Four answers, and all four were the ones I already knew" `ch6.js:688` |
| That the four have each privately concealed one of them | before ch0 | `ch0.js:226-227` |
| Facts only one seat can perceive: that the lamp hums, that there are cuts under the brass nobody has ever seen, that the Binder alone was taught the ring rule | before ch0 | `ch0.js:172-174` — **the largest unexplained thing in the game**, §12.21 |
| What Marrow is and where Wren came from | "since the laundry" (ch3) | `ch6.js:689`; `ch8.js:330` |
| The stone's true reading, and that it is about Wren | "years" | "That is what the stone says, and **I have had years to get used to it**." `ch7.js:404` |
| That the Provost's version of Wren's name is not the true one | before ch3 | "Properly. **Not the Provost's version.**" `companion/ch3.js:284` — §12.28 |
| Mere's hidden door, its maker, and its purpose; and the way down three flights in the dark | unexplained | `ch5.js:287-288` — §12.29 |
| That Wren is the socket, and the Cold | by the Finale | "It's cold in here. Obviously. **It's me.**" `ch7.js:697` |

**What Wren conceals, and why.** That Wren wanted to be saved. Revealed only obliquely and only when
it is too late to act on: E2, "It is alright. **I knew. I wanted to hear what you would say.**"
`ch7.js:768`; E0, "You *idiots*. **I had a *speech*.**" and "Wren is on the warm stones, crying, and
will deny it." `ch7.js:758-759`. The concealment is protective: Wren has decided the four should not
have to carry a request.

**How Wren speaks.** Short declaratives. One italicised word per line. Stacked "Also" under stress
("You *left* without me. Also you dropped this. Also the stairs are going. Also —", `ch2.js:360`).
Deflection, then, without transition, total directness. Calls Marrow **Mum** — at least four times,
at least twice deliberately (`ch0.js:233` branch; `ch4.js:770`; `ch5.js:287`; `ch6.js:689`), which
ch8 contradicts (§13.3). Addresses the four by the group name they were given in ch0 (`GROUP_NAME`)
and uses it as an endearment in every crisis line (`ch7.js:317`, `:405`, `:423`).

**Gender.** The narration is **scrupulously pronoun-free about Wren** in every Hearth line in the
game. Only Vane and his men say "the boy" and "he" (`ch1.js:280-282`; `ch3.js:204`, `:543`, `:550`;
`ch7.js:315-316`). Two companion lines break the convention in opposite directions —
`companion/ch5.js:290` ("her name", "asked her") and `companion/ch8.js:195` (Marrow: "Read **him** the
name properly"). See §13.4. Whether the omission is diegetic is §12.27.

### 9.2 PROVOST ILSABET MARROW

**What she is.** The Chair of the Convocation, seat 9, House of the Chair; she runs Thornhallow
(`ch1.js:125`). She is "the nearest thing Wren has to a mother" (`ch1.js:125`) and she is the person
who picked Wren up off the stones, named the child, and raised it for the Sealing.

**Actual motive, stated in her own words.** "Under this school there is a wound. The Founders shut it
and left the fire on top. / **The fire is going out. Tonight I take the child down and shut it
again.**" `ch5.js:249-250`. And: "It came out of the fire the night the Hearth guttered. I picked it
up. I named it. I raised it to be— / '*Loved*,' says Wren. '**Loved enough to walk back in**,' says
Marrow, and does not look up." `ch6.js:691-692`.

**The load-bearing fact about her.** *The love is real and the instrument is real, and she has never
allowed them to be two things.* She writes of Wren as "**it**" in a private journal in the same two
sentences that are unmistakably tender — "IT SLEEPS WITH THE WINDOW OPEN. IT LAUGHS AT MY JOKES."
`ch4.js:211`. Her thread to Wren has been **grey — grief, a goodbye already said — for fourteen
years**, i.e. since the night she picked the child up (`ch4.js:217`; `companion/ch6.js:268`;
`ch8.js:333`).

**Actual personality, with evidence.**

| trait | evidence |
|---|---|
| **Procedural under pressure.** Meets a royal writ with a rule, not defiance. | "This school does not hand its children to a writ. It hands them to a vote. Nine seats. Five keeps." `ch1.js:146` |
| **Cheats her own procedure for the children.** | The bell rings and she will not call the vote: "The Chair has not finished hearing the Masters." — "**She is stalling for you.**" `ch1.js:178` |
| **Does not raise her voice, ever, and the narration says so.** | "Provost Marrow **does not raise her voice. She never has.**" `ch4.js:766` |
| **Stands with her back to the fire when she has decided something.** | `ch4.js:341`; `ch1.js:308` |
| **Gives orders and costs in one tone; never comforts.** | "Wren stays with me tonight. You four have an errand." `ch2.js:186` · "Hands on your keys." `ch6.js:488` · "The ring has been ready for fourteen years. **Decide.**" `ch7.js:367` |
| **Deliberately de-escalates before a puzzle — the one wholly honest framing she gives all night.** | "Miss it and the Cold pushes further. **That is all that happens.**" `ch6.js:488` |
| **Praises and withdraws it in the same breath.** | "Good. **Do not get proud.** The last one is the Founders' own." `ch6.js:579` |
| **Refuses to let failure become an event.** | "Again. The next one. **You do not stop for a cracked bell.**" `ch6.js:580` · "Walk anyway." ×2 `ch6.js:861-862` |
| **Physically does the work herself.** | Kneels in chalk and salt on the lid, seal in the iron `ch6.js:484`; puts out every lamp between the Gallery and the Tower personally `ch3.js:445`; rings the bells herself `ch3.js:445` |
| **Yields to any argument, including a non-argument.** | Against "Because it is Wren, and we are not doing it": "**That is not a reading.**" … "**She steps aside anyway.**" `ch7.js:397-398` |
| **Physical affection is unprecedented and the narration flags it.** | KNOT oath: "She puts a hand on the nearest shoulder. **Nobody has seen her do that before.**" `ch4.js:749` |
| **One endearment in the whole game, attached to an order to die.** | "**Now, love. Walk.**" `ch6.js:630` |
| **Terrified, and it shows only to the Listener.** | Her heartbeat is drawn **fast** in the bell-chamber `companion/ch6.js:251`; it skipped twice in ch1 while she looked at Wren, not the fire `companion/ch1.js:118` |
| **The one sentence she has never finished in fourteen years**, on seeing Wren hurt: "Who did —" | `ch2.js:396-397` |
| **Self-indicting, and only afterwards.** | "Then I go. **I should have gone fourteen years ago.**" `ch7.js:777`; `ch8.js:268` · "Do not let that stop you listening — **I did, and it cost fourteen years.**" `companion/ch8.js:196` · "I should have asked you sooner. **I should have asked anyone. Ask, when you are me.**" `:197` |

**What she actually knows.**

| knows | cite |
|---|---|
| What is under the school, and will not name it to the nine | `ch5.js:249`; "the thing I have never named to you" `ch4.js:592` |
| The Founders' operational practice: blind ringing, one caller and three ringers, how they cut the stone | `ch6.js:579`, `:594`, `:824` |
| **How to read the prophecy stone from its foot, the way the Founders cut it** — and she never says so until the four's budget is spent | `ch6.js:824` |
| That the vault "was rebuilt once, and **the rebuilding was not honest**" | `ch2.js:189` |
| The political history of the cover-up: "They could not afford four Masters, so they made it grammar." | `ch7.js:396` |
| What is under the paint — she scraped it herself, as a girl | `ch7.js:394` |
| Mere's gates, their character, and that they need four readers | `ch5.js:265-266` |
| A word that forces Mere's last ward, and it "costs her something" | `ch5.js:475` — §12.31 |
| That a held thread can be tied off in the bell-chamber, and how | `ch5.js:582`; `ch6.js:590` |
| That she **cannot** finish the Sealing: "It is held. Not closed — held. **The last of it is not mine to do.**" | `ch6.js:629` |
| That Law 0 is **not** in her Book: "**That is not in the Book I was given.**" | `ch5.js:399` |
| Which lock the four swore under, though Law 4 says the sworn-to cannot tell | `ch7.js:387` — §13.11 |

**What she conceals, and why.** (a) That she can read the stone — because the four reading it
themselves is what opens the Fourfold Walk, and because she has spent fourteen years not offering
Wren an alternative. (b) That she is afraid — she is the Chair and the room is full of children.
(c) The grey thread — she has never named her own grief to anyone, and the Binder has "decided long
ago not to look" (`companion/ch3.js:276`). (d) Wren's origin — until Wren gives her leave, at which
point she tells it **kneeling** and does not look up (`ch6.js:690`, `:692`).

**How she speaks.** Imperatives without preamble. Four to twelve words. No hedging, no softening, no
sentence about herself. She writes the same way: a two-line journal, an unsent letter of two
sentences, four Epilogue letters signed "— I. M." (`companion/ch8.js:282`), written **on the back of
the writ**, and she does not wait to see them read (`:283`).

### 9.3 LORD CASSIAN VANE, the Crown's Envoy

**What he is.** The Crown's Envoy, carrying a writ with a saucer-sized seal (`ch1.js:135`), a personal
name that appears **nowhere in the shipped game** (only in `docs/DESIGN.md` and this document's cast
list), and a grievance twenty-two years old. He is also, factually, **right about the paint**: "'I
have seen what is under the paint,' the Envoy said. **So he had.**" `ch4.js:557`.

**Actual motive.** Two, and they are not the same. (1) The Crown's: "**The Crown will have the Cold
open, one way or another.**" `companion/ch4.js:213`. (2) His own: he told the Convocation the truth
twenty-two years ago and was exiled into diplomacy for it — "I stood in your Hall with that paint
under my nails and told them. **They sent me away to learn manners.**" `ch7.js:341`. The second
motive is why the single most important lever in the Finale is *showing him the wall*: he stands
down, and the reason he gives is not political. "**My offer is withdrawn. I will not be the thing you
have to be brave about.**" `ch7.js:342`.

**Actual personality, with evidence.**

| trait | evidence |
|---|---|
| **Frames force as courtesy.** | "His Majesty asks **one small thing**: the child, tonight, for **safekeeping**." `ch1.js:136` |
| **Uses a private lever in public, on purpose.** | "Vane lowers his voice — **not far enough**." → "I have seen what is under the paint in this hall, **Ilsabet**." `ch1.js:137-138` — and he uses her given name in front of the Convocation |
| **Loses gracefully, and the narration will not let you enjoy it.** | "Vane bows. It is a very good bow. **He has done it to people he later ruined.**" `ch1.js:231` |
| **Wins gracefully, and it is worse.** | "His Majesty is grateful, and will not forget it." `ch1.js:241` · "The Envoy **does not gloat**. He holds his hand out as if helping someone over a stream." `ch7.js:432` |
| **Patient by policy.** | "He waits." `ch1.js:284` · "He is very good at waiting." `:276` · "Then I will ask again later, **when it costs more**." `:289` |
| **Content with a lie.** | "Wise. Or a lie. **I can use either.**" `ch1.js:291` |
| **Bound by his own code, and asks the same of others.** | "**I keep my promises. Do you keep yours?**" `ch7.js:494`, asked in public, of one named player |
| **Scores silence rather than punishing it.** | "Nothing. Well. **Nothing is an answer.**" `ch7.js:491` |
| **Accepts a kept bargain with two words.** | "Thank you." `ch7.js:501` |
| **He does not lie, and that is the horror of ENDING 4.** | "What leaks from under Thornhallow is harnessed, **as promised**." / "You are Masters, **as promised**." `ch8.js:355-356` · "The Envoy is courteous about it. **He has always been courteous.**" `:353` |
| **The one crack: winning by purchase makes him flinch.** | On `VANE_ACCEPT`: "For a moment he looks like **a man handed something heavier than he asked for**." `ch1.js:293` |
| **His heart is the only fast one in the Hall.** | `companion/ch1.js:116-117` |
| **He is drawn with two threads on one body**: red `#b23a3a` at .8 on his left, gold `#d4a94e` at .6 on his right — the red the brighter, facing inward toward Marrow and Wren; the gold facing out toward his guards. | `js/art/scenes-ch7.js:83` |

**What he actually knows.** What is under the paint, and has for twenty-two years (`ch7.js:341`).
That the Seer is the seat that can confirm it — he names the gift, unprompted (`ch1.js:283`). Each
of the four **by their real first name** (`companion/ch7.js:182`, `ctx.name`) — never established
(§12.34). That the fire has under an hour (`ch7.js:316`).

**What he conceals, and why.** Whom his private letter went to — "The others need never know who
opened the door" (`companion/ch7.js:182`) — a concealment the Hearth then breaks for him by naming
the accepter aloud (`ch7.js:493`). And he never explains **why the Crown wants Wren specifically**
rather than the Cold; "safekeeping" is not a motive (§12.32).

**How he speaks.** Formal, unhurried, transactional, never cruel. Every line is an offer or a lever.
He argues by pointing at evidence he declines to explain: "**You think I am the villain of tonight.
Ask your Seer what is under the paint.**" `ch1.js:283`.

**Branch note.** `VANE_ALLY` is created **entirely inside ch7** — only `ch7_wall`'s enter sets it
(`ch7.js:332`). Showing him the wall is the single lever that deletes his ending, the private bargain
question, the letter on every SPEAK page, and one figure from the art. **What he does afterwards is
never shown** (§12.32).

### 9.4 THE FOUR (the player characters)

**What they are.** Four fourteen-year-old students of Thornhallow who have known each other since
they were seven, share a room with four beds and one round window, and each see one thing the other
three cannot (`ch0.js:77-80`). **They have no name, no pronoun, no age beyond fourteen, no family, no
appearance and no history anywhere in the game.** The world table gives id, seat index, gift, colour,
one blurb and one question word, and nothing else (`lore.js:5-10`); the art draws four identical
faceless silhouettes, never distinguished by shape, size or colour from one another, in every chapter
(`js/art/scenes-ch1.js:59`; `scenes-ch3.js:42`, `:86`, `:122`; `scenes-ch5.js:30`;
`scenes-ch6.js:86`; `scenes-ch7.js:88`; `scenes-ch8.js:47`). This is deliberate: they are played by
real people at a table, and the only thing the fiction may say about them is what they perceive and
what they have decided.

**Canon about them is therefore exactly four things per seat: the gift, the seat, what their phone
shows, and what they privately decided about Wren.**

| | **Reader** (seat 0) | **Listener** (seat 1) | **Seer** (seat 2) | **Binder** (seat 3) |
|---|---|---|---|---|
| **the anomaly they carry** | Wren's name chalked twice on the dorm door, the second in an alphabet nobody teaches — **"and the handwriting is the same"** | Has **never once** heard Wren's heart, through anything, anywhere | Wren's shadow falls **toward** the fire — every fire, including the Cold Ember | **No thread at all**, to anyone — and "not unbound. You know unbound." |
| **the rationalisation, verbatim** | "You decided, a year ago, that somebody was being funny. **You have never asked who.**" | "You decided years ago that **the fault was yours**, and you have never said it out loud to anyone." | "You decided months ago it was a trick of the light… **It is not the light. It never was.**" | "You decided it was a blind spot in your own gift. **You have never told anyone your gift has a blind spot.**" |
| cite | `companion/ch0.js:99` | `companion/ch0.js:112` | `companion/ch0.js:124` | `companion/ch0.js:145` |
| **how the game kills the rationalisation** | ch4's primer lets them read it; the Vigil roll says WRENN; ch7 puts the same name in a 400-year-old socket | "Six chapters, every room, and never once anything to catch." `companion/ch6.js:255`; "Nine people in this chamber, and **eight hearts**." `companion/ch7.js:246` | "There is **no lamp here**." `companion/ch1.js:133`; "**You have run out of lamps to blame.**" `companion/ch3.js:229`; "There is barely any light left to blame." `companion/ch7.js:251` | "**Your gift had a blind spot. It does not.**" `companion/ch7.js:260` |
| **the whisper they may tell or withhold (ch3)** | "What does my name mean… **not the Provost's version**?" — truth is **DONTKNOW** | "Can you hear mine?" — truth is **NO** | "What do you see?" — truth is **TELL** | "Do you think I'm really the one?" — truth is **DONTKNOW** |
| **what walking costs them** | "you will not read tomorrow. Not the door, not the lexicon, **not whatever Wren leaves you**." | "the house goes quiet. **You have never heard a quiet house.**" | "every shadow will fall the ordinary way, and **only you will remember that once they did not**." | "you will never see another thread. **You will have to ask people what they feel.**" |
| cite | `companion/ch7.js:185` | `:186` | `:187` | `:188` |
| **and ENDING 0 pays each back, word for word** | "The Reader looks at the stone and sees shapes." | "The Listener hears a room." | "The Seer sees a floor." | "The Binder looks at the Provost and **has to ask what she feels**." | 
| cite | `ch8.js:287`; `ch7.js:757` | | | |

**Facts true of the four as a body.**

| fact | cite |
|---|---|
| Known each other since they were seven; four beds, one room | `ch0.js:77`, `:79` |
| Seated left to right facing the Hearth: Reader, Listener, Seer, Binder — fixed all night | `ch0.js:80`; `companion-content.js:3` |
| The Reader ↔ Listener share "an old red thread, well knotted" — an **oath**, from before the game | `companion/ch0.js:141` |
| The Seer ↔ Binder share "last week's practice thread [that] still will not hold", drawn broken — **practice for what is never said** | `companion/ch0.js:142` |
| By ch6 the four are "red, **each to each, and holding**" | `companion/ch6.js:269` |
| By ch7 "red, knotted, to each other" | `companion/ch7.js:256` |
| They swear the Warden's Oath **to Marrow's Chair**, not to a person — and her Epilogue advice is "**Swear the next one to a person.**" | `ch7.js:421`; `companion/ch8.js:198` |
| Each of them privately, separately, observed an impossibility about Wren, invented a self-blaming explanation, and told **nobody** — until the lamp lights | `ch0.js:217-218` |
| Three sealed private channels run in the night: the whisper (ch3), the hold (ch5), the finale word (ch7) — and ch8 miscounts them as two | `lore.js:32-36`; `ch8.js:392` — §13.7 |
| On `VANE_ACCEPT` the Binder's page tells that seat the four are themselves bought: "Three people are awake between the Gallery and the Tower. Two of them are paid. **So, since the Hall, are you.**" | `companion/ch3.js:236` |
| Duty rotation across the night (Warden = keyboard, Voice = reads aloud): ch0 anyone/Reader · ch1 Binder/Listener · ch2 Seer/Reader · ch3 Listener/Binder · ch4 passed by name/Seer · ch5 Reader/Listener · ch6 Binder/Listener · ch7 Seer/Binder, then Binder/Reader for the last ritual | `ch0.js:185`; `ch1.js:116`, `:160`; `ch2.js:221`; `ch3.js:458`; `ch4.js:368`; `ch5.js:277`; `ch6.js:499`; `ch7.js:359`, `:715` |

### 9.5 THE NINE MASTERS

Beyond §3.4's table, the shipped game gives each of them almost nothing. What it does give:

| Master | what is actually true | cite |
|---|---|---|
| **Sorrel** (1, Harrowden) | Wants to be asked **to her face**, and says so where only the Listener hears. Carries Quill without asking him. Transactional and immediate: names her price within seconds of the vote — "they voted for you and **would like that noticed**." Institutionally ambitious over loyalty to the Chair: the Ember "comes to **the nine of us — the Convocation. Not to her.**" Unforgiving: "**Sorrel does not forget.**" | `companion/ch1.js:108`; `ch1.js:61`, `:254-255`, `:263`, `:266` |
| | Branch `SORREL`: she gives the four a **Convocation writ**, which is spendable at the Tower door and which a Crown captain will not fight; and her guards take the Ember at the top of the vault stair, forcing `EMBER_LOST` | `ch3.js:403-404`, `:552`; `ch2.js:383`, `:387-388` |
| | Wren on her: "*Sorrel* saved me? I called her a goat once. **To her face.**" | `ch3.js:405` |
| **Quill** (2, Ossery) | Sworn to Sorrel — a red knotted thread, 2→1. Honest about his own irrelevance, and **mechanically wrong about it** (§13.5) | `companion/ch1.js:141`; `ch1.js:62` |
| **Brack** (3, Dunmere) | Pledged **in writing, "with the Chair," before the doors shut** — and murmurs "Ask me where I stand. Go on. Ask me." A decoy for a seat already won. | `companion/ch1.js:95`, `:109` |
| **Hallan** (4, Fellwood) | Deaf **by choice** — "Seat 4 has shut his ears. **He means it.**" Sworn to Orrin, his **cousin**. Will not name him: "I vote as my cousin votes. I hear nobody else." | `companion/ch1.js:113`, `:110`, `:142`; `ch1.js:64` |
| **Vey** (5, Goldmarch) | Bought. A Crown-struck coin under the cushion. Votes SEND. | `companion/ch1.js:125`; `ch1.js:65` |
| **Orrin** (6, Redmoor) | Never speaks. An Envoy soldier stands behind his chair and nobody gets near. | `companion/ch1.js:127`; `ch1.js:66` |
| **Oriel** (7, Sable) | Undeclared and says so. Deliberate and unsentimental: "listens a long time, **asks two questions**, does not smile. 'Very well. **Tonight** — keep.'" — note the hedge. Her price is information, total and uncomfortable: "Tell me what you find down there. **All of it.** … **Even the parts you don't like.**" | `companion/ch1.js:111`; `ch1.js:67`, `:256`, `:266` |
| | She watched Wren all evening — "Like I was a sum she was doing" (Wren) | `ch1.js:306` |
| | **She scraped the paint herself, as a girl, with a bread-knife, and they painted it back inside the week** — the only Master with independent knowledge of the cover-up | `ch4.js:588`, branch `ORIEL` |
| | In the Finale she "came down behind you and **says nothing, loudly**" | `ch7.js:60` |
| **Tarn** (8, Wyeburn) | Bought. "Smiles with every tooth. Crown coin in it." | `ch1.js:68` |
| **Marrow** (9, the Chair) | §9.2 | |

**Hard limits.** Six of the nine are never named to the player. None of the nine's **Sightings** is
ever named or used, though `ch0.js:242` asserts each has one. Nothing gives a House a territory, a
wealth or an interest. None of them appears in the Epilogue on any ending (§12.30).

### 9.6 THE FOUR FOUNDERS

**What they are.** Four people, in Year 0, who wrote the cold glyph with four hands, went down into
the wound together, closed it, came back grey, and left themselves burning on top of it. **They are
the Hearth** (`ch6.js:839`).

| Founder | what the shipped game says | cite |
|---|---|---|
| **Mere** | Named **once**, on an optional path: "The name worn off the front of that plinth is cut fresh on its back. **Mere. One of the four who closed the wound.**" — plinth 1's back, in a hollow the rebuilders missed | `ch2.js:301` |
| | "one of the four who **built the Hearth**" | CLAIMED BY Marrow, `ch5.js:265` |
| | **Warded the Long Stair** and built its three gates: two sigil gates and a counting ward. "Her gates do not lie. **They do not play fair.** Read them together." | `ch5.js:265-266`, `:412` |
| | Left **a hidden door for "people who were not asked"** | CLAIMED BY Wren, `ch5.js:287` |
| | Her sheet, the only Founder-voice document in the game: "**We were four. I offered to go alone and was refused. One was never asked. We wrote the cold glyph with four hands, and came up grey. — Mere, who kept the fire, after.**" | `companion/ch4.js:62` (Hearth never prints it) |
| | Her strip of stone, in the same niche: WELL EMBER VEIL from the left ("one went down alone and kept it") vs KNOT CROWN THORN from its mark ("**four, as one, went through. Not one.**") | `ch2.js:315`, `:319` |
| | Her sheet is signed in runes **ᛗᛖᚱᛖ** — transliterating M-E-R-E. Nothing in the game points this out. | `ch2.js:143` |
| | **[PROPOSED]** She is the second figure in the tapestry: the one who has turned, head offset, arm reaching back the way they came "for something that is not there" (`js/art/scenes-ch4.js:50-52`). She is the one who offered to go alone and was refused, and the one who came back to keep the fire. The art individuates exactly one Founder and the document individuates exactly one Founder; nothing in the game joins them. | inference from `companion/ch4.js:62` + `scenes-ch4.js:50-56` |
| | Marrow models herself on her and apologises to her by name when she breaks her gate: "**Mere. Forgive me. There is a child on this stair.**" / "I will not choose. **Mere would not have either.**" / "Eight questions, four eyes, one answer. **That was Mere.**" | `ch5.js:395`, `:553`, `:480` |
| **Idony** | Named **once, in a world table**, as the author of Law 7 — the only Law named for a person, and the law of how a sigil *sworn to someone* is oriented. **Her name appears nowhere in any chapter, including ch7, the chapter that teaches her Law.** | `lore.js:70`; §12.37 |
| **Halvard** | **Appears nowhere in the shipped game.** The name exists only in `docs/DESIGN.md:132` and the BRIEF's cast list. | grep returns nothing |
| **Rook** | **Appears nowhere in the shipped game.** Same. | grep returns nothing |

**What is true of them as a body.**

| fact | cite |
|---|---|
| There were **four**, and four thrones stand empty in the Under-Marches | `companion/ch4.js:62`; `ch5.js:347` |
| **One offered to go alone and was refused. One was never asked.** Neither is identified. | `companion/ch4.js:62`; §12.4 |
| They **came up grey** — spent their Sight — and at least Mere survived and kept the fire afterwards | `companion/ch4.js:62`; §12.15 |
| They legislated **against being overruled** before anyone tried (Law 3) | `lore.js:60` |
| They legislated **plurality into the physics**: COLD takes four hands; KNOT glosses "four-as-one"; a Great Sigil names every glyph once, so no one hand can finish one | `lore.js:57`, `:69`; `glyphs.js:21` |
| They rang the last holding pattern **blind**: "One of them called it. Three of them rang." | CLAIMED BY Marrow, `ch6.js:594` |
| Their statues in the antechamber are **hooded and carry numbers only — no name, no shape, no mark** | `ch2.js:205`; art `js/art/scenes-ch2.js:66-68` |
| In the tapestry they are **not hooded and not robed** — four ordinary people; the fourth carries COLD in cold blue; all four cast shadows **away** from the fire; **there is no child anywhere in it** | art `js/art/scenes-ch4.js:47-62`; `ch4.js:216`, `:536-537` |
| The same image is **carved openly on the bell-chamber's own wall**, four hundred years old and never painted over | art `js/art/scenes-ch7.js:55-60`, `:77`; `ch7.js:303` |
| Their names are carved over the Hearth (implied by E2's "a fifth name… beneath the four Founders") | `ch8.js:332` |
| **Which statue, throne, bell, dial or plinth belongs to which Founder is never established for three of the four.** | §12.38 |

### 9.7 THE MINOR CAST

| person | what is actually true | cite |
|---|---|---|
| **Vane's captain** | Six soldiers; "No hurry." Decides by rule, never by appetite, on all three branches: BLUFF → "Then the Envoy will see you at his door. With the boy."; WORD → "The Envoy said you had given your word, and that I was to let you go about it however you chose."; WRIT → "The Envoy holds the Crown's writ. This one is the Convocation's. **I was not sent to start a war on a stair.**" | `ch3.js:542`, `:394`, `:399`, `:404` |
| | His self-description, and it is accurate: "**I am not a cruel man. I am a punctual one.**" — narration: "He is, as he said, a punctual man. **He will be punctual later.**" | `ch3.js:544`, `:621` |
| | Takes Wren gently when he wins: "A gauntlet closes on Wren's good shoulder, **almost gently**." | `ch3.js:602` |
| | Reads the woken ward correctly and retreats without turning his back: "**Founders' work.** So. Not tonight, then." | `ch3.js:605-606` |
| | Threatens the Provost's life — "Hand over the boy, or the Provost hangs. The Envoy has her in the Great Hall with a rope over the beam." — and **on every branch the rope comes off anyway** | `ch3.js:543`; `:635`, `:644-645`; §12.39 |
| | Drawn at scale 1.15, forward of his line — the largest figure on the soldiers' side | art `js/art/scenes-ch3.js:120` |
| **Bess** | In the laundry. **Sworn to the Provost, thirty years** — a red oath thread. "**Nobody searches that room.**" On the Hearth she is only "the woman at the copper [who] **did not look up**" — complicit by inaction. She never speaks and is never named on the shared screen. | `companion/ch3.js:238`; `ch3.js:500` |
| | Drawn at scale 1.15, the **largest human figure in Chapter III**, at the stove, in the darkest figure colour | art `js/art/scenes-ch3.js:84-85` |
| **The porter** | **Unnamed in the shipped game.** "The porter, in his lodge off the north corridor. **New Crown gold, straight to the Envoy. He is paid to shout.**" A gold (coin) thread, dashed, with a coin at the far end. His heart runs fast. His four bought rooms are B5, C5, D5, C4. His only act: "A spyhole slides. A voice out of the lodge: '*Here! The boy!*'" | `companion/ch3.js:239`, `:143`, `:205`, `:242`; `ch3.js:116`, `:204` |
| | The name **Hob** exists only in `docs/DESIGN.md:152`, `:155` and `docs/STYLE.md:266`. **The source is authoritative: the porter is unnamed.** If Hob is wanted as canon, ch3 is where it has to be said. | §13.6 |
| **The mason** (E2 only) | Male. Carves a fifth name over the Hearth beneath the four Founders the morning after the Sealing. **He has to ask how to spell it, nobody in the room can spell it the old way, and the Reader does not offer.** What he carves is never said. | `ch8.js:332`; §12.40 |
| **Vane's soldiers** | Six in the Hall, two in the passage, four-plus-captain at the Tower, **nine on the stair**, four shielded at the chamber's edge, four carrying the cage in E4. They are the only figures in the game drawn with **shields**. Their threads are "gold, every one of them, **and none of it theirs**." | art `scenes-ch1.js:115`, `:130`; `scenes-ch3.js:118-119`; `scenes-ch5.js:110`; `scenes-ch7.js:84`, `:64`; `scenes-ch8.js:92`; `companion/ch5.js:342` |
| **Two unnamed Masters** | Branch `!SORREL && !VOTE_LOST`: "Two Masters whose price you would not pay watch from the edge." No line, no action, no consequence. | `ch7.js:62`; §12.41 |
| **The Gallery portraits** | ~200 painted Masters. They **mutter when the school is afraid**, and the Listener catches three words of it: "*four went down*." Their referent is never stated. Painted Masters cast no shadow "because paint has none." On the four oldest plaques, the letters are the ones from the dormitory door. Elsewhere they show "four going down the stair and four coming back." | `ch3.js:440`; `companion/ch3.js:228`, `:181`; `companion/ch5.js:310` |

---

## 10. RELATIONSHIPS — what is actually true between each pair

| pair | what is actually true | cite |
|---|---|---|
| **Marrow ↔ Wren** | She picked Wren up off the stones, named the child WRENN — a word meaning *hollow* — and raised it **to be loved enough to walk back in**. The love and the instrumentality are one act, not two. Her thread to Wren is **grey**, and has been for fourteen years: a goodbye already said before the child could talk. She calls Wren "the child" in speech and "**it**" in writing, and has never once finished the sentence "Who did —". She cannot spare Wren the last step: "The last of it is not mine to do." Wren calls her **Mum**, has known since the laundry, and gives her permission to confess. **No thread returns from Wren to Marrow** — not because Wren withholds it, but because until the night ends there is nobody on Wren's end to tie one to. | `ch6.js:691-692`; `companion/ch4.js:202-204`, `:264`, `:271`; `ch4.js:211`, `:217`; `ch2.js:396-397`; `ch6.js:629`, `:689`; `companion/ch8.js:126` |
| **Marrow ↔ Vane** | He knows what she is hiding and has for twenty-two years; he uses her given name in front of her own Convocation; the lever lands and the room cannot see it land but her face does. She answers his aim with her body: "The Crown will have the Cold open, one way or another." / "**Then the Crown will go through me. And through it.**" — the referent of "it" is never supplied and Wren fixates on it. She thanks the Crown formally when she wins and refuses the stair when she is losing: "Then the Envoy can ask the stair." On E3 she writes her last letters **on the back of his writ**. | `ch7.js:341`; `ch1.js:138-139`; `companion/ch4.js:213`; `ch4.js:524`; `ch1.js:230`; `ch5.js:490`; `companion/ch8.js:283` |
| **Marrow ↔ the four** | She sends four fourteen-year-olds under the school **tonight**, having visibly changed her mind about the timing mid-sentence. She stalls the Convocation for them, doses the lamps for them, buys them twelve turns with the bells, asks them for an oath and expects them to argue ("Read it. **Argue.**"), blocks the Walk because they asked her to, and yields to every argument including the non-argument. Her thread to them is **red and not yet tied** before the oath, red and knotted after, and **nothing at all** if they refuse. Her last advice is a confession in the imperative: *ask*, *listen*, *swear the next one to a person*. | `ch1.js:310`, `:178`; `ch3.js:445`; `ch4.js:355`; `ch7.js:386`, `:397-398`; `companion/ch4.js:264`; `companion/ch5.js:341`; `companion/ch8.js:196-198` |
| **Marrow ↔ Mere** | Marrow knows Mere's work in operational detail, admires her aloud three times, **breaks two of her four-hundred-year-old gates** in one night and apologises to her by name while doing it, and models her own refusal to choose on her. Mere's Book and Marrow's Book are **not the same Book**: "That is not in the Book I was given." | `ch5.js:265-266`, `:395`, `:480`, `:553`, `:399` |
| **Marrow ↔ the Convocation** | She sits in the Chair, files her KEEP in her own hand before the doors shut, and counts rather than hears. She has **never named the thing below to the nine** and is going down without telling them. Sorrel's price is explicitly aimed past her: "it comes to the nine of us. **Not to her.**" | `companion/ch1.js:94`; `ch1.js:69`; `ch4.js:592`; `ch1.js:255` |
| **Marrow ↔ Bess** | A red oath thread, thirty years old. Bess's room is the one nobody searches, and Bess does not look up when the children come through it. | `companion/ch3.js:238`; `ch3.js:500` |
| **Wren ↔ the four** | Wren conscripted them, named them, named the group, has known all four of their secrets for years, waves at them where waving is forbidden, escapes custody to follow them down, takes a fall and an arm for a box, asks each of them one private question and knows exactly who lied, thanks the liars anyway, coaches their protocol in six chapters, comes back up three flights in the dark to fetch them, and on the true ending writes each of them a letter that can be read exactly once. | `ch0.js:145`, `:226`, `:228`; `ch1.js:115`; `ch2.js:358-376`; `ch3.js:501-502`, `:530`; `ch5.js:288`; `companion/ch8.js:86-128` |
| **Wren ↔ the four (Thread-Sight)** | **No thread, in either direction**, all night — "not unbound. **The knot itself.**" On E0 and E2 a red one appears, because there is finally a Wren on the other end. | `companion/ch0.js:143-145`; `ch6.js:678`; `companion/ch8.js:126-128`, `:276` |
| **Wren ↔ the Listener** | The gift's one exception is Wren, from the role-select screen onward. The Listener has carried that as a private fault since before ch0. It is not a fault: "**It wasn't a fault in you. There wasn't one to hear.**" On E0 Wren hands them the one heartbeat they can finally hear, once, and the page burns. | `lore.js:7`; `companion/ch0.js:112`; `companion/ch8.js:94`, `:96`, `:158` |
| **Wren ↔ the Seer** | The only player who saw the shadow, hid it, and then told: "**You were the only one who saw it and didn't tell me, and then you did. Thank you for both.**" | `companion/ch8.js:112` |
| **Wren ↔ the Reader** | The Reader holds the name Wren cannot get said properly — first unreadable, then WRENN, then cut in a socket older than the alphabet. On E2 the Reader is the only person who can spell it for the mason **and withholds it**. On E0 the Reader keeps Wren's last three glyphs untranslated forever. | `companion/ch3.js:284`; `companion/ch4.js:202-204`; `ch8.js:332`; `:308` |
| **Wren ↔ the Binder** | The seat that reads bindings cannot say whether Wren is the one — the honest answer is DONTKNOW — and the seat that reads threads finds none. Wren's last instruction to them: "**Tie the others to each other. Tight. Then go and be tied to someone yourself, for once.**" | `lore.js:44`; `companion/ch8.js:191` |
| **Wren ↔ Vane** | He calls Wren "the boy" and "one child", never by name, and handles him gently when he wins. Wren absolves him too, brittlely: "Oh. No, it is fine. **He promised. People keep saying he keeps promises.**" Vane's **gold thread runs to Wren** and does so all night. | `ch7.js:315-316`, `:432-433`; `companion/ch2.js:169` |
| **Wren ↔ the Hearth** | Wren treats the fire as a person who can take offence — "Huh. It is smaller from down here. **Do not tell it I said that.**" — in a game whose reveal is that the fire is four people. Wren's shadow reaches for it in every room. | `ch6.js:473`; `companion/ch2.js:150` |
| **Wren ↔ Oriel** | She studied Wren all evening "like a sum she was doing." It is never resolved what sum. | `ch1.js:306` |
| **Vane ↔ the four** | He offers each of them, privately and individually, a mastership for Wren — addressed **by their real first name** — then publicly asks each accepter to keep or break it. He does not punish refusal; he prices it: "Then I will ask again later, **when it costs more**." | `companion/ch7.js:182`; `ch7.js:493-501`; `ch1.js:289` |
| **Vane ↔ the Convocation** | Twenty-two years ago he told them what was under the paint and they exiled him into the Crown's service. He now buys two of their seats and blocks a third. He calls it "**your Hall**" — to Marrow. | `ch7.js:341`; `ch1.js:41`, `:66`; `ch7.js:341` |
| **Vane ↔ his captain** | The captain knows the offer word for word but "cannot know how you answered", and is instructed to let the four go about it however they choose. | `ch3.js:393`, `:399` |
| **Sorrel ↔ Quill** | Quill is **sworn** to Sorrel — red, knotted, 2→1 — and votes as she votes unless asked himself. | `companion/ch1.js:141`; `ch1.js:42` |
| **Hallan ↔ Orrin** | Sworn, red, 4→6, **and they are cousins**. Hallan hears nobody else, by choice. | `companion/ch1.js:110`, `:142` |
| **Brack ↔ Marrow** | Pledged in writing, "with the Chair", before the doors shut — and then baits the four into spending an ask on him. | `companion/ch1.js:95`, `:109` |
| **Sorrel ↔ Oriel** | Rivals for the four's one promise. Whichever loses notices: "Oriel says nothing at all." / "**Sorrel does not forget.**" | `ch1.js:263`, `:266` |
| **Oriel ↔ the Order** | She knows what is under the paint because she took a bread-knife to it as a girl, and she watched **them** repaint it inside the week. She is the only Master with independent knowledge of the cover-up, and her price is to be told everything found below. | `ch4.js:588`; `ch1.js:256` |
| **the four ↔ each other** | Reader ↔ Listener carry an old red thread, well knotted, from before the game. Seer ↔ Binder carry a practice thread that will not hold. By ch6 all four are red to each other, holding; by ch7, knotted. On E0 the Binder ends up seeing "**four friends and nothing between them but air**" — and "it has never not held." | `companion/ch0.js:141-142`; `companion/ch6.js:269`; `companion/ch7.js:256`; `ch8.js:287`; `companion/ch8.js:237` |
| **the Founders ↔ each other** | Four abreast, evenly spaced, walking the same way — **except the second, whose head and arm go back for something that is not there.** One of them offered to go alone and was refused; one was never asked. | art `js/art/scenes-ch4.js:47-56`; `companion/ch4.js:62` |
| **the Order ↔ the Founders** | The Order paints one figure over four and takes the shadows out; strikes a Law rather than amending it; turns the statues off their own holes; bricks the road; and teaches a translation that substitutes one for four. | art `scenes-ch4.js:66-74` vs `:47-61`; `lore.js:57`, `:62`, `:66`, `:67`; `ch2.js:346` |
| **the Crown ↔ the Cold** | On ENDING 4: four pipes in the Cold's own colour run into the hall, the Hearth burns blue, Wren is caged at the exact spot where the fire used to be, and every thread in the hall goes Crown gold — "**including yours**." | art `scenes-ch8.js:76-90`; `companion/ch8.js:299` |

---

## 11. THE FIVE ENDINGS

They are computed at `ch7.js:239-247`:

```
if DECISION === 'VANE'  or  kept >= 2        -> 4   The Envoy's Bargain
if DECISION === 'WALK'                       -> 2   The Sealing
if DECISION === 'REFUSE'                     -> 3   The Keeper's Walk
w = roles with WALK_<r> === 'WALK' AND BARGAIN_<r> !== 'kept'
if w >= 4 and kept === 0 and BINDING_LANDED  -> 0   The Fourfold Walk
if w >= 2                                    -> 1   The Half-Walk
otherwise                                    -> 3   The Keeper's Walk
```

A **kept** bargain converts that player into a stayer regardless of their sealed WALK — "That key was
dead, and three hands wrote what four should have" (`ch7.js:50`; `ch8.js:84`, `:254`). A Fourfold
decision that falls short of two walkers **silently lands on the Keeper's Walk**, and the prose is
written for it (`ch7.js:771-776`). `WITH_HELP` — the Binding counted for the table — never affects the
ending (`ch7.js:819-823`).

**The five endings are five seal strengths.** That is the design's actual axis.

| | **0 — The Fourfold Walk** | **1 — The Half-Walk** | **2 — The Sealing** | **3 — The Keeper's Walk** | **4 — The Envoy's Bargain** |
|---|---|---|---|---|---|
| **what actually happens** | The four write COLD in the empty socket with four hands, Wren steps aside, and the four walk in | Two or three of the four walk (or four with one kept bargain); the glyph is written "thinner than it was meant to be" | Wren walks into the Hearth; "the fire takes the shape of a door" | Marrow walks; Wren stays and is given the Chair's seal | Nobody walks; Vane takes Wren |
| **cite** | `ch7.js:740-742`, `:756-759` | `ch7.js:762-764`; `ch8.js:254`, `:317-323` | `ch7.js:769`; `ch8.js:331` | `ch7.js:777-778`; `ch8.js:341` | `ch7.js:432-434`; `ch8.js:274`, `:353-357` |
| **the seal afterwards** | **Not held shut at all.** "for the first time in four hundred years it is not holding anything shut. It is simply a fire." | "The Cold closes. **Narrower than the Founders closed it.** Wider than it was an hour ago." | Four hundred years again, from a spark | "The seal holds. **Thin — the kind of hold that needs watching** — but it holds." | Not closed: harnessed. "By spring the Cold feeds the Crown's engines." |
| **cite** | `ch8.js:286` | `ch8.js:255`, `:319` | `ch8.js:331` | `ch8.js:342` | `ch8.js:355` |
| **what it costs the four** | **All four Sightings, permanently.** Grey-eyed and ordinary. | Walkers lose theirs; stayers **keep theirs and the fire for life** and become the school's Masters | Nothing. They keep everything. | Nothing (unless a sealed walker went) | Nothing taken — and everything: Sightings registered by the Crown, all four threads gold, posted to the Cold-works |
| **cite** | `ch8.js:287` | `ch8.js:320-321`; `companion/ch8.js:263` | — | `ch8.js:76-85` | `ch8.js:356`; `companion/ch8.js:207-208`, `:291`, `:299` |
| **what it costs Wren** | Nothing — Wren is spared, and **gains a pulse and a thread** | Wren lives, **no pulse**, shadow still falls toward the fire | Wren dies into the fire; a mason carves a fifth name over the Hearth | Wren lives, no pulse, becomes Provost of Thornhallow and inherits Marrow's habit of watching the fire instead of the people | Caged, taken; says nothing at all to any of them — "the worst thing Wren has ever done" |
| **cite** | `ch8.js:290`, `:311`; `companion/ch8.js:126` | `ch8.js:322`; `companion/ch8.js:203` | `ch8.js:331-333` | `ch8.js:343-346`; `companion/ch8.js:285-286` | `ch8.js:354`; `companion/ch8.js:298-299` |
| **Marrow afterwards** | **Not mentioned at all** (§12.30) | **Not mentioned at all** | Alive, bereaved: "stands at the fire with a thread nobody can see but the Binder. It is grey. It has been grey for fourteen years." | Gone into the fire. Does not say goodbye — "She has been saying it for fourteen years." Writes four letters on the back of the writ. | **Not mentioned at all** |
| **Vane afterwards** | **Not mentioned** (§12.30) | **Not mentioned** | **Not mentioned** | **Not mentioned** | Walks out of Thornhallow with Wren in a cage it takes four soldiers to carry; courteous about it |
| **Law 0, on the Binder's card** | **· WRITTEN — "Tonight it was."** | · RESTORED — "Tonight it nearly was." | · RESTORED — "It was not, tonight. It is still the Law." | · RESTORED — same | **· STRUCK, AGAIN — "The Crown struck it. The Crown does not need Laws."** |
| **cite** | `companion/ch8.js:309` | | | | |
| **the school** | Never addressed — it may no longer need a fire that reads (§12.30) | The stayers are "the Masters a school above you needs who can read the wall" | Continues; a fifth name over the Hearth | Continues; Provost Wren; the fire dips every winter and the fourth-years are told it is nothing | A garrison by spring |
| **art / mood** | `ch8_white` → `ch8_years`; triumph; the largest fire in the game (scale 1.7, white); five shapes at the window of a small house | `ch8_stones`; wonder | `ch8_stones`; sorrow | `ch8_flicker`; sorrow; the fire visibly gutters twice per 6.5 s | `ch8_cage`; dread; the Hearth burns blue, fed by pipes |
| **cite** | `scenes-ch8.js:30-38`, `:52-72` | `:40-50` | `:40-50` | `:96-106` | `:74-94` |

**What ENDING 0 actually means.** It is the only ending in which the thing the Order refused to pay in
212 is finally paid, by the right number of people, in the right way: four hands, one glyph, Law 0
restored and *enacted*. Its price is exactly the Founders' price. Its consequence is that the wound is
no longer being held shut by anybody — and the game does not treat that as a danger: "It is simply a
fire." It is also the only ending in which **Wren becomes a person**: a pulse the Listener cannot hear
and does not need to, a red thread with somebody on the far end, and five shadows — Wren's included —
finally falling *away* from the fire (`companion/ch8.js:106-108`). The Epilogue's closing image is
five shapes at a window.

**What ENDING 2 actually means.** It is the Order's reading coming true because nobody disproved it:
one born of four walks into the Cold and it closes behind them. It buys four hundred years, and it
buys them at the price the Order always intended somebody else to pay. The mason's fifth name is
carved beneath four names that mean the same thing.

**What ENDING 3 actually means.** Marrow does at last what she says she should have done fourteen
years ago, and the seal she makes is the weakest one that holds. It is also the Order's road run
again: one Warden down, alone — the 212 answer, with better motives. Wren inherits the Chair and the
habit of lying to the fourth-years.

**What ENDING 4 actually means.** Vane keeps every promise he made, exactly. The Cold is not closed
and is not meant to be: it is a resource. The four are Masters, as promised — "**Masters of ash**" —
and the Law is struck again, this time by a body that does not need Laws.

---

## 12. [UNDECIDED] — what the game does not settle

The author's decisions. Ordered by how much of the story hangs on them.

### Tier 1 — the load-bearing ones

**§12.1 What is a "wound in the world"?**
The phrase is used four times and never unpacked (`ch0.js:49`; `ch2.js:301`; `ch5.js:249`;
`glyphs.js:18`). Options: **(a)** a literal breach — somewhere the world is open onto something else;
costs a cosmology, buys a reason the Cold has a "sky" and thrones and a drowned hall. **(b)** an
*absence* — a place where warmth/being has drained out, exactly as the glyph's gloss says ("the space
left when warmth goes"); costs nothing, buys the Wren identity for free, but makes "closing" it odd.
**(c)** a made wound — somebody cut it; costs an antagonist older than the Order, buys the First Hall
and the thrones an owner. The art leans (a): an inverted sky, a cold sun, stars on the roof
(`scenes-ch5.js:69-70`). **Recommendation [PROPOSED]: (b) with an (a) skin** — it is an absence that
behaves like a place, which is what "a hollow" means and what Wren is.

**§12.2 Is the Cold sentient?**
One line: "**It knows. It always knows when somebody kneels here.**" (`ch6.js:486`). Options:
**(a)** yes, and it is somebody — costs the game a second character and invites "is the Cold a person
too?", which a player *will* ask one scene after being told the fire is four people; **(b)** no, and
Marrow speaks of it as an agent the way sailors speak of weather — costs the line its weight;
**(c)** it knows because **Wren** is it and Wren is standing there — costs nothing, buys the line
enormously, and is available for free given C15. **Recommendation [PROPOSED]: (c).**

**§12.3 Is the Convocation the Order?**
`lore.js:55` glosses era O as "Order"; `lore.js:57`'s note says the **Convocation** struck Law 0 in
212; `companion/ch6.js:233` labels Law 6 "**the Convocation's**"; `companion/book.js:122` labels every
212/340 Law "**Order's**"; `ch1.js:255` defines the Convocation as "the nine of us." Options:
**(a)** same body, two names (the Order is what the Convocation calls itself when it legislates) —
cheapest, and makes the nine Masters the direct heirs of the cover-up, which sharpens the ch1 vote
enormously; **(b)** the Order is a wider institution and the Convocation is its Thornhallow chapter;
**(c)** the Order succeeded the Convocation. **Recommendation [PROPOSED]: (a)** — and then §13.13 is
a one-word fix rather than a lore question.

**§12.4 Who was "never asked"?**
Mere's sheet names an excluded fourth party and the game never returns to it: "We were four. I offered
to go alone and was refused. **One was never asked.**" (`companion/ch4.js:62`). Note the arithmetic:
"we were four" and "one was never asked" cannot both refer to the same set unless there was a **fifth**
person, or unless one of the four went without being asked to. Options: **(a)** a fifth person
existed and was excluded — buys Mere's hidden door ("Mere left this one for **people who were not
asked**", `ch5.js:287`) an occupant and gives the Under-Marches' *five* arches (§12.26) a reason;
**(b)** one of the four was taken along without consent; **(c)** the excluded one is the Cold/what
became Wren. **Recommendation [PROPOSED]: (a)**, with the door as the payoff — it is the only line in
the game that already reads as an answer.

**§12.5 What is Wren, mechanically?**
The game asserts the identification COLD = Wren by juxtaposition (the eighth glyph, the eighth socket,
"It's me", the name, the four absences, the edge-lighting) and **never gives a mechanism**
(`ch7.js:697`; `ch8.js:499`). Options: **(a)** the Cold's own hollow, given a body during the one
night the fire was out — buys everything (no heartbeat, no thread, the shadow, the name, the socket
older than the alphabet, the pulse arriving only when four hands write the glyph); costs: it makes
Wren not-a-person for thirteen years, which is what Marrow's "**it**" already implies. **(b)** a child
the Founders left, or the fourth Founder's child, preserved — costs the socket and the shadow.
**(c)** an intentional artefact: someone made Wren. **Recommendation [PROPOSED]: (a)**, and then the
single missing sentence in the whole game is somebody saying it out loud once.

**§12.6 What year is it?**
Year 0, 212 and 340 are given; "four hundred years" is prose. The present is therefore ≈ Year 400+ by
inference only (`lore.js:64`; `ch0.js:61`; `ch6.js:702`). Deciding it costs one line and buys: the
distance from 340 (about sixty years — within living institutional memory), Vane's twenty-two years,
and Wren's fourteen all landing on a shared ruler.

**§12.7 Where do Sightings come from, and why four?**
Never stated (`ch0.js:241`). Options: **(a)** they are the Founders' four, still being dealt out — one
per Founder, forever, which is why there are exactly four kinds and why four hands can write COLD;
**(b)** a natural talent unconnected to the Founders; **(c)** the Cold's proximity makes them. **(a)**
is almost free: four Founders, four gifts, four bells, four thrones, four dials, four plinths, four
sockets in a lamp, eight sockets in a floor. It also answers §12.38 — each bell/throne/plinth is a
Founder, and each Founder is a Sighting. **Recommendation [PROPOSED]: (a).**

**§12.8 What happened in Year 340?**
The newest Law in the game, and the only one from 340, is the oath-lock Law ending "The one you swear
to cannot tell the difference." `340` appears in world content exactly twice (`lore.js:64`;
`companion/book.js:122`). Nothing says what happened, who was in the Chair, or why the Order suddenly
legislated about deceiving the sworn-to. **This is the richest unexploited date in the game**, given
that KNOT-vs-EMBER is the central private choice of ch4. Options: **(a)** a Warden swore KNOT and did
not go, or swore EMBER and pretended it was KNOT — the Law is the scandal's residue; **(b)** the 340
Convocation wanted its Wardens to be able to *appear* bound while retaining an exit, i.e. it is the
212 decision applied to people; **(c)** leave it blank. **(b)** makes the Order a consistent
character across 128 years.

### Tier 2 — reveals with no mechanism

**§12.9 What Thread-Sight's fourth state *is*.** The world table gives three colours (grey/gold/red,
`lore.js:9`); the Book adds a fourth that is not in any table and is the most important thing the
gift ever reports: "No thread — unbound; or, once, '**not unbound: the knot itself.**'"
(`companion/book.js:131`). What "the knot itself" *means* is never defined. Options: Wren is the point
all bindings pass through; Wren is a binding with no ends; Wren is what a thread is made of.

**§12.10 Who set the ladder?** `glyphs.js:27-29` fixes an order and a C-major pitch set, Founders'
Law 2 depends on it, and nothing says who set it, why ASH is 0, or why the inverted glyphs
EMBER/WELL/VEIL sit at 3/4/5 with CROWN above. The Listener's entire gift rests on an unexplained
scale.

**§12.11 Is the Founders' Tongue a spoken language or a script?** `ch0.js:61` calls it "a language
nobody has spoken for four hundred years"; every table treats it as carved shapes with glosses. And
it is **distinct from the older alphabet** (24 letters, no Q, no X, a plain substitution) that Marrow's
primer teaches — so there are two dead writing systems and the game never relates them.

**§12.12 Who compiled the Book of Laws and assigned the numbers?** The Binder only *keeps* it
(`lore.js:9`). The numbering is neither chronological nor grouped by era — Founders' Laws are
0,1,2,3,5,7,8,10,12,13; Order's are 4,6,9,11 — and the Book displays them sorted "By year"
(`companion/book.js:131`), so a player **will** notice. Options: **(a)** the Order renumbered the whole
book when it struck Law 0 — another act of institutional vandalism, and free; **(b)** the numbers are
fixed index slots in an older scheme. **Recommendation [PROPOSED]: (a).**

**§12.13 Does the Cold Ember still work after it falls?** "the blue light is brighter. Then it is not."
(`ch2.js:370`). Never answered. And it is **never invoked at the Finale**, where the fire actually goes
out (§13.10).

**§12.14 Why does losing the Cold Ember crack a bell on Mere's gate?** `EMBER_LOST` silently cracks
the second bell of the Silent Gate (`companion/ch5.js:27`, `:275`, `:301-302`) with no causal line on
any surface. Options: the Ember's presence sustains Mere's work; the bell is *made of* the same stuff;
it is a pure difficulty modifier and should be given a sentence.

**§12.15 Mere survived — and nobody notices.** She signs herself "who kept the fire, **after**"
(`companion/ch4.js:62`), which directly contradicts the prophecy's implication that the walker does
not come back. Marrow quotes her admiringly three times and never remarks on it. The Gallery portraits
("four going down the stair and **four coming back**", `companion/ch5.js:310`) corroborate it and sit
on one phone. Options: all four came back and burned later; they came back grey and *then* gave
themselves; only Mere came back. Deciding this decides what "the fire is only what they left behind"
literally means.

**§12.16 Who chalked Wren's name on the dormitory door — twice, one in an alphabet nobody teaches, in
the same hand?** `companion/ch0.js:99`. The strongest single clue in the Prologue and never answered.
Additional wrinkle: the Reader dates it to **a year ago** and Wren has been at the school fourteen
(`companion/ch2.js:121`). Options: Marrow (she wrote WRENN on the roll in the same letters, in her own
hand, `companion/ch4.js:203` — this is nearly free); Wren; the Reader themself and does not know it.

**§12.17 "Same ink, same hand, two hundred and twelve years apart."** The Binder's ch6 figure asserts
that one hand wrote a Year-0 Law and a Year-212 Law (`companion/ch6.js:120`) and nothing follows it
up. Options: a deliberate forgery by the 212 Convocation (writing its new Law in the Founders' hand);
someone who lived through both; a scribe's house style. The first is free and makes 212 worse.

**§12.18 Marrow's "They could not afford four Masters, so they made it grammar."** (`ch7.js:396`)
"They" has **no antecedent in the scene**, and the two readings mean opposite things: the Founders
wrote Law 0 loosely enough to be later read as grammar, or the Order of 212 struck it and replaced it
with a rule about writing. `companion/ch6.js:286` supports the second.

**§12.19 Who built the lid?** The bell-chamber floor is a **manufactured object**: 28 rivets, a
cross-brace, a central hub, worked iron (`js/art/scenes-ch6.js:31-38`). Somebody built a lid for the
Cold and the game never says who, when, or with what.

**§12.20 Who built the shaft, and who cast the bells?** The shaft is ringed radial masonry putting the
Hearth **directly above the lid's centre** — an engineered sightline from the fire to the seal that
nobody in the game mentions (`scenes-ch6.js:94-95`). The four bells are "the Founders' own" pattern
rung on *these* bells, and their provenance is never given (`ch6.js:579`; §12.38).

**§12.21 How does Wren know things only one seat can perceive?** Before any of the four speaks, Wren
names the lamp's hum (which "nobody else in this room has ever heard", `companion/ch0.js:104`), the
cuts under the brass "nobody has ever seen", and the ring rule "nobody else was taught" —
`ch0.js:172-174` — then "Yes. All four of you. **I've known for years.**" `ch0.js:226`. **The narration
never marks this as strange and nobody in the fiction asks.** Options: **(a)** a Wren anomaly
(consistent with §12.5(a): the hollow is in every room); **(b)** Wren has watched them for seven
years; **(c)** an oversight. If (a), one line of narration after `ch0.js:226` — noting that nobody
asked how Wren knew, and nobody will — converts the game's largest unearned moment into its first
plant. **[PROPOSED]**

**§12.22 Who prepared the ring, and how did Marrow know to?** "The ring has been ready for fourteen
years." (`ch7.js:367`) — of a four-hundred-year-old Founders' floor. "Ready" implies work. Nobody
asks. Related: Wren's name is cut into its eighth socket in letters older than the alphabet
(§12.5), so either Marrow found it fourteen years ago or she made the floor ready around it.

**§12.23 Did Marrow and Vane know about each other's scraping?** Both scraped the same paint decades
apart, in the same building (`ch7.js:341`, `:394`), and the two scenes **can co-occur in one
playthrough** (`ch7_wall` → `ch7_attune` → `ch7_decision` → `ch7_argue1`). Neither acknowledges the
other. A reaction line here is free and missing.

**§12.24 The Great Sigil's meaning is written and withheld.** The phrase glosses as "four-as-one, to
close; a gate, a going-down; the Hearth, behind; the one, and the hollow" (`ch7.js:130`) — **in a
source comment only.** The table solves an eight-word sentence *about themselves and Wren* and is
never told what it says, where ch6 printed the Founders' reading from the glosses. A one-clause
`solvedText` fix. **[UNEARNED] in reverse.**

**§12.25 The four thrones and the drowned First Hall.** Whose thrones, why empty, why the hall is
drowned, whether the Founders sat in them. Wren's "It is a *theme*" is the only comment
(`ch5.js:347-349`). The art raises the stakes: the thrones are **above** the waterline and the hall
is below, so something raised them or drowned it after the fact (`scenes-ch5.js:64-67`).

**§12.26 Why five arches?** Everything else underground is four. The First Hall has five
(`scenes-ch5.js:64`). Pairs naturally with §12.4.

**§12.27 Wren's gender.** Only Vane and his men assign one. Options: **(a)** diegetic — the narration
declines a pronoun because Wren is not, until the end, a person of whom one is true; **(b)** a
table-facing courtesy so any player can hold Wren however they like; **(c)** an accident. (a) and (b)
are compatible and cost nothing; (a) makes E0's pulse land harder. But §13.4 must be fixed either way.

### Tier 3 — smaller, still worth a ruling

| § | question | cite | note |
|---|---|---|---|
| 12.28 | **What is "the Provost's version" of Wren's name?** Wren asks for the meaning "properly. Not the Provost's version" — the Provost's version is never given anywhere. | `companion/ch3.js:284` | The obvious candidate is "a small brave bird" — which is the Reader's *bluff* option (`companion/ch3.js:285`). If Marrow has been telling Wren that for fourteen years, the bluff becomes a quotation and the scene doubles in weight. **[PROPOSED]** |
| 12.29 | **How does Wren know Mere's door, its maker and its purpose**, and descend three flights in total darkness to fetch the unsworn? | `ch5.js:287-288` | Either a Wren anomaly or an unremarked convenience; the game does not distinguish. |
| 12.30 | **The institutions vanish at dawn.** Vane's fate on E0–E3 is never mentioned; Marrow is absent from E0, E1 and E4 — including the ending that supersedes her fourteen-year plan; the Convocation, the Order, the nine Masters and the eight seats never reappear; who staffs the school on E0 is never said. | `ch8.js:283-349`; §11 | The single largest hole in the Epilogue. |
| 12.31 | **What word does Marrow use to force Mere's last ward** — "a word that costs her something"? | `ch5.js:475` | Never named. |
| 12.32 | **Why does the Crown want Wren specifically** rather than the Cold? And what does Vane do after he stands down? | `ch1.js:136`; `ch7.js:342` | "Safekeeping" is not a motive; `VANE_ALLY` removes him from the fiction entirely while his soldiers are still on the stair. |
| 12.33 | **Can the Crown take a Sighting?** E4 registers each one and posts the four to "the Cold-works" without ever saying what the Cold-works do with a Sighting. | `companion/ch8.js:291` | |
| 12.34 | **How does Vane know each player's real first name?** The private letter is personalised with `ctx.name`. | `companion/ch7.js:182` | Never established in-world. |
| 12.35 | **Vane's seal is `#8a2f2f`, exactly Redmoor's House colour.** Either Vane is Redmoor-born — a fact nothing else touches, and Redmoor is the seat Vane's soldier blocks — or it is a palette collision. | `scenes-ch1.js:117` vs `:14` | Worth a ruling; if deliberate it is very good. |
| 12.36 | **"the Marches" vs "the Under-Marches"** — the relation is never established in prose. | `scenes-ch8.js:52`; `map.js:78` | |
| 12.37 | **Whose signature is the notch?** Two cuts "by two different hands"; "a notch is only a signature"; never named. **Idony is the obvious candidate — Law 7 is hers and it governs this exact ring — and her name appears nowhere in the chapter that teaches her Law.** | `companion/ch7.js:219`, `:230`; `lore.js:70` | Nearly free, and it would be the only time a Founder besides Mere is named on screen. |
| 12.38 | **Which throne, bell, dial or plinth belongs to which Founder?** Four of everything, none matched to a name. And bells crack **left to right**, so the Reader's lane always breaks first — never explained. | `scenes-ch5.js:66`; `scenes-ch6.js:83`, `:73`; `scenes-ch2.js:68` | Pairs with §12.7. |
| 12.39 | **Was the Provost's hanging ever real?** The captain threatens it; she was at the bell-rope minutes earlier and is in her study minutes later; and **on every branch** "the rope came off the beam an hour ago." The chapter's harshest choice (`SURRENDERED`, −2 `WREN_TRUST`) is undercut in the very next scene. | `ch3.js:543`, `:445`, `:635`, `:644-645` | The clearest undercut beat in the game. |
| 12.40 | **What does the mason carve, and in which alphabet?** He must ask how to spell it; nobody can spell it the old way; the Reader withholds it. The Reader's Book says the old-alphabet form is **WRENN**, a different string. | `ch8.js:332`; `book.js:75` | |
| 12.41 | **Which two Masters watch from the edge**, and what do they do? No line, no action, no consequence. Sorrel is never named in the Finale at all. | `ch7.js:62` | |
| 12.42 | **What was Marrow going to "show you"?** "The stone over your heads says one born of four. **Tonight I stop arguing and show you.**" Nothing is shown in Chapter I. | `ch1.js:124` | |
| 12.43 | **Whom would she have sent?** "In the morning I would have sent — no. Tonight. I am sending you tonight." | `ch1.js:310` | And why four fourteen-year-olds rather than adults. |
| 12.44 | **Why is Marrow back early, "and does not say why"?** Explicitly flagged and never answered. | `ch4.js:607` | |
| 12.45 | **What does "And through it" mean?** Marrow to Vane, recovered by the memory-bell; Wren fixates on it. The referent is never supplied anywhere. | `companion/ch4.js:213`; `ch4.js:524` | The chapter's strongest hook, unpaid. |
| 12.46 | **Why does a four-hundred-year-old unlit lamp hum continuously?** And who made its two foot-cuts, and what are the other two sockets for, if "there is no third word and no fourth"? | `companion/ch0.js:104`, `:107`, `:117-118` | |
| 12.47 | **Why does carving WREN make the lamp flare BLUE?** Blue is the Cold's colour in the palette, and the moment is never remarked on. | `ch0.js:169`; `scenes-ch0.js:7` | An excellent free plant if kept; also §13.14. |
| 12.48 | **Why is there a gold ring cut into the dais where Wren stands?** It predates the night and marks a place for exactly one person. Ch1's prose never mentions it. | `scenes-ch1.js:95-96` | |
| 12.49 | **Why does a heartbeat pulse under every one of Mere's gates**, at 1.1 s, in a game whose central tell is a missing heartbeat? | `scenes-ch5.js:98` | Never referenced. |
| 12.50 | **Why was the tapestry painted over but not the bell-chamber's wall carving?** The same image is forged upstairs and stands open, uncovered, four hundred years old, in the Finale's own room. | `scenes-ch4.js:66-74` vs `scenes-ch7.js:55-60` | Answerable in one line: nobody the Order could send goes down there. |
| 12.51 | **Why does the Founders' Door carry eight ticks for a four-dial lock?** The Great Sigil's geometry, in Chapter II, with no gloss. | `scenes-ch2.js:82-83` | |
| 12.52 | **Who is the Tower ward's sworn keeper?** The Binder's rule turns on "the keeper sworn to it" and the keeper is never identified. | `companion/ch3.js:265` | Compounded by §13.8. |
| 12.53 | **Why does the Fourfold Walk give Wren a heartbeat?** Asserted twice and never explained, by narration or by any character. | `ch8.js:290`; `ch7.js:758` | The best candidate answer is §12.5(a) + `companion/ch8.js:126`; nobody says it. |
| 12.54 | **What happens to the Hearth when the spark goes out at midnight?** "Simply gone" / "Nothing you have done is undone", and twenty minutes later "The Hearth roars white" and "four hundred years of fire, again, from a spark." The Cold Ember is never invoked. | `ch7.js:681`, `:684`; `ch8.js:311` | See §13.10. |
| 12.55 | **What does the Chair's seal mean when a fourteen-year-old non-Warden receives it?** | `ch7.js:778` | |
| 12.56 | **What are the portraits' "four went down" about** — the four Founders, or the four players tonight? The ambiguity is never acknowledged. | `ch3.js:440` | Almost certainly deliberate; worth confirming as deliberate. |
| 12.57 | **Why do Vane's men say "the boy" while the narration says only "the child"?** Likely deliberate; nothing in the game confirms or remarks on it. | `ch3.js:204` vs `ch2.js:180` | Pairs with §12.27. |
| 12.58 | **What did the party promise Oriel, exactly, and what happens when she is told?** "You promised her everything you found below. **She has come to be told.**" — the scene ends there. | `ch2.js:390` | |
| 12.59 | **Why is the Cold Ember behind a handleless door and yet in a case with no ward and no click?** | `ch2.js:337` | |
| 12.60 | **What legal force does the writ have**, such that a school vote overrides a royal one? Why nine seats and five keeps? What was the Vigil convened to decide before Vane arrived? | `ch1.js:146`, `:181` | Three questions, one missing paragraph. |
| 12.61 | **Why does Vane expect Marrow to have Wren back by morning** on `VOTE_LOST`, when the vote went his way? | `ch1.js:280` | He is right — she does (`ch3.js:438`). How does he know? |
| 12.62 | **What is the Seer/Binder "practice thread that still will not hold"** — practice for what? | `companion/ch0.js:142` | |
| 12.63 | **"Nobody remembers Wren saying that."** A narration-level assertion about the party's memory, with no receipt anywhere in the game. | `ch5.js:605` | Reads as a plant; pays off nowhere. |
| 12.64 | **What a cracked bell physically is**, and why a *spoken misreading of the stone* cracks one — "Above you a bell takes the wrong word, and cracks" — and why a crack mutes a Binding lane in ch7. | `ch6.js:769`; `ch7.js:641` | A causal chain asserted three times and never explained. |
| 12.65 | **What the Sealing actually is.** Marrow says "I can close this wound", then "It is held. Not closed — held. The last of it is not mine to do." The game never says what she did, what remains, why only Wren can finish it, or whether she is walking the Founders' road or the Order's. (The answer exists only in `docs/DESIGN.md:86`, which is not in the game.) | `ch6.js:487`, `:629` | |
| 12.66 | **Why four hands for the bells?** "nothing holds it but the old pattern, rung on these bells by four hands" is the only statement. The bells demonstrably need reflexes and a page of numbers, not Sight; the stone needs all four Sights. Nothing acknowledges the asymmetry. | `ch6.js:487` | |
| 12.67 | **The Second Asking is never resolved for the table.** Wren confirms each truth and nothing says what the four are supposed to *do* with knowing Wren has no heartbeat, no shadow, no thread and a name meaning hollow. The inference is left entirely to the player. | `ch6.js:688` | Deliberate? If so, say so; if not, one line. |
| 12.68 | **The chamber's light.** "Then the chamber goes dark. Not the lamps. There are no lamps. **The light simply stops.**" The source is never named before or after. | `ch6.js:593` | |
| 12.69 | **What the oath actually says.** The scroll is "the words she said before she went out"; the game never prints them. What the four literally swore is reconstructible only as a glyph-gloss: ASH, THORN, WELL + a chosen lock = *fire; a gate; down;* and either *bound* or *what remains*. | `ch4.js:610`, `:624`; `companion/ch4.js:196-198` | |
| 12.70 | **The dormitory lamp's age.** "older than any record the school keeps" vs "Four hundred years. Still works." vs "four hundred years of polish" — the lamp is exactly as old as the institution. | `ch0.js:78`, `:214`; `companion/ch0.js:117` | Either the school's records start later, or the line should change. |

---

## 13. [CONTRADICTION] — where the game disagrees with itself

Ordered by how much of the story rests on the resolution. Each entry quotes both sides, cites both,
and names the side the rest of the game depends on.

### §13.1 The Vigil is tomorrow, and the Prologue says tonight — **the timeline**

> `js/content/ch0.js:133` — "**Later tonight** you will do this for real, against a clock, and it will cost something."

against

> `js/content/ch0.js:67` — "The masters come in the morning to argue about it. **Tonight is only the night before.**"
> `js/content/ch0.js:242` — "**Tomorrow** you will stand at the back of a hall while grown-ups decide about Wren."

The reaction puzzle occurs exactly twice in the game: `ch0.js:131` (practice) and `ch6.js:538` (the
Bells), which runs on the Vigil night — **more than twenty-four hours later**. Chapters 1–8 all run on
that one night (`ch1.js:310` "Tonight. I am sending you tonight.").
**The rest of the game depends on the Vigil being the next day.** `ch0.js:133` is the line to change.

### §13.2 "Nobody alive has read the cuts" — but the Reader reads any worn carving

> `js/content/ch0.js:62` — "**Nobody alive has read the cuts.** Every child here learns the school's translation, and every grown-up here argues about it."

against, fifteen lines later

> `js/content/ch0.js:146` — Wren: "Reader — you read everything and eat nothing. **Any carving, however worn.**"
> `js/content/companion/ch0.js:86` — "The Hearth shows them worn to nothing. **On your page they are clean.**"
> `js/content/lore.js:6` — "Inscriptions the Hearth shows faded are clean on your page."

The game establishes a character who can read any worn carving and then demonstrates it on the lamp,
having just said nobody can read the stone. The art dodges it by drawing the stone as grooves and soot
rather than glyphs (`js/art/scenes-ch0.js:66-70`) and ch6 supplies a *physical* reason — four of the
eight cuts are **burnt away**, not worn (`scenes-ch6.js:7-10`) — but **no line of prose ever says the
stone is unreadable *to the Reader*, or why.**
**The rest of the game depends on the burn**, which is a good answer arriving six chapters late.
The fix is one clause in ch0: the stone is not worn, it is *burnt*, and burnt is not the Reader's
problem to solve. **This is the single largest logical hole in the game and it sits on its central
mystery.**

### §13.3 The scratch rule reverses between ch4 and ch5, on objects of the same class

> `js/content/companion/ch4.js:257` — "The Provost's scroll is **Founders' work**. It is not a Vigil ward like the Tower door — so **a sigil begins at the scratch**, and runs the way a clock counts, the same rule as the lamp."
> `:258` — "On Founders' work **a notch is only a maker's mark**."

against

> `js/content/companion/ch5.js:330` — "**These two doors are older than that Law, and they do not keep it.** On the first gate the sigil begins at the **chip**. On the second it begins at the **notch**. **A scratch on a Founders' door is only where the mason rested the tool.**"

Both objects are Founders' work — the scroll explicitly, and Mere's gates are a Founder's own wards,
"four hundred years old" (`ch5.js:333`). The game never dates the scratch rule, never says the scroll
is younger than Mere's doors, and gives the Binder no criterion for telling one Founders' object from
another; as shipped the Binder is simply handed the right answer for each ring.
**Both halves are load-bearing and neither can be dropped**: ch4's oath check derives from
`OATH_SCRATCH` (`ch4.js:168`, `:177`); ch5's gates derive from `startKind` (`ch5.js:113`, `:117`,
`:164`). Compounding it: **the scratch rule has no dated Law behind it at all** — the Book contains
only Law 1, "A sigil is read sunwise from the mark" (`lore.js:58`) — which is exactly why it is
unarbitrable from inside the game (§12 note). A dated Law, or a stated criterion, fixes both.

### §13.4 Wren's pronoun

> `js/content/companion/ch8.js:195` — Marrow, to the Reader: "Read **him** the name properly, one day."

against

> `js/content/companion/ch5.js:290` — the Reader's page: "The Vigil roll in your Book still spells **her** name *Wrenn*… **You have never asked her.**"

and against the house convention, which every Hearth line in the game keeps: Wren is referred to by
name only, with no pronoun ("There is a pulse in Wren's throat", "Wren visits", "Wren's shadow").
Vane and his soldiers say "the boy"/"he" and are the only in-fiction voices that assign a gender.
**The rest of the game depends on the pronoun-free convention** — see §12.27. Both companion lines
should be rewritten; they contradict each other *and* the house rule.

### §13.5 WREN vs WRENN — the spelling that carries the meaning is the one the climax will not take

> `js/content/companion/ch4.js:202-204` — the Vigil roll renders the name **WRENN** and glosses it "Not a bird. ***Wrenn* is the hollow of a bell** — the space inside it that makes the sound."
> `js/content/companion/book.js:75` — "the Vigil roll spells it **WRENN** in the older alphabet: *the hollow of a bell; the space that rings*."

against

> `js/content/ch7.js:704` — the code the table must type at the climax is `code: 'WREN'`.
> `js/content/companion/ch7.js:241` — the word in the eighth socket "is **Wren's name**."
> `js/content/lore.js:25` — ch8's attunement word is `WREN`.

Either the socket bears a different spelling from the roll, or the climax accepts the wrong spelling
of the game's most load-bearing word. **The rest of the game depends on `WREN`** — it is a chapter
code in a world table and an attunement checksum — so WRENN is the outlier; but WRENN is the outlier
that carries the meaning. Cleanest resolution **[PROPOSED]**: the socket bears WRENN, the Reader says
so, and the table types WREN because that is what the Hearth asks for — i.e. make the difference
*diegetic* and let the Reader be the one who notices it.

### §13.6 Is the Tower ward Founders' work or Vigil work?

> `js/content/ch3.js:444` — Marrow: "There is a ward on the door of the Bell Tower, **older than the school**."
> `js/content/ch3.js:488` — NARRATION: "The Tower door, iron-bound, **older than the wall around it**."
> `js/content/ch3.js:605` — the captain: "**Founders' work.** So. Not tonight, then."

against

> `js/content/companion/ch3.js:264-265` — the Binder: "The dormitory lamp was Founders' brass, and a Founders' sigil begins at the scratch. **This is not one.** … A **Vigil** ward is cut by the keeper sworn to it, and on a Vigil ward the keeper's mark binds."

A Vigil ward is by its name the school's own and **cannot be older than the school**. The captain's
misattribution is never corrected; Marrow's claim is never reconciled; the ward's sworn keeper is
never identified (§12.52).
**The rest of the game depends on the Binder's version** — the accepted board is derived from
`CUTS.notch` running widdershins (`ch3.js:340-346`). Options: "Vigil" names something older than this
school (a prior order of keepers); or Marrow and the captain are both simply wrong, which is
interesting and free if one line says so.

### §13.7 Does Wren have a thread, or not?

> `js/content/companion/ch2.js:166` — "**Wren:** the same nothing, for the fourteenth year running." — drawn with the *absent-thread* glyph, `threadLine('none')`.

against, on the same page and the next chapter's

> `js/content/companion/ch2.js:169` — "**Vane's gold still runs to Wren**, so he has not left the school."
> `js/content/companion/ch3.js:275` — "There is one you have never let yourself follow: **the one from the Provost to Wren**."
> `js/content/companion/ch4.js:271` — "A thread reaches Wren from the woman who named her. **Nothing comes back.**"

The reconciliation the text wants — **threads reach *toward* Wren but none originate *in* Wren** — is
stated once, in ch4, and never in ch2 or ch3, and the `none` glyph beside "Wren" actively argues
against it. A careful Binder will ask at the table and ch2 has no answer.
**The rest of the game depends on the ch4/ch8 version**: "It wasn't that there wasn't one. It's that
**there wasn't a *me* on the other end to tie it to.**" (`companion/ch8.js:126`). Fix ch2's glyph or
ch2's sentence.

### §13.8 Law 0 and Law 6 have two different texts, on two tabs of the same phone

> `js/content/lore.js:57` — Law 0 · Founders' · Year 0 — "**COLD is written by four hands.**"
> `js/content/lore.js:67` — Law 6 · Order's · 212 — "COLD is never written; where an inscription shows it, leave the slot empty."

against

> `js/content/companion/ch6.js:232` — Law 0 — "**Read a line as the cuts count down. Every cut says its other word.** COLD is written by four hands."
> `js/content/companion/ch6.js:233` — Law 6 — "**Begin at the mark and read as the cuts count up. A cut says the word it stands for.** COLD is never written."

The Binder's **Book** tab renders the `lore.js` version (`companion/book.js:123-128`); the **Sight**
tab shows the three-clause version. A player who has studied the Book all game has been reading a
shortened Law — and **the ch6 prophecy-stone puzzle turns on exactly the clauses the Book omits.**
The extra clauses also silently duplicate Law 10 (`lore.js:63`) and Law 5 (`lore.js:65`).
**The puzzle depends on the three-clause version; every other appearance of the Book depends on the
one-clause version.** Either move the clauses into `lore.js` or make ch6 cite Laws 10 and 5 by number.

### §13.9 "the Convocation's" vs "the Order's" — same Law, same phone, two institutions

> `js/content/companion/ch6.js:233` — "Law 6 · **the Convocation's** · Year 212"

against

> `js/content/companion/book.js:122` — "Every Law is dated: Founders' (Year 0) or **Order's** (Year 212 or 340)."
> `js/content/lore.js:56` — era `'O'` = "Order".

`lore.js:57`'s own note says the **Convocation** struck Law 0 in that same year. See §12.3; this is a
one-word fix once the author rules.

### §13.10 Four bells hang; ch8 counts three

> `js/content/ch6.js:470` — "**Four bells** hang from a beam of black iron, each the height of a person."
> `js/content/ch6.js:299` — "A bell is cracked. {c} **of four**." / "Three bells cracked. The lid holds on the pattern alone now."
> `js/content/ch6.js:875` — "The **four bells** came through whole."

against

> `js/content/ch8.js:176` — "**Three bells to keep whole.** You cracked {n}."

Reconcilable only through `ch6.js:165`'s `Math.min(3, …)` — one bell can never crack — which **the
prose never states**, and which ch6's own "Three bells cracked… the pattern alone now" implies without
explaining. **The rest of the game depends on ch6's four** (the art draws four,
`scenes-ch6.js:82-83`). Either say why one bell cannot crack, or change ch8's line.

### §13.11 The Hearth goes out at midnight, and then relights

> `js/content/ch7.js:681` — "the spark goes out. **Not guttering, simply gone.**"
> `js/content/ch7.js:684` — "**Nothing you have done is undone.**"

against

> `js/content/ch7.js:756` — ENDING 0: "**The Hearth roars white.**"
> `js/content/ch8.js:311` — "**four hundred years of fire, again, from a spark.**"

If the fire can go out entirely at midnight and roar white twenty minutes later, the fire's mortality
— the premise of the whole night (`ch1.js:309`: "**If the fire goes out, the Ember lights it again**")
— is unpriced. **The Cold Ember, the object the game spent a whole chapter on, is never invoked
here.** The rest of the game depends on the fire being mortal. See §12.54, §12.13.

### §13.12 "The rest is never carved" — restating the Order's Law as the world's

> `js/content/ch8.js:493` — "The eighth is the rest. **The rest is never carved.**"
> `js/content/ch8.js:499` — the eighth card is captioned "**never written**".

against

> `js/content/ch6.js:827` — the Founders' own prophecy stone, whose eighth physical cut reads **COLD**.
> `js/content/lore.js:57` — Law 0: "**COLD is written by four hands.**"
> `js/content/companion/ch8.js:309` — ch8's own Binder card on ENDING 0: "**· WRITTEN / Tonight it was.**"

"COLD is never written" is **Law 6, the Order's, Year 212** — the rule the climax exists to overturn.
The Epilogue's summary line restates it as though it were the world's, one scene before the Binder's
card celebrates its overturning. **The rest of the game depends on Law 0.** The fix is one word:
*the rest is never carved* → *the Order said the rest is never carved*, or *the rest is carved by four
hands or not at all*.

### §13.13 "once called someone Mum by accident"

> `js/content/ch8.js:346` — "Wren, **who once called someone Mum by accident**, looks at the fire when it flickers."

against at least four uses, at least two of them unmistakably deliberate:

> `ch0.js:233` (branch) "**Mum** — the Provost — will hate that." · `ch4.js:770` "They said *no*, **Mum**." · `ch5.js:287` "**Mum** will pretend she did not see." · `ch6.js:689` "And — **Mum.** I know."

`ch6.js:689` is the emotional centre of Chapter VI. **"Once" and "by accident" are both false.**

### §13.14 Marrow cannot know the lock, and does

> `js/content/lore.js:64` — Law 4 (Order's, 340): "An oath's last glyph is its lock… **The one you swear to cannot tell the difference.**"

against

> `js/content/ch7.js:387` — Marrow: "**You swore under KNOT**, and it cannot be unbound."

`ch7_argue1` fires only when the oath really was KNOT (`ch7.js:375`), so she is right — and the game
never says how. The Binder's own page states it flatly rather than as a secret ("**You swore under
KNOT, to the Chair.**", `companion/ch7.js:232`). Options: the Binder told her; Law 4 is a lie the
Order tells its Wardens (which is *very* in character, §12.8); she is bluffing and happens to be
right. **The rest of the game depends on Law 4's last clause** — it is the whole weight of the ch4
choice.

### §13.15 COLD is written twice on the true path, diluting Law 0's restoration

> `js/content/ch7.js:587` refuses the cold word **only when `WALK_UNLOCKED` is false**; hint 4 (`:615`) actively invites it: "**COLD may go in the empty one, by four hands.**" `ch7.js:164` then makes an occupied-with-COLD socket compare equal to an empty one.

against

> `js/content/ch7.js:695-696` — "The ring is full but for one socket." / "**It is never written.**"
> and `ch7_fourhands` then writes it again (`:740`), under the banner "Law 0. **Restored.**" (`:726`).

A table that took hint 4 has already written COLD once, been told "The ring warms. Every word, once."
(`:596`), and is then told the socket is empty and COLD is never written. **The rest of the game
depends on the climax being the first writing.**

### §13.16 Two "unsworn" states are collapsed, and the game cannot tell them apart afterwards

> `js/content/ch4.js:730` — a **failed closing** writes `OATH 0`, `OATH_KNOT false`, `REFUSED_OATH true` — identical to an **outright refusal** (`:617-618`). The file says so: "The world state is the same as a refusal — nobody swore" (`:728-729`).

But Marrow's on-screen reaction differs (`ch4.js:765-769`), and so does Wren's. From ch5 onward the
game cannot distinguish "they refused Marrow" from "the wax went cold." **Every epistemic table must
treat `REFUSED_OATH` as *unsworn*, not as *refused*.** Compounding: `oathReceipt` is module-scope
(`ch4.js:196`, `:715`), so after a reload the explanation of *why* the ring failed silently
disappears while the flags it wrote persist.

### §13.17 `LAW0` is restored by a Chapter I promise

> `js/content/ch4.js:85` — `Store.set('LAW0', !!(f.LETTER_READ || f.TAPESTRY || f.ORIEL));`, mirrored at `ch5.js:8`.
> The file flags itself: "`ORIEL` is the ch1 promise rather than `ORIEL_NOTE`, **which looks wrong** — but the two files must agree, so it is a report item, not an edit." (`ch4.js:82-84`)

Effect in fiction: **merely promising Master Oriel something in Chapter I restores a struck Founders'
Law to the Binder's Book at T7** — without reading Mere's sheet, scraping the tapestry, or even
finding Oriel's note. No line of prose covers that route; the Binder's page simply flips
(`companion/ch5.js:333`). **The largest unexplained causal jump in the game.** The in-fiction repair
is nearly free — Oriel *knows*, she scraped the paint as a girl, so a promise to her plausibly earns
a note back — but nothing says so.

### §13.18 The Book promises Mere's sheet "from here on" and delivers it a chapter later

> `js/content/ch4.js:498` — "The grey smear you took below comes clear. **It will be in your Book from here on.**"

against

> `js/content/companion/ch4.js:71` — the sheet renders only when `ctx.maxChapter >= 5`.

The reason is documented (`companion/ch4.js:36-61`: no ch4 cast bit can carry `LETTER_READ`; ch4's six
bits are full) and the ask is called impossible. It is still a promise the phone does not keep in the
chapter that makes it.

### §13.19 The Tower ward's accepted board — two stale comments publish the wrong sigil

> `js/content/ch3.js:249` — "Exactly one passes: **ASH in 4, THORN in 1, KNOT in 2, slot 3 empty.**"
> `js/content/ch3.js:258` and `companion/ch3.js:258` repeat it.

against the code that actually runs

> `js/content/ch3.js:340-346` — `WIDDERSHINS = true`, derived from `CUTS.notch = 4` stepping −1: **{ 4: ASH, 3: THORN, 2: KNOT }, slot 1 empty.**

The hint (`:587`) and the check (`:385`) both use the derived `RING`. **The code is right; two long
comments and one phone line are stale.** Any document built from the comments publishes the wrong
sigil. *This document uses ASH 4, THORN 3, KNOT 2, slot 1 empty.*

### §13.20 The Binder's wrap rule is inert, and backwards

> `js/content/companion/ch3.js:267` — "When the count runs off the end **it comes back to slot 1**."
> `js/content/ch3.js:311-312` — "The mark sits at slot 4 **so the count wraps**."

With `WIDDERSHINS = true` starting at slot 4 the run is 4 → 3 → 2 and **never wraps**; and running
widdershins off slot 1 would arrive at slot **4**, not slot 1. Both are leftovers from a sunwise
version. Player-facing, and it tells the Binder the wrong direction.

### §13.21 ECHO disagrees with the canonical whisper-truth map, for exactly one role

> `js/content/ch6.js:327` — `ECHO = { seer:'TELL', listener:'NO', reader:'DONTKNOW', binder:'**YES**' }`

against

> `js/content/lore.js:44` — `whisperTruth = { reader:'DONTKNOW', listener:'NO', seer:'TELL', binder:'**DONTKNOW**' }`

Consequence: a Binder who told the truth in the laundry (DONTKNOW) is **scored truthful** by ch8
(`ch8.js:96`, `:175`) and gets ch6's *non-echo* callback; a Binder who said YES is scored untruthful
and gets the warm one. **`lore.js` is the canonical table** (it is the one the Epilogue counts, and
`tools/check-content.js:99-104` guards it).

### §13.22 The Binder's laundry question is not the question re-asked

> ch3 laundry (Binder): "Do you think **I'm really the one**?" — YES / DONTKNOW `companion/ch3.js:294`
> ch6 Second Asking (Binder): "You see the threads. **Do I have one**?" `ch6.js:673`

while `ch6_held` frames the Asking as the *same* four questions: "In the laundry I asked each of you
one question about me… **I am asking again.**" (`ch6.js:632-633`). The other three do repeat. The
chapter papers over it with a pun ("You said yes, to the one person with none.", `ch6.js:332`).

### §13.23 The Hearth is in three places at once (Chapter I)

> `js/content/ch1.js:180` — the vote board: `center: 'the Hearth'`, the nine seats in a ring **around** it.
> `js/art/scenes-ch1.js:68-70` — the Hearth at the **far end** of the hall under an arch, banners down the two side walls.
> `js/content/companion/ch1.js:49-51` — the Seer's under-layer, **explicitly a plan view**, draws the Hearth at the **top** of the room with the seats in a ring below it.

The board is abstract and forgivable; the Seer's page is a plan view and disagrees with the art.

### §13.24 "It has never once gone out. / Except one night, fourteen years ago."

`js/content/ch0.js:51-52`. The narration asserts and retracts an absolute in consecutive sentences.
Read as deliberate rhetoric it works; as written it is a contradiction in two lines. (Marrow's
`ch1.js:309` "It has not done **that** in fourteen years" is about *flickering* and is consistent.)

### §13.25 Quill's line is mechanically false

> `js/content/ch1.js:62` — Quill: "I vote as Seat 1 votes. **You spent that on nothing.**"

against `tally()` (`ch1.js:55`): asking Quill **does** flip him to KEEP. `{quill, oriel}` scores four
keeps — one better than not asking him. The line is true only when Sorrel is the other ask, and
nothing frames it as a boast or a lie.

### §13.26 Sorrel knows the plan before Marrow has made it (win path)

> `js/content/ch1.js:255` — Sorrel, seconds after the vote: "**When the Provost sends you down for it**, it comes to the nine of us."

against

> `js/content/ch1.js:310` — Marrow, after the hall empties: "In the morning I would have sent — no. **Tonight.** I am sending you tonight."

Marrow visibly changes her mind about the timing *after* Sorrel has predicted both the errand and the
couriers. Clean on `VOTE_LOST`, where Marrow names the Ember first (`ch1.js:245`).

### §13.27 Remaining contradictions, in brief

| § | contradiction | both sides | which the game depends on |
|---|---|---|---|
| 13.28 | **The Cold Ember is introduced twice on `VOTE_LOST`** | `ch1.js:245` "Then bring me the Cold Ember from under the school" vs the shared `ch1_after` at `:309` delivering it as if new | `ch1_after` is shared by both branches; the second delivery should be conditional |
| 13.29 | **"the nine of us — the Convocation. Not to her."** Marrow is seat 9 and one of the nine (`ch1.js:36`) | `ch1.js:255` | Intended as "to the body, not the Chair personally"; as written it excludes a ninth of the nine |
| 13.30 | **Where Wren is during Vane's offer (`VOTE_LOST`)**: taken away (`ch1.js:243`), expected back by morning (`:280`), and on the step between two soldiers later the same night (`:301`) | three lines | Recoverable as "taken into custody within the school"; never stated |
| 13.31 | **The laundry is asserted unconditionally.** `ch3_grid`'s `next` is always `ch3_whispers` ("You came through the laundry in the dark", `ch3.js:500`), but a legal 12-move route to E5 exists that never enters B3 | `ch3.js:493`, `:500` vs `ch3.js:102` | The comment's "every one passes through the laundry" (`ch3.js:48-49`) is scoped to the **412 safe** schedules only |
| 13.32 | **ch4's phone assumes an optional ch2 line was seen**: "the Hearth said 'four, as one, went through' in Chapter II" | `companion/ch4.js:109` vs `ch2.js:319`, which fires only on `CH2_STRIP='right'` | A table that took the Ember and left is never told it by the Hearth |
| 13.33 | **The ch5 Binder's figure draws Law 11 as STRUCK.** Only Law 0 carries `struck: true`; Law 11 is live and merely *outranked* | `companion/ch5.js:128`, `:130` vs `lore.js:57`, `:66` | "Struck" and "outranked" are different states everywhere else |
| 13.34 | **The Seer's ch4 plate says "three cuts in this room, and nothing else"** while showing the shelf board's **end mark** plus a scratch and a notch — and ch5 explicitly forbids that conflation: "The word 'mark' means… the end of the carving — **and never a cut in the ring**" | `companion/ch4.js:128` vs `ch5.js:44-46` | ch5's vocabulary |
| 13.35 | **Law 8 vs Law 6 on one phone page.** "Eight sockets, eight words, no word twice" vs "where the phrase shows the cold word, that socket stays empty" — only **seven** words are ever written and `check()` accepts `filled === 7` | `companion/ch7.js:231` vs `:233`; `ch7.js:586` | Half-acknowledged at `ch7.js:566-569` |
| 13.36 | **The Sigil's free-exception comment contradicts its code.** The comment promises that "under the oath only, a lawful ring left unturned" is free; `chargeRing()` is called **before** that test, so it costs the full escalating price | `ch7.js:578-581` vs `:588-590` | The code |
| 13.37 | **When the Reader decided they had misread it**: "a year ago… it was a spelling mistake. You have never asked her." vs "in the study, that you had misread it. You have never misread anything in your life." | `companion/ch4.js:205` vs `companion/ch7.js:241` | Different time, object and accusation; ch7's is the one that makes the Reader's self-image the point |
| 13.38 | **The grey thread's age**: "grey **since before you were born**" vs "It has been grey for **fourteen years**" — and Wren is fourteen | `companion/ch7.js:257` vs `ch8.js:333` | Both true only if the players are **under** fourteen, which sits badly against them swearing oaths and being offered masterships. ch8's line is the one the Epilogue's arithmetic rests on |
| 13.39 | **Where the paint is.** Vane: "under the paint in **this hall**" (ch1); ch4 puts the tapestry in the **study**; ch7 says "under the paint **in the study**" and Vane says "I stood in **your Hall** with that paint under my nails"; and ch7 adds a **third** sooted image on the bell-chamber wall | `ch1.js:138`; `ch4.js:1`, `:261`, `:306`; `ch7.js:338`, `:341`, `:303` | Three surfaces, one reveal. Vane's ch7 line reconciles his own; ch1's "this hall" cannot be reconciled without a second painted surface the game never shows |
| 13.40 | **"Four clues in the bell-chamber, and the fire helped. You caught {n}."** `{n}` is `CLUES` (Second-Asking answers) but `CLUES_HELP` is set by hints spent on the **stone** — and ch6 calls the same number "You **gave Wren** {n} of the four answers **Wren already had**". Nothing was caught. | `ch8.js:174` vs `ch6.js:338`, `:816`, `:878` | ch6's framing |
| 13.41 | **"Twice tonight, each of you chose alone and told nobody."** Three sealed per-player channels ran: whisper (ch3), hold (ch5), finale (ch7) | `ch8.js:392` vs `lore.js:32-36` | The ch5 hold is genuinely private and ch8 itself honours that privacy on the phone (`companion/ch8.js:227-228`) |
| 13.42 | **ENDING 4: "nothing about the fire has changed at all"** vs its own art, which draws the Hearth in **cold blue** fed by pipework, and vs "The Hearth is a furnace with a schedule" four scenes later | `ch8.js:275` vs `scenes-ch8.js:82` and `ch8.js:355` | The two prose lines reconcile ("it still burns; the horror is that it doesn't care"); the art does not |
| 13.43 | **ENDING 1 with four walkers prints contradictory lines**: "Stayed on the stones: **nobody**" immediately followed by "**Not every hand went in.**" — reachable when `BINDING_LANDED` is unset | `ch8.js:253-254`; `ch7.js:244`, `:750` | |
| 13.44 | **The Book pre-announces ch6's correct answer.** "No thread — unbound; or, once, '**not unbound: the knot itself**'" is ungated and visible from Chapter 0; it is the exact wording of ch6's right option | `book.js:131` vs `ch6.js:678` | Every comparable Book entry is gated by `maxChapter` (`book.js:75`, `:84`, `:87`); this one is not |
| 13.45 | **`NEITHER` is overloaded.** It is forced true on `VOTE_LOST` without the prices scene ever playing, so downstream code cannot distinguish "refused both Masters" from "was never offered a price" | `ch1.js:275`; guarded by hand at `ch1.js:91` | |
| 13.46 | **Law 0 is "restored" twice.** ch6 sets `LAW0` unconditionally and announces "Binder — the struck Law is back in your Book" — but it may already have been true since ch4, and the phone's card may already read RESTORED | `ch6.js:814`, `:853` vs `ch4.js:85`, `ch5.js:244`, `companion/ch6.js:175` | No branch guards the line |
| 13.47 | **The Prologue's flow card promises branches it does not have.** "the Hearth shows you every path — the ones you walked, **and the ones you did not**" against a single unbranched chain of eight nodes | `ch0.js:243` vs `ch0.js:33-42` | Chapter I's graph *does* branch (`ch1.js:83-104`); the Prologue's does not |
| 13.48 | **`ch3_bell4` is a flow node with no scene.** Any document enumerating scenes from the flow graph will invent one | `ch3.js:416`, `:427` vs the scenes block at `:431-658` | |
| 13.49 | **`MIDNIGHT_LEFT` is printed as "to spare" even when midnight passed** — `ch7_cold` sets it to 0 and ch8 renders any non-null value as "m:ss to spare" | `ch7.js:679` vs `ch8.js:101` | A table that finished in the dark is told it had 0:00 to spare |

### §13.50 Contradictions internal to the art, and art-vs-code

| § | contradiction | cite | ruling |
|---|---|---|---|
| a | **The Finale never shows a cracked bell.** Four whole bells are drawn in every ch7 scene; `artP` passes only `{ally}`. A table that cracked three bells sees them healed for the whole Finale | `scenes-ch7.js:16-18`; `ch7.js:57` | Exactly the bug `scenes-ch6.js:57-68` documents and fixes one chapter earlier |
| b | **The Great Sigil's ring never lights while it is being solved.** `ch7_ring` takes `p.lit`; only `ch7_end` passes it | `scenes-ch7.js:100`, `:146` | Through the whole eight-glyph puzzle the sockets stay dark: placing a glyph produces no change in the room |
| c | **The eye-glint is never grey.** The helper documents "grey for the spent"; every caller passes gold — including the four on the stones, whose prose is "**grey-eyed** and ordinary" | `scenes-ch8.js:24` vs `:47`, `:48`, `:104`; `ch8.js:287` | **The one visual difference the true ending turns on is documented and not drawn.** Highest-value art fix in the game |
| d | **The Sealing draws Wren standing on the stones.** `dress()` calls `setArt` with no params, so E2 renders `ch8_stones` with Wren present at `ch8_start` — under the text "Walked into the fire: Wren" — and again at `ch8_end` | `ch8.js:120`, `:238`, `:529`; `scenes-ch8.js:48` | Only the middle scene passes `{noWren:true}` |
| e | **The Sealing and the Keeper's Walk share one picture, and it is Wren's.** Endings 2 and 3 both render `ch7_ring({lit:true})`, whose only figure is the small cold-ticked one at the ring's centre — correct for the Sealing, wrong for the Keeper's Walk, where Marrow walks and Wren stays | `scenes-ch7.js:146`, `:102`; `ch8.js:342-347` | One param |
| f | **`ch8_flicker` is captioned as Marrow's and used as Wren's.** "The **Provost's** fire, flickering… one figure keeping it" — used for E3, whose prose is "**Provost Wren** of Thornhallow keeps a fire that flickers". The figure is drawn adult-scale with a **gold** edge, breaking Wren's otherwise perfect cold-blue signature | `scenes-ch8.js:96`, `:104` vs `ch8.js:339`, `:345` | Defensible as "Wren, grown"; the comment names the wrong person |
| g | **Half-Walk always draws exactly two walkers**, whatever the prose names | `scenes-ch7.js:128` vs `ch8.js:317-322` | Picture and text disagree in two of three cases |
| h | **Ten runes or eight cuts?** The same 400×110 slab carries a rotating ring of **ten decorative runes** in the wide shot and a row of **eight worn cuts** in every close-up. `P.rune` is explicitly not a glyph | `scenes-ch0.js:24`, `scenes-ch8.js:22` vs `scenes-ch0.js:77`, `scenes-ch1.js:72`, `scenes-ch6.js:100`, `:144`; `art.js:42` | `ch1_hall` already shows the cheap fix |
| i | **The lamp's geometry does not match its prose.** "Four brass sockets around **the foot**. Two shapes cut around **the collar**" vs art that puts the sockets on the collar and the two shapes floating above the head. Also "It flares **blue**, once, and dies" — `ch0_lamp` has no blue state | `ch0.js:200`, `:169` vs `scenes-ch0.js:104`, `:108` | |
| j | **"Nothing here is derived from WEST or EAST, and neither array exists any more."** Both arrays are alive and load-bearing | `scenes-ch7.js:37` vs `ch7.js:140-141`, `:151`; `companion/ch7.js:27-28` | True of the art file only |
| k | **`ch2_map` is dead code that asserts canon** — it names Thornhallow, "THE FOUNDERS' ROAD · CONTINUES", "BRICKED · 212", the Great Hall, the Vault and four thrones, and is deliberately never rendered | `scenes-ch2.js:112-144` | **No downstream document may cite it as something the player sees** — only as authorial intent about the world's geography |
| l | **The comment at `scenes-ch7.js:35` names the wrong phone** — "book.js prints the shape-to-word lexicon on the **Listener's** phone"; it is the **Reader's** Book. (The Listener's Ladder does render all eight shapes, so the argument survives) | `scenes-ch7.js:35` vs `book.js:69-72`, `:89-92` | |
| m | **Dead art parameters, each a state the art is ready to show and the story never reaches**: `ch3_corridors`' `p.cold` (a cold-lit patrol) is never passed; `ch3_towerdoor` supports `ward:'cold'` and only ever receives `'ash'`; `ch5_gate` supports `n===3` and only ever receives 1 or 2 | `scenes-ch3.js:62`, `:93`; `scenes-ch5.js:90` | |

### §13.51 Source vs `docs/DESIGN.md` — **the source wins, every time**

`DESIGN.md` is stale in at least thirty places. The ones that would corrupt a canon document if
copied:

| # | `DESIGN.md` says | the shipped game says |
|---|---|---|
| 1 | `:132` Four statues, left to right **Mere, Halvard, Rook, Idony**, each facing its dial | `scenes-ch2.js:66-68` `names = ['1','2','3','4']`, "No name, no shape, no mark"; `ch2.js:205` "numbered one to four". **Only Mere is ever named, on an optional path.** |
| 2 | `:157-158` **Physical books 1–8**; pull **1, 3, 6, 4** | `ch4.js:116` `SPINES` has **six** entries; `:143` `SHELF_ANSWER = 2,5,4,1`; `:376`, `:387` "Six great books", "Six books, six places" |
| 3 | `:151` a **two-glyph** threshold sigil on the Tower door, ASH@1 THORN@2 | `ch3.js:560-561`, `:576` "**Three shapes** cut into the arch. Below them, **four sooty slots**", `allowEmpty: true` |
| 4 | `:214`, `:218`, `:219`, `:216` the Finale's walls, base solution, KNOT rotation target and two marks | all four different in `ch7.js:129`, `:140-141`, `:143`, `:161-162` — see §7.5 |
| 5 | `:213` a **shield** system on the Finale | removed; `ch7.js:58-59` says so, replaced by one `arrival()` line |
| 6 | `:209` **Master Tarn** leads the Convocation's guards in the Finale | Tarn does not appear anywhere in ch7 |
| 7 | `:121` **Sorrel holds the guards at the stair** in the Finale | `SORREL` is read only inside a negated conjunction (`ch7.js:62`) and she is never named |
| 8 | `:215` the Listener holds **the full Hymn** as steps | the Listener gets **only the first interval**, +1 (`companion/ch7.js:210`) |
| 9 | `:112` the Reader gets **the decoded seat list — nine names with nine gifts** | the Reader gets only the filed roll (seats 9 and 3); `companion/ch1.js:10` forbids it: "**No page lists all nine as people.**" |
| 10 | `:113` "**Orrin votes opposite Brack**" | no opposition mechanic exists; `BLOCKED=['orrin']`, `FOLLOWS={quill:'sorrel', hallan:'orrin'}` |
| 11 | `:152`, `:155` **Hob** the porter, at C5, with a spyhole on the Seer's map | the porter is **unnamed**; the lodge was deliberately removed from the Seer's map (`companion/ch3.js:56-58`) |
| 12 | `:155` Bess's laundry is **safe** | `safe: ['A1']` — "the gallery, and nothing else" (`ch3.js:197`). B3 is undetectable *by construction*, but the bounce target after a sighting is A1, and that difference is the chapter's whole budget |
| 13 | `:103` the Binder's Prologue seed is "**not unbound; the knot itself**" | the shipped Prologue line is "nothing. No thread at all, to anyone"; **the phrase "the knot itself" does not exist before ch6** |
| 14 | `:105` the Prologue flowchart is "one lit node, **six grey branches** fanning out" | eight nodes, one straight line, no branches |
| 15 | `:172`, `:177` both ch5 gates are "**5 slots**" | the art draws the *inscription*, not the ring — three panels at Gate 1, five at Gate 2; **no picture of either ring's size is ever shown** |

---

## APPENDIX A — the branch flags, and what each actually changes in the world

| flag | set | world consequence |
|---|---|---|
| `VOTE_LOST` | ch1 `:212` | Wren is taken by the Houses and retrieved by Marrow personally before midnight (`ch3.js:438`); Marrow names the Cold Ember first; Vane's offer is reworded; `NEITHER` is forced |
| `SORREL` / `ORIEL` / `NEITHER` | ch1 `:261-268` | `SORREL`: a Convocation writ spendable at the Tower door, and her guards take the Ember (`EMBER_LOST` forced). `ORIEL`: her note in Marrow's chair, **and by itself restores Law 0** (§13.17). `NEITHER`: Marrow's unsent letter becomes reachable |
| `VANE_ACCEPT` / `VANE_PRETEND` | ch1 `:288-292` | ACCEPT: the four are themselves bought (`companion/ch3.js:236`); a `word` option at the Tower door; a warmer Vane in ch7; suppresses Marrow's letter. PRETEND: a `bluff` option |
| `LETTER` | ch2 `:324` | the rubbing exists → `LETTER_READ` in ch4 → **Mere's sheet is translated** → Law 0 |
| `EMBER_LOST` | ch2 `:366`, `:383` | cracks the second bell of Mere's Silent Gate (§12.14) |
| `WREN_HURT` | ch2 `:372` | Wren's arm; every hidden door in ch3 costs an extra turn; colder, franker whisper prompts |
| `WREN_SCARED` | ch3 `:234` | a fourth bell rang; **Wren stops joking** for the whole of ch4 |
| `SURRENDERED` | ch3 `:553`, `:596` | Marrow's cold open; "After tonight I will decide what you are"; her heartbeat runs fast |
| `DOOR` | ch3 `:550-553` | FIGHT wakes the ward (and tells the soldiers where to look, `ch5.js:492`); WRIT/WORD/BLUFF talk the captain past |
| `TAPESTRY` | ch4 `:554` | the Order's overpaint is off the wall for the rest of the game, and restores Law 0 |
| `OATH` 0/1/2, `OATH_KNOT` | ch4 `:730`, `:735` | KNOT: Marrow touches a shoulder; she bars the Walk in ch7 and must be argued past; the whole Great Sigil rotates by Idony's Law. EMBER: reconsiderable, and she cannot tell. 0: she goes alone with the child |
| `LAW0` | ch4 `:85`, ch5 `:244`, ch6 `:814` | COLD may be written: at the Silent Gate, and in the Finale's empty socket |
| `STAIR`, `VOLUNTEER`, `HOLD_NOBODY` | ch5 `:538`, `:570` | COLLAPSE pre-cracks a bell; HOLD spends one named seat's Sighting until Marrow ties it off; RUN brings the soldiers to the bell-chamber |
| `BELLS_CRACKED` 0–3 | ch5/ch6 | mutes one Binding lane per crack in the Finale |
| `WALK_UNLOCKED` | ch6 `:814` | **the Fourfold Walk exists**; COLD becomes placeable; the finale question set gains a second axis |
| `STONE_TOLD` | ch6 `:815` | the Finale's night drops from 900 s to 780 s — the only cross-chapter bite in the retry economy |
| `VANE_ALLY` | ch7 `:332` (ch7 only) | deletes Vane's ending, the bargain, the letter and one figure from the art |
| `DECISION`, `WALK_<role>`, `BARGAIN_<role>` | ch7 | determine `ENDING` (§11) |
| `WREN_TRUST` | ch1 `:213`; ch3 `:235`, `:519`, `:553` | **buys exactly two words, on one ending**: "Wren visits, *in the end*." (`ch8.js:310`) — and its threshold treats net-zero as warm |
| `GROUP_NAME` | ch0 `:231-234` | the name Wren uses for the four in every crisis line thereafter |

**Flags written and never read anywhere**: `CH1_APPROACHED`, `CH2_DOOR`, `CH2_VAULT`, `CH2_NICHE`,
`CH2_STRIP` (ch2-local only), `SLOW_NOTED`, `COLD_HEARTH_ATTEMPTS`, `WITH_HELP` (written, never
consulted by `computeEnding`). **Consequence for canon: finding Mere at all, and counting the
Founders' Door open rather than crawling in through the rebuilders' gap, change nothing after
Chapter II ends** — the game's richest discovery, a named Founder and a corrected prophecy, has no
mechanical footprint (`ch2.js:153-156`, verified by grep over `js/`).
