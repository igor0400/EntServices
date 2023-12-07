import { On, Update } from 'nestjs-telegraf';
import { ListenersService } from './listeners.service';
import { Context } from 'telegraf';
import { GeneralMiddlewares } from 'src/general/general.middlewares';

@Update()
export class ListenersUpdate {
  constructor(
    private readonly middlewares: GeneralMiddlewares,
    private readonly listenersService: ListenersService,
  ) {}

  @On('text')
  async onMessage(ctx: Context) {
    await this.middlewares.listenerMiddleware(ctx, (ctx: Context) =>
      this.listenersService.onTextMessage(ctx),
    );
  }
}
