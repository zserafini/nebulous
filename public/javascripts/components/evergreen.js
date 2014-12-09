Crafty.c('Evergreen', {
  init: function() {
    this.requires('Evergreen_Sprite, Background')
    .areaMap(
      [_object_size/2,0],
      [_object_size*25/32,_object_size*3/4],
      [_object_size/2,_object_size*7/8],
      [_object_size/4,_object_size*3/4],
      [_object_size/2,0]
    )
  },
});
