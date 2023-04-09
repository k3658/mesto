import { Popup } from './Popup.js';

class PopupWithForm extends Popup {
  constructor({ popup, submitHandler }) {
    super(popup);
    this._submitHandler = submitHandler;
    this._form = this._popup.querySelector('.form');
    this._inputList = this._form.querySelectorAll('.form__input');
  }

  _getInputValues() {
    this._inputValues = {};

    this._inputList.forEach((input) => {
      this._inputValues[input.name] = input.value;
    });
    return this._inputValues;
  }

  close() {
    super.close();
    this._form.reset();
  }

  setEventListeners() {
    super.setEventListeners();

    this._form.addEventListener('submit', (evt) => {
      evt.preventDefault();
      this._submitHandler(this._getInputValues());
      this.close();
    });
  }
}

//exporting into index.js
export { PopupWithForm };
