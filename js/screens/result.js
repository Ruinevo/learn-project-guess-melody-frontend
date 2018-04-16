import {getElementFromTemplate} from './../game/util';
import {renderScreen} from './../game/renderScreen';
import welcomeScreen from './../screens/welcome';
import {showResult} from './../game/show-result';

const MAX_ERRORS_COUNT = 3;

export default (statistics, currentPlayer, template) => {

  const setTemplateResultScreen = () => {
    if (currentPlayer.lives <= 0) {
      return `<div class="main-stat">${showResult(statistics, currentPlayer)}</div>`;
    } else {
      return `<div class="main-stat">За&nbsp;3&nbsp;минуты и 25&nbsp;секунд
         <br>вы&nbsp;набрали ${currentPlayer.points} баллов (8 быстрых)
         <br>совершив ${MAX_ERRORS_COUNT - currentPlayer.lives} ошибки
        </div>
      <span class="main-comparison">${showResult(statistics, currentPlayer)}</span>`;
    }
  };
  const content = `
  <section class="main main--result">
    <section class="logo" title="Угадай мелодию"><h1>Угадай мелодию</h1></section>
    <h2 class="title">${template.h2}</h2>
    ${setTemplateResultScreen()}
    <span role="button" tabindex="0" class="main-replay">${template.button}</span>
  </section>`;

  const element = getElementFromTemplate(content);
  const replayBtn = element.querySelector(`.main-replay`);

  replayBtn.addEventListener(`click`, (evt) => {
    evt.preventDefault();
    renderScreen(welcomeScreen);
  });

  return element;
};
