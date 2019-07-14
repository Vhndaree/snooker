class Player{
  constructor(name, matchScore = 0, totalScore = 0) {
    this.name = name;
    this.matchScore = matchScore;
  }

  calculateValidScore(validPoints) {
    this.matchScore += validPoints;
  }

  calculateFoulScore(foulPoint = 4) {//to use this function we should pass oponent reference to penalise foul point
    this.matchScore += foulPoint;
  }

  reset() {
    this.matchScore = 0;
  }

}