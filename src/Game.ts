class Game {

    private  canvas: HTMLCanvasElement;
    private  ctx: CanvasRenderingContext2D;

    // The hangman parts
    private base: Rectangle;
    private rectangle : Rectangle;

    private array : HTMLImageElement[];
    private leftArray : HTMLImageElement[];
    private keyboard : KeyboardListener;
    private index : number;
    private xpos :number;
    private ypos :number;

    public constructor(canvasId: HTMLCanvasElement) {
        // Construct all of the canvas
        this.canvas = canvasId;
        // Resize the canvas to fit the entire window
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;

        // Set the context of the canvas
        this.ctx = this.canvas.getContext('2d');
        document.body.style.backgroundImage = "src/moving/back.jpg"

        requestAnimationFrame(this.loop);

        this.xpos = this.canvas.width/10
        this.ypos = this.canvas.height* 8.6/10;

        this.keyboard = new KeyboardListener;

        this.array = [this.loadNewImage("src/moving/PlayerRight/walk 1.png") , this.loadNewImage("src/moving/PlayerRight/walk 2.png"), this.loadNewImage("src/moving/PlayerRight/walk 3.png") ,this.loadNewImage("src/moving/PlayerRight/walk 4.png"), this.loadNewImage("src/moving/PlayerRight/walk 5.png"), this.loadNewImage("src/moving/PlayerRight/walk 6.png"), this.loadNewImage("src/moving/PlayerRight/walk 7.png")];
        this.leftArray = [this.loadNewImage("src/moving/PlayerLeft/walk 1.png") , this.loadNewImage("src/moving/PlayerLeft/walk 2.png"), this.loadNewImage("src/moving/PlayerLeft/walk 3.png") ,this.loadNewImage("src/moving/PlayerLeft/walk 4.png"), this.loadNewImage("src/moving/PlayerLeft/walk 5.png"), this.loadNewImage("src/moving/PlayerLeft/walk 6.png"), this.loadNewImage("src/moving/PlayerLeft/walk 7.png")];

        this.index = 0

        // Initialize the game items
        const cx = this.canvas.width / 2 + 250;
        const cy = this.canvas.height / 2;

        // The base of the hangman
        this.base = new Rectangle(cx , cy , 200, 10);
        this.base.fillStyle = "brown";

        this.rectangle = new Rectangle(this.canvas.width/3 - 400 , this.canvas.height/3 + 400 , 300 , 10);
        this.rectangle.fillStyle="blue";
    }


    private drawing = (image : HTMLImageElement) : void => {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

        this.ctx.drawImage(image,this.xpos , this.ypos);
    }


    public loop = () => {
        if (this.index > 29) {
            this.index = 0;
        }
        

        if (this.keyboard.isKeyDown(39) === true){
            this.index ++ 
            if (this.index === 4) {
                this.drawing(this.array[0]);
            }
    
            if (this.index === 8) {
                this.drawing(this.array[1])
            }
    
            if (this.index === 12) {
                this.drawing(this.array[2])
            }
    
            if (this.index === 16) {
                this.drawing(this.array[3])
            }
    
            if (this.index === 20) {
                this.drawing(this.array[4])
            }
    
            if (this.index === 24) {
                this.drawing(this.array[5])
            }
            if (this.index === 28) {
                this.drawing(this.array[6]);
                this.index = 0
            }
    
            if (this.xpos=== this.canvas.width*5/5) {
                this.xpos = this.canvas.width/10;
            }
    
            this.xpos = this.xpos +4
        }
    
        if (this.keyboard.isKeyDown(32) === true) {
            this.ypos= this.ypos-20;
        }




        if (this.keyboard.isKeyDown(37) === true){
            this.index ++ 
            if (this.index === 4) {
                this.drawing(this.leftArray[0]);
            }
    
            if (this.index === 8) {
                this.drawing(this.leftArray[1])
            }
    
            if (this.index === 12) {
                this.drawing(this.leftArray[2])
            }
    
            if (this.index === 16) {
                this.drawing(this.leftArray[3])
            }
    
            if (this.index === 20) {
                this.drawing(this.leftArray[4])
            }
    
            if (this.index === 24) {
                this.drawing(this.leftArray[5])
            }
            if (this.index === 28) {
                this.drawing(this.leftArray[6]);
                this.index = 0
            }
    
            if (this.xpos=== 0) {
                this.xpos = this.canvas.width ;
            }
    
            this.xpos = this.xpos -4
        }


        if (this.keyboard.isKeyDown(32)=== false) {
            this.ypos = this.ypos + 20; 
            if (this.ypos > this.canvas.height* 8.6/10) {
                this.ypos = this.canvas.height* 8.6/10;
            }
        }

    console.log(this.index)
        requestAnimationFrame(this.loop)
    }



    private loadNewImage = ( source: string): HTMLImageElement => {
        const img = new Image();
        img.src = source;
        return img;
    }
}