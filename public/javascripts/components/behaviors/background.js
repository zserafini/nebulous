Crafty.c('Background', {
  init: function() {
    this.bind("moveBackground", function(dx, dy, dt) {
      this.forces.push([dx, dy, dt]);
      console.log(this.forces);
    });
  },
});
