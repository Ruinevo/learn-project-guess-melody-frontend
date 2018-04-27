
import guessGenreData from './../data/genre-data';
import store from './../data/game-store';


import AbstractScreen from './game';


class GenreScreen extends AbstractScreen {

  constructor(state, data) {
    super();
    if (new.target === AbstractScreen) {
      throw new Error(`Can't instantiate AbstractScreen, only concrete one`);
    }

    this.state = state;
    this.data = data;
    this._interval = null;
    this.answerTime = 0;

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
      this.showNextScreen(this.state);
    };
    this.view.element.appendChild(this.header.element);
  }
}

const genre = new GenreScreen(store, guessGenreData);

export default genre;


