Crafty.c('Fox', {
  init: function() {
    this.requires('fox_sprite, Background, Animation')
    .areaMap([0,0],[0,0])
    .attr('animations', {walk: 4})
  },
});
