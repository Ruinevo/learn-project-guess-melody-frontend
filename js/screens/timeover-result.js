import {getElementFromTemplate} from './../game/util';
import {renderScreen} from './../game/renderScreen';
import welcomeScreen from './welcome';

const template = `
<section class="main main--result">
  <section class="logo" title="Угадай мелодию"><h1>Угадай мелодию</h1></section>

  <h2 class="title">Увы и ах!</h2>
  <div class="main-stat">Время вышло!<br>Вы не успели отгадать все мелодии</div>
  <span role="button" tabindex="0" class="main-replay">Попробовать ещё раз</span>
</section>`;

const timeOverScreen = getElementFromTemplate(template);

const replayBtn = timeOverScreen.querySelector(`.main-replay`);

replayBtn.addEventListener(`click`, (evt) => {
  evt.preventDefault();
  renderScreen(welcomeScreen);
});

export default timeOverScreen;
