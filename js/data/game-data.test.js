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

  it(`Should not return -1, if the player answered with different speed`, () => {
    assert.notEqual(-1, countsPointsForGame([{success: true, time: 25}, {success: true, time: 30}, {success: true, time: 35}, {success: true, time: 40}, {success: true, time: 30}, {success: true, time: 20}, {success: true, time: 120}, {success: true, time: 220}, {success: true, time: 200}, {success: true, time: 210}]));
  });

  it(`Should calculate the scores if the player answered with different speed, but correctly`, () => {
    assert.equal(6, countsPointsForGame([{success: true, time: 25}, {success: true, time: 30}, {success: true, time: 35}, {success: true, time: 40}, {success: true, time: 30}, {success: true, time: 20}, {success: true, time: 120}, {success: true, time: 220}, {success: true, time: 200}, {success: true, time: 210}]));
  });
});

describe(`Display results`, () => {

  it(`should return "У вас закончились все попытки. Ничего, повезёт в следующий раз!", if  lives were lost`, () => {
    assert.equal(`У вас закончились все попытки. Ничего, повезёт в следующий раз!`, showResult([4, 8, 12, 16], {lives: 0}));
  });

  it(`should return "Время вышло! Вы не успели отгадать все мелодии", if time is up`, () => {
    assert.equal(`Время вышло! Вы не успели отгадать все мелодии`, showResult([4, 8, 12, 16], {time: 0}));
  });

  it(`should return "Вы заняли 2 место из 5 игроков. Это лучше, чем у 60% игроков" if the player got the second place`, () => {
    assert.equal(`Вы заняли 2 место из 5 игроков. Это лучше, чем у 60% игроков`, showResult([4, 8, 12, 16], {points: 14, time: 120, lives: 3}));
  });

  it(`should return "Вы заняли 1 место из 5 игроков. Это лучше, чем у 80% игроков" if the player got the first place`, () => {
    assert.equal(`Вы заняли 1 место из 5 игроков. Это лучше, чем у 80% игроков`, showResult([1, 2, 3, 4], {points: 14, time: 120, lives: 3}));
  });

  it(`should return "Вы заняли 10 место из 10 игроков. Это лучше, чем у 0% игроков" if the player got the last place `, () => {
    assert.equal(`Вы заняли 10 место из 10 игроков. Это лучше, чем у 0% игроков`, showResult([24, 25, 26, 27, 28, 29, 30, 31, 31], {points: 14, time: 120, lives: 3}));
  });

  it(`should return "Вы заняли 8 место из 11 игроков. Это лучше, чем у 27.272727272727273% игроков" if the percent is not an integer`, () => {
    assert.equal(`Вы заняли 8 место из 11 игроков. Это лучше, чем у 27.272727272727273% игроков`, showResult([24, 25, 26, 27, 28, 29, 30, 12, 13, 0], {points: 14, time: 120, lives: 3}));
  });

  it(`should return "Вы заняли 1 место из 1 игроков. Это лучше, чем у 0% игроков" if only one result in array of results`, () => {
    assert.equal(`Вы заняли 1 место из 1 игроков. Это лучше, чем у 0% игроков`, showResult([], {points: 14, time: 120, lives: 3}));
  });


});

describe(`Creating timer`, () => {

  it(`should return "Время вышло", if time is up`, () => {
    assert.equal(`Время вышло`, createTimer(0).tick());
    assert.equal(`Время вышло`, createTimer(-100).tick());
  });

  it(`should return time reduced by one`, () => {
    assert.equal(499, createTimer(500).tick());
  });

  it(`should not allow set without 'currentTime' and non number value`, () => {
    assert.throws(() => createTimer().tick(), /currentTime should be of type number/);
    assert.throws(() => createTimer(`string`).tick(), /currentTime should be of type number/);
    assert.throws(() => createTimer([]).tick(), /currentTime should be of type number/);
    assert.throws(() => createTimer({}).tick(), /currentTime should be of type number/);
  });

});

