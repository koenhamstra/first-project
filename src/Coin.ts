/// <reference path="GameEntity.ts" />

class Coin extends GameEntity {
  private score: number;

  constructor(xPos: number, yPos: number) {
    super(xPos, yPos);
    this.score = 3;
  }

  getScore(): number {
    return this.score;
  }
}
