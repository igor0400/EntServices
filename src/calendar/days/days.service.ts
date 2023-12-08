import { Injectable } from '@nestjs/common';
import { Context } from 'telegraf';
import { calendarDaysMarkup, calendarDaysMessage } from './responses';
import { getCtxData, replyPhoto } from 'src/libs/common';
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

    await ctx.sendPhoto(replyPhoto(), {
      caption: calendarDaysMessage(date),
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

  async setDayBusy(ctx: Context) {
    const { dataValue, user: ctxUser } = getCtxData(ctx);

    await this.createBusyDayByDateVal({
      dateVal: dataValue,
      userTelegramId: ctxUser.id,
      type: 'manually',
    });

    await this.changeToCalendarDay(ctx, dataValue);
  }

  async deleteBusyDay(ctx: Context) {
    const { dataValue, user: ctxUser } = getCtxData(ctx);

    await this.deleteBusyDayByDateVal({
      dateVal: dataValue,
      userTelegramId: ctxUser.id,
    });

    await this.changeToCalendarDay(ctx, dataValue);
  }

  async createBusyDayByDateVal({
    dateVal,
    userTelegramId,
    type = 'auto',
  }: {
    dateVal: string;
    userTelegramId: string;
    type?: string;
  }) {
    const [date, month, year] = dateVal.split('.');
    const user = await this.usersRepository.findByTgId(userTelegramId);

    if (!user) return;

    const busyDay = await this.busyDaysRepository.create({
      userId: user.id,
      userTelegramId,
      date: +date,
      month: +month,
      year: +year,
      type,
    });

    return busyDay;
  }

  async deleteBusyDayByDateVal({
    dateVal,
    userTelegramId,
  }: {
    dateVal: string;
    userTelegramId: string;
  }) {
    const [date, month, year] = dateVal.split('.');
    const user = await this.usersRepository.findByTgId(userTelegramId);

    if (!user) return;

    const data = await this.busyDaysRepository.destroy({
      where: {
        userId: user.id,
        userTelegramId,
        date: +date,
        month: +month,
        year: +year,
      },
    });

    return data;
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
      busyDay,
    };
  }
}
