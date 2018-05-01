import WelcomeScreen from './screens/welcome';
import ResultScreen from './screens/result';
import GameScreen from './screens/game';
import store from './data/game-store';
import Backend from './data/backend';

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
    if (store.resultsOfCurrentPlayer.length === 10) {
      Backend.saveResults(store.resultsOfCurrentPlayer).
          then(() => Backend.loadResult()).
          then((data) => result.showResults(data));
    } else {
      result.showResults();
    }
  }

}
