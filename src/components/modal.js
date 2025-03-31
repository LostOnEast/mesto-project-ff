export function showPopup(element) {
  element.classList.add("popup_is-opened");
}
export function closePopup(element) {
  element.classList.add("popup_is-opened");
  element.classList.remove("popup_is-opened");
}
export function closePopupEsc(evt) {
  if (evt.key === "Escape") {
    const activePopup = document.querySelector(".popup_is-opened");
    closePopup(activePopup);
  }
}
