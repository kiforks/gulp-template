if (document.querySelector('.projects__item')) {
  projectShowMore();
}

function projectShowMore() {
  const allItems = document.querySelectorAll('.projects__item a');

  if(allItems.length > 5) {
    for(let i = 5; i < allItems.length; i++) {
      allItems[i].style.display='none';
    }

    showMore(allItems);
  }
}


function showMore(allItems) {
  const showButton = document.querySelector('.projects__photo--upload');

  showButton && showButton.addEventListener('click', (e) => {
    const galleryDescriptions = document.querySelectorAll('.projects__low-description');

    galleryDescriptions.forEach((description) => {
      description.style.display='none';
    })

    if(!(showButton.classList.contains('js-open-popup'))) {
      e.preventDefault();
      e.stopPropagation();
    }

    for(let i = 5; i < allItems.length; i++) {
      allItems[i].style.display='block';
      allItems[i].classList.add('js-open-popup');
      showButton.classList.add('js-open-popup');
    }
  });
}

