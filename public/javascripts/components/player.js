Crafty.c('Player', {
  init: function() {
    this.requires('Actor, Player_Sprite, Animation')
    .areaMap(
      [(11*_object_size)/32,0],
      [(25*_object_size)/32,0],
      [(25*_object_size)/32,(25*_object_size)/32],
      [(11*_object_size)/32,(25*_object_size)/32]
    )
    .attr('add_object_queue', [])
  },

  set_center: function(x_cord, y_cord) {
      this.x = $( "#cr-stage" ).width()/2-_object_size/2; 
      this.y = $( "#cr-stage" ).height()/2-_object_size/2; 
      this.attr('coordinate', { x: x_cord, y: y_cord, z: 1 });
      this.attr('dx', 0);
      this.attr('dy', 0);
      this.attr('animations', {walk: 8});
      this.username = Math.random().toString();
      return this;
  },

  walk_to: function(relative_coordinate) {

    var path_search_radius = Map.storage_radius;
    var walkable_grid = Map.build_walkable_grid();
    var search_graph = new Graph( walkable_grid , {diagonal: true});
    var start = search_graph.grid[path_search_radius][path_search_radius];
    var end   = search_graph.grid[path_search_radius-relative_coordinate.x][path_search_radius-relative_coordinate.y];
    var path  = astar.search(search_graph, start, end);
    var true_path = [];
    $.each(path, function(key, value) {
      real_x = value.x - path_search_radius + player.coordinate.x;
      real_y = value.y - path_search_radius + player.coordinate.y;
      true_path.push({x: real_x, y: real_y});
    });
    this.attr('movement_queue', true_path);
  },

});
