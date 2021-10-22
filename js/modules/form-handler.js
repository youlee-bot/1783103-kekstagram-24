import {isEscapeKey} from '../utils/mock.js';

const imageForm = document.querySelector('#upload-select-image');
const formModal = document.querySelector('.img-upload__overlay');
const formModalClose = document.querySelector('.img-upload__cancel');
const formFileInput = document.querySelector('.img-upload__input');
const formHashtagInput = document.querySelector('.text__hashtags');
const formCommentInput = document.querySelector('.text__description');

const closeFormModal = () => {
  formModal.classList.add('hidden');
  formFileInput.value = '';

};

const pressEscHandler = (evt) => {
  if ((formHashtagInput !== document.activeElement) && (formCommentInput !== document.activeElement)) {
    if (isEscapeKey(evt)) {
      evt.preventDefault();
      document.removeEventListener('keydown', pressEscHandler);
      closeFormModal();
    }
  }
};

const openFormModal = () => {
  formModal.classList.remove('hidden');
  document.addEventListener('keydown', pressEscHandler);
  formModalClose.addEventListener('click', () => {
    closeFormModal();
  });
};

formFileInput.addEventListener('change', () => {
  const imageToUpload = formFileInput.files[0];

  if (imageToUpload.type.match('image*')) {
    openFormModal();
  }
});

imageForm.addEventListener('submit', (evt) => {
  let hashTags = [];
  const hashTagsUnique = [];
  const filteredHashtagsArray = [];
  const re = /^#[A-Za-zА-Яа-яЁё0-9]{1,19}$/;
  evt.preventDefault(evt);
  hashTags = formHashtagInput.value.split(' ');

  if (hashTags.length > 0) { // фильтрация хэш тегов
    /*
      теги для проверки:

      #Хэш #хэш #ХэшТег #хэштег  #Temps #temps #234 $234 #2344
      */
    const HashTagsMap = [];

    hashTags.map((element) => {
      if (!HashTagsMap.includes(element.toLowerCase())) {
        hashTagsUnique.push(element);
        HashTagsMap.push(element.toLowerCase());
      }
    });

    if (hashTagsUnique.length > 0) {
      hashTagsUnique.map((element) => {
        if ((re.test(element)) && (filteredHashtagsArray.length < 5)) {
          filteredHashtagsArray.push(element);
        }
      });
    }
    formHashtagInput.value = filteredHashtagsArray.join(' ');
  }
});
