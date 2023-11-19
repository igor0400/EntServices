import { backInlineBtn } from '../../general';

export const servicesMessage = () => `<b>Сервисы</b>

🗂️ Чтобы начать пользоваться нашими сервисами, просто выберите интересующий вас раздел ориентируясь по кнопкам ниже.`;

export const servicesMarkup = {
  inline_keyboard: [
    [{ text: '🗓 Календарь', callback_data: 'calendar' }],
    [{ text: '🗓 Календарь v2', callback_data: 'calendar_v2' }],
    backInlineBtn,
  ],
};
