class CompleetGame{
        // Necessary canvas attributes
        private readonly canvas: HTMLCanvasElement;
        private readonly ctx: CanvasRenderingContext2D;
        private classLoader:ClassLoader[];
        private level : number


        public constructor(canvas:HTMLCanvasElement){
        this.canvas = canvas;
        this.ctx = this.canvas.getContext("2d");
        this.classLoader=[new Go (canvas), new Begin (canvas),new Start(canvas),new FullMarioGame(canvas)];
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
        this.level = 0 ;
        // this.classLoader[this.level]



        this.loop();
    
        }
    
        /**
        * Method for the Game Loop
        * Based on the game state some actions have to be executed
        */
       private loop = () => {
        if (this.classLoader[this.level].done()===true ) {
            console.log(this.level)
            this.classLoader.splice(0,1);
            // this.level++
        
        }
        requestAnimationFrame(this.loop);
        };

        private chooseLevel= ()=> {
            
    }
}