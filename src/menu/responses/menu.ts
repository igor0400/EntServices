export const menuMessage =
  () => `<b>Добро пожаловать в <u>EntServices</u></b> — ваш идеальный <b><u>инструмент-помощник</u></b> для улучшения продуктивности вашей работы.

Здесь вы найдете все <b><u>необходимые сервисы</u></b>, к которым стоит присмотреться, если вы хотите упростить выполнение повседневных задач.`;

export const menuMarkup = {
  inline_keyboard: [
    [
      { text: 'ℹ️ Информация', callback_data: 'info' },
      // { text: '👤 Профиль', callback_data: 'profile' },
    ],
    [{ text: '🗂️ Сервисы', callback_data: 'services' }],
  ],
};
