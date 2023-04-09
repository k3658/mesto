class Popup {
  constructor(popup) {
    this._popup = popup;
    this._closeButton = this._popup.querySelector('.popup__close');
    this._handleEscClose = this._handleEscClose.bind(this);
  }

  open() {
    this._popup.classList.add('popup_opened');
    document.addEventListener('keydown', this._handleEscClose);
  }

  close() {
    this._popup.classList.remove('popup_opened');
    document.removeEventListener('keydown', this._handleEscClose);
  }

  _handleEscClose(evt) {
    if (evt.key === 'Escape') {
      this.close();
    };
  }

  _handleOverlayClickClose(evt) {
    if (evt.target === evt.currentTarget) {
      this.close();
    };
  }

  setEventListeners() {
    this._closeButton.addEventListener('click', () => {
      this.close();
    });

    this._popup.addEventListener('click', (evt) => {
      this._handleOverlayClickClose(evt);
    });
  }
}

//exporting into index.js, popupWithImage.js,
export { Popup };
