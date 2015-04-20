Q.Sprite.extend("Interactive",{
  init: function(p) {
    if(p.triggerCharacter) {
      p.triggerCharacter = eval(p.triggerCharacter)
    }
    this._super(p, {
      sprite: p.prop,
      sheet: p.prop,
      sensor: p.door ? false : true,
      type: Q.SPRITE_INTERACTIVE,
      collisionMask: Q.SPRITE_NONE | Q.SPRITE_PLAYER,
      gravity: 0,
      usable: p.usable !== undefined ? p.usable : true,
    });

    this.add('animation');
    this.on("sensor");
    this.on("hit");
    this.on("complete");

    this.play("normal");

    if(this.p.door)
      this.p.points = [[-5, -140], [46, -140], [46, 140], [-5, 140]];

    if(this.p.prop.indexOf("Bathroom") === 0)
      this.p.points = [[-194, -160], [-114, -160], [-114, 160], [-194, 160]];
  },

  use: function(player) {
    if(!this.p.usable) return;
    if(this.p.weapon) player.p.weapon = this.p.weapon;
    this.p.usable = false;
    this.play("interact");
    if(player && this.p[player.p.character]) {
      this.p.sheet = this.p.sprite = this.p[player.p.character]
    }
  },

  sensor: function(sensed) {
    if(!!this.p.triggerOnCharacter && this.p[sensed.p.character]) {
      // HACK!
      if(sensed.p.character !== "Pearl" && this.p.prop.indexOf("Bathroom") >= 0) sensed.trigger("killHide");
      this.p.usable = true;
      this.use(sensed);
      return;
    }

    if(sensed.isA("Character") && this.p.usable) sensed.trigger("sensor", this);
  },

  hit: function(hit) {
    if(this.p.usable && this.p.door) hit.obj.trigger("doorSensor", this);
  },

  complete: function() {
    this.play("used");
    var link = this.stage.find(this.p.link);
    if(link !== undefined) {
      link.p.usable = true;
      link.use();
    }
    if(this.p.door) {
      this.p.sensor = true;
    }
  }
});
