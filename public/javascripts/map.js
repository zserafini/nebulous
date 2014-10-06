Map = {
  
  radius: 4,

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
        var tile = Crafty.e(tile_data.type)
          .at(x, y)
          .attr('z', y*2-x)
          .bind("Click", function() { console.log(this.coordinates) })
          .bind("Click", function() { player.walk_to(this.coordinates) });
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
}
