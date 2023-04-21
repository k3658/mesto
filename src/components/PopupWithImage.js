import { Popup } from './Popup.js';

class PopupWithImage extends Popup {
  constructor(popup) {
    super(popup);
    this._fullPhoto = this._popup.querySelector('.popup__photo');
    this._fullPhotoCaption = this._popup.querySelector('.popup__caption');
  }

  open(name, link) {
    super.open();

    this._fullPhoto.src = link;
    this._fullPhoto.alt = name;
    this._fullPhotoCaption.textContent = name;
  };
}

//exporting into index.js
export { PopupWithImage };
