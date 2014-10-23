Crafty.c('Movement', {

  init: function() {
    this.bind('EnterFrame', function() { this.move(); })
      .attr('movement_queue', [])
      .attr('movement_lock', 0)
      .attr('forces', []);
  },

  move: function() {

    if(this == player && this.movement_lock == 0) {
        while(player.add_object_queue.length > 0)
        {
          var new_object = player.add_object_queue.shift();
          MapRenderer.add_object_to_map(new_object);
        }
    }

    if(this.movement_lock > 0)
    {
      this.movement_lock--;
    } 
    else if(this.movement_lock == 0 && this.movement_queue.length > 0)
    {
      var next_step = this.movement_queue.shift();

      var dx = next_step.x-this.coordinate.x;
      var dy = next_step.y-this.coordinate.y;
      var xf = dx*2 + dy*2;
      var yf = -dx + dy;
      var force = {x: xf, y: yf, t: 32};
      this.forces.push(force);

      this.attr('movement_lock', 32);
      this.coordinate.x = next_step.x;
      this.coordinate.y = next_step.y;
      this.update_attributes();

      if(this == player) {
        this.animate('Walk', 1);
        socket.emit('update player position', { username: this.username, coordinate: this.coordinate, uniqueID: this.uniqueID });
        MapRenderer.find_new_objects(dx, dy);
        MapRenderer.remove_old_objects(dx,dy);
      } 
    }

    if(this == player){
      //give the players forces to all the other objects
      var forceCount = this.forces.length;
      for(var i = 0; i < forceCount; i++) {
        var force = this.forces.splice(i, 1);
        flipped_force = {x: -force[0].x, y: -force[0].y, t: force[0].t};
        Crafty.trigger('moveBackground', flipped_force);
      }
    } else {
      this.apply_forces();
    }
  },

  add_movement: function(object) {
    this.movement_queue.push({x: object.coordinate.x, y: object.coordinate.y});
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
