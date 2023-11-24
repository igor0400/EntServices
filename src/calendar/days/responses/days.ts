import { CalendarEvent } from 'src/calendar/models/event.model';
import { backInlineBtn, formatKeyboard, getNowDate } from '../../../general';
import { textMonths } from '../../configs';
import { getDateFromDataVal, getFreeIntervals } from '../../assets';
import { slicedContinText } from 'src/libs/common';

interface CalendarDaysMarkup {
  userId: string;
  date: string;
  events: CalendarEvent[];
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
}: CalendarDaysMarkup) => {
  const newDate = getDateFromDataVal(date);

  // использовать при выводе времени при создании ивента
  const freeIntervals = getFreeIntervals(newDate, events);

  const eventsBtns = [];

  if (events.length === 0) {
    eventsBtns.push([
      { text: '📋 Список пуст', callback_data: 'empty_calendar_day_events' },
    ]);
  } else {
    for (let event of events) {
      const eventFrom = new Date(event.from);
      const eventTill = new Date(event.till);
      const eventFromTime = `${eventFrom.getUTCHours()}:${eventFrom.getUTCMinutes()}`;
      const eventTillTime = `${eventTill.getUTCHours()}:${eventTill.getUTCMinutes()}`;

      eventsBtns.push([
        {
          text: `${eventFromTime} - ${eventTillTime} | ${slicedContinText(
            event.title,
            10,
          )}`,
          callback_data: `${event.id}::calendar_event`,
        },
      ]);
    }
  }

  // сделать кнопку назад (к месяцу)

  return {
    inline_keyboard: [
      ...eventsBtns,
      [
        {
          text: '❌ Отметить недоступным',
          callback_data: `${date}::sey_busy_calendar_day`,
        },
      ],
      [
        { text: '◀️', callback_data: `${date}::prev_calendar_day` },
        { text: '▶️', callback_data: `${date}::next_calendar_day` },
      ],
      [
        {
          text: '🔗 Поделиться ссылкой',
          url: `https://t.me/share/url?url=https://t.me/EntServicesBot?start=cal-d-${date}-${userId}&text=%D0%92%D0%BE%D1%82%20%D1%81%D1%81%D1%8B%D0%BB%D0%BA%D0%B0%20%D0%BD%D0%B0%20%D0%BA%D0%B0%D0%BB%D0%B5%D0%BD%D0%B4%D0%B0%D1%80%D1%8C%20%D0%BC%D0%BE%D0%B5%D0%B9%20%D0%B7%D0%B0%D0%BD%D1%8F%D1%82%D0%BE%D1%81%D1%82%D0%B8`,
        },
      ],
      backInlineBtn,
    ],
  };
};
