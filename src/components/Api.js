class Api {
  constructor(settings) {
    this._settings = settings;
  }

  _statusCheck(res) {
    if (res.ok) {
      return res.json();
    }

    return Promise.reject(`Ошибка: ${res.status}`);
  }

  getUserData() {
    return fetch('https://mesto.nomoreparties.co/v1/cohort-64/users/me', {
      headers: {
        authorization: '0f03367f-2da2-4dcf-b5ff-2d3e57bc8d8b'
      }
    })
    .then(this._statusCheck);
  }

  setUserData(data) {
    return fetch('https://mesto.nomoreparties.co/v1/cohort-64/users/me', {
      method: 'PATCH',
      headers: {
        authorization: '0f03367f-2da2-4dcf-b5ff-2d3e57bc8d8b',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        name: data.name,
        about: data.about
      })
    })
    .then(this._statusCheck);
  }

  updateAvatar(data) {
    return fetch('https://mesto.nomoreparties.co/v1/cohort-64/users/me/avatar', {
      method: 'PATCH',
      headers: {
        authorization: '0f03367f-2da2-4dcf-b5ff-2d3e57bc8d8b',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        avatar: data.avatar
      })
    })
    .then(this._statusCheck);
  }

  getInitialCards() {
    return fetch('https://mesto.nomoreparties.co/v1/cohort-64/cards', {
      headers: {
        authorization: '0f03367f-2da2-4dcf-b5ff-2d3e57bc8d8b'
      }
    })
    .then(this._statusCheck);
  }

  postNewCard(item) {
    return fetch('https://mesto.nomoreparties.co/v1/cohort-64/cards', {
      method: 'POST',
      headers: {
        authorization: '0f03367f-2da2-4dcf-b5ff-2d3e57bc8d8b',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        name: item.title,
        link: item.link
      })
    })
    .then(this._statusCheck);
  }

  deleteCard(cardId) {
    return fetch(`https://mesto.nomoreparties.co/v1/cohort-64/cards/${cardId}`, {
      method: 'DELETE',
      headers: {
        authorization: '0f03367f-2da2-4dcf-b5ff-2d3e57bc8d8b'
      }
    })
    .then(this._statusCheck);
  }

  likeCard(cardId) {
    return fetch(`https://mesto.nomoreparties.co/v1/cohort-64/cards/${cardId}/likes`, {
      method: 'PUT',
      headers: {
        authorization: '0f03367f-2da2-4dcf-b5ff-2d3e57bc8d8b'
      }
    })
    .then(this._statusCheck);
  }

  removeLike(cardId) {
    return fetch(`https://mesto.nomoreparties.co/v1/cohort-64/cards/${cardId}/likes`, {
      method: 'DELETE',
      headers: {
        authorization: '0f03367f-2da2-4dcf-b5ff-2d3e57bc8d8b'
      }
    })
    .then(this._statusCheck);
  }
}

//exporting into index.js
export const api = new Api({
  baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-64',
  headers: {
    authorization: '0f03367f-2da2-4dcf-b5ff-2d3e57bc8d8b',
    'Content-Type': 'application/json'
  }
})
