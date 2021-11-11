import {contentDataArray} from './api.js';
import { isEscapeKey } from '../utils/utils.js';

const bigPictureSection = document.querySelector('.big-picture');
const bigPictureSectionClose = document.querySelector('.big-picture__cancel');
const bigPictureImg = document.querySelector('.big-picture__img');
const socialComments = document.querySelector('.social__comments');
const showMoreCommentsButton = bigPictureSection.querySelector('.social__comments-loader');
const totalComments = bigPictureSection.querySelector('.comments-count');

const showComments = (id) => {
  const socialComment = document.querySelector('.social__comment');
  const allComents = [];
  socialComments.innerHTML = '';

  contentDataArray[id].comments.map((element) => {
    const oneComment = socialComment.cloneNode(true);
    oneComment.querySelector('.social__text').textContent = element.message;
    oneComment.querySelector('.social__picture').setAttribute('src', element.avatar);
    oneComment.querySelector('.social__picture').setAttribute('alt', element.name);
    allComents.push(oneComment);
  });

  return allComents;
};

const hideShowCommentsButton = (action) => {
  if (action) {
    showMoreCommentsButton.setAttribute('style', '');
  } else {
    showMoreCommentsButton.setAttribute('style', 'display: none;');
  }
};

const bigPictureClickHandler = (evt) => {
  let allComments = [];

  const closeModal = (modalContent) => {
    modalContent.classList.add('hidden');
    document.querySelector('body').classList.remove('modal-open');
    allComments = [];
  };

  const openModal = (modalContent, closeButton) => {
    modalContent.classList.remove('hidden');
    document.addEventListener('keydown', pressEscHandler);
    closeButton.addEventListener('click', () => {
      closeModal(modalContent);
    });
  };

  const pressEscHandler = (event) => {
    if (isEscapeKey(event)) {
      event.preventDefault();
      document.removeEventListener('keydown', pressEscHandler);
      closeModal(bigPictureSection);
    }
  };

  const parentTag = evt.target.closest('a');

  if (evt.target.classList.contains('picture__img')) {
    evt.preventDefault();
    openModal(bigPictureSection, bigPictureSectionClose);
    document.querySelector('body').classList.add('modal-open');
    bigPictureImg.querySelector('img').src = evt.target.src;
    bigPictureSection.querySelector('.social__caption').textContent = evt.target.alt;
    bigPictureSection.querySelector('.likes-count').textContent = parentTag.querySelector('.picture__likes').textContent;
    totalComments.textContent = parentTag.querySelector('.picture__comments').textContent;


    allComments = (showComments(evt.target.getAttribute('id'))).slice();

    const commentsCounter = () => {
      const counter = bigPictureSection.querySelectorAll('li').length;
      return counter;
    };
    hideShowCommentsButton(true);

    if (allComments.length<=5) {
      hideShowCommentsButton(false);
    }


    for (let i=0;i<=4;i++) {
      if (allComments[i]) {
        socialComments.append(allComments[i]);
        bigPictureSection.querySelector('.comments-current').textContent = i+1;
      }
    }

    const moreCommentsClickHandler = () => {
      const counter = commentsCounter();
      for (let i=counter-1; i<=counter+4;i++) {
        if (allComments[i]) {
          socialComments.append(allComments[i]);
          bigPictureSection.querySelector('.comments-current').textContent = commentsCounter();
          if (allComments.length === commentsCounter()) {
            hideShowCommentsButton(false);
          }
        }
      }
    };
    showMoreCommentsButton.addEventListener('click', moreCommentsClickHandler);
  }
};

const picturesSection = document.querySelector('.pictures');
picturesSection.addEventListener('click', bigPictureClickHandler);
