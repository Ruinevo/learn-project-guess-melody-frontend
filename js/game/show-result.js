
export const showResult = (resultsOfOtherPlayers, resultOfCurrentPlayer) => {
  // if (lives <= 0) {
  // return `У вас закончились все попытки. Ничего, повезёт в следующий раз!`;
  // } else if (resultOfCurrentPlayer.time <= 0) {
  //  return `Время вышло! Вы не успели отгадать все мелодии`;
  // } else {
  const dirtyResultsOfOtherPlayers = resultsOfOtherPlayers.slice();
  dirtyResultsOfOtherPlayers.sort((a, b) => b - a);
  const positionOfCurrentPlayer = dirtyResultsOfOtherPlayers.indexOf(resultOfCurrentPlayer) + 1;
  const percent = (dirtyResultsOfOtherPlayers.length - positionOfCurrentPlayer) * 100 / dirtyResultsOfOtherPlayers.length;
  return `Вы заняли ${positionOfCurrentPlayer} место из ${dirtyResultsOfOtherPlayers.length} игроков. Это лучше, чем у ${percent}% игроков`;
};

