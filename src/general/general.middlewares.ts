import { Injectable } from '@nestjs/common';
import { getCtxData, replyPhoto } from 'src/libs/common';
import { Context } from 'telegraf';
import { banMarkup, banMessage } from './responses';
import { UsersService } from 'src/users/users.service';
import { ListenersService } from 'src/listeners/listeners.service';
import { UserRepository } from 'src/users/repositories/user.repository';
import { BanUserRepository } from 'src/bans/repositories/ban-user.repository';

@Injectable()
export class GeneralMiddlewares {
  constructor(
    private readonly usersService: UsersService,
    private readonly listenersService: ListenersService,
    private readonly userRepository: UserRepository,
    private readonly banUserRepository: BanUserRepository,
  ) {}

  async btnMiddleware(ctx: Context, func: Function) {
    await this.allActions(ctx, func, 'edit');
  }

  async commandMiddleware(ctx: Context | any, func: Function) {
    await this.allActions(ctx, func, 'send');
  }

  async listenerMiddleware(ctx: Context | any, func: Function) {
    await this.defaultActions(ctx, func, 'send');
  }

  private async allActions(
    ctx: Context | any,
    func: Function,
    type: 'send' | 'edit',
  ) {
    const { user } = getCtxData(ctx);
    const userTgId = user.id;

    await this.usersService.updateUserNamesByCtx(ctx);
    await this.listenersService.clearUserListeners(userTgId);

    await this.defaultActions(ctx, func, type);
  }

  private async defaultActions(
    ctx: Context | any,
    func: Function,
    type: 'send' | 'edit',
  ) {
    const { user } = getCtxData(ctx);
    const userTgId = user.id;

    const banUser = await this.banUserRepository.findOne({
      where: { userTelegramId: userTgId },
    });

    if (banUser) {
      if (type === 'edit') {
        await ctx.editMessageCaption(banMessage(banUser.reason), {
          reply_markup: banMarkup,
          parse_mode: 'HTML',
        });
      } else {
        await ctx.replyWithPhoto(replyPhoto(), {
          caption: banMessage(banUser.reason),
          reply_markup: banMarkup,
          parse_mode: 'HTML',
        });
      }

      return;
    }

    await this.userRepository.findOrCreate({
      where: { telegramId: userTgId },
      defaults: {
        telegramId: userTgId,
        firstName: user.first_name,
        lastName: user.last_name,
        userName: user.username,
      },
    });

    try {
      await func(ctx);
    } catch (e) {
      console.error('ERROR: ', e);
    }
  }
}
