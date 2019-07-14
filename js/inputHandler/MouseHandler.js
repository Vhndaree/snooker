class MouseHandler {
  constructor() {
    this.left = new ButtonState();
    this.middle = new ButtonState();
    this.right = new ButtonState();

    this.position = INITIAL_STICK_POSITION;

    document.onmousemove = this.handleMousemove;
    document.onmousedown = this.handleMouseDown;
    document.onmouseup = this.handleMouseUp;
  }

  reset() {
    Mouse.left.pressed = false;
    Mouse.middle.pressed = false;
    Mouse.right.pressed = false;
  }

  handleMousemove(event) {
    let x = event.pageX;
    let y = event.pageY;

    Mouse.position = new Vector(x, y);
  }

  handleMouseDown(event) {

    if (event.which === 1) {

      if (!Mouse.left.down) {
        Mouse.left.pressed = true;
      }
      Mouse.left.down = true;
    } else if (event.which === 2) {

      if (!Mouse.middle.down) {
        Mouse.middle.pressed = true;
      }
      Mouse.middle.down = true;
    } else if (event.which === 3) {

      if (!Mouse.right.down) {
        Mouse.right.pressed = true;
      }
      Mouse.right.down = true;
    }
  }

  handleMouseUp(event) {

    if (event.which === 1) {
      Mouse.left.down = false;
    } else if (event.which === 2) {
      Mouse.middle.down = false;
    } else if (event.which === 3) {
      Mouse.right.down = false;
    }
  }
}

let Mouse = new MouseHandler();