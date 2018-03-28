
window.main = (function () {

  const numberOfStartScreen = 0;
  const ALT_KEYCODE = 18;
  const LEFTARROW_CODE = 37;
  const RIGHTARROW_CODE = 39;
  const app = document.querySelector(`.app`);
  const screensTemplate = document.querySelector(`#templates`).content;

  let screens = screensTemplate.querySelectorAll(`section.main`); // массив с DOM-элементами экранов

  function renderScreen(number) {
    let screen = app.querySelector(`section.main`);
    let screenCopy = screens[number].cloneNode(true);
    app.replaceChild(screenCopy, screen);
  }

  renderScreen(numberOfStartScreen); // отризовываем экран приветствия по ТЗ

  let activeScreen = numberOfStartScreen;

  document.addEventListener(`keydown`, function (evt) {
    if (evt.keyCode === ALT_KEYCODE) {
      evt.preventDefault();
      document.addEventListener(`keydown`, toSwitchScreen);
    }
  });

  function toSwitchScreen(evt) {
    if (evt.keyCode === RIGHTARROW_CODE) {
      evt.preventDefault();
      if (activeScreen < screens.length - 1) {
        activeScreen++;
        renderScreen(activeScreen);
      }
    }
    if (evt.keyCode === LEFTARROW_CODE) {
      evt.preventDefault();
      if (activeScreen > 0) {
        activeScreen--;
        renderScreen(activeScreen);
      }
    }
  }

  return {
    renderScreen: renderScreen
  };


})();
