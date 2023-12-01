import { textMonths } from 'src/calendar/configs';
import { CalendarEvent } from 'src/calendar/models/event.model';
import { backInlineBtn } from 'src/general';
import { getUserName, getZero } from 'src/libs/common';

export const eventMessage = (event: CalendarEvent) => {
  const startDate = new Date(event.startTime);

  const title = event.title ? event.title : 'Событие';

  const textDate = `${startDate.getUTCDate()} ${
    textMonths[startDate.getUTCMonth()]
  } ${startDate.getUTCFullYear()}`;
  const textStart = event.startTime?.split('T')[1]?.slice(0, 5);
  const textEnd = event.endTime?.split('T')[1]?.slice(0, 5);

  const members = [];

  for (let { user } of event.members) {
    members.push(getUserName(user));
  }

  return `<b>${title}</b>

🗓 <b>Дата:</b> <code>${textDate}</code>
🕗 <b>Начало:</b> <code>${textStart}</code>
🕔 <b>Конец:</b> <code>${textEnd}</code>

👥 <b>Участники:</b> ${members.join(', ')}`;
};

export const eventMarkup = (event: CalendarEvent) => {
  const startDate = new Date(event?.startTime);
  const textDate = `${startDate.getUTCDate()} ${
    textMonths[startDate.getUTCMonth()]
  }`;

  // Удалить событие сначала подтверждение

  return {
    inline_keyboard: [
      [
        {
          text: '🔗 Пригласить',
          url: `${encodeURI(
            `https://t.me/share/url?url=https://t.me/EntServicesBot?start=cal-add-em-${event.id}&text=Приглашение присоединиться к событию ${textDate}`,
          )}`,
        },
      ],
      [
        {
          text: '🗑 Удалить событие',
          callback_data: `${event.id}::delete_calendar_event`,
        },
      ],
      [
        {
          text: '↩️ Назад',
          callback_data: `${getZero(startDate.getUTCDate())}.${getZero(
            startDate.getUTCMonth() + 1,
          )}.${startDate.getUTCFullYear()}::back_to_calendar_date`,
        },
      ],
      backInlineBtn,
    ],
  };
};
