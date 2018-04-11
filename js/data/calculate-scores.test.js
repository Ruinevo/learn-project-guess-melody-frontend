import {assert} from 'chai';
import {calculateScoresForGame} from './calculate-scores';

let mockResultsRightNotFast;
let mockResultsRightMixedSpeed;

describe(`Calculates points of player`, () => {

  beforeEach(() => {
    mockResultsRightNotFast = [
      {success: true, time: 40},
      {success: true, time: 40},
      {success: true, time: 40},
      {success: true, time: 40},
      {success: true, time: 40},
      {success: true, time: 40},
      {success: true, time: 40},
      {success: true, time: 40},
      {success: true, time: 40},
      {success: true, time: 40}
    ];

    mockResultsRightMixedSpeed = [
      {success: true, time: 20},
      {success: true, time: 40},
      {success: true, time: 20},
      {success: true, time: 40},
      {success: true, time: 20},
      {success: true, time: 40},
      {success: true, time: 20},
      {success: true, time: 40},
      {success: true, time: 20},
      {success: true, time: 40}
    ];

  });

  it(`should return -1, if count of answers < 10`, () => {

    const mockResults = [
      {success: true, time: 20},
      {success: true, time: 40},
      {success: true, time: 20},
      {success: true, time: 40},
      {success: true, time: 20},
      {success: true, time: 40},
      {success: true, time: 20},
      {success: true, time: 40}
    ];

    assert.equal(-1, calculateScoresForGame(mockResults));
    assert.notEqual(-1, calculateScoresForGame(mockResultsRightNotFast));
    assert.equal(-1, calculateScoresForGame([]));
  });

  it(`should return 10, if player answered all questions correctly and not fast`, () => {
    assert.equal(10, calculateScoresForGame(mockResultsRightNotFast));
  });

  it(`should return 20, if player answered all questions correctly and fast`, () => {

    const mockResults = [
      {success: true, time: 20},
      {success: true, time: 20},
      {success: true, time: 20},
      {success: true, time: 20},
      {success: true, time: 20},
      {success: true, time: 20},
      {success: true, time: 20},
      {success: true, time: 20},
      {success: true, time: 20},
      {success: true, time: 20}
    ];

    assert.equal(20, calculateScoresForGame(mockResults));
  });

  it(`Should not return -1, if the player answered with different speed`, () => {
    assert.notEqual(-1, calculateScoresForGame(mockResultsRightMixedSpeed));
  });

  it(`Should calculate the scores if the player answered with different speed, but correctly`, () => {
    assert.equal(15, calculateScoresForGame(mockResultsRightMixedSpeed));
  });
});
