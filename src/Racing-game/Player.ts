class PlayerRacing {
    private image: HTMLImageElement;
    private _name: string;
    private _distance: number;
    private xPosition: number;
    private yPosition: number;
    // private upgrade: number;

    constructor(name:string, xPos:number, yPos:number, source: string) {
        this.xPosition = xPos;
        this.yPosition = yPos;
        this._name = name;
        this.image = this.loadNewImage(source);
        
    }

    public setDistance(distanceRaced : number) {
        this._distance = distanceRaced;
    }

    public smoothDistance() {
        this.xPosition += 0.5;
    }

    public roughDistance() {
        this.xPosition += 200;
    }

    public backDistance() {
        this.xPosition -= 100;
    }


    public stopThePlayer(){
    this.xPosition += 0;
    }
    
    public startPosition(carYPosition: number){
        this.xPosition = 100;
        this.yPosition = carYPosition;
    }

    public getDistance() : number {
        return 1400;
    }

    public getxPostition() : number {
        return this.xPosition;
    }


    public getyPostition() : number {
        return this.yPosition;
    }

    public getName() : string {
        return this._name;
    }
    
    /**
    * Draw all the necessary items to the screen
    */
    public draw = (ctx:CanvasRenderingContext2D)=> {
        // draw player
        //console.log(ctx);
        ctx.drawImage(this.image, this.xPosition, this.yPosition);
    }
    
    /**
    * Method to load an image
    * @param {HTMLImageElement} source
    * @return HTMLImageElement - returns an image
    */
    private loadNewImage(source: string): HTMLImageElement {
        const img = new Image();
        img.src = source;
        return img;
    }
}