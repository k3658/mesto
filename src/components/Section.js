class Section {
  constructor({ renderer }, containerSelector ) {
    this._renderer = renderer;
    this._container = containerSelector;
  }

  addItem(item) {
    this._container.prepend(item);
  }

  renderer(userId, item) {
    item.forEach(item => {
      this._renderer(userId, item);
    });
  }
}

//exporting into index.js
export { Section };
