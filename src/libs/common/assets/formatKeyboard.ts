import { getEmptyBtns } from 'src/calendar/assets';

export const formatKeyboard = (
  arr: { text: string; callback_data: string }[],
  rowLen = 2,
  isEmptyFill = false,
) => {
  const keyboardItems = [];
  let prepeadedItems = [];
  let index = 0;

  for (let item of arr) {
    prepeadedItems.push(item);

    if (prepeadedItems.length >= rowLen || index === arr.length - 1) {
      if (isEmptyFill && index === arr.length - 1) {
        prepeadedItems.push(...getEmptyBtns(rowLen - prepeadedItems.length));
      }

      keyboardItems.push(prepeadedItems);
      prepeadedItems = [];
    }
    index++;
  }

  return keyboardItems;
};
