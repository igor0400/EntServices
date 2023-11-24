import { Injectable } from '@nestjs/common';
import { Context } from 'telegraf';
import { calendarDaysMarkup, calendarDaysMessage } from './responses';
import { getCtxData } from 'src/general';
import { UsersRepository } from 'src/users/repositories/users.repository';
import { EventsMembersRepository } from '../repositories/event-member.repository';
import { CalendarEvent } from '../models/event.model';

@Injectable()
export class CalendarDaysService {
  constructor(
    private readonly eventsMembersRepository: EventsMembersRepository,
    private readonly usersRepository: UsersRepository,
  ) {}

  async sendCalendarDay(ctx: Context, date: string) {
    const markupData = await this.getMarkupData(ctx);

    await ctx.editMessageCaption(calendarDaysMessage(date), {
      reply_markup: calendarDaysMarkup({ date, ...markupData }),
      parse_mode: 'HTML',
    });
  }

  async changeToCalendarDay(ctx: Context, date: string) {
    const markupData = await this.getMarkupData(ctx);

    await ctx.editMessageCaption(calendarDaysMessage(date), {
      reply_markup: calendarDaysMarkup({ date, ...markupData }),
      parse_mode: 'HTML',
    });
  }

  private async getMarkupData(ctx: Context) {
    const { user: ctxUser } = getCtxData(ctx);
    const userTgId = ctxUser.id;
    const user = await this.usersRepository.findByTgId(userTgId);
    const userId = user.id;
    const events = await this.eventsMembersRepository.findAll({
      where: {
        userTelegramId: userTgId,
      },
      include: [CalendarEvent],
    });

    return { userId, events: events.map((i) => i.event) };
  }
}
