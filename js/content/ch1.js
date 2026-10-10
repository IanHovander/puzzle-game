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
  const PLEDGED = ['marrow', 'brack'];                    // Reader: filed in writing before the Vigil opened
  const DEAF = ['hallan'];                                // Listener: hears nobody but his cousin
  const BLOCKED = ['orrin'];                              // Seer: a soldier of the Envoy stands behind that chair
  const BOUGHT = ['vey', 'tarn'];                         // Seer: Crown coin, cushion and sleeve
  const FOLLOWS = { quill: 'sorrel', hallan: 'orrin' };   // Binder: the two sworn threads
  /* The budget, in one place. Everything that says "two" says it from here — the widget's cap, the
     Binder's rule in ch1_flicker, the attune box, the Chair's rule card, the vote's nudges and hint 2 —
     because the number is the puzzle. Brute-forced over the live
     tally() (scratchpad/ch012/ch1-asks.js): of the 28 askable pairs exactly ONE reaches five keeps,
     {sorrel, oriel}; at a cap of 3 there are 6 winning triples out of 56, and a table with no Binder
     can simply ask all three Masters it can reach ({sorrel, quill, oriel}) and win with certainty,
     which is the Binder's whole seat in this chapter. tools/scripts/ch1.json asserts the cap on the
     board, because nothing else in the suite can see it. */
  const ASKS = 2, ASKS_WORD = ['no', 'one', 'two', 'three', 'four'][ASKS], ASKS_CAP = ASKS_WORD[0].toUpperCase() + ASKS_WORD.slice(1);
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
    brack: 'Seat 3 is delighted to be asked. Seat 3 filed with the Chair, in writing, before the Vigil opened. You had him already.',
    hallan: 'Seat 4 does not turn his head. "I vote as my cousin votes. I hear nobody else."',
    vey: 'Seat 5 agrees with every word you say. Seat 5\'s cushion clinks. Seat 5 votes SEND.',
    orrin: 'A Crown soldier steps between you and Seat 6, apologizes, and does not move. You never get near.',
    oriel: 'Seat 7 hears what the lamp said last night, and looks at the stone for a long time. "Very well. Tonight — keep."',
    tarn: 'Seat 8 smiles with every tooth. The Crown paid for all of them. Seat 8 votes SEND.',
    marrow: 'The Chair does not hear cases. The Chair counts them.',
  };
  function seatCfg() {
    return ART.HOUSES.map((h, i) => ({
      id: SEATS[i].id, n: h.n, label: h.house, banner: ART.banner(h, 26),
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
        { id: 'ch1_vane', label: 'The Envoy', col: 1, row: 2 },
        { id: 'ch1_vote', label: 'Before the bell', col: 2, row: 2, kind: 'choice' },
        { id: 'ch1_errand', label: 'Five keep', col: 3, row: 1 },
        { id: 'ch1_prices', label: 'Two prices', col: 4, row: 1, kind: 'choice' },
        { id: 'ch1_lost', label: 'Short of five', col: 3, row: 3, secret: true },
        { id: 'ch1_p_sorrel', label: 'Sorrel\'s price', col: 5, row: 0, secret: true, when: (s) => !!s.flags.SORREL },
        { id: 'ch1_p_oriel', label: 'Oriel\'s price', col: 5, row: 1, secret: true, when: (s) => !!s.flags.ORIEL },
        { id: 'ch1_p_neither', label: 'Neither price', col: 5, row: 2, secret: true, when: (s) => !!s.flags.NEITHER && !s.flags.VOTE_LOST },
        { id: 'ch1_offer', label: 'The Envoy\'s offer', col: 6, row: 2, kind: 'choice' },
        { id: 'ch1_v_refuse', label: 'Refused', col: 7, row: 1, secret: true, when: (s) => Store.chose('VANE_OFFER', 'refuse') },
        { id: 'ch1_v_pretend', label: 'Pretended', col: 7, row: 2, secret: true, when: (s) => !!s.flags.VANE_PRETEND },
        { id: 'ch1_v_accept', label: 'Accepted', col: 7, row: 3, secret: true, when: (s) => !!s.flags.VANE_ACCEPT },
        { id: 'ch2_start', label: 'The Ember Vault', col: 8, row: 2, secret: true },
      ],
      edges: [
        ['ch1_start', 'ch1_vane'], ['ch1_vane', 'ch1_vote'], ['ch1_vote', 'ch1_errand'], ['ch1_errand', 'ch1_prices'], ['ch1_vote', 'ch1_lost'],
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
          'Nine Houses, nine Masters, nine tall chairs: the Convocation. They have argued for four hundred years, mostly about the chairs. Behind them hangs a tapestry somebody painted over.',
          'Item one is the fire. Item two is Wren.',
          'Up front, Wren waves at you, in two coats. It is too big a wave.',
          { text: 'The Listener reads aloud tonight. The Binder has the keyboard.', cls: 'whisper' },
        ],
        next: 'ch1_dais', button: 'Wren is presented',
      },
      ch1_dais: {
        art: 'ch1_dais', mood: 'court', fx: 'embers',
        text: (s) => [
          { speaker: 'Provost Marrow', text: 'Before you vote on a sentence, look at the child.' },
          'She has fixed Wren\'s collar twice tonight. It did not need fixing.',
          { speaker: 'Wren', text: `Hello. Item two. That's ${group(s)} at the back. I'll try not to fidget.` },
          'Wren stands still. At the back, the Binder counts. Eleven. Twelve. Thirteen.',
          { text: 'Knock it on the table now, soft: one each, then all together.', cls: 'whisper' },
          'Wren cannot possibly hear it. Wren\'s chin lifts anyway.',
        ],
        next: 'ch1_vane', button: 'The doors',
      },
      ch1_vane: {
        art: 'ch1_vane', mood: 'dread', fx: 'dust', sfx: 'boom',
        text: [
          'Cold comes in first. Then soldiers, then Lord Vane, the Crown\'s Envoy, with a writ. A writ is a letter that brings its own soldiers.',
          { speaker: 'Lord Vane', text: 'Your stone says the child walks. His Majesty would rather it walked somewhere he can find it. Tonight, for safekeeping, a very long way from this fire. The child will not be coming back.' },
          'Wren\'s hand finds the Provost\'s sleeve. Wren doesn\'t make a joke. Wren holds on.',
          { speaker: 'Lord Vane', text: 'I have seen what is under the paint in this hall, Ilsabet.' },
          'Nobody has called the Provost *Ilsabet* in years. She does not look at the tapestry. It takes some doing.',
        ],
        next: 'ch1_flicker', button: 'The Provost answers',
      },
      ch1_flicker: {
        art: 'ch1_hall', mood: 'tense', fx: 'embers', flame: 0.7,
        text: [
          'The Hearth sags. A Master with a black notebook stops writing.',
          { speaker: 'Provost Marrow', text: 'This school does not hand its children to a writ, or to a stone. It puts them to a vote. Five of nine, and Wren stays. Fewer, and Wren walks. With him.' },
          'For fourteen years, in front of the Houses, she has said *the child*. Just now she said *Wren*.',
          '"Wren may send friends to plead with ' + ASKS_WORD + ' Masters," says the Binder. "I found it last night, looking for a rule against tonight."',
          'Wren mouths *five* at you. For once, Wren is counting Wren.',
        ],
        next: 'ch1_attune', button: 'The Masters\' door',
      },
      ch1_attune: {
        type: 'code', art: 'ch1_hall', mood: 'tense', fx: 'embers', flame: 0.7,
        text: [
          { text: 'The word is on the screen. Say it aloud, type it into every phone, then read your Sight page silently.', cls: 'whisper' },
        ],
        roles: 'Warden (keyboard): **the Binder**. Voice (reads aloud): **the Listener**.', sightSeconds: 90,
        codeLabel: 'The word over the Masters’ door — enter it on every phone',
        codeSub: 'The same seat as last night. Read your own page.',
        next: 'ch1_vote',
      },
      /* ---------- the hour before the bell ---------- */
      ch1_vote: {
        type: 'puzzle', puzzle: 'seats', puzzleId: 'ch1_vote', art: 'ch1_hall', artParams: { seated: true }, mood: 'tense', fx: 'embers', flame: 0.8, par: [3, 4.5, 6],
        clearText: true, clearWidget: true, // the instructions have been read: the vote, told, gets the whole box (the widget's status line would repeat it)
        text: [
          'The Provost takes the Chair, Seat 9. Wren stands beside her, very still.',
          { text: 'Say what your Sight page shows, Master by Master.', cls: 'whisper' },
          { text: 'Then choose ' + ASKS_WORD + ' Masters. The vote is called once.', cls: 'whisper' },
        ],
        config: () => {
          /* The bell is narrative (design §5 Ch1): at 6:00 the Provost stalls the count and the last hint tier fires.
             The vote is the commit — a wrong call is the vote (VOTE_LOST). Fewer than two approaches earns a nudge. */
          let stall = false; Store.set('CH1_BELL', false);
          const STALL = 'The bell. The Provost rises and does not call the vote. "The Chair has not finished hearing the Masters," she says, into total silence. She is stalling for you.';
          return {
            title: 'THE HOUR BEFORE THE BELL', center: 'the Hearth', startAngle: 20, max: ASKS, timer: 360, submitText: 'Call the vote',
            note: 'The Chair reads out the rule: *Five of nine keeps the child. You may ask **' + ASKS_WORD + '** Masters. A Master you ask votes **KEEP**, unless they will not hear you, you cannot reach them, or the Crown has paid them. A Master sworn to another votes as that Master does, unless you ask them yourself. A vote filed in writing stands. Everyone else votes **SEND**.*',
            timeoutText: STALL,
            onTimeout: () => {
              stall = true; Store.set('CH1_BELL', true);
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
              if (selected.length < 2) return { ok: false, text: selected.length ? 'One Master is not enough. Choose ' + ASKS_WORD + ', then call the vote.' : 'You have spoken to nobody. Choose ' + ASKS_WORD + ' Masters, then call the vote.' };
              Store.set('CH1_APPROACHED', selected.slice());
              return { ok: false, final: true, text: `${reasons} ${count} Short of five. The vote has been called.` };
            },
          };
        },
        hints: [
          'Each of you holds one piece. Say yours out loud.',
          'Nine seats, five needed, and ' + ASKS_WORD + ' asks. One Master you can reach brings a second vote with them.',
          'Seat 1 and Seat 7. Seat 1 brings Seat 2 with her. With the Chair and Seat 3, that is five.',
        ],
        onSolve: (s, r) => {
          if (r && r.ok) { Store.set('VOTE_LOST', false); Store.note('The nine voted 5–4 to keep Wren.'); }
          else { Store.set('VOTE_LOST', true); Store.inc('WREN_TRUST', -1); Store.note('The bell rang and the nine voted to send Wren to the capital.'); }
        },
        /* Only {sorrel, oriel} wins (see ASKS), so a won vote is always the same two asks, told as the asking.
           With no result to hand (a reload, a dump, the fit scan), the flag says which way it went.
           The won count is told as hands, not as a list of seats: four go up, the fifth is Oriel's. */
        solvedText: (s, r) => {
          const won = (r && 'ok' in r) ? !!r.ok : !s.flags.VOTE_LOST;
          if (won) return [
            'The Binder walks the length of the hall to Seat 1, Master Sorrel. Sorrel nods. "Since you asked me to my face." Seat 2 nods a breath later.',
            'The Reader asks Seat 7, Master Oriel, what the stone says. Forty years, and nobody has. "*Walk*," says Oriel.',
            'The Reader stops pretending, in front of nine Houses. "I read the Founders\' shapes. Last night they said *keep*." Nobody admits to that. Oriel writes the Reader\'s name in a black notebook.',
            (s.flags.CH1_BELL ? 'Then the vote.' : 'Then the bell. Then the vote.') + ' Four hands go up, then nothing. The Listener hears Oriel\'s heart make up its mind. Oriel shuts the notebook and raises her hand. "Tonight — keep." Five of nine. Wren stays.',
          ];
          const sel = (r && r.selected) || [];
          const t = tally(sel);
          const out = sel.map(id => REASONS[id]);
          out.push(`${s.flags.CH1_BELL ? 'The Chair' : 'Then the bell, and the Chair'} calls the vote, as it stands. ${t.keep.length} keep, ${t.send.length} send. ${listSeats(t.keep)} for keeping. It is not enough.`);
          return out;
        },
        next: (s, r) => ((r && 'ok' in r) ? r.ok : !s.flags.VOTE_LOST) ? 'ch1_won' : 'ch1_lost',
      },
      ch1_won: {
        art: 'ch1_hall', artParams: { seated: true }, mood: 'court', fx: 'embers', flame: 0.85, sfx: 'success',
        text: (s) => [
          'Wren lets go of the Provost\'s sleeve, one finger at a time.',
          `Wren beats the clerk to the Register, and writes *${group(s)}* after *Claimed by*, in the worst handwriting the Register has ever held. The clerk, writing second, writes nothing.`,
          { speaker: 'Wren', text: 'The Binder walked up to a Master! The Binder doesn\'t walk up to *anyone*. Listener, breathe. I\'m staying.' },
          'The Seer stares Seats 5 and 8 into the floor.',
          '"Staying," Wren says again, quieter, to hear how it sounds. The Provost reaches for Wren\'s collar, remembers nine Houses, and fixes her own.',
        ],
        next: 'ch1_errand', button: 'The fire',
      },
      /* Won path only. The errand comes before the prices, so Sorrel and Oriel are answering it. On a lost
         vote ch1_lost gives it instead. */
      ch1_errand: {
        art: 'ch1_hall', artParams: { low: true }, mood: 'tense', fx: 'embers', flame: 0.7,
        text: [
          'The fire coughs, and goes small. Wren flinches.',
          { speaker: 'Provost Marrow', text: 'If this fire goes cold, nobody votes on Wren again. The stone does. Under this school is the Cold Ember. It can light this fire again. Fourteen winters I have tried to lift it off its plinth. It will not come to me. Go and read to it. Tonight.' },
          '"Is there a rule against it?" asks the Binder.',
          { speaker: 'Provost Marrow', text: 'There will be by morning.' },
          '"I saw your door," she says, going. "…Ink. Good."',
        ],
        next: 'ch1_prices', button: 'What they want',
      },
      ch1_lost: {
        art: 'ch1_hall', artParams: { seated: true, soldiers: true }, mood: 'sorrow', fx: 'dust', flame: 0.8, sfx: 'fail',
        /* ch8_after reads "Claimed by: GROUP, in Wren's worst handwriting" on every path, so Wren writes it here too.
           The fire's first cough is in ch1_after on this path (ch1_errand has it on the other), where the art
           is already low; ch1_flow's "coughs again" needs it. The stake (it relights the fire, it will not come
           to the Provost) is said here too, because ch2 runs on it on every path. */
        text: (s) => [
          'Two soldiers step onto the dais. The Provost has to take Wren\'s hand off her sleeve herself.',
          { speaker: 'Wren', text: 'Don\'t. Look after Mom — the Provost. She\'s worse at this than I am.' },
          { text: 'Knock it on the table, soft, one more time.', cls: 'whisper' },
          `This time, Wren hears it. On the way past, Wren writes *${group(s)}* after *Claimed by*, in the worst handwriting the Register has ever held. The Provost closes the book.`,
          '"Bring me the Cold Ember from under this school," says the Provost, very low. It is how she shouts. "Tonight. It can light this fire again, and it will not come to me. With the only spare fire, even the Crown will bargain. Then I will fetch Wren home myself."',
        ],
        next: 'ch1_offer', button: 'Later',
      },
      /* ---------- the two prices (45 s) ---------- */
      ch1_prices: {
        type: 'choice', choice: 'PRICES', art: 'ch1_hall', artParams: { low: true }, mood: 'tense', fx: 'embers', flame: 0.7, timer: 45, timeout: 'neither',
        text: [
          'On the way out, Sorrel and Oriel collect. In the Houses, a vote is a loan.',
          { speaker: 'Master Sorrel', text: 'Whatever the Provost sends you for comes to the nine. Not to her.' },
          { speaker: 'Master Oriel', text: 'Tell me what you find down there. All of it.' },
        ],
        prompt: 'Whose price do you honor?',
        options: [
          { id: 'sorrel', text: 'Binder: "You have my word, Master Sorrel."', if: (s) => (s.flags.CH1_APPROACHED || []).includes('sorrel'), next: 'ch1_offer',
            set: { SORREL: true, ORIEL: false, NEITHER: false }, note: 'You promised Sorrel the Ember. She gave the Binder her writ.',
            after: ['Sorrel gives the Binder a writ under the Convocation\'s seal. A red thread runs from the Binder to her. Seven years, and it has never once done that for Wren.'] },
          { id: 'oriel', text: 'Reader: "All of it, Master Oriel."', if: (s) => (s.flags.CH1_APPROACHED || []).includes('oriel'), next: 'ch1_offer',
            set: { ORIEL: true, SORREL: false, NEITHER: false }, note: 'You promised Oriel everything below.',
            after: ['Oriel says nothing more. She is very good at it. The Seer goes still. *All of it* means the shadow, too.'] },
          { id: 'neither', text: 'Listener: "Neither… we answer to the Provost."', next: 'ch1_offer',
            set: { NEITHER: true, SORREL: false, ORIEL: false }, note: 'You refused both prices.',
            after: ['Two mouths go thin. Across the hall, the Provost fixes a collar that is not there.'] },
        ],
      },
      /* ---------- the Envoy's offer (60 s) ---------- */
      ch1_offer: {
        type: 'choice', choice: 'VANE_OFFER', art: 'ch1_passage', mood: 'dread', fx: 'dust', flame: 0.7, timer: 60, timeout: 'refuse', sfx: 'step',
        enter: (s) => { Store.set('VANE_OFFER_timedout', false); if (s.flags.VOTE_LOST) { if (s.flags.NEITHER == null) Store.set('NEITHER', true); if (s.flags.SORREL == null) Store.set('SORREL', false); if (s.flags.ORIEL == null) Store.set('ORIEL', false); } },
        text: (s) => [
          'Lord Vane waits in a side passage. His captain is learning your faces.',
          { speaker: 'Lord Vane', text: s.flags.VOTE_LOST
            ? 'The Houses will keep the child under guard tonight, as a courtesy to Ilsabet. Before midnight, bring it to me yourselves. It will come if you ask.'
            : 'Bring the child to me before midnight. It waved at you in front of nine Houses. It will come if you ask.' },
          'It is true. That is the worst thing he has said all night. Through the arch behind you, Wren is looking for you.',
          { speaker: 'Lord Vane', text: 'It lives. I promise you that, which is more than anyone else here will. Do it, and the Crown makes all four of you Masters. You can decide what I am afterwards. Ask your Seer what is under the paint.' },
          '"His heart didn\'t skip when he promised," the Listener whispers. "He means that part."',
        ],
        prompt: 'What do you tell him?',
        options: [
          /* A timeout lands here too (timeout: 'refuse'). Each reply is one paragraph, so the worst branch is
             six (R1.3): the Seer's aftermath is told in ch1_after, for a Seer who said it. */
          { id: 'refuse', text: 'Seer: "No. And the name is Wren."', next: 'ch1_after', set: { VANE_PRETEND: false, VANE_ACCEPT: false },
            after: [{ speaker: 'Lord Vane', text: 'Then I will ask again later, when it costs more.' }] },
          { id: 'pretend', text: 'Reader: "Before midnight. Of course."', next: 'ch1_after', set: { VANE_PRETEND: true, VANE_ACCEPT: false }, note: 'You told the Envoy you would bring him Wren. You did not mean it.',
            after: [{ speaker: 'Lord Vane', text: 'Wise. Or a lie. I can use either.' }] },
          { id: 'accept', text: 'Listener: "If it keeps Wren alive… yes."', cls: 'dark', next: 'ch1_after', set: { VANE_ACCEPT: true, VANE_PRETEND: false }, note: 'You accepted the Envoy\'s offer.',
            after: [{ speaker: 'Lord Vane', text: 'Before midnight. My captain knows your faces now.' }] },
        ],
      },
      ch1_after: {
        art: 'ch1_hall', artParams: (s) => ({ low: true, wren: true, soldiers: !!s.flags.VOTE_LOST }), mood: 'hearth', fx: 'embers', flame: 0.7,
        /* The Wren tab is read here, after the Envoy and before the four go below. Wren's answer opens
           ch1_flow, as ch0_tabs' instruction is answered by ch0_name. The phone cannot know how the vote
           went (no cast in ch1), so every line here fits either branch. Wren's "already written down" line
           is the Reader's cue: the Reader's page answers it. A Seer who refused the Envoy (not a timeout) is
           still sitting on both hands here; ch1_flow carries the accept on into the Listener's hand. */
        text: (s) => [
          'Wren sits' + (s.flags.VOTE_LOST ? ' between two soldiers,' : '') + ' as near the fire as is polite, and then a little nearer.' + (s.flags.VOTE_LOST ? ' The fire coughs, and goes small. Wren flinches.' : ''),
          ...(Store.chose('VANE_OFFER', 'refuse') && !s.flags.VANE_OFFER_timedout ? ['The Seer sits on both hands. Saying no to the Crown took one breath. Having said it is taking longer.'] : []),
          { speaker: 'Wren', text: 'Not coming back. He said it like it was already written down somewhere.' },
          { speaker: 'Wren', text: 'Anyway. A whole hour, standing still. Binder, write that down. In ink.' },
          { text: 'Open your **Wren** tab. Read your line to Wren, in seat order.', cls: 'whisper' },
        ],
        next: 'ch1_flow', button: 'The night moves on',
      },
      ch1_flow: {
        type: 'flow', art: 'ch1_hall', artParams: (s) => ({ low: true, wren: true, soldiers: !!s.flags.VOTE_LOST, aside: true }), mood: 'hearth', fx: 'embers', flame: 0.65,
        /* Wren answers each of the four lines, in seat order (Reader, Listener, Seer, Binder), one paragraph
           each. The ending turns, not reprises: the fire coughs again and the shadow points down, at
           what is under the stones, and the Provost is at the tapestry (ch2 opens behind it). */
        text: (s) => [
          { speaker: 'Wren', text: 'Every wall? Then I\'m bringing biscuits.' },
          '"Her heart jumped. For me," says Wren. "Don\'t tell her I know. She\'ll fix my collar for a month." Both hands go out to the fire. "It\'s warm. I never feel it." ' + (s.flags.VANE_ACCEPT ? 'The Listener takes one a beat late, and holds it longer.' : 'The Listener takes one, to check.') + ' Still cold. Held anyway.',
          { speaker: 'Wren', text: 'Tomorrow? That\'s further than I\'d got.' },
          { speaker: 'Wren', text: 'Of course his took. …Not a rule. A *promise*. Somebody carve that on something.' },
          'The fire coughs again. Wren\'s shadow turns, and points down, through the hearthstones. The Seer moves to sit in its way. There is no sitting in front of *down*.',
          'Behind the chairs, the Provost holds the tapestry aside, and waits.',
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
