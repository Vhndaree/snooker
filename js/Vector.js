class Vector {
  constructor(x = 0, y = 0) {
    this.x = x;
    this.y = y;
  }

  copyPosition() {
    return new Vector(this.x, this.y);
  }

  add(vector) {
    return new Vector(this.x+vector.x, this.y+vector.y);
  }
  
  subtract(vector) {
    return new Vector(this.x-vector.x, this.y-vector.y);
  }

  addTo(vector) {
    this.x += vector.x;
    this.y += vector.y;
  }

  multiply(multiplier) {

    return new Vector(this.x * multiplier, this.y * multiplier)
  }

  dividedBy(divider) {
    
    return new Vector(this.x/divider, this.y/divider);
  }

  dotProduct(vector) {
    return this.x * vector.x + this.y * vector.y;
  }

  getLength(){
    return Math.sqrt(this.x*this.x + this.y*this.y);
  }

  distanceFrom(vector) {
    return this.subtract(vector).getLength();
  }
} 