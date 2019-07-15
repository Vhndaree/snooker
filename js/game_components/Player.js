class Player{

  /**
   * 
   * @param {*} name 
   * @param {*} matchScore 
   * @param {*} totalScore 
   */
  constructor(name, matchScore = 0, totalScore = 0) {
    this.name = name;
    this.matchScore = matchScore;
  }

  /**
   * 
   * @param {*} validPoints 
   */
  calculateValidScore(validPoints) {
    this.matchScore += validPoints;
  }

  /**
   * 
   * @param {*} foulPoint 
   */
  calculateFoulScore(foulPoint = 4) {//to use this function we should pass oponent reference to penalise foul point
    this.matchScore += foulPoint;
  }

  /**
   * reset
   */
  reset() {
    this.matchScore = 0;
  }

}