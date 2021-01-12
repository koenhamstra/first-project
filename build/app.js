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
KeyboardListener.KEY_R = 82;
class Loadingscreen {
    constructor(canvasId, text) {
        this.instructions = () => {
            this.writeTextToCanvas(this.ctx, this.text, 35, this.canvas.width / 2, this.canvas.height / 3, "center", "red");
            this.writeTextToCanvas(this.ctx, "Press SPACE to start", 40, this.canvas.width / 2, (this.canvas.height / 3) * 2, "center", "red");
        };
        this.isSpacePressed = () => {
            if (this.keyListener.isKeyDown(32)) {
                console.log("pressed");
            }
        };
        this.canvas = canvasId;
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
        this.ctx = this.canvas.getContext("2d");
        this.keyListener = new KeyboardListener();
        this.text = text;
        this.instructions();
        this.isSpacePressed();
    }
    writeTextToCanvas(ctx, text, fontSize = 20, xCoordinate, yCoordinate, alignment = "center", color = "red") {
        ctx.font = `${fontSize}px Minecraft`;
        ctx.fillStyle = color;
        ctx.textAlign = alignment;
        ctx.fillText(text, xCoordinate, yCoordinate);
    }
    randomNumber(min, max) {
        return Math.round(Math.random() * (max - min) + min);
    }
}
let init = () => {
    new Loadingscreen(document.getElementById("canvas"), "");
};
window.addEventListener("load", init);
//# sourceMappingURL=app.js.map