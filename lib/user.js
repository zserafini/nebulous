module.exports = {
  new_user: function(socket) {
    return {
      join_room: function(object) {
        var new_room = socket_helpers.get_room_name(object);
        socket.join(new_room);
        return new_room;
      },

      leave_room: function(object) {
        var old_room = socket_helpers.get_room_name(object);
        socket.leave(old_room);
      },

      get_map: function(coordinates) {

        var local_layout = [];

        for(var x = coordinates.x+map.radius; x >= coordinates.x-map.radius; x--) {
          for(var y = coordinates.y+map.radius; y >= coordinates.y-map.radius; y--) {
            var location_object = {coordinate: {x: x, y: y}};
            this.join_room(location_object);
            local_layout.push(map.layout[x][y]);
          }
        }
        return local_layout;
      },

      update_map: function(old_data, new_data) {
        var dx = new_data.coordinate.x-old_data.coordinate.x;
        var dy = new_data.coordinate.y-old_data.coordinate.y;

        var new_objects = [];

        if( dx !=0 ){
          var x = new_data.coordinate.x+(dx*map.radius);
          for(var y = new_data.coordinate.y+map.radius; y >=new_data.coordinate.y-map.radius; y--) {
            var location_object = {coordinate: {x: x, y: y}};
            this.join_room(location_object);
            new_objects.push(map.layout[x][y]);
          }
          var x = new_data.coordinate.x-(dx*(map.radius+1));
          var new_y = new_data.coordinate.y+(dy*map.radius);
          for(var y = new_data.coordinate.y+map.radius; y >=new_data.coordinate.y-map.radius; y--) {
            var location_object = {coordinate: {x: x, y: y}};
            this.leave_room(location_object);
          }
        }
        if( dy !=0 ){
          var y = new_data.coordinate.y+(dy*map.radius);
          for(var x = new_data.coordinate.x+map.radius; x >=new_data.coordinate.x-map.radius; x--) {
            var location_object = {coordinate: {x: x, y: y}};
            this.join_room(location_object);
            new_objects.push(map.layout[x][y]);
          }
          var y = new_data.coordinate.y-(dy*(map.radius+1));
          var new_x = new_data.coordinate.x+(dx*map.radius);
          for(var x = new_data.coordinate.x+map.radius; x >=new_data.coordinate.x-map.radius; x--) {
            var location_object = {coordinate: {x: x, y: y}};
            this.leave_room(location_object);
          }
        }
        return new_objects;
      },
    }
  },
}
