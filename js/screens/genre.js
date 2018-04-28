import AbstractScreen from './../game';
import store from './../data/game-store';
import switchScreen from './../game/switch-screen';
import HeaderView from './../game/header';
import GenreView from './../view/genre-view';

class GenreScreen extends AbstractScreen {

  constructor(state) {
    super();
    this.state = state;
    this.rightAnswer = this.state.guessGenreData.rightAnswer;
    this.answerTime = 0;
    this.header = new HeaderView(this.state);
    this.view = new GenreView(this.state);

  }

  createGameLevel() {
    this.view.onAnswerClick = this.isAnswerSelected.bind(this);
    this.view.onSubmitClick = (evt) => {
      evt.preventDefault();
      this.processAnswer(this.answerTime);
      this.answerTime = 0;
      switchScreen();
    };
    this.view.element.appendChild(this.header.element);
    this.header.updateLives();

  }

  isAnswerSelected() {
    const genreOptions = this.view.element.querySelectorAll(`input[type=checkbox]`);
    const answerSubmitBtn = this.view.element.querySelector(`.genre-answer-send`);
    let isSubmitEnabled = Array.from(genreOptions).some((it) => it.checked);
    answerSubmitBtn.disabled = !isSubmitEnabled;
  }


  processAnswer(answerTime) {
    const genreOptions = this.view.element.querySelectorAll(`input[type=checkbox]`);
    const answerSubmitBtn = this.view.element.querySelector(`.genre-answer-send`);
    const arr = Array.from(genreOptions);
    const selectedAnswersIdx = arr.filter((it) => it.checked).map((it) => arr.indexOf(it) + 1);
    const right = selectedAnswersIdx.every((elem) => this.rightAnswer.indexOf(elem) !== -1);
    const currentAnswer = {};
    if (right && selectedAnswersIdx.length === this.rightAnswer.length) {
      currentAnswer.success = right;
      currentAnswer.time = answerTime;
    } else {
      this.state.removeLife();
    }
    this.state.appendAnswer(currentAnswer);
    this.view.resetForm();
    answerSubmitBtn.disabled = true;
  }
}

const genre = new GenreScreen(store);

export default genre;


