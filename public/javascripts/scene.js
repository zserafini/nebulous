var socket = io();
var player;
Crafty.scene('Game', function() {

  get_map = function() {
    Map.initialize();
    socket.emit('map request', { x: player.coordinate.x, y: player.coordinate.y });
  };

  socket.on('map request', function(new_map) {
    Map.insert_new_records(new_map);
    MapRenderer.initialize();
  });

  socket.on('update map', function(new_objects) {
    Map.insert_new_records(new_objects);
  });

  socket.on('add other player', function(new_player_data) {
    Map.insert_new_object(new_player_data);
    player.add_object_queue.push(new_player_data);
  });

  socket.on('update player position', function(updated_player) {
    if(updated_player.uniqueID == player.uniqueID) {
      return; //don't let no stinkin server tell you what to do
    }
    Map.update_object(updated_player);
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

});


Crafty.scene('Loading', function(){
  Crafty.e('2D, DOM, Text')
    .text('Loading; please wait...')
    .css($text_css);

  Crafty.load([
    'images/sprite.png',
    'images/player.png'
    ], function(){
      Crafty.sprite(128, "images/sprite.png", {
        grass_sprite: [0,0,1,1],
        water_sprite: [3,0,1,1],
      });
      Crafty.sprite(128, "images/player.png", {
        player_sprite: [0,0,1,1]
      });
      Crafty.scene('Game');
    })
});
