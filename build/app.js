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
class Character2 extends Character {
    constructor(xPos, yPos) {
        super(xPos, yPos, "./assets/img/walk 1.png");
    }
}
class Character3 extends Character {
    constructor(xPos, yPos) {
        super(xPos, yPos, "./assets/img/walk 1.png");
    }
}
class Game {
    constructor(canvas) {
        this.loop = () => {
            this.draw();
            requestAnimationFrame(this.loop);
        };
        this.mouseHandler = (event) => {
            console.log(`xPos ${event.clientX}, yPos ${event.clientY}`);
            for (let i = 0; i < this.rectangles.length; i++) {
                if (event.clientX >= this.rectangles[0].getXPos() &&
                    event.clientX < this.rectangles[0].getXPos() + this.rectangles[0].getWidth() &&
                    event.clientY >= this.rectangles[0].getYPos() &&
                    event.clientY <= this.rectangles[0].getYPos() + this.rectangles[0].getHeight()) {
                    console.log("daasd");
                    this.stage = "showCharacters";
                }
                for (let i = 0; i < this.characters.length; i++) {
                    if (event.clientX >= this.characters[i].getXPos() &&
                        event.clientX < this.characters[i].getXPos() + this.characters[i].getWidth() &&
                        event.clientY >= this.characters[i].getYPos() &&
                        event.clientY <= this.characters[i].getYPos() + this.characters[i].getHeight()) {
                        console.log("dsadsa");
                        this.stage = "characterChosen";
                    }
                }
            }
            ;
        };
        this.canvas = canvas;
        this.ctx = this.canvas.getContext("2d");
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
        this.rectangles = [
            new Rectangles(575, 250, "red", 70, 400),
            new Rectangles(670, 540, "red", 100, 200),
        ];
        this.characters = [
            new Character1(530, 350),
            new Character2(730, 350),
            new Character3(930, 350)
        ];
        document.addEventListener("click", this.mouseHandler);
        this.loop();
    }
    draw() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        for (let i = 0; i < this.rectangles.length; i++) {
            this.rectangles[i].draw(this.ctx);
        }
        this.writeTextToCanvas("Instructions:", 40, this.canvas.width / 2, 50);
        this.writeTextToCanvas("Try to reach the computer and solve the mini-game.", 25, this.canvas.width / 2, 100);
        this.writeTextToCanvas("Watch out for enemies!!", 25, this.canvas.width / 2, 150);
        this.writeTextToCanvas("Pick your character", 25, this.canvas.width / 2, 290);
        this.writeTextToCanvas("Start", 35, this.canvas.width / 2, 600);
        if (this.stage == "showCharacters") {
            for (let i = 0; i < this.characters.length; i++)
                this.characters[i].draw(this.ctx);
        }
        if (this.stage == "characterChosen") {
            this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
            this.writeTextToCanvas("You have chosen your character!", 40, this.canvas.width / 2, this.canvas.height / 2);
        }
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
let init = () => new Game(document.getElementById("canvas"));
window.addEventListener("load", init);
//# sourceMappingURL=app.js.map