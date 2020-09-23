'use strict';

function modalInit(object) {
  if(!document.querySelector(`#${object.content}`)) {
    return;
  }

  function _createModal(options) {
    const modalContent = document.querySelector(`#${options.content}`);
    const modal = document.createElement('section');

    modal.classList.add('modal');
    modal.setAttribute('role','dialog');
    modal.setAttribute('aria-modal','true');

    modal.insertAdjacentHTML('afterbegin', `
        <div class="modal__overlay">
            <div class="modal__window">
                ${options.closable ? `<button class="modal__closing-button" type="button" aria-label="Close window"></button>` : ''}
                <div class="modal__body">
                  ${modalContent.innerHTML || ''}
                </div>
            </div>
        </div>`);

    document.body.appendChild(modal);

    return modal;
  }

  const currentModal = _createModal(object);
  const overlay = currentModal.querySelector('.modal__overlay');
  const closingButton = currentModal.querySelector('.modal__closing-button');
  const openingButton = document.querySelectorAll(`.${object.openingButton}`);
  const ANIMATION_SPEED = 300;
  let closing = false;
  let destroyed = false;

  const modal = {
    open() {
      if(destroyed) {
        return;
      }

      !closing && currentModal.classList.add('modal--active');
    },
    close() {
      closing = true;

      currentModal.classList.remove(`modal--active`);
      currentModal.classList.add(`modal--hide`);

      setTimeout(() => {
        currentModal.classList.remove(`modal--hide`);
        closing = false;
      }, ANIMATION_SPEED);
    }
  }

  const listener = event => {
    if(object.beforeClose && (event.target === overlay && object.coveringOverlay) || (event.target === closingButton && object.coveringButton)) {
      event.preventDefault();

      modal.close();
    }
  }

  currentModal.addEventListener('click', listener);

  openingButton && openingButton.forEach(button => {
    button.onclick = event => {
      event.preventDefault();
      modal.open();
    }
  })

  return Object.assign(modal, {
    destroy() {
      const template = document.querySelector(`#${object.content}`);
      destroyed = true;

      currentModal.remove();
      template.remove();
      currentModal.removeEventListener('click', listener);
    },
    setContent(template) {
      const dynamicContent = document.querySelector(`#${template}`);
      const modalBody = currentModal.querySelector('.modal__body');

      modalBody.innerHTML = dynamicContent.innerHTML;
    }
  })
}

class Modal {
  constructor(options) {
    this.closable = options.closable == false ? false : true;
    this.beforeClose = options.beforeClose == false ? false : true;
    this.coveringOverlay = options.coveringOverlay == false ? false : true;
    this.coveringButton = options.coveringButton == false ? false : true;
    this.openingButton = options.openingButton ? options.openingButton : false;
    this.content = options.content;

    return Object.assign(this, modalInit(this));
  }
}



