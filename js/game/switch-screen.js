import store from './../data/game-store';
import Application from './../application';

const ROUNDS = 10;

export default () => {
  if (store.countOfDisplayedScreens < ROUNDS && store.lives > 0) {
    Application.showGame();
    store.addDisplayedScreen();
  } else {
    Application.showStats();
  }
};
