Crafty.c('Grass', {
  init: function() {
    this.requires('Grass_Sprite, Background')
    .areaMap(
      [_object_size/2,0],
      [_object_size,_object_size/4],
      [_object_size,(3*_object_size)/4],
      [_object_size/2,_object_size],
      [0,(3*_object_size)/4],
      [0,_object_size/4]
    )
    .bind("Click", function() { player.walk_to(this.relative_coordinate) })
    .bind("Click", function() { console.log(this.coordinate); });
  },
});
