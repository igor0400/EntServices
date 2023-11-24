import { Injectable } from '@nestjs/common';
import { replyPhoto } from 'src/libs/common';
import { Context } from 'telegraf';
import { calendarMonthsMarkup, calendarMonthsMessage } from './responses';
import { getCtxData, getNowDate } from 'src/libs/common';
import { UsersRepository } from 'src/users/repositories/users.repository';
import { BusyDaysRepository } from '../repositories/busy-day.repository';

@Injectable()
export class CalendarMonthsService {
  constructor(
    private readonly userRepository: UsersRepository,
    private readonly busyDaysRepository: BusyDaysRepository,
  ) {}

  async sendCalendarMouth(ctx: Context, incMouth: number = 0) {
    await this.sendContent(ctx, incMouth, true);
  }

  async changeToCalendarMouth(ctx: Context, incMouth: number = 0) {
    await this.sendContent(ctx, incMouth, false);
  }

  async navCalendarMouthItem(ctx: Context, type: 'next' | 'prev') {
    const { data } = getCtxData(ctx);
    const mouthInt = +data.split('::')[0];
    const incMouth = type === 'prev' ? mouthInt - 1 : mouthInt + 1;

    await this.sendContent(ctx, incMouth, false);
  }

  private async sendContent(
    ctx: Context,
    incMouth: number = 0,
    isSend: boolean = true,
  ) {
    const { user: ctxUser } = getCtxData(ctx);
    const userId = ctxUser.id;
    const user = await this.userRepository.findByTgId(userId);
    const busyDays = await this.busyDaysRepository.findAll({
      where: {
        userId,
        month: getNowDate().getUTCMonth() + 1 + incMouth,
      },
    });

    if (isSend) {
      await ctx.replyWithPhoto(replyPhoto(), {
        caption: calendarMonthsMessage(),
        reply_markup: calendarMonthsMarkup(user?.id, busyDays, incMouth),
        parse_mode: 'HTML',
      });
    } else {
      await ctx.editMessageCaption(calendarMonthsMessage(), {
        reply_markup: calendarMonthsMarkup(user?.id, busyDays, incMouth),
        parse_mode: 'HTML',
      });
    }
  }
}
