import { CalendarEvent } from 'src/calendar/models/event.model';
import { backInlineBtn } from '../../../general';
import { textMonths } from '../../configs';
import { getZero, slicedContinText } from 'src/libs/common';

interface CalendarDaysMarkup {
  userId: string;
  date: string;
  events: CalendarEvent[];
  isBusy: boolean;
}

export const calendarDaysMessage = (date: string) => {
  const splitDate = date.split('.');

  return `<b>События ${splitDate[0]} ${textMonths[+splitDate[1] - 1]}</b>

Как управлять делами и тд`;
};

export const calendarDaysMarkup = ({
  userId,
  date,
  events,
  isBusy = false,
}: CalendarDaysMarkup) => {
  const eventsBtns = getEventsBtns(events, date, isBusy);

  return {
    inline_keyboard: [
      ...eventsBtns,
      [
        {
          text: '🔗 Поделиться ссылкой',
          url: `https://t.me/share/url?url=https://t.me/EntServicesBot?start=cal-d-${date}-${userId}&text=%D0%92%D0%BE%D1%82%20%D1%81%D1%81%D1%8B%D0%BB%D0%BA%D0%B0%20%D0%BD%D0%B0%20%D0%BA%D0%B0%D0%BB%D0%B5%D0%BD%D0%B4%D0%B0%D1%80%D1%8C%20%D0%BC%D0%BE%D0%B5%D0%B9%20%D0%B7%D0%B0%D0%BD%D1%8F%D1%82%D0%BE%D1%81%D1%82%D0%B8`,
        },
      ],
      [{ text: '⬅️ Назад', callback_data: `${date}::back_to_month` }],
      backInlineBtn,
    ],
  };
};

function getEventsBtns(events: CalendarEvent[], date: string, isBusy: boolean) {
  const eventsBtns = [];

  if (isBusy) {
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
          text: `${eventFromTime} - ${eventTillTime} | ${slicedContinText(
            event.title,
            20,
          )}`,
          callback_data: `${event.id}::calendar_event`,
        },
      ]);
    }
  }

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

  return eventsBtns;
}
