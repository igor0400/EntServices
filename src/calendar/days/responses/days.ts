import { CalendarEvent } from 'src/calendar/models/event.model';
import { backInlineBtn } from '../../../general';
import { textMonths } from '../../configs';
import { getZero } from 'src/libs/common';

interface CalendarDaysMarkup {
  userId: string;
  date: string;
  events: CalendarEvent[];
  isBusy: boolean;
}

export const calendarDaysMessage = (date: string) => {
  const splitDate = date.split('.');
  const textDate = `${+splitDate[0]} ${textMonths[+splitDate[1] - 1]}`;

  return `<b>События ${textDate}</b>

Как управлять делами и тд`;
};

export const calendarDaysMarkup = ({
  userId,
  date,
  events,
  isBusy = false,
}: CalendarDaysMarkup) => {
  const eventsBtns = getEventsBtns(events, date, isBusy);
  const splitDate = date.split('.');
  const textDate = `${splitDate[0]} ${textMonths[+splitDate[1] - 1]}`;

  return {
    inline_keyboard: [
      ...eventsBtns,
      [
        {
          text: '🔗 Поделиться ссылкой',
          url: encodeURI(
            `https://t.me/share/url?url=https://t.me/EntServicesBot?start=cal-d-${date.replaceAll(
              '.',
              '-',
            )}-${userId}&text=Вот ссылка на мою занятость ${textDate}`,
          ),
        },
      ],
      [{ text: '↩️ Назад', callback_data: `${date}::back_to_calendar_month` }],
      backInlineBtn,
    ],
  };
};

function getEventsBtns(events: CalendarEvent[], date: string, isBusy: boolean) {
  const eventsBtns = [];

  if (isBusy && events.length === 0) {
    return [
      [{ text: '❌ День недоступен', callback_data: 'busy_calendar_day' }],
      [
        {
          text: '✅ Отметить доступным',
          callback_data: `${date}::set_unbusy_calendar_day`,
        },
      ],
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
          callback_data: `${event.id}::calendar_event`,
        },
      ]);
    }
  }

  if (!isBusy) {
    eventsBtns.push(
      ...[
        [
          {
            text: '❌ Отметить недоступным',
            callback_data: `${date}::sey_busy_calendar_day`,
          },
        ],
        [
          {
            text: '📝 Создать событие',
            callback_data: `${date}::create_personal_calendar_event`,
          },
        ],
      ],
    );
  }

  return eventsBtns;
}
