let canvas = document.getElementById("canvas")
let ctx = canvas.getContext("2d")




//////////////////////// auto resize canvas ////////////////
let TILE_SIZE = 32;
let WIDTH = 2388;
let HEIGHT = 1688;
let CANVAS_WIDTH = 2388;
let CANVAS_HEIGHT = 1688;
let timeWhenGameStarted = Date.now(); //return time in ms

let resizeCanvas = function () {
    CANVAS_WIDTH = window.innerWidth - 4;
    CANVAS_HEIGHT = window.innerHeight - 4;

    let ratio = 16 / 9;
    if (CANVAS_HEIGHT < CANVAS_WIDTH / ratio)
        CANVAS_WIDTH = CANVAS_HEIGHT * ratio;
    else
        CANVAS_HEIGHT = CANVAS_WIDTH / ratio;

    canvas.width = WIDTH;
    canvas.height = HEIGHT;
    ctx.font = '30px Arial';
    ctx.mozImageSmoothingEnabled = false; //better graphics for pixel art
    ctx.msImageSmoothingEnabled = false;
    ctx.imageSmoothingEnabled = false;

    canvas.style.width = '' + CANVAS_WIDTH + 'px';
    canvas.style.height = '' + CANVAS_HEIGHT + 'px';
}
resizeCanvas();

window.addEventListener('resize', function () {
    resizeCanvas();
    // drawBack()
});



///////constant background//////////////

// var background = new Image();
// background.src = "backfull.jpg";

// function drawBack() {
//     ctx.drawImage(background, 0, 0);
// }

// background.onload = function () {
//     ctx.drawImage(background, 0, 0);
//     ctx.beginPath()
//     ctx.moveTo(500, 1000)
//     ctx.lineTo(2000, 1000)
//     ctx.stroke()
// }

ctx.clearRect(0, 0, canvas.width, canvas.height)

//////////////////////START GAME CODE BELOW //////////////////////////

var myGamePiece;
var myBackground;

function startGame() {
    myGamePiece = new component(100, 100, "duck.jpeg", 400, 500, "image");
    myBackground = new component(2388, 1688, "backfull.jpg", 0, 0, "image");
    myGameArea.start();
}

var myGameArea = {
    canvas: document.getElementById("canvas"),
    start: function () {
        this.context = this.canvas.getContext("2d");
        document.body.insertBefore(this.canvas, document.body.childNodes[0]);
        this.frameNo = 0;
        this.interval = setInterval(updateGameArea, 1);
    },
    clear: function () {
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
    },
    stop: function () {
        clearInterval(this.interval);
    }
}

function component(width, height, color, x, y, type) {
    this.type = type;
    if (type == "image") {
        this.image = new Image();
        this.image.src = color;
    }
    this.width = width;
    this.height = height;
    this.speedX = 0;
    this.speedY = 0;
    this.x = x;
    this.y = y;
    this.update = function () {
        ctx = myGameArea.context;
        if (type == "image") {
            ctx.drawImage(this.image,
                this.x,
                this.y,
                this.width, this.height);
        } else {
            ctx.fillStyle = color;
            ctx.fillRect(this.x, this.y, this.width, this.height);
        }
    }
    this.newPos = function () {
        this.x += this.speedX;
        this.y += this.speedY;
    }
}

function updateGameArea() {
    myGameArea.clear();
    myBackground.newPos();
    myBackground.update();
    myGamePiece.newPos();
    myGamePiece.update();
}

function move(dir) {
    myGamePiece.image.src = "duck.jpeg";
    if (dir == "up") {
        myGamePiece.speedY = -1;
    }
    if (dir == "down") {
        myGamePiece.speedY = 1;
    }
    if (dir == "left") {
        myGamePiece.speedX = -1;
    }
    if (dir == "right") {
        myGamePiece.speedX = 1;
    }
}

function clearmove() {
    myGamePiece.image.src = "duck.jpeg";
    myGamePiece.speedX = 0;
    myGamePiece.speedY = 0;
}


upBtn.addEventListener('mousedown', () => {
    move('up')
})
downBtn.addEventListener('mousedown', () => {
    move('down')
})
leftBtn.addEventListener('mousedown', () => {
    move('left')
})
rightBtn.addEventListener('mousedown', () => {
    move('right')
})


upBtn.addEventListener('mouseup', () => {
    clearmove()
})
downBtn.addEventListener('mouseup', () => {
    clearmove()
})
leftBtn.addEventListener('mouseup', () => {
    clearmove()
})
rightBtn.addEventListener('mouseup', () => {
    clearmove()
})









startGame()



// <
// /script> <
// div style = "text-align:center;width:480px;" >
//     <
//     button onmousedown = "move('up')"
// onmouseup = "clearmove()"
// ontouchstart = "move('up')" > UP < /button><br><br> <
//     button onmousedown = "move('left')"
// onmouseup = "clearmove()"
// ontouchstart = "move('left')" > LEFT < /button> <
//     button onmousedown = "move('right')"
// onmouseup = "clearmove()"
// ontouchstart = "move('right')" > RIGHT < /button><br><br> <
//     button onmousedown = "move('down')"
// onmouseup = "clearmove()"
// ontouchstart = "move('down')" > DOWN < /button> <
//     /div>