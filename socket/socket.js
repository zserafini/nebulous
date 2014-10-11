var http = require('http').Server(app);
var io = require('socket.io')(http);
var map = require('../models/map');
map.initialize();

io.on('connection', function(socket){

  console.log('a user connected');

  username = Math.random().toString(); //temporary make a user model!
  user = {username: username, x: 130, y: 130};
  map.add_player(user);
  socket.broadcast.emit('add player', user);

  socket.on('map request', function(coordinates){
    socket.emit('map request', map.get_local_map(coordinates));
  });

  socket.on('disconnect', function(){
    console.log('user disconnected');
  });
});

http.listen(3000, function(){
  console.log('listening on *:3000');
});

