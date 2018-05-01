import {checkStatus} from './../game/util';
import ErrorView from './../view/error-view';
import {renderScreen} from './../game/renderScreen';
import store from './../data/game-store';

class QuestionService {
  constructor() {
    this.questions = [];
  }

  getNextQuestion() {
    if (!this.questions.length) {
      return fetch(`https://es.dump.academy/guess-melody/questions`).
          then(checkStatus).
          then((response) => response.json()).
          then((questions) => {
            this.questions = questions;
            return this.questions[store.countOfDisplayedScreens];
          }).
          catch((error) => this.showError(error));
    }
    const nextQuestion = this.questions[store.countOfDisplayedScreens];

    return Promise.resolve(nextQuestion);
  }


  showError(error) {
    const errorView = new ErrorView(error);
    renderScreen(errorView);
  }

}


const service = new QuestionService();

export default service;


