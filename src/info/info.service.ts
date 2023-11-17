import { Injectable } from '@nestjs/common';
import { Context } from 'telegraf';
import { infoMarkup, infoMessage } from './responses';

@Injectable()
export class InfoService {
  async changeToInfo(ctx: Context) {
    await ctx.editMessageCaption(infoMessage(), {
      parse_mode: 'HTML',
      reply_markup: infoMarkup,
    });
  }
}
