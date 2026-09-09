/* Lore tables shared by Hearth and Companion: roles, nicknames, Laws, chapters, cast specs, tokens. */
(function () {
  'use strict';
  const L = {};
  L.roles = [
    { id: 'reader',   idx: 0, name: 'The Reader',   nick: 'Reader', gift: 'Glyph-Sight', color: '#e0b04a', blurb: 'You read the Founders\' Tongue: four shapes, each read two ways. Inscriptions the Hearth shows faded are clean on your page. You hold the lexicon and, later, an older alphabet.', what: 'WHAT the glyphs say' },
    { id: 'listener', idx: 1, name: 'The Listener', nick: 'Listener',     gift: 'Ear-Sight',   color: '#4fb3bf', blurb: 'You hear what the Hearth cannot: the steps of a hymn, patrol boots by landmark, murmurs, and every heartbeat in a room — except one.', what: 'WHEN — the order of things' },
    { id: 'seer',     idx: 2, name: 'The Seer',     nick: 'Seer',      gift: 'Under-Sight', color: '#a482e6', blurb: 'You see beneath: where an inscription begins and whether it is turned, hidden doors, what paint covers, sockets under rebuilt stone — and which way every shadow falls.', what: 'WHERE — marks, doors, what is turned' },
    { id: 'binder',   idx: 3, name: 'The Binder',   nick: 'Binder',     gift: 'Thread-Sight', color: '#d96b4a', blurb: 'You see the threads between people — grey grief, gold Crown, red oath — and you keep the Book of Laws, each Law dated to the Founders or to the Order that came after.', what: 'WHETHER — the Laws, and who is bound to whom' },
  ];
  L.roleById = (id) => L.roles.find(r => r.id === id);
  L.nick = (i) => L.roles[i].nick;
  L.nicks = L.roles.map(r => r.nick);

  /* Attunement words per chapter and cast bit specs (see docs/DESIGN.md Appendix B). */
  L.chapters = [
    { id: 'ch0', n: 0, label: 'Prologue',  title: 'The Night the Hearth Guttered', word: 'KINDLE', cast: [] },
    { id: 'ch1', n: 1, label: 'Chapter I',   title: 'The Vigil',                 word: 'THORN',  cast: [] },
    { id: 'ch2', n: 2, label: 'Chapter II',  title: 'The Ember Vault',           word: 'KNOT',   cast: [{ bit: 0, key: 'VOTE_LOST' }] },
    { id: 'ch3', n: 3, label: 'Chapter III', title: 'The Whispering Gallery',    word: 'VEIL',   cast: [{ bit: 0, key: 'VOTE_LOST' }, { bit: 1, key: 'WREN_HURT' }, { bit: 2, key: 'VANE_ACCEPT' }] },
    { id: 'ch4', n: 4, label: 'Chapter IV',  title: 'The Oath',                  word: 'EMBER',  cast: [{ bit: 0, key: 'LETTER' }, { bit: 1, key: 'ORIEL' }, { bit: 2, key: 'SORREL' }, { bit: 3, key: 'VANE_ACCEPT' }, { bit: 4, key: 'SURRENDERED' }, { bit: 5, key: 'WREN_SCARED' }] },
    { id: 'ch5', n: 5, label: 'Chapter V',   title: 'The Long Stair',            word: 'ASH',    cast: [{ bit: 0, n: 2, key: 'OATH' }, { bit: 2, key: 'EMBER_LOST' }, { bit: 3, key: 'LAW0' }, { bit: 4, key: 'VANE_ACCEPT' }, { bit: 5, key: 'WREN_HURT' }] },
    { id: 'ch6', n: 6, label: 'Chapter VI',  title: 'The Bells of Thornhallow',  word: 'WELL',   cast: [{ bit: 0, n: 3, key: 'VOLUNTEER' }, { bit: 3, key: 'PRECRACKED' }] },
    { id: 'ch7', n: 7, label: 'Finale',      title: 'One Born of Four',          word: 'CROWN',  cast: [{ bit: 0, key: 'WALK_UNLOCKED' }, { bit: 1, key: 'VANE_ALLY' }, { bit: 2, n: 2, key: 'BELLS_CRACKED' }, { bit: 4, key: 'OATH_KNOT' }] },
    { id: 'ch8', n: 8, label: 'Epilogue',    title: 'What the Fire Left Behind', word: 'WREN',   cast: [{ bit: 0, n: 3, key: 'ENDING' }] },
  ];
  L.chapter = (id) => L.chapters.find(c => c.id === id);
  // OATH: 0 none, 1 KNOT, 2 EMBER. VOLUNTEER: 0 none, 1 reader, 2 listener, 3 seer, 4 binder. ENDING: 0 Fourfold, 1 Half, 2 Sealing, 3 Keeper, 4 Bargain.
  L.ENDINGS = ['fourfold', 'half', 'sealing', 'keeper', 'bargain'];

  /* Token channels: each is (channel id, values). Both sides use exactly these. */
  L.tokens = {
    whisper: { reader: ['TELL', 'DONTKNOW'], listener: ['LOUD', 'NO'], seer: ['TELL', 'NOTHING'], binder: ['YES', 'DONTKNOW'] },
    hold:    ['YES', 'NO'],
    finale:  ['WALK_ACCEPT', 'WALK_REFUSE', 'STAY_ACCEPT', 'STAY_REFUSE', 'ACCEPT', 'REFUSE', 'WALK', 'STAY'],
  };
  L.channel = (beat, roleId) => 'hf:' + beat + ':' + roleId;
  /* Finale token value set depends only on cast flags (both sides compute it identically). Returns null when no token is needed. */
  L.finaleValues = (flags) => {
    const walk = !!flags.WALK_UNLOCKED, ally = !!flags.VANE_ALLY;
    if (walk && !ally) return ['WALK_ACCEPT', 'WALK_REFUSE', 'STAY_ACCEPT', 'STAY_REFUSE'];
    if (walk && ally) return ['WALK', 'STAY'];
    if (!walk && !ally) return ['ACCEPT', 'REFUSE'];
    return null;
  };

  /* The Book of Laws. era: 'F' Founders (Year 0) or 'O' Order (year given). learned: chapter id where it appears. */
  L.laws = [
    { n: 0,  era: 'F', year: 0,   struck: true, text: 'COLD is written by four hands.', note: 'struck by the Convocation, 212. See Law 6.', learned: 'ch0' },
    { n: 1,  era: 'F', year: 0,   text: 'A sigil is read sunwise from the mark.', learned: 'ch0' },
    { n: 2,  era: 'F', year: 0,   text: 'The door hears one count. One word to each dial, in the order the line climbs, and then it is called.', learned: 'ch2' },
    { n: 3,  era: 'F', year: 0,   text: 'Where two Laws disagree, the older binds.', learned: 'ch2' },
    { n: 13, era: 'F', year: 0,   text: 'A Founder faces the hole their plinth was cut for.', learned: 'ch2' },
    { n: 9,  era: 'O', year: 212, text: 'A Founder faces the dial before them.', learned: 'ch2' },
    { n: 10, era: 'F', year: 0,   text: 'A turned line reverses and inverts; a lone turned glyph only inverts; every glyph keeps its place on the stone.', learned: 'ch4' },
    { n: 4,  era: 'O', year: 340, text: 'An oath\'s last glyph is its lock. KNOT cannot be unbound. EMBER can be remembered and reconsidered. The one you swear to cannot tell the difference.', learned: 'ch4' },
    { n: 5,  era: 'F', year: 0,   text: 'A turned inscription is placed widdershins from its mark.', learned: 'ch5' },
    { n: 11, era: 'O', year: 212, text: 'Every inscription is placed sunwise from the mark.', learned: 'ch5' },
    { n: 6,  era: 'O', year: 212, text: 'COLD is never written; where an inscription shows it, leave the slot empty.', learned: 'ch5' },
    { n: 12, era: 'F', year: 0,   text: 'An oath binds only if its lock is KNOT or EMBER.', learned: 'ch5' },
    { n: 8,  era: 'F', year: 0,   text: 'A Great Sigil names every glyph once.', learned: 'ch7' },
    { n: 7,  era: 'F', year: 0,   text: 'Idony\'s Law: a sigil sworn under KNOT begins at the sworn-to. Build the ring by the Laws, then turn it sunwise until the sworn-to\'s glyph sits at the first mark.', learned: 'ch7' },
  ];
  L.lawsUpTo = (chId) => { const n = L.chapter(chId).n; return L.laws.filter(l => L.chapter(l.learned).n <= n); };

  L.houseRule = 'Say what you see. Never show your phone.';
  L.prophecyOrder = 'When the Hearth goes cold, one born of four shall walk into the Cold, and it shall close behind them.';

  window.VigilLore = L;
})();
