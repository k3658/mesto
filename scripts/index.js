const editButton = document.querySelector('.profile__edit');
const popup = document.querySelector('.popup');
const closeButton = document.querySelector('.popup__editForm_close');

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

const form = document.querySelector('.popup__editForm');
let nameInput = document.querySelector('.popup__editForm_name');
let nameProfile = document.querySelector('.profile__name');
let aboutInput = document.querySelector('.popup__editForm_about');
let aboutProfile = document.querySelector('.profile__about');

function handleFormSubmit (evt) {
    evt.preventDefault();

    nameProfile.textContent = nameInput.value;
    aboutProfile.textContent = aboutInput.value;

    handleCloseButtonClick();
}

form.addEventListener('submit', handleFormSubmit);
