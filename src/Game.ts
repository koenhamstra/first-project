class Game {

  // The canvas
  private canvas: HTMLCanvasElement;
  private ctx: CanvasRenderingContext2D;
  private rectangle: Rectangles[];


  //images 
  private phoneImage: HTMLImageElement;
  private whatsAppImage: HTMLImageElement;
  private messageImage: HTMLImageElement;
  private emailImage: HTMLImageElement;
  private emailMessage: HTMLImageElement;
  private warning: boolean;
  private verification: HTMLImageElement;
  private itteration: number;

  //positions 
  private xPos: number;
  private yPos: number;

  private xPos_whatsapp: number;
  private yPos_whatsapp: number;

  private xPos_answer1: number;
  private xPos_answer2: number;
  private yPos_answer: number;

  private frameIndex: number;
  private index: number;


  public constructor(canvas: HTMLElement) {
    this.canvas = <HTMLCanvasElement>canvas;

    // Mouse event
    document.addEventListener("click", this.mouseHandler);

    //  the canvas 
    this.canvas.width = window.innerWidth;
    this.canvas.height = window.innerHeight;

    //X and Y positions for the phone picture 
    this.xPos = this.canvas.width * 0.7 / 2;
    this.yPos = this.canvas.height * 0.3 / 2;

    this.phoneImage = this.loadNewImage("assets/img/phone.png");
    this.verification = this.loadNewImage("assets/img/verification.png")

    //X and Y positions for the whatsapp picture 
    this.xPos_whatsapp = this.canvas.width * 0.5 / 2;
    this.yPos_whatsapp = this.canvas.height * 0.5 / 2;

    this.whatsAppImage = this.loadNewImage("assets/img/whatsapp.png");

    this.emailMessage = this.loadNewImage("assets/img/email-message.jpg");
    this.emailImage = this.loadNewImage("assets/img/email.png");

    // X and Y positions for the answers 1/2
    this.xPos_answer1 = this.canvas.width * 8 / 20;
    this.xPos_answer2 = this.canvas.width * 14 / 20;
    this.yPos_answer = this.canvas.height * 17 / 20;

    // create rectangles
    this.rectangle = [new Rectangles(this.xPos_answer1, this.yPos_answer, "white", 70, 150,),
    new Rectangles(this.xPos_answer2, this.yPos_answer, "white", 70, 150),
    new Rectangles(this.canvas.width / 2, this.canvas.height / 2, "white", 100, 500)]

    //warningscreen
    this.warning = false;

    // click itteration
    this.itteration = 0;

    // the Canvas rendering context 2D
    this.ctx = this.canvas.getContext('2d');
    //Whatsapp message image  
    this.messageImage = this.loadNewImage("assets/img/whatsapp-message.png")

    this.frameIndex = 0;
    this.index = 0;

    document.body.style.backgroundColor = "#CCFFE5";
    // Start the animation
    console.log('start animation');

    this.loop();

  }

  /**
   * This MUST be an arrow method in order to keep the `this` variable
   * working correctly. It will be overwritten by another object otherwise
   * caused by javascript scoping behaviour.
   */
  loop = () => {
    this.frameIndex++;
    // console.log(this.index);
    this.index++;
    // Call this method again on the next animation frame
    // The user must hit F5 to reload the game
    requestAnimationFrame(this.loop);

    this.drawWhatsApp();
    document.addEventListener("click", this.mouseHandler);

    if (this.warning === true) {
      this.warningScreen();
    }

  }

  private mouseHandler = (event: MouseEvent) => {
    if (this.whatsApp_Pic(event)) {
      this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
      this.ctx.drawImage(this.messageImage, this.xPos_whatsapp, this.yPos_whatsapp);
      this.writeTextToCanvas("Accept", 35, this.rectangle[0].getXPos() + this.rectangle[0].getWidth() / 2, this.rectangle[0].getYPos() + this.rectangle[0].getHeight() / 2, "center", "black");
      this.writeTextToCanvas("Reject", 35, this.rectangle[1].getXPos() + this.rectangle[1].getWidth() / 2, this.rectangle[1].getYPos() + this.rectangle[1].getHeight() / 2, "center", "black");
      this.rectangle[0].draw(this.ctx);
      this.rectangle[1].draw(this.ctx);
      if (this.itteration === 0) {
        this.writeTextToCanvas("Can you trust this message?", 35, this.canvas.width * 0.75, this.canvas.height * 0.25, "center", "black")
      }
      if (this.itteration === 1) {
        this.writeTextToCanvas("Can you trust this message?", 35, this.canvas.width * 0.75, this.canvas.height * 0.25, "center", "black")
      }
      if (this.itteration === 2) {
        this.writeTextToCanvas("Can you trust this message?", 35, this.canvas.width * 0.75, this.canvas.height * 0.25, "center", "black")
      }
    }


    if (this.warningClick(event)) {
      this.frameIndex = 0;
      document.body.style.backgroundColor = "#CCFFE5";
      this.warning = false;
      this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
      this.drawWhatsApp();
    }


    if (this.WhatsAppAccept(event)) {
      this.itteration++;
      this.index = 0;
      this.warning = true;
      this.whatsAppImage = this.emailImage;
      this.messageImage = this.emailMessage;
      if (this.itteration >= 2) {
        this.whatsAppImage = this.loadNewImage("assets/img/whatsapp.png");
        this.messageImage = this.verification;
        this.drawWhatsApp();
      }
    }


    if (this.WhatsAppReject(event)) {
      this.itteration++;
      this.frameIndex = 0;
      if (this.itteration >= 2) {
        this.whatsAppImage = this.loadNewImage("assets/img/whatsapp.png");
        this.messageImage = this.verification;
        this.drawWhatsApp();
      } else {
        this.whatsAppImage = this.emailImage;
        this.messageImage = this.emailMessage;
        this.drawWhatsApp();
      }
    }

    console.log(this.itteration)
  }


  private warningScreen = () => {
      this.rectangle[2].draw(this.ctx);
      if (this.index % 3 === 0) {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        document.body.style.backgroundColor = "blue";
        console.log("hi");
        this.writeTextToCanvas("WARNING", 60, this.xPos, this.yPos, "center", "yellow");
        this.writeTextToCanvas("CLICK HERE TO STOP", 30, this.rectangle[2].getXPos() + (this.rectangle[2].getWidth() / 2), this.rectangle[2].getYPos() + (this.rectangle[2].getHeight() / 2), "center", "yellow");
      }
      if (this.index % 6 === 0) {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        document.body.style.backgroundColor = "red";
        this.writeTextToCanvas("WARNING", 60, this.xPos, this.yPos, "center", "yellow");
        this.writeTextToCanvas("CLICK HERE TO STOP", 30, this.rectangle[2].getXPos() + (this.rectangle[2].getWidth() / 2), this.rectangle[2].getYPos() + (this.rectangle[2].getHeight() / 2), "center", "yellow");
        this.index = 0;
        console.log("hihi");
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
  private drawWhatsApp = (): void => {
    if (this.frameIndex === 10) {
      this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
      this.ctx.drawImage(this.phoneImage, this.xPos, this.yPos);
      if (this.itteration === 0) {
        this.writeTextToCanvas("Wait for a message!", 35, this.canvas.width * 0.75, this.canvas.height * 0.25, "center", "black")
      }
      if (this.itteration === 1) {
        this.writeTextToCanvas("Whatsapp will never ask your personal information beside your phonenumber", 35, this.canvas.width / 2, this.canvas.height * 0.1, "center", "black")
      }
      if (this.itteration === 2) {
        this.writeTextToCanvas("Your bank will never ask your personal infromation through mail or text", 35, this.canvas.width / 2, this.canvas.height * 0.1, "center", "black")
      }
      if (this.itteration === 3) {
        this.writeTextToCanvas("you can trust this message because it is an in app verification", 35, this.canvas.width / 2, this.canvas.height * 0.1, "center", "black")
      }
    }
    if (this.frameIndex === 250) {
      this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
      this.ctx.drawImage(this.whatsAppImage, this.xPos_whatsapp, this.yPos_whatsapp);
      if (this.itteration >= 0) {
        this.writeTextToCanvas("You got a message, click to open", 35, this.canvas.width * 0.75, this.canvas.height * 0.25, "center", "black")
      }
      if (this.itteration >= 1) {
        this.writeTextToCanvas("You got a message, click to open", 35, this.canvas.width * 0.75, this.canvas.height * 0.25, "center", "black")
      }
      if (this.itteration >= 2) {
        this.writeTextToCanvas("You got a message, click to open", 35, this.canvas.width * 0.75, this.canvas.height * 0.25, "center", "black")
      }
      if (this.itteration >= 3) {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.writeTextToCanvas("Well done, You completed the game", 35, this.canvas.width * 0.75, this.canvas.height * 0.25, "center", "black")
      }
    }
  }



  private whatsApp_Pic = (event: MouseEvent) => {
    return event.clientX >= this.xPos_whatsapp && event.clientX < this.xPos_whatsapp + this.whatsAppImage.width && event.clientY >= this.yPos_whatsapp && event.clientY <= this.yPos_whatsapp + this.whatsAppImage.height;
  }

  private WhatsAppAccept = (event: MouseEvent) => {
    return event.clientX >= this.rectangle[0].getXPos() && event.clientX < this.rectangle[0].getXPos() + this.rectangle[0].getWidth() && event.clientY >= this.rectangle[0].getYPos() && event.clientY <= this.rectangle[0].getYPos() + this.rectangle[0].getHeight();
  }

  private WhatsAppReject = (event: MouseEvent) => {
    return event.clientX >= this.rectangle[1].getXPos() && event.clientX < this.rectangle[1].getXPos() + this.rectangle[1].getWidth() && event.clientY >= this.rectangle[1].getYPos() && event.clientY <= this.rectangle[1].getYPos() + this.rectangle[1].getHeight();
  }

  private warningClick = (event: MouseEvent) => {
    return event.clientX >= this.rectangle[2].getXPos() && event.clientX < this.rectangle[2].getXPos() + this.rectangle[2].getWidth() && event.clientY >= this.rectangle[2].getYPos() && event.clientY <= this.rectangle[2].getYPos() + this.rectangle[2].getHeight();
  }

}
