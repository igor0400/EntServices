import { Injectable } from '@nestjs/common';
import { getCtxData } from 'src/libs/common';
import { MenuService } from 'src/menu/menu.service';
import { Context } from 'telegraf';
import { UsersRepository } from 'src/users/repositories/users.repository';

@Injectable()
export class StartService {
  constructor(
    private readonly menuService: MenuService,
    private readonly userRepository: UsersRepository,
  ) {}

  async sendStart(ctx: Context | any) {
    const { user } = getCtxData(ctx);
    const telegramId = user.id;
    const args = ctx.args;

    if (args.length) {
      // сделать сервис для обработки аргументов
      // args[0] это разные разделы
    }

    await this.userRepository.findOrCreate({
      where: { telegramId },
      defaults: {
        telegramId,
        firstName: user.first_name,
        lastName: user.last_name,
        userName: user.username,
      },
    });

    await this.menuService.sendMenu(ctx);
  }
}
