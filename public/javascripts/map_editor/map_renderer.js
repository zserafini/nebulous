MapRenderer = {

  canvas: document.getElementById("canvas"),

  context: canvas.getContext("2d"),

  spacing: 20,
  
  drawBoard: function() {
    canvas.width = Map.width * this.spacing;
    canvas.height = Map.height * this.spacing;
  
    for (var x = 0; x <= canvas.width; x += (canvas.width / Map.width)) {
      this.context.moveTo(x, 0);
      this.context.lineTo(x, canvas.height);
    }
  
    for (var y = 0; y <= canvas.height; y += (canvas.height / Map.height)) {
      this.context.moveTo(0, y);
      this.context.lineTo(canvas.width, y);
    }
  
    this.context.strokeStyle = "black";
    this.context.stroke();
  },
  
  getMapCoords: function(event, element) {
    var totalOffsetX = 0;
    var totalOffsetY = 0;
    var canvasX = 0;
    var canvasY = 0;
  
    do{
      totalOffsetX += element.offsetLeft - element.scrollLeft;
      totalOffsetY += element.offsetTop - element.scrollTop;
    }
    while(element = element.offsetParent)
  
    canvasX = event.pageX - totalOffsetX;
    canvasY = event.pageY - totalOffsetY;
  
   var x = Math.floor(canvasX / this.spacing);
   var y = Math.floor(canvasY / this.spacing);
  
    return {x:x, y:y}
  },
  
  drawObject: function(object) {
    if(object.type == "Water") {
      this.context.beginPath();
      this.context.fillStyle="blue";
      this.context.rect(object.coordinate.x*this.spacing, object.coordinate.y*this.spacing, this.spacing, this.spacing);
      this.context.fill();
    }
  },

}
