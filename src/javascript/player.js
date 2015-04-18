Q.Sprite.extend("Robro",{
  init: function(p) {
    this.top = false;
    this.stacked = false;

    this.stackedCollision = Q.SPRITE_DEFAULT | Q.SPRITE_LASER | Q.SPRITE_GOAL | Q.SPRITE_SWITCH;
    this.fullCollision = Q.SPRITE_DEFAULT | Q.SPRITE_PLAYER | Q.SPRITE_LASER | Q.SPRITE_GOAL | Q.SPRITE_SWITCH;

    this._super(p, {
      sprite: "robro",
      sheet: p.color + "_robro",
      direction: "right",
      jumpSpeed: -400,
      boostReady: false,
      isDead: false,
      isWin: false,
      speed: 300,
      onGoal: 0,
      canSwap: 0,
      started: false,
      type: Q.SPRITE_PLAYER,
      points: [[-24, -24], [-24, 16], [24, 16], [24, -24]],
      collisionMask: this.fullCollision
    });

    this.add('2d, platformerControls, animation');

    this.on("bump.bottom",function(collision) {
      if(collision.obj.isA("Robro")) { 
        if(!this.stacked) {
          this.top = true;
          this.stacked = true;
          this.bottomBot = collision.obj;
          this.p.ignoreControls = true;
          
          this.bottomBot.top = false;
          this.bottomBot.stacked = true;
          this.bottomBot.topBot = this;

          this.p.y = this.bottomBot.p.y - this.p.h + 5;
          this.p.x = this.bottomBot.p.x;
          this.p.ax = this.p.ay = 0;
          this.p.vx = this.p.vy = 0;
          this.p.gravity = 0;

          // Remove collision with stacked bot
          this.bottomBot.p.collisionMask = this.stackedCollision;
          this.p.collisionMask = this.stackedCollision;
        }
      }
    });

    this.on("jump");
    this.on("jumped");
    this.on("zapped");

    this.on("hit", function(collision) {
      if(collision.obj.isA("GoalZone"))
        this.p.inGoal = true;
    });
  },

  jump: function() {
    if(this.stacked && !this.top) {
      if(this.p.boostReady && this.p.landed < 0){
        this.topBot.launch(this.p.vx);
        Q.stage().scene.playerDoubleJump();
      };
    }

    this.p.boostReady = false;
  },

  jumped: function() {
    this.p.boostReady = true;
  },

  zapped: function(dmg) {
    if(!this.p.isDead) {
      this.kill();
      Q.stage().scene.playerEnded();

      var cb = function() {Q.stageScene("failLevel",2, { label: "Watch out for lasers!", level: Q.stage().scene.name })}; 
      setTimeout(cb, 1000);
    }
  },

  launch: function(vx) {
    this.stacked = false;
    this.top = false;

    this.bottomBot.stacked = false;
    this.bottomBot.top = false;
    this.bottomBot.topBot = undefined;


    // Return collisions with bots
    this.p.collisionMask = this.fullCollision;
    this.bottomBot.p.collisionMask = this.fullCollision;

    this.bottomBot = undefined;

    if(vx !== undefined) {
      this.p.vx = vx;
    } else if(Q.inputs["left"]) {
      this.p.vx = -this.p.speed;
    } else if(Q.inputs["right"]){
      this.p.vx = this.p.speed;
    }

    this.p.vy = this.p.jumpSpeed + 2;
    this.p.landed = -1/99;
    this.p.gravity = 1;
    this.haltTime = 0.1;
  },

  swap: function() {
    if(this.p.canSwap < 0) {
      var topX = this.topBot.p.x;
      var topY = this.topBot.p.y;

      var botX = this.p.x;
      var botY = this.p.y;

      this.topBot.top = false;
      this.topBot.topBot = this;
      this.topBot.bottomBot = undefined;
      this.topBot.p.x = botX;
      this.topBot.p.y = botY;
      this.topBot.p.gravity = 1;
      this.topBot.p.landed = 1/5;

      this.top = true;
      this.bottomBot = this.topBot;
      this.topBot = undefined;
      this.p.x = topX;
      this.p.y = topY;
      this.p.gravity = 0;
      this.p.landed = 1/5;
      this.bottomBot.p.canSwap = 1/5;
    } else {
      this.topBot.p.canSwap = 1/5;
    }
    this.p.canSwap = 1/5;
  },

  step: function(dt) {
    var processed = false;
    
    this.p.onGoal -=  dt;
    this.p.canSwap -=  dt;

    if(!this.p.started && (Q.inputs["left"] || Q.inputs["right"] || Q.inputs["up"] || Q.inputs["down"])) {
      this.p.started = true;
      Q.stage().scene.playerStarted();
    }

    if(this.p.isDead) {
      this.play("dead_" + this.p.direction);
      this.p.ignoreControls = true;
      this.p.vx = this.p.vy = 0;
      
      processed = true;
    } else if(this.p.isWin) {
      this.p.ignoreControls = true;
      this.p.vx = this.p.vy = 0;
      
      processed = true;
    }

    if(this.p.landed > 0) {
      this.p.boostReady = false;
    }

    if(!processed && this.stacked && this.top) {
      this.p.x = this.bottomBot.p.x;
      this.p.y = this.bottomBot.p.y - this.p.h + 5;

      this.p.direction = this.bottomBot.p.direction;
      this.play("stop_" + this.p.direction);

      processed = true;
    }

    if(!processed) {
      if(Q.inputs["down"] || Q.inputs["fire"]) {
        this.haltTime = 0.05;
        if(this.stacked) {
          if(Q.inputs["left"] || Q.inputs["right"]) {
            this.topBot.launch();
            Q.stage().scene.playerThrow();
          } else if(this.p.landed > 0 && (Q.inputs["up"] || Q.inputs["action"])) {
            this.swap()
          }
        }
        if(this.p.landed > 0)
          this.p.vx = this.p.vx = 0;
      }

      if(this.haltTime !== undefined && this.haltTime > 0) {
        this.play("stop_" + this.p.direction);
        this.haltTime -= dt;
        if(!this.stacked || !this.top) {
          this.p.ignoreControls = true;
        }
      } else {
        this.p.ignoreControls = false;
      }

      if(this.p.landed > 0) {
        if(this.p.vx !== 0 && (!this.stacked || !this.top)) {
          this.play("roll_" + this.p.direction);
        } else {
          this.play("stop_" + this.p.direction);
        }
      } else {
        this.play("jump_" + this.p.direction);
      }
    }
  },

  kill: function() {
    Q("Robro").set("isDead", true);
  }
});
