import AbstractView from './../view/abstract-view';

export default class PreloadView extends AbstractView {
  constructor() {
    super();
    this.loadedTracks = 0;
  }

  get template() {
    return `
      <div class="preload">
        <h4>Подождите, идет загрузка...</h4>
        <p></p>
      </div>
      `;
  }


  bind() {
    this.contentTitle = this.element.querySelector(`.preload h4`);
    this.contentBody = this.element.querySelector(`.preload p`);
  }

  playBtnDisabled() {
    this.playBtn = document.querySelector(`.main-play`);
    this.playBtn.style.borderLeftColor = `#c9c9c9`;
    this.playBtn.disabled = true;
  }

  playBtnEnabled() {
    this.playBtn.style.borderLeftColor = `#ff9749`;
    this.playBtn.disabled = false;
  }

  update() {
    this.contentBody.textContent = `Загружено треков: ${this.loadedTracks} из ${this.tracks.length}`;
  }

  initializationTracks(data) {
    const tracks = [];
    for (const answer of data) {
      if (answer.type === `artist`) {
        const audio = new Audio();
        audio.src = answer.src;
        tracks.push(audio);
      }
      if (answer.type === `genre`) {
        answer.answers.forEach((it) => {
          const audio = new Audio();
          audio.src = it.src;
          tracks.push(audio);
        });
      }
      this.tracks = tracks;
    }
  }

  preloadAudio(data) {

    this.playBtnDisabled();

    return new Promise((resolve) => {

      this.initializationTracks(data);
      this.update();

      this.tracks.forEach((it) => {
        it.addEventListener(`canplaythrough`, () => {
          this.loadedTracks++;
          this.update();
          if (this.loadedTracks === this.tracks.length) {
            this.playBtnEnabled();
            this.contentTitle.textContent = `Загрузка завершена!`;
            resolve(data);
          }
        });
      });
    });
  }
}


