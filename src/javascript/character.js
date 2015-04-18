Q.Sprite.extend("Character", {
  init: function(p) {
    this._super(p, {
      sprite: "person",
      isControlled: false,
    });

    // Only when you take control
    // this.add('platformerControls');
    this.add('2d, animation');
  },
});
