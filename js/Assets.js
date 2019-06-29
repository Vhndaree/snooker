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
  // sprites.stick = loadSpriteElement('pool-stick2.png');
  sprites.stick = loadSpriteElement('pool-stick3.png');
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