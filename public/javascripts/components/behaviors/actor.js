Crafty.c('Actor', {

  init: function() {
    this.requires('2D, Grid, Mouse, DOM, Tween')
    .bind('EnterFrame', this.apply_forces());
  },

  forces: [], //hold list of movement forces acting on actor

  at: function(x, y) {

    dx = ((x-player.coordinate.x)*64) + ((y-player.coordinate.x)*64);
    dy = (-(x-player.coordinate.x)*32) + ((y-player.coordinate.x)*32);

    this.x = player._x+dx;
    this.y = player._y+64+dy;
    this.coordinates = { x: x, y: y };
    return this;
  },

  apply_forces: function() {
    console.log('xxx');
    //called by game timer - moves actor on screen
    var dx = 0;
    var dy = 0;
    $.each(this.forces, function(key, value){
      dx += value.x;
      dy += value.y;
      value.t--;
    });
    this.x += dx;
    this.y += dy;
  },
});
