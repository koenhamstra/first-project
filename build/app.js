class Car {
    constructor(name, xPos, yPos, source) {
        this._xPosition = xPos;
        this._yPosition = yPos;
        this._name = name;
        this.image = this.loadNewImage(source);
    }
    setDistance(distanceRaced) {
        this._distance = distanceRaced;
    }
    smoothDistance() {
        this._xPosition += 1;
    }
    roughDistance() {
        this._xPosition += 100;
    }
    xPosition() {
        return this._xPosition;
    }
    stopTheCar() {
        this._xPosition += 0;
    }
    startPosition(carYPosition) {
        this._xPosition = 100;
        this._yPosition = carYPosition;
    }
    getDistance() {
        return 1400;
    }
    getxPostition() {
        return this._xPosition;
    }
    getyPostition() {
        return this._yPosition;
    }
    getName() {
        return this._name;
    }
    draw(ctx) {
        ctx.drawImage(this.image, this._xPosition, this._yPosition);
    }
    loadNewImage(source) {
        const img = new Image();
        img.src = source;
        return img;
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
        ctx.lineWidth = 10;
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
class Game {
    constructor(canvas) {
        this.loop = () => {
            this.gameState = "animate";
            this.draw();
            requestAnimationFrame(this.loop);
        };
        this.mouseHandler = (event) => {
            console.log(`xPos ${event.clientX}, yPos ${event.clientY}`);
            for (let i = 0; i < this.rectangles.length; i++) {
                if (this.numberOfQuestion === 1 && this.detectingRect(event, 1)) {
                    this.car2.roughDistance();
                    this.numberOfQuestion = 2;
                }
                if (this.numberOfQuestion === 2 && this.detectingRect(event, 0)) {
                    this.car2.roughDistance();
                    this.numberOfQuestion = 3;
                }
                if (this.numberOfQuestion === 3 && this.detectingRect(event, 2)) {
                    this.car2.roughDistance();
                }
            }
        };
        this.canvas = canvas;
        this.ctx = this.canvas.getContext("2d");
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
        this.car1 = new Car("Bullet", 100, 0, "assets/img/walk 1 (1).png");
        this.car2 = new Car("Greek Arrow", 100, 250, "assets/img/walk 1 (1).png");
        console.log(this.car1);
        this.rectangles = [
            new Rectangles(100, 600, "red", 70, 400),
            new Rectangles(570, 600, "red", 70, 400),
            new Rectangles(1100, 600, "red", 70, 400),
        ];
        document.addEventListener("click", this.mouseHandler);
        this.numberOfQuestion = 1;
        this.loop();
    }
    draw() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.car1.draw(this.ctx);
        this.car2.draw(this.ctx);
        for (let i = 0; i < this.rectangles.length; i++) {
            this.rectangles[i].draw(this.ctx);
        }
        if (this.numberOfQuestion === 1) {
            this.writeTextToCanvas("Which password is good?", 40, this.canvas.width / 2, 580, "center", "black");
            this.writeTextToCanvas("12345", 40, 300, 650, "center", "black");
            this.writeTextToCanvas("GoodPassword2020", 40, 770, 650, "center", "black");
            this.writeTextToCanvas("myname", 40, 1300, 650, "center", "black");
        }
        if (this.numberOfQuestion === 2) {
            this.writeTextToCanvas("How to protect your computer?", 40, this.canvas.width / 2, 580, "center", "black");
            this.writeTextToCanvas("Use firewall", 40, 300, 650, "center", "black");
            this.writeTextToCanvas("Be careless", 40, 770, 650, "center", "black");
            this.writeTextToCanvas("Do not use firewall", 40, 1300, 650, "center", "black");
        }
        if (this.numberOfQuestion === 3) {
            this.writeTextToCanvas("What do you do when you detect strange activity on your social media account?", 40, this.canvas.width / 2, 580, "center", "black");
            this.writeTextToCanvas("Nothing", 40, 300, 650, "center", "black");
            this.writeTextToCanvas("Change your password", 40, 770, 650, "center", "black");
            this.writeTextToCanvas("Sell your device", 40, 1300, 650, "center", "black");
        }
        if (this.numberOfQuestion === 4) {
            this.writeTextToCanvas("What do you do when you detect strange activity on your social media account?", 40, this.canvas.width / 2, 580, "center", "black");
            this.writeTextToCanvas("Nothing", 40, 300, 650, "center", "black");
            this.writeTextToCanvas("Change your password", 40, 770, 650, "center", "black");
            this.writeTextToCanvas("Sell your device", 40, 1300, 650, "center", "black");
        }
        if (this.numberOfQuestion === 5) {
            this.writeTextToCanvas("What do you do when you detect strange activity on your social media account?", 40, this.canvas.width / 2, 580, "center", "black");
            this.writeTextToCanvas("Nothing", 40, 300, 650, "center", "black");
            this.writeTextToCanvas("Change your password", 40, 770, 650, "center", "black");
            this.writeTextToCanvas("Sell your device", 40, 1300, 650, "center", "black");
        }
        if (this.gameState === "animate") {
            console.log(this.car1.xPosition());
            console.log(this.car1.getDistance());
            if (this.car1.xPosition() < this.car1.getDistance()) {
                this.car1.smoothDistance();
            }
            if (this.car2.xPosition() >= this.car2.getDistance()) {
                this.gameState = "end2";
            }
            else if (this.car1.xPosition() >= this.car1.getDistance()) {
                this.gameState = "end1";
            }
        }
        if (this.gameState === "end1") {
            this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
            this.car1.stopTheCar();
            this.writeTextToCanvas(`You lost the game :( `, 60, this.canvas.width / 2, this.canvas.height / 2, "center", "red");
        }
        if (this.gameState === "end2") {
            this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
            this.car1.stopTheCar();
            this.writeTextToCanvas(`You are the winner`, 60, this.canvas.width / 2, this.canvas.height / 2, "center", "red");
        }
    }
    detectingRect(event, i) {
        return event.clientX >= this.rectangles[i].getXPos() &&
            event.clientX < this.rectangles[i].getXPos() + this.rectangles[i].getWidth() &&
            event.clientY >= this.rectangles[i].getYPos() &&
            event.clientY <= this.rectangles[i].getYPos() + this.rectangles[i].getHeight();
    }
    writeTextToCanvas(text, fontSize = 20, xCoordinate, yCoordinate, alignment = "center", color = "red") {
        this.ctx.font = `${fontSize}px Minecraft`;
        this.ctx.fillStyle = color;
        this.ctx.textAlign = alignment;
        this.ctx.fillText(text, xCoordinate, yCoordinate);
    }
}
let init = () => new Game(document.getElementById("canvas"));
window.addEventListener("load", init);
//# sourceMappingURL=app.js.map