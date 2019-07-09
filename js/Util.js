/**
 * apply styles in give elements
 * 
 * @param {*} element 
 * @param {*} styles 
 */
function applyStyles(element, styles) {
  let styleKeys = Object.keys(styles);

  if (styleKeys && styleKeys.length) {
    styleKeys.forEach(styleKey => {
      element.style[styleKey] = styles[styleKey];
    });
  }

}

/**
 * return random number from min to max
 * 
 * @param {*} min 
 * @param {*} max 
 */
function getRandomNumber(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

/**
 * 
 * @param {*} num 
 * @return boolean
 * checks if number is even or not
 */
function isEven(num) {
  return num % 2 == 0;
}


/**
 * 
 * @param {*} num 
 * @return boolean
 * checks if number is odd or not
 */
function isOdd(num) {
  return !isEven(num);
}

/**
 * 
 * @param {*} array 
 * 
 * returns lowest value from the array
 */
function getMin(array) {

  if(array.length == 0) return;
  let min = array[0];

  for (let i = 0 ; i < array.length ; i++) {
    if(min > array[i]) min = array[i];
  }

  return min;
}

/**
 * 
 * @param {*} array 
 * 
 * returns highest value from the array
 */
function getMax(array) {

  if(array.length == 0) return;

  let max = array[0];

  for (let i = 0 ; i < array.length ; i++) {
    
    if(max < array[i]) max = array[i];
  }

  return max;
}

/**
 * toggles full screen mode
 */
function toggleFullscreen(isFullcreen) {
  isFullscreen = !isFullscreen;

  if (isFullscreen) {
    element.requestFullscreen();
  }

  if (!isFullscreen) {
    document.exitFullscreen();
  }
}