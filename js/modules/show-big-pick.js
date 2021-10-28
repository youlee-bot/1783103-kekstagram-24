import {contentDataArray} from '../utils/mock.js';

const bigPictureSection = document.querySelector('.big-picture');
const bigPictureSectionClose = document.querySelector('.big-picture__cancel');
const bigPictureImg = document.querySelector('.big-picture__img');
const socialComments = document.querySelector('.social__comments');

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

const isEscapeKey = (evt) => evt.key === 'Escape';

const openBigPicture = (evt) => {
  let allComments = [];

  const closeModal = (modalContent) => {
    modalContent.classList.add('hidden');
    document.querySelector('body').classList.remove('modal-open');
    allComments = [];
  };

  const pressEscHandler = (evt) => {
    if (isEscapeKey(evt)) {
      evt.preventDefault();
      document.removeEventListener('keydown', pressEscHandler);
      closeModal(bigPictureSection);
    }
  };

  const openModal = (modalContent, closeButton) => {
    modalContent.classList.remove('hidden');
    document.addEventListener('keydown', pressEscHandler);
    closeButton.addEventListener('click', () => {
      closeModal(modalContent);
    });
  };

  const parentTag = evt.target.closest('a');

  if (evt.target.classList.contains('picture__img')) {
    evt.preventDefault();
    openModal(bigPictureSection, bigPictureSectionClose);
    document.querySelector('body').classList.add('modal-open');
    bigPictureImg.querySelector('img').src = evt.target.src;
    bigPictureSection.querySelector('.likes-count').textContent = parentTag.querySelector('.picture__likes').textContent;
    bigPictureSection.querySelector('.comments-count').textContent = parentTag.querySelector('.picture__comments').textContent;

    allComments = (showComments(evt.target.getAttribute('id'))).slice();

    const commentsCounter = () => {
      const counter = bigPictureSection.querySelectorAll('li').length;
      return counter;
    };

    for (let i=0;i<=4;i++) {
      if (allComments[i]) {
        socialComments.append(allComments[i]);
        bigPictureSection.querySelector('.comments-current').textContent = i+1;
      }
    }

    const showMoreComments = () => {
      const counter = commentsCounter();
      for (let i=counter-1; i<=counter+4;i++) {
        if (allComments[i]) {
          socialComments.append(allComments[i]);
          bigPictureSection.querySelector('.comments-current').textContent = commentsCounter();
        }
      }
    };

    bigPictureSection.querySelector('.social__comments-loader').addEventListener('click', showMoreComments);
  }
};

const picturesSection = document.querySelector('.pictures');
picturesSection.addEventListener('click', openBigPicture);
