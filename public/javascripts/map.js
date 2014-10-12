Map = {
  
  radius: 4,

  visible_objects: {},

  map: {

    size: 17, //This needs to be Servers map radius*2+1

    initialize: function() {
      this.layout = [];
      this.known_objects = {};
      for(var i=0; i < this.size; i++)
      {
        this.layout[i] = [];
        for(var j=0; j < this.size; j++)
        {
          this.layout[i][j] = [];
        }
      }
    },

    insert_new_records: function(new_records) {
      $.each(new_records, function(index, objects) {
        $.each(objects, function(index2, object) {
          Map.map.insert_new_object(object);
        });
      });
    },

    remove_old_object: function(uniqueID) {
      var old_object = this.known_objects[uniqueID];
      var storage_location = this.layout[old_object.map_layout.x][old_object.map_layout.y];
      var loop_size = storage_location.length;
      for(var i =0; i < loop_size; i++)
      {
        if(storage_location[i].uniqueID == uniqueID)
        {
          storage_location.splice(i, 1);
          loop_size--;
          i--;
        }
      }
      return old_object;
    },

    insert_new_object: function(new_object) {

      if(this.known_objects[new_object.uniqueID] !== undefined){
        return; //we already know bout this guy!
      }

      var x = new_object.coordinate.x%this.size;
      var y = new_object.coordinate.y%this.size;

      var storage_location = this.layout[x][y];

      //cleanup  old data in storage
      var loop_size = storage_location.length;
      for(var i =0; i < loop_size; i++)
      {
        if(storage_location[i].coordinate.x != new_object.coordinate.x || storage_location[i].coordinate.y != new_object.coordinate.y)
        {
          delete this.known_objects[storage_location[i].uniqueID];
          storage_location.splice(i, 1);
          loop_size--;
          i--;
        }
      }

      var clean_new_object = $.extend({}, new_object, {map_layout: {x: x, y: y}});
      this.known_objects[new_object.uniqueID] = clean_new_object;
      storage_location.push(clean_new_object);
    },

    update_object: function(object) {
      var old_object = this.remove_old_object(object.uniqueID);
      var new_object = $.extend(old_object, object);
      delete this.known_objects[old_object.uniqueID];
      this.insert_new_object(new_object);
    },

    get_objects: function(x, y) {
      return this.layout[x%this.size][y%this.size];
    },
  },

  initialize: function() {
    for(var x = player.coordinate.x+this.radius; x >= player.coordinate.x-this.radius; x--) {
      for(var y = player.coordinate.y+this.radius; y >= player.coordinate.y-this.radius; y--) {
        this.add_objects_to_object_queue(x,y);
      }
    }
  },

  add_objects_to_object_queue: function(x, y) {
    var objects_data = this.map.get_objects(x, y);
    $.each(objects_data, function(index, value) {
      player.add_object_queue.push(this);
    });
  },

  add_object_to_map: function(object_data) {
    var new_object = Crafty.e(object_data.type)
      .at(object_data.coordinate.x, object_data.coordinate.y, object_data.coordinate.z)

    Map.visible_objects[object_data.uniqueID] = new_object;
  },

  find_new_objects: function(dx, dy) {
    if(dy != 0) {
      var y = player.coordinate.y+(this.radius*dy);
      for(var x = player.coordinate.x+this.radius; x >=player.coordinate.x-this.radius; x--) {
        this.add_objects_to_object_queue(x,y);
      }
    }
    if(dx != 0) {
      var x = player.coordinate.x+(this.radius*dx);
      for(var y = player.coordinate.y+this.radius; y >=player.coordinate.y-this.radius; y--) {
        this.add_objects_to_object_queue(x,y);
      }
    }
  },

  remove_old_objects: function() {
    $.each(this.visible_objects, function(id,object) {
      if(Math.abs(object.coordinate.x-player.coordinate.x) > Map.radius || Math.abs(object.coordinate.y-player.coordinate.y) > Map.radius) {
        object.destroy();
      }
    });
  },

  build_walkable_grid: function() {
    var walkable_grid = [];
    for(var x = player.coordinate.x-this.radius; x <= player.coordinate.x+this.radius; x++) {
      var relative_x = player.coordinate.x-this.radius;
      walkable_grid[x-relative_x] = [];
      for(var y = player.coordinate.y-this.radius; y <= player.coordinate.y+this.radius; y++) {
        var relative_y = player.coordinate.y-this.radius;
        var objects = this.map.get_objects(x, y);
        var open = 1;
        for (var i = 0; i < objects.length; i++) {
          if(objects[i].closed == true) { open = 0; }
        }
        walkable_grid[x-relative_x][y-relative_y] = open; 
      }
    }
    return walkable_grid;
  },

  add_player: function(new_player_data) {
    player.add_object_queue.push(new_player_data);
    this.map.insert_new_object(new_player_data);
  },

  move_other_player: function(updated_player_data) {
    this.visible_objects[updated_player_data.uniqueID].add_movement(updated_player_data);
    this.map.update_object(updated_player_data);
  },

}
