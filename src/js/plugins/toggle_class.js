'use strict';

function toggleClass(options) {
  const itemClass = `${options.toggleItem}`;
  const buttonClass = `${options.toggleButton}`;
  const ACTIVE_CLASS = '--active';
  const HIDE_CLASS = '--hide';
  const ANIMATION_TIME = 300;  // Transition duration
  const itemHideClass = itemClass + HIDE_CLASS;
  const itemActiveClass = itemClass + ACTIVE_CLASS;
  const toggleItem = document.querySelectorAll(`.${itemClass + options.modifierItem}`);
  const toggleButton = document.querySelectorAll(`.${buttonClass + options.modifierButton}`);
  const BODY = document.querySelector('body');
  const bodyActiveClass = `body${ACTIVE_CLASS}`;
  const removeClassFrom = (element, toggleClass = itemActiveClass) => element.classList.remove(toggleClass);
  const addClassTo = (element, toggleClass = itemActiveClass) => element.classList.add(toggleClass);
  const hasClassIn = (element, toggleClass = itemActiveClass) => element.classList.contains(toggleClass);
  const toggleTarget = options.target;
  const targetDisable = options.targetDisable;
  const toggleBody = options.toggleBody;
  const preventDefault = options.preventDefault;
  const transitionSwitch = (element, switchControl) => {
    addClassTo(element, itemHideClass);

    setTimeout(() => {
      if(switchControl) {
        switchControl = false;
      }

      removeClassFrom(element, itemHideClass);
    }, ANIMATION_TIME);
  };


  let closing = false;

  if(!toggleItem || !toggleButton) {
    return;
  }

  function toggleInit(selector) {
    if(hasClassIn(selector)) {
      closing = true;

      if(toggleBody) {
        removeClassFrom(BODY, bodyActiveClass);
      }

      removeClassFrom(selector);
      transitionSwitch(selector, closing);
    } else {
      if(!closing) {
        addClassTo(selector);

        if(toggleBody) {
          addClassTo(BODY, bodyActiveClass);
        }
      }
    }
  }

  toggleButton.forEach((button) => {
    button.onclick = event => {
      if(!preventDefault) {
        event.preventDefault();
      }

      let target = event.target.closest(`.${itemClass}`);

      if(toggleTarget) {
        toggleItem.forEach(item => {
          if(hasClassIn(item)) {
            if(item === target && !targetDisable) {
              return;
            }

            transitionSwitch(item);
          }

          if(item !== target) {
            removeClassFrom(item);
          } else {
            if(!targetDisable) {
              addClassTo(item);

              return;
            }

            item.classList.toggle(itemActiveClass);
          }
        });
      } else {
        toggleItem.forEach(item => toggleInit(item));
      }
    }
  })
}

class ToggleClass {
  constructor(options) {
    this.toggleItem = options.toggleItem; // Target for toggle
    this.toggleButton = options.toggleButton; // Button for toggle
    this.modifierItem = options.modifierItem ? `--${options.modifierItem}` : ''; // Target modifier
    this.modifierButton = options.modifierButton ? `--${options.modifierButton}` : '';  // Button modifier
    this.toggleBody = options.toggleBody ? options.toggleBody : false; // Toggle class on body, false
    this.target = options.target ? options.target : false; // Makes only the target element active, false
    this.targetDisable = options.targetDisable === false ? options.targetDisable : true; // Option to disable active class on target, true
    this.preventDefault = options.preventDefault ? options.preventDefault : true; // Prevent default, true

    return toggleClass(this);
  }
}
