import { Injectable } from '@nestjs/common';
import { getCtxData, getZero } from 'src/libs/common';
import { Context } from 'telegraf';
import { selectEventHoursMarkup, selectEventHoursMessage } from './responses';
import { EventsMembersRepository } from '../repositories/event-member.repository';
import { CalendarEvent } from '../models/event.model';
import { getDateFromDataVal, getFreeIntervals } from '../assets';
import { filterEventsByDate } from './assets';

export interface ChangeToSelectHoursOpts {
  callbackDataTitle: string;
  type: 'start' | 'end';
  startTime?: string;
}

@Injectable()
export class EventsAdditionalService {
  constructor(
    private readonly eventsMembersRepository: EventsMembersRepository,
  ) {}

  async changeToSelectHours(ctx: Context, options: ChangeToSelectHoursOpts) {
    const { user: ctxUser, dataValue } = getCtxData(ctx);
    const dateVal = dataValue.split('-')[0];
    const userId = ctxUser.id;
    const eventsMembers = await this.eventsMembersRepository.findAll({
      where: {
        userTelegramId: userId,
      },
      include: [CalendarEvent],
    });
    const events = eventsMembers.map((i) => i.event);
    const sortedEvents = filterEventsByDate(events, dateVal);
    const initDate = getDateFromDataVal(dateVal);

    const optsEndTime =
      options.startTime && sortedEvents.length
        ? sortedEvents[0].startTime.replace(
            /T\d{2}:\d{2}/,
            `T${options.startTime.slice(0, options.startTime.length - 1)}1`,
          )
        : undefined;

    const optsStartTime = optsEndTime
      ? optsEndTime.replace(/T\d{2}:\d{2}/, `T00:00`)
      : undefined;

    // sortedEvents убирать те что раньше options.startTime

    const freeIntervals = getFreeIntervals(
      initDate,
      optsStartTime
        ? [
            ...sortedEvents,
            {
              creatorId: sortedEvents[0].creatorId,
              startTime: optsStartTime,
              endTime: optsEndTime,
              type: 'solo',
            },
          ]
        : sortedEvents,
    );

    console.log(options.startTime, optsStartTime, optsEndTime, freeIntervals);

    const hoursTexts = [];
    const hoursIntervals = [];

    for (let freeInterval of freeIntervals) {
      const startTime = new Date(freeInterval.startTime);
      const endTime = new Date(freeInterval.endTime);
      const startTimeHours = startTime.getUTCHours();
      const startTimeMinutes = startTime.getUTCMinutes();
      const endTimeHours = endTime.getUTCHours();
      const endTimeMinutes = endTime.getUTCMinutes();

      hoursIntervals.push({
        startHours: startTimeHours,
        startMinutes: startTimeMinutes,
        endHours: endTimeHours,
        endMinutes: endTimeMinutes,
      });
    }

    for (let {
      startHours,
      startMinutes,
      endHours,
      endMinutes,
    } of hoursIntervals) {
      for (let i = startHours; i < endHours + 1; i++) {
        if (i === startHours) {
          const useEndMinutes = endMinutes === 0 ? 60 : endMinutes;
          for (let x = startMinutes; x < useEndMinutes; x += 15) {
            hoursTexts.push(`${getZero(i)}:${getZero(x)}`);
          }
        } else {
          for (let x = 0; x < 60; x += 15) {
            hoursTexts.push(`${getZero(i)}:${getZero(x)}`);
          }
        }
      }
    }

    await ctx.editMessageCaption(selectEventHoursMessage(options), {
      reply_markup: selectEventHoursMarkup(dateVal, hoursTexts, options),
      parse_mode: 'HTML',
    });
  }
}
