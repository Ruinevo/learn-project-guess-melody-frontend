import switchScreen from './../game/switch-screen';
import {renderScreen} from './../game/renderScreen';
import guessArtistData from './../data/artist-data';
import store from './../data/game-store';
import ArtistView from './../view/artist-view';

const TIME = 40; // в этом задании время не учитывается

export default () => {
  const view = new ArtistView(guessArtistData, store);
  view.onAnswerClick = (evt) => {
    const selectedAnswerIdx = evt.target.value.substr(-1); // получаем индекс выбранного пользователем ответа из атрибута value
    const currentAnswer = {};
    if (Number(selectedAnswerIdx) === guessArtistData.rightAnswer) {
      currentAnswer.success = true;
      currentAnswer.time = TIME;
    } else {
      currentAnswer.success = false;
      store.removeLife();
    }
    store.appendAnswer(currentAnswer);
    switchScreen();
  };
  view.controlPlayer();
  renderScreen(view);
};

