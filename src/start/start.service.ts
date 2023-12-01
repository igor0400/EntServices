import { Injectable } from '@nestjs/common';
import { getCtxData } from 'src/libs/common';
import { MenuService } from 'src/menu/menu.service';
import { Context } from 'telegraf';

@Injectable()
export class StartService {
  constructor(private readonly menuService: MenuService) {}

  async sendStart(ctx: Context | any) {
    const { user } = getCtxData(ctx);
    const telegramId = user.id;
    const args = ctx.args;

    if (args.length) {
      // сделать сервис для обработки аргументов
      // args[0] это разные разделы
    }

    await ctx.reply('👋');
    await this.menuService.sendMenu(ctx);
  }
}
