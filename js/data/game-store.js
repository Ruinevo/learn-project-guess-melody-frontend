class GameStore {
  constructor() {
    this.initialState = Object.freeze({
      lives: 3,
      resultsOfCurrentPlayer: [],
      countOfDisplayedScreens: 0,
      statistics: [],
      time: 50
    });
    this.currentState = Object.assign({}, this.initialState);
    this.guessArtistData = {
      src: `https://www.youtube.com/audiolibrary_download?vid=bcbe5be936a32fb1`,
      answers: [
        {
          text: `Пелагея`,
          image: `https://i.vimeocdn.com/portrait/992615_300x300`
        },
        {
          text: `Краснознаменная дивизия имени моей бабушки`,
          image: `https://i.ytimg.com/vi/jzgM3m8Vp1k/maxresdefault.jpg`
        },
        {
          text: `Lorde`,
          image: `https://yt3.ggpht.com/-fkDeGauT7Co/AAAAAAAAAAI/AAAAAAAAAAA/dkF5ZKkrxRo/s900-c-k-no-mo-rj-c0xffffff/photo.jpg`
        }
      ],
      rightAnswer: 2
    };
    this.guessGenreData = {
      text: `Выберите инди-рок треки`,
      answers: [
        {
          src: `https://www.youtube.com/audiolibrary_download?vid=91624fdc22fc54ed`,
        },

        {
          src: `https://www.youtube.com/audiolibrary_download?vid=bcbe5be936a32fb1`,
        },
        {
          src: `https://www.youtube.com/audiolibrary_download?vid=bcbe5be936a32fb1`,
        },
        {
          src: `https://www.youtube.com/audiolibrary_download?vid=bcbe5be936a32fb1`,
        }
      ],
      rightAnswer: [4]
    };
  }

  get lives() {
    return this.currentState.lives;
  }

  get resultsOfCurrentPlayer() {
    return this.currentState.resultsOfCurrentPlayer;
  }

  get countOfDisplayedScreens() {
    return this.currentState.countOfDisplayedScreens;
  }

  get statistics() {
    return this.currentState.statistics;
  }

  get time() {
    return this.currentState.time;
  }

  removeLife() {
    this.currentState.lives--;
    return this;
  }

  appendAnswer(answer) {
    this.currentState.resultsOfCurrentPlayer.push(answer);
    return this;
  }

  tick() {
    this.currentState.time--;
    return this;
  }

  addDisplayedScreen() {
    this.currentState.countOfDisplayedScreens++;
    return this;
  }


  reset() {
    this.currentState = Object.assign({}, this.initialState);
    this.currentState.resultsOfCurrentPlayer = [];
    this.currentState.statistics = [];
    return this;
  }

  addResultToStats(result) {
    this.statistics.push(result);
    return this;
  }

}

const store = new GameStore();

export default store;
