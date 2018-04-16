import guessArtistScreen from './../screens/artist';
import guessGenreScreen from './../screens/genre';
import resultScreen from './../screens/result';
import {renderScreen} from './renderScreen';
import {getRandomFromArray} from './util';
import {calculateScoresForGame} from './calculate-scores';
import guessGenreData from './../data/genre-data';
import guessArtistData from './../data/artist-data';
import store from './../data/game-store';

const ROUNDS = 10;

const TEMPLATE_TEXT = {
  'result': {
    h2: `Вы настоящий меломан!`,
    button: `Сыграть ещё раз`
  },
  'livesover': {
    h2: `Какая жалость!`,
    button: `Попробовать ещё раз`
  },
  'timeover': {
    h2: `Увы и ах!`,
    button: `Попробовать ещё раз`
  }
};


const gameOver = (results, lives) => {
  const points = calculateScoresForGame(results, lives);
  const currentPlayer = {};
  currentPlayer.points = points;
  currentPlayer.lives = lives;
  if (lives < 1) {
    renderScreen(resultScreen(store.statistics, currentPlayer, TEMPLATE_TEXT.livesover));
  } else {
    store.addResultToStats(points);
    renderScreen(resultScreen(store.statistics, currentPlayer, TEMPLATE_TEXT.result));
  }
  store.reset();
};

export default () => {
  if (store.currentState.countOfDisplayedScreens < ROUNDS - 1 && store.currentState.lives > 0) {
    const screens = [guessArtistScreen(guessArtistData.question), guessGenreScreen(guessGenreData.question)];
    const randomScreen = getRandomFromArray(screens);
    renderScreen(randomScreen);
    store.addDisplayedScreen();
  } else {
    gameOver(store.resultsOfCurrentPlayer, store.lives);
  }
};


