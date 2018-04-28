import {renderScreen} from './game/renderScreen';
import {settingPlayer} from './game/util';
import Application from './screens/application';

export default class AbstractScreen {
  constructor() {
    if (new.target === AbstractScreen) {
      throw new Error(`Can't instantiate AbstractScreen, only concrete one`);
    }
    this.answerTime = 0;
  }


  loadInterval() {
    this.header.updateTime();
    this._interval = setInterval(() => {
      if (this.state.time <= 0) {
        Application.showStats();
      }
      this.state.tick();
      this.answerTime++;
      this.header.updateTime();
    }, 1000);
  }


  init() {
    this.createGameLevel();
    this.loadInterval();
    settingPlayer(this.view);
    renderScreen(this.view);
  }

  stopGame() {
    clearInterval(this._interval);
  }

}


