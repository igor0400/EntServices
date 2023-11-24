import { Command, Update } from 'nestjs-telegraf';
import { EventsService } from './events.service';
import { Context } from 'telegraf';
import { GeneralMiddlewares } from 'src/general/general.middlewares';

@Update()
export class EventsUpdate {
  constructor(
    private readonly middlewares: GeneralMiddlewares,
    private readonly eventsService: EventsService,
  ) {}

  @Command('create_event')
  async createEventCommand(ctx: Context) {
    await this.middlewares.commandMiddleware(ctx, (ctx: Context) =>
      this.eventsService.createEvent({
        creatorTgId: '861301267',
        membersTgIds: ['861301267'],
        startTime: '2024-11-25T10:00:00.000Z',
        endTime: '2024-11-25T11:00:00.000Z',
      }),
    );
  }
}
