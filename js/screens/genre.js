import {getElementFromTemplate} from './../game/util';
import {setPauseAndPlay} from './../game/util';
import headerTemplate from './../game/header';
import switchScreen from './../game/switch-screen';
import guessGenreData from './../data/genre-data';
import store from './../data/game-store';


const TIME = 40; // в этом задании время не учитывается

export default (data) => {
  let currentState = Object.assign({}, store.initialState);
  currentState.lives = store.lives;
  const renderAnswers = (question) => question.answers.map((answer, idx) => ` 
    <div class="genre-answer">
      <div class="player-wrapper">
        <div class="player">
          <audio src="${answer.src}"></audio>
          <button class="player-control"></button>
          <div class="player-track">
            <span class="player-status"></span>
          </div>
        </div>
      </div>
      <input type="checkbox" name="answer" value="answer-${idx + 1}" id="a-${idx + 1}">
      <label class="genre-answer-check" for="a-${idx + 1}"></label>
    </div>`).join(``);

  const content = `  
  <section class="main main--level main--level-genre">
    <svg xmlns="http://www.w3.org/2000/svg" class="timer" viewBox="0 0 780 780">
      <circle
        cx="390" cy="390" r="370"
        class="timer-line"
        style="filter: url(.#blur); transform: rotate(-90deg) scaleY(-1); transform-origin: center"></circle>
    </svg>
    ${headerTemplate(currentState)}
    <div class="main-wrap">
      <h2 class="title">${data.text}</h2>
      <form class="genre">
        ${renderAnswers(data)}
        <button class="genre-answer-send" type="submit">Ответить</button>
      </form>
    </div>
  </section>`;

  const element = getElementFromTemplate(content);
  const genreOptions = element.querySelectorAll(`input[type=checkbox]`);
  const answerSubmitBtn = element.querySelector(`.genre-answer-send`);
  const genreForm = element.querySelector(`.genre`);
  answerSubmitBtn.disabled = true;

  Array.from(genreOptions).forEach((elem) => {
    elem.addEventListener(`click`, () => {
      let isSubmitEnabled = Array.from(genreOptions).some((it) => it.checked);
      answerSubmitBtn.disabled = !isSubmitEnabled;
    });
  });

  const answers = element.querySelectorAll(`.genre-answer`);
  Array.from(answers).forEach((elem) => {
    const playerBtn = elem.querySelector(`.player-control`);
    const audio = elem.querySelector(`audio`);
    setPauseAndPlay(playerBtn, audio);
  });

  answerSubmitBtn.addEventListener(`click`, (evt) => {
    evt.preventDefault();
    const arr = Array.from(genreOptions);
    const selectedAnswersIdx = arr.filter((it) => it.checked).map((it) => arr.indexOf(it) + 1);
    const rightAnswer = guessGenreData.rightAnswers;
    const right = selectedAnswersIdx.every((elem) => rightAnswer.indexOf(elem) !== -1 && selectedAnswersIdx.length === rightAnswer.length); // проверяем верность ответа
    const currentAnswer = {};

    if (right) {
      currentAnswer.success = right;
      currentAnswer.time = TIME;
    } else {
      store.removeLife();
    }

    store.appendAnswer(currentAnswer);
    genreForm.reset();
    answerSubmitBtn.disabled = true;
    switchScreen();
  });

  return element;
};
