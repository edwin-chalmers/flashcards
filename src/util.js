const inquirer = require('inquirer');
const { takeTurn, endRound, calculatePercentCorrect } = require('./card');

const genList = (round) => {
  let card = round.currentCard;
  
  let choices = card.answers.map((answer, index) => {
    return {
      key: index,
      value: answer
    }
  });
  return {
    type: 'rawlist',
    message: card.question,
    name: 'answers',
    choices: choices
  };
}

const getRound = (round) => {
  return Promise.resolve(round);
}

const confirmUpdate = (id, round) => {
  const feedback = takeTurn(id, round);
  return {
    name: 'feedback',
    message: `Your answer of ${id} is ${feedback}`
  }
}

let startTime = Date.now();

async function main(round) {
  const currentRound = await getRound(round);
  const getAnswer = await inquirer.prompt(genList(currentRound));
  const getConfirm = await inquirer.prompt(confirmUpdate(getAnswer.answers, round));

  if (round.turns >= round.deck.length) {
    const endTime = Date.now();
    const duration = endTime - startTime;
    const minutes = Math.floor(duration / 60000);
    const seconds = ((duration % 60000) / 1000).toFixed(0);
        

    const percent = calculatePercentCorrect(round);
    console.log(endRound(round, percent));
    console.log(`Time taken: ${minutes} minute(s) and ${seconds} second(s).`);
  } else {
    main(round);
  }
}

module.exports.main = main;