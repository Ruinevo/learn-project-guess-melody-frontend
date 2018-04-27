import {renderScreen} from './../game/renderScreen';
import {calculateScoresForGame} from './../game/calculate-scores';
import ResultView from './../view/result-view';
import Application from './application';

const TYPE_TEXT = {
  result: {
    h2: `Вы настоящий меломан!`,
    button: `Сыграть ещё раз`
  },
  livesover: {
    h2: `Какая жалость!`,
    button: `Попробовать ещё раз`
  },
  timeover: {
    h2: `Увы и ах!`,
    button: `Попробовать ещё раз`
  }
};

export default class ResultScreen {
  constructor(state) {
    this.state = state;
  }

  showResults() {
    const points = calculateScoresForGame(this.state.resultsOfCurrentPlayer, this.state.lives, this.state.time);
    const currentPlayer = {};
    currentPlayer.points = points;
    currentPlayer.lives = this.state.lives;
    currentPlayer.time = this.state.time;
    let typeText;
    if (currentPlayer.time <= 0) {
      typeText = TYPE_TEXT.timeover;
    } else if (currentPlayer.lives <= 0) {
      typeText = TYPE_TEXT.livesover;
    } else {
      typeText = TYPE_TEXT.result;
    }
    this.view = new ResultView(this.state.statistics, currentPlayer, typeText);
    this.view.onReplayClick = () => {
      Application.showGame();
    };
    this.state.addResultToStats(points);

    renderScreen(this.view);
    this.state.reset();
  }
}
