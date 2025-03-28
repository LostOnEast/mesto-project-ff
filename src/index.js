import {initialCards} from './scripts/cards.js';
import './index.css';
//Темплейт карточки initialCards
const cardTemplate = document.querySelector("#card-template").content;
//DOM узлы
const cardList = document.querySelector(".places__list");
//Функция создания карточки
function createCard(card, deleteFunction) {
  let cardElement = cardTemplate.querySelector(".card").cloneNode(true);
  cardElement.querySelector(".card__image").src = card.link;
  cardElement.querySelector(".card__image").alt = card.name;
  cardElement.querySelector(".card__title").textContent = card.name;
  let deleteButton = cardElement.querySelector(".card__delete-button");
  deleteButton.addEventListener("click", () => deleteCard(cardElement));
  return cardElement;
}
//Функция удаления карточки
function deleteCard(cardElement) {
  cardElement.remove();
}
//Вывести карточки на страницу
function renderCards() {
  initialCards.forEach((item) => cardList.append(createCard(item, deleteCard)));
}
renderCards();