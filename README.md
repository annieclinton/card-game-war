![alt text](https://github.com/annieclinton/card-game-war/blob/main/playwar.png)

# Play War

This web application allows users to play the classic card game "War" against a computer. Each round, players are dealt two cards—one for the user and one for the computer. The player with the higher card wins the round. In the event of a tie, a "War" occurs, where each player is dealt four additional cards, and the highest fourth card determines the winner of the round.

Link to project: TBD

## How It's Made:

**Tech used:** HTML, CSS, JavaScript, Deck of Cards API 

The application initializes by fetching a deck ID from the Deck of Cards API and stores it globally. Users can draw cards with a button click using this deck ID. If the cards are the same, it triggers a "War" sequence where additional cards are drawn. The backend logic is managed by JavaScript, ensuring the game progresses smoothly and state changes are visually represented.

I designed the frontend using HTML and CSS, giving it a clean and straightforward user interface. JavaScript handles the game dynamics and interacts with the API for deck and card management.

The game's state is maintained across page reloads using localStorage to remember the current deck ID. This improves the user experience by preventing the game from restarting unintentionally.

## Optimizations

While the basic functionality is set, the project can be optimized by integrating better state management for handling complex game scenarios like multiple consecutive ties. Additionally, enhancing the visual feedback for "War" rounds could make the game more engaging.

Future improvements could include features like score tracking, player names input, and a more robust mobile-responsive design. 

## Lessons Learned:

Building this game helped solidify my understanding of asynchronous JavaScript, particularly in handling API responses and managing application state across user interactions. It was also an excellent practice in designing intuitive UIs with HTML and CSS. I encountered challenges in managing game state during "War" scenarios, which taught me more about the complexities of game logic and state management in web applications.