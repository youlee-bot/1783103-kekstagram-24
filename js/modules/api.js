export let contentDataArray;

export const getData = (onSuccess, onError) => {
  fetch ('https://24.javascript.pages.academy/kekstagram/data')

    .then((response) => response.json())

    .then((data) => {
      contentDataArray = data;
      onSuccess();
    })
    .catch(() => {
      onError('Ошибка загрузки');
    });
};

export const sendData = (onSuccess, onFail, body) => {
  fetch(
    'https://24.javascript.pages.academy/kekstagram',
    {
      method: 'POST',
      body,
    },
  )
    .then((response) => {
      if (response.ok) {
        onSuccess();
      } else {
        throw new Error('Не удалось отправить форму. Попробуйте ещё раз');
      }
    })
    .catch(() => {
      onFail();
    });
};


