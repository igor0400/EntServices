import { Injectable } from '@nestjs/common';
import { Context } from 'telegraf';
import { selectCategoryMarkup, selectCategoryMessage } from './responses';

@Injectable()
export class ConstructorService {
  async changeToCategories(ctx: Context) {
    await ctx.editMessageCaption(selectCategoryMessage(), {
      reply_markup: selectCategoryMarkup,
      parse_mode: 'HTML',
    });
  }
}
