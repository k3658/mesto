const formValidationConfig = {
  formSelector: '.form',
  inputSelector: '.form__input',
  submitButtonSelector: '.form__button',
  disabledButtonClass: 'form__button_disabled',
  inputErrorClass: 'form__input_error'
};

/** disabled submit */
const disableSubmit = (evt) => {
  evt.preventDefault();
};

/** forms validation */
const enableValidation = (config) => {
  const formList = Array.from(document.querySelectorAll(config.formSelector));

  formList.forEach((form) => {
    enableFormValidation(form, config);
  });
};

const enableFormValidation = (form, config) => {
  form.addEventListener('submit', disableSubmit);
    form.addEventListener('input', () => {
      toggleSubmitButton(form, config);
    });

    addInputListeners(form, config);
    toggleSubmitButton(form, config);
};

/** checks inputs validity */
const handleFormInput = (evt, config) => {
  const input = evt.target;
  const inputId = input.id;
  const errorElement = document.querySelector(`#${inputId}-error`);

  if (input.validity.valid) {
    input.classList.remove(config.inputErrorClass);
    errorElement.textContent = '';
  } else {
    input.classList.add(config.inputErrorClass);
    errorElement.textContent = input.validationMessage;
  };
};

const addInputListeners = (form, config) => {
  const inputList = Array.from(form.querySelectorAll(config.inputSelector));

  inputList.forEach((item) => {
    item.addEventListener('input', (evt) => {
      handleFormInput(evt, config);
    });
  });
};

/** toggles submit button */
const toggleSubmitButton = (form, config) => {
  const submitButton = form.querySelector(config.submitButtonSelector);
  const isFormValid = form.checkValidity();

  submitButton.disabled = !isFormValid;
  submitButton.classList.toggle('form__button_disabled', !isFormValid);
};

enableValidation(formValidationConfig);



