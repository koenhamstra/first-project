class Game {
    constructor(canvasId) {
        this.drawing = (image) => {
            this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
            this.ctx.drawImage(this.enemy, this.canvas.width / 2, this.canvas.height / 2);
            this.ctx.drawImage(image, this.xpos, this.ypos);
        };
        this.loop = () => {
            if (this.index > 29) {
                this.index = 0;
            }
            this.moveRight();
            this.moveLeft();
            this.jump();
            requestAnimationFrame(this.loop);
        };
        this.loadNewImage = (source) => {
            const img = new Image();
            img.src = source;
            return img;
        };
        this.canvas = canvasId;
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
        this.ctx = this.canvas.getContext('2d');
        document.body.style.backgroundImage = "url('src/moving/back.png')";
        document.body.style.backgroundSize = "cover";
        requestAnimationFrame(this.loop);
        this.xpos = this.canvas.width / 10;
        this.ypos = this.canvas.height * 8.6 / 10;
        this.keyboard = new KeyboardListener;
        this.array = [this.loadNewImage("src/moving/PlayerRight/walk 1.png"), this.loadNewImage("src/moving/PlayerRight/walk 2.png"), this.loadNewImage("src/moving/PlayerRight/walk 3.png"), this.loadNewImage("src/moving/PlayerRight/walk 4.png"), this.loadNewImage("src/moving/PlayerRight/walk 5.png"), this.loadNewImage("src/moving/PlayerRight/walk 6.png"), this.loadNewImage("src/moving/PlayerRight/walk 7.png")];
        this.leftArray = [this.loadNewImage("src/moving/PlayerLeft/walk 1.png"), this.loadNewImage("src/moving/PlayerLeft/walk 2.png"), this.loadNewImage("src/moving/PlayerLeft/walk 3.png"), this.loadNewImage("src/moving/PlayerLeft/walk 4.png"), this.loadNewImage("src/moving/PlayerLeft/walk 5.png"), this.loadNewImage("src/moving/PlayerLeft/walk 6.png"), this.loadNewImage("src/moving/PlayerLeft/walk 7.png")];
        this.index = 0;
        this.enemy = this.loadNewImage("src/moving/enemy/shoot 2.png");
    }
    jump() {
        if (this.keyboard.isKeyDown(32) === true) {
            this.ypos = this.ypos - 20;
        }
        if (this.keyboard.isKeyDown(32) === false) {
            this.ypos = this.ypos + 20;
            if (this.ypos > this.canvas.height * 8.6 / 10) {
                this.ypos = this.canvas.height * 8.6 / 10;
            }
        }
    }
    moveLeft() {
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
    moveRight() {
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
}
class KeyboardListener {
    constructor() {
        this.keyDown = (ev) => {
            this.keyCodeStates[ev.keyCode] = true;
        };
        this.keyUp = (ev) => {
            this.keyCodeStates[ev.keyCode] = false;
        };
        this.keyCodeStates = new Array();
        window.addEventListener("keydown", this.keyDown);
        window.addEventListener("keyup", this.keyUp);
    }
    isKeyDown(keyCode) {
        return this.keyCodeStates[keyCode] === true;
    }
}
KeyboardListener.KEY_SPACE = 32;
KeyboardListener.KEY_LEFT = 37;
KeyboardListener.KEY_UP = 38;
KeyboardListener.KEY_RIGHT = 39;
KeyboardListener.KEY_DOWN = 40;
let init = () => {
    const KiwiWars = new Game(document.getElementById("canvas"));
};
window.addEventListener("load", init);
class Rectangle {
    constructor(x, y, width, height) {
        this.lineWidth = 1;
        this.strokeStyle = "white";
        this.fill = true;
        this.fillStyle = "white";
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
    }
    drawRectangle(ctx) {
        ctx.save();
        ctx.beginPath();
        ctx.rect(this.x, this.y, this.width, this.height);
        if (this.fill) {
            console.log(this.fillStyle);
            ctx.fillStyle = this.fillStyle;
            ctx.fill();
        }
        else {
            ctx.lineWidth = this.lineWidth;
            ctx.strokeStyle = this.strokeStyle;
            ctx.stroke();
        }
        ctx.restore();
    }
}
//# sourceMappingURL=app.js.map