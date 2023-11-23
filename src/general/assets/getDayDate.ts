export const getDayDate = (date?: string) => {
  const newDate = date ? new Date(date) : new Date();

  return `${newDate.getDate()}.${
    newDate.getMonth() + 1
  }.${newDate.getFullYear()}`;
};
