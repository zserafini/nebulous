var http = require('http').Server(app);
var User = require("../lib/user.js");
io = require('socket.io')(http);
socket_helpers = require('../lib/socket-helpers');

io.on('connection', function(socket){

  console.log('a user connected');
  var current_user;

  socket.on('ready for player', function(){
    current_user = new User(socket);
  });

  socket.on('map request', function(coordinates){
    full_map = current_user.get_map(coordinates);
    socket.emit('map request', full_map);
  });

  socket.on('update player position', function(player_data){
    if(current_user) {
      if(!current_user.verify(player_data)) {
        console.log('ERROR: Invalid Object On Update');
        console.log(player_data);
        return;
      }
      current_user.update(player_data);
    }
  });

  socket.on('disconnect', function(){
    if(current_user) {
      if(!current_user.verify(current_user.data)) {
        console.log('ERROR: Invalid Object On Disconnect');
        console.log(current_user);
        return;
      }
      console.log('user disconnected');
      current_user.logoff()
    }
  });

});

http.listen(3000, function(){
  console.log('listening on *:3000');
});
