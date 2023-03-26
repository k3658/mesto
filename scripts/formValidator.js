const formValidationConfig = {
  formSelector: '.form',
  inputSelector: '.form__input',
  submitButtonSelector: '.form__button',
  disabledButtonClass: 'form__button_disabled',
  inputErrorClass: 'form__input_error'
};

class FormValidator {
  constructor(obj, form) {
    this._form = form;
    this._inputSelector = obj.inputSelector;
    this._inputErrorClass = obj.inputErrorClass;
    this._submitButtonSelector = obj.submitButtonSelector;
    this._disabledButtonClass = obj.disabledButtonClass;
    this._inputList = this._form.querySelectorAll(this._inputSelector);
    this._submitButton = this._form.querySelector(this._submitButtonSelector);
  }

  enableValidation() {
    this._setEventListeners();
  }

  _isValid() {
    this._errorElement = this._form.querySelector(`#${this._inputSelector.id}-error`);

    if (this._inputSelector.validity.valid) {
      this._inputSelector.classList.remove(this._inputErrorClass);
      this._errorElement.textContent = '';
    } else {
      this._inputSelector.classList.add(this._inputErrorClass);
      this._errorElement.textContent = this._inputSelector.validationMessage;
    };
  }

  _toggleSubmitButton() {
    const isFormValid = this._form.checkValidity();
    this._submitButton.disabled = !isFormValid;
    this._submitButton.classList.toggle(this._disabledButtonClass, !isFormValid);
  }

  _setEventListeners() {
    this._inputList.forEach((item) => {
      item.addEventListener('input', () => {
        this._inputSelector = item;
        this._isValid();
      });
    });

    this._form.addEventListener('input', () => {
      this._toggleSubmitButton();
    });

    this._form.addEventListener('reset', () => {
      setTimeout(() => {
        this._toggleSubmitButton();
      }, 0);
    });

    this._toggleSubmitButton();
  }
};

//exporting into index.js
export { formValidationConfig, FormValidator };

