Map = {
  
  radius: 4,

  players: {},

  tiles: [],

  tile: {
    width:  128,
    height: 128
  },

  map: {

    size: 17, //This needs to be Servers map radius*2+1

    initialize: function() {
      for(var i=0; i < this.size; i++)
      this.layout[i]=Array(this.size);
    },

    layout:[],

    insert_new_records: function(new_records) {
      $.each(new_records, function(index, value) {
        Map.map.layout[value.x%Map.map.size][value.y%Map.map.size] = value;
      });
    },

    get_tile: function(x, y) {
      return this.layout[x%this.size][y%this.size];
    },
  },

  initialize: function() {
    for(var x = player.coordinate.x+this.radius; x >= player.coordinate.x-this.radius; x--) {
      for(var y = player.coordinate.y+this.radius; y >= player.coordinate.y-this.radius; y--) {
        this.add_tile_to_map(x,y);
      }
    }
  },

  add_tile_to_map: function(x, y) {
    var tile_data = this.map.get_tile(x, y);
    var new_tile = Crafty.e(tile_data.type)
      .at(x, y, 0)
      .bind("Click", function() { player.walk_to(this.relative_coordinate) })
      .bind("Click", function() { console.log(this.coordinate); })
    this.tiles.push(new_tile);
  },

  draw_new_tiles: function(dx, dy) {
    if(dy != 0) {
      var y = player.coordinate.y+(this.radius*dy);
      for(var x = player.coordinate.x+this.radius; x >=player.coordinate.x-this.radius; x--) {
        this.add_tile_to_map(x,y);
      }
    }
    if(dx != 0) {
      var x = player.coordinate.x+(this.radius*dx);
      for(var y = player.coordinate.y+this.radius; y >=player.coordinate.y-this.radius; y--) {
        this.add_tile_to_map(x,y);
      }
    }
  },

  remove_old_tiles: function() {
    var number_of_tiles = this.tiles.length;
    for(var i = 0; i < number_of_tiles; i++)
    {
      if(Math.abs(this.tiles[i].coordinate.x-player.coordinate.x) > this.radius || Math.abs(this.tiles[i].coordinate.y-player.coordinate.y) > this.radius) {
        this.tiles[i].destroy();
        this.tiles.splice(i, 1);
        number_of_tiles--;
        i--;
      }
    }
  },

  build_walkable_grid: function() {
    var walkable_grid = [];
    for(var x = player.coordinate.x-this.radius; x <= player.coordinate.x+this.radius; x++) {
      var relative_x = player.coordinate.x-this.radius;
      walkable_grid[x-relative_x] = [];
      for(var y = player.coordinate.y-this.radius; y <= player.coordinate.y+this.radius; y++) {
        var relative_y = player.coordinate.y-this.radius;
        var tile = this.map.get_tile(x, y);
        walkable_grid[x-relative_x][y-relative_y] = tile.open;
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
