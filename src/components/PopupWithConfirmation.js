import { Popup } from './Popup.js';

class PopupWithConfirmation extends Popup {
  constructor(popup, handleDeleteCard) {
    super(popup);
    this._confrimButton = this._popup.querySelector('.popup__button');
    this._handleDeleteCard = handleDeleteCard;
  }

  handleConfirmButtonClick(cardElement, id) {
    this._confrimButton.addEventListener('click', () => {
      this._handleDeleteCard(cardElement, id);
    });
  }
}

//exporting into index.js
export { PopupWithConfirmation };
