module.exports = {

  radius: 6,

  initialize: function() {
    console.log('building map');
    for(var x = 0; x < 200; x++) {
      this.layout[x] = [];
      for(var y = 0; y < 200; y++) {
        if(Math.random() < 0.2) {
          tile_type = "Water";
        } else {
          tile_type = "Grass";
        }
        var tile_data = {type: tile_type, open: 1, children: []};
        if(tile_type == "Water"){
          tile_data.open = 0;
        }
        this.layout[x][y] = tile_data;
      }
    }
    console.log('building map complete');
  },

  layout: [],

  get_local_map: function(coordinates) {
    var hash_map = {};
    for(var x = coordinates.x+this.radius; x >= coordinates.x-this.radius; x--) {
      for(var y = coordinates.y+this.radius; y >= coordinates.y-this.radius; y--) {
        key = x.toString() + ":" + y.toString();
        hash_map[key] = this.layout[x][y];
      }
    }
    return hash_map;
  },

  update_local_map: function(coordinates,direction) {
    //smart selection of map tiles goes here
  },
}
