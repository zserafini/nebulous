Evergreen = function (x, y) {
  var uniqueID = Math.random().toString(); 
  this.data = { 
    type: 'Evergreen', 
    coordinate: {x: x, y: y, z: 1}, 
    uniqueID: uniqueID, 
    closed: true
  };
  map.add_object(this);
}

Evergreen.prototype.remove = function() {
  map.remove_object(this.data);
  this.emit('destroy object');
}

Evergreen.prototype.emit = function(message) {
  socket_helpers.broadcast_to_room(this.clean(), message);
}

Evergreen.prototype.clean = function() {
  return _.extend({}, this.data, {});
}

Evergreen.prototype.next_move = function() {
}
