class Player {


    private array : HTMLImageElement[];
    private leftArray : HTMLImageElement[];
    private keyboard : KeyboardListener;
    private index : number;
    private xpos :number;
    private ypos :number;
    private  canvas: HTMLCanvasElement;
    private  ctx: CanvasRenderingContext2D;

    constructor(canvas: HTMLCanvasElement, ctx :CanvasRenderingContext2D){
        this.canvas = canvas;
        this.xpos = this.canvas.width / 10;
        this.ypos = this.canvas.height * 8.6 / 10;
        this.ctx = ctx;

        this.keyboard = new KeyboardListener;

        this.array = [this.loadNewImage("end/src/moving/PlayerRight/walk 1.png") , this.loadNewImage("end/src/moving/PlayerRight/walk 2.png"), this.loadNewImage("end/src/moving/PlayerRight/walk 3.png") ,this.loadNewImage("end/src/moving/PlayerRight/walk 4.png"), this.loadNewImage("end/src/moving/PlayerRight/walk 5.png"), this.loadNewImage("end/src/moving/PlayerRight/walk 6.png"), this.loadNewImage("end/src/moving/PlayerRight/walk 7.png")];
        this.leftArray = [this.loadNewImage("end/src/moving/PlayerLeft/walk 1.png") , this.loadNewImage("end/src/moving/PlayerLeft/walk 2.png"), this.loadNewImage("end/src/moving/PlayerLeft/walk 3.png") ,this.loadNewImage("end/src/moving/PlayerLeft/walk 4.png"), this.loadNewImage("end/src/moving/PlayerLeft/walk 5.png"), this.loadNewImage("end/src/moving/PlayerLeft/walk 6.png"), this.loadNewImage("end/src/moving/PlayerLeft/walk 7.png")];
        this.index = 0;
    }

    public moveLeft = () => {
        if (this.keyboard.isKeyDown(37) === true) {
            this.index++;
            if (this.index === 4) {
                this.drawing(this.leftArray[0]);
            }

            if (this.index === 8) {
                this.drawing(this.leftArray[1]);
            }

            if (this.index === 12) {
                this.drawing(this.leftArray[2]);
            }

            if (this.index === 16) {
                this.drawing(this.leftArray[3]);
            }

            if (this.index === 20) {
                this.drawing(this.leftArray[4]);
            }

            if (this.index === 24) {
                this.drawing(this.leftArray[5]);
            }
            if (this.index === 28) {
                this.drawing(this.leftArray[6]);
                this.index = 0;
            }

            if (this.xpos === 0) {
                this.xpos = this.canvas.width;
            }

            this.xpos = this.xpos - 4;
        }
    }


    public moveRight = () => {
        if (this.keyboard.isKeyDown(39) === true) {
            this.index++;
            if (this.index === 4) {
                this.drawing(this.array[0]);
            }

            if (this.index === 8) {
                this.drawing(this.array[1]);
            }

            if (this.index === 12) {
                this.drawing(this.array[2]);
            }

            if (this.index === 16) {
                this.drawing(this.array[3]);
            }

            if (this.index === 20) {
                this.drawing(this.array[4]);
            }

            if (this.index === 24) {
                this.drawing(this.array[5]);
            }
            if (this.index === 28) {
                this.drawing(this.array[6]);
                this.index = 0;
            }

            if (this.xpos === this.canvas.width * 5 / 5) {
                this.xpos = 0;
            }

            this.xpos = this.xpos + 4;
        }
    }

    public jump = () =>{
        if (this.keyboard.isKeyDown(32) === true) {
            this.ypos = this.ypos - 20;
            // if (this.ypos <= this.canvas.height*7/10) {
            //     this.ypos =  this.canvas.height*7/10;
            // }
        }

        if (this.keyboard.isKeyDown(32) === false) {
            this.ypos = this.ypos + 20;
            if (this.ypos > this.canvas.height * 8.6 / 10) {
                this.ypos = this.canvas.height * 8.6 / 10;
            }
        }
    }


    private loadNewImage = ( source: string): HTMLImageElement => {
        const img = new Image();
        img.src = source;
        return img;
    }



    private drawing = (image : HTMLImageElement) : void => {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.ctx.drawImage(image,this.xpos , this.ypos);
    }
}