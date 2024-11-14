import { Injectable } from '@nestjs/common';
import { getCtxData } from 'src/libs/common';
import { Context } from 'telegraf';
import { writeShareTitleMarkup, writeShareTitleMessage } from './responses';
import { UserRepository } from 'src/users/repositories/user.repository';
import { WaitersRepository } from 'src/listeners/repositories/waiter.repository';

@Injectable()
export class ShareEventsAdditionalService {
  constructor(
    private readonly waitersRepository: WaitersRepository,
    private readonly userRepository: UserRepository,
  ) {}

  async changeToWriteTitle(ctx: Context) {
    const { dataValue, ctxUser, message } = getCtxData(ctx);
    const userTgId = ctxUser.id;
    const user = await this.userRepository.findByTgId(userTgId);

    await this.waitersRepository.create({
      type: 'create_share_cal_event_title',
      kind: 'text',
      userId: user?.id,
      chatId: message?.chat?.id,
      messageId: message?.message_id,
      extraData: dataValue,
    });

    await ctx.editMessageCaption(writeShareTitleMessage(), {
      parse_mode: 'HTML',
      reply_markup: writeShareTitleMarkup(dataValue),
    });
  }
}
