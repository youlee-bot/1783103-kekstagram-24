import './photo-effects.js';

const imageForm = document.querySelector('#upload-select-image');
const formModal = document.querySelector('.img-upload__overlay');
const formModalClose = document.querySelector('.img-upload__cancel');
const formFileInput = document.querySelector('.img-upload__input');
const formHashtagInput = document.querySelector('.text__hashtags');
const formCommentInput = document.querySelector('.text__description');

const isEscapeKey = (evt) => evt.key === 'Escape';

const closeModal = (modalContent) => {
  modalContent.classList.add('hidden');
  formFileInput.value = '';
};

const pressEscHandler = (evt) => {
  if ((formHashtagInput !== document.activeElement) && (formCommentInput !== document.activeElement)) {
    if (isEscapeKey(evt)) {
      evt.preventDefault();
      document.removeEventListener('keydown', pressEscHandler);
      closeModal(formModal);
    }
  }
};

const openModal = (modalContent, closeButton) => {
  modalContent.classList.remove('hidden');
  document.addEventListener('keydown', pressEscHandler);
  closeButton.addEventListener('click', () => {
    closeModal(formModal);
  });
};

const getUniqueHashTags = (hashTagsArray) => {
  if (hashTagsArray.length > 0) {
    const HashTagsMap = [];
    const hashTagsUnique = [];

    hashTagsArray.map((element) => {
      if (!HashTagsMap.includes(element.toLowerCase())) {
        hashTagsUnique.push(element);
        HashTagsMap.push(element.toLowerCase());
      }
    });
    return hashTagsUnique;
  }
};

const filterHashtags = (hashTagsArray) => {
  const filteredHashtagsArray = [];
  const re = /^#[A-Za-zА-Яа-яЁё0-9]{1,19}$/;

  if (hashTagsArray.length > 0) {
    hashTagsArray.map((element) => {
      if ((re.test(element)) && (filteredHashtagsArray.length < 5)) {
        filteredHashtagsArray.push(element);
      }
    });
    return filteredHashtagsArray;
  }
};

const formFileInputHandler = () => {
  const imageToUpload = formFileInput.files[0];

  if (imageToUpload.type.match('image*')) {
    openModal(formModal, formModalClose);
  }
};

formFileInput.addEventListener('change', formFileInputHandler);

const formSubmitHandler = (evt) => {
  evt.preventDefault(evt);
  const hashTags = formHashtagInput.value.split(' ');
  formHashtagInput.value = filterHashtags(getUniqueHashTags(hashTags)).join(' ');
};

imageForm.addEventListener('submit', formSubmitHandler);

/*
        теги для проверки:
        #Хэш #хэш #ХэшТег #хэштег  #Temps #temps #234 $234 #2344
        */
