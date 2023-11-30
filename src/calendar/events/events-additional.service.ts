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
    const freeIntervals = getFreeIntervals(initDate, sortedEvents);

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

    const sortedHoursTexts = options.startTime
      ? hoursTexts.filter((i) => {
          const splI = i.split(':');
          const hours = +splI[0];
          const minutes = +splI[1];
          const splStart = options.startTime.split(':');
          const startHours = +splStart[0];
          const startMinutes = +splStart[1];

          if (hours < startHours) return false;

          if (hours === startHours) {
            if (minutes > startMinutes) return true;

            return false;
          }

          return true;
        })
      : hoursTexts;

    await ctx.editMessageCaption(selectEventHoursMessage(options), {
      reply_markup: selectEventHoursMarkup(dateVal, sortedHoursTexts, options),
      parse_mode: 'HTML',
    });
  }
}
