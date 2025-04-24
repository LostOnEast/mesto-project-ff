const config = {
  baseUrl: "https://nomoreparties.co/v1/wff-cohort-36",
  cohortId: "wff-cohort-36",
  headers: {
    authorization: "1089f9d3-323c-4c1b-a69f-dde30c5f1d4a",
    "Content-Type": "application/json",
  },
};

function getResponseData(res) {
  if (res.ok) return res.json();
  return res.json().then(err => Promise.reject(err));
}
export const getUserInfo = () => {
  return fetch(`${config.baseUrl}/users/me`, {
    headers: config.headers
  }).then(getResponseData);
};
export const patchUserInfo = (newName, newAbout) => {
  return fetch(`${config.baseUrl}/users/me`, {
    method: "PATCH",
    headers: config.headers,
    body: JSON.stringify({
      name: newName,
      about: newAbout,
    }),
  }).then(getResponseData);
};
export const patchUserAvatar = (avatarLink) => {
  return fetch(`${config.baseUrl}/users/me/avatar`, {
    method: "PATCH",
    headers: config.headers,
    body: JSON.stringify({
      avatar: avatarLink,
    }),
  }).then(getResponseData);
};

export const getInitialCards = () => {
  return fetch(`${config.baseUrl}/cards`, {
    headers: config.headers,
  })
  .then(getResponseData);
};
export const postCard = (name, link) => {
  return fetch(`${config.baseUrl}/cards`, {
    method: "POST",
    headers: config.headers,
    body: JSON.stringify({
      name,
      link,
    }),
  }).then(getResponseData);
};
export const deleteCard = (cardId) => {
  return fetch(`${config.baseUrl}/cards/${cardId}`, {
    method: "DELETE",
    headers: config.headers,
  }).then(getResponseData);
};
export const likeCard = (cardId) => {
  return fetch(`${config.baseUrl}/cards/likes/${cardId}`, {
    method: "PUT",
    headers: config.headers,
  }).then(getResponseData);
};
export const unlikeCard = (cardId) => {
  return fetch(`${config.baseUrl}/cards/likes/${cardId}`, {
    method: "DELETE",
    headers: config.headers,
  }).then(getResponseData);
};
