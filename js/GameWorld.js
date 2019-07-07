class GameWorld {
  constructor() {
    this.cueBallOnMouse = true;
    this.redBallsOnPocket = 0;
    this.balls = [];

    // for two player playable
    this.players = [new Player('Ram Bhandari'), new Player('Krishna Bhandari')];
    this.playerTurn = 0;
    this.strike = 0;

    for (var i = 0; i < INITIAL_BALLS_POSITION.length; i++) {
      this.balls[i] = new Ball(INITIAL_BALLS_POSITION[i][0].copyCoordinates(), INITIAL_BALLS_POSITION[i][1]);
    }

    this.cueBall = this.balls[this.balls.length - 1];
    this.stick = new Stick(
      INITIAL_STICK_POSITION.copyCoordinates(),
      this.cueBall.shootBall.bind(this.cueBall)
    ); //same as white cue ball as stick and cue ball always should be together
    this.table = TABLE_BORDER;
  }

  update() {

    if (!this.cueBallOnMouse) {
      this.handleCollision();
      this.regenerateNonRedBalls();
      this.stick.update();

      for (var i = 0; i < this.balls.length; i++) {
        this.balls[i].update(POWER_MULTIPLIER);//ballsAremoving function willnot work unless this function called
      }

      if (!this.ballsAreMoving() && this.stick.shoot) {
        this.stick.reposition(this.cueBall.position);
        this.updatePlayerTurn();        
      }
    }
  }

  draw() {
    playerName.innerHTML = this.players[this.playerTurn].name + '\'s turns';
    canvas.drawImage(sprites.snookerBoard, new Vector());

    for (var i = 0; i < this.balls.length - 1; i++) {
      this.balls[i].draw();
    }

    this.handleCueBall();
    this.stick.draw();
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

  regenerateNonRedBalls() {
    if (!this.ballsAreMoving() || !this.cueBall.visible) {//better to check is ball collided to other ball rather cueball visible

      if (!this.cueBall.visible) {
        this.cueBall.inPocket = false;
        this.cueBallOnMouse = true;
      }

      if (this.redBallsOnPocket < 15) {
        for (var i = 0; i < this.balls.length - 1; i++) {

          if (!this.balls[i].visible) {
            if (this.balls[i].color === 8 || this.balls[i].color === 1) continue;
            this.balls[i].inPocket = false;
            this.balls[i].visible = true;
            this.balls[i].position = this.balls[i].findPositionOnBoard(this.balls);
          }
        }
      }
    }
  }

  updatePlayerTurn() {
    var ballPocketed = [];
    var redBall = false;
    var colorBall = false;
    var bothBall = false;

    for (var i = 0; i < this.balls.length; i++) {
      for (var j = 0; j < TABLE_POCKETS.length; j++) {

        if (this.balls[i].position.distanceFrom(TABLE_POCKETS[j]) < POCKET_RADIUS && this.balls[i].include) {
          ballPocketed.push(this.balls[i]);
          if (this.balls[i].color === 1) this.balls[i].include = false;
        }
      }
    }

    for(var i = 0; i < ballPocketed.length; i++) {
      
      if (ballPocketed[i].color === 1) {
         redBall = true;
         this.players[this.playerTurn].matchScore += 1;
      }
      if (ballPocketed[i].color != 1 && ballPocketed[i].color != 8) {
         colorBall =true;
         this.players[this.playerTurn].matchScore += ballPocketed[i].color;
      }
    }

    if(redBall && colorBall) {
      this.strike++;
    } else if (redBall && isEven(this.strike)) {
      this. strike++;
    } else if(colorBall && isOdd(this.strike)) {
      this.strike++;
    } else {
      this.playerTurn = 1 - this.playerTurn;
      this.strike = 0;
    }
    console.log(this.players[this.playerTurn].matchScore, this.players[this.playerTurn].name);
  }

  ballsAreMoving() {

    for (var i = 0; i < this.balls.length; i++) {
      if (this.balls[i].isMoving) {

        return true;
      }
    }

    return false;
  }

  handleCueBall() {
    if (this.cueBallOnMouse) {
      this.cueBall.visible = true;
      this.cueBall.position = Mouse.position;
      this.stick.reposition(this.cueBall.position);

      if (this.isDBoxArea()) {//should add one more condition if place is preoccupied

        if (Mouse.left.down) {
          Mouse.reset();
          this.cueBallOnMouse = false;
        }
      } else {
        canvas.drawText("Invalid Place!! Place Cue Ball inside D-Box");
      }
    }

    this.cueBall.draw();
  }

  isDBoxArea(position) {
    if (Mouse.position.distanceFrom(D_BOX_ORIGIN) < D_BOX_RADIUS && Mouse.position.x < D_BOX_ORIGIN.x) {
      return true;
    }

    return false;
  }
}

