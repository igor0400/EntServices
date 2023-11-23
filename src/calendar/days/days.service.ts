import { Injectable } from '@nestjs/common';
import { Context } from 'telegraf';
import { calendarDaysMarkup, calendarDaysMessage } from './responses';
import { getCtxData } from 'src/general';

@Injectable()
export class CalendarDaysService {
  async sendCalendarDay(ctx: Context, date: string) {
    const { user } = getCtxData(ctx);
    const userId = user.id;

    await ctx.editMessageCaption(calendarDaysMessage(date), {
      reply_markup: calendarDaysMarkup(userId, date),
      parse_mode: 'HTML',
    });
  }

  async changeToCalendarDay(ctx: Context, date: string) {
    const { user } = getCtxData(ctx);
    const userId = user.id;

    await ctx.editMessageCaption(calendarDaysMessage(date), {
      reply_markup: calendarDaysMarkup(userId, date),
      parse_mode: 'HTML',
    });
  }
}
