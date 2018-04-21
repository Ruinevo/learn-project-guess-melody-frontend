import {renderScreen} from './../game/renderScreen';
import guessArtistScreen from './artist';
import WelcomeView from './../view/welcome-view';

export default () => {
  const welcome = new WelcomeView();
  welcome.onPlayClick = (evt) => {
    evt.preventDefault();
    guessArtistScreen();
  };
  renderScreen(welcome);
};
