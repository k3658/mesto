import './index.css'
import { apiConfig,
  profilePopup, profileForm, profileNameInput, nameProfile, profileAboutInput, aboutProfile,
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
const api = new Api(apiConfig);

// UNIVERSAL VALIDATION
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

// UNIVERSAL SUBMIT
function handleSubmit(request, popupInstance, loadingText = "Сохранение...") {
  popupInstance.renderLoading(true, loadingText);
  request()
    .then(() => {
      popupInstance.close()
    })
    .catch((err) => {
      console.error(`Ошибка: ${err}`);
    })
    .finally(() => {
      popupInstance.renderLoading(false);
    });
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
    function makeRequest() {
      return api.setUserData(data)
      .then((userData) => {
        userInfo.setUserInfo(userData)
      });
    }
    handleSubmit(makeRequest, popupFormProfile);
  }
});

const userInfo = new UserInfo({
  usermameSelector: '.profile__name',
  aboutUserSelector: '.profile__about',
  avatarSelector: '.profile__icon'
});

buttonEditProfile.addEventListener('click', () => {
  popupFormProfile.open();
    const { name, about } = userInfo.getUserInfo();
    profileForm.name.value = name;
    profileForm.about.value = about;
});

popupFormProfile.setEventListeners();

// POPUP AVATAR RELATED
const popupFormAvatar = new PopupWithForm({
  popup: avatarPopup,
  submitHandler: (data) => {
    function makeRequest() {
      return api.updateAvatar(data)
      .then((userData) => {
        userInfo.setUserInfo(userData)
      });
    }
    handleSubmit(makeRequest, popupFormAvatar);
  }
});

avatar.addEventListener('click', () => {
  popupFormAvatar.open();
})

popupFormAvatar.setEventListeners();

// POPUP CARDS RELATED
let userId;

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

Promise.all([api.getUserData(), api.getInitialCards()])
.then(([infoUser, infoCard]) => {
  userId = infoUser._id;
  userInfo.setUserInfo(infoUser);
  initialCardsList.renderer(infoUser._id, infoCard);
})
.catch((err) => {
  console.log(err);
});

const popupFormCard = new PopupWithForm({
  popup: cardsPopup,
  submitHandler: (item) => {
    function makeRequest() {
      return api.postNewCard(item)
      .then((infoCard) => {
        const newCard = createCard(userId, infoCard);
        initialCardsList.addItem(newCard);
      });
    }
    handleSubmit(makeRequest, popupFormCard);
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
    card.deleteCard();
    popupDeleteConfirmation.close();
  })
  .catch((err) => {
    console.log(err);
  })
};

const popupDeleteConfirmation = new PopupWithConfirmation(deleteCardPopup, handleDeleteCard);

const openPopupDeleteConfirmation = (card) => {
  popupDeleteConfirmation.open();
  popupDeleteConfirmation.setData(card);
};

popupDeleteConfirmation.setEventListeners();

// CARDS LIKES RELATED
const handleLikeCard = (card) => {
  api.likeCard(card._cardId)
  .then((res) => {
    card.toggleLikeCard();
    card._counter.textContent = res.likes.length;
  })
  .catch((err) => {
    console.log(err);
  })
};

const handleRemoveLike = (card) => {
  api.removeLike(card._cardId)
  .then((res) => {
    card.toggleLikeCard();
    card._counter.textContent = res.likes.length;
  })
  .catch((err) => {
    console.log(err);
  })
}
