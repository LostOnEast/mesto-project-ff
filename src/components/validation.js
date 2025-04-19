
export function enableValidation(validationConfig) {
  
  // enableValidation({
  
  //   submitButtonSelector: '.popup__button',
  //   inactiveButtonClass: 'popup__button_disabled',

  // }); 
  // Найдём все формы с указанным классом в DOM,
  // сделаем из них массив методом Array.from
  const formList = Array.from(document.querySelectorAll(validationConfig.formSelector));
  formList.forEach((formElement) => {
    // Для каждой формы вызовем функцию setEventListeners,
    // передав ей элемент формы
    
    setEventListeners(formElement, validationConfig.inputSelector,validationConfig.inputErrorClass, validationConfig.errorClass, validationConfig.submitButtonSelector, validationConfig.inactiveButtonClass);
  });
}
const setEventListeners = (formElement, inputSelector,inputErrorClass, errorClass, submitButtonSelector,inactiveButtonClass) => {
  // Находим все поля внутри формы,
  // сделаем из них массив методом Array.from
  const inputList = Array.from(formElement.querySelectorAll(inputSelector));
  const buttonElement = formElement.querySelector(submitButtonSelector);
  toggleButtonState(inputList, buttonElement,inactiveButtonClass);
  inputList.forEach((inputElement) => {
    // каждому полю добавим обработчик события input
    console.log(formElement)
    inputElement.addEventListener('input', 
      () => {
        isValid(formElement, inputElement,inputErrorClass, errorClass);
        toggleButtonState(inputList, buttonElement,inactiveButtonClass);
      }
    );
  });
}; 
export function clearValidation(formElement, validationConfig) {
  
  const inputList = Array.from(formElement.querySelectorAll(validationConfig.inputSelector));    
  inputList.forEach((inputElement) => {
    inputElement.classList.remove(validationConfig.inputErrorClass);
    const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
    console.log(`.${inputElement.id}-error`);
    console.log(errorElement);
    errorElement.classList.remove(validationConfig.errorClass);
    errorElement.textContent = '';
  });
  const buttonElement = formElement.querySelector(validationConfig.submitButtonSelector);
  toggleButtonState(inputList, buttonElement, validationConfig.inactiveButtonClass);
}

const isValid = (formElement, inputElement,inputErrorClass, errorClass) => {
  if (inputElement.validity.patternMismatch) {
    console.log('Ошибка регулярного выражения');
    inputElement.setCustomValidity(inputElement.dataset.errorMessage);
    showInputError(formElement, inputElement, inputElement.validationMessage,inputErrorClass, errorClass);
  } 
  else {
    inputElement.setCustomValidity("");    
  }

if (!inputElement.validity.valid) {
  showInputError(formElement, inputElement, inputElement.validationMessage);
} else {
  hideInputError(formElement, inputElement);
}
}; 
const showInputError = (formElement, inputElement, errorMessage,inputErrorClass, errorClass) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.add(inputErrorClass);
  errorElement.textContent = errorMessage;
  errorElement.classList.add(errorClass);
};

const hideInputError = (formElement, inputElement, inputErrorClass, errorClass) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.remove(inputErrorClass);
  errorElement.classList.remove(errorClass);
  errorElement.textContent = '';
}; 
const hasInvalidInput = (inputList) => {
  return inputList.some((inputElement) => {
    return !inputElement.validity.valid;
  })
}; 
const toggleButtonState = (inputList, buttonElement,inactiveButtonClass) => {
  if (hasInvalidInput(inputList)) {
    console.log('сделай кнопку неактивной');
    console.log(buttonElement);
    buttonElement.disabled = true;
    buttonElement.classList.add(inactiveButtonClass);
  } else {
    console.log('сделай кнопку активной');
    buttonElement.disabled = false;
    buttonElement.classList.remove(inactiveButtonClass);
  }
}; 