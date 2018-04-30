import WelcomeScreen from './screens/welcome';
import ResultScreen from './screens/result';
import GameScreen from './screens/game';
import ErrorView from './view/error-view';
import store from './data/game-store';
import {renderScreen} from './game/renderScreen';
import QuestionService from './data/question-service';

export default class Application {

  static showWelcome() {
    const welcome = new WelcomeScreen(store);
    welcome.createGameLevel();
  }

  static showGame() {
    QuestionService.reload();
    GameScreen.switchScreen();
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
