import { backInlineBtn } from 'src/general';
import { BasicNotification } from '../models/basic-notification.model';

export const basicNotificationsMessage = (isFull = false) => `<b>Уведомления</b>

${isFull ? '📬' : '📭'} Список уведомлений которые требуют действия:`;

export const basicNotificationsMarkup = (
  notifications: BasicNotification[],
) => {
  const notificationsBtns = [];

  for (let { title, id } of notifications) {
    notificationsBtns.push([
      {
        text: title,
        callback_data: `${id}::user_notification`,
      },
    ]);
  }

  if (!notificationsBtns.length) {
    notificationsBtns.push([
      {
        text: '🤷‍♂️ Список пуст',
        callback_data: 'empty_notifications',
      },
    ]);
  }

  return {
    inline_keyboard: [
      ...notificationsBtns,
      [
        {
          text: '↩️ Назад',
          callback_data: 'back_to_profile',
        },
      ],
      backInlineBtn,
    ],
  };
};
