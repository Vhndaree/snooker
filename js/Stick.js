class Stick {
  constructor(position = new Vector(), onShoot) {
    this.position = position;
    this.rotationAngle = 0;
    this.origin = STICK_ORIGIN.copyCoordinates();
    this.power = 0;
    this.onShoot = onShoot;
    this.shoot = false;
    this.visible = true;
  }

  update() {
    this.updateRotation();

    if(!this.shoot)
    
      if(Keyboard.keyStates[87].down) {
        this.increasePower();
      } 
      
      if(Keyboard.keyStates[81].down) {
        this.decreasePower();
      }

      if(this.power > 0 && Mouse.left.down) {
        this.shootBall();
      }
  }

  draw() {
    if(!snookerGame.ballsAreMoving() && this.visible && !snookerGame.cueBallOnMouse) {
      canvas.drawImage(sprites.stick1, this.position, this.origin, this.rotationAngle, 938, 22);
      canvas.canvasContext.beginPath();
      canvas.canvasContext.setLineDash([20]);
      canvas.canvasContext.moveTo(this.position.x, this.position.y);
      canvas.canvasContext.lineTo(Mouse.position.x, Mouse.position.y);
      canvas.canvasContext.stroke();
      canvas.canvasContext.lineWidth = 3;
    }
  }

  updateRotation() {
    var opposite = Mouse.position.y - this.position.y;
    var adjacent = Mouse.position.x - this.position.x;

    this.rotationAngle = Math.atan2(opposite, adjacent);
  }

  shootBall() {
    this.onShoot(this.power, this.rotationAngle);
    this.power = 0;
    this.origin = STICK_SHOOT_ORIGIN.copyCoordinates();
    this.shoot = true;
  }

  increasePower(){

    if(this.power < MAX_POWER) {
      this.power += POWER;
      this.origin.x += STICK_ORIGIN_CHANGE;
    }
  }

  decreasePower(){

    if(this.power > 0) {
      this.power -= POWER;

      if(this.power < 0) this.power = 0;
      this.origin.x -= STICK_ORIGIN_CHANGE;
    }
  }

  reposition(position) {
    this.position = position.copyCoordinates();
    this.origin = STICK_ORIGIN.copyCoordinates();
    this.shoot =false;
  }
}