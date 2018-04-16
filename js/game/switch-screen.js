import guessArtistScreen from './../screens/artist';
import guessGenreScreen from './../screens/genre';
import livesOverScreen from './../screens/livesover-result';
import resultScreen from './result';

import {renderScreen} from './renderScreen';
import {getRandomFromArray} from './util';
import {calculateScoresForGame} from './calculate-scores';

import guessGenreData from './../data/guessGenre-data';
import guessArtistData from './../data/guessArtist-data';

import currentData from './../data/game-store';

const ROUNDS = 10;

const gameOver = (results, lives) => {
  if (lives < 1) {
    renderScreen(livesOverScreen);
  } else {
    const points = calculateScoresForGame(results, lives); // считаем очки
    currentData.setStatistics(points);
    renderScreen(resultScreen(currentData.statistics, points)); // показываем результат
  }
  currentData.reset();
};

export default () => {
  if (currentData.currentState.countOfDisplayedScreens < ROUNDS - 1 && currentData.currentState.lives > 0) {
    const screens = [guessArtistScreen(guessArtistData.question), guessGenreScreen(guessGenreData.question)];
    const randomScreen = getRandomFromArray(screens);
    renderScreen(randomScreen);
    currentData.setCountOfDisplayedScreens();
  } else {
    gameOver(currentData.resultsOfCurrentPlayer, currentData.lives);
  }
};


