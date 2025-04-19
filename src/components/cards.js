
import * as api from "./api.js"
//Темплейт карточки initialCards
const cardTemplate = document.querySelector("#card-template").content;
export const initialCards = [
  {
    name: "Архыз",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg",
  },
  {
    name: "Челябинская область",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg",
  },
  {
    name: "Иваново",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg",
  },
  {
    name: "Камчатка",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg",
  },
  {
    name: "Холмогорский район",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg",
  },
  {
    name: "Байкал",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg",
  },
];
//Функция создания карточки
export function createCard(card, deleteFunction, likeFunction, popup, showFunction, isOwner, apiDeleteFunction,apiLikeFunction, apiUnLikeFunction, isLiked) {
  const cardElement = cardTemplate.querySelector(".card").cloneNode(true);
  const cardImage = cardElement.querySelector(".card__image");
  cardImage.src = card.link;
  cardImage.alt = card.name;

  cardImage.addEventListener("click", () => showFunction(card, popup));
  cardElement.querySelector(".card__title").textContent = card.name;
  cardElement.id=card._id;
  const deleteButton = cardElement.querySelector(".card__delete-button");
  if (isOwner){
    deleteButton.addEventListener("click", () => deleteFunction(cardElement, apiDeleteFunction));
    deleteButton.classList.remove('hidden');
  }
  
  
  const likeButton = cardElement.querySelector(".card__like-button");
  if (isLiked) {
    likeButton.classList.add("card__like-button_is-active");
  }
  likeButton.addEventListener("click", () => likeFunction(cardElement,apiLikeFunction, apiUnLikeFunction));
  setLikeCounts(cardElement,card.likes.length);
  return cardElement;
}
//Функция удаления карточки
export function deleteCard(cardElement, apiDeleteFunction) {
  cardElement.remove();
  apiDeleteFunction(cardElement.id);
}
//Функция лайка карточки
export function likeCard(cardElement, apiLikeFunction, apiUnLikeFunction) {
  const likeButton=cardElement.querySelector(".card__like-button"); 
  if(likeButton.classList.contains("card__like-button_is-active")){
    likeButton.classList.remove("card__like-button_is-active");
    apiUnLikeFunction(cardElement.id).then(t=>{
      setLikeCounts(cardElement,t.likes.length);
    });
  }
  else{
    likeButton.classList.add("card__like-button_is-active");
    apiLikeFunction(cardElement.id).then(t=>{
      setLikeCounts(cardElement,t.likes.length);
    });
  }
  
}
function setLikeCounts(cardElement, likes) {
  console.log(likes);
  const cardLikesCount = cardElement.querySelector(".card__likes-count");
  cardLikesCount.textContent=likes;
}



