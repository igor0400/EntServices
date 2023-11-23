import { Injectable } from '@nestjs/common';
import { EventsRepository } from '../repositories/event.repository';
import { EventsMembersRepository } from '../repositories/event-member.repository';
import { UsersRepository } from 'src/users/repositories/users.repository';
import { getDayDate } from 'src/general';
import { BusyDaysRepository } from '../repositories/busy-day.repository';

interface CreateEvent {
  membersTgIds: string[];
  from: string;
  till: string;
}

interface CheckIsDayBusy {
  userId: string;
  userTelegramId: string;
  date: string;
}

@Injectable()
export class EventsService {
  constructor(
    private readonly eventsRepository: EventsRepository,
    private readonly eventsMembersRepository: EventsMembersRepository,
    private readonly usersRepository: UsersRepository,
    private readonly busyDaysRepository: BusyDaysRepository,
  ) {}

  async createEvent({ membersTgIds, from, till }: CreateEvent) {
    const type = membersTgIds.length > 1 ? 'multiplayer' : 'solo';

    const event = await this.eventsRepository.create({ from, till, type });
    const dates = [];
    const fromDate = getDayDate(from);
    if (!dates.includes(fromDate)) dates.push(fromDate);
    const tillDate = getDayDate(till);
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
          date,
        });
      }
    }
  }

  private async checkIsDayBusy({
    userId,
    userTelegramId,
    date,
  }: CheckIsDayBusy) {
    let isBusy = false;
    const splitDate = date.split('.');
    // const events =

    if (isBusy) {
      await this.busyDaysRepository.create({
        userId,
        userTelegramId,
        date: +splitDate[0],
        month: +splitDate[1],
        year: +splitDate[2],
      });
    }
  }
}
