import { Command, Update } from 'nestjs-telegraf';
import { Context } from 'telegraf';
import { MenuService } from './menu.service';

@Update()
export class MenuUpdate {
  constructor(private readonly menuService: MenuService) {}

  @Command('menu')
  async menuCommand(ctx: Context) {
    await this.menuService.sendMenu(ctx);
  }
}
