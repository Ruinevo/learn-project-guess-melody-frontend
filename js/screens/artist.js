import store from './../data/game-store';
import AbstractScreen from './../game';
import switchScreen from './../game/switch-screen';
import HeaderView from './../game/header';
import ArtistView from './../view/artist-view';

class ArtistScreen extends AbstractScreen {
  constructor(state) {
    super();
    this.state = state;
    this.rightAnswer = this.state.guessArtistData.rightAnswer;
    this.header = new HeaderView(this.state);
    this.answerTime = 0;
    this.view = new ArtistView(this.state);
  }

  createGameLevel() {
    this.view.onAnswerClick = (evt) => {
      evt.preventDefault();
      this.processAnswer(evt, this.answerTime);
      this.header.answerTime = 0;
      switchScreen();
    };
    this.view.element.appendChild(this.header.element);
    this.header.updateLives();
  }

  processAnswer(evt, answerTime) {
    const selectedAnswerIdx = evt.target.value;
    const currentAnswer = {};
    if (Number(selectedAnswerIdx) === this.rightAnswer) {
      currentAnswer.success = true;
      currentAnswer.time = answerTime;
    } else {
      currentAnswer.success = false;
      this.state.removeLife();
    }
    this.state.appendAnswer(currentAnswer);
  }

}

const artist = new ArtistScreen(store);

export default artist;
