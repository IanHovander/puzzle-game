/* Hearth bootstrap: title screen, seats & keys, new/resume. */
(function () {
  'use strict';
  const UI = window.VigilUI, Store = window.VigilStore, Audio = window.VigilAudio, FX = window.VigilFX, Input = window.VigilInput, Lore = window.VigilLore;
  document.body.classList.add('hearth'); document.body.classList.remove('companion');

  Game.mount({ stage: 'stage', fx: 'fx', text: 'text', actions: 'actions', widget: 'widget', chapter: 'chapter', timer: 'timer', hint: 'hint', mute: 'mute', menu: 'menu' });
  document.getElementById('qr').addEventListener('click', () => Game.showQR());
  document.getElementById('mapbtn').addEventListener('click', () => window.VigilMap.show());
  FX.set('embers', 0.6);
  Game.setArt('title');
  Audio.mood('hearth');

  const body = document.getElementById('title-body');
  const hasSave = Store.hasSave();
  if (hasSave) Store.load();
  Store.state.names = Lore.roles.map(r => r.nick);

  function render() {
    UI.clear(body);
    // Read top to bottom: what this is, where to sit, then the one button. Keys are claimed and
    // tested in the Prologue's first scene, and can be changed there or from the Menu.
    const intro = UI.el('div', { class: 'intro' });
    intro.appendChild(UI.el('p', { class: 'lead', text: 'Four players. About four hours.' }));
    intro.appendChild(UI.el('p', { html: 'This screen is the <strong>Hearth</strong>. You all share it.' }));
    intro.appendChild(UI.el('p', { html: 'Your phone is your <strong>Companion</strong>. It shows what only you can see.' }));
    body.appendChild(intro);

    const seating = UI.el('div', { class: 'seating' });
    seating.appendChild(UI.el('h2', { class: 'command', text: 'Sit in this order, left to right' }));
    seating.appendChild(UI.el('p', { class: 'sub', text: 'Facing the screen, all within reach of the keyboard.' }));
    const seats = UI.el('ol', { class: 'names' });
    Lore.roles.forEach((r, i) => {
      // r.what is "WHAT the glyphs say" / "WHEN — the order of things": one plain line per seat.
      const m = /^(\S+)\s*(?:—\s*)?(.*)$/.exec(r.what) || [null, r.what, ''];
      const seat = UI.el('li', { class: 'p' + i });
      seat.appendChild(UI.el('span', { class: 'seat-n', text: String(i + 1) }));
      seat.appendChild(UI.el('span', { class: 'seat-name', text: r.nick }));
      seat.appendChild(UI.el('span', { class: 'seat-what', html: `<b>${UI.esc(m[1].charAt(0) + m[1].slice(1).toLowerCase())}</b> ${UI.esc(m[2])}` }));
      seats.appendChild(seat);
    });
    seating.appendChild(seats);
    body.appendChild(seating);

    const buttons = UI.el('div', { class: 'buttons' });
    if (hasSave && Store.state.scene) {
      buttons.appendChild(UI.el('button', { class: 'btn primary big', text: 'Resume — ' + Store.elapsedText(), onclick: () => { Audio.init(); start(true); } }));
      buttons.appendChild(UI.el('button', { class: 'btn', text: 'New game', onclick: async () => { if (await UI.confirm('Erase the saved night and begin anew?', { danger: true, ok: 'Erase it' })) { const k = Store.state.keys; Store.reset(); Store.state.keys = k; Store.state.names = Lore.roles.map(r => r.nick); Store.save(); Audio.init(); start(false); } } }));
    } else {
      buttons.appendChild(UI.el('button', { class: 'btn primary big', text: 'Light the Hearth', onclick: () => { Audio.init(); Store.save(); start(false); } }));
    }
    buttons.appendChild(UI.el('button', { class: 'btn ghost', text: 'Phones: how to join', onclick: () => Game.showQR() }));
    body.appendChild(buttons);
    body.appendChild(UI.el('p', { class: 'fine', text: 'Sound on. Space or click skips ahead.' }));
  }
  render();

  async function start(resume) {
    Input.setKeys(Store.state.keys);
    await FX.fadeOut(900);
    document.getElementById('title').classList.add('hidden');
    document.getElementById('bar').classList.remove('hidden');
    document.getElementById('panel').classList.remove('hidden');
    await FX.fadeIn(900);
    if (resume) Game.resume(); else Game.begin(Game.chapters[0].start);
  }

  // Debug: ?scene=id jumps straight in; ?flags=A,B,C sets flags true; ?set=KEY=val
  const qs = new URLSearchParams(location.search);
  if (qs.get('scene')) {
    if (qs.get('flags')) qs.get('flags').split(',').filter(Boolean).forEach(f => { Store.state.flags[f] = true; });
    if (qs.get('set')) qs.get('set').split(',').forEach(kv => { const [k, v] = kv.split('='); Store.state.flags[k] = isNaN(+v) ? (v === 'true' ? true : v === 'false' ? false : v) : +v; });
    Input.setKeys(Store.state.keys); document.getElementById('title').classList.add('hidden'); document.getElementById('bar').classList.remove('hidden'); document.getElementById('panel').classList.remove('hidden'); Store.startTimer(); Game.go(qs.get('scene'));
  }
})();
