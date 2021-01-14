class Loadingscreen extends ClassLoader{
  private canvas: HTMLCanvasElement;
  private ctx: CanvasRenderingContext2D;
  private keyListener: KeyboardListener;
  private text: string;
  private text2: string;
  private nextBackGround : string ;

  public constructor(canvasId: HTMLCanvasElement, text: string, text2:string, nextBackground: string) {
    super(canvasId,new Audio ("assets/levels-music/Pixel-City-Groovin.mp3"))
    // Construct all of the canvas
    this.canvas = canvasId;
    this.canvas.width = window.innerWidth;
    this.canvas.height = window.innerHeight;
    this.ctx = this.canvas.getContext("2d");
    this.keyListener = new KeyboardListener();
    this.text = text;
    this.text2 = text2;
    this.nextBackGround= nextBackground;
    
  }

  public draw = () => {
    this.writeTextToCanvas(
      this.ctx,
      this.text,
      30,
      this.canvas.width / 2,
      this.canvas.height / 3,
      "center",
      "#08E275"
    );
    this.writeTextToCanvas(
      this.ctx,
      this.text2,
      30,
      this.canvas.width / 2,
      this.canvas.height *1.6/ 3,
      "center",
      "#08E275"
    );

    this.writeTextToCanvas(
      this.ctx,
      "Press SPACE to start",
      40,
      this.canvas.width / 2,
      (this.canvas.height / 3) * 2,
      "center",
      "red"
    );
  }

  public done = () => {
    if (this.keyListener.isKeyDown(32)) {
      this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
      document.body.style.backgroundImage = `url('${this.nextBackGround}')`;
      document.body.style.backgroundSize = "cover";
      return true 
    }
    return false
  };

  

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
    ctx: CanvasRenderingContext2D,
    text: string,
    fontSize: number = 20,
    xCoordinate: number,
    yCoordinate: number,
    alignment: CanvasTextAlign = "center",
    color: string = "red"
  ) {
    ctx.font = `${fontSize}px Minecraft`;
    ctx.fillStyle = color;
    ctx.textAlign = alignment;
    ctx.fillText(text, xCoordinate, yCoordinate);
  }

  /**
   * Renders a random number between min and max
   * @param {number} min - minimum number
   * @param {number} max - maximum number
   */
  public randomNumber(min: number, max: number): number {
    return Math.round(Math.random() * (max - min) + min);
  }
}
