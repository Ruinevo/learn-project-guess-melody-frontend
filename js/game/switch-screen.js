import guessArtistScreen from './../screens/artist';
import guessGenreScreen from './../screens/genre';
import livesOverScreen from './../screens/livesover-result';
import resultScreen from './show-result';

import {renderScreen} from './renderScreen';
import {getRandomFromArray} from './util';
import {calculateScoresForGame} from './calculate-scores';

import {INITIAL_GAME} from './../data/game-data';
import {guessArtistData} from './../data/game-data';
import {statistics} from './../data/game-data';
import {guessGenreData} from './../data/game-data';

const MAX_COUNTS_SCREENS = 10;
let countOfDisplayedScreens = 0;

export let currentLives = INITIAL_GAME.lives;
export let resultsOfCurrentPlayer = [];

export const loseLife = () => {
  currentLives--;
};

const reset = () => { // сброс к первоначальным настройкам перед началом новой игры
  resultsOfCurrentPlayer = [];
  currentLives = INITIAL_GAME.lives;
  countOfDisplayedScreens = 0;
};

const gameOver = (results, lives) => {
  if (lives < 1) {
    renderScreen(livesOverScreen);
  } else {
    const points = calculateScoresForGame(resultsOfCurrentPlayer, currentLives); // считаем очки
    renderScreen(resultScreen(statistics, points)); // показываем результат
  }
  reset();
};

export default () => {
  if (countOfDisplayedScreens < MAX_COUNTS_SCREENS - 1 && currentLives > 0) {
    const screens = [guessArtistScreen(guessArtistData.questions), guessGenreScreen(guessGenreData.questions)];
    const randomScreen = getRandomFromArray(screens);
    renderScreen(randomScreen);
    countOfDisplayedScreens++;
  } else {
    gameOver(resultsOfCurrentPlayer, currentLives);
  }
};
