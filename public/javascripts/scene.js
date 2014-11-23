var socket = io();
var player;
Crafty.scene('Game', function() {

  get_map = function() {
    Map.initialize();
    socket.emit('map request', { x: player.coordinate.x, y: player.coordinate.y });
  };

  socket.on('map request', function(new_map) {
    console.log(new_map);
    Map.insert_new_records(new_map);
    MapRenderer.initialize();
  });

  socket.on('update map', function(new_objects) {
    Map.insert_new_records(new_objects);
  });

  socket.on('add object', function(new_object_data) {
    Map.insert_new_object(new_object_data);
    player.add_object_queue.push(new_object_data);
  });

  socket.on('update player position', function(updated_player) {
    if(updated_player.uniqueID == player.uniqueID) {
      return; //don't let no stinkin server tell you what to do
    }
    Map.update_object(updated_player);
  });

  socket.on('update object position', function(updated_object) {
    Map.update_object(updated_object);
  });

  socket.on('vacate notice', function(updated_object) {
    if(!Map.is_object_in_scope(updated_object)){
      Map.remove_old_object(updated_object.uniqueID);
    }
  });

  socket.on('user logoff', function(user) {
    Map.remove_object(user);
  });

  socket.on('reconnect_attempt', function() {
    console.log('attempting socket reconnect');
  });

  socket.on('player request', function(player_data) {
    player = Crafty.e('Player')
      .set_center(player_data.coordinate.x, player_data.coordinate.y)
      .attr('username', player_data.username)
      .attr('uniqueID', player_data.uniqueID)
      .attr('z', 500);
    get_map();
  });

  socket.emit('ready for player');

});


Crafty.scene('Loading', function(){
  Crafty.e('2D, DOM, Text')
    .text('Loading; please wait...')
    .css($text_css);

  Crafty.load([
    'images/sprite.png',
    'images/player.png',
    'images/fox.png',
    'images/evergreen.png'
    ], function(){
      Crafty.sprite(128, "images/sprite.png", {
        grass_sprite: [0,0,1,1],
        water_sprite: [3,0,1,1],
      });
      Crafty.sprite(128, "images/player.png", {
        player_sprite: [0,0,1,1]
      });
      Crafty.sprite(128, "images/fox.png", {
        fox_sprite: [0,0,1,1]
      });
      Crafty.sprite(128, "images/evergreen.png", {
        evergreen_sprite: [0,0,1,1]
      });
      Crafty.scene('Game');
    })
});
