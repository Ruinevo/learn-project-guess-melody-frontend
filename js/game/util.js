// функция, на вход принимающая разметку, на выходе выдает DOM-элемент с этой разметкой

const MAX_ERRORS_COUNT = 3;


export const getElementFromTemplate = (template) => {
  const outer = document.createElement(`div`);
  outer.innerHTML = template;
  return outer.children[0];
};
// функция возвращает случайный элемент из массива
export const getRandomFromArray = (possibleValues) => {
  const randomIndex = Math.floor(Math.random() * possibleValues.length);
  return possibleValues[randomIndex];
};

// функция добавляет ноль перед значением "минуты"
export const addZero = (value) => value < 10 ? `0` + value : value;

// функция проигрывает и ставит на паузу аудиофайл

export const settingPlayer = (html) => {

  const myMap = new Map();
  const players = html.element.querySelectorAll(`.player`);

  players.forEach((player) => {
    const audio = player.querySelector(`audio`);
    const control = player.querySelector(`.player-control`);
    myMap.set(control, audio);
  });

  const stopAllTracks = (evt) => myMap.forEach((audio, control) => {
    if (control !== evt.target && !audio.paused) {
      audio.pause();
      control.classList.toggle(`player-control--pause`, !audio.paused);
    }
  });

  myMap.forEach((audio, control) => {
    control.addEventListener(`click`, (evt) => {
      evt.preventDefault();
      stopAllTracks(evt);
      if (!audio.paused) {
        audio.pause();
      } else {
        audio.play();
      }
      control.classList.toggle(`player-control--pause`);
    });
  });
};

export const checkStatus = (response) => {
  if (response.ok) {
    return response;
  } else {
    throw new Error(`${response.status}: ${response.statusText} `);
  }
};

export const presentMin = (current, initial) => {
  const passedMin = addZero(Math.trunc((initial / 60) - (current / 60)));
  switch (passedMin) {
    case `00`:
      return `${passedMin} минут`;
    case `01`:
      return `${passedMin} минуту`;
    default:
      return `${passedMin} минуты`;
  }
};

export const presentSec = (current, initial) => {
  const passedSec = addZero((initial - current) % 60);
  const lastSymbol = String(passedSec).substr(-1);
  if (lastSymbol === `1`) {
    return `${passedSec} секунду`;
  }
  if (lastSymbol > `1` && lastSymbol < `5`) {
    return `${passedSec} секунды`;
  }
  return `${passedSec} секунд`;
};

export const presentErrors = (lives) => {
  const countOfError = MAX_ERRORS_COUNT - lives;
  switch (countOfError) {
    case 0:
      return `${countOfError} ошибок`;
    case 1:
      return `${countOfError} ошибку`;
    default:
      return `${countOfError} ошибки`;
  }
};

