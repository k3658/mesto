import './index.css'
import { profilePopup, profileForm, profileNameInput, nameProfile, profileAboutInput, aboutProfile,
  avatarPopup, avatarForm, avatar,
  cardsPopup, cardsForm, cardsContainer, cardsTitleInput, cardsLinkInput, initialCards,
  deleteCardPopup,
  photoPopup, fullPhotoPopup, fullPhotoCaptionPopup,
  formValidationConfig,
  buttonEditProfile, buttonAddCards } from '../utils/constants.js';
import { api } from '../components/Api.js';
import { Section } from '../components/Section';
import { Popup } from '../components/Popup';
import { PopupWithForm } from '../components/PopupWithForm';
import { UserInfo } from '../components/UserInfo';
import { PopupWithImage } from '../components/PopupWithImage';
import { Card } from '../components/Card.js';
import { PopupWithConfirmation } from '../components/PopupWithConfirmation.js';
import { FormValidator } from '../components/FormValidator.js';

// VALIDATION
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

// UX/LOADING
const renderLoading = (isLoading, submitButton) => {
  if (isLoading) {
    if (submitButton.textContent.length >= 9) {
        submitButton.textContent = 'Сохранение...';
    } else {
        submitButton.textContent = 'Создание...';
    }
  } else {
      if (submitButton.textContent.length >= 12) {
          submitButton.textContent = 'Сохранить';
      } else {
          submitButton.textContent = 'Создать';
      }
  }
}

// POPUP PHOTO RELATED
const imagePopup = new PopupWithImage(photoPopup);

const handleCardClick = (name, link) => {
  imagePopup.open(name, link);
};

imagePopup.setEventListeners();

// POPUP PROFILE RELATED
const popupFormProfile = new PopupWithForm({
  popup: profilePopup,
  submitHandler: (data) => {
    renderLoading(true, profileForm.querySelector('.form__button'));
    api.setUserData(data)
    .then(() => {
      userInfo.setUserInfo(data);
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => {
      renderLoading(false, profileForm.querySelector('.form__button'));
    })
  }
});

const userInfo = new UserInfo({
  usermameSelector: '.profile__name',
  aboutUserSelector: '.profile__about'
});

const userData = api.getUserData()
userData.then((res) => {
  avatar.src = res.avatar;
  userInfo.setUserInfo({ name: res.name, about: res.about});
})
.catch((err) => {
  console.log(err);
});

buttonEditProfile.addEventListener('click', () => {
  popupFormProfile.open();
  api.getUserData()
  .then(() => {
    const { name, about } = userInfo.getUserInfo();
    profileForm.name.value = name;
    profileForm.about.value = about;
  })
  .catch((err) => {
    console.log(err);
  })
});

popupFormProfile.setEventListeners();

// POPUP AVATAR RELATED
const popupFormAvatar = new PopupWithForm({
  popup: avatarPopup,
  submitHandler: (data) => {
    renderLoading(true, avatarForm.querySelector('.form__button'));
    api.updateAvatar(data)
    .then(() => {
      avatar.src = data.avatar;
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => {
      renderLoading(false, avatarForm.querySelector('.form__button'));
    })
  }
});

avatar.addEventListener('click', () => {
  popupFormAvatar.open();
})

popupFormAvatar.setEventListeners();

// POPUP CARDS RELATED
const createCard = (userId, item) => {
  const id = item._id;
  const cardElement = new Card(userId, item, '#place-template', handleCardClick,
  () => openPopupDeleteConfirmation(cardElement, id), handleLikeCard, handleRemoveLike);
  return cardElement.generateCard();
};

const initialCardsList = new Section({
  renderer: (userId, item) => {
    initialCardsList.addItem(createCard(userId, item));
  }
}, cardsContainer);

const initials = api.getInitialCards();

Promise.all([userData, initials])
.then(([infoUser, infoCard]) => {
  initialCardsList.renderer(infoUser._id, infoCard);
})
.catch((err) => {
  console.log(err);
});

const popupFormCard = new PopupWithForm({
  popup: cardsPopup,
  submitHandler: (item) => {
    renderLoading(true, cardsForm.querySelector('.form__button'));
    const card = api.postNewCard(item)
    Promise.all([userData, card])
    .then(([infoUser, infoCard]) => {
      const newCard = createCard(infoUser._id, infoCard);
      initialCardsList.addItem(newCard);
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => {
      renderLoading(false, cardsForm.querySelector('.form__button'));
    })
  }
});

buttonAddCards.addEventListener('click', () => {
  popupFormCard.open();
});

popupFormCard.setEventListeners();

// POPUP DELETE CONFIRMATION RELATED
const handleDeleteCard = (cardElement, id) => {
  api.deleteCard(id)
  .then(() => {
    cardElement._handleDeleteCard();
    popupDeleteConfirmation.close();
  })
  .catch((err) => {
    console.log(err);
  })
};

const popupDeleteConfirmation = new PopupWithConfirmation(deleteCardPopup, handleDeleteCard);

const openPopupDeleteConfirmation = (cardElement, id) => {
  popupDeleteConfirmation.open();
  popupDeleteConfirmation.handleConfirmButtonClick(cardElement, id);
};

popupDeleteConfirmation.setEventListeners();

// CARDS LIKES RELATED
const handleLikeCard = (cardElement, counter) => {
  api.likeCard(cardElement)
  .then((res) => {
    counter.textContent = res.likes.length;
  })
  .catch((err) => {
    console.log(err);
  })
};

const handleRemoveLike = (cardElement, counter) => {
  api.removeLike(cardElement)
  .then((res) => {
    counter.textContent = res.likes.length;
  })
  .catch((err) => {
    console.log(err);
  })
}
