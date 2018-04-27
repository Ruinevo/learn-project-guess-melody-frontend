import {renderScreen} from './../game/renderScreen';
import WelcomeView from './../view/welcome-view';
import AbstractScreen from './game';

export default class WelcomeScreen extends AbstractScreen {
  constructor(state) {
    super();
    this.view = new WelcomeView();
    this.state = state;
  }

  init() {
    this.view.onPlayClick = (evt) => {
      evt.preventDefault();
      this.showNextScreen(this.state);
    };
    renderScreen(this.view);
  }

}
