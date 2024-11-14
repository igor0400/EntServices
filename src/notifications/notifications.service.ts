import { Injectable } from '@nestjs/common';
import { getCtxData } from 'src/libs/common';
import { Context } from 'telegraf';
import {
  basicNotificationsMarkup,
  basicNotificationsMessage,
} from './responses';
import { BasicNotificationRepository } from './repositories/basic-notification.repository';

@Injectable()
export class NotificationsService {
  constructor(
    private readonly basicNotificationRepository: BasicNotificationRepository,
  ) {}

  async changeToBasicNotifications(ctx: Context) {
    const { ctxUser } = getCtxData(ctx);
    const userTgId = ctxUser.id;
    const notifications = await this.basicNotificationRepository.findAll({
      where: {
        userTelegramId: userTgId,
      },
    });
    const isFull = Boolean(notifications.length);

    await ctx.editMessageCaption(basicNotificationsMessage(isFull), {
      reply_markup: basicNotificationsMarkup(notifications),
      parse_mode: 'HTML',
    });
  }

  async changeToBasicNotification(ctx: Context, notificationId: string) {
    const notification = await this.basicNotificationRepository.findByPk(
      notificationId,
    );

    await ctx.editMessageCaption(notification.text, {
      reply_markup: notification.markup
        ? JSON.parse(notification.markup)
        : undefined,
      parse_mode: 'HTML',
    });
  }
}
