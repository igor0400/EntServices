import { Injectable } from '@nestjs/common';
import { getCtxData, getZero } from 'src/libs/common';
import { Context } from 'telegraf';
import {
  selectEventHoursMarkup,
  selectEventHoursMessage,
  writeTitleMarkup,
  writeTitleMessage,
} from './responses';
import { EventsMembersRepository } from '../repositories/event-member.repository';
import { CalendarEvent } from '../models/event.model';
import { getDateFromDataVal, getFreeIntervals } from '../assets';
import { filterEventsByDate } from './assets';
import { CreatePaginationProps, PaginationService } from 'src/libs/pagination';

export interface ChangeToSelectHoursOpts {
  callbackDataTitle: string;
  type: 'start' | 'end';
  startTime?: string;
}

@Injectable()
export class EventsAdditionalService {
  constructor(
    private readonly eventsMembersRepository: EventsMembersRepository,
    private readonly paginationService: PaginationService,
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
    const freeIntervals = getFreeIntervals(
      initDate,
      sortedEvents,
      options.type === 'start' ? 0 : 1,
    );

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
          for (let x = startMinutes; x < 60; x += 15) {
            hoursTexts.push(`${getZero(i)}:${getZero(x)}`);
          }
        } else if (i === endHours) {
          for (let x = 0; x < endMinutes; x += 15) {
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

    const markup = await selectEventHoursMarkup(
      dateVal,
      sortedHoursTexts,
      options,
      async (conf: Omit<CreatePaginationProps, 'userTelegramId'>) => {
        return await this.paginationService.create({
          userTelegramId: userId,
          ...conf,
        });
      },
    );

    await ctx.editMessageCaption(selectEventHoursMessage(options), {
      reply_markup: markup,
      parse_mode: 'HTML',
    });
  }

  async changeToWriteTitle(ctx: Context) {
    const { dataValue } = getCtxData(ctx);

    // создавать textWaiter
    // создавать event при скипе названия и в textWaiter

    console.log(dataValue);

    await ctx.editMessageCaption(writeTitleMessage(), {
      parse_mode: 'HTML',
      reply_markup: writeTitleMarkup(dataValue),
    });
  }
}
