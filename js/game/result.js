import {getElementFromTemplate} from './util';
import {renderScreen} from './renderScreen';
import welcomeScreen from './../screens/welcome';
import {showResult} from './show-result';
import currentData from './../data/game-store';

const MAX_ERRORS_COUNT = 3;

export default (statistics, points) => {
  const content = `
  <section class="main main--result">
    <section class="logo" title="Угадай мелодию"><h1>Угадай мелодию</h1></section>
    <h2 class="title">Вы настоящий меломан!</h2>
    <div class="main-stat">За&nbsp;3&nbsp;минуты и 25&nbsp;секунд
      <br>вы&nbsp;набрали ${points} баллов (8 быстрых)
      <br>совершив ${MAX_ERRORS_COUNT - currentData.lives} ошибки
    </div>
    <span class="main-comparison">${showResult(statistics, points)}</span>
    <span role="button" tabindex="0" class="main-replay">Сыграть ещё раз</span>
  </section>`;

  const element = getElementFromTemplate(content);
  const replayBtn = element.querySelector(`.main-replay`);

  replayBtn.addEventListener(`click`, (evt) => {
    evt.preventDefault();
    renderScreen(welcomeScreen);
  });

  return element;
};
