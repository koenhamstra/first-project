 abstract class Character{
    private xPos: number;
    private yPos: number;
    private image: HTMLImageElement;

    public constructor(xPos: number, yPos:number, image: string){
        this.xPos = xPos;
        this.yPos = yPos;
        this.image = this.loadNewImage(image);
    }


    public getXPos(){
        return this.xPos;
    }


    public getYPos(){
        return this.yPos;
    }


    public getWidth(){
        return this.image.width;
    }

    public getHeight(){
        return this.image.height;
    }

    /**
     * Draws a fruit to the screen
     */
    public draw = (ctx:CanvasRenderingContext2D) => {
        ctx.drawImage( this.image,this.xPos,this.yPos);
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
}