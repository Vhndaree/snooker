class Ball {

  /**
   * 
   * @param {*} position 
   * @param {*} color 
   */
  constructor(position = new Vector(), color) {
    this.position = position;
    this.velocity = new Vector();
    this.isMoving = false;
    this.force = 0;
    this.color = color;
    this.sprite = startGame.getBallSpriteByColor(color);
    this.visible = true;
    this.inPocket = false;
    this.countPoint = true;
    this.include = true; //used for include this ball in ball pocketed count
    this.pocketSound = true;
  }

  /**
   * Updates ball object
   * 
   * @param {*} powerMultiplier 
   */
  update(powerMultiplier) {

    if (this.visible) {

      this.position.addTo(this.velocity.multiply(powerMultiplier)); //shoot ball according to power
      this.velocity = this.velocity.multiply(FRICTION); //adds friction to the ball by 0.98 
      this.force *= FRICTION; //force is calculated to set sound frequency

      if (this.velocity.getLength() < MINIMUM_VELOCITY) {

        this.velocity = new Vector();
        this.isMoving = false;
      }
    }
  }

  /**
   * draws ball object
   */
  draw() {

    if (this.visible) {
      canvas.drawImage(
        this.sprite,
        this.position.copyCoordinates(),
        CUE_BALL_ORIGIN.copyCoordinates(),
        0,
        BALL_DIAMETER,
        BALL_DIAMETER
      );
    }
  }

  /**
   * shoots ball according to power and direction
   * 
   * @param {*} power 
   * @param {*} rotationAngle 
   */
  shootBall(power, rotationAngle) {

    this.velocity = new Vector(power * Math.cos(rotationAngle), power * Math.sin(rotationAngle));
    this.isMoving = true;
    this.force = power;
  }

  /**
   * Ball to ball collision detection
   * @param {*} ball 
   */
  collideWithBall(ball) {

    if (!this.visible || !ball.visible) {

      return;
    }

    //Elastic collision for 2D
    //step 1: finding unit normal vector
    const normalVector = this.position.subtract(ball.position);
    const distance = normalVector.getLength();

    if (distance >= BALL_DIAMETER) {

      return; //case of no collision
    }

    //to assign cueball as firsthitball if it fails to hit any ball
    if (snookerGame.firstHitBall === null
      || snookerGame.firstHitBall === 'udefined') {

      snookerGame.firstHitBall = this;
    }


    let ballCollide = audios.ballsCollide.cloneNode(false);
    
    if(snookerGame.playMusic) {
      ballCollide.volume = ball.force / MAX_POWER;
      ballCollide.play();
    }

    //finding minimum translation distance for avoiding initial overlap ball placing
    const mtd = normalVector.multiply((BALL_DIAMETER - distance) / distance);
    this.position = this.position.add(mtd.dividedBy(2));
    ball.position = ball.position.subtract(mtd.dividedBy(2));

    const unitNormalVector = normalVector.dividedBy(distance);

    //step 2: finding unit tangent vector
    const unitTangentVector = new Vector(-unitNormalVector.y, unitNormalVector.x);

    //step 4: resolving the velocities into normal and tangential components
    const v1n = unitNormalVector.dotProduct(this.velocity);
    const v1t = unitTangentVector.dotProduct(this.velocity);
    const v2n = unitNormalVector.dotProduct(ball.velocity);
    const v2t = unitTangentVector.dotProduct(ball.velocity);

    //step 4: finding new normal velocities
    /*===================================================================================
      since all the ball are of same mass we shouldn't consider mass as letiable so,
      v1nTag = v2n
      v2nTag = v1n
      for reference goto the link: http://www.vobarian.com/collisions/2dcollisions2.pdf
    ====================================================================================*/

    let v1nTag = v2n;
    let v2nTag = v1n;


    //step 5; convert the scalar normal and tangential velocities into vectors

    v1nTag = unitNormalVector.multiply(v1nTag);
    const v1tTag = unitTangentVector.multiply(v1t);
    v2nTag = unitNormalVector.multiply(v2nTag);
    const v2tTag = unitTangentVector.multiply(v2t);

    //step 6: update velocities
    this.velocity = v1nTag.add(v1tTag);
    ball.velocity = v2nTag.add(v2tTag);

    this.isMoving = true;
    ball.isMoving = true;
    this.force = ball.force;

    if(snookerGame.playMusic) {
      ballCollide.volume = ball.force / MAX_POWER;
      ballCollide.play();
    }

  }

  /**
   * ball to table border collision detection
   * @param {*} table 
   */
  collideWithTable(table) {

    if (!this.visible) return;

    if (this.isMoving) {

      let collidedWithBorder = false;

      if (this.position.y <= table.topY + BALL_DIAMETER) {

        this.position.y = table.topY + BALL_DIAMETER;
        this.velocity = new Vector(this.velocity.x, -this.velocity.y);
        collidedWithBorder = true;
      }

      if (this.position.x >= table.rightX - BALL_DIAMETER) {

        this.position.x = table.rightX - BALL_DIAMETER;
        this.velocity = new Vector(-this.velocity.x, this.velocity.y);
        collidedWithBorder = true;
      }

      if (this.position.y >= table.bottomY - BALL_DIAMETER) {

        this.position.y = table.bottomY - BALL_DIAMETER;
        this.velocity = new Vector(this.velocity.x, -this.velocity.y);
        collidedWithBorder = true;
      }

      if (this.position.x <= table.leftX + BALL_DIAMETER) {

        this.position.x = table.leftX + BALL_DIAMETER;
        this.velocity = new Vector(-this.velocity.x, this.velocity.y);
        collidedWithBorder = true;
      }

      if (collidedWithBorder) {

        let borderCollide = audios.borderCollide.cloneNode(false);
        
        if(snookerGame.playMusic) {
          borderCollide.volume = this.force / MAX_POWER;
          borderCollide.play();
        }

        this.velocity.multiply(FRICTION);
      }
    }
  }

  /**
   * Ball to pocket collision 
   */
  handlePocketCollision() {

    for (let i = 0; i < TABLE_POCKETS.length; i++) {

      if (!this.visible) return;

      if (this.position.distanceFrom(TABLE_POCKETS[i]) < POCKET_RADIUS) {

        this.inPocket = true;
        this.position = TABLE_POCKETS_SCORES[i].copyCoordinates();
      }
    }

    if (this.inPocket) {

      this.velocity = new Vector();
      this.hideBall();

      if (this.pocketSound && snookerGame.playMusic) {

        audios.pocketed.play();

        if (this.color !== BALL_COLOR.WHITE) this.pocketSound = false;
      }
      this.isMoving = false;

      if (this.color === 1
        && this.countPoint) {

        snookerGame.redBallsOnPocket++;
        this.countPoint = false;
      }
    }
  }

  /**
   * find and return new position for ball to be regenerated
   * @param {*} balls 
   * @param {*} newPosition 
   */
  findNewPositionOnBoard(balls, newPosition = INITIAL_BALLS_POSITION[balls.indexOf(this)][0].copyCoordinates()) {
    
    for (let i = 0; i < balls.length; i++) {

      if (this === balls[i]) continue; //escaping comparing same ball

      if (newPosition.distanceFrom(balls[i]) < BALL_RADIUS) {

        this.findNewPositionOnBoard(balls, new Vector(INITIAL_BALLS_POSITION[balls.indexOf(this) - 1][0].copyCoordinates())); //recursively switches place if preoccupied
        break;
      }
    }
    
    return newPosition.copyCoordinates();
  }

  /**
   * hide ball if pocketed and case is valid
   */
  hideBall() {

    if (this.color === BALL_COLOR.WHITE) {
      
      snookerGame.stick.visible = false;
    }
    setTimeout(() => {
      if (this.color === BALL_COLOR.WHITE) {
        snookerGame.stick.visible = true;
      }
      this.visible = false;
    }, 1000);
  }
}