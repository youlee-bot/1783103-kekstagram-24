
import  { isEscapeKey } from '../utils/utils.js';

export const showMessage = (content) => {
  const Message = document.querySelector(`#${  content}`).cloneNode(true);
  const Messagebody = Message.content;
  document.body.appendChild(Messagebody);
  const MessageWindow = document.querySelector(`.${  content}`);

  const MessageClose = (evt) => {
    if ((evt.target.className === content)||(evt.target.className === `${content  }__button`)) {
      document.body.removeChild(MessageWindow);
    }
  };

  const pressEscHandler = (evt) => {
    if (isEscapeKey(evt)) {
      evt.preventDefault();
      MessageWindow.removeEventListener('keydown', pressEscHandler);
      document.body.removeChild(MessageWindow);
    }
  };

  MessageWindow.addEventListener('click', MessageClose);
  document.addEventListener('keydown', pressEscHandler);

};

export const showAlert = (message) => {
  const alertContainer = document.createElement('div');
  alertContainer.style.zIndex = 100;
  alertContainer.style.position = 'absolute';
  alertContainer.style.left = 0;
  alertContainer.style.top = 0;
  alertContainer.style.right = 0;
  alertContainer.style.padding = '10px 3px';
  alertContainer.style.fontSize = '30px';
  alertContainer.style.textAlign = 'center';
  alertContainer.style.backgroundColor = 'red';

  alertContainer.textContent = message;

  document.body.append(alertContainer);
};
