import { backInlineBtn, localBackInlineBtn } from 'src/general';

export const selectCategoryMessage = () => `<b>Конструктор</b>

🏗 Конструктор – это самый быстрый и удобный способ создать сайт/платформу для любых целей, с готовым функционалом, удобным управлением и статистикой.

👇 Выберите категорию:`;

export const selectCategoryMarkup = {
  inline_keyboard: [
    [
      {
        text: '🛍 Интернет-магазин',
        callback_data: 'constructor_сategory_shop',
      },
    ],
    [{ text: '🍴 Заведение', callback_data: 'latter' }], // constructor_сategory_eat_place
    [{ text: '⚒ На заказ', callback_data: 'latter' }], // constructor_сategory_custom
    localBackInlineBtn('back_to_services'),
    backInlineBtn,
  ],
};

// тип: сайт, лендинг, приложение -> стиль: модерн, классический... -> введите название -> введите описание -> мб введите слоган -> загрузите товары (exel, еще что то, в ручную)
