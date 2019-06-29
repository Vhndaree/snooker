var sprites = {};
var assetsStillLoading = 0;

function loadAssets(callback) {
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
  sprites.cueBall = loadSpriteElement('cue-ball.png');

  assetsLoadingLoop(callback);
}

function assetsLoadingLoop(callback) {

  if(assetsStillLoading) {
    //here some display tweak should be done so that user could know game is going to open
    requestAnimationFrame(assetsLoadingLoop.bind(this, callback));
  } else {
    callback();
  }

}