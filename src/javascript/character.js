Q.Sprite.extend("Character", {
  init: function(p) {
    this.normalPoints = [[-40, -40], [40, -40], [40, 150], [-40, 150]];
    this.attackingPoints_right = [[-40, -40], [100, -40], [100, 150], [-40, 150]];
    this.attackingPoints_left = [[40, -40], [-100, -40], [-100, 150], [40, 150]];

    this._super(p, {
      sheet: p.character,
      sensor: true,
      sprite: p.character,
      isControlled: false,
      isAlive: true,
      direction: "right",
      points: this.normalPoints,
      type: Q.SPRITE_NPC,
      collisionMask: Q.SPRITE_DEFAULT | Q.SPRITE_INTERACTIVE | Q.SPRITE_DOOR | Q.SPRITE_NPC,
      canUse: 0,
      cx: 40,
    });

    this.add('2d, animation');
    this.on("touch");
    this.on("sensor");
    this.on("doorSensor");
    this.on("attacked");
    this.on("injured");
    this.p.sheet = this.p.sprite + "Walk";
  },

  touch: function() {
    if(!this.p.isNPC) {
      Q("Character").invoke("stopControl", false);
      this.p.type = Q.SPRITE_PLAYER;
      this.p.controlled = true;
      Q.stage().follow(this);
    }
  },

  sensor: function(sensor) {
    if(sensor.isA("Interactive")) {
      this.sensor = sensor;
      this.p.canUse = 1/5;
    } else if(sensor.isA("Character") && this.p.attacking && sensor.p.isAlive) {
      sensor.trigger("injured");
    }
  },

  doorSensor: function(sensor) {
    this.sensor = sensor;
    this.p.canUse = 1;
  },

  stopControl: function() {
    this.p.type = Q.SPRITE_NPC;
    this.p.controlled = false;
  },

  attacked: function() {
    this.p.attacking = false;
    this.p.points = this.normalPoints;
    this.p.sheet = this.p.sprite + "Walk";
    this.play("stand_" + this.p.direction);
  },

  injured: function() {
    console.log("OW");
    this.p.isAlive = false;
  },

  step: function(dt) {
    var processed = false;
    if(this.p.attacking) return;
    if(!this.p.controlled) {
      this.play("stand_" + this.p.direction);
      return;
    };

    this.p.canUse -= dt;

    if(Q.inputs["left"]) {
      this.p.sheet = this.p.sprite + "Walk";
      this.p.direction = "left";
      this.play("walk_left");
      this.p.vx = -200;
      processed = true;
    } else if(Q.inputs["right"]) {
      this.p.sheet = this.p.sprite + "Walk";
      this.p.direction = "right";
      this.play("walk_right");
      this.p.vx = 200;
      processed = true;
    } else {
      this.play("stand_" + this.p.direction);
      this.p.vx = 0;
    }

    if(!processed && Q.inputs["action"]) {
      if(this.p.canUse > 0) {
        this.sensor.use(this);
        processed = true;
      } else if(!!this.p.door) {
        this.p.checkDoor = true;
      } else if(!processed && this.p.weapon !== undefined) {
        this.p.attacking = true;
        this.p.points = this["attackingPoints_"+this.p.direction];
        var attack = "Attack" + this.p.weapon;
        this.p.sheet = this.p.sprite + attack;
        this.play(attack + "_" + this.p.direction);
      }
    }

    if(!processed && this.p.door) {
      this.p.gravity = 1;
      if(this.p.checkDoor) {
        this.p.y = this.p.door.p.y;
        this.p.x = this.p.door.p.x;
        this.p.toDoor = this.p.door.findLinkedDoor();
        processed = true;
      }
      else if (this.p.toDoor) {
        // Transport to matching door.
        this.p.y = this.p.toDoor.p.y;
        this.p.x = this.p.toDoor.p.x;
        this.stage.centerOn(this.p.x, this.p.y);
        this.p.toDoor = false;
        this.stage.follow(this);
        processed = true;
      }
    } 

    this.p.door = false;
    this.p.checkDoor = false;
  },
});
