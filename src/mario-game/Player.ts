class Player {
  private array: HTMLImageElement[];
  private leftArray: HTMLImageElement[];
  private keyboard: KeyboardListener;
  private index: number;
  private xpos: number;
  private ypos: number;
  private canvas: HTMLCanvasElement;
  private ctx: CanvasRenderingContext2D;
  private projectile: Projectile;
  private health: number;

  // private jumpIndex: number;

  constructor(canvas: HTMLCanvasElement) {
    this.canvas = canvas;
    this.xpos = this.canvas.width / 50;
    this.ypos = this.canvas.height * 0.9;
    this.ctx = this.canvas.getContext("2d");
    this.health = 3;

    // this.jumpIndex = 0 ;

    //Arrays that make sure the player is animated
    this.keyboard = new KeyboardListener();
    this.array = [
      this.loadNewImage("src/moving/PlayerRight/walk 1.png"),
      this.loadNewImage("src/moving/PlayerRight/walk 2.png"),
      this.loadNewImage("src/moving/PlayerRight/walk 3.png"),
      this.loadNewImage("src/moving/PlayerRight/walk 4.png"),
      this.loadNewImage("src/moving/PlayerRight/walk 5.png"),
      this.loadNewImage("src/moving/PlayerRight/walk 6.png"),
      this.loadNewImage("src/moving/PlayerRight/walk 7.png"),
    ];
    this.leftArray = [
      this.loadNewImage("src/moving/PlayerLeft/walk 1.png"),
      this.loadNewImage("src/moving/PlayerLeft/walk 2.png"),
      this.loadNewImage("src/moving/PlayerLeft/walk 3.png"),
      this.loadNewImage("src/moving/PlayerLeft/walk 4.png"),
      this.loadNewImage("src/moving/PlayerLeft/walk 5.png"),
      this.loadNewImage("src/moving/PlayerLeft/walk 6.png"),
      this.loadNewImage("src/moving/PlayerLeft/walk 7.png"),
    ];
    this.index = 0;
    this.ctx.drawImage(this.array[1], this.xpos, this.ypos);
  }


  /**
   * Function that moves the player to the right when the corresponding key is pressed
   */
  public moveLeft = () => {
    if (this.keyboard.isKeyDown(37) === true) {
      this.index++;
      if (this.index === 4) {
        this.drawing(this.leftArray[0]);
      }

      if (this.index === 8) {
        this.drawing(this.leftArray[1]);
      }

      if (this.index === 12) {
        this.drawing(this.leftArray[2]);
      }

      if (this.index === 16) {
        this.drawing(this.leftArray[3]);
      }

      if (this.index === 20) {
        this.drawing(this.leftArray[4]);
      }

      if (this.index === 24) {
        this.drawing(this.leftArray[5]);
      }
      if (this.index === 28) {
        this.drawing(this.leftArray[6]);
        this.index = 0;
      }

      if (this.xpos === 0) {
        this.xpos = this.canvas.width;
      }

      this.xpos = this.xpos - 4;
    }
    this.jump();
  };

  /**
   * Function that moves the player to the right when the corresponding key is pressed
   */
  public moveRight = () => {
    if (this.keyboard.isKeyDown(39) === true) {
      this.index++;
      if (this.index === 4) {
        this.drawing(this.array[0]);
      }

      if (this.index === 8) {
        this.drawing(this.array[1]);
      }

      if (this.index === 12) {
        this.drawing(this.array[2]);
      }

      if (this.index === 16) {
        this.drawing(this.array[3]);
      }

      if (this.index === 20) {
        this.drawing(this.array[4]);
      }

      if (this.index === 24) {
        this.drawing(this.array[5]);
      }
      if (this.index === 28) {
        this.drawing(this.array[6]);
        this.index = 0;
      }

      if (this.xpos === (this.canvas.width * 5) / 5) {
        this.xpos = 0;
      }

      this.xpos = this.xpos + 4;
    }
    this.jump();
  };

  /**
   * Function that checks if the spacebar is pressed
   * If SPACE is not pressed, the player will fall down
   */
  public jump = () => {
    this.walkOnPlatform();
    if (this.keyboard.isKeyDown(32) === true) {
      // console.log("pressed");
      this.ypos = this.ypos - 8;
      //this.jumpIndex = 0;
      if (this.ypos < this.canvas.height - this.canvas.height - this.ypos) {
        this.ypos = this.ypos + 8;
      }
      this.drawing(this.array[1]);
    }

    if (this.keyboard.isKeyDown(32) === false) {
      this.ypos = this.ypos + 8;
      if (this.ypos > (this.canvas.height * 20) / 21 - 105) {
        this.ypos = (this.canvas.height * 20) / 21 - 105;
      }
    }
  };

  /**
   * Detects wether or not the player is in contact with a platform
   */
  public walkOnPlatform = () => {
    //Platform 1, lower left of the canvas
    if (
      this.xpos > (this.canvas.width / 20) * 1 &&
      this.xpos < this.canvas.width / 20 + 300 &&
      this.ypos < (this.canvas.height / 20) * 12 &&
      this.ypos > (this.canvas.height / 20) * 10.95
    ) {
      // console.log("it works");
      this.ypos = (this.canvas.height / 20) * 10.94;
    }

    //Platform 2, middle left of the canvas
    if (
      this.xpos > (this.canvas.width / 20) * 3 &&
      this.xpos < (this.canvas.width / 20) * 3 + 240 &&
      this.ypos < (this.canvas.height / 20) * 6 &&
      this.ypos > (this.canvas.height / 20) * 4.95
    ) {
      // console.log("it works");
      this.ypos = (this.canvas.height / 20) * 4.94;
    }

    //Platform 3, top middle/left of the canvas
    if (
      this.xpos > (this.canvas.width / 20) * 5 &&
      this.xpos < (this.canvas.width / 20) * 5 + 360 &&
      this.ypos < (this.canvas.height / 20) * 1 &&
      this.ypos > (this.canvas.height / 20) * -0.05
    ) {
      // console.log("it works");
      this.ypos = (this.canvas.height / 20) * -0.06;
    }

    //Platform 4, bottom middle of the canvas
    if (
      this.xpos > (this.canvas.width / 20) * 8 &&
      this.xpos < (this.canvas.width / 20) * 8 + 120 &&
      this.ypos < (this.canvas.height / 20) * 12 &&
      this.ypos > (this.canvas.height / 20) * 10.95
    ) {
      // console.log("it works");
      this.ypos = (this.canvas.height / 20) * 10.94;
    }

    //Platform 5, middle/right of the canvas
    if (
      this.xpos > (this.canvas.width / 20) * 12 &&
      this.xpos < (this.canvas.width / 20) * 12 + 360 &&
      this.ypos < (this.canvas.height / 20) * 6 &&
      this.ypos > (this.canvas.height / 20) * 4.95
    ) {
      // console.log("it works");
      this.ypos = (this.canvas.height / 20) * 4.94;
    }

    //Platform 6, top right of the canvas
    if (
      this.xpos > (this.canvas.width / 20) * 15 &&
      this.xpos < (this.canvas.width / 20) * 15 + 240 &&
      this.ypos < (this.canvas.height / 20) * 1 &&
      this.ypos > (this.canvas.height / 20) * -0.05
    ) {
      // console.log("it works");
      this.ypos = (this.canvas.height / 20) * -0.06;
    }

    //Platform 7, bottom right of the canvas
    if (
      this.xpos > (this.canvas.width / 20) * 13 &&
      this.xpos < (this.canvas.width / 20) * 13 + 240 &&
      this.ypos < (this.canvas.height / 20) * 12 &&
      this.ypos > (this.canvas.height / 20) * 10.95
    ) {
      // console.log("it works");
      this.ypos = (this.canvas.height / 20) * 10.94;
    }
  };

  public start = () => {
    if (
      this.keyboard.isKeyDown(32) === false &&
      this.keyboard.isKeyDown(39) === false &&
      this.keyboard.isKeyDown(37) === false
    ) {
      this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
      this.ctx.drawImage(this.array[0], this.xpos, this.ypos);
      this.jump();
    }
  };

  private loadNewImage = (source: string): HTMLImageElement => {
    const img = new Image();
    img.src = source;
    return img;
  };

  private drawing = (image: HTMLImageElement): void => {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    this.ctx.drawImage(image, this.xpos, this.ypos);
  };

  public getXPos = () => {
    return this.xpos;
  };
  public getYPos = () => {
    return this.ypos;
  };

  public getImage = () => {
    return this.array[1];
  };

  /**
   * Function to adapt the total health
   * @param damage amount of health to be taken from the total amount of health
   */
  public setHealth = (damage: number): number => {
    this.health = this.health - damage;
    return this.health;
  };

  public getHealth = () => {
    return this.health;
  };

  public setXPos = (number: number) => {
    this.xpos =  number;
  };
}
