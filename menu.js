const menu = document.querySelector('div#menu')
const screen = document.querySelector('div#screen')
const cv = document.querySelector('canvas#canvas')

const thatsall = new Audio();
thatsall.src = "sounds/highscores.mp3";
const laser = new Audio();
laser.src = "sounds/laser.mp3";


const URL = 'http://localhost:3000/users'
let state = {
    player_id: 0,
    name: "",
    game: "",
    score: 0
}



function displayMenu() {
    console.log("displayMenu")
    screen.className = "screenColor"
    let f = document.createElement('form')

    f.innerHTML = `
        <form id='nameForm'>
        <h1 style="text-align:center">Welcome!</h1>
        <h3 style="text-align:center">Please enter your name</h3>
        <div style = "text-align:center;">
        <input type="text" name="name" value="" placeholder="" class="input-text">      
        <br>
        <input type="submit" name="submit" value="Start" class="submit">
        </div>
      </form>
  `
    menu.append(f)
    // const nameForm = document.querySelector('#nameForm')
    f.addEventListener('submit', event => {
        event.preventDefault()
        let item = {
            name: f.name.value,
        }
        laser.play()
        createItem(item).then(function (x) {
            state.name = x.name
            console.log(x.id)
            state.player_id = parseInt(x.id)
            console.log(state)
        })
        menu.innerHTML = ""
        displayGames()
    })
}

function displayGames() {
    console.log("displayGames")
    menu.innerHTML = ""
    screen.className = "screenColor"

    let ol = document.createElement('ol')
    ol.innerHTML = `
    <h1 style="text-align:center">Choose a game:</h1>
    
     <li id="dino">Dino Escape</li><br>
     <li id="flappy">Flap@$*&g Duck</li>
`

    menu.append(ol)

    // document.querySelector('li#tank').addEventListener('click', () => {
    //     document.querySelector('li#tank').style.color = "red"
    //     console.log("start game")
    //     displayScores()
    // })

    document.querySelector('li#dino').addEventListener('click', () => {
        document.querySelector('li#dino').style.color = "red"
        laser.play()
        state.game = "dino"
        menu.innerHTML = ""
        screen.className = ""
        cv.className = ""
        dinoInstructions()

    })

    document.querySelector('li#flappy').addEventListener('click', () => {
        document.querySelector('li#flappy').style.color = "red"
        laser.play()
        state.game = "flappy"
        screen.className = ""
        menu.innerHTML = ""
        cv.className = ""
        duckIns()
    })

}



function displayScores() {
    thatsall.play()
    menu.innerHTML = ""
    // screen.className = "screenColor"
    let h1 = document.createElement('button')
    h1.id = "h1"
    h1.innerHTML = "Back to game menu"
    menu.append(h1)

    h1.addEventListener('click', () => {
        laser.play()
        displayGames()
    })



    let divT1 = document.createElement('div')
    divT1.id = "t1"
    divT1.className = "table"
    divT1.innerHTML = "<h1>Dino Escape</h1>"
    menu.append(divT1)
    let t = document.createElement('table')
    t.id = "score"
    t.innerHTML = `
  <tr>
    <th>Name</th>
    <th>Score</th> 
  </tr>
  `
    divT1.append(t)

    getScores().then(function (items) {
        items.forEach((x) => {
            if (x.game == "dino") {
                // displayScore(x)
                let tr = document.createElement("tr")
                tr.innerHTML = `

           <td>${x.name}</td> 
           <td>${x.score}</td> 
          
          `
                t.append(tr)

            }
        })
    })
    /////////////////// create second table ///////////////
    let divT2 = document.createElement('div')
    divT2.id = "t2"
    divT2.className = "table"
    divT2.innerHTML = "<h1>Flap@$*&g Duck</h1>"
    menu.append(divT2)
    let t2 = document.createElement('table')
    t2.id = "t2"
    t2.innerHTML = `
  <tr>
    <th>Name</th>
    <th>Score</th> 
  </tr>
  `
    divT2.append(t2)

    getScores().then(function (items) {
        items.forEach((x) => {
            if (x.game == "flappy") {
                // displayScore(x)
                let tr = document.createElement("tr")
                tr.innerHTML = `

           <td>${x.name}</td> 
           <td>${x.score}</td> 
          
          `
                t2.append(tr)

            }
        })
    })
}


const createItem = item =>
    fetch(URL, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(item)
    }).then(resp => resp.json())


const getScores = () =>
    fetch('http://localhost:3000/scores')
    .then(resp => resp.json())

const createScore = state =>
    fetch('http://localhost:3000/scores', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(state)
    }).then(resp => resp.json())


// function duckIns() {
//     screen.className = "screenColor" // add your own css style and change this class to match - background, etc
//     let p = document.createElement('p')

//     p.innerHTML = `
//     <h1>Flap@$*&g Duck</h1>
//     <p>
//     Help your coding duck avoid bad code
//     Hit any button to flap

//     Cough trip on catnip chase ball of string and flop over, but grab pompom in mouth and put in water dish meow loudly just to annoy owners.Roll over and sun my belly cat walks in keyboard.Under the bed ask
//     for petting and purr
//     while eating give me some of your food give me some of your food give me some of your food meh, i don 't want it so always hungry. Pet me pet me don'
//     t pet me human clearly uses close to one life a night no one naps that long so i revive by standing on chestawaken!yet stare at owner accusingly then wink caticus cuteicus poop on floor and watch human clean up.Throwup on your pillow eat the fat cats food and side - eyes your "jerk"
//     other hand
//     while being petted so hiding behind the couch until lured out by a feathery toy but immediately regret falling into bathtub.Cough.
//     </p>

//     <h2>press any button to start</h2>
//   `
//     menu.append(p)

//     document.addEventListener("keydown", startFlappy)

// }