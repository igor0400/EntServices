import { Action, Command, Update } from 'nestjs-telegraf';
import { CalendarMonthsService } from './months.service';
import { Context } from 'telegraf';
import { GeneralMiddlewares } from 'src/general/general.middlewares';
import { getCtxData, getNowDate } from 'src/libs/common';
import { getDateFromDataVal } from '../assets';
import { getMonthDifferenceByDateVal } from './assets';

@Update()
export class CalendarMonthsUpdate {
  constructor(
    private readonly mouthsService: CalendarMonthsService,
    private readonly middlewares: GeneralMiddlewares,
  ) {}

  @Command('calendar')
  async calendarCommand(ctx: Context) {
    await this.middlewares.commandMiddleware(ctx, (ctx: Context) =>
      this.mouthsService.sendMouth(ctx),
    );
  }

  @Action('calendar_service')
  async calendarBtn(ctx: Context) {
    await this.middlewares.btnMiddleware(ctx, (ctx: Context) =>
      this.mouthsService.changeToMouth(ctx),
    );
  }

  @Action(/.*::next_calendar_mouth/)
  async nextMouthBtn(ctx: Context) {
    await this.middlewares.btnMiddleware(ctx, (ctx: Context) =>
      this.mouthsService.navMouthItem(ctx, 'next'),
    );
  }

  @Action(/.*::prev_calendar_mouth/)
  async prevMouthBtn(ctx: Context) {
    await this.middlewares.btnMiddleware(ctx, (ctx: Context) =>
      this.mouthsService.navMouthItem(ctx, 'prev'),
    );
  }

  @Action(/.*::back_to_calendar_month/)
  async backToMonthBtn(ctx: Context) {
    const { dataValue } = getCtxData(ctx);
    const incMouths = getMonthDifferenceByDateVal(dataValue);

    await this.middlewares.btnMiddleware(ctx, (ctx: Context) =>
      this.mouthsService.changeToMouth(ctx, incMouths),
    );
  }
}
