const COUNTING_RULES = {
  pointsForSuccessAnswer: 1,
  pointsForUnsuccessAnswer: -2,
  pointsForFastAndSuccessAnswer: 2,
  timeOfFastAnswer: 30
};

const countsPointsForAnswer = (elem) => {
  if (elem.success && elem.time > COUNTING_RULES.timeOfFastAnswer) {
    return COUNTING_RULES.pointsForSuccessAnswer;
  } else if (elem.success && elem.time < COUNTING_RULES.timeOfFastAnswer) {
    return COUNTING_RULES.pointsForFastAndSuccessAnswer;
  } else if (!elem.success) {
    return COUNTING_RULES.pointsForUnsuccessAnswer;
  }
};

export const countsPointsForGame = (answers, lives) => {
  if (answers.length < 10 || lives <= 0) {
    return -1;
  }
  const calculatedAnswers = answers.reduce((sum, current) => {
    return sum + countsPointsForAnswer(current);
  }, 0);
  return calculatedAnswers;
};

export const showResult = (resultsOfOtherPlayers, resultOfCurrentPlayer) => {
  if (resultOfCurrentPlayer.lives <= 0) {
    return `У вас закончились все попытки. Ничего, повезёт в следующий раз!`;
  } else if (resultOfCurrentPlayer.time <= 0) {
    return `Время вышло! Вы не успели отгадать все мелодии`;
  } else {
    resultsOfOtherPlayers.push(resultOfCurrentPlayer.points);
    resultsOfOtherPlayers.sort((a, b) => {
      return b - a;
    });
    const positionOfCurrentPlayer = resultsOfOtherPlayers.indexOf(resultOfCurrentPlayer.points) + 1;
    const percent = (resultsOfOtherPlayers.length - positionOfCurrentPlayer) * 100 / resultsOfOtherPlayers.length;
    return `Вы заняли ${positionOfCurrentPlayer} место из ${resultsOfOtherPlayers.length} игроков. Это лучше, чем у ${percent}% игроков`;
  }
};

export const createTimer = (fulltime) => {
  const timer = {
    time: fulltime,
    tick: function () { // не использую стрелочную функцию из за this
      if (this.time > 0) {
        this.time--;
      } else {
        return `Время вышло`;
      }
    }
  };
  return timer;
};
