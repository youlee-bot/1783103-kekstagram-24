import {showAllPictures} from '../modules/show-photo.js';
import {getRandomInt} from '../utils/utils.js';

export const filterElements = (contentArray) => {
  const filterBlock = document.querySelector('.img-filters');
  const filterForm = document.querySelector('.img-filters__form');
  filterBlock.classList.remove('img-filters--inactive');

  const debounce = (functionToSlowUp, timeToSlowup) => {
    let timeout;
    return function () {
      const functionCall = () => { functionToSlowUp.apply(this, arguments); };
      clearTimeout(timeout);
      timeout = setTimeout(functionCall, timeToSlowup);
    };
  };

  const clearElements = () => {
    const pictureElement = document.querySelectorAll('.picture');
    for (const index of pictureElement) {
      index.remove();
    }
  };

  const filterClickHandler = (evt) => {
    for (let i = 0; i < filterForm.children.length; i++) {
      filterForm.children[i].setAttribute('class', 'img-filters__button');
    }
    evt.target.setAttribute('class', 'img-filters__button img-filters__button--active');

    const element = evt.target;
    if (element.id === 'filter-default') {
      clearElements();
      showAllPictures(contentArray);

    } else if (element.id === 'filter-random') {
      clearElements();
      if (contentArray.length >= 10) {
        const unqueArrayElements = [];

        while (unqueArrayElements.length <=10)
        {
          const randomElement = getRandomInt(0,contentArray.length-1);
          if (!unqueArrayElements.includes(randomElement)) {
            unqueArrayElements.push(randomElement);
          }}
        const showRandomElements = [];
        unqueArrayElements.forEach((arrayElement) => {
          showRandomElements.push(contentArray[arrayElement]);
        });
        showAllPictures(showRandomElements);


      }
    }
    else {
      clearElements();
      const showDiscussed = contentArray.slice();
      for (let i=0;
        i < showDiscussed.sort((obj1, obj2) => obj2.comments.length - obj1.comments.length).length;) {
        i++;
      }
      showAllPictures(showDiscussed);
    }
  };


  filterForm.addEventListener ('click', debounce(filterClickHandler, 300));
};
