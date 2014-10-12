module.exports = {

  players: {}, // in memory storage off all players online (key:username)

  layout: [], //in memory storage of map
  radius: 8,

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

    var local_layout = [];

    for(var x = coordinates.x+this.radius; x >= coordinates.x-this.radius; x--) {
      for(var y = coordinates.y+this.radius; y >= coordinates.y-this.radius; y--) {
        local_layout.push(this.layout[x][y]);
      }
    }
    return local_layout;
  },

  update_local_map: function(old_data,new_data) {
    //dx and dy sould only be (-1..1)
    var dx = new_data.x-old_data.x;
    var dy = new_data.y-old_data.y;

    var new_tiles = [];

    if( dx !=0 ){
      for(var y = new_data.y+this.radius; y >=new_data.y-this.radius; y--) {
        new_tiles.push(this.layout[new_data.x+(dx*this.radius)][y]);
      }
    }
    if( dy !=0 ){
      for(var x = new_data.x+this.radius; x >=new_data.x-this.radius; x--) {
        new_tiles.push(this.layout[x][new_data.y+(dy*this.radius)]);
      }
    }
    return new_tiles;
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
