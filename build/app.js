class GameEntity {
    constructor(xPos, yPos) {
        this.xPos = xPos;
        this.yPos = yPos;
    }
    getXPos() {
        return this.xPos;
    }
    getYPos() {
        return this.yPos;
    }
    getImage() {
        return this.image;
    }
    loadNewImage(source) {
        const img = new Image();
        img.src = source;
        return img;
    }
    draw(ctx) {
        ctx.drawImage(this.image, this.xPos, this.yPos);
    }
}
class Character extends GameEntity {
    constructor(xPos, xVel, yPos) {
        super(xPos, yPos);
        this.xVel = xVel;
        this.keyboardListener = new KeyboardListener();
        this.playerState = "moving";
    }
    move(canvas) {
        console.log(this.playerState);
        if (this.playerState == "moving") {
            if (this.xPos + this.image.width >= canvas.width || this.xPos < 0) {
                this.xVel = -this.xVel;
            }
            this.xPos += this.xVel;
        }
        if (this.keyboardListener.isKeyDown(KeyboardListener.KEY_SPACE)) {
            this.playerState = "hyperjump";
            this.yPos = 50;
        }
        if (this.keyboardListener.isKeyDown(KeyboardListener.KEY_DOWN) &&
            this.playerState == "hyperjump") {
            this.playerState = "moving";
            this.yPos = canvas.height - 260;
        }
    }
    isCollidingWith(item) {
        if (this.keyboardListener.isKeyDown(KeyboardListener.KEY_SPACE)) {
            if (this.xPos < item.getXPos() + item.getImage().width &&
                this.xPos + this.image.width > item.getXPos() &&
                this.yPos < item.getYPos() + item.getImage().height &&
                this.yPos + this.image.height > item.getYPos()) {
                return true;
            }
        }
        return false;
    }
}
class Coin extends GameEntity {
    constructor(xPos, yPos) {
        super(xPos, yPos);
        this.score = 3;
    }
    getScore() {
        return this.score;
    }
}
class Game {
    constructor(canvas) {
        this.loop = () => {
            this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
            this.draw();
            this.writeTextToCanvas(`Score: ${this.score}`, 36, 120, 50);
            requestAnimationFrame(this.loop);
        };
        this.canvas = canvas;
        this.ctx = this.canvas.getContext("2d");
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
        this.keyboardListener = new KeyboardListener();
        this.floor = [];
        this.floors = -40;
        this.platform = [];
        this.platformPos = [100, 200, 350, 600, 800, 900, 1100];
        this.image = this.loadNewImage("./assets/img/Server.png");
        this.score = 0;
        this.createPlatform();
        this.loop();
    }
    createPlatform() {
        for (let i = 0; i < 10; i++) {
            this.platform.push(new Layout(this.platformPos[0] += 30, 500, "./Free/Terrain/smallBrick.png"));
        }
        for (let i = 0; i < 8; i++) {
            this.platform.push(new Layout(this.platformPos[1] += 30, 300, "./Free/Terrain/smallBrick.png"));
        }
        for (let i = 0; i < 12; i++) {
            this.platform.push(new Layout(this.platformPos[2] += 30, 100, "./Free/Terrain/smallBrick.png"));
        }
        for (let i = 0; i < 4; i++) {
            this.platform.push(new Layout(this.platformPos[3] += 30, 500, "./Free/Terrain/smallBrick.png"));
        }
        for (let i = 0; i < 12; i++) {
            this.platform.push(new Layout(this.platformPos[4] += 30, 300, "./Free/Terrain/smallBrick.png"));
        }
        for (let i = 0; i < 8; i++) {
            this.platform.push(new Layout(this.platformPos[6] += 30, 100, "./Free/Terrain/smallBrick.png"));
        }
        for (let i = 0; i < 8; i++) {
            this.platform.push(new Layout(this.platformPos[5] += 30, 500, "./Free/Terrain/smallBrick.png"));
        }
        for (let i = 0; i < 100; i++) {
            this.floor.push(new Layout(this.floors += 40, 655, "./Free/Terrain/brick.png"));
        }
    }
    draw() {
        this.floor.forEach(element => {
            element.draw(this.ctx);
        });
        this.platform.forEach(element => {
            element.draw(this.ctx);
        });
        this.ctx.drawImage(this.image, 1250, 10);
        this.ctx.drawImage(this.image, 1290, 10);
    }
    writeTextToCanvas(text, fontSize = 20, xCoordinate, yCoordinate, alignment = "center", color = "white") {
        this.ctx.font = `${fontSize}px sans-serif`;
        this.ctx.fillStyle = color;
        this.ctx.textAlign = alignment;
        this.ctx.fillText(text, xCoordinate, yCoordinate);
    }
    loadNewImage(source) {
        const img = new Image();
        img.src = source;
        return img;
    }
    randomNumber(min, max) {
        return Math.round(Math.random() * (max - min) + min);
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
class Layout extends GameEntity {
    constructor(xPos, yPos, imageUrl) {
        super(xPos, yPos);
        this.image = this.loadNewImage(imageUrl);
    }
}
let init = () => new Game(document.getElementById("canvas"));
window.addEventListener("load", init);
//# sourceMappingURL=app.js.map