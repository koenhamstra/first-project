/// <reference path="GameEntity.ts" />

class Character extends GameEntity {
  private xVel: number;
  private playerState : string;
  private keyboardListener: KeyboardListener;

  constructor(
    xPos: number,
    xVel: number,
    yPos: number
  ) {
    super(xPos, yPos,);
    this.xVel = xVel;
    this.keyboardListener = new KeyboardListener();
    this.playerState = "moving";
  }

  /**
   * Moves the player depending on which arrow key is pressed. Player is bound
   * to the canvas and cannot move outside of it
   */
  public move(canvas: HTMLCanvasElement) {
    // Player is automaticly moving from left to right
    console.log(this.playerState);
    if (this.playerState == "moving") {
      if (this.xPos + this.image.width >= canvas.width || this.xPos < 0) {
        this.xVel = -this.xVel;
      }
      this.xPos += this.xVel;
    }

    // Using the space bar to jump for a coin
    if (this.keyboardListener.isKeyDown(KeyboardListener.KEY_SPACE)) {
      this.playerState = "hyperjump";
      this.yPos = 50;
    }

    // If de player wants to go down to the bottom of the screen press down arrow
    if (
      this.keyboardListener.isKeyDown(KeyboardListener.KEY_DOWN) &&
      this.playerState == "hyperjump"
    ) {
      this.playerState = "moving";
      this.yPos = canvas.height - 260;
    }
  }

  /**
   * Checks whether the player is colliding with an item. Return true if it
   * does, false if it doesn't.
   *
   * @param {GameItem} item - GameItem to check collision with
   */
  public isCollidingWith(item: GameEntity) {
    if (this.keyboardListener.isKeyDown(KeyboardListener.KEY_SPACE)) {
      if (
        this.xPos < item.getXPos() + item.getImage().width &&
        this.xPos + this.image.width > item.getXPos() &&
        this.yPos < item.getYPos() + item.getImage().height &&
        this.yPos + this.image.height > item.getYPos()
      ) {
        return true;
      }
    }
    return false;
  }
}
