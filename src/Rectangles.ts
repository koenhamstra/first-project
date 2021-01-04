class Rectangles {
    private height: number;
    private width: number;
    private xPos: number;
    private yPos: number;
    private color: string;
    
    public constructor(xPos: number, yPos: number, color: string, height: number, width: number){
        this.height = height;
        this.width = width;
        this.xPos = xPos;
        this.yPos = yPos;
        this.color = color;
    }

    public draw(ctx: CanvasRenderingContext2D){
        ctx.beginPath();
        ctx.strokeStyle = this.color;
        ctx.lineWidth = 10;
        ctx.strokeRect(this.xPos, this.yPos, this.width, this.height);
    }

    public getXPos(){
        return this.xPos;
    }

    public getYPos(){
        return this.yPos;
    }

    public getWidth(){
        return this.width;
    }

    public getHeight(){
        return this.height;
    }
}