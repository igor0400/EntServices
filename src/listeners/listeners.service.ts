import { Injectable } from '@nestjs/common';
import { TextWaitersRepository } from './repositories/text-waiter.repository';
import { GeneralValidations } from 'src/general/general.validations';
import { Context } from 'telegraf';
import { getCtxData } from 'src/libs/common';
import { EventsService } from 'src/calendar/events/events.service';
import { createEventTitleValidation } from './configs';
import { UserRepository } from 'src/users/repositories/user.repository';

@Injectable()
export class ListenersService {
  constructor(
    private readonly usersRepository: UserRepository,
    private readonly textWaitersRepository: TextWaitersRepository,
    private readonly generalValidations: GeneralValidations,
    private readonly eventsService: EventsService,
  ) {}

  async clearUserListeners(userTgId: string) {
    const user = await this.usersRepository.findByTgId(userTgId);

    if (user) {
      await this.textWaitersRepository.destroy({ where: { userId: user.id } });
    }
  }

  async onTextMessage(ctx: Context) {
    const { message, user: ctxUser } = getCtxData(ctx);
    const userTgId = ctxUser.id;

    const user = await this.usersRepository.findByTgId(userTgId);
    const textWaiter = await this.textWaitersRepository.findOne({
      where: { userId: user?.id },
    });

    if (!textWaiter) return;

    await ctx.deleteMessage();

    const { type, extraData, chatId, messageId } = textWaiter;
    const text = message.text?.trim();

    if (type === 'create_pers_cal_event_title') {
      const isValid = await this.generalValidations.startValidation(
        ctx,
        createEventTitleValidation(text),
      );
      if (!isValid) return;

      const event = await this.eventsService.createEventByDataValue({
        title: text,
        dataValue: extraData,
        creatorTgId: userTgId,
        membersTgIds: [userTgId],
      });

      await this.eventsService.changeToEventByMess(chatId, messageId, event.id);
    }

    await this.textWaitersRepository.destroy({ where: { userId: user.id } });
  }
}
