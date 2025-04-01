export function showPopup(element) {
  element.classList.add("popup_is-opened");
  document.addEventListener("keydown", handleEscape);
}
export function closePopup(element) {
  element.classList.add("popup_is-opened");
  element.classList.remove("popup_is-opened");
  document.removeEventListener('keydown', handleEscape); 
}
export function handleEscape(evt) {
  if (evt.key === 'Escape') {
    const openedPopup = document.querySelector('.popup_is-opened');
    closePopup(openedPopup);
  }
}
