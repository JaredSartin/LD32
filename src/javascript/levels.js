var levels = [
  {title: "An Unconventional Death", name: "test"},
]

// Level Builder
for(i in levels) {
  (function(level, nextLevel, levelNumber) {
    Q.scene(level.name,function(stage) {
      Q.stageTMX(level.name + ".tmx",stage);
      if(nextLevel) {
        this.nextScene = nextLevel.name;
      }

      var hud = Q.stageScene("levelOverlay", 1, {title: level.title, number: parseInt(levelNumber)+1});
      this.playerFails = 0;
      this.playerStarted = function() { hud.runTimer = true; };
      this.playerEnded = function() { hud.runTimer = false; };
      this.playerDoubleJump = function() { hud.playerDoubleJumps++; };
      this.playerThrow = function() { hud.playerThrows++; };
      this.playerSwap = function() { hud.playerSwaps++; };
      this.levelStats = function() {
        return {
          time: hud.elapsedTime,
          doubleJumps: hud.playerDoubleJumps,
          botThrows: hud.playerThrows,
          swaps: hud.playerSwaps,
          goals: level,
        };
      };

      stage.add("viewport");
      stage.viewport.scale = 0.5;
      stage.viewport.centerOn(2400, 800);
    });
  })(levels[i], levels[parseInt(i)+1], i)
}

Q.scene('failLevel',function(stage) {
  var container = stage.insert(new Q.UI.Container({ x: Q.width/2, y: Q.height/2, fill: "#DBE5E6", shadow: true, shadowColor: "rgba(118,121,121, 0.5)" }));

  var button = container.insert(new Q.UI.Button({ x: 0, y: 0, fill: "#FFFFFF", label: "Try Again" }))         
  var label = container.insert(new Q.UI.Text({x:10, y: -10 - button.p.h, label: stage.options.label }));

  var continueCb = function() {
    Q.clearStages();
    Q.stageScene(stage.options.level);
  };
  Q.input.on("confirm", continueCb);
  button.on("click", continueCb);

  container.fit(20);
});

Q.scene('winLevel',function(stage) {
  var container = stage.insert(new Q.UI.Container({ x: Q.width/2, y: Q.height/2 + 55, fill: "#DBE5E6", shadow: true, shadowColor: "rgba(118,121,121, 0.5)" }));

  var button = container.insert(new Q.UI.Button({ x: 0, y: 0, fill: "#FFFFFF", label: "Next Level" }))         
  var swaps = container.insert(new Q.UI.Text({x:0, y: -10 - button.p.h, label: "Swaps: " + stage.options.levelStats.swaps, size: 16 }));
  var djs = container.insert(new Q.UI.Text({x:0, y: -6 - swaps.p.h + swaps.p.y, label: "Double Jumps: " + stage.options.levelStats.doubleJumps, size: 16 }));
  var bthrows = container.insert(new Q.UI.Text({x:0, y: -6 - djs.p.h + djs.p.y, label: "Throws: " + stage.options.levelStats.botThrows, size: 16 }));
  var time = container.insert(new Q.UI.Text({x:0, y: -10 - bthrows.p.h + bthrows.p.y, label: "Time: " + parseFloat(stage.options.levelStats.time).toFixed(2), size: 20 }));

  var twoStar = new Q.Sprite({ x: 0, y: -16 - time.p.h + time.p.y, sheet: 'star', opacity: 0.4, scale: 1.5});
  var oneStar = new Q.Sprite({ x: -(twoStar.p.w/1.4) - 2, y: -16 - time.p.h + time.p.y, sheet: 'star', opacity: 0.4, scale: 1.5});
  var threeStar = new Q.Sprite({ x: (twoStar.p.w/1.4) + 2, y: -16 - time.p.h + time.p.y, sheet: 'star', opacity: 0.4, scale: 1.5});
  oneStar.add("animation");
  twoStar.add("animation");
  threeStar.add("animation");

  container.insert(oneStar);
  container.insert(twoStar);
  container.insert(threeStar);

  if(stage.options.levelStats.time < stage.options.levelStats.goals.oneStarTime) {
    oneStar.p.opacity = 1;
  }
  if(stage.options.levelStats.time < stage.options.levelStats.goals.twoStarTime) {
    twoStar.p.opacity = 1;
  }
  if(stage.options.levelStats.time < stage.options.levelStats.goals.threeStarTime) {
    threeStar.p.opacity = 1;
  }

  var continueCb = function() {
    Q.clearStages();
    Q.stageScene(stage.options.level);
  };
  Q.input.on("confirm", continueCb);
  button.on("click", continueCb);

  container.fit(20);
});

Q.scene('levelOverlay',function(stage) {
  var title = stage.insert(new Q.UI.Text({
    x: Q.width / 2,
    y: Q.height / 3,
    // label: "Level " + stage.options.number + " — " + stage.options.title+ "...",
    label: stage.options.title,
    color: "#FFFFFF",
    outlineColor: "#545E5E",
    outlineWidth: 7,
    size: 32,
    opacity: 0
  }));
  title.add("tween");

  setTimeout(function() { title.animate({opacity: 1}, 0.75)}, 500);
  setTimeout(function() { title.animate({opacity: 0}, 0.75)}, 4000);
});

module.exports = levels;
