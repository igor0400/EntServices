import { Injectable } from '@nestjs/common';
import { EventsRepository } from '../repositories/event.repository';
import { Context, Telegraf } from 'telegraf';
import { eventMarkup, eventMessage } from './responses';
import { User } from 'src/users/models/user.model';
import { CalendarEventMember } from '../models/event-member.model';
import { InjectBot } from 'nestjs-telegraf';

@Injectable()
export class ShareEventsService {
  constructor(
    private readonly eventsRepository: EventsRepository,
    @InjectBot()
    private bot: Telegraf<Context>,
  ) {}

  // в eventMarkup другие кнопки назад и удаления

  async changeToEvent(ctx: Context, eventId: string) {
    const event = await this.eventsRepository.findByPk(eventId, {
      include: [{ model: CalendarEventMember, include: [User] }],
    });

    await ctx.editMessageCaption(eventMessage(event), {
      reply_markup: eventMarkup(event),
      parse_mode: 'HTML',
    });
  }

  async changeToEventByMess(
    chatId: string,
    messageId: string,
    eventId: string,
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
        reply_markup: eventMarkup(event),
        parse_mode: 'HTML',
      },
    );
  }
}
