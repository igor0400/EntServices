import { Injectable } from '@nestjs/common';
import { replyPhoto } from 'src/libs/common';
import { Context } from 'telegraf';
import { servicesMarkup, servicesMessage } from './responses';

@Injectable()
export class ServicesService {
  async sendServices(ctx: Context) {
    await ctx.replyWithPhoto(replyPhoto(), {
      caption: servicesMessage(),
      reply_markup: servicesMarkup,
      parse_mode: 'HTML',
    });
  }

  async changeToServices(ctx: Context) {
    await ctx.editMessageCaption(servicesMessage(), {
      reply_markup: servicesMarkup,
      parse_mode: 'HTML',
    });
  }
}
