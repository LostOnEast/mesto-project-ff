import * as api from "./api.js";

//Темплейт карточки initialCards
const cardTemplate = document.querySelector("#card-template").content;

//Функция создания карточки
export function createCard(
  card,
  deleteFunction,
  likeFunction,
  showFunction,
  ownerId,
  apiDeleteFunction,
  apiLikeFunction,
  apiUnLikeFunction
) {
  let isOwner = false;
  let isLiked = false;
  if (ownerId === card.owner._id) isOwner = true;
  isLiked = card.likes.some((like) => like._id === ownerId);
  const cardElement = cardTemplate.querySelector(".card").cloneNode(true);
  const cardImage = cardElement.querySelector(".card__image");
  cardImage.src = card.link;
  cardImage.alt = card.name;

  cardImage.addEventListener("click", () => showFunction(card));
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
  setLikeCounts(cardElement, card.likes.length);
  return cardElement;
}
//Функция удаления карточки
export function deleteCard(cardElement, apiDeleteFunction) {
  apiDeleteFunction(cardElement.id)
    .then(() => {
      cardElement.remove();
    })
    .catch((error) => {
      console.error("Error:", error);
    });
}
//Функция лайка карточки
export function likeCard(cardElement, apiLikeFunction, apiUnLikeFunction) {
  const likeButton = cardElement.querySelector(".card__like-button");
  if (likeButton.classList.contains("card__like-button_is-active")) {
    apiUnLikeFunction(cardElement.id)
      .then((card) => {
        setLikeCounts(cardElement, card.likes.length);
        likeButton.classList.remove("card__like-button_is-active");
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  } else {
    apiLikeFunction(cardElement.id)
      .then((t) => {
        setLikeCounts(cardElement, t.likes.length);
        likeButton.classList.add("card__like-button_is-active");
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  }
}
function setLikeCounts(cardElement, likes) {
  const cardLikesCount = cardElement.querySelector(".card__likes-count");
  cardLikesCount.textContent = likes;
}
