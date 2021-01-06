class Game {
    // Necessary canvas attributes
    private readonly canvas: HTMLCanvasElement;
    private readonly ctx: CanvasRenderingContext2D;
    
  
    private rectangles: Rectangles[];
    
    private characters: Character[];
  
    private stage: string;
    
    constructor(canvas: HTMLCanvasElement) {
    this.canvas = canvas;
    this.ctx = this.canvas.getContext("2d");
    
    this.canvas.width = window.innerWidth;
    this.canvas.height = window.innerHeight;
    
    this.rectangles = [
       new Rectangles(575 , 250, "red", 70, 400),
       new Rectangles(670 , 540, "red", 100, 200),
    ]
  
    this.characters = [
      new Character1(530, 350),
      new Character2(730, 350),
      new Character3(930, 350)
    ]  
  
  
    // add an mouse event
    document.addEventListener("click", this.mouseHandler);
    
    
    this.loop();
    }
    
  
    
    /**
    * Method for the Game Loop
    * Based on the game state some actions have to be executed
    */
    private loop = () => {
    this.draw();
    requestAnimationFrame(this.loop);
    };
  
    
    /**
    * Function to draw all the cars on the canvas
    */
    private draw() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    
    
  
    for(let i = 0; i<this.rectangles.length; i++){
      this.rectangles[i].draw(this.ctx);
    }
    
  
  
    this.writeTextToCanvas("Instructions:", 40, this.canvas.width / 2, 50);
    this.writeTextToCanvas("Try to reach the computer and solve the mini-game.", 25, this.canvas.width / 2, 100);
    this.writeTextToCanvas("Watch out for enemies!!", 25, this.canvas.width / 2, 150);
  
    this.writeTextToCanvas("Pick your character", 25, this.canvas.width / 2, 290);
  
    this.writeTextToCanvas("Start", 35, this.canvas.width / 2, 600);
    
    if (this.stage == "showCharacters"){
      for(let i = 0; i< this.characters.length; i++)
      this.characters[i].draw(this.ctx);
    }

    if (this.stage == "characterChosen"){
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.writeTextToCanvas("You have chosen your character!", 40, this.canvas.width / 2, this.canvas.height / 2);
      }

    }
    
  
    /**
       * Method to handle the mouse event
       * @param {MouseEvent} event - mouse event
       */
      private mouseHandler = (event: MouseEvent) => {
        console.log(`xPos ${event.clientX}, yPos ${event.clientY}`);
  
        // Bounding box collision detection
        //Check every image for a "collision" with the mouseclick
        //If yes, execute the if statement
        //If no, do nothing

        
        for(let i = 0; i< this.rectangles.length; i++) {
            if (
                event.clientX >= this.rectangles[0].getXPos() &&
                event.clientX < this.rectangles[0].getXPos() + this.rectangles[0].getWidth() &&
                event.clientY >= this.rectangles[0].getYPos() &&
                event.clientY <= this.rectangles[0].getYPos() + this.rectangles[0].getHeight()
            ) {
              console.log("daasd")
              this.stage = "showCharacters";

            // } else if (event.clientX >= this.rectangles[1].getXPos() &&
            // event.clientX < this.rectangles[1].getXPos() + this.rectangles[1].getWidth() &&
            // event.clientY >= this.rectangles[1].getYPos() &&
            // event.clientY <= this.rectangles[1].getYPos() + this.rectangles[1].getHeight() )
            // {
            }

            for(let i = 0; i< this.characters.length; i++) {
                if (
                    event.clientX >= this.characters[i].getXPos() &&
                    event.clientX < this.characters[i].getXPos() + this.characters[i].getWidth() &&
                    event.clientY >= this.characters[i].getYPos() &&
                    event.clientY <= this.characters[i].getYPos() + this.characters[i].getHeight()
                ) {
                    console.log("dsadsa");
                    this.stage = "characterChosen"
                }
              }
        };
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
    public writeTextToCanvas(
    text: string,
    fontSize: number = 20,
    xCoordinate: number,
    yCoordinate: number,
    alignment: CanvasTextAlign = "center",
    color: string = "red"
    ) {
    this.ctx.font = `${fontSize}px Minecraft`;
    this.ctx.fillStyle = color;
    this.ctx.textAlign = alignment;
    this.ctx.fillText(text, xCoordinate, yCoordinate);
    }
  
    }