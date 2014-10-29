module.exports = {
  join_room: function(socket, object) {
    var new_room = this.get_socket_room_name(object);
    socket.join(new_room);
    return new_room;
  },

  leave_room: function(socket, object) {
    var old_room = this.get_socket_room_name(object);
    socket.leave(old_room);
  },

  get_socket_room_name: function(object) {
    return object.coordinate.x + ":" + object.coordinate.y;
  },
}

