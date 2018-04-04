import {getElementFromTemplate} from './../util';
import {renderScreen} from './../render';
import welcomeTemplate from './welcome';

const template = `
<section class="main main--result">
  <section class="logo" title="Угадай мелодию"><h1>Угадай мелодию</h1></section>

  <h2 class="title">Какая жалость!</h2>
  <div class="main-stat">У вас закончились все попытки.<br>Ничего, повезёт в следующий раз!</div>
  <span role="button" tabindex="0" class="main-replay">Попробовать ещё раз</span>
</section>`;

const moduleLivesOverResult = getElementFromTemplate(template);

const replayBtn = moduleLivesOverResult.querySelector(`.main-replay`);

replayBtn.onclick = (evt) => {
  evt.preventDefault();
  renderScreen(welcomeTemplate);
};

export default moduleLivesOverResult;
