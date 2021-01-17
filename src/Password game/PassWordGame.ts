class PassWordGame extends ClassLoader {
  // Necessary canvas attributes
  private readonly canvas: HTMLCanvasElement;
  private readonly ctx: CanvasRenderingContext2D;
  private trueOrFalse: string;
  private numberOrNot: string;
  private shortOrNot: string;
  private screen: ComputerScreen;
  private rectengle : Rectangles;
  private keyListener : KeyboardListener;  
  private state:string;

  constructor(canvas: HTMLCanvasElement) {
  super(canvas,new Audio ("assets/levels-music/Fishbowl-Acrobatics.mp3"));

  this.canvas = canvas;
  this.ctx = this.canvas.getContext("2d");
  
  this.canvas.width = window.innerWidth;
  this.canvas.height = window.innerHeight;

  this.trueOrFalse = "false"
  this.numberOrNot = "no"
  this.shortOrNot = "short"

  const button = document.getElementById("button");
  button.addEventListener("click", this.checkPasswrod);
  this.keyListener = new KeyboardListener();
  this.screen = new ComputerScreen("assets/img/screen.png", this.canvas.width/2.8, this.canvas.height/15);
  this.rectengle= new Rectangles(canvas.width*3/4 , canvas.height/2,"yellow",70,200);
  document.addEventListener("click", this.goToNext);

  }
  
 /**
    * Method for the Game Loop
    * Based on the game state some actions have to be executed
    */
  public draw = () =>{    
    document.getElementById("password-detection").removeAttribute("hidden");
    this.reload();
    this.drawBasics();
  }
  
  //Draws the basics on the screen
  private drawBasics = () =>{
    // this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    this.drawScreen(this.ctx);
    this.writeTextToCanvas("Password", 40, (this.screen.getXPos()+this.screen.getWidth())*1.08 / 2, (this.screen.getYPos()+this.screen.getHeight()) / 5, "center", "red")
    this.writeTextToCanvas("Press 'Alt' if you want to try again", 25, (this.screen.getXPos()+this.screen.getWidth())*1.08 / 2, (this.screen.getYPos()+this.screen.getHeight()) / 2.7,)

  }

  //draws the conditions
  private drawConditions = () => {
    if(this.trueOrFalse == "true"){
      this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height/2 + 140);
      this.writeTextToCanvas("There is a capital letter", 50, this.canvas.width / 2, this.canvas.height / 2+120);
    }

    if(this.trueOrFalse == "false"){
      this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height/2 + 140);
      this.writeTextToCanvas("There is no capital letter", 50, this.canvas.width / 2, this.canvas.height / 2 + 120);
    }
    
    if(this.numberOrNot == "yes"){
      this.ctx.clearRect(0, this.canvas.height / 2 + 150, this.canvas.width, this.canvas.height);
      this.writeTextToCanvas("There is a number", 50, this.canvas.width / 2, this.canvas.height / 2 + 200);
    }

    if(this.numberOrNot == "no"){
      this.ctx.clearRect(0, this.canvas.height / 2+150, this.canvas.width, this.canvas.height);
      this.writeTextToCanvas("There is no number", 50, this.canvas.width / 2, this.canvas.height / 2 + 200);
    }

    if(this.shortOrNot == "short"){
       this.ctx.clearRect(0, this.canvas.height / 2+200, this.canvas.width, this.canvas.height);
      this.writeTextToCanvas("The password should have at least 6 characters", 50, this.canvas.width / 2, this.canvas.height / 2 + 270);
    }
    if(this.shortOrNot == "not"){
       this.ctx.clearRect(0, this.canvas.height / 2+200, this.canvas.width, this.canvas.height);
      this.writeTextToCanvas("The password is long enough", 50, this.canvas.width / 2, this.canvas.height / 2 + 270);
    }

    if(this.shortOrNot == "not" && this.numberOrNot == "yes" && this.trueOrFalse=="true"){
      this.rectengle.draw(this.ctx);
      this.writeTextToCanvas("Go",40,this.rectengle.getXPos()+ (this.rectengle.getWidth()/2) , this.rectengle.getYPos()+(this.rectengle.getHeight())/2, "center", "yellow");
    }
    
  }

  //goes to the next stage when you press the rectangle
  private goToNext =(event:MouseEvent)=>{
    if (
      event.clientX >= this.rectengle.getXPos() &&
      event.clientX < this.rectengle.getXPos() + this.rectengle.getWidth() &&
      event.clientY >= this.rectengle.getYPos() &&
      event.clientY <= this.rectengle.getYPos() + this.rectengle.getHeight()
    ){
        this.state = "go";
        console.log ("Go is working ")
      }
    else 
      {
         this.state ="no";
      }
  
  }

  //draws the screen
  private drawScreen(ctx: CanvasRenderingContext2D) {
    this.screen.draw(ctx)
   
}

  //checks whether the password contains all of the conditions for good password
  private checkPasswrod = () =>{
    const password = (<HTMLInputElement>document.getElementById("password")).value;

    for (let i = 0; i < password.length; i++) {
      console.log(password[i])

      if (password.length>5){
        this.shortOrNot = "not"
        this.drawConditions();
      }


      if (password[i] === "0" || password[i] === "1" || password[i] === "2" || password[i] === "3" || password[i] === "4" || password[i] === "5" || password[i] === "6" || password[i] === "7" || password[i] === "8" || password[i] === "9" ) {
        console.log("number");
        this.numberOrNot = "yes"
        this.drawConditions();
      }

       if (password[i] === "Z" || password[i] === "X" || password[i] === "C" || password[i] === "V" || password[i] === "B" || password[i] === "N" || password[i] === "M" || password[i] === "A" || password[i] === "S" || password[i] === "D" || password[i] === "F" || password[i] === "G" || password[i] === "H" || password[i] === "J" || password[i] === "K" || password[i] === "L" || password[i] === "Q" || password[i] === "W" || password[i] === "E" || password[i] === "R" || password[i] === "T" || password[i] === "Y" || password[i] === "U" || password[i] === "I" || password[i] === "O" || password[i] === "P"){
       this.trueOrFalse = "true"
       console.log("capital letter")
       this.drawConditions();
      } else if (password[i] === password[i].toLowerCase()) {
        console.log(" no capital letter")
        this.drawConditions();
      }
    }
 }

 //restarts the game when you press "Alt"
 public reload() {
  if (this.keyListener.isKeyDown(18)) {
      new PassWordGame(this.canvas);
      (<HTMLInputElement>document.getElementById("password")).value = "";
  }
}

//If the password is good, it goes to the next stage
public done =() : boolean=> {
  if (this.state === "go"){
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    document.getElementById("password-detection").setAttribute("hidden","hidden");
    console.log(this.state);
    document.body.style.backgroundImage = "url('src/moving/back2.jpg')";
    document.body.style.backgroundSize = "cover";
    return true
  }
  return false;
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
  color: string = "#ffe6ff"
  ) {
  this.ctx.font = `${fontSize}px Fantasy`;
  this.ctx.fillStyle = color;
  this.ctx.textAlign = alignment;
  this.ctx.fillText(text, xCoordinate, yCoordinate);
  }

  }