//Canvas
const CANVAS_WIDTH = 1500;
const CANVAS_HEIGHT = 748;

//Stick
const INITIAL_CUE_POSITION = new Vector(380, 380); //initial cue ball position x: 380, y:380
const INITIAL_STICK_POSITION = new Vector(380, 380)
const STICK_ORIGIN = new Vector(980, 10); //origin should always greater than width of stick element


//Ball
const BALL_ORIGIN = new Vector(20, 20);
const FRICTION = 0.98;
const MINIMUM_VELOCITY = 5;

//Game Constants
const POWER = 100;
const POWER_MULTIPLIER = 1/POWER;
const STICK_ORIGIN_CHANGE = 5;
const STICK_SHOOT_ORIGIN = new Vector(950, 10);
