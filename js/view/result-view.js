import {showResult} from './../game/show-result';
import AbstractView from './abstract-view';
import {addZero} from './../game/util';
import store from './../data/game-store';

const MAX_ERRORS_COUNT = 3;

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
    this.isQuickAnswer(store.resultsOfCurrentPlayer);
  }


  isQuickAnswer(answers) {
    let quick = 0;
    for (let i of answers) {
      i.time < 30 ? quick++ : false;
    }
    return quick;
  }


  setTemplateResultScreen() {
    if (this.currentPlayer.lives <= 0 || this.currentPlayer.time <= 0) {
      return `<div class="main-stat">${showResult(this.statistics, this.currentPlayer)}</div>`;
    } else {
      return `<div class="main-stat">За&nbsp;${addZero(Math.trunc((store.initialState.time / 60) - (this.currentPlayer.time / 60))) }&nbsp;минуты и ${addZero((store.initialState.time % 60) - (this.currentPlayer.time % 60))}&nbsp;секунд
              <br>вы&nbsp;набрали ${this.currentPlayer.points} баллов (${this.isQuickAnswer(store.resultsOfCurrentPlayer)} быстрых)
              <br>совершив ${MAX_ERRORS_COUNT - this.currentPlayer.lives} ошибки
              </div>
              <span class="main-comparison">${showResult(this.statistics, this.currentPlayer)}</span>`;
    }
  }

  onReplayClick() {}

}

