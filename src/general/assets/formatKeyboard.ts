export const formatKeyboard = (
  arr: { text: string; callback_data: string }[],
  rowLen = 2,
) => {
  const keyboardItems = [];
  let prepeadedItems = [];
  let index = 0;

  for (let item of arr) {
    prepeadedItems.push(item);

    if (prepeadedItems.length >= rowLen || index === arr.length - 1) {
      keyboardItems.push(prepeadedItems);
      prepeadedItems = [];
    }
    index++;
  }

  return keyboardItems;
};