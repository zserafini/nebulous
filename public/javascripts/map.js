Map = {
  
  radius: 4,

  players: {},

  tile: {
    width:  128,
    height: 128
  },

  map: {
    layout:{}//comes from server response
  },

  initialize: function() {
    for(var x = player.coordinate.x+this.radius; x >= player.coordinate.x-this.radius; x--) {
      for(var y = player.coordinate.y+this.radius; y >= player.coordinate.y-this.radius; y--) {
        var key = x.toString() + ":" + y.toString();
        var tile_data = this.map.layout[key]
        Crafty.e(tile_data.type)
          .at(x, y, 0)
          .bind("Click", function() { player.walk_to(this.coordinate) })
      }
    }
  },

  build_walkable_grid: function() {
    var walkable_grid = [];
    for(var x = player.coordinate.x-this.radius; x <= player.coordinate.x+this.radius; x++) {
      var relative_x = player.coordinate.x-this.radius;
      walkable_grid[x-relative_x] = [];
      for(var y = player.coordinate.y-this.radius; y <= player.coordinate.y+this.radius; y++) {
        var key = x.toString() + ":" + y.toString();
        var relative_y = player.coordinate.y-this.radius;
        walkable_grid[x-relative_x][y-relative_y] = this.map.layout[key].open;
      }
    }
    return walkable_grid;
  },

  add_player: function(new_player_data) {
    var new_player = Crafty.e('Other Player')
      .at(new_player_data.x, new_player_data.y, 1);

    this.players[new_player_data.username] = new_player;
  },

  move_other_player: function(updated_player_data) {
    this.players[updated_player_data.username].add_movement(updated_player_data);
  },

}
