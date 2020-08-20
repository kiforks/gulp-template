'use strict';

function toggleClass(object) {
  let itemClass = `${object.toggleItem}`;
  let buttonClass = `${object.toggleButton}`;
  let activeClass = '--active';
  let itemHasToggle;
  let itemActiveClass = `${itemClass + activeClass}`;
  let toggleItem = document.querySelectorAll(`.${itemClass}`);
  let toggleButton = document.querySelectorAll(`.${buttonClass}`);

  toggleButton.forEach((button) => {
    button.onclick = event => {
      event.preventDefault();

      toggleItem.forEach(item => {
        itemHasToggle = item.classList;

        itemHasToggle.contains(itemActiveClass) ? itemHasToggle.remove(itemActiveClass) : itemHasToggle.add(itemActiveClass);
      })
    }
  })
}

let toggleObjects = [
    {
      toggleItem: 'list__item',
      toggleButton: 'button'
    },
    {
      toggleItem: 'list__item-2',
      toggleButton: 'button-2'
    }
  ];

let toggleClassInit = objects => objects.forEach(object => toggleClass(object));

toggleClassInit(toggleObjects);
