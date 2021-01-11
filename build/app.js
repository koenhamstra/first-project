class ComputerScreen {
    constructor(image, xPos, yPos) {
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
class Game {
    constructor(canvas) {
        this.loop = () => {
            this.reload();
            this.drawScreen(this.ctx);
            this.draw();
            requestAnimationFrame(this.loop);
        };
        this.draw = () => {
            this.writeTextToCanvas("Password", 40, this.canvas.width / 2, this.canvas.height / 5, "center", "red");
            this.writeTextToCanvas("Press 'r' if you want to try again", 25, this.canvas.width / 2, this.canvas.height / 2.7);
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
        const button = document.getElementById("button");
        button.addEventListener("click", this.checkPasswrod);
        this.trueOrFalse = "false";
        this.numberOrNot = "no";
        this.shortOrNot = "short";
        this.keyListener = new KeyListener;
        this.screen = new ComputerScreen("assets/img/screen.png", this.canvas.width / 2.8, this.canvas.height / 15);
        this.loop();
    }
    drawScreen(ctx) {
        this.screen.draw(ctx);
    }
    reload() {
        if (this.keyListener.isKeyDown(82)) {
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
let init = () => new Game(document.getElementById("canvas"));
window.addEventListener("load", init);
//# sourceMappingURL=app.js.map