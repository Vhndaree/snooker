class Ball {
  constructor(position = new Vector(), color) {
    this.position = position;
    this.velocity = new Vector();
    this.isMoving = false;
    this.force = 0;
    this.sprite = getBallSpriteByColor(color);
    this.visible = true;
  }

  update(powerMultiplier) {

    if (this.visible) {
      this.position.addTo(this.velocity.multiply(powerMultiplier)); //shoot ball according to power
      this.velocity = this.velocity.multiply(FRICTION); //adds friction to the ball by 0.98 

      if (this.velocity.getLength() < MINIMUM_VELOCITY) {
        this.velocity = new Vector();
        this.isMoving = false;
      }
    }
  }

  draw() {

    if (this.visible) {      
      canvas.drawImage(this.sprite, this.position, CUE_BALL_ORIGIN);
    }
  }

  shootBall(power, rotationAngle) {
    this.velocity = new Vector(power * Math.cos(rotationAngle), power * Math.sin(rotationAngle));
    this.isMoving = true;
  }

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
      since all the ball are of same mass we shouldn't consider mass as variable so,
      v1nTag = v2n
      v2nTag = v1n
      for reference goto the link: http://www.vobarian.com/collisions/2dcollisions2.pdf
    ====================================================================================*/

    var v1nTag = v2n;
    var v2nTag = v1n;


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
  }

  collideWithTable(table) {

    if (!this.visible) {
      
      return;
    }

    if (this.isMoving) {
      var collidedWithBorder = false;

      if (this.position.y <= table.topY + BALL_RADIUS) {
        this.position.y = table.topY + BALL_RADIUS;
        this.velocity = new Vector(this.velocity.x, -this.velocity.y);
        collidedWithBorder = true;
      }

      if (this.position.x >= table.rightX - BALL_RADIUS) {
        this.position.x = table.rightX - BALL_RADIUS;
        this.velocity = new Vector(-this.velocity.x, this.velocity.y);
        collidedWithBorder = true;
      }

      if (this.position.y >= table.bottomY - BALL_RADIUS) {
        this.position.y = table.bottomY - BALL_RADIUS;
        this.velocity = new Vector(this.velocity.x, -this.velocity.y);
        collidedWithBorder = true;
      }

      if (this.position.x <= table.leftX + BALL_RADIUS) {
        this.position.x = table.leftX + BALL_RADIUS;
        this.velocity = new Vector(-this.velocity.x, this.velocity.y);
        collidedWithBorder = true;
      }

      if (collidedWithBorder) this.velocity.multiply(FRICTION);
    }
  }

  handlePocketCollision() {

    var inPocket ;

    for (var i = 0; i < TABLE_POCKETS.length; i++){
      
      if(this.position.distanceFrom(TABLE_POCKETS[i]) < POCKET_RADIUS) {
        inPocket = true;
      }
    }

    if (inPocket) {
      this.visible = false;
      this.isMoving = false;
    }
  }
}