Crafty.c('Grid', {
 
  at: function(x, y) {

    dx = ((x-player.coordinate.x)*64) + ((y-player.coordinate.x)*64);
    dy = (-(x-player.coordinate.x)*32) + ((y-player.coordinate.x)*32);

    this.x = player._x+dx;
    this.y = player._y+64+dy;
    this.coordinates = { x: x, y: y };
    return this;
  },

});

Crafty.c('Background', {
  init: function() {
    this.bind("moveBackground", function(dx, dy, dt) {
      this.forces.push([dx, dy, dt]);
      console.log(this.forces);
    });
  },
});

Crafty.c('Actor', {
  init: function() {
    this.requires('2D, Grid, Mouse, DOM, Tween')
    .bind('EnterFrame', this.apply_forces());

  },

  forces: [], //hold list of movement forces acting on actor

  apply_forces: function() {
    console.log('xxx');
    //called by game timer - moves actor on screen
    var dx = 0;
    var dy = 0;
    $.each(this.forces, function(key, value){
      dx += value.x;
      dy += value.y;
      value.t--;
    });
    this.x += dx;
    this.y += dy;
  },
});

Crafty.c('Grass', {
  init: function() {
    this.requires('Actor, grass_sprite, Background')
    .areaMap([64,0],[128,32],[128,96],[64,128],[0,96],[0,32])
    .bind("MouseOver", function() { this.sprite(0,1,1,1) })
    .bind("MouseOut", function() { this.sprite(0,0,1,1) });
  },
});

Crafty.c('Water', {
  init: function() {
    this.requires('Actor, water_sprite, Background')
    .areaMap([64,0],[128,32],[128,96],[64,128],[0,96],[0,32])
  },
});

Crafty.c('Player', {
  init: function() {
    this.requires('Actor, player_sprite')
    .areaMap([42,0],[86,0],[86,112],[42,112])
    .bind('EnterFrame', this.walk());
    //.bind("movePlayer", function(data) { this.move_g_pos(data) });
  },

  set_center: function(x_cord, y_cord) {
      this.x = $( "#cr-stage" ).width()/2-128; 
      this.y = $( "#cr-stage" ).height()/2-128; 
      this.attr('coordinate', { x: x_cord, y: y_cord });
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
    this.attr('movement_queue', path);
  },

  walk: function() {
    //pull off movement_queue and add to forces
    if(this.forces.length == 0)
    {
      //next_step = movement_queue.pop();
      this.forces.push({x: 2, y: 1, t: 64});
    }
  },
      
    //dgx = object.g_x - this.g_x;
    //dgy = object.g_y - this.g_y;
    //dplayer = { dgx: dgx, dgy: dgy };
    //Crafty.trigger('movePlayer', dplayer);

    //player_pos = iso.pos2px(this.i_x, this.i_y);
    //object_pos = iso.pos2px(object.i_x, object.i_y);
    //dpx = player_pos.left - object_pos.left;
    //dpy = object_pos.top - player_pos.top;
    //dt  = Math.sqrt((dgx*dgx)+(dgy*dgy))*500
    //dbackground = { dpx: dpx, dpy: dpy, dt: dt };

    //console.log("click: " + [object.g_x, object.g_y]);

  //move_g_pos: function(transformation) {
  //  this.attr({
  //    g_x: this.g_x+transformation.dgx,
  //    g_y: this.g_y+transformation.dgy,
  //  });
  //  return this;
  //},

});
