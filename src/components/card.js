class Card {
  constructor(item, templateSelector, handleCardClick) {
    this._title = item.title;
    this._link = item.link;
    this._templateSelector = templateSelector;
    this._handleCardClick = handleCardClick;
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

    this._setEventListeners();

    this._element.querySelector('.place__name').textContent = this._title;
    this._photo.src = this._link;
    this._photo.alt = this._link;

    return this._element;
  }

  _handleLikeCard() {
    this._buttonLike.classList.toggle('place__like_active');
  }

  _handleDeleteCard() {
    this._element.remove();
    this._element = null;
  }

  _setEventListeners() {
    this._buttonLike.addEventListener('click', () => {
      this._handleLikeCard();
    });

    this._buttonDelete.addEventListener('click', () => {
      this._handleDeleteCard();
    });

    this._photo.addEventListener('click', () => {
      this._handleCardClick(this._title, this._link);
    });
  }
}

 //exporting into index.js
 export { Card }
