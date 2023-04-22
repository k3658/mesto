import { Popup } from './Popup.js';

class PopupWithForm extends Popup {
  constructor({ popup, submitHandler }) {
    super(popup);
    this._submitHandler = submitHandler;
    this._form = this._popup.querySelector('.form');
    this._inputList = this._form.querySelectorAll('.form__input');
    this._submitBtn = this._form.querySelector('.form__button');
    this._submitBtnText = this._submitBtn.textContent;
  }

  _getInputValues() {
    this._inputValues = {};

    this._inputList.forEach((input) => {
      this._inputValues[input.name] = input.value;
    });
    return this._inputValues;
  }

  renderLoading(isLoading, loadingText='Сохранение...') {
    if (isLoading) {
      this._submitBtn.textContent = loadingText;
    } else {
      this._submitBtn.textContent = this._submitBtnText;
    }
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
    });
  }
}

//exporting into index.js
export { PopupWithForm };
