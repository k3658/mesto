const popup = document.querySelector('.popup');
//POPUP PROFILE RELATED
const profilePopup = document.querySelector('.popup_type_profile');
const profileForm = document.forms['form-profile'];

const profileNameInput = document.querySelector('.form__input_field_name');
const nameProfile = document.querySelector('.profile__name');
const profileAboutInput = document.querySelector('.form__input_field_about');
const aboutProfile = document.querySelector('.profile__about');

const buttonEditProfile = document.querySelector('.profile__edit');
const buttonAddCards = document.querySelector('.profile__add');

//POPUP CARDS RELATED
const cardsPopup = document.querySelector('.popup_type_cards');
const cardsForm = document.forms['form-cards'];

const cardsTemplate = document.querySelector('#place-template').content;
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

//POPUP PHOTO RELATED
const photoPopup = document.querySelector('.popup_type_photo');
const fullPhotoPopup = document.querySelector('.popup__photo');
const fullPhotoCaptionPopup = document.querySelector('.popup__caption');
