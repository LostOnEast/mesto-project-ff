import {initialCards, renderCards, insertCard} from './components/cards.js';
import {showPopup, closePopup} from './components/modal.js';
import './components/modal.js';
import './index.css';

//DOM узлы
const cardList = document.querySelector(".places__list");
const profileEditButton = document.querySelector(".profile__edit-button");
const popupTypeEdit = document.querySelector(".popup_type_edit");
const popupTypeEditCloseButton = document.querySelector(".popup_type_edit .popup__close");
const profileAddButton = document.querySelector(".profile__add-button");
const popupAddCloseButton = document.querySelector(".popup_type_new-card .popup__close");
const popupImageCloseButton = document.querySelector(".popup_type_image .popup__close");
const popupTypeNewCard = document.querySelector(".popup_type_new-card");
const popupTypeImage = document.querySelector(".popup_type_image");
const profileTitle = document.querySelector(".profile__title");
const profileDescription = document.querySelector(".profile__description");
const formEditProfile = document.forms["edit-profile"];
const formInputProfileName = document.querySelector(".popup__input_type_name");
const formInputProfileDescription = document.querySelector(".popup__input_type_description");
const formNewPlace = document.forms["new-place"];
const formInputPlaceName = document.querySelector(".popup__input_type_card-name");
const formInputPlaceImgLink = document.querySelector(".popup__input_type_url");


function handleFormSubmit(evt) {
    evt.preventDefault(); 
    profileTitle.textContent=formInputProfileName.value;
    profileDescription.textContent=formInputProfileDescription.value;
    closePopup(popupTypeEdit);
}
formEditProfile.addEventListener('submit', handleFormSubmit);

profileEditButton.addEventListener('click', (evt) => {
  formEditProfile.elements.name.value=profileTitle.textContent;
  formEditProfile.elements.description.value=profileDescription.textContent;
  showPopup(popupTypeEdit);
});
function handleFormNewPlaceSubmit(evt) {
    evt.preventDefault(); 
    let addingCard = {
      name: formInputPlaceName.value,
      link: formInputPlaceImgLink.value
    }
    initialCards.unshift(addingCard);
    insertCard(addingCard, cardList,popupTypeImage);   
    closePopup(popupTypeNewCard);
    formNewPlace.reset();
}
formNewPlace.addEventListener('submit', handleFormNewPlaceSubmit);

profileAddButton.addEventListener('click', (evt) => { showPopup(popupTypeNewCard);});
// Закрытие по нажатию Esc
document.addEventListener('keydown', (evt) => {
  console.log(evt.currentTarget)
  if (evt.key === 'Escape') {
    const activePopup = document.querySelector('.popup_is-opened');
    closePopup(activePopup);
  }
});
// Закрытие по клику вне popup
popupTypeEdit.addEventListener('click', (evt) => {  
  closePopup(evt.target);
});
popupTypeNewCard.addEventListener('click', (evt) => {
  closePopup(evt.target);
});
popupTypeImage.addEventListener('click', (evt) => {
  closePopup(evt.target);
});
// Закрытие по клику popupClose
popupTypeEditCloseButton.addEventListener('click', (evt) => {
  closePopup(popupTypeEdit); 
});
popupAddCloseButton.addEventListener('click', (evt) => {
  closePopup(popupTypeNewCard); 
});
popupImageCloseButton.addEventListener('click', (evt) => {
  closePopup(popupTypeImage); 
});
renderCards(cardList,popupTypeImage);
