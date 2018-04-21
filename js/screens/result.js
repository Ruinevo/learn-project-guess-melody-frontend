import {renderScreen} from './../game/renderScreen';
import welcomeScreen from './../screens/welcome';
import store from './../data/game-store';
import {calculateScoresForGame} from './../game/calculate-scores';
import ResultView from './../view/result-view';

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

export default () => {
  const points = calculateScoresForGame(store.resultsOfCurrentPlayer, store.lives);
  const currentPlayer = {};
  currentPlayer.points = points;
  currentPlayer.lives = store.lives;
  const typeText = currentPlayer.lives <= 0 ? TYPE_TEXT.livesover : TYPE_TEXT.result;
  const view = new ResultView(store.statistics, currentPlayer, typeText);
  view.onReplayClick = () => {
    welcomeScreen();
  };
  store.addResultToStats(points);
  store.reset();
  renderScreen(view);
};
