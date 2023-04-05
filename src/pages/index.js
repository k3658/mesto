import './index.css'
import { profilePopup, profileForm, profileNameInput, nameProfile, profileAboutInput, aboutProfile,
  cardsPopup, cardsForm, cardsContainer, cardsTitleInput, cardsLinkInput, initialCards,
  photoPopup, fullPhotoPopup, fullPhotoCaptionPopup,
  formValidationConfig,
  buttonEditProfile, buttonAddCards } from '../utils/constants.js';
import {openPopupPhoto, closePopup } from '../utils/utils.js';
import { Card } from '../components/card.js';
import { FormValidator } from '../components/formValidator.js';


//VALIDATION
const formValidators = {}

const enableValidation = (formValidationConfig) => {
  const formList = Array.from(document.querySelectorAll(formValidationConfig.formSelector))
  formList.forEach((form) => {
    const validator = new FormValidator(formValidationConfig, form);
    const formName = form.getAttribute('name');

    formValidators[formName] = validator;
    validator.enableValidation();
  });
};

enableValidation(formValidationConfig);

// POPUP PHOTO RELATED
const handleOpenPopupPhoto = (link, name) => {
  fullPhotoPopup.src = link;
  fullPhotoPopup.alt = name;
  fullPhotoCaptionPopup.textContent = name;

  openPopupPhoto();
}

// POPUP PROFILE  RELATED
const handleFormProfileSubmit = (evt) => {
  evt.preventDefault();

  nameProfile.textContent = profileNameInput.value;
  aboutProfile.textContent = profileAboutInput.value;

  closePopup(profilePopup);
};

profileForm.addEventListener('submit', handleFormProfileSubmit);

// POPUP CARDS RELATED
const createCard = (item) => {
  const cardTemplate = new Card(item, '#place-template', handleOpenPopupPhoto);
  const card = cardTemplate.generateCard();
  return card;
};

const renderCards = (item) => {
  cardsContainer.prepend(item);
};

initialCards.forEach((item) => {
  renderCards(createCard(item));
});

const handleFormCardSubmit = (evt) => {
  evt.preventDefault();

  const newCard = {
    name: cardsTitleInput.value,
    link: cardsLinkInput.value
  };

  renderCards(createCard(newCard));
  evt.target.reset();
  closePopup(cardsPopup);
};

cardsForm.addEventListener('submit', handleFormCardSubmit);


