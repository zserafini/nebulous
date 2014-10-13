Crafty.c('Grass', {
  init: function() {
    this.requires('grass_sprite, Background')
    .areaMap([64,0],[128,32],[128,96],[64,128],[0,96],[0,32])
    .bind("MouseOver", function() { this.sprite(0,1,1,1) })
    .bind("MouseOut", function() { this.sprite(0,0,1,1) })
    .bind("Click", function() { player.walk_to(this.relative_coordinate) })
    .bind("Click", function() { console.log(this.coordinate); });
  },
});
