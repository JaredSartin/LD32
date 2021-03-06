Q.Sprite.extend("Door", {
  init: function(p) {
    this._super(p,{
      asset: "interaction.png",
      type: Q.SPRITE_DOOR,
      collisionMask: Q.SPRITE_NONE,
      sensor: true,
      vx: 0,
      vy: 0,
      gravity: 0,
      points: [[-10, -10], [-10, 10], [10, 10], [10, -10]],
    });
    this.add("animation");

    this.on("sensor");
  },

  findLinkedDoor: function() {
    return this.stage.find(this.p.link);
  },

  sensor: function(colObj) {
    colObj.trigger("atLevelDoor", this);
    colObj.p.door = this;
  }
});
