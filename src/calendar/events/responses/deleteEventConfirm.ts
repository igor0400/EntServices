import { backInlineBtn } from 'src/general';

export const deleteEventConfirmMessage = () => `<b>Удаление события</b>

🗑 Вы хотите удалить событие?`;

export const deleteEventConfirmMarkup = (eventId: string) => ({
  inline_keyboard: [
    [
      {
        text: 'Да, удалить',
        callback_data: `${eventId}::delete_calendar_event`,
      },
    ],
    [
      {
        text: '↩️ Вернуться',
        callback_data: `${eventId}::back_to_calendar_event`,
      },
    ],
    backInlineBtn,
  ],
});
