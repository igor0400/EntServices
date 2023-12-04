import { Action, Update } from 'nestjs-telegraf';
import { Context } from 'telegraf';
import { GeneralMiddlewares } from 'src/general/general.middlewares';
import { getCtxData, getNowDate } from 'src/libs/common';
import { getDateFromDataVal } from '../assets';
import { ShareCalendarMonthsService } from './share-months.service';

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
    const nowDate = getNowDate();
    const valDate = getDateFromDataVal(dataValue);
    const yearsDiff =
      12 * (valDate.getUTCFullYear() - nowDate.getUTCFullYear());
    const incMouth = valDate.getUTCMonth() - nowDate.getUTCMonth() + yearsDiff;

    await this.middlewares.btnMiddleware(ctx, (ctx: Context) =>
      this.shareMonthsService.changeToMouth(ctx, incMouth),
    );
  }
}
