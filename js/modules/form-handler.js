import './photo-effects.js';
import { checkCommentLength } from '../utils/mock.js';
import { sendData } from './api.js';
import { showMessage } from './errors.js';
import  { isEscapeKey } from '../utils/utils.js';

const imageForm = document.querySelector('#upload-select-image');
const formModal = document.querySelector('.img-upload__overlay');
const formModalClose = document.querySelector('.img-upload__cancel');
const formFileInput = document.querySelector('.img-upload__input');
const formHashtagInput = document.querySelector('.text__hashtags');
const formCommentInput = document.querySelector('.text__description');

const closeModal = (modalContent) => {
  modalContent.classList.add('hidden');
};

const clearForm = () => {
  const scaleControl = document.querySelector('.scale__control--value');
  formFileInput.value = '';
  formCommentInput.value = '';
  formHashtagInput.value = '';
  scaleControl.value = '100%';
  const targetImageDiv = document.querySelector('.img-upload__preview');
  const targetImage = targetImageDiv.querySelector('img');
  targetImage.setAttribute('style', 'transform: scale(1);');
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
    const hashTagsMap = [];
    const hashTagsUnique = [];

    hashTagsArray.map((element) => {
      if (!hashTagsMap.includes(element.toLowerCase())) {
        hashTagsUnique.push(element);
        hashTagsMap.push(element.toLowerCase());
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

const formModalChangeHandler = () => {
  const imageToUpload = formFileInput.files[0];

  if (imageToUpload.type.match('image*')) {
    openModal(formModal, formModalClose);
  }
};

formFileInput.addEventListener('change', formModalChangeHandler);


const formSubmitHandler = (evt) => {
  evt.preventDefault(evt);

  const errorCounter = {};
  const hideRedFrame = (element) => {
    element.setAttribute('style', 'border:none;');
    errorCounter[element.className] = 'ok';
  };

  const showRedFrame = (element) => {
    element.setAttribute('style', 'border:3px solid red;');
    errorCounter[element.className] = 'error';
  };

  const checkformData = new Promise((resolve, reject) => {
    const hashTags = formHashtagInput.value.split(' ');
    const filteredHashTags = filterHashtags(getUniqueHashTags(hashTags));

    if ((hashTags.length === filteredHashTags.length)||(formHashtagInput.value === '')) {
      resolve(formHashtagInput);
    } else {
      reject(formHashtagInput);
    }
  });

  checkformData.then(hideRedFrame, showRedFrame)
    .then(() => new Promise((resolve, reject) => {
      if (checkCommentLength(formCommentInput.value, 141)) {
        resolve(formCommentInput);
      } else {
        reject(formCommentInput);
      }
    } ))
    .then(hideRedFrame, showRedFrame)
    .then(() => {
      const formData = new FormData(evt.target);


      if (!Object.values(errorCounter)
        .includes('error')) {

        sendData(() => {
          closeModal(formModal);
          showMessage('success');
        },
        () => {
          closeModal(formModal);
          showMessage('error');
        },
        formData,
        );
      }
    })
    .then(() => {
      clearForm();
    })
    .catch(() => {
      showMessage('Неизвестная ошибка');
    });
};

imageForm.addEventListener('submit', formSubmitHandler);

/*
        теги для проверки:
#Хэшй #хэшaц #ХэшТегу #хэштеy
        */
