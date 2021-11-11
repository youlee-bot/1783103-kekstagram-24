
import  { isEscapeKey } from '../utils/utils.js';

export const showMessage = (content) => {
  const message = document.querySelector(`#${  content}`).cloneNode(true);
  const messagebody = message.content;
  document.body.appendChild(messagebody);
  const messageWindow = document.querySelector(`.${  content}`);

  const messageCloseHandler = (evt) => {
    if ((evt.target.className === content)||(evt.target.className === `${content  }__button`)) {
      document.body.removeChild(messageWindow);
    }
  };

  const pressEscHandler = (evt) => {
    if (isEscapeKey(evt)) {
      evt.preventDefault();
      messageWindow.removeEventListener('keydown', pressEscHandler);
      document.body.removeChild(messageWindow);
    }
  };

  messageWindow.addEventListener('click', messageCloseHandler);
  document.addEventListener('keydown', pressEscHandler);

};

export const showAlert = (message) => {
  const alertContainer = document.createElement('div');
  alertContainer.setAttribute('style', 'z-index: 100; position: absolute; left: 0px; top: 0px; right: 0px; padding: 10px 3px; font-size: 30px; text-align: center; background-color: red;');
  alertContainer.textContent = message;
  document.body.append(alertContainer);
};
