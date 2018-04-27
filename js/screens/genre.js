import AbstractScreen from './../game';
import guessGenreData from './../data/genre-data';
import store from './../data/game-store';
import switchScreen from './../game/switch-screen';
import HeaderView from './../game/header';

class GenreScreen extends AbstractScreen {

  constructor(state, data) {
    super();
    this.state = state;
    this.data = data;
    this._interval = null;
    this.answerTime = 0;
    this.header = new HeaderView(this.state);

  }


  createGameLevel() {
    this.getLevelType();
    this.view.onAnswerClick = () => {
      this.view.isAnswerSelected();
    };
    this.view.onSubmitClick = (evt) => {
      evt.preventDefault();
      this.view.processingAnswer(this.answerTime);
      this.answerTime = 0;
      this.updateHeader();
      this.stopGame();
      switchScreen();
    };
    this.view.element.appendChild(this.header.element);
  }
}

const genre = new GenreScreen(store, guessGenreData);

export default genre;


