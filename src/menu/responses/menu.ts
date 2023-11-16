export const menuMessage = () => `<b>Главное меню</b>

⚙️ <b>EntServices</b> — это удобные сервисы для работы.
У нас есть самые необходимые, а главное качественные инструменты для работы, с которыми вы получите максимум комфорта и эффективности.`;

export const menuMarkup = {
  inline_keyboard: [
    [
      { text: 'ℹ️ Информация', callback_data: 'info' },
      { text: '👤 Профиль', callback_data: 'profile' },
    ],
    [{ text: '🗂️ Сервисы', callback_data: 'services' }],
  ],
};
