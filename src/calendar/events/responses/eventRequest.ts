import { textMonths } from 'src/calendar/configs';
import { CalendarEvent } from 'src/calendar/models/event.model';
import { backInlineBtn } from 'src/general';
import { getUserName } from 'src/libs/common';
import { User } from 'src/users/models/user.model';
import { getEventTexts } from '../assets';

export const eventRequestMessage = (event: CalendarEvent, owner: User) => {
  const { title, textDate, textStart, textEnd, textMembers } =
    getEventTexts(event);

  return `<b>Приглашение</b>

🗒 ${getUserName(
    owner,
  )} приглашает вас присоединиться к событию <b>"${title}"</b>

🗓 <b>Дата:</b> <code>${textDate}</code>
🕗 <b>Начало:</b> <code>${textStart}</code>
🕔 <b>Конец:</b> <code>${textEnd}</code>

👥 <b>Участники:</b> ${textMembers}`;
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
    backInlineBtn,
  ],
});
