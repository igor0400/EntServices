import { Action, Command, Update } from 'nestjs-telegraf';
import { EventsService } from './events.service';
import { Context } from 'telegraf';
import { GeneralMiddlewares } from 'src/general/general.middlewares';
import { EventsAdditionalService } from './events-additional.service';
import { getCtxData } from 'src/libs/common';

@Update()
export class EventsUpdate {
  constructor(
    private readonly middlewares: GeneralMiddlewares,
    private readonly eventsService: EventsService,
    private readonly eventsAdditionalService: EventsAdditionalService,
  ) {}

  @Action([
    /.*::create_personal_calendar_event/,
    /.*::back_to_pers_cal_event_start_time/,
  ])
  async createPersonalEventBtn(ctx: Context) {
    await this.middlewares.btnMiddleware(ctx, (ctx: Context) =>
      this.eventsAdditionalService.changeToSelectHours(ctx, {
        callbackDataTitle: 'pers_cal_event_start_time',
        type: 'start',
      }),
    );
  }

  @Action([
    /.*::pers_cal_event_start_time.*/,
    /.*::back_to_pers_cal_event_end_time/,
  ])
  async personalEventStartTimeBtn(ctx: Context) {
    const { dataValue } = getCtxData(ctx);

    await this.middlewares.btnMiddleware(ctx, (ctx: Context) =>
      this.eventsAdditionalService.changeToSelectHours(ctx, {
        callbackDataTitle: 'pers_cal_event_end_time',
        type: 'end',
        startTime: dataValue.split('-')[1],
      }),
    );
  }

  @Action(/.*::pers_cal_event_end_time.*/)
  async personalEventEndTimeBtn(ctx: Context) {
    await this.middlewares.btnMiddleware(ctx, (ctx: Context) =>
      this.eventsAdditionalService.changeToWriteTitle(ctx),
    );
  }

  @Action(/.*::skip_pers_cal_event_title/)
  async skipEventTitleBtn(ctx: Context) {
    await this.middlewares.btnMiddleware(ctx, (ctx: Context) =>
      this.eventsAdditionalService.skipWriteTitle(ctx),
    );
  }

  @Action(/.*::calendar_event/)
  async calendarEventBtn(ctx: Context) {
    const { dataValue } = getCtxData(ctx);

    await this.middlewares.btnMiddleware(ctx, (ctx: Context) =>
      this.eventsService.changeToEvent(ctx, dataValue),
    );
  }
}
