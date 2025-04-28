import { createCard, deleteCard, likeCard } from "./components/cards.js";
import { showPopup, closePopup, handleEscape } from "./components/modal.js";
import * as validation from "./components/validation.js";
import "./components/modal.js";
import "./index.css";
import * as api from "./components/api.js";
import * as dom from "./components/dom.js";

//DOM узлы
const cardList = document.querySelector(".places__list");
const profileEditButton = document.querySelector(".profile__edit-button");
const popupTypeEdit = document.querySelector(".popup_type_edit");
const profileAddButton = document.querySelector(".profile__add-button");
const popupTypeNewCard = document.querySelector(".popup_type_new-card");
const popupTypeImage = document.querySelector(".popup_type_image");
const popupTypeNewAvatar = document.querySelector(".popup_type_new-avatar");
const avatarEditButton = document.querySelector(".avatar__edit-button");
const formInputAvatarImgLink = document.querySelector(
  ".popup__input_type_url-avatar"
);
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
const formEditAvatar = document.forms["new-avatar"];
const formInputPlaceImgLink = document.querySelector(".popup__input_type_url");
const cardImage = document.querySelector(".popup__image");
const cardCaption = document.querySelector(".popup__caption");
const popups = document.querySelectorAll(".popup");
const validationConfig = {
  formSelector: ".popup__form",
  inputSelector: ".popup__input",
  submitButtonSelector: ".popup__button",
  inactiveButtonClass: "popup__button_disabled",
  inputErrorClass: "popup__input_type_error",
  errorClass: "popup__error_visible",
};
//Зависимые промисы

const promises = [api.getUserInfo(), api.getInitialCards()];
Promise.all(promises)
  .then(([user, cards]) => {
    setUserInfo(user);
    renderCards(cardList, cards, showCard, user._id);
  })
  .catch((error) => {
    console.error("Error:", error);
  });
//Включение валидации
validation.enableValidation(validationConfig);
const setUserInfo = (userInfo) => {
  dom.profileImageElement.style.backgroundImage = `url("${userInfo.avatar}")`;
  dom.profileTitle.textContent = userInfo.name;
  dom.profileDescription.textContent = userInfo.about;
};

function handleProfileFormSubmit(evt) {
  evt.preventDefault();

  renderLoading(true, evt.submitter);
  api
    .patchUserInfo(
      formInputProfileName.value,
      formInputProfileDescription.value
    )
    .then((profile) => {
      closePopup(popupTypeEdit);
      profileTitle.textContent = profile.name;
      profileDescription.textContent = profile.about;
    })

    .finally(() => {
      renderLoading(false, evt.submitter);
    })
    .catch((err) => {
      console.error("Error:", error);
    });
}
formEditProfile.addEventListener("submit", handleProfileFormSubmit);

profileEditButton.addEventListener("click", (evt) => {
  formEditProfile.elements.name.value = profileTitle.textContent;
  formEditProfile.elements.description.value = profileDescription.textContent;
  validation.clearValidation(formEditProfile, validationConfig);
  showPopup(popupTypeEdit);
});
function handleFormNewPlaceSubmit(evt) {
  evt.preventDefault();
  api
    .postCard(formInputPlaceName.value, formInputPlaceImgLink.value)
    .then((card) => {
      cardList.prepend(
        createCard(
          card,
          deleteCard,
          likeCard,
          showCard,
          card.owner._id,
          api.deleteCard,
          api.likeCard,
          api.unlikeCard
        )
      );
      closePopup(popupTypeNewCard);
      formNewPlace.reset();
    })
    .catch((err) => {
      console.error("Error:", err);
    });
  
}
formNewPlace.addEventListener("submit", handleFormNewPlaceSubmit);
profileAddButton.addEventListener("click", (evt) => {
  validation.clearValidation(popupTypeNewCard, validationConfig);
  showPopup(popupTypeNewCard);
});
formEditAvatar.addEventListener("submit", handleFormEditAvatarSubmit);
avatarEditButton.addEventListener("click", (evt) => {
  showPopup(popupTypeNewAvatar);
});
function handleFormEditAvatarSubmit(evt) {
  evt.preventDefault();
  renderLoading(true, evt.submitter);
  api
    .patchUserAvatar(formInputAvatarImgLink.value)
    .then((userInfo) => {
      setUserInfo(userInfo);
      formEditAvatar.reset();
      closePopup(popupTypeNewAvatar);
    })
    .finally(renderLoading(false, evt.submitter))
    .catch((err) => {
      console.error("Error:", err);
    });
}
// Закрытие по клику вне popup
popups.forEach((popup) => {
  popup.addEventListener("click", (evt) => {
    if (evt.target.classList.contains("popup_is-opened")) {
      closePopup(popup);
    }
    if (evt.target.classList.contains("popup__close")) {
      closePopup(popup);
    }
  });
});
//Функция отображения карточки
const showCard = (cardElement) => {
  cardImage.src = cardElement.link;
  cardImage.alt = cardElement.name;
  cardCaption.textContent = cardElement.name;
  showPopup(popupTypeImage);
};
const renderCards = (cardList, cards, showCard, ownerId) => {
  cards.forEach((item) => {
    cardList.append(
      createCard(
        item,
        deleteCard,
        likeCard,
        showCard,
        ownerId,
        api.deleteCard,
        api.likeCard,
        api.unlikeCard
      )
    );
  });
};
function renderLoading(isLoading, loadingElement) {
  if (isLoading) {
    loadingElement.textContent = "Сохранение...";
  } else {
    loadingElement.textContent = "Сохранить";
  }
}
