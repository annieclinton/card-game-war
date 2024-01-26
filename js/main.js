//on page load, the first fetch happens. It grabs a deck Id and stores it in a global variable called deckId.
//when you click the button, you can use the deck Id you got on page load to draw 2 cards.
//if both cards are the same, you do war. you each put up 3 cards and then flip a 4th one. Whoever wins the 4th one, gets all the cards

//if I want to push this assignment, I could figure out how to grab a new deck when the old one finishes...

deckId = ''

document.querySelectorAll('.mainCard').forEach(element=>{
  element.classList.add('hidden')
})
document.querySelectorAll('.player1WarCard').forEach(element=>{
  element.classList.add('hidden')
})
document.querySelectorAll('.player2WarCard').forEach(element=>{
  element.classList.add('hidden')
})

let player1CardTotal = 0
let player2CardTotal = 0

fetch('https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1')
.then(res => res.json()) // parse response as JSON
.then(data => { 
  console.log(data)
  deckId = data.deck_id
  if(!localStorage.getItem('deckId')){ //if there is not already an item called deckId in local storage, then add one and add the value of deckId that you get during this fetch(this keeps the same deck active even if you refresh the page)
    localStorage.setItem('deckId', deckId)
}
})
.catch(err => {
    console.log(`error ${err}`)
});

document.querySelector('button').addEventListener('click', playGame)

function playGame(){
  const url = `https://deckofcardsapi.com/api/deck/${deckId}/draw/?count=2`

  fetch(url)
      .then(res => res.json()) // parse response as JSON
      .then(data => { 
        console.log(data)
        document.querySelector('#player1').src = data.cards[0].image
        document.querySelector('#player2').src = data.cards[1].image
        document.querySelectorAll('.mainCard').forEach(element=>{
          element.classList.remove('hidden')
        })

        document.querySelectorAll('.player1WarCard').forEach(element=>{
          element.classList.add('hidden')
        })
        document.querySelectorAll('.player2WarCard').forEach(element=>{
          element.classList.add('hidden')
        })

        let player1Val = convertValToNum(data.cards[0].value)
        let player2Val = convertValToNum(data.cards[1].value)
        if(player1Val > player2Val){
          document.querySelector('h2').innerText = "Round Result: Player 1 Wins"
          player1CardTotal += 2
          console.log(`Player 1 Total Cards: ${player1CardTotal}`)
          console.log(`Player 2 Total Cards: ${player2CardTotal}`)
          checkForWinner()
        }else if(player1Val < player2Val){
          document.querySelector('h2').innerText = "Round Result: Player 2 Wins"
          player2CardTotal += 2
          console.log(`Player 1 Total Cards: ${player1CardTotal}`)
          console.log(`Player 2 Total Cards: ${player2CardTotal}`)
          checkForWinner()
        }else if(player1Val === player2Val){
          document.querySelector('h2').innerText = "War!"
          playWar()
          checkForWinner()
        }
      })
      .catch(err => {
          console.log(`error ${err}`)
      });
}

function playWar(){
  const url = `https://deckofcardsapi.com/api/deck/${deckId}/draw/?count=8` //grabbing 8 more cards

  fetch(url)
      .then(res => res.json()) // parse response as JSON
      .then(data => { 
        console.log(data)
        console.log('playing war...')
        if(data.remaining < 8){
          console.log('Not enough cards left in the deck to play War. This round is a tie (each player gets their card back). Game will continue drawing 2 cards per round until deck is finished.')
          document.querySelector('h2').innerText = 'There are not enough cards left in the deck to play War. This round is a tie (each player gets their card back). Players will continue drawing 2 cards per round until the deck is finished.'
          player1CardTotal += 1
          player2CardTotal += 1
          playGame()
        }
       

        document.querySelector('#player1War1').src = 'img/back.png' 
        document.querySelector('#player1War2').src = 'img/back.png'        
        document.querySelector('#player1War3').src = 'img/back.png' 
        document.querySelector('#player1War4').src = data.cards[3].image

        document.querySelector('#player2War1').src = 'img/back.png' 
        document.querySelector('#player2War2').src = 'img/back.png' 
        document.querySelector('#player2War3').src = 'img/back.png' 
        document.querySelector('#player2War4').src = data.cards[7].image
       
        let player1WarVal = convertValToNum(data.cards[3].value)
        let player2WarVal = convertValToNum(data.cards[7].value)

        if(player1WarVal > player2WarVal){
          document.querySelector('h2').innerText = "War! Player 1 Wins the Round"
          player1CardTotal += 8
          console.log(`Player 1 Total Cards: ${player1CardTotal}`)
          console.log(`Player 2 Total Cards: ${player2CardTotal}`)
        }else if(player1WarVal < player2WarVal){
          document.querySelector('h2').innerText = "War! Player 2 Wins the Round"
          player2CardTotal += 8
          console.log(`Player 1 Total Cards: ${player1CardTotal}`)
          console.log(`Player 2 Total Cards: ${player2CardTotal}`)
        }else{
          document.querySelector('h2').innerText = "Tie! Time for Double War!"
          playDoubleWar()
        }

        document.querySelectorAll('.player1WarCard').forEach(element=>{
          element.classList.remove('hidden')
        })
        document.querySelectorAll('.player2WarCard').forEach(element=>{
          element.classList.remove('hidden')
        })
      })
      .catch(err => {
          console.log(`error ${err}`)
      });

}

function playDoubleWar(){
  console.log('playing double war...')
  playWar()
  if(data.remaining < 8){
    console.log('Not enough cards left in the deck to play War. This round is a tie (each player gets their card back). Game will continue drawing 2 cards per round until deck is finished.')
    document.querySelector('h2').innerText = 'Not enough cards left in the deck to play War. This round is a tie (each player gets their card back). Game will continue drawing 2 cards per round until deck is finished.'
    player1CardTotal += 1
    player2CardTotal += 1
    console.log(`Player 1 Total Cards: ${player1CardTotal}`)
    console.log(`Player 2 Total Cards: ${player2CardTotal}`)
    playGame()
  }
}

function checkForWinner(){
  console.log('checking for winner...')
  console.log(`Player 1 Total Cards: ${player1CardTotal}`)
  console.log(`Player 2 Total Cards: ${player2CardTotal}`)
  if((player1CardTotal + player2CardTotal === 52) && (player1CardTotal > player2CardTotal)){
    document.querySelector('h4').innerText = "Game Result: Player 1 Wins the Game!"
  }else if((player1CardTotal + player2CardTotal === 52) && (player2CardTotal > player1CardTotal)){
    document.querySelector('h4').innerText = "Game Result: Player 2 Wins the Game!"
  }else if((player1CardTotal + player2CardTotal === 52) && (player1CardTotal === player2CardTotal)){
    document.querySelector('h4').innerText = "Game Result: It's a tie game!"
  }
}
function convertValToNum(val){
  if(val === "ACE"){
    return 14
  }else if(val === "KING"){
    return 13
  }else if(val === "QUEEN"){
    return 12
  }else if(val === "JACK"){
    return 11
  }else{
    return Number(val) 
  }
}