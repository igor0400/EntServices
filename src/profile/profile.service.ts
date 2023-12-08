import { Injectable } from '@nestjs/common';
import { getCtxData, replyPhoto } from 'src/libs/common';
import { Context } from 'telegraf';
import { profileMarkup, profileMessage } from './responses';
import { UserRepository } from 'src/users/repositories/user.repository';

@Injectable()
export class ProfileService {
  constructor(private readonly userRepository: UserRepository) {}

  async sendProfile(ctx: Context) {
    const { user: ctxUser } = getCtxData(ctx);
    const userTgId = ctxUser.id;
    const user = await this.userRepository.findByTgId(userTgId);

    await ctx.sendPhoto(replyPhoto(), {
      caption: profileMessage(user),
      reply_markup: profileMarkup(user.id),
      parse_mode: 'HTML',
    });
  }

  async changeToProfile(ctx: Context) {
    const { user: ctxUser } = getCtxData(ctx);
    const userTgId = ctxUser.id;
    const user = await this.userRepository.findByTgId(userTgId);

    await ctx.editMessageCaption(profileMessage(user), {
      reply_markup: profileMarkup(user.id),
      parse_mode: 'HTML',
    });
  }
}
