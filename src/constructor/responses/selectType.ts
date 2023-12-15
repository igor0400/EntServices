import { backInlineBtn, localBackInlineBtn } from 'src/general';

export const selectTypeMessage = () => `<b>Конструктор</b>

👇 Выберите тип платформы:`;

export const selectTypeMarkup = (category: string) => ({
  inline_keyboard: [
    [
      {
        text: '🖥 Сайт',
        callback_data: `constructor_type_${category}_site`,
      },
    ],
    [
      {
        text: '✈️ Telegram бот',
        callback_data: 'latter', // `constructor_type_${category}_telegram_bot`
      },
    ],
    [
      {
        text: '🟢 WhatsApp бот',
        callback_data: 'latter', // `constructor_type_${category}_whatsapp_bot`
      },
    ],
    [
      {
        text: '🔵 VK бот',
        callback_data: 'latter', // `constructor_type_${category}_vk_bot`
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
