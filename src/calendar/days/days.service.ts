import { Injectable } from '@nestjs/common';
import { Context } from 'telegraf';
import { calendarDaysMarkup, calendarDaysMessage } from './responses';
import { getCtxData } from 'src/libs/common';
import { EventsMembersRepository } from '../repositories/event-member.repository';
import { CalendarEvent } from '../models/event.model';
import { BusyDaysRepository } from '../repositories/busy-day.repository';
import { getDateFromDataVal } from '../assets';
import { filterEventsByDate } from '../events/assets';
import { UserRepository } from 'src/users/repositories/user.repository';

@Injectable()
export class CalendarDaysService {
  constructor(
    private readonly eventsMembersRepository: EventsMembersRepository,
    private readonly usersRepository: UserRepository,
    private readonly busyDaysRepository: BusyDaysRepository,
  ) {}

  async sendCalendarDay(ctx: Context, date: string) {
    const markupData = await this.getMarkupData(ctx, date);

    await ctx.editMessageCaption(calendarDaysMessage(date), {
      reply_markup: calendarDaysMarkup({ date, ...markupData }),
      parse_mode: 'HTML',
    });
  }

  async changeToCalendarDay(ctx: Context, date: string) {
    const markupData = await this.getMarkupData(ctx, date);

    await ctx.editMessageCaption(calendarDaysMessage(date), {
      reply_markup: calendarDaysMarkup({ date, ...markupData }),
      parse_mode: 'HTML',
    });
  }

  private async getMarkupData(ctx: Context, dateVal: string) {
    const { user: ctxUser } = getCtxData(ctx);
    const userTgId = ctxUser.id;
    const user = await this.usersRepository.findByTgId(userTgId);
    const userId = user.id;
    const eventMembers = await this.eventsMembersRepository.findAll({
      where: {
        userTelegramId: userTgId,
      },
      include: [CalendarEvent],
    });
    const date = getDateFromDataVal(dateVal);
    const busyDay = await this.busyDaysRepository.findOne({
      where: {
        userId,
        month: date.getUTCMonth() + 1,
        date: date.getUTCDate(),
      },
    });
    const sortedEvents = filterEventsByDate(
      eventMembers.map((i) => i.event),
      dateVal,
    );

    return {
      userId,
      events: sortedEvents,
      isBusy: busyDay ? true : false,
    };
  }
}
