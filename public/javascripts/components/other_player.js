Crafty.c('OtherPlayer', {
  init: function() {
    this.requires('OtherPlayer_Sprite, Background, Animation')
    .areaMap(
      [(11*_object_size)/32,0],
      [(25*_object_size)/32,0],
      [(25*_object_size)/32,(25*_object_size)/32],
      [(11*_object_size)/32,(25*_object_size)/32]
    )
    .attr('animations', {walk: 8})
  },

});
