class Projectile{
    
    private canvas: HTMLCanvasElement;
    private xPos: number;
    private yPos: number;
    private ctx: CanvasRenderingContext2D;
    private image: HTMLImageElement;
    private enemy: Enemy;
    private verticalSpeed: number;
    private horizontalSpeed: number;
    private projectileCount: number;

    public constructor(canvas: HTMLCanvasElement, xPos : number, yPos: number, verticalSpeed: number){
        
        this.canvas = canvas;
        this.ctx = this.canvas.getContext("2d");
        this.image = this.loadNewImage("src/moving/pics/objects/enemy.png");
        this.verticalSpeed = verticalSpeed;
        this.horizontalSpeed = 2;

        this.xPos = xPos;
        this.yPos = yPos;

        this.projectileCount = 0;

    }    

    //Function that loads the image onto the screen
    public spawn = () => {
        this.projectileCount++;
        console.log("counting is " + this.projectileCount);
        this.ctx.drawImage(this.image,this.xPos, this.yPos);
    }

    //function that moves the image across the screen 
    public move = () => {
        this.ctx.clearRect(this.xPos, this.yPos, 60, 60); //Only clears the area directly around the projectile. Doesn't clear the entire canvas because that would make everything disappear
        this.ctx.drawImage(this.image,this.xPos, this.yPos);
        this.xPos -= this.horizontalSpeed;     
        // console.log("moves");  
    }


    public moveProjectiles = (): number => {
        this.yPos = this.yPos + this.verticalSpeed;
     
        if (this.yPos >= this.canvas.height - this.image.height - 10) {
          this.verticalSpeed = -this.verticalSpeed;
        }
     
        if (this.yPos <= 1) {
          this.verticalSpeed = -this.verticalSpeed;
        }
        return this.yPos;
      };


    /**
    * Loads an image in such a way that the screen doesn't constantly flicker
    * @param {HTMLImageElement} source
    * @return HTMLImageElement - returns an image
    */
    public loadNewImage(source: string): HTMLImageElement {
        const img = new Image();
        img.src = source;
        return img;
    }  

    public draw = () => {
        this.ctx.drawImage(this.image, this.xPos, this.yPos);
    }   

    public getXPos = (): number => {
        return this.xPos;
    }    

    
}