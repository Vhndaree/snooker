class Canvas2D {
  constructor(canvasID){
    this.canvas = document.getElementById(canvasID);
    
    //prevent any context menu inside cavas on any clicks
    this.canvas.oncontextmenu = function() {
      return false;
    }
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

  drawText(message) {    
    this.canvasContext.fillStyle = "#000";
    this.canvasContext.fillRect(992, 24, 500, 40);
    this.canvasContext.font = "16px verdana";
    this.canvasContext.fillStyle = "#fff";
    this.canvasContext.fillText(message, 1000, 50);
  }

}

var canvas = new Canvas2D('snookerGame');