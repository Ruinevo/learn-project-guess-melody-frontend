import {renderScreen} from './../game/renderScreen';
import ArtistView from './../view/artist-view';
import GenreView from './../view/genre-view';
import {settingPlayer} from './../game/util';
import HeaderView from './../game/header';
import GuessGenreScreen from './genre';
import GuessArtistScreen from './artist';
import {getRandomFromArray} from './../game/util';
import Application from './application';


const ROUNDS = 10;

export default class AbstractScreen {
  constructor() {
    if (new.target === AbstractScreen) {
      throw new Error(`Can't instantiate AbstractView, only concrete one`);
    }
  }

  getLevelType() {
    if (this.data.type === `artist`) {
      this.view = new ArtistView(this.data, this.store);
    }
    if (this.data.type === `genre`) {
      this.view = new GenreView(this.data, this.store);
    }
  }

  init() {
    this.createGameLevel();
    this._interval = setInterval(() => {
      if (this.store.time <= 0) {
        this.stopGame();
        Application.showStats();
      }
      this.store.tick();
      this.answerTime++;
      this.updateHeader();
    }, 1000);
    settingPlayer(this.view);
    renderScreen(this.view);
  }

  stopGame() {
    clearInterval(this._interval);
  }

  updateHeader() {
    const header = new HeaderView(this.store);
    this.view.element.replaceChild(header.element, this.header.element);
    this.header = header;
  }

  showNextScreen(store) {
    if (store.currentState.countOfDisplayedScreens < ROUNDS && store.currentState.lives > 0) {
      const screens = [GuessGenreScreen, GuessArtistScreen];
      const randomScreen = getRandomFromArray(screens);
      randomScreen.init();
      store.addDisplayedScreen();
    } else {
      Application.showStats();
    }
  }

}


