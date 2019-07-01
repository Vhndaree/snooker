class  GameWorld {
  constructor() {
    this.cueBall = new Ball(INITIAL_CUE_POSITION);
    this.stick = new Stick(
      INITIAL_STICK_POSITION,
      this.cueBall.shootBall.bind(this.cueBall)
    ); //same as white cue ball as stick and cue ball always should be together
  }

  update() {
    this.stick.update();
    this.cueBall.update(POWER_MULTIPLIER);

    if(!this.ballsAreMoving() && this.stick.shoot) {
      this.stick.reposition(this.cueBall.position);
      this.stick.shoot = false;
    }
    
  }

  draw() {
    canvas.drawImage(sprites.snookerBoard, new Vector());
    this.stick.draw();
    this.cueBall.draw();
  }

  ballsAreMoving() {
    return this.cueBall.isMoving;
  }
}