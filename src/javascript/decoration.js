Q.Sprite.extend("Decoration",{
  init: function(p) {
    this._super(p, {
      asset: p.image,
      type: Q.SPRITE_NONE,
      collisionMask: Q.SPRITE_NONE,
      gravity: 0,
    });
  }
});
