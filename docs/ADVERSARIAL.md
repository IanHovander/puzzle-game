# How to attack a chapter

`docs/STYLE.md` says how to write one. This says how to break one, and it is the more useful of the
two, because every defect below was found by attacking a chapter that had already been written to the
style and had already passed its own review.

18 and 19 were added by the whole-game sweep; between them they accounted for six of its fifteen
blocking findings, and both are now checked by a tool rather than by a reader.

Nineteen patterns, every one of them taken from a real defect in this game, with the chapter it was
found in. They share a shape: **each is invisible from inside the chapter it lives in.** A reviewer
reading one chapter against its own sources will pass all seventeen. That is why they are written down.

Two of them (13 and 16) are not about the game at all. They are about how the checking goes wrong,
and they are the ones to read first.

---

## 1. Hint rung 2 sells a role's private fact
Found in ch4 (both puzzles) and ch3 (the ring). docs/STYLE.md R10.22 says rung 2 is
"the insight, in the abstract -- names the trick with no coordinates". In practice rung 2
is often a declarative statement of one role's exclusive fact, so a three-role table simply
buys the seat it is missing for the price of a hint.
CHECK: every `hints:` array in every chapter. Rung 2 must not state any fact that appears on
exactly one Companion page, and must not name a slot, a room, a seat number or a glyph.

## 2. The Hearth draws or prints a fact that lives on one phone
Found four times now, in four different disguises:
  - ch0: the lamp art drew the two answer glyphs above the lamp
  - ch3: the Tower door art drew two glyphs that read out as the ring's answer
  - ch3: the ring's wrong-answer lines named which slot was cut, and which way the run went
  - ch4: the tapestry art stamped the Seer's count across it; the scroll drew the answer words
CHECK: every js/art/scenes-chN.js for legible glyphs; every `wrongText`, keyed wrong-answer
line, `successText`, status line, HUD and `alarm.text` for a fact that is supposed to be private.

## 3. An answer that collides with something printed permanently in the Book
ch4's shelf answer was the exact worked example on the Listener's Book page (book.js:87) and
its word set was the one the Reader's Book names (book.js:73). A Listener-less table could
lift it straight off a shared page.
CHECK: every puzzle answer and every ladder contour against js/content/companion/book.js.

## 4. A wrong answer that costs nothing
ch3's ring had no tries limit; ch3's door words were free in unwatched rooms; ch4's chair
corner has unlimited free retries. A subset with six candidates and free retries has solved
the puzzle. Any drop-a-role count above 1 is only meaningful next to the cost of being wrong.
CHECK: every puzzle for maxTries / a timer / a spent resource, and state the cost on the card.

## 5. Test scripts that cannot see the property they exist to protect
ch3's leak-closers (revealPatrols:false, safe:['A1']) could both be reverted with every script
still green; the grid solver ended a run at the first sighting, which is not what the widget
does. A guard that cannot fail is not a guard.
CHECK: mutation-test the load-bearing config of each chapter -- flip it, and if the suite stays
green, the suite is wrong.

## 6. Flowchart nodes that spoil what follows
ch8_night prints node labels for reveals that have not happened, because they lack secret:true.
CHECK: every flow node whose scene is a later reveal.

## 7. A cost that four-handedness leans on, held outside the save
ch5 priced guessing with `gateFrost`, a module-local `let`. The game ships a Resume path and a
paste-save-code path that both call location.reload(), which erases it -- so the one thing making a
narrowed field expensive was free after a refresh.
CHECK: every counter a puzzle's difficulty depends on. If it is not in Store.state.flags, it does not
survive a reload and it is not a cost.

## 8. An answer set that gives itself away by elimination
ch5's Founders' Count used the digits 3, 5, 2, 4 -- a permutation of {2,3,4,5}. Any three roles could
hand the fourth its digit without holding it. The same trap applies to any puzzle whose answers are
drawn from a set the table can see the shape of.
CHECK: every multi-role answer where each role holds one component. If the components are distinct
members of a small guessable set, the last one is free.

## 9. A puzzle re-using an earlier chapter's board
ch4's oath ring used ch3's exact cut positions (scratch 4, notch 2), so a table that had just solved
ch3 knew where the sigil began and the Seer's seat was free.
CHECK: every ring, grid and lock across chapters for repeated coordinates, cut positions and orders.

## 10. A derived value shadowed by a hardcoded literal
ch4 read the oath's lock out of the board as the literal slot 3 while everything around it was derived
from OATH_SCRATCH. Right by coincidence until the scratch moved; then a table that swore under KNOT was
told EMBER, and OATH/OATH_KNOT -- read by ch5, ch7 and ch8 -- were written wrong.
CHECK: grep every chapter for literal slot/room/index numbers next to a derived constant.

## 11. A role's "private" fact that an earlier chapter taught the whole room
The biggest one. ch5 leaned the Binder's whole seat on "which kind of cut begins a sigil" -- but
companion/ch0.js:132 and companion/ch4.js:225 both put that rule on the Binder's page as a thing to say
out loud, and ch4.js:626 prints "You began at the notch" on the Hearth in front of everyone. By ch5 the
room has been taught it twice. A fact is only private on its FIRST use; after that it is table knowledge.
CHECK: for every puzzle, take each role's exclusive fact and grep the earlier chapters -- Hearth text,
art, wrong-answer lines and every OTHER role's Companion page -- for the same rule. If an earlier chapter
taught it, the seat is free and the puzzle needs a different axis, not better wording.
Corollary: a rule the house protocol asks a player to SAY ALOUD is public from that moment on.
THE WORST INSTANCE, found by the whole-game sweep and invisible to every one of the six chapter
agents: ch3's Tower ward gave the Binder a page that was, WORD FOR WORD, the Binder's PROLOGUE page --
begin at the scratch, a notch is only a maker's signature, run clockwise. The dormitory lamp is worked
on the shared screen and cannot be solved without the Binder saying that rule out loud, and its
answer ({3:ASH, 4:EMBER}, scratch at 3) resolves BOTH bits in front of everybody. Measured against the
shipped `wardCheck`, a Binder-less table applying what the tutorial taught them faced a field of ONE
board and took the door every time -- p = 1.000, where the chapter's own comment recorded four boards
and p = 0.250. The seat was free for the whole of Chapter III.
Note what this means for a TUTORIAL specifically: teaching a rule spends it. A tutorial that works a
mechanic on the shared screen has made that mechanic public for the rest of the game, and every later
chapter that prices a seat on it is over-valuing that seat. That is not a reason to weaken the
tutorial; it is a reason for the later chapters to hold an EXCEPTION rather than the rule. ch3's ward
is a Vigil ward and begins at the notch, and the accepted board did not move by a single word -- so a
table that confidently applies the Prologue's rule now lays a full, lawful-looking WRONG board, which
is the same shape ch0's own lamp, ch4's oath and ch7's Sigil already use.
Two more instances from the same sweep, both in js/core rather than in a chapter, and both of the
"lists all nine chapters" kind: the Menu printed every chapter's TITLE from the Prologue (seven things
nobody had met, two of them the ending), and the Map of the Night gated its labels but drew every
chapter's PICTOGRAM anyway -- the bell, the spiral stair, the crossed circle, the rising sun. Whatever
enumerates the whole game is where this hides.

## 12. A guessable window narrower than the answer budget
ch5's Founders' Count went from digits {2,3,4,5} (a permutation, solvable by elimination) to 3,5,3,4 --
three distinct values spanning {3,4,5}, against a ward that allows three answers. Three values and three
tries is not a puzzle. The receipt ("the ward counts 3 digits true") then confirms the rest for free.
CHECK: for every puzzle, compare the size of the field the remaining roles can SEE against the number of
submissions allowed. The field must be wider than the budget, and a partial-credit receipt narrows it.

## Both of these are now CLOSED — kept for the record
- **ch5's Founders' Count. Closed.** The open note was right that better digits could not save it: one
  digit per role means a drop-one table always faces ten candidates against three answers, whatever
  the digits are. So the ward stopped asking for one digit each and started asking each seat TWICE --
  eight digits, typed as one number, in seat order, and the two counts on a page are counts of
  different things, so neither gives the other. The receipt counts SEATS, not digit positions, which
  was the other half of the defect: a per-position receipt confirmed on submission one every digit the
  table already held. Measured against the shipped `accept()`: every drop-one row is now p = 0.030
  against three answers, where two of them were 1.000. Stated honestly, the "it lies between the
  others" heuristic is worth p = 0.115 on two of the four seats, because two pairs do sit inside the
  span of the other three and it was not possible to put all four outside it.
- **ch4_secrets' 292 words. Closed, and it was never a chapter defect.** `tools/prose-count.js` filed
  every string by the nearest `key:` above it, so the four corners' typed answers, wrong-answer lines
  and successTexts were all counted as the scene's own brief. The scene's text is 40 words. The
  scanner now owns a key's whole value expression through a frame stack. The same bug had ch6_round1
  at 82 words against a 65-word cap when its brief is 47. Every puzzle brief in the game now passes
  R1.4 on its worst single branch, the widest being ch5_gate1 at 57.

## 13. Drop-a-role tested against the convenient strategy, not the real one
ch6's round three was declared four-handed after testing exactly two strategies for a missing page,
one of which was "that lane stays silent". A player with no list does not sit still: they press on
every beat, or on every beat a neighbour presses, or on whatever number the Listener calls. Under
those the round passed without three of the four pages.
CHECK: every drop-a-role claim must name the strategies searched. At minimum: press/answer everything,
mirror another role, follow the one public signal, and do nothing. The claim is only as strong as the
worst strategy tried.

## 14. A budget that caps, and then stops charging
ch6 priced a wrong reading in BELLS_CRACKED, which caps at 3 -- so every reading after the third was
free, and a table arriving with three already cracked paid nothing at all. It was also the same
counter two different puzzles spent, so one puzzle could exhaust the other's cost.
CHECK: every cost must still bite at the margin, and no two puzzles should share one counter unless
that is the design.

## 15. A puzzle whose genre contradicts its information design
ch6's round three was rebuilt three times to be informationally four-handed and leaked a different
way each time. The leak is the genre, not the build: reaction.js answers every event as it happens
(hit plays Audio.sfx('key', lane), miss plays Audio.sfx('miss')), so a player with no list learns
their own beats by pressing, and the bells audibly ring anyway -- which IS the Listener's fact.
CHECK: before demanding an information partition of a puzzle, ask whether the widget's own feedback
loop already answers the question the partition is meant to protect. A real-time widget that scores
per event cannot keep a per-event secret. Make it a reflex round and say so, or change the widget.

## 16. Two agents can both be truthful about a file a third is rewriting
ch6's fix agent ran full-true.json and reported it green; ch6's recheck ran it and reported it red at
step 586, and called the fix report false. Both were right: ch7's rework landed between them. Running
two chapter workflows at once makes the shared end-to-end test non-deterministic, and the reviewers
have no way to know that.
CHECK: never run the whole-game regression as an acceptance gate while another chapter is being
edited, and tell a reviewer which files are in flight so a red run is attributed correctly.

## 17. Coverage that exists by accident, and dies silently when the accident is cleaned up
ch8's epilogue drew the whole night by walking EVERY chapter's `flow.nodes` and running each node's
`when()` inside a try/catch. Nobody designed that as a check, but it was the only thing in the
project that ever executed those predicates outside their own chapter -- so a broken flow spec
anywhere surfaced, faintly, as a node missing from a picture at the end of the game. Reworking ch8
removed the walk, correctly: it coupled the epilogue to eight files it is forbidden to edit. The
rework's own report named the loss instead of hiding it, which is the only reason it was caught.
Adding the check properly to `tools/check-content.js` found four dead nodes in ch7 on the first run
-- `ch7_p0`-`p3`, one per player's sealed word, none of them a scene id and none carrying a
`when()`, so all four had rendered as `? ? ?` on every path since the chapter was written. The
try/catch had been swallowing exactly the class of defect it was accidentally detecting.
CHECK: when you delete code that touched other chapters' data, ask what it was incidentally proving
and where that proof now lives. Two questions find this class: which invariants hold only because
some feature happens to exercise them, and which `try/catch` turns a broken invariant into a
cosmetic absence. Any predicate a chapter declares for another system to run must be executed by a
tool, on a blank state and a full one -- a blank state is what catches `s.flags.X.y` on a flag no
path has set yet, which is the shape most of these take.

## 18. The last rung is the answer, written out a second time, by hand
The single most expensive pattern in this sweep: it accounted for five of the fifteen blocking
findings on its own. `hints` rung 3 -- the rung the engine labels "Reveal the answer (last resort)"
-- was, in 14 of 17 ladders, the accepted answer TYPED OUT AGAIN as a sentence. Nothing in the
project had ever compared it to the answer the puzzle takes. In ch4 it had drifted: `OATH_SCRATCH`
moved 4 -> 2 and the rung did not, so the rung named the board the ring keys as its *named wrong
answer*, on a `maxTries: 1` puzzle. A table that spent its last resort and typed exactly what the
fire told it LOST THE OATH PERMANENTLY, and the flags that loss writes (OATH, OATH_KNOT,
REFUSED_OATH) are read by ch5, ch7 and ch8. ch4_secrets' rung quoted a journal line -- FOURTEEN YEARS
-- that does not exist anywhere in the repository. Neither was reachable by any playthrough script,
because every script places the CORRECT board.
This is ADVERSARIAL 10 (a derived value shadowed by a hardcoded literal) with the worst possible
blast radius, because the literal is the one thing a stuck table is promised it can trust.
CHECK: `node tools/check-hints.js`, folded into `check-content.js`. It parses each ladder's last rung
into the shape the widget resolves and puts it through the SHIPPED predicate, with `Store.state`
swapped underneath, at every flag state the scene's config and rung actually read. Where a rung
offers alternatives, every alternative must be accepted.
BETTER THAN CHECKING IT: **generate the rung from the constants.** ch2, ch4, ch5, ch6 and ch7 now do
(`ringRung(want)`, `oathAnswerRung()`), and a generated rung cannot drift at all.
COROLLARY, and it is the general form: any sentence in a chapter that restates a value computed
somewhere else is a copy, and every copy in this game has drifted at least once -- the hint rungs,
the three stale slot comments in ch4, ch6's copy of ch3's truth map, ch7's `playHymn` (still playing
the phrase from before the walls moved), the Reader's Book plinth order, the recorded drop-a-role
tables. Derive it, or check it against the thing it copies. Never both-write it.

## 19. An answer that is a sequence the whole game has already published
ch7's Great Sigil shipped with the phrase THORN KNOT VEIL EMBER ASH WELL CROWN. That is the
attunement word of ch1 through ch7 **in chapter order** (`js/content/lore.js`): every player types
all seven into the Hearth over the evening, one per chapter. So the Finale's whole phrase, in its
whole order, had been public since Chapter I -- and `ch8_words` ENDED THE GAME by pointing at the
coincidence, which is how it was found. It was written as a payoff and it was a live oracle.
The general shape is wider than one sequence: a puzzle's answer must be checked against everything
the game itself publishes across chapters, not only against the other chapters' puzzles. The chapter
codewords, the Book's worked examples, the Ladder, the flow-node labels and the Epilogue's own
summaries are all published surfaces.
CHECK: `tools/check-hints.js` compares every board the shipped predicate accepts -- every rotation
and both directions, because a ring is a loop -- against the chapter-word sequence, and fails on a
run of four or more whose words the table has ALREADY TYPED by that chapter. Both conditions are
load-bearing. Without the "already typed" clause it fires on ch2's vault door, which reads THORN KNOT
VEIL EMBER but sits in Chapter II where only THORN and KNOT have been given out. The four-word
threshold is measured, not chosen: over all 8! = 40,320 arrangements of the eight glyphs on an
eight-slot ring, read from every slot in both directions, a run of three turns up by chance in 15.9%
of them, a run of four in 2.5%, and a run of seven -- which is what ch7 had -- in 0.04%.

## OPEN 2 — SETTLED. The retry economy in the last two chapters
*Taken with ch6, ch7 and ch8 editable at once, which is the condition the open note said it needed.*

**The decision: in the last two chapters a wrong answer costs a RECORD, the record is one shared
number, and the Epilogue reads it out. No losing branch in either chapter.**

Both chapters had already argued themselves to the same place from opposite sides, and both were
right. ch6 has no fourth bell to crack, so its cost runs out; ch7's midnight was deliberately built
to be a beat and not a guillotine, because a four-hands reflex round at the last beat of a two-hour
game must not be a wall. Both then wrote the same sentence in their own notes: *a recorded cost is
only real once ch8 reads it* -- and neither could make that true alone. That was the whole of OPEN 2.

What was done, in one edit across the three files:
- **One row in `ch8.js`'s COUNTS**, reading `(STONE_MISREAD|0) + (SIGIL_COLD|0)`: *"The stone and the
  Sigil. You read them back wrong {n} times."* ONE row and ONE number, not two of each: the prophecy
  stone and the Great Sigil are the same act -- reading a thing back to the fire -- and pricing them
  in two currencies is the mistake pattern 14 names. The stone's losing branch rides the same
  sentence as a swapped clause, which is the shape `CLUES_HELP` already uses in the row above it.
- **`STONE_TOLD` takes two minutes off ch7's night.** This is the one cross-chapter bite the decision
  allows, and it is the thing neither chapter could do. The size is enumerated rather than chosen
  (`scratchpad/open2/night.js`, against the shipped `sigilPrice`): at 900 s the night pays for six
  cold rings, at 840 s still six, at 780 s five. So 120 s is the smallest cut that takes a ring off
  the night, and it takes exactly one, against a widest single-drop field of eight. Marrow names it
  in ch6 where it is charged, and the Sigil's rule card names it in ch7 where it bites.
- **`SIGIL_COLD`, `STONE_MISREAD` and `STONE_TOLD` are declared cross-chapter** in
  `tools/flag-contract.js`. Until this pass all three were chapter-local, and OPEN 2's own candidate
  list described `COLD_HEARTH_ATTEMPTS` and `STONE_MISREAD` as "a recorded cost that ch8's ending
  already prints", which was true of neither.
- **The Binding's record was repaired and its budget was not.** `js/puzzles/binding.js` reset the
  ring on four different slips and called `onAttempt` on only two, so the Epilogue printed "after 0
  slips" after a table had slipped twice, and the card's promise that "a slip costs thirty seconds"
  was false for half of them. Every reset now fires `onSlip`; `fail()` and the three-attempt budget
  are untouched. The Binding stays priced at zero on purpose.

Two candidates were considered and **rejected**, and the reasons matter more than the verdict:
- *"The stone's losing branch leaves `WALK_UNLOCKED` false."* Rejected. That is not a worse ending,
  it is the removal of the ending the whole game points at -- the title beat -- and it would fall
  hardest on exactly the table that is already short a player, which is the opposite of what a
  four-handed design should do. ch6's four-reading budget already does the load-bearing work: against
  fields of 8, 12 and 192, a three-handed table usually loses the stone. What losing costs it is
  Marrow reading it aloud, two minutes of night, and a sentence at dawn.
- *"ch6's stone should take ch7's escalating `30 + 30n` shape."* Rejected. The two chapters spend
  different currencies by design -- ch6 spends bells, ch7 spends the night -- and forcing one shape
  on both is pattern 14 again from the other direction. What they now share is the record, which is
  the right level to unify at.

**Stated plainly, because it is a trade:** a sentence at dawn is a weaker cost than a lost puzzle.
The bite in the last two chapters is deliberately soft, and the hard budgets (ch6's four readings,
ch7's six rings) are what actually price a missing seat. If a later pass finds that tables do not
feel the record at all, the next lever to pull is ch8, not ch6 or ch7: give the count a consequence
in the ending text rather than a line in the tally.
