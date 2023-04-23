// API
const apiConfig = {
  baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-64',
  headers: {
    authorization: '0f03367f-2da2-4dcf-b5ff-2d3e57bc8d8b',
    'Content-Type': 'application/json'
  }
};

// POPUP PROFILE RELATED VARIABLES
const profilePopup = document.querySelector('.popup_type_profile');
const profileForm = document.forms['form-profile'];

const profileNameInput = document.querySelector('.form__input_field_name');
const nameProfile = document.querySelector('.profile__name');
const profileAboutInput = document.querySelector('.form__input_field_about');
const aboutProfile = document.querySelector('.profile__about');

// POPUP AVATAR RELATED VARIABLES
const avatarPopup = document.querySelector('.popup_type_avatar');
const avatarForm = document.forms['form-avatar'];

const avatar = document.querySelector('.profile__icon');

// POPUP CARDS RELATED VARIABLES
const cardsPopup = document.querySelector('.popup_type_cards');
const cardsForm = document.forms['form-cards'];
const cardsContainer = document.querySelector('.places__list');

const cardsTitleInput = document.querySelector('.form__input_field_title');
const cardsLinkInput = document.querySelector('.form__input_field_link');

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

// POPUP DELETE RELATED VARIABLES
const deleteCardPopup = document.querySelector('.popup_type_delete');

// POPUP PHOTO RELATED VARIABLES
const photoPopup = document.querySelector('.popup_type_photo');
const fullPhotoPopup = document.querySelector('.popup__photo');
const fullPhotoCaptionPopup = document.querySelector('.popup__caption');

// VALIDATION
const formValidationConfig = {
  formSelector: '.form',
  inputSelector: '.form__input',
  submitButtonSelector: '.form__button',
  disabledButtonClass: 'form__button_disabled',
  inputErrorClass: 'form__input_error'
};

// BUTTONS
const buttonEditProfile = document.querySelector('.profile__edit');
const buttonAddCards = document.querySelector('.profile__add');

//exporting into index.js
export { apiConfig,
profilePopup, profileForm, profileNameInput, nameProfile, profileAboutInput, aboutProfile,
avatarPopup, avatarForm, avatar,
cardsPopup, cardsForm, cardsContainer, cardsTitleInput, cardsLinkInput, initialCards,
deleteCardPopup,
photoPopup, fullPhotoPopup, fullPhotoCaptionPopup,
formValidationConfig,
buttonEditProfile, buttonAddCards }
