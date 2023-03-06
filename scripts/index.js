// OPENS AND CLOSES POPUPS
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
};

const closeButtons = document.querySelectorAll('.popup__close');
closeButtons.forEach((button) => {
  const popup = button.closest('.popup');
  button.addEventListener('click', () => closePopup(popup));
});

const closePopupOverlayClick = document.querySelectorAll('.popup');
closePopupOverlayClick.forEach((popup) => {
  popup.addEventListener('click', (evt) => {
    if (evt.target === evt.currentTarget || evt.target.classList.contains('.popup__close')) {
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
buttonAddCards.addEventListener('click', openPopupCards);

// PROFILE POPUP RELATED
/**saves profile form info */
const handleFormProfileSubmit = (evt) => {
  evt.preventDefault();

  nameProfile.textContent = profileNameInput.value;
  aboutProfile.textContent = profileAboutInput.value;

  closePopup(profilePopup);
};

profileForm.addEventListener('submit', handleFormProfileSubmit);
buttonEditProfile.addEventListener('click', openPopupProfile);

// CARDS POPUP RELATED
/** creates card  */
const createCard = (item) => {
  const cardsElement = cardsTemplate.querySelector('.place').cloneNode(true);

  const photo = cardsElement.querySelector('.place__photo');
  cardsElement.querySelector('.place__name').textContent = item.name;
  photo.src = item.link;
  photo.alt = item.name;

  /** likes card */
  const buttonLikeCard = cardsElement.querySelector('.place__like');
  buttonLikeCard.addEventListener('click', (evt) => {
    evt.target.classList.toggle('place__like_active');
  });

  /** deletes card */
  const buttonDeleteCard = cardsElement.querySelector('.place__delete');
  buttonDeleteCard.addEventListener('click', (evt) => {
    evt.target.closest('.place').remove();
  });

  /* opens photo  */
  photo.addEventListener('click', () => {
    fullPhotoPopup.src = photo.src;
    fullPhotoPopup.alt = photo.alt;
    fullPhotoCaptionPopup.textContent = photo.alt;

    openPopupPhoto();
  });

  return cardsElement;
};

/** adds cards template */
initialCards.forEach((item) => {
  cardsContainer.append(createCard(item));
});

/** adds new card from form */
const handleFormCardSubmit = (evt) => {
  evt.preventDefault();

  cardsContainer.prepend(createCard({
    name: cardsTitleInput.value,
    link: cardsLinkInput.value,
  }));

  evt.target.reset();
  closePopup(cardsPopup);
};

cardsForm.addEventListener('submit', handleFormCardSubmit);

