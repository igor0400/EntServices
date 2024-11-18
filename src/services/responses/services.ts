import { localBackInlineBtn } from '../../general';

export const servicesMessage = () => `<b>Сервисы</b>

🗂️ Чтобы начать пользоваться нашими сервисами, просто выберите интересующий вас раздел ориентируясь по кнопкам ниже.`;

export const servicesMarkup = {
  inline_keyboard: [
    [{ text: '🗓 Календарь', url: 'https://t.me/TaskTamerRobot' }],
    // [{ text: '🏗 Конструктор', url: 'https://t.me/' }],
    localBackInlineBtn('back'),
  ],
};
