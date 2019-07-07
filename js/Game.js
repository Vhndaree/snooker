class Game extends GameWorld{
  constructor() {
    super();
  }

  start() {
    snookerGame.mainLoop();
  }

  mainLoop() {
    canvas.clear();
    snookerGame.update();
    snookerGame.draw();
    Mouse.reset();

    requestAnimationFrame(snookerGame.mainLoop);
  }
}

// var snookerGame = new Game();