import { MenuService } from 'src/menu/menu.service';
import { Context } from 'telegraf';
import { getCtxData } from 'src/libs/common';
import { Action, Update } from 'nestjs-telegraf';
import { GeneralPresets } from './general.presets';
import { GeneralMiddlewares } from './general.middlewares';

@Update()
export class GeneralButtons {
  constructor(
    private readonly menuService: MenuService,
    private readonly generalPresets: GeneralPresets,
    private readonly middlewares: GeneralMiddlewares,
  ) {}

  @Action('back')
  async backBtn(ctx: Context) {
    await this.middlewares.btnMiddleware(ctx, (ctx: Context) =>
      this.menuService.changeToMenu(ctx),
    );
  }

  @Action('send_back')
  async sendBackBtn(ctx: Context) {
    await this.middlewares.btnMiddleware(ctx, (ctx: Context) =>
      this.menuService.sendMenu(ctx),
    );
  }

  @Action('back_with_clear')
  async backWithClearBtn(ctx: Context) {
    const { user } = getCtxData(ctx);
    // await clearUserListeners(user.id);
    await this.middlewares.btnMiddleware(ctx, (ctx: Context) =>
      this.menuService.changeToMenu(ctx),
    );
  }

  @Action('send_back_with_clear')
  async sendBackWithClearBtn(ctx: Context) {
    const { user } = getCtxData(ctx);
    // await clearUserListeners(user.id);
    await this.middlewares.btnMiddleware(ctx, (ctx: Context) =>
      this.menuService.sendMenu(ctx),
    );
  }

  @Action('close_message')
  async closeMessageBtn(ctx: Context) {
    await this.middlewares.btnMiddleware(ctx, async (ctx: Context) => {
      await ctx.deleteMessage();
    });
  }

  @Action('latter')
  async latterBtn(ctx: Context) {
    await this.middlewares.btnMiddleware(ctx, async (ctx: Context) => {
      await this.generalPresets.sendTempMessage({
        ctx,
        text: '⏳ <b>Скоро...</b>',
      });
    });
  }
}
