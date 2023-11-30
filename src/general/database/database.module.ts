import { Module } from '@nestjs/common';
import { CalendarBusyDay } from 'src/calendar/models/busy-day.model';
import { CalendarEventMember } from 'src/calendar/models/event-member.model';
import { CalendarEvent } from 'src/calendar/models/event.model';
import { DatabaseModule as AppDatabaseModule } from 'src/libs/common';
import { Pagination } from 'src/libs/pagination/models/pagination.model';
import { TextWaiter } from 'src/listeners/models/text-waiter.model';
import { User } from 'src/users/models/user.model';

@Module({
  imports: [
    AppDatabaseModule.forRoot([
      User,
      TextWaiter,
      CalendarEvent,
      CalendarEventMember,
      CalendarBusyDay,
      Pagination,
    ]),
  ],
})
export class DatabaseModule {}
