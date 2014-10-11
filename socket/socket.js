var http = require('http').Server(app);
var io = require('socket.io')(http);
var map = require('../models/map');
map.initialize();

io.on('connection', function(socket){

  console.log('a user connected');

  socket.on('map request', function(coordinates){
    socket.emit('map request', map.get_local_map(coordinates));
  });

  socket.on('update player position', function(player_data){
    updated_player = {username: player_data.username, x: player_data.x, y: player_data.y};
    map.update_player(updated_player);
    socket.broadcast.emit('update player position', updated_player);
  });

  socket.on('player request', function(player_data){
    new_player = {username: player_data.username, x: 130, y: 130};
    map.add_player(new_player);
    socket.emit('player request', new_player);
    socket.broadcast.emit('add other player', new_player);
  });

  socket.on('disconnect', function(){
    console.log('user disconnected');
  });
});

http.listen(3000, function(){
  console.log('listening on *:3000');
});

