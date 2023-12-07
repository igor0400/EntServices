import { textMonths } from 'src/calendar/configs';
import { CalendarEvent } from 'src/calendar/models/event.model';
import { backInlineBtn, getDayDate } from 'src/general';
import { getEventTexts } from '../assets';

export const eventMessage = (event: CalendarEvent) => {
  const { title, textDate, textStart, textEnd, textMembers } =
    getEventTexts(event);

  return `<b>${title}</b>

🗓 <b>Дата:</b> <code>${textDate}</code>
🕗 <b>Начало:</b> <code>${textStart}</code>
🕔 <b>Конец:</b> <code>${textEnd}</code>

👥 <b>Участники:</b> ${textMembers}`;
};

export const eventMarkup = (
  event: CalendarEvent,
  type: 'owner' | 'inviter' = 'owner',
  inviterId?: string,
) => {
  const startDate = new Date(event?.startTime);
  const textDate = `${startDate.getUTCDate()} ${
    textMonths[startDate.getUTCMonth()]
  }`;
  const deleteBtn =
    type === 'owner'
      ? [
          {
            text: '🗑 Удалить событие',
            callback_data: `${event.id}::delete_calendar_event_confirm`,
          },
        ]
      : [
          {
            text: '🏃 Покинуть событие',
            callback_data: `${event.id}::leave_calendar_event_confirm`,
          },
        ];

  const backDateBtn = inviterId
    ? [
        {
          text: '↩️ Назад',
          callback_data: `${getDayDate(
            startDate,
          )}_${inviterId}::back_to_share_calendar_date`,
        },
      ]
    : [
        {
          text: '↩️ Назад',
          callback_data: `${getDayDate(startDate)}::back_to_calendar_date`,
        },
      ];

  return {
    inline_keyboard: [
      [
        {
          text: '🔗 Пригласить',
          url: `${encodeURI(
            `https://t.me/share/url?url=https://t.me/EntServicesBot?start=cal-e-j-${event.id}&text=Приглашение присоединиться к событию ${textDate}`,
          )}`,
        },
      ],
      deleteBtn,
      backDateBtn,
      backInlineBtn,
    ],
  };
};
