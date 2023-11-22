import { Action, Command, Update } from 'nestjs-telegraf';
import { CalendarMonthsService } from './months.service';
import { Context } from 'telegraf';
import { GeneralMiddlewares } from 'src/general/general.middlewares';

@Update()
export class CalendarMonthsUpdate {
  constructor(
    private readonly mouthsService: CalendarMonthsService,
    private readonly middlewares: GeneralMiddlewares,
  ) {}

  @Command('calendar')
  async calendarCommand(ctx: Context) {
    await this.middlewares.commandMiddleware(ctx, (ctx: Context) =>
      this.mouthsService.sendCalendarMouth(ctx),
    );
  }

  @Action('calendar_service')
  async calendarBtn(ctx: Context) {
    await this.middlewares.btnMiddleware(ctx, (ctx: Context) =>
      this.mouthsService.changeToCalendarMouth(ctx),
    );
  }

  @Action(/.*::next_calendar_mouth/)
  async nextCalendarMouthBtn(ctx: Context) {
    await this.middlewares.btnMiddleware(ctx, (ctx: Context) =>
      this.mouthsService.navCalendarMouthItem(ctx, 'next'),
    );
  }

  @Action(/.*::prev_calendar_mouth/)
  async prevCalendarMouthBtn(ctx: Context) {
    await this.middlewares.btnMiddleware(ctx, (ctx: Context) =>
      this.mouthsService.navCalendarMouthItem(ctx, 'prev'),
    );
  }
}
