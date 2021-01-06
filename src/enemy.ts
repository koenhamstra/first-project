class Enemy {
  private canvas: HTMLCanvasElement;
  private ctx: CanvasRenderingContext2D;
  private image: HTMLImageElement;

  private xPos: number;
  private yPos: number;

  private speed: number;

  public constructor(canvas: HTMLCanvasElement) {
    this.canvas = canvas;
    this.image = this.loadNewImage("src/moving/pics/players/enemy.png");

    this.ctx = this.canvas.getContext("2d");

    this.xPos = (this.canvas.width * 5) / 6;
    this.yPos = this.canvas.height / 2;
    this.speed = 2;
  }

  public moveEnemy = (): number => {
    this.yPos = this.yPos + this.speed;

    if (this.yPos >= this.canvas.height - this.image.height - 10) {
      this.speed = -this.speed;
    }

    if (this.yPos <= 1 + this.image.height + 10) {
      this.speed = -this.speed;
    }
    return this.yPos;
  };

  /**
   * Loads an image in such a way that the screen doesn't constantly flicker
   * @param {HTMLImageElement} source
   * @return HTMLImageElement - returns an image
   */
  public loadNewImage(source: string): HTMLImageElement {
    const img = new Image();
    img.src = source;
    return img;
  }

  public draw = () => {
    this.ctx.drawImage(this.image, this.xPos, this.yPos);
  };

  public getEnemyXPos = (): number => {
    return this.xPos;
  };

  public getEnemyYPos = () => {
    return this.yPos;
  };

  public setEnemyYPos = (number: number) => {
    this.yPos + number;
  };
}
