import { Action, Command, Update } from 'nestjs-telegraf';
import { CalendarService } from './calendar.service';
import { Context } from 'telegraf';
import { GeneralMiddlewares } from 'src/general/general.middlewares';

@Update()
export class CalendarUpdate {
  constructor(
    private readonly calendarService: CalendarService,
    private readonly middlewares: GeneralMiddlewares,
  ) {}

  @Command('calendar')
  async calendarCommand(ctx: Context) {
    await this.middlewares.commandMiddleware(ctx, (ctx: Context) =>
      this.calendarService.sendCalendar(ctx),
    );
  }

  @Action('calendar')
  async calendarBtn(ctx: Context) {
    await this.middlewares.btnMiddleware(ctx, (ctx: Context) =>
      this.calendarService.changeToCalendar(ctx),
    );
  }

  @Action('calendar_v2')
  async calendarV2Btn(ctx: Context) {
    await this.middlewares.btnMiddleware(ctx, (ctx: Context) =>
      this.calendarService.changeToCalendarV2(ctx),
    );
  }
}
