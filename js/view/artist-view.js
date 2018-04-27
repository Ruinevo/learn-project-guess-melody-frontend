import AbstractView from './abstract-view';


export default class ArtistView extends AbstractView {
  constructor(question, store) {
    super();
    this.src = question.src;
    this.answers = question.answers;
    this.store = store;
    this.rightAnswer = question.rightAnswer;
  }

  get template() {
    return `
			<section class="main main--level main--level-artist">
		    <svg xmlns="http://www.w3.org/2000/svg" class="timer" viewBox="0 0 780 780">
		      <circle
		        cx="390" cy="390" r="370"
		        class="timer-line"
		        style="filter: url(.#blur); transform: rotate(-90deg) scaleY(-1); transform-origin: center">
		      </circle>
		    </svg>
		    <div class="main-wrap">
		      <h2 class="title main-title">Кто исполняет эту песню?</h2>
		      <div class="player-wrapper">
		        <div class="player">
		          <audio src="${this.src}"></audio>
		          <button class="player-control"></button>
		          <div class="player-track">
		            <span class="player-status"></span>
		          </div>
		        </div>
		      </div>
	      	<form class="main-list">
	        	${this.renderAnswers(this.answers)}
	      	</form>
	    </div>
	  </section>`;
  }

  bind() {
    const artistOptions = this.element.querySelectorAll(`.main-answer-r`);
    Array.from(artistOptions).forEach((elem) => {
      elem.addEventListener(`change`, this.onAnswerClick);
    });
  }


  renderAnswers(answers) {
    return answers.map((answer, idx) => `
      <div class="main-answer-wrapper">
	      <input class="main-answer-r" type="radio" id="answer-${idx + 1}" name="answer" value="${idx + 1}"/>
	      <label class="main-answer" for="answer-${idx + 1}">
	        <img class="main-answer-preview" src="${answer.image}" alt="${answer.text}" width="134" height="134">
	          ${answer.text}
	        </label>
	    </div>`).join(``);
  }

  processingAnswer(evt, answerTime) {
    const selectedAnswerIdx = evt.target.value;
    const currentAnswer = {};
    if (Number(selectedAnswerIdx) === this.rightAnswer) {
      currentAnswer.success = true;
      currentAnswer.time = answerTime;
    } else {
      currentAnswer.success = false;
      this.store.removeLife();
    }
    this.store.appendAnswer(currentAnswer);
  }


  onAnswerClick() {

  }

}

