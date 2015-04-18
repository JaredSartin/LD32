Q.Sprite.extend("Interactive",{
  init: function(p) {
    this._super(p, {
      sprite: p.prop,
      sheet: p.prop,
      sensor: true,
      type: Q.SPRITE_INTERACTIVE,
      collisionMask: Q.SPRITE_NONE | Q.SPRITE_PLAYER,
      gravity: 0,
      usable: true,
    });

    this.add('animation');
    this.play("normal");
    this.on("sensor");
  },

  use: function() {
    if(!this.p.usable) return;
    this.p.usable = false;
    this.play("interact");
  },

  sensor: function(sensed) {
    if(this.p.usable) sensed.trigger("sensor", this);
  }
});
