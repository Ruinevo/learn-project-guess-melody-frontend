import AbstractView from './abstract-view';

export default class WelcomeView extends AbstractView {
  get template() {
    return `
		<section class="main main--welcome">
  		<section class="logo" title="Угадай мелодию"><h1>Угадай мелодию</h1></section>
    	<button class="main-play">Начать игру</button>
  		<h2 class="title main-title">Правила игры</h2>
		  <p class="text main-text">
		    Правила просты&nbsp;— за&nbsp;5 минут ответить на все вопросы.<br>
		    Ошибиться можно 2 раза.<br>
		    Удачи!
		  </p>
		</section>`;
  }

  bind() {
    this.playButton = this.element.querySelector(`.main-play`);
    this.playButton.addEventListener(`click`, this.onPlayClick);
  }

  disablePlayButton() {
    this.playButton.style.borderLeftColor = `#c9c9c9`;
    this.playButton.disabled = true;
  }

  enablePlayButton() {
    this.playButton.style.borderLeftColor = `#ff9749`;
    this.playButton.disabled = false;
  }

  onPlayClick() {}

}
