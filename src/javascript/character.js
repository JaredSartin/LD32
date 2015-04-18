Q.Sprite.extend("Character", {
  init: function(p) {
    this._super(p, {
      sprite: "person",
      sheet: p.character,
      sprite: "person",
      isControlled: false,
      direction: "right",
      points: [[-40, -120], [40, -120], [40, 110], [-40, 110]],
      type: Q.SPRITE_NPC,
    });

    this.add('2d, animation');
    this.on("touch");
  },

  touch: function() {
    Q("Character").invoke("stopControl", false);
    this.p.type = Q.SPRITE_PLAYER;
    this.p.controlled = true;
    Q.stage().follow(this);
  },

  stopControl: function() {
    this.p.type = Q.SPRITE_NPC;
    this.p.controlled = false;
  },

  step: function(dt) {
    if(!this.p.controlled) {
      this.play("stand_" + this.p.direction);
      return;
    };

    if(Q.inputs["left"]) {
      this.p.direction = "left";
      this.play("walk_left");
      this.p.vx = -200;
    } else if(Q.inputs["right"]) {
      this.p.direction = "right";
      this.play("walk_right");
      this.p.vx = 200;
    } else {
      this.play("stand_" + this.p.direction);
      this.p.vx = 0;
    }
  },
});
