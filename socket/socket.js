var http = require('http').Server(app);
var io = require('socket.io')(http);
var map = require('../lib/map');
socket_helpers = require('../lib/socket-helpers');
_ = require('lodash-node');
map.initialize();

io.on('connection', function(socket){

  console.log('a user connected');

  socket.on('map request', function(coordinates){
    socket.emit('map request', map.get_local_map(socket, coordinates));
  });

  socket.on('update player position', function(player_data){
    var cleaned_player = _.extend({type: 'Other Player'}, player_data);
    var old_player_data = map.get_player(player_data.username);
    var updated_map = map.update_local_map(socket, old_player_data, player_data);
    var current_room = socket_helpers.get_socket_room_name(cleaned_player);
    socket.emit('update map', updated_map);
    map.update_player(cleaned_player);
    socket.broadcast.to(current_room).emit('update player position', cleaned_player);
  });

  socket.on('player request', function(player_data){
    var uniqueID = Math.random().toString(); 
    var new_player = {username: player_data.username, coordinate: {x: 130, y: 130, z: 1}, uniqueID: uniqueID};
    var cleaned_player = _.extend({type: 'Other Player'}, new_player);
    var current_room = socket_helpers.get_socket_room_name(cleaned_player);
    map.add_player(cleaned_player);
    socket.emit('player request', new_player);
    socket.broadcast.to(current_room).emit('add other player', cleaned_player);
  });

  socket.on('disconnect', function(){
    console.log('user disconnected');
  });

});

http.listen(3000, function(){
  console.log('listening on *:3000');
});

