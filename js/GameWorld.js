class  GameWorld {
  constructor() {
    this.cueBall = new Ball(INITIAL_CUE_AND_STICK_POSITION);
    this.stick = new Stick(INITIAL_CUE_AND_STICK_POSITION); //same as white cue ball as stick and cue ball always should be together
  }

  update() {
    this.stick.update();
    this.cueBall.update();
  }

  draw() {
    canvas.drawImage(sprites.snookerBoard, new Vector());
    this.stick.draw();
    this.cueBall.draw();
  }
}