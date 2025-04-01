import { initialCards, createCard, deleteCard, likeCard } from "./components/cards.js";
import { showPopup, closePopup, handleEscape } from "./components/modal.js";
import "./components/modal.js";
import "./index.css";

//DOM узлы
const cardList = document.querySelector(".places__list");
const profileEditButton = document.querySelector(".profile__edit-button");
const popupTypeEdit = document.querySelector(".popup_type_edit");
const profileAddButton = document.querySelector(".profile__add-button");
const popupTypeNewCard = document.querySelector(".popup_type_new-card");
const popupTypeImage = document.querySelector(".popup_type_image");
const profileTitle = document.querySelector(".profile__title");
const profileDescription = document.querySelector(".profile__description");
const formEditProfile = document.forms["edit-profile"];
const formInputProfileName = document.querySelector(".popup__input_type_name");
const formInputProfileDescription = document.querySelector(
  ".popup__input_type_description"
);
const formNewPlace = document.forms["new-place"];
const formInputPlaceName = document.querySelector(
  ".popup__input_type_card-name"
);
const formInputPlaceImgLink = document.querySelector(".popup__input_type_url");
const cardImage = document.querySelector(".popup__image");
const cardCaption = document.querySelector(".popup__caption");
const popups = document.querySelectorAll('.popup')

function handleProfileFormSubmit(evt) {
  evt.preventDefault();
  profileTitle.textContent = formInputProfileName.value;
  profileDescription.textContent = formInputProfileDescription.value;
  closePopup(popupTypeEdit);
}
formEditProfile.addEventListener("submit", handleProfileFormSubmit);

profileEditButton.addEventListener("click", (evt) => {
  formEditProfile.elements.name.value = profileTitle.textContent;
  formEditProfile.elements.description.value = profileDescription.textContent;
  showPopup(popupTypeEdit);
});
function handleFormNewPlaceSubmit(evt) {
  evt.preventDefault();
  let addingCard = {
    name: formInputPlaceName.value,
    link: formInputPlaceImgLink.value,
  };
  
  insertCard(addingCard, cardList, popupTypeImage);
  closePopup(popupTypeNewCard);
  formNewPlace.reset();
}
formNewPlace.addEventListener("submit", handleFormNewPlaceSubmit);
profileAddButton.addEventListener("click", (evt) => {
  showPopup(popupTypeNewCard);
});

// Закрытие по клику вне popup
popups.forEach((popup) => {
  popup.addEventListener('mousedown', (evt) => {
      if (evt.target.classList.contains('popup_is-opened')) {
        closePopup(popup)
      }
      if (evt.target.classList.contains('popup__close')) {
        closePopup(popup)
      }
  })
}) 

//Функция отображения карточки
function showCard(cardElement, popup) {  
  cardImage.src = cardElement.link;
  cardImage.alt = cardElement.name;
  cardCaption.textContent = cardElement.name;
  showPopup(popup);
}
//Вывести карточки на страницу
function renderCards(cardList, cardPopup) {
  initialCards.forEach((item) =>
    cardList.append(createCard(item, deleteCard, likeCard, cardPopup, showCard))
  );
}
function insertCard(newCard, cardList, cardPopup) {
  cardList.prepend(
    createCard(newCard, deleteCard, likeCard, cardPopup, showCard)
  );
}
renderCards(cardList, popupTypeImage);
