class MouseHandler {

  /**
   * initialize Mouse 
   */
  constructor() {
    this.left = new ButtonState();

    this.position = INITIAL_STICK_POSITION;

    document.onmousemove = this.handleMousemove;
    document.onmousedown = this.handleMouseDown;
    document.onmouseup = this.handleMouseUp;
  }

  /**
   * resets mouse events
   */
  reset() {
    Mouse.left.pressed = false;
  }


  /**
   * handle mouse move events
   * @param {*} event 
   */
  handleMousemove(event) {
    let x = event.pageX;
    let y = event.pageY;

    Mouse.position = new Vector(x, y);
  }

  /**
   * handles mouse right click down event
   * @param {*} event 
   */
  handleMouseDown(event) {

    if (event.which === 1) {

      if (!Mouse.left.down) {
        Mouse.left.pressed = true;
      }
      Mouse.left.down = true;
    }
  }

  /**
   * handles mouse right click up event
   * @param {*} event 
   */
  handleMouseUp(event) {

    if (event.which === 1) {
      Mouse.left.down = false;
    }
  }
}
