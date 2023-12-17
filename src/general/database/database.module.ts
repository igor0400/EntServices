import { Module } from '@nestjs/common';
import { BanUser } from 'src/bans/models/ban-user.model';
import { CalendarBusyDay } from 'src/calendar/models/busy-day.model';
import { CalendarEventMember } from 'src/calendar/models/event-member.model';
import { CalendarEvent } from 'src/calendar/models/event.model';
import { Chain, ChainField } from 'src/libs/chain';
import { DatabaseModule as AppDatabaseModule } from 'src/libs/common';
import { Pagination } from 'src/libs/pagination/models/pagination.model';
import { TextWaiter } from 'src/listeners/models/text-waiter.model';
import { BasicNotification } from 'src/notifications/models/basic-notification.model';
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
      BanUser,
      BasicNotification,
      Chain,
      ChainField,
    ]),
  ],
})
export class DatabaseModule {}
