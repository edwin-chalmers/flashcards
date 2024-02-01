function createCard(id, question, answers, correctAnswer) {
    return {
        id: id,
        question: question,
        answers: answers,
        correctAnswer: correctAnswer
    }
}

function createDeck(cards) {
    return cards
}

function countCards(cards) {
    return cards.length
}

function createRound(deck) {
    var currentDeck = {
        deck: deck,
        currentCard: deck[0],
        turns: 0,
        incorrectGuesses: []
    }
    return currentDeck
}

function evaluateGuess(guess, correctAnswer, round) {
    if (guess === correctAnswer) {
        return 'correct!'
    } else {
        incorrectGuessID(round)
        return 'incorrect!'
    }
}

function takeTurn(guess, round) {
    var result = evaluateGuess(guess, round.currentCard.correctAnswer, round);
    increaseTurn(round);
    return result;
}

function increaseTurn(round) {
    round.turns++;
    if (round.turns < round.deck.length) {
        round.currentCard = round.deck[round.turns];
    } else {
        endRound(round, calculatePercentCorrect(round))
    }
}

function incorrectGuessID(round) {
    if (round) {
    round.incorrectGuesses.push(round.currentCard.id);
    }
}

function calculatePercentCorrect(round) {
    var percentCorrect = Math.floor(100 * (1 - (round.incorrectGuesses.length / round.deck.length)))
    return percentCorrect
}

function endRound(round, percent) {
    if (round.turns === round.deck.length) {
        console.log(`** Round over! ** You answered ${percent}% of the questions correctly!`)
        return `** Round over! ** You answered ${percent}% of the questions correctly!`
    }
}

module.exports = {
    createCard,
    evaluateGuess,
    countCards, 
    createDeck,
    createRound,
    takeTurn,
    calculatePercentCorrect,
    endRound
}