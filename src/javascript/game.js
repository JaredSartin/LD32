Quintus = require('quintus')

var Q = window.Q = Quintus().include("Sprites, Scenes, Input, 2D, Anim, Touch, UI, TMX")
Q.SPRITE_PLAYER = 2;
Q.SPRITE_WEAPON = 4;
Q.SPRITE_NPC = 8;
Q.SPRITE_INTERACTIVE = 16;
Q.SPRITE_DOOR = 32;

Q.setup({ maximize: true }).touch(Q.SPRITE_ALL);

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


require('./character')
require('./door')
require('./interactive')
require('./decoration')
require('./tmx')
