const SCORES = {
  rightAnswer: 1,
  wrongAnswer: -2,
  quickAnswer: 2
};

const QUICK_ANSWER_TIME_LIMIT = 30; // s
const ROUNDS = 10;


const calculateScoresForAnswer = (answer) => {
  if (answer.success && answer.time > QUICK_ANSWER_TIME_LIMIT) {
    return SCORES.rightAnswer;
  } else if (answer.success && answer.time < QUICK_ANSWER_TIME_LIMIT) {
    return SCORES.quickAnswer;
  }
  return SCORES.wrongAnswer;
};

export const calculateScoresForGame = (answers, lives) => {
  if (answers.length <= ROUNDS - 1 || lives <= 0) {
    return -1;
  }
  const calculatedScores = answers.reduce((sum, current) => {
    return sum + calculateScoresForAnswer(current);
  }, 0);
  return calculatedScores;
};
