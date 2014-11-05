var map = require("../../lib/map.js");
var valid_map_object = jasmine.objectContaining({type: jasmine.any(String), uniqueID: jasmine.any(String), coordinate: jasmine.objectContaining({ x: jasmine.any(Number), y: jasmine.any(Number)})});

describe("Initializing the map", function() {

  beforeEach(function() {
    map.initialize();
  });

  it("populates the map layout with objects", function() {
    expect(map.layout[0][0][0]).toEqual(valid_map_object);
    expect(map.layout[0][199][0]).toEqual(valid_map_object);
    expect(map.layout[199][0][0]).toEqual(valid_map_object);
    expect(map.layout[199][199][0]).toEqual(valid_map_object);
    expect(map.layout[100][100][0]).toEqual(valid_map_object);
  });
});
