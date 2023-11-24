import { Injectable } from '@nestjs/common';
import { getCtxData } from 'src/libs/common';
import { Context } from 'telegraf';
import { banMessage } from './responses';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class GeneralMiddlewares {
  constructor(private readonly usersService: UsersService) {}

  async btnMiddleware(ctx: Context, func: Function) {
    const { user } = getCtxData(ctx);
    const userId = user.id;
    const banUser = undefined;
    // const banUser = await getBanUserByUserId(userId);

    await this.usersService.updateUserNamesByCtx(ctx);

    if (banUser) {
      await ctx.editMessageCaption(banMessage(banUser.reason), {
        parse_mode: 'HTML',
      });
      return;
    }

    try {
      await func(ctx);
    } catch (e) {
      console.error('ERROR: ', e);
    }
  }

  async commandMiddleware(ctx: Context | any, func: Function) {
    const { user } = getCtxData(ctx);
    const userId = user.id;
    const banUser = undefined;
    // const banUser = await getBanUserByUserId(userId);

    if (ctx.command) {
      await this.usersService.updateUserNamesByCtx(ctx);
      // await clearUserListeners(userId);
    }

    if (banUser) {
      await ctx.reply(banMessage(banUser.reason), {
        parse_mode: 'HTML',
      });
      return;
    }

    try {
      await func(ctx);
    } catch (e) {
      console.error('ERROR: ', e);
    }
  }
}
