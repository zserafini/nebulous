Crafty.c('Animation', {

  init: function() {

  },

  walk: function() {
    if(this.self_dx > 0) {
      this.unflip('X');
      this.flip('X');
    } else {
      this.unflip('X');
    }
    var x_plus = (this.__coord[0]/128)+1;
    if(x_plus >= this.animations.walk) {
      this.sprite(0,0);
    } else {
      this.sprite(x_plus,0);
    }
  },

  stop_animation: function() {
    this.sprite(0,0);
  }
});
