let init = () => new CompleetGame(document.getElementById("canvas"));
window.addEventListener("load", init);
class ClassLoader {
    constructor(canvas, audio) {
        this.done = () => {
            return false;
        };
        this.draw = () => {
        };
        this.playAudio = () => {
            return this.audio.play();
        };
        this.stopAudio = () => {
            return this.audio.pause();
        };
        this.audio = audio;
    }
}
class CompleetGame {
    constructor(canvas) {
        this.loop = () => {
            if (this.classLoader[this.level].done() === true) {
                console.log("ásdsd");
                this.level++;
                if (this.level !== 0) {
                    this.classLoader[this.level - 1].stopAudio();
                }
            }
            this.classLoader[this.level].draw();
            this.classLoader[this.level].playAudio();
            requestAnimationFrame(this.loop);
        };
        this.canvas = canvas;
        this.ctx = this.canvas.getContext("2d");
        this.classLoader = [
            new Go(canvas),
            new Loadingscreen(canvas, "Weclome Agent 21 🕵️‍♂️ in BBKA Agency , Be carefull from the enemy shots, reach the server on top right to skip the level", "Use left and right arrows to move the player and press Space to jump", "src/moving/back.png"),
            new FullMarioGame(canvas, "src/moving/back 2.jpg", 3),
            new Loadingscreen(canvas, "Well done!🤩 Now We need your skills to create a strong password for the computer, good luck! 🤙", "", "assets/img/background.jpg"),
            new PassWordGame(canvas),
            new Loadingscreen(canvas, "Well done 🤩, You secure our server now. Thank you for your help! let's move on", "", "src/moving/back.png"),
            new FullMarioGame(canvas, "src/moving/back 2.jpg", 7),
            new Loadingscreen(canvas, "Wow you are getting better!🤩 Now answer the questions faster than the hacker to kick him out! 🤙  Good luck 💪", "", "assets/img/Racing-gameBackGround.png"),
            new RacingGame(canvas, "src/moving/back 2.jpg"),
            new Loadingscreen(canvas, "Wow you are an amazing agent!🤩 But we still need you! 🤙 move faster to the server 💪", "", "src/moving/back.png"),
            new FullMarioGame(canvas, "src/moving/back 2.jpg", 15),
            new Loadingscreen(canvas, "Amazing work!🤩 ", "Now we want you to tell us what are the safe messages on the phones we need you focus good on it otherwise we will lose our war against the hackers", ""),
            new MalwareGame(canvas, 0),
            new Loadingscreen(canvas, "Well done Agent 21 🕵️‍♂️ , you completed this mission 💪, see you on your next assignment 👋 ", "", "src/moving/back 2.jpg"),
            new EndScreen(canvas, "Press 'r' to restart the game. Thanks for playing our BBKA game 👋", "", "")
        ];
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
        this.level = 0;
        this.loop();
    }
}
class EndScreen extends ClassLoader {
    constructor(canvasId, text, text2, nextBackground) {
        super(canvasId, new Audio("assets/levels-music/Pixel-City-Groovin.mp3"));
        this.draw = () => {
            this.writeTextToCanvas(this.ctx, this.text, 30, this.canvas.width / 2, this.canvas.height / 3, "center", "#08E275");
            this.writeTextToCanvas(this.ctx, this.text2, 30, this.canvas.width / 2, this.canvas.height * 1.6 / 3, "center", "#08E275");
            this.restart();
        };
        this.restart = () => {
            if (this.keyListener.isKeyDown(82)) {
                location.reload();
            }
        };
        this.canvas = canvasId;
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
        this.ctx = this.canvas.getContext("2d");
        this.keyListener = new KeyboardListener();
        this.text = text;
        this.text2 = text2;
        this.nextBackGround = nextBackground;
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
class Go extends ClassLoader {
    constructor(canvas) {
        super(canvas, new Audio("assets/levels-music/Pixel-City-Groovin.mp3"));
        this.draw = () => {
            this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
            this.ctx.drawImage(this.loadNewImage("assets/img/logo1.png"), this.canvas.width * 0.85 / 2, this.canvas.height * 0.2 / 2);
            this.rectangles.draw(this.ctx);
            this.writeTextToCanvas("GO", 35, this.rectangles.getXPos() + this.rectangles.getWidth() / 2, this.rectangles.getYPos() + this.rectangles.getHeight() * 1.2 / 2, "center", "yellow");
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
                document.body.style.backgroundImage = "url('src/moving/back 2.jpg')";
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
        document.body.style.backgroundImage = "url('src/moving/back 1.jpg')";
        document.body.style.backgroundSize = `cover`;
        this.rectangles = new Rectangles(this.canvas.width * 9 / 12, canvas.height * 1.7 / 2, "yellow", 70, 200);
        document.addEventListener("click", this.mouseHandler);
        this.draw();
    }
    loadNewImage(source) {
        const img = new Image();
        img.src = source;
        return img;
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
class MalwareGame extends ClassLoader {
    constructor(canvas, itteration) {
        super(canvas, new Audio("assets/levels-music/Pixel-City-Groovin.mp3"));
        this.draw = () => {
            this.frameIndex++;
            this.index++;
            console.log(this.itteration);
            this.drawWhatsApp();
            document.addEventListener("click", this.mouseHandler);
            if (this.warning === true) {
                console.log("warning");
                this.warningScreen();
            }
        };
        this.mouseHandler = (event) => {
            if (this.whatsApp_Pic(event)) {
                this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
                this.ctx.drawImage(this.messageImage, this.xPos_whatsapp, this.yPos_whatsapp);
                if (this.itteration === 0) {
                    this.writeTextToCanvas("Can you trust this message?", 35, this.canvas.width * 0.75, this.canvas.height * 0.25, "center", "black");
                    document.getElementById("reject").removeAttribute("hidden");
                    document.getElementById("accept").removeAttribute("hidden");
                }
                if (this.itteration === 1) {
                    this.writeTextToCanvas("Can you trust this message?", 35, this.canvas.width * 0.75, this.canvas.height * 0.25, "center", "black");
                    document.getElementById("reject").removeAttribute("hidden");
                    document.getElementById("accept").removeAttribute("hidden");
                }
                if (this.itteration === 2) {
                    this.writeTextToCanvas("Can you trust this message?", 35, this.canvas.width * 0.75, this.canvas.height * 0.25, "center", "black");
                    document.getElementById("reject").removeAttribute("hidden");
                    document.getElementById("fakeAccept").removeAttribute("hidden");
                    const accept = document.getElementById("fakeAccept");
                    accept.addEventListener("click", this.WhatsAppReject);
                }
            }
        };
        this.warningScreen = () => {
            document.getElementById("warning").removeAttribute("hidden");
            if (this.index % 3 === 0) {
                this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
                document.body.style.backgroundColor = "blue";
                this.writeTextToCanvas("WARNING", 60, this.xPos, this.yPos, "center", "yellow");
            }
            if (this.index % 6 === 0) {
                this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
                document.body.style.backgroundColor = "red";
                this.writeTextToCanvas("WARNING", 60, this.xPos, this.yPos, "center", "yellow");
                this.index = 0;
            }
        };
        this.drawWhatsApp = () => {
            if (this.frameIndex === 10) {
                this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
                this.ctx.drawImage(this.phoneImage, this.xPos, this.yPos);
                if (this.itteration === 0) {
                    this.writeTextToCanvas("Wait for a message!", 35, this.canvas.width * 0.75, this.canvas.height * 0.25, "center", "black");
                }
                if (this.itteration === 1) {
                    this.writeTextToCanvas("Whatsapp will never ask your personal information beside your phonenumber", 35, this.canvas.width / 2, this.canvas.height * 0.1, "center", "black");
                }
                if (this.itteration === 2) {
                    this.writeTextToCanvas("Your bank will never ask your personal infromation through mail or text", 35, this.canvas.width / 2, this.canvas.height * 0.1, "center", "black");
                }
                if (this.itteration === 3) {
                    this.writeTextToCanvas("you can trust this message because it is an in app verification", 35, this.canvas.width / 2, this.canvas.height * 0.1, "center", "black");
                }
            }
            if (this.frameIndex === 200) {
                this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
                this.ctx.drawImage(this.whatsAppImage, this.xPos_whatsapp, this.yPos_whatsapp);
                if (this.itteration >= 0) {
                    this.writeTextToCanvas("You got a message, click to open", 35, this.canvas.width * 0.75, this.canvas.height * 0.25, "center", "black");
                }
                if (this.itteration >= 1) {
                    this.writeTextToCanvas("You got a message, click to open", 35, this.canvas.width * 0.75, this.canvas.height * 0.25, "center", "black");
                }
                if (this.itteration >= 2) {
                    this.writeTextToCanvas("You got a message, click to open", 35, this.canvas.width * 0.75, this.canvas.height * 0.25, "center", "black");
                }
                if (this.itteration >= 3) {
                    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
                    this.writeTextToCanvas("Well done, You completed the game, Press Space to continue", 35, this.canvas.width * 0.75, this.canvas.height * 0.25, "center", "black");
                    this.itteration = 4;
                }
            }
        };
        this.whatsApp_Pic = (event) => {
            return event.clientX >= this.xPos_whatsapp && event.clientX < this.xPos_whatsapp + this.whatsAppImage.width && event.clientY >= this.yPos_whatsapp && event.clientY <= this.yPos_whatsapp + this.whatsAppImage.height;
        };
        this.WhatsAppAccept = () => {
            this.itteration++;
            this.index = 0;
            if (this.itteration < 3) {
                this.warning = true;
            }
            this.whatsAppImage = this.emailImage;
            this.messageImage = this.emailMessage;
            if (this.itteration >= 2) {
                this.whatsAppImage = this.loadNewImage("assets/img/whatsapp.png");
                this.messageImage = this.verification;
                this.drawWhatsApp();
            }
            document.getElementById("accept").setAttribute("hidden", "hidden");
            document.getElementById("reject").setAttribute("hidden", "hidden");
        };
        this.WhatsAppReject = () => {
            this.itteration++;
            this.frameIndex = 0;
            if (this.itteration >= 2) {
                this.whatsAppImage = this.loadNewImage("assets/img/whatsapp.png");
                this.messageImage = this.verification;
                this.drawWhatsApp();
            }
            else {
                this.whatsAppImage = this.emailImage;
                this.messageImage = this.emailMessage;
                this.drawWhatsApp();
            }
            document.getElementById("reject").setAttribute("hidden", "hidden");
            document.getElementById("accept").setAttribute("hidden", "hidden");
            document.getElementById("fakeAccept").setAttribute("hidden", "hidden");
        };
        this.warningClick = () => {
            this.frameIndex = 0;
            document.body.style.backgroundColor = "#CCFFE5";
            this.warning = false;
            this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
            this.drawWhatsApp();
            document.getElementById("warning").setAttribute("hidden", "hidden");
        };
        this.done = () => {
            if (this.itteration === 4) {
                this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
                document.body.style.backgroundImage = "url('src/moving/back 2.jpg')";
                document.body.style.backgroundSize = "cover";
                return true;
            }
            return false;
        };
        this.canvas = canvas;
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
        this.xPos = this.canvas.width * 0.7 / 2;
        this.yPos = this.canvas.height * 0.3 / 2;
        const acceptButton = document.getElementById("accept");
        acceptButton.addEventListener("click", this.WhatsAppAccept);
        const rejectButton = document.getElementById("reject");
        rejectButton.addEventListener("click", this.WhatsAppReject);
        const warningButton = document.getElementById("warning");
        warningButton.addEventListener("click", this.warningClick);
        this.phoneImage = this.loadNewImage("assets/img/phone.png");
        this.verification = this.loadNewImage("assets/img/verification.png");
        this.xPos_whatsapp = this.canvas.width * 0.5 / 2;
        this.yPos_whatsapp = this.canvas.height * 0.5 / 2;
        this.whatsAppImage = this.loadNewImage("assets/img/whatsapp.png");
        this.emailMessage = this.loadNewImage("assets/img/email-message.jpg");
        this.emailImage = this.loadNewImage("assets/img/email.png");
        this.xPos_answer = this.canvas.width * 16 / 20;
        this.yPos_answer1 = this.canvas.height * 9 / 20;
        this.yPos_answer2 = this.canvas.height * 12 / 20;
        this.warning = false;
        this.itteration = itteration;
        this.ctx = this.canvas.getContext('2d');
        this.messageImage = this.loadNewImage("assets/img/whatsapp-message.png");
        this.frameIndex = 0;
        this.index = 0;
        document.body.style.backgroundColor = "#CCFFE5";
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
        super(canvas, new Audio("assets/levels-music/Fishbowl-Acrobatics.mp3"));
        this.draw = () => {
            document.getElementById("password-detection").removeAttribute("hidden");
            this.reload();
            this.drawBasics();
        };
        this.drawBasics = () => {
            this.drawScreen(this.ctx);
            this.writeTextToCanvas("Password", 40, (this.screen.getXPos() + this.screen.getWidth()) * 1.08 / 2, (this.screen.getYPos() + this.screen.getHeight()) / 5, "center", "red");
            this.writeTextToCanvas("Press 'Alt' if you want to try again", 25, (this.screen.getXPos() + this.screen.getWidth()) * 1.08 / 2, (this.screen.getYPos() + this.screen.getHeight()) / 2.7);
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
            if (this.shortOrNot == "not" && this.numberOrNot == "yes" && this.trueOrFalse == "true") {
                this.rectengle.draw(this.ctx);
                this.writeTextToCanvas("Go", 40, this.rectengle.getXPos() + (this.rectengle.getWidth() / 2), this.rectengle.getYPos() + (this.rectengle.getHeight()) / 2, "center", "yellow");
            }
        };
        this.goToNext = (event) => {
            if (event.clientX >= this.rectengle.getXPos() &&
                event.clientX < this.rectengle.getXPos() + this.rectengle.getWidth() &&
                event.clientY >= this.rectengle.getYPos() &&
                event.clientY <= this.rectengle.getYPos() + this.rectengle.getHeight()) {
                this.state = "go";
                console.log("Go is working ");
            }
            else {
                this.state = "no";
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
        this.done = () => {
            if (this.state === "go") {
                this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
                document.getElementById("password-detection").setAttribute("hidden", "hidden");
                console.log(this.state);
                document.body.style.backgroundImage = "url('src/moving/back 2.jpg')";
                document.body.style.backgroundSize = "cover";
                return true;
            }
            return false;
        };
        this.canvas = canvas;
        this.ctx = this.canvas.getContext("2d");
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
        this.trueOrFalse = "false";
        this.numberOrNot = "no";
        this.shortOrNot = "short";
        const button = document.getElementById("button");
        button.addEventListener("click", this.checkPasswrod);
        this.keyListener = new KeyboardListener;
        this.screen = new ComputerScreen("assets/img/screen.png", this.canvas.width / 2.8, this.canvas.height / 15);
        this.rectengle = new Rectangles(canvas.width * 3 / 4, canvas.height / 2, "yellow", 70, 200);
        document.addEventListener("click", this.goToNext);
    }
    drawScreen(ctx) {
        this.screen.draw(ctx);
    }
    reload() {
        if (this.keyListener.isKeyDown(18)) {
            new PassWordGame(this.canvas);
            document.getElementById("password").value = "";
        }
    }
    writeTextToCanvas(text, fontSize = 20, xCoordinate, yCoordinate, alignment = "center", color = "#ffe6ff") {
        this.ctx.font = `${fontSize}px Fantasy`;
        this.ctx.fillStyle = color;
        this.ctx.textAlign = alignment;
        this.ctx.fillText(text, xCoordinate, yCoordinate);
    }
}
class PlayerRacing {
    constructor(name, xPos, yPos, source) {
        this.draw = (ctx) => {
            ctx.drawImage(this.image, this.xPosition, this.yPosition);
        };
        this.xPosition = xPos;
        this.yPosition = yPos;
        this._name = name;
        this.image = this.loadNewImage(source);
    }
    setDistance(distanceRaced) {
        this._distance = distanceRaced;
    }
    smoothDistance() {
        this.xPosition += 20;
    }
    roughDistance() {
        this.xPosition += 200;
    }
    stopThePlayer() {
        this.xPosition += 0;
    }
    startPosition(carYPosition) {
        this.xPosition = 100;
        this.yPosition = carYPosition;
    }
    getDistance() {
        return 1400;
    }
    getxPostition() {
        return this.xPosition;
    }
    getyPostition() {
        return this.yPosition;
    }
    getName() {
        return this._name;
    }
    loadNewImage(source) {
        const img = new Image();
        img.src = source;
        return img;
    }
}
class RacingGame extends ClassLoader {
    constructor(canvas, nextBackGround) {
        super(canvas, new Audio("assets/levels-music/Fishbowl-Acrobatics.mp3"));
        this.draw = () => {
            this.gameState = "animate";
            this.draw1();
            this.restartGame();
            requestAnimationFrame(this.draw);
        };
        this.draw1 = () => {
            this.gameState = "animate";
            this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
            this.player1.draw(this.ctx);
            this.player2.draw(this.ctx);
            if (this.numberOfQuestion === 1) {
                this.writeTextToCanvas("Which password is good?", 40, this.canvas.width / 2, this.canvas.height / 1.3, "center", "black");
                document.getElementById("answer1").removeAttribute("hidden");
                document.getElementById("answer2").removeAttribute("hidden");
                document.getElementById("answer3").removeAttribute("hidden");
            }
            if (this.numberOfQuestion === 2) {
                document.getElementById("answer1").setAttribute("hidden", "hidden");
                document.getElementById("answer2").setAttribute("hidden", "hidden");
                document.getElementById("answer3").setAttribute("hidden", "hidden");
                document.getElementById("answer4").removeAttribute("hidden");
                document.getElementById("answer5").removeAttribute("hidden");
                document.getElementById("answer6").removeAttribute("hidden");
                this.writeTextToCanvas("How to protect your computer?", 40, this.canvas.width / 2, this.canvas.height / 1.3, "center", "black");
            }
            if (this.numberOfQuestion === 3) {
                document.getElementById("answer4").setAttribute("hidden", "hidden");
                document.getElementById("answer5").setAttribute("hidden", "hidden");
                document.getElementById("answer6").setAttribute("hidden", "hidden");
                document.getElementById("answer7").removeAttribute("hidden");
                document.getElementById("answer8").removeAttribute("hidden");
                document.getElementById("answer9").removeAttribute("hidden");
                this.writeTextToCanvas("What do you do when you detect strange activity on your social media account?", 40, this.canvas.width / 2, this.canvas.height / 1.3, "center", "black");
            }
            if (this.numberOfQuestion === 4) {
                document.getElementById("answer7").setAttribute("hidden", "hidden");
                document.getElementById("answer8").setAttribute("hidden", "hidden");
                document.getElementById("answer9").setAttribute("hidden", "hidden");
                document.getElementById("answer10").removeAttribute("hidden");
                document.getElementById("answer11").removeAttribute("hidden");
                document.getElementById("answer12").removeAttribute("hidden");
                this.writeTextToCanvas("Is it good to use your name as a password?", 40, this.canvas.width / 2, this.canvas.height / 1.3, "center", "black");
            }
            if (this.numberOfQuestion === 5) {
                document.getElementById("answer10").setAttribute("hidden", "hidden");
                document.getElementById("answer11").setAttribute("hidden", "hidden");
                document.getElementById("answer12").setAttribute("hidden", "hidden");
                document.getElementById("answer13").removeAttribute("hidden");
                document.getElementById("answer14").removeAttribute("hidden");
                document.getElementById("answer15").removeAttribute("hidden");
                this.writeTextToCanvas("Is it good the password to consist uppercase letters, lowercase letters and numbers?", 40, this.canvas.width / 2, this.canvas.height / 1.3, "center", "black");
            }
            if (this.numberOfQuestion === 6) {
                document.getElementById("answer13").setAttribute("hidden", "hidden");
                document.getElementById("answer14").setAttribute("hidden", "hidden");
                document.getElementById("answer15").setAttribute("hidden", "hidden");
                document.getElementById("answer16").removeAttribute("hidden");
                document.getElementById("answer17").removeAttribute("hidden");
                document.getElementById("answer18").removeAttribute("hidden");
                this.writeTextToCanvas("Is it good to use your birth date as a password?", 40, this.canvas.width / 2, this.canvas.height / 1.3, "center", "black");
            }
            if (this.numberOfQuestion === 7) {
                document.getElementById("answer16").setAttribute("hidden", "hidden");
                document.getElementById("answer17").setAttribute("hidden", "hidden");
                document.getElementById("answer18").setAttribute("hidden", "hidden");
                document.getElementById("answer19").removeAttribute("hidden");
                document.getElementById("answer20").removeAttribute("hidden");
                document.getElementById("answer21").removeAttribute("hidden");
                this.writeTextToCanvas("Is it a good practice to give your password to your friends?", 40, this.canvas.width / 2, this.canvas.height / 1.3, "center", "black");
            }
            if (this.numberOfQuestion === 8) {
                document.getElementById("answer19").setAttribute("hidden", "hidden");
                document.getElementById("answer20").setAttribute("hidden", "hidden");
                document.getElementById("answer21").setAttribute("hidden", "hidden");
                this.numberOfQuestion = 1;
            }
            if (this.gameState === "animate") {
                if (this.player1.getxPostition() < this.player1.getDistance()) {
                    this.player1.smoothDistance();
                }
                if (this.player2.getxPostition() >= this.player2.getDistance()) {
                    this.gameState = "end2";
                }
                else if (this.player1.getxPostition() >= this.player1.getDistance()) {
                    this.gameState = "end1";
                }
            }
            if (this.gameState === "end1") {
                this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
                this.player1.stopThePlayer();
                this.writeTextToCanvas(`You lost the game :( Press "r" if you want to try again `, 60, this.canvas.width / 2, this.canvas.height / 1.3, "center", "red");
            }
            if (this.gameState === "end2") {
                this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
                this.player1.stopThePlayer();
                this.writeTextToCanvas(`You are the winner`, 60, this.canvas.width / 2, this.canvas.height / 2, "center", "red");
                this.gameState = "you win";
            }
        };
        this.rightAnswer = () => {
            this.numberOfQuestion++;
            this.player2.roughDistance();
        };
        this.wrongAnswer = () => {
            this.numberOfQuestion++;
        };
        this.restartGame = () => {
            if (this.keyListener.isKeyDown(82)) {
                new RacingGame(this.canvas, "src/moving/back 2.jpg");
            }
        };
        this.done = () => {
            if (this.gameState === "you win") {
                document.getElementById("answer1").setAttribute("hidden", "hidden");
                document.getElementById("answer2").setAttribute("hidden", "hidden");
                document.getElementById("answer3").setAttribute("hidden", "hidden");
                document.getElementById("answer4").setAttribute("hidden", "hidden");
                document.getElementById("answer5").setAttribute("hidden", "hidden");
                document.getElementById("answer6").setAttribute("hidden", "hidden");
                document.getElementById("answer7").setAttribute("hidden", "hidden");
                document.getElementById("answer8").setAttribute("hidden", "hidden");
                document.getElementById("answer9").setAttribute("hidden", "hidden");
                document.getElementById("answer10").setAttribute("hidden", "hidden");
                document.getElementById("answer11").setAttribute("hidden", "hidden");
                document.getElementById("answer12").setAttribute("hidden", "hidden");
                document.getElementById("answer13").setAttribute("hidden", "hidden");
                document.getElementById("answer14").setAttribute("hidden", "hidden");
                document.getElementById("answer15").setAttribute("hidden", "hidden");
                document.getElementById("answer16").setAttribute("hidden", "hidden");
                document.getElementById("answer17").setAttribute("hidden", "hidden");
                document.getElementById("answer18").setAttribute("hidden", "hidden");
                document.getElementById("answer19").setAttribute("hidden", "hidden");
                document.getElementById("answer20").setAttribute("hidden", "hidden");
                document.getElementById("answer21").setAttribute("hidden", "hidden");
                this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
                document.body.style.backgroundImage = `url('${this.nextBackground}')`;
                document.body.style.backgroundSize = "cover";
                return true;
            }
            return false;
        };
        this.canvas = canvas;
        this.ctx = this.canvas.getContext("2d");
        this.keyListener = new KeyboardListener();
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
        this.player1 = new PlayerRacing("Bullet", 100, 50, "assets/img/enemy.png");
        this.player2 = new PlayerRacing("Greek Arrow", 100, 250, "assets/img/walk 1.png");
        const button1 = document.getElementById("answer1");
        button1.addEventListener("click", this.wrongAnswer);
        const button2 = document.getElementById("answer2");
        button2.addEventListener("click", this.rightAnswer);
        const button3 = document.getElementById("answer3");
        button3.addEventListener("click", this.wrongAnswer);
        const button4 = document.getElementById("answer4");
        button4.addEventListener("click", this.rightAnswer);
        const button5 = document.getElementById("answer5");
        button5.addEventListener("click", this.wrongAnswer);
        const button6 = document.getElementById("answer6");
        button6.addEventListener("click", this.wrongAnswer);
        const button7 = document.getElementById("answer7");
        button7.addEventListener("click", this.wrongAnswer);
        const button8 = document.getElementById("answer8");
        button8.addEventListener("click", this.rightAnswer);
        const button9 = document.getElementById("answer9");
        button9.addEventListener("click", this.wrongAnswer);
        const button10 = document.getElementById("answer10");
        button10.addEventListener("click", this.rightAnswer);
        const button11 = document.getElementById("answer11");
        button11.addEventListener("click", this.wrongAnswer);
        const button12 = document.getElementById("answer12");
        button12.addEventListener("click", this.wrongAnswer);
        const button13 = document.getElementById("answer13");
        button13.addEventListener("click", this.wrongAnswer);
        const button14 = document.getElementById("answer14");
        button14.addEventListener("click", this.wrongAnswer);
        const button15 = document.getElementById("answer15");
        button15.addEventListener("click", this.rightAnswer);
        const button16 = document.getElementById("answer16");
        button16.addEventListener("click", this.wrongAnswer);
        const button17 = document.getElementById("answer17");
        button17.addEventListener("click", this.rightAnswer);
        const button18 = document.getElementById("answer18");
        button18.addEventListener("click", this.wrongAnswer);
        const button19 = document.getElementById("answer19");
        button19.addEventListener("click", this.wrongAnswer);
        const button20 = document.getElementById("answer20");
        button20.addEventListener("click", this.wrongAnswer);
        const button21 = document.getElementById("answer21");
        button21.addEventListener("click", this.rightAnswer);
        this.nextBackground = nextBackGround;
        this.numberOfQuestion = 1;
    }
    writeTextToCanvas(text, fontSize = 20, xCoordinate, yCoordinate, alignment = "center", color = "red") {
        this.ctx.font = `${fontSize}px Minecraft`;
        this.ctx.fillStyle = color;
        this.ctx.textAlign = alignment;
        this.ctx.fillText(text, xCoordinate, yCoordinate);
    }
}
class Loadingscreen extends ClassLoader {
    constructor(canvasId, text, text2, nextBackground) {
        super(canvasId, new Audio("assets/levels-music/Pixel-City-Groovin.mp3"));
        this.draw = () => {
            this.writeTextToCanvas(this.ctx, this.text, 30, this.canvas.width / 2, this.canvas.height / 3, "center", "#08E275");
            this.writeTextToCanvas(this.ctx, this.text2, 30, this.canvas.width / 2, this.canvas.height * 1.6 / 3, "center", "#08E275");
            this.writeTextToCanvas(this.ctx, "Press SPACE to start", 40, this.canvas.width / 2, (this.canvas.height / 3) * 2, "center", "red");
        };
        this.done = () => {
            if (this.keyListener.isKeyDown(32)) {
                this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
                document.body.style.backgroundImage = `url('${this.nextBackGround}')`;
                document.body.style.backgroundSize = "cover";
                return true;
            }
            return false;
        };
        this.canvas = canvasId;
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
        this.ctx = this.canvas.getContext("2d");
        this.keyListener = new KeyboardListener();
        this.text = text;
        this.text2 = text2;
        this.nextBackGround = nextBackground;
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
    constructor(canvas, background, speedProjectTile) {
        super(canvas, new Audio("assets/levels-music/8-Bit-Perplexion.mp3"));
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
                this.player.setXPos(this.canvas.width / 50);
                this.player.setHealth(-3);
            }
        };
        this.generateProjectile = () => {
            let projectileDirection = this.randomNumber(1, 2);
            if (projectileDirection === 1) {
                return -this.speedProjectTile;
            }
            else {
                return this.speedProjectTile;
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
        this.speedProjectTile = speedProjectTile;
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
            this.xpos = number;
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