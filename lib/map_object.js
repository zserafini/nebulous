function MapObject () { }

MapObject.prototype.add = function(coordinates) {
  var uniqueID = Math.random().toString(); 
  _.extend(this.data, { 
    coordinate: {x: coordinates.x, y: coordinates.y, z: coordinates.z},
    uniqueID: uniqueID
  });
  map.add_object(this);
  this.emit('add object');
};

MapObject.prototype.remove = function() {
  map.remove_object(this.data);
  this.emit('destroy object');
};

MapObject.prototype.emit = function(message) {
  socket_helpers.broadcast_to_room(this.clean(), message);
};

MapObject.prototype.next_move = function() {
};

MapObject.mixin = function(destObject){
  ['add', 'remove', 'emit', 'next_move'].forEach(function(property) {
    destObject.prototype[property] = MapObject.prototype[property];
  });
};

module.exports = MapObject;
