MapRenderer = {
  
  radius: 8,

  visible_objects: {},

  initialize: function() {
    for(var x = player.coordinate.x+this.radius; x >= player.coordinate.x-this.radius; x--) {
      for(var y = player.coordinate.y+this.radius; y >= player.coordinate.y-this.radius; y--) {
        this.add_coordinate_to_objects_queue(x,y);
      }
    }
  },

  add_coordinate_to_objects_queue: function(x, y) {
    var objects_data = Map.get_objects(x, y);

    $.each(objects_data, function(index, value) {
      player.add_object_queue.push(this);
    });
  },

  add_object_to_map: function(object_data) {
    if(this.visible_objects[object_data.uniqueID] !== undefined)
    {
      return; //the objects already on the map
    }
    if(!this.is_in_range(object_data))
    {
      return; //the objects not in range
    }

    var new_object = Crafty.e(object_data.type)
      .at(object_data.coordinate.x, object_data.coordinate.y, object_data.coordinate.z)
      .attr('uniqueID', object_data.uniqueID)
      .attr('alpha', 0.01);

    var delay = Math.random();
    new_object._fade_in_delay = (delay-0.04) / 3;
    new_object._fade_in_call = function(){MapRenderer.fade_in(this)};
    new_object.bind("EnterFrame", new_object._fade_in_call);

    this.visible_objects[object_data.uniqueID] = new_object;
  },

  is_in_range: function(object) {
    return Math.abs(object.coordinate.x-player.coordinate.x) <= this.radius && Math.abs(object.coordinate.y-player.coordinate.y) <= this.radius;
  },

  find_new_objects: function(dx, dy) {
    if(dy != 0) {
      var y = player.coordinate.y+(this.radius*dy);
      for(var x = player.coordinate.x+this.radius; x >=player.coordinate.x-this.radius; x--) {
        this.add_coordinate_to_objects_queue(x,y);
      }
    }
    if(dx != 0) {
      var x = player.coordinate.x+(this.radius*dx);
      for(var y = player.coordinate.y+this.radius; y >=player.coordinate.y-this.radius; y--) {
        this.add_coordinate_to_objects_queue(x,y);
      }
    }
  },

  remove_old_objects: function() {
    $.each(this.visible_objects, function(id,object) {
      if(!MapRenderer.is_in_range(object)) {
        var delay = Math.random();
        object._fade_out_delay = (delay-0.04) / 3;
        object.bind("EnterFrame", function() {
          object.unbind("EnterFrame", object._fade_in_call);
          MapRenderer.fade_out(this);
        });
      }
    });
  },

  fade_in: function(object) {
    if(object._fade_in_delay > 0) {
      object._fade_in_delay -= 0.01;
    } else {
      object.alpha += 0.04;
      if(object.alpha >= 1) {
        object.unbind("EnterFrame", object._fade_in_call);
      }
    }
  },

  fade_out: function(object) {
    if(object._fade_out_delay > 0) {
      object._fade_out_delay -= 0.01
    } else {
      object.alpha -= 0.04;
      if(object.alpha <= 0) {
        MapRenderer.remove_object(object);
      }
    }
  },

  remove_object: function(object) {
    if(visible_object = this.visible_objects[object.uniqueID])
    {
      delete this.visible_objects[object.uniqueID];
      visible_object.destroy();
    }
  },

}
