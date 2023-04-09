import './index.css'
import { profilePopup, profileForm, profileNameInput, nameProfile, profileAboutInput, aboutProfile,
  cardsPopup, cardsForm, cardsContainer, cardsTitleInput, cardsLinkInput, initialCards,
  photoPopup, fullPhotoPopup, fullPhotoCaptionPopup,
  formValidationConfig,
  buttonEditProfile, buttonAddCards } from '../utils/constants.js';
import { Section } from '../components/Section';
import { Popup } from '../components/Popup';
import { PopupWithForm } from '../components/PopupWithForm';
import { UserInfo } from '../components/UserInfo';
import { PopupWithImage } from '../components/PopupWithImage';
import { Card } from '../components/Card.js';
import { FormValidator } from '../components/FormValidator.js';
import { data } from 'autoprefixer';

//VALIDATION
const formValidators = {};

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
const imagePopup = new PopupWithImage(photoPopup);

const handleCardClick = (title, link) => {
  imagePopup.open(title, link);
};

imagePopup.setEventListeners();

// POPUP PROFILE RELATED
const popupFormProfile = new PopupWithForm({
  popupSelector: profilePopup,
  submitHandler: (data) => {
    userInfo.setUserInfo(data);
  }});

const userInfo = new UserInfo({
  usermameSelector: '.profile__name',
  aboutUserSelector: '.profile__about'
});

buttonEditProfile.addEventListener('click', () => {
  popupFormProfile.open();
  const { name, about } = userInfo.getUserInfo();
  profileForm.name.value = name;
  profileForm.about.value = about;
});

popupFormProfile.setEventListeners();

// POPUP CARDS RELATED
const createCard = (item, templateSelector, handleCardClick) => {
  const card = new Card(item, templateSelector, handleCardClick);
  return card.generateCard();
};

const renderCards = (cardElement) => {
  cardsContainer.prepend(cardElement);
};

const initialCardsList = new Section({
  items: initialCards,
  renderer: (item) => {
    const initials = createCard(item, '#place-template', handleCardClick);
    initialCardsList.addItem(initials);
  }
}, cardsContainer);

initialCardsList.renderer();

const popupFormCard = new PopupWithForm({
  popupSelector: cardsPopup,
  submitHandler: (item) => {
    const newCard = createCard(item, '#place-template', handleCardClick);
    renderCards(newCard);
  }});

buttonAddCards.addEventListener('click', () => {
  popupFormCard.open();
});

popupFormCard.setEventListeners();
