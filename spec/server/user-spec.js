map = require("../../lib/map.js");
user = require("../../lib/user.js");
fox = require("../../lib/fox.js");
evergreen = require("../../lib/evergreen.js");
_ = require('lodash-node');
app = require('express')();
http = require('http').Server(app);
io = require('socket.io')(http);
client_io = require('socket.io-client');
socket_helpers = require("../../lib/socket-helpers.js");

describe("User Class", function() {

  map.initialize();

  beforeEach(function() {
    socket = client_io.connect("http://localhost:3000");
    spyOn(socket, 'emit');
    spyOn(io.sockets, 'emit');
    current_user = new User(socket);
  });

  describe("Initializing", function() {

    it("adds a player object to the map", function() {
      expect(map.layout[current_user.data.coordinate.x][current_user.data.coordinate.y]).toContain(current_user.clean());
    });

    it("should emit players details back to client", function() {
      expect(socket.emit).toHaveBeenCalledWith('player request', current_user.data);
    });

    it("should broadcast scrubbed details to current room", function() {
      expect(io.sockets.emit).toHaveBeenCalledWith('add other player', current_user.clean());
    });
  });

  describe(".update", function() {

    beforeEach(function() {
      new_x_cord = 131;
      new_y_cord = 131;
      updated_user = {coordinate: {x: new_x_cord, y: new_y_cord, z: 1}, uniqueID: current_user.data.uniqueID};
      current_user.update(updated_user);
    });

    it("should replace old user position with new position", function() {
      expect(current_user.data.coordinate.x).toEqual(new_x_cord);
      expect(current_user.data.coordinate.x).toEqual(new_y_cord);
    });

    it("should emit new map data back to client", function() {
      //TODO: make test properly check map updates
      expect(socket.emit).toHaveBeenCalledWith('update map', []);
    });

    it("should broadcast scrubbed details to current room", function() {
      expect(io.sockets.emit).toHaveBeenCalledWith('update player position', current_user.clean());
    });
  });

  describe(".clean", function() {

    beforeEach(function() {
      cleaned_user = current_user.clean();
    });

    it("should set type", function() {
      expect(cleaned_user.type).toEqual('OtherPlayer');
    });
  });
});
