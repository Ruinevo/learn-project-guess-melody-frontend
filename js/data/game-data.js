const SCORES = {
  rightAnswer: 1,
  wrongAnswer: -2,
  quickAnswer: 2
};

const QUICK_ANSWER_TIME_LIMIT = 30; // s
const ROUNDS = 10;

const countsPointsForAnswer = (answer) => {
  if (answer.success && answer.time > QUICK_ANSWER_TIME_LIMIT) {
    return SCORES.rightAnswer;
  } else if (answer.success && answer.time < QUICK_ANSWER_TIME_LIMIT) {
    return SCORES.quickAnswer;
  }
  return SCORES.wrongAnswer;
};

export const countsPointsForGame = (answers, lives) => { // export
  if (answers.length < ROUNDS || lives <= 0) {
    return -1;
  }
  const calculatedScores = answers.reduce((sum, current) => {
    return sum + countsPointsForAnswer(current);
  }, 0);
  return calculatedScores;
};

export const showResult = (resultsOfOtherPlayers, resultOfCurrentPlayer) => { // export
  if (resultOfCurrentPlayer.lives <= 0) {
    return `У вас закончились все попытки. Ничего, повезёт в следующий раз!`;
  } else if (resultOfCurrentPlayer.time <= 0) {
    return `Время вышло! Вы не успели отгадать все мелодии`;
  } else {
    const dirtyResultsOfOtherPlayers = resultsOfOtherPlayers.slice();
    dirtyResultsOfOtherPlayers.push(resultOfCurrentPlayer.points);
    dirtyResultsOfOtherPlayers.sort((a, b) => b - a);
    const positionOfCurrentPlayer = dirtyResultsOfOtherPlayers.indexOf(resultOfCurrentPlayer.points) + 1;
    const percent = (dirtyResultsOfOtherPlayers.length - positionOfCurrentPlayer) * 100 / dirtyResultsOfOtherPlayers.length;
    return `Вы заняли ${positionOfCurrentPlayer} место из ${dirtyResultsOfOtherPlayers.length} игроков. Это лучше, чем у ${percent}% игроков`;
  }
};

export const createTimer = (currentTime) => { // export
  const timer = {
    tick: () => {
      if (typeof currentTime !== `number`) {
        throw new Error(`currentTime should be of type number`);
      }
      if (currentTime > 0) {
        currentTime--;
        return currentTime;
      }
      return `Время вышло`;
    }
  };
  return timer;
};
