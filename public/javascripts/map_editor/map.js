Map = {
  
  initialize: function() {
    this.layout = [];
    this.updateSize();
    this.known_objects = {};
    for(var i=0; i < this.width; i++)
    {
      this.layout[i] = [];
      for(var j=0; j < this.height; j++)
      {
        this.layout[i][j] = [];
      }
    }
  },

  updateSize: function() {
    this.width = $("#map_width").val();
    this.height = $("#map_height").val();
    updated_layout = [];
    for(var i=0; i < this.width; i++)
    {
      if(this.layout[i]) {
        updated_layout[i] = this.layout[i];
      } else {
        updated_layout[i] = [];
      }
      for(var j=0; j < this.height; j++)
      {
        if(this.layout[i] && this.layout[i][j]) {
          updated_layout[i][j] = this.layout[i][j];
        } else {
          updated_layout[i][j] = [];
        }
      }
    }
    this.layout = updated_layout;
  },

  remove_object: function(uniqueID) {
    var old_object = this.known_objects[uniqueID];
    if(!old_object) { return false; }
    var storage_location = this.layout[old_object.coordinate.x%this.size()][old_object.coordinate.y%this.size()];
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

  insertObject: function(new_object) {
    var x = new_object.coordinate.x;
    var y = new_object.coordinate.y;

    var storage_location = this.layout[x][y];

    this.known_objects[new_object.uniqueID] = new_object;
    storage_location.push(new_object);
  },

  update_object: function(object) {
    var old_object = this.remove_old_object(object.uniqueID) || {};
    var new_object = $.extend(old_object, object);
    delete this.known_objects[old_object.uniqueID];
    this.insert_new_object(new_object);

    //Update visible map too if needed
    var visible_object = MapRenderer.visible_objects[object.uniqueID];
    if(visible_object && !(MapRenderer.is_in_range(new_object)))
    {
      MapRenderer.remove_object(visible_object);
    } 
    else if(visible_object) 
    { 
      visible_object.add_movement(new_object);
    } 
    else if(MapRenderer.is_in_range(new_object)) 
    {
      player.add_object_queue.push(new_object);
    }
  },

  get_objects: function(x, y) {
    return this.layout[x][y];
  },

}

Map.initialize();
