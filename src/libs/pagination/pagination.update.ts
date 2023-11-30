import { Action, Update } from 'nestjs-telegraf';
import { GeneralMiddlewares } from 'src/general/general.middlewares';
import { PaginationService } from './pagination.service';
import { Context } from 'telegraf';
import { getCtxData } from '../common';

@Update()
export class PaginationUpdate {
  constructor(
    private readonly middlewares: GeneralMiddlewares,
    private readonly paginationService: PaginationService,
  ) {}

  @Action(/.*::pagination_nav_item/)
  async changePaginationPageBtn(ctx: Context) {
    const { dataValue, user, message } = getCtxData(ctx);
    const userTelegramId = user?.id;
    const [page, maxPage, type] = dataValue.split('-');

    const changedPage = type === 'next' ? +page + 1 : +page - 1;

    if (changedPage < 0 || changedPage + 1 > +maxPage) return;

    await this.middlewares.btnMiddleware(ctx, async (ctx: Context) => {
      const markup = [];
      const paginationMarkup = await this.paginationService.changePage({
        userTelegramId,
        page: changedPage ?? 0,
      });

      const initMarkup = message.reply_markup.inline_keyboard;
      let isAddedPagination = false;

      for (let btnsArr of initMarkup) {
        let isPaginRow = false;

        for (let btn of btnsArr) {
          if (
            btn.callback_data.slice(-7) === '__pagin' ||
            btn.callback_data.includes('pagination_')
          ) {
            isPaginRow = true;
          }
        }

        if (isPaginRow) {
          if (!isAddedPagination) {
            markup.push(...paginationMarkup);
            isAddedPagination = true;
          }
        } else {
          markup.push(btnsArr);
        }
      }

      await ctx.editMessageReplyMarkup({ inline_keyboard: markup });
    });
  }
}
