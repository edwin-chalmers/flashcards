const data = require('./data');
const deck = data.prototypeData;
const util = require('./util');

const { 
  createCard, 
  evaluateGuess,
  countCards,
  createRound,
  takeTurn,
  calculatePercentCorrect,
  endRound
} = require('./card');

function printMessage(deck) {
  console.log(`Welcome to FlashCards! You are playing with ${countCards(deck)} cards.
  -----------------------------------------------------------------------`);
}

function printQuestion(round) {
  util.main(round);
}

// ---- my functions ---- //


function start(deck) {
  var round = createRound(deck)
  printMessage(deck)
  printQuestion(round)


}


module.exports = { 
  printMessage, 
  printQuestion,
  start 
};
