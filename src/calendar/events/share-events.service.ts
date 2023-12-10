import { Injectable } from '@nestjs/common';
import { EventsRepository } from '../repositories/event.repository';
import { Context, Telegraf } from 'telegraf';
import {
  eventMessage,
  eventMarkup,
  eventInviteMessage,
  eventInviteMarkup,
  eventAcceptedMessage,
  eventAcceptedMarkup,
  eventRejectedMessage,
  eventRejectedMarkup,
  alreadyActiveInviteMessage,
} from './responses';
import { User } from 'src/users/models/user.model';
import { CalendarEventMember } from '../models/event-member.model';
import { InjectBot } from 'nestjs-telegraf';
import { TextWaiter } from 'src/listeners/models/text-waiter.model';
import { UserRepository } from 'src/users/repositories/user.repository';
import { EventsService } from './events.service';
import {
  getCtxData,
  getUserName,
  replyPhoto,
  sendTempChatIdMessage,
} from 'src/libs/common';
import { EventsMembersRepository } from '../repositories/event-member.repository';
import { backMarkup, getDayDate } from 'src/general';
import { BasicNotificationRepository } from 'src/notifications/repositories/basic-notification.repository';

@Injectable()
export class ShareEventsService {
  constructor(
    private readonly eventsService: EventsService,
    private readonly eventsRepository: EventsRepository,
    private readonly eventsMembersRepository: EventsMembersRepository,
    private readonly usersRepository: UserRepository,
    private readonly basicNotificationRepository: BasicNotificationRepository,
    @InjectBot()
    private bot: Telegraf<Context>,
  ) {}

  async changeToEvent(ctx: Context, eventId: string, inviterId: string) {
    const { user: ctxUser } = getCtxData(ctx);
    const userTgId = ctxUser.id;

    const user = await this.usersRepository.findByTgId(userTgId);
    const event = await this.eventsRepository.findByPk(eventId, {
      include: [{ model: CalendarEventMember, include: [User] }],
    });

    await ctx.editMessageCaption(eventMessage(event), {
      reply_markup: eventMarkup(event, 'owner', user.id, inviterId),
      parse_mode: 'HTML',
    });
  }

  async changeToEventByMess(
    chatId: string,
    messageId: string,
    eventId: string,
    userId: string,
    inviterId: string,
  ) {
    const event = await this.eventsRepository.findByPk(eventId, {
      include: [{ model: CalendarEventMember, include: [User] }],
    });

    await this.bot.telegram.editMessageCaption(
      chatId,
      +messageId,
      undefined,
      eventMessage(event),
      {
        reply_markup: eventMarkup(event, 'owner', userId, inviterId),
        parse_mode: 'HTML',
      },
    );
  }

  async createEventByTitleListener({
    textWaiter,
    title,
    userTgId,
    userId,
  }: {
    textWaiter: TextWaiter;
    title: string;
    userTgId: string;
    userId: string;
  }) {
    const { extraData, chatId, messageId } = textWaiter;

    const splitExtra = extraData.split('_');
    const dataValue = splitExtra[0];
    const invitedUserId = splitExtra[1];
    const invitedUser = await this.usersRepository.findByPk(invitedUserId);
    const invitedUserTgId = invitedUser?.telegramId;
    const owner = await this.usersRepository.findByPk(userId);

    const event = await this.eventsService.createEventByDataValue({
      title,
      dataValue,
      creatorTgId: userTgId,
      membersTgIds: [userTgId],
    });

    await this.changeToEventByMess(
      chatId,
      messageId,
      event.id,
      userId,
      invitedUserId,
    );

    try {
      await this.bot.telegram.sendPhoto(invitedUserTgId, replyPhoto(), {
        caption: eventInviteMessage(event, owner),
        reply_markup: eventInviteMarkup(event.id),
        parse_mode: 'HTML',
      });

      await this.basicNotificationRepository.create({
        userTelegramId: invitedUserTgId,
        title: 'Приглашение',
        text: eventInviteMessage(event, owner),
        markup: JSON.stringify(eventInviteMarkup(event.id, invitedUserId)),
      });
    } catch (e) {}

    await sendTempChatIdMessage({
      bot: this.bot,
      chatId: userTgId,
      text: `✅ <b>Пользователю ${getUserName(
        invitedUser,
      )} отправлено предложение присоединиться к событию!</b>`,
      time: 5000,
    });
  }

  async acceptEventInvite(ctx: Context) {
    const { dataValue, user: ctxUser } = getCtxData(ctx);
    const userTgId = ctxUser.id;
    const user = await this.usersRepository.findByTgId(userTgId);
    const userId = user.id;
    const eventId = dataValue;

    const event = await this.eventsRepository.findByPk(eventId);

    await this.eventsMembersRepository.create({
      calendarEventId: eventId,
      userTelegramId: userTgId,
      userId,
    });

    await this.eventsService.checkIsDayBusy({
      userId,
      userTelegramId: userTgId,
      dateVal: getDayDate(event?.startTime),
    });

    await this.eventsService.changeToEvent(ctx, eventId);

    const creator = await this.usersRepository.findByPk(event?.creatorId);

    try {
      await this.bot.telegram.sendPhoto(creator?.telegramId, replyPhoto(), {
        caption: eventAcceptedMessage(user),
        reply_markup: eventAcceptedMarkup(eventId),
        parse_mode: 'HTML',
      });
    } catch (e) {}

    await this.basicNotificationRepository.destroy({
      where: { userTelegramId: userTgId },
    });
  }

  async rejectEventInvite(ctx: Context) {
    const { dataValue, user: ctxUser } = getCtxData(ctx);
    const userTgId = ctxUser.id;
    const eventId = dataValue;
    const event = await this.eventsRepository.findByPk(eventId);
    const user = await this.usersRepository.findByTgId(userTgId);

    await ctx.deleteMessage();

    const creator = await this.usersRepository.findByPk(event?.creatorId);

    try {
      await this.bot.telegram.sendPhoto(creator?.telegramId, replyPhoto(), {
        caption: eventRejectedMessage(user),
        reply_markup: eventRejectedMarkup(eventId),
        parse_mode: 'HTML',
      });
    } catch (e) {}

    await this.basicNotificationRepository.destroy({
      where: { userTelegramId: userTgId },
    });
  }

  async sendInviteEvent(ctx: Context, eventId: string, userId: string) {
    const isUserActivated = await this.eventsMembersRepository.findOne({
      where: {
        calendarEventId: eventId,
        userId,
      },
    });

    if (isUserActivated) {
      return await ctx.sendPhoto(replyPhoto(), {
        caption: alreadyActiveInviteMessage(),
        reply_markup: backMarkup,
        parse_mode: 'HTML',
      });
    }

    const event = await this.eventsRepository.findByPk(eventId, {
      include: [{ model: CalendarEventMember, include: [User] }],
    });
    const owner = await this.usersRepository.findByPk(userId);

    await ctx.sendPhoto(replyPhoto(), {
      caption: eventInviteMessage(event, owner),
      reply_markup: eventInviteMarkup(event.id),
      parse_mode: 'HTML',
    });
  }
}
