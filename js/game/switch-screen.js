import guessArtistScreen from './../screens/artist';
import guessGenreScreen from './../screens/genre';
import resultScreen from './../screens/result';
import {getRandomFromArray} from './util';
import store from './../data/game-store';

const ROUNDS = 10;

export default () => {
  if (store.currentState.countOfDisplayedScreens < ROUNDS - 1 && store.currentState.lives > 0) {
    const screens = [guessArtistScreen, guessGenreScreen];
    const randomScreen = getRandomFromArray(screens);
    randomScreen();
    store.addDisplayedScreen();
  } else {
    resultScreen();
  }
};


