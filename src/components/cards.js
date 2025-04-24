import * as api from "./api.js";
//Темплейт карточки initialCards
const cardTemplate = document.querySelector("#card-template").content;
export const renderCards = (cardList,cards, cardPopup, showCard, ownerId) => {
  let isOwner = false;
  let isLiked = false;

  cards.forEach((item) => {
    if (ownerId === item.owner._id) isOwner = true;
    else isOwner = false;
    isLiked = item.likes.some((like) => like._id === ownerId);
    cardList.append(
      createCard(
        item,
        deleteCard,
        likeCard,
        cardPopup,
        showCard,
        isOwner,
        api.deleteCard,
        api.likeCard,
        api.unlikeCard,
        isLiked
      )
    );
  });
};
//Функция создания карточки
export function createCard(
  card,
  deleteFunction,
  likeFunction,
  popup,
  showFunction,
  isOwner,
  apiDeleteFunction,
  apiLikeFunction,
  apiUnLikeFunction,
  isLiked
) {
  const cardElement = cardTemplate.querySelector(".card").cloneNode(true);
  const cardImage = cardElement.querySelector(".card__image");
  cardImage.src = card.link;
  cardImage.alt = card.name;

  cardImage.addEventListener("click", () => showFunction(card, popup));
  cardElement.querySelector(".card__title").textContent = card.name;
  cardElement.id = card._id;
  const deleteButton = cardElement.querySelector(".card__delete-button");
  if (isOwner) {
    deleteButton.addEventListener("click", () =>
      deleteFunction(cardElement, apiDeleteFunction)
    );
    deleteButton.classList.remove("hidden");
  }

  const likeButton = cardElement.querySelector(".card__like-button");
  if (isLiked) {
    likeButton.classList.add("card__like-button_is-active");
  }
  likeButton.addEventListener("click", () =>
    likeFunction(cardElement, apiLikeFunction, apiUnLikeFunction)
  );
  let likesCount=0;
  if(card.likes != null) likesCount=card.likes.length
  setLikeCounts(cardElement, likesCount);
  return cardElement;
}
//Функция удаления карточки
export function deleteCard(cardElement, apiDeleteFunction) {
  apiDeleteFunction(cardElement.id).then(t=>{cardElement.remove();});
}
//Функция лайка карточки
export function likeCard(cardElement, apiLikeFunction, apiUnLikeFunction) {
  const likeButton = cardElement.querySelector(".card__like-button");
  if (likeButton.classList.contains("card__like-button_is-active")) {
    
    apiUnLikeFunction(cardElement.id).then((t) => {
      setLikeCounts(cardElement, t.likes.length).then(()=>{
        likeButton.classList.remove("card__like-button_is-active");
      }).catch((error) => {
        console.error("Error:", error);
      });
      
    });
  } else {
    
    apiLikeFunction(cardElement.id).then((t) => {
      setLikeCounts(cardElement, t.likes.length).then(()=>{
        likeButton.classList.add("card__like-button_is-active");
      }).catch((error) => {
        console.error("Error:", error);
      });
    });
  }
}
function setLikeCounts(cardElement, likes) {
  const cardLikesCount = cardElement.querySelector(".card__likes-count");
  cardLikesCount.textContent = likes;
}
