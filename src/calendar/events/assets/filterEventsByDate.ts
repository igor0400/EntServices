import { CalendarEvent } from 'src/calendar/models/event.model';

export const filterEventsByDate = (
  events: CalendarEvent[],
  dateVal: string,
) => {
  const [date, month, year] = dateVal.split('.');
  return events.filter((val) =>
    new RegExp(`${year}-${month}-${date}.*`).test(val?.startTime),
  );
};
