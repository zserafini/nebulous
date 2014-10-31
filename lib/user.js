User = function (socket) {
  //constructor
  this.socket = socket;
  var uniqueID = Math.random().toString(); 
  var username = Math.random().toString(); 
  this.user = {username: username, coordinate: {x: 130, y: 130, z: 1}, uniqueID: uniqueID};
  map.add_player(this.clean());
  this.socket.emit('player request', this.user);
  this.emit('add other player');
}

User.prototype.logoff = function() {
  map.remove_object(this.user);
  this.emit('user logoff');
}

User.prototype.emit = function(message) {
  socket_helpers.broadcast_to_room(this.clean(), message);
}

User.prototype.clean = function() {
  return _.extend({}, this.user, {type: 'Other Player'});
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
      var location_object = {coordinate: {x: x, y: y}};
      this.join_room(location_object);
      local_layout.push(map.layout[x][y]);
    }
  }
  return local_layout;
}

User.prototype.verify = function(updated_player) {
   if(typeof map.get_player(updated_player.username) === 'undefined')
   {
     return false;
   }
   return true;
}

User.prototype.update = function(new_user) {
  this.user = _.extend(this.user, new_user);
  map.update_player(this.clean());
  this.emit('update player position');
  return this.update_map(new_user);
}

User.prototype.update_map = function(new_data) {
  var old_data = map.get_player(new_data.username);
  var dx = new_data.coordinate.x-old_data.coordinate.x;
  var dy = new_data.coordinate.y-old_data.coordinate.y;

  var new_objects = [];

  if( dx !=0 ){
    var x = new_data.coordinate.x+(dx*map.radius);
    for(var y = new_data.coordinate.y+map.radius; y >=new_data.coordinate.y-map.radius; y--) {
      var location_object = {coordinate: {x: x, y: y}};
      this.join_room(location_object);
      new_objects.push(map.layout[x][y]);
    }
    var x = new_data.coordinate.x-(dx*(map.radius+1));
    var new_y = new_data.coordinate.y+(dy*map.radius);
    for(var y = new_data.coordinate.y+map.radius; y >=new_data.coordinate.y-map.radius; y--) {
      var location_object = {coordinate: {x: x, y: y}};
      this.leave_room(location_object);
    }
  }
  if( dy !=0 ){
    var y = new_data.coordinate.y+(dy*map.radius);
    for(var x = new_data.coordinate.x+map.radius; x >=new_data.coordinate.x-map.radius; x--) {
      var location_object = {coordinate: {x: x, y: y}};
      this.join_room(location_object);
      new_objects.push(map.layout[x][y]);
    }
    var y = new_data.coordinate.y-(dy*(map.radius+1));
    var new_x = new_data.coordinate.x+(dx*map.radius);
    for(var x = new_data.coordinate.x+map.radius; x >=new_data.coordinate.x-map.radius; x--) {
      var location_object = {coordinate: {x: x, y: y}};
      this.leave_room(location_object);
    }
  }
  return new_objects;
}
