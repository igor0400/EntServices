import { Action, Update } from 'nestjs-telegraf';
import { ConstructorService } from './constructor.service';
import { Context } from 'telegraf';
import { GeneralMiddlewares } from 'src/general/general.middlewares';

@Update()
export class ConstructorUpdate {
  constructor(
    private readonly middlewares: GeneralMiddlewares,
    private readonly constructorService: ConstructorService,
  ) {}

  @Action('constructor_service')
  async constructorBtn(ctx: Context) {
    this.middlewares.btnMiddleware(ctx, (ctx: Context) =>
      this.constructorService.changeToCategories(ctx),
    );
  }
}
