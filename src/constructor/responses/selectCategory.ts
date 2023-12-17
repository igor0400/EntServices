import { backInlineBtn, localBackInlineBtn } from 'src/general';

export const selectCategoryMessage = () => `<b>Конструктор</b>

🏗 Конструктор – это самый быстрый и удобный способ создать сайт/платформу для любых целей, с готовым функционалом, удобным управлением и статистикой.

👇 Выберите категорию:`;

export const selectCategoryMarkup = {
  inline_keyboard: [
    [
      {
        text: '🛍 Интернет-магазин',
        callback_data: 'online_shop::constructor_type',
      },
    ],
    [
      {
        text: '🍴 Заведение',
        callback_data: 'places::constructor_type',
      },
    ],
    [{ text: '💬 Форум', callback_data: 'forum::constructor_type' }],
    [{ text: '⚒ На заказ', callback_data: 'custom::constructor_type' }],
    localBackInlineBtn('back_to_services'),
    backInlineBtn,
  ],
};
