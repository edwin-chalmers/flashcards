// This is where your project starts.
const data = require('./src/data');
const deck = data.prototypeData;
const util = require('./src/util');

const { 
    start 
} = require('./src/game');



console.log('Your project is running...'); 
console.log(start(deck)); 
