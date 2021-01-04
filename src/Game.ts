 class Game {
    
    private canvas: HTMLCanvasElement;
    private frameIndex: number;

    private enemy: Enemy;
    private projectiles: Projectile[];

    public constructor(canvas: HTMLElement) { 
        
        this.canvas = <HTMLCanvasElement>canvas;
        
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;

        this.frameIndex = 0;

        // Start the animation
        console.log('start animation');
        requestAnimationFrame(this.step);

        this.enemy = new Enemy(this.canvas);
        this.projectiles = [];
    }
    
    /**
     * This MUST be an arrow method in order to keep the `this` variable
     * working correctly. It will be overwritten by another object otherwise
     * caused by javascript scoping behaviour.
     */
    step = () => {
        console.log(this.frameIndex);
        this.frameIndex++;
        this.enemy.draw();

        //Creates a new projectile every 150 frames and pushed the projectile to projectiles[]
        if(this.frameIndex % 150 === 0) {
            this.projectiles.push(new Projectile(this.canvas));
            for (let i = 0; i < this.projectiles.length; i++) {
                this.projectiles[i].spawn()   
            }
        }

        //Makes sure every projectile in the projectile array moves
        for (let i = 0; i < this.projectiles.length; i++) {
            this.projectiles[i].move();            
        }

        this.collidesWithCanvasBorder();

        // Call this method again on the next animation frame
        // The user must hit F5 to reload the game
        requestAnimationFrame(this.step);
    }  

    /**
     * Method that checks if a projectile collides with the border of the canvas
     */
     public collidesWithCanvasBorder() {
         for (let i = 0; i < this.projectiles.length; i++) {
             if (this.projectiles[i].getXPos() < -100) {
                 this.projectiles.splice(i, 1); // remove an element from the array
                 console.log("removed");
             }
         }
     }
}
