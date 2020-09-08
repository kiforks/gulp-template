/*
  Все значения по дефолту 'true'

  Пример инициализации:

  try {
  const myObject = new Modal({
    closable: true, // Закрывающая кнопка
    content: 'modal-content', // ID шаблона с контентом
    beforeClose: true, // Возможность закрывать модальное окно
    coveringOverlay: true, // Возможность закрывать модальное окно при клике на оверлей
    coveringButton: true, // Возможность закрывать модальное окно при клике на кнопку
    openingButton: 'button' // Кнопка открывающая модальное окно
  });
  } catch {
    function catchError() {
      return;
    }
  }

*/
