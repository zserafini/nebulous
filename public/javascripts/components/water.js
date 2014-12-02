Crafty.c('Water', {
  init: function() {
    this.requires('Water_Sprite, Background')
    .areaMap(
      [_object_size/2,0],
      [_object_size,_object_size/4],
      [_object_size,(3*_object_size)/4],
      [_object_size/2,_object_size],
      [0,(3*_object_size)/4],
      [0,_object_size/4]
    )
  },
});
