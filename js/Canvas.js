class Canvas2D {
  constructor(canvasID){
    this.canvas = document.getElementById(canvasID);
    this.canvas.width= CANVAS_WIDTH;
    this.canvas.height = CANVAS_HEIGHT;
    this.canvas.style.cursor = "url('./assets/arrow-cursor.cur'), default";
    this.canvasContext = this.canvas.getContext('2d');
  }

  clear() {
    this.canvasContext.clearRect(0, 0, this.canvas.Width, this.canvas.height);
  }

  drawImage(image, position = new Vector(), origin = new Vector(), rotationAngle = 0){
    this.canvasContext.save();
    this.canvasContext.translate(position.x, position.y);
    this.canvasContext.rotate(rotationAngle)
    this.canvasContext.drawImage(image, -origin.x, -origin.y);
    this.canvasContext.restore();
  }
}

