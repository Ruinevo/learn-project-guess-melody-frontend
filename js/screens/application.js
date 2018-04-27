import WelcomeScreen from './welcome';
import ResultScreen from './result';
import store from './../data/game-store';
import switchScreen from './../game/switch-screen';


export default class Application {

  static showWelcome() {
    const welcome = new WelcomeScreen(store);
    welcome.init();
  }

  static showGame() {
    switchScreen();
  }

  static showStats() {
    const result = new ResultScreen(store);
    result.showResults();
  }

}
