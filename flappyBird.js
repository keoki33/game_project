function duckIns() {
    screen.className = ""
    menu.innerHTML = ""
    screen.className = "screenColor" // add your own css style and change this class to match - background, etc
    let d = document.createElement('div')

    d.innerHTML = `
    <h1>Flap@$*&g Duck</h1>
    <br>
    <br>
    <br>
    <p>
    Help your coding duck avoid bad code
    <br><br>
    Hit any button to flap
    </p>
    <br>
    <br>
    <br>

  

    <h2>Press any button to Start</h2>
  `
    menu.append(d)

    document.addEventListener("keydown", start)



}

function start() {
    screen.className = ""
    menu.innerHTML = ""
    startFlappy()
}


function startFlappy() {
    document.removeEventListener("keydown", start)
    let stop = "no"

    var cvs = document.getElementById("canvas");
    var ctx = cvs.getContext("2d");

    cvs.width = 690
    cvs.height = 464

    // load images

    var bird = new Image();
    var bg = new Image();
    var fg = new Image();
    var pipeNorth = new Image();
    var pipeSouth = new Image();

    bird.src = "images/bird.png";
    bg.src = "images/bluecode.jpg";
    fg.src = "images/codeground.jpg";
    pipeNorth.src = "images/pipeNorth.jpg";
    pipeSouth.src = "images/pipeSouth.jpg";


    // some variables

    var gap = 85;
    var constant;

    var bX = 10;
    var bY = 150;

    var gravity = 1.5;

    var score = 0;

    // audio files

    var fly = new Audio();
    var scor = new Audio();

    fly.src = "sounds/fly.mp3";
    scor.src = "sounds/score.mp3";

    // on key down

    document.addEventListener("keydown", moveUp);

    function moveUp() {
        bY -= 25;
        fly.play();
    }

    // pipe coordinates

    var pipe = [];

    pipe[0] = {
        x: cvs.width,
        y: 0
    };

    // draw images

    function draw() {

        ctx.drawImage(bg, 0, 0);


        for (var i = 0; i < pipe.length; i++) {

            constant = pipeNorth.height + gap;
            ctx.drawImage(pipeNorth, pipe[i].x, pipe[i].y);
            ctx.drawImage(pipeSouth, pipe[i].x, pipe[i].y + constant);

            pipe[i].x--;

            if (pipe[i].x == 125) {
                pipe.push({
                    x: cvs.width,
                    y: Math.floor(Math.random() * pipeNorth.height) - pipeNorth.height
                });
            }

            // detect collision

            if (bX + bird.width >= pipe[i].x && bX <= pipe[i].x + pipeNorth.width && (bY <= pipe[i].y + pipeNorth.height || bY + bird.height >= pipe[i].y + constant) || bY + bird.height >= cvs.height - fg.height) {
                stop = "yes"

            }

            if (pipe[i].x == 5) {
                score++;
                scor.play();
            }


        }

        ctx.drawImage(fg, 0, cvs.height - fg.height);

        ctx.drawImage(bird, bX, bY);

        bY += gravity;

        ctx.fillStyle = "#000";
        ctx.font = "20px Verdana";
        ctx.fillText("Score : " + score, 10, cvs.height - 20);
        if (stop == "yes") {
            state.score = score
            // ctx.clearRect(0, 0, canvas.width, canvas.height)
            createScore(state).then(() => displayScores())
        } else {
            requestAnimationFrame(draw);
        }


    }


    draw()

}