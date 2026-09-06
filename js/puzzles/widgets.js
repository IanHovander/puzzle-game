/* Registers puzzle widgets with the engine. Individual widget modules attach to window.Vigil*; this file wires them to scene.puzzle types. */
(function () {
  'use strict';
  const reg = (type, fn) => window.Game.registerPuzzle(type, fn);
  reg('wheel', (box, cfg, api) => window.VigilWheel.build(box, cfg, api));
  reg('answer', (box, cfg, api) => window.VigilAnswer.build(box, cfg, api));
  reg('dials', (box, cfg, api) => window.VigilDials.build(box, cfg, api));
  reg('tiles', (box, cfg, api) => window.VigilTiles.build(box, cfg, api));
  reg('ring', (box, cfg, api) => window.VigilRing.build(box, cfg, api));
  reg('grid', (box, cfg, api) => window.VigilGrid.build(box, cfg, api));
  reg('binding', (box, cfg, api) => window.VigilBinding.build(box, cfg, api));
  reg('seats', (box, cfg, api) => window.VigilSeats.build(box, cfg, api));
  reg('dialseq', (box, cfg, api) => window.VigilDialSeq.build(box, cfg, api));
  reg('reaction', async (box, cfg, api) => window.VigilReaction.build(Object.assign({ container: box }, cfg)));
})();
