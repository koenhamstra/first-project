let init = () => new CompleetGame(document.getElementById("canvas"));
window.addEventListener("load", init);
class ClassLoader {
    constructor(canvas) {
        this.done = () => {
            return false;
        };
        this.draw = () => {
        };
    }
}
class Begin extends ClassLoader {
    constructor(canvas) {
        super(canvas);
        this.draw = () => {
            this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
            for (let i = 0; i < this.rectangles.length; i++) {
                this.rectangles[i].draw(this.ctx);
            }
            this.writeTextToCanvas("Instructions:", 40, this.canvas.width / 2, 50, "center");
            this.writeTextToCanvas("Try to reach the computer and solve the mini-game.", 25, this.canvas.width / 2, 100, "center");
            this.writeTextToCanvas("Watch out for enemies!!", 25, this.canvas.width / 2, 150, "center");
            this.writeTextToCanvas("Pick your character", 25, this.rectangles[0].getXPos() + this.rectangles[0].getWidth() / 2, this.rectangles[0].getYPos() + this.rectangles[0].getHeight() * 1.2 / 2, "center");
            if (this.stage === "showCharacters") {
                for (let i = 0; i < this.characters.length; i++)
                    this.characters[i].draw(this.ctx);
            }
        };
        this.done = () => {
            if (this.stage === "characterChosen") {
                this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
                document.body.style.backgroundImage = "url('assets/img/hacker-background.jpg')";
                document.body.style.backgroundSize = "cover";
                return true;
            }
            else {
                return false;
            }
        };
        this.mouseHandler = (event) => {
            for (let i = 0; i < this.rectangles.length; i++) {
                if (event.clientX >= this.rectangles[0].getXPos() &&
                    event.clientX < this.rectangles[0].getXPos() + this.rectangles[0].getWidth() &&
                    event.clientY >= this.rectangles[0].getYPos() &&
                    event.clientY <= this.rectangles[0].getYPos() + this.rectangles[0].getHeight()) {
                    this.stage = "showCharacters";
                }
                for (let i = 0; i < this.characters.length; i++) {
                    if (event.clientX >= this.characters[i].getXPos() &&
                        event.clientX < this.characters[i].getXPos() + this.characters[i].getWidth() &&
                        event.clientY >= this.characters[i].getYPos() &&
                        event.clientY <= this.characters[i].getYPos() + this.characters[i].getHeight()) {
                        this.stage = "characterChosen";
                    }
                }
            }
            return this.stage;
        };
        this.canvas = canvas;
        this.ctx = this.canvas.getContext("2d");
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
        this.rectangles = [
            new Rectangles(canvas.width * 0.77 / 2, canvas.height * 1.5 / 2, "red", 70, 300),
        ];
        this.characters = [
            new Character1(canvas.width * 0.85 / 2, 350)
        ];
        document.addEventListener("click", this.mouseHandler);
    }
    writeTextToCanvas(text, fontSize = 20, xCoordinate, yCoordinate, alignment = "center", color = "red") {
        this.ctx.font = `${fontSize}px Minecraft`;
        this.ctx.fillStyle = color;
        this.ctx.textAlign = alignment;
        this.ctx.fillText(text, xCoordinate, yCoordinate);
    }
}
class Character {
    constructor(xPos, yPos, image) {
        this.draw = (ctx) => {
            ctx.drawImage(this.image, this.xPos, this.yPos);
        };
        this.xPos = xPos;
        this.yPos = yPos;
        this.image = this.loadNewImage(image);
    }
    getXPos() {
        return this.xPos;
    }
    getYPos() {
        return this.yPos;
    }
    getWidth() {
        return this.image.width;
    }
    getHeight() {
        return this.image.height;
    }
    loadNewImage(source) {
        const img = new Image();
        img.src = source;
        return img;
    }
}
class Character1 extends Character {
    constructor(xPos, yPos) {
        super(xPos, yPos, "./assets/img/walk 1.png");
    }
}
class CompleetGame {
    constructor(canvas) {
        this.loop = () => {
            if (this.classLoader[this.level].done() === true) {
                console.log("ásdsd");
                this.level++;
            }
            this.classLoader[this.level].draw();
            requestAnimationFrame(this.loop);
        };
        this.canvas = canvas;
        this.ctx = this.canvas.getContext("2d");
        this.classLoader = [new Go(canvas), new Begin(canvas), new Start(canvas), new FullMarioGame(canvas, "assets/img/background.jpg"), new PassWordGame(canvas)];
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
        this.level = 0;
        this.loop();
    }
}
class Go extends ClassLoader {
    constructor(canvas) {
        super(canvas);
        this.draw = () => {
            this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
            this.rectangles.draw(this.ctx);
            this.writeTextToCanvas("GO", 35, this.rectangles.getXPos() + this.rectangles.getWidth() / 2, this.rectangles.getYPos() + this.rectangles.getHeight() * 1.2 / 2, "center", "red");
        };
        this.mouseHandler = (event) => {
            if (event.clientX >= this.rectangles.getXPos() &&
                event.clientX < this.rectangles.getXPos() + this.rectangles.getWidth() &&
                event.clientY >= this.rectangles.getYPos() &&
                event.clientY <= this.rectangles.getYPos() + this.rectangles.getHeight()) {
                this.state = "go";
            }
            else {
                this.state = "no";
            }
        };
        this.done = () => {
            if (this.state === "go") {
                this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
                document.body.style.backgroundImage = "url('assets/img/hacker-background.jpg')";
                document.body.style.backgroundSize = "cover";
                return true;
            }
            else {
                return false;
            }
        };
        this.canvas = canvas;
        this.ctx = this.canvas.getContext("2d");
        this.state = "";
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
        document.body.style.backgroundImage = "url('src/moving/pics/hacker.jpg')";
        document.body.style.backgroundSize = "cover";
        this.rectangles = new Rectangles(canvas.width * 0.77 / 2, canvas.height * 1.5 / 2, "red", 70, 200);
        document.addEventListener("click", this.mouseHandler);
        this.draw();
    }
    writeTextToCanvas(text, fontSize = 20, xCoordinate, yCoordinate, alignment = "center", color = "red") {
        this.ctx.font = `${fontSize}px Minecraft`;
        this.ctx.fillStyle = color;
        this.ctx.textAlign = alignment;
        this.ctx.fillText(text, xCoordinate, yCoordinate);
    }
}
class Rectangles {
    constructor(xPos, yPos, color, height, width) {
        this.height = height;
        this.width = width;
        this.xPos = xPos;
        this.yPos = yPos;
        this.color = color;
    }
    draw(ctx) {
        ctx.beginPath();
        ctx.strokeStyle = this.color;
        ctx.lineWidth = 5;
        ctx.strokeRect(this.xPos, this.yPos, this.width, this.height);
    }
    getXPos() {
        return this.xPos;
    }
    getYPos() {
        return this.yPos;
    }
    getWidth() {
        return this.width;
    }
    getHeight() {
        return this.height;
    }
}
class Start extends ClassLoader {
    constructor(canvas) {
        super(canvas);
        this.draw = () => {
            this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
            this.rectangles.draw(this.ctx);
            this.writeTextToCanvas("Start", 35, this.rectangles.getXPos() + this.rectangles.getWidth() / 2, this.rectangles.getYPos() + this.rectangles.getHeight() * 1.2 / 2, "center");
        };
        this.mouseHandler = (event) => {
            if (event.clientX > this.rectangles.getXPos() &&
                event.clientX < this.rectangles.getXPos() + this.rectangles.getWidth() &&
                event.clientY > this.rectangles.getYPos() &&
                event.clientY < this.rectangles.getYPos() + this.rectangles.getHeight()) {
                this.state = "start";
            }
            else {
                this.state = "nothing";
            }
            return this.state;
        };
        this.done = () => {
            if (this.state === "start") {
                this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
                document.body.style.backgroundImage = "url('src/moving/back.png')";
                document.body.style.backgroundSize = "cover";
                return true;
            }
            return false;
        };
        this.canvas = canvas;
        this.ctx = this.canvas.getContext("2d");
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
        this.rectangles = new Rectangles(canvas.width * 0.77 / 2, canvas.height * 1.5 / 2, "red", 70, 200);
        document.addEventListener("click", this.mouseHandler);
        this.draw();
    }
    writeTextToCanvas(text, fontSize = 20, xCoordinate, yCoordinate, alignment = "center", color = "red") {
        this.ctx.font = `${fontSize}px Minecraft`;
        this.ctx.fillStyle = color;
        this.ctx.textAlign = alignment;
        this.ctx.fillText(text, xCoordinate, yCoordinate);
    }
}
class ComputerScreen {
    constructor(image, xPos, yPos) {
        this.getXPos = () => {
            return this.xPos;
        };
        this.getYPos = () => {
            return this.yPos;
        };
        this.getWidth = () => {
            return this.image.width;
        };
        this.getHeight = () => {
            return this.image.height;
        };
        this.image = this.loadNewImage(image);
        this.xPos = xPos;
        this.yPos = yPos;
    }
    loadNewImage(source) {
        const img = new Image();
        img.src = source;
        return img;
    }
    draw(ctx) {
        ctx.drawImage(this.image, this.xPos, this.yPos, 450, 350);
    }
}
class PassWordGame extends ClassLoader {
    constructor(canvas) {
        super(canvas);
        this.draw = () => {
            this.writeTextToCanvas("Password", 40, this.canvas.width / 2, this.canvas.height / 5, "center", "red");
            this.writeTextToCanvas("Press 'shift' if you want to try again", 25, this.canvas.width / 2, this.canvas.height / 2.7);
            this.reload();
            this.drawScreen(this.ctx);
        };
        this.drawConditions = () => {
            if (this.trueOrFalse == "true") {
                this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height / 2 + 140);
                this.writeTextToCanvas("There is a capital letter", 50, this.canvas.width / 2, this.canvas.height / 2 + 120);
            }
            if (this.trueOrFalse == "false") {
                this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height / 2 + 140);
                this.writeTextToCanvas("There is no capital letter", 50, this.canvas.width / 2, this.canvas.height / 2 + 120);
            }
            if (this.numberOrNot == "yes") {
                this.ctx.clearRect(0, this.canvas.height / 2 + 150, this.canvas.width, this.canvas.height);
                this.writeTextToCanvas("There is a number", 50, this.canvas.width / 2, this.canvas.height / 2 + 200);
            }
            if (this.numberOrNot == "no") {
                this.ctx.clearRect(0, this.canvas.height / 2 + 150, this.canvas.width, this.canvas.height);
                this.writeTextToCanvas("There is no number", 50, this.canvas.width / 2, this.canvas.height / 2 + 200);
            }
            if (this.shortOrNot == "short") {
                this.ctx.clearRect(0, this.canvas.height / 2 + 200, this.canvas.width, this.canvas.height);
                this.writeTextToCanvas("The password should have at least 6 characters", 50, this.canvas.width / 2, this.canvas.height / 2 + 270);
            }
            if (this.shortOrNot == "not") {
                this.ctx.clearRect(0, this.canvas.height / 2 + 200, this.canvas.width, this.canvas.height);
                this.writeTextToCanvas("The password is long enough", 50, this.canvas.width / 2, this.canvas.height / 2 + 270);
            }
        };
        this.checkPasswrod = () => {
            const password = document.getElementById("password").value;
            for (let i = 0; i < password.length; i++) {
                console.log(password[i]);
                if (password.length > 5) {
                    this.shortOrNot = "not";
                    this.drawConditions();
                }
                if (password[i] === "0" || password[i] === "1" || password[i] === "2" || password[i] === "3" || password[i] === "4" || password[i] === "5" || password[i] === "6" || password[i] === "7" || password[i] === "8" || password[i] === "9") {
                    console.log("number");
                    this.numberOrNot = "yes";
                    this.drawConditions();
                }
                if (password[i] === "Z" || password[i] === "X" || password[i] === "C" || password[i] === "V" || password[i] === "B" || password[i] === "N" || password[i] === "M" || password[i] === "A" || password[i] === "S" || password[i] === "D" || password[i] === "F" || password[i] === "G" || password[i] === "H" || password[i] === "J" || password[i] === "K" || password[i] === "L" || password[i] === "Q" || password[i] === "W" || password[i] === "E" || password[i] === "R" || password[i] === "T" || password[i] === "Y" || password[i] === "U" || password[i] === "I" || password[i] === "O" || password[i] === "P") {
                    this.trueOrFalse = "true";
                    console.log("capital letter");
                    this.drawConditions();
                }
                else if (password[i] === password[i].toLowerCase()) {
                    console.log(" no capital letter");
                    this.drawConditions();
                }
            }
        };
        this.canvas = canvas;
        this.ctx = this.canvas.getContext("2d");
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
        this.trueOrFalse = "false";
        this.numberOrNot = "no";
        this.shortOrNot = "short";
        const btn = document.createElement("BUTTON");
        btn.innerHTML = "Check";
        document.body.appendChild(btn);
        btn.style.top = `30%`;
        btn.style.position = "absolute";
        btn.style.left = `54%`;
        btn.style.margin = "-25px 0 0 -25px";
        const input = document.createElement("INPUT");
        input.innerHTML = "";
        document.body.appendChild(input);
        input.style.top = `30%`;
        input.style.position = "absolute";
        input.style.left = `44%`;
        input.style.margin = "-25px 0 0 -25px";
        this.keyListener = new KeyboardListener;
        this.screen = new ComputerScreen("assets/img/screen.png", this.canvas.width / 2.8, this.canvas.height / 15);
    }
    drawScreen(ctx) {
        this.screen.draw(ctx);
    }
    reload() {
        if (this.keyListener.isKeyDown(16)) {
            location.reload();
        }
    }
    writeTextToCanvas(text, fontSize = 20, xCoordinate, yCoordinate, alignment = "center", color = "#ffe6ff") {
        this.ctx.font = `${fontSize}px Fantasy`;
        this.ctx.fillStyle = color;
        this.ctx.textAlign = alignment;
        this.ctx.fillText(text, xCoordinate, yCoordinate);
    }
}
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
        this.canvas = canvas;
        this.image = this.loadNewImage("src/moving/pics/players/enemy.png");
        this.ctx = this.canvas.getContext("2d");
        this.xPos = (this.canvas.width / 20) * 17.5;
        this.yPos = this.canvas.height / 2;
        this.speed = 2;
    }
    loadNewImage(source) {
        const img = new Image();
        img.src = source;
        return img;
    }
}
class FullMarioGame extends ClassLoader {
    constructor(canvas, background) {
        super(canvas);
        this.checkHealthBar = () => {
            if (this.player.getHealth() === 3) {
                this.healthBar = this.loadNewImage("src/moving/pics/Health Bar Full.png");
            }
            else if (this.player.getHealth() === 2) {
                this.healthBar = this.loadNewImage("src/moving/pics/Health Bar Two Thirds.png");
            }
            else if (this.player.getHealth() === 1) {
                this.healthBar = this.loadNewImage("src/moving/pics/Health Bar One Third.png");
            }
            else {
                this.player.setXPos(500);
                this.writeTextToCanvas("GAME OVER", 50, this.canvas.width / 2, this.canvas.height / 2);
                this.healthBar = this.loadNewImage("");
            }
        };
        this.generateProjectile = () => {
            let projectileDirection = this.randomNumber(1, 2);
            if (projectileDirection === 1) {
                return -3;
            }
            else {
                return 3;
            }
        };
        this.collidesWithCanvasBorder = () => {
            for (let i = 0; i < this.projectiles.length; i++) {
                if (this.projectiles[i].getXPos() < -100) {
                    this.projectiles.splice(i, 1);
                }
            }
        };
        this.collidesWithProjectile = (player) => {
            for (let i = 0; i < this.projectiles.length; i++) {
                if (this.projectiles[i].getXPos() > player.getXPos() &&
                    this.projectiles[i].getXPos() <
                        player.getXPos() + player.getImage().width &&
                    this.projectiles[i].getYPos() > player.getYPos() &&
                    this.projectiles[i].getYPos() <
                        player.getYPos() + player.getImage().height) {
                    this.projectiles.splice(i, 1);
                    console.log(this.player.setHealth(1));
                }
            }
        };
        this.collidesWithServer = () => {
            if (this.canvas.width * 0.84 < this.player.getXPos() &&
                this.canvas.width * 0.84 + 100 > this.player.getXPos() &&
                0 < this.player.getYPos() &&
                this.canvas.height * 0.1 > this.player.getYPos()) {
                this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
                this.writeTextToCanvas("You've reached the server", 50, this.canvas.width / 2, this.canvas.height / 2);
                this.gameState = "done";
            }
        };
        this.draw = () => {
            this.frameIndex++;
            this.player.start();
            this.player.moveRight();
            this.player.moveLeft();
            this.collidesWithProjectile(this.player);
            this.collidesWithCanvasBorder();
            this.collidesWithServer();
            this.checkHealthBar();
            this.enemy.draw();
            this.done();
            if (this.frameIndex % 60 === 0) {
                console.log(`X = ${this.player.getXPos()}  Y = ${this.player.getYPos()}`);
            }
            if (this.frameIndex % 70 === 0) {
                this.projectiles.push(new Projectile(this.canvas, this.enemy.getEnemyXPos(), this.enemy.moveEnemy(), this.generateProjectile()));
                for (let i = 0; i < this.projectiles.length; i++) {
                    this.projectiles[i].spawn();
                }
            }
            for (let i = 0; i < this.projectiles.length; i++) {
                this.projectiles[i].move();
            }
            this.floor.forEach((element) => {
                element.draw(this.ctx);
            });
            this.platform.forEach((element) => {
                element.draw(this.ctx);
            });
            this.ctx.drawImage(this.healthBar, 50, 50);
            this.ctx.drawImage(this.server, (this.canvas.width / 20) * 18, this.canvas.height * 0.04);
            this.ctx.drawImage(this.server, (this.canvas.width / 20) * 17.5, this.canvas.height * 0.04);
            this.enemy.moveEnemy();
            for (let i = 0; i < this.projectiles.length; i++) {
                this.projectiles[i].moveProjectiles();
            }
            if (this.index > 29) {
                this.index = 0;
            }
        };
        this.done = () => {
            if (this.gameState === "done") {
                document.body.style.backgroundImage = `url(${this.nextBackGround})`;
                document.body.style.backgroundSize = "cover";
                this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
                return true;
            }
            return false;
        };
        this.canvas = canvas;
        this.ctx = this.canvas.getContext("2d");
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
        this.nextBackGround = background;
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
        this.server = this.loadNewImage("src/moving/pics/Server.png");
        this.index = 0;
        this.player = new Player(canvas);
        this.frameIndex = 0;
        this.enemy = new Enemy(canvas);
        this.projectiles = [];
        this.createPlatform();
        this.gameState = "begin";
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
class KeyboardListener {
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
KeyboardListener.KEY_ENTER = 13;
KeyboardListener.KEY_SHIFT = 16;
KeyboardListener.KEY_CTRL = 17;
KeyboardListener.KEY_ALT = 18;
KeyboardListener.KEY_ESC = 27;
KeyboardListener.KEY_SPACE = 32;
KeyboardListener.KEY_LEFT = 37;
KeyboardListener.KEY_UP = 38;
KeyboardListener.KEY_RIGHT = 39;
KeyboardListener.KEY_DOWN = 40;
KeyboardListener.KEY_DEL = 46;
KeyboardListener.KEY_1 = 49;
KeyboardListener.KEY_2 = 50;
KeyboardListener.KEY_3 = 51;
KeyboardListener.KEY_4 = 52;
KeyboardListener.KEY_5 = 53;
KeyboardListener.KEY_6 = 54;
KeyboardListener.KEY_7 = 55;
KeyboardListener.KEY_8 = 56;
KeyboardListener.KEY_9 = 57;
KeyboardListener.KEY_0 = 58;
KeyboardListener.KEY_A = 65;
KeyboardListener.KEY_B = 66;
KeyboardListener.KEY_C = 67;
KeyboardListener.KEY_D = 68;
KeyboardListener.KEY_E = 69;
KeyboardListener.KEY_F = 70;
KeyboardListener.KEY_G = 71;
KeyboardListener.KEY_H = 72;
KeyboardListener.KEY_I = 73;
KeyboardListener.KEY_J = 74;
KeyboardListener.KEY_K = 75;
KeyboardListener.KEY_L = 76;
KeyboardListener.KEY_M = 77;
KeyboardListener.KEY_N = 78;
KeyboardListener.KEY_O = 79;
KeyboardListener.KEY_P = 80;
KeyboardListener.KEY_Q = 81;
KeyboardListener.KEY_R = 82;
KeyboardListener.KEY_S = 83;
KeyboardListener.KEY_T = 84;
KeyboardListener.KEY_U = 85;
KeyboardListener.KEY_V = 86;
KeyboardListener.KEY_W = 87;
KeyboardListener.KEY_X = 88;
KeyboardListener.KEY_Y = 89;
KeyboardListener.KEY_Z = 90;
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
                if (this.xpos === (this.canvas.width * 5) / 5) {
                    this.xpos = 0;
                }
                this.xpos = this.xpos + 4;
            }
            this.jump();
        };
        this.jump = () => {
            this.walkOnPlatform();
            if (this.keyboard.isKeyDown(32) === true) {
                this.ypos = this.ypos - 8;
                if (this.ypos < this.canvas.height - this.canvas.height - this.ypos) {
                    this.ypos = this.ypos + 8;
                }
                this.drawing(this.array[1]);
            }
            if (this.keyboard.isKeyDown(32) === false) {
                this.ypos = this.ypos + 8;
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
                this.ypos = (this.canvas.height / 20) * 10.94;
            }
            if (this.xpos > (this.canvas.width / 20) * 3 &&
                this.xpos < (this.canvas.width / 20) * 3 + 240 &&
                this.ypos < (this.canvas.height / 20) * 6 &&
                this.ypos > (this.canvas.height / 20) * 4.95) {
                this.ypos = (this.canvas.height / 20) * 4.94;
            }
            if (this.xpos > (this.canvas.width / 20) * 5 &&
                this.xpos < (this.canvas.width / 20) * 5 + 360 &&
                this.ypos < (this.canvas.height / 20) * 1 &&
                this.ypos > (this.canvas.height / 20) * -0.05) {
                this.ypos = (this.canvas.height / 20) * -0.06;
            }
            if (this.xpos > (this.canvas.width / 20) * 8 &&
                this.xpos < (this.canvas.width / 20) * 8 + 120 &&
                this.ypos < (this.canvas.height / 20) * 12 &&
                this.ypos > (this.canvas.height / 20) * 10.95) {
                this.ypos = (this.canvas.height / 20) * 10.94;
            }
            if (this.xpos > (this.canvas.width / 20) * 12 &&
                this.xpos < (this.canvas.width / 20) * 12 + 360 &&
                this.ypos < (this.canvas.height / 20) * 6 &&
                this.ypos > (this.canvas.height / 20) * 4.95) {
                this.ypos = (this.canvas.height / 20) * 4.94;
            }
            if (this.xpos > (this.canvas.width / 20) * 15 &&
                this.xpos < (this.canvas.width / 20) * 15 + 240 &&
                this.ypos < (this.canvas.height / 20) * 1 &&
                this.ypos > (this.canvas.height / 20) * -0.05) {
                this.ypos = (this.canvas.height / 20) * -0.06;
            }
            if (this.xpos > (this.canvas.width / 20) * 13 &&
                this.xpos < (this.canvas.width / 20) * 13 + 240 &&
                this.ypos < (this.canvas.height / 20) * 12 &&
                this.ypos > (this.canvas.height / 20) * 10.95) {
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
        this.getYPos = () => {
            return this.ypos;
        };
        this.getImage = () => {
            return this.array[1];
        };
        this.setHealth = (damage) => {
            this.health = this.health - damage;
            return this.health;
        };
        this.getHealth = () => {
            return this.health;
        };
        this.setXPos = (number) => {
            this.xpos = this.xpos + number;
        };
        this.canvas = canvas;
        this.xpos = this.canvas.width / 50;
        this.ypos = this.canvas.height * 0.9;
        this.ctx = this.canvas.getContext("2d");
        this.health = 3;
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
    }
}
class Projectile {
    constructor(canvas, xPos, yPos, verticalSpeed) {
        this.spawn = () => {
            this.ctx.drawImage(this.image, this.xPos, this.yPos);
        };
        this.move = () => {
            this.ctx.clearRect(this.xPos, this.yPos, 40, 40);
            this.ctx.drawImage(this.image, this.xPos, this.yPos);
            this.xPos -= this.horizontalSpeed;
        };
        this.moveProjectiles = () => {
            this.yPos = this.yPos + this.verticalSpeed;
            if (this.yPos >= this.canvas.height - this.image.height - 10) {
                this.verticalSpeed = -this.verticalSpeed;
            }
            if (this.yPos <= 1) {
                this.verticalSpeed = -this.verticalSpeed;
            }
            return this.yPos;
        };
        this.draw = () => {
            this.ctx.drawImage(this.image, this.xPos, this.yPos);
        };
        this.getXPos = () => {
            return this.xPos;
        };
        this.getYPos = () => {
            return this.yPos;
        };
        this.getImage = () => {
            return this.image;
        };
        this.canvas = canvas;
        this.ctx = this.canvas.getContext("2d");
        this.image = this.loadNewImage("src/moving/pics/objects/enemy.png");
        this.verticalSpeed = verticalSpeed;
        this.horizontalSpeed = 2;
        this.xPos = xPos;
        this.yPos = yPos;
    }
    loadNewImage(source) {
        const img = new Image();
        img.src = source;
        return img;
    }
}
//# sourceMappingURL=app.js.map