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

  @Action(/.*::pers_cal_event_start_time/)
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

  @Command('create_event')
  async createEventsCommand(ctx: Context) {
    await this.middlewares.commandMiddleware(ctx, () =>
      this.eventsService.createEvent({
        creatorTgId: '861301267',
        membersTgIds: ['861301267'],
        title: 'Встреча в офисе',
        startTime: '2023-11-29T20:15:00.000Z',
        endTime: '2023-11-29T20:30:00.000Z',
      }),
    );
  }
}
