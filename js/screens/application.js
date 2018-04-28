import WelcomeScreen from './welcome';
import ResultScreen from './result';
import store from './../data/game-store';
import guessArtistScreen from './../screens/artist';
import guessGenreScreen from './../screens/genre';
import {getRandomFromArray} from './../game/util';


export default class Application {

  static showWelcome() {
    const welcome = new WelcomeScreen(store);
    welcome.createGameLevel();
  }

  static showGame() {
    const screens = [guessArtistScreen, guessGenreScreen];
    const randomScreen = getRandomFromArray(screens);
    guessArtistScreen.stopGame();
    guessGenreScreen.stopGame();
    randomScreen.init();
  }

  static showStats() {
    const result = new ResultScreen(store);

    result.showResults();
  }

}
