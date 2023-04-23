import { Popup } from './Popup.js';

class PopupWithConfirmation extends Popup {
  constructor(popup, handleDeleteCard) {
    super(popup);
    this._confrimButton = this._popup.querySelector('.popup__button');
    this._handleDeleteCard = handleDeleteCard;
  }

  setData(card) {
    return (this._card = card);
  }

  setEventListeners() {
    super.setEventListeners();
    this._confrimButton.addEventListener('click', () => {
      this._handleDeleteCard(this._card);
    });
  }
}

//exporting into index.js
export { PopupWithConfirmation };
