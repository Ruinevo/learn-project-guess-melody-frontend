import WelcomeScreen from './screens/welcome';
import ResultScreen from './screens/result';
import GameScreen from './screens/game';
import store from './data/game-store';
import {getRandomFromObj} from './game/util';


export default class Application {

  static showWelcome() {
    const welcome = new WelcomeScreen(store);
    welcome.createGameLevel();
  }

  static showGame() {
    const randomScreenData = getRandomFromObj(store.data);
    GameScreen.init(randomScreenData);
  }

  static showStats() {
    const result = new ResultScreen(store);
    result.showResults();
    GameScreen.stopGame();
  }

}
