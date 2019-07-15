class Game extends GameWorld {
  
  /**
   * constructor
   */
  constructor() {
    super();
  }

  /**
   * calls mainloop
   */
  start() {
    snookerGame.mainLoop();
  }

  /**
   * mainloop
   */
  mainLoop() {
    canvas.clear();

    if (snookerGame.twoPlayerMode && !snookerGame.gameStarted && !snookerGame.gameOver) {

      canvas.drawForm(); //to get Users name
    } else if (snookerGame.gameStarted && snookerGame.drawInstruction) {

      canvas.drawPlayInstruction();

      setTimeout(() => {
        snookerGame.drawInstruction = false;
        snookerGame.update();
        snookerGame.draw();
      }, 2500);
    } else if (snookerGame.gameStarted && !snookerGame.drawInstruction) {

      snookerGame.update();
      snookerGame.draw();
    } else if (snookerGame.gameOver) {

      canvas.displayEndPage();
    } else {

      canvas.drawIndex();
    }

    Mouse.reset();
    requestAnimationFrame(snookerGame.mainLoop);
  }
}