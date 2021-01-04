class Car {
    private image: HTMLImageElement;
    private _name: string;
    private _distance: number;
    private _xPosition: number;
    private _yPosition: number;
    // private upgrade: number;

    constructor(name:string, colour:string, xPos:number, yPos:number, source: string) {
        this._xPosition = xPos;
        this._yPosition = yPos;
        this._name = name;
        this.image = this.loadNewImage(source);
        //console.log(this.image);
        // this.upgrade =  200;
    }

    public setDistance(distanceRaced : number) {
        this._distance = distanceRaced;
    }

    public smoothDistance() {
        this._xPosition += 1;
    }

    public roughDistance() {
        this._xPosition += 100;
    }

    public xPosition(){
        return this._xPosition;
    }

    public stopTheCar(){
    this._xPosition += 0;
    }
    
    public startPosition(carYPosition: number){
        this._xPosition = 100;
        this._yPosition = carYPosition;
    }

    public getDistance() : number {
        return 1400;
    }

    public getxPostition() : number {
        return this._xPosition;
    }


    public getyPostition() : number {
        return this._yPosition;
    }

    public getName() : string {
        return this._name;
    }
    
    /**
    * Draw all the necessary items to the screen
    */
    public draw(ctx:CanvasRenderingContext2D) {
        // draw player
        //console.log(ctx);
        ctx.drawImage(this.image, this._xPosition, this._yPosition);
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