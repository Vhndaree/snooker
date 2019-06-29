class Stick {
  constructor() {
    this.position = {x: 0, y: 400};
  }

  update() {
    this.position = Mouse.position;

  }

  draw() {
    canvas.drawImage(sprites.stick, this.position);
  }
}