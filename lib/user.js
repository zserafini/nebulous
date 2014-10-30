module.exports = {
  join_room: function(user, object) {
    var new_room = this.get_room_name(object);
    user.join(new_room);
    return new_room;
  },

  leave_room: function(user, object) {
    var old_room = this.get_room_name(object);
    user.leave(old_room);
  },

  get_room_name: function(object) {
    return object.coordinate.x + ":" + object.coordinate.y;
  },
}

