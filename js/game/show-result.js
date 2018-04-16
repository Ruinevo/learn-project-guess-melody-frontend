export const showResult = (resultsOfOtherPlayers, resultOfCurrentPlayer) => {
  if (resultOfCurrentPlayer.lives <= 0) {
    return `У вас закончились все попытки.<br> Ничего, повезёт в следующий раз!`;
  }
  if (resultOfCurrentPlayer.times <= 0) {
    return `Время вышло! Вы не успели отгадать все мелодии`;
  }
  const dirtyResultsOfOtherPlayers = resultsOfOtherPlayers.slice();
  dirtyResultsOfOtherPlayers.sort((a, b) => b - a);
  const positionOfCurrentPlayer = dirtyResultsOfOtherPlayers.indexOf(resultOfCurrentPlayer.points) + 1;
  const percent = (dirtyResultsOfOtherPlayers.length - positionOfCurrentPlayer) * 100 / dirtyResultsOfOtherPlayers.length;
  return `Вы заняли ${positionOfCurrentPlayer} место из ${dirtyResultsOfOtherPlayers.length} игроков. Это лучше, чем у ${percent}% игроков`;
};


