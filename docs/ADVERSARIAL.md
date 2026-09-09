# How to attack a chapter

`docs/STYLE.md` says how to write one. This says how to break one, and it is the more useful of the
two, because every defect below was found by attacking a chapter that had already been written to the
style and had already passed its own review.

Seventeen patterns, every one of them taken from a real defect in this game, with the chapter it was
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

## 12. A guessable window narrower than the answer budget
ch5's Founders' Count went from digits {2,3,4,5} (a permutation, solvable by elimination) to 3,5,3,4 --
three distinct values spanning {3,4,5}, against a ward that allows three answers. Three values and three
tries is not a puzzle. The receipt ("the ward counts 3 digits true") then confirms the rest for free.
CHECK: for every puzzle, compare the size of the field the remaining roles can SEE against the number of
submissions allowed. The field must be wider than the budget, and a partial-credit receipt narrows it.

## Still open — carried into the improvement passes
- ch5's Founders' Count: four digits, one per role, is a weak partition. Whatever the digits, a
  drop-one table faces ten candidates for the missing digit and the ward allows three answers, and if
  the digits sit in a narrow range the visible three reveal the window. Two agent rounds have patched
  the digits and neither fixed the shape. It needs a different partition (one role holding an ordering
  rather than a value, or an answer longer than the budget), not different numbers. p(3 roles) ~= 0.3.
- ch4_secrets is 292 words of scene text against a 150 cap. It is four corner scenes sharing one scene
  id, so the cap may not mean what the tool measures. Settle it rather than letting it slide.

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

## OPEN 2 — the retry economy in the last two chapters (improvement pass, item 1)
Both ch6's stone and ch7's Great Sigil have residual three-role fields (2 to 8 candidates) and no
budget, so a three-role table walks them. Both chapters have argued themselves into the same corner
honestly: ch6 has no fourth bell to crack, ch7's midnight was deliberately made non-punitive to
satisfy "never a dead end", and neither may edit the other. The two are ONE decision -- what does
losing cost in the last two chapters -- and it has to be taken across ch6, ch7 and ch8 together
rather than inside any one of them. Candidates: a hard reading/commit budget whose losing branch
leaves an existing cross-chapter flag false (WALK_UNLOCKED for the stone), or a recorded cost that
ch8's ending already prints (COLD_HEARTH_ATTEMPTS, STONE_MISREAD). Do this once, for both, with all
three chapters editable at the same time.
