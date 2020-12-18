class Projectile{
    
    private canvas: HTMLCanvasElement;
    private xPos: number;
    private yPos: number;
    private ctx: CanvasRenderingContext2D;
    private image: HTMLImageElement;
    private enemy: Enemy;

    public constructor(canvas: HTMLCanvasElement){
        
        this.canvas = canvas;
        // this.xPos= this.canvas.width / 2;
        this.enemy = new Enemy(canvas);
        this.xPos = this.enemy.getEnemyXPos();
        // this.yPos =this.canvas.height / 2;
        this.yPos = this.enemy.getEnemyYPos();
        this.ctx = this.canvas.getContext("2d");
        this.image = this.loadNewImage("./assets/img/objects/enemy.png");
    }    

    //Function that loads the image onto the screen
    public spawn = () => {
        this.ctx.drawImage(this.image,this.xPos, this.yPos);
    }

    //function that moves the image across the screen 
    public move = () => {
        this.ctx.clearRect(this.xPos, this.yPos, 60, 60); //Only clears the area directly around the projectile. Doesn't clear the entire canvas because that would make everything disappear
        this.ctx.drawImage(this.image,this.xPos, this.yPos);
        this.xPos -= 2;     
        // console.log("moves");  
    }

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