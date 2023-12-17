import { backInlineBtn, localBackInlineBtn } from 'src/general';

export const selectPlaceMessage = () => `<b>Конструктор</b>

👇 Выберите тип заведения:`;

export const selectPlaceMarkup = {
  inline_keyboard: [
    [
      {
        text: '🛒 Офлайн-магазин',
        callback_data: 'offline_shop::constructor_type',
      },
    ],
    [
      {
        text: '☕️ Кафе',
        callback_data: 'cafe::constructor_type',
      },
    ],
    [
      {
        text: '🍽 Ресторан',
        callback_data: 'restaurant::constructor_type',
      },
    ],
    [
      {
        text: '💈 Барбершоп',
        callback_data: 'barbershop::constructor_type',
      },
    ],
    [
      {
        text: '💇‍♀️ Салон красоты',
        callback_data: 'beauty_salon::constructor_type',
      },
    ],
    localBackInlineBtn('back_to_constructor'),
    backInlineBtn,
  ],
};
