// функция, на вход принимающая разметку, на выходе выдает DOM-элемент с этой разметкой
export const getElementFromTemplate = (template) => {
  const outer = document.createElement(`div`);
  outer.innerHTML = template;
  return outer.querySelector(`section.main`);
};
// функция возвращает случайный элемент из массива
export const getRandomFromArray = (possibleValues) => {
  let randomIndex = Math.floor(Math.random() * possibleValues.length);
  return possibleValues[randomIndex];
};
