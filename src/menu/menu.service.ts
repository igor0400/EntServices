import { Injectable } from '@nestjs/common';
import { Ctx } from 'nestjs-telegraf';
import { Context } from 'telegraf';
import { menuMarkup, menuMessage } from './responses';
import { replyPhoto } from 'src/libs/common';

@Injectable()
export class MenuService {
  async sendMenu(@Ctx() ctx: Context) {
    await ctx.replyWithPhoto(replyPhoto(), {
      caption: menuMessage(),
      reply_markup: menuMarkup,
      parse_mode: 'HTML',
    });
  }

  async changeToMenu(@Ctx() ctx: Context) {
    await ctx.editMessageCaption(menuMessage(), {
      reply_markup: menuMarkup,
      parse_mode: 'HTML',
    });
  }
}
