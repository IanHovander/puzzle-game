/* Chapter I — The Vigil (Binder drives, Listener is the Voice) */
(function () {
  'use strict';
  const L = window.VigilLore, Store = window.VigilStore, UI = window.VigilUI;
  const ART = window.VigilArt.ch1; // the nine Houses and their banners (js/art/scenes-ch1.js)

  if (document.head) document.head.appendChild(Object.assign(document.createElement('style'), { textContent: `
    body[data-chapter="ch1"] .seats-pz .pz-status { font-family: var(--serif); font-size: 16px; letter-spacing: 0; text-transform: none; line-height: 1.45; color: var(--ink); }
    body[data-chapter="ch1"] .seats-pz .pz-status.bad { color: #ffb0a0; }
    body[data-chapter="ch1"] .seats-pz .pz-status.good { color: var(--moss); }
    body[data-chapter="ch1"] .seats-pz .pz-note { white-space: normal; }
    .ch1-rule { font-size: 15px; line-height: 1.45; color: var(--ink-dim); border-left: 2px solid rgba(212,169,78,0.4); padding: 4px 10px; margin: 6px 0 10px; }
    .ch1-rule b { color: var(--gold-2); }
    body[data-chapter="ch1"] .seat { font-size: 11px; }
    body[data-chapter="ch1"] .table-area { margin-top: 26px; width: min(380px, 50vh); height: min(380px, 50vh); }
    @media (max-height: 820px) { body[data-chapter="ch1"] .table-area { margin-top: 8px; width: min(276px, 39vh); height: min(276px, 39vh); } }
    /* A second step, for a laptop in a window. Measured at 1152x648 before it: the seats panel ran
       64px past the fold and 'Call the vote' was the half of it the room could not see (scan-fit, and
       scratchpad/ch012/probe.js element by element: note 120 + table 253 + status 20 + row 46 = 552
       against a 512px box). The nine seats are laid out in percentages, so the table shrinks whole. */
    @media (max-height: 700px) {
      body[data-chapter="ch1"] .table-area { margin-top: 4px; width: min(214px, 33vh); height: min(214px, 33vh); }
      body[data-chapter="ch1"] .seats-pz .pz-note { font-size: 14px; line-height: 1.34; }
      body[data-chapter="ch1"] .seat { width: 54px; height: 54px; font-size: 10px; }
      body[data-chapter="ch1"] .seat-banner svg { width: 18px; height: 18px; }
    }
  ` }));

  /* ---------- the nine seats ----------
     The Hearth prints banners and numbers only. Who is pledged (Reader), who is still talking (Listener),
     who cannot be moved by anybody (Seer) and who is sworn to whom (Binder) live on four separate phones —
     one fact each, and no phone holds another's. Verified: only {sorrel, oriel} reaches five, and every
     subset of three roles either stalls or calls a wrong pair. */
  const SEATS = [
    { id: 'sorrel', n: 1 }, { id: 'quill', n: 2 }, { id: 'brack', n: 3 }, { id: 'hallan', n: 4 }, { id: 'vey', n: 5 },
    { id: 'orrin', n: 6 }, { id: 'oriel', n: 7 }, { id: 'tarn', n: 8 }, { id: 'marrow', n: 9 },
  ];
  const PLEDGED = ['marrow', 'brack'];                    // Reader: filed in writing before the doors shut
  const DEAF = ['hallan'];                                // Listener: hears nobody but his cousin
  const BLOCKED = ['orrin'];                              // Seer: a soldier of the Envoy stands behind that chair
  const BOUGHT = ['vey', 'tarn'];                         // Seer: Crown coin, cushion and sleeve
  const FOLLOWS = { quill: 'sorrel', hallan: 'orrin' };   // Binder: the two sworn threads
  /* The budget, in one place. Everything that says "two" says it from here — the widget's cap, the
     Chair's rule card and hint 2 — because the number is the puzzle. Brute-forced over the live
     tally() (scratchpad/ch012/ch1-asks.js): of the 28 askable pairs exactly ONE reaches five keeps,
     {sorrel, oriel}; at a cap of 3 there are 6 winning triples out of 56, and a table with no Binder
     can simply ask all three Masters it can reach ({sorrel, quill, oriel}) and win with certainty,
     which is the Binder's whole seat in this chapter. tools/scripts/ch1.json asserts the cap on the
     board, because nothing else in the suite can see it. */
  const ASKS = 2, ASKS_WORD = ['no', 'one', 'two', 'three', 'four'][ASKS];
  function tally(selected) {
    const asked = (id) => selected.includes(id) && id !== 'marrow' && !DEAF.includes(id) && !BLOCKED.includes(id) && !BOUGHT.includes(id);
    const v = {};
    SEATS.forEach(s => { if (!FOLLOWS[s.id]) v[s.id] = (asked(s.id) || PLEDGED.includes(s.id)) ? 'KEEP' : 'SEND'; });
    SEATS.forEach(s => { if (FOLLOWS[s.id]) v[s.id] = asked(s.id) ? 'KEEP' : v[FOLLOWS[s.id]]; });
    const keep = SEATS.filter(s => v[s.id] === 'KEEP').map(s => s.n), send = SEATS.filter(s => v[s.id] === 'SEND').map(s => s.n);
    return { votes: v, keep, send, ok: keep.length >= 5 };
  }
  /* What the hall gives back. Each one teaches the rule that stopped it. */
  const REASONS = {
    sorrel: 'Seat 1 hears you out and nods once. "Since you asked me to my face." Seat 2 watches that nod, and nods the same way, as Seat 2 always has.',
    quill: 'Seat 2 says yes, then glances at Seat 1, the way Seat 2 always does. One ask, one vote.',
    brack: 'Seat 3 is delighted to be asked. Seat 3 filed with the Chair, in writing, before the doors shut. You had him already.',
    hallan: 'Seat 4 does not turn his head. "I vote as my cousin votes. I hear nobody else."',
    vey: 'Seat 5 agrees with every word you say. Seat 5\'s cushion clinks. Seat 5 votes SEND.',
    orrin: 'A Crown soldier steps between you and Seat 6, apologizes, and does not move. You never get near.',
    oriel: 'Seat 7 listens a long time, asks two questions, does not smile. "Very well. Tonight — keep."',
    tarn: 'Seat 8 smiles with every tooth. The Crown paid for all of them. Seat 8 votes SEND.',
    marrow: 'The Chair does not hear cases. The Chair counts them.',
  };
  function seatCfg() {
    return ART.HOUSES.map((h, i) => ({
      id: SEATS[i].id, n: h.n, label: h.house === 'the Chair' ? 'the Chair' : h.house, banner: ART.banner(h, 26),
      locked: SEATS[i].id === 'marrow', lockedText: REASONS.marrow,
    }));
  }
  const listSeats = (arr) => arr.length ? 'Seat' + (arr.length > 1 ? 's ' : ' ') + UI.list(arr.map(String)) : 'nobody';
  /* The name the four answered to Wren's "Claimed by who?" at the end of the Prologue (ch0_name sets GROUP_NAME). */
  const group = (s) => s.flags.GROUP_NAME || 'the Four';

  Game.addChapter({
    id: 'ch1', label: 'Chapter I', title: 'The Vigil', start: 'ch1_start', code: L.chapter('ch1').word,
    mood: 'court', fx: 'embers', art: 'ch1_hall', flame: 0.95,
    flow: {
      nodes: [
        { id: 'ch1_start', label: 'The Great Hall', col: 0, row: 2 },
        { id: 'ch1_vane', label: 'The Envoy and the writ', col: 1, row: 2 },
        { id: 'ch1_vote', label: 'The hour before the bell', col: 2, row: 2, kind: 'choice' },
        { id: 'ch1_prices', label: 'Five keep. Two prices', col: 3, row: 1, kind: 'choice' },
        { id: 'ch1_lost', label: 'Short of five. Wren under guard', col: 3, row: 3, secret: true },
        { id: 'ch1_p_sorrel', label: 'Sorrel: the Ember to the nine', col: 4, row: 0, secret: true, when: (s) => !!s.flags.SORREL },
        { id: 'ch1_p_oriel', label: 'Oriel: tell her everything', col: 4, row: 1, secret: true, when: (s) => !!s.flags.ORIEL },
        { id: 'ch1_p_neither', label: 'Neither. You owe only the Provost', col: 4, row: 2, secret: true, when: (s) => !!s.flags.NEITHER && !s.flags.VOTE_LOST },
        { id: 'ch1_offer', label: 'The Envoy\'s offer', col: 5, row: 2, kind: 'choice' },
        { id: 'ch1_v_refuse', label: 'Refused him', col: 6, row: 1, secret: true, when: (s) => Store.chose('VANE_OFFER', 'refuse') },
        { id: 'ch1_v_pretend', label: 'Pretended to accept', col: 6, row: 2, secret: true, when: (s) => !!s.flags.VANE_PRETEND },
        { id: 'ch1_v_accept', label: 'Accepted', col: 6, row: 3, secret: true, when: (s) => !!s.flags.VANE_ACCEPT },
        { id: 'ch2_start', label: 'The Ember Vault', col: 7, row: 2, secret: true },
      ],
      edges: [
        ['ch1_start', 'ch1_vane'], ['ch1_vane', 'ch1_vote'], ['ch1_vote', 'ch1_prices'], ['ch1_vote', 'ch1_lost'],
        ['ch1_prices', 'ch1_p_sorrel'], ['ch1_prices', 'ch1_p_oriel'], ['ch1_prices', 'ch1_p_neither'],
        ['ch1_p_sorrel', 'ch1_offer'], ['ch1_p_oriel', 'ch1_offer'], ['ch1_p_neither', 'ch1_offer'], ['ch1_lost', 'ch1_offer'],
        ['ch1_offer', 'ch1_v_refuse'], ['ch1_offer', 'ch1_v_pretend'], ['ch1_offer', 'ch1_v_accept'],
        ['ch1_v_refuse', 'ch2_start'], ['ch1_v_pretend', 'ch2_start'], ['ch1_v_accept', 'ch2_start'],
      ],
    },
    scenes: {
      /* ---------- the Great Hall ---------- */
      ch1_start: {
        art: 'ch1_hall', mood: 'court', fx: 'embers', sfx: 'open', title: 'The Great Hall, before the bell',
        enter: (s) => { if (s.flags.WREN_TRUST == null) Store.set('WREN_TRUST', 0); },
        text: [
          'Nine Houses, nine Masters, nine tall chairs. The Houses have argued for four hundred years, mostly about the chairs. The tallest is the Provost\'s, and nobody has ever seen her sit in it.',
          'Tonight is the Vigil. Item one on the order of business is the fire. Item two is Wren.',
          'At the far end, the fire rises and sinks like breathing. Every grown-up here is very carefully not looking at it. Beside the fire lies the Register, open at the line that says *Claimed by*, empty for fourteen years. At the bell, the nine will decide what goes on it.',
          'You are at the back. Wren is up front in a borrowed collar and a warm coat, as instructed, and waves at you. It is too big a wave. Wren always waves too big when scared.',
          { text: 'Tonight the Binder works the keyboard, and the Listener reads the screen aloud.', cls: 'whisper' },
        ],
        next: 'ch1_dais', button: 'Wren is presented',
      },
      ch1_dais: {
        art: 'ch1_dais', mood: 'court', fx: 'embers',
        text: (s) => [
          { speaker: 'Provost Marrow', text: 'Masters. Fourteen years ago this fire went out, and left a child on the stones. I have kept the child since. Before you vote on a sentence, look at the child.' },
          'On the way in, she fixed Wren\'s collar twice. It did not need fixing either time.',
          { speaker: 'Wren', text: `Hello. It's me. That's ${group(s)} at the back. They're with me, in writing. I'll try not to fidget.` },
          'Then Wren stands still, the smallest thing on the dais. At the back, the Binder counts. Eleven. Twelve. Thirteen. Wren has broken the record in front of nine Houses, and nobody is allowed to clap.',
          { text: 'Knock it on the table now, soft: one each, then all together.', cls: 'whisper' },
          'At the back, four sets of knuckles on a bench say *everybody\'s here.* Wren cannot possibly hear it. Wren\'s chin lifts anyway.',
        ],
        next: 'ch1_vane', button: 'The doors',
      },
      ch1_vane: {
        art: 'ch1_vane', mood: 'dread', fx: 'dust', sfx: 'boom',
        text: [
          'The doors open before anyone asks them to. Cold comes in first, then soldiers, then a captain, then Lord Vane, the Crown\'s Envoy, with a writ. A writ is a letter that brings its own soldiers.',
          { speaker: 'Vane', text: 'His Majesty asks one small thing: the child, tonight, for safekeeping. The child will be kept a very long way from this fire. The child will not be coming back.' },
          'Wren\'s hand finds the Provost\'s sleeve, in front of nine Houses, and holds on. Wren doesn\'t make a joke. In seven years you have seen that exactly once: last night, at the lamp.',
          'Vane lowers his voice, not quite far enough.',
          { speaker: 'Vane', text: 'I have seen what is under the paint in this hall, Ilsabet.' },
          'Nobody has called the Provost *Ilsabet* in years. Nobody knows what the rest means. The Provost\'s face does.',
        ],
        next: 'ch1_flicker', button: 'The Provost answers',
      },
      ch1_flicker: {
        art: 'ch1_hall', mood: 'tense', fx: 'embers', flame: 0.7,
        text: [
          { speaker: 'Provost Marrow', text: 'This school does not hand its children to a writ. It puts them to a vote. Nine seats. Five keep Wren here tonight. Four, and Wren leaves with him.' },
          'Fourteen years of "the child." Just now she said "Wren."',
          'The Hearth bows, as if pulled from underneath. Eight Masters look at it, then at the floor, as if remembering what they are sitting on.',
          'The Provost is watching Wren, who has taken a step toward the fire without noticing. The Seer looks at the floor behind Wren, and goes very still. So does the Master in Seat 7.',
          { speaker: 'Provost Marrow', text: 'The bell rings in an hour. By the Vigil\'s rules, Wren may send friends to speak to two Masters. Two.' },
          'In four hundred years, no foundling has had anybody to send. Wren has four, and mouths one word to them, very clearly: *five.*',
        ],
        next: 'ch1_attune', button: 'The Masters\' door',
      },
      ch1_attune: {
        type: 'code', art: 'ch1_hall', mood: 'tense', fx: 'embers',
        text: [
          'Over the fire, the stone says what it always says. Over the Masters\' door, one word is cut clean into the lintel.',
          'One hour. Two asks. And each of you can see one true thing about the nine that the nine would rather nobody saw.',
          { text: 'Say the lintel\'s word aloud, from the screen. Then open the Companion on your phone, pick the same role as last night, and type the word in.', cls: 'whisper' },
          { text: 'Read your page to yourself. Say nothing yet.', cls: 'whisper' },
        ],
        roles: 'Warden (keyboard): **the Binder**. Voice (reads aloud): **the Listener**.', sightSeconds: 90,
        codeLabel: 'The lintel’s word — enter it on every phone',
        codeSub: 'Type this word into every phone. Read your own page.',
        next: 'ch1_vote',
      },
      /* ---------- the hour before the bell ---------- */
      ch1_vote: {
        type: 'puzzle', puzzle: 'seats', puzzleId: 'ch1_vote', art: 'ch1_hall', artParams: { seated: true }, mood: 'tense', fx: 'embers', flame: 0.8, par: [3, 4.5, 6],
        clearText: true, // the instructions have been read: the vote, told, gets the whole box
        text: [
          'The Provost takes the ninth seat, the Chair, and sits in it for the first time anyone can remember. Wren stands still beside it, one hand on the Provost\'s sleeve. It is going to be a long hour.',
          { text: 'Say what your phone shows, aloud. Use seat numbers, not names.', cls: 'whisper' },
          { text: 'Then choose ' + ASKS_WORD + ' Masters to ask, and call the vote. It is called once.', cls: 'whisper' },
        ],
        config: () => {
          /* The bell is narrative (design §5 Ch1): at 6:00 the Provost stalls the count and the last hint tier fires.
             The vote is the commit — a wrong call is the vote (VOTE_LOST). Fewer than two approaches earns a nudge. */
          let stall = false;
          const STALL = 'The bell. The Provost rises and does not call the vote. "The Chair has not finished hearing the Masters," she says, into total silence. She is stalling for you.';
          return {
            title: 'THE HOUR BEFORE THE BELL', center: 'the Hearth', startAngle: 20, max: ASKS, timer: 360, submitText: 'Call the vote',
            note: 'The Chair reads out the rule: *Five of nine keeps the child. You may ask **' + ASKS_WORD + '** Masters. A Master you ask votes **KEEP**, unless they will not hear you, you cannot reach them, or the Crown has paid them. A Master sworn to another votes as that Master does, unless you ask them yourself. A vote filed in writing stands. Everyone else votes **SEND**.*',
            timeoutText: STALL,
            onTimeout: () => {
              stall = true;
              /* The bell hands over all three rungs. engine.js counts hintsTotal only on the hint
                 button, so a grant that skips it is three free rungs that six chapter ledgers and the
                 pause menu never see. Count what we give. */
              const had = Store.state.hintsUsed.ch1_vote || 0;
              if (had < 3) { Store.state.hintsUsed.ch1_vote = 3; Store.inc('hintsTotal', 3 - had); Store.save(); }
              const bell = document.getElementById('hint'); if (bell) bell.classList.add('attention');
              window.VigilAudio.sfx('boom');
            },
            seats: seatCfg(),
            check: (selected) => {
              const t = tally(selected);
              const reasons = selected.map(id => REASONS[id]).join(' ');
              const count = `${t.keep.length} keep, ${t.send.length} send — ${listSeats(t.keep)} for keeping.`;
              if (t.ok) { Store.set('CH1_APPROACHED', selected.slice()); return { ok: true, text: `${reasons} ${count} Five of nine. Wren stays.` }; }
              if (stall) { stall = false; return { ok: false, text: STALL }; }
              if (selected.length < 2) return { ok: false, text: selected.length ? 'One Master spoken to. Choose one more, then call the vote.' : 'You have spoken to nobody. Choose two Masters, then call the vote.' };
              Store.set('CH1_APPROACHED', selected.slice());
              return { ok: false, final: true, text: `${reasons} ${count} Short of five. The vote has been called.` };
            },
          };
        },
        hints: [
          'Each of you holds one piece. Say yours out loud.',
          'Nine seats, five needed, and ' + ASKS_WORD + ' asks. One of the seats you can reach does not vote alone.',
          'Seat 1 and Seat 7. Seat 1 brings Seat 2 with her. With the Chair and Seat 3, that is five.',
        ],
        onSolve: (s, r) => {
          if (r && r.ok) { Store.set('VOTE_LOST', false); Store.note('The nine voted 5–4 to keep Wren.'); }
          else { Store.set('VOTE_LOST', true); Store.inc('WREN_TRUST', -1); Store.note('The bell rang and the nine voted to send Wren to the capital.'); }
        },
        /* Only {sorrel, oriel} wins (see ASKS), so a won vote is always the same two asks, told as the asking.
           With no result to hand (a reload, a dump, the fit scan), the flag says which way it went. */
        solvedText: (s, r) => {
          const won = (r && 'ok' in r) ? !!r.ok : !s.flags.VOTE_LOST;
          if (won) return [
            'The Binder walks the length of the hall to Seat 1, and asks. Seat 1 nods once. "Since you asked me to my face." Seat 2 nods too.',
            'Seat 7 looks the Reader over. "Can you read the stone?" The Reader says no, which is nearly true. "Would you like to?" The Reader says yes. "Very well. Tonight — keep."',
            'The Chair calls the vote, and the Binder counts. The Chair: one. Seat 3: two. Seats 1 and 2: three, four. Seat 7 finishes a line in a black notebook, closes it, and raises her hand. Five of nine. Wren stays.',
          ];
          const sel = (r && r.selected) || [];
          const t = tally(sel);
          const out = sel.map(id => REASONS[id]);
          out.push(`Then the Chair calls the vote, as it stands. ${listSeats(t.keep)} for keeping. It is not enough.`);
          return out;
        },
        next: (s, r) => (r && r.ok) ? 'ch1_won' : 'ch1_lost',
      },
      ch1_won: {
        art: 'ch1_dais', mood: 'court', fx: 'embers', flame: 0.85, sfx: 'success',
        text: (s) => [
          'Five to four. Wren lets go of the Provost\'s sleeve, one finger at a time.',
          { speaker: 'Provost Marrow', text: 'The school keeps its own. Lord Vane, the school thanks the Crown for its concern.' },
          `The Register's clerk dips his pen. Wren gets there first, and on the empty line after *Claimed by* writes *${group(s)}*, in the worst handwriting the Register has ever held. The clerk looks at the Provost. The Provost looks at the ceiling. The clerk, writing second, writes nothing.`,
          { speaker: 'Wren', text: 'That was you! I watched the Binder walk up to Seat One. The Binder doesn\'t walk up to *anyone*. I\'m telling everybody.' },
          { speaker: 'Wren', text: 'Listener, breathe. I\'m staying.' },
          '"Staying," Wren says again, quieter, to hear how it sounds.',
        ],
        next: 'ch1_prices', button: 'What they want',
      },
      ch1_lost: {
        art: 'ch1_dais', mood: 'sorrow', fx: 'dust', flame: 0.7, sfx: 'fail',
        text: [
          'Two soldiers step onto the dais. Wren\'s hand is still on the Provost\'s sleeve, and the Provost has to take it off herself. Then Wren finds you at the back, and the grin comes back, for you.',
          { speaker: 'Wren', text: 'Don\'t. You nearly had it. Look after Mom — the Provost. She\'s worse at this than I am.' },
          { text: 'Knock it on the table, soft, one more time.', cls: 'whisper' },
          'This time, Wren hears it. Wren goes with the soldiers, and does not fidget once.',
          'The Register\'s clerk dips his pen. The Provost closes the book on it. Then she comes to the back of the hall, where nobody is looking now, and speaks very low. It is how she shouts.',
          { speaker: 'Provost Marrow', text: 'Bring me the Cold Ember from under this school. It will not lift for a Master. I have tried. Then I will get Wren back myself.' },
        ],
        next: 'ch1_offer', button: 'Later',
      },
      /* ---------- the two prices (45 s) ---------- */
      ch1_prices: {
        type: 'choice', choice: 'PRICES', art: 'ch1_dais', mood: 'tense', fx: 'embers', timer: 45, timeout: 'neither',
        timerText: '*Forty-five heartbeats. They do not say what happens if you refuse. Nobody here ever has to.*',
        text: [
          'Two Masters reach you first. Seat 1 is Master Sorrel. Seat 7 is Master Oriel. They voted for you, and would like that noticed. In the Houses, a vote is a loan.',
          { speaker: 'Master Sorrel', text: 'Tonight the Provost will send you under this school, down toward the Cold, for the Cold Ember. She has nobody else to send. When you bring it up, it comes to the Convocation. To the Houses. Not to her. One woman should not hold the only spare fire.' },
          { speaker: 'Master Oriel', text: 'Tell me what you find down there. All of it.' },
        ],
        prompt: 'Whose price do you honor?',
        options: [
          { id: 'sorrel', text: 'Binder: "The Ember goes to the nine. You have my word."', sub: 'Past the Provost, and into the Convocation\'s hands.', if: (s) => (s.flags.CH1_APPROACHED || []).includes('sorrel'), next: 'ch1_offer',
            set: { SORREL: true, ORIEL: false, NEITHER: false }, note: 'You promised Sorrel the Ember. She gave the Binder her writ.',
            after: ['Sorrel puts a folded writ into the Binder\'s hand, under the Convocation\'s seal.', { speaker: 'Master Sorrel', text: 'For anyone who asks what you are carrying. See that you keep your word.' }, 'Oriel says nothing at all, and makes sure Sorrel hears it.'] },
          { id: 'oriel', text: 'Reader: "All of it, Master Oriel. Every word."', sub: 'Every secret below, told to a Master.', if: (s) => (s.flags.CH1_APPROACHED || []).includes('oriel'), next: 'ch1_offer',
            set: { ORIEL: true, SORREL: false, NEITHER: false }, note: 'You promised Oriel everything below.',
            after: [{ speaker: 'Master Oriel', text: 'All of it. Even the parts somebody has painted over.' }, 'She opens the black notebook, writes the date on a clean page, and says nothing else. She is very good at it. Sorrel puts away a writ she had ready.'] },
          { id: 'neither', text: 'Listener: "Neither… we answer to the Provost."', sub: 'Two Masters, owed and unpaid.', next: 'ch1_offer',
            set: { NEITHER: true, SORREL: false, ORIEL: false }, note: 'You refused both prices.',
            after: ['Two mouths go thin. Across the hall, the Provost very nearly smiles.'] },
        ],
      },
      /* ---------- the Envoy's offer (60 s) ---------- */
      ch1_offer: {
        type: 'choice', choice: 'VANE_OFFER', art: 'ch1_passage', mood: 'dread', fx: 'dust', timer: 60, timeout: 'refuse', sfx: 'step',
        enter: (s) => { if (s.flags.VOTE_LOST) { if (s.flags.NEITHER == null) Store.set('NEITHER', true); if (s.flags.SORREL == null) Store.set('SORREL', false); if (s.flags.ORIEL == null) Store.set('ORIEL', false); } },
        timerText: '*Sixty heartbeats. He is very good at waiting.*',
        text: (s) => [
          'In a side passage, Lord Vane is waiting. At his shoulder, his captain studies your faces like a man learning a list.',
          { speaker: 'Vane', text: s.flags.VOTE_LOST
            ? 'Ilsabet will have the child back within the hour. Then bring it to me, before midnight. It will come if you ask.'
            : 'Bring the child to me before midnight. It waved at you in front of nine Houses. It will come if you ask.' },
          'It is true. That is the worst thing he has said all night.',
          { speaker: 'Vane', text: 'It lives. I promise you that, which is more than anyone else here will.' },
          'Nobody else tonight has used the word *lives*. Not even the stone.',
          { speaker: 'Vane', text: 'Do it, and the Crown makes all four of you Masters. Decide what I am later. Ask your Seer what is under the paint.' },
          'Nobody has told him who the Seer is.',
        ],
        prompt: 'He sends his captain out of earshot. Whatever you say now, you say to him alone.',
        options: [
          { id: 'refuse', text: 'Seer: "No. And the name is Wren."', next: 'ch1_after', set: { VANE_PRETEND: false, VANE_ACCEPT: false },
            after: ['Vane inclines his head, as if you had confirmed an appointment.', { speaker: 'Vane', text: 'Then I will ask again later, when it costs more.' }] },
          { id: 'pretend', text: 'Reader: "Before midnight. Of course."', sub: 'A lie he may believe.', next: 'ch1_after', set: { VANE_PRETEND: true, VANE_ACCEPT: false }, note: 'You told the Envoy you would bring him Wren. You did not mean it.',
            after: [{ speaker: 'Vane', text: 'Wise. Or a lie. I can use either.' }] },
          { id: 'accept', text: 'Listener: "If it keeps Wren alive… yes."', cls: 'dark', sub: 'Wren lives, a very long way from here. Masters, all four.', next: 'ch1_after', set: { VANE_ACCEPT: true, VANE_PRETEND: false }, note: 'You accepted the Envoy\'s offer.',
            after: [{ speaker: 'Vane', text: 'Before midnight. My captain knows your faces now.' }, 'For a moment he looks like a man handed something heavier than he asked for.'] },
        ],
      },
      ch1_after: {
        art: 'ch1_hall', mood: 'hearth', fx: 'embers', flame: 0.8,
        text: (s) => {
          /* The Wren tab is read here, after the Provost has sent the four below and before they go.
             Wren's answer opens ch1_flow, as ch0_lamp's instruction is answered by ch0_name. The phone
             cannot know how the vote went (no cast in ch1), so the four lines fit either branch. */
          const out = [
            'Back in the hall, the fire coughs.',
            /* On a won vote Sorrel has only named the Ember. On a lost vote the Provost has already said why the four (ch1_lost). */
            { speaker: 'Provost Marrow', text: s.flags.VOTE_LOST
              ? 'It flickered at dawn. Not like that. If it goes out, the Cold Ember under this school lights it again. I am sending you for it tonight.'
              : 'It flickered at dawn. Not like that. Under this school lies the Cold Ember. It can light this fire again. It will not lift for a Master. I have tried. I am sending you for it tonight.' },
            'She passes you without turning her head.',
            { speaker: 'Provost Marrow', text: 'I came for Wren this morning, and saw your door. …Ink. Good.' },
          ];
          if (s.flags.VOTE_LOST) {
            out.push('Wren sits between two soldiers, as near the fire as allowed.');
            out.push({ speaker: 'Wren', text: 'They have a warm room, apparently. Listener, stop checking on me. I\'m fine.' });
            out.push('The Listener cannot hear whether that is true. The Listener never can.');
          } else {
            out.push('Wren flops down on the hearthstone, as near the fire as it is polite to get, and then a little nearer.');
            out.push({ speaker: 'Wren', text: '"Not coming back." He said it like he was doing me a favor. Anyway. Eleven seconds last night. Thirteen on the dais. Then a whole hour. Binder, write that down. In ink.' });
          }
          out.push({ text: 'Open your **Wren** tab. Reader first, then round the table.', cls: 'whisper' });
          return out;
        },
        next: 'ch1_flow', button: 'The night moves on',
      },
      ch1_flow: {
        type: 'flow', art: 'ch1_hall', mood: 'hearth', fx: 'embers',
        text: (s) => [
          'Wren hears all four of you out without interrupting once. Two nights running. It may be a record. When the Reader gets to *we claimed you first*, Wren has to look at the fire for a while.',
          { speaker: 'Wren', text: 'Not a rule. A *promise*. From the Binder. Somebody carve that on something.' },
          s.flags.VOTE_LOST
            ? 'Then Wren shuffles along the step to make room for four, and two soldiers have to shuffle too. Wren looks across the hall at the Provost, and goes quiet.'
            : 'Then Wren shuffles along the hearthstone to make room for four, and looks across the hall at the Provost, and goes quiet.',
          { speaker: 'Wren', text: 'Her heart jumped. For me. …Don\'t tell her I know. She\'ll fix my collar for a month.' },
          s.flags.VOTE_LOST
            ? 'The Founders said *keep*. Tonight the nine said *send*, and the Provost has not finished with them. The Listener takes Wren\'s hand, to check. Cold. The Listener holds on anyway.'
            : 'The Founders said *keep*. Tonight, by one vote, so did the nine. Wren holds both hands out to the fire. Wren\'s shadow runs the wrong way, toward it. The Seer shifts along without a word, and sits in the way.',
          { text: 'The chart shows the paths you took, and the ones you didn\'t.', cls: 'small' },
        ],
        flowTitle: 'Chapter I — the paths you walked',
        stats: (s) => {
          const vote = s.flags.VOTE_LOST ? 'The nine voted to **send** Wren.' : 'The nine voted **5–4 to keep** Wren.';
          const price = s.flags.SORREL ? 'You honored **Sorrel\'s** price.' : s.flags.ORIEL ? 'You honored **Oriel\'s** price.' : s.flags.VOTE_LOST ? 'No Master named a price.' : 'You honored **neither** price.';
          const vane = s.flags.VANE_ACCEPT ? 'You **accepted** the Envoy\'s offer.' : s.flags.VANE_PRETEND ? 'You **pretended** to accept.' : 'You **refused** the Envoy.';
          return `${vote} ${price} ${vane} Hints so far: ${s.flags.hintsTotal || 0}.`;
        },
        next: 'ch2_start', button: 'The Ember Vault',
      },
    },
  });
})();
