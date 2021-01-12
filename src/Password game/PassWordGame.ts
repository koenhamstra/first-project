class PassWordGame extends ClassLoader {
    // Necessary canvas attributes
    private readonly canvas: HTMLCanvasElement;
    private readonly ctx: CanvasRenderingContext2D;
    
    private trueOrFalse: string;
    private numberOrNot: string;
    private shortOrNot: string;
    
    private screen: ComputerScreen;

    private keyListener : KeyboardListener;
    
    constructor(canvas: HTMLCanvasElement) {
    super(canvas);

    this.canvas = canvas;
    this.ctx = this.canvas.getContext("2d");
    
    this.canvas.width = window.innerWidth;
    this.canvas.height = window.innerHeight;
  
    this.trueOrFalse = "false"
    this.numberOrNot = "no"
    this.shortOrNot = "short"

    
      const btn = document.createElement("BUTTON");   // Create a <button> element
      btn.innerHTML = "Check";                   // Insert text
      document.body.appendChild(btn);
      btn.style.top=`30%`;
      btn.style.position="absolute"
      btn.style.left=`54%`
      btn.style.margin="-25px 0 0 -25px"

      const input = document.createElement("INPUT");
      input.innerHTML="";
      document.body.appendChild(input);
      input.style.top=`30%`;
      input.style.position="absolute";
      input.style.left=`44%`;
      input.style.margin="-25px 0 0 -25px";
      
    this.keyListener = new KeyboardListener;
    
    this.screen = new ComputerScreen("assets/img/screen.png", this.canvas.width/2.8, this.canvas.height/15);
    }
    

  
    public draw = () =>{      
      this.writeTextToCanvas("Password", 40, this.canvas.width / 2, this.canvas.height / 5, "center", "red");
      this.writeTextToCanvas("Press 'shift' if you want to try again", 25, this.canvas.width / 2, this.canvas.height / 2.7,);
      this.reload();
      this.drawScreen(this.ctx);
    }
    
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

      
      
    }

    private drawScreen(ctx: CanvasRenderingContext2D) {
      this.screen.draw(ctx)
  }

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

   public reload() {
    if (this.keyListener.isKeyDown(16)) {
        location.reload();
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