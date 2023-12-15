import { backInlineBtn, localBackInlineBtn } from 'src/general';

export const selectCategoryMessage = () => `<b>Конструктор</b>

🏗 <b>Конструктор</b> это — ...

👇 Выберите категорию:`;

export const selectCategoryMarkup = {
  inline_keyboard: [
    [{ text: '🛍 Интернет-магазин', callback_data: 'constructor_shop' }],
    [{ text: '🍴 Заведение', callback_data: 'latter' }], // constructor_eat_place
    [{ text: '⚒ На заказ', callback_data: 'latter' }], // constructor_custom
    localBackInlineBtn('back_to_services'),
    backInlineBtn,
  ],
};

// тип: сайт -> стиль: модерн, классический... -> введите название -> введите описание -> мб введите слоган -> загрузите товары (exel, еще что то, в ручную)
