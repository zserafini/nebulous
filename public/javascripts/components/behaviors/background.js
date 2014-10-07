Crafty.c('Background', {
  init: function() {
    this.bind("moveBackground", function(force) {
      var force_clone = $.extend({}, force);
      this.forces.push(force_clone);
    });
  },
});
