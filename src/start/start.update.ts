import { Ctx, Start, Update } from 'nestjs-telegraf';
import { MenuService } from '../menu/menu.service';
import { Context } from 'telegraf';

@Update()
export class StartUpdate {
  constructor(private readonly menuService: MenuService) {}

  @Start()
  async startCommand(@Ctx() ctx: Context) {
    await this.menuService.sendMenu(ctx);
  }
}
