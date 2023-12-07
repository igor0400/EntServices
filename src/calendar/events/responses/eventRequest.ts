import { textMonths } from 'src/calendar/configs';
import { CalendarEvent } from 'src/calendar/models/event.model';
import { getUserName } from 'src/libs/common';
import { User } from 'src/users/models/user.model';

export const eventRequestMessage = (event: CalendarEvent, owner: User) => {
  const startDate = new Date(event.startTime);

  const title = event.title ? event.title : 'Событие';

  const textDate = `${startDate.getUTCDate()} ${
    textMonths[startDate.getUTCMonth()]
  } ${startDate.getUTCFullYear()}`;
  const textStart = event.startTime?.split('T')[1]?.slice(0, 5);
  const textEnd = event.endTime?.split('T')[1]?.slice(0, 5);

  const members = [];

  for (let { user } of event?.members) {
    members.push(getUserName(user));
  }

  return `<b>Приглашение</b>

🗒 ${getUserName(
    owner,
  )} приглашает вас присоединиться к событию <b>"${title}"</b>

🗓 <b>Дата:</b> <code>${textDate}</code>
🕗 <b>Начало:</b> <code>${textStart}</code>
🕔 <b>Конец:</b> <code>${textEnd}</code>

👥 <b>Участники:</b> ${members.join(', ')}`;
};

export const eventRequestMarkup = (eventId: string) => ({
  inline_keyboard: [
    [
      { text: '✅ Принять', callback_data: `${eventId}::accept_event_request` },
      {
        text: '❌ Отклонить',
        callback_data: `${eventId}::reject_event_request`,
      },
    ],
  ],
});
