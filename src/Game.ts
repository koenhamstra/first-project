class Game {

    // The canvas
    private canvas: HTMLCanvasElement;

    private ctx : CanvasRenderingContext2D;

    //images 
    private phoneImage : HTMLImageElement;

    private whatsAppImage: HTMLImageElement;

    private messageImage : HTMLImageElement;

    //positions 
    private xPos : number;
    private yPos : number;

    private xPos_whatsapp : number;
    private yPos_whatsapp : number;

    private xPos_answer1 : number;
    private xPos_answer2 : number;
    private yPos_answer : number;

    private frameIndex :number ;
    private index : number;


    public constructor(canvas: HTMLElement) {
        this.canvas = <HTMLCanvasElement>canvas;

        // Mouse event
        document.addEventListener("click", this.mouseHandler);

        //  the canvas 
        this.canvas.width = window.innerWidth ;
        this.canvas.height = window.innerHeight;

        //X and Y positions for the phone picture 
        this.xPos=this.canvas.width*0.7/2;
        this.yPos=this.canvas.height*0.3/2;

        this.phoneImage = this.loadNewImage("assets/img/phone.png");

        //X and Y positions for the whatsapp picture 
        this.xPos_whatsapp = this.canvas.width*0.74/2 ;
        this.yPos_whatsapp = this.canvas.width*0.63/2 ;
        
        this.whatsAppImage = this.loadNewImage("assets/img/whatsapp.png");

        // X and Y positions for the answers 1/2
        this.xPos_answer1 = this.canvas.width*8/20;
        this.xPos_answer2 = this.canvas.width*14/20;
        this.yPos_answer = this.canvas.height*17/20;

        // the Canvas rendering context 2D
        this.ctx = this.canvas.getContext('2d');
        //Whatsapp message image  
        this.messageImage = this.loadNewImage("assets/img/whatsapp-message.png")

        this.frameIndex=0;
        this.index=0;

        document.body.style.backgroundColor = "#CCFFE5";
        // Start the animation
        console.log('start animation');
        requestAnimationFrame(this.step);


    }

    /**
     * This MUST be an arrow method in order to keep the `this` variable
     * working correctly. It will be overwritten by another object otherwise
     * caused by javascript scoping behaviour.
     */
    step = () => {
        this.frameIndex++;
        this.index++;
        console.log(this.index);
        
        if (this.frameIndex >= 300){
          this.ctx.clearRect(0,0,this.canvas.width,this.canvas.height);
          if (this.index>=300){
            this.index=0;
          }

          //Warning screen 
        if (this.index === 3) {
          this.ctx.clearRect(0,0,this.canvas.width,this.canvas.height);
          document.body.style.backgroundColor="blue"
          console.log("hi")
          this.writeTextToCanvas("WARNING",45,this.xPos,this.yPos,"center","yellow");
        }
        if (this.index === 6) {
          this.ctx.clearRect(0,0,this.canvas.width,this.canvas.height);
          document.body.style.backgroundColor="red"
          this.writeTextToCanvas("WARNING",45,this.xPos,this.yPos,"center","yellow");
          this.index=0
          console.log("hohi")
        }
      }

        // Call this method again on the next animation frame
        // The user must hit F5 to reload the game
        requestAnimationFrame(this.step);
        this.draw();
        document.addEventListener("click", this.mouseHandler);
    

    }

    private mouseHandler  = (event : MouseEvent) => {
        if (this.whatsApp_Pic(event)) {
          this.ctx.clearRect(0,0,this.canvas.width,this.canvas.height);
          this.ctx.drawImage(this.messageImage,this.xPos_whatsapp,this.yPos_whatsapp);
          this.writeTextToCanvas("Accept" , 35 , this.xPos_answer1,this.yPos_answer,"center","black");
          this.writeTextToCanvas("Reject" , 35 , this.xPos_answer2,this.yPos_answer,"center","black");
        }
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
   * to draw the phone image and other images like whatsapp and the messages 
   */
  private draw = () :void => {
    
      if (this.frameIndex===10){
        this.ctx.clearRect(0,0,this.canvas.width,this.canvas.height);
        this.ctx.drawImage(this.phoneImage,this.xPos , this.yPos);
      }
      if (this.frameIndex===150) {
        this.ctx.clearRect(0,0,this.canvas.width,this.canvas.height);
        this.ctx.drawImage(this.whatsAppImage,this.xPos_whatsapp,this.yPos_whatsapp);
      }
  }


  private whatsApp_Pic  = (event : MouseEvent) => {
  return  event.clientX >= this.xPos_whatsapp &&event.clientX < this.xPos_whatsapp  + this.whatsAppImage.width && event.clientY >= this.yPos_whatsapp &&event.clientY <= this.yPos_whatsapp + this.whatsAppImage.height;
  }
}
