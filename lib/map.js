module.exports = {

  players: {}, // in memory storage off all players online (key:username)

  layout: [], //in memory storage of map
  radius: 8,
  size: 200,

  initialize: function() {
    console.log('building map');
    for(var x = 0; x < this.size; x++) {
      this.layout[x] = [];
      for(var y = 0; y < this.size; y++) {
        this.layout[x][y] = [];
        if(Math.random() < 0.3) {
          tile_type = "Water";
        } else {
          tile_type = "Grass";
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

  add_player: function(new_player) {
    this.players[new_player.username] = new_player;
    this.layout[new_player.coordinate.x][new_player.coordinate.y].push(new_player);
  },

  remove_object: function(object) {
    var old_location = this.layout[object.coordinate.x][object.coordinate.y];
    _.remove(old_location, function(item) { return item.uniqueID == object.uniqueID; });
    delete this.players[object.username];
    console.log(old_location);
    console.log('removed player from map');
  },

  update_player: function(updated_player) {
    var old_data = this.players[updated_player.username];
    var old_location = this.layout[old_data.coordinate.x][old_data.coordinate.y];

    _.remove(old_location, function(object) { return object.uniqueID == updated_player.uniqueID; });

    this.layout[updated_player.coordinate.x][updated_player.coordinate.y].push(updated_player);
    this.players[updated_player.username] = updated_player;
  },

  get_player: function(username) {
    return this.players[username];
  },

  in_bounds: function(x, y) {
    if(x > map.size-1 || x < 0 || y > map.size-1 || y < 0){
      return false;
    }
    return true;
  },
}
