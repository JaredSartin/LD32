var levels = require('./levels');

var files = [
  "tiles.png",
  "jim.json",
  "jim.png",
  "jen.json",
  "jen.png",
];

for(i in levels) {
  files.push(levels[i].name + ".tmx");
}

Q.loadTMX(files.join(", "), function() {
  Q.compileSheets("jim.png","jim.json");
  Q.compileSheets("jen.png","jen.json");
  // Q.compileSheets("interactive.png","interactive.json");

  Q.animations("person", {
    walk_right: { frames: [0,1,2,3,4,5,6,7,8,9,10], rate: 1/12, flip: false, loop: true },
    walk_left: { frames: [0,1,2,3,4,5,6,7,8,9,10], rate: 1/12, flip: "x", loop: true },
    stand_right: { frames: [8,9], rate: 99, flip: false, loop: true },
    stand_left: { frames: [8,9], rate: 99, flip:"x", loop: true },
  });

  Q.stageScene(levels[0].name);
});
