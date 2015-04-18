Q.Sprite.extend("Character", {
  init: function(p) {
    this._super(p, {
      sheet: p.character,
      sprite: p.character,
      isControlled: false,
      direction: "right",
      points: [[-40, -40], [40, -40], [40, 150], [-40, 150]],
      type: Q.SPRITE_NPC,
      collisionMask: Q.SPRITE_DEFAULT | Q.SPRITE_INTERACTIVE | Q.SPRITE_WEAPON,
      canUse: 0,
      cx: 40,
    });

    this.add('2d, animation');
    this.on("touch");
    this.on("sensor");
    this.on("attacked");
    this.p.sheet = this.p.sprite + "Walk";
  },

  touch: function() {
    Q("Character").invoke("stopControl", false);
    this.p.type = Q.SPRITE_PLAYER;
    this.p.controlled = true;
    Q.stage().follow(this);
  },

  sensor: function(sensor) {
    this.sensor = sensor;
    this.p.canUse = 1/5;
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

    this.p.canUse -= dt;

    if(this.p.attacking) return;
    if(Q.inputs["left"]) {
      this.p.sheet = this.p.sprite + "Walk";
      this.p.direction = "left";
      this.play("walk_left");
      this.p.vx = -200;
    } else if(Q.inputs["right"]) {
      this.p.sheet = this.p.sprite + "Walk";
      this.p.direction = "right";
      this.play("walk_right");
      this.p.vx = 200;
    } else {
      this.play("stand_" + this.p.direction);
      this.p.vx = 0;
    }

    if(this.p.canUse > 0 && Q.inputs["action"]) {
      this.sensor.use();
      if(this.sensor.p.sprite === "KitchenTable") {
        this.p.sheet = this.p.sprite + "AttackFruitBowl";
        this.play("attack_fruit_bowl");
        this.p.attacking = true;
      }
    }
  },

  attacked: function() {
    console.log("swap");
    this.p.attacking = false;
    this.p.sheet = this.p.sprite + "Walk";
    this.play("stand_" + this.p.direction);
  },
});
