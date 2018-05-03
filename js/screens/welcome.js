import {renderScreen} from './../game/render-screen';
import WelcomeView from './../view/welcome-view';
import PreloadView from './../game/player';
import Application from './../application';
import Backend from './../data/backend';


export default class WelcomeScreen {
  constructor(state) {
    this.state = state;
    this.view = new WelcomeView(this.state);
    this.preload = new PreloadView();
  }

  createGameLevel() {
    this.view.onPlayClick = (evt) => {
      evt.preventDefault();
      Application.showGame();
    };
    const logo = this.view.element.querySelector(`.logo`);
    this.view.element.insertBefore(this.preload.element, logo);
    Backend.load().then((data) => this.preload.preloadAudio(data));
    renderScreen(this.view);
  }

}
