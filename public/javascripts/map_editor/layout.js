var canvas = document.getElementById("canvas");
var context = canvas.getContext("2d");
var spacing = 20;

function drawBoard(){
  var width = $("#map_width").val();
  var height = $("#map_height").val();
  canvas.width = width * spacing;
  canvas.height = height * spacing;

  clearMap();

  for (var x = 0; x <= canvas.width; x += (canvas.width / width)) {
    context.moveTo(x, 0);
    context.lineTo(x, canvas.height);
  }


  for (var y = 0; y <= canvas.height; y += (canvas.height / height)) {
    context.moveTo(0, y);
    context.lineTo(canvas.width, y);
  }

  context.strokeStyle = "black";
  context.stroke();
}

$(".sizing").change(function() {
  drawBoard();
});

function clearMap() {
  context.clearRect(0, 0, canvas.width, canvas.height);
}

drawBoard();
