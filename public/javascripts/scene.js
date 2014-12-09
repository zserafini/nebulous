var socket = io();
var player;

var _map_scale = 1; //Only use 1, 2, or 4
console.log($( window ).width());
if($( window ).width() > 1200) {
  var _map_scale = 4;
} else if ($( window ).width() > 650) {
  var _map_scale = 2;
}

var _object_size = _map_scale*32;

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

  socket.on('update object position', function(updated_object) {
    if(updated_object.uniqueID == player.uniqueID) {
      return; //don't let no stinkin server tell you what to do
    }
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

  var assets = [
    'Evergreen_Sprite',
    'Fox_Sprite',
    'Grass_Sprite',
    'OtherPlayer_Sprite',
    'Player_Sprite',
    'Water_Sprite'
  ];

  var asset_paths = $.map(assets, function(asset, i) {
    return 'images/generated/' + asset + _object_size + '.png';
  });

  Crafty.load(asset_paths, function(){
    $.each(assets, function(i, asset){
      var path = 'images/generated/' + asset + _object_size + '.png';
      var sprite_map = {};
      sprite_map[asset] = [0,0,1,1];
      Crafty.sprite(_object_size, path, sprite_map);
    });
    Crafty.scene('Game');
  });
});
