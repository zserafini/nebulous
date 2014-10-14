Map = {
  
  storage_radius: 8,

  size: function() {
    return this.storage_radius*2+1;
  },

  initialize: function() {
    this.layout = [];
    this.known_objects = {};
    for(var i=0; i < this.size(); i++)
    {
      this.layout[i] = [];
      for(var j=0; j < this.size(); j++)
      {
        this.layout[i][j] = [];
      }
    }
  },

  insert_new_records: function(new_records) {
    $.each(new_records, function(index, objects) {
      $.each(objects, function(index2, object) {
        Map.insert_new_object(object);
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

    var x = new_object.coordinate.x%this.size();
    var y = new_object.coordinate.y%this.size();

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
    console.log(2);
    var old_object = this.remove_old_object(object.uniqueID);
    console.log(2);
    var new_object = $.extend(old_object, object);
    console.log(2);
    delete this.known_objects[old_object.uniqueID];
    console.log(2);
    this.insert_new_object(new_object);
  },

  get_objects: function(x, y) {
    return this.layout[x%this.size()][y%this.size()];
  },

  build_walkable_grid: function() {
    var walkable_grid = [];
    for(var x = player.coordinate.x-this.storage_radius; x <= player.coordinate.x+this.storage_radius; x++) {
      var relative_x = player.coordinate.x-this.storage_radius;
      walkable_grid[x-relative_x] = [];
      for(var y = player.coordinate.y-this.storage_radius; y <= player.coordinate.y+this.storage_radius; y++) {
        var relative_y = player.coordinate.y-this.storage_radius;
        var objects = this.get_objects(x, y);
        var open = 1;
        for (var i = 0; i < objects.length; i++) {
          if(objects[i].closed == true) { open = 0; }
        }
        walkable_grid[x-relative_x][y-relative_y] = open; 
      }
    }
    return walkable_grid;
  },

}
