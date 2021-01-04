class Enemy{

    private canvas: HTMLCanvasElement;
    private ctx: CanvasRenderingContext2D;
    private image: HTMLImageElement;

    private xPos: number;
    private yPos: number;    

    public constructor(canvas: HTMLCanvasElement){
        
        this.canvas = canvas;
        this.image = this.loadNewImage("./assets/img/players/enemy.png");
        
        this.ctx = this.canvas.getContext("2d");
        this.xPos = this.canvas.width / 30 * 26.8;
        this.yPos = this.canvas.height * 0.74;
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

    public getEnemyXPos = ():number => {
        return this.xPos
    }

    public getEnemyYPos = () => {
        return this.yPos
    }
}