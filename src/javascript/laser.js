Q.Sprite.extend("Laser",{
  init: function(p) {
    this._super(p, {
      sheet: "laser" + p.color + p.direction,
      visibleOnly: true,
      sensor: true,
      type: Q.SPRITE_LASER,
      collisionMask: Q.SPRITE_NONE,
      gravity: 0,
      harmful: true,
    });

    if(this.p.laserName) {
      this.on("switch", function(data) {
        if(this.p.laserName == data.name) {
          this.p.harmful = data.state;
          this.p.opacity = data.state ? 1 : 0;
        }
      });
    }

    switch(this.p.direction){
      case "Horizontal":
        this.p.points = [[-24,-7], [24,-7], [24,7], [-24,7]];
        break;
      case "Vertical":
        this.p.points = [[-7,-24], [-7,24], [7,24], [7,-24]];
        break;
      case "Burst":
        this.p.points = [[-17,0], [0,-17], [17,0], [17,0]];
        break;
    }

    this.add("animation");

    this.on("sensor", function(sensor) {
      if(this.p.harmful && this.p.color.toLowerCase() !== sensor.p.color.toLowerCase()) {
        sensor.trigger("zapped");
      }
    });
  }
});
