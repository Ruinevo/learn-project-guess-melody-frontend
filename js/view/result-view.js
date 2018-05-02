import {showResult} from './../game/show-result';
import AbstractView from './abstract-view';
import {presentMin, presentSec, presentErrors} from './../game/util';
import store from './../data/game-store';
import {calculateQuickAnswers} from './../game/calculate-scores';

export default class ResultView extends AbstractView {
  constructor(statistics, currentPlayer, typeText) {
    super();
    this.statistics = statistics;
    this.currentPlayer = currentPlayer;
    this.typeText = typeText;
  }

  get template() {
    return `
		<section class="main main--result">
      <section class="logo" title="Угадай мелодию"><h1>Угадай мелодию</h1></section>
      <h2 class="title">${this.typeText.h2}</h2>
      ${this.setTemplateResultScreen()}
      <span role="button" tabindex="0" class="main-replay">${this.typeText.button}</span>
    </section>`;
  }

  bind() {
    const replayBtn = this.element.querySelector(`.main-replay`);
    replayBtn.addEventListener(`click`, this.onReplayClick);
  }


  setTemplateResultScreen() {
    if (this.currentPlayer.lives <= 0 || this.currentPlayer.time <= 0) {
      return `<div class="main-stat">${showResult(this.statistics, this.currentPlayer)}</div>`;
    } else {
      return `<div class="main-stat">За&nbsp;${presentMin(this.currentPlayer.time, store.initialState.time)}
               и ${presentSec(this.currentPlayer.time, store.initialState.time)}
              <br>вы&nbsp;набрали ${this.currentPlayer.points} баллов (${calculateQuickAnswers(store.resultsOfCurrentPlayer)} быстрых)
              <br>совершив ${presentErrors(this.currentPlayer.lives)}
              </div>
              <span class="main-comparison">${showResult(this.statistics, this.currentPlayer)}</span>`;
    }
  }

  onReplayClick() {}
}
