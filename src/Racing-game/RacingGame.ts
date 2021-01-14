/// <reference path="Player.ts" />

class RacingGame extends ClassLoader {
    // Necessary canvas attributes
    private readonly canvas: HTMLCanvasElement;
    private readonly ctx: CanvasRenderingContext2D;
    
    // the state of the game: begin, dice and end
    private gameState: string;
    private numberOfQuestion: number;
  
    private keyListener: KeyboardListener;
    
    private player1: PlayerRacing;
    private player2: PlayerRacing;

    private nextBackground : string;

    
    
    constructor(canvas: HTMLCanvasElement , nextBackGround : string) {
      super (canvas, new Audio ("assets/levels-music/Fishbowl-Acrobatics.mp3"))
    this.canvas = canvas;
    this.ctx = this.canvas.getContext("2d");
    
    this.keyListener = new KeyboardListener()

    this.canvas.width = window.innerWidth;
    this.canvas.height = window.innerHeight;

    this.player1 = new PlayerRacing("Bullet", 100, 50,"assets/img/enemy.png");
    this.player2 = new PlayerRacing("Greek Arrow", 100, 250,"assets/img/walk 1.png");  
    // this.rectangles = [
    //    new Rectangles(this.canvas.width/ 18, this.canvas.height/ 1.2, "red", 70, 400), //0
    //    new Rectangles(this.canvas.width/ 2.65, this.canvas.height/ 1.2, "red", 70, 400), //1
    //    new Rectangles(this.canvas.width / 1.4, this.canvas.height/ 1.2, "red", 70, 400), //2
    // ];

    const button1 = document.getElementById("answer1");
    button1.addEventListener("click", this.wrongAnswer);
    const button2 = document.getElementById("answer2");
    button2.addEventListener("click", this.rightAnswer);
    const button3 = document.getElementById("answer3");
    button3.addEventListener("click", this.wrongAnswer);
    const button4 = document.getElementById("answer4");
    button4.addEventListener("click", this.rightAnswer);
    const button5 = document.getElementById("answer5");
    button5.addEventListener("click", this.wrongAnswer);
    const button6 = document.getElementById("answer6");
    button6.addEventListener("click", this.wrongAnswer);
    const button7 = document.getElementById("answer7");
    button7.addEventListener("click", this.wrongAnswer);
    const button8 = document.getElementById("answer8");
    button8.addEventListener("click", this.rightAnswer);
    const button9 = document.getElementById("answer9");
    button9.addEventListener("click", this.wrongAnswer);
    const button10 = document.getElementById("answer10");
    button10.addEventListener("click", this.rightAnswer);
    const button11 = document.getElementById("answer11");
    button11.addEventListener("click", this.wrongAnswer);
    const button12 = document.getElementById("answer12");
    button12.addEventListener("click", this.wrongAnswer);
    const button13 = document.getElementById("answer13");
    button13.addEventListener("click", this.wrongAnswer);
    const button14 = document.getElementById("answer14");
    button14.addEventListener("click", this.wrongAnswer);
    const button15 = document.getElementById("answer15");
    button15.addEventListener("click", this.rightAnswer);
    const button16 = document.getElementById("answer16");
    button16.addEventListener("click", this.wrongAnswer);
    const button17 = document.getElementById("answer17");
    button17.addEventListener("click", this.rightAnswer);
    const button18 = document.getElementById("answer18");
    button18.addEventListener("click", this.wrongAnswer);
    const button19 = document.getElementById("answer19");
    button19.addEventListener("click", this.wrongAnswer);
    const button20 = document.getElementById("answer20");
    button20.addEventListener("click", this.wrongAnswer);
    const button21 = document.getElementById("answer21");
    button21.addEventListener("click", this.rightAnswer);

    this.nextBackground=nextBackGround;
    // add an mouse event
    this.numberOfQuestion = 1;
    }
    
    
    /**
    * Method for the Game Loop
    * Based on the game state some actions have to be executed
    */
    public draw = () => {
      
    this.gameState = "animate";
    this.draw1();
    this.restartGame();
    requestAnimationFrame(this.draw);
    };
  
    
    /**
    * Function to draw all the players on the canvas
    */
    public draw1= () => {
      
      this.gameState = "animate";
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    this.player1.draw(this.ctx);
    this.player2.draw(this.ctx);
    
    // for(let i = 0; i<this.rectangles.length; i++){
    //   this.rectangles[i].draw(this.ctx);
    // }
    
    if(this.numberOfQuestion === 1){
      // this.ctx.clearRect(0, 430, this.canvas.width, 400);
      
      this.writeTextToCanvas("Which password is good?", 40, this.canvas.width / 2, this.canvas.height / 1.3, "center", "black");
      document.getElementById("answer1").removeAttribute("hidden");
      document.getElementById("answer2").removeAttribute("hidden");
      document.getElementById("answer3").removeAttribute("hidden");
      
    }
  
    if(this.numberOfQuestion === 2){
      // this.ctx.clearRect(0, 430, this.canvas.width, 400)
      document.getElementById("answer1").setAttribute("hidden","hidden");
      document.getElementById("answer2").setAttribute("hidden","hidden");
      document.getElementById("answer3").setAttribute("hidden","hidden");

      document.getElementById("answer4").removeAttribute("hidden");
      document.getElementById("answer5").removeAttribute("hidden");
      document.getElementById("answer6").removeAttribute("hidden");
      this.writeTextToCanvas("How to protect your computer?", 40, this.canvas.width / 2, this.canvas.height / 1.3, "center", "black");
    
    }
  
    if(this.numberOfQuestion === 3){
      // this.ctx.clearRect(0, 430, this.canvas.width, 400)
      document.getElementById("answer4").setAttribute("hidden","hidden");
      document.getElementById("answer5").setAttribute("hidden","hidden");
      document.getElementById("answer6").setAttribute("hidden","hidden");

      document.getElementById("answer7").removeAttribute("hidden");
      document.getElementById("answer8").removeAttribute("hidden");
      document.getElementById("answer9").removeAttribute("hidden");
      this.writeTextToCanvas("What do you do when you detect strange activity on your social media account?", 40, this.canvas.width / 2, this.canvas.height / 1.3, "center", "black");
    
    }
  
    if(this.numberOfQuestion === 4){
      // this.ctx.clearRect(0, 430, this.canvas.width, 400)
      document.getElementById("answer7").setAttribute("hidden","hidden");
      document.getElementById("answer8").setAttribute("hidden","hidden");
      document.getElementById("answer9").setAttribute("hidden","hidden");

      document.getElementById("answer10").removeAttribute("hidden");
      document.getElementById("answer11").removeAttribute("hidden");
      document.getElementById("answer12").removeAttribute("hidden");
      this.writeTextToCanvas("Is it good to use your name as a password?", 40, this.canvas.width / 2, this.canvas.height / 1.3, "center", "black");
     
    }
  
    if(this.numberOfQuestion === 5){
      // this.ctx.clearRect(0, 430, this.canvas.width, 400)
      document.getElementById("answer10").setAttribute("hidden","hidden");
      document.getElementById("answer11").setAttribute("hidden","hidden");
      document.getElementById("answer12").setAttribute("hidden","hidden");

      document.getElementById("answer13").removeAttribute("hidden");
      document.getElementById("answer14").removeAttribute("hidden");
      document.getElementById("answer15").removeAttribute("hidden");
      this.writeTextToCanvas("Is it good the password to consist uppercase letters, lowercase letters and numbers?", 40, this.canvas.width / 2, this.canvas.height / 1.3, "center", "black");
     
    }
  
    if(this.numberOfQuestion === 6){
      // this.ctx.clearRect(0, 430, this.canvas.width, 400)
      document.getElementById("answer13").setAttribute("hidden","hidden");
      document.getElementById("answer14").setAttribute("hidden","hidden");
      document.getElementById("answer15").setAttribute("hidden","hidden");

      document.getElementById("answer16").removeAttribute("hidden");
      document.getElementById("answer17").removeAttribute("hidden");
      document.getElementById("answer18").removeAttribute("hidden");
      this.writeTextToCanvas("Is it good to use your birth date as a password?", 40, this.canvas.width / 2, this.canvas.height / 1.3, "center", "black");
     
    }

    if(this.numberOfQuestion === 7){
        // this.ctx.clearRect(0, 430, this.canvas.width, 400)
        document.getElementById("answer16").setAttribute("hidden","hidden");
      document.getElementById("answer17").setAttribute("hidden","hidden");
      document.getElementById("answer18").setAttribute("hidden","hidden");

      document.getElementById("answer19").removeAttribute("hidden");
      document.getElementById("answer20").removeAttribute("hidden");
      document.getElementById("answer21").removeAttribute("hidden");
        this.writeTextToCanvas("Is it a good practice to give your password to your friends?", 40, this.canvas.width / 2, this.canvas.height / 1.3, "center", "black");
       
      }
      if(this.numberOfQuestion === 8){
        document.getElementById("answer19").setAttribute("hidden","hidden");
        document.getElementById("answer20").setAttribute("hidden","hidden");
        document.getElementById("answer21").setAttribute("hidden","hidden");

        this.numberOfQuestion = 1;
      }
  
    
    if(this.gameState === "animate"){
      if(this.player1.getxPostition()<this.player1.getDistance()){
        this.player1.smoothDistance();
      }
      
     
      if (this.player2.getxPostition()>=this.player2.getDistance()) {
        this.gameState = "end2"
      }
        else if (this.player1.getxPostition()>=this.player1.getDistance() ){
      this.gameState = "end1"
      }  
  }
    
    if (this.gameState === "end1") {
      this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
      this.player1.stopThePlayer();
      this.writeTextToCanvas(`You lost the game :( Press "r" if you want to try again `, 60, this.canvas.width / 2, this.canvas.height / 1.3, "center", "red")
      }
  
    if (this.gameState === "end2") {
      this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
      this.player1.stopThePlayer();
      this.writeTextToCanvas(`You are the winner`, 60, this.canvas.width / 2, this.canvas.height / 2, "center", "red");
      this.gameState="you win";
    }
    }

    

    private rightAnswer = () =>{
      this.numberOfQuestion ++
      this.player2.roughDistance();
    }

    private wrongAnswer = () =>{
      this.numberOfQuestion ++
    }


    public restartGame = () => {
      if(this.keyListener.isKeyDown(82)){
        new RacingGame(this.canvas,"src/moving/back 2.jpg");
      }
    }

    public done = () => {
      if (this.gameState==="you win") {
        document.getElementById("answer1").setAttribute("hidden","hidden");
        document.getElementById("answer2").setAttribute("hidden","hidden");
        document.getElementById("answer3").setAttribute("hidden","hidden");
        document.getElementById("answer4").setAttribute("hidden","hidden");
        document.getElementById("answer5").setAttribute("hidden","hidden");
        document.getElementById("answer6").setAttribute("hidden","hidden");
        document.getElementById("answer7").setAttribute("hidden","hidden");
        document.getElementById("answer8").setAttribute("hidden","hidden");
        document.getElementById("answer9").setAttribute("hidden","hidden");
        document.getElementById("answer10").setAttribute("hidden","hidden");
        document.getElementById("answer11").setAttribute("hidden","hidden");
        document.getElementById("answer12").setAttribute("hidden","hidden");
        document.getElementById("answer13").setAttribute("hidden","hidden");
        document.getElementById("answer14").setAttribute("hidden","hidden");
        document.getElementById("answer15").setAttribute("hidden","hidden");
        document.getElementById("answer16").setAttribute("hidden","hidden");
        document.getElementById("answer17").setAttribute("hidden","hidden");
        document.getElementById("answer18").setAttribute("hidden","hidden");
        document.getElementById("answer19").setAttribute("hidden","hidden");
        document.getElementById("answer20").setAttribute("hidden","hidden");
        document.getElementById("answer21").setAttribute("hidden","hidden");

        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        document.body.style.backgroundImage = `url('${this.nextBackground}')`;
        document.body.style.backgroundSize = "cover";
        return true;
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