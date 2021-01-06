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
        this.moveEnemy = () => {
            this.yPos = this.yPos + this.speed;
            if (this.yPos >= this.canvas.height - this.image.height - 10) {
                this.speed = -this.speed;
            }
            if (this.yPos <= 1 + this.image.height + 10) {
                this.speed = -this.speed;
            }
            return this.yPos;
        };
        this.draw = () => {
            this.ctx.drawImage(this.image, this.xPos, this.yPos);
        };
        this.getEnemyXPos = () => {
            return this.xPos;
        };
        this.getEnemyYPos = () => {
            return this.yPos;
        };
        this.setEnemyYPos = (number) => {
            this.yPos + number;
        };
        this.canvas = canvas;
        this.image = this.loadNewImage("src/moving/pics/players/enemy.png");
        this.ctx = this.canvas.getContext("2d");
        this.xPos = (this.canvas.width * 5) / 6;
        this.yPos = this.canvas.height / 2;
        this.speed = 2;
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
            this.enemy.moveEnemy();
        };
        this.collidesWithCanvasBorder = () => {
            for (let i = 0; i < this.projectiles.length; i++) {
                if (this.projectiles[i].getXPos() < -100) {
                    this.projectiles.splice(i, 1);
                    console.log("removed");
                }
            }
        };
        this.getFrameIndex = () => {
            return this.frameIndex;
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
        this.platformPos = [
            (this.canvas.width / 20) * 1,
            (this.canvas.width / 20) * 3,
            (this.canvas.width / 20) * 5,
            (this.canvas.width / 20) * 8,
            (this.canvas.width / 20) * 12,
            (this.canvas.width / 20) * 13,
            (this.canvas.width / 20) * 15,
        ];
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
            this.platform.push(new Layout((this.platformPos[0] += 30), (this.canvas.height / 20) * 14, "src/moving/pics/smallBrick.png"));
        }
        for (let i = 0; i < 8; i++) {
            this.platform.push(new Layout((this.platformPos[1] += 30), (this.canvas.height / 20) * 8, "src/moving/pics/smallBrick.png"));
        }
        for (let i = 0; i < 12; i++) {
            this.platform.push(new Layout((this.platformPos[2] += 30), (this.canvas.height / 20) * 3, "src/moving/pics/smallBrick.png"));
        }
        for (let i = 0; i < 4; i++) {
            this.platform.push(new Layout((this.platformPos[3] += 30), (this.canvas.height / 20) * 14, "src/moving/pics/smallBrick.png"));
        }
        for (let i = 0; i < 12; i++) {
            this.platform.push(new Layout((this.platformPos[4] += 30), (this.canvas.height / 20) * 8, "src/moving/pics/smallBrick.png"));
        }
        for (let i = 0; i < 8; i++) {
            this.platform.push(new Layout((this.platformPos[6] += 30), (this.canvas.height / 20) * 3, "src/moving/pics/smallBrick.png"));
        }
        for (let i = 0; i < 8; i++) {
            this.platform.push(new Layout((this.platformPos[5] += 30), (this.canvas.height / 20) * 14, "src/moving/pics/smallBrick.png"));
        }
        for (let i = 0; i < 100; i++) {
            this.floor.push(new Layout((this.floors += 40), (this.canvas.height * 20) / 21, "src/moving/pics/brick.png"));
        }
    }
    draw() {
        this.floor.forEach((element) => {
            element.draw(this.ctx);
        });
        this.platform.forEach((element) => {
            element.draw(this.ctx);
        });
        this.ctx.drawImage(this.image, (this.canvas.width / 20) * 18, (this.canvas.height / 20) * 0.8);
        this.ctx.drawImage(this.image, (this.canvas.width / 20) * 17.5, (this.canvas.height / 20) * 0.8);
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
        this.jumpLoop = () => {
            this.jumpIndex++;
            requestAnimationFrame(this.jumpLoop);
            console.log(this.jumpIndex);
        };
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
                if (this.xpos === (this.canvas.width * 5) / 5) {
                    this.xpos = 0;
                }
                this.xpos = this.xpos + 4;
            }
            this.jump();
        };
        this.jump = () => {
            this.walkOnPlatform();
            if (this.keyboard.isKeyDown(32) === true && this.jumpIndex > 60) {
                this.ypos = this.ypos - 200;
                this.drawing(this.array[1]);
                this.jumpIndex = 0;
            }
            if (this.keyboard.isKeyDown(32) === false) {
                this.ypos = this.ypos + 10;
                if (this.ypos > (this.canvas.height * 20) / 21 - 105) {
                    this.ypos = (this.canvas.height * 20) / 21 - 105;
                }
            }
        };
        this.walkOnPlatform = () => {
            if (this.xpos > (this.canvas.width / 20) * 1 &&
                this.xpos < this.canvas.width / 20 + 300 &&
                this.ypos < (this.canvas.height / 20) * 12 &&
                this.ypos > (this.canvas.height / 20) * 10.95) {
                console.log("it works");
                this.ypos = (this.canvas.height / 20) * 10.94;
            }
            if (this.xpos > (this.canvas.width / 20) * 3 &&
                this.xpos < (this.canvas.width / 20) * 3 + 240 &&
                this.ypos < (this.canvas.height / 20) * 6 &&
                this.ypos > (this.canvas.height / 20) * 4.95) {
                console.log("it works");
                this.ypos = (this.canvas.height / 20) * 4.94;
            }
            if (this.xpos > (this.canvas.width / 20) * 5 &&
                this.xpos < (this.canvas.width / 20) * 5 + 360 &&
                this.ypos < (this.canvas.height / 20) * 1 &&
                this.ypos > (this.canvas.height / 20) * -0.05) {
                console.log("it works");
                this.ypos = (this.canvas.height / 20) * -0.06;
            }
            if (this.xpos > (this.canvas.width / 20) * 8 &&
                this.xpos < (this.canvas.width / 20) * 8 + 120 &&
                this.ypos < (this.canvas.height / 20) * 12 &&
                this.ypos > (this.canvas.height / 20) * 10.95) {
                console.log("it works");
                this.ypos = (this.canvas.height / 20) * 10.94;
            }
            if (this.xpos > (this.canvas.width / 20) * 12 &&
                this.xpos < (this.canvas.width / 20) * 12 + 360 &&
                this.ypos < (this.canvas.height / 20) * 6 &&
                this.ypos > (this.canvas.height / 20) * 4.95) {
                console.log("it works");
                this.ypos = (this.canvas.height / 20) * 4.94;
            }
            if (this.xpos > (this.canvas.width / 20) * 15 &&
                this.xpos < (this.canvas.width / 20) * 15 + 240 &&
                this.ypos < (this.canvas.height / 20) * 1 &&
                this.ypos > (this.canvas.height / 20) * -0.05) {
                console.log("it works");
                this.ypos = (this.canvas.height / 20) * -0.06;
            }
            if (this.xpos > (this.canvas.width / 20) * 13 &&
                this.xpos < (this.canvas.width / 20) * 13 + 240 &&
                this.ypos < (this.canvas.height / 20) * 12 &&
                this.ypos > (this.canvas.height / 20) * 10.95) {
                console.log("it works");
                this.ypos = (this.canvas.height / 20) * 10.94;
            }
        };
        this.start = () => {
            if (this.keyboard.isKeyDown(32) === false &&
                this.keyboard.isKeyDown(39) === false &&
                this.keyboard.isKeyDown(37) === false) {
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
        this.xpos = this.canvas.width / 50;
        this.ypos = this.canvas.height / this.canvas.height;
        this.ctx = this.canvas.getContext("2d");
        this.keyboard = new KeyboardListener();
        this.array = [
            this.loadNewImage("src/moving/PlayerRight/walk 1.png"),
            this.loadNewImage("src/moving/PlayerRight/walk 2.png"),
            this.loadNewImage("src/moving/PlayerRight/walk 3.png"),
            this.loadNewImage("src/moving/PlayerRight/walk 4.png"),
            this.loadNewImage("src/moving/PlayerRight/walk 5.png"),
            this.loadNewImage("src/moving/PlayerRight/walk 6.png"),
            this.loadNewImage("src/moving/PlayerRight/walk 7.png"),
        ];
        this.leftArray = [
            this.loadNewImage("src/moving/PlayerLeft/walk 1.png"),
            this.loadNewImage("src/moving/PlayerLeft/walk 2.png"),
            this.loadNewImage("src/moving/PlayerLeft/walk 3.png"),
            this.loadNewImage("src/moving/PlayerLeft/walk 4.png"),
            this.loadNewImage("src/moving/PlayerLeft/walk 5.png"),
            this.loadNewImage("src/moving/PlayerLeft/walk 6.png"),
            this.loadNewImage("src/moving/PlayerLeft/walk 7.png"),
        ];
        this.index = 0;
        this.ctx.drawImage(this.array[1], this.xpos, this.ypos);
        this.jumpIndex = 0;
        this.jumpLoop();
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
        this.yPos = this.enemy.moveEnemy();
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