import { Action, Update } from 'nestjs-telegraf';
import { CalendarDaysService } from './days.service';
import { Context } from 'telegraf';
import { GeneralMiddlewares } from 'src/general/general.middlewares';
import { getCtxData } from 'src/general';

@Update()
export class CalendarDaysUpdate {
  constructor(
    private readonly calendarDaysService: CalendarDaysService,
    private readonly middlewares: GeneralMiddlewares,
  ) {}

  @Action(/.*::calendar_date/)
  async calendarDayBtn(ctx: Context) {
    const { dataValue } = getCtxData(ctx);

    await this.middlewares.btnMiddleware(ctx, (ctx: Context) =>
      this.calendarDaysService.changeToCalendarDay(ctx, dataValue),
    );
  }
}
