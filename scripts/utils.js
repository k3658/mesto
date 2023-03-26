import  { nameProfile, profileNameInput, aboutProfile, profileAboutInput } from './index.js';

//POPUPS
const profilePopup = document.querySelector('.popup_type_profile');
const cardsPopup = document.querySelector('.popup_type_cards');
const photoPopup = document.querySelector('.popup_type_photo');

//BUTTONS
const buttonEditProfile = document.querySelector('.profile__edit');
const buttonAddCards = document.querySelector('.profile__add');

/** opens popups */
const openPopup = (popup) => {
  popup.classList.add('popup_opened');
  document.addEventListener('keydown', closePopupEscape);
};

const openPopupProfile = () => {
  openPopup(profilePopup);

  profileNameInput.value =  nameProfile.textContent;
  profileAboutInput.value = aboutProfile.textContent;
};

const openPopupCards = () => {
  openPopup(cardsPopup);
};

const openPopupPhoto = () => {
  openPopup(photoPopup);
};

/** closes popups */
const closePopup = (popup) => {
  popup.classList.remove('popup_opened');
  document.removeEventListener('keydown', closePopupEscape);
};

const popups = document.querySelectorAll('.popup');
popups.forEach((popup) => {
  popup.addEventListener('click', (evt) => {
    if (evt.target === evt.currentTarget || evt.target.classList.contains('popup__close')) {
      closePopup(evt.currentTarget);
    }
  });
});

const closePopupEscape = (evt) => {
  if (evt.key === "Escape") {
    const popupOpened = document.querySelector('.popup_opened');
    closePopup(popupOpened);
  }
}

buttonEditProfile.addEventListener('click', openPopupProfile);
buttonAddCards.addEventListener('click', openPopupCards);

//exporting into card.js
export { photoPopup };

//expotring into index.js
export { profilePopup, cardsPopup,
  openPopupPhoto,
  closePopup, closePopupEscape };
