Crafty.c('Player', {
  init: function() {
    this.requires('Actor, player_sprite')
    .areaMap([42,0],[86,0],[86,112],[42,112])
  },

  set_center: function(x_cord, y_cord) {
      this.x = $( "#cr-stage" ).width()/2-128; 
      this.y = $( "#cr-stage" ).height()/2-128; 
      this.attr('coordinate', { x: x_cord, y: y_cord });
      this.username = Math.random().toString();
      return this;
  },

  walk_to: function(coordinate) {

    var walkable_grid = Map.build_walkable_grid();
    var search_graph = new Graph( walkable_grid , {diagonal: true});
    var relative_x = coordinate.x - player.coordinate.x;
    var relative_y = coordinate.y - player.coordinate.y;
    var start = search_graph.grid[Map.radius][Map.radius];
    var end   = search_graph.grid[Map.radius+relative_x][Map.radius+relative_y];
    var path  = astar.search(search_graph, start, end);
    var true_path = [];
    $.each(path, function(key, value) {
      real_x = value.x - Map.radius + player.coordinate.x;
      real_y = value.y - Map.radius + player.coordinate.y;
      true_path.push({x: real_x, y: real_y});
    });
    this.attr('movement_queue', true_path);
  },

});
