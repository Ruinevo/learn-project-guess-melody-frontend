import {renderScreen} from './../game/renderScreen';
import {settingPlayer} from './../game/util';
import Application from './../application';
import store from './../data/game-store';
import QuestionService from './../data/question-service';
import HeaderView from './../view/header-view';
import GenreView from './../view/genre-view';
import ArtistView from './../view/artist-view';


const ROUNDS = 10;


class GameScreen {
  constructor(state) {
    this.state = state;
    this.answerTime = 0;
    this.header = new HeaderView(this.state);
    this._interval = null;
  }

  getLevelType() {
    if (this.state.currentAnswer.type === `artist`) {
      this.view = new ArtistView(this.state);
      this.createArtistGame();
    }
    if (this.state.currentAnswer.type === `genre`) {
      this.view = new GenreView(this.state);
      this.createGenreGame();
    }
    this.view.element.appendChild(this.header.element);
    this.header.updateLives();
  }


  init() {
    this.getLevelType();
    this.loadInterval();
    settingPlayer(this.view);
    renderScreen(this.view);
  }

  createArtistGame() {
    this.view.onAnswerClick = (evt) => {
      evt.preventDefault();
      this.processArtistAnswer(evt, this.answerTime);
      this.answerTime = 0;
      this.switchScreen();
    };
  }

  createGenreGame() {
    this.view.onAnswerClick = () => {
      this.isAnswerSelected();
    };
    this.view.onSubmitClick = (evt) => {
      evt.preventDefault();
      this.processGenreAnswer(this.answerTime);
      this.answerTime = 0;
      this.switchScreen();
    };

  }

  loadInterval() {
    this.header.updateTime();
    if (this._interval === null) {
      this._interval = setInterval(() => {
        if (this.state.time <= 0) {
          Application.showStats();
        }
        this.state.tick();
        this.answerTime++;
        this.header.updateTime();
      }, 1000);
    }
  }

  isAnswerSelected() {
    const genreOptions = this.view.element.querySelectorAll(`input[type=checkbox]`);
    const answerSubmitBtn = this.view.element.querySelector(`.genre-answer-send`);
    let isSubmitEnabled = Array.from(genreOptions).some((it) => it.checked);
    answerSubmitBtn.disabled = !isSubmitEnabled;
  }

  processArtistAnswer(evt, answerTime) {
    const answers = this.state.currentAnswer.answers;
    const rightAnswer = answers.filter((it) => it.isCorrect).map((it) => answers.indexOf(it) + 1).join(``);
    const selectedAnswerIdx = evt.target.value;
    const currentAnswer = {};
    if (selectedAnswerIdx === rightAnswer) {
      currentAnswer.success = true;
      currentAnswer.time = answerTime;
    } else {
      currentAnswer.success = false;
      this.state.removeLife();
    }
    this.state.appendAnswer(currentAnswer);
  }

  processGenreAnswer(answerTime) {
    const answers = this.state.currentAnswer.answers;
    const genre = this.state.currentAnswer.genre;
    const rightAnswers = answers.filter((it) => it.genre === genre).map((it) => answers.indexOf(it) + 1);
    const genreOptions = this.view.element.querySelectorAll(`input[type=checkbox]`);
    const answerSubmitBtn = this.view.element.querySelector(`.genre-answer-send`);
    const arr = Array.from(genreOptions);
    const selectedAnswersIdx = arr.filter((it) => it.checked).map((it) => arr.indexOf(it) + 1);
    const right = selectedAnswersIdx.every((elem) => rightAnswers.indexOf(elem) !== -1);
    const currentAnswer = {};
    if (right && selectedAnswersIdx.length === rightAnswers.length) {
      currentAnswer.success = right;
      currentAnswer.time = answerTime;
    } else {
      this.state.removeLife();
    }
    this.state.appendAnswer(currentAnswer);
    this.view.resetForm();
    answerSubmitBtn.disabled = true;
  }

  stopGame() {
    clearInterval(this._interval);
    this._interval = null;
  }

  switchScreen() {
    if (this.state.countOfDisplayedScreens < ROUNDS && this.state.lives > 0) {
      QuestionService.getNextQuestion().then((data) => {
        this.state.currentAnswer = data;
        this.state.addDisplayedScreen();
        this.init();

      });
    } else {
      Application.showStats();
    }
  }

}

const game = new GameScreen(store);

export default game;
