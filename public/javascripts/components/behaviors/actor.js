Crafty.c('Actor', {

  init: function() {
    this.requires('2D, Grid, Mouse, DOM, Movement');
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

});
