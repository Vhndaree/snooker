class GameWorld {
  constructor() {
    this.gameStarted = false;
    this.gameOver = false;
    this.twoPlayerMode = false;
    this.playMusic = true;
    this.drawInstruction = true;
    this.cueBallOnMouse = true;
    this.redBallsOnPocket = 0;
    this.balls = [];
    this.firstHitBall = null;
    this.foul = false;
    this.pocketedBalls;
    this.ballGenerateByFoul = false;

    // for two player playable
    this.players = [];
    this.playerTurn = 0;
    this.strike = 0; //to determine turn of ball color or red

    for (let i = 0; i < INITIAL_BALLS_POSITION.length; i++) {

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

    if (Keyboard.keyStates[27].down) {

      this.reset();
    }

    if (!this.cueBallOnMouse) {

      this.handleCollision();

      for (let i = 0; i < this.balls.length; i++) {

        this.balls[i].update(POWER_MULTIPLIER);
      }

      if (!this.ballsAreMoving()
        && this.stick.shoot) {



        if (this.getNonCueVisibleBalls() == 0) {
          this.gameStarted = false;
          this.gameOver = true;
        }

        this.stick.reposition(this.cueBall.position);
        this.pocketedBalls = this.getPocketedBalls();

        if (this.twoPlayerMode) {

          this.updatePlayerTurn(this.firstHitBall);
        }
        this.firstHitBall = null;
      }
    }

    this.regenerateNonRedBalls(this.pocketedBalls);
    this.stick.update();
  }

  draw() {

    canvas.drawImage(sprites.foreground,
      new Vector(0, BOARD_HEIGHT - 100),
      new Vector(),
      0,
      CANVAS_WIDTH,
      BOARD_HEIGHT * 0.6
    );
    canvas.drawImage(sprites.snookerBoard,
      new Vector(),
      new Vector(),
      0,
      BOARD_WIDTH,
      BOARD_HEIGHT
    );

    if (this.twoPlayerMode) this.drawScoreBoard(); //this method should handle practice mood point too

    if (this.foul && this.twoPlayerMode) {
      canvas.displayFoulMessage();

      setTimeout(() => {
        this.foul = false;
      }, 1500);
    }

    for (let i = 0; i < this.balls.length - 1; i++) {

      if (!this.balls[i].visible) continue;
      this.balls[i].draw();
    }

    this.handleCueBall();
    this.stick.draw();
  }

  reset() {

    this.gameStarted = false;
    this.twoPlayerMode = false;
    this.playMusic = true;
    this.cueBallOnMouse = true;
    this.redBallsOnPocket = 0;
    this.balls = [];
    this.firstHitBall = null;
    this.foul = false;

    // for two player playable
    this.players = [];
    this.playerTurn = 0;
    this.strike = 0; //to determine turn of ball color or red

    for (let i = 0; i < INITIAL_BALLS_POSITION.length; i++) {

      this.balls[i] = new Ball(INITIAL_BALLS_POSITION[i][0].copyCoordinates(), INITIAL_BALLS_POSITION[i][1]);
    }

    this.cueBall = this.balls[this.balls.length - 1];
    this.stick = new Stick(
      INITIAL_STICK_POSITION.copyCoordinates(),
      this.cueBall.shootBall.bind(this.cueBall)
    ); //same as white cue ball as stick and cue ball always should be together
    this.table = TABLE_BORDER;

    snookerGame = new Game();
    snookerGame.start();
  }

  handleCollision() {

    for (let i = 0; i < this.balls.length; i++) {

      this.balls[i].collideWithTable(this.table); //looks if collided with border
      this.balls[i].handlePocketCollision();

      for (let j = i + 1; j < this.balls.length; j++) {

        const ball1 = this.balls[i];
        const ball2 = this.balls[j];

        ball1.collideWithBall(ball2);
      }
    }
  }

  regenerateNonRedBalls(pocketedBalls = []) {

    if (pocketedBalls.length < 0) return;

    if (!this.ballsAreMoving()) {

      if (!this.cueBall.visible) {

        this.cueBall.inPocket = false;
        this.cueBallOnMouse = true;
      }

      if (this.redBallsOnPocket < this.getNumberOfNonCueBalls().redBalls) {

        this.regenerateBalls(this.balls);
      }
    }
  }

  updatePlayerTurn(firstHitBall) {

    let redBall = false;
    let colorBall = false;

    if (this.isFoul(firstHitBall, this.pocketedBalls)) {

      this.foul = true;
      this.playerTurn = 1 - this.playerTurn;
      this.strike = 0;

      return;
    }

    for (let i = 0; i < this.pocketedBalls.length; i++) {

      if (this.pocketedBalls[i].color === BALL_COLOR.RED) {

        redBall = true;
        this.players[this.playerTurn].matchScore += 1;
      }

      if (this.pocketedBalls[i].color != BALL_COLOR.RED && this.pocketedBalls[i].color != BALL_COLOR.WHITE) {

        colorBall = true;
        this.players[this.playerTurn].matchScore += this.pocketedBalls[i].color;
      }
    }

    if (this.redBallsOnPocket < this.getNumberOfNonCueBalls().redBalls) {

      if (redBall && isEven(this.strike)) this.strike++;
      else if (colorBall && isOdd(this.strike)) this.strike++;
      else {
        this.playerTurn = 1 - this.playerTurn;
        this.strike = 0;
      }
      return;
    }

    if (this.redBallsOnPocket == this.getNumberOfNonCueBalls().redBalls) {

      if (colorBall) this.strike++;
      else {
        this.playerTurn = 1 - this.playerTurn;
        this.strike = 0;
      }

      return;
    }
  }

  getPocketedBalls() {

    let ballPocketed = [];

    for (let i = 0; i < this.balls.length; i++) {

      for (let j = 0; j < TABLE_POCKETS.length; j++) {

        if (this.balls[i].position.distanceFrom(TABLE_POCKETS[j]) < POCKET_RADIUS
          && this.balls[i].include) {

          ballPocketed.push(this.balls[i]);

          if (!this.balls[i].visible) this.balls[i].include = false;
        }
      }
    }

    return ballPocketed;
  }

  isFoul(firstHitBall, pocketedBalls) {

    this.foul = false;
    let penalty;

    //cue ball fails to touch any ball
    if (firstHitBall == null
      || firstHitBall == 'undefined') {

      penalty = 4;

      if (this.redBallsOnPocket == this.getNumberOfNonCueBalls().redBalls) {

        penalty = (this.getSmallestVisibleBall > penalty) ? this.getSmallestVisibleBall : penalty;
      }

      this.players[1 - this.playerTurn].calculateFoulScore(penalty); //add opponents score

      return true;
    }

    if (this.redBallsOnPocket == this.getNumberOfNonCueBalls().redBalls) { //for all red ball ends state of game

      //touches not smallest ball first
      if (firstHitBall.color > this.getSmallestVisibleBall()) {

        if (pocketedBalls.length > 0) this.regenerateBalls(pocketedBalls);

        penalty = (firstHitBall.color > 4) ? firstHitBall.color : 4;
        this.players[1 - this.playerTurn].calculateFoulScore(penalty); //add opponents score

        return true;
      }

      //pockets cueball
      if (this.isCueBallpocketed(pocketedBalls)) {

        penalty = 4;

        if (this.getSmallestVisibleBall() > penalty) {
          penalty = this.getSmallestVisibleBall();
        }
        this.players[1 - this.playerTurn].calculateFoulScore(penalty); //add opponents score

        return true;
      }

      //if pockets invalid ball
      if (pocketedBalls.length > 0
        && this.getlargestPocketedBall(pocketedBalls) > this.getSmallestVisibleBall()) {

        penalty = (this.getlargestPocketedBall(pocketedBalls) > 4) ? this.getlargestPocketedBall(pocketedBalls) : 4;
        this.players[1 - this.playerTurn].calculateFoulScore(penalty); //add opponents score

        this.regenerateBalls(pocketedBalls);

        return true;
      }
    }

    if (this.redBallsOnPocket < this.getNumberOfNonCueBalls().redBalls) {

      //cueball in pocket
      if (this.isCueBallpocketed(pocketedBalls)) {

        penalty = 4;

        if (firstHitBall.color > penalty) {
          penalty = firstHitBall.color;
        }
        this.players[1 - this.playerTurn].calculateFoulScore(penalty); //add opponents score

        return true;
      }

      if (pocketedBalls.length == 1 && pocketedBalls[0] != firstHitBall && isOdd(snookerGame.strike)) {

        penalty = 4;

        if (firstHitBall.color > penalty) {
          penalty = firstHitBall.color;
        }
        this.players[1 - this.playerTurn].calculateFoulScore(penalty); //add opponents score

        return true;
      }

      // touch redball first in color balls turn
      if (firstHitBall.color === BALL_COLOR.RED
        && isOdd(this.strike)) {
        this.players[1 - this.playerTurn].calculateFoulScore(); //add opponents score

        return true;
      }

      //touch color ball in red balls turn
      if (firstHitBall.color != BALL_COLOR.RED
        && isEven(this.strike)) {

        penalty = 4;

        if (firstHitBall.color > 4) {

          penalty = firstHitBall.color;
        }
        this.players[1 - this.playerTurn].calculateFoulScore(penalty); //add opponents score

        return true;
      }

      //if pocket multiple balls in color balls turns
      if (pocketedBalls.length > 1
        && isOdd(this.strike)) {

        penalty = 4;

        if (this.getlargestPocketedBall(pocketedBalls > 4)) {

          penalty = this.getlargestPocketedBall(pocketedBalls);
        }
        this.players[1 - this.playerTurn].calculateFoulScore(penalty); //add opponents score

        return true;
      }

      //if pocket red and color ball in red balls turn
      if (pocketedBalls.length > 0
        && isEven(this.strike)
        && this.getlargestPocketedBall(pocketedBalls) > BALL_COLOR.RED) {

        penalty = 4;

        penalty = (this.getlargestPocketedBall(pocketedBalls) > 4) ? this.getlargestPocketedBall(pocketedBalls) : penalty;
        this.players[1 - this.playerTurn].calculateFoulScore(penalty); //add opponents score

        return true;
      }
    }    
  }

  regenerateBalls(balls) {

    for (let i = 0; i < balls.length; i++) {

      if (!balls[i].visible) {

        if (balls[i].color === BALL_COLOR.WHITE) {

          this.include = true;
          continue;
        }

        if(balls[i].color ==BALL_COLOR.WHITE) continue;

        balls[i].inPocket = false;
        balls[i].pocketSound = true;
        balls[i].visible = true;
        balls[i].include = true;
        balls[i].position = balls[i].findNewPositionOnBoard(this.balls);
      }
    }
  }

  isCueBallpocketed(pocketedBalls) {

    for (let i = 0; i < pocketedBalls.length; i++) {

      if (pocketedBalls[i].color === BALL_COLOR.WHITE) return true;
    }

    return false;
  }

  ballsAreMoving() {

    for (let i = 0; i < this.balls.length; i++) {

      if (!this.balls[i].visible) continue;

      if (this.balls[i].isMoving) {

        return true;
      }
    }

    return false;
  }

  handleCueBall() {

    if (this.cueBallOnMouse) {

      this.cueBall.visible = true;
      this.cueBall.include = true;
      this.cueBall.position = Mouse.position;
      this.stick.reposition(this.cueBall.position);

      if (this.isDBoxArea()) {//should add one more condition if place is preoccupied

        if (Mouse.left.down) {

          Mouse.reset();
          this.cueBallOnMouse = false;
        }
      } else {

        canvas.drawMessage("Invalid Place!! Place Cue Ball inside D-Box");
      }
    }

    this.cueBall.draw();
  }

  isDBoxArea() {

    if (Mouse.position.distanceFrom(D_BOX_ORIGIN.copyCoordinates()) < D_BOX_RADIUS
      && Mouse.position.x < D_BOX_ORIGIN.x) {

      return true;
    }

    return false;
  }

  getNumberOfNonCueBalls() {

    let redCount = 0;
    let colorCount = 0;

    for (let i = 0; i < INITIAL_BALLS_POSITION.length; i++) {

      if (INITIAL_BALLS_POSITION[i][1] === BALL_COLOR.RED) redCount++; //gives number of redballs

      if (INITIAL_BALLS_POSITION[i][1] !== BALL_COLOR.RED
        && INITIAL_BALLS_POSITION[i][1] !== BALL_COLOR.WHITE) {
        colorCount++;//gives number of color balls
      }
    }

    return {
      redBalls: redCount,
      colorBalls: colorCount,
    };
  }

  getNonCueVisibleBalls() {

    let count = 0;

    for (let i = 0; i < this.balls.length; i++) {

      if (this.balls[i].visible
        && this.balls[i].color != BALL_COLOR.WHITE) {

        count++;
      }
    }

    return count;
  }

  getSmallestVisibleBall() {

    let ballColor = [];

    for (let i = 0; i < this.balls.length; i++) {

      if (this.balls[i].visible) {
        ballColor.push(this.balls[i].color);
      }
    }

    return getMin(ballColor);
  }

  getlargestPocketedBall(pocketedBalls) {

    let ballColor = [];

    for (let i = 0; i < pocketedBalls.length; i++) {
      ballColor.push(pocketedBalls[i].color);
    }

    return getMax(ballColor);
  }

  drawScoreBoard() {

    canvas.drawPlayerDetail(this.players, this.strike, this.playerTurn, this.stick.power);
  }
}

