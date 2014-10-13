module.exports = {

  players: {}, // in memory storage off all players online (key:username)

  layout: [], //in memory storage of map
  radius: 8,

  initialize: function() {
    console.log('building map');
    for(var x = 0; x < 200; x++) {
      this.layout[x] = [];
      for(var y = 0; y < 200; y++) {
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

  get_local_map: function(coordinates) {

    var local_layout = [];

    for(var x = coordinates.x+this.radius; x >= coordinates.x-this.radius; x--) {
      for(var y = coordinates.y+this.radius; y >= coordinates.y-this.radius; y--) {
        local_layout.push(this.layout[x][y]);
      }
    }
    return local_layout;
  },

  update_local_map: function(old_data,new_data) {
    var dx = new_data.coordinate.x-old_data.coordinate.x;
    var dy = new_data.coordinate.y-old_data.coordinate.y;

    var new_objects = [];

    if( dx !=0 ){
      for(var y = new_data.coordinate.y+this.radius; y >=new_data.coordinate.y-this.radius; y--) {
        new_objects.push(this.layout[new_data.coordinate.x+(dx*this.radius)][y]);
      }
    }
    if( dy !=0 ){
      for(var x = new_data.coordinate.x+this.radius; x >=new_data.coordinate.x-this.radius; x--) {
        new_objects.push(this.layout[x][new_data.coordinate.y+(dy*this.radius)]);
      }
    }
    return new_objects;
  },

  add_player: function(new_player) {
    this.players[new_player.username] = new_player;
  },

  update_player: function(updated_player) {
    this.players[updated_player.username] = updated_player;
  },

  get_player: function(username) {
    return this.players[username];
  },
}
