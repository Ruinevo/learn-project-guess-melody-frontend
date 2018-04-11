export const createTimer = (currentTime) => {
  const timer = {
    tick: () => (currentTime > 0) ? --currentTime : `Время вышло`
  };
  return timer;
};
