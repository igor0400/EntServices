import { Injectable } from '@nestjs/common';
import { replyPhoto } from 'src/libs/common';
import { Context } from 'telegraf';
import {
  shareCalendarMonthsMessage,
  shareCalendarMonthsMarkup,
} from './responses';
import { getCtxData, getNowDate } from 'src/libs/common';
import { BusyDaysRepository } from '../repositories/busy-day.repository';
import { UserRepository } from 'src/users/repositories/user.repository';

@Injectable()
export class ShareCalendarMonthsService {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly busyDaysRepository: BusyDaysRepository,
  ) {}

  async sendMouth(ctx: Context, userId: string, incMouth: number = 0) {
    await this.sendContent(ctx, userId, incMouth, true);
  }

  async changeToMouth(ctx: Context, userId: string, incMouth: number = 0) {
    await this.sendContent(ctx, userId, incMouth, false);
  }

  async navMouthItem(ctx: Context, type: 'next' | 'prev') {
    const { dataValue } = getCtxData(ctx);
    const splitData = dataValue.split('_');
    const mouthInt = +splitData[0];
    const incMouth = type === 'prev' ? mouthInt - 1 : mouthInt + 1;

    await this.sendContent(ctx, splitData[1], incMouth, false);
  }

  private async sendContent(
    ctx: Context,
    userId: string,
    incMouth: number = 0,
    isSend: boolean = true,
  ) {
    const user = await this.userRepository.findByPk(userId);
    const busyDays = await this.busyDaysRepository.findAll({
      where: {
        userId: user.id,
        month: getNowDate().getUTCMonth() + 1 + incMouth,
      },
    });

    if (isSend) {
      await ctx.replyWithPhoto(replyPhoto(), {
        caption: shareCalendarMonthsMessage(user),
        reply_markup: shareCalendarMonthsMarkup(user?.id, busyDays, incMouth),
        parse_mode: 'HTML',
      });
    } else {
      await ctx.editMessageCaption(shareCalendarMonthsMessage(user), {
        reply_markup: shareCalendarMonthsMarkup(user?.id, busyDays, incMouth),
        parse_mode: 'HTML',
      });
    }
  }
}
