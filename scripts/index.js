const profilePopup = document.querySelector('.popup_type_profile');
const profileForm = document.forms['profile-form'];
const profileNameInput = document.querySelector('.popup__input_field_name');
const nameProfile = document.querySelector('.profile__name');
const profileAboutInput = document.querySelector('.popup__input_field_about');
const aboutProfile = document.querySelector('.profile__about');

const cardsPopup = document.querySelector('.popup_type_cards');
const cardsForm = document.forms['cards-form'];
const cardsTemplate = document.querySelector('#place-template').content;
const cardsContainer = document.querySelector('.places__list');
const cardsTitleInput = document.querySelector('.popup__input_field_title');
const cardsLinkInput = document.querySelector('.popup__input_field_link');

const photoPopup = document.querySelector('.popup_type_photo');
const fullPhotoPopup = document.querySelector('.popup__photo');
const fullPhotoCaptionPopup = document.querySelector('.popup__caption');

const buttonEditProfile = document.querySelector('.profile__edit');
const buttonAddCards = document.querySelector('.profile__add');

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

/* opens popups */
const openPopup = (popup) => {
  popup.classList.add('popup_opened');
}

const openPopupProfile = () => {
  openPopup(profilePopup);

  profileNameInput.value =  nameProfile.textContent;
  profileAboutInput.value = aboutProfile.textContent;
}

const openPopupCards = () => {
  openPopup(cardsPopup);
}

const openPopupPhoto = () => {
  openPopup(photoPopup);
}

/* closes popups */
const closePopup = (popup) => {
  popup.classList.remove('popup_opened');
}

const closeButtons = document.querySelectorAll('.popup__close');
closeButtons.forEach((button) => {
  const popup = button.closest('.popup');
  button.addEventListener('click', () => closePopup(popup));
});

/* saves profile form info */
const handleFormProfileSubmit = (evt) => {
  evt.preventDefault();

  nameProfile.textContent = profileNameInput.value;
  aboutProfile.textContent = profileAboutInput.value;

  closePopup(profilePopup);
}

/* creates card */
const createCard = (item) => {
  const cardsElement = cardsTemplate.querySelector('.place').cloneNode(true);

  const photo = cardsElement.querySelector('.place__photo');
  cardsElement.querySelector('.place__name').textContent = item.name;
  photo.src = item.link;
  photo.alt = item.name;

  /* likes card */
  const buttonLikeCard = cardsElement.querySelector('.place__like');
  buttonLikeCard.addEventListener('click', function(evt) {
    evt.target.classList.toggle('place__like_active');
  })

  /* deletes card */
  const buttonDeleteCard = cardsElement.querySelector('.place__delete');
  buttonDeleteCard.addEventListener('click', function(evt) {
    evt.target.closest('.place').remove();
  })

  /* opens photo */
  photo.addEventListener('click', function() {
    fullPhotoPopup.src = photo.src;
    fullPhotoPopup.alt = photo.alt;
    fullPhotoCaptionPopup.textContent = photo.alt;

    openPopupPhoto();
  })

  return cardsElement;
}

/* adds cards template */
initialCards.forEach((item) => {
  cardsContainer.append(createCard(item));
})

/* adds new card from form */
const handleFormCardSubmit = (evt) => {
  evt.preventDefault();

  cardsContainer.prepend(createCard({
    name: cardsTitleInput.value,
    link: cardsLinkInput.value,
  }));

  evt.target.reset();
  closePopup(cardsPopup);
}

profileForm.addEventListener('submit', handleFormProfileSubmit);
buttonEditProfile.addEventListener('click', openPopupProfile);

cardsForm.addEventListener('submit', handleFormCardSubmit);
buttonAddCards.addEventListener('click', openPopupCards);
