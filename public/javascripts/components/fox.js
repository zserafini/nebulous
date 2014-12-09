Crafty.c('Fox', {
  init: function() {
    this.requires('Fox_Sprite, Background, Animation')
    .areaMap(
      [_object_size/8,_object_size/2],
      [_object_size*7/8,_object_size/2],
      [_object_size*7/8,_object_size*25/32],
      [_object_size/8,_object_size*25/32],
      [_object_size/8,_object_size/2]
    )
    .attr('animations', {walk: 4})
  },
});
