'use strict';

function toggleClass(options) {
  const itemClass = `${options.toggleItem}`;
  const buttonClass = `${options.toggleButton}`;
  const activeClass = '--active';
  const itemActiveClass = `${itemClass + activeClass}`;
  const toggleItem = document.querySelectorAll(`.${itemClass + options.modifierItem}`);
  const toggleButton = document.querySelectorAll(`.${buttonClass + options.modifierButton}`);

  if(!toggleItem || !toggleButton) {
    return;
  }

  toggleButton.forEach((button) => {
    button.onclick = event => {
      event.preventDefault();

      toggleItem.forEach(selector => selector.classList.toggle(itemActiveClass));
    }
  })
}

class ToggleClass {
  constructor(options) {
    this.toggleItem = options.toggleItem;
    this.toggleButton = options.toggleButton;
    this.modifierItem = options.modifierItem ? `--${options.modifierItem}` : '';
    this.modifierButton = options.modifierButton ? `--${options.modifierButton}` : '';

    return toggleClass(this);
  }
}
