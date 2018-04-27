import WelcomeScreen from './welcome';
import ResultScreen from './result';
import store from './../data/game-store';


export default class Application {

  static showWelcome() {
    const welcome = new WelcomeScreen(store);
    welcome.init();
  }

  static showGame() {
    const welcome = new WelcomeScreen(store);
    welcome.showNextScreen(store);
  }

  static showStats() {
    const result = new ResultScreen(store);
    result.showResults();
  }

}
