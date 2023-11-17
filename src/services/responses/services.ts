import { backMarkup } from '../../general';

export const servicesMessage = () => `<b>Сервисы</b>

🗂️ Чтобы начать пользоваться нашими сервисами, просто выберите интересующий вас раздел ориентируясь по кнопкам ниже.`;

export const servicesMarkup = {
  inline_keyboard: [
    [{ text: '🗓 Календарь', callback_data: 'calendar' }],
    ...backMarkup.inline_keyboard,
  ],
};
