class Section {
  constructor({ renderer }, container ) {
    this._renderer = renderer;
    this._container = container;
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
