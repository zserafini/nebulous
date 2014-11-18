Crafty.c('Other Player', {
  init: function() {
    this.requires('player_sprite, Background, Animation')
    .areaMap([42,0],[86,0],[86,112],[42,112])
    .attr('animations', {walk: 7})
  },

});
