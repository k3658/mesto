import { Popup } from './Popup.js';

class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
    this._fullPhoto = this._popup.querySelector('.popup__photo');
    this._fullPhotoCaption = this._popup.querySelector('.popup__caption');
  }

  open(title, link) {
    super.open();

    this._fullPhoto.src = link;
    this._fullPhoto.alt = title;
    this._fullPhotoCaption.textContent = title;
  };
}

//exporting into index.js
export { PopupWithImage };
