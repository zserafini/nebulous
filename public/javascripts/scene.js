var socket = io();
Crafty.scene('Game', function() {

  player = Crafty.e('Player')
    .set_center(130,130)
    .attr('z', 500)
    .bind('EnterFrame', function() { this.walk(); });

  socket.on('map request', function(new_map) {
    Map.map.layout = new_map;
    console.log(new_map);
    Map.initialize();
  });

  socket.on('add player', function(new_player) {
    Map.add_player(new_player);
  });

  update_map = function() {
    socket.emit('map request', { x: player.coordinate.x, y: player.coordinate.y });
  };

  update_map();
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
