# Play tic tac toe in VueJS

This app uses VueJS to enable you to play the classic tic tac toe game.

The game is set up with the following rules:
- A 3 x 3 board size.
- The player that starts first is always random.
  - After that, each player takes turns starting a match.
- The player that gets a full line wins the match!
  - The line can be either horizontal, vertical, or diagonal.
- The player that wins 3 matches first is the game-winner.
- The game is set to up to 5 maximum matches.
- The game can end in a draw.

## Project Setup

### Installing the dependencies
Clone this repository, navigate into the root folder and run:
```
npm install
```

### Compile and hot reload
After installing the dependencies, run:
```
npm run serve
```

This will start a local server at [http://localhost:8080](http://localhost:8080).

### Run unit tests
This application runs unit tests using [Jest](https://jestjs.io/)
To run the tests, use the following command on the project root folder:
```
npm run test:unit
```

This will run all the tests available and show their results on your terminal.


## Recommended environment
- NPM version 8+
- NODE version 16+
- Chrome version 98+


## TODO
- Persisted data;
- Reset game action;
- E2E tests;