class Stick {
  constructor(position = new Vector(), onShoot) {
    this.position = position;
    this.rotationAngle = 0;
    this.origin = STICK_ORIGIN.copyCoordinates();
    this.power = 0;
    this.onShoot = onShoot;
    this.shoot = false;
    this.visible = true;
    this.sprites = [sprites.stick1, sprites.stick2, sprites.stick3];
    this.sprite = this.sprites[0];
  }

  update() {
    this.updateRotation();

    if (!this.shoot) {


      if (Keyboard.keyStates[87].down && !snookerGame.cueBallOnMouse) {
        this.increasePower();
      }

      if (Keyboard.keyStates[81].down && !snookerGame.cueBallOnMouses) {
        this.decreasePower();
      }

      if (this.power > 0 && Mouse.left.down) {
        this.sprite = this.sprites[getRandomNumber(0, 2)];
        this.shootBall();
      }
    }
  }

  draw() {

    if (!snookerGame.ballsAreMoving()
      && this.visible
      && !snookerGame.cueBallOnMouse) {

      canvas.drawImage(
        this.sprite, 
        this.position, 
        this.origin, 
        this.rotationAngle, 
        938, 
        22
      );
      canvas.canvasContext.beginPath();
      canvas.canvasContext.lineWidth = 3;
      canvas.canvasContext.strokeStyle = 'black';
      canvas.canvasContext.setLineDash([20]);
      canvas.canvasContext.moveTo(this.position.x, this.position.y);
      canvas.canvasContext.lineTo(Mouse.position.x, Mouse.position.y);
      canvas.canvasContext.stroke();
    }
  }

  updateRotation() {

    let opposite = Mouse.position.y - this.position.y;
    let adjacent = Mouse.position.x - this.position.x;

    this.rotationAngle = Math.atan2(opposite, adjacent);
  }

  shootBall() {

    this.onShoot(this.power, this.rotationAngle);
    this.power = 0;
    this.origin = STICK_SHOOT_ORIGIN.copyCoordinates();
    this.shoot = true;
  }

  increasePower() {

    if (this.power < MAX_POWER) {
      this.power += POWER_SHIFTER;
      this.origin.x += STICK_ORIGIN_CHANGE;
    }
  }

  decreasePower() {

    if (this.power > 0) {

      this.power -= POWER_SHIFTER;

      if (this.power < 0) this.power = 0;
      this.origin.x -= STICK_ORIGIN_CHANGE;
    }
  }

  reposition(position) {

    this.position = position.copyCoordinates();
    this.origin = STICK_ORIGIN.copyCoordinates();
    this.shoot = false;
  }
}