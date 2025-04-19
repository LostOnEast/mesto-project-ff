const config = {
  baseUrl: 'https://nomoreparties.co/v1/wff-cohort-36',
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
      console.log(res);
      return res;
    })
    .catch(err=>{
      console.log(err);
    });
}