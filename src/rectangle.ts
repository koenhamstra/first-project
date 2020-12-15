class Rectangle {

    public x: number;
    
    public y: number;

    public width: number;
    
    public height: number;

    public lineWidth: number = 1;

    public strokeStyle: string | CanvasGradient | CanvasPattern = "white";

    public fill: boolean = true;

    public fillStyle: string | CanvasGradient | CanvasPattern = "white";


    /**
     * constructs a new object of this class
     * 
     * @param {number} x The x-axis coordinate of the rectangle's starting point.
     * @param {number} y The y-axis coordinate of the rectangle's starting point.
     * @param {number} width The rectangle's width. Positive values are to the 
     * right, and negative to the left.
     * @param {number} height The rectangle's height. Positive values are down, 
     * and negative are up.
     */
    public constructor(x: number, y: number, width: number, height: number) {
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
    }

    
    /**
     * Draws the current rectangle with the current settings to the specified
     * CanvasRenderingContext2D.
     * 
     * @param {CanvasRenderingContext2D} ctx - The renderingcontext to draw on 
     */
    public drawRectangle(ctx: CanvasRenderingContext2D) {
        ctx.save();
        ctx.beginPath();
        ctx.rect(this.x, this.y, this.width, this.height);
        if (this.fill) {
            console.log(this.fillStyle);
            ctx.fillStyle = this.fillStyle;
            ctx.fill();
        } else {
            ctx.lineWidth = this.lineWidth;
            ctx.strokeStyle = this.strokeStyle;
            ctx.stroke();
        }
        ctx.restore();
    }

}