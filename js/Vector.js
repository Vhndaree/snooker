class Vector {
  constructor(x = 0, y = 0) {
    this.x = x;
    this.y = y;
  }

  copyPosition() {
    return new Vector(this.x, this.y);
  }

  addTo(vector) {
    this.x += vector.x;
    this.y += vector.y;
  }

  multiplyTo(multiplier) {

    return new Vector(this.x * multiplier, this.y * multiplier)
  }

  getLength(){
    return Math.sqrt(this.x*this.x + this.y*this.y)
  }
} 