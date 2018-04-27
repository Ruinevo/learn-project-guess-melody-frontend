import AbstractView from './abstract-view';


export default class GenreView extends AbstractView {
  constructor(question, store) {
    super();
    this.text = question.text;
    this.answers = question.answers;
    this.store = store;
    this.rightAnswer = question.rightAnswer;
  }

  get template() {
    return `
			<section class="main main--level main--level-genre">
        <svg xmlns="http://www.w3.org/2000/svg" class="timer" viewBox="0 0 780 780">
        <circle
          cx="390" cy="390" r="370"
          class="timer-line"
          style="filter: url(.#blur); transform: rotate(-90deg) scaleY(-1); transform-origin: center"></circle>
      </svg>
      <div class="main-wrap">
        <h2 class="title">${this.text}</h2>
        <form class="genre">
          ${this.renderAnswers(this.answers)}
          <button class="genre-answer-send" type="submit" disabled>Ответить</button>
        </form>
      </div>
    </section>`;
  }

  bind() {
    const genreOptions = this.element.querySelectorAll(`input[type=checkbox]`);
    const answerSubmitBtn = this.element.querySelector(`.genre-answer-send`);
    Array.from(genreOptions).forEach((elem) => {
      elem.addEventListener(`click`, this.onAnswerClick);
    });
    answerSubmitBtn.addEventListener(`click`, this.onSubmitClick);
  }


  resetForm() {
    const genreForm = this.element.querySelector(`.genre`);
    genreForm.reset();
  }

  renderAnswers(answers) {
    return answers.map((answer, idx) => ` 
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
  }

  isAnswerSelected() {
    const genreOptions = this.element.querySelectorAll(`input[type=checkbox]`);
    const answerSubmitBtn = this.element.querySelector(`.genre-answer-send`);
    answerSubmitBtn.disabled = true;
    let isSubmitEnabled = Array.from(genreOptions).some((it) => it.checked);
    answerSubmitBtn.disabled = !isSubmitEnabled;
  }


  processingAnswer(answerTime) {
    const genreOptions = this.element.querySelectorAll(`input[type=checkbox]`);
    const arr = Array.from(genreOptions);
    const selectedAnswersIdx = arr.filter((it) => it.checked).map((it) => arr.indexOf(it) + 1);
    const right = selectedAnswersIdx.every((elem) => this.rightAnswer.indexOf(elem) !== -1);
    const currentAnswer = {};
    if (right && selectedAnswersIdx.length === this.rightAnswer.length) {
      currentAnswer.success = right;
      currentAnswer.time = answerTime;
    } else {
      this.store.removeLife();
    }
    this.store.appendAnswer(currentAnswer);
    this.resetForm();
  }

  onAnswerClick() {}

  onSubmitClick() {}

}
