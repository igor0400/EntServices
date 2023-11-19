import { Injectable } from '@nestjs/common';
import { replyPhoto } from 'src/libs/common';
import { Context } from 'telegraf';
import { calendarMarkup, calendarMessage, calendarV2Markup } from './responses';

@Injectable()
export class CalendarService {
  async sendCalendar(ctx: Context) {
    await ctx.replyWithPhoto(replyPhoto(), {
      caption: calendarMessage(),
      reply_markup: calendarMarkup(),
      parse_mode: 'HTML',
    });
  }

  async changeToCalendar(ctx: Context) {
    await ctx.editMessageCaption(calendarMessage(), {
      reply_markup: calendarMarkup(),
      parse_mode: 'HTML',
    });
  }

  async changeToCalendarV2(ctx: Context) {
    await ctx.editMessageCaption(calendarMessage(), {
      reply_markup: calendarV2Markup(),
      parse_mode: 'HTML',
    });
  }
}
