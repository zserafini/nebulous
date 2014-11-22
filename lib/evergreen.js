var MapObject = require('./map_object.js');
MapObject.mixin(Evergreen);

function Evergreen(coordinates){
  this.data = { type: 'Evergreen', closed: true };
  this.add(coordinates);
}

Evergreen.prototype.clean = function() {
  return _.extend({}, this.data, {});
};

module.exports = Evergreen;
