module.exports = {

  players: {}, // in memory storage off all players online (key:username)

  layout: [], //in memory storage of map

  initialize: function() {
    console.log('building map');
    for(var x = 0; x < 200; x++) {
      this.layout[x] = [];
      for(var y = 0; y < 200; y++) {
        if(Math.random() < 0.3) {
          tile_type = "Water";
        } else {
          tile_type = "Grass";
        }
        var tile_data = {type: tile_type, open: 1, children: [], x: x, y: y};
        if(tile_type == "Water"){
          tile_data.open = 0;
        }
        this.layout[x][y] = tile_data;
      }
    }
    console.log('building map complete');
  },

  get_local_map: function(coordinates) {
    var radius= 8;

    var local_layout = [];

    for(var x = coordinates.x+radius; x >= coordinates.x-radius; x--) {
      for(var y = coordinates.y+radius; y >= coordinates.y-radius; y--) {
        local_layout.push(this.layout[x][y]);
      }
    }
    return local_layout;
  },

  update_local_map: function(coordinates,direction) {
    //smart selection of map tiles goes here
  },

  add_player: function(new_player) {
    this.players[new_player.username] = new_player;
  },

  update_player: function(updated_player) {
    this.players[updated_player.username] = updated_player;
  },
}
