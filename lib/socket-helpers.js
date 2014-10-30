module.exports = {
  get_room_name: function(object) {
    return object.coordinate.x + ":" + object.coordinate.y;
  },
}

