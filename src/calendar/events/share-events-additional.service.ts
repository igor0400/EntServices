import { Injectable } from '@nestjs/common';
import { getCtxData } from 'src/libs/common';
import { Context } from 'telegraf';
import { writeShareTitleMarkup, writeShareTitleMessage } from './responses';
import { TextWaitersRepository } from 'src/listeners/repositories/text-waiter.repository';
import { UserRepository } from 'src/users/repositories/user.repository';

@Injectable()
export class ShareEventsAdditionalService {
  constructor(
    private readonly textWaitersRepository: TextWaitersRepository,
    private readonly userRepository: UserRepository,
  ) {}

  async changeToWriteTitle(ctx: Context) {
    const { dataValue, user: ctxUser, message } = getCtxData(ctx);
    const userTgId = ctxUser.id;
    const user = await this.userRepository.findByTgId(userTgId);

    await this.textWaitersRepository.create({
      type: 'create_share_cal_event_title',
      userId: user?.id,
      chatId: message?.chat?.id,
      messageId: message?.message_id,
      extraData: dataValue,
    });

    // сделать обработчик в onMessage

    await ctx.editMessageCaption(writeShareTitleMessage(), {
      parse_mode: 'HTML',
      reply_markup: writeShareTitleMarkup(dataValue),
    });
  }
}
