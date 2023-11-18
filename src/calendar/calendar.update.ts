import { Action, Update } from 'nestjs-telegraf';
import { CalendarService } from './calendar.service';
import { Context } from 'telegraf';
import { GeneralMiddlewares } from 'src/general/general.middlewares';

@Update()
export class CalendarUpdate {
  constructor(
    private readonly calendarService: CalendarService,
    private readonly middlewares: GeneralMiddlewares,
  ) {}

  @Action('calendar')
  async calendarBtn(ctx: Context) {
    await this.middlewares.btnMiddleware(ctx, (ctx: Context) =>
      this.calendarService.changeToCalendar(ctx),
    );
  }
}
