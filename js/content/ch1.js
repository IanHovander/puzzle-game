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
  ` }));

  /* ---------- the Convocation ----------
     Seat data lives here for the tally only; the Hearth prints banners and seat numbers, never names or Sightings. */
  const SEATS = [
    { id: 'sorrel', n: 1 }, { id: 'quill', n: 2 }, { id: 'brack', n: 3 }, { id: 'hallan', n: 4 }, { id: 'vey', n: 5 },
    { id: 'orrin', n: 6 }, { id: 'oriel', n: 7 }, { id: 'tarn', n: 8 }, { id: 'marrow', n: 9 },
  ];
  const UNAPPROACHABLE = ['marrow', 'orrin', 'hallan'];
  const COIN = ['vey', 'tarn'];
  /* Exact rule card: approached -> KEEP unless coin (SEND) or unapproachable; a threaded Master follows the thread unless approached;
     undecided votes SEND unless approached. Brack stands with the Provost; Orrin votes opposite Brack; Hallan votes as Orrin. */
  function tally(selected) {
    const app = (id) => selected.includes(id) && !UNAPPROACHABLE.includes(id);
    const v = {};
    v.marrow = 'KEEP';
    v.brack = 'KEEP';
    v.orrin = v.brack === 'KEEP' ? 'SEND' : 'KEEP';
    v.hallan = v.orrin;
    v.vey = 'SEND'; v.tarn = 'SEND';
    v.sorrel = app('sorrel') ? 'KEEP' : 'SEND';
    v.quill = app('quill') ? 'KEEP' : v.sorrel;
    v.oriel = app('oriel') ? 'KEEP' : 'SEND';
    const keep = SEATS.filter(s => v[s.id] === 'KEEP').map(s => s.n), send = SEATS.filter(s => v[s.id] === 'SEND').map(s => s.n);
    return { votes: v, keep, send, ok: keep.length >= 5 };
  }
  const REASONS = {
    sorrel: 'Seat 1 hears you out and nods once: "Since you asked me to my face." Seat 2, unasked, watches Seat 1 and votes the same way.',
    quill: 'Seat 2 agrees at once — and then looks to Seat 1, who was not asked, and Seat 1 votes the other way.',
    brack: 'Seat 3 waves you off: "I was with the Provost before you were born. You have spent a breath on nothing."',
    hallan: 'Seat 4 does not turn. "I vote as Seat 6 votes, and I hear no one else." That approach is spent.',
    vey: 'Seat 5 takes both your hands, warmly, and something glints at the cuff. "Of course." Seat 5 votes SEND.',
    orrin: 'A soldier in the Envoy\'s grey steps between you and Seat 6. The Master does not look up. That approach is spent.',
    oriel: 'Seat 7 listens for a long time, and says: "Very well. Tonight — keep."',
    tarn: 'Seat 8 smiles with every tooth, and votes SEND. There was coin in that smile.',
    marrow: 'The Chair cannot be approached. She looks at you as if you should have known that.',
  };
  function seatCfg() {
    return ART.HOUSES.map((h, i) => ({ id: SEATS[i].id, n: h.n, label: h.house === 'the Chair' ? 'the Chair' : h.house, banner: ART.banner(h, 26) }));
  }
  const listSeats = (arr) => arr.length ? 'Seat' + (arr.length > 1 ? 's ' : ' ') + UI.list(arr.map(String)) : 'nobody';

  Game.addChapter({
    id: 'ch1', label: 'Chapter I', title: 'The Vigil', start: 'ch1_start', code: L.chapter('ch1').word,
    mood: 'court', fx: 'embers', art: 'ch1_hall', flame: 0.95,
    flow: {
      nodes: [
        { id: 'ch1_start', label: 'The Great Hall', col: 0, row: 2 },
        { id: 'ch1_vane', label: 'The Envoy and the writ', col: 1, row: 2 },
        { id: 'ch1_vote', label: 'The Convocation votes', col: 2, row: 2, kind: 'choice' },
        { id: 'ch1_prices', label: 'Five keep. Two prices', col: 3, row: 1, kind: 'choice' },
        { id: 'ch1_lost', label: 'The vote fails. Wren under guard', col: 3, row: 3, secret: true },
        { id: 'ch1_p_sorrel', label: 'Sorrel: the Ember to the Convocation', col: 4, row: 0, secret: true, when: (s) => !!s.flags.SORREL },
        { id: 'ch1_p_oriel', label: 'Oriel: tell her everything', col: 4, row: 1, secret: true, when: (s) => !!s.flags.ORIEL },
        { id: 'ch1_p_neither', label: 'Neither. You owe only Marrow', col: 4, row: 2, secret: true, when: (s) => !!s.flags.NEITHER && !s.flags.VOTE_LOST },
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
        art: 'ch1_hall', mood: 'court', fx: 'embers', sfx: 'open', title: 'The Great Hall of Thornhallow, an hour before the Vigil',
        enter: (s) => { if (s.flags.WREN_TRUST == null) Store.set('WREN_TRUST', 0); },
        text: [
          'Nine banners hang from the rafters, one for each House of the Marches, and beneath each banner sits a Master with the Sighting their House sent them here to keep.',
          'At the far end, the Hearth. It has burned for four hundred years without a keeper. Tonight it is doing something nobody in this hall has seen it do. It is *breathing*.',
          'You have been put at the back with the other fourth-years, where you can see everything and touch nothing. Wren waved at you on the way in. Wren is not supposed to wave.',
          { text: 'The Binder has the keys tonight. The Listener reads the Hearth aloud.', cls: 'whisper' },
        ],
        next: 'ch1_dais', button: 'The presenting',
      },
      ch1_dais: {
        art: 'ch1_dais', mood: 'court', fx: 'embers',
        text: [
          { speaker: 'Provost Marrow', text: 'Masters of the nine Houses. Fourteen years ago the Hearth guttered, and when it came back there was a child on the stones. I named the child. Tonight, as the Order requires, I present the child to you: the one born of four.' },
          'Wren walks up onto the dais alone, stands where the Provost points, and stands still. For Wren this is an act of enormous discipline.',
          { speaker: 'Wren', text: 'Hello. It\'s me. I\'ll try not to fidget.' },
          'Somebody laughs. Somebody else does not. The Hearth breathes in.',
        ],
        next: 'ch1_vane', button: 'The doors',
      },
      ch1_vane: {
        art: 'ch1_vane', mood: 'dread', fx: 'dust', sfx: 'boom',
        text: [
          'The great doors open before anyone has asked them to. Cold comes in first, then the soldiers, then a man in a grey coat who walks as if the hall were his and he were being gracious about it.',
          'Lord Cassian Vane, the Crown\'s Envoy. He carries a writ with a seal the size of a saucer.',
          { speaker: 'Vane', text: 'Provost. Masters. His Majesty greets the Vigil and asks a small thing: the child, for safekeeping, tonight. The Crown has a warm room and a long road, and no wish to trouble a school.' },
          'Marrow does not move. Vane lowers his voice — not enough. The Listener hears it. Everyone hears it.',
          { speaker: 'Vane', text: 'I have seen what is under the paint in this hall, Ilsabet.' },
        ],
        next: 'ch1_flicker', button: 'The Provost answers',
      },
      ch1_flicker: {
        art: 'ch1_hall', mood: 'tense', fx: 'embers', flame: 0.7,
        text: [
          { speaker: 'Provost Marrow', text: 'The Vigil does not hand its wards to a writ. It hands them to a vote. Masters: does the child stay in this hall tonight? Nine seats. Five keep.' },
          'And then, before anyone can answer, the Hearth *flickers* — a long, low gutter, four hundred years of fire bowing its head. The hall goes silent. Every face turns to the fire.',
          'Every face but one. Marrow looks at Wren.',
          'Then she turns to the back of the hall, where four fourth-years are standing very still, and speaks to you as if there were nobody else in it.',
          { speaker: 'Provost Marrow', text: 'The Convocation votes at the bell. Until then the Masters may be spoken to. You have until the bell to talk to whoever you must. Go.' },
          { text: 'Above the Masters\' door, a word is cut into the lintel.', cls: 'whisper' },
        ],
        next: 'ch1_attune', button: 'Look at the lintel',
      },
      ch1_attune: {
        type: 'code', art: 'ch1_hall', mood: 'tense', fx: 'embers',
        text: ['Cut into the lintel of the Masters\' door, worn smooth by four hundred years of Masters ducking under it: a word. Each of you, open your Companion and turn the page with it. Read your Sight. Say nothing yet.'],
        roles: 'Warden of the Hearth (keyboard): **The Binder**. Voice (reads aloud): **The Listener**.', sightSeconds: 90,
        next: 'ch1_vote',
      },
      /* ---------- the Convocation vote ---------- */
      ch1_vote: {
        type: 'puzzle', puzzle: 'seats', puzzleId: 'ch1_vote', art: 'ch1_hall', mood: 'tense', fx: 'embers', flame: 0.8, par: [3, 4.5, 6],
        text: [
          'Nine seats, sunwise from the Chair. The Hearth shows you banners and numbers. Who sits under each banner, what they whisper, what glints at their cuffs and who is tied to whom — that is on your phones.',
          { text: 'The bell rings in six minutes. Marrow will hold the Convocation past it if she can — but a vote, once called, is called.', cls: 'whisper' },
          'Say what you see. Then choose two Masters to approach, and call the vote. The Convocation votes once.',
        ],
        config: () => {
          /* The six-minute bell is narrative (design §5 Ch1): at 6:00 Marrow stalls the Convocation and the ladder's last tier fires.
             The vote itself is the commit — a wrong call is the vote (VOTE_LOST). Fewer than two approaches only earns a nudge. */
          let stall = false;
          const STALL = 'The bell. Marrow rises — and does not call the vote. "The Chair has not finished hearing the Masters." She is stalling the Convocation, for you, and cannot for long. The fire has one last thing to whisper; ask it, then approach whoever you must.';
          return {
            title: 'THE CONVOCATION', center: 'the Hearth', startAngle: 20, max: 2, timer: 360, submitText: 'Call the vote',
            note: 'The Convocation\'s rule card, read aloud by the Chair: *You may approach **two** Masters before the bell. An approached Master votes **KEEP** — unless they hold Crown coin (they vote **SEND** whoever asks) or cannot be approached. A Master with a thread follows it unless approached. An undecided Master votes SEND unless approached. **Five of nine** keeps Wren.*',
            timeoutText: STALL,
            onTimeout: () => {
              stall = true;
              if ((Store.state.hintsUsed.ch1_vote || 0) < 3) { Store.state.hintsUsed.ch1_vote = 3; Store.save(); }
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
              if (selected.length < 2) return { ok: false, text: selected.length ? 'One Master spoken to. You may approach one more — and a vote, once called, is called.' : 'You have spoken to no one. Approach two Masters, then call the vote.' };
              Store.set('CH1_APPROACHED', selected.slice());
              return { ok: false, final: true, text: `${reasons} ${count} Four keep is not five. The Convocation has voted.` };
            },
          };
        },
        hints: [
          'Two seats are bought — The Seer can see the coin. Do not waste an approach on either.',
          'Who follows whom? The Binder\'s threads say who votes with whom; the Listener\'s murmurs say who will listen — and who will not. The Reader has the names under the banners. One approach can be worth two votes.',
          'Approach Seat 1 (Sorrel) and Seat 7 (Oriel). Sorrel brings Quill with her; Oriel is undecided and can be persuaded; with Brack and the Chair that is five.',
        ],
        onSolve: (s, r) => {
          if (r && r.ok) { Store.set('VOTE_LOST', false); Store.note('The Convocation voted 5–4 to keep Wren.'); }
          else { Store.set('VOTE_LOST', true); Store.inc('WREN_TRUST', -1); Store.note('The bell rang and the Convocation voted to send Wren to the capital.'); }
        },
        solvedText: (s, r) => {
          const sel = (r && r.selected) || [];
          const t = tally(sel);
          const out = sel.map(id => REASONS[id]);
          if (r && r.ok) out.push(`Then the Chair calls it. ${listSeats(t.keep)} for keeping — five of nine. Wren stays.`);
          else out.push(`Then the Chair calls it, as it stands. ${t.keep.length} keep, ${t.send.length} send — ${listSeats(t.keep)} for keeping. It is not enough.`);
          return out;
        },
        next: (s, r) => (r && r.ok) ? 'ch1_won' : 'ch1_lost',
      },
      ch1_won: {
        art: 'ch1_dais', mood: 'court', fx: 'embers', flame: 0.85, sfx: 'success',
        text: [
          'Five to four. Marrow lets out a breath so small that only the Listener hears it.',
          { speaker: 'Provost Marrow', text: 'The child stays. Lord Vane, the Vigil thanks the Crown for its concern, and will see the Crown to a warm room and a long road in the morning.' },
          'Vane bows. It is a good bow. He has clearly done it to people he has later ruined.',
          { speaker: 'Wren', text: 'Was that *you*? That was you. I saw the Binder talking to Seat One. The Binder never talks to anyone.' },
          'Then the two Masters you spoke to are at your elbows, one on each side, and neither of them is smiling any more.',
        ],
        next: 'ch1_prices', button: 'Their prices',
      },
      ch1_lost: {
        art: 'ch1_dais', mood: 'sorrow', fx: 'dust', flame: 0.7, sfx: 'fail',
        text: [
          'Not five. A vote, once called, is called; the Convocation does not count twice.',
          { speaker: 'Vane', text: 'The Vigil has voted. His Majesty is grateful, and will not forget it.' },
          'Two soldiers walk up onto the dais. Wren looks at the four of you — not frightened, exactly. Surprised. Wren had assumed you would manage it. Then Wren goes with them, to the edge of the dais under guard, and does not fidget once.',
          'Marrow crosses the hall to the back, where nobody is looking any more, and says one thing, very low, only to you.',
          { speaker: 'Provost Marrow', text: 'Then bring the Ember. I will get the child back myself.' },
        ],
        next: 'ch1_offer', button: 'Later',
      },
      /* ---------- the prices (45 s) ---------- */
      ch1_prices: {
        type: 'choice', choice: 'PRICES', art: 'ch1_dais', mood: 'tense', fx: 'embers', timer: 45, timeout: 'neither',
        timerText: '*Forty-five heartbeats. They want an answer before the Provost reaches you.*',
        text: (s) => {
          const app = s.flags.CH1_APPROACHED || [];
          const out = [];
          if (app.includes('sorrel')) out.push({ speaker: 'Master Sorrel of Harrowden', text: 'The Cold Ember — when you bring it up, and she will send you for it, she always meant to — comes to the Convocation. Not to the Provost. That is my price.' });
          if (app.includes('oriel')) out.push({ speaker: 'Master Oriel of Sable', text: 'Tell me what you find below. All of it. That is mine.' });
          out.push('Two prices, and Marrow already crossing the hall toward you. You may honour one. Or neither, and owe nothing to anyone but her.');
          return out;
        },
        prompt: 'Whose price do you honour?',
        options: [
          { id: 'sorrel', text: 'Honour Sorrel: the Ember goes to the Convocation, not the Provost.', sub: 'Harrowden will remember it.', if: (s) => (s.flags.CH1_APPROACHED || []).includes('sorrel'), next: 'ch1_offer',
            set: { SORREL: true, ORIEL: false, NEITHER: false }, note: 'You promised Sorrel the Cold Ember for the Convocation.',
            after: [{ speaker: 'Master Sorrel', text: 'Good. Harrowden keeps its word. See that you keep yours.' }, 'Oriel says nothing at all, which from Oriel is a great deal.'] },
          { id: 'oriel', text: 'Honour Oriel: tell her everything you find below.', sub: 'All of it.', if: (s) => (s.flags.CH1_APPROACHED || []).includes('oriel'), next: 'ch1_offer',
            set: { ORIEL: true, SORREL: false, NEITHER: false }, note: 'You promised Oriel everything you find below.',
            after: [{ speaker: 'Master Oriel', text: 'All of it. Even the parts you don\'t like.' }, 'Sorrel\'s mouth goes thin. She does not forget; it is what Harrowden is for.'] },
          { id: 'neither', text: 'Honour neither. You answer to the Provost.', next: 'ch1_offer',
            set: { NEITHER: true, SORREL: false, ORIEL: false }, note: 'You refused both Masters\' prices.',
            after: ['Sorrel\'s mouth goes thin. Oriel shrugs, as if she had expected nothing else and is a little sorry to be right.', 'Across the hall, Marrow — who has heard none of it — looks at you a moment longer than she needs to.'] },
        ],
      },
      /* ---------- Vane's offer (60 s) ---------- */
      ch1_offer: {
        type: 'choice', choice: 'VANE_OFFER', art: 'ch1_passage', mood: 'dread', fx: 'dust', timer: 60, timeout: 'refuse', sfx: 'step',
        enter: (s) => { if (s.flags.VOTE_LOST) { if (s.flags.NEITHER == null) Store.set('NEITHER', true); if (s.flags.SORREL == null) Store.set('SORREL', false); if (s.flags.ORIEL == null) Store.set('ORIEL', false); } },
        timerText: '*Sixty heartbeats. He is very good at waiting.*',
        text: (s) => [
          'Later. The hall emptying, the Masters gone to their wine, and a grey coat in the passage where you did not expect one. Vane. Alone — or as alone as a man with forty soldiers ever is.',
          { speaker: 'Vane', text: s.flags.VOTE_LOST
            ? 'The Provost will have the boy back from my men by morning. I know her; I have known her longer than you have been alive. When she does — bring him to me before dawn.'
            : 'Bring the boy to me before dawn.' },
          { speaker: 'Vane', text: 'He lives — I promise you that. And the Crown makes you Masters. All four of you, younger than any in that hall.' },
          { speaker: 'Vane', text: 'You think I am the villain of this night. Ask your Seer what is under the paint.' },
          'He waits.',
        ],
        prompt: 'The Envoy waits.',
        options: [
          { id: 'refuse', text: 'Refuse him.', next: 'ch1_after', set: { VANE_PRETEND: false, VANE_ACCEPT: false },
            after: ['Vane nods, as if you have confirmed something he already thought.', { speaker: 'Vane', text: 'Then I will ask again later, when it costs more.' }] },
          { id: 'pretend', text: 'Pretend to accept.', sub: 'A lie he may believe. It could be useful later.', next: 'ch1_after', set: { VANE_PRETEND: true, VANE_ACCEPT: false }, note: 'You told the Envoy you would bring him Wren. You did not mean it.',
            after: [{ speaker: 'Vane', text: 'Wise. Or a lie. I can use either.' }, 'He smiles, and goes, and the passage is somehow colder for his leaving it.'] },
          { id: 'accept', text: 'Accept.', cls: 'dark', sub: 'Wren lives, he says. Masters, all four.', next: 'ch1_after', set: { VANE_ACCEPT: true, VANE_PRETEND: false }, note: 'You accepted the Envoy\'s offer.',
            after: [{ speaker: 'Vane', text: 'Before dawn. My captain will know your faces.' }, 'He does not thank you. For one moment he looks like a man who has been handed something heavier than he asked for. Then the grey coat turns, and is gone.'] },
        ],
      },
      ch1_after: {
        art: 'ch1_hall', mood: 'hearth', fx: 'embers', flame: 0.8,
        text: (s) => {
          const out = [];
          if (s.flags.VOTE_LOST) {
            out.push('Wren is still on the dais, between two soldiers, and has found a way to sit on the step that makes the soldiers look like furniture.');
            out.push({ speaker: 'Wren', text: 'It\'s fine. It\'s *fine*. They\'ve got a warm room. I\'ve never had a warm room. The Reader, don\'t make that face.' });
            out.push('Wren is lying, and is fourteen, and is doing it for you.');
          } else {
            out.push('Wren finds you last, as the hall empties, and sits on the end of a bench with the particular exhaustion of someone who has stood still for an hour.');
            out.push({ speaker: 'Wren', text: 'Seat Seven looked at me the whole time. Not unkindly. Like I was a sum she was doing. The Seer, stop looking at the wall. What is *on* the wall?' });
          }
          out.push('Marrow comes to you when the last Master has gone. She stands with her back to the Hearth, which flickers again — a short one, a cough — and she does not turn round.');
          out.push({ speaker: 'Provost Marrow', text: 'It has not done that in fourteen years. Beneath this school is the Cold Ember, which relights the Hearth if it gutters again. In the morning I would have sent —' });
          out.push({ speaker: 'Provost Marrow', text: 'No. Tonight. I am sending you tonight.' });
          return out;
        },
        next: 'ch1_flow', button: 'The night moves on',
      },
      ch1_flow: {
        type: 'flow', art: 'ch1_hall', mood: 'hearth', fx: 'embers',
        text: ['The bell has rung once tonight. It will ring again.', { text: 'The paths you walked in the Great Hall, and the ones you did not.', cls: 'small' }],
        flowTitle: 'Chapter I — the paths you walked',
        stats: (s) => {
          const vote = s.flags.VOTE_LOST ? 'The Convocation voted to **send** Wren.' : 'The Convocation voted **5–4 to keep** Wren.';
          const price = s.flags.SORREL ? 'You honoured **Sorrel\'s** price.' : s.flags.ORIEL ? 'You honoured **Oriel\'s** price.' : s.flags.VOTE_LOST ? 'No Master named a price.' : 'You honoured **neither** price.';
          const vane = s.flags.VANE_ACCEPT ? 'You **accepted** the Envoy\'s offer.' : s.flags.VANE_PRETEND ? 'You **pretended** to accept the Envoy\'s offer.' : 'You **refused** the Envoy.';
          return `${vote} ${price} ${vane} Hints so far: ${s.flags.hintsTotal || 0}.`;
        },
        next: 'ch2_start', button: 'The Ember Vault',
      },
    },
  });
})();
