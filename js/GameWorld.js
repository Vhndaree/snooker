class GameWorld {
  constructor() {
    this.balls = [];

    for (var i = 0; i < INITIAL_BALLS_POSITION.length; i++) {
      this.balls[i] = new Ball(INITIAL_BALLS_POSITION[i][0], INITIAL_BALLS_POSITION[i][1]);
    }

    this.cueBall = this.balls[this.balls.length - 1];
    this.stick = new Stick(
      INITIAL_STICK_POSITION,
      this.cueBall.shootBall.bind(this.cueBall)
    ); //same as white cue ball as stick and cue ball always should be together
    this.table = TABLE_BORDER;
  }

  handleCollision() {

    for (var i = 0; i < this.balls.length; i++) {

      this.balls[i].collideWithTable(this.table); //looks if collided with border
      this.balls[i].handlePocketCollision();

      for (var j = i + 1; j < this.balls.length; j++) {
        const ball1 = this.balls[i];
        const ball2 = this.balls[j];

        ball1.collideWithBall(ball2);   
      }
    }
  }

  update() {
    this.handleCollision();
    this.stick.update();

    for (var i = 0; i < this.balls.length; i++) {
      this.balls[i].update(POWER_MULTIPLIER);
    }

    if (!this.ballsAreMoving() && this.stick.shoot) {
      this.stick.reposition(this.cueBall.position);
    }

  }

  draw() {
    canvas.drawImage(sprites.snookerBoard, new Vector());
    this.stick.draw();

    for (var i = 0; i < this.balls.length; i++) {
      this.balls[i].draw();
    }
    // console.log(Mouse.position.x, Mouse.position.y);
  }

  ballsAreMoving() {
    var ballIsMoving = false;

    for (var i = 0; i < this.balls.length; i++) {
      if (this.balls[i].isMoving) {
        ballIsMoving = true;
        break;
      }
    }

    return ballIsMoving;
  }
}

