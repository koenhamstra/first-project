///<reference path="ClassLoader.ts"/>
class Go  extends ClassLoader{
        // Necessary canvas attributes
        private readonly canvas: HTMLCanvasElement;
        private readonly ctx: CanvasRenderingContext2D;
        
      
        private rectangles: Rectangles;
        public state : string;
    
        public constructor(canvas:HTMLCanvasElement){
        super (canvas, new Audio ("assets/levels-music/Pixel-City-Groovin.mp3"));
        this.canvas = canvas;
        this.ctx = this.canvas.getContext("2d");

        this.state="";
            
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;

        document.body.style.backgroundImage = "url('src/moving/back 1.jpg')";
        document.body.style.backgroundSize = `cover`;
    
        this.rectangles =new Rectangles(this.canvas.width*9/12 , canvas.height*1.7/2, "yellow", 70, 200);
    
        // add an mouse event
        document.addEventListener("click", this.mouseHandler);
        // this.compleet();
        this.draw();
    
        }

    
        public draw =()=> {
            this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
            this.ctx.drawImage(this.loadNewImage("assets/img/logo1.png"),this.canvas.width*0.85/2,this.canvas.height*0.2/2)
            this.rectangles.draw(this.ctx);
            this.writeTextToCanvas("GO", 35, this.rectangles.getXPos()+this.rectangles.getWidth()/2, this.rectangles.getYPos()+this.rectangles.getHeight()*1.2/2,"center","yellow");
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
        if (
            event.clientX >= this.rectangles.getXPos() &&
            event.clientX < this.rectangles.getXPos() + this.rectangles.getWidth() &&
            event.clientY >= this.rectangles.getYPos() &&
            event.clientY <= this.rectangles.getYPos() + this.rectangles.getHeight()
            ){
                this.state = "go";
                
            }
            else {
                  this.state ="no";}
        }
    
    
        public done = () =>{
            if (this.state === "go") {
                this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
                document.body.style.backgroundImage = "url('src/moving/back2.jpg')";
                document.body.style.backgroundSize = "cover";
                return true;
            } else {
                return false;
            }
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