map = require("../../lib/map.js");
fox = require("../../lib/fox.js");
_ = require('lodash-node');
app = require('express')();
http = require('http').Server(app);
io = require('socket.io')(http);
client_io = require('socket.io-client');
socket_helpers = require("../../lib/socket-helpers.js");
var valid_map_object = jasmine.objectContaining({type: jasmine.any(String), uniqueID: jasmine.any(String), coordinate: jasmine.objectContaining({ x: jasmine.any(Number), y: jasmine.any(Number)})});

describe("Initializing", function() {

  beforeEach(function() {
    map.initialize();
  });

  it("populates the map layout with objects", function() {

    for(var x = 0; x < map.size; x++) {
      for(var y = 0; y < map.size; y++) {
        expect(map.layout[x][y][0]).toEqual(valid_map_object);
      }
    }
  });
});
