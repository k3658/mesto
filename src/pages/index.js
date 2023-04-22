import './index.css'
import { profilePopup, profileForm, profileNameInput, nameProfile, profileAboutInput, aboutProfile,
  avatarPopup, avatarForm, avatar,
  cardsPopup, cardsForm, cardsContainer, cardsTitleInput, cardsLinkInput, initialCards,
  deleteCardPopup,
  photoPopup, fullPhotoPopup, fullPhotoCaptionPopup,
  formValidationConfig,
  buttonEditProfile, buttonAddCards } from '../utils/constants.js';
import { Api } from '../components/Api.js';
import { Section } from '../components/Section';
import { Popup } from '../components/Popup';
import { PopupWithForm } from '../components/PopupWithForm';
import { UserInfo } from '../components/UserInfo';
import { PopupWithImage } from '../components/PopupWithImage';
import { Card } from '../components/Card.js';
import { PopupWithConfirmation } from '../components/PopupWithConfirmation.js';
import { FormValidator } from '../components/FormValidator.js';
import { info } from 'autoprefixer';

// API
const apiConfig = {
  baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-64',
  headers: {
    authorization: '0f03367f-2da2-4dcf-b5ff-2d3e57bc8d8b',
    'Content-Type': 'application/json'
  }
}

const api = new Api(apiConfig);

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
    api.setUserData(data)
    .then(() => {
      userInfo.setUserInfo(data);
      popupFormProfile.renderLoading(true);
      popupFormProfile.close();
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => {
      popupFormProfile.renderLoading(false);
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
    api.updateAvatar(data)
    .then(() => {
      avatar.src = data.avatar;
      popupFormAvatar.renderLoading(true);
      popupFormAvatar.close();
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => {
      popupFormAvatar.renderLoading(false);
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
    const card = api.postNewCard(item)
    Promise.all([userData, card])
    .then(([infoUser, infoCard]) => {
      const newCard = createCard(infoUser._id, infoCard);
      initialCardsList.addItem(newCard);
      popupFormCard.renderLoading(true);
      popupFormCard.close();
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => {
      popupFormCard.renderLoading(false);
    })
  }
});

buttonAddCards.addEventListener('click', () => {
  popupFormCard.open();
});

popupFormCard.setEventListeners();

// POPUP DELETE CONFIRMATION RELATED
const handleDeleteCard = (card) => {
  api.deleteCard(card._cardId)
  .then(() => {
    card._handleDeleteCard();
    popupDeleteConfirmation.close();
  })
  .catch((err) => {
    console.log(err);
  })
};

const popupDeleteConfirmation = new PopupWithConfirmation(deleteCardPopup, handleDeleteCard);

const openPopupDeleteConfirmation = (card) => {
  popupDeleteConfirmation.open();
  popupDeleteConfirmation.getValues(card);
};

popupDeleteConfirmation.setEventListeners();

// CARDS LIKES RELATED
const handleLikeCard = (cardElement, counter) => {
  api.likeCard(cardElement)
  .then((res) => {
    counter.textContent = res.likes.length;
    console.log(res.likes);
    res.likes.forEach((user) => {
      user._id;
    })
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
