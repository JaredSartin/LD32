Q.Sprite.extend("Interactive",{
  init: function(p) {
    this._super(p, {
      sprite: p.prop,
      sheet: p.prop,
      sensor: true,
      type: Q.SPRITE_INTERACTIVE,
      collisionMask: Q.SPRITE_PLAYER,
      gravity: 0,
    });

    this.add('2d, animation');
  }
});
