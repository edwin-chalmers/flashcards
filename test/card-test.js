const chai = require('chai');
const expect = chai.expect;

const { 
  createCard, 
  evaluateGuess,
  countCards,
  createDeck,
  createRound,
  takeTurn,
  calculatePercentCorrect,
  endRound
} = require('../src/card');

describe('card', function() {
  let card1, card2, card3, deck, round, guess1, guess2, guess3

  beforeEach(function() {
    card1 = createCard(1, 'What is Robbie\'s favorite animal', ['sea otter', 'pug', 'capybara'], 'sea otter');
    card2 = createCard(14, 'What organ is Khalid missing?', ['spleen', 'appendix', 'gallbladder'], 'gallbladder');
    card3 = createCard(12, 'What is Travis\'s middle name?', ['Lex', 'William', 'Fitzgerald'], 'Fitzgerald');
    
    deck = createDeck([card1, card2, card3]);
    round = createRound(deck);
    guess1 = 'sea otter';
    guess2 = 'appendix';
    guess3 = 'Fitzgerald';
  });

  it('should be a function', function() {
    expect(createCard).to.be.a('function');
  });

  it('should create a card and its properties', function() {
    const card = createCard(1, 'What allows you to define a set of related information using key-value pairs?', ['object', 'array', 'function'], 'object');
    
    expect(card.id).to.equal(1);
    expect(card.question).to.equal('What allows you to define a set of related information using key-value pairs?');
    expect(card.answers).to.deep.equal(['object', 'array', 'function']);
    expect(card.correctAnswer).to.equal('object');
  });  

  it('should determine if an answer is correct', function() {
    const sunCard = createCard(2, 'What color is the sun?', 'white', 'white');
    const sunQuestion = evaluateGuess(sunCard.answers, sunCard.correctAnswer)

    expect(sunQuestion).to.equal('correct!') 
  })
  
  it('should determine if an answer is incorrect', function() {
    const moonCard = createCard(3, 'What is the moon made of?', 'cheese', 'moon rocks?');
    const moonQuestion = evaluateGuess(moonCard.answers, moonCard.correctAnswer)

    expect(moonQuestion).to.equal('incorrect!') 
  })

  it('should count the cards in a deck', function() {
    const deck = countCards([card1, card2, card3]);

    expect(deck).to.deep.equal(3)
  });

  it('should create a round to organize guesses and records', function() {
    const round = createRound(deck);

    expect(round.deck).to.be.an('array')
    expect(round.currentCard.id).to.equal(1)
    expect(round.turns).to.equal(0)
    expect(round.incorrectGuesses).to.deep.equal([])
  });

  it('should update the turn count', function() {
    const correctGuess = 'sea otter'

    takeTurn(correctGuess, round)
    expect(round.turns).to.deep.equal(1)
    takeTurn(correctGuess, round)
    expect(round.turns).to.equal(2)
  })

  it('stores ids of guesses', function() {
    const incorrectGuess = 'pug';

    expect(takeTurn(incorrectGuess, round)).to.equal('incorrect!');
    expect(round.incorrectGuesses).to.deep.equal([1]);
  })
  
  it('should progess rounds', function() {
    expect(round.turns).to.deep.equal(0);
    expect(takeTurn(guess1, round)).to.equal('correct!');
    expect(round.incorrectGuesses).to.deep.equal([]);
    expect(round.turns).to.deep.equal(1);
    expect(takeTurn(guess2, round)).to.equal('incorrect!');
    expect(round.incorrectGuesses).to.deep.equal([14]);
    expect(round.turns).to.deep.equal(2);
    expect(takeTurn(guess3, round)).to.equal('correct!');
    expect(round.incorrectGuesses).to.deep.equal([14]);
  })
  
  it('should calculate and return the percentage of correct guesses', function() {
    takeTurn(guess1, round)
    takeTurn(guess2, round)
    takeTurn(guess3, round)
    var percentCorrect = calculatePercentCorrect(round)

    expect(percentCorrect).to.deep.equal(66);
  })
  
  it('should end the round', function() {
    takeTurn(guess1, round)
    takeTurn(guess2, round)
    takeTurn(guess3, round)
    const percentCorrect = calculatePercentCorrect(round)
    const roundEnds = endRound(round, percentCorrect)

    expect(roundEnds).to.equal('** Round over! ** You answered 66% of the questions correctly!');
  })

});