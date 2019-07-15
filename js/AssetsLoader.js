class AssetsLoader {

  /**
   * initialize class variables
   */
  constructor() {
    this.totalAssets = 0;
    this.loadedAssets = 0;
    this.assetsLoadingInterval = null;

    this.init();
  }

  /**
   * initialize sprites and audios
   */
  init() {
    
    canvas = new Canvas('snookerGame');
    Keyboard = new KeyboardHandler();
    Mouse = new MouseHandler();

    // before game starts assets
    sprites.homeBackground = this.loadSpriteElement('home.jpg');
    sprites.twoPlayer = this.loadSpriteElement('2player.png');
    sprites.practice = this.loadSpriteElement('practice.png');
    sprites.startGame = this.loadSpriteElement('startGame.png');
    sprites.soundOn = this.loadSpriteElement('mute_button.png');
    sprites.soundOff = this.loadSpriteElement('mute_button_pressed.png');
    sprites.back = this.loadSpriteElement('back.png');
    sprites.replay = this.loadSpriteElement('replay.png');

    //after game starts assets
    sprites.snookerBoard = this.loadSpriteElement('snooker-table2.png');
    sprites.foreground = this.loadSpriteElement('foreground.png');
    sprites.colorBall = this.loadSpriteElement('colouredBall.png');
    sprites.playerTurn = this.loadSpriteElement('playerturn.png');

    //Stick sprites load
    sprites.stick1 = this.loadSpriteElement('pool-stick1.png');
    sprites.stick2 = this.loadSpriteElement('pool-stick2.png');
    sprites.stick3 = this.loadSpriteElement('pool-stick3.png');

    //Ball sprites load
    sprites.redBall = this.loadSpriteElement('red-ball.png');
    sprites.yellowBall = this.loadSpriteElement('yellow-ball.png');
    sprites.greenBall = this.loadSpriteElement('green-ball.png');
    sprites.brownBall = this.loadSpriteElement('brown-ball.png');
    sprites.blueBall = this.loadSpriteElement('blue-ball.png');
    sprites.pinkBall = this.loadSpriteElement('pink-ball.png');
    sprites.blackBall = this.loadSpriteElement('black-ball.png');
    sprites.cueBall = this.loadSpriteElement('cue-ball.png');

    //audio assets
    audios.beforeGameMusic = this.loadAudioElements('DubstepRock.mp3');
    audios.ballsCollide = this.loadAudioElements('BallsCollide.wav');
    audios.pocketed = this.loadAudioElements('Hole.wav');
    audios.borderCollide = this.loadAudioElements('Side.wav');
    audios.strike = this.loadAudioElements('Strike.wav');
    audios.click = this.loadAudioElements('click.mp3');

    this.totalAssets = Object.keys(sprites).length + Object.keys(audios).length;
    this.assetsLoadingLoop();
  }

  /**
   * loads assets
   */
  assetsLoadingLoop() {
    this.assetsLoadingInterval = setInterval(() => {
      if (this.loadedAssets < this.totalAssets) {

        canvas.displayInitialLoadingScreen(this.loadedAssets / this.totalAssets);
        this.assetsLoadingLoop.bind(this);
      } else {

        clearInterval(this.assetsLoadingInterval);
        snookerGame = new Game();
        snookerGame.start();
      }
    });
  }

  /**
   * returns loaded sprites
   * @param {*} fileName 
   */
  loadSpriteElement(fileName) {

    let spritePath = './assets/sprites/';
    let sprite = new Image();
    sprite.src = spritePath + fileName;
    
    sprite.onload = () => this.loadedAssets++;

    return sprite;
  }

  /**
   * return loaded audio
   * @param {*} fileName 
   */
  loadAudioElements(fileName) {

    let audio = new Audio('./assets/audios/' + fileName);

    audio.addEventListener("canplay", () => {
      this.loadedAssets++;
    });

    return audio;
  }

  /**
   * stops audio
   */
  stopAudio(audio) {

    if (snookerGame.musicPlayed) {
      audio.pause();
      audio.currentTime = 0;
      snookerGame.musicPlayed = false;
    }
  }

  /**
   * returns ball by color
   * @param {*} color 
   */
  getBallSpriteByColor(color) {

    switch (color) {

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
}