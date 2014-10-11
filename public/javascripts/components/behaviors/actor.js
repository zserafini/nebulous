Crafty.c('Actor', {

  init: function() {
    this.requires('2D, Grid, Mouse, DOM, Tween');
    this.forces = [];
    this.bind('EnterFrame', function() { this.apply_forces(); });
  },


  at: function(x, y, z) {
    dx = ((x-player.coordinate.x)*64) + ((y-player.coordinate.y)*64);
    dy = (-(x-player.coordinate.x)*32) + ((y-player.coordinate.y)*32);

    this.x = player._x+dx;
    this.y = player._y+64+dy - (z*64);
    this.z = y*2-x;
    this.coordinate = { x: x, y: y };
    return this;
  },

  apply_forces: function() {
    var dx = 0;
    var dy = 0;
    var forceCount = this.forces.length;
    for(var i = 0; i < forceCount; i++) {

      dx += this.forces[i].x;
      dy += this.forces[i].y;
      
      this.forces[i].t--;
      if(this.forces[i].t == 0)
      {
        this.forces.splice(i, 1);
      }
    }
    this.x += dx;
    this.y += dy;
  },
});
