import { localBackInlineBtn } from '../../general';

export const servicesMessage = () =>
  `Чтобы начать <b>пользоваться нашими сервисами</b>, просто <b><u>выберите интересующий вас раздел</u></b> ориентируясь по кнопкам ниже.`;

export const servicesMarkup = {
  inline_keyboard: [
    [{ text: '🗓 Календарь', url: 'https://t.me/tatagobot' }],
    // [{ text: '🏗 Конструктор', url: 'https://t.me/' }],
    localBackInlineBtn('back'),
  ],
};
