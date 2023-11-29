import {
  CalendarEvent,
  CalendarEventCreationArgs,
} from '../models/event.model';

export const getFreeIntervals = (
  initDate: string | Date,
  events: CalendarEvent[] | CalendarEventCreationArgs[],
) => {
  const date = new Date(initDate);
  const startTimeOfDay = new Date(
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
    return [
      {
        startTime: startTimeOfDay.toISOString(),
        endTime: endOfDay.toISOString(),
      },
    ];
  }

  const sortedEvents = events.sort((a, b) =>
    new Date(a.startTime) > new Date(b.startTime) ? 1 : -1,
  );

  const freeIntervals = [];

  // console.log(sortedEvents);

  if (startTimeOfDay < new Date(sortedEvents[0]?.startTime)) {
    freeIntervals.push({
      startTime: startTimeOfDay.toISOString(),
      endTime: incMinute(sortedEvents[0].startTime),
    });
  }

  for (let i = 0; i < sortedEvents.length - 1; i++) {
    const currentEvent = new Date(events[i].endTime);
    const nextEvent = new Date(events[i + 1].startTime);

    console.log(currentEvent, nextEvent);

    if (currentEvent < nextEvent) {
      freeIntervals.push({
        startTime: currentEvent.toISOString(),
        endTime: incMinute(nextEvent),
      });
    }
  }

  if (endOfDay > new Date(sortedEvents[sortedEvents?.length - 1]?.endTime)) {
    freeIntervals.push({
      startTime: sortedEvents[sortedEvents.length - 1].endTime,
      endTime: endOfDay.toISOString(),
    });
  }

  return freeIntervals;
};

function incMinute(time: string | Date) {
  const date = new Date(time);
  date.setUTCMinutes(date.getUTCMinutes() - 1);
  return date.toISOString();
}
