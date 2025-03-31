import { showPopup } from "./modal";
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
    }
];
//Функция создания карточки
function createCard(card, deleteFunction, likeFunction, popup, showFunction) {
  let cardElement = cardTemplate.querySelector(".card").cloneNode(true);
  let cardImage = cardElement.querySelector(".card__image");
  cardImage.src = card.link;
  cardImage.alt = card.name;
  
  cardImage.addEventListener("click", () => showFunction(card,popup));
  cardElement.querySelector(".card__title").textContent = card.name;
  let deleteButton = cardElement.querySelector(".card__delete-button");
  deleteButton.addEventListener("click", () => deleteFunction(cardElement));
  let likeButton = cardElement.querySelector(".card__like-button");
  likeButton.addEventListener("click", () => likeFunction(cardElement));  
  return cardElement;
}
//Функция удаления карточки
function deleteCard(cardElement) {
  cardElement.remove();
}
//Функция лайка карточки
function likeCard(cardElement) {
  cardElement.querySelector('.card__like-button').classList.toggle('card__like-button_is-active');
}
//Функция отображения карточки
function showCard(cardElement,popup) {
  console.log(cardElement.name);
  let cardImage = popup.querySelector('.popup__image')
  let cardCaption = popup.querySelector('.popup__caption')
  cardImage.src=cardElement.link;
  cardImage.alt=cardElement.name;
  cardCaption.textContent=cardElement.name;
  showPopup(popup);
}
//Вывести карточки на страницу
export function renderCards(cardList, cardPopup) {
  initialCards.forEach((item) => cardList.append(createCard(item, deleteCard, likeCard, cardPopup, showCard)));
}
export function insertCard(newCard, cardList, cardPopup) {
  cardList.prepend(createCard(newCard, deleteCard, likeCard, cardPopup, showCard)); 
}