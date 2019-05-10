   const mega = new Audio()

   mega.src = "sounds/mega.mp3";





   function duckIns() {

       screen.className = ""
       menu.innerHTML = ""
       screen.className = "screenColor" // add your own css style and change this class to match - background, etc
       let d = document.createElement('div')

       d.innerHTML = `
    <h1>Flap@$*&g Duck</h1>
    
    
    <br>
    <p>
    Help your coding duck avoid bad code.
    <br><br><br>
    <h4>Hit space bar to flap</h4>
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
       mainsoundtrack.pause();
       mainsoundtrack.currentTime = 0;
       screen.className = ""
       menu.innerHTML = ""
       mega.play()
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
       let ee = 0
       let d = 0
       let ugap = 55
       var gap = 75;
       var constant;
       let constant2

       var bX = 10;
       var bY = 150;

       var gravity = 1.5;

       var score = 0;

       // audio files

       var fly = new Audio();
       var scor = new Audio();
       var gameover = new Audio();


       fly.src = "sounds/fly.mp3";
       scor.src = "sounds/score.mp3";
       gameover.src = "sounds/gameover.mp3";







       // on key down

       document.addEventListener("keydown", moveUp);

       function moveUp() {
           bY -= 20;
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

               if (score > 12) {
                   if (gap <= 75 && d == 0) {
                       gap = gap - 0.5
                   }
                   if (gap == 30) {
                       d = 1
                   }
                   if (gap >= 30 && d == 1) {
                       gap = gap + 1
                   }
                   if (gap == 75) {
                       d = 0
                   }
               }
               if (score > 30) {
                   if (ugap <= 55 && ee == 0) {
                       ugap = ugap - 1
                   }
                   if (ugap == 25) {
                       ee = 1
                   }
                   if (ugap >= 25 && ee == 1) {
                       ugap = ugap + 0.5
                   }
                   if (ugap == 55) {
                       ee = 0
                   }
               }

               constant2 = pipeNorth.height + ugap;
               constant = pipeNorth.height + gap;
               ctx.drawImage(pipeNorth, pipe[i].x, pipe[i].y - ugap);
               ctx.drawImage(pipeSouth, pipe[i].x, pipe[i].y + constant);

               pipe[i].x -= 2;

               if (pipe[i].x == 128) {
                   pipe.push({
                       x: cvs.width,
                       y: Math.floor(Math.random() * pipeNorth.height) - pipeNorth.height
                   });
               }


               // detect collision

               if (bX + bird.width >= pipe[i].x && bX <= pipe[i].x + pipeNorth.width && (bY <= pipe[i].y + pipeNorth.height - ugap || bY + bird.height >= pipe[i].y + constant) || bY + bird.height >= cvs.height - fg.height) {
                   stop = "yes"
                   // document.location.reload()
               }

               if (pipe[i].x == 0) {
                   score++
                   score *= 1.2
                   scor.play();
               }
               if (score > 3) {
                   pipe[i].x -= 2
               }

           }

           ctx.drawImage(fg, 0, cvs.height - fg.height);

           ctx.drawImage(bird, bX, bY);

           bY += gravity;

           ctx.fillStyle = "#000";
           ctx.font = "60px Verdana";
           ctx.fillText("Score : " + score, 10, cvs.height - 20);
           if (stop == "yes") {
               state.score = score
               // ctx.clearRect(0, 0, canvas.width, canvas.height)
               cvs.className = "clear"
               document.removeEventListener("keydown", moveUp)
               mega.pause();
               mega.currentTime = 0;
               gameover.play()
               createScore(state).then(() => displayScores())
           } else {
               requestAnimationFrame(draw);
           }


       }

       draw()

   }