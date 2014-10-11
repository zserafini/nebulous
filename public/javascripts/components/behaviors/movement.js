Crafty.c('Movement', {

  init: function() {
    this.bind('EnterFrame', function() { this.move(); })
      .attr('movement_queue', [])
      .attr('movement_lock', 0)
      .attr('forces', []);
  },

  move: function() {
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

      if(this == player) {
        socket.emit('update player position', { username: this.username, x: this.coordinate.x, y: this.coordinate.y });
      }
    }

    if(this == player){
      //give the players forces to all the other objects
      var forceCount = this.forces.length;
      for(var i = 0; i < forceCount; i++) {
        var force = this.forces.splice(i, 1);
        flipped_force = {x: -force[0].x, y: -force[0].y, t: force[0].t}
        Crafty.trigger('moveBackground', flipped_force);
      }
    } else {
      this.apply_forces();
    }
  },

  add_movement: function(data) {
    this.movement_queue.push({x: data.x, y: data.y});
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
        forceCount--;
        i--;
      }
    }
    this.x += dx;
    this.y += dy;
  },
});
