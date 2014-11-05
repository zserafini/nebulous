map = require("../../lib/map.js");
user = require("../../lib/user.js");
_ = require('lodash-node');
io = require('socket.io')(http);
client_io = require('socket.io-client');
socket_helpers = require("../../lib/socket-helpers.js");
app = require('express')();
var http = require('http').Server(app);

describe("User Class", function() {

  map.initialize();

  beforeEach(function() {
    socket = client_io.connect("http://localhost:3000");
    spyOn(socket, 'emit');
    spyOn(io.sockets, 'emit');
    current_user = new User(socket);
  });

  describe("Initializing a new user", function() {

    it("adds a player object to the map", function() {
      expect(map.layout[current_user.user.coordinate.x][current_user.user.coordinate.y]).toContain(current_user.clean());
    });

    it("should emit players details back to client", function() {
      expect(socket.emit).toHaveBeenCalledWith('player request', current_user.user);
    });

    it("should broadcast scrubbed details to current room", function() {
      expect(io.sockets.emit).toHaveBeenCalledWith('add other player', current_user.clean());
    });
  });

  describe("Updating a user", function() {

    beforeEach(function() {
      new_x_cord = 131;
      new_y_cord = 131;
      updated_user = {coordinate: {x: new_x_cord, y: new_y_cord, z: 1}, uniqueID: current_user.user.uniqueID};
      current_user.update(updated_user);
    });

    it("should replace old user position with new position", function() {
      expect(current_user.user.coordinate.x).toEqual(new_x_cord);
      expect(current_user.user.coordinate.x).toEqual(new_y_cord);
    });

    it("should emit new map data back to client", function() {
      //TODO: make test properly check map updates
      expect(socket.emit).toHaveBeenCalledWith('update map', []);
    });

    it("should broadcast scrubbed details to current room", function() {
      expect(io.sockets.emit).toHaveBeenCalledWith('update player position', current_user.clean());
    });
  });
});
