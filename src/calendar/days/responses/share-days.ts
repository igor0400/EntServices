import { CalendarEvent } from 'src/calendar/models/event.model';
import { backInlineBtn, localBackInlineBtn } from '../../../general';
import { textMonths } from '../../configs';
import { getUserName, getZero } from 'src/libs/common';
import { CalendarBusyDay } from 'src/calendar/models/busy-day.model';
import { User } from 'src/users/models/user.model';

interface CalendarDaysMarkup {
  userId: string;
  date: string;
  events: CalendarEvent[];
  busyDay: CalendarBusyDay | undefined;
}

export const shareCalendarDaysMessage = (date: string, user: User) => {
  const splitDate = date.split('.');
  const textDate = `${+splitDate[0]} ${textMonths[+splitDate[1] - 1]}`;

  return `<b>События ${textDate}</b>

👇 Чтобы назначить встречу с ${getUserName(user)}, создайте событие ниже.`;
};

export const shareCalendarDaysMarkup = ({
  userId,
  date,
  events,
  busyDay,
}: CalendarDaysMarkup) => {
  const eventsBtns = getEventsBtns(events, date, busyDay, userId);

  return {
    inline_keyboard: [
      ...eventsBtns,
      localBackInlineBtn(`${date}_${userId}::back_to_share_calendar_month`),
      backInlineBtn,
    ],
  };
};

function getEventsBtns(
  events: CalendarEvent[],
  date: string,
  busyDay: CalendarBusyDay,
  userId: string,
) {
  const eventsBtns = [];

  if (busyDay && events.length === 0) {
    return [
      [{ text: '❌ День недоступен', callback_data: 'busy_calendar_day' }],
    ];
  }

  if (events.length === 0) {
    eventsBtns.push([
      { text: '📋 Список пуст', callback_data: 'empty_calendar_day_events' },
    ]);
  } else {
    for (let event of events) {
      const eventFrom = new Date(event.startTime);
      const eventTill = new Date(event.endTime);
      const eventFromTime = `${getZero(eventFrom.getUTCHours())}:${getZero(
        eventFrom.getUTCMinutes(),
      )}`;
      const eventTillTime = `${getZero(eventTill.getUTCHours())}:${getZero(
        eventTill.getUTCMinutes(),
      )}`;

      eventsBtns.push([
        {
          text: `${eventFromTime} - ${eventTillTime}${
            event.title ? ` | ${event.title}` : ''
          }`,
          callback_data: `${event.id}::share_calendar_event`,
        },
      ]);
    }
  }

  if (busyDay?.type === 'manually') {
    eventsBtns.push([
      { text: '❌ День недоступен', callback_data: 'busy_calendar_day' },
    ]);
  }

  if (!busyDay) {
    eventsBtns.push([
      {
        text: '📝 Создать событие',
        callback_data: `${date}_${userId}::create_share_calendar_event`,
      },
    ]);
  }

  return eventsBtns;
}
