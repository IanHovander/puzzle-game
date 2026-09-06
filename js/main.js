/* Hearth bootstrap: title screen, seats & keys, new/resume. */
(function () {
  'use strict';
  const UI = window.VigilUI, Store = window.VigilStore, Audio = window.VigilAudio, FX = window.VigilFX, Input = window.VigilInput, Lore = window.VigilLore;

  Game.mount({ stage: 'stage', fx: 'fx', text: 'text', actions: 'actions', widget: 'widget', chapter: 'chapter', timer: 'timer', hint: 'hint', mute: 'mute', menu: 'menu' });
  document.getElementById('qr').addEventListener('click', () => Game.showQR());
  FX.set('embers', 0.6);
  Game.setArt('title');
  Audio.mood('hearth');

  const body = document.getElementById('title-body');
  const hasSave = Store.hasSave();
  if (hasSave) Store.load();
  Store.state.names = Lore.roles.map(r => r.nick);

  function render() {
    UI.clear(body);
    body.appendChild(UI.el('p', { class: 'fine', html: 'A cooperative story for four, in one sitting of about two hours. One screen is the <strong>Hearth</strong>. Each of you keeps a phone as your <strong>Companion</strong> — it shows what only you can see. Talk. Nothing tonight can be solved alone.' }));
    body.appendChild(UI.el('p', { class: 'warn', text: 'Fair warning: at one clearly announced moment, the bells of Thornhallow will ring and all four of you will need quick hands on this keyboard. You will be told before it happens.' }));

    const seats = UI.el('div', { class: 'names' });
    Lore.roles.forEach((r, i) => {
      const lab = UI.el('label', { class: 'p' + i });
      lab.appendChild(UI.el('span', { text: r.name }));
      lab.appendChild(UI.el('span', { class: 'seat-nick', text: '"' + r.nick + '"' }));
      lab.appendChild(UI.el('span', { class: 'seat-gift', text: r.gift }));
      lab.appendChild(UI.el('span', { class: 'seat-key', html: `key <b>${UI.esc(Store.state.keys[i] === ' ' ? 'SPACE' : Store.state.keys[i])}</b>` }));
      seats.appendChild(lab);
    });
    body.appendChild(seats);
    body.appendChild(UI.el('p', { class: 'keys', html: `Sit in this order, left to right, facing the screen. <button class="btn small ghost" id="chg-keys">change keys</button>` }));
    body.querySelector('#chg-keys').addEventListener('click', () => {
      const v = prompt('Four keys, left to right, separated by spaces (letters, digits, or . , / ;). Spread them across the keyboard.', Store.state.keys.join(' '));
      if (!v) return; const ks = v.trim().split(/\s+/).map(x => x.toUpperCase()).filter(x => x.length === 1 && /[A-Z0-9.,\/;]/.test(x));
      if (ks.length !== 4 || new Set(ks).size !== 4) { alert('Need four different single keys.'); return; }
      Store.state.keys = ks; Store.save(); Input.setKeys(ks); render();
    });

    const buttons = UI.el('div', { class: 'buttons' });
    if (hasSave && Store.state.scene) {
      buttons.appendChild(UI.el('button', { class: 'btn primary', text: 'Resume — ' + Store.elapsedText(), onclick: () => { Audio.init(); start(true); } }));
      buttons.appendChild(UI.el('button', { class: 'btn', text: 'New game', onclick: () => { if (confirm('Erase the saved night and begin anew?')) { const k = Store.state.keys; Store.reset(); Store.state.keys = k; Store.state.names = Lore.roles.map(r => r.nick); Store.save(); Audio.init(); start(false); } } }));
    } else {
      buttons.appendChild(UI.el('button', { class: 'btn primary', text: 'Light the Hearth', onclick: () => { Audio.init(); Store.save(); start(false); } }));
    }
    buttons.appendChild(UI.el('button', { class: 'btn ghost', text: 'Phones: how to join', onclick: () => Game.showQR() }));
    body.appendChild(buttons);
    body.appendChild(UI.el('p', { class: 'fine', html: 'Sound on. Sit where everyone can see this screen and reach the keyboard; a wireless keyboard on the table is ideal. <span class="small">Press space or click the text to hurry the narration.</span>' }));
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
