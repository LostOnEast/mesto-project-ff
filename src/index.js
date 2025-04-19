import { initialCards, createCard, deleteCard, likeCard } from "./components/cards.js";
import { showPopup, closePopup, handleEscape } from "./components/modal.js";
import * as validation from "./components/validation.js"
import "./components/modal.js";
import "./index.css";
import * as api from "./components/api.js"
import * as dom from "./components/dom.js"

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
const validationConfig={ 
  
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button',
  inactiveButtonClass: 'popup__button_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__error_visible'
};
//Зависимые промисы
const promises = [api.getUserInfo(), api.getInitialCards()];
Promise.all(promises)
  .then(([user, cards]) => {
   
    setUserInfo(user);
    renderCards(cards, popupTypeImage, user._id);
    
  })
  .catch((error) => {
    console.error('Error:', error);
  });
//Включение валидации
validation.enableValidation(validationConfig); 
// setUserInfo();

const setUserInfo=(userInfo)=>{
    dom.profileImageElement.style.backgroundImage = `url("${userInfo.avatar}")`;
    dom.profileTitle.textContent=userInfo.name;
    dom.profileDescription.textContent=userInfo.about;  
}
const renderCards=(cards, cardPopup, ownerId)=>{
  let isOwner=false;
  let isLiked=false;
  
  cards.forEach((item) =>{
    if(ownerId===item.owner._id) isOwner=true;
    else isOwner=false;
    isLiked = item.likes.some(like => like._id === ownerId);
    cardList.append(createCard(item, deleteCard, likeCard, cardPopup, showCard, isOwner, api.deleteCard, api.likeCard, api.unlikeCard, isLiked))
  }    
  );
}
function handleProfileFormSubmit(evt) {
  evt.preventDefault();
  profileTitle.textContent = formInputProfileName.value;
  profileDescription.textContent = formInputProfileDescription.value;
  api.patchUserInfo(formInputProfileName.value,formInputProfileDescription.value)
  closePopup(popupTypeEdit);
}
formEditProfile.addEventListener("submit", handleProfileFormSubmit);

profileEditButton.addEventListener("click", (evt) => {
  formEditProfile.elements.name.value = profileTitle.textContent;
  formEditProfile.elements.description.value = profileDescription.textContent;
  validation.clearValidation(formEditProfile,validationConfig);
  showPopup(popupTypeEdit);
});
function handleFormNewPlaceSubmit(evt) {
  evt.preventDefault();
  const addingCard = {
    name: formInputPlaceName.value,
    link: formInputPlaceImgLink.value,
  };
  
  insertCard(addingCard, cardList, popupTypeImage);
  closePopup(popupTypeNewCard);
  formNewPlace.reset();
  validation.clearValidation(formNewPlace, validationConfig);
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
function insertCard(newCard, cardList, cardPopup) {
  let refreshedCard=api.postCard(newCard.name, newCard.link);
  cardList.prepend(
    createCard(refreshedCard, deleteCard, likeCard, cardPopup, showCard, true, false)
  );
}

