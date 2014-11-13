Fox = function (x, y) {
  var uniqueID = Math.random().toString(); 
  this.data = { type: 'Fox', coordinate: {x: x, y: y, z: 1}, uniqueID: uniqueID};
  map.add_object(this);
  this.emit('add object');
  this.new_direction();
}

Fox.prototype.remove = function() {
  map.remove_object(this.data);
  this.emit('destroy object');
}

Fox.prototype.emit = function(message) {
  socket_helpers.broadcast_to_room(this.clean(), message);
}

Fox.prototype.clean = function() {
  return _.extend({}, this.data, {});
}

Fox.prototype.updated_data = function() {
  return {
    type: this.data.type,
    uniqueID: this.data.uniqueID,
    coordinate: { 
      x: this.data.coordinate.x + this.dx,
      y: this.data.coordinate.y + this.dy,
      z: 1
    }
  };
}

Fox.prototype.next_move = function() {
  if(map.in_bounds(this.data.coordinate.x + this.dx, this.data.coordinate.y + this.dy)){
    map.update_object(this.updated_data());
    this.data = _.extend(this.data, this.updated_data());
  } else {
    this.new_direction();
  }
  this.emit('update object position');
}

Fox.prototype.new_direction = function() {
  do {
    this.dx = Math.floor(Math.random()*3)-1;
    this.dy = Math.floor(Math.random()*3)-1;
  }
  while (this.dx == 0 && this.dy ==0)
}
