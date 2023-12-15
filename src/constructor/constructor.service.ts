import { Injectable } from '@nestjs/common';
import { Context } from 'telegraf';
import {
  selectCategoryMarkup,
  selectCategoryMessage,
  selectTypeMarkup,
  selectTypeMessage,
} from './responses';
import { getCtxData, replyPhoto } from 'src/libs/common';

@Injectable()
export class ConstructorService {
  async changeToStartConstructor(ctx: Context) {
    await this.changeToCategories(ctx);
  }

  async sendStartConstructor(ctx: Context) {
    await this.sendCategories(ctx);
  }

  async changeToCategories(ctx: Context) {
    await ctx.editMessageCaption(selectCategoryMessage(), {
      reply_markup: selectCategoryMarkup,
      parse_mode: 'HTML',
    });
  }

  async sendCategories(ctx: Context) {
    await ctx.sendPhoto(replyPhoto(), {
      caption: selectCategoryMessage(),
      reply_markup: selectCategoryMarkup,
      parse_mode: 'HTML',
    });
  }

  async changeToTypes(ctx: Context) {
    const { dataValue } = getCtxData(ctx);
    const category = dataValue?.replace('constructor_сategory_', '');

    await ctx.editMessageCaption(selectTypeMessage(), {
      reply_markup: selectTypeMarkup(category),
      parse_mode: 'HTML',
    });
  }
}
