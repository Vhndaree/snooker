class Ball {
  constructor(position = new Vector()) {
    this.position = position;
  }

  update() {
    //testing
    this.position = Mouse.position;
  }

  draw() {
    canvas.drawImage(sprites.cueBall, this.position, BALL_ORIGIN)
  }
}