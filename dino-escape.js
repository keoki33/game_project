const initialiseDino = () => {

    let canvas = document.querySelector('canvas')

    canvas.width = 690
    canvas.height = 464

    //creating context varialbe allows us to import a whole load of methods to help build shapes etc
    let c = canvas.getContext('2d')

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


    let blockHeight = 40
    let blockWidth = 40
    let blockX = (canvas.width - blockWidth) / 2
    let blockY = (canvas.height - blockHeight) / 2

    // dino movement 
    let dx = 2
    let dy = -1
    let dxx = 2
    let dyy = 2
    let dxvelo = 3
    let dyvelo = 3

    // user control
    let rightPressed = false
    let leftPressed = false
    let upPressed = false
    let downPressed = false

    //score 
    let score = 0

    let dino1 = new Image()
    dino1.src = 'images/long_dino.png'

    let velo = new Image()
    velo.src = 'images/velo.png'

    let goat = new Image()
    goat.src = 'images/goat.png'

    let background = new Image()
    background.src = 'images/prehistoric-landscape.jpg'

    const loadBackground = () => {
        c.drawImage(background, 0, 0, canvas.width, canvas.height)
    }


    const drawDino = (image, startX, startY, width, height) => {
        c.beginPath()
        c.drawImage(image, startX, startY, width, height)
        c.fill()
        c.closePath()
    }

    const drawBlock = () => {
        c.beginPath()
        // c.rect(blockX, blockY, blockWidth, blockHeight)
        c.drawImage(goat, blockX, blockY, blockWidth, blockHeight)
        // c.fillStyle = 'black'
        c.fill()
        c.closePath()
    }

    const startDino = () => {
        c.clearRect(0, 0, canvas.width, canvas.height)
        loadBackground()
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

    // running program

    const interval = setInterval(startDino, 10)

    const gameOver = () => {
        state.score = score
        console.log(state)

        c.clearRect(0, 0, canvas.width, canvas.height)
        //document.location.reload()
        clearInterval(interval)

        createScore(state).then(() => displayScores())
    }

    // collision detection 
    function collisionDetection() {
        if (x > blockX && x < blockX + blockWidth && y > blockY && y < blockY + blockHeight) {
            gameOver()
        } else if (xx > blockX && xx < blockX + blockWidth && yy > blockY && yy < blockY + blockHeight) {
            gameOver()
        } else if (velx > blockX && velx < blockX + blockWidth && vely > blockY && vely < blockY + blockHeight) {
            gameOver()
        }
    }

    const drawScore = () => {
        c.font = "24px Arial";
        c.fillStyle = "#0095DD";
        c.fillText("Score: " + score, 8, 35);
    }

}