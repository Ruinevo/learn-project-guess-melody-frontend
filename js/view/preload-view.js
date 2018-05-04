import AbstractView from './../view/abstract-view';

export default class PreloadView extends AbstractView {
  constructor() {
    super();
    this.loadedTracks = 0;
    this.tracks = [];
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


  _update() {
    this.contentBody.textContent = `Загружено треков: ${this.loadedTracks} из ${this.tracks.length}`;
  }

  _addTrack(answer) {
    const audio = new Audio();
    audio.src = answer.src;
    this.tracks.push(audio);
  }

  _initializationTracks(data) {
    for (const answer of data) {
      if (answer.type === `artist`) {
        this._addTrack(answer);
      }
      if (answer.type === `genre`) {
        answer.answers.forEach((it) => {
          this._addTrack(it);
        });
      }
    }
  }

  preloadAudio(data) {
    return new Promise((resolve) => {

      this._initializationTracks(data);
      this._update();
      this.tracks.forEach((it) => {
        it.addEventListener(`canplaythrough`, () => {
          this.loadedTracks++;
          this._update();
          if (this.loadedTracks === this.tracks.length) {
            this.contentTitle.textContent = `Загрузка завершена!`;
            resolve();
          }
        });
      });
    });
  }
}


