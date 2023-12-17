import { Action, Command, Update } from 'nestjs-telegraf';
import { ConstructorService } from './constructor.service';
import { Context } from 'telegraf';
import { GeneralMiddlewares } from 'src/general/general.middlewares';

@Update()
export class ConstructorUpdate {
  constructor(
    private readonly middlewares: GeneralMiddlewares,
    private readonly constructorService: ConstructorService,
  ) {}

  @Command('constructor')
  async constructorCommand(ctx: Context) {
    await this.middlewares.commandMiddleware(ctx, (ctx: Context) =>
      this.constructorService.sendStartConstructor(ctx),
    );
  }

  @Action(['constructor_service', 'back_to_constructor'])
  async constructorBtn(ctx: Context) {
    await this.middlewares.btnMiddleware(ctx, (ctx: Context) =>
      this.constructorService.changeToStartConstructor(ctx),
    );
  }

  @Action([/.*::constructor_type/, /.*::back_to_constructor_type/])
  async constructorCategoryShopBtn(ctx: Context) {
    await this.middlewares.btnMiddleware(ctx, (ctx: Context) =>
      this.constructorService.changeToTypes(ctx),
    );
  }

  @Action(/.*site::constructor_local_settings/)
  async constructorTypeShopBtn(ctx: Context) {
    await this.middlewares.btnMiddleware(ctx, (ctx: Context) =>
      this.constructorService.changeToSiteStyle(ctx),
    );
  }
}
