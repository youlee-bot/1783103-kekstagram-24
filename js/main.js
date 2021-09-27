function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);

  if (min > max) { // здесь нужно это сравнение ? я пробовал без него, тоже работает
    const temp = min;
    min = max;
    max = temp;
  }

  return Math.abs(Math.floor(Math.random() * (max - min + 1)) + min);
}

function checkCommentLength(comment, commentLength) {
  if (comment.length <= commentLength) {
    return true;
  }
  return false;
}

getRandomInt(0, -432);
checkCommentLength('some text for test', 10);
