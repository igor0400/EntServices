import { Module } from '@nestjs/common';
import { CalendarEvent } from 'src/calendar/models/calendar-event.model';
import { DatabaseModule as AppDatabaseModule } from 'src/libs/common';
import { TextWaiter } from 'src/listeners/models/text-waiter.model';
import { User } from 'src/users/models/user.model';

@Module({
  imports: [AppDatabaseModule.forRoot([User, TextWaiter, CalendarEvent])],
})
export class DatabaseModule {}
