import { backInlineBtn } from '../../general';

export const infoMessage = () => `<b>Информация</b>

⚙️ <b>EntServices</b> – это уникальная платформа, которая предлагает широкий спектр сервисов для предпринимателей и людей, желающих улучшить свою продуктивность. Наш бот станет незаменимым инструментом для достижения ваших целей и повышения эффективности работы.

ℹ️ В <b>EntServices</b> собраны полезные сервисы, и удобство работы с ними – это наш главный принцип.

🌐 Мы прислушиваемся ко всем нашим пользователям и максимально быстро и регулярно обновляем бота в лучшую сторону. 

💡 Если у Вас возникли какие-либо вопросы или предложения – можете связаться с нами ориентируясь по кнопкам ниже.`;

export const infoMarkup = {
  inline_keyboard: [
    [
      { text: '💬 Наш чат', url: 'https://t.me/EntServicesChat' },
      { text: '📨 Наш канал', url: 'https://t.me/EntServicesNews' },
    ],
    [{ text: '💻 Администратор', url: `https://t.me/just_close` }],
    backInlineBtn,
  ],
};
