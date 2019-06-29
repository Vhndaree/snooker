class  GameWorld {
  constructor() {
    this.stick = new Stick();
  }

  update() {
    this.stick.update();
  }

  draw() {
    canvas.drawImage(sprites.snookerBoard, {x: 0, y: 0});
    this.stick.draw();
  }
}