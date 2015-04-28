$(document).ready(function() {
  MapRenderer.drawBoard();
});

$(".sizing").change(function() {
  Map.updateSize();
  MapRenderer.drawBoard();
});

$("#canvas").click(function() {
  coords = MapRenderer.getMapCoords(event, this);
  console.log(coords.x, coords.y);
  new_object = ObjectFactory.create_object("Water", { x: coords.x, y: coords.y });
  MapRenderer.drawObject(new_object);
});

