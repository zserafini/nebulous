var http = require('http').Server(app);
var io = require('socket.io')(http);
var map = require('../models/map');
var _ = require('lodash-node');
map.initialize();

io.on('connection', function(socket){

  console.log('a user connected');

  socket.on('map request', function(coordinates){
    socket.emit('map request', map.get_local_map(coordinates));
  });

  socket.on('update player position', function(player_data){
    old_player_data = map.get_player(player_data.username);
    socket.emit('update map', map.update_local_map(old_player_data, player_data));
    map.update_player(player_data);
    socket.broadcast.emit('update player position', player_data);
  });

  socket.on('player request', function(player_data){
    var uniqueID = Math.random().toString(); 
    new_player = {username: player_data.username, coordinate: {x: 130, y: 130, z: 1}, uniqueID: uniqueID};
    map.add_player(new_player);
    socket.emit('player request', new_player);
    var cleaned_player = _.extend({type: 'Other Player'}, new_player);
    socket.broadcast.emit('add other player', cleaned_player);
  });

  socket.on('disconnect', function(){
    console.log('user disconnected');
  });
});

http.listen(3000, function(){
  console.log('listening on *:3000');
});

