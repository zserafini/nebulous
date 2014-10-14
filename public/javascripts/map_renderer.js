MapRenderer = {
  
  radius: 4,

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

    var new_object = Crafty.e(object_data.type)
      .at(object_data.coordinate.x, object_data.coordinate.y, object_data.coordinate.z)
      .attr('uniqueID', object_data.uniqueID);

    this.visible_objects[object_data.uniqueID] = new_object;
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
      if(Math.abs(object.coordinate.x-player.coordinate.x) > MapRenderer.radius || Math.abs(object.coordinate.y-player.coordinate.y) > MapRenderer.radius) {
        var uniqueID = object.uniqueID;
        delete MapRenderer.visible_objects[uniqueID];
        object.destroy();
      }
    });
  },
}
