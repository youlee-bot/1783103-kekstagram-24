export const isEscapeKey = (evt) => evt.key === 'Escape';

export const getRandomInt = (min, max) => {
  min = Math.ceil(min);
  max = Math.floor(max);
  if (min > max) {
    const temp = min;
    min = max;
    max = temp;
  }
  return Math.abs(Math.floor(Math.random() * (max - min + 1)) + min);
};
