var http = require('http').Server(app);
io = require('socket.io')(http);
var user = require('../lib/user');
socket_helpers = require('../lib/socket-helpers');
map = require('../lib/map');
_ = require('lodash-node');
map.initialize();

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
        console.log('ERROR: Invalid Object');
        console.log(player_data);
        return;
      }
      var updated_map = current_user.update(player_data);
      socket.emit('update map', updated_map);
    }
  });

  socket.on('disconnect', function(){
    if(current_user) {
      if(!current_user.verify(current_user.user)) {
        console.log('ERROR: Invalid Object');
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
