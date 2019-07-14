class Canvas2D {
  constructor(canvasID) {

    this.canvas = document.getElementById(canvasID);

    //prevent any context menu inside cavas on any clicks
    this.canvas.oncontextmenu = function () {

      return false;
    }
    this.canvas.width = CANVAS_WIDTH;
    this.canvas.height = CANVAS_HEIGHT;
    this.canvasContext = this.canvas.getContext('2d');
  }

  clear() {

    this.canvasContext.clearRect(
      0,
      0,
      this.canvas.Width,
      this.canvas.height
    );
  }

  drawImage(image, position = new Vector(), origin = new Vector(), rotationAngle = 0, width, height) {

    this.canvasContext.save();
    this.canvasContext.translate(position.x, position.y);
    this.canvasContext.rotate(rotationAngle)
    this.canvasContext.drawImage(
      image,
      -origin.x,
      -origin.y,
      width,
      height
    );
    this.canvasContext.restore();
  }

  drawText(text, x, y, font = 'verdana', fontSize = 16, fontColor = '#fff') {

    this.canvasContext.font = fontSize + 'px ' + font;
    this.canvasContext.fillStyle = fontColor;
    this.canvasContext.fillText(text, x, y);
  }

  displayInitialLoadingScreen(loadingValueInPercentage) {

    this.drawText(
      'LOADING...',
      550,
      300,
      'verdana',
      30,
      'rgba(23, 85, 58, 0.9)'
    );
    this.canvasContext.strokeRect(
      400,
      315,
      450,
      60
    );
    this.canvasContext.fillStyle = 'rgba(23, 85, 58, 0.9)';
    this.canvasContext.fillRect(
      400,
      315,
      450 * loadingValueInPercentage,
      60
    );
    this.canvasContext.fillStyle = 'rgb(255, 255, 255)';
    this.drawText(
      Math.round(loadingValueInPercentage * 100) + '%',
      600,
      350
    );
  }

  drawIndex() {

    this.canvas.style.cursor = "context-menu";
    audios.beforeGameMusic.volume = 0.2;

    if (snookerGame.playMusic) {
      audios.beforeGameMusic.play();
    } else {
      startGame.stopAudio(audios.beforeGameMusic);
    }

    this.drawImage(
      sprites.homeBackground,
      new Vector(),
      new Vector(),
      0,
      CANVAS_WIDTH,
      CANVAS_HEIGHT
    );
    this.drawText(
      'SNOOKER 2019',
      100, 150,
      'Merriweather',
      100,
      'white'
    );
    this.drawImage(
      sprites.twoPlayer,
      new Vector(100, 250),
      new Vector(),
      0,
      392,
      109
    );
    this.drawImage(
      sprites.practice,
      new Vector(100, 450),
      new Vector(),
      0,
      392,
      109
    );

    if (snookerGame.playMusic) {
      this.drawImage(
        sprites.soundOn,
        new Vector(1250, 650),
        new Vector(),
        0,
        50,
        50
      );
    } else {
      this.drawImage(
        sprites.soundOff,
        new Vector(1250, 650),
        new Vector(),
        0,
        50,
        50
      );
    }

    if (Mouse.position.y > 250
      && Mouse.position.x > 100
      && Mouse.position.y < 359
      && Mouse.position.x < 492) {

      this.canvas.style.cursor = "pointer";

      if (Mouse.left.pressed) {

        snookerGame.twoPlayerMode = true;

        if (snookerGame.playMusic) {

          audios.click.play();
        }
        setTimeout(() => {
          startGame.stopAudio(audios.beforeGameMusic);
        }, 2000);
      }
    }

    if (Mouse.position.y > 450
      && Mouse.position.x > 100
      && Mouse.position.y < 559
      && Mouse.position.x < 492) {

      this.canvas.style.cursor = "pointer";

      if (Mouse.left.pressed) {

        if (snookerGame.playMusic) {

          startGame.stopAudio(audios.beforeGameMusic);
          audios.click.play();
        }
        snookerGame.twoPlayerMode = false;
        snookerGame.gameStarted = true;
        this.canvas.style.cursor = "url('./assets/arrow-cursor.cur'), default";
      }
    }

    if (Mouse.position.y > 650
      && Mouse.position.x > 1250
      && Mouse.position.y < 700
      && Mouse.position.x < 1300) {

      this.canvas.style.cursor = "pointer";

      if (Mouse.left.pressed) {
        snookerGame.playMusic = !snookerGame.playMusic;
      }
    }
  }

  drawForm() {

    this.drawImage(
      sprites.homeBackground,
      new Vector(),
      new Vector(),
      0,
      CANVAS_WIDTH,
      CANVAS_HEIGHT
    );
    this.drawImage(
      sprites.startGame,
      new Vector(600, 220),
      new Vector(),
      0,
      292,
      109
    );
    this.drawImage(
      sprites.back,
      new Vector(150, 650),
      new Vector(),
      0,
      150,
      75
    );

    this.drawText('SNOOKER 2019',
      100,
      150,
      'Merriweather',
      100,
      'white'
    );
    this.canvas.style.cursor = "context-menu";
    let player1Input;
    let player2Input;

    if (document.body.childElementCount === 17) {
      let form = document.createElement('div');
      form.setAttribute('id', 'formDiv');
      document.body.appendChild(form);

      let player1label = document.createElement('span');
      player1label.innerHTML = 'PLAYER 1';
      player1Input = document.createElement('input');
      player1Input.setAttribute('type', 'text');
      player1Input.setAttribute('id', 'player1');
      player1Input.setAttribute('placeholder', 'player 1 Name');

      applyStyles(player1label, {
        fontFamily: "Indie Flower",
        color: "#fff",
        fontSize: "24px",
      });

      applyStyles(player1Input, {
        fontFamily: "Indie Flower",
        color: "#fff",
        fontSize: "24px",
        background: "transparent",
        border: "none",
        width: "200px",
        borderBottom: "white 1px solid",
        marginLeft: "20px",
        paddingLeft: "10px",
        marginBottom: "50px",
      });

      let lineBreak = document.createElement("div");

      let player2label = document.createElement('span');
      player2label.innerHTML = 'PLAYER 2';
      player2Input = document.createElement('input');
      player2Input.setAttribute('type', 'text');
      player2Input.setAttribute('id', 'player2');
      player2Input.setAttribute('placeholder', 'player 2 Name');

      applyStyles(player2label, {
        fontFamily: "Indie Flower",
        color: "#fff",
        fontSize: "24px",
      });

      applyStyles(player2Input, {
        fontFamily: "Indie Flower",
        color: "#fff",
        fontSize: "24px",
        background: "transparent",
        border: "none",
        width: "200px",
        borderBottom: "white 1px solid",
        marginLeft: "20px",
        paddingLeft: "10px",
        marginBottom: "50px",
      });

      form.appendChild(player1label);
      form.appendChild(player1Input);
      form.appendChild(lineBreak);
      form.appendChild(player2label);
      form.appendChild(player2Input);

      form.style.position = 'fixed';
      form.style.top = 200 + 'px';
      form.style.left = 200 + 'px';
      form.style.zIndex = 2;
    }

    document.getElementById('formDiv').style.display = 'block';

    if (Mouse.position.y > 220
      && Mouse.position.x > 600
      && Mouse.position.y < 329
      && Mouse.position.x < 892
    ) {
      this.canvas.style.cursor = "pointer";

      if (Mouse.left.pressed) {

        if (snookerGame.playMusic) {

          audios.click.play();
        }

        let p1 = document.getElementById('player1').value;
        let player1Name = (p1) ? p1 : "PLAYER 1";
        let p2 = document.getElementById('player2').value;
        let player2Name = (p2) ? p2 : "PLAYER 2";
        snookerGame.players = [new Player(player1Name), new Player(player2Name)];
        snookerGame.gameStarted = true;
        this.canvas.style.cursor = "url('./assets/arrow-cursor.cur'), default";
        document.getElementById('formDiv').style.display = 'none';
      }
    }
    if (Mouse.position.y > 650
      && Mouse.position.x > 150
      && Mouse.position.y < 725
      && Mouse.position.x < 300
    ) {
      this.canvas.style.cursor = "pointer";

      if (Mouse.left.pressed) {

        if (snookerGame.playMusic) {
          
          audios.click.play();
        }
        document.getElementById('formDiv').style.display = 'none';
        snookerGame.twoPlayerMode = false;
      }
    }
  }

  drawPlayInstruction() {

    this.drawImage(
      sprites.homeBackground,
      new Vector(),
      new Vector(),
      0,
      CANVAS_WIDTH,
      CANVAS_HEIGHT
    );

    this.canvasContext.fillStyle = 'rgba(0, 0, 0, 0.8)';
    this.canvasContext.fillRect(
      450,
      200,
      500,
      400
    );

    this.canvasContext.font = "20px verdana";
    this.drawText(
      "Snooker 2019 Play Instructions",
      575,
      250
    );

    this.canvasContext.font = "16px verdana";
    this.drawText(
      "W -                           Increase Power",
      550,
      325
    );

    this.drawText(
      "Q -                           Decrease Power",
      550,
      375
    );

    this.drawText(
      "Mouse Right Click -     Shoot",
      550,
      425
    );

    this.drawText(
      "ESC -                         End Game",
      550,
      475
    );
  }

  drawMessage(message) {

    this.canvasContext.fillStyle = "#000";
    this.canvasContext.fillRect(
      742,
      24,
      500,
      40
    );
    this.drawText(
      message,
      750,
      50
    );
  }

  drawPlayerDetail(players, strike, turn, power) {

    this.canvasContext.fillStyle = 'rgba(0, 0, 0, 0.8)';
    this.canvasContext.fillRect(
      10,
      700,
      1346,
      60
    );
    this.canvasContext.strokeStyle = 'yellow';
    this.canvasContext.setLineDash([0]);
    this.canvasContext.lineWidth = 5;
    this.canvasContext.strokeRect(
      325,
      700,
      710,
      60
    );
    this.canvasContext.fillStyle = 'rgb(158, 44, 10)';
    this.canvasContext.fillRect(
      545,
      700,
      100,
      60
    );
    this.canvasContext.fillRect(
      725,
      700,
      100,
      60
    );

    //for Player 1
    this.canvasContext.font = "16px verdana";
    this.canvasContext.fillStyle = "#fff";
    this.drawText(
      players[0].name,
      360,
      735
    );
    this.drawText(
      (players[0].matchScore > 9) ? players[0].matchScore : '0' + players[0].matchScore,
      585,
      735
    );

    //for Player 2
    this.drawText(
      players[1].name,
      850,
      735
    );
    this.drawText(
      (players[1].matchScore > 9) ? players[1].matchScore : '0' + players[1].matchScore,
      765,
      735
    );

    //for ball to hit indication
    if (snookerGame.redBallsOnPocket < snookerGame.getNumberOfNonCueBalls().redBalls) {
      if (isOdd(strike)) {
        this.canvasContext.drawImage(
          sprites.colorBall,
          670,
          712
        );
      } else {
        this.canvasContext.drawImage(
          sprites.redBall,
          670,
          712
        );
      }
    } else {
      let showBall = sprites.blackBall;

      switch (snookerGame.getSmallestVisibleBall()) {

        case 2:
          showBall = sprites.yellowBall;
          break;
        case 3:
          showBall = sprites.greenBall;
          break;
        case 4:
          showBall = sprites.brownBall;
          break;
        case 5:
          showBall = sprites.blueBall;
          break;
        case 6:
          showBall = sprites.pinkBall;
          break;
        case 7:
          showBall = sprites.blackBall;
          break;
      }
      this.canvasContext.drawImage(
        showBall,
        670,
        712
      );
    }

    //for player turn indication
    if (!isOdd(turn)) {
      this.drawImage(
        sprites.playerTurn,
        new Vector(330, 715),
        new Vector(),
        0,
        25,
        25
      );
    } else {
      this.drawImage(
        sprites.playerTurn,
        new Vector(1029, 740),
        new Vector(),
        (Math.PI),
        25,
        25
      );
    }

    //for power indication
    this.canvasContext.strokeStyle = 'rgb(158, 44, 10)';
    canvas.canvasContext.setLineDash([0]);
    this.canvasContext.lineWidth = 2;
    this.canvasContext.fillStyle = 'rgba(238, 84, 58, 0.9)';
    let powerInPercentage = power / MAX_POWER;
    if (isEven(turn)) {
      this.canvasContext.strokeRect(
        50,
        715,
        250,
        30
      );
      this.canvasContext.fillStyle = 'rgba(238, 84, 58, 0.9)';
      this.canvasContext.fillRect(
        50,
        715,
        250 * powerInPercentage,
        30
      );
      this.canvasContext.fillStyle = 'rgb(255, 255, 255)';
      this.drawText(
        Math.round(powerInPercentage * 100) + '%',
        150,
        735
      );
    } else {
      this.canvasContext.strokeRect(
        1065,
        715,
        250,
        30
      );
      this.canvasContext.fillRect(
        1065,
        715,
        250 * powerInPercentage,
        30
      );
      this.canvasContext.fillStyle = 'rgb(255, 255, 255)';
      this.drawText(
        Math.round(powerInPercentage * 100) + '%',
        1170,
        735,
      );
    }
  }

  displayFoulMessage() {

    this.drawText(
      'Foul!',
      500,
      300,
      'verdana',
      80
    );
  }

  displayEndPage() {

    let players = snookerGame.players;
    let winner = players[0];

    if (players[0].matchScore < players[1].matchScore) {
      winner = players[1];
    } else if (players[0].matchScore == players[1].matchScore) {
      winner = 'undefined';
    }

    this.drawImage(sprites.foreground,
      new Vector(0, BOARD_HEIGHT - 100),
      new Vector(),
      0,
      CANVAS_WIDTH,
      BOARD_HEIGHT * 0.6
    );
    this.drawImage(sprites.snookerBoard,
      new Vector(),
      new Vector(),
      0,
      BOARD_WIDTH,
      BOARD_HEIGHT
    );

    if (this.twoPlayerMode) this.drawScoreBoard();

    this.canvasContext.fillStyle = 'rgba(50, 255, 92, 0.8)';
    this.canvasContext.fillRect(
      450,
      150,
      500,
      400
    );
    if (winner != 'undefined') {
      this.drawText(
        winner.name + "Won",
        500,
        250,
        "verdana",
        60,
        "black"
      );
      this.drawText(
        "Points: " + winner.matchScore,
        600,
        350,
        "verdana",
        40,
        "black"
      );
    } else {
      this.drawText(
        "DRAW",
        625,
        325,
        "verdana",
        50,
        "black"
      );
    }
    this.drawImage(
      sprites.replay,
      new Vector(500, 500),
      new Vector(),
      0,
      150,
      70
    );
    this.drawImage(
      sprites.back,
      new Vector(725, 500),
      new Vector(),
      0,
      150,
      70
    );

    if (Mouse.position.y > 500
      && Mouse.position.x > 500
      && Mouse.position.y < 570
      && Mouse.position.x < 650
    ) {
      this.canvas.style.cursor = "pointer";

      if (Mouse.left.pressed) {

        if (snookerGame.playMusic) {
          
          audios.click.play();
        }

        for (let i = 0; i < players.length; i++) {
          
          players[i].reset();
        }
        snookerGame.reset();        
        this.canvas.style.cursor = "url('./assets/arrow-cursor.cur'), default";
        startGame.stopAudio(audios.beforeGameMusic);
        snookerGame.twoPlayerMode = true;
        snookerGame.players = [players[0], players[1]];
        snookerGame.gameStarted = true;
      }
    }

    if (Mouse.position.y > 500
      && Mouse.position.x > 725
      && Mouse.position.y < 570
      && Mouse.position.x < 875
    ) {
      this.canvas.style.cursor = "pointer";

      if (Mouse.left.pressed) {

        if (snookerGame.playMusic) {
          
          audios.click.play();
        }

        snookerGame.reset();
      }
    }
  }
}

let canvas = new Canvas2D('snookerGame');