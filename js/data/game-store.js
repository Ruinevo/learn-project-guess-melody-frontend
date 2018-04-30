class GameStore {
  constructor() {
    this.initialState = Object.freeze({
      lives: 3,
      resultsOfCurrentPlayer: [],
      countOfDisplayedScreens: 0,
      statistics: [],
      time: 300
    });
    this.currentState = Object.assign({}, this.initialState);
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
