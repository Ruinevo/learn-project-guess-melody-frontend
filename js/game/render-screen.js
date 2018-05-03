export const renderScreen = (view) => {
  const app = document.querySelector(`.app`);
  app.innerHTML = ``;
  app.appendChild(view.element);
};
