import {addZero} from './util';
import AbstractView from './../view/abstract-view';

const MAX_ERRORS_COUNT = 3;
export default class HeaderScreen extends AbstractView {
  constructor(state) {
    super();
    this.state = state;
  }

  get template() {
    return `
      <div>
        <div class="timer-value" xmlns="http://www.w3.org/1999/xhtml">
          <span class="timer-value-mins">${addZero(Math.trunc(this.state.time / 60))}</span><!--
          --><span class="timer-value-dots">:</span><!--
          --><span class="timer-value-secs">${addZero(this.state.time % 60)}</span>
        </div>
        <div class="main-mistakes">
      ${new Array(MAX_ERRORS_COUNT - this.state.lives)
      .fill(`<img class="main-mistake" src="img/wrong-answer.png" width="35" height="49">`)
      .join(``)}
        </div>
      </div>
    `;
  }

}


