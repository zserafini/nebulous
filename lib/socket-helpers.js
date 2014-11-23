module.exports = {
  get_room_name: function(object) {
    return object.coordinate.x + ":" + object.coordinate.y;
  },

  get_last_room_name: function(object) {
    return object.previous_coordinate.x + ":" + object.previous_coordinate.y;
  },

  broadcast_to_room: function(object, message) {
    var current_room = this.get_room_name(object);
    io.sockets.in(current_room).emit(message, object);
  },

  broadcast_to_previous_room: function(object, message) {
    var previous_room = this.get_last_room_name(object);
    io.sockets.in(previous_room).emit(message, object);
  },
}

