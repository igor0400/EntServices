import { Action, Update } from 'nestjs-telegraf';
import { Context } from 'telegraf';
import { GeneralMiddlewares } from 'src/general/general.middlewares';
import { getCtxData } from 'src/libs/common';
import { ShareCalendarMonthsService } from './share-months.service';
import { getMonthDifferenceByDateVal } from './assets';

@Update()
export class ShareCalendarMonthsUpdate {
  constructor(
    private readonly shareMonthsService: ShareCalendarMonthsService,
    private readonly middlewares: GeneralMiddlewares,
  ) {}

  @Action(/.*::next_share_calendar_mouth/)
  async nextMouthBtn(ctx: Context) {
    await this.middlewares.btnMiddleware(ctx, (ctx: Context) =>
      this.shareMonthsService.navMouthItem(ctx, 'next'),
    );
  }

  @Action(/.*::prev_share_calendar_mouth/)
  async prevMouthBtn(ctx: Context) {
    await this.middlewares.btnMiddleware(ctx, (ctx: Context) =>
      this.shareMonthsService.navMouthItem(ctx, 'prev'),
    );
  }

  @Action(/.*::back_to_share_calendar_month/)
  async backToMonthBtn(ctx: Context) {
    const { dataValue } = getCtxData(ctx);
    const [date, userId] = dataValue.split('_');
    const incMouths = getMonthDifferenceByDateVal(date);

    await this.middlewares.btnMiddleware(ctx, (ctx: Context) =>
      this.shareMonthsService.changeToMouth(ctx, userId, incMouths),
    );
  }
}
