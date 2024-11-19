import { localBackInlineBtn } from '../../general';

export const infoMessage =
  () => `<b><u>EntServices</u></b> — ваш идеальный <b><u>инструмент-помощник</u></b> для улучшения продуктивности вашей работы.

— Наши сервисы вмещают в себя самый полезный функционал, и удобство работы с ним – это наш главный принцип.

— Мы прислушиваемся ко всем нашим пользователям, максимально качественно обновляя сервисы в лучшую сторону.

— Если у Вас возникли какие-либо вопросы или предложения — можете связаться с нами ориентируясь по кнопкам ниже.`;

export const infoMarkup = {
  inline_keyboard: [
    [
      { text: '💬 Наш чат', url: 'https://t.me/EntServicesChat' },
      { text: '📨 Наш канал', url: 'https://t.me/EntServicesNews' },
    ],
    [{ text: '💻 Администратор', url: `https://t.me/ul1dev` }],
    localBackInlineBtn('back'),
  ],
};
