const buttonEdit = document.querySelector('.profile__edit');
const popup = document.querySelector('.popup');
const buttonClose = document.querySelector('.popup__close');
const form = document.querySelector('.popup__edit-form');
let nameInput = document.querySelector('.popup__input_field_name');
let nameProfile = document.querySelector('.profile__name');
let aboutInput = document.querySelector('.popup__input_field_about');
let aboutProfile = document.querySelector('.profile__about');

/* opens popup */
const handleEditButtonClick = () => {
  popup.classList.add('popup_opened');

  nameInput.value =  nameProfile.textContent;
  aboutInput.value = aboutProfile.textContent;
}

/* closes popup */
const handleCloseButtonClick = () => {
  popup.classList.remove('popup_opened');
}

/* saves form info */
function handleFormSubmit (evt) {
    evt.preventDefault();

    nameProfile.textContent = nameInput.value;
    aboutProfile.textContent = aboutInput.value;

    handleCloseButtonClick();
}

buttonEdit.addEventListener('click', handleEditButtonClick);
buttonClose.addEventListener('click', handleCloseButtonClick);
form.addEventListener('submit', handleFormSubmit);
