import { Injectable } from '@nestjs/common';
import { Context } from 'telegraf';
import {
  selectCategoryMarkup,
  selectCategoryMessage,
  selectPlaceMarkup,
  selectPlaceMessage,
  selectSiteStyleMarkup,
  selectSiteStyleMessage,
  selectTypeMarkup,
  selectTypeMessage,
} from './responses';
import { getCtxData, replyPhoto } from 'src/libs/common';

// введите название (chain) -> мб введите слоган -> введите описание -> загрузите товары (exel, еще что то, в ручную)
// [{ text: '💭 Сгенерировать ИИ', callback_data: aiBtnData }];

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

    if (dataValue === 'places') {
      return await ctx.editMessageCaption(selectPlaceMessage(), {
        reply_markup: selectPlaceMarkup,
        parse_mode: 'HTML',
      });
    }

    await ctx.editMessageCaption(selectTypeMessage(), {
      reply_markup: selectTypeMarkup(dataValue),
      parse_mode: 'HTML',
    });
  }

  async changeToSiteStyle(ctx: Context) {
    const { dataValue } = getCtxData(ctx);
    const [category, type] = dataValue?.split('_');

    await ctx.editMessageCaption(selectSiteStyleMessage(), {
      reply_markup: selectSiteStyleMarkup(category),
      parse_mode: 'HTML',
    });
  }
}
