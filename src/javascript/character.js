Q.Sprite.extend("Character", {
  init: function(p) {
    this.normalPoints = [[-40, -40], [40, -40], [40, 150], [-40, 150]];
    this.attackingPoints_right = [[-40, -40], [150, -40], [150, 150], [-40, 150]];
    this.attackingPoints_left = [[-150, 150], [40, 150], [40, -40], [-150, -40]];

    this._super(p, {
      sheet: p.character,
      sensor: true,
      sprite: p.character,
      isControlled: false,
      isRemote: false,
      isAlive: true,
      canBeChosen: true,
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
    this.on("killHide");
    this.on("attacked");
    this.on("injured");
    this.p.sheet = this.p.sprite + "Walk";
  },

  touch: function() {
    if(!this.p.isNPC && this.p.character !== "Pearl" && this.p.canBeChosen) {
      Q("Character").invoke("stopControl", false);
      this.p.type = Q.SPRITE_PLAYER;
      this.p.controlled = true;
      this.p.isNPC = false;
      Q.stage().follow(this, { x: true, y: false });
    }
  },

  killHide: function() {
    if(!this.p.isAlive) return;
    this.p.isAlive = false;
    Q("Character").invoke("stopControl", false);
    this.p.opacity = 0;
    this.p.collisionMask = Q.SPRITE_DEFAULT;
    this.isControlled = false;
    this.p.vx = 0;
    Q.stage().trigger("killed", this.p.character);
  },

  sensor: function(sensor) {
    if(sensor.isA("Interactive") && sensor.p.usable) {
      // HUGE HACK TO MAKE THE LD GAME WORK!
      this.sensor = sensor;
      this.p.canUse = 1/5;
    } else if(sensor.isA("Character") && this.p.attacking && sensor.p.isAlive) {
      sensor.trigger("injured", this.p.direction);
    }
  },

  doorSensor: function(sensor) {
    this.sensor = sensor;
    this.p.canUse = 1;
  },

  stopControl: function() {
    this.p.canBeChosen = false;
    this.p.type = Q.SPRITE_NPC;
    this.p.controlled = false;
  },

  attacked: function() {
    this.p.attacking = false;
    this.p.points = this.normalPoints;
    this.p.sheet = this.p.sprite + "Walk";
    this.play("stand_" + this.p.direction);
  },

  injured: function(attackerFacing) {
    if(this.p.direction == attackerFacing) var side = "Back";
    else var side = "Front";
    this.p.isAlive = false;

    var This = this;
    setTimeout(function() {
      This.p.sheet = This.p.sprite + "Hurt" + side;
      This.play("Hurt" + side + "_" + This.p.direction);
    }, 200);

    Q.stage().trigger("killed", this.p.character);
  },

  remoteControl: function(command, duration, silent) {
    if(silent === undefined) silent = false;
    this.p.isRemote = true;
    this.p.remote = command;
    this.p.remoteTime = duration;
    this.p.remoteSilent = silent;
  },

  stepRemote: function(dt) {
    this.p.remoteTime -= dt;
    this[this.p.remote]();
    if(this.p.remoteTime < 0) {
      if(!this.p.remoteSilent)
        this.trigger("remoteDone", this.p.remote);
      this.p.isRemote = false;
      this.p.remote = undefined;
      this.p.remoteTime = 0;
    }
  },

  walkLeft: function() {
    this.p.sheet = this.p.sprite + "Walk";
    this.p.direction = "left";
    this.play("walk_left");
    this.p.vx = -200;
  },

  walkRight: function() {
    this.p.sheet = this.p.sprite + "Walk";
    this.p.direction = "right";
    this.play("walk_right");
    this.p.vx = 200;
  },

  stand: function() {
    this.play("stand_" + this.p.direction);
    this.p.vx = 0;
  },

  step: function(dt) {
    var processed = false;
    if(this.p.attacking) return;
    if(!this.p.isAlive) return;
    if(this.p.isRemote) this.stepRemote(dt);
    if(!this.p.controlled && !this.p.isRemote) {
      this.stand();
    };
    if(!this.p.controlled || this.p.isRemote) {
      return;
    }

    this.p.canUse -= dt;

    if(Q.inputs["left"]) {
      this.walkLeft();
      processed = true;
    } else if(Q.inputs["right"]) {
      this.walkRight();
      processed = true;
    } else {
      this.stand();
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
