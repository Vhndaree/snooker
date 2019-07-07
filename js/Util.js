/**
 * apply styles in give elements
 * 
 * @param {*} element 
 * @param {*} styles 
 */
function applyStyles(element, styles) {
  var styleKeys = Object.keys(styles);

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