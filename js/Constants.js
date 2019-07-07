//Canvas
const CANVAS_WIDTH = 1500;
const CANVAS_HEIGHT = 748;

//Stick
const INITIAL_CUE_POSITION = new Vector(280, 370); //initial cue ball position x: 380, y:370 for testing later should be handled with mouse move initially
const CUE_BALL_ORIGIN = new Vector(20, 17.5);
const INITIAL_STICK_POSITION = new Vector(380, 370);
const STICK_ORIGIN = new Vector(980, 10); //origin should always greater than width of stick element


//Ball
const FRICTION = 0.98;
const MINIMUM_VELOCITY = 5;
const BALL_DIAMETER = 36;
const BALL_RADIUS = BALL_DIAMETER/2;

//Game Constants
const BALL_COLOR = {
  RED: 1,
  YELLOW: 2,
  GREEN: 3,
  BROWN: 4,
  BLUE: 5,
  PINK: 6,
  BLACK: 7,
  WHITE:8,
};

const INITIAL_BALLS_POSITION = [
  [new Vector(1046, 370), BALL_COLOR.RED],
  [new Vector(1077, 352.5), BALL_COLOR.RED],
  [new Vector(1077, 387.5), BALL_COLOR.RED],
  [new Vector(1108, 334.5), BALL_COLOR.RED],
  [new Vector(1108, 370), BALL_COLOR.RED],
  [new Vector(1108, 405.5), BALL_COLOR.RED],
  [new Vector(1139, 316.75), BALL_COLOR.RED],
  [new Vector(1139, 352.25), BALL_COLOR.RED],
  [new Vector(1139, 387.75), BALL_COLOR.RED],
  [new Vector(1139, 423.25), BALL_COLOR.RED],
  [new Vector(1170, 299), BALL_COLOR.RED],
  [new Vector(1170, 334.5), BALL_COLOR.RED],
  [new Vector(1170, 370), BALL_COLOR.RED],
  [new Vector(1170, 405.5), BALL_COLOR.RED],
  [new Vector(1170, 441), BALL_COLOR.RED],
  [new Vector(380, 495), BALL_COLOR.YELLOW],
  [new Vector(380, 255), BALL_COLOR.GREEN],
  [new Vector(380, 370), BALL_COLOR.BROWN],
  [new Vector(695.5, 370), BALL_COLOR.BLUE],
  [new Vector(1011, 370), BALL_COLOR.PINK],
  [new Vector(1300, 370), BALL_COLOR.BLACK],
  [INITIAL_CUE_POSITION, BALL_COLOR.WHITE],
];
const POWER = 170;
const POWER_MULTIPLIER = 1/POWER;
const STICK_ORIGIN_CHANGE = 5;
const STICK_SHOOT_ORIGIN = new Vector(950, 10);
const MAX_POWER = 7480;


//Table constants
const TABLE_BORDER = {
  topY: 85,
  rightX: 1425,
  bottomY: 673,
  leftX: 85,
};

const D_BOX_ORIGIN = new Vector(380, 365);
const D_BOX_RADIUS = 125;

//table wholes coordinates
const TABLE_POCKETS = [
  new Vector(75, 75),//top left
  new Vector(755, 65),//top middle
  new Vector(1430, 68),//top right
  new Vector(68, 675),//bottom left
  new Vector(755, 690),//bottom middle
  new Vector(1435, 685),//bottom right
];
const TABLE_POCKETS_SCORES = [
  new Vector(70, 70),//top left
  new Vector(753, 70),//top middle
  new Vector(1435, 70),//top right
  new Vector(70, 683),//bottom left
  new Vector(753, 683),//bottom middle
  new Vector(1435, 683),//bottom right
];

const POCKET_RADIUS = 45;