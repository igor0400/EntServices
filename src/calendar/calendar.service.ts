import { Injectable } from '@nestjs/common';
import { replyPhoto } from 'src/libs/common';
import { Context } from 'telegraf';
import { calendarMarkup, calendarMessage } from './responses';
import { getCtxData } from 'src/general';
import { UsersRepository } from 'src/users/repositories/users.repository';

@Injectable()
export class CalendarService {
  constructor(private readonly userRepository: UsersRepository) {}

  async sendCalendar(ctx: Context) {
    const { user: ctxUser } = getCtxData(ctx);
    const user = await this.userRepository.findByTgId(ctxUser.id);

    await ctx.replyWithPhoto(replyPhoto(), {
      caption: calendarMessage(),
      reply_markup: calendarMarkup(user?.id),
      parse_mode: 'HTML',
    });
  }

  async changeToCalendar(ctx: Context) {
    const { user: ctxUser } = getCtxData(ctx);
    const user = await this.userRepository.findByTgId(ctxUser.id);

    await ctx.editMessageCaption(calendarMessage(), {
      reply_markup: calendarMarkup(user?.id),
      parse_mode: 'HTML',
    });
  }

  async navCalendarItem(ctx: Context, type: 'next' | 'prev') {
    const { data, user: ctxUser } = getCtxData(ctx);
    const mouthInt = +data.split('::')[0];
    const user = await this.userRepository.findByTgId(ctxUser.id);

    await ctx.editMessageCaption(calendarMessage(), {
      reply_markup: calendarMarkup(
        user?.id,
        type === 'prev' ? mouthInt - 1 : mouthInt + 1,
      ),
      parse_mode: 'HTML',
    });
  }
}
