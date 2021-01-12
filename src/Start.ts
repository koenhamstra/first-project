///<reference path="ClassLoader.ts"/>
class Start extends ClassLoader {
    // Necessary canvas attributes
    private readonly canvas: HTMLCanvasElement;
    private readonly ctx: CanvasRenderingContext2D;
    public state : string;
  
    private rectangles: Rectangles;

    public constructor(canvas:HTMLCanvasElement){
      super (canvas);
    this.canvas = canvas;
    this.ctx = this.canvas.getContext("2d");

    this.canvas.width = window.innerWidth;
    this.canvas.height = window.innerHeight;

    this.rectangles =new Rectangles(canvas.width*0.77/2 , canvas.height*1.5/2, "red", 70, 200);

    // add an mouse event
    document.addEventListener("click", this.mouseHandler);
    
    this.draw();

    }

    public draw = () => {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.rectangles.draw(this.ctx);
        this.writeTextToCanvas("Start", 35, this.rectangles.getXPos()+this.rectangles.getWidth()/2, this.rectangles.getYPos()+this.rectangles.getHeight()*1.2/2,"center");

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
    if (event.clientX > this.rectangles.getXPos() &&
              event.clientX < this.rectangles.getXPos() + this.rectangles.getWidth() &&
              event.clientY >this.rectangles.getYPos() &&
              event.clientY < this.rectangles.getYPos() + this.rectangles.getHeight()){
            this.state="start";
              }
              else {this.state ="nothing"}
              return this.state;
            }


    public done =() =>{
      if (this.state==="start") {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        document.body.style.backgroundImage = "url('src/moving/back.png')";
        document.body.style.backgroundSize = "cover";
      return true
    }
      return false
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