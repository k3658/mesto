import { initialCards, cardsContainer,
 fullPhotoPopup, fullPhotoCaptionPopup } from './index.js';

import { photoPopup } from './utils.js';

class Card {
  constructor(item) {
    this._name = item.name;
    this._link = item.link;
  }

  _getTemplate() {
    const cardElement = document
    .querySelector('#place-template')
    .content
    .querySelector('.place')
    .cloneNode(true);

    return cardElement;
  }

  generateCard() {
    this._element = this._getTemplate();
    this._setEventListeners();

    this._element.querySelector('.place__name').textContent = this._name;
    this._element.querySelector('.place__photo').src = this._link;
    this._element.querySelector('.place__photo').alt = this._link;

    return this._element;
  }

  _renderCards() {
    initialCards.forEach((item) => {
      const card = new Card(item);
      const cardElement = card.generateCard();
      cardsContainer.append(cardElement);
    })
  }

  _handleLikeCard() {
    this._element.querySelector('.place__like').classList.toggle('place__like_active');
  }

  _handleDeleteCard() {
    this._element.remove();
    this._element = null;
  }

  _handleOpenPopupPhoto() {
    fullPhotoPopup.src = this._link;
    fullPhotoPopup.alt = this._name;
    fullPhotoCaptionPopup.textContent = this._name;

    photoPopup.classList.add('popup_opened');
  }

  _setEventListeners() {
    this._element.querySelector('.place__like').addEventListener('click', () => {
      this._handleLikeCard();
    });

    this._element.querySelector('.place__delete').addEventListener('click', () => {
      this._handleDeleteCard();
    });

    this._element.querySelector('.place__photo').addEventListener('click', () => {
      this._handleOpenPopupPhoto();
    });
  }
}

//exporting into index.js
export { Card }
