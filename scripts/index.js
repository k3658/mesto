const popup = document.querySelector('.popup');

const popupProfile = document.querySelector('.popup_type_profile');
const formProfile = document.querySelector('.popup__edit-form');
const nameInput = document.querySelector('.popup__input_field_name');
const nameProfile = document.querySelector('.profile__name');
const aboutInput = document.querySelector('.popup__input_field_about');
const aboutProfile = document.querySelector('.profile__about');

const popupCards = document.querySelector('.popup_type_place');
const formCard = document.querySelector('.popup__add-form');
const cardsTemplate = document.querySelector('#place-template').content;
const cardsContainer = document.querySelector('.places__list');
const titleInput = document.querySelector('.popup__input_field_title');
const linkInput = document.querySelector('.popup__input_field_link');

const popupPhoto = document.querySelector('.popup_type_photo');
const popupFullPhoto = document.querySelector('.popup__photo');
const popupFullPhotoCaption = document.querySelector('.popup__caption');

const buttonEdit = document.querySelector('.profile__edit');
const buttonAdd = document.querySelector('.profile__add');
const buttonClose = document.querySelector('.popup__close');

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
  openPopup(popupProfile);

  nameInput.value =  nameProfile.textContent;
  aboutInput.value = aboutProfile.textContent;
}

const openPopupCards = () => {
  openPopup(popupCards);
}

const openPopupPhoto = () => {
  openPopup(popupPhoto);
}

/* closes popups */
const closePopup = (popup) => {
  popup.classList.remove('popup_opened');
}

const closePopupProfile = () => {
  closePopup(popupProfile);
}

const closePopupCards = () => {
  closePopup(popupCards);
}

const closePopupPhoto = () => {
  closePopup(popupPhoto);
}

/* saves profile form info */
const handleFormProfileSubmit = (evt) => {
  evt.preventDefault();

  nameProfile.textContent = nameInput.value;
  aboutProfile.textContent = aboutInput.value;

  closePopupProfile();
}

/* adds cards template */
initialCards.forEach((element) => {
  const cardsElement = cardsTemplate.querySelector('.place').cloneNode(true);

  cardsElement.querySelector('.place__name').textContent = element.name;
  cardsElement.querySelector('.place__photo').src = element.link;
  cardsElement.querySelector('.place__photo').alt = element.name;

  cardsContainer.append(cardsElement);

  /* likes card */
  const buttonLike = cardsElement.querySelector('.place__like');
  buttonLike.addEventListener('click', function(evt) {
    evt.target.classList.toggle('place__like_active');
  })

  /* deletes card */
  const buttonDelete = cardsElement.querySelector('.place__delete');
  buttonDelete.addEventListener('click', function(evt) {
    evt.target.closest('.place').remove();
  })

  /* opens img */
  const photo = cardsElement.querySelector('.place__photo');
  photo.addEventListener('click', function() {

  popupFullPhoto.src = photo.src;
  popupFullPhoto.alt = photo.alt;
  popupFullPhotoCaption.textContent = photo.alt;

  openPopupPhoto();
  })
})


/* adds new card from form */
const handleFormCardSubmit = (evt) => {
  evt.preventDefault();
  const cardsElement = cardsTemplate.querySelector('.place').cloneNode(true);

  cardsElement.querySelector('.place__name').textContent = titleInput.value;
  cardsElement.querySelector('.place__photo').src = linkInput.value;
  cardsElement.querySelector('.place__photo').alt = titleInput.value;

  titleInput.value = '';
  linkInput.value = '';
  cardsContainer.prepend(cardsElement);
  closePopupCards();

  /* likes card */
  const buttonLike = cardsElement.querySelector('.place__like');
  buttonLike.addEventListener('click', function(evt) {
    evt.target.classList.toggle('place__like_active');
  })

  /* deletes card */
  const buttonDelete = cardsElement.querySelector('.place__delete');
  buttonDelete.addEventListener('click', function(evt) {
    evt.target.closest('.place').remove();
  })

  /* opens img */
  const photo = cardsElement.querySelector('.place__photo');
  photo.addEventListener('click', function() {

  popupFullPhoto.src = photo.src;
  popupFullPhoto.alt = photo.alt;
  popupFullPhotoCaption.textContent = photo.alt;

  openPopupPhoto();
  })
}

popupProfile.querySelector('.popup__close').addEventListener('click', closePopupProfile);
formProfile.addEventListener('submit', handleFormProfileSubmit);

popupCards.querySelector('.popup__close').addEventListener('click', closePopupCards);
formCard.addEventListener('submit', handleFormCardSubmit);

popupPhoto.querySelector('.popup__close').addEventListener('click', closePopupPhoto);

buttonAdd.addEventListener('click', openPopupCards);
buttonEdit.addEventListener('click', openPopupProfile);
