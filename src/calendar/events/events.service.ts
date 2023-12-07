import { Injectable } from '@nestjs/common';
import { EventsRepository } from '../repositories/event.repository';
import { EventsMembersRepository } from '../repositories/event-member.repository';
import { getDayDate } from 'src/general';
import { BusyDaysRepository } from '../repositories/busy-day.repository';
import { getDateFromDataVal, getFreeIntervals } from '../assets';
import { CalendarEvent } from '../models/event.model';
import { filterEventsByDate } from './assets';
import { Context, Telegraf } from 'telegraf';
import { getCtxData, getZero, replyPhoto } from 'src/libs/common';
import { eventMarkup, eventMessage } from './responses';
import { User } from 'src/users/models/user.model';
import { CalendarEventMember } from '../models/event-member.model';
import { InjectBot } from 'nestjs-telegraf';
import { UserRepository } from 'src/users/repositories/user.repository';

interface CreateEvent {
  creatorTgId: string;
  membersTgIds: string[];
  title?: string;
  startTime: string;
  endTime: string;
}

interface CheckIsDayBusy {
  userId: string;
  userTelegramId: string;
  dateVal: string;
}

@Injectable()
export class EventsService {
  constructor(
    private readonly eventsRepository: EventsRepository,
    private readonly eventsMembersRepository: EventsMembersRepository,
    private readonly usersRepository: UserRepository,
    private readonly busyDaysRepository: BusyDaysRepository,
    @InjectBot() private bot: Telegraf<Context>,
  ) {}

  async createEvent({
    creatorTgId,
    membersTgIds,
    title,
    startTime,
    endTime,
  }: CreateEvent) {
    const type = membersTgIds.length > 1 ? 'multiplayer' : 'solo';

    const creator = await this.usersRepository.findByTgId(creatorTgId);

    const event = await this.eventsRepository.create({
      title,
      startTime,
      endTime,
      type,
      creatorId: creator.id,
    });

    const dates = [];
    const fromDate = getDayDate(startTime);

    if (!dates.includes(fromDate)) dates.push(fromDate);
    const tillDate = getDayDate(endTime);
    if (!dates.includes(tillDate)) dates.push(tillDate);

    for (let memberTgId of membersTgIds) {
      const user = await this.usersRepository.findByTgId(memberTgId);

      await this.eventsMembersRepository.create({
        calendarEventId: event.id,
        userTelegramId: memberTgId,
        userId: user.id,
      });

      for (let date of dates) {
        await this.checkIsDayBusy({
          userId: user.id,
          userTelegramId: memberTgId,
          dateVal: date,
        });
      }
    }

    return event;
  }

  async deleteEvent({ eventId }) {
    const event = await this.eventsRepository.findByPk(eventId, {
      include: [{ model: CalendarEventMember, include: [User] }],
    });
    if (!event) return;

    await this.eventsRepository.destroy({ where: { id: eventId } });

    for (let member of event.members) {
      await this.eventsMembersRepository.destroy({ where: { id: member.id } });
    }

    const creator = await this.usersRepository.findByPk(event.creatorId);
    const startDate = new Date(event.startTime);

    await this.checkIsDayBusy({
      userId: creator.id,
      userTelegramId: creator.telegramId,
      dateVal: getDayDate(startDate),
    });

    return event;
  }

  async createEventByDataValue({
    dataValue,
    creatorTgId,
    membersTgIds,
    title,
  }: {
    dataValue: string;
    creatorTgId: string;
    membersTgIds: string[];
    title?: string;
  }) {
    const [date, startVal, endVal] = dataValue.split('-');
    const [day, month, year] = date.split('.');
    const startTime = `${year}-${getZero(month)}-${getZero(
      day,
    )}T${startVal}:00.000Z`;
    const endTime = `${year}-${getZero(month)}-${getZero(
      day,
    )}T${endVal}:00.000Z`;

    const event = await this.createEvent({
      creatorTgId,
      membersTgIds,
      title,
      startTime,
      endTime,
    });

    return event;
  }

  async changeToEvent(ctx: Context, eventId: string) {
    const { user: ctxUser } = getCtxData(ctx);

    const user = await this.usersRepository.findByTgId(ctxUser.id);
    const event = await this.eventsRepository.findByPk(eventId, {
      include: [{ model: CalendarEventMember, include: [User] }],
    });

    const type = user?.id === event?.creatorId ? 'owner' : 'inviter';

    await ctx.editMessageCaption(eventMessage(event), {
      reply_markup: eventMarkup(event, type),
      parse_mode: 'HTML',
    });
  }

  async changeToEventByMess(
    chatId: string,
    messageId: string,
    eventId: string,
    userId: string,
  ) {
    const event = await this.eventsRepository.findByPk(eventId, {
      include: [{ model: CalendarEventMember, include: [User] }],
    });
    const type = userId === event?.creatorId ? 'owner' : 'inviter';

    await this.bot.telegram.editMessageCaption(
      chatId,
      +messageId,
      undefined,
      eventMessage(event),
      {
        reply_markup: eventMarkup(event, type),
        parse_mode: 'HTML',
      },
    );
  }

  private async checkIsDayBusy({
    userId,
    userTelegramId,
    dateVal,
  }: CheckIsDayBusy) {
    const [date, month, year] = dateVal.split('.');
    const newDate = getDateFromDataVal(dateVal);
    const eventMembers = await this.eventsMembersRepository.findAll({
      where: {
        userId,
      },
      include: [CalendarEvent],
    });

    const events = eventMembers.map((i) => i?.event);
    const sortedEvents = filterEventsByDate(events, dateVal);
    const freeIntervals = getFreeIntervals(newDate, sortedEvents);

    if (freeIntervals.length) {
      await this.busyDaysRepository.destroy({
        where: {
          userId,
          userTelegramId,
          date: +date,
          month: +month,
          year: +year,
          type: 'auto',
        },
      });
    } else {
      await this.busyDaysRepository.create({
        userId,
        userTelegramId,
        date: +date,
        month: +month,
        year: +year,
        type: 'auto',
      });
    }
  }
}
