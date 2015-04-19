Q.Sprite.extend("Interactive",{
  init: function(p) {
    this._super(p, {
      sprite: p.prop,
      sheet: p.prop,
      sensor: true,
      type: Q.SPRITE_INTERACTIVE,
      collisionMask: Q.SPRITE_NONE | Q.SPRITE_PLAYER,
      gravity: 0,
      usable: p.usable !== undefined ? p.usable : true,
    });

    this.add('animation');
    this.on("sensor");
    this.on("complete");

    this.play("normal");
  },

  use: function(player) {
    if(!this.p.usable) return;
    if(this.p.weapon) player.p.weapon = this.p.weapon;
    this.p.usable = false;
    this.play("interact");
  },

  sensor: function(sensed) {
    if(this.p.usable) sensed.trigger("sensor", this);
  },

  complete: function() {
    var link = this.stage.find(this.p.link);
    if(link !== undefined) {
      link.p.usable = true;
      link.use();
    }
  }
});
