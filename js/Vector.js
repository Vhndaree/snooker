class Vector {

  /**
   * 
   * @param {*} x 
   * @param {*} y 
   */
  constructor(x = 0, y = 0) {
    
    this.x = x;
    this.y = y;
  }

  /**
   * returns copy of coordinate
   */
  copyCoordinates() {

    return new Vector(this.x, this.y);
  }

  /**
   * adds coordinates
   * @param {} vector 
   */
  add(vector) {

    return new Vector(this.x+vector.x, this.y+vector.y);
  }
  
  /**
   * subtract coordinates
   * @param {*} vector 
   */
  subtract(vector) {

    return new Vector(this.x-vector.x, this.y-vector.y);
  }

  /**
   * 
   * @param {*} vector 
   */
  addTo(vector) {

    this.x += vector.x;
    this.y += vector.y;
  }

  /**
   * 
   * @param {*} multiplier 
   */
  multiply(multiplier) {

    return new Vector(this.x * multiplier, this.y * multiplier)
  }

  /**
   * 
   * @param {*} divider 
   */
  dividedBy(divider) {
    
    return new Vector(this.x/divider, this.y/divider);
  }

  /**
   * 
   * @param {*} vector 
   */
  dotProduct(vector) {

    return this.x * vector.x + this.y * vector.y;
  }

  /**
   * get length
   */
  getLength(){

    return Math.sqrt(this.x*this.x + this.y*this.y);
  }

  /**
   * returns distance
   * @param {} vector 
   */
  distanceFrom(vector) {

    return this.subtract(vector).getLength();
  }

  /**
   * 
   * @param {*} vector 
   */
  equals(vector) {

    return this.x === vector.x && this.y === vector.y;
  }
} 