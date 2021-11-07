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
  formFileInput.value = '';
  formCommentInput.value = '';
  formHashtagInput.value = '';
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

  const errorCounter = {};
  const hideRedFrame = (element) => {
    element.setAttribute('style', 'border:none;');
    errorCounter[element.className] = 'ok';
  };

  const showRedFrame = (element) => {
    element.setAttribute('style', 'border:3px solid red;');
    errorCounter[element.className] = 'error';
  };

  const CheckformData = new Promise((resolve, reject) => {
    const hashTags = formHashtagInput.value.split(' ');
    const filteredHashTags = filterHashtags(getUniqueHashTags(hashTags));

    if (hashTags.length === filteredHashTags.length) {
      resolve(formHashtagInput);
    } else {
      reject(formHashtagInput);
    }
  });

  CheckformData.then(hideRedFrame, showRedFrame)
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
      // тест для просмотра форм даты
      // formData.set('filename', filetoupload.files[0].name);
      // for (const pair of formData.entries()) {
      //   console.log(`${ pair[0] }, ${  JSON.stringify(pair[1])}`);
      //}
    })
    .catch(() => {
      //console.log(errorCounter);
    });
};

imageForm.addEventListener('submit', formSubmitHandler);

/*
        теги для проверки:
#Хэшй #хэшaц #ХэшТегу #хэштеy
        */
