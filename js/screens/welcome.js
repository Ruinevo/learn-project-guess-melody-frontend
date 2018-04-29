import {renderScreen} from './../game/renderScreen';
import WelcomeView from './../view/welcome-view';
import switchScreen from './../game/switch-screen';

export default class WelcomeScreen {
  constructor(state) {
    this.state = state;
    this.view = new WelcomeView(this.state);
  }

  createGameLevel() {
    this.view.onPlayClick = (evt) => {
      evt.preventDefault();
      switchScreen();
    };
    renderScreen(this.view);
  }

}
