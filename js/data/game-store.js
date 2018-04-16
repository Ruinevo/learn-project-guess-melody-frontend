class GameStore {
  constructor() {
    this.initialState = Object.freeze({
      lives: 3,
      resultsOfCurrentPlayer: [],
      countOfDisplayedScreens: 0,
      statistics: [],
      time: 320
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

  setLives() {
    this.currentState.lives--;
    return this;
  }

  setResultsOfCurrentPlayer(currentResult) {
    this.currentState.resultsOfCurrentPlayer.push(currentResult);
    return this;
  }

  setCountOfDisplayedScreens() {
    this.currentState.countOfDisplayedScreens++;
    return this;
  }

  reset() {
    this.currentState = Object.assign({}, this.initialState);
    return this;
  }

  setStatistics(result) {
    this.statistics.push(result);
    return this;
  }

}

const currentData = new GameStore();

export default currentData;
