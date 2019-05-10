function dinoInstructions() {

    mainsoundtrack.pause();
    mainsoundtrack.currentTime = 0;

    let instructions = document.createElement('div')
    instructions.className = 'dinoInstructionBox'
    instructions.innerHTML = `
    <h2 id='dino-headline'>Dino Escape Instructions </h2>
    <p> Press Up, Down, Left, Right to escape the Dinosaurs </p>
    <p> They are hungry - stay away from their heads! </p>
    <button id='dino-start-button'>Start Game</button>
    `
    screen.className = 'dinoInstructionBackground'
    menu.append(instructions)


    let startBtn = instructions.querySelector('#dino-start-button')
    startBtn.addEventListener('click', () => {
        screen.className = ""
        instructions.innerHTML = ""
        dinotheme.pause();
        dinotheme.currentTime = 0;
        initialiseDino()
    })
}

const initialiseDino = () => {
    //document.removeEventListener("keydown", start)

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
    let xxx = 73
    let yyy = 73

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
    let dxrex = 1.5
    let dyrex = 1.5


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

    const goatScream = new Audio();
    goatScream.src = "sounds/goat_scream.mp3";
    const dinoRoar = new Audio();
    dinoRoar.src = "sounds/dinoroar.mp3";
    const dinoWalk = new Audio();
    dinoWalk.src = "sounds/dinoWalk.mp3";
    const goatSound = new Audio();
    goatSound.src = "sounds/goat.mp3";

    dinoWalk.play()



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

        drawDino(dino1, x, y, 140, 50)
        if (score > 200) {
            drawDino(dino1, xx, yy, 140, 50)
            collisionBronto2()
        }
        if (score > 400) {
            drawDino(velo, velx, vely, 55, 55)
            collisionVelociraptor()
        }
        initTrex()
        collisionRex()

        drawBlock()
        drawScore()
        collisionBronto1()
        score += 0.5

        // rates of movement  
        x += dx
        y += dy

        xx += dxx
        yy += dyy

        velx += dxvelo
        vely += dyvelo

        // insert here movement params of TREX
        if (xxx < blockX && dxrex < 0 || xxx > blockX && dxrex > 0) {
            dxrex = -dxrex
        }
        if (yyy < blockY && dyrex < 0 || yyy > blockY && dyrex > 0) {
            dyrex = -dyrex
        }
        xxx += dxrex
        yyy += dyrex


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
            goatSound.play()
            leftPressed = false;
        } else if (e.key == "Up" || e.key == "ArrowUp") {
            goatSound.play()
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

        //c.clearRect(0, 0, canvas.width, canvas.height)
        //document.location.reload()
        clearInterval(interval)
        canvas.className = "clear"
        dinoWalk.pause();
        dinoWalk.currentTime = 0;

        goatScream.play()

        createScore(state).then(() => displayScores())
    }

    // collision detection 
    const collisionBronto1 = () => {
        if (x > blockX && x < blockX + blockWidth && y > blockY && y < blockY + blockHeight) {
            gameOver()
        }
    }
    const collisionBronto2 = () => {
        if (xx > blockX && xx < blockX + blockWidth && yy > blockY && yy < blockY + blockHeight) {
            gameOver()
        }
    }
    const collisionVelociraptor = () => {
        if (velx > blockX && velx < blockX + blockWidth && vely > blockY && vely < blockY + blockHeight) {
            gameOver()
        }
    }
    const collisionRex = () => {
        if (xxx > blockX && xxx < blockX + blockWidth && yyy > blockY && yyy < blockY + blockHeight) {
            gameOver()
        }
    }


    const drawScore = () => {
        c.font = "24px Arial";
        c.fillStyle = "#0095DD";
        c.fillText("Score: " + score, 8, 35);
    }

    const initTrex = () => {
        let trex = new Image()
        trex.src = 'images/trex.png'

        drawDino(trex, xxx, yyy, 75, 75)
    }

}