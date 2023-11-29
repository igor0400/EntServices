import { Module } from '@nestjs/common';
import { CalendarMonthsService } from './months/months.service';
import { CalendarMonthsUpdate } from './months/months.update';
import { GeneralModule } from 'src/general/general.module';
import { UsersModule } from 'src/users/users.module';
import { CalendarDaysService } from './days/days.service';
import { CalendarDaysUpdate } from './days/days.update';
import { EventsService } from './events/events.service';
import { EventsUpdate } from './events/events.update';
import { DatabaseModule } from 'src/libs/common';
import { CalendarEvent } from './models/event.model';
import { CalendarEventMember } from './models/event-member.model';
import { CalendarBusyDay } from './models/busy-day.model';
import { EventsRepository } from './repositories/event.repository';
import { EventsMembersRepository } from './repositories/event-member.repository';
import { BusyDaysRepository } from './repositories/busy-day.repository';
import { EventsAdditionalService } from './events/events-additional.service';

@Module({
  imports: [
    DatabaseModule.forFeature([
      CalendarEvent,
      CalendarEventMember,
      CalendarBusyDay,
    ]),
    GeneralModule,
    UsersModule,
  ],
  providers: [
    CalendarMonthsService,
    CalendarMonthsUpdate,
    CalendarDaysService,
    CalendarDaysUpdate,
    EventsService,
    EventsUpdate,
    EventsRepository,
    EventsMembersRepository,
    BusyDaysRepository,
    EventsAdditionalService,
  ],
  exports: [CalendarMonthsService],
})
export class CalendarModule {}
