var sprites = {};
var assetsStillLoading = 0;

function assetsLoadingLoop() {

  if(assetsStillLoading) {
    //here some display tweak should be done so that user could know game is going to open
    requestAnimationFrame(assetsLoadingLoop.bind(this));
  } else {
    snookerGame = new Game();
    snookerGame.start();
  }

}

function loadAssets() {
  function loadSpriteElement(fileName) {
    assetsStillLoading++;

    var spritePath = './assets/sprites/';
    var sprite = new Image();
    sprite.src = spritePath + fileName;

    sprite.onload = function() {
      assetsStillLoading--;
    }

    return sprite;
  }

  sprites.snookerBoard = loadSpriteElement('snooker-table2.png');

  //Stick sprites load
  sprites.stick1 = loadSpriteElement('pool-stick1.png');
  sprites.stick2 = loadSpriteElement('pool-stick2.png');
  sprites.stick3 = loadSpriteElement('pool-stick3.png');

  //Ball sprites load
  sprites.redBall = loadSpriteElement('red-ball.png');
  sprites.yellowBall = loadSpriteElement('yellow-ball.png');
  sprites.greenBall = loadSpriteElement('green-ball.png');
  sprites.brownBall = loadSpriteElement('brown-ball.png');
  sprites.blueBall = loadSpriteElement('blue-ball.png');
  sprites.pinkBall = loadSpriteElement('pink-ball.png');
  sprites.blackBall = loadSpriteElement('black-ball.png');
  sprites.cueBall = loadSpriteElement('cue-ball.png');

  assetsLoadingLoop();
}

function getBallSpriteByColor(color) {
  
  switch(color) {
    case BALL_COLOR.RED:
      return sprites.redBall;
    case BALL_COLOR.YELLOW:
      return sprites.yellowBall;
    case BALL_COLOR.GREEN:
      return sprites.greenBall;
    case BALL_COLOR.BROWN:
      return sprites.brownBall;
    case BALL_COLOR.BLUE:
      return sprites.blueBall;
    case BALL_COLOR.PINK:
      return sprites.pinkBall;
    case BALL_COLOR.BLACK:
      return sprites.blackBall;
    case BALL_COLOR.WHITE:
      return sprites.cueBall; 
  }
}