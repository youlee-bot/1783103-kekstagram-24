const showAllPictures = (photoContent) => {
  const GetTemplate = document.querySelector('#picture').content;
  const allPictures = document.createDocumentFragment();
  const placeToInsert = document.querySelector('.pictures');

  photoContent.forEach((element) => {
    const onePicTemplate = GetTemplate.cloneNode(true);

    const pic = onePicTemplate.querySelector('img');
    const comments = onePicTemplate.querySelector('.picture__comments');
    const likes = onePicTemplate.querySelector('.picture__likes');

    pic.src = element.url;
    pic.alt = element.description;
    comments.textContent = element.comments.length;
    likes.textContent = element.likes;
    allPictures.append(onePicTemplate);
  });

  placeToInsert.append(allPictures);
};

export {showAllPictures};
