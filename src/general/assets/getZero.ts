export const getZero = (num: string | number) => {
  if (+num < 10) {
    return `0${num}`;
  } else {
    return num;
  }
};
