class Enemy {
    constructor(canvas) {
        this.draw = () => {
            this.ctx.drawImage(this.image, this.xPos, this.yPos);
        };
        this.canvas = canvas;
        this.image = this.loadNewImage("./assets/img/players/enemy.png");
        this.ctx = this.canvas.getContext("2d");
        this.xPos = this.canvas.width / 2;
        this.yPos = this.canvas.height / 2;
    }
    loadNewImage(source) {
        const img = new Image();
        img.src = source;
        return img;
    }
}
class Game {
    constructor(canvas) {
        this.step = () => {
            console.log(this.frameIndex);
            this.frameIndex++;
            this.enemy.draw();
            if (this.frameIndex % 150 === 0) {
                this.projectiles.push(new Projectile(this.canvas));
                for (let i = 0; i < this.projectiles.length; i++) {
                    this.projectiles[i].spawn();
                }
            }
            for (let i = 0; i < this.projectiles.length; i++) {
                this.projectiles[i].move();
            }
            this.collidesWithCanvasBorder();
            requestAnimationFrame(this.step);
        };
        this.canvas = canvas;
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
        this.frameIndex = 0;
        console.log('start animation');
        requestAnimationFrame(this.step);
        this.enemy = new Enemy(this.canvas);
        this.projectiles = [];
    }
    collidesWithCanvasBorder() {
        for (let i = 0; i < this.projectiles.length; i++) {
            if (this.projectiles[i].getXPos() < -100) {
                this.projectiles.splice(i, 1);
                console.log("removed");
            }
        }
    }
}
class KeyListener {
    constructor() {
        this.keyCodeStates = new Array();
        this.keyCodeTyped = new Array();
        this.previousState = new Array();
        window.addEventListener("keydown", (ev) => {
            this.keyCodeStates[ev.keyCode] = true;
        });
        window.addEventListener("keyup", (ev) => {
            this.keyCodeStates[ev.keyCode] = false;
        });
    }
    onFrameStart() {
        this.keyCodeTyped = new Array();
        this.keyCodeStates.forEach((val, key) => {
            if (this.previousState[key] != val && !this.keyCodeStates[key]) {
                this.keyCodeTyped[key] = true;
                this.previousState[key] = val;
            }
        });
    }
    isKeyDown(keyCode) {
        return this.keyCodeStates[keyCode] == true;
    }
    isKeyTyped(keyCode) {
        return this.keyCodeTyped[keyCode] == true;
    }
}
KeyListener.KEY_ENTER = 13;
KeyListener.KEY_SHIFT = 16;
KeyListener.KEY_CTRL = 17;
KeyListener.KEY_ALT = 18;
KeyListener.KEY_ESC = 27;
KeyListener.KEY_SPACE = 32;
KeyListener.KEY_LEFT = 37;
KeyListener.KEY_UP = 38;
KeyListener.KEY_RIGHT = 39;
KeyListener.KEY_DOWN = 40;
KeyListener.KEY_DEL = 46;
KeyListener.KEY_1 = 49;
KeyListener.KEY_2 = 50;
KeyListener.KEY_3 = 51;
KeyListener.KEY_4 = 52;
KeyListener.KEY_5 = 53;
KeyListener.KEY_6 = 54;
KeyListener.KEY_7 = 55;
KeyListener.KEY_8 = 56;
KeyListener.KEY_9 = 57;
KeyListener.KEY_0 = 58;
KeyListener.KEY_A = 65;
KeyListener.KEY_B = 66;
KeyListener.KEY_C = 67;
KeyListener.KEY_D = 68;
KeyListener.KEY_E = 69;
KeyListener.KEY_F = 70;
KeyListener.KEY_G = 71;
KeyListener.KEY_H = 72;
KeyListener.KEY_I = 73;
KeyListener.KEY_J = 74;
KeyListener.KEY_K = 75;
KeyListener.KEY_L = 76;
KeyListener.KEY_M = 77;
KeyListener.KEY_N = 78;
KeyListener.KEY_O = 79;
KeyListener.KEY_P = 80;
KeyListener.KEY_Q = 81;
KeyListener.KEY_R = 82;
KeyListener.KEY_S = 83;
KeyListener.KEY_T = 84;
KeyListener.KEY_U = 85;
KeyListener.KEY_V = 86;
KeyListener.KEY_W = 87;
KeyListener.KEY_X = 88;
KeyListener.KEY_Y = 89;
KeyListener.KEY_Z = 90;
class Projectile {
    constructor(canvas) {
        this.spawn = () => {
            this.ctx.drawImage(this.image, this.xPos, this.yPos);
        };
        this.move = () => {
            this.ctx.clearRect(this.xPos, this.yPos, 80, 80);
            this.ctx.drawImage(this.image, this.xPos, this.yPos);
            this.xPos -= 2;
        };
        this.draw = () => {
            this.ctx.drawImage(this.image, this.xPos, this.yPos);
        };
        this.getXPos = () => {
            return this.xPos;
        };
        this.canvas = canvas;
        this.xPos = this.canvas.width / 2;
        this.yPos = this.canvas.height / 2;
        this.ctx = this.canvas.getContext("2d");
        this.image = this.loadNewImage("./assets/img/objects/enemy.png");
    }
    loadNewImage(source) {
        const img = new Image();
        img.src = source;
        return img;
    }
}
console.log("Javascript is working!");
window.addEventListener('load', () => {
    console.log("Handling the Load event");
    const game = new Game(document.getElementById('canvas'));
});
//# sourceMappingURL=app.js.map