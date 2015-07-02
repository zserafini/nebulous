$(document).ready(function() {
  MapRenderer.drawBoard();
});

$(".sizing").change(function() {
  Map.updateSize();
  MapRenderer.drawBoard();
});
