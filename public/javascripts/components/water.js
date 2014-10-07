Crafty.c('Water', {
  init: function() {
    this.requires('Actor, water_sprite, Background')
    .areaMap([64,0],[128,32],[128,96],[64,128],[0,96],[0,32])
  },
});
