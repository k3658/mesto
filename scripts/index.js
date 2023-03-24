import { profilePopup, cardsPopup,
  closePopup } from './utils.js';

import { Card } from './card.js';

import { formValidationConfig, FormValidator } from './formValidator.js';

//POPUP PROFILE RELATED VARIABLES
const profileForm = document.forms['form-profile'];

const profileNameInput = document.querySelector('.form__input_field_name');
const nameProfile = document.querySelector('.profile__name');
const profileAboutInput = document.querySelector('.form__input_field_about');
const aboutProfile = document.querySelector('.profile__about');

//POPUP CARDS RELATED VARIABLES
const cardsForm = document.forms['form-cards'];

const cardsTitleInput = document.querySelector('.form__input_field_title');
const cardsLinkInput = document.querySelector('.form__input_field_link');

const cardsContainer = document.querySelector('.places__list');

const initialCards = [
  {
    name: 'Архыз',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
  },
  {
    name: 'Челябинская область',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
  },
  {
    name: 'Иваново',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
  },
  {
    name: 'Камчатка',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
  },
  {
    name: 'Холмогорский район',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
  },
  {
    name: 'Байкал',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
  }
];

//POPUP PHOTO RELATED VARIABLES
const fullPhotoPopup = document.querySelector('.popup__photo');
const fullPhotoCaptionPopup = document.querySelector('.popup__caption');


// PROFILE POPUP RELATED
/**saves profile form info */
const handleFormProfileSubmit = (evt) => {
  evt.preventDefault();

  nameProfile.textContent = profileNameInput.value;
  aboutProfile.textContent = profileAboutInput.value;

  closePopup(profilePopup);
};

//enables validation
const profileValidation = new FormValidator(formValidationConfig, profileForm);
profileValidation.enableValidation();

profileForm.addEventListener('submit', handleFormProfileSubmit);

// CARDS POPUP RELATED
const cards = new Card(initialCards);
cards._renderCards();

const handleFormCardSubmit = (evt) => {
  evt.preventDefault();

  const newCard = {
    name: cardsTitleInput.value,
    link: cardsLinkInput.value
  };
  const cardTemplate = new Card(newCard);
  const card = cardTemplate.generateCard();
  cardsContainer.prepend(card);

  evt.target.reset();
  closePopup(cardsPopup);
};

//enables validation
const formCardValidation = new FormValidator(formValidationConfig, cardsForm);
formCardValidation.enableValidation();

cardsForm.addEventListener('submit', handleFormCardSubmit);


//exporting into utils.js
export { nameProfile, profileNameInput, aboutProfile, profileAboutInput };

//exproting into card.js
export { initialCards, cardsContainer,
  fullPhotoPopup, fullPhotoCaptionPopup };




