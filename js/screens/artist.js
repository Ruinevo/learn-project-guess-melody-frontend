import guessArtistData from './../data/artist-data';
import store from './../data/game-store';
import AbstractScreen from './game';

class ArtistScreen extends AbstractScreen {
  constructor(state, data) {
    super();
    if (new.target === AbstractScreen) {
      throw new Error(`Can't instantiate AbstractView, only concrete one`);
    }
    this.state = state;
    this.data = data;
    this._interval = null;
    this.answerTime = 0;

  }

  createGameLevel() {
    this.getLevelType();
    this.view.onAnswerClick = (evt) => {
      evt.preventDefault();
      this.stopGame();
      this.view.processingAnswer(evt, this.answerTime);
      this.answerTime = 0;
      this.updateHeader();
      this.showNextScreen(this.state);
    };
    this.view.element.appendChild(this.header.element);

  }
}

const artist = new ArtistScreen(store, guessArtistData);

export default artist;
