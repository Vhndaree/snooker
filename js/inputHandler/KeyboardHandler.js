class KeyboardHandler {
  constructor() {
    this.keyStates = [];

    for (var i = 0; i < 256; ++i) {
      this.keyStates.push(new ButtonState());
    }

    document.onkeydown = this.handleKeyDown;
    document.onkeyup = this.handleKeyUp;
  }

  handleKeyDown(event) {
    var code = event.keyCode;

    if (code < 0 || code > 255) return;
    // console.log(code);
    if (!Keyboard.keyStates[code].down) {
      Keyboard.keyStates[code].pressed = true;
    }
    Keyboard.keyStates[code].down = true;
  }

  handleKeyUp(evt) {
    var code = evt.keyCode;

    if (code < 0 || code > 255) return;

    Keyboard.keyStates[code].down = false;
  }

  reset() {
    for (var i = 0; i < 256; ++i)
      this.keyStates[i].pressed = false;
  }

  pressed(key) {
    return this.keyStates[key].pressed;
  }

  down(key) {
    return this.keyStates[key].down;
  }
}

var Keyboard = new KeyboardHandler();