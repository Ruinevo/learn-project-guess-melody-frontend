import {renderScreen} from './game/renderScreen';
import ArtistView from './view/artist-view';
import GenreView from './view/genre-view';
import {settingPlayer} from './game/util';
import HeaderView from './game/header';
import Application from './screens/application';

export default class AbstractScreen {
  constructor() {
    if (new.target === AbstractScreen) {
      throw new Error(`Can't instantiate AbstractView, only concrete one`);
    }
  }

  getLevelType() {
    if (this.data.type === `artist`) {
      this.view = new ArtistView(this.data, this.state);
    }
    if (this.data.type === `genre`) {
      this.view = new GenreView(this.data, this.state);
    }
  }

  init() {
    this.createGameLevel();
    this._interval = setInterval(() => {
      if (this.state.time <= 0) {
        this.stopGame();
        Application.showStats();
      }
      this.state.tick();
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
    const header = new HeaderView(this.state);
    this.view.element.replaceChild(header.element, this.header.element);
    this.header = header;
  }
}


