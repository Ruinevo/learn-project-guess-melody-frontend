import switchScreen from './../game/switch-screen';
import {renderScreen} from './../game/renderScreen';
import guessGenreData from './../data/genre-data';
import store from './../data/game-store';
import GenreView from './../view/genre-view';

const TIME = 40; // в этом задании время не учитывается

export default () => {
  const view = new GenreView(guessGenreData);
  view.onAnswerClick = () => {
    let isSubmitEnabled = Array.from(genreOptions).some((it) => it.checked);
    answerSubmitBtn.disabled = !isSubmitEnabled;
  };
  view.onSubmitClick = (evt) => {
    evt.preventDefault();
    const arr = Array.from(genreOptions);
    const selectedAnswersIdx = arr.filter((it) => it.checked).map((it) => arr.indexOf(it) + 1);
    const rightAnswer = guessGenreData.rightAnswers;
    const right = selectedAnswersIdx.every((elem) => rightAnswer.indexOf(elem) !== -1 && selectedAnswersIdx.length === rightAnswer.length);
    const currentAnswer = {};
    if (right) {
      currentAnswer.success = right;
      currentAnswer.time = TIME;
    } else {
      store.removeLife();
    }

    store.appendAnswer(currentAnswer);
    view.resetForm();
    answerSubmitBtn.disabled = true;
    switchScreen();
  };
  const genreOptions = view.element.querySelectorAll(`input[type=checkbox]`);
  const answerSubmitBtn = view.element.querySelector(`.genre-answer-send`);
  answerSubmitBtn.disabled = true;
  view.controlPlayer();
  renderScreen(view.element);
};

