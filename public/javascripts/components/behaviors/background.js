Crafty.c('Background', {
  init: function() {
    this.requires('Actor');
    this.bind("moveBackground", function(force) {
      var force_clone = $.extend({}, force);
      this.forces.push(force_clone);
      this.update_attributes();
    });
  },
});
