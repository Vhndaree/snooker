//Canvas
const CANVAS_WIDTH = 1366;
const CANVAS_HEIGHT = 768;
const BOARD_WIDTH = CANVAS_WIDTH;
const BOARD_HEIGHT = CANVAS_WIDTH / 2;

//Stick
const INITIAL_CUE_POSITION = new Vector(280, 370); //initial cue ball position x: 380, y:370 for testing later should be handled with mouse move initially
const INITIAL_STICK_POSITION = new Vector(380, 370);
const STICK_ORIGIN = new Vector(980, 10); //origin should always greater than width of stick element


//Ball
const FRICTION = 0.985;
const MINIMUM_VELOCITY = 5;
const BALL_DIAMETER = 30;
const BALL_RADIUS = BALL_DIAMETER / 2;
const CUE_BALL_ORIGIN = new Vector(BALL_RADIUS, BALL_RADIUS);

//Game Constants
const BALL_COLOR = {
  RED: 1,
  YELLOW: 2,
  GREEN: 3,
  BROWN: 4,
  BLUE: 5,
  PINK: 6,
  BLACK: 7,
  WHITE: 8,
};

const INITIAL_BALLS_POSITION = [
  [new Vector(953, 341.5), BALL_COLOR.RED],
  [new Vector(980, 325), BALL_COLOR.RED],
  [new Vector(980, 358), BALL_COLOR.RED],
  [new Vector(1010, 310), BALL_COLOR.RED],
  [new Vector(1010, 341.5), BALL_COLOR.RED],
  [new Vector(1010, 374), BALL_COLOR.RED],
  [new Vector(1038, 294), BALL_COLOR.RED],
  [new Vector(1038, 325), BALL_COLOR.RED],
  [new Vector(1038, 358), BALL_COLOR.RED],
  [new Vector(1038, 390), BALL_COLOR.RED],
  [new Vector(1065, 278), BALL_COLOR.RED],
  [new Vector(1065, 310), BALL_COLOR.RED],
  [new Vector(1065, 341.5), BALL_COLOR.RED],
  [new Vector(1065, 374), BALL_COLOR.RED],
  [new Vector(1065, 405), BALL_COLOR.RED],
  [new Vector(349, 450), BALL_COLOR.YELLOW],
  [new Vector(349, 232), BALL_COLOR.GREEN],
  [new Vector(349, 341.5), BALL_COLOR.BROWN],
  [new Vector(685, 341.5), BALL_COLOR.BLUE],
  [new Vector(920, 341.5), BALL_COLOR.PINK],
  [new Vector(1184, 341.5), BALL_COLOR.BLACK],
  [INITIAL_CUE_POSITION, BALL_COLOR.WHITE],
];
const POWER_SHIFTER = 70;
const POWER = 200;
const POWER_MULTIPLIER = 1 / POWER;
const STICK_ORIGIN_CHANGE = 2;
const STICK_SHOOT_ORIGIN = new Vector(950, 10);
const MAX_POWER = 7000;


//Table constants
const TABLE_BORDER = {
  topY: 55,
  rightX: 1310,
  bottomY: 627,
  leftX: 60,
};

const D_BOX_ORIGIN = new Vector(349, 341.5);
const D_BOX_RADIUS = 114;

//table pockets coordinates
const TABLE_POCKETS = [
  new Vector(69, 69),//top left
  new Vector(685, 55),//top middle
  new Vector(1300, 60),//top right
  new Vector(69, 620),//bottom left
  new Vector(684, 629),//bottom middle
  new Vector(1300, 620),//bottom right
];

//score ball position pocket coordinates
const TABLE_POCKETS_SCORES = [
  new Vector(65, 60),//top left
  new Vector(685, 62),//top middle
  new Vector(1305, 58),//top right
  new Vector(62, 622),//bottom left
  new Vector(685, 622),//bottom middle
  new Vector(1305, 622),//bottom right
];

const POCKET_RADIUS = 35;