import {getElementFromTemplate} from './util';
import {renderScreen} from './renderScreen';
import welcomeScreen from './../screens/welcome';
import {currentLives} from './switch-screen';

export default (resultsOfOtherPlayers, resultOfCurrentPlayer) => {
  const dirtyResultsOfOtherPlayers = resultsOfOtherPlayers.slice();
  dirtyResultsOfOtherPlayers.push(resultOfCurrentPlayer);
  dirtyResultsOfOtherPlayers.sort((a, b) => b - a);
  const positionOfCurrentPlayer = dirtyResultsOfOtherPlayers.indexOf(resultOfCurrentPlayer) + 1;
  const percent = (dirtyResultsOfOtherPlayers.length - positionOfCurrentPlayer) * 100 / dirtyResultsOfOtherPlayers.length;
  const template = `
  <section class="main main--result">
    <section class="logo" title="Угадай мелодию"><h1>Угадай мелодию</h1></section>
    <h2 class="title">Вы настоящий меломан!</h2>
    <div class="main-stat">За&nbsp;3&nbsp;минуты и 25&nbsp;секунд
      <br>вы&nbsp;набрали ${resultOfCurrentPlayer} баллов (8 быстрых)
      <br>совершив ${3 - currentLives} ошибки
    </div>
    <span class="main-comparison">Вы заняли ${positionOfCurrentPlayer} место из ${dirtyResultsOfOtherPlayers.length}. Это&nbsp;лучше чем у ${percent}% игроков</span>
    <span role="button" tabindex="0" class="main-replay">Сыграть ещё раз</span>
  </section>`;

  const element = getElementFromTemplate(template);
  const replayBtn = element.querySelector(`.main-replay`);

  replayBtn.addEventListener(`click`, (evt) => {
    evt.preventDefault();
    renderScreen(welcomeScreen);
  });

  return element;
};
