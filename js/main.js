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
          document.querySelector('h2').innerText = "Player 1 Wins"
        }else if(player1Val < player2Val){
          document.querySelector('h2').innerText = "Player 2 Wins"
        }else if(player1Val === player2Val){
          document.querySelector('h2').innerText = "War!"
          playWar()
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
        // document.querySelector('#player1').src = data.cards[0].image
        // document.querySelector('#player2').src = data.cards[1].image
        document.querySelector('#player1War1').src = data.cards[0].image
        document.querySelector('#player1War2').src = data.cards[1].image
        document.querySelector('#player1War3').src = data.cards[2].image
        document.querySelector('#player1War4').src = data.cards[3].image
        document.querySelector('#player2War1').src = data.cards[4].image
        document.querySelector('#player2War2').src = data.cards[5].image
        document.querySelector('#player2War3').src = data.cards[6].image
        document.querySelector('#player2War4').src = data.cards[7].image
       
        let player1WarVal = convertValToNum(data.cards[3].value)
        let player2WarVal = convertValToNum(data.cards[7].value)
        if(player1WarVal > player2WarVal){
          document.querySelector('h2').innerText = "War! Player 1 Wins"
        }else if(player1WarVal < player2WarVal){
          document.querySelector('h2').innerText = "War! Player 2 Wins"
        }else{
          document.querySelector('h2').innerText = "War tie! Double War? Not sure what happens now!"
        }
      })

        document.querySelectorAll('.player1WarCard').forEach(element=>{
          element.classList.remove('hidden')
        })
        document.querySelectorAll('.player2WarCard').forEach(element=>{
          element.classList.remove('hidden')
        })

      .catch(err => {
          console.log(`error ${err}`)
      });

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