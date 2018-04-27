import guessArtistScreen from './../screens/artist';
import guessGenreScreen from './../screens/genre';
import {getRandomFromArray} from './util';
import store from './../data/game-store';
import Application from './../screens/application';

const ROUNDS = 10;

export default () => {
  if (store.countOfDisplayedScreens < ROUNDS && store.lives > 0) {
    const screens = [guessArtistScreen, guessGenreScreen];
    const randomScreen = getRandomFromArray(screens);
    randomScreen.init();
    store.addDisplayedScreen();
  } else {
    Application.showStats();
  }
};
