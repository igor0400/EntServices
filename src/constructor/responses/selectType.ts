import { backInlineBtn, localBackInlineBtn } from 'src/general';

export const selectTypeMessage = () => `<b>Конструктор</b>

👇 Выберите тип платформы:`;

export const selectTypeMarkup = (category: string) => ({
  inline_keyboard: [
    [
      {
        text: '📰 Лендинг',
        callback_data: 'latter', // `constructor_type_${category}_landing`
      },
    ],
    [
      {
        text: '🖥 Сайт',
        callback_data: `constructor_type_${category}_site`,
      },
    ],
    [
      {
        text: '📱 Приложение',
        callback_data: 'latter', // `constructor_type_${category}_application`
      },
    ],
    localBackInlineBtn('back_to_constructor'),
    backInlineBtn,
  ],
});
