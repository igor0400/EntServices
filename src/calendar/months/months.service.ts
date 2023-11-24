import { Injectable } from '@nestjs/common';
import { replyPhoto } from 'src/libs/common';
import { Context } from 'telegraf';
import { calendarMonthsMarkup, calendarMonthsMessage } from './responses';
import { getCtxData, getNowDate } from 'src/general';
import { UsersRepository } from 'src/users/repositories/users.repository';
import { BusyDaysRepository } from '../repositories/busy-day.repository';

@Injectable()
export class CalendarMonthsService {
  constructor(
    private readonly userRepository: UsersRepository,
    private readonly busyDaysRepository: BusyDaysRepository,
  ) {}

  async sendCalendarMouth(ctx: Context) {
    const { user: ctxUser } = getCtxData(ctx);
    const userId = ctxUser.id;
    const user = await this.userRepository.findByTgId(userId);
    const busyDays = await this.busyDaysRepository.findAll({
      where: {
        userId,
        month: getNowDate().getUTCMonth() + 1,
      },
    });

    await ctx.replyWithPhoto(replyPhoto(), {
      caption: calendarMonthsMessage(),
      reply_markup: calendarMonthsMarkup(user?.id, busyDays),
      parse_mode: 'HTML',
    });
  }

  async changeToCalendarMouth(ctx: Context) {
    const { user: ctxUser } = getCtxData(ctx);
    const userId = ctxUser.id;
    const user = await this.userRepository.findByTgId(userId);
    const busyDays = await this.busyDaysRepository.findAll({
      where: {
        userId,
        month: getNowDate().getUTCMonth() + 1,
      },
    });

    await ctx.editMessageCaption(calendarMonthsMessage(), {
      reply_markup: calendarMonthsMarkup(user?.id, busyDays),
      parse_mode: 'HTML',
    });
  }

  async navCalendarMouthItem(ctx: Context, type: 'next' | 'prev') {
    const { data, user: ctxUser } = getCtxData(ctx);
    const mouthInt = +data.split('::')[0];
    const userId = ctxUser.id;
    const user = await this.userRepository.findByTgId(userId);
    const incMouth = type === 'prev' ? mouthInt - 1 : mouthInt + 1;
    const busyDays = await this.busyDaysRepository.findAll({
      where: {
        userId,
        month: getNowDate().getUTCMonth() + 1 + incMouth,
      },
    });

    await ctx.editMessageCaption(calendarMonthsMessage(), {
      reply_markup: calendarMonthsMarkup(user?.id, busyDays, incMouth),
      parse_mode: 'HTML',
    });
  }
}
