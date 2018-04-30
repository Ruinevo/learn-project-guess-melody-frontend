import {checkStatus} from './../game/util';
import ErrorView from './../view/error-view';
import {renderScreen} from './../game/renderScreen';

class QuestionService {
  constructor() {
    this.usedQuestionsCount = 0;
    this.questions = [];
  }

  getNextQuestion() {
    if (!this.questions.length) {
      return fetch(`https://es.dump.academy/guess-melody/questions`).
          then(checkStatus).
          then((response) => response.json()).
          then((questions) => {
            this.questions = questions;
            return this.questions[0];
          }).
          catch((error) => this.showError(error));
    }

    this.usedQuestionsCount++;
    const nextQuestion = this.questions[this.usedQuestionsCount];

    return Promise.resolve(nextQuestion);
  }


  showError(error) {
    const errorView = new ErrorView(error);
    renderScreen(errorView);
  }

  reload() {
    this.questions = [];
    this.usedQuestionsCount = 0;
  }
}


const service = new QuestionService();

export default service;


