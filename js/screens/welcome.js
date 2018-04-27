import {renderScreen} from './../game/renderScreen';
import WelcomeView from './../view/welcome-view';
import AbstractScreen from './../game';
import switchScreen from './../game/switch-screen';

export default class WelcomeScreen extends AbstractScreen {
  constructor(state) {
    super();
    this.view = new WelcomeView();
    this.state = state;
  }

  init() {
    this.view.onPlayClick = (evt) => {
      evt.preventDefault();
      switchScreen();
    };
    renderScreen(this.view);
  }

}
