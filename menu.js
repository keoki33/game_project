const menu = document.querySelector('div#menu')
const URL = 'http://localhost:3000/users'
let state = {
    player_id: 0,
    name: "",
    game: "",
    score: 0
}



function displayMenu() {
    console.log("displayMenu")
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

    let ol = document.createElement('ol')
    ol.innerHTML = `
      <li id="tank">Tank</li>
     <li id="dino"> Dino </li>
     <li id="flappy"> Flappy </li>
`

    menu.append(ol)

    document.querySelector('li#tank').addEventListener('click', () => {
        document.querySelector('li#tank').style.color = "red"
        console.log("start game")
        displayScores()
    })

    document.querySelector('li#dino').addEventListener('click', () => {
        document.querySelector('li#dino').style.color = "red"
        console.log("start game")
        displayScores()
    })

    document.querySelector('li#flappy').addEventListener('click', () => {
        document.querySelector('li#flappy').style.color = "red"
        state.game = "flappy"
        startFlappy()
    })

}



function displayScores() {
    menu.innerHTML = ""
    let t = document.createElement('table')
    t.id = "score"
    t.innerHTML = `
  <tr>
    <th>Name</th>
    <th>Score</th> 
  </tr>
  `
    menu.append(t)
    getScores().then(function (items) {
        items.forEach((x) => {
            // displayScore(x)
            let tr = document.createElement("tr")
            tr.innerHTML = `

           <td>${x.id}</td> 
           <td>${x.score}</td> 
          
          `
            t.append(tr)
            console.log(x)
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
        body: JSON.stringify(item)
    }).then(resp => resp.json())