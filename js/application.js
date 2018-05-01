import WelcomeScreen from './screens/welcome';
import ResultScreen from './screens/result';
import GameScreen from './screens/game';
import store from './data/game-store';
import QuestionService from './data/question-service';

export default class Application {

  static showWelcome() {
    const welcome = new WelcomeScreen(store);
    welcome.createGameLevel();
  }

  static showGame() {
    GameScreen.switchScreen();
  }

  static showStats() {
    GameScreen.stopGame();
    const result = new ResultScreen(store);
    QuestionService.saveResults(store.resultsOfCurrentPlayer).
        then(() => QuestionService.loadResult()).
        then((data) => result.showResults(data));
  }

}
