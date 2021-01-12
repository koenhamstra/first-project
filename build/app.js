class Game {
    constructor(canvas) {
        this.loop = () => {
            this.frameIndex++;
            this.index++;
            requestAnimationFrame(this.loop);
            this.drawWhatsApp();
            document.addEventListener("click", this.mouseHandler);
            if (this.warning === true) {
                this.warningScreen();
            }
        };
        this.mouseHandler = (event) => {
            if (this.whatsApp_Pic(event)) {
                this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
                this.ctx.drawImage(this.messageImage, this.xPos_whatsapp, this.yPos_whatsapp);
                this.writeTextToCanvas("Accept", 35, this.rectangle[0].getXPos() + this.rectangle[0].getWidth() / 2, this.rectangle[0].getYPos() + this.rectangle[0].getHeight() / 2, "center", "black");
                this.writeTextToCanvas("Reject", 35, this.rectangle[1].getXPos() + this.rectangle[1].getWidth() / 2, this.rectangle[1].getYPos() + this.rectangle[1].getHeight() / 2, "center", "black");
                this.rectangle[0].draw(this.ctx);
                this.rectangle[1].draw(this.ctx);
            }
            if (this.warningClick(event)) {
                this.frameIndex = 0;
                document.body.style.backgroundColor = "#CCFFE5";
                this.warning = false;
                this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
                this.drawWhatsApp();
            }
            if (this.WhatsAppAccept(event)) {
                this.index = 0;
                this.warning = true;
                this.whatsAppImage = this.emailImage;
                this.messageImage = this.emailMessage;
            }
            if (this.WhatsAppReject(event)) {
                this.frameIndex = 0;
                this.whatsAppImage = this.emailImage;
                this.messageImage = this.emailMessage;
                this.drawWhatsApp();
            }
        };
        this.warningScreen = () => {
            this.rectangle[2].draw(this.ctx);
            if (this.index % 3 === 0) {
                this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
                document.body.style.backgroundColor = "blue";
                console.log("hi");
                this.writeTextToCanvas("WARNING", 60, this.xPos, this.yPos, "center", "yellow");
                this.writeTextToCanvas("CLICK HERE TO STOP", 30, this.rectangle[2].getXPos() + (this.rectangle[2].getWidth() / 2), this.rectangle[2].getYPos() + (this.rectangle[2].getHeight() / 2), "center", "yellow");
            }
            if (this.index % 6 === 0) {
                this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
                document.body.style.backgroundColor = "red";
                this.writeTextToCanvas("WARNING", 60, this.xPos, this.yPos, "center", "yellow");
                this.writeTextToCanvas("CLICK HERE TO STOP", 30, this.rectangle[2].getXPos() + (this.rectangle[2].getWidth() / 2), this.rectangle[2].getYPos() + (this.rectangle[2].getHeight() / 2), "center", "yellow");
                this.index = 0;
                console.log("hihi");
            }
        };
        this.drawWhatsApp = () => {
            if (this.frameIndex === 10) {
                this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
                this.ctx.drawImage(this.phoneImage, this.xPos, this.yPos);
            }
            if (this.frameIndex === 150) {
                this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
                this.ctx.drawImage(this.whatsAppImage, this.xPos_whatsapp, this.yPos_whatsapp);
            }
        };
        this.whatsApp_Pic = (event) => {
            return event.clientX >= this.xPos_whatsapp && event.clientX < this.xPos_whatsapp + this.whatsAppImage.width && event.clientY >= this.yPos_whatsapp && event.clientY <= this.yPos_whatsapp + this.whatsAppImage.height;
        };
        this.WhatsAppAccept = (event) => {
            return event.clientX >= this.rectangle[0].getXPos() && event.clientX < this.rectangle[0].getXPos() + this.rectangle[0].getWidth() && event.clientY >= this.rectangle[0].getYPos() && event.clientY <= this.rectangle[0].getYPos() + this.rectangle[0].getHeight();
        };
        this.WhatsAppReject = (event) => {
            return event.clientX >= this.rectangle[1].getXPos() && event.clientX < this.rectangle[1].getXPos() + this.rectangle[1].getWidth() && event.clientY >= this.rectangle[1].getYPos() && event.clientY <= this.rectangle[1].getYPos() + this.rectangle[1].getHeight();
        };
        this.warningClick = (event) => {
            return event.clientX >= this.rectangle[2].getXPos() && event.clientX < this.rectangle[2].getXPos() + this.rectangle[2].getWidth() && event.clientY >= this.rectangle[2].getYPos() && event.clientY <= this.rectangle[2].getYPos() + this.rectangle[2].getHeight();
        };
        this.canvas = canvas;
        document.addEventListener("click", this.mouseHandler);
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
        this.xPos = this.canvas.width * 0.7 / 2;
        this.yPos = this.canvas.height * 0.3 / 2;
        this.phoneImage = this.loadNewImage("assets/img/phone.png");
        this.verification = this.loadNewImage("assets/img/verification.png");
        this.xPos_whatsapp = this.canvas.width * 0.5 / 2;
        this.yPos_whatsapp = this.canvas.height * 0.5 / 2;
        this.whatsAppImage = this.loadNewImage("assets/img/whatsapp.png");
        this.emailMessage = this.loadNewImage("assets/img/email-message.jpg");
        this.emailImage = this.loadNewImage("assets/img/email.png");
        this.xPos_answer1 = this.canvas.width * 8 / 20;
        this.xPos_answer2 = this.canvas.width * 14 / 20;
        this.yPos_answer = this.canvas.height * 17 / 20;
        this.rectangle = [new Rectangles(this.xPos_answer1, this.yPos_answer, "white", 70, 150),
            new Rectangles(this.xPos_answer2, this.yPos_answer, "white", 70, 150),
            new Rectangles(this.canvas.width / 2, this.canvas.height / 2, "white", 100, 500)];
        this.warning = false;
        this.ctx = this.canvas.getContext('2d');
        this.messageImage = this.loadNewImage("assets/img/whatsapp-message.png");
        this.frameIndex = 0;
        this.index = 0;
        document.body.style.backgroundColor = "#CCFFE5";
        console.log('start animation');
        this.loop();
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
console.log("Javascript is working!");
window.addEventListener('load', () => {
    console.log("Handling the Load event");
    const game = new Game(document.getElementById('canvas'));
});
//# sourceMappingURL=app.js.map