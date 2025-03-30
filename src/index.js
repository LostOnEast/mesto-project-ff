import {initialCards} from './scripts/cards.js';
import './scripts/modal.js';
import './index.css';
//Темплейт карточки initialCards
const cardTemplate = document.querySelector("#card-template").content;
//DOM узлы
const cardList = document.querySelector(".places__list");
const profile__edit_button = document.querySelector(".profile__edit-button");
const popup_type_edit = document.querySelector(".popup_type_edit");
const profile__add_button = document.querySelector(".profile__add-button");
const popup_type_new_card = document.querySelector(".popup_type_new-card");
const popup_type_image = document.querySelector(".popup_type_image");
const popup__set = document.querySelectorAll(".popup");
const popup__image = document.querySelector(".popup__image");


profile__edit_button.addEventListener('click', (evt) => {
  popup_type_edit.style.display = 'flex';  
});
profile__add_button.addEventListener('click', (evt) => {
  popup_type_new_card.style.display = 'flex';  
});
document.addEventListener('click', (event) => {
  const clickedElement = event.target.closest('.card__image');  
  if (clickedElement) {
    popup__image.src=clickedElement.src;
    popup__image.alt=clickedElement.alt;
    popup_type_image.style.display = 'flex'; 
    return;
  }
  const clickedElementClose = event.target.closest('.popup__close');  
  if (clickedElementClose) {
    closePopups();
    return;
  }
});
document.addEventListener('keydown', (event) => {
  if (event.key === 'Escape') {
    closePopups();
  }
});
// Закрытие по клику вне popup
popup_type_edit.addEventListener('click', (e) => {
  if (e.target === popup_type_edit) {
    popup_type_edit.style.display = 'none';
  }
});
popup_type_new_card.addEventListener('click', (e) => {
  if (e.target === popup_type_new_card) {
    popup_type_new_card.style.display = 'none';
  }
});
popup_type_image.addEventListener('click', (e) => {
  if (e.target === popup_type_image) {
    popup_type_image.style.display = 'none';
  }
});
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
//
function closePopups(){
  popup__set.forEach(element => {
    element.style.display = 'none'; 
  });
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
