import {assert} from 'chai';
import {countsPointsForGame} from './game-data';
import {showResult} from './game-data';
import {createTimer} from './game-data';

describe(`Calculates points of player`, () => {

  it(`should return -1, if count of answers < 10`, () => {
    assert.equal(-1, countsPointsForGame([1, 2, 3, 4, 5, 6, 7, 8, 9]));
    assert.notEqual(-1, countsPointsForGame([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]));
    assert.equal(-1, countsPointsForGame([]));
  });

  it(`should return 10, if player answered all questions correctly and not fast`, () => {
    assert.equal(10, countsPointsForGame([{success: true, time: 40}, {success: true, time: 40}, {success: true, time: 40}, {success: true, time: 40}, {success: true, time: 40}, {success: true, time: 40}, {success: true, time: 40}, {success: true, time: 40}, {success: true, time: 40}, {success: true, time: 40}]));
  });

  it(`should return 20, if player answered all questions correctly and fast`, () => {
    assert.equal(20, countsPointsForGame([{success: true, time: 20}, {success: true, time: 20}, {success: true, time: 20}, {success: true, time: 20}, {success: true, time: 20}, {success: true, time: 20}, {success: true, time: 20}, {success: true, time: 20}, {success: true, time: 20}, {success: true, time: 20}]));
  });
});

describe(`Display results`, () => {

  it(`should return "У вас закончились все попытки. Ничего, повезёт в следующий раз!", if  lives were lost`, () => {
    assert.equal(`У вас закончились все попытки. Ничего, повезёт в следующий раз!`, showResult([4, 8, 12, 16], {lives: 0}));
  });

  it(`should return "Время вышло! Вы не успели отгадать все мелодии", if time is up`, () => {
    assert.equal(`Время вышло! Вы не успели отгадать все мелодии`, showResult([4, 8, 12, 16], {time: 0}));
  });

  it(`Вы заняли 2 место из 5 игроков. Это лучше, чем у 60% игроков`, () => {
    assert.equal(`Вы заняли 2 место из 5 игроков. Это лучше, чем у 60% игроков`, showResult([4, 8, 12, 16], {points: 14, time: 120, lives: 3}));
  });
});

describe(`Creating timer`, () => {

  it(`should return "Время вышло", if time is up`, () => {
    assert.equal(`Время вышло`, createTimer(0).tick());
  });

});
