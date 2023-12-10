import { Injectable } from '@nestjs/common';
import { getCtxData, replyPhoto } from 'src/libs/common';
import { Context } from 'telegraf';
import { profileMarkup, profileMessage } from './responses';
import { UserRepository } from 'src/users/repositories/user.repository';
import { BasicNotificationRepository } from 'src/notifications/repositories/basic-notification.repository';

@Injectable()
export class ProfileService {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly basicNotificationRepository: BasicNotificationRepository,
  ) {}

  async sendProfile(ctx: Context) {
    await this.profileDefaultHandler(ctx, 'send');
  }

  async changeToProfile(ctx: Context) {
    await this.profileDefaultHandler(ctx, 'change');
  }

  private async profileDefaultHandler(
    ctx: Context,
    type: 'change' | 'send' = 'send',
  ) {
    const { user: ctxUser } = getCtxData(ctx);
    const userTgId = ctxUser.id;
    const user = await this.userRepository.findByTgId(userTgId);
    const notifications = await this.basicNotificationRepository.findAll({
      where: { userTelegramId: userTgId },
    });
    const isFull = Boolean(notifications?.length);

    if (type === 'change') {
      await ctx.editMessageCaption(profileMessage(user), {
        reply_markup: profileMarkup(user.id, isFull),
        parse_mode: 'HTML',
      });
    } else {
      await ctx.sendPhoto(replyPhoto(), {
        caption: profileMessage(user),
        reply_markup: profileMarkup(user.id, isFull),
        parse_mode: 'HTML',
      });
    }
  }
}
