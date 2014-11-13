module.exports = {

  tick_duration: 1000,

  start: function() {
    console.log('timer started');
    setInterval(this.update, this.tick_duration);
  },

  update: function() {
    map.objects.each
    _.each(map.objects, function(object) {
      object.next_move();
    });
  }
}
