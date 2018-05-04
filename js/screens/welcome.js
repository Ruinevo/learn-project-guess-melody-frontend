import {renderScreen} from './../game/render-screen';
import WelcomeView from './../view/welcome-view';
import PreloadView from './../view/preload-view';
import Application from './../application';
import Backend from './../data/backend';


export default class WelcomeScreen {
  constructor(state) {
    this.state = state;
    this.view = new WelcomeView();
    this.preload = new PreloadView();
  }

  createGameLevel() {
    this.view.onPlayClick = (evt) => {
      evt.preventDefault();
      Application.showGame();
    };
    const logo = this.view.element.querySelector(`.logo`);
    this.view.element.insertBefore(this.preload.element, logo);
    this.view.disablePlayButton();
    Backend.loadQuestions().then((data) => this.preload.preloadAudio(data)).then(() => this.view.enablePlayButton());
    renderScreen(this.view);
  }

}
