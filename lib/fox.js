var MapObject = require('./map_object.js');
MapObject.mixin(Fox);

function Fox(coordinates){
  this.data = { type: 'Fox' };
  this.add(coordinates);
  this.new_direction();
}

Fox.prototype.updated_data = function() {
  return {
    type: this.data.type,
    uniqueID: this.data.uniqueID,
    previous_coordinate: {
      x: this.data.coordinate.x,
      y: this.data.coordinate.y,
      z: this.data.coordinate.z
    },
    coordinate: { 
      x: this.data.coordinate.x + this.dx,
      y: this.data.coordinate.y + this.dy,
      z: this.data.coordinate.z
    }
  };
}

Fox.prototype.next_move = function() {
  if(map.is_open_coordinate(this.data.coordinate.x + this.dx, this.data.coordinate.y + this.dy)){
    map.update_object(this.updated_data());
    this.data = _.extend(this.data, this.updated_data());
    this.emit('update object position');
    this.emit_to_previous_location('vacate notice');
  } else {
    this.new_direction();
  }
}

Fox.prototype.new_direction = function() {
  do {
    this.dx = Math.floor(Math.random()*3)-1;
    this.dy = Math.floor(Math.random()*3)-1;
  }
  while (this.dx == 0 && this.dy ==0)
}

module.exports = Fox;
