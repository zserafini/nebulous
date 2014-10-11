Crafty.c('Other Player', {
  init: function() {
    this.requires('Actor, player_sprite, Background')
    .areaMap([42,0],[86,0],[86,112],[42,112])
    .attr('movement_queue', [])
    .attr('movement_lock', 0)
    .bind('EnterFrame', function() { this.walk(); });
  },

  add_movement: function(data) {
    this.movement_queue.push({x: data.x, y: data.y});
  },

  walk: function() {
    if(this.movement_lock > 0)
    {
      this.movement_lock--;
    } 
    else if(this.movement_lock == 0 && this.movement_queue.length > 0)
    {
      var next_step = this.movement_queue.shift();

      var dx = (next_step.x-this.coordinate.x)*2 + (next_step.y-this.coordinate.y)*2;
      var dy = -(next_step.x-this.coordinate.x) + (next_step.y-this.coordinate.y);
      var force = {x: dx, y: dy, t: 32};
      this.forces.push(force);

      this.attr('movement_lock', 32);
      this.coordinate.x = next_step.x;
      this.coordinate.y = next_step.y;
    }
  },

});
