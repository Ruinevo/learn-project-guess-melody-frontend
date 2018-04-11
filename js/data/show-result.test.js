import {assert} from 'chai';
import {showResult} from './show-result';

let mockResultsOfOtherPlayers;
let mockResultOfCurrentPlayer;

describe(`Display results`, () => {

  beforeEach(() => {
    mockResultsOfOtherPlayers = [4, 8, 10, 12];
    mockResultOfCurrentPlayer = {};
    mockResultOfCurrentPlayer.time = 120;
    mockResultOfCurrentPlayer.lives = 3;
    mockResultOfCurrentPlayer.points = 12;
  });

  it(`should return "У вас закончились все попытки. Ничего, повезёт в следующий раз!", if  lives were lost`, () => {
    mockResultOfCurrentPlayer.lives = 0;
    assert.equal(`У вас закончились все попытки. Ничего, повезёт в следующий раз!`, showResult(mockResultsOfOtherPlayers, mockResultOfCurrentPlayer));
  });

  it(`should return "Время вышло! Вы не успели отгадать все мелодии", if time is up`, () => {
    mockResultOfCurrentPlayer.time = 0;
    assert.equal(`Время вышло! Вы не успели отгадать все мелодии`, showResult(mockResultsOfOtherPlayers, mockResultOfCurrentPlayer));
  });

  it(`should return "Вы заняли 2 место из 5 игроков. Это лучше, чем у 60% игроков" if the player got the second place`, () => {
    mockResultOfCurrentPlayer.points = 11;
    assert.equal(`Вы заняли 2 место из 5 игроков. Это лучше, чем у 60% игроков`, showResult(mockResultsOfOtherPlayers, mockResultOfCurrentPlayer));
  });

  it(`should return "Вы заняли 1 место из 5 игроков. Это лучше, чем у 80% игроков" if the player got the first place`, () => {
    mockResultOfCurrentPlayer.points = 20;
    assert.equal(`Вы заняли 1 место из 5 игроков. Это лучше, чем у 80% игроков`, showResult(mockResultsOfOtherPlayers, mockResultOfCurrentPlayer));
  });

  it(`should return "Вы заняли 5 место из 5 игроков. Это лучше, чем у 0% игроков" if the player got the last place `, () => {
    mockResultOfCurrentPlayer.points = 1;
    assert.equal(`Вы заняли 5 место из 5 игроков. Это лучше, чем у 0% игроков`, showResult(mockResultsOfOtherPlayers, mockResultOfCurrentPlayer));
  });

  it(`should return "Вы заняли 1 место из 6 игроков. Это лучше, чем у 83.33333333333333% игроков" if the percent is not an integer`, () => {
    mockResultsOfOtherPlayers = [8, 8, 9, 10, 12];
    assert.equal(`Вы заняли 1 место из 6 игроков. Это лучше, чем у 83.33333333333333% игроков`, showResult(mockResultsOfOtherPlayers, mockResultOfCurrentPlayer));
  });

  it(`should return "Вы заняли 1 место из 1 игроков. Это лучше, чем у 0% игроков" if only one result in array of results`, () => {
    assert.equal(`Вы заняли 1 место из 1 игроков. Это лучше, чем у 0% игроков`, showResult([], mockResultOfCurrentPlayer));
  });

});
