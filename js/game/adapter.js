export const adaptServerData = (data) => {
  for (const level of Object.values(data)) {
    const questionValue = level.question;
    delete level.question;
    level.text = questionValue;
    switch (level.type) {
      case `genre`:
        level.rightAnswers = preprocessGenreAnswers(level);
        break;
      case `artist`:
        level.rightAnswer = preprocessArtistAnswers(level);
        break;
    }
  }
  return data;
};

const preprocessGenreAnswers = (level) => {
  const rightAnswer = level.answers.filter((it) => it.genre === level.genre).map((it) => level.answers.indexOf(it) + 1);
  return rightAnswer;
};

const preprocessArtistAnswers = (level) => {
  const rightAnswer = level.answers.filter((it) => it.isCorrect).map((it) => level.answers.indexOf(it) + 1).join(``);
  return rightAnswer;
};
