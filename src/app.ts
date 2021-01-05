/// <reference path="Car.ts" />


class Game {
  // Necessary canvas attributes
  private readonly canvas: HTMLCanvasElement;
  private readonly ctx: CanvasRenderingContext2D;
  
  
  // the state of the game: begin, dice and end
  private gameState: string;
  private numberOfQuestion: number;

  private rectangles: Rectangles[];
  
  // Car instances, one for each player
  private car1: Car;
  private car2: Car;
  
  constructor(canvas: HTMLCanvasElement) {
  this.canvas = canvas;
  this.ctx = this.canvas.getContext("2d");
  
  this.canvas.width = window.innerWidth;
  this.canvas.height = window.innerHeight;
  
  
  
  this.car1 = new Car("Bullet", 100, 0, "assets/img/walk 1 (1).png");
  this.car2 = new Car("Greek Arrow", 100, 250,"assets/img/walk 1 (1).png");
  console.log(this.car1);

  this.rectangles = [
     new Rectangles(100, 600, "red", 70, 400), //0
     new Rectangles(570, 600, "red", 70, 400), //1
     new Rectangles(1100, 600, "red", 70, 400), //2
    //  new Rectangles(100, 500, "red", 70, 400), //3
    //  new Rectangles(570, 500, "red", 70, 400), //4
    //  new Rectangles(1100, 500, "red", 70, 400), //5
    //  new Rectangles(100, 500, "red", 70, 400), //6
    //  new Rectangles(570, 500, "red", 70, 400), //7
    //  new Rectangles(1100, 500, "red", 70, 400), //8
    //   new Rectangles(100, 500, "red", 70, 400), //9
    //   new Rectangles(570, 500, "red", 70, 400), //10
    //   new Rectangles(1100, 500, "red", 70, 400) //11
  ]

  // add an mouse event
  document.addEventListener("click", this.mouseHandler);
  
  this.numberOfQuestion = 1;


  
  this.loop();
  }
  
  
  /**
  * Method for the Game Loop
  * Based on the game state some actions have to be executed
  */
  private loop = () => {

  this.gameState = "animate";
  this.draw();
  requestAnimationFrame(this.loop);
  };

  
  /**
  * Function to draw all the cars on the canvas
  */
  private draw() {
  this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
  
  this.car1.draw(this.ctx);
  this.car2.draw(this.ctx);
  
  for(let i = 0; i<this.rectangles.length; i++){
    this.rectangles[i].draw(this.ctx);
  }
  
  if(this.numberOfQuestion === 1){
    // this.ctx.clearRect(0, 430, this.canvas.width, 400);
    
    this.writeTextToCanvas("Which password is good?", 40, this.canvas.width / 2, 580, "center", "black");
    this.writeTextToCanvas("12345", 40, 300, 650, "center", "black");
    this.writeTextToCanvas("GoodPassword2020", 40, 770 , 650, "center", "black");
    this.writeTextToCanvas("myname", 40, 1300, 650, "center", "black");
  }

  if(this.numberOfQuestion === 2){
    // this.ctx.clearRect(0, 430, this.canvas.width, 400)

    this.writeTextToCanvas("How to protect your computer?", 40, this.canvas.width / 2, 580, "center", "black");
    this.writeTextToCanvas("Be careless", 40, 300, 650, "center", "black");
    this.writeTextToCanvas("Use firewall", 40, 770 , 650, "center", "black");
    this.writeTextToCanvas("Do not use firewall", 40, 1300, 650, "center", "black");
  }

  if(this.numberOfQuestion === 3){
    // this.ctx.clearRect(0, 430, this.canvas.width, 400)
   
    this.writeTextToCanvas("What do you do when you detect strange activity on your social media account?", 40, this.canvas.width / 2, 580, "center", "black");
    this.writeTextToCanvas("Nothing", 40, 300, 650, "center", "black");
    this.writeTextToCanvas("Change your password", 40, 770 , 650, "center", "black");
    this.writeTextToCanvas("Sell your device", 40, 1300, 650, "center", "black");
  }

  if(this.numberOfQuestion === 4){
    // this.ctx.clearRect(0, 430, this.canvas.width, 400)
   
    this.writeTextToCanvas("What do you do when you detect strange activity on your social media account?", 40, this.canvas.width / 2, 580, "center", "black");
    this.writeTextToCanvas("Nothing", 40, 300, 650, "center", "black");
    this.writeTextToCanvas("Change your password", 40, 770 , 650, "center", "black");
    this.writeTextToCanvas("Sell your device", 40, 1300, 650, "center", "black");
  }

  if(this.numberOfQuestion === 5){
    // this.ctx.clearRect(0, 430, this.canvas.width, 400)
   
    this.writeTextToCanvas("What do you do when you detect strange activity on your social media account?", 40, this.canvas.width / 2, 580, "center", "black");
    this.writeTextToCanvas("Nothing", 40, 300, 650, "center", "black");
    this.writeTextToCanvas("Change your password", 40, 770 , 650, "center", "black");
    this.writeTextToCanvas("Sell your device", 40, 1300, 650, "center", "black");
  }
  
  if(this.gameState === "animate"){
    console.log(this.car1.xPosition())
    console.log(this.car1.getDistance())
    if(this.car1.xPosition()<this.car1.getDistance()){
      this.car1.smoothDistance();
    }
    
   
    if (this.car2.xPosition()>=this.car2.getDistance()) {
      this.gameState = "end2"
    }
      else if (this.car1.xPosition()>=this.car1.getDistance() ){
    this.gameState = "end1"
    }  
}
  
  if (this.gameState === "end1") {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    this.car1.stopTheCar();
    this.writeTextToCanvas(`You lost the game :( `, 60, this.canvas.width / 2, this.canvas.height / 2, "center", "red")
    }

  if (this.gameState === "end2") {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    this.car1.stopTheCar();
    this.writeTextToCanvas(`You are the winner`, 60, this.canvas.width / 2, this.canvas.height / 2, "center", "red")
  }
  }
  

  /**
     * Method to handle the mouse event
     * @param {MouseEvent} event - mouse event
     */
    private mouseHandler = (event: MouseEvent) => {
      console.log(`xPos ${event.clientX}, yPos ${event.clientY}`);

      // Bounding box collision detection
      //Check every rectangle for a "collision" with the mouseclick
      //If yes, execute the if statement
      //If no, do nothing
      for(let i = 0; i< this.rectangles.length; i++) {
        if(this.numberOfQuestion === 1 && this.detectingRect(event, 1)){
         
              this.car2.roughDistance();
              this.numberOfQuestion = 2;
          }
           
          if(this.numberOfQuestion === 2 && this.detectingRect(event, 0)){
            this.car2.roughDistance();
            this.numberOfQuestion = 3;
          }
          
          if(this.numberOfQuestion === 3 && this.detectingRect(event, 2)){
            this.car2.roughDistance();
            
          }
        } 
     
  };
  
  private detectingRect(event: MouseEvent, i: number) {
    return event.clientX >= this.rectangles[i].getXPos() &&
      event.clientX < this.rectangles[i].getXPos() + this.rectangles[i].getWidth() &&
      event.clientY >= this.rectangles[i].getYPos() &&
      event.clientY <= this.rectangles[i].getYPos() + this.rectangles[i].getHeight();
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
  
  /**
  * Start the game whenever the entire DOM is loaded
  */
  let init = () =>
  new Game(document.getElementById("canvas") as HTMLCanvasElement);
  
  // Add EventListener to load the game whenever the browser is ready
  window.addEventListener("load", init);
