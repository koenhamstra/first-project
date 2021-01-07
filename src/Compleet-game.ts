class CompleetGame{
        // Necessary canvas attributes
        private readonly canvas: HTMLCanvasElement;
        private readonly ctx: CanvasRenderingContext2D;
        
        private begin :Begin;
        private go :Go;
        private start :Start;
    
        public constructor(canvas:HTMLCanvasElement){
        this.canvas = canvas;
        this.ctx = this.canvas.getContext("2d");
        
        this.go = new Go (this.canvas);

        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
        
        this.loop();
    
        }
    
        /**
        * Method for the Game Loop
        * Based on the game state some actions have to be executed
        */
       private loop = () => {
        if (this.go.done()===false){
            this.begin = new Begin (this.canvas);
            this.begin;
            if (this.begin.stage==="compleet" ) {
                console.log("hahahahaah");
                this.start =new Start(this.canvas);
                this.start;
            }
            
            }
        requestAnimationFrame(this.loop);
        };
}