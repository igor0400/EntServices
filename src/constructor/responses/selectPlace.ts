import { backBarInlineBtns } from 'src/general';

export const selectPlaceMessage = () => `<b>Конструктор</b>

👇 Выберите тип заведения:`;

export const selectPlaceMarkup = {
  inline_keyboard: [
    [
      {
        text: '🛒 Офлайн-магазин',
        callback_data: 'offline-shop::constructor_type',
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
        callback_data: 'beauty-salon::constructor_type',
      },
    ],
    ...backBarInlineBtns('back_to_constructor'),
  ],
};
