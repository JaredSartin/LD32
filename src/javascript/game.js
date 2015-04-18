Quintus = require('quintus')

var Q = window.Q = Quintus()
        .include("Sprites, Scenes, Input, 2D, Anim, Touch, UI, TMX")
        .setup({ maximize: true })
        .controls();

Q.input.keyboardControls({
  LEFT: "left",
  RIGHT: "right",
  UP: "up",
  DOWN: "down",
  A: "left",
  D: "right",
  W: "up",
  S: "down",
  SPACE: "action"
});


Q.SPRITE_PLAYER = 2;
Q.SPRITE_WEAPON = 4;
Q.SPRITE_NPC = 8;
Q.SPRITE_INTERACTIVE = 16;

require('./character')
require('./interactive')
require('./tmx')
