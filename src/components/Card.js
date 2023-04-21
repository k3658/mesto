class Card {
  constructor(userId, item, templateSelector, handleCardClick, openPopupDeleteConfirmation, handleLikeCard, handleRemoveLike) {
    this._userId = userId;
    this._cardId = item._id;
    this._ownerId = item.owner._id;

    this._item = item;
    this._name = item.name;
    this._link = item.link;
    this._likes = item.likes;
    this._counter = item.counter;
    this._templateSelector = templateSelector;

    this._handleCardClick = handleCardClick;
    this._openPopupDeleteConfirmation = openPopupDeleteConfirmation;
    this._handleLikeCard = handleLikeCard;
    this._handleRemoveLike = handleRemoveLike;
  }

  _getTemplate() {
    const cardElement = document
    .querySelector(this._templateSelector)
    .content
    .querySelector('.place')
    .cloneNode(true);

    return cardElement;
  }

  generateCard() {
    this._element = this._getTemplate();

    this._photo = this._element.querySelector('.place__photo');
    this._buttonLike = this._element.querySelector('.place__like');
    this._buttonDelete = this._element.querySelector('.place__delete');
    this._counter = this._element.querySelector('.place__like_counter');
    this._counter.textContent = this._likes.length;

    this._element.querySelector('.place__name').textContent = this._name;
    this._photo.src = this._link;
    this._photo.alt = this._link;

    this._setEventListeners();
    this._isOwner();
    this._likes.forEach(() => {
      if (this._cardId === this._userId) {
        this._toggleLikeButton();
    }
    })

    return this._element;
  }

  _isOwner() {
    if (this._ownerId !== this._userId) {
      this._buttonDelete.remove();
    };
  }

  _toggleLikeCard() {
    this._buttonLike.classList.toggle('place__like_active');
  }

  _handleDeleteButtonClick() {
    this._openPopupDeleteConfirmation(this._item);
  }

  _handleDeleteCard() {
    this._element.remove();
    this._element = null;
  }

  _setEventListeners() {
    this._buttonLike.addEventListener('click', () => {
      this._toggleLikeCard();
      if (this._buttonLike.classList.contains('place__like_active')) {
        this._handleLikeCard(this._cardId, this._counter);
      } else {
        this._handleRemoveLike(this._cardId, this._counter);
      }
    });

    this._buttonDelete.addEventListener('click', () => {
      this._handleDeleteButtonClick();
    });

    this._photo.addEventListener('click', () => {
      this._handleCardClick(this._name, this._link);
    });
  }
}

 //exporting into index.js
 export { Card }
