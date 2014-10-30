var map = require("../../lib/map.js");

describe("map", function() {
  it("runs the specs", function() {
    expect(true).toBe(true);
  });
  it("can access map functions", function() {
    expect(map.radius).toBe(8);
  });
});
