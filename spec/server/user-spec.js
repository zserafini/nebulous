map = require("../../lib/map.js");
user = require("../../lib/user.js");
socket_helpers = jasmine.createSpy('socket_helpers');
_ = require('lodash-node');
var valid_clean_user_object = jasmine.objectContaining({type: 'Other Player', uniqueID: jasmine.any(String), coordinate: jasmine.objectContaining({ x: jasmine.any(Number), y: jasmine.any(Number)})});
var uniqueID = Math.random().toString(); 
var username = Math.random().toString(); 
var socket = jasmine.createSpy('socket', ['emit']);
player_object = {username: username, coordinate: {x: 130, y: 130, z: 1}, uniqueID: uniqueID};

describe("Initializing a new user", function() {

  beforeEach(function() {
    current_user = new User(socket);
  });

  it("adds a player object to the map", function() {
    expect(map.layout[current_user.coordinate.x][current_user.coordinate.y]).toContain(valid_clean_user_object);
  });
});
