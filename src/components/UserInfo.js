class UserInfo {
  constructor({ usermameSelector, aboutUserSelector }) {
    this._name = document.querySelector(usermameSelector);
    this._about = document.querySelector(aboutUserSelector);
  }

  getUserInfo() {
    return {
      name: this._name.textContent,
      about: this._about.textContent
    };
  }

  setUserInfo({ name, about }) {
    this._name.textContent = name;
    this._about.textContent = about;
  }
}

//exporting into index.js
export { UserInfo };
