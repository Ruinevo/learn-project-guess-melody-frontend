const ScoresForAnswer = {
  RIGHT: 1,
  WRONG: -2,
  QUICK: 2
};

const QUICK_ANSWER_TIME_LIMIT = 30; // s
const ROUNDS = 10;


const calculateScoresForAnswer = (answer) => {
  if (answer.success && answer.time > QUICK_ANSWER_TIME_LIMIT) {
    return ScoresForAnswer.RIGHT;
  } else if (answer.success && answer.time < QUICK_ANSWER_TIME_LIMIT) {
    return ScoresForAnswer.QUICK;
  }
  return ScoresForAnswer.WRONG;
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

export const calculateQuickAnswers = (answers) => {
  const quickAnswers = answers.filter((it) => it.time < 30);
  return quickAnswers.length;
};
