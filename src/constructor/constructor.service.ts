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
import { sendMessage } from 'src/general';

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
    await sendMessage(selectCategoryMessage(), {
      ctx,
      reply_markup: selectCategoryMarkup,
    });
  }

  async sendCategories(ctx: Context) {
    await sendMessage(selectCategoryMessage(), {
      ctx,
      reply_markup: selectCategoryMarkup,
      type: 'send',
    });
  }

  async changeToTypes(ctx: Context) {
    const { dataValue } = getCtxData(ctx);

    if (dataValue === 'places') {
      return await sendMessage(selectPlaceMessage(), {
        ctx,
        reply_markup: selectPlaceMarkup,
      });
    }

    await sendMessage(selectTypeMessage(), {
      ctx,
      reply_markup: selectTypeMarkup(dataValue),
    });
  }

  async changeToSiteStyle(ctx: Context) {
    const { dataValue } = getCtxData(ctx);
    const [category, type] = dataValue?.split('_');

    await sendMessage(selectSiteStyleMessage(), {
      ctx,
      reply_markup: selectSiteStyleMarkup(category),
    });
  }
}
