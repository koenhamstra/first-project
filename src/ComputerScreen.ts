class ComputerScreen{
    protected xPos: number;
    protected yPos: number;
    protected image: HTMLImageElement;
   

    public constructor( image: string, xPos: number, yPos: number){
        this.image = this.loadNewImage(image);
       this.xPos= xPos;
       this.yPos= yPos;

    }

    
    

    /**
     * Loads an image so it doesn't flicker
     * @param {HTMLImageElement} source
     * @return HTMLImageElement - returns an image
     */
    private loadNewImage(source: string): HTMLImageElement {
        const img = new Image();
        img.src = source;
        return img;
    }

    /**
     * Draws a fruit to the screen
     */
    public draw(ctx:CanvasRenderingContext2D){
        ctx.drawImage( this.image,this.xPos,this.yPos, 450, 350);
    }

}