const menu = document.querySelector('div#menu')
const screen = document.querySelector('div#screen')


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
        <h1>Welcome!</h1>
        <h3>Please enter your name</h3>
        <input type="text" name="name" value="" placeholder="" class="input-text">      
        <br>
        <input type="submit" name="submit" value="Start" class="submit">
      </form>
  `
    menu.append(f)
    // const nameForm = document.querySelector('#nameForm')
    f.addEventListener('submit', event => {
        event.preventDefault()
        let item = {
            name: f.name.value,
        }
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
    <h1>Choose a game:</h1>
      <li id="tank">Tank</li>
     <li id="dino">Dino Escape</li>
     <li id="flappy">Flap@$*&g Duck</li>
`

    menu.append(ol)

    document.querySelector('li#tank').addEventListener('click', () => {
        document.querySelector('li#tank').style.color = "red"
        console.log("start game")
        displayScores()
    })

    document.querySelector('li#dino').addEventListener('click', () => {
        document.querySelector('li#dino').style.color = "red"
        state.game = "dino"
        menu.innerHTML = ""
        screen.className = ""
        initialiseDino()

    })

    document.querySelector('li#flappy').addEventListener('click', () => {
        document.querySelector('li#flappy').style.color = "red"
        state.game = "flappy"
        screen.className = ""
        menu.innerHTML = ""
        startFlappy()
    })

}



function displayScores() {
    menu.innerHTML = ""
    screen.className = "screenColor"
    let h1 = document.createElement('button')
    h1.id = "h1"
    h1.innerHTML = "Back to game menu"
    menu.append(h1)

    h1.addEventListener('click', () => {
        displayGames()
    })



    let divT1 = document.createElement('div')
    divT1.id = "t1"
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