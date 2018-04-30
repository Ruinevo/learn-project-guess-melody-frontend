// функция, на вход принимающая разметку, на выходе выдает DOM-элемент с этой разметкой
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
  if (response.status >= 200 && response.status < 300) {
    return response;
  } else {
    throw new Error(`${response.status}: ${response.statusText} `);
  }
};

