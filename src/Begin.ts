///<reference path="ClassLoader.ts"/>

class Begin extends ClassLoader {
    // Necessary canvas attributes
    private readonly canvas: HTMLCanvasElement;
    private readonly ctx: CanvasRenderingContext2D;
    
  
    private rectangles: Rectangles[];
    
    private characters: Character[];
  
    public stage: string;
    
    constructor(canvas: HTMLCanvasElement) {
      super(canvas);
    this.canvas = canvas;
    this.ctx = this.canvas.getContext("2d");

    this.canvas.width = window.innerWidth;
    this.canvas.height = window.innerHeight;
    
    this.rectangles = [
       new Rectangles(canvas.width*0.77/2 , canvas.height*1.5/2, "red", 70, 300),
    ];
  
    this.characters = [
      new Character1(canvas.width*0.85/2, 350)
    ]; 

    // add an mouse event
    document.addEventListener("click", this.mouseHandler);

    this.draw();
    
  }
  
  
    /**
    * Function to draw all the cars on the canvas
    */
    public draw =() => {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);  
    for(let i = 0; i<this.rectangles.length; i++){
      this.rectangles[i].draw(this.ctx);
    }
  
    this.writeTextToCanvas("Instructions:", 40, this.canvas.width / 2, 50,"center");
    this.writeTextToCanvas("Try to reach the computer and solve the mini-game.", 25, this.canvas.width / 2, 100,"center");
    this.writeTextToCanvas("Watch out for enemies!!", 25, this.canvas.width / 2, 150,"center");
    this.writeTextToCanvas("Pick your character", 25,this.rectangles[0].getXPos()+this.rectangles[0].getWidth()/2, this.rectangles[0].getYPos()+this.rectangles[0].getHeight()*1.2/2,"center");
    

    if (this.stage === "showCharacters"){
      for(let i = 0; i< this.characters.length; i++)
      this.characters[i].draw(this.ctx);
    }
    }


    public done =()=>{
      if (this.stage ==="characterChosen"){
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        document.body.style.backgroundImage = "url('assets/img/hacker-background.jpg')";
        document.body.style.backgroundSize = "cover";
        return true;
      }
      else {
      return false;
    }
    }
    
  
    /**
       * Method to handle the mouse event
       * @param {MouseEvent} event - mouse event
       */
      private mouseHandler = (event: MouseEvent) => {
  
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
              this.stage = "showCharacters";

            }

            for(let i = 0; i< this.characters.length; i++) {
                if (
                    event.clientX >= this.characters[i].getXPos() &&
                    event.clientX < this.characters[i].getXPos() + this.characters[i].getWidth() &&
                    event.clientY >= this.characters[i].getYPos() &&
                    event.clientY <= this.characters[i].getYPos() + this.characters[i].getHeight()
                ) {
                    this.stage = "characterChosen";
                }
                
              }
        }
        return this.stage;

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