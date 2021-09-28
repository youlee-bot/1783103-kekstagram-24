function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);

  if (min > max) {
    const temp = min;
    min = max;
    max = temp;
  }

  return Math.abs(Math.floor(Math.random() * (max - min + 1)) + min);
}

function checkCommentLength(comment, commentLength) {
  return comment.length < commentLength;
}

getRandomInt(0, -432);
checkCommentLength('some text for test', 10);
