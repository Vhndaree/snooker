class Ball {
  constructor(position = new Vector()) {
    this.position = position;
    this.velocity = new Vector();
    this.isMoving = false;
  }

  update(powerMultiplier) {
    this.isMoving = true;
    this.position.addTo(this.velocity.multiplyTo(powerMultiplier)); //shoot ball according to power
    this.velocity = this.velocity.multiplyTo(FRICTION); //adds friction to the ball by 0.98
    // console.log(this.velocity.getLength());

    if(this.velocity.getLength() < MINIMUM_VELOCITY) {
      this.velocity = new Vector();
      this.isMoving = false;
      
    }
  }

  draw() {
    canvas.drawImage(sprites.cueBall, this.position, BALL_ORIGIN)
  }

  shootBall(power, rotationAngle){
    this.velocity = new Vector(power * Math.cos(rotationAngle), power * Math.sin(rotationAngle));
    this.isMoving = true;
  }
}