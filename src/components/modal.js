export function showPopup(element){
  element.classList.add('popup_is-opened');  
  // element.classList.add('popup_is-animated');  
  
}
export function closePopup(element){
  element.classList.add('popup_is-opened');  
  element.classList.remove('popup_is-opened');
    
}