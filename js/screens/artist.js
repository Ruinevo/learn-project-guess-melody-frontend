import guessArtistData from './../data/artist-data';
import store from './../data/game-store';
import AbstractScreen from './../game';
import switchScreen from './../game/switch-screen';
import HeaderView from './../game/header';

class ArtistScreen extends AbstractScreen {
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
    this.view.onAnswerClick = (evt) => {
      evt.preventDefault();
      this.stopGame();
      this.view.processingAnswer(evt, this.answerTime);
      this.answerTime = 0;
      this.updateHeader();
      switchScreen();
    };
    this.view.element.appendChild(this.header.element);

  }
}

const artist = new ArtistScreen(store, guessArtistData);

export default artist;
