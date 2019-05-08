let canvas = document.getElementById("canvas")
let c = canvas.getContext("2d")
const upBtn = document.querySelector('#upBtn')
const downBtn = document.querySelector('#downBtn')
const leftBtn = document.querySelector('#leftBtn')
const rightBtn = document.querySelector('#rightBtn')
const aBtn = document.querySelector('#aBtn')
const sBtn = document.querySelector('#sBtn')



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


//creating context varialbe allows us to import a whole load of methods to help build shapes etc


// starting position of dinos
let x = canvas.width / 2
let y = canvas.height - 30
let xx = 50
let yy = 50
let velx = 150
let vely = 150

let dino1width = 40
let dino1height = 15
let dino2width = 40
let dino2height = 15
let velowidth = 35
let veloheight = 35


let blockHeight = 30
let blockWidth = 30
let blockX = (canvas.width - blockWidth) / 2
let blockY = (canvas.height - blockHeight) / 2

// dino movement 
let dx = 3
let dy = -1
let dxx = 2
let dyy = 2
let dxvelo = 1
let dyvelo = 1

// user control
let rightPressed = false
let leftPressed = false
let upPressed = false
let downPressed = false

//score 
let score = 0

let dino1 = new Image()
dino1.src = 'long_dino.png'

let velo = new Image()
velo.src = 'velo.png'

const drawDino = (image, startX, startY, width, height) => {
    c.beginPath()
    c.drawImage(image, startX, startY, width, height)
    c.fill()
    c.closePath()
}

const drawBlock = () => {
    c.beginPath()
    c.rect(blockX, blockY, blockWidth, blockHeight)
    c.fillStyle = 'black'
    c.fill()
    c.closePath()
}

const draw = () => {
    c.clearRect(0, 0, canvas.width, canvas.height)
    drawDino(dino1, x, y, 150, 50)
    if (score > 200) {
        drawDino(dino1, xx, yy, 150, 50)
    }
    if (score > 400) {
        drawDino(velo, velx, vely, 75, 75)
    }
    drawBlock()
    drawScore()
    collisionDetection()
    score += 0.5

    // rates of movement  
    x += dx
    y += dy

    xx += dxx
    yy += dyy

    velx += dxvelo
    vely += dyvelo

    //dino1 hitting left and right walls 
    if (x + dx > canvas.width - dino1width || x + dx < dino1width) {
        dx = -dx;
    }
    //dino1 hitting top and bottom walls
    if (y + dy > canvas.height - dino1height || y + dy < dino1height) {
        dy = -dy;
    }

    //dino2 hitting top and bottom walls
    if (xx + dxx > canvas.width - dino2width || xx + dxx < dino2width) {
        dxx = -dxx;
    }
    //dino2 hitting top and bottom walls
    if (yy + dyy > canvas.height - dino2height || yy + dyy < dino2height) {
        dyy = -dyy;
    }

    //velo hitting top and bottom walls
    if (velx + dxvelo > canvas.width - velowidth || velx + dxvelo < velowidth) {
        dxvelo = -dxvelo;
    }
    //velo hitting top and bottom walls
    if (vely + dyvelo > canvas.height - veloheight || vely + dyvelo < veloheight) {
        dyvelo = -dyvelo;
    }


    // block movement. only needed once.
    if (rightPressed && blockX < canvas.width - blockWidth) {
        blockX += 5
    } else if (leftPressed && blockX > 0) {
        blockX -= 5
    } else if (upPressed && blockY > 0) {
        blockY -= 5
    } else if (downPressed && blockY < canvas.height - blockHeight) {
        blockY += 5
    }
}


const keyDownHandler = (e) => {
    if (e.key == 'Right' || e.key == 'ArrowRight') {
        rightPressed = true
    } else if (e.key == 'Left' || e.key == 'ArrowLeft') {
        leftPressed = true
    } else if (e.key == 'Up' || e.key == 'ArrowUp') {
        upPressed = true
    } else if (e.key == 'Down' || e.key == 'ArrowDown') {
        downPressed = true
    }
}

const keyUpHandler = (e) => {
    if (e.key == "Right" || e.key == "ArrowRight") {
        rightPressed = false;
    } else if (e.key == "Left" || e.key == "ArrowLeft") {
        leftPressed = false;
    } else if (e.key == "Up" || e.key == "ArrowUp") {
        upPressed = false;
    } else if (e.key == "Down" || e.key == "ArrowDown") {
        downPressed = false;
    }
}

document.addEventListener("keydown", keyDownHandler, false)
document.addEventListener("keyup", keyUpHandler, false)

const interval = setInterval(draw, 10)

// collision detection 

function collisionDetection() {
    if (x > blockX && x < blockX + blockWidth && y > blockY && y < blockY + blockHeight) {
        alert("GAME OVER")
        document.location.reload()
        clearInterval(interval)
    } else if (xx > blockX && xx < blockX + blockWidth && yy > blockY && yy < blockY + blockHeight) {
        alert("GAME OVER")
        document.location.reload()
        clearInterval(interval)
    } else if (velx > blockX && velx < blockX + blockWidth && vely > blockY && vely < blockY + blockHeight) {
        alert("GAME OVER")
        document.location.reload()
        clearInterval(interval)
    }
}

const drawScore = () => {
    c.font = "24px Arial";
    c.fillStyle = "#0095DD";
    c.fillText("Score: " + score, 8, 35);
}