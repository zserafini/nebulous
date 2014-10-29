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

  get_local_map: function(socket, coordinates) {

    var local_layout = [];

    for(var x = coordinates.x+this.radius; x >= coordinates.x-this.radius; x--) {
      for(var y = coordinates.y+this.radius; y >= coordinates.y-this.radius; y--) {
        var location_object = {coordinate: {x: x, y: y}};
        socket_helpers.join_room(socket, location_object);
        local_layout.push(this.layout[x][y]);
      }
    }
    return local_layout;
  },

  update_local_map: function(socket, old_data, new_data) {
    var dx = new_data.coordinate.x-old_data.coordinate.x;
    var dy = new_data.coordinate.y-old_data.coordinate.y;

    var new_objects = [];

    if( dx !=0 ){
      var x = new_data.coordinate.x+(dx*this.radius);
      for(var y = new_data.coordinate.y+this.radius; y >=new_data.coordinate.y-this.radius; y--) {
        var location_object = {coordinate: {x: x, y: y}};
        socket_helpers.join_room(socket, location_object);
        new_objects.push(this.layout[x][y]);
      }
      var x = new_data.coordinate.x-(dx*(this.radius+1));
      var new_y = new_data.coordinate.y+(dy*this.radius);
      for(var y = new_data.coordinate.y+this.radius; y >=new_data.coordinate.y-this.radius; y--) {
          var location_object = {coordinate: {x: x, y: y}};
          socket_helpers.leave_room(socket, location_object);
      }
    }
    if( dy !=0 ){
      var y = new_data.coordinate.y+(dy*this.radius);
      for(var x = new_data.coordinate.x+this.radius; x >=new_data.coordinate.x-this.radius; x--) {
        var location_object = {coordinate: {x: x, y: y}};
        socket_helpers.join_room(socket, location_object);
        new_objects.push(this.layout[x][y]);
      }
      var y = new_data.coordinate.y-(dy*(this.radius+1));
      var new_x = new_data.coordinate.x+(dx*this.radius);
      for(var x = new_data.coordinate.x+this.radius; x >=new_data.coordinate.x-this.radius; x--) {
          var location_object = {coordinate: {x: x, y: y}};
          socket_helpers.leave_room(socket, location_object);
      }
    }
    return new_objects;
  },

  add_player: function(new_player) {
    this.players[new_player.username] = new_player;
    this.layout[new_player.coordinate.x][new_player.coordinate.y].push(new_player);
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
}
