
window.main = (function () {

  const INDEX_OF_START_SCREEN = 0;
  const LEFTARROW_CODE = 37;
  const RIGHTARROW_CODE = 39;
  const app = document.querySelector(`.app`);
  const screensTemplate = document.querySelector(`#templates`).content;

  let screens = screensTemplate.querySelectorAll(`section.main`); // массив с DOM-элементами экранов

  function renderScreen(index) {
    let currentScreen = app.querySelector(`section.main`);
    let screenToInsert = screens[index].cloneNode(true);
    app.replaceChild(screenToInsert, currentScreen);
  }

  renderScreen(INDEX_OF_START_SCREEN); // отризовываем экран приветствия по ТЗ

  let activeScreen = INDEX_OF_START_SCREEN;

  document.addEventListener(`keydown`, switchScreen);

  function switchScreen(evt) {
    let altpress = evt.altKey;
    if (altpress) {
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
  }

  return {
    renderScreen
  };

})();
