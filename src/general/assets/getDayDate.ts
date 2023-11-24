export const getDayDate = (date?: string) => {
  const newDate = date ? new Date(date) : new Date();

  return `${newDate.getUTCDate()}.${
    newDate.getUTCMonth() + 1
  }.${newDate.getUTCFullYear()}`;
};
