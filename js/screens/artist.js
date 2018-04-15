import {setPauseAndPlay} from './../game/util';
import {getElementFromTemplate} from './../game/util';
import headerTemplate from './../game/header';
import switchScreen from './../game/switch-screen';
import {currentLives} from './../game/switch-screen';
import {loseLife} from './../game/switch-screen';
import {resultsOfCurrentPlayer} from './../game/switch-screen';

import {INITIAL_GAME} from './../data/game-data';
import {guessArtistData} from './../data/game-data';


const TIME = 40; // в этом задании время не учитывается
export default (data) => {
  let currentState = Object.assign({}, INITIAL_GAME);
  currentState.lives = currentLives;
  const renderAnswers = (question) => question.answers.map((answer, idx) => `
  <div class="main-answer-wrapper">
    <input class="main-answer-r" type="radio" id="answer-${idx + 1}" name="answer" value="val-${idx + 1}"/>
    <label class="main-answer" for="answer-${idx + 1}">
      <img class="main-answer-preview" src="${answer.image}" alt="${answer.text}" width="134" height="134">
        ${answer.text}
      </label>
  </div>`).join(``);

  const content = `
  <section class="main main--level main--level-artist">
    <svg xmlns="http://www.w3.org/2000/svg" class="timer" viewBox="0 0 780 780">
      <circle
        cx="390" cy="390" r="370"
        class="timer-line"
        style="filter: url(.#blur); transform: rotate(-90deg) scaleY(-1); transform-origin: center">
      </circle>
    </svg>
    ${headerTemplate(currentState)}
    <div class="main-wrap">
      <h2 class="title main-title">Кто исполняет эту песню?</h2>
      <div class="player-wrapper">
        <div class="player">
          <audio src="${data.src}"></audio>
          <button class="player-control"></button>
          <div class="player-track">
            <span class="player-status"></span>
          </div>
        </div>
      </div>
      <form class="main-list">
        ${renderAnswers(data)}
      </form>
    </div>
  </section>`;
  const element = getElementFromTemplate(content);
  const artistOptions = element.querySelectorAll(`.main-answer`);
  const playerBtn = element.querySelector(`.player-control`);
  const audio = element.querySelector(`audio`);

  Array.from(artistOptions).forEach((elem) => {
    elem.addEventListener(`click`, (evt) => {
      const selectedAnswerIdx = evt.currentTarget.parentNode.querySelector(`input`).value.substr(-1); // получаем индекс выбранного пользователем ответа из атрибута value
      const obj = {};
      if (Number(selectedAnswerIdx) === guessArtistData.questions.rightAnswer) {
        obj.success = true;
        obj.time = TIME;
        resultsOfCurrentPlayer.push(obj);
      } else {
        obj.success = false;
        resultsOfCurrentPlayer.push(obj);
        loseLife();
      }
      switchScreen();
    });
  });

  setPauseAndPlay(playerBtn, audio);

  return element;
};
