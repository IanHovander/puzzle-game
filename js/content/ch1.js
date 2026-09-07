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
    @media (max-height: 820px) { body[data-chapter="ch1"] .table-area { margin-top: 12px; width: min(300px, 42vh); height: min(300px, 42vh); } }
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
    sorrel: 'Seat 1 hears you out and nods once: "Since you asked me to my face." Seat 2, unasked, sees that hand go up and puts one up too.',
    quill: 'Seat 2 says yes, then says the rest. "I vote as Seat 1 votes. You spent that on nothing."',
    brack: 'Seat 3 stands with the Chair, in writing, since before the doors shut. You had him already.',
    hallan: 'Seat 4 does not turn his head. "I vote as my cousin votes. I hear nobody else."',
    vey: 'Something at Seat 5\'s cuff catches the light. Seat 5 votes SEND.',
    orrin: 'A soldier in the Envoy\'s grey steps between you and Seat 6. You never get near.',
    oriel: 'Seat 7 listens a long time, asks two questions, does not smile. "Very well. Tonight — keep."',
    tarn: 'Seat 8 smiles with every tooth. Crown coin in it. Seat 8 votes SEND.',
    marrow: 'The Chair does not hear cases. The Chair counts them.',
  };
  function seatCfg() {
    return ART.HOUSES.map((h, i) => ({
      id: SEATS[i].id, n: h.n, label: h.house === 'the Chair' ? 'the Chair' : h.house, banner: ART.banner(h, 26),
      locked: SEATS[i].id === 'marrow', lockedText: 'The Chair does not hear cases. The Chair counts them.',
    }));
  }
  const listSeats = (arr) => arr.length ? 'Seat' + (arr.length > 1 ? 's ' : ' ') + UI.list(arr.map(String)) : 'nobody';

  Game.addChapter({
    id: 'ch1', label: 'Chapter I', title: 'The Vigil', start: 'ch1_start', code: L.chapter('ch1').word,
    mood: 'court', fx: 'embers', art: 'ch1_hall', flame: 0.95,
    flow: {
      nodes: [
        { id: 'ch1_start', label: 'The Great Hall', col: 0, row: 2 },
        { id: 'ch1_vane', label: 'The Envoy and the writ', col: 1, row: 2 },
        { id: 'ch1_vote', label: 'The hour before the bell', col: 2, row: 2, kind: 'choice' },
        { id: 'ch1_prices', label: 'Five keep. Two prices', col: 3, row: 1, kind: 'choice' },
        { id: 'ch1_lost', label: 'Four keep. Wren under guard', col: 3, row: 3, secret: true },
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
        art: 'ch1_hall', mood: 'court', fx: 'embers', sfx: 'open', title: 'The Great Hall, an hour before the bell',
        enter: (s) => { if (s.flags.WREN_TRUST == null) Store.set('WREN_TRUST', 0); },
        text: [
          'Nine banners in the rafters, one for each House. Under each banner a chair, and in each chair a Master.',
          'Tonight is the Vigil: the night the Houses come to look at the child the fire left.',
          'At the far end the Hearth is breathing — up, down, up. Every grown-up here is pretending not to watch it.',
          'You are at the back. Wren waves at you. Wren is not supposed to wave.',
          { text: 'The Binder has the keys tonight. The Listener reads the Hearth aloud.', cls: 'whisper' },
        ],
        next: 'ch1_dais', button: 'The presenting',
      },
      ch1_dais: {
        art: 'ch1_dais', mood: 'court', fx: 'embers',
        text: [
          { speaker: 'Provost Marrow', text: 'Masters. Fourteen years ago this fire went out for one night. When it came back there was a child on the stones. I named the child.' },
          { speaker: 'Provost Marrow', text: 'The stone over your heads says one born of four. Tonight I stop arguing and show you.' },
          'That is the Provost. She runs this school, and she is the nearest thing Wren has to a mother.',
          'Wren goes up alone and stands still, which for Wren is enormous.',
          { speaker: 'Wren', text: 'Hello. It\'s me. I\'ll try not to fidget.' },
        ],
        next: 'ch1_vane', button: 'The doors',
      },
      ch1_vane: {
        art: 'ch1_vane', mood: 'dread', fx: 'dust', sfx: 'boom',
        text: [
          'The doors open before anyone asks them to. Cold first, then soldiers, then a grey coat.',
          'Lord Vane, the Crown\'s Envoy. He has a writ with a seal the size of a saucer.',
          { speaker: 'Vane', text: 'His Majesty asks one small thing: the child, tonight, for safekeeping.' },
          'The Provost does not move. Vane lowers his voice — not far enough.',
          { speaker: 'Vane', text: 'I have seen what is under the paint in this hall, Ilsabet.' },
          'Nobody knows what that means. Her face does.',
        ],
        next: 'ch1_flicker', button: 'The Provost answers',
      },
      ch1_flicker: {
        art: 'ch1_hall', mood: 'tense', fx: 'embers', flame: 0.7,
        text: [
          { speaker: 'Provost Marrow', text: 'This school does not hand its children to a writ. It hands them to a vote. Does the child stay tonight? Nine seats. Five keeps.' },
          'Then the Hearth flickers: a long, low bow of the flame. Every face turns to the fire.',
          'Every face but one. The Provost is looking at Wren. Then she turns to the back of the hall and speaks only to you.',
          { speaker: 'Provost Marrow', text: 'The bell is in an hour. Until then, a Master may be spoken to. Go.' },
          { text: 'Above the Masters\' door, a word is cut into the lintel.', cls: 'whisper' },
        ],
        next: 'ch1_attune', button: 'Look at the lintel',
      },
      ch1_attune: {
        type: 'code', art: 'ch1_hall', mood: 'tense', fx: 'embers',
        text: [
          { text: 'Open the Companion. Take your seat. Type the word on the lintel.', cls: 'whisper' },
          { text: 'Read your page. Say nothing yet.', cls: 'whisper' },
        ],
        roles: 'Warden (keyboard): **the Binder**. Voice (reads aloud): **the Listener**.', sightSeconds: 90,
        next: 'ch1_vote',
      },
      /* ---------- the hour before the bell ---------- */
      ch1_vote: {
        type: 'puzzle', puzzle: 'seats', puzzleId: 'ch1_vote', art: 'ch1_hall', mood: 'tense', fx: 'embers', flame: 0.8, par: [3, 4.5, 6],
        text: [
          'An hour. Nine Masters. Four of you, and the floor of the hall to cross.',
          'The board shows banners and numbers, and no names. You do not need nine names. You need two numbers.',
          { text: 'Each of you says your one thing out loud, before anybody crosses the floor.', cls: 'whisper' },
          { text: 'Reader — who is already pledged.', cls: 'whisper' },
          { text: 'Listener — who is still talking about it.', cls: 'whisper' },
          { text: 'Seer — who cannot be moved by anybody.', cls: 'whisper' },
          { text: 'Binder — who is sworn to whom.', cls: 'whisper' },
          { text: 'Then go to two Masters and call the vote. It is called once.', cls: 'whisper' },
        ],
        config: () => {
          /* The bell is narrative (design §5 Ch1): at 6:00 the Provost stalls the count and the last hint tier fires.
             The vote is the commit — a wrong call is the vote (VOTE_LOST). Fewer than two approaches earns a nudge. */
          let stall = false;
          const STALL = 'The bell. The Provost rises and does not call the vote: "The Chair has not finished hearing the Masters." She is stalling for you.';
          return {
            title: 'THE HOUR BEFORE THE BELL', center: 'the Hearth', startAngle: 20, max: 2, timer: 360, submitText: 'Call the vote',
            note: 'The Chair reads out the rule: *Five of nine keeps the child. You may ask **two** Masters. A Master you ask votes **KEEP** — unless they will not hear you, you cannot reach them, or the Crown has paid them. A Master sworn to another votes as that Master does, unless you ask them yourself. Everyone else votes **SEND**.*',
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
              if (selected.length < 2) return { ok: false, text: selected.length ? 'One Master spoken to. You may have one more.' : 'You have spoken to nobody. Go to two Masters, then call the vote.' };
              Store.set('CH1_APPROACHED', selected.slice());
              return { ok: false, final: true, text: `${reasons} ${count} Four is not five. The vote has been called.` };
            },
          };
        },
        hints: [
          'Four questions, four people: who is pledged (Reader), who is still talking (Listener), who cannot be moved at all (Seer), who is sworn to whom (Binder).',
          'You start at two, you need five, you get two asks. So one ask has to carry two votes — the Binder knows which one.',
          'Seat 1 and Seat 7. Seat 1 brings Seat 2 with her. With the Chair and Seat 3, that is five.',
        ],
        onSolve: (s, r) => {
          if (r && r.ok) { Store.set('VOTE_LOST', false); Store.note('The nine voted 5–4 to keep Wren.'); }
          else { Store.set('VOTE_LOST', true); Store.inc('WREN_TRUST', -1); Store.note('The bell rang and the nine voted to send Wren to the capital.'); }
        },
        solvedText: (s, r) => {
          const sel = (r && r.selected) || [];
          const t = tally(sel);
          const out = sel.map(id => REASONS[id]);
          out.push((r && r.ok)
            ? `Then the Chair calls it. ${listSeats(t.keep)} for keeping — five of nine. Wren stays.`
            : `Then the Chair calls it, as it stands. ${listSeats(t.keep)} for keeping. It is not enough.`);
          return out;
        },
        next: (s, r) => (r && r.ok) ? 'ch1_won' : 'ch1_lost',
      },
      ch1_won: {
        art: 'ch1_dais', mood: 'court', fx: 'embers', flame: 0.85, sfx: 'success',
        text: [
          'Five to four. The Provost lets out a breath so small that only the Listener catches it.',
          { speaker: 'Provost Marrow', text: 'The child stays. Lord Vane, we thank the Crown for its concern.' },
          'Vane bows. It is a very good bow. He has done it to people he later ruined.',
          { speaker: 'Wren', text: 'That was you. I watched the Binder walk up to Seat One. The Binder doesn\'t walk up to anyone.' },
          'Then the two Masters who said yes are at your elbows, and neither is smiling now.',
        ],
        next: 'ch1_prices', button: 'What they want',
      },
      ch1_lost: {
        art: 'ch1_dais', mood: 'sorrow', fx: 'dust', flame: 0.7, sfx: 'fail',
        text: [
          'Four. A vote is called once, and the hall does not count twice.',
          { speaker: 'Vane', text: 'The school has voted. His Majesty is grateful, and will not forget it.' },
          'Two soldiers step onto the dais. Wren looks at you — not frightened. Surprised. Wren had assumed you would manage it.',
          'Then Wren goes with them, and does not fidget once.',
          'The Provost comes to the back of the hall, where nobody is looking any more, and says one thing, very low.',
          { speaker: 'Provost Marrow', text: 'Then bring me the Cold Ember from under the school. I will get the child back myself.' },
        ],
        next: 'ch1_offer', button: 'Later',
      },
      /* ---------- the two prices (45 s) ---------- */
      ch1_prices: {
        type: 'choice', choice: 'PRICES', art: 'ch1_dais', mood: 'tense', fx: 'embers', timer: 45, timeout: 'neither',
        timerText: '*Forty-five heartbeats. They want an answer before the Provost reaches you.*',
        text: [
          'Seat 1 is Master Sorrel. Seat 7 is Master Oriel. They voted for you and would like that noticed.',
          { speaker: 'Master Sorrel', text: 'Under this school is a thing called the Cold Ember. When the Provost sends you down for it, it comes to the nine of us — the Convocation. Not to her.' },
          { speaker: 'Master Oriel', text: 'Tell me what you find down there. All of it.' },
          'And the Provost already crossing the hall. One price, or neither.',
        ],
        prompt: 'Whose price do you honour?',
        options: [
          { id: 'sorrel', text: 'Sorrel: the Ember goes to the nine.', if: (s) => (s.flags.CH1_APPROACHED || []).includes('sorrel'), next: 'ch1_offer',
            set: { SORREL: true, ORIEL: false, NEITHER: false }, note: 'You promised Sorrel the Ember.',
            after: [{ speaker: 'Master Sorrel', text: 'Good. See that you keep yours.' }, 'Oriel says nothing at all.'] },
          { id: 'oriel', text: 'Oriel: tell her everything you find below.', if: (s) => (s.flags.CH1_APPROACHED || []).includes('oriel'), next: 'ch1_offer',
            set: { ORIEL: true, SORREL: false, NEITHER: false }, note: 'You promised Oriel everything below.',
            after: [{ speaker: 'Master Oriel', text: 'All of it. Even the parts you don\'t like.' }, 'Sorrel does not forget.'] },
          { id: 'neither', text: 'Neither. You answer to the Provost.', next: 'ch1_offer',
            set: { NEITHER: true, SORREL: false, ORIEL: false }, note: 'You refused both prices.',
            after: ['Two thin mouths, and the Provost watching from across the hall.'] },
        ],
      },
      /* ---------- the Envoy's offer (60 s) ---------- */
      ch1_offer: {
        type: 'choice', choice: 'VANE_OFFER', art: 'ch1_passage', mood: 'dread', fx: 'dust', timer: 60, timeout: 'refuse', sfx: 'step',
        enter: (s) => { if (s.flags.VOTE_LOST) { if (s.flags.NEITHER == null) Store.set('NEITHER', true); if (s.flags.SORREL == null) Store.set('SORREL', false); if (s.flags.ORIEL == null) Store.set('ORIEL', false); } },
        timerText: '*Sixty heartbeats. He is very good at waiting.*',
        text: (s) => [
          'Later. The hall emptying, and a grey coat in a passage where no grey coat should be.',
          { speaker: 'Vane', text: s.flags.VOTE_LOST
            ? 'The Provost will have the boy back by morning. When she does — bring him to me before dawn.'
            : 'Bring the boy to me before dawn.' },
          { speaker: 'Vane', text: 'He lives. I promise you that. And the Crown makes the four of you Masters.' },
          { speaker: 'Vane', text: 'You think I am the villain of tonight. Ask your Seer what is under the paint.' },
          'He waits.',
        ],
        prompt: 'The Envoy waits.',
        options: [
          { id: 'refuse', text: 'Refuse him.', next: 'ch1_after', set: { VANE_PRETEND: false, VANE_ACCEPT: false },
            after: ['Vane nods.', { speaker: 'Vane', text: 'Then I will ask again later, when it costs more.' }] },
          { id: 'pretend', text: 'Pretend to accept.', sub: 'A lie he may believe.', next: 'ch1_after', set: { VANE_PRETEND: true, VANE_ACCEPT: false }, note: 'You told the Envoy you would bring him Wren. You did not mean it.',
            after: [{ speaker: 'Vane', text: 'Wise. Or a lie. I can use either.' }] },
          { id: 'accept', text: 'Accept.', cls: 'dark', sub: 'Wren lives, he says. Masters, all four.', next: 'ch1_after', set: { VANE_ACCEPT: true, VANE_PRETEND: false }, note: 'You accepted the Envoy\'s offer.',
            after: [{ speaker: 'Vane', text: 'Before dawn. My captain will know your faces.' }, 'For a moment he looks like a man handed something heavier than he asked for.'] },
        ],
      },
      ch1_after: {
        art: 'ch1_hall', mood: 'hearth', fx: 'embers', flame: 0.8,
        text: (s) => {
          const out = [];
          if (s.flags.VOTE_LOST) {
            out.push('Wren sits on the step between two soldiers, in a way that makes the soldiers look like furniture.');
            out.push({ speaker: 'Wren', text: 'It\'s fine. They have a warm room. I\'ve never had a warm room.' });
            out.push('Wren is lying, and is fourteen, and is doing it for you.');
          } else {
            out.push('Wren finds you last, and sits down with the exhaustion of somebody who has stood still for an hour.');
            out.push({ speaker: 'Wren', text: 'Seat Seven watched me the whole time. Like I was a sum she was doing. Seer, what is *on* that wall?' });
          }
          out.push('The Provost comes when the last Master has gone. She stands with her back to the fire. It flickers again — a short one, a cough.');
          out.push({ speaker: 'Provost Marrow', text: 'It has not done that in fourteen years. Under this school the Founders left the Cold Ember. If the fire goes out, the Ember lights it again.' });
          out.push({ speaker: 'Provost Marrow', text: 'In the morning I would have sent — no. Tonight. I am sending you tonight.' });
          return out;
        },
        next: 'ch1_flow', button: 'The night moves on',
      },
      ch1_flow: {
        type: 'flow', art: 'ch1_hall', mood: 'hearth', fx: 'embers',
        text: ['The bell has rung once tonight. It will ring again.', { text: 'The paths you walked, and the ones you did not.', cls: 'small' }],
        flowTitle: 'Chapter I — the paths you walked',
        stats: (s) => {
          const vote = s.flags.VOTE_LOST ? 'The nine voted to **send** Wren.' : 'The nine voted **5–4 to keep** Wren.';
          const price = s.flags.SORREL ? 'You honoured **Sorrel\'s** price.' : s.flags.ORIEL ? 'You honoured **Oriel\'s** price.' : s.flags.VOTE_LOST ? 'No Master named a price.' : 'You honoured **neither** price.';
          const vane = s.flags.VANE_ACCEPT ? 'You **accepted** the Envoy\'s offer.' : s.flags.VANE_PRETEND ? 'You **pretended** to accept.' : 'You **refused** the Envoy.';
          return `${vote} ${price} ${vane} Hints so far: ${s.flags.hintsTotal || 0}.`;
        },
        next: 'ch2_start', button: 'The Ember Vault',
      },
    },
  });
})();
