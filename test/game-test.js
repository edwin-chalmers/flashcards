const chai = require('chai');
const expect = chai.expect;

const data = require('../src/data');
// const deck = data.prototypeData;
// const util = require('../src/util');

const { 
    printMessage, 
    printQuestion,
    start 
} = require('../src/game');

describe('game', function() {
    it('should be a function', function() {
      expect(start).to.be.a('function');
    });
  
    it('should count the cards in a deck', function() {
      const deck = data.prototypeData;
      startObject = start(deck)
      
      console.log(startObject)
  
      
    });
  
  });