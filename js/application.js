import WelcomeScreen from './screens/welcome';
import ResultScreen from './screens/result';
import GameScreen from './screens/game';
import ErrorView from './view/error-view';
import store from './data/game-store';
import {renderScreen} from './game/renderScreen';
import {checkStatus} from './game/util';
import {adaptServerData} from './game/adapter';


export default class Application {

  static showWelcome() {
    const welcome = new WelcomeScreen(store);
    welcome.createGameLevel();
  }

  static showGame() {
    window.fetch(`https://es.dump.academy/guess-melody/questions`).
        then(checkStatus).
        then((response) => response.json()).
        then((data) => adaptServerData(data)).
        then((answers) => GameScreen.switchScreen(answers)).
        catch((error) => this.showError(error));
  }

  static showStats() {
    const result = new ResultScreen(store);
    result.showResults();
    GameScreen.stopGame();
  }

  static showError(error) {
    const errorView = new ErrorView(error);
    renderScreen(errorView);
  }

}
