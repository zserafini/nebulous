var http = require('http').Server(app);
var io = require('socket.io')(http);
var map = require('../lib/map');
user = require('../lib/user');
_ = require('lodash-node');
map.initialize();

io.on('connection', function(socket_controller){

  console.log('a user connected');

  socket_controller.on('map request', function(coordinates){
    socket_controller.emit('map request', map.get_local_map(socket_controller, coordinates));
  });

  socket_controller.on('update player position', function(player_data){
    var cleaned_player = _.extend({type: 'Other Player'}, player_data);
    var old_player_data = map.get_player(player_data.username);
    var updated_map = map.update_local_map(socket_controller, old_player_data, player_data);
    var current_room = user.get_room_name(cleaned_player);
    socket_controller.emit('update map', updated_map);
    map.update_player(cleaned_player);
    socket_controller.broadcast.to(current_room).emit('update player position', cleaned_player);
  });

  socket_controller.on('player request', function(player_data){
    var uniqueID = Math.random().toString(); 
    var new_player = {username: player_data.username, coordinate: {x: 130, y: 130, z: 1}, uniqueID: uniqueID};
    var cleaned_player = _.extend({type: 'Other Player'}, new_player);
    var current_room = user.get_room_name(cleaned_player);
    map.add_player(cleaned_player);
    socket_controller.emit('player request', new_player);
    socket_controller.broadcast.to(current_room).emit('add other player', cleaned_player);
  });

  socket_controller.on('disconnect', function(){
    console.log('user disconnected');
  });

});

http.listen(3000, function(){
  console.log('listening on *:3000');
});

