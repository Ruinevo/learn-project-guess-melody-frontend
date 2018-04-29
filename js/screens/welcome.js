import {renderScreen} from './../game/renderScreen';
import WelcomeView from './../view/welcome-view';
import Application from './../application';

export default class WelcomeScreen {
  constructor(state) {
    this.state = state;
    this.view = new WelcomeView(this.state);
  }

  createGameLevel() {
    this.view.onPlayClick = (evt) => {
      evt.preventDefault();
      Application.showGame();
    };
    renderScreen(this.view);
  }

}
