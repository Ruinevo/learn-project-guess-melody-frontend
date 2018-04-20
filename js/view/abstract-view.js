import {getElementFromTemplate} from './../game/util';

export default class AbstractView {
  constructor() {
    if (new.target === AbstractView) {
      throw new Error(`Can't instantiate AbstractView, only concrete one`);
    }
  }

  get template() {
    throw new Error(`template is required`);
  }

  get element() {
    if (this._element) {
      return this._element;
    }
    this._element = this.render();
    this.bind();
    return this.element;
  }

  render() {
    return getElementFromTemplate(this.template);
  }

  bind() {

  }
}
