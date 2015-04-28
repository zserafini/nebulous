ObjectFactory = {

  create_object: function(type, coordinate) {
    // uniqueID, coordinate, type
    var uniqueID = Math.random().toString();

    object_data = {
      uniqueID: uniqueID,
      type: type,
      coordinate: coordinate
    };
    Map.insertObject(object_data);
    return object_data;
  },

}
