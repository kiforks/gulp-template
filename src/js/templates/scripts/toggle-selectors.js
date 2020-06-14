'use strict';

function selectorToggle(selector, button, accessibility = false, focus = false) {
  const acc = () => accessibility ? visuallyHidden : closedSelector;

  let toggleSelector = document.querySelectorAll('.' + selector),
      toggleButton = document.querySelectorAll('.' + button),
      closedSelector = selector + '--closed',
      visuallyHidden = 'visually-hidden',
      hidingClass = acc(),
      focusOpenClass = selector + '--opened';

  if(focus) {
    toggleButton.forEach((amount, index) => {
      toggleButton[index].onfocus = () => {
        toggleSelector.forEach((elememnt, number) => {
          let classList = toggleSelector[number].classList;
          if(!(classList.contains(focusOpenClass))){
            classList.add(focusOpenClass);
          }
        })
      }
      toggleButton[index].onblur = () => {
        toggleSelector.forEach((elememnt, number) => {
          toggleSelector[number].classList.remove(focusOpenClass);
        })
      }
    })
  } else {
    toggleButton.forEach((amount, index) => {
      toggleButton[index].addEventListener('click', event => {
        event.preventDefault();
        toggleSelector.forEach((element, number) => {
          let classList = toggleSelector[number].classList;
          classList.contains(hidingClass) ? classList.remove(hidingClass) : classList.add(hidingClass);
        })
      })
    })
  }
}

selectorToggle('', '', false, true);




