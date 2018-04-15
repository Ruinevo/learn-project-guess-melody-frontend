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

export const setPauseAndPlay = (btn, audio) => {
  btn.addEventListener(`click`, (evt) => {
    evt.preventDefault();
    const el = evt.currentTarget;
    if (el.classList.contains(`player-control--pause`)) {
      el.classList.remove(`player-control--pause`);
      audio.pause();
    } else {
      el.classList.add(`player-control--pause`);
      audio.play();
    }
  });
};
