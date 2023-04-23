class UserInfo {
  constructor({ usermameSelector, aboutUserSelector, avatarSelector }) {
    this._name = document.querySelector(usermameSelector);
    this._about = document.querySelector(aboutUserSelector);
    this._avatar = document.querySelector(avatarSelector);
  }

  getUserInfo() {
    return {
      name: this._name.textContent,
      about: this._about.textContent
    };
  }

  setUserInfo(res) {
    this._name.textContent = res.name;
    this._about.textContent = res.about;
    this._avatar.src = res.avatar;
    this._id = res._id;
  }
}

//exporting into index.js
export { UserInfo };
