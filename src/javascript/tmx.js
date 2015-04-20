var levels = require('./levels');

var files = [
  "tiles.png",
  "bath.json",
  "bath.png",
  "jim.json",
  "jim.png",
  "jen.json",
  "jen.png",
  "pearl.json",
  "pearl.png",
  "table.json",
  "table.png",
  "bookshelf.json",
  "bookshelf.png",
  "door.json",
  "door.png",
  "paperfall.json",
  "paperfall.png",
  "BigMapColor.jpg",
];

for(i in levels) {
  files.push(levels[i].name + ".tmx");
}

Q.loadTMX(files.join(", "), function() {
  Q.compileSheets("jim.png","jim.json");
  Q.compileSheets("jen.png","jen.json");
  Q.compileSheets("pearl.png","pearl.json");
  Q.compileSheets("table.png","table.json");
  Q.compileSheets("door.png","door.json");
  Q.compileSheets("bath.png","bath.json");
  Q.compileSheets("bookshelf.png","bookshelf.json");
  Q.compileSheets("paperfall.png","paperfall.json");

  var frames = [];
  while(frames.length < 26) { frames.push(frames.length); }
  Q.animations("Jim", {
    walk_right: { frames: [0,1,2,3,4,5,6,7,8,9,10], rate: 1/12, flip: false, loop: true },
    walk_left: { frames: [0,1,2,3,4,5,6,7,8,9,10], rate: 1/12, flip: "x", loop: true },
    stand_right: { frames: [8,9], rate: 99, flip: false, loop: true },
    stand_left: { frames: [8,9], rate: 99, flip:"x", loop: true },
    AttackFruitBowl_right: { frames: [0,1,2,3,4,5,6,7,8,9,10,11,12,13,14], rate: 1/12, flip: false, loop: false, trigger: "attacked" },
    AttackFruitBowl_left: { frames: [0,1,2,3,4,5,6,7,8,9,10,11,12,13,14], rate: 1/12, flip: "x", loop: false, trigger: "attacked" },
    AttackCoatRack_right: { frames: [0,1,2,3,4,5,6,7,8,9,10,11,12,13,14], rate: 1/12, flip: false, loop: false, trigger: "attacked" },
    AttackCoatRack_left: { frames: [0,1,2,3,4,5,6,7,8,9,10,11,12,13,14], rate: 1/12, flip: "x", loop: false, trigger: "attacked" },
    AttackLetterOpener_right: { frames: [0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26], rate: 1/12, flip: false, loop: false, trigger: "attacked" },
    AttackLetterOpener_left: { frames: [0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26], rate: 1/12, flip: "x", loop: false, trigger: "attacked" },
    HurtFront_right: { frames: frames, rate: 1/12, flip: "x", loop: false },
    HurtFront_left: { frames: frames, rate: 1/12, flip: false, loop: false },
    HurtBack_right: { frames: [0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15], rate: 1/12, flip: false, loop: false },
    HurtBack_left: { frames: [0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15], rate: 1/12, flip:"x", loop: false },
  });

  Q.animations("Jen", {
    walk_right: { frames: [0,1,2,3,4,5,6,7,8,9,10], rate: 1/12, flip: false, loop: true },
    walk_left: { frames: [0,1,2,3,4,5,6,7,8,9,10], rate: 1/12, flip: "x", loop: true },
    stand_right: { frames: [8,9], rate: 99, flip: false, loop: true },
    stand_left: { frames: [8,9], rate: 99, flip:"x", loop: true },
    AttackFruitBowl_right: { frames: [0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19], rate: 1/12, flip: false, loop: false, trigger: "attacked" },
    AttackFruitBowl_left: { frames: [0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19], rate: 1/12, flip: "x", loop: false, trigger: "attacked" },
    AttackCoatRack_right: { frames: [0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19], rate: 1/12, flip: false, loop: false, trigger: "attacked" },
    AttackCoatRack_left: { frames: [0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19], rate: 1/12, flip: "x", loop: false, trigger: "attacked" },
    AttackLetterOpener_right: { frames: [0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26], rate: 1/12, flip: false, loop: false, trigger: "attacked" },
    AttackLetterOpener_left: { frames: [0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26], rate: 1/12, flip: "x", loop: false, trigger: "attacked" },
  });

  var frames = [];
  while(frames.length < 28) { frames.push(frames.length); }
  Q.animations("Pearl", {
    walk_right: { frames: [0,1,2,3,4,5,6,7,8,9,10], rate: 1/12, flip: false, loop: true },
    walk_left: { frames: [0,1,2,3,4,5,6,7,8,9,10], rate: 1/12, flip: "x", loop: true },
    stand_right: { frames: [8,9], rate: 99, flip: false, loop: true },
    stand_left: { frames: [8,9], rate: 99, flip:"x", loop: true },
    HurtFront_right: { frames: frames, rate: 1/12, flip: "x", loop: false },
    HurtFront_left: { frames: frames, rate: 1/12, flip: false, loop: false },
    HurtBack_right: { frames: [0,1,2,3,4,5,6,7,8,9,10,11,12], rate: 1/12, flip: false, loop: false },
    HurtBack_left: { frames: [0,1,2,3,4,5,6,7,8,9,10,11,12], rate: 1/12, flip:"x", loop: false },
    crawl_right: { frames: [0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19], rate: 1/12, flip: false, loop: true },
    crawl_left: { frames: [0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19], rate: 1/12, flip:"x", loop: true },
  });

  Q.animations("KitchenTable", {
    normal: { frames: [0], rate: 1/12, flip: false, loop: true },
    interact: { frames: [0,1,2,3,4,5,6,7,8,9,10,11,12,13,14], rate: 1/12, flip: false, loop: false },
    used: { frames: [14], rate: 1/12, flip: false },
  });

  Q.animations("BookShelf", {
    normal: { frames: [0], rate: 1/12, flip: false, loop: true },
    interact: { frames: [0,1,2,3,4], rate: 1/12, flip: false, loop: false, trigger: "complete" },
    used: { frames: [4], rate: 1/12, flip: false },
  });

  var frames = [];
  while(frames.length < 29) { frames.push(frames.length); }
  Q.animations("DoorBreakIn", {
    normal: { frames: [0], rate: 1/12, flip: false, loop: true },
    interact: { frames: frames, rate: 1/12, flip: false, loop: false, trigger: "complete" },
    used: { frames: [28], rate: 1/12, flip: false },
  });

  Q.animations("HallwayDoors", {
    normal: { frames: [0], rate: 1/12, flip: false, loop: true },
    interact: { frames: [0,1,2,3,4,5,6,7,8,9,10,11,12], rate: 1/12, flip: false, loop: false, trigger: "complete" },
    used: { frames: [12], rate: 1/12, flip: false },
  });

  Q.animations("CoatRack", {
    normal: { frames: [0], rate: 1/12, flip: false, loop: true },
    interact: { frames: [0,1], rate: 1/12, flip: false, loop: false, trigger: "complete" },
    used: { frames: [1], rate: 1/12, flip: false },
  });

  var frames = []; while(frames.length < 37) { frames.push(frames.length); }
  Q.animations("BathroomA", {
    normal: { frames: [0], rate: 1/12, flip: false, loop: true },
    interact: { frames: frames, rate: 1/12, flip: false, loop: false, trigger: "complete" },
    used: { frames: [36], rate: 1/12, flip: false },
  });

  var frames = []; while(frames.length < 32) { frames.push(frames.length); }
  Q.animations("BathroomB", {
    normal: { frames: [0], rate: 1/12, flip: false, loop: true },
    interact: { frames: frames, rate: 1/12, flip: false, loop: false, trigger: "complete" },
    used: { frames: [31], rate: 1/12, flip: false },
  });

  var frames = []; while(frames.length < 55) { frames.push(frames.length); }
  Q.animations("PaperFall", {
    normal: { frames: [0], rate: 1/12, flip: false, loop: true },
    interact: { frames: frames, rate: 1/12, flip: false, loop: false, next: "used" },
    used: { frames: [54], rate: 1/12, flip: false },
  });

  document.querySelectorAll("video")[0].onended = function() {
    this.parentNode.removeChild(this);
    Q.stageScene(levels[0].name);
  }
});
