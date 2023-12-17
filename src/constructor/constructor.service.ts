import { Injectable } from '@nestjs/common';
import { Context } from 'telegraf';
import {
  selectCategoryMarkup,
  selectCategoryMessage,
  selectLocalSettingsMarkup,
  selectLocalSettingsMessage,
  selectPlaceMarkup,
  selectPlaceMessage,
  selectTypeMarkup,
  selectTypeMessage,
} from './responses';
import { getCtxData, replyPhoto } from 'src/libs/common';

// стиль: модерн, классический... -> введите название (chain) -> введите описание -> мб введите слоган -> загрузите товары (exel, еще что то, в ручную)

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

  async changeToLocalSettings(ctx: Context) {
    const { dataValue } = getCtxData(ctx);
    const [type, category] = dataValue?.split(':');

    // сделать шаблон что передавать при каком типе и категории

    await ctx.editMessageCaption(selectLocalSettingsMessage(), {
      reply_markup: selectLocalSettingsMarkup(type, category),
      parse_mode: 'HTML',
    });
  }
}
