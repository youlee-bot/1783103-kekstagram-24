import {getRandomInt, checkCommentLength} from './utils/functions.js';

checkCommentLength('some text for test', 10);

const descriptionIds = [];
for (let index = 1; index <= 25; index++) {
  descriptionIds.push(index);
}

const commentIds = [];

const GenerateComments = (ammount) => {

  const NAMES = [
    'Иван',
    'Хуан Себастьян',
    'Мария',
    'Кристоф',
    'Виктор',
    'Юлия',
    'Люпита',
    'Вашингтон',
  ];

  const COMMMENTS = [
    'Всё отлично!',
    'В целом всё неплохо. Но не всё.',
    'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
    'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
    'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
    'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!',
  ];

  const readyComments = [];
  let commentMessage;

  for (let index = 1; index <= ammount; index++) {
    const commentId = commentIds.length; // id текущего комментария
    commentIds.push(commentId.length + 1); // подготовка id для следующего комментария

    const commentAvatar = (`img/avatar-${  getRandomInt(1, 6)  }.svg`);

    const  firstSentence = getRandomInt(0, COMMMENTS.length - 1);
    let secondSentence = getRandomInt(0, COMMMENTS.length - 1);

    if (getRandomInt(1, 2) === 2) {

      while (secondSentence === firstSentence) {
        secondSentence = getRandomInt(0, COMMMENTS.length);
      }

      commentMessage = (`${COMMMENTS[firstSentence]  } ${  COMMMENTS[secondSentence]}`);
    } else {
      commentMessage = COMMMENTS[firstSentence];
    }

    readyComments.push({
      id: commentId,
      avatar: commentAvatar,
      message: commentMessage,
      name: NAMES[getRandomInt(0, NAMES.length - 1)],
    });
  }

  return readyComments;
};


const CreateDescription = () => {

  const finalDescription = [];

  for (let index = 1; index <= descriptionIds.length; index++) {
    finalDescription.push({
      id: index,
      url: `photos/${  index  }.jpg`,
      description: 'simple photo',
      likes: getRandomInt(15, 200),
      comments: GenerateComments(getRandomInt(1, 5)),
    });
  }

  return finalDescription;
};

CreateDescription();

//console.log(CreateDescription());
