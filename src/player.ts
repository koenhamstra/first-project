class Player {


    private array : HTMLImageElement[];
    private leftArray : HTMLImageElement[];
    private keyboard : KeyboardListener;
    private index : number;
    private xpos :number;
    private ypos :number;
    private  canvas: HTMLCanvasElement;
    private  ctx: CanvasRenderingContext2D;

    constructor(canvas: HTMLCanvasElement){
        this.canvas = canvas;
        this.xpos = this.canvas.width/10;
        this.ypos = this.canvas.height* 8/10;
        this.ctx = this.canvas.getContext('2d');

        this.keyboard = new KeyboardListener;

        this.array = [this.loadNewImage("src/moving/PlayerRight/walk 1.png") , this.loadNewImage("src/moving/PlayerRight/walk 2.png"), this.loadNewImage("src/moving/PlayerRight/walk 3.png") ,this.loadNewImage("src/moving/PlayerRight/walk 4.png"), this.loadNewImage("src/moving/PlayerRight/walk 5.png"), this.loadNewImage("src/moving/PlayerRight/walk 6.png"), this.loadNewImage("src/moving/PlayerRight/walk 7.png")];
        this.leftArray = [this.loadNewImage("src/moving/PlayerLeft/walk 1.png") , this.loadNewImage("src/moving/PlayerLeft/walk 2.png"), this.loadNewImage("src/moving/PlayerLeft/walk 3.png") ,this.loadNewImage("src/moving/PlayerLeft/walk 4.png"), this.loadNewImage("src/moving/PlayerLeft/walk 5.png"), this.loadNewImage("src/moving/PlayerLeft/walk 6.png"), this.loadNewImage("src/moving/PlayerLeft/walk 7.png")];
        this.index = 0;
        this.ctx.drawImage(this.array[1],this.xpos,this.ypos);
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
        this.jump();
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
        this.jump();
    }

    public jump = () =>{
        if (this.keyboard.isKeyDown(32) === true) {
            this.ypos = this.ypos - 20;
            this.drawing(this.array[1])
            if (this.ypos <= this.canvas.height*8/20 && this.xpos > this.canvas.width/20*1 && this.xpos< this.canvas.width/20*1 + 300) {
                this.ypos =  this.canvas.height*8/20+20;
                // this.ypos= this.ypos+20;
                this.keyboard.isKeyDown(32)===false;
                }
            }

        if (this.keyboard.isKeyDown(32) === false && (this.xpos < this.canvas.width/20*1 || this.xpos> this.canvas.width/20*1 + 300)) {
            this.ypos = this.ypos + 20;
            if (this.ypos > this.canvas.height * 8 / 10) {
                this.ypos = this.canvas.height * 8 / 10;
            }
        }
    }


    public start = () =>{
        if (this.keyboard.isKeyDown(32)===false && this.keyboard.isKeyDown(39)===false&&this.keyboard.isKeyDown(37)===false) {
            this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
            this.ctx.drawImage(this.array[0],this.xpos,this.ypos);
            this.jump();
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

    public getXPos= () => {
        return this.xpos;
    }
    public getyPos= () => {
        return this.xpos;
    }

    // public playerImage= () => {
    //     return this.ctx.drawImage(this.array[0],this.xpos,this.ypos);
    // }
}