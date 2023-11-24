import { CalendarEvent } from '../models/event.model';

export const getFreeIntervals = (
  initDate: string | Date,
  events: CalendarEvent[],
) => {
  const date = new Date(initDate);
  const startOfDay = new Date(
    `${date.getUTCFullYear()}-${
      date.getUTCMonth() + 1
    }-${date.getUTCDate()}T00:00:00.000Z`,
  );
  const endOfDay = new Date(
    `${date.getUTCFullYear()}-${
      date.getUTCMonth() + 1
    }-${date.getUTCDate()}T23:59:59.999Z`,
  );

  if (!events.length) {
    return [{ from: startOfDay.toISOString(), till: endOfDay.toISOString() }];
  }

  const sortedEvents = events.sort((a, b) =>
    new Date(a.from) > new Date(b.from) ? 1 : -1,
  );

  const freeIntervals = [];

  if (startOfDay < new Date(sortedEvents[0]?.from)) {
    freeIntervals.push({
      from: startOfDay.toISOString(),
      till: sortedEvents[0].from,
    });
  }

  for (let i = 0; i < sortedEvents.length - 1; i++) {
    const currentEvent = new Date(events[i].till);
    const nextEvent = new Date(events[i + 1].from);

    if (currentEvent < nextEvent) {
      freeIntervals.push({
        from: currentEvent.toISOString(),
        till: nextEvent.toISOString(),
      });
    }
  }

  if (endOfDay > new Date(sortedEvents[sortedEvents?.length - 1]?.till)) {
    freeIntervals.push({
      from: sortedEvents[sortedEvents.length - 1].till,
      till: endOfDay.toISOString(),
    });
  }

  return freeIntervals;
};
