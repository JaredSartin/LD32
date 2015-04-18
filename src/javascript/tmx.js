var levels = require('./levels');

var files = [
  "robros.json",
  "robros.png",
  "interactive.json",
  "interactive.png",
];

for(i in levels) {
  files.push(levels[i].name + ".tmx");
}

Q.loadTMX(files.join(", "), function() {
  Q.compileSheets("robros.png","robros.json");
  Q.compileSheets("interactive.png","interactive.json");

  Q.animations("robro", {
    roll_right: { frames: [0,1], rate: 1/8, flip: false, loop: true },
    roll_left: { frames: [0,1], rate: 1/8, flip:"x", loop: true },
    stop_right: { frames: [0,1], rate: 99, flip: false, loop: true },
    stop_left: { frames: [0,1], rate: 99, flip:"x", loop: true },
    jump_right: { frames: [2,3], rate: 1/10, flip: false },
    jump_left: { frames: [2,3], rate: 1/10, flip: "x" },
    dead_right: { frames: [4], rate: 1/10 },
    dead_left: { frames: [4], rate: 1/10, flip: "x" },
  });

  Q.stageScene(levels[0].name);
});
