import { Injectable } from '@nestjs/common';
import { EventsRepository } from '../repositories/event.repository';
import { EventsMembersRepository } from '../repositories/event-member.repository';
import { UsersRepository } from 'src/users/repositories/users.repository';
import { getDayDate } from 'src/general';
import { BusyDaysRepository } from '../repositories/busy-day.repository';
import { getDateFromDataVal, getFreeIntervals } from '../assets';
import { CalendarEvent } from '../models/event.model';
import { filterEventsByDate } from './assets';

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
    private readonly usersRepository: UsersRepository,
    private readonly busyDaysRepository: BusyDaysRepository,
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

    if (!freeIntervals.length) {
      await this.busyDaysRepository.create({
        userId,
        userTelegramId,
        date: +date,
        month: +month,
        year: +year,
      });
    }
  }
}
