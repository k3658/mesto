const editButton = document.querySelector('.profile__info_edit');
const popup = document.querySelector('.popup');
const closeButton = document.querySelector('.edit-form__close');

const toggleOpenPopup = () => {
  popup.classList.toggle('popup_opened');
}

const handleEditButtonClick = () => {
  nameInput.value =  nameProfile.textContent;
  aboutInput.value = aboutProfile.textContent;
  toggleOpenPopup();
}

const handleCloseButtonClick = () => {
  toggleOpenPopup();
}

editButton.addEventListener('click', handleEditButtonClick);
closeButton.addEventListener('click', handleCloseButtonClick);

const form = document.querySelector('.popup__edit-form');
let nameInput = document.querySelector('.edit-form__name');
let nameProfile = document.querySelector('.profile__info_name');
let aboutInput = document.querySelector('.edit-form__about');
let aboutProfile = document.querySelector('.profile__info_about');

function handleFormSubmit (evt) {
    evt.preventDefault();

    nameProfile.textContent = nameInput.value;
    aboutProfile.textContent = aboutInput.value;

    handleCloseButtonClick();
}

form.addEventListener('submit', handleFormSubmit);
