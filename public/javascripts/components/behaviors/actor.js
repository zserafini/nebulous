Crafty.c('Actor', {

  init: function() {
    this.requires('2D, Grid, Mouse, DOM, Movement')
    .bind("MouseOver", function() { 
      this.sprite(this.__coord[0]/_object_size,1,1,1) 
    })
    .bind("MouseOut", function() {
      this.sprite(this.__coord[0]/_object_size,0,1,1) 
    })
  },


  //used to place all objects other than player (use set_center)
  at: function(x, y, z) {
    var dx = ((x-player.coordinate.x)*(_object_size/2)) + ((y-player.coordinate.y)*(_object_size/2));
    var dy = (-(x-player.coordinate.x)*(_object_size/4)) + ((y-player.coordinate.y)*(_object_size/4));

    this.x = player._x+player.dx+dx;
    this.y = player._y+player.dy+(_object_size/2)+dy - (z*(_object_size/2));
    this.coordinate = { x: x, y: y, z: z };
    this.update_attributes();
    return this;
  },

  update_attributes: function() {
    this.update_relative_coordinate();
    this.update_z_level();
  },

  update_relative_coordinate: function() {
    this.relative_coordinate = { x: player.coordinate.x-this.coordinate.x, y: player.coordinate.y-this.coordinate.y };
  },

  update_z_level: function() {
    var adjusted_y = -this.relative_coordinate.y+MapRenderer.radius
    var adjusted_x = this.relative_coordinate.x+MapRenderer.radius
    this.z = 2*(adjusted_y)+(adjusted_x)+8*this.coordinate.z;
  },

});
