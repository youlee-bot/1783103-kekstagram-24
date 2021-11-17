const showAllPictures = (photoContent) => {
  const getTemplate = document.querySelector('#picture').content;
  const allPictures = document.createDocumentFragment();
  const placeToInsert = document.querySelector('.pictures');

  photoContent.forEach((element) => {
    const onePicTemplate = getTemplate.cloneNode(true);
    const pic = onePicTemplate.querySelector('img');
    const comments = onePicTemplate.querySelector('.picture__comments');
    const likes = onePicTemplate.querySelector('.picture__likes');

    pic.setAttribute('id', element.id);
    pic.setAttribute('src', element.url);
    pic.setAttribute('alt', element.description);
    comments.textContent = element.comments.length;
    likes.textContent = element.likes;
    allPictures.append(onePicTemplate);
  });

  placeToInsert.append(allPictures);
  return photoContent;
};

export {showAllPictures};
