import { Injectable } from '@nestjs/common';
import { replyPhoto } from 'src/libs/common';
import { Context } from 'telegraf';
import { calendarMarkup, calendarMessage } from './responses';
import { getCtxData } from 'src/general';

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

  async navCalendarItem(ctx: Context, type: 'next' | 'prev') {
    const { data } = getCtxData(ctx);
    const mouthInt = +data.split('::')[0];

    await ctx.editMessageCaption(calendarMessage(), {
      reply_markup: calendarMarkup(
        type === 'prev' ? mouthInt - 1 : mouthInt + 1,
      ),
      parse_mode: 'HTML',
    });
  }
}
