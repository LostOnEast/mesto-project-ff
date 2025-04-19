const config = {
  baseUrl: 'https://nomoreparties.co/v1/wff-cohort-36',
  cohortId: 'wff-cohort-36',
  headers: {
    authorization: '1089f9d3-323c-4c1b-a69f-dde30c5f1d4a',
    'Content-Type': 'application/json'
  }
}
export const getUserInfo = () => {
  return fetch(`${config.baseUrl}/users/me`, {
    headers: config.headers
  })
    .then(res => {
      if (res.ok) {        
        return res.json();
      }
      // если ошибка, отклоняем промис
      return Promise.reject(`Ошибка: ${res.status}`);
    })
    .catch(err=>{
      console.log(err);
    });
}
export const patchUserInfo = (newName,newAbout) => {
  return fetch(`${config.baseUrl}/users/me`, {
    method: 'PATCH',
    headers: config.headers,
    body: JSON.stringify({
      name: newName,
      about: newAbout
    })
  },
)
    .then(res => {
      if (res.ok) {        
        return res.json();
      }
      // если ошибка, отклоняем промис
      return Promise.reject(`Ошибка: ${res.status}`);
    })
    .catch(err=>{
      console.log(err);
    });
}
export const patchUserAvatar = (avatarLink) => {
  return fetch(`${config.baseUrl}/users/me/avatar`, {
    method: 'PATCH',
    headers: config.headers,
    body: JSON.stringify({
      avatar: avatarLink
    })
  },
)
    .then(res => {
      if (res.ok) {        
        return res.json();
      }
      // если ошибка, отклоняем промис
      return Promise.reject(`Ошибка: ${res.status}`);
    })
    .catch(err=>{
      console.log(err);
    });
}

export const getInitialCards = () => {
  return fetch(`${config.baseUrl}/cards`, {
    headers: config.headers
  })
    .then(res => {
      if (res.ok) {
        
        return res.json();
      }
      return Promise.reject(`Ошибка: ${res.status}`);
    })
    .then(res=>{
      return res;
    })
    .catch(err=>{
      console.log(err);
    });
}
export const postCard = (name,link) => {
  return fetch(`${config.baseUrl}/cards`, {
    method: 'POST',
    headers: config.headers,
    body: JSON.stringify({
      name,
      link
    })
  },
)
    .then(res => {
      if (res.ok) {        
        return res.json();
      }
      // если ошибка, отклоняем промис
      return Promise.reject(`Ошибка: ${res.status}`);
    })
    .catch(err=>{
      console.log(err);
    });
}
export const deleteCard = (cardId) => {
  return fetch(`${config.baseUrl}/cards/${cardId}`, {
    method: 'DELETE',
    headers: config.headers
  },
)
    .then(res => {
      if (res.ok) {        
        return res.json();
      }
      // если ошибка, отклоняем промис
      return Promise.reject(`Ошибка: ${res.status}`);
    })
    .catch(err=>{
      console.log(err);
    });
}
export const likeCard = (cardId) => {
  console.log('likeCard');
  return fetch(`${config.baseUrl}/cards/likes/${cardId}`, {
    method: 'PUT',
    headers: config.headers
  },
)
    .then(res => {
      if (res.ok) {        
        return res.json();
      }
      // если ошибка, отклоняем промис
      return Promise.reject(`Ошибка: ${res.status}`);
    })
    .catch(err=>{
      console.log(err);
    });
}
export const unlikeCard = (cardId) => {
  return fetch(`${config.baseUrl}/cards/likes/${cardId}`, {
    method: 'DELETE',
    headers: config.headers
  },
)
    .then(res => {
      if (res.ok) {        
        return res.json();
      }
      // если ошибка, отклоняем промис
      return Promise.reject(`Ошибка: ${res.status}`);
    })
    .catch(err=>{
      console.log(err);
    });
}