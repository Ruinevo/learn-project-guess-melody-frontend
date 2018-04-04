// функция, на вход принимает DOM-элемент и отрисовывает его на экран
export const renderScreen = (element) => {
  const app = document.querySelector(`.app`);
  app.innerHTML = ``;
  app.appendChild(element);
};

