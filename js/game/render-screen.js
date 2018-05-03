// функция, на вход принимает DOM-элемент и отрисовывает его на экран
export const renderScreen = (view) => {
  const app = document.querySelector(`.app`);
  app.innerHTML = ``;
  app.appendChild(view.element);
};
