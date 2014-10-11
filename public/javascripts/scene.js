var socket = io();
var player;
Crafty.scene('Game', function() {

  socket.on('map request', function(new_map) {
    Map.map.layout = new_map;
    console.log(new_map);
    Map.initialize();
  });

  socket.on('add other player', function(new_player) {
    Map.add_player(new_player);
  });

  socket.on('update player position', function(updated_player) {
    Map.move_other_player(updated_player);
  });

  socket.on('player request', function(player_data) {

    player = Crafty.e('Player')
      .set_center(player_data.x, player_data.y)
      .attr('username', player_data.username)
      .attr('z', 500)
      .bind('EnterFrame', function() { this.walk(); });

    get_map();

  });

  get_map = function() {
    socket.emit('map request', { x: player.coordinate.x, y: player.coordinate.y });
  };

  get_player = function() {
    username = Math.random().toString(); 
    socket.emit('player request', { username: username });
  };

  get_player();

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
