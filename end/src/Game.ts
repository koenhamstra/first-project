/// <reference path="GameEntity.ts" />

class Game {
  // Necessary canvas attributes
  private readonly canvas: HTMLCanvasElement;
  private readonly ctx: CanvasRenderingContext2D;

  // KeyboardListener so the player can move
  private keyboardListener: KeyboardListener;

  private score: number;

  //properties for the level
  private floor: Layout[];
  private floors: number;
  private platform: Layout[];
  private platformPos: number[];

  private image: HTMLImageElement;

  //properties for the player
  private player: Player;
  private index  :number ;

  //properties for the enemy
  private frameIndex: number;
  private enemy: Enemy;
  private projectiles: Projectile[];
  
  /**
   * Initialize the game
   *
   * @param {HTMLCanvasElement} canvas - The canvas element that the game
   * should be rendered upon
   */
  public constructor(canvas: HTMLCanvasElement) {
    this.canvas = canvas;
    this.ctx = this.canvas.getContext("2d");
    this.canvas.width = window.innerWidth;
    this.canvas.height = window.innerHeight;

    this.keyboardListener = new KeyboardListener();

    //creating the floors and platforms 
    this.floor = [];
    this.floors = -40;
    this.platform = [];
    this.platformPos = [100,200,350,600,800,900,1100];

    //creating the servers
    this.image = this.loadNewImage("./assets/img/Server.png");
    
    //player
    this.index=0;
    this.player= new Player(canvas,this.ctx);
   
    //creating enemy
    this.frameIndex = 0;
    this.enemy = new Enemy(canvas);
    this.projectiles = [];

    //create platform
    this.createPlatform();

    // Start the game cycle
    this.loop();
  }

  /**
   * Game cycle, basically loop that keeps the game running. It contains all
   * the logic needed to draw the individual frames.
   */
  private loop = () => {

    //player
    if (this.index > 29) {
      this.index = 0;
      }
      this.player.moveRight();
      this.player.moveLeft();
      this.player.jump()

  //enemy
    console.log(this.frameIndex);
    this.frameIndex++;
    this.enemy.draw();

    //Creates a new projectile every 150 frames and pushed the projectile to projectiles[]
    if(this.frameIndex % 150 === 0) {
        this.projectiles.push(new Projectile(this.canvas));
        for (let i = 0; i < this.projectiles.length; i++) {
            this.projectiles[i].spawn()   
        }
    }

    //Makes sure every projectile in the projectile array moves
    for (let i = 0; i < this.projectiles.length; i++) {
        this.projectiles[i].move();            
    }

    this.collidesWithCanvasBorder();
    // Clear the screen
    // this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    // Draw everything
    this.draw();

    // Show score
    // TODO: fix actual score system
    this.writeTextToCanvas(`Score: ${this.score}`, 36, 120, 50);

    // Make sure the game actually loops
    requestAnimationFrame(this.loop);
  };

   /**
     * Method that checks if a projectile collides with the border of the canvas
     */
    public collidesWithCanvasBorder = () => {
      for (let i = 0; i < this.projectiles.length; i++) {
          if (this.projectiles[i].getXPos() < -100) {
              this.projectiles.splice(i, 1); // remove an element from the array
              console.log("removed");
          }
      }
  }

  private createPlatform() {
    //create platform
    for (let i = 0; i < 10; i++) {
      this.platform.push(new Layout(this.platformPos[0] += 30, 500, "./free-assets/Terrain/smallBrick.png"));
    }

    //create platform
    for (let i = 0; i < 8; i++) {
      this.platform.push(new Layout(this.platformPos[1] += 30, 300, "./free-assets/Terrain/smallBrick.png"));
    }

     //create platform
     for (let i = 0; i < 12; i++) {
      this.platform.push(new Layout(this.platformPos[2] += 30, 100, "./free-assets/Terrain/smallBrick.png"));
    }

     //create platform
     for (let i = 0; i < 4; i++) {
      this.platform.push(new Layout(this.platformPos[3] += 30, 500, "./free-assets/Terrain/smallBrick.png"));
    }

     //create platform
     for (let i = 0; i < 12; i++) {
      this.platform.push(new Layout(this.platformPos[4] += 30, 300, "./free-assets/Terrain/smallBrick.png"));
    }

     //create platform
     for (let i = 0; i < 8; i++) {
      this.platform.push(new Layout(this.platformPos[6] += 30, 100, "./free-assets/Terrain/smallBrick.png"));
    }

     //create platform
     for (let i = 0; i < 8; i++) {
      this.platform.push(new Layout(this.platformPos[5] += 30, 500, "./free-assets/Terrain/smallBrick.png"));
    }

     // Create floor
     for (let i = 0; i < 100; i++){
      this.floor.push(
        new Layout(
          this.floors += 40, 655, "./free-assets/Terrain/brick.png"
        ) 
      ); 
    }

  }

  /**
   * Draw all the necessary items to the screen
   */
  private draw() {

    //draw floor
    this.floor.forEach(element =>{
      element.draw(this.ctx);
    });

     //draw floor
     this.platform.forEach(element =>{
      element.draw(this.ctx);
    });

    //draw the servers
    this.ctx.drawImage(this.image,1250,10);
    this.ctx.drawImage(this.image,1290,10);
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

