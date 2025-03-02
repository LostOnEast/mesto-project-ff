//Темплейт карточки initialCards
let cardTemplate=document.querySelector('#card-template').content;

//DOM узлы
let cardList=document.querySelector('.places__list');

//Функция создания карточки
function createCard(card, deleteFunction){
  let cardElement = cardTemplate.querySelector('.card').cloneNode(true);
  cardElement.querySelector('.card__image').src = card.link;
  cardElement.querySelector('.card__title').textContent = card.name;
  let deleteButton = cardElement.querySelector('.card__delete-button');
  deleteButton.addEventListener('click',deleteFunction)
  return cardElement;
}
//Функция удаления карточки
function deleteCard(event) {
  console.log(event.target);
  event.target.parentElement.remove();
}

//Вывести карточки на страницу
function renderCards(){
  initialCards.forEach(item=>
    cardList.append(createCard(item,deleteCard))
  )
}
renderCards();