class Stick {
  constructor(position = new Vector()) {
    this.position = position;
    this.rotationAngle = 0;
  }

  update() {
    this.updateRotation();
  }

  draw() {
    canvas.drawImage(sprites.stick1, this.position, STICK_ORIGIN, this.rotationAngle);
  }

  updateRotation() {
    var opposite = Mouse.position.y - this.position.y;
    var adjacent = Mouse.position.x - this.position.x;

    this.rotationAngle = Math.atan2(opposite, adjacent);
  }
}