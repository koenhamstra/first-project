class CompleetGame{
        // Necessary canvas attributes
        private readonly canvas: HTMLCanvasElement;
        private readonly ctx: CanvasRenderingContext2D;
        private classLoader:ClassLoader[];
        private level : number

        public constructor(canvas:HTMLCanvasElement){
        this.canvas = canvas;
        this.ctx = this.canvas.getContext("2d");
        this.classLoader=[
        new Go (canvas),
        new Loadingscreen(canvas,"Weclome Agent 21 🕵️‍♂️ in BBKA Agency , Be carefull from the enemy shots, reach the server on top right to skip the level","Use left and right arrows to move the player and press Space to jump","src/moving/back.png"),
        new FullMarioGame(canvas,"src/moving/back 2.jpg",3),
        new Loadingscreen(canvas,"Well done!🤩 Now we need your skills to create a strong password for the computer, good luck! 🤙","", "assets/img/background.jpg"),
        new PassWordGame(canvas),
        new Loadingscreen(canvas,"Well done 🤩, You secure our server now. Thank you for your help! let's move on","","src/moving/back.png"),
        new FullMarioGame(canvas,"src/moving/back 2.jpg",7),
        new Loadingscreen(canvas,"Wow you are getting better!🤩 Now answer the questions faster than the hacker to kick him out! 🤙  Good luck 💪","", "assets/img/Racing-gameBackGround.png"),
        new RacingGame(canvas,"src/moving/back 2.jpg"),
        new Loadingscreen(canvas,"Wow you are an amazing agent!🤩 But we still need you! 🤙 move faster to the server 💪","", "src/moving/back.png"),
        new FullMarioGame(canvas,"src/moving/back 2.jpg",15),
        new Loadingscreen(canvas,"Amazing work!🤩 ","Now we want you to tell us what are the safe messages on the phones we need you focus good on it otherwise we will lose our war against the hackers", ""),
        new MalwareGame(canvas,0),
        new Loadingscreen(canvas,"Well done Agent 21 🕵️‍♂️ , you completed this mission 💪, see you on your next assignment 👋 ","","src/moving/back 2.jpg"),
        new EndScreen (canvas, "Press 'r' to restart the game. Thanks for playing our BBKA game 👋","","")
    ];
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
        // this.classLoader.push(new Go(canvas));
        this.level = 0 ;

        this.loop();
    
        }
    
        /**
        * Method for the Game Loop
        * Based on the game state some actions have to be executed
        */
       private loop = () => {
        if (this.classLoader[this.level].done()===true ) {
            console.log("ásdsd")
            this.level++;
            if (this.level!==0) {
                this.classLoader[this.level-1].stopAudio();
            }
            // this.classLoader[this.level];
        }
        this.classLoader[this.level].draw();
        this.classLoader[this.level].playAudio();
        requestAnimationFrame(this.loop);
        };

}