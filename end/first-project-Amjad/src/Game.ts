class Game {

    private  canvas: HTMLCanvasElement;
    private  ctx: CanvasRenderingContext2D;
    private index  :number ;
    // private player: Player;
    private enemy :HTMLImageElement;




    public constructor(canvasId: HTMLCanvasElement) {
        // Construct all of the canvas
        this.index=0;
        this.canvas = canvasId;
        // Resize the canvas to fit the entire window
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;


        //player
        // this.player=new Player(canvas);

        // Set the context of the canvas
        this.ctx = this.canvas.getContext('2d');
        document.body.style.backgroundImage = "url('src/moving/back.png')";
        document.body.style.backgroundSize = "cover";
        requestAnimationFrame(this.loop); 
    }


    private draw = (image : HTMLImageElement) : void => {
        this.ctx.drawImage(this.enemy,this.canvas.width/2, this.canvas.height/2);
    }


    public loop = () => {
        if (this.index > 29) {
            this.index = 0;
        }
        // this.player.moveRight();
        // this.player.moveLeft();
        // this.player.jump()
    

        requestAnimationFrame(this.loop)
    }
}