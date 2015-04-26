var Evergreen = require("./evergreen.js");
var Fox = require("./fox.js");
module.exports = {

  objects: {}, // in memory storage off all objects online
  layout: [], //in memory storage of map [x][y][objects]
  radius: 11,
  size: 200,

  initialize: function() {

    console.log('building map');
    for(var x = 0; x < this.size; x++) {
      this.layout[x] = [];
      for(var y = 0; y < this.size; y++) {
        this.layout[x][y] = [];
        var seed = Math.random();
        if(seed < 0.3) {
          tile_type = "Water";
        } else {
          tile_type = "Grass";
          if(seed > 0.99) {
            var fox = new Fox({ x: x, y: y, z: 1 });
          }else if(seed > 0.9) {
            var evergreen = new Evergreen({ x: x, y: y, z: 1 });
          }
        }
        uniqueID = Math.random().toString(); 
        var tile_data = {type: tile_type, children: [], coordinate: {x: x, y: y, z: 0}, uniqueID: uniqueID };
        if(tile_type == "Water"){
          tile_data.closed = true;
        }
        this.layout[x][y].push(tile_data);
      }
    }
    console.log('building map complete');
  },

  add_object: function(new_object) {
    this.objects[new_object.data.uniqueID] = new_object;
    this.layout[new_object.data.coordinate.x][new_object.data.coordinate.y].push(new_object.clean());
  },

  remove_object: function(object_data) {
    var old_location = this.layout[object_data.coordinate.x][object_data.coordinate.y];
    _.remove(old_location, function(item) { return item.uniqueID == object_data.uniqueID; });
    delete this.objects[object_data.uniqueID];
    console.log(old_location);
    console.log('removed object from map');
  },

  update_object: function(updated_data) {
    var old_object = this.objects[updated_data.uniqueID];
    var old_location = this.layout[old_object.data.coordinate.x][old_object.data.coordinate.y];
    _.remove(old_location, function(object) { return object.uniqueID == updated_data.uniqueID; });
    this.layout[updated_data.coordinate.x][updated_data.coordinate.y].push(updated_data);
  },

  get_object: function(uniqueID) {
    return this.objects[uniqueID];
  },

  in_bounds: function(x, y) {
    if(x > map.size-1 || x < 0 || y > map.size-1 || y < 0){
      return false;
    }
    return true;
  },

  is_open_coordinate: function(x, y) {
    if(!this.in_bounds(x,y)){
      return false;
    } else if(_.some(this.layout[x][y], { closed: true })) {
      return false;
    }
    return true;
  },
}
