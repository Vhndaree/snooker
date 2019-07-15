class KeyboardHandler {

  /**
   * initialize keyboard buttons 
   */
  constructor() {
    this.keyStates = [];

    for (let i = 0; i < 256; ++i) {
      this.keyStates.push(new ButtonState());
    }

    document.onkeydown = this.handleKeyDown;
    document.onkeyup = this.handleKeyUp;
  }

  /**
   * handle key down event
   * @param {*} event 
   */
  handleKeyDown(event) {
    let code = event.keyCode;

    if (code < 0 || code > 255) return;
    
    if (!Keyboard.keyStates[code].down) {
      Keyboard.keyStates[code].pressed = true;
    }
    Keyboard.keyStates[code].down = true;
  }

  /**
   * handle keyup event
   * @param {*} evt 
   */
  handleKeyUp(evt) {
    let code = evt.keyCode;

    if (code < 0 || code > 255) return;

    Keyboard.keyStates[code].down = false;
  }

  /**
   * resets keyboard events
   */
  reset() {
    
    for (let i = 0; i < 256; ++i)
      this.keyStates[i].pressed = false;
  }

  /**
   * return keystate on press
   * @param {*} key 
   */
  pressed(key) {
    return this.keyStates[key].pressed;
  }

  /**
   * returns keystate on key down
   * @param {*} key 
   */
  down(key) {
    return this.keyStates[key].down;
  }
}
