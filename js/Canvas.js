class Canvas2D {
  constructor(canvasID){
    this.canvas = document.getElementById(canvasID);
    this.canvasContext = this.canvas.getContext('2d');
  }

  clear() {
    this.canvasContext.clearRect(0, 0, this.canvas.clientWidth, this.canvas.height);
  }

  drawImage(image, position){
    this.canvasContext.drawImage(image, position.x, position.y);
  }
}

