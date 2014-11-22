var MapObject = require('./map_object.js');
MapObject.mixin(User);

function User(socket) {
  this.socket = socket;
  var username = Math.random().toString(); 
  this.data = { type: 'Other Player', username: username };
  this.add({x: 0, y: 0, z: 1});
  this.socket.emit('player request', this.data);
}

User.prototype.logoff = function() {
  map.remove_object(this.data);
  this.emit('user logoff');
}

User.prototype.join_room = function(object) {
  var new_room = socket_helpers.get_room_name(object);
  this.socket.join(new_room);
  return new_room;
}

User.prototype.leave_room = function(object) {
  var old_room = socket_helpers.get_room_name(object);
  this.socket.leave(old_room);
}

User.prototype.get_map = function(coordinates) {

  var local_layout = [];

  for(var x = coordinates.x+map.radius; x >= coordinates.x-map.radius; x--) {
    for(var y = coordinates.y+map.radius; y >= coordinates.y-map.radius; y--) {
      if(map.in_bounds(x, y)){
        var location_object = {coordinate: {x: x, y: y}};
        this.join_room(location_object);
        local_layout.push(map.layout[x][y]);
      }
    }
  }
  return local_layout;
}

User.prototype.verify = function(updated_player) {
   if(typeof map.get_object(updated_player.uniqueID) === 'undefined') {
     return false;
   }
   if(!map.is_open_coordinate(updated_player.coordinate.x, updated_player.coordinate.y)) {
     return false;
   }
   return true;
}

User.prototype.updated_data = function(data) {
  return _.extend(this.clean(), { coordinate: { x: data.coordinate.x, y: data.coordinate.y, z: data.coordinate.z } });
}

User.prototype.update = function(new_user) {
  this.socket.emit('update map', this.update_map(new_user));
  map.update_object(this.updated_data(new_user));
  this.data = _.extend(this.data, new_user);
  this.emit('update player position');
}

User.prototype.update_map = function(new_data) {
  var dx = new_data.coordinate.x-this.data.coordinate.x;
  var dy = new_data.coordinate.y-this.data.coordinate.y;

  var new_objects = [];

  if(dx !=0){
    var x = new_data.coordinate.x+(dx*map.radius);
    for(var y = new_data.coordinate.y+map.radius; y >=new_data.coordinate.y-map.radius; y--) {
      if(map.in_bounds(x, y)){
        var location_object = {coordinate: {x: x, y: y}};
        this.join_room(location_object);
        new_objects.push(map.layout[x][y]);
      }
    }
    var x = new_data.coordinate.x-(dx*(map.radius+1));
    var new_y = new_data.coordinate.y+(dy*map.radius);
    for(var y = new_data.coordinate.y+map.radius; y >=new_data.coordinate.y-map.radius; y--) {
      if(map.in_bounds(x, y)) {
        var location_object = {coordinate: {x: x, y: y}};
        this.leave_room(location_object);
      }
    }
  }
  if(dy !=0){
    var y = new_data.coordinate.y+(dy*map.radius);
    for(var x = new_data.coordinate.x+map.radius; x >=new_data.coordinate.x-map.radius; x--) {
      if(map.in_bounds(x, y)) {
        var location_object = {coordinate: {x: x, y: y}};
        this.join_room(location_object);
        new_objects.push(map.layout[x][y]);
      }
    }
    var y = new_data.coordinate.y-(dy*(map.radius+1));
    var new_x = new_data.coordinate.x+(dx*map.radius);
    for(var x = new_data.coordinate.x+map.radius; x >=new_data.coordinate.x-map.radius; x--) {
      if(map.in_bounds(x, y)) {
        var location_object = {coordinate: {x: x, y: y}};
        this.leave_room(location_object);
      }
    }
  }
  return new_objects;
}

module.exports = User;
