import {checkStatus} from './../game/util';
import ErrorView from './../view/error-view';
import {renderScreen} from './../game/renderScreen';
import store from './../data/game-store';


const SERVER_URL = `https://es.dump.academy/guess-melody`;
const APP_ID = 386952;

class QuestionService {
  constructor() {
    this.questions = [];
  }

  getNextQuestion() {
    if (!this.questions.length) {

      return fetch(`${SERVER_URL}/questions`).

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

  loadResult() {
    return fetch(`${SERVER_URL}/stats/${APP_ID}`).then(checkStatus).then((response) => response.json());
  }

   saveResults(data) {
    const requestSettings = {
      body: JSON.stringify(data),
      headers: {
        'Content-Type': `application/json`
      },
      method: `POST`
    };
    return fetch(`${SERVER_URL}/stats/${APP_ID}`, requestSettings).then(checkStatus);
  }


  showError(error) {
    const errorView = new ErrorView(error);
    renderScreen(errorView);
  }

}


const service = new QuestionService();

export default service;


