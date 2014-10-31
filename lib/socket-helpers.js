module.exports = {
  get_room_name: function(object) {
    return object.coordinate.x + ":" + object.coordinate.y;
  },

  broadcast_to_room: function(object, message) {
    var current_room = this.get_room_name(object);
    io.sockets.in(current_room).emit(message, object);
  },
}

