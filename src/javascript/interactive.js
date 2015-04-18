Q.Sprite.extend("Interactive",{
  init: function(p) {
    this._super(p, {
      asset: p.image,
      sensor: true,
      type: Q.SPRITE_INTERACTIVE,
      collisionMask: Q.SPRITE_NONE,
      gravity: 0,
    });
  }
});
