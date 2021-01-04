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
    const KiwiWars = new FullGame(document.getElementById("canvas"));
};
window.addEventListener("load", init);
class Enemy {
    constructor(canvas) {
        this.draw = () => {
            this.ctx.drawImage(this.image, this.xPos, this.yPos);
        };
        this.getEnemyXPos = () => {
            return this.xPos;
        };
        this.getEnemyYPos = () => {
            return this.yPos;
        };
        this.canvas = canvas;
        this.image = this.loadNewImage("src/moving/pics/players/enemy.png");
        this.ctx = this.canvas.getContext("2d");
        this.xPos = this.canvas.width * 5 / 6;
        this.yPos = this.canvas.height * 0.74;
    }
    loadNewImage(source) {
        const img = new Image();
        img.src = source;
        return img;
    }
}
class FullGame {
    constructor(canvas) {
        this.loop = () => {
            if (this.index > 29) {
                this.index = 0;
            }
            this.player.start();
            this.player.moveRight();
            this.player.moveLeft();
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
            this.draw();
            requestAnimationFrame(this.loop);
        };
        this.collidesWithCanvasBorder = () => {
            for (let i = 0; i < this.projectiles.length; i++) {
                if (this.projectiles[i].getXPos() < -100) {
                    this.projectiles.splice(i, 1);
                    console.log("removed");
                }
            }
        };
        document.body.style.backgroundImage = "url('src/moving/back.png')";
        document.body.style.backgroundSize = "cover";
        this.canvas = canvas;
        this.ctx = this.canvas.getContext("2d");
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
        this.keyboardListener = new KeyboardListener();
        this.floor = [];
        this.floors = -40;
        this.platform = [];
        this.platformPos = [this.canvas.width / 20 * 1,
            this.canvas.width / 20 * 3,
            this.canvas.width / 20 * 5,
            this.canvas.width / 20 * 8,
            this.canvas.width / 20 * 12,
            this.canvas.width / 20 * 13,
            this.canvas.width / 20 * 15,];
        this.image = this.loadNewImage("src/moving/pics/Server.png");
        this.index = 0;
        this.player = new Player(canvas);
        this.frameIndex = 0;
        this.enemy = new Enemy(canvas);
        this.projectiles = [];
        this.createPlatform();
        this.loop();
    }
    createPlatform() {
        for (let i = 0; i < 10; i++) {
            this.platform.push(new Layout(this.platformPos[0] += 30, 500, "src/moving/pics/smallBrick.png"));
        }
        for (let i = 0; i < 8; i++) {
            this.platform.push(new Layout(this.platformPos[1] += 30, 300, "src/moving/pics/smallBrick.png"));
        }
        for (let i = 0; i < 12; i++) {
            this.platform.push(new Layout(this.platformPos[2] += 30, 100, "src/moving/pics/smallBrick.png"));
        }
        for (let i = 0; i < 4; i++) {
            this.platform.push(new Layout(this.platformPos[3] += 30, 500, "src/moving/pics/smallBrick.png"));
        }
        for (let i = 0; i < 12; i++) {
            this.platform.push(new Layout(this.platformPos[4] += 30, 300, "src/moving/pics/smallBrick.png"));
        }
        for (let i = 0; i < 8; i++) {
            this.platform.push(new Layout(this.platformPos[6] += 30, 100, "src/moving/pics/smallBrick.png"));
        }
        for (let i = 0; i < 8; i++) {
            this.platform.push(new Layout(this.platformPos[5] += 30, 500, "src/moving/pics/smallBrick.png"));
        }
        for (let i = 0; i < 100; i++) {
            this.floor.push(new Layout(this.floors += 40, this.canvas.height * 20 / 21, "src/moving/pics/brick.png"));
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
class Layout extends GameEntity {
    constructor(xPos, yPos, imageUrl) {
        super(xPos, yPos);
        this.image = this.loadNewImage(imageUrl);
    }
}
class Player {
    constructor(canvas) {
        this.moveLeft = () => {
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
        };
        this.moveRight = () => {
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
        };
        this.jump = () => {
            if (this.keyboard.isKeyDown(32) === true) {
                this.ypos = this.ypos - 20;
                this.drawing(this.array[1]);
                if (this.ypos <= this.canvas.height * 4 / 10) {
                    this.ypos = this.canvas.height * 4 / 10;
                    this.ypos = this.ypos + 20;
                    this.keyboard.isKeyDown(32) === false;
                }
            }
            if (this.keyboard.isKeyDown(32) === false) {
                this.ypos = this.ypos + 20;
                if (this.ypos > this.canvas.height * 8 / 10) {
                    this.ypos = this.canvas.height * 8 / 10;
                }
            }
        };
        this.start = () => {
            if (this.keyboard.isKeyDown(32) === false && this.keyboard.isKeyDown(39) === false && this.keyboard.isKeyDown(37) === false) {
                this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
                this.ctx.drawImage(this.array[0], this.xpos, this.ypos);
                this.jump();
            }
        };
        this.loadNewImage = (source) => {
            const img = new Image();
            img.src = source;
            return img;
        };
        this.drawing = (image) => {
            this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
            this.ctx.drawImage(image, this.xpos, this.ypos);
        };
        this.getXPos = () => {
            return this.xpos;
        };
        this.getyPos = () => {
            return this.xpos;
        };
        this.canvas = canvas;
        this.xpos = this.canvas.width / 10;
        this.ypos = this.canvas.height * 8 / 10;
        this.ctx = this.canvas.getContext('2d');
        this.keyboard = new KeyboardListener;
        this.array = [this.loadNewImage("src/moving/PlayerRight/walk 1.png"), this.loadNewImage("src/moving/PlayerRight/walk 2.png"), this.loadNewImage("src/moving/PlayerRight/walk 3.png"), this.loadNewImage("src/moving/PlayerRight/walk 4.png"), this.loadNewImage("src/moving/PlayerRight/walk 5.png"), this.loadNewImage("src/moving/PlayerRight/walk 6.png"), this.loadNewImage("src/moving/PlayerRight/walk 7.png")];
        this.leftArray = [this.loadNewImage("src/moving/PlayerLeft/walk 1.png"), this.loadNewImage("src/moving/PlayerLeft/walk 2.png"), this.loadNewImage("src/moving/PlayerLeft/walk 3.png"), this.loadNewImage("src/moving/PlayerLeft/walk 4.png"), this.loadNewImage("src/moving/PlayerLeft/walk 5.png"), this.loadNewImage("src/moving/PlayerLeft/walk 6.png"), this.loadNewImage("src/moving/PlayerLeft/walk 7.png")];
        this.index = 0;
        this.ctx.drawImage(this.array[1], this.xpos, this.ypos);
    }
}
class Projectile {
    constructor(canvas) {
        this.spawn = () => {
            this.ctx.drawImage(this.image, this.xPos, this.yPos);
        };
        this.move = () => {
            this.ctx.clearRect(this.xPos, this.yPos, 60, 60);
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
        this.enemy = new Enemy(canvas);
        this.xPos = this.enemy.getEnemyXPos();
        this.yPos = this.enemy.getEnemyYPos();
        this.ctx = this.canvas.getContext("2d");
        this.image = this.loadNewImage("src/moving/pics/objects/enemy.png");
    }
    loadNewImage(source) {
        const img = new Image();
        img.src = source;
        return img;
    }
}
//# sourceMappingURL=app.js.map