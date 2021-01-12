class FullGame {
  // Necessary canvas attributes
  private readonly canvas: HTMLCanvasElement;
  private readonly ctx: CanvasRenderingContext2D;

  // KeyboardListener so the player can move
  private keyboardListener: KeyboardListener;

  //properties for the level
  private floor: Layout[];
  private floors: number;
  private platform: Layout[];
  private platformPos: number[];

  private server: HTMLImageElement;

  //properties for the player
  private player: Player;
  private index: number;

  //properties for the enemy
  public frameIndex: number;
  private enemy: Enemy;
  private projectiles: Projectile[];

  private healthBar: HTMLImageElement;

  /**
   * Initialize the game
   *
   * @param {HTMLCanvasElement} canvas - The canvas element that the game
   * should be rendered upon
   */
  public constructor(canvas: HTMLCanvasElement) {
    document.body.style.backgroundImage = "url('src/moving/back.png')";
    document.body.style.backgroundSize = "cover";

    this.canvas = canvas;
    this.ctx = this.canvas.getContext("2d");
    this.canvas.width = window.innerWidth;
    this.canvas.height = window.innerHeight;

    this.keyboardListener = new KeyboardListener();

    //Creating the starting positions floors and platforms
    this.floor = [];
    this.floors = -40;
    this.platform = [];
    this.platformPos = [
      (this.canvas.width / 20) * 1,
      (this.canvas.width / 20) * 3,
      (this.canvas.width / 20) * 5,
      (this.canvas.width / 20) * 8,
      (this.canvas.width / 20) * 12,
      (this.canvas.width / 20) * 13,
      (this.canvas.width / 20) * 15,
    ];

    //Creating the servers
    this.server = this.loadNewImage("src/moving/pics/Server.png");

    //Player
    this.index = 0;
    this.player = new Player(canvas);

    //Creating enemy
    this.frameIndex = 0;
    this.enemy = new Enemy(canvas);
    this.projectiles = [];

    this.createPlatform();

    // Start the game cycle
    this.loop();
  }

  /**
   * Game cycle, basically loop that keeps the game running. It contains all
   * the logic needed to draw the individual frames.
   */
  private loop = () => {
    this.enemy.moveEnemy();

    for (let i = 0; i < this.projectiles.length; i++) {
      this.projectiles[i].moveProjectiles();
    }

    if (this.index > 29) {
      this.index = 0;
    }

    this.frameIndex++;
    this.player.start();
    this.player.moveRight();
    this.player.moveLeft();
    this.collidesWithProjectile(this.player);
    this.collidesWithCanvasBorder();
    this.collidesWithServer();
    this.checkHealthBar();
    this.enemy.draw();

    if (this.frameIndex % 60 === 0) {
      console.log(`X = ${this.player.getXPos()}  Y = ${this.player.getYPos()}`);
    }

    //Creates a new projectile every X amount of frames and pushes the projectile to projectiles[]
    if (this.frameIndex % 70 === 0) {
      this.projectiles.push(
        new Projectile(
          this.canvas,
          this.enemy.getEnemyXPos(),
          this.enemy.moveEnemy(),
          this.generateProjectile()
        )
      );
      for (let i = 0; i < this.projectiles.length; i++) {
        this.projectiles[i].spawn();
      }
    }

    //Makes sure every projectile in the projectile array moves from right to left
    for (let i = 0; i < this.projectiles.length; i++) {
      this.projectiles[i].move();
    }

    // Draw everything
    this.draw();

    // Make sure the game actually loops
    requestAnimationFrame(this.loop);
  };

  /**
   * Function that checks the health of the player and updates the image accordingly
   */
  public checkHealthBar = () => {
    if (this.player.getHealth() === 3) {
      this.healthBar = this.loadNewImage("src/moving/pics/Health Bar Full.png");
    } else if (this.player.getHealth() === 2) {
      this.healthBar = this.loadNewImage(
        "src/moving/pics/Health Bar Two Thirds.png"
      );
    } else if (this.player.getHealth() === 1) {
      this.healthBar = this.loadNewImage(
        "src/moving/pics/Health Bar One Third.png"
      );
    } else {
      this.player.setXPos(500);
      this.writeTextToCanvas(
        "GAME OVER",
        50,
        this.canvas.width / 2,
        this.canvas.height / 2
      );
      this.healthBar = this.loadNewImage("");
    }
  };

  /**
   * Function that randomly decides if a projectile if launched up or down
   */
  public generateProjectile = (): number => {
    let projectileDirection = this.randomNumber(1, 2);
    if (projectileDirection === 1) {
      return -3;
    } else {
      return 3;
    }
  };

  /**
   * Method that checks if a projectile collides with the border of the canvas
   */
  public collidesWithCanvasBorder = () => {
    for (let i = 0; i < this.projectiles.length; i++) {
      if (this.projectiles[i].getXPos() < -100) {
        this.projectiles.splice(i, 1); // remove an element from the array
        // console.log("removed");
      }
    }
  };

  /**
   * Method that checks if the player collides with a projectile
   */
  public collidesWithProjectile = (player: Player) => {
    for (let i = 0; i < this.projectiles.length; i++) {
      if (
        this.projectiles[i].getXPos() > player.getXPos() &&
        this.projectiles[i].getXPos() <
          player.getXPos() + player.getImage().width &&
        this.projectiles[i].getYPos() > player.getYPos() &&
        this.projectiles[i].getYPos() <
          player.getYPos() + player.getImage().height
      ) {
        // console.log("Collides with Player");
        this.projectiles.splice(i, 1);
        console.log(this.player.setHealth(1));
      }
    }
  };

  /**
   * Function that detects when the player collides with the server
   */
  public collidesWithServer = () => {
    if (
      this.canvas.width * 0.84 < this.player.getXPos() &&
      this.canvas.width * 0.84 + 100 > this.player.getXPos() &&
      0 < this.player.getYPos() &&
      this.canvas.height * 0.1 > this.player.getYPos()
    ) {
      // console.log("asdf");
      this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    }
  };

  private createPlatform() {
    //create platform 1
    for (let i = 0; i < 10; i++) {
      this.platform.push(
        new Layout(
          (this.platformPos[0] += 30),
          (this.canvas.height / 20) * 14,
          "src/moving/pics/smallBrick.png"
        )
      );
    }

    //create platform 2
    for (let i = 0; i < 8; i++) {
      this.platform.push(
        new Layout(
          (this.platformPos[1] += 30),
          (this.canvas.height / 20) * 8,
          "src/moving/pics/smallBrick.png"
        )
      );
    }

    //create platform 3
    for (let i = 0; i < 12; i++) {
      this.platform.push(
        new Layout(
          (this.platformPos[2] += 30),
          (this.canvas.height / 20) * 3,
          "src/moving/pics/smallBrick.png"
        )
      );
    }

    //create platform 4
    for (let i = 0; i < 4; i++) {
      this.platform.push(
        new Layout(
          (this.platformPos[3] += 30),
          (this.canvas.height / 20) * 14,
          "src/moving/pics/smallBrick.png"
        )
      );
    }

    //create platform 5
    for (let i = 0; i < 12; i++) {
      this.platform.push(
        new Layout(
          (this.platformPos[4] += 30),
          (this.canvas.height / 20) * 8,
          "src/moving/pics/smallBrick.png"
        )
      );
    }

    //create platform 6
    for (let i = 0; i < 8; i++) {
      this.platform.push(
        new Layout(
          (this.platformPos[6] += 30),
          (this.canvas.height / 20) * 3,
          "src/moving/pics/smallBrick.png"
        )
      );
    }

    //create platform 7
    for (let i = 0; i < 8; i++) {
      this.platform.push(
        new Layout(
          (this.platformPos[5] += 30),
          (this.canvas.height / 20) * 14,
          "src/moving/pics/smallBrick.png"
        )
      );
    }

    // Create floor
    for (let i = 0; i < 100; i++) {
      this.floor.push(
        new Layout(
          (this.floors += 40),
          (this.canvas.height * 20) / 21,
          "src/moving/pics/brick.png"
        )
      );
    }
  }

  /**
   * Draw all the necessary items to the screen
   */
  private draw() {
    //draw floor
    this.floor.forEach((element) => {
      element.draw(this.ctx);
    });

    //Draws the floor
    this.platform.forEach((element) => {
      element.draw(this.ctx);
    });

    this.ctx.drawImage(this.healthBar, 50, 50);

    //Draws the servers
    this.ctx.drawImage(
      this.server,
      (this.canvas.width / 20) * 18,
      this.canvas.height * 0.04
    );
    this.ctx.drawImage(
      this.server,
      (this.canvas.width / 20) * 17.5,
      this.canvas.height * 0.04
    );
  }

  /**
   * Writes text to the canvas
   * @param {string} text - Text to write
   * @param {number} fontSize - Font size in pixels
   * @param {number} xCoordinate - Horizontal coordinate in pixels
   * @param {number} yCoordinate - Vertical coordinate in pixels
   * @param {string} alignment - Where to align the text
   * @param {string} color - The color of the text
   */
  private writeTextToCanvas(
    text: string,
    fontSize: number = 20,
    xCoordinate: number,
    yCoordinate: number,
    alignment: CanvasTextAlign = "center",
    color: string = "white"
  ) {
    this.ctx.font = `${fontSize}px sans-serif`;
    this.ctx.fillStyle = color;
    this.ctx.textAlign = alignment;
    this.ctx.fillText(text, xCoordinate, yCoordinate);
  }

  /**
   * Method to load an image
   * @param {HTMLImageElement} source
   * @return HTMLImageElement - returns an image
   */
  public loadNewImage(source: string): HTMLImageElement {
    const img = new Image();
    img.src = source;
    return img;
  }

  /**
   * Returns a random number between min and max
   * @param {number} min - lower boundary
   * @param {number} max - upper boundary
   */
  private randomNumber(min: number, max: number): number {
    return Math.round(Math.random() * (max - min) + min);
  }
}
